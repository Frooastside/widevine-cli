!(function (t, n) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = n())
    : "function" == typeof define && define.amd
    ? define([], n)
    : "object" == typeof exports
    ? (exports.devtoolsDetector = n())
    : (t.devtoolsDetector = n());
})("undefined" != typeof self ? self : this, function () {
  return (function (t) {
    var n = {};
    function e(r) {
      if (n[r]) return n[r].exports;
      var i = (n[r] = { i: r, l: false, exports: {} });
      return t[r].call(i.exports, i, i.exports, e), (i.l = true), i.exports;
    }
    return (
      (e.m = t),
      (e.c = n),
      (e.d = function (t, n, r) {
        e.o(t, n) || Object.defineProperty(t, n, { configurable: false, enumerable: true, get: r });
      }),
      (e.n = function (t) {
        var n =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return e.d(n, "a", n), n;
      }),
      (e.o = function (t, n) {
        return Object.prototype.hasOwnProperty.call(t, n);
      }),
      (e.p = ""),
      e((e.s = 4))
    );
  })([
    function (t, n, e) {
      "use strict";
      (function (t) {
        (n.c = function () {
          return "undefined" != typeof performance ? performance.now() : Date.now();
        }),
          (n.b = function (t) {
            void 0 === t && (t = {});
            for (
              var n = t.includes, e = void 0 === n ? [] : n, r = t.excludes, i = void 0 === r ? [] : r, o = false, u = false, c = 0, a = e;
              c < a.length;
              c++
            ) {
              var f = a[c];
              if (true === f) {
                o = true;
                break;
              }
            }
            for (var s = 0, l = i; s < l.length; s++) {
              var f = l[s];
              if (true === f) {
                u = true;
                break;
              }
            }
            return o && !u;
          }),
          (n.d = function (t, n, e) {
            var o = i.a[t];
            if (void 0 === o) return false;
            return Object(r.compare)(o, n, e);
          }),
          (n.a = function () {
            if ("undefined" != typeof self) return self;
            if ("undefined" != typeof window) return window;
            if (void 0 !== t) return t;
            return this;
          });
        var r = e(11),
          i = (e.n(r), e(5));
      }).call(n, e(10));
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "c", function () {
        return f;
      }),
        e.d(n, "d", function () {
          return s;
        }),
        e.d(n, "b", function () {
          return l;
        }),
        e.d(n, "g", function () {
          return d;
        }),
        e.d(n, "e", function () {
          return h;
        }),
        e.d(n, "a", function () {
          return p;
        }),
        e.d(n, "f", function () {
          return b;
        });
      var r,
        i,
        o,
        u = e(3),
        c = e(0),
        a = Object(c.a)(),
        f = "InstallTrigger" in ((null === a || void 0 === a ? void 0 : a.window) || {}) || /firefox/i.test(u.b),
        s = /trident/i.test(u.b) || /msie/i.test(u.b),
        l = /edge/i.test(u.b),
        d = /webkit/i.test(u.b) && !l,
        h = /IqiyiApp/.test(u.b),
        p =
          void 0 !== (null === (r = null === a || void 0 === a ? void 0 : a.window) || void 0 === r ? void 0 : r.chrome) ||
          /chrome/i.test(u.b) ||
          /CriOS/i.test(u.b),
        b =
          "[object SafariRemoteNotification]" ===
            (
              (null === (o = null === (i = null === a || void 0 === a ? void 0 : a.window) || void 0 === i ? void 0 : i.safari) || void 0 === o
                ? void 0
                : o.pushNotification) || false
            ).toString() ||
          (/safari/i.test(u.b) && !p);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "b", function () {
        return console.log;
      }),
        e.d(n, "c", function () {
          return console.table;
        }),
        e.d(n, "a", function () {
          return console.clear;
        });
      var r = e(1);
      function i(t) {
        if (console) {
          if (!r.d && !r.b) return console[t];
          if ("log" === t || "clear" === t)
            return function () {
              for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
              console[t].apply(console, n);
            };
        }
        return function () {
          for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
        };
      }
      var o = i("log"),
        u = i("table"),
        c = i("clear");
    },
    function (t, n, e) {
      "use strict";
      (n.a = function () {
        for (var t, n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
        if (null === o || void 0 === o ? void 0 : o.document) return (t = o.document).createElement.apply(t, n);
        return {};
      }),
        e.d(n, "b", function () {
          return u;
        });
      var r,
        i = e(0),
        o = Object(i.a)();
      var u = (null === (r = null === o || void 0 === o ? void 0 : o.navigator) || void 0 === r ? void 0 : r.userAgent) || "xxxxx";
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: true }),
        (n.addListener = function (t) {
          l.addListener(t);
        }),
        (n.removeListener = function (t) {
          l.removeListener(t);
        }),
        (n.isLaunch = function () {
          return l.isLaunch();
        }),
        (n.launch = function () {
          l.launch();
        }),
        (n.stop = function () {
          l.stop();
        }),
        (n.setDetectDelay = function (t) {
          l.setDetectDelay(t);
        });
      var r = e(7),
        i = e(8);
      e.d(n, "DevtoolsDetector", function () {
        return r.a;
      }),
        e.d(n, "checkers", function () {
          return i;
        });
      var o = e(0);
      e.d(n, "match", function () {
        return o.b;
      }),
        e.d(n, "specificVersionMatch", function () {
          return o.d;
        });
      var u = e(1);
      e.d(n, "isFirefox", function () {
        return u.c;
      }),
        e.d(n, "isIE", function () {
          return u.d;
        }),
        e.d(n, "isEdge", function () {
          return u.b;
        }),
        e.d(n, "isWebkit", function () {
          return u.g;
        }),
        e.d(n, "isIqiyiApp", function () {
          return u.e;
        }),
        e.d(n, "isChrome", function () {
          return u.a;
        }),
        e.d(n, "isSafari", function () {
          return u.f;
        });
      var c = e(2);
      e.d(n, "log", function () {
        return c.b;
      }),
        e.d(n, "table", function () {
          return c.c;
        }),
        e.d(n, "clear", function () {
          return c.a;
        });
      var a = e(19);
      e.d(n, "isMobile", function () {
        return a.a;
      });
      var f = e(5);
      e.d(n, "versionMap", function () {
        return f.a;
      });
      var s = e(6);
      e.d(n, "isMac", function () {
        return s.d;
      }),
        e.d(n, "isIpad", function () {
          return s.b;
        }),
        e.d(n, "isIphone", function () {
          return s.c;
        }),
        e.d(n, "isAndroid", function () {
          return s.a;
        }),
        e.d(n, "isWindows", function () {
          return s.e;
        });
      var l = new r.a({
        checkers: [
          i.erudaChecker,
          i.elementIdChecker,
          i.regToStringChecker,
          i.functionToStringChecker,
          i.depRegToStringChecker,
          i.dateToStringChecker,
          i.performanceChecker,
          i.debuggerChecker
        ]
      });
      n.default = l;
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return r;
      });
      for (var r = {}, i = 0, o = (e(3).b || "").match(/\w+\/(\d|\.)+(\s|$)/gi) || []; i < o.length; i++) {
        var u = o[i].split("/"),
          c = u[0],
          a = u[1];
        r[c] = a;
      }
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "d", function () {
        return i;
      }),
        e.d(n, "b", function () {
          return o;
        }),
        e.d(n, "c", function () {
          return u;
        }),
        e.d(n, "a", function () {
          return c;
        }),
        e.d(n, "e", function () {
          return a;
        });
      var r = e(3),
        i = /macintosh/i.test(r.b),
        o = /ipad/i.test(r.b) || (i && navigator.maxTouchPoints > 1),
        u = /iphone/i.test(r.b),
        c = /android/i.test(r.b),
        a = /windows/i.test(r.b);
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return o;
      });
      var r =
          (this && this.__awaiter) ||
          function (t, n, e, r) {
            return new (e || (e = Promise))(function (i, o) {
              function u(t) {
                try {
                  a(r.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function c(t) {
                try {
                  a(r.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                t.done
                  ? i(t.value)
                  : (function (t) {
                      return t instanceof e
                        ? t
                        : new e(function (n) {
                            n(t);
                          });
                    })(t.value).then(u, c);
              }
              a((r = r.apply(t, n || [])).next());
            });
          },
        i =
          (this && this.__generator) ||
          function (t, n) {
            var e,
              r,
              i,
              o,
              u = {
                label: 0,
                sent: function () {
                  if (1 & i[0]) throw i[1];
                  return i[1];
                },
                trys: [],
                ops: []
              };
            return (
              (o = { next: c(0), throw: c(1), return: c(2) }),
              "function" == typeof Symbol &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function c(o) {
              return function (c) {
                return (function (o) {
                  if (e) throw new TypeError("Generator is already executing.");
                  for (; u; )
                    try {
                      if (
                        ((e = 1),
                        r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done)
                      )
                        return i;
                      switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                        case 0:
                        case 1:
                          i = o;
                          break;
                        case 4:
                          return u.label++, { value: o[1], done: false };
                        case 5:
                          u.label++, (r = o[1]), (o = [0]);
                          continue;
                        case 7:
                          (o = u.ops.pop()), u.trys.pop();
                          continue;
                        default:
                          if (!(i = (i = u.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            u = 0;
                            continue;
                          }
                          if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                            u.label = o[1];
                            break;
                          }
                          if (6 === o[0] && u.label < i[1]) {
                            (u.label = i[1]), (i = o);
                            break;
                          }
                          if (i && u.label < i[2]) {
                            (u.label = i[2]), u.ops.push(o);
                            break;
                          }
                          i[2] && u.ops.pop(), u.trys.pop();
                          continue;
                      }
                      o = n.call(t, u);
                    } catch (t) {
                      (o = [6, t]), (r = 0);
                    } finally {
                      e = i = 0;
                    }
                  if (5 & o[0]) throw o[1];
                  return { value: o[0] ? o[1] : void 0, done: true };
                })([o, c]);
              };
            }
          },
        o = (function () {
          function t(t) {
            var n = t.checkers;
            (this._listeners = []),
              (this._isOpen = false),
              (this._detectLoopStopped = true),
              (this._detectLoopDelay = 500),
              (this._checkers = n.slice());
          }
          return (
            (t.prototype.launch = function () {
              this._detectLoopDelay <= 0 && this.setDetectDelay(500),
                this._detectLoopStopped && ((this._detectLoopStopped = false), this._detectLoop());
            }),
            (t.prototype.stop = function () {
              this._detectLoopStopped || ((this._detectLoopStopped = true), clearTimeout(this._timer));
            }),
            (t.prototype.isLaunch = function () {
              return !this._detectLoopStopped;
            }),
            (t.prototype.setDetectDelay = function (t) {
              this._detectLoopDelay = t;
            }),
            (t.prototype.addListener = function (t) {
              this._listeners.push(t);
            }),
            (t.prototype.removeListener = function (t) {
              this._listeners = this._listeners.filter(function (n) {
                return n !== t;
              });
            }),
            (t.prototype._broadcast = function (t) {
              for (var n = 0, e = this._listeners; n < e.length; n++) {
                var r = e[n];
                try {
                  r(t.isOpen, t);
                } catch (t) {}
              }
            }),
            (t.prototype._detectLoop = function () {
              return r(this, void 0, void 0, function () {
                var t,
                  n,
                  e,
                  r,
                  o,
                  u = this;
                return i(this, function (i) {
                  switch (i.label) {
                    case 0:
                      (t = false), (n = ""), (e = 0), (r = this._checkers), (i.label = 1);
                    case 1:
                      return e < r.length ? [4, (o = r[e]).isEnable()] : [3, 6];
                    case 2:
                      return i.sent() ? ((n = o.name), [4, o.isOpen()]) : [3, 4];
                    case 3:
                      (t = i.sent()), (i.label = 4);
                    case 4:
                      if (t) return [3, 6];
                      i.label = 5;
                    case 5:
                      return e++, [3, 1];
                    case 6:
                      return (
                        t != this._isOpen && ((this._isOpen = t), this._broadcast({ isOpen: t, checkerName: n })),
                        this._detectLoopDelay > 0
                          ? (this._timer = setTimeout(function () {
                              return u._detectLoop();
                            }, this._detectLoopDelay))
                          : this.stop(),
                        [2]
                      );
                  }
                });
              });
            }),
            t
          );
        })();
    },
    function (t, n, e) {
      "use strict";
      Object.defineProperty(n, "__esModule", { value: true });
      var r = e(9);
      e.d(n, "depRegToStringChecker", function () {
        return r.a;
      });
      var i = e(12);
      e.d(n, "elementIdChecker", function () {
        return i.a;
      });
      var o = e(13);
      e.d(n, "functionToStringChecker", function () {
        return o.a;
      });
      var u = e(14);
      e.d(n, "regToStringChecker", function () {
        return u.a;
      });
      var c = e(15);
      e.d(n, "debuggerChecker", function () {
        return c.a;
      });
      var a = e(16);
      e.d(n, "dateToStringChecker", function () {
        return a.a;
      });
      var f = e(17);
      e.d(n, "performanceChecker", function () {
        return f.a;
      });
      var s = e(18);
      e.d(n, "erudaChecker", function () {
        return s.a;
      });
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return s;
      });
      var r = e(1),
        i = e(2),
        o = e(0),
        u =
          (this && this.__awaiter) ||
          function (t, n, e, r) {
            return new (e || (e = Promise))(function (i, o) {
              function u(t) {
                try {
                  a(r.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function c(t) {
                try {
                  a(r.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                t.done
                  ? i(t.value)
                  : (function (t) {
                      return t instanceof e
                        ? t
                        : new e(function (n) {
                            n(t);
                          });
                    })(t.value).then(u, c);
              }
              a((r = r.apply(t, n || [])).next());
            });
          },
        c =
          (this && this.__generator) ||
          function (t, n) {
            var e,
              r,
              i,
              o,
              u = {
                label: 0,
                sent: function () {
                  if (1 & i[0]) throw i[1];
                  return i[1];
                },
                trys: [],
                ops: []
              };
            return (
              (o = { next: c(0), throw: c(1), return: c(2) }),
              "function" == typeof Symbol &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function c(o) {
              return function (c) {
                return (function (o) {
                  if (e) throw new TypeError("Generator is already executing.");
                  for (; u; )
                    try {
                      if (
                        ((e = 1),
                        r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done)
                      )
                        return i;
                      switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                        case 0:
                        case 1:
                          i = o;
                          break;
                        case 4:
                          return u.label++, { value: o[1], done: false };
                        case 5:
                          u.label++, (r = o[1]), (o = [0]);
                          continue;
                        case 7:
                          (o = u.ops.pop()), u.trys.pop();
                          continue;
                        default:
                          if (!(i = (i = u.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            u = 0;
                            continue;
                          }
                          if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                            u.label = o[1];
                            break;
                          }
                          if (6 === o[0] && u.label < i[1]) {
                            (u.label = i[1]), (i = o);
                            break;
                          }
                          if (i && u.label < i[2]) {
                            (u.label = i[2]), u.ops.push(o);
                            break;
                          }
                          i[2] && u.ops.pop(), u.trys.pop();
                          continue;
                      }
                      o = n.call(t, u);
                    } catch (t) {
                      (o = [6, t]), (r = 0);
                    } finally {
                      e = i = 0;
                    }
                  if (5 & o[0]) throw o[1];
                  return { value: o[0] ? o[1] : void 0, done: true };
                })([o, c]);
              };
            }
          },
        a = / /,
        f = false;
      a.toString = function () {
        return (f = true), s.name;
      };
      var s = {
        name: "dep-reg-to-string",
        isOpen: function () {
          return u(this, void 0, void 0, function () {
            return c(this, function (t) {
              return (f = false), Object(i.c)({ dep: a }), Object(i.a)(), [2, f];
            });
          });
        },
        isEnable: function () {
          return u(this, void 0, void 0, function () {
            return c(this, function (t) {
              return [2, Object(o.b)({ includes: [true], excludes: [r.c, r.d] })];
            });
          });
        }
      };
    },
    function (t, n) {
      var e;
      e = (function () {
        return this;
      })();
      try {
        e = e || Function("return this")() || (0, eval)("this");
      } catch (t) {
        "object" == typeof window && (e = window);
      }
      t.exports = e;
    },
    function (t, n, e) {
      var r, i, o;
      !(function (e, u) {
        (i = []), void 0 === (o = "function" == typeof (r = u) ? r.apply(n, i) : r) || (t.exports = o);
      })(0, function () {
        var t = /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
        function n(t) {
          var n = t.replace(/^v/, "").replace(/\+.*$/, ""),
            e = (function (t, n) {
              return -1 === t.indexOf(n) ? t.length : t.indexOf(n);
            })(n, "-"),
            r = n.substring(0, e).split(".");
          return r.push(n.substring(e + 1)), r;
        }
        function e(t) {
          return isNaN(Number(t)) ? t : Number(t);
        }
        function r(n) {
          if ("string" != typeof n) throw new TypeError("Invalid argument expected string");
          if (!t.test(n)) throw new Error("Invalid argument not valid semver ('" + n + "' received)");
        }
        function i(t, i) {
          [t, i].forEach(r);
          for (var o = n(t), u = n(i), c = 0; c < Math.max(o.length - 1, u.length - 1); c++) {
            var a = parseInt(o[c] || 0, 10),
              f = parseInt(u[c] || 0, 10);
            if (a > f) return 1;
            if (f > a) return -1;
          }
          var s = o[o.length - 1],
            l = u[u.length - 1];
          if (s && l) {
            var d = s.split(".").map(e),
              h = l.split(".").map(e);
            for (c = 0; c < Math.max(d.length, h.length); c++) {
              if (void 0 === d[c] || ("string" == typeof h[c] && "number" == typeof d[c])) return -1;
              if (void 0 === h[c] || ("string" == typeof d[c] && "number" == typeof h[c])) return 1;
              if (d[c] > h[c]) return 1;
              if (h[c] > d[c]) return -1;
            }
          } else if (s || l) return s ? -1 : 1;
          return 0;
        }
        var o = [">", ">=", "=", "<", "<="],
          u = { ">": [1], ">=": [0, 1], "=": [0], "<=": [-1, 0], "<": [-1] };
        return (
          (i.validate = function (n) {
            return "string" == typeof n && t.test(n);
          }),
          (i.compare = function (t, n, e) {
            !(function (t) {
              if ("string" != typeof t) throw new TypeError("Invalid operator type, expected string but got " + typeof t);
              if (-1 === o.indexOf(t)) throw new TypeError("Invalid operator, expected one of " + o.join("|"));
            })(e);
            var r = i(t, n);
            return u[e].indexOf(r) > -1;
          }),
          i
        );
      });
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return l;
      });
      var r = e(1),
        i = e(2),
        o = e(0),
        u = e(3),
        c =
          (this && this.__awaiter) ||
          function (t, n, e, r) {
            return new (e || (e = Promise))(function (i, o) {
              function u(t) {
                try {
                  a(r.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function c(t) {
                try {
                  a(r.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                t.done
                  ? i(t.value)
                  : (function (t) {
                      return t instanceof e
                        ? t
                        : new e(function (n) {
                            n(t);
                          });
                    })(t.value).then(u, c);
              }
              a((r = r.apply(t, n || [])).next());
            });
          },
        a =
          (this && this.__generator) ||
          function (t, n) {
            var e,
              r,
              i,
              o,
              u = {
                label: 0,
                sent: function () {
                  if (1 & i[0]) throw i[1];
                  return i[1];
                },
                trys: [],
                ops: []
              };
            return (
              (o = { next: c(0), throw: c(1), return: c(2) }),
              "function" == typeof Symbol &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function c(o) {
              return function (c) {
                return (function (o) {
                  if (e) throw new TypeError("Generator is already executing.");
                  for (; u; )
                    try {
                      if (
                        ((e = 1),
                        r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done)
                      )
                        return i;
                      switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                        case 0:
                        case 1:
                          i = o;
                          break;
                        case 4:
                          return u.label++, { value: o[1], done: false };
                        case 5:
                          u.label++, (r = o[1]), (o = [0]);
                          continue;
                        case 7:
                          (o = u.ops.pop()), u.trys.pop();
                          continue;
                        default:
                          if (!(i = (i = u.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            u = 0;
                            continue;
                          }
                          if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                            u.label = o[1];
                            break;
                          }
                          if (6 === o[0] && u.label < i[1]) {
                            (u.label = i[1]), (i = o);
                            break;
                          }
                          if (i && u.label < i[2]) {
                            (u.label = i[2]), u.ops.push(o);
                            break;
                          }
                          i[2] && u.ops.pop(), u.trys.pop();
                          continue;
                      }
                      o = n.call(t, u);
                    } catch (t) {
                      (o = [6, t]), (r = 0);
                    } finally {
                      e = i = 0;
                    }
                  if (5 & o[0]) throw o[1];
                  return { value: o[0] ? o[1] : void 0, done: true };
                })([o, c]);
              };
            }
          },
        f = Object(u.a)("div"),
        s = false;
      Object.defineProperty(f, "id", {
        get: function () {
          return (s = true), l.name;
        },
        configurable: true
      });
      var l = {
        name: "element-id",
        isOpen: function () {
          return c(this, void 0, void 0, function () {
            return a(this, function (t) {
              return (s = false), Object(i.b)(f), Object(i.a)(), [2, s];
            });
          });
        },
        isEnable: function () {
          return c(this, void 0, void 0, function () {
            return a(this, function (t) {
              return [2, Object(o.b)({ includes: [true], excludes: [r.d, r.b, r.c] })];
            });
          });
        }
      };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return l;
      });
      var r = e(1),
        i = e(2),
        o = e(6),
        u = e(0),
        c =
          (this && this.__awaiter) ||
          function (t, n, e, r) {
            return new (e || (e = Promise))(function (i, o) {
              function u(t) {
                try {
                  a(r.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function c(t) {
                try {
                  a(r.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                t.done
                  ? i(t.value)
                  : (function (t) {
                      return t instanceof e
                        ? t
                        : new e(function (n) {
                            n(t);
                          });
                    })(t.value).then(u, c);
              }
              a((r = r.apply(t, n || [])).next());
            });
          },
        a =
          (this && this.__generator) ||
          function (t, n) {
            var e,
              r,
              i,
              o,
              u = {
                label: 0,
                sent: function () {
                  if (1 & i[0]) throw i[1];
                  return i[1];
                },
                trys: [],
                ops: []
              };
            return (
              (o = { next: c(0), throw: c(1), return: c(2) }),
              "function" == typeof Symbol &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function c(o) {
              return function (c) {
                return (function (o) {
                  if (e) throw new TypeError("Generator is already executing.");
                  for (; u; )
                    try {
                      if (
                        ((e = 1),
                        r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done)
                      )
                        return i;
                      switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                        case 0:
                        case 1:
                          i = o;
                          break;
                        case 4:
                          return u.label++, { value: o[1], done: false };
                        case 5:
                          u.label++, (r = o[1]), (o = [0]);
                          continue;
                        case 7:
                          (o = u.ops.pop()), u.trys.pop();
                          continue;
                        default:
                          if (!(i = (i = u.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            u = 0;
                            continue;
                          }
                          if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                            u.label = o[1];
                            break;
                          }
                          if (6 === o[0] && u.label < i[1]) {
                            (u.label = i[1]), (i = o);
                            break;
                          }
                          if (i && u.label < i[2]) {
                            (u.label = i[2]), u.ops.push(o);
                            break;
                          }
                          i[2] && u.ops.pop(), u.trys.pop();
                          continue;
                      }
                      o = n.call(t, u);
                    } catch (t) {
                      (o = [6, t]), (r = 0);
                    } finally {
                      e = i = 0;
                    }
                  if (5 & o[0]) throw o[1];
                  return { value: o[0] ? o[1] : void 0, done: true };
                })([o, c]);
              };
            }
          };
      function f() {}
      var s = 0;
      f.toString = function () {
        return s++, "";
      };
      var l = {
        name: "function-to-string",
        isOpen: function () {
          return c(this, void 0, void 0, function () {
            return a(this, function (t) {
              return (s = 0), Object(i.b)(f), Object(i.a)(), [2, 2 === s];
            });
          });
        },
        isEnable: function () {
          return c(this, void 0, void 0, function () {
            return a(this, function (t) {
              return [2, Object(u.b)({ includes: [true], excludes: [r.e, r.c, (o.b || o.c) && r.a] })];
            });
          });
        }
      };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return s;
      });
      var r = e(2),
        i = e(1),
        o = e(0),
        u =
          (this && this.__awaiter) ||
          function (t, n, e, r) {
            return new (e || (e = Promise))(function (i, o) {
              function u(t) {
                try {
                  a(r.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function c(t) {
                try {
                  a(r.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                t.done
                  ? i(t.value)
                  : (function (t) {
                      return t instanceof e
                        ? t
                        : new e(function (n) {
                            n(t);
                          });
                    })(t.value).then(u, c);
              }
              a((r = r.apply(t, n || [])).next());
            });
          },
        c =
          (this && this.__generator) ||
          function (t, n) {
            var e,
              r,
              i,
              o,
              u = {
                label: 0,
                sent: function () {
                  if (1 & i[0]) throw i[1];
                  return i[1];
                },
                trys: [],
                ops: []
              };
            return (
              (o = { next: c(0), throw: c(1), return: c(2) }),
              "function" == typeof Symbol &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function c(o) {
              return function (c) {
                return (function (o) {
                  if (e) throw new TypeError("Generator is already executing.");
                  for (; u; )
                    try {
                      if (
                        ((e = 1),
                        r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done)
                      )
                        return i;
                      switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                        case 0:
                        case 1:
                          i = o;
                          break;
                        case 4:
                          return u.label++, { value: o[1], done: false };
                        case 5:
                          u.label++, (r = o[1]), (o = [0]);
                          continue;
                        case 7:
                          (o = u.ops.pop()), u.trys.pop();
                          continue;
                        default:
                          if (!(i = (i = u.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            u = 0;
                            continue;
                          }
                          if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                            u.label = o[1];
                            break;
                          }
                          if (6 === o[0] && u.label < i[1]) {
                            (u.label = i[1]), (i = o);
                            break;
                          }
                          if (i && u.label < i[2]) {
                            (u.label = i[2]), u.ops.push(o);
                            break;
                          }
                          i[2] && u.ops.pop(), u.trys.pop();
                          continue;
                      }
                      o = n.call(t, u);
                    } catch (t) {
                      (o = [6, t]), (r = 0);
                    } finally {
                      e = i = 0;
                    }
                  if (5 & o[0]) throw o[1];
                  return { value: o[0] ? o[1] : void 0, done: true };
                })([o, c]);
              };
            }
          },
        a = / /,
        f = false;
      a.toString = function () {
        return (f = true), s.name;
      };
      var s = {
        name: "reg-to-string",
        isOpen: function () {
          return u(this, void 0, void 0, function () {
            return c(this, function (t) {
              return (f = false), Object(r.b)(a), Object(r.a)(), [2, f];
            });
          });
        },
        isEnable: function () {
          return u(this, void 0, void 0, function () {
            return c(this, function (t) {
              return [2, Object(o.b)({ includes: [true], excludes: [i.g] })];
            });
          });
        }
      };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return u;
      });
      var r = e(0),
        i =
          (this && this.__awaiter) ||
          function (t, n, e, r) {
            return new (e || (e = Promise))(function (i, o) {
              function u(t) {
                try {
                  a(r.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function c(t) {
                try {
                  a(r.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                t.done
                  ? i(t.value)
                  : (function (t) {
                      return t instanceof e
                        ? t
                        : new e(function (n) {
                            n(t);
                          });
                    })(t.value).then(u, c);
              }
              a((r = r.apply(t, n || [])).next());
            });
          },
        o =
          (this && this.__generator) ||
          function (t, n) {
            var e,
              r,
              i,
              o,
              u = {
                label: 0,
                sent: function () {
                  if (1 & i[0]) throw i[1];
                  return i[1];
                },
                trys: [],
                ops: []
              };
            return (
              (o = { next: c(0), throw: c(1), return: c(2) }),
              "function" == typeof Symbol &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function c(o) {
              return function (c) {
                return (function (o) {
                  if (e) throw new TypeError("Generator is already executing.");
                  for (; u; )
                    try {
                      if (
                        ((e = 1),
                        r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done)
                      )
                        return i;
                      switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                        case 0:
                        case 1:
                          i = o;
                          break;
                        case 4:
                          return u.label++, { value: o[1], done: false };
                        case 5:
                          u.label++, (r = o[1]), (o = [0]);
                          continue;
                        case 7:
                          (o = u.ops.pop()), u.trys.pop();
                          continue;
                        default:
                          if (!(i = (i = u.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            u = 0;
                            continue;
                          }
                          if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                            u.label = o[1];
                            break;
                          }
                          if (6 === o[0] && u.label < i[1]) {
                            (u.label = i[1]), (i = o);
                            break;
                          }
                          if (i && u.label < i[2]) {
                            (u.label = i[2]), u.ops.push(o);
                            break;
                          }
                          i[2] && u.ops.pop(), u.trys.pop();
                          continue;
                      }
                      o = n.call(t, u);
                    } catch (t) {
                      (o = [6, t]), (r = 0);
                    } finally {
                      e = i = 0;
                    }
                  if (5 & o[0]) throw o[1];
                  return { value: o[0] ? o[1] : void 0, done: true };
                })([o, c]);
              };
            }
          },
        u = {
          name: "debugger-checker",
          isOpen: function () {
            return i(this, void 0, void 0, function () {
              var t;
              return o(this, function (n) {
                return (t = Object(r.c)()), function () {}.constructor("debugger")(), [2, Object(r.c)() - t > 100];
              });
            });
          },
          isEnable: function () {
            return i(this, void 0, void 0, function () {
              return o(this, function (t) {
                return [2, true];
              });
            });
          }
        };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return l;
      });
      var r = e(1),
        i = e(2),
        o = e(0),
        u = e(4),
        c =
          (this && this.__awaiter) ||
          function (t, n, e, r) {
            return new (e || (e = Promise))(function (i, o) {
              function u(t) {
                try {
                  a(r.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function c(t) {
                try {
                  a(r.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                t.done
                  ? i(t.value)
                  : (function (t) {
                      return t instanceof e
                        ? t
                        : new e(function (n) {
                            n(t);
                          });
                    })(t.value).then(u, c);
              }
              a((r = r.apply(t, n || [])).next());
            });
          },
        a =
          (this && this.__generator) ||
          function (t, n) {
            var e,
              r,
              i,
              o,
              u = {
                label: 0,
                sent: function () {
                  if (1 & i[0]) throw i[1];
                  return i[1];
                },
                trys: [],
                ops: []
              };
            return (
              (o = { next: c(0), throw: c(1), return: c(2) }),
              "function" == typeof Symbol &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function c(o) {
              return function (c) {
                return (function (o) {
                  if (e) throw new TypeError("Generator is already executing.");
                  for (; u; )
                    try {
                      if (
                        ((e = 1),
                        r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done)
                      )
                        return i;
                      switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                        case 0:
                        case 1:
                          i = o;
                          break;
                        case 4:
                          return u.label++, { value: o[1], done: false };
                        case 5:
                          u.label++, (r = o[1]), (o = [0]);
                          continue;
                        case 7:
                          (o = u.ops.pop()), u.trys.pop();
                          continue;
                        default:
                          if (!(i = (i = u.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            u = 0;
                            continue;
                          }
                          if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                            u.label = o[1];
                            break;
                          }
                          if (6 === o[0] && u.label < i[1]) {
                            (u.label = i[1]), (i = o);
                            break;
                          }
                          if (i && u.label < i[2]) {
                            (u.label = i[2]), u.ops.push(o);
                            break;
                          }
                          i[2] && u.ops.pop(), u.trys.pop();
                          continue;
                      }
                      o = n.call(t, u);
                    } catch (t) {
                      (o = [6, t]), (r = 0);
                    } finally {
                      e = i = 0;
                    }
                  if (5 & o[0]) throw o[1];
                  return { value: o[0] ? o[1] : void 0, done: true };
                })([o, c]);
              };
            }
          },
        f = new Date(),
        s = 0;
      f.toString = function () {
        return s++, "";
      };
      var l = {
        name: "date-to-string",
        isOpen: function () {
          return c(this, void 0, void 0, function () {
            return a(this, function (t) {
              return (s = 0), Object(i.b)(f), Object(i.a)(), [2, 2 === s];
            });
          });
        },
        isEnable: function () {
          return c(this, void 0, void 0, function () {
            return a(this, function (t) {
              return [2, Object(o.b)({ includes: [r.a], excludes: [(u.isIpad || u.isIphone) && r.a] })];
            });
          });
        }
      };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return s;
      });
      var r = e(1),
        i = e(2),
        o = e(0),
        u =
          (this && this.__awaiter) ||
          function (t, n, e, r) {
            return new (e || (e = Promise))(function (i, o) {
              function u(t) {
                try {
                  a(r.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function c(t) {
                try {
                  a(r.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                t.done
                  ? i(t.value)
                  : (function (t) {
                      return t instanceof e
                        ? t
                        : new e(function (n) {
                            n(t);
                          });
                    })(t.value).then(u, c);
              }
              a((r = r.apply(t, n || [])).next());
            });
          },
        c =
          (this && this.__generator) ||
          function (t, n) {
            var e,
              r,
              i,
              o,
              u = {
                label: 0,
                sent: function () {
                  if (1 & i[0]) throw i[1];
                  return i[1];
                },
                trys: [],
                ops: []
              };
            return (
              (o = { next: c(0), throw: c(1), return: c(2) }),
              "function" == typeof Symbol &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function c(o) {
              return function (c) {
                return (function (o) {
                  if (e) throw new TypeError("Generator is already executing.");
                  for (; u; )
                    try {
                      if (
                        ((e = 1),
                        r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done)
                      )
                        return i;
                      switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                        case 0:
                        case 1:
                          i = o;
                          break;
                        case 4:
                          return u.label++, { value: o[1], done: false };
                        case 5:
                          u.label++, (r = o[1]), (o = [0]);
                          continue;
                        case 7:
                          (o = u.ops.pop()), u.trys.pop();
                          continue;
                        default:
                          if (!(i = (i = u.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            u = 0;
                            continue;
                          }
                          if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                            u.label = o[1];
                            break;
                          }
                          if (6 === o[0] && u.label < i[1]) {
                            (u.label = i[1]), (i = o);
                            break;
                          }
                          if (i && u.label < i[2]) {
                            (u.label = i[2]), u.ops.push(o);
                            break;
                          }
                          i[2] && u.ops.pop(), u.trys.pop();
                          continue;
                      }
                      o = n.call(t, u);
                    } catch (t) {
                      (o = [6, t]), (r = 0);
                    } finally {
                      e = i = 0;
                    }
                  if (5 & o[0]) throw o[1];
                  return { value: o[0] ? o[1] : void 0, done: true };
                })([o, c]);
              };
            }
          },
        a = null,
        f = 0,
        s = {
          name: "performance",
          isOpen: function () {
            return u(this, void 0, void 0, function () {
              var t, n;
              return c(this, function (e) {
                return (
                  null === a &&
                    (a = (function () {
                      for (
                        var t = (function () {
                            for (var t = {}, n = 0; n < 500; n++) t["".concat(n)] = "".concat(n);
                            return t;
                          })(),
                          n = [],
                          e = 0;
                        e < 50;
                        e++
                      )
                        n.push(t);
                      return n;
                    })()),
                  (t = (function () {
                    var t = Object(o.c)();
                    return Object(i.c)(a), Object(o.c)() - t;
                  })()),
                  (n = (function () {
                    var t = Object(o.c)();
                    return Object(i.b)(a), Object(o.c)() - t;
                  })()),
                  (f = Math.max(f, n)),
                  Object(i.a)(),
                  0 === t ? [2, false] : 0 === f ? [2, false] : [2, t > 10 * f]
                );
              });
            });
          },
          isEnable: function () {
            return u(this, void 0, void 0, function () {
              return c(this, function (t) {
                return [2, Object(o.b)({ includes: [r.a], excludes: [] })];
              });
            });
          }
        };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return o;
      });
      var r =
          (this && this.__awaiter) ||
          function (t, n, e, r) {
            return new (e || (e = Promise))(function (i, o) {
              function u(t) {
                try {
                  a(r.next(t));
                } catch (t) {
                  o(t);
                }
              }
              function c(t) {
                try {
                  a(r.throw(t));
                } catch (t) {
                  o(t);
                }
              }
              function a(t) {
                t.done
                  ? i(t.value)
                  : (function (t) {
                      return t instanceof e
                        ? t
                        : new e(function (n) {
                            n(t);
                          });
                    })(t.value).then(u, c);
              }
              a((r = r.apply(t, n || [])).next());
            });
          },
        i =
          (this && this.__generator) ||
          function (t, n) {
            var e,
              r,
              i,
              o,
              u = {
                label: 0,
                sent: function () {
                  if (1 & i[0]) throw i[1];
                  return i[1];
                },
                trys: [],
                ops: []
              };
            return (
              (o = { next: c(0), throw: c(1), return: c(2) }),
              "function" == typeof Symbol &&
                (o[Symbol.iterator] = function () {
                  return this;
                }),
              o
            );
            function c(o) {
              return function (c) {
                return (function (o) {
                  if (e) throw new TypeError("Generator is already executing.");
                  for (; u; )
                    try {
                      if (
                        ((e = 1),
                        r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done)
                      )
                        return i;
                      switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                        case 0:
                        case 1:
                          i = o;
                          break;
                        case 4:
                          return u.label++, { value: o[1], done: false };
                        case 5:
                          u.label++, (r = o[1]), (o = [0]);
                          continue;
                        case 7:
                          (o = u.ops.pop()), u.trys.pop();
                          continue;
                        default:
                          if (!(i = (i = u.trys).length > 0 && i[i.length - 1]) && (6 === o[0] || 2 === o[0])) {
                            u = 0;
                            continue;
                          }
                          if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                            u.label = o[1];
                            break;
                          }
                          if (6 === o[0] && u.label < i[1]) {
                            (u.label = i[1]), (i = o);
                            break;
                          }
                          if (i && u.label < i[2]) {
                            (u.label = i[2]), u.ops.push(o);
                            break;
                          }
                          i[2] && u.ops.pop(), u.trys.pop();
                          continue;
                      }
                      o = n.call(t, u);
                    } catch (t) {
                      (o = [6, t]), (r = 0);
                    } finally {
                      e = i = 0;
                    }
                  if (5 & o[0]) throw o[1];
                  return { value: o[0] ? o[1] : void 0, done: true };
                })([o, c]);
              };
            }
          },
        o = {
          name: "eruda",
          isOpen: function () {
            var t;
            return r(this, void 0, void 0, function () {
              return i(this, function (n) {
                return "undefined" != typeof eruda
                  ? [2, true === (null === (t = null === eruda || void 0 === eruda ? void 0 : eruda._devTools) || void 0 === t ? void 0 : t._isShow)]
                  : [2, false];
              });
            });
          },
          isEnable: function () {
            return r(this, void 0, void 0, function () {
              return i(this, function (t) {
                return [2, true];
              });
            });
          }
        };
    },
    function (t, n, e) {
      "use strict";
      e.d(n, "a", function () {
        return i;
      });
      var r = e(3),
        i = /mobile/i.test(r.b);
    }
  ]);
});
