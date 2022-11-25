<template>
  <a :href="to" v-if="external">
    <slot v-if="$slots['default']"></slot>
    <v-btn v-else>{{label}}</v-btn>
  </a>
  <nuxt-link v-else :to="to">
    <slot v-if="$slots['default']"></slot>
    <v-btn v-else>{{label}}</v-btn>
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
    },
    children: {
      type: Object
    }
  }
}
</script>

<style>

</style>