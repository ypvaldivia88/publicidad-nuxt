<template>
  <category-form></category-form>
</template>

<script>
  import CategoryForm from "~/components/CategoryForm";
  export default {
    name: "editCategory",
    components: {CategoryForm},
    async fetch({store, params}) {
      await store.dispatch('category/update', {id: params.id});
    }
  }
</script>