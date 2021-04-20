<template>
  <div>
    <b-form-select v-model="categoria" :options="categorias" @change="random()"
      ><template #first>
        <b-form-select-option value="" disabled
          >-- Seleccione una categoria --</b-form-select-option
        >
      </template></b-form-select
    >

    <b-list-group class="mt-2">
      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        Nombre
        <b-badge variant="primary" pill>{{ publicity[0].nombre }}</b-badge>
      </b-list-group-item>

      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        Asunto
        <b-badge variant="primary" pill>{{ publicity[0].textoCorto }}</b-badge>
      </b-list-group-item>

      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        Descripción
        <b-badge variant="primary" pill>{{ publicity[0].textoLargo }}</b-badge>
      </b-list-group-item>

      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        Alcance
        <b-badge variant="primary" pill>{{ publicity[0].alcance }}</b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  async fetch({ store }) {
    await store.dispatch("categories/get");
  },
  computed: {
    ...mapState({
      categorias: state => {
        return state.categories.list.map(item => ({
          value: item.id,
          text: item.nombre
        }));
      },
      publicity: state => {
        return state.publicities.publicity;
      }
    })
  },
  data: function() {
    return {
      categoria: null
    };
  },
  methods: {
    random() {
      this.$store
        .dispatch("publicities/random", { category_id: this.categoria })
        .catch(error => console.log(error));
    }
  }
};
</script>
