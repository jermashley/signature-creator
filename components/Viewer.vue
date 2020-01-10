<template>
  <section class="relative flex flex-col items-stretch justify-start">
    <span v-if="!contactCard.name" class="flex-grow"></span>
    <transition name="fade">
      <div
        v-if="!contactCard.name"
        class="absolute z-50 flex flex-col items-center justify-center"
        style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
      >
        <EmptyStateGraphic class="max-w-sm mx-auto opacity-50" />

        <h2 class="mt-8 text-xl leading-loose text-center text-gray-600">
          Nothing yet! Add your information in the editor and we'll build your
          email signature.
        </h2>
      </div>
    </transition>

    <div
      v-if="contactCard.name"
      class="flex flex-col items-center justify-center flex-grow"
    >
      <transition name="fade">
        <span
          v-if="contactCard.name"
          class="mb-2 text-sm font-normal text-gray-600 uppercase"
        >
          HTML Signature
        </span>
      </transition>

      <transition name="fade">
        <HtmlSignatureCard
          ref="HtmlSignatureCard"
          :class="{ 'mb-8': download }"
        />
      </transition>

      <transition name="fade">
        <span
          v-if="download"
          class="mb-2 text-sm font-normal text-gray-600 uppercase"
        >
          Plain Text Signature
        </span>
      </transition>

      <transition name="fade">
        <PlainTextSignatureCard ref="PlainTextSignatureCard" />
      </transition>
    </div>

    <div class="flex flex-row items-center justify-center w-full mt-16">
      <button
        :disabled="!download"
        type="button"
        class="px-16 py-3 text-xl font-semibold text-gray-700 uppercase bg-gray-300"
        :class="{ 'opacity-50': !download, 'cursor-not-allowed': !download }"
        @click="downloadFiles"
      >
        <FontAwesomeIcon
          :icon="[`fad`, `download`]"
          fixed-width
          style="color: #ef633b;"
          class="mr-2"
        />
        Download
      </button>
    </div>
  </section>
</template>

<script>
import FileSaver from 'file-saver'
import { mapGetters } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDownload } from '@fortawesome/pro-duotone-svg-icons'

library.add(faDownload)

export default {
  name: `Viewer`,

  components: {
    EmptyStateGraphic: () => import(`~/components/EmptyStateGraphic`),
    HtmlSignatureCard: () => import(`~/components/HtmlSignatureCard`),
    PlainTextSignatureCard: () => import(`~/components/PlainTextSignatureCard`),
    FontAwesomeIcon: () =>
      import(`@fortawesome/vue-fontawesome`).then(
        ({ FontAwesomeIcon }) => FontAwesomeIcon
      ),
  },

  computed: {
    ...mapGetters({
      contactCard: `contactCard`,
      download: `download`,
    }),
  },

  methods: {
    downloadFiles() {
      if (this.download) {
        const htmlSignatureCard = this.$refs.HtmlSignatureCard.$el.innerHTML
        let plainTextSignatureCard = this.$refs.PlainTextSignatureCard.$el
          .innerHTML

        plainTextSignatureCard = plainTextSignatureCard.replace(
          /<br.*?.(.*?)>/g,
          `\r\n`
        )
        plainTextSignatureCard = plainTextSignatureCard.replace(
          /[ \t]{2,}/g,
          ``
        )
        plainTextSignatureCard = plainTextSignatureCard.replace(/&nbsp;/g, ``)

        const htmlBlob = new Blob([htmlSignatureCard], {
          type: `text/plain;charset=utf-8`,
        })
        const textBlob = new Blob([plainTextSignatureCard], {
          type: `text/plain;charset=utf-8`,
        })

        FileSaver.saveAs(htmlBlob, `fwgs_signature.htm`)
        FileSaver.saveAs(textBlob, `fwgs_signature.txt`)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  grid-area: viewer;
  background-color: #f9fafa;

  @apply min-h-screen overflow-y-auto p-8 z-50 shadow-2xl;
}
</style>
