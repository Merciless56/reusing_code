import { reactive } from "vue";

export function useFilterable({ loadItems, initialfilters }, component) {
  const watch = component.$watch.bind(component);

  const page = reactive({ value: 1 });
  const filters = reactive({
    ...initialfilters,
  });
  const items = reactive([]);

  watch(
    () => page.value,
    () => {
      console.log("page changed");
    }
  );
  watch(
    () => filters,
    () => {
      console.log("filterschanged");
    },
    {
      deep: true,
    }
  );
  loadItems().then((responseItems) => {
    items.length = 0;
    items.push(...responseItems);
  });

  return {
    page,
    filters,
    items,
  };
}
