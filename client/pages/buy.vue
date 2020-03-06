<template>
  <div class="buy-page">
    <h1 class="buy-page-title">All Products</h1>
    <div class="buy-page-content">
      <div class="buy-page-content-products">
        <ProductCard v-for="item in items" :key="item" :img="img" />
      </div>

      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="pages"
        use-router
        class="buy-page-content-pagination"
      ></b-pagination-nav>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'

export default {
  components: {
    ProductCard
  },
  data: () => ({
    items: 18,
    pages: 10,
    img:
      'https://s12emagst.akamaized.net/products/22495/22494116/images/res_2617ed635c7737bf1b9215124dd4dd69_full.jpg'
  }),
  layout: 'buy',
  watch: {
    $route(to, from) {
      this.$forceUpdate()
    }
  },
  beforeMount() {
    const urlParams = new URLSearchParams(window.location.search)
    const myParam = urlParams.get('page')
    if (myParam === '1' || myParam === null) {
      this.img =
        'https://s12emagst.akamaized.net/products/22495/22494116/images/res_2617ed635c7737bf1b9215124dd4dd69_full.jpg'
    } else if (myParam === '2') {
      this.img =
        'https://s12emagst.akamaized.net/products/674/673302/images/res_2a9d2f7f03e2b4716e50b98a31b58c34_full.jpg'
    }
  },
  beforeUpdate() {
    const urlParams = new URLSearchParams(window.location.search)
    const myParam = urlParams.get('page')
    if (myParam === '1' || myParam === null) {
      this.img =
        'https://s12emagst.akamaized.net/products/22495/22494116/images/res_2617ed635c7737bf1b9215124dd4dd69_full.jpg'
    } else if (myParam === '2') {
      this.img =
        'https://s12emagst.akamaized.net/products/674/673302/images/res_2a9d2f7f03e2b4716e50b98a31b58c34_full.jpg'
    }
  },
  methods: {
    linkGen(pageNum) {
      return {
        path: '/buy/',
        query: { page: pageNum }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@include lg-up {
  .buy-page {
    width: 70%;

    &-title {
      text-align: center;
      margin-bottom: 2rem;
    }

    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;

      &-products {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1rem;
      }

      &-pagination {
        margin-top: 1.5rem;
      }
    }
  }
}
</style>
