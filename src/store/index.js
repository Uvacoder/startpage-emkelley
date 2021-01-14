import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isNavOpen: false,
    user: {
      name: "Eric",
      links: [
        {
          name: "Google",
          url: "https://www.google.com/",
        },
        {
          name: "MDN",
          url: "https://developer.mozilla.org/en-US/",
        },
      ],
    },
  },
  mutations: {
    toggleNav(state) {
      state.isNavOpen = !state.isNavOpen;
    },
    addNewLink(state, payload) {
      state.user.links.push(payload);
    },
  },
  actions: {},
  modules: {},
  getters: {
    isNavOpen: (state) => {
      return state.isNavOpen;
    },
    user: (state) => {
      return state.user;
    },
  },
});
