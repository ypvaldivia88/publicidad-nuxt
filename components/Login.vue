<template>
  <b-card v-if="!$auth.loggedIn" title="Iniciar sesión">
    <b-form @submit.prevent="loginSubmit" method="post">
      <b-form-group
        id="emailGroup"
        label="Correo electrónico"
        label-for="emailInput"
      >
        <b-form-input
          id="emailInput"
          name="user[email]"
          type="email"
          v-model="form.email"
          required
          autofocus
          placeholder="Correo electrónico"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="passwordGroup"
        label="Contraseña"
        label-for="passwordInput"
      >
        <b-form-input
          id="passwordInput"
          name="user[password]"
          type="password"
          v-model="form.password"
          required
          placeholder="Contraseña"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Acceder</b-button>
    </b-form>
    <hr />
    <b-row>
      <b-col>
        <b-link :to="{ path: 'register' }">Registrarme</b-link>
      </b-col>
      <b-col class="text-right">
        <b-link :to="{ path: 'reset-password' }">Olvidó su contraseña?</b-link>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  data: () => {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.go("/");
    }
  },
  methods: {
    async loginSubmit() {
      await this.$store
        .dispatch("user/login", this.form)
        .then(this.success)
        .catch(this.unauthorized);
    },
    success() {
      this.$notify({
        group: "alerts",
        text: "Ud. se ha autenticado correctamente"
      });
      console.log(this.$auth);
      this.$router.push("/");
    },
    unauthorized() {
      this.$notify({
        group: "alerts",
        text: "Los datos de acceso no son válidos",
        color: "danger"
      });
    }
  }
};
</script>
