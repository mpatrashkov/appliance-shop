<template>
  <div>
    <b-card class="buy-page-content-products-product">
      <b-card-body class="buy-page-content-products-product-body">
        <b-card-img-lazy
          class="buy-page-content-products-product-body-img"
          :src="img"
        ></b-card-img-lazy>
        <b-card-title class="buy-page-content-products-product-title"
          >Смартфон Huawei P Smart (2019), Dual SIM, 64GB, 4G</b-card-title
        >
        <b-card-text class="buy-page-content-products-product-body-text">
          <span>In Stock</span>
          <p>Price: 199<sup>99</sup> $</p>
        </b-card-text>
      </b-card-body>
      <b-card-footer class="buy-page-content-products-product-footer">
        <nuxt-link
          to="/product/as"
          class="btn btn-primary buy-page-content-products-product-footer-btn"
          variant="primary"
          >View More</nuxt-link
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
