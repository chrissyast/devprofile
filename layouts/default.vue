<template>
  <v-app>
    <Header/>
    <TrippyEgg />
    <v-main class="pa-0">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<style lang="scss">
 .theme--dark.v-application .background {
  background-color: #000000;
}
</style>
<script>
import Header from "@/components/Header";
export default {
  components: {Header}
}
</script>
