<template>
  <b-form @submit.prevent="submit">
    <b-row align-h="end">
      <b-col class="text-right">
        <b-link :to="'/publicities'">
          Regresar
        </b-link>
      </b-col>
    </b-row>
    <b-form-group label="Nombre">
      <b-form-input
        id="publicityNombreInput"
        name="publicity[nombre]"
        ref="nombre"
        :state="validateState('publicity[nombre]')"
        type="text"
        v-validate="{ required: true }"
        data-vv-delay="500"
        placeholder="Nombre"
        @input="mergePublicity({ nombre: $event })"
        :value="publicity.nombre"
      ></b-form-input>
      <b-form-invalid-feedback>Este campo es requerido</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label="Asunto">
      <b-form-input
        id="publicityAsuntoInput"
        name="publicity[textoCorto]"
        ref="textoCorto"
        :state="validateState('publicity[textoCorto]')"
        type="text"
        v-validate="{ required: true }"
        data-vv-delay="500"
        placeholder="Asunto"
        @input="mergePublicity({ textoCorto: $event })"
        :value="publicity.textoCorto"
      ></b-form-input>
      <b-form-invalid-feedback
        >Este campo es requerido</b-form-invalid-feedback
      > </b-form-group
    ><b-form-group label="Descripción">
      <b-form-input
        id="publicityDescripcionInput"
        name="publicity[textoLargo]"
        ref="textoLargo"
        :state="validateState('publicity[textoLargo]')"
        type="text"
        v-validate="{ required: true }"
        data-vv-delay="500"
        placeholder="Descripción"
        @input="mergePublicity({ textoLargo: $event })"
        :value="publicity.textoLargo"
      ></b-form-input>
      <b-form-invalid-feedback>Este campo es requerido</b-form-invalid-feedback>
    </b-form-group>
    <b-form-group label="Alcance" v-slot="{ alcance }">
      <b-form-radio-group
        id="alcance"
        name="publicity[alcance]"
        ref="alcance"
        @change="mergePublicity({ alcance: $event })"
        :value="publicity.alcance"
        :options="options"
        :aria-describedby="alcance"
        button-variant="outline-primary"
        buttons
      ></b-form-radio-group>
    </b-form-group>
    <b-form-group label="Categorías" v-slot="{ categorias }">
      <b-form-select
        ref="categoriaId"
        @change="mergePublicity({ categoriaId: $event })"
        :value="publicity.categoriaId"
        :options="categories"
        :aria-describedby="categorias"
      ></b-form-select>
    </b-form-group>
    <b-form-group label="Clientes" v-slot="{ clientes }">
      <b-form-select
        ref="clienteId"
        @change="mergePublicity({ clienteId: $event })"
        :value="publicity.clienteId"
        :options="clients"
        :aria-describedby="clientes"
      ></b-form-select>
    </b-form-group>
    <b-btn class="my-3" type="submit">{{
      isUpdate() ? "Actualizar" : "Salvar"
    }}</b-btn>
  </b-form>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "PublicityForm",
  data() {
    return {
      // selected: "radio1",
      options: [
        { text: "Municipal", value: "Municipal" },
        { text: "Provincial", value: "Provincial" },
        { text: "Nacional", value: "Nacional" },
        { text: "Internacional", value: "Internacional" }
      ]
    };
  },
  computed: {
    ...mapState("publicities", ["publicity"]),
    ...mapState({
      categories: state => {
        return state.categories.list.map(category => {
          return { text: category.nombre, value: category.id };
        });
      }
    }),
    ...mapState({
      clients: state => {
        return state.clients.list.map(client => {
          return { text: client.nombre, value: client.id };
        });
      }
    })
  },
  methods: {
    ...mapMutations({ mergePublicity: "publicities/mergePublicities" }),
    isUpdate() {
      return this.publicity.hasOwnProperty("id");
    },
    submit() {
      let vm = this;
      let action = "publicities/" + (vm.isUpdate() ? "update" : "create");
      vm.$validator.validateAll().then(result => {
        if (result) {
          vm.$store
            .dispatch(action, {
              ...vm.publicity,
              ...{
                alcance: vm.publicity.alcance,
                categoriaId: vm.publicity.categoriaId,
                clienteId: vm.publicity.clienteId
              }
            })
            .then(resp => {
              let msg =
                resp.data.name + " " + vm.isUpdate() ? "Actualizado" : "creado";
              vm.$notify({ text: msg, type: "success", group: "alerts" });
              vm.$router.push("/publicities");
            })
            .catch(resp => {
              vm.$notify({
                text: "Ha ocurrido un error en el servidor",
                type: "warning",
                group: "alerts"
              });
            });
        } else {
          console.log(vm.$validator);
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
