export const filterableMixin = {
  data() {
    return {
      items: [],
      page: 1,
      filters: {},
    };
  },
  methods: {
    syncHash() {
      const urlParams = new URLSearchParams(window.location.hash.substring(1));

      const { page, ...filters } = Object.fromEntries(urlParams.entries());

      Object.entries(filters).forEach((key, value) => {
        this[key] = value;
      });

      if (page) {
        this.page = page;
      }
    },

    updateHash() {
      const urlParams = new URLSearchParams();
      Object.entries(this.filters).forEach((key, value) => {
        if (value) {
          urlParams.append(key, value);
        }
      });
      if (this.page !== 1) {
        urlParams.append("page", this.page);
      }

      console.log(urlParams.toString());
      window.location.hash = urlParams.toString();
    },
  },

  created() {
    window.addEventListener("hashchange", this.syncHash);
    this.syncHash();
    this.loadItems();
  },

  beforeUnmount() {
    window.removeEventListener("hashchange", this.syncHash);
  },

  watch: {
    page() {
      this.loadItems();
      this.updateHash();
    },
    filters: {
      deep: true,
      handler() {
        this.loadItems();
        this.updateHash();
        this.page = 1;
      },
    },
  },
};
