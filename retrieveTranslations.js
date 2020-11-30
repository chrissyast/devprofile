export default async function loadTranslations() {

  const translations = require(
  `./translations/index.json`)
  return translations.results
}