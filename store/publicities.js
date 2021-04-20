import merge from "lodash.merge";
import assign from "lodash.assign";

export const state = () => ({
  list: [],
  publicity: {}
});

export const mutations = {
  set(state, publicity) {
    state.list = publicity;
  },
  add(state, value) {
    merge(state.list, value);
  },
  remove(state, { publicity }) {
    state.list = state.list.filter(c => publicity.id !== c.id);
  },
  mergePublicities(state, form) {
    assign(state.publicity, form);
  },
  setPublicities(state, form) {
    state.publicity = form;
  }
};

export const actions = {
  async get({ commit }) {
    await this.$axios.get(`/publicidades`).then(res => {
      if (res.status === 200) {
        commit("set", res.data);
      }
    });
  },
  async show({ commit }, params) {
    await this.$axios.get(`/publicidades/${params.publicity_id}`).then(res => {
      if (res.status === 200) {
        commit("mergePublicities", res.data);
      }
    });
  },
  async random({ commit }, params) {
    await this.$axios
      .get(`/categorias/${params.category_id}/random/publicity`)
      .then(res => {
        if (res.status === 200) {
          commit("mergePublicities", res.data);
        }
      });
  },
  async set({ commit }, publicities) {
    await commit("set", publicities);
  },
  async form({ commit }, form) {
    await commit("mergePublicities", form);
  },
  async add({ commit }, publicity) {
    await commit("add", publicity);
  },
  create({ commit }, params) {
    // return console.log(params);
    return this.$axios.post(`/publicidades`, {
      nombre: params.nombre,
      textoCorto: params.textoCorto,
      textoLargo: params.textoLargo,
      alcance: params.alcance,
      categoriaId: params.categoriaId,
      clienteId: params.clienteId
    });
  },
  update({ commit }, params) {
    return this.$axios.put(`/publicidades/${params.id}`, {
      nombre: params.nombre,
      textoCorto: params.textoCorto,
      textoLargo: params.textoLargo,
      alcance: params.alcance,
      categoriaId: params.categoriaId,
      clienteId: params.clienteId
    });
  },
  delete({ commit }, params) {
    return this.$axios.delete(`/publicidades/${params.id}`);
  }
};
