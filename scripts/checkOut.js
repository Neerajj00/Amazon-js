import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {getProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/backend.practice.js';

// Personalcart.loadCart(); 
//using promise all 

Promise.all([
    new Promise((resolve)=>{
        getProducts(()=>{
            resolve();
        });
    }),

    new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })
]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
})


/*
using promise

new Promise((resolve)=>{
    getProducts(()=>{
        resolve();
    });
}).then(()=>{
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    });
}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});

using call backs

getProducts(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});

*/