<template>
  <div class="h-screen">
    <nuxt />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
body {
  -webkit-font-smoothing: subpixel-antialiased;
  text-rendering: optimizeLegibility;

  @apply w-full h-screen m-0 p-0 font-sans;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 275ms;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
