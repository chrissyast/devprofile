export default async function loadTranslations(section) {
  let translations = null
  if (process.env.NODE_ENV === 'development') {
    try {
        translations = require(`./translations/${section}.json`)
    } catch (error) {
      console.log(error)
    }
  }
  if (translations) {
    return translations.results
  }
}
