<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>

    <div class="relative input-group">
      <div class="relative flex-grow w-full">
        <select :id="name" :name="name" @change="commitSelection">
          <option selected disabled>Choose one</option>
          <option
            v-for="department in filteredDepartments"
            :key="department"
            :value="department"
          >
            {{ department }}
          </option>
        </select>

        <div
          class="absolute inset-y-0 right-0 flex flex-col items-center justify-center inline mr-5 pointer-events-none"
        >
          <svg
            width="11"
            height="7"
            viewBox="0 0 11 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.64844 6.27344C5.84375 6.46875 6.11719 6.46875 6.3125 6.27344L10.8438 1.70312C11.0391 1.50781 11.0391 1.19531 10.8438 1.03906L10.5703 0.765625C10.375 0.570312 10.1016 0.570312 9.90625 0.765625L6 4.75L2.05469 0.726562C1.85938 0.570312 1.58594 0.570312 1.39062 0.726562L1.11719 1.03906C0.921875 1.19531 0.921875 1.50781 1.11719 1.70312L5.64844 6.27344Z"
              fill="#8F9BA3"
            />
          </svg>
        </div>
      </div>

      <div
        v-if="canToggle"
        class="toggle"
        @click="
          setToggle()
          commitToggle()
        "
      >
        <transition name="fade">
          <span
            class="text-green-500 toggleIcon"
            style=" z-index: 50; display: block;"
          >
            <FontAwesomeIcon
              v-if="toggle"
              :icon="[`fad`, `toggle-on`]"
              fixed-width
            />
          </span>
        </transition>

        <transition name="fade">
          <span class="toggleIcon" style=" z-index: 40; display: block;">
            <FontAwesomeIcon
              v-if="!toggle"
              :icon="[`fad`, `toggle-off`]"
              fixed-width
            />
          </span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faToggleOff, faToggleOn } from '@fortawesome/pro-duotone-svg-icons'

library.add(faToggleOff, faToggleOn)

export default {
  name: `DepartmentSelect`,

  components: {
    FontAwesomeIcon: () =>
      import(`@fortawesome/vue-fontawesome`).then(
        ({ FontAwesomeIcon }) => FontAwesomeIcon
      ),
  },

  props: {
    name: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    mutation: {
      type: String,
      default: null,
    },
    canToggle: {
      type: Boolean,
      default: false,
    },
    toggleMutation: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      toggle: true,
      filteredDepartments: null,
    }
  },

  computed: {
    ...mapGetters({
      contactCompany: `contactCompany`,
    }),

    departments() {
      return this.$store.getters.departments(this.contactCompany)
    },
  },

  watch: {
    departments(promise) {
      promise.then((res) => (this.filteredDepartments = res.departments))
    },
  },

  methods: {
    setToggle() {
      this.toggle = !this.toggle
    },

    commitSelection(e) {
      this.$store.commit(this.mutation, e.target.value)
    },

    commitToggle() {
      const toggleMutation = this.toggleMutation
      const capitalizedToggleMutation =
        toggleMutation.charAt(0).toUpperCase() + toggleMutation.slice(1)

      this.$store.commit(`toggle${capitalizedToggleMutation}`)
    },
  },
}
</script>

<style lang="scss" scoped>
.form-group {
  @apply flex flex-col items-start justify-start w-full h-auto;
}

label {
  @apply uppercase font-semibold text-gray-800 text-sm mb-2;
}

.input-group {
  @apply flex flex-row justify-start items-stretch w-full m-0 p-0;
}

select {
  transition: 250ms ease-in-out;

  /* Comment to keep stylelint from going bonkers */
  -webkit-appearance: none;

  @apply w-full h-full text-xl font-normal text-gray-600 px-5 py-3 border border-gray-300 border-solid rounded-none bg-white;

  &::placeholder {
    @apply text-xl font-normal text-gray-500;
  }

  &:hover {
    transition: 250ms ease-in-out;

    @apply border-gray-400;
  }

  &:focus {
    transition: 250ms ease-in-out;

    @apply outline-none bg-gray-100 border-gray-300;
  }
}

.toggle {
  position: relative;
  min-width: 62.5px;

  /* Comment to keep stylelint from throwing a fit */
  transition: 250ms ease-in-out;

  @apply w-auto px-5 py-3 text-xl bg-gray-300 flex flex-row justify-center items-center text-gray-600 cursor-pointer;
}

.toggleIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.input-group:focus-within {
  .toggle {
    transition: 250ms ease-in-out;

    @apply bg-gray-300;
  }
}
</style>
