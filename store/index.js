export const state = () => ({
  contactCard: {
    // logo: false,
    name: null,
    title: null,
    company: {
      name: null,
      website: null,
    },
    department: {
      name: null,
      enabled: true,
    },
    location: {
      name: null,
      company: null,
      officeNumber: null,
      faxNumber: null,
      address: {
        line1: null,
        line2: null,
        city: null,
        state: null,
        zip: null,
      },
    },
    mobileNumber: {
      number: null,
      enabled: true,
    },
    dislaimer: true,
  },

  companies: [
    {
      name: `Flat World Global Solutions`,
      website: `www.flatworldgs.com`,
      logo: `https://fwholdingsblog.s3.amazonaws.com/fwgs-logo.png`,
    },
    {
      name: `Prologue Technology`,
      website: `www.prologuetechnology.com`,
      logo: `https://fwholdingsblog.s3.amazonaws.com/prologue-full-logo.png`,
    },
  ],

  locations: [
    {
      name: `Headquarters`,
      company: `Flat World Global Solutions`,
      officeNumber: `(636) 265-1460`,
      faxNumber: `(636) 265-1460`,
      address: {
        line1: `2342 Technology Drive`,
        line2: `Suite 310`,
        city: `O'Fallon`,
        state: `MO`,
        zip: `63386`,
      },
    },
    {
      name: `Prologue Technology`,
      company: `Prologue Technology`,
      officeNumber: `(636) 265-1460`,
      faxNumber: ``,
      address: {
        line1: `2342 Technology Drive`,
        line2: `Suite 325`,
        city: `O'Fallon`,
        state: `MO`,
        zip: `63386`,
      },
    },
    {
      name: `International - Saint Louis`,
      company: `Flat World Global Solutions`,
      officeNumber: `(636) 265-1460`,
      faxNumber: `(636) 265-1460`,
      address: {
        line1: `8949 Frost Ave`,
        line2: ``,
        city: `Berkeley`,
        state: `MO`,
        zip: `63134`,
      },
    },
    {
      name: `International - Chicago`,
      company: `Flat World Global Solutions`,
      officeNumber: `(636) 265-1460`,
      faxNumber: `(636) 265-1460`,
      address: {
        line1: `1300 N. Michael Drive`,
        line2: `Unit C`,
        city: `Wood Dale`,
        state: `IL`,
        zip: `60191`,
      },
    },
    {
      name: `International - Dallas`,
      company: `Flat World Global Solutions`,
      officeNumber: `(636) 265-1460`,
      faxNumber: `(636) 265-1460`,
      address: {
        line1: `2370 W Airfield Drive`,
        line2: `Suite 100`,
        city: `DFW Airport`,
        state: `TX`,
        zip: `75261`,
      },
    },
    {
      name: `International - Atlanta`,
      company: `Flat World Global Solutions`,
      officeNumber: `(636) 265-1460`,
      faxNumber: `(636) 265-1460`,
      address: {
        line1: `3000 Centre Parkway`,
        line2: `Suite 200`,
        city: `East Point`,
        state: `GA`,
        zip: `30344`,
      },
    },
  ],

  departments: [
    {
      company: `Flat World Global Solutions`,
      departments: [
        `Supply Chain`,
        `International`,
        `Project Management`,
        `Audit`,
        `Claims`,
      ],
    },
    {
      company: `Prologue Technology`,
      departments: [],
    },
  ],

  disclaimer: `Please be informed that all services and transactions performed by Flat World Global Solutions are governed by our standard <a href="https://flatworldgs.com/" style="color: #2386e2; text-decoration: underline;">Terms & Conditions</a>. Thank you for your support!`,

  emptyLocation: {
    name: null,
    company: null,
    officeNumber: null,
    faxNumber: null,
    address: {
      line1: null,
      line2: null,
      city: null,
      state: null,
      zip: null,
    },
  },

  download: false,
})

export const getters = {
  contactCard: (state) => {
    return state.contactCard
  },

  contactCompany: (state) => {
    return state.contactCard.company.name
  },

  companies: (state) => {
    return state.companies
  },

  locations: (state) => {
    return async (company) => {
      const locations = await state.locations.filter(
        (location) => location.company === company
      )

      return locations
    }
  },

  departments(state) {
    return async (company) => {
      const departments = await state.departments.find(
        (department) => department.company === company
      )

      return departments
    }
  },

  disclaimer: (state) => {
    return state.disclaimer
  },

  download: (state) => {
    return state.download
  },
}

export const mutations = {
  name(state, name) {
    state.contactCard.name = name
  },

  title(state, title) {
    state.contactCard.title = title
  },

  company(state, companyName) {
    state.contactCard.company = state.companies.find(
      (company) => company.name === companyName
    )
  },

  department(state, department) {
    state.contactCard.department.name = department
  },

  toggleDepartment(state) {
    state.contactCard.department.enabled = !state.contactCard.department.enabled
  },

  location(state, locationName) {
    state.contactCard.location = state.locations.find(
      (location) => location.name === locationName
    )
  },

  resetLocation(state) {
    state.contactCard.location = state.emptyLocation
  },

  mobileNumber(state, mobileNumber) {
    state.contactCard.mobileNumber.number = mobileNumber
  },

  toggleMobileNumber(state) {
    state.contactCard.mobileNumber.enabled = !state.contactCard.mobileNumber
      .enabled
  },

  disclaimer(state) {
    state.disclaimer = !state.disclaimer
  },

  toggleDownload(state, bool) {
    state.download = bool
  },
}
