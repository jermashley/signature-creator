<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$auth.loggedIn ? this.$auth.logout() : this.$router.push(`/`)
  },
}
</script>

<style lang="scss" scoped></style>
