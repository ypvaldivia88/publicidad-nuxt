<template>
  <client-form></client-form>
</template>

<script>
import ClientForm from "~/components/ClientForm";
export default {
  name: "editClient",
  components: { ClientForm },
  async fetch({ store, params }) {
    await store.dispatch("clients/show", { client_id: params.client_id });
  }
};
</script>
