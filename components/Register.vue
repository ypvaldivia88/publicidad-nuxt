<template>
  <b-card v-if="!$auth.loggedIn" title="Registrarme">
    <b-form @submit.prevent="registerSubmit" method="post">
      <b-form-group id="nameGroup"
                    label="Nombre" label-for="nameInput">
        <b-form-input id="nameInput" name="user[name]"
                      type="text" v-model="form.name" required autofocus
                      placeholder="Nombre"></b-form-input>
      </b-form-group>

      <b-form-group id="lastnameGroup"
                    label="Apellidos" label-for="lastnameInput">
        <b-form-input id="lastnameInput" name="user[lastname]"
                      type="text" v-model="form.lastname" required
                      placeholder="Apellidos"></b-form-input>
      </b-form-group>

      <b-form-group id="usernameGroup"
                    label="Usuario" label-for="usernameInput">
        <b-form-input id="usernameInput" name="user[username]"
                      type="text" v-model="form.username" required
                      placeholder="Usuario"></b-form-input>
      </b-form-group>

      <b-form-group id="emailGroup"
                    label="Correo electrónico" label-for="emailInput">
        <b-form-input id="emailInput" name="user[email]"
                      type="email" v-model="form.email" required
                      placeholder="Correo electrónico"></b-form-input>
      </b-form-group>

      <b-form-group id="passwordGroup"
                    label="Contraseña" label-for="passwordInput">
        <b-form-input id="passwordInput" name="user[password]"
                      type="password" v-model="form.password" required
                      placeholder="Contraseña"></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Registrarme</b-button>
    </b-form>
    <hr>
    <b-row>
      <b-col>
        <p>¿Ya tienes un usuario?</p>
      </b-col>
      <b-col class="text-right">
        <b-link :to="{path: 'login'}">Iniciar sesión</b-link>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
  export default {
    data: () => {
      return {
        form: {
          name:'',
          username:'',
          email: '',
          password: '',
          lastname:'',
        }
      }
    },
    mounted() {
      if (this.$auth.loggedIn) {
        this.$router.go('/')
      }
    },
    methods: {
      async registerSubmit() {
        await this.$store.dispatch('user/register', this.form)
        .then(this.success)
        .catch((e)=>console.log(e.message))
      },
      success() {
        this.$notify({group: 'alerts', text: 'Ud. se ha registrado correctamente'})
        this.$router.push('/');
      },
      unauthorized() {
        this.$notify({group: 'alerts', text: 'Los datos de acceso no son válidos', color: 'red'})
      }
    }
  }
</script>
