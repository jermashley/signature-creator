<template>
  <main
    class="flex flex-col items-center justify-center min-h-screen min-w-screen"
    style="background-color: #f9fafa;"
  >
    <div class="flex-grow w-full max-w-6xl p-16">
      <Logo class="max-w-lg mx-auto" />

      <h1 class="mt-24 text-2xl font-normal text-center text-gray-700">
        Redirecting to login...see you shortly!
      </h1>
    </div>
  </main>
</template>

<script>
export default {
  auth: false,

  components: {
    Logo: () => import(`~/components/Logo`),
  },

  created() {
    this.$auth.loggedIn
      ? this.$router.push(`/creator`)
      : this.$auth.loginWith(`auth0`)
  },
}
</script>

<style lang="scss" scoped></style>
