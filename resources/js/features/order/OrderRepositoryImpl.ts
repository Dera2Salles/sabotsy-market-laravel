import type { RESULT } from '@/core/Types';
import { failure, success } from '@/core/Types/Result';
import type { ProductEntity } from '@/features/product/ProductEntity';
import type { OrderEntity } from './Order';
import { OrderModel } from './OrderModel';
import type { OrderRepository } from './OrderRepository';
import type { OrderServerSource } from './OrderServerSource';

export class OrderRepositoryImpl implements OrderRepository {
  private order: OrderModel;
  constructor(private service: OrderServerSource) {
    this.order = new OrderModel();
  }

  async createOrder(): Promise<RESULT<void, Error>> {
    this.order.createOrder();
    return success(undefined);
  }

  async addProductToTheOrder(
    productOrder: ProductEntity,
  ): Promise<RESULT<OrderEntity, Error>> {
    try {
      const isOrderPlaced = this.order.verifyIsPlaced();
      if (isOrderPlaced.status === 'failure') {
        this.order.createOrder();
      }

      const result = await this.order.addProductToTheOrder(productOrder);
      if (result.status === 'failure') return failure(result.error);
      const data = this.order.getData();
      return success(data);
    } catch (error) {
      console.error(error);
      return failure(Error());
    }
  }

  async removeProductToTheOrder(
    product: ProductEntity,
  ): Promise<RESULT<OrderEntity, Error>> {
    try {
      const isOrderPlaced = this.order.verifyIsPlaced();
      if (isOrderPlaced.status === 'failure') {
        this.order.createOrder();
      }

      const result = await this.order.decreaseProductUnitOnOrder(product);
      if (result.status === 'failure') return failure(result.error);
      const data = this.order.getData();

      return success(data);
    } catch (error) {
      console.error(error);
      return failure(Error());
    }
  }

  async confirmOrder(): Promise<RESULT<void>> {
    try {
      const order = this.order.getData();
      await this.service.confirm(order);
      this.order.clearOrder();
      return success(undefined);
    } catch (error) {
      console.error(error);
      return failure(Error());
    }
  }
}
