<template>
  <CrudPage
    title="Категории"
    :headers="headers"
    :default-item="defaultItem"
    :actions-col-width="220"
    resource="categories"
    @add="loadDynamicOptions"
    @edit="loadDynamicOptions"
  >
    <template v-slot:extra-actions="{ item }">
      <nuxt-link :to="'/admin/categories/' + item.id">
        <v-btn class="ma-2" raised color="primary">
          Подкатегории
        </v-btn>
      </nuxt-link>
    </template>
    <template v-slot:dialog="{ editedItem }">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="editedItem.name" label="Име" />
        </v-col>
        <v-col cols="12">
          <v-text-field v-if="loading" loading />
        </v-col>
        <v-col
          v-for="(dynamicOption, index) in dynamicOptions"
          :key="index"
          cols="4"
        >
          <v-checkbox
            v-model="editedItem.dynamicOptions"
            dense
            :label="dynamicOption.name"
            :value="dynamicOption.id"
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
      { text: 'Име', value: 'name' }
    ],
    defaultItem: {
      id: 0,
      name: '',
      dynamicOptions: []
    },
    dynamicOptions: [],
    loading: false
  }),
  methods: {
    async loadDynamicOptions() {
      this.loading = true
      this.dynamicOptions = (await this.$axios.get('/dynamicOptions')).data
      this.loading = false
    }
  }
}
</script>
