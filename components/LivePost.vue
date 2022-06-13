<template>
  <div style="margin-bottom: 0.5rem; padding: 0.5rem" :class="post.type">
    <div v-if="post.type === 'goal'" style="display: flex;
    align-items: center;">
      <i class="fa-solid fa-futbol"></i>
      <h2>GOAL!</h2>
    </div>
    <div v-if="post.type === 'yellow_card'" style="display: flex;
    align-items: center;">
      <i class="fa-solid fa-book-open"></i>
      <h2>Booking</h2>
    </div>
    <div v-if="post.type === 'red_card'" style="display: flex;
    align-items: center;">
      <i class="fa-solid fa-hand-point-left"></i>
      <h2>RED CARD!!</h2>
    </div>
    <div :id="`content-${post.id}`"></div>
    <span><b>{{ parseTime(post.time) }}</b></span>
  </div>
</template>

<script>
export default {
    props: {    
        post: {
            type: Object
        }
    },
    methods: {
      parseTime(time) {
        const rawTime = new Date(time)
        return `${rawTime.getHours()}:${rawTime.getMinutes()}`
      }
    },
    mounted() {
      const contentWindows = document.getElementById(`content-${this.post.id}`)
      contentWindows.innerHTML = this.post.html
    }
}
</script>

<style lang="scss">
    body {
      color: black;
      //padding: 0 0.5rem
    }
    .goal {
      background: rgb(70, 191, 231)
    }
    .yellow_card {
      background: yellow;
    }
    .red_card {
      background: red;
    }
    .substitution {
      background: grey
    }
    .other {
      background: white
    }
    div > i {
      margin-right: 5px
    }
</style>