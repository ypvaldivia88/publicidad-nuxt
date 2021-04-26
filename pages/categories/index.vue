<template>
  <b-row>
    <b-col>
      <b-btn variant="outline-success" class="mb-3" :to="'/categories/new'">
        Nueva Categoría
      </b-btn>
      <b-table striped hover :items="list" :fields="fields">
        <template #cell(nombre)="data">
          <NuxtLink :to="`/categories/${data.item.id}`">{{
            data.item.nombre
          }}</NuxtLink>
        </template>
        <template #cell(actions)="data">
          <b-button-group>
            <b-button
              variant="primary"
              class="mb-2"
              @click="$router.push(`/categories/${data.item.id}/edit`)"
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
    await store.dispatch("categories/get");
  },
  computed: {
    ...mapState({
      list: state => {
        return state.categories.list;
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
          key: "actions",
          label: "Acciones"
        }
      ]
    };
  },

  methods: {
    destroy() {
      this.$store
        .dispatch("categories/delete", { id: this.id })
        .then(() => this.$store.dispatch("categories/get"));
    }
  }
};
</script>
