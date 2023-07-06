import { DeleteResult, UpdateResult } from 'typeorm';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { Account } from './entities/account.entity';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async findAll(): Promise<Account[]> {
    return await this.accountsService.findAll();
  }

  @Get(':id')
  async byId(@Param('id') id: number): Promise<Account> {
    return await this.accountsService.byId(id);
  }

  @Post()
  async create(@Body() body: CreateAccountDto): Promise<Account> {
    return await this.accountsService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateAccountDto,
  ): Promise<UpdateResult> {
    return await this.accountsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.accountsService.delete(id);
  }
}
