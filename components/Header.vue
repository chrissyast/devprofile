<template>
  <v-app-bar app>
    <LanguagePicker/>
  </v-app-bar>
</template>

<script>
import LanguagePicker from "@/components/LanguagePicker";
export default {
  name: "Header",
  components: {LanguagePicker},
}
</script>

<style scoped>
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: #000000;
}

</style>
