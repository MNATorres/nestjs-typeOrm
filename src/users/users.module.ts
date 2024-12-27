import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerController } from './controllers/customers.controller';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';

import { ProductsModule } from '../products/products.module';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, OrderItem, Order]),
  ],
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
