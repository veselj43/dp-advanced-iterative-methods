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

/***/ "/ShG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getProblemClassFromId;
/* harmony export (immutable) */ __webpack_exports__["b"] = getMethodClassFromId;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__computing_problems_SAT__ = __webpack_require__("JXTG");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__computing_problems_Knapsack__ = __webpack_require__("SLya");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__computing_problems_MinimalVertexCover__ = __webpack_require__("T2O7");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__computing_problems_TravellingSalesman__ = __webpack_require__("Zfzn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__computing_methods_Tabu__ = __webpack_require__("cA7k");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__computing_methods_genetic_Genetic__ = __webpack_require__("T3DB");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__computing_methods_Annealing__ = __webpack_require__("1J20");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__computing_problems_EuclideanTSP__ = __webpack_require__("0gTx");










function getProblemClassFromId(id) {
    if (id === 0) return __WEBPACK_IMPORTED_MODULE_0__computing_problems_SAT__["a" /* SAT */];else if (id === 1) return __WEBPACK_IMPORTED_MODULE_3__computing_problems_TravellingSalesman__["a" /* TravellingSalesman */];else if (id === 2) return __WEBPACK_IMPORTED_MODULE_1__computing_problems_Knapsack__["a" /* Knapsack */];else if (id === 3) return __WEBPACK_IMPORTED_MODULE_2__computing_problems_MinimalVertexCover__["a" /* MinimalVertexCover */];else if (id === 4) return __WEBPACK_IMPORTED_MODULE_7__computing_problems_EuclideanTSP__["a" /* EuclideanTSP */];

    return null;
}

function getMethodClassFromId(id) {
    if (id === 'tabu') return __WEBPACK_IMPORTED_MODULE_4__computing_methods_Tabu__["a" /* TabuSolver */];else if (id === 'genetic') return __WEBPACK_IMPORTED_MODULE_5__computing_methods_genetic_Genetic__["a" /* GeneticSolver */];else if (id === 'annealing') return __WEBPACK_IMPORTED_MODULE_6__computing_methods_Annealing__["a" /* AnnealingSolver */];

    return null;
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CrossoverEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return UniformCrossover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TwoPointCrossover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return OnePointCrossover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return OrderCrossover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return PartiallyMatchedCrossover; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return CycleCrossover; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map__ = __webpack_require__("ifoU");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Random__ = __webpack_require__("RJON");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Individual__ = __webpack_require__("IGB4");






var CrossoverEnum = {
    UNIFORM: "Uniform",
    ONE_POINT: "One-point",
    TWO_POINT: "Two-point",
    ORDER: "Order",
    PMX: "Partially matched",
    CYCLE: "Cycle"

    //binary crossovers
};var UniformCrossover = function () {
    function UniformCrossover() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, UniformCrossover);
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(UniformCrossover, [{
        key: "crossover",
        value: function crossover(parent1, parent2) {
            var size = parent1.getSize();
            var offSeq1 = [];
            var offSeq2 = [];
            var parSeq1 = parent1.getBitArray();
            var parSeq2 = parent2.getBitArray();
            for (var i = 0; i < size; i++) {
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Random__["a" /* getRandomBoolean */])()) {
                    offSeq1.push(parSeq1[i]);
                    offSeq2.push(parSeq2[i]);
                } else {
                    offSeq1.push(parSeq2[i]);
                    offSeq2.push(parSeq1[i]);
                }
            }
            return [new __WEBPACK_IMPORTED_MODULE_4__Individual__["a" /* BinaryIndividual */](offSeq1), new __WEBPACK_IMPORTED_MODULE_4__Individual__["a" /* BinaryIndividual */](offSeq2)];
        }
    }]);

    return UniformCrossover;
}();

var TwoPointCrossover = function () {
    function TwoPointCrossover() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, TwoPointCrossover);
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(TwoPointCrossover, [{
        key: "crossover",
        value: function crossover(parent1, parent2) {
            var size = parent1.getSize();
            var first = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Random__["b" /* getRandomInt */])(0, size + 1);
            var second = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Random__["b" /* getRandomInt */])(0, size + 1);
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
                if (i < first || i >= second) {
                    offSeq1.push(parSeq1[i]);
                    offSeq2.push(parSeq2[i]);
                } else {
                    offSeq1.push(parSeq2[i]);
                    offSeq2.push(parSeq1[i]);
                }
            }
            return [new __WEBPACK_IMPORTED_MODULE_4__Individual__["a" /* BinaryIndividual */](offSeq1), new __WEBPACK_IMPORTED_MODULE_4__Individual__["a" /* BinaryIndividual */](offSeq2)];
        }
    }]);

    return TwoPointCrossover;
}();

var OnePointCrossover = function () {
    function OnePointCrossover() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, OnePointCrossover);
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(OnePointCrossover, [{
        key: "crossover",
        value: function crossover(parent1, parent2) {
            var size = parent1.getSize();
            var point = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Random__["b" /* getRandomInt */])(0, size + 1);
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
            return [new __WEBPACK_IMPORTED_MODULE_4__Individual__["a" /* BinaryIndividual */](offSeq1), new __WEBPACK_IMPORTED_MODULE_4__Individual__["a" /* BinaryIndividual */](offSeq2)];
        }
    }]);

    return OnePointCrossover;
}();

//permutation crossovers
var OrderCrossover = function () {
    function OrderCrossover() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, OrderCrossover);
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(OrderCrossover, [{
        key: "crossover",
        value: function crossover(parent1, parent2) {
            var size = parent1.getSize();
            var point = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Random__["b" /* getRandomInt */])(0, size + 1);

            var offSeq1 = [];
            var offSeq2 = [];
            var parSeq1 = parent1.getGenotype();
            var parSeq2 = parent2.getGenotype();

            var off1Used = new Array(size).fill(false);
            var off2Used = new Array(size).fill(false);
            for (var i = 0; i < point; i++) {
                //copy start
                off1Used[parSeq1[i]] = true;
                offSeq1.push(parSeq1[i]);
                off2Used[parSeq2[i]] = true;
                offSeq2.push(parSeq2[i]);
            }
            //fill the rest
            var i = 0;
            while (offSeq1.length < size) {
                if (!off1Used[parSeq2[i]]) {
                    off1Used[parSeq2[i]] = true;
                    offSeq1.push(parSeq2[i]);
                }
                i++;
            }
            var i = 0;
            while (offSeq2.length < size) {
                if (!off2Used[parSeq1[i]]) {
                    off2Used[parSeq1[i]] = true;
                    offSeq2.push(parSeq1[i]);
                }
                i++;
            }
            return [new __WEBPACK_IMPORTED_MODULE_4__Individual__["b" /* PermutationIndividual */](offSeq1), new __WEBPACK_IMPORTED_MODULE_4__Individual__["b" /* PermutationIndividual */](offSeq2)];
        }
    }]);

    return OrderCrossover;
}();

//Partially matched crossover
var PartiallyMatchedCrossover = function () {
    function PartiallyMatchedCrossover() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, PartiallyMatchedCrossover);
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(PartiallyMatchedCrossover, [{
        key: "crossover",
        value: function crossover(parent1, parent2) {
            var size = parent1.getSize();
            var first = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Random__["b" /* getRandomInt */])(0, size + 1);
            var second = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Random__["b" /* getRandomInt */])(0, size + 1);
            if (first > second) {
                var temp = first;
                first = second;
                second = temp;
            }
            var offSeq1 = [];
            var offSeq2 = [];
            var parSeq1 = parent1.getGenotype();
            var parSeq2 = parent2.getGenotype();

            //create mapping
            var permMap = new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_map___default.a();
            for (var i = first; i < second; i++) {
                //skip if key is already there
                if (!permMap.has(parSeq1[i]) && !permMap.has(parSeq2[i])) {
                    permMap.set(parSeq1[i], parSeq2[i]);
                    permMap.set(parSeq2[i], parSeq1[i]);
                }
            }
            //create offspring
            for (var i = 0; i < size; i++) {
                if (permMap.has(parSeq1[i])) {
                    offSeq1.push(permMap.get(parSeq1[i]));
                } else {
                    offSeq1.push(parSeq1[i]);
                }
                if (permMap.has(parSeq2[i])) {
                    offSeq2.push(permMap.get(parSeq2[i]));
                } else {
                    offSeq2.push(parSeq2[i]);
                }
            }
            return [new __WEBPACK_IMPORTED_MODULE_4__Individual__["b" /* PermutationIndividual */](offSeq1), new __WEBPACK_IMPORTED_MODULE_4__Individual__["b" /* PermutationIndividual */](offSeq2)];
        }
    }]);

    return PartiallyMatchedCrossover;
}();

var CycleCrossover = function () {
    function CycleCrossover() {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, CycleCrossover);
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(CycleCrossover, [{
        key: "crossover",
        value: function crossover(parent1, parent2) {
            var size = parent1.getSize();
            var point = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__Random__["b" /* getRandomInt */])(0, size);

            var offSeq1 = [];
            var offSeq2 = [];
            var parSeq1 = parent1.getGenotype();
            var parSeq2 = parent2.getGenotype();

            var inCycle = new Array(size).fill(false);
            //create cycle
            while (!inCycle[point]) {
                inCycle[point] = true;
                var i = 0;
                for (; i < size; i++) {
                    if (parSeq1[i] === parSeq2[point]) {
                        break;
                    }
                }
                point = i;
            }

            for (var i = 0; i < size; i++) {
                //copy start
                if (inCycle[i]) {
                    offSeq1.push(parSeq1[i]);
                    offSeq2.push(parSeq2[i]);
                } else {
                    offSeq1.push(parSeq1[i]);
                    offSeq2.push(parSeq2[i]);
                }
            }
            return [new __WEBPACK_IMPORTED_MODULE_4__Individual__["b" /* PermutationIndividual */](offSeq1), new __WEBPACK_IMPORTED_MODULE_4__Individual__["b" /* PermutationIndividual */](offSeq2)];
        }
    }]);

    return CycleCrossover;
}();

/***/ }),

/***/ "0gTx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EuclideanTSP; });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configurationTypes_Permutation__ = __webpack_require__("PH3o");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Problem__ = __webpack_require__("i4sz");








var EuclideanTSP = function (_Problem) {
    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(EuclideanTSP, _Problem);

    /**
     * Constructor, construct the class from the data file selected.
     * @param {string} data instance of a problem coded as string
     */
    function EuclideanTSP(data) {
        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, EuclideanTSP);

        var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (EuclideanTSP.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(EuclideanTSP)).call(this));

        var dataSet = data.split('\n');
        _this._noCities = +dataSet[0].split(/\s+/)[0];
        _this._cities = new Array(_this._noCities);

        for (var i = 0; i < _this._noCities; i++) {
            var coords = dataSet[1 + i].split(/\s+/);
            _this._cities[i] = { x: +coords[0], y: +coords[1] };
        }
        //create cache
        _this._distanceCache = new Array(_this._noCities);
        for (var i = 0; i < _this._noCities; i++) {
            _this._distanceCache[i] = new Array(_this._noCities);
            for (var j = 0; j < _this._noCities; j++) {
                _this._distanceCache[i][j] = null;
            }
        }
        return _this;
    }

    /**
     * Returns fitness of selected configuration(Permutation)
     * @param  {class} permutationConfig Permutation of which fitness we want
     * @return {int}  calculated fitness of the configuration
     */


    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(EuclideanTSP, [{
        key: 'evaluateMaximizationCost',
        value: function evaluateMaximizationCost(permutationConfig) {
            var price = 0;

            var permutation = permutationConfig.getArray();

            for (var i = 0; i < permutation.length - 1; i++) {
                if (this._distanceCache[permutation[i]][permutation[i + 1]] === null) {
                    // count to cache
                    this._distanceCache[permutation[i]][permutation[i + 1]] = this.countEuclideanDistance(this._cities[permutation[i]], this._cities[permutation[i + 1]]);
                    this._distanceCache[permutation[i + 1]][permutation[i]] = this._distanceCache[permutation[i]][permutation[i + 1]];
                }
                price -= this._distanceCache[permutation[i]][permutation[i + 1]];
            }
            if (this._distanceCache[permutation[permutation.length - 1]][permutation[0]] == null) {
                // count to cache
                this._distanceCache[permutation[permutation.length - 1]][permutation[0]] = this.countEuclideanDistance(this._cities[permutation[permutation.length - 1]], this._cities[permutation[0]]);
                this._distanceCache[permutation[0]][permutation[permutation.length - 1]] = this._distanceCache[permutation[permutation.length - 1]][permutation[0]];
            }
            price -= this._distanceCache[permutation[permutation.length - 1]][permutation[0]];
            return price;
        }
    }, {
        key: 'countEuclideanDistance',
        value: function countEuclideanDistance(coord1, coord2) {
            return Math.sqrt(Math.pow(coord1.x - coord2.x, 2) + Math.pow(coord1.y - coord2.y, 2));
        }
    }, {
        key: 'transformMaximizationToRealCost',
        value: function transformMaximizationToRealCost(maxCost) {
            return -maxCost;
        }

        /**
         * Returns random, or sorted starting from 0, configuration of traveling salesman problem(Permutation configuration)
         * @param  {bool} random random or sorted staring with 0
         * @return {Permutation}  new Permutation class
         */

    }, {
        key: 'getConfiguration',
        value: function getConfiguration(random) {
            return new __WEBPACK_IMPORTED_MODULE_5__configurationTypes_Permutation__["a" /* Permutation */]({
                size: this._noCities,
                random: random
            });
        }

        /**
         *
         * @param  {class} permutationConfig permutation of which path we want to build
         * @return {String}
         */

    }, {
        key: 'getResult',
        value: function getResult(permutationConfig) {
            return permutationConfig.getArray();
        }
    }, {
        key: 'getType',
        value: function getType() {
            return __WEBPACK_IMPORTED_MODULE_6__Problem__["a" /* ProblemTypeEnum */].PERMUTATION;
        }
    }, {
        key: 'resolveInstanceParams',
        value: function resolveInstanceParams(instanceContent) {
            instanceContent = instanceContent.split(/\s+/);

            return {
                noCities: +instanceContent[0]
            };
        }

        /**
         * Returns instance invalidity
         * @param  {string} instanceContent content of the instance
         * @return {boolean} is instance invalid
         */

    }, {
        key: 'isInvalidInstance',
        value: function isInvalidInstance(instanceContent) {
            var dataSet = instanceContent.split('\n');
            if (isNaN(dataSet[0].split(/\s+/)[0])) return { text: "First parameter must be a number." };
            var noCities = +dataSet[0].split(/\s+/)[0];

            if (instanceContent.length - 1 < noCities) return { text: "Invalid number of lines." };

            for (var i = 0; i < noCities; i++) {
                var coords = dataSet[1 + i].split(/\s+/);
                if (coords.length < 2) return { text: "Invalid number of coordinates on line." };
                if (isNaN(coords[0]) || isNaN(coords[1])) return { text: "Coordinate must be a number." };
            }
            return false; // valid instance
        }
    }]);

    return EuclideanTSP;
}(__WEBPACK_IMPORTED_MODULE_6__Problem__["b" /* Problem */]);

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
            var currentCost = problem.evaluateMaximizationCost(currentConfiguration);
            var currentNeighbour = currentConfiguration.getNeighbour();
            var counter = 0;

            this._workerInterface.reply('init', { numberOfIterations: Math.ceil((Math.log(+params.min_temp) - Math.log(+params.start_temp)) / Math.log(+params.cool_coef)) });

            // main cycle depending on temperature
            while (currentTemp > +params.min_temp) {
                //inner cycle
                for (var i = 0; i < +params.innerCycle; i++) {
                    var neighbourCost = problem.evaluateMaximizationCost(currentNeighbour);
                    //next is better
                    if (currentCost < neighbourCost) {
                        currentConfiguration = currentNeighbour;
                        currentCost = neighbourCost;
                    }
                    // next is worse
                    else if (Math.random() < Math.exp((neighbourCost - currentCost) / currentTemp)) {
                            currentConfiguration = currentNeighbour;
                            currentCost = neighbourCost;
                        }
                    currentNeighbour = currentConfiguration.getNeighbour();
                    counter++;
                }
                currentTemp *= +params.cool_coef;
                this._bufferedReply.addMessageWithAutoFlush(problem.transformMaximizationToRealCost(currentCost));
            }
            this._bufferedReply.flush();
            return new __WEBPACK_IMPORTED_MODULE_3__common_Result_js__["a" /* default */](problem.getResult(currentConfiguration), problem.transformMaximizationToRealCost(currentCost), counter);
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
            var size = currentConfiguration.getSize();
            var conf,
                neigh = 0;
            var max = 0;

            var temperature = 100;

            // filling array with random transitions, more precisly with energies of those transitions (max and min price function)
            while (200 !== arrayOfEnergyStates.length) {
                conf = problem.transformMaximizationToRealCost(problem.evaluateMaximizationCost(currentConfiguration));
                neigh = problem.transformMaximizationToRealCost(problem.evaluateMaximizationCost(currentNeighbour));
                if (__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign___default()(conf) === __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign___default()(neigh) && __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_math_sign___default()(conf) === 1) {
                    newEnergyState = {
                        max: Math.max(conf, neigh),
                        min: Math.min(conf, neigh)
                    };
                    if (newEnergyState.max > max) max = newEnergyState.max > max;
                    arrayOfEnergyStates.push(newEnergyState);
                }

                currentConfiguration = currentNeighbour;
                currentNeighbour = currentConfiguration.getNeighbour();
            }

            temperature = max;
            //calculating temperature for which is the propability of accepting average worse state equals to wantedPropability
            while (Math.abs(wantedPropability - currentPropability) > 0.005) {
                maxSum = 0;
                minSum = 0;

                for (var i = 0; i < arrayOfEnergyStates.length; i++) {
                    maxSum += Math.exp(-arrayOfEnergyStates[i].max / temperature);
                    minSum += Math.exp(-arrayOfEnergyStates[i].min / temperature);
                }
                if (maxSum === 0 || minSum === 0) break;
                currentPropability = maxSum / minSum;
                if (currentPropability === 1) return 1;

                temperature = temperature * (-Math.log(currentPropability) / -Math.log(wantedPropability));
            }

            return Math.ceil(temperature);
        }
    }]);

    return AnnealingSolver;
}();

/***/ }),

/***/ "1kS7":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "2KxR":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "2QDH":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("NLm3"), __esModule: true };

/***/ }),

/***/ "2Zpo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_classResolver__ = __webpack_require__("/ShG");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__WorkerInterface__ = __webpack_require__("ybbF");



var methods = {
    work: function(data, params) {
        var job = new Job(data, params);
        job.run(params.methodParams[params.method.id]);
    },

    computeStartingTemp: function(data, problemId) {
        let params = {
            problem: { id: problemId },
            method: { id: 'annealing' }
        };
        let job = new Job(data, params);

        let result = job.method.computeStartingTemp(job.problem);

        workerInterface.reply('result', result);
    }
}

var workerInterface = new __WEBPACK_IMPORTED_MODULE_1__WorkerInterface__["a" /* WorkerInterface */](this, methods);

/**
 * Worker class for computing
 */
class Job {
    constructor(inputData, params) {
        let problemClass = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__services_classResolver__["a" /* getProblemClassFromId */])(params.problem.id);
        let methodClass = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__services_classResolver__["b" /* getMethodClassFromId */])(params.method.id);
        this.problem = (problemClass) ? new problemClass(inputData) : null;
        this.method = (methodClass) ? new methodClass(workerInterface) : null;
    }
    /**
     * Run the calculation based on selected method, problem, and method parameters
     * @param  {object} methodParams method parameters as object
     * @return {Result} result as a result class
     */
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

/***/ "3C/1":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("M6a0");
__webpack_require__("zQR9");
__webpack_require__("+tPU");
__webpack_require__("qCoq");
__webpack_require__("UvrK");
__webpack_require__("Xjd4");
__webpack_require__("bqnK");
module.exports = __webpack_require__("FeBl").Map;


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

/***/ "4WTo":
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__("NWt+");

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
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

/***/ "7Doy":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("EqjI");
var isArray = __webpack_require__("7UMu");
var SPECIES = __webpack_require__("dSzd")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
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

/***/ "9Bbf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__("kM2E");

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),

/***/ "9C8M":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__("evD5").f;
var create = __webpack_require__("Yobk");
var redefineAll = __webpack_require__("xH/j");
var ctx = __webpack_require__("+ZMJ");
var anInstance = __webpack_require__("2KxR");
var forOf = __webpack_require__("NWt+");
var $iterDefine = __webpack_require__("vIB/");
var step = __webpack_require__("EGZi");
var setSpecies = __webpack_require__("bRrM");
var DESCRIPTORS = __webpack_require__("+E39");
var fastKey = __webpack_require__("06OY").fastKey;
var validate = __webpack_require__("LIJb");
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
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

/***/ "ALrJ":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("+ZMJ");
var IObject = __webpack_require__("MU5D");
var toObject = __webpack_require__("sB3e");
var toLength = __webpack_require__("QRG4");
var asc = __webpack_require__("oeOm");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
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

/***/ "HpRW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__("kM2E");
var aFunction = __webpack_require__("lOnJ");
var ctx = __webpack_require__("+ZMJ");
var forOf = __webpack_require__("NWt+");

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),

/***/ "IGB4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Individual */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BinaryIndividual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return PermutationIndividual; });
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Random__ = __webpack_require__("RJON");







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
    }, {
        key: 'getGenotype',
        value: function getGenotype() {
            //abstract
        }
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
    }, {
        key: 'getGenotype',
        value: function getGenotype() {
            return this._bitArray;
        }
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

var PermutationIndividual = function (_Individual2) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(PermutationIndividual, _Individual2);

    function PermutationIndividual(permutation) {
        __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, PermutationIndividual);

        var _this2 = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, (PermutationIndividual.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(PermutationIndividual)).call(this));

        _this2._permutation = permutation;

        return _this2;
    }

    __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(PermutationIndividual, [{
        key: 'mutate',
        value: function mutate(mutationProb) {
            for (var i = 0; i < this._permutation.length; i++) {
                if (Math.random() < mutationProb) {
                    this._fitness = null;
                    //swap values but not with itself
                    var position = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__Random__["b" /* getRandomInt */])(0, this._permutation.length - 1);
                    if (position >= i) {
                        position++;
                    }
                    var temp = this._permutation[i];
                    this._permutation[i] = this._permutation[position];
                    this._permutation[position] = temp;
                }
            }
        }
    }, {
        key: 'getGenotype',
        value: function getGenotype() {
            return this._permutation;
        }
    }, {
        key: 'getArray',
        value: function getArray() {
            return this._permutation;
        }
    }, {
        key: 'getSize',
        value: function getSize() {
            return this._permutation.length;
        }
    }, {
        key: 'copy',
        value: function copy() {
            return new PermutationIndividual(this._permutation.map(function (x) {
                return x;
            }));
        }
    }]);

    return PermutationIndividual;
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
        key: 'check',
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
        key: '_check',
        value: function _check(bitArray) {
            var satisfied = 0;
            this._clausules.forEach(function (clausule) {
                if (clausule.check(bitArray)) satisfied++;
            });
            return satisfied;
        }

        /**
         * Returns fitness of selected configuration(BitArray)
         * @param  {class} bitArrayConfig BitArray of which fitness we want
         * @return {int}  calculated fitness of the configuration
         */

    }, {
        key: 'evaluateMaximizationCost',
        value: function evaluateMaximizationCost(bitArrayConfig) {
            if (bitArrayConfig === null) return -1;

            var bitArray = bitArrayConfig.getBitArray();

            var trueClauses = this._check(bitArray);
            if (trueClauses < this.params.numberOfClausules) return trueClauses;
            return this.params.numberOfClausules; // + getWeight(configuration);
        }
    }, {
        key: 'transformMaximizationToRealCost',
        value: function transformMaximizationToRealCost(maxCost) {
            return maxCost;
        }

        /**
         * Returns random, or all 0, configuration of SAT problem(BitArray configuration)
         * @param  {bool} random random or all 0
         * @return {class}  new BitArray class
         */

    }, {
        key: 'getConfiguration',
        value: function getConfiguration(random) {
            return new __WEBPACK_IMPORTED_MODULE_5__configurationTypes_BitArray__["a" /* BitArray */]({
                size: this.params.numberOfVariables,
                random: random
            });
        }

        // /**
        //  * Return price function value that will be displayed in graph
        //  * @param  {class} bitArrayConfig config for which we want the value for the graph
        //  * @return {int}  the returned value
        //  */
        // getProblemCost(bitArrayConfig){
        //   return this.getFitness(bitArrayConfig);
        // }

        /**
         * Returns the result of the config, in this case the config array
         * @param  {class} bitArrayConfig the configuration of which result we want
         * @return {Array} the bit array of the configuration
         */

    }, {
        key: 'getResult',
        value: function getResult(bitArrayConfig) {
            return bitArrayConfig.getBitArray();
        }
    }, {
        key: 'getType',
        value: function getType() {
            return __WEBPACK_IMPORTED_MODULE_6__Problem__["a" /* ProblemTypeEnum */].BINARY;
        }

        /**
         * Returns instance invalidity
         * @param  {string} instanceContent content of the instance
         * @return {boolean} is instance invalid
         */

    }, {
        key: 'isInvalidInstance',
        value: function isInvalidInstance(instanceContent) {
            instanceContent = instanceContent.split(/\s+/);

            if (instanceContent.length - 1 < 6) return { text: "Invalid number of parameters" };

            var noVariables = +instanceContent[2];
            var noClausules = +instanceContent[3];

            if (noVariables < 0) return { text: "Number of variables cant be negative" };
            if (noClausules < 0) return { text: "Number of clausules cant be negative" };

            if (noClausules > Math.pow(3, noVariables) - 1) return { text: "Number of clausules is at max: " + Math.pow(3, noVariables) - 1 };

            var clausules = [];
            var clausule = "";
            var clausulesCounter = 0;

            instanceContent.splice(0, 4);

            for (var i = 0; i < instanceContent.length; i++) {
                if (isNaN(instanceContent[i])) return { text: "Most contain only numbers, except for \"p cnf\"" };
            }

            for (var i = 0; i < instanceContent.length; i++) {
                if (noVariables < +instanceContent[i] || -noVariables > +instanceContent[i]) return { text: "Invalid variable in clasule: \"" + instanceContent[i] + "\"" };
                if (+instanceContent[i] !== 0) clausule += instanceContent[i] + " ";else {
                    clausulesCounter++;
                    if (clausules[clausule]) return { text: "Multiple same clausules: \"" + clausule + "0" + "\"" };
                    clausules[clausule] = 1;
                    clausule = "";
                }
            }

            if (clausulesCounter - 1 !== noClausules) return { text: "Number of clausules doesnt match the actual number of clausules" };

            return false; // valid instance
        }

        /**
         * Returns parameters of the instance
         * @param  {string} instanceContent content of the instance
         * @return {object} instance parameters
         */

    }, {
        key: 'resolveInstanceParams',
        value: function resolveInstanceParams(instanceContent) {
            var dataSet = instanceContent.split('\n').filter(function (row) {
                return row.trim()[0] !== 'c';
            });

            var params = dataSet[0].split(/(\s+)/).filter(function (x) {
                return x.trim().length > 0;
            }).splice(2, 2).map(function (param) {
                return parseInt(param);
            });

            return {
                noVariables: params[0],
                noClausules: params[1]
            };
        }
    }]);

    return SAT;
}(__WEBPACK_IMPORTED_MODULE_6__Problem__["b" /* Problem */]);

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

/***/ "LIJb":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("EqjI");
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


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

/***/ "NWt+":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("+ZMJ");
var call = __webpack_require__("msXi");
var isArrayIter = __webpack_require__("Mhyx");
var anObject = __webpack_require__("77Pl");
var toLength = __webpack_require__("QRG4");
var getIterFn = __webpack_require__("3fs2");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


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




/**
 * Class for storing the result of calculation
 */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectionEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TournamentSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RouletteSelection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Random__ = __webpack_require__("RJON");




var SelectionEnum = {
    TOURNAMENT: "Tournament",
    ROULETTE_RANK: "Roulette-rank",
    ROULETTE_LINEAR: "Roulette-linear"
};

var TournamentSelection = function () {
    function TournamentSelection(tournamentSize) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, TournamentSelection);

        this._tournamentSize = tournamentSize;
        this._smaller = Math.floor(this._tournamentSize);
        this._bigger = Math.ceil(this._tournamentSize);
        this._rest = this._tournamentSize - this._smaller;
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(TournamentSelection, [{
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
        value: function _findWinner(generation, tournamentSize) {
            var winner = this._selectRandomIndividual(generation);
            for (var i = 1; i < tournamentSize; i++) {
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

    return TournamentSelection;
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
                case SelectionEnum.ROULETTE_RANK:
                    rankSum = this._rankIndividuals(generation);
                    break;
                case SelectionEnum.ROULETTE_LINEAR:
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
                var rank = this.min + i * ((this.max - this.min) / (generation.length - 1));
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
                var scaledRank = this.min + (generation[i].getFitness() - fitMin) * ((this.max - this.min) / (fitMax - fitMin));
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
                this._Array = this.randomPermutation(options.size);
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
            // generate number sequence
            var permArray = new Array(size);
            for (var i = 0; i < size; i++) {
                permArray[i] = i;
            }
            // shuffle sequence
            for (var i = size; i > 1; --i) {
                var randPos = Math.floor(i * Math.random());
                var tmpStore = permArray[i - 1];
                permArray[i - 1] = permArray[randPos];
                permArray[randPos] = tmpStore;
            }
            return permArray;
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
        key: "evaluateMaximizationCost",
        value: function evaluateMaximizationCost(bitArrayConfig) {
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
    }, {
        key: "transformMaximizationToRealCost",
        value: function transformMaximizationToRealCost(maxCost) {
            return maxCost;
        }

        // /**
        //  * Return price function value that will be displayed in graph
        //  * @param  {class} bitArrayConfig config for which we want the value for the graph
        //  * @return {int}  the returned value
        //  */
        // getProblemCost(bitArrayConfig){
        //   return this.getFitness(bitArrayConfig);
        // }

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

        /**
         * Returns what type of configuration is this problem using
         * @return {enum} type of the problem(configuration type)
         */

    }, {
        key: "getType",
        value: function getType() {
            return __WEBPACK_IMPORTED_MODULE_6__Problem__["a" /* ProblemTypeEnum */].BINARY;
        }

        /**
         * Returns instance invalidity
         * @param  {string} instanceContent content of the instance
         * @return {boolean} is instance invalid
         */

    }, {
        key: "isInvalidInstance",
        value: function isInvalidInstance(instanceContent) {
            instanceContent = instanceContent.split(/\s+/);

            if (instanceContent.length - 1 < 4) return { text: "Invalid number of parameters" };

            for (var i = 0; i < instanceContent.length; i++) {
                if (isNaN(instanceContent[i])) return { text: "Most contain only numbers" };
                if (instanceContent[i] < 0) return { text: "Can not contain negative numbers" };
            }

            var noItems = +instanceContent[0];
            var capacity = +instanceContent[1];

            instanceContent.splice(0, 2);

            if (instanceContent.length - 1 !== noItems * 2) return { text: "Invalid number of items" };

            return false; // valid instance
        }

        /**
         * Returns parameters of the instance
         * @param  {string} instanceContent content of the instance
         * @return {object} instance parameters
         */

    }, {
        key: "resolveInstanceParams",
        value: function resolveInstanceParams(instanceContent) {
            instanceContent = instanceContent.split(/\s+/);

            return {
                noItems: +instanceContent[0],
                capacity: +instanceContent[1]
            };
        }
    }]);

    return Knapsack;
}(__WEBPACK_IMPORTED_MODULE_6__Problem__["b" /* Problem */]);

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
                _this._array[i][j] = +data[2 + i * _this._size + j];
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
        key: "evaluateMaximizationCost",
        value: function evaluateMaximizationCost(bitArrayConfig) {
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
    }, {
        key: "transformMaximizationToRealCost",
        value: function transformMaximizationToRealCost(maxCost) {
            return this._size - maxCost;
        }

        // /**
        //  * Return price function value that will be displayed in graph
        //  * @param  {class} bitArrayConfig config for which we want the value for the graph
        //  * @return {int}  the returned value
        //  */
        // getProblemCost(bitArrayConfig){
        //   return this._size - this.getFitness(bitArrayConfig);
        // }

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

        /**
         * Returns what type of configuration is this problem using
         * @return {enum} type of the problem(configuration type)
         */

    }, {
        key: "getType",
        value: function getType() {
            return __WEBPACK_IMPORTED_MODULE_6__Problem__["a" /* ProblemTypeEnum */].BINARY;
        }

        /**
         * Returns instance invalidity
         * @param  {string} instanceContent content of the instance
         * @return {boolean} is instance invalid
         */

    }, {
        key: "isInvalidInstance",
        value: function isInvalidInstance(instanceContent) {
            instanceContent = instanceContent.split(/\s+/);

            if (instanceContent.length - 1 < 2) return { text: "Invalid number of parameters" };

            var size = instanceContent[0];

            for (var i = 0; i < instanceContent.length; i++) {
                if (isNaN(instanceContent[i])) return { text: "Most contain only numbers" };
                if (instanceContent[i] < 0) return { text: "Can not contain negative numbers" };
            }

            instanceContent.splice(0, 2);

            if (instanceContent.length - 1 !== size * size) return { text: "Invalid array" };

            return false; // valid instance
        }

        /**
         * Returns parameters of the instance
         * @param  {string} instanceContent content of the instance
         * @return {object} instance parameters
         */

    }, {
        key: "resolveInstanceParams",
        value: function resolveInstanceParams(instanceContent) {
            instanceContent = instanceContent.split(/\s+/);

            return {
                size: +instanceContent[0],
                noEdges: +instanceContent[1]
            };
        }
    }]);

    return MinimalVertexCover;
}(__WEBPACK_IMPORTED_MODULE_6__Problem__["b" /* Problem */]);

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
        key: 'solve',
        value: function solve(problem, params) {
            //set params
            this.problem = problem;

            var populationSize = params.populationSize;
            var noGenerations = params.noGenerations;
            switch (params.selectionType) {
                case __WEBPACK_IMPORTED_MODULE_5__Selection__["a" /* SelectionEnum */].ROULETTE_RANK:
                    this.selection = new __WEBPACK_IMPORTED_MODULE_5__Selection__["b" /* RouletteSelection */](__WEBPACK_IMPORTED_MODULE_5__Selection__["a" /* SelectionEnum */].ROULETTE_RANK, params.scaleMin, params.scaleMax);
                    break;
                case __WEBPACK_IMPORTED_MODULE_5__Selection__["a" /* SelectionEnum */].ROULETTE_LINEAR:
                    this.selection = new __WEBPACK_IMPORTED_MODULE_5__Selection__["b" /* RouletteSelection */](__WEBPACK_IMPORTED_MODULE_5__Selection__["a" /* SelectionEnum */].ROULETTE_LINEAR, params.scaleMin, params.scaleMax);
                    break;
                case __WEBPACK_IMPORTED_MODULE_5__Selection__["a" /* SelectionEnum */].TOURNAMENT:
                    this.selection = new __WEBPACK_IMPORTED_MODULE_5__Selection__["c" /* TournamentSelection */](params.tournamentSize);
                    break;
                default:
                    throw new Error("Selection type " + params.selectionType + " is not supported.");
            }
            var crossoverProb = params.crossoverProb;
            switch (params.crossoverType) {
                case __WEBPACK_IMPORTED_MODULE_6__Crossover__["a" /* CrossoverEnum */].ONE_POINT:
                    this.crossover = new __WEBPACK_IMPORTED_MODULE_6__Crossover__["b" /* OnePointCrossover */]();
                    break;
                case __WEBPACK_IMPORTED_MODULE_6__Crossover__["a" /* CrossoverEnum */].TWO_POINT:
                    this.crossover = new __WEBPACK_IMPORTED_MODULE_6__Crossover__["c" /* TwoPointCrossover */]();
                    break;
                case __WEBPACK_IMPORTED_MODULE_6__Crossover__["a" /* CrossoverEnum */].UNIFORM:
                    this.crossover = new __WEBPACK_IMPORTED_MODULE_6__Crossover__["d" /* UniformCrossover */]();
                    break;
                case __WEBPACK_IMPORTED_MODULE_6__Crossover__["a" /* CrossoverEnum */].ORDER:
                    this.crossover = new __WEBPACK_IMPORTED_MODULE_6__Crossover__["e" /* OrderCrossover */]();
                    break;
                case __WEBPACK_IMPORTED_MODULE_6__Crossover__["a" /* CrossoverEnum */].PMX:
                    this.crossover = new __WEBPACK_IMPORTED_MODULE_6__Crossover__["f" /* PartiallyMatchedCrossover */]();
                    break;
                case __WEBPACK_IMPORTED_MODULE_6__Crossover__["a" /* CrossoverEnum */].CYCLE:
                    this.crossover = new __WEBPACK_IMPORTED_MODULE_6__Crossover__["g" /* CycleCrossover */]();
                    break;
                default:
                    throw new Error("Crossover type " + params.selectionType + " is not supported.");

            }
            var elitism = params.elitism;

            this.result = [];
            this.bestFitness = Number.NEGATIVE_INFINITY;
            this.bestCost = 0;
            this.counter = 0;

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

            return new __WEBPACK_IMPORTED_MODULE_3__common_Result__["a" /* default */](problem.getResult(this.result), this.bestCost, this.counter);
        }
    }, {
        key: '_initGeneration',
        value: function _initGeneration(populationSize) {
            var generation = [];
            for (var i = 0; i < populationSize; i++) {
                generation.push(this.problem.createNewIndividual());
            }
            this._evaluateGeneration(generation);
            return generation;
        }
    }, {
        key: '_evaluateGeneration',
        value: function _evaluateGeneration(generation) {
            var average = 0;
            for (var i = 0; i < generation.length; i++) {
                this.problem.evaluateIndividual(generation[i]);
                average += this.problem.transformMaximizationToRealCost(generation[i].getFitness());
            }
            average = average / generation.length;
            generation.sort(function (a, b) {
                return a.getFitness() - b.getFitness();
            });

            var bestCost = this.problem.transformMaximizationToRealCost(generation[generation.length - 1].getFitness());

            this._bufferedReply.addMessageWithAutoFlush({
                worst: this.problem.transformMaximizationToRealCost(generation[0].getFitness()),
                average: average,
                mean: this.problem.transformMaximizationToRealCost(generation[Math.floor(generation.length / 2)].getFitness()),
                best: bestCost
            });
            //update best solution
            if (this.bestFitness < generation[generation.length - 1].getFitness()) {
                this.bestFitness = generation[generation.length - 1].getFitness();
                this.bestCost = bestCost;
                this.result = generation[generation.length - 1];
            }
        }
    }, {
        key: '_doNewGeneration',
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

/***/ "UvrK":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__("kM2E");

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__("m9gC")('Map') });


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

/***/ "Xjd4":
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__("9Bbf")('Map');


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__("Zx67");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__("zwoO");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__("Pf15");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__configurationTypes_Permutation__ = __webpack_require__("PH3o");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Problem__ = __webpack_require__("i4sz");









var TravellingSalesman = function (_Problem) {
    __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(TravellingSalesman, _Problem);

    /**
     * Constructor, construct the class from the data file selected.
     * Calculates n:n distance between nodes using Floyd-Warshall algorithm
     * @param {string} data instance of a problem coded as string
     */
    function TravellingSalesman(data) {
        __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, TravellingSalesman);

        var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (TravellingSalesman.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(TravellingSalesman)).call(this));

        data = data.split(/\s+/);

        _this._type = data[0];
        _this._noNodes = +data[1];
        _this._noEdges = +data[2];
        _this._noNodesToVisit = +data[3];
        _this._maxPrice = +data[4];
        _this._nodesToVisit = [];

        data.splice(0, 5);

        if (_this._type === "Shortest") {
            for (var i = 0; i < _this._noNodesToVisit; i++) {
                _this._nodesToVisit.push(+data[i]);
            }

            data.splice(0, _this._noNodesToVisit);
        }

        _this._distanceArray = new Array(_this._noNodes);
        _this._pathArray = new Array(_this._noNodes);

        for (var i = 0; i < _this._noNodes; i++) {
            _this._distanceArray[i] = new Array(_this._noNodes);
            _this._pathArray[i] = new Array(_this._noNodes);
        }

        // initializing arrays, distance array to inf if no edge, and path array to null if no edge
        for (var i = 0; i < _this._noNodes; i++) {
            for (var j = 0; j < _this._noNodes; j++) {
                if (+data[i * _this._noNodes + j] !== 0 || i === j) {
                    _this._distanceArray[i][j] = +data[i * _this._noNodes + j];
                    _this._pathArray[i][j] = j;
                } else {
                    _this._distanceArray[i][j] = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_max_safe_integer___default.a;
                    _this._pathArray[i][j] = null;
                }
            }
        }
        var start, end;
        // if shortest calculate shortest path using floyd warshall
        if (_this._type === "Shortest") {
            if (_this._noNodes !== _this._noNodesToVisit) _this._dijkstra();else _this._floydWarshall();
        }
        return _this;
    }

    /**
     * Floyd warshall algorithm to calculate n:n distances between nodes(vertexes), saves it to _distanceArray, _pathArray for path reconstruction
     * @return {null}
     */


    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(TravellingSalesman, [{
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
         * Dijkstra algorithm to caculate path from nodes to visit to all other nodes
         * @return {[type]} [description]
         */

    }, {
        key: "_dijkstra",
        value: function _dijkstra() {
            var distanceArray = [];
            var pathArray = [];
            var nodes = [];
            var shortest;
            var chosenNode;

            var distances = this._distanceArray;
            // for all nodes
            for (var i = 0; i < this._noNodesToVisit; i++) {
                //initialization
                for (var j = 0; j < this._noNodes; j++) {
                    distanceArray[j] = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_max_safe_integer___default.a;
                    pathArray[j] = null;
                    nodes.push(j);
                }

                distanceArray[this._nodesToVisit[i]] = 0;
                //while there are unvisited nodes
                while (nodes.length > 0) {
                    shortest = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_number_max_safe_integer___default.a;
                    for (var j = 0; j < nodes.length; j++) {
                        if (distanceArray[nodes[j]] < shortest) {
                            shortest = distanceArray[nodes[j]];
                            chosenNode = nodes[j];
                        }
                    }
                    //remove node with shortest path
                    nodes.splice(nodes.indexOf(chosenNode), 1);
                    // update shortest path and array for path rebuilding
                    for (var j = 0; j < this._noNodes; j++) {
                        if (shortest + distances[chosenNode][j] < distanceArray[j]) {
                            distanceArray[j] = shortest + distances[chosenNode][j];
                            pathArray[j] = chosenNode;
                        }
                    }
                }
                pathArray[this._nodesToVisit[i]] = this._nodesToVisit[i];

                // rebuild all paths and update _pathArray and _distanceArray arrays
                var currentNode;
                for (var k = 0; k < pathArray.length; k++) {
                    currentNode = k;
                    while (pathArray[currentNode] !== this._nodesToVisit[i]) {
                        this._pathArray[pathArray[currentNode]][k] = currentNode;
                        currentNode = pathArray[currentNode];
                    }
                    this._pathArray[this._nodesToVisit[i]][k] = currentNode;
                    this._distanceArray[this._nodesToVisit[i]][k] = distanceArray[k];
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
            var permutation = this._bindToNodes(permutationConfig);

            var path = [permutation[0]];

            for (var i = 1; i < permutation.length; i++) {
                while (permutation[i - 1] != permutation[i]) {
                    permutation[i - 1] = this._pathArray[permutation[i - 1]][permutation[i]];
                    path.push(permutation[i - 1]);
                }
            }
            path.push(path[0]);

            return path;
        }

        /**
         * Returns fitness of selected configuration(Permutation)
         * @param  {class} permutationConfig Permutation of which fitness we want
         * @return {int}  calculated fitness of the configuration
         */

    }, {
        key: "evaluateMaximizationCost",
        value: function evaluateMaximizationCost(permutationConfig) {
            var price = 0;
            var permutation = permutationConfig.getArray();

            if (this._type === "Shortest") permutation = this._bindToNodes(permutation);

            for (var i = 0; i < permutation.length - 1; i++) {
                price -= this._distanceArray[permutation[i]][permutation[i + 1]];
            }

            price -= this._distanceArray[permutation[permutation.length - 1]][permutation[0]];

            return price;
        }
    }, {
        key: "transformMaximizationToRealCost",
        value: function transformMaximizationToRealCost(maxCost) {
            return -maxCost;
        }

        // /**
        //  * Return price function value that will be displayed in graph
        //  * @param  {class} bitArrayConfig config for which we want the value for the graph
        //  * @return {int}  the returned value
        //  */
        // getProblemCost(bitArrayConfig){
        //   return -this.getFitness(bitArrayConfig);
        // }

        /**
         * Returns random, or sorted starting from 0, configuration of traveling salesman problem(Permutation configuration)
         * @param  {bool} random random or sorted staring with 0
         * @return {class}  new BitArray class
         */

    }, {
        key: "getConfiguration",
        value: function getConfiguration(random) {
            return new __WEBPACK_IMPORTED_MODULE_6__configurationTypes_Permutation__["a" /* Permutation */]({
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
            if (this._type === "Hamiltonian") return permutationConfig.getArray();

            return this.rebuildPath(permutationConfig.getArray());
        }

        /**
         * Returns what type of configuration is this problem using
         * @return {enum} type of the problem(configuration type)
         */

    }, {
        key: "getType",
        value: function getType() {
            return __WEBPACK_IMPORTED_MODULE_7__Problem__["a" /* ProblemTypeEnum */].PERMUTATION;
        }

        /**
         * Returns instance invalidity
         * @param  {string} instanceContent content of the instance
         * @return {boolean} is instance invalid
         */

    }, {
        key: "isInvalidInstance",
        value: function isInvalidInstance(instanceContent) {
            instanceContent = instanceContent.split(/\s+/);

            var type = instanceContent[0];

            if (type !== "Hamiltonian" && type !== "Shortest") return { text: "TSP type not specified" };

            var noNodes = +instanceContent[1];
            var noEdges = +instanceContent[2];
            var noNodesToVisit = +instanceContent[3];
            var maxValue = +instanceContent[4];

            instanceContent.splice(0, 1);

            for (var i = 0; i < instanceContent.length; i++) {
                if (isNaN(instanceContent[i])) return { text: "Most contain only numbers" };
                if (+instanceContent[i] < 0) return { text: "Can not contain negative numbers" };
            }

            if (noNodesToVisit > noNodes) return { text: "Number of nodes to visit cant be higher than number of nodes" };
            if (noEdges > noNodes * (noNodes - 1) / 2) return { text: "Number of edges cant be higher than (number of nodes * (number of nodes - 1)) / 2 becasue graph is not oriented." };
            instanceContent.splice(0, 4);

            if (type === "Hamiltonian") {
                if (instanceContent.length - 1 !== noNodes * noNodes) return { text: "Invalid array" };
                if (noNodes !== noNodesToVisit) return { text: "Number of nodes must be equal to number of nodes to visit for Hamiltonian type" };
                if (noEdges !== noNodes * (noNodes - 1) / 2) return { text: "Number of edges must be equal to (number of nodes * (number of nodes - 1)) / 2" };

                for (var i = 0; i < noNodes * noNodes; i++) {
                    if (i % (noNodes + 1) !== 0 && +instanceContent[i] === 0) return { text: "Graph must be complete" };
                }
            } else {
                var array = new Array(noNodes);
                var numberOfEdges = 0;

                if (noEdges < noNodes - 1) return { text: "Number of edges must be atleast number of nodes - 1" };

                for (var i = 0; i < noNodesToVisit; i++) {
                    if (+instanceContent[i] > noNodes - 1) return { text: "Node you want to visit doesnt exist: \"" + instanceContent[i] + "\". Must be lower than number of nodes - 1" };
                }

                for (var i = 1; i < noNodesToVisit; i++) {
                    if (+instanceContent[i - 1] > +instanceContent[i]) return { text: "Nodes to visit must be sorted in ascending order" };
                    if (+instanceContent[i - 1] === +instanceContent[i]) return { text: "Nodes to visit cant contaion duplicates" };
                }

                if (instanceContent.length - 1 !== noNodes * noNodes + noNodesToVisit) return { text: "Invalid array size, or nodes to visit size" };

                instanceContent.splice(0, noNodesToVisit);

                for (var i = 0; i < noNodes; i++) {
                    array[i] = new Array(noNodes);
                }

                for (var i = 0; i < noNodes; i++) {
                    for (var j = 0; j < noNodes; j++) {
                        array[i][j] = +instanceContent[i * noNodes + j];
                        if (array[i][j]) numberOfEdges++;
                    }
                }
                if (numberOfEdges / 2 !== noEdges) return { text: "Number of edges is not correct" };
                if (!TravellingSalesman._isGraphStronglyConnected(array)) return { text: "Graph must be strongly connected" };
            }

            for (var i = 0; i < noNodes * noNodes; i++) {
                if (+instanceContent[i] > maxValue) return { text: "Edge weight cant exceed maximum edge weight" };
                if (i % (noNodes + 1) === 0 && +instanceContent[i] !== 0) return { text: "Diagonal must contain only 0" };
            }

            return false; // valid instance
        }

        /**
         * Check if graph is connected
         * @param  {Array}  array graph as an 2D array
         * @return {Boolean}  true if connected, false if not
         */

    }, {
        key: "resolveInstanceParams",


        /**
         * Returns parameters of the instance
         * @param  {string} instanceContent content of the instance
         * @return {object} instance parameters
         */
        value: function resolveInstanceParams(instanceContent) {
            instanceContent = instanceContent.split(/\s+/);

            return {
                type: instanceContent[0],
                noNodes: +instanceContent[1],
                noEdges: +instanceContent[2],
                noNodesToVisit: +instanceContent[3],
                maxPrice: +instanceContent[4]
            };
        }
    }], [{
        key: "_isGraphStronglyConnected",
        value: function _isGraphStronglyConnected(array) {
            var connected = [];
            var opened = [];

            connected.push(0);
            opened.push(0);
            //while there are open vertices to check
            while (opened.length > 0) {
                for (var k = 0; k < array.length; k++) {
                    //if theres an edge, and the vertice wasnt visited yet
                    if (array[opened[0]][k] && !connected.includes(k)) {
                        connected.push(k);
                        opened.push(k);
                        if (array[opened[0]][k] !== array[k][opened[0]]) return false;
                    }
                }
                // if all vertices are visited the graph is connected
                if (connected.length === array.length) return true;
                //remove last visited vertice
                opened.shift();
            }
            return false;
        }
    }]);

    return TravellingSalesman;
}(__WEBPACK_IMPORTED_MODULE_7__Problem__["b" /* Problem */]);

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

/***/ "bRrM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7KvD");
var core = __webpack_require__("FeBl");
var dP = __webpack_require__("evD5");
var DESCRIPTORS = __webpack_require__("+E39");
var SPECIES = __webpack_require__("dSzd")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "bqnK":
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__("HpRW")('Map');


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
            return this.problem.evaluateMaximizationCost(state);
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
            if (set[configuration.toString()]) {
                // console.log(this.counter);
                this.tabuCounter++;
            }
            return set[configuration.toString()];
        }
    }, {
        key: '_process',
        value: function _process(iterationLimit, tabuSize, tabuSizeShort) {
            var state = this.problem.getConfiguration(); // initial state
            var stateCost = this._getCost(state); // initial state cost
            var sBest = state; // initial best found state
            var sBestCost = stateCost; // initial best found state cost
            var tabuStates = []; // Queue
            var tabuStatesSearch = {}; // HashSet
            var tabuChanges = []; // Queue

            // tabu iterations
            for (var n = 0; n < iterationLimit; n++) {
                this._bufferedReply.addMessageWithAutoFlush(this.problem.transformMaximizationToRealCost(stateCost));

                // init for this loop
                var bestCandidate = null;
                var bestCandidateCost = this._getCost(bestCandidate);
                var bestCandidateIndex = -1;
                var tabuBestCandidate = null;
                var tabuBestCandidateCost = this._getCost(tabuBestCandidate);
                var tabuBestCandidateIndex = -1;

                // checking neighbours
                for (var i = 0; i < state.getSize(); i++) {
                    this.counter++;

                    var sCandidate = state.getNeighbour(i);
                    var sCandidateCost = this._getCost(sCandidate);

                    // check change for tabu and if it is tabu, check if we dont miss the best found state
                    if (tabuChanges.indexOf(i) !== -1 && sCandidateCost < sBestCost) continue;

                    // is current candidate better than best candidate in this step?
                    if (sCandidateCost >= bestCandidateCost) {
                        // is current candidate tabu?
                        if (!this._containsSearch(tabuStatesSearch, sCandidate)) {
                            bestCandidate = sCandidate;
                            bestCandidateCost = sCandidateCost;
                            bestCandidateIndex = i;
                        }
                        // if it is, remember the least tabu candidate
                        else if (this._compareIndexesOf(tabuStates, sCandidate, tabuBestCandidate) > 0) {
                                tabuBestCandidate = sCandidate;
                                tabuBestCandidateCost = sCandidateCost;
                                tabuBestCandidateIndex = i;
                            }
                    }
                }

                // all candidates are tabu
                if (bestCandidateIndex === -1) {
                    // there are non even tabu candidates, we have nowhere to go
                    if (tabuBestCandidateIndex === -1) {
                        // console.log("-- no candidates --");
                    } else {
                        state = tabuBestCandidate;
                        stateCost = tabuBestCandidateCost;
                        bestCandidateIndex = tabuBestCandidateIndex;
                    }
                } else {
                    // normal situation, not tabu state
                    state = bestCandidate;
                    stateCost = bestCandidateCost;
                }

                // keep best state found up to date
                if (stateCost > sBestCost) {
                    sBest = state;
                    sBestCost = stateCost;
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
            this._bufferedReply.addMessage(this.problem.transformMaximizationToRealCost(stateCost)).flush();

            return sBest;
        }
    }, {
        key: 'solve',
        value: function solve(problem, params) {
            this.problem = problem;
            this.counter = 0;
            this.tabuCounter = 0;

            var iterationLimit = params.iterationLimit;
            var tabuSize = params.tabuSize;
            var tabuSizeShort = params.tabuSizeShort;

            // initial message to set up the interface for the computation
            this._workerInterface.reply('init', { numberOfIterations: iterationLimit });

            var best = this._process(iterationLimit, tabuSize, tabuSizeShort);

            // console.log('tabu checks:', this.tabuCounter);

            // return Result class managing data format
            return new __WEBPACK_IMPORTED_MODULE_2__common_Result_js__["a" /* default */](problem.getResult(best), this.problem.transformMaximizationToRealCost(this.problem.evaluateMaximizationCost(best)), this.counter);
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



/**
 * Class used to reply using a buffer, flush the buffer on time or on call. Sends info to graph.
 */
var BufferedReply = function () {
    function BufferedReply(workerInterface, handlerMethod, minFlushDelay) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, BufferedReply);

        this._workerInterface = workerInterface;
        this._handlerMethod = handlerMethod;
        this._minFlushDelay = minFlushDelay || 100;
        this._buffer = [];
    }

    /**
     * Check if its time to flush the buffer
     * @return {Boolean} time to flush or not
     */


    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(BufferedReply, [{
        key: "_isTimeToFlush",
        value: function _isTimeToFlush() {
            if (!this._lastFlush || performance.now() - this._lastFlush > this._minFlushDelay) {
                this._lastFlush = performance.now();
                return true;
            }
            return false;
        }

        /**
         * Add new message to the buffer
         * @param {object} content content of the message
         * @return {object} return this
         */

    }, {
        key: "addMessage",
        value: function addMessage(content) {
            this._buffer.push(content);

            return this;
        }

        /**
         * Flush all the messages from the buffer
         * @return {object} return this
         */

    }, {
        key: "flush",
        value: function flush() {
            if (this._buffer.length === 0) return this;

            this._workerInterface.reply(this._handlerMethod, this._buffer);
            this._buffer = [];

            return this;
        }

        /**
         * Add new message and calls flush function
         * @param {object} content content of the added message
         */

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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProblemTypeEnum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Problem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__("Zrlr");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__("wxAW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__methods_genetic_Individual__ = __webpack_require__("IGB4");




var ProblemTypeEnum = {
    BINARY: "binary",
    PERMUTATION: "permutation"
};

var Problem = function () {
    function Problem() {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Problem);

        // abstract
        if (this.constructor === Problem) {
            throw new TypeError('Abstract class "Problem" cannot be instantiated directly.');
        }
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Problem, [{
        key: "createNewIndividual",
        value: function createNewIndividual() {
            switch (this.getType()) {
                case ProblemTypeEnum.BINARY:
                    return new __WEBPACK_IMPORTED_MODULE_2__methods_genetic_Individual__["a" /* BinaryIndividual */](this.getConfiguration(true).getBitArray());
                case ProblemTypeEnum.PERMUTATION:
                    return new __WEBPACK_IMPORTED_MODULE_2__methods_genetic_Individual__["b" /* PermutationIndividual */](this.getConfiguration(true).getArray());
                default:
                    throw new TypeError('This type of problem not supported.');
            }
        }
    }, {
        key: "evaluateIndividual",
        value: function evaluateIndividual(individual) {
            if (individual.getFitness() === null) {
                individual.setFitness(this.evaluateMaximizationCost(individual));
            }
        }
    }, {
        key: "evaluateMaximizationCost",
        value: function evaluateMaximizationCost(config) {
            // abstract
        }
    }, {
        key: "transformMaximizationToRealCost",
        value: function transformMaximizationToRealCost(maxCost) {
            //abstract
        }
    }, {
        key: "getType",
        value: function getType() {
            // abstract
        }
    }, {
        key: "getConfiguration",
        value: function getConfiguration(random) {
            // abstract
        }
    }, {
        key: "getResult",
        value: function getResult() {
            // abstract
        }
    }, {
        key: "isInvalidInstance",
        value: function isInvalidInstance() {
            // abstract static
        }
    }, {
        key: "resolveInstanceParams",
        value: function resolveInstanceParams() {
            // abstract static
        }
    }]);

    return Problem;
}();

/***/ }),

/***/ "ifoU":
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__("3C/1"), __esModule: true };

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

/***/ "m9gC":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__("RY/4");
var from = __webpack_require__("4WTo");
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
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

/***/ "oeOm":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("7Doy");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
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

/***/ "qCoq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__("9C8M");
var validate = __webpack_require__("LIJb");
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__("qo66")(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


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

/***/ "qo66":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7KvD");
var $export = __webpack_require__("kM2E");
var meta = __webpack_require__("06OY");
var fails = __webpack_require__("S82l");
var hide = __webpack_require__("hJx8");
var redefineAll = __webpack_require__("xH/j");
var forOf = __webpack_require__("NWt+");
var anInstance = __webpack_require__("2KxR");
var isObject = __webpack_require__("EqjI");
var setToStringTag = __webpack_require__("e6n0");
var dP = __webpack_require__("evD5").f;
var each = __webpack_require__("ALrJ")(0);
var DESCRIPTORS = __webpack_require__("+E39");

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
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

/***/ "xH/j":
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__("hJx8");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


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


/**
 * Class used for communication between worker and worker manager
 */
var WorkerInterface = function () {
    function WorkerInterface(context, methods, defaultMethod) {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, WorkerInterface);

        this._context = context;
        this._methods = methods;
        this._defaultMethod = defaultMethod;
    }
    /**
     * Call post message function and transforms the arguments to object that can be send using this function
     * @return {[type]} [description]
     */


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
        /**
         * Event called when this class receives a message, calls method based on the received message
         * @param  {event} event the message received
         * @return {null}  doesnt return anything
         */

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
//# sourceMappingURL=432e8ad25fcf6a6ab367.worker.js.map