import { createStore } from 'vuex'
import * as actions from './actions'

const master = {
  state: {
    home: {
      products: [],
      documents: {},
      meded: [],
      congresses: [],
      news: []
    },
  },
  mutations: {
    setHome (store, homeData) {
      store.home = homeData
    },
  },
  actions,
  getters: {
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
    }
  }
}

export default createStore(master)
