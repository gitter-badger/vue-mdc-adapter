<template>
  <component :is="type" :disabled="disabled" :value=value>
    <slot></slot>
  </component>
</template>

<script lang="babel">
import MDCNativeOption from './mdc-native-option.vue'
import MDCMenuOption from './mdc-menu-option.vue'
import MDCMultiOption from './mdc-multi-option.vue'

export default {
  props: {
    value: String,
    disabled: Boolean
  },
  inject: ['mdcSelect'],
  components: {
    'mdc-native-option': MDCNativeOption,
    'mdc-multi-option': MDCMultiOption,
    'mdc-menu-option': MDCMenuOption
  },
  computed: {
    native () {
      return this.mdcSelect.native
    },
    multiple () {
      return this.mdcSelect.multiple
    },
    type () {
      return this.multiple ? 'mdc-multi-option'
        : this.native ? 'mdc-native-option'
          : 'mdc-menu-option'
    }
  }
}
</script>
