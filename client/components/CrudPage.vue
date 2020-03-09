<template>
  <div>
    <div class="headline mb-5">{{ title }}</div>
    <v-data-table
      :headers="headersWithActions"
      :items="items"
      :loading="loading"
      loading-text="Данните се зареждат. Моля изчакайте."
      class="elevation-2"
    >
      <template v-slot:item.actions="{ item }">
        <v-row>
          <v-btn class="ma-1" text icon @click="editItem(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn class="ma-1" text icon @click="deleteItem(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-row>
      </template>
      <template v-slot:item.extra-actions="{ item }">
        <v-row>
          <slot name="extra-actions" :item="item"></slot>
        </v-row>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>
          {{ formTitle }}
        </v-card-title>
        <v-card-text>
          <v-container>
            <slot name="dialog" :editedItem="editedItem"></slot>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Fab @click="addItem" />
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import Fab from '~/components/Fab.vue'

export default {
  name: 'CrudPage',
  components: {
    Fab
  },
  props: {
    actionsColWidth: {
      type: Number,
      default: 0
    },
    headers: Array,
    defaultItem: Object,
    title: String,
    resource: String,
    mapItem: {
      type: Function,
      default: (item) => item
    }
  },
  data: () => ({
    dialog: false,
    dialogMode: 'add',
    editedItem: {},
    items: [],
    loading: false
  }),
  computed: {
    formTitle() {
      return this.dialogMode === 'add' ? 'Нов елемент' : 'Редакция на елемент'
    },
    headersWithActions() {
      const actions = [
        {
          text: 'Действия',
          value: 'actions',
          sortable: false,
          width: '115'
          // align: 'end'
        }
      ]
      if (this.$scopedSlots['extra-actions']) {
        actions.push({
          text: 'Допълнителни действия',
          value: 'extra-actions',
          // align: 'center',
          sortable: false,
          width: this.actionsColWidth
        })
      }
      return [...this.headers, ...actions]
    }
  },
  async mounted() {
    this.loading = true
    this.editedItem = { ...this.defaultItem }
    const id = this.$route.params.id

    if (id) {
      this.items = (
        await this.$axios.get(`/${this.resource}/${id}`)
      ).data.children.map((item) => this.mapItem(item))
    } else {
      this.items = (
        await this.$axios.get(`/${this.resource}`)
      ).data.map((item) => this.mapItem(item))
    }

    this.loading = false
  },
  methods: {
    close() {
      this.dialog = false
      this.$emit('close')
      this.editedItem = {}
    },
    async save() {
      if (this.dialogMode === 'add') {
        const id = this.$route.params.id
        this.editedItem = (
          await this.$axios.post(`/${this.resource}`, {
            ...this.editedItem,
            parentId: id
          })
        ).data
        this.items = [...this.items, { ...this.editedItem }].map((item) =>
          this.mapItem(item)
        )
      } else {
        const index = this.items.indexOf(
          this.items.find((item) => item.id === this.editedItem.id)
        )

        await this.$axios.put(
          `/${this.resource}/${this.editedItem.id}`,
          this.editedItem
        )
        Object.assign(this.items[index], this.mapItem({ ...this.editedItem }))
      }

      this.dialog = false
    },
    async deleteItem(item) {
      if (confirm('Сигурни ли сте че искате да изтриете този елемент?')) {
        await this.$axios.delete(`/${this.resource}/${item.id}`)
        this.items = this.items.filter((it) => it.id !== item.id)
      }
    },
    addItem() {
      this.editedItem = cloneDeep(this.defaultItem)
      this.dialog = true
      this.dialogMode = 'add'
      this.$emit('add', this.editedItem)
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.dialogMode = 'edit'
      this.$emit('edit', this.editedItem)
    },
    setItems(items) {
      this.items = [...items]
    },
    updateItem(item) {}
  }
}
</script>
