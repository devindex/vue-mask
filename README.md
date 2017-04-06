Vue mask
==============

Input mask lib for Vue.js based on [String-Mask](https://github.com/the-darc/string-mask)

## Installation

This version only works in Vue 2.

  `npm i di-vue-mask -S`

## Usage

```javascript
import Vue from 'vue'
import VueMask from 'di-vue-mask'

/** Activate vue.js plugins **/
Vue.use(VueMask);
```

Basic usage on HTML input element

```html
<input type="text" name="mask" v-model="mask" v-mask="'0000-0000'">
```

For custom components without `v-model` we can use `v-mask-model`

```html
<my-input v-mask-model="mask" v-mask="'0000-0000'"></my-input>
```

## Available masks

### v-mask

```html
<input type="text" name="mask" v-model="mask" v-mask="'0000-0000'">
```

### v-mask-date (us|br)

```html
<input type="text" name="date" v-model="maskDate" v-mask-date.br>
```

### v-mask-phone (us|br)

```html
<input type="text" name="phone" v-model="maskPhone" v-mask-phone.br>
```

### v-mask-decimal (us|br)

```html
<input type="text" name="decimal" v-model="maskDecimal" v-mask-decimal.br="2">
```

### v-mask-number

```html
<input type="text" name="number" v-model="maskNumber" v-mask-number>
```

### v-mask-cpf

```html
<input type="text" name="cpf" v-model="maskCpf" v-mask-cpf>
```

### v-mask-cnpj

```html
<input type="text" name="cnpj" v-model="maskCnpj" v-mask-cnpj>
```

### v-mask-cep

```html
<input type="text" name="cep" v-model="maskCep" v-mask-cep>
```

### v-mask-cc

```html
<input type="text" name="cc" v-model="maskCc" v-mask-cc>
```

## Special mask characters

Character | Description
--- | ---
`0` | Any numbers
`9` | Any numbers (Optional)
`#` | Any numbers (Recursive)
`A` | Any alphanumeric character
`S` | Any letter
`U` | Any letter (All lower case character will be mapped to uppercase)
`L` | Any letter (All upper case character will be mapped to lowercase)
`$` | Escape character, used to escape any of the special formatting characters.
