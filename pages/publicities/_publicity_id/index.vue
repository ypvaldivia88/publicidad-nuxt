<template>
  <div>
    <h3>{{ $store.state.publicities.publicity.nombre }}</h3>
  </div>
</template>

<script>
export default {
  name: "showPublicity",
  async fetch({ store, params }) {
    await store.dispatch("publicity/show", {
      publicity_id: params.publicity_id
    });
  }
};
</script>

<style scoped></style>
