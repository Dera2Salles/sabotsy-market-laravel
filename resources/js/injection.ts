import { AuthRepositoryImpl } from './features/auth/AuthRepositoryImpl';
import { MemoryStorage } from './features/product/productMemoryStorage';
import { ProductRepositoryImp } from './features/product/ProductRepositoryImpl';

import axios from 'axios';
import { AuthServiceImpl } from './features/auth/AuthService';
import { OrderRepositoryImpl } from './features/order/OrderRepositoryImpl';
import { OrderRemoteDataSourceImpl } from './features/order/OrderServerSource';

const api = axios.create({
    timeout: 5000,
});

const orderServiceServer = new OrderRemoteDataSourceImpl(api);

const autService = new AuthServiceImpl(api);

export const autRepository = new AuthRepositoryImpl(autService);

const produdctInMemory = new MemoryStorage();
// Repositories
export const productRepository = new ProductRepositoryImp(produdctInMemory);

export const orderRepository = new OrderRepositoryImpl(orderServiceServer);

// Product
