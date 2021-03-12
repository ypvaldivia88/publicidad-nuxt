import merge from "lodash.merge";
import assign from "lodash.assign";

export const state = () => ({
  list: [],
  category: {}
});

export const mutations = {
  set(state, category) {
    state.list = category;
  },
  add(state, value) {
    merge(state.list, value);
  },
  remove(state, { category }) {
    state.list = state.list.filter(c => category.id !== c.id);
  },
  mergeCategories(state, form) {
    assign(state.category, form);
  },
  setCategories(state, form) {
    state.category = form;
  }
};

export const actions = {
  async get({ commit }) {
    await this.$axios.get(`/categorias`).then(res => {
      if (res.status === 200) {
        commit("set", res.data);
      }
    });
  },
  async show({ commit }, params) {
    await this.$axios.get(`/categorias/${params.id}`).then(res => {
      if (res.status === 200) {
        commit("mergeCategories", res.data);
      }
    });
  },
  async set({ commit }, categories) {
    await commit("set", categories);
  },
  async form({ commit }, form) {
    await commit("mergeCategories", form);
  },
  async add({ commit }, category) {
    await commit("add", category);
  },
  create({ commit }, params) {
    return this.$axios.post(`/categorias`, {
      category: params
    });
  },
  update({ commit }, params) {
    return this.$axios.put(`/categorias/${params.id}`, {
      category: params
    });
  },
  delete({ commit }, params) {
    return this.$axios.delete(`/categorias/${params.id}`);
  }
};
