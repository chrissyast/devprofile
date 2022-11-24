<template>
  <nuxt-link :to="to">
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
    }
  }
}
</script>

<style>

</style>