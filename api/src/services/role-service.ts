import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {Role, User} from '../models';
import {RoleRepository, UserRepository} from '../repositories';

export class RoleService {
  constructor(
    @repository(RoleRepository)
    public roleRepository: RoleRepository,
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }
  async getRoleByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: {
        name
      }
    });

    if (!role) {
      throw new HttpErrors.NotFound('role not found');
    }

    return role;
  }

  async isAdmin(userId: string): Promise<boolean> {
    const user: User = await this.userRepository.findById(userId, {fields: {roleId: true}});
    const adminRole: Role = await this.getRoleByName('admin');
    const userIdStr = user.roleId.toString();
    const adminRoleId = adminRole.id ? adminRole.id.toString() : '';
    return userIdStr === adminRoleId;
  }

}
