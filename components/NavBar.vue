<template>
  <v-app-bar app>
    <v-container class="d-flex">
      <v-row align="center">
        <v-col cols="6">
          <link-button to="/" label="home" />
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
  name: "Header",
}
</script>

<style scoped>
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: #000000;
}

</style>
