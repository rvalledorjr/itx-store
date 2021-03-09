import PriceRange from "./PriceRange";

export default class Product {
  id = 0;
  title = "";
  price = 0.0;
  description = "";
  category = "";
  image = "";
  showFullTitle = false;

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

  comparePriceWith(other: Product, reverse = false): number {
    return !reverse ? this.price - other.price : other.price - this.price;
  }

  compareTitleWith(other: Product, reverse = false): number {
    const t1 = this.title.toLowerCase();
    const t2 = other.title.toLowerCase();

    return !reverse ? t1.localeCompare(t2) : t2.localeCompare(t1);
  }

  containsInfo(info: string): boolean {
    const strRep = `${this.id} ${this.title} ${this.price} ${this.description} ${this.category}`;
    return strRep.toLowerCase().includes(info.toLowerCase());
  }
}
