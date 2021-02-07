<template>
    <b-form @submit.prevent="submit">
      <b-row align-h="end">
        <b-col class="text-right">
          <b-link :to="'/clients'">
            Regresar
          </b-link>
        </b-col>
      </b-row>
      <b-form-group label="Manufacturado por">
        <b-form-input id="clientMakeInput"
                      name="client[make]"
                      ref="make"
                      :state="validateState('make')"
                      type="text"
                      v-validate="{required: true}"
                      data-vv-delay="500"
                      placeholder="Manufacturado por"
                      @input="mergeClient({'make': $event})"
                      :value="client.make"></b-form-input>
        <b-form-invalid-feedback>Este campo es requerido</b-form-invalid-feedback>
      </b-form-group>
      <b-btn class="my-3" type="submit">{{isUpdate() ? 'Actualizar' : 'Salvar'}}</b-btn>
      <hr/>
      <small><b-badge>Important</b-badge> This is a fake server and won't actually update the record.</small>
    </b-form>
</template>

<script>
  import {mapMutations, mapState} from 'vuex';

  export default {
    name: "ClientForm",
    computed: {
      ...mapState('clients', [
        'client'
      ])
    },
    methods: {
      ...mapMutations({mergeClient: 'clients/mergeClients'}),
      isUpdate() { return this.client.hasOwnProperty('id') },
      submit() {
        let vm = this;
        let action = 'clients/' + (this.isUpdate() ? 'update' : 'create');
        this.$validator.validateAll().then((result) => {
          if(result) {
            this.$store.dispatch(action, this.client)
              .then((resp) => {
                let msg = resp.data.name + " " + this.isUpdate() ? 'Actualizado' : 'creado';
                vm.$notify({text: msg, type: 'success', group: 'alerts'});
                vm.$router.push('/clients')
              })
              .catch((resp) => {
                vm.$notify({text: 'Ha ocurrido un error en el servidor', type: 'warning', group: 'alerts'})
              })
          } else {
            vm.$notify({text: 'Por favor solucione los errores en el formulario.', type: 'warning', group: 'alerts'})
          }
        })
      },
      validateState(ref) {
        if (this.veeFields[ref] && this.veeFields[ref].dirty) {
          return !this.errors.has(ref)
        } else {
          return null
        }
      }
    }
  }
</script>