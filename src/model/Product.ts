import PriceRange from "./PriceRange";

export default class Product {
  id = 0;
  title = "";
  price = 0.0;
  description = "";
  category = "";
  image = "";

  constructor(init?: any) {
    if (!init) return;

    this.id = init.id || 0;
    this.title = init.title || "";
    this.price = init.price || 0.0;
    this.description = init.description || "";
    this.category = init.category;
    this.image = init.image || "";
  }

  get formattedPrice() {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "EUR",
    }).format(this.price);
  }

  withinPriceRange(priceRange: PriceRange): boolean {
    return this.price >= priceRange.from && this.price <= priceRange.to;
  }
}
