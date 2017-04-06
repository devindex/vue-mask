import mask from "./masks/mask";
import date from "./masks/date";
import phone from "./masks/phone";
import decimal from "./masks/decimal";
import number from "./masks/number";
import cpf from "./masks/cpf";
import cnpj from "./masks/cnpj";
import cep from "./masks/cep";
import cc from "./masks/credit-card";
import model from "./masks/model";

export let _Vue;

export function install(Vue) {
  if (install.installed) {
    return;
  }

  _Vue = Vue;

  Vue.directive('mask', mask);
  Vue.directive('maskDate', date);
  Vue.directive('maskPhone', phone);
  Vue.directive('maskDecimal', decimal);
  Vue.directive('maskNumber', number);
  Vue.directive('maskCpf', cpf);
  Vue.directive('maskCnpj', cnpj);
  Vue.directive('maskCep', cep);
  Vue.directive('maskCc', cc);
  Vue.directive('maskModel', model);

  install.installed = true;
}
