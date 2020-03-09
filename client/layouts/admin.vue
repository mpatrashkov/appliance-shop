<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <nuxt-link :key="item.text" :to="'/admin/' + item.link">
            <v-list-item link>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </nuxt-link>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Admin Panel</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      {
        icon: 'mdi-shape',
        text: 'Категории',
        link: 'categories/'
      },
      {
        icon: 'mdi-cogs',
        text: 'Динамични опции',
        link: 'attributes/'
      },
      {
        icon: 'mdi-domain',
        text: 'Марки',
        link: 'brands/'
      },
      {
        icon: 'mdi-tag',
        text: 'Продукти',
        link: 'products/'
      }
    ]
  })
}
</script>
