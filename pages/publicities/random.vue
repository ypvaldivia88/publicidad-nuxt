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
      <b-button size="md" class="ml-2" @click="exportar">Exportar</b-button>
    </b-nav-form>

    <!-- {{ publicidad }} -->
    <div
      v-show="categoria && publicidad"
      class="embed-responsive embed-responsive-16by9 mt-4"
    >
      <iframe
        ref="template"
        class="embed-responsive-item"
        :src="publicityFrame.src"
        name="myIframe"
        allowfullscreen
      ></iframe>

      <object data="/iframe.html">
        Your browser doesn’t support the object tag.
      </object>
    </div>
    <div v-show="categoria && !publicidad">
      No se han encontrado anuncios para esta categoria
    </div>
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
          if (res.status === 200) {
            this.publicidad = res.data[0];
            this.publicidad.fotoUrl = "https://source.unsplash.com/random";
            const iframe = findIframeByName("myIframe");
            iframe.loadData(this.publicidad);
            console.log(iframe.document);
          } else this.publicidad = null;
        })
        .catch(err => console.log(err.message));
    },
    exportar() {
      console.log(this.$refs.template.$el);
    }
  }
};
</script>
