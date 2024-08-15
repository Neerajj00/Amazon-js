class cart {
    cartItems;
    #localStoragekey;
    constructor(){
        this.#loadFromStorage();
    }
    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStoragekey));
      
        if (!this.cartItems) {
            this.cartItems = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
          }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }
    };

    saveToStorage() {
        localStorage.setItem(this.#localStoragekey, JSON.stringify(this.cartItems));
    };
      
    addToCart(productId) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });
      
        if (matchingItem) {
          matchingItem.quantity += 1;
        } else {
            this.cartItems.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
          });
        }
      
        this.saveToStorage();
    };

    removeFromCart(productId) {
        const newCart = [];
        
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
            newCart.push(cartItem);
            }
        });
        
        this.cartItems = newCart;
        
        this.saveToStorage();
    };

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
            matchingItem = cartItem;
            }
        });
        
        matchingItem.deliveryOptionId = deliveryOptionId;
        
        this.saveToStorage();
    };

    calculateQuantity(){
        let cartQuantity=0;
        this.cartItems.forEach((item)=>{
            cartQuantity += item.quantity;
        });

        const cartNumberDisplay = document.querySelector('.js-cart-quantity');
        if (cartNumberDisplay) {
        cartNumberDisplay.textContent = cartQuantity;
        }
    };

}
export const Personalcart = new cart('cart-oop');

window.onload = function() {
    Personalcart.calculateQuantity(); // Display number of items in cart, if applicable
  };