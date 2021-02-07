import merge from "lodash.merge";
import assign from "lodash.assign";

export const state = () => ({
  list: [],
  client: {}
});

export const mutations = {
  set(state, client) {
    state.list = client;
  },
  add(state, value) {
    merge(state.list, value);
  },
  remove(state, { client }) {
    state.list = state.list.filter(c => client.id !== c.id);
  },
  mergeClients(state, form) {
    assign(state.client, form);
  },
  setClients(state, form) {
    state.client = form;
  }
};

export const actions = {
  async get({ commit }) {
    await this.$axios.get(`/clients`).then(res => {
      if (res.status === 200) {
        commit("set", res.data);
      }
    });
  },
  async show({ commit }, params) {
    await this.$axios.get(`/clients/${params.client_id}`).then(res => {
      if (res.status === 200) {
        commit("mergeClients", res.data);
      }
    });
  },
  async set({ commit }, clients) {
    await commit("set", clients);
  },
  async form({ commit }, form) {
    await commit("mergeClients", form);
  },
  async add({ commit }, client) {
    await commit("add", client);
  },
  create({ commit }, params) {
    return this.$axios.post(`/clients`, { client: params });
  },
  update({ commit }, params) {
    return this.$axios.put(`/clients/${params.id}`, { client: params });
  },
  delete({ commit }, params) {
    return this.$axios.delete(`/clients/${params.id}`);
  }
};
