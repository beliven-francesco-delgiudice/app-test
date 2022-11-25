import { createStore } from 'vuex'
import * as actions from './actions'
import conf from '@/config'

const userData = window.localStorage.getItem('userData')

const master = {
  state: {
    user: {
      data: userData ? JSON.parse(userData) : {},
      types: [],
      notificationsAllowed: 'unknown'
    },
    home: {
      products: [],
      documents: {},
      meded: [],
      congresses: [],
      news: []
    },
    messages: [],
    documents: {},
    launchUrl: null,
    notifications: [],
    appUpdates: null,
    onboarding: null,
    isModalOpen: false,
    notificationToShow: null,
    need_accept_terms: null
  },
  mutations: {
    setUserData (store, userData) {
      if (userData === false || userData === undefined) {
        window.localStorage.removeItem('userData')
        store.user.data = {}
        return
      }

      // Prevent override of the team id attribute
      if (userData.teams && userData.teams.constructor === String) {
        userData.teamsId = userData.teams
        delete userData.teams
      }

      // Append user data to existent informations
      store.user.data = {
        ...store.user.data,
        ...userData
      }

      window.localStorage.setItem('userData', JSON.stringify(store.user.data))
    },

    setMessages (store, messages) {
      store.messages.list = messages
    },

    setNotifications (store, notifications) {
      store.notifications = notifications
    },

    setNotificationToShow (store, path) {
      store.notificationToShow = path
    },

    setOnboarding (store, needOnboarding) {
      store.onboarding = needOnboarding
    },

    setNeedToAcceptTerms (store, needToAcceptTerms) {
      store.need_accept_terms = needToAcceptTerms
    },

    setAppUpdates (store, appUpdates) {
      store.appUpdates = appUpdates
    },

    setHome (store, homeData) {
      store.home = homeData
    },

    setDocuments (store, docs) {
      store.documents = docs
    },

    setModalOpen (store, flag) {
      store.isModalOpen = flag
    },

    setLaunchUrl (store, url) {
      store.launchUrl = url
    },

    // Android does not need any check for notifications, are allowed by default
    // On iOS platform the notifications must be confirmed by the user before any usage
    setNotificationsAllowState (store, subscriptionData) {
      let confirmed = 'no'

      const hasPermissions =
        subscriptionData &&
        subscriptionData.hasPrompted === true &&
        (subscriptionData.status > 1 || subscriptionData.state > 1)

      if (
        (this.$app.$device.getPlatform('ios') && hasPermissions) ||
        this.$app.$device.getPlatform('android')
      ) {
        confirmed = 'yes'
      }

      store.user.notificationsAllowed = confirmed
    }
  },
  actions,
  getters: {
    notifError: state => state.user.notificationsAllowed === 'no',
    loggedIn: state => !!Object.keys(state.user.data).length || false,
    messages: state => state.messages.list || [],
    roundId: state => state.rounds.id,
    userData: state => {
      const data = { ...state.user.data } || {}

      for (const key in data) {
        if (conf.userDataBlacklist.includes(key)) delete data[key]
      }

      return data
    },
    needToAcceptTerms: state =>
      state.need_accept_terms || state.need_accept_terms === undefined,
    needOnboarding: state => state.onboarding,
    gotNotifications: state => {
      return state.notifications
    },
    showUS: state =>
      (!!Object.keys(state.user.data).length &&
        state.user.data.certificate === 'US') ||
      false,
    areNotificationsNotRead: state => {
      let notRead = 0
      if (state.notifications && state.notifications.length) {
        for (let i = 0; i < state.notifications.length; i++) {
          if (state.notifications[i] && !state.notifications[i].read) {
            notRead += 1
          }
        }
      }
      return notRead
    },
    gotUpdatesToShow: state => {
      return state.appUpdates
    },
    gotNotificationToShow: state => {
      return state.notificationToShow
    },
    homeData: state =>
      state.home || {
        products: [],
        documents: {},
        meded: [],
        congresses: [],
        news: []
      },
    homeProducts: state => {
      if (state && state.home && state.home.products) {
        return state.home.products
      }
      return []
    },
    homeCongresses: state => {
      if (state && state.home && state.home.congresses) {
        return state.home.congresses
      }
      return []
    },
    homeNews: state => {
      if (state && state.home && state.home.news) {
        return state.home.news
      }
      return []
    },
    homeDocuments: state => {
      if (state && state.home && state.home.documents) {
        return state.home.documents
      }
      return {
        my: [],
        shared: [],
        us: []
      }
    },
    documents: state => {
      if (state && state.documents) {
        return state.documents
      }
      return []
    },
    username: state => state.user.data.username || '',
    userTypes: state => state.user.types || [],

    formattedLaunchUrl: state => {
      if (state.launchUrl) {
        if (state.launchUrl.includes('limasales')) {
          return state.launchUrl.split('limasales:/')[1]
        }
        return state.launchUrl
      }
      return null
    }
  }
}

export default createStore(master)
