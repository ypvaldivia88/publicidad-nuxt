<template>
  <div>
    <h3>{{$store.state.clients.client.title}}</h3>
  </div>
</template>

<script>
  export default {
    name: "showClient",
    async fetch({store, params}) {
      await store.dispatch('client/show', {client_id: params.client_id});
    }
  }
</script>

<style scoped>

</style>