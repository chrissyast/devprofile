export default async function loadTranslations() {

  const translations = await import(
  `./translations/index.json`)
  return translations.results
}