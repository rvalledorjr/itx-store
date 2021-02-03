import Product from "@/model/Product";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import PriceRange from "@/model/PriceRange";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products: [] as Product[],
    filter: (p: Product) => p as any,
    productsFetching: false,
  },
  getters: {
    productCategories(state) {
      return new Set([...state.products.map((p) => p.category)]);
    },
    filteredProducts(state) {
      return state.products.filter(state.filter);
    },
    productMinAndMaxPrices(state) {
      const sortedProducts = state.products.sort(
        (p1, p2) => p1.price - p2.price
      );
      return [
        sortedProducts[0]?.price,
        sortedProducts[sortedProducts.length - 1]?.price,
      ];
    },
  },
  mutations: {
    BULK_ADD_PRODUCTS(state, products: Product[]) {
      state.products.push(...products);
    },
    FILTER_PRODUCT_BY_CATEGORY(state, category: string) {
      state.filter = (p: Product) => p.category === category;
    },
    FILTER_PRODUCT_BY_PRICE_RANGE(state, priceRange: PriceRange) {
      state.filter = (p: Product) => p.withinPriceRange(priceRange);
    },
    RESET_PRODUCT_FILTER(state) {
      state.filter = (p: Product) => p as any;
    },
    SET_PRODUCTS_FETCHING(state, status: boolean) {
      state.productsFetching = status;
    },
  },
  actions: {
    async fetchProducts(context) {
      try {
        context.commit("SET_PRODUCTS_FETCHING", true);

        const response = await axios.get("https://fakestoreapi.com/products");
        const productsData = response.data as [];

        const products = productsData.map((pd) => new Product(pd));

        context.commit("SET_PRODUCTS_FETCHING", false);
        context.commit("BULK_ADD_PRODUCTS", products);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});

export default store;
