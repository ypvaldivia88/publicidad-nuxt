<template>
    <b-form @submit.prevent="submit">
      <b-row align-h="end">
        <b-col class="text-right">
          <b-link :to="'/categories'">
            Regresar
          </b-link>
        </b-col>
      </b-row>
      <b-form-group label="Nombre">
        <b-form-input id="categoryMakeInput"
                      name="category[nombre]"
                      ref="nombre"
                      :state="validateState('nombre')"
                      type="text"
                      v-validate="{required: true}"
                      data-vv-delay="500"
                      placeholder="Nombre"
                      @input="mergeCategory({'nombre': $event})"
                      :value="category.nombre"></b-form-input>
        <b-form-invalid-feedback>Este campo es requerido</b-form-invalid-feedback>
      </b-form-group>
      <b-btn class="my-3" type="submit">{{isUpdate() ? 'Actualizar' : 'Salvar'}}</b-btn>
     
    </b-form>
</template>

<script>
  import {mapMutations, mapState} from 'vuex';

  export default {
    name: "CategoryForm",
    computed: {
      ...mapState('categories', [
        'category'
      ])
    },
    methods: {
      ...mapMutations({mergeCategory: 'categories/mergeCategories'}),
      isUpdate() { return this.category.hasOwnProperty('id') },
      submit() {
        let vm = this;
        let action = 'categories/' + (this.isUpdate() ? 'update' : 'create');
        this.$validator.validateAll().then((result) => {
          if(result) {
            this.$store.dispatch(action, this.category)
              .then((resp) => {
                let msg = resp.data.name + " " + this.isUpdate() ? 'Actualizado' : 'creado';
                vm.$notify({text: msg, type: 'success', group: 'alerts'});
                vm.$router.push('/categories')
              })
              .catch((resp) => {
                vm.$notify({text: 'Ha ocurrido un error en el servidor', type: 'warning', group: 'alerts'})
              })
          } else {
            vm.$notify({text: 'Por favor solucione los errores en el formulario.', type: 'warning', group: 'alerts'})
          }
        })
      },
      validateState(ref) {
        if (this.veeFields[ref] && this.veeFields[ref].dirty) {
          return !this.errors.has(ref)
        } else {
          return null
        }
      }
    }
  }
</script>