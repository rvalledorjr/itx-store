import Product from "@/model/Product";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import PriceRange from "@/model/PriceRange";
import ShoppingCart from "@/model/ShoppingCart";
import ShoppingCartItem from "@/model/ShoppingCartItem";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    products: [] as Product[],
    filter: (p: Product) => p as any,
    comparator: (p1: Product, p2: Product) => p1 as any,
    productsFetching: false,
    shoppingCart: new ShoppingCart(),
  },
  getters: {
    productCategories(state) {
      return new Set([...state.products.map((p) => p.category)]);
    },
    filteredProducts(state) {
      return state.products.filter(state.filter).sort(state.comparator);
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
    SORT_PRODUCTS_BY_TITLE(state, descending: boolean) {
      state.comparator = (p1: Product, p2: Product) =>
        p1.compareTitleWith(p2, descending);
    },
    SORT_PRODUCTS_BY_PRICE(state, descending: boolean) {
      state.comparator = (p1: Product, p2: Product) =>
        p1.comparePriceWith(p2, descending);
    },
    SEARCH_PRODUCTS(state, searchText: string) {
      state.filter = (p: Product) => p.containsInfo(searchText);
    },
    ADD_TO_CART(state, product: Product) {
      state.shoppingCart.add(product);
    },
    SET_PRODUCT_QUANTITY(state, load: { product: Product; quantity: 1 }) {
      state.shoppingCart.setProductQuantity(load.product, load.quantity);
    },
    REMOVE_FROM_CART(state, product: Product) {
      state.shoppingCart.remove(product);
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
