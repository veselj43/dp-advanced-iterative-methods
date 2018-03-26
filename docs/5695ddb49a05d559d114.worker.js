/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dp-advanced-iterative-methods/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "2Zpo");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+E39":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("S82l")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "+ZMJ":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("lOnJ");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "+tPU":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("xGkn");
var global = __webpack_require__("7KvD");
var hide = __webpack_require__("hJx8");
var Iterators = __webpack_require__("/bQp");
var TO_STRING_TAG = __webpack_require__("dSzd")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "/bQp":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "/n6Q":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("zQR9");
__webpack_require__("+tPU");
module.exports = __webpack_require__("Kh4W").f('iterator');


/***/ }),

/***/ "06OY":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("3Eo+")('meta');
var isObject = __webpack_require__("EqjI");
var has = __webpack_require__("D2L2");
var setDesc = __webpack_require__("evD5").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("S82l")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "0LyH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return UniformCrossover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TwoPointCrossover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OnePointCrossover; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Random__ = __webpack_require__("RJON");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Individual__ = __webpack_require__("IGB4");





var UniformCrossover = function () {
    function UniformCrossover() {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, UniformCrossover);
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(UniformCrossover, [{
        key: "crossover",
        value: function crossover(parent1, parent2) {
            var size = parent1.getSize();
            var offSeq1 = [];
            var offSeq2 = [];
            var parSeq1 = parent1.getBitArray();
            var parSeq2 = parent2.getBitArray();
            for (var i = 0; i < size; i++) {
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Random__["a" /* getRandomBoolean */])()) {
                    offSeq1.push(parSeq1[i]);
                    offSeq2.push(parSeq2[i]);
                } else {
                    offSeq1.push(parSeq2[i]);
                    offSeq2.push(parSeq1[i]);
                }
            }
            return [new __WEBPACK_IMPORTED_MODULE_3__Individual__["a" /* BinaryIndividual */](offSeq1), new __WEBPACK_IMPORTED_MODULE_3__Individual__["a" /* BinaryIndividual */](offSeq2)];
        }
    }]);

    return UniformCrossover;
}();

var TwoPointCrossover = function () {
    function TwoPointCrossover() {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, TwoPointCrossover);
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(TwoPointCrossover, [{
        key: "crossover",
        value: function crossover(parent1, parent2) {
            var size = parent1.getSize();
            var first = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Random__["b" /* getRandomInt */])(0, size);
            var second = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Random__["b" /* getRandomInt */])(0, size);
            if (first > second) {
                var temp = first;
                first = second;
                second = temp;
            }
            var offSeq1 = [];
            var offSeq2 = [];
            var parSeq1 = parent1.getBitArray();
            var parSeq2 = parent2.getBitArray();
            for (var i = 0; i < size; i++) {
                if (i < first || i > second) {
                    offSeq1.push(parSeq1[i]);
                    offSeq2.push(parSeq2[i]);
                } else {
                    offSeq1.push(parSeq2[i]);
                    offSeq2.push(parSeq1[i]);
                }
            }
            return [new __WEBPACK_IMPORTED_MODULE_3__Individual__["a" /* BinaryIndividual */](offSeq1), new __WEBPACK_IMPORTED_MODULE_3__Individual__["a" /* BinaryIndividual */](offSeq2)];
        }
    }]);

    return TwoPointCrossover;
}();

var OnePointCrossover = function () {
    function OnePointCrossover() {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, OnePointCrossover);
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(OnePointCrossover, [{
        key: "crossover",
        value: function crossover(parent1, parent2) {
            var size = parent1.getSize();
            var point = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Random__["b" /* getRandomInt */])(0, size);
            var offSeq1 = [];
            var offSeq2 = [];
            var parSeq1 = parent1.getBitArray();
            var parSeq2 = parent2.getBitArray();
            for (var i = 0; i < size; i++) {
                if (i < point) {
                    offSeq1.push(parSeq1[i]);
                    offSeq2.push(parSeq2[i]);
                } else {
                    offSeq1.push(parSeq2[i]);
                    offSeq2.push(parSeq1[i]);
                }
            }
            return [new __WEBPACK_IMPORTED_MODULE_3__Individual__["a" /* BinaryIndividual */](offSeq1), new __WEBPACK_IMPORTED_MODULE_3__Individual__["a" /* BinaryIndividual */](offSeq2)];
        }
    }]);

    return OnePointCrossover;
}();

/***/ }),

/***/ "1J20":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnealingSolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign__ = __webpack_require__("2QDH");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_Result_js__ = __webpack_require__("Ol//");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_BufferedReply__ = __webpack_require__("eRhH");






/**
 * Class for solving problems using simulated annealing
 */
var AnnealingSolver = function () {
    function AnnealingSolver(workerInterface) {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, AnnealingSolver);

        this._workerInterface = workerInterface;

        // buffers messages to reduce communication overhead while sending computation progress every cycle
        this._bufferedReply = new __WEBPACK_IMPORTED_MODULE_4__common_BufferedReply__["a" /* default */](this._workerInterface, 'progressBuffered', 75);
    }

    /**
     * Main function method, solves the problem using simulated annealing
     * @param  {object} problem type of problem
     * @param  {object} params  problem parameters
     * @return {Result} final configuration, its fitness and number of iterations
     */


    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(AnnealingSolver, [{
        key: 'solve',
        value: function solve(problem, params) {
            var currentTemp = +params.start_temp;
            var currentConfiguration = problem.getConfiguration();
            var currentNeighbour = currentConfiguration.getNeighbour();
            var counter = 0;

            this._workerInterface.reply('init', { numberOfIterations: Math.ceil((Math.log(+params.min_temp) - Math.log(+params.start_temp)) / Math.log(+params.cool_coef)) });

            // main cycle depending on temperature
            while (currentTemp > +params.min_temp) {
                //inner cycle, equilibrium
                for (var i = 0; i < +params.equil; i++) {
                    //next is better
                    if (problem.getFitness(currentConfiguration) < problem.getFitness(currentNeighbour)) {
                        currentConfiguration = currentNeighbour;
                    }
                    // next is worse
                    else {
                            if (Math.random() < Math.exp((problem.getFitness(currentNeighbour) - problem.getFitness(currentConfiguration)) / currentTemp)) {
                                currentConfiguration = currentNeighbour;
                            }
                        }
                    currentNeighbour = currentConfiguration.getNeighbour();
                    counter++;
                }
                currentTemp *= +params.cool_coef;
                this._bufferedReply.addMessageWithAutoFlush(problem.getFitness(currentConfiguration));
            }
            this._bufferedReply.addMessage(problem.getFitness(currentConfiguration)).flush();
            return new __WEBPACK_IMPORTED_MODULE_3__common_Result_js__["a" /* default */](problem.getResult(currentConfiguration), problem.getFitness(currentConfiguration), counter);
        }
        /**
         * Function to compute starting temperature
         * @param  {object} problem type of problem
         * @param  {object} params  problem parameters
         * @return {int} calculated starting temperature
         */

    }, {
        key: 'computeStartingTemp',
        value: function computeStartingTemp(problem) {
            var currentConfiguration = problem.getConfiguration();
            var currentNeighbour = currentConfiguration.getNeighbour();
            var arrayOfEnergyStates = [];

            var wantedPropability = 0.5;
            var currentPropability = 0;

            var maxSum;
            var minSum;
            var newEnergyState;

            var temperature = 100;

            // filling array with random transitions, more precisly with energies of those transitions (max and min fitness)
            while (100 * currentConfiguration.getSize() !== arrayOfEnergyStates.length) {
                newEnergyState = {
                    max: Math.max(problem.getFitness(currentConfiguration), problem.getFitness(currentNeighbour)),
                    min: Math.min(problem.getFitness(currentConfiguration), problem.getFitness(currentNeighbour))
                };
                if (__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign___default()(newEnergyState.max) === __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign___default()(newEnergyState.min)) {
                    arrayOfEnergyStates.push(newEnergyState);
                }
                currentConfiguration = currentNeighbour;
                currentNeighbour = currentConfiguration.getNeighbour();
            }
            //calculating temperature for which is the propability of accepting average worse state equals to wantedPropability
            while (Math.abs(wantedPropability - currentPropability) > 0.005) {
                maxSum = 0;
                minSum = 0;

                for (var i = 0; i < arrayOfEnergyStates.length; i++) {
                    maxSum += Math.exp(-arrayOfEnergyStates[i].max / temperature);
                    minSum += Math.exp(-arrayOfEnergyStates[i].min / temperature);
                }

                currentPropability = maxSum / minSum;
                //console.log(currentPropability);
                temperature = temperature * (-Math.log(currentPropability) / -Math.log(wantedPropability));
            }

            return Math.round(temperature);
        }

        /**
         * Compute the size of inner cycle, its constant * size of the problem
         * @param  {[type]} problem [description]
         * @return {[type]}         [description]
         */

    }, {
        key: 'computeEquil',
        value: function computeEquil(problem) {
            return problem.getConfiguration().getSize() * 10;
        }
    }]);

    return AnnealingSolver;
}();

/***/ }),

/***/ "1kS7":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "2QDH":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("NLm3"), __esModule: true };

/***/ }),

/***/ "2Zpo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WorkerInterface_js__ = __webpack_require__("ybbF");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__problems_SAT__ = __webpack_require__("JXTG");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__problems_Knapsack__ = __webpack_require__("SLya");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__problems_MinimalVertexCover__ = __webpack_require__("T2O7");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__problems_TravellingSalesman__ = __webpack_require__("Zfzn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__methods_Tabu__ = __webpack_require__("cA7k");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__methods_genetic_Genetic__ = __webpack_require__("T3DB");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__methods_Annealing__ = __webpack_require__("1J20");









var methods = {
    work: function(data, params) {
        var job = new Job(data, params);
        job.run(params.methodParams[params.method.id]);
    }
}

var workerInterface = new __WEBPACK_IMPORTED_MODULE_0__WorkerInterface_js__["a" /* WorkerInterface */](this, methods);

// Job organization
class Job {
    constructor(inputData, params) {
        this.problem = null;
        this.method = null;

        if (params.problem.id === 0) this.problem = new __WEBPACK_IMPORTED_MODULE_1__problems_SAT__["a" /* SAT */](inputData);
        else if (params.problem.id === 1) this.problem = new __WEBPACK_IMPORTED_MODULE_4__problems_TravellingSalesman__["a" /* TravellingSalesman */](inputData);
        else if (params.problem.id === 2) this.problem = new __WEBPACK_IMPORTED_MODULE_2__problems_Knapsack__["a" /* Knapsack */](inputData);
        else if (params.problem.id === 3) this.problem = new __WEBPACK_IMPORTED_MODULE_3__problems_MinimalVertexCover__["a" /* MinimalVertexCover */](inputData);

        if (params.method.id === 'tabu') this.method = new __WEBPACK_IMPORTED_MODULE_5__methods_Tabu__["a" /* TabuSolver */](workerInterface);
        else if (params.method.id === 'genetic') this.method = new __WEBPACK_IMPORTED_MODULE_6__methods_genetic_Genetic__["a" /* GeneticSolver */](workerInterface);
        else if (params.method.id === 'annealing') this.method = new __WEBPACK_IMPORTED_MODULE_7__methods_Annealing__["a" /* AnnealingSolver */](workerInterface);
    }

    run(methodParams) {
        if (this.problem === null) {
            workerInterface.reply('error', "Unknown problem selected");
            return null;
        }
        if (this.method === null) {
            workerInterface.reply('error', "Unknown method selected");
            return null;
        }

        var t0 = performance.now();
        var result = this.method.solve(this.problem, methodParams);
        var t1 = performance.now();

        result.setProcessTime(t1 - t0);

        workerInterface.reply('result', result);

        return result;
    }
}

this.postMessage = self.postMessage;

// msg recieved event
self.addEventListener('message', (event) => {
    workerInterface.onMessage(event)
})


/***/ }),

/***/ "3Eo+":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "3fs2":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("RY/4");
var ITERATOR = __webpack_require__("dSzd")('iterator');
var Iterators = __webpack_require__("/bQp");
module.exports = __webpack_require__("FeBl").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "4mcu":
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "4pxw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BitArray; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);


/**
 * class representing bit array configuration, used for all problems with bit array configurations
 * @type {class}
 */
var BitArray = function () {
    /**
     * Class constructor, can create from other BitArray, random with specified size, or all 0 with specific size
     * @param {object} options contains options.fromBitArray(bool), options.size(int) and options.random(bool)
     */
    function BitArray(options) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, BitArray);

        if (!options) return;
        this._bitArray = [];
        if (options.fromBitArray) {
            this._bitArray = options.fromBitArray.map(function (x) {
                return x;
            });
        } else if (options.size && options.random) {
            for (var i = 0; i < options.size; i++) {
                this._bitArray.push(!!Math.round(Math.random()));
            }
        } else if (options.size) {
            for (var i = 0; i < options.size; i++) {
                this._bitArray.push(false);
            }
        }
    }
    /**
     * Return copy of the class
     * @return {class} copy of the class
     */


    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(BitArray, [{
        key: "copy",
        value: function copy() {
            return new BitArray({ fromBitArray: this._bitArray });
        }
        /**
         * Change the value on specific index(bit flip)
         * @param  {int} index which index to change
         * @return {class} return the class
         */

    }, {
        key: "changeOn",
        value: function changeOn(index) {
            this._bitArray[index] = !this._bitArray[index];
            return this;
        }
        /**
         * Return neighbour, either random or selected with index
         * @param  {int} index which index will change to get the neighbour
         * @return {class} return copy of the class with the value on index changed
         */

    }, {
        key: "getNeighbour",
        value: function getNeighbour(index) {
            if (!index) index = Math.round(Math.random() * (this._bitArray.length - 1));

            return this.copy().changeOn(index);
        }
        /**
         * Returns the bit array, meaning the actual array not class
         * @return {array} bitArray variable
         */

    }, {
        key: "getBitArray",
        value: function getBitArray() {
            return this._bitArray;
        }
        /**
         * Return size of the BitArray
         * @return {int} size of the array
         */

    }, {
        key: "getSize",
        value: function getSize() {
            return this._bitArray.length;
        }
        /**
         * Returns the type of the configuration, needed for specific method functions(like mutation for example)
         * @return {[type]} [description]
         */

    }, {
        key: "getType",
        value: function getType() {
            return 'bitArray';
        }
        /**
         * Return the bitArray as string
         * @return {string} bitArray as string
         */

    }, {
        key: "toString",
        value: function toString() {
            var str = "";
            for (var i in this._bitArray) {
                str += this._bitArray[i] ? "1" : "0";
            }
            return str;
        }
        /**
         * Typical equals function, compares two BitArrays
         * @param  {class} other other BitArray
         * @return {bool} equals or not
         */

    }, {
        key: "equals",
        value: function equals(other) {
            if (other == null) return false;
            for (var i = 0; i < this._bitArray.length; i++) {
                if (this._bitArray[i] != other._bitArray[i]) return false;
            }return true;
        }
    }]);

    return BitArray;
}();

/***/ }),

/***/ "52gC":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "5QVw":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("BwfY"), __esModule: true };

/***/ }),

/***/ "5zde":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("zQR9");
__webpack_require__("qyJz");
module.exports = __webpack_require__("FeBl").Array.from;


/***/ }),

/***/ "77Pl":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("EqjI");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "7KvD":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "7UMu":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("R9M2");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "880/":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("hJx8");


/***/ }),

/***/ "94VQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("Yobk");
var descriptor = __webpack_require__("X8DO");
var setToStringTag = __webpack_require__("e6n0");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("hJx8")(IteratorPrototype, __webpack_require__("dSzd")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "9bBU":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("mClu");
var $Object = __webpack_require__("FeBl").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "9iXT":
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),

/***/ "BwfY":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("fWfb");
__webpack_require__("M6a0");
__webpack_require__("OYls");
__webpack_require__("QWe/");
module.exports = __webpack_require__("FeBl").Symbol;


/***/ }),

/***/ "C4MV":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("9bBU"), __esModule: true };

/***/ }),

/***/ "D2L2":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "EGZi":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "EqjI":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "FeBl":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "Gu7T":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__("c/Tr");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),

/***/ "IGB4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Individual */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BinaryIndividual; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__("Zx67");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__("zwoO");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__("Pf15");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);





var Individual = function () {
    function Individual() {
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, Individual);

        this._fitness = null;
        this._rank = null;
        if (this.constructor === Individual) {
            throw new TypeError('Abstract class "Individual" cannot be instantiated directly.');
        }
        if (this.mutate === undefined) {
            throw new TypeError('Classes extending the Individual abstract class');
        }
    }

    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(Individual, [{
        key: 'getFitness',
        value: function getFitness() {
            return this._fitness;
        }
    }, {
        key: 'setFitness',
        value: function setFitness(fitness) {
            this._fitness = fitness;
        }
    }, {
        key: 'getRank',
        value: function getRank() {
            return this._rank;
        }
    }, {
        key: 'setRank',
        value: function setRank(rank) {
            this._rank = rank;
        }
        // getGenotype() {
        //     //abstract
        // }

    }, {
        key: 'mutate',
        value: function mutate(mutationProb) {
            //abstract
        }
    }, {
        key: 'copy',
        value: function copy() {
            //abstract
        }
    }]);

    return Individual;
}();

var BinaryIndividual = function (_Individual) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(BinaryIndividual, _Individual);

    function BinaryIndividual(bitArray) {
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, BinaryIndividual);

        var _this = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, (BinaryIndividual.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(BinaryIndividual)).call(this));

        _this._bitArray = bitArray;

        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(BinaryIndividual, [{
        key: 'mutate',
        value: function mutate(mutationProb) {
            for (var i = 0; i < this._bitArray.length; i++) {
                if (Math.random() < mutationProb) {
                    this._fitness = null;
                    //bit flip
                    this._bitArray[i] = !this._bitArray[i];
                }
            }
        }

        // getGenotype() {
        //     return this._bitArray;
        // }

    }, {
        key: 'getBitArray',
        value: function getBitArray() {
            return this._bitArray;
        }
    }, {
        key: 'getSize',
        value: function getSize() {
            return this._bitArray.length;
        }
    }, {
        key: 'copy',
        value: function copy() {
            return new BinaryIndividual(this._bitArray.map(function (x) {
                return x;
            }));
        }
    }]);

    return BinaryIndividual;
}(Individual);

/***/ }),

/***/ "Ibhu":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("D2L2");
var toIObject = __webpack_require__("TcQ7");
var arrayIndexOf = __webpack_require__("vFc/")(false);
var IE_PROTO = __webpack_require__("ax3d")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "JXTG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Literal */
/* unused harmony export Clausule */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SAT; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__("Zx67");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__("zwoO");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__("Pf15");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configurationTypes_BitArray__ = __webpack_require__("4pxw");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Problem__ = __webpack_require__("i4sz");








// common SAT input
var Literal = function Literal(name, i) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, Literal);

    this.id = name; // int
    this.inv = i; // boolean "inversed"
};

var Clausule = function () {
    function Clausule(literalArray) {
        __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, Clausule);

        this.literals = literalArray.map(function (literal) {
            var id = parseInt(literal);

            var inv = false;
            if (id < 0) {
                id *= -1;
                inv = true;
            }

            return new Literal(id - 1, inv);
        });
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Clausule, [{
        key: "check",
        value: function check(bitArray) {
            for (var literal in this.literals) {
                if (bitArray[this.literals[literal].id] && !this.literals[literal].inv) return true;
                if (!bitArray[this.literals[literal].id] && this.literals[literal].inv) return true;
            }
            return false;
        }
    }]);

    return Clausule;
}();

var SAT = function (_Problem) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(SAT, _Problem);

    function SAT(data) {
        __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_classCallCheck___default()(this, SAT);

        var _this = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, (SAT.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(SAT)).call(this));

        _this._clausules = [];
        var dataSet = data.split('\n').filter(function (row) {
            return row.trim()[0] !== 'c';
        });

        var params = dataSet[0].split(/(\s+)/).filter(function (x) {
            return x.trim().length > 0;
        }).splice(2, 2).map(function (param) {
            return parseInt(param);
        });

        _this.params = {
            numberOfVariables: params[0],
            numberOfClausules: params[1]
        };

        dataSet = dataSet.splice(1, params[1]).map(function (row) {
            row = row.trim().split(' ');
            row = row.splice(0, row.length - 1).map(function (number) {
                return parseInt(number);
            });

            return row;
        });

        for (var row in dataSet) {
            _this._clausules.push(new Clausule(dataSet[row]));
        };
        return _this;
    }

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(SAT, [{
        key: "check",
        value: function check(bitArray) {
            var satisfied = 0;
            this._clausules.forEach(function (clausule) {
                if (clausule.check(bitArray)) satisfied++;
            });
            return satisfied;
        }
    }, {
        key: "getFitness",
        value: function getFitness(bitArrayConfig) {
            if (bitArrayConfig === null) return -1;

            var bitArray = bitArrayConfig.getBitArray();

            var trueClauses = this.check(bitArray);
            if (trueClauses < this.params.numberOfClausules) return trueClauses;
            return this.params.numberOfClausules; // + getWeight(configuration);
        }
    }, {
        key: "getConfiguration",
        value: function getConfiguration(random) {
            return new __WEBPACK_IMPORTED_MODULE_5__configurationTypes_BitArray__["a" /* BitArray */]({
                size: this.params.numberOfVariables,
                random: random
            });
        }

        /**
         * Returns the result of the config, in this case the config array
         * @param  {class} bitArrayConfig the configuration of which result we want
         * @return {Array} the bit array of the configuration
         */

    }, {
        key: "getResult",
        value: function getResult(bitArrayConfig) {
            return bitArrayConfig.getBitArray();
        }
    }]);

    return SAT;
}(__WEBPACK_IMPORTED_MODULE_6__Problem__["a" /* Problem */]);

/***/ }),

/***/ "Kh4W":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("dSzd");


/***/ }),

/***/ "Kh5d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__("sB3e");
var $getPrototypeOf = __webpack_require__("PzxK");

__webpack_require__("uqUo")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ "LKZe":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("NpIQ");
var createDesc = __webpack_require__("X8DO");
var toIObject = __webpack_require__("TcQ7");
var toPrimitive = __webpack_require__("MmMw");
var has = __webpack_require__("D2L2");
var IE8_DOM_DEFINE = __webpack_require__("SfB7");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("+E39") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "M6a0":
/***/ (function(module, exports) {



/***/ }),

/***/ "MU5D":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("R9M2");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "Mhyx":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("/bQp");
var ITERATOR = __webpack_require__("dSzd")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "MmMw":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("EqjI");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "NLm3":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("Zujg");
module.exports = __webpack_require__("FeBl").Math.sign;


/***/ }),

/***/ "NnIC":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("mcHG"), __esModule: true };

/***/ }),

/***/ "NpIQ":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "O4g8":
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "ON07":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("EqjI");
var document = __webpack_require__("7KvD").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "OYls":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("crlp")('asyncIterator');


/***/ }),

/***/ "Ol//":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_epsilon__ = __webpack_require__("NnIC");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_epsilon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_epsilon__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);




var Result = function () {
    function Result(config, cost, counter) {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Result);

        this.config = config;
        this.cost = cost;
        this.counter = counter;
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Result, [{
        key: "setProcessTime",
        value: function setProcessTime(time) {
            this.processTime = Math.round(time * 100 + __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_epsilon___default.a) / 100;
        }
    }]);

    return Result;
}();

/* harmony default export */ __webpack_exports__["a"] = (Result);

/***/ }),

/***/ "OmbK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TourneySelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RouletteSelection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Random__ = __webpack_require__("RJON");




var TourneySelection = function () {
    function TourneySelection(tourneySize) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, TourneySelection);

        this._tourneySize = tourneySize;
        this._smaller = Math.floor(this._tourneySize);
        this._bigger = Math.ceil(this._tourneySize);
        this._rest = this._tourneySize - this._smaller;
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(TourneySelection, [{
        key: "selectIndividuals",
        value: function selectIndividuals(generation, number) {
            var selected = [];
            var smallerRounds = number - Math.round(number * this._rest);
            //smaller rounds
            while (selected.length < smallerRounds) {
                selected.push(this._findWinner(generation, this._smaller));
            }
            //bigger rounds
            while (selected.length < number) {
                selected.push(this._findWinner(generation, this._bigger));
            }
            return selected;
        }
    }, {
        key: "_findWinner",
        value: function _findWinner(generation, tourneySize) {
            var winner = this._selectRandomIndividual(generation);
            for (var i = 1; i < tourneySize; i++) {
                var challenger = this._selectRandomIndividual(generation);
                if (challenger.getFitness() > winner.getFitness()) {
                    winner = challenger;
                }
            }
            return winner;
        }
    }, {
        key: "_selectRandomIndividual",
        value: function _selectRandomIndividual(generation) {
            return generation[__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Random__["b" /* getRandomInt */])(0, generation.length)];
        }
    }]);

    return TourneySelection;
}();

var RouletteSelection = function () {
    function RouletteSelection(scale, min, max) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, RouletteSelection);

        this.scale = scale;
        this.min = min;
        this.max = max;
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(RouletteSelection, [{
        key: "selectIndividuals",
        value: function selectIndividuals(generation, number) {
            var rankSum;
            switch (this.scale) {
                case "rank":
                    rankSum = this._rankIndividuals(generation);
                    break;
                case "linear":
                    rankSum = this._scaleIndividuals(generation);
                    break;
                default:
                    throw new Error("Selection type " + this.scale + " is not supported.");
            }
            var selected = [];
            while (selected.length < number) {
                selected.push(this._rouletteSelect(generation, rankSum));
            }
            return selected;
        }
    }, {
        key: "_rouletteSelect",
        value: function _rouletteSelect(generation, rankSum) {
            var roulette = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__Random__["b" /* getRandomInt */])(0, rankSum);
            //generation is sorted by fitness best individual is the last one
            var i = generation.length;
            do {
                i--;
                roulette -= generation[i].getRank();
            } while (roulette >= 0 /* && i > 0*/); //i > 0 just for precision errors
            return generation[i];
        }
    }, {
        key: "_rankIndividuals",
        value: function _rankIndividuals(generation) {
            var rankSum = 0;
            for (var i = 0; i < generation.length; i++) {
                var rank = this.min + i;
                generation[i].setRank(rank);
                rankSum += rank;
            }
            return rankSum;
        }
    }, {
        key: "_scaleIndividuals",
        value: function _scaleIndividuals(generation) {
            var fitMax = generation[generation.length - 1].getFitness();
            var fitMin = generation[0].getFitness();
            var rankSum = 0;
            for (var i = 0; i < generation.length; i++) {
                var scaledRank = this.min + (generation[1].getFitness() - fitMin) * ((this.max - this.min) / (fitMax - fitMin));
                generation[i].setRank(scaledRank);
                rankSum += scaledRank;
            }
            return rankSum;
        }
    }]);

    return RouletteSelection;
}();

/***/ }),

/***/ "OvRC":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("oM7Q"), __esModule: true };

/***/ }),

/***/ "PH3o":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Permutation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);


/**
 * class representing permutation configuration, used for all problems with permutation configurations
 * @type {class}
 */
var Permutation = function () {
    /**
     * Class constructor, can create from other Permutations, random with specified size, or sorted starting with 0
     * @param {object} options contains options.fromBitArray(bool), options.size(int) and options.random(bool)
     */
    function Permutation(options) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Permutation);

        if (!options) return;
        this._Array = [];
        if (options.fromArray) {
            this._Array = options.fromArray.map(function (x) {
                return x;
            });
        } else if (options.size && options.random) {
            for (var i = 0; i < options.size; i++) {
                this._Array = randomPermutation(options.size);
            }
        } else if (options.size) {
            for (var i = 0; i < options.size; i++) {
                this._Array.push(i);
            }
        }
    }

    /**
     * Returns random permutation array of specific size
     * @param  {int} size size of the permutation
     * @return {array} the generated permutation as array
     */


    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Permutation, [{
        key: "randomPermutation",
        value: function randomPermutation(size) {
            var randomPermutation = [];
            var wasPicked = new Array(size).fill(0);

            var noOfZeros = 0;
            var randomNumber = 0;

            while (randomPermutation.length !== size) {
                randomNumber = new Math.round(Math.random() * (size - randomPermutation.length));
                noOfZeros = 0;
                for (var i = 0; i < size; i++) {
                    if (wasPicked[i] === 0) noOfZeros++;
                    if (noOfZeros === randomNumber) {
                        randomPermutation.push(i);
                        break;
                    }
                }
            }
            return randomPermutation;
        }
        /**
         * Return copy of the class
         * @return {class} copy of the class
         */

    }, {
        key: "copy",
        value: function copy() {
            return new Permutation({ fromArray: this._Array });
        }
        /**
         * Change the value on specific index(bit flip)
         * @param  {int} index which index to change
         * @return {class} return the class
         */

    }, {
        key: "changeOn",
        value: function changeOn(indexOne, indexTwo) {
            var x = this._Array[indexOne];
            this._Array[indexOne] = this._Array[indexTwo];
            this._Array[indexTwo] = x;
            return this;
        }
        /**
         * Return neighbour, either random or selected with two indexes to swap
         * @param  {int} index which index will change to get the neighbour
         * @return {class} return copy of the class with the value on index changed
         */

    }, {
        key: "getNeighbour",
        value: function getNeighbour(indexOne, indexTwo) {
            if (arguments.length < 2) {
                indexOne = Math.round(Math.random() * (this._Array.length - 1));
                indexTwo = Math.round(Math.random() * (this._Array.length - 1));

                while (indexOne === indexTwo) {
                    indexTwo = Math.round(Math.random() * (this._Array.length - 1));
                }
            }
            return this.copy().changeOn(indexOne, indexTwo);
        }
        /**
         * Returns the bit array, meaning the actual array not class
         * @return {array} bitArray variable
         */

    }, {
        key: "getArray",
        value: function getArray() {
            return this._Array;
        }
        /**
         * Return size of the BitArray
         * @return {int} size of the array
         */

    }, {
        key: "getSize",
        value: function getSize() {
            return this._Array.length;
        }
        /**
         * Returns the type of the configuration, needed for specific method functions(like mutation for example)
         * @return {string} [description]
         */

    }, {
        key: "getType",
        value: function getType() {
            return 'permutation';
        }
        /**
         * Return the bitArray as string
         * @return {string} bitArray as string
         */

    }, {
        key: "toString",
        value: function toString() {
            var str = "";
            for (var i in this._Array) {
                str += this._Array[i];
            }
            return str;
        }
        /**
         * Typical equals function, compares two BitArrays
         * @param  {class} other other BitArray
         * @return {bool} equals or not
         */

    }, {
        key: "equals",
        value: function equals(other) {
            if (!other) return false; // checks for null, undefined, empty, etc.
            for (var i = 0; i < this._Array.length; i++) {
                if (this._Array[i] !== other._Array[i]) return false;
            }return true;
        }
    }]);

    return Permutation;
}();

/***/ }),

/***/ "Pf15":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__("kiBT");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__("OvRC");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__("pFYg");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),

/***/ "PzxK":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("D2L2");
var toObject = __webpack_require__("sB3e");
var IE_PROTO = __webpack_require__("ax3d")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "QRG4":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("UuGF");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "QWe/":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("crlp")('observable');


/***/ }),

/***/ "R9M2":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "RJON":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getRandomInt;
/* harmony export (immutable) */ __webpack_exports__["a"] = getRandomBoolean;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomBoolean() {
    return !!Math.round(Math.random());
}

/***/ }),

/***/ "RPLV":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7KvD").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "RY/4":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("R9M2");
var TAG = __webpack_require__("dSzd")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "Rrel":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("TcQ7");
var gOPN = __webpack_require__("n0T6").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "S82l":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "SLya":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Knapsack; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__("Zx67");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__("zwoO");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__("Pf15");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configurationTypes_BitArray__ = __webpack_require__("4pxw");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Problem__ = __webpack_require__("i4sz");







/**
 * Knapsack problem class, used for knapsack problem solving, works with BitArray configuration
 */
var Knapsack = function (_Problem) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Knapsack, _Problem);

    /**
     * Constructor, construct the class from the data file selected
     * @param {string} data instance of a problem coded as string
     */
    function Knapsack(data) {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Knapsack);

        var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Knapsack.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(Knapsack)).call(this));

        _this._items = [];
        _this._capacity;

        data = data.split(/\s+/);

        var noItems = +data[0];
        _this._capacity = +data[1];

        data = data.splice(2, 2 * noItems);

        for (var i = 0; i < data.length; i += 2) {
            _this._items.push({
                weight: +data[i],
                value: +data[i + 1]
            });
        }
        return _this;
    }
    /**
     * Returns fitness of selected configuration(BitArray)
     * @param  {class} bitArrayConfig BitArray of which fitness we want
     * @return {int}  calculated fitness of the configuration
     */


    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Knapsack, [{
        key: "getFitness",
        value: function getFitness(bitArrayConfig) {
            var _this2 = this;

            if (bitArrayConfig === null) return -1;

            var bitArray = bitArrayConfig.getBitArray();

            var sumValue = 0;
            var sumWeight = 0;

            bitArray.forEach(function (bit, index) {
                if (bit) {
                    sumValue += _this2._items[index].value;
                    sumWeight += _this2._items[index].weight;
                }
            });

            return sumWeight > this._capacity ? this._capacity - sumWeight : sumValue;
        }
        /**
         * Returns random, or all 0, configuration of knapsack problem(BitArray configuration)
         * @param  {bool} random random or all 0
         * @return {class}  new BitArray class
         */

    }, {
        key: "getConfiguration",
        value: function getConfiguration(random) {
            return new __WEBPACK_IMPORTED_MODULE_5__configurationTypes_BitArray__["a" /* BitArray */]({
                size: this._items.length,
                random: random
            });
        }

        /**
         * Returns the result of the config, in this case the config array
         * @param  {class} bitArrayConfig the configuration of which result we want
         * @return {Array} the bit array of the configuration
         */

    }, {
        key: "getResult",
        value: function getResult(bitArrayConfig) {
            return bitArrayConfig.getBitArray();
        }
    }]);

    return Knapsack;
}(__WEBPACK_IMPORTED_MODULE_6__Problem__["a" /* Problem */]);

/***/ }),

/***/ "SfB7":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("+E39") && !__webpack_require__("S82l")(function () {
  return Object.defineProperty(__webpack_require__("ON07")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "T2O7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MinimalVertexCover; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__("Zx67");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__("zwoO");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__("Pf15");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configurationTypes_BitArray__ = __webpack_require__("4pxw");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Problem__ = __webpack_require__("i4sz");







/**
 * Minimal vertex cover problem class, used for minimal vertex cover problem solving, works with BitArray configuration
 */
var MinimalVertexCover = function (_Problem) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(MinimalVertexCover, _Problem);

    /**
     * Constructor, construct the class from the data file selected
     * @param {string} data instance of a problem coded as string
     */
    function MinimalVertexCover(data) {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, MinimalVertexCover);

        var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (MinimalVertexCover.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(MinimalVertexCover)).call(this));

        data = data.split(/\s+/);

        _this._size = +data[0];
        _this._array = new Array(_this._size);

        for (var i = 0; i < _this._size; i++) {
            _this._array[i] = new Array(_this._size);
        }

        for (var i = 0; i < _this._size; i++) {
            for (var j = 0; j < _this._size; j++) {
                _this._array[i][j] = +data[1 + i * _this._size + j];
            }
        }
        return _this;
    }

    /**
     * Returns fitness of selected configuration(BitArray)
     * @param  {class} bitArrayConfig BitArray of which fitness we want
     * @return {int}  calculated fitness of the configuration
     */


    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(MinimalVertexCover, [{
        key: "getFitness",
        value: function getFitness(bitArrayConfig) {
            if (bitArrayConfig === null) return -1;

            var coveredArray = new Array(bitArrayConfig.getSize()).fill(0);
            var bitArray = bitArrayConfig.getBitArray();
            var numberOfCovered = 0;
            var currentPrice = 0;

            for (var i = 0; i < bitArray.length; i++) {
                if (bitArray[i]) {
                    currentPrice++;
                    for (var j = 0; j < this._size; j++) {
                        if (this._array[i][j] && coveredArray[j] !== 1) {
                            coveredArray[j] = 1;
                            numberOfCovered++;
                        }
                    }
                }
            }

            return this._size - numberOfCovered === 0 ? this._size - currentPrice : numberOfCovered - this._size;
        }

        /**
         * Returns random, or all 0, configuration of knapsack problem(BitArray configuration)
         * @param  {bool} random random or all 0
         * @return {class}  new BitArray class
         */

    }, {
        key: "getConfiguration",
        value: function getConfiguration(random) {
            return new __WEBPACK_IMPORTED_MODULE_5__configurationTypes_BitArray__["a" /* BitArray */]({
                size: this._size,
                random: random
            });
        }

        /**
         * Returns the result of the config, in this case the config array
         * @param  {class} bitArrayConfig the configuration of which result we want
         * @return {Array} the bit array of the configuration
         */

    }, {
        key: "getResult",
        value: function getResult(bitArrayConfig) {
            return bitArrayConfig.getBitArray();
        }
    }]);

    return MinimalVertexCover;
}(__WEBPACK_IMPORTED_MODULE_6__Problem__["a" /* Problem */]);

/***/ }),

/***/ "T3DB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeneticSolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__("Gu7T");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_Result__ = __webpack_require__("Ol//");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_BufferedReply__ = __webpack_require__("eRhH");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Selection__ = __webpack_require__("OmbK");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Crossover__ = __webpack_require__("0LyH");








var GeneticSolver = function () {
    function GeneticSolver(workerInterface) {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, GeneticSolver);

        this._workerInterface = workerInterface;
        // buffers messages to reduce communication overhead while sending computation progress every cycle
        this._bufferedReply = new __WEBPACK_IMPORTED_MODULE_4__common_BufferedReply__["a" /* default */](this._workerInterface, 'progressBuffered', 75);
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(GeneticSolver, [{
        key: "solve",
        value: function solve(problem, params) {
            //set params
            this.problem = problem;

            var populationSize = params.populationSize;
            var noGenerations = params.noGenerations;
            switch (params.selectionType) {
                case "roulette-rank":
                    this.selection = new __WEBPACK_IMPORTED_MODULE_5__Selection__["a" /* RouletteSelection */]("rank", params.scaleMin);
                    break;
                case "roulette-linear":
                    this.selection = new __WEBPACK_IMPORTED_MODULE_5__Selection__["a" /* RouletteSelection */]("linear", params.scaleMin, params.scaleMax);
                    break;
                case "tourney":
                    this.selection = new __WEBPACK_IMPORTED_MODULE_5__Selection__["b" /* TourneySelection */](params.tourneySize);
                    break;
                default:
                    throw new Error("Selection type " + params.selectionType + " is not supported.");
            }
            var crossoverProb = params.crossoverProb;
            switch (params.crossoverType) {
                case "one-point":
                    this.crossover = new __WEBPACK_IMPORTED_MODULE_6__Crossover__["a" /* OnePointCrossover */]();
                    break;
                case "two-point":
                    this.crossover = new __WEBPACK_IMPORTED_MODULE_6__Crossover__["b" /* TwoPointCrossover */]();
                    break;
                case "uniform":
                    this.crossover = new __WEBPACK_IMPORTED_MODULE_6__Crossover__["c" /* UniformCrossover */]();
                    break;
                default:
                    throw new Error("Crossover type " + params.selectionType + " is not supported.");

            }
            var elitism = params.elitism;

            this.result = [];
            this.bestFitness = 0;
            this.counter = 0;

            console.log("params: ", params);

            this._workerInterface.reply('init', { numberOfIterations: params.noGenerations /*, maxFitness: this.problemInput.params.numberOfClausules*/ });

            //init generation
            var generation = this._initGeneration(populationSize);

            //evolve solution
            for (var g = 0; g < noGenerations; g++) {
                var potentialParents = this.selection.selectIndividuals(generation, populationSize - elitism);
                generation = this._doNewGeneration(potentialParents, crossoverProb).concat(generation.slice(populationSize - elitism, populationSize));
                this._evaluateGeneration(generation);
                this.counter++;
            }

            // make sure all messages in buffer are sent (if there are some in buffer, it will send them)
            this._bufferedReply.flush();

            return new __WEBPACK_IMPORTED_MODULE_3__common_Result__["a" /* default */](this.result, this.bestFitness, this.counter);
        }
    }, {
        key: "_initGeneration",
        value: function _initGeneration(populationSize) {
            var generation = [];
            for (var i = 0; i < populationSize; i++) {
                generation.push(this.problem.createNewIndividual());
            }
            this._evaluateGeneration(generation);
            return generation;
        }
    }, {
        key: "_evaluateGeneration",
        value: function _evaluateGeneration(generation) {
            // generation.forEach(function(individual){
            //     this.problem.evaluateIndividual(individual);
            // });
            var average = 0;
            for (var i = 0; i < generation.length; i++) {
                this.problem.evaluateIndividual(generation[i]);
                average += generation[i].getFitness();
            }
            average = average / generation.length;
            generation.sort(function (a, b) {
                return a.getFitness() - b.getFitness();
            });

            this._bufferedReply.addMessageWithAutoFlush({
                worst: generation[0].getFitness(),
                average: average,
                mean: generation[Math.floor(generation.length / 2)].getFitness(),
                best: generation[generation.length - 1].getFitness()
            });
            // console.log('worst: ' +  generation[0].getFitness() + ' average: ' + average + " mean: " + generation[Math.floor(generation.length/2)].getFitness() + " best: " + generation[generation.length-1].getFitness());

            //update best solution
            if (this.bestFitness < generation[generation.length - 1].getFitness()) {
                this.bestFitness = generation[generation.length - 1].getFitness();
                this.result = generation[generation.length - 1].getBitArray();
            }
        }
    }, {
        key: "_doNewGeneration",
        value: function _doNewGeneration(potentialParents, crossoverProb) {
            var newGeneration = [];
            var mate = null;
            for (var i = 0; i < potentialParents.length; i++) {
                if (Math.random() < crossoverProb) {
                    if (mate === null) {
                        mate = potentialParents[i];
                    } else {
                        //do crossover
                        newGeneration.push.apply(newGeneration, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this.crossover.crossover(mate, potentialParents[i])));
                        mate = null;
                    }
                } else {
                    //dont go in crossover
                    newGeneration.push(potentialParents[i].copy());
                }
            }
            if (mate !== null) {
                //add mate if it havent found another mate
                newGeneration.push(mate.copy());
            }
            //mutate all new individuals
            newGeneration.forEach(function (individual) {
                individual.mutate();
            });
            return newGeneration;
        }
    }]);

    return GeneticSolver;
}();

/***/ }),

/***/ "TcQ7":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("MU5D");
var defined = __webpack_require__("52gC");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "UuGF":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "X0uZ":
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__("kM2E");

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),

/***/ "X8DO":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "Xc4G":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("lktj");
var gOPS = __webpack_require__("1kS7");
var pIE = __webpack_require__("NpIQ");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "Y5Mq":
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__("kM2E");

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),

/***/ "Yobk":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("77Pl");
var dPs = __webpack_require__("qio6");
var enumBugKeys = __webpack_require__("xnc9");
var IE_PROTO = __webpack_require__("ax3d")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("ON07")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("RPLV").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "ZaQb":
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__("EqjI");
var anObject = __webpack_require__("77Pl");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__("+ZMJ")(Function.call, __webpack_require__("LKZe").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "Zfzn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TravellingSalesman; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_max_safe_integer__ = __webpack_require__("hiCB");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_max_safe_integer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_max_safe_integer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configurationTypes_Permutation__ = __webpack_require__("PH3o");




var TravellingSalesman = function () {
    /**
     * Constructor, construct the class from the data file selected.
     * Calculates n:n distance between nodes using Floyd-Warshall algorithm
     * @param {string} data instance of a problem coded as string
     */
    function TravellingSalesman(data) {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, TravellingSalesman);

        data = data.split(/\s+/);

        this._noNodes = +data[0];
        this._noEdges = +data[1];
        this._noNodesToVisit = +data[2];
        this._maxPrice = +data[3];
        this._startingNode = +data[4];
        this._nodesToVisit = [];

        for (var i = 0; i < this._noNodesToVisit; i++) {
            this._nodesToVisit.push(+data[5 + i]);
        }

        this._distanceArray = new Array(this._noNodes);
        this._pathArray = new Array(this._noNodes);

        for (var i = 0; i < this._noNodes; i++) {
            this._distanceArray[i] = new Array(this._noNodes);
            this._pathArray[i] = new Array(this._noNodes);
        }
        // initializing arrays, distance array to -inf if no edge, and path array to null if no edge
        for (var i = 0; i < this._noNodes; i++) {
            for (var j = 0; j < this._noNodes; j++) {
                if (+data[5 + this._noNodesToVisit + i * this._noNodes + j] !== 0 || i === j) {
                    this._distanceArray[i][j] = +data[5 + this._noNodesToVisit + i * this._noNodes + j];
                    this._pathArray[i][j] = j;
                } else {
                    this._distanceArray[i][j] = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_max_safe_integer___default.a;
                    this._pathArray[i][j] = null;
                }
            }
        }

        this._floydWarshall();
    }

    /**
     * Floyd warshall algorithm to calculate n:n distances between nodes(vertexes), saves it to _distanceArray, _pathArray for path reconstruction
     * @return {null}
     */


    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(TravellingSalesman, [{
        key: "_floydWarshall",
        value: function _floydWarshall() {
            for (var i = 0; i < this._noNodes; i++) {
                for (var j = 0; j < this._noNodes; j++) {
                    for (var k = 0; k < this._noNodes; k++) {
                        if (this._distanceArray[j][k] > this._distanceArray[j][i] + this._distanceArray[i][k]) {
                            this._distanceArray[j][k] = this._distanceArray[j][i] + this._distanceArray[i][k];
                            this._pathArray[j][k] = this._pathArray[j][i];
                        }
                    }
                }
            }
        }

        /**
         * Binds the permutaion from Permutation configuration, to the actual nodes to visit
         * @param  {[type]} permutationConfig [description]
         * @return {[type]}                   [description]
         */

    }, {
        key: "_bindToNodes",
        value: function _bindToNodes(permutationConfig) {
            var myPermutation = permutationConfig.map(function (x) {
                return x;
            });

            for (var i = 0; i < this._noNodesToVisit; i++) {
                myPermutation[i] = this._nodesToVisit[myPermutation[i]];
            }

            return myPermutation;
        }
        /**
         * Rebuild the current path using _pathArray
         * @param  {class} permutationConfig Permutation of which path we are building
         * @return {String} return the rebuilded path
         */

    }, {
        key: "rebuildPath",
        value: function rebuildPath(permutationConfig) {
            var path = [this._startingNode];
            var permutation = this._bindToNodes(permutationConfig);

            permutation.unshift(this._startingNode);

            for (var i = 1; i < permutation.length; i++) {
                while (permutation[i - 1] != permutation[i]) {
                    permutation[i - 1] = this._pathArray[permutation[i - 1]][permutation[i]];
                    path.push(permutation[i - 1]);
                }
            }

            return path;
        }

        /**
         * Returns fitness of selected configuration(Permutation)
         * @param  {class} permutationConfig Permutation of which fitness we want
         * @return {int}  calculated fitness of the configuration
         */

    }, {
        key: "getFitness",
        value: function getFitness(permutationConfig) {
            var price = 0;
            var permutation = this._bindToNodes(permutationConfig.getArray());

            permutation.unshift(this._startingNode);

            for (var i = 0; i < permutation.length - 1; i++) {
                price -= this._distanceArray[permutation[i]][permutation[i + 1]];
            }

            return price;
        }

        /**
         * Returns random, or sorted starting from 0, configuration of traveling salesman problem(Permutation configuration)
         * @param  {bool} random random or sorted staring with 0
         * @return {class}  new BitArray class
         */

    }, {
        key: "getConfiguration",
        value: function getConfiguration(random) {
            return new __WEBPACK_IMPORTED_MODULE_3__configurationTypes_Permutation__["a" /* Permutation */]({
                size: this._noNodesToVisit,
                random: random
            });
        }

        /**
         * Returns the actual path of the configuration, the real config is only the permutation of nodes that has to be visited, not the path
         * @param  {class} permutationConfig permutation of which path we want to build
         * @return {String} the actual path as string
         */

    }, {
        key: "getResult",
        value: function getResult(permutationConfig) {
            return this.rebuildPath(permutationConfig.getArray());
        }
    }]);

    return TravellingSalesman;
}();

/***/ }),

/***/ "Zrlr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ "Zujg":
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__("kM2E");

$export($export.S, 'Math', { sign: __webpack_require__("9iXT") });


/***/ }),

/***/ "Zx67":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("fS6E"), __esModule: true };

/***/ }),

/***/ "Zzip":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("/n6Q"), __esModule: true };

/***/ }),

/***/ "ax3d":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("e8AB")('keys');
var uid = __webpack_require__("3Eo+");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "c/Tr":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("5zde"), __esModule: true };

/***/ }),

/***/ "cA7k":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabuSolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_Result_js__ = __webpack_require__("Ol//");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_BufferedReply__ = __webpack_require__("eRhH");





// Tabu method
var TabuSolver = function () {
    function TabuSolver(workerInterface) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, TabuSolver);

        this._workerInterface = workerInterface;

        // buffers messages to reduce communication overhead while sending computation progress every cycle
        this._bufferedReply = new __WEBPACK_IMPORTED_MODULE_3__common_BufferedReply__["a" /* default */](this._workerInterface, 'progressBuffered', 75);
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(TabuSolver, [{
        key: '_getCost',
        value: function _getCost(state) {
            if (state === null) return -Infinity;
            return this.problem.getFitness(state);
        }
    }, {
        key: '_compareIndexesOf',
        value: function _compareIndexesOf(queue, c1, c2) {
            for (var i in queue) {
                if (queue[i].equals(c1)) return 1;
                if (queue[i].equals(c2)) return -1;
            }
            return 0;
        }
    }, {
        key: '_containsSearch',
        value: function _containsSearch(set, configuration) {
            return set[configuration.toString()] === true;
        }
    }, {
        key: '_process',
        value: function _process(iterationLimit, tabuSize, tabuSizeShort) {
            var state = this.problem.getConfiguration(); // initial state
            var sBest = state; // initial best found state
            var tabuStates = []; // Queue
            var tabuStatesSearch = []; // HashSet
            var tabuChanges = []; // List

            // tabu iterations
            for (var n = 0; n < iterationLimit; n++) {
                this._bufferedReply.addMessageWithAutoFlush(this._getCost(state));

                // init for this loop
                var bestCandidate = null;
                var tabuBestCandidate = null;
                var bestCandidateIndex = -1;
                var tabuBestCandidateIndex = -1;

                // checking neighbours
                for (var i = 0; i < state.getSize(); i++) {
                    this.counter++;

                    var sCandidate = state.getNeighbour(i);

                    // check change for tabu and if it is tabu, check if we dont miss the best found state
                    if (tabuChanges.indexOf(i) !== -1 && this._getCost(sCandidate) < this._getCost(sBest)) continue;

                    // is current candidate better than best candidate in this step?
                    if (this._getCost(sCandidate) >= this._getCost(bestCandidate)) {
                        // is current candidate tabu?
                        if (!this._containsSearch(tabuStatesSearch, sCandidate)) {
                            bestCandidate = sCandidate;
                            bestCandidateIndex = i;
                        }
                        // if it is, remember the least tabu candidate
                        else if (this._compareIndexesOf(tabuStates, sCandidate, tabuBestCandidate) > 0) {
                                tabuBestCandidate = sCandidate;
                                tabuBestCandidateIndex = i;
                            }
                    }
                }

                // all candidates are tabu
                if (bestCandidateIndex === -1) {
                    // there are non even tabu candidates, we have nowhere to go
                    if (tabuBestCandidateIndex === -1) {
                        console.log("-- no candidates --");
                        break;
                    }
                    state = tabuBestCandidate;
                    bestCandidateIndex = tabuBestCandidateIndex;
                }
                // normal situation, not tabu state
                else {
                        state = bestCandidate;
                    }
                // keep best state found up to date
                if (this._getCost(state) > this._getCost(sBest)) {
                    sBest = state;
                }

                // update tabu lists
                tabuStates.push(state);
                tabuStatesSearch[state.toString()] = true;
                tabuChanges.push(bestCandidateIndex);

                // remove oldest from tabu if its full
                if (tabuStates.length > tabuSize) {
                    delete tabuStatesSearch[tabuStates.shift().toString()];
                }
                if (tabuChanges.length > tabuSizeShort) {
                    tabuChanges.shift();
                }
            }
            // added flush to send remaining progress data before terminating
            this._bufferedReply.addMessage(this._getCost(state)).flush();

            return sBest;
        }
    }, {
        key: 'solve',
        value: function solve(problem, params) {
            this.problem = problem;
            this.counter = 0;

            var iterationLimit = params.iterationLimit;
            var tabuSize = params.tabuSize;
            var tabuSizeShort = params.tabuSizeShort;

            // initial message to set up the interface for the computation
            this._workerInterface.reply('init', { numberOfIterations: iterationLimit });

            var best = this._process(iterationLimit, tabuSize, tabuSizeShort);

            // return Result class managing data format
            return new __WEBPACK_IMPORTED_MODULE_2__common_Result_js__["a" /* default */](problem.getResult(best), this._getCost(best), this.counter);
        }
    }]);

    return TabuSolver;
}();

/***/ }),

/***/ "crlp":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7KvD");
var core = __webpack_require__("FeBl");
var LIBRARY = __webpack_require__("O4g8");
var wksExt = __webpack_require__("Kh4W");
var defineProperty = __webpack_require__("evD5").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "dSOO":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("X0uZ");
module.exports = 0x1fffffffffffff;


/***/ }),

/***/ "dSzd":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("e8AB")('wks');
var uid = __webpack_require__("3Eo+");
var Symbol = __webpack_require__("7KvD").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "dY0y":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("dSzd")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "e6n0":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("evD5").f;
var has = __webpack_require__("D2L2");
var TAG = __webpack_require__("dSzd")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "e8AB":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7KvD");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),

/***/ "eRhH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);



var BufferedReply = function () {
    function BufferedReply(workerInterface, handlerMethod, minFlushDelay) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, BufferedReply);

        this._workerInterface = workerInterface;
        this._handlerMethod = handlerMethod;
        this._minFlushDelay = minFlushDelay || 100;
        this._buffer = [];
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(BufferedReply, [{
        key: "_isTimeToFlush",
        value: function _isTimeToFlush() {
            if (!this._lastFlush || performance.now() - this._lastFlush > this._minFlushDelay) {
                this._lastFlush = performance.now();
                return true;
            }
            return false;
        }
    }, {
        key: "addMessage",
        value: function addMessage(content) {
            this._buffer.push(content);

            return this;
        }
    }, {
        key: "flush",
        value: function flush() {
            if (this._buffer.length === 0) return this;

            this._workerInterface.reply(this._handlerMethod, this._buffer);
            this._buffer = [];

            return this;
        }
    }, {
        key: "addMessageWithAutoFlush",
        value: function addMessageWithAutoFlush(content) {
            this.addMessage(content);

            if (this._isTimeToFlush()) {
                this.flush();
            }

            return this;
        }
    }]);

    return BufferedReply;
}();

/* harmony default export */ __webpack_exports__["a"] = (BufferedReply);

/***/ }),

/***/ "evD5":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("77Pl");
var IE8_DOM_DEFINE = __webpack_require__("SfB7");
var toPrimitive = __webpack_require__("MmMw");
var dP = Object.defineProperty;

exports.f = __webpack_require__("+E39") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "exh5":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__("kM2E");
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__("ZaQb").set });


/***/ }),

/***/ "fBQ2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("evD5");
var createDesc = __webpack_require__("X8DO");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "fS6E":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("Kh5d");
module.exports = __webpack_require__("FeBl").Object.getPrototypeOf;


/***/ }),

/***/ "fWfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("7KvD");
var has = __webpack_require__("D2L2");
var DESCRIPTORS = __webpack_require__("+E39");
var $export = __webpack_require__("kM2E");
var redefine = __webpack_require__("880/");
var META = __webpack_require__("06OY").KEY;
var $fails = __webpack_require__("S82l");
var shared = __webpack_require__("e8AB");
var setToStringTag = __webpack_require__("e6n0");
var uid = __webpack_require__("3Eo+");
var wks = __webpack_require__("dSzd");
var wksExt = __webpack_require__("Kh4W");
var wksDefine = __webpack_require__("crlp");
var enumKeys = __webpack_require__("Xc4G");
var isArray = __webpack_require__("7UMu");
var anObject = __webpack_require__("77Pl");
var isObject = __webpack_require__("EqjI");
var toIObject = __webpack_require__("TcQ7");
var toPrimitive = __webpack_require__("MmMw");
var createDesc = __webpack_require__("X8DO");
var _create = __webpack_require__("Yobk");
var gOPNExt = __webpack_require__("Rrel");
var $GOPD = __webpack_require__("LKZe");
var $DP = __webpack_require__("evD5");
var $keys = __webpack_require__("lktj");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("n0T6").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("NpIQ").f = $propertyIsEnumerable;
  __webpack_require__("1kS7").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("O4g8")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("hJx8")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "fkB2":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("UuGF");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "h65t":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("UuGF");
var defined = __webpack_require__("52gC");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "hJx8":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("evD5");
var createDesc = __webpack_require__("X8DO");
module.exports = __webpack_require__("+E39") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "hiCB":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("dSOO"), __esModule: true };

/***/ }),

/***/ "i/C/":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("exh5");
module.exports = __webpack_require__("FeBl").Object.setPrototypeOf;


/***/ }),

/***/ "i4sz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Problem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__methods_genetic_Individual__ = __webpack_require__("IGB4");




var Problem = function () {
    function Problem() {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Problem);

        // abstract
        if (this.constructor === Problem) {
            throw new TypeError('Abstract class "Problem" cannot be instantiated directly.');
        }
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Problem, [{
        key: 'createNewIndividual',
        value: function createNewIndividual() {
            if (this.isBinary()) {
                return new __WEBPACK_IMPORTED_MODULE_2__methods_genetic_Individual__["a" /* BinaryIndividual */](this.getConfiguration(true).getBitArray());
            } else {
                throw new TypeError('Non binary problems not supported.');
            }
        }
    }, {
        key: 'evaluateIndividual',
        value: function evaluateIndividual(individual) {
            if (individual.getFitness() === null) {
                individual.setFitness(this.getFitness(individual));
            }
        }
    }, {
        key: 'isBinary',
        value: function isBinary() {
            return true;
        }
    }, {
        key: 'getConfiguration',
        value: function getConfiguration(random) {
            // abstract
        }
    }, {
        key: 'getFitness',
        value: function getFitness() {
            // abstract
        }
    }, {
        key: 'getResult',
        value: function getResult() {
            // abstract
        }
    }]);

    return Problem;
}();

/***/ }),

/***/ "kM2E":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7KvD");
var core = __webpack_require__("FeBl");
var ctx = __webpack_require__("+ZMJ");
var hide = __webpack_require__("hJx8");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "kiBT":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("i/C/"), __esModule: true };

/***/ }),

/***/ "lOnJ":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "lktj":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("Ibhu");
var enumBugKeys = __webpack_require__("xnc9");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "mClu":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("kM2E");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__("+E39"), 'Object', { defineProperty: __webpack_require__("evD5").f });


/***/ }),

/***/ "mcHG":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("Y5Mq");
module.exports = Math.pow(2, -52);


/***/ }),

/***/ "msXi":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("77Pl");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "n0T6":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("Ibhu");
var hiddenKeys = __webpack_require__("xnc9").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "oM7Q":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("sF+V");
var $Object = __webpack_require__("FeBl").Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),

/***/ "pFYg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__("Zzip");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__("5QVw");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),

/***/ "qio6":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("evD5");
var anObject = __webpack_require__("77Pl");
var getKeys = __webpack_require__("lktj");

module.exports = __webpack_require__("+E39") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "qyJz":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("+ZMJ");
var $export = __webpack_require__("kM2E");
var toObject = __webpack_require__("sB3e");
var call = __webpack_require__("msXi");
var isArrayIter = __webpack_require__("Mhyx");
var toLength = __webpack_require__("QRG4");
var createProperty = __webpack_require__("fBQ2");
var getIterFn = __webpack_require__("3fs2");

$export($export.S + $export.F * !__webpack_require__("dY0y")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "sB3e":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("52gC");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "sF+V":
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__("kM2E");
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__("Yobk") });


/***/ }),

/***/ "uqUo":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("kM2E");
var core = __webpack_require__("FeBl");
var fails = __webpack_require__("S82l");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "vFc/":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("TcQ7");
var toLength = __webpack_require__("QRG4");
var toAbsoluteIndex = __webpack_require__("fkB2");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "vIB/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("O4g8");
var $export = __webpack_require__("kM2E");
var redefine = __webpack_require__("880/");
var hide = __webpack_require__("hJx8");
var has = __webpack_require__("D2L2");
var Iterators = __webpack_require__("/bQp");
var $iterCreate = __webpack_require__("94VQ");
var setToStringTag = __webpack_require__("e6n0");
var getPrototypeOf = __webpack_require__("PzxK");
var ITERATOR = __webpack_require__("dSzd")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "wxAW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__("C4MV");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),

/***/ "xGkn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("4mcu");
var step = __webpack_require__("EGZi");
var Iterators = __webpack_require__("/bQp");
var toIObject = __webpack_require__("TcQ7");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("vIB/")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "xnc9":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "ybbF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WorkerInterface; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);


var WorkerInterface = function () {
    function WorkerInterface(context, methods, defaultMethod) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, WorkerInterface);

        this._context = context;
        this._methods = methods;
        this._defaultMethod = defaultMethod;
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(WorkerInterface, [{
        key: 'reply',
        value: function reply() {
            if (arguments.length < 1) {
                throw new TypeError('reply: not enough arguments');
                return;
            }
            postMessage({
                handlerName: arguments[0],
                handlerArguments: Array.prototype.slice.call(arguments, 1)
            });
        }
    }, {
        key: 'onMessage',
        value: function onMessage(event) {
            if (event.data instanceof Object && event.data.hasOwnProperty('methodName') && event.data.hasOwnProperty('methodArguments')) {
                if (this._methods[event.data.methodName]) {
                    this._methods[event.data.methodName].apply(this._context, event.data.methodArguments);
                } else if (this._defaultMethod) {
                    this._defaultMethod.apply(this._context, event);
                } else {
                    throw new TypeError('work method doest exist');
                }
            } else {
                throw new TypeError('unsupported work structure');
            }
        }
    }]);

    return WorkerInterface;
}();

/***/ }),

/***/ "zQR9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("h65t")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("vIB/")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "zwoO":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__("pFYg");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ })

/******/ });
//# sourceMappingURL=5695ddb49a05d559d114.worker.js.map