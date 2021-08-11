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

<style>
.input-code {
  margin: 0.2rem 0 0 0;
}
.input-code code {
  font-size: 0.6rem;
  padding: 0.2rem 0.4rem;
}
</style>
