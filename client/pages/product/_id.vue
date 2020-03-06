<template>
  <div class="product-page content">
    <div class="product-page-title">
      <h1>Смартфон Huawei P Smart (2019), Dual SIM, 64GB, 4G</h1>
    </div>
    <div class="product-page-content">
      <div class="product-page-content-img">
        <b-img-lazy
          src="https://s12emagst.akamaized.net/products/22495/22494116/images/res_2617ed635c7737bf1b9215124dd4dd69_full.jpg"
        ></b-img-lazy>
      </div>
      <div class="product-page-content-info">
        <div>
          <h4>Basic Information</h4>
          <b-table-simple>
            <b-tr v-for="(info, index) in information" :key="index">
              <b-th v-for="(value, name) in info" :key="name">{{
                name.charAt(0).toUpperCase() + name.slice(1)
              }}</b-th>
              <b-td v-for="value in info" :key="value"> {{ value }}</b-td>
            </b-tr>
          </b-table-simple>
        </div>
        <div>
          <h4>Additional Information</h4>
          <b-table-simple>
            <b-tr v-for="(info, index) in information" :key="index">
              <b-th v-for="(value, name) in info" :key="name">{{
                name.charAt(0).toUpperCase() + name.slice(1)
              }}</b-th>
              <b-td v-for="value in info" :key="value"> {{ value }}</b-td>
            </b-tr>
          </b-table-simple>
        </div>
      </div>
      <div class="product-page-content-buy">
        <div class="product-page-content-buy-price">
          Price: 199<sup>99</sup> $
        </div>
        <p class="product-page-content-buy-desc">
          <strong>Description: </strong> ipsum dolor sit amet consectetur
          adipisicing elit. Maiores vel mollitia ducimus distinctio, facilis
          quam aut obcaecati sit hic accusantium? Reprehenderit voluptates eos
          totam sed! Veniam deleniti alias placeat provident!
        </p>
      </div>
    </div>
    <div class="product-page-similar">
      <ProductCard :img="img" />
      <ProductCard :img="img" />
      <ProductCard :img="img" />
      <ProductCard :img="img" />
    </div>
  </div>
</template>

<script>
import ProductCard from '../../components/ProductCard'

export default {
  components: {
    ProductCard
  },
  validate({ params }) {
    return !(params.id === undefined)
  },
  data: () => ({
    information: [
      { size: '69.7 x 147.4 x 8.4 мм' },
      { color: 'Black' },
      { weight: 141 },
      { OS: 'Android 9.0 (Pie)' },
      { RAM: '3 GB' },
      { storage: '32 GB' },
      { resolution: '720 x 1560' },
      { inches: 5.8 },
      { USB: 'Type C' }
    ],
    img:
      'https://s12emagst.akamaized.net/products/22495/22494116/images/res_2617ed635c7737bf1b9215124dd4dd69_full.jpg'
  })
}
</script>

<style lang="scss">
.content.product-page {
  flex-direction: column !important;
}

.product-page {
  &-content {
    margin-top: 3rem;
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    grid-template-rows: auto;
    grid-gap: 3rem;

    &-img {
      grid-row: 1;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &-info {
      grid-row: 1 / span 3;
      grid-column: 2;
    }

    &-buy {
      grid-row: 2;

      &-price {
        text-align: center;
        font-size: 2em;
        font-weight: bold;
      }

      &-desc {
        margin-top: 1rem;

        strong {
          font-size: 1.3em;
        }
      }
    }
  }

  &-similar {
    display: flex;
    justify-content: space-between;

    div:not(:last-child) {
      margin-right: 1rem;
    }
  }
}
</style>
