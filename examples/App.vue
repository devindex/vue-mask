<template>
  <div>
    <h1>Vue Mask</h1>

    <div class="field" v-mask-model="generic" v-mask="'AAAA-AAAA-AAAA-AAAA'">
      <label>Generic <span>[ {{ generic }} ]</span></label>
      <input type="text" name="generic">
    </div>

    <div class="field">
      <label>Data <span>[ {{ date }} ]</span></label>
      <input type="text" name="date" v-model="date" v-mask-date.br>
    </div>

    <div class="field">
      <label>Decimal <span>[ {{ decimal }} ]</span></label>
      <input type="text" name="decimal" v-model="decimal" v-mask-decimal.br="2">
    </div>

    <div class="field">
      <label>Number <span>[ {{ number }} ]</span></label>
      <input type="text" name="number" v-model="number" v-mask-number>
    </div>

    <div class="field">
      <label>Phone <span>[ {{ phone }} ]</span></label>
      <input type="text" name="phone" v-model="phone" v-mask-phone.br>
    </div>

    <div class="field">
      <label>CPF (BR)<span>[ {{ cpf }} ]</span></label>
      <input type="text" name="cpf" v-model="cpf" v-mask-cpf>
    </div>

    <div class="field">
      <label>CNPJ (BR)<span>[ {{ cnpj }} ]</span></label>
      <input type="text" name="cnpj" v-model="cnpj" v-mask-cnpj>
    </div>

    <div class="field">
      <label>CEP (BR)<span>[ {{ cep }} ]</span></label>
      <input type="text" name="cep" v-model="cep" v-mask-cep>
    </div>

    <div class="field">
      <label>Credit Card<span>[ {{ cc }} ]</span></label>
      <input type="text" name="cc" v-model="cc" v-mask-cc>
    </div>

    {{ isoDate }}

  </div>
</template>

<script>
  export default {
    data () {
      return {
        generic: '527407f42b4fa278',
        date: '31/03/2017',
        decimal: 987654321,
        number: 9876543210,
        phone: '41988887777',
        cpf: '38558724903',
        cnpj: '24168633000171',
        cep: '80010170',
        cc: '4539416887805240',
        ts: new Date()
      }
    },
    mounted () {
      //setInterval(() => this.ts = new Date(), 1000)
    },
    computed: {
      isoDate () {
        return this.ts.toISOString().substring(0, 19);
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
