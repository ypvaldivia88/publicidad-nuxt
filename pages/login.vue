<template>
  <b-container fluid class="footer-pad">
    <b-row class="h-60" align-h="center" align-v="center">
      <b-col sm="12" lg="6">
        <login v-if="!$auth.loggedIn"></login>
        <b-card v-if="$auth.loggedIn" variant="success">
          <b-progress :value="100" striped animated></b-progress>
          Cargando <b-link :to="'/usuarios/'">Usuarios</b-link>...
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<style scoped>
  .h-60 {
    height: 60vh;
  }
</style>
<script>
  import Login from '~/components/Login.vue'

  export default {
    components: {
      Login
    }
  }
</script>
