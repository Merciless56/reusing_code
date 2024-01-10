<template>
  <div>
    <label>Planet: <input v-model.lazy="filters.search" /> </label>
    <hr />

    <div>
      <button :disabled="page === 1" @click="page--">Prev</button>
      {{ page }}
      <button @click="page++">Next</button>
    </div>
    <hr />

    <ul>
      <li v-for="(item, inx) in items" :key="inx">
        <a target="_blank" :href="item.link">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { getPlanets } from "../api/starwars";
import { filterableMixin } from "./mixins/filterable";

export default {
  mixins: [filterableMixin],
  methods: {
    async loadItems() {
      const { results } = await getPlanets({
        page: this.page,
        ...this.filters,
      });
      this.items = results;
    },
  },
};
</script>