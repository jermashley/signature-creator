<template>
  <section>
    <Header />

    <p class="max-w-lg mx-auto mt-12 text-gray-700">
      Enter your information below and select the items you would like to appear
      in your signature. Once you have finished, download your signature pack.
      Then,
      <a
        href="https://youtu.be/RSKTcdo3_4s"
        target="_blank"
        class="leading-loose text-blue-700 underline hover:text-blue-500"
      >
        learn how to add your new signature
      </a>
      to Outlook.
    </p>

    <form @submit.prevent="">
      <TextInput
        name="name"
        label="Name"
        type="text"
        placeholder="Jane Doe"
        mutation="name"
      />

      <transition name="fade">
        <TextInput
          v-if="contactCard.name"
          name="title"
          label="Title"
          type="text"
          placeholder="Logistics Specialist"
          mutation="title"
        />
      </transition>

      <transition name="fade">
        <CompanySelect
          v-if="contactCard.title"
          name="company"
          label="Company"
        />
      </transition>

      <transition name="fade">
        <DepartmentSelect
          v-show="contactCompany && contactCompany !== `Prologue Technology`"
          name="department"
          label="Department"
          mutation="department"
          :can-toggle="true"
          toggle-mutation="department"
        />
      </transition>

      <transition name="fade">
        <LocationSelect
          v-show="contactCompany"
          name="location"
          label="Location"
          mutation="location"
          @location-chosen="toggleDownload"
        />
      </transition>

      <transition name="fade">
        <TextInput
          v-if="contactCard.company.officePhone"
          name="extension"
          label="extension"
          type="text"
          placeholder="123"
          mutation="extension"
          :can-toggle="true"
          toggle-mutation="extension"
        />
      </transition>

      <transition name="fade">
        <TextInput
          v-if="contactCard.company.name || contactCard.mobilePhone"
          name="mobileNumber"
          label="mobile number"
          type="tel"
          placeholder="(123) 456-7890"
          mutation="mobileNumber"
          :can-toggle="true"
          toggle-mutation="mobileNumber"
        />
      </transition>
    </form>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: `Editor`,

  components: {
    Header: () => import(`~/components/Header`),
    TextInput: () => import(`~/components/TextInput`),
    CompanySelect: () => import(`~/components/CompanySelect`),
    LocationSelect: () => import(`~/components/LocationSelect`),
    DepartmentSelect: () => import(`~/components/DepartmentSelect`),
  },

  computed: {
    ...mapGetters({
      companies: `companies`,
      contactCard: `contactCard`,
      contactCompany: `contactCompany`,
    }),

    locations() {
      return this.$store.getters.locations(this.selectedCompany)
    },
  },

  methods: {
    setCompany(value) {
      this.selectedCompany = value
    },

    toggleDownload(value) {
      this.$store.commit(`toggleDownload`, value)
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  grid-area: editor;

  @apply min-h-screen overflow-y-auto p-8;
}

form {
  @apply mt-12 max-w-lg mx-auto;

  & > *:not(:first-child) {
    @apply mt-5;
  }
}
</style>
