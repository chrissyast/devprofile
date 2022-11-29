<template>
  <v-skeleton-loader v-if="!techsLoaded" type="image" />
  <v-card v-else light>
    <v-card-title>
      <v-container class="d-flex">
        <v-row align="center">
          {{$prismic.asText(project.title)}}
          <v-tooltip bottom v-for="(l, i) in techLogos" :key="`logo-${i}`">
            <template v-slot:activator="{ on, attrs }">
              <img height="20" width="20" contain :src="l.url" style="margin-left:2px; margin-right:2px" v-bind="attrs"
        v-on="on" />
            </template>
            <span>{{l.tooltip}}</span>
          </v-tooltip>
          
        </v-row>
      </v-container>
    </v-card-title>
    <v-card-subtitle>{{$prismic.asText(project.subtitle)}}</v-card-subtitle>
    <v-card-text>{{$prismic.asText(project.more_detail)}}</v-card-text>
    <v-img v-if="project.demo_gif.url" :src="project.demo_gif.url" height="250" contain>
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-3"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-card-actions class="px-4 py-0">
      <v-container class="d-flex">
        <v-row align="center">
          <v-col cols="6">
            <v-row class="my-0" justify="start">
              <a :href="project.github.url">
                <v-img v-if="project.github.url" src="assets/GitHub-Mark-32px.png" max-height="20px" max-width="20px" />
              </a>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row class="my-0" justify="end">
              <link-button v-if="project.live_demo.url" external :to="project.live_demo.url" :label="translateByKey('checkItOut', storeLanguage)"></link-button>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
    
    <!-- TODO alignment and hover text -->
  </v-card>
</template>

<script>
import LinkButton from './LinkButton.vue'
export default {
	components: { LinkButton },
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