import VueMDCIConToggle from './mdc-icon-toggle.vue'

export {VueMDCIConToggle}

export default {
  install (vm) {
    vm.component('mdc-icon-toggle', VueMDCIConToggle)
  }
}
