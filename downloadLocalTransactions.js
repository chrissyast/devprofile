fs = require('fs')
util = require('util')
Prismic = require('prismic-javascript');

const sections = ["introduction", "project"]
let allAlternateLangs
sections.forEach((s) =>
  Prismic.getApi("https://dev-profile.prismic.io/api/v2").then(function(api) {
    const langs = api.languages
    allAlternateLangs = langs.filter(l => l.id !== "en-gb").map(l => l.id)
    return api.query(
      Prismic.Predicates.at('document.type', s),
      {lang: '*'}
    );
  }).then((response) => {
      const fallbackLanguageContent = response.results.filter(r => r.lang === 'en-gb')
      const untranslatedContent = fallbackLanguageContent.filter(ep => ep.alternate_languages.length !== allAlternateLangs.length)
      untranslatedContent.forEach(up => {
        const existingLangs = up.alternate_languages.map(al => al.lang)
        const missingLangs = allAlternateLangs.filter(al => !existingLangs.includes(al))
        missingLangs.forEach(ml => {
          const copiedPost = Object.assign({}, up)
          copiedPost.lang = ml
          response.results.push(copiedPost)
        })
      })
      fs.writeFile(`translations/${s}.json`, JSON.stringify(response), {flag: 'w'}, function (err) {
        if (err) console.log(err)
      })
  })
)
;

