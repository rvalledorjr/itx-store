export default class PriceRange {
  min = Number.MIN_VALUE;
  max = Number.MAX_VALUE;
  private p_range = [] as number[];

  constructor(init?: { range: number[]; min: number; max: number }) {
    if (!init) return;

    this.min = init.min || this.min;
    this.max = init.max || this.min;

    if (!(init.range || (init.range as number[]).length === 2)) return;
    this.p_range = init.range;
  }

  get range() {
    return this.p_range;
  }
  set range(value: number[]) {
    if (value.length !== 2) return;

    this.p_range = value;
  }

  get from() {
    return this.range[0];
  }
  set from(value: number) {
    if (value >= this.min || value <= this.max) {
      this.p_range.splice(0, 1, value);
    }
  }

  get to() {
    return this.p_range[this.range.length - 1];
  }
  set to(value: number) {
    if (value >= this.to || value <= this.max) {
      this.p_range.splice(1, 1, value);
    }
  }
}
