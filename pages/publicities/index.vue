<template>
  <b-row>
    <b-col>
      <b-btn variant="outline-success" class="mb-3" :to="'/'">
        Nuevo Anuncio
      </b-btn>
      <b-btn variant="outline-success" class="mb-3" :to="'/publicities/random'">
        Anuncio aleatorio
      </b-btn>
      <b-table striped hover :items="list" :fields="fields">
        <template #cell(nombre)="data">
          <NuxtLink :to="`/publicities/${data.item.id}`">{{
            data.item.nombre
          }}</NuxtLink>
        </template>
        <template #cell(actions)="data">
          <b-button-group>
            <b-button
              variant="primary"
              class="mb-2"
              @click="$router.push(`/publicities/${data.item.id}/edit`)"
              ><b-icon icon="pencil-square" aria-label="Edit"></b-icon
            ></b-button>
            <b-button
              variant="danger"
              class="mb-2"
              @click="id = data.item.id"
              v-b-modal.confirmDestroy
              ><b-icon icon="trash" aria-label="Delete"></b-icon
            ></b-button>
          </b-button-group>
        </template>
      </b-table>
      <b-modal
        id="confirmDestroy"
        title="Confirme la eliminación"
        @ok="destroy"
      >
        Está seguro que desea eliminar esto?
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from "vuex";
import { BIcon, BIconTrash, BIconPencilSquare } from "bootstrap-vue";

export default {
  components: {
    BIcon,
    BIconTrash,
    BIconPencilSquare
  },
  async fetch({ store }) {
    await store.dispatch("publicities/get");
  },
  computed: {
    ...mapState({
      list: state => {
        return state.publicities.list;
      }
    })
  },
  data() {
    return {
      id: 0,
      fields: [
        {
          key: "nombre",
          label: "Nombre",
          sortable: true
        },
        {
          key: "textoCorto",
          label: "Asunto",
          sortable: true
        },
        {
          key: "textoLargo",
          label: "Descripción",
          sortable: true
        },
        {
          key: "enlace",
          label: "Enlace",
          sortable: true
        },
        {
          key: "alcance",
          label: "Alcance",
          sortable: true
        },
        {
          key: "categoriaId",
          label: "categoriaId",
          sortable: true
        },
        {
          key: "clienteId",
          label: "clienteId",
          sortable: true
        },
        {
          key: "actions",
          label: "Acciones"
        }
      ]
    };
  },
  methods: {
    destroy() {
      this.$store
        .dispatch("publicities/delete", { id: this.id })
        .then(() => this.$store.dispatch("publicities/get"))
        .catch(error => console.log(error));
    }
  }
};
</script>
