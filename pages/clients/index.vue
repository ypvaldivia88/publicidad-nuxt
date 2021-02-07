<template>
  <b-row>
    <b-col>
      <b-btn variant="outline-success" class="mb-3" :to="'/clients/new'">
        Nuevo Clientro
      </b-btn>
      <b-table striped hover :items="list" :fields="fields">
        <template slot="name" slot-scope="data">
          <b-link :to="`/clients/${data.item.id}/edit`">{{data.item.name}}</b-link>
        </template>
        <template slot="members" slot-scope="data">
          {{data.item.users.length}}
        </template>
        <template slot="updated_at" slot-scope="data">
          {{data.item.updated_at | moment("from", "now")}}
        </template>
        <template slot="actions" slot-scope="data">
          <b-btn variant="primary" :to="'clients/'+data.item.id+'/edit'">
            Editar
          </b-btn>
          &nbsp;
          <b-btn variant="outline-secondary" @click="id = data.item.id" v-b-modal.confirmDestroy>
            Eliminar
          </b-btn>
        </template>
      </b-table>
      <b-modal id="confirmDestroy" title="Confirme la eliminación" @ok="destroy">
        Está seguro que desea eliminar esto?
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    async fetch({store}) {
      await store.dispatch('clients/get')
    },
    computed: {
      ...mapState({
        list: state => {
          return state.clients.list
        }
      })
    },
    data() {
      return {
        id: 0,
        fields: [
          {
            key: 'make',
            label: 'Manufacturado por',
            sortable: true,
          },
          {
            key: 'model',
            label: 'Modelo',
            sortable: true,
          },
          {
            key: 'year',
            label: 'Año',
            sortable: true,
          },
          {
            key: 'updated_at',
            sortable: true,
            label: 'Última actualización'
          },
          {
            key: 'actions',
            label: 'Acciones'
          }
        ]
      }
    },
    methods: {
      destroy() {
        this.$store.dispatch('clients/delete', {id: this.id}).then(() => this.$store.dispatch('clients/get'))
      }
    }
  }
</script>