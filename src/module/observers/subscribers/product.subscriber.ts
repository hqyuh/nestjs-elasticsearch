import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Product } from 'src/api/product/entity/product.entity';
import { ProductElasticIndex } from 'src/module/search/index/product.elastic.index';
import {
  DataSource,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
@Injectable()
export class ProductSubcriber implements EntitySubscriberInterface<Product> {
  constructor(
    @InjectDataSource() readonly dataSource: DataSource,
    private readonly productEsIndex: ProductElasticIndex,
  ) {
    dataSource.subscribers.push(this);
  }

  public listenTo(): any {
    return Product;
  }

  public async afterInsert(event: InsertEvent<Product>): Promise<any> {
    console.log('🐔 =>  event afterInsert:', event);
    return this.productEsIndex.insertProductDocument(event.entity as Product);
  }

  public async afterUpdate(event: UpdateEvent<Product>): Promise<any> {
    console.log('🐔 =>  event afterUpdate:', event);
    return this.productEsIndex.updateProductDocument(event.entity as Product);
  }
}
