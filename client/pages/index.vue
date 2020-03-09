<template>
  <div class="home-page content">
    <h1 class="home-page-header">
      Welcome To Bialata Tehnika! Global Marketplace For Buying Home Appliances!
    </h1>
    <div class="home-page-jumbotron">
      <div class="home-page-jumbotron-categories">
        <div class="home-page-jumbotron-categories-header">
          <h4>Categories</h4>
          <!-- <BIconPlus
            class="home-page-jumbotron-categories-header-icon"
          ></BIconPlus> -->
        </div>
        <ul class="home-page-jumbotron-categories-list">
          <li class="home-page-jumbotron-categories-list-category">
            <BIconWindow
              class="home-page-jumbotron-categories-list-category-icon"
            ></BIconWindow>
            Cookers
          </li>
          <li class="home-page-jumbotron-categories-list-category">
            <BIconEggFried
              class="home-page-jumbotron-categories-list-category-icon"
            ></BIconEggFried>
            Fridges
          </li>
          <li class="home-page-jumbotron-categories-list-category">
            <BIconWallet
              class="home-page-jumbotron-categories-list-category-icon"
            ></BIconWallet>
            Dish Washers
          </li>
          <li class="home-page-jumbotron-categories-list-category">
            <BIconCircleSlash
              class="home-page-jumbotron-categories-list-category-icon"
            ></BIconCircleSlash>
            Washing Machines
          </li>
          <li class="home-page-jumbotron-categories-list-category">
            <BIconSun
              class="home-page-jumbotron-categories-list-category-icon"
            ></BIconSun>
            Boilers
          </li>
          <li class="home-page-jumbotron-categories-list-category">
            <BIconWindow
              class="home-page-jumbotron-categories-list-category-icon"
            ></BIconWindow>
            Cookers
          </li>
          <li class="home-page-jumbotron-categories-list-category">
            <BIconEggFried
              class="home-page-jumbotron-categories-list-category-icon"
            ></BIconEggFried>
            Fridges
          </li>
          <li class="home-page-jumbotron-categories-list-category">
            <BIconWallet
              class="home-page-jumbotron-categories-list-category-icon"
            ></BIconWallet>
            Dish Washers
          </li>
        </ul>
      </div>
      <b-carousel
        class="home-page-jumbotron-carousel"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
      >
        <b-carousel-slide>
          <img
            slot="img"
            class="d-block img-fluid w-100 home-page-jumbotron-carousel-image"
            width="1024"
            height="480"
            src="https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKCXtKSJsAEQARgBMgi5tgHJWG32LQ"
            @click="onClickRedirect('/buy')"
          />
        </b-carousel-slide>
        <b-carousel-slide>
          <img
            slot="img"
            class="d-block img-fluid w-100 home-page-jumbotron-carousel-image"
            width="1024"
            height="480"
            src="https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKCX1MDN_QEQARgBMgjTyKGAyPwfzg"
            @click="onClickRedirect('/buy')"
          />
        </b-carousel-slide>
        <b-carousel-slide>
          <img
            slot="img"
            class="d-block img-fluid w-100 home-page-jumbotron-carousel-image"
            width="1024"
            height="480"
            src="https://tpc.googlesyndication.com/pagead/imgad?id=CICAgKCXtMPazQEQARgBMggJGsRv7j79OQ"
            @click="onClickRedirect('/buy')"
          />
        </b-carousel-slide>
      </b-carousel>
    </div>
    <div class="home-page-content">
      <div class="home-page-content-popular">
        <h3>Popular Products</h3>
        <div class="home-page-content-products">
          <ProductCard :img="img" />
          <ProductCard :img="img" />
          <ProductCard :img="img" />
          <ProductCard :img="img" />
        </div>
      </div>
      <div class="home-page-content-new">
        <h3>New Products</h3>
        <div class="home-page-content-products">
          <ProductCard :img="img" />
          <ProductCard :img="img" />
          <ProductCard :img="img" />
          <ProductCard :img="img" />
        </div>
      </div>
      <div class="home-page-content-sale">
        <h3>Products On Sale</h3>
        <div class="home-page-content-products">
          <ProductCard :img="img" />
          <ProductCard :img="img" />
          <ProductCard :img="img" />
          <ProductCard :img="img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  //   BIconPlus,
  BIconWindow,
  BIconEggFried,
  BIconWallet,
  BIconCircleSlash,
  BIconSun
} from 'bootstrap-vue'
import ProductCard from '../components/ProductCard'

export default {
  components: {
    // BIconPlus,
    BIconWindow,
    BIconEggFried,
    BIconWallet,
    BIconCircleSlash,
    BIconSun,
    ProductCard
  },
  data: () => ({
    img:
      'https://s12emagst.akamaized.net/products/22495/22494116/images/res_2617ed635c7737bf1b9215124dd4dd69_full.jpg'
  }),
  methods: {
    onClickRedirect(URL) {
      this.$router.push(URL)
    }
  }
}
</script>

<style lang="scss" scoped>
@include md-up {
  .home-page {
    display: flex;
    flex-direction: column;

    &-header {
      width: 100%;
      text-align: center;
      font-size: 1.7em;
    }

    &-jumbotron {
      box-shadow: 0 2px 10px -2px rgba(0, 0, 0, 0.3);
      margin-top: 2rem;
      display: grid;
      grid-template-columns: 1fr 4fr;

      &-carousel {
        &-image:hover {
          cursor: pointer;
        }
      }

      &-categories {
        &-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.4rem 1rem;

          h4 {
            margin: 0;
          }

          &-icon {
            font-size: 2em;
          }
        }
        &-list {
          margin-top: 1rem;

          &-category {
            list-style: none outside;
            border-top: 1px solid rgba(0, 0, 0, 0);
            border-bottom: 1px solid rgba(0, 0, 0, 0);
            padding: 0.5rem 1rem;

            &:hover {
              border-top: 1px solid rgba(0, 0, 0, 0.3);
              border-bottom: 1px solid rgba(0, 0, 0, 0.3);
              cursor: pointer;
            }

            &-icon {
              font-size: 1.2em;
              margin-right: 0.5em;
            }
          }
        }
      }
    }

    &-content {
      display: flex;
      flex-direction: column;

      &-products {
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;

        div:not(:last-child) {
          margin-right: 1rem;
        }
      }

      &-popular,
      &-new,
      &-sale {
        margin-top: 2rem;
      }
    }
  }
}
</style>
