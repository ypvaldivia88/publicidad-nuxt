import {authenticate, AuthenticationBindings} from '@loopback/authentication';
import {TokenObject} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getJsonSchemaRef, getModelSchemaRef, HttpErrors, param, patch, post, requestBody} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import * as _ from 'lodash';
import {PermissionKeys} from '../authorization/permission-keys';
import {ApiVerssionConstants, PasswordHasherBindings, RoleServiceBindings, TokenServiceBindings, UserServiceBindings} from '../keys';
import {User} from '../models';
import {Credentials, UserRepository} from '../repositories';
import {BcryptHasher, isMe, JWTService, MyUserService, RoleService, validateCredentials} from '../services';
import {OPERATION_SECURITY_SPEC} from '../utils/security-spec';

const {API_V1} = ApiVerssionConstants;

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,

    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public hasher: BcryptHasher,

    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,

    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,

    @inject(RoleServiceBindings.ROLE_SERVICE)
    public roleService: RoleService,

  ) { }

  @post(API_V1 + '/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          schema: getJsonSchemaRef(User)
        }
      }
    }
  })
  async signup(@requestBody({
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {
          title: 'NewUserRegistration',
          exclude: ['id', 'roleId']
        }),
      },
    },
  }) userData: User) {
    validateCredentials(_.pick(userData, ['email', 'password']));
    userData.password = await this.hasher.hashPassword(userData.password)
    let userRole = await this.roleService.getRoleByName('user');
    if (userRole.id) {
      userData.roleId = userRole.id
    }
    const savedUser = await this.userRepository.create(userData);
    return savedUser;
  }

  @post(API_V1 + '/login', {
    responses: {
      '200': {
        description: 'Tokens and user data',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                tokens: {
                  type: 'object',
                  properties: {
                    accessToken: {type: 'string'},
                    refreshToken: {type: 'string'}
                  }
                },
                user: {
                  type: 'object',
                  properties: {
                    name: {type: 'string'},
                    id: {type: 'string'},
                    email: {type: 'string'},
                    permissions: {
                      type: 'array',
                      items: {type: 'string'}
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {type: 'string'},
              password: {type: 'string'}
            },
          },
        },
      },
    }) credentials: Credentials,
  ): Promise<{tokens: TokenObject, user: UserProfile}> {
    const user = await this.userService.verifyCredentials(credentials);
    const userWithPermissions = await this.userService.getUserPermissions(user);
    const userProfile = await this.userService.convertToUserProfile(userWithPermissions);
    const token = await this.jwtService.generateToken(userProfile);
    const result = await this.jwtService.generateRefreshToken(userProfile, token);
    return Promise.resolve({tokens: result, user: userProfile});
  }

  @authenticate({strategy: 'jwt', options: {required: []}})
  @post(API_V1 + '/logout', {
    responses: {
      '204': {
        description: 'User Logout success',
      },
    },
  })
  async logout(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              refreshToken: {type: 'string'}
            }
          }
        }
      }
    }) data: {refreshToken: 'string'}
  ): Promise<void> {
    await this.jwtService.revokeRefreshToken(data.refreshToken);
  }

  @post(API_V1 + '/refresh', {
    responses: {
      '200': {
        description: 'Refresh token success',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                accessToken: {type: 'string'}
              }
            }
          }
        }
      },
    },
  })
  async refreshToken(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              refreshToken: {type: 'string'}
            }
          }
        }
      }
    }) data: {refreshToken: 'string'}
  ): Promise<TokenObject> {
    return this.jwtService.refreshToken(data.refreshToken);
  }


  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.GetCurrentUser]}})
  @get(API_V1 + '/users/me', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: getJsonSchemaRef(User),
          },
        },
      },
    },
  })
  async me(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
  ): Promise<UserProfile> {
    // console.log('current user: ', currentUser);
    // TODO: implement to return nedded data.
    return Promise.resolve(currentUser);
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.CreateUser]}})
  @post(API_V1 + '/users', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: User,
  ): Promise<User> {
    validateCredentials(_.pick(user, ['email', 'password']));
    user.password = await this.hasher.hashPassword(user.password)
    return this.userRepository.create(user);
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.CountUsers]}})
  @get(API_V1 + '/users/count', {
    responses: {
      '200': {
        description: 'User model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.count(where);
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.ListUsers]}})
  @get(API_V1 + '/users', {
    responses: {
      '200': {
        description: 'Array of User model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.GetUserById]}})
  @get(API_V1 + '/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    if (!(isMe(currentUser.id, id)) && !(await this.roleService.isAdmin(currentUser.id))) {
      throw new HttpErrors.Forbidden('Access denied!');
    }

    return this.userRepository.findById(id, filter);
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.UpdateUserById]}})
  @patch(API_V1 + '/user/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    if (!(isMe(currentUser.id, id)) && !(await this.roleService.isAdmin(currentUser.id))) {
      throw new HttpErrors.Forbidden('Access denied!');
    }

    await this.userRepository.updateById(id, user);
  }

  @authenticate({strategy: 'jwt', options: {required: [PermissionKeys.DeleteUserById]}})
  @del(API_V1 + '/users/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(
    @inject(AuthenticationBindings.CURRENT_USER)
    currentUser: UserProfile,
    @param.path.string('id') id: string
  ): Promise<void> {
    if (!(isMe(currentUser.id, id)) && !(await this.roleService.isAdmin(currentUser.id))) {
      throw new HttpErrors.Forbidden('Access denied!');
    }
    await this.userRepository.deleteById(id);
  }
}



