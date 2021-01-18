<template>
  <div class="quick-links">
    <div
      @click="goToURL(link.url)"
      v-for="link in user.links"
      :key="link.id"
      class="link"
    >
      <img class="va" :src="getFavicon(link.url)" alt="" />
      <h1 class="title va">{{ link.name }}</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    getFavicon(url) {
      const URLObject = new URL(url);
      return `//logo.clearbit.com/${URLObject.hostname}`;
    },
    goToURL(url) {
      window.location.replace(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.va {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.quick-links {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 15px;
  margin-top: 1rem;
}
.link {
  cursor: pointer;
  background: hsl(209, 38%, 10%);
  padding: 1rem;
  display: flex;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px 0px;
  transition: 250ms all ease-in-out;
  border: 1px solid hsl(209, 38%, 10%);

  &:hover {
    background: darken(hsl(209, 38%, 10%), 3);
    border-color: #ff682c;
  }
  img {
    height: 25px;
    width: 25px;
  }
  .title {
    color: ghostwhite;
    font-size: 1rem;
    font-weight: 300;
    margin-left: 1rem;
    max-width: 14ch;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
