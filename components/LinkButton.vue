<template>
  <a :href="to" v-if="external">
    <v-btn>{{label}}</v-btn>
  </a>
  <nuxt-link v-else :to="to">
    <v-btn>
      {{label}}
    </v-btn>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    external: {
      type: Boolean
    }
  }
}
</script>

<style>

</style>