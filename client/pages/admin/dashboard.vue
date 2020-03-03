<template>
  <div>Hello admin!</div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'auth'
}
</script>
