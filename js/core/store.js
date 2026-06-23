// js/core/store.js
// Centralized State Management System (Redux-like Architecture)

export class Store {
  constructor(initialState = {}) {
    this.state = {
      cart: [],
      user: {
        name: 'Harmony User',
        points: 1250,
        level: 'Diamond'
      },
      currentDevice: 'dev_phone_01',
      activeTask: null,
      distributedSession: null,
      ...initialState
    };
    this.listeners = [];
  }

  // Subscribe to state changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Dispatch actions to mutate state
  dispatch(action) {
    console.log(`[Store] Action dispatched: ${action.type}`, action.payload);
    
    switch (action.type) {
      case 'ADD_TO_CART':
        const existing = this.state.cart.find(item => item.productId === action.payload.productId);
        if (existing) {
          existing.quantity += action.payload.quantity;
        } else {
          this.state.cart.push(action.payload);
        }
        break;
      
      case 'REMOVE_FROM_CART':
        this.state.cart = this.state.cart.filter(item => item.productId !== action.payload.productId);
        break;

      case 'UPDATE_CART_QUANTITY':
        const item = this.state.cart.find(i => i.productId === action.payload.productId);
        if (item) item.quantity = action.payload.quantity;
        break;

      case 'CLEAR_CART':
        this.state.cart = [];
        break;

      case 'START_DISTRIBUTED_TASK':
        this.state.activeTask = action.payload.task;
        this.state.distributedSession = {
          sessionId: `sess_${Date.now()}`,
          targetDevice: action.payload.targetDeviceId,
          status: 'connecting'
        };
        break;

      case 'UPDATE_DISTRIBUTED_STATUS':
        if (this.state.distributedSession) {
          this.state.distributedSession.status = action.payload.status;
        }
        break;

      default:
        console.warn(`[Store] Unhandled action type: ${action.type}`);
    }

    this.notify();
  }

  // Notify all listeners
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Selectors
  getState() {
    return this.state;
  }

  getCartTotal() {
    return this.state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartCount() {
    return this.state.cart.reduce((count, item) => count + item.quantity, 0);
  }
}

// Singleton instance
export const appStore = new Store();
