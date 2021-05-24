<template>
  <div>
    <b-nav-form class="pl-3">
      <b-form-select v-model="categoria" :options="categorias" @change="random"
        ><template #first>
          <b-form-select-option value="" disabled
            >-- Seleccione una categoria --</b-form-select-option
          >
        </template></b-form-select
      >
      <b-button size="md" class="ml-2" @click="random">Recargar</b-button>
    </b-nav-form>

    <!-- {{ publicidad }} -->

    <b-list-group v-if="publicidad" class="p-3">
      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        Nombre
        <b-badge variant="primary" pill>{{ publicidad.nombre }}</b-badge>
      </b-list-group-item>

      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        Asunto
        <b-badge variant="primary" pill>{{ publicidad.textoCorto }}</b-badge>
      </b-list-group-item>

      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        Descripción
        <b-badge variant="primary" pill>{{ publicidad.textoLargo }}</b-badge>
      </b-list-group-item>

      <b-list-group-item
        class="d-flex justify-content-between align-items-center"
      >
        Alcance
        <b-badge variant="primary" pill>{{ publicidad.alcance }}</b-badge>
      </b-list-group-item>
    </b-list-group>

    <iframe :src="publicityFrame.src" v-on:load="onLoadIframe" name="myIframe">
    </iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";

function findIframeByName(name) {
  return _.find(window.frames, frame => frame.name === name);
}

export default {
  async fetch({ store }) {
    await store.dispatch("categories/get");
  },
  beforeMount() {},
  computed: {
    ...mapState({
      categorias: state => {
        return state.categories.list.map(item => ({
          value: item.id,
          text: item.nombre
        }));
      }
    })
  },
  data: function() {
    return {
      categoria: null,
      publicidad: null,
      publicityFrame: { src: "/iframe.html" }
    };
  },
  methods: {
    random() {
      this.$axios
        .get(`/categorias/${this.categoria}/random/publicity`)
        .then(res => {
          console.log(res.data);
          if (res.status === 200) {
            this.publicidad = res.data[0];
          } else this.publicidad = null;
        })
        .catch(err => console.log(err.message));
    },
    onLoadIframe(event) {
      const iframe = findIframeByName(event.currentTarget.name);
      iframe.doSomething(this.publicidad);
    }
  }
};
</script>
