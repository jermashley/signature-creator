<template>
  <main
    class="flex flex-col items-center justify-center min-h-screen min-w-screen"
    style="background-color: #f9fafa;"
  >
    <div class="flex-grow w-full max-w-6xl p-16">
      <Logo class="max-w-lg mx-auto" />

      <h1 class="mt-24 text-2xl font-normal text-center text-gray-700">
        {{ message }}
      </h1>

      <div v-if="error" class="flex flex-col items-center justify-center mt-4">
        <p class="text-base font-normal text-center text-red-600">
          Approved email domains:
          <code class="font-mono text-sm font-normal">
            <span v-for="(domain, index) in approvedEmailDomains" :key="domain">
              {{ domain
              }}{{ index !== approvedEmailDomains.length - 1 ? `,` : `.` }}
            </span>
          </code>
        </p>
      </div>
    </div>

    <div
      v-if="error"
      class="flex flex-col items-center justify-center w-full p-16"
    >
      <nuxt-link
        to="/"
        class="px-16 py-3 mt-20 text-xl font-semibold text-gray-700 uppercase bg-gray-300 border-2 border-transparent border-solid opacity-100 hover:opacity-75"
      >
        <FontAwesomeIcon
          :icon="[`fad`, `home`]"
          fixed-width
          style="color: #ef633b;"
          class="mr-2"
        />
        Return Home
      </nuxt-link>
    </div>
  </main>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome } from '@fortawesome/pro-duotone-svg-icons'

library.add(faHome)

export default {
  auth: `guest`,

  components: {
    Logo: () => import(`~/components/Logo`),
    FontAwesomeIcon: () =>
      import(`@fortawesome/vue-fontawesome`).then(
        ({ FontAwesomeIcon }) => FontAwesomeIcon
      ),
  },

  data() {
    return {
      message: `Redirecting to login...see you shortly!`,
      error: false,
      approvedEmailDomains: [
        `@flatworldgs.com`,
        `@flatworldsc.com`,
        `@ram-intl.com`,
        `@ramcrating.com`,
        `@prologuetechnology.com`,
      ],
    }
  },

  created() {
    this.onLoad()
  },

  methods: {
    sortHashedUrl() {
      // Create empty object
      let response = {}

      // Get hash from URL
      let hash = this.$route.hash

      if (hash.length) {
        // Trim hashbang off of URL
        hash = hash.slice(1)

        // Create array out of hash parts at each '&'
        const fragments = hash.split(`&`)

        // Loop through hash array and add key/value pairs to empty object
        fragments.forEach((fragment) => {
          const array = fragment.split(`=`)

          response = {
            [array[0]]: array[1],
            ...response,
          }
          return response
        })

        return response
      } else {
        console.log(`No hash, returning false.`)
        return false
      }
    },

    redirectToLogin() {
      setTimeout(() => {
        this.$auth.loginWith(`auth0`)
      }, 1500)
    },

    redirectToHome() {
      setTimeout(() => {
        this.$router.replace({ path: `/` })
      }, 10000)
    },

    redirectToCreator() {
      setTimeout(() => {
        window.location = `/creator`
      }, 1000)
    },

    onLoad() {
      console.log(this.sortHashedUrl())
      if (this.sortHashedUrl() === false) {
        console.log(`Heading to login page.`)
        this.error = false
        this.redirectToLogin()
      } else if (this.sortHashedUrl().error) {
        console.log(this.sortHashedUrl().error)
        this.error = true

        const message = decodeURI(this.sortHashedUrl().error_description)
        this.message = `${message} Please try logging in with an approved email address.`

        this.$auth.logout().then(() => this.redirectToHome())
      } else if (this.sortHashedUrl().access_token) {
        console.log(this.sortHashedUrl().access_token)
        this.error = false
        this.message = `Success! You're logged in. Let's get to making that signature.`

        this.redirectToCreator()
      } else {
        this.error = false
        this.redirectToHome()
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
