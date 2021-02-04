<template>
  <v-list-item>
    <v-list-item-avatar tile size="50">
      <v-avatar tile>
        <v-img :src="cartItem.product.image" contain></v-img>
      </v-avatar>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        {{ cartItem.product.title }}
      </v-list-item-title>
      <v-list-item-subtitle>
        <span>Price: </span>
        <span class="font-weight-bold">
          {{ cartItem.product.formattedPrice }}
        </span>
        <span class="ml-4">Total: </span>
        <span class="font-weight-bold">
          {{ cartItem.formattedTotalUnitPrice }}
        </span>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-list-item-action>
      <div class="d-flex" style="width: 80px">
        <v-text-field
          :value="cartItem.quantity"
          type="number"
          hide-details
          dense
          :min="1"
          @change="emitSetProductQuantity"
        >
        </v-text-field>
        <v-btn icon @click="emitClickRemoveProduct">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
    </v-list-item-action>
  </v-list-item>
</template>

<script lang="ts">
import ShoppingCartItem from "@/model/ShoppingCartItem";
import Vue from "vue";
export default Vue.extend({
  props: {
    cartItem: {
      default: () => new ShoppingCartItem({}),
    },
  },
  methods: {
    emitSetProductQuantity(qty: any) {
      this.$emit(
        "set:product-quantity",
        this.cartItem.product,
        Number.parseFloat(qty)
      );
    },
    emitClickRemoveProduct() {
      this.$emit("click:remove-product", this.cartItem.product);
    },
  },
});
</script>
