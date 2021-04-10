<template>
  <b-form @submit.prevent="submit">
    <b-row align-h="end">
      <b-col class="text-right">
        <b-link :to="'/clients'">
          Regresar
        </b-link>
      </b-col>
    </b-row>
    <b-form-group label="Nombre">
      <b-form-input
        id="clientNombreInput"
        name="client[nombre]"
        ref="nombre"
        :state="validateState('client[nombre]')"
        type="text"
        v-validate="{ required: true }"
        data-vv-delay="500"
        placeholder="Nombre"
        @input="mergeClient({ nombre: $event })"
        :value="client.nombre"
      ></b-form-input>
      <b-form-invalid-feedback>Este campo es requerido</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label="Teléfono">
      <b-form-input
        id="clientTelefonoInput"
        name="client[telefono]"
        ref="telefono"
        :state="validateState('client[telefono]')"
        type="number"
        v-validate="{ required: true }"
        data-vv-delay="500"
        placeholder="Teléfono"
        @input="mergeClient({ telefono: $event })"
        :value="client.telefono"
      ></b-form-input>
      <b-form-invalid-feedback>Este campo es requerido</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label="Correo">
      <b-form-input
        id="clientCorreoInput"
        name="client[correo]"
        ref="correo"
        :state="validateState('client[correo]')"
        type="email"
        v-validate="{ required: true }"
        data-vv-delay="500"
        placeholder="Correo"
        @input="mergeClient({ correo: $event })"
        :value="client.correo"
      ></b-form-input>
      <b-form-invalid-feedback>Este campo es requerido</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label="Contrato">
      <b-form-input
        id="clientContratoInput"
        name="client[contrato]"
        ref="contrato"
        :state="validateState('client[contrato]')"
        type="text"
        v-validate="{ required: true }"
        data-vv-delay="500"
        placeholder="Contrato"
        @input="mergeClient({ contrato: $event })"
        :value="client.contrato"
      ></b-form-input>
      <b-form-invalid-feedback>Este campo es requerido</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label="Dirección">
      <b-form-input
        id="clientDireccionInput"
        name="client[direccion]"
        ref="direccion"
        :state="validateState('client[direccion]')"
        type="text"
        v-validate="{ required: true }"
        data-vv-delay="500"
        placeholder="Dirección"
        @input="mergeClient({ direccion: $event })"
        :value="client.direccion"
      ></b-form-input>
      <b-form-invalid-feedback>Este campo es requerido</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label="Tipo de Persona" v-slot="{ tipoPersona }">
      <b-form-radio-group
        id="btn-radios-2"
        :value="client.persona"
        :options="options"
        :aria-describedby="tipoPersona"
        button-variant="outline-primary"
        name="radio-btn-outline"
        buttons
      ></b-form-radio-group>
    </b-form-group>
    <b-btn class="my-3" type="submit">{{
      isUpdate() ? "Actualizar" : "Salvar"
    }}</b-btn>
  </b-form>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "ClientForm",
  data() {
    return {
      // selected: "radio1",
      options: [
        { text: "Natural", value: false },
        { text: "Jurídica", value: true }
      ]
    };
  },
  computed: {
    ...mapState("clients", ["client"])
  },
  methods: {
    ...mapMutations({ mergeClient: "clients/mergeClients" }),
    isUpdate() {
      return this.client.hasOwnProperty("id");
    },
    submit() {
      let vm = this;
      let action = "clients/" + (this.isUpdate() ? "update" : "create");
      this.$validator.validateAll().then(result => {
        console.log(result);
        if (result) {
          this.$store
            .dispatch(action, this.client)
            .then(resp => {
              let msg =
                resp.data.nombre + " " + this.isUpdate()
                  ? "Actualizado"
                  : "creado";
              vm.$notify({ text: msg, type: "success", group: "alerts" });
              vm.$router.push("/clients");
            })
            .catch(resp => {
              vm.$notify({
                text: "Ha ocurrido un error en el servidor",
                type: "warning",
                group: "alerts"
              });
            });
        } else {
          vm.$notify({
            text: "Por favor solucione los errores en el formulario.",
            type: "warning",
            group: "alerts"
          });
        }
      });
    },
    validateState(ref) {
      if (this.veeFields[ref] && this.veeFields[ref].dirty) {
        return !this.errors.has(ref);
      } else {
        return null;
      }
    }
  }
};
</script>
