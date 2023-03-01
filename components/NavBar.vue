<template>
  <v-app-bar app>
    <v-container class="d-flex">
      <v-row align="center">
        <v-col cols="6">
          <v-row justify="start">
            <link-button to="/" :label="translateByKey('home', storeLanguage)">
              <v-icon v-if="isMobileC">mdi-home-circle</v-icon>
            </link-button>
          </v-row>
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
import isMobile from '../mixins/isMobile.vue';
export default {
  mixins: [isMobile]
}
</script>

<style scoped>
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: #000000;
}

</style>
