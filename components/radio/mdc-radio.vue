<template>
<div :class="formFieldClasses">
  <div ref="root" class="mdc-radio" :class="classes" :style="styles">
    <input type="radio" ref="control" :id="_uid" :name="name" 
      class="mdc-radio__native-control" @change="sync">
  
    <div ref="label" class="mdc-radio__background">
      <div class="mdc-radio__outer-circle"></div>
      <div class="mdc-radio__inner-circle"></div>
    </div>
  
  </div>
  <label ref="label" :for="_uid" v-if="label">{{ label }}</label>
</div>
</template>

<script lang="babel">
import MDCRadioFoundation from '@material/radio/foundation'
import {RippleBase} from '../util'

export default {
  name: 'mdc-radio',
  model: {
    prop: 'picked',
    event: 'change'
  },
  props: {
    'name': String,
    'value': String,
    'checked': Boolean,
    'label': String,
    'align-end': Boolean,
    'disabled': Boolean
  },
  data () {
    return {
      classes: {},
      styles: {},
      formFieldClasses: {
        'mdc-form-field': this.label,
        'mdc-form-field--align-end': this.label && this.alignEnd
      }
    }
  },
  mounted () {
    // add foundation
    this.foundation = new MDCRadioFoundation({
      addClass: (className) => this.$set(this.classes, className, true),
      removeClass: (className) => this.$delete(this.classes, className),
      getNativeControl: () => this.$refs.control
    })
    this.foundation.init()
    this.foundation.setValue(this.value ? this.value : this.label)
    this.foundation.setDisabled(this.disabled)
    this.foundation.setChecked(this.checked)

    // add ripple
    this.ripple = new RippleBase(this, {
      isUnbounded: () => true,
      isSurfaceActive: () => false,
      registerInteractionHandler: (evt, handler) => {
        this.$refs.root.addEventListener(evt, handler)
        this.$refs.label.addEventListener(evt, handler)
      },
      deregisterInteractionHandler: (evt, handler) => {
        this.$refs.root.removeEventListener(evt, handler)
        this.$refs.label.removeEventListener(evt, handler)
      },
      computeBoundingRect: () => {
        const {left, top} = this.$refs.root.getBoundingClientRect()
        const DIM = 40
        return {
          top,
          left,
          right: left + DIM,
          bottom: top + DIM,
          width: DIM,
          height: DIM
        }
      }
    })
    this.ripple.init()

    // refresh model
    this.checked && this.sync()
  },
  beforeDestroy () {
    this.foundation.destroy()
    this.ripple.destroy()
  },
  watch: {
    'disabled' (value) {
      this.foundation.setDisabled(value)
    }
  },
  methods: {
    isChecked () {
      return this.foundation.isChecked()
    },
    sync () {
      this.$emit('change', this.foundation.getValue())
    }
  }
}
</script>
