<template>
  <div class="container grid-sm doc-page">
    <div class="columns pb-2">
      <div class="column">
        <h2>Vue Mask</h2>
      </div>
      <div class="column text-right">
        <button class="btn btn-error mr-2" @click="clearValues">Clear values</button>
        <button class="btn btn-primary" @click="setValues">Set values</button>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="generic">Mask</label>
      <div class="input-group">
        <input class="form-input" type="text" id="generic"
               v-model="mask.generic" v-mask="'AAAA-AAAA-AAAA-AAAA'">
        <span class="input-group-addon">{{ mask.generic }}</span>
      </div>
      <input-code directive="v-mask" value="'AAAA-AAAA-AAAA-AAAA'"></input-code>
    </div>

    <div class="form-group">
      <label class="form-label" for="date">Date</label>
      <div class="input-group">
        <input class="form-input" type="text" id="date"
               v-model="mask.date" v-mask-date.br>
        <span class="input-group-addon">{{ mask.date }}</span>
      </div>
      <input-code directive="v-mask-date.br"></input-code>
    </div>

    <div class="form-group">
      <label class="form-label" for="decimal">Decimal</label>
      <div class="input-group">
        <input class="form-input" type="text" id="decimal"
               v-model="mask.decimal" v-mask-decimal.br="2">
        <span class="input-group-addon">{{ mask.decimal }}</span>
      </div>
      <input-code directive="v-mask-decimal.br" value="2"></input-code>
    </div>

    <div class="form-group">
      <label class="form-label" for="number">Number</label>
      <div class="input-group">
        <input class="form-input" type="text" id="number"
               v-model="mask.number" v-mask-number>
        <span class="input-group-addon">{{ mask.number }}</span>
      </div>
      <input-code directive="v-mask-number"></input-code>
    </div>

    <div class="form-group">
      <label class="form-label" for="phone">Phone</label>
      <div class="input-group">
        <input class="form-input" type="text" id="phone"
               v-model="mask.phone" v-mask-phone.br>
        <span class="input-group-addon">{{ mask.phone }}</span>
      </div>
      <input-code directive="v-mask-phone.br"></input-code>
    </div>

    <div class="form-group">
      <label class="form-label" for="cpf">CPF (BR)</label>
      <div class="input-group">
        <input class="form-input" type="text" id="cpf"
               v-model="mask.cpf" v-mask-cpf>
        <span class="input-group-addon">{{ mask.cpf }}</span>
      </div>
      <input-code directive="v-mask-cpf"></input-code>
    </div>

    <div class="form-group">
      <label class="form-label" for="cnpj">CNPJ (BR)</label>
      <div class="input-group">
        <input class="form-input" type="text" id="cnpj"
               v-model="mask.cnpj" v-mask-cnpj>
        <span class="input-group-addon">{{ mask.cnpj }}</span>
      </div>
      <input-code directive="v-mask-cnpj"></input-code>
    </div>

    <div class="form-group">
      <label class="form-label" for="cep">CEP (BR)</label>
      <div class="input-group">
        <input class="form-input" type="text" id="cep"
               v-model="mask.cep" v-mask-cep>
        <span class="input-group-addon">{{ mask.cep }}</span>
      </div>
      <input-code directive="v-mask-cep"></input-code>
    </div>

    <div class="form-group">
      <label class="form-label" for="cc">Credit Card</label>
      <div class="input-group">
        <input class="form-input" type="text" id="cc"
               v-model="mask.cc" v-mask-cc>
        <span class="input-group-addon">{{ mask.cc }}</span>
      </div>
      <input-code directive="v-mask-cc"></input-code>
    </div>
  </div>
</template>

<script>
import InputCode from './InputCode.vue';

export default {
  components: {
    InputCode,
  },
  data () {
    return {
      mask: this.sampleValues(),
    };
  },
  methods: {
    clearValues() {
      this.mask = this.emptyData();
    },
    setValues() {
      this.mask = this.sampleValues();
    },
    sampleValues() {
      return {
        generic: '527407f42b4fa278',
        date: '31/03/2017',
        decimal: '987654321',
        number: '9876543210',
        phone: '41987654321',
        cpf: '38558724903',
        cnpj: '24168633000171',
        cep: '80010170',
        cc: '4539416887805240'
      };
    },
    emptyData() {
      return {
        generic: '',
        date: '',
        decimal: '',
        number: '',
        phone: '',
        cpf: '',
        cnpj: '',
        cep: '',
        cc: '',
      }
    },
  },
}
</script>

<style lang="scss">
@import "~spectre.css/src/variables";

.doc-page {
  margin-top: $control-size-lg;
  margin-bottom: $control-size-lg;
  .input-group-addon {
    color: #aaa;
    min-width: 35%;
    text-align: right;
  }
}
</style>
