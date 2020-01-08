<template>
  <div class="form-group">
    <label :for="name">{{ label }}</label>

    <div class="input-group">
      <input
        :id="name"
        :type="type"
        :placeholder="placeholder"
        @input="commitInput"
      />

      <div v-if="canToggle" class="toggle" @click="setToggle(), commitToggle()">
        <transition name="fade">
          <FontAwesomeIcon
            v-if="toggle"
            :icon="[`fad`, `toggle-on`]"
            class="text-green-500 toggleIcon"
            fixed-width
          />
        </transition>

        <transition name="fade">
          <FontAwesomeIcon
            v-if="!toggle"
            :icon="[`fad`, `toggle-off`]"
            class="toggleIcon"
            fixed-width
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faToggleOff, faToggleOn } from '@fortawesome/pro-duotone-svg-icons'

library.add(faToggleOff, faToggleOn)

export default {
  name: `TextInput`,

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
    type: {
      type: String,
      default: null,
    },
    placeholder: {
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
    }
  },

  methods: {
    setToggle() {
      this.toggle = !this.toggle
    },

    commitInput(e) {
      this.$store.commit(this.mutation, e.target.value)
    },

    commitToggle() {
      const toggleMutation = this.toggleMutation
      const capitalizedToggleMutation =
        toggleMutation.charAt(0).toUpperCase() + toggleMutation.slice(1)

      console.log(capitalizedToggleMutation)
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

input {
  transition: 250ms ease-in-out;

  @apply text-xl font-normal text-gray-600 w-full px-5 py-3 border border-gray-300 border-solid bg-white flex-grow;

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
  min-width: 62.5px;

  /* Comment to keep stylelint from throwing a fit */
  transition: 250ms ease-in-out;

  @apply w-auto px-5 py-3 text-xl bg-gray-300 flex flex-row justify-center items-center text-gray-600 cursor-pointer;
}

.input-group:focus-within {
  .toggle {
    position: relative;
    transition: 250ms ease-in-out;

    @apply bg-gray-300;
  }

  .toggleIcon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
