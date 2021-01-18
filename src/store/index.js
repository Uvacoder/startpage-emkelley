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
          id: "157138f4-a111-4b99-a92f-3ce95d1cc434",
          name: "YouTube",
          url: "https://www.youtube.com/feed/subscriptions?flow=2",
        },
        {
          id: "a7872dd1-9849-4e39-ac0d-b315feb67d0f",
          name: "Reddit",
          url: "https://www.reddit.com/r/popular/",
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
