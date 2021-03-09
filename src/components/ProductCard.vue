<template>
  <v-card flat outlined class="pt-3">
    <a @click.prevent="emitClickProduct">
      <v-img :src="product.image" height="150" contain> </v-img>
      <v-card-title class="text-body-1">
        {{ product.formattedPrice }}
      </v-card-title>
    </a>
    <v-card-subtitle class="d-flex flex-column">
      <div v-if="product.showFullTitle" >{{ product.title }}</div>
      <div v-else style="height: 1rem; overflow: hidden;">{{ product.title }}</div>
      <v-btn icon class="mx-auto" @click="product.showFullTitle = !product.showFullTitle">
        <v-icon v-if="product.showFullTitle" color="#95ac42">mdi-chevron-up-circle</v-icon>
        <v-icon v-else color="#95ac42">mdi-chevron-down-circle</v-icon>
      </v-btn>
    </v-card-subtitle>
    

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
