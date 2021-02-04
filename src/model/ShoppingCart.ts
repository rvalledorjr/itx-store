import Product from "./Product";
import ShoppingCartItem from "./ShoppingCartItem";

export default class ShoppingCart {
  cartItems = [] as ShoppingCartItem[];

  get totalPrice(): number {
    let total = 0;

    for (const ci of this.cartItems) {
      total = total + ci.totalUnitPrice;
    }

    return total;
  }

  get formattedTotalPrice(): string {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "EUR",
    }).format(this.totalPrice);
  }

  get totalQuantity(): number {
    let totalQty = 0;
    for (const ci of this.cartItems) {
      totalQty = totalQty + ci.quantity;
    }
    return totalQty;
  }

  get empty(): boolean {
    return this.cartItems.length === 0;
  }

  add(product: Product) {
    if (!product) return;

    const cartItem = this.cartItems.find((ci) => ci.product.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.cartItems.push(
        new ShoppingCartItem({ product: product, quantity: 1 })
      );
    }
  }

  setProductQuantity(product: Product, quantity = 1) {
    if (!product) return;

    const cartItem = this.cartItems.find((ci) => ci.product.id === product.id);
    if (cartItem) {
      cartItem.quantity = quantity;
    } else {
      this.add(product);
    }
  }

  remove(product: Product) {
    if (!product) return;

    const cartItem = this.cartItems.find((ci) => ci.product.id === product.id);
    if (!cartItem) return;

    const i = this.cartItems.indexOf(cartItem);
    this.cartItems.splice(i, 1);
  }
}
