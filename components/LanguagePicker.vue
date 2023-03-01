<template>
  <select @change="changeLanguage($event)">
    <option v-for="{code, name} in languages"
            :key="code"
            :value="code"
            :selected="selectedLanguage===code">
      {{name}}
    </option>
  </select>
</template>

<script>
export default {
  name: "LanguagePicker",
  methods: {
   changeLanguage(event) {
     this.$store.commit("changeLanguage", event.target.value)
   }
  },
  data() {
    return {
      languages: [{code:"en-gb",name:"English"},{code:"es-es",name:"Español"},{code:"zh-cn",name:"简体中文"}]
    }
  },
  computed: {
    selectedLanguage() {
      return this.$store.getters["selectedLanguage"];
    }
  }
}
</script>

<style scoped lang="scss">
  select {
    padding: 10px;
    border-radius: 10px;
    -webkit-appearance: auto;
    background-color: white;  // adding vuetify has changed appearance of the select. consider a new implementation of the select altogether
  }
</style>
