<template>
  <div ref="viewer"></div>
</template>

<script>
/* eslint-disable */
import WebViewer from '@pdftron/pdfjs-express-viewer';

export default {
  name: 'WebViewer',
  props: {
    src: String,
  },
  mounted: function () {
    WebViewer(
      {
        path: 'lib',
        initialDoc: this.src,
        licenseKey: process.env.YOUR_LICENSE_KEY_GOES_HERE,
      },
      this.$refs.viewer
    ).then(instance => {
      // now you can access APIs through the WebViewer instance
      const { Core, UI } = instance;

      // CUSTOM HEADER //
      UI.disableElements(['ribbons', 'toolsHeader']);

      // adds a button to the header that on click sets the page to the next page
      UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: 'https://icons.getbootstrap.com/assets/icons/caret-right-fill.svg',
          onClick: () => {
            const currentPage = Core.documentViewer.getCurrentPage();
            const totalPages = Core.documentViewer.getPageCount();
            const atLastPage = currentPage === totalPages;

            if (atLastPage) {
              Core.documentViewer.setCurrentPage(1);
            } else {
              Core.documentViewer.setCurrentPage(currentPage + 1);
            }
          }
        });
      });
    });
  }
};
</script>
<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
