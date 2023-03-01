<template>
  <div tabindex="0" class="main-content centred">
    <div class="centred-text px-3">
      <h1 class="c-title">
        {{ welcomeText }}
      </h1>
      <p class="c-subtitle">
        {{ intro }}
      </p>
      <LinkButton to="/projects" :x-large="!isMobileC" :small="isMobileC" :label="translateByKey('seeMyProjects', storeLanguage)"></LinkButton>
    </div>
  </div>
</template>

<script>
import { fetchPrismicContent } from '../services/prismicContentFetcher'
import isMobile from '../mixins/isMobile.vue';

export default {
  async asyncData(context) {
    return fetchPrismicContent("introduction", context, process)
  },
  mixins: [isMobile],
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
