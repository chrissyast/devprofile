    fs = require('fs')


    var Prismic = require('prismic-javascript');

Prismic.getApi("https://dev-profile.prismic.io/api/v2").then(function(api) {  return api.query(
    Prismic.Predicates.at('document.type', 'introduction'),
    {lang: '*'}
  );
}).then(function(response) {
    console.log(response)
    try{
        fs.writeFileSync('translations/index.json', JSON.stringify(response))
    } catch (error)
    {
        console.log(error)
    }
  // response is the response object, response.results holds the documents
});

