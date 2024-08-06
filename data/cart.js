export const cart = [];

export function addToCart(productId){
    let matchingProduct=cart.find(cartItem => cartItem.productId == productId);
    if(matchingProduct){
        matchingProduct.count++;
    }else{
        cart.push({productId: productId,count:1});
    }
  }