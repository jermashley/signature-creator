<template>
  <div
    v-if="download"
    style="max-width: 480px; padding: 24px 16px; font-family: Tahoma, Verdana, Segoe, sans-serif; border: 1px solid #e7e6e4;"
  >
    {{ contactCard.name }}{{ contactCard.name && contactCard.title ? ` | ` : ``
    }}{{ contactCard.title }}
    <br />
    {{ contactCard.company.name
    }}{{
      contactCard.department.name && contactCard.department.enabled
        ? ` | ${contactCard.department.name}`
        : ``
    }}
    <br />
    <br />
    {{
      contactCard.location.name
        ? `T: ${contactCard.location.officeNumber}`
        : ``
    }}{{ numberAfterOffice() ? ` | ` : ``
    }}{{ mobileNumberExists() ? `M: ${contactCard.mobileNumber.number}` : ``
    }}{{ numberAfterMobile() ? ` | ` : ``
    }}{{
      contactCard.location.faxNumber
        ? `F: ${contactCard.location.faxNumber}`
        : ``
    }}
    <br />
    {{
      contactCard.location.name
        ? `${contactCard.location.address.line1}, `
        : ``
    }}{{
      contactCard.location.address.line2
        ? `${contactCard.location.address.line2},`
        : ``
    }}
    {{
      contactCard.location.name ? `${contactCard.location.address.city}, ` : ``
    }}{{
      contactCard.location.name ? `${contactCard.location.address.state} ` : ``
    }}{{ contactCard.location.name ? contactCard.location.address.zip : `` }}
    <br />
    {{ contactCard.company.name ? contactCard.company.website : `` }}
    <br />
    <br />
    {{ disliamerExists ? disclaimer : `` }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: `PlainTextSignatureCard`,

  computed: {
    ...mapGetters({
      contactCard: `contactCard`,
      download: `download`,
    }),

    disclaimer() {
      let disclaimer = this.$store.getters.disclaimer
      disclaimer = disclaimer.replace(/<\/?[^>]+(>|$)/g, ``)

      return this.disliamerExists() ? disclaimer : null
    },
  },

  methods: {
    numberAfterOffice() {
      if (
        (this.contactCard.mobileNumber.number &&
          this.contactCard.mobileNumber.enabled) ||
        this.contactCard.location.faxNumber
      ) {
        return true
      }
    },

    numberAfterMobile() {
      if (
        this.contactCard.location.faxNumber &&
        this.contactCard.mobileNumber.number &&
        this.contactCard.mobileNumber.enabled
      ) {
        return true
      }
    },

    mobileNumberExists() {
      if (
        this.contactCard.mobileNumber.number &&
        this.contactCard.mobileNumber.enabled
      ) {
        return true
      }
    },

    disliamerExists() {
      if (
        this.contactCard.location.name &&
        this.contactCard.company.name !== `Prologue Technology`
      ) {
        return true
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
