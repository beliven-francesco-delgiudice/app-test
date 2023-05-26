import urls from '@/urls'
import messages from '@/messages'

export async function getHome (context) {
  let products = []
  let congresses = []
  let news = []
  const documents = {
    my: [],
    shared: []
  }

  try {
    // get products
    const prod = await this.$app.$http({
      method: 'GET',
      url: urls.products.segments,
      params: {},
      loader: false
    })

    if (prod && prod.categories) {
      products = prod.categories
    }

    // get congresses
    const congressesList = await this.$app.$http({
      method: 'GET',
      url: urls.congresses.home,
      params: {},
      loader: false
    })
    congresses = congressesList

    // get news
    const newsList = await this.$app.$http({
      method: 'GET',
      url: urls.news.home,
      params: {},
      loader: false
    })
    news = newsList

    // get documents
    const documentsMy = await this.$app.$http({
      method: 'GET',
      url: urls.documents.list_my,
      params: {},
      loader: false
    })
    documents.my = documentsMy.list

    const documentsShared = await this.$app.$http({
      method: 'GET',
      url: urls.documents.list_shared,
      params: {},
      loader: false
    })
    documents.shared = documentsShared.list

    const documentsUS = await this.$app.$http({
      method: 'GET',
      url: urls.documents.list_us,
      params: {},
      loader: false
    })
    documents.us = documentsUS.list
  } catch (e) {
    this.$app.$toast({
      message: messages.errors.home,
      color: 'danger'
    })
  }

  const homeObject = {
    products,
    congresses,
    news,
    documents: {
      my: documents.my.slice(0, 3),
      shared: documents.shared.slice(0, 3),
      us: documents.us.slice(0, 3)
    }
  }

  context.commit('setHome', homeObject)
}
