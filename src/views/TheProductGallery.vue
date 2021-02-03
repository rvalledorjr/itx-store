<template>
  <v-sheet style="width: 100%;">
    <v-container>
      <v-data-iterator
        :items="filteredProducts"
        :items-per-page="20"
        :loading="productsFetching"
        hide-default-footer
      >
        <template v-slot:default="{ items }">
          <v-row>
            <v-col v-for="(p, i) in items" :key="i" md="3">
              <ProductCard :product="p" />
            </v-col>
          </v-row>
        </template>

        <template v-slot:no-data>
          <v-card flat>
            <v-container>
              <v-row justify="center">
                <v-col cols="auto">
                  <v-icon size="90">
                    mdi-package-variant
                  </v-icon>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="auto" class="text-center">
                  <span class="text-h6">No Products Found</span>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </template>

        <template v-slot:loading>
          <div class="d-flex flex-column align-center">
            <v-progress-circular
              indeterminate
              size="50"
              color="#95ac42"
            ></v-progress-circular>
            <p class="mt-3">Fetching products...</p>
          </div>
        </template>
      </v-data-iterator>
    </v-container>
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapState } from "vuex";
import ProductCard from "@/components/ProductCard.vue";
export default Vue.extend({
  components: {
    ProductCard,
  },

  computed: {
    ...mapState(["productsFetching"]),
    ...mapGetters(["filteredProducts"]),
  },
});
</script>
