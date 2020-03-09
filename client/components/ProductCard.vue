<template>
  <div>
    <b-card class="buy-page-content-products-product">
      <b-card-body class="buy-page-content-products-product-body">
        <b-card-img-lazy
          class="buy-page-content-products-product-body-img"
          :src="img"
        ></b-card-img-lazy>
        <b-card-title class="buy-page-content-products-product-title">{{
          displayName
        }}</b-card-title>
        <b-card-text class="buy-page-content-products-product-body-text">
          <span>В наличност</span>
          <p>Цена: {{ item.price }} лв</p>
        </b-card-text>
      </b-card-body>
      <b-card-footer class="buy-page-content-products-product-footer">
        <nuxt-link
          :to="'/product/' + item.id"
          class="btn btn-primary buy-page-content-products-product-footer-btn"
          variant="primary"
          >Виж още</nuxt-link
        >
      </b-card-footer>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ''
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    displayName() {
      return this.item.model.brand.name + ' ' + this.item.model.name
    }
  }
}
</script>

<style lang="scss" scoped>
@include lg-up {
  .buy-page-content-products-product {
    &-title {
      padding: 0.5rem 0.5rem;
      padding-bottom: 0;
      text-align: center;
      font-size: 1.3em;
      margin-bottom: 0;
    }
    &-body {
      padding: 1rem !important;
      display: flex;
      flex-direction: column;
      align-items: center;

      &-img {
        width: 10rem;
        height: 10rem;
        object-fit: cover;
      }

      &-text {
        margin-top: 1rem;
        text-align: center;

        p {
          margin-bottom: 0;
          margin-top: 0.5rem;
        }
      }
    }

    &-footer {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
