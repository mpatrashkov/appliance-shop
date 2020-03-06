<template>
  <CrudPage
    title="Продукти"
    :headers="headers"
    :default-item="defaultItem"
    :actions-col-width="150"
    resource="products"
    @add="add"
    @edit="edit"
    @close="clearState"
  >
    <template v-slot:dialog="{ editedItem }">
      <v-row>
        <v-text-field v-if="basicLoading" loading />
        <v-col v-if="!basicLoading" cols="12">
          <div class="subtitle-1">Основна информация</div>
          <v-text-field v-model="editedItem.name" label="Име" />
          <v-text-field v-model="editedItem.price" type="number" label="Цена" />
          <v-autocomplete
            v-model="selectedBrandId"
            :items="brands"
            label="Марка"
            item-value="id"
            item-text="name"
          />
          <v-autocomplete
            v-if="selectedBrandId !== 0"
            v-model="editedItem.model.id"
            :items="models"
            label="Модел"
            item-value="id"
            item-text="name"
          />
          <v-autocomplete
            v-model="selectedCategoryId"
            :items="categories"
            label="Категория"
            item-value="id"
            item-text="name"
          />
          <v-autocomplete
            v-if="selectedCategoryId !== 0"
            v-model="editedItem.category.id"
            :items="subCategories"
            label="Подкатегория"
            item-value="id"
            item-text="name"
            @change="loadDynamicOptions"
          />
          <v-textarea v-model="editedItem.description" label="Описание" />
        </v-col>
        <v-text-field v-if="dynamicOptionsLoading" loading />
        <v-col
          v-if="
            editedItem.dynamicOptionsValues &&
              editedItem.dynamicOptionsValues.length > 0 &&
              !dynamicOptionsLoading
          "
          cols="12"
        >
          <div class="subtitle-1">Динамични опции</div>
          <!-- <v-text-field
            v-for="dynamicOption in dynamicOptions"
            :key="dynamicOption.id"
            :label="dynamicOption.name"
            :type="dynamicOption.type"
            :suffix="dynamicOption.suffix"
          /> -->
          <v-text-field
            v-for="dynamicOptionValue in editedItem.dynamicOptionsValues"
            :key="dynamicOptionValue.dynamicOption.id"
            v-model="dynamicOptionValue.value"
            :label="dynamicOptionValue.dynamicOption.name"
            :type="dynamicOptionValue.dynamicOption.type"
            :suffix="dynamicOptionValue.dynamicOption.suffix"
          />
        </v-col>
      </v-row>
    </template>
  </CrudPage>
</template>
<script>
import CrudPage from '~/components/CrudPage.vue'

export default {
  layout: 'admin',
  middleware: 'auth',
  components: {
    CrudPage
  },
  data: () => ({
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'Име', value: 'name' },
      { text: 'Цена', value: 'price' },
      { text: 'Марка', value: 'model.brand.name' },
      { text: 'Модел', value: 'model.name' }
    ],
    defaultItem: {
      id: 0,
      name: '',
      price: 0,
      description: '',
      model: {
        id: 0
      },
      category: {
        id: 0
      },
      dynamicOptionsValues: []
    },
    brands: [],
    selectedBrandId: 0,
    categories: [],
    selectedCategoryId: 0,
    dynamicOptions: [],
    basicLoading: false,
    dynamicOptionsLoading: false,
    item: {}
  }),
  computed: {
    models() {
      const brand = this.brands.find(
        (brand) => brand.id === this.selectedBrandId
      )
      return brand ? brand.models : []
    },
    subCategories() {
      const category = this.categories.find(
        (category) => category.id === this.selectedCategoryId
      )
      return category ? category.children : []
    }
  },
  methods: {
    add(item) {
      this.loadData()
      this.item = item
    },
    async edit(item) {
      await this.loadData()
      if (item.category.parent) {
        this.selectedCategoryId = item.category.parent.id
        console.log(item)
        this.loadDynamicOptions(this.selectedCategoryId)
      }
      if (item.model.brand) {
        this.selectedBrandId = item.model.brand.id
      }
      this.item = item
    },
    async loadData() {
      this.basicLoading = true
      this.brands = (await this.$axios.get('/brands')).data
      this.categories = (await this.$axios.get('/categories')).data
      this.basicLoading = false
    },
    async loadDynamicOptions(id) {
      this.dynamicOptionsLoading = true
      this.dynamicOptions = (
        await this.$axios.get(`/categories/${id}?dynamicOptionInfo=true`)
      ).data.dynamicOptions
      this.item.dynamicOptionsValues = this.dynamicOptions.map(
        (dynamicOption) => ({
          value: this.getDynamicOptionValueById(dynamicOption.id),
          dynamicOption
        })
      )
      this.dynamicOptionsLoading = false
    },
    getDynamicOptionValueById(id) {
      const a = this.item.dynamicOptionsValues.find(
        (it) => it.dynamicOption.id === id
      )
      console.log(a)
      return a ? a.value : ''
    },
    clearState() {
      this.dynamicOptions = []
      this.selectedBrandId = 0
      this.selectedCategoryId = 0
    }
  }
}
</script>
