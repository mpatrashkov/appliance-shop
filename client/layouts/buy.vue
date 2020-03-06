<template>
  <div>
    <NavBar />
    <div class="content">
      <SideBar />
      <nuxt />
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'

export default {
  components: {
    NavBar,
    SideBar
  }
}
</script>

<style lang="scss"></style>
