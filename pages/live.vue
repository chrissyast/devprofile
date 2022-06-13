<template>
    <div class="main-content">
        <live-feed/>
    </div>
</template>

<script>
import LiveFeed from '../components/LiveFeed.vue';
export default {
  components: { LiveFeed },
    fetchOnServer: false,
    async fetch() {
        console.log("checking");
        console.log(this.$prismic)
        try {
          let prismicResponse = await this.$prismic.api.query(
            this.$prismic.predicates.at('document.type', 'live_post'),
            {lang: 'en-gb'}
          )
          const content = prismicResponse.results
          content.forEach(i => {
            //console.log(i)
            //console.log(this.$prismic.asHtml(i.data.main_content))
          })
          const posts = content.map(c => {
            console.log(c)
            return {
              id: c.id,
              type: c.data.post_type,
              html: this.$prismic.asHtml(c.data.main_content),
              time: c.first_publication_date
            }
          })
          this.posts = posts.sort(this.sortDates)
          setTimeout(this.$nuxt.refresh, 2000)
        } catch (e) {
          // Returns error page
          console.log(e)
          // this.context.error({statusCode: 404, message: 'Page not found'})
        }
    },
    methods: {

    },
    mounted() {
    },
    data(){
      return {
          posts: []
      }
    }   
}

</script>

<style>

</style>