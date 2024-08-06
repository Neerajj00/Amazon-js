import {cart,addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {priceConverter} from '../scripts/utils/currency.js';

// code to show the products starts here
let html = ``;
products.forEach((product) => {
    html += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
          ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${(product.rating.stars)*10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.review}
            </div>
          </div>

          <div class="product-price">
            $${priceConverter(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`
})
document.querySelector('.js-selecter-products').innerHTML = html;

// to increase the count of cart number
function toIncreaseCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.count;
    })
    document.querySelector('.cart-quantity').innerText = cartQuantity;
}

// to show the transition of adding the product
function popUpWhenAdding(productId){
  let showAdded = document.querySelector(`.js-${productId}`);
  showAdded.style.opacity = 1;
  showAdded.style.transition = 'opacity 0.3s'; 
  setTimeout(()=>{
      showAdded.style.opacity = 0;
  },1800);
}

// main function used when clicked add to cart button
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
        const productId = button.dataset.productId ;
        popUpWhenAdding(productId); // to show pop up
        addToCart(productId); // to add the item in the cart
        toIncreaseCartQuantity(); // to increase the DOM of cart quantity
    })
})

