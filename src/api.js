export const fetchUserOrders = (userEmail) => {
    return fetch('/data/orders.json')
      .then(response => response.json())
      .then(orders => orders.filter(order => order.userEmail === userEmail));
  };
  