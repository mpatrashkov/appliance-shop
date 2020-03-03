<template>
  <nav class="header px-2 border-bottom">
    <div class="header--logo">
      Logo
    </div>
    <div class="header--search-button">
      <i class="material-icons">search</i>
    </div>
    <div class="header--menu-button pl-4" @click="toggleMenu">
      <i class="material-icons">menu</i>
    </div>
    <div class="header--menu" :class="{ 'header--menu__opened': menuOpened }">
      <div class="header--items">
        <div class="header--item border-bottom p-3">Home</div>
        <div class="header--item border-bottom p-3">Search</div>
        <div class="header--item border-bottom p-3">Buy</div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    menuOpened: false
  }),
  methods: {
    toggleMenu() {
      this.menuOpened = !this.menuOpened
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  & {
    z-index: 1;
    position: fixed;
    height: $header-height;

    top: 0;

    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;

    background: white;

    @include md-up {
      position: static;
    }
  }

  &--logo {
    order: 1;
  }

  &--search-button {
    order: 3;

    display: flex;
    margin-left: auto;
  }

  &--menu-button {
    order: 4;

    display: flex;

    @include md-up {
      display: none;
    }
  }

  &--items {
    display: flex;
    flex-direction: column;

    @include md-up {
      flex-direction: row;
    }
  }

  &--item {
    &:last-child {
      border: none !important;
    }

    @include md-up {
      border: none !important;
    }
  }

  &--menu {
    display: none;
    position: fixed;
    top: $header-height;
    left: 0;

    height: calc(100vh - #{$header-height});
    width: 100%;

    background: white;

    @include md-up {
      order: 2;
      display: block;
      position: static;
      height: auto;
      width: auto;

      margin-left: 2em;
    }

    &__opened {
      display: block;
    }
  }
}
</style>
