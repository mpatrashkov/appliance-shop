<template>
  <div class="filters">
    <div class="filters-header">
      <h4 class="filters-header-title">Filters</h4>
      <b-button
        class="filters-header-clear"
        variant="outline-danger"
        @click="clear()"
        >Clear</b-button
      >
    </div>
    <b-form class="filters-content">
      <b-form-group label="Order By:">
        <b-form-select
          v-model="selectedPopularity"
          :options="popularityOptions"
        ></b-form-select>
      </b-form-group>
      <b-form-group label="Type:">
        <b-form-select
          v-model="selectedType"
          :options="typeOptions"
        ></b-form-select>
      </b-form-group>
      <b-form-group label="City:">
        <b-form-select
          v-model="selectedCity"
          :options="cityOptions"
        ></b-form-select>
      </b-form-group>
      <b-form-group label="Price:">
        <b-form-slider
          v-model="range"
          class="filters-content-price-slider"
          :min="min"
          :max="max"
        />
        <div class="filters-content-price-inputs">
          <p>
            From:
            <b-form-input
              v-model.number="range[0]"
              class="filters-content-price-inputs-input"
              type="number"
            ></b-form-input>
          </p>
          <p>
            To:
            <b-form-input
              v-model.number="range[1]"
              class="filters-content-price-inputs-input"
              type="number"
            ></b-form-input>
          </p>
        </div>
      </b-form-group>
      <b-form-group label="State:">
        <b-form-checkbox-group
          v-model="selectedState"
          class="filters-content-state"
        >
          <b-form-checkbox value="new">New</b-form-checkbox>
          <b-form-checkbox value="second-hand">Used</b-form-checkbox>
          <b-form-checkbox value="unpacked">Unpacked</b-form-checkbox>
          <b-form-checkbox value="returned">Returned</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    selectedType: null,
    typeOptions: [
      { value: null, text: 'Choose Type...' },
      { value: 'nqkakvo id', text: 'Mobile Phones' },
      { value: 'nqkakvo drugo id', text: 'Cookers' },
      { value: 'treto id', text: 'Fridges' }
    ],
    selectedCity: null,
    cityOptions: [
      { value: null, text: 'Choose City...' },
      { value: 'nqkakvo id', text: 'Sofia' },
      { value: 'nqkakvo drugo id', text: 'Plovdiv' },
      { value: 'treto id', text: 'Burgas' }
    ],
    selectedPopularity: 'id',
    popularityOptions: [
      { value: 'id', text: 'Newest' },
      { value: 'nqkakvo id', text: 'Oldest' },
      { value: 'nqkakvo drugo id', text: 'Highest Rating' },
      { value: 'treto id', text: 'Most Visited' }
    ],
    range: [0, 10000],
    min: 0,
    max: 10000,
    selectedState: ['new', 'second-hand', 'returned', 'unpacked']
  }),
  methods: {
    clear() {
      this.range = [0, 10000]
      this.selectedType = null
      this.selectedCity = null
      this.selectedPopularity = 'id'
      this.selectedState = ['new', 'second-hand', 'returned', 'unpacked']
    }
  }
}
</script>

<style lang="scss"></style>
<style lang="scss" scoped>
.filters {
  display: none;
}

@include md-up {
  .filters {
    display: block;
    width: 25%;

    &-header {
      display: flex;
      justify-content: space-between;
      background: $secondary-pale-color;
      align-items: center;
      padding: 0.5rem 1rem;
      border-top-right-radius: $small-border-radius;
      border-top-left-radius: $small-border-radius;

      &-title {
        margin: 0;
      }
    }

    &-content {
      padding: 1rem;
      background: $primary-pale-color;
      border-bottom-right-radius: $small-border-radius;
      border-bottom-left-radius: $small-border-radius;

      &-state {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 0.5rem;
      }

      p:first-child {
        margin-right: 0.5rem;
      }

      &-price {
        &-inputs {
          display: flex;
          justify-content: right;

          &-input {
            width: 100%;
          }
        }

        &-slider {
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>
