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

  // src/lib/utils/lazy.ts
  function proxyLazy(factory, asFunction = true) {
    var cache;
    var dummy = asFunction ? function dummy2() {
    } : {};
    var proxyFactory = function() {
      return cache ?? (cache = factory());
    };
    var proxy = new Proxy(dummy, lazyHandler);
    proxyToFactoryMap.set(proxy, proxyFactory);
    dummyToFactoryMap.set(dummy, proxyFactory);
    return proxy;
  }
  function lazyDestructure(factory, asFunction = false) {
    var proxiedObject = proxyLazy(factory, asFunction);
    return new Proxy({}, {
      get(_, property) {
        if (property === Symbol.iterator) {
          return function* () {
            yield proxiedObject;
            yield new Proxy({}, {
              get: function(_2, p) {
                return proxyLazy(function() {
                  return proxiedObject[p];
                });
              }
            });
            throw new Error("This is not a real iterator, this is likely used incorrectly");
          };
        }
        return proxyLazy(function() {
          return proxiedObject[property];
        });
      }
    });
  }
  function getFactoryOfProxy(obj) {
    return proxyToFactoryMap.get(obj);
  }
  var unconfigurable, isUnconfigurable, proxyToFactoryMap, dummyToFactoryMap, lazyHandler;
  var init_lazy = __esm({
    "src/lib/utils/lazy.ts"() {
      "use strict";
      unconfigurable = [
        "arguments",
        "caller",
        "prototype"
      ];
      isUnconfigurable = function(key) {
        return typeof key === "string" && unconfigurable.includes(key);
      };
      proxyToFactoryMap = /* @__PURE__ */ new WeakMap();
      dummyToFactoryMap = /* @__PURE__ */ new WeakMap();
      lazyHandler = {
        ...Object.fromEntries(Object.getOwnPropertyNames(Reflect).map(function(fnName) {
          return [
            fnName,
            function(target, ...args) {
              var resolved = dummyToFactoryMap.get(target)();
              if (!resolved)
                throw new Error(`Trying to ${fnName} of ${typeof resolved}`);
              return Reflect[fnName](resolved, ...args);
            }
          ];
        })),
        ownKeys: function(target) {
          var resolved = dummyToFactoryMap.get(target)();
          if (!resolved)
            throw new Error(`Trying to ownKeys of ${typeof resolved}`);
          var cacheKeys = Reflect.ownKeys(dummyToFactoryMap.get(target)());
          unconfigurable.forEach(function(key) {
            return !cacheKeys.includes(key) && cacheKeys.push(key);
          });
          return cacheKeys;
        },
        getOwnPropertyDescriptor: function(target, p) {
          var resolved = dummyToFactoryMap.get(target)();
          if (!resolved)
            throw new Error(`Trying to getOwnPropertyDescriptor of ${typeof resolved}`);
          if (isUnconfigurable(p))
            return Reflect.getOwnPropertyDescriptor(target, p);
          var descriptor = Reflect.getOwnPropertyDescriptor(dummyToFactoryMap.get(target)(), p);
          if (descriptor)
            Object.defineProperty(target, p, descriptor);
          return descriptor;
        }
      };
    }
  });

  // node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/shared.js
  var patchTypes, patchedObjects;
  var init_shared = __esm({
    "node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/shared.js"() {
      patchTypes = [
        "a",
        "b",
        "i"
      ];
      patchedObjects = /* @__PURE__ */ new Map();
    }
  });

  // node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/hook.js
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
  var init_hook = __esm({
    "node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/hook.js"() {
      init_shared();
    }
  });

  // node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/unpatch.js
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
  var init_unpatch = __esm({
    "node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/unpatch.js"() {
      init_shared();
    }
  });

  // node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/getPatchFunc.js
  function getPatchFunc_default(patchType) {
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
  }
  var init_getPatchFunc = __esm({
    "node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/getPatchFunc.js"() {
      init_hook();
      init_shared();
      init_unpatch();
    }
  });

  // node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/index.js
  var before, instead, after;
  var init_esm = __esm({
    "node_modules/.pnpm/spitroast@1.4.4/node_modules/spitroast/dist/esm/index.js"() {
      init_getPatchFunc();
      init_unpatch();
      before = getPatchFunc_default("b");
      instead = getPatchFunc_default("i");
      after = getPatchFunc_default("a");
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

  // src/lib/utils/throttle.ts
  function throttle(funct, time = 200) {
    var active = false;
    var calledWhileActive = false;
    return function(...args) {
      var _this = this;
      if (!active) {
        active = true;
        funct.apply(this, args);
        setTimeout(function() {
          active = false;
          if (calledWhileActive) {
            calledWhileActive = false;
            funct.apply(_this, args);
          }
        }, time);
      } else {
        calledWhileActive = true;
      }
    };
  }
  var init_throttle = __esm({
    "src/lib/utils/throttle.ts"() {
      "use strict";
    }
  });

  // src/metro/finders.ts
  function filterExports(moduleExports, moduleId, filter) {
    if (moduleExports.default && moduleExports.__esModule && filter(moduleExports.default, moduleId, true)) {
      return [
        filter.raw ? moduleExports : moduleExports.default,
        !filter.raw
      ];
    }
    if (!filter.raw && filter(moduleExports, moduleId, false)) {
      return [
        moduleExports,
        false
      ];
    }
    return [
      void 0,
      false
    ];
  }
  function findModule(filter) {
    var { cacheId, finish } = getCacherForUniq(filter.uniq, false);
    for (var [id, moduleExports] of getModules(filter.uniq, false)) {
      var [testedExports, defaultExp] = filterExports(moduleExports, id, filter);
      if (testedExports !== void 0) {
        cacheId(id, testedExports);
        return [
          id,
          defaultExp
        ];
      }
    }
    finish(true);
    return [];
  }
  function findModuleId(filter) {
    return findModule(filter)?.[0];
  }
  function findExports(filter) {
    var [id, defaultExp] = findModule(filter);
    if (id == null)
      return;
    return defaultExp ? requireModule(id).default : requireModule(id);
  }
  function findAllModule(filter) {
    var { cacheId, finish } = getCacherForUniq(filter.uniq, true);
    var foundExports = [];
    for (var [id, moduleExports] of getModules(filter.uniq, true)) {
      var [testedExports, defaultExp] = filterExports(moduleExports, id, filter);
      if (testedExports !== void 0) {
        foundExports.push([
          id,
          defaultExp
        ]);
        cacheId(id, testedExports);
      }
    }
    finish(foundExports.length === 0);
    return foundExports;
  }
  function findAllModuleId(filter) {
    return findAllModule(filter).map(function(e) {
      return e[0];
    });
  }
  function findAllExports(filter) {
    return findAllModule(filter).map(function(ret) {
      if (!ret.length)
        return;
      var [id, defaultExp] = ret;
      return defaultExp ? requireModule(id).default : requireModule(id);
    });
  }
  var init_finders = __esm({
    "src/metro/finders.ts"() {
      "use strict";
      init_caches();
      init_modules2();
    }
  });

  // src/metro/proxy.ts
  function getIndexedSingleFind(filter) {
    var modulesMap = getMetroCache().findIndex[filter.uniq];
    if (!modulesMap)
      return;
    var id = Object.keys(modulesMap).filter(function(k) {
      return k[0] !== "_";
    })[0];
    return id ? Number(id) : void 0;
  }
  function subscribeModuleOfFind(proxy, callback) {
    var info = getFindContext(proxy);
    if (!info)
      throw new Error("Subscribing a module for non-proxy-find");
    if (!info.indexed)
      throw new Error("Attempting to subscribe to a non-indexed find");
    return subscribeModule(info.moduleId, function() {
      callback(findExports(info.filter));
    });
  }
  function getFindContext(proxy) {
    return proxyContextMap.get(proxy);
  }
  function createFindProxy(filter) {
    var cache = void 0;
    var moduleId = getIndexedSingleFind(filter);
    var context = {
      filter,
      indexed: !!moduleId,
      moduleId,
      getExports(cb) {
        if (!moduleId || metroModules[moduleId]?.isInitialized) {
          return cb(this.unproxy()), function() {
          };
        }
        return this.subscribe(cb);
      },
      subscribe(cb) {
        return subscribeModuleOfFind(proxy, cb);
      },
      get cache() {
        return cache;
      },
      unproxy() {
        cache ?? (cache = findExports(filter));
        if (!cache)
          throw new Error(`${filter.uniq} is ${typeof cache}! (id ${context.moduleId ?? "unknown"})`);
        return cache;
      }
    };
    var proxy = proxyLazy(function() {
      return context.unproxy();
    });
    proxyContextMap.set(proxy, context);
    return proxy;
  }
  var proxyContextMap;
  var init_proxy = __esm({
    "src/metro/proxy.ts"() {
      "use strict";
      init_lazy();
      init_caches();
      init_finders();
      init_modules2();
      proxyContextMap = /* @__PURE__ */ new WeakMap();
    }
  });

  // src/lib/api/patcher.ts
  var patcher_exports = {};
  __export(patcher_exports, {
    after: () => after2,
    before: () => before2,
    default: () => patcher_default,
    instead: () => instead2
  });
  function shim(fn) {
    function shimmed(...args) {
      var _this = this;
      var proxyInfo = getFindContext(args[1]);
      if (proxyInfo && !proxyInfo.cache && proxyInfo.indexed) {
        var cancel = false;
        var unpatch2 = function() {
          return cancel = true;
        };
        proxyInfo.subscribe(function(exp) {
          if (cancel)
            return;
          args[1] = exp;
          unpatch2 = fn.apply(_this, args);
        });
        return function() {
          return unpatch2();
        };
      }
      return fn.apply(this, args);
    }
    shimmed.proxy = function proxyPatch(...args) {
      var [target, resolve] = args[1];
      var proxyInfo = getFindContext(target);
      if (!proxyInfo) {
        args[1] = resolve(target);
        return shimmed(...args);
      }
      var cancel = false;
      var unpatch2 = function() {
        return cancel = true;
      };
      proxyInfo.getExports(function(exp) {
        if (cancel)
          return;
        args[1] = resolve(exp);
        unpatch2 = shimmed(...args);
      });
      return unpatch2;
    };
    return shimmed;
  }
  var after2, before2, instead2, patcher_default;
  var init_patcher = __esm({
    "src/lib/api/patcher.ts"() {
      "use strict";
      init_proxy();
      init_esm();
      after2 = shim(after);
      before2 = shim(before);
      instead2 = shim(instead);
      patcher_default = {
        after: after2,
        before: before2,
        instead: instead2
      };
    }
  });

  // src/lib/api/assets.ts
  var assets_exports = {};
  __export(assets_exports, {
    assetsMap: () => assetsMap,
    findAsset: () => findAsset,
    patchAssets: () => patchAssets,
    requireAssetByIndex: () => requireAssetByIndex,
    requireAssetByName: () => requireAssetByName,
    requireAssetIndex: () => requireAssetIndex
  });
  function patchAssets(module) {
    if (assetsModule)
      return;
    assetsModule = module;
    var unpatch2 = after2("registerAsset", assetsModule, function([asset]) {
      var moduleId = getImportingModuleId();
      if (moduleId !== -1)
        registerAssetCacheId(asset.name, moduleId);
    });
    return unpatch2;
  }
  var assetsMap, assetsModule, findAsset, requireAssetByName, requireAssetByIndex, requireAssetIndex;
  var init_assets = __esm({
    "src/lib/api/assets.ts"() {
      "use strict";
      init_patcher();
      init_caches();
      init_modules2();
      assetsMap = new Proxy({}, {
        get(target, p) {
          var _assetDefinition, _assetDefinition1, _assetDefinition2;
          if (typeof p !== "string")
            return void 0;
          if (target[p])
            return target[p];
          var moduleId = getMetroCache().assetsIndex[p];
          if (moduleId == null)
            return void 0;
          var assetIndex = requireModule(moduleId);
          var assetDefinition = assetsModule.getAssetByID(assetIndex);
          (_assetDefinition1 = assetDefinition).index ?? (_assetDefinition1.index = (_assetDefinition = assetDefinition).id ?? (_assetDefinition.id = assetIndex));
          (_assetDefinition2 = assetDefinition).moduleId ?? (_assetDefinition2.moduleId = moduleId);
          return target[p] = assetDefinition;
        },
        ownKeys(target) {
          var keys = Reflect.ownKeys(getMetroCache().assetsIndex);
          for (var key of keys)
            target[key] = this.get(target, key, {});
          return keys;
        }
      });
      findAsset = function(filter) {
        return Object.values(assetsMap).find(filter);
      };
      requireAssetByName = function(name) {
        return assetsMap[name];
      };
      requireAssetByIndex = function(id) {
        return assetsModule.getAssetByID(id);
      };
      requireAssetIndex = function(name) {
        return assetsMap[name]?.index;
      };
    }
  });

  // src/core/polyfills/allSettled.ts
  var _Promise, allSettledFulfill, allSettledReject, mapAllSettled, allSettled;
  var init_allSettled = __esm({
    "src/core/polyfills/allSettled.ts"() {
      "use strict";
      allSettledFulfill = function(value) {
        return {
          status: "fulfilled",
          value
        };
      };
      allSettledReject = function(reason) {
        return {
          status: "rejected",
          reason
        };
      };
      mapAllSettled = function(item) {
        return Promise.resolve(item).then(allSettledFulfill, allSettledReject);
      };
      allSettled = function(iterator) {
        return Promise.all(Array.from(iterator).map(mapAllSettled));
      };
      (_Promise = Promise).allSettled ?? (_Promise.allSettled = allSettled);
    }
  });

  // src/lib/utils/emitter.ts
  function createEmitter() {
    return {
      listeners: Object.values(Events).reduce(function(acc, val) {
        return acc[val] = /* @__PURE__ */ new Set(), acc;
      }, {}),
      on(event, listener) {
        if (!this.listeners[event].has(listener))
          this.listeners[event].add(listener);
      },
      off(event, listener) {
        this.listeners[event].delete(listener);
      },
      once(event, listener) {
        var _this = this;
        var once = function(event2, data) {
          _this.off(event2, once);
          listener(event2, data);
        };
        this.on(event, once);
      },
      emit(event, data) {
        for (var listener of this.listeners[event])
          listener(event, data);
      }
    };
  }
  var Events;
  var init_emitter = __esm({
    "src/lib/utils/emitter.ts"() {
      "use strict";
      (function(Events2) {
        Events2["GET"] = "GET";
        Events2["SET"] = "SET";
        Events2["DEL"] = "DEL";
      })(Events || (Events = {}));
    }
  });

  // glob-react-native:react-native
  var require_react_native = __commonJS({
    "glob-react-native:react-native"(exports, module) {
      Object.defineProperty(module, "exports", { get: () => globalThis.ReactNative });
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
    awaitSyncWrapper: () => awaitSyncWrapper,
    createFileBackend: () => createFileBackend,
    createMMKVBackend: () => createMMKVBackend,
    createProxy: () => createProxy,
    createStorage: () => createStorage,
    purgeStorage: () => purgeStorage,
    useProxy: () => useProxy,
    wrapSync: () => wrapSync
  });
  function createProxy(target = {}) {
    var emitter = createEmitter();
    function createProxy2(target2, path) {
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
              return createProxy2(value, newPath);
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
      proxy: createProxy2(target, []),
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
  var emitterSymbol, syncAwaitSymbol, awaitSyncWrapper;
  var init_storage = __esm({
    "src/lib/api/storage/index.ts"() {
      "use strict";
      init_emitter();
      init_backends();
      emitterSymbol = Symbol.for("vendetta.storage.emitter");
      syncAwaitSymbol = Symbol.for("vendetta.storage.accessor");
      awaitSyncWrapper = function(store) {
        return new Promise(function(res) {
          return store[syncAwaitSymbol](res);
        });
      };
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
    PLUGINS_CHANNEL_ID: () => PLUGINS_CHANNEL_ID,
    PROXY_PREFIX: () => PROXY_PREFIX,
    THEMES_CHANNEL_ID: () => THEMES_CHANNEL_ID
  });
  var DISCORD_SERVER, GITHUB, PROXY_PREFIX, BUNNY_PROXY_PREFIX, HTTP_REGEX, HTTP_REGEX_MULTI, DISCORD_SERVER_ID, PLUGINS_CHANNEL_ID, THEMES_CHANNEL_ID;
  var init_constants = __esm({
    "src/lib/utils/constants.ts"() {
      "use strict";
      DISCORD_SERVER = "https://discord.gg/XjYgWXHb9Q";
      GITHUB = "https://github.com/pyoncord";
      PROXY_PREFIX = "https://vd-plugins.github.io/proxy";
      BUNNY_PROXY_PREFIX = "https://bn-plugins.github.io/vd-proxy";
      HTTP_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
      HTTP_REGEX_MULTI = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
      DISCORD_SERVER_ID = "1015931589865246730";
      PLUGINS_CHANNEL_ID = "1091880384561684561";
      THEMES_CHANNEL_ID = "1091880434939482202";
    }
  });

  // src/lib/utils/findInReactTree.ts
  var findInReactTree;
  var init_findInReactTree = __esm({
    "src/lib/utils/findInReactTree.ts"() {
      "use strict";
      init_utils2();
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

  // src/metro/filters.ts
  var byProps, byName, byDisplayName, byTypeName, byStoreName, byFilePath, byMutableProp;
  var init_filters = __esm({
    "src/metro/filters.ts"() {
      "use strict";
      init_modules2();
      init_utils();
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
      byFilePath = createFilterDefinition(function([path], _, id, defaultCheck) {
        return !defaultCheck && metroModules[id]?.__filePath === path;
      }, function(path) {
        return `bunny.metro.byFilePath(${path})`;
      });
      byMutableProp = createFilterDefinition(function([prop], m) {
        return m?.[prop] && !Object.getOwnPropertyDescriptor(m, prop)?.get;
      }, function(prop) {
        return `bunny.metro.byMutableProp(${prop})`;
      });
    }
  });

  // src/metro/utils.ts
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
  var findByProps, findByPropsProxy, findByPropsAll, findByName, findByNameProxy, findByNameAll, findByDisplayName, findByDisplayNameProxy, findByDisplayNameAll, findByTypeName, findByTypeNameProxy, findByTypeNameAll, findByStoreName, findByStoreNameProxy, findByFilePath, findByFilePathProxy;
  var init_utils = __esm({
    "src/metro/utils.ts"() {
      "use strict";
      init_filters();
      init_finders();
      init_proxy();
      findByProps = function(...props) {
        return findExports(byProps(...props));
      };
      findByPropsProxy = function(...props) {
        return createFindProxy(byProps(...props));
      };
      findByPropsAll = function(...props) {
        return findAllExports(byProps(...props));
      };
      findByName = function(name, expDefault = true) {
        return findExports(expDefault ? byName(name) : byName.byRaw(name));
      };
      findByNameProxy = function(name, expDefault = true) {
        return createFindProxy(expDefault ? byName(name) : byName.byRaw(name));
      };
      findByNameAll = function(name, expDefault = true) {
        return findAllExports(expDefault ? byName(name) : byName.byRaw(name));
      };
      findByDisplayName = function(name, expDefault = true) {
        return findExports(expDefault ? byDisplayName(name) : byDisplayName.byRaw(name));
      };
      findByDisplayNameProxy = function(name, expDefault = true) {
        return createFindProxy(expDefault ? byDisplayName(name) : byDisplayName.byRaw(name));
      };
      findByDisplayNameAll = function(name, expDefault = true) {
        return findAllExports(expDefault ? byDisplayName(name) : byDisplayName.byRaw(name));
      };
      findByTypeName = function(name, expDefault = true) {
        return findExports(expDefault ? byTypeName(name) : byTypeName.byRaw(name));
      };
      findByTypeNameProxy = function(name, expDefault = true) {
        return createFindProxy(expDefault ? byTypeName(name) : byTypeName.byRaw(name));
      };
      findByTypeNameAll = function(name, expDefault = true) {
        return findAllExports(expDefault ? byTypeName(name) : byTypeName.byRaw(name));
      };
      findByStoreName = function(name) {
        return findExports(byStoreName(name));
      };
      findByStoreNameProxy = function(name) {
        return createFindProxy(byStoreName(name));
      };
      findByFilePath = function(path) {
        return findExports(byFilePath(path));
      };
      findByFilePathProxy = function(path) {
        return createFindProxy(byFilePath(path));
      };
    }
  });

  // src/lib/utils/logger.ts
  var logger_exports = {};
  __export(logger_exports, {
    logModule: () => logModule,
    logger: () => logger
  });
  var logModule, logger;
  var init_logger = __esm({
    "src/lib/utils/logger.ts"() {
      "use strict";
      init_utils();
      logModule = findByNameProxy("Logger");
      logger = new logModule("Bunny");
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

  // src/lib/utils/types.ts
  var types_exports = {};
  __export(types_exports, {
    ButtonColors: () => ButtonColors
  });
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

  // src/lib/utils/without.ts
  function without(object, ...keys) {
    var cloned = {
      ...object
    };
    keys.forEach(function(k) {
      return delete cloned[k];
    });
    return cloned;
  }
  var init_without = __esm({
    "src/lib/utils/without.ts"() {
      "use strict";
    }
  });

  // src/lib/utils/index.ts
  var utils_exports = {};
  __export(utils_exports, {
    constants: () => constants_exports,
    createEmitter: () => createEmitter,
    findInReactTree: () => findInReactTree,
    findInTree: () => findInTree,
    logger: () => logger_exports,
    safeFetch: () => safeFetch,
    types: () => types_exports,
    without: () => without
  });
  var init_utils2 = __esm({
    "src/lib/utils/index.ts"() {
      "use strict";
      init_constants();
      init_emitter();
      init_findInReactTree();
      init_findInTree();
      init_logger();
      init_safeFetch();
      init_types();
      init_without();
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
    Skia: () => Skia,
    assets: () => assets,
    channels: () => channels,
    chroma: () => chroma,
    clipboard: () => clipboard,
    commands: () => commands,
    constants: () => constants,
    i18n: () => i18n,
    invites: () => invites,
    lodash: () => lodash,
    messageUtil: () => messageUtil,
    moment: () => moment,
    navigation: () => navigation,
    navigationStack: () => navigationStack,
    toasts: () => toasts,
    tokens: () => tokens,
    url: () => url,
    util: () => util
  });
  var constants, channels, i18n, url, clipboard, assets, invites, commands, navigation, toasts, messageUtil, navigationStack, NavigationNative, tokens, Flux, FluxDispatcher, React2, ReactNative, moment, chroma, lodash, Skia, util;
  var init_common = __esm({
    "src/metro/common/index.ts"() {
      "use strict";
      init_lazy();
      init_utils();
      constants = findByPropsProxy("Fonts", "Permissions");
      channels = findByPropsProxy("getVoiceChannelId");
      i18n = findByPropsProxy("Messages");
      url = findByPropsProxy("openURL", "openDeeplink");
      clipboard = findByPropsProxy("setString", "getString", "hasString");
      assets = findByPropsProxy("registerAsset");
      invites = findByPropsProxy("acceptInviteAndTransitionToInviteChannel");
      commands = findByPropsProxy("getBuiltInCommands");
      navigation = findByPropsProxy("pushLazy");
      toasts = proxyLazy(function() {
        return findByFilePath("modules/toast/native/ToastActionCreators.tsx").default;
      });
      messageUtil = findByPropsProxy("sendBotMessage");
      navigationStack = findByPropsProxy("createStackNavigator");
      NavigationNative = findByPropsProxy("NavigationContainer");
      tokens = findByPropsProxy("colors", "unsafe_rawColors");
      Flux = findByPropsProxy("connectStores");
      FluxDispatcher = findByProps("_interceptors");
      React2 = window.React = findByPropsProxy("createElement");
      ReactNative = window.ReactNative = findByPropsProxy("AppRegistry");
      moment = findByPropsProxy("isMoment");
      chroma = findByPropsProxy("brewer");
      lodash = findByPropsProxy("forEachRight");
      Skia = findByPropsProxy("useFont");
      util = findByPropsProxy("inspect", "isNullOrUndefined");
    }
  });

  // src/lib/managers/themes.ts
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
    var patches = [
      after2("default", MessagesWrapperConnected, function(_, ret) {
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
      after2("render", MessagesWrapper.prototype, function(_, ret) {
        if (!enabled || !currentTheme?.data?.background?.url)
          return;
        var Messages = findInReactTree(ret, function(x) {
          return x && "HACK_fixModalInteraction" in x.props && x?.props?.style;
        });
        if (Messages) {
          Messages.props.style = [
            Messages.props.style,
            {
              backgroundColor: chroma(Messages.props.style.backgroundColor || "black").alpha(1 - (currentTheme?.data.background?.alpha ?? 1)).hex()
            }
          ];
        } else
          console.error("Didn't find Messages when patching MessagesWrapper!");
      })
    ];
    return function() {
      return patches.forEach(function(x) {
        return x();
      });
    };
  }
  function normalizeToHex(colorString) {
    if (chroma.valid(colorString))
      return chroma(colorString).hex();
    var color2 = Number((0, import_react_native2.processColor)(colorString));
    return chroma.rgb(
      color2 >> 16 & 255,
      color2 >> 8 & 255,
      color2 & 255,
      color2 >> 24 & 255
      // alpha
    ).hex();
  }
  function processData(data) {
    var _data;
    if (data.semanticColors) {
      var { semanticColors: semanticColors2 } = data;
      for (var key in semanticColors2) {
        for (var index in semanticColors2[key]) {
          var _semanticColors_key, _index;
          (_semanticColors_key = semanticColors2[key])[_index = index] && (_semanticColors_key[_index] = normalizeToHex(semanticColors2[key][index]));
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
    (_data = data).spec ?? (_data.spec = 2);
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
      rawColors2[key] = chroma(rawColors2[colorKey]).alpha(alpha).hex();
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
    await awaitSyncWrapper(themes);
    var currentTheme2 = getThemeFromLoader();
    await allSettled(Object.keys(themes).map(function(id) {
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
    before2("isThemeDark", isThemeModule, callback);
    before2("isThemeLight", isThemeModule, callback);
    before2("updateTheme", ThemeManager, callback);
    after2("get", mmkvStorage, function([a], ret) {
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
    before2("set", mmkvStorage, function(args) {
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
    instead2("resolveSemanticColor", color.default.meta ?? color.default.internal, function(args, orig) {
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
        return colorDef.opacity === 1 ? rawValue : chroma(rawValue).alpha(colorDef.opacity).hex();
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
    var _extractInfo;
    var propName = colorObj[(_extractInfo = extractInfo)._sym ?? (_extractInfo._sym = Object.getOwnPropertySymbols(colorObj)[0])];
    var colorDef = color.SemanticColor[propName];
    return [
      propName,
      colorDef[themeName]
    ];
  }
  var import_react_native2, color, mmkvStorage, appearanceManager, ThemeStore, formDividerModule, MessagesWrapperConnected, MessagesWrapper, isThemeModule, themes, semanticAlternativeMap, origRawColor, inc, vdKey, vdThemeFallback, enabled, currentTheme, storageResolved, discordThemes;
  var init_themes = __esm({
    "src/lib/managers/themes.ts"() {
      "use strict";
      init_allSettled();
      init_loader();
      init_modules();
      init_patcher();
      init_storage();
      init_utils2();
      init_lazy();
      init_common();
      init_filters();
      init_proxy();
      init_utils();
      import_react_native2 = __toESM(require_react_native());
      color = findByPropsProxy("SemanticColor");
      mmkvStorage = proxyLazy(function() {
        var newModule = findByProps("impl");
        if (typeof newModule?.impl === "object")
          return newModule.impl;
        return findByProps("storage");
      });
      appearanceManager = findByPropsProxy("updateTheme");
      ThemeStore = findByStoreNameProxy("ThemeStore");
      formDividerModule = findByPropsProxy("DIVIDER_COLORS");
      MessagesWrapperConnected = findByNameProxy("MessagesWrapperConnected", false);
      ({ MessagesWrapper } = lazyDestructure(function() {
        return findByProps("MessagesWrapper");
      }));
      isThemeModule = createFindProxy(byMutableProp("isThemeDark"));
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

  // src/lib/settings.ts
  var settings_exports = {};
  __export(settings_exports, {
    loaderConfig: () => loaderConfig,
    settings: () => settings
  });
  var settings, loaderConfig;
  var init_settings = __esm({
    "src/lib/settings.ts"() {
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
  var redesignProps, cacher, _cache, redesign_default;
  var init_redesign = __esm({
    "src/metro/polyfills/redesign.ts"() {
      "use strict";
      init_caches();
      init_filters();
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
      cacher = getPolyfillModuleCacher("redesign_module");
      _cache = {};
      redesign_default = new Proxy({}, {
        get(_, p) {
          if (typeof p !== "string" || !redesignProps.has(p))
            return;
          if (_cache[p])
            return _cache[p];
          var prop = p;
          var filter = byProps(prop);
          var candidates = [];
          for (var [id, moduleExports] of cacher.getModules()) {
            if (filter(moduleExports, id, false)) {
              cacher.cacheId(id);
              candidates.push(moduleExports);
            } else if (moduleExports.__esModule && moduleExports.default && filter(moduleExports.default, id, false)) {
              cacher.cacheId(id);
              candidates.push(moduleExports.default);
            }
          }
          if (candidates.length === 0)
            return void 0;
          var bestCandidate = candidates.reduce(function(c1, c2) {
            return Object.keys(c2).length < Object.keys(c1).length ? c2 : c1;
          });
          return _cache[prop] = bestCandidate[prop];
        },
        ownKeys() {
          var _this = this;
          redesignProps.forEach(function(prop) {
            _this.get({}, prop, {});
          });
          return Reflect.ownKeys(_cache);
        }
      });
    }
  });

  // src/metro/modules.ts
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
    var _moduleExports;
    indexExportsFlags(id, moduleExports);
    (_moduleExports = moduleExports).initSentry && (_moduleExports.initSentry = function() {
      return void 0;
    });
    if (moduleExports.default?.track && moduleExports.default.trackMaker)
      moduleExports.default.track = function() {
        return Promise.resolve();
      };
    if (moduleExports.registerAsset) {
      (init_assets(), __toCommonJS(assets_exports)).patchAssets(moduleExports);
    }
    if (moduleExports?.default?.name === "requireNativeComponent") {
      instead("default", moduleExports, function(args, origFunc) {
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
      before("fileFinishedImporting", moduleExports, function([filePath]) {
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
      instead("defineLocale", moduleExports, function(args, orig) {
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
  var _loop, metroModules, metroRequire, moduleSubscriptions, blacklistedIds, noopHandler, functionToString, patchedInspectSource, patchedImportTracker, _importingModuleId, key;
  var init_modules2 = __esm({
    "src/metro/modules.ts"() {
      "use strict";
      init_caches();
      init_esm();
      _loop = function(key) {
        var id = Number(key);
        var metroModule = metroModules[id];
        var cache = getMetroCache().exportsIndex[id];
        if (cache & ExportsFlags.BLACKLISTED) {
          blacklistModule(id);
          return "continue";
        }
        if (metroModule.factory) {
          instead("factory", metroModule, function(args, origFunc) {
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
            _importingModuleId = -1;
          });
        }
      };
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

  // src/metro/caches.ts
  var caches_exports = {};
  __export(caches_exports, {
    ExportsFlags: () => ExportsFlags,
    ModulesMapInternal: () => ModulesMapInternal,
    getCacherForUniq: () => getCacherForUniq,
    getMetroCache: () => getMetroCache,
    getPolyfillModuleCacher: () => getPolyfillModuleCacher,
    indexBlacklistFlag: () => indexBlacklistFlag,
    indexExportsFlags: () => indexExportsFlags,
    initMetroCache: () => initMetroCache,
    registerAssetCacheId: () => registerAssetCacheId
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
    }, 1e3);
    _metroCache = cache;
    return cache;
  }
  async function initMetroCache() {
    var rawCache = await MMKVManager.getItem(BUNNY_METRO_CACHE_KEY);
    if (rawCache == null)
      return void buildInitCache();
    try {
      _metroCache = JSON.parse(rawCache);
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
      return 0;
    var bit = 1;
    return bit;
  }
  function indexExportsFlags(moduleId, moduleExports) {
    var flags = extractExportsFlags(moduleExports);
    if (flags !== 1) {
      _metroCache.exportsIndex[moduleId] = flags;
    }
  }
  function indexBlacklistFlag(id) {
    _metroCache.exportsIndex[id] |= 2;
  }
  function getCacherForUniq(uniq, allFind) {
    var _metroCache_findIndex, _uniq;
    var indexObject = (_metroCache_findIndex = _metroCache.findIndex)[_uniq = uniq] ?? (_metroCache_findIndex[_uniq] = {});
    return {
      cacheId(moduleId, exports) {
        var _indexObject, _moduleId;
        (_indexObject = indexObject)[_moduleId = moduleId] ?? (_indexObject[_moduleId] = extractExportsFlags(exports));
        saveCache();
      },
      // Finish may not be called by single find
      finish(notFound) {
        if (allFind)
          indexObject[`_${0}`] = 1;
        if (notFound)
          indexObject[`_${1}`] = 1;
        saveCache();
      }
    };
  }
  function getPolyfillModuleCacher(name) {
    var _metroCache_polyfillIndex, _name;
    var indexObject = (_metroCache_polyfillIndex = _metroCache.polyfillIndex)[_name = name] ?? (_metroCache_polyfillIndex[_name] = {});
    return {
      getModules() {
        return (init_modules2(), __toCommonJS(modules_exports2)).getCachedPolyfillModules(name);
      },
      cacheId(moduleId) {
        indexObject[moduleId] = 1;
        saveCache();
      }
    };
  }
  function registerAssetCacheId(name, moduleId) {
    if (!isNaN(moduleId)) {
      _metroCache.assetsIndex[name] = moduleId;
      saveCache();
    }
  }
  var CACHE_VERSION, BUNNY_METRO_CACHE_KEY, ExportsFlags, ModulesMapInternal, _metroCache, getMetroCache, saveCache;
  var init_caches = __esm({
    "src/metro/caches.ts"() {
      "use strict";
      init_modules();
      init_throttle();
      CACHE_VERSION = 29;
      BUNNY_METRO_CACHE_KEY = `__bunny_metro_cache_key_v${CACHE_VERSION}__`;
      (function(ExportsFlags2) {
        ExportsFlags2[ExportsFlags2["EXISTS"] = 1] = "EXISTS";
        ExportsFlags2[ExportsFlags2["BLACKLISTED"] = 2] = "BLACKLISTED";
      })(ExportsFlags || (ExportsFlags = {}));
      (function(ModulesMapInternal2) {
        ModulesMapInternal2[ModulesMapInternal2["FULL_LOOKUP"] = 0] = "FULL_LOOKUP";
        ModulesMapInternal2[ModulesMapInternal2["NOT_FOUND"] = 1] = "NOT_FOUND";
      })(ModulesMapInternal || (ModulesMapInternal = {}));
      _metroCache = null;
      getMetroCache = window.__getMetroCache = function() {
        return _metroCache;
      };
      saveCache = throttle(function() {
        MMKVManager.setItem(BUNNY_METRO_CACHE_KEY, JSON.stringify(_metroCache));
      });
    }
  });

  // src/core/fixes.ts
  function onDispatch({ locale }) {
    try {
      moment.locale(locale.toLowerCase());
    } catch (e) {
      logger.error("Failed to fix timestamps...", e);
    }
    FluxDispatcher.unsubscribe("I18N_LOAD_SUCCESS", onDispatch);
  }
  function fixes_default() {
    FluxDispatcher.subscribe("I18N_LOAD_SUCCESS", onDispatch);
  }
  var init_fixes = __esm({
    "src/core/fixes.ts"() {
      "use strict";
      init_logger();
      init_common();
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
      init_utils();
      init_default();
      IntlMessageFormat = findByNameProxy("MessageFormat");
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
          var res = util2.inspect(async?.value ? await AsyncFunction(code.value)() : eval?.(code.value));
          var trimmedRes = res.length > 2e3 ? res.slice(0, 2e3) + "..." : res;
          messageUtil.sendBotMessage(ctx.channel.id, wrapInJSCodeblock(trimmedRes));
        } catch (err) {
          messageUtil.sendBotMessage(ctx.channel.id, wrapInJSCodeblock(err?.stack ?? err));
        }
      }
    };
  }
  var util2, AsyncFunction, ZERO_WIDTH_SPACE_CHARACTER;
  var init_eval = __esm({
    "src/core/commands/eval.ts"() {
      "use strict";
      init_i18n();
      init_types2();
      init_settings();
      init_common();
      init_utils();
      util2 = findByPropsProxy("inspect");
      AsyncFunction = async function() {
        return void 0;
      }.constructor;
      ZERO_WIDTH_SPACE_CHARACTER = "\u200B";
    }
  });

  // src/lib/ui/toasts.ts
  var toasts_exports = {};
  __export(toasts_exports, {
    showToast: () => showToast
  });
  var import_react_native3, uuid4, showToast;
  var init_toasts = __esm({
    "src/lib/ui/toasts.ts"() {
      "use strict";
      init_i18n();
      init_assets();
      init_lazy();
      init_common();
      init_utils();
      import_react_native3 = __toESM(require_react_native());
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
        if (import_react_native3.Platform.OS !== "android" || import_react_native3.Platform.Version <= 32) {
          showToast(message, requireAssetIndex("toast_copy_link"));
        }
      };
    }
  });

  // src/lib/debug.ts
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
      showToast("Invalid debugger URL!", requireAssetIndex("Small"));
      return;
    }
    socket = new WebSocket(`ws://${url2}`);
    socket.addEventListener("open", function() {
      return showToast("Connected to debugger.", requireAssetIndex("Check"));
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
      showToast("An error occurred with the debugger connection!", requireAssetIndex("Small"));
    });
  }
  function patchLogHook() {
    var unpatch2 = after2("nativeLoggingHook", globalThis, function(args) {
      if (socket?.readyState === WebSocket.OPEN)
        socket.send(JSON.stringify({
          message: args[0],
          level: args[1]
        }));
      logger.log(args[0]);
    });
    return function() {
      socket && socket.close();
      unpatch2();
    };
  }
  function getDebugInfo() {
    var hermesProps = window.HermesInternal.getRuntimeProperties();
    var hermesVer = hermesProps["OSS Release Version"];
    var padding = "for RN ";
    var PlatformConstants = import_react_native4.Platform.constants;
    var rnVer = PlatformConstants.reactNativeVersion;
    return {
      /** @deprecated */
      vendetta: {
        version: versionHash,
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
      ...import_react_native4.Platform.select({
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
      ...import_react_native4.Platform.select({
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
  var import_react_native4, socket, versionHash;
  var init_debug = __esm({
    "src/lib/debug.ts"() {
      "use strict";
      init_assets();
      init_loader();
      init_modules();
      init_patcher();
      init_themes();
      init_settings();
      init_logger();
      init_toasts();
      import_react_native4 = __toESM(require_react_native());
      versionHash = "eb55540-dev";
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
        var plugins2 = Object.values(plugins).sort(function(a, b) {
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
  var init_plugins = __esm({
    "src/core/commands/plugins.ts"() {
      "use strict";
      init_i18n();
      init_types2();
      init_plugins2();
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
    var unpatch2 = after2("getBuiltInCommands", commands, function([type], res) {
      if (type === ApplicationCommandType.CHAT) {
        return res.concat(commands2.filter(function(c) {
          return c.__bunny?.shouldHide?.() !== false;
        }));
      }
    });
    [
      (init_eval(), __toCommonJS(eval_exports)),
      (init_debug2(), __toCommonJS(debug_exports2)),
      (init_plugins(), __toCommonJS(plugins_exports))
    ].forEach(function(r) {
      return registerCommand(r.default());
    });
    return function() {
      commands2 = [];
      unpatch2();
    };
  }
  function registerCommand(command) {
    var _command, _command1, _command2, _command3;
    var builtInCommands = commands.getBuiltInCommands(ApplicationCommandType.CHAT, true, false);
    builtInCommands.sort(function(a, b) {
      return parseInt(b.id) - parseInt(a.id);
    });
    var lastCommand = builtInCommands[builtInCommands.length - 1];
    command.id = (parseInt(lastCommand.id, 10) - 1).toString();
    command.__bunny = {
      shouldHide: command.shouldHide
    };
    (_command = command).applicationId ?? (_command.applicationId = "-1");
    (_command1 = command).type ?? (_command1.type = ApplicationCommandType.CHAT);
    command.inputType = ApplicationCommandInputType.BUILT_IN;
    (_command2 = command).displayName ?? (_command2.displayName = command.name);
    (_command3 = command).displayDescription ?? (_command3.displayDescription = command.description);
    if (command.options)
      for (var opt of command.options) {
        var _opt, _opt1;
        (_opt = opt).displayName ?? (_opt.displayName = opt.name);
        (_opt1 = opt).displayDescription ?? (_opt1.displayDescription = opt.description);
      }
    instead2("execute", command, function(args, orig) {
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

  // src/metro/index.ts
  var metro_exports = {};
  __export(metro_exports, {
    byDisplayName: () => byDisplayName,
    byFilePath: () => byFilePath,
    byMutableProp: () => byMutableProp,
    byName: () => byName,
    byProps: () => byProps,
    byStoreName: () => byStoreName,
    byTypeName: () => byTypeName,
    common: () => common_exports,
    createFilterDefinition: () => createFilterDefinition,
    createSimpleFilter: () => createSimpleFilter,
    findAllExports: () => findAllExports,
    findAllModule: () => findAllModule,
    findAllModuleId: () => findAllModuleId,
    findByDisplayName: () => findByDisplayName,
    findByDisplayNameAll: () => findByDisplayNameAll,
    findByDisplayNameProxy: () => findByDisplayNameProxy,
    findByFilePath: () => findByFilePath,
    findByFilePathProxy: () => findByFilePathProxy,
    findByName: () => findByName,
    findByNameAll: () => findByNameAll,
    findByNameProxy: () => findByNameProxy,
    findByProps: () => findByProps,
    findByPropsAll: () => findByPropsAll,
    findByPropsProxy: () => findByPropsProxy,
    findByStoreName: () => findByStoreName,
    findByStoreNameProxy: () => findByStoreNameProxy,
    findByTypeName: () => findByTypeName,
    findByTypeNameAll: () => findByTypeNameAll,
    findByTypeNameProxy: () => findByTypeNameProxy,
    findExports: () => findExports,
    findModule: () => findModule,
    findModuleId: () => findModuleId
  });
  var init_metro = __esm({
    "src/metro/index.ts"() {
      "use strict";
      init_common();
      init_filters();
      init_finders();
      init_utils();
    }
  });

  // src/metro/common/components.ts
  var bySingularProp, findSingular, findProp, Alert, CompatButton, HelpMessage, SafeAreaView, ActionSheetRow, Button, TwinButtons, IconButton, RowButton, PressableScale, TableRow, TableRowIcon, TableRowTrailingText, TableRowGroup, TableSwitchRow, TableSwitch, TableRadio, TableCheckbox, FormSwitch, FormRadio, FormCheckbox, Card, RedesignCompat, Stack, TextInput, SegmentedControl, CompatSegmentedControl, FloatingActionButton, ActionSheet, BottomSheetTitleHeader, textsModule, Text, Forms, LegacyForm, LegacyFormArrow, LegacyFormCTA, LegacyFormCTAButton, LegacyFormCardSection, LegacyFormCheckbox, LegacyFormCheckboxRow, LegacyFormCheckmark, LegacyFormDivider, LegacyFormHint, LegacyFormIcon, LegacyFormInput, LegacyFormLabel, LegacyFormRadio, LegacyFormRadioGroup, LegacyFormRadioRow, LegacyFormRow, LegacyFormSection, LegacyFormSelect, LegacyFormSliderRow, LegacyFormSubLabel, LegacyFormSwitch, LegacyFormSwitchRow, LegacyFormTernaryCheckBox, LegacyFormText, LegacyFormTitle;
  var init_components = __esm({
    "src/metro/common/components.ts"() {
      "use strict";
      init_lazy();
      init_finders();
      init_utils();
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
      Alert = findByDisplayNameProxy("FluxContainer(Alert)");
      CompatButton = findByPropsProxy("Looks", "Colors", "Sizes");
      HelpMessage = findByNameProxy("HelpMessage");
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
      textsModule = findByPropsProxy("Text", "LegacyText");
      Text = proxyLazy(function() {
        return textsModule.Text;
      });
      Forms = findByPropsProxy("Form", "FormSection");
      ({ Form: LegacyForm, FormArrow: LegacyFormArrow, FormCTA: LegacyFormCTA, FormCTAButton: LegacyFormCTAButton, FormCardSection: LegacyFormCardSection, FormCheckbox: LegacyFormCheckbox, FormCheckboxRow: LegacyFormCheckboxRow, FormCheckmark: LegacyFormCheckmark, FormDivider: LegacyFormDivider, FormHint: LegacyFormHint, FormIcon: LegacyFormIcon, FormInput: LegacyFormInput, FormLabel: LegacyFormLabel, FormRadio: LegacyFormRadio, FormRadioGroup: LegacyFormRadioGroup, FormRadioRow: LegacyFormRadioRow, FormRow: LegacyFormRow, FormSection: LegacyFormSection, FormSelect: LegacyFormSelect, FormSliderRow: LegacyFormSliderRow, FormSubLabel: LegacyFormSubLabel, FormSwitch: LegacyFormSwitch, FormSwitchRow: LegacyFormSwitchRow, FormTernaryCheckBox: LegacyFormTernaryCheckBox, FormText: LegacyFormText, FormTitle: LegacyFormTitle } = lazyDestructure(function() {
        return Forms;
      }));
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
    return /* @__PURE__ */ __bunny_createElement(Alert, {
      title,
      confirmText,
      confirmColor,
      isConfirmButtonDisabled: error.length !== 0,
      onConfirm: onConfirmWrapper,
      cancelText,
      onCancel: function() {
        return Alerts.close();
      }
    }, /* @__PURE__ */ __bunny_createElement(LegacyFormInput, {
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
    }));
  }
  var Alerts;
  var init_InputAlert = __esm({
    "src/lib/ui/components/InputAlert.tsx"() {
      "use strict";
      init_components();
      init_utils();
      Alerts = findByPropsProxy("openLazy", "close");
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
    var _internalOptions;
    var internalOptions = options;
    internalOptions.body = options.content;
    delete internalOptions.content;
    (_internalOptions = internalOptions).isDismissable ?? (_internalOptions.isDismissable = true);
    return Alerts2.show(internalOptions);
  }
  var Alerts2, showCustomAlert, showInputAlert;
  var init_alerts = __esm({
    "src/lib/ui/alerts.ts"() {
      "use strict";
      init_utils();
      init_InputAlert();
      Alerts2 = findByPropsProxy("openLazy", "close");
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
  var _color_default, semanticColors, rawColors, ThemeStore2, colorResolver;
  var init_color = __esm({
    "src/lib/ui/color.ts"() {
      "use strict";
      init_themes();
      init_common();
      init_utils();
      semanticColors = color?.default?.colors ?? constants?.ThemeColorMap;
      rawColors = color?.default?.unsafe_rawColors ?? constants?.Colors;
      ThemeStore2 = findByStoreNameProxy("ThemeStore");
      colorResolver = (_color_default = color.default).meta ?? (_color_default.meta = color.default.internal);
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
      sheet[key] = new Proxy(import_react_native5.StyleSheet.flatten(sheet[key]), {
        get(target, prop, receiver) {
          var res = Reflect.get(target, prop, receiver);
          return isSemanticColor(res) ? resolveSemanticColor(res) : res;
        }
      });
    }
    return sheet;
  }
  var import_react_native5, CompatfulRedesign, TextStyleSheet;
  var init_styles = __esm({
    "src/lib/ui/styles.ts"() {
      "use strict";
      init_lazy();
      init_utils();
      init_color();
      import_react_native5 = __toESM(require_react_native());
      CompatfulRedesign = findByPropsProxy("createStyles");
      ({ TextStyleSheet } = lazyDestructure(function() {
        return findByProps("TextStyleSheet");
      }));
    }
  });

  // src/lib/ui/components/Codeblock.tsx
  function Codeblock({ selectable, style, children }) {
    if (!selectable)
      return /* @__PURE__ */ __bunny_createElement(TextBasedCodeblock, {
        style,
        children
      });
    return import_react_native6.Platform.select({
      ios: /* @__PURE__ */ __bunny_createElement(InputBasedCodeblock, {
        style,
        children
      }),
      default: /* @__PURE__ */ __bunny_createElement(TextBasedCodeblock, {
        style,
        children,
        selectable: true
      })
    });
  }
  var import_react_native6, useStyles, InputBasedCodeblock, TextBasedCodeblock;
  var init_Codeblock = __esm({
    "src/lib/ui/components/Codeblock.tsx"() {
      "use strict";
      init_common();
      init_color();
      init_styles();
      import_react_native6 = __toESM(require_react_native());
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
        return /* @__PURE__ */ __bunny_createElement(import_react_native6.TextInput, {
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
        return /* @__PURE__ */ __bunny_createElement(import_react_native6.Text, {
          selectable,
          style: [
            useStyles().codeBlock,
            style && style
          ]
        }, children);
      };
    }
  });

  // src/lib/ui/components/ContextMenu.tsx
  function ContextMenu(props) {
    var ref = React.useRef(null);
    React.useEffect(function() {
      if (import_react_native7.Platform.OS !== "android")
        return;
      var ctxMenuReactTag = ref.current?._children?.[0]?._nativeTag;
      return function() {
        if (!ctxMenuReactTag)
          return;
        var unpatch2 = instead2("setAccessibilityFocus", import_react_native7.AccessibilityInfo, function([tag], orig) {
          if (tag !== ctxMenuReactTag) {
            return orig.apply(import_react_native7.AccessibilityInfo, [
              tag
            ]);
          } else {
            unpatch2();
          }
        });
      };
    }, []);
    return /* @__PURE__ */ __bunny_createElement(import_react_native7.View, {
      ref
    }, /* @__PURE__ */ __bunny_createElement(_ContextMenu, props));
  }
  var import_react_native7, _ContextMenu;
  var init_ContextMenu = __esm({
    "src/lib/ui/components/ContextMenu.tsx"() {
      "use strict";
      init_patcher();
      init_lazy();
      init_utils();
      import_react_native7 = __toESM(require_react_native());
      ({ ContextMenu: _ContextMenu } = lazyDestructure(function() {
        return findByProps("ContextMenu");
      }));
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_class_call_check.js
  function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor))
      throw new TypeError("Cannot call a class as a function");
  }
  var init_class_call_check = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_class_call_check.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_create_class.js
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
    "node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_create_class.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_define_property.js
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
    "node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_define_property.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_set_prototype_of.js
  function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _set_prototype_of(o, p);
  }
  var init_set_prototype_of = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_set_prototype_of.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_inherits.js
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
    "node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_inherits.js"() {
      init_set_prototype_of();
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_get_prototype_of.js
  function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o2) {
      return o2.__proto__ || Object.getPrototypeOf(o2);
    };
    return _get_prototype_of(o);
  }
  var init_get_prototype_of = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_get_prototype_of.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_is_native_reflect_construct.js
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
    "node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_is_native_reflect_construct.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_assert_this_initialized.js
  function _assert_this_initialized(self) {
    if (self === void 0)
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
  }
  var init_assert_this_initialized = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_assert_this_initialized.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_type_of.js
  function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
  }
  var init_type_of = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_type_of.js"() {
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_possible_constructor_return.js
  function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function"))
      return call;
    return _assert_this_initialized(self);
  }
  var init_possible_constructor_return = __esm({
    "node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_possible_constructor_return.js"() {
      init_assert_this_initialized();
      init_type_of();
    }
  });

  // node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_create_super.js
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
    "node_modules/.pnpm/@swc+helpers@0.5.11/node_modules/@swc/helpers/esm/_create_super.js"() {
      init_get_prototype_of();
      init_is_native_reflect_construct();
      init_possible_constructor_return();
    }
  });

  // src/lib/ui/components/ErrorBoundary.tsx
  var import_react_native8, styles, _React_Component, ErrorBoundary;
  var init_ErrorBoundary = __esm({
    "src/lib/ui/components/ErrorBoundary.tsx"() {
      "use strict";
      init_class_call_check();
      init_create_class();
      init_define_property();
      init_inherits();
      init_create_super();
      init_i18n();
      init_common();
      init_components();
      init_components2();
      init_styles();
      import_react_native8 = __toESM(require_react_native());
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
              return /* @__PURE__ */ __bunny_createElement(import_react_native8.ScrollView, {
                style: styles.view
              }, /* @__PURE__ */ __bunny_createElement(LegacyFormText, {
                style: styles.title
              }, Strings.UH_OH), /* @__PURE__ */ __bunny_createElement(Codeblock, {
                selectable: true,
                style: {
                  marginBottom: 5
                }
              }, this.state.error.name), /* @__PURE__ */ __bunny_createElement(Codeblock, {
                selectable: true,
                style: {
                  marginBottom: 5
                }
              }, this.state.error.message), this.state.error.stack && /* @__PURE__ */ __bunny_createElement(import_react_native8.ScrollView, {
                style: {
                  maxHeight: 420,
                  marginBottom: 5
                }
              }, /* @__PURE__ */ __bunny_createElement(Codeblock, {
                selectable: true
              }, this.state.error.stack)), /* @__PURE__ */ __bunny_createElement(Button, {
                size: "md",
                variant: "destructive",
                onPress: function() {
                  return _this.setState({
                    hasErr: false
                  });
                },
                text: Strings.RETRY
              }));
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
    return /* @__PURE__ */ __bunny_createElement(import_react_native9.Image, {
      style: {
        transform: [
          {
            scale: 0.8
          }
        ]
      },
      source: requireAssetIndex("search")
    });
  }
  function Search_default({ onChangeText, placeholder, style }) {
    var [query, setQuery] = React.useState("");
    var onChange = function(value) {
      setQuery(value);
      onChangeText?.(value);
    };
    return /* @__PURE__ */ __bunny_createElement(ErrorBoundary, null, /* @__PURE__ */ __bunny_createElement(import_react_native9.View, {
      style
    }, /* @__PURE__ */ __bunny_createElement(TextInput, {
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
    })));
  }
  var import_react_native9;
  var init_Search = __esm({
    "src/lib/ui/components/Search.tsx"() {
      "use strict";
      init_i18n();
      init_assets();
      init_components();
      init_ErrorBoundary();
      import_react_native9 = __toESM(require_react_native());
    }
  });

  // src/lib/ui/components/Summary.tsx
  function Summary({ label, icon, noPadding = false, noAnimation = false, children }) {
    var [hidden, setHidden] = React.useState(true);
    return /* @__PURE__ */ __bunny_createElement(React.Fragment, null, /* @__PURE__ */ __bunny_createElement(TableRow, {
      label,
      icon: icon && /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex(icon)
      }),
      trailing: /* @__PURE__ */ __bunny_createElement(LegacyFormRow.Arrow, {
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
          import_react_native10.LayoutAnimation.configureNext(import_react_native10.LayoutAnimation.Presets.easeInEaseOut);
      }
    }), !hidden && /* @__PURE__ */ __bunny_createElement(React.Fragment, null, /* @__PURE__ */ __bunny_createElement(import_react_native10.View, {
      style: !noPadding && {
        paddingHorizontal: 15
      }
    }, children)));
  }
  var import_react_native10;
  var init_Summary = __esm({
    "src/lib/ui/components/Summary.tsx"() {
      "use strict";
      init_assets();
      init_components();
      import_react_native10 = __toESM(require_react_native());
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

  // glob-react:react
  var require_react = __commonJS({
    "glob-react:react"(exports, module) {
      Object.defineProperty(module, "exports", { get: () => globalThis.React });
    }
  });

  // src/core/polyfills/vendettaObject.ts
  async function createVdPluginObject(plugin) {
    return {
      ...window.vendetta,
      plugin: {
        id: plugin.id,
        manifest: plugin.manifest,
        // Wrapping this with wrapSync is NOT an option.
        storage: await createStorage(createMMKVBackend(plugin.id))
      },
      logger: new logModule(`Bunny \xBB ${plugin.manifest.name}`)
    };
  }
  var import_react, import_react_native11, initVendettaObject, cyrb64, cyrb64Hash;
  var init_vendettaObject = __esm({
    "src/core/polyfills/vendettaObject.ts"() {
      "use strict";
      init_assets();
      init_commands();
      init_loader();
      init_patcher();
      init_storage();
      init_storage();
      init_debug();
      init_plugins2();
      init_themes();
      init_settings();
      init_utils2();
      init_logger();
      init_metro();
      init_common();
      init_components();
      init_components();
      init_proxy();
      init_alerts();
      init_color();
      init_components2();
      init_styles();
      init_toasts();
      import_react = __toESM(require_react());
      import_react_native11 = __toESM(require_react_native());
      initVendettaObject = function() {
        var api = window.vendetta = {
          patcher: {
            before: patcher_default.before,
            after: patcher_default.after,
            instead: patcher_default.instead
          },
          metro: {
            modules: window.modules,
            find: function(filter) {
              return findExports(createSimpleFilter(filter, cyrb64Hash(new Error().stack)));
            },
            findAll: function(filter) {
              return findAllExports(createSimpleFilter(filter, cyrb64Hash(new Error().stack)));
            },
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
                      (0, import_react.useEffect)(function() {
                        return console.warn("Discord has removed 'ActionSheetContentContainer', please move into something else. This has been temporarily replaced with View");
                      }, []);
                      return (0, import_react.createElement)(import_react_native11.View, null, children);
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
              moment,
              chroma,
              lodash,
              util
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
              return without(object, ...keys);
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
              get Alert() {
                return getFindContext(Alert).unproxy();
              },
              get Button() {
                return getFindContext(Button).unproxy();
              },
              get HelpMessage() {
                return getFindContext(HelpMessage).unproxy();
              },
              get SafeAreaView() {
                return getFindContext(SafeAreaView).unproxy();
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
                return requireAssetByName(name);
              },
              getAssetByID: function(id) {
                return requireAssetByIndex(id);
              },
              getAssetIDByName: function(name) {
                return requireAssetIndex(name);
              }
            },
            semanticColors,
            rawColors
          },
          plugins: {
            plugins,
            fetchPlugin: function(id) {
              return fetchPlugin(id);
            },
            installPlugin: function(id, enabled2) {
              return installPlugin(id, enabled2);
            },
            startPlugin: function(id) {
              return startPlugin(id);
            },
            stopPlugin: function(id, disable) {
              return stopPlugin(id, disable);
            },
            removePlugin: function(id) {
              return removePlugin(id);
            },
            getSettings: function(id) {
              return getSettings(id);
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
              return awaitSyncWrapper(store);
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
      cyrb64 = function(str, seed = 0) {
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
      };
      cyrb64Hash = function(str, seed = 0) {
        var [h2, h1] = cyrb64(str, seed);
        return h2.toString(36).padStart(7, "0") + h1.toString(36).padStart(7, "0");
      };
    }
  });

  // src/lib/managers/plugins.ts
  var plugins_exports2 = {};
  __export(plugins_exports2, {
    evalPlugin: () => evalPlugin,
    fetchPlugin: () => fetchPlugin,
    getSettings: () => getSettings,
    initPlugins: () => initPlugins,
    installPlugin: () => installPlugin,
    plugins: () => plugins,
    removePlugin: () => removePlugin,
    startPlugin: () => startPlugin,
    stopPlugin: () => stopPlugin
  });
  async function pluginFetch(url2) {
    if (url2.startsWith(PROXY_PREFIX)) {
      url2 = url2.replace(PROXY_PREFIX, BUNNY_PROXY_PREFIX);
    }
    return await safeFetch(url2, {
      cache: "no-store"
    });
  }
  async function fetchPlugin(id) {
    if (!id.endsWith("/"))
      id += "/";
    var existingPlugin = plugins[id];
    var pluginManifest;
    try {
      pluginManifest = await (await pluginFetch(id + "manifest.json")).json();
    } catch (e) {
      throw new Error(`Failed to fetch manifest for ${id}`);
    }
    var pluginJs;
    if (existingPlugin?.manifest.hash !== pluginManifest.hash) {
      try {
        pluginJs = await (await pluginFetch(id + (pluginManifest.main || "index.js"))).text();
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
      js: pluginJs ?? existingPlugin.js,
      error: existingPlugin?.error
    };
  }
  async function installPlugin(id, enabled2 = true) {
    if (!id.endsWith("/"))
      id += "/";
    if (typeof id !== "string" || id in plugins)
      throw new Error("Plugin already installed");
    await fetchPlugin(id);
    if (enabled2)
      await startPlugin(id);
  }
  async function evalPlugin(plugin) {
    var vdObject = await createVdPluginObject(plugin);
    var pluginString = `vendetta=>{return ${plugin.js}}
//# sourceURL=${plugin.id}?hash=${plugin.manifest.hash}`;
    var raw = (0, eval)(pluginString)(vdObject);
    var ret = typeof raw === "function" ? raw() : raw;
    return ret?.default ?? ret ?? {};
  }
  async function startPlugin(id) {
    if (!id.endsWith("/"))
      id += "/";
    var plugin = plugins[id];
    if (!plugin)
      throw new Error("Attempted to start non-existent plugin");
    try {
      if (!settings.safeMode?.enabled) {
        var pluginRet = await evalPlugin(plugin);
        loadedPlugins[id] = pluginRet;
        pluginRet.onLoad?.();
      }
      delete plugin.error;
      plugin.enabled = true;
    } catch (e) {
      logger.error(`Plugin ${plugin.id} errored whilst loading, and will be unloaded`, e);
      plugin.error = e instanceof Error ? e.stack : String(e);
      try {
        loadedPlugins[plugin.id]?.onUnload?.();
      } catch (e2) {
        logger.error(`Plugin ${plugin.id} errored whilst unloading`, e2);
      }
      delete loadedPlugins[id];
      plugin.enabled = false;
    }
  }
  function stopPlugin(id, disable = true) {
    if (!id.endsWith("/"))
      id += "/";
    var plugin = plugins[id];
    var pluginRet = loadedPlugins[id];
    if (!plugin)
      throw new Error("Attempted to stop non-existent plugin");
    if (!settings.safeMode?.enabled) {
      try {
        pluginRet?.onUnload?.();
      } catch (e) {
        logger.error(`Plugin ${plugin.id} errored whilst unloading`, e);
      }
      delete loadedPlugins[id];
    }
    disable && (plugin.enabled = false);
  }
  async function removePlugin(id) {
    if (!id.endsWith("/"))
      id += "/";
    var plugin = plugins[id];
    if (plugin.enabled)
      stopPlugin(id);
    delete plugins[id];
    await purgeStorage(id);
  }
  async function initPlugins() {
    await awaitSyncWrapper(settings);
    await awaitSyncWrapper(plugins);
    var allIds = Object.keys(plugins);
    if (!settings.safeMode?.enabled) {
      await allSettled(allIds.filter(function(pl) {
        return plugins[pl].enabled;
      }).map(async function(pl) {
        return plugins[pl].update && await fetchPlugin(pl).catch(function(e) {
          return logger.error(e.message);
        }), await startPlugin(pl);
      }));
      allIds.filter(function(pl) {
        return !plugins[pl].enabled && plugins[pl].update;
      }).forEach(function(pl) {
        return fetchPlugin(pl);
      });
    }
    return stopAllPlugins;
  }
  var plugins, loadedPlugins, stopAllPlugins, getSettings;
  var init_plugins2 = __esm({
    "src/lib/managers/plugins.ts"() {
      "use strict";
      init_allSettled();
      init_vendettaObject();
      init_storage();
      init_settings();
      init_utils2();
      init_constants();
      init_logger();
      plugins = wrapSync(createStorage(createMMKVBackend("VENDETTA_PLUGINS")));
      loadedPlugins = {};
      stopAllPlugins = function() {
        return Object.keys(loadedPlugins).forEach(function(p) {
          return stopPlugin(p, false);
        });
      };
      getSettings = function(id) {
        return loadedPlugins[id]?.settings;
      };
    }
  });

  // src/core/plugins/quickInstall/forumPost.tsx
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
    useProxy(plugins);
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
        showToast(e.message, requireAssetIndex("Small"));
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
    var patches = [
      // actionSheetPatch(),
      installButtonPatch()
    ];
    return function() {
      return patches.map(function(p) {
        return p();
      });
    };
  }
  var useFirstForumPostMessage, forumReactions, postMap, installButtonPatch;
  var init_forumPost = __esm({
    "src/core/plugins/quickInstall/forumPost.tsx"() {
      "use strict";
      init_i18n();
      init_assets();
      init_loader();
      init_patcher();
      init_storage();
      init_plugins2();
      init_themes();
      init_constants();
      init_lazy();
      init_components();
      init_utils();
      init_components2();
      init_toasts();
      ({ useFirstForumPostMessage } = lazyDestructure(function() {
        return findByProps("useFirstForumPostMessage");
      }));
      forumReactions = findByPropsProxy("MostCommonForumPostReaction");
      postMap = {
        Plugin: {
          storage: plugins,
          urlsFilter: function(url2) {
            return url2.startsWith(PROXY_PREFIX);
          },
          installOrRemove: function(url2) {
            var isInstalled = postMap.Plugin.storage[url2];
            return isInstalled ? removePlugin(url2) : installPlugin(url2);
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
        return after2("MostCommonForumPostReaction", forumReactions, function([{ thread, firstMessage }], res) {
          var [shouldReturn, _, installed, loading, installOrRemove] = useInstaller(thread, firstMessage, true);
          if (shouldReturn)
            return;
          return /* @__PURE__ */ __bunny_createElement(React.Fragment, null, res, /* @__PURE__ */ __bunny_createElement(ErrorBoundary, null, /* @__PURE__ */ __bunny_createElement(Button, {
            size: "sm",
            loading,
            disabled: loading,
            // variant={installed ? "destructive" : "primary"} crashes older version because "destructive" was renamed from "danger" and there's no sane way for compat check horror
            variant: installed ? "secondary" : "primary",
            text: installed ? Strings.UNINSTALL : Strings.INSTALL,
            onPress: installOrRemove,
            icon: requireAssetIndex(installed ? "ic_message_delete" : "DownloadIcon"),
            style: {
              marginLeft: 8
            }
          })));
        });
      };
    }
  });

  // src/core/plugins/quickInstall/url.tsx
  function typeFromUrl(url2) {
    if (url2.startsWith(PROXY_PREFIX)) {
      return "plugin";
    } else if (url2.endsWith(".json") && isThemeSupported()) {
      return "theme";
    }
  }
  function installWithToast(type, url2) {
    (type === "plugin" ? installPlugin : installTheme)(url2).then(function() {
      showToast(Strings.SUCCESSFULLY_INSTALLED, requireAssetIndex("Check"));
    }).catch(function(e) {
      showToast(e.message, requireAssetIndex("Small"));
    });
  }
  function url_default() {
    var patches = new Array();
    patches.push(after2("showSimpleActionSheet", showSimpleActionSheet, function(args) {
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
    patches.push(instead2("handleClick", handleClick, async function(args, orig) {
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
      return patches.forEach(function(p) {
        return p();
      });
    };
  }
  var showSimpleActionSheet, handleClick, openURL, getChannelId, getChannel;
  var init_url = __esm({
    "src/core/plugins/quickInstall/url.tsx"() {
      "use strict";
      init_i18n();
      init_assets();
      init_loader();
      init_patcher();
      init_plugins2();
      init_themes();
      init_constants();
      init_lazy();
      init_common();
      init_filters();
      init_finders();
      init_utils();
      init_alerts();
      init_toasts();
      showSimpleActionSheet = findExports(byMutableProp("showSimpleActionSheet"));
      handleClick = findByPropsProxy("handleClick");
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

  // src/core/plugins/quickInstall/index.ts
  var quickInstall_exports = {};
  __export(quickInstall_exports, {
    default: () => onLoad
  });
  function onLoad() {
    var patches = new Array();
    patches.push(forumPost_default());
    patches.push(url_default());
    return function() {
      return patches.forEach(function(p) {
        return p();
      });
    };
  }
  var init_quickInstall = __esm({
    "src/core/plugins/quickInstall/index.ts"() {
      "use strict";
      init_forumPost();
      init_url();
    }
  });

  // src/core/plugins/index.ts
  function initCorePlugins() {
    var unloads = [
      (init_quickInstall(), __toCommonJS(quickInstall_exports))
    ].map(function(p) {
      return p.default();
    });
    return function() {
      return unloads.forEach(function(m) {
        return typeof m === "function" && m();
      });
    };
  }
  var init_plugins3 = __esm({
    "src/core/plugins/index.ts"() {
      "use strict";
    }
  });

  // src/assets/icons/pyoncord.png
  var pyoncord_default;
  var init_pyoncord = __esm({
    "src/assets/icons/pyoncord.png"() {
      pyoncord_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABoBJREFUeF7lW1nIVlUUXasom80kijJKaVQzGtTUjCJteNBmeqigssnIpDIqwmw0GqhQi4iw8SEaHtKgMpNKM7SiyUZpLppoTi0rd2f9nCu36/2+79zxv/5t8MV/n333WWefffb0EQ0iM+sH4AEAowG8CGAqycVVqsgqhWeVbWavAtg/tu4vABNIPphVVih/YwAws2EAlrRQfChJgVM6NQmARwGc0GKHX5PcofTdA2gSAJ8A2KXNJueQPLpsEJoEwI8A+rTZ4GrnIAeQ/KpMEJoEwCoAm3TY3DKSezcKADPbCMDWADYEIK/9B4CVJC2LomYWwv8PgC1JCqxSqJAFmNlOAF6PAfA3ACn3MYBLSD4bqmUgABI3l+T4ULmd+IoCcDeAs9p8RI5NPDNJrminTAYAZAVbkJSlFaaiALwJYEiAFh8CuJHk7Fa8ZqaNbRAgSyzjSc4N5G3LVhQAmfiYDIosBXAGyXeSa8xMJ9orUNb7AAZm9TNpsosCMNnd/9sDlY7Y/gRwAYDZJOUzusjMfvK+JFRcX5J6OgtRUQB2B/BBDg3k8ZeQHBED4AsASoZCaTTJRaHMrfiKAqD1jwM4NqcinwE4mOTnZiYgBWgozSN5RChzJQB40x0A4KMCivwO4GQAFwI4JIMcRYa9i74GhSwgZr5XuWs8LYPyaazPAMh6ojvLeop8tywA5L0V/FSSsbXZ4Eh3DV7udgD8VdgMwK8+JC6iU5a115GcmmVBkrcUC4hdhYPcPX6+RhAWkDysMQB4SzgXwB0Zoroi+q8iKcvLTaVaQMwSZgGYWBMIfUj+nBeBSgDwljADwHk1XIdCL0FlAMRAOL/i0tsgku82zgI8AMruLgNwfV4FA9btQ/KtAL5UlkotIOYTjgdwr6o5eRVts244SWWZuagWALw1DFUGCGBwLk1bLxpG8pW8MmsDwIPQ25W+7wNwTF6FU9bJ2U7L+xLUCkDsSij5keLblASEagmjSL6XVV63AOCtQSVw3d2yytxr3JN7LUklZsHUnQAMcnUE1RRVTi+TXgIwjqSsoiN1CwBmtqvzA28A2LyjhvkYlCKr9vhcp+W1A2BmewB4AcB2nZQr+Hc1aaaQlK9pSbUC4E9eLfCynF8IRoo/JpJUMXYdqgUAM9N3RgFYGKJxDh71FK5WAwbAvgAeShRnPgWwZxoIdQFwEwCV0DfOsbmQJWPi993MZGGqMsdT5e9VdE3GC5UCYGY69ehUQjaSh0dv/5B4j0FCXJ8hrWexHMAIkj9EH6oEADNTZUjNj+MqeOaSIM0nOTb5n2amStH8FEQVNh8eWcJaAHybe7gfU9kLgEzmbd/91VCCujArXdd3hdA2M73fKobKzDTYIK+uRsel7tT75jnKnGvUUtuWpMrra8nMNG12aguZatjKMa7pAsDMtnK9tkdylKVz6lz6snsATFKPwB+M+gtppx//sBoyCyMAkuNppWtYg0CVxeT4tvfPbKcI8zHXpD2RZnaOW3RXDQo27ROrSfYSAGowylv/30iR4qYCQBFSVe9zk0Fd5GKH0QJAPfpO96XJG8mjmyJHOcHFAuA1APvlkbIerzmN5P3SXwBc7IaOblmPN5NVdaXK/RUDRACoTqcOq4KfptA37l1XuKpma0QKrlQ/2LEEJY8i+XQXAD4Q6u+uwZwKKrbtdNWYjMboNDClf0qTl+ktb5W6RsLMbDc/naZK80Cvt/YQSvruYJIr46GwanQTAJzph5Y1/Vk2aVZQCck8xR4kpUgpZGYCQDHNOK9/p6bpRSRvS02GzEx1tZGlaAbopH8DcDnJO0uS2VaMmWnzk1xz9hrXldIob9o+ldf0W+cPZiafkLvbmtDsSY3MytQ7mXUVwJiZrFozTKoK6QcZSVrXAszsSABPFVRIs4MzyjTxgvoo4TsAwCm+Yy2rEC1PswC9CAfm+KBMSsWPW0l+l2N9LUt8UfYKf8Vn/gcAM9MT82VGTeTYngBwdqeB6Ixya2FPAnCSKx4+HPhlBRJ6vsaS/DZwTePYkgCozx7SqpJXl69YmqzFNW6HHRSKxwGhc79XApgV2npqOiBxAE73/ftWOquRqbJT7mGEJoIRhcIaZVGjMm14QT+BucHVDKa7oUSlkT2KIgAUT6/zIwbXYFTmpLxZU909kiIAprhM6+bEDqf7Hy93pY09lSIAFriO7aF+k7/4aYs0i+hxOEQAqIGgNrJ+iDS5p3j4kNP6F9f7+CyBdXonAAAAAElFTkSuQmCC";
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
      navigation2 ?? (navigation2 = tabsNavigationRef.getRootNavigationRef());
      navigation2.navigate("VendettaCustomPage", {
        ...screenOptions,
        render: function() {
          return /* @__PURE__ */ __bunny_createElement(Component, props);
        }
      });
    };
  }
  var tabsNavigationRef, CustomPageRenderer;
  var init_shared2 = __esm({
    "src/lib/ui/settings/patches/shared.tsx"() {
      "use strict";
      init_common();
      init_utils();
      init_components2();
      tabsNavigationRef = findByPropsProxy("getRootNavigationRef");
      CustomPageRenderer = React.memo(function() {
        var navigation2 = NavigationNative.useNavigation();
        var route = NavigationNative.useRoute();
        var { render: PageComponent, ...args } = route.params;
        React.useEffect(function() {
          return void navigation2.setOptions({
            ...args
          });
        }, []);
        return /* @__PURE__ */ __bunny_createElement(ErrorBoundary, null, /* @__PURE__ */ __bunny_createElement(PageComponent, null));
      });
    }
  });

  // src/lib/ui/settings/patches/panel.tsx
  function SettingsSection() {
    var navigation2 = NavigationNative.useNavigation();
    return /* @__PURE__ */ __bunny_createElement(React.Fragment, null, Object.keys(registeredSections).map(function(sect) {
      return /* @__PURE__ */ __bunny_createElement(LegacyFormSection, {
        key: sect,
        title: sect
      }, registeredSections[sect].filter(function(r) {
        return r.usePredicate?.() ?? true;
      }).map(function(row) {
        return /* @__PURE__ */ __bunny_createElement(LegacyFormRow, {
          label: row.title(),
          leading: /* @__PURE__ */ __bunny_createElement(LegacyFormIcon, {
            source: row.icon
          }),
          trailing: LegacyFormRow.Arrow,
          onPress: wrapOnPress(row.onPress, navigation2, row.render, row.title())
        });
      }));
    }));
  }
  function patchPanelUI(unpatches) {
    unpatches.push(after2("default", findByNameProxy("getScreens", false), function(_a, screens) {
      return {
        ...screens,
        VendettaCustomPage: {
          title: "Bnuuy",
          render: function() {
            return /* @__PURE__ */ __bunny_createElement(CustomPageRenderer, null);
          }
        }
      };
    }));
    var unpatch2 = after2("default", findByNameProxy("UserSettingsOverviewWrapper", false), function(_a, ret) {
      var UserSettingsOverview = findInReactTree(ret.props.children, function(n) {
        return n.type?.name === "UserSettingsOverview";
      });
      unpatches.push(after2("renderSupportAndAcknowledgements", UserSettingsOverview.type.prototype, function(_args, { props: { children } }) {
        var index = children.findIndex(function(c) {
          return c?.type?.name === "UploadLogsButton";
        });
        if (index !== -1)
          children.splice(index, 1);
      }));
      unpatches.push(after2("render", UserSettingsOverview.type.prototype, function(_args, res) {
        var titles = [
          i18n.Messages.BILLING_SETTINGS,
          i18n.Messages.PREMIUM_SETTINGS
        ];
        var sections = findInReactTree(res.props.children, function(n) {
          return n?.children?.[1]?.type === LegacyFormSection;
        }).children;
        var index = sections.findIndex(function(c) {
          return titles.includes(c?.props.label);
        });
        sections.splice(-~index || 4, 0, /* @__PURE__ */ __bunny_createElement(SettingsSection, null));
      }));
    }, true);
    unpatches.push(unpatch2);
  }
  var init_panel = __esm({
    "src/lib/ui/settings/patches/panel.tsx"() {
      "use strict";
      init_patcher();
      init_utils2();
      init_common();
      init_components();
      init_utils();
      init_settings2();
      init_shared2();
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
    unpatches.push(after2("default", SettingsOverviewScreen, function(_, ret) {
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
      init_utils2();
      init_common();
      init_utils();
      init_settings2();
      init_shared2();
      settingConstants = findByPropsProxy("SETTING_RENDERER_CONFIG");
      SettingsOverviewScreen = findByNameProxy("SettingsOverviewScreen", false);
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

  // src/core/ui/settings/pages/General/Version.tsx
  function Version({ label, version, icon }) {
    return /* @__PURE__ */ __bunny_createElement(TableRow, {
      label,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex(icon)
      }),
      trailing: /* @__PURE__ */ __bunny_createElement(LegacyFormText, null, version),
      onPress: function() {
        clipboard.setString(`${label} - ${version}`);
        showToast.showCopyToClipboard();
      }
    });
  }
  var init_Version = __esm({
    "src/core/ui/settings/pages/General/Version.tsx"() {
      "use strict";
      init_assets();
      init_common();
      init_components();
      init_toasts();
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
        label: import_react_native12.Platform.select({
          android: Strings.CODENAME,
          ios: Strings.MACHINE_ID
        }),
        version: debugInfo.device.codename,
        icon: "ic_compose_24px"
      }
    ];
    return /* @__PURE__ */ __bunny_createElement(import_react_native12.ScrollView, {
      style: {
        flex: 1
      },
      contentContainerStyle: {
        paddingBottom: 38
      }
    }, /* @__PURE__ */ __bunny_createElement(Stack, {
      style: {
        paddingVertical: 24,
        paddingHorizontal: 12
      },
      spacing: 24
    }, /* @__PURE__ */ __bunny_createElement(TableRowGroup, {
      title: Strings.VERSIONS
    }, versions.map(function(v) {
      return /* @__PURE__ */ __bunny_createElement(Version, {
        label: v.label,
        version: v.version,
        icon: v.icon
      });
    })), /* @__PURE__ */ __bunny_createElement(TableRowGroup, {
      title: Strings.PLATFORM
    }, platformInfo.map(function(p) {
      return /* @__PURE__ */ __bunny_createElement(Version, {
        label: p.label,
        version: p.version,
        icon: p.icon
      });
    }))));
  }
  var import_react_native12;
  var init_About = __esm({
    "src/core/ui/settings/pages/General/About.tsx"() {
      "use strict";
      init_i18n();
      init_Version();
      init_storage();
      init_debug();
      init_settings();
      init_components();
      import_react_native12 = __toESM(require_react_native());
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
    return /* @__PURE__ */ __bunny_createElement(import_react_native13.ScrollView, {
      style: {
        flex: 1
      },
      contentContainerStyle: {
        paddingBottom: 38
      }
    }, /* @__PURE__ */ __bunny_createElement(Stack, {
      style: {
        paddingVertical: 24,
        paddingHorizontal: 12
      },
      spacing: 24
    }, /* @__PURE__ */ __bunny_createElement(TableRowGroup, {
      title: Strings.INFO
    }, /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: Strings.BUNNY,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: {
          uri: pyoncord_default
        }
      }),
      trailing: /* @__PURE__ */ __bunny_createElement(TableRow.TrailingText, {
        text: debugInfo.bunny.version
      })
    }), /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: "Discord",
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("Discord")
      }),
      trailing: /* @__PURE__ */ __bunny_createElement(TableRow.TrailingText, {
        text: `${debugInfo.discord.version} (${debugInfo.discord.build})`
      })
    }), /* @__PURE__ */ __bunny_createElement(TableRow, {
      arrow: true,
      label: Strings.ABOUT,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("CircleInformationIcon-primary")
      }),
      trailing: TableRow.Arrow,
      onPress: function() {
        return navigation2.push("VendettaCustomPage", {
          title: Strings.ABOUT,
          render: function() {
            return /* @__PURE__ */ __bunny_createElement(About, null);
          }
        });
      }
    })), /* @__PURE__ */ __bunny_createElement(TableRowGroup, {
      title: Strings.LINKS
    }, /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: Strings.DISCORD_SERVER,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("Discord")
      }),
      trailing: TableRow.Arrow,
      onPress: function() {
        return url.openDeeplink(DISCORD_SERVER);
      }
    }), /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: Strings.GITHUB,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("img_account_sync_github_white")
      }),
      trailing: TableRow.Arrow,
      onPress: function() {
        return url.openURL(GITHUB);
      }
    })), /* @__PURE__ */ __bunny_createElement(TableRowGroup, {
      title: Strings.ACTIONS
    }, /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: Strings.RELOAD_DISCORD,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("ic_message_retry")
      }),
      onPress: function() {
        return import_react_native13.NativeModules.BundleUpdaterManager.reload();
      }
    }), /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: settings.safeMode?.enabled ? Strings.RELOAD_IN_NORMAL_MODE : Strings.RELOAD_IN_SAFE_MODE,
      subLabel: settings.safeMode?.enabled ? Strings.RELOAD_IN_NORMAL_MODE_DESC : Strings.RELOAD_IN_SAFE_MODE_DESC,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("ic_privacy_24px")
      }),
      onPress: toggleSafeMode
    }), /* @__PURE__ */ __bunny_createElement(TableSwitchRow, {
      label: Strings.DEVELOPER_SETTINGS,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("ic_progress_wrench_24px")
      }),
      value: settings.developerSettings,
      onValueChange: function(v) {
        settings.developerSettings = v;
      }
    })), /* @__PURE__ */ __bunny_createElement(TableRowGroup, {
      title: Strings.MISCELLANEOUS
    }, /* @__PURE__ */ __bunny_createElement(TableSwitchRow, {
      label: Strings.SETTINGS_ACTIVATE_DISCORD_EXPERIMENTS,
      subLabel: Strings.SETTINGS_ACTIVATE_DISCORD_EXPERIMENTS_DESC,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("ic_progress_wrench_24px")
      }),
      value: settings.enableDiscordDeveloperSettings,
      onValueChange: function(v) {
        settings.enableDiscordDeveloperSettings = v;
      }
    }))));
  }
  var import_react_native13;
  var init_General = __esm({
    "src/core/ui/settings/pages/General/index.tsx"() {
      "use strict";
      init_i18n();
      init_settings3();
      init_About();
      init_assets();
      init_storage();
      init_debug();
      init_settings();
      init_constants();
      init_common();
      init_components();
      import_react_native13 = __toESM(require_react_native());
    }
  });

  // node_modules/.pnpm/fuzzysort@2.0.4/node_modules/fuzzysort/fuzzysort.js
  var require_fuzzysort = __commonJS({
    "node_modules/.pnpm/fuzzysort@2.0.4/node_modules/fuzzysort/fuzzysort.js"(exports, module) {
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
          if (search == "farzher")
            return {
              target: "farzher was here (^-^*)/",
              score: 0,
              _indexes: [
                0
              ]
            };
          if (!search || !target)
            return NULL;
          var preparedSearch = getPreparedSearch(search);
          if (!isObj(target))
            target = getPrepared(target);
          var searchBitflags = preparedSearch.bitflags;
          if ((searchBitflags & target._bitflags) !== searchBitflags)
            return NULL;
          return algorithm(preparedSearch, target);
        };
        var go = function(search, targets, options) {
          if (search == "farzher")
            return [
              {
                target: "farzher was here (^-^*)/",
                score: 0,
                _indexes: [
                  0
                ],
                obj: targets ? targets[0] : NULL
              }
            ];
          if (!search)
            return options && options.all ? all(search, targets, options) : noResults;
          var preparedSearch = getPreparedSearch(search);
          var searchBitflags = preparedSearch.bitflags;
          var containsSpace = preparedSearch.containsSpace;
          var threshold = options && options.threshold || INT_MIN;
          var limit = options && options["limit"] || INT_MAX;
          var resultsLen = 0;
          var limitedCount = 0;
          var targetsLen = targets.length;
          if (options && options.key) {
            var key = options.key;
            for (var i = 0; i < targetsLen; ++i) {
              var obj = targets[i];
              var target = getValue(obj, key);
              if (!target)
                continue;
              if (!isObj(target))
                target = getPrepared(target);
              if ((searchBitflags & target._bitflags) !== searchBitflags)
                continue;
              var result = algorithm(preparedSearch, target);
              if (result === NULL)
                continue;
              if (result.score < threshold)
                continue;
              result = {
                target: result.target,
                _targetLower: "",
                _targetLowerCodes: NULL,
                _nextBeginningIndexes: NULL,
                _bitflags: 0,
                score: result.score,
                _indexes: result._indexes,
                obj
              };
              if (resultsLen < limit) {
                q.add(result);
                ++resultsLen;
              } else {
                ++limitedCount;
                if (result.score > q.peek().score)
                  q.replaceTop(result);
              }
            }
          } else if (options && options.keys) {
            var scoreFn = options["scoreFn"] || defaultScoreFn;
            var keys = options.keys;
            var keysLen = keys.length;
            for (var i = 0; i < targetsLen; ++i) {
              var obj = targets[i];
              var objResults = new Array(keysLen);
              for (var keyI = 0; keyI < keysLen; ++keyI) {
                var key = keys[keyI];
                var target = getValue(obj, key);
                if (!target) {
                  objResults[keyI] = NULL;
                  continue;
                }
                if (!isObj(target))
                  target = getPrepared(target);
                if ((searchBitflags & target._bitflags) !== searchBitflags)
                  objResults[keyI] = NULL;
                else
                  objResults[keyI] = algorithm(preparedSearch, target);
              }
              objResults.obj = obj;
              var score = scoreFn(objResults);
              if (score === NULL)
                continue;
              if (score < threshold)
                continue;
              objResults.score = score;
              if (resultsLen < limit) {
                q.add(objResults);
                ++resultsLen;
              } else {
                ++limitedCount;
                if (score > q.peek().score)
                  q.replaceTop(objResults);
              }
            }
          } else {
            for (var i = 0; i < targetsLen; ++i) {
              var target = targets[i];
              if (!target)
                continue;
              if (!isObj(target))
                target = getPrepared(target);
              if ((searchBitflags & target._bitflags) !== searchBitflags)
                continue;
              var result = algorithm(preparedSearch, target);
              if (result === NULL)
                continue;
              if (result.score < threshold)
                continue;
              if (resultsLen < limit) {
                q.add(result);
                ++resultsLen;
              } else {
                ++limitedCount;
                if (result.score > q.peek().score)
                  q.replaceTop(result);
              }
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
        var highlight = function(result, hOpen, hClose) {
          if (typeof hOpen === "function")
            return highlightCallback(result, hOpen);
          if (result === NULL)
            return NULL;
          if (hOpen === void 0)
            hOpen = "<b>";
          if (hClose === void 0)
            hClose = "</b>";
          var highlighted = "";
          var matchesIndex = 0;
          var opened = false;
          var target = result.target;
          var targetLen = target.length;
          var indexes2 = result._indexes;
          indexes2 = indexes2.slice(0, indexes2.len).sort(function(a, b) {
            return a - b;
          });
          for (var i = 0; i < targetLen; ++i) {
            var char = target[i];
            if (indexes2[matchesIndex] === i) {
              ++matchesIndex;
              if (!opened) {
                opened = true;
                highlighted += hOpen;
              }
              if (matchesIndex === indexes2.length) {
                highlighted += char + hClose + target.substr(i + 1);
                break;
              }
            } else {
              if (opened) {
                opened = false;
                highlighted += hClose;
              }
            }
            highlighted += char;
          }
          return highlighted;
        };
        var highlightCallback = function(result, cb) {
          if (result === NULL)
            return NULL;
          var target = result.target;
          var targetLen = target.length;
          var indexes2 = result._indexes;
          indexes2 = indexes2.slice(0, indexes2.len).sort(function(a, b) {
            return a - b;
          });
          var highlighted = "";
          var matchI = 0;
          var indexesI = 0;
          var opened = false;
          var result = [];
          for (var i = 0; i < targetLen; ++i) {
            var char = target[i];
            if (indexes2[indexesI] === i) {
              ++indexesI;
              if (!opened) {
                opened = true;
                result.push(highlighted);
                highlighted = "";
              }
              if (indexesI === indexes2.length) {
                highlighted += char;
                result.push(cb(highlighted, matchI++));
                highlighted = "";
                result.push(target.substr(i + 1));
                break;
              }
            } else {
              if (opened) {
                opened = false;
                result.push(cb(highlighted, matchI++));
                highlighted = "";
              }
            }
            highlighted += char;
          }
          return result;
        };
        var indexes = function(result) {
          return result._indexes.slice(0, result._indexes.len).sort(function(a, b) {
            return a - b;
          });
        };
        var prepare = function(target) {
          if (typeof target !== "string")
            target = "";
          var info = prepareLowerInfo(target);
          return {
            "target": target,
            _targetLower: info._lower,
            _targetLowerCodes: info.lowerCodes,
            _nextBeginningIndexes: NULL,
            _bitflags: info.bitflags,
            "score": NULL,
            _indexes: [
              0
            ],
            "obj": NULL
          };
        };
        var prepareSearch = function(search) {
          if (typeof search !== "string")
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
            bitflags: info.bitflags,
            containsSpace: info.containsSpace,
            _lower: info._lower,
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
        var all = function(search, targets, options) {
          var results = [];
          results.total = targets.length;
          var limit = options && options.limit || INT_MAX;
          if (options && options.key) {
            for (var i = 0; i < targets.length; i++) {
              var obj = targets[i];
              var target = getValue(obj, options.key);
              if (!target)
                continue;
              if (!isObj(target))
                target = getPrepared(target);
              target.score = INT_MIN;
              target._indexes.len = 0;
              var result = target;
              result = {
                target: result.target,
                _targetLower: "",
                _targetLowerCodes: NULL,
                _nextBeginningIndexes: NULL,
                _bitflags: 0,
                score: target.score,
                _indexes: NULL,
                obj
              };
              results.push(result);
              if (results.length >= limit)
                return results;
            }
          } else if (options && options.keys) {
            for (var i = 0; i < targets.length; i++) {
              var obj = targets[i];
              var objResults = new Array(options.keys.length);
              for (var keyI = options.keys.length - 1; keyI >= 0; --keyI) {
                var target = getValue(obj, options.keys[keyI]);
                if (!target) {
                  objResults[keyI] = NULL;
                  continue;
                }
                if (!isObj(target))
                  target = getPrepared(target);
                target.score = INT_MIN;
                target._indexes.len = 0;
                objResults[keyI] = target;
              }
              objResults.obj = obj;
              objResults.score = INT_MIN;
              results.push(objResults);
              if (results.length >= limit)
                return results;
            }
          } else {
            for (var i = 0; i < targets.length; i++) {
              var target = targets[i];
              if (!target)
                continue;
              if (!isObj(target))
                target = getPrepared(target);
              target.score = INT_MIN;
              target._indexes.len = 0;
              results.push(target);
              if (results.length >= limit)
                return results;
            }
          }
          return results;
        };
        var algorithm = function(preparedSearch, prepared, allowSpaces = false) {
          if (allowSpaces === false && preparedSearch.containsSpace)
            return algorithmSpaces(preparedSearch, prepared);
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
          var firstPossibleI = targetI = matchesSimple[0] === 0 ? 0 : nextBeginningIndexes[matchesSimple[0] - 1];
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
          var substringIndex = prepared._targetLower.indexOf(searchLower, matchesSimple[0]);
          var isSubstring = ~substringIndex;
          if (isSubstring && !successStrict) {
            for (var i = 0; i < matchesSimpleLen; ++i)
              matchesSimple[i] = substringIndex + i;
          }
          var isSubstringBeginning = false;
          if (isSubstring) {
            isSubstringBeginning = prepared._nextBeginningIndexes[substringIndex - 1] === substringIndex;
          }
          {
            if (successStrict) {
              var matchesBest = matchesStrict;
              var matchesBestLen = matchesStrictLen;
            } else {
              var matchesBest = matchesSimple;
              var matchesBestLen = matchesSimpleLen;
            }
            var score = 0;
            var extraMatchGroupCount = 0;
            for (var i = 1; i < searchLen; ++i) {
              if (matchesBest[i] - matchesBest[i - 1] !== 1) {
                score -= matchesBest[i];
                ++extraMatchGroupCount;
              }
            }
            var unmatchedDistance = matchesBest[searchLen - 1] - matchesBest[0] - (searchLen - 1);
            score -= (12 + unmatchedDistance) * extraMatchGroupCount;
            if (matchesBest[0] !== 0)
              score -= matchesBest[0] * matchesBest[0] * 0.2;
            if (!successStrict) {
              score *= 1e3;
            } else {
              var uniqueBeginningIndexes = 1;
              for (var i = nextBeginningIndexes[0]; i < targetLen; i = nextBeginningIndexes[i])
                ++uniqueBeginningIndexes;
              if (uniqueBeginningIndexes > 24)
                score *= (uniqueBeginningIndexes - 24) * 10;
            }
            if (isSubstring)
              score /= 1 + searchLen * searchLen * 1;
            if (isSubstringBeginning)
              score /= 1 + searchLen * searchLen * 1;
            score -= targetLen - searchLen;
            prepared.score = score;
            for (var i = 0; i < matchesBestLen; ++i)
              prepared._indexes[i] = matchesBest[i];
            prepared._indexes.len = matchesBestLen;
            return prepared;
          }
        };
        var algorithmSpaces = function(preparedSearch, target) {
          var seen_indexes = /* @__PURE__ */ new Set();
          var score = 0;
          var result = NULL;
          var first_seen_index_last_search = 0;
          var searches = preparedSearch.spaceSearches;
          for (var i = 0; i < searches.length; ++i) {
            var search = searches[i];
            result = algorithm(search, target);
            if (result === NULL)
              return NULL;
            score += result.score;
            if (result._indexes[0] < first_seen_index_last_search) {
              score -= first_seen_index_last_search - result._indexes[0];
            }
            first_seen_index_last_search = result._indexes[0];
            for (var j = 0; j < result._indexes.len; ++j)
              seen_indexes.add(result._indexes[j]);
          }
          var allowSpacesResult = algorithm(
            preparedSearch,
            target,
            /*allowSpaces=*/
            true
          );
          if (allowSpacesResult !== NULL && allowSpacesResult.score > score) {
            return allowSpacesResult;
          }
          result.score = score;
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
        var cleanup = function() {
          preparedCache.clear();
          preparedSearchCache.clear();
          matchesSimple = [];
          matchesStrict = [];
        };
        var preparedCache = /* @__PURE__ */ new Map();
        var preparedSearchCache = /* @__PURE__ */ new Map();
        var matchesSimple = [];
        var matchesStrict = [];
        var defaultScoreFn = function(a) {
          var max = INT_MIN;
          var len = a.length;
          for (var i = 0; i < len; ++i) {
            var result = a[i];
            if (result === NULL)
              continue;
            var score = result.score;
            if (score > max)
              max = score;
          }
          if (max === INT_MIN)
            return NULL;
          return max;
        };
        var getValue = function(obj, prop) {
          var tmp = obj[prop];
          if (tmp !== void 0)
            return tmp;
          var segs = prop;
          if (!Array.isArray(prop))
            segs = prop.split(".");
          var len = segs.length;
          var i = -1;
          while (obj && ++i < len)
            obj = obj[segs[i]];
          return obj;
        };
        var isObj = function(x) {
          return typeof x === "object";
        };
        var INT_MAX = Infinity;
        var INT_MIN = -INT_MAX;
        var noResults = [];
        noResults.total = 0;
        var NULL = null;
        var fastpriorityqueue = function(r) {
          var e = [], o = 0, a = {}, v = function(r2) {
            for (var a2 = 0, v2 = e[a2], c = 1; c < o; ) {
              var s = c + 1;
              a2 = c, s < o && e[s].score < e[c].score && (a2 = s), e[a2 - 1 >> 1] = e[a2], c = 1 + (a2 << 1);
            }
            for (var f = a2 - 1 >> 1; a2 > 0 && v2.score < e[f].score; f = (a2 = f) - 1 >> 1)
              e[a2] = e[f];
            e[a2] = v2;
          };
          return a.add = function(r2) {
            var a2 = o;
            e[o++] = r2;
            for (var v2 = a2 - 1 >> 1; a2 > 0 && r2.score < e[v2].score; v2 = (a2 = v2) - 1 >> 1)
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
          "highlight": highlight,
          "prepare": prepare,
          "indexes": indexes,
          "cleanup": cleanup
        };
      });
    }
  });

  // src/core/ui/components/AddonPage.tsx
  function getItemsByQuery(items, query) {
    if (!query)
      return items;
    return import_fuzzysort.default.go(query, items, {
      keys: [
        "id",
        "name",
        "manifest.name",
        "manifest.description",
        "manifest.authors.0.name",
        "manifest.authors.1.name"
      ]
    }).map(function(r) {
      return r.obj;
    });
  }
  function AddonPage({ card: CardComponent, ...props }) {
    useProxy(props.items);
    useProxy(settings);
    var [search, setSearch] = React.useState("");
    return /* @__PURE__ */ __bunny_createElement(ErrorBoundary, null, /* @__PURE__ */ __bunny_createElement(import_react_native14.FlatList, {
      ListHeaderComponent: /* @__PURE__ */ __bunny_createElement(import_react_native14.View, null, settings.safeMode?.enabled && /* @__PURE__ */ __bunny_createElement(import_react_native14.View, {
        style: {
          marginBottom: 10
        }
      }, /* @__PURE__ */ __bunny_createElement(HelpMessage, {
        messageType: 0
      }, props.safeModeMessage), props.safeModeExtras), /* @__PURE__ */ __bunny_createElement(Search_default, {
        onChangeText: function(v) {
          return setSearch(v.toLowerCase());
        },
        placeholder: Strings.SEARCH
      })),
      style: {
        paddingHorizontal: 10,
        paddingTop: 10
      },
      contentContainerStyle: {
        paddingBottom: 90,
        paddingHorizontal: 5,
        gap: 12
      },
      data: getItemsByQuery(Object.values(props.items).filter(function(i) {
        return typeof i === "object";
      }), search),
      renderItem: function({ item, index }) {
        return /* @__PURE__ */ __bunny_createElement(RemoveModeContext.Provider, {
          value: !!props.isRemoveMode
        }, /* @__PURE__ */ __bunny_createElement(CardComponent, {
          item,
          index
        }));
      }
    }), /* @__PURE__ */ __bunny_createElement(FloatingActionButton, {
      icon: requireAssetIndex("PlusLargeIcon"),
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
    }));
  }
  var import_fuzzysort, import_react2, import_react_native14, RemoveModeContext;
  var init_AddonPage = __esm({
    "src/core/ui/components/AddonPage.tsx"() {
      "use strict";
      init_i18n();
      init_assets();
      init_storage();
      init_settings();
      init_constants();
      init_common();
      init_components();
      init_alerts();
      init_components2();
      import_fuzzysort = __toESM(require_fuzzysort());
      import_react2 = __toESM(require_react());
      import_react_native14 = __toESM(require_react_native());
      RemoveModeContext = /* @__PURE__ */ (0, import_react2.createContext)(false);
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
      init_utils();
      actionSheet = findByPropsProxy("openLazy", "hideActionSheet");
    }
  });

  // src/core/ui/settings/pages/Plugins/usePluginCardStyles.ts
  var usePluginCardStyles;
  var init_usePluginCardStyles = __esm({
    "src/core/ui/settings/pages/Plugins/usePluginCardStyles.ts"() {
      "use strict";
      init_styles();
      init_common();
      usePluginCardStyles = createStyles({
        header: {
          paddingVertical: 2
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
          color: tokens.colors.TEXT_NORMAL
        },
        headerSubtitle: {},
        descriptionLabel: {
          ...TextStyleSheet["text-md/semibold"],
          color: tokens.colors.TEXT_NORMAL
        },
        actions: {
          flexDirection: "row-reverse",
          alignItems: "center",
          gap: 5
        },
        iconStyle: {
          tintColor: tokens.colors.LOGO_PRIMARY
        }
      });
    }
  });

  // src/core/ui/settings/pages/Plugins/sheets/PluginInfoActionSheet.tsx
  var PluginInfoActionSheet_exports = {};
  __export(PluginInfoActionSheet_exports, {
    default: () => PluginInfoActionSheet
  });
  function PluginInfoActionSheet({ plugin, navigation: navigation2 }) {
    useProxy(plugin);
    var Settings = getSettings(plugin.id);
    return /* @__PURE__ */ __bunny_createElement(ActionSheet, null, /* @__PURE__ */ __bunny_createElement(import_react_native15.ScrollView, null, /* @__PURE__ */ __bunny_createElement(import_react_native15.View, {
      style: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 24
      }
    }, /* @__PURE__ */ __bunny_createElement(Text, {
      variant: "heading-xl/semibold"
    }, plugin.manifest.name), /* @__PURE__ */ __bunny_createElement(import_react_native15.View, {
      style: {
        marginLeft: "auto"
      }
    }, Settings && /* @__PURE__ */ __bunny_createElement(Button, {
      size: "md",
      text: "Configure",
      variant: "secondary",
      icon: requireAssetIndex("WrenchIcon"),
      onPress: function() {
        hideSheet("PluginInfoActionSheet");
        navigation2.push("VendettaCustomPage", {
          title: plugin.manifest.name,
          render: Settings
        });
      }
    }))), /* @__PURE__ */ __bunny_createElement(ActionSheetRow.Group, null, /* @__PURE__ */ __bunny_createElement(ActionSheetRow, {
      label: Strings.REFETCH,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("RetryIcon")
      }),
      onPress: async function() {
        if (plugin.enabled)
          stopPlugin(plugin.id, false);
        try {
          await fetchPlugin(plugin.id);
          showToast(Strings.PLUGIN_REFETCH_SUCCESSFUL, requireAssetIndex("toast_image_saved"));
        } catch (e) {
          showToast(Strings.PLUGIN_REFETCH_FAILED, requireAssetIndex("Small"));
        }
        if (plugin.enabled)
          await startPlugin(plugin.id);
        hideSheet("PluginInfoActionSheet");
      }
    }), /* @__PURE__ */ __bunny_createElement(ActionSheetRow, {
      label: Strings.COPY_URL,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("copy")
      }),
      onPress: function() {
        clipboard.setString(plugin.id);
        showToast.showCopyToClipboard();
      }
    }), /* @__PURE__ */ __bunny_createElement(ActionSheetRow, {
      label: plugin.update ? Strings.DISABLE_UPDATES : Strings.ENABLE_UPDATES,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("ic_download_24px")
      }),
      onPress: function() {
        plugin.update = !plugin.update;
        showToast(formatString("TOASTS_PLUGIN_UPDATE", {
          update: plugin.update,
          name: plugin.manifest.name
        }), requireAssetIndex("toast_image_saved"));
      }
    }), /* @__PURE__ */ __bunny_createElement(ActionSheetRow, {
      label: Strings.CLEAR_DATA,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("ic_duplicate")
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
              stopPlugin(plugin.id, false);
            try {
              await fetchPlugin(plugin.id);
              showToast(Strings.PLUGIN_REFETCH_SUCCESSFUL, requireAssetIndex("toast_image_saved"));
            } catch (e) {
              showToast(Strings.PLUGIN_REFETCH_FAILED, requireAssetIndex("Small"));
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
            }), requireAssetIndex(message[1]));
            if (plugin.enabled)
              await startPlugin(plugin.id);
            hideSheet("PluginInfoActionSheet");
          }
        });
      }
    }), /* @__PURE__ */ __bunny_createElement(ActionSheetRow, {
      label: Strings.DELETE,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("ic_message_delete")
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
              removePlugin(plugin.id);
            } catch (e) {
              showToast(String(e), requireAssetIndex("Small"));
            }
            hideSheet("PluginInfoActionSheet");
          }
        });
      }
    }))));
  }
  var import_react_native15;
  var init_PluginInfoActionSheet = __esm({
    "src/core/ui/settings/pages/Plugins/sheets/PluginInfoActionSheet.tsx"() {
      "use strict";
      init_i18n();
      init_assets();
      init_storage();
      init_plugins2();
      init_alerts();
      init_sheets();
      init_toasts();
      init_types();
      init_common();
      init_components();
      import_react_native15 = __toESM(require_react_native());
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
    return /* @__PURE__ */ __bunny_createElement(Text, {
      variant: "text-md/semibold",
      color: "text-muted"
    }, children);
  }
  function Title() {
    var styles3 = usePluginCardStyles();
    var plugin = usePlugin();
    return /* @__PURE__ */ __bunny_createElement(Text, {
      variant: "heading-lg/semibold"
    }, plugin.manifest.vendetta?.icon && /* @__PURE__ */ __bunny_createElement(React.Fragment, null, /* @__PURE__ */ __bunny_createElement(import_react_native16.Image, {
      style: styles3.iconStyle,
      source: {
        // This is pretty dirty but RN won't listen if I declare height and width somewhere else
        ...import_react_native16.Image.resolveAssetSource(requireAssetIndex(plugin.manifest.vendetta?.icon)),
        height: 18,
        width: 18
      }
    }), " "), plugin.manifest.name);
  }
  function Status() {
    var plugin = usePlugin();
    var TEXT_NORMAL = useToken(tokens.colors.TEXT_NORMAL);
    if (!plugin.error)
      return null;
    return /* @__PURE__ */ __bunny_createElement(import_react_native16.View, {
      style: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
      }
    }, /* @__PURE__ */ __bunny_createElement(import_react_native16.Image, {
      tintColor: TEXT_NORMAL,
      source: {
        ...import_react_native16.Image.resolveAssetSource(requireAssetIndex("WarningIcon")),
        height: 18,
        width: 18
      }
    }), /* @__PURE__ */ __bunny_createElement(Text, {
      variant: "text-sm/semibold"
    }, "There was an error while attempting to start this plugin."));
  }
  function PluginCard({ item: plugin }) {
    var navigation2 = NavigationNative.useNavigation();
    useProxy(plugin);
    return /* @__PURE__ */ __bunny_createElement(PluginContext.Provider, {
      value: plugin
    }, /* @__PURE__ */ __bunny_createElement(Card, null, /* @__PURE__ */ __bunny_createElement(Stack, {
      spacing: 16
    }, /* @__PURE__ */ __bunny_createElement(Status, null), /* @__PURE__ */ __bunny_createElement(import_react_native16.View, {
      style: {
        flexDirection: "row",
        alignItems: "center"
      }
    }, /* @__PURE__ */ __bunny_createElement(Stack, {
      spacing: 0
    }, /* @__PURE__ */ __bunny_createElement(Title, null), /* @__PURE__ */ __bunny_createElement(Authors, null)), /* @__PURE__ */ __bunny_createElement(import_react_native16.View, {
      style: {
        marginLeft: "auto"
      }
    }, /* @__PURE__ */ __bunny_createElement(Stack, {
      spacing: 12,
      direction: "horizontal"
    }, /* @__PURE__ */ __bunny_createElement(IconButton, {
      onPress: function() {
        showSheet("PluginInfoActionSheet", Promise.resolve().then(() => (init_PluginInfoActionSheet(), PluginInfoActionSheet_exports)), {
          plugin,
          navigation: navigation2
        });
      },
      size: "sm",
      variant: "secondary",
      icon: requireAssetIndex(getSettings(plugin.id) ? "SettingsIcon" : "MoreHorizontalIcon")
    }), /* @__PURE__ */ __bunny_createElement(TableSwitch, {
      value: plugin.enabled,
      onValueChange: function(v) {
        if (v)
          startPlugin(plugin.id);
        else
          stopPlugin(plugin.id);
      }
    })))), /* @__PURE__ */ __bunny_createElement(Text, {
      variant: "text-md/medium"
    }, plugin.manifest.description))));
  }
  var import_react3, import_react_native16, useToken, PluginContext, usePlugin;
  var init_PluginCard = __esm({
    "src/core/ui/settings/pages/Plugins/PluginCard.tsx"() {
      "use strict";
      init_assets();
      init_storage();
      init_plugins2();
      init_sheets();
      init_lazy();
      init_metro();
      init_common();
      init_components();
      import_react3 = __toESM(require_react());
      import_react_native16 = __toESM(require_react_native());
      init_usePluginCardStyles();
      ({ useToken } = lazyDestructure(function() {
        return findByProps("useToken");
      }));
      PluginContext = /* @__PURE__ */ (0, import_react3.createContext)(null);
      usePlugin = function() {
        return (0, import_react3.useContext)(PluginContext);
      };
    }
  });

  // src/core/ui/settings/pages/Plugins/index.tsx
  var Plugins_exports = {};
  __export(Plugins_exports, {
    default: () => Plugins
  });
  function Plugins() {
    useProxy(settings);
    return /* @__PURE__ */ __bunny_createElement(AddonPage, {
      title: Strings.PLUGINS,
      fetchFunction: installPlugin,
      items: plugins,
      safeModeMessage: Strings.SAFE_MODE_NOTICE_PLUGINS,
      card: PluginCard
    });
  }
  var init_Plugins = __esm({
    "src/core/ui/settings/pages/Plugins/index.tsx"() {
      "use strict";
      init_i18n();
      init_AddonPage();
      init_PluginCard();
      init_storage();
      init_plugins2();
      init_settings();
    }
  });

  // src/core/ui/components/AddonCard.tsx
  function AddonCard(props) {
    var styles3 = useStyles2();
    return /* @__PURE__ */ __bunny_createElement(Card, null, /* @__PURE__ */ __bunny_createElement(Stack, {
      spacing: 16
    }, /* @__PURE__ */ __bunny_createElement(import_react_native17.View, {
      style: {
        flexDirection: "row",
        alignItems: "center"
      }
    }, /* @__PURE__ */ __bunny_createElement(import_react_native17.View, {
      style: styles3.headerLeading
    }, /* @__PURE__ */ __bunny_createElement(Text, {
      style: styles3.headerLabel
    }, props.headerLabel), props.headerSublabel && /* @__PURE__ */ __bunny_createElement(Text, {
      style: styles3.headerSubtitle
    }, props.headerSublabel)), /* @__PURE__ */ __bunny_createElement(import_react_native17.View, {
      style: [
        styles3.headerTrailing,
        {
          marginLeft: "auto"
        }
      ]
    }, /* @__PURE__ */ __bunny_createElement(import_react_native17.View, {
      style: styles3.actions
    }, props.overflowActions && /* @__PURE__ */ __bunny_createElement(IconButton, {
      onPress: function() {
        return showSimpleActionSheet2({
          key: "CardOverflow",
          header: {
            title: props.overflowTitle,
            icon: props.headerIcon && /* @__PURE__ */ __bunny_createElement(LegacyFormRow.Icon, {
              style: {
                marginRight: 8
              },
              source: requireAssetIndex(props.headerIcon)
            }),
            onClose: function() {
              return hideActionSheet();
            }
          },
          options: props.overflowActions?.map(function(i) {
            return {
              ...i,
              icon: requireAssetIndex(i.icon)
            };
          })
        });
      },
      size: "sm",
      variant: "secondary",
      icon: requireAssetIndex("CircleInformationIcon-primary")
    }), props.actions?.map(function({ icon, onPress, disabled }) {
      return /* @__PURE__ */ __bunny_createElement(IconButton, {
        onPress,
        disabled,
        size: "sm",
        variant: "secondary",
        icon: requireAssetIndex(icon)
      });
    })), props.toggleType && (props.toggleType === "switch" ? /* @__PURE__ */ __bunny_createElement(FormSwitch, {
      value: props.toggleValue(),
      onValueChange: props.onToggleChange
    }) : /* @__PURE__ */ __bunny_createElement(import_react_native17.TouchableOpacity, {
      onPress: function() {
        props.onToggleChange?.(!props.toggleValue());
      }
    }, /* @__PURE__ */ __bunny_createElement(FormRadio, {
      selected: props.toggleValue()
    }))))), props.descriptionLabel && /* @__PURE__ */ __bunny_createElement(Text, {
      variant: "text-md/medium"
    }, props.descriptionLabel)));
  }
  var import_react_native17, hideActionSheet, showSimpleActionSheet2, useStyles2;
  var init_AddonCard = __esm({
    "src/core/ui/components/AddonCard.tsx"() {
      "use strict";
      init_assets();
      init_lazy();
      init_components();
      init_utils();
      init_color();
      init_styles();
      import_react_native17 = __toESM(require_react_native());
      ({ hideActionSheet } = lazyDestructure(function() {
        return findByProps("openLazy", "hideActionSheet");
      }));
      ({ showSimpleActionSheet: showSimpleActionSheet2 } = lazyDestructure(function() {
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
  function ThemeCard({ item: theme, index }) {
    useProxy(theme);
    var [removed, setRemoved] = React.useState(false);
    if (removed)
      return null;
    var { authors } = theme.data;
    return /* @__PURE__ */ __bunny_createElement(AddonCard, {
      index,
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
              showToast(Strings.THEME_REFETCH_SUCCESSFUL, requireAssetIndex("toast_image_saved"));
            }).catch(function() {
              showToast(Strings.THEME_REFETCH_FAILED, requireAssetIndex("Small"));
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
                  showToast(e.message, requireAssetIndex("Small"));
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
      init_i18n();
      init_AddonCard();
      init_assets();
      init_storage();
      init_themes();
      init_settings();
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
    return /* @__PURE__ */ __bunny_createElement(AddonPage, {
      title: Strings.THEMES,
      fetchFunction: installTheme,
      items: themes,
      safeModeMessage: formatString("SAFE_MODE_NOTICE_THEMES", {
        enabled: Boolean(settings.safeMode?.currentThemeId)
      }),
      safeModeExtras: settings.safeMode?.currentThemeId ? /* @__PURE__ */ __bunny_createElement(Button, {
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
      init_i18n();
      init_AddonPage();
      init_ThemeCard();
      init_storage();
      init_themes();
      init_settings();
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
  async function readFile(path, fallback, prefix = "pyoncord/") {
    try {
      return await FileManager.readFile(`${FileManager.getConstants().DocumentsDirPath}/${prefix}${path}`, "utf8");
    } catch (e) {
      if (fallback == null) {
        throw new Error(`Errored while reading ${path} doesn't exist`);
      }
      await writeFile(path, fallback);
      return fallback;
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

  // src/lib/managers/fonts.ts
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
    await awaitSyncWrapper(fonts);
    await Promise.allSettled(Object.keys(fonts).map(function(name) {
      return saveFont(fonts[name], fonts.__selected === name);
    }));
  }
  var fonts;
  var init_fonts = __esm({
    "src/lib/managers/fonts.ts"() {
      "use strict";
      init_fs();
      init_storage();
      init_utils2();
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
    var [fontName, setFontName] = (0, import_react4.useState)(guessFontName(Object.values(themeFonts)));
    var [error, setError] = (0, import_react4.useState)(void 0);
    return /* @__PURE__ */ __bunny_createElement(import_react_native18.View, {
      style: {
        padding: 8,
        paddingBottom: 16,
        gap: 12
      }
    }, /* @__PURE__ */ __bunny_createElement(TextInput, {
      autoFocus: true,
      size: "md",
      label: Strings.FONT_NAME,
      value: fontName,
      placeholder: fontName || "Whitney",
      onChange: setFontName,
      errorMessage: error,
      state: error ? "error" : void 0
    }), /* @__PURE__ */ __bunny_createElement(Text, {
      variant: "text-xs/normal",
      color: "text-muted"
    }, formatString("THEME_EXTRACTOR_DESC", {
      fonts: Object.keys(themeFonts).join(Strings.SEPARATOR)
    })), /* @__PURE__ */ __bunny_createElement(Button, {
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
    }));
  }
  function JsonFontImporter({ fonts: fonts2, setName, setSource }) {
    var [fontLink, setFontLink] = (0, import_react4.useState)("");
    var [saving, setSaving] = (0, import_react4.useState)(false);
    var [error, setError] = (0, import_react4.useState)(void 0);
    return /* @__PURE__ */ __bunny_createElement(import_react_native18.View, {
      style: {
        padding: 8,
        paddingBottom: 16,
        gap: 12
      }
    }, /* @__PURE__ */ __bunny_createElement(TextInput, {
      autoFocus: true,
      size: "md",
      label: "Font Link",
      value: fontLink,
      placeholder: "https://link.to/font/pack.json",
      onChange: setFontLink,
      errorMessage: error,
      state: error ? "error" : void 0
    }), /* @__PURE__ */ __bunny_createElement(Button, {
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
    }));
  }
  function EntryEditorActionSheet(props) {
    var [familyName, setFamilyName] = (0, import_react4.useState)(props.name);
    var [fontUrl, setFontUrl] = (0, import_react4.useState)(props.fontEntries[props.name]);
    return /* @__PURE__ */ __bunny_createElement(import_react_native18.View, {
      style: {
        padding: 8,
        paddingBottom: 16,
        gap: 12
      }
    }, /* @__PURE__ */ __bunny_createElement(TextInput, {
      autoFocus: true,
      size: "md",
      label: "Family Name (to override)",
      value: familyName,
      placeholder: "ggsans-Bold",
      onChange: setFamilyName
    }), /* @__PURE__ */ __bunny_createElement(TextInput, {
      size: "md",
      label: "Font URL",
      value: fontUrl,
      placeholder: "https://link.to/the/font.ttf",
      onChange: setFontUrl
    }), /* @__PURE__ */ __bunny_createElement(Button, {
      size: "md",
      variant: "primary",
      text: "Apply",
      onPress: function() {
        delete props.fontEntries[props.name];
        props.fontEntries[familyName] = fontUrl;
      }
    }));
  }
  function promptActionSheet(Component, fontEntries, props) {
    actionSheet2.openLazy(Promise.resolve({
      default: function() {
        return /* @__PURE__ */ __bunny_createElement(ErrorBoundary, null, /* @__PURE__ */ __bunny_createElement(ActionSheet, null, /* @__PURE__ */ __bunny_createElement(BottomSheetTitleHeader, {
          title: "Import Font"
        }), /* @__PURE__ */ __bunny_createElement(Component, {
          fonts: fontEntries,
          ...props
        })));
      }
    }), "FontEditorActionSheet");
  }
  function NewEntryRow({ fontEntry }) {
    var nameRef = (0, import_react4.useRef)();
    var urlRef = (0, import_react4.useRef)();
    var [nameSet, setNameSet] = (0, import_react4.useState)(false);
    var [error, setError] = (0, import_react4.useState)();
    return /* @__PURE__ */ __bunny_createElement(import_react_native18.View, {
      style: {
        flexDirection: "row",
        gap: 8,
        justifyContent: "flex-start"
      }
    }, /* @__PURE__ */ __bunny_createElement(import_react_native18.View, {
      style: {
        flex: 1
      }
    }, /* @__PURE__ */ __bunny_createElement(TextInput, {
      isRound: true,
      size: "md",
      label: nameSet ? nameRef.current : void 0,
      placeholder: nameSet ? "https://path.to/the/file.ttf" : "PostScript name (e.g. ggsans-Bold)",
      leadingIcon: function() {
        return nameSet ? null : /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
          source: requireAssetIndex("PlusSmallIcon")
        });
      },
      leadingText: nameSet ? nameRef.current : "",
      onChange: function(text) {
        return (nameSet ? urlRef : nameRef).current = text;
      },
      errorMessage: error,
      state: error ? "error" : void 0
    })), nameSet && /* @__PURE__ */ __bunny_createElement(IconButton, {
      size: "md",
      variant: "secondary",
      onPress: function() {
        nameRef.current = "";
        setNameSet(false);
      },
      icon: requireAssetIndex("TrashIcon")
    }), /* @__PURE__ */ __bunny_createElement(IconButton, {
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
      icon: requireAssetIndex(nameSet ? "PlusSmallIcon" : "ArrowLargeRightIcon")
    }));
  }
  function FontEditor(props) {
    var [name, setName] = (0, import_react4.useState)(props.name);
    var [source, setSource] = (0, import_react4.useState)();
    var [importing, setIsImporting] = (0, import_react4.useState)(false);
    var memoEntry = (0, import_react4.useMemo)(function() {
      return createProxy(props.name ? {
        ...fonts[props.name].main
      } : {}).proxy;
    }, [
      props.name
    ]);
    var fontEntries = useProxy(memoEntry);
    var navigation2 = NavigationNative.useNavigation();
    return /* @__PURE__ */ __bunny_createElement(import_react_native18.ScrollView, {
      style: {
        flex: 1
      },
      contentContainerStyle: {
        paddingBottom: 38
      }
    }, /* @__PURE__ */ __bunny_createElement(Stack, {
      style: {
        paddingVertical: 24,
        paddingHorizontal: 12
      },
      spacing: 12
    }, !props.name ? /* @__PURE__ */ __bunny_createElement(TableRowGroup, {
      title: "Import"
    }, getCurrentTheme()?.data?.fonts && /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: Strings.LABEL_EXTRACT_FONTS_FROM_THEME,
      subLabel: Strings.DESC_EXTRACT_FONTS_FROM_THEME,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("HammerIcon")
      }),
      onPress: function() {
        return promptActionSheet(RevengeFontsExtractor, fontEntries, {
          setName
        });
      }
    }), /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: "Import font entries from a link",
      subLabel: "Directly import from a link with a pre-configured JSON file",
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("LinkIcon")
      }),
      onPress: function() {
        return promptActionSheet(JsonFontImporter, fontEntries, {
          setName,
          setSource
        });
      }
    })) : /* @__PURE__ */ __bunny_createElement(TableRowGroup, {
      title: "Actions"
    }, /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: "Refetch fonts from source",
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("RetryIcon")
      }),
      onPress: async function() {
        var ftCopy = {
          ...fonts[props.name]
        };
        await removeFont(props.name);
        await saveFont(ftCopy);
        navigation2.goBack();
      }
    }), /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: "Delete font pack",
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("TrashIcon")
      }),
      onPress: function() {
        return removeFont(props.name).then(function() {
          return navigation2.goBack();
        });
      }
    })), /* @__PURE__ */ __bunny_createElement(TextInput, {
      size: "lg",
      value: name,
      label: Strings.FONT_NAME,
      placeholder: "Whitney",
      onChange: setName
    }), /* @__PURE__ */ __bunny_createElement(TableRowGroup, {
      title: "Font Entries"
    }, Object.entries(fontEntries).map(function([name2, url2]) {
      return /* @__PURE__ */ __bunny_createElement(TableRow, {
        label: name2,
        subLabel: url2,
        trailing: /* @__PURE__ */ __bunny_createElement(Stack, {
          spacing: 2,
          direction: "horizontal"
        }, /* @__PURE__ */ __bunny_createElement(IconButton, {
          size: "sm",
          variant: "secondary",
          icon: requireAssetIndex("PencilIcon"),
          onPress: function() {
            return promptActionSheet(EntryEditorActionSheet, fontEntries, {
              name: name2,
              fontEntries
            });
          }
        }), /* @__PURE__ */ __bunny_createElement(IconButton, {
          size: "sm",
          variant: "secondary",
          icon: requireAssetIndex("TrashIcon"),
          onPress: function() {
            return delete fontEntries[name2];
          }
        }))
      });
    }), /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: /* @__PURE__ */ __bunny_createElement(NewEntryRow, {
        fontEntry: fontEntries
      })
    })), /* @__PURE__ */ __bunny_createElement(import_react_native18.View, {
      style: {
        flexDirection: "row",
        justifyContent: "flex-end",
        bottom: 0,
        left: 0
      }
    }, /* @__PURE__ */ __bunny_createElement(Button, {
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
      icon: requireAssetIndex(props.name ? "toast_image_saved" : "DownloadIcon"),
      style: {
        marginLeft: 8
      }
    }))));
  }
  var import_react4, import_react_native18, actionSheet2;
  var init_FontEditor = __esm({
    "src/core/ui/settings/pages/Fonts/FontEditor.tsx"() {
      "use strict";
      init_i18n();
      init_assets();
      init_storage();
      init_fonts();
      init_themes();
      init_utils2();
      init_common();
      init_components();
      init_utils();
      init_components2();
      import_react4 = __toESM(require_react());
      import_react_native18 = __toESM(require_react_native());
      actionSheet2 = findByPropsProxy("hideActionSheet");
    }
  });

  // src/core/ui/settings/pages/Fonts/FontCard.tsx
  function FontPreview({ font }) {
    var TEXT_NORMAL = useToken2(tokens.colors.TEXT_NORMAL);
    var { fontFamily: fontFamilyList, fontSize } = TextStyleSheet["text-md/medium"];
    var fontFamily = fontFamilyList.split(/,/g)[0];
    var typeface = Skia.useFont(font.main[fontFamily])?.getTypeface();
    var paragraph = (0, import_react5.useMemo)(function() {
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
      /* @__PURE__ */ __bunny_createElement(import_react_native19.View, {
        style: {
          height: 64
        }
      }, typeface ? /* @__PURE__ */ __bunny_createElement(Skia.Canvas, {
        style: {
          height: 64
        }
      }, /* @__PURE__ */ __bunny_createElement(Skia.Paragraph, {
        paragraph,
        x: 0,
        y: 0,
        width: 300
      })) : /* @__PURE__ */ __bunny_createElement(import_react_native19.View, {
        style: {
          justifyContent: "center",
          alignItems: "center"
        }
      }, /* @__PURE__ */ __bunny_createElement(Text, {
        color: "text-muted",
        variant: "heading-lg/semibold"
      }, "Loading...")))
    );
  }
  function FontCard({ item: font }) {
    useProxy(fonts);
    var navigation2 = NavigationNative.useNavigation();
    var selected = fonts.__selected === font.name;
    return /* @__PURE__ */ __bunny_createElement(Card, null, /* @__PURE__ */ __bunny_createElement(Stack, {
      spacing: 16
    }, /* @__PURE__ */ __bunny_createElement(import_react_native19.View, {
      style: {
        flexDirection: "row",
        alignItems: "center"
      }
    }, /* @__PURE__ */ __bunny_createElement(import_react_native19.View, null, /* @__PURE__ */ __bunny_createElement(Text, {
      variant: "heading-lg/semibold"
    }, font.name)), /* @__PURE__ */ __bunny_createElement(import_react_native19.View, {
      style: {
        marginLeft: "auto"
      }
    }, /* @__PURE__ */ __bunny_createElement(Stack, {
      spacing: 12,
      direction: "horizontal"
    }, /* @__PURE__ */ __bunny_createElement(IconButton, {
      onPress: function() {
        navigation2.push("VendettaCustomPage", {
          title: "Edit Font",
          render: function() {
            return /* @__PURE__ */ __bunny_createElement(FontEditor, {
              name: font.name
            });
          }
        });
      },
      size: "sm",
      variant: "secondary",
      disabled: selected,
      icon: requireAssetIndex("PencilIcon")
    }), /* @__PURE__ */ __bunny_createElement(Button, {
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
    })))), /* @__PURE__ */ __bunny_createElement(FontPreview, {
      font
    })));
  }
  var import_react5, import_react_native19, useToken2;
  var init_FontCard = __esm({
    "src/core/ui/settings/pages/Fonts/FontCard.tsx"() {
      "use strict";
      init_i18n();
      init_assets();
      init_modules();
      init_storage();
      init_fonts();
      init_alerts();
      init_styles();
      init_lazy();
      init_types();
      init_metro();
      init_common();
      init_components();
      import_react5 = __toESM(require_react());
      import_react_native19 = __toESM(require_react_native());
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
    return /* @__PURE__ */ __bunny_createElement(AddonPage, {
      title: Strings.FONTS,
      fetchFunction: installFont,
      items: fonts,
      safeModeMessage: Strings.SAFE_MODE_NOTICE_FONTS,
      card: FontCard,
      onFABPress: function() {
        navigation2.push("VendettaCustomPage", {
          title: "Import Font",
          render: function() {
            return /* @__PURE__ */ __bunny_createElement(FontEditor, null);
          }
        });
      }
    });
  }
  var init_Fonts = __esm({
    "src/core/ui/settings/pages/Fonts/index.tsx"() {
      "use strict";
      init_i18n();
      init_AddonPage();
      init_FontEditor();
      init_storage();
      init_fonts();
      init_settings();
      init_common();
      init_FontCard();
    }
  });

  // src/core/ui/settings/hooks/useFS.ts
  function useFileExists(path, prefix) {
    var [state, setState] = (0, import_react6.useState)(2);
    var check = function() {
      return fileExists(path, prefix).then(function(exists) {
        return setState(exists ? 1 : 0);
      }).catch(function() {
        return setState(3);
      });
    };
    var customFS = (0, import_react6.useMemo)(function() {
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
    (0, import_react6.useEffect)(function() {
      return void check();
    }, []);
    return [
      state,
      customFS
    ];
  }
  var import_react6, CheckState;
  var init_useFS = __esm({
    "src/core/ui/settings/hooks/useFS.ts"() {
      "use strict";
      init_fs();
      import_react6 = __toESM(require_react());
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
    return /* @__PURE__ */ __bunny_createElement(LegacyFormRow, {
      label: `${asset.name} - ${asset.id}`,
      trailing: /* @__PURE__ */ __bunny_createElement(import_react_native20.Image, {
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
  var import_react_native20;
  var init_AssetDisplay = __esm({
    "src/core/ui/settings/pages/Developer/AssetDisplay.tsx"() {
      "use strict";
      init_common();
      init_components();
      init_toasts();
      import_react_native20 = __toESM(require_react_native());
    }
  });

  // src/core/ui/settings/pages/Developer/AssetBrowser.tsx
  function AssetBrowser() {
    var [search, setSearch] = React.useState("");
    return /* @__PURE__ */ __bunny_createElement(ErrorBoundary, null, /* @__PURE__ */ __bunny_createElement(import_react_native21.View, {
      style: {
        flex: 1
      }
    }, /* @__PURE__ */ __bunny_createElement(Search_default, {
      style: {
        margin: 10
      },
      onChangeText: function(v) {
        return setSearch(v);
      }
    }), /* @__PURE__ */ __bunny_createElement(import_react_native21.FlatList, {
      data: Object.values(assetsMap).filter(function(a) {
        return a.name.includes(search) || a.id.toString() === search;
      }),
      renderItem: function({ item }) {
        return /* @__PURE__ */ __bunny_createElement(AssetDisplay, {
          asset: item
        });
      },
      ItemSeparatorComponent: LegacyFormDivider,
      keyExtractor: function(item) {
        return item.name;
      }
    })));
  }
  var import_react_native21;
  var init_AssetBrowser = __esm({
    "src/core/ui/settings/pages/Developer/AssetBrowser.tsx"() {
      "use strict";
      init_AssetDisplay();
      init_assets();
      init_components();
      init_components2();
      import_react_native21 = __toESM(require_react_native());
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
    return /* @__PURE__ */ __bunny_createElement(ErrorBoundary, null, /* @__PURE__ */ __bunny_createElement(import_react_native22.ScrollView, {
      style: {
        flex: 1
      },
      contentContainerStyle: {
        paddingBottom: 38
      }
    }, /* @__PURE__ */ __bunny_createElement(Stack, {
      style: {
        paddingVertical: 24,
        paddingHorizontal: 12
      },
      spacing: 24
    }, /* @__PURE__ */ __bunny_createElement(TextInput, {
      label: Strings.DEBUGGER_URL,
      placeholder: "127.0.0.1:9090",
      size: "md",
      leadingIcon: function() {
        return /* @__PURE__ */ __bunny_createElement(LegacyFormText, {
          style: styles3.leadingText
        }, "ws://");
      },
      defaultValue: settings.debuggerUrl,
      onChange: function(v) {
        return settings.debuggerUrl = v;
      }
    }), /* @__PURE__ */ __bunny_createElement(TableRowGroup, {
      title: Strings.DEBUG
    }, /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: Strings.CONNECT_TO_DEBUG_WEBSOCKET,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("copy")
      }),
      onPress: function() {
        return connectToDebugger(settings.debuggerUrl);
      }
    }), isReactDevToolsPreloaded() && /* @__PURE__ */ __bunny_createElement(React.Fragment, null, /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: Strings.CONNECT_TO_REACT_DEVTOOLS,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("ic_badge_staff")
      }),
      onPress: function() {
        return window[getReactDevToolsProp() || "__vendetta_rdc"]?.connectToDevTools({
          host: settings.debuggerUrl.split(":")?.[0],
          resolveRNStyle: import_react_native22.StyleSheet.flatten
        });
      }
    }))), isLoaderConfigSupported() && /* @__PURE__ */ __bunny_createElement(React.Fragment, null, /* @__PURE__ */ __bunny_createElement(TableRowGroup, {
      title: "Loader config"
    }, /* @__PURE__ */ __bunny_createElement(TableSwitchRow, {
      label: Strings.LOAD_FROM_CUSTOM_URL,
      subLabel: Strings.LOAD_FROM_CUSTOM_URL_DEC,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("copy")
      }),
      value: loaderConfig.customLoadUrl.enabled,
      onValueChange: function(v) {
        loaderConfig.customLoadUrl.enabled = v;
      }
    }), loaderConfig.customLoadUrl.enabled && /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: /* @__PURE__ */ __bunny_createElement(TextInput, {
        defaultValue: loaderConfig.customLoadUrl.url,
        size: "md",
        onChange: function(v) {
          return loaderConfig.customLoadUrl.url = v;
        },
        placeholder: "http://localhost:4040/vendetta.js",
        label: Strings.BUNNY_URL
      })
    }), isReactDevToolsPreloaded() && isVendettaLoader() && /* @__PURE__ */ __bunny_createElement(TableSwitchRow, {
      label: Strings.LOAD_REACT_DEVTOOLS,
      subLabel: `${Strings.VERSION}: ${getReactDevToolsVersion()}`,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("ic_badge_staff")
      }),
      value: loaderConfig.loadReactDevTools,
      onValueChange: function(v) {
        loaderConfig.loadReactDevTools = v;
      }
    }))), /* @__PURE__ */ __bunny_createElement(TableRowGroup, {
      title: "Other"
    }, /* @__PURE__ */ __bunny_createElement(TableRow, {
      arrow: true,
      label: Strings.ASSET_BROWSER,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("ic_image")
      }),
      trailing: TableRow.Arrow,
      onPress: function() {
        return navigation2.push("VendettaCustomPage", {
          title: Strings.ASSET_BROWSER,
          render: AssetBrowser
        });
      }
    }), /* @__PURE__ */ __bunny_createElement(TableRow, {
      arrow: true,
      label: Strings.ERROR_BOUNDARY_TOOLS_LABEL,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("ic_warning_24px")
      }),
      onPress: function() {
        return showSimpleActionSheet3({
          key: "ErrorBoundaryTools",
          header: {
            title: "Which ErrorBoundary do you want to trip?",
            icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
              style: {
                marginRight: 8
              },
              source: requireAssetIndex("ic_warning_24px")
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
                    return /* @__PURE__ */ __bunny_createElement("undefined", null);
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
    }), /* @__PURE__ */ __bunny_createElement(TableRow, {
      label: Strings.INSTALL_REACT_DEVTOOLS,
      subLabel: Strings.RESTART_REQUIRED_TO_TAKE_EFFECT,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("DownloadIcon")
      }),
      trailing: /* @__PURE__ */ __bunny_createElement(Button, {
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
        icon: requireAssetIndex(rdtFileExists === CheckState.TRUE ? "ic_message_delete" : "DownloadIcon"),
        style: {
          marginLeft: 8
        }
      })
    }), /* @__PURE__ */ __bunny_createElement(TableSwitchRow, {
      label: Strings.ENABLE_EVAL_COMMAND,
      subLabel: Strings.ENABLE_EVAL_COMMAND_DESC,
      icon: /* @__PURE__ */ __bunny_createElement(TableRow.Icon, {
        source: requireAssetIndex("PencilIcon")
      }),
      value: settings.enableEvalCommand,
      onValueChange: function(v) {
        settings.enableEvalCommand = v;
      }
    })))));
  }
  var import_react_native22, hideActionSheet2, showSimpleActionSheet3, RDT_EMBED_LINK, useStyles3;
  var init_Developer = __esm({
    "src/core/ui/settings/pages/Developer/index.tsx"() {
      "use strict";
      init_i18n();
      init_useFS();
      init_AssetBrowser();
      init_assets();
      init_loader();
      init_storage();
      init_debug();
      init_settings();
      init_lazy();
      init_common();
      init_components();
      init_utils();
      init_color();
      init_components2();
      init_styles();
      import_react_native22 = __toESM(require_react_native());
      ({ hideActionSheet: hideActionSheet2 } = lazyDestructure(function() {
        return findByProps("openLazy", "hideActionSheet");
      }));
      ({ showSimpleActionSheet: showSimpleActionSheet3 } = lazyDestructure(function() {
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
              return `(${"eb55540-dev"})`;
            }
          }
        },
        {
          key: "BUNNY_PLUGINS",
          title: function() {
            return Strings.PLUGINS;
          },
          icon: requireAssetIndex("ActivitiesIcon"),
          render: function() {
            return Promise.resolve().then(() => (init_Plugins(), Plugins_exports));
          }
        },
        {
          key: "BUNNY_THEMES",
          title: function() {
            return Strings.THEMES;
          },
          icon: requireAssetIndex("PaintPaletteIcon"),
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
          icon: requireAssetIndex("ic_add_text"),
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
          icon: requireAssetIndex("WrenchIcon"),
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
      init_storage();
      init_settings();
      init_settings2();
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
    var _dispatcher, _dispatcher1;
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
    ((_dispatcher = dispatcher)._interceptors ?? (_dispatcher._interceptors = [])).unshift(cb);
    return function() {
      return (_dispatcher1 = dispatcher)._interceptors && (_dispatcher1._interceptors = dispatcher._interceptors.filter(function(v) {
        return v !== cb;
      }));
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

  // src/lib/ui/safeMode.tsx
  function safeMode_default() {
    return after2.proxy("render", [
      ErrorBoundary2,
      function(r) {
        return r.prototype;
      }
    ], function(_, ret) {
      var _this = this;
      var _this_state;
      if (!this.state.error)
        return;
      (_this_state = this.state).activeTab ?? (_this_state.activeTab = "message");
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
      return /* @__PURE__ */ __bunny_createElement(ErrorBoundary, null, /* @__PURE__ */ __bunny_createElement(SafeAreaView, {
        style: styles2.container
      }, /* @__PURE__ */ __bunny_createElement(import_react_native23.View, {
        style: styles2.header
      }, /* @__PURE__ */ __bunny_createElement(ret.props.Illustration, {
        style: {
          transform: [
            {
              scale: 0.6
            }
          ],
          marginLeft: -40,
          marginRight: -80
        }
      }), /* @__PURE__ */ __bunny_createElement(import_react_native23.View, {
        style: {
          flex: 2,
          paddingLeft: 24
        }
      }, /* @__PURE__ */ __bunny_createElement(import_react_native23.Text, {
        style: styles2.headerTitle
      }, ret.props.title), /* @__PURE__ */ __bunny_createElement(import_react_native23.Text, {
        style: styles2.headerDescription
      }, ret.props.body))), /* @__PURE__ */ __bunny_createElement(import_react_native23.View, {
        style: {
          flex: 6
        }
      }, /* @__PURE__ */ __bunny_createElement(import_react_native23.View, {
        style: {
          paddingBottom: 8
        }
      }, /* @__PURE__ */ __bunny_createElement(BadgableTabBar, {
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
      })), /* @__PURE__ */ __bunny_createElement(Codeblock, {
        selectable: true,
        style: {
          flex: 1,
          textAlignVertical: "top"
        }
      }, tabData?.trimWhitespace ? errorText.split("\n").filter(function(i) {
        return i.length !== 0;
      }).map(function(i) {
        return i.trim();
      }).join("\n") : errorText)), /* @__PURE__ */ __bunny_createElement(import_react_native23.View, {
        style: styles2.footer
      }, buttons.map(function(button) {
        var buttonIndex = buttons.indexOf(button) !== 0 ? 8 : 0;
        return /* @__PURE__ */ __bunny_createElement(CompatButton, {
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
      }))));
    });
  }
  var import_react_native23, ErrorBoundary2, BadgableTabBar, styles2, tabs;
  var init_safeMode = __esm({
    "src/lib/ui/safeMode.tsx"() {
      "use strict";
      init_i18n();
      init_modules();
      init_patcher();
      init_debug();
      init_settings();
      init_lazy();
      init_types();
      init_components();
      init_utils();
      init_color();
      init_components2();
      init_styles();
      import_react_native23 = __toESM(require_react_native());
      ErrorBoundary2 = findByNameProxy("ErrorBoundary");
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
    flux: () => flux_exports,
    native: () => native_exports,
    patcher: () => patcher_exports,
    storage: () => storage_exports
  });
  var init_api = __esm({
    "src/lib/api/index.ts"() {
      "use strict";
      init_assets();
      init_commands();
      init_flux();
      init_native();
      init_patcher();
      init_storage();
    }
  });

  // src/lib/managers/index.ts
  var managers_exports = {};
  __export(managers_exports, {
    fonts: () => fonts_exports,
    plugins: () => plugins_exports2,
    themes: () => themes_exports
  });
  var init_managers = __esm({
    "src/lib/managers/index.ts"() {
      "use strict";
      init_fonts();
      init_plugins2();
      init_themes();
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
    debug: () => debug_exports,
    managers: () => managers_exports,
    metro: () => metro_exports,
    settings: () => settings_exports,
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
  var _disposer;
  var init_lib = __esm({
    "src/lib/index.ts"() {
      "use strict";
      init_global_d();
      init_api();
      init_debug();
      init_managers();
      init_settings();
      init_ui();
      init_utils2();
      init_metro();
      _disposer = new Array();
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
      initCorePlugins()
    ]).then(
      // Push them all to unloader
      function(u) {
        return u.forEach(function(f) {
          return f && unload.push(f);
        });
      }
    );
    window.bunny = lib_exports;
    unload.push(await initPlugins());
    updateFonts();
    logger.log("Bunny is ready!");
  }
  var init_src = __esm({
    "src/index.ts"() {
      "use strict";
      init_fixes();
      init_i18n();
      init_plugins3();
      init_vendettaObject();
      init_settings3();
      init_commands();
      init_flux();
      init_fs();
      init_loader();
      init_modules();
      init_debug();
      init_fonts();
      init_plugins2();
      init_themes();
      init_logger();
      init_safeMode();
      init_settings2();
      init_lib();
    }
  });

  // src/entry.ts
  init_lazy();
  init_esm();
  globalThis.window = globalThis;
  globalThis.__bunny_createElement = function createElement2(type, props, ...children) {
    var factory = getFactoryOfProxy(type);
    if (factory)
      type = factory();
    return React.createElement(type, props, ...children);
  };
  async function initializeBunny() {
    try {
      Object.freeze = Object.seal = Object;
      await (init_caches(), __toCommonJS(caches_exports)).initMetroCache();
      (init_src(), __toCommonJS(src_exports)).default();
    } catch (e) {
      var { ClientInfoManager: ClientInfoManager2 } = (init_modules(), __toCommonJS(modules_exports));
      var stack = e instanceof Error ? e.stack : void 0;
      console.log(stack ?? e?.toString?.() ?? e);
      alert([
        "Failed to load Bunny!\n",
        `Build Number: ${ClientInfoManager2.Build}`,
        `Bunny: ${"eb55540-dev"}`,
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
      var unpatchHook = instead("callFunctionReturnFlushedQueue", batchedBridge, function(args, orig) {
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
