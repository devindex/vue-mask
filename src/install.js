import mask from './masks/mask';
import date from './masks/date';
import phone from './masks/phone';
import decimal from './masks/decimal';
import number from './masks/number';
import cpf from './masks/cpf';
import cnpj from './masks/cnpj';
import cep from './masks/cep';
import cc from './masks/credit-card';
import model from './masks/model';
import makeDirective from './directive';

export let _Vue;

export function install(Vue) {
  if (install.installed) {
    return;
  }

  _Vue = Vue;

  Vue.directive('mask', makeDirective(mask));
  Vue.directive('maskDate', makeDirective(date));
  Vue.directive('maskPhone', makeDirective(phone));
  Vue.directive('maskDecimal', makeDirective(decimal));
  Vue.directive('maskNumber', makeDirective(number));
  Vue.directive('maskCpf', makeDirective(cpf));
  Vue.directive('maskCnpj', makeDirective(cnpj));
  Vue.directive('maskCep', makeDirective(cep));
  Vue.directive('maskCc', makeDirective(cc));
  Vue.directive('maskModel', model);

  install.installed = true;
}
