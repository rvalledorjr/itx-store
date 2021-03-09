<template>
  <v-app>
    <v-app-bar app elevation="1" outlined clipped-left color="white">
      <v-app-bar-nav-icon @click="showNavDrawer = !showNavDrawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <a @click.prevent="resetSearch">
          <v-img src="./assets/luxcaddy-logo.png"></v-img>
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchText"
        placeholder="Search product"
        solo
        hide-details
        clearable
        append-icon="mdi-magnify"
        @keyup.enter="searchProduct"
        @click:clear="resetSearch"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon x-large>
        <v-icon>mdi-moped-outline</v-icon>
      </v-btn>
      <v-btn icon x-large>
        <v-icon>mdi-message-processing-outline</v-icon>
      </v-btn>
      <v-btn icon x-large>
        <v-icon>mdi-frequently-asked-questions</v-icon>
      </v-btn>
      <v-btn icon x-large>
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="showNavDrawer" clipped app>
      <v-list>
        <router-view
          name="productSorter"
          @sort:title="sortByTitle"
          @sort:price="sortByPrice"
        />

        <router-view
          name="productFilter"
          :productPriceRange="productPriceRange"
          @filter-by-price-range:product="filterProductsByPriceRange"
        />

        <v-subheader> Categories </v-subheader>
        <v-divider></v-divider>
        <v-list-item @click="showAllProducts">
          <v-list-item-title> All products </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="(c, i) in productCategories"
          :key="i"
          @click="showProductsWithCategory(c)"
        >
          <v-list-item-title> {{ c }} </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fill-height>
        <v-row justify="center">
          <router-view></router-view>
        </v-row>
      </v-container>

      <v-menu
        offset-y
        top
        origin="center center"
        transition="scale-transition"
        :close-on-content-click="false"
        max-height="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            fab
            bottom
            right
            fixed
            large
            v-on="on"
            v-bind="attrs"
          >
            <v-badge
              right
              color="red"
              :value="shoppingCart.totalQuantity"
              :content="shoppingCart.totalQuantity"
            >
              <v-icon large>mdi-cart-plus</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card width="500">
          <v-card-text style="height: 300px; overflow-y: auto">
            <v-list>
              <v-list-item v-if="shoppingCart.empty">
                <v-list-item-title>
                  No items added to cart
                </v-list-item-title>
              </v-list-item>
              <ShoppingCartListItem
                v-for="(c, i) in shoppingCart.cartItems"
                :key="i"
                :cartItem="c"
                @set:product-quantity="updateQuantity"
                @click:remove-product="removeCartItem"
              >
              </ShoppingCartListItem>
            </v-list>
          </v-card-text>
          <v-card-actions class="text-body-1">
            <div class="ml-auto pa-2">
              <span class="ml-auto">Total Qty: </span>
              <span class="font-weight-black text-h5">
                {{ shoppingCart.totalQuantity }}
              </span>

              <span class="ml-5">Total Price: </span>
              <span class="font-weight-black text-h5">
                {{ shoppingCart.formattedTotalPrice }}
              </span>
            </div>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import PriceRange from "@/model/PriceRange";
import ShoppingCartListItem from "@/components/ShoppingCartListItem.vue";
import Product from "./model/Product";
export default Vue.extend({
  components: {
    ShoppingCartListItem,
  },
  data() {
    return {
      productPriceRange: {} as PriceRange,
      searchText: "",
      showNavDrawer: true,
      showCart: false,
    };
  },
  computed: {
    ...mapState(["shoppingCart"]),
    ...mapGetters(["productCategories", "productMinAndMaxPrices"]),
  },
  methods: {
    ...mapMutations([
      "FILTER_PRODUCT_BY_CATEGORY",
      "RESET_PRODUCT_FILTER",
      "FILTER_PRODUCT_BY_PRICE_RANGE",
      "SORT_PRODUCTS_BY_TITLE",
      "SORT_PRODUCTS_BY_PRICE",
      "SEARCH_PRODUCTS",
      "SET_PRODUCT_QUANTITY",
      "REMOVE_FROM_CART",
    ]),
    ...mapActions(["fetchProducts"]),
    showAllProducts() {
      this.RESET_PRODUCT_FILTER();

      this.goToHome();
    },
    showProductsWithCategory(category: string) {
      this.FILTER_PRODUCT_BY_CATEGORY(category);

      this.goToHome();
    },
    filterProductsByPriceRange() {
      this.FILTER_PRODUCT_BY_PRICE_RANGE(this.productPriceRange);
    },
    sortByTitle(order: number) {
      this.SORT_PRODUCTS_BY_TITLE(!!order);
    },
    sortByPrice(order: number) {
      this.SORT_PRODUCTS_BY_PRICE(!!order);
    },
    searchProduct() {
      this.SEARCH_PRODUCTS(this.searchText);
      this.goToHome();
    },
    resetSearch() {
      this.searchText = "";
      this.SEARCH_PRODUCTS(this.searchText);
      this.goToHome();
    },
    goToHome() {
      if (this.$route.path === "/") return;

      this.$router.push("/");
    },
    updateQuantity(product: Product, qty: number) {
      this.SET_PRODUCT_QUANTITY({ product: product, quantity: qty });
    },
    removeCartItem(product: Product) {
      this.REMOVE_FROM_CART(product);
    },
  },
  async mounted() {
    try {
      await this.fetchProducts();

      const minMax = this.productMinAndMaxPrices as number[];
      this.productPriceRange = new PriceRange({
        min: minMax[0],
        max: minMax[1],
        range: [...minMax],
      });
    } catch (error) {
      console.log(error);
    }
  },
});
</script>

<style lang="scss" scoped>
.t-24 {
  top: 24px !important;
}
</style>
