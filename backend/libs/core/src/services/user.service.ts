import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllUsers(skip: number, take: number): Promise<User[]> {
    const data = await this.userRepository.find({
      skip,
      take,
      relations: {
        role: true,
        verificationCodes: true,
      },
    });
    return data;
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({
      relations: {
        role: true,
        verificationCodes: true,
      },
      where: { id },
    });
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      relations: {
        role: true,
        verificationCodes: true,
      },
      where: { username },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      relations: {
        role: true,
        verificationCodes: true,
      },
      where: { email },
    });
  }

  async createUser(input: Partial<User>): Promise<User | null> {
    const user = this.userRepository.create(input);
    const createdUser = await this.userRepository.save(user);
    return await this.userRepository.findOne({
      relations: {
        role: true,
        verificationCodes: true,
      },
      where: { id: createdUser.id },
    });
  }

  async updateUser(id: string, input: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.findOne({
      relations: { role: true, verificationCodes: true },
      where: { id },
    });

     // If the user doesn't exist, throw NotFoundException
     if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    Object.assign(user, input);

    // Construct the set object dynamically based on input values
    user.verified = true;
    await this.userRepository.save(user);
    return await this.findUserById(id);
  }

  async deleteUser(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      relations: {
        role: true,
        verificationCodes: true,
      },
      where: { id },
    });
    await this.userRepository.delete(id);
    return user;
  }
}
