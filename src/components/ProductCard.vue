<template>
  <v-card flat outlined class="pt-3">
    <a @click.prevent="emitClickProduct">
      <v-img :src="product.image" height="150" contain> </v-img>
      <v-card-title class="text-body-1">
        {{ product.formattedPrice }}
      </v-card-title>
      <v-card-subtitle>
        {{ product.title }}
      </v-card-subtitle>
    </a>

    <v-card-actions>
      <v-btn color="#95ac42" tile block @click="emitClickAddToCart">
        <v-icon>mdi-cart-plus</v-icon>
        <span class="ml-3">
          Add to Cart
        </span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Product from "@/model/Product";
export default Vue.extend({
  props: {
    product: {
      default: () => new Product(),
    },
  },
  methods: {
    emitClickProduct() {
      this.$emit("click:product", this.product);
    },
    emitClickAddToCart() {
      this.$emit("click:add-to-cart", this.product);
    },
  },
});
</script>
