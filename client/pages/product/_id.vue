<template>
  <div class="product-page content">
    <div class="product-page-title">
      <h1>{{ displayName }}</h1>
    </div>
    <div class="product-page-content">
      <div class="product-page-content-img">
        <b-img-lazy :src="img"></b-img-lazy>
      </div>
      <div class="product-page-content-info">
        <div>
          <h4>Основна информация</h4>
          <b-table-simple>
            <b-tr>
              <b-th class="w-226">Марка</b-th>
              <b-td>{{ item.model.brand.name }}</b-td>
            </b-tr>
            <b-tr>
              <b-th class="w-226">Модел</b-th>
              <b-td>{{ item.model.name }}</b-td>
            </b-tr>
            <b-tr>
              <b-th class="w-226">Категория</b-th>
              <b-td>{{
                item.category.parent.name + ' / ' + item.category.name
              }}</b-td>
            </b-tr>
          </b-table-simple>
        </div>
        <div>
          <h4>Допълнителна информация</h4>
          <b-table-simple>
            <b-tr
              v-for="(dynamicOptionValue, index) in item.dynamicOptionsValues"
              :key="index"
            >
              <b-th class="w-226">{{
                dynamicOptionValue.dynamicOption.name
              }}</b-th>
              <b-td>{{ dynamicOptionValue.value }}</b-td>
            </b-tr>
          </b-table-simple>
          <div class="mt-2">
            Телефон за връзка:
            <a href="tel:+359 886 400 380">+359 886 400 380</a>
          </div>
        </div>
      </div>
      <div class="product-page-content-buy">
        <div class="product-page-content-buy-price">
          Цена: {{ item.price }} лв
        </div>
        <p class="product-page-content-buy-desc">
          <strong>Описание: </strong> {{ item.description }}
        </p>
      </div>
    </div>
    <div class="product-page-similar">
      <ProductCard
        v-for="similarItem in item.similarProducts"
        :key="similarItem.id"
        :img="img"
        :item="similarItem"
      />
      <!-- <ProductCard :img="img" />
      <ProductCard :img="img" />
      <ProductCard :img="img" />
      <ProductCard :img="img" /> -->
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
  asyncData: async ({ params, $axios }) => {
    const { id } = params
    const product = (await $axios.get('/products/' + id)).data
    return {
      item: product
    }
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
    img: 'https://www.piero.bg/image/cache/1e6dbd2e0976755a6e17af3efcd16924.jpg'
  }),
  computed: {
    displayName() {
      return this.item.model.brand.name + ' ' + this.item.model.name
    }
  }
}
</script>

<style lang="scss" scoped>
.w-226 {
  width: 226px;
}

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
