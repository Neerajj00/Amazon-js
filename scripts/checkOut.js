import {cart,removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {priceConverter} from '../scripts/utils/currency.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';


let cartHtml=``;
cart.forEach((cartItem)=>{
    let productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product)=>{
        if(product.id==productId){
            matchingProduct=product;
        }
    })
    cartHtml += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${priceConverter(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.count}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link " data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option: 
                </div>
                ${calculateDeliveryTime(deliveryOptions,matchingProduct)}
              </div>

            </div>
          </div>`;
})
document.querySelector('.js-cart-tem-container').innerHTML=cartHtml;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    let productId = link.dataset.productId;
    removeFromCart(productId);
    const container=document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
  })
})

function calculateDeliveryTime(deliveryOptions,matchingProduct){
  const todayDate = dayjs();
  let deliveryhtml='';
  deliveryOptions.forEach((deliveryOption)=>{
    const day = todayDate.add(deliveryOption.deliveryDays,'days');
    const formattedDay = day.format('dddd, MMMM D');
    let priceString = deliveryOption.priceCents > 0 ? priceConverter(deliveryOption.priceCents) : 'FREE' ;
    deliveryhtml += 
    `
      <div class="delivery-option">
        <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${formattedDay}
          </div>
          <div class="delivery-option-price">
            $${priceString} - Shipping
          </div>
        </div>
      </div>
    `
  })
  return deliveryhtml;
}

const today = dayjs();
console.log(today.format('dddd, MMMM D'));
