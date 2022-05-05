<template>
  <div id="app">
    <router-view class="router" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import useRegisterSW from '@/mixins/useRegisterSW';
import firebase from 'firebase/app';
import 'firebase/auth';
import { signIn } from '@/Auth';

@Component({
  mixins: [useRegisterSW],
})
export default class App extends Vue {
  async created() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.$store.commit('setAuth', true);
        this.$store.commit('setDocRef');
        this.$store.commit('setUserInformation', user);
        await signIn(user);
        await this.$store.dispatch('GET_BALANCE');
        await this.$store.dispatch('GET_TRANSACTIONS');
        if (user.photoURL === null) {
          user.providerData.forEach(data => {
            if (data?.photoURL !== null)
              this.$store.state.userInformation.photoURL = data?.photoURL;
          });
        }
      } else {
        this.$store.commit('setAuth', false);
        this.$router.replace('/');
      }
    });
  }
}
</script>

<style lang="scss">
@import '@/main.scss';
#app {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;

  .pwa {
    position: fixed;
    left: 0;
    top: 0;

    background-color: $primary-color;

    padding: 10px;

    border-radius: 0 0 10px 0;
  }
}
.router {
  height: 100%;
  width: 100%;

  overflow: hidden;
}
</style>
