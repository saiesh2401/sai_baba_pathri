import { Module } from '@nestjs/common';
import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';
import { TransactionController } from './transaction/transaction.controller';
import { TransactionService } from './transaction/transaction.service';

@Module({
    controllers: [ItemController, LocationController, TransactionController],
    providers: [ItemService, LocationService, TransactionService],
    exports: [ItemService, LocationService, TransactionService],
})
export class InventoryModule { }
