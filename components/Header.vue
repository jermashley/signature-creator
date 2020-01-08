<template>
  <header>
    <div>
      <Logo />
    </div>

    <div class="flex flex-col items-end justify-start">
      <a
        href="https://flatworldgs.com"
        target="_blank"
        class="text-base font-medium text-blue-700 hover:text-blue-500"
      >
        FWGS Home
        <FontAwesomeIcon
          class="ml-2"
          :icon="[`fad`, `long-arrow-right`]"
          fixed-width
        />
      </a>

      <h1 class="text-base font-bold text-right text-gray-700 uppercase">
        Email Signature Creator
      </h1>
    </div>
  </header>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLongArrowRight } from '@fortawesome/pro-duotone-svg-icons'

library.add(faLongArrowRight)

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
