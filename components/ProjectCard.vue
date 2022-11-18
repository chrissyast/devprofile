<template>
  <v-col cols="12" sm="6">
    <v-skeleton-loader v-if="!techsLoaded" type="image" />
    <v-card v-else light>
      <v-card-title>
        <v-container class="d-flex">
          <v-row align="center">
            {{$prismic.asText(project.title)}}
            <v-tooltip bottom v-for="l in techLogos" :key="l">
              <template v-slot:activator="{ on, attrs }">
                <img height="20" width="20" contain :key="l" :src="l.url" style="margin-left:2px; margin-right:2px" v-bind="attrs"
          v-on="on" />
              </template>
              <span>{{l.tooltip}}</span>
            </v-tooltip>
            
          </v-row>
        </v-container>
      </v-card-title>
      <v-card-subtitle>{{$prismic.asText(project.more_detail)}}</v-card-subtitle>
      <v-img :src="project.demo_gif.url" height="250" contain/>
      <a :href="project.live_demo.url"><v-btn>Check it out!</v-btn></a>
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
      technologies: [],
      techsLoaded: false
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
      this.techsLoaded = true
  },
  computed: {
    techLogos() {
      return this.technologies.map(t => {
        return { 
          url: t.data.thumbnail.url,
          tooltip: this.$prismic.asText(t.data.name)
        }
      })
    }
  }
}
</script>

<style>

</style>