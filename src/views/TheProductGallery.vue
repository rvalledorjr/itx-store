<template>
  <v-sheet>
    <v-container>
      <v-row>
        <v-col v-for="(p, i) in filteredProducts" :key="i" md="3">
          <ProductCard :product="p" />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import ProductCard from "@/components/ProductCard.vue";
export default Vue.extend({
  components: {
    ProductCard,
  },

  computed: {
    ...mapGetters(["filteredProducts"]),
  },
});
</script>
