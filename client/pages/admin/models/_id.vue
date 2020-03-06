<template>
  <CrudPage
    title="Модели"
    :headers="headers"
    :default-item="defaultItem"
    :actions-col-width="150"
    resource="models"
  >
    <template v-slot:dialog="{ editedItem }">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="editedItem.name" label="Име" />
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
      name: ''
    }
  })
}
</script>
