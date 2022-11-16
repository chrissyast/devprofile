<template>
    <div tabindex="0" class="main-content">
      <v-container>
        <v-row>
          <ProjectCard v-for="(project, i) in projects" :key="i" :project="project">{{project.title}}</ProjectCard>
        </v-row>
      </v-container>
    </div>
</template>

<script>
import { fetchPrismicContent } from '../services/prismicContentFetcher'
export default {
  async asyncData(context) {
    return fetchPrismicContent("project", context, process)
  },
  computed: {
    projects() {
        return this.langMap.filter(l => l.lang === this.storeLanguage).map(l2 => l2.data)
    },
    storeLanguage() {
      return this.$store.state.selectedLanguage
    }
  }
}
</script>