<template>
  <div tabindex="0" class="main-content container">
    <div>
      <h1 class="title">
        {{ welcomeText }}
      </h1>
      <p class="subtitle">
        {{ intro }}
      </p>
      <NuxtLink to="/projects">See my projects</NuxtLink>
    </div>
  </div>
</template>

<script>
// FOO
import axios from 'axios'
import loadTranslations from '../retrieveTranslations.js'
import { throttle, debounce } from 'lodash'
import { fetchPrismicContent } from '../services/prismicContentFetcher'

export default {
  async asyncData(context) {
    return fetchPrismicContent("introduction", context, process)
  },
  beforeCreate() {
    //debugger;
  },
  data() {
    return {
        languages: [{code:"en-gb",name:"English"},{code:"es-es",name:"Español"},{code:"zh-cn",name:"简体中文"}]
    }
  },
  created(context) {

  },
  computed: {
    welcomeText() {
      const selectedLanguageContent =  this.langMap.find(f => f.lang === this.storeLanguage)
      const text = this.$prismic.asText(selectedLanguageContent.data.welcome)
      return text
    },
    intro() {
      const selectedLanguageContent =  this.langMap.find(f => f.lang === this.storeLanguage)
      const text = this.$prismic.asText(selectedLanguageContent.data.introduction_text)
      return text
    },
    storeLanguage() {
      return this.$store.state.selectedLanguage
    }
  },

  methods: {
    // debouncedNextPage: debounce((message) => {console.log(message)}, 1250, {leading: true, trailing: false}),
    // handleScroll(event) {
    //   console.log(event.type === "keyup")
    //   if (event.deltaY > 0) {
    //     this.debouncedNextPage("next page")
    //   } else {
    //     this.debouncedNextPage("prev page")
    //   }
    // }
  },
 // layout: "blank"
}
</script>

<style lang="scss">
</style>
