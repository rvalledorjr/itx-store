<template>
  <v-app>
    <v-app-bar app elevation="1" outlined clipped-left color="white">
      <v-toolbar-title>
        <v-img src="./assets/luxcaddy-logo.png"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        placeholder="Search product"
        solo
        hide-details
        clearable
        append-icon="mdi-magnify"
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

    <v-navigation-drawer clipped app>
      <v-list>
        <v-subheader> Categories </v-subheader>
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
        <v-subheader> Filter </v-subheader>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <p class="text-caption">Price range</p>
              <v-range-slider
                :min="productPriceRange.min"
                :max="productPriceRange.max"
                v-model="productPriceRange.range"
                thumb-label
                hide-details
              >
              </v-range-slider>
              <v-list-item-subtitle>
                <v-row>
                  <v-col md="6">
                    <span>From: </span>
                    <v-text-field
                      v-model="productPriceRange.from"
                      hide-details
                      outlined
                      type="number"
                      :min="productPriceRange.min"
                      :max="productPriceRange.max"
                      placeholder="From"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col md="6">
                    <span>To: </span>
                    <v-text-field
                      v-model="productPriceRange.to"
                      hide-details
                      outlined
                      type="number"
                      placeholder="To"
                      :min="productPriceRange.to"
                      :max="productPriceRange.max"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
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
      productPriceRange: {},
    };
  },
  computed: {
    ...mapGetters(["productCategories", "productMinAndMaxPrices"]),
  },
  watch: {
    productPriceRange(nv, ov) {
      if (nv === ov) return;
      if (nv === {}) return;

      this.FILTER_PRODUCT_BY_PRICE_RANGE(nv);
    },
  },
  methods: {
    ...mapMutations([
      "FILTER_PRODUCT_BY_CATEGORY",
      "RESET_PRODUCT_FILTER",
      "FILTER_PRODUCT_BY_PRICE_RANGE",
    ]),
    ...mapActions(["fetchProducts"]),
    showAllProducts() {
      this.RESET_PRODUCT_FILTER();
    },
    showProductsWithCategory(category: string) {
      this.FILTER_PRODUCT_BY_CATEGORY(category);
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
