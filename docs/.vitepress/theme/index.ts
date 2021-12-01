
import DefaultTheme from 'vitepress/theme'
import './style.css'

import ShowCase from './ShowCase.vue'

import MyLayout from './MyLayout.vue'
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
    //app.component('BadgerComponent', BadgerComponent)
    app.component('ShowCase', ShowCase)
  }
}