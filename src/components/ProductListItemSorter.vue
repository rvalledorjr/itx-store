<template>
  <div>
    <v-subheader> Sort </v-subheader>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-item-action-text class="text-caption">
        Product Name
      </v-list-item-action-text>
      <v-list-item-action>
        <v-btn-toggle v-model="titleSort" @change="emitSortTitle">
          <v-btn>
            <v-icon>mdi-sort-alphabetical-ascending</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-sort-alphabetical-descending</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-list-item-action>
    </v-list-item>
    <v-list-item>
      <v-list-item-action-text class="text-caption">
        Product Price
      </v-list-item-action-text>
      <v-list-item-action>
        <v-btn-toggle v-model="priceSort" @change="emitSortPrice">
          <v-btn>
            <v-icon>mdi-sort-numeric-ascending</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-sort-numeric-descending</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-list-item-action>
    </v-list-item>

    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      titleSort: -1,
      priceSort: -1,
    };
  },

  methods: {
    emitSortTitle(order: number) {
      this.priceSort = -1;
      this.$emit("sort:title", order);
    },
    emitSortPrice(order: number) {
      this.titleSort = -1;
      this.$emit("sort:price", order);
    },
  },
});
</script>
