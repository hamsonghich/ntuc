!function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/core/pdfjs/",o(o.s=0)}([function(t,e,o){t.exports=o(1)},function(t,e){window.isPdfjs=!0,window.addEventListener("viewerLoaded",(function(){var t=window.instance,e=t.UI.Feature;t.UI.disableElements(["cropToolButton","thumbnailControl","documentControl","toolbarGroup-Edit","toolbarGroup-EditText","toolbarGroup-Forms"]),t.UI.disableFeatures([t.UI.Feature.Annotations,t.UI.Feature.Ribbons]),t.UI.disableElements(["ribbons","thumbnailControl","documentControl","outlinesPanelButton","textHighlightToolButton","textUnderlineToolButton","textSquigglyToolButton","textStrikeoutToolButton"]),t.UI.disableFeatures([e.ThumbnailMerging,e.ThumbnailReordering,e.ThumbnailMultiselect,e.LocalStorage])}))}]);