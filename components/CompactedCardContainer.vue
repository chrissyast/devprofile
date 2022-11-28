<template>
  <div :class="outerClass" style="width: 100%;">
    <div id="parent-container" style="position:relative">
      <div
        v-for="(c, index) in $slots.default"
        :id="`child-${index}`"
        :key="`child-${index}`"
        class="child-card"
        :class="innerClass"
        :style="`position: absolute; width: ${100 / perRow}%;`"
        @click="debouncedRearrageCards(75)"
      >
        <VNodes :vnodes="c" />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  components: {
    VNodes: {
      functional: true,
      render: (_, ctx) => ctx.props.vnodes
    }
  },
  props: {
    outerClass: {
      type: String,
      default: ''
    },
    innerClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      perRowSizes: {
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3
      },
      heightMap: {}
    }
  },
  computed: {
    perRow() {
      return this.perRowSizes[this.$vuetify.breakpoint.name]
    }
  },
  watch: {
    perRow: {
      handler() {
        this.debouncedRearrageCards()
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.debouncedRearrageCards)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.debouncedRearrageCards)
  },
  created() {
    this.debouncedRearrageCards = time => debounce(this.rearrangeCards, time || 250, {
      leading: false,
      trailing: true
    })(time)
  },
  mounted() {
    setTimeout(this.rearrangeCards, 500)
  },
  methods: {
    translation(index) {
      if (!this.perRow) { return }
      const { heightMap } = this
      const shortestColumn = Math.min(...Object.values(heightMap))
      const x = parseInt(Object.keys(heightMap).find(k => heightMap[k] === shortestColumn))
      const element = document.getElementById(`child-${index}`)
      const y = heightMap[x]
      heightMap[x] = heightMap[x] + element.offsetHeight
      return `translate(${x * 100}%, ${y}px)`
    },
    rearrangeCards() {
      this.heightMap = {}
      for (let i = 0; i < this.perRow; i++) {
        this.heightMap[i] = 0
      }
      for (let i = 0; i < this.$slots.default.length; i++) {
        const element = document.getElementById(`child-${i}`)
        element.style.transform = (`${this.translation(i)}`)
      }
      const parent = document.getElementById('parent-container')
      const heightOfFirstCol = this.heightMap[0]
      parent.style.height = `${heightOfFirstCol + 20}px`
    },
    debouncedRearrageCards() {}
  }
}
</script>

<style>
  .child-card {
    transition: transform 180ms ease-in-out;
  }
</style>
