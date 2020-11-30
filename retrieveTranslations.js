export default async function loadTranslations() {
  let translations = null
  if (process.env.NODE_ENV === 'development') {
    try {
        translations = require('./translations/index.json')
    } catch (error) {
      console.log(error)
    }
  }
  if (translations) {
    return translations.results
  }
}
