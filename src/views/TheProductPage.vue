<template>
  <v-sheet>
    <v-container>
      <v-row>
        <v-col md="6">
          <v-img :src="product.image"></v-img>
        </v-col>
        <v-col>
          <v-card flat>
            <v-card-title class="text-h5">
              {{ product.title }}
            </v-card-title>
            <v-card-subtitle>
              {{ product.category }}
            </v-card-subtitle>
            <v-card-text>
              {{ product.description }}
            </v-card-text>
            <v-card-title>
              {{ product.formattedPrice }}
            </v-card-title>
            <v-card-actions>
              <v-btn tile x-large color="#95ac42" class="ml-auto">
                <v-icon>mdi-cart-plus</v-icon>
                Add to cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import Product from "@/model/Product";
import Vue from "vue";
import { mapState } from "vuex";
export default Vue.extend({
  data() {
    return {
      product: {} as Product,
    };
  },
  computed: {
    ...mapState(["products"]),
  },
  mounted() {
    const id = Number.parseInt(this.$route.params.id);
    const products = this.products as Product[];
    this.product = products.find((p: Product) => p.id === id) as Product;
  },
});
</script>
