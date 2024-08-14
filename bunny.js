"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function")
      for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
        key = keys[i];
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: ((k) => from[k]).bind(null, key), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/cjs.js
  var require_cjs = __commonJS({
    "node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/cjs.js"(exports, module) {
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __export2 = function(target, all) {
        for (var name in all)
          __defProp2(target, name, {
            get: all[name],
            enumerable: true
          });
      };
      var __copyProps2 = function(to, from, except, desc) {
        if (from && typeof from === "object" || typeof from === "function") {
          var _loop2 = function(key2) {
            if (!__hasOwnProp2.call(to, key2) && key2 !== except)
              __defProp2(to, key2, {
                get: function() {
                  return from[key2];
                },
                enumerable: !(desc = __getOwnPropDesc2(from, key2)) || desc.enumerable
              });
          };
          for (var key of __getOwnPropNames2(from))
            _loop2(key);
        }
        return to;
      };
      var __toCommonJS2 = function(mod) {
        return __copyProps2(__defProp2({}, "__esModule", {
          value: true
        }), mod);
      };
      var src_exports2 = {};
      __export2(src_exports2, {
        after: function() {
          return after2;
        },
        before: function() {
          return before3;
        },
        instead: function() {
          return instead4;
        },
        unpatchAll: function() {
          return unpatchAll;
        }
      });
      module.exports = __toCommonJS2(src_exports2);
      var patchTypes = [
        "a",
        "b",
        "i"
      ];
      var patchedObjects = /* @__PURE__ */ new Map();
      function hook_default(funcName, funcParent, funcArgs, ctxt, isConstruct) {
        var patch = patchedObjects.get(funcParent)?.[funcName];
        if (!patch)
          return isConstruct ? Reflect.construct(funcParent[funcName], funcArgs, ctxt) : funcParent[funcName].apply(ctxt, funcArgs);
        for (var hook of patch.b.values()) {
          var maybefuncArgs = hook.call(ctxt, funcArgs);
          if (Array.isArray(maybefuncArgs))
            funcArgs = maybefuncArgs;
        }
        var workingRetVal = [
          ...patch.i.values()
        ].reduce(
          function(prev, current) {
            return function(...args) {
              return current.call(ctxt, args, prev);
            };
          },
          // This calls the original function
          function(...args) {
            return isConstruct ? Reflect.construct(patch.o, args, ctxt) : patch.o.apply(ctxt, args);
          }
        )(...funcArgs);
        for (var hook1 of patch.a.values())
          workingRetVal = hook1.call(ctxt, funcArgs, workingRetVal) ?? workingRetVal;
        return workingRetVal;
      }
      function unpatch(funcParent, funcName, hookId, type) {
        var patchedObject = patchedObjects.get(funcParent);
        var patch = patchedObject?.[funcName];
        if (!patch?.[type].has(hookId))
          return false;
        patch[type].delete(hookId);
        if (patchTypes.every(function(t) {
          return patch[t].size === 0;
        })) {
          var success = Reflect.defineProperty(funcParent, funcName, {
            value: patch.o,
            writable: true,
            configurable: true
          });
          if (!success)
            funcParent[funcName] = patch.o;
          delete patchedObject[funcName];
        }
        if (Object.keys(patchedObject).length == 0)
          patchedObjects.delete(funcParent);
        return true;
      }
      function unpatchAll() {
        for (var [parentObject, patchedObject] of patchedObjects.entries())
          for (var funcName in patchedObject)
            for (var hookType of patchTypes)
              for (var hookId of patchedObject[funcName]?.[hookType].keys() ?? [])
                unpatch(parentObject, funcName, hookId, hookType);
      }
      var getPatchFunc_default = function(patchType) {
        return function(funcName, funcParent, callback, oneTime = false) {
          if (typeof funcParent[funcName] !== "function")
            throw new Error(`${funcName} is not a function in ${funcParent.constructor.name}`);
          if (!patchedObjects.has(funcParent))
            patchedObjects.set(funcParent, /* @__PURE__ */ Object.create(null));
          var parentInjections = patchedObjects.get(funcParent);
          if (!parentInjections[funcName]) {
            var origFunc = funcParent[funcName];
            parentInjections[funcName] = {
              o: origFunc,
              b: /* @__PURE__ */ new Map(),
              i: /* @__PURE__ */ new Map(),
              a: /* @__PURE__ */ new Map()
            };
            var runHook = function(ctxt, args, construct) {
              var ret = hook_default(funcName, funcParent, args, ctxt, construct);
              if (oneTime)
                unpatchThisPatch();
              return ret;
            };
            var replaceProxy = new Proxy(origFunc, {
              apply: function(_, ctxt, args) {
                return runHook(ctxt, args, false);
              },
              construct: function(_, args) {
                return runHook(origFunc, args, true);
              },
              get: function(target, prop, receiver) {
                return prop == "toString" ? origFunc.toString.bind(origFunc) : Reflect.get(target, prop, receiver);
              }
            });
            var success = Reflect.defineProperty(funcParent, funcName, {
              value: replaceProxy,
              configurable: true,
              writable: true
            });
            if (!success)
              funcParent[funcName] = replaceProxy;
          }
          var hookId = Symbol();
          var unpatchThisPatch = function() {
            return unpatch(funcParent, funcName, hookId, patchType);
          };
          parentInjections[funcName][patchType].set(hookId, callback);
          return unpatchThisPatch;
        };
      };
      var before3 = getPatchFunc_default("b");
      var instead4 = getPatchFunc_default("i");
      var after2 = getPatchFunc_default("a");
    }
  });

  // src/core/polyfills/promise-all-settled.ts
  var require_promise_all_settled = __commonJS({
    "src/core/polyfills/promise-all-settled.ts"() {
      "use strict";
      var allSettledFulfill = function(value) {
        return {
          status: "fulfilled",
          value
        };
      };
      var allSettledReject = function(reason) {
        return {
          status: "rejected",
          reason
        };
      };
      var mapAllSettled = function(item) {
        return Promise.resolve(item).then(allSettledFulfill, allSettledReject);
      };
      Promise.allSettled ??= function(iterator) {
        return Promise.all(Array.from(iterator).map(mapAllSettled));
      };
    }
  });

  // src/lib/api/native/modules.ts
  var modules_exports = {};
  __export(modules_exports, {
    BundleUpdaterManager: () => BundleUpdaterManager,
    ClientInfoManager: () => ClientInfoManager,
    DeviceManager: () => DeviceManager,
    FileManager: () => FileManager,
    MMKVManager: () => MMKVManager,
    ThemeManager: () => ThemeManager
  });
  var nmp, MMKVManager, FileManager, ClientInfoManager, DeviceManager, BundleUpdaterManager, ThemeManager;
  var init_modules = __esm({
    "src/lib/api/native/modules.ts"() {
      "use strict";
      nmp = window.nativeModuleProxy;
      MMKVManager = nmp.MMKVManager;
      FileManager = nmp.DCDFileManager ?? nmp.RTNFileManager;
      ClientInfoManager = nmp.InfoDictionaryManager ?? nmp.RTNClientInfoManager;
      DeviceManager = nmp.DCDDeviceManager ?? nmp.RTNDeviceManager;
      ({ BundleUpdaterManager } = nmp);
      ThemeManager = nmp.RTNThemeManager ?? nmp.DCDTheme;
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_class_call_check.js
  function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor))
      throw new TypeError("Cannot call a class as a function");
  }
  var init_class_call_check = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_class_call_check.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_set_prototype_of.js
  function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _set_prototype_of(o, p);
  }
  var init_set_prototype_of = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_set_prototype_of.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_inherits.js
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass)
      _set_prototype_of(subClass, superClass);
  }
  var init_inherits = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_inherits.js"() {
      init_set_prototype_of();
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_is_native_reflect_construct.js
  function _is_native_reflect_construct() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
      return false;
    if (Reflect.construct.sham)
      return false;
    if (typeof Proxy === "function")
      return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
      return true;
    } catch (e) {
      return false;
    }
  }
  var init_is_native_reflect_construct = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_is_native_reflect_construct.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_construct.js
  function _construct(Parent, args, Class) {
    if (_is_native_reflect_construct())
      _construct = Reflect.construct;
    else {
      _construct = function construct(Parent2, args2, Class2) {
        var a = [
          null
        ];
        a.push.apply(a, args2);
        var Constructor = Function.bind.apply(Parent2, a);
        var instance = new Constructor();
        if (Class2)
          _set_prototype_of(instance, Class2.prototype);
        return instance;
      };
    }
    return _construct.apply(null, arguments);
  }
  var init_construct = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_construct.js"() {
      init_is_native_reflect_construct();
      init_set_prototype_of();
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_get_prototype_of.js
  function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _get_prototype_of(o);
  }
  var init_get_prototype_of = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_get_prototype_of.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_is_native_function.js
  function _is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }
  var init_is_native_function = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_is_native_function.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_wrap_native_super.js
  function _wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
    _wrap_native_super = function _wrap_native_super2(Class2) {
      if (Class2 === null || !_is_native_function(Class2))
        return Class2;
      if (typeof Class2 !== "function")
        throw new TypeError("Super expression must either be null or a function");
      if (typeof _cache !== "undefined") {
        if (_cache.has(Class2))
          return _cache.get(Class2);
        _cache.set(Class2, Wrapper);
      }
      function Wrapper() {
        return _construct(Class2, arguments, _get_prototype_of(this).constructor);
      }
      Wrapper.prototype = Object.create(Class2.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _set_prototype_of(Wrapper, Class2);
    };
    return _wrap_native_super(Class);
  }
  var init_wrap_native_super = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_wrap_native_super.js"() {
      init_construct();
      init_get_prototype_of();
      init_is_native_function();
      init_set_prototype_of();
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_assert_this_initialized.js
  function _assert_this_initialized(self) {
    if (self === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
  }
  var init_assert_this_initialized = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_assert_this_initialized.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_type_of.js
  function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
  }
  var init_type_of = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_type_of.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_possible_constructor_return.js
  function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function"))
      return call;
    return _assert_this_initialized(self);
  }
  var init_possible_constructor_return = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_possible_constructor_return.js"() {
      init_assert_this_initialized();
      init_type_of();
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_create_super.js
  function _create_super(Derived) {
    var hasNativeReflectConstruct = _is_native_reflect_construct();
    return function _createSuperInternal() {
      var Super = _get_prototype_of(Derived), result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _get_prototype_of(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possible_constructor_return(this, result);
    };
  }
  var init_create_super = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_create_super.js"() {
      init_get_prototype_of();
      init_is_native_reflect_construct();
      init_possible_constructor_return();
    }
  });

  // node_modules/.pnpm/es-toolkit@1.15.1/node_modules/es-toolkit/dist/function/debounce.mjs
  function debounce(func, debounceMs, { signal } = {}) {
    var timeoutId = null;
    var debounced = function debounced2(...args) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
      if (signal?.aborted) {
        return;
      }
      timeoutId = setTimeout(function() {
        func(...args);
        timeoutId = null;
      }, debounceMs);
    };
    var onAbort = function onAbort2() {
      debounced.cancel();
    };
    debounced.cancel = function() {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
    signal?.addEventListener("abort", onAbort, {
      once: true
    });
    return debounced;
  }
  var init_debounce = __esm({
    "node_modules/.pnpm/es-toolkit@1.15.1/node_modules/es-toolkit/dist/function/debounce.mjs"() {
    }
  });

  // node_modules/.pnpm/es-toolkit@1.15.1/node_modules/es-toolkit/dist/object/omit.mjs
  function omit(obj, keys) {
    var result = {
      ...obj
    };
    for (var key of keys) {
      delete result[key];
    }
    return result;
  }
  var init_omit = __esm({
    "node_modules/.pnpm/es-toolkit@1.15.1/node_modules/es-toolkit/dist/object/omit.mjs"() {
    }
  });

  // node_modules/.pnpm/es-toolkit@1.15.1/node_modules/es-toolkit/dist/index.mjs
  var init_dist = __esm({
    "node_modules/.pnpm/es-toolkit@1.15.1/node_modules/es-toolkit/dist/index.mjs"() {
      init_debounce();
      init_omit();
    }
  });

  // src/metro/internals/enums.ts
  var ModuleFlags, ModulesMapInternal;
  var init_enums = __esm({
    "src/metro/internals/enums.ts"() {
      "use strict";
      (function(ModuleFlags2) {
        ModuleFlags2[ModuleFlags2["EXISTS"] = 1] = "EXISTS";
        ModuleFlags2[ModuleFlags2["BLACKLISTED"] = 2] = "BLACKLISTED";
      })(ModuleFlags || (ModuleFlags = {}));
      (function(ModulesMapInternal2) {
        ModulesMapInternal2[ModulesMapInternal2["FULL_LOOKUP"] = 0] = "FULL_LOOKUP";
        ModulesMapInternal2[ModulesMapInternal2["NOT_FOUND"] = 1] = "NOT_FOUND";
      })(ModulesMapInternal || (ModulesMapInternal = {}));
    }
  });

  // src/lib/api/patcher.ts
  var patcher_exports = {};
  __export(patcher_exports, {
    _patcherDelaySymbol: () => _patcherDelaySymbol,
    after: () => after,
    before: () => before,
    default: () => patcher_default,
    instead: () => instead
  });
  function create(fn) {
    function patchFn(...args) {
      var _this = this;
      if (_patcherDelaySymbol in args[1]) {
        var delayCallback = args[1][_patcherDelaySymbol];
        var cancel = false;
        var unpatch = function() {
          return cancel = true;
        };
        delayCallback(function(target) {
          if (cancel)
            return;
          args[1] = target;
          unpatch = fn.apply(_this, args);
        });
        return function() {
          return unpatch();
        };
      }
      return fn.apply(this, args);
    }
    function promisePatchFn(...args) {
      var _this = this;
      var thenable = args[1];
      if (!thenable || !("then" in thenable))
        throw new Error("target is not a then-able object");
      var cancel = false;
      var unpatch = function() {
        return cancel = true;
      };
      thenable.then(function(target) {
        if (cancel)
          return;
        args[1] = target;
        unpatch = patchFn.apply(_this, args);
      });
      return function() {
        return unpatch();
      };
    }
    return Object.assign(patchFn, {
      await: promisePatchFn
    });
  }
  var _after, _before, _instead, _patcherDelaySymbol, after, before, instead, patcher_default;
  var init_patcher = __esm({
    "src/lib/api/patcher.ts"() {
      "use strict";
      ({ after: _after, before: _before, instead: _instead } = require_cjs());
      _patcherDelaySymbol = Symbol.for("bunny.api.patcher.delay");
      after = create(_after);
      before = create(_before);
      instead = create(_instead);
      patcher_default = {
        after,
        before,
        instead
      };
    }
  });

  // src/lib/api/assets.ts
  var assets_exports = {};
  __export(assets_exports, {
    assetsMap: () => assetsMap,
    findAsset: () => findAsset,
    findAssetId: () => findAssetId,
    patchAssets: () => patchAssets
  });
  function patchAssets(module) {
    if (assetsModule)
      return;
    assetsModule = module;
    var unpatch = after("registerAsset", assetsModule, function([asset]) {
      var moduleId = getImportingModuleId();
      if (moduleId !== -1)
        indexAssetName(asset.name, moduleId);
    });
    return unpatch;
  }
  function findAsset(param) {
    if (typeof param === "number")
      return assetsModule.getAssetByID(param);
    if (typeof param === "string")
      return assetsMap[param];
    return Object.values(assetsMap).find(param);
  }
  function findAssetId(name) {
    return assetsMap[name]?.index;
  }
  var assetsMap, assetsModule;
  var init_assets = __esm({
    "src/lib/api/assets.ts"() {
      "use strict";
      init_patcher();
      init_caches();
      init_modules2();
      assetsMap = new Proxy({}, {
        get(cache, p) {
          if (typeof p !== "string")
            return void 0;
          if (cache[p])
            return cache[p];
          var moduleIds = getMetroCache().assetsIndex[p];
          if (moduleIds == null)
            return void 0;
          for (var id in moduleIds) {
            var assetIndex = requireModule(Number(id));
            if (typeof assetIndex !== "number")
              continue;
            var assetDefinition = assetsModule.getAssetByID(assetIndex);
            if (!assetDefinition)
              continue;
            assetDefinition.index ??= assetDefinition.id ??= assetIndex;
            assetDefinition.moduleId ??= id;
            cache[p] ??= assetDefinition;
          }
          return cache[p];
        },
        ownKeys(cache) {
          var keys = [];
          for (var key in getMetroCache().assetsIndex) {
            cache[key] = this.get(cache, key, {});
            if (cache[key])
              keys.push(key);
          }
          return keys;
        }
      });
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_create_class.js
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps)
      _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  var init_create_class = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_create_class.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_define_property.js
  function _define_property(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else
      obj[key] = value;
    return obj;
  }
  var init_define_property = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.12/node_modules/@swc/helpers/esm/_define_property.js"() {
    }
  });

  // src/lib/utils/Emitter.ts
  var Events, Emitter;
  var init_Emitter = __esm({
    "src/lib/utils/Emitter.ts"() {
      "use strict";
      init_class_call_check();
      init_create_class();
      init_define_property();
      (function(Events2) {
        Events2["GET"] = "GET";
        Events2["SET"] = "SET";
        Events2["DEL"] = "DEL";
      })(Events || (Events = {}));
      Emitter = /* @__PURE__ */ function() {
        "use strict";
        function Emitter2() {
          _class_call_check(this, Emitter2);
          _define_property(this, "listeners", Object.values(Events).reduce(function(acc, val) {
            return acc[val] = /* @__PURE__ */ new Set(), acc;
          }, {}));
        }
        _create_class(Emitter2, [
          {
            key: "on",
            value: function on(event, listener) {
              if (!this.listeners[event].has(listener))
                this.listeners[event].add(listener);
            }
          },
          {
            key: "off",
            value: function off(event, listener) {
              this.listeners[event].delete(listener);
            }
          },
          {
            key: "once",
            value: function once(event, listener) {
              var _this = this;
              var once2 = function(event2, data) {
                _this.off(event2, once2);
                listener(event2, data);
              };
              this.on(event, once2);
            }
          },
          {
            key: "emit",
            value: function emit(event, data) {
              for (var listener of this.listeners[event])
                listener(event, data);
            }
          }
        ]);
        return Emitter2;
      }();
    }
  });

  // src/metro/factories.ts
  var factories_exports = {};
  __export(factories_exports, {
    createFilterDefinition: () => createFilterDefinition,
    createSimpleFilter: () => createSimpleFilter
  });
  function createFilterDefinition(fn, uniqMaker) {
    function createHolder(func, args, raw) {
      return Object.assign(func, {
        filter: fn,
        raw,
        uniq: [
          raw && "raw::",
          uniqMaker(args)
        ].filter(Boolean).join("")
      });
    }
    var curry = function(raw) {
      return function(...args) {
        return createHolder(function(m, id, defaultCheck) {
          return fn(args, m, id, defaultCheck);
        }, args, raw);
      };
    };
    return Object.assign(curry(false), {
      byRaw: curry(true),
      uniqMaker
    });
  }
  function createSimpleFilter(filter, uniq) {
    return createFilterDefinition(function(_, m) {
      return filter(m);
    }, function() {
      return `dynamic::${uniq}`;
    })();
  }
  var init_factories = __esm({
    "src/metro/factories.ts"() {
      "use strict";
    }
  });

  // src/metro/filters.ts
  var filters_exports = {};
  __export(filters_exports, {
    byDisplayName: () => byDisplayName,
    byFilePath: () => byFilePath,
    byMutableProp: () => byMutableProp,
    byName: () => byName,
    byProps: () => byProps,
    byStoreName: () => byStoreName,
    byTypeName: () => byTypeName
  });
  var byProps, byName, byDisplayName, byTypeName, byStoreName, byFilePath, byMutableProp;
  var init_filters = __esm({
    "src/metro/filters.ts"() {
      "use strict";
      init_factories();
      init_modules2();
      byProps = createFilterDefinition(function(props, m) {
        return props.length === 0 ? m[props[0]] : props.every(function(p) {
          return m[p];
        });
      }, function(props) {
        return `bunny.metro.byProps(${props.join(",")})`;
      });
      byName = createFilterDefinition(function([name], m) {
        return m.name === name;
      }, function(name) {
        return `bunny.metro.byName(${name})`;
      });
      byDisplayName = createFilterDefinition(function([displayName], m) {
        return m.displayName === displayName;
      }, function(name) {
        return `bunny.metro.byDisplayName(${name})`;
      });
      byTypeName = createFilterDefinition(function([typeName], m) {
        return m.type?.name === typeName;
      }, function(name) {
        return `bunny.metro.byTypeName(${name})`;
      });
      byStoreName = createFilterDefinition(function([name], m) {
        return m.getName?.length === 0 && m.getName() === name;
      }, function(name) {
        return `bunny.metro.byStoreName(${name})`;
      });
      byFilePath = createFilterDefinition(
        // module return depends on defaultCheck. if true, it'll return module.default, otherwise the whole module
        // unlike filters like byName, defaultCheck doesn't affect the return since we don't rely on exports, but only its ID
        // one could say that this is technically a hack, since defaultCheck is meant for filtering exports
        function([path, exportDefault], _, id, defaultCheck) {
          return exportDefault === defaultCheck && metroModules[id]?.__filePath === path;
        },
        function([path, exportDefault]) {
          return `bunny.metro.byFilePath(${path},${exportDefault})`;
        }
      );
      byMutableProp = createFilterDefinition(function([prop], m) {
        return m?.[prop] && !Object.getOwnPropertyDescriptor(m, prop)?.get;
      }, function(prop) {
        return `bunny.metro.byMutableProp(${prop})`;
      });
    }
  });

  // src/metro/finders.ts
  function filterExports(moduleExports, moduleId, filter) {
    if (moduleExports.default && moduleExports.__esModule && filter(moduleExports.default, moduleId, true)) {
      return {
        exports: filter.raw ? moduleExports : moduleExports.default,
        defaultExport: !filter.raw
      };
    }
    if (!filter.raw && filter(moduleExports, moduleId, false)) {
      return {
        exports: moduleExports,
        defaultExport: false
      };
    }
    return {};
  }
  function findModule(filter) {
    var { cacheId, finish } = getCacherForUniq(filter.uniq, false);
    for (var [id, moduleExports] of getModules(filter.uniq, false)) {
      var { exports: testedExports, defaultExport } = filterExports(moduleExports, id, filter);
      if (testedExports !== void 0) {
        cacheId(id, testedExports);
        return {
          id,
          defaultExport
        };
      }
    }
    finish(true);
    return {};
  }
  function findModuleId(filter) {
    return findModule(filter)?.id;
  }
  function findExports(filter) {
    var { id, defaultExport } = findModule(filter);
    if (id == null)
      return;
    return defaultExport ? requireModule(id).default : requireModule(id);
  }
  function findAllModule(filter) {
    var { cacheId, finish } = getCacherForUniq(filter.uniq, true);
    var foundExports = [];
    for (var [id, moduleExports] of getModules(filter.uniq, true)) {
      var { exports: testedExports, defaultExport } = filterExports(moduleExports, id, filter);
      if (testedExports !== void 0 && typeof defaultExport === "boolean") {
        foundExports.push({
          id,
          defaultExport
        });
        cacheId(id, testedExports);
      }
    }
    finish(foundExports.length === 0);
    return foundExports;
  }
  function findAllModuleId(filter) {
    return findAllModule(filter).map(function(e) {
      return e.id;
    });
  }
  function findAllExports(filter) {
    return findAllModule(filter).map(function(ret) {
      if (!ret.id)
        return;
      var { id, defaultExport } = ret;
      return defaultExport ? requireModule(id).default : requireModule(id);
    });
  }
  var init_finders = __esm({
    "src/metro/finders.ts"() {
      "use strict";
      init_caches();
      init_modules2();
    }
  });

  // src/lib/utils/lazy.ts
  var lazy_exports = {};
  __export(lazy_exports, {
    getProxyFactory: () => getProxyFactory,
    lazyDestructure: () => lazyDestructure,
    proxyLazy: () => proxyLazy
  });
  function proxyLazy(factory, opts = {}) {
    var cache;
    var dummy = opts.hint !== "object" ? function dummy2() {
    } : {};
    var proxyFactory = function() {
      return cache ??= factory();
    };
    var proxy = new Proxy(dummy, lazyHandler);
    factories.set(proxy, proxyFactory);
    proxyContextHolder.set(dummy, {
      factory,
      options: opts
    });
    return proxy;
  }
  function lazyDestructure(factory, opts = {}) {
    var proxiedObject = proxyLazy(factory);
    return new Proxy({}, {
      get(_, property) {
        if (property === Symbol.iterator) {
          return function* () {
            yield proxiedObject;
            yield new Proxy({}, {
              get: function(_2, p) {
                return proxyLazy(function() {
                  return proxiedObject[p];
                }, opts);
              }
            });
            throw new Error("This is not a real iterator, this is likely used incorrectly");
          };
        }
        return proxyLazy(function() {
          return proxiedObject[property];
        }, opts);
      }
    });
  }
  function getProxyFactory(obj) {
    return factories.get(obj);
  }
  var unconfigurable, isUnconfigurable, factories, proxyContextHolder, lazyHandler;
  var init_lazy = __esm({
    "src/lib/utils/lazy.ts"() {
      "use strict";
      unconfigurable = /* @__PURE__ */ new Set([
        "arguments",
        "caller",
        "prototype"
      ]);
      isUnconfigurable = function(key) {
        return typeof key === "string" && unconfigurable.has(key);
      };
      factories = /* @__PURE__ */ new WeakMap();
      proxyContextHolder = /* @__PURE__ */ new WeakMap();
      lazyHandler = {
        ...Object.fromEntries(Object.getOwnPropertyNames(Reflect).map(function(fnName) {
          return [
            fnName,
            function(target, ...args) {
              var contextHolder = proxyContextHolder.get(target);
              var resolved = contextHolder?.factory();
              if (!resolved)
                throw new Error(`Trying to Reflect.${fnName} of ${typeof resolved}`);
              return Reflect[fnName](resolved, ...args);
            }
          ];
        })),
        has(target, p) {
          var contextHolder = proxyContextHolder.get(target);
          if (contextHolder?.options) {
            var { exemptedEntries: isolatedEntries } = contextHolder.options;
            if (isolatedEntries && p in isolatedEntries)
              return true;
          }
          var resolved = contextHolder?.factory();
          if (!resolved)
            throw new Error(`Trying to Reflect.has of ${typeof resolved}`);
          return Reflect.has(resolved, p);
        },
        get(target, p, receiver) {
          var contextHolder = proxyContextHolder.get(target);
          if (contextHolder?.options) {
            var { exemptedEntries: isolatedEntries } = contextHolder.options;
            if (isolatedEntries?.[p])
              return isolatedEntries[p];
          }
          var resolved = contextHolder?.factory();
          if (!resolved)
            throw new Error(`Trying to Reflect.get of ${typeof resolved}`);
          return Reflect.get(resolved, p, receiver);
        },
        ownKeys: function(target) {
          var contextHolder = proxyContextHolder.get(target);
          var resolved = contextHolder?.factory();
          if (!resolved)
            throw new Error(`Trying to Reflect.ownKeys of ${typeof resolved}`);
          var cacheKeys = Reflect.ownKeys(resolved);
          unconfigurable.forEach(function(key) {
            return !cacheKeys.includes(key) && cacheKeys.push(key);
          });
          return cacheKeys;
        },
        getOwnPropertyDescriptor: function(target, p) {
          var contextHolder = proxyContextHolder.get(target);
          var resolved = contextHolder?.factory();
          if (!resolved)
            throw new Error(`Trying to getOwnPropertyDescriptor of ${typeof resolved}`);
          if (isUnconfigurable(p))
            return Reflect.getOwnPropertyDescriptor(target, p);
          var descriptor = Reflect.getOwnPropertyDescriptor(resolved, p);
          if (descriptor)
            Object.defineProperty(target, p, descriptor);
          return descriptor;
        }
      };
    }
  });

  // src/metro/lazy.ts
  var lazy_exports2 = {};
  __export(lazy_exports2, {
    _lazyContextSymbol: () => _lazyContextSymbol,
    createLazyModule: () => createLazyModule,
    getLazyContext: () => getLazyContext
  });
  function getIndexedFind(filter) {
    var modulesMap = getMetroCache().findIndex[filter.uniq];
    if (!modulesMap)
      return void 0;
    for (var k in modulesMap)
      if (k[0] !== "_")
        return Number(k);
  }
  function subscribeLazyModule(proxy, callback) {
    var info = getLazyContext(proxy);
    if (!info)
      throw new Error("Subscribing a module for non-proxy-find");
    if (!info.indexed)
      throw new Error("Attempting to subscribe to a non-indexed find");
    return subscribeModule(info.moduleId, function() {
      callback(findExports(info.filter));
    });
  }
  function getLazyContext(proxy) {
    return _lazyContexts.get(proxy);
  }
  function createLazyModule(filter) {
    var cache = void 0;
    var moduleId = getIndexedFind(filter);
    var context = {
      filter,
      indexed: !!moduleId,
      moduleId,
      getExports(cb) {
        if (!moduleId || metroModules[moduleId]?.isInitialized) {
          cb(this.forceLoad());
          return function() {
            return void 0;
          };
        }
        return this.subscribe(cb);
      },
      subscribe(cb) {
        return subscribeLazyModule(proxy, cb);
      },
      get cache() {
        return cache;
      },
      forceLoad() {
        cache ??= findExports(filter);
        if (!cache)
          throw new Error(`${filter.uniq} is ${typeof cache}! (id ${context.moduleId ?? "unknown"})`);
        return cache;
      }
    };
    var proxy = proxyLazy(function() {
      return context.forceLoad();
    }, {
      exemptedEntries: {
        [_lazyContextSymbol]: context,
        [_patcherDelaySymbol]: function(cb) {
          return context.getExports(cb);
        }
      }
    });
    _lazyContexts.set(proxy, context);
    return proxy;
  }
  var _lazyContextSymbol, _lazyContexts;
  var init_lazy2 = __esm({
    "src/metro/lazy.ts"() {
      "use strict";
      init_patcher();
      init_lazy();
      init_finders();
      init_caches();
      init_modules2();
      _lazyContextSymbol = Symbol.for("bunny.metro.lazyContext");
      _lazyContexts = /* @__PURE__ */ new WeakMap();
    }
  });

  // src/metro/wrappers.ts
  var findByProps, findByPropsLazy, findByPropsAll, findByName, findByNameLazy, findByNameAll, findByDisplayName, findByDisplayNameLazy, findByDisplayNameAll, findByTypeName, findByTypeNameLazy, findByTypeNameAll, findByStoreName, findByStoreNameLazy, findByFilePath, findByFilePathLazy;
  var init_wrappers = __esm({
    "src/metro/wrappers.ts"() {
      "use strict";
      init_filters();
      init_finders();
      init_lazy2();
      findByProps = function(...props) {
        return findExports(byProps(...props));
      };
      findByPropsLazy = function(...props) {
        return createLazyModule(byProps(...props));
      };
      findByPropsAll = function(...props) {
        return findAllExports(byProps(...props));
      };
      findByName = function(name, expDefault = true) {
        return findExports(expDefault ? byName(name) : byName.byRaw(name));
      };
      findByNameLazy = function(name, expDefault = true) {
        return createLazyModule(expDefault ? byName(name) : byName.byRaw(name));
      };
      findByNameAll = function(name, expDefault = true) {
        return findAllExports(expDefault ? byName(name) : byName.byRaw(name));
      };
      findByDisplayName = function(name, expDefault = true) {
        return findExports(expDefault ? byDisplayName(name) : byDisplayName.byRaw(name));
      };
      findByDisplayNameLazy = function(name, expDefault = true) {
        return createLazyModule(expDefault ? byDisplayName(name) : byDisplayName.byRaw(name));
      };
      findByDisplayNameAll = function(name, expDefault = true) {
        return findAllExports(expDefault ? byDisplayName(name) : byDisplayName.byRaw(name));
      };
      findByTypeName = function(name, expDefault = true) {
        return findExports(expDefault ? byTypeName(name) : byTypeName.byRaw(name));
      };
      findByTypeNameLazy = function(name, expDefault = true) {
        return createLazyModule(expDefault ? byTypeName(name) : byTypeName.byRaw(name));
      };
      findByTypeNameAll = function(name, expDefault = true) {
        return findAllExports(expDefault ? byTypeName(name) : byTypeName.byRaw(name));
      };
      findByStoreName = function(name) {
        return findExports(byStoreName(name));
      };
      findByStoreNameLazy = function(name) {
        return createLazyModule(byStoreName(name));
      };
      findByFilePath = function(path, expDefault = false) {
        return findExports(byFilePath(path, expDefault));
      };
      findByFilePathLazy = function(path, expDefault = false) {
        return createLazyModule(byFilePath(path, expDefault));
      };
    }
  });

  // shims/depsModule.ts
  var require_depsModule = __commonJS({
    "shims/depsModule.ts"(exports, module) {
      "use strict";
      init_wrappers();
      module.exports = {
        "react": findByPropsLazy("createElement"),
        "react-native": findByPropsLazy("AppRegistry"),
        "util": findByPropsLazy("inspect", "isNullOrUndefined"),
        "moment": findByPropsLazy("isMoment"),
        "chroma-js": findByPropsLazy("brewer"),
        "lodash": findByPropsLazy("forEachRight"),
        "@shopify/react-native-skia": findByPropsLazy("useFont")
      };
    }
  });

  // globals:react-native
  var require_react_native = __commonJS({
    "globals:react-native"(exports, module) {
      module.exports = require_depsModule()["react-native"];
    }
  });

  // src/lib/api/storage/backends.ts
  var import_react_native, ILLEGAL_CHARS_REGEX, filePathFixer, getMMKVPath, purgeStorage, createMMKVBackend, createFileBackend;
  var init_backends = __esm({
    "src/lib/api/storage/backends.ts"() {
      "use strict";
      init_modules();
      import_react_native = __toESM(require_react_native());
      ILLEGAL_CHARS_REGEX = /[<>:"/\\|?*]/g;
      filePathFixer = function(file) {
        return import_react_native.Platform.select({
          default: file,
          ios: FileManager.saveFileToGallery ? file : `Documents/${file}`
        });
      };
      getMMKVPath = function(name) {
        if (ILLEGAL_CHARS_REGEX.test(name)) {
          name = name.replace(ILLEGAL_CHARS_REGEX, "-").replace(/-+/g, "-");
        }
        return `vd_mmkv/${name}`;
      };
      purgeStorage = async function(store) {
        if (await MMKVManager.getItem(store)) {
          MMKVManager.removeItem(store);
        }
        var mmkvPath = getMMKVPath(store);
        if (await FileManager.fileExists(`${FileManager.getConstants().DocumentsDirPath}/${mmkvPath}`)) {
          await FileManager.removeFile?.("documents", mmkvPath);
        }
      };
      createMMKVBackend = function(store, defaultData = {}) {
        var mmkvPath = getMMKVPath(store);
        var defaultStr = JSON.stringify(defaultData);
        return createFileBackend(mmkvPath, defaultData, async function() {
          var path = `${FileManager.getConstants().DocumentsDirPath}/${mmkvPath}`;
          if (await FileManager.fileExists(path))
            return;
          var oldData = await MMKVManager.getItem(store) ?? defaultStr;
          if (oldData === "!!LARGE_VALUE!!") {
            var cachePath = `${FileManager.getConstants().CacheDirPath}/mmkv/${store}`;
            if (await FileManager.fileExists(cachePath)) {
              oldData = await FileManager.readFile(cachePath, "utf8");
            } else {
              console.log(`${store}: Experienced data loss :(`);
              oldData = defaultStr;
            }
          }
          try {
            JSON.parse(oldData);
          } catch (e) {
            console.error(`${store} had an unparseable data while migrating`);
            oldData = defaultStr;
          }
          await FileManager.writeFile("documents", filePathFixer(mmkvPath), oldData, "utf8");
          if (await MMKVManager.getItem(store) !== null) {
            MMKVManager.removeItem(store);
            console.log(`Successfully migrated ${store} store from MMKV storage to fs`);
          }
        }());
      };
      createFileBackend = function(file, defaultData = {}, migratePromise) {
        return {
          get: async function() {
            await migratePromise;
            var path = `${FileManager.getConstants().DocumentsDirPath}/${file}`;
            if (await FileManager.fileExists(path)) {
              var content = await FileManager.readFile(path, "utf8");
              try {
                return JSON.parse(content);
              } catch (e) {
              }
            }
            await FileManager.writeFile("documents", filePathFixer(file), JSON.stringify(defaultData), "utf8");
            return JSON.parse(await FileManager.readFile(path, "utf8"));
          },
          set: async function(data) {
            await migratePromise;
            await FileManager.writeFile("documents", filePathFixer(file), JSON.stringify(data), "utf8");
          }
        };
      };
    }
  });

  // src/lib/api/storage/index.ts
  var storage_exports = {};
  __export(storage_exports, {
    awaitStorage: () => awaitStorage,
    createFileBackend: () => createFileBackend,
    createMMKVBackend: () => createMMKVBackend,
    createProxy: () => createProxy,
    createStorage: () => createStorage,
    purgeStorage: () => purgeStorage,
    useProxy: () => useProxy,
    wrapSync: () => wrapSync
  });
  function createProxy(target = {}) {
    var emitter = new Emitter();
    function createProxy1(target2, path) {
      return new Proxy(target2, {
        get(target3, prop) {
          if (prop === emitterSymbol)
            return emitter;
          var newPath = [
            ...path,
            prop
          ];
          var value = target3[prop];
          if (value !== void 0 && value !== null) {
            emitter.emit("GET", {
              path: newPath,
              value
            });
            if (typeof value === "object") {
              return createProxy1(value, newPath);
            }
            return value;
          }
          return value;
        },
        set(target3, prop, value) {
          target3[prop] = value;
          emitter.emit("SET", {
            path: [
              ...path,
              prop
            ],
            value
          });
          return true;
        },
        deleteProperty(target3, prop) {
          var success = delete target3[prop];
          if (success)
            emitter.emit("DEL", {
              path: [
                ...path,
                prop
              ]
            });
          return success;
        }
      });
    }
    return {
      proxy: createProxy1(target, []),
      emitter
    };
  }
  function useProxy(storage) {
    var emitter = storage[emitterSymbol];
    var [, forceUpdate] = React.useReducer(function(n) {
      return ~n;
    }, 0);
    React.useEffect(function() {
      var listener = function() {
        return forceUpdate();
      };
      emitter.on("SET", listener);
      emitter.on("DEL", listener);
      return function() {
        emitter.off("SET", listener);
        emitter.off("DEL", listener);
      };
    }, []);
    return storage;
  }
  async function createStorage(backend) {
    var data = await backend.get();
    var { proxy, emitter } = createProxy(data);
    var handler = function() {
      return backend.set(proxy);
    };
    emitter.on("SET", handler);
    emitter.on("DEL", handler);
    return proxy;
  }
  function wrapSync(store) {
    var awaited = void 0;
    var awaitQueue = [];
    var awaitInit = function(cb) {
      return awaited ? cb() : awaitQueue.push(cb);
    };
    store.then(function(v) {
      awaited = v;
      awaitQueue.forEach(function(cb) {
        return cb();
      });
    });
    return new Proxy({}, {
      ...Object.fromEntries(Object.getOwnPropertyNames(Reflect).map(function(k) {
        return [
          k,
          function(t, ...a) {
            return Reflect[k](awaited ?? t, ...a);
          }
        ];
      })),
      get(target, prop, recv) {
        if (prop === syncAwaitSymbol)
          return awaitInit;
        return Reflect.get(awaited ?? target, prop, recv);
      }
    });
  }
  function awaitStorage(...stores) {
    return Promise.all(stores.map(function(store) {
      return new Promise(function(res) {
        return store[syncAwaitSymbol](res);
      });
    }));
  }
  var emitterSymbol, syncAwaitSymbol;
  var init_storage = __esm({
    "src/lib/api/storage/index.ts"() {
      "use strict";
      init_Emitter();
      init_backends();
      emitterSymbol = Symbol.for("vendetta.storage.emitter");
      syncAwaitSymbol = Symbol.for("vendetta.storage.accessor");
    }
  });

  // src/lib/utils/constants.ts
  var constants_exports = {};
  __export(constants_exports, {
    BUNNY_PROXY_PREFIX: () => BUNNY_PROXY_PREFIX,
    DISCORD_SERVER: () => DISCORD_SERVER,
    DISCORD_SERVER_ID: () => DISCORD_SERVER_ID,
    GITHUB: () => GITHUB,
    HTTP_REGEX: () => HTTP_REGEX,
    HTTP_REGEX_MULTI: () => HTTP_REGEX_MULTI,
    OLD_BUNNY_PROXY_PREFIX: () => OLD_BUNNY_PROXY_PREFIX,
    PLUGINS_CHANNEL_ID: () => PLUGINS_CHANNEL_ID,
    THEMES_CHANNEL_ID: () => THEMES_CHANNEL_ID,
    VD_PROXY_PREFIX: () => VD_PROXY_PREFIX
  });
  var DISCORD_SERVER, GITHUB, HTTP_REGEX, HTTP_REGEX_MULTI, VD_PROXY_PREFIX, BUNNY_PROXY_PREFIX, OLD_BUNNY_PROXY_PREFIX, DISCORD_SERVER_ID, PLUGINS_CHANNEL_ID, THEMES_CHANNEL_ID;
  var init_constants = __esm({
    "src/lib/utils/constants.ts"() {
      "use strict";
      DISCORD_SERVER = "https://discord.gg/XjYgWXHb9Q";
      GITHUB = "https://github.com/pyoncord";
      HTTP_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
      HTTP_REGEX_MULTI = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
      VD_PROXY_PREFIX = "https://vd-plugins.github.io/proxy";
      BUNNY_PROXY_PREFIX = "https://bn-plugins.github.io/vd-proxy";
      OLD_BUNNY_PROXY_PREFIX = "https://bunny-mod.github.io/plugins-proxy";
      DISCORD_SERVER_ID = "1015931589865246730";
      PLUGINS_CHANNEL_ID = "1091880384561684561";
      THEMES_CHANNEL_ID = "1091880434939482202";
    }
  });

  // src/lib/utils/cyrb64.ts
  function cyrb64(str, seed = 0) {
    var h1 = 3735928559 ^ seed, h2 = 1103547991 ^ seed;
    for (var i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
    h1 ^= Math.imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
    h2 ^= Math.imul(h1 ^ h1 >>> 13, 3266489909);
    return [
      h2 >>> 0,
      h1 >>> 0
    ];
  }
  function cyrb64Hash(str, seed = 0) {
    var [h2, h1] = cyrb64(str, seed);
    return h2.toString(36).padStart(7, "0") + h1.toString(36).padStart(7, "0");
  }
  var init_cyrb64 = __esm({
    "src/lib/utils/cyrb64.ts"() {
      "use strict";
    }
  });

  // src/lib/utils/findInReactTree.ts
  var findInReactTree;
  var init_findInReactTree = __esm({
    "src/lib/utils/findInReactTree.ts"() {
      "use strict";
      init_utils();
      findInReactTree = function(tree, filter) {
        return findInTree(tree, filter, {
          walkable: [
            "props",
            "children",
            "child",
            "sibling"
          ]
        });
      };
    }
  });

  // src/lib/utils/findInTree.ts
  function treeSearch(tree, filter, opts, depth) {
    if (depth > opts.maxDepth)
      return;
    if (!tree)
      return;
    try {
      if (filter(tree))
        return tree;
    } catch (e) {
    }
    if (Array.isArray(tree)) {
      for (var item of tree) {
        if (typeof item !== "object" || item === null)
          continue;
        try {
          var found = treeSearch(item, filter, opts, depth + 1);
          if (found)
            return found;
        } catch (e) {
        }
      }
    } else if (typeof tree === "object") {
      for (var key of Object.keys(tree)) {
        if (typeof tree[key] !== "object" || tree[key] === null)
          continue;
        if (opts.walkable.length && !opts.walkable.includes(key))
          continue;
        if (opts.ignore.includes(key))
          continue;
        try {
          var found1 = treeSearch(tree[key], filter, opts, depth + 1);
          if (found1)
            return found1;
        } catch (e) {
        }
      }
    }
  }
  var findInTree;
  var init_findInTree = __esm({
    "src/lib/utils/findInTree.ts"() {
      "use strict";
      findInTree = function(tree, filter, { walkable = [], ignore = [], maxDepth = 100 } = {}) {
        return treeSearch(tree, filter, {
          walkable,
          ignore,
          maxDepth
        }, 0);
      };
    }
  });

  // src/lib/utils/hookDefineProperty.ts
  function hookDefineProperty(target, property, cb) {
    var targetAsAny = target;
    if (property in target) {
      return void cb(targetAsAny[property]);
    }
    var value;
    Object.defineProperty(targetAsAny, property, {
      get: function() {
        return value;
      },
      set(v) {
        value = cb(v) ?? v;
      },
      configurable: true,
      enumerable: false
    });
    return function() {
      delete targetAsAny[property];
      targetAsAny[property] = value;
    };
  }
  var init_hookDefineProperty = __esm({
    "src/lib/utils/hookDefineProperty.ts"() {
      "use strict";
    }
  });

  // src/lib/utils/invariant.ts
  function invariant(condition, message) {
    if (condition)
      return;
    var resolvedMessage = typeof message === "function" ? message() : message;
    var prefix = "[Invariant Violation]";
    var value = resolvedMessage ? `${prefix}: ${resolvedMessage}` : prefix;
    throw new Error(value);
  }
  var init_invariant = __esm({
    "src/lib/utils/invariant.ts"() {
      "use strict";
    }
  });

  // src/lib/utils/logger.ts
  var logger_exports = {};
  __export(logger_exports, {
    DiscordLogger: () => DiscordLogger,
    logger: () => logger
  });
  var DiscordLogger, logger;
  var init_logger = __esm({
    "src/lib/utils/logger.ts"() {
      "use strict";
      init_wrappers();
      DiscordLogger = findByNameLazy("Logger");
      logger = new DiscordLogger("Bunny");
    }
  });

  // src/lib/utils/safeFetch.ts
  async function safeFetch(input, options, timeout = 1e4) {
    var req = await fetch(input, {
      signal: timeoutSignal(timeout),
      ...options
    });
    if (!req.ok)
      throw new Error("Request returned non-ok");
    return req;
  }
  function timeoutSignal(ms) {
    var controller = new AbortController();
    setTimeout(function() {
      return controller.abort(`Timed out after ${ms}ms`);
    }, ms);
    return controller.signal;
  }
  var init_safeFetch = __esm({
    "src/lib/utils/safeFetch.ts"() {
      "use strict";
    }
  });

  // src/lib/utils/index.ts
  var utils_exports = {};
  __export(utils_exports, {
    Emitter: () => Emitter,
    constants: () => constants_exports,
    cyrb64: () => cyrb64,
    findInReactTree: () => findInReactTree,
    findInTree: () => findInTree,
    hookDefineProperty: () => hookDefineProperty,
    invariant: () => invariant,
    lazy: () => lazy_exports,
    logger: () => logger_exports,
    safeFetch: () => safeFetch
  });
  var init_utils = __esm({
    "src/lib/utils/index.ts"() {
      "use strict";
      init_constants();
      init_cyrb64();
      init_Emitter();
      init_findInReactTree();
      init_findInTree();
      init_hookDefineProperty();
      init_invariant();
      init_lazy();
      init_logger();
      init_safeFetch();
    }
  });

  // globals:chroma-js
  var require_chroma_js = __commonJS({
    "globals:chroma-js"(exports, module) {
      module.exports = require_depsModule()["chroma-js"];
    }
  });

  // src/lib/themes/index.ts
  var themes_exports = {};
  __export(themes_exports, {
    applyTheme: () => applyTheme,
    color: () => color,
    fetchTheme: () => fetchTheme,
    getCurrentTheme: () => getCurrentTheme,
    getThemeFromLoader: () => getThemeFromLoader,
    initThemes: () => initThemes,
    installTheme: () => installTheme,
    patchChatBackground: () => patchChatBackground,
    removeTheme: () => removeTheme,
    selectTheme: () => selectTheme,
    themes: () => themes,
    updateThemes: () => updateThemes
  });
  async function writeTheme(theme) {
    if (typeof theme !== "object")
      throw new Error("Theme must be an object");
    await createFileBackend(getThemeFilePath() || "theme.json").set(theme);
  }
  function patchChatBackground() {
    var patches2 = [
      after("default", MessagesWrapperConnected, function(_, ret) {
        return enabled ? React.createElement(import_react_native2.ImageBackground, {
          style: {
            flex: 1,
            height: "100%"
          },
          source: currentTheme?.data?.background?.url && {
            uri: currentTheme.data.background.url
          } || 0,
          blurRadius: typeof currentTheme?.data?.background?.blur === "number" ? currentTheme?.data?.background?.blur : 0,
          children: ret
        }) : ret;
      }),
      after("render", MessagesWrapper.prototype, function(_, ret) {
        if (!enabled || !currentTheme?.data?.background?.url)
          return;
        var Messages = findInReactTree(ret, function(x) {
          return x && "HACK_fixModalInteraction" in x.props && x?.props?.style;
        });
        if (Messages) {
          Messages.props.style = [
            Messages.props.style,
            {
              backgroundColor: (0, import_chroma_js.default)(Messages.props.style.backgroundColor || "black").alpha(1 - (currentTheme?.data.background?.alpha ?? 1)).hex()
            }
          ];
        } else
          console.error("Didn't find Messages when patching MessagesWrapper!");
      })
    ];
    return function() {
      return patches2.forEach(function(x) {
        return x();
      });
    };
  }
  function normalizeToHex(colorString) {
    if (import_chroma_js.default.valid(colorString))
      return (0, import_chroma_js.default)(colorString).hex();
    var color2 = Number((0, import_react_native2.processColor)(colorString));
    return import_chroma_js.default.rgb(
      color2 >> 16 & 255,
      color2 >> 8 & 255,
      color2 & 255,
      color2 >> 24 & 255
      // alpha
    ).hex();
  }
  function processData(data) {
    if (data.semanticColors) {
      var { semanticColors: semanticColors2 } = data;
      for (var key in semanticColors2) {
        for (var index in semanticColors2[key]) {
          semanticColors2[key][index] &&= normalizeToHex(semanticColors2[key][index]);
        }
      }
    }
    if (data.rawColors) {
      var { rawColors: rawColors2 } = data;
      for (var key1 in rawColors2) {
        data.rawColors[key1] = normalizeToHex(rawColors2[key1]);
      }
      if (import_react_native2.Platform.OS === "android")
        applyAndroidAlphaKeys(rawColors2);
    }
    data.spec ??= 2;
    return data;
  }
  function applyAndroidAlphaKeys(rawColors2) {
    var alphaMap = {
      "BLACK_ALPHA_60": [
        "BLACK",
        0.6
      ],
      "BRAND_NEW_360_ALPHA_20": [
        "BRAND_360",
        0.2
      ],
      "BRAND_NEW_360_ALPHA_25": [
        "BRAND_360",
        0.25
      ],
      "BRAND_NEW_500_ALPHA_20": [
        "BRAND_500",
        0.2
      ],
      "PRIMARY_DARK_500_ALPHA_20": [
        "PRIMARY_500",
        0.2
      ],
      "PRIMARY_DARK_700_ALPHA_60": [
        "PRIMARY_700",
        0.6
      ],
      "STATUS_GREEN_500_ALPHA_20": [
        "GREEN_500",
        0.2
      ],
      "STATUS_RED_500_ALPHA_20": [
        "RED_500",
        0.2
      ]
    };
    for (var key in alphaMap) {
      var [colorKey, alpha] = alphaMap[key];
      if (!rawColors2[colorKey])
        continue;
      rawColors2[key] = (0, import_chroma_js.default)(rawColors2[colorKey]).alpha(alpha).hex();
    }
  }
  async function fetchTheme(id, selected = false) {
    var themeJSON;
    try {
      themeJSON = await (await safeFetch(id, {
        cache: "no-store"
      })).json();
    } catch (e) {
      throw new Error(`Failed to fetch theme at ${id}`);
    }
    themes[id] = {
      id,
      selected,
      data: processData(themeJSON)
    };
    if (selected) {
      writeTheme(themes[id]);
      applyTheme(themes[id], vdThemeFallback);
    }
  }
  async function installTheme(id) {
    if (typeof id !== "string" || id in themes)
      throw new Error("Theme already installed");
    await fetchTheme(id);
  }
  function selectTheme(theme, write = true) {
    if (theme)
      theme.selected = true;
    Object.keys(themes).forEach(function(k) {
      return themes[k].selected = themes[k].id === theme?.id;
    });
    if (theme == null && write) {
      return writeTheme({});
    } else if (theme) {
      return writeTheme(theme);
    }
  }
  async function removeTheme(id) {
    var theme = themes[id];
    if (theme.selected)
      await selectTheme(null);
    delete themes[id];
    return theme.selected;
  }
  function getThemeFromLoader() {
    return getStoredTheme();
  }
  async function updateThemes() {
    await awaitStorage(themes);
    var currentTheme2 = getThemeFromLoader();
    await Promise.allSettled(Object.keys(themes).map(function(id) {
      return fetchTheme(id, currentTheme2?.id === id);
    }));
  }
  function getCurrentTheme() {
    return currentTheme;
  }
  function isDiscordTheme(name) {
    return discordThemes.has(name);
  }
  function patchColor() {
    var callback = function([theme]) {
      return theme === vdKey ? [
        vdThemeFallback
      ] : void 0;
    };
    Object.keys(color.RawColor).forEach(function(k) {
      Object.defineProperty(color.RawColor, k, {
        configurable: true,
        enumerable: true,
        get: function() {
          return enabled ? currentTheme?.data?.rawColors?.[k] ?? origRawColor[k] : origRawColor[k];
        }
      });
    });
    before("isThemeDark", isThemeModule, callback);
    before("isThemeLight", isThemeModule, callback);
    before("updateTheme", ThemeManager, callback);
    after("get", mmkvStorage, function([a], ret) {
      if (a === "SelectivelySyncedUserSettingsStore") {
        storageResolved = true;
        if (ret?._state?.appearance?.settings?.theme && enabled) {
          vdThemeFallback = ret._state.appearance.settings.theme;
          ret._state.appearance.settings.theme = vdKey;
        }
      } else if (a === "ThemeStore") {
        storageResolved = true;
        if (ret?._state?.theme && enabled) {
          vdThemeFallback = ret._state.theme;
          ret._state.theme = vdKey;
        }
      }
    });
    before("set", mmkvStorage, function(args) {
      if (!args[1])
        return;
      var key = args[0];
      var value = JSON.parse(JSON.stringify(args[1]));
      var interceptors = {
        SelectivelySyncedUserSettingsStore: function() {
          if (value._state?.appearance?.settings?.theme) {
            var { theme } = value._state?.appearance?.settings ?? {};
            if (isDiscordTheme(theme)) {
              vdThemeFallback = theme;
            } else {
              value._state.appearance.settings.theme = vdThemeFallback;
            }
          }
        },
        ThemeStore: function() {
          if (value._state?.theme) {
            var { theme } = value._state;
            if (isDiscordTheme(theme)) {
              vdThemeFallback = theme;
            } else {
              value._state.theme = vdThemeFallback;
            }
          }
        }
      };
      if (!(key in interceptors))
        return args;
      interceptors[key]();
      return [
        key,
        value
      ];
    });
    instead("resolveSemanticColor", color.default.meta ?? color.default.internal, function(args, orig) {
      if (!enabled || !currentTheme)
        return orig(...args);
      if (args[0] !== vdKey)
        return orig(...args);
      args[0] = vdThemeFallback;
      var [name, colorDef] = extractInfo(vdThemeFallback, args[1]);
      var themeIndex = vdThemeFallback === "midnight" ? 2 : vdThemeFallback === "light" ? 1 : 0;
      var alternativeName = semanticAlternativeMap[name] ?? name;
      var semanticColorVal = (currentTheme.data?.semanticColors?.[name] ?? currentTheme.data?.semanticColors?.[alternativeName])?.[themeIndex];
      if (semanticColorVal)
        return semanticColorVal;
      var rawValue = currentTheme.data?.rawColors?.[colorDef.raw];
      if (rawValue) {
        return colorDef.opacity === 1 ? rawValue : (0, import_chroma_js.default)(rawValue).alpha(colorDef.opacity).hex();
      }
      return orig(...args);
    });
  }
  function getDefaultFallbackTheme(fallback = vdThemeFallback) {
    var theme = ThemeStore.theme.toLowerCase();
    if (isDiscordTheme(theme)) {
      return theme;
    } else {
      return fallback;
    }
  }
  function applyTheme(appliedTheme, fallbackTheme) {
    if (!fallbackTheme)
      fallbackTheme = getDefaultFallbackTheme();
    currentTheme = appliedTheme;
    enabled = !!currentTheme;
    vdThemeFallback = fallbackTheme;
    vdKey = `vd-theme-${inc++}-${fallbackTheme}`;
    if (appliedTheme) {
      color.Theme[vdKey.toUpperCase()] = vdKey;
      formDividerModule.DIVIDER_COLORS[vdKey] = formDividerModule.DIVIDER_COLORS[vdThemeFallback];
      Object.keys(color.Shadow).forEach(function(k) {
        return color.Shadow[k][vdKey] = color.Shadow[k][vdThemeFallback];
      });
      Object.keys(color.SemanticColor).forEach(function(k) {
        color.SemanticColor[k][vdKey] = {
          ...color.SemanticColor[k][vdThemeFallback],
          override: appliedTheme?.data?.semanticColors?.[k]?.[0]
        };
      });
    }
    if (storageResolved) {
      appearanceManager.setShouldSyncAppearanceSettings(false);
      appearanceManager.updateTheme(appliedTheme ? vdKey : fallbackTheme);
    }
  }
  function initThemes() {
    var currentTheme2 = getThemeFromLoader();
    enabled = Boolean(currentTheme2);
    patchColor();
    applyTheme(currentTheme2, vdThemeFallback);
    updateThemes().catch(function(e) {
      return console.error("Failed to update themes", e);
    });
  }
  function extractInfo(themeName, colorObj) {
    var propName = colorObj[extractInfo._sym ??= Object.getOwnPropertySymbols(colorObj)[0]];
    var colorDef = color.SemanticColor[propName];
    return [
      propName,
      colorDef[themeName]
    ];
  }
  var import_chroma_js, import_react_native2, color, mmkvStorage, appearanceManager, ThemeStore, formDividerModule, MessagesWrapperConnected, MessagesWrapper, isThemeModule, themes, semanticAlternativeMap, origRawColor, inc, vdKey, vdThemeFallback, enabled, currentTheme, storageResolved, discordThemes;
  var init_themes = __esm({
    "src/lib/themes/index.ts"() {
      "use strict";
      init_loader();
      init_modules();
      init_patcher();
      init_storage();
      init_utils();
      init_lazy();
      init_filters();
      init_lazy2();
      init_wrappers();
      import_chroma_js = __toESM(require_chroma_js());
      import_react_native2 = __toESM(require_react_native());
      color = findByPropsLazy("SemanticColor");
      mmkvStorage = proxyLazy(function() {
        var newModule = findByProps("impl");
        if (typeof newModule?.impl === "object")
          return newModule.impl;
        return findByProps("storage");
      });
      appearanceManager = findByPropsLazy("updateTheme");
      ThemeStore = findByStoreNameLazy("ThemeStore");
      formDividerModule = findByPropsLazy("DIVIDER_COLORS");
      MessagesWrapperConnected = findByNameLazy("MessagesWrapperConnected", false);
      ({ MessagesWrapper } = lazyDestructure(function() {
        return findByProps("MessagesWrapper");
      }));
      isThemeModule = createLazyModule(byMutableProp("isThemeDark"));
      themes = wrapSync(createStorage(createMMKVBackend("VENDETTA_THEMES")));
      semanticAlternativeMap = {
        "BG_BACKDROP": "BACKGROUND_FLOATING",
        "BG_BASE_PRIMARY": "BACKGROUND_PRIMARY",
        "BG_BASE_SECONDARY": "BACKGROUND_SECONDARY",
        "BG_BASE_TERTIARY": "BACKGROUND_SECONDARY_ALT",
        "BG_MOD_FAINT": "BACKGROUND_MODIFIER_ACCENT",
        "BG_MOD_STRONG": "BACKGROUND_MODIFIER_ACCENT",
        "BG_MOD_SUBTLE": "BACKGROUND_MODIFIER_ACCENT",
        "BG_SURFACE_OVERLAY": "BACKGROUND_FLOATING",
        "BG_SURFACE_OVERLAY_TMP": "BACKGROUND_FLOATING",
        "BG_SURFACE_RAISED": "BACKGROUND_MOBILE_PRIMARY"
      };
      origRawColor = {
        ...color.RawColor
      };
      inc = 0;
      vdKey = "vd-theme";
      vdThemeFallback = "darker";
      enabled = false;
      storageResolved = false;
      discordThemes = /* @__PURE__ */ new Set([
        "darker",
        "midnight",
        "dark",
        "light"
      ]);
    }
  });

  // src/lib/api/native/loader.ts
  var loader_exports = {};
  __export(loader_exports, {
    getLoaderConfigPath: () => getLoaderConfigPath,
    getLoaderIdentity: () => getLoaderIdentity,
    getLoaderName: () => getLoaderName,
    getLoaderVersion: () => getLoaderVersion,
    getReactDevToolsProp: () => getReactDevToolsProp,
    getReactDevToolsVersion: () => getReactDevToolsVersion,
    getStoredTheme: () => getStoredTheme,
    getSysColors: () => getSysColors,
    getThemeFilePath: () => getThemeFilePath,
    getVendettaLoaderIdentity: () => getVendettaLoaderIdentity,
    isFontSupported: () => isFontSupported,
    isLoaderConfigSupported: () => isLoaderConfigSupported,
    isPyonLoader: () => isPyonLoader,
    isReactDevToolsPreloaded: () => isReactDevToolsPreloaded,
    isSysColorsSupported: () => isSysColorsSupported,
    isThemeSupported: () => isThemeSupported,
    isVendettaLoader: () => isVendettaLoader
  });
  function isVendettaLoader() {
    return vendettaLoaderIdentity != null;
  }
  function isPyonLoader() {
    return pyonLoaderIdentity != null;
  }
  function polyfillVendettaLoaderIdentity() {
    if (!isPyonLoader() || isVendettaLoader())
      return null;
    var loader = {
      name: pyonLoaderIdentity.loaderName,
      features: {}
    };
    if (isLoaderConfigSupported())
      loader.features.loaderConfig = true;
    if (isSysColorsSupported()) {
      loader.features.syscolors = {
        prop: "__vendetta_syscolors"
      };
      Object.defineProperty(globalThis, "__vendetta_syscolors", {
        get: function() {
          return getSysColors();
        },
        configurable: true
      });
    }
    if (isThemeSupported()) {
      loader.features.themes = {
        prop: "__vendetta_theme"
      };
      Object.defineProperty(globalThis, "__vendetta_theme", {
        // get: () => getStoredTheme(),
        get: function() {
          var id = getStoredTheme()?.id;
          if (!id)
            return null;
          var { themes: themes2 } = (init_themes(), __toCommonJS(themes_exports));
          return themes2[id] ?? getStoredTheme() ?? null;
        },
        configurable: true
      });
    }
    Object.defineProperty(globalThis, "__vendetta_loader", {
      get: function() {
        return loader;
      },
      configurable: true
    });
    return loader;
  }
  function getLoaderIdentity() {
    if (isPyonLoader()) {
      return pyonLoaderIdentity;
    } else if (isVendettaLoader()) {
      return getVendettaLoaderIdentity();
    }
    return null;
  }
  function getVendettaLoaderIdentity() {
    if (globalThis.__vendetta_loader)
      return globalThis.__vendetta_loader;
    return polyfillVendettaLoaderIdentity();
  }
  function getLoaderName() {
    if (isPyonLoader())
      return pyonLoaderIdentity.loaderName;
    else if (isVendettaLoader())
      return vendettaLoaderIdentity.name;
    return "Unknown";
  }
  function getLoaderVersion() {
    if (isPyonLoader())
      return pyonLoaderIdentity.loaderVersion;
    return null;
  }
  function isLoaderConfigSupported() {
    if (isPyonLoader()) {
      return true;
    } else if (isVendettaLoader()) {
      return vendettaLoaderIdentity.features.loaderConfig;
    }
    return false;
  }
  function isThemeSupported() {
    if (isPyonLoader()) {
      return pyonLoaderIdentity.hasThemeSupport;
    } else if (isVendettaLoader()) {
      return vendettaLoaderIdentity.features.themes != null;
    }
    return false;
  }
  function getStoredTheme() {
    if (isPyonLoader()) {
      return pyonLoaderIdentity.storedTheme;
    } else if (isVendettaLoader()) {
      var themeProp = vendettaLoaderIdentity.features.themes?.prop;
      if (!themeProp)
        return null;
      return globalThis[themeProp] || null;
    }
    return null;
  }
  function getThemeFilePath() {
    if (isPyonLoader()) {
      return "pyoncord/current-theme.json";
    } else if (isVendettaLoader()) {
      return "vendetta_theme.json";
    }
    return null;
  }
  function isReactDevToolsPreloaded() {
    if (isPyonLoader()) {
      return Boolean(window.__reactDevTools);
    }
    if (isVendettaLoader()) {
      return vendettaLoaderIdentity.features.devtools != null;
    }
    return false;
  }
  function getReactDevToolsProp() {
    if (!isReactDevToolsPreloaded())
      return null;
    if (isPyonLoader()) {
      window.__pyoncord_rdt = window.__reactDevTools.exports;
      return "__pyoncord_rdt";
    }
    if (isVendettaLoader()) {
      return vendettaLoaderIdentity.features.devtools.prop;
    }
    return null;
  }
  function getReactDevToolsVersion() {
    if (!isReactDevToolsPreloaded())
      return null;
    if (isPyonLoader()) {
      return window.__reactDevTools.version || null;
    }
    if (isVendettaLoader()) {
      return vendettaLoaderIdentity.features.devtools.version;
    }
    return null;
  }
  function isSysColorsSupported() {
    if (isPyonLoader())
      return pyonLoaderIdentity.isSysColorsSupported;
    else if (isVendettaLoader()) {
      return vendettaLoaderIdentity.features.syscolors != null;
    }
    return false;
  }
  function getSysColors() {
    if (!isSysColorsSupported())
      return null;
    if (isPyonLoader()) {
      return pyonLoaderIdentity.sysColors;
    } else if (isVendettaLoader()) {
      return vendettaLoaderIdentity.features.syscolors.prop;
    }
    return null;
  }
  function getLoaderConfigPath() {
    if (isPyonLoader()) {
      return "pyoncord/loader.json";
    } else if (isVendettaLoader()) {
      return "vendetta_loader.json";
    }
    return "loader.json";
  }
  function isFontSupported() {
    if (isPyonLoader())
      return pyonLoaderIdentity.fontPatch === 2;
    return false;
  }
  var pyonLoaderIdentity, vendettaLoaderIdentity;
  var init_loader = __esm({
    "src/lib/api/native/loader.ts"() {
      "use strict";
      pyonLoaderIdentity = globalThis.__PYON_LOADER__;
      vendettaLoaderIdentity = globalThis.__vendetta_loader;
      getVendettaLoaderIdentity();
    }
  });

  // src/lib/api/settings.ts
  var settings_exports = {};
  __export(settings_exports, {
    loaderConfig: () => loaderConfig,
    settings: () => settings
  });
  var settings, loaderConfig;
  var init_settings = __esm({
    "src/lib/api/settings.ts"() {
      "use strict";
      init_loader();
      init_storage();
      settings = wrapSync(createStorage(createMMKVBackend("VENDETTA_SETTINGS")));
      loaderConfig = wrapSync(createStorage(createFileBackend(getLoaderConfigPath(), {
        customLoadUrl: {
          enabled: false,
          url: "http://localhost:4040/bunny.js"
        }
      })));
    }
  });

  // src/metro/polyfills/redesign.ts
  var redesign_exports = {};
  __export(redesign_exports, {
    default: () => redesign_default
  });
  var redesignProps, _module, _source, cacher, actualExports, exportsKeysLength, prop, id, moduleExports, redesign_default;
  var init_redesign = __esm({
    "src/metro/polyfills/redesign.ts"() {
      "use strict";
      init_caches();
      redesignProps = /* @__PURE__ */ new Set([
        "AlertActionButton",
        "AlertModal",
        "AlertModalContainer",
        "AvatarDuoPile",
        "AvatarPile",
        "BACKDROP_OPAQUE_MAX_OPACITY",
        "Backdrop",
        "Button",
        "Card",
        "ContextMenu",
        "ContextMenuContainer",
        "FauxHeader",
        "FloatingActionButton",
        "GhostInput",
        "GuildIconPile",
        "HeaderActionButton",
        "HeaderButton",
        "HeaderSubmittingIndicator",
        "IconButton",
        "Input",
        "InputButton",
        "InputContainer",
        "LayerContext",
        "LayerScope",
        "Modal",
        "ModalActionButton",
        "ModalContent",
        "ModalDisclaimer",
        "ModalFloatingAction",
        "ModalFloatingActionSpacer",
        "ModalFooter",
        "ModalScreen",
        "ModalStepIndicator",
        "NAV_BAR_HEIGHT",
        "NAV_BAR_HEIGHT_MULTILINE",
        "Navigator",
        "NavigatorHeader",
        "NavigatorScreen",
        "Pile",
        "PileOverflow",
        "RedesignCompat",
        "RedesignCompatContext",
        "RowButton",
        "STATUS_BAR_HEIGHT",
        "SceneLoadingIndicator",
        "SearchField",
        "SegmentedControl",
        "SegmentedControlPages",
        "Slider",
        "Stack",
        "StepModal",
        "StickyContext",
        "StickyHeader",
        "StickyWrapper",
        "TABLE_ROW_CONTENT_HEIGHT",
        "TABLE_ROW_HEIGHT",
        "TableCheckboxRow",
        "TableRadioGroup",
        "TableRadioRow",
        "TableRow",
        "TableRowGroup",
        "TableRowGroupTitle",
        "TableRowIcon",
        "TableSwitchRow",
        "Tabs",
        "TextArea",
        "TextField",
        "TextInput",
        "Toast",
        "dismissAlerts",
        "getHeaderBackButton",
        "getHeaderCloseButton",
        "getHeaderConditionalBackButton",
        "getHeaderNoTitle",
        "getHeaderTextButton",
        "hideContextMenu",
        "navigatorShouldCrossfade",
        "openAlert",
        "useAccessibilityNativeStackOptions",
        "useAndroidNavScrim",
        "useCoachmark",
        "useFloatingActionButtonScroll",
        "useFloatingActionButtonState",
        "useNativeStackNavigation",
        "useNavigation",
        "useNavigationTheme",
        "useNavigatorBackPressHandler",
        "useNavigatorScreens",
        "useNavigatorShouldCrossfade",
        "useSegmentedControlState",
        "useStackNavigation",
        "useTabNavigation",
        "useTooltip"
      ]);
      _module = {};
      _source = {};
      cacher = getPolyfillModuleCacher("redesign_module");
      for ([id, moduleExports] of cacher.getModules()) {
        for (prop of redesignProps) {
          actualExports = void 0;
          if (moduleExports[prop]) {
            actualExports = moduleExports;
          } else if (moduleExports.default?.[prop]) {
            actualExports = moduleExports.default;
          } else {
            continue;
          }
          exportsKeysLength = Reflect.ownKeys(actualExports).length;
          if (_source[prop] && exportsKeysLength >= _source[prop]) {
            continue;
          }
          _module[prop] = actualExports[prop];
          _source[prop] = Reflect.ownKeys(actualExports).length;
          cacher.cacheId(id);
          if (exportsKeysLength === 1) {
            redesignProps.delete(prop);
          }
        }
      }
      cacher.finish();
      redesign_default = _module;
    }
  });

  // src/metro/internals/modules.ts
  var modules_exports2 = {};
  __export(modules_exports2, {
    getCachedPolyfillModules: () => getCachedPolyfillModules,
    getImportingModuleId: () => getImportingModuleId,
    getModules: () => getModules,
    metroModules: () => metroModules,
    requireModule: () => requireModule,
    subscribeModule: () => subscribeModule
  });
  function blacklistModule(id) {
    Object.defineProperty(metroModules, id, {
      enumerable: false
    });
    blacklistedIds.add(id);
    indexBlacklistFlag(Number(id));
  }
  function isBadExports(exports) {
    return !exports || exports === window || exports["<!@ pylix was here :fuyusquish: !@>"] === null || exports.__proto__ === Object.prototype && Reflect.ownKeys(exports).length === 0;
  }
  function onModuleRequire(moduleExports, id) {
    indexExportsFlags(id, moduleExports);
    moduleExports.initSentry &&= function() {
      return void 0;
    };
    if (moduleExports.default?.track && moduleExports.default.trackMaker)
      moduleExports.default.track = function() {
        return Promise.resolve();
      };
    if (moduleExports.registerAsset) {
      (init_assets(), __toCommonJS(assets_exports)).patchAssets(moduleExports);
    }
    if (moduleExports?.default?.name === "requireNativeComponent") {
      instead2("default", moduleExports, function(args, origFunc) {
        try {
          return origFunc(...args);
        } catch (e) {
          return args[0];
        }
      });
    }
    if (moduleExports?.default?.constructor?.displayName === "DeveloperExperimentStore") {
      moduleExports.default = new Proxy(moduleExports.default, {
        get(target, property, receiver) {
          if (property === "isDeveloper") {
            var { settings: settings2 } = (init_settings(), __toCommonJS(settings_exports));
            return settings2.enableDiscordDeveloperSettings ?? false;
          }
          return Reflect.get(target, property, receiver);
        }
      });
    }
    if (!patchedImportTracker && moduleExports.fileFinishedImporting) {
      before2("fileFinishedImporting", moduleExports, function([filePath]) {
        if (_importingModuleId === -1 || !filePath)
          return;
        metroModules[_importingModuleId].__filePath = filePath;
      });
      patchedImportTracker = true;
    }
    if (!patchedInspectSource && window["__core-js_shared__"]) {
      var inspect = function(f) {
        return typeof f === "function" && functionToString.apply(f, []);
      };
      window["__core-js_shared__"].inspectSource = inspect;
      patchedInspectSource = true;
    }
    if (moduleExports.findHostInstance_DEPRECATED) {
      var prevExports = metroModules[id - 1]?.publicModule.exports;
      var inc2 = prevExports.default?.reactProfilingEnabled ? 1 : -1;
      if (!metroModules[id + inc2]?.isInitialized) {
        blacklistModule(id + inc2);
      }
    }
    if (moduleExports.isMoment) {
      instead2("defineLocale", moduleExports, function(args, orig) {
        var origLocale = moduleExports.locale();
        orig(...args);
        moduleExports.locale(origLocale);
      });
    }
    var subs = moduleSubscriptions.get(Number(id));
    if (subs) {
      subs.forEach(function(s) {
        return s();
      });
      moduleSubscriptions.delete(Number(id));
    }
  }
  function getImportingModuleId() {
    return _importingModuleId;
  }
  function subscribeModule(id, cb) {
    var subs = moduleSubscriptions.get(id) ?? /* @__PURE__ */ new Set();
    subs.add(cb);
    moduleSubscriptions.set(id, subs);
    return function() {
      return subs.delete(cb);
    };
  }
  function requireModule(id) {
    if (!metroModules[0]?.isInitialized)
      metroRequire(0);
    if (blacklistedIds.has(id))
      return void 0;
    if (Number(id) === -1)
      return init_redesign(), __toCommonJS(redesign_exports);
    if (metroModules[id]?.isInitialized && !metroModules[id]?.hasError) {
      return metroRequire(id);
    }
    var originalHandler = ErrorUtils.getGlobalHandler();
    ErrorUtils.setGlobalHandler(noopHandler);
    var moduleExports;
    try {
      moduleExports = metroRequire(id);
    } catch (e) {
      blacklistModule(id);
      moduleExports = void 0;
    }
    ErrorUtils.setGlobalHandler(originalHandler);
    return moduleExports;
  }
  function* getModules(uniq, all = false) {
    yield [
      -1,
      (init_redesign(), __toCommonJS(redesign_exports))
    ];
    var cache = getMetroCache().findIndex[uniq];
    if (all && !cache?.[`_${ModulesMapInternal.FULL_LOOKUP}`])
      cache = void 0;
    if (cache?.[`_${ModulesMapInternal.NOT_FOUND}`])
      return;
    for (var id in cache) {
      if (id[0] === "_")
        continue;
      var exports = requireModule(Number(id));
      if (isBadExports(exports))
        continue;
      yield [
        id,
        exports
      ];
    }
    for (var id1 in metroModules) {
      var exports1 = requireModule(Number(id1));
      if (isBadExports(exports1))
        continue;
      yield [
        id1,
        exports1
      ];
    }
  }
  function* getCachedPolyfillModules(name) {
    var cache = getMetroCache().polyfillIndex[name];
    for (var id in cache) {
      var exports = requireModule(Number(id));
      if (isBadExports(exports))
        continue;
      yield [
        id,
        exports
      ];
    }
    if (!cache[`_${ModulesMapInternal.FULL_LOOKUP}`]) {
      for (var id1 in metroModules) {
        var exports1 = requireModule(Number(id1));
        if (isBadExports(exports1))
          continue;
        yield [
          id1,
          exports1
        ];
      }
    }
  }
  var _loop, before2, instead2, metroModules, metroRequire, moduleSubscriptions, blacklistedIds, noopHandler, functionToString, patchedInspectSource, patchedImportTracker, _importingModuleId, key;
  var init_modules2 = __esm({
    "src/metro/internals/modules.ts"() {
      "use strict";
      init_caches();
      init_enums();
      _loop = function(key) {
        var id = Number(key);
        var metroModule = metroModules[id];
        var cache = getMetroCache().exportsIndex[id];
        if (cache & ModuleFlags.BLACKLISTED) {
          blacklistModule(id);
          return "continue";
        }
        if (metroModule.factory) {
          instead2("factory", metroModule, function(args, origFunc) {
            var originalImportingId = _importingModuleId;
            _importingModuleId = id;
            var { 1: metroRequire2, 4: moduleObject } = args;
            args[
              2
              /* metroImportDefault */
            ] = function(id2) {
              var exps = metroRequire2(id2);
              return exps && exps.__esModule ? exps.default : exps;
            };
            args[
              3
              /* metroImportAll */
            ] = function(id2) {
              var exps = metroRequire2(id2);
              if (exps && exps.__esModule)
                return exps;
              var importAll = {};
              if (exps)
                Object.assign(importAll, exps);
              importAll.default = exps;
              return importAll;
            };
            origFunc(...args);
            if (!isBadExports(moduleObject.exports)) {
              onModuleRequire(moduleObject.exports, id);
            } else {
              blacklistModule(id);
            }
            _importingModuleId = originalImportingId;
          });
        }
      };
      ({ before: before2, instead: instead2 } = require_cjs());
      metroModules = window.modules;
      metroRequire = window.__r;
      moduleSubscriptions = /* @__PURE__ */ new Map();
      blacklistedIds = /* @__PURE__ */ new Set();
      noopHandler = function() {
        return void 0;
      };
      functionToString = Function.prototype.toString;
      patchedInspectSource = false;
      patchedImportTracker = false;
      _importingModuleId = -1;
      for (key in metroModules)
        _loop(key);
    }
  });

  // src/metro/internals/caches.ts
  var caches_exports = {};
  __export(caches_exports, {
    getCacherForUniq: () => getCacherForUniq,
    getMetroCache: () => getMetroCache,
    getPolyfillModuleCacher: () => getPolyfillModuleCacher,
    indexAssetName: () => indexAssetName,
    indexBlacklistFlag: () => indexBlacklistFlag,
    indexExportsFlags: () => indexExportsFlags,
    initMetroCache: () => initMetroCache
  });
  function buildInitCache() {
    var cache = {
      _v: CACHE_VERSION,
      _buildNumber: ClientInfoManager.Build,
      _modulesCount: Object.keys(window.modules).length,
      exportsIndex: {},
      findIndex: {},
      polyfillIndex: {},
      assetsIndex: {}
    };
    setTimeout(function() {
      for (var id in window.modules) {
        (init_modules2(), __toCommonJS(modules_exports2)).requireModule(id);
      }
    }, 100);
    _metroCache = cache;
    return cache;
  }
  async function initMetroCache() {
    var rawCache = await MMKVManager.getItem(BUNNY_METRO_CACHE_KEY);
    if (rawCache == null)
      return void buildInitCache();
    try {
      _metroCache = JSON.parse(rawCache);
      if (_metroCache._v !== CACHE_VERSION) {
        _metroCache = null;
        throw "cache invalidated; cache version outdated";
      }
      if (_metroCache._buildNumber !== ClientInfoManager.Build) {
        _metroCache = null;
        throw "cache invalidated; version mismatch";
      }
      if (_metroCache._modulesCount !== Object.keys(window.modules).length) {
        _metroCache = null;
        throw "cache invalidated; modules count mismatch";
      }
    } catch (e) {
      buildInitCache();
    }
  }
  function extractExportsFlags(moduleExports) {
    if (!moduleExports)
      return void 0;
    var bit = ModuleFlags.EXISTS;
    return bit;
  }
  function indexExportsFlags(moduleId, moduleExports) {
    var flags = extractExportsFlags(moduleExports);
    if (flags && flags !== ModuleFlags.EXISTS) {
      _metroCache.exportsIndex[moduleId] = flags;
    }
  }
  function indexBlacklistFlag(id) {
    _metroCache.exportsIndex[id] |= ModuleFlags.BLACKLISTED;
  }
  function getCacherForUniq(uniq, allFind) {
    var indexObject = _metroCache.findIndex[uniq] ??= {};
    return {
      cacheId(moduleId, exports) {
        indexObject[moduleId] ??= extractExportsFlags(exports);
        saveCache();
      },
      // Finish may not be called by single find
      finish(notFound) {
        if (allFind)
          indexObject[`_${ModulesMapInternal.FULL_LOOKUP}`] = 1;
        if (notFound)
          indexObject[`_${ModulesMapInternal.NOT_FOUND}`] = 1;
        saveCache();
      }
    };
  }
  function getPolyfillModuleCacher(name) {
    var indexObject = _metroCache.polyfillIndex[name] ??= {};
    return {
      getModules() {
        return (init_modules2(), __toCommonJS(modules_exports2)).getCachedPolyfillModules(name);
      },
      cacheId(moduleId) {
        indexObject[moduleId] = 1;
        saveCache();
      },
      finish() {
        indexObject[`_${ModulesMapInternal.FULL_LOOKUP}`] = 1;
        saveCache();
      }
    };
  }
  function indexAssetName(name, moduleId) {
    if (!isNaN(moduleId)) {
      (_metroCache.assetsIndex[name] ??= {})[moduleId] = 1;
      saveCache();
    }
  }
  var CACHE_VERSION, BUNNY_METRO_CACHE_KEY, _metroCache, getMetroCache, saveCache;
  var init_caches = __esm({
    "src/metro/internals/caches.ts"() {
      "use strict";
      init_modules();
      init_dist();
      init_enums();
      CACHE_VERSION = 52;
      BUNNY_METRO_CACHE_KEY = "__bunny_metro_cache_key__";
      _metroCache = null;
      getMetroCache = window.__getMetroCache = function() {
        return _metroCache;
      };
      saveCache = debounce(function() {
        MMKVManager.setItem(BUNNY_METRO_CACHE_KEY, JSON.stringify(_metroCache));
      }, 1e3);
    }
  });

  // src/metro/common/index.ts
  var common_exports = {};
  __export(common_exports, {
    Flux: () => Flux,
    FluxDispatcher: () => FluxDispatcher,
    NavigationNative: () => NavigationNative,
    React: () => React2,
    ReactNative: () => ReactNative,
    assets: () => assets,
    channels: () => channels,
    clipboard: () => clipboard,
    commands: () => commands,
    constants: () => constants,
    i18n: () => i18n,
    invites: () => invites,
    messageUtil: () => messageUtil,
    navigation: () => navigation,
    navigationStack: () => navigationStack,
    semver: () => semver,
    toasts: () => toasts,
    tokens: () => tokens,
    url: () => url
  });
  var constants, channels, i18n, url, clipboard, assets, invites, commands, navigation, toasts, messageUtil, navigationStack, NavigationNative, tokens, semver, Flux, FluxDispatcher, React2, ReactNative;
  var init_common = __esm({
    "src/metro/common/index.ts"() {
      "use strict";
      init_wrappers();
      constants = findByPropsLazy("Fonts", "Permissions");
      channels = findByPropsLazy("getVoiceChannelId");
      i18n = findByPropsLazy("Messages");
      url = findByPropsLazy("openURL", "openDeeplink");
      clipboard = findByPropsLazy("setString", "getString", "hasString");
      assets = findByPropsLazy("registerAsset");
      invites = findByPropsLazy("acceptInviteAndTransitionToInviteChannel");
      commands = findByPropsLazy("getBuiltInCommands");
      navigation = findByPropsLazy("pushLazy");
      toasts = findByFilePathLazy("modules/toast/native/ToastActionCreators.tsx", true);
      messageUtil = findByPropsLazy("sendBotMessage");
      navigationStack = findByPropsLazy("createStackNavigator");
      NavigationNative = findByPropsLazy("NavigationContainer");
      tokens = findByPropsLazy("colors", "unsafe_rawColors");
      semver = findByPropsLazy("parse", "clean");
      Flux = findByPropsLazy("connectStores");
      FluxDispatcher = findByProps("_interceptors");
      React2 = window.React = findByPropsLazy("createElement");
      ReactNative = window.ReactNative = findByPropsLazy("AppRegistry");
    }
  });

  // globals:moment
  var require_moment = __commonJS({
    "globals:moment"(exports, module) {
      module.exports = require_depsModule()["moment"];
    }
  });

  // src/core/fixes.ts
  function onDispatch({ locale }) {
    try {
      import_moment.default.locale(locale.toLowerCase());
    } catch (e) {
      logger.error("Failed to fix timestamps...", e);
    }
    FluxDispatcher.unsubscribe("I18N_LOAD_SUCCESS", onDispatch);
  }
  function fixes_default() {
    FluxDispatcher.subscribe("I18N_LOAD_SUCCESS", onDispatch);
  }
  var import_moment;
  var init_fixes = __esm({
    "src/core/fixes.ts"() {
      "use strict";
      init_logger();
      init_common();
      import_moment = __toESM(require_moment());
    }
  });

  // src/core/i18n/default.json
  var default_default;
  var init_default = __esm({
    "src/core/i18n/default.json"() {
      default_default = {
        ABOUT: "About",
        ACTIONS: "Actions",
        ARE_YOU_SURE_TO_CLEAR_DATA: "Are you sure you wish to clear the data of {name}?",
        ARE_YOU_SURE_TO_DELETE_PLUGIN: "Are you sure you wish to delete {name}? This will clear all of the plugin's data.",
        ARE_YOU_SURE_TO_DELETE_THEME: "Are you sure you wish to delete {name}?",
        ASSET_BROWSER: "Asset Browser",
        BRAND: "Brand",
        BUNNY: "Bunny",
        BUNNY_URL: "Bunny URL",
        BYTECODE: "Bytecode",
        CANCEL: "Cancel",
        CLEAR: "Clear",
        CLEAR_DATA: "Clear data",
        CLEAR_DATA_FAILED: "Failed to clear data for {name}!",
        CLEAR_DATA_SUCCESSFUL: "Cleared data for {name}.",
        CODENAME: "Codename",
        COMMAND_DEBUG_DESC: "Send Bunny debug info.",
        COMMAND_DEBUG_OPT_EPHEMERALLY: "Send debug info ephemerally.",
        COMMAND_EVAL_DESC: "Evaluate JavaScript code.",
        COMMAND_EVAL_OPT_ASYNC: "Whether to support 'await' in code. Must explicitly return for result (default: false)",
        COMMAND_EVAL_OPT_CODE: "The code to evaluate.",
        COMMAND_PLUGINS_DESC: "Send list of installed plugins.",
        COMMAND_PLUGINS_OPT_EPHEMERALLY: "Send plugins list ephemerally.",
        COMPONENT: "Component",
        CONFIRMATION_LINK_IS_A_TYPE: "This link is a **{urlType, select, plugin {Plugin} theme {Theme} other {Add-on}}**, would you like to install it?",
        CONNECT_TO_DEBUG_WEBSOCKET: "Connect to debug websocket",
        CONNECT_TO_REACT_DEVTOOLS: "Connect to React DevTools",
        COPIED_TO_CLIPBOARD: "Copied to clipboard",
        COPY_URL: "Copy URL",
        DEBUG: "Debug",
        DEBUGGER_URL: "Debugger URL",
        DELETE: "Delete",
        DESC_EXTRACT_FONTS_FROM_THEME: 'Looks out for "fonts" field in your currently applied theme and install it.',
        DEVELOPER: "Developer",
        DEVELOPER_SETTINGS: "Developer Settings",
        DISABLE_THEME: "Disable Theme",
        DISABLE_UPDATES: "Disable updates",
        DISCORD_SERVER: "Discord Server",
        DONE: "Done",
        ENABLE_EVAL_COMMAND: "Enable /eval command",
        ENABLE_EVAL_COMMAND_DESC: "Evaluate JavaScript directly from command. Be cautious when using this command as it may pose a security risk. Make sure to know what you are doing.",
        ENABLE_UPDATES: "Enable updates",
        ERROR_BOUNDARY_TOOLS_LABEL: "ErrorBoundary Tools",
        EXTRACT: "Extract",
        FONT_NAME: "Font Name",
        FONTS: "Fonts",
        GENERAL: "General",
        GITHUB: "GitHub",
        HOLD_UP: "Hold Up",
        INFO: "Info",
        INSTALL: "Install",
        INSTALL_ADDON: "Install an add-on",
        INSTALL_FONT: "Install a font",
        INSTALL_PLUGIN: "Install a plugin",
        INSTALL_REACT_DEVTOOLS: "Install React DevTools",
        INSTALL_THEME: "Install Theme",
        LABEL_EXTRACT_FONTS_FROM_THEME: "Extract font from theme",
        LINKS: "Links",
        LOAD_FROM_CUSTOM_URL: "Load from custom URL",
        LOAD_FROM_CUSTOM_URL_DEC: "Load Bunny from a custom endpoint.",
        LOAD_REACT_DEVTOOLS: "Load React DevTools",
        LOADER: "Loader",
        MACHINE_ID: "Machine ID",
        MANUFACTURER: "Manufacturer",
        MESSAGE: "Message",
        MISCELLANEOUS: "Miscellaneous",
        MODAL_THEME_REFETCHED: "Theme refetched",
        MODAL_THEME_REFETCHED_DESC: "A reload is required to see the changes. Do you want to reload now?",
        MODAL_UNPROXIED_PLUGIN_DESC: "The plugin you are trying to install has not been proxied/verified by staffs. Are you sure you want to continue?",
        MODAL_UNPROXIED_PLUGIN_HEADER: "Unproxied Plugin",
        MODEL: "Model",
        OPEN_IN_BROWSER: "Open in Browser",
        OPERATING_SYSTEM: "Operating System",
        OVERFLOW_PLUGIN_SETTINGS: "Plugin settings",
        PLATFORM: "Platform",
        PLUGIN_REFETCH_FAILED: "Failed to refetch plugin!",
        PLUGIN_REFETCH_SUCCESSFUL: "Successfully refetched plugin!",
        PLUGINS: "Plugins",
        REFETCH: "Refetch",
        RELOAD: "Reload",
        RELOAD_DISCORD: "Reload Discord",
        RELOAD_IN_NORMAL_MODE: "Reload in Normal Mode",
        RELOAD_IN_NORMAL_MODE_DESC: "This will reload Discord normally",
        RELOAD_IN_SAFE_MODE: "Reload in Safe Mode",
        RELOAD_IN_SAFE_MODE_DESC: "This will reload Discord without loading addons",
        REMOVE: "Remove",
        RESTART_REQUIRED_TO_TAKE_EFFECT: "Restart is required to take effect",
        RETRY: "Retry",
        RETRY_RENDER: "Retry Render",
        SAFE_MODE: "Safe Mode",
        SAFE_MODE_NOTICE_FONTS: "You are in Safe Mode, meaning fonts have been temporarily disabled. {enabled, select, true {If a font appears to be causing the issue, you can press below to disable it persistently.} other {}}",
        SAFE_MODE_NOTICE_PLUGINS: "You are in Safe Mode, so plugins cannot be loaded. Disable any misbehaving plugins, then return to Normal Mode from the General settings page.",
        SAFE_MODE_NOTICE_THEMES: "You are in Safe Mode, meaning themes have been temporarily disabled. {enabled, select, true {If a theme appears to be causing the issue, you can press below to disable it persistently.} other {}}",
        SEARCH: "Search",
        SEPARATOR: ", ",
        SETTINGS_ACTIVATE_DISCORD_EXPERIMENTS: "Activate Discord Experiments",
        SETTINGS_ACTIVATE_DISCORD_EXPERIMENTS_DESC: "Warning: Messing with this feature may lead to account termination. We are not responsible for what you do with this feature.",
        STACK_TRACE: "Stack Trace",
        SUCCESSFULLY_INSTALLED: "Successfully installed",
        THEME_EXTRACTOR_DESC: "This pack overrides the following: {fonts}",
        THEME_REFETCH_FAILED: "Failed to refetch theme!",
        THEME_REFETCH_SUCCESSFUL: "Successfully refetched theme.",
        THEMES: "Themes",
        THEMES_RELOAD_FOR_CHANGES: "Reload the app to fully apply changes!",
        TOASTS_INSTALLED_PLUGIN: "Installed plugin",
        TOASTS_PLUGIN_UPDATE: "{update, select, true {Enabled} other {Disabled}} updates for {name}.",
        UH_OH: "Uh oh.",
        UNINSTALL: "Uninstall",
        UNINSTALL_TITLE: "Uninstall {title}",
        URL_PLACEHOLDER: "https://example.com",
        VERSION: "Version",
        VERSIONS: "Versions"
      };
    }
  });

  // src/core/i18n/index.ts
  function initFetchI18nStrings() {
    var cb = function({ locale }) {
      var languageMap = {
        "es-ES": "es",
        "es-419": "es_419",
        "zh-TW": "zh-Hant",
        "zh-CN": "zh-Hans",
        "pt-PT": "pt",
        "pt-BR": "pt_BR",
        "sv-SE": "sv"
      };
      var resolvedLocale = _lastSetLocale = languageMap[locale] ?? locale;
      if (resolvedLocale.startsWith("en-")) {
        _currentLocale = null;
        return;
      }
      if (!_loadedLocale.has(resolvedLocale)) {
        _loadedLocale.add(resolvedLocale);
        fetch(`https://raw.githubusercontent.com/pyoncord/i18n/main/resources/${resolvedLocale}/bunny.json`).then(function(r) {
          return r.json();
        }).then(function(strings) {
          return _loadedStrings[resolvedLocale] = strings;
        }).then(function() {
          return resolvedLocale === _lastSetLocale && (_currentLocale = resolvedLocale);
        }).catch(function(e) {
          return console.error(`An error occured while fetching strings for ${resolvedLocale}: ${e}`);
        });
      } else {
        _currentLocale = resolvedLocale;
      }
    };
    FluxDispatcher.subscribe("I18N_LOAD_SUCCESS", cb);
    return function() {
      return FluxDispatcher.unsubscribe("I18N_LOAD_SUCCESS", cb);
    };
  }
  function formatString(key, val) {
    var str = Strings[key];
    return new IntlMessageFormat(str).format(val);
  }
  var IntlMessageFormat, _currentLocale, _lastSetLocale, _loadedLocale, _loadedStrings, Strings;
  var init_i18n = __esm({
    "src/core/i18n/index.ts"() {
      "use strict";
      init_common();
      init_wrappers();
      init_default();
      IntlMessageFormat = findByNameLazy("MessageFormat");
      _currentLocale = null;
      _lastSetLocale = null;
      _loadedLocale = /* @__PURE__ */ new Set();
      _loadedStrings = {};
      Strings = new Proxy({}, {
        get: function(_t, prop) {
          if (_currentLocale && _loadedStrings[_currentLocale]?.[prop]) {
            return _loadedStrings[_currentLocale]?.[prop];
          }
          return default_default[prop];
        }
      });
    }
  });

  // src/assets/icons/pyoncord.png
  var pyoncord_default;
  var init_pyoncord = __esm({
    "src/assets/icons/pyoncord.png"() {
      pyoncord_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABoBJREFUeF7lW1nIVlUUXasom80kijJKaVQzGtTUjCJteNBmeqigssnIpDIqwmw0GqhQi4iw8SEaHtKgMpNKM7SiyUZpLppoTi0rd2f9nCu36/2+79zxv/5t8MV/n333WWefffb0EQ0iM+sH4AEAowG8CGAqycVVqsgqhWeVbWavAtg/tu4vABNIPphVVih/YwAws2EAlrRQfChJgVM6NQmARwGc0GKHX5PcofTdA2gSAJ8A2KXNJueQPLpsEJoEwI8A+rTZ4GrnIAeQ/KpMEJoEwCoAm3TY3DKSezcKADPbCMDWADYEIK/9B4CVJC2LomYWwv8PgC1JCqxSqJAFmNlOAF6PAfA3ACn3MYBLSD4bqmUgABI3l+T4ULmd+IoCcDeAs9p8RI5NPDNJrminTAYAZAVbkJSlFaaiALwJYEiAFh8CuJHk7Fa8ZqaNbRAgSyzjSc4N5G3LVhQAmfiYDIosBXAGyXeSa8xMJ9orUNb7AAZm9TNpsosCMNnd/9sDlY7Y/gRwAYDZJOUzusjMfvK+JFRcX5J6OgtRUQB2B/BBDg3k8ZeQHBED4AsASoZCaTTJRaHMrfiKAqD1jwM4NqcinwE4mOTnZiYgBWgozSN5RChzJQB40x0A4KMCivwO4GQAFwI4JIMcRYa9i74GhSwgZr5XuWs8LYPyaazPAMh6ojvLeop8tywA5L0V/FSSsbXZ4Eh3DV7udgD8VdgMwK8+JC6iU5a115GcmmVBkrcUC4hdhYPcPX6+RhAWkDysMQB4SzgXwB0Zoroi+q8iKcvLTaVaQMwSZgGYWBMIfUj+nBeBSgDwljADwHk1XIdCL0FlAMRAOL/i0tsgku82zgI8AMruLgNwfV4FA9btQ/KtAL5UlkotIOYTjgdwr6o5eRVts244SWWZuagWALw1DFUGCGBwLk1bLxpG8pW8MmsDwIPQ25W+7wNwTF6FU9bJ2U7L+xLUCkDsSij5keLblASEagmjSL6XVV63AOCtQSVw3d2yytxr3JN7LUklZsHUnQAMcnUE1RRVTi+TXgIwjqSsoiN1CwBmtqvzA28A2LyjhvkYlCKr9vhcp+W1A2BmewB4AcB2nZQr+Hc1aaaQlK9pSbUC4E9eLfCynF8IRoo/JpJUMXYdqgUAM9N3RgFYGKJxDh71FK5WAwbAvgAeShRnPgWwZxoIdQFwEwCV0DfOsbmQJWPi993MZGGqMsdT5e9VdE3GC5UCYGY69ehUQjaSh0dv/5B4j0FCXJ8hrWexHMAIkj9EH6oEADNTZUjNj+MqeOaSIM0nOTb5n2amStH8FEQVNh8eWcJaAHybe7gfU9kLgEzmbd/91VCCujArXdd3hdA2M73fKobKzDTYIK+uRsel7tT75jnKnGvUUtuWpMrra8nMNG12aguZatjKMa7pAsDMtnK9tkdylKVz6lz6snsATFKPwB+M+gtppx//sBoyCyMAkuNppWtYg0CVxeT4tvfPbKcI8zHXpD2RZnaOW3RXDQo27ROrSfYSAGowylv/30iR4qYCQBFSVe9zk0Fd5GKH0QJAPfpO96XJG8mjmyJHOcHFAuA1APvlkbIerzmN5P3SXwBc7IaOblmPN5NVdaXK/RUDRACoTqcOq4KfptA37l1XuKpma0QKrlQ/2LEEJY8i+XQXAD4Q6u+uwZwKKrbtdNWYjMboNDClf0qTl+ktb5W6RsLMbDc/naZK80Cvt/YQSvruYJIr46GwanQTAJzph5Y1/Vk2aVZQCck8xR4kpUgpZGYCQDHNOK9/p6bpRSRvS02GzEx1tZGlaAbopH8DcDnJO0uS2VaMmWnzk1xz9hrXldIob9o+ldf0W+cPZiafkLvbmtDsSY3MytQ7mXUVwJiZrFozTKoK6QcZSVrXAszsSABPFVRIs4MzyjTxgvoo4TsAwCm+Yy2rEC1PswC9CAfm+KBMSsWPW0l+l2N9LUt8UfYKf8Vn/gcAM9MT82VGTeTYngBwdqeB6Ixya2FPAnCSKx4+HPhlBRJ6vsaS/DZwTePYkgCozx7SqpJXl69YmqzFNW6HHRSKxwGhc79XApgV2npqOiBxAE73/ftWOquRqbJT7mGEJoIRhcIaZVGjMm14QT+BucHVDKa7oUSlkT2KIgAUT6/zIwbXYFTmpLxZU909kiIAprhM6+bEDqf7Hy93pY09lSIAFriO7aF+k7/4aYs0i+hxOEQAqIGgNrJ+iDS5p3j4kNP6F9f7+CyBdXonAAAAAElFTkSuQmCC";
    }
  });

  // shims/jsxRuntime.ts
  function unproxyFirstArg(args) {
    var factory = getProxyFactory(args[0]);
    if (factory)
      args[0] = factory();
    return args;
  }
  var jsxRuntime, Fragment, jsx, jsxs;
  var init_jsxRuntime = __esm({
    "shims/jsxRuntime.ts"() {
      "use strict";
      init_lazy();
      init_wrappers();
      jsxRuntime = findByPropsLazy("jsx", "jsxs", "Fragment");
      Fragment = Symbol.for("react.fragment");
      jsx = function(...args) {
        return jsxRuntime.jsx(...unproxyFirstArg(args));
      };
      jsxs = function(...args) {
        return jsxRuntime.jsxs(...unproxyFirstArg(args));
      };
    }
  });

  // src/metro/common/components.ts
  var bySingularProp, findSingular, findProp, LegacyAlert, CompatButton, HelpMessage, SafeAreaView, ActionSheetRow, Button, TwinButtons, IconButton, RowButton, PressableScale, TableRow, TableRowIcon, TableRowTrailingText, TableRowGroup, TableSwitchRow, TableSwitch, TableRadio, TableCheckbox, FormSwitch, FormRadio, FormCheckbox, Card, RedesignCompat, Stack, TextInput, SegmentedControl, CompatSegmentedControl, FloatingActionButton, ActionSheet, BottomSheetTitleHeader, textsModule, Text, Forms, LegacyForm, LegacyFormArrow, LegacyFormCTA, LegacyFormCTAButton, LegacyFormCardSection, LegacyFormCheckbox, LegacyFormCheckboxRow, LegacyFormCheckmark, LegacyFormDivider, LegacyFormHint, LegacyFormIcon, LegacyFormInput, LegacyFormLabel, LegacyFormRadio, LegacyFormRadioGroup, LegacyFormRadioRow, LegacyFormRow, LegacyFormSection, LegacyFormSelect, LegacyFormSliderRow, LegacyFormSubLabel, LegacyFormSwitch, LegacyFormSwitchRow, LegacyFormTernaryCheckBox, LegacyFormText, LegacyFormTitle;
  var init_components = __esm({
    "src/metro/common/components.ts"() {
      "use strict";
      init_lazy();
      init_factories();
      init_finders();
      init_wrappers();
      bySingularProp = createFilterDefinition(function([prop], m) {
        return m[prop] && Object.keys(m).length === 1;
      }, function(prop) {
        return `bunny.metro.common.components.bySingularProp(${prop})`;
      });
      findSingular = function(prop) {
        return proxyLazy(function() {
          return findExports(bySingularProp(prop))?.[prop];
        });
      };
      findProp = function(prop) {
        return proxyLazy(function() {
          return findByProps(prop)[prop];
        });
      };
      LegacyAlert = findByDisplayNameLazy("FluxContainer(Alert)");
      CompatButton = findByPropsLazy("Looks", "Colors", "Sizes");
      HelpMessage = findByNameLazy("HelpMessage");
      SafeAreaView = proxyLazy(function() {
        return findByProps("useSafeAreaInsets").SafeAreaView;
      });
      ActionSheetRow = findProp("ActionSheetRow");
      Button = findSingular("Button");
      TwinButtons = findProp("TwinButtons");
      IconButton = findSingular("IconButton");
      RowButton = findProp("RowButton");
      PressableScale = findProp("PressableScale");
      TableRow = findProp("TableRow");
      TableRowIcon = findProp("TableRowIcon");
      TableRowTrailingText = findProp("TableRowTrailingText");
      TableRowGroup = findProp("TableRowGroup");
      TableSwitchRow = findProp("TableSwitchRow");
      TableSwitch = findSingular("FormSwitch");
      TableRadio = findSingular("FormRadio");
      TableCheckbox = findSingular("FormCheckbox");
      FormSwitch = findSingular("FormSwitch");
      FormRadio = findSingular("FormRadio");
      FormCheckbox = findSingular("FormCheckbox");
      Card = findProp("Card");
      RedesignCompat = proxyLazy(function() {
        return findByProps("RedesignCompat").RedesignCompat;
      });
      Stack = findProp("Stack");
      TextInput = findSingular("TextInput");
      SegmentedControl = findProp("SegmentedControl");
      CompatSegmentedControl = findProp("CompatSegmentedControl");
      FloatingActionButton = findProp("FloatingActionButton");
      ActionSheet = findProp("ActionSheet");
      BottomSheetTitleHeader = findProp("BottomSheetTitleHeader");
      textsModule = findByPropsLazy("Text", "LegacyText");
      Text = proxyLazy(function() {
        return textsModule.Text;
      });
      Forms = findByPropsLazy("Form", "FormSection");
      ({ Form: LegacyForm, FormArrow: LegacyFormArrow, FormCTA: LegacyFormCTA, FormCTAButton: LegacyFormCTAButton, FormCardSection: LegacyFormCardSection, FormCheckbox: LegacyFormCheckbox, FormCheckboxRow: LegacyFormCheckboxRow, FormCheckmark: LegacyFormCheckmark, FormDivider: LegacyFormDivider, FormHint: LegacyFormHint, FormIcon: LegacyFormIcon, FormInput: LegacyFormInput, FormLabel: LegacyFormLabel, FormRadio: LegacyFormRadio, FormRadioGroup: LegacyFormRadioGroup, FormRadioRow: LegacyFormRadioRow, FormRow: LegacyFormRow, FormSection: LegacyFormSection, FormSelect: LegacyFormSelect, FormSliderRow: LegacyFormSliderRow, FormSubLabel: LegacyFormSubLabel, FormSwitch: LegacyFormSwitch, FormSwitchRow: LegacyFormSwitchRow, FormTernaryCheckBox: LegacyFormTernaryCheckBox, FormText: LegacyFormText, FormTitle: LegacyFormTitle } = lazyDestructure(function() {
        return Forms;
      }));
    }
  });

  // src/lib/ui/color.ts
  var color_exports = {};
  __export(color_exports, {
    isSemanticColor: () => isSemanticColor,
    rawColors: () => rawColors,
    resolveSemanticColor: () => resolveSemanticColor,
    semanticColors: () => semanticColors
  });
  function isSemanticColor(sym) {
    return colorResolver.isSemanticColor(sym);
  }
  function resolveSemanticColor(sym, theme = ThemeStore2.theme) {
    return colorResolver.resolveSemanticColor(theme, sym);
  }
  var semanticColors, rawColors, ThemeStore2, colorResolver;
  var init_color = __esm({
    "src/lib/ui/color.ts"() {
      "use strict";
      init_themes();
      init_common();
      init_wrappers();
      semanticColors = color?.default?.colors ?? constants?.ThemeColorMap;
      rawColors = color?.default?.unsafe_rawColors ?? constants?.Colors;
      ThemeStore2 = findByStoreNameLazy("ThemeStore");
      colorResolver = color.default.meta ??= color.default.internal;
    }
  });

  // src/lib/ui/styles.ts
  var styles_exports = {};
  __export(styles_exports, {
    TextStyleSheet: () => TextStyleSheet,
    createStyles: () => createStyles,
    createThemedStyleSheet: () => createThemedStyleSheet
  });
  function createStyles(sheet) {
    return proxyLazy(function() {
      return CompatfulRedesign.createStyles(sheet);
    });
  }
  function createThemedStyleSheet(sheet) {
    for (var key in sheet) {
      sheet[key] = new Proxy(import_react_native3.StyleSheet.flatten(sheet[key]), {
        get(target, prop, receiver) {
          var res = Reflect.get(target, prop, receiver);
          return isSemanticColor(res) ? resolveSemanticColor(res) : res;
        }
      });
    }
    return sheet;
  }
  var import_react_native3, CompatfulRedesign, TextStyleSheet;
  var init_styles = __esm({
    "src/lib/ui/styles.ts"() {
      "use strict";
      init_lazy();
      init_wrappers();
      init_color();
      import_react_native3 = __toESM(require_react_native());
      CompatfulRedesign = findByPropsLazy("createStyles");
      ({ TextStyleSheet } = lazyDestructure(function() {
        return findByProps("TextStyleSheet");
      }));
    }
  });

  // src/lib/ui/components/Codeblock.tsx
  function Codeblock({ selectable, style, children }) {
    if (!selectable)
      return /* @__PURE__ */ jsx(TextBasedCodeblock, {
        style,
        children
      });
    return import_react_native4.Platform.select({
      ios: /* @__PURE__ */ jsx(InputBasedCodeblock, {
        style,
        children
      }),
      default: /* @__PURE__ */ jsx(TextBasedCodeblock, {
        style,
        children,
        selectable: true
      })
    });
  }
  var import_react_native4, useStyles, InputBasedCodeblock, TextBasedCodeblock;
  var init_Codeblock = __esm({
    "src/lib/ui/components/Codeblock.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_common();
      init_color();
      init_styles();
      import_react_native4 = __toESM(require_react_native());
      useStyles = createStyles({
        codeBlock: {
          fontFamily: constants.Fonts.CODE_NORMAL,
          fontSize: 12,
          textAlignVertical: "center",
          backgroundColor: semanticColors.BACKGROUND_SECONDARY,
          color: semanticColors.TEXT_NORMAL,
          borderWidth: 1,
          borderRadius: 12,
          borderColor: semanticColors.BACKGROUND_TERTIARY,
          padding: 10
        }
      });
      InputBasedCodeblock = function({ style, children }) {
        return /* @__PURE__ */ jsx(import_react_native4.TextInput, {
          editable: false,
          multiline: true,
          style: [
            useStyles().codeBlock,
            style && style
          ],
          value: children
        });
      };
      TextBasedCodeblock = function({ selectable, style, children }) {
        return /* @__PURE__ */ jsx(import_react_native4.Text, {
          selectable,
          style: [
            useStyles().codeBlock,
            style && style
          ],
          children
        });
      };
    }
  });

  // src/lib/ui/components/ContextMenu.tsx
  function ContextMenu(props) {
    var ref = React.useRef(null);
    React.useEffect(function() {
      if (import_react_native5.Platform.OS !== "android")
        return;
      var ctxMenuReactTag = ref.current?._children?.[0]?._nativeTag;
      return function() {
        if (!ctxMenuReactTag)
          return;
        var unpatch = instead("setAccessibilityFocus", import_react_native5.AccessibilityInfo, function([tag], orig) {
          if (tag !== ctxMenuReactTag) {
            return orig.apply(import_react_native5.AccessibilityInfo, [
              tag
            ]);
          } else {
            unpatch();
          }
        });
      };
    }, []);
    return /* @__PURE__ */ jsx(import_react_native5.View, {
      ref,
      children: /* @__PURE__ */ jsx(_ContextMenu, {
        ...props
      })
    });
  }
  var import_react_native5, _ContextMenu;
  var init_ContextMenu = __esm({
    "src/lib/ui/components/ContextMenu.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_patcher();
      init_lazy();
      init_wrappers();
      import_react_native5 = __toESM(require_react_native());
      ({ ContextMenu: _ContextMenu } = lazyDestructure(function() {
        return findByProps("ContextMenu");
      }));
    }
  });

  // src/lib/ui/components/ErrorBoundary.tsx
  var import_react_native6, styles, _React_Component, ErrorBoundary;
  var init_ErrorBoundary = __esm({
    "src/lib/ui/components/ErrorBoundary.tsx"() {
      "use strict";
      init_class_call_check();
      init_create_class();
      init_define_property();
      init_inherits();
      init_create_super();
      init_jsxRuntime();
      init_i18n();
      init_common();
      init_components();
      init_components2();
      init_styles();
      import_react_native6 = __toESM(require_react_native());
      styles = createThemedStyleSheet({
        view: {
          flex: 1,
          flexDirection: "column",
          margin: 10
        },
        title: {
          fontSize: 20,
          textAlign: "center",
          marginBottom: 5
        }
      });
      ErrorBoundary = /* @__PURE__ */ function(_superClass) {
        "use strict";
        _inherits(ErrorBoundary3, _superClass);
        var _super = _create_super(ErrorBoundary3);
        function ErrorBoundary3(props) {
          _class_call_check(this, ErrorBoundary3);
          var _this;
          _this = _super.call(this, props);
          _this.state = {
            hasErr: false
          };
          return _this;
        }
        _create_class(ErrorBoundary3, [
          {
            key: "render",
            value: function render() {
              var _this = this;
              if (!this.state.hasErr)
                return this.props.children;
              return /* @__PURE__ */ jsxs(import_react_native6.ScrollView, {
                style: styles.view,
                children: [
                  /* @__PURE__ */ jsx(LegacyFormText, {
                    style: styles.title,
                    children: Strings.UH_OH
                  }),
                  /* @__PURE__ */ jsx(Codeblock, {
                    selectable: true,
                    style: {
                      marginBottom: 5
                    },
                    children: this.state.error.name
                  }),
                  /* @__PURE__ */ jsx(Codeblock, {
                    selectable: true,
                    style: {
                      marginBottom: 5
                    },
                    children: this.state.error.message
                  }),
                  this.state.error.stack && /* @__PURE__ */ jsx(import_react_native6.ScrollView, {
                    style: {
                      maxHeight: 420,
                      marginBottom: 5
                    },
                    children: /* @__PURE__ */ jsx(Codeblock, {
                      selectable: true,
                      children: this.state.error.stack
                    })
                  }),
                  /* @__PURE__ */ jsx(Button, {
                    size: "md",
                    variant: "destructive",
                    onPress: function() {
                      return _this.setState({
                        hasErr: false
                      });
                    },
                    text: Strings.RETRY
                  })
                ]
              });
            }
          }
        ]);
        return ErrorBoundary3;
      }(_React_Component = React2.Component);
      _define_property(ErrorBoundary, "getDerivedStateFromError", function(error) {
        return {
          hasErr: true,
          error
        };
      });
    }
  });

  // src/lib/ui/components/Search.tsx
  function SearchIcon() {
    return /* @__PURE__ */ jsx(import_react_native7.Image, {
      style: {
        width: 16,
        height: 16
      },
      source: findAssetId("search")
    });
  }
  function Search_default({ onChangeText, placeholder, style }) {
    var [query, setQuery] = React.useState("");
    var onChange = function(value) {
      setQuery(value);
      onChangeText?.(value);
    };
    return /* @__PURE__ */ jsx(ErrorBoundary, {
      children: /* @__PURE__ */ jsx(import_react_native7.View, {
        style,
        children: /* @__PURE__ */ jsx(TextInput, {
          grow: true,
          isClearable: true,
          leadingIcon: SearchIcon,
          placeholder: placeholder ?? Strings.SEARCH,
          onChange,
          returnKeyType: "search",
          size: "md",
          autoCapitalize: "none",
          autoCorrect: false,
          value: query
        })
      })
    });
  }
  var import_react_native7;
  var init_Search = __esm({
    "src/lib/ui/components/Search.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_i18n();
      init_assets();
      init_components();
      init_ErrorBoundary();
      import_react_native7 = __toESM(require_react_native());
    }
  });

  // src/lib/ui/components/Summary.tsx
  function Summary({ label, icon, noPadding = false, noAnimation = false, children }) {
    var [hidden, setHidden] = React.useState(true);
    return /* @__PURE__ */ jsxs(Fragment, {
      children: [
        /* @__PURE__ */ jsx(TableRow, {
          label,
          icon: icon && /* @__PURE__ */ jsx(TableRow.Icon, {
            source: findAssetId(icon)
          }),
          trailing: /* @__PURE__ */ jsx(LegacyFormRow.Arrow, {
            style: {
              transform: [
                {
                  rotate: `${hidden ? 180 : 90}deg`
                }
              ]
            }
          }),
          onPress: function() {
            setHidden(!hidden);
            if (!noAnimation)
              import_react_native8.LayoutAnimation.configureNext(import_react_native8.LayoutAnimation.Presets.easeInEaseOut);
          }
        }),
        !hidden && /* @__PURE__ */ jsx(Fragment, {
          children: /* @__PURE__ */ jsx(import_react_native8.View, {
            style: !noPadding && {
              paddingHorizontal: 15
            },
            children
          })
        })
      ]
    });
  }
  var import_react_native8;
  var init_Summary = __esm({
    "src/lib/ui/components/Summary.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_assets();
      init_components();
      import_react_native8 = __toESM(require_react_native());
    }
  });

  // src/lib/ui/components/index.ts
  var components_exports = {};
  __export(components_exports, {
    Codeblock: () => Codeblock,
    ContextMenu: () => ContextMenu,
    ErrorBoundary: () => ErrorBoundary,
    Search: () => Search_default,
    Summary: () => Summary
  });
  var init_components2 = __esm({
    "src/lib/ui/components/index.ts"() {
      "use strict";
      init_Codeblock();
      init_ContextMenu();
      init_ErrorBoundary();
      init_Search();
      init_Summary();
    }
  });

  // src/lib/ui/settings/patches/shared.tsx
  function wrapOnPress(onPress, navigation2, renderPromise, screenOptions, props) {
    return async function() {
      if (onPress)
        return void onPress();
      var Component = await renderPromise().then(function(m) {
        return m.default;
      });
      if (typeof screenOptions === "string") {
        screenOptions = {
          title: screenOptions
        };
      }
      navigation2 ??= tabsNavigationRef.getRootNavigationRef();
      navigation2.navigate("VendettaCustomPage", {
        ...screenOptions,
        render: function() {
          return /* @__PURE__ */ jsx(Component, {
            ...props
          });
        }
      });
    };
  }
  var tabsNavigationRef, CustomPageRenderer;
  var init_shared = __esm({
    "src/lib/ui/settings/patches/shared.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_common();
      init_wrappers();
      init_components2();
      tabsNavigationRef = findByPropsLazy("getRootNavigationRef");
      CustomPageRenderer = React.memo(function() {
        var navigation2 = NavigationNative.useNavigation();
        var route = NavigationNative.useRoute();
        var { render: PageComponent, ...args } = route.params;
        React.useEffect(function() {
          return void navigation2.setOptions({
            ...args
          });
        }, []);
        return /* @__PURE__ */ jsx(ErrorBoundary, {
          children: /* @__PURE__ */ jsx(PageComponent, {})
        });
      });
    }
  });

  // src/lib/ui/settings/patches/panel.tsx
  function SettingsSection() {
    var navigation2 = NavigationNative.useNavigation();
    return /* @__PURE__ */ jsx(Fragment, {
      children: Object.keys(registeredSections).map(function(sect) {
        return /* @__PURE__ */ jsx(LegacyFormSection, {
          title: sect,
          children: registeredSections[sect].filter(function(r) {
            return r.usePredicate?.() ?? true;
          }).map(function(row) {
            return /* @__PURE__ */ jsx(LegacyFormRow, {
              label: row.title(),
              leading: /* @__PURE__ */ jsx(LegacyFormIcon, {
                source: row.icon
              }),
              trailing: LegacyFormRow.Arrow,
              onPress: wrapOnPress(row.onPress, navigation2, row.render, row.title())
            });
          })
        }, sect);
      })
    });
  }
  function patchPanelUI(unpatches) {
    unpatches.push(after("default", findByNameLazy("getScreens", false), function(_a, screens) {
      return {
        ...screens,
        VendettaCustomPage: {
          title: "Bnuuy",
          render: function() {
            return /* @__PURE__ */ jsx(CustomPageRenderer, {});
          }
        }
      };
    }));
    var unpatch = after("default", findByNameLazy("UserSettingsOverviewWrapper", false), function(_a, ret) {
      var UserSettingsOverview = findInReactTree(ret.props.children, function(n) {
        return n.type?.name === "UserSettingsOverview";
      });
      unpatches.push(after("renderSupportAndAcknowledgements", UserSettingsOverview.type.prototype, function(_args, { props: { children } }) {
        var index = children.findIndex(function(c) {
          return c?.type?.name === "UploadLogsButton";
        });
        if (index !== -1)
          children.splice(index, 1);
      }));
      unpatches.push(after("render", UserSettingsOverview.type.prototype, function(_args, res) {
        var titles = [
          i18n.Messages.BILLING_SETTINGS,
          i18n.Messages.PREMIUM_SETTINGS
        ];
        var sections = findInReactTree(res.props.children, function(n) {
          return n?.children?.[1]?.type === LegacyFormSection;
        })?.children;
        if (sections) {
          var index = sections.findIndex(function(c) {
            return titles.includes(c?.props.label);
          });
          sections.splice(-~index || 4, 0, /* @__PURE__ */ jsx(SettingsSection, {}));
        }
      }));
    }, true);
    unpatches.push(unpatch);
  }
  var init_panel = __esm({
    "src/lib/ui/settings/patches/panel.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_patcher();
      init_utils();
      init_common();
      init_components();
      init_wrappers();
      init_settings2();
      init_shared();
    }
  });

  // src/lib/ui/settings/patches/tabs.tsx
  function useIsFirstRender() {
    var firstRender = false;
    React.useEffect(function() {
      return void (firstRender = true);
    }, []);
    return firstRender;
  }
  function patchTabsUI(unpatches) {
    var getRows = function() {
      return Object.values(registeredSections).flatMap(function(sect) {
        return sect.map(function(row) {
          return {
            [row.key]: {
              type: "pressable",
              title: row.title,
              icon: row.icon,
              usePredicate: row.usePredicate,
              onPress: wrapOnPress(row.onPress, null, row.render, row.title()),
              withArrow: true,
              ...row.rawTabsConfig
            }
          };
        });
      }).reduce(function(a, c) {
        return Object.assign(a, c);
      });
    };
    var origRendererConfig = settingConstants.SETTING_RENDERER_CONFIG;
    var rendererConfigValue = settingConstants.SETTING_RENDERER_CONFIG;
    Object.defineProperty(settingConstants, "SETTING_RENDERER_CONFIG", {
      enumerable: true,
      configurable: true,
      get: function() {
        return {
          ...rendererConfigValue,
          VendettaCustomPage: {
            type: "route",
            title: function() {
              return "Bunny";
            },
            screen: {
              route: "VendettaCustomPage",
              getComponent: function() {
                return CustomPageRenderer;
              }
            }
          },
          ...getRows()
        };
      },
      set: function(v) {
        return rendererConfigValue = v;
      }
    });
    unpatches.push(function() {
      Object.defineProperty(settingConstants, "SETTING_RENDERER_CONFIG", {
        value: origRendererConfig,
        writable: true,
        get: void 0,
        set: void 0
      });
    });
    unpatches.push(after("default", SettingsOverviewScreen, function(_, ret) {
      if (useIsFirstRender())
        return;
      var { sections } = findInReactTree(ret, function(i) {
        return i.props?.sections;
      }).props;
      var index = -~sections.findIndex(function(i) {
        return i.label === i18n.Messages.ACCOUNT_SETTINGS;
      }) || 1;
      Object.keys(registeredSections).forEach(function(sect) {
        sections.splice(index++, 0, {
          label: sect,
          title: sect,
          settings: registeredSections[sect].map(function(a) {
            return a.key;
          })
        });
      });
    }));
  }
  var settingConstants, SettingsOverviewScreen;
  var init_tabs = __esm({
    "src/lib/ui/settings/patches/tabs.tsx"() {
      "use strict";
      init_patcher();
      init_utils();
      init_common();
      init_wrappers();
      init_settings2();
      init_shared();
      settingConstants = findByPropsLazy("SETTING_RENDERER_CONFIG");
      SettingsOverviewScreen = findByNameLazy("SettingsOverviewScreen", false);
    }
  });

  // src/lib/ui/settings/index.tsx
  var settings_exports2 = {};
  __export(settings_exports2, {
    patchSettings: () => patchSettings,
    registerSection: () => registerSection,
    registeredSections: () => registeredSections
  });
  function registerSection(section) {
    registeredSections[section.name] = section.items;
    return function() {
      return delete registeredSections[section.name];
    };
  }
  function patchSettings() {
    var unpatches = new Array();
    patchPanelUI(unpatches);
    patchTabsUI(unpatches);
    return function() {
      return unpatches.forEach(function(u) {
        return u();
      });
    };
  }
  var registeredSections;
  var init_settings2 = __esm({
    "src/lib/ui/settings/index.tsx"() {
      "use strict";
      init_panel();
      init_tabs();
      registeredSections = {};
    }
  });

  // src/lib/ui/toasts.ts
  var toasts_exports = {};
  __export(toasts_exports, {
    showToast: () => showToast
  });
  var uuid4, showToast;
  var init_toasts = __esm({
    "src/lib/ui/toasts.ts"() {
      "use strict";
      init_i18n();
      init_assets();
      init_lazy();
      init_common();
      init_wrappers();
      ({ uuid4 } = lazyDestructure(function() {
        return findByProps("uuid4");
      }));
      showToast = function(content, asset) {
        return toasts.open({
          // ? In build 182205/44707, Discord changed their toasts, source is no longer used, rather icon, and a key is needed.
          // TODO: We could probably have the developer specify a key themselves, but this works to fix toasts
          key: `vd-toast-${uuid4()}`,
          content,
          source: asset,
          icon: asset
        });
      };
      showToast.showCopyToClipboard = function(message = Strings.COPIED_TO_CLIPBOARD) {
        showToast(message, findAssetId("toast_copy_link"));
      };
    }
  });

  // src/core/ui/settings/pages/General/Version.tsx
  function Version({ label, version, icon }) {
    return /* @__PURE__ */ jsx(TableRow, {
      label,
      icon: /* @__PURE__ */ jsx(TableRow.Icon, {
        source: findAssetId(icon)
      }),
      trailing: /* @__PURE__ */ jsx(LegacyFormText, {
        children: version
      }),
      onPress: function() {
        clipboard.setString(`${label} - ${version}`);
        showToast.showCopyToClipboard();
      }
    });
  }
  var init_Version = __esm({
    "src/core/ui/settings/pages/General/Version.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_assets();
      init_common();
      init_components();
      init_toasts();
    }
  });

  // src/lib/api/debug.ts
  var debug_exports = {};
  __export(debug_exports, {
    connectToDebugger: () => connectToDebugger,
    getDebugInfo: () => getDebugInfo,
    patchLogHook: () => patchLogHook,
    socket: () => socket,
    toggleSafeMode: () => toggleSafeMode,
    versionHash: () => versionHash
  });
  async function toggleSafeMode() {
    settings.safeMode = {
      ...settings.safeMode,
      enabled: !settings.safeMode?.enabled
    };
    if (isThemeSupported()) {
      if (getThemeFromLoader()?.id)
        settings.safeMode.currentThemeId = getThemeFromLoader().id;
      if (settings.safeMode?.enabled) {
        await selectTheme(null);
      } else if (settings.safeMode?.currentThemeId) {
        await selectTheme(themes[settings.safeMode?.currentThemeId]);
      }
    }
    setTimeout(BundleUpdaterManager.reload, 400);
  }
  function connectToDebugger(url2) {
    if (socket !== void 0 && socket.readyState !== WebSocket.CLOSED)
      socket.close();
    if (!url2) {
      showToast("Invalid debugger URL!", findAssetId("Small"));
      return;
    }
    socket = new WebSocket(`ws://${url2}`);
    socket.addEventListener("open", function() {
      return showToast("Connected to debugger.", findAssetId("Check"));
    });
    socket.addEventListener("message", function(message) {
      try {
        (0, eval)(message.data);
      } catch (e) {
        console.error(e);
      }
    });
    socket.addEventListener("error", function(err) {
      console.log(`Debugger error: ${err.message}`);
      showToast("An error occurred with the debugger connection!", findAssetId("Small"));
    });
  }
  function patchLogHook() {
    var unpatch = after("nativeLoggingHook", globalThis, function(args) {
      if (socket?.readyState === WebSocket.OPEN)
        socket.send(JSON.stringify({
          message: args[0],
          level: args[1]
        }));
      logger.log(args[0]);
    });
    return function() {
      socket && socket.close();
      unpatch();
    };
  }
  function getDebugInfo() {
    var hermesProps = window.HermesInternal.getRuntimeProperties();
    var hermesVer = hermesProps["OSS Release Version"];
    var padding = "for RN ";
    var PlatformConstants = import_react_native9.Platform.constants;
    var rnVer = PlatformConstants.reactNativeVersion;
    return {
      /**
       * @deprecated use `bunny` field
       * */
      vendetta: {
        version: versionHash.split("-")[0],
        loader: getLoaderName()
      },
      bunny: {
        version: versionHash,
        loader: {
          name: getLoaderName(),
          version: getLoaderVersion()
        }
      },
      discord: {
        version: ClientInfoManager.Version,
        build: ClientInfoManager.Build
      },
      react: {
        version: React.version,
        nativeVersion: hermesVer.startsWith(padding) ? hermesVer.substring(padding.length) : `${rnVer.major}.${rnVer.minor}.${rnVer.patch}`
      },
      hermes: {
        version: hermesVer,
        buildType: hermesProps.Build,
        bytecodeVersion: hermesProps["Bytecode Version"]
      },
      ...import_react_native9.Platform.select({
        android: {
          os: {
            name: "Android",
            version: PlatformConstants.Release,
            sdk: PlatformConstants.Version
          }
        },
        ios: {
          os: {
            name: PlatformConstants.systemName,
            version: PlatformConstants.osVersion
          }
        }
      }),
      ...import_react_native9.Platform.select({
        android: {
          device: {
            manufacturer: PlatformConstants.Manufacturer,
            brand: PlatformConstants.Brand,
            model: PlatformConstants.Model,
            codename: DeviceManager.device
          }
        },
        ios: {
          device: {
            manufacturer: DeviceManager.deviceManufacturer,
            brand: DeviceManager.deviceBrand,
            model: DeviceManager.deviceModel,
            codename: DeviceManager.device
          }
        }
      })
    };
  }
  var import_react_native9, socket, versionHash;
  var init_debug = __esm({
    "src/lib/api/debug.ts"() {
      "use strict";
      init_assets();
      init_loader();
      init_modules();
      init_patcher();
      init_settings();
      init_themes();
      init_logger();
      init_toasts();
      import_react_native9 = __toESM(require_react_native());
      versionHash = "ba70fc4-dev";
    }
  });

  // src/core/ui/settings/pages/General/About.tsx
  function About() {
    var debugInfo = getDebugInfo();
    useProxy(settings);
    var versions = [
      {
        label: Strings.BUNNY,
        version: debugInfo.bunny.version,
        icon: "ic_progress_wrench_24px"
      },
      {
        label: "Discord",
        version: `${debugInfo.discord.version} (${debugInfo.discord.build})`,
        icon: "Discord"
      },
      {
        label: "React",
        version: debugInfo.react.version,
        icon: "ic_category_16px"
      },
      {
        label: "React Native",
        version: debugInfo.react.nativeVersion,
        icon: "mobile"
      },
      {
        label: Strings.BYTECODE,
        version: debugInfo.hermes.bytecodeVersion,
        icon: "ic_server_security_24px"
      }
    ];
    var platformInfo = [
      {
        label: Strings.LOADER,
        version: `${debugInfo.bunny.loader.name} (${debugInfo.bunny.loader.version})`,
        icon: "ic_download_24px"
      },
      {
        label: Strings.OPERATING_SYSTEM,
        version: `${debugInfo.os.name} ${debugInfo.os.version}`,
        icon: "ic_cog_24px"
      },
      ...debugInfo.os.sdk ? [
        {
          label: "SDK",
          version: debugInfo.os.sdk,
          icon: "pencil"
        }
      ] : [],
      {
        label: Strings.MANUFACTURER,
        version: debugInfo.device.manufacturer,
        icon: "ic_badge_staff"
      },
      {
        label: Strings.BRAND,
        version: debugInfo.device.brand,
        icon: "ic_settings_boost_24px"
      },
      {
        label: Strings.MODEL,
        version: debugInfo.device.model,
        icon: "ic_phonelink_24px"
      },
      {
        label: import_react_native10.Platform.select({
          android: Strings.CODENAME,
          ios: Strings.MACHINE_ID
        }),
        version: debugInfo.device.codename,
        icon: "ic_compose_24px"
      }
    ];
    return /* @__PURE__ */ jsx(import_react_native10.ScrollView, {
      style: {
        flex: 1
      },
      contentContainerStyle: {
        paddingBottom: 38
      },
      children: /* @__PURE__ */ jsxs(Stack, {
        style: {
          paddingVertical: 24,
          paddingHorizontal: 12
        },
        spacing: 24,
        children: [
          /* @__PURE__ */ jsx(TableRowGroup, {
            title: Strings.VERSIONS,
            children: versions.map(function(v) {
              return /* @__PURE__ */ jsx(Version, {
                label: v.label,
                version: v.version,
                icon: v.icon
              });
            })
          }),
          /* @__PURE__ */ jsx(TableRowGroup, {
            title: Strings.PLATFORM,
            children: platformInfo.map(function(p) {
              return /* @__PURE__ */ jsx(Version, {
                label: p.label,
                version: p.version,
                icon: p.icon
              });
            })
          })
        ]
      })
    });
  }
  var import_react_native10;
  var init_About = __esm({
    "src/core/ui/settings/pages/General/About.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_i18n();
      init_Version();
      init_debug();
      init_settings();
      init_storage();
      init_components();
      import_react_native10 = __toESM(require_react_native());
    }
  });

  // src/core/ui/settings/pages/General/index.tsx
  var General_exports = {};
  __export(General_exports, {
    default: () => General
  });
  function General() {
    useProxy(settings);
    var debugInfo = getDebugInfo();
    var navigation2 = NavigationNative.useNavigation();
    return /* @__PURE__ */ jsx(import_react_native11.ScrollView, {
      style: {
        flex: 1
      },
      contentContainerStyle: {
        paddingBottom: 38
      },
      children: /* @__PURE__ */ jsxs(Stack, {
        style: {
          paddingVertical: 24,
          paddingHorizontal: 12
        },
        spacing: 24,
        children: [
          /* @__PURE__ */ jsxs(TableRowGroup, {
            title: Strings.INFO,
            children: [
              /* @__PURE__ */ jsx(TableRow, {
                label: Strings.BUNNY,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: {
                    uri: pyoncord_default
                  }
                }),
                trailing: /* @__PURE__ */ jsx(TableRow.TrailingText, {
                  text: debugInfo.bunny.version
                })
              }),
              /* @__PURE__ */ jsx(TableRow, {
                label: "Discord",
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("Discord")
                }),
                trailing: /* @__PURE__ */ jsx(TableRow.TrailingText, {
                  text: `${debugInfo.discord.version} (${debugInfo.discord.build})`
                })
              }),
              /* @__PURE__ */ jsx(TableRow, {
                arrow: true,
                label: Strings.ABOUT,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("CircleInformationIcon-primary")
                }),
                trailing: TableRow.Arrow,
                onPress: function() {
                  return navigation2.push("VendettaCustomPage", {
                    title: Strings.ABOUT,
                    render: function() {
                      return /* @__PURE__ */ jsx(About, {});
                    }
                  });
                }
              })
            ]
          }),
          /* @__PURE__ */ jsxs(TableRowGroup, {
            title: Strings.LINKS,
            children: [
              /* @__PURE__ */ jsx(TableRow, {
                label: Strings.DISCORD_SERVER,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("Discord")
                }),
                trailing: TableRow.Arrow,
                onPress: function() {
                  return url.openDeeplink(DISCORD_SERVER);
                }
              }),
              /* @__PURE__ */ jsx(TableRow, {
                label: Strings.GITHUB,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("img_account_sync_github_white")
                }),
                trailing: TableRow.Arrow,
                onPress: function() {
                  return url.openURL(GITHUB);
                }
              })
            ]
          }),
          /* @__PURE__ */ jsxs(TableRowGroup, {
            title: Strings.ACTIONS,
            children: [
              /* @__PURE__ */ jsx(TableRow, {
                label: Strings.RELOAD_DISCORD,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("ic_message_retry")
                }),
                onPress: function() {
                  return import_react_native11.NativeModules.BundleUpdaterManager.reload();
                }
              }),
              /* @__PURE__ */ jsx(TableRow, {
                label: settings.safeMode?.enabled ? Strings.RELOAD_IN_NORMAL_MODE : Strings.RELOAD_IN_SAFE_MODE,
                subLabel: settings.safeMode?.enabled ? Strings.RELOAD_IN_NORMAL_MODE_DESC : Strings.RELOAD_IN_SAFE_MODE_DESC,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("ic_privacy_24px")
                }),
                onPress: toggleSafeMode
              }),
              /* @__PURE__ */ jsx(TableSwitchRow, {
                label: Strings.DEVELOPER_SETTINGS,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("ic_progress_wrench_24px")
                }),
                value: settings.developerSettings,
                onValueChange: function(v) {
                  settings.developerSettings = v;
                }
              })
            ]
          }),
          /* @__PURE__ */ jsx(TableRowGroup, {
            title: Strings.MISCELLANEOUS,
            children: /* @__PURE__ */ jsx(TableSwitchRow, {
              label: Strings.SETTINGS_ACTIVATE_DISCORD_EXPERIMENTS,
              subLabel: Strings.SETTINGS_ACTIVATE_DISCORD_EXPERIMENTS_DESC,
              icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                source: findAssetId("ic_progress_wrench_24px")
              }),
              value: settings.enableDiscordDeveloperSettings,
              onValueChange: function(v) {
                settings.enableDiscordDeveloperSettings = v;
              }
            })
          })
        ]
      })
    });
  }
  var import_react_native11;
  var init_General = __esm({
    "src/core/ui/settings/pages/General/index.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_i18n();
      init_settings3();
      init_About();
      init_assets();
      init_debug();
      init_settings();
      init_storage();
      init_constants();
      init_common();
      init_components();
      import_react_native11 = __toESM(require_react_native());
    }
  });

  // src/metro/index.ts
  var metro_exports = {};
  __export(metro_exports, {
    common: () => common_exports,
    factories: () => factories_exports,
    filters: () => filters_exports,
    findAllExports: () => findAllExports,
    findAllModule: () => findAllModule,
    findAllModuleId: () => findAllModuleId,
    findByDisplayName: () => findByDisplayName,
    findByDisplayNameAll: () => findByDisplayNameAll,
    findByDisplayNameLazy: () => findByDisplayNameLazy,
    findByFilePath: () => findByFilePath,
    findByFilePathLazy: () => findByFilePathLazy,
    findByName: () => findByName,
    findByNameAll: () => findByNameAll,
    findByNameLazy: () => findByNameLazy,
    findByProps: () => findByProps,
    findByPropsAll: () => findByPropsAll,
    findByPropsLazy: () => findByPropsLazy,
    findByStoreName: () => findByStoreName,
    findByStoreNameLazy: () => findByStoreNameLazy,
    findByTypeName: () => findByTypeName,
    findByTypeNameAll: () => findByTypeNameAll,
    findByTypeNameLazy: () => findByTypeNameLazy,
    findExports: () => findExports,
    findModule: () => findModule,
    findModuleId: () => findModuleId,
    lazy: () => lazy_exports2
  });
  var init_metro = __esm({
    "src/metro/index.ts"() {
      "use strict";
      init_common();
      init_factories();
      init_filters();
      init_finders();
      init_lazy2();
      init_wrappers();
    }
  });

  // src/lib/ui/components/InputAlert.tsx
  function InputAlert({ title, confirmText, confirmColor, onConfirm, cancelText, placeholder, initialValue = "", secureTextEntry }) {
    var [value, setValue] = React.useState(initialValue);
    var [error, setError] = React.useState("");
    function onConfirmWrapper() {
      var asyncOnConfirm = Promise.resolve(onConfirm(value));
      asyncOnConfirm.then(function() {
        Alerts.close();
      }).catch(function(e) {
        setError(e.message);
      });
    }
    return /* @__PURE__ */ jsx(LegacyAlert, {
      title,
      confirmText,
      confirmColor,
      isConfirmButtonDisabled: error.length !== 0,
      onConfirm: onConfirmWrapper,
      cancelText,
      onCancel: function() {
        return Alerts.close();
      },
      children: /* @__PURE__ */ jsx(LegacyFormInput, {
        placeholder,
        value,
        onChange: function(v) {
          setValue(typeof v === "string" ? v : v.text);
          if (error)
            setError("");
        },
        returnKeyType: "done",
        onSubmitEditing: onConfirmWrapper,
        error: error || void 0,
        secureTextEntry,
        autoFocus: true,
        showBorder: true,
        style: {
          alignSelf: "stretch"
        }
      })
    });
  }
  var Alerts;
  var init_InputAlert = __esm({
    "src/lib/ui/components/InputAlert.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_components();
      init_wrappers();
      Alerts = findByPropsLazy("openLazy", "close");
    }
  });

  // src/lib/ui/alerts.ts
  var alerts_exports = {};
  __export(alerts_exports, {
    showConfirmationAlert: () => showConfirmationAlert,
    showCustomAlert: () => showCustomAlert,
    showInputAlert: () => showInputAlert
  });
  function showConfirmationAlert(options) {
    var internalOptions = options;
    internalOptions.body = options.content;
    delete internalOptions.content;
    internalOptions.isDismissable ??= true;
    return Alerts2.show(internalOptions);
  }
  var Alerts2, showCustomAlert, showInputAlert;
  var init_alerts = __esm({
    "src/lib/ui/alerts.ts"() {
      "use strict";
      init_wrappers();
      init_InputAlert();
      Alerts2 = findByPropsLazy("openLazy", "close");
      showCustomAlert = function(component, props) {
        return Alerts2.openLazy({
          importer: async function() {
            return function() {
              return React.createElement(component, props);
            };
          }
        });
      };
      showInputAlert = function(options) {
        return showCustomAlert(InputAlert, options);
      };
    }
  });

  // node_modules/.pnpm/fuzzysort@3.0.2/node_modules/fuzzysort/fuzzysort.js
  var require_fuzzysort = __commonJS({
    "node_modules/.pnpm/fuzzysort@3.0.2/node_modules/fuzzysort/fuzzysort.js"(exports, module) {
      init_class_call_check();
      init_create_class();
      init_inherits();
      init_wrap_native_super();
      init_create_super();
      (function(root, UMD) {
        if (typeof define === "function" && define.amd)
          define([], UMD);
        else if (typeof module === "object" && module.exports)
          module.exports = UMD();
        else
          root["fuzzysort"] = UMD();
      })(exports, function(_) {
        "use strict";
        var single = function(search, target) {
          if (!search || !target)
            return NULL;
          var preparedSearch = getPreparedSearch(search);
          if (!isPrepared(target))
            target = getPrepared(target);
          var searchBitflags = preparedSearch.bitflags;
          if ((searchBitflags & target._bitflags) !== searchBitflags)
            return NULL;
          return algorithm(preparedSearch, target);
        };
        var go = function(search, targets, options) {
          if (!search)
            return options?.all ? all(targets, options) : noResults;
          var preparedSearch = getPreparedSearch(search);
          var searchBitflags = preparedSearch.bitflags;
          var containsSpace = preparedSearch.containsSpace;
          var threshold = denormalizeScore(options?.threshold || 0);
          var limit = options?.limit || INFINITY;
          var resultsLen = 0;
          var limitedCount = 0;
          var targetsLen = targets.length;
          function push_result(result2) {
            if (resultsLen < limit) {
              q.add(result2);
              ++resultsLen;
            } else {
              ++limitedCount;
              if (result2._score > q.peek()._score)
                q.replaceTop(result2);
            }
          }
          if (options?.key) {
            var key = options.key;
            for (var i = 0; i < targetsLen; ++i) {
              var obj = targets[i];
              var target = getValue(obj, key);
              if (!target)
                continue;
              if (!isPrepared(target))
                target = getPrepared(target);
              if ((searchBitflags & target._bitflags) !== searchBitflags)
                continue;
              var result = algorithm(preparedSearch, target);
              if (result === NULL)
                continue;
              if (result._score < threshold)
                continue;
              result.obj = obj;
              push_result(result);
            }
          } else if (options?.keys) {
            var keys = options.keys;
            var keysLen = keys.length;
            outer:
              for (var i = 0; i < targetsLen; ++i) {
                var obj = targets[i];
                {
                  var keysBitflags = 0;
                  for (var keyI = 0; keyI < keysLen; ++keyI) {
                    var key = keys[keyI];
                    var target = getValue(obj, key);
                    if (!target) {
                      tmpTargets[keyI] = noTarget;
                      continue;
                    }
                    if (!isPrepared(target))
                      target = getPrepared(target);
                    tmpTargets[keyI] = target;
                    keysBitflags |= target._bitflags;
                  }
                  if ((searchBitflags & keysBitflags) !== searchBitflags)
                    continue;
                }
                if (containsSpace)
                  for (var i1 = 0; i1 < preparedSearch.spaceSearches.length; i1++)
                    keysSpacesBestScores[i1] = NEGATIVE_INFINITY;
                for (var keyI = 0; keyI < keysLen; ++keyI) {
                  target = tmpTargets[keyI];
                  if (target === noTarget) {
                    tmpResults[keyI] = noTarget;
                    continue;
                  }
                  tmpResults[keyI] = algorithm(
                    preparedSearch,
                    target,
                    /*allowSpaces=*/
                    false,
                    /*allowPartialMatch=*/
                    containsSpace
                  );
                  if (tmpResults[keyI] === NULL) {
                    tmpResults[keyI] = noTarget;
                    continue;
                  }
                  if (containsSpace)
                    for (var i2 = 0; i2 < preparedSearch.spaceSearches.length; i2++) {
                      if (allowPartialMatchScores[i2] > -1e3) {
                        if (keysSpacesBestScores[i2] > NEGATIVE_INFINITY) {
                          var tmp = (keysSpacesBestScores[i2] + allowPartialMatchScores[i2]) / 4;
                          if (tmp > keysSpacesBestScores[i2])
                            keysSpacesBestScores[i2] = tmp;
                        }
                      }
                      if (allowPartialMatchScores[i2] > keysSpacesBestScores[i2])
                        keysSpacesBestScores[i2] = allowPartialMatchScores[i2];
                    }
                }
                if (containsSpace) {
                  for (var i3 = 0; i3 < preparedSearch.spaceSearches.length; i3++) {
                    if (keysSpacesBestScores[i3] === NEGATIVE_INFINITY)
                      continue outer;
                  }
                } else {
                  var hasAtLeast1Match = false;
                  for (var i4 = 0; i4 < keysLen; i4++) {
                    if (tmpResults[i4]._score !== NEGATIVE_INFINITY) {
                      hasAtLeast1Match = true;
                      break;
                    }
                  }
                  if (!hasAtLeast1Match)
                    continue;
                }
                var objResults = new KeysResult(keysLen);
                for (var i5 = 0; i5 < keysLen; i5++) {
                  objResults[i5] = tmpResults[i5];
                }
                if (containsSpace) {
                  var score = 0;
                  for (var i6 = 0; i6 < preparedSearch.spaceSearches.length; i6++)
                    score += keysSpacesBestScores[i6];
                } else {
                  var score = NEGATIVE_INFINITY;
                  for (var i7 = 0; i7 < keysLen; i7++) {
                    var result = objResults[i7];
                    if (result._score > -1e3) {
                      if (score > NEGATIVE_INFINITY) {
                        var tmp = (score + result._score) / 4;
                        if (tmp > score)
                          score = tmp;
                      }
                    }
                    if (result._score > score)
                      score = result._score;
                  }
                }
                objResults.obj = obj;
                objResults._score = score;
                if (options?.scoreFn) {
                  score = options.scoreFn(objResults);
                  if (!score)
                    continue;
                  score = denormalizeScore(score);
                  objResults._score = score;
                }
                if (score < threshold)
                  continue;
                push_result(objResults);
              }
          } else {
            for (var i = 0; i < targetsLen; ++i) {
              var target = targets[i];
              if (!target)
                continue;
              if (!isPrepared(target))
                target = getPrepared(target);
              if ((searchBitflags & target._bitflags) !== searchBitflags)
                continue;
              var result = algorithm(preparedSearch, target);
              if (result === NULL)
                continue;
              if (result._score < threshold)
                continue;
              push_result(result);
            }
          }
          if (resultsLen === 0)
            return noResults;
          var results = new Array(resultsLen);
          for (var i = resultsLen - 1; i >= 0; --i)
            results[i] = q.poll();
          results.total = resultsLen + limitedCount;
          return results;
        };
        var highlight = function(result, open = "<b>", close = "</b>") {
          var callback = typeof open === "function" ? open : void 0;
          var target = result.target;
          var targetLen = target.length;
          var indexes = result.indexes;
          var highlighted = "";
          var matchI = 0;
          var indexesI = 0;
          var opened = false;
          var parts = [];
          for (var i = 0; i < targetLen; ++i) {
            var char = target[i];
            if (indexes[indexesI] === i) {
              ++indexesI;
              if (!opened) {
                opened = true;
                if (callback) {
                  parts.push(highlighted);
                  highlighted = "";
                } else {
                  highlighted += open;
                }
              }
              if (indexesI === indexes.length) {
                if (callback) {
                  highlighted += char;
                  parts.push(callback(highlighted, matchI++));
                  highlighted = "";
                  parts.push(target.substr(i + 1));
                } else {
                  highlighted += char + close + target.substr(i + 1);
                }
                break;
              }
            } else {
              if (opened) {
                opened = false;
                if (callback) {
                  parts.push(callback(highlighted, matchI++));
                  highlighted = "";
                } else {
                  highlighted += close;
                }
              }
            }
            highlighted += char;
          }
          return callback ? parts : highlighted;
        };
        var prepare = function(target) {
          if (typeof target === "number")
            target = "" + target;
          else if (typeof target !== "string")
            target = "";
          var info = prepareLowerInfo(target);
          return new_result(target, {
            _targetLower: info._lower,
            _targetLowerCodes: info.lowerCodes,
            _bitflags: info.bitflags
          });
        };
        var cleanup = function() {
          preparedCache.clear();
          preparedSearchCache.clear();
        };
        var Result = /* @__PURE__ */ function() {
          function Result2() {
            _class_call_check(this, Result2);
          }
          _create_class(Result2, [
            {
              key: "indexes",
              get: function get() {
                return this._indexes.slice(0, this._indexes.len).sort(function(a, b) {
                  return a - b;
                });
              }
            },
            {
              key: "indexes",
              set: function set(indexes) {
                return this._indexes = indexes;
              }
            },
            {
              key: "highlight",
              value: function value(open, close) {
                return highlight(this, open, close);
              }
            },
            {
              key: "score",
              get: function get() {
                return normalizeScore(this._score);
              }
            },
            {
              key: "score",
              set: function set(score) {
                this._score = denormalizeScore(score);
              }
            }
          ]);
          return Result2;
        }();
        var KeysResult = /* @__PURE__ */ function(Array1) {
          _inherits(KeysResult2, Array1);
          var _super = _create_super(KeysResult2);
          function KeysResult2() {
            _class_call_check(this, KeysResult2);
            return _super.apply(this, arguments);
          }
          _create_class(KeysResult2, [
            {
              key: "score",
              get: function get() {
                return normalizeScore(this._score);
              }
            },
            {
              key: "score",
              set: function set(score) {
                this._score = denormalizeScore(score);
              }
            }
          ]);
          return KeysResult2;
        }(_wrap_native_super(Array));
        var new_result = function(target, options) {
          var result = new Result();
          result["target"] = target;
          result["obj"] = options.obj ?? NULL;
          result._score = options._score ?? NEGATIVE_INFINITY;
          result._indexes = options._indexes ?? [];
          result._targetLower = options._targetLower ?? "";
          result._targetLowerCodes = options._targetLowerCodes ?? NULL;
          result._nextBeginningIndexes = options._nextBeginningIndexes ?? NULL;
          result._bitflags = options._bitflags ?? 0;
          return result;
        };
        var normalizeScore = function(score) {
          if (score === NEGATIVE_INFINITY)
            return 0;
          if (score > 1)
            return score;
          return Math.E ** (((-score + 1) ** 0.04307 - 1) * -2);
        };
        var denormalizeScore = function(normalizedScore) {
          if (normalizedScore === 0)
            return NEGATIVE_INFINITY;
          if (normalizedScore > 1)
            return normalizedScore;
          return 1 - Math.pow(Math.log(normalizedScore) / -2 + 1, 1 / 0.04307);
        };
        var prepareSearch = function(search) {
          if (typeof search === "number")
            search = "" + search;
          else if (typeof search !== "string")
            search = "";
          search = search.trim();
          var info = prepareLowerInfo(search);
          var spaceSearches = [];
          if (info.containsSpace) {
            var searches = search.split(/\s+/);
            searches = [
              ...new Set(searches)
            ];
            for (var i = 0; i < searches.length; i++) {
              if (searches[i] === "")
                continue;
              var _info = prepareLowerInfo(searches[i]);
              spaceSearches.push({
                lowerCodes: _info.lowerCodes,
                _lower: searches[i].toLowerCase(),
                containsSpace: false
              });
            }
          }
          return {
            lowerCodes: info.lowerCodes,
            _lower: info._lower,
            containsSpace: info.containsSpace,
            bitflags: info.bitflags,
            spaceSearches
          };
        };
        var getPrepared = function(target) {
          if (target.length > 999)
            return prepare(target);
          var targetPrepared = preparedCache.get(target);
          if (targetPrepared !== void 0)
            return targetPrepared;
          targetPrepared = prepare(target);
          preparedCache.set(target, targetPrepared);
          return targetPrepared;
        };
        var getPreparedSearch = function(search) {
          if (search.length > 999)
            return prepareSearch(search);
          var searchPrepared = preparedSearchCache.get(search);
          if (searchPrepared !== void 0)
            return searchPrepared;
          searchPrepared = prepareSearch(search);
          preparedSearchCache.set(search, searchPrepared);
          return searchPrepared;
        };
        var all = function(targets, options) {
          var results = [];
          results.total = targets.length;
          var limit = options?.limit || INFINITY;
          if (options?.key) {
            for (var i = 0; i < targets.length; i++) {
              var obj = targets[i];
              var target = getValue(obj, options.key);
              if (target == NULL)
                continue;
              if (!isPrepared(target))
                target = getPrepared(target);
              var result = new_result(target.target, {
                _score: target._score,
                obj
              });
              results.push(result);
              if (results.length >= limit)
                return results;
            }
          } else if (options?.keys) {
            for (var i = 0; i < targets.length; i++) {
              var obj = targets[i];
              var objResults = new KeysResult(options.keys.length);
              for (var keyI = options.keys.length - 1; keyI >= 0; --keyI) {
                var target = getValue(obj, options.keys[keyI]);
                if (!target) {
                  objResults[keyI] = noTarget;
                  continue;
                }
                if (!isPrepared(target))
                  target = getPrepared(target);
                target._score = NEGATIVE_INFINITY;
                target._indexes.len = 0;
                objResults[keyI] = target;
              }
              objResults.obj = obj;
              objResults._score = NEGATIVE_INFINITY;
              results.push(objResults);
              if (results.length >= limit)
                return results;
            }
          } else {
            for (var i = 0; i < targets.length; i++) {
              var target = targets[i];
              if (target == NULL)
                continue;
              if (!isPrepared(target))
                target = getPrepared(target);
              target._score = NEGATIVE_INFINITY;
              target._indexes.len = 0;
              results.push(target);
              if (results.length >= limit)
                return results;
            }
          }
          return results;
        };
        var algorithm = function(preparedSearch, prepared, allowSpaces = false, allowPartialMatch = false) {
          if (allowSpaces === false && preparedSearch.containsSpace)
            return algorithmSpaces(preparedSearch, prepared, allowPartialMatch);
          var searchLower = preparedSearch._lower;
          var searchLowerCodes = preparedSearch.lowerCodes;
          var searchLowerCode = searchLowerCodes[0];
          var targetLowerCodes = prepared._targetLowerCodes;
          var searchLen = searchLowerCodes.length;
          var targetLen = targetLowerCodes.length;
          var searchI = 0;
          var targetI = 0;
          var matchesSimpleLen = 0;
          for (; ; ) {
            var isMatch = searchLowerCode === targetLowerCodes[targetI];
            if (isMatch) {
              matchesSimple[matchesSimpleLen++] = targetI;
              ++searchI;
              if (searchI === searchLen)
                break;
              searchLowerCode = searchLowerCodes[searchI];
            }
            ++targetI;
            if (targetI >= targetLen)
              return NULL;
          }
          var searchI = 0;
          var successStrict = false;
          var matchesStrictLen = 0;
          var nextBeginningIndexes = prepared._nextBeginningIndexes;
          if (nextBeginningIndexes === NULL)
            nextBeginningIndexes = prepared._nextBeginningIndexes = prepareNextBeginningIndexes(prepared.target);
          targetI = matchesSimple[0] === 0 ? 0 : nextBeginningIndexes[matchesSimple[0] - 1];
          var backtrackCount = 0;
          if (targetI !== targetLen)
            for (; ; ) {
              if (targetI >= targetLen) {
                if (searchI <= 0)
                  break;
                ++backtrackCount;
                if (backtrackCount > 200)
                  break;
                --searchI;
                var lastMatch = matchesStrict[--matchesStrictLen];
                targetI = nextBeginningIndexes[lastMatch];
              } else {
                var isMatch = searchLowerCodes[searchI] === targetLowerCodes[targetI];
                if (isMatch) {
                  matchesStrict[matchesStrictLen++] = targetI;
                  ++searchI;
                  if (searchI === searchLen) {
                    successStrict = true;
                    break;
                  }
                  ++targetI;
                } else {
                  targetI = nextBeginningIndexes[targetI];
                }
              }
            }
          var substringIndex = searchLen <= 1 ? -1 : prepared._targetLower.indexOf(searchLower, matchesSimple[0]);
          var isSubstring = !!~substringIndex;
          var isSubstringBeginning = !isSubstring ? false : substringIndex === 0 || prepared._nextBeginningIndexes[substringIndex - 1] === substringIndex;
          if (isSubstring && !isSubstringBeginning) {
            for (var i = 0; i < nextBeginningIndexes.length; i = nextBeginningIndexes[i]) {
              if (i <= substringIndex)
                continue;
              for (var s = 0; s < searchLen; s++)
                if (searchLowerCodes[s] !== prepared._targetLowerCodes[i + s])
                  break;
              if (s === searchLen) {
                substringIndex = i;
                isSubstringBeginning = true;
                break;
              }
            }
          }
          var calculateScore = function(matches) {
            var score2 = 0;
            var extraMatchGroupCount = 0;
            for (var i2 = 1; i2 < searchLen; ++i2) {
              if (matches[i2] - matches[i2 - 1] !== 1) {
                score2 -= matches[i2];
                ++extraMatchGroupCount;
              }
            }
            var unmatchedDistance = matches[searchLen - 1] - matches[0] - (searchLen - 1);
            score2 -= (12 + unmatchedDistance) * extraMatchGroupCount;
            if (matches[0] !== 0)
              score2 -= matches[0] * matches[0] * 0.2;
            if (!successStrict) {
              score2 *= 1e3;
            } else {
              var uniqueBeginningIndexes = 1;
              for (var i2 = nextBeginningIndexes[0]; i2 < targetLen; i2 = nextBeginningIndexes[i2])
                ++uniqueBeginningIndexes;
              if (uniqueBeginningIndexes > 24)
                score2 *= (uniqueBeginningIndexes - 24) * 10;
            }
            score2 -= (targetLen - searchLen) / 2;
            if (isSubstring)
              score2 /= 1 + searchLen * searchLen * 1;
            if (isSubstringBeginning)
              score2 /= 1 + searchLen * searchLen * 1;
            score2 -= (targetLen - searchLen) / 2;
            return score2;
          };
          if (!successStrict) {
            if (isSubstring)
              for (var i = 0; i < searchLen; ++i)
                matchesSimple[i] = substringIndex + i;
            var matchesBest = matchesSimple;
            var score = calculateScore(matchesBest);
          } else {
            if (isSubstringBeginning) {
              for (var i = 0; i < searchLen; ++i)
                matchesSimple[i] = substringIndex + i;
              var matchesBest = matchesSimple;
              var score = calculateScore(matchesSimple);
            } else {
              var matchesBest = matchesStrict;
              var score = calculateScore(matchesStrict);
            }
          }
          prepared._score = score;
          for (var i = 0; i < searchLen; ++i)
            prepared._indexes[i] = matchesBest[i];
          prepared._indexes.len = searchLen;
          var result = new Result();
          result.target = prepared.target;
          result._score = prepared._score;
          result._indexes = prepared._indexes;
          return result;
        };
        var algorithmSpaces = function(preparedSearch, target, allowPartialMatch) {
          var seen_indexes = /* @__PURE__ */ new Set();
          var score = 0;
          var result = NULL;
          var first_seen_index_last_search = 0;
          var searches = preparedSearch.spaceSearches;
          var searchesLen = searches.length;
          var changeslen = 0;
          var resetNextBeginningIndexes = function() {
            for (var i3 = changeslen - 1; i3 >= 0; i3--)
              target._nextBeginningIndexes[nextBeginningIndexesChanges[i3 * 2 + 0]] = nextBeginningIndexesChanges[i3 * 2 + 1];
          };
          var hasAtLeast1Match = false;
          for (var i = 0; i < searchesLen; ++i) {
            allowPartialMatchScores[i] = NEGATIVE_INFINITY;
            var search = searches[i];
            result = algorithm(search, target);
            if (allowPartialMatch) {
              if (result === NULL)
                continue;
              hasAtLeast1Match = true;
            } else {
              if (result === NULL) {
                resetNextBeginningIndexes();
                return NULL;
              }
            }
            var isTheLastSearch = i === searchesLen - 1;
            if (!isTheLastSearch) {
              var indexes = result._indexes;
              var indexesIsConsecutiveSubstring = true;
              for (var i1 = 0; i1 < indexes.len - 1; i1++) {
                if (indexes[i1 + 1] - indexes[i1] !== 1) {
                  indexesIsConsecutiveSubstring = false;
                  break;
                }
              }
              if (indexesIsConsecutiveSubstring) {
                var newBeginningIndex = indexes[indexes.len - 1] + 1;
                var toReplace = target._nextBeginningIndexes[newBeginningIndex - 1];
                for (var i2 = newBeginningIndex - 1; i2 >= 0; i2--) {
                  if (toReplace !== target._nextBeginningIndexes[i2])
                    break;
                  target._nextBeginningIndexes[i2] = newBeginningIndex;
                  nextBeginningIndexesChanges[changeslen * 2 + 0] = i2;
                  nextBeginningIndexesChanges[changeslen * 2 + 1] = toReplace;
                  changeslen++;
                }
              }
            }
            score += result._score / searchesLen;
            allowPartialMatchScores[i] = result._score / searchesLen;
            if (result._indexes[0] < first_seen_index_last_search) {
              score -= (first_seen_index_last_search - result._indexes[0]) * 2;
            }
            first_seen_index_last_search = result._indexes[0];
            for (var j = 0; j < result._indexes.len; ++j)
              seen_indexes.add(result._indexes[j]);
          }
          if (allowPartialMatch && !hasAtLeast1Match)
            return NULL;
          resetNextBeginningIndexes();
          var allowSpacesResult = algorithm(
            preparedSearch,
            target,
            /*allowSpaces=*/
            true
          );
          if (allowSpacesResult !== NULL && allowSpacesResult._score > score) {
            if (allowPartialMatch) {
              for (var i = 0; i < searchesLen; ++i) {
                allowPartialMatchScores[i] = allowSpacesResult._score / searchesLen;
              }
            }
            return allowSpacesResult;
          }
          if (allowPartialMatch)
            result = target;
          result._score = score;
          var i = 0;
          for (var index of seen_indexes)
            result._indexes[i++] = index;
          result._indexes.len = i;
          return result;
        };
        var prepareLowerInfo = function(str) {
          var strLen = str.length;
          var lower = str.toLowerCase();
          var lowerCodes = [];
          var bitflags = 0;
          var containsSpace = false;
          for (var i = 0; i < strLen; ++i) {
            var lowerCode = lowerCodes[i] = lower.charCodeAt(i);
            if (lowerCode === 32) {
              containsSpace = true;
              continue;
            }
            var bit = lowerCode >= 97 && lowerCode <= 122 ? lowerCode - 97 : lowerCode >= 48 && lowerCode <= 57 ? 26 : lowerCode <= 127 ? 30 : 31;
            bitflags |= 1 << bit;
          }
          return {
            lowerCodes,
            bitflags,
            containsSpace,
            _lower: lower
          };
        };
        var prepareBeginningIndexes = function(target) {
          var targetLen = target.length;
          var beginningIndexes = [];
          var beginningIndexesLen = 0;
          var wasUpper = false;
          var wasAlphanum = false;
          for (var i = 0; i < targetLen; ++i) {
            var targetCode = target.charCodeAt(i);
            var isUpper = targetCode >= 65 && targetCode <= 90;
            var isAlphanum = isUpper || targetCode >= 97 && targetCode <= 122 || targetCode >= 48 && targetCode <= 57;
            var isBeginning = isUpper && !wasUpper || !wasAlphanum || !isAlphanum;
            wasUpper = isUpper;
            wasAlphanum = isAlphanum;
            if (isBeginning)
              beginningIndexes[beginningIndexesLen++] = i;
          }
          return beginningIndexes;
        };
        var prepareNextBeginningIndexes = function(target) {
          var targetLen = target.length;
          var beginningIndexes = prepareBeginningIndexes(target);
          var nextBeginningIndexes = [];
          var lastIsBeginning = beginningIndexes[0];
          var lastIsBeginningI = 0;
          for (var i = 0; i < targetLen; ++i) {
            if (lastIsBeginning > i) {
              nextBeginningIndexes[i] = lastIsBeginning;
            } else {
              lastIsBeginning = beginningIndexes[++lastIsBeginningI];
              nextBeginningIndexes[i] = lastIsBeginning === void 0 ? targetLen : lastIsBeginning;
            }
          }
          return nextBeginningIndexes;
        };
        var preparedCache = /* @__PURE__ */ new Map();
        var preparedSearchCache = /* @__PURE__ */ new Map();
        var matchesSimple = [];
        var matchesStrict = [];
        var nextBeginningIndexesChanges = [];
        var keysSpacesBestScores = [];
        var allowPartialMatchScores = [];
        var tmpTargets = [];
        var tmpResults = [];
        var getValue = function(obj, prop) {
          var tmp = obj[prop];
          if (tmp !== void 0)
            return tmp;
          if (typeof prop === "function")
            return prop(obj);
          var segs = prop;
          if (!Array.isArray(prop))
            segs = prop.split(".");
          var len = segs.length;
          var i = -1;
          while (obj && ++i < len)
            obj = obj[segs[i]];
          return obj;
        };
        var isPrepared = function(x) {
          return typeof x === "object" && typeof x._bitflags === "number";
        };
        var INFINITY = Infinity;
        var NEGATIVE_INFINITY = -INFINITY;
        var noResults = [];
        noResults.total = 0;
        var NULL = null;
        var noTarget = prepare("");
        var fastpriorityqueue = function(r) {
          var e = [], o = 0, a = {}, v = function(r2) {
            for (var a2 = 0, v2 = e[a2], c = 1; c < o; ) {
              var s = c + 1;
              a2 = c, s < o && e[s]._score < e[c]._score && (a2 = s), e[a2 - 1 >> 1] = e[a2], c = 1 + (a2 << 1);
            }
            for (var f = a2 - 1 >> 1; a2 > 0 && v2._score < e[f]._score; f = (a2 = f) - 1 >> 1)
              e[a2] = e[f];
            e[a2] = v2;
          };
          return a.add = function(r2) {
            var a2 = o;
            e[o++] = r2;
            for (var v2 = a2 - 1 >> 1; a2 > 0 && r2._score < e[v2]._score; v2 = (a2 = v2) - 1 >> 1)
              e[a2] = e[v2];
            e[a2] = r2;
          }, a.poll = function(r2) {
            if (0 !== o) {
              var a2 = e[0];
              return e[0] = e[--o], v(), a2;
            }
          }, a.peek = function(r2) {
            if (0 !== o)
              return e[0];
          }, a.replaceTop = function(r2) {
            e[0] = r2, v();
          }, a;
        };
        var q = fastpriorityqueue();
        return {
          "single": single,
          "go": go,
          "prepare": prepare,
          "cleanup": cleanup
        };
      });
    }
  });

  // globals:react
  var require_react = __commonJS({
    "globals:react"(exports, module) {
      module.exports = require_depsModule()["react"];
    }
  });

  // src/core/ui/components/AddonPage.tsx
  function AddonPage({ card: CardComponent, ...props }) {
    useProxy(settings);
    useProxy(props.items);
    var [search, setSearch] = React.useState("");
    var items = (0, import_react.useMemo)(function() {
      var values = Object.values(props.items);
      if (props.resolveItem)
        values = values.map(props.resolveItem);
      return values.filter(function(i) {
        return i && typeof i === "object";
      });
    }, [
      props.items
    ]);
    var data = (0, import_react.useMemo)(function() {
      if (!search)
        return items;
      return import_fuzzysort.default.go(search, items, {
        keys: props.searchKeywords
      }).map(function(r) {
        return r.obj;
      });
    }, [
      items,
      search
    ]);
    var headerElement = (0, import_react.useMemo)(function() {
      return /* @__PURE__ */ jsxs(import_react_native12.View, {
        children: [
          settings.safeMode?.enabled && /* @__PURE__ */ jsxs(import_react_native12.View, {
            style: {
              marginBottom: 10
            },
            children: [
              /* @__PURE__ */ jsx(HelpMessage, {
                messageType: 0,
                children: props.safeModeMessage
              }),
              props.safeModeExtras
            ]
          }),
          /* @__PURE__ */ jsx(Search_default, {
            style: {
              padding: 8
            },
            onChangeText: function(v) {
              return setSearch(v.toLowerCase());
            },
            placeholder: Strings.SEARCH
          })
        ]
      });
    }, []);
    return /* @__PURE__ */ jsxs(ErrorBoundary, {
      children: [
        /* @__PURE__ */ jsx(FlashList, {
          data,
          estimatedItemSize: 136,
          ListHeaderComponent: headerElement,
          contentContainerStyle: {
            paddingBottom: 90,
            paddingHorizontal: 5
          },
          renderItem: function({ item }) {
            return /* @__PURE__ */ jsx(import_react_native12.View, {
              style: {
                paddingVertical: 6,
                paddingHorizontal: 8
              },
              children: /* @__PURE__ */ jsx(CardComponent, {
                item
              })
            });
          }
        }),
        /* @__PURE__ */ jsx(FloatingActionButton, {
          icon: findAssetId("PlusLargeIcon"),
          onPress: props.onFABPress ?? function() {
            clipboard.getString().then(function(content) {
              return showInputAlert({
                initialValue: content.match(HTTP_REGEX_MULTI)?.[0] ?? "",
                placeholder: Strings.URL_PLACEHOLDER,
                onConfirm: function(input) {
                  return props.fetchFunction(input);
                },
                confirmText: Strings.INSTALL,
                cancelText: Strings.CANCEL
              });
            });
          }
        })
      ]
    });
  }
  var import_fuzzysort, import_react, import_react_native12, FlashList;
  var init_AddonPage = __esm({
    "src/core/ui/components/AddonPage.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_i18n();
      init_assets();
      init_settings();
      init_storage();
      init_constants();
      init_metro();
      init_common();
      init_components();
      init_alerts();
      init_components2();
      import_fuzzysort = __toESM(require_fuzzysort());
      import_react = __toESM(require_react());
      import_react_native12 = __toESM(require_react_native());
      ({ FlashList } = findByProps("FlashList"));
    }
  });

  // src/core/vendetta/plugins.ts
  var plugins, pluginInstance, VdPluginManager;
  var init_plugins = __esm({
    "src/core/vendetta/plugins.ts"() {
      "use strict";
      init_settings();
      init_storage();
      init_utils();
      init_constants();
      init_logger();
      plugins = wrapSync(createStorage(createMMKVBackend("VENDETTA_PLUGINS")));
      pluginInstance = {};
      VdPluginManager = {
        plugins,
        async pluginFetch(url2) {
          if (url2.startsWith(VD_PROXY_PREFIX)) {
            url2 = url2.replace(VD_PROXY_PREFIX, BUNNY_PROXY_PREFIX);
          }
          return await safeFetch(url2, {
            cache: "no-store"
          });
        },
        async fetchPlugin(id) {
          if (!id.endsWith("/"))
            id += "/";
          var existingPlugin = plugins[id];
          var pluginManifest;
          try {
            pluginManifest = await (await this.pluginFetch(id + "manifest.json")).json();
          } catch (e) {
            throw new Error(`Failed to fetch manifest for ${id}`);
          }
          var pluginJs;
          if (existingPlugin?.manifest.hash !== pluginManifest.hash) {
            try {
              pluginJs = await (await this.pluginFetch(id + (pluginManifest.main || "index.js"))).text();
            } catch (e) {
            }
          }
          if (!pluginJs && !existingPlugin)
            throw new Error(`Failed to fetch JS for ${id}`);
          plugins[id] = {
            id,
            manifest: pluginManifest,
            enabled: existingPlugin?.enabled ?? false,
            update: existingPlugin?.update ?? true,
            js: pluginJs ?? existingPlugin.js
          };
        },
        async installPlugin(id, enabled2 = true) {
          if (!id.endsWith("/"))
            id += "/";
          if (typeof id !== "string" || id in plugins)
            throw new Error("Plugin already installed");
          await this.fetchPlugin(id);
          if (enabled2)
            await this.startPlugin(id);
        },
        /**
         * @internal
         */
        async evalPlugin(plugin) {
          var vendettaForPlugins = {
            ...window.vendetta,
            plugin: {
              id: plugin.id,
              manifest: plugin.manifest,
              // Wrapping this with wrapSync is NOT an option.
              storage: await createStorage(createMMKVBackend(plugin.id))
            },
            logger: new DiscordLogger(`Bunny \xBB ${plugin.manifest.name}`)
          };
          var pluginString = `vendetta=>{return ${plugin.js}}
//# sourceURL=${plugin.id}`;
          var raw = (0, eval)(pluginString)(vendettaForPlugins);
          var ret = typeof raw === "function" ? raw() : raw;
          return ret?.default ?? ret ?? {};
        },
        async startPlugin(id) {
          if (!id.endsWith("/"))
            id += "/";
          var plugin = plugins[id];
          if (!plugin)
            throw new Error("Attempted to start non-existent plugin");
          try {
            if (!settings.safeMode?.enabled) {
              var pluginRet = await this.evalPlugin(plugin);
              pluginInstance[id] = pluginRet;
              pluginRet.onLoad?.();
            }
            plugin.enabled = true;
          } catch (e) {
            logger.error(`Plugin ${plugin.id} errored whilst loading, and will be unloaded`, e);
            try {
              pluginInstance[plugin.id]?.onUnload?.();
            } catch (e2) {
              logger.error(`Plugin ${plugin.id} errored whilst unloading`, e2);
            }
            delete pluginInstance[id];
            plugin.enabled = false;
          }
        },
        stopPlugin(id, disable = true) {
          if (!id.endsWith("/"))
            id += "/";
          var plugin = plugins[id];
          var pluginRet = pluginInstance[id];
          if (!plugin)
            throw new Error("Attempted to stop non-existent plugin");
          if (!settings.safeMode?.enabled) {
            try {
              pluginRet?.onUnload?.();
            } catch (e) {
              logger.error(`Plugin ${plugin.id} errored whilst unloading`, e);
            }
            delete pluginInstance[id];
          }
          disable && (plugin.enabled = false);
        },
        async removePlugin(id) {
          if (!id.endsWith("/"))
            id += "/";
          var plugin = plugins[id];
          if (plugin.enabled)
            this.stopPlugin(id);
          delete plugins[id];
          await purgeStorage(id);
        },
        /**
         * @internal
         */
        async initPlugins() {
          var _this = this;
          await awaitStorage(settings, plugins);
          var allIds = Object.keys(plugins);
          if (!settings.safeMode?.enabled) {
            await Promise.allSettled(allIds.filter(function(pl) {
              return plugins[pl].enabled;
            }).map(async function(pl) {
              return plugins[pl].update && await _this.fetchPlugin(pl).catch(function(e) {
                return logger.error(e.message);
              }), await _this.startPlugin(pl);
            }));
            allIds.filter(function(pl) {
              return !plugins[pl].enabled && plugins[pl].update;
            }).forEach(function(pl) {
              return _this.fetchPlugin(pl);
            });
          }
          return function() {
            return _this.stopAllPlugins();
          };
        },
        stopAllPlugins() {
          var _this = this;
          return Object.keys(pluginInstance).forEach(function(p) {
            return _this.stopPlugin(p, false);
          });
        },
        getSettings: function(id) {
          return pluginInstance[id]?.settings;
        }
      };
    }
  });

  // src/lib/ui/sheets.ts
  function showSheet(key, lazyImport, props) {
    actionSheet.openLazy(lazyImport, key, props ?? {});
  }
  function hideSheet(key) {
    actionSheet.hideActionSheet(key);
  }
  var actionSheet;
  var init_sheets = __esm({
    "src/lib/ui/sheets.ts"() {
      "use strict";
      init_wrappers();
      actionSheet = findByPropsLazy("openLazy", "hideActionSheet");
    }
  });

  // src/core/ui/settings/pages/Plugins/usePluginCardStyles.ts
  var usePluginCardStyles;
  var init_usePluginCardStyles = __esm({
    "src/core/ui/settings/pages/Plugins/usePluginCardStyles.ts"() {
      "use strict";
      init_common();
      init_styles();
      usePluginCardStyles = createStyles({
        smallIcon: {
          tintColor: tokens.colors.LOGO_PRIMARY,
          height: 18,
          width: 18
        }
      });
    }
  });

  // src/lib/utils/types.ts
  var ButtonColors;
  var init_types = __esm({
    "src/lib/utils/types.ts"() {
      "use strict";
      (function(ButtonColors2) {
        ButtonColors2["BRAND"] = "brand";
        ButtonColors2["RED"] = "red";
        ButtonColors2["GREEN"] = "green";
        ButtonColors2["PRIMARY"] = "primary";
        ButtonColors2["TRANSPARENT"] = "transparent";
        ButtonColors2["GREY"] = "grey";
        ButtonColors2["LIGHTGREY"] = "lightgrey";
        ButtonColors2["WHITE"] = "white";
        ButtonColors2["LINK"] = "link";
      })(ButtonColors || (ButtonColors = {}));
    }
  });

  // src/core/ui/settings/pages/Plugins/sheets/PluginInfoActionSheet.tsx
  var PluginInfoActionSheet_exports = {};
  __export(PluginInfoActionSheet_exports, {
    default: () => PluginInfoActionSheet
  });
  function PluginInfoActionSheet({ plugin, navigation: navigation2 }) {
    useProxy(plugin);
    var Settings = VdPluginManager.getSettings(plugin.id);
    return /* @__PURE__ */ jsx(ActionSheet, {
      children: /* @__PURE__ */ jsxs(import_react_native13.ScrollView, {
        children: [
          /* @__PURE__ */ jsxs(import_react_native13.View, {
            style: {
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 24
            },
            children: [
              /* @__PURE__ */ jsx(Text, {
                variant: "heading-xl/semibold",
                children: plugin.manifest.name
              }),
              /* @__PURE__ */ jsx(import_react_native13.View, {
                style: {
                  marginLeft: "auto"
                },
                children: Settings && /* @__PURE__ */ jsx(Button, {
                  size: "md",
                  text: "Configure",
                  variant: "secondary",
                  icon: findAssetId("WrenchIcon"),
                  onPress: function() {
                    hideSheet("PluginInfoActionSheet");
                    navigation2.push("VendettaCustomPage", {
                      title: plugin.manifest.name,
                      render: Settings
                    });
                  }
                })
              })
            ]
          }),
          /* @__PURE__ */ jsxs(ActionSheetRow.Group, {
            children: [
              /* @__PURE__ */ jsx(ActionSheetRow, {
                label: Strings.REFETCH,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("RetryIcon")
                }),
                onPress: async function() {
                  if (plugin.enabled)
                    VdPluginManager.stopPlugin(plugin.id, false);
                  try {
                    await VdPluginManager.fetchPlugin(plugin.id);
                    showToast(Strings.PLUGIN_REFETCH_SUCCESSFUL, findAssetId("toast_image_saved"));
                  } catch (e) {
                    showToast(Strings.PLUGIN_REFETCH_FAILED, findAssetId("Small"));
                  }
                  if (plugin.enabled)
                    await VdPluginManager.startPlugin(plugin.id);
                  hideSheet("PluginInfoActionSheet");
                }
              }),
              /* @__PURE__ */ jsx(ActionSheetRow, {
                label: Strings.COPY_URL,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("copy")
                }),
                onPress: function() {
                  clipboard.setString(plugin.id);
                  showToast.showCopyToClipboard();
                }
              }),
              /* @__PURE__ */ jsx(ActionSheetRow, {
                label: plugin.update ? Strings.DISABLE_UPDATES : Strings.ENABLE_UPDATES,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("ic_download_24px")
                }),
                onPress: function() {
                  plugin.update = !plugin.update;
                  showToast(formatString("TOASTS_PLUGIN_UPDATE", {
                    update: plugin.update,
                    name: plugin.manifest.name
                  }), findAssetId("toast_image_saved"));
                }
              }),
              /* @__PURE__ */ jsx(ActionSheetRow, {
                label: Strings.CLEAR_DATA,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("ic_duplicate")
                }),
                onPress: function() {
                  return showConfirmationAlert({
                    title: Strings.HOLD_UP,
                    content: formatString("ARE_YOU_SURE_TO_CLEAR_DATA", {
                      name: plugin.manifest.name
                    }),
                    confirmText: Strings.CLEAR,
                    cancelText: Strings.CANCEL,
                    confirmColor: ButtonColors.RED,
                    onConfirm: async function() {
                      if (plugin.enabled)
                        VdPluginManager.stopPlugin(plugin.id, false);
                      try {
                        await VdPluginManager.fetchPlugin(plugin.id);
                        showToast(Strings.PLUGIN_REFETCH_SUCCESSFUL, findAssetId("toast_image_saved"));
                      } catch (e) {
                        showToast(Strings.PLUGIN_REFETCH_FAILED, findAssetId("Small"));
                      }
                      var message;
                      try {
                        purgeStorage(plugin.id);
                        message = [
                          "CLEAR_DATA_SUCCESSFUL",
                          "trash"
                        ];
                      } catch (e) {
                        message = [
                          "CLEAR_DATA_FAILED",
                          "Small"
                        ];
                      }
                      showToast(formatString(message[0], {
                        name: plugin.manifest.name
                      }), findAssetId(message[1]));
                      if (plugin.enabled)
                        await VdPluginManager.startPlugin(plugin.id);
                      hideSheet("PluginInfoActionSheet");
                    }
                  });
                }
              }),
              /* @__PURE__ */ jsx(ActionSheetRow, {
                label: Strings.DELETE,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("ic_message_delete")
                }),
                onPress: function() {
                  return showConfirmationAlert({
                    title: Strings.HOLD_UP,
                    content: formatString("ARE_YOU_SURE_TO_DELETE_PLUGIN", {
                      name: plugin.manifest.name
                    }),
                    confirmText: Strings.DELETE,
                    cancelText: Strings.CANCEL,
                    confirmColor: ButtonColors.RED,
                    onConfirm: function() {
                      try {
                        VdPluginManager.removePlugin(plugin.id);
                      } catch (e) {
                        showToast(String(e), findAssetId("Small"));
                      }
                      hideSheet("PluginInfoActionSheet");
                    }
                  });
                }
              })
            ]
          })
        ]
      })
    });
  }
  var import_react_native13;
  var init_PluginInfoActionSheet = __esm({
    "src/core/ui/settings/pages/Plugins/sheets/PluginInfoActionSheet.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_i18n();
      init_plugins();
      init_assets();
      init_storage();
      init_types();
      init_common();
      init_components();
      init_alerts();
      init_sheets();
      init_toasts();
      import_react_native13 = __toESM(require_react_native());
    }
  });

  // src/core/ui/settings/pages/Plugins/PluginCard.tsx
  function Authors() {
    var plugin = usePlugin();
    var children = [
      "by "
    ];
    for (var author of plugin.manifest.authors) {
      children.push(author.name);
      children.push(", ");
    }
    children.pop();
    return /* @__PURE__ */ jsx(Text, {
      variant: "text-md/semibold",
      color: "text-muted",
      children
    });
  }
  function Title() {
    var styles3 = usePluginCardStyles();
    var plugin = usePlugin();
    var iconName = plugin.manifest.vendetta?.icon;
    var icon = iconName && findAssetId(iconName);
    var textElement = /* @__PURE__ */ jsx(Text, {
      numberOfLines: 1,
      variant: "heading-lg/semibold",
      children: plugin.manifest.name
    });
    return !icon ? textElement : /* @__PURE__ */ jsxs(import_react_native14.View, {
      style: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
      },
      children: [
        /* @__PURE__ */ jsx(import_react_native14.Image, {
          style: styles3.smallIcon,
          source: icon
        }),
        textElement
      ]
    });
  }
  function PluginCard({ item: plugin }) {
    useProxy(plugin);
    return /* @__PURE__ */ jsx(PluginContext.Provider, {
      value: plugin,
      children: /* @__PURE__ */ jsx(Card, {
        children: /* @__PURE__ */ jsxs(Stack, {
          spacing: 16,
          children: [
            /* @__PURE__ */ jsxs(import_react_native14.View, {
              style: {
                flexDirection: "row",
                justifyContent: "space-between"
              },
              children: [
                /* @__PURE__ */ jsxs(import_react_native14.View, {
                  style: {
                    flexShrink: 1
                  },
                  children: [
                    /* @__PURE__ */ jsx(Title, {}),
                    /* @__PURE__ */ jsx(Authors, {})
                  ]
                }),
                /* @__PURE__ */ jsx(import_react_native14.View, {
                  children: /* @__PURE__ */ jsxs(Stack, {
                    spacing: 12,
                    direction: "horizontal",
                    children: [
                      /* @__PURE__ */ jsx(Actions, {}),
                      /* @__PURE__ */ jsx(TableSwitch, {
                        value: plugin.enabled,
                        onValueChange: function(v) {
                          if (v)
                            VdPluginManager.startPlugin(plugin.id);
                          else
                            VdPluginManager.stopPlugin(plugin.id);
                        }
                      })
                    ]
                  })
                })
              ]
            }),
            /* @__PURE__ */ jsx(Text, {
              variant: "text-md/medium",
              children: plugin.manifest.description
            })
          ]
        })
      })
    });
  }
  var import_react2, import_react_native14, useToken, PluginContext, usePlugin, Actions;
  var init_PluginCard = __esm({
    "src/core/ui/settings/pages/Plugins/PluginCard.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_plugins();
      init_assets();
      init_storage();
      init_lazy();
      init_metro();
      init_common();
      init_components();
      init_sheets();
      import_react2 = __toESM(require_react());
      import_react_native14 = __toESM(require_react_native());
      init_usePluginCardStyles();
      ({ useToken } = lazyDestructure(function() {
        return findByProps("useToken");
      }));
      PluginContext = /* @__PURE__ */ (0, import_react2.createContext)(null);
      usePlugin = function() {
        return (0, import_react2.useContext)(PluginContext);
      };
      Actions = /* @__PURE__ */ (0, import_react2.memo)(function() {
        var plugin = usePlugin();
        var navigation2 = NavigationNative.useNavigation();
        return /* @__PURE__ */ jsxs(import_react_native14.View, {
          style: {
            flexDirection: "row",
            gap: 6
          },
          children: [
            /* @__PURE__ */ jsx(IconButton, {
              size: "sm",
              variant: "secondary",
              icon: findAssetId("WrenchIcon"),
              disabled: !VdPluginManager.getSettings(plugin.id),
              onPress: function() {
                return navigation2.push("VendettaCustomPage", {
                  title: plugin.manifest.name,
                  render: VdPluginManager.getSettings(plugin.id)
                });
              }
            }),
            /* @__PURE__ */ jsx(IconButton, {
              size: "sm",
              variant: "secondary",
              icon: findAssetId("CircleInformationIcon-primary"),
              onPress: function() {
                return void showSheet("PluginInfoActionSheet", Promise.resolve().then(() => (init_PluginInfoActionSheet(), PluginInfoActionSheet_exports)), {
                  plugin,
                  navigation: navigation2
                });
              }
            })
          ]
        });
      });
    }
  });

  // src/core/ui/settings/pages/Plugins/index.tsx
  var Plugins_exports = {};
  __export(Plugins_exports, {
    default: () => Plugins
  });
  function Plugins() {
    useProxy(settings);
    return /* @__PURE__ */ jsx(AddonPage, {
      title: Strings.PLUGINS,
      searchKeywords: [
        "manifest.name",
        "manifest.description",
        function(p) {
          return p.manifest.authors?.map(function(a) {
            return a.name;
          }).join();
        }
      ],
      items: VdPluginManager.plugins,
      fetchFunction: VdPluginManager.installPlugin.bind(VdPluginManager),
      safeModeMessage: Strings.SAFE_MODE_NOTICE_PLUGINS,
      card: PluginCard
    });
  }
  var init_Plugins = __esm({
    "src/core/ui/settings/pages/Plugins/index.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_i18n();
      init_AddonPage();
      init_PluginCard();
      init_plugins();
      init_settings();
      init_storage();
    }
  });

  // src/core/ui/components/AddonCard.tsx
  function AddonCard(props) {
    var styles3 = useStyles2();
    return /* @__PURE__ */ jsx(Card, {
      children: /* @__PURE__ */ jsxs(Stack, {
        spacing: 16,
        children: [
          /* @__PURE__ */ jsxs(import_react_native15.View, {
            style: {
              flexDirection: "row",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ jsxs(import_react_native15.View, {
                style: styles3.headerLeading,
                children: [
                  /* @__PURE__ */ jsx(Text, {
                    style: styles3.headerLabel,
                    children: props.headerLabel
                  }),
                  props.headerSublabel && /* @__PURE__ */ jsx(Text, {
                    style: styles3.headerSubtitle,
                    children: props.headerSublabel
                  })
                ]
              }),
              /* @__PURE__ */ jsxs(import_react_native15.View, {
                style: [
                  styles3.headerTrailing,
                  {
                    marginLeft: "auto"
                  }
                ],
                children: [
                  /* @__PURE__ */ jsxs(import_react_native15.View, {
                    style: styles3.actions,
                    children: [
                      props.overflowActions && /* @__PURE__ */ jsx(IconButton, {
                        onPress: function() {
                          return showSimpleActionSheet({
                            key: "CardOverflow",
                            header: {
                              title: props.overflowTitle,
                              icon: props.headerIcon && /* @__PURE__ */ jsx(LegacyFormRow.Icon, {
                                style: {
                                  marginRight: 8
                                },
                                source: findAssetId(props.headerIcon)
                              }),
                              onClose: function() {
                                return hideActionSheet();
                              }
                            },
                            options: props.overflowActions?.map(function(i) {
                              return {
                                ...i,
                                icon: findAssetId(i.icon)
                              };
                            })
                          });
                        },
                        size: "sm",
                        variant: "secondary",
                        icon: findAssetId("CircleInformationIcon-primary")
                      }),
                      props.actions?.map(function({ icon, onPress, disabled }) {
                        return /* @__PURE__ */ jsx(IconButton, {
                          onPress,
                          disabled,
                          size: "sm",
                          variant: "secondary",
                          icon: findAssetId(icon)
                        });
                      })
                    ]
                  }),
                  props.toggleType && (props.toggleType === "switch" ? /* @__PURE__ */ jsx(FormSwitch, {
                    value: props.toggleValue(),
                    onValueChange: props.onToggleChange
                  }) : /* @__PURE__ */ jsx(import_react_native15.TouchableOpacity, {
                    onPress: function() {
                      props.onToggleChange?.(!props.toggleValue());
                    },
                    children: /* @__PURE__ */ jsx(FormRadio, {
                      selected: props.toggleValue()
                    })
                  }))
                ]
              })
            ]
          }),
          props.descriptionLabel && /* @__PURE__ */ jsx(Text, {
            variant: "text-md/medium",
            children: props.descriptionLabel
          })
        ]
      })
    });
  }
  var import_react_native15, hideActionSheet, showSimpleActionSheet, useStyles2;
  var init_AddonCard = __esm({
    "src/core/ui/components/AddonCard.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_assets();
      init_lazy();
      init_components();
      init_wrappers();
      init_color();
      init_styles();
      import_react_native15 = __toESM(require_react_native());
      ({ hideActionSheet } = lazyDestructure(function() {
        return findByProps("openLazy", "hideActionSheet");
      }));
      ({ showSimpleActionSheet } = lazyDestructure(function() {
        return findByProps("showSimpleActionSheet");
      }));
      useStyles2 = createStyles({
        card: {
          backgroundColor: semanticColors?.CARD_SECONDARY_BG,
          borderRadius: 12,
          overflow: "hidden"
        },
        header: {
          padding: 0
        },
        headerLeading: {
          flexDirection: "column",
          justifyContent: "center",
          scale: 1.2
        },
        headerTrailing: {
          display: "flex",
          flexDirection: "row",
          gap: 15,
          alignItems: "center"
        },
        headerLabel: {
          ...TextStyleSheet["heading-md/semibold"],
          color: semanticColors.TEXT_NORMAL
        },
        headerSubtitle: {
          ...TextStyleSheet["text-md/semibold"],
          color: semanticColors.TEXT_MUTED
        },
        descriptionLabel: {
          ...TextStyleSheet["text-md/semibold"],
          color: semanticColors.TEXT_NORMAL
        },
        actions: {
          flexDirection: "row-reverse",
          alignItems: "center",
          gap: 5
        },
        iconStyle: {
          tintColor: semanticColors.LOGO_PRIMARY,
          opacity: 0.2,
          height: 64,
          width: 64,
          left: void 0,
          right: "30%",
          top: "-10%"
        }
      });
    }
  });

  // src/core/ui/settings/pages/Themes/ThemeCard.tsx
  function selectAndApply(value, theme) {
    try {
      selectTheme(value ? theme : null);
      applyTheme(value ? theme : null);
    } catch (e) {
      console.error("Error while selectAndApply,", e);
    }
  }
  function ThemeCard({ item: theme }) {
    useProxy(theme);
    var [removed, setRemoved] = React.useState(false);
    if (removed)
      return null;
    var { authors } = theme.data;
    return /* @__PURE__ */ jsx(AddonCard, {
      headerLabel: theme.data.name,
      headerSublabel: authors ? `by ${authors.map(function(i) {
        return i.name;
      }).join(", ")}` : "",
      descriptionLabel: theme.data.description ?? "No description.",
      toggleType: !settings.safeMode?.enabled ? "radio" : void 0,
      toggleValue: function() {
        return themes[theme.id].selected;
      },
      onToggleChange: function(v) {
        selectAndApply(v, theme);
      },
      overflowTitle: theme.data.name,
      overflowActions: [
        {
          icon: "ic_sync_24px",
          label: Strings.REFETCH,
          onPress: function() {
            fetchTheme(theme.id, theme.selected).then(function() {
              showToast(Strings.THEME_REFETCH_SUCCESSFUL, findAssetId("toast_image_saved"));
            }).catch(function() {
              showToast(Strings.THEME_REFETCH_FAILED, findAssetId("Small"));
            });
          }
        },
        {
          icon: "copy",
          label: Strings.COPY_URL,
          onPress: function() {
            clipboard.setString(theme.id);
            showToast.showCopyToClipboard();
          }
        },
        {
          icon: "ic_message_delete",
          label: Strings.DELETE,
          isDestructive: true,
          onPress: function() {
            return showConfirmationAlert({
              title: Strings.HOLD_UP,
              content: formatString("ARE_YOU_SURE_TO_DELETE_THEME", {
                name: theme.data.name
              }),
              confirmText: Strings.DELETE,
              cancelText: Strings.CANCEL,
              confirmColor: ButtonColors.RED,
              onConfirm: function() {
                removeTheme(theme.id).then(function(wasSelected) {
                  setRemoved(true);
                  if (wasSelected)
                    selectAndApply(false, theme);
                }).catch(function(e) {
                  showToast(e.message, findAssetId("Small"));
                });
              }
            });
          }
        }
      ]
    });
  }
  var init_ThemeCard = __esm({
    "src/core/ui/settings/pages/Themes/ThemeCard.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_i18n();
      init_AddonCard();
      init_assets();
      init_settings();
      init_storage();
      init_themes();
      init_types();
      init_common();
      init_alerts();
      init_toasts();
    }
  });

  // src/core/ui/settings/pages/Themes/index.tsx
  var Themes_exports = {};
  __export(Themes_exports, {
    default: () => Themes
  });
  function Themes() {
    useProxy(settings);
    useProxy(themes);
    return /* @__PURE__ */ jsx(AddonPage, {
      title: Strings.THEMES,
      searchKeywords: [
        "manifest.name",
        "manifest.description",
        function(p) {
          return p.manifest.authors?.map(function(a) {
            return a.name;
          }).join();
        }
      ],
      fetchFunction: installTheme,
      items: themes,
      safeModeMessage: formatString("SAFE_MODE_NOTICE_THEMES", {
        enabled: Boolean(settings.safeMode?.currentThemeId)
      }),
      safeModeExtras: settings.safeMode?.currentThemeId ? /* @__PURE__ */ jsx(Button, {
        text: Strings.DISABLE_THEME,
        size: "small",
        onPress: function() {
          return delete settings.safeMode?.currentThemeId;
        },
        style: {
          marginTop: 8
        }
      }) : void 0,
      card: ThemeCard
    });
  }
  var init_Themes = __esm({
    "src/core/ui/settings/pages/Themes/index.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_i18n();
      init_AddonPage();
      init_ThemeCard();
      init_settings();
      init_storage();
      init_themes();
      init_components();
    }
  });

  // src/lib/api/native/fs.ts
  var fs_exports = {};
  __export(fs_exports, {
    clearFolder: () => clearFolder,
    downloadFile: () => downloadFile,
    fileExists: () => fileExists,
    readFile: () => readFile,
    removeFile: () => removeFile,
    writeFile: () => writeFile
  });
  async function clearFolder(path, prefix = "pyoncord/") {
    if (typeof FileManager.clearFolder !== "function")
      throw new Error("'fs.clearFolder' is not supported");
    return void await FileManager.clearFolder("documents", `${prefix}${path}`);
  }
  async function removeFile(path, prefix = "pyoncord/") {
    if (typeof FileManager.removeFile !== "function")
      throw new Error("'fs.removeFile' is not supported");
    return void await FileManager.removeFile("documents", `${prefix}${path}`);
  }
  async function fileExists(path, prefix = "pyoncord/") {
    return await FileManager.fileExists(`${FileManager.getConstants().DocumentsDirPath}/${prefix}${path}`);
  }
  async function writeFile(path, data, prefix = "pyoncord/") {
    if (typeof data !== "string")
      throw new Error("Argument 'data' must be a string");
    return void await FileManager.writeFile("documents", `${prefix}${path}`, data, "utf8");
  }
  async function readFile(path, prefix = "pyoncord/") {
    try {
      return await FileManager.readFile(`${FileManager.getConstants().DocumentsDirPath}/${prefix}${path}`, "utf8");
    } catch (err) {
      throw new Error(`An error occured while writing to '${path}'`, {
        cause: err
      });
    }
  }
  async function downloadFile(url2, path, prefix = "pyoncord/") {
    var blob = await fetch(url2).then(function(r) {
      return r.blob();
    });
    var dataURL = await new Promise(function(r) {
      var reader = new FileReader();
      reader.onload = function() {
        return r(reader.result);
      };
      reader.readAsDataURL(blob);
    });
    var data;
    if (dataURL == null) {
      throw new Error("Failed to convert blob to data URL");
    } else {
      var index = dataURL.indexOf("base64,");
      if (index === -1)
        throw new Error("dataURL does not contain base64");
      data = dataURL.slice(index + 7);
    }
    return void await FileManager.writeFile("documents", `${prefix}${path}`, data, "base64");
  }
  var init_fs = __esm({
    "src/lib/api/native/fs.ts"() {
      "use strict";
      init_modules();
    }
  });

  // src/lib/fonts/index.ts
  var fonts_exports = {};
  __export(fonts_exports, {
    fonts: () => fonts,
    installFont: () => installFont,
    removeFont: () => removeFont,
    saveFont: () => saveFont,
    selectFont: () => selectFont,
    updateFonts: () => updateFonts,
    validateFont: () => validateFont
  });
  async function writeFont(font) {
    if (!font && font !== null)
      throw new Error("Arg font must be a valid object or null");
    if (font) {
      await writeFile("fonts.json", JSON.stringify(font));
    } else {
      await removeFile("fonts.json");
    }
  }
  function validateFont(font) {
    if (!font || typeof font !== "object")
      throw new Error("URL returned a null/non-object JSON");
    if (typeof font.spec !== "number")
      throw new Error("Invalid font 'spec' number");
    if (font.spec !== 1)
      throw new Error("Only fonts which follows spec:1 are supported");
    var requiredFields = [
      "name",
      "main"
    ];
    if (requiredFields.some(function(f) {
      return !font[f];
    }))
      throw new Error(`Font is missing one of the fields: ${requiredFields}`);
    if (font.name.startsWith("__"))
      throw new Error("Font names cannot start with __");
    if (font.name in fonts)
      throw new Error(`There is already a font named '${font.name}' installed`);
  }
  async function saveFont(data, selected = false) {
    var fontDefJson;
    if (typeof data === "object" && data.__source)
      data = data.__source;
    if (typeof data === "string") {
      try {
        fontDefJson = await (await safeFetch(data)).json();
        fontDefJson.__source = data;
      } catch (e) {
        throw new Error(`Failed to fetch fonts at ${data}`, {
          cause: e
        });
      }
    } else {
      fontDefJson = data;
    }
    validateFont(fontDefJson);
    try {
      await Promise.all(Object.entries(fontDefJson.main).map(async function([font, url2]) {
        var ext = url2.split(".").pop();
        if (ext !== "ttf" && ext !== "otf")
          ext = "ttf";
        var path = `downloads/fonts/${fontDefJson.name}/${font}.${ext}`;
        if (!await fileExists(path))
          await downloadFile(url2, path);
      }));
    } catch (e) {
      throw new Error("Failed to download font assets", {
        cause: e
      });
    }
    fonts[fontDefJson.name] = fontDefJson;
    if (selected)
      writeFont(fonts[fontDefJson.name]);
    return fontDefJson;
  }
  async function installFont(url2, selected = false) {
    if (typeof url2 !== "string" || Object.values(fonts).some(function(f) {
      return typeof f === "object" && f.__source === url2;
    })) {
      throw new Error("Invalid source or font was already installed");
    }
    var font = await saveFont(url2);
    if (selected)
      await selectFont(font.name);
  }
  async function selectFont(name) {
    if (name && !(name in fonts))
      throw new Error("Selected font does not exist!");
    if (name) {
      fonts.__selected = name;
    } else {
      delete fonts.__selected;
    }
    await writeFont(name == null ? null : fonts[name]);
  }
  async function removeFont(name) {
    var selected = fonts.__selected === name;
    if (selected)
      await selectFont(null);
    delete fonts[name];
    try {
      await clearFolder(`downloads/fonts/${name}`);
    } catch (e) {
    }
  }
  async function updateFonts() {
    await awaitStorage(fonts);
    await Promise.allSettled(Object.keys(fonts).map(function(name) {
      return saveFont(fonts[name], fonts.__selected === name);
    }));
  }
  var fonts;
  var init_fonts = __esm({
    "src/lib/fonts/index.ts"() {
      "use strict";
      init_fs();
      init_storage();
      init_utils();
      fonts = wrapSync(createStorage(createMMKVBackend("BUNNY_FONTS")));
    }
  });

  // src/core/ui/settings/pages/Fonts/FontEditor.tsx
  function guessFontName(urls) {
    var fileNames = urls.map(function(url2) {
      var { pathname } = new URL(url2);
      var fileName = pathname.replace(/\.[^/.]+$/, "");
      return fileName.split("/").pop();
    }).filter(Boolean);
    var shortest = fileNames.reduce(function(shortest2, name) {
      return name.length < shortest2.length ? name : shortest2;
    }, fileNames[0] || "");
    return shortest?.replace(/-[A-Za-z]*$/, "") || null;
  }
  function RevengeFontsExtractor({ fonts: fonts2, setName }) {
    var currentTheme2 = getCurrentTheme().data;
    var themeFonts = currentTheme2.fonts;
    var [fontName, setFontName] = (0, import_react3.useState)(guessFontName(Object.values(themeFonts)));
    var [error, setError] = (0, import_react3.useState)(void 0);
    return /* @__PURE__ */ jsxs(import_react_native16.View, {
      style: {
        padding: 8,
        paddingBottom: 16,
        gap: 12
      },
      children: [
        /* @__PURE__ */ jsx(TextInput, {
          autoFocus: true,
          size: "md",
          label: Strings.FONT_NAME,
          value: fontName,
          placeholder: fontName || "Whitney",
          onChange: setFontName,
          errorMessage: error,
          state: error ? "error" : void 0
        }),
        /* @__PURE__ */ jsx(Text, {
          variant: "text-xs/normal",
          color: "text-muted",
          children: formatString("THEME_EXTRACTOR_DESC", {
            fonts: Object.keys(themeFonts).join(Strings.SEPARATOR)
          })
        }),
        /* @__PURE__ */ jsx(Button, {
          size: "md",
          variant: "primary",
          text: Strings.EXTRACT,
          disabled: !fontName,
          onPress: function() {
            if (!fontName)
              return;
            try {
              validateFont({
                spec: 1,
                name: fontName,
                main: themeFonts
              });
              setName(fontName);
              Object.assign(fonts2, themeFonts);
              actionSheet2.hideActionSheet();
            } catch (e) {
              setError(String(e));
            }
          }
        })
      ]
    });
  }
  function JsonFontImporter({ fonts: fonts2, setName, setSource }) {
    var [fontLink, setFontLink] = (0, import_react3.useState)("");
    var [saving, setSaving] = (0, import_react3.useState)(false);
    var [error, setError] = (0, import_react3.useState)(void 0);
    return /* @__PURE__ */ jsxs(import_react_native16.View, {
      style: {
        padding: 8,
        paddingBottom: 16,
        gap: 12
      },
      children: [
        /* @__PURE__ */ jsx(TextInput, {
          autoFocus: true,
          size: "md",
          label: "Font Link",
          value: fontLink,
          placeholder: "https://link.to/font/pack.json",
          onChange: setFontLink,
          errorMessage: error,
          state: error ? "error" : void 0
        }),
        /* @__PURE__ */ jsx(Button, {
          size: "md",
          variant: "primary",
          text: "Import",
          disabled: !fontLink || saving,
          loading: saving,
          onPress: function() {
            setSaving(true);
            (async function() {
              var res = await safeFetch(fontLink, {
                cache: "no-store"
              });
              var json = await res.json();
              validateFont(json);
              setName(json.name);
              setSource(fontLink);
              Object.assign(fonts2, json.main);
            })().then(function() {
              return actionSheet2.hideActionSheet();
            }).catch(function(e) {
              return setError(String(e));
            }).finally(function() {
              return setSaving(false);
            });
          }
        })
      ]
    });
  }
  function EntryEditorActionSheet(props) {
    var [familyName, setFamilyName] = (0, import_react3.useState)(props.name);
    var [fontUrl, setFontUrl] = (0, import_react3.useState)(props.fontEntries[props.name]);
    return /* @__PURE__ */ jsxs(import_react_native16.View, {
      style: {
        padding: 8,
        paddingBottom: 16,
        gap: 12
      },
      children: [
        /* @__PURE__ */ jsx(TextInput, {
          autoFocus: true,
          size: "md",
          label: "Family Name (to override)",
          value: familyName,
          placeholder: "ggsans-Bold",
          onChange: setFamilyName
        }),
        /* @__PURE__ */ jsx(TextInput, {
          size: "md",
          label: "Font URL",
          value: fontUrl,
          placeholder: "https://link.to/the/font.ttf",
          onChange: setFontUrl
        }),
        /* @__PURE__ */ jsx(Button, {
          size: "md",
          variant: "primary",
          text: "Apply",
          onPress: function() {
            delete props.fontEntries[props.name];
            props.fontEntries[familyName] = fontUrl;
          }
        })
      ]
    });
  }
  function promptActionSheet(Component, fontEntries, props) {
    actionSheet2.openLazy(Promise.resolve({
      default: function() {
        return /* @__PURE__ */ jsx(ErrorBoundary, {
          children: /* @__PURE__ */ jsxs(ActionSheet, {
            children: [
              /* @__PURE__ */ jsx(BottomSheetTitleHeader, {
                title: "Import Font"
              }),
              /* @__PURE__ */ jsx(Component, {
                fonts: fontEntries,
                ...props
              })
            ]
          })
        });
      }
    }), "FontEditorActionSheet");
  }
  function NewEntryRow({ fontEntry }) {
    var nameRef = (0, import_react3.useRef)();
    var urlRef = (0, import_react3.useRef)();
    var [nameSet, setNameSet] = (0, import_react3.useState)(false);
    var [error, setError] = (0, import_react3.useState)();
    return /* @__PURE__ */ jsxs(import_react_native16.View, {
      style: {
        flexDirection: "row",
        gap: 8,
        justifyContent: "flex-start"
      },
      children: [
        /* @__PURE__ */ jsx(import_react_native16.View, {
          style: {
            flex: 1
          },
          children: /* @__PURE__ */ jsx(TextInput, {
            isRound: true,
            size: "md",
            label: nameSet ? nameRef.current : void 0,
            placeholder: nameSet ? "https://path.to/the/file.ttf" : "PostScript name (e.g. ggsans-Bold)",
            leadingIcon: function() {
              return nameSet ? null : /* @__PURE__ */ jsx(TableRow.Icon, {
                source: findAssetId("PlusSmallIcon")
              });
            },
            leadingText: nameSet ? nameRef.current : "",
            onChange: function(text) {
              return (nameSet ? urlRef : nameRef).current = text;
            },
            errorMessage: error,
            state: error ? "error" : void 0
          })
        }),
        nameSet && /* @__PURE__ */ jsx(IconButton, {
          size: "md",
          variant: "secondary",
          onPress: function() {
            nameRef.current = "";
            setNameSet(false);
          },
          icon: findAssetId("TrashIcon")
        }),
        /* @__PURE__ */ jsx(IconButton, {
          size: "md",
          variant: "primary",
          onPress: function() {
            if (!nameSet && nameRef.current) {
              setNameSet(true);
            } else if (nameSet && nameRef.current && urlRef.current) {
              try {
                var parsedUrl = new URL(urlRef.current);
                if (!parsedUrl.protocol || !parsedUrl.host) {
                  throw "Invalid URL";
                }
                fontEntry[nameRef.current] = urlRef.current;
                nameRef.current = void 0;
                urlRef.current = void 0;
                setNameSet(false);
              } catch (e) {
                setError(String(e));
              }
            }
          },
          icon: findAssetId(nameSet ? "PlusSmallIcon" : "ArrowLargeRightIcon")
        })
      ]
    });
  }
  function FontEditor(props) {
    var [name, setName] = (0, import_react3.useState)(props.name);
    var [source, setSource] = (0, import_react3.useState)();
    var [importing, setIsImporting] = (0, import_react3.useState)(false);
    var memoEntry = (0, import_react3.useMemo)(function() {
      return createProxy(props.name ? {
        ...fonts[props.name].main
      } : {}).proxy;
    }, [
      props.name
    ]);
    var fontEntries = useProxy(memoEntry);
    var navigation2 = NavigationNative.useNavigation();
    return /* @__PURE__ */ jsx(import_react_native16.ScrollView, {
      style: {
        flex: 1
      },
      contentContainerStyle: {
        paddingBottom: 38
      },
      children: /* @__PURE__ */ jsxs(Stack, {
        style: {
          paddingVertical: 24,
          paddingHorizontal: 12
        },
        spacing: 12,
        children: [
          !props.name ? /* @__PURE__ */ jsxs(TableRowGroup, {
            title: "Import",
            children: [
              getCurrentTheme()?.data?.fonts && /* @__PURE__ */ jsx(TableRow, {
                label: Strings.LABEL_EXTRACT_FONTS_FROM_THEME,
                subLabel: Strings.DESC_EXTRACT_FONTS_FROM_THEME,
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("HammerIcon")
                }),
                onPress: function() {
                  return promptActionSheet(RevengeFontsExtractor, fontEntries, {
                    setName
                  });
                }
              }),
              /* @__PURE__ */ jsx(TableRow, {
                label: "Import font entries from a link",
                subLabel: "Directly import from a link with a pre-configured JSON file",
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("LinkIcon")
                }),
                onPress: function() {
                  return promptActionSheet(JsonFontImporter, fontEntries, {
                    setName,
                    setSource
                  });
                }
              })
            ]
          }) : /* @__PURE__ */ jsxs(TableRowGroup, {
            title: "Actions",
            children: [
              /* @__PURE__ */ jsx(TableRow, {
                label: "Refetch fonts from source",
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("RetryIcon")
                }),
                onPress: async function() {
                  var ftCopy = {
                    ...fonts[props.name]
                  };
                  await removeFont(props.name);
                  await saveFont(ftCopy);
                  navigation2.goBack();
                }
              }),
              /* @__PURE__ */ jsx(TableRow, {
                label: "Delete font pack",
                icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                  source: findAssetId("TrashIcon")
                }),
                onPress: function() {
                  return removeFont(props.name).then(function() {
                    return navigation2.goBack();
                  });
                }
              })
            ]
          }),
          /* @__PURE__ */ jsx(TextInput, {
            size: "lg",
            value: name,
            label: Strings.FONT_NAME,
            placeholder: "Whitney",
            onChange: setName
          }),
          /* @__PURE__ */ jsxs(TableRowGroup, {
            title: "Font Entries",
            children: [
              Object.entries(fontEntries).map(function([name2, url2]) {
                return /* @__PURE__ */ jsx(TableRow, {
                  label: name2,
                  subLabel: url2,
                  trailing: /* @__PURE__ */ jsxs(Stack, {
                    spacing: 2,
                    direction: "horizontal",
                    children: [
                      /* @__PURE__ */ jsx(IconButton, {
                        size: "sm",
                        variant: "secondary",
                        icon: findAssetId("PencilIcon"),
                        onPress: function() {
                          return promptActionSheet(EntryEditorActionSheet, fontEntries, {
                            name: name2,
                            fontEntries
                          });
                        }
                      }),
                      /* @__PURE__ */ jsx(IconButton, {
                        size: "sm",
                        variant: "secondary",
                        icon: findAssetId("TrashIcon"),
                        onPress: function() {
                          return delete fontEntries[name2];
                        }
                      })
                    ]
                  })
                });
              }),
              /* @__PURE__ */ jsx(TableRow, {
                label: /* @__PURE__ */ jsx(NewEntryRow, {
                  fontEntry: fontEntries
                })
              })
            ]
          }),
          /* @__PURE__ */ jsx(import_react_native16.View, {
            style: {
              flexDirection: "row",
              justifyContent: "flex-end",
              bottom: 0,
              left: 0
            },
            children: /* @__PURE__ */ jsx(Button, {
              size: "lg",
              loading: importing,
              disabled: importing || !name || Object.keys(fontEntries).length === 0,
              variant: "primary",
              text: props.name ? "Save" : "Import",
              onPress: async function() {
                if (!name)
                  return;
                setIsImporting(true);
                if (!props.name) {
                  saveFont({
                    spec: 1,
                    name,
                    main: fontEntries,
                    __source: source
                  }).then(function() {
                    return navigation2.goBack();
                  }).finally(function() {
                    return setIsImporting(false);
                  });
                } else {
                  Object.assign(fonts[props.name], {
                    name,
                    main: fontEntries,
                    __edited: true
                  });
                  setIsImporting(false);
                  navigation2.goBack();
                }
              },
              icon: findAssetId(props.name ? "toast_image_saved" : "DownloadIcon"),
              style: {
                marginLeft: 8
              }
            })
          })
        ]
      })
    });
  }
  var import_react3, import_react_native16, actionSheet2;
  var init_FontEditor = __esm({
    "src/core/ui/settings/pages/Fonts/FontEditor.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_i18n();
      init_assets();
      init_storage();
      init_fonts();
      init_themes();
      init_utils();
      init_common();
      init_components();
      init_wrappers();
      init_components2();
      import_react3 = __toESM(require_react());
      import_react_native16 = __toESM(require_react_native());
      actionSheet2 = findByPropsLazy("hideActionSheet");
    }
  });

  // globals:@shopify/react-native-skia
  var require_react_native_skia = __commonJS({
    "globals:@shopify/react-native-skia"(exports, module) {
      module.exports = require_depsModule()["@shopify/react-native-skia"];
    }
  });

  // src/core/ui/settings/pages/Fonts/FontCard.tsx
  function FontPreview({ font }) {
    var TEXT_NORMAL = useToken2(tokens.colors.TEXT_NORMAL);
    var { fontFamily: fontFamilyList, fontSize } = TextStyleSheet["text-md/medium"];
    var fontFamily = fontFamilyList.split(/,/g)[0];
    var typeface = Skia.useFont(font.main[fontFamily])?.getTypeface();
    var paragraph = (0, import_react4.useMemo)(function() {
      if (!typeface)
        return null;
      var fMgr = SkiaApi.TypefaceFontProvider.Make();
      fMgr.registerFont(typeface, fontFamily);
      return SkiaApi.ParagraphBuilder.Make({}, fMgr).pushStyle({
        color: SkiaApi.Color(TEXT_NORMAL),
        fontFamilies: [
          fontFamily
        ],
        fontSize
      }).addText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.").pop().build();
    }, [
      typeface
    ]);
    return (
      // This does not work, actually :woeis:
      /* @__PURE__ */ jsx(import_react_native17.View, {
        style: {
          height: 64
        },
        children: typeface ? /* @__PURE__ */ jsx(Skia.Canvas, {
          style: {
            height: 64
          },
          children: /* @__PURE__ */ jsx(Skia.Paragraph, {
            paragraph,
            x: 0,
            y: 0,
            width: 300
          })
        }) : /* @__PURE__ */ jsx(import_react_native17.View, {
          style: {
            justifyContent: "center",
            alignItems: "center"
          },
          children: /* @__PURE__ */ jsx(Text, {
            color: "text-muted",
            variant: "heading-lg/semibold",
            children: "Loading..."
          })
        })
      })
    );
  }
  function FontCard({ item: font }) {
    useProxy(fonts);
    var navigation2 = NavigationNative.useNavigation();
    var selected = fonts.__selected === font.name;
    return /* @__PURE__ */ jsx(Card, {
      children: /* @__PURE__ */ jsxs(Stack, {
        spacing: 16,
        children: [
          /* @__PURE__ */ jsxs(import_react_native17.View, {
            style: {
              flexDirection: "row",
              alignItems: "center"
            },
            children: [
              /* @__PURE__ */ jsx(import_react_native17.View, {
                children: /* @__PURE__ */ jsx(Text, {
                  variant: "heading-lg/semibold",
                  children: font.name
                })
              }),
              /* @__PURE__ */ jsx(import_react_native17.View, {
                style: {
                  marginLeft: "auto"
                },
                children: /* @__PURE__ */ jsxs(Stack, {
                  spacing: 12,
                  direction: "horizontal",
                  children: [
                    /* @__PURE__ */ jsx(IconButton, {
                      onPress: function() {
                        navigation2.push("VendettaCustomPage", {
                          title: "Edit Font",
                          render: function() {
                            return /* @__PURE__ */ jsx(FontEditor, {
                              name: font.name
                            });
                          }
                        });
                      },
                      size: "sm",
                      variant: "secondary",
                      disabled: selected,
                      icon: findAssetId("PencilIcon")
                    }),
                    /* @__PURE__ */ jsx(Button, {
                      size: "sm",
                      variant: selected ? "secondary" : "primary",
                      text: selected ? "Unapply" : "Apply",
                      onPress: async function() {
                        await selectFont(selected ? null : font.name);
                        showConfirmationAlert({
                          title: Strings.HOLD_UP,
                          content: "Reload Discord to apply changes?",
                          confirmText: Strings.RELOAD,
                          cancelText: Strings.CANCEL,
                          confirmColor: ButtonColors.RED,
                          onConfirm: BundleUpdaterManager.reload
                        });
                      }
                    })
                  ]
                })
              })
            ]
          }),
          /* @__PURE__ */ jsx(FontPreview, {
            font
          })
        ]
      })
    });
  }
  var Skia, import_react4, import_react_native17, useToken2;
  var init_FontCard = __esm({
    "src/core/ui/settings/pages/Fonts/FontCard.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_i18n();
      init_assets();
      init_modules();
      init_storage();
      init_fonts();
      init_lazy();
      init_types();
      init_metro();
      init_common();
      init_components();
      Skia = __toESM(require_react_native_skia());
      init_alerts();
      init_styles();
      import_react4 = __toESM(require_react());
      import_react_native17 = __toESM(require_react_native());
      init_FontEditor();
      ({ useToken: useToken2 } = lazyDestructure(function() {
        return findByProps("useToken");
      }));
    }
  });

  // src/core/ui/settings/pages/Fonts/index.tsx
  var Fonts_exports = {};
  __export(Fonts_exports, {
    default: () => Fonts
  });
  function Fonts() {
    useProxy(settings);
    useProxy(fonts);
    var navigation2 = NavigationNative.useNavigation();
    return /* @__PURE__ */ jsx(AddonPage, {
      title: Strings.FONTS,
      searchKeywords: [
        "name",
        "description"
      ],
      fetchFunction: installFont,
      items: fonts,
      safeModeMessage: Strings.SAFE_MODE_NOTICE_FONTS,
      card: FontCard,
      onFABPress: function() {
        navigation2.push("VendettaCustomPage", {
          title: "Import Font",
          render: function() {
            return /* @__PURE__ */ jsx(FontEditor, {});
          }
        });
      }
    });
  }
  var init_Fonts = __esm({
    "src/core/ui/settings/pages/Fonts/index.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_i18n();
      init_AddonPage();
      init_FontEditor();
      init_settings();
      init_storage();
      init_fonts();
      init_common();
      init_FontCard();
    }
  });

  // src/core/ui/hooks/useFS.ts
  function useFileExists(path, prefix) {
    var [state, setState] = (0, import_react5.useState)(2);
    var check = function() {
      return fileExists(path, prefix).then(function(exists) {
        return setState(exists ? 1 : 0);
      }).catch(function() {
        return setState(3);
      });
    };
    var customFS = (0, import_react5.useMemo)(function() {
      return new Proxy(fs_exports, {
        get(target, p, receiver) {
          var val = Reflect.get(target, p, receiver);
          if (typeof val !== "function")
            return;
          return function(...args) {
            var promise = (check(), val(...args));
            if (promise?.constructor?.name === "Promise") {
              setState(2);
              promise.finally(check);
            }
            return promise;
          };
        }
      });
    }, []);
    (0, import_react5.useEffect)(function() {
      return void check();
    }, []);
    return [
      state,
      customFS
    ];
  }
  var import_react5, CheckState;
  var init_useFS = __esm({
    "src/core/ui/hooks/useFS.ts"() {
      "use strict";
      init_fs();
      import_react5 = __toESM(require_react());
      (function(CheckState2) {
        CheckState2[CheckState2["FALSE"] = 0] = "FALSE";
        CheckState2[CheckState2["TRUE"] = 1] = "TRUE";
        CheckState2[CheckState2["LOADING"] = 2] = "LOADING";
        CheckState2[CheckState2["ERROR"] = 3] = "ERROR";
      })(CheckState || (CheckState = {}));
    }
  });

  // src/core/ui/settings/pages/Developer/AssetDisplay.tsx
  function AssetDisplay({ asset }) {
    return /* @__PURE__ */ jsx(LegacyFormRow, {
      label: `${asset.name} - ${asset.id}`,
      trailing: /* @__PURE__ */ jsx(import_react_native18.Image, {
        source: asset.id,
        style: {
          width: 32,
          height: 32
        }
      }),
      onPress: function() {
        clipboard.setString(asset.name);
        showToast.showCopyToClipboard();
      }
    });
  }
  var import_react_native18;
  var init_AssetDisplay = __esm({
    "src/core/ui/settings/pages/Developer/AssetDisplay.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_common();
      init_components();
      init_toasts();
      import_react_native18 = __toESM(require_react_native());
    }
  });

  // src/core/ui/settings/pages/Developer/AssetBrowser.tsx
  function AssetBrowser() {
    var [search, setSearch] = React.useState("");
    return /* @__PURE__ */ jsx(ErrorBoundary, {
      children: /* @__PURE__ */ jsxs(import_react_native19.View, {
        style: {
          flex: 1
        },
        children: [
          /* @__PURE__ */ jsx(Search_default, {
            style: {
              margin: 10
            },
            onChangeText: function(v) {
              return setSearch(v);
            }
          }),
          /* @__PURE__ */ jsx(import_react_native19.FlatList, {
            data: Object.values(assetsMap).filter(function(a) {
              return a.name.includes(search) || a.id.toString() === search;
            }),
            renderItem: function({ item }) {
              return /* @__PURE__ */ jsx(AssetDisplay, {
                asset: item
              });
            },
            ItemSeparatorComponent: LegacyFormDivider,
            keyExtractor: function(item) {
              return item.name;
            }
          })
        ]
      })
    });
  }
  var import_react_native19;
  var init_AssetBrowser = __esm({
    "src/core/ui/settings/pages/Developer/AssetBrowser.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_AssetDisplay();
      init_assets();
      init_components();
      init_components2();
      import_react_native19 = __toESM(require_react_native());
    }
  });

  // src/core/ui/settings/pages/Developer/index.tsx
  var Developer_exports = {};
  __export(Developer_exports, {
    default: () => Developer
  });
  function Developer() {
    var [rdtFileExists, fs] = useFileExists("preloads/reactDevtools.js");
    var styles3 = useStyles3();
    var navigation2 = NavigationNative.useNavigation();
    useProxy(settings);
    useProxy(loaderConfig);
    return /* @__PURE__ */ jsx(ErrorBoundary, {
      children: /* @__PURE__ */ jsx(import_react_native20.ScrollView, {
        style: {
          flex: 1
        },
        contentContainerStyle: {
          paddingBottom: 38
        },
        children: /* @__PURE__ */ jsxs(Stack, {
          style: {
            paddingVertical: 24,
            paddingHorizontal: 12
          },
          spacing: 24,
          children: [
            /* @__PURE__ */ jsx(TextInput, {
              label: Strings.DEBUGGER_URL,
              placeholder: "127.0.0.1:9090",
              size: "md",
              leadingIcon: function() {
                return /* @__PURE__ */ jsx(LegacyFormText, {
                  style: styles3.leadingText,
                  children: "ws://"
                });
              },
              defaultValue: settings.debuggerUrl,
              onChange: function(v) {
                return settings.debuggerUrl = v;
              }
            }),
            /* @__PURE__ */ jsxs(TableRowGroup, {
              title: Strings.DEBUG,
              children: [
                /* @__PURE__ */ jsx(TableRow, {
                  label: Strings.CONNECT_TO_DEBUG_WEBSOCKET,
                  icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                    source: findAssetId("copy")
                  }),
                  onPress: function() {
                    return connectToDebugger(settings.debuggerUrl);
                  }
                }),
                isReactDevToolsPreloaded() && /* @__PURE__ */ jsx(Fragment, {
                  children: /* @__PURE__ */ jsx(TableRow, {
                    label: Strings.CONNECT_TO_REACT_DEVTOOLS,
                    icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                      source: findAssetId("ic_badge_staff")
                    }),
                    onPress: function() {
                      return window[getReactDevToolsProp() || "__vendetta_rdc"]?.connectToDevTools({
                        host: settings.debuggerUrl.split(":")?.[0],
                        resolveRNStyle: import_react_native20.StyleSheet.flatten
                      });
                    }
                  })
                })
              ]
            }),
            isLoaderConfigSupported() && /* @__PURE__ */ jsx(Fragment, {
              children: /* @__PURE__ */ jsxs(TableRowGroup, {
                title: "Loader config",
                children: [
                  /* @__PURE__ */ jsx(TableSwitchRow, {
                    label: Strings.LOAD_FROM_CUSTOM_URL,
                    subLabel: Strings.LOAD_FROM_CUSTOM_URL_DEC,
                    icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                      source: findAssetId("copy")
                    }),
                    value: loaderConfig.customLoadUrl.enabled,
                    onValueChange: function(v) {
                      loaderConfig.customLoadUrl.enabled = v;
                    }
                  }),
                  loaderConfig.customLoadUrl.enabled && /* @__PURE__ */ jsx(TableRow, {
                    label: /* @__PURE__ */ jsx(TextInput, {
                      defaultValue: loaderConfig.customLoadUrl.url,
                      size: "md",
                      onChange: function(v) {
                        return loaderConfig.customLoadUrl.url = v;
                      },
                      placeholder: "http://localhost:4040/vendetta.js",
                      label: Strings.BUNNY_URL
                    })
                  }),
                  isReactDevToolsPreloaded() && isVendettaLoader() && /* @__PURE__ */ jsx(TableSwitchRow, {
                    label: Strings.LOAD_REACT_DEVTOOLS,
                    subLabel: `${Strings.VERSION}: ${getReactDevToolsVersion()}`,
                    icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                      source: findAssetId("ic_badge_staff")
                    }),
                    value: loaderConfig.loadReactDevTools,
                    onValueChange: function(v) {
                      loaderConfig.loadReactDevTools = v;
                    }
                  })
                ]
              })
            }),
            /* @__PURE__ */ jsxs(TableRowGroup, {
              title: "Other",
              children: [
                /* @__PURE__ */ jsx(TableRow, {
                  arrow: true,
                  label: Strings.ASSET_BROWSER,
                  icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                    source: findAssetId("ic_image")
                  }),
                  trailing: TableRow.Arrow,
                  onPress: function() {
                    return navigation2.push("VendettaCustomPage", {
                      title: Strings.ASSET_BROWSER,
                      render: AssetBrowser
                    });
                  }
                }),
                /* @__PURE__ */ jsx(TableRow, {
                  arrow: true,
                  label: Strings.ERROR_BOUNDARY_TOOLS_LABEL,
                  icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                    source: findAssetId("ic_warning_24px")
                  }),
                  onPress: function() {
                    return showSimpleActionSheet2({
                      key: "ErrorBoundaryTools",
                      header: {
                        title: "Which ErrorBoundary do you want to trip?",
                        icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                          style: {
                            marginRight: 8
                          },
                          source: findAssetId("ic_warning_24px")
                        }),
                        onClose: function() {
                          return hideActionSheet2();
                        }
                      },
                      options: [
                        // @ts-expect-error
                        // Of course, to trigger an error, we need to do something incorrectly. The below will do!
                        {
                          label: Strings.BUNNY,
                          onPress: function() {
                            return navigation2.push("VendettaCustomPage", {
                              render: function() {
                                return /* @__PURE__ */ jsx("undefined", {});
                              }
                            });
                          }
                        },
                        {
                          label: "Discord",
                          isDestructive: true,
                          onPress: function() {
                            return navigation2.push("VendettaCustomPage", {
                              noErrorBoundary: true
                            });
                          }
                        }
                      ]
                    });
                  }
                }),
                /* @__PURE__ */ jsx(TableRow, {
                  label: Strings.INSTALL_REACT_DEVTOOLS,
                  subLabel: Strings.RESTART_REQUIRED_TO_TAKE_EFFECT,
                  icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                    source: findAssetId("DownloadIcon")
                  }),
                  trailing: /* @__PURE__ */ jsx(Button, {
                    size: "sm",
                    loading: rdtFileExists === CheckState.LOADING,
                    disabled: rdtFileExists === CheckState.LOADING,
                    variant: rdtFileExists === CheckState.TRUE ? "secondary" : "primary",
                    text: rdtFileExists === CheckState.TRUE ? Strings.UNINSTALL : Strings.INSTALL,
                    onPress: async function() {
                      if (rdtFileExists === CheckState.FALSE) {
                        fs.downloadFile(RDT_EMBED_LINK, "preloads/reactDevtools.js");
                      } else if (rdtFileExists === CheckState.TRUE) {
                        fs.removeFile("preloads/reactDevtools.js");
                      }
                    },
                    icon: findAssetId(rdtFileExists === CheckState.TRUE ? "ic_message_delete" : "DownloadIcon"),
                    style: {
                      marginLeft: 8
                    }
                  })
                }),
                /* @__PURE__ */ jsx(TableSwitchRow, {
                  label: Strings.ENABLE_EVAL_COMMAND,
                  subLabel: Strings.ENABLE_EVAL_COMMAND_DESC,
                  icon: /* @__PURE__ */ jsx(TableRow.Icon, {
                    source: findAssetId("PencilIcon")
                  }),
                  value: settings.enableEvalCommand,
                  onValueChange: function(v) {
                    settings.enableEvalCommand = v;
                  }
                })
              ]
            })
          ]
        })
      })
    });
  }
  var import_react_native20, hideActionSheet2, showSimpleActionSheet2, RDT_EMBED_LINK, useStyles3;
  var init_Developer = __esm({
    "src/core/ui/settings/pages/Developer/index.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_i18n();
      init_useFS();
      init_AssetBrowser();
      init_assets();
      init_debug();
      init_loader();
      init_settings();
      init_storage();
      init_lazy();
      init_common();
      init_components();
      init_wrappers();
      init_color();
      init_components2();
      init_styles();
      import_react_native20 = __toESM(require_react_native());
      ({ hideActionSheet: hideActionSheet2 } = lazyDestructure(function() {
        return findByProps("openLazy", "hideActionSheet");
      }));
      ({ showSimpleActionSheet: showSimpleActionSheet2 } = lazyDestructure(function() {
        return findByProps("showSimpleActionSheet");
      }));
      RDT_EMBED_LINK = "https://raw.githubusercontent.com/amsyarasyiq/rdt-embedder/main/dist.js";
      useStyles3 = createStyles({
        leadingText: {
          ...TextStyleSheet["heading-md/semibold"],
          color: semanticColors.TEXT_MUTED,
          marginRight: -4
        }
      });
    }
  });

  // src/core/ui/settings/index.ts
  function initSettings() {
    registerSection({
      name: "Bunny",
      items: [
        {
          key: "BUNNY",
          title: function() {
            return Strings.BUNNY;
          },
          icon: {
            uri: pyoncord_default
          },
          render: function() {
            return Promise.resolve().then(() => (init_General(), General_exports));
          },
          rawTabsConfig: {
            useTrailing: function() {
              return `(${"ba70fc4-dev"})`;
            }
          }
        },
        {
          key: "BUNNY_PLUGINS",
          title: function() {
            return Strings.PLUGINS;
          },
          icon: findAssetId("ActivitiesIcon"),
          render: function() {
            return Promise.resolve().then(() => (init_Plugins(), Plugins_exports));
          }
        },
        {
          key: "BUNNY_THEMES",
          title: function() {
            return Strings.THEMES;
          },
          icon: findAssetId("PaintPaletteIcon"),
          render: function() {
            return Promise.resolve().then(() => (init_Themes(), Themes_exports));
          },
          usePredicate: function() {
            return isThemeSupported();
          }
        },
        {
          key: "BUNNY_FONTS",
          title: function() {
            return Strings.FONTS;
          },
          icon: findAssetId("ic_add_text"),
          render: function() {
            return Promise.resolve().then(() => (init_Fonts(), Fonts_exports));
          },
          usePredicate: function() {
            return isFontSupported();
          }
        },
        {
          key: "BUNNY_DEVELOPER",
          title: function() {
            return Strings.DEVELOPER;
          },
          icon: findAssetId("WrenchIcon"),
          render: function() {
            return Promise.resolve().then(() => (init_Developer(), Developer_exports));
          },
          usePredicate: function() {
            return useProxy(settings).developerSettings ?? false;
          }
        }
      ]
    });
    registerSection({
      name: "Vendetta",
      items: []
    });
  }
  var init_settings3 = __esm({
    "src/core/ui/settings/index.ts"() {
      "use strict";
      init_pyoncord();
      init_i18n();
      init_assets();
      init_loader();
      init_settings();
      init_storage();
      init_settings2();
    }
  });

  // src/lib/api/commands/types.ts
  var ApplicationCommandInputType, ApplicationCommandOptionType, ApplicationCommandType;
  var init_types2 = __esm({
    "src/lib/api/commands/types.ts"() {
      "use strict";
      (function(ApplicationCommandInputType2) {
        ApplicationCommandInputType2[ApplicationCommandInputType2["BUILT_IN"] = 0] = "BUILT_IN";
        ApplicationCommandInputType2[ApplicationCommandInputType2["BUILT_IN_TEXT"] = 1] = "BUILT_IN_TEXT";
        ApplicationCommandInputType2[ApplicationCommandInputType2["BUILT_IN_INTEGRATION"] = 2] = "BUILT_IN_INTEGRATION";
        ApplicationCommandInputType2[ApplicationCommandInputType2["BOT"] = 3] = "BOT";
        ApplicationCommandInputType2[ApplicationCommandInputType2["PLACEHOLDER"] = 4] = "PLACEHOLDER";
      })(ApplicationCommandInputType || (ApplicationCommandInputType = {}));
      (function(ApplicationCommandOptionType2) {
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["SUB_COMMAND"] = 1] = "SUB_COMMAND";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["SUB_COMMAND_GROUP"] = 2] = "SUB_COMMAND_GROUP";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["STRING"] = 3] = "STRING";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["INTEGER"] = 4] = "INTEGER";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["BOOLEAN"] = 5] = "BOOLEAN";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["USER"] = 6] = "USER";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["CHANNEL"] = 7] = "CHANNEL";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["ROLE"] = 8] = "ROLE";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["MENTIONABLE"] = 9] = "MENTIONABLE";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["NUMBER"] = 10] = "NUMBER";
        ApplicationCommandOptionType2[ApplicationCommandOptionType2["ATTACHMENT"] = 11] = "ATTACHMENT";
      })(ApplicationCommandOptionType || (ApplicationCommandOptionType = {}));
      (function(ApplicationCommandType2) {
        ApplicationCommandType2[ApplicationCommandType2["CHAT"] = 1] = "CHAT";
        ApplicationCommandType2[ApplicationCommandType2["USER"] = 2] = "USER";
        ApplicationCommandType2[ApplicationCommandType2["MESSAGE"] = 3] = "MESSAGE";
      })(ApplicationCommandType || (ApplicationCommandType = {}));
    }
  });

  // src/core/commands/eval.ts
  var eval_exports = {};
  __export(eval_exports, {
    default: () => eval_default
  });
  function wrapInJSCodeblock(resString) {
    return "```js\n" + resString.replaceAll("`", "`" + ZERO_WIDTH_SPACE_CHARACTER) + "\n```";
  }
  function eval_default() {
    return {
      name: "eval",
      description: Strings.COMMAND_EVAL_DESC,
      shouldHide: function() {
        return settings.enableEvalCommand === true;
      },
      options: [
        {
          name: "code",
          type: ApplicationCommandOptionType.STRING,
          description: Strings.COMMAND_EVAL_OPT_CODE,
          required: true
        },
        {
          name: "async",
          type: ApplicationCommandOptionType.BOOLEAN,
          description: Strings.COMMAND_EVAL_OPT_ASYNC
        }
      ],
      async execute([code, async], ctx) {
        try {
          var res = util.inspect(async?.value ? await AsyncFunction(code.value)() : eval?.(code.value));
          var trimmedRes = res.length > 2e3 ? res.slice(0, 2e3) + "..." : res;
          messageUtil.sendBotMessage(ctx.channel.id, wrapInJSCodeblock(trimmedRes));
        } catch (err) {
          messageUtil.sendBotMessage(ctx.channel.id, wrapInJSCodeblock(err?.stack ?? err));
        }
      }
    };
  }
  var util, AsyncFunction, ZERO_WIDTH_SPACE_CHARACTER;
  var init_eval = __esm({
    "src/core/commands/eval.ts"() {
      "use strict";
      init_i18n();
      init_types2();
      init_settings();
      init_common();
      init_wrappers();
      util = findByPropsLazy("inspect");
      AsyncFunction = async function() {
        return void 0;
      }.constructor;
      ZERO_WIDTH_SPACE_CHARACTER = "\u200B";
    }
  });

  // src/core/commands/debug.ts
  var debug_exports2 = {};
  __export(debug_exports2, {
    default: () => debug_default
  });
  function debug_default() {
    return {
      name: "debug",
      description: Strings.COMMAND_DEBUG_DESC,
      options: [
        {
          name: "ephemeral",
          type: ApplicationCommandOptionType.BOOLEAN,
          description: Strings.COMMAND_DEBUG_OPT_EPHEMERALLY
        }
      ],
      execute([ephemeral], ctx) {
        var info = getDebugInfo();
        var content = [
          "**Bunny Debug Info**",
          `> Bunny: ${info.bunny.version} (${info.bunny.loader.name} ${info.bunny.loader.version})`,
          `> Discord: ${info.discord.version} (${info.discord.build})`,
          `> React: ${info.react.version} (RN ${info.react.nativeVersion})`,
          `> Hermes: ${info.hermes.version} (bcv${info.hermes.bytecodeVersion})`,
          `> System: ${info.os.name} ${info.os.version} ${info.os.sdk ? `(SDK ${info.os.sdk})` : ""}`.trimEnd(),
          `> Device: ${info.device.model} (${info.device.codename})`
        ].join("\n");
        if (ephemeral?.value) {
          messageUtil.sendBotMessage(ctx.channel.id, content);
        } else {
          messageUtil.sendMessage(ctx.channel.id, {
            content
          });
        }
      }
    };
  }
  var init_debug2 = __esm({
    "src/core/commands/debug.ts"() {
      "use strict";
      init_i18n();
      init_types2();
      init_debug();
      init_common();
    }
  });

  // src/core/commands/plugins.ts
  var plugins_exports = {};
  __export(plugins_exports, {
    default: () => plugins_default
  });
  function plugins_default() {
    return {
      name: "plugins",
      description: Strings.COMMAND_PLUGINS_DESC,
      options: [
        {
          name: "ephemeral",
          displayName: "ephemeral",
          type: ApplicationCommandOptionType.BOOLEAN,
          description: Strings.COMMAND_DEBUG_OPT_EPHEMERALLY
        }
      ],
      execute([ephemeral], ctx) {
        var plugins2 = Object.values(VdPluginManager.plugins).filter(Boolean);
        plugins2.sort(function(a, b) {
          return a.manifest.name.localeCompare(b.manifest.name);
        });
        var enabled2 = plugins2.filter(function(p) {
          return p.enabled;
        }).map(function(p) {
          return p.manifest.name;
        });
        var disabled = plugins2.filter(function(p) {
          return !p.enabled;
        }).map(function(p) {
          return p.manifest.name;
        });
        var content = [
          `**Installed Plugins (${plugins2.length}):**`,
          ...enabled2.length > 0 ? [
            `Enabled (${enabled2.length}):`,
            "> " + enabled2.join(", ")
          ] : [],
          ...disabled.length > 0 ? [
            `Disabled (${disabled.length}):`,
            "> " + disabled.join(", ")
          ] : []
        ].join("\n");
        if (ephemeral?.value) {
          messageUtil.sendBotMessage(ctx.channel.id, content);
        } else {
          messageUtil.sendMessage(ctx.channel.id, {
            content
          });
        }
      }
    };
  }
  var init_plugins2 = __esm({
    "src/core/commands/plugins.ts"() {
      "use strict";
      init_i18n();
      init_plugins();
      init_types2();
      init_common();
    }
  });

  // src/lib/api/commands/index.ts
  var commands_exports = {};
  __export(commands_exports, {
    patchCommands: () => patchCommands,
    registerCommand: () => registerCommand
  });
  function patchCommands() {
    var unpatch = after("getBuiltInCommands", commands, function([type], res) {
      return [
        ...res,
        ...commands2.filter(function(c) {
          return (type instanceof Array ? type.includes(c.type) : type === c.type) && c.__bunny?.shouldHide?.() !== false;
        })
      ];
    });
    [
      (init_eval(), __toCommonJS(eval_exports)),
      (init_debug2(), __toCommonJS(debug_exports2)),
      (init_plugins2(), __toCommonJS(plugins_exports))
    ].forEach(function(r) {
      return registerCommand(r.default());
    });
    return function() {
      commands2 = [];
      unpatch();
    };
  }
  function registerCommand(command) {
    var builtInCommands;
    try {
      builtInCommands = commands.getBuiltInCommands(ApplicationCommandType.CHAT, true, false);
    } catch (e) {
      builtInCommands = commands.getBuiltInCommands(Object.values(ApplicationCommandType), true, false);
    }
    builtInCommands.sort(function(a, b) {
      return parseInt(b.id) - parseInt(a.id);
    });
    var lastCommand = builtInCommands[builtInCommands.length - 1];
    command.id = (parseInt(lastCommand.id, 10) - 1).toString();
    command.__bunny = {
      shouldHide: command.shouldHide
    };
    command.applicationId ??= "-1";
    command.type ??= ApplicationCommandType.CHAT;
    command.inputType = ApplicationCommandInputType.BUILT_IN;
    command.displayName ??= command.name;
    command.displayDescription ??= command.description;
    if (command.options)
      for (var opt of command.options) {
        opt.displayName ??= opt.name;
        opt.displayDescription ??= opt.description;
      }
    instead("execute", command, function(args, orig) {
      Promise.resolve(orig.apply(command, args)).then(function(ret) {
        if (ret && typeof ret === "object") {
          messageUtil.sendMessage(args[1].channel.id, ret);
        }
      }).catch(function(err) {
        logger.error("Failed to execute command", err);
      });
    });
    commands2.push(command);
    return function() {
      return commands2 = commands2.filter(function({ id }) {
        return id !== command.id;
      });
    };
  }
  var commands2;
  var init_commands = __esm({
    "src/lib/api/commands/index.ts"() {
      "use strict";
      init_types2();
      init_patcher();
      init_logger();
      init_common();
      commands2 = [];
    }
  });

  // globals:lodash
  var require_lodash = __commonJS({
    "globals:lodash"(exports, module) {
      module.exports = require_depsModule()["lodash"];
    }
  });

  // globals:util
  var require_util = __commonJS({
    "globals:util"(exports, module) {
      module.exports = require_depsModule()["util"];
    }
  });

  // src/core/vendetta/api.tsx
  var import_react6, import_react_native21, initVendettaObject;
  var init_api = __esm({
    "src/core/vendetta/api.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_assets();
      init_commands();
      init_debug();
      init_loader();
      init_patcher();
      init_settings();
      init_storage();
      init_storage();
      init_themes();
      init_utils();
      init_cyrb64();
      init_logger();
      init_metro();
      init_common();
      init_components();
      init_components();
      init_alerts();
      init_color();
      init_components2();
      init_styles();
      init_toasts();
      init_dist();
      import_react6 = __toESM(require_react());
      import_react_native21 = __toESM(require_react_native());
      init_plugins();
      initVendettaObject = function() {
        var createStackBasedFilter = function(fn) {
          return function(filter) {
            return fn(factories_exports.createSimpleFilter(filter, cyrb64Hash(new Error().stack)));
          };
        };
        var api = window.vendetta = {
          patcher: {
            before: patcher_default.before,
            after: patcher_default.after,
            instead: patcher_default.instead
          },
          metro: {
            modules: window.modules,
            find: createStackBasedFilter(findExports),
            findAll: createStackBasedFilter(findAllExports),
            findByProps: function(...props) {
              if (props.length === 1 && props[0] === "KeyboardAwareScrollView") {
                props.push("listenToKeyboardEvents");
              }
              var ret = findByProps(...props);
              if (ret == null) {
                if (props.includes("ActionSheetTitleHeader")) {
                  var module = findByProps("ActionSheetRow");
                  return {
                    ...module,
                    ActionSheetTitleHeader: module.BottomSheetTitleHeader,
                    ActionSheetContentContainer: function({ children }) {
                      (0, import_react6.useEffect)(function() {
                        return console.warn("Discord has removed 'ActionSheetContentContainer', please move into something else. This has been temporarily replaced with View");
                      }, []);
                      return /* @__PURE__ */ (0, import_react6.createElement)(import_react_native21.View, null, children);
                    }
                  };
                }
              }
              return ret;
            },
            findByPropsAll: function(...props) {
              return findByPropsAll(...props);
            },
            findByName: function(name, defaultExp) {
              if (name === "create" && typeof defaultExp === "undefined") {
                return findByName("create", false).default;
              }
              return findByName(name, defaultExp ?? true);
            },
            findByNameAll: function(name, defaultExp = true) {
              return findByNameAll(name, defaultExp);
            },
            findByDisplayName: function(displayName, defaultExp = true) {
              return findByDisplayName(displayName, defaultExp);
            },
            findByDisplayNameAll: function(displayName, defaultExp = true) {
              return findByDisplayNameAll(displayName, defaultExp);
            },
            findByTypeName: function(typeName, defaultExp = true) {
              return findByTypeName(typeName, defaultExp);
            },
            findByTypeNameAll: function(typeName, defaultExp = true) {
              return findByTypeNameAll(typeName, defaultExp);
            },
            findByStoreName: function(name) {
              return findByStoreName(name);
            },
            common: {
              constants,
              channels,
              i18n,
              url,
              toasts,
              stylesheet: {
                createThemedStyleSheet
              },
              clipboard,
              assets,
              invites,
              commands,
              navigation,
              navigationStack,
              NavigationNative,
              Flux,
              FluxDispatcher,
              React: React2,
              ReactNative,
              moment: require_moment(),
              chroma: require_chroma_js(),
              lodash: require_lodash(),
              util: require_util()
            }
          },
          constants: {
            DISCORD_SERVER: "https://discord.gg/n9QQ4XhhJP",
            GITHUB: "https://github.com/vendetta-mod",
            PROXY_PREFIX: "https://vd-plugins.github.io/proxy",
            HTTP_REGEX: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
            HTTP_REGEX_MULTI: /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)/g,
            DISCORD_SERVER_ID: "1015931589865246730",
            PLUGINS_CHANNEL_ID: "1091880384561684561",
            THEMES_CHANNEL_ID: "1091880434939482202"
          },
          utils: {
            findInReactTree: function(tree, filter) {
              return findInReactTree(tree, filter);
            },
            findInTree: function(tree, filter, options) {
              return findInTree(tree, filter, options);
            },
            safeFetch: function(input, options, timeout) {
              return safeFetch(input, options, timeout);
            },
            unfreeze: function(obj) {
              return Object.isFrozen(obj) ? {
                ...obj
              } : obj;
            },
            without: function(object, ...keys) {
              return omit(object, keys);
            }
          },
          debug: {
            connectToDebugger: function(url2) {
              return connectToDebugger(url2);
            },
            getDebugInfo: function() {
              return getDebugInfo();
            }
          },
          ui: {
            components: {
              Forms,
              General: ReactNative,
              Alert: LegacyAlert,
              Button: CompatButton,
              HelpMessage: function(...props) {
                return /* @__PURE__ */ jsx(HelpMessage, {
                  ...props
                });
              },
              SafeAreaView: function(...props) {
                return /* @__PURE__ */ jsx(SafeAreaView, {
                  ...props
                });
              },
              Summary,
              ErrorBoundary,
              Codeblock,
              Search: Search_default
            },
            toasts: {
              showToast: function(content, asset) {
                return showToast(content, asset);
              }
            },
            alerts: {
              showConfirmationAlert: function(options) {
                return showConfirmationAlert(options);
              },
              showCustomAlert: function(component, props) {
                return showCustomAlert(component, props);
              },
              showInputAlert: function(options) {
                return showInputAlert(options);
              }
            },
            assets: {
              all: assetsMap,
              find: function(filter) {
                return findAsset(filter);
              },
              getAssetByName: function(name) {
                return findAsset(name);
              },
              getAssetByID: function(id) {
                return findAsset(id);
              },
              getAssetIDByName: function(name) {
                return findAssetId(name);
              }
            },
            semanticColors,
            rawColors
          },
          plugins: {
            plugins: VdPluginManager.plugins,
            fetchPlugin: function(source) {
              return VdPluginManager.fetchPlugin(source);
            },
            installPlugin: function(source, enabled2 = true) {
              return VdPluginManager.installPlugin(source, enabled2);
            },
            startPlugin: function(id) {
              return VdPluginManager.startPlugin(id);
            },
            stopPlugin: function(id, disable = true) {
              return VdPluginManager.stopPlugin(id, disable);
            },
            removePlugin: function(id) {
              return VdPluginManager.removePlugin(id);
            },
            getSettings: function(id) {
              return VdPluginManager.getSettings(id);
            }
          },
          themes: {
            themes,
            fetchTheme: function(id, selected) {
              return fetchTheme(id, selected);
            },
            installTheme: function(id) {
              return installTheme(id);
            },
            selectTheme: function(id) {
              return selectTheme(id === "default" ? null : themes[id]);
            },
            removeTheme: function(id) {
              return removeTheme(id);
            },
            getCurrentTheme: function() {
              return getThemeFromLoader();
            },
            updateThemes: function() {
              return updateThemes();
            }
          },
          commands: {
            registerCommand
          },
          storage: {
            createProxy: function(target) {
              return createProxy(target);
            },
            useProxy: function(_storage) {
              return useProxy(_storage);
            },
            createStorage: function(backend) {
              return createStorage(backend);
            },
            wrapSync: function(store) {
              return wrapSync(store);
            },
            awaitSyncWrapper: function(store) {
              return awaitStorage(store);
            },
            createMMKVBackend: function(store) {
              return createMMKVBackend(store);
            },
            createFileBackend: function(file) {
              if (isPyonLoader() && file === "vendetta_theme.json") {
                file = "pyoncord/current-theme.json";
              }
              return createFileBackend(file);
            }
          },
          settings,
          loader: {
            identity: getVendettaLoaderIdentity() ?? void 0,
            config: loaderConfig
          },
          logger: {
            log: function(...message) {
              return console.log(...message);
            },
            info: function(...message) {
              return console.info(...message);
            },
            warn: function(...message) {
              return console.warn(...message);
            },
            error: function(...message) {
              return console.error(...message);
            },
            time: function(...message) {
              return console.time(...message);
            },
            trace: function(...message) {
              return console.trace(...message);
            },
            verbose: function(...message) {
              return console.log(...message);
            }
          },
          version: versionHash,
          unload: function() {
            delete window.vendetta;
          }
        };
        return function() {
          return api.unload();
        };
      };
    }
  });

  // src/lib/api/flux/index.ts
  var flux_exports = {};
  __export(flux_exports, {
    dispatcher: () => dispatcher,
    injectFluxInterceptor: () => injectFluxInterceptor,
    intercept: () => intercept
  });
  function injectFluxInterceptor() {
    var cb = function(payload) {
      for (var intercept2 of intercepts) {
        var res = intercept2(payload);
        if (res == null) {
          continue;
        } else if (!res) {
          payload[blockedSym] = true;
        } else if (typeof res === "object") {
          Object.assign(payload, res);
          payload[modifiedSym] = true;
        }
      }
      return blockedSym in payload;
    };
    (dispatcher._interceptors ??= []).unshift(cb);
    return function() {
      return dispatcher._interceptors &&= dispatcher._interceptors.filter(function(v) {
        return v !== cb;
      });
    };
  }
  function intercept(cb) {
    intercepts.push(cb);
    return function() {
      intercepts = intercepts.filter(function(i) {
        return i !== cb;
      });
    };
  }
  var blockedSym, modifiedSym, dispatcher, intercepts;
  var init_flux = __esm({
    "src/lib/api/flux/index.ts"() {
      "use strict";
      init_common();
      blockedSym = Symbol.for("bunny.flux.blocked");
      modifiedSym = Symbol.for("bunny.flux.modified");
      dispatcher = FluxDispatcher;
      intercepts = [];
    }
  });

  // src/core/plugins/vd-quick-install/forumPost.tsx
  function useExtractThreadContent(thread, _firstMessage = null, actionSheet3 = false) {
    if (thread.guild_id !== DISCORD_SERVER_ID)
      return;
    var postType;
    if (thread.parent_id === PLUGINS_CHANNEL_ID) {
      postType = "Plugin";
    } else if (thread.parent_id === THEMES_CHANNEL_ID && isThemeSupported()) {
      postType = "Theme";
    } else
      return;
    var { firstMessage } = actionSheet3 ? useFirstForumPostMessage(thread) : {
      firstMessage: _firstMessage
    };
    var urls = firstMessage?.content?.match(HTTP_REGEX_MULTI)?.filter(postMap[postType].urlsFilter);
    if (!urls || !urls[0])
      return;
    if (postType === "Plugin" && !urls[0].endsWith("/"))
      urls[0] += "/";
    return [
      postType,
      urls[0]
    ];
  }
  function useInstaller(thread, firstMessage = null, actionSheet3 = false) {
    var [postType, url2] = useExtractThreadContent(thread, firstMessage, actionSheet3) ?? [];
    useProxy(VdPluginManager.plugins);
    useProxy(themes);
    var [isInstalling, setIsInstalling] = React.useState(false);
    if (!postType || !url2)
      return [
        true
      ];
    var isInstalled = Boolean(postMap[postType].storage[url2]);
    var installOrRemove = async function() {
      setIsInstalling(true);
      try {
        await postMap[postType].installOrRemove(url2);
      } catch (e) {
        showToast(e.message, findAssetId("Small"));
      } finally {
        setIsInstalling(false);
      }
    };
    return [
      false,
      postType,
      isInstalled,
      isInstalling,
      installOrRemove
    ];
  }
  function forumPost_default() {
    var patches2 = [
      // actionSheetPatch(),
      installButtonPatch()
    ];
    return function() {
      return patches2.map(function(p) {
        return p();
      });
    };
  }
  var useFirstForumPostMessage, forumReactions, postMap, installButtonPatch;
  var init_forumPost = __esm({
    "src/core/plugins/vd-quick-install/forumPost.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_i18n();
      init_plugins();
      init_assets();
      init_loader();
      init_patcher();
      init_storage();
      init_themes();
      init_constants();
      init_lazy();
      init_components();
      init_wrappers();
      init_components2();
      init_toasts();
      ({ useFirstForumPostMessage } = lazyDestructure(function() {
        return findByProps("useFirstForumPostMessage");
      }));
      forumReactions = findByPropsLazy("MostCommonForumPostReaction");
      postMap = {
        Plugin: {
          storage: VdPluginManager.plugins,
          urlsFilter: function(url2) {
            return url2.startsWith(VD_PROXY_PREFIX);
          },
          installOrRemove: function(url2) {
            var isInstalled = postMap.Plugin.storage[url2];
            return isInstalled ? VdPluginManager.removePlugin(url2) : VdPluginManager.installPlugin(url2);
          }
        },
        Theme: {
          storage: themes,
          urlsFilter: function(url2) {
            return url2.endsWith(".json");
          },
          installOrRemove: function(url2) {
            var isInstalled = postMap.Theme.storage[url2];
            return isInstalled ? removeTheme(url2) : installTheme(url2);
          }
        }
      };
      installButtonPatch = function() {
        return after("MostCommonForumPostReaction", forumReactions, function([{ thread, firstMessage }], res) {
          var [shouldReturn, _, installed, loading, installOrRemove] = useInstaller(thread, firstMessage, true);
          if (shouldReturn)
            return;
          return /* @__PURE__ */ jsxs(Fragment, {
            children: [
              res,
              /* @__PURE__ */ jsx(ErrorBoundary, {
                children: /* @__PURE__ */ jsx(Button, {
                  size: "sm",
                  loading,
                  disabled: loading,
                  // variant={installed ? "destructive" : "primary"} crashes older version because "destructive" was renamed from "danger" and there's no sane way for compat check horror
                  variant: installed ? "secondary" : "primary",
                  text: installed ? Strings.UNINSTALL : Strings.INSTALL,
                  onPress: installOrRemove,
                  icon: findAssetId(installed ? "ic_message_delete" : "DownloadIcon"),
                  style: {
                    marginLeft: 8
                  }
                })
              })
            ]
          });
        });
      };
    }
  });

  // src/core/plugins/vd-quick-install/url.tsx
  function typeFromUrl(url2) {
    if (url2.startsWith(VD_PROXY_PREFIX)) {
      return "plugin";
    } else if (url2.endsWith(".json") && isThemeSupported()) {
      return "theme";
    }
  }
  function installWithToast(type, url2) {
    (type === "plugin" ? VdPluginManager.installPlugin.bind(VdPluginManager) : installTheme)(url2).then(function() {
      showToast(Strings.SUCCESSFULLY_INSTALLED, findAssetId("Check"));
    }).catch(function(e) {
      showToast(e.message, findAssetId("Small"));
    });
  }
  function url_default() {
    var patches2 = new Array();
    patches2.push(after("showSimpleActionSheet", showSimpleActionSheet3, function(args) {
      if (args[0].key !== "LongPressUrl")
        return;
      var { header: { title: url2 }, options } = args[0];
      var urlType = typeFromUrl(url2);
      if (!urlType)
        return;
      options.push({
        label: Strings.INSTALL_ADDON,
        onPress: function() {
          return installWithToast(urlType, url2);
        }
      });
    }));
    patches2.push(instead("handleClick", handleClick, async function(args, orig) {
      var { href: url2 } = args[0];
      var urlType = typeFromUrl(url2);
      if (!urlType)
        return orig.apply(this, args);
      if (urlType === "theme" && getChannel(getChannelId())?.parent_id !== THEMES_CHANNEL_ID)
        return orig.apply(this, args);
      showConfirmationAlert({
        title: Strings.HOLD_UP,
        content: formatString("CONFIRMATION_LINK_IS_A_TYPE", {
          urlType
        }),
        onConfirm: function() {
          return installWithToast(urlType, url2);
        },
        confirmText: Strings.INSTALL,
        cancelText: Strings.CANCEL,
        secondaryConfirmText: Strings.OPEN_IN_BROWSER,
        onConfirmSecondary: function() {
          return openURL(url2);
        }
      });
    }));
    return function() {
      return patches2.forEach(function(p) {
        return p();
      });
    };
  }
  var showSimpleActionSheet3, handleClick, openURL, getChannelId, getChannel;
  var init_url = __esm({
    "src/core/plugins/vd-quick-install/url.tsx"() {
      "use strict";
      init_i18n();
      init_plugins();
      init_assets();
      init_loader();
      init_patcher();
      init_themes();
      init_constants();
      init_lazy();
      init_common();
      init_filters();
      init_finders();
      init_wrappers();
      init_alerts();
      init_toasts();
      showSimpleActionSheet3 = findExports(byMutableProp("showSimpleActionSheet"));
      handleClick = findByPropsLazy("handleClick");
      ({ openURL } = lazyDestructure(function() {
        return url;
      }));
      ({ getChannelId } = lazyDestructure(function() {
        return channels;
      }));
      ({ getChannel } = lazyDestructure(function() {
        return findByProps("getChannel");
      }));
    }
  });

  // src/core/plugins/vd-quick-install/index.ts
  var vd_quick_install_exports = {};
  __export(vd_quick_install_exports, {
    default: () => vd_quick_install_default
  });
  var patches, vd_quick_install_default;
  var init_vd_quick_install = __esm({
    "src/core/plugins/vd-quick-install/index.ts"() {
      "use strict";
      init_plugins3();
      init_forumPost();
      init_url();
      patches = [];
      vd_quick_install_default = defineCorePlugin({
        manifest: {
          id: "bunny.quick.install",
          name: "QuickInstall",
          version: "1.0.0",
          description: "Quickly install Vendetta plugins and themes",
          authors: [
            {
              name: "pylixonly"
            }
          ]
        },
        start() {
          patches = [
            forumPost_default(),
            url_default()
          ];
        },
        stop() {
          patches.forEach(function(p) {
            return p();
          });
        }
      });
    }
  });

  // src/core/plugins/index.ts
  function defineCorePlugin(instance) {
    instance[Symbol.for("bunny.core.plugin")] = true;
    return instance;
  }
  var getCorePlugins;
  var init_plugins3 = __esm({
    "src/core/plugins/index.ts"() {
      "use strict";
      getCorePlugins = function() {
        return {
          "vd-quick-install": (init_vd_quick_install(), __toCommonJS(vd_quick_install_exports))
        };
      };
    }
  });

  // src/lib/api/storage/new.ts
  function createFileBackend2(filePath) {
    return {
      get: async function() {
        try {
          return JSON.parse(await readFile(filePath));
        } catch (e) {
          throw new Error(`Failed to parse storage '${filePath}: ${e}'`);
        }
      },
      set: async function(data) {
        if (!data || typeof data !== "object")
          throw new Error("data needs to be an object");
        await writeFile(filePath, JSON.stringify(data));
      },
      exists: async function() {
        return await fileExists(filePath);
      }
    };
  }
  function _createProxy(target, path, emitter) {
    var objChildrens = /* @__PURE__ */ new WeakMap();
    return new Proxy(target, {
      get(target2, prop) {
        if (prop === emitterSymbol2)
          return emitter;
        var newPath = [
          ...path,
          prop
        ];
        var value = target2[prop];
        if (value && typeof value === "object") {
          var origValue = value;
          value = objChildrens.get(origValue);
          if (!value) {
            value = _createProxy(origValue, newPath, emitter);
            objChildrens.set(origValue, value);
          }
        }
        if (value != null) {
          emitter.emit("GET", {
            path: newPath,
            value
          });
        }
        return value;
      },
      set(target2, prop, value) {
        target2[prop] = value;
        emitter.emit("SET", {
          path: [
            ...path,
            prop
          ],
          value
        });
        return true;
      },
      deleteProperty(target2, prop) {
        var success = delete target2[prop];
        if (success)
          emitter.emit("DEL", {
            path: [
              ...path,
              prop
            ]
          });
        return success;
      }
    });
  }
  function createProxy2(target = {}) {
    var emitter = new Emitter();
    return {
      proxy: _createProxy(target, [], emitter),
      emitter
    };
  }
  async function updateStorageAsync(path, value) {
    _loadedPath[path] = value;
    await createFileBackend2(path).set(value);
  }
  function createStorageAndCallback(path, dflt = {}, cb) {
    var callback = function(data) {
      var { proxy, emitter } = createProxy2(data);
      var handler = function() {
        return backend.set(proxy);
      };
      emitter.on("SET", handler);
      emitter.on("DEL", handler);
      cb(proxy);
    };
    var backend = createFileBackend2(path);
    if (_loadedPath[path])
      callback(_loadedPath[path]);
    else {
      backend.exists().then(async function(exists) {
        if (!exists) {
          await backend.set(dflt);
          callback(dflt);
        } else {
          callback(await backend.get());
        }
      });
    }
  }
  async function preloadStorageIfExists(path) {
    if (_loadedPath[path])
      return;
    if (!await fileExists(path))
      return;
    try {
      var data = await createFileBackend2(path).get();
      invariant(data !== void 0);
      _loadedPath[path] = data;
    } catch (e) {
    }
  }
  function awaitStorage2(...proxies) {
    return Promise.all(proxies.map(function(proxy) {
      return proxy[storagePromiseSymbol];
    }));
  }
  var emitterSymbol2, storageInitErrorSymbol, storagePromiseSymbol, _loadedPath, createStorage2;
  var init_new = __esm({
    "src/lib/api/storage/new.ts"() {
      "use strict";
      init_fs();
      init_Emitter();
      init_invariant();
      emitterSymbol2 = Symbol.for("bunny.storage.emitter");
      storageInitErrorSymbol = Symbol.for("bunny.storage.initError");
      storagePromiseSymbol = Symbol.for("bunny.storage.promise");
      _loadedPath = {};
      createStorage2 = function(path, dflt = {}) {
        var promise = new Promise(function(r) {
          return resolvePromise = r;
        });
        var awaited, error, resolvePromise;
        createStorageAndCallback(path, dflt, function(proxy) {
          awaited = proxy;
          resolvePromise();
        });
        var check = function() {
          if (awaited)
            return true;
          throw new Error("Attempted to access storage without initializing");
        };
        return new Proxy({}, {
          ...Object.fromEntries(Object.getOwnPropertyNames(Reflect).map(function(k) {
            return [
              k,
              function(t, ...a) {
                return check() && Reflect[k](awaited, ...a);
              }
            ];
          })),
          get(target, prop, recv) {
            if (prop === storageInitErrorSymbol)
              return error;
            if (prop === storagePromiseSymbol)
              return promise;
            return check() && Reflect.get(awaited ?? target, prop, recv);
          }
        });
      };
    }
  });

  // src/lib/api/native/index.ts
  var native_exports = {};
  __export(native_exports, {
    fs: () => fs_exports,
    loader: () => loader_exports,
    modules: () => modules_exports
  });
  var init_native = __esm({
    "src/lib/api/native/index.ts"() {
      "use strict";
      init_fs();
      init_loader();
      init_modules();
    }
  });

  // src/lib/api/index.ts
  var api_exports = {};
  __export(api_exports, {
    assets: () => assets_exports,
    commands: () => commands_exports,
    debug: () => debug_exports,
    flux: () => flux_exports,
    native: () => native_exports,
    patcher: () => patcher_exports,
    settings: () => settings_exports,
    storage: () => storage_exports
  });
  var init_api2 = __esm({
    "src/lib/api/index.ts"() {
      "use strict";
      init_assets();
      init_commands();
      init_debug();
      init_flux();
      init_native();
      init_patcher();
      init_settings();
      init_storage();
    }
  });

  // src/lib/plugins/api.ts
  function shimDisposableFn(unpatches, f) {
    return function(...props) {
      var up = f(...props);
      unpatches.push(up);
      return up;
    };
  }
  function createBunnyPluginAPI(id) {
    var disposers = new Array();
    var object = {
      ...window.bunny,
      api: {
        ...window.bunny.api,
        patcher: {
          before: shimDisposableFn(disposers, patcher_exports.before),
          after: shimDisposableFn(disposers, patcher_exports.after),
          instead: shimDisposableFn(disposers, patcher_exports.instead)
        },
        commands: {
          ...window.bunny.api.commands,
          registerCommand: shimDisposableFn(disposers, registerCommand)
        },
        flux: {
          ...window.bunny.api.flux,
          intercept: shimDisposableFn(disposers, window.bunny.api.flux.intercept)
        }
      },
      // Added something in here? Make sure to also update BunnyPluginProperty in ./types
      plugin: {
        createStorage: function() {
          return createStorage2(`plugins/storage/${id}.json`);
        },
        manifest: registeredPlugins.get(id),
        logger
      }
    };
    return {
      object,
      disposers
    };
  }
  var init_api3 = __esm({
    "src/lib/plugins/api.ts"() {
      "use strict";
      init_api2();
      init_commands();
      init_new();
      init_logger();
      init_plugins4();
    }
  });

  // src/lib/plugins/index.ts
  var plugins_exports2 = {};
  __export(plugins_exports2, {
    apiObjects: () => apiObjects,
    checkAndRegisterUpdates: () => checkAndRegisterUpdates,
    corePluginInstances: () => corePluginInstances,
    deleteRepository: () => deleteRepository,
    disablePlugin: () => disablePlugin,
    enablePlugin: () => enablePlugin,
    getId: () => getId,
    getPluginSettingsComponent: () => getPluginSettingsComponent,
    initPlugins: () => initPlugins,
    installPlugin: () => installPlugin,
    isPluginEnabled: () => isPluginEnabled,
    isPluginInstalled: () => isPluginInstalled,
    pluginInstances: () => pluginInstances,
    pluginRepositories: () => pluginRepositories,
    pluginSettings: () => pluginSettings,
    refreshPlugin: () => refreshPlugin,
    registeredPlugins: () => registeredPlugins,
    startPlugin: () => startPlugin,
    stopPlugin: () => stopPlugin,
    uninstallPlugin: () => uninstallPlugin,
    updateAndWritePlugin: () => updateAndWritePlugin,
    updateRepository: () => updateRepository
  });
  function assert(condition, id, attempt) {
    if (!condition)
      throw new Error(`[${id}] Attempted to ${attempt}`);
  }
  function newerThan(v1, v2) {
    if (semver.gt(v1, v2))
      return true;
    var coerced = semver.coerce(v1);
    if (coerced == null)
      return false;
    return semver.prerelease(v1)?.includes("dev") && semver.eq(coerced, v2);
  }
  function isExternalPlugin(manifest) {
    return "parentRepository" in manifest;
  }
  function getId(manifest) {
    var id = manifestToId.get(manifest);
    assert(id, manifest?.name ?? "unknown", "getting ID from an unregistered/invalid manifest");
    return id;
  }
  function getPluginSettingsComponent(id) {
    var instance = pluginInstances.get(id);
    if (!instance)
      return null;
    if (instance.SettingsComponent)
      return instance.SettingsComponent;
    return null;
  }
  function isPluginInstalled(id) {
    return pluginSettings[id] != null;
  }
  function isPluginEnabled(id) {
    return Boolean(pluginSettings[id]?.enabled);
  }
  async function updateAndWritePlugin(repoUrl, id, fetchScript) {
    var manifest = await fetchJSON(repoUrl, `plugins/${id}/manifest.json`);
    manifest.parentRepository = repoUrl;
    if (fetchScript) {
      manifest.jsPath = `plugins/scripts/${id}.js`;
      var js = await fetchJS(repoUrl, `plugins/${id}/index.js`);
      await writeFile(manifest.jsPath, js);
    }
    await updateStorageAsync(`plugins/manifests/${id}.json`, manifest);
    if (registeredPlugins.has(id)) {
      var existingManifest = registeredPlugins.get(id);
      return Object.assign(existingManifest, manifest);
    }
    return manifest;
  }
  async function refreshPlugin(id, repoUrl) {
    var manifest = registeredPlugins.get(id);
    assert(manifest, id, "refresh a non-registered plugin");
    assert(pluginInstances.get(id), id, "refresh a non-started plugin");
    stopPlugin(id);
    if (isExternalPlugin(manifest)) {
      manifest = await updateAndWritePlugin(repoUrl ?? manifest.parentRepository, id, true);
    }
    registeredPlugins.delete(id);
    registeredPlugins.set(id, manifest);
    manifestToId.set(manifest, id);
    await startPlugin(id);
  }
  async function updateRepository(repoUrl) {
    var repo = await fetchJSON(repoUrl, "repo.json");
    var storedRepo = pluginRepositories[repoUrl];
    var updated = false;
    if (!storedRepo) {
      for (var id in repo) {
        if (corePluginInstances.has(id)) {
          throw new Error(`Plugins can't have the same ID as any of Bunny core plugin '${id}'`);
        }
      }
      updated = true;
      pluginRepositories[repoUrl] = repo;
    } else {
      for (var plugin in storedRepo)
        if (!repo[plugin]) {
          delete storedRepo[plugin];
        }
    }
    await Promise.all(Object.keys(repo).map(async function(plugin2) {
      if (!storedRepo || !storedRepo[plugin2] || repo[plugin2].alwaysFetch || newerThan(repo[plugin2].version, storedRepo[plugin2].version)) {
        updated = true;
        pluginRepositories[repoUrl][plugin2] = repo[plugin2];
        await updateAndWritePlugin(repoUrl, plugin2, Boolean(storedRepo && pluginSettings[plugin2]));
      } else {
        await preloadStorageIfExists(`plugins/manifests/${plugin2}.json`);
      }
    }));
    for (var id1 in repo) {
      var manifest = createStorage2(`plugins/manifests/${id1}.json`);
      var existing = registeredPlugins.get(id1);
      if (existing && !newerThan(manifest.version, existing.version)) {
        continue;
      }
      registeredPlugins.set(id1, manifest);
      manifestToId.set(manifest, id1);
    }
    return updated;
  }
  async function deleteRepository(repoUrl) {
    assert(pluginRepositories[repoUrl], repoUrl, "delete a non-registered repository");
    var promQueues = [];
    for (var [id, manifest] of registeredPlugins) {
      if (!isExternalPlugin(manifest) || manifest.parentRepository !== repoUrl)
        continue;
      if (isPluginInstalled(id)) {
        promQueues.push(uninstallPlugin(id));
      }
      registeredPlugins.delete(id);
    }
    delete pluginRepositories[repoUrl];
    await Promise.all(promQueues);
  }
  async function enablePlugin(id, start) {
    assert(isPluginInstalled(id), id, "enable a non-installed plugin");
    pluginSettings[id].enabled = true;
    if (start)
      await startPlugin(id);
  }
  function disablePlugin(id) {
    assert(isPluginInstalled(id), id, "disable a non-installed plugin");
    pluginInstances.has(id) && stopPlugin(id);
    pluginSettings[id].enabled = false;
  }
  async function installPlugin(id, start) {
    var manifest = registeredPlugins.get(id);
    assert(manifest, id, "install an non-registered plugin");
    assert(!isPluginInstalled(id), id, "install an already installed plugin");
    assert(isExternalPlugin(manifest), id, "install a core plugin");
    await updateAndWritePlugin(manifest.parentRepository, id, true);
    pluginSettings[id] = {
      enabled: true
    };
    if (start)
      startPlugin(id);
  }
  async function uninstallPlugin(id) {
    var manifest = registeredPlugins.get(id);
    assert(manifest, id, "uninstall an unregistered plugin");
    assert(isPluginInstalled(id), id, "uninstall a non-installed plugin");
    assert(isExternalPlugin(manifest), id, "uninstall a core plugin");
    pluginInstances.has(id) && stopPlugin(id);
    delete pluginSettings[id];
    await removeFile(`plugins/scripts/${id}.js`);
  }
  async function startPlugin(id) {
    var manifest = registeredPlugins.get(id);
    assert(manifest, id, "start a non-registered plugin");
    assert(isPluginInstalled(id), id, "start a non-installed plugin");
    assert(pluginSettings[id]?.enabled, id, "start a disabled plugin");
    assert(!pluginInstances.has(id), id, "start an already started plugin");
    await preloadStorageIfExists(`plugins/storage/${id}.json`);
    var pluginInstance2;
    if (isExternalPlugin(manifest)) {
      try {
        var iife = await readFile(manifest.jsPath);
        var instantiator = globalEvalWithSourceUrl(`(bunny,definePlugin)=>{${iife};return plugin?.default ?? plugin;}`, `bunny-plugin/${id}-${manifest.version}`);
      } catch (error) {
        throw new Error("An error occured while parsing plugin's code, possibly a syntax error?", {
          cause: error
        });
      }
      try {
        var api = createBunnyPluginAPI(id);
        pluginInstance2 = instantiator(api.object, function(p) {
          return Object.assign(p, {
            manifest
          });
        });
        if (!pluginInstance2)
          throw new Error(`Plugin '${id}' does not export a valid plugin instance`);
        apiObjects.set(id, api);
        pluginInstances.set(id, pluginInstance2);
      } catch (error) {
        throw new Error("An error occured while instantiating plugin's code", {
          cause: error
        });
      }
    } else {
      pluginInstance2 = corePluginInstances.get(id);
      assert(pluginInstance2, id, "start a non-existent core plugin");
      pluginInstances.set(id, pluginInstance2);
    }
    try {
      pluginInstance2.start?.();
    } catch (error) {
      throw new Error("An error occured while starting the plugin", {
        cause: error
      });
    }
  }
  function stopPlugin(id) {
    var instance = pluginInstances.get(id);
    assert(instance, id, "stop a non-started plugin");
    instance.stop?.();
    var obj = apiObjects.get(id);
    obj?.disposers.forEach(function(d) {
      return d();
    });
    pluginInstances.delete(id);
  }
  async function checkAndRegisterUpdates() {
    await awaitStorage2(pluginRepositories, pluginSettings);
    var corePlugins = getCorePlugins();
    for (var id in corePlugins) {
      var { default: instance, preenabled } = corePlugins[id];
      pluginSettings[id] ??= {
        enabled: preenabled ?? true
      };
      registeredPlugins.set(id, instance.manifest);
      manifestToId.set(instance.manifest, id);
      corePluginInstances.set(id, instance);
    }
    await Promise.allSettled(Object.keys(pluginRepositories).map(async function(repo) {
      await updateRepository(repo);
    }));
  }
  async function initPlugins() {
    await awaitStorage2(pluginRepositories, pluginSettings);
    await Promise.allSettled([
      ...registeredPlugins.keys()
    ].map(async function(id) {
      if (isPluginEnabled(id)) {
        await startPlugin(id);
      }
    }));
  }
  var corePluginInstances, registeredPlugins, pluginInstances, apiObjects, pluginRepositories, pluginSettings, manifestToId, _fetch, fetchJS, fetchJSON;
  var init_plugins4 = __esm({
    "src/lib/plugins/index.ts"() {
      "use strict";
      init_plugins3();
      init_fs();
      init_new();
      init_utils();
      init_common();
      init_api3();
      corePluginInstances = /* @__PURE__ */ new Map();
      registeredPlugins = /* @__PURE__ */ new Map();
      pluginInstances = /* @__PURE__ */ new Map();
      apiObjects = /* @__PURE__ */ new Map();
      pluginRepositories = createStorage2("plugins/repositories.json");
      pluginSettings = createStorage2("plugins/settings.json");
      manifestToId = /* @__PURE__ */ new WeakMap();
      _fetch = function(repoUrl, path) {
        return safeFetch(new URL(path, repoUrl), {
          cache: "no-store"
        });
      };
      fetchJS = function(repoUrl, path) {
        return _fetch(repoUrl, path).then(function(r) {
          return r.text();
        });
      };
      fetchJSON = function(repoUrl, path) {
        return _fetch(repoUrl, path).then(function(r) {
          return r.json();
        });
      };
    }
  });

  // src/lib/ui/safeMode.tsx
  function getErrorBoundaryContext() {
    var ctxt = findByNameLazy("ErrorBoundary")[_lazyContextSymbol];
    return new Promise(function(resolve) {
      ctxt.getExports(function(exp) {
        resolve(exp.prototype);
      });
    });
  }
  function safeMode_default() {
    return after.await("render", getErrorBoundaryContext(), function(_, ret) {
      var _this = this;
      if (!this.state.error)
        return;
      this.state.activeTab ??= "message";
      var tabData = tabs.find(function(t) {
        return t.id === _this.state.activeTab;
      });
      var errorText = this.state.error[this.state.activeTab];
      var buttons = [
        {
          text: Strings.RELOAD_DISCORD,
          onPress: this.handleReload
        },
        ...!settings.safeMode?.enabled ? [
          {
            text: Strings.RELOAD_IN_SAFE_MODE,
            onPress: toggleSafeMode
          }
        ] : [],
        {
          text: Strings.RETRY_RENDER,
          color: ButtonColors.RED,
          onPress: function() {
            return _this.setState({
              info: null,
              error: null
            });
          }
        }
      ];
      return /* @__PURE__ */ jsx(ErrorBoundary, {
        children: /* @__PURE__ */ jsxs(SafeAreaView, {
          style: styles2.container,
          children: [
            /* @__PURE__ */ jsxs(import_react_native22.View, {
              style: styles2.header,
              children: [
                /* @__PURE__ */ jsx(ret.props.Illustration, {
                  style: {
                    transform: [
                      {
                        scale: 0.6
                      }
                    ],
                    marginLeft: -40,
                    marginRight: -80
                  }
                }),
                /* @__PURE__ */ jsxs(import_react_native22.View, {
                  style: {
                    flex: 2,
                    paddingLeft: 24
                  },
                  children: [
                    /* @__PURE__ */ jsx(import_react_native22.Text, {
                      style: styles2.headerTitle,
                      children: ret.props.title
                    }),
                    /* @__PURE__ */ jsx(import_react_native22.Text, {
                      style: styles2.headerDescription,
                      children: ret.props.body
                    })
                  ]
                })
              ]
            }),
            /* @__PURE__ */ jsxs(import_react_native22.View, {
              style: {
                flex: 6
              },
              children: [
                /* @__PURE__ */ jsx(import_react_native22.View, {
                  style: {
                    paddingBottom: 8
                  },
                  children: /* @__PURE__ */ jsx(BadgableTabBar, {
                    tabs: tabs.map(function(t) {
                      return {
                        ...t,
                        title: t.title()
                      };
                    }),
                    activeTab: this.state.activeTab,
                    onTabSelected: function(tab) {
                      _this.setState({
                        activeTab: tab
                      });
                    }
                  })
                }),
                /* @__PURE__ */ jsx(Codeblock, {
                  selectable: true,
                  style: {
                    flex: 1,
                    textAlignVertical: "top"
                  },
                  children: tabData?.trimWhitespace ? errorText.split("\n").filter(function(i) {
                    return i.length !== 0;
                  }).map(function(i) {
                    return i.trim();
                  }).join("\n") : errorText
                })
              ]
            }),
            /* @__PURE__ */ jsx(import_react_native22.View, {
              style: styles2.footer,
              children: buttons.map(function(button) {
                var buttonIndex = buttons.indexOf(button) !== 0 ? 8 : 0;
                return /* @__PURE__ */ jsx(CompatButton, {
                  text: button.text,
                  color: button.color ?? ButtonColors.BRAND,
                  size: button.size ?? "small",
                  onPress: button.onPress,
                  style: {
                    ...DeviceManager.isTablet ? {
                      flex: `0.${buttons.length}`,
                      marginLeft: buttonIndex
                    } : {
                      marginTop: buttonIndex
                    },
                    borderRadius: 16
                  }
                });
              })
            })
          ]
        })
      });
    });
  }
  var import_react_native22, ErrorBoundary2, BadgableTabBar, styles2, tabs;
  var init_safeMode = __esm({
    "src/lib/ui/safeMode.tsx"() {
      "use strict";
      init_jsxRuntime();
      init_i18n();
      init_debug();
      init_modules();
      init_patcher();
      init_settings();
      init_lazy();
      init_types();
      init_components();
      init_lazy2();
      init_wrappers();
      init_color();
      init_components2();
      init_styles();
      import_react_native22 = __toESM(require_react_native());
      ErrorBoundary2 = findByNameLazy("ErrorBoundary");
      ({ BadgableTabBar } = lazyDestructure(function() {
        return findByProps("BadgableTabBar");
      }));
      styles2 = createThemedStyleSheet({
        container: {
          flex: 1,
          backgroundColor: semanticColors.BACKGROUND_PRIMARY,
          paddingHorizontal: 16
        },
        header: {
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 8
        },
        headerTitle: {
          ...TextStyleSheet["heading-md/semibold"],
          textAlign: "center",
          textTransform: "uppercase",
          color: semanticColors.HEADER_PRIMARY
        },
        headerDescription: {
          ...TextStyleSheet["text-sm/medium"],
          textAlign: "center",
          color: semanticColors.TEXT_MUTED
        },
        footer: {
          flexDirection: DeviceManager.isTablet ? "row" : "column",
          justifyContent: "flex-end",
          marginVertical: 8
        }
      });
      tabs = [
        {
          id: "message",
          title: function() {
            return Strings.MESSAGE;
          }
        },
        {
          id: "stack",
          title: function() {
            return Strings.STACK_TRACE;
          }
        },
        {
          id: "componentStack",
          title: function() {
            return Strings.COMPONENT;
          },
          trimWhitespace: true
        }
      ];
    }
  });

  // src/global.d.ts
  var init_global_d = __esm({
    "src/global.d.ts"() {
      "use strict";
    }
  });

  // src/lib/ui/index.ts
  var ui_exports = {};
  __export(ui_exports, {
    alerts: () => alerts_exports,
    color: () => color_exports,
    components: () => components_exports,
    settings: () => settings_exports2,
    styles: () => styles_exports,
    toasts: () => toasts_exports
  });
  var init_ui = __esm({
    "src/lib/ui/index.ts"() {
      "use strict";
      init_alerts();
      init_color();
      init_components2();
      init_settings2();
      init_styles();
      init_toasts();
    }
  });

  // src/lib/index.ts
  var lib_exports = {};
  __export(lib_exports, {
    api: () => api_exports,
    fonts: () => fonts_exports,
    managers: () => managers,
    metro: () => metro_exports,
    plugins: () => plugins_exports2,
    themes: () => themes_exports,
    ui: () => ui_exports,
    unload: () => unload,
    utils: () => utils_exports
  });
  function unload() {
    for (var d of _disposer)
      if (typeof d === "function")
        d();
    delete window.bunny;
  }
  var managers, _disposer;
  var init_lib = __esm({
    "src/lib/index.ts"() {
      "use strict";
      init_global_d();
      init_api2();
      init_fonts();
      init_plugins4();
      init_themes();
      init_ui();
      init_utils();
      init_metro();
      init_fonts();
      init_plugins4();
      init_themes();
      init_lazy();
      managers = proxyLazy(function() {
        console.warn("bunny.managers.* is deprecated, and moved the top level (bunny.*). bunny.managers will be eventually removed soon");
        return {
          get fonts() {
            return fonts_exports;
          },
          get plugins() {
            return plugins_exports2;
          },
          get themes() {
            return themes_exports;
          }
        };
      }, {
        hint: "object"
      });
      _disposer = [];
      unload.push = function(fn) {
        _disposer.push(fn);
      };
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    default: () => src_default
  });
  async function src_default() {
    if (isThemeSupported()) {
      try {
        if (isPyonLoader()) {
          if (FileManager.removeFile != null) {
            removeFile("vendetta_theme.json", "");
          } else {
            writeFile("vendetta_theme.json", "null", "");
          }
        }
        initThemes();
      } catch (e) {
        console.error("[Bunny] Failed to initialize themes...", e);
      }
    }
    await Promise.all([
      injectFluxInterceptor(),
      patchSettings(),
      patchLogHook(),
      patchCommands(),
      patchChatBackground(),
      initVendettaObject(),
      initFetchI18nStrings(),
      initSettings(),
      fixes_default(),
      safeMode_default(),
      checkAndRegisterUpdates()
    ]).then(
      // Push them all to unloader
      function(u) {
        return u.forEach(function(f) {
          return f && unload.push(f);
        });
      }
    );
    window.bunny = lib_exports;
    VdPluginManager.initPlugins().then(function(u) {
      return unload.push(u);
    }).catch(function() {
      return alert("Failed to initialize Vendetta plugins");
    });
    initPlugins();
    updateFonts();
    logger.log("Bunny is ready!");
  }
  var init_src = __esm({
    "src/index.ts"() {
      "use strict";
      init_fixes();
      init_i18n();
      init_settings3();
      init_api();
      init_plugins();
      init_commands();
      init_debug();
      init_flux();
      init_fs();
      init_loader();
      init_modules();
      init_fonts();
      init_plugins4();
      init_themes();
      init_logger();
      init_safeMode();
      init_settings2();
      init_lib();
    }
  });

  // src/entry.ts
  var { instead: instead3 } = require_cjs();
  globalThis.window = globalThis;
  async function initializeBunny() {
    try {
      Object.freeze = Object.seal = Object;
      require_promise_all_settled();
      await (init_caches(), __toCommonJS(caches_exports)).initMetroCache();
      await (init_src(), __toCommonJS(src_exports)).default();
    } catch (e) {
      var { ClientInfoManager: ClientInfoManager2 } = (init_modules(), __toCommonJS(modules_exports));
      var stack = e instanceof Error ? e.stack : void 0;
      console.log(stack ?? e?.toString?.() ?? e);
      alert([
        "Failed to load Bunny!\n",
        `Build Number: ${ClientInfoManager2.Build}`,
        `Bunny: ${"ba70fc4-dev"}`,
        stack || e?.toString?.()
      ].join("\n"));
    }
  }
  if (typeof globalThis.__r !== "undefined") {
    initializeBunny();
  } else {
    var onceIndexRequired = function(originalRequire) {
      var batchedBridge = window.__fbBatchedBridge;
      var callQueue = new Array();
      var unpatchHook = instead3("callFunctionReturnFlushedQueue", batchedBridge, function(args, orig) {
        if (args[0] === "AppRegistry" || !batchedBridge.getCallableModule(args[0])) {
          callQueue.push(args);
          return batchedBridge.flushedQueue();
        }
        return orig.apply(batchedBridge, args);
      });
      var startDiscord = async function() {
        await initializeBunny();
        unpatchHook();
        originalRequire(0);
        callQueue.forEach(function(arg) {
          return batchedBridge.getCallableModule(arg[0]) && batchedBridge.__callFunction(...arg);
        });
      };
      startDiscord();
    };
    onceIndexRequired2 = onceIndexRequired;
    Object.defineProperties(globalThis, {
      __r: {
        configurable: true,
        get: function() {
          return _requireFunc;
        },
        set(v) {
          _requireFunc = function patchedRequire(a) {
            if (a === 0) {
              onceIndexRequired(v);
              _requireFunc = v;
            } else
              return v(a);
          };
        }
      },
      __d: {
        configurable: true,
        get() {
          if (window.Object && !window.modules) {
            window.modules = window.__c?.();
          }
          return this.value;
        },
        set(v) {
          this.value = v;
        }
      }
    });
  }
  var _requireFunc;
  var onceIndexRequired2;
})();
//# sourceURL=bunny
