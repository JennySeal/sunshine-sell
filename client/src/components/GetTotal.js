// Calculates the total price for the cart = used in Cart and Checkout


const GetTotal = (cart) => {
    let total_cost = 0;
  cart.forEach((object) => {
    total_cost += parseFloat(object.price);
  });
  return total_cost.toFixed(2);
}

export default GetTotal;