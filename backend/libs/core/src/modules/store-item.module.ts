import { Module } from '@nestjs/common';
import { StoreItemService } from '../services/store-item.service';
import { StoreItemResolver } from '../resolvers/store-item.resolver';

@Module({
  providers: [StoreItemService, StoreItemResolver]
})
export class StoreItemModule {}
