<template>
  <v-app-bar app>
    <v-container class="d-flex">
      <v-row align="center">
        <v-col cols="6">
          <link-button to="/" :label="translateByKey('home', storeLanguage)" />
        </v-col>
        <v-col cols="6">
          <v-row justify="end">
            <LanguagePicker/>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    storeLanguage() {
      return this.$store.state.selectedLanguage
    }
  }
}
</script>

<style scoped>
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: #000000;
}

</style>
