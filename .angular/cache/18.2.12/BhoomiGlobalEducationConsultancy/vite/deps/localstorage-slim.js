import {
  __commonJS,
  __spreadProps,
  __spreadValues
} from "./chunk-3OV72XIM.js";

// node_modules/localstorage-slim/dist/localstorage-slim.js
var require_localstorage_slim = __commonJS({
  "node_modules/localstorage-slim/dist/localstorage-slim.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.ls = e() : t.ls = e();
    }(exports, () => (() => {
      "use strict";
      var t = {
        d: (e2, r2) => {
          for (var o2 in r2) t.o(r2, o2) && !t.o(e2, o2) && Object.defineProperty(e2, o2, {
            enumerable: true,
            get: r2[o2]
          });
        },
        o: (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2)
      }, e = {};
      t.d(e, {
        default: () => i
      });
      const r = (...t2) => {
      }, o = (t2) => null !== t2 && "Object" === (null == t2 ? void 0 : t2.constructor.name);
      let n, c;
      const l = () => {
        if (!n) {
          n = true;
          try {
            c = a.storage || localStorage, c.getItem("");
          } catch {
            c = /* @__PURE__ */ (() => {
              const t2 = {
                getItem: (t3) => e2[t3] || null,
                setItem: (t3, r2) => {
                  e2[t3] = r2;
                },
                removeItem: (t3) => {
                  e2[t3] = void 0;
                },
                clear: () => {
                  e2 = {
                    __proto__: t2
                  };
                }
              };
              let e2 = {
                __proto__: t2
              };
              return e2;
            })();
          }
          y();
        }
      }, s = String.fromCharCode(0), p = (t2, e2, r2 = true) => r2 ? [...JSON.stringify(t2)].map((t3) => String.fromCharCode(t3.charCodeAt(0) + e2)).join("") : JSON.parse([...t2].map((t3) => String.fromCharCode(t3.charCodeAt(0) - e2)).join("")), a = {
        ttl: null,
        encrypt: false,
        encrypter: p,
        decrypter: (t2, e2) => p(t2, e2, false),
        secret: 75,
        storage: void 0
      };
      Object.seal(a);
      const y = (t2 = false) => {
        l();
        for (const e2 of Object.keys(c)) {
          const r2 = c.getItem(e2);
          let n2;
          try {
            n2 = JSON.parse(r2 || "");
          } catch {
            continue;
          }
          o(n2) && s in n2 && (Date.now() > n2.ttl || t2) && c.removeItem(e2);
        }
      }, i = {
        config: a,
        set: (t2, e2, o2 = {}) => {
          l();
          const n2 = __spreadProps(__spreadValues(__spreadValues({}, a), o2), {
            encrypt: false !== o2.encrypt && (o2.encrypt || a.encrypt),
            ttl: null === o2.ttl ? null : o2.ttl || a.ttl
          });
          try {
            const o3 = n2.ttl && !isNaN(n2.ttl) && n2.ttl > 0;
            let l2 = o3 ? {
              [s]: e2,
              ttl: Date.now() + 1e3 * n2.ttl
            } : e2;
            n2.encrypt && (o3 ? l2[s] = (n2.encrypter || r)(l2[s], n2.secret) : l2 = (n2.encrypter || r)(l2, n2.secret)), c.setItem(t2, JSON.stringify(l2));
          } catch {
            return false;
          }
        },
        get: (t2, e2 = {}) => {
          l();
          const n2 = c.getItem(t2), p2 = __spreadProps(__spreadValues(__spreadValues({}, a), e2), {
            encrypt: false !== e2.encrypt && (e2.encrypt || a.encrypt),
            ttl: null === e2.ttl ? null : e2.ttl || a.ttl
          });
          let y2, i2;
          try {
            y2 = JSON.parse(n2 || ""), i2 = o(y2) && s in y2, (p2.decrypt || p2.encrypt) && (i2 ? y2[s] = (p2.decrypter || r)(y2[s], p2.secret) : y2 = (p2.decrypter || r)(y2, p2.secret));
          } catch {
          }
          return i2 ? Date.now() > y2.ttl ? (c.removeItem(t2), null) : y2[s] : void 0 !== y2 ? y2 : n2;
        },
        flush: y,
        clear: () => {
          l(), c.clear();
        },
        remove: (t2) => {
          l(), c.removeItem(t2);
        }
      };
      return e.default;
    })());
  }
});
export default require_localstorage_slim();
//# sourceMappingURL=localstorage-slim.js.map
