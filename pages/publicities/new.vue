<template>
    <publicity-form></publicity-form>
</template>

<script>
  import PublicityForm from '~/components/PublicityForm';
  export default {
    components: {PublicityForm},
    fetch({store}) {
      store.commit('publicity/setPublicity', {})
    }
  }
</script>