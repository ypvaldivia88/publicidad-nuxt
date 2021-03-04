export const actions = {
  async me() {
    await this.$auth.fetchUser();
  },
  async login({ commit, dispatch }, { email, password }) {
    try {
      return await this.$auth.loginWith("local", {
        data: { email, password }
      });
    } catch (err) {
      console.log(err);
    }
  },
  async logout() {
    await this.$auth.logout();
  },
  register({ dispatch, commit }, form) {
    this.$axios.post("/signup", form);
    return this.$auth.loginWith("local", {
      data: { email: form.email, password: form.password }
    });
  },
  update(
    { commit, state },
    {
      first_name,
      last_name,
      nickname,
      password,
      password_confirmation,
      avatar,
      dining_preferences,
      allergies,
      addresses,
      telephones,
      locale
    }
  ) {
    return this.$axios.put(`/users/${this.$auth.user.id}`, {
      user: {
        first_name,
        last_name,
        nickname,
        password,
        password_confirmation,
        avatar,
        dining_preferences,
        allergies,
        addresses,
        telephones,
        locale
      }
    });
  },
  delete() {
    return this.$axios.delete(`/users/${this.$auth.user.id}`);
  }
};
