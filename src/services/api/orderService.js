const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class OrderService {
  constructor() {
    this.orders = [];
  }

  async createOrder(orderData) {
    await delay(500);
    
    const order = {
      Id: Date.now(),
      ...orderData,
      status: "confirmed",
      orderDate: new Date().toISOString(),
      orderNumber: `VT${Date.now().toString().slice(-6)}`
    };

    this.orders.push(order);
    
    return {
      success: true,
      data: order
    };
  }

  async getOrderById(id) {
    await delay(200);
    
    const order = this.orders.find(o => o.Id === parseInt(id));
    
    if (!order) {
      return {
        success: false,
        error: "Order not found"
      };
    }

    return {
      success: true,
      data: order
    };
  }

  async processPayment(paymentData) {
    await delay(1000);
    
    // Simulate payment processing
    const success = Math.random() > 0.1; // 90% success rate
    
    if (success) {
      return {
        success: true,
        data: {
          transactionId: `txn_${Date.now()}`,
          status: "completed"
        }
      };
    } else {
      return {
        success: false,
        error: "Payment failed. Please try again."
      };
    }
  }
}

export default new OrderService();