
import DefaultTheme from 'vitepress/theme'
import './style.css'

import ShowCase from './ShowCase.vue'
import OutputFormats from './OutputFormats.vue'
import MyLayout from './MyLayout.vue'
import LabeledImage from './LabeledImage.vue'
import AdjustmentsGrid from './AdjustmentsGrid.vue'
import ImageTransform from './ImageTransform.vue'
import AvailableParameters from './AvailableParameters.vue'
import AliasesTable from './AliasesTable.vue'
import FeatureDrections from './FeatureDetections.vue'
import ErFeature from './ErFeature.vue'
import CropTable from './CropTable.vue'
import CropGrid from './CropGrid.vue'
import ShortHand from './ShortHand.vue'
export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that injects the slots
  Layout: MyLayout,

  enhanceApp({ app }) {
    //app.component('BadgeAndPreview', BadgeAndPreview)
    //app.component('Dialog', Dialog)
    //app.component('Footer', Footer)
    //app.component('FormLine', FormLine)
    //app.component('Header', Header)
    //app.component('Hero', Hero)
    //app.component('Intro', Intro)
    //app.component('MarkdownBox', MarkdownBox)
    //app.component('NativeSelect', NativeSelect)
    //app.component('RepoAndButtons', RepoAndButtons)
    app.component('output-formats', OutputFormats)
    app.component('image-transform', ImageTransform)
    app.component('available-parameters', AvailableParameters)
    app.component('adjustments-grid', AdjustmentsGrid)
    app.component('labeled-image', LabeledImage)
    app.component('aliases-table', AliasesTable)
    app.component('ShowCase', ShowCase)
    app.component('feature-detections', FeatureDrections)
    app.component('er-feature', ErFeature)
    app.component('crop-table', CropTable)
    app.component('crop-grid', CropGrid)

    app.component('short-hand', ShortHand)
  }
}