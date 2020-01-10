<template>
  <main
    class="flex flex-col items-center justify-center min-h-screen min-w-screen"
    style="background-color: #f9fafa;"
  >
    <div class="flex-grow w-full max-w-6xl p-16">
      <Logo class="max-w-lg mx-auto" />

      <h1 class="mt-24 text-2xl font-bold text-center text-gray-700 uppercase">
        Email Signature Creator
      </h1>

      <p
        v-if="!$auth.loggedIn"
        class="mt-8 text-xl font-normal leading-loose text-center text-gray-700"
      >
        Howdy there! Ready to start making your email signature? First, let's
        verify you really work for FWGS (really, we believe you do, but, you
        know...we don't want just anyone running around with these signatures).
      </p>

      <p
        v-if="!$auth.loggedIn"
        class="mt-4 text-xl font-normal leading-loose text-center text-gray-700"
      >
        Click on the link below to login and get started!
      </p>

      <p
        v-if="$auth.loggedIn"
        class="mt-8 text-xl font-normal leading-loose text-center text-gray-700"
      >
        Howdy there! Click on the link below to get started!
      </p>

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

    <div class="flex flex-col items-center justify-center w-full p-16">
      <button
        v-if="!$auth.loggedIn"
        class="px-16 py-3 text-xl font-semibold text-gray-700 uppercase bg-gray-300 opacity-100 hover:opacity-75"
        @click="$auth.loginWith(`auth0`)"
      >
        <FontAwesomeIcon
          :icon="[`fad`, `sign-in`]"
          fixed-width
          style="color: #ef633b;"
          class="mr-2"
        />
        Log in
      </button>

      <nuxt-link
        v-if="$auth.loggedIn"
        to="/creator"
        class="px-16 py-3 text-xl font-semibold text-gray-700 uppercase bg-gray-300 border-2 border-transparent border-solid opacity-100 hover:opacity-75"
      >
        <FontAwesomeIcon
          :icon="[`fad`, `star`]"
          fixed-width
          style="color: #ef633b;"
          class="mr-2"
        />
        Get started
      </nuxt-link>

      <button
        v-if="$auth.loggedIn"
        class="mt-8 text-base font-normal text-red-500 bg-transparent opacity-100 hover:opacity-75"
        @click="$auth.logout()"
      >
        Log out
        <FontAwesomeIcon
          :icon="[`fad`, `sign-out`]"
          fixed-width
          class="ml-2 color-red-500"
        />
      </button>
    </div>
  </main>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignIn, faSignOut, faStar } from '@fortawesome/pro-duotone-svg-icons'

library.add(faSignIn, faSignOut, faStar)

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
      success: false,
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
      }, 750)
    },

    onLoad() {
      if (this.sortHashedUrl().error) {
        this.error = true
        this.success = false

        const message = decodeURI(this.sortHashedUrl().error_description)
        this.message = `${message} Please try logging in with an approved email address.`

        this.$router.push(`/logout`)
      } else if (this.sortHashedUrl().access_token) {
        this.error = false
        this.success = true
        this.message = `Success! You're logged in.`

        this.redirectToCreator()
      } else {
        // this.error = false
        // this.success = false
        // this.redirectToHome()
        return null
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
