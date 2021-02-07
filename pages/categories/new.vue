<template>
    <category-form></category-form>
</template>

<script>
  import CategoryForm from '~/components/CategoryForm';
  export default {
    components: {CategoryForm},
    fetch({store}) {
      store.commit('category/setCategory', {})
    }
  }
</script>