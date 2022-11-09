import loadTranslations from '../retrieveTranslations.js'

export async function fetchPrismicContent(section, context, process) {
    let selectedLanguage = "en-gb"
    if (process.server) {
        const { req, res, beforeNuxtRender } = context
        const host = req.headers.host;
        if (host === "inglesconchris.me:3000" || host === "inglesconchris.me") {  // TODO clean this up
          selectedLanguage = "es-es"
        }
      }
      if (context.isDev) {
        let translations = await loadTranslations(section)
        const langMap = translations.map((f) => {return {"lang": f.lang, "data": f.data}})
        return {langMap, selectedLanguage}
      } else {
      const {error, $prismic} = context
          try {
            let prismicResponse = await $prismic.api.query(
            $prismic.predicates.at('document.type', section),
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
}