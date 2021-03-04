import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {SECURITY_SCHEME_SPEC} from '@loopback/authentication-jwt';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin, SchemaMigrationOptions} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {JWTStrategy} from './authentication-stratgies/jwt-stratgies';
import {PermissionKeys} from './authorization/permission-keys';
import {
  AdminDataConstants, PasswordHasherBindings,
  RoleServiceBindings,
  TokenServiceBindings,
  TokenServiceConstants,
  UserServiceBindings
} from './keys';
import {RoleRepository, UserRepository} from './repositories';
import {MySequence} from './sequence';
import {BcryptHasher} from './services';
import {JWTService} from './services/jwt-service';
import {RoleService} from './services/role-service';
import {MyUserService} from './services/user-service';
import {CrudRestComponent} from '@loopback/rest-crud';

export {ApplicationConfig};

export class VideoGamesClubApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // setup binding
    this.setupBinding();

    // Add security spec
    this.addSecuritySpec();

    this.component(AuthenticationComponent);
    registerAuthenticationStrategy(this, JWTStrategy)

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    this.component(CrudRestComponent);
  }

  setupBinding(): void {
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);
    this.bind(PasswordHasherBindings.ROUNDS).to(10)
    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(TokenServiceConstants.TOKEN_SECRET_VALUE)
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE);
    this.bind(TokenServiceBindings.REFRESH_TOKEN_SECRET).to(TokenServiceConstants.REFRESH_TOKEN_SECRET_VALUE);
    this.bind(TokenServiceBindings.REFRESH_TOKEN_EXPIRES_IN).to(TokenServiceConstants.REFRESH_TOKEN_EXPIRES_IN_VALUE);
    this.bind(TokenServiceBindings.REFRESH_TOKEN_ISSURE).to(TokenServiceConstants.REFRESH_TOKEN_ISSURE_VALUE);
    this.bind(RoleServiceBindings.ROLE_SERVICE).toClass(RoleService);
  }

  addSecuritySpec(): void {
    this.api({
      openapi: '3.0.0',
      info: {
        title: 'test application',
        version: '1.0.0',
      },
      paths: {},
      components: {securitySchemes: SECURITY_SCHEME_SPEC},
      security: [
        {
          // secure all endpoints with 'jwt'
          jwt: [],
        },
      ],
      servers: [{url: '/'}],
    });
  }

  async migrateSchema(options?: SchemaMigrationOptions) {
    // 1. Run migration scripts provided by connectors
    await super.migrateSchema(options);

    // 2. Make further changes. When creating predefined model instances,
    // handle the case when these instances already exist.
    const roleRepository = await this.getRepository(RoleRepository);
    const userRepository = await this.getRepository(UserRepository);

    const adminRole = await roleRepository.findOne({where: {name: 'admin'}});
    const allPermissions: string[] = Object.values(PermissionKeys)
    if (!adminRole) {
      console.log('Adding Role "admin"');
      const newAdminRole = await roleRepository.create({
        name: 'admin',
        permissions: allPermissions
      });
      console.log('Adding "admin" User');
      const hasher: BcryptHasher = new BcryptHasher();
      const adminUser = {
        name: AdminDataConstants.ADMIN_NAME,
        lastname: AdminDataConstants.ADMIN_LASTNAME,
        email: AdminDataConstants.ADMIN_EMAIL,
        username: AdminDataConstants.ADMIN_USERNAME,
        password: await hasher.hashPassword(AdminDataConstants.ADMIN_PASSWORD),
        roleId: newAdminRole.getId()
      }
      await userRepository.create(adminUser);
    } else if (adminRole.permissions.length !== allPermissions.length) {
      console.log('Changing permissions to Role "admin"');
      adminRole.permissions = allPermissions;
      await roleRepository.update(adminRole);
    }

    const userRole = await roleRepository.findOne({where: {name: 'user'}});
    const userPermissions: string[] = [
      PermissionKeys.GetCurrentUser,
      PermissionKeys.GetUserById,
      PermissionKeys.UpdateUserById,
      PermissionKeys.DeleteUserById
    ];
    if (!userRole) {
      console.log('Adding Role "user"');
      await roleRepository.create({
        name: 'user',
        permissions: userPermissions
      });
    } else if (userRole.permissions.length !== userPermissions.length) {
      console.log('Changing permissions to Role "user"');
      userRole.permissions = userPermissions;
      await roleRepository.update(userRole);
    }

    console.log('Migrations done!');
  };
}
