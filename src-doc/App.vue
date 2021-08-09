<template>
  <div class="container grid-md">
    <h1>Vue Mask</h1>

    <div class="form-group">
      <label class="form-label" for="generic">Generic <span>[ {{ mask.generic }} ]</span></label>
      <div v-mask="'AAAA-AAAA-AAAA-AAAA'">
        <input class="form-input" type="text" id="generic" v-model="mask.generic">
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="date">Date <span>[ {{ mask.date }} ]</span></label>
      <input class="form-input" type="text" id="date" v-model="mask.date"
             v-mask-date.br>
    </div>

    <div class="form-group">
      <label class="form-label" for="decimal">Decimal <span>[ {{ mask.decimal }} ]</span></label>
      <input class="form-input" type="text" id="decimal" v-model="mask.decimal"
             v-mask-decimal.br="2">
    </div>

    <div class="form-group">
      <label class="form-label" for="number">Number <span>[ {{ mask.number }} ]</span></label>
      <input class="form-input" type="text" id="number" v-model="mask.number"
             v-mask-number>
    </div>

    <div class="form-group">
      <label class="form-label" for="phone">Phone <span>[ {{ mask.phone }} ]</span></label>
      <input class="form-input" type="text" id="phone" v-model="mask.phone"
             v-mask-phone.br>
    </div>

    <div class="form-group">
      <label class="form-label" for="cpf">CPF (BR)<span>[ {{ mask.cpf }} ]</span></label>
      <input class="form-input" type="text" id="cpf" v-model="mask.cpf" v-mask-cpf>
    </div>

    <div class="form-group">
      <label class="form-label" for="cnpj">CNPJ (BR)<span>[ {{ mask.cnpj }} ]</span></label>
      <input class="form-input" type="text" id="cnpj" v-model="mask.cnpj" v-mask-cnpj>
    </div>

    <div class="form-group">
      <label class="form-label" for="cep">CEP (BR)<span>[ {{ mask.cep }} ]</span></label>
      <input class="form-input" type="text" id="cep" v-model="mask.cep"
             v-mask-cep>
    </div>

    <div class="form-group">
      <label class="form-label" for="cc">Credit Card<span>[ {{ mask.cc }} ]</span></label>
      <input class="form-input" type="text" id="cc" v-model="mask.cc"
             v-mask-cc>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mask: {
        generic: '',
        date: '',
        decimal: '1.00',
        decimal2: null,
        decimal3: undefined,
        decimal4: 1.1,
        decimal5: 1.01,
        decimal6: 1,
        number: 0,
        phone: '',
        cpf: '',
        cnpj: '',
        cep: '',
        cc: ''
      }
    }
  },
  mounted () {
    setTimeout(this.defaultValues, 0);
  },
  methods: {
    defaultValues () {
      this.mask = {
        generic: '527407f42b4fa278',
        date: '31/03/2017',
        decimal: 987654321,
        number: 9876543210,
        phone: '41987654321',
        cpf: '38558724903',
        cnpj: '24168633000171',
        cep: '80010170',
        cc: '4539416887805240'
      }
    }
  }
}
</script>

<style>

</style>
