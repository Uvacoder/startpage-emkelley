<template>
  <main>
    <nav class="main-nav">
      <div class="logo">
        <span class="accent">{{ date }} </span>
      </div>
      <Burger></Burger>
    </nav>
    <Sidebar>
      <h1 class="title">Startpage Settings</h1>
    </Sidebar>
    <section class="hero is-medium">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">{{ greeting }}, {{ user.name }}</h1>
        </div>
      </div>
    </section>
    <br /><br />
    <div class="columns">
      <div class="column has-text-centered">
        <div class="container">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <h1 class="title">Quick Links</h1>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <b-input
                  v-model="addLinkURL"
                  placeholder="https://google.com"
                ></b-input>
              </div>
              <div class="level-item">
                <button
                  @click="getLinkTitle"
                  class="button is-secondary is-rounded"
                >
                  <i class="far fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <hr />
          <QuickLinks />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Burger from "@/components/menu/Burger";
import Sidebar from "@/components/menu/ConfigSidebar";
import QuickLinks from "@/components/QuickLinks";
import { mapGetters } from "vuex";

const date = new Date();
export default {
  name: "Home",
  data() {
    return {
      newLinkModal: false,
      addLinkURL: "",
      h: "",
      m: "",
      s: "",
    };
  },
  components: {
    Burger,
    Sidebar,
    QuickLinks,
  },
  computed: {
    ...mapGetters(["user"]),
    date: () => {
      const d = new Date();
      return d.toDateString();
    },
    greeting: () => {
      let hour = date.getHours();
      if (hour < 12) return "Good Morning";
      else if (hour == 12) return "Good Noon";
      else if (hour >= 12 && hour <= 17) return "Good Afternoon";
      else if (hour >= 17 && hour <= 24) return "Good Evening";
    },
  },
  mounted() {
    setInterval(this.updateClock, 100);
  },
  methods: {
    updateClock: function() {
      let now = new Date();
      this.h = this.leftPad("" + now.getHours());
      this.m = this.leftPad("" + now.getMinutes());
      this.s = this.leftPad("" + now.getSeconds());
    },
    leftPad: function(str) {
      const leftPad = "00";
      return leftPad.substring(0, leftPad.length - str.length) + str;
    },
    getLinkTitle() {
      const key = btoa(process.env.URL_META_API_KEY);
      const url = "//api.urlmeta.org/?url=" + this.addLinkURL;
      this.axios
        .get(url, {
          headers: {
            Authorization: `Basic ${key}`,
          },
        })
        .then((response) => {
          console.log(response);
          // this.addLinkToState(response.data);
        });
    },
    addLinkToState(apiTitle) {
      const url = this.addLinkURL;
      const linkObject = {
        name: apiTitle,
        url: url,
      };
      console.log(linkObject);
      this.$store.commit("addNewLink", linkObject);
    },
  },
};
</script>
<style lang="scss" scoped>
.title {
  color: hsl(209, 38%, 90%);
}
.hero,
.main-nav {
  background: hsl(209, 38%, 10%);
  user-select: none;
}
main {
  background-color: #162431;
  min-height: 100vh;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.logo {
  align-self: center;
  color: #fff;
  font-weight: bold;
  font-family: "Lato";
  .accent {
    color: #ff682c;
  }
}
.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
}

ul.sidebar-panel-nav {
  list-style-type: none;
}

ul.sidebar-panel-nav > li > a {
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  display: block;
  padding-bottom: 0.5em;
}
hr {
  opacity: 0.5 !important;
}
.asdf {
  background: white;
}
</style>
