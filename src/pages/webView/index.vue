<template>
  <web-view :src="url" :progress="false"></web-view>
</template>

<script>
export default {
  computed: {
    name() {
      return this.$route.query.title
    },
    url() {
      return this.$route.query.addurl
    }
  },
  data() {
    return {
      title: ''
    }
  },
  onload(res) {
    this.title = res.title;
  },
  onReady() {
    uni.setNavigationBarTitle({
      title: this.name
    })
  }
}
</script>