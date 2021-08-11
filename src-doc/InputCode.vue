<template>
  <pre class="input-code"><code v-text="inputSrc"></code></pre>
</template>

<script>
export default {
  props: {
    directive: {
      type: String,
      default: 'v-mask'
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    inputSrc() {
      const directive = this.directive.replace('v-', '');
      const value = this.value ? `="${this.value}"` : '';
      return `<input type="text" v-model="value" v-${directive}${value}>`;
    },
  },
}
</script>

<style lang="scss">
@import "~spectre.css/src/variables";

.input-code {
  margin: $layout-spacing-sm 0 0 0;
  code {
    font-size: $font-size - $layout-spacing-sm;
    padding: $layout-spacing-sm $layout-spacing;
  }
}
</style>
