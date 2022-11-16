<template>
  <v-col cols="12" sm="6">
    <v-card>
      <v-card-title>{{$prismic.asText(project.title)}}</v-card-title>
      <v-card-subtitle>{{$prismic.asText(project.more_detail)}}</v-card-subtitle>
      <v-img :src="project.demo_gif.url" height="250" contain></v-img>
      <a :href="project.live_demo.url"><v-btn>Check it out!</v-btn></a>
      <v-img v-for="l in techLogos" height="20" contain :key="l" :src="l"></v-img>
      <!-- TODO alignment and hover text -->
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      technologies: []
    }
  },
  async created() {
    const projectTechs = this.project.technologies
      let output = []
      for await (const t of projectTechs) {
        const techId = t.technology.id
        if (techId) {
          let prismicResponse = await this.$prismic.api.query(
              this.$prismic.predicates.at('document.id', techId),
              {lang: '*'}
            )
          output = output.concat(prismicResponse.results)
        }
      }
      this.technologies = output
  },
  computed: {
    techLogos() {
      return this.technologies.map(t => t.data.thumbnail.url)
    }
  }
}
</script>

<style>

</style>