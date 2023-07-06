import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async findAll(): Promise<Account[]> {
    return await this.accountRepository.find();
  }

  async byId(id: number): Promise<Account> {
    const foundAccount = await this.accountRepository.findOne({
      where: { id: id },
    });

    if (!foundAccount) {
      throw new BadRequestException('Account not found');
    }

    return foundAccount;
  }

  async create(data: CreateAccountDto): Promise<Account> {
    try {
      const user = await this.accountRepository.create({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return await this.accountRepository.save(user);
    } catch (error) {
      console.log(error?.sqlMessage);
      throw new Error(`Failed to create user. ${error?.sqlMessage}`);
    }
  }

  async update(id: number, data: UpdateAccountDto): Promise<UpdateResult> {
    try {
      await this.byId(id);
      const updateAccount = {
        id,
        ...data,
        updated_at: new Date(),
      };

      return await this.accountRepository.update({ id }, updateAccount);
    } catch (error) {
      console.log(error?.sqlMessage);
      throw new Error(`Failed to update user. ${error?.sqlMessage}`);
    }
  }
  async delete(id: number): Promise<DeleteResult> {
    await this.byId(id);

    return await this.accountRepository.delete(id);
  }
}
