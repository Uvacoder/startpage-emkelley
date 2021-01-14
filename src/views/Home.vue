<template>
  <main>
    <nav class="main-nav">
      <div class="logo" style="color: #ff682c">
        {{ date }} - {{ hours }}:{{ minutes }}:{{ seconds }} {{ amPm }}
      </div>
      <Burger></Burger>
    </nav>
    <transition name="fade">
      <Sidebar>
        <h1 class="title">Startpage Settings</h1>
      </Sidebar>
    </transition>
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
                <button class="button is-primary is-outlined">Add Link</button>
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
      show: true,
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      amPm: "AM",
      interval: 0,
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
    this.interval = setInterval(this.updateClock, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    updateClock() {
      this.hours = date.getHours();
      this.minutes = date.getMinutes();
      this.seconds = date.getSeconds();
      this.amPm = this.hours >= 12 ? "PM" : "AM";
      this.hours = this.hours % 12 || 12;
      this.minutes = this.minutes < 10 ? 0 + this.minutes : this.minutes;
      this.hours = this.hours < 10 ? 0 + this.hours : this.hours;
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
  height: 100vh;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
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
</style>
