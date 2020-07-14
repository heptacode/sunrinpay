<template>
  <div id="app">
    <router-view class="router"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class App extends Vue {
  deferredPrompt: any;

  async created() {
    console.log("created");
    window.addEventListener("beforeinstallprompt", (e: any) => {
      e.preventDefault();
      this.deferredPrompt = e;
      e.prompt();
    });
  }
}
</script>

<style lang="scss">
@import "@/main.scss";
#app {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
}
.router {
  height: 100%;
  width: 100%;

  overflow: hidden;
}
</style>
