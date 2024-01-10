<template>
  <div id="app">
    <select v-model="selectedTab">
      <option value="techcrunch">TechCrunch</option>
      <option value="starwars">StarWars</option>
    </select>
    <hr />
    <TechCrunch v-if="selectedTab === 'techcrunch'" />
    <StarWars v-if="selectedTab === 'starwars'" />
  </div>
</template>

<script>
import TechCrunch from "./components/TechCrunch.vue";
import StarWars from "./components/StarWars.vue";

export default {
  name: "App",
  components: {
    TechCrunch,
    StarWars,
  },
  data() {
    return {
      selectedTab: "starwars",
    };
  },
  methods: {
    syncHash() {
      const urlParams = new URLSearchParams(window.location.hash.substring(1));

      this.selectedTab = Object.fromEntries(urlParams.entries()).selectedTab;
    },

    updateHash() {
      const urlParams = new URLSearchParams();

      urlParams.append("selectedTab", this.selectedTab);

      window.location.hash = urlParams.toString();
    },
  },
  created() {
    window.addEventListener("hashchange", this.syncHash);
    this.syncHash();
  },

  beforeUnmount() {
    window.removeEventListener("hashchange", this.syncHash);
  },
  watch: {
    selectedTab() {
      this.updateHash();
    },
  },
};
</script>

<style></style>
