<template>
  <div class="buy-page">
    <h1 class="buy-page-title">Всички Продукти</h1>
    <div class="buy-page-content">
      <div class="buy-page-content-products">
        <ProductCard
          v-for="item in items"
          :key="item.id"
          :img="img"
          :item="item"
        />
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
  asyncData: async ({ $axios }) => {
    const products = (await $axios.get('/products')).data
    return {
      items: products
    }
  },
  data: () => ({
    pages: 10,
    img: 'https://www.piero.bg/image/cache/1e6dbd2e0976755a6e17af3efcd16924.jpg'
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
        'https://www.piero.bg/image/cache/1e6dbd2e0976755a6e17af3efcd16924.jpg'
    } else if (myParam === '2') {
      this.img =
        'https://www.piero.bg/image/cache/1e6dbd2e0976755a6e17af3efcd16924.jpg'
    }
  },
  beforeUpdate() {
    const urlParams = new URLSearchParams(window.location.search)
    const myParam = urlParams.get('page')
    if (myParam === '1' || myParam === null) {
      this.img =
        'https://www.piero.bg/image/cache/1e6dbd2e0976755a6e17af3efcd16924.jpg'
    } else if (myParam === '2') {
      this.img =
        'https://www.piero.bg/image/cache/1e6dbd2e0976755a6e17af3efcd16924.jpg'
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
