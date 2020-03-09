<template>
  <CrudPage
    title="Динамични опции"
    :headers="headers"
    :default-item="defaultItem"
    :actions-col-width="0"
    resource="dynamicOptions"
    :map-item="mapItem"
  >
    <template v-slot:dialog="{ editedItem }">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="editedItem.name" label="Име" />
          <v-text-field v-model="editedItem.suffix" label="Наставка" />
          <v-select
            v-model="editedItem.type"
            :items="typeOptions"
            item-text="name"
            label="Тип"
          ></v-select>
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
      { text: 'Наставка', value: 'suffix' },
      { text: 'Тип', value: 'displayType' }
    ],
    defaultItem: {
      id: 0,
      name: '',
      suffix: '',
      type: 'text'
    }
  }),
  computed: {
    typeOptions() {
      return [
        {
          name: this.getTypeText('text'),
          value: 'text'
        },
        {
          name: this.getTypeText('number'),
          value: 'number'
        }
      ]
    }
  },
  methods: {
    mapItem({ id, name, suffix, type }) {
      return {
        id,
        name,
        suffix: suffix || 'Без наставка',
        type,
        displayType: this.getTypeText(type)
      }
    },
    getTypeText(type) {
      if (type === 'text') return 'Текст'
      if (type === 'number') return 'Число'
    }
  }
}
</script>
