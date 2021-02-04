import Product from "./Product";

export default class ShoppingCartItem {
  product = new Product();
  quantity = 0;

  constructor(init: any) {
    if (!init) return;

    this.product = init.product as Product;
    this.quantity = init.quantity || 0;
  }

  get totalUnitPrice(): number {
    if (!this.product) return 0;

    return this.product.price * this.quantity;
  }

  get formattedTotalUnitPrice(): string {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "EUR",
    }).format(this.totalUnitPrice);
  }
}
