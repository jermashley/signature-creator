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
    // const baseUrl = encodeURIComponent(this.baseUrl)
    // const logoutUrl = `https://${this.auth0Domain}/v2/logout?returnTo=${baseUrl}`
    this.$auth.logout()
  },
}
</script>

<style lang="scss" scoped></style>
