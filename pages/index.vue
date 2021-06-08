<template>
  <div>
    <b-row>
      <b-col md="8">
        <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show">
          <b-form-group id="input-group-00" label="Nombre" label-for="input-00">
            <b-form-input
              id="input-00"
              v-model="form.nombre"
              type="text"
              placeholder="Entre un nombre para su anuncio"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-0" label="Imagen" label-for="input-0">
            <!-- Styled -->
            <b-form-file
              accept="image/*"
              v-model="form.imagen"
              placeholder="Elija una imagen..."
              drop-placeholder="arrástrela aquí..."
              size="sm"
              @change="setImage"
              required
            ></b-form-file>
          </b-form-group>

          <b-form-group id="input-group-1" label="Título" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.titulo"
              type="text"
              placeholder="Entre un título"
              size="sm"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Descripción"
            label-for="input-2"
          >
            <b-form-textarea
              id="input-2"
              v-model="form.descripcion"
              placeholder="Entre la descripción de su anuncio"
              size="sm"
              rows="3"
              required
            ></b-form-textarea>
          </b-form-group>

          <b-row>
            <b-col
              ><b-form-group
                id="input-group-3"
                label="Cliente:"
                label-for="input-3"
              >
                <b-form-select
                  id="input-3"
                  v-model="form.cliente"
                  :options="clientes"
                  size="sm"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col
              ><b-form-group
                id="input-group-4"
                label="Categorías:"
                label-for="input-4"
              >
                <b-form-select
                  id="input-4"
                  v-model="form.categoria"
                  :options="categorias"
                  size="sm"
                  required
                ></b-form-select> </b-form-group
            ></b-col>
            <b-col
              ><b-form-group
                id="input-group-5"
                label="Categorías:"
                label-for="input-5"
              >
                <b-form-select
                  id="input-5"
                  v-model="form.alcance"
                  :options="alcances"
                  size="sm"
                  required
                ></b-form-select> </b-form-group
            ></b-col>
          </b-row>

          <b-button type="submit" variant="primary">Crear Anuncio</b-button>
          <b-button type="reset" variant="danger">Reiniciar</b-button>
        </b-form>
      </b-col>
      <b-col md="4">
        <div>
          <b-card
            :title="form.titulo"
            :img-src="imgURL"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              {{ form.descripcion }}
            </b-card-text>

            <b-button v-show="share" href="#" variant="primary"
              >Compartir</b-button
            >
          </b-card>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      imgURL: "https://picsum.photos/600/600/",
      form: {
        nombre: "",
        imagen: null,
        titulo: "",
        descripcion: "",
        cliente: null,
        categoria: null,
        alcance: null,
        checked: []
      },
      show: true,
      share: false,
      alcances: [
        { value: null, text: "Seleccione un alcance" },
        { value: "Municipal", text: "Municipal" },
        { value: "Provincial", text: "Provincial" },
        { value: "Nacional", text: "Nacional" },
        { value: "Internacional", text: "Internacional" }
      ]
    };
  },
  async fetch({ store }) {
    await store.dispatch("clients/get");
    await store.dispatch("categories/get");
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
      }
    })
  },
  methods: {
    onSubmit() {
      let vm = this;
      vm.$store
        .dispatch("publicities/create", {
          nombre: vm.form.nombre,
          textoCorto: vm.form.titulo,
          textoLargo: vm.form.descripcion,
          alcance: vm.form.alcance,
          categoriaId: vm.form.categoria,
          clienteId: vm.form.ciente
        })
        .then(resp => {
          let msg = resp.data.nombre + " " + "creado";
          vm.$notify({ text: msg, type: "success", group: "alerts" });
          vm.share = true;
        })
        .catch(resp => {
          vm.$notify({
            text: "Ha ocurrido un error en el servidor",
            type: "warning",
            group: "alerts"
          });
        });
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.titulo = "";
      this.form.descripcion = "";
      this.form.cliente = null;
      this.form.categoria = null;
      this.form.alcance = null;
      this.imgURL = "https://picsum.photos/600/600/";
      this.form.checked = [];
      this.share = false;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    setImage(e) {
      const file = e.target.files[0];
      this.imgURL = URL.createObjectURL(file);
    }
  }
};
</script>
