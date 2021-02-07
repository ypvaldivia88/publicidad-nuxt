<template>
  <div>
    <h3>{{$store.state.categories.category.title}}</h3>
  </div>
</template>

<script>
  export default {
    name: "showCategory",
    async fetch({store, params}) {
      await store.dispatch('category/show', {category_id: params.category_id});
    }
  }
</script>

<style scoped>

</style>