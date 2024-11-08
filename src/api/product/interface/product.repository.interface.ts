/* eslint-disable @typescript-eslint/no-empty-interface */
import { IBaseRepository } from 'src/common/repositories/base/base.interface.repository';
import { Product } from '../entity/product.entity';

export interface IProductRepository extends IBaseRepository<Product> {}
