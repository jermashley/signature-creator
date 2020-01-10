<template>
  <header>
    <div>
      <Logo />
    </div>

    <div class="flex flex-col items-end justify-start">
      <div v-if="$auth.loggedIn" class="flex flex-row items-center justify-end">
        <a
          href="https://flatworldgs.com"
          target="_blank"
          class="block mr-4 text-base font-medium text-blue-700 hover:text-blue-500"
        >
          FWGS Home
          <FontAwesomeIcon
            class="inline ml-1"
            :icon="[`fad`, `home-alt`]"
            fixed-width
          />
        </a>

        <button
          class="block text-base font-medium text-red-500 hover:text-red-500"
          @click="$auth.logout()"
        >
          Logout
          <FontAwesomeIcon
            class="inline ml-1"
            :icon="[`fad`, `sign-out`]"
            fixed-width
          />
        </button>
      </div>

      <h1 class="text-base font-bold text-right text-gray-700 uppercase">
        Email Signature Creator
      </h1>
    </div>
  </header>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHomeAlt, faSignOut } from '@fortawesome/pro-duotone-svg-icons'

library.add(faHomeAlt, faSignOut)

export default {
  name: `Header`,

  components: {
    Logo: () => import(`~/components/Logo`),
    FontAwesomeIcon: () =>
      import(`@fortawesome/vue-fontawesome`).then(
        ({ FontAwesomeIcon }) => FontAwesomeIcon
      ),
  },
}
</script>

<style lang="scss" scoped>
header {
  @apply w-full max-w-lg mx-auto flex flex-row justify-between items-start;
}
</style>
