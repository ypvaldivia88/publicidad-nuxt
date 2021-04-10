<template>
  <section>
    <div>
      <form-wizard
        @on-complete="onComplete"
        title="Formulario de Publicidad"
        subtitle="complete los campos para crear una publicidad de forma sencilla"
        color="CornflowerBlue"
        nextButtonText="Siguiente"
        backButtonText="Anterior"
        finishButtonText="Finalizar"
        stepSize="lg"
      >
        <tab-content title="Cliente">
          <b-form-select
            v-if="!toggleForm"
            v-model="cliente"
            :options="clientes"
            ><template #first>
              <b-form-select-option value="" disabled
                >-- Seleccione un cliente --</b-form-select-option
              >
            </template></b-form-select
          >

          <b-btn
            variant="outline-info"
            class="mt-3"
            @click="toggleForm = !toggleForm"
          >
            {{ toggleForm ? "Seleccionar cliente" : "Nuevo cliente" }}
          </b-btn>
          <client-form v-if="toggleForm"></client-form>
        </tab-content>

        <tab-content title="Categoría">
          <b-form-select
            v-if="!toggleForm"
            v-model="categoria"
            :options="categorias"
            ><template #first>
              <b-form-select-option value="" disabled
                >-- Seleccione una categoría --</b-form-select-option
              >
            </template></b-form-select
          >

          <b-btn
            variant="outline-info"
            class="mt-3"
            @click="toggleForm = !toggleForm"
          >
            {{ toggleForm ? "Seleccionar categoría" : "Nueva categoría" }}
          </b-btn>
          <category-form v-if="toggleForm"></category-form>
        </tab-content>
        <tab-content title="Publicidad">
          <b-form-select
            v-if="!toggleForm"
            v-model="publicidad"
            :options="publicidades"
            ><template #first>
              <b-form-select-option value="" disabled
                >-- Seleccione una publicidad --</b-form-select-option
              >
            </template></b-form-select
          >

          <b-btn
            variant="outline-info"
            class="mt-3"
            @click="toggleForm = !toggleForm"
          >
            {{ toggleForm ? "Seleccionar publicidad" : "Nueva publicidad" }}
          </b-btn>
          <publicity-form v-if="toggleForm"></publicity-form>
        </tab-content>
      </form-wizard>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import ClientForm from "~/components/ClientForm";
import CategoryForm from "~/components/CategoryForm";
import PublicityForm from "~/components/PublicityForm";

export default {
  components: {
    ClientForm,
    CategoryForm,
    PublicityForm
  },
  async fetch({ store }) {
    await store.dispatch("clients/get");
    await store.dispatch("categories/get");
    await store.dispatch("publicities/get");
  },
  computed: {
    ...mapState({
      clientes: state => {
        return state.clients.list.map(item => ({
          value: item.id,
          text: item.nombre
        }));
      },
      categorias: state => {
        return state.categories.list.map(item => ({
          value: item.id,
          text: item.nombre
        }));
      },
      publicidades: state => {
        return state.publicities.list.map(item => ({
          value: item.id,
          text: item.nombre
        }));
      }
    })
  },
  data: function() {
    return {
      cliente: null,
      categoria: null,
      publicidad: null,
      toggleForm: false
    };
  },
  methods: {
    onComplete: function() {
      this.$notify({
        text: "Creado correctamente",
        type: "success",
        group: "alerts"
      });
    }
  }
};
</script>

<style>
.container {
  min-height: 100vh;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
