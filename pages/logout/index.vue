<template>
  <div></div>
</template>

<script>
export default {
  auth: true,

  asyncData(context) {
    const { baseUrl, auth0Domain } = context.env
    return { baseUrl, auth0Domain }
  },

  mounted() {
    this.$auth.logout()
  },
}
</script>

<style lang="scss" scoped></style>
