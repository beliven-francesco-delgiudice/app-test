<template>
  <product-layout
    section="documents"
    :title="updatedProduct.title"
    :productID="updatedProduct.id"
  >
    <accordions-list classes="mt-4 px-8" :list="updatedProduct.documents">
      <template v-slot="{ item }">
        <document-list-item :document="item" />
      </template>
    </accordions-list>
  </product-layout>
</template>
<script>
import AccordionsList from '../AccordionsList.vue'
import DocumentListItem from '../DocumentListItem.vue'
import ProductLayout from './ProductLayout.vue'
export default {
  components: {
    ProductLayout,
    AccordionsList,
    DocumentListItem
  },
  data () {
    return {
      product: {
        id: 1,
        title: 'Delta TT',
        documents: [
          {
            count: 2,
            name: 'Folderino Documentino',
            childs: [
              {
                image: '/assets/test/folder.jpg',
                type: 'folder',
                label: 'Lorem ipsum',
                size: '3.6MB',
                link: 'link'
              },
              {
                image: '/assets/test/file.jpg',
                type: 'file',
                label: 'Lorem ipsum',
                size: '3.6MB',
                link: 'link'
              }
            ]
          },
          {
            image: '/assets/test/folder.jpg',
            type: 'folder',
            label: 'Lorem ipsum',
            size: '3.6MB',
            link: 'link'
          },
          {
            image: '/assets/test/file.jpg',
            type: 'file',
            label: 'Lorem ipsum',
            size: '3.6MB',
            link: 'link'
          }
        ]
      }
    }
  },
  computed: {
    updatedProduct () {
      return this.product
    }
  }
}
</script>
