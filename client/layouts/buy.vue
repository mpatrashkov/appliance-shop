<template>
  <div>
    <NavBar />
    <div class="content">
      <SideBar />
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'

export default {
  components: {
    NavBar,
    SideBar,
    Footer
  }
}
</script>

<style lang="scss"></style>
