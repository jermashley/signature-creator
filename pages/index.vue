<template>
  <main
    class="flex flex-col items-center justify-center min-h-screen min-w-screen"
    style="background-color: #f9fafa;"
  >
    <div class="flex-grow w-full max-w-6xl p-16">
      <Logo class="max-w-lg mx-auto" />

      <h1 class="mt-24 text-2xl font-bold text-center text-gray-700 uppercase">
        Email Signature Creator
      </h1>

      <p
        v-if="!$auth.loggedIn"
        class="mt-8 text-xl font-normal leading-loose text-center text-gray-700"
      >
        Howdy there! Ready to start making your email signature? First, let's
        verify you really work for FWGS (really, we believe you do, but, you
        know...we don't want just anyone running around with these signatures).
      </p>

      <p
        v-if="!$auth.loggedIn"
        class="mt-4 text-xl font-normal leading-loose text-center text-gray-700"
      >
        Click on the link below to login and get started!
      </p>

      <p
        v-if="$auth.loggedIn"
        class="mt-8 text-xl font-normal leading-loose text-center text-gray-700"
      >
        Howdy there! Looks like you're already logged in.
      </p>

      <p
        v-if="$auth.loggedIn"
        class="mt-4 text-xl font-normal leading-loose text-center text-gray-700"
      >
        Click on the link below to get started!
      </p>
    </div>

    <div class="flex flex-col items-center justify-center w-full p-16">
      <nuxt-link
        v-if="!$auth.loggedIn"
        to="/login"
        class="px-16 py-3 text-xl font-semibold text-gray-700 uppercase bg-gray-300 opacity-100 hover:opacity-75"
      >
        <FontAwesomeIcon
          :icon="[`fad`, `sign-in`]"
          fixed-width
          style="color: #ef633b;"
          class="mr-2"
        />
        Log in
      </nuxt-link>

      <nuxt-link
        v-if="$auth.loggedIn"
        to="/creator"
        class="px-16 py-3 text-xl font-semibold text-gray-700 uppercase bg-gray-300 border-2 border-transparent border-solid opacity-100 hover:opacity-75"
      >
        <FontAwesomeIcon
          :icon="[`fad`, `star`]"
          fixed-width
          style="color: #ef633b;"
          class="mr-2"
        />
        Get started
      </nuxt-link>

      <nuxt-link
        v-if="$auth.loggedIn"
        class="mt-8 text-base font-normal text-red-500 bg-transparent opacity-100 hover:opacity-75"
        to="logout"
      >
        Log out
        <FontAwesomeIcon
          :icon="[`fad`, `sign-out`]"
          fixed-width
          class="ml-2 color-red-500"
        />
      </nuxt-link>
    </div>
  </main>
</template>

<script>
export default {
  auth: `guest`,

  components: {
    Logo: () => import(`~/components/Logo`),
    FontAwesomeIcon: () =>
      import(`@fortawesome/vue-fontawesome`).then(
        ({ FontAwesomeIcon }) => FontAwesomeIcon
      ),
  },
}
</script>

<style lang="scss" scoped></style>
