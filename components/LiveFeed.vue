<template>
  <div style="padding:1rem"><live-post v-for="post in posts" :post="post" :key="post.id" /></div>
</template>

<script>
export default {
  fetchOnServer: false,
  async fetch() {
      try {
        const main = await this.$axios.get("https://dev-profile.prismic.io/api/v2")
        const master = main.data.refs.find(r => r.id === "master")
        console.log(master.ref)
        const docResult = await this.$axios.get(`https://dev-profile.prismic.io/api/v2/documents/search?ref=${master.ref}&q=[[at(document.type, "live_post")]]#format=html`)
        console.log("docResult.data")
        console.log(docResult.data)
        const posts =  docResult.data.results.map(c => {
          return {
            id: c.id,
            type: c.data.post_type,
            html: this.$prismic.asHtml(c.data.main_content),
            time: c.first_publication_date
          }
        })
        console.log(posts)
        posts.sort(this.sortDates)
        debugger
        this.posts = posts
        setTimeout(this.$fetch, 2000)
      } catch (e) {
        // Returns error page
        console.log(e)
        // this.context.error({statusCode: 404, message: 'Page not found'})
      }
    },
    data() {
      return {
        posts: []
      }
    },
    methods: {
      sortDates(a,b) {
        return a.time < b.time ? 1 : -1 
      }
    }
}
</script>

<style>

</style>