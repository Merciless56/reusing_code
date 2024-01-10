<template>
  <div>
    <label
      >Category:
      <select v-model="filters.selectedCategory">
        <option
          v-for="(category, inx) in availableCategories"
          :key="inx"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </label>
    <hr />

    <div>
      <button :disabled="page === 1" @click="page--">Prev</button>
      {{ page }}
      <button @click="page++">Next</button>
    </div>
    <hr />

    <ul>
      <li v-for="(item, inx) in items" :key="inx">
        <a target="_blank" :href="item.link" v-html="item.title.rendered"></a>
      </li>
    </ul>
  </div>
</template>
<script>
import { getPosts, getCategories } from "../api/techcrunch";
import { filterableMixin } from './mixins/filterable';

export default {
  mixins:[filterableMixin],
  data() {
    return {
      categories: [],
    };
  },
  computed: {
    availableCategories() {
      return [{ id: null, name: "(no category)" }, ...this.categories];
    },
  },
  methods: {
    async loadCategories() {
      this.categories = await getCategories();
    },

    async loadItems() {
      this.items = await getPosts({
        page: this.page,
        filters: this.filters,
      });
    },
  },

  created() {
    this.loadCategories();
  },

  watch: {
    page() {
      this.loadItems();
      this.updateHash();
    },
    selectedCategory() {
      this.loadItems();
      this.updateHash();
      
      this.page = 1;
    },
  },
};
</script>