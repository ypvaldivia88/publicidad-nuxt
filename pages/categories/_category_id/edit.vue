<template>
  <category-form></category-form>
</template>

<script>
import CategoryForm from "~/components/CategoryForm";
export default {
  name: "editCategory",
  components: { CategoryForm },
  async fetch({ store, params }) {
    await store.dispatch("categories/show", {
      category_id: params.category_id
    });
  }
};
</script>
