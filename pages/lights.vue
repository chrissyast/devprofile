<template>
<v-app>
<div class="main-content" style="display:flex; justify-content:center">
  
  <div v-for="light in lights" :key="light.id">
    {{ light.name }}

    <v-color-picker v-model="light.val" @input="event => changeColour(light.id, event)"></v-color-picker>
  </div>

</div>
</v-app>

</template>

<script>
// import { changeColour as utilChangeColour } from '~/utils/lights';
export default {
  data() {
    return {
      lights: [
        { name: "Above Bed Top", id: "bfb2e8e952b6596d6d9180", val: { h: 300, s: 1, v: 1 } },
        { name: "Above Bed Bottom", id: "bf0c3f4816aa83f4e1p9yc", val: { h: 300, s: 1, v: 1 }},
        { name: "Other Top", id: "bff3e10624c7fd882abua2", val: { h: 300, s: 1, v: 1 } },
        { name: "Other Bottom", id: "bfb0acaa52202bbe96bqrn", val: { h: 300, s: 1, v: 1 }}
      ]
    }
  },
  methods: {
    changeColour(id, event) {
      console.log(id)
      console.log(event)
      const sendableEvent = Object.assign({}, event)
      sendableEvent.s = sendableEvent.s * 1000
      sendableEvent.v = sendableEvent.v * 1000
      // utilChangeColour(event, [id])
      this.$axios.post("http://localhost:4000/lights", {...sendableEvent, ...{ids: [id]}})
    }
  }
}
</script>

<style>

</style>