import tran from '../translations'
import Vue from 'vue'

Vue.mixin({
  methods: {
    translateByKey(key, language) {
      return tran[language][key]
    }
  },
  computed: {
    storeLanguage() {
      return this.$store.state.selectedLanguage
    }
  }
})
