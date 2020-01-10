<template>
  <div></div>
</template>

<script>
export default {
  auth: true,

  created() {
    this.$auth.logout()
  },
}
</script>

<style lang="scss" scoped></style>
