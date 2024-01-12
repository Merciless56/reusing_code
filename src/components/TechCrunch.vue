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
      <button :disabled="page.value === 1" @click="page.value--">Prev</button>
      {{ page.value }}
      <button @click="page.value++">Next</button>
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
import { useFilterable } from "../use/filterable";

export default {
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
  },

  created() {
    this.loadCategories();

    const { page, filters, items } = useFilterable(
      {
        loadItems: getPosts,
        initialfilters: {
          categories: null,
        },
      },
      this
    );
    this.page = page;
    this.filters = filters;
    this.items = items;
  },
};
</script>
