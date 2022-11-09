    fs = require('fs')


    var Prismic = require('prismic-javascript');
const sections = ["introduction", "project"]
sections.forEach((s) =>
  Prismic.getApi("https://dev-profile.prismic.io/api/v2").then(function(api) {  return api.query(
      Prismic.Predicates.at('document.type', s),
      {lang: '*'}
    );
  }).then(function(response) {
      console.log(response)
      fs.writeFile(`translations/${s}.json`, JSON.stringify(response), {flag: 'w'}, function (err) {
        if (err) console.log(err)
      })
    // response is the response object, response.results holds the documents
  })
)
;

