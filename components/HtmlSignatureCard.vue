<template>
  <div
    v-if="contactCard.name"
    ref="HtmlSignatureCard"
    style="max-width: 512px; padding: 24px 16px; border: 1px solid #e7e6e4;"
  >
    <table
      style="max-width: 480px; font-family: Tahoma, Verdana, Segoe, sans-serif; border-collapse: collapse;"
      border="0"
    >
      <tbody>
        <!-- Logo, name, title, department -->
        <tr>
          <td
            :style="{
              borderRight: contactCard.company.name ? `1px solid #e7e6e4` : ``,
              paddingRight: contactCard.company.name ? `32px` : ``,
            }"
          >
            <div
              v-if="contactCard.company.name"
              style="display: inline-block; vertical-align: text-bottom;"
            >
              <img
                :src="contactCard.company.logo"
                alt="Flat World Global Solutions logo"
                style=" width: auto; max-width: 160px; height: 100%; max-height: 70px; margin: 0; padding: 0;"
              />
            </div>
          </td>

          <td
            :style="{
              paddingLeft: contactCard.company.name ? `32px` : ``,
            }"
          >
            <div
              v-if="contactCard.name"
              style=" display: inline-block; margin: 0; padding: 0;"
            >
              <p
                style="margin: 0; padding: 0; font-weight: bold; font-size: 18px; mso-line-height: exactly; line-height: 100%;"
              >
                {{ contactCard.name }}
              </p>
              <p
                style="margin: 0; padding: 0; font-size: 12px; mso-line-height: exactly; line-height: 100%;"
              >
                {{ contactCard.title }}
              </p>

              <p
                style="margin: 0; margin-top: 10px; padding: 0; font-weight: bold; font-size: 12px;"
              >
                {{ contactCard.company.name }}
              </p>

              <p
                v-if="
                  contactCard.department.name &&
                    contactCard.department.enabled &&
                    contactCard.company.name !== `Prologue Technology`
                "
                style="margin: 0; padding: 0; font-weight: bold; font-size: 12px; mso-line-height: exactly; line-height: 100%; text-transform: uppercase; opacity: 0.75;"
              >
                {{ contactCard.department.name }}
              </p>
            </div>
          </td>
        </tr>

        <!-- Phone numbers -->
        <tr v-if="contactCard.location.name">
          <td
            colspan="2"
            style=" max-width: min-content; margin: 0; padding: 0;"
          >
            <p
              v-if="
                contactCard.location.officeNumber ||
                  contactCard.location.faxNumber ||
                  (contactCard.mobileNumber.number &&
                    contactCard.mobileNumber.enabled)
              "
              style="margin: 0; margin-top: 40px; padding: 0; padding-right: 4px; font-weight: normal; font-size: 14px;"
            >
              <span v-if="contactCard.location.officeNumber">
                <strong>T:</strong>
                {{ contactCard.location.officeNumber }}
                {{
                  contactCard.extension.enabled &&
                  contactCard.extension.extension
                    ? contactCard.extension.extension
                    : ``
                }}
              </span>

              <span
                v-if="
                  (contactCard.location.officeNumber &&
                    contactCard.mobileNumber.number &&
                    contactCard.mobileNumber.enabled) ||
                    contactCard.location.faxNumber
                "
              >
                |&nbsp;
              </span>

              <span
                v-if="
                  contactCard.mobileNumber.number &&
                    contactCard.mobileNumber.enabled
                "
              >
                <strong>M:</strong>
                {{ contactCard.mobileNumber.number }}
              </span>

              <span
                v-if="
                  contactCard.location.faxNumber &&
                    contactCard.mobileNumber.number &&
                    contactCard.mobileNumber.enabled
                "
              >
                |&nbsp;
              </span>

              <span v-if="contactCard.location.faxNumber">
                <strong>F:</strong>
                {{ contactCard.location.faxNumber }}
              </span>
            </p>
          </td>
        </tr>

        <!-- Address -->
        <tr v-if="contactCard.location.name">
          <td colspan="2">
            <address
              style="margin: 0; margin-top: 12px; padding: 0; font-size: 14px; font-style: normal;"
            >
              <span>{{ contactCard.location.address.line1 }}</span>
              <span
                v-if="contactCard.location.address.line2"
                style="margin-left: -2px;"
              >
                , {{ contactCard.location.address.line2 }}
              </span>
              {{ contactCard.location.address.city }},
              {{ contactCard.location.address.state }}
              {{ contactCard.location.address.zip }}
            </address>
          </td>
        </tr>

        <!-- Website -->
        <tr v-if="contactCard.company.name">
          <td colspan="2">
            <p
              style="margin-top: 12px; font-size: 14px; mso-line-height: exactly; line-height: 100%;"
            >
              <a
                :href="contactCard.company.website"
                style="color: #2386e2; text-decoration: underline;"
              >
                {{ contactCard.company.website }}
              </a>
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr
          v-if="
            contactCard.location.name &&
              contactCard.company.name !== `Prologue Technology`
          "
        >
          <td colspan="2">
            <hr style="margin-top: 24px;" />
          </td>
        </tr>

        <!-- Disclaimer -->
        <tr
          v-if="
            contactCard.location.name &&
              contactCard.company.name !== `Prologue Technology`
          "
        >
          <td colspan="2">
            <p
              style="margin-top: 24px; font-size: 12px; opacity: 0.85;"
              v-html="disclaimer"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: `HtmlSignatureCard`,

  computed: {
    ...mapGetters({
      contactCard: `contactCard`,
      disclaimer: `disclaimer`,
    }),
  },
}
</script>
