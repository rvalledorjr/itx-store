<template>
  <div>
    <v-subheader> Filter </v-subheader>
    <v-divider></v-divider>
    <v-list-item>
      <div>
        <p class="text-caption">Price range</p>
        <v-range-slider
          :min="productPriceRange.min"
          :max="productPriceRange.max"
          v-model="productPriceRange.range"
          thumb-label
          hide-details
          @end="emitFilterByPriceRangeProduct"
        >
        </v-range-slider>
        <v-list-item-content>
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
        </v-list-item-content>
      </div>
    </v-list-item>

    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
import PriceRange from "@/model/PriceRange";
import Vue from "vue";
export default Vue.extend({
  props: {
    productPriceRange: {
      default: () =>
        new PriceRange({
          min: Number.MIN_VALUE,
          max: Number.MAX_VALUE,
          range: [],
        }),
    },
  },
  methods: {
    emitFilterByPriceRangeProduct() {
      this.$emit("filter-by-price-range:product");
    },
  },
});
</script>
