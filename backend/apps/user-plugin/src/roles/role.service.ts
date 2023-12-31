import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/role.entity';
import { Repository } from 'typeorm';
import { UserRoles } from './enum/role';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(input: Partial<Role>): Promise<Role> {
    const role = this.roleRepository.create(input);
    return await this.roleRepository.save(role);
  }

  async findAllRoles(): Promise<Role[]> {
    return await this.roleRepository.find({ relations: { users: true } });
  }

  async findRoleById(id: string): Promise<Role> {
    return await this.roleRepository.findOne({
      relations: { users: true },
      where: { id },
    });
  }

  async findRolesByDivision(division: string): Promise<Role[]> {
    return await this.roleRepository.find({
      relations: { users: true },
      where: { division },
    });
  }

  async findRoleByRolename(name: UserRoles): Promise<Role> {
    return await this.roleRepository.findOne({
      relations: { users: true },
      where: { name },
    });
  }

  async updateRole(id: string, input: Partial<Role>): Promise<Role> {
    await this.roleRepository.update(id, input);
    return await this.roleRepository.findOne({
      relations: { users: true },
      where: { id },
    });
  }

  async deleteRole(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      relations: { users: true },
      where: { id },
    });
    await this.roleRepository.delete(id);
    return role;
  }
}
