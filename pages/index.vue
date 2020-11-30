<template>
  <div class="container">
    <div>
      <select @change="changeLanguage($event)">
        <option v-for="{code, name} in languages"
        :value="code"
        :selected="selectedLanguage===code">
            {{name}}
        </option>
      </select>
      <h1 class="title">
        {{ welcomeText }}
      </h1>
      <p>
        {{ intro }}
      </p>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import loadTranslations from '../retrieveTranslations.js'

export default {
  async asyncData(context) {
    let selectedLanguage = "en-gb"
    if (process.server) {
      const { req, res, beforeNuxtRender } = context
      const host = req.headers.host;
      if (host === "inglesconchris.me:3000" || host === "inglesconchris.me") {  // TODO clean this up
        selectedLanguage = "es-es"
      }
    }
    if (context.isDev) {
      let translations = await loadTranslations()
      const langMap = translations.map((f) => {return {"lang": f.lang, "data": f.data}})
      return {langMap, selectedLanguage}
    } else {
    const {error, $prismic} = context
        let introductionContent = {}
        try {
          let prismicResponse = await $prismic.api.query(
          $prismic.predicates.at('document.type', 'introduction'),
              {lang: '*'})
          const content = prismicResponse.results
          const langMap = content.map((f) => {return {"lang": f.lang, "data": f.data}})
          return {langMap, selectedLanguage}
          } catch (e) {
            // Returns error page
            console.log(e)
            error({statusCode: 404, message: 'Page not found'})
          }
    }
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
      const selectedLanguageContent =  this.langMap.find(f => f.lang === this.selectedLanguage)
      const text = this.$prismic.asText(selectedLanguageContent.data.welcome)
      return text
    },
    intro() {
      const selectedLanguageContent =  this.langMap.find(f => f.lang === this.selectedLanguage)
      const text = this.$prismic.asText(selectedLanguageContent.data.introduction_text)
      return text
    }
  },
  mounted() {
    this.isMounted = true;
  },

  methods: {
    changeLanguage(event) {
      this.selectedLanguage = event.target.value
    },

  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
