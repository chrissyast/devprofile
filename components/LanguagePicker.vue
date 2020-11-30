<template>
<div>
  <select @change="changeLanguage($event)">
    <option v-for="{code, name} in languages"
            :value="code"
            :selected="selectedLanguage===code">
      {{name}}
    </option>
  </select>
</div>
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
}
</script>

<style scoped>

</style>
