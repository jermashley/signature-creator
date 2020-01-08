<template>
  <div class="h-screen">
    <nuxt />
  </div>
</template>

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
</style>
