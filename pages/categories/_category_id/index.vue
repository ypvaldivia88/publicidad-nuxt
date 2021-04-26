<template>
  <div>
    <h3>{{ $store.state.categories.category }}</h3>
  </div>
</template>

<script>
export default {
  name: "showCategory",
  async fetch({ store, params }) {
    console.log(params);
    await store.dispatch("categories/show", {
      category_id: params.category_id
    });
  }
};
</script>

<style scoped></style>
