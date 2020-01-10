<template>
  <main>
    <Editor />
    <Viewer />
  </main>
</template>

<script>
export default {
  components: {
    Editor: () => import(`~/components/Editor`),
    Viewer: () => import(`~/components/Viewer`),
  },
}
</script>

<style lang="scss" scoped>
main {
  display: grid;
  grid-gap: 0;
  grid-template-areas: 'editor' 'viewer';
  grid-template-columns: 1fr;
  align-items: stretch;
  justify-items: stretch;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  @screen lg {
    grid-template-areas: 'editor viewer';
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
