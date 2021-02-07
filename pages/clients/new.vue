<template>
    <client-form></client-form>
</template>

<script>
  import ClientForm from '~/components/ClientForm';
  export default {
    components: {ClientForm},
    fetch({store}) {
      store.commit('client/setClient', {})
    }
  }
</script>