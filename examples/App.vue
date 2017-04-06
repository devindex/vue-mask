<template>
  <div>
    <h1>Vue Mask</h1>

    <div class="field">
      <label>Generic <span>[ {{ mask.generic }} ]</span></label>
      <input type="text" name="generic" v-model="mask.generic" v-mask="'AAAA-AAAA-AAAA-AAAA'">
    </div>

    <div class="field">
      <label>Data <span>[ {{ mask.date }} ]</span></label>
      <input type="text" name="date" v-model="mask.date" v-mask-date.br>
    </div>

    <div class="field">
      <label>Decimal <span>[ {{ mask.decimal }} ]</span></label>
      <input type="text" name="decimal" v-model="mask.decimal" v-mask-decimal.br="2">
    </div>

    <div class="field">
      <label>Number <span>[ {{ mask.number }} ]</span></label>
      <input type="text" name="number" v-model="mask.number" v-mask-number>
    </div>

    <div class="field">
      <label>Phone <span>[ {{ mask.phone }} ]</span></label>
      <input type="text" name="obj.phone" v-model="mask.phone" v-mask-phone.br>
    </div>

    <div class="field">
      <label>CPF (BR)<span>[ {{ mask.cpf }} ]</span></label>
      <input type="text" name="cpf" v-model="mask.cpf" v-mask-cpf>
    </div>

    <div class="field">
      <label>CNPJ (BR)<span>[ {{ mask.cnpj }} ]</span></label>
      <input type="text" name="cnpj" v-model="mask.cnpj" v-mask-cnpj>
    </div>

    <div class="field">
      <label>CEP (BR)<span>[ {{ mask.cep }} ]</span></label>
      <input type="text" name="cep" v-model="mask.cep" v-mask-cep>
    </div>

    <div class="field">
      <label>Credit Card<span>[ {{ mask.cc }} ]</span></label>
      <input type="text" name="cc" v-model="mask.cc" v-mask-cc>
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
          decimal: 0,
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
      this.defaultValues();
    },
    methods: {
      defaultValues () {
        this.mask = {
          generic: '527407f42b4fa278',
          date: '31/03/2017',
          decimal: 987654321,
          number: 9876543210,
          phone: '41988887777',
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
  body, input {
    font-family: sans-serif;
  }

  .field {
    margin-bottom: 20px;
    color: #444;
  }

  .field label {
    display: inline-block;
    margin-bottom: 5px;
    font-size: 14px;
  }

  .field input {
    display: block;
    width: 300px;
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 3px;
  }

  .field span {
    margin-left: 10px;
    font-size: 13px;
    color: rgba(0, 0, 0, .7);
  }
</style>
