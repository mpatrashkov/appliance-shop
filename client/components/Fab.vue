<template>
  <v-btn bottom color="pink" dark fab fixed right @click="$emit('click')">
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'Fab'
}
</script>
