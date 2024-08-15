import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { getProducts } from '../data/products.js';
//import '../data/backend.practice.js';

getProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});