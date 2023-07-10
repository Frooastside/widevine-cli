!(function (W5, W6) {
  "use strict";
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = W5.document
        ? W6(W5, true)
        : function (W7) {
            if (W7.document) {
              return W6(W7);
            }
            throw new Error("jQuery requires a window with a document");
          })
    : W6(W5);
})("undefined" != typeof window ? window : this, function (W5, W6) {
  "use strict";

  function W7(Dc) {
    return "function" == typeof Dc && "number" != typeof Dc.nodeType;
  }

  function W8(Dc) {
    return null != Dc && Dc === Dc.window;
  }

  var W9 = [],
    WW = W5.document,
    Wf = Object.getPrototypeOf,
    WD = W9.slice,
    Wu = W9.concat,
    Wl = W9.push,
    Wg = W9.indexOf,
    Wo = {},
    WT = Wo.toString,
    WC = Wo.hasOwnProperty,
    Wq = WC.toString,
    WE = Wq.call(Object),
    WP = {
      checkClone: fQ.cloneNode(true).cloneNode(true).lastChild.checked,
      noCloneChecked: !!fQ.cloneNode(true).lastChild.defaultValue,
      checkOn: "" !== fa.value,
      optSelected: fQ.selected,
      radioValue: "t" === fa.value
    };

  function WM(Dc, Dy, Di) {
    var DU,
      DL = (Dy = Dy || WW).createElement("script");
    if (((DL.text = Dc), Di)) {
      for (DU in Wk) Di[DU] && (DL[DU] = Di[DU]);
    }
    Dy.head.appendChild(DL).parentNode.removeChild(DL);
  }

  function WG(Dc) {
    return null == Dc ? Dc + "" : "object" == typeof Dc || "function" == typeof Dc ? Wo[WT.call(Dc)] || "object" : typeof Dc;
  }

  var Ww = function (Dc, Dy) {
    return new Ww.fn.init(Dc, Dy);
  };

  function WF(Dc) {
    var Dy = !!Dc && "length" in Dc && Dc.length,
      Di = WG(Dc);
    return !W7(Dc) && !W8(Dc) && ("array" === Di || 0 === Dy || ("number" == typeof Dy && 0 < Dy && Dy - 1 in Dc));
  }

  Ww.fn = Ww.prototype = {
    jquery: "3.3.1",
    constructor: Ww,
    length: 0,
    toArray: function () {
      return WD.call(this);
    },
    get: function (Dc) {
      return null == Dc ? WD.call(this) : Dc < 0 ? this[Dc + this.length] : this[Dc];
    },
    pushStack: function (Dc) {
      Dc = Ww.merge(this.constructor(), Dc);
      return (Dc.prevObject = this), Dc;
    },
    each: function (Dc) {
      return Ww.each(this, Dc);
    },
    map: function (Dc) {
      return this.pushStack(
        Ww.map(this, function (Dy, Di) {
          return Dc.call(Dy, Di, Dy);
        })
      );
    },
    slice: function () {
      return this.pushStack(WD.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (Dc) {
      var Dy = this.length,
        Dc = +Dc + (Dc < 0 ? Dy : 0);
      return this.pushStack(0 <= Dc && Dc < Dy ? [this[Dc]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor();
    },
    push: Wl,
    sort: W9.sort,
    splice: W9.splice
  };
  Ww.extend = Ww.fn.extend = function () {
    var Dc,
      Dy,
      Di,
      DU,
      DL,
      Dd = arguments[0] || {},
      Dv = 1,
      DO = arguments.length,
      Dz = false;
    for (
      "boolean" == typeof Dd && ((Dz = Dd), (Dd = arguments[Dv] || {}), Dv++),
        "object" == typeof Dd || W7(Dd) || (Dd = {}),
        Dv === DO && ((Dd = this), Dv--);
      Dv < DO;
      Dv++
    ) {
      if (null != (Dc = arguments[Dv])) {
        for (Dy in Dc)
          (DL = Dd[Dy]),
            Dd !== (Di = Dc[Dy]) &&
              (Dz && Di && (Ww.isPlainObject(Di) || (DU = Array.isArray(Di)))
                ? ((DL = DU ? ((DU = false), DL && Array.isArray(DL) ? DL : []) : DL && Ww.isPlainObject(DL) ? DL : {}),
                  (Dd[Dy] = Ww.extend(Dz, DL, Di)))
                : void 0 !== Di && (Dd[Dy] = Di));
      }
    }
    return Dd;
  };
  Ww.extend({
    expando: "jQuery" + ("3.3.1" + Math.random()).replace(/\D/g, ""),
    isReady: true,
    error: function (Dc) {
      throw new Error(Dc);
    },
    noop: function () {},
    isPlainObject: function (Dc) {
      return !(
        !Dc ||
        "[object Object]" !== WT.call(Dc) ||
        ((Dc = Wf(Dc)) && ("function" != typeof (Dc = WC.call(Dc, "constructor") && Dc.constructor) || Wq.call(Dc) !== WE))
      );
    },
    isEmptyObject: function (Dc) {
      for (var Dy in Dc) return false;
      return true;
    },
    globalEval: function (Dc) {
      WM(Dc);
    },
    each: function (Dc, Dy) {
      var Di,
        DU = 0;
      if (WF(Dc)) {
        for (Di = Dc.length; DU < Di && false !== Dy.call(Dc[DU], DU, Dc[DU]); DU++) {}
      } else {
        for (DU in Dc)
          if (false === Dy.call(Dc[DU], DU, Dc[DU])) {
            break;
          }
      }
      return Dc;
    },
    trim: function (Dc) {
      return null == Dc ? "" : (Dc + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    },
    makeArray: function (Dc, Dy) {
      Dy = Dy || [];
      return null != Dc && (WF(Object(Dc)) ? Ww.merge(Dy, "string" == typeof Dc ? [Dc] : Dc) : Wl.call(Dy, Dc)), Dy;
    },
    inArray: function (Dc, Dy, Di) {
      return null == Dy ? -1 : Wg.call(Dy, Dc, Di);
    },
    merge: function (Dc, Dy) {
      for (var Di = +Dy.length, DU = 0, DL = Dc.length; DU < Di; DU++) {
        Dc[DL++] = Dy[DU];
      }
      return (Dc.length = DL), Dc;
    },
    grep: function (Dc, Dy, Di) {
      for (var DU = [], DL = 0, Dd = Dc.length, Dv = !Di; DL < Dd; DL++) {
        !Dy(Dc[DL], DL) != Dv && DU.push(Dc[DL]);
      }
      return DU;
    },
    map: function (Dc, Dy, Di) {
      var DU,
        DL,
        Dd = 0,
        Dv = [];
      if (WF(Dc)) {
        for (DU = Dc.length; Dd < DU; Dd++) {
          null != (DL = Dy(Dc[Dd], Dd, Di)) && Dv.push(DL);
        }
      } else {
        for (Dd in Dc) null != (DL = Dy(Dc[Dd], Dd, Di)) && Dv.push(DL);
      }
      return Wu.apply([], Dv);
    },
    guid: 1,
    support: WP
  });
  "function" == typeof Symbol && (Ww.fn[Symbol.iterator] = W9[Symbol.iterator]);
  Ww.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (Dc, Dy) {
    Wo["[object " + Dy + "]"] = Dy.toLowerCase();
  });

  function WH(Dc, Dy, Di) {
    for (var DU = [], DL = void 0 !== Di; (Dc = Dc[Dy]) && 9 !== Dc.nodeType; ) {
      if (1 === Dc.nodeType) {
        if (DL && Ww(Dc).is(Di)) {
          break;
        }
        DU.push(Dc);
      }
    }
    return DU;
  }

  function WV(Dc, Dy) {
    for (var Di = []; Dc; Dc = Dc.nextSibling) {
      1 === Dc.nodeType && Dc !== Dy && Di.push(Dc);
    }
    return Di;
  }

  var W9 = (function (Dc) {
      function Dy(ea, eQ, u0) {
        var u1 = "0x" + eQ - 65536;
        return u1 != u1 || u0 ? eQ : u1 < 0 ? String.fromCharCode(65536 + u1) : String.fromCharCode((u1 >> 10) | 55296, (1023 & u1) | 56320);
      }

      function Di(ea, eQ) {
        return eQ ? ("\0" === ea ? " " : ea.slice(0, -1) + "\\" + ea.charCodeAt(ea.length - 1).toString(16) + " ") : "\\" + ea;
      }

      function DU() {
        Da();
      }

      var DL,
        Dd,
        Dv,
        DO,
        Dz,
        DB,
        DZ,
        Dj,
        DJ,
        DR,
        Dp,
        Da,
        DQ,
        e0,
        e1,
        e2,
        e3,
        e4,
        e5,
        e6 = "sizzle" + +new Date(),
        e7 = Dc.document,
        e8 = 0,
        e9 = 0,
        eW = ec(),
        ef = ec(),
        eD = ec(),
        eu = function (ea, eQ) {
          return ea === eQ && (Dp = true), 0;
        },
        el = {}.hasOwnProperty,
        eg = [],
        eo = eg.pop,
        eT = eg.push,
        eC = eg.push,
        eq = eg.slice,
        eE = function (ea, eQ) {
          for (var u0 = 0, u1 = ea.length; u0 < u1; u0++) {
            if (ea[u0] === eQ) {
              return u0;
            }
          }
          return -1;
        },
        eP = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        eM = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        eG =
          "\\[[\\x20\\t\\r\\n\\f]*(" +
          eM +
          ")(?:" +
          "[\\x20\\t\\r\\n\\f]" +
          "*([*^$|!~]?=)" +
          "[\\x20\\t\\r\\n\\f]" +
          "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
          eM +
          "))|)" +
          "[\\x20\\t\\r\\n\\f]" +
          "*\\]",
        ew = ":(" + eM + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + eG + ")*)|.*)\\)|)",
        eS = new RegExp("[\\x20\\t\\r\\n\\f]+", "g"),
        eF = new RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$", "g"),
        eH = new RegExp("^[\\x20\\t\\r\\n\\f]*,[\\x20\\t\\r\\n\\f]*"),
        eV = new RegExp("^[\\x20\\t\\r\\n\\f]*([>+~]|[\\x20\\t\\r\\n\\f])[\\x20\\t\\r\\n\\f]*"),
        er = new RegExp("=[\\x20\\t\\r\\n\\f]*([^\\]'\"]*?)[\\x20\\t\\r\\n\\f]*\\]", "g"),
        eb = new RegExp(ew),
        eX = new RegExp("^" + eM + "$"),
        eA = {
          ID: new RegExp("^#(" + eM + ")"),
          CLASS: new RegExp("^\\.(" + eM + ")"),
          TAG: new RegExp("^(" + eM + "|[*])"),
          ATTR: new RegExp("^" + eG),
          PSEUDO: new RegExp("^" + ew),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + eP + ")$", "i"),
          needsContext: new RegExp(
            "^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)",
            "i"
          )
        },
        em = new RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)", "ig"),
        ex = eZ(
          function (ea) {
            return true === ea.disabled && ("form" in ea || "label" in ea);
          },
          {
            dir: "parentNode",
            next: "legend"
          }
        );
      try {
        eC.apply((eg = eq.call(e7.childNodes)), e7.childNodes);
        eg[e7.childNodes.length].nodeType;
      } catch (ea) {
        eC = {
          apply: eg.length
            ? function (eQ, u0) {
                eT.apply(eQ, eq.call(u0));
              }
            : function (eQ, u0) {
                for (var u1 = eQ.length, u2 = 0; (eQ[u1++] = u0[u2++]); ) {}
                eQ.length = u1 - 1;
              }
        };
      }

      function eI(eQ, u0, u1, u2) {
        var u3,
          u4,
          u5,
          u6,
          u7,
          u8,
          u9,
          uW = u0 && u0.ownerDocument,
          uf = u0 ? u0.nodeType : 9;
        if (((u1 = u1 || []), "string" != typeof eQ || !eQ || (1 !== uf && 9 !== uf && 11 !== uf))) {
          return u1;
        }
        if (!u2 && ((u0 ? u0.ownerDocument || u0 : e7) !== DQ && Da(u0), (u0 = u0 || DQ), e1)) {
          if (11 !== uf && (u7 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/.exec(eQ))) {
            if ((u3 = u7[1])) {
              if (9 === uf) {
                if (!(u5 = u0.getElementById(u3))) {
                  return u1;
                }
                if (u5.id === u3) {
                  return u1.push(u5), u1;
                }
              } else {
                if (uW && (u5 = uW.getElementById(u3)) && e5(u0, u5) && u5.id === u3) {
                  return u1.push(u5), u1;
                }
              }
            } else {
              if (u7[2]) {
                return eC.apply(u1, u0.getElementsByTagName(eQ)), u1;
              }
              if ((u3 = u7[3]) && Dd.getElementsByClassName && u0.getElementsByClassName) {
                return eC.apply(u1, u0.getElementsByClassName(u3)), u1;
              }
            }
          }
          if (Dd.qsa && !eD[eQ + " "] && (!e2 || !e2.test(eQ))) {
            if (1 !== uf) {
              uW = u0;
              u9 = eQ;
            } else {
              if ("object" !== u0.nodeName.toLowerCase()) {
                for (
                  (u6 = u0.getAttribute("id"))
                    ? (u6 = u6.replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, Di))
                    : u0.setAttribute("id", (u6 = e6)),
                    u4 = (u8 = DB(eQ)).length;
                  u4--;

                ) {
                  u8[u4] = "#" + u6 + " " + eB(u8[u4]);
                }
                u9 = u8.join(",");
                uW = (/[+~]/.test(eQ) && eO(u0.parentNode)) || u0;
              }
            }
            if (u9) {
              try {
                return eC.apply(u1, uW.querySelectorAll(u9)), u1;
              } catch (uD) {
              } finally {
                u6 === e6 && u0.removeAttribute("id");
              }
            }
          }
        }
        return Dj(eQ.replace(eF, "$1"), u0, u1, u2);
      }

      function ec() {
        var eQ = [];

        function u0(u1, u2) {
          return eQ.push(u1 + " ") > Dv.cacheLength && delete u0[eQ.shift()], (u0[u1 + " "] = u2);
        }

        return u0;
      }

      function ey(eQ) {
        return (eQ[e6] = true), eQ;
      }

      function ei(eQ) {
        var u0 = DQ.createElement("fieldset");
        try {
          return !!eQ(u0);
        } catch (u1) {
          return false;
        } finally {
          u0.parentNode && u0.parentNode.removeChild(u0);
        }
      }

      function eU(eQ, u0) {
        for (var u1 = eQ.split("|"), u2 = u1.length; u2--; ) {
          Dv.attrHandle[u1[u2]] = u0;
        }
      }

      function eL(eQ, u0) {
        var u1 = u0 && eQ,
          u2 = u1 && 1 === eQ.nodeType && 1 === u0.nodeType && eQ.sourceIndex - u0.sourceIndex;
        if (u2) {
          return u2;
        }
        if (u1) {
          for (; (u1 = u1.nextSibling); ) {
            if (u1 === u0) {
              return -1;
            }
          }
        }
        return eQ ? 1 : -1;
      }

      function ed(eQ) {
        return function (u0) {
          return "form" in u0
            ? u0.parentNode && false === u0.disabled
              ? "label" in u0
                ? "label" in u0.parentNode
                  ? u0.parentNode.disabled === eQ
                  : u0.disabled === eQ
                : u0.isDisabled === eQ || (u0.isDisabled !== !eQ && ex(u0) === eQ)
              : u0.disabled === eQ
            : "label" in u0 && u0.disabled === eQ;
        };
      }

      function ev(eQ) {
        return ey(function (u0) {
          return (
            (u0 = +u0),
            ey(function (u1, u2) {
              for (var u3, u4 = eQ([], u1.length, u0), u5 = u4.length; u5--; ) {
                u1[(u3 = u4[u5])] && (u1[u3] = !(u2[u3] = u1[u3]));
              }
            })
          );
        });
      }

      function eO(eQ) {
        return eQ && void 0 !== eQ.getElementsByTagName && eQ;
      }

      for (DL in ((Dd = eI.support = {}),
      (Dz = eI.isXML =
        function (eQ) {
          return (eQ = eQ && (eQ.ownerDocument || eQ).documentElement), !!eQ && "HTML" !== eQ.nodeName;
        }),
      (Da = eI.setDocument =
        function (eQ) {
          var eQ = eQ ? eQ.ownerDocument || eQ : e7;
          return (
            eQ !== DQ &&
              9 === eQ.nodeType &&
              eQ.documentElement &&
              ((e0 = (DQ = eQ).documentElement),
              (e1 = !Dz(DQ)),
              e7 !== DQ &&
                (eQ = DQ.defaultView) &&
                eQ.top !== eQ &&
                (eQ.addEventListener ? eQ.addEventListener("unload", DU, false) : eQ.attachEvent && eQ.attachEvent("onunload", DU)),
              (Dd.attributes = ei(function (u0) {
                return (u0.className = "i"), !u0.getAttribute("className");
              })),
              (Dd.getElementsByTagName = ei(function (u0) {
                return u0.appendChild(DQ.createComment("")), !u0.getElementsByTagName("*").length;
              })),
              (Dd.getElementsByClassName = /^[^{]+\{\s*\[native \w/.test(DQ.getElementsByClassName)),
              (Dd.getById = ei(function (u0) {
                return (e0.appendChild(u0).id = e6), !DQ.getElementsByName || !DQ.getElementsByName(e6).length;
              })),
              Dd.getById
                ? ((Dv.filter.ID = function (u0) {
                    var u1 = u0.replace(em, Dy);
                    return function (u2) {
                      return u2.getAttribute("id") === u1;
                    };
                  }),
                  (Dv.find.ID = function (u0, u1) {
                    if (void 0 !== u1.getElementById && e1) {
                      return (u1 = u1.getElementById(u0)) ? [u1] : [];
                    }
                  }))
                : ((Dv.filter.ID = function (u0) {
                    var u1 = u0.replace(em, Dy);
                    return function (u2) {
                      u2 = void 0 !== u2.getAttributeNode && u2.getAttributeNode("id");
                      return u2 && u2.value === u1;
                    };
                  }),
                  (Dv.find.ID = function (u0, u1) {
                    if (void 0 !== u1.getElementById && e1) {
                      var u2,
                        u3,
                        u4,
                        u5 = u1.getElementById(u0);
                      if (u5) {
                        if ((u2 = u5.getAttributeNode("id")) && u2.value === u0) {
                          return [u5];
                        }
                        for (u4 = u1.getElementsByName(u0), u3 = 0; (u5 = u4[u3++]); ) {
                          if ((u2 = u5.getAttributeNode("id")) && u2.value === u0) {
                            return [u5];
                          }
                        }
                      }
                      return [];
                    }
                  })),
              (Dv.find.TAG = Dd.getElementsByTagName
                ? function (u0, u1) {
                    return void 0 !== u1.getElementsByTagName ? u1.getElementsByTagName(u0) : Dd.qsa ? u1.querySelectorAll(u0) : void 0;
                  }
                : function (u0, u1) {
                    var u2,
                      u3 = [],
                      u4 = 0,
                      u5 = u1.getElementsByTagName(u0);
                    if ("*" !== u0) {
                      return u5;
                    }
                    for (; (u2 = u5[u4++]); ) {
                      1 === u2.nodeType && u3.push(u2);
                    }
                    return u3;
                  }),
              (Dv.find.CLASS =
                Dd.getElementsByClassName &&
                function (u0, u1) {
                  if (void 0 !== u1.getElementsByClassName && e1) {
                    return u1.getElementsByClassName(u0);
                  }
                }),
              (e3 = []),
              (e2 = []),
              (Dd.qsa = /^[^{]+\{\s*\[native \w/.test(DQ.querySelectorAll)) &&
                (ei(function (u0) {
                  e0.appendChild(u0).innerHTML =
                    "<a id='" + e6 + "'></a><select id='" + e6 + "-\r\\' msallowcapture=''><option selected=''></option></select>";
                  u0.querySelectorAll("[msallowcapture^='']").length && e2.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                  u0.querySelectorAll("[selected]").length || e2.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|" + eP + ")");
                  u0.querySelectorAll("[id~=" + e6 + "-]").length || e2.push("~=");
                  u0.querySelectorAll(":checked").length || e2.push(":checked");
                  u0.querySelectorAll("a#" + e6 + "+*").length || e2.push(".#.+[+~]");
                }),
                ei(function (u0) {
                  u0.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                  var u1 = DQ.createElement("input");
                  u1.setAttribute("type", "hidden");
                  u0.appendChild(u1).setAttribute("name", "D");
                  u0.querySelectorAll("[name=d]").length && e2.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?=");
                  2 !== u0.querySelectorAll(":enabled").length && e2.push(":enabled", ":disabled");
                  e0.appendChild(u0).disabled = true;
                  2 !== u0.querySelectorAll(":disabled").length && e2.push(":enabled", ":disabled");
                  u0.querySelectorAll("*,:x");
                  e2.push(",.*:");
                })),
              (Dd.matchesSelector = /^[^{]+\{\s*\[native \w/.test(
                (e4 = e0.matches || e0.webkitMatchesSelector || e0.mozMatchesSelector || e0.oMatchesSelector || e0.msMatchesSelector)
              )) &&
                ei(function (u0) {
                  e4.call(u0, "[s!='']:x");
                  e3.push("!=", ew);
                }),
              (e2 = e2.length && new RegExp(e2.join("|"))),
              (e3 = e3.length && new RegExp(e3.join("|"))),
              (eQ = /^[^{]+\{\s*\[native \w/.test(e0.compareDocumentPosition)),
              (e5 =
                eQ || /^[^{]+\{\s*\[native \w/.test(e0.contains)
                  ? function (u0, u1) {
                      var u2 = 9 === u0.nodeType ? u0.documentElement : u0,
                        u1 = u1 && u1.parentNode;
                      return (
                        u0 === u1 ||
                        !(
                          !u1 ||
                          1 !== u1.nodeType ||
                          !(u2.contains ? u2.contains(u1) : u0.compareDocumentPosition && 16 & u0.compareDocumentPosition(u1))
                        )
                      );
                    }
                  : function (u0, u1) {
                      if (u1) {
                        for (; (u1 = u1.parentNode); ) {
                          if (u1 === u0) {
                            return true;
                          }
                        }
                      }
                      return false;
                    }),
              (eu = eQ
                ? function (u0, u1) {
                    var u2;
                    return u0 === u1
                      ? ((Dp = true), 0)
                      : !u0.compareDocumentPosition - !u1.compareDocumentPosition ||
                          (1 & (u2 = (u0.ownerDocument || u0) === (u1.ownerDocument || u1) ? u0.compareDocumentPosition(u1) : 1) ||
                          (!Dd.sortDetached && u1.compareDocumentPosition(u0) === u2)
                            ? u0 === DQ || (u0.ownerDocument === e7 && e5(e7, u0))
                              ? -1
                              : u1 === DQ || (u1.ownerDocument === e7 && e5(e7, u1))
                              ? 1
                              : DR
                              ? eE(DR, u0) - eE(DR, u1)
                              : 0
                            : 4 & u2
                            ? -1
                            : 1);
                  }
                : function (u0, u1) {
                    if (u0 === u1) {
                      return (Dp = true), 0;
                    }
                    var u2,
                      u3 = 0,
                      u4 = u0.parentNode,
                      u5 = u1.parentNode,
                      u6 = [u0],
                      u7 = [u1];
                    if (!u4 || !u5) {
                      return u0 === DQ ? -1 : u1 === DQ ? 1 : u4 ? -1 : u5 ? 1 : DR ? eE(DR, u0) - eE(DR, u1) : 0;
                    }
                    if (u4 === u5) {
                      return eL(u0, u1);
                    }
                    for (u2 = u0; (u2 = u2.parentNode); ) {
                      u6.unshift(u2);
                    }
                    for (u2 = u1; (u2 = u2.parentNode); ) {
                      u7.unshift(u2);
                    }
                    for (; u6[u3] === u7[u3]; ) {
                      u3++;
                    }
                    return u3 ? eL(u6[u3], u7[u3]) : u6[u3] === e7 ? -1 : u7[u3] === e7 ? 1 : 0;
                  })),
            DQ
          );
        }),
      (eI.matches = function (eQ, u0) {
        return eI(eQ, null, null, u0);
      }),
      (eI.matchesSelector = function (eQ, u0) {
        if (
          ((eQ.ownerDocument || eQ) !== DQ && Da(eQ),
          (u0 = u0.replace(er, "='$1']")),
          Dd.matchesSelector && e1 && !eD[u0 + " "] && (!e3 || !e3.test(u0)) && (!e2 || !e2.test(u0)))
        ) {
          try {
            var u1 = e4.call(eQ, u0);
            if (u1 || Dd.disconnectedMatch || (eQ.document && 11 !== eQ.document.nodeType)) {
              return u1;
            }
          } catch (u2) {}
        }
        return 0 < eI(u0, DQ, null, [eQ]).length;
      }),
      (eI.contains = function (eQ, u0) {
        return (eQ.ownerDocument || eQ) !== DQ && Da(eQ), e5(eQ, u0);
      }),
      (eI.attr = function (eQ, u0) {
        (eQ.ownerDocument || eQ) !== DQ && Da(eQ);
        var u1 = Dv.attrHandle[u0.toLowerCase()],
          u1 = u1 && el.call(Dv.attrHandle, u0.toLowerCase()) ? u1(eQ, u0, !e1) : void 0;
        return void 0 !== u1 ? u1 : Dd.attributes || !e1 ? eQ.getAttribute(u0) : (u1 = eQ.getAttributeNode(u0)) && u1.specified ? u1.value : null;
      }),
      (eI.escape = function (eQ) {
        return (eQ + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, Di);
      }),
      (eI.error = function (eQ) {
        throw new Error("Syntax error, unrecognized expression: " + eQ);
      }),
      (eI.uniqueSort = function (eQ) {
        var u0,
          u1 = [],
          u2 = 0,
          u3 = 0;
        if (((Dp = !Dd.detectDuplicates), (DR = !Dd.sortStable && eQ.slice(0)), eQ.sort(eu), Dp)) {
          for (; (u0 = eQ[u3++]); ) {
            u0 === eQ[u3] && (u2 = u1.push(u3));
          }
          for (; u2--; ) {
            eQ.splice(u1[u2], 1);
          }
        }
        return (DR = null), eQ;
      }),
      (DO = eI.getText =
        function (eQ) {
          var u0,
            u1 = "",
            u2 = 0,
            u3 = eQ.nodeType;
          if (u3) {
            if (1 === u3 || 9 === u3 || 11 === u3) {
              if ("string" == typeof eQ.textContent) {
                return eQ.textContent;
              }
              for (eQ = eQ.firstChild; eQ; eQ = eQ.nextSibling) {
                u1 += DO(eQ);
              }
            } else {
              if (3 === u3 || 4 === u3) {
                return eQ.nodeValue;
              }
            }
          } else {
            for (; (u0 = eQ[u2++]); ) {
              u1 += DO(u0);
            }
          }
          return u1;
        }),
      ((Dv = eI.selectors =
        {
          cacheLength: 50,
          createPseudo: ey,
          match: eA,
          attrHandle: {},
          find: {},
          relative: {
            ">": {
              dir: "parentNode",
              first: true
            },
            " ": { dir: "parentNode" },
            "+": {
              dir: "previousSibling",
              first: true
            },
            "~": { dir: "previousSibling" }
          },
          preFilter: {
            ATTR: function (eQ) {
              return (
                (eQ[1] = eQ[1].replace(em, Dy)),
                (eQ[3] = (eQ[3] || eQ[4] || eQ[5] || "").replace(em, Dy)),
                "~=" === eQ[2] && (eQ[3] = " " + eQ[3] + " "),
                eQ.slice(0, 4)
              );
            },
            CHILD: function (eQ) {
              return (
                (eQ[1] = eQ[1].toLowerCase()),
                "nth" === eQ[1].slice(0, 3)
                  ? (eQ[3] || eI.error(eQ[0]),
                    (eQ[4] = +(eQ[4] ? eQ[5] + (eQ[6] || 1) : 2 * ("even" === eQ[3] || "odd" === eQ[3]))),
                    (eQ[5] = +(eQ[7] + eQ[8] || "odd" === eQ[3])))
                  : eQ[3] && eI.error(eQ[0]),
                eQ
              );
            },
            PSEUDO: function (eQ) {
              var u0,
                u1 = !eQ[6] && eQ[2];
              return eA.CHILD.test(eQ[0])
                ? null
                : (eQ[3]
                    ? (eQ[2] = eQ[4] || eQ[5] || "")
                    : u1 &&
                      eb.test(u1) &&
                      (u0 = (u0 = DB(u1, true)) && u1.indexOf(")", u1.length - u0) - u1.length) &&
                      ((eQ[0] = eQ[0].slice(0, u0)), (eQ[2] = u1.slice(0, u0))),
                  eQ.slice(0, 3));
            }
          },
          filter: {
            TAG: function (eQ) {
              var u0 = eQ.replace(em, Dy).toLowerCase();
              return "*" === eQ
                ? function () {
                    return true;
                  }
                : function (u1) {
                    return u1.nodeName && u1.nodeName.toLowerCase() === u0;
                  };
            },
            CLASS: function (eQ) {
              var u0 = eW[eQ + " "];
              return (
                u0 ||
                ((u0 = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + eQ + "(" + "[\\x20\\t\\r\\n\\f]" + "|$)")) &&
                  eW(eQ, function (u1) {
                    return u0.test(
                      ("string" == typeof u1.className && u1.className) || (void 0 !== u1.getAttribute && u1.getAttribute("class")) || ""
                    );
                  }))
              );
            },
            ATTR: function (eQ, u0, u1) {
              return function (u2) {
                return (
                  (u2 = eI.attr(u2, eQ)),
                  null == u2
                    ? "!=" === u0
                    : !u0 ||
                      ((u2 += ""),
                      "=" === u0
                        ? u2 === u1
                        : "!=" === u0
                        ? u2 !== u1
                        : "^=" === u0
                        ? u1 && 0 === u2.indexOf(u1)
                        : "*=" === u0
                        ? u1 && -1 < u2.indexOf(u1)
                        : "$=" === u0
                        ? u1 && u2.slice(-u1.length) === u1
                        : "~=" === u0
                        ? -1 < (" " + u2.replace(eS, " ") + " ").indexOf(u1)
                        : "|=" === u0 && (u2 === u1 || u2.slice(0, u1.length + 1) === u1 + "-"))
                );
              };
            },
            CHILD: function (eQ, u0, u1, u2, u3) {
              var u4 = "nth" !== eQ.slice(0, 3),
                u5 = "last" !== eQ.slice(-4),
                u6 = "of-type" === u0;
              return 1 === u2 && 0 === u3
                ? function (u7) {
                    return !!u7.parentNode;
                  }
                : function (u7, u8, u9) {
                    var uW,
                      uf,
                      uD,
                      uu,
                      ul,
                      ug,
                      uo = u4 != u5 ? "nextSibling" : "previousSibling",
                      uT = u7.parentNode,
                      uC = u6 && u7.nodeName.toLowerCase(),
                      uq = !u9 && !u6,
                      uE = false;
                    if (uT) {
                      if (u4) {
                        for (; uo; ) {
                          for (uu = u7; (uu = uu[uo]); ) {
                            if (u6 ? uu.nodeName.toLowerCase() === uC : 1 === uu.nodeType) {
                              return false;
                            }
                          }
                          ug = uo = "only" === eQ && !ug && "nextSibling";
                        }
                        return true;
                      }
                      if (((ug = [u5 ? uT.firstChild : uT.lastChild]), u5 && uq)) {
                        for (
                          uE =
                            (ul =
                              (uW = (uf = (uD = (uu = uT)[e6] || (uu[e6] = {}))[uu.uniqueID] || (uD[uu.uniqueID] = {}))[eQ] || [])[0] === e8 &&
                              uW[1]) && uW[2],
                            uu = ul && uT.childNodes[ul];
                          (uu = (++ul && uu && uu[uo]) || ((uE = ul = 0), ug.pop()));

                        ) {
                          if (1 === uu.nodeType && ++uE && uu === u7) {
                            uf[eQ] = [e8, ul, uE];
                            break;
                          }
                        }
                      } else {
                        if (
                          false ===
                          (uE = uq
                            ? (ul =
                                (uW = (uf = (uD = (uu = u7)[e6] || (uu[e6] = {}))[uu.uniqueID] || (uD[uu.uniqueID] = {}))[eQ] || [])[0] === e8 &&
                                uW[1])
                            : uE)
                        ) {
                          for (
                            ;
                            (uu = (++ul && uu && uu[uo]) || ((uE = ul = 0), ug.pop())) &&
                            ((u6 ? uu.nodeName.toLowerCase() !== uC : 1 !== uu.nodeType) ||
                              !++uE ||
                              (uq && ((uf = (uD = uu[e6] || (uu[e6] = {}))[uu.uniqueID] || (uD[uu.uniqueID] = {}))[eQ] = [e8, uE]), uu !== u7));

                          ) {}
                        }
                      }
                      return (uE -= u3) === u2 || (uE % u2 == 0 && 0 <= uE / u2);
                    }
                  };
            },
            PSEUDO: function (eQ, u0) {
              var u1,
                u2 = Dv.pseudos[eQ] || Dv.setFilters[eQ.toLowerCase()] || eI.error("unsupported pseudo: " + eQ);
              return u2[e6]
                ? u2(u0)
                : 1 < u2.length
                ? ((u1 = [eQ, eQ, "", u0]),
                  Dv.setFilters.hasOwnProperty(eQ.toLowerCase())
                    ? ey(function (u3, u4) {
                        for (var u5, u6 = u2(u3, u0), u7 = u6.length; u7--; ) {
                          u3[(u5 = eE(u3, u6[u7]))] = !(u4[u5] = u6[u7]);
                        }
                      })
                    : function (u3) {
                        return u2(u3, 0, u1);
                      })
                : u2;
            }
          },
          pseudos: {
            not: ey(function (eQ) {
              var u0 = [],
                u1 = [],
                u2 = DZ(eQ.replace(eF, "$1"));
              return u2[e6]
                ? ey(function (u3, u4, u5, u6) {
                    for (var u7, u8 = u2(u3, null, u6, []), u9 = u3.length; u9--; ) {
                      (u7 = u8[u9]) && (u3[u9] = !(u4[u9] = u7));
                    }
                  })
                : function (u3, u4, u5) {
                    return (u0[0] = u3), u2(u0, null, u5, u1), (u0[0] = null), !u1.pop();
                  };
            }),
            has: ey(function (eQ) {
              return function (u0) {
                return 0 < eI(eQ, u0).length;
              };
            }),
            contains: ey(function (eQ) {
              return (
                (eQ = eQ.replace(em, Dy)),
                function (u0) {
                  return -1 < (u0.textContent || u0.innerText || DO(u0)).indexOf(eQ);
                }
              );
            }),
            lang: ey(function (eQ) {
              return (
                eX.test(eQ || "") || eI.error("unsupported lang: " + eQ),
                (eQ = eQ.replace(em, Dy).toLowerCase()),
                function (u0) {
                  var u1;
                  do {
                    if ((u1 = e1 ? u0.lang : u0.getAttribute("xml:lang") || u0.getAttribute("lang"))) {
                      return (u1 = u1.toLowerCase()) === eQ || 0 === u1.indexOf(eQ + "-");
                    }
                  } while ((u0 = u0.parentNode) && 1 === u0.nodeType);
                  return false;
                }
              );
            }),
            target: function (eQ) {
              var u0 = Dc.location && Dc.location.hash;
              return u0 && u0.slice(1) === eQ.id;
            },
            root: function (eQ) {
              return eQ === e0;
            },
            focus: function (eQ) {
              return eQ === DQ.activeElement && (!DQ.hasFocus || DQ.hasFocus()) && !!(eQ.type || eQ.href || ~eQ.tabIndex);
            },
            enabled: ed(false),
            disabled: ed(true),
            checked: function (eQ) {
              var u0 = eQ.nodeName.toLowerCase();
              return ("input" === u0 && !!eQ.checked) || ("option" === u0 && !!eQ.selected);
            },
            selected: function (eQ) {
              return eQ.parentNode && eQ.parentNode.selectedIndex, true === eQ.selected;
            },
            empty: function (eQ) {
              for (eQ = eQ.firstChild; eQ; eQ = eQ.nextSibling) {
                if (eQ.nodeType < 6) {
                  return false;
                }
              }
              return true;
            },
            parent: function (eQ) {
              return !Dv.pseudos.empty(eQ);
            },
            header: function (eQ) {
              return /^h\d$/i.test(eQ.nodeName);
            },
            input: function (eQ) {
              return /^(?:input|select|textarea|button)$/i.test(eQ.nodeName);
            },
            button: function (eQ) {
              var u0 = eQ.nodeName.toLowerCase();
              return ("input" === u0 && "button" === eQ.type) || "button" === u0;
            },
            text: function (eQ) {
              return (
                "input" === eQ.nodeName.toLowerCase() && "text" === eQ.type && (null == (eQ = eQ.getAttribute("type")) || "text" === eQ.toLowerCase())
              );
            },
            first: ev(function () {
              return [0];
            }),
            last: ev(function (eQ, u0) {
              return [u0 - 1];
            }),
            eq: ev(function (eQ, u0, u1) {
              return [u1 < 0 ? u1 + u0 : u1];
            }),
            even: ev(function (eQ, u0) {
              for (var u1 = 0; u1 < u0; u1 += 2) {
                eQ.push(u1);
              }
              return eQ;
            }),
            odd: ev(function (eQ, u0) {
              for (var u1 = 1; u1 < u0; u1 += 2) {
                eQ.push(u1);
              }
              return eQ;
            }),
            lt: ev(function (eQ, u0, u1) {
              for (var u2 = u1 < 0 ? u1 + u0 : u1; 0 <= --u2; ) {
                eQ.push(u2);
              }
              return eQ;
            }),
            gt: ev(function (eQ, u0, u1) {
              for (var u2 = u1 < 0 ? u1 + u0 : u1; ++u2 < u0; ) {
                eQ.push(u2);
              }
              return eQ;
            })
          }
        }).pseudos.nth = Dv.pseudos.eq),
      {
        radio: true,
        checkbox: true,
        file: true,
        password: true,
        image: true
      }))
        Dv.pseudos[DL] = (function (eQ) {
          return function (u0) {
            return "input" === u0.nodeName.toLowerCase() && u0.type === eQ;
          };
        })(DL);
      for (DL in {
        submit: true,
        reset: true
      })
        Dv.pseudos[DL] = (function (eQ) {
          return function (u0) {
            var u1 = u0.nodeName.toLowerCase();
            return ("input" === u1 || "button" === u1) && u0.type === eQ;
          };
        })(DL);

      function ez() {}

      function eB(eQ) {
        for (var u0 = 0, u1 = eQ.length, u2 = ""; u0 < u1; u0++) {
          u2 += eQ[u0].value;
        }
        return u2;
      }

      function eZ(eQ, u0, u1) {
        var u2 = u0.dir,
          u3 = u0.next,
          u4 = u3 || u2,
          u5 = u1 && "parentNode" === u4,
          u6 = e9++;
        return u0.first
          ? function (u7, u8, u9) {
              for (; (u7 = u7[u2]); ) {
                if (1 === u7.nodeType || u5) {
                  return eQ(u7, u8, u9);
                }
              }
              return false;
            }
          : function (u7, u8, u9) {
              var uW,
                uf,
                uD = [e8, u6];
              if (u9) {
                for (; (u7 = u7[u2]); ) {
                  if ((1 === u7.nodeType || u5) && eQ(u7, u8, u9)) {
                    return true;
                  }
                }
              } else {
                for (; (u7 = u7[u2]); ) {
                  if (1 === u7.nodeType || u5) {
                    if (((uf = (uf = u7[e6] || (u7[e6] = {}))[u7.uniqueID] || (uf[u7.uniqueID] = {})), u3 && u3 === u7.nodeName.toLowerCase())) {
                      u7 = u7[u2] || u7;
                    } else {
                      if ((uW = uf[u4]) && uW[0] === e8 && uW[1] === u6) {
                        return (uD[2] = uW[2]);
                      }
                      if (((uf[u4] = uD)[2] = eQ(u7, u8, u9))) {
                        return true;
                      }
                    }
                  }
                }
              }
              return false;
            };
      }

      function ej(eQ) {
        return 1 < eQ.length
          ? function (u0, u1, u2) {
              for (var u3 = eQ.length; u3--; ) {
                if (!eQ[u3](u0, u1, u2)) {
                  return false;
                }
              }
              return true;
            }
          : eQ[0];
      }

      function eJ(eQ, u0, u1, u2, u3) {
        for (var u4, u5 = [], u6 = 0, u7 = eQ.length, u8 = null != u0; u6 < u7; u6++) {
          !(u4 = eQ[u6]) || (u1 && !u1(u4, u2, u3)) || (u5.push(u4), u8 && u0.push(u6));
        }
        return u5;
      }

      function eR(eQ, u0, u1, u2, u3, u4) {
        return (
          u2 && !u2[e6] && (u2 = eR(u2)),
          u3 && !u3[e6] && (u3 = eR(u3, u4)),
          ey(function (u5, u6, u7, u8) {
            var u9,
              uW,
              uf,
              uD = [],
              uu = [],
              ul = u6.length,
              ug =
                u5 ||
                (function (uC, uq, uE) {
                  for (var uP = 0, uk = uq.length; uP < uk; uP++) {
                    eI(uC, uq[uP], uE);
                  }
                  return uE;
                })(u0 || "*", u7.nodeType ? [u7] : u7, []),
              uo = !eQ || (!u5 && u0) ? ug : eJ(ug, uD, eQ, u7, u8),
              uT = u1 ? (u3 || (u5 ? eQ : ul || u2) ? [] : u6) : uo;
            if ((u1 && u1(uo, uT, u7, u8), u2)) {
              for (u9 = eJ(uT, uu), u2(u9, [], u7, u8), uW = u9.length; uW--; ) {
                (uf = u9[uW]) && (uT[uu[uW]] = !(uo[uu[uW]] = uf));
              }
            }
            if (u5) {
              if (u3 || eQ) {
                if (u3) {
                  for (u9 = [], uW = uT.length; uW--; ) {
                    (uf = uT[uW]) && u9.push((uo[uW] = uf));
                  }
                  u3(null, (uT = []), u9, u8);
                }
                for (uW = uT.length; uW--; ) {
                  (uf = uT[uW]) && -1 < (u9 = u3 ? eE(u5, uf) : uD[uW]) && (u5[u9] = !(u6[u9] = uf));
                }
              }
            } else {
              uT = eJ(uT === u6 ? uT.splice(ul, uT.length) : uT);
              u3 ? u3(null, u6, uT, u8) : eC.apply(u6, uT);
            }
          })
        );
      }

      function ep(eQ, u0) {
        function u1(u4, u5, u6, u7, u8) {
          var u9,
            uW,
            uf,
            uD = 0,
            uu = "0",
            ul = u4 && [],
            ug = [],
            uo = DJ,
            uT = u4 || (u3 && Dv.find.TAG("*", u8)),
            uC = (e8 += null == uo ? 1 : Math.random() || 0.1),
            uq = uT.length;
          for (u8 && (DJ = u5 === DQ || u5 || u8); uu !== uq && null != (u9 = uT[uu]); uu++) {
            if (u3 && u9) {
              for (uW = 0, u5 || u9.ownerDocument === DQ || (Da(u9), (u6 = !e1)); (uf = eQ[uW++]); ) {
                if (uf(u9, u5 || DQ, u6)) {
                  u7.push(u9);
                  break;
                }
              }
              u8 && (e8 = uC);
            }
            u2 && ((u9 = !uf && u9) && uD--, u4) && ul.push(u9);
          }
          if (((uD += uu), u2 && uu !== uD)) {
            for (uW = 0; (uf = u0[uW++]); ) {
              uf(ul, ug, u5, u6);
            }
            if (u4) {
              if (0 < uD) {
                for (; uu--; ) {
                  ul[uu] || ug[uu] || (ug[uu] = eo.call(u7));
                }
              }
              ug = eJ(ug);
            }
            eC.apply(u7, ug);
            u8 && !u4 && 0 < ug.length && 1 < uD + u0.length && eI.uniqueSort(u7);
          }
          return u8 && ((e8 = uC), (DJ = uo)), ul;
        }

        var u2 = 0 < u0.length,
          u3 = 0 < eQ.length;
        return u2 ? ey(u1) : u1;
      }

      return (
        (ez.prototype = Dv.filters = Dv.pseudos),
        (Dv.setFilters = new ez()),
        (DB = eI.tokenize =
          function (eQ, u0) {
            var u1,
              u2,
              u3,
              u4,
              u5,
              u6,
              u7,
              u8 = ef[eQ + " "];
            if (u8) {
              return u0 ? 0 : u8.slice(0);
            }
            for (u5 = eQ, u6 = [], u7 = Dv.preFilter; u5; ) {
              for (u4 in ((u1 && !(u2 = eH.exec(u5))) || (u2 && (u5 = u5.slice(u2[0].length) || u5), u6.push((u3 = []))),
              (u1 = false),
              (u2 = eV.exec(u5)) &&
                ((u1 = u2.shift()),
                u3.push({
                  value: u1,
                  type: u2[0].replace(eF, " ")
                }),
                (u5 = u5.slice(u1.length))),
              Dv.filter))
                !(u2 = eA[u4].exec(u5)) ||
                  (u7[u4] && !(u2 = u7[u4](u2))) ||
                  ((u1 = u2.shift()),
                  u3.push({
                    value: u1,
                    type: u4,
                    matches: u2
                  }),
                  (u5 = u5.slice(u1.length)));
              if (!u1) {
                break;
              }
            }
            return u0 ? u5.length : u5 ? eI.error(eQ) : ef(eQ, u6).slice(0);
          }),
        (DZ = eI.compile =
          function (eQ, u0) {
            var u1,
              u2 = [],
              u3 = [],
              u4 = eD[eQ + " "];
            if (!u4) {
              for (u1 = (u0 = u0 || DB(eQ)).length; u1--; ) {
                ((u4 = (function u5(u6) {
                  for (
                    var u7,
                      u8,
                      u9,
                      uW = u6.length,
                      uf = Dv.relative[u6[0].type],
                      uD = uf || Dv.relative[" "],
                      uu = uf ? 1 : 0,
                      ul = eZ(
                        function (uT) {
                          return uT === u7;
                        },
                        uD,
                        true
                      ),
                      ug = eZ(
                        function (uT) {
                          return -1 < eE(u7, uT);
                        },
                        uD,
                        true
                      ),
                      uo = [
                        function (uT, uC, uq) {
                          return (uT = (!uf && (uq || uC !== DJ)) || ((u7 = uC).nodeType ? ul : ug)(uT, uC, uq)), (u7 = null), uT;
                        }
                      ];
                    uu < uW;
                    uu++
                  ) {
                    if ((u8 = Dv.relative[u6[uu].type])) {
                      uo = [eZ(ej(uo), u8)];
                    } else {
                      if ((u8 = Dv.filter[u6[uu].type].apply(null, u6[uu].matches))[e6]) {
                        for (u9 = ++uu; u9 < uW && !Dv.relative[u6[u9].type]; u9++) {}
                        return eR(
                          1 < uu && ej(uo),
                          1 < uu &&
                            eB(
                              u6.slice(0, uu - 1).concat({
                                value: " " === u6[uu - 2].type ? "*" : ""
                              })
                            ).replace(eF, "$1"),
                          u8,
                          uu < u9 && u5(u6.slice(uu, u9)),
                          u9 < uW && u5((u6 = u6.slice(u9))),
                          u9 < uW && eB(u6)
                        );
                      }
                      uo.push(u8);
                    }
                  }
                  return ej(uo);
                })(u0[u1]))[e6]
                  ? u2
                  : u3
                ).push(u4);
              }
              (u4 = eD(eQ, ep(u3, u2))).selector = eQ;
            }
            return u4;
          }),
        (Dj = eI.select =
          function (eQ, u0, u1, u2) {
            var u3,
              u4,
              u5,
              u6,
              u7,
              u8 = "function" == typeof eQ && eQ,
              u9 = !u2 && DB((eQ = u8.selector || eQ));
            if (((u1 = u1 || []), 1 === u9.length)) {
              if (2 < (u4 = u9[0] = u9[0].slice(0)).length && "ID" === (u5 = u4[0]).type && 9 === u0.nodeType && e1 && Dv.relative[u4[1].type]) {
                if (!(u0 = (Dv.find.ID(u5.matches[0].replace(em, Dy), u0) || [])[0])) {
                  return u1;
                }
                u8 && (u0 = u0.parentNode);
                eQ = eQ.slice(u4.shift().value.length);
              }
              for (u3 = eA.needsContext.test(eQ) ? 0 : u4.length; u3-- && ((u5 = u4[u3]), !Dv.relative[(u6 = u5.type)]); ) {
                if ((u7 = Dv.find[u6]) && (u2 = u7(u5.matches[0].replace(em, Dy), (/[+~]/.test(u4[0].type) && eO(u0.parentNode)) || u0))) {
                  if ((u4.splice(u3, 1), (eQ = u2.length && eB(u4)))) {
                    break;
                  }
                  return eC.apply(u1, u2), u1;
                }
              }
            }
            return (u8 || DZ(eQ, u9))(u2, u0, !e1, u1, !u0 || (/[+~]/.test(eQ) && eO(u0.parentNode)) || u0), u1;
          }),
        (Dd.sortStable = e6.split("").sort(eu).join("") === e6),
        (Dd.detectDuplicates = !!Dp),
        Da(),
        (Dd.sortDetached = ei(function (eQ) {
          return 1 & eQ.compareDocumentPosition(DQ.createElement("fieldset"));
        })),
        ei(function (eQ) {
          return (eQ.innerHTML = "<a href='#'></a>"), "#" === eQ.firstChild.getAttribute("href");
        }) ||
          eU("type|href|height|width", function (eQ, u0, u1) {
            if (!u1) {
              return eQ.getAttribute(u0, "type" === u0.toLowerCase() ? 1 : 2);
            }
          }),
        (Dd.attributes &&
          ei(function (eQ) {
            return (eQ.innerHTML = "<input/>"), eQ.firstChild.setAttribute("value", ""), "" === eQ.firstChild.getAttribute("value");
          })) ||
          eU("value", function (eQ, u0, u1) {
            if (!u1 && "input" === eQ.nodeName.toLowerCase()) {
              return eQ.defaultValue;
            }
          }),
        ei(function (eQ) {
          return null == eQ.getAttribute("disabled");
        }) ||
          eU(eP, function (eQ, u0, u1) {
            if (!u1) {
              return true === eQ[u0] ? u0.toLowerCase() : (u1 = eQ.getAttributeNode(u0)) && u1.specified ? u1.value : null;
            }
          }),
        eI
      );
    })(W5),
    Wr =
      ((Ww.find = W9),
      (Ww.expr = W9.selectors),
      (Ww.expr[":"] = Ww.expr.pseudos),
      (Ww.uniqueSort = Ww.unique = W9.uniqueSort),
      (Ww.text = W9.getText),
      (Ww.isXMLDoc = W9.isXML),
      (Ww.contains = W9.contains),
      (Ww.escapeSelector = W9.escape),
      Ww.expr.match.needsContext);

  function Wb(Dc, Dy) {
    return Dc.nodeName && Dc.nodeName.toLowerCase() === Dy.toLowerCase();
  }

  function WA(Dc, Dy, Di) {
    return W7(Dy)
      ? Ww.grep(Dc, function (DU, DL) {
          return !!Dy.call(DU, DL, DU) !== Di;
        })
      : Dy.nodeType
      ? Ww.grep(Dc, function (DU) {
          return (DU === Dy) !== Di;
        })
      : "string" != typeof Dy
      ? Ww.grep(Dc, function (DU) {
          return -1 < Wg.call(Dy, DU) !== Di;
        })
      : Ww.filter(Dy, Dc, Di);
  }

  Ww.filter = function (Dc, Dy, Di) {
    var DU = Dy[0];
    return (
      Di && (Dc = ":not(" + Dc + ")"),
      1 === Dy.length && 1 === DU.nodeType
        ? Ww.find.matchesSelector(DU, Dc)
          ? [DU]
          : []
        : Ww.find.matches(
            Dc,
            Ww.grep(Dy, function (DL) {
              return 1 === DL.nodeType;
            })
          )
    );
  };
  Ww.fn.extend({
    find: function (Dc) {
      var Dy,
        Di,
        DU = this.length,
        DL = this;
      if ("string" != typeof Dc) {
        return this.pushStack(
          Ww(Dc).filter(function () {
            for (Dy = 0; Dy < DU; Dy++) {
              if (Ww.contains(DL[Dy], this)) {
                return true;
              }
            }
          })
        );
      }
      for (Di = this.pushStack([]), Dy = 0; Dy < DU; Dy++) {
        Ww.find(Dc, DL[Dy], Di);
      }
      return 1 < DU ? Ww.uniqueSort(Di) : Di;
    },
    filter: function (Dc) {
      return this.pushStack(WA(this, Dc || [], false));
    },
    not: function (Dc) {
      return this.pushStack(WA(this, Dc || [], true));
    },
    is: function (Dc) {
      return !!WA(this, "string" == typeof Dc && Wr.test(Dc) ? Ww(Dc) : Dc || [], false).length;
    }
  });
  var Wn,
    WY =
      (((Ww.fn.init = function (Dc, Dy, Di) {
        if (Dc) {
          if (((Di = Di || Wn), "string" != typeof Dc)) {
            return Dc.nodeType
              ? ((this[0] = Dc), (this.length = 1), this)
              : W7(Dc)
              ? void 0 !== Di.ready
                ? Di.ready(Dc)
                : Dc(Ww)
              : Ww.makeArray(Dc, this);
          }
          if (
            !(DU =
              "<" === Dc[0] && ">" === Dc[Dc.length - 1] && 3 <= Dc.length ? [null, Dc, null] : /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/.exec(Dc)) ||
            (!DU[1] && Dy)
          ) {
            return (!Dy || Dy.jquery ? Dy || Di : this.constructor(Dy)).find(Dc);
          }
          if (DU[1]) {
            if (
              ((Dy = Dy instanceof Ww ? Dy[0] : Dy),
              Ww.merge(this, Ww.parseHTML(DU[1], Dy && Dy.nodeType ? Dy.ownerDocument || Dy : WW, true)),
              /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i.test(DU[1]) && Ww.isPlainObject(Dy))
            ) {
              for (var DU in Dy) W7(this[DU]) ? this[DU](Dy[DU]) : this.attr(DU, Dy[DU]);
            }
          } else {
            (Di = WW.getElementById(DU[2])) && ((this[0] = Di), (this.length = 1));
          }
        }
        return this;
      }).prototype = Ww.fn),
      (Wn = Ww(WW)),
      /^(?:parents|prev(?:Until|All))/);

  function WK(Dc, Dy) {
    for (; (Dc = Dc[Dy]) && 1 !== Dc.nodeType; ) {}
    return Dc;
  }

  Ww.fn.extend({
    has: function (Dc) {
      var Dy = Ww(Dc, this),
        Di = Dy.length;
      return this.filter(function () {
        for (var DU = 0; DU < Di; DU++) {
          if (Ww.contains(this, Dy[DU])) {
            return true;
          }
        }
      });
    },
    closest: function (Dc, Dy) {
      var Di,
        DU = 0,
        DL = this.length,
        Dd = [],
        Dv = "string" != typeof Dc && Ww(Dc);
      if (!Wr.test(Dc)) {
        for (; DU < DL; DU++) {
          for (Di = this[DU]; Di && Di !== Dy; Di = Di.parentNode) {
            if (Di.nodeType < 11 && (Dv ? -1 < Dv.index(Di) : 1 === Di.nodeType && Ww.find.matchesSelector(Di, Dc))) {
              Dd.push(Di);
              break;
            }
          }
        }
      }
      return this.pushStack(1 < Dd.length ? Ww.uniqueSort(Dd) : Dd);
    },
    index: function (Dc) {
      return Dc
        ? "string" == typeof Dc
          ? Wg.call(Ww(Dc), this[0])
          : Wg.call(this, Dc.jquery ? Dc[0] : Dc)
        : this[0] && this[0].parentNode
        ? this.first().prevAll().length
        : -1;
    },
    add: function (Dc, Dy) {
      return this.pushStack(Ww.uniqueSort(Ww.merge(this.get(), Ww(Dc, Dy))));
    },
    addBack: function (Dc) {
      return this.add(null == Dc ? this.prevObject : this.prevObject.filter(Dc));
    }
  });
  Ww.each(
    {
      parent: function (Dc) {
        Dc = Dc.parentNode;
        return Dc && 11 !== Dc.nodeType ? Dc : null;
      },
      parents: function (Dc) {
        return WH(Dc, "parentNode");
      },
      parentsUntil: function (Dc, Dy, Di) {
        return WH(Dc, "parentNode", Di);
      },
      next: function (Dc) {
        return WK(Dc, "nextSibling");
      },
      prev: function (Dc) {
        return WK(Dc, "previousSibling");
      },
      nextAll: function (Dc) {
        return WH(Dc, "nextSibling");
      },
      prevAll: function (Dc) {
        return WH(Dc, "previousSibling");
      },
      nextUntil: function (Dc, Dy, Di) {
        return WH(Dc, "nextSibling", Di);
      },
      prevUntil: function (Dc, Dy, Di) {
        return WH(Dc, "previousSibling", Di);
      },
      siblings: function (Dc) {
        return WV((Dc.parentNode || {}).firstChild, Dc);
      },
      children: function (Dc) {
        return WV(Dc.firstChild);
      },
      contents: function (Dc) {
        return Wb(Dc, "iframe") ? Dc.contentDocument : (Wb(Dc, "template") && (Dc = Dc.content || Dc), Ww.merge([], Dc.childNodes));
      }
    },
    function (Dc, Dy) {
      Ww.fn[Dc] = function (Di, DU) {
        var DL = Ww.map(this, Dy, Di);
        return (
          (DU = "Until" !== Dc.slice(-5) ? Di : DU) && "string" == typeof DU && (DL = Ww.filter(DU, DL)),
          1 < this.length && (Wh[Dc] || Ww.uniqueSort(DL), WY.test(Dc)) && DL.reverse(),
          this.pushStack(DL)
        );
      };
    }
  );

  function WN(Dc) {
    return Dc;
  }

  function Wx(Dc) {
    throw Dc;
  }

  function WI(Dc, Dy, Di, DU) {
    var DL;
    try {
      Dc && W7((DL = Dc.promise)) ? DL.call(Dc).done(Dy).fail(Di) : Dc && W7((DL = Dc.then)) ? DL.call(Dc, Dy, Di) : Dy.apply(void 0, [Dc].slice(DU));
    } catch (Dd) {
      Di.apply(void 0, [Dd]);
    }
  }

  Ww.Callbacks = function (Dc) {
    var Dy, Di;
    Dc =
      "string" == typeof Dc
        ? ((Dy = Dc),
          (Di = {}),
          Ww.each(Dy.match(/[^\x20\t\r\n\f]+/g) || [], function (DJ, DR) {
            Di[DR] = true;
          }),
          Di)
        : Ww.extend({}, Dc);

    function DU() {
      for (DO = DO || Dc.once, Dv = DL = true; DB.length; DZ = -1) {
        for (Dd = DB.shift(); ++DZ < Dz.length; ) {
          false === Dz[DZ].apply(Dd[0], Dd[1]) && Dc.stopOnFalse && ((DZ = Dz.length), (Dd = false));
        }
      }
      Dc.memory || (Dd = false);
      DL = false;
      DO && (Dz = Dd ? [] : "");
    }

    var DL,
      Dd,
      Dv,
      DO,
      Dz = [],
      DB = [],
      DZ = -1,
      Dj = {
        add: function () {
          return (
            Dz &&
              (Dd && !DL && ((DZ = Dz.length - 1), DB.push(Dd)),
              (function DJ(DR) {
                Ww.each(DR, function (Dp, Da) {
                  W7(Da) ? (Dc.unique && Dj.has(Da)) || Dz.push(Da) : Da && Da.length && "string" !== WG(Da) && DJ(Da);
                });
              })(arguments),
              Dd) &&
              !DL &&
              DU(),
            this
          );
        },
        remove: function () {
          return (
            Ww.each(arguments, function (DJ, DR) {
              for (var Dp; -1 < (Dp = Ww.inArray(DR, Dz, Dp)); ) {
                Dz.splice(Dp, 1);
                Dp <= DZ && DZ--;
              }
            }),
            this
          );
        },
        has: function (DJ) {
          return DJ ? -1 < Ww.inArray(DJ, Dz) : 0 < Dz.length;
        },
        empty: function () {
          return (Dz = Dz && []), this;
        },
        disable: function () {
          return (DO = DB = []), (Dz = Dd = ""), this;
        },
        disabled: function () {
          return !Dz;
        },
        lock: function () {
          return (DO = DB = []), Dd || DL || (Dz = Dd = ""), this;
        },
        locked: function () {
          return !!DO;
        },
        fireWith: function (DJ, DR) {
          return DO || ((DR = [DJ, (DR = DR || []).slice ? DR.slice() : DR]), DB.push(DR), DL) || DU(), this;
        },
        fire: function () {
          return Dj.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!Dv;
        }
      };
    return Dj;
  };
  Ww.extend({
    Deferred: function (Dc) {
      var Dy = [
          ["notify", "progress", Ww.Callbacks("memory"), Ww.Callbacks("memory"), 2],
          ["resolve", "done", Ww.Callbacks("once memory"), Ww.Callbacks("once memory"), 0, "resolved"],
          ["reject", "fail", Ww.Callbacks("once memory"), Ww.Callbacks("once memory"), 1, "rejected"]
        ],
        Di = "pending",
        DU = {
          state: function () {
            return Di;
          },
          always: function () {
            return DL.done(arguments).fail(arguments), this;
          },
          catch: function (Dd) {
            return DU.then(null, Dd);
          },
          pipe: function () {
            var Dd = arguments;
            return Ww.Deferred(function (Dv) {
              Ww.each(Dy, function (DO, Dz) {
                var DB = W7(Dd[Dz[4]]) && Dd[Dz[4]];
                DL[Dz[1]](function () {
                  var DZ = DB && DB.apply(this, arguments);
                  DZ && W7(DZ.promise)
                    ? DZ.promise().progress(Dv.notify).done(Dv.resolve).fail(Dv.reject)
                    : Dv[Dz[0] + "With"](this, DB ? [DZ] : arguments);
                });
              });
              Dd = null;
            }).promise();
          },
          then: function (Dd, Dv, DO) {
            var Dz = 0;

            function DB(DZ, Dj, DJ, DR) {
              return function () {
                function Dp() {
                  var e1, e2;
                  if (!(DZ < Dz)) {
                    if ((e1 = DJ.apply(Da, DQ)) === Dj.promise()) {
                      throw new TypeError("Thenable self-resolution");
                    }
                    e2 = e1 && ("object" == typeof e1 || "function" == typeof e1) && e1.then;
                    W7(e2)
                      ? DR
                        ? e2.call(e1, DB(Dz, Dj, WN, DR), DB(Dz, Dj, Wx, DR))
                        : (Dz++, e2.call(e1, DB(Dz, Dj, WN, DR), DB(Dz, Dj, Wx, DR), DB(Dz, Dj, WN, Dj.notifyWith)))
                      : (DJ !== WN && ((Da = void 0), (DQ = [e1])), (DR || Dj.resolveWith)(Da, DQ));
                  }
                }

                var Da = this,
                  DQ = arguments,
                  e0 = DR
                    ? Dp
                    : function () {
                        try {
                          Dp();
                        } catch (e1) {
                          Ww.Deferred.exceptionHook && Ww.Deferred.exceptionHook(e1, e0.stackTrace);
                          Dz <= DZ + 1 && (DJ !== Wx && ((Da = void 0), (DQ = [e1])), Dj.rejectWith(Da, DQ));
                        }
                      };
                DZ ? e0() : (Ww.Deferred.getStackHook && (e0.stackTrace = Ww.Deferred.getStackHook()), W5.setTimeout(e0));
              };
            }

            return Ww.Deferred(function (DZ) {
              Dy[0][3].add(DB(0, DZ, W7(DO) ? DO : WN, DZ.notifyWith));
              Dy[1][3].add(DB(0, DZ, W7(Dd) ? Dd : WN));
              Dy[2][3].add(DB(0, DZ, W7(Dv) ? Dv : Wx));
            }).promise();
          },
          promise: function (Dd) {
            return null != Dd ? Ww.extend(Dd, DU) : DU;
          }
        },
        DL = { DO: this };
      return (
        Ww.each(Dy, function (Dd, Dv) {
          var DO = Dv[2],
            Dz = Dv[5];
          DU[Dv[1]] = DO.add;
          Dz &&
            DO.add(
              function () {
                Di = Dz;
              },
              Dy[3 - Dd][2].disable,
              Dy[3 - Dd][3].disable,
              Dy[0][2].lock,
              Dy[0][3].lock
            );
          DO.add(Dv[3].fire);
          DL[Dv[0]] = function () {
            return DL[Dv[0] + "With"](this === DL ? void 0 : this, arguments), this;
          };
          DL[Dv[0] + "With"] = DO.fireWith;
        }),
        DU.promise(DL),
        Dc && Dc.call(DL, DL),
        DL
      );
    },
    when: function (Dc) {
      function Dy(DO) {
        return function (Dz) {
          --Di || Dv.resolveWith(DL, Dd);
        };
      }

      var Di = arguments.length,
        DU = Di,
        DL = Array(DU),
        Dd = WD.call(arguments),
        Dv = Ww.Deferred();
      if (Di <= 1 && (WI(Dc, Dv.done(Dy(DU)).resolve, Dv.reject, !Di), "pending" === Dv.state() || W7(Dd[DU] && Dd[DU].then))) {
        return Dv.then();
      }
      for (; DU--; ) {
        WI(Dd[DU], Dy(DU), Dv.reject);
      }
      return Dv.promise();
    }
  });
  var Wy =
    ((Ww.Deferred.exceptionHook = function (Dc, Dy) {
      W5.console &&
        W5.console.warn &&
        Dc &&
        /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/.test(Dc.name) &&
        W5.console.warn("jQuery.Deferred exception: " + Dc.message, Dc.stack, Dy);
    }),
    (Ww.readyException = function (Dc) {
      W5.setTimeout(function () {
        throw Dc;
      });
    }),
    Ww.Deferred());

  function Wi() {
    WW.removeEventListener("DOMContentLoaded", Wi);
    W5.removeEventListener("load", Wi);
    Ww.ready();
  }

  Ww.fn.ready = function (Dc) {
    return (
      Wy.then(Dc).catch(function (Dy) {
        Ww.readyException(Dy);
      }),
      this
    );
  };
  Ww.extend({
    isReady: false,
    readyWait: 1,
    ready: function (Dc) {
      (true === Dc ? --Ww.readyWait : Ww.isReady) || ((Ww.isReady = true) !== Dc && 0 < --Ww.readyWait) || Wy.resolveWith(WW, [Ww]);
    }
  });
  Ww.ready.then = Wy.then;
  "complete" === WW.readyState || ("loading" !== WW.readyState && !WW.documentElement.doScroll)
    ? W5.setTimeout(Ww.ready)
    : (WW.addEventListener("DOMContentLoaded", Wi), W5.addEventListener("load", Wi));

  function WU(Dc, Dy, Di, DU, DL, Dd, Dv) {
    var DO = 0,
      Dz = Dc.length,
      DB = null == Di;
    if ("object" === WG(Di)) {
      for (DO in ((DL = true), Di)) WU(Dc, Dy, DO, Di[DO], true, Dd, Dv);
    } else {
      if (
        void 0 !== DU &&
        ((DL = true),
        W7(DU) || (Dv = true),
        (Dy = DB
          ? Dv
            ? (Dy.call(Dc, DU), null)
            : ((DB = Dy),
              function (DZ, Dj, DJ) {
                return DB.call(Ww(DZ), DJ);
              })
          : Dy))
      ) {
        for (; DO < Dz; DO++) {
          Dy(Dc[DO], Di, Dv ? DU : DU.call(Dc[DO], DO, Dy(Dc[DO], Di)));
        }
      }
    }
    return DL ? Dc : DB ? Dy.call(Dc) : Dz ? Dy(Dc[0], Di) : Dd;
  }

  function Wv(Dc, Dy) {
    return Dy.toUpperCase();
  }

  function WO(Dc) {
    return Dc.replace(/^-ms-/, "ms-").replace(/-([a-z])/g, Wv);
  }

  function Wz(Dc) {
    return 1 === Dc.nodeType || 9 === Dc.nodeType || !+Dc.nodeType;
  }

  function WB() {
    this.expando = Ww.expando + WB.uid++;
  }

  WB.uid = 1;
  WB.prototype = {
    cache: function (Dc) {
      var Dy = Dc[this.expando];
      return (
        Dy ||
          ((Dy = {}),
          Wz(Dc) &&
            (Dc.nodeType
              ? (Dc[this.expando] = Dy)
              : Object.defineProperty(Dc, this.expando, {
                  value: Dy,
                  configurable: true
                }))),
        Dy
      );
    },
    set: function (Dc, Dy, Di) {
      var DU,
        DL = this.cache(Dc);
      if ("string" == typeof Dy) {
        DL[WO(Dy)] = Di;
      } else {
        for (DU in Dy) DL[WO(DU)] = Dy[DU];
      }
      return DL;
    },
    get: function (Dc, Dy) {
      return void 0 === Dy ? this.cache(Dc) : Dc[this.expando] && Dc[this.expando][WO(Dy)];
    },
    access: function (Dc, Dy, Di) {
      return void 0 === Dy || (Dy && "string" == typeof Dy && void 0 === Di) ? this.get(Dc, Dy) : (this.set(Dc, Dy, Di), void 0 !== Di ? Di : Dy);
    },
    remove: function (Dc, Dy) {
      var Di,
        DU = Dc[this.expando];
      if (void 0 !== DU) {
        if (void 0 !== Dy) {
          Di = (Dy = Array.isArray(Dy) ? Dy.map(WO) : (Dy = WO(Dy)) in DU ? [Dy] : Dy.match(/[^\x20\t\r\n\f]+/g) || []).length;
          for (; Di--; ) {
            delete DU[Dy[Di]];
          }
        }
        (void 0 !== Dy && !Ww.isEmptyObject(DU)) || (Dc.nodeType ? (Dc[this.expando] = void 0) : delete Dc[this.expando]);
      }
    },
    hasData: function (Dc) {
      return (Dc = Dc[this.expando]), void 0 !== Dc && !Ww.isEmptyObject(Dc);
    }
  };
  var WZ = new WB(),
    Wj = new WB();

  function Wp(Dc, Dy, Di) {
    var DU, DL;
    if (void 0 === Di && 1 === Dc.nodeType) {
      if (((DU = "data-" + Dy.replace(/[A-Z]/g, "-$&").toLowerCase()), "string" == typeof (Di = Dc.getAttribute(DU)))) {
        try {
          Di =
            "true" === (DL = Di) ||
            ("false" !== DL && ("null" === DL ? null : DL === +DL + "" ? +DL : /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/.test(DL) ? JSON.parse(DL) : DL));
        } catch (Dd) {}
        Wj.set(Dc, Dy, Di);
      } else {
        Di = void 0;
      }
    }
    return Di;
  }

  Ww.extend({
    hasData: function (Dc) {
      return Wj.hasData(Dc) || WZ.hasData(Dc);
    },
    data: function (Dc, Dy, Di) {
      return Wj.access(Dc, Dy, Di);
    },
    removeData: function (Dc, Dy) {
      Wj.remove(Dc, Dy);
    },
    _data: function (Dc, Dy, Di) {
      return WZ.access(Dc, Dy, Di);
    },
    _removeData: function (Dc, Dy) {
      WZ.remove(Dc, Dy);
    }
  });
  Ww.fn.extend({
    data: function (Dc, Dy) {
      var Di,
        DU,
        DL,
        Dd = this[0],
        Dv = Dd && Dd.attributes;
      if (void 0 !== Dc) {
        return "object" == typeof Dc
          ? this.each(function () {
              Wj.set(this, Dc);
            })
          : WU(
              this,
              function (DO) {
                var Dz;
                if (Dd && void 0 === DO) {
                  return void 0 !== (Dz = Wj.get(Dd, Dc)) || void 0 !== (Dz = Wp(Dd, Dc)) ? Dz : void 0;
                }
                this.each(function () {
                  Wj.set(this, Dc, DO);
                });
              },
              null,
              Dy,
              1 < arguments.length,
              null,
              true
            );
      }
      if (this.length && ((DL = Wj.get(Dd)), 1 === Dd.nodeType) && !WZ.get(Dd, "hasDataAttrs")) {
        for (Di = Dv.length; Di--; ) {
          Dv[Di] && 0 === (DU = Dv[Di].name).indexOf("data-") && ((DU = WO(DU.slice(5))), Wp(Dd, DU, DL[DU]));
        }
        WZ.set(Dd, "hasDataAttrs", true);
      }
      return DL;
    },
    removeData: function (Dc) {
      return this.each(function () {
        Wj.remove(this, Dc);
      });
    }
  });
  Ww.extend({
    queue: function (Dc, Dy, Di) {
      var DU;
      if (Dc) {
        return (
          (DU = WZ.get(Dc, (Dy = (Dy || "fx") + "queue"))),
          Di && (!DU || Array.isArray(Di) ? (DU = WZ.access(Dc, Dy, Ww.makeArray(Di))) : DU.push(Di)),
          DU || []
        );
      }
    },
    dequeue: function (Dc, Dy) {
      Dy = Dy || "fx";
      var Di = Ww.queue(Dc, Dy),
        DU = Di.length,
        DL = Di.shift(),
        Dd = Ww["_queueHooks"](Dc, Dy);
      "inprogress" === DL && ((DL = Di.shift()), DU--);
      DL &&
        ("fx" === Dy && Di.unshift("inprogress"),
        delete Dd.stop,
        DL.call(
          Dc,
          function () {
            Ww.dequeue(Dc, Dy);
          },
          Dd
        ));
      !DU && Dd && Dd.empty.fire();
    },
    _queueHooks: function (Dc, Dy) {
      var Di = Dy + "queueHooks";
      return (
        WZ.get(Dc, Di) ||
        WZ.access(Dc, Di, {
          empty: Ww.Callbacks("once memory").add(function () {
            WZ.remove(Dc, [Dy + "queue", Di]);
          })
        })
      );
    }
  });
  Ww.fn.extend({
    queue: function (Dc, Dy) {
      var Di = 2;
      return (
        "string" != typeof Dc && ((Dy = Dc), (Dc = "fx"), Di--),
        arguments.length < Di
          ? Ww.queue(this[0], Dc)
          : void 0 === Dy
          ? this
          : this.each(function () {
              var DU = Ww.queue(this, Dc, Dy);
              Ww["_queueHooks"](this, Dc);
              "fx" === Dc && "inprogress" !== DU[0] && Ww.dequeue(this, Dc);
            })
      );
    },
    dequeue: function (Dc) {
      return this.each(function () {
        Ww.dequeue(this, Dc);
      });
    },
    clearQueue: function (Dc) {
      return this.queue(Dc || "fx", []);
    },
    promise: function (Dc, Dy) {
      function Di() {
        --DL || Dd.resolveWith(Dv, [Dv]);
      }

      var DU,
        DL = 1,
        Dd = Ww.Deferred(),
        Dv = this,
        DO = this.length;
      for ("string" != typeof Dc && ((Dy = Dc), (Dc = void 0)), Dc = Dc || "fx"; DO--; ) {
        (DU = WZ.get(Dv[DO], Dc + "queueHooks")) && DU.empty && (DL++, DU.empty.add(Di));
      }
      return Di(), Dd.promise(Dy);
    }
  });

  function Wa(Dc, Dy) {
    return (
      "none" === (Dc = Dy || Dc).style.display || ("" === Dc.style.display && Ww.contains(Dc.ownerDocument, Dc) && "none" === Ww.css(Dc, "display"))
    );
  }

  function WQ(Dc, Dy, Di, DU) {
    var DL,
      Dd = {
        disconnectedMatch: e4.call(u0, "*"),
        DO: 1 < arguments.length ? WD.call(arguments) : Dz
      };
    for (DL in Dy) (Dd[DL] = Dc.style[DL]), (Dc.style[DL] = Dy[DL]);
    for (DL in ((Di = Di.apply(Dc, DU || [])), Dy)) Dc.style[DL] = Dd[DL];
    return Di;
  }

  var W9 = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    f0 = new RegExp("^(?:([+-])=|)(" + W9 + ")([a-z%]*)$", "i"),
    f1 = ["Top", "Right", "Bottom", "Left"];

  function f2(Dc, Dy, Di, DU) {
    var DL,
      Dd,
      Dv = 20,
      DO = DU
        ? function () {
            return DU.cur();
          }
        : function () {
            return Ww.css(Dc, Dy, "");
          },
      Dz = DO(),
      DB = (Di && Di[3]) || (Ww.cssNumber[Dy] ? "" : "px"),
      DZ = (Ww.cssNumber[Dy] || ("px" !== DB && +Dz)) && f0.exec(Ww.css(Dc, Dy));
    if (DZ && DZ[3] !== DB) {
      for (DB = DB || DZ[3], DZ = +(Dz /= 2) || 1; Dv--; ) {
        Ww.style(Dc, Dy, DZ + DB);
        (1 - Dd) * (1 - (Dd = DO() / Dz || 0.5)) <= 0 && (Dv = 0);
        DZ /= Dd;
      }
      Ww.style(Dc, Dy, (DZ *= 2) + DB);
      Di = Di || [];
    }
    return (
      Di && ((DZ = +DZ || +Dz || 0), (DL = Di[1] ? DZ + (Di[1] + 1) * Di[2] : +Di[2]), DU) && ((DU.unit = DB), (DU.start = DZ), (DU.end = DL)), DL
    );
  }

  var f3 = {};

  function f4(Dc, Dy) {
    for (var Di, DU, DL, Dd, Dv, DO = [], Dz = 0, DB = Dc.length; Dz < DB; Dz++) {
      (DU = Dc[Dz]).style &&
        ((Di = DU.style.display),
        Dy
          ? ("none" === Di && ((DO[Dz] = WZ.get(DU, "display") || null), DO[Dz] || (DU.style.display = "")),
            "" === DU.style.display &&
              Wa(DU) &&
              (DO[Dz] =
                ((Dv = Dd = void 0),
                (Dd = (DL = DU).ownerDocument),
                (DL = DL.nodeName),
                (Dv = f3[DL]) ||
                  ((Dd = Dd.body.appendChild(Dd.createElement(DL))),
                  (Dv = Ww.css(Dd, "display")),
                  Dd.parentNode.removeChild(Dd),
                  (f3[DL] = Dv = "none" === Dv ? "block" : Dv)))))
          : "none" !== Di && ((DO[Dz] = "none"), WZ.set(DU, "display", Di)));
    }
    for (Dz = 0; Dz < DB; Dz++) {
      null != DO[Dz] && (Dc[Dz].style.display = DO[Dz]);
    }
    return Dc;
  }

  Ww.fn.extend({
    show: function () {
      return f4(this, true);
    },
    hide: function () {
      return f4(this);
    },
    toggle: function (Dc) {
      return "boolean" == typeof Dc
        ? Dc
          ? this.show()
          : this.hide()
        : this.each(function () {
            Wa(this) ? Ww(this).show() : Ww(this).hide();
          });
    }
  });
  var f8 = {
    option: [1, "<select multiple='multiple'>", "</select>"],
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };

  function f9(Dc, Dy) {
    var Di =
      void 0 !== Dc.getElementsByTagName ? Dc.getElementsByTagName(Dy || "*") : void 0 !== Dc.querySelectorAll ? Dc.querySelectorAll(Dy || "*") : [];
    return void 0 === Dy || (Dy && Wb(Dc, Dy)) ? Ww.merge([Dc], Di) : Di;
  }

  function fW(Dc, Dy) {
    for (var Di = 0, DU = Dc.length; Di < DU; Di++) {
      WZ.set(Dc[Di], "globalEval", !Dy || WZ.get(Dy[Di], "globalEval"));
    }
  }

  f8.optgroup = f8.option;
  f8.tbody = f8.tfoot = f8.colgroup = f8.caption = f8.thead;
  f8.th = f8.td;

  function fD(Dc, Dy, Di, DU, DL) {
    for (var Dd, Dv, DO, Dz, DB, DZ = Dy.createDocumentFragment(), Dj = [], DJ = 0, DR = Dc.length; DJ < DR; DJ++) {
      if ((Dd = Dc[DJ]) || 0 === Dd) {
        if ("object" === WG(Dd)) {
          Ww.merge(Dj, Dd.nodeType ? [Dd] : Dd);
        } else {
          if (/<|&#?\w+;/.test(Dd)) {
            for (
              Dv = Dv || DZ.appendChild(Dy.createElement("div")),
                DO = (/<([a-z][^\/\0>\x20\t\r\n\f]+)/i.exec(Dd) || ["", ""])[1].toLowerCase(),
                DO = f8[DO] || f8["_default"],
                Dv.innerHTML = DO[1] + Ww.htmlPrefilter(Dd) + DO[2],
                DB = DO[0];
              DB--;

            ) {
              Dv = Dv.lastChild;
            }
            Ww.merge(Dj, Dv.childNodes);
            (Dv = DZ.firstChild).textContent = "";
          } else {
            Dj.push(Dy.createTextNode(Dd));
          }
        }
      }
    }
    for (DZ.textContent = "", DJ = 0; (Dd = Dj[DJ++]); ) {
      if (DU && -1 < Ww.inArray(Dd, DU)) {
        DL && DL.push(Dd);
      } else {
        if (((Dz = Ww.contains(Dd.ownerDocument, Dd)), (Dv = f9(DZ.appendChild(Dd), "script")), Dz && fW(Dv), Di)) {
          for (DB = 0; (Dd = Dv[DB++]); ) {
            /^$|^module$|\/(?:java|ecma)script/i.test(Dd.type || "") && Di.push(Dd);
          }
        }
      }
    }
    return DZ;
  }

  fQ = WW.createDocumentFragment().appendChild(WW.createElement("div"));
  (fa = WW.createElement("input")).setAttribute("type", "radio");
  fa.setAttribute("checked", "checked");
  fa.setAttribute("name", "t");
  fQ.appendChild(fa);
  fQ.innerHTML = "<textarea>x</textarea>";
  var fu = WW.documentElement;

  function fT() {
    return true;
  }

  function fC() {
    return false;
  }

  function fq() {
    try {
      return WW.activeElement;
    } catch (Dc) {}
  }

  function fE(Dc, Dy, Di, DU, DL, Dd) {
    var Dv, DO;
    if ("object" == typeof Dy) {
      for (DO in ("string" != typeof Di && ((DU = DU || Di), (Di = void 0)), Dy)) fE(Dc, DO, Di, DU, Dy[DO], Dd);
      return Dc;
    }
    if (
      (null == DU && null == DL
        ? ((DL = Di), (DU = Di = void 0))
        : null == DL && ("string" == typeof Di ? ((DL = DU), (DU = void 0)) : ((DL = DU), (DU = Di), (Di = void 0))),
      false === DL)
    ) {
      DL = fC;
    } else {
      if (!DL) {
        return Dc;
      }
    }
    return (
      1 === Dd &&
        ((Dv = DL),
        ((DL = function (Dz) {
          return Ww().off(Dz), Dv.apply(this, arguments);
        }).guid = Dv.guid || (Dv.guid = Ww.guid++))),
      Dc.each(function () {
        Ww.event.add(this, Dy, DL, DU, Di);
      })
    );
  }

  Ww.event = {
    global: {},
    add: function (Dc, Dy, Di, DU, DL) {
      var Dd,
        Dv,
        DO,
        Dz,
        DB,
        DZ,
        Dj,
        DJ,
        DR,
        Dp = WZ.get(Dc);
      if (Dp) {
        for (
          Di.handler && ((Di = (Dd = Di).handler), (DL = Dd.selector)),
            DL && Ww.find.matchesSelector(fu, DL),
            Di.guid || (Di.guid = Ww.guid++),
            DO = (DO = Dp.events) || (Dp.events = {}),
            Dv =
              (Dv = Dp.handle) ||
              (Dp.handle = function (Da) {
                return void 0 !== Ww && Ww.event.triggered !== Da.type ? Ww.event.dispatch.apply(Dc, arguments) : void 0;
              }),
            Dz = (Dy = (Dy || "").match(/[^\x20\t\r\n\f]+/g) || [""]).length;
          Dz--;

        ) {
          Dj = DR = (DJ = /^([^.]*)(?:\.(.+)|)/.exec(Dy[Dz]) || [])[1];
          DJ = (DJ[2] || "").split(".").sort();
          Dj &&
            ((DB = Ww.event.special[Dj] || {}),
            (Dj = (DL ? DB.delegateType : DB.bindType) || Dj),
            (DB = Ww.event.special[Dj] || {}),
            (DR = Ww.extend(
              {
                type: Dj,
                origType: DR,
                data: DU,
                handler: Di,
                guid: Di.guid,
                selector: DL,
                needsContext: DL && Ww.expr.match.needsContext.test(DL),
                namespace: DJ.join(".")
              },
              Dd
            )),
            (DZ = DO[Dj]) ||
              (((DZ = DO[Dj] = []).delegateCount = 0), DB.setup && false !== DB.setup.call(Dc, DU, DJ, Dv)) ||
              (Dc.addEventListener && Dc.addEventListener(Dj, Dv)),
            DB.add && (DB.add.call(Dc, DR), DR.handler.guid || (DR.handler.guid = Di.guid)),
            DL ? DZ.splice(DZ.delegateCount++, 0, DR) : DZ.push(DR),
            (Ww.event.global[Dj] = true));
        }
      }
    },
    remove: function (Dc, Dy, Di, DU, DL) {
      var Dd,
        Dv,
        DO,
        Dz,
        DB,
        DZ,
        Dj,
        DJ,
        DR,
        Dp,
        Da,
        DQ = WZ.hasData(Dc) && WZ.get(Dc);
      if (DQ && (Dz = DQ.events)) {
        for (DB = (Dy = (Dy || "").match(/[^\x20\t\r\n\f]+/g) || [""]).length; DB--; ) {
          if (((DR = Da = (DO = /^([^.]*)(?:\.(.+)|)/.exec(Dy[DB]) || [])[1]), (Dp = (DO[2] || "").split(".").sort()), DR)) {
            for (
              Dj = Ww.event.special[DR] || {},
                DJ = Dz[(DR = (DU ? Dj.delegateType : Dj.bindType) || DR)] || [],
                DO = DO[2] && new RegExp("(^|\\.)" + Dp.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                Dv = Dd = DJ.length;
              Dd--;

            ) {
              DZ = DJ[Dd];
              (!DL && Da !== DZ.origType) ||
                (Di && Di.guid !== DZ.guid) ||
                (DO && !DO.test(DZ.namespace)) ||
                (DU && DU !== DZ.selector && ("**" !== DU || !DZ.selector)) ||
                (DJ.splice(Dd, 1), DZ.selector && DJ.delegateCount--, Dj.remove && Dj.remove.call(Dc, DZ));
            }
            Dv && !DJ.length && ((Dj.teardown && false !== Dj.teardown.call(Dc, Dp, DQ.handle)) || Ww.removeEvent(Dc, DR, DQ.handle), delete Dz[DR]);
          } else {
            for (DR in Dz) Ww.event.remove(Dc, DR + Dy[DB], Di, DU, true);
          }
        }
        Ww.isEmptyObject(Dz) && WZ.remove(Dc, "handle events");
      }
    },
    dispatch: function (Dc) {
      var Dy,
        Di,
        DU,
        DL,
        Dd,
        Dv = Ww.event.fix(Dc),
        DO = new Array(arguments.length),
        Dc = (WZ.get(this, "events") || {})[Dv.type] || [],
        Dz = Ww.event.special[Dv.type] || {};
      for (DO[0] = Dv, Dy = 1; Dy < arguments.length; Dy++) {}
      if (((Dv.delegateTarget = this), !Dz.preDispatch || false !== Dz.preDispatch.call(this, Dv))) {
        for (Dd = Ww.event.handlers.call(this, Dv, Dc), Dy = 0; (DU = Dd[Dy++]) && !Dv.isPropagationStopped(); ) {
          for (Dv.currentTarget = DU.elem, Di = 0; (DL = DU.handlers[Di++]) && !Dv.isImmediatePropagationStopped(); ) {
            (Dv.rnamespace && !Dv.rnamespace.test(DL.namespace)) ||
              ((Dv.handleObj = DL),
              (Dv.data = DL.data),
              void 0 !== (DL = ((Ww.event.special[DL.origType] || {}).handle || DL.handler).apply(DU.elem, DO)) &&
                false === (Dv.result = DL) &&
                (Dv.preventDefault(), Dv.stopPropagation()));
          }
        }
        return Dz.postDispatch && Dz.postDispatch.call(this, Dv), Dv.result;
      }
    },
    handlers: function (Dc, Dy) {
      var Di,
        DU,
        DL,
        Dd,
        Dv,
        DO = [],
        Dz = Dy.delegateCount,
        DB = Dc.target;
      if (Dz && DB.nodeType && !("click" === Dc.type && 1 <= Dc.button)) {
        for (; DB !== this; DB = DB.parentNode || this) {
          if (1 === DB.nodeType && ("click" !== Dc.type || true !== DB.disabled)) {
            for (Dd = [], Dv = {}, Di = 0; Di < Dz; Di++) {
              void 0 === Dv[(DL = (DU = Dy[Di]).selector + " ")] &&
                (Dv[DL] = DU.needsContext ? -1 < Ww(DL, this).index(DB) : Ww.find(DL, this, null, [DB]).length);
              Dv[DL] && Dd.push(DU);
            }
            Dd.length &&
              DO.push({
                elem: DB,
                handlers: Dd
              });
          }
        }
      }
      return (
        (DB = this),
        Dz < Dy.length &&
          DO.push({
            elem: DB,
            handlers: Dy.slice(Dz)
          }),
        DO
      );
    },
    addProp: function (Dc, Dy) {
      Object.defineProperty(Ww.Event.prototype, Dc, {
        enumerable: true,
        configurable: true,
        get: W7(Dy)
          ? function () {
              if (this.originalEvent) {
                return Dy(this.originalEvent);
              }
            }
          : function () {
              if (this.originalEvent) {
                return this.originalEvent[Dc];
              }
            },
        set: function (Di) {
          Object.defineProperty(this, Dc, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Di
          });
        }
      });
    },
    fix: function (Dc) {
      return Dc[Ww.expando] ? Dc : new Ww.Event(Dc);
    },
    special: {
      load: { noBubble: true },
      focus: {
        trigger: function () {
          if (this !== fq() && this.focus) {
            return this.focus(), false;
          }
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function () {
          if (this === fq() && this.blur) {
            return this.blur(), false;
          }
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function () {
          if ("checkbox" === this.type && this.click && Wb(this, "input")) {
            return this.click(), false;
          }
        },
        _default: function (Dc) {
          return Wb(Dc.target, "a");
        }
      },
      beforeunload: {
        postDispatch: function (Dc) {
          void 0 !== Dc.result && Dc.originalEvent && (Dc.originalEvent.returnValue = Dc.result);
        }
      }
    }
  };
  Ww.removeEvent = function (Dc, Dy, Di) {
    Dc.removeEventListener && Dc.removeEventListener(Dy, Di);
  };
  Ww.Event = function (Dc, Dy) {
    if (!(this instanceof Ww.Event)) {
      return new Ww.Event(Dc, Dy);
    }
    Dc && Dc.type
      ? ((this.originalEvent = Dc),
        (this.type = Dc.type),
        (this.isDefaultPrevented = Dc.defaultPrevented || (void 0 === Dc.defaultPrevented && false === Dc.returnValue) ? fT : fC),
        (this.target = Dc.target && 3 === Dc.target.nodeType ? Dc.target.parentNode : Dc.target),
        (this.currentTarget = Dc.currentTarget),
        (this.relatedTarget = Dc.relatedTarget))
      : (this.type = Dc);
    Dy && Ww.extend(this, Dy);
    this.timeStamp = (Dc && Dc.timeStamp) || Date.now();
    this[Ww.expando] = true;
  };
  Ww.Event.prototype = {
    constructor: Ww.Event,
    isDefaultPrevented: fC,
    isPropagationStopped: fC,
    isImmediatePropagationStopped: fC,
    isSimulated: false,
    preventDefault: function () {
      var Dc = this.originalEvent;
      this.isDefaultPrevented = fT;
      Dc && !this.isSimulated && Dc.preventDefault();
    },
    stopPropagation: function () {
      var Dc = this.originalEvent;
      this.isPropagationStopped = fT;
      Dc && !this.isSimulated && Dc.stopPropagation();
    },
    stopImmediatePropagation: function () {
      var Dc = this.originalEvent;
      this.isImmediatePropagationStopped = fT;
      Dc && !this.isSimulated && Dc.stopImmediatePropagation();
      this.stopPropagation();
    }
  };
  Ww.each(
    {
      altKey: true,
      bubbles: true,
      cancelable: true,
      changedTouches: true,
      ctrlKey: true,
      detail: true,
      eventPhase: true,
      metaKey: true,
      pageX: true,
      pageY: true,
      shiftKey: true,
      view: true,
      char: true,
      charCode: true,
      key: true,
      keyCode: true,
      button: true,
      buttons: true,
      clientX: true,
      clientY: true,
      offsetX: true,
      offsetY: true,
      pointerId: true,
      pointerType: true,
      screenX: true,
      screenY: true,
      targetTouches: true,
      toElement: true,
      touches: true,
      which: function (Dc) {
        var Dy = Dc.button;
        return null == Dc.which && /^key/.test(Dc.type)
          ? null != Dc.charCode
            ? Dc.charCode
            : Dc.keyCode
          : !Dc.which && void 0 !== Dy && /^(?:mouse|pointer|contextmenu|drag|drop)|click/.test(Dc.type)
          ? 1 & Dy
            ? 1
            : 2 & Dy
            ? 3
            : 4 & Dy
            ? 2
            : 0
          : Dc.which;
      }
    },
    Ww.event.addProp
  );
  Ww.each(
    {
      mouseenter: "mouseover",
      mouseleave: "mouseout",
      pointerenter: "pointerover",
      pointerleave: "pointerout"
    },
    function (Dc, Dy) {
      Ww.event.special[Dc] = {
        delegateType: Dy,
        bindType: Dy,
        handle: function (Di) {
          var DU,
            DL = Di.relatedTarget,
            Dd = Di.handleObj;
          return (
            (DL && (DL === this || Ww.contains(this, DL))) || ((Di.type = Dd.origType), (DU = Dd.handler.apply(this, arguments)), (Di.type = Dy)), DU
          );
        }
      };
    }
  );
  Ww.fn.extend({
    on: function (Dc, Dy, Di, DU) {
      return fE(this, Dc, Dy, Di, DU);
    },
    one: function (Dc, Dy, Di, DU) {
      return fE(this, Dc, Dy, Di, DU, 1);
    },
    off: function (Dc, Dy, Di) {
      var DU, DL;
      if (Dc && Dc.preventDefault && Dc.handleObj) {
        DU = Dc.handleObj;
        Ww(Dc.delegateTarget).off(DU.namespace ? DU.origType + "." + DU.namespace : DU.origType, DU.selector, DU.handler);
      } else {
        if ("object" != typeof Dc) {
          return (
            (false !== Dy && "function" != typeof Dy) || ((Di = Dy), (Dy = void 0)),
            false === Di && (Di = fC),
            this.each(function () {
              Ww.event.remove(this, Dc, Di, Dy);
            })
          );
        }
        for (DL in Dc) this.off(DL, Dy, Dc[DL]);
      }
      return this;
    }
  });

  function fw(Dc, Dy) {
    return (Wb(Dc, "table") && Wb(11 !== Dy.nodeType ? Dy : Dy.firstChild, "tr") && Ww(Dc).children("tbody")[0]) || Dc;
  }

  function fS(Dc) {
    return (Dc.type = (null !== Dc.getAttribute("type")) + "/" + Dc.type), Dc;
  }

  function fF(Dc) {
    return "true/" === (Dc.type || "").slice(0, 5) ? (Dc.type = Dc.type.slice(5)) : Dc.removeAttribute("type"), Dc;
  }

  function fH(Dc, Dy) {
    var Di, DU, DL, Dd, Dv, DO;
    if (1 === Dy.nodeType) {
      if (WZ.hasData(Dc) && ((Dd = WZ.access(Dc)), (Dv = WZ.set(Dy, Dd)), (DO = Dd.events))) {
        for (DL in (delete Dv.handle, (Dv.events = {}), DO))
          for (Di = 0, DU = DO[DL].length; Di < DU; Di++) {
            Ww.event.add(Dy, DL, DO[DL][Di]);
          }
      }
      Wj.hasData(Dc) && ((Dd = Wj.access(Dc)), (Dv = Ww.extend({}, Dd)), Wj.set(Dy, Dv));
    }
  }

  function fV(Dc, Dy, Di, DU) {
    Dy = Wu.apply([], Dy);
    var DL,
      Dd,
      Dv,
      DO,
      Dz,
      DB,
      DZ = 0,
      Dj = Dc.length,
      DJ = Dj - 1,
      DR = Dy[0],
      Dp = W7(DR);
    if (Dp || (1 < Dj && "string" == typeof DR && !WP.checkClone && /checked\s*(?:[^=]|=\s*.checked.)/i.test(DR))) {
      return Dc.each(function (Da) {
        var DQ = Dc.eq(Da);
        Dp && (Dy[0] = DR.call(this, Da, DQ.html()));
        fV(DQ, Dy, Di, DU);
      });
    }
    if (Dj && ((Dd = (DL = fD(Dy, Dc[0].ownerDocument, false, Dc, DU)).firstChild), 1 === DL.childNodes.length && (DL = Dd), Dd || DU)) {
      for (DO = (Dv = Ww.map(f9(DL, "script"), fS)).length; DZ < Dj; DZ++) {
        Dz = DL;
        DZ !== DJ && ((Dz = Ww.clone(Dz, true, true)), DO) && Ww.merge(Dv, f9(Dz, "script"));
        Di.call(Dc[DZ], Dz, DZ);
      }
      if (DO) {
        for (DB = Dv[Dv.length - 1].ownerDocument, Ww.map(Dv, fF), DZ = 0; DZ < DO; DZ++) {
          Dz = Dv[DZ];
          /^$|^module$|\/(?:java|ecma)script/i.test(Dz.type || "") &&
            !WZ.access(Dz, "globalEval") &&
            Ww.contains(DB, Dz) &&
            (Dz.src && "module" !== (Dz.type || "").toLowerCase()
              ? Ww["_evalUrl"] && Ww["_evalUrl"](Dz.src)
              : WM(Dz.textContent.replace(/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, ""), DB, Dz));
        }
      }
    }
    return Dc;
  }

  function fr(Dc, Dy, Di) {
    for (var DU, DL = Dy ? Ww.filter(Dy, Dc) : Dc, Dd = 0; null != (DU = DL[Dd]); Dd++) {
      Di || 1 !== DU.nodeType || Ww.cleanData(f9(DU));
      DU.parentNode && (Di && Ww.contains(DU.ownerDocument, DU) && fW(f9(DU, "script")), DU.parentNode.removeChild(DU));
    }
    return Dc;
  }

  Ww.extend({
    htmlPrefilter: function (Dc) {
      return Dc.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, "<$1></$2>");
    },
    clone: function (Dc, Dy, Di) {
      var DU,
        DL,
        Dd,
        Dv,
        DO,
        Dz,
        DB,
        DZ = Dc.cloneNode(true),
        Dj = Ww.contains(Dc.ownerDocument, Dc);
      if (!(WP.noCloneChecked || (1 !== Dc.nodeType && 11 !== Dc.nodeType) || Ww.isXMLDoc(Dc))) {
        for (Dv = f9(DZ), DU = 0, DL = (Dd = f9(Dc)).length; DU < DL; DU++) {
          DO = Dd[DU];
          Dz = Dv[DU];
          DB = void 0;
          "input" === (DB = Dz.nodeName.toLowerCase()) && /^(?:checkbox|radio)$/i.test(DO.type)
            ? (Dz.checked = DO.checked)
            : ("input" !== DB && "textarea" !== DB) || (Dz.defaultValue = DO.defaultValue);
        }
      }
      if (Dy) {
        if (Di) {
          for (Dd = Dd || f9(Dc), Dv = Dv || f9(DZ), DU = 0, DL = Dd.length; DU < DL; DU++) {
            fH(Dd[DU], Dv[DU]);
          }
        } else {
          fH(Dc, DZ);
        }
      }
      return 0 < (Dv = f9(DZ, "script")).length && fW(Dv, !Dj && f9(Dc, "script")), DZ;
    },
    cleanData: function (Dc) {
      for (var Dy, Di, DU, DL = Ww.event.special, Dd = 0; void 0 !== (Di = Dc[Dd]); Dd++) {
        if (Wz(Di)) {
          if ((Dy = Di[WZ.expando])) {
            if (Dy.events) {
              for (DU in Dy.events) DL[DU] ? Ww.event.remove(Di, DU) : Ww.removeEvent(Di, DU, Dy.handle);
            }
            Di[WZ.expando] = void 0;
          }
          Di[Wj.expando] && (Di[Wj.expando] = void 0);
        }
      }
    }
  });
  Ww.fn.extend({
    detach: function (Dc) {
      return fr(this, Dc, true);
    },
    remove: function (Dc) {
      return fr(this, Dc);
    },
    text: function (Dc) {
      return WU(
        this,
        function (Dy) {
          return void 0 === Dy
            ? Ww.text(this)
            : this.empty().each(function () {
                (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (this.textContent = Dy);
              });
        },
        null,
        Dc,
        arguments.length
      );
    },
    append: function () {
      return fV(this, arguments, function (Dc) {
        (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || fw(this, Dc).appendChild(Dc);
      });
    },
    prepend: function () {
      return fV(this, arguments, function (Dc) {
        var Dy;
        (1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType) || (Dy = fw(this, Dc)).insertBefore(Dc, Dy.firstChild);
      });
    },
    before: function () {
      return fV(this, arguments, function (Dc) {
        this.parentNode && this.parentNode.insertBefore(Dc, this);
      });
    },
    after: function () {
      return fV(this, arguments, function (Dc) {
        this.parentNode && this.parentNode.insertBefore(Dc, this.nextSibling);
      });
    },
    empty: function () {
      for (var Dc, Dy = 0; null != (Dc = this[Dy]); Dy++) {
        1 === Dc.nodeType && (Ww.cleanData(f9(Dc, false)), (Dc.textContent = ""));
      }
      return this;
    },
    clone: function (Dc, Dy) {
      return (
        (Dc = null != Dc && Dc),
        (Dy = null == Dy ? Dc : Dy),
        this.map(function () {
          return Ww.clone(this, Dc, Dy);
        })
      );
    },
    html: function (Dc) {
      return WU(
        this,
        function (Dy) {
          var Di = this[0] || {},
            DU = 0,
            DL = this.length;
          if (void 0 === Dy && 1 === Di.nodeType) {
            return Di.innerHTML;
          }
          if (
            "string" == typeof Dy &&
            !/<script|<style|<link/i.test(Dy) &&
            !f8[(/<([a-z][^\/\0>\x20\t\r\n\f]+)/i.exec(Dy) || ["", ""])[1].toLowerCase()]
          ) {
            Dy = Ww.htmlPrefilter(Dy);
            try {
              for (; DU < DL; DU++) {
                1 === (Di = this[DU] || {}).nodeType && (Ww.cleanData(f9(Di, false)), (Di.innerHTML = Dy));
              }
              Di = 0;
            } catch (Dd) {}
          }
          Di && this.empty().append(Dy);
        },
        null,
        Dc,
        arguments.length
      );
    },
    replaceWith: function () {
      var Dc = [];
      return fV(
        this,
        arguments,
        function (Dy) {
          var Di = this.parentNode;
          Ww.inArray(this, Dc) < 0 && (Ww.cleanData(f9(this)), Di) && Di.replaceChild(Dy, this);
        },
        Dc
      );
    }
  });
  Ww.each(
    {
      appendTo: "append",
      prependTo: "prepend",
      insertBefore: "before",
      insertAfter: "after",
      replaceAll: "replaceWith"
    },
    function (Dc, Dy) {
      Ww.fn[Dc] = function (Di) {
        for (var DU, DL = [], Dd = Ww(Di), Dv = Dd.length - 1, DO = 0; DO <= Dv; DO++) {
          DU = DO === Dv ? this : this.clone(true);
          Ww(Dd[DO])[Dy](DU);
          Wl.apply(DL, DU.get());
        }
        return this.pushStack(DL);
      };
    }
  );

  function fb(Dc) {
    var Dy = Dc.ownerDocument.defaultView;
    return (Dy = Dy && Dy.opener ? Dy : W5).getComputedStyle(Dc);
  }

  var fX,
    fA,
    fn,
    fs,
    fY,
    fh,
    fK,
    fm = new RegExp("^(" + W9 + ")(?!px)[a-z%]+$", "i"),
    fN = new RegExp(f1.join("|"), "i");

  function fx() {
    var Dc;
    fK &&
      ((fh.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
      (fK.style.cssText =
        "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
      fu.appendChild(fh).appendChild(fK),
      (Dc = W5.getComputedStyle(fK)),
      (fX = "1%" !== Dc.top),
      (fY = 12 === fI(Dc.marginLeft)),
      (fK.style.right = "60%"),
      (fs = 36 === fI(Dc.right)),
      (fA = 36 === fI(Dc.width)),
      (fK.style.position = "absolute"),
      (fn = 36 === fK.offsetWidth || "absolute"),
      fu.removeChild(fh),
      (fK = null));
  }

  function fI(Dc) {
    return Math.round(parseFloat(Dc));
  }

  function fc(Dc, Dy, Di) {
    var DU,
      DL,
      Dd = Dc.style;
    return (
      (Di = Di || fb(Dc)) &&
        ("" !== (DL = Di.getPropertyValue(Dy) || Di[Dy]) || Ww.contains(Dc.ownerDocument, Dc) || (DL = Ww.style(Dc, Dy)), !WP.pixelBoxStyles()) &&
        fm.test(DL) &&
        fN.test(Dy) &&
        ((Dc = Dd.width),
        (Dy = Dd.minWidth),
        (DU = Dd.maxWidth),
        (Dd.minWidth = Dd.maxWidth = Dd.width = DL),
        (DL = Di.width),
        (Dd.width = Dc),
        (Dd.minWidth = Dy),
        (Dd.maxWidth = DU)),
      void 0 !== DL ? DL + "" : DL
    );
  }

  function fy(Dc, Dy) {
    return {
      get: function () {
        if (!Dc()) {
          return (this.get = Dy).apply(this, arguments);
        }
        delete this.get;
      }
    };
  }

  fh = WW.createElement("div");
  (fK = WW.createElement("div")).style &&
    ((fK.style.backgroundClip = "content-box"),
    (fK.cloneNode(true).style.backgroundClip = ""),
    (WP.clearCloneStyle = "content-box" === fK.style.backgroundClip),
    Ww.extend(WP, {
      boxSizingReliable: function () {
        return fx(), fA;
      },
      pixelBoxStyles: function () {
        return fx(), fs;
      },
      pixelPosition: function () {
        return fx(), fX;
      },
      reliableMarginLeft: function () {
        return fx(), fY;
      },
      scrollboxSize: function () {
        return fx(), fn;
      }
    }));
  var fL = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    fv = ["Webkit", "Moz", "ms"],
    fO = WW.createElement("div").style;

  function fz(Dc) {
    return (
      Ww.cssProps[Dc] ||
      (Ww.cssProps[Dc] =
        (function (Dy) {
          if (Dy in fO) {
            return Dy;
          }
          for (var Di = Dy[0].toUpperCase() + Dy.slice(1), DU = fv.length; DU--; ) {
            if ((Dy = fv[DU] + Di) in fO) {
              return Dy;
            }
          }
        })(Dc) || Dc)
    );
  }

  function fB(Dc, Dy, Di) {
    var DU = f0.exec(Dy);
    return DU ? Math.max(0, DU[2] - (Di || 0)) + (DU[3] || "px") : Dy;
  }

  function fZ(Dc, Dy, Di, DU, DL, Dd) {
    var Dv = "width" === Dy ? 1 : 0,
      DO = 0,
      Dz = 0;
    if (Di === (DU ? "border" : "content")) {
      return 0;
    }
    for (; Dv < 4; Dv += 2) {
      "margin" === Di && (Dz += Ww.css(Dc, Di + f1[Dv], true, DL));
      DU
        ? ("content" === Di && (Dz -= Ww.css(Dc, "padding" + f1[Dv], true, DL)),
          "margin" !== Di && (Dz -= Ww.css(Dc, "border" + f1[Dv] + "Width", true, DL)))
        : ((Dz += Ww.css(Dc, "padding" + f1[Dv], true, DL)),
          "padding" !== Di ? (Dz += Ww.css(Dc, "border" + f1[Dv] + "Width", true, DL)) : (DO += Ww.css(Dc, "border" + f1[Dv] + "Width", true, DL)));
    }
    return !DU && 0 <= Dd && (Dz += Math.max(0, Math.ceil(Dc["offset" + Dy[0].toUpperCase() + Dy.slice(1)] - Dd - Dz - DO - 0.5))), Dz;
  }

  function fj(Dc, Dy, Di) {
    var DU = fb(Dc),
      DL = fc(Dc, Dy, DU),
      Dd = "border-box" === Ww.css(Dc, "boxSizing", false, DU),
      Dv = Dd;
    if (fm.test(DL)) {
      if (!Di) {
        return DL;
      }
      DL = "auto";
    }
    return (
      (Dv = Dv && (WP.boxSizingReliable() || DL === Dc.style[Dy])),
      ("auto" !== DL && (parseFloat(DL) || "inline" !== Ww.css(Dc, "display", false, DU))) ||
        ((DL = Dc["offset" + Dy[0].toUpperCase() + Dy.slice(1)]), (Dv = true)),
      (DL = parseFloat(DL) || 0) + fZ(Dc, Dy, Di || (Dd ? "border" : "content"), Dv, DU, DL) + "px"
    );
  }

  function fJ(Dc, Dy, Di, DU, DL) {
    return new fJ.prototype.init(Dc, Dy, Di, DU, DL);
  }

  Ww.extend({
    cssHooks: {
      opacity: {
        get: function (Dc, Dy) {
          if (Dy) {
            return "" === (Dy = fc(Dc, "opacity")) ? "1" : Dy;
          }
        }
      }
    },
    cssNumber: {
      animationIterationCount: true,
      columnCount: true,
      fillOpacity: true,
      flexGrow: true,
      flexShrink: true,
      fontWeight: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      widows: true,
      zIndex: true,
      zoom: true
    },
    cssProps: {},
    style: function (Dc, Dy, Di, DU) {
      if (Dc && 3 !== Dc.nodeType && 8 !== Dc.nodeType && Dc.style) {
        var DL,
          Dd,
          Dv,
          DO = WO(Dy),
          Dz = /^--/.test(Dy),
          DB = Dc.style;
        if ((Dz || (Dy = fz(DO)), (Dv = Ww.cssHooks[Dy] || Ww.cssHooks[DO]), void 0 === Di)) {
          return Dv && "get" in Dv && void 0 !== (DL = Dv.get(Dc, false, DU)) ? DL : DB[Dy];
        }
        "string" == (Dd = typeof Di) && (DL = f0.exec(Di)) && DL[1] && ((Di = f2(Dc, Dy, DL)), (Dd = "number"));
        null != Di &&
          Di == Di &&
          ("number" === Dd && (Di += (DL && DL[3]) || (Ww.cssNumber[DO] ? "" : "px")),
          WP.clearCloneStyle || "" !== Di || 0 !== Dy.indexOf("background") || (DB[Dy] = "inherit"),
          (Dv && "set" in Dv && void 0 === (Di = Dv.set(Dc, Di, DU))) || (Dz ? DB.setProperty(Dy, Di) : (DB[Dy] = Di)));
      }
    },
    css: function (Dc, Dy, Di, DU) {
      var DL,
        Dd = WO(Dy);
      return (
        /^--/.test(Dy) || (Dy = fz(Dd)),
        "normal" ===
          (DL = void 0 === (DL = (Dd = Ww.cssHooks[Dy] || Ww.cssHooks[Dd]) && "get" in Dd ? Dd.get(Dc, true, Di) : DL) ? fc(Dc, Dy, DU) : DL) &&
          Dy in fd &&
          (DL = fd[Dy]),
        ("" === Di || Di) && ((Dd = parseFloat(DL)), true === Di || isFinite(Dd)) ? Dd || 0 : DL
      );
    }
  });
  Ww.each(["height", "width"], function (Dc, Dy) {
    Ww.cssHooks[Dy] = {
      get: function (Di, DU, DL) {
        if (DU) {
          return !/^(none|table(?!-c[ea]).+)/.test(Ww.css(Di, "display")) || (Di.getClientRects().length && Di.getBoundingClientRect().width)
            ? fj(Di, Dy, DL)
            : WQ(Di, fL, function () {
                return fj(Di, Dy, DL);
              });
        }
      },
      set: function (Di, DU, DL) {
        var Dd = fb(Di),
          Dv = "border-box" === Ww.css(Di, "boxSizing", false, Dd),
          DL = DL && fZ(Di, Dy, DL, Dv, Dd);
        return (
          Dv &&
            WP.scrollboxSize() === Dd.position &&
            (DL -= Math.ceil(Di["offset" + Dy[0].toUpperCase() + Dy.slice(1)] - parseFloat(Dd[Dy]) - fZ(Di, Dy, "border", false, Dd) - 0.5)),
          DL && (Dv = f0.exec(DU)) && "px" !== (Dv[3] || "px") && ((Di.style[Dy] = DU), (DU = Ww.css(Di, Dy))),
          fB(0, DU, DL)
        );
      }
    };
  });
  Ww.cssHooks.marginLeft = fy(WP.reliableMarginLeft, function (Dc, Dy) {
    if (Dy) {
      return (
        (parseFloat(fc(Dc, "marginLeft")) ||
          Dc.getBoundingClientRect().left -
            WQ(Dc, { marginLeft: 0 }, function () {
              return Dc.getBoundingClientRect().left;
            })) + "px"
      );
    }
  });
  Ww.each(
    {
      margin: "",
      padding: "",
      border: "Width"
    },
    function (Dc, Dy) {
      Ww.cssHooks[Dc + Dy] = {
        expand: function (Di) {
          for (var DU = 0, DL = {}, Dd = "string" == typeof Di ? Di.split(" ") : [Di]; DU < 4; DU++) {
            DL[Dc + f1[DU] + Dy] = Dd[DU] || Dd[DU - 2] || Dd[0];
          }
          return DL;
        }
      };
      "margin" !== Dc && (Ww.cssHooks[Dc + Dy].set = fB);
    }
  );
  Ww.fn.extend({
    css: function (Dc, Dy) {
      return WU(
        this,
        function (Di, DU, DL) {
          var Dd,
            Dv,
            DO = { Dy: arguments[Dy] },
            Dz = 0;
          if (Array.isArray(DU)) {
            for (Dd = fb(Di), Dv = DU.length; Dz < Dv; Dz++) {
              DO[DU[Dz]] = Ww.css(Di, DU[Dz], false, Dd);
            }
            return DO;
          }
          return void 0 !== DL ? Ww.style(Di, DU, DL) : Ww.css(Di, DU);
        },
        Dc,
        Dy,
        1 < arguments.length
      );
    }
  });
  ((Ww.Tween = fJ).prototype = {
    constructor: fJ,
    init: function (Dc, Dy, Di, DU, DL, Dd) {
      this.elem = Dc;
      this.prop = Di;
      this.easing = DL || Ww.easing["_default"];
      this.options = Dy;
      this.start = this.now = this.cur();
      this.end = DU;
      this.unit = Dd || (Ww.cssNumber[Di] ? "" : "px");
    },
    cur: function () {
      var Dc = fJ.propHooks[this.prop];
      return (Dc && Dc.get ? Dc : fJ.propHooks["_default"]).get(this);
    },
    run: function (Dc) {
      var Dy,
        Di = fJ.propHooks[this.prop];
      return (
        this.options.duration
          ? (this.pos = Dy = Ww.easing[this.easing](Dc, this.options.duration * Dc, 0, 1, this.options.duration))
          : (this.pos = Dy = Dc),
        (this.now = (this.end - this.start) * Dy + this.start),
        this.options.step && this.options.step.call(this.elem, this.now, this),
        (Di && Di.set ? Di : fJ.propHooks["_default"]).set(this),
        this
      );
    }
  }).init.prototype = fJ.prototype;
  (fJ.propHooks = {
    _default: {
      get: function (Dc) {
        return 1 !== Dc.elem.nodeType || (null != Dc.elem[Dc.prop] && null == Dc.elem.style[Dc.prop])
          ? Dc.elem[Dc.prop]
          : (Dc = Ww.css(Dc.elem, Dc.prop, "")) && "auto" !== Dc
          ? Dc
          : 0;
      },
      set: function (Dc) {
        Ww.fx.step[Dc.prop]
          ? Ww.fx.step[Dc.prop](Dc)
          : 1 !== Dc.elem.nodeType || (null == Dc.elem.style[Ww.cssProps[Dc.prop]] && !Ww.cssHooks[Dc.prop])
          ? (Dc.elem[Dc.prop] = Dc.now)
          : Ww.style(Dc.elem, Dc.prop, Dc.now + Dc.unit);
      }
    }
  }).scrollTop = fJ.propHooks.scrollLeft = {
    set: function (Dc) {
      Dc.elem.nodeType && Dc.elem.parentNode && (Dc.elem[Dc.prop] = Dc.now);
    }
  };
  Ww.easing = {
    linear: function (Dc) {
      return Dc;
    },
    swing: function (Dc) {
      return 0.5 - Math.cos(Dc * Math.PI) / 2;
    },
    _default: "swing"
  };
  Ww.fx = fJ.prototype.init;
  Ww.fx.step = {};
  var fR, fp, fa, fQ;

  function D2() {
    fp && (false === WW.hidden && W5.requestAnimationFrame ? W5.requestAnimationFrame(D2) : W5.setTimeout(D2, Ww.fx.interval), Ww.fx.tick());
  }

  function D3() {
    return (
      W5.setTimeout(function () {
        fR = void 0;
      }),
      (fR = Date.now())
    );
  }

  function D4(Dc, Dy) {
    var Di,
      DU = 0,
      DL = { height: Dc };
    for (Dy = Dy ? 1 : 0; DU < 4; DU += 2 - Dy) {
      DL["margin" + (Di = f1[DU])] = DL["padding" + Di] = Dc;
    }
    return Dy && (DL.opacity = DL.width = Dc), DL;
  }

  function D5(Dc, Dy, Di) {
    for (var DU, DL = (D6.tweeners[Dy] || []).concat(D6.tweeners["*"]), Dd = 0, Dv = DL.length; Dd < Dv; Dd++) {
      if ((DU = DL[Dd].call(Di, Dy, Dc))) {
        return DU;
      }
    }
  }

  function D6(Dc, Dy, Di) {
    var DU,
      DL,
      Dd,
      Dv,
      DO,
      Dz,
      DB,
      DZ = 0,
      Dj = D6.prefilters.length,
      DJ = Ww.Deferred().always(function () {
        delete DR.elem;
      }),
      DR = function () {
        if (DL) {
          return false;
        }
        for (
          var e1 = fR || D3(), e1 = Math.max(0, Dp.startTime + Dp.duration - e1), e2 = 1 - (e1 / Dp.duration || 0), e3 = 0, e4 = Dp.tweens.length;
          e3 < e4;
          e3++
        ) {
          Dp.tweens[e3].run(e2);
        }
        return DJ.notifyWith(Dc, [Dp, e2, e1]), e2 < 1 && e4 ? e1 : (e4 || DJ.notifyWith(Dc, [Dp, 1, 0]), DJ.resolveWith(Dc, [Dp]), false);
      },
      Dp = DJ.promise({
        elem: Dc,
        props: Ww.extend({}, Dy),
        opts: Ww.extend(
          true,
          {
            specialEasing: {},
            easing: Ww.easing["_default"]
          },
          Di
        ),
        originalProperties: Dy,
        originalOptions: Di,
        startTime: fR || D3(),
        duration: Di.duration,
        tweens: [],
        createTween: function (e1, e2) {
          return (e2 = Ww.Tween(Dc, Dp.opts, e1, e2, Dp.opts.specialEasing[e1] || Dp.opts.easing)), (Dp.tweens.push(e2), e2);
        },
        stop: function (e1) {
          var e2 = 0,
            e3 = e1 ? Dp.tweens.length : 0;
          if (!DL) {
            for (DL = true; e2 < e3; e2++) {
              Dp.tweens[e2].run(1);
            }
            e1 ? (DJ.notifyWith(Dc, [Dp, 1, 0]), DJ.resolveWith(Dc, [Dp, e1])) : DJ.rejectWith(Dc, [Dp, e1]);
          }
          return this;
        }
      }),
      Da = Dp.props,
      DQ = Da,
      e0 = Dp.opts.specialEasing;
    for (Dd in DQ)
      if (
        ((Dv = WO(Dd)),
        (DO = e0[Dv]),
        (Dz = DQ[Dd]),
        Array.isArray(Dz) && ((DO = Dz[1]), (Dz = DQ[Dd] = Dz[0])),
        Dd !== Dv && ((DQ[Dv] = Dz), delete DQ[Dd]),
        (DB = Ww.cssHooks[Dv]) && "expand" in DB)
      ) {
        for (Dd in ((Dz = DB.expand(Dz)), delete DQ[Dv], Dz)) Dd in DQ || ((DQ[Dd] = Dz[Dd]), (e0[Dd] = DO));
      } else {
      }
    for (; DZ < Dj; DZ++) {
      if ((DU = D6.prefilters[DZ].call(Dp, Dc, Da, Dp.opts))) {
        return W7(DU.stop) && (Ww["_queueHooks"](Dp.elem, Dp.opts.queue).stop = DU.stop.bind(DU)), DU;
      }
    }
    return (
      Ww.map(Da, D5, Dp),
      W7(Dp.opts.start) && Dp.opts.start.call(Dc, Dp),
      Dp.progress(Dp.opts.progress).done(Dp.opts.done, Dp.opts.complete).fail(Dp.opts.fail).always(Dp.opts.always),
      Ww.fx.timer(
        Ww.extend(DR, {
          elem: Dc,
          anim: Dp,
          queue: Dp.opts.queue
        })
      ),
      Dp
    );
  }

  Ww.Animation = Ww.extend(D6, {
    tweeners: {
      "*": [
        function (Dc, Dy) {
          var Di = this.createTween(Dc, Dy);
          return f2(Di.elem, Dc, f0.exec(Dy), Di), Di;
        }
      ]
    },
    tweener: function (Dc, Dy) {
      for (var Di, DU = 0, DL = (Dc = W7(Dc) ? ((Dy = Dc), ["*"]) : Dc.match(/[^\x20\t\r\n\f]+/g)).length; DU < DL; DU++) {
        Di = Dc[DU];
        D6.tweeners[Di] = D6.tweeners[Di] || [];
        D6.tweeners[Di].unshift(Dy);
      }
    },
    prefilters: [
      function (Dc, Dy, Di) {
        var DU,
          DL,
          Dd,
          Dv,
          DO,
          Dz,
          DB,
          DZ = "width" in Dy || "height" in Dy,
          Dj = this,
          DJ = { DU: (Da && Da[DU]) || Ww.style(Dc, DU) },
          DR = Dc.style,
          Dp = Dc.nodeType && Wa(Dc),
          Da = WZ.get(Dc, "fxshow");
        for (DU in (Di.queue ||
          (null == (Dv = Ww["_queueHooks"](Dc, "fx")).unqueued &&
            ((Dv.unqueued = 0),
            (DO = Dv.empty.fire),
            (Dv.empty.fire = function () {
              Dv.unqueued || DO();
            })),
          Dv.unqueued++,
          Dj.always(function () {
            Dj.always(function () {
              Dv.unqueued--;
              Ww.queue(Dc, "fx").length || Dv.empty.fire();
            });
          })),
        Dy))
          if (((DL = Dy[DU]), /^(?:toggle|show|hide)$/.test(DL))) {
            if ((delete Dy[DU], (Dd = Dd || "toggle" === DL), DL === (Dp ? "hide" : "show"))) {
              if ("show" !== DL || !Da || void 0 === Da[DU]) {
                continue;
              }
              Dp = true;
            }
          }
        if ((Dz = !Ww.isEmptyObject(Dy)) || !Ww.isEmptyObject(DJ)) {
          for (DU in (DZ &&
            1 === Dc.nodeType &&
            ((Di.overflow = [DR.overflow, DR.overflowX, DR.overflowY]),
            null == (DB = Da && Da.display) && (DB = WZ.get(Dc, "display")),
            "none" === (DZ = Ww.css(Dc, "display")) &&
              (DB ? (DZ = DB) : (f4([Dc], true), (DB = Dc.style.display || DB), (DZ = Ww.css(Dc, "display")), f4([Dc]))),
            "inline" === DZ || ("inline-block" === DZ && null != DB)) &&
            "none" === Ww.css(Dc, "float") &&
            (Dz ||
              (Dj.done(function () {
                DR.display = DB;
              }),
              null == DB && ((DZ = DR.display), (DB = "none" === DZ ? "" : DZ))),
            (DR.display = "inline-block")),
          Di.overflow &&
            ((DR.overflow = "hidden"),
            Dj.always(function () {
              DR.overflow = Di.overflow[0];
              DR.overflowX = Di.overflow[1];
              DR.overflowY = Di.overflow[2];
            })),
          (Dz = false),
          DJ))
            Dz ||
              (Da ? "hidden" in Da && (Dp = Da.hidden) : (Da = WZ.access(Dc, "fxshow", { display: DB })),
              Dd && (Da.hidden = !Dp),
              Dp && f4([Dc], true),
              Dj.done(function () {
                for (DU in (Dp || f4([Dc]), WZ.remove(Dc, "fxshow"), DJ)) Ww.style(Dc, DU, DJ[DU]);
              })),
              (Dz = D5(Dp ? Da[DU] : 0, DU, Dj)),
              DU in Da || ((Da[DU] = Dz.start), Dp && ((Dz.end = Dz.start), (Dz.start = 0)));
        }
      }
    ],
    prefilter: function (Dc, Dy) {
      Dy ? D6.prefilters.unshift(Dc) : D6.prefilters.push(Dc);
    }
  });
  Ww.speed = function (Dc, Dy, Di) {
    var DU =
      Dc && "object" == typeof Dc
        ? Ww.extend({}, Dc)
        : {
            complete: Di || (!Di && Dy) || (W7(Dc) && Dc),
            duration: Dc,
            easing: (Di && Dy) || (Dy && !W7(Dy) && Dy)
          };
    return (
      Ww.fx.off
        ? (DU.duration = 0)
        : "number" != typeof DU.duration &&
          (DU.duration in Ww.fx.speeds ? (DU.duration = Ww.fx.speeds[DU.duration]) : (DU.duration = Ww.fx.speeds["_default"])),
      (null != DU.queue && true !== DU.queue) || (DU.queue = "fx"),
      (DU.old = DU.complete),
      (DU.complete = function () {
        W7(DU.old) && DU.old.call(this);
        DU.queue && Ww.dequeue(this, DU.queue);
      }),
      DU
    );
  };
  Ww.fn.extend({
    fadeTo: function (Dc, Dy, Di, DU) {
      return this.filter(Wa).css("opacity", 0).show().end().animate({ opacity: Dy }, Dc, Di, DU);
    },
    animate: function (Dc, Dy, Di, DU) {
      function DL() {
        var DO = D6(this, Ww.extend({}, Dc), Dv);
        (Dd || WZ.get(this, "finish")) && DO.stop(true);
      }

      var Dd = Ww.isEmptyObject(Dc),
        Dv = Ww.speed(Dy, Di, DU);
      return (DL.finish = DL), Dd || false === Dv.queue ? this.each(DL) : this.queue(Dv.queue, DL);
    },
    stop: function (Dc, Dy, Di) {
      function DU(DL) {
        var Dd = DL.stop;
        delete DL.stop;
        Dd(Di);
      }

      return (
        "string" != typeof Dc && ((Di = Dy), (Dy = Dc), (Dc = void 0)),
        Dy && false !== Dc && this.queue(Dc || "fx", []),
        this.each(function () {
          var DL = true,
            Dd = null != Dc && Dc + "queueHooks",
            Dv = Ww.timers,
            DO = WZ.get(this);
          if (Dd) {
            DO[Dd] && DO[Dd].stop && DU(DO[Dd]);
          } else {
            for (Dd in DO) DO[Dd] && DO[Dd].stop && /queueHooks$/.test(Dd) && DU(DO[Dd]);
          }
          for (Dd = Dv.length; Dd--; ) {
            Dv[Dd].elem !== this || (null != Dc && Dv[Dd].queue !== Dc) || (Dv[Dd].anim.stop(Di), (DL = false), Dv.splice(Dd, 1));
          }
          (!DL && Di) || Ww.dequeue(this, Dc);
        })
      );
    },
    finish: function (Dc) {
      return (
        false !== Dc && (Dc = Dc || "fx"),
        this.each(function () {
          var Dy,
            Di = WZ.get(this),
            DU = Di[Dc + "queue"],
            DL = Di[Dc + "queueHooks"],
            Dd = Ww.timers,
            Dv = DU ? DU.length : 0;
          for (Di.finish = true, Ww.queue(this, Dc, []), DL && DL.stop && DL.stop.call(this, true), Dy = Dd.length; Dy--; ) {
            Dd[Dy].elem === this && Dd[Dy].queue === Dc && (Dd[Dy].anim.stop(true), Dd.splice(Dy, 1));
          }
          for (Dy = 0; Dy < Dv; Dy++) {
            DU[Dy] && DU[Dy].finish && DU[Dy].finish.call(this);
          }
          delete Di.finish;
        })
      );
    }
  });
  Ww.each(["toggle", "show", "hide"], function (Dc, Dy) {
    var Di = Ww.fn[Dy];
    Ww.fn[Dy] = function (DU, DL, Dd) {
      return null == DU || "boolean" == typeof DU ? Di.apply(this, arguments) : this.animate(D4(Dy, true), DU, DL, Dd);
    };
  });
  Ww.each(
    {
      slideDown: D4("show"),
      slideUp: D4("hide"),
      slideToggle: D4("toggle"),
      fadeIn: { opacity: "show" },
      fadeOut: { opacity: "hide" },
      fadeToggle: { opacity: "toggle" }
    },
    function (Dc, Dy) {
      Ww.fn[Dc] = function (Di, DU, DL) {
        return this.animate(Dy, Di, DU, DL);
      };
    }
  );
  Ww.timers = [];
  Ww.fx.tick = function () {
    var Dc,
      Dy = 0,
      Di = Ww.timers;
    for (fR = Date.now(); Dy < Di.length; Dy++) {
      (Dc = Di[Dy])() || Di[Dy] !== Dc || Di.splice(Dy--, 1);
    }
    Di.length || Ww.fx.stop();
    fR = void 0;
  };
  Ww.fx.timer = function (Dc) {
    Ww.timers.push(Dc);
    Ww.fx.start();
  };
  Ww.fx.interval = 13;
  Ww.fx.start = function () {
    fp || ((fp = true), D2());
  };
  Ww.fx.stop = function () {
    fp = null;
  };
  Ww.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  Ww.fn.delay = function (Dc, Dy) {
    return (
      (Dc = (Ww.fx && Ww.fx.speeds[Dc]) || Dc),
      this.queue((Dy = Dy || "fx"), function (Di, DU) {
        var DL = W5.setTimeout(Di, Dc);
        DU.stop = function () {
          W5.clearTimeout(DL);
        };
      })
    );
  };
  fa = WW.createElement("input");
  fQ = WW.createElement("select").appendChild(WW.createElement("option"));
  fa.type = "checkbox";
  (fa = WW.createElement("input")).value = "t";
  fa.type = "radio";
  var D7,
    D8 = Ww.expr.attrHandle,
    D9 =
      (Ww.fn.extend({
        attr: function (Dc, Dy) {
          return WU(this, Ww.attr, Dc, Dy, 1 < arguments.length);
        },
        removeAttr: function (Dc) {
          return this.each(function () {
            Ww.removeAttr(this, Dc);
          });
        }
      }),
      Ww.extend({
        attr: function (Dc, Dy, Di) {
          var DU,
            DL,
            Dd = Dc.nodeType;
          if (3 !== Dd && 8 !== Dd && 2 !== Dd) {
            return void 0 === Dc.getAttribute
              ? Ww.prop(Dc, Dy, Di)
              : ((1 === Dd && Ww.isXMLDoc(Dc)) || (DL = Ww.attrHooks[Dy.toLowerCase()] || (Ww.expr.match.bool.test(Dy) ? D7 : void 0)),
                void 0 !== Di
                  ? null === Di
                    ? void Ww.removeAttr(Dc, Dy)
                    : DL && "set" in DL && void 0 !== (DU = DL.set(Dc, Di, Dy))
                    ? DU
                    : (Dc.setAttribute(Dy, Di + ""), Di)
                  : !(DL && "get" in DL && null !== (DU = DL.get(Dc, Dy))) && null == (DU = Ww.find.attr(Dc, Dy))
                  ? void 0
                  : DU);
          }
        },
        attrHooks: {
          type: {
            set: function (Dc, Dy) {
              var Di;
              if (!WP.radioValue && "radio" === Dy && Wb(Dc, "input")) {
                return (Di = Dc.value), Dc.setAttribute("type", Dy), Di && (Dc.value = Di), Dy;
              }
            }
          }
        },
        removeAttr: function (Dc, Dy) {
          var Di,
            DU = 0,
            DL = Dy && Dy.match(/[^\x20\t\r\n\f]+/g);
          if (DL && 1 === Dc.nodeType) {
            for (; (Di = DL[DU++]); ) {
              Dc.removeAttribute(Di);
            }
          }
        }
      }),
      (D7 = {
        set: function (Dc, Dy, Di) {
          return false === Dy ? Ww.removeAttr(Dc, Di) : Dc.setAttribute(Di, Di), Di;
        }
      }),
      Ww.each(Ww.expr.match.bool.source.match(/\w+/g), function (Dc, Dy) {
        var Di = D8[Dy] || Ww.find.attr;
        D8[Dy] = function (DU, DL, Dd) {
          var Dv,
            DO,
            Dz = DL.toLowerCase();
          return Dd || ((DO = D8[Dz]), (D8[Dz] = Dv), (Dv = null != Di(DU, DL, Dd) ? Dz : null), (D8[Dz] = DO)), Dv;
        };
      }),
      /^(?:input|select|textarea|button)$/i);

  function Df(Dc) {
    return (Dc.match(/[^\x20\t\r\n\f]+/g) || []).join(" ");
  }

  function DD(Dc) {
    return (Dc.getAttribute && Dc.getAttribute("class")) || "";
  }

  function Du(Dc) {
    return Array.isArray(Dc) ? Dc : ("string" == typeof Dc && Dc.match(/[^\x20\t\r\n\f]+/g)) || [];
  }

  Ww.fn.extend({
    prop: function (Dc, Dy) {
      return WU(this, Ww.prop, Dc, Dy, 1 < arguments.length);
    },
    removeProp: function (Dc) {
      return this.each(function () {
        delete this[Ww.propFix[Dc] || Dc];
      });
    }
  });
  Ww.extend({
    prop: function (Dc, Dy, Di) {
      var DU,
        DL,
        Dd = Dc.nodeType;
      if (3 !== Dd && 8 !== Dd && 2 !== Dd) {
        return (
          (1 === Dd && Ww.isXMLDoc(Dc)) || ((Dy = Ww.propFix[Dy] || Dy), (DL = Ww.propHooks[Dy])),
          void 0 !== Di
            ? DL && "set" in DL && void 0 !== (DU = DL.set(Dc, Di, Dy))
              ? DU
              : (Dc[Dy] = Di)
            : DL && "get" in DL && null !== (DU = DL.get(Dc, Dy))
            ? DU
            : Dc[Dy]
        );
      }
    },
    propHooks: {
      tabIndex: {
        get: function (Dc) {
          var Dy = Ww.find.attr(Dc, "tabindex");
          return Dy ? parseInt(Dy, 10) : D9.test(Dc.nodeName) || (/^(?:a|area)$/i.test(Dc.nodeName) && Dc.href) ? 0 : -1;
        }
      }
    },
    propFix: {
      for: "htmlFor",
      class: "className"
    }
  });
  WP.optSelected ||
    (Ww.propHooks.selected = {
      get: function (Dc) {
        return (Dc = Dc.parentNode), (Dc && Dc.parentNode && Dc.parentNode.selectedIndex, null);
      },
      set: function (Dc) {
        Dc = Dc.parentNode;
        Dc && (Dc.selectedIndex, Dc.parentNode) && Dc.parentNode.selectedIndex;
      }
    });
  Ww.each(
    ["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"],
    function () {
      Ww.propFix[this.toLowerCase()] = this;
    }
  );
  Ww.fn.extend({
    addClass: function (Dc) {
      var Dy,
        Di,
        DU,
        DL,
        Dd,
        Dv,
        DO = 0;
      if (W7(Dc)) {
        return this.each(function (Dz) {
          Ww(this).addClass(Dc.call(this, Dz, DD(this)));
        });
      }
      if ((Dy = Du(Dc)).length) {
        for (; (Di = this[DO++]); ) {
          if (((Dv = DD(Di)), (DU = 1 === Di.nodeType && " " + Df(Dv) + " "))) {
            for (Dd = 0; (DL = Dy[Dd++]); ) {
              DU.indexOf(" " + DL + " ") < 0 && (DU += DL + " ");
            }
            Dv !== (Dv = Df(DU)) && Di.setAttribute("class", Dv);
          }
        }
      }
      return this;
    },
    removeClass: function (Dc) {
      var Dy,
        Di,
        DU,
        DL,
        Dd,
        Dv,
        DO = 0;
      if (W7(Dc)) {
        return this.each(function (Dz) {
          Ww(this).removeClass(Dc.call(this, Dz, DD(this)));
        });
      }
      if (!arguments.length) {
        return this.attr("class", "");
      }
      if ((Dy = Du(Dc)).length) {
        for (; (Di = this[DO++]); ) {
          if (((Dv = DD(Di)), (DU = 1 === Di.nodeType && " " + Df(Dv) + " "))) {
            for (Dd = 0; (DL = Dy[Dd++]); ) {
              for (; -1 < DU.indexOf(" " + DL + " "); ) {
                DU = DU.replace(" " + DL + " ", " ");
              }
            }
            Dv !== (Dv = Df(DU)) && Di.setAttribute("class", Dv);
          }
        }
      }
      return this;
    },
    toggleClass: function (Dc, Dy) {
      var Di = typeof Dc,
        DU = "string" == Di || Array.isArray(Dc);
      return "boolean" == typeof Dy && DU
        ? Dy
          ? this.addClass(Dc)
          : this.removeClass(Dc)
        : W7(Dc)
        ? this.each(function (DL) {
            Ww(this).toggleClass(Dc.call(this, DL, DD(this), Dy), Dy);
          })
        : this.each(function () {
            var DL, Dd, Dv, DO;
            if (DU) {
              for (Dd = 0, Dv = Ww(this), DO = Du(Dc); (DL = DO[Dd++]); ) {
                Dv.hasClass(DL) ? Dv.removeClass(DL) : Dv.addClass(DL);
              }
            } else {
              (void 0 !== Dc && "boolean" != Di) ||
                ((DL = DD(this)) && WZ.set(this, "__className__", DL),
                this.setAttribute && this.setAttribute("class", (!DL && false !== Dc && WZ.get(this, "__className__")) || ""));
            }
          });
    },
    hasClass: function (Dc) {
      for (var Dy, Di = 0, DU = " " + Dc + " "; (Dy = this[Di++]); ) {
        if (1 === Dy.nodeType && -1 < (" " + Df(DD(Dy)) + " ").indexOf(DU)) {
          return true;
        }
      }
      return false;
    }
  });

  function Dl(Dc) {
    Dc.stopPropagation();
  }

  var Do =
      (Ww.fn.extend({
        val: function (Dc) {
          var Dy,
            Di,
            DU,
            DL = this[0];
          return arguments.length
            ? ((DU = W7(Dc)),
              this.each(function (Dd) {
                1 === this.nodeType &&
                  (null == (Dd = DU ? Dc.call(this, Dd, Ww(this).val()) : Dc)
                    ? (Dd = "")
                    : "number" == typeof Dd
                    ? (Dd += "")
                    : Array.isArray(Dd) &&
                      (Dd = Ww.map(Dd, function (Dv) {
                        return null == Dv ? "" : Dv + "";
                      })),
                  ((Dy = Ww.valHooks[this.type] || Ww.valHooks[this.nodeName.toLowerCase()]) &&
                    "set" in Dy &&
                    void 0 !== Dy.set(this, Dd, "value")) ||
                    (this.value = Dd));
              }))
            : DL
            ? (Dy = Ww.valHooks[DL.type] || Ww.valHooks[DL.nodeName.toLowerCase()]) && "get" in Dy && void 0 !== (Di = Dy.get(DL, "value"))
              ? Di
              : "string" == typeof (Di = DL.value)
              ? Di.replace(/\r/g, "")
              : null == Di
              ? ""
              : Di
            : void 0;
        }
      }),
      Ww.extend({
        valHooks: {
          option: {
            get: function (Dc) {
              var Dy = Ww.find.attr(Dc, "value");
              return null != Dy ? Dy : Df(Ww.text(Dc));
            }
          },
          select: {
            get: function (Dc) {
              for (
                var Dy,
                  Di = Dc.options,
                  DU = Dc.selectedIndex,
                  DL = "select-one" === Dc.type,
                  Dd = DL ? null : [],
                  Dv = DL ? DU + 1 : Di.length,
                  DO = DU < 0 ? Dv : DL ? DU : 0;
                DO < Dv;
                DO++
              ) {
                if (((Dy = Di[DO]).selected || DO === DU) && !Dy.disabled && (!Dy.parentNode.disabled || !Wb(Dy.parentNode, "optgroup"))) {
                  if (((Dy = Ww(Dy).val()), DL)) {
                    return Dy;
                  }
                  Dd.push(Dy);
                }
              }
              return Dd;
            },
            set: function (Dc, Dy) {
              for (var Di, DU, DL = Dc.options, Dd = Ww.makeArray(Dy), Dv = DL.length; Dv--; ) {
                ((DU = DL[Dv]).selected = -1 < Ww.inArray(Ww.valHooks.option.get(DU), Dd)) && (Di = true);
              }
              return Di || (Dc.selectedIndex = -1), Dd;
            }
          }
        }
      }),
      Ww.each(["radio", "checkbox"], function () {
        Ww.valHooks[this] = {
          set: function (Dc, Dy) {
            if (Array.isArray(Dy)) {
              return (Dc.checked = -1 < Ww.inArray(Ww(Dc).val(), Dy));
            }
          }
        };
        WP.checkOn ||
          (Ww.valHooks[this].get = function (Dc) {
            return null === Dc.getAttribute("value") ? "on" : Dc.value;
          });
      }),
      (WP.focusin = "onfocusin" in W5),
      /^(?:focusinfocus|focusoutblur)$/),
    DT =
      (Ww.extend(Ww.event, {
        trigger: function (Dc, Dy, Di, DU) {
          var DL,
            Dd,
            Dv,
            DO,
            Dz,
            DB,
            DZ,
            Dj = [Di || WW],
            DJ = WC.call(Dc, "type") ? Dc.type : Dc,
            DR = WC.call(Dc, "namespace") ? Dc.namespace.split(".") : [],
            Dp = (DZ = Dd = Di = Di || WW);
          if (
            3 !== Di.nodeType &&
            8 !== Di.nodeType &&
            !Do.test(DJ + Ww.event.triggered) &&
            (-1 < DJ.indexOf(".") && ((DJ = (DR = DJ.split(".")).shift()), DR.sort()),
            (DO = DJ.indexOf(":") < 0 && "on" + DJ),
            ((Dc = Dc[Ww.expando] ? Dc : new Ww.Event(DJ, "object" == typeof Dc && Dc)).isTrigger = DU ? 2 : 3),
            (Dc.namespace = DR.join(".")),
            (Dc.rnamespace = Dc.namespace ? new RegExp("(^|\\.)" + DR.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
            (Dc.result = void 0),
            Dc.target || (Dc.target = Di),
            (Dy = null == Dy ? [Dc] : Ww.makeArray(Dy, [Dc])),
            (DB = Ww.event.special[DJ] || {}),
            DU || !DB.trigger || false !== DB.trigger.apply(Di, Dy))
          ) {
            if (!DU && !DB.noBubble && !W8(Di)) {
              for (Dv = DB.delegateType || DJ, Do.test(Dv + DJ) || (Dp = Dp.parentNode); Dp; Dp = Dp.parentNode) {
                Dj.push(Dp);
                Dd = Dp;
              }
              Dd === (Di.ownerDocument || WW) && Dj.push(Dd.defaultView || Dd.parentWindow || W5);
            }
            for (DL = 0; (Dp = Dj[DL++]) && !Dc.isPropagationStopped(); ) {
              DZ = Dp;
              Dc.type = 1 < DL ? Dv : DB.bindType || DJ;
              (Dz = (WZ.get(Dp, "events") || {})[Dc.type] && WZ.get(Dp, "handle")) && Dz.apply(Dp, Dy);
              (Dz = DO && Dp[DO]) && Dz.apply && Wz(Dp) && ((Dc.result = Dz.apply(Dp, Dy)), false === Dc.result) && Dc.preventDefault();
            }
            return (
              (Dc.type = DJ),
              DU ||
                Dc.isDefaultPrevented() ||
                (DB["_default"] && false !== DB["_default"].apply(Dj.pop(), Dy)) ||
                !Wz(Di) ||
                (DO &&
                  W7(Di[DJ]) &&
                  !W8(Di) &&
                  ((Dd = Di[DO]) && (Di[DO] = null),
                  (Ww.event.triggered = DJ),
                  Dc.isPropagationStopped() && DZ.addEventListener(DJ, Dl),
                  Di[DJ](),
                  Dc.isPropagationStopped() && DZ.removeEventListener(DJ, Dl),
                  (Ww.event.triggered = void 0),
                  Dd) &&
                  (Di[DO] = Dd)),
              Dc.result
            );
          }
        },
        simulate: function (Dc, Dy, Di) {
          Di = Ww.extend(new Ww.Event(), Di, {
            type: Dc,
            isSimulated: true
          });
          Ww.event.trigger(Di, null, Dy);
        }
      }),
      Ww.fn.extend({
        trigger: function (Dc, Dy) {
          return this.each(function () {
            Ww.event.trigger(Dc, Dy, this);
          });
        },
        triggerHandler: function (Dc, Dy) {
          var Di = this[0];
          if (Di) {
            return Ww.event.trigger(Dc, Dy, Di, true);
          }
        }
      }),
      WP.focusin ||
        Ww.each(
          {
            focus: "focusin",
            blur: "focusout"
          },
          function (Dc, Dy) {
            function Di(DU) {
              Ww.event.simulate(Dy, DU.target, Ww.event.fix(DU));
            }

            Ww.event.special[Dy] = {
              setup: function () {
                var DU = this.ownerDocument || this,
                  DL = WZ.access(DU, Dy);
                DL || DU.addEventListener(Dc, Di, true);
                WZ.access(DU, Dy, (DL || 0) + 1);
              },
              teardown: function () {
                var DU = this.ownerDocument || this,
                  DL = WZ.access(DU, Dy) - 1;
                DL ? WZ.access(DU, Dy, DL) : (DU.removeEventListener(Dc, Di, true), WZ.remove(DU, Dy));
              }
            };
          }
        ),
      W5.location),
    DC = Date.now(),
    DE =
      ((Ww.parseXML = function (Dc) {
        var Dy;
        if (!Dc || "string" != typeof Dc) {
          return null;
        }
        try {
          Dy = new W5.DOMParser().parseFromString(Dc, "text/xml");
        } catch (Di) {
          Dy = void 0;
        }
        return (Dy && !Dy.getElementsByTagName("parsererror").length) || Ww.error("Invalid XML: " + Dc), Dy;
      }),
      /\[\]$/);
  Ww.param = function (Dc, Dy) {
    function Di(Dd, Dv) {
      Dv = W7(Dv) ? Dv() : Dv;
      DL[DL.length] = encodeURIComponent(Dd) + "=" + encodeURIComponent(null == Dv ? "" : Dv);
    }

    var DU,
      DL = [];
    if (Array.isArray(Dc) || (Dc.jquery && !Ww.isPlainObject(Dc))) {
      Ww.each(Dc, function () {
        Di(this.name, this.value);
      });
    } else {
      for (DU in Dc)
        !(function Dd(Dv, DO, Dz, DB) {
          if (Array.isArray(DO)) {
            Ww.each(DO, function (Dj, DJ) {
              Dz || DE.test(Dv) ? DB(Dv, DJ) : Dd(Dv + "[" + ("object" == typeof DJ && null != DJ ? Dj : "") + "]", DJ, Dz, DB);
            });
          } else {
            if (Dz || "object" !== WG(DO)) {
              DB(Dv, DO);
            } else {
              for (var DZ in DO) Dd(Dv + "[" + DZ + "]", DO[DZ], Dz, DB);
            }
          }
        })(DU, Dc[DU], Dy, Di);
    }
    return DL.join("&");
  };
  Ww.fn.extend({
    serialize: function () {
      return Ww.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        var Dc = Ww.prop(this, "elements");
        return Dc ? Ww.makeArray(Dc) : this;
      })
        .filter(function () {
          var Dc = this.type;
          return (
            this.name &&
            !Ww(this).is(":disabled") &&
            /^(?:input|select|textarea|keygen)/i.test(this.nodeName) &&
            !/^(?:submit|button|image|reset|file)$/i.test(Dc) &&
            (this.checked || !/^(?:checkbox|radio)$/i.test(Dc))
          );
        })
        .map(function (Dc, Dy) {
          var Di = Ww(this).val();
          return null == Di
            ? null
            : Array.isArray(Di)
            ? Ww.map(Di, function (DU) {
                return {
                  name: Dy.name,
                  value: DU.replace(/\r?\n/g, "\r\n")
                };
              })
            : {
                name: Dy.name,
                value: Di.replace(/\r?\n/g, "\r\n")
              };
        })
        .get();
    }
  });
  var Dr = {},
    Db = {},
    DX = "*/".concat("*"),
    DA = WW.createElement("a");

  function Dn(Dc) {
    return function (Dy, Di) {
      "string" != typeof Dy && ((Di = Dy), (Dy = "*"));
      var DU,
        DL = 0,
        Dd = Dy.toLowerCase().match(/[^\x20\t\r\n\f]+/g) || [];
      if (W7(Di)) {
        for (; (DU = Dd[DL++]); ) {
          "+" === DU[0] ? ((DU = DU.slice(1) || "*"), (Dc[DU] = Dc[DU] || []).unshift(Di)) : (Dc[DU] = Dc[DU] || []).push(Di);
        }
      }
    };
  }

  function Ds(Dc, Dy, Di, DU) {
    var DL = {},
      Dd = Dc === Db;

    function Dv(DO) {
      var Dz;
      return (
        (DL[DO] = true),
        Ww.each(Dc[DO] || [], function (DB, DZ) {
          DZ = DZ(Dy, Di, DU);
          return "string" != typeof DZ || Dd || DL[DZ] ? (Dd ? !(Dz = DZ) : void 0) : (Dy.dataTypes.unshift(DZ), Dv(DZ), false);
        }),
        Dz
      );
    }

    return Dv(Dy.dataTypes[0]) || (!DL["*"] && Dv("*"));
  }

  function DY(Dc, Dy) {
    var Di,
      DU,
      DL = Ww.ajaxSettings.flatOptions || {};
    for (Di in Dy) void 0 !== Dy[Di] && ((DL[Di] ? Dc : (DU = DU || {}))[Di] = Dy[Di]);
    return DU && Ww.extend(true, Dc, DU), Dc;
  }

  DA.href = DT.href;
  Ww.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: DT.href,
      type: "GET",
      isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(DT.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": DX,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": true,
        "text json": JSON.parse,
        "text xml": Ww.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function (Dc, Dy) {
      return Dy ? DY(DY(Dc, Ww.ajaxSettings), Dy) : DY(Ww.ajaxSettings, Dc);
    },
    ajaxPrefilter: Dn(Dr),
    ajaxTransport: Dn(Db),
    ajax: function (Dc, Dy) {
      "object" == typeof Dc && ((Dy = Dc), (Dc = void 0));
      var Di,
        DU,
        DL,
        Dd,
        Dv,
        DO,
        Dz,
        DB,
        DZ = Ww.ajaxSetup({}, (Dy = Dy || {})),
        Dj = DZ.context || DZ,
        DJ = DZ.context && (Dj.nodeType || Dj.jquery) ? Ww(Dj) : Ww.event,
        DR = Ww.Deferred(),
        Dp = Ww.Callbacks("once memory"),
        Da = DZ.statusCode || {},
        DQ = {},
        e0 = { Dv: DO },
        e1 = "canceled",
        e2 = {
          readyState: 0,
          getResponseHeader: function (e4) {
            var e5;
            if (DO) {
              if (!Dd) {
                for (Dd = {}; (e5 = /^(.*?):[ \t]*([^\r\n]*)$/gm.exec(DL)); ) {
                  Dd[e5[1].toLowerCase()] = e5[2];
                }
              }
              e5 = Dd[e4.toLowerCase()];
            }
            return null == e5 ? null : e5;
          },
          getAllResponseHeaders: function () {
            return DO ? DL : null;
          },
          setRequestHeader: function (e4, e5) {
            return null == DO && ((e4 = e0[e4.toLowerCase()] = e0[e4.toLowerCase()] || e4), (DQ[e4] = e5)), this;
          },
          overrideMimeType: function (e4) {
            return null == DO && (DZ.mimeType = e4), this;
          },
          statusCode: function (e4) {
            if (e4) {
              if (DO) {
                e2.always(e4[e2.status]);
              } else {
                for (var e5 in e4) Da[e5] = [Da[e5], e4[e5]];
              }
            }
            return this;
          },
          abort: function (e4) {
            return (e4 = e4 || e1), (Di && Di.abort(e4), e3(0, e4), this);
          }
        };
      if (
        (DR.promise(e2),
        (DZ.url = ((Dc || DZ.url || DT.href) + "").replace(/^\/\//, DT.protocol + "//")),
        (DZ.type = Dy.method || Dy.type || DZ.method || DZ.type),
        (DZ.dataTypes = (DZ.dataType || "*").toLowerCase().match(/[^\x20\t\r\n\f]+/g) || [""]),
        null == DZ.crossDomain)
      ) {
        Dc = WW.createElement("a");
        try {
          Dc.href = DZ.url;
          Dc.href = Dc.href;
          DZ.crossDomain = DA.protocol + "//" + DA.host != Dc.protocol + "//" + Dc.host;
        } catch (e4) {
          DZ.crossDomain = true;
        }
      }
      if ((DZ.data && DZ.processData && "string" != typeof DZ.data && (DZ.data = Ww.param(DZ.data, DZ.traditional)), Ds(Dr, DZ, Dy, e2), !DO)) {
        for (DB in ((Dz = Ww.event && DZ.global) && 0 == Ww.active++ && Ww.event.trigger("ajaxStart"),
        (DZ.type = DZ.type.toUpperCase()),
        (DZ.hasContent = !/^(?:GET|HEAD)$/.test(DZ.type)),
        (DU = DZ.url.replace(/#.*$/, "")),
        DZ.hasContent
          ? DZ.data &&
            DZ.processData &&
            0 === (DZ.contentType || "").indexOf("application/x-www-form-urlencoded") &&
            (DZ.data = DZ.data.replace(/%20/g, "+"))
          : ((Dc = DZ.url.slice(DU.length)),
            DZ.data && (DZ.processData || "string" == typeof DZ.data) && ((DU += (/\?/.test(DU) ? "&" : "?") + DZ.data), delete DZ.data),
            false === DZ.cache && ((DU = DU.replace(/([?&])_=[^&]*/, "$1")), (Dc = (/\?/.test(DU) ? "&" : "?") + "_=" + DC++ + Dc)),
            (DZ.url = DU + Dc)),
        DZ.ifModified &&
          (Ww.lastModified[DU] && e2.setRequestHeader("If-Modified-Since", Ww.lastModified[DU]), Ww.etag[DU]) &&
          e2.setRequestHeader("If-None-Match", Ww.etag[DU]),
        ((DZ.data && DZ.hasContent && false !== DZ.contentType) || Dy.contentType) && e2.setRequestHeader("Content-Type", DZ.contentType),
        e2.setRequestHeader(
          "Accept",
          DZ.dataTypes[0] && DZ.accepts[DZ.dataTypes[0]]
            ? DZ.accepts[DZ.dataTypes[0]] + ("*" !== DZ.dataTypes[0] ? ", " + DX + "; q=0.01" : "")
            : DZ.accepts["*"]
        ),
        DZ.headers))
          e2.setRequestHeader(DB, DZ.headers[DB]);
        if (DZ.beforeSend && (false === DZ.beforeSend.call(Dj, e2, DZ) || DO)) {
          return e2.abort();
        }
        if (((e1 = "abort"), Dp.add(DZ.complete), e2.done(DZ.success), e2.fail(DZ.error), (Di = Ds(Db, DZ, Dy, e2)))) {
          if (((e2.readyState = 1), Dz && DJ.trigger("ajaxSend", [e2, DZ]), DO)) {
            return e2;
          }
          DZ.async &&
            0 < DZ.timeout &&
            (Dv = W5.setTimeout(function () {
              e2.abort("timeout");
            }, DZ.timeout));
          try {
            DO = false;
            Di.send(DQ, e3);
          } catch (e5) {
            if (DO) {
              throw e5;
            }
            e3(-1, e5);
          }
        } else {
          e3(-1, "No Transport");
        }
      }
      return e2;

      function e3(e6, e7, e8, e9) {
        var eW,
          ef,
          eD,
          eu = e7;
        DO ||
          ((DO = true),
          Dv && W5.clearTimeout(Dv),
          (Di = void 0),
          (DL = e9 || ""),
          (e2.readyState = 0 < e6 ? 4 : 0),
          (e9 = (200 <= e6 && e6 < 300) || 304 === e6),
          e8 &&
            (eD = (function (el, eg, eo) {
              for (var eT, eC, eq, eE, eP = el.contents, ek = el.dataTypes; "*" === ek[0]; ) {
                ek.shift();
                void 0 === eT && (eT = el.mimeType || eg.getResponseHeader("Content-Type"));
              }
              if (eT) {
                for (eC in eP)
                  if (eP[eC] && eP[eC].test(eT)) {
                    ek.unshift(eC);
                    break;
                  }
              }
              if (ek[0] in eo) {
                eq = ek[0];
              } else {
                for (eC in eo) {
                  if (!ek[0] || el.converters[eC + " " + ek[0]]) {
                    eq = eC;
                    break;
                  }
                  eE = eE || eC;
                }
                eq = eq || eE;
              }
              if (eq) {
                return eq !== ek[0] && ek.unshift(eq), eo[eq];
              }
            })(DZ, e2, e8)),
          (eD = (function (el, eg, eo, eT) {
            var eC,
              eq,
              eE,
              eP,
              ek,
              eM = {},
              eG = el.dataTypes.slice();
            if (eG[1]) {
              for (eE in el.converters) eM[eE.toLowerCase()] = el.converters[eE];
            }
            for (eq = eG.shift(); eq; ) {
              if (
                (el.responseFields[eq] && (eo[el.responseFields[eq]] = eg),
                !ek && eT && el.dataFilter && (eg = el.dataFilter(eg, el.dataType)),
                (ek = eq),
                (eq = eG.shift()))
              ) {
                if ("*" === eq) {
                  eq = ek;
                } else {
                  if ("*" !== ek && ek !== eq) {
                    if (!(eE = eM[ek + " " + eq] || eM["* " + eq])) {
                      for (eC in eM)
                        if ((eP = eC.split(" "))[1] === eq && (eE = eM[ek + " " + eP[0]] || eM["* " + eP[0]])) {
                          true === eE ? (eE = eM[eC]) : true !== eM[eC] && ((eq = eP[0]), eG.unshift(eP[1]));
                          break;
                        }
                    }
                    if (true !== eE) {
                      if (eE && el.throws) {
                        eg = eE(eg);
                      } else {
                        try {
                          eg = eE(eg);
                        } catch (ew) {
                          return {
                            state: "parsererror",
                            error: eE ? ew : "No conversion from " + ek + " to " + eq
                          };
                        }
                      }
                    }
                  }
                }
              }
            }
            return {
              state: "success",
              data: eg
            };
          })(DZ, eD, e2, e9)),
          e9
            ? (DZ.ifModified &&
                ((e8 = e2.getResponseHeader("Last-Modified")) && (Ww.lastModified[DU] = e8), (e8 = e2.getResponseHeader("etag"))) &&
                (Ww.etag[DU] = e8),
              204 === e6 || "HEAD" === DZ.type
                ? (eu = "nocontent")
                : 304 === e6
                ? (eu = "notmodified")
                : ((eu = eD.state), (eW = eD.data), (e9 = !(ef = eD.error))))
            : ((ef = eu), (!e6 && eu) || ((eu = "error"), e6 < 0 && (e6 = 0))),
          (e2.status = e6),
          (e2.statusText = (e7 || eu) + ""),
          e9 ? DR.resolveWith(Dj, [eW, eu, e2]) : DR.rejectWith(Dj, [e2, eu, ef]),
          e2.statusCode(Da),
          (Da = void 0),
          Dz && DJ.trigger(e9 ? "ajaxSuccess" : "ajaxError", [e2, DZ, e9 ? eW : ef]),
          Dp.fireWith(Dj, [e2, eu]),
          Dz && (DJ.trigger("ajaxComplete", [e2, DZ]), --Ww.active || Ww.event.trigger("ajaxStop")));
      }
    },
    getJSON: function (Dc, Dy, Di) {
      return Ww.get(Dc, Dy, Di, "json");
    },
    getScript: function (Dc, Dy) {
      return Ww.get(Dc, void 0, Dy, "script");
    }
  });
  Ww.each(["get", "post"], function (Dc, Dy) {
    Ww[Dy] = function (Di, DU, DL, Dd) {
      return (
        W7(DU) && ((Dd = Dd || DL), (DL = DU), (DU = void 0)),
        Ww.ajax(
          Ww.extend(
            {
              url: Di,
              type: Dy,
              dataType: Dd,
              data: DU,
              success: DL
            },
            Ww.isPlainObject(Di) && Di
          )
        )
      );
    };
  });
  Ww["_evalUrl"] = function (Dc) {
    return Ww.ajax({
      url: Dc,
      type: "GET",
      dataType: "script",
      cache: true,
      async: false,
      global: false,
      throws: true
    });
  };
  Ww.fn.extend({
    wrapAll: function (Dc) {
      return (
        this[0] &&
          (W7(Dc) && (Dc = Dc.call(this[0])),
          (Dc = Ww(Dc, this[0].ownerDocument).eq(0).clone(true)),
          this[0].parentNode && Dc.insertBefore(this[0]),
          Dc.map(function () {
            for (var Dy = this; Dy.firstElementChild; ) {
              Dy = Dy.firstElementChild;
            }
            return Dy;
          }).append(this)),
        this
      );
    },
    wrapInner: function (Dc) {
      return W7(Dc)
        ? this.each(function (Dy) {
            Ww(this).wrapInner(Dc.call(this, Dy));
          })
        : this.each(function () {
            var Dy = Ww(this),
              Di = Dy.contents();
            Di.length ? Di.wrapAll(Dc) : Dy.append(Dc);
          });
    },
    wrap: function (Dc) {
      var Dy = W7(Dc);
      return this.each(function (Di) {
        Ww(this).wrapAll(Dy ? Dc.call(this, Di) : Dc);
      });
    },
    unwrap: function (Dc) {
      return (
        this.parent(Dc)
          .not("body")
          .each(function () {
            Ww(this).replaceWith(this.childNodes);
          }),
        this
      );
    }
  });
  Ww.expr.pseudos.hidden = function (Dc) {
    return !Ww.expr.pseudos.visible(Dc);
  };
  Ww.expr.pseudos.visible = function (Dc) {
    return !!(Dc.offsetWidth || Dc.offsetHeight || Dc.getClientRects().length);
  };
  Ww.ajaxSettings.xhr = function () {
    try {
      return new W5.XMLHttpRequest();
    } catch (Dc) {}
  };
  var DK = Ww.ajaxSettings.xhr(),
    Dm =
      ((WP.cors = !!DK && "withCredentials" in DK),
      (WP.ajax = DK = !!DK),
      Ww.ajaxTransport(function (Dc) {
        var Dy, Di;
        if (WP.cors || (DK && !Dc.crossDomain)) {
          return {
            send: function (DU, DL) {
              var Dd,
                Dv = Dc.xhr();
              if ((Dv.open(Dc.type, Dc.url, Dc.async, Dc.username, Dc.password), Dc.xhrFields)) {
                for (Dd in Dc.xhrFields) Dv[Dd] = Dc.xhrFields[Dd];
              }
              for (Dd in (Dc.mimeType && Dv.overrideMimeType && Dv.overrideMimeType(Dc.mimeType),
              Dc.crossDomain || DU["X-Requested-With"] || (DU["X-Requested-With"] = "XMLHttpRequest"),
              DU))
                Dv.setRequestHeader(Dd, DU[Dd]);
              Dy = function (DO) {
                return function () {
                  Dy &&
                    ((Dy = Di = Dv.onload = Dv.onerror = Dv.onabort = Dv.ontimeout = Dv.onreadystatechange = null),
                    "abort" === DO
                      ? Dv.abort()
                      : "error" === DO
                      ? "number" != typeof Dv.status
                        ? DL(0, "error")
                        : DL(Dv.status, Dv.statusText)
                      : DL(
                          Dh[Dv.status] || Dv.status,
                          Dv.statusText,
                          "text" !== (Dv.responseType || "text") || "string" != typeof Dv.responseText
                            ? { binary: Dv.response }
                            : { text: Dv.responseText },
                          Dv.getAllResponseHeaders()
                        ));
                };
              };
              Dv.onload = Dy();
              Di = Dv.onerror = Dv.ontimeout = Dy("error");
              void 0 !== Dv.onabort
                ? (Dv.onabort = Di)
                : (Dv.onreadystatechange = function () {
                    4 === Dv.readyState &&
                      W5.setTimeout(function () {
                        Dy && Di();
                      });
                  });
              Dy = Dy("abort");
              try {
                Dv.send((Dc.hasContent && Dc.data) || null);
              } catch (DO) {
                if (Dy) {
                  throw DO;
                }
              }
            },
            abort: function () {
              Dy && Dy();
            }
          };
        }
      }),
      Ww.ajaxPrefilter(function (Dc) {
        Dc.crossDomain && (Dc.contents.script = false);
      }),
      Ww.ajaxSetup({
        accepts: {
          script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: { script: /\b(?:java|ecma)script\b/ },
        converters: {
          "text script": function (Dc) {
            return Ww.globalEval(Dc), Dc;
          }
        }
      }),
      Ww.ajaxPrefilter("script", function (Dc) {
        void 0 === Dc.cache && (Dc.cache = false);
        Dc.crossDomain && (Dc.type = "GET");
      }),
      Ww.ajaxTransport("script", function (Dc) {
        var Dy, Di;
        if (Dc.crossDomain) {
          return {
            send: function (DU, DL) {
              Dy = Ww("<script>")
                .prop({
                  charset: Dc.scriptCharset,
                  src: Dc.url
                })
                .on(
                  "load error",
                  (Di = function (Dd) {
                    Dy.remove();
                    Di = null;
                    Dd && DL("error" === Dd.type ? 404 : 200, Dd.type);
                  })
                );
              WW.head.appendChild(Dy[0]);
            },
            abort: function () {
              Di && Di();
            }
          };
        }
      }),
      []),
    Dx =
      (Ww.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
          var Dc = Dm.pop() || Ww.expando + "_" + DC++;
          return (this[Dc] = true), Dc;
        }
      }),
      Ww.ajaxPrefilter("json jsonp", function (Dc, Dy, Di) {
        var DU,
          DL,
          Dd,
          Dv =
            false !== Dc.jsonp &&
            (/(=)\?(?=&|$)|\?\?/.test(Dc.url)
              ? "url"
              : "string" == typeof Dc.data &&
                0 === (Dc.contentType || "").indexOf("application/x-www-form-urlencoded") &&
                /(=)\?(?=&|$)|\?\?/.test(Dc.data) &&
                "data");
        if (Dv || "jsonp" === Dc.dataTypes[0]) {
          return (
            (DU = Dc.jsonpCallback = W7(Dc.jsonpCallback) ? Dc.jsonpCallback() : Dc.jsonpCallback),
            Dv
              ? (Dc[Dv] = Dc[Dv].replace(/(=)\?(?=&|$)|\?\?/, "$1" + DU))
              : false !== Dc.jsonp && (Dc.url += (/\?/.test(Dc.url) ? "&" : "?") + Dc.jsonp + "=" + DU),
            (Dc.converters["script json"] = function () {
              return Dd || Ww.error(DU + " was not called"), Dd[0];
            }),
            (Dc.dataTypes[0] = "json"),
            (DL = W5[DU]),
            (W5[DU] = function () {
              Dd = arguments;
            }),
            Di.always(function () {
              void 0 === DL ? Ww(W5).removeProp(DU) : (W5[DU] = DL);
              Dc[DU] && ((Dc.jsonpCallback = Dy.jsonpCallback), Dm.push(DU));
              Dd && W7(DL) && DL(Dd[0]);
              Dd = DL = void 0;
            }),
            "script"
          );
        }
      }),
      (WP.createHTMLDocument =
        (((W9 = WW.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>"), 2 === W9.childNodes.length)),
      (Ww.parseHTML = function (Dc, Dy, Di) {
        var DU;
        return "string" != typeof Dc
          ? []
          : ("boolean" == typeof Dy && ((Di = Dy), (Dy = false)),
            Dy ||
              (WP.createHTMLDocument
                ? (((DU = (Dy = WW.implementation.createHTMLDocument("")).createElement("base")).href = WW.location.href), Dy.head.appendChild(DU))
                : (Dy = WW)),
            (DU = !Di && []),
            (Di = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i.exec(Dc))
              ? [Dy.createElement(Di[1])]
              : ((Di = fD([Dc], Dy, DU)), DU && DU.length && Ww(DU).remove(), Ww.merge([], Di.childNodes)));
      }),
      (Ww.fn.load = function (Dc, Dy, Di) {
        var DU,
          DL,
          Dd,
          Dv = this,
          DO = Dc.indexOf(" ");
        return (
          -1 < DO && ((DU = Df(Dc.slice(DO))), (Dc = Dc.slice(0, DO))),
          W7(Dy) ? ((Di = Dy), (Dy = void 0)) : Dy && "object" == typeof Dy && (DL = "POST"),
          0 < Dv.length &&
            Ww.ajax({
              url: Dc,
              type: DL || "GET",
              dataType: "html",
              data: Dy
            })
              .done(function (Dz) {
                Dd = arguments;
                Dv.html(DU ? Ww("<div>").append(Ww.parseHTML(Dz)).find(DU) : Dz);
              })
              .always(
                Di &&
                  function (Dz, DB) {
                    Dv.each(function () {
                      Di.apply(this, Dd || [Dz.responseText, DB, Dz]);
                    });
                  }
              ),
          this
        );
      }),
      Ww.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (Dc, Dy) {
        Ww.fn[Dy] = function (Di) {
          return this.on(Dy, Di);
        };
      }),
      (Ww.expr.pseudos.animated = function (Dc) {
        return Ww.grep(Ww.timers, function (Dy) {
          return Dc === Dy.elem;
        }).length;
      }),
      (Ww.offset = {
        setOffset: function (Dc, Dy, Di) {
          var DU,
            DL,
            Dd,
            Dv,
            DO = Ww.css(Dc, "position"),
            Dz = Ww(Dc),
            DB = {};
          "static" === DO && (Dc.style.position = "relative");
          Dd = Dz.offset();
          DU = Ww.css(Dc, "top");
          Dv = Ww.css(Dc, "left");
          DO =
            ("absolute" === DO || "fixed" === DO) && -1 < (DU + Dv).indexOf("auto")
              ? ((DL = (DO = Dz.position()).top), DO.left)
              : ((DL = parseFloat(DU) || 0), parseFloat(Dv) || 0);
          null != (Dy = W7(Dy) ? Dy.call(Dc, Di, Ww.extend({}, Dd)) : Dy).top && (DB.top = Dy.top - Dd.top + DL);
          null != Dy.left && (DB.left = Dy.left - Dd.left + DO);
          "using" in Dy ? Dy.using.call(Dc, DB) : Dz.css(DB);
        }
      }),
      Ww.fn.extend({
        offset: function (Dc) {
          var Dy, Di;
          return arguments.length
            ? void 0 === Dc
              ? this
              : this.each(function (DU) {
                  Ww.offset.setOffset(this, Dc, DU);
                })
            : (Di = this[0])
            ? Di.getClientRects().length
              ? ((Dy = Di.getBoundingClientRect()),
                (Di = Di.ownerDocument.defaultView),
                {
                  top: Dy.top + Di.pageYOffset,
                  left: Dy.left + Di.pageXOffset
                })
              : {
                  top: 0,
                  left: 0
                }
            : void 0;
        },
        position: function () {
          if (this[0]) {
            var Dc,
              Dy,
              Di,
              DU = this[0];
            if ("fixed" === Ww.css(DU, "position")) {
              Dy = DU.getBoundingClientRect();
            } else {
              for (
                Dy = this.offset(), Di = DU.ownerDocument, Dc = DU.offsetParent || Di.documentElement;
                Dc && (Dc === Di.body || Dc === Di.documentElement) && "static" === Ww.css(Dc, "position");

              ) {
                Dc = Dc.parentNode;
              }
              Dc &&
                Dc !== DU &&
                1 === Dc.nodeType &&
                (((DL = Ww(Dc).offset()).top += Ww.css(Dc, "borderTopWidth", true)), (DL.left += Ww.css(Dc, "borderLeftWidth", true)));
            }
            return {
              top: Dy.top - 0 - Ww.css(DU, "marginTop", true),
              left: Dy.left - 0 - Ww.css(DU, "marginLeft", true)
            };
          }
        },
        offsetParent: function () {
          return this.map(function () {
            for (var Dc = this.offsetParent; Dc && "static" === Ww.css(Dc, "position"); ) {
              Dc = Dc.offsetParent;
            }
            return Dc || fu;
          });
        }
      }),
      Ww.each(
        {
          scrollLeft: "pageXOffset",
          scrollTop: "pageYOffset"
        },
        function (Dc, Dy) {
          var Di = "pageYOffset" === Dy;
          Ww.fn[Dc] = function (DU) {
            return WU(
              this,
              function (DL, Dd, Dv) {
                var DO;
                if ((W8(DL) ? (DO = DL) : 9 === DL.nodeType && (DO = DL.defaultView), void 0 === Dv)) {
                  return DO ? DO[Dy] : DL[Dd];
                }
                DO ? DO.scrollTo(Di ? DO.pageXOffset : Dv, Di ? Dv : DO.pageYOffset) : (DL[Dd] = Dv);
              },
              Dc,
              DU,
              arguments.length
            );
          };
        }
      ),
      Ww.each(["top", "left"], function (Dc, Dy) {
        Ww.cssHooks[Dy] = fy(WP.pixelPosition, function (Di, DU) {
          if (DU) {
            return (DU = fc(Di, Dy)), fm.test(DU) ? Ww(Di).position()[Dy] + "px" : DU;
          }
        });
      }),
      Ww.each(
        {
          Height: "height",
          Width: "width"
        },
        function (Dc, Dy) {
          Ww.each(
            {
              padding: "inner" + Dc,
              content: Dy,
              "": "outer" + Dc
            },
            function (Di, DU) {
              Ww.fn[DU] = function (DL, Dd) {
                var Dv = arguments.length && (Di || "boolean" != typeof DL),
                  DO = Di || (true === DL || true === Dd ? "margin" : "border");
                return WU(
                  this,
                  function (Dz, DB, DZ) {
                    var Dj;
                    return W8(Dz)
                      ? 0 === DU.indexOf("outer")
                        ? Dz["inner" + Dc]
                        : Dz.document.documentElement["client" + Dc]
                      : 9 === Dz.nodeType
                      ? ((Dj = Dz.documentElement),
                        Math.max(Dz.body["scroll" + Dc], Dj["scroll" + Dc], Dz.body["offset" + Dc], Dj["offset" + Dc], Dj["client" + Dc]))
                      : void 0 === DZ
                      ? Ww.css(Dz, DB, DO)
                      : Ww.style(Dz, DB, DZ, DO);
                  },
                  Dy,
                  Dv ? DL : void 0,
                  Dv
                );
              };
            }
          );
        }
      ),
      Ww.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
          " "
        ),
        function (Dc, Dy) {
          Ww.fn[Dy] = function (Di, DU) {
            return 0 < arguments.length ? this.on(Dy, null, Di, DU) : this.trigger(Dy);
          };
        }
      ),
      Ww.fn.extend({
        hover: function (Dc, Dy) {
          return this.mouseenter(Dc).mouseleave(Dy || Dc);
        }
      }),
      Ww.fn.extend({
        bind: function (Dc, Dy, Di) {
          return this.on(Dc, null, Dy, Di);
        },
        unbind: function (Dc, Dy) {
          return this.off(Dc, null, Dy);
        },
        delegate: function (Dc, Dy, Di, DU) {
          return this.on(Dy, Dc, Di, DU);
        },
        undelegate: function (Dc, Dy, Di) {
          return 1 === arguments.length ? this.off(Dc, "**") : this.off(Dy, Dc || "**", Di);
        }
      }),
      (Ww.proxy = function (Dc, Dy) {
        var Di, DU;
        if (("string" == typeof Dy && ((DU = Dc[Dy]), (Dy = Dc), (Dc = DU)), W7(Dc))) {
          return (
            (Di = WD.call(arguments, 2)),
            ((DU = function () {
              return Dc.apply(Dy || this, Di.concat(WD.call(arguments)));
            }).guid = Dc.guid =
              Dc.guid || Ww.guid++),
            DU
          );
        }
      }),
      (Ww.holdReady = function (Dc) {
        Dc ? Ww.readyWait++ : Ww.ready(true);
      }),
      (Ww.isArray = Array.isArray),
      (Ww.parseJSON = JSON.parse),
      (Ww.nodeName = Wb),
      (Ww.isFunction = W7),
      (Ww.isWindow = W8),
      (Ww.camelCase = WO),
      (Ww.type = WG),
      (Ww.now = Date.now),
      (Ww.isNumeric = function (Dc) {
        var Dy = Ww.type(Dc);
        return ("number" === Dy || "string" === Dy) && !isNaN(Dc - parseFloat(Dc));
      }),
      "function" == typeof define &&
        define.amd &&
        define("jquery", [], function () {
          return Ww;
        }),
      W5.jQuery),
    DI = W5["$"];
  return (
    (Ww.noConflict = function (Dc) {
      return W5["$"] === Ww && (W5["$"] = DI), Dc && W5.jQuery === Ww && (W5.jQuery = Dx), Ww;
    }),
    W6 || (W5.jQuery = W5["$"] = Ww),
    Ww
  );
});
(() => {
  var W5,
    W6,
    W7,
    W8,
    W9 = {
      696: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => Wg });
        const Wg = {
          advertising: {
            admessage: "This ad will end in xx",
            cuetext: "Advertisement",
            displayHeading: "Advertisement",
            loadingAd: "Loading ad",
            podmessage: "Ad __AD_POD_CURRENT__ of __AD_POD_LENGTH__.",
            skipmessage: "Skip ad in xx",
            skiptext: "Skip"
          },
          airplay: "AirPlay",
          audioTracks: "Audio Tracks",
          auto: "Auto",
          buffer: "Loading",
          cast: "Chromecast",
          cc: "Closed Captions",
          close: "Close",
          errors: {
            badConnection: "This video cannot be played because of a problem with your internet connection.",
            cantLoadPlayer: "Sorry, the video player failed to load.",
            cantPlayInBrowser: "The video cannot be played in this browser.",
            cantPlayVideo: "This video file cannot be played.",
            errorCode: "Error Code",
            liveStreamDown: "The live stream is either down or has ended.",
            protectedContent: "There was a problem providing access to protected content.",
            technicalError: "This video cannot be played because of a technical error."
          },
          exitFullscreen: "Exit Fullscreen",
          fullscreen: "Fullscreen",
          hd: "Quality",
          liveBroadcast: "Live",
          logo: "Logo",
          mute: "Mute",
          next: "Next",
          nextUp: "Next Up",
          notLive: "Not Live",
          off: "Off",
          pause: "Pause",
          pipIcon: "Picture in Picture (PiP)",
          play: "Play",
          playback: "Play",
          playbackRates: "Playback Rates",
          player: "Video Player",
          poweredBy: "Powered by",
          prev: "Previous",
          related: {
            autoplaymessage: "Next up in xx",
            heading: "More Videos"
          },
          replay: "Replay",
          rewind: "Rewind 10 Seconds",
          settings: "Settings",
          sharing: {
            copied: "Copied",
            email: "Email",
            embed: "Embed",
            heading: "Share",
            link: "Link"
          },
          slider: "Seek",
          stop: "Stop",
          unmute: "Unmute",
          videoInfo: "About This Video",
          volume: "Volume",
          volumeSlider: "Volume",
          shortcuts: {
            playPause: "Play/Pause",
            volumeToggle: "Mute/Unmute",
            fullscreenToggle: "Fullscreen/Exit Fullscreen",
            seekPercent: "Seek %",
            keyboardShortcuts: "Keyboard Shortcuts",
            increaseVolume: "Increase Volume",
            decreaseVolume: "Decrease Volume",
            seekForward: "Seek Forward",
            seekBackward: "Seek Backward",
            spacebar: "SPACE",
            captionsToggle: "Captions On/Off"
          },
          captionsStyles: {
            subtitleSettings: "Subtitle Settings",
            color: "Font Color",
            fontOpacity: "Font Opacity",
            userFontScale: "Font Size",
            fontFamily: "Font Family",
            edgeStyle: "Character Edge",
            backgroundColor: "Background Color",
            backgroundOpacity: "Background Opacity",
            windowColor: "Window Color",
            windowOpacity: "Window Opacity",
            white: "White",
            black: "Black",
            red: "Red",
            green: "Green",
            blue: "Blue",
            yellow: "Yellow",
            magenta: "Magenta",
            cyan: "Cyan",
            none: "None",
            raised: "Raised",
            depressed: "Depressed",
            uniform: "Uniform",
            dropShadow: "Drop Shadow"
          },
          disabled: "Disabled",
          enabled: "Enabled",
          reset: "Reset"
        };
      },
      9128: (We, Wu, Wl) => {
        "use strict";

        function Wg(Wo, WT, WC) {
          function Wq() {
            for (; 0 < WE.length; ) {
              var { command: Wk, args: WM } = WE.shift();
              (WP[Wk] || Wo[Wk]).apply(Wo, WM);
            }
          }

          const WE = [],
            WP = { Wk: WM };
          WT.forEach((Wk) => {
            const WM = Wo[Wk];
          });
          Object.defineProperty(this, "queue", {
            enumerable: true,
            get: () => WE
          });
          this.flush = Wq;
          this.empty = function () {};
          this.off = function () {
            WT.forEach((Wk) => {
              var WM = WP[Wk];
              WM && ((Wo[Wk] = WM), delete WP[Wk]);
            });
          };
          this.destroy = function () {
            this.off();
            this.empty();
          };
        }

        Wl.d(Wu, { Z: () => Wg });
      },
      4742: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => Wg });
      },
      5191: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          R: () => Wo,
          a: () => Wg
        });
        const Wg = function (WT) {
            return (WT = WT.slice && "px" === WT.slice(-2) ? WT.slice(0, -2) : WT);
          },
          Wo = function (WT, WC) {
            var Wq;
            return -1 !== WC.toString().indexOf("%") && "string" == typeof WT && WT
              ? /^\d*\.?\d+%$/.test(WT)
                ? WT
                : -1 === (WC = WT.indexOf(":")) || ((Wq = parseFloat(WT.substr(0, WC))), (WT = parseFloat(WT.substr(WC + 1))), Wq <= 0) || WT <= 0
                ? 0
                : (WT / Wq) * 100 + "%"
              : 0;
          };
      },
      5083: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          G0: () => WM,
          ZP: () => WG,
          ke: () => Wk
        });
        var Wg = Wl(5191),
          Wo = Wl(1569),
          WT = Wl(9888),
          WC = Wl(6042),
          Wq = Wl(8348),
          WE = Wl(696),
          WP = Wl(8518);
        const Wk = {
            autoPause: {
              viewability: false,
              pauseAds: false
            },
            autostart: false,
            allowFullscreen: true,
            bandwidthEstimate: null,
            bitrateSelection: null,
            castAvailable: false,
            controls: true,
            cues: [],
            defaultPlaybackRate: 1,
            displaydescription: true,
            displaytitle: true,
            displayPlaybackLabel: false,
            enableShortcuts: true,
            height: 360,
            intl: {},
            item: 0,
            language: "en",
            liveTimeout: null,
            localization: WE.Z,
            mute: false,
            nextUpDisplay: true,
            playbackRateControls: false,
            playbackRates: [0.5, 1, 1.25, 1.5, 2],
            renderCaptionsNatively: false,
            repeat: false,
            stretching: "uniform",
            volume: 90,
            width: 640
          },
          WM = function (Ww) {
            return Ww < 5 ? 5 : Ww;
          },
          WG = function (Ww, WS) {
            var WF,
              WH = Object.assign({}, null == (WH = window) || null == (WH = WH.jwplayer) ? void 0 : WH.defaults, WS, Ww),
              WS =
                ((WF = WH),
                Object.keys(WF).forEach((Wb) => {
                  "id" !== Wb && (WF[Wb] = (0, WT.serialize)(WF[Wb]));
                }),
                WH.forceLocalizationDefaults ? Wk.language : (0, WP.G3)()),
              Ww = (0, WP.tK)(WH.intl),
              WV = ((WH.localization = (0, WP.Mh)(WE.Z, (0, WP.Pm)(WH, Ww, WS))), Object.assign({}, Wk, WH)),
              WS =
                ("." === WV.base && (WV.base = (0, Wo.getScriptPath)("jwplayer.js")),
                (WV.base = (WV.base || (0, Wo.loadFrom)()).replace(/\/?$/, "/")),
                (Wl.p = WV.base),
                (WV.width = (0, Wg.a)(WV.width)),
                (WV.height = (0, Wg.a)(WV.height)),
                (WV.aspectratio = (0, Wg.R)(WV.aspectratio, WV.width)),
                "string" == typeof WV.volume && (WV.volume = parseFloat(WV.volume)),
                (WV.volume = (0, WC.qh)(WV.volume) ? Math.min(Math.max(0, WV.volume), 100) : Wk.volume),
                (WV.mute = Boolean(WV.mute)),
                (WV.language = WS),
                (WV.intl = Ww),
                WV.playlistIndex),
              Ww = (WS && (WV.item = WS), (0, WC.hj)(WV.item) || (WV.item = 0), WH.autoPause),
              WS = (Ww && (WV.autoPause.viewability = !("viewability" in Ww) || Boolean(Ww.viewability)), WV.playbackRateControls);
            if (WS) {
              let Wb = WV.playbackRates;
              (Wb = (Wb = Array.isArray(WS) ? WS : Wb)
                .filter((WX) => (0, WC.hj)(WX) && 0.25 <= WX && WX <= 4)
                .map((WX) => Math.round(100 * WX) / 100)).indexOf(1) < 0 && Wb.push(1);
              Wb.sort();
              WV.playbackRateControls = true;
              WV.playbackRates = Wb;
            }
            (!WV.playbackRateControls || WV.playbackRates.indexOf(WV.defaultPlaybackRate) < 0) && (WV.defaultPlaybackRate = 1);
            WV.playbackRate = WV.defaultPlaybackRate;
            WV.aspectratio || delete WV.aspectratio;
            WH = WV.playlist;
            if (WH) {
              Array.isArray(WH.playlist) && ((WV.feedData = WH), (WV.playlist = WH.playlist));
            } else {
              const WX = (0, WC.ei)(WV, [
                "title",
                "description",
                "type",
                "mediaid",
                "image",
                "images",
                "file",
                "sources",
                "tracks",
                "preload",
                "duration",
                "chapters"
              ]);
              WV.playlist = [WX];
            }
            WV.qualityLabels = WV.qualityLabels || WV.hlslabels;
            delete WV.duration;
            let Wr = WV.liveTimeout;
            null !== Wr && ((0, WC.qh)(Wr) ? 0 !== Wr && (Wr = Math.max(30, Wr)) : (Wr = null), (WV.liveTimeout = Wr));
            return (
              (Ww = parseFloat(WV.bandwidthEstimate)),
              (WS = parseFloat(WV.bitrateSelection)),
              ((WV.bandwidthEstimate = (0, WC.qh)(Ww)
                ? Ww
                : (function (Wt) {
                    Wt = parseFloat(Wt);
                    return (0, WC.qh)(Wt) ? Math.max(Wt, 1) : Wk.bandwidthEstimate;
                  })(WV.defaultBandwidthEstimate)),
              (WV.bitrateSelection = (0, WC.qh)(WS) ? WS : Wk.bitrateSelection),
              (WV.liveSyncDuration = WM(WV.liveSyncDuration)),
              (WV.backgroundLoading = ((0, WC.jn)(WV.backgroundLoading) ? WV : Wq.Features).backgroundLoading),
              WV)
            );
          };
      },
      2894: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          Ep: () => WT,
          Jt: () => WC,
          Tr: () => Wo,
          Zq: () => Wq
        });
        var Wg = Wl(4446);
        const Wo = {
            Wk: function (...WG) {
              WC()
                ? WE.push({
                    command: Wk,
                    args: WG
                  })
                : (Wq(), WM && WM.apply(this, WG));
            },
            registerPlugin: function (WZ, Wj, WJ) {
              "jwpsrv" !== WZ && (0, WC.f)(WZ, Wj, WJ);
            },
            onerror: (Wo.onload = null),
            onerror: Wu.bind(null, Wo.onerror),
            onload: Wu.bind(null, Wo.onload)
          },
          WT = function (WE, WP) {
            return () => {
              throw new Wg.rG(Wg.pJ, WE, WP);
            };
          },
          WC = function (WE, WP) {
            return () => {
              throw new Wg.rG(null, WE, WP);
            };
          },
          Wq = function () {
            return Wl.e(681)
              .then(
                function (WE) {
                  return Wl(2739).default;
                }.bind(null, Wl)
              )
              .catch(WT(Wg.fU + 101));
          };
      },
      623: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          ZP: () => f4,
          c2: () => f3
        });
        var Wg = Wl(9128),
          Wo = Wl(2445),
          WT = Wl(2894),
          WC = Wl(393),
          Wq = Wl(8320),
          WE = Wl(2963),
          WP = Wl(670),
          Wk = Wl(4601),
          WM = Wl(4446),
          WG = Wl(8348);
        let Ww = null;

        function WS() {
          var f5 = window.IntersectionObserverEntry;
          return !(f5 && "IntersectionObserver" in window && "intersectionRatio" in f5.prototype);
        }

        function WF() {
          return (
            WS()
              ? Wl.e(943)
                  .then(
                    function (f5) {
                      return Wl(6337);
                    }.bind(null, Wl)
                  )
                  .catch((0, WT.Ep)(WM.fU + 120))
              : Promise.resolve()
          ).then(WT.Zq);
        }

        const WH = function (f5) {
          var f6,
            f7 = f5.get("controls"),
            f8 = WS(),
            f5 = (function (f9) {
              const fW = f9.get("playlist");
              if (Array.isArray(fW) && fW.length) {
                var ff = (0, Wq.bx)(f9.get("item"), fW.length),
                  fD = (0, Wq.T5)((0, WC.Z)(fW[ff]), f9);
                for (let fl = 0; fl < fD.length; fl++) {
                  var fe = fD[fl],
                    fu = f9.getProviders();
                  for (let fg = 0; fg < WE.B.length; fg++) {
                    const fo = WE.B[fg];
                    if (fu.providerSupports(fo, fe)) {
                      return "html5" === fo.name;
                    }
                  }
                }
              }
              return false;
            })(f5);
          return WG.OS.tizen
            ? WF()
            : f7 && f8 && f5
            ? ((f6 = Wl.e(605)
                .then(
                  function (f9) {
                    Wl(6337);
                    var fW = Wl(2739).default;
                    return (Wk.v.controls = Wl(4646).default), (0, WP.Z)(Wl(9181).default), fW;
                  }.bind(null, Wl)
                )
                .catch((0, WT.Ep)(WM.fU + 105))),
              (WT.Tr.html5 = f6))
            : f7 && f5
            ? ((f6 = Wl.e(207)
                .then(
                  function (f9) {
                    var fW = Wl(2739).default;
                    return (Wk.v.controls = Wl(4646).default), (0, WP.Z)(Wl(9181).default), fW;
                  }.bind(null, Wl)
                )
                .catch((0, WT.Ep)(WM.fU + 104))),
              (WT.Tr.html5 = f6))
            : f7 && f8
            ? Wl.e(493)
                .then(
                  function (f9) {
                    Wl(6337);
                    var fW = Wl(2739).default;
                    return (Wk.v.controls = Wl(4646).default), fW;
                  }.bind(null, Wl)
                )
                .catch((0, WT.Ep)(WM.fU + 103))
            : f7
            ? Wl.e(581)
                .then(
                  function (f9) {
                    var fW = Wl(2739).default;
                    return (Wk.v.controls = Wl(4646).default), fW;
                  }.bind(null, Wl)
                )
                .catch((0, WT.Ep)(WM.fU + 102))
            : WF();
        };
        var WV = Wl(1643),
          Wr = Wl(7263),
          Wb = Wl(676),
          WX = Wl(8518),
          Wt = Wl(1241),
          WA = Wl(8381);

        function Wn(f5, f6, f7) {
          (f5 = f5.attributes).playlist = (0, Wq.ZP)(f6);
          f5.feedData = f7;
        }

        function Ws(f5) {
          const f6 = f5.get("playlist");
          return new Promise((f7, f8) => {
            if ("string" != typeof f6) {
              const fW = f5.get("feedData") || {};
              return Wn(f5, f6, fW), f7();
            }
            var f9 = new Wr.Z();
            f9.on(WV.Ow, function (ff) {
              var fD = ff.playlist;
              delete ff.playlist;
              Wn(f5, fD, ff);
              f7();
            });
            f9.on(WV.pn, (ff) => {
              Wn(f5, [], {});
              f8((0, WM.l9)(ff, WM.xk));
            });
            f9.load(f6);
          });
        }

        function WY(f5) {
          return f5.attributes["_destroyed"];
        }

        var Wh = Wl(1918),
          WK = Wl(6599),
          Wm = Wl(7010);

        function WN(f5) {
          let f6;
          this.start = function (f7) {
            const f8 = Wi(f5, f7),
              f9 = Promise.all([((f7 = f5), (Ww = Ww || WH(f7))), WL(f5), f8, Wc(f5), Wy(f5), Wx(f5), WU(f5)]);
            return (
              (f7 = new Promise((fW, ff) => {
                f6 = setTimeout(() => {
                  ff(new WM.rG(WM.pJ, WM.T6));
                }, 60000);
                var fD = () => {
                  clearTimeout(f6);
                  setTimeout(fW, 60000);
                };
                f9.then(fD).catch(fD);
              })),
              Promise.race([f9, f7])
                .catch((fW) => {
                  var ff = () => {
                    throw fW;
                  };
                  return f8.then(ff).catch(ff);
                })
                .then((fW) => {
                  return (fW = fW) && fW.length
                    ? ((ff = fW.reduce((fD, fe) => fD.concat(fe), []).filter((fD) => (null == fD ? void 0 : fD.code))),
                      {
                        core: fW[0],
                        warnings: ff
                      })
                    : {
                        core: null,
                        warnings: []
                      };
                  var ff;
                })
            );
          };
          this.destroy = function () {
            clearTimeout(f6);
            f5.set("_destroyed", true);
            f5 = null;
          };
        }

        const Wx = function (f5) {
            var f6 = f5.get("skin") ? f5.get("skin").url : void 0;
            if (
              "string" != typeof f6 ||
              (function (f7) {
                var f8 = document.styleSheets;
                for (let f9 = 0, fW = f8.length; f9 < fW; f9++) {
                  if (f8[f9].href === f7) {
                    return 1;
                  }
                }
              })(f6)
            ) {
              return Promise.resolve();
            }
            {
              return new Wb.ZP(f6, true).load().catch((f8) => f8);
            }
          },
          WI = (f5) => {
            f5 = f5.get("advertising");
            return Boolean(null == f5 ? void 0 : f5.outstream);
          },
          Wc = (f5) =>
            WI(f5)
              ? Promise.resolve()
              : Ws(f5)
                  .then(() => {
                    if (f5.get("drm") || (0, Wh.w0)(f5.get("playlist"))) {
                      return (0, Wh.lD)(f5.get("edition"));
                    }
                  })
                  .then(() => {
                    return Ws((f6 = f5)).then(() => {
                      if (!WY(f6)) {
                        var f7 = (0, Wq.s7)(f6.get("playlist"), f6);
                        f6.attributes.playlist = f7;
                        try {
                          (0, Wq["_"])(f7);
                        } catch (ff) {
                          throw ((ff.code += WM.xk), ff);
                        }
                        var f8 = f6.getProviders(),
                          f9 = (0, Wq.bx)(f6.get("item"), f7.length),
                          { provider: f9, name: fW } = f8.choose(f7[f9].sources[0]);
                        return "function" == typeof f9
                          ? f9
                          : WT.Tr.html5 && "html5" === fW
                          ? WT.Tr.html5
                          : f8.load(fW).catch((fD) => {
                              throw (0, WM.l9)(fD, WM.y4);
                            });
                      }
                    });
                    var f6;
                  }),
          Wy = (f5, f6) => {
            var f7 = [
              ((f8) => {
                const f9 = f8.attributes,
                  fW = f9.error;
                if (fW && fW.code === WK.u5) {
                  const ff = f9.pid,
                    fD = f9.ph,
                    fe = new WK.ZP(f9.key);
                  if (0 < fD && fD < 4 && ff && -7776000000 < fe.duration()) {
                    return new Wb.ZP("//content.jwplatform.com/libraries/" + ff + ".js")
                      .load()
                      .then(() => {
                        var fu = window.jwplayer.defaults.key,
                          fl = new WK.ZP(fu);
                        fl.error() || fl.token() !== fe.token() || ((f9.key = fu), (f9.edition = fl.edition()), (f9.error = fl.error()));
                      })
                      .catch(() => {});
                  }
                }
                return Promise.resolve();
              })(f5)
            ];
            return WI(f5) || f7.push(Promise.resolve()), Promise.all(f7);
          },
          Wi = (f5, f6) => {
            var f7,
              f8,
              f9,
              fW = () => (0, Wt.Z)(f5, f6);
            return (0, Wm.Z)()
              ? ((f8 = f7 = f5),
                (f9 = f6),
                Wl.e(168)
                  .then(((ff) => new (Wl(5545).default)(f9).setup(f8)).bind(null, Wl))
                  .catch((0, WT.Ep)(WM.fU + 130))
                  .then(() => Wx(f7))
                  .then(fW)
                  .catch(fW))
              : fW();
          },
          WU = function (f5) {
            const f6 = f5.attributes,
              { language: f7, base: f8, setupConfig: f9, intl: fW } = f6,
              ff = (0, WX.Pm)(f9, fW, f7);
            return !(0, WX.q2)(f7) || (0, WX.dl)(ff)
              ? Promise.resolve()
              : new Promise((fD) =>
                  (0, WX.Dq)(f8, f7)
                    .then(({ response: fe }) => {
                      if (!WY(f5)) {
                        if (!fe) {
                          throw new WM.rG(null, WM.wH);
                        }
                        f6.localization = (0, WX.Mh)(fe, ff);
                        fD();
                      }
                    })
                    .catch((fe) => {
                      fD(fe.code === WM.wH ? fe : (0, WM.l9)(fe, WM.A6));
                    })
                );
          },
          WL = (f5) =>
            new Promise((f6) => {
              var f7;
              return 45 < f5.attributes.liveSyncDuration
                ? f6((0, WM.l9)(new Error(), WM.wM))
                : null != (f7 = Array.isArray(f5.attributes.playlist) && f5.attributes.playlist.map((f8) => f8.chapters)) && f7.length
                ? (0, WA.T2)(f7, f6)
                : f6();
            });
        var Wd = Wl(2303),
          Wv = Wl(7411),
          WO = Wl(9888),
          Wz = Wl(4742);
        let WB = {
          removeItem(f5) {}
        };
        try {
          WB = window.localStorage || WB;
        } catch (f5) {}
        const WZ = class {
          constructor(f6, f7) {
            this.namespace = f6;
            this.items = f7;
          }

          ["getAllItems"]() {
            return this.items.reduce((f6, f7) => {
              var f8 = WB[this.namespace + "." + f7];
              return f8 && (f6[f7] = "captions" !== f7 ? (0, WO.serialize)(f8) : JSON.parse(f8)), f6;
            }, {});
          }

          ["track"](f6) {
            this.items.forEach((f7) => {
              f6.on("change:" + f7, (f8, f9) => {
                try {
                  "captions" === f7 && (f9 = JSON.stringify(f9));
                  WB[this.namespace + "." + f7] = f9;
                } catch (fW) {
                  Wz.Z.debug && console.error(fW);
                }
              });
            });
          }

          ["clear"]() {
            this.items.forEach((f6) => {
              WB.removeItem(this.namespace + "." + f6);
            });
          }
        };
        var Wj = Wl(7753),
          WJ = Wl(9918),
          Wu = Wl(328),
          WR = Wl(4225),
          Wp = Wl(7683),
          Wa = Wl(4609),
          WQ = Wl(5882);
        Wl(4671);
        Wl(9926);

        function f0(f6, f7) {
          f7 && f7.code && (f7.sourceError && console.error(f7.sourceError), console.error(WM.rG.logMessage(f7.code)));
        }

        function f1(f6) {
          f6 && f6.code && console.warn(WM.rG.logMessage(f6.code));
        }

        function f2(f6) {
          this["_events"] = {};
          this.modelShim = new Wj.Z();
          this.modelShim["_qoeItem"] = new Wv.Z();
          this.mediaShim = {};
          this.setup = new WN(this.modelShim);
          this.currentContainer = this.originalContainer = f6;
          this.apiQueue = new Wg.Z(
            this,
            [
              "load",
              "play",
              "pause",
              "seek",
              "stop",
              "playlistItem",
              "playlistNext",
              "playlistPrev",
              "next",
              "preload",
              "setAllowFullscreen",
              "setConfig",
              "setCurrentAudioTrack",
              "setCurrentCaptions",
              "setCurrentQuality",
              "setFullscreen",
              "setPip",
              "requestPip",
              "addButton",
              "removeButton",
              "castToggle",
              "requestCast",
              "setMute",
              "setVolume",
              "setPlaybackRate",
              "addCues",
              "setCues",
              "getCues",
              "setPlaylistItem",
              "stopCasting",
              "getChapters",
              "getCurrentChapter",
              "setChapter",
              "resize",
              "setCaptions",
              "setControls"
            ],
            () => true
          );
        }

        const f3 = function (f6, f7) {
            if (!document.body.contains(f6.currentContainer)) {
              const f8 = document.getElementById(f6.get("id"));
              f8 && (f6.currentContainer = f8);
            }
            f6.currentContainer.parentElement && f6.currentContainer.parentElement.replaceChild(f7, f6.currentContainer);
            f6.currentContainer = f7;
          },
          f4 =
            (Object.assign(f2.prototype, {
              on: Wu.ZP.on,
              once: Wu.ZP.once,
              off: Wu.ZP.off,
              trigger: Wu.ZP.trigger,
              init(f6, f7) {
                const f8 = this.modelShim,
                  f9 = new WZ("jwplayer", [
                    "volume",
                    "mute",
                    "captionLabel",
                    "captions",
                    "bandwidthEstimate",
                    "bitrateSelection",
                    "qualityLabel",
                    "enableShortcuts"
                  ]),
                  fW = null == f9 ? void 0 : f9.getAllItems(),
                  ff = ((f8.attributes = f8.attributes || {}), Object.assign(this.mediaShim, WJ.L4), f6),
                  fD = (0, Wo.ZP)(Object.assign({}, f6), fW);
                fD.id = f7.id;
                fD.setupConfig = ff;
                Object.assign(f8.attributes, fD, WJ.bv);
                f8.getProviders = function () {
                  return new Wd.Z(fD);
                };
                f8.setProvider = function () {};
                let fe = (0, Wp.Z)();
                {
                  f8.get("backgroundLoading") || (fe = (0, Wa.Z)(fe.getPrimedElement(), fe));
                  const fu = (this.primeUi = new WQ.ZP((0, WQ.GU)(this.originalContainer)).once("gesture", () => {
                    fe.prime();
                    this.preload();
                    fu.destroy();
                  }));
                }
                return (
                  f8.on("change:errorEvent", f0),
                  this.setup
                    .start(f7)
                    .then((fl) => {
                      var fg = fl.core;
                      if (!fg) {
                        throw (0, WM.l9)(null, WM.y7);
                      }
                      if (this.setup) {
                        this.on(WV.cM, f1);
                        fl.warnings.forEach((fT) => {
                          this.trigger(WV.cM, fT);
                        });
                        fl = this.modelShim.clone();
                        if (fl.error) {
                          throw fl.error;
                        }
                        var fo = this.apiQueue.queue.slice(0),
                          fg =
                            (this.apiQueue.destroy(),
                            Object.assign(this, fg.prototype),
                            this.playerSetup(fl, f7, this.originalContainer, this["_events"], fo, fe),
                            this["_model"]);
                        return (
                          f8.off("change:errorEvent", f0),
                          fg.on("change:errorEvent", f0),
                          f9.track(fg),
                          this.updatePlaylist(fg.get("playlist"), fg.get("feedData")).catch((fT) => {
                            var fC = fT.code === WM["_M"] ? WM.IB : WM.xk;
                            throw (0, WM.l9)(fT, fC);
                          })
                        );
                      }
                    })
                    .then(() => {
                      this.setup && this.playerReady();
                    })
                    .catch((fl) => {
                      var fg, fo, fT;
                      this.setup &&
                        ((fg = this),
                        (fo = f7),
                        (fT = fl),
                        Promise.resolve().then(() => {
                          var fC = (0, WM.Mm)(WM.ud, WM.nk, fT),
                            fq = fg["_model"] || fg.modelShim,
                            fE = ((fC.message = fC.message || fq.get("localization").errors[fC.key]), delete fC.key, fq.get("contextual"));
                          if (!fE) {
                            const fP = (0, WR.Z)(fg, fC);
                            WR.Z.cloneIcon && fP.querySelector(".jw-icon").appendChild(WR.Z.cloneIcon("error"));
                            f3(fg, fP);
                          }
                          fq.set("errorEvent", fC);
                          fq.set("state", WV.Vy);
                          fg.trigger(WV.HH, fC);
                          fE && fo.remove();
                        }));
                    })
                );
              },
              playerDestroy() {
                this.destroy && this.destroy();
                this.apiQueue && this.apiQueue.destroy();
                this.setup && this.setup.destroy();
                this.primeUi && this.primeUi.destroy();
                this.currentContainer !== this.originalContainer && f3(this, this.originalContainer);
                this.off();
                this["_events"] = this["_model"] = this.modelShim = this.apiQueue = this.primeUi = this.setup = null;
              },
              getContainer() {
                return this.currentContainer;
              },
              get(f6) {
                if (this.modelShim) {
                  return f6 in this.mediaShim ? this.mediaShim[f6] : this.modelShim.get(f6);
                }
              },
              getItemQoe() {
                return this.modelShim["_qoeItem"];
              },
              getItemPromise: () => null,
              setItemCallback(f6) {
                this.modelShim && (this.modelShim.attributes.playlistItemCallback = f6);
              },
              getConfig() {
                return Object.assign({}, this.modelShim.attributes, this.mediaShim);
              },
              getCurrentCaptions() {
                return this.get("captionsIndex");
              },
              getWidth() {
                return this.get("containerWidth");
              },
              getHeight() {
                return this.get("containerHeight");
              },
              getMute() {
                return this.get("mute");
              },
              getProvider() {
                return this.get("provider");
              },
              getState() {
                return this.get("state");
              },
              getAbsolutePosition: () => null,
              getAudioTracks: () => null,
              getCaptionsList: () => null,
              getQualityLevels: () => null,
              getVisualQuality: () => null,
              getCurrentQuality: () => -1,
              getCurrentAudioTrack: () => -1,
              getSafeRegion: () => ({
                x: 0,
                y: 0,
                width: 0,
                height: 0
              }),
              isBeforeComplete: () => false,
              isBeforePlay: () => false,
              createInstream: () => null,
              skipAd() {},
              getMediaElement() {},
              attachMedia() {},
              detachMedia() {}
            }),
            f2);
      },
      4446: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          A6: () => 308000,
          DD: () => 202000,
          EY: () => 204000,
          H4: () => WK,
          IB: () => 102700,
          MD: () => "badConnection",
          Mm: () => Wx,
          Sp: () => Wh,
          T6: () => 100001,
          Y7: () => 306000,
          YQ: () => 200001,
          _M: () => 203700,
          aD: () => 300200,
          fU: () => 101000,
          l9: () => WI,
          nk: () => 100000,
          nm: () => Wc,
          o2: () => 203640,
          pJ: () => Ws,
          rG: () => WN,
          tJ: () => 203000,
          ud: () => "technicalError",
          ul: () => WA,
          wH: () => 308640,
          wM: () => 300100,
          xk: () => 102000,
          y4: () => 104000,
          y7: () => 100002,
          zO: () => WY
        });
        var Wg = Wl(6042);
        const WA = "cantPlayVideo",
          Ws = "cantLoadPlayer",
          WY = "cantPlayInBrowser",
          Wh = "liveStreamDown",
          WK = "protectedContent";

        class WN {
          constructor(Wy, Wi, WU) {
            this.code = (0, Wg.qh)(Wi) ? Wi : 0;
            this.sourceError = WU || null;
            Wy ? (this.key = Wy) : delete this.key;
          }

          static ["logMessage"](Wy) {
            var Wi = Wy % 1000,
              WU = Math.floor((Wy - Wi) / 1000);
            let WL = Wy.toString();
            return (
              "JW Player " +
              (299999 < Wy && Wy < 400000 ? "Warning" : "Error") +
              " " +
              Wy +
              ". For more information see https://developer.jwplayer.com/jw-player/docs/developer-guide/api/errors-reference#" +
              (WL = 400 <= Wi && Wi < 600 ? WU + ("400-" + WU + "599") : WL)
            );
          }
        }

        const Wx = function (Wy, Wi, WU) {
            return WU instanceof WN && WU.code ? WU : new WN(Wy, Wi, WU);
          },
          WI = function (Wy, Wi) {
            var WU = Wx("technicalError", Wi, Wy);
            return (WU.code = ((Wy && Wy instanceof WN && Wy.code) || 0) + Wi), WU;
          },
          Wc = function (Wy) {
            var { name: Wy, message: Wi } = Wy;
            switch (Wy) {
              case "AbortError":
                return /pause/.test(Wi) ? 303213 : /load/.test(Wi) ? 303212 : 303210;
              case "NotAllowedError":
                return 303220;
              case "NotSupportedError":
                return 303230;
              default:
                return 303200;
            }
          };
      },
      6391: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => Wg });
        const Wg = [];
      },
      7411: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => Wq });
        var Wg = Wl(5004);
        const Wo = window.performance || { timing: {} },
          WT = Wo.timing.navigationStart || (0, Wg.z)(),
          WC = ("now" in Wo || (Wo.now = () => (0, Wg.z)() - WT), () => WT + Wo.now()),
          Wq = class {
            constructor() {
              this.startTimes = {};
              this.sum = {};
              this.counts = {};
              this.ticks = {};
            }

            ["start"](WE) {
              this.startTimes[WE] = WC();
              this.counts[WE] = this.counts[WE] + 1 || 1;
            }

            ["end"](WE) {
              var WP;
              this.startTimes[WE] && ((WP = WC() - this.startTimes[WE]), delete this.startTimes[WE], (this.sum[WE] = this.sum[WE] + WP || WP));
            }

            ["dump"]() {
              var WE,
                WP = Object.assign({}, this.sum);
              for (const Wk in this.startTimes)
                !(function (WM, WG) {
                  if (null == WM) {
                    throw new TypeError("Cannot convert undefined or null to object");
                  }
                  return Object.prototype.hasOwnProperty.call(Object(WM), WG);
                })(this.startTimes, Wk) || ((WE = WC() - this.startTimes[Wk]), (WP[Wk] = WP[Wk] + WE || WE));
              return {
                counts: Object.assign({}, this.counts),
                sums: WP,
                events: Object.assign({}, this.ticks)
              };
            }

            ["tick"](WE) {
              this.ticks[WE] = WC();
            }

            ["clear"](WE) {
              delete this.ticks[WE];
            }

            ["between"](WE, WP) {
              return this.ticks[WP] && this.ticks[WE] ? this.ticks[WP] - this.ticks[WE] : null;
            }
          };
      },
      4601: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          v: () => WC,
          z: () => Wq
        });
        var Wg = Wl(2894),
          Wo = Wl(8348);
        let WT = null;
        const WC = {},
          Wq = function () {
            return (WT =
              WT ||
              (Wo.OS.tizenApp
                ? Wl.e(74)
                    .then(
                      function (WE) {
                        var WP = Wl(3112).default;
                        return (WC.controls = WP);
                      }.bind(null, Wl)
                    )
                    .catch(function () {
                      ((WT = null), Wg.Jt)(301133)();
                    })
                : Wl.e(716)
                    .then(
                      function (WE) {
                        var WP = Wl(4646).default;
                        return (WC.controls = WP);
                      }.bind(null, Wl)
                    )
                    .catch(function () {
                      ((WT = null), Wg.Jt)(301130)();
                    })));
          };
      },
      8348: (We, Wu, Wl) => {
        "use strict";
        Wl.r(Wu);
        Wl.d(Wu, {
          Browser: () => Wq,
          Features: () => WP,
          OS: () => WE
        });
        var Wg = Wl(2268);
        const Wo = (Wk, WM) => {
            Wk = Wk.exec(WM);
            if (Wk && 1 < Wk.length) {
              return Wk[1];
            }
          },
          WT = navigator.userAgent,
          WC = () => {},
          Wq = {
            get androidNative() {
              return (0, Wg.O7)();
            },
            get chrome() {
              return (0, Wg.i7)();
            },
            get edge() {
              return (0, Wg.un)();
            },
            get facebook() {
              return (0, Wg.DF)();
            },
            get firefox() {
              return (0, Wg.pZ)();
            },
            get ie() {
              return (0, Wg.w1)();
            },
            get msie() {
              return (0, Wg.A)();
            },
            get safari() {
              return (0, Wg.G6)();
            },
            get version() {
              {
                var Wk = this,
                  WM = WT;
                let WG, Ww, WS, WF;
                if (Wk.chrome) {
                  WG = -1 !== WM.indexOf("Chrome") ? WM.substring(WM.indexOf("Chrome") + 7) : WM.substring(WM.indexOf("CriOS") + 6);
                } else {
                  if (Wk.safari) {
                    WG = WM.substring(WM.indexOf("Version") + 8);
                  } else {
                    if (Wk.firefox) {
                      WG = WM.substring(WM.indexOf("Firefox") + 8);
                    } else {
                      if (Wk.edge) {
                        let WH = WM.indexOf("Edge");
                        -1 === WH ? (WH = WM.indexOf("Edg") + 4) : (WH += 5);
                        WG = WM.substring(WH);
                      } else {
                        Wk.ie &&
                          (-1 !== WM.indexOf("rv:")
                            ? (WG = WM.substring(WM.indexOf("rv:") + 3))
                            : -1 !== WM.indexOf("MSIE") && (WG = WM.substring(WM.indexOf("MSIE") + 5)));
                      }
                    }
                  }
                }
                return (
                  WG &&
                    (-1 !==
                      (WF = (WG =
                        -1 !== (WF = (WG = -1 !== (WF = WG.indexOf(";")) ? WG.substring(0, WF) : WG).indexOf(" "))
                          ? WG.substring(0, WF)
                          : WG).indexOf(")")) && (WG = WG.substring(0, WF)),
                    (Ww = parseInt(WG, 10)),
                    (WS = parseInt(WG.split(".")[1], 10))),
                  {
                    version: WG,
                    major: Ww,
                    minor: WS
                  }
                );
              }
            }
          },
          WE = {
            get android() {
              return (0, Wg.Dt)();
            },
            get iOS() {
              return (0, Wg.gn)();
            },
            get mobile() {
              return (0, Wg.tq)();
            },
            get mac() {
              return (0, Wg.id)();
            },
            get iPad() {
              return (0, Wg.zc)();
            },
            get iPhone() {
              return (0, Wg.xb)();
            },
            get windows() {
              return -1 < WT.indexOf("Windows");
            },
            get tizen() {
              return (0, Wg.yS)();
            },
            get tizenApp() {
              return (0, Wg.Q6)();
            },
            get version() {
              {
                var Wk = this,
                  WM = WT;
                let WG, Ww, WS;
                if (Wk.windows) {
                  switch (((WG = Wo(/Windows(?: NT|)? ([._\d]+)/, WM)), WG)) {
                    case "6.1":
                      WG = "7.0";
                      break;
                    case "6.2":
                      WG = "8.0";
                      break;
                    case "6.3":
                      WG = "8.1";
                  }
                } else {
                  Wk.android
                    ? (WG = Wo(/Android ([._\d]+)/, WM))
                    : Wk.iOS
                    ? (WG = Wo(/OS ([._\d]+)/, WM))
                    : Wk.mac
                    ? (WG = Wo(/Mac OS X ([._\d]+)/, WM))
                    : Wk.tizen && (WG = Wo(/Tizen ([._\d]+)/, WM));
                }
                if (WG) {
                  Ww = parseInt(WG, 10);
                  const WF = WG.split(/[._]/);
                  WF && (WS = parseInt(WF[1], 10));
                }
                return {
                  version: WG,
                  major: Ww,
                  minor: WS
                };
              }
            }
          },
          WP = {
            get flash() {
              return (0, Wg.NO)();
            },
            get flashVersion() {
              return (0, Wg.dI)();
            },
            get iframe() {
              return (0, Wg.cL)();
            },
            get passiveEvents() {
              {
                let WM = false;
                try {
                  var Wk = Object.defineProperty({}, "passive", {
                    get: () => (WM = true)
                  });
                  window.addEventListener("testPassive", WC, Wk);
                  window.removeEventListener("testPassive", WC, Wk);
                } catch (WG) {}
                return WM;
              }
            },
            get backgroundLoading() {
              return !(WE.iOS || Wq.safari || WE.tizen);
            }
          };
      },
      1643: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          $_: () => Wn,
          $j: () => Wc,
          AQ: () => WU,
          Ax: () => Ws,
          B1: () => "over",
          Bs: () => fG,
          Ew: () => WO,
          FU: () => Wz,
          Gj: () => fP,
          HH: () => WJ,
          Hy: () => "controls",
          Ib: () => fC,
          Je: () => WZ,
          Jl: () => Wi,
          K5: () => "enter",
          Kb: () => Wg,
          Ms: () => "complete",
          NZ: () => "seek",
          O1: () => f3,
          Ow: () => "playlist",
          P: () => WF,
          QF: () => fT,
          R2: () => Wa,
          RF: () => fF,
          Rc: () => "ready",
          Rt: () => WA,
          SL: () => fq,
          Sv: () => "dragEnd",
          TJ: () => WQ,
          U3: () => Wb,
          UF: () => fo,
          UW: () => "fullscreen",
          UZ: () => f5,
          V$: () => "playlistComplete",
          Vy: () => WE,
          WE: () => WY,
          Wp: () => "drag",
          Z_: () => fE,
          _5: () => WC,
          _B: () => fl,
          aM: () => f6,
          aQ: () => Wj,
          bc: () => Wo,
          cM: () => Wt,
          cq: () => WB,
          cy: () => WL,
          gO: () => ff,
          gy: () => f2,
          h7: () => "fullscreenchange",
          ik: () => WP,
          j0: () => fu,
          jt: () => fg,
          k3: () => Wh,
          l5: () => fM,
          nQ: () => Wk,
          nv: () => WG,
          oZ: () => f0,
          ot: () => WS,
          pi: () => Wv,
          pn: () => WX,
          qG: () => fS,
          r0: () => "playing",
          rx: () => "meta",
          s$: () => Wy,
          sF: () => "resize",
          t6: () => fH,
          tP: () => WV,
          uL: () => WK,
          uT: () => Wp,
          uc: () => WR,
          ug: () => f7,
          wh: () => Wm,
          xQ: () => "complete",
          xf: () => fk,
          yH: () => f1
        });
        const Wg = "buffering",
          Wo = "idle",
          WC = "paused",
          WE = "error",
          WP = "loading",
          Wk = "stalled",
          WG = "dragStart",
          WS = "click",
          WF = "doubleClick",
          WV = "move",
          Wb = "out",
          WX = WE,
          Wt = "warning",
          WA = "adClick",
          Wn = "mediaLoaded",
          Ws = "adPause",
          WY = "adPlay",
          Wh = "adSkipped",
          WK = "adTime",
          Wm = "autostartNotAllowed",
          Wc = "beforePlay",
          Wy = "beforeComplete",
          Wi = "bufferFull",
          WU = "absolutePositionReady",
          WL = "displayClick",
          Wv = "cast",
          WO = "mediaError",
          Wz = "firstFrame",
          WB = "playAttempt",
          WZ = "playAttemptFailed",
          Wj = "seeked",
          WJ = "setupError",
          WR = "state",
          Wp = "bufferChange",
          Wa = "time",
          WQ = "ratechange",
          f0 = "mediaType",
          f1 = "volume",
          f2 = "mute",
          f3 = "metadataCueParsed",
          f5 = "levels",
          f6 = "levelsChanged",
          f7 = "visualQuality",
          ff = "playlistItem",
          fu = "audioTracks",
          fl = "audioTrackChanged",
          fg = "subtitlesTracks",
          fo = "subtitlesTrackChanged",
          fT = "playbackRateChanged",
          fC = "logoClick",
          fq = "captionsList",
          fE = "captionsChanged",
          fP = "providerFirstFrame",
          fk = "userAction",
          fM = "instreamClick",
          fG = "breakpoint",
          fS = "bandwidthEstimate",
          fF = "float",
          fH = "chapter";
      },
      9918: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          L4: () => Wo,
          OG: () => 25,
          bv: () => Wg,
          ni: () => 120
        });
        const Wg = {
          audioMode: false,
          itemMeta: {},
          playbackRate: 1,
          playRejected: false,
          state: Wl(1643).bc,
          itemReady: false,
          controlsEnabled: false
        };
      },
      7753: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => Wg });

        class Wg extends Wl(328).ZP {
          constructor() {
            super();
            this.attributes = Object.create(null);
          }

          ["addAttributes"](Wo) {
            Object.keys(Wo).forEach((WT) => {
              this.add(WT, Wo[WT]);
            });
          }

          ["add"](Wo, WT) {
            Object.defineProperty(this, Wo, {
              get: () => this.attributes[Wo],
              set: (WC) => {
                this.set(Wo, WC);
              },
              enumerable: false
            });
            this.attributes[Wo] = WT;
          }

          ["get"](Wo) {
            return this.attributes[Wo];
          }

          ["set"](Wo, WT) {
            var WC;
            this.attributes[Wo] !== WT && ((WC = this.attributes[Wo]), (this.attributes[Wo] = WT), this.trigger("change:" + Wo, this, WT, WC));
          }

          ["clone"]() {
            var Wo = { WC: WT[WC] },
              WT = this.attributes;
            if (WT) {
              for (const WC in WT);
            }
            return Wo;
          }

          ["change"](Wo, WT, WC) {
            this.on("change:" + Wo, WT, WC);
            Wo = this.get(Wo);
            return WT.call(WC, this, Wo, Wo), this;
          }
        }
      },
      7941: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          dZ: () => WT,
          my: () => Wq,
          qk: () => WC,
          r1: () => Wo
        });
        var Wg = Wl(2957);
        const Wo = (WE) => {
            let WP = "";
            return WE && (WE.localName ? (WP = WE.localName) : WE.baseName && (WP = WE.baseName)), WP;
          },
          WT = (WE) => {
            let WP = "";
            return WE && (WE.textContent ? (WP = (0, Wg.fy)(WE.textContent)) : WE.text && (WP = (0, Wg.fy)(WE.text))), WP;
          },
          WC = (WE, WP) => WE.childNodes[WP],
          Wq = (WE) => (WE.childNodes ? WE.childNodes.length : 0);
      },
      6769: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          Z: () =>
            function (Wk) {
              var WM = [];
              WM.feedData = {};
              for (let WF = 0; WF < (0, Wg.my)(Wk); WF++) {
                var WG = (0, Wg.qk)(Wk, WF);
                if ("channel" === (0, Wg.r1)(WG).toLowerCase()) {
                  for (let WH = 0; WH < (0, Wg.my)(WG); WH++) {
                    var Ww = (0, Wg.qk)(WG, WH),
                      WS = (0, Wg.r1)(Ww).toLowerCase();
                    "item" === WS ? WM.push(WP(Ww)) : WS && (WM.feedData[WS] = (0, Wg.dZ)(Ww));
                  }
                }
              }
              return WM;
            }
        });
        var Wg = Wl(7941),
          Wo = Wl(2957);

        function WT(Wk, WM) {
          const WG = [];
          for (let WF = 0; WF < (0, Wg.my)(Wk); WF++) {
            var Ww = Wk.childNodes[WF];
            if ("media" === Ww.prefix && (0, Wg.r1)(Ww)) {
              switch ((0, Wg.r1)(Ww).toLowerCase()) {
                case "content":
                  if (((0, Wo.Dc)(Ww, "duration") && (WM.duration = (0, Wo.m9)((0, Wo.Dc)(Ww, "duration"))), (0, Wo.Dc)(Ww, "url"))) {
                    WM.sources || (WM.sources = []);
                    const WH = {
                        file: (0, Wo.Dc)(Ww, "url"),
                        type: (0, Wo.Dc)(Ww, "type"),
                        width: (0, Wo.Dc)(Ww, "width"),
                        label: (0, Wo.Dc)(Ww, "label")
                      },
                      WV = ((Wr) => {
                        var Wb = [];
                        for (let Wt = 0; Wt < (0, Wg.my)(Wr); Wt++) {
                          var WX = Wr.childNodes[Wt];
                          "jwplayer" === WX.prefix && "mediatypes" === (0, Wg.r1)(WX).toLowerCase() && Wb.push((0, Wg.dZ)(WX));
                        }
                        return Wb;
                      })(Ww);
                    WV.length && (WH.mediaTypes = WV);
                    WM.sources.push(WH);
                  }
                  0 < (0, Wg.my)(Ww) && (WM = WT(Ww, WM));
                  break;
                case "title":
                  WM.title = (0, Wg.dZ)(Ww);
                  break;
                case "description":
                  WM.description = (0, Wg.dZ)(Ww);
                  break;
                case "guid":
                  WM.mediaid = (0, Wg.dZ)(Ww);
                  break;
                case "thumbnail":
                  WM.image || (WM.image = (0, Wo.Dc)(Ww, "url"));
                  break;
                case "group":
                  WT(Ww, WM);
                  break;
                case "subtitle": {
                  const Wr = {
                    file: (0, Wo.Dc)(Ww, "url"),
                    kind: "captions"
                  };
                  0 < (0, Wo.Dc)(Ww, "lang").length &&
                    (Wr.label =
                      ((WS = (0, Wo.Dc)(Ww, "lang")),
                      void 0,
                      {
                        zh: "Chinese",
                        nl: "Dutch",
                        en: "English",
                        fr: "French",
                        de: "German",
                        it: "Italian",
                        ja: "Japanese",
                        pt: "Portuguese",
                        ru: "Russian",
                        es: "Spanish"
                      }[WS] || WS));
                  WG.push(Wr);
                  break;
                }
              }
            }
          }
          var WS;
          WM.tracks || (WM.tracks = []);
          for (let Wb = 0; Wb < WG.length; Wb++) {
            WM.tracks.push(WG[Wb]);
          }
          return WM;
        }

        const WC = WT;
        var Wq = Wl(9888),
          WE = Wl(393);
        const WP = (Wk) => {
          var WM = {
            file: (0, Wo.Dc)(WG, "url"),
            title: (0, Wg.dZ)(WG),
            mediaid: (0, Wg.dZ)(WG),
            date: (0, Wg.dZ)(WG),
            description: (0, Wg.dZ)(WG),
            link: (0, Wg.dZ)(WG)
          };
          for (let WS = 0; WS < Wk.childNodes.length; WS++) {
            var WG = Wk.childNodes[WS],
              Ww = (0, Wg.r1)(WG);
            if (Ww) {
              switch (Ww.toLowerCase()) {
                case "enclosure":
                  break;
                case "title":
                  break;
                case "guid":
                  break;
                case "pubdate":
                  break;
                case "description":
                  break;
                case "link":
                  break;
                case "category":
                  WM.tags ? (WM.tags += (0, Wg.dZ)(WG)) : (WM.tags = (0, Wg.dZ)(WG));
              }
            }
          }
          return new WE.Z(
            (function (WF, WH) {
              var WV = "default",
                Wb = [],
                WX = [],
                Wt = WH;
              for (let Wn = 0; Wn < WF.childNodes.length; Wn++) {
                var WA = WF.childNodes[Wn];
                if ("jwplayer" === WA.prefix) {
                  const Ws = (0, Wg.r1)(WA);
                  "source" === Ws
                    ? (delete WH.sources,
                      Wb.push({
                        file: (0, Wo.Dc)(WA, "file"),
                        default: (0, Wo.Dc)(WA, WV),
                        label: (0, Wo.Dc)(WA, "label"),
                        type: (0, Wo.Dc)(WA, "type")
                      }))
                    : "track" === Ws
                    ? (delete WH.tracks,
                      WX.push({
                        file: (0, Wo.Dc)(WA, "file"),
                        default: (0, Wo.Dc)(WA, WV),
                        kind: (0, Wo.Dc)(WA, "kind"),
                        label: (0, Wo.Dc)(WA, "label")
                      }))
                    : ((WH[Ws] = (0, Wq.serialize)((0, Wg.dZ)(WA))), "file" === Ws && WH.sources && delete WH.sources);
                }
                WH.file || (WH.file = WH.link);
              }
              if (Wb.length) {
                WH.sources = [];
                for (let WY = 0; WY < Wb.length; WY++) {
                  const Wh = Wb[WY];
                  0 < Wh.file.length && ((Wh[WV] = "true" === Wb[WY][WV]), Wh.label || delete Wh.label, Wt.sources.push(Wh));
                }
              }
              if (WX.length) {
                WH.tracks = [];
                for (let WK = 0; WK < WX.length; WK++) {
                  const Wm = WX[WK];
                  Wm.file &&
                    0 < Wm.file.length &&
                    ((Wm[WV] = "true" === WX[WK][WV]),
                    (Wm.kind = WX[WK].kind.length ? WX[WK].kind : "captions"),
                    Wm.label || delete Wm.label,
                    Wt.tracks.push(Wm));
                }
              }
              return Wt;
            })(Wk, WC(Wk, WM))
          );
        };
      },
      2557: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          t: () => Wg,
          u: () => Wo
        });

        class Wg {
          constructor(WT, WC) {
            this.defaultLanguage = WT;
            this.timestamps = WC;
          }
        }

        class Wo {
          constructor({ title: WT = {}, group: WC, time: Wq, image: WE }) {
            this.title = {};
            this.time = Wq;
            this.group = WC;
            this.image = WE;
            Object.keys(WT).forEach((WP) => {
              var Wk = WT[WP];
              this.addTitle(WP, Wk);
            });
          }

          ["addTitle"](WT, WC) {
            this.title[WT] = WC;
          }
        }
      },
      393: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => WE });
        var Wg = Wl(6053);

        function Wo(WP) {
          var Wk;
          if (WP && WP.file) {
            return (
              ((WP = Object.assign(
                {},
                {
                  kind: "captions",
                  default: false
                },
                WP
              )).kind = ((Wk = WP.kind), -1 !== WT.indexOf(Wk) ? WP.kind : "captions")),
              (WP.default = Boolean(WP.default)),
              WP
            );
          }
        }

        const WT = ["captions", "metadata", "thumbnails", "chapters"];
        var WC = Wl(9918);
        const Wq = Array.isArray,
          WE = function (WP) {
            Wq((WP = WP || {}).tracks) || delete WP.tracks;
            var Wk = Object.assign(
              {},
              {
                sources: [],
                tracks: [],
                minDvrWindow: WC.ni
              },
              WP
            );
            Wk.sources !== Object(Wk.sources) || Wq(Wk.sources) || (Wk.sources = [(0, Wg.Z)(Wk.sources)]);
            (Wq(Wk.sources) && 0 !== Wk.sources.length) || (WP.levels ? (Wk.sources = WP.levels) : (Wk.sources = [(0, Wg.Z)(WP)]));
            for (let Ww = 0; Ww < Wk.sources.length; Ww++) {
              var WM,
                WG = Wk.sources[Ww];
              WG &&
                ((WM = WG.default),
                (WG.default = !!WM && "true" === WM.toString()),
                Wk.sources[Ww].label || (Wk.sources[Ww].label = Ww.toString()),
                (Wk.sources[Ww] = (0, Wg.Z)(Wk.sources[Ww])));
            }
            return (
              (Wk.sources = Wk.sources.filter(Boolean)),
              Wq(Wk.tracks) || (Wk.tracks = []),
              Wq(Wk.captions) && ((Wk.tracks = Wk.tracks.concat(Wk.captions)), delete Wk.captions),
              (Wk.tracks = Wk.tracks.map(Wo).filter(Boolean)),
              Wk
            );
          };
      },
      7263: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => WP });
        var Wg = Wl(1643),
          Wo = Wl(7941),
          WT = Wl(6769),
          WC = Wl(6886),
          Wq = Wl(328),
          WE = Wl(4446);
        const WP = function () {
          function Wk(Ww) {
            try {
              const WS = Ww.responseXML ? Ww.responseXML.childNodes : null;
              let WF,
                WH = null;
              if (WS) {
                for (let WV = 0; WV < WS.length && 8 === (WH = WS[WV]).nodeType; WV++) {}
                if ((WH = WH && "xml" === (0, Wo.r1)(WH) ? WH.nextSibling : WH) && "rss" === (0, Wo.r1)(WH)) {
                  const Wr = (0, WT.Z)(WH);
                  WF = Object.assign({ playlist: Wr }, Wr.feedData);
                }
              }
              if (!WF) {
                try {
                  const Wb = JSON.parse(Ww.responseText);
                  if (Array.isArray(Wb)) {
                    WF = { playlist: Wb };
                  } else {
                    if (!Array.isArray(Wb.playlist)) {
                      throw Error("Playlist is not an array");
                    }
                    WF = Wb;
                  }
                } catch (WX) {
                  throw new WE.rG(WE.ul, 621, WX);
                }
              }
              WM.trigger(Wg.Ow, WF);
            } catch (Wt) {
              WG(Wt);
            }
          }

          const WM = Object.assign(this, Wq.ZP),
            WG = function (Ww) {
              Ww instanceof WE.rG && !Ww.code && (Ww = new WE.rG(WE.ul, 0));
              WM.trigger(Wg.pn, Ww);
            };
          this.load = function (Ww) {
            (0, WC.h)(Ww, Wk, (WS, WF, WH, WV) => {
              WG(WV);
            });
          };
          this.destroy = function () {
            this.off();
          };
        };
      },
      8320: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          ZP: () => Wr,
          s7: () => WS,
          T5: () => WV,
          YF: () => Ww,
          _: () => WF,
          bx: () => WH
        });
        const Wo = (Wb, WX) => (Wg[Wb] ? Wb : Wg[WX] ? WX : "metadata");
        var WT = Wl(393),
          WC = Wl(6053),
          Wq = Wl(2303),
          WE = Wl(4446);
        const WP = (Wb, WX) => (void 0 === Wb ? WX : Wb),
          Wk = (Wb, WX, Wt) => {
            Wt in WX && (Wb[Wt] = WX[Wt]);
          },
          WM = (Wb, WX) => {
            const Wt = WX.attributes,
              { sources: WA, allSources: Wn, preload: Ws, drm: WY } = Wb,
              Wh = WP(Wb.withCredentials, Wt.withCredentials);
            return (Wn || WA)
              .map(function (WK) {
                var Wm, WN, Wx;
                return WK !== Object(WK)
                  ? null
                  : (Wk(WK, Wt, "androidhls"),
                    Wk(WK, Wt, "hlsjsdefault"),
                    Wk(WK, Wt, "safarihlsjs"),
                    (Wx = WK),
                    (Wm = Wb),
                    (WN = Wt),
                    Wx.liveSyncDuration || ((Wm = Wm.liveSyncDuration ? Wm : WN), Wk(Wx, Wm, "liveSyncDuration")),
                    Wk(WK, Wt, "_hlsjsProgressive"),
                    (WK.preload = Wo(WK.preload, Ws)),
                    (WN = WK.drm || WY || Wt.drm) && (WK.drm = WN),
                    void 0 !== (Wx = WP(WK.withCredentials, Wh)) && (WK.withCredentials = Wx),
                    (0, WC.Z)(WK));
              })
              .filter(Boolean);
          },
          WG = (Wb, WX) => {
            var Wt = ((Ws, WY) => {
              for (let Wm = 0; Wm < Ws.length; Wm++) {
                var Wh = Ws[Wm],
                  WK = WY.choose(Wh).providerToCheck;
                if (WK) {
                  return {
                    type: Wh.type,
                    provider: WK
                  };
                }
              }
              return null;
            })(Wb, (WX = WX && WX.choose ? WX : new Wq.Z()));
            if (!Wt) {
              return [];
            }
            const WA = Wt.provider,
              Wn = Wt.type;
            return Wb.filter(function (Ws) {
              return Ws.type === Wn && WX.providerSupports(WA, Ws);
            });
          },
          Ww = (Wb, WX, Wt) => {
            var WA = Wb.getProviders(),
              Wn = Wb.get("preload"),
              Ws = Wb.get("jwStart"),
              WY = Object.assign({}, WX);
            if (((WY.preload = Wo(WX.preload, Wn)), (WY.allSources = WM(WY, Wb)), (WY.sources = WG(WY.allSources, WA)), WY.sources.length)) {
              return (
                (WY.file = WY.sources[0].file),
                (WY.feedData = Wt),
                Ws && -1 !== Ws && Wb.get("generateSEOMetadata") && (WY.starttime = Ws),
                (Wn = (WX = WY).sources[0].liveSyncDuration) && (WX.liveSyncDuration = WX.dvrSeekLimit = Wn),
                WX
              );
            }
          },
          WS = (Wb, WX, Wt) => {
            const WA = Object.assign({}, Wt);
            return delete WA.playlist, Wb.map((Wn) => Ww(WX, Wn, WA)).filter(Boolean);
          },
          WF = (Wb) => {
            if (!Array.isArray(Wb) || 0 === Wb.length) {
              throw new WE.rG(WE.ul, 630);
            }
          },
          WH = (Wb, WX) => {
            let Wt = (parseInt(Wb, 10) || 0) % WX;
            return Wt < 0 && (Wt += WX), Wt;
          },
          WV = (Wb, WX) => WG(WM(Wb, WX), WX.getProviders()),
          Wr = function (Wb) {
            return (Array.isArray(Wb) ? Wb : [Wb]).map(WT.Z);
          };
      },
      6053: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => WT });
        var Wg = Wl(7034),
          Wo = Wl(2957);
        const WT = function (WC) {
          if (WC && WC.file) {
            const WE = Object.assign(
              {},
              {
                default: false,
                type: ""
              },
              WC
            );
            var WC = /^[^/]+\/(?:x-)?([^/]+)$/,
              Wq = WE.type;
            if (
              (WC.test(Wq) && ((WE.mimeType = Wq), (WE.type = Wq.replace(WC, "$1"))),
              (0, Wg.isYouTube)(WE.file)
                ? (WE.type = "youtube")
                : (0, Wg.isRtmp)(WE.file)
                ? (WE.type = "rtmp")
                : WE.type || (WE.type = (0, Wo.AO)(WE.file)),
              WE.type)
            ) {
              switch (WE.type) {
                case "m3u8":
                case "vnd.apple.mpegurl":
                  break;
                case "dash+xml":
                  break;
                case "m4a":
                  break;
                case "smil":
              }
              return (
                Object.keys(WE).forEach(function (WP) {
                  "" === WE[WP] && delete WE[WP];
                }),
                WE
              );
            }
          }
        };
      },
      4101: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => Wk });
        var Wg = Wl(676),
          Wo = Wl(9888),
          WT = Wl(2957),
          WC = Wl(4446),
          Wq = Wl(3487);

        function WE(WM) {
          var WG, Ww;
          if ("string" == typeof WM) {
            return 0 < (WG = (WM = WM.split("?")[0]).indexOf("://"))
              ? 0
              : ((Ww = WM.indexOf("/")), (WM = (0, WT.AO)(WM)), !(WG < 0 && Ww < 0) || (WM && isNaN(WM)) ? 1 : 2);
          }
        }

        function WP(WM) {
          this.url = WM;
          this.promise_ = null;
        }

        Object.defineProperties(WP.prototype, {
          promise: {
            get() {
              return this.load();
            },
            set() {}
          }
        });
        Object.assign(WP.prototype, {
          load() {
            let WM = this.promise_;
            if (!WM) {
              if (2 === WE(this.url)) {
                return Promise.resolve(this);
              }
              var WG = new Wg.ZP(
                ((Ww) => {
                  switch (WE(Ww)) {
                    case 0:
                      return Ww;
                    case 1:
                      return (0, Wo.getAbsolutePath)(Ww, window.location.href);
                  }
                })(this.url)
              );
              this.loader = WG;
              WM = WG.load().then(() => this);
              this.promise_ = WM;
            }
            return WM;
          },
          registerPlugin(WM, WG, Ww) {
            this.name = WM;
            this.target = WG;
            this.js = Ww;
          },
          getNewInstance(WM, WG, Ww) {
            var WS = this.js;
            if ("function" != typeof WS) {
              throw new WC.rG(null, (0, Wq.bX)(this.url) + 100);
            }
            const WF = new WS(WM, WG, Ww);
            return (
              (WF.addToPlayer = function () {
                var WH = this.getContainer().querySelector(".jw-overlays");
                WH && ((Ww.left = WH.style.left), (Ww.top = WH.style.top), WH.appendChild(Ww));
              }),
              (WF.resizeHandler = function () {
                var WH = this.getContainer().querySelector(".jw-overlays");
                WH && WF.resize(WH.clientWidth, WH.clientHeight);
              }),
              WF
            );
          }
        });
        const Wk = WP;
      },
      1241: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          Z: () =>
            function (WM, WG) {
              var Ww = WM.get("plugins");
              return (
                (window.jwplayerPluginJsonp = Wk),
                (WM.pluginLoader = WM.pluginLoader || new WT()).load(WG, WP, Ww, WM).then((WS) => {
                  if (!WM.attributes["_destroyed"]) {
                    return delete window.jwplayerPluginJsonp, WS;
                  }
                })
              );
            },
          f: () => Wk
        });
        var Wg = Wl(4446),
          Wo = Wl(3487);
        const WT = function () {
          this.load = function (WM, WG, Ww, WS) {
            return Ww && "object" == typeof Ww
              ? Promise.all(
                  Object.keys(Ww)
                    .filter((WF) => WF)
                    .map((WF) => {
                      const WH = Ww[WF];
                      return WG.setupPlugin(WF)
                        .then((WV) => {
                          if (!WS.attributes["_destroyed"]) {
                            return (0, Wo.MK)(WV, WH, WM);
                          }
                        })
                        .catch((WV) => (WG.removePlugin(WF), WV.code ? WV : new Wg.rG(null, (0, Wo.bX)(WF), WV)));
                    })
                )
              : Promise.resolve();
          };
        };
        var WC = Wl(4101),
          Wq = Wl(5499);
        const WE = {
            length: 0,
            file: (0, Wo.fy)("" + WE.file),
            type: "hls",
            type: "dash",
            type: "aac",
            type: "rtmp"
          },
          WP = new (class {
            ["setupPlugin"](WM) {
              var WG = this.getPlugin(WM);
              return WG
                ? (WG.url !== WM && (0, Wq.c)('JW Plugin "' + (0, Wo.Nq)(WM) + '" already loaded from "' + WG.url + '". Ignoring "' + WM + '."'),
                  WG.promise)
                : this.addPlugin(WM).load();
            }

            ["addPlugin"](WM) {
              var WG = (0, Wo.Nq)(WM);
              let Ww = WE[WG];
              return Ww || ((Ww = new WC.Z(WM)), (WE[WG] = Ww)), Ww;
            }

            ["getPlugin"](WM) {
              return WE[(0, Wo.Nq)(WM)];
            }

            ["removePlugin"](WM) {
              delete WE[(0, Wo.Nq)(WM)];
            }

            ["getPlugins"]() {
              return WE;
            }
          })(),
          Wk = function (WM, WG, Ww) {
            var WS = WP.addPlugin(WM);
            WS.js || WS.registerPlugin(WM, WG, Ww);
          };
      },
      7164: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          MK: () => WC,
          Nq: () => Wo,
          bX: () => WT
        });
        var Wg = Wl(5950);
        const Wo = function (Wq) {
            var WE = /\/((.(?!\/))+?)\.js/i.exec(Wq),
              WE = (null == WE ? void 0 : WE[1]) || Wq;
            return WE && "jwpsrv-dnt" === WE ? "jwpsrv" : WE;
          },
          WT = (Wq) => 305000,
          WC = (Wq, WE, WP) => {
            var Wk = Wq.name,
              WE = Object.assign({}, WE, (0, Wg.vl)(Wq.url)),
              WM = document.createElement("div"),
              Wq = ((WM.id = WP.id + "_" + Wk), (WM.className = "jw-plugin jw-reset"), Wq.getNewInstance(WP, WE, WM));
            return WP.addPlugin(Wk, Wq), Wq;
          };
      },
      7683: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          V: () => WT,
          Z: () =>
            function () {
              const WC = Wg.Jx,
                Wq = [],
                WE = [];
              for (let WG = 0; WG < WC; WG++) {
                const Ww = WT();
                Wq.push(Ww);
                WE.push(Ww);
                Wo(Ww);
              }
              const WP = WE.shift(),
                Wk = WE.shift();
              let WM = false;
              return {
                primed: () => WM,
                prime() {
                  Wq.forEach(Wo);
                  WM = true;
                },
                played() {
                  WM = true;
                },
                getPrimedElement: () => WE.shift() || null,
                getAdElement: () => WP,
                getTestElement: () => Wk,
                clean(WS) {
                  if (WS.src) {
                    WS.removeAttribute("src");
                    try {
                      WS.load();
                    } catch (WF) {}
                  }
                },
                recycle(WS) {
                  WS && !WE.some((WF) => WF === WS) && (this.clean(WS), WE.push(WS));
                },
                syncVolume(WS) {
                  const WF = Math.min(Math.max(0, WS / 100), 1);
                  Wq.forEach((WH) => {
                    WH.volume = WF;
                  });
                },
                syncMute(WS) {
                  Wq.forEach((WF) => {
                    WF.muted = WS;
                  });
                }
              };
            }
        });
        var Wg = Wl(658);
        const Wo = (WC) => {
            WC.src || WC.load();
          },
          WT = (WC) => {
            const Wq = document.createElement("video");
            return (
              (Wq.className = "jw-video jw-reset"),
              Wq.setAttribute("tabindex", "-1"),
              Wq.setAttribute("disableRemotePlayback", ""),
              Wq.setAttribute("webkit-playsinline", ""),
              Wq.setAttribute("playsinline", ""),
              WC &&
                Object.keys(WC).forEach((WE) => {
                  Wq.setAttribute(WE, WC[WE]);
                }),
              Wq
            );
          };
      },
      658: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          HB: () => 1,
          Jx: () => 4,
          l_: () => 5
        });
      },
      4609: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          Z: () =>
            function (Wg, Wo) {
              return Object.assign({}, Wo, {
                prime() {
                  Wg.src || Wg.load();
                },
                getPrimedElement: () => Wg,
                clean() {
                  Wo.clean(Wg);
                },
                recycle() {
                  Wo.clean(Wg);
                }
              });
            }
        });
      },
      6528: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => WE });
        var Wg = Wl(1643),
          Wo = Wl(1384);

        function WT() {}

        const WC = () => false,
          Wq = { name: "default" },
          WE = {
            supports: WC,
            play: WT,
            pause: WT,
            preload: WT,
            load: WT,
            stop: WT,
            volume: WT,
            mute: WT,
            seek: WT,
            resize: WT,
            remove: WT,
            destroy: WT,
            setVisibility: WT,
            setFullscreen(WP) {
              return (0, Wo.CX)(this, WP);
            },
            getFullscreen: WC,
            supportsFullscreen: WC,
            getContainer: WT,
            setContainer: WT,
            getName: () => Wq,
            getQualityLevels: WT,
            getCurrentQuality: WT,
            setCurrentQuality: WT,
            getAudioTracks: WT,
            getCurrentAudioTrack: WT,
            setCurrentAudioTrack: WT,
            getSeekRange() {
              return {
                start: 0,
                end: this.getDuration()
              };
            },
            setPlaybackRate: WT,
            getPlaybackRate: () => 1,
            getBandwidthEstimate: () => null,
            getLiveLatency: () => null,
            attachMedia: WT,
            detachMedia: WT,
            init: WT,
            setState(WP) {
              this.state = WP;
              this.trigger(Wg.uc, { newstate: WP });
            },
            sendMediaType(WP) {
              var { type: WP, mimeType: Wk } = WP[0],
                WP = "aac" === WP || "mp3" === WP || "mpeg" === WP || (Wk && 0 === Wk.indexOf("audio/"));
              this.trigger(Wg.oZ, { mediaType: WP ? "audio" : "video" });
            },
            getDuration: () => 0,
            trigger: WT
          };
      },
      1628: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { V: () => Wo });
        var Wg = Wl(8348);
        const Wo = (WT) =>
          "hls" === WT.type && Wg.OS.android
            ? false !== WT.androidhls && !Wg.Browser.firefox && 4.4 <= parseFloat(Wg.OS.version.version || "0")
            : null;
      },
      12: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { U: () => Wg });
        const Wg = {};
      },
      670: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          Z: () =>
            function (Wq) {
              var WE = Wq.getName().name;
              if (!Wg.U[WE]) {
                if (!(0, WC.sE)(Wo.B, (0, WC.wB)({ name: WE }))) {
                  if (!(0, WC.mf)(Wq.supports)) {
                    throw new Error("Tried to register a provider with an invalid object");
                  }
                  Wo.B.unshift({
                    name: WE,
                    supports: Wq.supports
                  });
                }
                (0, WC.ce)(Wq.prototype, WT.Z);
                Wg.U[WE] = Wq;
              }
            }
        });
        var Wg = Wl(12),
          Wo = Wl(2963),
          WT = Wl(6528),
          WC = Wl(6042);
        Wl(328);
      },
      6593: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          B: () => WE,
          H: () => Wq
        });
        var Wg = Wl(1628),
          Wo = Wl(7034),
          WT = Wl(9025);
        const WC = {
            aac: "audio/mp4",
            mp4: "video/mp4",
            f4v: "video/mp4",
            m4v: "video/mp4",
            mov: "video/mp4",
            mp3: "audio/mpeg",
            mpeg: "audio/mpeg",
            ogv: "video/ogg",
            ogg: "video/ogg",
            oga: "video/ogg",
            vorbis: "video/ogg",
            webm: "video/webm",
            f4a: "video/aac",
            m3u8: "application/vnd.apple.mpegurl",
            m3u: "application/vnd.apple.mpegurl",
            hls: "application/vnd.apple.mpegurl"
          },
          Wq = (WP) => {
            if (!WT.Z || !WT.Z.canPlayType) {
              return false;
            }
            if (false === (0, Wg.V)(WP)) {
              return false;
            }
            var Wk = WP.file,
              WM = WP.type;
            if ((0, Wo.isRtmp)(Wk, WM)) {
              return false;
            }
            let WG = WP.mimeType || WC[WM];
            return !!WG && (null != (Wk = WP.mediaTypes) && Wk.length && (WG = [WG].concat(Wk.slice()).join("; ")), Boolean(WT.Z.canPlayType(WG)));
          },
          WE = [
            {
              name: "html5",
              supports: Wq
            }
          ];
      },
      1384: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          CX: () => WP,
          IP: () => WM,
          If: () => WE,
          Nm: () => Wk
        });
        var Wg = Wl(1643);
        let Wo,
          WT,
          WC = false;

        function Wq(WG, Ww, WS) {
          WC = WS;
          WG.trigger(Wg.h7, {
            target: Ww.target,
            jwstate: WS
          });
        }

        const WE = () => WC,
          WP = function (WG, Ww) {
            if ((Ww = Boolean(Ww))) {
              try {
                const WF = WG.video.webkitEnterFullscreen || WG.video.webkitEnterFullScreen;
                WF && WF.apply(WG.video);
              } catch (WH) {
                return false;
              }
              return WG.getFullscreen();
            }
            var WS = WG.video.webkitExitFullscreen || WG.video.webkitExitFullScreen;
            return WS && WS.apply(WG.video), Ww;
          },
          Wk = function (WG, Ww) {
            Wo = (WS) => Wq(WG, WS, true);
            WT = (WS) => Wq(WG, WS, false);
            Ww.addEventListener("webkitbeginfullscreen", Wo);
            Ww.addEventListener("webkitendfullscreen", WT);
          },
          WM = (WG) => {
            WG.removeEventListener("webkitbeginfullscreen", Wo);
            WG.removeEventListener("webkitendfullscreen", WT);
          };
      },
      6875: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => Wg });
        const Wg =
          "hidden" in document
            ? function () {
                return !document.hidden;
              }
            : "webkitHidden" in document
            ? function () {
                return !document.webkitHidden;
              }
            : function () {
                return true;
              };
      },
      6886: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          E: () => Wq,
          h: () => WG
        });
        var Wg = Wl(9888),
          Wo = Wl(7034),
          WT = Wl(4446);

        function WC() {}

        const Wq = (Ww) => {
            "abort" in Ww && Ww.abort();
          },
          WE = (Ww, WS, WF, WH) => {
            Ww.onerror(WS, Ww.url, Ww.xhr, new WT.rG(WS, WF, WH));
          },
          WP = (Ww, WS, WF) => {
            var WH = WS.documentElement;
            if (!WF.requireValidXML || ("parsererror" !== WH.nodeName && !WH.getElementsByTagName("parsererror").length)) {
              return Ww.responseXML || (Ww = Object.assign({}, Ww, { responseXML: WS })), WF.oncomplete(Ww);
            }
            WE(WF, WT.ul, 601);
          },
          Wk = (Ww) =>
            function (WS) {
              WS = WS.currentTarget || Ww.xhr;
              if ((clearTimeout(Ww.timeoutId), Ww.responseType)) {
                if ("json" === Ww.responseType) {
                  var WF = WS,
                    WH = Ww;
                  if (!WF.response || ("string" == typeof WF.response && '"' !== WF.responseText.substr(1))) {
                    try {
                      WF = Object.assign({}, WF, {
                        response: JSON.parse(WF.responseText)
                      });
                    } catch (WV) {
                      return void WE(WH, WT.ul, 611, WV);
                    }
                  }
                  return WH.oncomplete(WF);
                  return;
                }
              } else {
                let Wr,
                  Wb = WS.responseXML;
                if (Wb) {
                  try {
                    Wr = Wb.firstChild;
                  } catch (WX) {}
                }
                if (Wb && Wr) {
                  return WP(WS, Wb, Ww);
                }
                if (Ww.useDomParser && WS.responseText && !Wb && null != (Wb = (0, Wg.parseXML)(WS.responseText)) && Wb.firstChild) {
                  return WP(WS, Wb, Ww);
                }
                if (Ww.requireValidXML) {
                  return void WE(Ww, WT.ul, 602);
                }
              }
              Ww.oncomplete(WS);
            };
        let WM;
        const WG = (Ww, WS, WF, WH) => {
          var WV;
          let Wr;
          Ww === Object(Ww) && (Ww = (WH = Ww).url);
          const Wb = Object.assign(
              {
                xhr: null,
                url: Ww,
                withCredentials: false,
                retryWithoutCredentials: false,
                timeout: 60000,
                timeoutId: -1,
                oncomplete: WS || WC,
                onerror: WF || WC,
                mimeType: WH && !WH.responseType ? "text/xml" : "",
                requireValidXML: false,
                responseType: null != WH && WH.plainText ? "text" : "",
                useDomParser: false,
                requestFilter: null
              },
              WH
            ),
            WX = WM("Error loading file", Wb);
          if ("XMLHttpRequest" in window) {
            if (((Wr = Wb.xhr = Wb.xhr || new window.XMLHttpRequest()), "function" == typeof Wb.requestFilter)) {
              let Wt;
              try {
                Wt = Wb.requestFilter({
                  url: Ww,
                  xhr: Wr
                });
              } catch (WA) {
                return WX(WA, 5), Wr;
              }
              Wt && "open" in Wt && "send" in Wt && (Wr = Wb.xhr = Wt);
            }
            Wr.onreadystatechange =
              ((WV = Wb),
              function (Wn) {
                var Ws = Wn.currentTarget || WV.xhr;
                if (4 === Ws.readyState) {
                  clearTimeout(WV.timeoutId);
                  Ws = Ws.status;
                  if (!(400 <= Ws)) {
                    return 200 === Ws
                      ? Wk(WV)(Wn)
                      : void (0 === Ws && (0, Wo.isFileProtocol)() && !/^[a-z][a-z0-9+.-]*:/.test(WV.url) && WE(WV, WT.ul, 7));
                  }
                  WE(WV, WT.ul, Ws < 600 ? Ws : 6);
                }
              });
            Wr.onerror = WX;
            "overrideMimeType" in Wr ? Wb.mimeType && Wr.overrideMimeType(Wb.mimeType) : (Wb.useDomParser = true);
            try {
              Ww = Ww.replace(/#.*$/, "");
              Wr.open("GET", Ww, true);
            } catch (Wn) {
              return WX(Wn, 3), Wr;
            }
            if (Wb.responseType) {
              try {
                Wr.responseType = Wb.responseType;
              } catch (Ws) {}
            }
            Wb.timeout &&
              ((Wb.timeoutId = setTimeout(function () {
                Wq(Wr);
                WE(Wb, WT.ud, 1);
              }, Wb.timeout)),
              (Wr.onabort = function () {
                clearTimeout(Wb.timeoutId);
              }));
            try {
              Wb.withCredentials && "withCredentials" in Wr && (Wr.withCredentials = true);
              Wr.send();
            } catch (WY) {
              WX(WY, 4);
            }
            return Wr;
          }
          WE(Wb, WT.ud, 2);
        };
        WM = (Ww, WS) =>
          function (WF, WH) {
            var WV = WF.currentTarget || WS.xhr;
            if ((clearTimeout(WS.timeoutId), WS.retryWithoutCredentials && WS.xhr.withCredentials)) {
              Wq(WV);
              const Wr = Object.assign({}, WS, {
                xhr: null,
                withCredentials: false,
                retryWithoutCredentials: false
              });
              WG(Wr);
            } else {
              !WH && 400 <= WV.status && WV.status < 600 && (WH = WV.status);
              WE(WS, WH ? WT.ul : WT.ud, WH || 6, WF);
            }
          };
      },
      328: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          IH: () => WP,
          S1: () => Wk,
          X$: () => WM,
          ZP: () => Wq,
          on: () => WE,
          wj: () => WG
        });
        var Wg = function (Ww, WS) {
          if (null == Ww) {
            throw new TypeError("Cannot convert undefined or null to object");
          }
          return Object.prototype.hasOwnProperty.call(Object(Ww), WS);
        };
        const Wo = (Ww, WS, WF, WH) => {
            let WV = -1;
            const Wr = Ww.length;
            for (; ++WV < Wr; ) {
              const Wb = Ww[WV];
              if (WH) {
                try {
                  Wb.callback.apply(Wb.context || WF, WS);
                } catch (WX) {
                  console.log('Error in "' + WH + '" event handler:', WX);
                }
              } else {
                Wb.callback.apply(Wb.context || WF, WS);
              }
            }
          },
          WC = (Ww, WS, WF, WH) => {
            if (WF) {
              if ("object" == typeof WF) {
                for (const WV in WF) Wg(WF, WV) && Ww[WS].apply(Ww, [WV, WF[WV]].concat(WH));
                return false;
              }
              if (/\s+/.test(WF)) {
                const Wr = WF.split(/\s+/);
                for (let Wb = 0, WX = Wr.length; Wb < WX; Wb++) {
                  Ww[WS].apply(Ww, [Wr[Wb]].concat(WH));
                }
                return false;
              }
            }
            return true;
          };

        class Wq {
          ["on"](Ww, WS, WF) {
            var WH;
            return (
              WC(this, "on", Ww, [WS, WF]) &&
                WS &&
                ((WH = this["_events"] || (this["_events"] = {}))[Ww] || (WH[Ww] = [])).push({
                  callback: WS,
                  context: WF
                }),
              this
            );
          }

          ["once"](Ww, WS, WF) {
            if (!WC(this, "once", Ww, [WS, WF]) || !WS) {
              return this;
            }
            let WH = 0;

            function WV() {
              WH++ || (Wr.off(Ww, WV), WS.apply(this, arguments));
            }

            const Wr = this;
            return (WV["_callback"] = WS), this.on(Ww, WV, WF);
          }

          ["off"](Ww, WS, WF) {
            if (this["_events"] && WC(this, "off", Ww, [WS, WF])) {
              if (Ww || WS || WF) {
                const Wr = Ww ? [Ww] : Object.keys(this["_events"]);
                for (let Wb = 0, WX = Wr.length; Wb < WX; Wb++) {
                  Ww = Wr[Wb];
                  var WH = this["_events"][Ww];
                  if (WH) {
                    const Wt = (this["_events"][Ww] = []);
                    if (WS || WF) {
                      for (let WA = 0, Wn = WH.length; WA < Wn; WA++) {
                        var WV = WH[WA];
                        ((WS && WS !== WV.callback && WS !== WV.callback["_callback"]) || (WF && WF !== WV.context)) && Wt.push(WV);
                      }
                    }
                    Wt.length || delete this["_events"][Ww];
                  }
                }
              } else {
                delete this["_events"];
              }
            }
            return this;
          }

          ["trigger"](Ww, ...WS) {
            var WF;
            return (
              this["_events"] &&
                WC(this, "trigger", Ww, WS) &&
                ((Ww = this["_events"][Ww]), (WF = this["_events"].all), Ww && Wo(Ww, WS, this), WF) &&
                Wo(WF, arguments, this),
              this
            );
          }

          ["triggerSafe"](Ww, ...WS) {
            var WF, WH;
            return (
              this["_events"] &&
                WC(this, "trigger", Ww, WS) &&
                ((WF = this["_events"][Ww]), (WH = this["_events"].all), WF && Wo(WF, WS, this, Ww), WH) &&
                Wo(WH, arguments, this, Ww),
              this
            );
          }
        }

        const WE = Wq.prototype.on,
          WP = Wq.prototype.once,
          Wk = Wq.prototype.off,
          WM = Wq.prototype.trigger,
          WG = Wq.prototype.triggerSafe;
        Wq.on = WE;
        Wq.once = WP;
        Wq.off = Wk;
        Wq.trigger = WM;
      },
      2268: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          A: () => WM,
          DF: () => WP,
          Dt: () => Wr,
          G6: () => WH,
          NO: () => WA,
          O7: () => Wb,
          Q6: () => Ww,
          cL: () => Wt,
          dI: () => Wn,
          gn: () => WV,
          i7: () => WS,
          id: () => WE,
          pZ: () => WT,
          tq: () => WX,
          un: () => Wk,
          w1: () => WF,
          xb: () => WC,
          yS: () => WG,
          zc: () => Wq
        });
        const Wg = (Ws) => null !== navigator.userAgent.match(Ws),
          Wo = () => "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints,
          WT = () => Wg(/firefox\//i),
          WC = () => Wg(/iP(hone|od)/i),
          Wq = () => Wg(/iPad/i) || Wo(),
          WE = () => Wg(/Macintosh/i) && !Wo(),
          WP = () => Wg(/FBAV/i),
          Wk = () => Wg(/\sEdge?\/\d+/i),
          WM = () => Wg(/msie/i),
          WG = () => Wg(/SMART-TV/),
          Ww = () => WG() && !Wg(/SamsungBrowser/),
          WS = () => Wg(/\s(?:(?:Headless)?Chrome|CriOS)\//i) && !Wk() && !Wg(/UCBrowser/i),
          WF = () => !Wg(/\sEdg\/\d+/i) && (Wk() || Wg(/trident\/.+rv:\s*11/i) || WM()),
          WH = () => Wg(/safari/i) && !Wg(/(?:Chrome|CriOS|chromium|android|phantom)/i) && !WG(),
          WV = () => Wg(/iP(hone|ad|od)/i) || Wo(),
          Wr = function () {
            return "boolean" == typeof Wr.mock_ ? Wr.mock_ : Wg(/Android/i) && !Wg(/Windows Phone/i);
          },
          Wb = () => !(Wg(/chrome\/[123456789]/i) && !Wg(/chrome\/18/i) && !WT()) && Wr(),
          WX = ((Wr.mock_ = null), () => WV() || Wr() || Wg(/Windows Phone/i)),
          Wt = function () {
            if ("boolean" == typeof Wt.mock_) {
              return Wt.mock_;
            }
            try {
              return window.self !== window.top;
            } catch (Ws) {
              return true;
            }
          },
          WA = ((Wt.mock_ = null), () => false),
          Wn = () => 0;
      },
      8381: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          $W: () => WC,
          Mf: () => WE,
          T2: () => WP,
          _b: () => Wq
        });
        var Wg = Wl(8518),
          Wo = Wl(2557),
          WT = Wl(4446);
        const WC = function (Wk, WM) {
            const WG = [];
            if (Wk && Wk.timestamps && Wk.timestamps.length) {
              const Ww = Wk.timestamps.sort((WS, WF) => WS.begin - WF.begin);
              Ww.forEach((WS, WF) => {
                var WH = ((Wb, WX = "en") => {
                    let Wt = (0, Wg.G3)();
                    for (var WA = Object.keys(Wb.title), Wn = WA[0]; !Wb.title[Wt]; ) {
                      const Ws = WA.find(
                        (
                          (Wh) => (WK) =>
                            0 === WK.indexOf(Wh)
                        )(Wt)
                      );
                      if (Ws) {
                        Wt = Ws;
                        break;
                      }
                      const WY = Wt.lastIndexOf("-");
                      if (WY <= 0) {
                        Wt = null;
                        break;
                      }
                      Wt = Wt.slice(0, WY);
                    }
                    return Wt || (0 <= WA.indexOf(WX) ? WX : Wn);
                  })(WS, Wk.defaultLanguage),
                  WH = WS.title[WH],
                  WV = WS.time,
                  WS = WS.image;
                let Wr = WM;
                WS && (WV.image = WS);
                WG.push(WV);
                WS && (WV.image = WS), WG.push(WV);
              });
            }
            return WG;
          },
          Wq = function (Wk, WM) {
            const WG = (0, Wg.G3)(),
              Ww = Wk.reduce(function (WS, WF) {
                var WH;
                return (
                  (WF && WF.cueType && "chapters" !== WF.cueType) ||
                    ((WH = new Wo.u({
                      time: WF.begin,
                      image: WF.image
                    })).addTitle(WG, WF.text),
                    WS.push(WH)),
                  WS
                );
              }, []);
            return WM ? ((WM.timestamps = Ww), WM) : new Wo.t(WG, Ww);
          },
          WE = function (Wk, WM) {
            if ("number" != typeof Wk || Wk < 0 || !WM || !WM.length) {
              return null;
            }
            let WG = null;
            for (let WS = 0; WS < WM.length; WS++) {
              var Ww = WM[WS];
              Ww.time > Wk || ((!WG || Ww.time > WG.time) && (WG = Ww));
            }
            return WG;
          },
          WP = function (Wk, WM) {
            let WG = true;
            return (
              Wk.forEach((Ww) => {
                !Ww ||
                  (Ww.defaultLanguage && Ww.timestamps && !Ww.timestamps.some((WS) => !WS.title || null === WS.time || void 0 === WS.time)) ||
                  (WG = false);
              }),
              WM(WG ? null : (0, WT.l9)(new Error(), WT.aD))
            );
          };
      },
      974: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          HY: () => WM,
          iv: () => WE,
          oB: () => Wq,
          oI: () => WC,
          vs: () => WP
        });

        function Wg(WG, Ww) {
          if (null == WG) {
            throw new TypeError("Cannot convert undefined or null to object");
          }
          return Object.prototype.hasOwnProperty.call(Object(WG), Ww);
        }

        var Wo = Wl(2957),
          Wu = Wl(9563),
          WT = Wl.n(Wu);
        const WC = WT().clear,
          Wq = (WG, Ww) => {
            if (null != WG) {
              let Wb;
              void 0 === WG.length && (WG = [WG]);
              var WS,
                WF,
                WH = {
                  height: 1,
                  width: 1
                };
              for (Wb in Ww)
                Wg(Ww, Wb) &&
                  (WH[Wb] =
                    ((WS = Wb),
                    (WF = Ww[Wb]),
                    "" === WF || null == WF
                      ? ""
                      : "string" == typeof WF && isNaN(WF)
                      ? /png|gif|jpe?g/i.test(WF) && WF.indexOf("url") < 0
                        ? "url(" + WF + ")"
                        : WF
                      : 0 === WF || "z-index" === WS || "opacity" === WS
                      ? "" + WF
                      : /color/i.test(WS)
                      ? "#" + (0, Wo.vk)(WF.toString(16).replace(/^0x/i, ""), 6)
                      : Math.ceil(WF) + "px"));
              for (let WX = 0; WX < WG.length; WX++) {
                var WV,
                  Wr = WG[WX];
                if (null != Wr) {
                  for (Wb in WH)
                    Wg(WH, Wb) &&
                      ((WV = ((Wt) => {
                        Wt = Wt.split("-");
                        for (let WA = 1; WA < Wt.length; WA++) {}
                        return Wt.join("");
                      })(Wb)),
                      Wr.style[WV] !== WH[Wb]) &&
                      (Wr.style[WV] = WH[Wb]);
                }
              }
            }
          },
          WE = (WG, Ww, WS, WF) => {
            WS = WS || "all-players";
            let WH = "";
            if ("object" == typeof Ww) {
              const WV = document.createElement("div");
              Wq(WV, Ww);
              let Wr = WV.style.cssText;
              Wg(Ww, "content") && (Wr = Wr && Wr + ' content: "' + Ww.content + '";');
              WF && (Wr = Wr && Wr.replace(/;/g, " !important;"));
              WH = "{" + Wr + "}";
            } else {
              "string" == typeof Ww && (WH = Ww);
            }
            "" !== WH && "{}" !== WH ? WT().style([[WG, WG + WH]], WS) : WT().clear(WS, WG);
          },
          WP = (WG, Ww) => {
            Wq(WG, { transform: Ww });
          };
        let Wk;
        const WM = (WG, Ww) => {
          let WS = "rgb";
          var WF = void 0 !== Ww && 100 !== Ww;
          if ((WF && (WS += "a"), !Wk)) {
            const WH = document.createElement("canvas");
            Wk = WH.getContext("2d");
          }
          WG ? isNaN(parseInt(WG, 16)) || (WG = "#" + WG) : (WG = "#000000");
          Wk.clearRect(0, 0, 1, 1);
          Wk.fillRect(0, 0, 1, 1);
          WG = Wk.getImageData(0, 0, 1, 1).data;
          return (WS += "(" + WG[0] + ", " + WG[1] + ", " + WG[2]), WF && (WS += ", " + Ww / 100), WS + ")";
        };
      },
      5004: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { z: () => Wg });
        const Wg =
          Date.now ||
          function () {
            return new Date().getTime();
          };
      },
      2799: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          A8: () => Wm,
          AH: () => Wx,
          EU: () => WF,
          FK: () => WV,
          IV: () => WA,
          L_: () => Wn,
          P$: () => WY,
          SH: () => WN,
          UM: () => Wy,
          Ww: () => Wi,
          az: () => WS,
          bJ: () => Ww,
          cS: () => WK,
          cn: () => Wt,
          gB: () => WG,
          i3: () => WI,
          kq: () => Wh,
          nG: () => Wc,
          nh: () => WH,
          oH: () => Wk,
          og: () => Ws,
          pv: () => WP,
          s1: () => WX
        });
        var Wg = Wl(2957),
          Wo = Wl(6042),
          WT = Wl(8348);
        const WC = window.DOMParser;
        let Wq,
          WE = true;
        const WP = (WU, WL) => WU.classList.contains(WL),
          Wk = (WU) => {
            var WL = WU.querySelectorAll("script,object,iframe,meta");
            for (let Wv = WL.length; Wv--; ) {
              var Wd = WL[Wv];
              Wd.parentNode.removeChild(Wd);
            }
            return WU;
          },
          WG = (WU) => {
            var WL = WU.attributes;
            for (let WO = WL.length; WO--; ) {
              var Wd,
                Wv = WL[WO].name;
              /^on/.test(Wv) && WU.removeAttribute(Wv);
              /href/.test(Wv) &&
                ((Wd = WL[WO].value),
                (!/javascript:|javascript&colon;/.test(Wd) &&
                  /^((((https?):\/\/)|(mailto:))(%[0-9A-Fa-f]{2}|[-()_.!~*';/?:@&=+$,A-Za-z0-9])+)([).!';/?:,][[:blank:|:blank:]])?$/.test(Wd)) ||
                  (WU.removeAttribute(Wv), console.warn("Invalid or unsafe URL")));
            }
            return WU;
          },
          Ww = (WU) => {
            WU = WU;
            Wq ||
              ((Wq = new WC()),
              (WE = (() => {
                try {
                  if (Wq.parseFromString("", "text/html")) {
                    return true;
                  }
                } catch (WO) {}
                return false;
              })()));
            const WL = (
              WE
                ? Wq.parseFromString(WU, "text/html")
                : ((Wd = document.implementation.createHTMLDocument("")),
                  -1 < WU.toLowerCase().indexOf("<!doctype") ? (Wd.documentElement.innerHTML = WU) : (Wd.body.innerHTML = WU),
                  Wd)
            ).body;
            Wk(WL);
            var Wd,
              Wv = WL.querySelectorAll("*");
            for (let WO = Wv.length; WO--; ) {
              const Wz = Wv[WO];
              WG(Wz);
            }
            return WL;
          },
          WS = (WU) => Ww(WU).firstChild,
          WF = (WU) => {
            for (; WU.firstChild; ) {
              WU.removeChild(WU.firstChild);
            }
          },
          WH = (WU, WL) => {
            WF(WU);
            if (WL) {
              var Wd = document.createDocumentFragment(),
                Wv = Ww(WL).childNodes;
              for (let WO = 0; WO < Wv.length; WO++) {
                Wd.appendChild(Wv[WO].cloneNode(true));
              }
              WU.appendChild(Wd);
            }
          },
          WV = (WU) => WU + (0 < WU.toString().indexOf("%") ? "" : "px"),
          Wr = (WU) => ((0, Wo.HD)(WU.className) ? WU.className.split(" ") : []),
          Wb = (WU, WL) => {
            WL = (0, Wg.fy)(WL);
            WU.className !== WL && (WU.className = WL);
          },
          WX = (WU) => WU.classList || Wr(WU),
          Wt = (WU, WL) => {
            const Wd = Wr(WU);
            (Array.isArray(WL) ? WL : WL.split(" ")).forEach(function (Wv) {
              (0, Wo.r3)(Wd, Wv) || Wd.push(Wv);
            });
            Wb(WU, Wd.join(" "));
          },
          WA = (WU, WL) => {
            var Wd = Wr(WU),
              WL = Array.isArray(WL) ? WL : WL.split(" ");
            Wb(WU, (0, Wo.e5)(Wd, WL).join(" "));
          },
          Wn = (WU, WL, Wd) => {
            let Wv = WU.className || "";
            WL.test(Wv) ? (Wv = Wv.replace(WL, Wd)) : Wd && (Wv += " " + Wd);
            Wb(WU, Wv);
          },
          Ws = (WU, WL, Wd) => {
            var Wv = WP(WU, WL);
            (Wd = (0, Wo.jn)(Wd) ? Wd : !Wv) !== Wv && (Wd ? Wt : WA)(WU, WL);
          },
          WY = (WU, WL, Wd) => {
            WU.setAttribute(WL, Wd);
          },
          Wh = (WU) => {
            var WL = document.createElement("link");
            WL.rel = "stylesheet";
            WL.href = WU;
            document.getElementsByTagName("head")[0].appendChild(WL);
          },
          WK = (WU) => {
            WU && WF(WU);
          },
          Wm = (WU) => {
            var WL, Wd;
            return (
              WU &&
                document.body.contains(WU) &&
                ((WU = WU.getBoundingClientRect()),
                (WL = window.pageYOffset),
                (Wd = window.pageXOffset),
                WU.width || WU.height || WU.left || WU.top) &&
                ((Wv.left = WU.left + Wd),
                (Wv.right = WU.right + Wd),
                (Wv.top = WU.top + WL),
                (Wv.bottom = WU.bottom + WL),
                (Wv.width = WU.right - WU.left),
                (Wv.height = WU.bottom - WU.top)),
              Wv
            );
          },
          WN = (WU, WL) => {
            WU.insertBefore(WL, WU.firstChild);
          },
          Wx = (WU) => WU.nextElementSibling,
          WI = (WU) => WU.previousElementSibling,
          Wc = (WU, WL, Wd = {}, Wv = document) => {
            if (/^((((https?):\/\/)|(mailto:))(%[0-9A-Fa-f]{2}|[-()_.!~*';/?:@&=+$,A-Za-z0-9])+)([).!';/?:,][[:blank:|:blank:]])?$/.test(WU)) {
              let WO = Wv.createElement("a");
              WO.href = WU;
              WO.target = WL;
              WO = WG(Object.assign(WO, Wd));
              WT.Browser.firefox
                ? WO.dispatchEvent(
                    new MouseEvent("click", {
                      bubbles: true,
                      cancelable: true,
                      view: window
                    })
                  )
                : WO.click();
            }
          },
          Wy = () => {
            var WU = window.screen.orientation;
            return (
              (!!WU && ("landscape-primary" === WU.type || "landscape-secondary" === WU.type)) ||
              90 === window.orientation ||
              -90 === window.orientation
            );
          },
          Wi = (WU) => {
            return (
              (WU = WU),
              ((WL = document.createElement("textarea")).innerHTML = WU),
              WL.value
                .replace(/&|<|>|"|''/gm, function (Wd) {
                  return "&#" + Wd.charCodeAt(0) + ";";
                })
                .replace(/&#60;(\/?)(b|strong|i|em|p|br|ul|ol|li|h.)&#62;/gim, "<$1$2>")
            );
            var WL;
          };
      },
      4429: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => WH });
        var Wu = Wl(1569),
          Wg = Wl(7034),
          Wo = Wl(9888),
          WT = Wl(2957),
          WC = Wl(7411),
          Wq = Wl(4742);

        function WE(WV, Wr) {
          this.name = WV;
          this.message = Wr.message || Wr.toString();
          this.error = Wr;
        }

        var WP = Wl(6042),
          Wk = Wl(2268),
          WM = Wl(2799),
          WG = Wl(974),
          Ww = Wl(6886),
          WS = Wl(1261),
          WF = Wl(5499),
          Wl = Wl(6234);
        const WH = Object.assign({}, Wo, Wg, Wu, {
          addClass: WM.cn,
          hasClass: WM.pv,
          removeClass: WM.IV,
          replaceClass: WM.L_,
          toggleClass: WM.og,
          classList: WM.s1,
          styleDimension: WM.FK,
          createElement: WM.az,
          emptyElement: WM.EU,
          addStyleSheet: WM.kq,
          bounds: WM.A8,
          openLink: WM.nG,
          replaceInnerHtml: WM.nh,
          css: WG.iv,
          clearCss: WG.oI,
          style: WG.oB,
          transform: WG.vs,
          getRgba: WG.HY,
          ajax: Ww.h,
          crossdomain: (WV) => {
            var Wr = window.URL;
            try {
              var Wb = new Wr(WV, location.origin);
              return location.protocol + "//" + location.host != Wb.protocol + "//" + Wb.host;
            } catch (WX) {}
            return true;
          },
          tryCatch: function (WV, Wr, Wb = []) {
            if (Wq.Z.debug) {
              return WV.apply(Wr || this, Wb);
            }
            try {
              return WV.apply(Wr || this, Wb);
            } catch (WX) {
              return new WE(WV.name, WX);
            }
          },
          Error: WE,
          Timer: WC.Z,
          log: WF.c,
          genId: Wl.B,
          between: WS.v,
          foreach: function (WV, Wr) {
            for (const Wb in WV)
              !(function (WX, Wt) {
                if (null == WX) {
                  throw new TypeError("Cannot convert undefined or null to object");
                }
                return Object.prototype.hasOwnProperty.call(Object(WX), Wt);
              })(WV, Wb) || Wr(Wb, WV[Wb]);
          },
          flashVersion: Wk.dI,
          isIframe: Wk.cL,
          indexOf: WP.cq,
          trim: WT.fy,
          pad: WT.vk,
          extension: WT.AO,
          hms: WT.WZ,
          seconds: WT.m9,
          prefix: WT.O4,
          suffix: WT.uA,
          noop: () => {}
        });
      },
      7543: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { C: () => Wg });
        const Wg = (Wo) => !!(Wo = Wo || window.event) && Boolean(Wo) && /^(?:mouse|pointer|touch|gesture|click|key)/.test(Wo.type);
      },
      8518: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          Cq: () => WS,
          Dq: () => Wn,
          G3: () => WH,
          Mh: () => WY,
          Pm: () => Wt,
          dl: () => WA,
          id: () => Ww,
          q2: () => Wb,
          t6: () => Wr,
          tK: () => WG
        });
        var Wu = Wl(6042),
          Wg = Wl(2268),
          Wo = Wl(6886),
          WT = Wl(7034),
          WC = Wl(696);
        const Wq = {
            WK: null,
            WK: (Wm = new Promise((Wx, WI) => {
              (0, Wo.h)({
                url: WN,
                oncomplete: Wx,
                onerror: (Wc, Wy, Wi, WU) => {
                  WI(WU);
                },
                responseType: "json"
              });
            }))
          },
          WE = {
            aa: "Afar",
            ab: "Abkhazian",
            ae: "Avestan",
            af: "Afrikaans",
            ak: "Akan",
            am: "Amharic",
            ar: "Arabic",
            an: "Aragonese",
            as: "Assamese",
            av: "Avaric",
            ay: "Aymara",
            az: "Azerbaijani",
            ba: "Bashkir",
            be: "Belarusian",
            bg: "Bulgarian",
            bh: "Bihari languages",
            bi: "Bislama",
            bm: "Bambara",
            bn: "Bengali",
            bo: "Tibetan",
            br: "Breton",
            bs: "Bosnian",
            ca: "Catalan",
            ce: "Chechen",
            ch: "Chamorro",
            co: "Corsican",
            cr: "Cree",
            cs: "Czech",
            cu: "Church Slavic",
            cv: "Chuvash",
            cy: "Welsh",
            da: "Danish",
            de: "German",
            dv: "Divehi",
            dz: "Dzongkha",
            ee: "Ewe",
            el: "Greek",
            en: "English",
            eo: "Esperanto",
            es: "Spanish",
            et: "Estonian",
            eu: "Basque",
            fa: "Persian",
            ff: "Fulah",
            fi: "Finnish",
            fj: "Fijian",
            fo: "Faroese",
            fr: "French",
            fy: "Western Frisian",
            ga: "Irish",
            gd: "Gaelic",
            gl: "Galician",
            gn: "Guarani",
            gu: "Gujarati",
            gv: "Manx",
            ha: "Hausa",
            he: "Hebrew",
            hi: "Hindi",
            ho: "Hiri Motu",
            hr: "Croatian",
            ht: "Haitian",
            hu: "Hungarian",
            hy: "Armenian",
            hz: "Herero",
            ia: "Interlingua",
            id: "Indonesian",
            ie: "Interlingue",
            ig: "Igbo",
            ii: "Sichuan Yi",
            ik: "Inupiaq",
            io: "Ido",
            is: "Icelandic",
            it: "Italian",
            iu: "Inuktitut",
            ja: "Japanese",
            jv: "Javanese",
            ka: "Georgian",
            kg: "Kongo",
            ki: "Kikuyu",
            kj: "Kuanyama",
            kk: "Kazakh",
            kl: "Kalaallisut",
            km: "Central Khmer",
            kn: "Kannada",
            ko: "Korean",
            kr: "Kanuri",
            ks: "Kashmiri",
            ku: "Kurdish",
            kv: "Komi",
            kw: "Cornish",
            ky: "Kirghiz",
            la: "Latin",
            lb: "Luxembourgish",
            lg: "Ganda",
            li: "Limburgan",
            lo: "Lao",
            ln: "Lingala",
            lt: "Lithuanian",
            lu: "Luba-Katanga",
            lv: "Latvian",
            mg: "Malagasy",
            mh: "Marshallese",
            mi: "Maori",
            mk: "Macedonian",
            ml: "Malayalam",
            mn: "Mongolian",
            mr: "Marathi",
            ms: "Malay",
            mt: "Maltese",
            my: "Burmese",
            na: "Nauru",
            nb: "Bokmål",
            nd: "Ndebele",
            ne: "Nepali",
            ng: "Ndonga",
            nl: "Dutch",
            nn: "Norwegian Nynorsk",
            no: "Norwegian",
            nr: "Ndebele",
            nv: "Navajo",
            ny: "Chichewa",
            oc: "Occitan",
            oj: "Ojibwa",
            om: "Oromo",
            or: "Oriya",
            os: "Ossetian",
            pa: "Panjabi",
            pi: "Pali",
            pl: "Polish",
            pt: "Portuguese",
            ps: "Pushto",
            qu: "Quechua",
            rm: "Romansh",
            rn: "Rundi",
            ro: "Romanian",
            ru: "Russian",
            rw: "Kinyarwanda",
            sa: "Sanskrit",
            sc: "Sardinian",
            sd: "Sindhi",
            se: "Northern Sami",
            sg: "Sango",
            si: "Sinhala",
            sk: "Slovak",
            sl: "Slovenian",
            sm: "Samoan",
            sn: "Shona",
            so: "Somali",
            sq: "Albanian",
            sr: "Serbian",
            ss: "Swati",
            st: "Sotho",
            su: "Sundanese",
            sw: "Swahili",
            sv: "Swedish",
            ta: "Tamil",
            te: "Telugu",
            tg: "Tajik",
            th: "Thai",
            ti: "Tigrinya",
            tk: "Turkmen",
            tl: "Tagalog",
            tn: "Tswana",
            to: "Tonga",
            tr: "Turkish",
            ts: "Tsonga",
            tt: "Tatar",
            tw: "Twi",
            ty: "Tahitian",
            ug: "Uighur",
            uk: "Ukrainian",
            ur: "Urdu",
            uz: "Uzbek",
            ve: "Venda",
            vi: "Vietnamese",
            vo: "Volapük",
            wa: "Walloon",
            wo: "Wolof",
            xh: "Xhosa",
            yi: "Yiddish",
            yo: "Yoruba",
            za: "Zhuang",
            zh: "Chinese",
            zu: "Zulu"
          },
          WP = (0, Wu.U_)(WE),
          Wk = (Wh) => Wh.toLowerCase().replace("-", "_"),
          WM = (Wh) => {
            var Wh = Wk(Wh),
              WK = Wh.indexOf("_");
            return -1 === WK ? Wh : Wh.substring(0, WK);
          },
          WG = (Wh) => (Wh ? Object.keys(Wh).reduce((WK, Wm) => ((WK[Wk(Wm)] = Wh[Wm]), WK), {}) : {}),
          Ww = (Wh) => {
            if (Wh) {
              return (3 !== Wh.length && WE[WM(Wh)]) || Wh;
            }
          },
          WS = (Wh) => WP[Wh] || "",
          WF = (Wh) => {
            return (Wh = Wh.querySelector("html")), Wh ? Wh.getAttribute("lang") : null;
          },
          WH = function () {
            if ("string" == typeof WH.mock_) {
              return WH.mock_;
            }
            let Wh = WF(document);
            if (!Wh && (0, Wg.cL)()) {
              try {
                Wh = WF(window.top.document);
              } catch (WK) {}
            }
            return Wh || navigator.language || "en";
          },
          WV =
            ((WH.mock_ = null),
            [
              "ar",
              "da",
              "de",
              "el",
              "es",
              "fi",
              "fr",
              "he",
              "id",
              "it",
              "ja",
              "ko",
              "nb",
              "nl",
              "nn",
              "no",
              "oc",
              "pt",
              "ro",
              "ru",
              "sl",
              "sv",
              "th",
              "tr",
              "vi",
              "zh"
            ]),
          Wr = (Wh) => 8207 === Wh.charCodeAt(0) || /^[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(Wh),
          Wb = function (Wh) {
            return "boolean" == typeof Wb.mock_ ? Wb.mock_ : 0 <= WV.indexOf(WM(Wh));
          },
          WX =
            ((Wb.mock_ = null),
            (Wh, WK, Wm) => {
              WK = Wh[Wm] || WK[Wm];
              WK && (Wh[Wm] = WK);
            }),
          Wt = (Wh, WK, Wm) =>
            Object.assign(
              {},
              ((WN) => {
                var { advertising: Wx, related: WI, sharing: Wc, abouttext: Wy } = WN,
                  Wi = Object.assign({}, WN.localization),
                  Wx =
                    (Wx &&
                      ((Wi.advertising = Wi.advertising || {}),
                      WX(Wi.advertising, Wx, "admessage"),
                      WX(Wi.advertising, Wx, "cuetext"),
                      WX(Wi.advertising, Wx, "loadingAd"),
                      WX(Wi.advertising, Wx, "podmessage"),
                      WX(Wi.advertising, Wx, "skipmessage"),
                      WX(Wi.advertising, Wx, "skiptext")),
                    "string" == typeof Wi.related ? (Wi.related = { heading: Wi.related }) : (Wi.related = Wi.related || {}),
                    WI && WX(Wi.related, WI, "autoplaymessage"),
                    Wc && ((Wi.sharing = Wi.sharing || {}), WX(Wi.sharing, Wc, "heading"), WX(Wi.sharing, Wc, "copied")),
                    Wy && WX(Wi, WN, "abouttext"),
                    Wi.close || Wi.nextUpClose);
                return Wx && (Wi.close = Wx), Wi;
              })(Wh),
              WK[WM(Wm)],
              WK[Wk(Wm)]
            ),
          WA = function (Wh) {
            return "boolean" == typeof WA.mock_ ? WA.mock_ : (0, WT.isDeepKeyCompliant)(WC.Z, Wh, (WK, Wm) => "string" == typeof Wm[WK]);
          },
          Wn =
            ((WA.mock_ = null),
            function (Wh, WK) {
              if ("function" == typeof Wn.mock_) {
                return Wn.mock_;
              }
              let Wm = Wq[WK];
              if (!Wm) {
                const WN = Wh + "translations/" + ((Wh = WM(WK)), /^n[bn]$/.test(Wh) ? "no" : Wh) + ".json";
              }
              return Wm;
            }),
          Ws =
            ((Wn.mock_ = null),
            (Wh, WK, Wm, WN) => {
              Wh[WK] = Object.assign({}, Wm[WK], WN[WK]);
            }),
          WY = (Wh, WK) => {
            var Wm = Object.assign({}, Wh, WK);
            return (
              Ws(Wm, "errors", Wh, WK),
              Ws(Wm, "related", Wh, WK),
              Ws(Wm, "sharing", Wh, WK),
              Ws(Wm, "advertising", Wh, WK),
              Ws(Wm, "shortcuts", Wh, WK),
              Ws(Wm, "captionsStyles", Wh, WK),
              Wm
            );
          };
      },
      5499: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { c: () => Wg });
        const Wg = "function" == typeof console.log ? console.log.bind(console) : () => {};
      },
      1261: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { v: () => Wg });
        const Wg = function (Wo, WT, WC) {
          return Math.max(Math.min(Wo, WC), WT);
        };
      },
      9888: (We, Wu, Wl) => {
        "use strict";
        Wl.r(Wu);
        Wl.d(Wu, {
          getAbsolutePath: () => WC,
          isAbsolutePath: () => WT,
          parseDimension: () => WP,
          parseXML: () => Wq,
          serialize: () => WE,
          timeFormat: () => Wk,
          timeFormatAria: () => WM
        });
        var Wg = Wl(6042),
          Wo = Wl(5950);
        const WT = (WG) => /^(?:(?:https?|file):)?\/\//.test(WG),
          WC = (WG, Ww) => (0, Wo.kd)(WG, Ww),
          Wq = (WG) => {
            let Ww = null;
            try {
              (Ww = new window.DOMParser().parseFromString(WG, "text/xml")).querySelector("parsererror") && (Ww = null);
            } catch (WS) {}
            return Ww;
          },
          WE = (WG) => {
            if (void 0 === WG) {
              return null;
            }
            if ("string" == typeof WG && WG.length < 6) {
              var Ww = WG.toLowerCase();
              if ("true" === Ww) {
                return true;
              }
              if ("false" === Ww) {
                return false;
              }
              if (!(0, Wg.i2)(Number(WG)) && !(0, Wg.i2)(parseFloat(WG))) {
                return Number(WG);
              }
            }
            return WG;
          },
          WP = (WG) => ((0, Wg.qh)(WG) ? WG : "" === WG ? 0 : -1 < WG.lastIndexOf("%") ? WG : parseInt(WG.replace("px", ""), 10)),
          Wk = (WG, Ww) => {
            return (
              (0, Wg.i2)(WG) && (WG = parseInt(WG.toString(), 10)),
              (0, Wg.i2)(WG) || !isFinite(WG) || (WG <= 0 && !Ww)
                ? "00:00"
                : ((Ww = WG < 0 ? "-" : ""),
                  (WG = Math.abs(WG)),
                  Ww +
                    ((Ww = Math.floor(WG / 3600)) ? Ww + ":" : "") +
                    ((Ww = Math.floor((WG - 3600 * Ww) / 60)) < 10 ? "0" : "") +
                    Ww +
                    ":" +
                    ((Ww = Math.floor(WG % 60)) < 10 ? "0" : "") +
                    Ww)
            );
          },
          WM = (WG) => {
            var Ww;
            return (
              (0, Wg.i2)(WG) && (WG = parseInt(WG.toString(), 10)),
              (0, Wg.i2)(WG) || !isFinite(WG) || WG <= 0
                ? "0 seconds"
                : ((Ww = Math.floor(WG / 3600)) ? Ww + (1 <= Ww ? " hour" + (1 < Ww ? "s" : "") + ", " : "") : "") +
                  ((Ww = Math.floor((WG - 3600 * Ww) / 60)) ? Ww + (1 <= Ww ? " minute" + (1 < Ww ? "s" : "") + ", " : "") : "") +
                  (Ww = Math.floor(WG % 60)) +
                  (1 <= Ww ? " second" + (1 < Ww ? "s" : "") : "")
            );
          };
      },
      1569: (We, Wu, Wl) => {
        "use strict";
        Wl.r(Wu);
        Wl.d(Wu, {
          getScriptPath: () => WT,
          loadFrom: () => WE,
          repo: () => WC,
          versionCheck: () => Wq
        });
        var Wg = Wl(6601),
          Wo = Wl(7034);
        const WT = function (WP) {
            var Wk = document.getElementsByTagName("script");
            for (let Ww = 0; Ww < Wk.length; Ww++) {
              var WM = Wk[Ww].src;
              if (WM) {
                var WG = WM.lastIndexOf("/" + WP);
                if (0 <= WG) {
                  return WM.substr(0, WG + 1);
                }
              }
            }
            return "";
          },
          WC = function () {
            var WP = "//ssl.p.jwpcdn.com/player/v/8.27.1";
            return ((0, Wo.isFileProtocol)() ? "https:" : "") + WP;
          },
          Wq = function (WP) {
            var WP = ("0" + WP).split(/\W/),
              Wk = Wg.i.split(/\W/),
              WM = parseFloat(WP[0]),
              WG = parseFloat(Wk[0]);
            return !(WG < WM || (WM === WG && parseFloat("0" + WP[1]) > parseFloat(Wk[1])));
          },
          WE = function () {
            return WC();
          };
      },
      6234: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          B: () => Wo,
          F: () => 12
        });
        const Wo = (WT) => {
          let WC = "";
          for (; WC.length < WT; ) {
            WC += (() => {
              try {
                var Wq = window.crypto || window.msCrypto;
                if (null != Wq && Wq.getRandomValues) {
                  return Wq.getRandomValues(new Uint32Array(1))[0].toString(36);
                }
              } catch (WE) {}
              return Math.random().toString(36).slice(2, 9);
            })();
          }
          return WC.slice(0, WT);
        };
      },
      1776: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          U: () => Wg,
          W: () => Wo
        });
        const Wg = window.requestAnimationFrame || ((WT) => setTimeout(WT, 17)),
          Wo = window.cancelAnimationFrame || clearTimeout;
      },
      676: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { ZP: () => WC });
        var Wu = Wl(328),
          Wg = Wl(1643);

        function Wo(Wq, WE, WP) {
          const Wk = this;
          let WM = 0;
          const WG = (WS) => {
              WM = 2;
              Wk.trigger(Wg.pn, WS).off();
            },
            Ww = (WS) => {
              WM = 3;
              Wk.trigger(Wg.xQ, WS).off();
            };
          this.getStatus = function () {
            return WM;
          };
          this.load = function () {
            let WS = WT[Wq];
            return (
              0 === WM &&
                (WS && WS.then(Ww).catch(WG),
                (WM = 1),
                (WS = new Promise((WF, WH) => {
                  const WV = (
                    WE
                      ? (WA) => {
                          var Wn = document.createElement("link");
                          return (Wn.type = "text/css"), (Wn.rel = "stylesheet"), (Wn.href = WA), Wn;
                        }
                      : (WA, Wn) => {
                          var Ws = document.createElement("script");
                          return (
                            (Ws.type = "text/javascript"), (Ws.charset = "utf-8"), (Ws.async = true), (Ws.timeout = Wn || 45000), (Ws.src = WA), Ws
                          );
                        }
                  )(Wq, WP);
                  let Wr;

                  function Wb(WA) {
                    WX();
                    WG(WA);
                    WH(WA);
                  }

                  const WX = function () {
                    WV.onerror = WV.onload = null;
                    clearTimeout(Wr);
                  };
                  Wr = setTimeout(() => {
                    Wb(new Error("Network timeout " + Wq));
                  }, 45000);
                  WV.onerror = function () {
                    Wb(new Error("Failed to load " + Wq));
                  };
                  WV.onload = function (WA) {
                    WX();
                    Ww(WA);
                    WF(WA);
                  };
                  var Wt = document.getElementsByTagName("head")[0] || document.documentElement;
                  Wt.insertBefore(WV, Wt.firstChild);
                })),
                (WT[Wq] = WS)),
              WS
            );
          };
        }

        const WT = {},
          WC = (Object.assign(Wo.prototype, Wu.ZP), Wo);
      },
      2957: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          AO: () => WE,
          Dc: () => Wq,
          O4: () => WG,
          U5: () => WM,
          WZ: () => WP,
          fy: () => WT,
          m9: () => Wk,
          uA: () => Ww,
          vk: () => WC,
          zz: () => WS
        });
        var Wg = Wl(6042);
        const Wo = window.parseFloat,
          WT = (WF) => WF.replace(/^\s+|\s+$/g, ""),
          WC = (WF, WH, WV) => {
            for (WF = "" + WF, WV = WV || "0"; WF.length < WH; ) {
              WF = WV + WF;
            }
            return WF;
          },
          Wq = (WF, WH) => {
            var WV = WF.attributes;
            for (let Wr = 0; Wr < WV.length; Wr++) {
              if (WV[Wr].name && WV[Wr].name.toLowerCase() === WH.toLowerCase()) {
                return WV[Wr].value.toString();
              }
            }
            return "";
          },
          WE = (WF) => {
            var WH;
            return WF && "rtmp" !== WF.substr(0, 4)
              ? (WH = /[(,]format=(m3u8|mpd)-/i.exec(WF))
                ? WH[1]
                : (WH = WF.replace(/^.+?\.(\w+)(?:[;].*)?(?:[?#].*)?$/, "$1")) !== WF
                ? WH.toLowerCase()
                : -1 < (WF = WF.split("?")[0].split("#")[0]).lastIndexOf(".")
                ? WF.substr(WF.lastIndexOf(".") + 1, WF.length).toLowerCase()
                : ""
              : "";
          },
          WP = (WF) => {
            var WH = ((WF / 60) | 0) % 60,
              WV = WF % 60;
            return WC(((WF / 3600) | 0).toString(), 2) + ":" + WC(WH.toString(), 2) + ":" + WC(WV.toFixed(3), 6);
          },
          Wk = (WF, WH) => {
            if (!WF) {
              return 0;
            }
            if ((0, Wg.qh)(WF)) {
              return WF;
            }
            var WF = WF.replace(",", "."),
              WV = WF.slice(-1),
              Wr = WF.split(":"),
              Wb = Wr.length;
            let WX = 0;
            if ("s" === WV) {
              WX = Wo(WF);
            } else {
              if ("m" === WV) {
                WX = 60 * Wo(WF);
              } else {
                if ("h" === WV) {
                  WX = 3600 * Wo(WF);
                } else {
                  if (1 < Wb) {
                    let Wt = Wb - 1;
                    4 === Wb && (WH && (WX = Wo(Wr[Wt]) / WH), --Wt);
                    WX = (WX += Wo(Wr[Wt])) + 60 * Wo(Wr[Wt - 1]);
                    3 <= Wb && (WX += 3600 * Wo(Wr[Wt - 2]));
                  } else {
                    WX = Wo(WF);
                  }
                }
              }
            }
            return (0, Wg.qh)(WX) ? WX : 0;
          },
          WM = (WF, WH, WV) => {
            if ((0, Wg.HD)(WF) && "%" === WF.slice(-1)) {
              const Wr = Wo(WF);
              return WH && (0, Wg.qh)(WH) && (0, Wg.qh)(Wr) ? (WH * Wr) / 100 : null;
            }
            return Wk(WF, WV);
          },
          WG = (WF, WH) => WF.map((WV) => WH + WV),
          Ww = (WF, WH) => WF.map((WV) => WV + WH),
          WS = (WF) => Boolean(WF) && (0, Wg.HD)(WF) && "%" === WF.slice(-1);
      },
      5882: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          GU: () => WX,
          ZP: () => Wy,
          dO: () => Ws
        });
        var Wg = Wl(8348),
          Wo = Wl(1643),
          Wu = Wl(328),
          WT = Wl(5004),
          WC = Wl(2799);
        const Wq = "ontouchstart" in window,
          WE = "PointerEvent" in window && !Wg.OS.android,
          WP = !(WE || (Wq && Wg.OS.mobile)),
          Wk = "window",
          WM = "init",
          WG = "select",
          Ww = "keydown",
          WS = Wg.Features.passiveEvents,
          WF = !!WS && { passive: true };
        let WH, WV;
        const Wr = (Wi, WU, WL) => {
            const Wd = Wi.el,
              Wv = (() => {
                var { target: WO, touches: Wz, changedTouches: WB } = WL;
                let WZ,
                  Wj = WL.pointerType;
                Wj = Wz || WB ? ((WZ = (null != Wz && Wz.length ? Wz : WB)[0]), Wj || "touch") : ((WZ = WL), Wj || "mouse");
                var { pageX: Wz, pageY: WB } = WZ;
                return {
                  type: WU,
                  pointerType: Wj,
                  pageX: Wz,
                  pageY: WB,
                  sourceEvent: WL,
                  currentTarget: Wd,
                  target: WO
                };
              })();
            Wi.trigger(WU, Wv);
          },
          Wb = (Wi, WU, WL) => {
            var Wd = Wi.el,
              Wv = WL.target;
            Wi.trigger(WU, {
              type: WU,
              sourceEvent: WL,
              currentTarget: Wd,
              target: Wv
            });
          },
          WX = (Wi) => {
            return (Wi = Wi.ownerDocument || Wi), Wi.defaultView || Wi.parentWindow || window;
          },
          Wt = (Wi, WU, WL, Wd, Wv = WF) => {
            let WO = Wi.handlers[WU],
              Wz = Wi.options[WU];
            if ((WO || ((WO = Wi.handlers[WU] = {}), (Wz = Wi.options[WU] = {})), WO[WL])) {
              throw new Error(WU + (" " + WL + " already registered"));
            }
            Wi = Wi.el;
            WU = WU === Wk ? WX(Wi) : Wi;
            Wz[WL] = Wv;
            (Wi = Wi.el), (WU = WU === Wk ? WX(Wi) : Wi);
            WU && WU.addEventListener(WL, Wd, Wv);
          },
          WA = (Wi) => {
            var WU = Wi.el;
            null !== Wi.pointerId && (WU.releasePointerCapture(Wi.pointerId), (Wi.pointerId = null));
          },
          Wn = (Wi, WU) => {
            const { el: WL, handlers: Wd, options: Wv } = Wi,
              WO = WU === Wk ? WX(WL) : WL,
              Wz = Wd[WU],
              WB = Wv[WU];
            Wz &&
              (Object.keys(Wz).forEach((WZ) => {
                var Wj = WB[WZ];
                "boolean" == typeof Wj ? WO.removeEventListener(WZ, Wz[WZ], Wj) : WO.removeEventListener(WZ, Wz[WZ]);
              }),
              (Wd[WU] = null),
              (Wv[WU] = null));
          },
          Ws = (Wi) => !(!Boolean(Wi.ctrlKey) || "click" !== Wi.type) || ("which" in Wi ? 3 === Wi.which : "button" in Wi && 2 === Wi.button),
          WY = (Wi, WU) => {
            if (((WV = WV || new Wy(document).on("interaction")), !Wi.handlers[WM] && !Wi.handlers[WG])) {
              const WL = Wi.el;
              Wt(Wi, WU, "blur", () => {
                (0, WC.IV)(WL, "jw-tab-focus");
                Wi.clicking = false;
              });
              Wt(Wi, WU, "focus", () => {
                WV.event && WV.event.type === Ww && (0, WC.cn)(WL, "jw-tab-focus");
              });
            }
          },
          Wh = (Wi, WU, WL, Wd) => {
            WE ? Wt(Wi, WU, "pointerdown", WL, Wd) : (WP && Wt(Wi, WU, "mousedown", WL, Wd), Wt(Wi, WU, "touchstart", WL, Wd));
          },
          WK = (Wi) => {
            if (!Wi.handlers[WG]) {
              const WU = Wi.el;
              WY(Wi, WG);
              Wh(Wi, WG, (WL) => {
                var Wd = WL.target;
                Ws(WL) ||
                  (Boolean(Wi.directSelect) && Wd !== WU) ||
                  (WL.isPrimary && "BUTTON" === Wd.tagName && Wd.focus(), (Wi.lastStart = (0, WT.z)()), (Wi.clicking = true));
              });
              Wt(Wi, WG, "click", (WL) => {
                var Wd, Wv;
                Ws(WL) ||
                  (Boolean(Wi.directSelect) && WL.target !== WU) ||
                  ((500 < (0, WT.z)() - Wi.lastStart && true === Wi.clicking) ||
                    ((Wv = WL),
                    (Wd = Wi).enableDoubleClick &&
                      ((0, WT.z)() - Wd.lastClick < 300 ? (Wr(Wd, Wo.P, Wv), (Wd.lastClick = 0)) : (Wd.lastClick = (0, WT.z)())),
                    Wr(Wi, Wo.ot, WL)),
                  (Wi.clicking = false));
              });
            }
          },
          Wm = (Wi) => (0 === Wi.type.indexOf("touch") ? (Wi.originalEvent || Wi).changedTouches[0] : Wi),
          WN = (Wi) => {
            if (!Wi.handlers[WM]) {
              const { el: WU, passive: WL } = Wi,
                Wd = !!WS && { passive: WL },
                Wv = (Wz) => {
                  if (Wi.dragged) {
                    Wr(Wi, Wo.Wp, Wz);
                  } else {
                    const { pageX: WZ, pageY: Wj } = Wm(Wz),
                      WJ = WZ - Wi.startX,
                      WR = Wj - Wi.startY;
                    36 < WJ * WJ + WR * WR && (Wr(Wi, Wo.nv, Wz), (Wi.dragged = true), Wr(Wi, Wo.Wp, Wz));
                  }
                  WL || "touchmove" !== Wz.type || (Wz.preventDefault && Wz.preventDefault());
                },
                WO = (Wz) => {
                  clearTimeout(WH);
                  Wi.el && (WA(Wi), Wn(Wi, Wk), Wi.dragged) && ((Wi.dragged = false), Wr(Wi, Wo.Sv, Wz));
                };
              WY(Wi, WM);
              Wh(
                Wi,
                WM,
                (Wz) => {
                  if (((0, WC.IV)(WU, "jw-tab-focus"), !Ws(Wz))) {
                    var { target: WB, type: WZ } = Wz;
                    if (!Wi.directSelect || WB === WU) {
                      var { pageX: WB, pageY: Wj } = Wm(Wz);
                      if (((Wi.dragged = false), (Wi.startX = WB), (Wi.startY = Wj), Wn(Wi, Wk), "pointerdown" === WZ && Wz.isPrimary)) {
                        if (!WL) {
                          const WJ = Wz.pointerId;
                          Wi.pointerId = WJ;
                          WU.setPointerCapture(WJ);
                        }
                        Wt(Wi, Wk, "pointermove", Wv, Wd);
                        Wt(Wi, Wk, "pointercancel", WO);
                        Wt(Wi, Wk, "pointerup", WO);
                      } else {
                        "mousedown" === WZ
                          ? (Wt(Wi, Wk, "mousemove", Wv, Wd), Wt(Wi, Wk, "mouseup", WO))
                          : "touchstart" === WZ && (Wt(Wi, Wk, "touchmove", Wv, Wd), Wt(Wi, Wk, "touchcancel", WO), Wt(Wi, Wk, "touchend", WO));
                      }
                    }
                  }
                },
                Wd
              );
            }
          },
          Wx = {
            drag(Wi) {
              WN(Wi);
            },
            dragStart(Wi) {
              WN(Wi);
            },
            dragEnd(Wi) {
              WN(Wi);
            },
            click(Wi) {
              WK(Wi);
            },
            doubleClick(Wi) {
              Wi.enableDoubleClick = true;
              WK(Wi);
            },
            longPress(Wi) {
              const WU = "longPress";
              if (Wg.OS.iOS) {
                const WL = () => {
                  clearTimeout(WH);
                };
                Wt(Wi, WU, "touchstart", (Wd) => {
                  WL();
                  WH = setTimeout(() => {
                    Wr(Wi, WU, Wd);
                  }, 500);
                });
                Wt(Wi, WU, "touchmove", WL);
                Wt(Wi, WU, "touchcancel", WL);
                Wt(Wi, WU, "touchend", WL);
              } else {
                Wi.el.oncontextmenu = (Wd) => (Wr(Wi, WU, Wd), false);
              }
            },
            focus(Wi) {
              const WU = "focus";
              Wt(Wi, WU, WU, (WL) => {
                Wb(Wi, WU, WL);
              });
            },
            blur(Wi) {
              Wt(Wi, "blur", "blur", (WL) => {
                Wb(Wi, "blur", WL);
              });
            },
            over(Wi) {
              (WE || WP) &&
                Wt(Wi, Wo.B1, WE ? "pointerover" : "mouseover", (WU) => {
                  "touch" !== WU.pointerType && Wr(Wi, Wo.B1, WU);
                });
            },
            out(Wi) {
              if (WE) {
                const WU = Wi.el;
                Wt(Wi, Wo.U3, "pointerout", (WL) => {
                  var Wd;
                  "touch" !== WL.pointerType &&
                    "clientX" in WL &&
                    ((Wd = document.elementFromPoint(WL.clientX, WL.clientY)), WU.contains(Wd) || Wr(Wi, Wo.U3, WL));
                });
              } else {
                WP &&
                  Wt(Wi, Wo.U3, "mouseout", (WL) => {
                    Wr(Wi, Wo.U3, WL);
                  });
              }
            },
            move(Wi) {
              (WE || WP) &&
                Wt(Wi, Wo.tP, WE ? "pointermove" : "mousemove", (WU) => {
                  "touch" !== WU.pointerType && Wr(Wi, Wo.tP, WU);
                });
            },
            enter(Wi) {
              Wt(Wi, Wo.K5, Ww, (WU) => {
                ("Enter" !== WU.key && 13 !== WU.keyCode) || (WU.stopPropagation(), Wb(Wi, Wo.K5, WU));
              });
            },
            keydown(Wi) {
              Wt(
                Wi,
                Ww,
                Ww,
                (WU) => {
                  Wb(Wi, Ww, WU);
                },
                false
              );
            },
            gesture(Wi) {
              const WU = "gesture",
                WL = (Wd) => Wr(Wi, WU, Wd);
              Wt(Wi, WU, "click", WL);
              Wt(Wi, WU, Ww, WL);
            },
            interaction(Wi) {
              var WU = "interaction",
                WL = (Wd) => {
                  Wi.event = Wd;
                };
              Wt(Wi, WU, "mousedown", WL, true);
              Wt(Wi, WU, Ww, WL, true);
            },
            tap() {},
            doubleTap() {}
          },
          Wc = (Wi) => Wi && !(/\s+/.test(Wi) || "object" == typeof Wi);

        class Wy extends Wu.ZP {
          constructor(Wi, WU) {
            super();
            var WL = !(WU = WU || {}).preventScrolling;
            this.directSelect = Boolean(WU.directSelect);
            this.dragged = false;
            this.enableDoubleClick = false;
            this.el = Wi;
            this.handlers = {};
            this.options = {};
            this.lastClick = 0;
            this.lastStart = 0;
            this.passive = WL;
            this.pointerId = null;
            this.startX = 0;
            this.startY = 0;
            this.event = null;
            this.clicking = false;
          }

          ["on"](Wi, WU, WL) {
            return !Wc(Wi) || this.handlers[Wi] || Wx[Wi](this), super.on(Wi, WU, WL);
          }

          ["off"](Wi, WU, WL) {
            if (Wc(Wi)) {
              Wn(this, Wi);
            } else {
              if (!Wi) {
                const Wd = this.handlers;
                Object.keys(Wd).forEach((Wv) => {
                  Wn(this, Wv);
                });
              }
            }
            return super.off(Wi, WU, WL);
          }

          ["destroy"]() {
            this.el && (this.off(), WE && WA(this), (this.el = null));
          }
        }
      },
      6042: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          $6: () => f5,
          Cb: () => ff,
          HD: () => Wv,
          Kn: () => Wx,
          P2: () => fw,
          S6: () => WI,
          UI: () => WB,
          U_: () => fS,
          Yj: () => WQ,
          ZP: () => fX,
          _e: () => fE,
          a9: () => fr,
          ar: () => fq,
          ce: () => fF,
          cq: () => fg,
          dp: () => f7,
          e1: () => fl,
          e5: () => fP,
          ei: () => fV,
          hX: () => f3,
          hj: () => Wd,
          i2: () => Wz,
          jn: () => f9,
          l7: () => fH,
          mf: () => WL,
          o8: () => fW,
          qh: () => fb,
          r3: () => fo,
          sE: () => f1,
          u4: () => WJ,
          vM: () => fD,
          wB: () => fC,
          xV: () => f8,
          yR: () => Wa
        });
        Wu = Wl(5004);

        function Wg(ft) {
          if (!Wx(ft)) {
            return [];
          }
          if (Wh) {
            return Wh(ft);
          }
          var fA = [];
          for (const fn in ft) WN(ft, fn) && fA.push(fn);
          return fA;
        }

        function Wo(ft, fA, ...fn) {
          if (WK && ft.bind === WK) {
            return WK.apply(ft, [fA].concat(fn));
          }
          if (WL(ft)) {
            return fs;
          }
          throw new TypeError();

          function fs(...fY) {
            if (!(this instanceof fs)) {
              return ft.apply(fA, fn.concat(fY));
            }
            var fh = new Wj(),
              fY = ((Wj.prototype = null), ft.apply(fh, fn.concat(fY)));
            return Object(fY) === fY ? fY : fh;
          }
        }

        function WT(ft, fA) {
          let fn;
          return function (...fs) {
            return 0 < --ft && (fn = fA.apply(this, fs)), ft <= 1 && (fA = null), fn;
          };
        }

        function WC(ft) {
          return null == ft ? Wa : WL(ft) ? ft : ff(ft);
        }

        function Wq(ft) {
          return function (fA, fn, fs) {
            const fY = {};
            return (
              (fn = WC(fn)),
              WI(fA, function (fh, fK) {
                fK = fn.call(fs, fh, fK, fA);
                ft(fY, fK, fh);
              }),
              fY
            );
          };
        }

        function WE(ft, ...fA) {
          return function (...fn) {
            let fs = 0;
            var fY = fA.slice();
            for (let fh = 0, fK = fY.length; fh < fK; fh++) {
              WN(fY[fh], "partial") && (fY[fh] = fn[fs++]);
            }
            for (; fs < arguments.length; ) {
              fY.push(fn[fs++]);
            }
            return ft.apply(this, fY);
          };
        }

        function WP(ft, fA, ...fn) {
          return setTimeout(function () {
            return ft.apply(null, fn);
          }, fA);
        }

        const Wk = {
            fillStyle: WG,
            resized: Wk.width !== WM,
            width: WM
          },
          WM = Array.prototype,
          WG = Object.prototype,
          Ww = Function.prototype,
          WS = WM.slice,
          WF = WM.concat,
          WH = WG.toString,
          WV = WG.hasOwnProperty,
          Wr = WM.map,
          Wb = WM.reduce,
          WX = WM.forEach,
          Wt = WM.filter,
          WA = WM.every,
          Wn = WM.some,
          Ws = WM.indexOf,
          WY = Array.isArray,
          Wh = Object.keys,
          WK = Ww.bind,
          Wm = window.isFinite,
          WN = function (ft, fA) {
            return WV.call(ft, fA);
          },
          Wx = function (ft) {
            return ft === Object(ft);
          },
          WI = function (ft, fA, fn) {
            let fs, fY;
            if (null != ft) {
              if (WX && ft.forEach === WX) {
                ft.forEach(fA, fn);
              } else {
                if (ft.length === Number(ft.length)) {
                  for (fs = 0, fY = ft.length; fs < fY; fs++) {
                    if (fA.call(fn, ft[fs], fs, ft) === Wk) {
                      return;
                    }
                  }
                } else {
                  var fh = Wg(ft);
                  for (fs = 0, fY = fh.length; fs < fY; fs++) {
                    if (fA.call(fn, ft[fh[fs]], fh[fs], ft) === Wk) {
                      return;
                    }
                  }
                }
              }
            }
            return ft;
          },
          Wc = WI,
          Wy = [],
          Wi =
            (WI(["Function", "String", "Number", "Date", "RegExp"], function (ft) {
              Wy[ft] = function (fA) {
                return WH.call(fA) == "[object " + ft + "]";
              };
            }),
            Wy.Date),
          WU = Wy.RegExp,
          WL = Wy.Function,
          Wd = Wy.Number,
          Wv = Wy.String,
          WO =
            WY ||
            function (ft) {
              return "[object Array]" == WH.call(ft);
            },
          Wz = function (ft) {
            return Wd(ft) && ft != Number(ft);
          },
          WB = function (ft, fA, fn) {
            const fs = [];
            return null == ft
              ? fs
              : Wr && ft.map === Wr
              ? ft.map(fA, fn)
              : (WI(ft, function (fY, fh, fK) {
                  fs.push(fA.call(fn, fY, fh, fK));
                }),
                fs);
          },
          WZ = WB,
          Wj = function () {},
          WJ = function (ft, fA, fn, fs) {
            let fY = 2 < arguments.length;
            if ((null == ft && (ft = []), Wb && ft.reduce === Wb)) {
              return fs && (fA = Wo(fA, fs)), fY ? ft.reduce(fA, fn) : ft.reduce(fA);
            }
            if (
              (WI(ft, function (fh, fK, fm) {
                fY ? (fn = fA.call(fs, fn, fh, fK, fm)) : ((fn = fh), (fY = true));
              }),
              fY)
            ) {
              return fn;
            }
            throw new TypeError("Reduce of empty array with no initial value");
          },
          WR = WJ,
          Wp = WJ,
          Wa = function (ft) {
            return ft;
          },
          WQ = function (ft, fA, fn) {
            fA = fA || Wa;
            let fs = false;
            return null == ft
              ? fs
              : Wn && ft.some === Wn
              ? ft.some(fA, fn)
              : (WI(ft, function (fY, fh, fK) {
                  if ((fs = fs || fA.call(fn, fY, fh, fK))) {
                    return Wk;
                  }
                }),
                Boolean(fs));
          },
          f0 = WQ,
          f1 = function (ft, fA, fn) {
            let fs;
            return (
              WQ(ft, function (fY, fh, fK) {
                if (fA.call(fn, fY, fh, fK)) {
                  return (fs = fY), true;
                }
              }),
              fs
            );
          },
          f2 = f1,
          f3 = function (ft, fA, fn) {
            const fs = [];
            return null == ft
              ? fs
              : Wt && ft.filter === Wt
              ? ft.filter(fA, fn)
              : (WI(ft, function (fY, fh, fK) {
                  fA.call(fn, fY, fh, fK) && fs.push(fY);
                }),
                fs);
          },
          f4 = f3,
          f5 = function (ft, fA, fn) {
            fA = fA || Wa;
            let fs = true;
            return null == ft
              ? fs
              : WA && ft.every === WA
              ? ft.every(fA, fn)
              : (WI(ft, function (fY, fh, fK) {
                  if (!(fs = fs && fA.call(fn, fY, fh, fK))) {
                    return Wk;
                  }
                }),
                Boolean(fs));
          },
          f6 = f5,
          f7 = function (ft) {
            return null == ft ? 0 : (ft.length === Number(ft.length) ? ft : Wg(ft)).length;
          },
          f8 =
            ((Wy.Function = function (ft) {
              return "function" == typeof ft;
            }),
            function (ft) {
              return Wm(ft) && !Wz(parseFloat(ft));
            }),
          f9 = function (ft) {
            return true === ft || false === ft || "[object Boolean]" == WH.call(ft);
          },
          fW = function (ft) {
            return void 0 === ft;
          },
          ff = function (ft) {
            return function (fA) {
              return fA[ft];
            };
          },
          fD = Wq(function (ft, fA, fn) {
            WN(ft, fA) ? ft[fA].push(fn) : (ft[fA] = [fn]);
          }),
          fu = Wq(function (ft, fA, fn) {
            ft[fA] = fn;
          }),
          fl = function (ft, fA, fn, fs) {
            var fY = (fn = WC(fn)).call(fs, fA);
            let fh = 0,
              fK = ft.length;
            for (; fh < fK; ) {
              const fm = (fh + fK) >>> 1;
              fn.call(fs, ft[fm]) < fY ? (fh = 1 + fm) : (fK = fm);
            }
            return fh;
          },
          fg = function (ft, fA, fn) {
            if (null != ft) {
              let fY = 0;
              var fs = ft.length;
              if (fn) {
                if ("number" != typeof fn) {
                  return ft[(fY = fl(ft, fA))] === fA ? fY : -1;
                }
                fY = fn < 0 ? Math.max(0, fs + fn) : fn;
              }
              if (Ws && ft.indexOf === Ws) {
                return ft.indexOf(fA, fn);
              }
              for (; fY < fs; fY++) {
                if (ft[fY] === fA) {
                  return fY;
                }
              }
            }
            return -1;
          },
          fo = function (ft, fA) {
            return (
              null != ft &&
              (ft.length !== Number(ft.length) &&
                (ft = (function (fn) {
                  var fs = Wg(fn),
                    fY = Wg.length,
                    fh = Array(fY);
                  for (let fK = 0; fK < fY; fK++) {
                    fh[fK] = fn[fs[fK]];
                  }
                  return fh;
                })(ft)),
              0 <= fg(ft, fA))
            );
          },
          fT = fo,
          fC = function (ft) {
            return function (fA) {
              if (fA !== ft) {
                for (const fn in ft)
                  if (ft[fn] !== fA[fn]) {
                    return false;
                  }
              }
              return true;
            };
          },
          fq = function (ft, fA) {
            return f3(ft, fC(fA));
          },
          fE = function (ft, fA) {
            return f1(ft, fC(fA));
          },
          fP = function (ft, ...fA) {
            const fn = WF.apply(WM, fA);
            return f3(ft, function (fs) {
              return !fo(fn, fs);
            });
          },
          fk = WE(WT, 2),
          fM = WE(WP, { partial: WE }, 1),
          fG = Wu.z,
          fw = function (ft, fA, fn) {
            let fs,
              fY,
              fh,
              fK = null,
              fm = 0;
            fn = fn || {};

            function fN() {
              fm = false === fn.leading ? 0 : fG();
              fK = null;
              fh = ft.apply(fs, fY);
              fs = fY = null;
            }

            return function (...fx) {
              var fI = fG(),
                fc = (fm || false !== fn.leading || (fm = fI), fA - (fI - fm));
              return (
                (fs = this),
                (fY = fx),
                fc <= 0
                  ? (clearTimeout(fK), (fK = null), (fm = fI), (fh = ft.apply(fs, fY)), (fs = fY = null))
                  : fK || false === fn.trailing || (fK = setTimeout(fN, fc)),
                fh
              );
            };
          },
          fS = function (ft) {
            var fA = {},
              fn = Wg(ft);
            for (let fs = 0, fY = fn.length; fs < fY; fs++) {
              fA[ft[fn[fs]]] = fn[fs];
            }
            return fA;
          },
          fF = function (ft, ...fA) {
            return (
              WI(fA, function (fn) {
                if (fn) {
                  for (const fs in fn) void 0 === ft[fs] && (ft[fs] = fn[fs]);
                }
              }),
              ft
            );
          },
          fH =
            Object.assign ||
            function (ft, ...fA) {
              return (
                WI(fA, function (fn) {
                  if (fn) {
                    for (const fs in fn)
                      !(function (fY, fh) {
                        if (null == fY) {
                          throw new TypeError("Cannot convert undefined or null to object");
                        }
                        return Object.prototype.hasOwnProperty.call(Object(fY), fh);
                      })(fn, fs) || (ft[fs] = fn[fs]);
                  }
                }),
                ft
              );
            },
          fV = function (ft, ...fA) {
            const fn = {};
            return (
              (fA = [].concat(...fA)),
              WI(fA, function (fs) {
                fs in ft && (fn[fs] = ft[fs]);
              }),
              fn
            );
          },
          fr = function (ft) {
            return function () {
              return ft;
            };
          },
          fb = (ft) => Wd(ft) && !Wz(ft),
          fX = {
            after: function (ft, fA) {
              return function (...fn) {
                if (--ft < 1) {
                  return fA.apply(this, fn);
                }
              };
            },
            all: f5,
            any: WQ,
            before: WT,
            bind: Wo,
            clone: function (ft) {
              return Wx(ft) ? (WO(ft) ? ft.slice() : fH({}, ft)) : ft;
            },
            collect: WZ,
            compact: function (ft) {
              return f3(ft, Wa);
            },
            constant: fr,
            contains: fo,
            debounce: (ft, fA = 100) => {
              let fn;
              return function (...fs) {
                clearTimeout(fn);
                fn = setTimeout(() => {
                  ft.apply(this, fs);
                }, fA);
              };
            },
            defaults: fF,
            defer: fM,
            delay: WP,
            detect: f2,
            difference: fP,
            each: WI,
            every: f6,
            extend: fH,
            filter: f3,
            find: f1,
            findWhere: fE,
            foldl: WR,
            forEach: Wc,
            groupBy: fD,
            has: WN,
            identity: Wa,
            include: fT,
            indexBy: fu,
            indexOf: fg,
            inject: Wp,
            invert: fS,
            isArray: WO,
            isBoolean: f9,
            isDate: Wi,
            isFinite: f8,
            isFunction: WL,
            isNaN: Wz,
            isNull: function (ft) {
              return null === ft;
            },
            isNumber: Wd,
            isObject: Wx,
            isRegExp: WU,
            isString: Wv,
            isUndefined: fW,
            isValidNumber: fb,
            keys: Wg,
            last: function (ft, fA, fn) {
              if (null != ft) {
                return null == fA || fn ? ft[ft.length - 1] : WS.call(ft, Math.max(ft.length - fA, 0));
              }
            },
            map: WB,
            matches: fC,
            max: function (ft, fA, fn) {
              if (!fA && WO(ft) && ft[0] === Number(ft[0]) && ft.length < 65535) {
                return Math.max(...ft);
              }
              let fs = -1e400,
                fY = -1e400;
              return (
                WI(ft, function (fh, fK, fm) {
                  fK = fA ? fA.call(fn, fh, fK, fm) : fh;
                  fK > fY && ((fs = fh), (fY = fK));
                }),
                fs
              );
            },
            memoize: function (ft, fA) {
              const fn = {};
              return (
                (fA = fA || Wa),
                function (...fs) {
                  var fY = fA.apply(this, fs);
                  return WN(fn, fY) ? fn[fY] : (fn[fY] = ft.apply(this, fs));
                }
              );
            },
            now: fG,
            omit: function (ft, ...fA) {
              var fn = {};
              for (const fs in ft) fo(fA, fs) || (fn[fs] = ft[fs]);
              return fn;
            },
            once: fk,
            partial: WE,
            pick: fV,
            pluck: function (ft, fA) {
              return WB(ft, ff(fA));
            },
            property: ff,
            propertyOf: function (ft) {
              return null == ft
                ? function () {}
                : function (fA) {
                    return ft[fA];
                  };
            },
            reduce: WJ,
            reject: function (ft, fA, fn) {
              return f3(
                ft,
                function (fs, fY, fh) {
                  return !fA.call(fn, fs, fY, fh);
                },
                fn
              );
            },
            result: function (ft, fA) {
              if (null != ft) {
                return (fA = ft[fA]), WL(fA) ? fA.call(ft) : fA;
              }
            },
            select: f4,
            size: f7,
            some: f0,
            sortedIndex: fl,
            throttle: fw,
            where: fq,
            without: function (ft, ...fA) {
              return fP(ft, fA);
            }
          };
      },
      5950: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          O9: () => WC,
          _N: () => WT,
          kd: () => WP,
          ke: () => Wq,
          vl: () => Wo
        });
        const Wo = function (Wk) {
            if (!Wk) {
              return {};
            }
            var WM,
              WG = ((WS) => {
                if (WS) {
                  return new URL(WS, window.location);
                }
              })(Wk),
              Ww = {
                onload: null,
                onprogress: null,
                onreadystatechange: null,
                onerror: null
              };
            for (const WS of WG.searchParams.keys()) Ww[WS] || ((WM = WG.searchParams.getAll(WS)), (Ww[WS] = 1 === WM.length ? WM[0] : WM));
            return Ww;
          },
          WT = function (Wk) {
            return !Wk || ((Wk = new URLSearchParams(Wk).get("jw_start") || -1), isNaN(Wk)) || Wk < -1 ? -1 : Number(Wk);
          },
          WC = function (Wk, WM = "{seek_to_second_number}") {
            if (Wk) {
              return (Wk = new URL(Wk)).searchParams.set("jw_start", WM), Wk.toString();
            }
          },
          Wq = (Wk, WM) => {
            if (Wk) {
              return new URLSearchParams(Wk).has(WM);
            }
          },
          WE = (Wk) => !!Wk && null !== Wk.match(/^[^:/?#]+:?\/\/[^/?#]+/),
          WP = (Wk, WM) => ((WM = WM || document.location.href), Wk && WE(WM) ? (WE(Wk) ? Wk : new URL(Wk, WM).toString()) : "");
      },
      7034: (We, Wu, Wl) => {
        "use strict";
        Wl.r(Wu);
        Wl.d(Wu, {
          exists: () => Wo,
          isDeepKeyCompliant: () => Wk,
          isFileProtocol: () => WC,
          isHTTPS: () => WT,
          isRtmp: () => Wq,
          isYouTube: () => WE,
          typeOf: () => WP
        });
        const Wg = window.location.protocol,
          Wo = (WM) => {
            switch (typeof WM) {
              case "string":
                return 0 < WM.length;
              case "object":
                return null !== WM;
              case "undefined":
                return false;
              default:
                return true;
            }
          },
          WT = () => "https:" === Wg,
          WC = () => "file:" === Wg,
          Wq = (WM, WG) => 0 === WM.indexOf("rtmp:") || "rtmp" === WG,
          WE = (WM, WG) => "youtube" === WG || /^(http|\/\/).*(youtube\.com|youtu\.be)\/.+/.test(WM),
          WP = (WM) => {
            var WG;
            return null === WM ? "null" : "object" == (WG = typeof WM) && Array.isArray(WM) ? "array" : WG;
          },
          Wk = (WM, WG, Ww) => {
            var WS = Object.keys(WM);
            return (
              Object.keys(WG).length >= WS.length &&
              WS.every((WF) => {
                var WH = WM[WF],
                  WV = WG[WF];
                return WH && "object" == typeof WH ? !(!WV || "object" != typeof WV) && Wk(WH, WV, Ww) : Ww(WF, WM);
              })
            );
          };
      },
      9025: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => Wg });
        const Wg = document.createElement("video");
      },
      6601: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { i: () => Wg });
        const Wg =
          "8.27.1+commercial_master.532.hls.js@1.4.3.jwplayer@mono.jwplayer-ads-dai@mono.jwplayer-ads-freewheel@mono.jwplayer-ads-googima@mono.jwplayer-ads-header-bidding@github:jwplayer/jwplayer-ads-header-bidding#v7.2.0.jwplayer-ads-vast@mono.jwplayer-analytics@v3.42.2.jwplayer-analytics-kraken@v0.0.4.jwplayer-plugin-gapro@mono";
      },
      4225: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          Z: () =>
            function (WC, Wq) {
              var { message: Wq, code: WE } = Wq,
                Wq = Wg(WC.get("id"), Wq, WC.get("localization").errors.errorCode, WE.toString()),
                WE = WC.get("width"),
                WC = WC.get("height"),
                Wq = (0, Wo.az)(Wq);
              return (
                (0, WT.oB)(Wq, {
                  width: 0 < WE.toString().indexOf("%") ? WE : WE + "px",
                  height: 0 < WC.toString().indexOf("%") ? WC : WC + "px"
                }),
                Wq
              );
            }
        });
        const Wg = (WC, Wq, WE, WP) =>
          '<div id="' +
          WC +
          '" class="jw-error jw-reset"><div class="jw-error-msg jw-info-overlay jw-reset"><style>[id="' +
          WC +
          '"].jw-error{background:#000;overflow:hidden;position:relative}[id="' +
          WC +
          '"] .jw-error-msg{top:50%;left:50%;position:absolute;transform:translate(-50%,-50%)}[id="' +
          WC +
          '"] .jw-error-text{text-align:start;color:#FFF;font:14px/1.35 Arial,Helvetica,sans-serif}</style><div class="jw-icon jw-reset"></div><div class="jw-info-container jw-reset"><div class="jw-error-text jw-reset-text" dir="auto" data-nosnippet>' +
          (Wq || "") +
          '<span class="jw-break jw-reset"></span>' +
          (WP ? ("(" + WE + ": " + WP + ")").replace(/\s+/g, "&nbsp;") : "") +
          "</div></div></div></div>";
        var Wo = Wl(2799),
          WT = Wl(974);
      },
      9926: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => WP });
        var Wg = Wl(1776),
          Wo = Wl(2799),
          WT = Wl(974);
        const WC = [];
        let Wq = -1;
        const WE = () => {
          (0, Wg.W)(Wq);
          Wq = (0, Wg.U)(() => {
            WC.forEach((Wk) => {
              Wk.view.updateBounds();
              var WM = Wk.view.model.get("containerWidth");
            });
            WC.forEach((Wk) => {
              Wk.contractElement.scrollLeft = 2 * Wk.width;
            });
            WC.forEach((Wk) => {
              (0, WT.oB)(Wk.expandChild, { width: Wk.width + 1 });
              Wk.resized && Wk.view.model.get("visibility") && Wk.view.updateStyles();
            });
            WC.forEach((Wk) => {
              Wk.expandElement.scrollLeft = Wk.width + 1;
            });
            WC.forEach((Wk) => {
              Wk.resized && Wk.view.checkResized();
            });
          });
        };

        class WP {
          constructor(Wk, WM, WG) {
            var Ww = {
                display: "block",
                position: "absolute",
                top: 0,
                left: 0
              },
              WS = {
                width: "100%",
                height: "100%"
              },
              WF = (0, Wo.az)(
                '<div style="opacity:0;visibility:hidden;overflow:hidden;"><div><div style="height:1px;"></div></div><div class="jw-contract-trigger"></div></div>'
              ),
              WH = WF.firstChild,
              WV = WH.firstChild,
              Wr = WH.nextSibling;
            (0, WT.oB)([WH, Wr], Object.assign({ overflow: "auto" }, Ww, WS));
            (0, WT.oB)(WF, Object.assign({}, Ww, WS));
            this.expandElement = WH;
            this.expandChild = WV;
            this.contractElement = Wr;
            this.hiddenElement = WF;
            this.element = Wk;
            this.view = WM;
            this.model = WG;
            this.width = 0;
            this.resized = false;
            Wk.firstChild ? Wk.insertBefore(WF, Wk.firstChild) : Wk.appendChild(WF);
            Wk.addEventListener("scroll", WE, true);
            WC.push(this);
            WE();
          }

          ["destroy"]() {
            var Wk;
            this.view &&
              (-1 !== (Wk = WC.indexOf(this)) && WC.splice(Wk, 1),
              this.element.removeEventListener("scroll", WE, true),
              this.element.removeChild(this.hiddenElement),
              (this.view = this.model = null));
          }
        }
      },
      4671: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => Wr });
        var Wg = Wl(6875),
          Wu = Wl(8348),
          Wo = Wl(2799);
        const WT = [],
          WC = [],
          Wq = [],
          WE = {},
          WP = "screen" in window && "orientation" in window.screen,
          Wk = Wu.OS.android && Wu.Browser.chrome;
        let WM,
          WG = false;
        const Ww = (Wb, WX) => {
            for (let WA = WX.length; WA--; ) {
              var Wt = WX[WA];
              if (Wb.target === Wt.getContainer()) {
                Wt.setIntersection(Wb);
                break;
              }
            }
          },
          WS = () => {
            WT.forEach((Wb) => {
              var WX,
                Wt = Wb.model;
              Wt.get("audioMode") ||
                Wt.get("isFloating") ||
                !Wt.get("controls") ||
                Wt.get("visibility") < 0.75 ||
                ((Wt = Wt.get("state")),
                !(WX = (0, Wo.UM)()) && "paused" === Wt && Wb.api.getFullscreen()
                  ? Wb.api.setFullscreen(false)
                  : "playing" === Wt && Wb.api.setFullscreen(WX));
            });
          },
          WF = () => {
            WT.forEach((Wb) => {
              Wb.model.set("activeTab", (0, Wg.Z)());
            });
          },
          WH = (Wb, WX) => {
            Wb = WX.indexOf(Wb);
            -1 !== Wb && WX.splice(Wb, 1);
          },
          WV = (Wb) => {
            Wq.forEach((WX) => {
              WX(Wb);
            });
          },
          Wr =
            (document.addEventListener("visibilitychange", WF),
            document.addEventListener("webkitvisibilitychange", WF),
            Wk && WP && window.screen.orientation.addEventListener("change", WS),
            window.addEventListener("beforeunload", () => {
              document.removeEventListener("visibilitychange", WF);
              document.removeEventListener("webkitvisibilitychange", WF);
              window.removeEventListener("scroll", WV);
              Wk && WP && window.screen.orientation.removeEventListener("change", WS);
            }),
            {
              add(Wb) {
                WT.push(Wb);
              },
              remove(Wb) {
                WH(Wb, WT);
              },
              addScrollHandler(Wb) {
                WG || ((WG = true), window.addEventListener("scroll", WV));
                Wq.push(Wb);
              },
              removeScrollHandler(Wb) {
                Wb = Wq.indexOf(Wb);
                -1 !== Wb && Wq.splice(Wb, 1);
              },
              addWidget(Wb) {
                WC.push(Wb);
              },
              removeWidget(Wb) {
                WH(Wb, WC);
              },
              size: () => WT.length,
              observe(Wb) {
                var WX;
                WX = window.IntersectionObserver;
                WM =
                  WM ||
                  new WX(
                    (Wt) => {
                      if (null != Wt && Wt.length) {
                        for (let Wn = Wt.length; Wn--; ) {
                          var WA = Wt[Wn];
                          Ww(WA, WT);
                          Ww(WA, WC);
                        }
                      }
                    },
                    {
                      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
                    }
                  );
                WE[Wb.id] || ((WE[Wb.id] = true), WM.observe(Wb));
              },
              unobserve(Wb) {
                WM && WE[Wb.id] && (delete WE[Wb.id], WM.unobserve(Wb));
              }
            });
      },
      2445: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          ZP: () => Wb,
          qG: () => Wr
        });
        var Wg = Wl(5083),
          Wo = Wl(1569),
          WT = Wl(6042),
          WC = Wl(7034),
          Wq = Wl(576),
          WE = Wl(6599),
          WP = Wl(386);
        const Wk = "__CONTEXTUAL__",
          WM = (WX, Wt) => {
            WX = WX.querySelector(Wt);
            if (WX) {
              return WX.getAttribute("content");
            }
          };
        var Wu = Wl(4737),
          WG = Wl.n(Wu),
          Ww = Wl(67);
        const WS = (WX) => "string" == typeof WX && /^\/\/(?:content\.jwplatform|cdn\.jwplayer)\.com\//.test(WX),
          WF = (WX) => "https:" + WX,
          WH = (WX) => {
            var Wt = "file:" === window.location.protocol ? "https:" : "",
              WX = {
                bidding: "//ssl.p.jwpcdn.com/player/v/8.27.1/bidding.js",
                jwpsrv: "//ssl.p.jwpcdn.com/player/v/8.27.1/jwpsrv.js",
                dai: "//ssl.p.jwpcdn.com/player/v/8.27.1/dai.js",
                vast: "//ssl.p.jwpcdn.com/player/v/8.27.1/vast.js",
                googima: "//ssl.p.jwpcdn.com/player/v/8.27.1/googima.js",
                freewheel: "//ssl.p.jwpcdn.com/player/v/8.27.1/freewheel.js",
                gapro: "//ssl.p.jwpcdn.com/player/v/8.27.1/gapro.js",
                interactive: "//ssl.p.jwpcdn.com/player/v/8.27.1/interactive.js"
              }[WX];
            return WX ? Wt + WX : "";
          },
          WV = (WX, Wt, WA) => {
            Wt && delete (WX[Wt.client || WH(WA)] = Wt).client;
          },
          Wr = (WX) => {
            const Wt = Object.assign({}, WX.plugins),
              WA = (0, WP.Z)(WX.edition);
            if (WA("ads")) {
              const Wn = Object.assign({}, WX.advertising),
                Ws = Wn.client;
              Ws && delete (Wt[WH(Ws) || Ws] = Wn).client;
              Wn.bids && WV(Wt, Wn.bids, "bidding");
            }
            if (WA("jwpsrv")) {
              let WY = WX.analytics;
              WY !== Object(WY) && (WY = {});
              WV(Wt, WY, "jwpsrv");
            }
            return WV(Wt, WX.ga, "gapro"), WV(Wt, WX.interactive, "interactive"), Wt;
          },
          Wb = function (WX, Wt) {
            let WA = (0, Wg.ZP)(WX, Wt);
            var WX = WA.key || Wq.default.key,
              Wt = new WE.ZP(WX),
              Wn = Wt.edition();
            if (
              (((WA =
                "free" === Wt.edition()
                  ? Object.assign(
                      {
                        skin: {
                          active: "#ff0046",
                          timeslider: { progress: "none" }
                        },
                        logo: {
                          position: "control-bar",
                          file: WG()
                        }
                      },
                      Wg.ke,
                      (0, WT.ei)(WA, ["analytics", "aspectratio", "base", "file", "height", "playlist", "sources", "timeSlider", "width"])
                    )
                  : WA).key = WX),
              (WA.edition = Wn),
              (WA.error = Wt.error()),
              (WA.generateSEOMetadata = WA.generateSEOMetadata || false),
              "unlimited" === Wn)
            ) {
              const Ws = (0, Wo.getScriptPath)("jwplayer.js");
              if (!Ws) {
                throw new Error("Error setting up player: Could not locate jwplayer.js script tag");
              }
              Wl.p = Ws;
            }
            if (
              ((WA.related = ((WY) => {
                var Wh = (0, WP.Z)(WY.edition),
                  WK = WY.related,
                  Wh = !Wh("discovery") || WK !== Object(WK),
                  Wm = !WK || "none" !== WK.displayMode,
                  WN = WK || {};
                let Wx = void 0 === WN.oncomplete ? "none" : WN.oncomplete,
                  WI = WN.autoplaytimer;
                false === Wx || WY.repeat ? (Wx = "hide") : "none" === Wx && (WI = 0);
                return (
                  (WN = ("autoplay" === Wx && WI <= 0) || "none" === Wx),
                  Object.assign({}, WK, {
                    disableRelated: Wh,
                    showButton: Wm,
                    oncomplete: Wx,
                    autoplaytimer: WI,
                    shouldAutoAdvance: WN
                  })
                );
              })(WA)),
              WA.ab &&
                (WA.ab = ((WY) => {
                  let Wh = WY.ab;
                  return (
                    Wh.clone && (Wh = Wh.clone()),
                    Object.keys(Wh.tests).forEach((WK) => {
                      Wh.tests[WK].forEach((Wm) => {
                        Wm.addConfig && Wm.addConfig(WY, Wm.selection);
                      });
                    }),
                    Wh
                  );
                })(WA)),
              (WA.plugins = Wr(WA)),
              (WX = WA.playlist),
              (0, WT.HD)(WX) &&
                -1 < WX.indexOf(Wk) &&
                ((WA.playlist = ((WY, Wh) => {
                  var WK = null == WY || null == WY.querySelector || null == (WK = WY.querySelector("title")) ? void 0 : WK.textContent,
                    Wm = WM(WY, 'meta[property="og:title"]');
                  let WN = encodeURIComponent(Wm || WK || "");
                  return (
                    (Wm = WM(WY, 'meta[property="og:description"]') || WM(WY, 'meta[name="description"]')),
                    (Wm && (WN += "&page_description=" + encodeURIComponent(Wm)), Wh.replace(Wk, WN))
                  );
                })(document, WA.playlist)),
                (WA.contextual = true)),
              (0, WC.isFileProtocol)())
            ) {
              const { playlist: WY, related: Wh } = WA;
              WS(WY) && (WA.playlist = WF(WY));
              Wh && WS(Wh.file) && (Wh.file = WF(Wh.file));
            }
            return (
              WA["__abSendDomainToFeeds"] &&
                ((Wt = WA.playlist), /\.jwplatform.com|\.jwplayer.com/.test(Wt)) &&
                (WA.playlist = (Wn = WA.playlist) + ((-1 !== Wn.indexOf("?") ? "&" : "?") + "page_domain=" + encodeURIComponent((0, Ww.X)()))),
              WA
            );
          };
      },
      576: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { default: () => WB });
        var Wu = Wl(1096),
          Wu = Wl.n(Wu),
          Wu = (window.Promise || (window.Promise = Wu()), Wl(1569)),
          Wg = Wl(6391),
          Wo = Wl(2963),
          WT = Wl(670),
          Wo = {
            availableProviders: Wo.B,
            registerProvider: WT.Z
          },
          WC = Wl(1241);
        const Wq = Wo;
        var WE = Wl(6601),
          WP = Wl(4742),
          Wk = Wl(8348),
          WM = Wl(623),
          WG = Wl(1643),
          Ww = Wl(7411),
          WS = Wl(328),
          WF = Wl(4429),
          WH = Wl(6042);
        let WV = 0;

        function Wr(WZ, Wj) {
          return (
            (Wj = new WM.ZP(Wj)).on(WG.Rc, (WJ) => {
              WZ["_qoe"].tick("ready");
              WJ.setupTime = WZ["_qoe"].between("setup", "ready");
            }),
            Wj.on("all", (WJ, WR) => {
              WZ.trigger(WJ, WR);
            }),
            Wj
          );
        }

        function Wb(WZ, Wj) {
          const WJ = WZ.plugins,
            WR = Object.keys(WJ).map((Wp) => {
              var Wa = WJ[Wp];
              return delete WJ[Wp], Wa;
            });
          Wj.get("setupConfig") && WZ.trigger("remove");
          WZ.off();
          Wj.playerDestroy();
          WR.forEach((Wp) => {
            if (Wp.destroy) {
              try {
                Wp.destroy();
              } catch (Wa) {}
            }
          });
          Wj.getContainer().removeAttribute("data-jwplayer-id");
        }

        function WX(WZ) {
          const Wj = ++WV,
            WJ = WZ.id || "player-" + Wj,
            WR = new Ww.Z(),
            Wp = {};
          let Wa = Wr(this, WZ);
          WR.tick("init");
          WZ.setAttribute("data-jwplayer-id", WJ);
          Object.defineProperties(this, {
            id: {
              enumerable: true,
              get: () => WJ
            },
            uniqueId: {
              enumerable: true,
              get: () => Wj
            },
            plugins: {
              enumerable: true,
              get: () => Wp
            },
            _qoe: {
              enumerable: true,
              get: () => WR
            },
            version: {
              enumerable: true,
              get: () => WE.i
            },
            Events: {
              enumerable: true,
              get: () => WS.ZP
            },
            utils: {
              enumerable: true,
              get: () => WF.Z
            },
            _: {
              enumerable: true,
              get: () => WH.ZP
            }
          });
          Object.assign(this, {
            _events: {},
            setup(WQ) {
              return WR.clear("ready"), WR.tick("setup"), Wa && Wb(this, Wa), (Wa = Wr(this, WZ)).init(WQ, this), this.on(WQ.events, null, this);
            },
            remove() {
              this.getPip() && this.setPip(false);
              var WQ = this;
              for (let f0 = Wg.Z.length; f0--; ) {
                if (Wg.Z[f0].uniqueId === WQ.uniqueId) {
                  Wg.Z.splice(f0, 1);
                  break;
                }
              }
              return (
                Wa && Wb(this, Wa),
                Object.keys(Wp).forEach((f1) => {
                  delete Wp[f1];
                }),
                this
              );
            },
            qoe() {
              var WQ = Wa.getItemQoe();
              return {
                setupTime: this["_qoe"].between("setup", "ready"),
                firstFrame: WQ.getFirstFrame ? WQ.getFirstFrame() : null,
                player: this["_qoe"].dump(),
                item: WQ.dump()
              };
            },
            addCues(WQ) {
              return Array.isArray(WQ) && Wa.addCues(WQ), this;
            },
            getAudioTracks: () => Wa.getAudioTracks(),
            getBuffer: () => Wa.get("buffer"),
            getCaptions: () => Wa.get("captions"),
            getCaptionsList: () => Wa.getCaptionsList(),
            getConfig: () => Wa.getConfig(),
            getContainer: () => Wa.getContainer(),
            getControls: () => Wa.get("controls"),
            getCues: () => Wa.getCues(),
            getCurrentAudioTrack: () => Wa.getCurrentAudioTrack(),
            getCurrentCaptions: () => Wa.getCurrentCaptions(),
            getCurrentQuality: () => Wa.getCurrentQuality(),
            getCurrentTime: () => Wa.get("currentTime"),
            getAbsolutePosition: () => Wa.getAbsolutePosition(),
            getDuration: () => Wa.get("duration"),
            getEnvironment: () => Wk,
            getFullscreen: () => Wa.get("fullscreen"),
            getHeight: () => Wa.getHeight(),
            getItemMeta: () => Wa.get("itemMeta") || {},
            getMute: () => Wa.getMute(),
            getPercentViewable: () => Wa.get("visibility"),
            getPip: () => Wa.get("pip"),
            getPlaybackRate: () => Wa.get("playbackRate"),
            getPlaylist: () => Wa.get("playlist"),
            getPlaylistIndex: () => Wa.get("item"),
            getPlaylistItem(WQ) {
              var f0;
              return WF.Z.exists(WQ) ? ((f0 = this.getPlaylist()) ? f0[WQ] : null) : Wa.get("playlistItem");
            },
            getPosition: () => Wa.get("position"),
            getProvider: () => Wa.getProvider(),
            getQualityLevels: () => Wa.getQualityLevels(),
            getSafeRegion: (WQ = true) => Wa.getSafeRegion(WQ),
            getState: () => Wa.getState(),
            getStretching: () => Wa.get("stretching"),
            getViewable: () => Wa.get("viewable"),
            getVisualQuality: () => Wa.getVisualQuality(),
            getVolume: () => Wa.get("volume"),
            getWidth: () => Wa.getWidth(),
            setCaptions(WQ) {
              return Wa.setCaptions(WQ), this;
            },
            setConfig(WQ) {
              return Wa.setConfig(WQ), this;
            },
            setControls(WQ) {
              return Wa.setControls(WQ), this;
            },
            setCurrentAudioTrack(WQ) {
              Wa.setCurrentAudioTrack(WQ);
            },
            setCurrentCaptions(WQ) {
              Wa.setCurrentCaptions(WQ);
            },
            setCurrentQuality(WQ) {
              Wa.setCurrentQuality(WQ);
            },
            setFullscreen(WQ) {
              return Wa.setFullscreen(WQ), this;
            },
            setAllowFullscreen(WQ) {
              return Wa.setAllowFullscreen(WQ), this;
            },
            setMute(WQ) {
              return Wa.setMute(WQ), this;
            },
            setPip(WQ) {
              return Wa.setPip(WQ), this;
            },
            setPlaybackRate(WQ) {
              return Wa.setPlaybackRate(WQ), this;
            },
            setPlaylistItem(WQ, f0) {
              return Wa.setPlaylistItem(WQ, f0), this;
            },
            setCues(WQ) {
              return Array.isArray(WQ) && Wa.setCues(WQ), this;
            },
            setVolume(WQ) {
              return Wa.setVolume(WQ), this;
            },
            load(WQ, f0) {
              return Wa.load(WQ, f0), this;
            },
            play(WQ) {
              return Wa.play(WQ), this;
            },
            pause(WQ) {
              return Wa.pause(WQ), this;
            },
            playToggle(WQ) {
              switch (this.getState()) {
                case WG.r0:
                case WG.Kb:
                  return this.pause(WQ);
                default:
                  return this.play(WQ);
              }
            },
            seek(WQ, f0) {
              return Wa.seek(WQ, f0), this;
            },
            playlistItem(WQ, f0) {
              return Wa.playlistItem(WQ, f0), this;
            },
            playlistNext(WQ) {
              return Wa.playlistNext(WQ), this;
            },
            playlistPrev(WQ) {
              return Wa.playlistPrev(WQ), this;
            },
            next(WQ) {
              return Wa.next(WQ), this;
            },
            requestPip(WQ) {
              return Wa.requestPip(WQ), this;
            },
            castToggle() {
              return Wa.castToggle(), this;
            },
            stopCasting() {
              return Wa.stopCasting(), this;
            },
            requestCast(WQ) {
              return Wa.requestCast(WQ), this;
            },
            createInstream: () => Wa.createInstream(),
            stop() {
              return Wa.stop(), this;
            },
            resize(WQ, f0) {
              return Wa.resize(WQ, f0), this;
            },
            addButton(WQ, f0, f1, f2, f3) {
              return Wa.addButton(WQ, f0, f1, f2, f3), this;
            },
            removeButton(WQ) {
              return Wa.removeButton(WQ), this;
            },
            getMediaElement: () => Wa.getMediaElement(),
            attachMedia() {
              return Wa.attachMedia(), this;
            },
            detachMedia() {
              return Wa.detachMedia(), this;
            },
            isBeforeComplete: () => Wa.isBeforeComplete(),
            isBeforePlay: () => Wa.isBeforePlay(),
            setPlaylistItemCallback(WQ, f0) {
              Wa.setItemCallback(WQ, f0);
            },
            removePlaylistItemCallback() {
              Wa.setItemCallback(null);
            },
            getPlaylistItemPromise: (WQ) => Wa.getItemPromise(WQ),
            getFloating: () => Boolean(Wa.get("isFloating")),
            setFloating(WQ) {
              Wa.setConfig({ floating: { mode: WQ ? "always" : "never" } });
            },
            getChapters: () => Wa.getChapters(),
            getCurrentChapter: () => Wa.getCurrentChapter(),
            setChapter: (WQ) => Wa.setChapter(WQ)
          });
        }

        Object.assign(Wc, Wo);
        Wn(Wc);
        "function" == typeof WO.define &&
          WO.define.amd &&
          WO.define([], function () {
            return Wc;
          });
        Wl.p = (0, Wu.loadFrom)();

        function Wt(WZ) {
          let Wj, WJ;
          if (
            (WZ
              ? "string" == typeof WZ
                ? (Wj = WA(WZ)) || (WJ = document.getElementById(WZ))
                : "number" == typeof WZ
                ? (Wj = Wg.Z[WZ])
                : WZ.nodeType && ((WJ = WZ), (Wj = WA(WJ.id || WJ.getAttribute("data-jwplayer-id"))))
              : (Wj = Wg.Z[0]),
            Wj)
          ) {
            return Wj;
          }
          if (WJ) {
            const WR = new WX(WJ);
            return Wg.Z.push(WR), WR;
          }
          return { registerPlugin: WC.f };
        }

        const WA = (WZ) => {
            for (let Wj = 0; Wj < Wg.Z.length; Wj++) {
              if (Wg.Z[Wj].id === WZ) {
                return Wg.Z[Wj];
              }
            }
            return null;
          },
          Wn = (WZ) => {
            Object.defineProperties(WZ, {
              api: {
                get: () => Wq,
                set() {}
              },
              version: {
                get: () => WE.i,
                set() {}
              },
              debug: {
                get: () => WP.Z.debug,
                set(Wj) {
                  WP.Z.debug = Boolean(Wj);
                }
              }
            });
          },
          Ws = (Wn(Wt), Wt);
        var WT = Wl(5882),
          Wo = Wl(6599),
          Wu = Wl(676),
          WY = Wl(5592),
          Wh = Wl(6769),
          WK = Wl(9025),
          Wm = WH.ZP.extend,
          WN = {},
          Wo =
            ((WN["_"] = WH.ZP),
            (WN.utils = Object.assign(WF.Z, {
              key: Wo.ZP,
              extend: Wm,
              scriptloader: Wu.ZP,
              rssparser: { parse: Wh.Z },
              tea: WY.p,
              UI: WT.ZP
            })),
            (WN.utils.css.style = WN.utils.style),
            (WN.vid = WK.Z),
            WN),
          Wx = Wl(7543);

        function WI(WZ) {
          var Wj = { prototype: ft.prototype };
          Wv(this, WZ, WZ, Wj);
          Wv(this, WZ, WX.prototype, Wj);
        }

        function Wc(WZ) {
          return (WZ = Ws(WZ)).uniqueId ? WZ["_publicApi"] || (WZ["_publicApi"] = new WI(WZ)) : WZ;
        }

        const Wi = (WZ) => {
            console.warn("The API method jwplayer()." + WZ + "() is disabled in the free edition of JW Player.");
          },
          WU = (WZ, Wj) => {
            if (Wj.length) {
              const WJ = WZ.getPlugin("jwpsrv");
              null != WJ &&
                WJ.trackExternalAPIUsage &&
                (Wj.forEach((WR) => {
                  var Wp = WJ,
                    Wa = WR[0],
                    WR = WR[1];
                  try {
                    var WQ = ((f0) => {
                      switch (Wa) {
                        case "setup":
                          return Boolean(f0);
                        case "getSafeRegion":
                        case "pauseAd":
                        case "setControls":
                        case "setFullscreen":
                        case "setMute":
                          return Boolean(f0) === f0 ? f0 : void 0;
                        case "setPlaylistItem":
                        case "getPlaylistItem":
                          return (0 | f0) === f0 ? f0 : void 0;
                        case "setPlaybackRate":
                        case "setVolume":
                          return Number(f0);
                        case "setConfig":
                          return Object.keys(Object(f0)).join(",");
                        case "on":
                        case "once":
                        case "off":
                        case "trigger":
                        case "getPlugin":
                        case "addPlugin":
                        case "registerPlugin":
                          return "" + f0;
                      }
                      return null;
                    })(WR);
                    Wp.trackExternalAPIUsage(Wa, WQ);
                  } catch (f0) {
                    WP.Z.debug && console.warn(f0);
                  }
                }),
                (Wj.length = 0));
            }
          },
          WL = (WZ, Wj, WJ, WR, Wp) =>
            function (...Wa) {
              const WQ = Wa[0],
                f0 = Wj["_trackCallQueue"] || (Wj["_trackCallQueue"] = []),
                f1 = /^(?:on(?:ce)?|off|trigger)$/.test(WJ),
                f2 = f1 && Wa[1] && Wa[1]["_callback"],
                f3 = Wp.edition || ((f4 = Wp), (f7 = Wj.getConfig().edition), (f4.edition = f7));
              if ("free" === f3) {
                if (
                  -1 <
                  [
                    "addButton",
                    "addCues",
                    "detachMedia",
                    "load",
                    "next",
                    "pause",
                    "play",
                    "playlistItem",
                    "playlistNext",
                    "playlistPrev",
                    "playToggle",
                    "resize",
                    "seek",
                    "setCaptions",
                    "setConfig",
                    "setControls",
                    "setCues",
                    "setFullscreen",
                    "setMute",
                    "setPlaybackRate",
                    "setPlaylistItem",
                    "setVolume",
                    "stop"
                  ].indexOf(WJ)
                ) {
                  return Wi(WJ), WZ;
                }
                if (-1 < ["createInstream", "setCurrentAudioTrack", "setCurrentCaptions", "setCurrentQuality"].indexOf(WJ)) {
                  return Wi(WJ), null;
                }
              }
              if ((f2 || f0.push([WJ, WQ]), f1)) {
                return WU(Wj, f0), Wj[WJ].apply(WZ, Wa);
              }
              var f4 = WJ,
                f5 = Wa,
                f6 = {
                  reason: "play" !== f4 && "seek" !== f4 && "pause" !== f4 && (0, Wx.C)() ? "interaction" : "external"
                };
              switch (f4) {
                case "play":
                case "pause":
                case "playToggle":
                case "playlistNext":
                case "playlistPrev":
                case "next":
                  f5[0] = f6;
                  break;
                case "seek":
                case "playlistItem":
                  f5[1] = f6;
              }
              var f7 = Wj[WJ](...Wa);
              return (
                "remove" === WJ
                  ? Wj.off.call(WZ)
                  : "setup" === WJ &&
                    (Wj.off.call(WZ),
                    Wj.off(WQ.events, null, Wj),
                    Wj.on.call(WZ, WQ.events, null, WZ),
                    Wj.on("all", (f8, f9) => {
                      if ("ready" === f8) {
                        const fW = Object.keys(Wj).filter((fD) => "_" !== fD[0] && -1 === WR.indexOf(fD) && "function" == typeof Wj[fD]),
                          ff = WR.concat(fW);
                        fW.forEach((fD) => {
                          WZ[fD] = WL(WZ, Wj, fD, ff, Wp);
                        });
                      }
                      Wj.trigger.call(WZ, f8, f9);
                      WU(Wj, f0);
                    })),
                WU(Wj, f0),
                f7 === Wj ? WZ : f7
              );
            },
          Wd = ["getMediaElement"],
          Wv = (WZ, Wj, WJ, WR) => {
            const Wp = Object.keys(WJ);
            Wp.forEach((Wa) => {
              var WQ = WJ[Wa];
              -1 === Wd.indexOf(Wa) &&
                ("function" == typeof WQ && "Events" !== Wa
                  ? (WZ[Wa] = WL(WZ, Wj, Wa, Wp, WR))
                  : "_events" === Wa
                  ? (WZ["_events"] = {})
                  : Object.defineProperty(WZ, Wa, {
                      enumerable: true,
                      get: () => WJ[Wa]
                    }));
            });
          },
          WO = window;
        Object.assign(Ws, Wo);
        Object.assign(Wc, Wo),
          Wn(Wc),
          "function" == typeof WO.define &&
            WO.define.amd &&
            WO.define([], function () {
              return Wc;
            });
        let Wz = Wc;
        const WB = (Wz = WO.jwplayer ? WO.jwplayer : Wz);
      },
      3487: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          MK: () => Wo,
          Nq: () => WT,
          bX: () => WC
        });
        var Wg = Wl(7164);
        const Wo = Wg.MK,
          WT = Wg.Nq,
          WC = function (Wq) {
            let WE = (0, Wg.bX)(Wq);
            if (Wq) {
              switch ((0, Wg.Nq)(Wq)) {
                case "jwpsrv":
                  WE = 305001;
                  break;
                case "googima":
                  WE = 305002;
                  break;
                case "vast":
                  WE = 305003;
                  break;
                case "freewheel":
                  WE = 305004;
                  break;
                case "dai":
                  WE = 305005;
                  break;
                case "gapro":
                  WE = 305006;
                  break;
                case "bidding":
                  WE = 305007;
              }
            }
            return WE;
          };
      },
      1918: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          Gb: () => Wk,
          d3: () => WM,
          lD: () => WP,
          w0: () => WE
        });
        var Wg = Wl(386);
        const Wo = [
            {
              configName: "clearkey",
              keyName: "org.w3.clearkey"
            },
            {
              configName: "widevine",
              keyName: "com.widevine.alpha"
            },
            {
              configName: "playready",
              keyName: "com.microsoft.playready"
            }
          ],
          WT = [],
          WC = {};
        let Wq;
        const WE = (WG) => WG.some((Ww) => Boolean(Ww.drm) || Ww.sources.some((WS) => Boolean(WS.drm))),
          WP = (WG) =>
            Wq ||
            (((Boolean(navigator.requestMediaKeySystemAccess) && Boolean(window.MediaKeySystemAccess.prototype.getConfiguration)) ||
              Boolean(window.MSMediaKeys)) &&
            (0, Wg.Z)(WG)("drm")
              ? (Wo.forEach((Ww) => {
                  WS = Ww.keyName;
                  var WS,
                    WF = (
                      navigator.requestMediaKeySystemAccess
                        ? navigator.requestMediaKeySystemAccess(WS, [
                            {
                              initDataTypes: ["cenc"],
                              videoCapabilities: [
                                {
                                  contentType: 'video/mp4;codecs="avc1.4d401e"'
                                }
                              ],
                              audioCapabilities: [{ contentType: 'audio/mp4;codecs="mp4a.40.2"' }]
                            }
                          ])
                        : new Promise((WH, WV) => {
                            let Wr;
                            try {
                              Wr = new window.MSMediaKeys(WS);
                            } catch (Wb) {
                              return void WV(Wb);
                            }
                            WH(Wr);
                          })
                    )
                      .then(function () {
                        WC[Ww.configName] = true;
                      })
                      .catch(function () {
                        WC[Ww.configName] = false;
                      });
                  WT.push(WF);
                }),
                (Wq = Promise.all(WT)))
              : Promise.resolve()),
          Wk = (WG) => WC[WG],
          WM = (WG) => {
            if (Wq) {
              return Object.keys(WG).some((Ww) => Wk(Ww));
            }
          };
      },
      2963: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { B: () => Wk });
        var Wg = Wl(6593),
          Wo = Wl(8348),
          WT = Wl(386),
          WC = Wl(6042),
          Wq = Wl(1918),
          WE = Wl(9025);
        const WP = (WM = ['video/mp4;codecs="avc1.4d400d,mp4a.40.2"']) => {
          const WG = window.MediaSource;
          return !(!WG || !WG.isTypeSupported) && (0, WC["$6"])(WM, (Ww) => WG.isTypeSupported(Ww));
        };
        {
          const WM = (0, WC.sE)(Wg.B, (0, WC.wB)({ name: "html5" })),
            WG = WM.supports;
          WM.supports = function (...Ww) {
            var [WS, WF] = Ww,
              Ww = WG.apply(this, Ww);
            if (Ww && WS.drm && "hls" === WS.type) {
              const WH = (0, WT.Z)(WF)("drm");
              if (WH && WS.drm.fairplay) {
                const WV = window.WebKitMediaKeys;
                return null == WV || null == WV.isTypeSupported ? void 0 : WV.isTypeSupported("com.apple.fps.1_0", "video/mp4");
              }
              return WH;
            }
            return Ww;
          };
          Wg.B.push({
            name: "shaka",
            supports(Ww) {
              return (
                !(Ww.drm && !(0, Wq.d3)(Ww.drm)) &&
                !(!window.HTMLVideoElement || !window.MediaSource) &&
                WP(Ww.mediaTypes) &&
                ("hls" === Ww.type || "dash" === Ww.type || "mpd" === Ww.type || -1 < (Ww.file || "").indexOf("mpd-time-csf"))
              );
            }
          });
          Wg.B.unshift({
            name: "hlsjs",
            supports: (Ww) => {
              return (
                !(Ww = Ww).drm &&
                ((WF = -1 < Ww.file.indexOf(".m3u8")), (WS = "hls" === Ww.type || "m3u8" === Ww.type), WF || WS) &&
                ((WS =
                  !(WF = Boolean(null == WE.Z || null == WE.Z.canPlayType ? void 0 : WE.Z.canPlayType("application/vnd.apple.mpegURL"))) ||
                  Wo.OS.android ||
                  Wo.OS.tizen),
                (WF = Wo.Browser.safari && !WF),
                (WH = Wo.OS.android && false === Ww.hlsjsdefault),
                (WV = Wo.Browser.safari && Boolean(Ww.safarihlsjs)),
                WP(Ww.mediaTypes || ['video/mp4;codecs="avc1.4d400d,mp4a.40.2"'])) &&
                (WS || WV || WF) &&
                !WH
              );
              var WS, WF, WH, WV;
            }
          });
        }
        const Wk = Wg.B;
      },
      2303: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => WP });
        var Wg = Wl(2963),
          Wo = Wl(12),
          WT = Wl(670),
          WC = Wl(2894),
          Wu = {
            html5: () =>
              Wl.e(250)
                .then(
                  function (Wk) {
                    var WM = Wl(9181).default;
                    return (0, WT.Z)(WM), WM;
                  }.bind(null, Wl)
                )
                .catch((0, WC.Ep)(152))
          };
        Object.assign(Wu, {
          shaka: () =>
            Wl.e(371)
              .then(
                function (Wk) {
                  var WM = Wl(2287).default;
                  return (0, WT.Z)(WM), WM;
                }.bind(null, Wl)
              )
              .catch((0, WC.Ep)(154)),
          hlsjs: () =>
            Wl.e(98)
              .then(
                function (Wk) {
                  var WM = Wl(9054).default;
                  return (0, WT.Z)(WM), WM;
                }.bind(null, Wl)
              )
              .catch((0, WC.Ep)(153))
        });

        function Wq(Wk) {
          this.config = Wk || {};
        }

        const WE = Wu;
        Object.assign(Wq.prototype, {
          load(Wk) {
            const WM = WE[Wk],
              WG = () => Promise.reject(new Error("Failed to load media"));
            return WM
              ? WM().then(() => {
                  return Wo.U[Wk] || WG();
                })
              : WG();
          },
          providerSupports: (Wk, WM) => Wk.supports(WM),
          choose(Wk) {
            if (Wk === Object(Wk)) {
              var WM = Wg.B.length;
              for (let Ww = 0; Ww < WM; Ww++) {
                var WG = Wg.B[Ww];
                if (this.providerSupports(WG, Wk)) {
                  return {
                    priority: WM - Ww - 1,
                    name: WG.name,
                    type: Wk.type,
                    providerToCheck: WG,
                    provider: Wo.U[WG.name]
                  };
                }
              }
            }
            return {};
          }
        });
        Wu = Wq;
        Wu.prototype.providerSupports = function (Wk, WM) {
          return Wk.supports(WM, this.config.edition);
        };
        const WP = Wu;
      },
      5140: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { t: () => Wg });
        const Wg = window.atob;
        window.btoa;
      },
      386: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          Z: () =>
            function (WS) {
              const WF = {
                setup: [Wg, Wo, "business", WC, "enterprise", WE, Wk, WM, WG, WP],
                drm: ["enterprise", WE, Wk, WM, WG],
                ads: [Wk, WM, WG, WP, "enterprise", WE, "business"],
                jwpsrv: [Wg, Wo, "business", WC, "enterprise", WE, Wk, WG, WP, Ww],
                discovery: [Wk, "enterprise", WE, WG, WM]
              };
              return function (WH) {
                return WF[WH] && -1 < WF[WH].indexOf(WS);
              };
            }
        });
        const Wg = "free",
          Wo = "starter",
          WC = "premium",
          WE = "developer",
          WP = "platinum",
          Wk = "ads",
          WM = "unlimited",
          WG = "trial",
          Ww = "invalid";
      },
      7010: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          Z: () =>
            function () {
              return Wo(window, document.location.search);
            }
        });
        var Wg = Wl(5950);
        const Wo = function (WT, WC) {
          return WT.location !== WT.parent.location && (0, Wg.ke)(WC, "isAMP");
        };
      },
      560: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { Z: () => Wo });
        const Wg = () => Wg["_iframe"],
          Wo =
            ((Wg.mock = (WT) => {
              Wg["_iframe"] = WT;
            }),
            (Wg.unmock = () => {
              Wg["_iframe"] = Wg["_original"];
            }),
            (Wg["_iframe"] = window.top !== window.self),
            (Wg["_original"] = Wg["_iframe"]),
            Wg);
      },
      6599: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, {
          ZP: () => WP,
          u5: () => 100013
        });
        var Wg = Wl(5592),
          Wo = Wl(386),
          WT = Wl(5140),
          WC = Wl(4446);
        const WE = "invalid",
          WP = class {
            constructor(Wk) {
              this.keyData = ((WM) => {
                let WG, Ww, WS;
                try {
                  var WF = (0, Wg.p)(WM || "", (0, WT.t)("NDh2aU1Cb0NHRG5hcDFRZQ==")).split("/");
                  if (("pro" === (WG = WF[0]) && (WG = "premium"), (0, Wo.Z)(WG)("setup") || (WG = WE), 2 < WF.length)) {
                    Ww = WF[1];
                    const WH = parseInt(WF[2], 10);
                    0 < WH && (WS = new Date()).setTime(WH);
                  }
                } catch (WV) {
                  WG = WE;
                }
                return {
                  edition: WG,
                  token: Ww,
                  expiration: WS
                };
              })(Wk);
              this.edition = function () {
                return this.keyData.edition;
              };
              this.token = function () {
                return this.keyData.token;
              };
              this.expiration = function () {
                return this.keyData.expiration;
              };
              this.duration = function () {
                return this.keyData.expiration ? this.keyData.expiration.getTime() - new Date().getTime() : 0;
              };
              this.error = function () {
                let WM;
                return (
                  void 0 === Wk
                    ? (WM = 100011)
                    : this.keyData.edition !== WE && this.keyData.token
                    ? this.duration() < 0 && (WM = 100013)
                    : (WM = 100012),
                  WM ? new WC.rG(WC.pJ, WM) : null
                );
              };
            }
          };
      },
      67: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { X: () => Wo });
        var Wg = Wl(560);
        const Wo = () => {
          let WT = window.location.host;
          if ((0, Wg.Z)()) {
            WT = (document.referrer ? ((WC = document.referrer), ((Wq = document.createElement("a")).href = WC), Wq) : {}).host;
            try {
              WT = WT || window.top.location.host;
            } catch (WE) {}
          }
          var WC, Wq;
          return WT;
        };
      },
      5592: (We, Wu, Wl) => {
        "use strict";
        Wl.d(Wu, { p: () => WT });
        var Wg = Wl(5140);
        const Wo = (WC) => {
            var Wq = new Array(Math.ceil(WC.length / 4));
            for (let WE = 0; WE < Wq.length; WE++) {
              Wq[WE] =
                WC.charCodeAt(4 * WE) + (WC.charCodeAt(4 * WE + 1) << 8) + (WC.charCodeAt(4 * WE + 2) << 16) + (WC.charCodeAt(4 * WE + 3) << 24);
            }
            return Wq;
          },
          WT = function (WC, Wq) {
            if (((WC = String(WC)), (Wq = String(Wq)), 0 === WC.length)) {
              return "";
            }
            var WE = Wo((0, Wg.t)(WC)),
              WP = Wo(unescape(encodeURIComponent(Wq)).slice(0, 16)),
              Wk = WE.length;
            let WM,
              WG,
              Ww = void WE[Wk - 1],
              WS = WE[0],
              WF = 2654435769 * Math.floor(6 + 52 / Wk);
            for (; WF; ) {
              WG = (WF >>> 2) & 3;
              for (let WH = Wk - 1; 0 <= WH; WH--) {
                WM = ((((Ww = WE[0 < WH ? WH - 1 : Wk - 1]) >>> 5) ^ (WS << 2)) + ((WS >>> 3) ^ (Ww << 4))) ^ ((WF ^ WS) + (WP[(3 & WH) ^ WG] ^ Ww));
                WS = WE[WH] -= WM;
              }
              WF -= 2654435769;
            }
            WC = ((WV) => {
              var Wr = new Array(WV.length);
              for (let Wb = 0; Wb < WV.length; Wb++) {
                Wr[Wb] = String.fromCharCode(255 & WV[Wb], (WV[Wb] >>> 8) & 255, (WV[Wb] >>> 16) & 255, (WV[Wb] >>> 24) & 255);
              }
              return Wr.join("");
            })(WE).replace(/\0+$/, "");
            try {
              return decodeURIComponent(escape(WC));
            } catch (WV) {
              return WC;
            }
          };
      },
      1096: function (We) {
        We.exports = (function () {
          "use strict";

          function Wu() {}

          function Wl(WP) {
            if (!(this instanceof Wl)) {
              throw new TypeError("Promises must be constructed via new");
            }
            if ("function" != typeof WP) {
              throw new TypeError("not a function");
            }
            this["_state"] = 0;
            this["_handled"] = false;
            this["_value"] = void 0;
            this["_deferreds"] = [];
            Wq(WP, this);
          }

          function Wg(WP, Wk) {
            for (; 3 === WP["_state"]; ) {
              WP = WP["_value"];
            }
            0 !== WP["_state"]
              ? ((WP["_handled"] = true),
                Wl["_immediateFn"](function () {
                  var WM,
                    WG = 1 === WP["_state"] ? Wk.onFulfilled : Wk.onRejected;
                  if (null !== WG) {
                    try {
                      WM = WG(WP["_value"]);
                    } catch (Ww) {
                      return void WT(Wk.promise, Ww);
                    }
                    Wo(Wk.promise, WM);
                  } else {
                    (1 === WP["_state"] ? Wo : WT)(Wk.promise, WP["_value"]);
                  }
                }))
              : WP["_deferreds"].push(Wk);
          }

          function Wo(WP, Wk) {
            try {
              if (Wk === WP) {
                throw new TypeError("A promise cannot be resolved with itself.");
              }
              if (Wk && ("object" == typeof Wk || "function" == typeof Wk)) {
                var WM = Wk.then;
                if (Wk instanceof Wl) {
                  return (WP["_state"] = 3), (WP["_value"] = Wk), WC(WP);
                }
                if ("function" == typeof WM) {
                  return Wq(
                    ((WG = WM),
                    (Ww = Wk),
                    function () {
                      WG.apply(Ww, arguments);
                    }),
                    WP
                  );
                }
              }
              WP["_state"] = 1;
              WP["_value"] = Wk;
              WC(WP);
            } catch (WS) {
              WT(WP, WS);
            }
            var WG, Ww;
          }

          function WT(WP, Wk) {
            WP["_state"] = 2;
            WP["_value"] = Wk;
            WC(WP);
          }

          function WC(WP) {
            2 === WP["_state"] &&
              0 === WP["_deferreds"].length &&
              Wl["_immediateFn"](function () {
                WP["_handled"] || Wl["_unhandledRejectionFn"](WP["_value"]);
              });
            for (var Wk = 0, WM = WP["_deferreds"].length; Wk < WM; Wk++) {
              Wg(WP, WP["_deferreds"][Wk]);
            }
            WP["_deferreds"] = null;
          }

          function Wq(WP, Wk) {
            var WM = false;
            try {
              WP(
                function (WG) {
                  WM || ((WM = true), Wo(Wk, WG));
                },
                function (WG) {
                  WM || ((WM = true), WT(Wk, WG));
                }
              );
            } catch (WG) {
              WM || ((WM = true), WT(Wk, WG));
            }
          }

          var WE = setTimeout;
          return (
            (Wl.prototype.catch = function (WP) {
              return this.then(null, WP);
            }),
            (Wl.prototype.then = function (WP, Wk) {
              var WM = new this.constructor(Wu);
              return (
                Wg(
                  this,
                  new (function (WG, Ww, WS) {
                    this.onFulfilled = "function" == typeof WP ? WP : null;
                    this.onRejected = "function" == typeof Ww ? Ww : null;
                    this.promise = WS;
                  })(0, Wk, WM)
                ),
                WM
              );
            }),
            (Wl.prototype.finally = function (WP) {
              var Wk = this.constructor;
              return this.then(
                function (WM) {
                  return Wk.resolve(WP()).then(function () {
                    return WM;
                  });
                },
                function (WM) {
                  return Wk.resolve(WP()).then(function () {
                    return Wk.reject(WM);
                  });
                }
              );
            }),
            (Wl.all = function (WP) {
              return new Wl(function (Wk, WM) {
                if (!WP || void 0 === WP.length) {
                  throw new TypeError("Promise.all accepts an array");
                }
                var WG = Array.prototype.slice.call(WP);
                if (0 === WG.length) {
                  return Wk([]);
                }
                for (var Ww = WG.length, WS = 0; WG.length > WS; WS++) {
                  !(function WF(WH, WV) {
                    try {
                      if (WV && ("object" == typeof WV || "function" == typeof WV)) {
                        var Wr = WV.then;
                        if ("function" == typeof Wr) {
                          return Wr.call(
                            WV,
                            function (Wb) {
                              WF(WH, Wb);
                            },
                            WM
                          );
                        }
                      }
                      WG[WH] = WV;
                      0 == --Ww && Wk(WG);
                    } catch (Wb) {
                      WM(Wb);
                    }
                  })(WS, WG[WS]);
                }
              });
            }),
            (Wl.resolve = function (WP) {
              return WP && "object" == typeof WP && WP.constructor === Wl
                ? WP
                : new Wl(function (Wk) {
                    Wk(WP);
                  });
            }),
            (Wl.reject = function (WP) {
              return new Wl(function (Wk, WM) {
                WM(WP);
              });
            }),
            (Wl.race = function (WP) {
              return new Wl(function (Wk, WM) {
                for (var WG = 0, Ww = WP.length; WG < Ww; WG++) {
                  WP[WG].then(Wk, WM);
                }
              });
            }),
            (Wl["_immediateFn"] =
              "function" == typeof setImmediate
                ? function (WP) {
                    setImmediate(WP);
                  }
                : function (WP) {
                    WE(WP, 0);
                  }),
            (Wl["_unhandledRejectionFn"] = function (WP) {
              void 0 !== console && console && console.warn("Possible Unhandled Promise Rejection:", WP);
            }),
            Wl
          );
        })();
      },
      9563: (We) => {
        var Wu,
          Wl,
          Wg = { WG: Wg[WG] || {} },
          Wo = {},
          WT =
            ((Wu = function () {
              return document.head || document.getElementsByTagName("head")[0];
            }),
            function () {
              return (Wl = void 0 === Wl ? Wu.apply(this, arguments) : Wl);
            });

        function WC(Wk, WM) {
          var WG,
            Ww,
            WS = Wo[Wk],
            WF = (WS =
              WS ||
              (Wo[Wk] = {
                element:
                  ((Wk = Wk),
                  ((Ww = document.createElement("style")).type = "text/css"),
                  Ww.setAttribute("data-jwplayer-id", Wk),
                  (Wk = Ww),
                  WT().appendChild(Wk),
                  Ww),
                counter: 0
              })).counter++,
            WH = WS.element,
            WV = function () {
              WP(WH, WF, "");
            };
          return (
            (WG = function (Wr) {
              WP(WH, WF, Wr);
            })(WM.css),
            function (Wr) {
              Wr ? (Wr.css === WM.css && Wr.media === WM.media) || WG((WM = Wr).css) : WV();
            }
          );
        }

        We.exports = {
          style: function (Wk, WM) {
            for (
              var WG = WM,
                Ww = (function (Wb) {
                  for (
                    var WX = [],
                      Wt = {
                        WA: Wt[WA].charAt(0).toUpperCase() + Wt[WA].slice(1)
                      },
                      WA = 0;
                    WA < Wb.length;
                    WA++
                  ) {
                    var Wn = Wb[WA],
                      Ws = Wn[0],
                      Wn = {
                        css: Wn[1],
                        media: Wn[2]
                      };
                    Wt[Ws]
                      ? Wt[Ws].parts.push(Wn)
                      : WX.push(
                          (Wt[Ws] = {
                            id: Ws,
                            parts: [Wn]
                          })
                        );
                  }
                  return WX;
                })(Wk),
                WS = 0;
              WS < Ww.length;
              WS++
            ) {
              var WF = Ww[WS],
                WH = (Wg[WG] || {})[WF.id];
              if (WH) {
                for (var WV = 0; WV < WH.parts.length; WV++) {
                  WH.parts[WV](WF.parts[WV]);
                }
                for (; WV < WF.parts.length; WV++) {
                  WH.parts.push(WC(WG, WF.parts[WV]));
                }
              } else {
                for (var Wr = [], WV = 0; WV < WF.parts.length; WV++) {
                  Wr.push(WC(WG, WF.parts[WV]));
                }
                Wg[WG][WF.id] = {
                  id: WF.id,
                  parts: Wr
                };
              }
            }
          },
          clear: function (Wk, WM) {
            var WG = Wg[Wk];
            if (WG) {
              if (WM) {
                var Ww = WG[WM];
                if (Ww) {
                  for (var WS = 0; WS < Ww.parts.length; WS += 1) {
                    Ww.parts[WS]();
                  }
                }
              } else {
                for (var WF = Object.keys(WG), WH = 0; WH < WF.length; WH += 1) {
                  for (var WV = WG[WF[WH]], Wr = 0; Wr < WV.parts.length; Wr += 1) {
                    WV.parts[Wr]();
                  }
                }
                delete Wg[Wk];
              }
            }
          }
        };
        Wq = [];
        var Wq,
          WE = function (Wk, WM) {
            return (Wq[Wk] = WM), Wq.filter(Boolean).join("\n");
          };

        function WP(Wk, WM, WG) {
          Wk.styleSheet
            ? (Wk.styleSheet.cssText = WE(WM, WG))
            : ((WG = document.createTextNode(WG)), (WM = Wk.childNodes[WM]) ? Wk.replaceChild(WG, WM) : Wk.appendChild(WG));
        }
      },
      4737: (We) => {
        We.exports =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 29.3" class="jw-svg-icon jw-svg-icon-watermark" focusable="false"><path d="M37,16.68c0,2.4-.59,3.43-2.4,3.43a5.75,5.75,0,0,1-3.38-1.23v3.58a7.39,7.39,0,0,0,3.67,1c3.67,0,5.73-1.91,5.73-6.32V5.86H37Z"></path><polygon points="58.33 17.61 55.39 6.01 52.55 6.01 49.52 17.61 46.73 6.01 43.06 6.01 47.56 23.29 50.89 23.29 53.92 11.88 56.96 23.29 60.24 23.29 64.74 6.01 61.17 6.01 58.33 17.61"></polygon><path d="M73.84,6H67.47V23.29h2.2v-6.9h4.17c3.47,0,5.77-1.77,5.77-5.19S77.31,6,73.84,6Zm0,8.47H69.72V8h4.12c2.3,0,3.57,1.22,3.62,3.28C77.46,13.21,76.19,14.48,73.84,14.48Z"></path><path d="M99.2,6l-6,15.27H85V6H82.8V23.29H94.7l2-5.19h7.09l2,5.19H108L101.26,6ZM97.39,16.14l2.84-7.39L103,16.14Z"></path><polygon points="113.98 14.18 108.99 6.01 106.59 6.01 112.81 16.14 112.81 23.29 115.01 23.29 115.01 16.14 121.33 6.01 118.98 6.01 113.98 14.18"></polygon><polygon points="123.14 23.29 134.1 23.29 134.1 21.28 125.29 21.28 125.29 15.41 133.32 15.41 133.32 13.45 125.29 13.45 125.29 7.97 134.1 7.97 134.1 6.01 123.14 6.01 123.14 23.29"></polygon><path d="M144.86,15.85c2.74-.39,4.41-2,4.41-4.85,0-3.23-2.26-5-5.73-5h-6.32V23.29h2.22V16h3.08l4.94,7.29H150Zm-5.42-1.71V8h4.06c2.3,0,3.62,1.17,3.62,3.08s-1.32,3.09-3.62,3.09Z"></path><path d="M27.63.09a1,1,0,0,0-1.32.48c-.24.51-6.35,15.3-6.35,15.3-.2.46-.33.41-.33-.07,0,0,0-5.15,0-9.39,0-2.31-1.12-3.61-2.73-3.88A3.12,3.12,0,0,0,14.83,3a4.57,4.57,0,0,0-1.5,1.79c-.48.94-3.47,9.66-3.47,9.66-.16.46-.31.44-.31,0,0,0-.09-3.76-.18-4.64-.13-1.36-.44-3.59-2.2-3.7S4.77,8,4.36,9.24c-.29.84-1.65,5.35-1.65,5.35l-.2.46h0c-.06.24-.17.24-.24,0l-.11-.42Q2,14,1.74,13.31a1.71,1.71,0,0,0-.33-.66.83.83,0,0,0-.88-.22.82.82,0,0,0-.53.69,4.22,4.22,0,0,0,.07.79,29,29,0,0,0,1,4.6,1.31,1.31,0,0,0,1.8.66,3.43,3.43,0,0,0,1.24-1.81c.33-.81,2-5.48,2-5.48.18-.46.31-.44.29,0,0,0-.09,4.57-.09,6.64a13.11,13.11,0,0,0,.28,2.93,2.41,2.41,0,0,0,.82,1.27,2,2,0,0,0,1.41.4,2,2,0,0,0,.7-.24,3.15,3.15,0,0,0,.79-.71,12.52,12.52,0,0,0,1.26-2.11c.81-1.6,2.92-6.58,2.92-6.58.2-.46.33-.41.33.07,0,0-.26,8.36-.26,11.55a6.39,6.39,0,0,0,.44,2.33,2.8,2.8,0,0,0,1.45,1.61A2.57,2.57,0,0,0,18.79,29a3.76,3.76,0,0,0,1.28-1.32,15.12,15.12,0,0,0,1.07-2.31c.64-1.65,1.17-3.33,1.7-5s5-17.65,5.28-19a1.79,1.79,0,0,0,0-.46A1,1,0,0,0,27.63.09Z"></path></svg>';
      }
    },
    WW = {};

  function Wf(We) {
    var Wu = WW[We];
    return (
      void 0 !== Wu ||
        ((Wu = WW[We] =
          {
            id: We,
            loaded: false,
            exports: {}
          }),
        W9[We].call(Wu.exports, Wu, Wu.exports, Wf),
        (Wu.loaded = true)),
      Wu.exports
    );
  }

  Wf.m = W9;
  Wf.n = (We) => {
    var Wu = We && We["__esModule"] ? () => We.default : () => We;
    return Wf.d(Wu, { a: Wu }), Wu;
  };
  Wf.d = (We, Wu) => {
    for (var Wl in Wu)
      Wf.o(Wu, Wl) &&
        !Wf.o(We, Wl) &&
        Object.defineProperty(We, Wl, {
          enumerable: true,
          get: Wu[Wl]
        });
  };
  Wf.f = {};
  Wf.e = (We) => Promise.all(Object.keys(Wf.f).reduce((Wu, Wl) => (Wf.f[Wl](We, Wu), Wu), []));
  Wf.u = (We) =>
    ({
      63: "polyfills.webvtt",
      74: "jwplayer.controls.tizen",
      98: "provider.hlsjs",
      168: "jwplayer.amp",
      207: "jwplayer.core.controls.html5",
      250: "provider.html5",
      347: "vttparser",
      365: "related",
      371: "provider.shaka",
      493: "jwplayer.core.controls.polyfills",
      520: "provider.airplay",
      581: "jwplayer.core.controls",
      605: "jwplayer.core.controls.polyfills.html5",
      681: "jwplayer.core",
      716: "jwplayer.controls",
      926: "jwplayer.stats",
      943: "polyfills.intersection-observer",
      977: "provider.cast"
    })[We] + ".js";
  Wf.o = (We, Wu) => Object.prototype.hasOwnProperty.call(We, Wu);
  W5 = {};
  W6 = "jwplayer:";
  Wf.l = (We, Wu, Wl, Wg) => {
    if (W5[We]) {
      W5[We].push(Wu);
    } else {
      var Wo, WT;
      if (void 0 !== Wl) {
        for (var WC = document.getElementsByTagName("script"), Wq = 0; Wq < WC.length; Wq++) {
          var WE = WC[Wq];
          if (WE.getAttribute("src") == We || WE.getAttribute("data-webpack") == W6 + Wl) {
            Wo = WE;
            break;
          }
        }
      }
      Wo ||
        ((WT = true),
        ((Wo = document.createElement("script")).charset = "utf-8"),
        (Wo.timeout = 55),
        Wf.nc && Wo.setAttribute("nonce", Wf.nc),
        Wo.setAttribute("data-webpack", W6 + Wl),
        (Wo.src = We));
      W5[We] = [Wu];
      var Wu = (Wk, WM) => {
          clearTimeout(WP);
          var WG = W5[We];
          if ((delete W5[We], Wo.parentNode && Wo.parentNode.removeChild(Wo), WG && WG.forEach((Ww) => Ww(WM)), Wk)) {
            return Wk(WM);
          }
        },
        WP = setTimeout(
          Wu.bind(null, void 0, {
            type: "timeout",
            target: Wo
          }),
          55000
        );
      WT && document.head.appendChild(Wo);
    }
  };
  Wf.r = (We) => {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(We, Symbol.toStringTag, { value: "Module" });
    Object.defineProperty(We, "__esModule", { value: true });
  };
  Wf.nmd = (We) => ((We.paths = []), We.children || (We.children = []), We);
  Wf.p = "";
  W7 = { 313: 0 };
  Wf.f.j = (We, Wu) => {
    var Wl,
      Wg,
      Wo = Wf.o(W7, We) ? W7[We] : void 0;
    0 !== Wo &&
      (Wo
        ? Wu.push(Wo[2])
        : ((Wl = new Promise((WT, WC) => (Wo = W7[We] = [WT, WC]))),
          Wu.push((Wo[2] = Wl)),
          (Wu = Wf.p + Wf.u(We)),
          (Wg = new Error()),
          Wf.l(
            Wu,
            (WT) => {
              var WC;
              Wf.o(W7, We) &&
                (0 !== (Wo = W7[We]) && (W7[We] = void 0), Wo) &&
                ((WC = WT && ("load" === WT.type ? "missing" : WT.type)),
                (WT = WT && WT.target && WT.target.src),
                (Wg.message = "Loading chunk " + We + " failed.\n(" + WC + ": " + WT + ")"),
                (Wg.name = "ChunkLoadError"),
                (Wg.type = WC),
                (Wg.request = WT),
                Wo[1](Wg));
            },
            "chunk-" + We,
            We
          )));
  };
  WD = (We, Wu) => {
    var Wl,
      Wg,
      [Wo, WT, WC] = Wu,
      Wq = 0;
    if (Wo.some((WE) => 0 !== W7[WE])) {
      for (Wl in WT) Wf.o(WT, Wl) && (Wf.m[Wl] = WT[Wl]);
      WC && WC(Wf);
    }
    for (We && We(Wu); Wq < Wo.length; Wq++) {
      Wg = Wo[Wq];
      Wf.o(W7, Wg) && W7[Wg] && W7[Wg][0]();
      W7[Wg] = 0;
    }
  };
  (W8 = self.webpackChunkjwplayer = self.webpackChunkjwplayer || []).forEach(WD.bind(null, 0));
  W8.push = WD.bind(null, W8.push.bind(W8));
  Wf.nc = void 0;
  var WD = Wf(576);
  window.jwplayer = WD.default;
})();
var u = {
    aspectratio: "16:9",
    autostart: true,
    cast: {},
    controls: true,
    displaydescription: true,
    displaytitle: true,
    height: 360,
    key: "c0aT46U3ErQHTVVMOpiZ/+QuUX9WZx0xr1op/SRaV2Pp73j9j1ldRfDiAY2ijN96",
    mute: false,
    ph: 1,
    pid: "KB5zFt7A",
    playbackRateControls: false,
    preload: "metadata",
    repeat: false,
    stretching: "uniform",
    width: "100%"
  },
  l =
    ((jwplayer.defaults = u),
    !(function (W5, W6) {
      var W7, W8;
      "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = W6())
        : "function" == typeof define && define.amd
        ? define(W6)
        : ((W5 = W5 || self),
          (W7 = W5.Cookies),
          ((W8 = W5.Cookies = W6()).noConflict = function () {
            return (W5.Cookies = W7), W8;
          }));
    })(this, function () {
      "use strict";

      function W5(W7) {
        for (var W8 = 1; W8 < arguments.length; W8++) {
          var W9,
            WW = arguments[W8];
          for (W9 in WW) W7[W9] = WW[W9];
        }
        return W7;
      }

      var W6 = {
        read: function (W7) {
          return W7.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
        },
        write: function (W7) {
          return encodeURIComponent(W7).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
        }
      };
      return (function W7(W8, W9) {
        function WW(Wf, WD, We) {
          if ("undefined" != typeof document) {
            "number" == typeof (We = W5({}, W9, We)).expires && (We.expires = new Date(Date.now() + 86400000 * We.expires));
            We.expires && (We.expires = We.expires.toUTCString());
            Wf = encodeURIComponent(Wf)
              .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
              .replace(/[()]/g, escape);
            WD = W8.write(WD, Wf);
            var Wu,
              Wl = "";
            for (Wu in We) We[Wu] && ((Wl += "; " + Wu), true !== We[Wu]) && (Wl += "=" + We[Wu].split(";")[0]);
            return (document.cookie = Wf + "=" + WD + Wl);
          }
        }

        return Object.create(
          {
            set: WW,
            get: function (Wf) {
              if ("undefined" != typeof document && (!arguments.length || Wf)) {
                for (var WD = document.cookie ? document.cookie.split("; ") : [], We = {}, Wu = 0; Wu < WD.length; Wu++) {
                  var Wl = WD[Wu].split("="),
                    Wg = Wl.slice(1).join("=");
                  '"' === Wg[0] && (Wg = Wg.slice(1, -1));
                  try {
                    var Wo = W6.read(Wl[0]);
                    if (((We[Wo] = W8.read(Wg, Wo)), Wf === Wo)) {
                      break;
                    }
                  } catch (WT) {}
                }
                return Wf ? We[Wf] : We;
              }
            },
            remove: function (Wf, WD) {
              WW(Wf, "", W5({}, WD, { expires: -1 }));
            },
            withAttributes: function (Wf) {
              return W7(this.converter, W5({}, this.attributes, Wf));
            },
            withConverter: function (Wf) {
              return W7(W5({}, this.converter, Wf), this.attributes);
            }
          },
          {
            attributes: { value: Object.freeze(W9) },
            converter: { value: Object.freeze(W8) }
          }
        );
      })(W6, { path: "/" });
    }),
    !(function (W5) {
      (function () {
        if ("undefined" != typeof module && module.exports) {
          return function (W6) {
            module.exports = W6();
          };
        }
        if ("function" == typeof define && define.amd) {
          return define;
        }
        if ("undefined" != typeof window) {
          return function (W6) {
            window.MobileDetect = W6();
          };
        }
        throw new Error("unknown environment");
      })()(function () {
        "use strict";

        function W6(Wq, WE) {
          return null != Wq && null != WE && Wq.toLowerCase() === WE.toLowerCase();
        }

        function W7(Wq, WE) {
          var WP,
            Wk,
            WM = Wq.length;
          if (WM && WE) {
            for (WP = WE.toLowerCase(), Wk = 0; Wk < WM; ++Wk) {
              if (WP === Wq[Wk].toLowerCase()) {
                return true;
              }
            }
          }
          return false;
        }

        function W8(Wq) {
          for (var WE in Wq) Wo.call(Wq, WE) && (Wq[WE] = new RegExp(Wq[WE], "i"));
        }

        function W9(Wq, WE) {
          this.ua = (Wq || "").substr(0, 500);
          this["_cache"] = {};
          this.maxPhoneWidth = WE || 600;
        }

        var WW,
          Wf,
          WD,
          We,
          Wu,
          Wl,
          Wg = {
            mobileDetectRules: {
              phones: {
                iPhone: "\\biPhone\\b|\\biPod\\b",
                BlackBerry: "BlackBerry|\\bBB10\\b|rim[0-9]+|\\b(BBA100|BBB100|BBD100|BBE100|BBF100|STH100)\\b-[0-9]+",
                HTC: "HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m|Android [0-9.]+; Pixel",
                Nexus: "Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6",
                Dell: "Dell[;]? (Streak|Aero|Venue|Venue Pro|Flash|Smoke|Mini 3iX)|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b",
                Motorola:
                  "Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b|XT1068|XT1092|XT1052",
                Samsung:
                  "\\bSamsung\\b|SM-G950F|SM-G955F|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350|SM-J120F|SM-G920F|SM-G920V|SM-G930F|SM-N910C|SM-A310F|GT-I9190|SM-J500FN|SM-G903F|SM-J330F",
                LG: "\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323|M257)|LM-G710",
                Sony: "SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533",
                Asus: "Asus.*Galaxy|PadFone.*Mobile",
                NokiaLumia: "Lumia [0-9]{3,4}",
                Micromax: "Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b",
                Palm: "PalmSource|Palm",
                Vertu: "Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature",
                Pantech:
                  "PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790",
                Fly: "IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250",
                Wiko: "KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA(?!nna)|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM",
                iMobile: "i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)",
                SimValley: "\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b",
                Wolfgang: "AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q",
                Alcatel: "Alcatel",
                Nintendo: "Nintendo (3DS|Switch)",
                Amoi: "Amoi",
                INQ: "INQ",
                OnePlus: "ONEPLUS",
                GenericPhone:
                  "Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser"
              },
              tablets: {
                iPad: "iPad|iPad.*Mobile",
                NexusTablet: "Android.*Nexus[\\s]+(7|9|10)",
                GoogleTablet: "Android.*Pixel C",
                SamsungTablet:
                  "SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-T116BU|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561|SM-T713|SM-T719|SM-T813|SM-T819|SM-T580|SM-T355Y?|SM-T280|SM-T817A|SM-T820|SM-W700|SM-P580|SM-T587|SM-P350|SM-P555M|SM-P355M|SM-T113NU|SM-T815Y|SM-T585|SM-T285|SM-T825|SM-W708|SM-T835|SM-T830|SM-T837V|SM-T720|SM-T510|SM-T387V",
                Kindle:
                  "Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI|KFARWI|KFFOWI|KFGIWI|KFMEWI)\\b|Android.*Silk/[0-9.]+ like Chrome/[0-9.]+ (?!Mobile)",
                SurfaceTablet: "Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)",
                HPTablet: "HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10",
                AsusTablet:
                  "^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K011 | K017 | K01E |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C|P01Y|PO1MA|P01Z|\\bP027\\b|\\bP024\\b|\\bP00C\\b",
                BlackBerryTablet: "PlayBook|RIM Tablet",
                HTCtablet: "HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410",
                MotorolaTablet: "xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617",
                NookTablet: "Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2",
                AcerTablet:
                  "Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b|\\bA3-A20\\b|\\bA3-A30",
                ToshibaTablet: "Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO",
                LGTablet: "\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b",
                FujitsuTablet: "Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b",
                PrestigioTablet:
                  "PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002",
                LenovoTablet:
                  "Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|YT3-850M|YT3-X90L|YT3-X90F|YT3-X90X|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)|TB-X103F|TB-X304X|TB-X304F|TB-X304L|TB-X505F|TB-X505L|TB-X505X|TB-X605F|TB-X605L|TB-8703F|TB-8703X|TB-8703N|TB-8704N|TB-8704F|TB-8704X|TB-8704V|TB-7304F|TB-7304I|TB-7304X|Tab2A7-10F|Tab2A7-20F|TB2-X30L|YT3-X50L|YT3-X50F|YT3-X50M|YT-X705F|YT-X703F|YT-X703L|YT-X705L|YT-X705X|TB2-X30F|TB2-X30L|TB2-X30M|A2107A-F|A2107A-H|TB3-730F|TB3-730M|TB3-730X|TB-7504F|TB-7504X",
                DellTablet: "Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7",
                YarvikTablet:
                  "Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b",
                MedionTablet: "Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB",
                ArnovaTablet: "97G4|AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2",
                IntensoTablet: "INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004",
                IRUTablet: "M702pro",
                MegafonTablet: "MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b",
                EbodaTablet: "E-Boda (Supreme|Impresspeed|Izzycomm|Essential)",
                AllViewTablet: "Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)",
                ArchosTablet:
                  "\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|c|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b",
                AinolTablet: "NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark",
                NokiaLumiaTablet: "Lumia 2520",
                SonyTablet:
                  "Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP641|SGP612|SOT31|SGP771|SGP611|SGP612|SGP712",
                PhilipsTablet: "\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b",
                CubeTablet: "Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT",
                CobyTablet:
                  "MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010",
                MIDTablet:
                  "M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10",
                MSITablet:
                  "MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b",
                SMiTTablet: "Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)",
                RockChipTablet: "Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A",
                FlyTablet: "IQ310|Fly Vision",
                bqTablet:
                  "Android.*(bq)?.*\\b(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris ([E|M]10|M8))\\b|Maxwell.*Lite|Maxwell.*Plus",
                HuaweiTablet:
                  "MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim|M2-A01L|BAH-L09|BAH-W09|AGS-L09|CMR-AL19",
                NecTablet: "\\bN-06D|\\bN-08D",
                PantechTablet: "Pantech.*P4100",
                BronchoTablet: "Broncho.*(N701|N708|N802|a710)",
                VersusTablet: "TOUCHPAD.*[78910]|\\bTOUCHTAB\\b",
                ZyncTablet: "z1000|Z99 2G|z930|z990|z909|Z919|z900",
                PositivoTablet: "TB07STA|TB10STA|TB07FTA|TB10FTA",
                NabiTablet: "Android.*\\bNabi",
                KoboTablet: "Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build",
                DanewTablet: "DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b",
                TexetTablet:
                  "NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE",
                PlaystationTablet: "Playstation.*(Portable|Vita)",
                TrekstorTablet: "ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab",
                PyleAudioTablet: "\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b",
                AdvanTablet:
                  "Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ",
                DanyTechTablet:
                  "Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1",
                GalapadTablet: "Android.*\\bG1\\b(?!\\))",
                MicromaxTablet: "Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b",
                KarbonnTablet: "Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b",
                AllFineTablet: "Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide",
                PROSCANTablet:
                  "\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b",
                YONESTablet: "BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026",
                ChangJiaTablet:
                  "TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503",
                GUTablet: "TX-A1301|TX-M9002|Q702|kf026",
                PointOfViewTablet:
                  "TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10",
                OvermaxTablet:
                  "OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)|Qualcore 1027",
                HCLTablet:
                  "HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync",
                DPSTablet: "DPS Dream 9|DPS Dual 7",
                VistureTablet: "V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10",
                CrestaTablet: "CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989",
                MediatekTablet: "\\bMT8125|MT8389|MT8135|MT8377\\b",
                ConcordeTablet: "Concorde([ ]+)?Tab|ConCorde ReadMan",
                GoCleverTablet:
                  "GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042",
                ModecomTablet:
                  "FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003",
                VoninoTablet:
                  "\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b",
                ECSTablet: "V07OT2|TM105A|S10OT1|TR10CS1",
                StorexTablet: "eZee[_']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab",
                VodafoneTablet: "SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7|VF-1497|VFD 1400",
                EssentielBTablet: "Smart[ ']?TAB[ ]+?[0-9]+|Family[ ']?TAB2",
                RossMoorTablet: "RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711",
                iMobileTablet: "i-mobile i-note",
                TolinoTablet: "tolino tab [0-9.]+|tolino shine",
                AudioSonicTablet: "\\bC-22Q|T7-QC|T-17B|T-17P\\b",
                AMPETablet: "Android.* A78 ",
                SkkTablet: "Android.* (SKYPAD|PHOENIX|CYCLOPS)",
                TecnoTablet: "TECNO P9|TECNO DP8D",
                JXDTablet:
                  "Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b",
                iJoyTablet:
                  "Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)",
                FX2Tablet: "FX2 PAD7|FX2 PAD10",
                XoroTablet:
                  "KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151",
                ViewsonicTablet: "ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a",
                VerizonTablet: "QTAQZ3|QTAIR7|QTAQTZ3|QTASUN1|QTASUN2|QTAXIA1",
                OdysTablet: "LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10",
                CaptivaTablet: "CAPTIVA PAD",
                IconbitTablet:
                  "NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S",
                TeclastTablet:
                  "T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi",
                OndaTablet:
                  "\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+|V10 \\b4G\\b",
                JaytechTablet: "TPC-PA762",
                BlaupunktTablet: "Endeavour 800NG|Endeavour 1010",
                DigmaTablet: "\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b",
                EvolioTablet: "ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b",
                LavaTablet: "QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b",
                AocTablet: "MW0811|MW0812|MW0922|MTK8382|MW1031|MW0831|MW0821|MW0931|MW0712",
                MpmanTablet:
                  "MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010",
                CelkonTablet: "CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b",
                WolderTablet:
                  "miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b",
                MediacomTablet: "M-MPI10C3G|M-SP10EG|M-SP10EGP|M-SP10HXAH|M-SP7HXAH|M-SP10HXBH|M-SP8HXAH|M-SP8MXA",
                MiTablet: "\\bMI PAD\\b|\\bHM NOTE 1W\\b",
                NibiruTablet: "Nibiru M1|Nibiru Jupiter One",
                NexoTablet: "NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI",
                LeaderTablet:
                  "TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100",
                UbislateTablet: "UbiSlate[\\s]?7C",
                PocketBookTablet: "Pocketbook",
                KocasoTablet: "\\b(TB-1207)\\b",
                HisenseTablet: "\\b(F5281|E2371)\\b",
                Hudl: "Hudl HT7S3|Hudl 2",
                TelstraTablet: "T-Hub2",
                GenericTablet:
                  "Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bTP750\\b|\\bQTAQZ3\\b|WVT101|TM1088|KT107"
              },
              oss: {
                AndroidOS: "Android",
                BlackBerryOS: "blackberry|\\bBB10\\b|rim tablet os",
                PalmOS: "PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino",
                SymbianOS: "Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b",
                WindowsMobileOS: "Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Windows Mobile|Windows Phone [0-9.]+|WCE;",
                WindowsPhoneOS: "Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;",
                iOS: "\\biPhone.*Mobile|\\biPod|\\biPad|AppleCoreMedia",
                iPadOS: "CPU OS 13",
                MeeGoOS: "MeeGo",
                MaemoOS: "Maemo",
                JavaOS: "J2ME/|\\bMIDP\\b|\\bCLDC\\b",
                webOS: "webOS|hpwOS",
                badaOS: "\\bBada\\b",
                BREWOS: "BREW"
              },
              uas: {
                Chrome: "\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?",
                Dolfin: "\\bDolfin\\b",
                Opera: "Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+$|Coast/[0-9.]+",
                Skyfire: "Skyfire",
                Edge: "Mobile Safari/[.0-9]* Edge",
                IE: "IEMobile|MSIEMobile",
                Firefox: "fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS",
                Bolt: "bolt",
                TeaShark: "teashark",
                Blazer: "Blazer",
                Safari: "Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari",
                WeChat: "\\bMicroMessenger\\b",
                UCBrowser: "UC.*Browser|UCWEB",
                baiduboxapp: "baiduboxapp",
                baidubrowser: "baidubrowser",
                DiigoBrowser: "DiigoBrowser",
                Mercury: "\\bMercury\\b",
                ObigoBrowser: "Obigo",
                NetFront: "NF-Browser",
                GenericBrowser:
                  "NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger",
                PaleMoon: "Android.*PaleMoon|Mobile.*PaleMoon"
              },
              props: {
                Mobile: "Mobile/[VER]",
                Build: "Build/[VER]",
                Version: "Version/[VER]",
                VendorID: "VendorID/[VER]",
                iPad: "iPad.*CPU[a-z ]+[VER]",
                iPhone: "iPhone.*CPU[a-z ]+[VER]",
                iPod: "iPod.*CPU[a-z ]+[VER]",
                Kindle: "Kindle/[VER]",
                Chrome: ["Chrome/[VER]", "CriOS/[VER]", "CrMo/[VER]"],
                Coast: ["Coast/[VER]"],
                Dolfin: "Dolfin/[VER]",
                Firefox: ["Firefox/[VER]", "FxiOS/[VER]"],
                Fennec: "Fennec/[VER]",
                Edge: "Edge/[VER]",
                IE: ["IEMobile/[VER];", "IEMobile [VER]", "MSIE [VER];", "Trident/[0-9.]+;.*rv:[VER]"],
                NetFront: "NetFront/[VER]",
                NokiaBrowser: "NokiaBrowser/[VER]",
                Opera: [" OPR/[VER]", "Opera Mini/[VER]", "Version/[VER]"],
                "Opera Mini": "Opera Mini/[VER]",
                "Opera Mobi": "Version/[VER]",
                UCBrowser: ["UCWEB[VER]", "UC.*Browser/[VER]"],
                MQQBrowser: "MQQBrowser/[VER]",
                MicroMessenger: "MicroMessenger/[VER]",
                baiduboxapp: "baiduboxapp/[VER]",
                baidubrowser: "baidubrowser/[VER]",
                SamsungBrowser: "SamsungBrowser/[VER]",
                Iron: "Iron/[VER]",
                Safari: ["Version/[VER]", "Safari/[VER]"],
                Skyfire: "Skyfire/[VER]",
                Tizen: "Tizen/[VER]",
                Webkit: "webkit[ /][VER]",
                PaleMoon: "PaleMoon/[VER]",
                Gecko: "Gecko/[VER]",
                Trident: "Trident/[VER]",
                Presto: "Presto/[VER]",
                Goanna: "Goanna/[VER]",
                iOS: " \\bi?OS\\b [VER][ ;]{1}",
                Android: "Android [VER]",
                BlackBerry: ["BlackBerry[\\w]+/[VER]", "BlackBerry.*Version/[VER]", "Version/[VER]"],
                BREW: "BREW [VER]",
                Java: "Java/[VER]",
                "Windows Phone OS": ["Windows Phone OS [VER]", "Windows Phone [VER]"],
                "Windows Phone": "Windows Phone [VER]",
                "Windows CE": "Windows CE/[VER]",
                "Windows NT": "Windows NT [VER]",
                Symbian: ["SymbianOS/[VER]", "Symbian/[VER]"],
                webOS: ["webOS/[VER]", "hpwOS/[VER];"]
              },
              utils: {
                Bot: "Googlebot|facebookexternalhit|Google-AMPHTML|s~amp-validator|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|YandexMobileBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom|contentkingapp",
                MobileBot: "Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2",
                DesktopMode: "WPDesktop",
                TV: "SonyDTV|HbbTV",
                WebKit: "(webkit)[ /]([\\w.]+)",
                Console: "\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|Nintendo Switch|PLAYSTATION|Xbox)\\b",
                Watch: "SM-V700"
              }
            },
            detectMobileBrowsers: {
              fullPattern:
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
              shortPattern:
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
              tabletPattern: /android|ipad|playbook|silk/i
            }
          },
          Wo = Object.prototype.hasOwnProperty,
          WT =
            ((Wg.FALLBACK_PHONE = "UnknownPhone"),
            (Wg.FALLBACK_TABLET = "UnknownTablet"),
            (Wg.FALLBACK_MOBILE = "UnknownMobile"),
            "isArray" in Array
              ? Array.isArray
              : function (Wq) {
                  return "[object Array]" === Object.prototype.toString.call(Wq);
                }),
          WC = Wg.mobileDetectRules;
        for (WW in WC.props)
          if (Wo.call(WC.props, WW)) {
            for (Wf = WC.props[WW], Wu = (Wf = WT(Wf) ? Wf : [Wf]).length, We = 0; We < Wu; ++We) {
              0 <= (Wl = (WD = Wf[We]).indexOf("[VER]")) && (WD = WD.substring(0, Wl) + "([\\w._\\+]+)" + WD.substring(Wl + 5));
              Wf[We] = new RegExp(WD, "i");
            }
            WC.props[WW] = Wf;
          }
        return (
          W8(WC.oss),
          W8(WC.phones),
          W8(WC.tablets),
          W8(WC.uas),
          W8(WC.utils),
          (WC.oss0 = {
            WindowsPhoneOS: WC.oss.WindowsPhoneOS,
            WindowsMobileOS: WC.oss.WindowsMobileOS
          }),
          (Wg.findMatch = function (Wq, WE) {
            for (var WP in Wq)
              if (Wo.call(Wq, WP) && Wq[WP].test(WE)) {
                return WP;
              }
            return null;
          }),
          (Wg.findMatches = function (Wq, WE) {
            var WP,
              Wk = [];
            for (WP in Wq) Wo.call(Wq, WP) && Wq[WP].test(WE) && Wk.push(WP);
            return Wk;
          }),
          (Wg.getVersionStr = function (Wq, WE) {
            var WP,
              Wk,
              WM,
              WG,
              Ww = Wg.mobileDetectRules.props;
            if (Wo.call(Ww, Wq)) {
              for (WM = (WP = Ww[Wq]).length, Wk = 0; Wk < WM; ++Wk) {
                if (null !== (WG = WP[Wk].exec(WE))) {
                  return WG[1];
                }
              }
            }
            return null;
          }),
          (Wg.getVersion = function (Wq, WE) {
            Wq = Wg.getVersionStr(Wq, WE);
            return Wq ? Wg.prepareVersionNo(Wq) : NaN;
          }),
          (Wg.prepareVersionNo = function (Wq) {
            var WE = Wq.split(/[a-z._ \/\-]/i);
            return 1 === WE.length && (Wq = WE[0]), 1 < WE.length && ((Wq = WE[0] + "."), WE.shift(), (Wq += WE.join(""))), Number(Wq);
          }),
          (Wg.isMobileFallback = function (Wq) {
            return Wg.detectMobileBrowsers.fullPattern.test(Wq) || Wg.detectMobileBrowsers.shortPattern.test(Wq.substr(0, 4));
          }),
          (Wg.isTabletFallback = function (Wq) {
            return Wg.detectMobileBrowsers.tabletPattern.test(Wq);
          }),
          (Wg.prepareDetectionCache = function (Wq, WE, WP) {
            var Wk;
            if (Wq.mobile === W5) {
              return (Wk = Wg.findMatch(Wg.mobileDetectRules.tablets, WE))
                ? ((Wq.mobile = Wq.tablet = Wk), void (Wq.phone = null))
                : (Wk = Wg.findMatch(Wg.mobileDetectRules.phones, WE))
                ? ((Wq.mobile = Wq.phone = Wk), void (Wq.tablet = null))
                : void (Wg.isMobileFallback(WE)
                    ? (Wk = W9.isPhoneSized(WP)) === W5
                      ? ((Wq.mobile = Wg.FALLBACK_MOBILE), (Wq.tablet = Wq.phone = null))
                      : Wk
                      ? ((Wq.mobile = Wq.phone = Wg.FALLBACK_PHONE), (Wq.tablet = null))
                      : ((Wq.mobile = Wq.tablet = Wg.FALLBACK_TABLET), (Wq.phone = null))
                    : Wg.isTabletFallback(WE)
                    ? ((Wq.mobile = Wq.tablet = Wg.FALLBACK_TABLET), (Wq.phone = null))
                    : (Wq.mobile = Wq.tablet = Wq.phone = null));
            }
          }),
          (Wg.mobileGrade = function (Wq) {
            var WE = null !== Wq.mobile();
            return (Wq.os("iOS") && 4.3 <= Wq.version("iPad")) ||
              (Wq.os("iOS") && 3.1 <= Wq.version("iPhone")) ||
              (Wq.os("iOS") && 3.1 <= Wq.version("iPod")) ||
              (2.1 < Wq.version("Android") && Wq.is("Webkit")) ||
              7 <= Wq.version("Windows Phone OS") ||
              (Wq.is("BlackBerry") && 6 <= Wq.version("BlackBerry")) ||
              Wq.match("Playbook.*Tablet") ||
              (1.4 <= Wq.version("webOS") && Wq.match("Palm|Pre|Pixi")) ||
              Wq.match("hp.*TouchPad") ||
              (Wq.is("Firefox") && 12 <= Wq.version("Firefox")) ||
              (Wq.is("Chrome") && Wq.is("AndroidOS") && 4 <= Wq.version("Android")) ||
              (Wq.is("Skyfire") && 4.1 <= Wq.version("Skyfire") && Wq.is("AndroidOS") && 2.3 <= Wq.version("Android")) ||
              (Wq.is("Opera") && 11 < Wq.version("Opera Mobi") && Wq.is("AndroidOS")) ||
              Wq.is("MeeGoOS") ||
              Wq.is("Tizen") ||
              (Wq.is("Dolfin") && 2 <= Wq.version("Bada")) ||
              ((Wq.is("UC Browser") || Wq.is("Dolfin")) && 2.3 <= Wq.version("Android")) ||
              Wq.match("Kindle Fire") ||
              (Wq.is("Kindle") && 3 <= Wq.version("Kindle")) ||
              (Wq.is("AndroidOS") && Wq.is("NookTablet")) ||
              (11 <= Wq.version("Chrome") && !WE) ||
              (5 <= Wq.version("Safari") && !WE) ||
              (4 <= Wq.version("Firefox") && !WE) ||
              (7 <= Wq.version("MSIE") && !WE) ||
              (10 <= Wq.version("Opera") && !WE)
              ? "A"
              : (Wq.os("iOS") && Wq.version("iPad") < 4.3) ||
                (Wq.os("iOS") && Wq.version("iPhone") < 3.1) ||
                (Wq.os("iOS") && Wq.version("iPod") < 3.1) ||
                (Wq.is("Blackberry") && 5 <= Wq.version("BlackBerry") && Wq.version("BlackBerry") < 6) ||
                (5 <= Wq.version("Opera Mini") && Wq.version("Opera Mini") <= 6.5 && (2.3 <= Wq.version("Android") || Wq.is("iOS"))) ||
                Wq.match("NokiaN8|NokiaC7|N97.*Series60|Symbian/3") ||
                (11 <= Wq.version("Opera Mobi") && Wq.is("SymbianOS"))
              ? "B"
              : (Wq.version("BlackBerry") < 5 || Wq.match("MSIEMobile|Windows CE.*Mobile") || Wq.version("Windows Mobile"), "C");
          }),
          (Wg.detectOS = function (Wq) {
            return Wg.findMatch(Wg.mobileDetectRules.oss0, Wq) || Wg.findMatch(Wg.mobileDetectRules.oss, Wq);
          }),
          (Wg.getDeviceSmallerSide = function () {
            return window.screen.width < window.screen.height ? window.screen.width : window.screen.height;
          }),
          (W9.prototype = {
            constructor: W9,
            mobile: function () {
              return Wg.prepareDetectionCache(this["_cache"], this.ua, this.maxPhoneWidth), this["_cache"].mobile;
            },
            phone: function () {
              return Wg.prepareDetectionCache(this["_cache"], this.ua, this.maxPhoneWidth), this["_cache"].phone;
            },
            tablet: function () {
              return Wg.prepareDetectionCache(this["_cache"], this.ua, this.maxPhoneWidth), this["_cache"].tablet;
            },
            userAgent: function () {
              return (
                this["_cache"].userAgent === W5 && (this["_cache"].userAgent = Wg.findMatch(Wg.mobileDetectRules.uas, this.ua)),
                this["_cache"].userAgent
              );
            },
            userAgents: function () {
              return (
                this["_cache"].userAgents === W5 && (this["_cache"].userAgents = Wg.findMatches(Wg.mobileDetectRules.uas, this.ua)),
                this["_cache"].userAgents
              );
            },
            os: function () {
              return this["_cache"].os === W5 && (this["_cache"].os = Wg.detectOS(this.ua)), this["_cache"].os;
            },
            version: function (Wq) {
              return Wg.getVersion(Wq, this.ua);
            },
            versionStr: function (Wq) {
              return Wg.getVersionStr(Wq, this.ua);
            },
            is: function (Wq) {
              return (
                W7(this.userAgents(), Wq) ||
                W6(Wq, this.os()) ||
                W6(Wq, this.phone()) ||
                W6(Wq, this.tablet()) ||
                W7(Wg.findMatches(Wg.mobileDetectRules.utils, this.ua), Wq)
              );
            },
            match: function (Wq) {
              return (Wq = Wq instanceof RegExp ? Wq : new RegExp(Wq, "i")).test(this.ua);
            },
            isPhoneSized: function (Wq) {
              return W9.isPhoneSized(Wq || this.maxPhoneWidth);
            },
            mobileGrade: function () {
              return this["_cache"].grade === W5 && (this["_cache"].grade = Wg.mobileGrade(this)), this["_cache"].grade;
            }
          }),
          "undefined" != typeof window && window.screen
            ? (W9.isPhoneSized = function (Wq) {
                return Wq < 0 ? W5 : Wg.getDeviceSmallerSide() <= Wq;
              })
            : (W9.isPhoneSized = function () {}),
          (W9["_impl"] = Wg),
          (W9.version = "1.4.4 2019-09-21"),
          W9
        );
      });
    })(),
    !(function (W5, W6) {
      "object" == typeof exports
        ? (module.exports = exports = W6())
        : "function" == typeof define && define.amd
        ? define([], W6)
        : (W5.CryptoJS = W6());
    })(this, function () {
      var W5,
        W6,
        W7,
        W8,
        W9,
        WW,
        Wf,
        WD,
        Wu,
        Wl,
        Wg,
        Wo,
        WT,
        WC,
        Wq,
        WE,
        WP,
        Wk,
        WM,
        WG,
        Ww,
        WS,
        WF,
        WH,
        WV,
        Wr,
        Wb,
        WX,
        Wt,
        WA,
        Wn,
        Ws,
        WY,
        Wh,
        WK,
        Wm,
        WN,
        Wx,
        WI,
        Wc,
        Wy,
        Wi,
        WU,
        WL,
        Wd = (function (Dq) {
          var DE;
          if (
            ("undefined" != typeof window && window.crypto && (DE = window.crypto),
            "undefined" != typeof self && self.crypto && (DE = self.crypto),
            !(DE =
              !(DE =
                !(DE = "undefined" != typeof globalThis && globalThis.crypto ? globalThis.crypto : DE) &&
                "undefined" != typeof window &&
                window.msCrypto
                  ? window.msCrypto
                  : DE) &&
              "undefined" != typeof global &&
              global.crypto
                ? global.crypto
                : DE) && "function" == typeof require)
          ) {
            try {
              DE = require("crypto");
            } catch (Dt) {}
          }
          var DP =
            Object.create ||
            function (DA) {
              return (Dk.prototype = DA), (DA = new Dk()), (Dk.prototype = null), DA;
            };

          function Dk() {}

          var DM = {
              high: Db + DU + (DX >>> 0 < DL >>> 0 ? 1 : 0),
              DG: (16711935 & ((Dw << 8) | (Dw >>> 24))) | (4278255360 & ((Dw << 24) | (Dw >>> 8))),
              Dw: 1549556828,
              DP: Dk[(DP + 4) & 7]
            },
            DG = (DM.lib = {}),
            Dw = (DG.Base = {
              extend: function (DA) {
                var Dn = DP(this);
                return (
                  DA && Dn.mixIn(DA),
                  (Dn.hasOwnProperty("init") && this.init !== Dn.init) ||
                    (Dn.init = function () {
                      Dn["$super"].init.apply(this, arguments);
                    }),
                  ((Dn.init.prototype = Dn)["$super"] = this),
                  Dn
                );
              },
              create: function () {
                var DA = this.extend();
                return DA.init.apply(DA, arguments), DA;
              },
              init: function () {},
              mixIn: function (DA) {
                for (var Dn in DA) DA.hasOwnProperty(Dn) && (this[Dn] = DA[Dn]);
                DA.hasOwnProperty("toString") && (this.toString = DA.toString);
              },
              clone: function () {
                return this.init.prototype.extend(this);
              }
            }),
            DS = (DG.WordArray = Dw.extend({
              init: function (DA, Dn) {
                DA = this.words = DA || [];
                this.sigBytes = null != Dn ? Dn : 4 * DA.length;
              },
              toString: function (DA) {
                return (DA || DH).stringify(this);
              },
              concat: function (DA) {
                var Dn = this.words,
                  Ds = DA.words,
                  DY = this.sigBytes,
                  Dh = DA.sigBytes;
                if ((this.clamp(), DY % 4)) {
                  for (var DK = 0; DK < Dh; DK++) {
                    var Dm = (Ds[DK >>> 2] >>> (24 - (DK % 4) * 8)) & 255;
                    Dn[(DY + DK) >>> 2] |= Dm << (24 - ((DY + DK) % 4) * 8);
                  }
                } else {
                  for (var DN = 0; DN < Dh; DN += 4) {
                    Dn[(DY + DN) >>> 2] = Ds[DN >>> 2];
                  }
                }
                return (this.sigBytes += Dh), this;
              },
              clamp: function () {
                var DA = this.words,
                  Dn = this.sigBytes;
                DA[Dn >>> 2] &= 4294967295 << (32 - (Dn % 4) * 8);
                DA.length = Dq.ceil(Dn / 4);
              },
              clone: function () {
                var DA = Dw.clone.call(this);
                return (DA.words = this.words.slice(0)), DA;
              },
              random: function (DA) {
                for (var Dn = [], Ds = 0; Ds < DA; Ds += 4) {
                  Dn.push(
                    (function () {
                      if (DE) {
                        if ("function" == typeof DE.getRandomValues) {
                          try {
                            return DE.getRandomValues(new Uint32Array(1))[0];
                          } catch (DY) {}
                        }
                        if ("function" == typeof DE.randomBytes) {
                          try {
                            return DE.randomBytes(4).readInt32LE();
                          } catch (Dh) {}
                        }
                      }
                      throw new Error("Native crypto module could not be used to get secure random number.");
                    })()
                  );
                }
                return new DS.init(Dn, DA);
              }
            })),
            DF = (DM.enc = {}),
            DH = (DF.Hex = {
              stringify: function (DA) {
                for (var Dn = DA.words, Ds = DA.sigBytes, DY = [], Dh = 0; Dh < Ds; Dh++) {
                  var DK = (Dn[Dh >>> 2] >>> (24 - (Dh % 4) * 8)) & 255;
                  DY.push((DK >>> 4).toString(16));
                  DY.push((15 & DK).toString(16));
                }
                return DY.join("");
              },
              parse: function (DA) {
                for (var Dn = DA.length, Ds = [], DY = 0; DY < Dn; DY += 2) {
                  Ds[DY >>> 3] |= parseInt(DA.substr(DY, 2), 16) << (24 - (DY % 8) * 4);
                }
                return new DS.init(Ds, Dn / 2);
              }
            }),
            DV = (DF.Latin1 = {
              stringify: function (DA) {
                for (var Dn = DA.words, Ds = DA.sigBytes, DY = [], Dh = 0; Dh < Ds; Dh++) {
                  var DK = (Dn[Dh >>> 2] >>> (24 - (Dh % 4) * 8)) & 255;
                  DY.push(String.fromCharCode(DK));
                }
                return DY.join("");
              },
              parse: function (DA) {
                for (var Dn = DA.length, Ds = [], DY = 0; DY < Dn; DY++) {
                  Ds[DY >>> 2] |= (255 & DA.charCodeAt(DY)) << (24 - (DY % 4) * 8);
                }
                return new DS.init(Ds, Dn);
              }
            }),
            Dr = (DF.Utf8 = {
              stringify: function (DA) {
                try {
                  return decodeURIComponent(escape(DV.stringify(DA)));
                } catch (Dn) {
                  throw new Error("Malformed UTF-8 data");
                }
              },
              parse: function (DA) {
                return DV.parse(unescape(encodeURIComponent(DA)));
              }
            }),
            Db = (DG.BufferedBlockAlgorithm = Dw.extend({
              reset: function () {
                this["_data"] = new DS.init();
                this["_nDataBytes"] = 0;
              },
              _append: function (DA) {
                "string" == typeof DA && (DA = Dr.parse(DA));
                this["_data"].concat(DA);
                this["_nDataBytes"] += DA.sigBytes;
              },
              _process: function (DA) {
                var Dn,
                  Ds = this["_data"],
                  DY = Ds.words,
                  Dh = Ds.sigBytes,
                  DK = this.blockSize,
                  Dm = Dh / (4 * DK),
                  DN = (Dm = DA ? Dq.ceil(Dm) : Dq.max((0 | Dm) - this["_minBufferSize"], 0)) * DK,
                  DA = Dq.min(4 * DN, Dh);
                if (DN) {
                  for (var Dx = 0; Dx < DN; Dx += DK) {
                    this["_doProcessBlock"](DY, Dx);
                  }
                  Dn = DY.splice(0, DN);
                  Ds.sigBytes -= DA;
                }
                return new DS.init(Dn, DA);
              },
              clone: function () {
                var DA = Dw.clone.call(this);
                return (DA["_data"] = this["_data"].clone()), DA;
              },
              _minBufferSize: 0
            })),
            DX =
              ((DG.Hasher = Db.extend({
                cfg: Dw.extend(),
                init: function (DA) {
                  this.cfg = this.cfg.extend(DA);
                  this.reset();
                },
                reset: function () {
                  Db.reset.call(this);
                  this["_doReset"]();
                },
                update: function (DA) {
                  return this["_append"](DA), this["_process"](), this;
                },
                finalize: function (DA) {
                  return DA && this["_append"](DA), this["_doFinalize"]();
                },
                blockSize: 16,
                _createHelper: function (DA) {
                  return function (Dn, Ds) {
                    return new DA.init(Ds).finalize(Dn);
                  };
                },
                _createHmacHelper: function (DA) {
                  return function (Dn, Ds) {
                    return new DX.HMAC.init(DA, Ds).finalize(Dn);
                  };
                }
              })),
              (DM.algo = {}));
          return DM;
        })(Math),
        Wv =
          ((Wv = (WZ = Wd).lib),
          (W5 = Wv.Base),
          (W6 = Wv.WordArray),
          ((Wv = WZ.x64 = {}).Word = W5.extend({
            init: function (Dq, DE) {
              this.high = Dq;
              this.low = DE;
            }
          })),
          (Wv.WordArray = W5.extend({
            init: function (Dq, DE) {
              Dq = this.words = Dq || [];
              this.sigBytes = null != DE ? DE : 8 * Dq.length;
            },
            toX32: function () {
              for (var Dq = this.words, DE = Dq.length, DP = [], Dk = 0; Dk < DE; Dk++) {
                var DM = Dq[Dk];
                DP.push(DM.high);
                DP.push(DM.low);
              }
              return W6.create(DP, this.sigBytes);
            },
            clone: function () {
              for (var Dq = W5.clone.call(this), DE = (Dq.words = this.words.slice(0)), DP = DE.length, Dk = 0; Dk < DP; Dk++) {
                DE[Dk] = DE[Dk].clone();
              }
              return Dq;
            }
          })),
          "function" == typeof ArrayBuffer &&
            ((WZ = Wd.lib.WordArray),
            (W7 = WZ.init),
            ((WZ.init = function (Dq) {
              if (
                (Dq =
                  (Dq = Dq instanceof ArrayBuffer ? new Uint8Array(Dq) : Dq) instanceof Int8Array ||
                  ("undefined" != typeof Uint8ClampedArray && Dq instanceof Uint8ClampedArray) ||
                  Dq instanceof Int16Array ||
                  Dq instanceof Uint16Array ||
                  Dq instanceof Int32Array ||
                  Dq instanceof Uint32Array ||
                  Dq instanceof Float32Array ||
                  Dq instanceof Float64Array
                    ? new Uint8Array(Dq.buffer, Dq.byteOffset, Dq.byteLength)
                    : Dq) instanceof Uint8Array
              ) {
                for (var DE = Dq.byteLength, DP = [], Dk = 0; Dk < DE; Dk++) {
                  DP[Dk >>> 2] |= Dq[Dk] << (24 - (Dk % 4) * 8);
                }
                W7.call(this, DP, DE);
              } else {
                W7.apply(this, arguments);
              }
            }).prototype = WZ)),
          Wd),
        WO = Wv.lib.WordArray;

      function Wz(Dq) {
        return ((Dq << 8) & 4278255360) | ((Dq >>> 8) & 16711935);
      }
      (Wv = Wv.enc).Utf16 = Wv.Utf16BE = {
        stringify: function (Dq) {
          for (var DE = Dq.words, DP = Dq.sigBytes, Dk = [], DM = 0; DM < DP; DM += 2) {
            var DG = (DE[DM >>> 2] >>> (16 - (DM % 4) * 8)) & 65535;
            Dk.push(String.fromCharCode(DG));
          }
          return Dk.join("");
        },
        parse: function (Dq) {
          for (var DE = Dq.length, DP = [], Dk = 0; Dk < DE; Dk++) {
            DP[Dk >>> 1] |= Dq.charCodeAt(Dk) << (16 - (Dk % 2) * 16);
          }
          return WO.create(DP, 2 * DE);
        }
      };
      Wv.Utf16LE = {
        stringify: function (Dq) {
          for (var DE = Dq.words, DP = Dq.sigBytes, Dk = [], DM = 0; DM < DP; DM += 2) {
            var DG = Wz((DE[DM >>> 2] >>> (16 - (DM % 4) * 8)) & 65535);
            Dk.push(String.fromCharCode(DG));
          }
          return Dk.join("");
        },
        parse: function (Dq) {
          for (var DE = Dq.length, DP = [], Dk = 0; Dk < DE; Dk++) {
            DP[Dk >>> 1] |= Wz(Dq.charCodeAt(Dk) << (16 - (Dk % 2) * 16));
          }
          return WO.create(DP, 2 * DE);
        }
      };
      W8 = (WZ = Wd).lib.WordArray;
      WZ.enc.Base64 = {
        stringify: function (Dq) {
          for (var DE = Dq.words, DP = Dq.sigBytes, Dk = this["_map"], DM = (Dq.clamp(), []), DG = 0; DG < DP; DG += 3) {
            for (
              var Dw =
                  (((DE[DG >>> 2] >>> (24 - (DG % 4) * 8)) & 255) << 16) |
                  (((DE[(DG + 1) >>> 2] >>> (24 - ((DG + 1) % 4) * 8)) & 255) << 8) |
                  ((DE[(DG + 2) >>> 2] >>> (24 - ((DG + 2) % 4) * 8)) & 255),
                DS = 0;
              DS < 4 && DG + 0.75 * DS < DP;
              DS++
            ) {
              DM.push(Dk.charAt((Dw >>> (6 * (3 - DS))) & 63));
            }
          }
          var DF = Dk.charAt(64);
          if (DF) {
            for (; DM.length % 4; ) {
              DM.push(DF);
            }
          }
          return DM.join("");
        },
        parse: function (Dq) {
          var DE = Dq.length,
            DP = this["_map"];
          if (!(Dk = this["_reverseMap"])) {
            for (var Dk = (this["_reverseMap"] = []), DM = 0; DM < DP.length; DM++) {
              Dk[DP.charCodeAt(DM)] = DM;
            }
          }
          for (
            var DG, Dw, DS = DP.charAt(64), DF = (DS && -1 !== (DS = Dq.indexOf(DS)) && (DE = DS), Dq), DH = DE, DV = Dk, Dr = [], Db = 0, DX = 0;
            DX < DH;
            DX++
          ) {
            DX % 4 &&
              ((DG = DV[DF.charCodeAt(DX - 1)] << ((DX % 4) * 2)),
              (Dw = DV[DF.charCodeAt(DX)] >>> (6 - (DX % 4) * 2)),
              (Dr[Db >>> 2] |= (DG | Dw) << (24 - (Db % 4) * 8)),
              Db++);
          }
          return W8.create(Dr, Db);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
      };
      W9 = (Wv = Wd).lib.WordArray;
      Wv.enc.Base64url = {
        stringify: function (Dq, DE = true) {
          for (var DP = Dq.words, Dk = Dq.sigBytes, DM = DE ? this["_safe_map"] : this["_map"], DG = (Dq.clamp(), []), Dw = 0; Dw < Dk; Dw += 3) {
            for (
              var DS =
                  (((DP[Dw >>> 2] >>> (24 - (Dw % 4) * 8)) & 255) << 16) |
                  (((DP[(Dw + 1) >>> 2] >>> (24 - ((Dw + 1) % 4) * 8)) & 255) << 8) |
                  ((DP[(Dw + 2) >>> 2] >>> (24 - ((Dw + 2) % 4) * 8)) & 255),
                DF = 0;
              DF < 4 && Dw + 0.75 * DF < Dk;
              DF++
            ) {
              DG.push(DM.charAt((DS >>> (6 * (3 - DF))) & 63));
            }
          }
          var DH = DM.charAt(64);
          if (DH) {
            for (; DG.length % 4; ) {
              DG.push(DH);
            }
          }
          return DG.join("");
        },
        parse: function (Dq, DE = true) {
          var DP = Dq.length,
            Dk = DE ? this["_safe_map"] : this["_map"];
          if (!(DM = this["_reverseMap"])) {
            for (var DM = (this["_reverseMap"] = []), DG = 0; DG < Dk.length; DG++) {
              DM[Dk.charCodeAt(DG)] = DG;
            }
          }
          for (
            var Dw, DS, DE = Dk.charAt(64), DF = (DE && -1 !== (DE = Dq.indexOf(DE)) && (DP = DE), Dq), DH = DP, DV = DM, Dr = [], Db = 0, DX = 0;
            DX < DH;
            DX++
          ) {
            DX % 4 &&
              ((Dw = DV[DF.charCodeAt(DX - 1)] << ((DX % 4) * 2)),
              (DS = DV[DF.charCodeAt(DX)] >>> (6 - (DX % 4) * 2)),
              (Dr[Db >>> 2] |= (Dw | DS) << (24 - (Db % 4) * 8)),
              Db++);
          }
          return W9.create(Dr, Db);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
      };
      for (var WB = Math, WZ = Wd, Wj = (Wv = WZ.lib).WordArray, WJ = Wv.Hasher, Wv = WZ.algo, WR = [], Wp = 0; Wp < 64; Wp++) {
        WR[Wp] = (4294967296 * WB.abs(WB.sin(Wp + 1))) | 0;
      }

      function Wa(Dq, DE, DP, Dk, DM, DG, Dw) {
        return (Dq = Dq + ((DE & DP) | (~DE & Dk)) + DM + Dw), ((Dq << DG) | (Dq >>> (32 - DG))) + DE;
      }

      function WQ(Dq, DE, DP, Dk, DM, DG, Dw) {
        return (Dq = Dq + ((DE & Dk) | (DP & ~Dk)) + DM + Dw), ((Dq << DG) | (Dq >>> (32 - DG))) + DE;
      }

      function f0(Dq, DE, DP, Dk, DM, DG, Dw) {
        return (Dq = Dq + (DE ^ DP ^ Dk) + DM + Dw), ((Dq << DG) | (Dq >>> (32 - DG))) + DE;
      }

      function f1(Dq, DE, DP, Dk, DM, DG, Dw) {
        return (Dq = Dq + (DP ^ (DE | ~Dk)) + DM + Dw), ((Dq << DG) | (Dq >>> (32 - DG))) + DE;
      }

      Wv = Wv.MD5 = WJ.extend({
        _doReset: function () {
          this["_hash"] = new Wj.init([1732584193, 4023233417, 2562383102, 271733878]);
        },
        _doProcessBlock: function (Dq, DE) {
          for (var DP = 0; DP < 16; DP++) {
            var Dk = DE + DP,
              DM = Dq[Dk];
            Dq[Dk] = (16711935 & ((DM << 8) | (DM >>> 24))) | (4278255360 & ((DM << 24) | (DM >>> 8)));
          }
          var DG = this["_hash"].words,
            Dw = Dq[DE + 0],
            DS = Dq[DE + 1],
            DF = Dq[DE + 2],
            DH = Dq[DE + 3],
            DV = Dq[DE + 4],
            Dr = Dq[DE + 5],
            Db = Dq[DE + 6],
            DX = Dq[DE + 7],
            Dt = Dq[DE + 8],
            DA = Dq[DE + 9],
            Dn = Dq[DE + 10],
            Ds = Dq[DE + 11],
            DY = Dq[DE + 12],
            Dh = Dq[DE + 13],
            DK = Dq[DE + 14],
            Dm = Dq[DE + 15],
            DN = Wa(DG[0], (Dc = DG[1]), (DI = DG[2]), (Dx = DG[3]), Dw, 7, WR[0]),
            Dx = Wa(Dx, DN, Dc, DI, DS, 12, WR[1]),
            DI = Wa(DI, Dx, DN, Dc, DF, 17, WR[2]),
            Dc = Wa(Dc, DI, Dx, DN, DH, 22, WR[3]);
          DN = Wa(DN, Dc, DI, Dx, DV, 7, WR[4]);
          Dx = Wa(Dx, DN, Dc, DI, Dr, 12, WR[5]);
          DI = Wa(DI, Dx, DN, Dc, Db, 17, WR[6]);
          Dc = Wa(Dc, DI, Dx, DN, DX, 22, WR[7]);
          DN = Wa(DN, Dc, DI, Dx, Dt, 7, WR[8]);
          Dx = Wa(Dx, DN, Dc, DI, DA, 12, WR[9]);
          DI = Wa(DI, Dx, DN, Dc, Dn, 17, WR[10]);
          Dc = Wa(Dc, DI, Dx, DN, Ds, 22, WR[11]);
          DN = Wa(DN, Dc, DI, Dx, DY, 7, WR[12]);
          Dx = Wa(Dx, DN, Dc, DI, Dh, 12, WR[13]);
          DI = Wa(DI, Dx, DN, Dc, DK, 17, WR[14]);
          DN = WQ(DN, (Dc = Wa(Dc, DI, Dx, DN, Dm, 22, WR[15])), DI, Dx, DS, 5, WR[16]);
          Dx = WQ(Dx, DN, Dc, DI, Db, 9, WR[17]);
          DI = WQ(DI, Dx, DN, Dc, Ds, 14, WR[18]);
          Dc = WQ(Dc, DI, Dx, DN, Dw, 20, WR[19]);
          DN = WQ(DN, Dc, DI, Dx, Dr, 5, WR[20]);
          Dx = WQ(Dx, DN, Dc, DI, Dn, 9, WR[21]);
          DI = WQ(DI, Dx, DN, Dc, Dm, 14, WR[22]);
          Dc = WQ(Dc, DI, Dx, DN, DV, 20, WR[23]);
          DN = WQ(DN, Dc, DI, Dx, DA, 5, WR[24]);
          Dx = WQ(Dx, DN, Dc, DI, DK, 9, WR[25]);
          DI = WQ(DI, Dx, DN, Dc, DH, 14, WR[26]);
          Dc = WQ(Dc, DI, Dx, DN, Dt, 20, WR[27]);
          DN = WQ(DN, Dc, DI, Dx, Dh, 5, WR[28]);
          Dx = WQ(Dx, DN, Dc, DI, DF, 9, WR[29]);
          DI = WQ(DI, Dx, DN, Dc, DX, 14, WR[30]);
          DN = f0(DN, (Dc = WQ(Dc, DI, Dx, DN, DY, 20, WR[31])), DI, Dx, Dr, 4, WR[32]);
          Dx = f0(Dx, DN, Dc, DI, Dt, 11, WR[33]);
          DI = f0(DI, Dx, DN, Dc, Ds, 16, WR[34]);
          Dc = f0(Dc, DI, Dx, DN, DK, 23, WR[35]);
          DN = f0(DN, Dc, DI, Dx, DS, 4, WR[36]);
          Dx = f0(Dx, DN, Dc, DI, DV, 11, WR[37]);
          DI = f0(DI, Dx, DN, Dc, DX, 16, WR[38]);
          Dc = f0(Dc, DI, Dx, DN, Dn, 23, WR[39]);
          DN = f0(DN, Dc, DI, Dx, Dh, 4, WR[40]);
          Dx = f0(Dx, DN, Dc, DI, Dw, 11, WR[41]);
          DI = f0(DI, Dx, DN, Dc, DH, 16, WR[42]);
          Dc = f0(Dc, DI, Dx, DN, Db, 23, WR[43]);
          DN = f0(DN, Dc, DI, Dx, DA, 4, WR[44]);
          Dx = f0(Dx, DN, Dc, DI, DY, 11, WR[45]);
          DI = f0(DI, Dx, DN, Dc, Dm, 16, WR[46]);
          DN = f1(DN, (Dc = f0(Dc, DI, Dx, DN, DF, 23, WR[47])), DI, Dx, Dw, 6, WR[48]);
          Dx = f1(Dx, DN, Dc, DI, DX, 10, WR[49]);
          DI = f1(DI, Dx, DN, Dc, DK, 15, WR[50]);
          Dc = f1(Dc, DI, Dx, DN, Dr, 21, WR[51]);
          DN = f1(DN, Dc, DI, Dx, DY, 6, WR[52]);
          Dx = f1(Dx, DN, Dc, DI, DH, 10, WR[53]);
          DI = f1(DI, Dx, DN, Dc, Dn, 15, WR[54]);
          Dc = f1(Dc, DI, Dx, DN, DS, 21, WR[55]);
          DN = f1(DN, Dc, DI, Dx, Dt, 6, WR[56]);
          Dx = f1(Dx, DN, Dc, DI, Dm, 10, WR[57]);
          DI = f1(DI, Dx, DN, Dc, Db, 15, WR[58]);
          Dc = f1(Dc, DI, Dx, DN, Dh, 21, WR[59]);
          DN = f1(DN, Dc, DI, Dx, DV, 6, WR[60]);
          Dx = f1(Dx, DN, Dc, DI, Ds, 10, WR[61]);
          DI = f1(DI, Dx, DN, Dc, DF, 15, WR[62]);
          Dc = f1(Dc, DI, Dx, DN, DA, 21, WR[63]);
          DG[0] = (DG[0] + DN) | 0;
          DG[1] = (DG[1] + Dc) | 0;
          DG[2] = (DG[2] + DI) | 0;
          DG[3] = (DG[3] + Dx) | 0;
        },
        _doFinalize: function () {
          for (
            var Dq = this["_data"],
              DE = Dq.words,
              DP = 8 * this["_nDataBytes"],
              Dk = 8 * Dq.sigBytes,
              DM = ((DE[Dk >>> 5] |= 128 << (24 - (Dk % 32))), WB.floor(DP / 4294967296)),
              DM =
                ((DE[15 + (((64 + Dk) >>> 9) << 4)] = (16711935 & ((DM << 8) | (DM >>> 24))) | (4278255360 & ((DM << 24) | (DM >>> 8)))),
                (DE[14 + (((64 + Dk) >>> 9) << 4)] = (16711935 & ((DP << 8) | (DP >>> 24))) | (4278255360 & ((DP << 24) | (DP >>> 8)))),
                (Dq.sigBytes = 4 * (DE.length + 1)),
                this["_process"](),
                this["_hash"]),
              DG = DM.words,
              Dw = 0;
            Dw < 4;
            Dw++
          ) {
            var DS = DG[Dw];
            DG[Dw] = (16711935 & ((DS << 8) | (DS >>> 24))) | (4278255360 & ((DS << 24) | (DS >>> 8)));
          }
          return DM;
        },
        clone: function () {
          var Dq = WJ.clone.call(this);
          return (Dq["_hash"] = this["_hash"].clone()), Dq;
        }
      });
      WZ.MD5 = WJ["_createHelper"](Wv);
      WZ.HmacMD5 = WJ["_createHmacHelper"](Wv);
      Wv = (WZ = Wd).lib;
      WW = Wv.WordArray;
      Wf = Wv.Hasher;
      Wv = WZ.algo;
      WD = [];
      Wv = Wv.SHA1 = Wf.extend({
        _doReset: function () {
          this["_hash"] = new WW.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        },
        _doProcessBlock: function (Dq, DE) {
          for (var DP = this["_hash"].words, Dk = DP[0], DM = DP[1], DG = DP[2], Dw = DP[3], DS = DP[4], DF = 0; DF < 80; DF++) {
            WD[DF] = DF < 16 ? 0 | Dq[DE + DF] : ((DH = WD[DF - 3] ^ WD[DF - 8] ^ WD[DF - 14] ^ WD[DF - 16]) << 1) | (DH >>> 31);
            var DH = ((Dk << 5) | (Dk >>> 27)) + DS + WD[DF];
            DH +=
              DF < 20
                ? 1518500249 + ((DM & DG) | (~DM & Dw))
                : DF < 40
                ? 1859775393 + (DM ^ DG ^ Dw)
                : DF < 60
                ? ((DM & DG) | (DM & Dw) | (DG & Dw)) - 1894007588
                : (DM ^ DG ^ Dw) - 899497514;
            DS = Dw;
            Dw = DG;
            DG = (DM << 30) | (DM >>> 2);
            DM = Dk;
            Dk = DH;
          }
          DP[0] = (DP[0] + Dk) | 0;
          DP[1] = (DP[1] + DM) | 0;
          DP[2] = (DP[2] + DG) | 0;
          DP[3] = (DP[3] + Dw) | 0;
          DP[4] = (DP[4] + DS) | 0;
        },
        _doFinalize: function () {
          var Dq = this["_data"],
            DE = Dq.words,
            DP = 8 * this["_nDataBytes"],
            Dk = 8 * Dq.sigBytes;
          return (
            (DE[Dk >>> 5] |= 128 << (24 - (Dk % 32))),
            (DE[14 + (((64 + Dk) >>> 9) << 4)] = Math.floor(DP / 4294967296)),
            (DE[15 + (((64 + Dk) >>> 9) << 4)] = DP),
            (Dq.sigBytes = 4 * DE.length),
            this["_process"](),
            this["_hash"]
          );
        },
        clone: function () {
          var Dq = Wf.clone.call(this);
          return (Dq["_hash"] = this["_hash"].clone()), Dq;
        }
      });
      WZ.SHA1 = Wf["_createHelper"](Wv);
      WZ.HmacSHA1 = Wf["_createHmacHelper"](Wv);
      var f2 = Math,
        WZ = Wd,
        f3 = (Wv = WZ.lib).WordArray,
        f4 = Wv.Hasher,
        Wv = WZ.algo,
        f5 = [],
        f6 = [];

      function f7(Dq) {
        return (4294967296 * (Dq - (0 | Dq))) | 0;
      }

      for (var f8 = 2, f9 = 0; f9 < 64; ) {
        !(function (Dq) {
          for (var DE = f2.sqrt(Dq), DP = 2; DP <= DE; DP++) {
            if (!(Dq % DP)) {
              return;
            }
          }
          return 1;
        })(f8) || (f9 < 8 && (f5[f9] = f7(f2.pow(f8, 0.5))), (f6[f9] = f7(f2.pow(f8, 0.3333333333333333))), f9++);
        f8++;
      }
      var fW = [],
        Wv = (Wv.SHA256 = f4.extend({
          _doReset: function () {
            this["_hash"] = new f3.init(f5.slice(0));
          },
          _doProcessBlock: function (Dq, DE) {
            for (
              var DP = this["_hash"].words, Dk = DP[0], DM = DP[1], DG = DP[2], Dw = DP[3], DS = DP[4], DF = DP[5], DH = DP[6], DV = DP[7], Dr = 0;
              Dr < 64;
              Dr++
            ) {
              fW[Dr] =
                Dr < 16
                  ? 0 | Dq[DE + Dr]
                  : ((((Db = fW[Dr - 15]) << 25) | (Db >>> 7)) ^ ((Db << 14) | (Db >>> 18)) ^ (Db >>> 3)) +
                    fW[Dr - 7] +
                    ((((Db = fW[Dr - 2]) << 15) | (Db >>> 17)) ^ ((Db << 13) | (Db >>> 19)) ^ (Db >>> 10)) +
                    fW[Dr - 16];
              var Db = (Dk & DM) ^ (Dk & DG) ^ (DM & DG),
                DX =
                  DV +
                  (((DS << 26) | (DS >>> 6)) ^ ((DS << 21) | (DS >>> 11)) ^ ((DS << 7) | (DS >>> 25))) +
                  ((DS & DF) ^ (~DS & DH)) +
                  f6[Dr] +
                  fW[Dr],
                DV = DH,
                DH = DF,
                DF = DS,
                DS = (Dw + DX) | 0,
                Dw = DG,
                DG = DM,
                DM = Dk,
                Dk = (DX + ((((Dk << 30) | (Dk >>> 2)) ^ ((Dk << 19) | (Dk >>> 13)) ^ ((Dk << 10) | (Dk >>> 22))) + Db)) | 0;
            }
            DP[0] = (DP[0] + Dk) | 0;
            DP[1] = (DP[1] + DM) | 0;
            DP[2] = (DP[2] + DG) | 0;
            DP[3] = (DP[3] + Dw) | 0;
            DP[4] = (DP[4] + DS) | 0;
            DP[5] = (DP[5] + DF) | 0;
            DP[6] = (DP[6] + DH) | 0;
            DP[7] = (DP[7] + DV) | 0;
          },
          _doFinalize: function () {
            var Dq = this["_data"],
              DE = Dq.words,
              DP = 8 * this["_nDataBytes"],
              Dk = 8 * Dq.sigBytes;
            return (
              (DE[Dk >>> 5] |= 128 << (24 - (Dk % 32))),
              (DE[14 + (((64 + Dk) >>> 9) << 4)] = f2.floor(DP / 4294967296)),
              (DE[15 + (((64 + Dk) >>> 9) << 4)] = DP),
              (Dq.sigBytes = 4 * DE.length),
              this["_process"](),
              this["_hash"]
            );
          },
          clone: function () {
            var Dq = f4.clone.call(this);
            return (Dq["_hash"] = this["_hash"].clone()), Dq;
          }
        })),
        WZ =
          ((WZ.SHA256 = f4["_createHelper"](Wv)),
          (WZ.HmacSHA256 = f4["_createHmacHelper"](Wv)),
          (Wu = (WZ = Wd).lib.WordArray),
          (Wv = WZ.algo),
          (Wl = Wv.SHA256),
          (Wv = Wv.SHA224 =
            Wl.extend({
              _doReset: function () {
                this["_hash"] = new Wu.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
              },
              _doFinalize: function () {
                var Dq = Wl["_doFinalize"].call(this);
                return (Dq.sigBytes -= 4), Dq;
              }
            })),
          (WZ.SHA224 = Wl["_createHelper"](Wv)),
          (WZ.HmacSHA224 = Wl["_createHmacHelper"](Wv)),
          Wd),
        ff = WZ.lib.Hasher,
        fD = (Wv = WZ.x64).Word,
        fu = Wv.WordArray,
        Wv = WZ.algo;

      function fl() {
        return fD.create.apply(fD, arguments);
      }

      for (
        var fg = [
            fl(1116352408, 3609767458),
            fl(1899447441, 602891725),
            fl(3049323471, 3964484399),
            fl(3921009573, 2173295548),
            fl(961987163, 4081628472),
            fl(1508970993, 3053834265),
            fl(2453635748, 2937671579),
            fl(2870763221, 3664609560),
            fl(3624381080, 2734883394),
            fl(310598401, 1164996542),
            fl(607225278, 1323610764),
            fl(1426881987, 3590304994),
            fl(1925078388, 4068182383),
            fl(2162078206, 991336113),
            fl(2614888103, 633803317),
            fl(3248222580, 3479774868),
            fl(3835390401, 2666613458),
            fl(4022224774, 944711139),
            fl(264347078, 2341262773),
            fl(604807628, 2007800933),
            fl(770255983, 1495990901),
            fl(1249150122, 1856431235),
            fl(1555081692, 3175218132),
            fl(1996064986, 2198950837),
            fl(2554220882, 3999719339),
            fl(2821834349, 766784016),
            fl(2952996808, 2566594879),
            fl(3210313671, 3203337956),
            fl(3336571891, 1034457026),
            fl(3584528711, 2466948901),
            fl(113926993, 3758326383),
            fl(338241895, 168717936),
            fl(666307205, 1188179964),
            fl(773529912, 1546045734),
            fl(1294757372, 1522805485),
            fl(1396182291, 2643833823),
            fl(1695183700, 2343527390),
            fl(1986661051, 1014477480),
            fl(2177026350, 1206759142),
            fl(2456956037, 344077627),
            fl(2730485921, 1290863460),
            fl(2820302411, 3158454273),
            fl(3259730800, 3505952657),
            fl(3345764771, 106217008),
            fl(3516065817, 3606008344),
            fl(3600352804, 1432725776),
            fl(4094571909, 1467031594),
            fl(275423344, 851169720),
            fl(430227734, 3100823752),
            fl(506948616, 1363258195),
            fl(659060556, 3750685593),
            fl(883997877, 3785050280),
            fl(958139571, 3318307427),
            fl(1322822218, 3812723403),
            fl(1537002063, 2003034995),
            fl(1747873779, 3602036899),
            fl(1955562222, 1575990012),
            fl(2024104815, 1125592928),
            fl(2227730452, 2716904306),
            fl(2361852424, 442776044),
            fl(2428436474, 593698344),
            fl(2756734187, 3733110249),
            fl(3204031479, 2999351573),
            fl(3329325298, 3815920427),
            fl(3391569614, 3928383900),
            fl(3515267271, 566280711),
            fl(3940187606, 3454069534),
            fl(4118630271, 4000239992),
            fl(116418474, 1914138554),
            fl(174292421, 2731055270),
            fl(289380356, 3203993006),
            fl(460393269, 320620315),
            fl(685471733, 587496836),
            fl(852142971, 1086792851),
            fl(1017036298, 365543100),
            fl(1126000580, 2618297676),
            fl(1288033470, 3409855158),
            fl(1501505948, 4234509866),
            fl(1607167915, 987167468),
            fl(1816402316, 1246189591)
          ],
          fo = [],
          fT = 0;
        fT < 80;
        fT++
      ) {
        fo[fT] = fl();
      }
      Wv = Wv.SHA512 = ff.extend({
        _doReset: function () {
          this["_hash"] = new fu.init([
            new fD.init(1779033703, 4089235720),
            new fD.init(3144134277, 2227873595),
            new fD.init(1013904242, 4271175723),
            new fD.init(2773480762, 1595750129),
            new fD.init(1359893119, 2917565137),
            new fD.init(2600822924, 725511199),
            new fD.init(528734635, 4215389547),
            new fD.init(1541459225, 327033209)
          ]);
        },
        _doProcessBlock: function (Dq, DE) {
          for (
            var DP = this["_hash"].words,
              Dk = DP[0],
              DM = DP[1],
              DG = DP[2],
              Dw = DP[3],
              DS = DP[4],
              DF = DP[5],
              DH = DP[6],
              DP = DP[7],
              DV = Dk.high,
              Dr = Dk.low,
              Db = DM.high,
              DX = DM.low,
              Dt = DG.high,
              DA = DG.low,
              Dn = Dw.high,
              Ds = Dw.low,
              DY = DS.high,
              Dh = DS.low,
              DK = DF.high,
              Dm = DF.low,
              DN = DH.high,
              Dx = DH.low,
              DI = DP.high,
              Dc = DP.low,
              Dy = DV,
              Di = Dr,
              DU = Db,
              DL = DX,
              Dd = Dt,
              Dv = DA,
              DO = Dn,
              Dz = Ds,
              DB = DY,
              DZ = Dh,
              Dj = DK,
              DJ = Dm,
              DR = DN,
              Dp = Dx,
              Da = DI,
              DQ = Dc,
              e0 = 0;
            e0 < 80;
            e0++
          ) {
            var e1,
              e2,
              e3 = fo[e0],
              e4 =
                (e0 < 16
                  ? ((e2 = e3.high = 0 | Dq[DE + 2 * e0]), (e1 = e3.low = 0 | Dq[DE + 2 * e0 + 1]))
                  : ((ef = (e8 = fo[e0 - 15]).high),
                    (e8 = e8.low),
                    (e7 = (e6 = fo[e0 - 2]).high),
                    (e6 = e6.low),
                    (e5 = (e4 = fo[e0 - 7]).high),
                    (e4 = e4.low),
                    (eW = (e9 = fo[e0 - 16]).high),
                    (e2 =
                      (e2 =
                        (((ef >>> 1) | (e8 << 31)) ^ ((ef >>> 8) | (e8 << 24)) ^ (ef >>> 7)) +
                        e5 +
                        ((e1 = (e5 = ((e8 >>> 1) | (ef << 31)) ^ ((e8 >>> 8) | (ef << 24)) ^ ((e8 >>> 7) | (ef << 25))) + e4) >>> 0 < e5 >>> 0
                          ? 1
                          : 0)) +
                      (((e7 >>> 19) | (e6 << 13)) ^ ((e7 << 3) | (e6 >>> 29)) ^ (e7 >>> 6)) +
                      ((e1 += e8 = ((e6 >>> 19) | (e7 << 13)) ^ ((e6 << 3) | (e7 >>> 29)) ^ ((e6 >>> 6) | (e7 << 26))) >>> 0 < e8 >>> 0 ? 1 : 0)),
                    (e1 += ef = e9.low),
                    (e3.high = e2 = e2 + eW + (e1 >>> 0 < ef >>> 0 ? 1 : 0)),
                    (e3.low = e1)),
                (DB & Dj) ^ (~DB & DR)),
              e5 = (DZ & DJ) ^ (~DZ & Dp),
              e6 = (Dy & DU) ^ (Dy & Dd) ^ (DU & Dd),
              e7 = ((Di >>> 28) | (Dy << 4)) ^ ((Di << 30) | (Dy >>> 2)) ^ ((Di << 25) | (Dy >>> 7)),
              e8 = fg[e0],
              e9 = e8.high,
              eW = e8.low,
              ef = DQ + (((DZ >>> 14) | (DB << 18)) ^ ((DZ >>> 18) | (DB << 14)) ^ ((DZ << 23) | (DB >>> 9))),
              e3 = Da + (((DB >>> 14) | (DZ << 18)) ^ ((DB >>> 18) | (DZ << 14)) ^ ((DB << 23) | (DZ >>> 9))) + (ef >>> 0 < DQ >>> 0 ? 1 : 0),
              eD = e7 + ((Di & DL) ^ (Di & Dv) ^ (DL & Dv)),
              Da = DR,
              DQ = Dp,
              DR = Dj,
              Dp = DJ,
              Dj = DB,
              DJ = DZ,
              DB =
                (DO +
                  (e3 =
                    e3 +
                    e4 +
                    ((ef = ef + e5) >>> 0 < e5 >>> 0 ? 1 : 0) +
                    e9 +
                    ((ef = ef + eW) >>> 0 < eW >>> 0 ? 1 : 0) +
                    e2 +
                    ((ef = ef + e1) >>> 0 < e1 >>> 0 ? 1 : 0)) +
                  ((DZ = (Dz + ef) | 0) >>> 0 < Dz >>> 0 ? 1 : 0)) |
                0,
              DO = Dd,
              Dz = Dv,
              Dd = DU,
              Dv = DL,
              DU = Dy,
              DL = Di,
              Dy =
                (e3 +
                  ((((Dy >>> 28) | (Di << 4)) ^ ((Dy << 30) | (Di >>> 2)) ^ ((Dy << 25) | (Di >>> 7))) + e6 + (eD >>> 0 < e7 >>> 0 ? 1 : 0)) +
                  ((Di = (ef + eD) | 0) >>> 0 < ef >>> 0 ? 1 : 0)) |
                0;
          }
          Dr = Dk.low = Dr + Di;
          Dk.high = DV + Dy + (Dr >>> 0 < Di >>> 0 ? 1 : 0);
          DX = DM.low = DX + DL;
          DA = DG.low = DA + Dv;
          DG.high = Dt + Dd + (DA >>> 0 < Dv >>> 0 ? 1 : 0);
          Ds = Dw.low = Ds + Dz;
          Dw.high = Dn + DO + (Ds >>> 0 < Dz >>> 0 ? 1 : 0);
          Dh = DS.low = Dh + DZ;
          DS.high = DY + DB + (Dh >>> 0 < DZ >>> 0 ? 1 : 0);
          Dm = DF.low = Dm + DJ;
          DF.high = DK + Dj + (Dm >>> 0 < DJ >>> 0 ? 1 : 0);
          Dx = DH.low = Dx + Dp;
          DH.high = DN + DR + (Dx >>> 0 < Dp >>> 0 ? 1 : 0);
          Dc = DP.low = Dc + DQ;
          DP.high = DI + Da + (Dc >>> 0 < DQ >>> 0 ? 1 : 0);
        },
        _doFinalize: function () {
          var Dq = this["_data"],
            DE = Dq.words,
            DP = 8 * this["_nDataBytes"],
            Dk = 8 * Dq.sigBytes;
          return (
            (DE[Dk >>> 5] |= 128 << (24 - (Dk % 32))),
            (DE[30 + (((128 + Dk) >>> 10) << 5)] = Math.floor(DP / 4294967296)),
            (DE[31 + (((128 + Dk) >>> 10) << 5)] = DP),
            (Dq.sigBytes = 4 * DE.length),
            this["_process"](),
            this["_hash"].toX32()
          );
        },
        clone: function () {
          var Dq = ff.clone.call(this);
          return (Dq["_hash"] = this["_hash"].clone()), Dq;
        },
        blockSize: 32
      });
      WZ.SHA512 = ff["_createHelper"](Wv);
      WZ.HmacSHA512 = ff["_createHmacHelper"](Wv);
      Wv = (WZ = Wd).x64;
      Wg = Wv.Word;
      Wo = Wv.WordArray;
      Wv = WZ.algo;
      WT = Wv.SHA512;
      Wv = Wv.SHA384 = WT.extend({
        _doReset: function () {
          this["_hash"] = new Wo.init([
            new Wg.init(3418070365, 3238371032),
            new Wg.init(1654270250, 914150663),
            new Wg.init(2438529370, 812702999),
            new Wg.init(355462360, 4144912697),
            new Wg.init(1731405415, 4290775857),
            new Wg.init(2394180231, 1750603025),
            new Wg.init(3675008525, 1694076839),
            new Wg.init(1203062813, 3204075428)
          ]);
        },
        _doFinalize: function () {
          var Dq = WT["_doFinalize"].call(this);
          return (Dq.sigBytes -= 16), Dq;
        }
      });
      WZ.SHA384 = WT["_createHelper"](Wv);
      WZ.HmacSHA384 = WT["_createHmacHelper"](Wv);
      for (
        var fC = Math,
          WZ = Wd,
          fq = (Wv = WZ.lib).WordArray,
          fE = Wv.Hasher,
          fP = WZ.x64.Word,
          Wv = WZ.algo,
          fk = [],
          fM = [],
          fG = [],
          fw = 1,
          fS = 0,
          fF = 0;
        fF < 24;
        fF++
      ) {
        fk[fw + 5 * fS] = (((fF + 1) * (fF + 2)) / 2) % 64;
        var fH = (2 * fw + 3 * fS) % 5;
        fw = fS % 5;
        fS = fH;
      }
      for (fw = 0; fw < 5; fw++) {
        for (fS = 0; fS < 5; fS++) {
          fM[fw + 5 * fS] = fS + ((2 * fw + 3 * fS) % 5) * 5;
        }
      }
      for (var fV = 1, fr = 0; fr < 24; fr++) {
        for (var fb, fX = 0, fA = 0, fn = 0; fn < 7; fn++) {
          1 & fV && ((fb = (1 << fn) - 1) < 32 ? (fA ^= 1 << fb) : (fX ^= 1 << (fb - 32)));
          128 & fV ? (fV = (fV << 1) ^ 113) : (fV <<= 1);
        }
        fG[fr] = fP.create(fX, fA);
      }
      for (var fs = [], fY = 0; fY < 25; fY++) {
        fs[fY] = fP.create();
      }

      function fh(Dq, DE, DP) {
        return (Dq & DE) | (~Dq & DP);
      }

      function fK(Dq, DE, DP) {
        return (Dq & DP) | (DE & ~DP);
      }

      function fm(Dq, DE) {
        return (Dq << DE) | (Dq >>> (32 - DE));
      }

      function fN(Dq) {
        return "string" == typeof Dq ? WK : Wh;
      }

      function fx(Dq, DE, DP) {
        var Dk,
          DM = this["_iv"];
        DM ? ((Dk = DM), (this["_iv"] = void 0)) : (Dk = this["_prevBlock"]);
        for (var DG = 0; DG < DP; DG++) {
          Dq[DE + DG] ^= Dk[DG];
        }
      }

      function fI(Dq, DE, DP, Dk) {
        var DM,
          DG = this["_iv"];
        DG ? ((DM = DG.slice(0)), (this["_iv"] = void 0)) : (DM = this["_prevBlock"]);
        Dk.encryptBlock(DM, 0);
        for (var Dw = 0; Dw < DP; Dw++) {
          Dq[DE + Dw] ^= DM[Dw];
        }
      }

      function fc(Dq) {
        var DE, DP, Dk;
        return (
          255 == ((Dq >> 24) & 255)
            ? ((DP = (Dq >> 8) & 255),
              (Dk = 255 & Dq),
              255 === (DE = (Dq >> 16) & 255) ? ((DE = 0), 255 === DP ? ((DP = 0), 255 === Dk ? (Dk = 0) : ++Dk) : ++DP) : ++DE,
              (Dq = 0),
              (Dq = (Dq += DE << 16) + (DP << 8) + Dk))
            : (Dq += 1 << 24),
          Dq
        );
      }

      Wv = Wv.SHA3 = fE.extend({
        cfg: fE.cfg.extend({ outputLength: 512 }),
        _doReset: function () {
          for (var Dq = (this["_state"] = []), DE = 0; DE < 25; DE++) {
            Dq[DE] = new fP.init();
          }
          this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
        },
        _doProcessBlock: function (Dq, DE) {
          for (var DP = this["_state"], Dk = this.blockSize / 2, DM = 0; DM < Dk; DM++) {
            var DG = Dq[DE + 2 * DM],
              Dw = Dq[DE + 2 * DM + 1],
              DG = (16711935 & ((DG << 8) | (DG >>> 24))) | (4278255360 & ((DG << 24) | (DG >>> 8)));
            (DN = DP[DM]).high ^= (16711935 & ((Dw << 8) | (Dw >>> 24))) | (4278255360 & ((Dw << 24) | (Dw >>> 8)));
            DN.low ^= DG;
          }
          for (var DS = 0; DS < 24; DS++) {
            for (var DF = 0; DF < 5; DF++) {
              for (var DH = 0, DV = 0, Dr = 0; Dr < 5; Dr++) {
                DH ^= (DN = DP[DF + 5 * Dr]).high;
                DV ^= DN.low;
              }
              var Db = fs[DF];
              Db.high = DH;
              Db.low = DV;
            }
            for (DF = 0; DF < 5; DF++) {
              for (
                var DX = fs[(DF + 4) % 5],
                  Dt = fs[(DF + 1) % 5],
                  DA = Dt.high,
                  Dt = Dt.low,
                  DH = DX.high ^ ((DA << 1) | (Dt >>> 31)),
                  DV = DX.low ^ ((Dt << 1) | (DA >>> 31)),
                  Dr = 0;
                Dr < 5;
                Dr++
              ) {
                (DN = DP[DF + 5 * Dr]).high ^= DH;
                DN.low ^= DV;
              }
            }
            for (var Dn = 1; Dn < 25; Dn++) {
              var Ds = (DN = DP[Dn]).high,
                DY = DN.low,
                Dh = fk[Dn],
                Ds =
                  ((DV =
                    Dh < 32
                      ? ((DH = (Ds << Dh) | (DY >>> (32 - Dh))), (DY << Dh) | (Ds >>> (32 - Dh)))
                      : ((DH = (DY << (Dh - 32)) | (Ds >>> (64 - Dh))), (Ds << (Dh - 32)) | (DY >>> (64 - Dh)))),
                  fs[fM[Dn]]);
              Ds.high = DH;
              Ds.low = DV;
            }
            var DK = fs[0],
              Dm = DP[0];
            DN.high ^= DK.high;
            DN.low ^= DK.low;
            DK.low = Dm.low;
            for (DF = 0; DF < 5; DF++) {
              for (Dr = 0; Dr < 5; Dr++) {
                var DN = DP[(Dn = DF + 5 * Dr)],
                  Dx = fs[Dn],
                  DI = fs[((DF + 1) % 5) + 5 * Dr],
                  Dc = fs[((DF + 2) % 5) + 5 * Dr];
                DN.high = Dx.high ^ (~DI.high & Dc.high);
                DN.low = Dx.low ^ (~DI.low & Dc.low);
              }
            }
            DN = DP[0];
            DK = fG[DS];
            (DN.high ^= DK.high), (DN.low ^= DK.low);
          }
        },
        _doFinalize: function () {
          for (
            var Dq = this["_data"],
              DE = Dq.words,
              DP = (this["_nDataBytes"], 8 * Dq.sigBytes),
              Dk = 32 * this.blockSize,
              DM =
                ((DE[DP >>> 5] |= 1 << (24 - (DP % 32))),
                (DE[((fC.ceil((1 + DP) / Dk) * Dk) >>> 5) - 1] |= 128),
                (Dq.sigBytes = 4 * DE.length),
                this["_process"](),
                this["_state"]),
              DP = this.cfg.outputLength / 8,
              DG = DP / 8,
              Dw = [],
              DS = 0;
            DS < DG;
            DS++
          ) {
            var DF = DM[DS],
              DH = DF.high,
              DF = DF.low,
              DH = (16711935 & ((DH << 8) | (DH >>> 24))) | (4278255360 & ((DH << 24) | (DH >>> 8)));
            Dw.push((16711935 & ((DF << 8) | (DF >>> 24))) | (4278255360 & ((DF << 24) | (DF >>> 8))));
            Dw.push(DH);
          }
          return new fq.init(Dw, DP);
        },
        clone: function () {
          for (var Dq = fE.clone.call(this), DE = (Dq["_state"] = this["_state"].slice(0)), DP = 0; DP < 25; DP++) {
            DE[DP] = DE[DP].clone();
          }
          return Dq;
        }
      });
      WZ.SHA3 = fE["_createHelper"](Wv);
      WZ.HmacSHA3 = fE["_createHmacHelper"](Wv);
      Math;
      Wv = (WZ = Wd).lib;
      WC = Wv.WordArray;
      Wq = Wv.Hasher;
      Wv = WZ.algo;
      WE = WC.create([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7,
        0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
      ]);
      WP = WC.create([
        5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8,
        12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
      ]);
      Wk = WC.create([
        11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15,
        14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
      ]);
      WM = WC.create([
        8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12,
        13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
      ]);
      WG = WC.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
      Ww = WC.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
      Wv = Wv.RIPEMD160 = Wq.extend({
        _doReset: function () {
          this["_hash"] = WC.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
        },
        _doProcessBlock: function (Dq, DE) {
          for (var DP = 0; DP < 16; DP++) {
            var Dk = DE + DP,
              DM = Dq[Dk];
            Dq[Dk] = (16711935 & ((DM << 8) | (DM >>> 24))) | (4278255360 & ((DM << 24) | (DM >>> 8)));
          }
          for (
            var DG,
              Dw,
              DS,
              DF,
              DH,
              DV,
              Dr = this["_hash"].words,
              Db = WG.words,
              DX = Ww.words,
              Dt = WE.words,
              DA = WP.words,
              Dn = Wk.words,
              Ds = WM.words,
              DY = (DG = Dr[0]),
              Dh = (Dw = Dr[1]),
              DK = (DS = Dr[2]),
              Dm = (DF = Dr[3]),
              DN = (DH = Dr[4]),
              DP = 0;
            DP < 80;
            DP += 1
          ) {
            DV =
              ((DV = fm(
                (DV =
                  ((DV = (DG + Dq[DE + Dt[DP]]) | 0) +
                    (DP < 16
                      ? (Dw ^ DS ^ DF) + Db[0]
                      : DP < 32
                      ? fh(Dw, DS, DF) + Db[1]
                      : DP < 48
                      ? ((Dw | ~DS) ^ DF) + Db[2]
                      : DP < 64
                      ? fK(Dw, DS, DF) + Db[3]
                      : (Dw ^ (DS | ~DF)) + Db[4])) |
                  0),
                Dn[DP]
              )) +
                DH) |
              0;
            DG = DH;
            DH = DF;
            DF = fm(DS, 10);
            DS = Dw;
            Dw = DV;
            DV =
              ((DV = fm(
                (DV =
                  ((DV = (DY + Dq[DE + DA[DP]]) | 0) +
                    (DP < 16
                      ? (Dh ^ (DK | ~Dm)) + DX[0]
                      : DP < 32
                      ? fK(Dh, DK, Dm) + DX[1]
                      : DP < 48
                      ? ((Dh | ~DK) ^ Dm) + DX[2]
                      : DP < 64
                      ? fh(Dh, DK, Dm) + DX[3]
                      : (Dh ^ DK ^ Dm) + DX[4])) |
                  0),
                Ds[DP]
              )) +
                DN) |
              0;
            DY = DN;
            DN = Dm;
            Dm = fm(DK, 10);
            DK = Dh;
            Dh = DV;
          }
          DV = (Dr[1] + DS + Dm) | 0;
          Dr[1] = (Dr[2] + DF + DN) | 0;
          Dr[2] = (Dr[3] + DH + DY) | 0;
          Dr[3] = (Dr[4] + DG + Dh) | 0;
          Dr[4] = (Dr[0] + Dw + DK) | 0;
          Dr[0] = DV;
        },
        _doFinalize: function () {
          for (
            var Dq = this["_data"],
              DE = Dq.words,
              DP = 8 * this["_nDataBytes"],
              Dk = 8 * Dq.sigBytes,
              Dk =
                ((DE[Dk >>> 5] |= 128 << (24 - (Dk % 32))),
                (DE[14 + (((64 + Dk) >>> 9) << 4)] = (16711935 & ((DP << 8) | (DP >>> 24))) | (4278255360 & ((DP << 24) | (DP >>> 8)))),
                (Dq.sigBytes = 4 * (DE.length + 1)),
                this["_process"](),
                this["_hash"]),
              DM = Dk.words,
              DG = 0;
            DG < 5;
            DG++
          ) {
            var Dw = DM[DG];
          }
          return Dk;
        },
        clone: function () {
          var Dq = Wq.clone.call(this);
          return (Dq["_hash"] = this["_hash"].clone()), Dq;
        }
      });
      WZ.RIPEMD160 = Wq["_createHelper"](Wv);
      WZ.HmacRIPEMD160 = Wq["_createHmacHelper"](Wv);
      Wv = (WZ = Wd).lib.Base;
      WS = WZ.enc.Utf8;
      WZ.algo.HMAC = Wv.extend({
        init: function (Dq, DE) {
          Dq = this["_hasher"] = new Dq.init();
          "string" == typeof DE && (DE = WS.parse(DE));
          for (
            var DP = Dq.blockSize,
              Dk = 4 * DP,
              Dq = ((DE = DE.sigBytes > Dk ? Dq.finalize(DE) : DE).clamp(), (this["_oKey"] = DE.clone())),
              DE = (this["_iKey"] = DE.clone()),
              DM = Dq.words,
              DG = DE.words,
              Dw = 0;
            Dw < DP;
            Dw++
          ) {
            DG[Dw] ^= 909522486;
          }
          Dq.sigBytes = DE.sigBytes = Dk;
          this.reset();
        },
        reset: function () {
          var Dq = this["_hasher"];
          Dq.reset();
          Dq.update(this["_iKey"]);
        },
        update: function (Dq) {
          return this["_hasher"].update(Dq), this;
        },
        finalize: function (Dq) {
          var DE = this["_hasher"],
            Dq = DE.finalize(Dq);
          return DE.reset(), DE.finalize(this["_oKey"].clone().concat(Dq));
        }
      });
      Wv = (WZ = Wd).lib;
      fy = Wv.Base;
      WF = Wv.WordArray;
      Wv = WZ.algo;
      D5 = Wv.SHA1;
      WH = Wv.HMAC;
      WV = Wv.PBKDF2 = fy.extend({
        cfg: fy.extend({
          keySize: 4,
          hasher: D5,
          iterations: 1
        }),
        init: function (Dq) {
          this.cfg = this.cfg.extend(Dq);
        },
        compute: function (Dq, DE) {
          for (
            var DP = this.cfg,
              Dk = WH.create(DP.hasher, Dq),
              DM = WF.create(),
              DG = WF.create([1]),
              Dw = DM.words,
              DS = DG.words,
              DF = DP.keySize,
              DH = DP.iterations;
            Dw.length < DF;

          ) {
            for (var DV = Dk.update(DE).finalize(DG), Dr = (Dk.reset(), DV.words), Db = Dr.length, DX = DV, Dt = 1; Dt < DH; Dt++) {
              DX = Dk.finalize(DX);
              Dk.reset();
              for (var DA = DX.words, Dn = 0; Dn < Db; Dn++) {
                Dr[Dn] ^= DA[Dn];
              }
            }
            DM.concat(DV);
            DS[0]++;
          }
          return (DM.sigBytes = 4 * DF), DM;
        }
      });
      WZ.PBKDF2 = function (Dq, DE, DP) {
        return WV.create(DP).compute(Dq, DE);
      };
      fy = (Wv = Wd).lib;
      D5 = fy.Base;
      Wr = fy.WordArray;
      fy = Wv.algo;
      WZ = fy.MD5;
      Wb = fy.EvpKDF = D5.extend({
        cfg: D5.extend({
          keySize: 4,
          hasher: WZ,
          iterations: 1
        }),
        init: function (Dq) {
          this.cfg = this.cfg.extend(Dq);
        },
        compute: function (Dq, DE) {
          for (
            var DP, Dk = this.cfg, DM = Dk.hasher.create(), DG = Wr.create(), Dw = DG.words, DS = Dk.keySize, DF = Dk.iterations;
            Dw.length < DS;

          ) {
            DP && DM.update(DP);
            DP = DM.update(Dq).finalize(DE);
            DM.reset();
            for (var DH = 1; DH < DF; DH++) {
              DP = DM.finalize(DP);
              DM.reset();
            }
            DG.concat(DP);
          }
          return (DG.sigBytes = 4 * DS), DG;
        }
      });
      Wv.EvpKDF = function (Dq, DE, DP) {
        return Wb.create(DP).compute(Dq, DE);
      };
      Wd.lib.Cipher ||
        ((D5 = (fy = Wd).lib),
        (WZ = D5.Base),
        (WX = D5.WordArray),
        (Wt = D5.BufferedBlockAlgorithm),
        (Wv = fy.enc).Utf8,
        (WA = Wv.Base64),
        (Wn = fy.algo.EvpKDF),
        (Ws = D5.Cipher =
          Wt.extend({
            cfg: WZ.extend(),
            createEncryptor: function (Dq, DE) {
              return this.create(this["_ENC_XFORM_MODE"], Dq, DE);
            },
            createDecryptor: function (Dq, DE) {
              return this.create(this["_DEC_XFORM_MODE"], Dq, DE);
            },
            init: function (Dq, DE, DP) {
              this.cfg = this.cfg.extend(DP);
              this["_xformMode"] = Dq;
              this["_key"] = DE;
              this.reset();
            },
            reset: function () {
              Wt.reset.call(this);
              this["_doReset"]();
            },
            process: function (Dq) {
              return this["_append"](Dq), this["_process"]();
            },
            finalize: function (Dq) {
              return Dq && this["_append"](Dq), this["_doFinalize"]();
            },
            keySize: 4,
            ivSize: 4,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: function (Dq) {
              return {
                encrypt: function (DE, DP, Dk) {
                  return fN(DP).encrypt(Dq, DE, DP, Dk);
                },
                decrypt: function (DE, DP, Dk) {
                  return fN(DP).decrypt(Dq, DE, DP, Dk);
                }
              };
            }
          })),
        (D5.StreamCipher = Ws.extend({
          _doFinalize: function () {
            return this["_process"](true);
          },
          blockSize: 1
        })),
        (Wv = fy.mode = {}),
        (Wm = D5.BlockCipherMode =
          WZ.extend({
            createEncryptor: function (Dq, DE) {
              return this.Encryptor.create(Dq, DE);
            },
            createDecryptor: function (Dq, DE) {
              return this.Decryptor.create(Dq, DE);
            },
            init: function (Dq, DE) {
              this["_cipher"] = Dq;
              this["_iv"] = DE;
            }
          })),
        (Wm = Wv.CBC =
          (((Wv = Wm.extend()).Encryptor = Wv.extend({
            processBlock: function (Dq, DE) {
              var DP = this["_cipher"],
                Dk = DP.blockSize;
              fx.call(this, Dq, DE, Dk);
              DP.encryptBlock(Dq, DE);
              this["_prevBlock"] = Dq.slice(DE, DE + Dk);
            }
          })),
          (Wv.Decryptor = Wv.extend({
            processBlock: function (Dq, DE) {
              var DP = this["_cipher"],
                Dk = DP.blockSize,
                DM = Dq.slice(DE, DE + Dk);
              DP.decryptBlock(Dq, DE);
              fx.call(this, Dq, DE, Dk);
              this["_prevBlock"] = DM;
            }
          })),
          Wv)),
        (Wv = (fy.pad = {}).Pkcs7 =
          {
            pad: function (Dq, DE) {
              for (var DE = 4 * DE, DP = DE - (Dq.sigBytes % DE), Dk = (DP << 24) | (DP << 16) | (DP << 8) | DP, DM = [], DG = 0; DG < DP; DG += 4) {
                DM.push(Dk);
              }
              DE = WX.create(DM, DP);
              Dq.concat(DE);
            },
            unpad: function (Dq) {
              var DE = 255 & Dq.words[(Dq.sigBytes - 1) >>> 2];
              Dq.sigBytes -= DE;
            }
          }),
        (D5.BlockCipher = Ws.extend({
          cfg: Ws.cfg.extend({
            mode: Wm,
            padding: Wv
          }),
          reset: function () {
            Ws.reset.call(this);
            var Dq,
              DE = this.cfg,
              DP = DE.iv,
              DE = DE.mode;
            this["_xformMode"] == this["_ENC_XFORM_MODE"] ? (Dq = DE.createEncryptor) : ((Dq = DE.createDecryptor), (this["_minBufferSize"] = 1));
            this["_mode"] && this["_mode"]["__creator"] == Dq
              ? this["_mode"].init(this, DP && DP.words)
              : ((this["_mode"] = Dq.call(DE, this, DP && DP.words)), (this["_mode"]["__creator"] = Dq));
          },
          _doProcessBlock: function (Dq, DE) {
            this["_mode"].processBlock(Dq, DE);
          },
          _doFinalize: function () {
            var Dq,
              DE = this.cfg.padding;
            return (
              this["_xformMode"] == this["_ENC_XFORM_MODE"]
                ? (DE.pad(this["_data"], this.blockSize), (Dq = this["_process"](true)))
                : ((Dq = this["_process"](true)), DE.unpad(Dq)),
              Dq
            );
          },
          blockSize: 4
        })),
        (WY = D5.CipherParams =
          WZ.extend({
            init: function (Dq) {
              this.mixIn(Dq);
            },
            toString: function (Dq) {
              return (Dq || this.formatter).stringify(this);
            }
          })),
        (Wm = (fy.format = {}).OpenSSL =
          {
            stringify: function (Dq) {
              var DE = Dq.ciphertext,
                Dq = Dq.salt,
                Dq = Dq ? WX.create([1398893684, 1701076831]).concat(Dq).concat(DE) : DE;
              return Dq.toString(WA);
            },
            parse: function (Dq) {
              var DE,
                Dq = WA.parse(Dq),
                DP = Dq.words;
              return (
                1398893684 == DP[0] && 1701076831 == DP[1] && ((DE = WX.create(DP.slice(2, 4))), DP.splice(0, 4), (Dq.sigBytes -= 16)),
                WY.create({
                  ciphertext: Dq,
                  salt: DE
                })
              );
            }
          }),
        (Wh = D5.SerializableCipher =
          WZ.extend({
            cfg: WZ.extend({ format: Wm }),
            encrypt: function (Dq, DE, DP, Dk) {
              Dk = this.cfg.extend(Dk);
              var DM = Dq.createEncryptor(DP, Dk),
                DE = DM.finalize(DE),
                DM = DM.cfg;
              return WY.create({
                ciphertext: DE,
                key: DP,
                iv: DM.iv,
                algorithm: Dq,
                mode: DM.mode,
                padding: DM.padding,
                blockSize: Dq.blockSize,
                formatter: Dk.format
              });
            },
            decrypt: function (Dq, DE, DP, Dk) {
              return (Dk = this.cfg.extend(Dk)), (DE = this["_parse"](DE, Dk.format)), Dq.createDecryptor(DP, Dk).finalize(DE.ciphertext);
            },
            _parse: function (Dq, DE) {
              return "string" == typeof Dq ? DE.parse(Dq, this) : Dq;
            }
          })),
        (Wv = (fy.kdf = {}).OpenSSL =
          {
            execute: function (Dq, DE, DP, Dk) {
              Dq = Wn.create({ keySize: DE + DP }).compute(Dq, Dk);
              DP = WX.create(Dq.words.slice(DE), 4 * DP);
              (Dq = Wn.create({ keySize: DE + DP }).compute(Dq, Dk)), (DP = WX.create(Dq.words.slice(DE), 4 * DP));
              return (
                (Dq.sigBytes = 4 * DE),
                WY.create({
                  key: Dq,
                  iv: DP,
                  salt: Dk
                })
              );
            }
          }),
        (WK = D5.PasswordBasedCipher =
          Wh.extend({
            cfg: Wh.cfg.extend({ kdf: Wv }),
            encrypt: function (Dq, DE, DP, Dk) {
              DP = (Dk = this.cfg.extend(Dk)).kdf.execute(DP, Dq.keySize, Dq.ivSize);
              Dk.iv = DP.iv;
              Dq = Wh.encrypt.call(this, Dq, DE, DP.key, Dk);
              return Dq.mixIn(DP), Dq;
            },
            decrypt: function (Dq, DE, DP, Dk) {
              Dk = this.cfg.extend(Dk);
              DE = this["_parse"](DE, Dk.format);
              DP = Dk.kdf.execute(DP, Dq.keySize, Dq.ivSize, DE.salt);
              return (Dk.iv = DP.iv), Wh.decrypt.call(this, Dq, DE, DP.key, Dk);
            }
          })));
      Wd.mode.CFB =
        (((WZ = Wd.lib.BlockCipherMode.extend()).Encryptor = WZ.extend({
          processBlock: function (Dq, DE) {
            var DP = this["_cipher"],
              Dk = DP.blockSize;
            fI.call(this, Dq, DE, Dk, DP);
            this["_prevBlock"] = Dq.slice(DE, DE + Dk);
          }
        })),
        (WZ.Decryptor = WZ.extend({
          processBlock: function (Dq, DE) {
            var DP = this["_cipher"],
              Dk = DP.blockSize,
              DM = Dq.slice(DE, DE + Dk);
            fI.call(this, Dq, DE, Dk, DP);
            this["_prevBlock"] = DM;
          }
        })),
        WZ);
      Wd.mode.CTR =
        ((Wm = Wd.lib.BlockCipherMode.extend()),
        (fy = Wm.Encryptor =
          Wm.extend({
            processBlock: function (Dq, DE) {
              var DP = this["_cipher"],
                Dk = DP.blockSize,
                DM = this["_iv"],
                DG = this["_counter"],
                Dw = (DM && ((DG = this["_counter"] = DM.slice(0)), (this["_iv"] = void 0)), DG.slice(0));
              DP.encryptBlock(Dw, 0);
              DG[Dk - 1] = (DG[Dk - 1] + 1) | 0;
              for (var DS = 0; DS < Dk; DS++) {
                Dq[DE + DS] ^= Dw[DS];
              }
            }
          })),
        (Wm.Decryptor = fy),
        Wm);
      Wd.mode.CTRGladman =
        ((D5 = Wd.lib.BlockCipherMode.extend()),
        (Wv = D5.Encryptor =
          D5.extend({
            processBlock: function (Dq, DE) {
              var DP = this["_cipher"],
                Dk = DP.blockSize,
                DM = this["_iv"],
                DG = this["_counter"],
                Dw =
                  (DM && ((DG = this["_counter"] = DM.slice(0)), (this["_iv"] = void 0)),
                  0 === ((DM = DG)[0] = fc(DM[0])) && (DM[1] = fc(DM[1])),
                  DG.slice(0));
              DP.encryptBlock(Dw, 0);
              for (var DS = 0; DS < Dk; DS++) {
                Dq[DE + DS] ^= Dw[DS];
              }
            }
          })),
        (D5.Decryptor = Wv),
        D5);
      Wd.mode.OFB =
        ((WZ = Wd.lib.BlockCipherMode.extend()),
        (fy = WZ.Encryptor =
          WZ.extend({
            processBlock: function (Dq, DE) {
              var DP = this["_cipher"],
                Dk = DP.blockSize,
                DM = this["_iv"],
                DG = this["_keystream"];
              DM && ((DG = this["_keystream"] = DM.slice(0)), (this["_iv"] = void 0));
              DP.encryptBlock(DG, 0);
              for (var Dw = 0; Dw < Dk; Dw++) {
                Dq[DE + Dw] ^= DG[Dw];
              }
            }
          })),
        (WZ.Decryptor = fy),
        WZ);
      Wd.mode.ECB =
        (((Wv = Wd.lib.BlockCipherMode.extend()).Encryptor = Wv.extend({
          processBlock: function (Dq, DE) {
            this["_cipher"].encryptBlock(Dq, DE);
          }
        })),
        (Wv.Decryptor = Wv.extend({
          processBlock: function (Dq, DE) {
            this["_cipher"].decryptBlock(Dq, DE);
          }
        })),
        Wv);
      Wd.pad.AnsiX923 = {
        pad: function (Dq, DE) {
          var DP = Dq.sigBytes,
            DE = 4 * DE,
            DE = DE - (DP % DE),
            DP = DP + DE - 1;
          Dq.clamp();
          Dq.words[DP >>> 2] |= DE << (24 - (DP % 4) * 8);
          Dq.sigBytes += DE;
        },
        unpad: function (Dq) {
          var DE = 255 & Dq.words[(Dq.sigBytes - 1) >>> 2];
          Dq.sigBytes -= DE;
        }
      };
      Wd.pad.Iso10126 = {
        pad: function (Dq, DE) {
          DE *= 4;
          DE -= Dq.sigBytes % DE;
          Dq.concat(Wd.lib.WordArray.random(DE - 1)).concat(Wd.lib.WordArray.create([DE << 24], 1));
        },
        unpad: function (Dq) {
          var DE = 255 & Dq.words[(Dq.sigBytes - 1) >>> 2];
          Dq.sigBytes -= DE;
        }
      };
      Wd.pad.Iso97971 = {
        pad: function (Dq, DE) {
          Dq.concat(Wd.lib.WordArray.create([2147483648], 1));
          Wd.pad.ZeroPadding.pad(Dq, DE);
        },
        unpad: function (Dq) {
          Wd.pad.ZeroPadding.unpad(Dq);
          Dq.sigBytes--;
        }
      };
      Wd.pad.ZeroPadding = {
        pad: function (Dq, DE) {
          Dq.clamp();
          Dq.sigBytes += DE - (Dq.sigBytes % DE || DE);
          Dq.clamp(), (Dq.sigBytes += DE - (Dq.sigBytes % DE || DE));
        },
        unpad: function (Dq) {
          for (var DE = Dq.words, DP = Dq.sigBytes - 1, DP = Dq.sigBytes - 1; 0 <= DP; DP--) {
            if ((DE[DP >>> 2] >>> (24 - (DP % 4) * 8)) & 255) {
              Dq.sigBytes = DP + 1;
              break;
            }
          }
        }
      };
      Wd.pad.NoPadding = {
        pad: function () {},
        unpad: function () {}
      };
      WN = (D5 = Wd).lib.CipherParams;
      Wx = D5.enc.Hex;
      D5.format.Hex = {
        stringify: function (Dq) {
          return Dq.ciphertext.toString(Wx);
        },
        parse: function (Dq) {
          return (Dq = Wx.parse(Dq)), WN.create({ ciphertext: Dq });
        }
      };
      for (
        var fy = Wd,
          WZ = fy.lib.BlockCipher,
          Wv = fy.algo,
          fi = [],
          fU = [],
          fL = [],
          fd = [],
          fv = [],
          fO = [],
          fz = [],
          fB = [],
          fZ = [],
          fj = [],
          fJ = [],
          fR = 0;
        fR < 256;
        fR++
      ) {
        fJ[fR] = fR < 128 ? fR << 1 : (fR << 1) ^ 283;
      }
      for (var fp = 0, fa = 0, fR = 0; fR < 256; fR++) {
        var fQ = fa ^ (fa << 1) ^ (fa << 2) ^ (fa << 3) ^ (fa << 4),
          D0 = fJ[(fU[(fi[fp] = fQ = (fQ >>> 8) ^ (255 & fQ) ^ 99)] = fp)],
          D1 = fJ[D0],
          D2 = fJ[D1],
          D3 = (257 * fJ[fQ]) ^ (16843008 * fQ);
        fL[fp] = (D3 << 24) | (D3 >>> 8);
        fd[fp] = (D3 << 16) | (D3 >>> 16);
        fv[fp] = (D3 << 8) | (D3 >>> 24);
        fO[fp] = D3;
        fz[fQ] = ((D3 = (16843009 * D2) ^ (65537 * D1) ^ (257 * D0) ^ (16843008 * fp)) << 24) | (D3 >>> 8);
        fB[fQ] = (D3 << 16) | (D3 >>> 16);
        fZ[fQ] = (D3 << 8) | (D3 >>> 24);
        fj[fQ] = D3;
        fp ? ((fp = D0 ^ fJ[fJ[fJ[D2 ^ D0]]]), (fa ^= fJ[fJ[fa]])) : (fp = fa = 1);
      }
      var D4 = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
        Wv = (Wv.AES = WZ.extend({
          _doReset: function () {
            if (!this["_nRounds"] || this["_keyPriorReset"] !== this["_key"]) {
              for (
                var Dq = (this["_keyPriorReset"] = this["_key"]),
                  DE = Dq.words,
                  DP = Dq.sigBytes / 4,
                  Dk = 4 * (1 + (this["_nRounds"] = 6 + DP)),
                  DM = (this["_keySchedule"] = []),
                  DG = 0;
                DG < Dk;
                DG++
              ) {
                DG < DP
                  ? (DM[DG] = DE[DG])
                  : ((DF = DM[DG - 1]),
                    DG % DP
                      ? 6 < DP &&
                        DG % DP == 4 &&
                        (DF = (fi[DF >>> 24] << 24) | (fi[(DF >>> 16) & 255] << 16) | (fi[(DF >>> 8) & 255] << 8) | fi[255 & DF])
                      : ((DF =
                          (fi[(DF = (DF << 8) | (DF >>> 24)) >>> 24] << 24) |
                          (fi[(DF >>> 16) & 255] << 16) |
                          (fi[(DF >>> 8) & 255] << 8) |
                          fi[255 & DF]),
                        (DF ^= D4[(DG / DP) | 0] << 24)),
                    (DM[DG] = DM[DG - DP] ^ DF));
              }
              for (var Dw = (this["_invKeySchedule"] = []), DS = 0; DS < Dk; DS++) {
                var DF,
                  DG = Dk - DS;
                DF = DS % 4 ? DM[DG] : DM[DG - 4];
                Dw[DS] = DS < 4 || DG <= 4 ? DF : fz[fi[DF >>> 24]] ^ fB[fi[(DF >>> 16) & 255]] ^ fZ[fi[(DF >>> 8) & 255]] ^ fj[fi[255 & DF]];
              }
            }
          },
          encryptBlock: function (Dq, DE) {
            this["_doCryptBlock"](Dq, DE, this["_keySchedule"], fL, fd, fv, fO, fi);
          },
          decryptBlock: function (Dq, DE) {
            var DP = Dq[DE + 1],
              DP =
                ((Dq[DE + 1] = Dq[DE + 3]),
                (Dq[DE + 3] = DP),
                this["_doCryptBlock"](Dq, DE, this["_invKeySchedule"], fz, fB, fZ, fj, fU),
                Dq[DE + 1]);
            Dq[DE + 1] = Dq[DE + 3];
            Dq[DE + 3] = DP;
          },
          _doCryptBlock: function (Dq, DE, DP, Dk, DM, DG, Dw, DS) {
            for (
              var DF = this["_nRounds"],
                DH = Dq[DE] ^ DP[0],
                DV = Dq[DE + 1] ^ DP[1],
                Dr = Dq[DE + 2] ^ DP[2],
                Db = Dq[DE + 3] ^ DP[3],
                DX = 4,
                Dt = 1;
              Dt < DF;
              Dt++
            ) {
              var DA = Dk[DH >>> 24] ^ DM[(DV >>> 16) & 255] ^ DG[(Dr >>> 8) & 255] ^ Dw[255 & Db] ^ DP[DX++],
                Dn = Dk[DV >>> 24] ^ DM[(Dr >>> 16) & 255] ^ DG[(Db >>> 8) & 255] ^ Dw[255 & DH] ^ DP[DX++],
                Ds = Dk[Dr >>> 24] ^ DM[(Db >>> 16) & 255] ^ DG[(DH >>> 8) & 255] ^ Dw[255 & DV] ^ DP[DX++],
                DY = Dk[Db >>> 24] ^ DM[(DH >>> 16) & 255] ^ DG[(DV >>> 8) & 255] ^ Dw[255 & Dr] ^ DP[DX++],
                DH = DA,
                DV = Dn,
                Dr = Ds,
                Db = DY;
            }
            DA = ((DS[DH >>> 24] << 24) | (DS[(DV >>> 16) & 255] << 16) | (DS[(Dr >>> 8) & 255] << 8) | DS[255 & Db]) ^ DP[DX++];
            Dn = ((DS[DV >>> 24] << 24) | (DS[(Dr >>> 16) & 255] << 16) | (DS[(Db >>> 8) & 255] << 8) | DS[255 & DH]) ^ DP[DX++];
            Ds = ((DS[Dr >>> 24] << 24) | (DS[(Db >>> 16) & 255] << 16) | (DS[(DH >>> 8) & 255] << 8) | DS[255 & DV]) ^ DP[DX++];
            DY = ((DS[Db >>> 24] << 24) | (DS[(DH >>> 16) & 255] << 16) | (DS[(DV >>> 8) & 255] << 8) | DS[255 & Dr]) ^ DP[DX++];
            Dq[DE] = DA;
            Dq[DE + 1] = Dn;
            Dq[DE + 2] = Ds;
            Dq[DE + 3] = DY;
          },
          keySize: 8
        })),
        D5 = ((fy.AES = WZ["_createHelper"](Wv)), Wd),
        D6 = (fy = D5.lib).WordArray,
        fy = fy.BlockCipher,
        WZ = D5.algo,
        D7 = [
          57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7,
          62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4
        ],
        D8 = [
          14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44,
          49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32
        ],
        D9 = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
        DW = [
          {
            0: 8421888,
            268435456: 32768,
            536870912: 8421378,
            805306368: 2,
            1073741824: 512,
            1342177280: 8421890,
            1610612736: 8389122,
            1879048192: 8388608,
            2147483648: 514,
            2415919104: 8389120,
            2684354560: 33280,
            2952790016: 8421376,
            3221225472: 32770,
            3489660928: 8388610,
            3758096384: 0,
            4026531840: 33282,
            134217728: 0,
            402653184: 8421890,
            671088640: 33282,
            939524096: 32768,
            1207959552: 8421888,
            1476395008: 512,
            1744830464: 8421378,
            2013265920: 2,
            2281701376: 8389120,
            2550136832: 33280,
            2818572288: 8421376,
            3087007744: 8389122,
            3355443200: 8388610,
            3623878656: 32770,
            3892314112: 514,
            4160749568: 8388608,
            1: 32768,
            268435457: 2,
            536870913: 8421888,
            805306369: 8388608,
            1073741825: 8421378,
            1342177281: 33280,
            1610612737: 512,
            1879048193: 8389122,
            2147483649: 8421890,
            2415919105: 8421376,
            2684354561: 8388610,
            2952790017: 33282,
            3221225473: 514,
            3489660929: 8389120,
            3758096385: 32770,
            4026531841: 0,
            134217729: 8421890,
            402653185: 8421376,
            671088641: 8388608,
            939524097: 512,
            1207959553: 32768,
            1476395009: 8388610,
            1744830465: 2,
            2013265921: 33282,
            2281701377: 32770,
            2550136833: 8389122,
            2818572289: 514,
            3087007745: 8421888,
            3355443201: 8389120,
            3623878657: 0,
            3892314113: 33280,
            4160749569: 8421378
          },
          {
            0: 1074282512,
            16777216: 16384,
            33554432: 524288,
            50331648: 1074266128,
            67108864: 1073741840,
            83886080: 1074282496,
            100663296: 1073758208,
            117440512: 16,
            134217728: 540672,
            150994944: 1073758224,
            167772160: 1073741824,
            184549376: 540688,
            201326592: 524304,
            218103808: 0,
            234881024: 16400,
            251658240: 1074266112,
            8388608: 1073758208,
            25165824: 540688,
            41943040: 16,
            58720256: 1073758224,
            75497472: 1074282512,
            92274688: 1073741824,
            109051904: 524288,
            125829120: 1074266128,
            142606336: 524304,
            159383552: 0,
            176160768: 16384,
            192937984: 1074266112,
            209715200: 1073741840,
            226492416: 540672,
            243269632: 1074282496,
            260046848: 16400,
            268435456: 0,
            285212672: 1074266128,
            301989888: 1073758224,
            318767104: 1074282496,
            335544320: 1074266112,
            352321536: 16,
            369098752: 540688,
            385875968: 16384,
            402653184: 16400,
            419430400: 524288,
            436207616: 524304,
            452984832: 1073741840,
            469762048: 540672,
            486539264: 1073758208,
            503316480: 1073741824,
            520093696: 1074282512,
            276824064: 540688,
            293601280: 524288,
            310378496: 1074266112,
            327155712: 16384,
            343932928: 1073758208,
            360710144: 1074282512,
            377487360: 16,
            394264576: 1073741824,
            411041792: 1074282496,
            427819008: 1073741840,
            444596224: 1073758224,
            461373440: 524304,
            478150656: 0,
            494927872: 16400,
            511705088: 1074266128,
            528482304: 540672
          },
          {
            0: 260,
            1048576: 0,
            2097152: 67109120,
            3145728: 65796,
            4194304: 65540,
            5242880: 67108868,
            6291456: 67174660,
            7340032: 67174400,
            8388608: 67108864,
            9437184: 67174656,
            10485760: 65792,
            11534336: 67174404,
            12582912: 67109124,
            13631488: 65536,
            14680064: 4,
            15728640: 256,
            524288: 67174656,
            1572864: 67174404,
            2621440: 0,
            3670016: 67109120,
            4718592: 67108868,
            5767168: 65536,
            6815744: 65540,
            7864320: 260,
            8912896: 4,
            9961472: 256,
            11010048: 67174400,
            12058624: 65796,
            13107200: 65792,
            14155776: 67109124,
            15204352: 67174660,
            16252928: 67108864,
            16777216: 67174656,
            17825792: 65540,
            18874368: 65536,
            19922944: 67109120,
            20971520: 256,
            22020096: 67174660,
            23068672: 67108868,
            24117248: 0,
            25165824: 67109124,
            26214400: 67108864,
            27262976: 4,
            28311552: 65792,
            29360128: 67174400,
            30408704: 260,
            31457280: 65796,
            32505856: 67174404,
            17301504: 67108864,
            18350080: 260,
            19398656: 67174656,
            20447232: 0,
            21495808: 65540,
            22544384: 67109120,
            23592960: 256,
            24641536: 67174404,
            25690112: 65536,
            26738688: 67174660,
            27787264: 65796,
            28835840: 67108868,
            29884416: 67109124,
            30932992: 67174400,
            31981568: 4,
            33030144: 65792
          },
          {
            0: 2151682048,
            65536: 2147487808,
            131072: 4198464,
            196608: 2151677952,
            262144: 0,
            327680: 4198400,
            393216: 2147483712,
            458752: 4194368,
            524288: 2147483648,
            589824: 4194304,
            655360: 64,
            720896: 2147487744,
            786432: 2151678016,
            851968: 4160,
            917504: 4096,
            983040: 2151682112,
            32768: 2147487808,
            98304: 64,
            163840: 2151678016,
            229376: 2147487744,
            294912: 4198400,
            360448: 2151682112,
            425984: 0,
            491520: 2151677952,
            557056: 4096,
            622592: 2151682048,
            688128: 4194304,
            753664: 4160,
            819200: 2147483648,
            884736: 4194368,
            950272: 4198464,
            1015808: 2147483712,
            1048576: 4194368,
            1114112: 4198400,
            1179648: 2147483712,
            1245184: 0,
            1310720: 4160,
            1376256: 2151678016,
            1441792: 2151682048,
            1507328: 2147487808,
            1572864: 2151682112,
            1638400: 2147483648,
            1703936: 2151677952,
            1769472: 4198464,
            1835008: 2147487744,
            1900544: 4194304,
            1966080: 64,
            2031616: 4096,
            1081344: 2151677952,
            1146880: 2151682112,
            1212416: 0,
            1277952: 4198400,
            1343488: 4194368,
            1409024: 2147483648,
            1474560: 2147487808,
            1540096: 64,
            1605632: 2147483712,
            1671168: 4096,
            1736704: 2147487744,
            1802240: 2151678016,
            1867776: 4160,
            1933312: 2151682048,
            1998848: 4194304,
            2064384: 4198464
          },
          {
            0: 128,
            4096: 17039360,
            8192: 262144,
            12288: 536870912,
            16384: 537133184,
            20480: 16777344,
            24576: 553648256,
            28672: 262272,
            32768: 16777216,
            36864: 537133056,
            40960: 536871040,
            45056: 553910400,
            49152: 553910272,
            53248: 0,
            57344: 17039488,
            61440: 553648128,
            2048: 17039488,
            6144: 553648256,
            10240: 128,
            14336: 17039360,
            18432: 262144,
            22528: 537133184,
            26624: 553910272,
            30720: 536870912,
            34816: 537133056,
            38912: 0,
            43008: 553910400,
            47104: 16777344,
            51200: 536871040,
            55296: 553648128,
            59392: 16777216,
            63488: 262272,
            65536: 262144,
            69632: 128,
            73728: 536870912,
            77824: 553648256,
            81920: 16777344,
            86016: 553910272,
            90112: 537133184,
            94208: 16777216,
            98304: 553910400,
            102400: 553648128,
            106496: 17039360,
            110592: 537133056,
            114688: 262272,
            118784: 536871040,
            122880: 0,
            126976: 17039488,
            67584: 553648256,
            71680: 16777216,
            75776: 17039360,
            79872: 537133184,
            83968: 536870912,
            88064: 17039488,
            92160: 128,
            96256: 553910272,
            100352: 262272,
            104448: 553910400,
            108544: 0,
            112640: 553648128,
            116736: 16777344,
            120832: 262144,
            124928: 537133056,
            129024: 536871040
          },
          {
            0: 268435464,
            256: 8192,
            512: 270532608,
            768: 270540808,
            1024: 268443648,
            1280: 2097152,
            1536: 2097160,
            1792: 268435456,
            2048: 0,
            2304: 268443656,
            2560: 2105344,
            2816: 8,
            3072: 270532616,
            3328: 2105352,
            3584: 8200,
            3840: 270540800,
            128: 270532608,
            384: 270540808,
            640: 8,
            896: 2097152,
            1152: 2105352,
            1408: 268435464,
            1664: 268443648,
            1920: 8200,
            2176: 2097160,
            2432: 8192,
            2688: 268443656,
            2944: 270532616,
            3200: 0,
            3456: 270540800,
            3712: 2105344,
            3968: 268435456,
            4096: 268443648,
            4352: 270532616,
            4608: 270540808,
            4864: 8200,
            5120: 2097152,
            5376: 268435456,
            5632: 268435464,
            5888: 2105344,
            6144: 2105352,
            6400: 0,
            6656: 8,
            6912: 270532608,
            7168: 8192,
            7424: 268443656,
            7680: 270540800,
            7936: 2097160,
            4224: 8,
            4480: 2105344,
            4736: 2097152,
            4992: 268435464,
            5248: 268443648,
            5504: 8200,
            5760: 270540808,
            6016: 270532608,
            6272: 270540800,
            6528: 270532616,
            6784: 8192,
            7040: 2105352,
            7296: 2097160,
            7552: 0,
            7808: 268435456,
            8064: 268443656
          },
          {
            0: 1048576,
            16: 33555457,
            32: 1024,
            48: 1049601,
            64: 34604033,
            80: 0,
            96: 1,
            112: 34603009,
            128: 33555456,
            144: 1048577,
            160: 33554433,
            176: 34604032,
            192: 34603008,
            208: 1025,
            224: 1049600,
            240: 33554432,
            8: 34603009,
            24: 0,
            40: 33555457,
            56: 34604032,
            72: 1048576,
            88: 33554433,
            104: 33554432,
            120: 1025,
            136: 1049601,
            152: 33555456,
            168: 34603008,
            184: 1048577,
            200: 1024,
            216: 34604033,
            232: 1,
            248: 1049600,
            256: 33554432,
            272: 1048576,
            288: 33555457,
            304: 34603009,
            320: 1048577,
            336: 33555456,
            352: 34604032,
            368: 1049601,
            384: 1025,
            400: 34604033,
            416: 1049600,
            432: 1,
            448: 0,
            464: 34603008,
            480: 33554433,
            496: 1024,
            264: 1049600,
            280: 33555457,
            296: 34603009,
            312: 1,
            328: 33554432,
            344: 1048576,
            360: 1025,
            376: 34604032,
            392: 33554433,
            408: 34603008,
            424: 0,
            440: 34604033,
            456: 1049601,
            472: 1024,
            488: 33555456,
            504: 1048577
          },
          {
            0: 134219808,
            1: 131072,
            2: 134217728,
            3: 32,
            4: 131104,
            5: 134350880,
            6: 134350848,
            7: 2048,
            8: 134348800,
            9: 134219776,
            10: 133120,
            11: 134348832,
            12: 2080,
            13: 0,
            14: 134217760,
            15: 133152,
            2147483648: 2048,
            2147483649: 134350880,
            2147483650: 134219808,
            2147483651: 134217728,
            2147483652: 134348800,
            2147483653: 133120,
            2147483654: 133152,
            2147483655: 32,
            2147483656: 134217760,
            2147483657: 2080,
            2147483658: 131104,
            2147483659: 134350848,
            2147483660: 0,
            2147483661: 134348832,
            2147483662: 134219776,
            2147483663: 131072,
            16: 133152,
            17: 134350848,
            18: 32,
            19: 2048,
            20: 134219776,
            21: 134217760,
            22: 134348832,
            23: 131072,
            24: 0,
            25: 131104,
            26: 134348800,
            27: 134219808,
            28: 134350880,
            29: 133120,
            30: 2080,
            31: 134217728,
            2147483664: 131072,
            2147483665: 2048,
            2147483666: 134348832,
            2147483667: 133152,
            2147483668: 32,
            2147483669: 134348800,
            2147483670: 134217728,
            2147483671: 134219808,
            2147483672: 134350880,
            2147483673: 134217760,
            2147483674: 134219776,
            2147483675: 0,
            2147483676: 133120,
            2147483677: 2080,
            2147483678: 131104,
            2147483679: 134350848
          }
        ],
        Df = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
        DD = (WZ.DES = fy.extend({
          _doReset: function () {
            for (var Dq = this["_key"].words, DE = [], DP = 0; DP < 56; DP++) {
              var Dk = D7[DP] - 1;
              DE[DP] = (Dq[Dk >>> 5] >>> (31 - (Dk % 32))) & 1;
            }
            for (var DM = (this["_subKeys"] = []), DG = 0; DG < 16; DG++) {
              for (var Dw = (DM[DG] = []), DS = D9[DG], DP = 0; DP < 24; DP++) {
                Dw[(DP / 6) | 0] |= DE[(D8[DP] - 1 + DS) % 28] << (31 - (DP % 6));
                Dw[4 + ((DP / 6) | 0)] |= DE[28 + ((D8[DP + 24] - 1 + DS) % 28)] << (31 - (DP % 6));
              }
              Dw[0] = (Dw[0] << 1) | (Dw[0] >>> 31);
              for (DP = 1; DP < 7; DP++) {
                Dw[DP] = Dw[DP] >>> (4 * (DP - 1) + 3);
              }
              Dw[7] = (Dw[7] << 5) | (Dw[7] >>> 27);
            }
            for (var DF = (this["_invSubKeys"] = []), DP = 0; DP < 16; DP++) {
              DF[DP] = DM[15 - DP];
            }
          },
          encryptBlock: function (Dq, DE) {
            this["_doCryptBlock"](Dq, DE, this["_subKeys"]);
          },
          decryptBlock: function (Dq, DE) {
            this["_doCryptBlock"](Dq, DE, this["_invSubKeys"]);
          },
          _doCryptBlock: function (Dq, DE, DP) {
            this["_lBlock"] = Dq[DE];
            this["_rBlock"] = Dq[DE + 1];
            Du.call(this, 4, 252645135);
            Du.call(this, 16, 65535);
            Dl.call(this, 2, 858993459);
            Dl.call(this, 8, 16711935);
            Du.call(this, 1, 1431655765);
            for (var Dk = 0; Dk < 16; Dk++) {
              for (var DM = DP[Dk], DG = this["_lBlock"], Dw = this["_rBlock"], DS = 0, DF = 0; DF < 8; DF++) {
                DS |= DW[DF][((Dw ^ DM[DF]) & Df[DF]) >>> 0];
              }
              this["_lBlock"] = Dw;
              this["_rBlock"] = DG ^ DS;
            }
            var DH = this["_lBlock"];
            this["_lBlock"] = this["_rBlock"];
            this["_rBlock"] = DH;
            Du.call(this, 1, 1431655765);
            Dl.call(this, 8, 16711935);
            Dl.call(this, 2, 858993459);
            Du.call(this, 16, 65535);
            Du.call(this, 4, 252645135);
            Dq[DE] = this["_lBlock"];
            Dq[DE + 1] = this["_rBlock"];
          },
          keySize: 2,
          ivSize: 2,
          blockSize: 2
        }));

      function Du(Dq, DE) {
        DE = ((this["_lBlock"] >>> Dq) ^ this["_rBlock"]) & DE;
        this["_rBlock"] ^= DE;
        this["_lBlock"] ^= DE << Dq;
      }

      function Dl(Dq, DE) {
        DE = ((this["_rBlock"] >>> Dq) ^ this["_lBlock"]) & DE;
        this["_lBlock"] ^= DE;
        this["_rBlock"] ^= DE << Dq;
      }

      D5.DES = fy["_createHelper"](DD);
      WZ = WZ.TripleDES = fy.extend({
        _doReset: function () {
          var Dq = this["_key"].words;
          if (2 !== Dq.length && 4 !== Dq.length && Dq.length < 6) {
            throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
          }
          var DE = Dq.slice(0, 2),
            DP = Dq.length < 4 ? Dq.slice(0, 2) : Dq.slice(2, 4),
            Dq = Dq.length < 6 ? Dq.slice(0, 2) : Dq.slice(4, 6);
          this["_des1"] = DD.createEncryptor(D6.create(DE));
          this["_des2"] = DD.createEncryptor(D6.create(DP));
          this["_des3"] = DD.createEncryptor(D6.create(Dq));
        },
        encryptBlock: function (Dq, DE) {
          this["_des1"].encryptBlock(Dq, DE);
          this["_des2"].decryptBlock(Dq, DE);
          this["_des3"].encryptBlock(Dq, DE);
        },
        decryptBlock: function (Dq, DE) {
          this["_des3"].decryptBlock(Dq, DE);
          this["_des2"].encryptBlock(Dq, DE);
          this["_des1"].decryptBlock(Dq, DE);
        },
        keySize: 6,
        ivSize: 2,
        blockSize: 2
      });
      D5.TripleDES = fy["_createHelper"](WZ);
      var Wv = Wd,
        D5 = Wv.lib.StreamCipher,
        fy = Wv.algo,
        Dg = (fy.RC4 = D5.extend({
          _doReset: function () {
            for (var Dq = this["_key"], DE = Dq.words, DP = Dq.sigBytes, Dk = (this["_S"] = []), DM = 0; DM < 256; DM++) {
              Dk[DM] = DM;
            }
            for (var DM = 0, DG = 0; DM < 256; DM++) {
              var Dw = DM % DP,
                Dw = (DE[Dw >>> 2] >>> (24 - (Dw % 4) * 8)) & 255,
                DG = (DG + Dk[DM] + Dw) % 256,
                Dw = Dk[DM];
              Dk[DM] = Dk[DG];
              Dk[DG] = Dw;
            }
            this["_i"] = this["_j"] = 0;
          },
          _doProcessBlock: function (Dq, DE) {
            Dq[DE] ^= Do.call(this);
          },
          keySize: 8,
          ivSize: 0
        }));

      function Do() {
        for (var Dq = this["_S"], DE = this["_i"], DP = this["_j"], Dk = 0, DM = 0; DM < 4; DM++) {
          var DP = (DP + Dq[(DE = (DE + 1) % 256)]) % 256,
            DG = Dq[DE];
          Dq[DE] = Dq[DP];
          Dq[DP] = DG;
          Dk |= Dq[(Dq[DE] + Dq[DP]) % 256] << (24 - 8 * DM);
        }
        return (this["_i"] = DE), (this["_j"] = DP), Dk;
      }

      function DT() {
        for (var Dq = this["_X"], DE = this["_C"], DP = 0; DP < 8; DP++) {
          Wc[DP] = DE[DP];
        }
        DE[0] = (DE[0] + 1295307597 + this["_b"]) | 0;
        DE[1] = (DE[1] + 3545052371 + (DE[0] >>> 0 < Wc[0] >>> 0 ? 1 : 0)) | 0;
        DE[2] = (DE[2] + 886263092 + (DE[1] >>> 0 < Wc[1] >>> 0 ? 1 : 0)) | 0;
        DE[3] = (DE[3] + 1295307597 + (DE[2] >>> 0 < Wc[2] >>> 0 ? 1 : 0)) | 0;
        DE[4] = (DE[4] + 3545052371 + (DE[3] >>> 0 < Wc[3] >>> 0 ? 1 : 0)) | 0;
        DE[5] = (DE[5] + 886263092 + (DE[4] >>> 0 < Wc[4] >>> 0 ? 1 : 0)) | 0;
        DE[6] = (DE[6] + 1295307597 + (DE[5] >>> 0 < Wc[5] >>> 0 ? 1 : 0)) | 0;
        DE[7] = (DE[7] + 3545052371 + (DE[6] >>> 0 < Wc[6] >>> 0 ? 1 : 0)) | 0;
        this["_b"] = DE[7] >>> 0 < Wc[7] >>> 0 ? 1 : 0;
        for (DP = 0; DP < 8; DP++) {
          var Dk = Dq[DP] + DE[DP],
            DM = 65535 & Dk,
            DG = Dk >>> 16;
          Wy[DP] = (((((DM * DM) >>> 17) + DM * DG) >>> 15) + DG * DG) ^ ((((4294901760 & Dk) * Dk) | 0) + (((65535 & Dk) * Dk) | 0));
        }
        Dq[0] = (Wy[0] + ((Wy[7] << 16) | (Wy[7] >>> 16)) + ((Wy[6] << 16) | (Wy[6] >>> 16))) | 0;
        Dq[1] = (Wy[1] + ((Wy[0] << 8) | (Wy[0] >>> 24)) + Wy[7]) | 0;
        Dq[2] = (Wy[2] + ((Wy[1] << 16) | (Wy[1] >>> 16)) + ((Wy[0] << 16) | (Wy[0] >>> 16))) | 0;
        Dq[3] = (Wy[3] + ((Wy[2] << 8) | (Wy[2] >>> 24)) + Wy[1]) | 0;
        Dq[4] = (Wy[4] + ((Wy[3] << 16) | (Wy[3] >>> 16)) + ((Wy[2] << 16) | (Wy[2] >>> 16))) | 0;
        Dq[5] = (Wy[5] + ((Wy[4] << 8) | (Wy[4] >>> 24)) + Wy[3]) | 0;
        Dq[6] = (Wy[6] + ((Wy[5] << 16) | (Wy[5] >>> 16)) + ((Wy[4] << 16) | (Wy[4] >>> 16))) | 0;
        Dq[7] = (Wy[7] + ((Wy[6] << 8) | (Wy[6] >>> 24)) + Wy[5]) | 0;
      }

      function DC() {
        for (var Dq = this["_X"], DE = this["_C"], DP = 0; DP < 8; DP++) {
          WU[DP] = DE[DP];
        }
        DE[0] = (DE[0] + 1295307597 + this["_b"]) | 0;
        DE[1] = (DE[1] + 3545052371 + (DE[0] >>> 0 < WU[0] >>> 0 ? 1 : 0)) | 0;
        DE[2] = (DE[2] + 886263092 + (DE[1] >>> 0 < WU[1] >>> 0 ? 1 : 0)) | 0;
        DE[3] = (DE[3] + 1295307597 + (DE[2] >>> 0 < WU[2] >>> 0 ? 1 : 0)) | 0;
        DE[4] = (DE[4] + 3545052371 + (DE[3] >>> 0 < WU[3] >>> 0 ? 1 : 0)) | 0;
        DE[5] = (DE[5] + 886263092 + (DE[4] >>> 0 < WU[4] >>> 0 ? 1 : 0)) | 0;
        DE[6] = (DE[6] + 1295307597 + (DE[5] >>> 0 < WU[5] >>> 0 ? 1 : 0)) | 0;
        DE[7] = (DE[7] + 3545052371 + (DE[6] >>> 0 < WU[6] >>> 0 ? 1 : 0)) | 0;
        this["_b"] = DE[7] >>> 0 < WU[7] >>> 0 ? 1 : 0;
        for (DP = 0; DP < 8; DP++) {
          var Dk = Dq[DP] + DE[DP],
            DM = 65535 & Dk,
            DG = Dk >>> 16;
          WL[DP] = (((((DM * DM) >>> 17) + DM * DG) >>> 15) + DG * DG) ^ ((((4294901760 & Dk) * Dk) | 0) + (((65535 & Dk) * Dk) | 0));
        }
        Dq[0] = (WL[0] + ((WL[7] << 16) | (WL[7] >>> 16)) + ((WL[6] << 16) | (WL[6] >>> 16))) | 0;
        Dq[1] = (WL[1] + ((WL[0] << 8) | (WL[0] >>> 24)) + WL[7]) | 0;
        Dq[2] = (WL[2] + ((WL[1] << 16) | (WL[1] >>> 16)) + ((WL[0] << 16) | (WL[0] >>> 16))) | 0;
        Dq[3] = (WL[3] + ((WL[2] << 8) | (WL[2] >>> 24)) + WL[1]) | 0;
        Dq[4] = (WL[4] + ((WL[3] << 16) | (WL[3] >>> 16)) + ((WL[2] << 16) | (WL[2] >>> 16))) | 0;
        Dq[5] = (WL[5] + ((WL[4] << 8) | (WL[4] >>> 24)) + WL[3]) | 0;
        Dq[6] = (WL[6] + ((WL[5] << 16) | (WL[5] >>> 16)) + ((WL[4] << 16) | (WL[4] >>> 16))) | 0;
        Dq[7] = (WL[7] + ((WL[6] << 8) | (WL[6] >>> 24)) + WL[5]) | 0;
      }

      return (
        (Wv.RC4 = D5["_createHelper"](Dg)),
        (fy = fy.RC4Drop =
          Dg.extend({
            cfg: Dg.cfg.extend({ drop: 192 }),
            _doReset: function () {
              Dg["_doReset"].call(this);
              for (var Dq = this.cfg.drop; 0 < Dq; Dq--) {
                Do.call(this);
              }
            }
          })),
        (Wv.RC4Drop = D5["_createHelper"](fy)),
        (Wv = (WZ = Wd).lib.StreamCipher),
        (D5 = WZ.algo),
        (WI = []),
        (Wc = []),
        (Wy = []),
        (D5 = D5.Rabbit =
          Wv.extend({
            _doReset: function () {
              for (var Dq = this["_key"].words, DE = this.cfg.iv, DP = 0; DP < 4; DP++) {
                Dq[DP] = (16711935 & ((Dq[DP] << 8) | (Dq[DP] >>> 24))) | (4278255360 & ((Dq[DP] << 24) | (Dq[DP] >>> 8)));
              }
              for (
                var Dk = (this["_X"] = [
                    Dq[0],
                    (Dq[3] << 16) | (Dq[2] >>> 16),
                    Dq[1],
                    (Dq[0] << 16) | (Dq[3] >>> 16),
                    Dq[2],
                    (Dq[1] << 16) | (Dq[0] >>> 16),
                    Dq[3],
                    (Dq[2] << 16) | (Dq[1] >>> 16)
                  ]),
                  DM = (this["_C"] = [
                    (Dq[2] << 16) | (Dq[2] >>> 16),
                    (4294901760 & Dq[0]) | (65535 & Dq[1]),
                    (Dq[3] << 16) | (Dq[3] >>> 16),
                    (4294901760 & Dq[1]) | (65535 & Dq[2]),
                    (Dq[0] << 16) | (Dq[0] >>> 16),
                    (4294901760 & Dq[2]) | (65535 & Dq[3]),
                    (Dq[1] << 16) | (Dq[1] >>> 16),
                    (4294901760 & Dq[3]) | (65535 & Dq[0])
                  ]),
                  DP = (this["_b"] = 0);
                DP < 4;
                DP++
              ) {
                DT.call(this);
              }
              for (DP = 0; DP < 8; DP++) {}
              if (DE) {
                var DE = DE.words,
                  DG = DE[0],
                  DE = DE[1],
                  DG = (16711935 & ((DG << 8) | (DG >>> 24))) | (4278255360 & ((DG << 24) | (DG >>> 8))),
                  DE = (16711935 & ((DE << 8) | (DE >>> 24))) | (4278255360 & ((DE << 24) | (DE >>> 8))),
                  Dw = (DG >>> 16) | (4294901760 & DE),
                  DS = (DE << 16) | (65535 & DG);
                DM[0] ^= DG;
                DM[1] ^= Dw;
                DM[2] ^= DE;
                DM[3] ^= DS;
                DM[4] ^= DG;
                DM[5] ^= Dw;
                DM[6] ^= DE;
                DM[7] ^= DS;
                for (DP = 0; DP < 4; DP++) {
                  DT.call(this);
                }
              }
            },
            _doProcessBlock: function (Dq, DE) {
              var DP = this["_X"];
              DT.call(this);
              WI[0] = DP[0] ^ (DP[5] >>> 16) ^ (DP[3] << 16);
              WI[1] = DP[2] ^ (DP[7] >>> 16) ^ (DP[5] << 16);
              WI[2] = DP[4] ^ (DP[1] >>> 16) ^ (DP[7] << 16);
              WI[3] = DP[6] ^ (DP[3] >>> 16) ^ (DP[1] << 16);
              for (var Dk = 0; Dk < 4; Dk++) {
                WI[Dk] = (16711935 & ((WI[Dk] << 8) | (WI[Dk] >>> 24))) | (4278255360 & ((WI[Dk] << 24) | (WI[Dk] >>> 8)));
                Dq[DE + Dk] ^= WI[Dk];
              }
            },
            blockSize: 4,
            ivSize: 2
          })),
        (WZ.Rabbit = Wv["_createHelper"](D5)),
        (WZ = (fy = Wd).lib.StreamCipher),
        (Wv = fy.algo),
        (Wi = []),
        (WU = []),
        (WL = []),
        (Wv = Wv.RabbitLegacy =
          WZ.extend({
            _doReset: function () {
              for (
                var Dq = this["_key"].words,
                  DE = this.cfg.iv,
                  DP = (this["_X"] = [
                    Dq[0],
                    (Dq[3] << 16) | (Dq[2] >>> 16),
                    Dq[1],
                    (Dq[0] << 16) | (Dq[3] >>> 16),
                    Dq[2],
                    (Dq[1] << 16) | (Dq[0] >>> 16),
                    Dq[3],
                    (Dq[2] << 16) | (Dq[1] >>> 16)
                  ]),
                  Dk = (this["_C"] = [
                    (Dq[2] << 16) | (Dq[2] >>> 16),
                    (4294901760 & Dq[0]) | (65535 & Dq[1]),
                    (Dq[3] << 16) | (Dq[3] >>> 16),
                    (4294901760 & Dq[1]) | (65535 & Dq[2]),
                    (Dq[0] << 16) | (Dq[0] >>> 16),
                    (4294901760 & Dq[2]) | (65535 & Dq[3]),
                    (Dq[1] << 16) | (Dq[1] >>> 16),
                    (4294901760 & Dq[3]) | (65535 & Dq[0])
                  ]),
                  DM = (this["_b"] = 0);
                DM < 4;
                DM++
              ) {
                DC.call(this);
              }
              for (DM = 0; DM < 8; DM++) {
                Dk[DM] ^= DP[(DM + 4) & 7];
              }
              if (DE) {
                var Dq = DE.words,
                  DE = Dq[0],
                  Dq = Dq[1],
                  DE = (16711935 & ((DE << 8) | (DE >>> 24))) | (4278255360 & ((DE << 24) | (DE >>> 8))),
                  Dq = (16711935 & ((Dq << 8) | (Dq >>> 24))) | (4278255360 & ((Dq << 24) | (Dq >>> 8))),
                  DG = (DE >>> 16) | (4294901760 & Dq),
                  Dw = (Dq << 16) | (65535 & DE);
                Dk[0] ^= DE;
                Dk[1] ^= DG;
                Dk[2] ^= Dq;
                Dk[3] ^= Dw;
                Dk[4] ^= DE;
                Dk[5] ^= DG;
                Dk[6] ^= Dq;
                Dk[7] ^= Dw;
                for (DM = 0; DM < 4; DM++) {
                  DC.call(this);
                }
              }
            },
            _doProcessBlock: function (Dq, DE) {
              var DP = this["_X"];
              DC.call(this);
              Wi[0] = DP[0] ^ (DP[5] >>> 16) ^ (DP[3] << 16);
              Wi[1] = DP[2] ^ (DP[7] >>> 16) ^ (DP[5] << 16);
              Wi[2] = DP[4] ^ (DP[1] >>> 16) ^ (DP[7] << 16);
              Wi[3] = DP[6] ^ (DP[3] >>> 16) ^ (DP[1] << 16);
              for (var Dk = 0; Dk < 4; Dk++) {
                Wi[Dk] = (16711935 & ((Wi[Dk] << 8) | (Wi[Dk] >>> 24))) | (4278255360 & ((Wi[Dk] << 24) | (Wi[Dk] >>> 8)));
                Dq[DE + Dk] ^= Wi[Dk];
              }
            },
            blockSize: 4,
            ivSize: 2
          })),
        (fy.RabbitLegacy = WZ["_createHelper"](Wv)),
        Wd
      );
    }),
    !(function (W5, W6) {
      "object" == typeof exports && "object" == typeof module
        ? (module.exports = W6())
        : "function" == typeof define && define.amd
        ? define([], W6)
        : "object" == typeof exports
        ? (exports.devtoolsDetector = W6())
        : (W5.devtoolsDetector = W6());
    })("undefined" != typeof self ? self : this, function () {
      return (
        (W6 = [
          function (W8, W9, WW) {
            "use strict";
            !function (Wf) {
              W9.c = function () {
                return ("undefined" != typeof performance ? performance : Date).now();
              };
              W9.b = function (Wu) {
                for (
                  var Wl = (Wu = void 0 === Wu ? {} : Wu).includes,
                    Wu = Wu.excludes,
                    Wu = void 0 === Wu ? [] : Wu,
                    Wg = false,
                    Wo = false,
                    WT = 0,
                    WC = void 0 === Wl ? [] : Wl;
                  WT < WC.length;
                  WT++
                ) {
                  if (true === WC[WT]) {
                    Wg = true;
                    break;
                  }
                }
                for (var Wq = 0, WE = Wu; Wq < WE.length; Wq++) {
                  if (true === WE[Wq]) {
                    Wo = true;
                    break;
                  }
                }
                return Wg && !Wo;
              };
              W9.d = function (Wu, Wl, Wg) {
                Wu = We.a[Wu];
                return void 0 !== Wu && Object(WD.compare)(Wu, Wl, Wg);
              };
              W9.a = function () {
                return "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== Wf ? Wf : this;
              };
              var WD = WW(11),
                We = (WW.n(WD), WW(5));
            }.call(W9, WW(10));
          },
          function (W8, W9, WW) {
            "use strict";
            WW.d(W9, "c", function () {
              return WD;
            });
            WW.d(W9, "d", function () {
              return We;
            });
            WW.d(W9, "b", function () {
              return Wu;
            });
            WW.d(W9, "g", function () {
              return Wl;
            });
            WW.d(W9, "e", function () {
              return Wg;
            });
            WW.d(W9, "a", function () {
              return Wo;
            });
            WW.d(W9, "f", function () {
              return WT;
            });
            var Wf,
              W9 = WW(3),
              WW = WW(0),
              WW = Object(WW.a)(),
              WD = "InstallTrigger" in ((null == WW ? void 0 : WW.window) || {}) || /firefox/i.test(W9.b),
              We = /trident/i.test(W9.b) || /msie/i.test(W9.b),
              Wu = /edge/i.test(W9.b),
              Wl = /webkit/i.test(W9.b) && !Wu,
              Wg = /IqiyiApp/.test(W9.b),
              Wo = void 0 !== (null == (Wf = null == WW ? void 0 : WW.window) ? void 0 : Wf.chrome) || /chrome/i.test(W9.b) || /CriOS/i.test(W9.b),
              WT =
                "[object SafariRemoteNotification]" ===
                  (
                    (null == (WW = null == (Wf = null == WW ? void 0 : WW.window) ? void 0 : Wf.safari) ? void 0 : WW.pushNotification) || false
                  ).toString() ||
                (/safari/i.test(W9.b) && !Wo);
          },
          function (W8, W9, WW) {
            "use strict";
            WW.d(W9, "b", function () {
              return We;
            });
            WW.d(W9, "c", function () {
              return Wu;
            });
            WW.d(W9, "a", function () {
              return Wl;
            });
            var Wf = WW(1);

            function WD(Wg) {
              if (console) {
                if (!Wf.d && !Wf.b) {
                  return console[Wg];
                }
                if ("log" === Wg || "clear" === Wg) {
                  return function () {
                    for (var Wo = [], WT = 0; WT < arguments.length; WT++) {
                      Wo[WT] = arguments[WT];
                    }
                    console[Wg].apply(console, Wo);
                  };
                }
              }
              return function () {
                for (var Wo = 0; Wo < arguments.length; Wo++) {
                  Wo;
                  0;
                }
              };
            }

            var We = WD("log"),
              Wu = WD("table"),
              Wl = WD("clear");
          },
          function (W8, W9, WW) {
            "use strict";
            W9.a = function () {
              for (var We, Wu = [], Wl = 0; Wl < arguments.length; Wl++) {
                Wu[Wl] = arguments[Wl];
              }
              return null != Wf && Wf.document ? (We = Wf.document).createElement.apply(We, Wu) : {};
            };
            WW.d(W9, "b", function () {
              return WD;
            });
            var W9 = WW(0),
              Wf = Object(W9.a)(),
              WD = (null == (WW = null == Wf ? void 0 : Wf.navigator) ? void 0 : WW.userAgent) || "xxxxx";
          },
          function (W8, W9, WW) {
            "use strict";
            Object.defineProperty(W9, "__esModule", { value: true });
            W9.addListener = function (Wq) {
              WC.addListener(Wq);
            };
            W9.removeListener = function (Wq) {
              WC.removeListener(Wq);
            };
            W9.isLaunch = function () {
              return WC.isLaunch();
            };
            W9.launch = function () {
              WC.launch();
            };
            W9.stop = function () {
              WC.stop();
            };
            W9.setDetectDelay = function (Wq) {
              WC.setDetectDelay(Wq);
            };
            var Wf = WW(7),
              WD = WW(8),
              We =
                (WW.d(W9, "DevtoolsDetector", function () {
                  return Wf.a;
                }),
                WW.d(W9, "checkers", function () {
                  return WD;
                }),
                WW(0)),
              Wu =
                (WW.d(W9, "match", function () {
                  return We.b;
                }),
                WW.d(W9, "specificVersionMatch", function () {
                  return We.d;
                }),
                WW(1)),
              Wl =
                (WW.d(W9, "isFirefox", function () {
                  return Wu.c;
                }),
                WW.d(W9, "isIE", function () {
                  return Wu.d;
                }),
                WW.d(W9, "isEdge", function () {
                  return Wu.b;
                }),
                WW.d(W9, "isWebkit", function () {
                  return Wu.g;
                }),
                WW.d(W9, "isIqiyiApp", function () {
                  return Wu.e;
                }),
                WW.d(W9, "isChrome", function () {
                  return Wu.a;
                }),
                WW.d(W9, "isSafari", function () {
                  return Wu.f;
                }),
                WW(2)),
              Wg =
                (WW.d(W9, "log", function () {
                  return Wl.b;
                }),
                WW.d(W9, "table", function () {
                  return Wl.c;
                }),
                WW.d(W9, "clear", function () {
                  return Wl.a;
                }),
                WW(19)),
              Wo =
                (WW.d(W9, "isMobile", function () {
                  return Wg.a;
                }),
                WW(5)),
              WT =
                (WW.d(W9, "versionMap", function () {
                  return Wo.a;
                }),
                WW(6)),
              WC =
                (WW.d(W9, "isMac", function () {
                  return WT.d;
                }),
                WW.d(W9, "isIpad", function () {
                  return WT.b;
                }),
                WW.d(W9, "isIphone", function () {
                  return WT.c;
                }),
                WW.d(W9, "isAndroid", function () {
                  return WT.a;
                }),
                WW.d(W9, "isWindows", function () {
                  return WT.e;
                }),
                new Wf.a({
                  checkers: [
                    WD.erudaChecker,
                    WD.elementIdChecker,
                    WD.regToStringChecker,
                    WD.functionToStringChecker,
                    WD.depRegToStringChecker,
                    WD.dateToStringChecker,
                    WD.performanceChecker,
                    WD.debuggerChecker
                  ]
                }));
            W9.default = WC;
          },
          function (W8, W9, WW) {
            "use strict";
            WW.d(W9, "a", function () {
              return Wf;
            });
            for (var Wf = { Wl: Wu }, WD = 0, We = (WW(3).b || "").match(/\w+\/(\d|\.)+(\s|$)/gi) || []; WD < We.length; WD++) {
              var Wu = We[WD].split("/"),
                Wl = Wu[0],
                Wu = Wu[1];
            }
          },
          function (W8, W9, WW) {
            "use strict";
            WW.d(W9, "d", function () {
              return Wf;
            });
            WW.d(W9, "b", function () {
              return WD;
            });
            WW.d(W9, "c", function () {
              return We;
            });
            WW.d(W9, "a", function () {
              return Wu;
            });
            WW.d(W9, "e", function () {
              return Wl;
            });
            var W9 = WW(3),
              Wf = /macintosh/i.test(W9.b),
              WD = /ipad/i.test(W9.b) || (Wf && 1 < navigator.maxTouchPoints),
              We = /iphone/i.test(W9.b),
              Wu = /android/i.test(W9.b),
              Wl = /windows/i.test(W9.b);
          },
          function (W8, W9, WW) {
            "use strict";
            WW.d(W9, "a", function () {
              return We;
            });
            var Wf =
                (this && this["__awaiter"]) ||
                function (Wl, Wg, Wo, WT) {
                  return new (Wo = Wo || Promise)(function (WC, Wq) {
                    function WE(WM) {
                      try {
                        Wk(WT.next(WM));
                      } catch (WG) {
                        Wq(WG);
                      }
                    }

                    function WP(WM) {
                      try {
                        Wk(WT.throw(WM));
                      } catch (WG) {
                        Wq(WG);
                      }
                    }

                    function Wk(WM) {
                      var WG;
                      WM.done
                        ? WC(WM.value)
                        : ((WG = WM.value) instanceof Wo
                            ? WG
                            : new Wo(function (Ww) {
                                Ww(WG);
                              })
                          ).then(WE, WP);
                    }

                    Wk((WT = WT.apply(Wl, Wg || [])).next());
                  });
                },
              WD =
                (this && this["__generator"]) ||
                function (Wl, Wg) {
                  var Wo,
                    WT,
                    WC,
                    Wq = {
                      label: 0,
                      sent: function () {
                        if (1 & WC[0]) {
                          throw WC[1];
                        }
                        return WC[1];
                      },
                      trys: [],
                      ops: []
                    },
                    WE = {
                      next: WP(0),
                      throw: WP(1),
                      return: WP(2)
                    };
                  return (
                    "function" == typeof Symbol &&
                      (WE[Symbol.iterator] = function () {
                        return this;
                      }),
                    WE
                  );

                  function WP(Wk) {
                    return function (WM) {
                      var WG = [Wk, WM];
                      if (Wo) {
                        throw new TypeError("Generator is already executing.");
                      }
                      for (; Wq; ) {
                        try {
                          if (
                            ((Wo = 1),
                            WT &&
                              (WC = 2 & WG[0] ? WT.return : WG[0] ? WT.throw || ((WC = WT.return) && WC.call(WT), 0) : WT.next) &&
                              !(WC = WC.call(WT, WG[1])).done)
                          ) {
                            return WC;
                          }
                          switch (((WT = 0), (WG = WC ? [2 & WG[0], WC.value] : WG)[0])) {
                            case 0:
                            case 1:
                              WC = WG;
                              break;
                            case 4:
                              return (
                                Wq.label++,
                                {
                                  value: WG[1],
                                  done: false
                                }
                              );
                            case 5:
                              Wq.label++, (WT = WG[1]), (WG = [0]);
                              continue;
                            case 7:
                              (WG = Wq.ops.pop()), Wq.trys.pop();
                              continue;
                            default:
                              if (!(WC = 0 < (WC = Wq.trys).length && WC[WC.length - 1]) && (6 === WG[0] || 2 === WG[0])) {
                                Wq = 0;
                                continue;
                              }
                              if (3 === WG[0] && (!WC || (WG[1] > WC[0] && WG[1] < WC[3]))) {
                                Wq.label = WG[1];
                              } else {
                                if (6 === WG[0] && Wq.label < WC[1]) {
                                  Wq.label = WC[1];
                                  WC = WG;
                                } else {
                                  if (!(WC && Wq.label < WC[2])) {
                                    WC[2] && Wq.ops.pop();
                                    Wq.trys.pop();
                                    continue;
                                  }
                                  Wq.label = WC[2];
                                  Wq.ops.push(WG);
                                }
                              }
                          }
                          WG = Wg.call(Wl, Wq);
                        } catch (Ww) {
                          WG = [6, Ww];
                          WT = 0;
                        } finally {
                          Wo = WC = 0;
                        }
                      }
                      if (5 & WG[0]) {
                        throw WG[1];
                      }
                      return {
                        value: WG[0] ? WG[1] : void 0,
                        done: true
                      };
                    };
                  }
                },
              We =
                ((Wu.prototype.launch = function () {
                  this["_detectLoopDelay"] <= 0 && this.setDetectDelay(500);
                  this["_detectLoopStopped"] && ((this["_detectLoopStopped"] = false), this["_detectLoop"]());
                }),
                (Wu.prototype.stop = function () {
                  this["_detectLoopStopped"] || ((this["_detectLoopStopped"] = true), clearTimeout(this["_timer"]));
                }),
                (Wu.prototype.isLaunch = function () {
                  return !this["_detectLoopStopped"];
                }),
                (Wu.prototype.setDetectDelay = function (Wl) {
                  this["_detectLoopDelay"] = Wl;
                }),
                (Wu.prototype.addListener = function (Wl) {
                  this["_listeners"].push(Wl);
                }),
                (Wu.prototype.removeListener = function (Wl) {
                  this["_listeners"] = this["_listeners"].filter(function (Wg) {
                    return Wg !== Wl;
                  });
                }),
                (Wu.prototype["_broadcast"] = function (Wl) {
                  for (var Wg = 0, Wo = this["_listeners"]; Wg < Wo.length; Wg++) {
                    var WT = Wo[Wg];
                    try {
                      WT(Wl.isOpen, Wl);
                    } catch (WC) {}
                  }
                }),
                (Wu.prototype["_detectLoop"] = function () {
                  return Wf(this, void 0, void 0, function () {
                    var Wl,
                      Wg,
                      Wo,
                      WT,
                      WC,
                      Wq = this;
                    return WD(this, function (WE) {
                      switch (WE.label) {
                        case 0:
                          (Wl = false), (Wg = ""), (Wo = 0), (WT = this["_checkers"]), (WE.label = 1);
                        case 1:
                          return Wo < WT.length ? [4, (WC = WT[Wo]).isEnable()] : [3, 6];
                        case 2:
                          return WE.sent() ? ((Wg = WC.name), [4, WC.isOpen()]) : [3, 4];
                        case 3:
                          (Wl = WE.sent()), (WE.label = 4);
                        case 4:
                          if (Wl) {
                            return [3, 6];
                          }
                          WE.label = 5;
                        case 5:
                          return Wo++, [3, 1];
                        case 6:
                          return (
                            Wl != this["_isOpen"] &&
                              ((this["_isOpen"] = Wl),
                              this["_broadcast"]({
                                isOpen: Wl,
                                checkerName: Wg
                              })),
                            0 < this["_detectLoopDelay"]
                              ? (this["_timer"] = setTimeout(function () {
                                  return Wq["_detectLoop"]();
                                }, this["_detectLoopDelay"]))
                              : this.stop(),
                            [2]
                          );
                      }
                    });
                  });
                }),
                Wu);

            function Wu(Wl) {
              Wl = Wl.checkers;
              this["_listeners"] = [];
              this["_isOpen"] = false;
              this["_detectLoopStopped"] = true;
              this["_detectLoopDelay"] = 500;
              this["_checkers"] = Wl.slice();
            }
          },
          function (W8, W9, WW) {
            "use strict";
            Object.defineProperty(W9, "__esModule", { value: true });
            var Wf = WW(9),
              WD =
                (WW.d(W9, "depRegToStringChecker", function () {
                  return Wf.a;
                }),
                WW(12)),
              We =
                (WW.d(W9, "elementIdChecker", function () {
                  return WD.a;
                }),
                WW(13)),
              Wu =
                (WW.d(W9, "functionToStringChecker", function () {
                  return We.a;
                }),
                WW(14)),
              Wl =
                (WW.d(W9, "regToStringChecker", function () {
                  return Wu.a;
                }),
                WW(15)),
              Wg =
                (WW.d(W9, "debuggerChecker", function () {
                  return Wl.a;
                }),
                WW(16)),
              Wo =
                (WW.d(W9, "dateToStringChecker", function () {
                  return Wg.a;
                }),
                WW(17)),
              WT =
                (WW.d(W9, "performanceChecker", function () {
                  return Wo.a;
                }),
                WW(18));
            WW.d(W9, "erudaChecker", function () {
              return WT.a;
            });
          },
          function (W8, W9, WW) {
            "use strict";
            WW.d(W9, "a", function () {
              return WT;
            });
            var Wf = WW(1),
              WD = WW(2),
              We = WW(0),
              Wu =
                (this && this["__awaiter"]) ||
                function (WC, Wq, WE, WP) {
                  return new (WE = WE || Promise)(function (Wk, WM) {
                    function WG(WF) {
                      try {
                        WS(WP.next(WF));
                      } catch (WH) {
                        WM(WH);
                      }
                    }

                    function Ww(WF) {
                      try {
                        WS(WP.throw(WF));
                      } catch (WH) {
                        WM(WH);
                      }
                    }

                    function WS(WF) {
                      var WH;
                      WF.done
                        ? Wk(WF.value)
                        : ((WH = WF.value) instanceof WE
                            ? WH
                            : new WE(function (WV) {
                                WV(WH);
                              })
                          ).then(WG, Ww);
                    }

                    WS((WP = WP.apply(WC, Wq || [])).next());
                  });
                },
              Wl =
                (this && this["__generator"]) ||
                function (WC, Wq) {
                  var WE,
                    WP,
                    Wk,
                    WM = {
                      label: 0,
                      sent: function () {
                        if (1 & Wk[0]) {
                          throw Wk[1];
                        }
                        return Wk[1];
                      },
                      trys: [],
                      ops: []
                    },
                    WG = {
                      next: Ww(0),
                      throw: Ww(1),
                      return: Ww(2)
                    };
                  return (
                    "function" == typeof Symbol &&
                      (WG[Symbol.iterator] = function () {
                        return this;
                      }),
                    WG
                  );

                  function Ww(WS) {
                    return function (WF) {
                      var WH = [WS, WF];
                      if (WE) {
                        throw new TypeError("Generator is already executing.");
                      }
                      for (; WM; ) {
                        try {
                          if (
                            ((WE = 1),
                            WP &&
                              (Wk = 2 & WH[0] ? WP.return : WH[0] ? WP.throw || ((Wk = WP.return) && Wk.call(WP), 0) : WP.next) &&
                              !(Wk = Wk.call(WP, WH[1])).done)
                          ) {
                            return Wk;
                          }
                          switch (((WP = 0), (WH = Wk ? [2 & WH[0], Wk.value] : WH)[0])) {
                            case 0:
                            case 1:
                              Wk = WH;
                              break;
                            case 4:
                              return (
                                WM.label++,
                                {
                                  value: WH[1],
                                  done: false
                                }
                              );
                            case 5:
                              WM.label++, (WP = WH[1]), (WH = [0]);
                              continue;
                            case 7:
                              (WH = WM.ops.pop()), WM.trys.pop();
                              continue;
                            default:
                              if (!(Wk = 0 < (Wk = WM.trys).length && Wk[Wk.length - 1]) && (6 === WH[0] || 2 === WH[0])) {
                                WM = 0;
                                continue;
                              }
                              if (3 === WH[0] && (!Wk || (WH[1] > Wk[0] && WH[1] < Wk[3]))) {
                                WM.label = WH[1];
                              } else {
                                if (6 === WH[0] && WM.label < Wk[1]) {
                                  WM.label = Wk[1];
                                  Wk = WH;
                                } else {
                                  if (!(Wk && WM.label < Wk[2])) {
                                    Wk[2] && WM.ops.pop();
                                    WM.trys.pop();
                                    continue;
                                  }
                                  WM.label = Wk[2];
                                  WM.ops.push(WH);
                                }
                              }
                          }
                          WH = Wq.call(WC, WM);
                        } catch (WV) {
                          WH = [6, WV];
                          WP = 0;
                        } finally {
                          WE = Wk = 0;
                        }
                      }
                      if (5 & WH[0]) {
                        throw WH[1];
                      }
                      return {
                        value: WH[0] ? WH[1] : void 0,
                        done: true
                      };
                    };
                  }
                },
              Wo = false,
              WT =
                ((/ /.toString = function () {
                  return (Wo = true), WT.name;
                }),
                {
                  name: "dep-reg-to-string",
                  isOpen: function () {
                    return Wu(this, void 0, void 0, function () {
                      return Wl(this, function (WC) {
                        return (Wo = false), Object(WD.c)({ dep: / / }), Object(WD.a)(), [2, Wo];
                      });
                    });
                  },
                  isEnable: function () {
                    return Wu(this, void 0, void 0, function () {
                      return Wl(this, function (WC) {
                        return [
                          2,
                          Object(We.b)({
                            includes: [true],
                            excludes: [Wf.c, Wf.d]
                          })
                        ];
                      });
                    });
                  }
                });
          },
          function (W8, W9) {
            var WW = (function () {
              return this;
            })();
            try {
              WW = WW || Function("return this")() || (0, eval)("this");
            } catch (Wf) {
              "object" == typeof window && (WW = window);
            }
            W8.exports = WW;
          },
          function (W8, W9, WW) {
            var Wf;
            void 0 !==
              (W9 =
                "function" ==
                typeof (Wf = function () {
                  function We(WC) {
                    var Wq = WC.replace(/^v/, "").replace(/\+.*$/, ""),
                      WE = (function (Wk, WM) {
                        return -1 === Wk.indexOf(WM) ? Wk.length : Wk.indexOf(WM);
                      })(Wq, "-"),
                      WP = Wq.substring(0, WE).split(".");
                    return WP.push(Wq.substring(WE + 1)), WP;
                  }

                  function Wu(WC) {
                    return isNaN(Number(WC)) ? WC : Number(WC);
                  }

                  function Wl(WC) {
                    if ("string" != typeof WC) {
                      throw new TypeError("Invalid argument expected string");
                    }
                    if (
                      !/^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i.test(
                        WC
                      )
                    ) {
                      throw new Error("Invalid argument not valid semver ('" + WC + "' received)");
                    }
                  }

                  function Wg(WC, Wq) {
                    [WC, Wq].forEach(Wl);
                    for (var WE = We(WC), WP = We(Wq), Wk = 0; Wk < Math.max(WE.length - 1, WP.length - 1); Wk++) {
                      var WM = parseInt(WE[Wk] || 0, 10),
                        WG = parseInt(WP[Wk] || 0, 10);
                      if (WM > WG) {
                        return 1;
                      }
                      if (WG > WM) {
                        return -1;
                      }
                    }
                    var Ww = WE[WE.length - 1],
                      WS = WP[WP.length - 1];
                    if (Ww && WS) {
                      var WF = Ww.split(".").map(Wu),
                        WH = WS.split(".").map(Wu);
                      for (Wk = 0; Wk < Math.max(WF.length, WH.length); Wk++) {
                        if (void 0 === WF[Wk] || ("string" == typeof WH[Wk] && "number" == typeof WF[Wk])) {
                          return -1;
                        }
                        if (void 0 === WH[Wk] || ("string" == typeof WF[Wk] && "number" == typeof WH[Wk])) {
                          return 1;
                        }
                        if (WF[Wk] > WH[Wk]) {
                          return 1;
                        }
                        if (WH[Wk] > WF[Wk]) {
                          return -1;
                        }
                      }
                    } else {
                      if (Ww || WS) {
                        return Ww ? -1 : 1;
                      }
                    }
                    return 0;
                  }

                  var Wo = [">", ">=", "=", "<", "<="],
                    WT = {
                      ">": [1],
                      ">=": [0, 1],
                      "=": [0],
                      "<=": [-1, 0],
                      "<": [-1]
                    };
                  return (
                    (Wg.validate = function (WC) {
                      return (
                        "string" == typeof WC &&
                        /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i.test(
                          WC
                        )
                      );
                    }),
                    (Wg.compare = function (WC, Wq, WE) {
                      !(function (Wk) {
                        if ("string" != typeof Wk) {
                          throw new TypeError("Invalid operator type, expected string but got " + typeof Wk);
                        }
                        if (-1 === Wo.indexOf(Wk)) {
                          throw new TypeError("Invalid operator, expected one of " + Wo.join("|"));
                        }
                      })(WE);
                      var WP = Wg(WC, Wq);
                      return WT[WE].indexOf(WP) > -1;
                    }),
                    Wg
                  );
                })
                  ? Wf.apply(W9, [])
                  : Wf) && (W8.exports = W9);
          },
          function (W8, W9, WW) {
            "use strict";
            WW.d(W9, "a", function () {
              return WT;
            });
            var Wf = WW(1),
              WD = WW(2),
              We = WW(0),
              W9 = WW(3),
              Wu =
                (this && this["__awaiter"]) ||
                function (WC, Wq, WE, WP) {
                  return new (WE = WE || Promise)(function (Wk, WM) {
                    function WG(WF) {
                      try {
                        WS(WP.next(WF));
                      } catch (WH) {
                        WM(WH);
                      }
                    }

                    function Ww(WF) {
                      try {
                        WS(WP.throw(WF));
                      } catch (WH) {
                        WM(WH);
                      }
                    }

                    function WS(WF) {
                      var WH;
                      WF.done
                        ? Wk(WF.value)
                        : ((WH = WF.value) instanceof WE
                            ? WH
                            : new WE(function (WV) {
                                WV(WH);
                              })
                          ).then(WG, Ww);
                    }

                    WS((WP = WP.apply(WC, Wq || [])).next());
                  });
                },
              Wl =
                (this && this["__generator"]) ||
                function (WC, Wq) {
                  var WE,
                    WP,
                    Wk,
                    WM = {
                      label: 0,
                      sent: function () {
                        if (1 & Wk[0]) {
                          throw Wk[1];
                        }
                        return Wk[1];
                      },
                      trys: [],
                      ops: []
                    },
                    WG = {
                      next: Ww(0),
                      throw: Ww(1),
                      return: Ww(2)
                    };
                  return (
                    "function" == typeof Symbol &&
                      (WG[Symbol.iterator] = function () {
                        return this;
                      }),
                    WG
                  );

                  function Ww(WS) {
                    return function (WF) {
                      var WH = [WS, WF];
                      if (WE) {
                        throw new TypeError("Generator is already executing.");
                      }
                      for (; WM; ) {
                        try {
                          if (
                            ((WE = 1),
                            WP &&
                              (Wk = 2 & WH[0] ? WP.return : WH[0] ? WP.throw || ((Wk = WP.return) && Wk.call(WP), 0) : WP.next) &&
                              !(Wk = Wk.call(WP, WH[1])).done)
                          ) {
                            return Wk;
                          }
                          switch (((WP = 0), (WH = Wk ? [2 & WH[0], Wk.value] : WH)[0])) {
                            case 0:
                            case 1:
                              Wk = WH;
                              break;
                            case 4:
                              return (
                                WM.label++,
                                {
                                  value: WH[1],
                                  done: false
                                }
                              );
                            case 5:
                              WM.label++, (WP = WH[1]), (WH = [0]);
                              continue;
                            case 7:
                              (WH = WM.ops.pop()), WM.trys.pop();
                              continue;
                            default:
                              if (!(Wk = 0 < (Wk = WM.trys).length && Wk[Wk.length - 1]) && (6 === WH[0] || 2 === WH[0])) {
                                WM = 0;
                                continue;
                              }
                              if (3 === WH[0] && (!Wk || (WH[1] > Wk[0] && WH[1] < Wk[3]))) {
                                WM.label = WH[1];
                              } else {
                                if (6 === WH[0] && WM.label < Wk[1]) {
                                  WM.label = Wk[1];
                                  Wk = WH;
                                } else {
                                  if (!(Wk && WM.label < Wk[2])) {
                                    Wk[2] && WM.ops.pop();
                                    WM.trys.pop();
                                    continue;
                                  }
                                  WM.label = Wk[2];
                                  WM.ops.push(WH);
                                }
                              }
                          }
                          WH = Wq.call(WC, WM);
                        } catch (WV) {
                          WH = [6, WV];
                          WP = 0;
                        } finally {
                          WE = Wk = 0;
                        }
                      }
                      if (5 & WH[0]) {
                        throw WH[1];
                      }
                      return {
                        value: WH[0] ? WH[1] : void 0,
                        done: true
                      };
                    };
                  }
                },
              Wg = Object(W9.a)("div"),
              Wo = false,
              WT =
                (Object.defineProperty(Wg, "id", {
                  get: function () {
                    return (Wo = true), WT.name;
                  },
                  configurable: true
                }),
                {
                  name: "element-id",
                  isOpen: function () {
                    return Wu(this, void 0, void 0, function () {
                      return Wl(this, function (WC) {
                        return (Wo = false), Object(WD.b)(Wg), Object(WD.a)(), [2, Wo];
                      });
                    });
                  },
                  isEnable: function () {
                    return Wu(this, void 0, void 0, function () {
                      return Wl(this, function (WC) {
                        return [
                          2,
                          Object(We.b)({
                            includes: [true],
                            excludes: [Wf.d, Wf.b, Wf.c]
                          })
                        ];
                      });
                    });
                  }
                });
          },
          function (W8, W9, WW) {
            "use strict";
            WW.d(W9, "a", function () {
              return WC;
            });
            var Wf = WW(1),
              WD = WW(2),
              We = WW(6),
              Wu = WW(0),
              Wl =
                (this && this["__awaiter"]) ||
                function (Wq, WE, WP, Wk) {
                  return new (WP = WP || Promise)(function (WM, WG) {
                    function Ww(WH) {
                      try {
                        WF(Wk.next(WH));
                      } catch (WV) {
                        WG(WV);
                      }
                    }

                    function WS(WH) {
                      try {
                        WF(Wk.throw(WH));
                      } catch (WV) {
                        WG(WV);
                      }
                    }

                    function WF(WH) {
                      var WV;
                      WH.done
                        ? WM(WH.value)
                        : ((WV = WH.value) instanceof WP
                            ? WV
                            : new WP(function (Wr) {
                                Wr(WV);
                              })
                          ).then(Ww, WS);
                    }

                    WF((Wk = Wk.apply(Wq, WE || [])).next());
                  });
                },
              Wg =
                (this && this["__generator"]) ||
                function (Wq, WE) {
                  var WP,
                    Wk,
                    WM,
                    WG = {
                      label: 0,
                      sent: function () {
                        if (1 & WM[0]) {
                          throw WM[1];
                        }
                        return WM[1];
                      },
                      trys: [],
                      ops: []
                    },
                    Ww = {
                      next: WS(0),
                      throw: WS(1),
                      return: WS(2)
                    };
                  return (
                    "function" == typeof Symbol &&
                      (Ww[Symbol.iterator] = function () {
                        return this;
                      }),
                    Ww
                  );

                  function WS(WF) {
                    return function (WH) {
                      var WV = [WF, WH];
                      if (WP) {
                        throw new TypeError("Generator is already executing.");
                      }
                      for (; WG; ) {
                        try {
                          if (
                            ((WP = 1),
                            Wk &&
                              (WM = 2 & WV[0] ? Wk.return : WV[0] ? Wk.throw || ((WM = Wk.return) && WM.call(Wk), 0) : Wk.next) &&
                              !(WM = WM.call(Wk, WV[1])).done)
                          ) {
                            return WM;
                          }
                          switch (((Wk = 0), (WV = WM ? [2 & WV[0], WM.value] : WV)[0])) {
                            case 0:
                            case 1:
                              WM = WV;
                              break;
                            case 4:
                              return (
                                WG.label++,
                                {
                                  value: WV[1],
                                  done: false
                                }
                              );
                            case 5:
                              WG.label++, (Wk = WV[1]), (WV = [0]);
                              continue;
                            case 7:
                              (WV = WG.ops.pop()), WG.trys.pop();
                              continue;
                            default:
                              if (!(WM = 0 < (WM = WG.trys).length && WM[WM.length - 1]) && (6 === WV[0] || 2 === WV[0])) {
                                WG = 0;
                                continue;
                              }
                              if (3 === WV[0] && (!WM || (WV[1] > WM[0] && WV[1] < WM[3]))) {
                                WG.label = WV[1];
                              } else {
                                if (6 === WV[0] && WG.label < WM[1]) {
                                  WG.label = WM[1];
                                  WM = WV;
                                } else {
                                  if (!(WM && WG.label < WM[2])) {
                                    WM[2] && WG.ops.pop();
                                    WG.trys.pop();
                                    continue;
                                  }
                                  WG.label = WM[2];
                                  WG.ops.push(WV);
                                }
                              }
                          }
                          WV = WE.call(Wq, WG);
                        } catch (Wr) {
                          WV = [6, Wr];
                          Wk = 0;
                        } finally {
                          WP = WM = 0;
                        }
                      }
                      if (5 & WV[0]) {
                        throw WV[1];
                      }
                      return {
                        value: WV[0] ? WV[1] : void 0,
                        done: true
                      };
                    };
                  }
                };

            function Wo() {}

            var WT = 0,
              WC =
                ((Wo.toString = function () {
                  return WT++, "";
                }),
                {
                  name: "function-to-string",
                  isOpen: function () {
                    return Wl(this, void 0, void 0, function () {
                      return Wg(this, function (Wq) {
                        return (WT = 0), Object(WD.b)(Wo), Object(WD.a)(), [2, 2 === WT];
                      });
                    });
                  },
                  isEnable: function () {
                    return Wl(this, void 0, void 0, function () {
                      return Wg(this, function (Wq) {
                        return [
                          2,
                          Object(Wu.b)({
                            includes: [true],
                            excludes: [Wf.e, Wf.c, (We.b || We.c) && Wf.a]
                          })
                        ];
                      });
                    });
                  }
                });
          },
          function (W8, W9, WW) {
            "use strict";
            WW.d(W9, "a", function () {
              return WT;
            });
            var Wf = WW(2),
              WD = WW(1),
              We = WW(0),
              Wu =
                (this && this["__awaiter"]) ||
                function (WC, Wq, WE, WP) {
                  return new (WE = WE || Promise)(function (Wk, WM) {
                    function WG(WF) {
                      try {
                        WS(WP.next(WF));
                      } catch (WH) {
                        WM(WH);
                      }
                    }

                    function Ww(WF) {
                      try {
                        WS(WP.throw(WF));
                      } catch (WH) {
                        WM(WH);
                      }
                    }

                    function WS(WF) {
                      var WH;
                      WF.done
                        ? Wk(WF.value)
                        : ((WH = WF.value) instanceof WE
                            ? WH
                            : new WE(function (WV) {
                                WV(WH);
                              })
                          ).then(WG, Ww);
                    }

                    WS((WP = WP.apply(WC, Wq || [])).next());
                  });
                },
              Wl =
                (this && this["__generator"]) ||
                function (WC, Wq) {
                  var WE,
                    WP,
                    Wk,
                    WM = {
                      label: 0,
                      sent: function () {
                        if (1 & Wk[0]) {
                          throw Wk[1];
                        }
                        return Wk[1];
                      },
                      trys: [],
                      ops: []
                    },
                    WG = {
                      next: Ww(0),
                      throw: Ww(1),
                      return: Ww(2)
                    };
                  return (
                    "function" == typeof Symbol &&
                      (WG[Symbol.iterator] = function () {
                        return this;
                      }),
                    WG
                  );

                  function Ww(WS) {
                    return function (WF) {
                      var WH = [WS, WF];
                      if (WE) {
                        throw new TypeError("Generator is already executing.");
                      }
                      for (; WM; ) {
                        try {
                          if (
                            ((WE = 1),
                            WP &&
                              (Wk = 2 & WH[0] ? WP.return : WH[0] ? WP.throw || ((Wk = WP.return) && Wk.call(WP), 0) : WP.next) &&
                              !(Wk = Wk.call(WP, WH[1])).done)
                          ) {
                            return Wk;
                          }
                          switch (((WP = 0), (WH = Wk ? [2 & WH[0], Wk.value] : WH)[0])) {
                            case 0:
                            case 1:
                              Wk = WH;
                              break;
                            case 4:
                              return (
                                WM.label++,
                                {
                                  value: WH[1],
                                  done: false
                                }
                              );
                            case 5:
                              WM.label++, (WP = WH[1]), (WH = [0]);
                              continue;
                            case 7:
                              (WH = WM.ops.pop()), WM.trys.pop();
                              continue;
                            default:
                              if (!(Wk = 0 < (Wk = WM.trys).length && Wk[Wk.length - 1]) && (6 === WH[0] || 2 === WH[0])) {
                                WM = 0;
                                continue;
                              }
                              if (3 === WH[0] && (!Wk || (WH[1] > Wk[0] && WH[1] < Wk[3]))) {
                                WM.label = WH[1];
                              } else {
                                if (6 === WH[0] && WM.label < Wk[1]) {
                                  WM.label = Wk[1];
                                  Wk = WH;
                                } else {
                                  if (!(Wk && WM.label < Wk[2])) {
                                    Wk[2] && WM.ops.pop();
                                    WM.trys.pop();
                                    continue;
                                  }
                                  WM.label = Wk[2];
                                  WM.ops.push(WH);
                                }
                              }
                          }
                          WH = Wq.call(WC, WM);
                        } catch (WV) {
                          WH = [6, WV];
                          WP = 0;
                        } finally {
                          WE = Wk = 0;
                        }
                      }
                      if (5 & WH[0]) {
                        throw WH[1];
                      }
                      return {
                        value: WH[0] ? WH[1] : void 0,
                        done: true
                      };
                    };
                  }
                },
              Wo = false,
              WT =
                ((/ /.toString = function () {
                  return (Wo = true), WT.name;
                }),
                {
                  name: "reg-to-string",
                  isOpen: function () {
                    return Wu(this, void 0, void 0, function () {
                      return Wl(this, function (WC) {
                        return (Wo = false), Object(Wf.b)(/ /), Object(Wf.a)(), [2, Wo];
                      });
                    });
                  },
                  isEnable: function () {
                    return Wu(this, void 0, void 0, function () {
                      return Wl(this, function (WC) {
                        return [
                          2,
                          Object(We.b)({
                            includes: [true],
                            excludes: [WD.g]
                          })
                        ];
                      });
                    });
                  }
                });
          },
          function (W8, W9, WW) {
            "use strict";
            WW.d(W9, "a", function () {
              return Wu;
            });
            var Wf = WW(0),
              WD =
                (this && this["__awaiter"]) ||
                function (Wl, Wg, Wo, WT) {
                  return new (Wo = Wo || Promise)(function (WC, Wq) {
                    function WE(WM) {
                      try {
                        Wk(WT.next(WM));
                      } catch (WG) {
                        Wq(WG);
                      }
                    }

                    function WP(WM) {
                      try {
                        Wk(WT.throw(WM));
                      } catch (WG) {
                        Wq(WG);
                      }
                    }

                    function Wk(WM) {
                      var WG;
                      WM.done
                        ? WC(WM.value)
                        : ((WG = WM.value) instanceof Wo
                            ? WG
                            : new Wo(function (Ww) {
                                Ww(WG);
                              })
                          ).then(WE, WP);
                    }

                    Wk((WT = WT.apply(Wl, Wg || [])).next());
                  });
                },
              We =
                (this && this["__generator"]) ||
                function (Wl, Wg) {
                  var Wo,
                    WT,
                    WC,
                    Wq = {
                      label: 0,
                      sent: function () {
                        if (1 & WC[0]) {
                          throw WC[1];
                        }
                        return WC[1];
                      },
                      trys: [],
                      ops: []
                    },
                    WE = {
                      next: WP(0),
                      throw: WP(1),
                      return: WP(2)
                    };
                  return (
                    "function" == typeof Symbol &&
                      (WE[Symbol.iterator] = function () {
                        return this;
                      }),
                    WE
                  );

                  function WP(Wk) {
                    return function (WM) {
                      var WG = [Wk, WM];
                      if (Wo) {
                        throw new TypeError("Generator is already executing.");
                      }
                      for (; Wq; ) {
                        try {
                          if (
                            ((Wo = 1),
                            WT &&
                              (WC = 2 & WG[0] ? WT.return : WG[0] ? WT.throw || ((WC = WT.return) && WC.call(WT), 0) : WT.next) &&
                              !(WC = WC.call(WT, WG[1])).done)
                          ) {
                            return WC;
                          }
                          switch (((WT = 0), (WG = WC ? [2 & WG[0], WC.value] : WG)[0])) {
                            case 0:
                            case 1:
                              WC = WG;
                              break;
                            case 4:
                              return (
                                Wq.label++,
                                {
                                  value: WG[1],
                                  done: false
                                }
                              );
                            case 5:
                              Wq.label++, (WT = WG[1]), (WG = [0]);
                              continue;
                            case 7:
                              (WG = Wq.ops.pop()), Wq.trys.pop();
                              continue;
                            default:
                              if (!(WC = 0 < (WC = Wq.trys).length && WC[WC.length - 1]) && (6 === WG[0] || 2 === WG[0])) {
                                Wq = 0;
                                continue;
                              }
                              if (3 === WG[0] && (!WC || (WG[1] > WC[0] && WG[1] < WC[3]))) {
                                Wq.label = WG[1];
                              } else {
                                if (6 === WG[0] && Wq.label < WC[1]) {
                                  Wq.label = WC[1];
                                  WC = WG;
                                } else {
                                  if (!(WC && Wq.label < WC[2])) {
                                    WC[2] && Wq.ops.pop();
                                    Wq.trys.pop();
                                    continue;
                                  }
                                  Wq.label = WC[2];
                                  Wq.ops.push(WG);
                                }
                              }
                          }
                          WG = Wg.call(Wl, Wq);
                        } catch (Ww) {
                          WG = [6, Ww];
                          WT = 0;
                        } finally {
                          Wo = WC = 0;
                        }
                      }
                      if (5 & WG[0]) {
                        throw WG[1];
                      }
                      return {
                        value: WG[0] ? WG[1] : void 0,
                        done: true
                      };
                    };
                  }
                },
              Wu = {
                name: "debugger-checker",
                isOpen: function () {
                  return WD(this, void 0, void 0, function () {
                    var Wl;
                    return We(this, function (Wg) {
                      return (Wl = Object(Wf.c)()), function () {}.constructor("debugger")(), [2, 100 < Object(Wf.c)() - Wl];
                    });
                  });
                },
                isEnable: function () {
                  return WD(this, void 0, void 0, function () {
                    return We(this, function (Wl) {
                      return [2, true];
                    });
                  });
                }
              };
          },
          function (W8, W9, WW) {
            "use strict";
            WW.d(W9, "a", function () {
              return WC;
            });
            var Wf = WW(1),
              WD = WW(2),
              We = WW(0),
              Wu = WW(4),
              Wl =
                (this && this["__awaiter"]) ||
                function (Wq, WE, WP, Wk) {
                  return new (WP = WP || Promise)(function (WM, WG) {
                    function Ww(WH) {
                      try {
                        WF(Wk.next(WH));
                      } catch (WV) {
                        WG(WV);
                      }
                    }

                    function WS(WH) {
                      try {
                        WF(Wk.throw(WH));
                      } catch (WV) {
                        WG(WV);
                      }
                    }

                    function WF(WH) {
                      var WV;
                      WH.done
                        ? WM(WH.value)
                        : ((WV = WH.value) instanceof WP
                            ? WV
                            : new WP(function (Wr) {
                                Wr(WV);
                              })
                          ).then(Ww, WS);
                    }

                    WF((Wk = Wk.apply(Wq, WE || [])).next());
                  });
                },
              Wg =
                (this && this["__generator"]) ||
                function (Wq, WE) {
                  var WP,
                    Wk,
                    WM,
                    WG = {
                      label: 0,
                      sent: function () {
                        if (1 & WM[0]) {
                          throw WM[1];
                        }
                        return WM[1];
                      },
                      trys: [],
                      ops: []
                    },
                    Ww = {
                      next: WS(0),
                      throw: WS(1),
                      return: WS(2)
                    };
                  return (
                    "function" == typeof Symbol &&
                      (Ww[Symbol.iterator] = function () {
                        return this;
                      }),
                    Ww
                  );

                  function WS(WF) {
                    return function (WH) {
                      var WV = [WF, WH];
                      if (WP) {
                        throw new TypeError("Generator is already executing.");
                      }
                      for (; WG; ) {
                        try {
                          if (
                            ((WP = 1),
                            Wk &&
                              (WM = 2 & WV[0] ? Wk.return : WV[0] ? Wk.throw || ((WM = Wk.return) && WM.call(Wk), 0) : Wk.next) &&
                              !(WM = WM.call(Wk, WV[1])).done)
                          ) {
                            return WM;
                          }
                          switch (((Wk = 0), (WV = WM ? [2 & WV[0], WM.value] : WV)[0])) {
                            case 0:
                            case 1:
                              WM = WV;
                              break;
                            case 4:
                              return (
                                WG.label++,
                                {
                                  value: WV[1],
                                  done: false
                                }
                              );
                            case 5:
                              WG.label++, (Wk = WV[1]), (WV = [0]);
                              continue;
                            case 7:
                              (WV = WG.ops.pop()), WG.trys.pop();
                              continue;
                            default:
                              if (!(WM = 0 < (WM = WG.trys).length && WM[WM.length - 1]) && (6 === WV[0] || 2 === WV[0])) {
                                WG = 0;
                                continue;
                              }
                              if (3 === WV[0] && (!WM || (WV[1] > WM[0] && WV[1] < WM[3]))) {
                                WG.label = WV[1];
                              } else {
                                if (6 === WV[0] && WG.label < WM[1]) {
                                  WG.label = WM[1];
                                  WM = WV;
                                } else {
                                  if (!(WM && WG.label < WM[2])) {
                                    WM[2] && WG.ops.pop();
                                    WG.trys.pop();
                                    continue;
                                  }
                                  WG.label = WM[2];
                                  WG.ops.push(WV);
                                }
                              }
                          }
                          WV = WE.call(Wq, WG);
                        } catch (Wr) {
                          WV = [6, Wr];
                          Wk = 0;
                        } finally {
                          WP = WM = 0;
                        }
                      }
                      if (5 & WV[0]) {
                        throw WV[1];
                      }
                      return {
                        value: WV[0] ? WV[1] : void 0,
                        done: true
                      };
                    };
                  }
                },
              Wo = new Date(),
              WT = 0,
              WC =
                ((Wo.toString = function () {
                  return WT++, "";
                }),
                {
                  name: "date-to-string",
                  isOpen: function () {
                    return Wl(this, void 0, void 0, function () {
                      return Wg(this, function (Wq) {
                        return (WT = 0), Object(WD.b)(Wo), Object(WD.a)(), [2, 2 === WT];
                      });
                    });
                  },
                  isEnable: function () {
                    return Wl(this, void 0, void 0, function () {
                      return Wg(this, function (Wq) {
                        return [
                          2,
                          Object(We.b)({
                            includes: [Wf.a],
                            excludes: [(Wu.isIpad || Wu.isIphone) && Wf.a]
                          })
                        ];
                      });
                    });
                  }
                });
          },
          function (W8, W9, WW) {
            "use strict";
            WW.d(W9, "a", function () {
              return WT;
            });
            var Wf = WW(1),
              WD = WW(2),
              We = WW(0),
              Wu =
                (this && this["__awaiter"]) ||
                function (WC, Wq, WE, WP) {
                  return new (WE = WE || Promise)(function (Wk, WM) {
                    function WG(WF) {
                      try {
                        WS(WP.next(WF));
                      } catch (WH) {
                        WM(WH);
                      }
                    }

                    function Ww(WF) {
                      try {
                        WS(WP.throw(WF));
                      } catch (WH) {
                        WM(WH);
                      }
                    }

                    function WS(WF) {
                      var WH;
                      WF.done
                        ? Wk(WF.value)
                        : ((WH = WF.value) instanceof WE
                            ? WH
                            : new WE(function (WV) {
                                WV(WH);
                              })
                          ).then(WG, Ww);
                    }

                    WS((WP = WP.apply(WC, Wq || [])).next());
                  });
                },
              Wl =
                (this && this["__generator"]) ||
                function (WC, Wq) {
                  var WE,
                    WP,
                    Wk,
                    WM = {
                      label: 0,
                      sent: function () {
                        if (1 & Wk[0]) {
                          throw Wk[1];
                        }
                        return Wk[1];
                      },
                      trys: [],
                      ops: []
                    },
                    WG = {
                      next: Ww(0),
                      throw: Ww(1),
                      return: Ww(2)
                    };
                  return (
                    "function" == typeof Symbol &&
                      (WG[Symbol.iterator] = function () {
                        return this;
                      }),
                    WG
                  );

                  function Ww(WS) {
                    return function (WF) {
                      var WH = [WS, WF];
                      if (WE) {
                        throw new TypeError("Generator is already executing.");
                      }
                      for (; WM; ) {
                        try {
                          if (
                            ((WE = 1),
                            WP &&
                              (Wk = 2 & WH[0] ? WP.return : WH[0] ? WP.throw || ((Wk = WP.return) && Wk.call(WP), 0) : WP.next) &&
                              !(Wk = Wk.call(WP, WH[1])).done)
                          ) {
                            return Wk;
                          }
                          switch (((WP = 0), (WH = Wk ? [2 & WH[0], Wk.value] : WH)[0])) {
                            case 0:
                            case 1:
                              Wk = WH;
                              break;
                            case 4:
                              return (
                                WM.label++,
                                {
                                  value: WH[1],
                                  done: false
                                }
                              );
                            case 5:
                              WM.label++, (WP = WH[1]), (WH = [0]);
                              continue;
                            case 7:
                              (WH = WM.ops.pop()), WM.trys.pop();
                              continue;
                            default:
                              if (!(Wk = 0 < (Wk = WM.trys).length && Wk[Wk.length - 1]) && (6 === WH[0] || 2 === WH[0])) {
                                WM = 0;
                                continue;
                              }
                              if (3 === WH[0] && (!Wk || (WH[1] > Wk[0] && WH[1] < Wk[3]))) {
                                WM.label = WH[1];
                              } else {
                                if (6 === WH[0] && WM.label < Wk[1]) {
                                  WM.label = Wk[1];
                                  Wk = WH;
                                } else {
                                  if (!(Wk && WM.label < Wk[2])) {
                                    Wk[2] && WM.ops.pop();
                                    WM.trys.pop();
                                    continue;
                                  }
                                  WM.label = Wk[2];
                                  WM.ops.push(WH);
                                }
                              }
                          }
                          WH = Wq.call(WC, WM);
                        } catch (WV) {
                          WH = [6, WV];
                          WP = 0;
                        } finally {
                          WE = Wk = 0;
                        }
                      }
                      if (5 & WH[0]) {
                        throw WH[1];
                      }
                      return {
                        value: WH[0] ? WH[1] : void 0,
                        done: true
                      };
                    };
                  }
                },
              Wg = null,
              Wo = 0,
              WT = {
                name: "performance",
                isOpen: function () {
                  return Wu(this, void 0, void 0, function () {
                    var WC, Wq;
                    return Wl(this, function (WE) {
                      return (
                        null === Wg &&
                          (Wg = (function () {
                            for (
                              var Wk = (function () {
                                  for (var Ww = {}, WS = 0; WS < 500; WS++) {
                                    Ww["".concat(WS)] = "".concat(WS);
                                  }
                                  return Ww;
                                })(),
                                WM = [],
                                WG = 0;
                              WG < 50;
                              WG++
                            ) {
                              WM.push(Wk);
                            }
                            return WM;
                          })()),
                        (WP = Object(We.c)()),
                        Object(WD.c)(Wg),
                        (WC = Object(We.c)() - WP),
                        (WP = Object(We.c)()),
                        Object(WD.b)(Wg),
                        (Wq = Object(We.c)() - WP),
                        (Wo = Math.max(Wo, Wq)),
                        Object(WD.a)(),
                        0 == WC || 0 === Wo ? [2, false] : [2, 10 * Wo < WC]
                      );
                      var WP;
                    });
                  });
                },
                isEnable: function () {
                  return Wu(this, void 0, void 0, function () {
                    return Wl(this, function (WC) {
                      return [
                        2,
                        Object(We.b)({
                          includes: [Wf.a],
                          excludes: []
                        })
                      ];
                    });
                  });
                }
              };
          },
          function (W8, W9, WW) {
            "use strict";
            WW.d(W9, "a", function () {
              return We;
            });
            var Wf =
                (this && this["__awaiter"]) ||
                function (Wu, Wl, Wg, Wo) {
                  return new (Wg = Wg || Promise)(function (WT, WC) {
                    function Wq(Wk) {
                      try {
                        WP(Wo.next(Wk));
                      } catch (WM) {
                        WC(WM);
                      }
                    }

                    function WE(Wk) {
                      try {
                        WP(Wo.throw(Wk));
                      } catch (WM) {
                        WC(WM);
                      }
                    }

                    function WP(Wk) {
                      var WM;
                      Wk.done
                        ? WT(Wk.value)
                        : ((WM = Wk.value) instanceof Wg
                            ? WM
                            : new Wg(function (WG) {
                                WG(WM);
                              })
                          ).then(Wq, WE);
                    }

                    WP((Wo = Wo.apply(Wu, Wl || [])).next());
                  });
                },
              WD =
                (this && this["__generator"]) ||
                function (Wu, Wl) {
                  var Wg,
                    Wo,
                    WT,
                    WC = {
                      label: 0,
                      sent: function () {
                        if (1 & WT[0]) {
                          throw WT[1];
                        }
                        return WT[1];
                      },
                      trys: [],
                      ops: []
                    },
                    Wq = {
                      next: WE(0),
                      throw: WE(1),
                      return: WE(2)
                    };
                  return (
                    "function" == typeof Symbol &&
                      (Wq[Symbol.iterator] = function () {
                        return this;
                      }),
                    Wq
                  );

                  function WE(WP) {
                    return function (Wk) {
                      var WM = [WP, Wk];
                      if (Wg) {
                        throw new TypeError("Generator is already executing.");
                      }
                      for (; WC; ) {
                        try {
                          if (
                            ((Wg = 1),
                            Wo &&
                              (WT = 2 & WM[0] ? Wo.return : WM[0] ? Wo.throw || ((WT = Wo.return) && WT.call(Wo), 0) : Wo.next) &&
                              !(WT = WT.call(Wo, WM[1])).done)
                          ) {
                            return WT;
                          }
                          switch (((Wo = 0), (WM = WT ? [2 & WM[0], WT.value] : WM)[0])) {
                            case 0:
                            case 1:
                              WT = WM;
                              break;
                            case 4:
                              return (
                                WC.label++,
                                {
                                  value: WM[1],
                                  done: false
                                }
                              );
                            case 5:
                              WC.label++, (Wo = WM[1]), (WM = [0]);
                              continue;
                            case 7:
                              (WM = WC.ops.pop()), WC.trys.pop();
                              continue;
                            default:
                              if (!(WT = 0 < (WT = WC.trys).length && WT[WT.length - 1]) && (6 === WM[0] || 2 === WM[0])) {
                                WC = 0;
                                continue;
                              }
                              if (3 === WM[0] && (!WT || (WM[1] > WT[0] && WM[1] < WT[3]))) {
                                WC.label = WM[1];
                              } else {
                                if (6 === WM[0] && WC.label < WT[1]) {
                                  WC.label = WT[1];
                                  WT = WM;
                                } else {
                                  if (!(WT && WC.label < WT[2])) {
                                    WT[2] && WC.ops.pop();
                                    WC.trys.pop();
                                    continue;
                                  }
                                  WC.label = WT[2];
                                  WC.ops.push(WM);
                                }
                              }
                          }
                          WM = Wl.call(Wu, WC);
                        } catch (WG) {
                          WM = [6, WG];
                          Wo = 0;
                        } finally {
                          Wg = WT = 0;
                        }
                      }
                      if (5 & WM[0]) {
                        throw WM[1];
                      }
                      return {
                        value: WM[0] ? WM[1] : void 0,
                        done: true
                      };
                    };
                  }
                },
              We = {
                name: "eruda",
                isOpen: function () {
                  var Wu;
                  return Wf(this, void 0, void 0, function () {
                    return WD(this, function (Wl) {
                      return "undefined" != typeof eruda
                        ? [2, true === (null == (Wu = null === eruda || void 0 === eruda ? void 0 : eruda["_devTools"]) ? void 0 : Wu["_isShow"])]
                        : [2, false];
                    });
                  });
                },
                isEnable: function () {
                  return Wf(this, void 0, void 0, function () {
                    return WD(this, function (Wu) {
                      return [2, true];
                    });
                  });
                }
              };
          },
          function (W8, W9, WW) {
            "use strict";
            WW.d(W9, "a", function () {
              return Wf;
            });
            var W9 = WW(3),
              Wf = /mobile/i.test(W9.b);
          }
        ]),
        (W7 = {}),
        (W5.m = W6),
        (W5.c = W7),
        (W5.d = function (W8, W9, WW) {
          W5.o(W8, W9) ||
            Object.defineProperty(W8, W9, {
              configurable: false,
              enumerable: true,
              get: WW
            });
        }),
        (W5.n = function (W8) {
          var W9 =
            W8 && W8["__esModule"]
              ? function () {
                  return W8.default;
                }
              : function () {
                  return W8;
                };
          return W5.d(W9, "a", W9), W9;
        }),
        (W5.o = function (W8, W9) {
          return Object.prototype.hasOwnProperty.call(W8, W9);
        }),
        (W5.p = ""),
        W5((W5.s = 4))
      );

      function W5(W8) {
        var W9;
        return (
          W7[W8] ||
          ((W9 = W7[W8] =
            {
              i: W8,
              l: false,
              exports: {}
            }),
          W6[W8].call(W9.exports, W9, W9.exports, W5),
          (W9.l = true),
          W9)
        ).exports;
      }

      var W6, W7;
    }),
    jwplayer("megacloud-player")),
  g = [],
  o = [],
  T = [],
  C = false,
  q = [],
  E = Boolean(parseInt(settings.autoPlay)),
  P = Boolean(parseInt(settings.playOriginalAudio)),
  k = Boolean(parseInt(settings.vast)),
  M = $("#megacloud-player").data("id"),
  G = $("#megacloud-player").data("realid"),
  w = parseInt(settings.time),
  S = { channel: "megacloud" },
  F,
  H;
const V = "/embed-2/ajax/e-1/getSources?id=" + M,
  r = "sources",
  b = "tracks",
  X = "playbackRateControls",
  t = "mute",
  A = "cast",
  n = "autostart",
  s = (W5) => {
    var W6 = "fgY6enN:lw1yguR".replace("N:lw1", "4FsBZXc");
    return j(W5, W6);
  };

function Y(W5 = 0) {
  $.get("" + V, (W6) => {
    var W7;
    W6 && ((W7 = W6[r]), (o = J(W7) ? W7 : s(W7)), (g = 0 < o.length ? o : T), (q = W6[b]), (F = W6.intro || null), (H = W6.outro || null), y());
  });
}

var h = null,
  K = 0,
  m = 0,
  N = 0;
const x = () => {
  var W5 = { logo: {} };
  return (W5[X] = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2]), (W5[n] = E), (W5[r] = g), (W5[t] = false), (W5[A] = {}), (W5[b] = q), W5;
};

function I() {
  "undefined" != typeof octopusInstance && octopusInstance && octopusInstance.freeTrack();
}

function c() {
  var W5,
    W6 = l.getCurrentCaptions(),
    W6 = q[W6 - 1];
  const W7 = W6 ? W6.file : null;
  W7 && "ass" === W7.split(".").pop()
    ? "undefined" != typeof octopusInstance && octopusInstance
      ? octopusInstance.setTrackByUrl(W7)
      : ((W5 = document.querySelector("#megacloud-player .jw-video")),
        (window.SubtitlesOctopusOnLoad = function () {
          var W8 = {
            video: W5,
            subUrl: W7,
            fonts: ["/js/octopus/Arial.ttf", "/js/octopus/TimesNewRoman.ttf"],
            workerUrl: "/js/octopus/subtitles-octopus-worker.js",
            renderMode: "js-blend"
          };
          window.octopusInstance = new SubtitlesOctopus(W8);
        }),
        SubtitlesOctopus && SubtitlesOctopusOnLoad())
    : I();
}

function y() {
  var W5 = x();
  k &&
    (W5.advertising = {
      client: "vast",
      schedule: [
        {
          tag: "https://services.vlitag.com/vpaid/?q=1ba9c35e4570ec49cfc2da2c2116ac79&vast_slot=vi_2284298620&defaultVolume=&page_url=https://rapid-cloud.co"
        }
      ]
    });
  l.setup(W5);
  l.on("ready", function () {
    $(".jw-icon-rewind").remove();
    l.addButton("/images/skip-10-next.svg?v=0.1", "+10s", Q, "forward-10s-button");
    l.addButton("/images/skip-10-prev.svg?v=0.1", "-10s", a, "rewind-10s-button");
    $("#megacloud-player").prepend('<div id="overlay-control"></div>');
    F &&
      $("#overlay-control").prepend(
        '<div class="botright"><a style="display: none;" href="javascript:;" id="skip-intro" class="zbtn zbtn-outline">Skip Intro</a></div>'
      );
    H &&
      $("#overlay-control").prepend(
        '<div class="botright"><a style="display: none;" href="javascript:;" id="skip-outro" class="zbtn zbtn-outline">Skip Outro</a></div>'
      );
  });
  l.on("pause", function () {});
  l.on("captionsChanged", function (W6) {});
  l.on("firstFrame", function () {
    var W6 = 0,
      W7 = 0,
      W8 = l.getDuration();
    F &&
      0 === $(".jw-intro").length &&
      ((W7 = (F.start / W8) * 100),
      (W6 = ((F.end - F.start) / W8) * 100),
      $(".jw-slider-container").append('<div class="jw-reset jw-intro" style="margin-left: ' + W7 + "%; width: " + W6 + '%"></div>'));
    H &&
      0 === $(".jw-outro").length &&
      ((H.end = H.end > W8 ? W8 : H.end),
      (W6 = (H.start / W8) * 100 - W6 - W7),
      (W7 = ((H.end - H.start) / W8) * 100),
      $(".jw-slider-container").append('<div class="jw-reset jw-outro" style="margin-left: ' + W6 + "%; width: " + W7 + '%"></div>'));
    G && ((W8 = W2("vc_" + G + "_time")), 0 < w ? l.seek(w) : W8 && l.seek(W8));
  });
  l.on("play", function () {});
  l.on("buffer", function (W6) {});
  l.on("time", function (W6) {
    h && clearInterval(h);
    v(W6.position);
    G && W3("vc_" + G + "_time", l.getPosition());
    S.event = "time";
    S.time = l.getPosition();
    S.duration = l.getDuration();
    S.percent = (l.getPosition() / l.getDuration()) * 100;
    window.parent.postMessage(JSON.stringify(S), "*");
  });
  l.on("complete", function () {
    w = 0;
    W4("vc_" + G + "_time");
    S.event = "complete";
    window.parent.postMessage(JSON.stringify(S), "*");
  });
  l.on("error", function () {
    i();
  });
  l.on("setupError", function () {});
}

function i() {
  0 < T.length && !C
    ? (h && clearInterval(h), (g = T), (E = C = true), y())
    : ((S.event = "error"), window.parent.postMessage(JSON.stringify(S), "*"));
}

var U = window.addEventListener ? "addEventListener" : "attachEvent",
  L = window[U],
  d = "attachEvent" === U ? "onmessage" : "message";

function v(W5) {
  W5 >= F.start && W5 < F.end ? (1 === parseInt(settings.autoSkipIntro) ? O() : $("#skip-intro").show()) : $("#skip-intro").hide();
  W5 >= H.start && W5 < H.end ? (1 === parseInt(settings.autoSkipIntro) ? z() : $("#skip-outro").show()) : $("#skip-outro").hide();
}

function O() {
  l.seek(F.end);
  $("#skip-intro").hide();
}

function z() {
  l.seek(H.end);
  $("#skip-outro").hide();
}

function B() {}

L(d, function (W5) {
  var W6 = W5.data || W5.message;
  try {
    "seek" === (W6 = JSON.parse(W6)).event && l.seek(W6.time);
  } catch (W7) {}
});
$(document).on("click", "#skip-intro", function () {
  O();
});
$(document).on("click", "#skip-outro", function () {
  z();
});
$("#next-episode").click(function () {});
navigator.brave ? ($(".error-content").show(), $("#loading").hide()) : Y();
var Z = new MobileDetect(window.navigator.userAgent);
Z.match("playstation|xbox") ||
  null !== Z.mobile() ||
  (devtoolsDetector.addListener(function (W5) {
    W5 && (window.location.reload(), window.parent.location.reload());
  }),
  devtoolsDetector.launch());
navigator.webdriver && (window.location.href = "https://google.com");
const j = (W5, W6) => {
    try {
      var W7 = CryptoJS.AES.decrypt(W5, W6);
      return JSON.parse(W7.toString(CryptoJS.enc.Utf8));
    } catch (W8) {
      console.log(W8.message);
    }
    return [];
  },
  J = (W5) => Array.isArray(W5),
  R = (...W5) => W5.join(""),
  p = (...W5) => W5.reverse().join(""),
  a = () => {
    10 < l.getPosition() ? l.seek(l.getPosition() - 10) : l.seek(0);
  },
  Q = () => {
    l.getPosition() < l.getDuration() && l.seek(l.getPosition() + 10);
  },
  W0 = () => {
    window.open("/embed-2/download/" + M, "_blank");
  },
  W1 = () => {
    window.open("/embed-1/download/" + M, "_blank");
  },
  W2 = (W5) => ("undefined" != typeof Storage && localStorage.getItem(W5) ? localStorage.getItem(W5) : null),
  W3 = (W5, W6) => {
    "undefined" != typeof Storage && localStorage.setItem(W5, W6);
  },
  W4 = (W5) => {
    "undefined" != typeof Storage && localStorage.removeItem(W5);
  };
