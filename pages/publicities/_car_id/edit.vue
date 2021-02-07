<template>
  <publicity-form></publicity-form>
</template>

<script>
  import PublicityForm from "~/components/PublicityForm";
  export default {
    name: "editPublicity",
    components: {PublicityForm},
    async fetch({store, params}) {
      await store.dispatch('publicity/show', {publicity_id: params.publicity_id});
    }
  }
</script>