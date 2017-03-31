/**
  * di-vue-mask v1.0.0
  * (c) 2017 Sergio Rodrigues
  * @license MIT
  */
'use strict';

var model = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;

    if (vnode.tag !== 'input') {
      // find input element in the component
      el = el.querySelector('input');
    }

    el.value = value;
  }
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var stringMask = createCommonjsModule(function (module, exports) {
(function(root, factory) {
    /* istanbul ignore next */
    if (typeof undefined === 'function' && undefined.amd) {
        // AMD. Register as an anonymous module.
        undefined([], factory);
    } else {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    }
}(commonjsGlobal, function() {
    var tokens = {
        '0': {pattern: /\d/, _default: '0'},
        '9': {pattern: /\d/, optional: true},
        '#': {pattern: /\d/, optional: true, recursive: true},
        'A': {pattern: /[a-zA-Z0-9]/},
        'S': {pattern: /[a-zA-Z]/},
        'U': {pattern: /[a-zA-Z]/, transform: function(c) { return c.toLocaleUpperCase(); }},
        'L': {pattern: /[a-zA-Z]/, transform: function(c) { return c.toLocaleLowerCase(); }},
        '$': {escape: true}
    };

    function isEscaped(pattern, pos) {
        var count = 0;
        var i = pos - 1;
        var token = {escape: true};
        while (i >= 0 && token && token.escape) {
            token = tokens[pattern.charAt(i)];
            count += token && token.escape ? 1 : 0;
            i--;
        }
        return count > 0 && count % 2 === 1;
    }

    function calcOptionalNumbersToUse(pattern, value) {
        var numbersInP = pattern.replace(/[^0]/g,'').length;
        var numbersInV = value.replace(/[^\d]/g,'').length;
        return numbersInV - numbersInP;
    }

    function concatChar(text, character, options, token) {
        if (token && typeof token.transform === 'function') {
            character = token.transform(character);
        }
        if (options.reverse) {
            return character + text;
        }
        return text + character;
    }

    function hasMoreTokens(pattern, pos, inc) {
        var pc = pattern.charAt(pos);
        var token = tokens[pc];
        if (pc === '') {
            return false;
        }
        return token && !token.escape ? true : hasMoreTokens(pattern, pos + inc, inc);
    }

    function hasMoreRecursiveTokens(pattern, pos, inc) {
        var pc = pattern.charAt(pos);
        var token = tokens[pc];
        if (pc === '') {
            return false;
        }
        return token && token.recursive ? true : hasMoreRecursiveTokens(pattern, pos + inc, inc);
    }

    function insertChar(text, char, position) {
        var t = text.split('');
        t.splice(position, 0, char);
        return t.join('');
    }

    function StringMask(pattern, opt) {
        this.options = opt || {};
        this.options = {
            reverse: this.options.reverse || false,
            usedefaults: this.options.usedefaults || this.options.reverse
        };
        this.pattern = pattern;
    }

    StringMask.prototype.process = function proccess(value) {
        var this$1 = this;

        if (!value) {
            return {result: '', valid: false};
        }
        value = value + '';
        var pattern2 = this.pattern;
        var valid = true;
        var formatted = '';
        var valuePos = this.options.reverse ? value.length - 1 : 0;
        var patternPos = 0;
        var optionalNumbersToUse = calcOptionalNumbersToUse(pattern2, value);
        var escapeNext = false;
        var recursive = [];
        var inRecursiveMode = false;

        var steps = {
            start: this.options.reverse ? pattern2.length - 1 : 0,
            end: this.options.reverse ? -1 : pattern2.length,
            inc: this.options.reverse ? -1 : 1
        };

        function continueCondition(options) {
            if (!inRecursiveMode && !recursive.length && hasMoreTokens(pattern2, patternPos, steps.inc)) {
                // continue in the normal iteration
                return true;
            } else if (!inRecursiveMode && recursive.length &&
                hasMoreRecursiveTokens(pattern2, patternPos, steps.inc)) {
                // continue looking for the recursive tokens
                // Note: all chars in the patterns after the recursive portion will be handled as static string
                return true;
            } else if (!inRecursiveMode) {
                // start to handle the recursive portion of the pattern
                inRecursiveMode = recursive.length > 0;
            }

            if (inRecursiveMode) {
                var pc = recursive.shift();
                recursive.push(pc);
                if (options.reverse && valuePos >= 0) {
                    patternPos++;
                    pattern2 = insertChar(pattern2, pc, patternPos);
                    return true;
                } else if (!options.reverse && valuePos < value.length) {
                    pattern2 = insertChar(pattern2, pc, patternPos);
                    return true;
                }
            }
            return patternPos < pattern2.length && patternPos >= 0;
        }

        /**
         * Iterate over the pattern's chars parsing/matching the input value chars
         * until the end of the pattern. If the pattern ends with recursive chars
         * the iteration will continue until the end of the input value.
         *
         * Note: The iteration must stop if an invalid char is found.
         */
        for (patternPos = steps.start; continueCondition(this.options); patternPos = patternPos + steps.inc) {
            // Value char
            var vc = value.charAt(valuePos);
            // Pattern char to match with the value char
            var pc = pattern2.charAt(patternPos);

            var token = tokens[pc];
            if (recursive.length && token && !token.recursive) {
                // In the recursive portion of the pattern: tokens not recursive must be seen as static chars
                token = null;
            }

            // 1. Handle escape tokens in pattern
            // go to next iteration: if the pattern char is a escape char or was escaped
            if (!inRecursiveMode || vc) {
                if (this$1.options.reverse && isEscaped(pattern2, patternPos)) {
                    // pattern char is escaped, just add it and move on
                    formatted = concatChar(formatted, pc, this$1.options, token);
                    // skip escape token
                    patternPos = patternPos + steps.inc;
                    continue;
                } else if (!this$1.options.reverse && escapeNext) {
                    // pattern char is escaped, just add it and move on
                    formatted = concatChar(formatted, pc, this$1.options, token);
                    escapeNext = false;
                    continue;
                } else if (!this$1.options.reverse && token && token.escape) {
                    // mark to escape the next pattern char
                    escapeNext = true;
                    continue;
                }
            }

            // 2. Handle recursive tokens in pattern
            // go to next iteration: if the value str is finished or
            //                       if there is a normal token in the recursive portion of the pattern
            if (!inRecursiveMode && token && token.recursive) {
                // save it to repeat in the end of the pattern and handle the value char now
                recursive.push(pc);
            } else if (inRecursiveMode && !vc) {
                // in recursive mode but value is finished. Add the pattern char if it is not a recursive token
                formatted = concatChar(formatted, pc, this$1.options, token);
                continue;
            } else if (!inRecursiveMode && recursive.length > 0 && !vc) {
                // recursiveMode not started but already in the recursive portion of the pattern
                continue;
            }

            // 3. Handle the value
            // break iterations: if value is invalid for the given pattern
            if (!token) {
                // add char of the pattern
                formatted = concatChar(formatted, pc, this$1.options, token);
                if (!inRecursiveMode && recursive.length) {
                    // save it to repeat in the end of the pattern
                    recursive.push(pc);
                }
            } else if (token.optional) {
                // if token is optional, only add the value char if it matchs the token pattern
                //                       if not, move on to the next pattern char
                if (token.pattern.test(vc) && optionalNumbersToUse) {
                    formatted = concatChar(formatted, vc, this$1.options, token);
                    valuePos = valuePos + steps.inc;
                    optionalNumbersToUse--;
                } else if (recursive.length > 0 && vc) {
                    valid = false;
                    break;
                }
            } else if (token.pattern.test(vc)) {
                // if token isn't optional the value char must match the token pattern
                formatted = concatChar(formatted, vc, this$1.options, token);
                valuePos = valuePos + steps.inc;
            } else if (!vc && token._default && this$1.options.usedefaults) {
                // if the token isn't optional and has a default value, use it if the value is finished
                formatted = concatChar(formatted, token._default, this$1.options, token);
            } else {
                // the string value don't match the given pattern
                valid = false;
                break;
            }
        }

        return {result: formatted, valid: valid};
    };

    StringMask.prototype.apply = function(value) {
        return this.process(value).result;
    };

    StringMask.prototype.validate = function(value) {
        return this.process(value).valid;
    };

    StringMask.process = function(value, pattern, options) {
        return new StringMask(pattern, options).process(value);
    };

    StringMask.apply = function(value, pattern, options) {
        return new StringMask(pattern, options).apply(value);
    };

    StringMask.validate = function(value, pattern, options) {
        return new StringMask(pattern, options).validate(value);
    };

    return StringMask;
}));
});

function maskFactory(fn) {
  var getCleaner = function (clearValue) {
    if (typeof clearValue === 'function') {
      return clearValue;
    }

    switch (clearValue) {
      case 'number':
        return function (v) { return v.replace(/\D/g, ''); };
        break;
      case 'alpha':
        return function (v) { return v.replace(/[^a-zA-Z]/g, ''); };
        break;
      default:
        return function (v) { return v.replace(/[^a-zA-Z0-9]/g, ''); };
    }
  };

  return {
    bind: function bind(el, binding, vnode) {
      var mask = fn(el, binding, vnode);

      var model = null;

      var formatter = mask.pattern ? new stringMask(mask.pattern, mask.options || {}) : null;
      var clean = getCleaner(mask.clearValue);

      var format = mask.format || (function (ref) {
        var value = ref.value;
        var formatter = ref.formatter;

        value = formatter.apply(value);
        return value.trim().replace(/[^0-9]$/, '');
      });

      var handler = function (event) {
        var target = event.target;
        var type = event.type;

        if (type === 'paste') {
          target.value = '';
        }

        var value = clean(target.value);

        target.value = format({value: value, formatter: formatter});

        if (model) {
          vnode.context[model.expression] = target.value;
        }
      };

      if (vnode.tag === 'input') {
        // remove original event listener (v-model)
        el.removeEventListener('input', vnode.data.on['input']);
        model = vnode.data.directives.find(function (o) { return o.name === 'model'; });
      } else {
        // find input element in the component
        el = el.querySelector('input');
        model = vnode.data.directives.find(function (o) { return o.name === 'mask-model'; });
      }

      el.addEventListener('input', function (e) { return handler(e); }, false);
      el.addEventListener('paste', function (e) { return handler(e); }, false);
      el.addEventListener('blur', function (e) { return handler(e); }, false);

      handler({target: el, type: null});
    }
  }
}

var mask = maskFactory(function (el, ref) {
  var value = ref.value;

  return {
    pattern: value,
    format: function format(ref) {
      var value = ref.value;
      var formatter = ref.formatter;

      value = formatter.apply(value);
      return value.trim().replace(/[^a-zA-Z0-9]$/, '');
    }
  }
});

var patterns = {
  us: '0000-00-00',
  br: '00/00/0000'
};

var date = maskFactory(function (el, ref) {
  var arg = ref.arg;
  var modifiers = ref.modifiers;

  var key = arg || Object.keys(modifiers)[0] || 'us';
  var pattern = patterns[key];

  return {
    pattern: pattern,
    clearValue: 'number'
  }
});

var formatters = {
  get us() {
    var phone = new stringMask('(000) 000-0000');

    return {
      format: function format(value) {
        return phone.apply(value);
      }
    }
  },
  get br() {
    var phone = new stringMask('(00) 0000-0000');
    var phone9 = new stringMask('(00) 9 0000-0000');
    var phone0800 = new stringMask('0000-000-0000');

    return {
      format: function format(value) {
        if (value.indexOf('0800') === 0) {
          value = phone0800.apply(value);
        } else if (value.length <= 10) {
          value = phone.apply(value);
        } else {
          value = phone9.apply(value);
        }
        return value;
      }
    }
  }
};

var phone = maskFactory(function (el, ref) {
  var arg = ref.arg;
  var modifiers = ref.modifiers;

  var key = arg || Object.keys(modifiers)[0] || 'us';
  var formatter = formatters[key];

  return {
    clearValue: 'number',
    format: function format(ref) {
      var value = ref.value;

      value = formatter.format(value);
      return value.trim().replace(/[^0-9]$/, '');
    }
  }
});

var config = {
  us: {thousand: ',', decimal: '.'},
  br: {thousand: '.', decimal: ','}
};

var decimal = maskFactory(function (el, ref) {
  var value = ref.value;
  var arg = ref.arg;
  var modifiers = ref.modifiers;

  var key = arg || Object.keys(modifiers)[0] || 'us';
  var conf = config[key];

  var pattern = "#" + (conf.thousand) + "##0";

  if (value && value > 0) {
    pattern += conf.decimal;
    while (value > 0) {
      pattern += '0';
      value--;
    }
  }

  return {
    pattern: pattern,
    options: {reverse: true},
    clearValue: 'number',
    format: function format(ref) {
      var value = ref.value;
      var formatter = ref.formatter;

      return formatter.apply(Number(value));
    }
  }
});

var number = maskFactory(function () {
  return {
    pattern: '#0',
    options: {reverse: true},
    clearValue: 'number'
  }
});

var cpf = maskFactory(function () {
  return {
    pattern: '000.000.000-00',
    clearValue: 'number'
  }
});

var cnpj = maskFactory(function () {
  return {
    pattern: '00.000.000/0000-00',
    clearValue: 'number'
  }
});

var cep = maskFactory(function () {
  return {
    pattern: '00.000-000',
    clearValue: 'number'
  }
});

var cc = maskFactory(function () {
  return {
    pattern: '0000 0000 0000 0000',
    clearValue: 'number'
  }
});

var _Vue;

function install(Vue) {
  if (install.installed) {
    return;
  }

  _Vue = Vue;

  Vue.directive('maskModel', model);
  Vue.directive('mask', mask);
  Vue.directive('maskDate', date);
  Vue.directive('maskPhone', phone);
  Vue.directive('maskDecimal', decimal);
  Vue.directive('maskNumber', number);
  Vue.directive('maskCpf', cpf);
  Vue.directive('maskCnpj', cnpj);
  Vue.directive('maskCep', cep);
  Vue.directive('maskCc', cc);

  install.installed = true;
}

var index = {install: install};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({install: install});
}

module.exports = index;
