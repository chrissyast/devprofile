export const state = () => ({
  selectedLanguage: 'en-gb'
})

export const mutations = {
  changeLanguage(state, lang) {
    state.selectedLanguage = lang
  }
}
