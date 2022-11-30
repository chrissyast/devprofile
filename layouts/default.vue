<template>
  <v-app>
    <NavBar/>
    <TrippyEgg />
    <v-main>
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

export default {
}
</script>
