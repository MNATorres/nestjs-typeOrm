import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { OrdersItemService } from '../services/orders-item.service';

@Controller('order-item')
export class OrdersItemController {
  constructor(private ordersItemService: OrdersItemService) {}

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.ordersItemService.create(payload);
  }
}
