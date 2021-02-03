<template>
  <v-app>
    <v-app-bar app elevation="1" outlined clipped-left color="white">
      <v-app-bar-nav-icon @click="showNavDrawer = !showNavDrawer">
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <a @click.prevent="goToHome">
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
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import PriceRange from "@/model/PriceRange";
export default Vue.extend({
  data() {
    return {
      productPriceRange: {} as PriceRange,
      searchText: "",
      showNavDrawer: true,
    };
  },
  computed: {
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
    ]),
    ...mapActions(["fetchProducts"]),
    showAllProducts() {
      this.RESET_PRODUCT_FILTER();
    },
    showProductsWithCategory(category: string) {
      this.FILTER_PRODUCT_BY_CATEGORY(category);
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
    },
    resetSearch() {
      this.searchText = "";
      this.SEARCH_PRODUCTS(this.searchText);
    },
    goToHome() {
      if (this.$route.path === "/") return;

      this.$router.push("/");
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
