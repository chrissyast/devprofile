import loadTranslations from '../retrieveLocalTranslations.js'

export async function fetchPrismicContent(section, context, process) {
    let selectedLanguage = "en-gb"
    const fallbackLanguage = "en-gb"
    if (process.server) {
        const { req, res, beforeNuxtRender } = context
        const host = req.headers.host;
        if (host === "inglesconchris.me:3000" || host === "inglesconchris.me") {  // TODO clean this up
          selectedLanguage = "es-es"
        }
      }
      if (context.isDev) { // TODO include env variable to force using online content
        let translations = await loadTranslations(section)
        const langMap = translations.map((f) => {return {"lang": f.lang, "data": f.data}})
        return {langMap, selectedLanguage}
      } else {
      const {error, $prismic} = context
          try {
            const langs = await $prismic.api.languages
            const allAlternateLangs = langs.filter(l => l.id !== fallbackLanguage).map(l => l.id)
            let prismicResponse = await $prismic.api.query(
              $prismic.predicates.at('document.type', section),
              {lang: '*'}
            )
            const content = Object.assign([], prismicResponse.results) // some weird duplication was happening without the assign
            const fallbackLanguageContent = content.filter(r => r.lang === fallbackLanguage)
            const untranslatedContent = fallbackLanguageContent.filter(ep => ep.alternate_languages.length !== allAlternateLangs.length)
            untranslatedContent.forEach(cont => {
              const existingLangs = cont.alternate_languages.map(al => al.lang)
              const missingLangs = allAlternateLangs.filter(al => !existingLangs.includes(al))
              missingLangs.forEach(ml => {
                const copiedPost = Object.assign({}, cont)
                copiedPost.lang = ml
                content.push(copiedPost)
              })
            })
            const langMap = content.map((f) => {return {"lang": f.lang, "data": f.data}})
            return {langMap, selectedLanguage}
            } catch (e) {
              // Returns error page
              console.log(e)
              error({statusCode: 404, message: 'Page not found'})
            }
      }
}