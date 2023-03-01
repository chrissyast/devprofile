<script>
export default {
  mounted() {
    if (!window) { return }
    window.addEventListener("resize", this.myEventHandler);
    this.myEventHandler()
  },
  data() {
    return {
      isMobileC: false
    }
  },
  unmounted() {
    if (!window) { return }
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    myEventHandler(e) {
      this.isMobileC = window.innerWidth < 768
    }
  }
}
</script>

