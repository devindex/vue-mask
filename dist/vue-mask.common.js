/**
  * di-vue-mask v1.2.1
  * (c) 2021 Sergio Rodrigues
  * @license MIT
  */
'use strict';

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

var getInputElement = function (el) {
  var inputEl =  el.tagName.toLowerCase() !== 'input'
    ? el.querySelector('input:not([readonly])')
    : el;

  if (!inputEl) {
    throw new Error('Mask directive requires at least one input');
  }

  return inputEl;
};

function createEvent(name) {
  var event = document.createEvent('HTMLEvents');
  event.initEvent(name, true, true);
  return event;
}

var filterNumbers = function (v) { return (
  v.replace(/\D/g, '')
); };

var filterLetters = function (v) { return (
  v.replace(/[^a-zA-Z]/g, '')
); };

var filterAlphanumeric = function (v) { return (
  v.replace(/[^a-zA-Z0-9]/g, '')
); };

var parsePreFn = function (arg) {
  if (typeof arg === 'function') {
    return arg;
  }

  switch (arg) {
    case 'filter-number':
      return filterNumbers;
    case 'filter-letter':
      return filterLetters;
    default:
      return filterAlphanumeric;
  }
};

var parsePostFn = function (arg) {
  if (typeof arg === 'function') {
    return arg;
  }

  return function (value) { return (
    value.trim().replace(/[^0-9]$/, '')
  ); };
};

var delimiter = '\u00a7';

function masker(fn) {
  return function (args) {
    var data = fn(args);

    var pre = parsePreFn('pre' in data ? data.pre : null);
    var post = parsePostFn('post' in data ? data.post : null);

    var formatter = 'pattern' in data && data.pattern
      ? new stringMask(data.pattern, data.options || {})
      : null;

    var handler = 'handler' in data && typeof data.handler === 'function'
      ? data.handler
      : function (value) { return (formatter ? formatter.apply(value) : value); };

    return function (str, args) {
      if ( args === void 0 ) args = {};

      args = Object.assign(args, { delimiter: delimiter });

      str = pre(str, args);

      var ref = (
        !str.includes(delimiter) ? ("" + delimiter + str) : str
      ).split(delimiter);
      var prefix = ref[0];
      var value = ref[1];

      value = handler(value, args);

      return post(("" + prefix + value), args);
    }
  }
}

var mask = masker(function (ref) {
  var pattern = ref.value;

  return ({
  pattern: pattern,
  pre: filterAlphanumeric,
  post: function (value) { return (
    value.trim().replace(/[^a-zA-Z0-9]$/, '')
  ); },
});
});

var patterns = {
  us: '0000-00-00',
  br: '00/00/0000'
};

var date = masker(function (ref) {
  if ( ref === void 0 ) ref = {};
  var locale = ref.locale; if ( locale === void 0 ) locale = null;

  return ({
  pattern: patterns[locale || 'us'],
  pre: filterNumbers,
});
});

var handlers = {
  get us() {
    var phone = new stringMask('(000) 000-0000');
    return function (value) { return phone.apply(value); };
  },
  get br() {
    var phone = new stringMask('(00) 0000-0000');
    var phone9 = new stringMask('(00) 9 0000-0000');
    var phone0800 = new stringMask('0000-000-0000');

    return function (value) {
      if (value.startsWith('0800'.slice(0, value.length))) {
        return phone0800.apply(value);
      } else if (value.length <= 10) {
        return phone.apply(value);
      }
      return phone9.apply(value);
    }
  }
};

var phone = masker(function (ref) {
  var locale = ref.locale;

  var handler = handlers[locale || 'us'];

  return {
    pre: filterNumbers,
    handler: handler,
  };
});

var config = {
  us: { thousand: ',', decimal: '.' },
  br: { thousand: '.', decimal: ',' }
};

var decimal = masker(function (ref) {
  var locale = ref.locale;
  var value = ref.value;

  var conf = config[locale || 'us'];

  var patternParts = [("#" + (conf.thousand) + "##0")];
  var precision = value || 0;

  if (precision) {
    patternParts.push(
      conf.decimal,
      new Array(precision).fill('0').join('')
    );
  }

  return {
    pattern: patternParts.join(''),
    options: { reverse: true },
    pre: function pre(value, ref) {
      var delimiter = ref.delimiter;

      if (!value) {
        return '';
      }

      var sign = value.startsWith('-') ? '-' : '';

      var ref$1 = value.split(conf.decimal).map(filterNumbers);
      var number = ref$1[0];
      var fraction = ref$1[1]; if ( fraction === void 0 ) fraction = '';

      if (fraction && fraction.length > precision) {
        number = "" + number + (fraction.slice(0, -precision));
        fraction = fraction.slice(-precision);
      }

      return [sign, delimiter, Number(number), fraction].join('');
    },
    post: function post(value) {
      return value;
    },
  };
});

var number = masker(function () {
  return {
    pattern: '#0',
    options: { reverse: true },
    pre: filterNumbers
  }
});

var cpf = masker(function () { return ({
  pattern: '000.000.000-00',
  pre: filterNumbers,
}); });

var cnpj = masker(function () { return ({
  pattern: '00.000.000/0000-00',
  pre: filterNumbers,
}); });

var cep = masker(function () { return ({
  pattern: '00.000-000',
  pre: filterNumbers,
}); });

var cc = masker(function () { return ({
  pattern: '0000 0000 0000 0000',
  pre: filterNumbers,
}); });

var model = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    var expression = ref.expression;

    el = getInputElement(el, vnode);

    var expressionParts = expression.replace(/\[(\d+)]/, '.$1').split('.');

    var updateModelValue = function (val) {
      var obj = vnode.context;
      var parts = expressionParts.slice(0);
      while (parts.length > 1) {
        obj = obj[parts.shift()];
      }
      return obj[parts.shift()] = val;
    };

    el.addEventListener('input', function (ref) {
      var target = ref.target;

      return updateModelValue(target.value);
    }, false);

    el.value = value;
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    if (value !== oldValue) {
      el = getInputElement(el, vnode);
      el.value = value;
    }
  }
};

function updater(el, masker) {
  var currentValue = el.value;
  var oldValue = el.dataset.value;

  if (oldValue === currentValue) {
    return;
  }

  var newValue = masker(currentValue, { el: el });

  if (newValue === currentValue) {
    el.dataset.value = currentValue;
    return;
  }

  // Get current cursor position
  var position = el.selectionEnd;

  // Find next cursor position
  if (position === currentValue.length) {
    position = newValue.length;
  } else if (position > 0 && position <= newValue.length) {
    var digit = currentValue.charAt(position - 1);

    if (digit !== newValue.charAt(position - 1)) {
      if (digit === newValue.charAt(position)) {
        position += 1;
      } else if (digit === newValue.charAt(position - 2)) {
        position -= 1;
      }
    }
  }

  el.value = newValue;
  el.dataset.value = newValue;

  if (el === document.activeElement) {
    // Restore cursor position
    el.setSelectionRange(position, position);
  }

  el.dispatchEvent(createEvent('input'));
}

function make(maskerFn) {
  var maskerMap = new WeakMap();
  var inputMap = new WeakMap();
  var eventMap = new WeakMap();

  return {
    bind: function (el, binding) {
      var masker = maskerFn({
        value: binding.value,
        locale: binding.arg || Object.keys(binding.modifiers)[0] || null,
      });

      var inputEl = getInputElement(el);

      var eventHandler = function (ref) {
        var isTrusted = ref.isTrusted;

        if (isTrusted) {
          updater(inputEl, masker);
        }
      };

      maskerMap.set(el, masker);
      inputMap.set(el, inputEl);
      eventMap.set(el, eventHandler);

      inputEl.addEventListener('input', eventHandler);

      updater(inputEl, masker);
    },
    componentUpdated: function componentUpdated(el) {
      updater(inputMap.get(el), maskerMap.get(el));
    },
    unbind: function unbind(el) {
      el.removeEventListener('input', inputMap.get(el));
      maskerMap.delete(el);
      inputMap.delete(el);
      eventMap.delete(el);
    },
  };
}

var _Vue;

function install(Vue) {
  if (install.installed) {
    return;
  }

  _Vue = Vue;

  Vue.directive('mask', make(mask));
  Vue.directive('maskDate', make(date));
  Vue.directive('maskPhone', make(phone));
  Vue.directive('maskDecimal', make(decimal));
  Vue.directive('maskNumber', make(number));
  Vue.directive('maskCpf', make(cpf));
  Vue.directive('maskCnpj', make(cnpj));
  Vue.directive('maskCep', make(cep));
  Vue.directive('maskCc', make(cc));
  Vue.directive('maskModel', model);

  install.installed = true;
}

var index = { install: install };

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use({ install: install });
}

module.exports = index;
