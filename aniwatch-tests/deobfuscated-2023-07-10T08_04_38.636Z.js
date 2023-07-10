!function (O5, O6) {
  'use strict';
  ;
  ;
  'object' == typeof module && 'object' == typeof module.exports ? module.exports = O5.document ? O6(O5, true) : function (O7) {
    if (O7.document) {
      return O6(O7);
    }
    ;
    throw new Error('jQuery requires a window with a document');
  } : O6(O5);
}('undefined' != typeof window ? window : this, function (O5, O6) {
  'use strict';
  function O7(rH) {
    ;
    ;
    return 'function' == typeof rH && 'number' != typeof rH.nodeType;
  }
  function O8(rH) {
    ;
    return null != rH && rH === rH.window;
  }
  var O9 = [], OO = O5.document, OC = Object.getPrototypeOf, Or = O9.slice, OA = O9.concat, Oj = O9.push, OI = O9.indexOf, OR = {}, Oi = OR.toString, Oq = OR.hasOwnProperty, OX = Oq.toString, Ol = OX.call(Object), Oz = {
    checkClone: Cn.cloneNode(true).cloneNode(true).lastChild.checked,
    noCloneChecked: !!Cn.cloneNode(true).lastChild.defaultValue,
    checkOn: '' !== Cu.value,
    optSelected: Cn.selected,
    radioValue: 't' === Cu.value
  };
  function Od(rH, rh, rZ) {
    ;
    var rT, rs = (rh = rh || OO).createElement('script');
    if (rs.text = rH, rZ) {
      for (rT in OU)
        rZ[rT] && (rs[rT] = rZ[rT]);
    }
    ;
    ;
    rh.head.appendChild(rs).parentNode.removeChild(rs);
  }
  function Og(rH) {
    ;
    ;
    return null == rH ? rH + '' : 'object' == typeof rH || 'function' == typeof rH ? OR[Oi.call(rH)] || 'object' : typeof rH;
  }
  var OE = function (rH, rh) {
    ;
    return new OE.fn.init(rH, rh);
  };
  function Ob(rH) {
    ;
    var rh = !!rH && 'length' in rH && rH.length, rZ = Og(rH);
    ;
    return !O7(rH) && !O8(rH) && ('array' === rZ || 0 === rh || 'number' == typeof rh && 0 < rh && rh - 1 in rH);
  }
  OE.fn = OE.prototype = {
    'jquery': '3.3.1',
    'constructor': OE,
    'length': 0,
    'toArray': function () {
      ;
      return Or.call(this);
    },
    'get': function (rH) {
      ;
      ;
      return null == rH ? Or.call(this) : rH < 0 ? this[rH + this.length] : this[rH];
    },
    'pushStack': function (rH) {
      ;
      ;
      return rH = OE.merge(this.constructor(), rH), (rH.prevObject = this, rH);
    },
    'each': function (rH) {
      return OE.each(this, rH);
    },
    'map': function (rH) {
      ;
      return this.pushStack(OE.map(this, function (rh, rZ) {
        return rH.call(rh, rZ, rh);
      }));
    },
    'slice': function () {
      ;
      ;
      return this.pushStack(Or.apply(this, arguments));
    },
    'first': function () {
      return this.eq(0);
    },
    'last': function () {
      return this.eq(-1);
    },
    'eq': function (rH) {
      ;
      ;
      var rh = this.length, rH = +rH + (rH < 0 ? rh : 0);
      return this.pushStack(0 <= rH && rH < rh ? [this[rH]] : []);
    },
    'end': function () {
      ;
      return this.prevObject || this.constructor();
    },
    'push': Oj,
    'sort': O9.sort,
    'splice': O9.splice
  };
  OE.extend = OE.fn.extend = function () {
    ;
    ;
    var rH, rh, rZ, rT, rs, rp = arguments[0] || {}, rQ = 1, rJ = arguments.length, rK = false;
    for ('boolean' == typeof rp && (rK = rp, rp = arguments[rQ] || {}, rQ++), 'object' == typeof rp || O7(rp) || (rp = {}), rQ === rJ && (rp = this, rQ--); rQ < rJ; rQ++) {
      if (null != (rH = arguments[rQ])) {
        for (rh in rH)
          rs = rp[rh], rp !== (rZ = rH[rh]) && (rK && rZ && (OE.isPlainObject(rZ) || (rT = Array.isArray(rZ))) ? (rs = rT ? (rT = false, rs && Array.isArray(rs) ? rs : []) : rs && OE.isPlainObject(rs) ? rs : {}, rp[rh] = OE.extend(rK, rs, rZ)) : void 0 !== rZ && (rp[rh] = rZ));
      }
    }
    return rp;
  };
  OE.extend({
    'expando': 'jQuery' + ('3.3.1' + Math.random()).replace(/\D/g, ''),
    'isReady': true,
    'error': function (rH) {
      throw new Error(rH);
    },
    'noop': function () {
    },
    'isPlainObject': function (rH) {
      ;
      ;
      ;
      return !(!rH || '[object Object]' !== Oi.call(rH) || (rH = OC(rH)) && ('function' != typeof (rH = Oq.call(rH, 'constructor') && rH.constructor) || OX.call(rH) !== Ol));
    },
    'isEmptyObject': function (rH) {
      for (var rh in rH)
        return false;
      return true;
    },
    'globalEval': function (rH) {
      Od(rH);
    },
    'each': function (rH, rh) {
      var rZ, rT = 0;
      ;
      ;
      if (Ob(rH)) {
        for (rZ = rH.length; rT < rZ && false !== rh.call(rH[rT], rT, rH[rT]); rT++) {
          ;
        }
      } else {
        for (rT in rH)
          if (false === rh.call(rH[rT], rT, rH[rT])) {
            break;
          }
      }
      return rH;
    },
    'trim': function (rH) {
      ;
      return null == rH ? '' : (rH + '').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    },
    'makeArray': function (rH, rh) {
      ;
      ;
      return rh = rh || [], (null != rH && (Ob(Object(rH)) ? OE.merge(rh, 'string' == typeof rH ? [rH] : rH) : Oj.call(rh, rH)), rh);
    },
    'inArray': function (rH, rh, rZ) {
      ;
      return null == rh ? -1 : OI.call(rh, rH, rZ);
    },
    'merge': function (rH, rh) {
      for (var rZ = +rh.length, rT = 0, rs = rH.length; rT < rZ; rT++) {
        rH[rs++] = rh[rT];
      }
      ;
      ;
      return rH.length = rs, rH;
    },
    'grep': function (rH, rh, rZ) {
      ;
      for (var rT = [], rs = 0, rp = rH.length, rQ = !rZ; rs < rp; rs++) {
        !rh(rH[rs], rs) != rQ && rT.push(rH[rs]);
      }
      ;
      return rT;
    },
    'map': function (rH, rh, rZ) {
      var rT, rs, rp = 0, rQ = [];
      ;
      if (Ob(rH)) {
        for (rT = rH.length; rp < rT; rp++) {
          null != (rs = rh(rH[rp], rp, rZ)) && rQ.push(rs);
        }
      } else {
        for (rp in rH)
          null != (rs = rh(rH[rp], rp, rZ)) && rQ.push(rs);
      }
      return OA.apply([], rQ);
    },
    'guid': 1,
    'support': Oz
  });
  'function' == typeof Symbol && (OE.fn[Symbol.iterator] = O9[Symbol.iterator]);
  OE.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function (rH, rh) {
    ;
    ;
    OR['[object ' + rh + ']'] = rh.toLowerCase();
  });
  function OF(rH, rh, rZ) {
    for (var rT = [], rs = void 0 !== rZ; (rH = rH[rh]) && 9 !== rH.nodeType;) {
      if (1 === rH.nodeType) {
        if (rs && OE(rH).is(rZ)) {
          break;
        }
        rT.push(rH);
      }
    }
    ;
    ;
    return rT;
  }
  function OP(rH, rh) {
    ;
    ;
    ;
    for (var rZ = []; rH; rH = rH.nextSibling) {
      1 === rH.nodeType && rH !== rh && rZ.push(rH);
    }
    return rZ;
  }
  var O9 = function (rH) {
    function rh(Au, An, j0) {
      ;
      var j1 = '0x' + An - 65536;
      return j1 != j1 || j0 ? An : j1 < 0 ? String.fromCharCode(65536 + j1) : String.fromCharCode(j1 >> 10 | 55296, 1023 & j1 | 56320);
    }
    function rZ(Au, An) {
      ;
      return An ? '\0' === Au ? '\uFFFD' : Au.slice(0, -1) + '\\' + Au.charCodeAt(Au.length - 1).toString(16) + ' ' : '\\' + Au;
    }
    function rT() {
      ru();
    }
    var rs, rp, rQ, rJ, rK, rL, rS, rx, ra, rk, rw, ru, rn, A0, A1, A2, A3, A4, A5, A6 = 'sizzle' + +new Date(), A7 = rH.document, A8 = 0, A9 = 0, AO = AH(), AC = AH(), Ar = AH(), AA = function (Au, An) {
      return Au === An && (rw = true), 0;
    }, Aj = {}.hasOwnProperty, AI = [], AR = AI.pop, Ai = AI.push, Aq = AI.push, AX = AI.slice, Al = function (Au, An) {
      for (var j0 = 0, j1 = Au.length; j0 < j1; j0++) {
        if (Au[j0] === An) {
          return j0;
        }
      }
      return -1;
    }, Az = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped', AU = '[\\x20\\t\\r\\n\\f]', Ag = '\\[' + AU + '*(' + '(?:\\\\.|[\\w-]|[^\0-\\xa0])+' + ')(?:' + AU + '*([*^$|!~]?=)' + AU + '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + '(?:\\\\.|[\\w-]|[^\0-\\xa0])+' + '))|)' + AU + '*\\]', AE = ':((?:\\\\.|[\\w-]|[^\0-\\xa0])+)(?:\\(((\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|' + Ag + ')*)|.*)\\)|)', Av = new RegExp(AU + '+', 'g'), Ab = new RegExp('^' + AU + '+|((?:^|[^\\\\])(?:\\\\.)*)' + AU + '+$', 'g'), AF = new RegExp('^' + AU + '*,' + AU + '*'), AP = new RegExp('^' + AU + '*([>+~]|' + AU + ')' + AU + '*'), Ac = new RegExp('=' + AU + '*([^\\]\'"]*?)' + AU + '*\\]', 'g'), AY = new RegExp(AE), AM = new RegExp('^(?:\\\\.|[\\w-]|[^\0-\\xa0])+$'), AG = {
      'ID': new RegExp('^#((?:\\\\.|[\\w-]|[^\0-\\xa0])+)'),
      'CLASS': new RegExp('^\\.((?:\\\\.|[\\w-]|[^\0-\\xa0])+)'),
      'TAG': new RegExp('^((?:\\\\.|[\\w-]|[^\0-\\xa0])+|[*])'),
      'ATTR': new RegExp('^' + Ag),
      'PSEUDO': new RegExp('^' + AE),
      'CHILD': new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + AU + '*(even|odd|(([+-]|)(\\d*)n|)' + AU + '*(?:([+-]|)' + AU + '*(\\d+)|))' + AU + '*\\)|)', 'i'),
      'bool': new RegExp('^(?:' + Az + ')$', 'i'),
      'needsContext': new RegExp('^' + AU + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + AU + '*((?:-\\d)?\\d*)' + AU + '*\\)|)(?=[^-]|$)', 'i')
    }, AW = new RegExp('\\\\([\\da-f]{1,6}' + AU + '?|(' + AU + ')|.)', 'ig'), Ay = AS(function (Au) {
      ;
      return true === Au.disabled && ('form' in Au || 'label' in Au);
    }, {
      'dir': 'parentNode',
      'next': 'legend'
    });
    ;
    try {
      Aq.apply(AI = AX.call(A7.childNodes), A7.childNodes);
      AI[A7.childNodes.length].nodeType;
    } catch (Au) {
      Aq = {
        'apply': AI.length ? function (An, j0) {
          ;
          Ai.apply(An, AX.call(j0));
        } : function (An, j0) {
          ;
          for (var j1 = An.length, j2 = 0; An[j1++] = j0[j2++];) {
            ;
          }
          An.length = j1 - 1;
        }
      };
    }
    function AV(An, j0, j1, j2) {
      ;
      ;
      var j3, j4, j5, j6, j7, j8, j9, jO = j0 && j0.ownerDocument, jC = j0 ? j0.nodeType : 9;
      if (j1 = j1 || [], 'string' != typeof An || !An || 1 !== jC && 9 !== jC && 11 !== jC) {
        return j1;
      }
      ;
      if (!j2 && ((j0 ? j0.ownerDocument || j0 : A7) !== rn && ru(j0), j0 = j0 || rn, A1)) {
        if (11 !== jC && (j7 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/.exec(An))) {
          if (j3 = j7[1]) {
            if (9 === jC) {
              if (!(j5 = j0.getElementById(j3))) {
                return j1;
              }
              if (j5.id === j3) {
                return j1.push(j5), j1;
              }
            } else {
              if (jO && (j5 = jO.getElementById(j3)) && A5(j0, j5) && j5.id === j3) {
                return j1.push(j5), j1;
              }
            }
          } else {
            if (j7[2]) {
              return Aq.apply(j1, j0.getElementsByTagName(An)), j1;
            }
            if ((j3 = j7[3]) && rp.getElementsByClassName && j0.getElementsByClassName) {
              return Aq.apply(j1, j0.getElementsByClassName(j3)), j1;
            }
          }
        }
        if (rp.qsa && !Ar[An + ' '] && (!A2 || !A2.test(An))) {
          if (1 !== jC) {
            jO = j0;
            j9 = An;
          } else {
            if ('object' !== j0.nodeName.toLowerCase()) {
              for ((j6 = j0.getAttribute('id')) ? j6 = j6.replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, rZ) : j0.setAttribute('id', j6 = A6), j4 = (j8 = rL(An)).length; j4--;) {
                j8[j4] = '#' + j6 + ' ' + AL(j8[j4]);
              }
              j9 = j8.join(',');
              jO = /[+~]/.test(An) && AJ(j0.parentNode) || j0;
            }
          }
          if (j9) {
            try {
              return Aq.apply(j1, jO.querySelectorAll(j9)), j1;
            } catch (jr) {
            } finally {
              j6 === A6 && j0.removeAttribute('id');
            }
          }
        }
      }
      return rx(An.replace(Ab, '$1'), j0, j1, j2);
    }
    function AH() {
      var An = [];
      function j0(j1, j2) {
        ;
        return An.push(j1 + ' ') > rQ.cacheLength && delete j0[An.shift()], j0[j1 + ' '] = j2;
      }
      return j0;
    }
    function Ah(An) {
      return An[A6] = true, An;
    }
    function AZ(An) {
      ;
      ;
      ;
      var j0 = rn.createElement('fieldset');
      try {
        return !!An(j0);
      } catch (j1) {
        return false;
      } finally {
        j0.parentNode && j0.parentNode.removeChild(j0);
      }
    }
    ;
    function AT(An, j0) {
      ;
      ;
      ;
      for (var j1 = An.split('|'), j2 = j1.length; j2--;) {
        rQ.attrHandle[j1[j2]] = j0;
      }
    }
    function As(An, j0) {
      ;
      ;
      var j1 = j0 && An, j2 = j1 && 1 === An.nodeType && 1 === j0.nodeType && An.sourceIndex - j0.sourceIndex;
      if (j2) {
        return j2;
      }
      if (j1) {
        for (; j1 = j1.nextSibling;) {
          if (j1 === j0) {
            return -1;
          }
        }
      }
      ;
      return An ? 1 : -1;
    }
    function Ap(An) {
      return function (j0) {
        ;
        ;
        ;
        return 'form' in j0 ? j0.parentNode && false === j0.disabled ? 'label' in j0 ? 'label' in j0.parentNode ? j0.parentNode.disabled === An : j0.disabled === An : j0.isDisabled === An || j0.isDisabled !== !An && Ay(j0) === An : j0.disabled === An : 'label' in j0 && j0.disabled === An;
      };
    }
    function AQ(An) {
      return Ah(function (j0) {
        return j0 = +j0, Ah(function (j1, j2) {
          ;
          ;
          for (var j3, j4 = An([], j1.length, j0), j5 = j4.length; j5--;) {
            j1[j3 = j4[j5]] && (j1[j3] = !(j2[j3] = j1[j3]));
          }
        });
      });
    }
    function AJ(An) {
      ;
      return An && void 0 !== An.getElementsByTagName && An;
    }
    for (rs in (rp = AV.support = {}, rK = AV.isXML = function (An) {
      ;
      An = An && (An.ownerDocument || An).documentElement;
      ;
      return !!An && 'HTML' !== An.nodeName;
    }, ru = AV.setDocument = function (An) {
      var An = An ? An.ownerDocument || An : A7;
      ;
      ;
      ;
      return An !== rn && 9 === An.nodeType && An.documentElement && (A0 = (rn = An).documentElement, A1 = !rK(rn), A7 !== rn && (An = rn.defaultView) && An.top !== An && (An.addEventListener ? An.addEventListener('unload', rT, false) : An.attachEvent && An.attachEvent('onunload', rT)), rp.attributes = AZ(function (j0) {
        ;
        ;
        return j0.className = 'i', !j0.getAttribute('className');
      }), rp.getElementsByTagName = AZ(function (j0) {
        ;
        ;
        ;
        return j0.appendChild(rn.createComment('')), !j0.getElementsByTagName('*').length;
      }), rp.getElementsByClassName = /^[^{]+\{\s*\[native \w/.test(rn.getElementsByClassName), rp.getById = AZ(function (j0) {
        ;
        ;
        return A0.appendChild(j0).id = A6, !rn.getElementsByName || !rn.getElementsByName(A6).length;
      }), rp.getById ? (rQ.filter.ID = function (j0) {
        var j1 = j0.replace(AW, rh);
        ;
        return function (j2) {
          ;
          return j2.getAttribute('id') === j1;
        };
      }, rQ.find.ID = function (j0, j1) {
        if (void 0 !== j1.getElementById && A1) {
          return (j1 = j1.getElementById(j0)) ? [j1] : [];
        }
      }) : (rQ.filter.ID = function (j0) {
        ;
        var j1 = j0.replace(AW, rh);
        return function (j2) {
          j2 = void 0 !== j2.getAttributeNode && j2.getAttributeNode('id');
          ;
          ;
          return j2 && j2.value === j1;
        };
      }, rQ.find.ID = function (j0, j1) {
        ;
        ;
        if (void 0 !== j1.getElementById && A1) {
          var j2, j3, j4, j5 = j1.getElementById(j0);
          if (j5) {
            if ((j2 = j5.getAttributeNode('id')) && j2.value === j0) {
              return [j5];
            }
            for (j4 = j1.getElementsByName(j0), j3 = 0; j5 = j4[j3++];) {
              if ((j2 = j5.getAttributeNode('id')) && j2.value === j0) {
                return [j5];
              }
            }
          }
          return [];
        }
      }), rQ.find.TAG = rp.getElementsByTagName ? function (j0, j1) {
        ;
        ;
        return void 0 !== j1.getElementsByTagName ? j1.getElementsByTagName(j0) : rp.qsa ? j1.querySelectorAll(j0) : void 0;
      } : function (j0, j1) {
        var j2, j3 = [], j4 = 0, j5 = j1.getElementsByTagName(j0);
        ;
        ;
        if ('*' !== j0) {
          return j5;
        }
        for (; j2 = j5[j4++];) {
          1 === j2.nodeType && j3.push(j2);
        }
        return j3;
      }, rQ.find.CLASS = rp.getElementsByClassName && function (j0, j1) {
        ;
        ;
        if (void 0 !== j1.getElementsByClassName && A1) {
          return j1.getElementsByClassName(j0);
        }
      }, A3 = [], A2 = [], (rp.qsa = /^[^{]+\{\s*\[native \w/.test(rn.querySelectorAll)) && (AZ(function (j0) {
        ;
        ;
        ;
        A0.appendChild(j0).innerHTML = '<a id=\'' + A6 + '\'></a><select id=\'' + A6 + '-\r\\\' msallowcapture=\'\'><option selected=\'\'></option></select>';
        j0.querySelectorAll('[msallowcapture^=\'\']').length && A2.push('[*^$]=' + AU + '*(?:\'\'|"")');
        j0.querySelectorAll('[selected]').length || A2.push('\\[' + AU + '*(?:value|' + Az + ')');
        j0.querySelectorAll('[id~=' + A6 + '-]').length || A2.push('~=');
        j0.querySelectorAll(':checked').length || A2.push(':checked');
        j0.querySelectorAll('a#' + A6 + '+*').length || A2.push('.#.+[+~]');
      }), AZ(function (j0) {
        ;
        j0.innerHTML = '<a href=\'\' disabled=\'disabled\'></a><select disabled=\'disabled\'><option/></select>';
        ;
        var j1 = rn.createElement('input');
        ;
        j1.setAttribute('type', 'hidden');
        j0.appendChild(j1).setAttribute('name', 'D');
        j0.querySelectorAll('[name=d]').length && A2.push('name' + AU + '*[*^$|!~]?=');
        2 !== j0.querySelectorAll(':enabled').length && A2.push(':enabled', ':disabled');
        A0.appendChild(j0).disabled = true;
        2 !== j0.querySelectorAll(':disabled').length && A2.push(':enabled', ':disabled');
        j0.querySelectorAll('*,:x');
        A2.push(',.*:');
      })), (rp.matchesSelector = /^[^{]+\{\s*\[native \w/.test(A4 = A0.matches || A0.webkitMatchesSelector || A0.mozMatchesSelector || A0.oMatchesSelector || A0.msMatchesSelector)) && AZ(function (j0) {
        ;
        ;
        ;
        A4.call(j0, '[s!=\'\']:x');
        A3.push('!=', AE);
      }), A2 = A2.length && new RegExp(A2.join('|')), A3 = A3.length && new RegExp(A3.join('|')), An = /^[^{]+\{\s*\[native \w/.test(A0.compareDocumentPosition), A5 = An || /^[^{]+\{\s*\[native \w/.test(A0.contains) ? function (j0, j1) {
        var j2 = 9 === j0.nodeType ? j0.documentElement : j0, j1 = j1 && j1.parentNode;
        ;
        ;
        ;
        return j0 === j1 || !(!j1 || 1 !== j1.nodeType || !(j2.contains ? j2.contains(j1) : j0.compareDocumentPosition && 16 & j0.compareDocumentPosition(j1)));
      } : function (j0, j1) {
        if (j1) {
          for (; j1 = j1.parentNode;) {
            if (j1 === j0) {
              return true;
            }
          }
        }
        ;
        return false;
      }, AA = An ? function (j0, j1) {
        ;
        ;
        var j2;
        return j0 === j1 ? (rw = true, 0) : !j0.compareDocumentPosition - !j1.compareDocumentPosition || (1 & (j2 = (j0.ownerDocument || j0) === (j1.ownerDocument || j1) ? j0.compareDocumentPosition(j1) : 1) || !rp.sortDetached && j1.compareDocumentPosition(j0) === j2 ? j0 === rn || j0.ownerDocument === A7 && A5(A7, j0) ? -1 : j1 === rn || j1.ownerDocument === A7 && A5(A7, j1) ? 1 : rk ? Al(rk, j0) - Al(rk, j1) : 0 : 4 & j2 ? -1 : 1);
      } : function (j0, j1) {
        if (j0 === j1) {
          return rw = true, 0;
        }
        ;
        var j2, j3 = 0, j4 = j0.parentNode, j5 = j1.parentNode, j6 = [j0], j7 = [j1];
        if (!j4 || !j5) {
          return j0 === rn ? -1 : j1 === rn ? 1 : j4 ? -1 : j5 ? 1 : rk ? Al(rk, j0) - Al(rk, j1) : 0;
        }
        if (j4 === j5) {
          return As(j0, j1);
        }
        for (j2 = j0; j2 = j2.parentNode;) {
          j6.unshift(j2);
        }
        ;
        for (j2 = j1; j2 = j2.parentNode;) {
          j7.unshift(j2);
        }
        for (; j6[j3] === j7[j3];) {
          j3++;
        }
        return j3 ? As(j6[j3], j7[j3]) : j6[j3] === A7 ? -1 : j7[j3] === A7 ? 1 : 0;
      }), rn;
    }, AV.matches = function (An, j0) {
      return AV(An, null, null, j0);
    }, AV.matchesSelector = function (An, j0) {
      ;
      ;
      if ((An.ownerDocument || An) !== rn && ru(An), j0 = j0.replace(Ac, '=\'$1\']'), rp.matchesSelector && A1 && !Ar[j0 + ' '] && (!A3 || !A3.test(j0)) && (!A2 || !A2.test(j0))) {
        try {
          var j1 = A4.call(An, j0);
          if (j1 || rp.disconnectedMatch || An.document && 11 !== An.document.nodeType) {
            return j1;
          }
        } catch (j2) {
        }
      }
      ;
      return 0 < AV(j0, rn, null, [An]).length;
    }, AV.contains = function (An, j0) {
      ;
      return (An.ownerDocument || An) !== rn && ru(An), A5(An, j0);
    }, AV.attr = function (An, j0) {
      ;
      (An.ownerDocument || An) !== rn && ru(An);
      ;
      ;
      var j1 = rQ.attrHandle[j0.toLowerCase()], j1 = j1 && Aj.call(rQ.attrHandle, j0.toLowerCase()) ? j1(An, j0, !A1) : void 0;
      return void 0 !== j1 ? j1 : rp.attributes || !A1 ? An.getAttribute(j0) : (j1 = An.getAttributeNode(j0)) && j1.specified ? j1.value : null;
    }, AV.escape = function (An) {
      ;
      return (An + '').replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, rZ);
    }, AV.error = function (An) {
      ;
      throw new Error('Syntax error, unrecognized expression: ' + An);
    }, AV.uniqueSort = function (An) {
      var j0, j1 = [], j2 = 0, j3 = 0;
      ;
      ;
      if (rw = !rp.detectDuplicates, rk = !rp.sortStable && An.slice(0), An.sort(AA), rw) {
        for (; j0 = An[j3++];) {
          j0 === An[j3] && (j2 = j1.push(j3));
        }
        for (; j2--;) {
          An.splice(j1[j2], 1);
        }
      }
      return rk = null, An;
    }, rJ = AV.getText = function (An) {
      ;
      ;
      var j0, j1 = '', j2 = 0, j3 = An.nodeType;
      ;
      if (j3) {
        if (1 === j3 || 9 === j3 || 11 === j3) {
          if ('string' == typeof An.textContent) {
            return An.textContent;
          }
          for (An = An.firstChild; An; An = An.nextSibling) {
            j1 += rJ(An);
          }
        } else {
          if (3 === j3 || 4 === j3) {
            return An.nodeValue;
          }
        }
      } else {
        for (; j0 = An[j2++];) {
          j1 += rJ(j0);
        }
      }
      return j1;
    }, (rQ = AV.selectors = {
      'cacheLength': 50,
      'createPseudo': Ah,
      'match': AG,
      'attrHandle': {},
      'find': {},
      'relative': {
        '>': {
          'dir': 'parentNode',
          'first': true
        },
        ' ': { 'dir': 'parentNode' },
        '+': {
          'dir': 'previousSibling',
          'first': true
        },
        '~': { 'dir': 'previousSibling' }
      },
      'preFilter': {
        'ATTR': function (An) {
          ;
          return An[1] = An[1].replace(AW, rh), An[3] = (An[3] || An[4] || An[5] || '').replace(AW, rh), '~=' === An[2] && (An[3] = ' ' + An[3] + ' '), An.slice(0, 4);
        },
        'CHILD': function (An) {
          ;
          ;
          ;
          return An[1] = An[1].toLowerCase(), 'nth' === An[1].slice(0, 3) ? (An[3] || AV.error(An[0]), An[4] = +(An[4] ? An[5] + (An[6] || 1) : 2 * ('even' === An[3] || 'odd' === An[3])), An[5] = +(An[7] + An[8] || 'odd' === An[3])) : An[3] && AV.error(An[0]), An;
        },
        'PSEUDO': function (An) {
          ;
          ;
          var j0, j1 = !An[6] && An[2];
          return AG.CHILD.test(An[0]) ? null : (An[3] ? An[2] = An[4] || An[5] || '' : j1 && AY.test(j1) && (j0 = (j0 = rL(j1, true)) && j1.indexOf(')', j1.length - j0) - j1.length) && (An[0] = An[0].slice(0, j0), An[2] = j1.slice(0, j0)), An.slice(0, 3));
        }
      },
      'filter': {
        'TAG': function (An) {
          ;
          var j0 = An.replace(AW, rh).toLowerCase();
          return '*' === An ? function () {
            return true;
          } : function (j1) {
            ;
            return j1.nodeName && j1.nodeName.toLowerCase() === j0;
          };
        },
        'CLASS': function (An) {
          var j0 = AO[An + ' '];
          return j0 || (j0 = new RegExp('(^|' + AU + ')' + An + '(' + AU + '|$)')) && AO(An, function (j1) {
            ;
            ;
            return j0.test('string' == typeof j1.className && j1.className || void 0 !== j1.getAttribute && j1.getAttribute('class') || '');
          });
        },
        'ATTR': function (An, j0, j1) {
          return function (j2) {
            ;
            ;
            ;
            return j2 = AV.attr(j2, An), null == j2 ? '!=' === j0 : !j0 || (j2 += '', '=' === j0 ? j2 === j1 : '!=' === j0 ? j2 !== j1 : '^=' === j0 ? j1 && 0 === j2.indexOf(j1) : '*=' === j0 ? j1 && -1 < j2.indexOf(j1) : '$=' === j0 ? j1 && j2.slice(-j1.length) === j1 : '~=' === j0 ? -1 < (' ' + j2.replace(Av, ' ') + ' ').indexOf(j1) : '|=' === j0 && (j2 === j1 || j2.slice(0, j1.length + 1) === j1 + '-'));
          };
        },
        'CHILD': function (An, j0, j1, j2, j3) {
          var j4 = 'nth' !== An.slice(0, 3), j5 = 'last' !== An.slice(-4), j6 = 'of-type' === j0;
          ;
          ;
          ;
          return 1 === j2 && 0 === j3 ? function (j7) {
            ;
            return !!j7.parentNode;
          } : function (j7, j8, j9) {
            ;
            var jO, jC, jr, jA, jj, jI, jR = j4 != j5 ? 'nextSibling' : 'previousSibling', ji = j7.parentNode, jq = j6 && j7.nodeName.toLowerCase(), jX = !j9 && !j6, jl = false;
            ;
            ;
            if (ji) {
              if (j4) {
                for (; jR;) {
                  for (jA = j7; jA = jA[jR];) {
                    if (j6 ? jA.nodeName.toLowerCase() === jq : 1 === jA.nodeType) {
                      return false;
                    }
                  }
                  jI = jR = 'only' === An && !jI && 'nextSibling';
                }
                return true;
              }
              if (jI = [j5 ? ji.firstChild : ji.lastChild], j5 && jX) {
                for (jl = (jj = (jO = (jC = (jr = (jA = ji)[A6] || (jA[A6] = {}))[jA.uniqueID] || (jr[jA.uniqueID] = {}))[An] || [])[0] === A8 && jO[1]) && jO[2], jA = jj && ji.childNodes[jj]; jA = ++jj && jA && jA[jR] || (jl = jj = 0, jI.pop());) {
                  if (1 === jA.nodeType && ++jl && jA === j7) {
                    jC[An] = [
                      A8,
                      jj,
                      jl
                    ];
                    break;
                  }
                }
              } else {
                if (false === (jl = jX ? jj = (jO = (jC = (jr = (jA = j7)[A6] || (jA[A6] = {}))[jA.uniqueID] || (jr[jA.uniqueID] = {}))[An] || [])[0] === A8 && jO[1] : jl)) {
                  for (; (jA = ++jj && jA && jA[jR] || (jl = jj = 0, jI.pop())) && ((j6 ? jA.nodeName.toLowerCase() !== jq : 1 !== jA.nodeType) || !++jl || (jX && ((jC = (jr = jA[A6] || (jA[A6] = {}))[jA.uniqueID] || (jr[jA.uniqueID] = {}))[An] = [
                    A8,
                    jl
                  ]), jA !== j7));) {
                    ;
                  }
                }
              }
              return (jl -= j3) === j2 || jl % j2 == 0 && 0 <= jl / j2;
            }
          };
        },
        'PSEUDO': function (An, j0) {
          ;
          ;
          ;
          var j1, j2 = rQ.pseudos[An] || rQ.setFilters[An.toLowerCase()] || AV.error('unsupported pseudo: ' + An);
          return j2[A6] ? j2(j0) : 1 < j2.length ? (j1 = [
            An,
            An,
            '',
            j0
          ], rQ.setFilters.hasOwnProperty(An.toLowerCase()) ? Ah(function (j3, j4) {
            ;
            for (var j5, j6 = j2(j3, j0), j7 = j6.length; j7--;) {
              j3[j5 = Al(j3, j6[j7])] = !(j4[j5] = j6[j7]);
            }
          }) : function (j3) {
            return j2(j3, 0, j1);
          }) : j2;
        }
      },
      'pseudos': {
        'not': Ah(function (An) {
          ;
          var j0 = [], j1 = [], j2 = rS(An.replace(Ab, '$1'));
          return j2[A6] ? Ah(function (j3, j4, j5, j6) {
            ;
            for (var j7, j8 = j2(j3, null, j6, []), j9 = j3.length; j9--;) {
              (j7 = j8[j9]) && (j3[j9] = !(j4[j9] = j7));
            }
          }) : function (j3, j4, j5) {
            ;
            return j0[0] = j3, j2(j0, null, j5, j1), j0[0] = null, !j1.pop();
          };
        }),
        'has': Ah(function (An) {
          return function (j0) {
            ;
            return 0 < AV(An, j0).length;
          };
        }),
        'contains': Ah(function (An) {
          ;
          return An = An.replace(AW, rh), function (j0) {
            ;
            ;
            return -1 < (j0.textContent || j0.innerText || rJ(j0)).indexOf(An);
          };
        }),
        'lang': Ah(function (An) {
          ;
          ;
          ;
          return AM.test(An || '') || AV.error('unsupported lang: ' + An), An = An.replace(AW, rh).toLowerCase(), function (j0) {
            ;
            var j1;
            do {
              if (j1 = A1 ? j0.lang : j0.getAttribute('xml:lang') || j0.getAttribute('lang')) {
                return (j1 = j1.toLowerCase()) === An || 0 === j1.indexOf(An + '-');
              }
            } while ((j0 = j0.parentNode) && 1 === j0.nodeType);
            ;
            ;
            return false;
          };
        }),
        'target': function (An) {
          var j0 = rH.location && rH.location.hash;
          ;
          return j0 && j0.slice(1) === An.id;
        },
        'root': function (An) {
          return An === A0;
        },
        'focus': function (An) {
          ;
          ;
          ;
          return An === rn.activeElement && (!rn.hasFocus || rn.hasFocus()) && !!(An.type || An.href || ~An.tabIndex);
        },
        'enabled': Ap(false),
        'disabled': Ap(true),
        'checked': function (An) {
          ;
          var j0 = An.nodeName.toLowerCase();
          ;
          ;
          return 'input' === j0 && !!An.checked || 'option' === j0 && !!An.selected;
        },
        'selected': function (An) {
          ;
          ;
          ;
          return An.parentNode && An.parentNode.selectedIndex, true === An.selected;
        },
        'empty': function (An) {
          for (An = An.firstChild; An; An = An.nextSibling) {
            if (An.nodeType < 6) {
              return false;
            }
          }
          ;
          return true;
        },
        'parent': function (An) {
          ;
          return !rQ.pseudos.empty(An);
        },
        'header': function (An) {
          ;
          return /^h\d$/i.test(An.nodeName);
        },
        'input': function (An) {
          ;
          ;
          return /^(?:input|select|textarea|button)$/i.test(An.nodeName);
        },
        'button': function (An) {
          ;
          var j0 = An.nodeName.toLowerCase();
          ;
          return 'input' === j0 && 'button' === An.type || 'button' === j0;
        },
        'text': function (An) {
          ;
          ;
          ;
          return 'input' === An.nodeName.toLowerCase() && 'text' === An.type && (null == (An = An.getAttribute('type')) || 'text' === An.toLowerCase());
        },
        'first': AQ(function () {
          return [0];
        }),
        'last': AQ(function (An, j0) {
          return [j0 - 1];
        }),
        'eq': AQ(function (An, j0, j1) {
          return [j1 < 0 ? j1 + j0 : j1];
        }),
        'even': AQ(function (An, j0) {
          ;
          for (var j1 = 0; j1 < j0; j1 += 2) {
            An.push(j1);
          }
          return An;
        }),
        'odd': AQ(function (An, j0) {
          ;
          for (var j1 = 1; j1 < j0; j1 += 2) {
            An.push(j1);
          }
          return An;
        }),
        'lt': AQ(function (An, j0, j1) {
          ;
          for (var j2 = j1 < 0 ? j1 + j0 : j1; 0 <= --j2;) {
            An.push(j2);
          }
          return An;
        }),
        'gt': AQ(function (An, j0, j1) {
          for (var j2 = j1 < 0 ? j1 + j0 : j1; ++j2 < j0;) {
            An.push(j2);
          }
          return An;
        })
      }
    }).pseudos.nth = rQ.pseudos.eq, {
      'radio': true,
      'checkbox': true,
      'file': true,
      'password': true,
      'image': true
    }))
      rQ.pseudos[rs] = function (An) {
        return function (j0) {
          ;
          return 'input' === j0.nodeName.toLowerCase() && j0.type === An;
        };
      }(rs);
    for (rs in {
      'submit': true,
      'reset': true
    })
      rQ.pseudos[rs] = function (An) {
        return function (j0) {
          var j1 = j0.nodeName.toLowerCase();
          ;
          ;
          return ('input' === j1 || 'button' === j1) && j0.type === An;
        };
      }(rs);
    function AK() {
    }
    function AL(An) {
      for (var j0 = 0, j1 = An.length, j2 = ''; j0 < j1; j0++) {
        j2 += An[j0].value;
      }
      ;
      return j2;
    }
    ;
    function AS(An, j0, j1) {
      ;
      var j2 = j0.dir, j3 = j0.next, j4 = j3 || j2, j5 = j1 && 'parentNode' === j4, j6 = A9++;
      ;
      ;
      return j0.first ? function (j7, j8, j9) {
        ;
        for (; j7 = j7[j2];) {
          if (1 === j7.nodeType || j5) {
            return An(j7, j8, j9);
          }
        }
        return false;
      } : function (j7, j8, j9) {
        var jO, jC, jr = [
          A8,
          j6
        ];
        ;
        if (j9) {
          for (; j7 = j7[j2];) {
            if ((1 === j7.nodeType || j5) && An(j7, j8, j9)) {
              return true;
            }
          }
        } else {
          for (; j7 = j7[j2];) {
            if (1 === j7.nodeType || j5) {
              if (jC = (jC = j7[A6] || (j7[A6] = {}))[j7.uniqueID] || (jC[j7.uniqueID] = {}), j3 && j3 === j7.nodeName.toLowerCase()) {
                j7 = j7[j2] || j7;
              } else {
                if ((jO = jC[j4]) && jO[0] === A8 && jO[1] === j6) {
                  return jr[2] = jO[2];
                }
                if ((jC[j4] = jr)[2] = An(j7, j8, j9)) {
                  return true;
                }
              }
            }
          }
        }
        ;
        return false;
      };
    }
    function Ax(An) {
      ;
      return 1 < An.length ? function (j0, j1, j2) {
        for (var j3 = An.length; j3--;) {
          if (!An[j3](j0, j1, j2)) {
            return false;
          }
        }
        ;
        return true;
      } : An[0];
    }
    function Aa(An, j0, j1, j2, j3) {
      ;
      ;
      for (var j4, j5 = [], j6 = 0, j7 = An.length, j8 = null != j0; j6 < j7; j6++) {
        !(j4 = An[j6]) || j1 && !j1(j4, j2, j3) || (j5.push(j4), j8 && j0.push(j6));
      }
      return j5;
    }
    function Ak(An, j0, j1, j2, j3, j4) {
      return j2 && !j2[A6] && (j2 = Ak(j2)), j3 && !j3[A6] && (j3 = Ak(j3, j4)), Ah(function (j5, j6, j7, j8) {
        var j9, jO, jC, jr = [], jA = [], jj = j6.length, jI = j5 || function (jq, jX, jl) {
          for (var jz = 0, jU = jX.length; jz < jU; jz++) {
            AV(jq, jX[jz], jl);
          }
          return jl;
        }(j0 || '*', j7.nodeType ? [j7] : j7, []), jR = !An || !j5 && j0 ? jI : Aa(jI, jr, An, j7, j8), ji = j1 ? j3 || (j5 ? An : jj || j2) ? [] : j6 : jR;
        ;
        ;
        ;
        if (j1 && j1(jR, ji, j7, j8), j2) {
          for (j9 = Aa(ji, jA), j2(j9, [], j7, j8), jO = j9.length; jO--;) {
            (jC = j9[jO]) && (ji[jA[jO]] = !(jR[jA[jO]] = jC));
          }
        }
        if (j5) {
          if (j3 || An) {
            if (j3) {
              for (j9 = [], jO = ji.length; jO--;) {
                (jC = ji[jO]) && j9.push(jR[jO] = jC);
              }
              j3(null, ji = [], j9, j8);
            }
            for (jO = ji.length; jO--;) {
              (jC = ji[jO]) && -1 < (j9 = j3 ? Al(j5, jC) : jr[jO]) && (j5[j9] = !(j6[j9] = jC));
            }
          }
        } else {
          ji = Aa(ji === j6 ? ji.splice(jj, ji.length) : ji);
          j3 ? j3(null, j6, ji, j8) : Aq.apply(j6, ji);
        }
      });
    }
    function Aw(An, j0) {
      function j1(j4, j5, j6, j7, j8) {
        var j9, jO, jC, jr = 0, jA = '0', jj = j4 && [], jI = [], jR = ra, ji = j4 || j3 && rQ.find.TAG('*', j8), jq = A8 += null == jR ? 1 : Math.random() || 0.1, jX = ji.length;
        for (j8 && (ra = j5 === rn || j5 || j8); jA !== jX && null != (j9 = ji[jA]); jA++) {
          if (j3 && j9) {
            for (jO = 0, j5 || j9.ownerDocument === rn || (ru(j9), j6 = !A1); jC = An[jO++];) {
              if (jC(j9, j5 || rn, j6)) {
                j7.push(j9);
                break;
              }
            }
            j8 && (A8 = jq);
          }
          j2 && ((j9 = !jC && j9) && jr--, j4) && jj.push(j9);
        }
        ;
        if (jr += jA, j2 && jA !== jr) {
          for (jO = 0; jC = j0[jO++];) {
            jC(jj, jI, j5, j6);
          }
          if (j4) {
            if (0 < jr) {
              for (; jA--;) {
                jj[jA] || jI[jA] || (jI[jA] = AR.call(j7));
              }
            }
            jI = Aa(jI);
          }
          Aq.apply(j7, jI);
          j8 && !j4 && 0 < jI.length && 1 < jr + j0.length && AV.uniqueSort(j7);
        }
        ;
        return j8 && (A8 = jq, ra = jR), jj;
      }
      ;
      var j2 = 0 < j0.length, j3 = 0 < An.length;
      return j2 ? Ah(j1) : j1;
    }
    return AK.prototype = rQ.filters = rQ.pseudos, rQ.setFilters = new AK(), rL = AV.tokenize = function (An, j0) {
      var j1, j2, j3, j4, j5, j6, j7, j8 = AC[An + ' '];
      ;
      if (j8) {
        return j0 ? 0 : j8.slice(0);
      }
      ;
      ;
      for (j5 = An, j6 = [], j7 = rQ.preFilter; j5;) {
        for (j4 in (j1 && !(j2 = AF.exec(j5)) || (j2 && (j5 = j5.slice(j2[0].length) || j5), j6.push(j3 = [])), j1 = false, (j2 = AP.exec(j5)) && (j1 = j2.shift(), j3.push({
          'value': j1,
          'type': j2[0].replace(Ab, ' ')
        }), j5 = j5.slice(j1.length)), rQ.filter))
          !(j2 = AG[j4].exec(j5)) || j7[j4] && !(j2 = j7[j4](j2)) || (j1 = j2.shift(), j3.push({
            'value': j1,
            'type': j4,
            'matches': j2
          }), j5 = j5.slice(j1.length));
        if (!j1) {
          break;
        }
      }
      return j0 ? j5.length : j5 ? AV.error(An) : AC(An, j6).slice(0);
    }, rS = AV.compile = function (An, j0) {
      var j1, j2 = [], j3 = [], j4 = Ar[An + ' '];
      if (!j4) {
        for (j1 = (j0 = j0 || rL(An)).length; j1--;) {
          ((j4 = function j5(j6) {
            ;
            for (var j7, j8, j9, jO = j6.length, jC = rQ.relative[j6[0].type], jr = jC || rQ.relative[' '], jA = jC ? 1 : 0, jj = AS(function (ji) {
              return ji === j7;
            }, jr, true), jI = AS(function (ji) {
              return -1 < Al(j7, ji);
            }, jr, true), jR = [function (ji, jq, jX) {
              return ji = !jC && (jX || jq !== ra) || ((j7 = jq).nodeType ? jj : jI)(ji, jq, jX), j7 = null, ji;
            }]; jA < jO; jA++) {
              if (j8 = rQ.relative[j6[jA].type]) {
                jR = [AS(Ax(jR), j8)];
              } else {
                if ((j8 = rQ.filter[j6[jA].type].apply(null, j6[jA].matches))[A6]) {
                  for (j9 = ++jA; j9 < jO && !rQ.relative[j6[j9].type]; j9++) {
                    ;
                  }
                  return Ak(1 < jA && Ax(jR), 1 < jA && AL(j6.slice(0, jA - 1).concat({ 'value': ' ' === j6[jA - 2].type ? '*' : '' })).replace(Ab, '$1'), j8, jA < j9 && j5(j6.slice(jA, j9)), j9 < jO && j5(j6 = j6.slice(j9)), j9 < jO && AL(j6));
                }
                jR.push(j8);
              }
            }
            ;
            ;
            return Ax(jR);
          }(j0[j1]))[A6] ? j2 : j3).push(j4);
        }
        (j4 = Ar(An, Aw(j3, j2))).selector = An;
      }
      ;
      ;
      return j4;
    }, rx = AV.select = function (An, j0, j1, j2) {
      var j3, j4, j5, j6, j7, j8 = 'function' == typeof An && An, j9 = !j2 && rL(An = j8.selector || An);
      ;
      ;
      ;
      if (j1 = j1 || [], 1 === j9.length) {
        if (2 < (j4 = j9[0] = j9[0].slice(0)).length && 'ID' === (j5 = j4[0]).type && 9 === j0.nodeType && A1 && rQ.relative[j4[1].type]) {
          if (!(j0 = (rQ.find.ID(j5.matches[0].replace(AW, rh), j0) || [])[0])) {
            return j1;
          }
          j8 && (j0 = j0.parentNode);
          An = An.slice(j4.shift().value.length);
        }
        for (j3 = AG.needsContext.test(An) ? 0 : j4.length; j3-- && (j5 = j4[j3], !rQ.relative[j6 = j5.type]);) {
          if ((j7 = rQ.find[j6]) && (j2 = j7(j5.matches[0].replace(AW, rh), /[+~]/.test(j4[0].type) && AJ(j0.parentNode) || j0))) {
            if (j4.splice(j3, 1), An = j2.length && AL(j4)) {
              break;
            }
            return Aq.apply(j1, j2), j1;
          }
        }
      }
      return (j8 || rS(An, j9))(j2, j0, !A1, j1, !j0 || /[+~]/.test(An) && AJ(j0.parentNode) || j0), j1;
    }, rp.sortStable = A6.split('').sort(AA).join('') === A6, rp.detectDuplicates = !!rw, ru(), rp.sortDetached = AZ(function (An) {
      ;
      ;
      return 1 & An.compareDocumentPosition(rn.createElement('fieldset'));
    }), AZ(function (An) {
      ;
      ;
      return An.innerHTML = '<a href=\'#\'></a>', '#' === An.firstChild.getAttribute('href');
    }) || AT('type|href|height|width', function (An, j0, j1) {
      ;
      if (!j1) {
        return An.getAttribute(j0, 'type' === j0.toLowerCase() ? 1 : 2);
      }
    }), rp.attributes && AZ(function (An) {
      ;
      ;
      ;
      return An.innerHTML = '<input/>', An.firstChild.setAttribute('value', ''), '' === An.firstChild.getAttribute('value');
    }) || AT('value', function (An, j0, j1) {
      ;
      ;
      if (!j1 && 'input' === An.nodeName.toLowerCase()) {
        return An.defaultValue;
      }
    }), AZ(function (An) {
      ;
      return null == An.getAttribute('disabled');
    }) || AT(Az, function (An, j0, j1) {
      ;
      ;
      if (!j1) {
        return true === An[j0] ? j0.toLowerCase() : (j1 = An.getAttributeNode(j0)) && j1.specified ? j1.value : null;
      }
    }), AV;
  }(O5), Oc = (OE.find = O9, OE.expr = O9.selectors, OE.expr[':'] = OE.expr.pseudos, OE.uniqueSort = OE.unique = O9.uniqueSort, OE.text = O9.getText, OE.isXMLDoc = O9.isXML, OE.contains = O9.contains, OE.escapeSelector = O9.escape, OE.expr.match.needsContext);
  function OY(rH, rh) {
    ;
    ;
    return rH.nodeName && rH.nodeName.toLowerCase() === rh.toLowerCase();
  }
  ;
  function OG(rH, rh, rZ) {
    ;
    ;
    ;
    return O7(rh) ? OE.grep(rH, function (rT, rs) {
      ;
      return !!rh.call(rT, rs, rT) !== rZ;
    }) : rh.nodeType ? OE.grep(rH, function (rT) {
      return rT === rh !== rZ;
    }) : 'string' != typeof rh ? OE.grep(rH, function (rT) {
      return -1 < OI.call(rh, rT) !== rZ;
    }) : OE.filter(rh, rH, rZ);
  }
  OE.filter = function (rH, rh, rZ) {
    var rT = rh[0];
    ;
    ;
    return rZ && (rH = ':not(' + rH + ')'), 1 === rh.length && 1 === rT.nodeType ? OE.find.matchesSelector(rT, rH) ? [rT] : [] : OE.find.matches(rH, OE.grep(rh, function (rs) {
      ;
      return 1 === rs.nodeType;
    }));
  };
  OE.fn.extend({
    'find': function (rH) {
      ;
      var rh, rZ, rT = this.length, rs = this;
      if ('string' != typeof rH) {
        return this.pushStack(OE(rH).filter(function () {
          ;
          for (rh = 0; rh < rT; rh++) {
            if (OE.contains(rs[rh], this)) {
              return true;
            }
          }
        }));
      }
      ;
      for (rZ = this.pushStack([]), rh = 0; rh < rT; rh++) {
        OE.find(rH, rs[rh], rZ);
      }
      ;
      return 1 < rT ? OE.uniqueSort(rZ) : rZ;
    },
    'filter': function (rH) {
      return this.pushStack(OG(this, rH || [], false));
    },
    'not': function (rH) {
      ;
      return this.pushStack(OG(this, rH || [], true));
    },
    'is': function (rH) {
      ;
      return !!OG(this, 'string' == typeof rH && Oc.test(rH) ? OE(rH) : rH || [], false).length;
    }
  });
  var Oo, Of = ((OE.fn.init = function (rH, rh, rZ) {
    ;
    if (rH) {
      if (rZ = rZ || Oo, 'string' != typeof rH) {
        return rH.nodeType ? (this[0] = rH, this.length = 1, this) : O7(rH) ? void 0 !== rZ.ready ? rZ.ready(rH) : rH(OE) : OE.makeArray(rH, this);
      }
      if (!(rT = '<' === rH[0] && '>' === rH[rH.length - 1] && 3 <= rH.length ? [
        null,
        rH,
        null
      ] : /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/.exec(rH)) || !rT[1] && rh) {
        return (!rh || rh.jquery ? rh || rZ : this.constructor(rh)).find(rH);
      }
      if (rT[1]) {
        if (rh = rh instanceof OE ? rh[0] : rh, OE.merge(this, OE.parseHTML(rT[1], rh && rh.nodeType ? rh.ownerDocument || rh : OO, true)), /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i.test(rT[1]) && OE.isPlainObject(rh)) {
          for (var rT in rh)
            O7(this[rT]) ? this[rT](rh[rT]) : this.attr(rT, rh[rT]);
        }
      } else {
        (rZ = OO.getElementById(rT[2])) && (this[0] = rZ, this.length = 1);
      }
    }
    ;
    ;
    return this;
  }).prototype = OE.fn, Oo = OE(OO), /^(?:parents|prev(?:Until|All))/);
  function Om(rH, rh) {
    ;
    for (; (rH = rH[rh]) && 1 !== rH.nodeType;) {
      ;
    }
    return rH;
  }
  OE.fn.extend({
    'has': function (rH) {
      var rh = OE(rH, this), rZ = rh.length;
      ;
      ;
      return this.filter(function () {
        ;
        for (var rT = 0; rT < rZ; rT++) {
          if (OE.contains(this, rh[rT])) {
            return true;
          }
        }
      });
    },
    'closest': function (rH, rh) {
      ;
      ;
      var rZ, rT = 0, rs = this.length, rp = [], rQ = 'string' != typeof rH && OE(rH);
      ;
      if (!Oc.test(rH)) {
        for (; rT < rs; rT++) {
          for (rZ = this[rT]; rZ && rZ !== rh; rZ = rZ.parentNode) {
            if (rZ.nodeType < 11 && (rQ ? -1 < rQ.index(rZ) : 1 === rZ.nodeType && OE.find.matchesSelector(rZ, rH))) {
              rp.push(rZ);
              break;
            }
          }
        }
      }
      return this.pushStack(1 < rp.length ? OE.uniqueSort(rp) : rp);
    },
    'index': function (rH) {
      ;
      ;
      ;
      return rH ? 'string' == typeof rH ? OI.call(OE(rH), this[0]) : OI.call(this, rH.jquery ? rH[0] : rH) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    'add': function (rH, rh) {
      ;
      ;
      return this.pushStack(OE.uniqueSort(OE.merge(this.get(), OE(rH, rh))));
    },
    'addBack': function (rH) {
      ;
      ;
      return this.add(null == rH ? this.prevObject : this.prevObject.filter(rH));
    }
  });
  OE.each({
    'parent': function (rH) {
      ;
      rH = rH.parentNode;
      ;
      return rH && 11 !== rH.nodeType ? rH : null;
    },
    'parents': function (rH) {
      ;
      return OF(rH, 'parentNode');
    },
    'parentsUntil': function (rH, rh, rZ) {
      return OF(rH, 'parentNode', rZ);
    },
    'next': function (rH) {
      ;
      return Om(rH, 'nextSibling');
    },
    'prev': function (rH) {
      return Om(rH, 'previousSibling');
    },
    'nextAll': function (rH) {
      return OF(rH, 'nextSibling');
    },
    'prevAll': function (rH) {
      ;
      return OF(rH, 'previousSibling');
    },
    'nextUntil': function (rH, rh, rZ) {
      ;
      return OF(rH, 'nextSibling', rZ);
    },
    'prevUntil': function (rH, rh, rZ) {
      ;
      return OF(rH, 'previousSibling', rZ);
    },
    'siblings': function (rH) {
      ;
      return OP((rH.parentNode || {}).firstChild, rH);
    },
    'children': function (rH) {
      ;
      return OP(rH.firstChild);
    },
    'contents': function (rH) {
      ;
      ;
      ;
      return OY(rH, 'iframe') ? rH.contentDocument : (OY(rH, 'template') && (rH = rH.content || rH), OE.merge([], rH.childNodes));
    }
  }, function (rH, rh) {
    OE.fn[rH] = function (rZ, rT) {
      ;
      ;
      var rs = OE.map(this, rh, rZ);
      return (rT = 'Until' !== rH.slice(-5) ? rZ : rT) && 'string' == typeof rT && (rs = OE.filter(rT, rs)), 1 < this.length && (ON[rH] || OE.uniqueSort(rs), Of.test(rH)) && rs.reverse(), this.pushStack(rs);
    };
  });
  ;
  function OB(rH) {
    return rH;
  }
  function Oy(rH) {
    throw rH;
  }
  function OV(rH, rh, rZ, rT) {
    var rs;
    ;
    ;
    ;
    try {
      rH && O7(rs = rH.promise) ? rs.call(rH).done(rh).fail(rZ) : rH && O7(rs = rH.then) ? rs.call(rH, rh, rZ) : rh.apply(void 0, [rH].slice(rT));
    } catch (rp) {
      rZ.apply(void 0, [rp]);
    }
  }
  OE.Callbacks = function (rH) {
    var rh, rZ;
    ;
    rH = 'string' == typeof rH ? (rh = rH, rZ = {}, OE.each(rh.match(/[^\x20\t\r\n\f]+/g) || [], function (ra, rk) {
      rZ[rk] = true;
    }), rZ) : OE.extend({}, rH);
    function rT() {
      ;
      ;
      ;
      for (rJ = rJ || rH.once, rQ = rs = true; rL.length; rS = -1) {
        for (rp = rL.shift(); ++rS < rK.length;) {
          false === rK[rS].apply(rp[0], rp[1]) && rH.stopOnFalse && (rS = rK.length, rp = false);
        }
      }
      rH.memory || (rp = false);
      rs = false;
      rJ && (rK = rp ? [] : '');
    }
    ;
    var rs, rp, rQ, rJ, rK = [], rL = [], rS = -1, rx = {
      'add': function () {
        ;
        return rK && (rp && !rs && (rS = rK.length - 1, rL.push(rp)), function ra(rk) {
          ;
          OE.each(rk, function (rw, ru) {
            ;
            ;
            O7(ru) ? rH.unique && rx.has(ru) || rK.push(ru) : ru && ru.length && 'string' !== Og(ru) && ra(ru);
          });
        }(arguments), rp) && !rs && rT(), this;
      },
      'remove': function () {
        ;
        return OE.each(arguments, function (ra, rk) {
          ;
          for (var rw; -1 < (rw = OE.inArray(rk, rK, rw));) {
            rK.splice(rw, 1);
            rw <= rS && rS--;
          }
        }), this;
      },
      'has': function (ra) {
        ;
        ;
        return ra ? -1 < OE.inArray(ra, rK) : 0 < rK.length;
      },
      'empty': function () {
        return rK = rK && [], this;
      },
      'disable': function () {
        return rJ = rL = [], rK = rp = '', this;
      },
      'disabled': function () {
        return !rK;
      },
      'lock': function () {
        return rJ = rL = [], rp || rs || (rK = rp = ''), this;
      },
      'locked': function () {
        return !!rJ;
      },
      'fireWith': function (ra, rk) {
        ;
        ;
        ;
        return rJ || (rk = [
          ra,
          (rk = rk || []).slice ? rk.slice() : rk
        ], rL.push(rk), rs) || rT(), this;
      },
      'fire': function () {
        ;
        return rx.fireWith(this, arguments), this;
      },
      'fired': function () {
        return !!rQ;
      }
    };
    return rx;
  };
  OE.extend({
    'Deferred': function (rH) {
      ;
      ;
      ;
      var rh = [
        [
          'notify',
          'progress',
          OE.Callbacks('memory'),
          OE.Callbacks('memory'),
          2
        ],
        [
          'resolve',
          'done',
          OE.Callbacks('once memory'),
          OE.Callbacks('once memory'),
          0,
          'resolved'
        ],
        [
          'reject',
          'fail',
          OE.Callbacks('once memory'),
          OE.Callbacks('once memory'),
          1,
          'rejected'
        ]
      ], rZ = 'pending', rT = {
        'state': function () {
          return rZ;
        },
        'always': function () {
          ;
          ;
          return rs.done(arguments).fail(arguments), this;
        },
        'catch': function (rp) {
          ;
          return rT.then(null, rp);
        },
        'pipe': function () {
          ;
          var rp = arguments;
          ;
          return OE.Deferred(function (rQ) {
            OE.each(rh, function (rJ, rK) {
              var rL = O7(rp[rK[4]]) && rp[rK[4]];
              rs[rK[1]](function () {
                ;
                var rS = rL && rL.apply(this, arguments);
                ;
                ;
                rS && O7(rS.promise) ? rS.promise().progress(rQ.notify).done(rQ.resolve).fail(rQ.reject) : rQ[rK[0] + 'With'](this, rL ? [rS] : arguments);
              });
            });
            rp = null;
          }).promise();
        },
        'then': function (rp, rQ, rJ) {
          var rK = 0;
          function rL(rS, rx, ra, rk) {
            return function () {
              function rw() {
                ;
                ;
                var A1, A2;
                ;
                if (!(rS < rK)) {
                  if ((A1 = ra.apply(ru, rn)) === rx.promise()) {
                    throw new TypeError('Thenable self-resolution');
                  }
                  A2 = A1 && ('object' == typeof A1 || 'function' == typeof A1) && A1.then;
                  O7(A2) ? rk ? A2.call(A1, rL(rK, rx, OB, rk), rL(rK, rx, Oy, rk)) : (rK++, A2.call(A1, rL(rK, rx, OB, rk), rL(rK, rx, Oy, rk), rL(rK, rx, OB, rx.notifyWith))) : (ra !== OB && (ru = void 0, rn = [A1]), (rk || rx.resolveWith)(ru, rn));
                }
              }
              ;
              var ru = this, rn = arguments, A0 = rk ? rw : function () {
                ;
                ;
                ;
                try {
                  rw();
                } catch (A1) {
                  OE.Deferred.exceptionHook && OE.Deferred.exceptionHook(A1, A0.stackTrace);
                  rK <= rS + 1 && (ra !== Oy && (ru = void 0, rn = [A1]), rx.rejectWith(ru, rn));
                }
              };
              ;
              ;
              rS ? A0() : (OE.Deferred.getStackHook && (A0.stackTrace = OE.Deferred.getStackHook()), O5.setTimeout(A0));
            };
          }
          ;
          return OE.Deferred(function (rS) {
            ;
            ;
            rh[0][3].add(rL(0, rS, O7(rJ) ? rJ : OB, rS.notifyWith));
            rh[1][3].add(rL(0, rS, O7(rp) ? rp : OB));
            rh[2][3].add(rL(0, rS, O7(rQ) ? rQ : Oy));
          }).promise();
        },
        'promise': function (rp) {
          return null != rp ? OE.extend(rp, rT) : rT;
        }
      }, rs = { rJ: this };
      return OE.each(rh, function (rp, rQ) {
        var rJ = rQ[2], rK = rQ[5];
        ;
        ;
        ;
        rT[rQ[1]] = rJ.add;
        rK && rJ.add(function () {
          rZ = rK;
        }, rh[3 - rp][2].disable, rh[3 - rp][3].disable, rh[0][2].lock, rh[0][3].lock);
        rJ.add(rQ[3].fire);
        rs[rQ[0]] = function () {
          ;
          return rs[rQ[0] + 'With'](this === rs ? void 0 : this, arguments), this;
        };
        rs[rQ[0] + 'With'] = rJ.fireWith;
      }), rT.promise(rs), rH && rH.call(rs, rs), rs;
    },
    'when': function (rH) {
      function rh(rJ) {
        return function (rK) {
          ;
          ;
          ;
          --rZ || rQ.resolveWith(rs, rp);
        };
      }
      ;
      var rZ = arguments.length, rT = rZ, rs = Array(rT), rp = Or.call(arguments), rQ = OE.Deferred();
      ;
      if (rZ <= 1 && (OV(rH, rQ.done(rh(rT)).resolve, rQ.reject, !rZ), 'pending' === rQ.state() || O7(rp[rT] && rp[rT].then))) {
        return rQ.then();
      }
      ;
      for (; rT--;) {
        OV(rp[rT], rh(rT), rQ.reject);
      }
      return rQ.promise();
    }
  });
  var Oh = (OE.Deferred.exceptionHook = function (rH, rh) {
    ;
    ;
    ;
    O5.console && O5.console.warn && rH && /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/.test(rH.name) && O5.console.warn('jQuery.Deferred exception: ' + rH.message, rH.stack, rh);
  }, OE.readyException = function (rH) {
    O5.setTimeout(function () {
      throw rH;
    });
  }, OE.Deferred());
  function OZ() {
    ;
    ;
    ;
    OO.removeEventListener('DOMContentLoaded', OZ);
    O5.removeEventListener('load', OZ);
    OE.ready();
  }
  OE.fn.ready = function (rH) {
    ;
    return Oh.then(rH).catch(function (rh) {
      ;
      OE.readyException(rh);
    }), this;
  };
  OE.extend({
    'isReady': false,
    'readyWait': 1,
    'ready': function (rH) {
      ;
      ;
      (true === rH ? --OE.readyWait : OE.isReady) || (OE.isReady = true) !== rH && 0 < --OE.readyWait || Oh.resolveWith(OO, [OE]);
    }
  });
  OE.ready.then = Oh.then;
  'complete' === OO.readyState || 'loading' !== OO.readyState && !OO.documentElement.doScroll ? O5.setTimeout(OE.ready) : (OO.addEventListener('DOMContentLoaded', OZ), O5.addEventListener('load', OZ));
  function OT(rH, rh, rZ, rT, rs, rp, rQ) {
    ;
    var rJ = 0, rK = rH.length, rL = null == rZ;
    ;
    ;
    if ('object' === Og(rZ)) {
      for (rJ in (rs = true, rZ))
        OT(rH, rh, rJ, rZ[rJ], true, rp, rQ);
    } else {
      if (void 0 !== rT && (rs = true, O7(rT) || (rQ = true), rh = rL ? rQ ? (rh.call(rH, rT), null) : (rL = rh, function (rS, rx, ra) {
        ;
        return rL.call(OE(rS), ra);
      }) : rh)) {
        for (; rJ < rK; rJ++) {
          rh(rH[rJ], rZ, rQ ? rT : rT.call(rH[rJ], rJ, rh(rH[rJ], rZ)));
        }
      }
    }
    return rs ? rH : rL ? rh.call(rH) : rK ? rh(rH[0], rZ) : rp;
  }
  ;
  function OQ(rH, rh) {
    ;
    return rh.toUpperCase();
  }
  function OJ(rH) {
    ;
    ;
    ;
    return rH.replace(/^-ms-/, 'ms-').replace(/-([a-z])/g, OQ);
  }
  function OK(rH) {
    ;
    ;
    ;
    return 1 === rH.nodeType || 9 === rH.nodeType || !+rH.nodeType;
  }
  function OL() {
    ;
    ;
    this.expando = OE.expando + OL.uid++;
  }
  OL.uid = 1;
  OL.prototype = {
    'cache': function (rH) {
      ;
      var rh = rH[this.expando];
      ;
      return rh || (rh = {}, OK(rH) && (rH.nodeType ? rH[this.expando] = rh : Object.defineProperty(rH, this.expando, {
        'value': rh,
        'configurable': true
      }))), rh;
    },
    'set': function (rH, rh, rZ) {
      var rT, rs = this.cache(rH);
      if ('string' == typeof rh) {
        rs[OJ(rh)] = rZ;
      } else {
        for (rT in rh)
          rs[OJ(rT)] = rh[rT];
      }
      ;
      return rs;
    },
    'get': function (rH, rh) {
      ;
      ;
      ;
      return void 0 === rh ? this.cache(rH) : rH[this.expando] && rH[this.expando][OJ(rh)];
    },
    'access': function (rH, rh, rZ) {
      ;
      ;
      return void 0 === rh || rh && 'string' == typeof rh && void 0 === rZ ? this.get(rH, rh) : (this.set(rH, rh, rZ), void 0 !== rZ ? rZ : rh);
    },
    'remove': function (rH, rh) {
      var rZ, rT = rH[this.expando];
      ;
      ;
      ;
      if (void 0 !== rT) {
        if (void 0 !== rh) {
          rZ = (rh = Array.isArray(rh) ? rh.map(OJ) : (rh = OJ(rh)) in rT ? [rh] : rh.match(/[^\x20\t\r\n\f]+/g) || []).length;
          for (; rZ--;) {
            delete rT[rh[rZ]];
          }
        }
        void 0 !== rh && !OE.isEmptyObject(rT) || (rH.nodeType ? rH[this.expando] = void 0 : delete rH[this.expando]);
      }
    },
    'hasData': function (rH) {
      rH = rH[this.expando];
      ;
      return void 0 !== rH && !OE.isEmptyObject(rH);
    }
  };
  var OS = new OL(), Ox = new OL();
  function Ow(rH, rh, rZ) {
    ;
    ;
    ;
    var rT, rs;
    if (void 0 === rZ && 1 === rH.nodeType) {
      if (rT = 'data-' + rh.replace(/[A-Z]/g, '-$&').toLowerCase(), 'string' == typeof (rZ = rH.getAttribute(rT))) {
        try {
          rZ = 'true' === (rs = rZ) || 'false' !== rs && ('null' === rs ? null : rs === +rs + '' ? +rs : /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/.test(rs) ? JSON.parse(rs) : rs);
        } catch (rp) {
        }
        Ox.set(rH, rh, rZ);
      } else {
        rZ = void 0;
      }
    }
    return rZ;
  }
  OE.extend({
    'hasData': function (rH) {
      ;
      ;
      return Ox.hasData(rH) || OS.hasData(rH);
    },
    'data': function (rH, rh, rZ) {
      ;
      return Ox.access(rH, rh, rZ);
    },
    'removeData': function (rH, rh) {
      ;
      Ox.remove(rH, rh);
    },
    '_data': function (rH, rh, rZ) {
      ;
      return OS.access(rH, rh, rZ);
    },
    '_removeData': function (rH, rh) {
      ;
      OS.remove(rH, rh);
    }
  });
  OE.fn.extend({
    'data': function (rH, rh) {
      var rZ, rT, rs, rp = this[0], rQ = rp && rp.attributes;
      ;
      ;
      ;
      if (void 0 !== rH) {
        return 'object' == typeof rH ? this.each(function () {
          Ox.set(this, rH);
        }) : OT(this, function (rJ) {
          ;
          var rK;
          if (rp && void 0 === rJ) {
            return void 0 !== (rK = Ox.get(rp, rH)) || void 0 !== (rK = Ow(rp, rH)) ? rK : void 0;
          }
          this.each(function () {
            Ox.set(this, rH, rJ);
          });
        }, null, rh, 1 < arguments.length, null, true);
      }
      if (this.length && (rs = Ox.get(rp), 1 === rp.nodeType) && !OS.get(rp, 'hasDataAttrs')) {
        for (rZ = rQ.length; rZ--;) {
          rQ[rZ] && 0 === (rT = rQ[rZ].name).indexOf('data-') && (rT = OJ(rT.slice(5)), Ow(rp, rT, rs[rT]));
        }
        OS.set(rp, 'hasDataAttrs', true);
      }
      return rs;
    },
    'removeData': function (rH) {
      ;
      return this.each(function () {
        ;
        Ox.remove(this, rH);
      });
    }
  });
  OE.extend({
    'queue': function (rH, rh, rZ) {
      ;
      ;
      ;
      var rT;
      if (rH) {
        return rT = OS.get(rH, rh = (rh || 'fx') + 'queue'), rZ && (!rT || Array.isArray(rZ) ? rT = OS.access(rH, rh, OE.makeArray(rZ)) : rT.push(rZ)), rT || [];
      }
    },
    'dequeue': function (rH, rh) {
      ;
      rh = rh || 'fx';
      ;
      var rZ = OE.queue(rH, rh), rT = rZ.length, rs = rZ.shift(), rp = OE['_queueHooks'](rH, rh);
      ;
      'inprogress' === rs && (rs = rZ.shift(), rT--);
      rs && ('fx' === rh && rZ.unshift('inprogress'), delete rp.stop, rs.call(rH, function () {
        ;
        OE.dequeue(rH, rh);
      }, rp));
      !rT && rp && rp.empty.fire();
    },
    '_queueHooks': function (rH, rh) {
      var rZ = rh + 'queueHooks';
      ;
      ;
      return OS.get(rH, rZ) || OS.access(rH, rZ, {
        'empty': OE.Callbacks('once memory').add(function () {
          ;
          ;
          OS.remove(rH, [
            rh + 'queue',
            rZ
          ]);
        })
      });
    }
  });
  OE.fn.extend({
    'queue': function (rH, rh) {
      var rZ = 2;
      ;
      return 'string' != typeof rH && (rh = rH, rH = 'fx', rZ--), arguments.length < rZ ? OE.queue(this[0], rH) : void 0 === rh ? this : this.each(function () {
        var rT = OE.queue(this, rH, rh);
        ;
        OE['_queueHooks'](this, rH);
        'fx' === rH && 'inprogress' !== rT[0] && OE.dequeue(this, rH);
      });
    },
    'dequeue': function (rH) {
      ;
      return this.each(function () {
        ;
        OE.dequeue(this, rH);
      });
    },
    'clearQueue': function (rH) {
      ;
      return this.queue(rH || 'fx', []);
    },
    'promise': function (rH, rh) {
      ;
      ;
      function rZ() {
        --rs || rp.resolveWith(rQ, [rQ]);
      }
      ;
      var rT, rs = 1, rp = OE.Deferred(), rQ = this, rJ = this.length;
      for ('string' != typeof rH && (rh = rH, rH = void 0), rH = rH || 'fx'; rJ--;) {
        (rT = OS.get(rQ[rJ], rH + 'queueHooks')) && rT.empty && (rs++, rT.empty.add(rZ));
      }
      return rZ(), rp.promise(rh);
    }
  });
  function Ou(rH, rh) {
    ;
    ;
    ;
    return 'none' === (rH = rh || rH).style.display || '' === rH.style.display && OE.contains(rH.ownerDocument, rH) && 'none' === OE.css(rH, 'display');
  }
  function On(rH, rh, rZ, rT) {
    var rs, rp = {
      disconnectedMatch: A4.call(j0, '*'),
      rJ: 1 < arguments.length ? Or.call(arguments) : rK
    };
    for (rs in rh)
      rp[rs] = rH.style[rs], rH.style[rs] = rh[rs];
    ;
    for (rs in (rZ = rZ.apply(rH, rT || []), rh))
      rH.style[rs] = rp[rs];
    ;
    return rZ;
  }
  var O9 = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, C0 = new RegExp('^(?:([+-])=|)(' + O9 + ')([a-z%]*)$', 'i'), C1 = [
    'Top',
    'Right',
    'Bottom',
    'Left'
  ];
  function C2(rH, rh, rZ, rT) {
    var rs, rp, rQ = 20, rJ = rT ? function () {
      ;
      return rT.cur();
    } : function () {
      ;
      return OE.css(rH, rh, '');
    }, rK = rJ(), rL = rZ && rZ[3] || (OE.cssNumber[rh] ? '' : 'px'), rS = (OE.cssNumber[rh] || 'px' !== rL && +rK) && C0.exec(OE.css(rH, rh));
    ;
    if (rS && rS[3] !== rL) {
      for (rL = rL || rS[3], rS = +(rK /= 2) || 1; rQ--;) {
        OE.style(rH, rh, rS + rL);
        (1 - rp) * (1 - (rp = rJ() / rK || 0.5)) <= 0 && (rQ = 0);
        rS /= rp;
      }
      OE.style(rH, rh, (rS *= 2) + rL);
      rZ = rZ || [];
    }
    ;
    return rZ && (rS = +rS || +rK || 0, rs = rZ[1] ? rS + (rZ[1] + 1) * rZ[2] : +rZ[2], rT) && (rT.unit = rL, rT.start = rS, rT.end = rs), rs;
  }
  var C3 = {};
  function C4(rH, rh) {
    ;
    ;
    for (var rZ, rT, rs, rp, rQ, rJ = [], rK = 0, rL = rH.length; rK < rL; rK++) {
      (rT = rH[rK]).style && (rZ = rT.style.display, rh ? ('none' === rZ && (rJ[rK] = OS.get(rT, 'display') || null, rJ[rK] || (rT.style.display = '')), '' === rT.style.display && Ou(rT) && (rJ[rK] = (rQ = rp = void 0, rp = (rs = rT).ownerDocument, rs = rs.nodeName, (rQ = C3[rs]) || (rp = rp.body.appendChild(rp.createElement(rs)), rQ = OE.css(rp, 'display'), rp.parentNode.removeChild(rp), C3[rs] = rQ = 'none' === rQ ? 'block' : rQ)))) : 'none' !== rZ && (rJ[rK] = 'none', OS.set(rT, 'display', rZ)));
    }
    for (rK = 0; rK < rL; rK++) {
      null != rJ[rK] && (rH[rK].style.display = rJ[rK]);
    }
    ;
    return rH;
  }
  OE.fn.extend({
    'show': function () {
      return C4(this, true);
    },
    'hide': function () {
      return C4(this);
    },
    'toggle': function (rH) {
      ;
      return 'boolean' == typeof rH ? rH ? this.show() : this.hide() : this.each(function () {
        ;
        ;
        Ou(this) ? OE(this).show() : OE(this).hide();
      });
    }
  });
  var C8 = {
    'option': [
      1,
      '<select multiple=\'multiple\'>',
      '</select>'
    ],
    'thead': [
      1,
      '<table>',
      '</table>'
    ],
    'col': [
      2,
      '<table><colgroup>',
      '</colgroup></table>'
    ],
    'tr': [
      2,
      '<table><tbody>',
      '</tbody></table>'
    ],
    'td': [
      3,
      '<table><tbody><tr>',
      '</tr></tbody></table>'
    ],
    '_default': [
      0,
      '',
      ''
    ]
  };
  function C9(rH, rh) {
    ;
    ;
    var rZ = void 0 !== rH.getElementsByTagName ? rH.getElementsByTagName(rh || '*') : void 0 !== rH.querySelectorAll ? rH.querySelectorAll(rh || '*') : [];
    return void 0 === rh || rh && OY(rH, rh) ? OE.merge([rH], rZ) : rZ;
  }
  function CO(rH, rh) {
    ;
    ;
    ;
    for (var rZ = 0, rT = rH.length; rZ < rT; rZ++) {
      OS.set(rH[rZ], 'globalEval', !rh || OS.get(rh[rZ], 'globalEval'));
    }
  }
  C8.optgroup = C8.option;
  C8.tbody = C8.tfoot = C8.colgroup = C8.caption = C8.thead;
  C8.th = C8.td;
  ;
  function Cr(rH, rh, rZ, rT, rs) {
    for (var rp, rQ, rJ, rK, rL, rS = rh.createDocumentFragment(), rx = [], ra = 0, rk = rH.length; ra < rk; ra++) {
      if ((rp = rH[ra]) || 0 === rp) {
        if ('object' === Og(rp)) {
          OE.merge(rx, rp.nodeType ? [rp] : rp);
        } else {
          if (/<|&#?\w+;/.test(rp)) {
            for (rQ = rQ || rS.appendChild(rh.createElement('div')), rJ = (/<([a-z][^\/\0>\x20\t\r\n\f]+)/i.exec(rp) || [
              '',
              ''
            ])[1].toLowerCase(), rJ = C8[rJ] || C8['_default'], rQ.innerHTML = rJ[1] + OE.htmlPrefilter(rp) + rJ[2], rL = rJ[0]; rL--;) {
              rQ = rQ.lastChild;
            }
            OE.merge(rx, rQ.childNodes);
            (rQ = rS.firstChild).textContent = '';
          } else {
            rx.push(rh.createTextNode(rp));
          }
        }
      }
    }
    ;
    ;
    for (rS.textContent = '', ra = 0; rp = rx[ra++];) {
      if (rT && -1 < OE.inArray(rp, rT)) {
        rs && rs.push(rp);
      } else {
        if (rK = OE.contains(rp.ownerDocument, rp), rQ = C9(rS.appendChild(rp), 'script'), rK && CO(rQ), rZ) {
          for (rL = 0; rp = rQ[rL++];) {
            /^$|^module$|\/(?:java|ecma)script/i.test(rp.type || '') && rZ.push(rp);
          }
        }
      }
    }
    ;
    return rS;
  }
  Cn = OO.createDocumentFragment().appendChild(OO.createElement('div'));
  (Cu = OO.createElement('input')).setAttribute('type', 'radio');
  Cu.setAttribute('checked', 'checked');
  Cu.setAttribute('name', 't');
  Cn.appendChild(Cu);
  ;
  Cn.innerHTML = '<textarea>x</textarea>';
  ;
  var CA = OO.documentElement;
  function Ci() {
    return true;
  }
  function Cq() {
    return false;
  }
  function CX() {
    try {
      return OO.activeElement;
    } catch (rH) {
    }
  }
  function Cl(rH, rh, rZ, rT, rs, rp) {
    ;
    var rQ, rJ;
    ;
    if ('object' == typeof rh) {
      for (rJ in ('string' != typeof rZ && (rT = rT || rZ, rZ = void 0), rh))
        Cl(rH, rJ, rZ, rT, rh[rJ], rp);
      return rH;
    }
    if (null == rT && null == rs ? (rs = rZ, rT = rZ = void 0) : null == rs && ('string' == typeof rZ ? (rs = rT, rT = void 0) : (rs = rT, rT = rZ, rZ = void 0)), false === rs) {
      rs = Cq;
    } else {
      if (!rs) {
        return rH;
      }
    }
    ;
    return 1 === rp && (rQ = rs, (rs = function (rK) {
      ;
      ;
      return OE().off(rK), rQ.apply(this, arguments);
    }).guid = rQ.guid || (rQ.guid = OE.guid++)), rH.each(function () {
      ;
      OE.event.add(this, rh, rs, rT, rZ);
    });
  }
  OE.event = {
    'global': {},
    'add': function (rH, rh, rZ, rT, rs) {
      ;
      ;
      var rp, rQ, rJ, rK, rL, rS, rx, ra, rk, rw = OS.get(rH);
      ;
      if (rw) {
        for (rZ.handler && (rZ = (rp = rZ).handler, rs = rp.selector), rs && OE.find.matchesSelector(CA, rs), rZ.guid || (rZ.guid = OE.guid++), rJ = (rJ = rw.events) || (rw.events = {}), rQ = (rQ = rw.handle) || (rw.handle = function (ru) {
          ;
          ;
          ;
          return void 0 !== OE && OE.event.triggered !== ru.type ? OE.event.dispatch.apply(rH, arguments) : void 0;
        }), rK = (rh = (rh || '').match(/[^\x20\t\r\n\f]+/g) || ['']).length; rK--;) {
          rx = rk = (ra = /^([^.]*)(?:\.(.+)|)/.exec(rh[rK]) || [])[1];
          ra = (ra[2] || '').split('.').sort();
          rx && (rL = OE.event.special[rx] || {}, rx = (rs ? rL.delegateType : rL.bindType) || rx, rL = OE.event.special[rx] || {}, rk = OE.extend({
            'type': rx,
            'origType': rk,
            'data': rT,
            'handler': rZ,
            'guid': rZ.guid,
            'selector': rs,
            'needsContext': rs && OE.expr.match.needsContext.test(rs),
            'namespace': ra.join('.')
          }, rp), (rS = rJ[rx]) || ((rS = rJ[rx] = []).delegateCount = 0, rL.setup && false !== rL.setup.call(rH, rT, ra, rQ)) || rH.addEventListener && rH.addEventListener(rx, rQ), rL.add && (rL.add.call(rH, rk), rk.handler.guid || (rk.handler.guid = rZ.guid)), rs ? rS.splice(rS.delegateCount++, 0, rk) : rS.push(rk), OE.event.global[rx] = true);
        }
      }
    },
    'remove': function (rH, rh, rZ, rT, rs) {
      ;
      ;
      var rp, rQ, rJ, rK, rL, rS, rx, ra, rk, rw, ru, rn = OS.hasData(rH) && OS.get(rH);
      ;
      if (rn && (rK = rn.events)) {
        for (rL = (rh = (rh || '').match(/[^\x20\t\r\n\f]+/g) || ['']).length; rL--;) {
          if (rk = ru = (rJ = /^([^.]*)(?:\.(.+)|)/.exec(rh[rL]) || [])[1], rw = (rJ[2] || '').split('.').sort(), rk) {
            for (rx = OE.event.special[rk] || {}, ra = rK[rk = (rT ? rx.delegateType : rx.bindType) || rk] || [], rJ = rJ[2] && new RegExp('(^|\\.)' + rw.join('\\.(?:.*\\.|)') + '(\\.|$)'), rQ = rp = ra.length; rp--;) {
              rS = ra[rp];
              !rs && ru !== rS.origType || rZ && rZ.guid !== rS.guid || rJ && !rJ.test(rS.namespace) || rT && rT !== rS.selector && ('**' !== rT || !rS.selector) || (ra.splice(rp, 1), rS.selector && ra.delegateCount--, rx.remove && rx.remove.call(rH, rS));
            }
            rQ && !ra.length && (rx.teardown && false !== rx.teardown.call(rH, rw, rn.handle) || OE.removeEvent(rH, rk, rn.handle), delete rK[rk]);
          } else {
            for (rk in rK)
              OE.event.remove(rH, rk + rh[rL], rZ, rT, true);
          }
        }
        OE.isEmptyObject(rK) && OS.remove(rH, 'handle events');
      }
    },
    'dispatch': function (rH) {
      ;
      ;
      var rh, rZ, rT, rs, rp, rQ = OE.event.fix(rH), rJ = new Array(arguments.length), rH = (OS.get(this, 'events') || {})[rQ.type] || [], rK = OE.event.special[rQ.type] || {};
      for (rJ[0] = rQ, rh = 1; rh < arguments.length; rh++) {
        ;
      }
      ;
      if (rQ.delegateTarget = this, !rK.preDispatch || false !== rK.preDispatch.call(this, rQ)) {
        for (rp = OE.event.handlers.call(this, rQ, rH), rh = 0; (rT = rp[rh++]) && !rQ.isPropagationStopped();) {
          for (rQ.currentTarget = rT.elem, rZ = 0; (rs = rT.handlers[rZ++]) && !rQ.isImmediatePropagationStopped();) {
            rQ.rnamespace && !rQ.rnamespace.test(rs.namespace) || (rQ.handleObj = rs, rQ.data = rs.data, void 0 !== (rs = ((OE.event.special[rs.origType] || {}).handle || rs.handler).apply(rT.elem, rJ)) && false === (rQ.result = rs) && (rQ.preventDefault(), rQ.stopPropagation()));
          }
        }
        return rK.postDispatch && rK.postDispatch.call(this, rQ), rQ.result;
      }
    },
    'handlers': function (rH, rh) {
      ;
      var rZ, rT, rs, rp, rQ, rJ = [], rK = rh.delegateCount, rL = rH.target;
      ;
      if (rK && rL.nodeType && !('click' === rH.type && 1 <= rH.button)) {
        for (; rL !== this; rL = rL.parentNode || this) {
          if (1 === rL.nodeType && ('click' !== rH.type || true !== rL.disabled)) {
            for (rp = [], rQ = {}, rZ = 0; rZ < rK; rZ++) {
              void 0 === rQ[rs = (rT = rh[rZ]).selector + ' '] && (rQ[rs] = rT.needsContext ? -1 < OE(rs, this).index(rL) : OE.find(rs, this, null, [rL]).length);
              rQ[rs] && rp.push(rT);
            }
            rp.length && rJ.push({
              'elem': rL,
              'handlers': rp
            });
          }
        }
      }
      ;
      return rL = this, rK < rh.length && rJ.push({
        'elem': rL,
        'handlers': rh.slice(rK)
      }), rJ;
    },
    'addProp': function (rH, rh) {
      ;
      ;
      Object.defineProperty(OE.Event.prototype, rH, {
        'enumerable': true,
        'configurable': true,
        'get': O7(rh) ? function () {
          ;
          ;
          if (this.originalEvent) {
            return rh(this.originalEvent);
          }
        } : function () {
          ;
          if (this.originalEvent) {
            return this.originalEvent[rH];
          }
        },
        'set': function (rZ) {
          ;
          Object.defineProperty(this, rH, {
            'enumerable': true,
            'configurable': true,
            'writable': true,
            'value': rZ
          });
        }
      });
    },
    'fix': function (rH) {
      ;
      return rH[OE.expando] ? rH : new OE.Event(rH);
    },
    'special': {
      'load': { 'noBubble': true },
      'focus': {
        'trigger': function () {
          ;
          if (this !== CX() && this.focus) {
            return this.focus(), false;
          }
        },
        'delegateType': 'focusin'
      },
      'blur': {
        'trigger': function () {
          ;
          if (this === CX() && this.blur) {
            return this.blur(), false;
          }
        },
        'delegateType': 'focusout'
      },
      'click': {
        'trigger': function () {
          ;
          ;
          ;
          if ('checkbox' === this.type && this.click && OY(this, 'input')) {
            return this.click(), false;
          }
        },
        '_default': function (rH) {
          ;
          return OY(rH.target, 'a');
        }
      },
      'beforeunload': {
        'postDispatch': function (rH) {
          ;
          ;
          ;
          void 0 !== rH.result && rH.originalEvent && (rH.originalEvent.returnValue = rH.result);
        }
      }
    }
  };
  OE.removeEvent = function (rH, rh, rZ) {
    ;
    rH.removeEventListener && rH.removeEventListener(rh, rZ);
  };
  OE.Event = function (rH, rh) {
    ;
    if (!(this instanceof OE.Event)) {
      return new OE.Event(rH, rh);
    }
    ;
    ;
    rH && rH.type ? (this.originalEvent = rH, this.type = rH.type, this.isDefaultPrevented = rH.defaultPrevented || void 0 === rH.defaultPrevented && false === rH.returnValue ? Ci : Cq, this.target = rH.target && 3 === rH.target.nodeType ? rH.target.parentNode : rH.target, this.currentTarget = rH.currentTarget, this.relatedTarget = rH.relatedTarget) : this.type = rH;
    rh && OE.extend(this, rh);
    this.timeStamp = rH && rH.timeStamp || Date.now();
    this[OE.expando] = true;
  };
  OE.Event.prototype = {
    'constructor': OE.Event,
    'isDefaultPrevented': Cq,
    'isPropagationStopped': Cq,
    'isImmediatePropagationStopped': Cq,
    'isSimulated': false,
    'preventDefault': function () {
      ;
      var rH = this.originalEvent;
      ;
      ;
      this.isDefaultPrevented = Ci;
      rH && !this.isSimulated && rH.preventDefault();
    },
    'stopPropagation': function () {
      var rH = this.originalEvent;
      ;
      ;
      this.isPropagationStopped = Ci;
      rH && !this.isSimulated && rH.stopPropagation();
    },
    'stopImmediatePropagation': function () {
      var rH = this.originalEvent;
      ;
      ;
      this.isImmediatePropagationStopped = Ci;
      rH && !this.isSimulated && rH.stopImmediatePropagation();
      this.stopPropagation();
    }
  };
  OE.each({
    'altKey': true,
    'bubbles': true,
    'cancelable': true,
    'changedTouches': true,
    'ctrlKey': true,
    'detail': true,
    'eventPhase': true,
    'metaKey': true,
    'pageX': true,
    'pageY': true,
    'shiftKey': true,
    'view': true,
    'char': true,
    'charCode': true,
    'key': true,
    'keyCode': true,
    'button': true,
    'buttons': true,
    'clientX': true,
    'clientY': true,
    'offsetX': true,
    'offsetY': true,
    'pointerId': true,
    'pointerType': true,
    'screenX': true,
    'screenY': true,
    'targetTouches': true,
    'toElement': true,
    'touches': true,
    'which': function (rH) {
      var rh = rH.button;
      ;
      ;
      return null == rH.which && /^key/.test(rH.type) ? null != rH.charCode ? rH.charCode : rH.keyCode : !rH.which && void 0 !== rh && /^(?:mouse|pointer|contextmenu|drag|drop)|click/.test(rH.type) ? 1 & rh ? 1 : 2 & rh ? 3 : 4 & rh ? 2 : 0 : rH.which;
    }
  }, OE.event.addProp);
  OE.each({
    'mouseenter': 'mouseover',
    'mouseleave': 'mouseout',
    'pointerenter': 'pointerover',
    'pointerleave': 'pointerout'
  }, function (rH, rh) {
    ;
    ;
    OE.event.special[rH] = {
      'delegateType': rh,
      'bindType': rh,
      'handle': function (rZ) {
        ;
        var rT, rs = rZ.relatedTarget, rp = rZ.handleObj;
        ;
        ;
        return rs && (rs === this || OE.contains(this, rs)) || (rZ.type = rp.origType, rT = rp.handler.apply(this, arguments), rZ.type = rh), rT;
      }
    };
  });
  OE.fn.extend({
    'on': function (rH, rh, rZ, rT) {
      return Cl(this, rH, rh, rZ, rT);
    },
    'one': function (rH, rh, rZ, rT) {
      return Cl(this, rH, rh, rZ, rT, 1);
    },
    'off': function (rH, rh, rZ) {
      ;
      ;
      var rT, rs;
      ;
      if (rH && rH.preventDefault && rH.handleObj) {
        rT = rH.handleObj;
        OE(rH.delegateTarget).off(rT.namespace ? rT.origType + '.' + rT.namespace : rT.origType, rT.selector, rT.handler);
      } else {
        if ('object' != typeof rH) {
          return false !== rh && 'function' != typeof rh || (rZ = rh, rh = void 0), false === rZ && (rZ = Cq), this.each(function () {
            ;
            ;
            OE.event.remove(this, rH, rZ, rh);
          });
        }
        for (rs in rH)
          this.off(rs, rh, rH[rs]);
      }
      return this;
    }
  });
  ;
  function CE(rH, rh) {
    ;
    ;
    return OY(rH, 'table') && OY(11 !== rh.nodeType ? rh : rh.firstChild, 'tr') && OE(rH).children('tbody')[0] || rH;
  }
  function Cv(rH) {
    ;
    ;
    return rH.type = (null !== rH.getAttribute('type')) + '/' + rH.type, rH;
  }
  function Cb(rH) {
    ;
    ;
    ;
    return 'true/' === (rH.type || '').slice(0, 5) ? rH.type = rH.type.slice(5) : rH.removeAttribute('type'), rH;
  }
  function CF(rH, rh) {
    ;
    ;
    ;
    var rZ, rT, rs, rp, rQ, rJ;
    if (1 === rh.nodeType) {
      if (OS.hasData(rH) && (rp = OS.access(rH), rQ = OS.set(rh, rp), rJ = rp.events)) {
        for (rs in (delete rQ.handle, rQ.events = {}, rJ))
          for (rZ = 0, rT = rJ[rs].length; rZ < rT; rZ++) {
            OE.event.add(rh, rs, rJ[rs][rZ]);
          }
      }
      Ox.hasData(rH) && (rp = Ox.access(rH), rQ = OE.extend({}, rp), Ox.set(rh, rQ));
    }
  }
  function CP(rH, rh, rZ, rT) {
    ;
    rh = OA.apply([], rh);
    var rs, rp, rQ, rJ, rK, rL, rS = 0, rx = rH.length, ra = rx - 1, rk = rh[0], rw = O7(rk);
    if (rw || 1 < rx && 'string' == typeof rk && !Oz.checkClone && /checked\s*(?:[^=]|=\s*.checked.)/i.test(rk)) {
      return rH.each(function (ru) {
        var rn = rH.eq(ru);
        rw && (rh[0] = rk.call(this, ru, rn.html()));
        CP(rn, rh, rZ, rT);
      });
    }
    ;
    ;
    if (rx && (rp = (rs = Cr(rh, rH[0].ownerDocument, false, rH, rT)).firstChild, 1 === rs.childNodes.length && (rs = rp), rp || rT)) {
      for (rJ = (rQ = OE.map(C9(rs, 'script'), Cv)).length; rS < rx; rS++) {
        rK = rs;
        rS !== ra && (rK = OE.clone(rK, true, true), rJ) && OE.merge(rQ, C9(rK, 'script'));
        rZ.call(rH[rS], rK, rS);
      }
      if (rJ) {
        for (rL = rQ[rQ.length - 1].ownerDocument, OE.map(rQ, Cb), rS = 0; rS < rJ; rS++) {
          rK = rQ[rS];
          /^$|^module$|\/(?:java|ecma)script/i.test(rK.type || '') && !OS.access(rK, 'globalEval') && OE.contains(rL, rK) && (rK.src && 'module' !== (rK.type || '').toLowerCase() ? OE['_evalUrl'] && OE['_evalUrl'](rK.src) : Od(rK.textContent.replace(/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, ''), rL, rK));
        }
      }
    }
    return rH;
  }
  function Cc(rH, rh, rZ) {
    ;
    ;
    ;
    for (var rT, rs = rh ? OE.filter(rh, rH) : rH, rp = 0; null != (rT = rs[rp]); rp++) {
      rZ || 1 !== rT.nodeType || OE.cleanData(C9(rT));
      rT.parentNode && (rZ && OE.contains(rT.ownerDocument, rT) && CO(C9(rT, 'script')), rT.parentNode.removeChild(rT));
    }
    return rH;
  }
  OE.extend({
    'htmlPrefilter': function (rH) {
      ;
      ;
      return rH.replace(/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi, '<$1></$2>');
    },
    'clone': function (rH, rh, rZ) {
      ;
      var rT, rs, rp, rQ, rJ, rK, rL, rS = rH.cloneNode(true), rx = OE.contains(rH.ownerDocument, rH);
      ;
      ;
      if (!(Oz.noCloneChecked || 1 !== rH.nodeType && 11 !== rH.nodeType || OE.isXMLDoc(rH))) {
        for (rQ = C9(rS), rT = 0, rs = (rp = C9(rH)).length; rT < rs; rT++) {
          rJ = rp[rT];
          rK = rQ[rT];
          rL = void 0;
          'input' === (rL = rK.nodeName.toLowerCase()) && /^(?:checkbox|radio)$/i.test(rJ.type) ? rK.checked = rJ.checked : 'input' !== rL && 'textarea' !== rL || (rK.defaultValue = rJ.defaultValue);
        }
      }
      if (rh) {
        if (rZ) {
          for (rp = rp || C9(rH), rQ = rQ || C9(rS), rT = 0, rs = rp.length; rT < rs; rT++) {
            CF(rp[rT], rQ[rT]);
          }
        } else {
          CF(rH, rS);
        }
      }
      return 0 < (rQ = C9(rS, 'script')).length && CO(rQ, !rx && C9(rH, 'script')), rS;
    },
    'cleanData': function (rH) {
      ;
      ;
      ;
      for (var rh, rZ, rT, rs = OE.event.special, rp = 0; void 0 !== (rZ = rH[rp]); rp++) {
        if (OK(rZ)) {
          if (rh = rZ[OS.expando]) {
            if (rh.events) {
              for (rT in rh.events)
                rs[rT] ? OE.event.remove(rZ, rT) : OE.removeEvent(rZ, rT, rh.handle);
            }
            rZ[OS.expando] = void 0;
          }
          rZ[Ox.expando] && (rZ[Ox.expando] = void 0);
        }
      }
    }
  });
  OE.fn.extend({
    'detach': function (rH) {
      return Cc(this, rH, true);
    },
    'remove': function (rH) {
      return Cc(this, rH);
    },
    'text': function (rH) {
      return OT(this, function (rh) {
        ;
        ;
        return void 0 === rh ? OE.text(this) : this.empty().each(function () {
          ;
          ;
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = rh);
        });
      }, null, rH, arguments.length);
    },
    'append': function () {
      return CP(this, arguments, function (rH) {
        ;
        ;
        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || CE(this, rH).appendChild(rH);
      });
    },
    'prepend': function () {
      return CP(this, arguments, function (rH) {
        ;
        ;
        var rh;
        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (rh = CE(this, rH)).insertBefore(rH, rh.firstChild);
      });
    },
    'before': function () {
      return CP(this, arguments, function (rH) {
        ;
        this.parentNode && this.parentNode.insertBefore(rH, this);
      });
    },
    'after': function () {
      return CP(this, arguments, function (rH) {
        ;
        ;
        this.parentNode && this.parentNode.insertBefore(rH, this.nextSibling);
      });
    },
    'empty': function () {
      for (var rH, rh = 0; null != (rH = this[rh]); rh++) {
        1 === rH.nodeType && (OE.cleanData(C9(rH, false)), rH.textContent = '');
      }
      ;
      return this;
    },
    'clone': function (rH, rh) {
      ;
      return rH = null != rH && rH, rh = null == rh ? rH : rh, this.map(function () {
        ;
        return OE.clone(this, rH, rh);
      });
    },
    'html': function (rH) {
      return OT(this, function (rh) {
        ;
        var rZ = this[0] || {}, rT = 0, rs = this.length;
        if (void 0 === rh && 1 === rZ.nodeType) {
          return rZ.innerHTML;
        }
        ;
        if ('string' == typeof rh && !/<script|<style|<link/i.test(rh) && !C8[(/<([a-z][^\/\0>\x20\t\r\n\f]+)/i.exec(rh) || [
          '',
          ''
        ])[1].toLowerCase()]) {
          rh = OE.htmlPrefilter(rh);
          try {
            for (; rT < rs; rT++) {
              1 === (rZ = this[rT] || {}).nodeType && (OE.cleanData(C9(rZ, false)), rZ.innerHTML = rh);
            }
            rZ = 0;
          } catch (rp) {
          }
        }
        ;
        rZ && this.empty().append(rh);
      }, null, rH, arguments.length);
    },
    'replaceWith': function () {
      var rH = [];
      return CP(this, arguments, function (rh) {
        ;
        ;
        ;
        var rZ = this.parentNode;
        OE.inArray(this, rH) < 0 && (OE.cleanData(C9(this)), rZ) && rZ.replaceChild(rh, this);
      }, rH);
    }
  });
  OE.each({
    'appendTo': 'append',
    'prependTo': 'prepend',
    'insertBefore': 'before',
    'insertAfter': 'after',
    'replaceAll': 'replaceWith'
  }, function (rH, rh) {
    OE.fn[rH] = function (rZ) {
      ;
      ;
      ;
      for (var rT, rs = [], rp = OE(rZ), rQ = rp.length - 1, rJ = 0; rJ <= rQ; rJ++) {
        rT = rJ === rQ ? this : this.clone(true);
        OE(rp[rJ])[rh](rT);
        Oj.apply(rs, rT.get());
      }
      return this.pushStack(rs);
    };
  });
  function CY(rH) {
    ;
    ;
    var rh = rH.ownerDocument.defaultView;
    return (rh = rh && rh.opener ? rh : O5).getComputedStyle(rH);
  }
  var CM, CG, Co, CD, Cf, CN, Cm, CW = new RegExp('^(' + O9 + ')(?!px)[a-z%]+$', 'i'), CB = new RegExp(C1.join('|'), 'i');
  function Cy() {
    ;
    ;
    var rH;
    ;
    Cm && (CN.style.cssText = 'position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0', Cm.style.cssText = 'position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%', CA.appendChild(CN).appendChild(Cm), rH = O5.getComputedStyle(Cm), CM = '1%' !== rH.top, Cf = 12 === CV(rH.marginLeft), Cm.style.right = '60%', CD = 36 === CV(rH.right), CG = 36 === CV(rH.width), Cm.style.position = 'absolute', Co = 36 === Cm.offsetWidth || 'absolute', CA.removeChild(CN), Cm = null);
  }
  function CV(rH) {
    return Math.round(parseFloat(rH));
  }
  function CH(rH, rh, rZ) {
    ;
    var rT, rs, rp = rH.style;
    ;
    ;
    return (rZ = rZ || CY(rH)) && ('' !== (rs = rZ.getPropertyValue(rh) || rZ[rh]) || OE.contains(rH.ownerDocument, rH) || (rs = OE.style(rH, rh)), !Oz.pixelBoxStyles()) && CW.test(rs) && CB.test(rh) && (rH = rp.width, rh = rp.minWidth, rT = rp.maxWidth, rp.minWidth = rp.maxWidth = rp.width = rs, rs = rZ.width, rp.width = rH, rp.minWidth = rh, rp.maxWidth = rT), void 0 !== rs ? rs + '' : rs;
  }
  ;
  function Ch(rH, rh) {
    return {
      'get': function () {
        if (!rH()) {
          return (this.get = rh).apply(this, arguments);
        }
        ;
        delete this.get;
      }
    };
  }
  CN = OO.createElement('div');
  (Cm = OO.createElement('div')).style && (Cm.style.backgroundClip = 'content-box', Cm.cloneNode(true).style.backgroundClip = '', Oz.clearCloneStyle = 'content-box' === Cm.style.backgroundClip, OE.extend(Oz, {
    'boxSizingReliable': function () {
      return Cy(), CG;
    },
    'pixelBoxStyles': function () {
      return Cy(), CD;
    },
    'pixelPosition': function () {
      return Cy(), CM;
    },
    'reliableMarginLeft': function () {
      return Cy(), Cf;
    },
    'scrollboxSize': function () {
      return Cy(), Co;
    }
  }));
  var Cs = {
    'position': 'absolute',
    'visibility': 'hidden',
    'display': 'block'
  }, Cp = {
    'letterSpacing': '0',
    'fontWeight': '400'
  }, CQ = [
    'Webkit',
    'Moz',
    'ms'
  ], CJ = OO.createElement('div').style;
  ;
  function CK(rH) {
    ;
    return OE.cssProps[rH] || (OE.cssProps[rH] = function (rh) {
      if (rh in CJ) {
        return rh;
      }
      ;
      for (var rZ = rh[0].toUpperCase() + rh.slice(1), rT = CQ.length; rT--;) {
        if ((rh = CQ[rT] + rZ) in CJ) {
          return rh;
        }
      }
    }(rH) || rH);
  }
  function CL(rH, rh, rZ) {
    var rT = C0.exec(rh);
    ;
    return rT ? Math.max(0, rT[2] - (rZ || 0)) + (rT[3] || 'px') : rh;
  }
  function CS(rH, rh, rZ, rT, rs, rp) {
    ;
    var rQ = 'width' === rh ? 1 : 0, rJ = 0, rK = 0;
    ;
    if (rZ === (rT ? 'border' : 'content')) {
      return 0;
    }
    for (; rQ < 4; rQ += 2) {
      'margin' === rZ && (rK += OE.css(rH, rZ + C1[rQ], true, rs));
      rT ? ('content' === rZ && (rK -= OE.css(rH, 'padding' + C1[rQ], true, rs)), 'margin' !== rZ && (rK -= OE.css(rH, 'border' + C1[rQ] + 'Width', true, rs))) : (rK += OE.css(rH, 'padding' + C1[rQ], true, rs), 'padding' !== rZ ? rK += OE.css(rH, 'border' + C1[rQ] + 'Width', true, rs) : rJ += OE.css(rH, 'border' + C1[rQ] + 'Width', true, rs));
    }
    ;
    return !rT && 0 <= rp && (rK += Math.max(0, Math.ceil(rH['offset' + rh[0].toUpperCase() + rh.slice(1)] - rp - rK - rJ - 0.5))), rK;
  }
  function Cx(rH, rh, rZ) {
    ;
    ;
    ;
    var rT = CY(rH), rs = CH(rH, rh, rT), rp = 'border-box' === OE.css(rH, 'boxSizing', false, rT), rQ = rp;
    if (CW.test(rs)) {
      if (!rZ) {
        return rs;
      }
      rs = 'auto';
    }
    return rQ = rQ && (Oz.boxSizingReliable() || rs === rH.style[rh]), 'auto' !== rs && (parseFloat(rs) || 'inline' !== OE.css(rH, 'display', false, rT)) || (rs = rH['offset' + rh[0].toUpperCase() + rh.slice(1)], rQ = true), (rs = parseFloat(rs) || 0) + CS(rH, rh, rZ || (rp ? 'border' : 'content'), rQ, rT, rs) + 'px';
  }
  function Ca(rH, rh, rZ, rT, rs) {
    ;
    return new Ca.prototype.init(rH, rh, rZ, rT, rs);
  }
  OE.extend({
    'cssHooks': {
      'opacity': {
        'get': function (rH, rh) {
          ;
          if (rh) {
            return '' === (rh = CH(rH, 'opacity')) ? '1' : rh;
          }
        }
      }
    },
    'cssNumber': {
      'animationIterationCount': true,
      'columnCount': true,
      'fillOpacity': true,
      'flexGrow': true,
      'flexShrink': true,
      'fontWeight': true,
      'lineHeight': true,
      'opacity': true,
      'order': true,
      'orphans': true,
      'widows': true,
      'zIndex': true,
      'zoom': true
    },
    'cssProps': {},
    'style': function (rH, rh, rZ, rT) {
      ;
      ;
      ;
      if (rH && 3 !== rH.nodeType && 8 !== rH.nodeType && rH.style) {
        var rs, rp, rQ, rJ = OJ(rh), rK = /^--/.test(rh), rL = rH.style;
        if (rK || (rh = CK(rJ)), rQ = OE.cssHooks[rh] || OE.cssHooks[rJ], void 0 === rZ) {
          return rQ && 'get' in rQ && void 0 !== (rs = rQ.get(rH, false, rT)) ? rs : rL[rh];
        }
        'string' == (rp = typeof rZ) && (rs = C0.exec(rZ)) && rs[1] && (rZ = C2(rH, rh, rs), rp = 'number');
        null != rZ && rZ == rZ && ('number' === rp && (rZ += rs && rs[3] || (OE.cssNumber[rJ] ? '' : 'px')), Oz.clearCloneStyle || '' !== rZ || 0 !== rh.indexOf('background') || (rL[rh] = 'inherit'), rQ && 'set' in rQ && void 0 === (rZ = rQ.set(rH, rZ, rT)) || (rK ? rL.setProperty(rh, rZ) : rL[rh] = rZ));
      }
    },
    'css': function (rH, rh, rZ, rT) {
      ;
      ;
      var rs, rp = OJ(rh);
      return /^--/.test(rh) || (rh = CK(rp)), 'normal' === (rs = void 0 === (rs = (rp = OE.cssHooks[rh] || OE.cssHooks[rp]) && 'get' in rp ? rp.get(rH, true, rZ) : rs) ? CH(rH, rh, rT) : rs) && rh in Cp && (rs = Cp[rh]), ('' === rZ || rZ) && (rp = parseFloat(rs), true === rZ || isFinite(rp)) ? rp || 0 : rs;
    }
  });
  OE.each([
    'height',
    'width'
  ], function (rH, rh) {
    ;
    OE.cssHooks[rh] = {
      'get': function (rZ, rT, rs) {
        ;
        ;
        ;
        if (rT) {
          return !/^(none|table(?!-c[ea]).+)/.test(OE.css(rZ, 'display')) || rZ.getClientRects().length && rZ.getBoundingClientRect().width ? Cx(rZ, rh, rs) : On(rZ, Cs, function () {
            return Cx(rZ, rh, rs);
          });
        }
      },
      'set': function (rZ, rT, rs) {
        ;
        ;
        var rp = CY(rZ), rQ = 'border-box' === OE.css(rZ, 'boxSizing', false, rp), rs = rs && CS(rZ, rh, rs, rQ, rp);
        ;
        return rQ && Oz.scrollboxSize() === rp.position && (rs -= Math.ceil(rZ['offset' + rh[0].toUpperCase() + rh.slice(1)] - parseFloat(rp[rh]) - CS(rZ, rh, 'border', false, rp) - 0.5)), rs && (rQ = C0.exec(rT)) && 'px' !== (rQ[3] || 'px') && (rZ.style[rh] = rT, rT = OE.css(rZ, rh)), CL(0, rT, rs);
      }
    };
  });
  OE.cssHooks.marginLeft = Ch(Oz.reliableMarginLeft, function (rH, rh) {
    ;
    if (rh) {
      return (parseFloat(CH(rH, 'marginLeft')) || rH.getBoundingClientRect().left - On(rH, { 'marginLeft': 0 }, function () {
        ;
        return rH.getBoundingClientRect().left;
      })) + 'px';
    }
  });
  OE.each({
    'margin': '',
    'padding': '',
    'border': 'Width'
  }, function (rH, rh) {
    ;
    OE.cssHooks[rH + rh] = {
      'expand': function (rZ) {
        for (var rT = 0, rs = {}, rp = 'string' == typeof rZ ? rZ.split(' ') : [rZ]; rT < 4; rT++) {
          rs[rH + C1[rT] + rh] = rp[rT] || rp[rT - 2] || rp[0];
        }
        ;
        return rs;
      }
    };
    'margin' !== rH && (OE.cssHooks[rH + rh].set = CL);
  });
  OE.fn.extend({
    'css': function (rH, rh) {
      ;
      return OT(this, function (rZ, rT, rs) {
        ;
        ;
        var rp, rQ, rJ = { rh: arguments[rh] }, rK = 0;
        if (Array.isArray(rT)) {
          for (rp = CY(rZ), rQ = rT.length; rK < rQ; rK++) {
            rJ[rT[rK]] = OE.css(rZ, rT[rK], false, rp);
          }
          return rJ;
        }
        return void 0 !== rs ? OE.style(rZ, rT, rs) : OE.css(rZ, rT);
      }, rH, rh, 1 < arguments.length);
    }
  });
  ((OE.Tween = Ca).prototype = {
    'constructor': Ca,
    'init': function (rH, rh, rZ, rT, rs, rp) {
      ;
      ;
      ;
      this.elem = rH;
      this.prop = rZ;
      this.easing = rs || OE.easing['_default'];
      this.options = rh;
      this.start = this.now = this.cur();
      this.end = rT;
      this.unit = rp || (OE.cssNumber[rZ] ? '' : 'px');
    },
    'cur': function () {
      ;
      ;
      ;
      var rH = Ca.propHooks[this.prop];
      return (rH && rH.get ? rH : Ca.propHooks['_default']).get(this);
    },
    'run': function (rH) {
      ;
      ;
      ;
      var rh, rZ = Ca.propHooks[this.prop];
      return this.options.duration ? this.pos = rh = OE.easing[this.easing](rH, this.options.duration * rH, 0, 1, this.options.duration) : this.pos = rh = rH, this.now = (this.end - this.start) * rh + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), (rZ && rZ.set ? rZ : Ca.propHooks['_default']).set(this), this;
    }
  }).init.prototype = Ca.prototype;
  (Ca.propHooks = {
    '_default': {
      'get': function (rH) {
        ;
        ;
        ;
        return 1 !== rH.elem.nodeType || null != rH.elem[rH.prop] && null == rH.elem.style[rH.prop] ? rH.elem[rH.prop] : (rH = OE.css(rH.elem, rH.prop, '')) && 'auto' !== rH ? rH : 0;
      },
      'set': function (rH) {
        ;
        ;
        ;
        OE.fx.step[rH.prop] ? OE.fx.step[rH.prop](rH) : 1 !== rH.elem.nodeType || null == rH.elem.style[OE.cssProps[rH.prop]] && !OE.cssHooks[rH.prop] ? rH.elem[rH.prop] = rH.now : OE.style(rH.elem, rH.prop, rH.now + rH.unit);
      }
    }
  }).scrollTop = Ca.propHooks.scrollLeft = {
    'set': function (rH) {
      ;
      ;
      ;
      rH.elem.nodeType && rH.elem.parentNode && (rH.elem[rH.prop] = rH.now);
    }
  };
  OE.easing = {
    'linear': function (rH) {
      return rH;
    },
    'swing': function (rH) {
      return 0.5 - Math.cos(rH * Math.PI) / 2;
    },
    '_default': 'swing'
  };
  OE.fx = Ca.prototype.init;
  OE.fx.step = {};
  ;
  var Ck, Cw, Cu, Cn;
  function r2() {
    ;
    ;
    ;
    Cw && (false === OO.hidden && O5.requestAnimationFrame ? O5.requestAnimationFrame(r2) : O5.setTimeout(r2, OE.fx.interval), OE.fx.tick());
  }
  function r3() {
    ;
    ;
    return O5.setTimeout(function () {
      Ck = void 0;
    }), Ck = Date.now();
  }
  function r4(rH, rh) {
    var rZ, rT = 0, rs = { 'height': rH };
    ;
    for (rh = rh ? 1 : 0; rT < 4; rT += 2 - rh) {
      rs['margin' + (rZ = C1[rT])] = rs['padding' + rZ] = rH;
    }
    ;
    return rh && (rs.opacity = rs.width = rH), rs;
  }
  function r5(rH, rh, rZ) {
    ;
    ;
    ;
    for (var rT, rs = (r6.tweeners[rh] || []).concat(r6.tweeners['*']), rp = 0, rQ = rs.length; rp < rQ; rp++) {
      if (rT = rs[rp].call(rZ, rh, rH)) {
        return rT;
      }
    }
  }
  function r6(rH, rh, rZ) {
    var rT, rs, rp, rQ, rJ, rK, rL, rS = 0, rx = r6.prefilters.length, ra = OE.Deferred().always(function () {
      delete rk.elem;
    }), rk = function () {
      ;
      ;
      if (rs) {
        return false;
      }
      ;
      for (var A1 = Ck || r3(), A1 = Math.max(0, rw.startTime + rw.duration - A1), A2 = 1 - (A1 / rw.duration || 0), A3 = 0, A4 = rw.tweens.length; A3 < A4; A3++) {
        rw.tweens[A3].run(A2);
      }
      return ra.notifyWith(rH, [
        rw,
        A2,
        A1
      ]), A2 < 1 && A4 ? A1 : (A4 || ra.notifyWith(rH, [
        rw,
        1,
        0
      ]), ra.resolveWith(rH, [rw]), false);
    }, rw = ra.promise({
      'elem': rH,
      'props': OE.extend({}, rh),
      'opts': OE.extend(true, {
        'specialEasing': {},
        'easing': OE.easing['_default']
      }, rZ),
      'originalProperties': rh,
      'originalOptions': rZ,
      'startTime': Ck || r3(),
      'duration': rZ.duration,
      'tweens': [],
      'createTween': function (A1, A2) {
        A2 = OE.Tween(rH, rw.opts, A1, A2, rw.opts.specialEasing[A1] || rw.opts.easing);
        ;
        ;
        return rw.tweens.push(A2), A2;
      },
      'stop': function (A1) {
        ;
        ;
        var A2 = 0, A3 = A1 ? rw.tweens.length : 0;
        if (!rs) {
          for (rs = true; A2 < A3; A2++) {
            rw.tweens[A2].run(1);
          }
          A1 ? (ra.notifyWith(rH, [
            rw,
            1,
            0
          ]), ra.resolveWith(rH, [
            rw,
            A1
          ])) : ra.rejectWith(rH, [
            rw,
            A1
          ]);
        }
        return this;
      }
    }), ru = rw.props, rn = ru, A0 = rw.opts.specialEasing;
    for (rp in rn)
      if (rQ = OJ(rp), rJ = A0[rQ], rK = rn[rp], Array.isArray(rK) && (rJ = rK[1], rK = rn[rp] = rK[0]), rp !== rQ && (rn[rQ] = rK, delete rn[rp]), (rL = OE.cssHooks[rQ]) && 'expand' in rL) {
        for (rp in (rK = rL.expand(rK), delete rn[rQ], rK))
          rp in rn || (rn[rp] = rK[rp], A0[rp] = rJ);
      } else {
        ;
      }
    for (; rS < rx; rS++) {
      if (rT = r6.prefilters[rS].call(rw, rH, ru, rw.opts)) {
        return O7(rT.stop) && (OE['_queueHooks'](rw.elem, rw.opts.queue).stop = rT.stop.bind(rT)), rT;
      }
    }
    ;
    ;
    ;
    return OE.map(ru, r5, rw), O7(rw.opts.start) && rw.opts.start.call(rH, rw), rw.progress(rw.opts.progress).done(rw.opts.done, rw.opts.complete).fail(rw.opts.fail).always(rw.opts.always), OE.fx.timer(OE.extend(rk, {
      'elem': rH,
      'anim': rw,
      'queue': rw.opts.queue
    })), rw;
  }
  OE.Animation = OE.extend(r6, {
    'tweeners': {
      '*': [function (rH, rh) {
        ;
        ;
        var rZ = this.createTween(rH, rh);
        return C2(rZ.elem, rH, C0.exec(rh), rZ), rZ;
      }]
    },
    'tweener': function (rH, rh) {
      ;
      ;
      ;
      for (var rZ, rT = 0, rs = (rH = O7(rH) ? (rh = rH, ['*']) : rH.match(/[^\x20\t\r\n\f]+/g)).length; rT < rs; rT++) {
        rZ = rH[rT];
        r6.tweeners[rZ] = r6.tweeners[rZ] || [];
        r6.tweeners[rZ].unshift(rh);
      }
    },
    'prefilters': [function (rH, rh, rZ) {
      var rT, rs, rp, rQ, rJ, rK, rL, rS = 'width' in rh || 'height' in rh, rx = this, ra = { rT: ru && ru[rT] || OE.style(rH, rT) }, rk = rH.style, rw = rH.nodeType && Ou(rH), ru = OS.get(rH, 'fxshow');
      ;
      ;
      for (rT in (rZ.queue || (null == (rQ = OE['_queueHooks'](rH, 'fx')).unqueued && (rQ.unqueued = 0, rJ = rQ.empty.fire, rQ.empty.fire = function () {
        rQ.unqueued || rJ();
      }), rQ.unqueued++, rx.always(function () {
        ;
        rx.always(function () {
          ;
          ;
          ;
          rQ.unqueued--;
          OE.queue(rH, 'fx').length || rQ.empty.fire();
        });
      })), rh))
        if (rs = rh[rT], /^(?:toggle|show|hide)$/.test(rs)) {
          if (delete rh[rT], rp = rp || 'toggle' === rs, rs === (rw ? 'hide' : 'show')) {
            if ('show' !== rs || !ru || void 0 === ru[rT]) {
              continue;
            }
            rw = true;
          }
          ;
        }
      ;
      if ((rK = !OE.isEmptyObject(rh)) || !OE.isEmptyObject(ra)) {
        for (rT in (rS && 1 === rH.nodeType && (rZ.overflow = [
          rk.overflow,
          rk.overflowX,
          rk.overflowY
        ], null == (rL = ru && ru.display) && (rL = OS.get(rH, 'display')), 'none' === (rS = OE.css(rH, 'display')) && (rL ? rS = rL : (C4([rH], true), rL = rH.style.display || rL, rS = OE.css(rH, 'display'), C4([rH]))), 'inline' === rS || 'inline-block' === rS && null != rL) && 'none' === OE.css(rH, 'float') && (rK || (rx.done(function () {
          rk.display = rL;
        }), null == rL && (rS = rk.display, rL = 'none' === rS ? '' : rS)), rk.display = 'inline-block'), rZ.overflow && (rk.overflow = 'hidden', rx.always(function () {
          ;
          ;
          ;
          rk.overflow = rZ.overflow[0];
          rk.overflowX = rZ.overflow[1];
          rk.overflowY = rZ.overflow[2];
        })), rK = false, ra))
          rK || (ru ? 'hidden' in ru && (rw = ru.hidden) : ru = OS.access(rH, 'fxshow', { 'display': rL }), rp && (ru.hidden = !rw), rw && C4([rH], true), rx.done(function () {
            ;
            ;
            for (rT in (rw || C4([rH]), OS.remove(rH, 'fxshow'), ra))
              OE.style(rH, rT, ra[rT]);
          })), rK = r5(rw ? ru[rT] : 0, rT, rx), rT in ru || (ru[rT] = rK.start, rw && (rK.end = rK.start, rK.start = 0));
      }
    }],
    'prefilter': function (rH, rh) {
      ;
      ;
      ;
      rh ? r6.prefilters.unshift(rH) : r6.prefilters.push(rH);
    }
  });
  OE.speed = function (rH, rh, rZ) {
    ;
    ;
    var rT = rH && 'object' == typeof rH ? OE.extend({}, rH) : {
      'complete': rZ || !rZ && rh || O7(rH) && rH,
      'duration': rH,
      'easing': rZ && rh || rh && !O7(rh) && rh
    };
    ;
    return OE.fx.off ? rT.duration = 0 : 'number' != typeof rT.duration && (rT.duration in OE.fx.speeds ? rT.duration = OE.fx.speeds[rT.duration] : rT.duration = OE.fx.speeds['_default']), null != rT.queue && true !== rT.queue || (rT.queue = 'fx'), rT.old = rT.complete, rT.complete = function () {
      ;
      ;
      O7(rT.old) && rT.old.call(this);
      rT.queue && OE.dequeue(this, rT.queue);
    }, rT;
  };
  OE.fn.extend({
    'fadeTo': function (rH, rh, rZ, rT) {
      ;
      ;
      return this.filter(Ou).css('opacity', 0).show().end().animate({ 'opacity': rh }, rH, rZ, rT);
    },
    'animate': function (rH, rh, rZ, rT) {
      ;
      function rs() {
        var rJ = r6(this, OE.extend({}, rH), rQ);
        ;
        (rp || OS.get(this, 'finish')) && rJ.stop(true);
      }
      ;
      var rp = OE.isEmptyObject(rH), rQ = OE.speed(rh, rZ, rT);
      ;
      return rs.finish = rs, rp || false === rQ.queue ? this.each(rs) : this.queue(rQ.queue, rs);
    },
    'stop': function (rH, rh, rZ) {
      ;
      function rT(rs) {
        ;
        var rp = rs.stop;
        delete rs.stop;
        rp(rZ);
      }
      ;
      ;
      return 'string' != typeof rH && (rZ = rh, rh = rH, rH = void 0), rh && false !== rH && this.queue(rH || 'fx', []), this.each(function () {
        ;
        var rs = true, rp = null != rH && rH + 'queueHooks', rQ = OE.timers, rJ = OS.get(this);
        ;
        if (rp) {
          rJ[rp] && rJ[rp].stop && rT(rJ[rp]);
        } else {
          for (rp in rJ)
            rJ[rp] && rJ[rp].stop && /queueHooks$/.test(rp) && rT(rJ[rp]);
        }
        ;
        for (rp = rQ.length; rp--;) {
          rQ[rp].elem !== this || null != rH && rQ[rp].queue !== rH || (rQ[rp].anim.stop(rZ), rs = false, rQ.splice(rp, 1));
        }
        !rs && rZ || OE.dequeue(this, rH);
      });
    },
    'finish': function (rH) {
      return false !== rH && (rH = rH || 'fx'), this.each(function () {
        var rh, rZ = OS.get(this), rT = rZ[rH + 'queue'], rs = rZ[rH + 'queueHooks'], rp = OE.timers, rQ = rT ? rT.length : 0;
        for (rZ.finish = true, OE.queue(this, rH, []), rs && rs.stop && rs.stop.call(this, true), rh = rp.length; rh--;) {
          rp[rh].elem === this && rp[rh].queue === rH && (rp[rh].anim.stop(true), rp.splice(rh, 1));
        }
        ;
        for (rh = 0; rh < rQ; rh++) {
          rT[rh] && rT[rh].finish && rT[rh].finish.call(this);
        }
        ;
        ;
        delete rZ.finish;
      });
    }
  });
  OE.each([
    'toggle',
    'show',
    'hide'
  ], function (rH, rh) {
    var rZ = OE.fn[rh];
    OE.fn[rh] = function (rT, rs, rp) {
      ;
      return null == rT || 'boolean' == typeof rT ? rZ.apply(this, arguments) : this.animate(r4(rh, true), rT, rs, rp);
    };
  });
  OE.each({
    'slideDown': r4('show'),
    'slideUp': r4('hide'),
    'slideToggle': r4('toggle'),
    'fadeIn': { 'opacity': 'show' },
    'fadeOut': { 'opacity': 'hide' },
    'fadeToggle': { 'opacity': 'toggle' }
  }, function (rH, rh) {
    OE.fn[rH] = function (rZ, rT, rs) {
      ;
      return this.animate(rh, rZ, rT, rs);
    };
  });
  OE.timers = [];
  OE.fx.tick = function () {
    ;
    ;
    ;
    var rH, rh = 0, rZ = OE.timers;
    for (Ck = Date.now(); rh < rZ.length; rh++) {
      (rH = rZ[rh])() || rZ[rh] !== rH || rZ.splice(rh--, 1);
    }
    rZ.length || OE.fx.stop();
    Ck = void 0;
  };
  OE.fx.timer = function (rH) {
    ;
    ;
    OE.timers.push(rH);
    OE.fx.start();
  };
  OE.fx.interval = 13;
  OE.fx.start = function () {
    Cw || (Cw = true, r2());
  };
  OE.fx.stop = function () {
    Cw = null;
  };
  OE.fx.speeds = {
    'slow': 600,
    'fast': 200,
    '_default': 400
  };
  OE.fn.delay = function (rH, rh) {
    ;
    ;
    return rH = OE.fx && OE.fx.speeds[rH] || rH, this.queue(rh = rh || 'fx', function (rZ, rT) {
      var rs = O5.setTimeout(rZ, rH);
      ;
      rT.stop = function () {
        ;
        O5.clearTimeout(rs);
      };
    });
  };
  Cu = OO.createElement('input');
  Cn = OO.createElement('select').appendChild(OO.createElement('option'));
  Cu.type = 'checkbox';
  ;
  ;
  (Cu = OO.createElement('input')).value = 't';
  Cu.type = 'radio';
  ;
  var r7, r8 = OE.expr.attrHandle, r9 = (OE.fn.extend({
    'attr': function (rH, rh) {
      ;
      return OT(this, OE.attr, rH, rh, 1 < arguments.length);
    },
    'removeAttr': function (rH) {
      ;
      return this.each(function () {
        ;
        OE.removeAttr(this, rH);
      });
    }
  }), OE.extend({
    'attr': function (rH, rh, rZ) {
      var rT, rs, rp = rH.nodeType;
      ;
      ;
      ;
      if (3 !== rp && 8 !== rp && 2 !== rp) {
        return void 0 === rH.getAttribute ? OE.prop(rH, rh, rZ) : (1 === rp && OE.isXMLDoc(rH) || (rs = OE.attrHooks[rh.toLowerCase()] || (OE.expr.match.bool.test(rh) ? r7 : void 0)), void 0 !== rZ ? null === rZ ? void OE.removeAttr(rH, rh) : rs && 'set' in rs && void 0 !== (rT = rs.set(rH, rZ, rh)) ? rT : (rH.setAttribute(rh, rZ + ''), rZ) : !(rs && 'get' in rs && null !== (rT = rs.get(rH, rh))) && null == (rT = OE.find.attr(rH, rh)) ? void 0 : rT);
      }
    },
    'attrHooks': {
      'type': {
        'set': function (rH, rh) {
          var rZ;
          ;
          ;
          if (!Oz.radioValue && 'radio' === rh && OY(rH, 'input')) {
            return rZ = rH.value, rH.setAttribute('type', rh), rZ && (rH.value = rZ), rh;
          }
        }
      }
    },
    'removeAttr': function (rH, rh) {
      var rZ, rT = 0, rs = rh && rh.match(/[^\x20\t\r\n\f]+/g);
      ;
      ;
      ;
      if (rs && 1 === rH.nodeType) {
        for (; rZ = rs[rT++];) {
          rH.removeAttribute(rZ);
        }
      }
    }
  }), r7 = {
    'set': function (rH, rh, rZ) {
      return false === rh ? OE.removeAttr(rH, rZ) : rH.setAttribute(rZ, rZ), rZ;
    }
  }, OE.each(OE.expr.match.bool.source.match(/\w+/g), function (rH, rh) {
    ;
    var rZ = r8[rh] || OE.find.attr;
    ;
    r8[rh] = function (rT, rs, rp) {
      ;
      var rQ, rJ, rK = rs.toLowerCase();
      return rp || (rJ = r8[rK], r8[rK] = rQ, rQ = null != rZ(rT, rs, rp) ? rK : null, r8[rK] = rJ), rQ;
    };
  }), /^(?:input|select|textarea|button)$/i);
  function rC(rH) {
    ;
    return (rH.match(/[^\x20\t\r\n\f]+/g) || []).join(' ');
  }
  function rr(rH) {
    ;
    ;
    return rH.getAttribute && rH.getAttribute('class') || '';
  }
  function rA(rH) {
    ;
    ;
    return Array.isArray(rH) ? rH : 'string' == typeof rH && rH.match(/[^\x20\t\r\n\f]+/g) || [];
  }
  OE.fn.extend({
    'prop': function (rH, rh) {
      ;
      ;
      return OT(this, OE.prop, rH, rh, 1 < arguments.length);
    },
    'removeProp': function (rH) {
      ;
      return this.each(function () {
        ;
        delete this[OE.propFix[rH] || rH];
      });
    }
  });
  OE.extend({
    'prop': function (rH, rh, rZ) {
      ;
      ;
      ;
      var rT, rs, rp = rH.nodeType;
      if (3 !== rp && 8 !== rp && 2 !== rp) {
        return 1 === rp && OE.isXMLDoc(rH) || (rh = OE.propFix[rh] || rh, rs = OE.propHooks[rh]), void 0 !== rZ ? rs && 'set' in rs && void 0 !== (rT = rs.set(rH, rZ, rh)) ? rT : rH[rh] = rZ : rs && 'get' in rs && null !== (rT = rs.get(rH, rh)) ? rT : rH[rh];
      }
    },
    'propHooks': {
      'tabIndex': {
        'get': function (rH) {
          ;
          ;
          var rh = OE.find.attr(rH, 'tabindex');
          return rh ? parseInt(rh, 10) : r9.test(rH.nodeName) || /^(?:a|area)$/i.test(rH.nodeName) && rH.href ? 0 : -1;
        }
      }
    },
    'propFix': {
      'for': 'htmlFor',
      'class': 'className'
    }
  });
  Oz.optSelected || (OE.propHooks.selected = {
    'get': function (rH) {
      ;
      ;
      return rH = rH.parentNode, (rH && rH.parentNode && rH.parentNode.selectedIndex, null);
    },
    'set': function (rH) {
      rH = rH.parentNode;
      ;
      ;
      rH && (rH.selectedIndex, rH.parentNode) && rH.parentNode.selectedIndex;
    }
  });
  OE.each([
    'tabIndex',
    'readOnly',
    'maxLength',
    'cellSpacing',
    'cellPadding',
    'rowSpan',
    'colSpan',
    'useMap',
    'frameBorder',
    'contentEditable'
  ], function () {
    ;
    ;
    OE.propFix[this.toLowerCase()] = this;
  });
  OE.fn.extend({
    'addClass': function (rH) {
      var rh, rZ, rT, rs, rp, rQ, rJ = 0;
      if (O7(rH)) {
        return this.each(function (rK) {
          ;
          OE(this).addClass(rH.call(this, rK, rr(this)));
        });
      }
      if ((rh = rA(rH)).length) {
        for (; rZ = this[rJ++];) {
          if (rQ = rr(rZ), rT = 1 === rZ.nodeType && ' ' + rC(rQ) + ' ') {
            for (rp = 0; rs = rh[rp++];) {
              rT.indexOf(' ' + rs + ' ') < 0 && (rT += rs + ' ');
            }
            rQ !== (rQ = rC(rT)) && rZ.setAttribute('class', rQ);
          }
        }
      }
      ;
      ;
      return this;
    },
    'removeClass': function (rH) {
      ;
      ;
      var rh, rZ, rT, rs, rp, rQ, rJ = 0;
      ;
      if (O7(rH)) {
        return this.each(function (rK) {
          ;
          ;
          OE(this).removeClass(rH.call(this, rK, rr(this)));
        });
      }
      if (!arguments.length) {
        return this.attr('class', '');
      }
      if ((rh = rA(rH)).length) {
        for (; rZ = this[rJ++];) {
          if (rQ = rr(rZ), rT = 1 === rZ.nodeType && ' ' + rC(rQ) + ' ') {
            for (rp = 0; rs = rh[rp++];) {
              for (; -1 < rT.indexOf(' ' + rs + ' ');) {
                rT = rT.replace(' ' + rs + ' ', ' ');
              }
            }
            rQ !== (rQ = rC(rT)) && rZ.setAttribute('class', rQ);
          }
        }
      }
      return this;
    },
    'toggleClass': function (rH, rh) {
      ;
      ;
      var rZ = typeof rH, rT = 'string' == rZ || Array.isArray(rH);
      return 'boolean' == typeof rh && rT ? rh ? this.addClass(rH) : this.removeClass(rH) : O7(rH) ? this.each(function (rs) {
        ;
        ;
        OE(this).toggleClass(rH.call(this, rs, rr(this), rh), rh);
      }) : this.each(function () {
        ;
        ;
        ;
        var rs, rp, rQ, rJ;
        if (rT) {
          for (rp = 0, rQ = OE(this), rJ = rA(rH); rs = rJ[rp++];) {
            rQ.hasClass(rs) ? rQ.removeClass(rs) : rQ.addClass(rs);
          }
        } else {
          void 0 !== rH && 'boolean' != rZ || ((rs = rr(this)) && OS.set(this, '__className__', rs), this.setAttribute && this.setAttribute('class', !rs && false !== rH && OS.get(this, '__className__') || ''));
        }
      });
    },
    'hasClass': function (rH) {
      for (var rh, rZ = 0, rT = ' ' + rH + ' '; rh = this[rZ++];) {
        if (1 === rh.nodeType && -1 < (' ' + rC(rr(rh)) + ' ').indexOf(rT)) {
          return true;
        }
      }
      ;
      return false;
    }
  });
  function rj(rH) {
    ;
    rH.stopPropagation();
  }
  var rR = (OE.fn.extend({
    'val': function (rH) {
      ;
      var rh, rZ, rT, rs = this[0];
      ;
      ;
      return arguments.length ? (rT = O7(rH), this.each(function (rp) {
        ;
        ;
        ;
        1 === this.nodeType && (null == (rp = rT ? rH.call(this, rp, OE(this).val()) : rH) ? rp = '' : 'number' == typeof rp ? rp += '' : Array.isArray(rp) && (rp = OE.map(rp, function (rQ) {
          return null == rQ ? '' : rQ + '';
        })), (rh = OE.valHooks[this.type] || OE.valHooks[this.nodeName.toLowerCase()]) && 'set' in rh && void 0 !== rh.set(this, rp, 'value') || (this.value = rp));
      })) : rs ? (rh = OE.valHooks[rs.type] || OE.valHooks[rs.nodeName.toLowerCase()]) && 'get' in rh && void 0 !== (rZ = rh.get(rs, 'value')) ? rZ : 'string' == typeof (rZ = rs.value) ? rZ.replace(/\r/g, '') : null == rZ ? '' : rZ : void 0;
    }
  }), OE.extend({
    'valHooks': {
      'option': {
        'get': function (rH) {
          ;
          var rh = OE.find.attr(rH, 'value');
          ;
          ;
          return null != rh ? rh : rC(OE.text(rH));
        }
      },
      'select': {
        'get': function (rH) {
          for (var rh, rZ = rH.options, rT = rH.selectedIndex, rs = 'select-one' === rH.type, rp = rs ? null : [], rQ = rs ? rT + 1 : rZ.length, rJ = rT < 0 ? rQ : rs ? rT : 0; rJ < rQ; rJ++) {
            if (((rh = rZ[rJ]).selected || rJ === rT) && !rh.disabled && (!rh.parentNode.disabled || !OY(rh.parentNode, 'optgroup'))) {
              if (rh = OE(rh).val(), rs) {
                return rh;
              }
              rp.push(rh);
            }
          }
          ;
          ;
          ;
          return rp;
        },
        'set': function (rH, rh) {
          ;
          ;
          ;
          for (var rZ, rT, rs = rH.options, rp = OE.makeArray(rh), rQ = rs.length; rQ--;) {
            ((rT = rs[rQ]).selected = -1 < OE.inArray(OE.valHooks.option.get(rT), rp)) && (rZ = true);
          }
          return rZ || (rH.selectedIndex = -1), rp;
        }
      }
    }
  }), OE.each([
    'radio',
    'checkbox'
  ], function () {
    ;
    ;
    ;
    OE.valHooks[this] = {
      'set': function (rH, rh) {
        ;
        ;
        ;
        if (Array.isArray(rh)) {
          return rH.checked = -1 < OE.inArray(OE(rH).val(), rh);
        }
      }
    };
    Oz.checkOn || (OE.valHooks[this].get = function (rH) {
      ;
      return null === rH.getAttribute('value') ? 'on' : rH.value;
    });
  }), Oz.focusin = 'onfocusin' in O5, /^(?:focusinfocus|focusoutblur)$/), ri = (OE.extend(OE.event, {
    'trigger': function (rH, rh, rZ, rT) {
      var rs, rp, rQ, rJ, rK, rL, rS, rx = [rZ || OO], ra = Oq.call(rH, 'type') ? rH.type : rH, rk = Oq.call(rH, 'namespace') ? rH.namespace.split('.') : [], rw = rS = rp = rZ = rZ || OO;
      ;
      ;
      ;
      if (3 !== rZ.nodeType && 8 !== rZ.nodeType && !rR.test(ra + OE.event.triggered) && (-1 < ra.indexOf('.') && (ra = (rk = ra.split('.')).shift(), rk.sort()), rJ = ra.indexOf(':') < 0 && 'on' + ra, (rH = rH[OE.expando] ? rH : new OE.Event(ra, 'object' == typeof rH && rH)).isTrigger = rT ? 2 : 3, rH.namespace = rk.join('.'), rH.rnamespace = rH.namespace ? new RegExp('(^|\\.)' + rk.join('\\.(?:.*\\.|)') + '(\\.|$)') : null, rH.result = void 0, rH.target || (rH.target = rZ), rh = null == rh ? [rH] : OE.makeArray(rh, [rH]), rL = OE.event.special[ra] || {}, rT || !rL.trigger || false !== rL.trigger.apply(rZ, rh))) {
        if (!rT && !rL.noBubble && !O8(rZ)) {
          for (rQ = rL.delegateType || ra, rR.test(rQ + ra) || (rw = rw.parentNode); rw; rw = rw.parentNode) {
            rx.push(rw);
            rp = rw;
          }
          rp === (rZ.ownerDocument || OO) && rx.push(rp.defaultView || rp.parentWindow || O5);
        }
        for (rs = 0; (rw = rx[rs++]) && !rH.isPropagationStopped();) {
          rS = rw;
          rH.type = 1 < rs ? rQ : rL.bindType || ra;
          (rK = (OS.get(rw, 'events') || {})[rH.type] && OS.get(rw, 'handle')) && rK.apply(rw, rh);
          (rK = rJ && rw[rJ]) && rK.apply && OK(rw) && (rH.result = rK.apply(rw, rh), false === rH.result) && rH.preventDefault();
        }
        return rH.type = ra, rT || rH.isDefaultPrevented() || rL['_default'] && false !== rL['_default'].apply(rx.pop(), rh) || !OK(rZ) || rJ && O7(rZ[ra]) && !O8(rZ) && ((rp = rZ[rJ]) && (rZ[rJ] = null), OE.event.triggered = ra, rH.isPropagationStopped() && rS.addEventListener(ra, rj), rZ[ra](), rH.isPropagationStopped() && rS.removeEventListener(ra, rj), OE.event.triggered = void 0, rp) && (rZ[rJ] = rp), rH.result;
      }
    },
    'simulate': function (rH, rh, rZ) {
      ;
      ;
      rZ = OE.extend(new OE.Event(), rZ, {
        'type': rH,
        'isSimulated': true
      });
      OE.event.trigger(rZ, null, rh);
    }
  }), OE.fn.extend({
    'trigger': function (rH, rh) {
      ;
      return this.each(function () {
        ;
        OE.event.trigger(rH, rh, this);
      });
    },
    'triggerHandler': function (rH, rh) {
      var rZ = this[0];
      ;
      if (rZ) {
        return OE.event.trigger(rH, rh, rZ, true);
      }
    }
  }), Oz.focusin || OE.each({
    'focus': 'focusin',
    'blur': 'focusout'
  }, function (rH, rh) {
    function rZ(rT) {
      ;
      OE.event.simulate(rh, rT.target, OE.event.fix(rT));
    }
    ;
    OE.event.special[rh] = {
      'setup': function () {
        ;
        var rT = this.ownerDocument || this, rs = OS.access(rT, rh);
        rs || rT.addEventListener(rH, rZ, true);
        OS.access(rT, rh, (rs || 0) + 1);
      },
      'teardown': function () {
        ;
        ;
        ;
        var rT = this.ownerDocument || this, rs = OS.access(rT, rh) - 1;
        rs ? OS.access(rT, rh, rs) : (rT.removeEventListener(rH, rZ, true), OS.remove(rT, rh));
      }
    };
  }), O5.location), rq = Date.now(), rl = (OE.parseXML = function (rH) {
    var rh;
    ;
    if (!rH || 'string' != typeof rH) {
      return null;
    }
    ;
    try {
      rh = new O5.DOMParser().parseFromString(rH, 'text/xml');
    } catch (rZ) {
      rh = void 0;
    }
    ;
    return rh && !rh.getElementsByTagName('parsererror').length || OE.error('Invalid XML: ' + rH), rh;
  }, /\[\]$/);
  OE.param = function (rH, rh) {
    ;
    function rZ(rp, rQ) {
      ;
      rQ = O7(rQ) ? rQ() : rQ;
      rs[rs.length] = encodeURIComponent(rp) + '=' + encodeURIComponent(null == rQ ? '' : rQ);
    }
    ;
    var rT, rs = [];
    if (Array.isArray(rH) || rH.jquery && !OE.isPlainObject(rH)) {
      OE.each(rH, function () {
        ;
        ;
        rZ(this.name, this.value);
      });
    } else {
      for (rT in rH)
        !function rp(rQ, rJ, rK, rL) {
          ;
          if (Array.isArray(rJ)) {
            OE.each(rJ, function (rx, ra) {
              ;
              ;
              rK || rl.test(rQ) ? rL(rQ, ra) : rp(rQ + '[' + ('object' == typeof ra && null != ra ? rx : '') + ']', ra, rK, rL);
            });
          } else {
            if (rK || 'object' !== Og(rJ)) {
              rL(rQ, rJ);
            } else {
              for (var rS in rJ)
                rp(rQ + '[' + rS + ']', rJ[rS], rK, rL);
            }
          }
        }(rT, rH[rT], rh, rZ);
    }
    return rs.join('&');
  };
  OE.fn.extend({
    'serialize': function () {
      ;
      ;
      return OE.param(this.serializeArray());
    },
    'serializeArray': function () {
      ;
      ;
      return this.map(function () {
        ;
        var rH = OE.prop(this, 'elements');
        ;
        ;
        return rH ? OE.makeArray(rH) : this;
      }).filter(function () {
        var rH = this.type;
        ;
        ;
        return this.name && !OE(this).is(':disabled') && /^(?:input|select|textarea|keygen)/i.test(this.nodeName) && !/^(?:submit|button|image|reset|file)$/i.test(rH) && (this.checked || !/^(?:checkbox|radio)$/i.test(rH));
      }).map(function (rH, rh) {
        ;
        var rZ = OE(this).val();
        ;
        return null == rZ ? null : Array.isArray(rZ) ? OE.map(rZ, function (rT) {
          ;
          return {
            'name': rh.name,
            'value': rT.replace(/\r?\n/g, '\r\n')
          };
        }) : {
          'name': rh.name,
          'value': rZ.replace(/\r?\n/g, '\r\n')
        };
      }).get();
    }
  });
  var rc = {}, rY = {}, rM = '*/'.concat('*'), rG = OO.createElement('a');
  function ro(rH) {
    return function (rh, rZ) {
      'string' != typeof rh && (rZ = rh, rh = '*');
      ;
      var rT, rs = 0, rp = rh.toLowerCase().match(/[^\x20\t\r\n\f]+/g) || [];
      ;
      if (O7(rZ)) {
        for (; rT = rp[rs++];) {
          '+' === rT[0] ? (rT = rT.slice(1) || '*', (rH[rT] = rH[rT] || []).unshift(rZ)) : (rH[rT] = rH[rT] || []).push(rZ);
        }
      }
    };
  }
  function rD(rH, rh, rZ, rT) {
    var rs = {}, rp = rH === rY;
    function rQ(rJ) {
      var rK;
      return rs[rJ] = true, OE.each(rH[rJ] || [], function (rL, rS) {
        rS = rS(rh, rZ, rT);
        ;
        ;
        return 'string' != typeof rS || rp || rs[rS] ? rp ? !(rK = rS) : void 0 : (rh.dataTypes.unshift(rS), rQ(rS), false);
      }), rK;
    }
    ;
    return rQ(rh.dataTypes[0]) || !rs['*'] && rQ('*');
  }
  function rf(rH, rh) {
    ;
    var rZ, rT, rs = OE.ajaxSettings.flatOptions || {};
    for (rZ in rh)
      void 0 !== rh[rZ] && ((rs[rZ] ? rH : rT = rT || {})[rZ] = rh[rZ]);
    return rT && OE.extend(true, rH, rT), rH;
  }
  rG.href = ri.href;
  OE.extend({
    'active': 0,
    'lastModified': {},
    'etag': {},
    'ajaxSettings': {
      'url': ri.href,
      'type': 'GET',
      'isLocal': /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(ri.protocol),
      'global': true,
      'processData': true,
      'async': true,
      'contentType': 'application/x-www-form-urlencoded; charset=UTF-8',
      'accepts': {
        '*': rM,
        'text': 'text/plain',
        'html': 'text/html',
        'xml': 'application/xml, text/xml',
        'json': 'application/json, text/javascript'
      },
      'contents': {
        'xml': /\bxml\b/,
        'html': /\bhtml/,
        'json': /\bjson\b/
      },
      'responseFields': {
        'xml': 'responseXML',
        'text': 'responseText',
        'json': 'responseJSON'
      },
      'converters': {
        '* text': String,
        'text html': true,
        'text json': JSON.parse,
        'text xml': OE.parseXML
      },
      'flatOptions': {
        'url': true,
        'context': true
      }
    },
    'ajaxSetup': function (rH, rh) {
      ;
      ;
      return rh ? rf(rf(rH, OE.ajaxSettings), rh) : rf(OE.ajaxSettings, rH);
    },
    'ajaxPrefilter': ro(rc),
    'ajaxTransport': ro(rY),
    'ajax': function (rH, rh) {
      ;
      'object' == typeof rH && (rh = rH, rH = void 0);
      ;
      var rZ, rT, rs, rp, rQ, rJ, rK, rL, rS = OE.ajaxSetup({}, rh = rh || {}), rx = rS.context || rS, ra = rS.context && (rx.nodeType || rx.jquery) ? OE(rx) : OE.event, rk = OE.Deferred(), rw = OE.Callbacks('once memory'), ru = rS.statusCode || {}, rn = {}, A0 = { rQ: rJ }, A1 = 'canceled', A2 = {
        'readyState': 0,
        'getResponseHeader': function (A4) {
          var A5;
          ;
          if (rJ) {
            if (!rp) {
              for (rp = {}; A5 = /^(.*?):[ \t]*([^\r\n]*)$/gm.exec(rs);) {
                rp[A5[1].toLowerCase()] = A5[2];
              }
            }
            A5 = rp[A4.toLowerCase()];
          }
          return null == A5 ? null : A5;
        },
        'getAllResponseHeaders': function () {
          return rJ ? rs : null;
        },
        'setRequestHeader': function (A4, A5) {
          ;
          return null == rJ && (A4 = A0[A4.toLowerCase()] = A0[A4.toLowerCase()] || A4, rn[A4] = A5), this;
        },
        'overrideMimeType': function (A4) {
          return null == rJ && (rS.mimeType = A4), this;
        },
        'statusCode': function (A4) {
          if (A4) {
            if (rJ) {
              A2.always(A4[A2.status]);
            } else {
              for (var A5 in A4)
                ru[A5] = [
                  ru[A5],
                  A4[A5]
                ];
            }
          }
          ;
          return this;
        },
        'abort': function (A4) {
          return A4 = A4 || A1, (rZ && rZ.abort(A4), A3(0, A4), this);
        }
      };
      if (rk.promise(A2), rS.url = ((rH || rS.url || ri.href) + '').replace(/^\/\//, ri.protocol + '//'), rS.type = rh.method || rh.type || rS.method || rS.type, rS.dataTypes = (rS.dataType || '*').toLowerCase().match(/[^\x20\t\r\n\f]+/g) || [''], null == rS.crossDomain) {
        rH = OO.createElement('a');
        try {
          rH.href = rS.url;
          rH.href = rH.href;
          rS.crossDomain = rG.protocol + '//' + rG.host != rH.protocol + '//' + rH.host;
        } catch (A4) {
          rS.crossDomain = true;
        }
      }
      if (rS.data && rS.processData && 'string' != typeof rS.data && (rS.data = OE.param(rS.data, rS.traditional)), rD(rc, rS, rh, A2), !rJ) {
        for (rL in ((rK = OE.event && rS.global) && 0 == OE.active++ && OE.event.trigger('ajaxStart'), rS.type = rS.type.toUpperCase(), rS.hasContent = !/^(?:GET|HEAD)$/.test(rS.type), rT = rS.url.replace(/#.*$/, ''), rS.hasContent ? rS.data && rS.processData && 0 === (rS.contentType || '').indexOf('application/x-www-form-urlencoded') && (rS.data = rS.data.replace(/%20/g, '+')) : (rH = rS.url.slice(rT.length), rS.data && (rS.processData || 'string' == typeof rS.data) && (rT += (/\?/.test(rT) ? '&' : '?') + rS.data, delete rS.data), false === rS.cache && (rT = rT.replace(/([?&])_=[^&]*/, '$1'), rH = (/\?/.test(rT) ? '&' : '?') + '_=' + rq++ + rH), rS.url = rT + rH), rS.ifModified && (OE.lastModified[rT] && A2.setRequestHeader('If-Modified-Since', OE.lastModified[rT]), OE.etag[rT]) && A2.setRequestHeader('If-None-Match', OE.etag[rT]), (rS.data && rS.hasContent && false !== rS.contentType || rh.contentType) && A2.setRequestHeader('Content-Type', rS.contentType), A2.setRequestHeader('Accept', rS.dataTypes[0] && rS.accepts[rS.dataTypes[0]] ? rS.accepts[rS.dataTypes[0]] + ('*' !== rS.dataTypes[0] ? ', ' + rM + '; q=0.01' : '') : rS.accepts['*']), rS.headers))
          A2.setRequestHeader(rL, rS.headers[rL]);
        if (rS.beforeSend && (false === rS.beforeSend.call(rx, A2, rS) || rJ)) {
          return A2.abort();
        }
        if (A1 = 'abort', rw.add(rS.complete), A2.done(rS.success), A2.fail(rS.error), rZ = rD(rY, rS, rh, A2)) {
          if (A2.readyState = 1, rK && ra.trigger('ajaxSend', [
            A2,
            rS
          ]), rJ) {
            return A2;
          }
          rS.async && 0 < rS.timeout && (rQ = O5.setTimeout(function () {
            ;
            A2.abort('timeout');
          }, rS.timeout));
          try {
            rJ = false;
            rZ.send(rn, A3);
          } catch (A5) {
            if (rJ) {
              throw A5;
            }
            A3(-1, A5);
          }
        } else {
          A3(-1, 'No Transport');
        }
      }
      return A2;
      ;
      function A3(A6, A7, A8, A9) {
        ;
        ;
        ;
        var AO, AC, Ar, AA = A7;
        rJ || (rJ = true, rQ && O5.clearTimeout(rQ), rZ = void 0, rs = A9 || '', A2.readyState = 0 < A6 ? 4 : 0, A9 = 200 <= A6 && A6 < 300 || 304 === A6, A8 && (Ar = function (Aj, AI, AR) {
          ;
          ;
          for (var Ai, Aq, AX, Al, Az = Aj.contents, AU = Aj.dataTypes; '*' === AU[0];) {
            AU.shift();
            void 0 === Ai && (Ai = Aj.mimeType || AI.getResponseHeader('Content-Type'));
          }
          if (Ai) {
            for (Aq in Az)
              if (Az[Aq] && Az[Aq].test(Ai)) {
                AU.unshift(Aq);
                break;
              }
          }
          if (AU[0] in AR) {
            AX = AU[0];
          } else {
            for (Aq in AR) {
              if (!AU[0] || Aj.converters[Aq + ' ' + AU[0]]) {
                AX = Aq;
                break;
              }
              Al = Al || Aq;
            }
            AX = AX || Al;
          }
          if (AX) {
            return AX !== AU[0] && AU.unshift(AX), AR[AX];
          }
        }(rS, A2, A8)), Ar = function (Aj, AI, AR, Ai) {
          var Aq, AX, Al, Az, AU, Ad = {}, Ag = Aj.dataTypes.slice();
          if (Ag[1]) {
            for (Al in Aj.converters)
              Ad[Al.toLowerCase()] = Aj.converters[Al];
          }
          ;
          ;
          ;
          for (AX = Ag.shift(); AX;) {
            if (Aj.responseFields[AX] && (AR[Aj.responseFields[AX]] = AI), !AU && Ai && Aj.dataFilter && (AI = Aj.dataFilter(AI, Aj.dataType)), AU = AX, AX = Ag.shift()) {
              if ('*' === AX) {
                AX = AU;
              } else {
                if ('*' !== AU && AU !== AX) {
                  if (!(Al = Ad[AU + ' ' + AX] || Ad['* ' + AX])) {
                    for (Aq in Ad)
                      if ((Az = Aq.split(' '))[1] === AX && (Al = Ad[AU + ' ' + Az[0]] || Ad['* ' + Az[0]])) {
                        true === Al ? Al = Ad[Aq] : true !== Ad[Aq] && (AX = Az[0], Ag.unshift(Az[1]));
                        break;
                      }
                  }
                  if (true !== Al) {
                    if (Al && Aj.throws) {
                      AI = Al(AI);
                    } else {
                      try {
                        AI = Al(AI);
                      } catch (AE) {
                        return {
                          'state': 'parsererror',
                          'error': Al ? AE : 'No conversion from ' + AU + ' to ' + AX
                        };
                      }
                    }
                  }
                }
              }
            }
          }
          return {
            'state': 'success',
            'data': AI
          };
        }(rS, Ar, A2, A9), A9 ? (rS.ifModified && ((A8 = A2.getResponseHeader('Last-Modified')) && (OE.lastModified[rT] = A8), A8 = A2.getResponseHeader('etag')) && (OE.etag[rT] = A8), 204 === A6 || 'HEAD' === rS.type ? AA = 'nocontent' : 304 === A6 ? AA = 'notmodified' : (AA = Ar.state, AO = Ar.data, A9 = !(AC = Ar.error))) : (AC = AA, !A6 && AA || (AA = 'error', A6 < 0 && (A6 = 0))), A2.status = A6, A2.statusText = (A7 || AA) + '', A9 ? rk.resolveWith(rx, [
          AO,
          AA,
          A2
        ]) : rk.rejectWith(rx, [
          A2,
          AA,
          AC
        ]), A2.statusCode(ru), ru = void 0, rK && ra.trigger(A9 ? 'ajaxSuccess' : 'ajaxError', [
          A2,
          rS,
          A9 ? AO : AC
        ]), rw.fireWith(rx, [
          A2,
          AA
        ]), rK && (ra.trigger('ajaxComplete', [
          A2,
          rS
        ]), --OE.active || OE.event.trigger('ajaxStop')));
      }
    },
    'getJSON': function (rH, rh, rZ) {
      ;
      return OE.get(rH, rh, rZ, 'json');
    },
    'getScript': function (rH, rh) {
      ;
      return OE.get(rH, void 0, rh, 'script');
    }
  });
  OE.each([
    'get',
    'post'
  ], function (rH, rh) {
    OE[rh] = function (rZ, rT, rs, rp) {
      ;
      ;
      return O7(rT) && (rp = rp || rs, rs = rT, rT = void 0), OE.ajax(OE.extend({
        'url': rZ,
        'type': rh,
        'dataType': rp,
        'data': rT,
        'success': rs
      }, OE.isPlainObject(rZ) && rZ));
    };
  });
  OE['_evalUrl'] = function (rH) {
    ;
    return OE.ajax({
      'url': rH,
      'type': 'GET',
      'dataType': 'script',
      'cache': true,
      'async': false,
      'global': false,
      'throws': true
    });
  };
  OE.fn.extend({
    'wrapAll': function (rH) {
      ;
      ;
      return this[0] && (O7(rH) && (rH = rH.call(this[0])), rH = OE(rH, this[0].ownerDocument).eq(0).clone(true), this[0].parentNode && rH.insertBefore(this[0]), rH.map(function () {
        ;
        for (var rh = this; rh.firstElementChild;) {
          rh = rh.firstElementChild;
        }
        ;
        return rh;
      }).append(this)), this;
    },
    'wrapInner': function (rH) {
      ;
      ;
      return O7(rH) ? this.each(function (rh) {
        ;
        ;
        OE(this).wrapInner(rH.call(this, rh));
      }) : this.each(function () {
        ;
        var rh = OE(this), rZ = rh.contents();
        rZ.length ? rZ.wrapAll(rH) : rh.append(rH);
      });
    },
    'wrap': function (rH) {
      ;
      var rh = O7(rH);
      return this.each(function (rZ) {
        ;
        ;
        OE(this).wrapAll(rh ? rH.call(this, rZ) : rH);
      });
    },
    'unwrap': function (rH) {
      ;
      ;
      ;
      return this.parent(rH).not('body').each(function () {
        ;
        OE(this).replaceWith(this.childNodes);
      }), this;
    }
  });
  OE.expr.pseudos.hidden = function (rH) {
    ;
    return !OE.expr.pseudos.visible(rH);
  };
  OE.expr.pseudos.visible = function (rH) {
    ;
    ;
    ;
    return !!(rH.offsetWidth || rH.offsetHeight || rH.getClientRects().length);
  };
  OE.ajaxSettings.xhr = function () {
    try {
      return new O5.XMLHttpRequest();
    } catch (rH) {
    }
  };
  var rm = OE.ajaxSettings.xhr(), rW = (Oz.cors = !!rm && 'withCredentials' in rm, Oz.ajax = rm = !!rm, OE.ajaxTransport(function (rH) {
    var rh, rZ;
    ;
    ;
    if (Oz.cors || rm && !rH.crossDomain) {
      return {
        'send': function (rT, rs) {
          var rp, rQ = rH.xhr();
          ;
          if (rQ.open(rH.type, rH.url, rH.async, rH.username, rH.password), rH.xhrFields) {
            for (rp in rH.xhrFields)
              rQ[rp] = rH.xhrFields[rp];
          }
          ;
          for (rp in (rH.mimeType && rQ.overrideMimeType && rQ.overrideMimeType(rH.mimeType), rH.crossDomain || rT['X-Requested-With'] || (rT['X-Requested-With'] = 'XMLHttpRequest'), rT))
            rQ.setRequestHeader(rp, rT[rp]);
          rh = function (rJ) {
            return function () {
              ;
              ;
              ;
              rh && (rh = rZ = rQ.onload = rQ.onerror = rQ.onabort = rQ.ontimeout = rQ.onreadystatechange = null, 'abort' === rJ ? rQ.abort() : 'error' === rJ ? 'number' != typeof rQ.status ? rs(0, 'error') : rs(rQ.status, rQ.statusText) : rs(rN[rQ.status] || rQ.status, rQ.statusText, 'text' !== (rQ.responseType || 'text') || 'string' != typeof rQ.responseText ? { 'binary': rQ.response } : { 'text': rQ.responseText }, rQ.getAllResponseHeaders()));
            };
          };
          rQ.onload = rh();
          rZ = rQ.onerror = rQ.ontimeout = rh('error');
          void 0 !== rQ.onabort ? rQ.onabort = rZ : rQ.onreadystatechange = function () {
            ;
            ;
            4 === rQ.readyState && O5.setTimeout(function () {
              rh && rZ();
            });
          };
          rh = rh('abort');
          ;
          try {
            rQ.send(rH.hasContent && rH.data || null);
          } catch (rJ) {
            if (rh) {
              throw rJ;
            }
          }
        },
        'abort': function () {
          rh && rh();
        }
      };
    }
  }), OE.ajaxPrefilter(function (rH) {
    ;
    ;
    ;
    rH.crossDomain && (rH.contents.script = false);
  }), OE.ajaxSetup({
    'accepts': { 'script': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
    'contents': { 'script': /\b(?:java|ecma)script\b/ },
    'converters': {
      'text script': function (rH) {
        ;
        return OE.globalEval(rH), rH;
      }
    }
  }), OE.ajaxPrefilter('script', function (rH) {
    ;
    ;
    void 0 === rH.cache && (rH.cache = false);
    rH.crossDomain && (rH.type = 'GET');
  }), OE.ajaxTransport('script', function (rH) {
    var rh, rZ;
    ;
    if (rH.crossDomain) {
      return {
        'send': function (rT, rs) {
          ;
          ;
          ;
          rh = OE('<script>').prop({
            'charset': rH.scriptCharset,
            'src': rH.url
          }).on('load error', rZ = function (rp) {
            ;
            ;
            rh.remove();
            rZ = null;
            rp && rs('error' === rp.type ? 404 : 200, rp.type);
          });
          OO.head.appendChild(rh[0]);
        },
        'abort': function () {
          rZ && rZ();
        }
      };
    }
  }), []), ry = (OE.ajaxSetup({
    'jsonp': 'callback',
    'jsonpCallback': function () {
      var rH = rW.pop() || OE.expando + '_' + rq++;
      ;
      ;
      return this[rH] = true, rH;
    }
  }), OE.ajaxPrefilter('json jsonp', function (rH, rh, rZ) {
    ;
    ;
    ;
    var rT, rs, rp, rQ = false !== rH.jsonp && (/(=)\?(?=&|$)|\?\?/.test(rH.url) ? 'url' : 'string' == typeof rH.data && 0 === (rH.contentType || '').indexOf('application/x-www-form-urlencoded') && /(=)\?(?=&|$)|\?\?/.test(rH.data) && 'data');
    if (rQ || 'jsonp' === rH.dataTypes[0]) {
      return rT = rH.jsonpCallback = O7(rH.jsonpCallback) ? rH.jsonpCallback() : rH.jsonpCallback, rQ ? rH[rQ] = rH[rQ].replace(/(=)\?(?=&|$)|\?\?/, '$1' + rT) : false !== rH.jsonp && (rH.url += (/\?/.test(rH.url) ? '&' : '?') + rH.jsonp + '=' + rT), rH.converters['script json'] = function () {
        ;
        return rp || OE.error(rT + ' was not called'), rp[0];
      }, rH.dataTypes[0] = 'json', rs = O5[rT], O5[rT] = function () {
        rp = arguments;
      }, rZ.always(function () {
        ;
        ;
        ;
        void 0 === rs ? OE(O5).removeProp(rT) : O5[rT] = rs;
        rH[rT] && (rH.jsonpCallback = rh.jsonpCallback, rW.push(rT));
        rp && O7(rs) && rs(rp[0]);
        rp = rs = void 0;
      }), 'script';
    }
  }), Oz.createHTMLDocument = ((O9 = OO.implementation.createHTMLDocument('').body).innerHTML = '<form></form><form></form>', 2 === O9.childNodes.length), OE.parseHTML = function (rH, rh, rZ) {
    ;
    var rT;
    ;
    ;
    return 'string' != typeof rH ? [] : ('boolean' == typeof rh && (rZ = rh, rh = false), rh || (Oz.createHTMLDocument ? ((rT = (rh = OO.implementation.createHTMLDocument('')).createElement('base')).href = OO.location.href, rh.head.appendChild(rT)) : rh = OO), rT = !rZ && [], (rZ = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i.exec(rH)) ? [rh.createElement(rZ[1])] : (rZ = Cr([rH], rh, rT), rT && rT.length && OE(rT).remove(), OE.merge([], rZ.childNodes)));
  }, OE.fn.load = function (rH, rh, rZ) {
    ;
    ;
    var rT, rs, rp, rQ = this, rJ = rH.indexOf(' ');
    ;
    return -1 < rJ && (rT = rC(rH.slice(rJ)), rH = rH.slice(0, rJ)), O7(rh) ? (rZ = rh, rh = void 0) : rh && 'object' == typeof rh && (rs = 'POST'), 0 < rQ.length && OE.ajax({
      'url': rH,
      'type': rs || 'GET',
      'dataType': 'html',
      'data': rh
    }).done(function (rK) {
      ;
      ;
      rp = arguments;
      rQ.html(rT ? OE('<div>').append(OE.parseHTML(rK)).find(rT) : rK);
    }).always(rZ && function (rK, rL) {
      ;
      rQ.each(function () {
        ;
        rZ.apply(this, rp || [
          rK.responseText,
          rL,
          rK
        ]);
      });
    }), this;
  }, OE.each([
    'ajaxStart',
    'ajaxStop',
    'ajaxComplete',
    'ajaxError',
    'ajaxSuccess',
    'ajaxSend'
  ], function (rH, rh) {
    OE.fn[rh] = function (rZ) {
      return this.on(rh, rZ);
    };
  }), OE.expr.pseudos.animated = function (rH) {
    ;
    return OE.grep(OE.timers, function (rh) {
      ;
      return rH === rh.elem;
    }).length;
  }, OE.offset = {
    'setOffset': function (rH, rh, rZ) {
      ;
      ;
      var rT, rs, rp, rQ, rJ = OE.css(rH, 'position'), rK = OE(rH), rL = {};
      ;
      'static' === rJ && (rH.style.position = 'relative');
      rp = rK.offset();
      rT = OE.css(rH, 'top');
      rQ = OE.css(rH, 'left');
      rJ = ('absolute' === rJ || 'fixed' === rJ) && -1 < (rT + rQ).indexOf('auto') ? (rs = (rJ = rK.position()).top, rJ.left) : (rs = parseFloat(rT) || 0, parseFloat(rQ) || 0);
      null != (rh = O7(rh) ? rh.call(rH, rZ, OE.extend({}, rp)) : rh).top && (rL.top = rh.top - rp.top + rs);
      null != rh.left && (rL.left = rh.left - rp.left + rJ);
      'using' in rh ? rh.using.call(rH, rL) : rK.css(rL);
    }
  }, OE.fn.extend({
    'offset': function (rH) {
      ;
      ;
      var rh, rZ;
      ;
      return arguments.length ? void 0 === rH ? this : this.each(function (rT) {
        ;
        ;
        OE.offset.setOffset(this, rH, rT);
      }) : (rZ = this[0]) ? rZ.getClientRects().length ? (rh = rZ.getBoundingClientRect(), rZ = rZ.ownerDocument.defaultView, {
        'top': rh.top + rZ.pageYOffset,
        'left': rh.left + rZ.pageXOffset
      }) : {
        'top': 0,
        'left': 0
      } : void 0;
    },
    'position': function () {
      ;
      ;
      ;
      if (this[0]) {
        var rH, rh, rZ, rT = this[0];
        if ('fixed' === OE.css(rT, 'position')) {
          rh = rT.getBoundingClientRect();
        } else {
          for (rh = this.offset(), rZ = rT.ownerDocument, rH = rT.offsetParent || rZ.documentElement; rH && (rH === rZ.body || rH === rZ.documentElement) && 'static' === OE.css(rH, 'position');) {
            rH = rH.parentNode;
          }
          rH && rH !== rT && 1 === rH.nodeType && ((rs = OE(rH).offset()).top += OE.css(rH, 'borderTopWidth', true), rs.left += OE.css(rH, 'borderLeftWidth', true));
        }
        return {
          'top': rh.top - rs.top - OE.css(rT, 'marginTop', true),
          'left': rh.left - rs.left - OE.css(rT, 'marginLeft', true)
        };
      }
    },
    'offsetParent': function () {
      ;
      return this.map(function () {
        ;
        ;
        for (var rH = this.offsetParent; rH && 'static' === OE.css(rH, 'position');) {
          rH = rH.offsetParent;
        }
        ;
        return rH || CA;
      });
    }
  }), OE.each({
    'scrollLeft': 'pageXOffset',
    'scrollTop': 'pageYOffset'
  }, function (rH, rh) {
    var rZ = 'pageYOffset' === rh;
    ;
    OE.fn[rH] = function (rT) {
      return OT(this, function (rs, rp, rQ) {
        ;
        ;
        ;
        var rJ;
        if (O8(rs) ? rJ = rs : 9 === rs.nodeType && (rJ = rs.defaultView), void 0 === rQ) {
          return rJ ? rJ[rh] : rs[rp];
        }
        rJ ? rJ.scrollTo(rZ ? rJ.pageXOffset : rQ, rZ ? rQ : rJ.pageYOffset) : rs[rp] = rQ;
      }, rH, rT, arguments.length);
    };
  }), OE.each([
    'top',
    'left'
  ], function (rH, rh) {
    ;
    ;
    OE.cssHooks[rh] = Ch(Oz.pixelPosition, function (rZ, rT) {
      ;
      if (rT) {
        return rT = CH(rZ, rh), CW.test(rT) ? OE(rZ).position()[rh] + 'px' : rT;
      }
    });
  }), OE.each({
    'Height': 'height',
    'Width': 'width'
  }, function (rH, rh) {
    ;
    ;
    OE.each({
      'padding': 'inner' + rH,
      'content': rh,
      '': 'outer' + rH
    }, function (rZ, rT) {
      OE.fn[rT] = function (rs, rp) {
        ;
        var rQ = arguments.length && (rZ || 'boolean' != typeof rs), rJ = rZ || (true === rs || true === rp ? 'margin' : 'border');
        ;
        return OT(this, function (rK, rL, rS) {
          ;
          var rx;
          ;
          ;
          return O8(rK) ? 0 === rT.indexOf('outer') ? rK['inner' + rH] : rK.document.documentElement['client' + rH] : 9 === rK.nodeType ? (rx = rK.documentElement, Math.max(rK.body['scroll' + rH], rx['scroll' + rH], rK.body['offset' + rH], rx['offset' + rH], rx['client' + rH])) : void 0 === rS ? OE.css(rK, rL, rJ) : OE.style(rK, rL, rS, rJ);
        }, rh, rQ ? rs : void 0, rQ);
      };
    });
  }), OE.each('blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu'.split(' '), function (rH, rh) {
    OE.fn[rh] = function (rZ, rT) {
      ;
      return 0 < arguments.length ? this.on(rh, null, rZ, rT) : this.trigger(rh);
    };
  }), OE.fn.extend({
    'hover': function (rH, rh) {
      ;
      return this.mouseenter(rH).mouseleave(rh || rH);
    }
  }), OE.fn.extend({
    'bind': function (rH, rh, rZ) {
      return this.on(rH, null, rh, rZ);
    },
    'unbind': function (rH, rh) {
      ;
      return this.off(rH, null, rh);
    },
    'delegate': function (rH, rh, rZ, rT) {
      return this.on(rh, rH, rZ, rT);
    },
    'undelegate': function (rH, rh, rZ) {
      ;
      return 1 === arguments.length ? this.off(rH, '**') : this.off(rh, rH || '**', rZ);
    }
  }), OE.proxy = function (rH, rh) {
    ;
    var rZ, rT;
    ;
    if ('string' == typeof rh && (rT = rH[rh], rh = rH, rH = rT), O7(rH)) {
      return rZ = Or.call(arguments, 2), (rT = function () {
        ;
        ;
        return rH.apply(rh || this, rZ.concat(Or.call(arguments)));
      }).guid = rH.guid = rH.guid || OE.guid++, rT;
    }
  }, OE.holdReady = function (rH) {
    ;
    ;
    rH ? OE.readyWait++ : OE.ready(true);
  }, OE.isArray = Array.isArray, OE.parseJSON = JSON.parse, OE.nodeName = OY, OE.isFunction = O7, OE.isWindow = O8, OE.camelCase = OJ, OE.type = Og, OE.now = Date.now, OE.isNumeric = function (rH) {
    ;
    ;
    var rh = OE.type(rH);
    return ('number' === rh || 'string' === rh) && !isNaN(rH - parseFloat(rH));
  }, 'function' == typeof define && define.amd && define('jquery', [], function () {
    return OE;
  }), O5.jQuery), rV = O5['$'];
  return OE.noConflict = function (rH) {
    ;
    ;
    return O5['$'] === OE && (O5['$'] = rV), rH && O5.jQuery === OE && (O5.jQuery = ry), OE;
  }, O6 || (O5.jQuery = O5['$'] = OE), OE;
});
(() => {
  var O5, O6, O7, O8, O9 = {
    696: (OA, Oj, OI) => {
      'use strict';
      ;
      ;
      ;
      OI.d(Oj, { 'Z': () => OR });
      const OR = {
        'advertising': {
          'admessage': 'This ad will end in xx',
          'cuetext': 'Advertisement',
          'displayHeading': 'Advertisement',
          'loadingAd': 'Loading ad',
          'podmessage': 'Ad __AD_POD_CURRENT__ of __AD_POD_LENGTH__.',
          'skipmessage': 'Skip ad in xx',
          'skiptext': 'Skip'
        },
        'airplay': 'AirPlay',
        'audioTracks': 'Audio Tracks',
        'auto': 'Auto',
        'buffer': 'Loading',
        'cast': 'Chromecast',
        'cc': 'Closed Captions',
        'close': 'Close',
        'errors': {
          'badConnection': 'This video cannot be played because of a problem with your internet connection.',
          'cantLoadPlayer': 'Sorry, the video player failed to load.',
          'cantPlayInBrowser': 'The video cannot be played in this browser.',
          'cantPlayVideo': 'This video file cannot be played.',
          'errorCode': 'Error Code',
          'liveStreamDown': 'The live stream is either down or has ended.',
          'protectedContent': 'There was a problem providing access to protected content.',
          'technicalError': 'This video cannot be played because of a technical error.'
        },
        'exitFullscreen': 'Exit Fullscreen',
        'fullscreen': 'Fullscreen',
        'hd': 'Quality',
        'liveBroadcast': 'Live',
        'logo': 'Logo',
        'mute': 'Mute',
        'next': 'Next',
        'nextUp': 'Next Up',
        'notLive': 'Not Live',
        'off': 'Off',
        'pause': 'Pause',
        'pipIcon': 'Picture in Picture (PiP)',
        'play': 'Play',
        'playback': 'Play',
        'playbackRates': 'Playback Rates',
        'player': 'Video Player',
        'poweredBy': 'Powered by',
        'prev': 'Previous',
        'related': {
          'autoplaymessage': 'Next up in xx',
          'heading': 'More Videos'
        },
        'replay': 'Replay',
        'rewind': 'Rewind 10 Seconds',
        'settings': 'Settings',
        'sharing': {
          'copied': 'Copied',
          'email': 'Email',
          'embed': 'Embed',
          'heading': 'Share',
          'link': 'Link'
        },
        'slider': 'Seek',
        'stop': 'Stop',
        'unmute': 'Unmute',
        'videoInfo': 'About This Video',
        'volume': 'Volume',
        'volumeSlider': 'Volume',
        'shortcuts': {
          'playPause': 'Play/Pause',
          'volumeToggle': 'Mute/Unmute',
          'fullscreenToggle': 'Fullscreen/Exit Fullscreen',
          'seekPercent': 'Seek %',
          'keyboardShortcuts': 'Keyboard Shortcuts',
          'increaseVolume': 'Increase Volume',
          'decreaseVolume': 'Decrease Volume',
          'seekForward': 'Seek Forward',
          'seekBackward': 'Seek Backward',
          'spacebar': 'SPACE',
          'captionsToggle': 'Captions On/Off'
        },
        'captionsStyles': {
          'subtitleSettings': 'Subtitle Settings',
          'color': 'Font Color',
          'fontOpacity': 'Font Opacity',
          'userFontScale': 'Font Size',
          'fontFamily': 'Font Family',
          'edgeStyle': 'Character Edge',
          'backgroundColor': 'Background Color',
          'backgroundOpacity': 'Background Opacity',
          'windowColor': 'Window Color',
          'windowOpacity': 'Window Opacity',
          'white': 'White',
          'black': 'Black',
          'red': 'Red',
          'green': 'Green',
          'blue': 'Blue',
          'yellow': 'Yellow',
          'magenta': 'Magenta',
          'cyan': 'Cyan',
          'none': 'None',
          'raised': 'Raised',
          'depressed': 'Depressed',
          'uniform': 'Uniform',
          'dropShadow': 'Drop Shadow'
        },
        'disabled': 'Disabled',
        'enabled': 'Enabled',
        'reset': 'Reset'
      };
    },
    9128: (OA, Oj, OI) => {
      'use strict';
      function OR(Oi, Oq, OX) {
        function Ol() {
          ;
          ;
          for (; 0 < Oz.length;) {
            var {
              command: Od,
              args: Og
            } = Oz.shift();
            (OU[Od] || Oi[Od]).apply(Oi, Og);
          }
        }
        ;
        ;
        const Oz = [], OU = { Od: Og };
        Oq.forEach(Od => {
          const Og = Oi[Od];
          ;
          ;
        });
        Object.defineProperty(this, 'queue', {
          'enumerable': true,
          'get': () => Oz
        });
        this.flush = Ol;
        this.empty = function () {
          ;
          ;
        };
        this.off = function () {
          ;
          Oq.forEach(Od => {
            var Og = OU[Od];
            Og && (Oi[Od] = Og, delete OU[Od]);
          });
        };
        this.destroy = function () {
          ;
          ;
          this.off();
          this.empty();
        };
      }
      OI.d(Oj, { 'Z': () => OR });
    },
    4742: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, { 'Z': () => OR });
      ;
    },
    5191: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'R': () => Oi,
        'a': () => OR
      });
      const OR = function (Oq) {
        ;
        ;
        return Oq = Oq.slice && 'px' === Oq.slice(-2) ? Oq.slice(0, -2) : Oq;
      }, Oi = function (Oq, OX) {
        ;
        ;
        var Ol;
        ;
        return -1 !== OX.toString().indexOf('%') && 'string' == typeof Oq && Oq ? /^\d*\.?\d+%$/.test(Oq) ? Oq : -1 === (OX = Oq.indexOf(':')) || (Ol = parseFloat(Oq.substr(0, OX)), Oq = parseFloat(Oq.substr(OX + 1)), Ol <= 0) || Oq <= 0 ? 0 : Oq / Ol * 100 + '%' : 0;
      };
    },
    5083: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'G0': () => Og,
        'ZP': () => OE,
        'ke': () => Od
      });
      var OR = OI(5191), Oi = OI(1569), Oq = OI(9888), OX = OI(6042), Ol = OI(8348), Oz = OI(696), OU = OI(8518);
      const Od = {
        'autoPause': {
          'viewability': false,
          'pauseAds': false
        },
        'autostart': false,
        'allowFullscreen': true,
        'bandwidthEstimate': null,
        'bitrateSelection': null,
        'castAvailable': false,
        'controls': true,
        'cues': [],
        'defaultPlaybackRate': 1,
        'displaydescription': true,
        'displaytitle': true,
        'displayPlaybackLabel': false,
        'enableShortcuts': true,
        'height': 360,
        'intl': {},
        'item': 0,
        'language': 'en',
        'liveTimeout': null,
        'localization': Oz.Z,
        'mute': false,
        'nextUpDisplay': true,
        'playbackRateControls': false,
        'playbackRates': [
          0.5,
          1,
          1.25,
          1.5,
          2
        ],
        'renderCaptionsNatively': false,
        'repeat': false,
        'stretching': 'uniform',
        'volume': 90,
        'width': 640
      }, Og = function (Ov) {
        return Ov < 5 ? 5 : Ov;
      }, OE = function (Ov, Oe) {
        var Ob, OF = Object.assign({}, null == (OF = window) || null == (OF = OF.jwplayer) ? void 0 : OF.defaults, Oe, Ov), Oe = (Ob = OF, Object.keys(Ob).forEach(OY => {
          ;
          'id' !== OY && (Ob[OY] = (0, Oq.serialize)(Ob[OY]));
        }), OF.forceLocalizationDefaults ? Od.language : (0, OU.G3)()), Ov = (0, OU.tK)(OF.intl), OP = (OF.localization = (0, OU.Mh)(Oz.Z, (0, OU.Pm)(OF, Ov, Oe)), Object.assign({}, Od, OF)), Oe = ('.' === OP.base && (OP.base = (0, Oi.getScriptPath)('jwplayer.js')), OP.base = (OP.base || (0, Oi.loadFrom)()).replace(/\/?$/, '/'), OI.p = OP.base, OP.width = (0, OR.a)(OP.width), OP.height = (0, OR.a)(OP.height), OP.aspectratio = (0, OR.R)(OP.aspectratio, OP.width), 'string' == typeof OP.volume && (OP.volume = parseFloat(OP.volume)), OP.volume = (0, OX.qh)(OP.volume) ? Math.min(Math.max(0, OP.volume), 100) : Od.volume, OP.mute = Boolean(OP.mute), OP.language = Oe, OP.intl = Ov, OP.playlistIndex), Ov = (Oe && (OP.item = Oe), (0, OX.hj)(OP.item) || (OP.item = 0), OF.autoPause), Oe = (Ov && (OP.autoPause.viewability = !('viewability' in Ov) || Boolean(Ov.viewability)), OP.playbackRateControls);
        if (Oe) {
          let OY = OP.playbackRates;
          (OY = (OY = Array.isArray(Oe) ? Oe : OY).filter(OM => (0, OX.hj)(OM) && 0.25 <= OM && OM <= 4).map(OM => Math.round(100 * OM) / 100)).indexOf(1) < 0 && OY.push(1);
          OY.sort();
          OP.playbackRateControls = true;
          OP.playbackRates = OY;
        }
        Ov = parseFloat(OP.bandwidthEstimate);
        Oe = parseFloat(OP.bitrateSelection);
        OP.playbackRate = OP.defaultPlaybackRate;
        OP.aspectratio || delete OP.aspectratio;
        OF = OP.playlist;
        if (OF) {
          Array.isArray(OF.playlist) && (OP.feedData = OF, OP.playlist = OF.playlist);
        } else {
          const OM = (0, OX.ei)(OP, [
            'title',
            'description',
            'type',
            'mediaid',
            'image',
            'images',
            'file',
            'sources',
            'tracks',
            'preload',
            'duration',
            'chapters'
          ]);
          OP.playlist = [OM];
        }
        OP.qualityLabels = OP.qualityLabels || OP.hlslabels;
        delete OP.duration;
        let Oc = OP.liveTimeout;
        ;
        null !== Oc && ((0, OX.qh)(Oc) ? 0 !== Oc && (Oc = Math.max(30, Oc)) : Oc = null, OP.liveTimeout = Oc);
        Ov = parseFloat(OP.bandwidthEstimate), Oe = parseFloat(OP.bitrateSelection);
        ;
        ;
        return OP.bandwidthEstimate = (0, OX.qh)(Ov) ? Ov : function (OG) {
          ;
          OG = parseFloat(OG);
          ;
          return (0, OX.qh)(OG) ? Math.max(OG, 1) : Od.bandwidthEstimate;
        }(OP.defaultBandwidthEstimate), OP.bitrateSelection = (0, OX.qh)(Oe) ? Oe : Od.bitrateSelection, OP.liveSyncDuration = Og(OP.liveSyncDuration), OP.backgroundLoading = ((0, OX.jn)(OP.backgroundLoading) ? OP : Ol.Features).backgroundLoading, OP;
      };
    },
    2894: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'Ep': () => Oq,
        'Jt': () => OX,
        'Tr': () => Oi,
        'Zq': () => Ol
      });
      var OR = OI(4446);
      const Oi = {
        Od: function (...OE) {
          ;
          OX() ? Oz.push({
            'command': Od,
            'args': OE
          }) : (Ol(), Og && Og.apply(this, OE));
        },
        registerPlugin: function (OS, Ox, Oa) {
          ;
          'jwpsrv' !== OS && (0, OX.f)(OS, Ox, Oa);
        },
        onerror: Oi.onload = null,
        onerror: Oj.bind(null, Oi.onerror),
        onload: Oj.bind(null, Oi.onload)
      }, Oq = function (Oz, OU) {
        return () => {
          throw new OR.rG(OR.pJ, Oz, OU);
        };
      }, OX = function (Oz, OU) {
        return () => {
          throw new OR.rG(null, Oz, OU);
        };
      }, Ol = function () {
        ;
        return OI.e(681).then(function (Oz) {
          return OI(2739).default;
        }.bind(null, OI)).catch(Oq(OR.fU + 101));
      };
    },
    623: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'ZP': () => C4,
        'c2': () => C3
      });
      var OR = OI(9128), Oi = OI(2445), Oq = OI(2894), OX = OI(393), Ol = OI(8320), Oz = OI(2963), OU = OI(670), Od = OI(4601), Og = OI(4446), OE = OI(8348);
      ;
      ;
      let Ov = null;
      function Oe() {
        var C5 = window.IntersectionObserverEntry;
        ;
        return !(C5 && 'IntersectionObserver' in window && 'intersectionRatio' in C5.prototype);
      }
      function Ob() {
        ;
        return (Oe() ? OI.e(943).then(function (C5) {
          return OI(6337);
        }.bind(null, OI)).catch((0, Oq.Ep)(Og.fU + 120)) : Promise.resolve()).then(Oq.Zq);
      }
      const OF = function (C5) {
        ;
        ;
        ;
        var C6, C7 = C5.get('controls'), C8 = Oe(), C5 = function (C9) {
          ;
          ;
          ;
          const CO = C9.get('playlist');
          if (Array.isArray(CO) && CO.length) {
            var CC = (0, Ol.bx)(C9.get('item'), CO.length), Cr = (0, Ol.T5)((0, OX.Z)(CO[CC]), C9);
            for (let CI = 0; CI < Cr.length; CI++) {
              var CA = Cr[CI], Cj = C9.getProviders();
              for (let CR = 0; CR < Oz.B.length; CR++) {
                const Ci = Oz.B[CR];
                if (Cj.providerSupports(Ci, CA)) {
                  return 'html5' === Ci.name;
                }
              }
            }
          }
          return false;
        }(C5);
        return OE.OS.tizen ? Ob() : C7 && C8 && C5 ? (C6 = OI.e(605).then(function (C9) {
          ;
          ;
          OI(6337);
          var CO = OI(2739).default;
          ;
          return Od.v.controls = OI(4646).default, (0, OU.Z)(OI(9181).default), CO;
        }.bind(null, OI)).catch((0, Oq.Ep)(Og.fU + 105)), Oq.Tr.html5 = C6) : C7 && C5 ? (C6 = OI.e(207).then(function (C9) {
          ;
          ;
          ;
          var CO = OI(2739).default;
          return Od.v.controls = OI(4646).default, (0, OU.Z)(OI(9181).default), CO;
        }.bind(null, OI)).catch((0, Oq.Ep)(Og.fU + 104)), Oq.Tr.html5 = C6) : C7 && C8 ? OI.e(493).then(function (C9) {
          ;
          OI(6337);
          var CO = OI(2739).default;
          return Od.v.controls = OI(4646).default, CO;
        }.bind(null, OI)).catch((0, Oq.Ep)(Og.fU + 103)) : C7 ? OI.e(581).then(function (C9) {
          ;
          var CO = OI(2739).default;
          ;
          return Od.v.controls = OI(4646).default, CO;
        }.bind(null, OI)).catch((0, Oq.Ep)(Og.fU + 102)) : Ob();
      };
      var OP = OI(1643), Oc = OI(7263), OY = OI(676), OM = OI(8518), OG = OI(1241), Oo = OI(8381);
      function OD(C5, C6, C7) {
        ;
        ;
        (C5 = C5.attributes).playlist = (0, Ol.ZP)(C6);
        C5.feedData = C7;
      }
      function Of(C5) {
        const C6 = C5.get('playlist');
        return new Promise((C7, C8) => {
          if ('string' != typeof C6) {
            const CO = C5.get('feedData') || {};
            return OD(C5, C6, CO), C7();
          }
          ;
          var C9 = new Oc.Z();
          ;
          C9.on(OP.Ow, function (CC) {
            ;
            var Cr = CC.playlist;
            delete CC.playlist;
            OD(C5, Cr, CC);
            C7();
          });
          C9.on(OP.pn, CC => {
            OD(C5, [], {});
            C8((0, Og.l9)(CC, Og.xk));
          });
          C9.load(C6);
        });
      }
      function ON(C5) {
        ;
        ;
        return C5.attributes['_destroyed'];
      }
      var Om = OI(1918), OW = OI(6599), OB = OI(7010);
      function Oy(C5) {
        ;
        ;
        let C6;
        this.start = function (C7) {
          ;
          const C8 = OT(C5, C7), C9 = Promise.all([
            (C7 = C5, Ov = Ov || OF(C7)),
            Op(C5),
            C8,
            Oh(C5),
            OZ(C5),
            OV(C5),
            Os(C5)
          ]);
          C7 = new Promise((CO, CC) => {
            C6 = setTimeout(() => {
              CC(new Og.rG(Og.pJ, Og.T6));
            }, 60000);
            var Cr = () => {
              clearTimeout(C6);
              setTimeout(CO, 60000);
            };
            ;
            ;
            C9.then(Cr).catch(Cr);
          });
          ;
          return Promise.race([
            C9,
            C7
          ]).catch(CO => {
            ;
            ;
            var CC = () => {
              throw CO;
            };
            return C8.then(CC).catch(CC);
          }).then(CO => {
            ;
            return (CO = CO) && CO.length ? (CC = CO.reduce((Cr, CA) => Cr.concat(CA), []).filter(Cr => null == Cr ? void 0 : Cr.code), {
              'core': CO[0],
              'warnings': CC
            }) : {
              'core': null,
              'warnings': []
            };
            ;
            ;
            var CC;
          });
        };
        this.destroy = function () {
          ;
          clearTimeout(C6);
          C5.set('_destroyed', true);
          C5 = null;
        };
      }
      const OV = function (C5) {
        ;
        var C6 = C5.get('skin') ? C5.get('skin').url : void 0;
        if ('string' != typeof C6 || function (C7) {
          var C8 = document.styleSheets;
          ;
          for (let C9 = 0, CO = C8.length; C9 < CO; C9++) {
            if (C8[C9].href === C7) {
              return 1;
            }
          }
        }(C6)) {
          return Promise.resolve();
        }
        ;
        ;
        {
          ;
          return new OY.ZP(C6, true).load().catch(C8 => C8);
        }
      }, OH = C5 => {
        ;
        ;
        return C5 = C5.get('advertising'), Boolean(null == C5 ? void 0 : C5.outstream);
      }, Oh = C5 => OH(C5) ? Promise.resolve() : Of(C5).then(() => {
        ;
        ;
        if (C5.get('drm') || (0, Om.w0)(C5.get('playlist'))) {
          return (0, Om.lD)(C5.get('edition'));
        }
      }).then(() => {
        return Of(C6 = C5).then(() => {
          ;
          ;
          ;
          if (!ON(C6)) {
            var C7 = (0, Ol.s7)(C6.get('playlist'), C6);
            C6.attributes.playlist = C7;
            try {
              (0, Ol['_'])(C7);
            } catch (CC) {
              throw CC.code += Og.xk, CC;
            }
            var C8 = C6.getProviders(), C9 = (0, Ol.bx)(C6.get('item'), C7.length), {
              provider: C9,
              name: CO
            } = C8.choose(C7[C9].sources[0]);
            return 'function' == typeof C9 ? C9 : Oq.Tr.html5 && 'html5' === CO ? Oq.Tr.html5 : C8.load(CO).catch(Cr => {
              throw (0, Og.l9)(Cr, Og.y4);
            });
          }
        });
        ;
        var C6;
      }), OZ = (C5, C6) => {
        ;
        var C7 = [(C8 => {
          ;
          ;
          ;
          const C9 = C8.attributes, CO = C9.error;
          if (CO && CO.code === OW.u5) {
            const CC = C9.pid, Cr = C9.ph, CA = new OW.ZP(C9.key);
            if (0 < Cr && Cr < 4 && CC && -7776000000 < CA.duration()) {
              return new OY.ZP('//content.jwplatform.com/libraries/' + CC + '.js').load().then(() => {
                var Cj = window.jwplayer.defaults.key, CI = new OW.ZP(Cj);
                ;
                ;
                ;
                CI.error() || CI.token() !== CA.token() || (C9.key = Cj, C9.edition = CI.edition(), C9.error = CI.error());
              }).catch(() => {
              });
            }
          }
          return Promise.resolve();
        })(C5)];
        ;
        return OH(C5) || C7.push(Promise.resolve()), Promise.all(C7);
      }, OT = (C5, C6) => {
        ;
        var C7, C8, C9, CO = () => (0, OG.Z)(C5, C6);
        ;
        ;
        return (0, OB.Z)() ? (C8 = C7 = C5, C9 = C6, OI.e(168).then((CC => new (OI(5545)).default(C9).setup(C8)).bind(null, OI)).catch((0, Oq.Ep)(Og.fU + 130)).then(() => OV(C7)).then(CO).catch(CO)) : CO();
      }, Os = function (C5) {
        ;
        ;
        const C6 = C5.attributes, {
          language: C7,
          base: C8,
          setupConfig: C9,
          intl: CO
        } = C6, CC = (0, OM.Pm)(C9, CO, C7);
        return !(0, OM.q2)(C7) || (0, OM.dl)(CC) ? Promise.resolve() : new Promise(Cr => (0, OM.Dq)(C8, C7).then(({ response: CA }) => {
          ;
          if (!ON(C5)) {
            if (!CA) {
              throw new Og.rG(null, Og.wH);
            }
            C6.localization = (0, OM.Mh)(CA, CC);
            Cr();
          }
        }).catch(CA => {
          ;
          Cr(CA.code === Og.wH ? CA : (0, Og.l9)(CA, Og.A6));
        }));
      }, Op = C5 => new Promise(C6 => {
        ;
        ;
        var C7;
        ;
        return 45 < C5.attributes.liveSyncDuration ? C6((0, Og.l9)(new Error(), Og.wM)) : null != (C7 = Array.isArray(C5.attributes.playlist) && C5.attributes.playlist.map(C8 => C8.chapters)) && C7.length ? (0, Oo.T2)(C7, C6) : C6();
      });
      var OQ = OI(2303), OJ = OI(7411), OK = OI(9888), Ot = OI(4742);
      let OL = {
        'removeItem'(C5) {
        }
      };
      try {
        OL = window.localStorage || OL;
      } catch (C5) {
      }
      const OS = class {
        constructor(C6, C7) {
          ;
          this.namespace = C6;
          this.items = C7;
        }
        ['getAllItems']() {
          ;
          return this.items.reduce((C6, C7) => {
            ;
            var C8 = OL[this.namespace + '.' + C7];
            ;
            return C8 && (C6[C7] = 'captions' !== C7 ? (0, OK.serialize)(C8) : JSON.parse(C8)), C6;
          }, {});
        }
        ['track'](C6) {
          ;
          this.items.forEach(C7 => {
            C6.on('change:' + C7, (C8, C9) => {
              ;
              ;
              ;
              try {
                'captions' === C7 && (C9 = JSON.stringify(C9));
                OL[this.namespace + '.' + C7] = C9;
              } catch (CO) {
                Ot.Z.debug && console.error(CO);
              }
            });
          });
        }
        ['clear']() {
          ;
          this.items.forEach(C6 => {
            ;
            ;
            OL.removeItem(this.namespace + '.' + C6);
          });
        }
      };
      var Ox = OI(7753), Oa = OI(9918), Oj = OI(328), Ok = OI(4225), Ow = OI(7683), Ou = OI(4609), On = OI(5882);
      OI(4671);
      OI(9926);
      function C0(C6, C7) {
        ;
        ;
        ;
        C7 && C7.code && (C7.sourceError && console.error(C7.sourceError), console.error(Og.rG.logMessage(C7.code)));
      }
      function C1(C6) {
        ;
        ;
        C6 && C6.code && console.warn(Og.rG.logMessage(C6.code));
      }
      ;
      function C2(C6) {
        ;
        ;
        ;
        this['_events'] = {};
        this.modelShim = new Ox.Z();
        this.modelShim['_qoeItem'] = new OJ.Z();
        this.mediaShim = {};
        this.setup = new Oy(this.modelShim);
        this.currentContainer = this.originalContainer = C6;
        this.apiQueue = new OR.Z(this, [
          'load',
          'play',
          'pause',
          'seek',
          'stop',
          'playlistItem',
          'playlistNext',
          'playlistPrev',
          'next',
          'preload',
          'setAllowFullscreen',
          'setConfig',
          'setCurrentAudioTrack',
          'setCurrentCaptions',
          'setCurrentQuality',
          'setFullscreen',
          'setPip',
          'requestPip',
          'addButton',
          'removeButton',
          'castToggle',
          'requestCast',
          'setMute',
          'setVolume',
          'setPlaybackRate',
          'addCues',
          'setCues',
          'getCues',
          'setPlaylistItem',
          'stopCasting',
          'getChapters',
          'getCurrentChapter',
          'setChapter',
          'resize',
          'setCaptions',
          'setControls'
        ], () => true);
      }
      const C3 = function (C6, C7) {
        if (!document.body.contains(C6.currentContainer)) {
          const C8 = document.getElementById(C6.get('id'));
          C8 && (C6.currentContainer = C8);
        }
        ;
        ;
        ;
        C6.currentContainer.parentElement && C6.currentContainer.parentElement.replaceChild(C7, C6.currentContainer);
        C6.currentContainer = C7;
      }, C4 = (Object.assign(C2.prototype, {
        'on': Oj.ZP.on,
        'once': Oj.ZP.once,
        'off': Oj.ZP.off,
        'trigger': Oj.ZP.trigger,
        'init'(C6, C7) {
          ;
          ;
          const C8 = this.modelShim, C9 = new OS('jwplayer', [
            'volume',
            'mute',
            'captionLabel',
            'captions',
            'bandwidthEstimate',
            'bitrateSelection',
            'qualityLabel',
            'enableShortcuts'
          ]), CO = null == C9 ? void 0 : C9.getAllItems(), CC = (C8.attributes = C8.attributes || {}, Object.assign(this.mediaShim, Oa.L4), C6), Cr = (0, Oi.ZP)(Object.assign({}, C6), CO);
          Cr.id = C7.id;
          Cr.setupConfig = CC;
          Object.assign(C8.attributes, Cr, Oa.bv);
          C8.getProviders = function () {
            return new OQ.Z(Cr);
          };
          C8.setProvider = function () {
          };
          ;
          let CA = (0, Ow.Z)();
          {
            C8.get('backgroundLoading') || (CA = (0, Ou.Z)(CA.getPrimedElement(), CA));
            const Cj = this.primeUi = new On.ZP((0, On.GU)(this.originalContainer)).once('gesture', () => {
              ;
              CA.prime();
              this.preload();
              Cj.destroy();
            });
          }
          return C8.on('change:errorEvent', C0), this.setup.start(C7).then(CI => {
            var CR = CI.core;
            ;
            ;
            ;
            if (!CR) {
              throw (0, Og.l9)(null, Og.y7);
            }
            if (this.setup) {
              this.on(OP.cM, C1);
              CI.warnings.forEach(Cq => {
                ;
                this.trigger(OP.cM, Cq);
              });
              CI = this.modelShim.clone();
              if (CI.error) {
                throw CI.error;
              }
              var Ci = this.apiQueue.queue.slice(0), CR = (this.apiQueue.destroy(), Object.assign(this, CR.prototype), this.playerSetup(CI, C7, this.originalContainer, this['_events'], Ci, CA), this['_model']);
              return C8.off('change:errorEvent', C0), CR.on('change:errorEvent', C0), C9.track(CR), this.updatePlaylist(CR.get('playlist'), CR.get('feedData')).catch(Cq => {
                var CX = Cq.code === Og['_M'] ? Og.IB : Og.xk;
                ;
                throw (0, Og.l9)(Cq, CX);
              });
            }
          }).then(() => {
            ;
            this.setup && this.playerReady();
          }).catch(CI => {
            ;
            var CR, Ci, Cq;
            this.setup && (CR = this, Ci = C7, Cq = CI, Promise.resolve().then(() => {
              ;
              ;
              ;
              var CX = (0, Og.Mm)(Og.ud, Og.nk, Cq), Cl = CR['_model'] || CR.modelShim, Cz = (CX.message = CX.message || Cl.get('localization').errors[CX.key], delete CX.key, Cl.get('contextual'));
              if (!Cz) {
                const CU = (0, Ok.Z)(CR, CX);
                Ok.Z.cloneIcon && CU.querySelector('.jw-icon').appendChild(Ok.Z.cloneIcon('error'));
                C3(CR, CU);
              }
              Cl.set('errorEvent', CX);
              Cl.set('state', OP.Vy);
              CR.trigger(OP.HH, CX);
              Cz && Ci.remove();
            }));
          });
        },
        'playerDestroy'() {
          ;
          ;
          ;
          this.destroy && this.destroy();
          this.apiQueue && this.apiQueue.destroy();
          this.setup && this.setup.destroy();
          this.primeUi && this.primeUi.destroy();
          this.currentContainer !== this.originalContainer && C3(this, this.originalContainer);
          this.off();
          this['_events'] = this['_model'] = this.modelShim = this.apiQueue = this.primeUi = this.setup = null;
        },
        'getContainer'() {
          ;
          return this.currentContainer;
        },
        'get'(C6) {
          ;
          if (this.modelShim) {
            return C6 in this.mediaShim ? this.mediaShim[C6] : this.modelShim.get(C6);
          }
        },
        'getItemQoe'() {
          ;
          return this.modelShim['_qoeItem'];
        },
        'getItemPromise': () => null,
        'setItemCallback'(C6) {
          ;
          ;
          this.modelShim && (this.modelShim.attributes.playlistItemCallback = C6);
        },
        'getConfig'() {
          ;
          ;
          return Object.assign({}, this.modelShim.attributes, this.mediaShim);
        },
        'getCurrentCaptions'() {
          return this.get('captionsIndex');
        },
        'getWidth'() {
          ;
          return this.get('containerWidth');
        },
        'getHeight'() {
          ;
          return this.get('containerHeight');
        },
        'getMute'() {
          ;
          ;
          return this.get('mute');
        },
        'getProvider'() {
          ;
          return this.get('provider');
        },
        'getState'() {
          ;
          return this.get('state');
        },
        'getAbsolutePosition': () => null,
        'getAudioTracks': () => null,
        'getCaptionsList': () => null,
        'getQualityLevels': () => null,
        'getVisualQuality': () => null,
        'getCurrentQuality': () => -1,
        'getCurrentAudioTrack': () => -1,
        'getSafeRegion': () => ({
          'x': 0,
          'y': 0,
          'width': 0,
          'height': 0
        }),
        'isBeforeComplete': () => false,
        'isBeforePlay': () => false,
        'createInstream': () => null,
        'skipAd'() {
        },
        'getMediaElement'() {
        },
        'attachMedia'() {
        },
        'detachMedia'() {
        }
      }), C2);
    },
    4446: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'A6': () => 308000,
        'DD': () => 202000,
        'EY': () => 204000,
        'H4': () => OW,
        'IB': () => 102700,
        'MD': () => OD,
        'Mm': () => OV,
        'Sp': () => Om,
        'T6': () => 100001,
        'Y7': () => 306000,
        'YQ': () => 200001,
        '_M': () => 203700,
        'aD': () => 300200,
        'fU': () => 101000,
        'l9': () => OH,
        'nk': () => 100000,
        'nm': () => Oh,
        'o2': () => 203640,
        'pJ': () => 'cantLoadPlayer',
        'rG': () => Oy,
        'tJ': () => 203000,
        'ud': () => OB,
        'ul': () => Oo,
        'wH': () => 308640,
        'wM': () => 300100,
        'xk': () => 102000,
        'y4': () => 104000,
        'y7': () => 100002,
        'zO': () => 'cantPlayInBrowser'
      });
      ;
      ;
      var OR = OI(6042);
      ;
      const Oo = 'cantPlayVideo', OD = 'badConnection', Om = 'liveStreamDown', OW = 'protectedContent', OB = 'technicalError';
      class Oy {
        constructor(OZ, OT, Os) {
          ;
          ;
          this.code = (0, OR.qh)(OT) ? OT : 0;
          this.sourceError = Os || null;
          OZ ? this.key = OZ : delete this.key;
        }
        static ['logMessage'](OZ) {
          ;
          var OT = OZ % 1000, Os = Math.floor((OZ - OT) / 1000);
          let Op = OZ.toString();
          ;
          ;
          return 'JW Player ' + (299999 < OZ && OZ < 400000 ? 'Warning' : 'Error') + ' ' + OZ + '. For more information see https://developer.jwplayer.com/jw-player/docs/developer-guide/api/errors-reference#' + (Op = 400 <= OT && OT < 600 ? Os + ('400-' + Os + '599') : Op);
        }
      }
      const OV = function (OZ, OT, Os) {
        ;
        return Os instanceof Oy && Os.code ? Os : new Oy(OZ, OT, Os);
      }, OH = function (OZ, OT) {
        ;
        var Os = OV(OB, OT, OZ);
        ;
        return Os.code = (OZ && OZ instanceof Oy && OZ.code || 0) + OT, Os;
      }, Oh = function (OZ) {
        ;
        ;
        var {
          name: OZ,
          message: OT
        } = OZ;
        switch (OZ) {
          case 'AbortError':
            return /pause/.test(OT) ? 303213 : /load/.test(OT) ? 303212 : 303210;
          case 'NotAllowedError':
            return 303220;
          case 'NotSupportedError':
            return 303230;
          default:
            return 303200;
        }
      };
    },
    6391: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, { 'Z': () => OR });
      const OR = [];
    },
    7411: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, { 'Z': () => Ol });
      ;
      ;
      var OR = OI(5004);
      const Oi = window.performance || { 'timing': {} }, Oq = Oi.timing.navigationStart || (0, OR.z)(), OX = ('now' in Oi || (Oi.now = () => (0, OR.z)() - Oq), () => Oq + Oi.now()), Ol = class {
        constructor() {
          ;
          this.startTimes = {};
          this.sum = {};
          this.counts = {};
          this.ticks = {};
        }
        ['start'](Oz) {
          ;
          this.startTimes[Oz] = OX();
          this.counts[Oz] = this.counts[Oz] + 1 || 1;
        }
        ['end'](Oz) {
          ;
          var OU;
          ;
          ;
          this.startTimes[Oz] && (OU = OX() - this.startTimes[Oz], delete this.startTimes[Oz], this.sum[Oz] = this.sum[Oz] + OU || OU);
        }
        ['dump']() {
          ;
          var Oz, OU = Object.assign({}, this.sum);
          for (const Od in this.startTimes)
            !function (Og, OE) {
              if (null == Og) {
                throw new TypeError('Cannot convert undefined or null to object');
              }
              ;
              ;
              return Object.prototype.hasOwnProperty.call(Object(Og), OE);
            }(this.startTimes, Od) || (Oz = OX() - this.startTimes[Od], OU[Od] = OU[Od] + Oz || Oz);
          ;
          ;
          return {
            'counts': Object.assign({}, this.counts),
            'sums': OU,
            'events': Object.assign({}, this.ticks)
          };
        }
        ['tick'](Oz) {
          ;
          this.ticks[Oz] = OX();
        }
        ['clear'](Oz) {
          ;
          delete this.ticks[Oz];
        }
        ['between'](Oz, OU) {
          ;
          ;
          ;
          return this.ticks[OU] && this.ticks[Oz] ? this.ticks[OU] - this.ticks[Oz] : null;
        }
      };
    },
    4601: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'v': () => OX,
        'z': () => Ol
      });
      var OR = OI(2894), Oi = OI(8348);
      let Oq = null;
      const OX = {}, Ol = function () {
        ;
        ;
        return Oq = Oq || (Oi.OS.tizenApp ? OI.e(74).then(function (Oz) {
          var OU = OI(3112).default;
          return OX.controls = OU;
        }.bind(null, OI)).catch(function () {
          (Oq = null, OR.Jt)(301133)();
        }) : OI.e(716).then(function (Oz) {
          ;
          var OU = OI(4646).default;
          return OX.controls = OU;
        }.bind(null, OI)).catch(function () {
          (Oq = null, OR.Jt)(301130)();
        }));
      };
    },
    8348: (OA, Oj, OI) => {
      'use strict';
      OI.r(Oj);
      OI.d(Oj, {
        'Browser': () => Ol,
        'Features': () => OU,
        'OS': () => Oz
      });
      var OR = OI(2268);
      ;
      const Oi = (Od, Og) => {
        ;
        Od = Od.exec(Og);
        if (Od && 1 < Od.length) {
          return Od[1];
        }
      }, Oq = navigator.userAgent, OX = () => {
      }, Ol = {
        get 'androidNative'() {
          return (0, OR.O7)();
        },
        get 'chrome'() {
          return (0, OR.i7)();
        },
        get 'edge'() {
          return (0, OR.un)();
        },
        get 'facebook'() {
          return (0, OR.DF)();
        },
        get 'firefox'() {
          return (0, OR.pZ)();
        },
        get 'ie'() {
          return (0, OR.w1)();
        },
        get 'msie'() {
          return (0, OR.A)();
        },
        get 'safari'() {
          return (0, OR.G6)();
        },
        get 'version'() {
          ;
          ;
          ;
          {
            var Od = this, Og = Oq;
            let OE, Ov, Oe, Ob;
            if (Od.chrome) {
              OE = -1 !== Og.indexOf('Chrome') ? Og.substring(Og.indexOf('Chrome') + 7) : Og.substring(Og.indexOf('CriOS') + 6);
            } else {
              if (Od.safari) {
                OE = Og.substring(Og.indexOf('Version') + 8);
              } else {
                if (Od.firefox) {
                  OE = Og.substring(Og.indexOf('Firefox') + 8);
                } else {
                  if (Od.edge) {
                    let OF = Og.indexOf('Edge');
                    -1 === OF ? OF = Og.indexOf('Edg') + 4 : OF += 5;
                    OE = Og.substring(OF);
                  } else {
                    Od.ie && (-1 !== Og.indexOf('rv:') ? OE = Og.substring(Og.indexOf('rv:') + 3) : -1 !== Og.indexOf('MSIE') && (OE = Og.substring(Og.indexOf('MSIE') + 5)));
                  }
                }
              }
            }
            return OE && (-1 !== (Ob = (OE = -1 !== (Ob = (OE = -1 !== (Ob = OE.indexOf(';')) ? OE.substring(0, Ob) : OE).indexOf(' ')) ? OE.substring(0, Ob) : OE).indexOf(')')) && (OE = OE.substring(0, Ob)), Ov = parseInt(OE, 10), Oe = parseInt(OE.split('.')[1], 10)), {
              'version': OE,
              'major': Ov,
              'minor': Oe
            };
          }
        }
      }, Oz = {
        get 'android'() {
          return (0, OR.Dt)();
        },
        get 'iOS'() {
          return (0, OR.gn)();
        },
        get 'mobile'() {
          return (0, OR.tq)();
        },
        get 'mac'() {
          return (0, OR.id)();
        },
        get 'iPad'() {
          return (0, OR.zc)();
        },
        get 'iPhone'() {
          return (0, OR.xb)();
        },
        get 'windows'() {
          ;
          ;
          return -1 < Oq.indexOf('Windows');
        },
        get 'tizen'() {
          return (0, OR.yS)();
        },
        get 'tizenApp'() {
          return (0, OR.Q6)();
        },
        get 'version'() {
          ;
          ;
          ;
          {
            var Od = this, Og = Oq;
            let OE, Ov, Oe;
            if (Od.windows) {
              switch (OE = Oi(/Windows(?: NT|)? ([._\d]+)/, Og), OE) {
                case '6.1':
                  OE = '7.0';
                  break;
                case '6.2':
                  OE = '8.0';
                  break;
                case '6.3':
                  OE = '8.1';
              }
            } else {
              Od.android ? OE = Oi(/Android ([._\d]+)/, Og) : Od.iOS ? OE = Oi(/OS ([._\d]+)/, Og) : Od.mac ? OE = Oi(/Mac OS X ([._\d]+)/, Og) : Od.tizen && (OE = Oi(/Tizen ([._\d]+)/, Og));
            }
            if (OE) {
              Ov = parseInt(OE, 10);
              const Ob = OE.split(/[._]/);
              Ob && (Oe = parseInt(Ob[1], 10));
            }
            return {
              'version': OE,
              'major': Ov,
              'minor': Oe
            };
          }
        }
      }, OU = {
        get 'flash'() {
          return (0, OR.NO)();
        },
        get 'flashVersion'() {
          return (0, OR.dI)();
        },
        get 'iframe'() {
          return (0, OR.cL)();
        },
        get 'passiveEvents'() {
          ;
          ;
          {
            let Og = false;
            try {
              var Od = Object.defineProperty({}, 'passive', { 'get': () => Og = true });
              window.addEventListener('testPassive', OX, Od);
              window.removeEventListener('testPassive', OX, Od);
            } catch (OE) {
            }
            return Og;
          }
        },
        get 'backgroundLoading'() {
          ;
          return !(Oz.iOS || Ol.safari || Oz.tizen);
        }
      };
    },
    1643: (OA, Oj, OI) => {
      'use strict';
      ;
      ;
      ;
      OI.d(Oj, {
        '$_': () => OD,
        '$j': () => Oh,
        'AQ': () => 'absolutePositionReady',
        'Ax': () => 'adPause',
        'B1': () => OF,
        'Bs': () => Cg,
        'Ew': () => OK,
        'FU': () => 'firstFrame',
        'Gj': () => Cz,
        'HH': () => 'setupError',
        'Hy': () => C8,
        'Ib': () => Cq,
        'Je': () => OS,
        'Jl': () => OT,
        'K5': () => Oc,
        'Kb': () => OR,
        'Ms': () => Oy,
        'NZ': () => OH,
        'O1': () => 'metadataCueParsed',
        'Ow': () => 'playlist',
        'P': () => Ob,
        'QF': () => 'playbackRateChanged',
        'R2': () => Ou,
        'RF': () => Ce,
        'Rc': () => OV,
        'Rt': () => Oo,
        'SL': () => 'captionsList',
        'Sv': () => Ov,
        'TJ': () => 'ratechange',
        'U3': () => OY,
        'UF': () => 'subtitlesTrackChanged',
        'UW': () => C9,
        'UZ': () => C5,
        'V$': () => OQ,
        'Vy': () => Oz,
        'WE': () => 'adPlay',
        'Wp': () => 'drag',
        'Z_': () => Cl,
        '_5': () => OX,
        '_B': () => Cj,
        'aM': () => C6,
        'aQ': () => Ox,
        'bc': () => Oi,
        'cM': () => OG,
        'cq': () => OL,
        'cy': () => 'displayClick',
        'gO': () => CC,
        'gy': () => 'mute',
        'h7': () => 'fullscreenchange',
        'ik': () => 'loading',
        'j0': () => CA,
        'jt': () => CI,
        'k3': () => Om,
        'l5': () => Cd,
        'nQ': () => Od,
        'nv': () => 'dragStart',
        'oZ': () => 'mediaType',
        'ot': () => 'click',
        'pi': () => 'cast',
        'pn': () => OM,
        'qG': () => Cv,
        'r0': () => Ol,
        'rx': () => C4,
        's$': () => 'beforeComplete',
        'sF': () => 'resize',
        't6': () => Cb,
        'tP': () => 'move',
        'uL': () => OW,
        'uT': () => 'bufferChange',
        'uc': () => 'state',
        'ug': () => 'visualQuality',
        'wh': () => OB,
        'xQ': () => Oq,
        'xf': () => CU,
        'yH': () => C1
      });
      const OR = 'buffering', Oi = 'idle', Oq = 'complete', OX = 'paused', Ol = 'playing', Oz = 'error', Od = 'stalled', Ov = 'dragEnd', Ob = 'doubleClick', OF = 'over', Oc = 'enter', OY = 'out', OM = Oz, OG = 'warning', Oo = 'adClick', OD = 'mediaLoaded', Om = 'adSkipped', OW = 'adTime', OB = 'autostartNotAllowed', Oy = Oq, OV = 'ready', OH = 'seek', Oh = 'beforePlay', OT = 'bufferFull', OQ = 'playlistComplete', OK = 'mediaError', OL = 'playAttempt', OS = 'playAttemptFailed', Ox = 'seeked', Ou = 'time', C1 = 'volume', C4 = 'meta', C5 = 'levels', C6 = 'levelsChanged', C8 = 'controls', C9 = 'fullscreen', CC = 'playlistItem', CA = 'audioTracks', Cj = 'audioTrackChanged', CI = 'subtitlesTracks', Cq = 'logoClick', Cl = 'captionsChanged', Cz = 'providerFirstFrame', CU = 'userAction', Cd = 'instreamClick', Cg = 'breakpoint', Cv = 'bandwidthEstimate', Ce = 'float', Cb = 'chapter';
    },
    9918: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'L4': () => Oi,
        'OG': () => 25,
        'bv': () => OR,
        'ni': () => 120
      });
      const OR = {
        'audioMode': false,
        'itemMeta': {},
        'playbackRate': 1,
        'playRejected': false,
        'state': OI(1643).bc,
        'itemReady': false,
        'controlsEnabled': false
      };
    },
    7753: (OA, Oj, OI) => {
      'use strict';
      ;
      ;
      OI.d(Oj, { 'Z': () => OR });
      ;
      class OR extends OI(328).ZP {
        constructor() {
          ;
          ;
          super();
          this.attributes = Object.create(null);
        }
        ['addAttributes'](Oi) {
          ;
          Object.keys(Oi).forEach(Oq => {
            ;
            this.add(Oq, Oi[Oq]);
          });
        }
        ['add'](Oi, Oq) {
          ;
          Object.defineProperty(this, Oi, {
            'get': () => this.attributes[Oi],
            'set': OX => {
              ;
              this.set(Oi, OX);
            },
            'enumerable': false
          });
          this.attributes[Oi] = Oq;
        }
        ['get'](Oi) {
          ;
          return this.attributes[Oi];
        }
        ['set'](Oi, Oq) {
          ;
          ;
          var OX;
          ;
          this.attributes[Oi] !== Oq && (OX = this.attributes[Oi], this.attributes[Oi] = Oq, this.trigger('change:' + Oi, this, Oq, OX));
        }
        ['clone']() {
          ;
          var Oi = { OX: Oq[OX] }, Oq = this.attributes;
          if (Oq) {
            for (const OX in Oq);
          }
          return Oi;
        }
        ['change'](Oi, Oq, OX) {
          this.on('change:' + Oi, Oq, OX);
          ;
          ;
          Oi = this.get(Oi);
          ;
          return Oq.call(OX, this, Oi, Oi), this;
        }
      }
    },
    7941: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, {
        'dZ': () => Oq,
        'my': () => Ol,
        'qk': () => OX,
        'r1': () => Oi
      });
      var OR = OI(2957);
      const Oi = Oz => {
        ;
        ;
        let OU = '';
        ;
        return Oz && (Oz.localName ? OU = Oz.localName : Oz.baseName && (OU = Oz.baseName)), OU;
      }, Oq = Oz => {
        ;
        ;
        let OU = '';
        return Oz && (Oz.textContent ? OU = (0, OR.fy)(Oz.textContent) : Oz.text && (OU = (0, OR.fy)(Oz.text))), OU;
      }, OX = (Oz, OU) => Oz.childNodes[OU], Ol = Oz => Oz.childNodes ? Oz.childNodes.length : 0;
    },
    6769: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'Z': () => function (Od) {
          ;
          var Og = [];
          Og.feedData = {};
          for (let Ob = 0; Ob < (0, OR.my)(Od); Ob++) {
            var OE = (0, OR.qk)(Od, Ob);
            if ('channel' === (0, OR.r1)(OE).toLowerCase()) {
              for (let OF = 0; OF < (0, OR.my)(OE); OF++) {
                var Ov = (0, OR.qk)(OE, OF), Oe = (0, OR.r1)(Ov).toLowerCase();
                'item' === Oe ? Og.push(OU(Ov)) : Oe && (Og.feedData[Oe] = (0, OR.dZ)(Ov));
              }
            }
          }
          ;
          ;
          return Og;
        }
      });
      var OR = OI(7941), Oi = OI(2957);
      function Oq(Od, Og) {
        const OE = [];
        for (let Ob = 0; Ob < (0, OR.my)(Od); Ob++) {
          var Ov = Od.childNodes[Ob];
          if ('media' === Ov.prefix && (0, OR.r1)(Ov)) {
            switch ((0, OR.r1)(Ov).toLowerCase()) {
              case 'content':
                if ((0, Oi.Dc)(Ov, 'duration') && (Og.duration = (0, Oi.m9)((0, Oi.Dc)(Ov, 'duration'))), (0, Oi.Dc)(Ov, 'url')) {
                  Og.sources || (Og.sources = []);
                  const OF = {
                    'file': (0, Oi.Dc)(Ov, 'url'),
                    'type': (0, Oi.Dc)(Ov, 'type'),
                    'width': (0, Oi.Dc)(Ov, 'width'),
                    'label': (0, Oi.Dc)(Ov, 'label')
                  }, OP = (Oc => {
                    var OY = [];
                    ;
                    ;
                    for (let OG = 0; OG < (0, OR.my)(Oc); OG++) {
                      var OM = Oc.childNodes[OG];
                      'jwplayer' === OM.prefix && 'mediatypes' === (0, OR.r1)(OM).toLowerCase() && OY.push((0, OR.dZ)(OM));
                    }
                    return OY;
                  })(Ov);
                  OP.length && (OF.mediaTypes = OP);
                  Og.sources.push(OF);
                }
                0 < (0, OR.my)(Ov) && (Og = Oq(Ov, Og));
                break;
              case 'title':
                Og.title = (0, OR.dZ)(Ov);
                break;
              case 'description':
                Og.description = (0, OR.dZ)(Ov);
                break;
              case 'guid':
                Og.mediaid = (0, OR.dZ)(Ov);
                break;
              case 'thumbnail':
                Og.image || (Og.image = (0, Oi.Dc)(Ov, 'url'));
                break;
              case 'group':
                Oq(Ov, Og);
                break;
              case 'subtitle': {
                const Oc = {
                  'file': (0, Oi.Dc)(Ov, 'url'),
                  'kind': 'captions'
                };
                0 < (0, Oi.Dc)(Ov, 'lang').length && (Oc.label = (Oe = (0, Oi.Dc)(Ov, 'lang'), void 0, {
                  'zh': 'Chinese',
                  'nl': 'Dutch',
                  'en': 'English',
                  'fr': 'French',
                  'de': 'German',
                  'it': 'Italian',
                  'ja': 'Japanese',
                  'pt': 'Portuguese',
                  'ru': 'Russian',
                  'es': 'Spanish'
                }[Oe] || Oe));
                OE.push(Oc);
                break;
              }
            }
          }
        }
        var Oe;
        Og.tracks || (Og.tracks = []);
        ;
        for (let OY = 0; OY < OE.length; OY++) {
          Og.tracks.push(OE[OY]);
        }
        ;
        ;
        return Og;
      }
      const OX = Oq;
      var Ol = OI(9888), Oz = OI(393);
      const OU = Od => {
        var Og = {
          file: (0, Oi.Dc)(OE, 'url'),
          title: (0, OR.dZ)(OE),
          mediaid: (0, OR.dZ)(OE),
          date: (0, OR.dZ)(OE),
          description: (0, OR.dZ)(OE),
          link: (0, OR.dZ)(OE)
        };
        ;
        for (let Oe = 0; Oe < Od.childNodes.length; Oe++) {
          var OE = Od.childNodes[Oe], Ov = (0, OR.r1)(OE);
          if (Ov) {
            switch (Ov.toLowerCase()) {
              case 'enclosure':
                ;
                break;
              case 'title':
                ;
                break;
              case 'guid':
                ;
                break;
              case 'pubdate':
                ;
                break;
              case 'description':
                ;
                break;
              case 'link':
                ;
                break;
              case 'category':
                Og.tags ? Og.tags += (0, OR.dZ)(OE) : Og.tags = (0, OR.dZ)(OE);
            }
          }
        }
        ;
        ;
        return new Oz.Z(function (Ob, OF) {
          var Oc = 'file', OY = [], OM = [], OG = OF;
          for (let OD = 0; OD < Ob.childNodes.length; OD++) {
            var Oo = Ob.childNodes[OD];
            if ('jwplayer' === Oo.prefix) {
              const Of = (0, OR.r1)(Oo);
              'source' === Of ? (delete OF.sources, OY.push({
                'file': (0, Oi.Dc)(Oo, Oc),
                'default': (0, Oi.Dc)(Oo, 'default'),
                'label': (0, Oi.Dc)(Oo, 'label'),
                'type': (0, Oi.Dc)(Oo, 'type')
              })) : 'track' === Of ? (delete OF.tracks, OM.push({
                'file': (0, Oi.Dc)(Oo, Oc),
                'default': (0, Oi.Dc)(Oo, 'default'),
                'kind': (0, Oi.Dc)(Oo, 'kind'),
                'label': (0, Oi.Dc)(Oo, 'label')
              })) : (OF[Of] = (0, Ol.serialize)((0, OR.dZ)(Oo)), 'file' === Of && OF.sources && delete OF.sources);
            }
            OF[Oc] || (OF[Oc] = OF.link);
          }
          ;
          ;
          if (OY.length) {
            OF.sources = [];
            for (let ON = 0; ON < OY.length; ON++) {
              const Om = OY[ON];
              0 < Om.file.length && (Om.default = 'true' === OY[ON].default, Om.label || delete Om.label, OG.sources.push(Om));
            }
          }
          if (OM.length) {
            OF.tracks = [];
            for (let OW = 0; OW < OM.length; OW++) {
              const OB = OM[OW];
              OB.file && 0 < OB.file.length && (OB.default = 'true' === OM[OW].default, OB.kind = OM[OW].kind.length ? OM[OW].kind : 'captions', OB.label || delete OB.label, OG.tracks.push(OB));
            }
          }
          ;
          return OG;
        }(Od, OX(Od, Og)));
      };
    },
    2557: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        't': () => OR,
        'u': () => Oi
      });
      class OR {
        constructor(Oq, OX) {
          ;
          ;
          this.defaultLanguage = Oq;
          this.timestamps = OX;
        }
      }
      ;
      class Oi {
        constructor({
          title: Oq = {},
          group: OX,
          time: Ol,
          image: Oz
        }) {
          ;
          ;
          ;
          this.title = {};
          this.time = Ol;
          this.group = OX;
          this.image = Oz;
          Object.keys(Oq).forEach(OU => {
            ;
            var Od = Oq[OU];
            this.addTitle(OU, Od);
          });
        }
        ['addTitle'](Oq, OX) {
          ;
          this.title[Oq] = OX;
        }
      }
    },
    393: (OA, Oj, OI) => {
      'use strict';
      ;
      ;
      OI.d(Oj, { 'Z': () => Oz });
      var OR = OI(6053);
      function Oi(OU) {
        ;
        ;
        var Od;
        if (OU && OU.file) {
          return (OU = Object.assign({}, {
            'kind': 'captions',
            'default': false
          }, OU)).kind = (Od = OU.kind, -1 !== Oq.indexOf(Od) ? OU.kind : 'captions'), OU.default = Boolean(OU.default), OU;
        }
      }
      const Oq = [
        'captions',
        'metadata',
        'thumbnails',
        'chapters'
      ];
      var OX = OI(9918);
      const Ol = Array.isArray, Oz = function (OU) {
        Ol((OU = OU || {}).tracks) || delete OU.tracks;
        ;
        var Od = Object.assign({}, {
          'sources': [],
          'tracks': [],
          'minDvrWindow': OX.ni
        }, OU);
        ;
        ;
        Od.sources !== Object(Od.sources) || Ol(Od.sources) || (Od.sources = [(0, OR.Z)(Od.sources)]);
        Ol(Od.sources) && 0 !== Od.sources.length || (OU.levels ? Od.sources = OU.levels : Od.sources = [(0, OR.Z)(OU)]);
        for (let Ov = 0; Ov < Od.sources.length; Ov++) {
          var Og, OE = Od.sources[Ov];
          OE && (Og = OE.default, OE.default = !!Og && 'true' === Og.toString(), Od.sources[Ov].label || (Od.sources[Ov].label = Ov.toString()), Od.sources[Ov] = (0, OR.Z)(Od.sources[Ov]));
        }
        return Od.sources = Od.sources.filter(Boolean), Ol(Od.tracks) || (Od.tracks = []), Ol(Od.captions) && (Od.tracks = Od.tracks.concat(Od.captions), delete Od.captions), Od.tracks = Od.tracks.map(Oi).filter(Boolean), Od;
      };
    },
    7263: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, { 'Z': () => OU });
      var OR = OI(1643), Oi = OI(7941), Oq = OI(6769), OX = OI(6886), Ol = OI(328), Oz = OI(4446);
      const OU = function () {
        ;
        ;
        function Od(Ov) {
          ;
          ;
          ;
          try {
            const Oe = Ov.responseXML ? Ov.responseXML.childNodes : null;
            let Ob, OF = null;
            if (Oe) {
              for (let OP = 0; OP < Oe.length && 8 === (OF = Oe[OP]).nodeType; OP++) {
                ;
              }
              if ((OF = OF && 'xml' === (0, Oi.r1)(OF) ? OF.nextSibling : OF) && 'rss' === (0, Oi.r1)(OF)) {
                const Oc = (0, Oq.Z)(OF);
                Ob = Object.assign({ 'playlist': Oc }, Oc.feedData);
              }
            }
            if (!Ob) {
              try {
                const OY = JSON.parse(Ov.responseText);
                if (Array.isArray(OY)) {
                  Ob = { 'playlist': OY };
                } else {
                  if (!Array.isArray(OY.playlist)) {
                    throw Error('Playlist is not an array');
                  }
                  Ob = OY;
                }
              } catch (OM) {
                throw new Oz.rG(Oz.ul, 621, OM);
              }
            }
            Og.trigger(OR.Ow, Ob);
          } catch (OG) {
            OE(OG);
          }
        }
        const Og = Object.assign(this, Ol.ZP), OE = function (Ov) {
          ;
          Ov instanceof Oz.rG && !Ov.code && (Ov = new Oz.rG(Oz.ul, 0));
          Og.trigger(OR.pn, Ov);
        };
        this.load = function (Ov) {
          (0, OX.h)(Ov, Od, (Oe, Ob, OF, OP) => {
            OE(OP);
          });
        };
        this.destroy = function () {
          ;
          this.off();
        };
      };
    },
    8320: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, {
        'ZP': () => Oc,
        's7': () => Oe,
        'T5': () => OP,
        'YF': () => Ov,
        '_': () => Ob,
        'bx': () => OF
      });
      const Oi = (OY, OM) => OR[OY] ? OY : OR[OM] ? OM : 'metadata';
      var Oq = OI(393), OX = OI(6053), Ol = OI(2303), Oz = OI(4446);
      const OU = (OY, OM) => void 0 === OY ? OM : OY, Od = (OY, OM, OG) => {
        OG in OM && (OY[OG] = OM[OG]);
      }, Og = (OY, OM) => {
        ;
        const OG = OM.attributes, {
          sources: Oo,
          allSources: OD,
          preload: Of,
          drm: ON
        } = OY, Om = OU(OY.withCredentials, OG.withCredentials);
        ;
        return (OD || Oo).map(function (OW) {
          ;
          var OB, Oy, OV;
          ;
          return OW !== Object(OW) ? null : (Od(OW, OG, 'androidhls'), Od(OW, OG, 'hlsjsdefault'), Od(OW, OG, 'safarihlsjs'), OV = OW, OB = OY, Oy = OG, OV.liveSyncDuration || (OB = OB.liveSyncDuration ? OB : Oy, Od(OV, OB, 'liveSyncDuration')), Od(OW, OG, '_hlsjsProgressive'), OW.preload = Oi(OW.preload, Of), (Oy = OW.drm || ON || OG.drm) && (OW.drm = Oy), void 0 !== (OV = OU(OW.withCredentials, Om)) && (OW.withCredentials = OV), (0, OX.Z)(OW));
        }).filter(Boolean);
      }, OE = (OY, OM) => {
        var OG = ((Of, ON) => {
          ;
          for (let OB = 0; OB < Of.length; OB++) {
            var Om = Of[OB], OW = ON.choose(Om).providerToCheck;
            if (OW) {
              return {
                'type': Om.type,
                'provider': OW
              };
            }
          }
          ;
          return null;
        })(OY, OM = OM && OM.choose ? OM : new Ol.Z());
        ;
        if (!OG) {
          return [];
        }
        const Oo = OG.provider, OD = OG.type;
        ;
        return OY.filter(function (Of) {
          ;
          return Of.type === OD && OM.providerSupports(Oo, Of);
        });
      }, Ov = (OY, OM, OG) => {
        ;
        var Oo = OY.getProviders(), OD = OY.get('preload'), Of = OY.get('jwStart'), ON = Object.assign({}, OM);
        ;
        ;
        if (ON.preload = Oi(OM.preload, OD), ON.allSources = Og(ON, OY), ON.sources = OE(ON.allSources, Oo), ON.sources.length) {
          return ON.file = ON.sources[0].file, ON.feedData = OG, Of && -1 !== Of && OY.get('generateSEOMetadata') && (ON.starttime = Of), (OD = (OM = ON).sources[0].liveSyncDuration) && (OM.liveSyncDuration = OM.dvrSeekLimit = OD), OM;
        }
      }, Oe = (OY, OM, OG) => {
        const Oo = Object.assign({}, OG);
        ;
        ;
        return delete Oo.playlist, OY.map(OD => Ov(OM, OD, Oo)).filter(Boolean);
      }, Ob = OY => {
        ;
        if (!Array.isArray(OY) || 0 === OY.length) {
          throw new Oz.rG(Oz.ul, 630);
        }
      }, OF = (OY, OM) => {
        let OG = (parseInt(OY, 10) || 0) % OM;
        return OG < 0 && (OG += OM), OG;
      }, OP = (OY, OM) => OE(Og(OY, OM), OM.getProviders()), Oc = function (OY) {
        ;
        ;
        return (Array.isArray(OY) ? OY : [OY]).map(Oq.Z);
      };
    },
    6053: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, { 'Z': () => Oq });
      var OR = OI(7034), Oi = OI(2957);
      const Oq = function (OX) {
        ;
        ;
        ;
        if (OX && OX.file) {
          const Oz = Object.assign({}, {
            'default': false,
            'type': ''
          }, OX);
          ;
          var OX = /^[^/]+\/(?:x-)?([^/]+)$/, Ol = Oz.type;
          if (OX.test(Ol) && (Oz.mimeType = Ol, Oz.type = Ol.replace(OX, '$1')), (0, OR.isYouTube)(Oz.file) ? Oz.type = 'youtube' : (0, OR.isRtmp)(Oz.file) ? Oz.type = 'rtmp' : Oz.type || (Oz.type = (0, Oi.AO)(Oz.file)), Oz.type) {
            switch (Oz.type) {
              case 'm3u8':
              case 'vnd.apple.mpegurl':
                ;
                break;
              case 'dash+xml':
                ;
                break;
              case 'm4a':
                ;
                break;
              case 'smil':
                ;
            }
            return Object.keys(Oz).forEach(function (OU) {
              '' === Oz[OU] && delete Oz[OU];
            }), Oz;
          }
        }
      };
    },
    4101: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, { 'Z': () => Od });
      var OR = OI(676), Oi = OI(9888), Oq = OI(2957), OX = OI(4446), Ol = OI(3487);
      function Oz(Og) {
        var OE, Ov;
        ;
        if ('string' == typeof Og) {
          return 0 < (OE = (Og = Og.split('?')[0]).indexOf('://')) ? 0 : (Ov = Og.indexOf('/'), Og = (0, Oq.AO)(Og), !(OE < 0 && Ov < 0) || Og && isNaN(Og) ? 1 : 2);
        }
      }
      ;
      function OU(Og) {
        ;
        this.url = Og;
        this.promise_ = null;
      }
      ;
      Object.defineProperties(OU.prototype, {
        'promise': {
          'get'() {
            ;
            return this.load();
          },
          'set'() {
          }
        }
      });
      Object.assign(OU.prototype, {
        'load'() {
          ;
          let Og = this.promise_;
          ;
          if (!Og) {
            if (2 === Oz(this.url)) {
              return Promise.resolve(this);
            }
            var OE = new OR.ZP((Ov => {
              ;
              switch (Oz(Ov)) {
                case 0:
                  return Ov;
                case 1:
                  return (0, Oi.getAbsolutePath)(Ov, window.location.href);
              }
            })(this.url));
            this.loader = OE;
            Og = OE.load().then(() => this);
            this.promise_ = Og;
          }
          ;
          return Og;
        },
        'registerPlugin'(Og, OE, Ov) {
          ;
          ;
          this.name = Og;
          this.target = OE;
          this.js = Ov;
        },
        'getNewInstance'(Og, OE, Ov) {
          var Oe = this.js;
          if ('function' != typeof Oe) {
            throw new OX.rG(null, (0, Ol.bX)(this.url) + 100);
          }
          ;
          const Ob = new Oe(Og, OE, Ov);
          return Ob.addToPlayer = function () {
            ;
            var OF = this.getContainer().querySelector('.jw-overlays');
            ;
            ;
            OF && (Ov.left = OF.style.left, Ov.top = OF.style.top, OF.appendChild(Ov));
          }, Ob.resizeHandler = function () {
            ;
            var OF = this.getContainer().querySelector('.jw-overlays');
            ;
            OF && Ob.resize(OF.clientWidth, OF.clientHeight);
          }, Ob;
        }
      });
      const Od = OU;
    },
    1241: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, {
        'Z': () => function (Og, OE) {
          ;
          ;
          var Ov = Og.get('plugins');
          ;
          return window.jwplayerPluginJsonp = Od, (Og.pluginLoader = Og.pluginLoader || new Oq()).load(OE, OU, Ov, Og).then(Oe => {
            ;
            ;
            if (!Og.attributes['_destroyed']) {
              return delete window.jwplayerPluginJsonp, Oe;
            }
          });
        },
        'f': () => Od
      });
      var OR = OI(4446), Oi = OI(3487);
      const Oq = function () {
        ;
        this.load = function (Og, OE, Ov, Oe) {
          ;
          ;
          ;
          return Ov && 'object' == typeof Ov ? Promise.all(Object.keys(Ov).filter(Ob => Ob).map(Ob => {
            ;
            const OF = Ov[Ob];
            ;
            return OE.setupPlugin(Ob).then(OP => {
              ;
              ;
              if (!Oe.attributes['_destroyed']) {
                return (0, Oi.MK)(OP, OF, Og);
              }
            }).catch(OP => (OE.removePlugin(Ob), OP.code ? OP : new OR.rG(null, (0, Oi.bX)(Ob), OP)));
          })) : Promise.resolve();
        };
      };
      var OX = OI(4101), Ol = OI(5499);
      ;
      const Oz = {
        length: 0,
        file: (0, Oi.fy)('' + Oz.file),
        type: 'hls',
        type: 'dash',
        type: 'aac',
        type: 'rtmp'
      }, OU = new class {
        ['setupPlugin'](Og) {
          var OE = this.getPlugin(Og);
          ;
          ;
          ;
          return OE ? (OE.url !== Og && (0, Ol.c)('JW Plugin "' + (0, Oi.Nq)(Og) + '" already loaded from "' + OE.url + '". Ignoring "' + Og + '."'), OE.promise) : this.addPlugin(Og).load();
        }
        ['addPlugin'](Og) {
          var OE = (0, Oi.Nq)(Og);
          let Ov = Oz[OE];
          return Ov || (Ov = new OX.Z(Og), Oz[OE] = Ov), Ov;
        }
        ['getPlugin'](Og) {
          return Oz[(0, Oi.Nq)(Og)];
        }
        ['removePlugin'](Og) {
          delete Oz[(0, Oi.Nq)(Og)];
        }
        ['getPlugins']() {
          return Oz;
        }
      }(), Od = function (Og, OE, Ov) {
        ;
        var Oe = OU.addPlugin(Og);
        ;
        Oe.js || Oe.registerPlugin(Og, OE, Ov);
      };
    },
    7164: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'MK': () => OX,
        'Nq': () => Oi,
        'bX': () => Oq
      });
      var OR = OI(5950);
      const Oi = function (Ol) {
        ;
        ;
        var Oz = /\/((.(?!\/))+?)\.js/i.exec(Ol), Oz = (null == Oz ? void 0 : Oz[1]) || Ol;
        return Oz && 'jwpsrv-dnt' === Oz ? 'jwpsrv' : Oz;
      }, Oq = Ol => 305000, OX = (Ol, Oz, OU) => {
        ;
        var Od = Ol.name, Oz = Object.assign({}, Oz, (0, OR.vl)(Ol.url)), Og = document.createElement('div'), Ol = (Og.id = OU.id + '_' + Od, Og.className = 'jw-plugin jw-reset', Ol.getNewInstance(OU, Oz, Og));
        ;
        ;
        return OU.addPlugin(Od, Ol), Ol;
      };
    },
    7683: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'V': () => Oq,
        'Z': () => function () {
          ;
          const OX = OR.Jx, Ol = [], Oz = [];
          for (let OE = 0; OE < OX; OE++) {
            const Ov = Oq();
            Ol.push(Ov);
            Oz.push(Ov);
            Oi(Ov);
          }
          const OU = Oz.shift(), Od = Oz.shift();
          ;
          let Og = false;
          return {
            'primed': () => Og,
            'prime'() {
              ;
              Ol.forEach(Oi);
              Og = true;
            },
            'played'() {
              Og = true;
            },
            'getPrimedElement': () => Oz.shift() || null,
            'getAdElement': () => OU,
            'getTestElement': () => Od,
            'clean'(Oe) {
              ;
              ;
              if (Oe.src) {
                Oe.removeAttribute('src');
                try {
                  Oe.load();
                } catch (Ob) {
                }
              }
            },
            'recycle'(Oe) {
              ;
              ;
              Oe && !Oz.some(Ob => Ob === Oe) && (this.clean(Oe), Oz.push(Oe));
            },
            'syncVolume'(Oe) {
              ;
              const Ob = Math.min(Math.max(0, Oe / 100), 1);
              Ol.forEach(OF => {
                ;
                OF.volume = Ob;
              });
            },
            'syncMute'(Oe) {
              ;
              Ol.forEach(Ob => {
                ;
                Ob.muted = Oe;
              });
            }
          };
        }
      });
      var OR = OI(658);
      const Oi = OX => {
        ;
        OX.src || OX.load();
      }, Oq = OX => {
        const Ol = document.createElement('video');
        ;
        ;
        ;
        return Ol.className = 'jw-video jw-reset', Ol.setAttribute('tabindex', '-1'), Ol.setAttribute('disableRemotePlayback', ''), Ol.setAttribute('webkit-playsinline', ''), Ol.setAttribute('playsinline', ''), OX && Object.keys(OX).forEach(Oz => {
          ;
          Ol.setAttribute(Oz, OX[Oz]);
        }), Ol;
      };
    },
    658: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'HB': () => 1,
        'Jx': () => 4,
        'l_': () => 5
      });
      ;
    },
    4609: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'Z': () => function (OR, Oi) {
          return Object.assign({}, Oi, {
            'prime'() {
              ;
              OR.src || OR.load();
            },
            'getPrimedElement': () => OR,
            'clean'() {
              ;
              Oi.clean(OR);
            },
            'recycle'() {
              ;
              Oi.clean(OR);
            }
          });
        }
      });
    },
    6528: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, { 'Z': () => Oz });
      var OR = OI(1643), Oi = OI(1384);
      function Oq() {
      }
      const OX = () => false, Oz = {
        'supports': OX,
        'play': Oq,
        'pause': Oq,
        'preload': Oq,
        'load': Oq,
        'stop': Oq,
        'volume': Oq,
        'mute': Oq,
        'seek': Oq,
        'resize': Oq,
        'remove': Oq,
        'destroy': Oq,
        'setVisibility': Oq,
        'setFullscreen'(OU) {
          return (0, Oi.CX)(this, OU);
        },
        'getFullscreen': OX,
        'supportsFullscreen': OX,
        'getContainer': Oq,
        'setContainer': Oq,
        'getName': () => Ol,
        'getQualityLevels': Oq,
        'getCurrentQuality': Oq,
        'setCurrentQuality': Oq,
        'getAudioTracks': Oq,
        'getCurrentAudioTrack': Oq,
        'setCurrentAudioTrack': Oq,
        'getSeekRange'() {
          ;
          return {
            'start': 0,
            'end': this.getDuration()
          };
        },
        'setPlaybackRate': Oq,
        'getPlaybackRate': () => 1,
        'getBandwidthEstimate': () => null,
        'getLiveLatency': () => null,
        'attachMedia': Oq,
        'detachMedia': Oq,
        'init': Oq,
        'setState'(OU) {
          ;
          this.state = OU;
          this.trigger(OR.uc, { 'newstate': OU });
        },
        'sendMediaType'(OU) {
          ;
          var {
            type: OU,
            mimeType: Od
          } = OU[0], OU = 'aac' === OU || 'mp3' === OU || 'mpeg' === OU || Od && 0 === Od.indexOf('audio/');
          ;
          ;
          this.trigger(OR.oZ, { 'mediaType': OU ? 'audio' : 'video' });
        },
        'getDuration': () => 0,
        'trigger': Oq
      };
    },
    1628: (OA, Oj, OI) => {
      'use strict';
      ;
      ;
      OI.d(Oj, { 'V': () => Oi });
      var OR = OI(8348);
      const Oi = Oq => 'hls' === Oq.type && OR.OS.android ? false !== Oq.androidhls && !OR.Browser.firefox && 4.4 <= parseFloat(OR.OS.version.version || '0') : null;
    },
    12: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, { 'U': () => OR });
      const OR = {};
    },
    670: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'Z': () => function (Ol) {
          ;
          ;
          var Oz = Ol.getName().name;
          ;
          if (!OR.U[Oz]) {
            if (!(0, OX.sE)(Oi.B, (0, OX.wB)({ 'name': Oz }))) {
              if (!(0, OX.mf)(Ol.supports)) {
                throw new Error('Tried to register a provider with an invalid object');
              }
              Oi.B.unshift({
                'name': Oz,
                'supports': Ol.supports
              });
            }
            (0, OX.ce)(Ol.prototype, Oq.Z);
            OR.U[Oz] = Ol;
          }
        }
      });
      var OR = OI(12), Oi = OI(2963), Oq = OI(6528), OX = OI(6042);
      OI(328);
    },
    6593: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, {
        'B': () => Oz,
        'H': () => Ol
      });
      var OR = OI(1628), Oi = OI(7034), Oq = OI(9025);
      ;
      ;
      const OX = {
        'aac': 'audio/mp4',
        'mp4': 'video/mp4',
        'f4v': 'video/mp4',
        'm4v': 'video/mp4',
        'mov': 'video/mp4',
        'mp3': 'audio/mpeg',
        'mpeg': 'audio/mpeg',
        'ogv': 'video/ogg',
        'ogg': 'video/ogg',
        'oga': 'video/ogg',
        'vorbis': 'video/ogg',
        'webm': 'video/webm',
        'f4a': 'video/aac',
        'm3u8': 'application/vnd.apple.mpegurl',
        'm3u': 'application/vnd.apple.mpegurl',
        'hls': 'application/vnd.apple.mpegurl'
      }, Ol = OU => {
        if (!Oq.Z || !Oq.Z.canPlayType) {
          return false;
        }
        ;
        ;
        if (false === (0, OR.V)(OU)) {
          return false;
        }
        var Od = OU.file, Og = OU.type;
        ;
        if ((0, Oi.isRtmp)(Od, Og)) {
          return false;
        }
        let OE = OU.mimeType || OX[Og];
        return !!OE && (null != (Od = OU.mediaTypes) && Od.length && (OE = [OE].concat(Od.slice()).join('; ')), Boolean(Oq.Z.canPlayType(OE)));
      }, Oz = [{
        'name': 'html5',
        'supports': Ol
      }];
    },
    1384: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'CX': () => OU,
        'IP': () => Og,
        'If': () => Oz,
        'Nm': () => Od
      });
      var OR = OI(1643);
      let Oi, Oq, OX = false;
      function Ol(OE, Ov, Oe) {
        ;
        ;
        OX = Oe;
        OE.trigger(OR.h7, {
          'target': Ov.target,
          'jwstate': Oe
        });
      }
      const Oz = () => OX, OU = function (OE, Ov) {
        ;
        ;
        ;
        if (Ov = Boolean(Ov)) {
          try {
            const Ob = OE.video.webkitEnterFullscreen || OE.video.webkitEnterFullScreen;
            Ob && Ob.apply(OE.video);
          } catch (OF) {
            return false;
          }
          return OE.getFullscreen();
        }
        var Oe = OE.video.webkitExitFullscreen || OE.video.webkitExitFullScreen;
        return Oe && Oe.apply(OE.video), Ov;
      }, Od = function (OE, Ov) {
        ;
        ;
        ;
        Oi = Oe => Ol(OE, Oe, true);
        Oq = Oe => Ol(OE, Oe, false);
        Ov.addEventListener('webkitbeginfullscreen', Oi);
        Ov.addEventListener('webkitendfullscreen', Oq);
      }, Og = OE => {
        ;
        ;
        OE.removeEventListener('webkitbeginfullscreen', Oi);
        OE.removeEventListener('webkitendfullscreen', Oq);
      };
    },
    6875: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, { 'Z': () => OR });
      ;
      const OR = 'hidden' in document ? function () {
        ;
        return !document.hidden;
      } : 'webkitHidden' in document ? function () {
        ;
        return !document.webkitHidden;
      } : function () {
        return true;
      };
    },
    6886: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'E': () => Ol,
        'h': () => OE
      });
      var OR = OI(9888), Oi = OI(7034), Oq = OI(4446);
      function OX() {
      }
      const Ol = Ov => {
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        'abort' in Ov && Ov.abort();
      }, Oz = (Ov, Oe, Ob, OF) => {
        ;
        ;
        Ov.onerror(Oe, Ov.url, Ov.xhr, new Oq.rG(Oe, Ob, OF));
      }, OU = (Ov, Oe, Ob) => {
        var OF = Oe.documentElement;
        ;
        ;
        if (!Ob.requireValidXML || 'parsererror' !== OF.nodeName && !OF.getElementsByTagName('parsererror').length) {
          return Ov.responseXML || (Ov = Object.assign({}, Ov, { 'responseXML': Oe })), Ob.oncomplete(Ov);
        }
        ;
        Oz(Ob, Oq.ul, 601);
      }, Od = Ov => function (Oe) {
        ;
        Oe = Oe.currentTarget || Ov.xhr;
        ;
        ;
        if (clearTimeout(Ov.timeoutId), Ov.responseType) {
          if ('json' === Ov.responseType) {
            var Ob = Oe, OF = Ov;
            if (!Ob.response || 'string' == typeof Ob.response && '"' !== Ob.responseText.substr(1)) {
              try {
                Ob = Object.assign({}, Ob, { 'response': JSON.parse(Ob.responseText) });
              } catch (OP) {
                return void Oz(OF, Oq.ul, 611, OP);
              }
            }
            return OF.oncomplete(Ob);
            return;
          }
        } else {
          let Oc, OY = Oe.responseXML;
          if (OY) {
            try {
              Oc = OY.firstChild;
            } catch (OM) {
            }
          }
          if (OY && Oc) {
            return OU(Oe, OY, Ov);
          }
          if (Ov.useDomParser && Oe.responseText && !OY && null != (OY = (0, OR.parseXML)(Oe.responseText)) && OY.firstChild) {
            return OU(Oe, OY, Ov);
          }
          if (Ov.requireValidXML) {
            return void Oz(Ov, Oq.ul, 602);
          }
        }
        Ov.oncomplete(Oe);
      };
      let Og;
      const OE = (Ov, Oe, Ob, OF) => {
        ;
        var OP;
        let Oc;
        Ov === Object(Ov) && (Ov = (OF = Ov).url);
        ;
        ;
        const OY = Object.assign({
          'xhr': null,
          'url': Ov,
          'withCredentials': false,
          'retryWithoutCredentials': false,
          'timeout': 60000,
          'timeoutId': -1,
          'oncomplete': Oe || OX,
          'onerror': Ob || OX,
          'mimeType': OF && !OF.responseType ? 'text/xml' : '',
          'requireValidXML': false,
          'responseType': null != OF && OF.plainText ? 'text' : '',
          'useDomParser': false,
          'requestFilter': null
        }, OF), OM = Og('Error loading file', OY);
        if ('XMLHttpRequest' in window) {
          if (Oc = OY.xhr = OY.xhr || new window.XMLHttpRequest(), 'function' == typeof OY.requestFilter) {
            let OG;
            try {
              OG = OY.requestFilter({
                'url': Ov,
                'xhr': Oc
              });
            } catch (Oo) {
              return OM(Oo, 5), Oc;
            }
            OG && 'open' in OG && 'send' in OG && (Oc = OY.xhr = OG);
          }
          Oc.onreadystatechange = (OP = OY, function (OD) {
            ;
            ;
            var Of = OD.currentTarget || OP.xhr;
            if (4 === Of.readyState) {
              clearTimeout(OP.timeoutId);
              Of = Of.status;
              if (!(400 <= Of)) {
                return 200 === Of ? Od(OP)(OD) : void (0 === Of && (0, Oi.isFileProtocol)() && !/^[a-z][a-z0-9+.-]*:/.test(OP.url) && Oz(OP, Oq.ul, 7));
              }
              Oz(OP, Oq.ul, Of < 600 ? Of : 6);
            }
          });
          Oc.onerror = OM;
          'overrideMimeType' in Oc ? OY.mimeType && Oc.overrideMimeType(OY.mimeType) : OY.useDomParser = true;
          try {
            Ov = Ov.replace(/#.*$/, '');
            Oc.open('GET', Ov, true);
          } catch (OD) {
            return OM(OD, 3), Oc;
          }
          if (OY.responseType) {
            try {
              Oc.responseType = OY.responseType;
            } catch (Of) {
            }
          }
          OY.timeout && (OY.timeoutId = setTimeout(function () {
            Ol(Oc);
            Oz(OY, Oq.ud, 1);
          }, OY.timeout), Oc.onabort = function () {
            clearTimeout(OY.timeoutId);
          });
          try {
            OY.withCredentials && 'withCredentials' in Oc && (Oc.withCredentials = true);
            Oc.send();
          } catch (ON) {
            OM(ON, 4);
          }
          return Oc;
        }
        Oz(OY, Oq.ud, 2);
      };
      Og = (Ov, Oe) => function (Ob, OF) {
        var OP = Ob.currentTarget || Oe.xhr;
        ;
        ;
        ;
        if (clearTimeout(Oe.timeoutId), Oe.retryWithoutCredentials && Oe.xhr.withCredentials) {
          Ol(OP);
          const Oc = Object.assign({}, Oe, {
            'xhr': null,
            'withCredentials': false,
            'retryWithoutCredentials': false
          });
          OE(Oc);
        } else {
          !OF && 400 <= OP.status && OP.status < 600 && (OF = OP.status);
          Oz(Oe, OF ? Oq.ul : Oq.ud, OF || 6, Ob);
        }
      };
    },
    328: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'IH': () => OU,
        'S1': () => Od,
        'X$': () => Og,
        'ZP': () => Ol,
        'on': () => Oz,
        'wj': () => OE
      });
      ;
      var OR = function (Ov, Oe) {
        ;
        ;
        if (null == Ov) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
        ;
        return Object.prototype.hasOwnProperty.call(Object(Ov), Oe);
      };
      const Oi = (Ov, Oe, Ob, OF) => {
        let OP = -1;
        ;
        ;
        const Oc = Ov.length;
        for (; ++OP < Oc;) {
          const OY = Ov[OP];
          if (OF) {
            try {
              OY.callback.apply(OY.context || Ob, Oe);
            } catch (OM) {
              console.log('Error in "' + OF + '" event handler:', OM);
            }
          } else {
            OY.callback.apply(OY.context || Ob, Oe);
          }
        }
      }, OX = (Ov, Oe, Ob, OF) => {
        ;
        ;
        ;
        if (Ob) {
          if ('object' == typeof Ob) {
            for (const OP in Ob)
              OR(Ob, OP) && Ov[Oe].apply(Ov, [
                OP,
                Ob[OP]
              ].concat(OF));
            return false;
          }
          if (/\s+/.test(Ob)) {
            const Oc = Ob.split(/\s+/);
            for (let OY = 0, OM = Oc.length; OY < OM; OY++) {
              Ov[Oe].apply(Ov, [Oc[OY]].concat(OF));
            }
            return false;
          }
        }
        return true;
      };
      ;
      class Ol {
        ['on'](Ov, Oe, Ob) {
          ;
          var OF;
          ;
          return OX(this, 'on', Ov, [
            Oe,
            Ob
          ]) && Oe && ((OF = this['_events'] || (this['_events'] = {}))[Ov] || (OF[Ov] = [])).push({
            'callback': Oe,
            'context': Ob
          }), this;
        }
        ['once'](Ov, Oe, Ob) {
          if (!OX(this, 'once', Ov, [
            Oe,
            Ob
          ]) || !Oe) {
            return this;
          }
          let OF = 0;
          function OP() {
            ;
            OF++ || (Oc.off(Ov, OP), Oe.apply(this, arguments));
          }
          ;
          ;
          const Oc = this;
          return OP['_callback'] = Oe, this.on(Ov, OP, Ob);
        }
        ['off'](Ov, Oe, Ob) {
          ;
          if (this['_events'] && OX(this, 'off', Ov, [
            Oe,
            Ob
          ])) {
            if (Ov || Oe || Ob) {
              const Oc = Ov ? [Ov] : Object.keys(this['_events']);
              for (let OY = 0, OM = Oc.length; OY < OM; OY++) {
                Ov = Oc[OY];
                var OF = this['_events'][Ov];
                if (OF) {
                  const OG = this['_events'][Ov] = [];
                  if (Oe || Ob) {
                    for (let Oo = 0, OD = OF.length; Oo < OD; Oo++) {
                      var OP = OF[Oo];
                      (Oe && Oe !== OP.callback && Oe !== OP.callback['_callback'] || Ob && Ob !== OP.context) && OG.push(OP);
                    }
                  }
                  OG.length || delete this['_events'][Ov];
                }
              }
            } else {
              delete this['_events'];
            }
          }
          ;
          ;
          return this;
        }
        ['trigger'](Ov, ...Oe) {
          ;
          ;
          ;
          var Ob;
          return this['_events'] && OX(this, 'trigger', Ov, Oe) && (Ov = this['_events'][Ov], Ob = this['_events'].all, Ov && Oi(Ov, Oe, this), Ob) && Oi(Ob, arguments, this), this;
        }
        ['triggerSafe'](Ov, ...Oe) {
          var Ob, OF;
          ;
          ;
          return this['_events'] && OX(this, 'trigger', Ov, Oe) && (Ob = this['_events'][Ov], OF = this['_events'].all, Ob && Oi(Ob, Oe, this, Ov), OF) && Oi(OF, arguments, this, Ov), this;
        }
      }
      ;
      const Oz = Ol.prototype.on, OU = Ol.prototype.once, Od = Ol.prototype.off, Og = Ol.prototype.trigger, OE = Ol.prototype.triggerSafe;
      Ol.on = Oz;
      Ol.once = OU;
      Ol.off = Od;
      Ol.trigger = Og;
    },
    2268: (OA, Oj, OI) => {
      'use strict';
      ;
      ;
      OI.d(Oj, {
        'A': () => Og,
        'DF': () => OU,
        'Dt': () => Oc,
        'G6': () => OF,
        'NO': () => Oo,
        'O7': () => OY,
        'Q6': () => Ov,
        'cL': () => OG,
        'dI': () => OD,
        'gn': () => OP,
        'i7': () => Oe,
        'id': () => Oz,
        'pZ': () => Oq,
        'tq': () => OM,
        'un': () => Od,
        'w1': () => Ob,
        'xb': () => OX,
        'yS': () => OE,
        'zc': () => Ol
      });
      const OR = Of => null !== navigator.userAgent.match(Of), Oi = () => 'MacIntel' === navigator.platform && 1 < navigator.maxTouchPoints, Oq = () => OR(/firefox\//i), OX = () => OR(/iP(hone|od)/i), Ol = () => OR(/iPad/i) || Oi(), Oz = () => OR(/Macintosh/i) && !Oi(), OU = () => OR(/FBAV/i), Od = () => OR(/\sEdge?\/\d+/i), Og = () => OR(/msie/i), OE = () => OR(/SMART-TV/), Ov = () => OE() && !OR(/SamsungBrowser/), Oe = () => OR(/\s(?:(?:Headless)?Chrome|CriOS)\//i) && !Od() && !OR(/UCBrowser/i), Ob = () => !OR(/\sEdg\/\d+/i) && (Od() || OR(/trident\/.+rv:\s*11/i) || Og()), OF = () => OR(/safari/i) && !OR(/(?:Chrome|CriOS|chromium|android|phantom)/i) && !OE(), OP = () => OR(/iP(hone|ad|od)/i) || Oi(), Oc = function () {
        ;
        return 'boolean' == typeof Oc.mock_ ? Oc.mock_ : OR(/Android/i) && !OR(/Windows Phone/i);
      }, OY = () => !(OR(/chrome\/[123456789]/i) && !OR(/chrome\/18/i) && !Oq()) && Oc(), OM = (Oc.mock_ = null, () => OP() || Oc() || OR(/Windows Phone/i)), OG = function () {
        ;
        if ('boolean' == typeof OG.mock_) {
          return OG.mock_;
        }
        ;
        ;
        try {
          return window.self !== window.top;
        } catch (Of) {
          return true;
        }
      }, Oo = (OG.mock_ = null, () => false), OD = () => 0;
    },
    8381: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        '$W': () => OX,
        'Mf': () => Oz,
        'T2': () => OU,
        '_b': () => Ol
      });
      var OR = OI(8518), Oi = OI(2557), Oq = OI(4446);
      const OX = function (Od, Og) {
        ;
        const OE = [];
        if (Od && Od.timestamps && Od.timestamps.length) {
          const Ov = Od.timestamps.sort((Oe, Ob) => Oe.begin - Ob.begin);
          Ov.forEach((Oe, Ob) => {
            var OF = ((OY, OM = 'en') => {
              ;
              let OG = (0, OR.G3)();
              for (var Oo = Object.keys(OY.title), OD = Oo[0]; !OY.title[OG];) {
                const Of = Oo.find((Om => OW => 0 === OW.indexOf(Om))(OG));
                if (Of) {
                  OG = Of;
                  break;
                }
                const ON = OG.lastIndexOf('-');
                if (ON <= 0) {
                  OG = null;
                  break;
                }
                OG = OG.slice(0, ON);
              }
              ;
              ;
              return OG || (0 <= Oo.indexOf(OM) ? OM : OD);
            })(Oe, Od.defaultLanguage), OF = Oe.title[OF], OP = Oe.time, Oe = Oe.image;
            ;
            let Oc = Og;
            ;
            OP = {
              'begin': OP,
              'end': Oc = Ob + 1 < Ov.length ? Ov[Ob + 1].time : Oc,
              'text': OF,
              'cueType': 'chapters'
            };
            ;
            Oe && (OP.image = Oe);
            OE.push(OP);
          });
        }
        ;
        return OE;
      }, Ol = function (Od, Og) {
        ;
        const OE = (0, OR.G3)(), Ov = Od.reduce(function (Oe, Ob) {
          ;
          ;
          ;
          var OF;
          return Ob && Ob.cueType && 'chapters' !== Ob.cueType || ((OF = new Oi.u({
            'time': Ob.begin,
            'image': Ob.image
          })).addTitle(OE, Ob.text), Oe.push(OF)), Oe;
        }, []);
        ;
        return Og ? (Og.timestamps = Ov, Og) : new Oi.t(OE, Ov);
      }, Oz = function (Od, Og) {
        ;
        ;
        if ('number' != typeof Od || Od < 0 || !Og || !Og.length) {
          return null;
        }
        ;
        let OE = null;
        for (let Oe = 0; Oe < Og.length; Oe++) {
          var Ov = Og[Oe];
          Ov.time > Od || (!OE || Ov.time > OE.time) && (OE = Ov);
        }
        return OE;
      }, OU = function (Od, Og) {
        ;
        let OE = true;
        return Od.forEach(Ov => {
          ;
          ;
          ;
          !Ov || Ov.defaultLanguage && Ov.timestamps && !Ov.timestamps.some(Oe => !Oe.title || null === Oe.time || void 0 === Oe.time) || (OE = false);
        }), Og(OE ? null : (0, Oq.l9)(new Error(), Oq.aD));
      };
    },
    974: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'HY': () => Og,
        'iv': () => Oz,
        'oB': () => Ol,
        'oI': () => OX,
        'vs': () => OU
      });
      function OR(OE, Ov) {
        if (null == OE) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
        ;
        ;
        ;
        return Object.prototype.hasOwnProperty.call(Object(OE), Ov);
      }
      var Oi = OI(2957), Oj = OI(9563), Oq = OI.n(Oj);
      ;
      const OX = Oq().clear, Ol = (OE, Ov) => {
        ;
        ;
        ;
        if (null != OE) {
          let OY;
          void 0 === OE.length && (OE = [OE]);
          var Oe, Ob, OF = {
            height: 1,
            width: 1
          };
          for (OY in Ov)
            OR(Ov, OY) && (OF[OY] = (Oe = OY, Ob = Ov[OY], '' === Ob || null == Ob ? '' : 'string' == typeof Ob && isNaN(Ob) ? /png|gif|jpe?g/i.test(Ob) && Ob.indexOf('url') < 0 ? 'url(' + Ob + ')' : Ob : 0 === Ob || 'z-index' === Oe || 'opacity' === Oe ? '' + Ob : /color/i.test(Oe) ? '#' + (0, Oi.vk)(Ob.toString(16).replace(/^0x/i, ''), 6) : Math.ceil(Ob) + 'px'));
          for (let OM = 0; OM < OE.length; OM++) {
            var OP, Oc = OE[OM];
            if (null != Oc) {
              for (OY in OF)
                OR(OF, OY) && (OP = (OG => {
                  ;
                  ;
                  OG = OG.split('-');
                  for (let Oo = 1; Oo < OG.length; Oo++) {
                    ;
                  }
                  return OG.join('');
                })(OY), Oc.style[OP] !== OF[OY]) && (Oc.style[OP] = OF[OY]);
            }
          }
        }
      }, Oz = (OE, Ov, Oe, Ob) => {
        ;
        Oe = Oe || 'all-players';
        ;
        let OF = '';
        ;
        if ('object' == typeof Ov) {
          const OP = document.createElement('div');
          Ol(OP, Ov);
          let Oc = OP.style.cssText;
          OR(Ov, 'content') && (Oc = Oc && Oc + ' content: "' + Ov.content + '";');
          Ob && (Oc = Oc && Oc.replace(/;/g, ' !important;'));
          OF = '{' + Oc + '}';
        } else {
          'string' == typeof Ov && (OF = Ov);
        }
        '' !== OF && '{}' !== OF ? Oq().style([[
          OE,
          OE + OF
        ]], Oe) : Oq().clear(Oe, OE);
      }, OU = (OE, Ov) => {
        Ol(OE, { 'transform': Ov });
      };
      let Od;
      const Og = (OE, Ov) => {
        ;
        let Oe = 'rgb';
        ;
        ;
        var Ob = void 0 !== Ov && 100 !== Ov;
        if (Ob && (Oe += 'a'), !Od) {
          const OF = document.createElement('canvas');
          ;
          ;
          Od = OF.getContext('2d');
        }
        return OE ? isNaN(parseInt(OE, 16)) || (OE = '#' + OE) : OE = '#000000', Od.clearRect(0, 0, 1, 1), Od.fillStyle = OE, Od.fillRect(0, 0, 1, 1), OE = Od.getImageData(0, 0, 1, 1).data, (Oe += '(' + OE[0] + ', ' + OE[1] + ', ' + OE[2], Ob && (Oe += ', ' + Ov / 100), Oe + ')');
      };
    },
    5004: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, { 'z': () => OR });
      const OR = Date.now || function () {
        ;
        return new Date().getTime();
      };
    },
    2799: (OA, Oj, OI) => {
      'use strict';
      ;
      ;
      OI.d(Oj, {
        'A8': () => OB,
        'AH': () => OV,
        'EU': () => Ob,
        'FK': () => OP,
        'IV': () => Oo,
        'L_': () => OD,
        'P$': () => ON,
        'SH': () => Oy,
        'UM': () => OZ,
        'Ww': () => OT,
        'az': () => Oe,
        'bJ': () => Ov,
        'cS': () => OW,
        'cn': () => OG,
        'gB': () => OE,
        'i3': () => OH,
        'kq': () => Om,
        'nG': () => Oh,
        'nh': () => OF,
        'oH': () => Od,
        'og': () => Of,
        'pv': () => OU,
        's1': () => OM
      });
      var OR = OI(2957), Oi = OI(6042), Oq = OI(8348);
      const OX = window.DOMParser;
      ;
      let Ol, Oz = true;
      const OU = (Os, Op) => Os.classList.contains(Op), Od = Os => {
        ;
        ;
        ;
        var Op = Os.querySelectorAll('script,object,iframe,meta');
        for (let OJ = Op.length; OJ--;) {
          var OQ = Op[OJ];
          OQ.parentNode.removeChild(OQ);
        }
        return Os;
      }, OE = Os => {
        ;
        ;
        var Op = Os.attributes;
        ;
        for (let OK = Op.length; OK--;) {
          var OQ, OJ = Op[OK].name;
          /^on/.test(OJ) && Os.removeAttribute(OJ);
          /href/.test(OJ) && (OQ = Op[OK].value, !/javascript:|javascript&colon;/.test(OQ) && /^((((https?):\/\/)|(mailto:))(%[0-9A-Fa-f]{2}|[-()_.!~*';/?:@&=+$,A-Za-z0-9])+)([).!';/?:,][[:blank:|:blank:]])?$/.test(OQ) || (Os.removeAttribute(OJ), console.warn('Invalid or unsafe URL')));
        }
        return Os;
      }, Ov = Os => {
        ;
        Os = Os;
        Ol || (Ol = new OX(), Oz = (() => {
          try {
            if (Ol.parseFromString('', 'text/html')) {
              return true;
            }
          } catch (OK) {
          }
          ;
          ;
          return false;
        })());
        const Op = (Oz ? Ol.parseFromString(Os, 'text/html') : (OQ = document.implementation.createHTMLDocument(''), -1 < Os.toLowerCase().indexOf('<!doctype') ? OQ.documentElement.innerHTML = Os : OQ.body.innerHTML = Os, OQ)).body;
        Od(Op);
        var OQ, OJ = Op.querySelectorAll('*');
        ;
        ;
        for (let OK = OJ.length; OK--;) {
          const Ot = OJ[OK];
          OE(Ot);
        }
        return Op;
      }, Oe = Os => Ov(Os).firstChild, Ob = Os => {
        ;
        ;
        for (; Os.firstChild;) {
          Os.removeChild(Os.firstChild);
        }
      }, OF = (Os, Op) => {
        ;
        Ob(Os);
        ;
        if (Op) {
          var OQ = document.createDocumentFragment(), OJ = Ov(Op).childNodes;
          for (let OK = 0; OK < OJ.length; OK++) {
            OQ.appendChild(OJ[OK].cloneNode(true));
          }
          Os.appendChild(OQ);
        }
      }, OP = Os => Os + (0 < Os.toString().indexOf('%') ? '' : 'px'), Oc = Os => (0, Oi.HD)(Os.className) ? Os.className.split(' ') : [], OY = (Os, Op) => {
        ;
        Op = (0, OR.fy)(Op);
        Os.className !== Op && (Os.className = Op);
      }, OM = Os => Os.classList || Oc(Os), OG = (Os, Op) => {
        ;
        const OQ = Oc(Os);
        ;
        (Array.isArray(Op) ? Op : Op.split(' ')).forEach(function (OJ) {
          (0, Oi.r3)(OQ, OJ) || OQ.push(OJ);
        });
        OY(Os, OQ.join(' '));
      }, Oo = (Os, Op) => {
        ;
        var OQ = Oc(Os), Op = Array.isArray(Op) ? Op : Op.split(' ');
        ;
        OY(Os, (0, Oi.e5)(OQ, Op).join(' '));
      }, OD = (Os, Op, OQ) => {
        let OJ = Os.className || '';
        ;
        ;
        Op.test(OJ) ? OJ = OJ.replace(Op, OQ) : OQ && (OJ += ' ' + OQ);
        OY(Os, OJ);
      }, Of = (Os, Op, OQ) => {
        var OJ = OU(Os, Op);
        (OQ = (0, Oi.jn)(OQ) ? OQ : !OJ) !== OJ && (OQ ? OG : Oo)(Os, Op);
      }, ON = (Os, Op, OQ) => {
        Os.setAttribute(Op, OQ);
      }, Om = Os => {
        var Op = document.createElement('link');
        ;
        ;
        Op.rel = 'stylesheet';
        Op.href = Os;
        document.getElementsByTagName('head')[0].appendChild(Op);
      }, OW = Os => {
        Os && Ob(Os);
      }, OB = Os => {
        ;
        ;
        var Op, OQ;
        ;
        return Os && document.body.contains(Os) && (Os = Os.getBoundingClientRect(), Op = window.pageYOffset, OQ = window.pageXOffset, Os.width || Os.height || Os.left || Os.top) && (OJ.left = Os.left + OQ, OJ.right = Os.right + OQ, 0 = Os.top + Op, OJ.bottom = Os.bottom + Op, OJ.width = Os.right - Os.left, OJ.height = Os.bottom - Os.top), OJ;
      }, Oy = (Os, Op) => {
        ;
        Os.insertBefore(Op, Os.firstChild);
      }, OV = Os => Os.nextElementSibling, OH = Os => Os.previousElementSibling, Oh = (Os, Op, OQ = {}, OJ = document) => {
        ;
        ;
        if (/^((((https?):\/\/)|(mailto:))(%[0-9A-Fa-f]{2}|[-()_.!~*';/?:@&=+$,A-Za-z0-9])+)([).!';/?:,][[:blank:|:blank:]])?$/.test(Os)) {
          let OK = OJ.createElement('a');
          OK.href = Os;
          OK.target = Op;
          OK = OE(Object.assign(OK, OQ));
          Oq.Browser.firefox ? OK.dispatchEvent(new MouseEvent('click', {
            'bubbles': true,
            'cancelable': true,
            'view': window
          })) : OK.click();
        }
      }, OZ = () => {
        ;
        ;
        var Os = window.screen.orientation;
        ;
        return !!Os && ('landscape-primary' === Os.type || 'landscape-secondary' === Os.type) || 90 === window.orientation || -90 === window.orientation;
      }, OT = Os => {
        return Os = Os, (Op = document.createElement('textarea')).innerHTML = Os, Op.value.replace(/&|<|>|"|''/gm, function (OQ) {
          return '&#' + OQ.charCodeAt(0) + ';';
        }).replace(/&#60;(\/?)(b|strong|i|em|p|br|ul|ol|li|h.)&#62;/gim, '<$1$2>');
        ;
        ;
        ;
        var Op;
      };
    },
    4429: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, { 'Z': () => OF });
      var Oj = OI(1569), OR = OI(7034), Oi = OI(9888), Oq = OI(2957), OX = OI(7411), Ol = OI(4742);
      function Oz(OP, Oc) {
        ;
        ;
        ;
        this.name = OP;
        this.message = Oc.message || Oc.toString();
        this.error = Oc;
      }
      var OU = OI(6042), Od = OI(2268), Og = OI(2799), OE = OI(974), Ov = OI(6886), Oe = OI(1261), Ob = OI(5499), OI = OI(6234);
      const OF = Object.assign({}, Oi, OR, Oj, {
        'addClass': Og.cn,
        'hasClass': Og.pv,
        'removeClass': Og.IV,
        'replaceClass': Og.L_,
        'toggleClass': Og.og,
        'classList': Og.s1,
        'styleDimension': Og.FK,
        'createElement': Og.az,
        'emptyElement': Og.EU,
        'addStyleSheet': Og.kq,
        'bounds': Og.A8,
        'openLink': Og.nG,
        'replaceInnerHtml': Og.nh,
        'css': OE.iv,
        'clearCss': OE.oI,
        'style': OE.oB,
        'transform': OE.vs,
        'getRgba': OE.HY,
        'ajax': Ov.h,
        'crossdomain': OP => {
          ;
          var Oc = window.URL;
          ;
          try {
            var OY = new Oc(OP, location.origin);
            return location.protocol + '//' + location.host != OY.protocol + '//' + OY.host;
          } catch (OM) {
          }
          return true;
        },
        'tryCatch': function (OP, Oc, OY = []) {
          ;
          if (Ol.Z.debug) {
            return OP.apply(Oc || this, OY);
          }
          ;
          ;
          try {
            return OP.apply(Oc || this, OY);
          } catch (OM) {
            return new Oz(OP.name, OM);
          }
        },
        'Error': Oz,
        'Timer': OX.Z,
        'log': Ob.c,
        'genId': OI.B,
        'between': Oe.v,
        'foreach': function (OP, Oc) {
          for (const OY in OP)
            !function (OM, OG) {
              ;
              if (null == OM) {
                throw new TypeError('Cannot convert undefined or null to object');
              }
              ;
              return Object.prototype.hasOwnProperty.call(Object(OM), OG);
            }(OP, OY) || Oc(OY, OP[OY]);
        },
        'flashVersion': Od.dI,
        'isIframe': Od.cL,
        'indexOf': OU.cq,
        'trim': Oq.fy,
        'pad': Oq.vk,
        'extension': Oq.AO,
        'hms': Oq.WZ,
        'seconds': Oq.m9,
        'prefix': Oq.O4,
        'suffix': Oq.uA,
        'noop': () => {
        }
      });
    },
    7543: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, { 'C': () => OR });
      ;
      const OR = Oi => !!(Oi = Oi || window.event) && Boolean(Oi) && /^(?:mouse|pointer|touch|gesture|click|key)/.test(Oi.type);
    },
    8518: (OA, Oj, OI) => {
      'use strict';
      ;
      ;
      OI.d(Oj, {
        'Cq': () => Oe,
        'Dq': () => OD,
        'G3': () => OF,
        'Mh': () => ON,
        'Pm': () => OG,
        'dl': () => Oo,
        'id': () => Ov,
        'q2': () => OY,
        't6': () => Oc,
        'tK': () => OE
      });
      ;
      var Oj = OI(6042), OR = OI(2268), Oi = OI(6886), Oq = OI(7034), OX = OI(696);
      const Ol = {
        OW: null,
        OW: OB = new Promise((OV, OH) => {
          ;
          (0, Oi.h)({
            'url': Oy,
            'oncomplete': OV,
            'onerror': (Oh, OZ, OT, Os) => {
              ;
              OH(Os);
            },
            'responseType': 'json'
          });
        })
      }, Oz = {
        'aa': 'Afar',
        'ab': 'Abkhazian',
        'ae': 'Avestan',
        'af': 'Afrikaans',
        'ak': 'Akan',
        'am': 'Amharic',
        'ar': 'Arabic',
        'an': 'Aragonese',
        'as': 'Assamese',
        'av': 'Avaric',
        'ay': 'Aymara',
        'az': 'Azerbaijani',
        'ba': 'Bashkir',
        'be': 'Belarusian',
        'bg': 'Bulgarian',
        'bh': 'Bihari languages',
        'bi': 'Bislama',
        'bm': 'Bambara',
        'bn': 'Bengali',
        'bo': 'Tibetan',
        'br': 'Breton',
        'bs': 'Bosnian',
        'ca': 'Catalan',
        'ce': 'Chechen',
        'ch': 'Chamorro',
        'co': 'Corsican',
        'cr': 'Cree',
        'cs': 'Czech',
        'cu': 'Church Slavic',
        'cv': 'Chuvash',
        'cy': 'Welsh',
        'da': 'Danish',
        'de': 'German',
        'dv': 'Divehi',
        'dz': 'Dzongkha',
        'ee': 'Ewe',
        'el': 'Greek',
        'en': 'English',
        'eo': 'Esperanto',
        'es': 'Spanish',
        'et': 'Estonian',
        'eu': 'Basque',
        'fa': 'Persian',
        'ff': 'Fulah',
        'fi': 'Finnish',
        'fj': 'Fijian',
        'fo': 'Faroese',
        'fr': 'French',
        'fy': 'Western Frisian',
        'ga': 'Irish',
        'gd': 'Gaelic',
        'gl': 'Galician',
        'gn': 'Guarani',
        'gu': 'Gujarati',
        'gv': 'Manx',
        'ha': 'Hausa',
        'he': 'Hebrew',
        'hi': 'Hindi',
        'ho': 'Hiri Motu',
        'hr': 'Croatian',
        'ht': 'Haitian',
        'hu': 'Hungarian',
        'hy': 'Armenian',
        'hz': 'Herero',
        'ia': 'Interlingua',
        'id': 'Indonesian',
        'ie': 'Interlingue',
        'ig': 'Igbo',
        'ii': 'Sichuan Yi',
        'ik': 'Inupiaq',
        'io': 'Ido',
        'is': 'Icelandic',
        'it': 'Italian',
        'iu': 'Inuktitut',
        'ja': 'Japanese',
        'jv': 'Javanese',
        'ka': 'Georgian',
        'kg': 'Kongo',
        'ki': 'Kikuyu',
        'kj': 'Kuanyama',
        'kk': 'Kazakh',
        'kl': 'Kalaallisut',
        'km': 'Central Khmer',
        'kn': 'Kannada',
        'ko': 'Korean',
        'kr': 'Kanuri',
        'ks': 'Kashmiri',
        'ku': 'Kurdish',
        'kv': 'Komi',
        'kw': 'Cornish',
        'ky': 'Kirghiz',
        'la': 'Latin',
        'lb': 'Luxembourgish',
        'lg': 'Ganda',
        'li': 'Limburgan',
        'lo': 'Lao',
        'ln': 'Lingala',
        'lt': 'Lithuanian',
        'lu': 'Luba-Katanga',
        'lv': 'Latvian',
        'mg': 'Malagasy',
        'mh': 'Marshallese',
        'mi': 'Maori',
        'mk': 'Macedonian',
        'ml': 'Malayalam',
        'mn': 'Mongolian',
        'mr': 'Marathi',
        'ms': 'Malay',
        'mt': 'Maltese',
        'my': 'Burmese',
        'na': 'Nauru',
        'nb': 'Bokmål',
        'nd': 'Ndebele',
        'ne': 'Nepali',
        'ng': 'Ndonga',
        'nl': 'Dutch',
        'nn': 'Norwegian Nynorsk',
        'no': 'Norwegian',
        'nr': 'Ndebele',
        'nv': 'Navajo',
        'ny': 'Chichewa',
        'oc': 'Occitan',
        'oj': 'Ojibwa',
        'om': 'Oromo',
        'or': 'Oriya',
        'os': 'Ossetian',
        'pa': 'Panjabi',
        'pi': 'Pali',
        'pl': 'Polish',
        'pt': 'Portuguese',
        'ps': 'Pushto',
        'qu': 'Quechua',
        'rm': 'Romansh',
        'rn': 'Rundi',
        'ro': 'Romanian',
        'ru': 'Russian',
        'rw': 'Kinyarwanda',
        'sa': 'Sanskrit',
        'sc': 'Sardinian',
        'sd': 'Sindhi',
        'se': 'Northern Sami',
        'sg': 'Sango',
        'si': 'Sinhala',
        'sk': 'Slovak',
        'sl': 'Slovenian',
        'sm': 'Samoan',
        'sn': 'Shona',
        'so': 'Somali',
        'sq': 'Albanian',
        'sr': 'Serbian',
        'ss': 'Swati',
        'st': 'Sotho',
        'su': 'Sundanese',
        'sw': 'Swahili',
        'sv': 'Swedish',
        'ta': 'Tamil',
        'te': 'Telugu',
        'tg': 'Tajik',
        'th': 'Thai',
        'ti': 'Tigrinya',
        'tk': 'Turkmen',
        'tl': 'Tagalog',
        'tn': 'Tswana',
        'to': 'Tonga',
        'tr': 'Turkish',
        'ts': 'Tsonga',
        'tt': 'Tatar',
        'tw': 'Twi',
        'ty': 'Tahitian',
        'ug': 'Uighur',
        'uk': 'Ukrainian',
        'ur': 'Urdu',
        'uz': 'Uzbek',
        've': 'Venda',
        'vi': 'Vietnamese',
        'vo': 'Volapük',
        'wa': 'Walloon',
        'wo': 'Wolof',
        'xh': 'Xhosa',
        'yi': 'Yiddish',
        'yo': 'Yoruba',
        'za': 'Zhuang',
        'zh': 'Chinese',
        'zu': 'Zulu'
      }, OU = (0, Oj.U_)(Oz), Od = Om => Om.toLowerCase().replace('-', '_'), Og = Om => {
        ;
        ;
        var Om = Od(Om), OW = Om.indexOf('_');
        return -1 === OW ? Om : Om.substring(0, OW);
      }, OE = Om => Om ? Object.keys(Om).reduce((OW, OB) => (OW[Od(OB)] = Om[OB], OW), {}) : {}, Ov = Om => {
        if (Om) {
          return 3 !== Om.length && Oz[Og(Om)] || Om;
        }
      }, Oe = Om => OU[Om] || '', Ob = Om => {
        ;
        Om = Om.querySelector('html');
        ;
        return Om ? Om.getAttribute('lang') : null;
      }, OF = function () {
        if ('string' == typeof OF.mock_) {
          return OF.mock_;
        }
        let Om = Ob(document);
        ;
        ;
        if (!Om && (0, OR.cL)()) {
          try {
            Om = Ob(window.top.document);
          } catch (OW) {
          }
        }
        ;
        return Om || navigator.language || 'en';
      }, OP = (OF.mock_ = null, [
        'ar',
        'da',
        'de',
        'el',
        'es',
        'fi',
        'fr',
        'he',
        'id',
        'it',
        'ja',
        'ko',
        'nb',
        'nl',
        'nn',
        'no',
        'oc',
        'pt',
        'ro',
        'ru',
        'sl',
        'sv',
        'th',
        'tr',
        'vi',
        'zh'
      ]), Oc = Om => 8207 === Om.charCodeAt(0) || /^[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(Om), OY = function (Om) {
        ;
        ;
        ;
        return 'boolean' == typeof OY.mock_ ? OY.mock_ : 0 <= OP.indexOf(Og(Om));
      }, OM = (OY.mock_ = null, (Om, OW, OB) => {
        OW = Om[OB] || OW[OB];
        OW && (Om[OB] = OW);
      }), OG = (Om, OW, OB) => Object.assign({}, (Oy => {
        ;
        ;
        ;
        var {
          advertising: OV,
          related: OH,
          sharing: Oh,
          abouttext: OZ
        } = Oy, OT = Object.assign({}, Oy.localization), OV = (OV && (OT.advertising = OT.advertising || {}, OM(OT.advertising, OV, 'admessage'), OM(OT.advertising, OV, 'cuetext'), OM(OT.advertising, OV, 'loadingAd'), OM(OT.advertising, OV, 'podmessage'), OM(OT.advertising, OV, 'skipmessage'), OM(OT.advertising, OV, 'skiptext')), 'string' == typeof OT.related ? OT.related = { 'heading': OT.related } : OT.related = OT.related || {}, OH && OM(OT.related, OH, 'autoplaymessage'), Oh && (OT.sharing = OT.sharing || {}, OM(OT.sharing, Oh, 'heading'), OM(OT.sharing, Oh, 'copied')), OZ && OM(OT, Oy, 'abouttext'), OT.close || OT.nextUpClose);
        return OV && (OT.close = OV), OT;
      })(Om), OW[Og(OB)], OW[Od(OB)]), Oo = function (Om) {
        ;
        ;
        return 'boolean' == typeof Oo.mock_ ? Oo.mock_ : (0, Oq.isDeepKeyCompliant)(OX.Z, Om, (OW, OB) => 'string' == typeof OB[OW]);
      }, OD = (Oo.mock_ = null, function (Om, OW) {
        if ('function' == typeof OD.mock_) {
          return OD.mock_;
        }
        ;
        ;
        let OB = Ol[OW];
        if (!OB) {
          const Oy = Om + 'translations/' + (Om = Og(OW), /^n[bn]$/.test(Om) ? 'no' : Om) + '.json';
          ;
        }
        return OB;
      }), Of = (OD.mock_ = null, (Om, OW, OB, Oy) => {
        ;
        Om[OW] = Object.assign({}, OB[OW], Oy[OW]);
      }), ON = (Om, OW) => {
        ;
        ;
        ;
        var OB = Object.assign({}, Om, OW);
        return Of(OB, 'errors', Om, OW), Of(OB, 'related', Om, OW), Of(OB, 'sharing', Om, OW), Of(OB, 'advertising', Om, OW), Of(OB, 'shortcuts', Om, OW), Of(OB, 'captionsStyles', Om, OW), OB;
      };
    },
    5499: (OA, Oj, OI) => {
      'use strict';
      ;
      ;
      OI.d(Oj, { 'c': () => OR });
      const OR = 'function' == typeof console.log ? console.log.bind(console) : () => {
      };
    },
    1261: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, { 'v': () => OR });
      const OR = function (Oi, Oq, OX) {
        ;
        ;
        return Math.max(Math.min(Oi, OX), Oq);
      };
    },
    9888: (OA, Oj, OI) => {
      'use strict';
      OI.r(Oj);
      OI.d(Oj, {
        'getAbsolutePath': () => OX,
        'isAbsolutePath': () => Oq,
        'parseDimension': () => OU,
        'parseXML': () => Ol,
        'serialize': () => Oz,
        'timeFormat': () => Od,
        'timeFormatAria': () => Og
      });
      ;
      ;
      var OR = OI(6042), Oi = OI(5950);
      const Oq = OE => /^(?:(?:https?|file):)?\/\//.test(OE), OX = (OE, Ov) => (0, Oi.kd)(OE, Ov), Ol = OE => {
        let Ov = null;
        ;
        ;
        try {
          (Ov = new window.DOMParser().parseFromString(OE, 'text/xml')).querySelector('parsererror') && (Ov = null);
        } catch (Oe) {
        }
        return Ov;
      }, Oz = OE => {
        if (void 0 === OE) {
          return null;
        }
        ;
        if ('string' == typeof OE && OE.length < 6) {
          var Ov = OE.toLowerCase();
          if ('true' === Ov) {
            return true;
          }
          if ('false' === Ov) {
            return false;
          }
          if (!(0, OR.i2)(Number(OE)) && !(0, OR.i2)(parseFloat(OE))) {
            return Number(OE);
          }
        }
        ;
        return OE;
      }, OU = OE => (0, OR.qh)(OE) ? OE : '' === OE ? 0 : -1 < OE.lastIndexOf('%') ? OE : parseInt(OE.replace('px', ''), 10), Od = (OE, Ov) => {
        ;
        return (0, OR.i2)(OE) && (OE = parseInt(OE.toString(), 10)), (0, OR.i2)(OE) || !isFinite(OE) || OE <= 0 && !Ov ? '00:00' : (Ov = OE < 0 ? '-' : '', OE = Math.abs(OE), Ov + ((Ov = Math.floor(OE / 3600)) ? Ov + ':' : '') + ((Ov = Math.floor((OE - 3600 * Ov) / 60)) < 10 ? '0' : '') + Ov + ':' + ((Ov = Math.floor(OE % 60)) < 10 ? '0' : '') + Ov);
      }, Og = OE => {
        ;
        ;
        var Ov;
        ;
        return (0, OR.i2)(OE) && (OE = parseInt(OE.toString(), 10)), (0, OR.i2)(OE) || !isFinite(OE) || OE <= 0 ? '0 seconds' : ((Ov = Math.floor(OE / 3600)) ? Ov + (1 <= Ov ? ' hour' + (1 < Ov ? 's' : '') + ', ' : '') : '') + ((Ov = Math.floor((OE - 3600 * Ov) / 60)) ? Ov + (1 <= Ov ? ' minute' + (1 < Ov ? 's' : '') + ', ' : '') : '') + (Ov = Math.floor(OE % 60)) + (1 <= Ov ? ' second' + (1 < Ov ? 's' : '') : '');
      };
    },
    1569: (OA, Oj, OI) => {
      'use strict';
      OI.r(Oj);
      OI.d(Oj, {
        'getScriptPath': () => Oq,
        'loadFrom': () => Oz,
        'repo': () => OX,
        'versionCheck': () => Ol
      });
      var OR = OI(6601), Oi = OI(7034);
      const Oq = function (OU) {
        var Od = document.getElementsByTagName('script');
        for (let Ov = 0; Ov < Od.length; Ov++) {
          var Og = Od[Ov].src;
          if (Og) {
            var OE = Og.lastIndexOf('/' + OU);
            if (0 <= OE) {
              return Og.substr(0, OE + 1);
            }
          }
        }
        ;
        ;
        ;
        return '';
      }, OX = function () {
        ;
        var OU = '//ssl.p.jwpcdn.com/player/v/8.27.1';
        return ((0, Oi.isFileProtocol)() ? 'https:' : '') + OU;
      }, Ol = function (OU) {
        var OU = ('0' + OU).split(/\W/), Od = OR.i.split(/\W/), Og = parseFloat(OU[0]), OE = parseFloat(Od[0]);
        ;
        return !(OE < Og || Og === OE && parseFloat('0' + OU[1]) > parseFloat(Od[1]));
      }, Oz = function () {
        return OX();
      };
    },
    6234: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'B': () => Oi,
        'F': () => 12
      });
      const Oi = Oq => {
        ;
        let OX = '';
        for (; OX.length < Oq;) {
          OX += (() => {
            ;
            ;
            try {
              var Ol = window.crypto || window.msCrypto;
              if (null != Ol && Ol.getRandomValues) {
                return Ol.getRandomValues(new Uint32Array(1))[0].toString(36);
              }
            } catch (Oz) {
            }
            return Math.random().toString(36).slice(2, 9);
          })();
        }
        return OX.slice(0, Oq);
      };
    },
    1776: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, {
        'U': () => OR,
        'W': () => Oi
      });
      const OR = window.requestAnimationFrame || (Oq => setTimeout(Oq, 17)), Oi = window.cancelAnimationFrame || clearTimeout;
    },
    676: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, { 'ZP': () => OX });
      var Oj = OI(328), OR = OI(1643);
      function Oi(Ol, Oz, OU) {
        const Od = this;
        let Og = 0;
        const OE = Oe => {
          ;
          Og = 2;
          Od.trigger(OR.pn, Oe).off();
        }, Ov = Oe => {
          ;
          Og = 3;
          Od.trigger(OR.xQ, Oe).off();
        };
        ;
        ;
        this.getStatus = function () {
          return Og;
        };
        this.load = function () {
          ;
          let Oe = Oq[Ol];
          return 0 === Og && (Oe && Oe.then(Ov).catch(OE), Og = 1, Oe = new Promise((Ob, OF) => {
            const OP = (Oz ? Oo => {
              ;
              ;
              ;
              var OD = document.createElement('link');
              return OD.type = 'text/css', OD.rel = 'stylesheet', OD.href = Oo, OD;
            } : (Oo, OD) => {
              var Of = document.createElement('script');
              ;
              ;
              return Of.type = 'text/javascript', Of.charset = 'utf-8', Of.async = true, Of.timeout = OD || 45000, Of.src = Oo, Of;
            })(Ol, OU);
            let Oc;
            function OY(Oo) {
              OM();
              OE(Oo);
              OF(Oo);
            }
            const OM = function () {
              ;
              ;
              OP.onerror = OP.onload = null;
              clearTimeout(Oc);
            };
            ;
            Oc = setTimeout(() => {
              ;
              OY(new Error('Network timeout ' + Ol));
            }, 45000);
            OP.onerror = function () {
              ;
              OY(new Error('Failed to load ' + Ol));
            };
            OP.onload = function (Oo) {
              OM();
              Ov(Oo);
              Ob(Oo);
            };
            ;
            var OG = document.getElementsByTagName('head')[0] || document.documentElement;
            OG.insertBefore(OP, OG.firstChild);
          }), Oq[Ol] = Oe), Oe;
        };
      }
      ;
      const Oq = {}, OX = (Object.assign(Oi.prototype, Oj.ZP), Oi);
    },
    2957: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, {
        'AO': () => Oz,
        'Dc': () => Ol,
        'O4': () => OE,
        'U5': () => Og,
        'WZ': () => OU,
        'fy': () => Oq,
        'm9': () => Od,
        'uA': () => Ov,
        'vk': () => OX,
        'zz': () => Oe
      });
      var OR = OI(6042);
      ;
      ;
      const Oi = window.parseFloat, Oq = Ob => Ob.replace(/^\s+|\s+$/g, ''), OX = (Ob, OF, OP) => {
        ;
        for (Ob = '' + Ob, OP = OP || '0'; Ob.length < OF;) {
          Ob = OP + Ob;
        }
        return Ob;
      }, Ol = (Ob, OF) => {
        ;
        var OP = Ob.attributes;
        ;
        for (let Oc = 0; Oc < OP.length; Oc++) {
          if (OP[Oc].name && OP[Oc].name.toLowerCase() === OF.toLowerCase()) {
            return OP[Oc].value.toString();
          }
        }
        return '';
      }, Oz = Ob => {
        var OF;
        ;
        ;
        ;
        return Ob && 'rtmp' !== Ob.substr(0, 4) ? (OF = /[(,]format=(m3u8|mpd)-/i.exec(Ob)) ? OF[1] : (OF = Ob.replace(/^.+?\.(\w+)(?:[;].*)?(?:[?#].*)?$/, '$1')) !== Ob ? OF.toLowerCase() : -1 < (Ob = Ob.split('?')[0].split('#')[0]).lastIndexOf('.') ? Ob.substr(Ob.lastIndexOf('.') + 1, Ob.length).toLowerCase() : '' : '';
      }, OU = Ob => {
        var OF = (Ob / 60 | 0) % 60, OP = Ob % 60;
        return OX((Ob / 3600 | 0).toString(), 2) + ':' + OX(OF.toString(), 2) + ':' + OX(OP.toFixed(3), 6);
      }, Od = (Ob, OF) => {
        if (!Ob) {
          return 0;
        }
        if ((0, OR.qh)(Ob)) {
          return Ob;
        }
        var Ob = Ob.replace(',', '.'), OP = Ob.slice(-1), Oc = Ob.split(':'), OY = Oc.length;
        let OM = 0;
        ;
        if ('s' === OP) {
          OM = Oi(Ob);
        } else {
          if ('m' === OP) {
            OM = 60 * Oi(Ob);
          } else {
            if ('h' === OP) {
              OM = 3600 * Oi(Ob);
            } else {
              if (1 < OY) {
                let OG = OY - 1;
                4 === OY && (OF && (OM = Oi(Oc[OG]) / OF), --OG);
                OM = (OM += Oi(Oc[OG])) + 60 * Oi(Oc[OG - 1]);
                3 <= OY && (OM += 3600 * Oi(Oc[OG - 2]));
              } else {
                OM = Oi(Ob);
              }
            }
          }
        }
        ;
        return (0, OR.qh)(OM) ? OM : 0;
      }, Og = (Ob, OF, OP) => {
        if ((0, OR.HD)(Ob) && '%' === Ob.slice(-1)) {
          const Oc = Oi(Ob);
          return OF && (0, OR.qh)(OF) && (0, OR.qh)(Oc) ? OF * Oc / 100 : null;
        }
        return Od(Ob, OP);
      }, OE = (Ob, OF) => Ob.map(OP => OF + OP), Ov = (Ob, OF) => Ob.map(OP => OP + OF), Oe = Ob => Boolean(Ob) && (0, OR.HD)(Ob) && '%' === Ob.slice(-1);
    },
    5882: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, {
        'GU': () => OM,
        'ZP': () => OZ,
        'dO': () => Of
      });
      ;
      var OR = OI(8348), Oi = OI(1643), Oj = OI(328), Oq = OI(5004), OX = OI(2799);
      const Ol = 'ontouchstart' in window, Oz = 'PointerEvent' in window && !OR.OS.android, OU = !(Oz || Ol && OR.OS.mobile), Ov = 'keydown', Oe = OR.Features.passiveEvents, Ob = !!Oe && { 'passive': true };
      let OF, OP;
      ;
      const Oc = (OT, Os, Op) => {
        ;
        const OQ = OT.el, OJ = (() => {
          ;
          ;
          var {
            target: OK,
            touches: Ot,
            changedTouches: OL
          } = Op;
          let OS, Ox = Op.pointerType;
          Ox = Ot || OL ? (OS = (null != Ot && Ot.length ? Ot : OL)[0], Ox || 'touch') : (OS = Op, Ox || 'mouse');
          var {
            pageX: Ot,
            pageY: OL
          } = OS;
          return {
            'type': Os,
            'pointerType': Ox,
            'pageX': Ot,
            'pageY': OL,
            'sourceEvent': Op,
            'currentTarget': OQ,
            'target': OK
          };
        })();
        OT.trigger(Os, OJ);
      }, OY = (OT, Os, Op) => {
        ;
        var OQ = OT.el, OJ = Op.target;
        OT.trigger(Os, {
          'type': Os,
          'sourceEvent': Op,
          'currentTarget': OQ,
          'target': OJ
        });
      }, OM = OT => {
        OT = OT.ownerDocument || OT;
        ;
        ;
        return OT.defaultView || OT.parentWindow || window;
      }, OG = (OT, Os, Op, OQ, OJ = Ob) => {
        ;
        let OK = OT.handlers[Os], Ot = OT.options[Os];
        if (OK || (OK = OT.handlers[Os] = {}, Ot = OT.options[Os] = {}), OK[Op]) {
          throw new Error(Os + (' ' + Op + ' already registered'));
        }
        OK[Op] = OQ;
        Ot[Op] = OJ;
        ;
        ;
        OT = OT.el;
        Os = Os === 'window' ? OM(OT) : OT;
        Os && Os.addEventListener(Op, OQ, OJ);
      }, Oo = OT => {
        var Os = OT.el;
        ;
        ;
        ;
        null !== OT.pointerId && (Os.releasePointerCapture(OT.pointerId), OT.pointerId = null);
      }, OD = (OT, Os) => {
        const {
          el: Op,
          handlers: OQ,
          options: OJ
        } = OT, OK = Os === 'window' ? OM(Op) : Op, Ot = OQ[Os], OL = OJ[Os];
        ;
        Ot && (Object.keys(Ot).forEach(OS => {
          var Ox = OL[OS];
          ;
          ;
          'boolean' == typeof Ox ? OK.removeEventListener(OS, Ot[OS], Ox) : OK.removeEventListener(OS, Ot[OS]);
        }), OQ[Os] = null, OJ[Os] = null);
      }, Of = OT => !(!Boolean(OT.ctrlKey) || 'click' !== OT.type) || ('which' in OT ? 3 === OT.which : 'button' in OT && 2 === OT.button), ON = (OT, Os) => {
        ;
        ;
        ;
        if (OP = OP || new OZ(document).on('interaction'), !OT.handlers.init && !OT.handlers.select) {
          const Op = OT.el;
          OG(OT, Os, 'blur', () => {
            ;
            (0, OX.IV)(Op, 'jw-tab-focus');
            OT.clicking = false;
          });
          OG(OT, Os, 'focus', () => {
            ;
            OP.event && OP.event.type === Ov && (0, OX.cn)(Op, 'jw-tab-focus');
          });
        }
      }, Om = (OT, Os, Op, OQ) => {
        ;
        ;
        Oz ? OG(OT, Os, 'pointerdown', Op, OQ) : (OU && OG(OT, Os, 'mousedown', Op, OQ), OG(OT, Os, 'touchstart', Op, OQ));
      }, OW = OT => {
        ;
        ;
        if (!OT.handlers.select) {
          const Os = OT.el;
          ON(OT, 'select');
          Om(OT, 'select', Op => {
            ;
            var OQ = Op.target;
            ;
            ;
            Of(Op) || Boolean(OT.directSelect) && OQ !== Os || (Op.isPrimary && 'BUTTON' === OQ.tagName && OQ.focus(), OT.lastStart = (0, Oq.z)(), OT.clicking = true);
          });
          OG(OT, 'select', 'click', Op => {
            var OQ, OJ;
            ;
            ;
            ;
            Of(Op) || Boolean(OT.directSelect) && Op.target !== Os || (500 < (0, Oq.z)() - OT.lastStart && true === OT.clicking || (OJ = Op, (OQ = OT).enableDoubleClick && ((0, Oq.z)() - OQ.lastClick < 300 ? (Oc(OQ, Oi.P, OJ), OQ.lastClick = 0) : OQ.lastClick = (0, Oq.z)()), Oc(OT, Oi.ot, Op)), OT.clicking = false);
          });
        }
      }, OB = OT => 0 === OT.type.indexOf('touch') ? (OT.originalEvent || OT).changedTouches[0] : OT, Oy = OT => {
        ;
        if (!OT.handlers.init) {
          const {
            el: Os,
            passive: Op
          } = OT, OQ = !!Oe && { 'passive': Op }, OJ = Ot => {
            ;
            ;
            if (OT.dragged) {
              Oc(OT, Oi.Wp, Ot);
            } else {
              const {
                pageX: OS,
                pageY: Ox
              } = OB(Ot), Oa = OS - OT.startX, Ok = Ox - OT.startY;
              36 < Oa * Oa + Ok * Ok && (Oc(OT, Oi.nv, Ot), OT.dragged = true, Oc(OT, Oi.Wp, Ot));
            }
            ;
            ;
            Op || 'touchmove' !== Ot.type || Ot.preventDefault && Ot.preventDefault();
          }, OK = Ot => {
            ;
            ;
            clearTimeout(OF);
            OT.el && (Oo(OT), OD(OT, 'window'), OT.dragged) && (OT.dragged = false, Oc(OT, Oi.Sv, Ot));
          };
          ON(OT, 'init');
          Om(OT, 'init', Ot => {
            ;
            ;
            ;
            if ((0, OX.IV)(Os, 'jw-tab-focus'), !Of(Ot)) {
              var {
                target: OL,
                type: OS
              } = Ot;
              if (!OT.directSelect || OL === Os) {
                var {
                  pageX: OL,
                  pageY: Ox
                } = OB(Ot);
                if (OT.dragged = false, OT.startX = OL, OT.startY = Ox, OD(OT, 'window'), 'pointerdown' === OS && Ot.isPrimary) {
                  if (!Op) {
                    const Oa = Ot.pointerId;
                    OT.pointerId = Oa;
                    Os.setPointerCapture(Oa);
                  }
                  OG(OT, 'window', 'pointermove', OJ, OQ);
                  OG(OT, 'window', 'pointercancel', OK);
                  OG(OT, 'window', 'pointerup', OK);
                } else {
                  'mousedown' === OS ? (OG(OT, 'window', 'mousemove', OJ, OQ), OG(OT, 'window', 'mouseup', OK)) : 'touchstart' === OS && (OG(OT, 'window', 'touchmove', OJ, OQ), OG(OT, 'window', 'touchcancel', OK), OG(OT, 'window', 'touchend', OK));
                }
              }
            }
          }, OQ);
        }
      }, OV = {
        'drag'(OT) {
          Oy(OT);
        },
        'dragStart'(OT) {
          Oy(OT);
        },
        'dragEnd'(OT) {
          Oy(OT);
        },
        'click'(OT) {
          OW(OT);
        },
        'doubleClick'(OT) {
          ;
          OT.enableDoubleClick = true;
          OW(OT);
        },
        'longPress'(OT) {
          ;
          ;
          ;
          const Os = 'longPress';
          if (OR.OS.iOS) {
            const Op = () => {
              clearTimeout(OF);
            };
            OG(OT, Os, 'touchstart', OQ => {
              Op();
              OF = setTimeout(() => {
                Oc(OT, Os, OQ);
              }, 500);
            });
            OG(OT, Os, 'touchmove', Op);
            OG(OT, Os, 'touchcancel', Op);
            OG(OT, Os, 'touchend', Op);
          } else {
            OT.el.oncontextmenu = OQ => (Oc(OT, Os, OQ), false);
          }
        },
        'focus'(OT) {
          const Os = 'focus';
          ;
          OG(OT, Os, Os, Op => {
            OY(OT, Os, Op);
          });
        },
        'blur'(OT) {
          const Os = 'blur';
          ;
          OG(OT, Os, Os, Op => {
            OY(OT, Os, Op);
          });
        },
        'over'(OT) {
          (Oz || OU) && OG(OT, Oi.B1, Oz ? 'pointerover' : 'mouseover', Os => {
            ;
            'touch' !== Os.pointerType && Oc(OT, Oi.B1, Os);
          });
        },
        'out'(OT) {
          ;
          ;
          if (Oz) {
            const Os = OT.el;
            OG(OT, Oi.U3, 'pointerout', Op => {
              ;
              ;
              ;
              var OQ;
              'touch' !== Op.pointerType && 'clientX' in Op && (OQ = document.elementFromPoint(Op.clientX, Op.clientY), Os.contains(OQ) || Oc(OT, Oi.U3, Op));
            });
          } else {
            OU && OG(OT, Oi.U3, 'mouseout', Op => {
              Oc(OT, Oi.U3, Op);
            });
          }
        },
        'move'(OT) {
          ;
          (Oz || OU) && OG(OT, Oi.tP, Oz ? 'pointermove' : 'mousemove', Os => {
            ;
            ;
            'touch' !== Os.pointerType && Oc(OT, Oi.tP, Os);
          });
        },
        'enter'(OT) {
          OG(OT, Oi.K5, Ov, Os => {
            ;
            'Enter' !== Os.key && 13 !== Os.keyCode || (Os.stopPropagation(), OY(OT, Oi.K5, Os));
          });
        },
        'keydown'(OT) {
          OG(OT, Ov, Ov, Os => {
            OY(OT, Ov, Os);
          }, false);
        },
        'gesture'(OT) {
          ;
          const Os = 'gesture', Op = OQ => Oc(OT, Os, OQ);
          OG(OT, Os, 'click', Op);
          OG(OT, Os, Ov, Op);
        },
        'interaction'(OT) {
          var Os = 'interaction', Op = OQ => {
            ;
            OT.event = OQ;
          };
          ;
          OG(OT, Os, 'mousedown', Op, true);
          OG(OT, Os, Ov, Op, true);
        },
        'tap'() {
        },
        'doubleTap'() {
        }
      }, Oh = OT => OT && !(/\s+/.test(OT) || 'object' == typeof OT);
      class OZ extends Oj.ZP {
        constructor(OT, Os) {
          ;
          super();
          ;
          ;
          var Op = !(Os = Os || {}).preventScrolling;
          this.directSelect = Boolean(Os.directSelect);
          this.dragged = false;
          this.enableDoubleClick = false;
          this.el = OT;
          this.handlers = {};
          this.options = {};
          this.lastClick = 0;
          this.lastStart = 0;
          this.passive = Op;
          this.pointerId = null;
          this.startX = 0;
          this.startY = 0;
          this.event = null;
          this.clicking = false;
        }
        ['on'](OT, Os, Op) {
          return !Oh(OT) || this.handlers[OT] || OV[OT](this), super.on(OT, Os, Op);
        }
        ['off'](OT, Os, Op) {
          ;
          ;
          if (Oh(OT)) {
            OD(this, OT);
          } else {
            if (!OT) {
              const OQ = this.handlers;
              Object.keys(OQ).forEach(OJ => {
                OD(this, OJ);
              });
            }
          }
          return super.off(OT, Os, Op);
        }
        ['destroy']() {
          ;
          this.el && (this.off(), Oz && Oo(this), this.el = null);
        }
      }
    },
    6042: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        '$6': () => C5,
        'Cb': () => CC,
        'HD': () => OJ,
        'Kn': () => OV,
        'P2': () => CE,
        'S6': () => OH,
        'UI': () => OL,
        'U_': () => Cv,
        'Yj': () => On,
        'ZP': () => CM,
        '_e': () => Cl,
        'a9': () => Cc,
        'ar': () => CX,
        'ce': () => Cb,
        'cq': () => CI,
        'dp': () => C7,
        'e1': () => Cj,
        'e5': () => Cz,
        'ei': () => CP,
        'hX': () => C3,
        'hj': () => OQ,
        'i2': () => Ot,
        'jn': () => C9,
        'l7': () => CF,
        'mf': () => Op,
        'o8': () => CO,
        'qh': () => CY,
        'r3': () => CR,
        'sE': () => C1,
        'u4': () => Oa,
        'vM': () => Cr,
        'wB': () => Cq,
        'xV': () => C8,
        'yR': () => Ou
      });
      ;
      Oj = OI(5004);
      function OR(CG) {
        if (!OV(CG)) {
          return [];
        }
        if (Om) {
          return Om(CG);
        }
        var Co = [];
        for (const CD in CG)
          Oy(CG, CD) && Co.push(CD);
        return Co;
      }
      function Oi(CG, Co, ...CD) {
        ;
        ;
        if (OW && CG.bind === OW) {
          return OW.apply(CG, [Co].concat(CD));
        }
        if (Op(CG)) {
          return Cf;
        }
        throw new TypeError();
        function Cf(...CN) {
          if (!(this instanceof Cf)) {
            return CG.apply(Co, CD.concat(CN));
          }
          ;
          ;
          ;
          var Cm = new Ox(), CN = (Ox.prototype = null, CG.apply(Cm, CD.concat(CN)));
          return Object(CN) === CN ? CN : Cm;
        }
      }
      function Oq(CG, Co) {
        let CD;
        return function (...Cf) {
          ;
          return 0 < --CG && (CD = Co.apply(this, Cf)), CG <= 1 && (Co = null), CD;
        };
      }
      ;
      function OX(CG) {
        return null == CG ? Ou : Op(CG) ? CG : CC(CG);
      }
      function Ol(CG) {
        return function (Co, CD, Cf) {
          const CN = {};
          return CD = OX(CD), OH(Co, function (Cm, CW) {
            ;
            CW = CD.call(Cf, Cm, CW, Co);
            CG(CN, CW, Cm);
          }), CN;
        };
      }
      ;
      function Oz(CG, ...Co) {
        return function (...CD) {
          let Cf = 0;
          var CN = Co.slice();
          for (let Cm = 0, CW = CN.length; Cm < CW; Cm++) {
            Oy(CN[Cm], 'partial') && (CN[Cm] = CD[Cf++]);
          }
          for (; Cf < arguments.length;) {
            CN.push(CD[Cf++]);
          }
          ;
          return CG.apply(this, CN);
        };
      }
      function OU(CG, Co, ...CD) {
        return setTimeout(function () {
          ;
          return CG.apply(null, CD);
        }, Co);
      }
      const Od = {
        resized: Od.width !== Og,
        width: Og
      }, Og = Array.prototype, OE = Object.prototype, Ov = Function.prototype, Oe = Og.slice, Ob = Og.concat, OF = OE.toString, OP = OE.hasOwnProperty, Oc = Og.map, OY = Og.reduce, OM = Og.forEach, OG = Og.filter, Oo = Og.every, OD = Og.some, Of = Og.indexOf, ON = Array.isArray, Om = Object.keys, OW = Ov.bind, OB = window.isFinite, Oy = function (CG, Co) {
        ;
        return OP.call(CG, Co);
      }, OV = function (CG) {
        return CG === Object(CG);
      }, OH = function (CG, Co, CD) {
        let Cf, CN;
        ;
        ;
        ;
        if (null != CG) {
          if (OM && CG.forEach === OM) {
            CG.forEach(Co, CD);
          } else {
            if (CG.length === Number(CG.length)) {
              for (Cf = 0, CN = CG.length; Cf < CN; Cf++) {
                if (Co.call(CD, CG[Cf], Cf, CG) === Od) {
                  return;
                }
              }
            } else {
              var Cm = OR(CG);
              for (Cf = 0, CN = Cm.length; Cf < CN; Cf++) {
                if (Co.call(CD, CG[Cm[Cf]], Cm[Cf], CG) === Od) {
                  return;
                }
              }
            }
          }
        }
        return CG;
      }, Oh = OH, OZ = [], OT = (OH([
        'Function',
        'String',
        'Number',
        'Date',
        'RegExp'
      ], function (CG) {
        OZ[CG] = function (Co) {
          ;
          ;
          return OF.call(Co) == '[object ' + CG + ']';
        };
      }), OZ.Date), Os = OZ.RegExp, Op = OZ.Function, OQ = OZ.Number, OJ = OZ.String, OK = ON || function (CG) {
        ;
        ;
        return '[object Array]' == OF.call(CG);
      }, Ot = function (CG) {
        return OQ(CG) && CG != Number(CG);
      }, OL = function (CG, Co, CD) {
        ;
        const Cf = [];
        return null == CG ? Cf : Oc && CG.map === Oc ? CG.map(Co, CD) : (OH(CG, function (CN, Cm, CW) {
          ;
          ;
          Cf.push(Co.call(CD, CN, Cm, CW));
        }), Cf);
      }, OS = OL, Ox = function () {
      }, Oa = function (CG, Co, CD, Cf) {
        ;
        let CN = 2 < arguments.length;
        if (null == CG && (CG = []), OY && CG.reduce === OY) {
          return Cf && (Co = Oi(Co, Cf)), CN ? CG.reduce(Co, CD) : CG.reduce(Co);
        }
        ;
        if (OH(CG, function (Cm, CW, CB) {
          ;
          CN ? CD = Co.call(Cf, CD, Cm, CW, CB) : (CD = Cm, CN = true);
        }), CN) {
          return CD;
        }
        ;
        throw new TypeError('Reduce of empty array with no initial value');
      }, Ok = Oa, Ow = Oa, Ou = function (CG) {
        return CG;
      }, On = function (CG, Co, CD) {
        Co = Co || Ou;
        let Cf = false;
        ;
        return null == CG ? Cf : OD && CG.some === OD ? CG.some(Co, CD) : (OH(CG, function (CN, Cm, CW) {
          ;
          if (Cf = Cf || Co.call(CD, CN, Cm, CW)) {
            return Od;
          }
        }), Boolean(Cf));
      }, C0 = On, C1 = function (CG, Co, CD) {
        let Cf;
        return On(CG, function (CN, Cm, CW) {
          if (Co.call(CD, CN, Cm, CW)) {
            return Cf = CN, true;
          }
        }), Cf;
      }, C2 = C1, C3 = function (CG, Co, CD) {
        ;
        const Cf = [];
        return null == CG ? Cf : OG && CG.filter === OG ? CG.filter(Co, CD) : (OH(CG, function (CN, Cm, CW) {
          ;
          ;
          Co.call(CD, CN, Cm, CW) && Cf.push(CN);
        }), Cf);
      }, C4 = C3, C5 = function (CG, Co, CD) {
        ;
        Co = Co || Ou;
        let Cf = true;
        return null == CG ? Cf : Oo && CG.every === Oo ? CG.every(Co, CD) : (OH(CG, function (CN, Cm, CW) {
          if (!(Cf = Cf && Co.call(CD, CN, Cm, CW))) {
            return Od;
          }
        }), Boolean(Cf));
      }, C6 = C5, C7 = function (CG) {
        ;
        return null == CG ? 0 : (CG.length === Number(CG.length) ? CG : OR(CG)).length;
      }, C8 = (OZ.Function = function (CG) {
        ;
        return 'function' == typeof CG;
      }, function (CG) {
        return OB(CG) && !Ot(parseFloat(CG));
      }), C9 = function (CG) {
        ;
        ;
        return true === CG || false === CG || '[object Boolean]' == OF.call(CG);
      }, CO = function (CG) {
        return void 0 === CG;
      }, CC = function (CG) {
        return function (Co) {
          return Co[CG];
        };
      }, Cr = Ol(function (CG, Co, CD) {
        ;
        Oy(CG, Co) ? CG[Co].push(CD) : CG[Co] = [CD];
      }), CA = Ol(function (CG, Co, CD) {
        CG[Co] = CD;
      }), Cj = function (CG, Co, CD, Cf) {
        var CN = (CD = OX(CD)).call(Cf, Co);
        ;
        ;
        let Cm = 0, CW = CG.length;
        for (; Cm < CW;) {
          const CB = Cm + CW >>> 1;
          CD.call(Cf, CG[CB]) < CN ? Cm = 1 + CB : CW = CB;
        }
        return Cm;
      }, CI = function (CG, Co, CD) {
        ;
        if (null != CG) {
          let CN = 0;
          var Cf = CG.length;
          if (CD) {
            if ('number' != typeof CD) {
              return CG[CN = Cj(CG, Co)] === Co ? CN : -1;
            }
            CN = CD < 0 ? Math.max(0, Cf + CD) : CD;
          }
          if (Of && CG.indexOf === Of) {
            return CG.indexOf(Co, CD);
          }
          for (; CN < Cf; CN++) {
            if (CG[CN] === Co) {
              return CN;
            }
          }
        }
        ;
        return -1;
      }, CR = function (CG, Co) {
        ;
        return null != CG && (CG.length !== Number(CG.length) && (CG = function (CD) {
          var Cf = OR(CD), CN = OR.length, Cm = Array(CN);
          ;
          for (let CW = 0; CW < CN; CW++) {
            Cm[CW] = CD[Cf[CW]];
          }
          return Cm;
        }(CG)), 0 <= CI(CG, Co));
      }, Ci = CR, Cq = function (CG) {
        return function (Co) {
          if (Co !== CG) {
            for (const CD in CG)
              if (CG[CD] !== Co[CD]) {
                return false;
              }
          }
          return true;
        };
      }, CX = function (CG, Co) {
        return C3(CG, Cq(Co));
      }, Cl = function (CG, Co) {
        return C1(CG, Cq(Co));
      }, Cz = function (CG, ...Co) {
        const CD = Ob.apply(Og, Co);
        ;
        return C3(CG, function (Cf) {
          return !CR(CD, Cf);
        });
      }, CU = Oz(Oq, 2), Cd = Oz(OU, { 'partial': Oz }, 1), Cg = Oj.z, CE = function (CG, Co, CD) {
        let Cf, CN, Cm, CW = null, CB = 0;
        CD = CD || {};
        function Cy() {
          ;
          ;
          CB = false === CD.leading ? 0 : Cg();
          CW = null;
          Cm = CG.apply(Cf, CN);
          Cf = CN = null;
        }
        return function (...CV) {
          ;
          var CH = Cg(), Ch = (CB || false !== CD.leading || (CB = CH), Co - (CH - CB));
          return Cf = this, CN = CV, Ch <= 0 ? (clearTimeout(CW), CW = null, CB = CH, Cm = CG.apply(Cf, CN), Cf = CN = null) : CW || false === CD.trailing || (CW = setTimeout(Cy, Ch)), Cm;
        };
      }, Cv = function (CG) {
        var Co = {}, CD = OR(CG);
        for (let Cf = 0, CN = CD.length; Cf < CN; Cf++) {
          Co[CG[CD[Cf]]] = CD[Cf];
        }
        return Co;
      }, Cb = function (CG, ...Co) {
        return OH(Co, function (CD) {
          if (CD) {
            for (const Cf in CD)
              void 0 === CG[Cf] && (CG[Cf] = CD[Cf]);
          }
        }), CG;
      }, CF = Object.assign || function (CG, ...Co) {
        return OH(Co, function (CD) {
          if (CD) {
            for (const Cf in CD)
              !function (CN, Cm) {
                if (null == CN) {
                  throw new TypeError('Cannot convert undefined or null to object');
                }
                ;
                return Object.prototype.hasOwnProperty.call(Object(CN), Cm);
              }(CD, Cf) || (CG[Cf] = CD[Cf]);
          }
        }), CG;
      }, CP = function (CG, ...Co) {
        const CD = {};
        ;
        return Co = [].concat(...Co), OH(Co, function (Cf) {
          Cf in CG && (CD[Cf] = CG[Cf]);
        }), CD;
      }, Cc = function (CG) {
        return function () {
          return CG;
        };
      }, CY = CG => OQ(CG) && !Ot(CG), CM = {
        'after': function (CG, Co) {
          return function (...CD) {
            if (--CG < 1) {
              return Co.apply(this, CD);
            }
          };
        },
        'all': C5,
        'any': On,
        'before': Oq,
        'bind': Oi,
        'clone': function (CG) {
          ;
          return OV(CG) ? OK(CG) ? CG.slice() : CF({}, CG) : CG;
        },
        'collect': OS,
        'compact': function (CG) {
          return C3(CG, Ou);
        },
        'constant': Cc,
        'contains': CR,
        'debounce': (CG, Co = 100) => {
          let CD;
          return function (...Cf) {
            clearTimeout(CD);
            CD = setTimeout(() => {
              ;
              CG.apply(this, Cf);
            }, Co);
          };
        },
        'defaults': Cb,
        'defer': Cd,
        'delay': OU,
        'detect': C2,
        'difference': Cz,
        'each': OH,
        'every': C6,
        'extend': CF,
        'filter': C3,
        'find': C1,
        'findWhere': Cl,
        'foldl': Ok,
        'forEach': Oh,
        'groupBy': Cr,
        'has': Oy,
        'identity': Ou,
        'include': Ci,
        'indexBy': CA,
        'indexOf': CI,
        'inject': Ow,
        'invert': Cv,
        'isArray': OK,
        'isBoolean': C9,
        'isDate': OT,
        'isFinite': C8,
        'isFunction': Op,
        'isNaN': Ot,
        'isNull': function (CG) {
          return null === CG;
        },
        'isNumber': OQ,
        'isObject': OV,
        'isRegExp': Os,
        'isString': OJ,
        'isUndefined': CO,
        'isValidNumber': CY,
        'keys': OR,
        'last': function (CG, Co, CD) {
          ;
          ;
          if (null != CG) {
            return null == Co || CD ? CG[CG.length - 1] : Oe.call(CG, Math.max(CG.length - Co, 0));
          }
        },
        'map': OL,
        'matches': Cq,
        'max': function (CG, Co, CD) {
          ;
          if (!Co && OK(CG) && CG[0] === Number(CG[0]) && CG.length < 65535) {
            return Math.max(...CG);
          }
          let Cf = -1e+400, CN = -1e+400;
          ;
          return OH(CG, function (Cm, CW, CB) {
            ;
            CW = Co ? Co.call(CD, Cm, CW, CB) : Cm;
            CW > CN && (Cf = Cm, CN = CW);
          }), Cf;
        },
        'memoize': function (CG, Co) {
          const CD = {};
          return Co = Co || Ou, function (...Cf) {
            ;
            var CN = Co.apply(this, Cf);
            ;
            return Oy(CD, CN) ? CD[CN] : CD[CN] = CG.apply(this, Cf);
          };
        },
        'now': Cg,
        'omit': function (CG, ...Co) {
          var CD = {};
          for (const Cf in CG)
            CR(Co, Cf) || (CD[Cf] = CG[Cf]);
          return CD;
        },
        'once': CU,
        'partial': Oz,
        'pick': CP,
        'pluck': function (CG, Co) {
          return OL(CG, CC(Co));
        },
        'property': CC,
        'propertyOf': function (CG) {
          return null == CG ? function () {
          } : function (Co) {
            return CG[Co];
          };
        },
        'reduce': Oa,
        'reject': function (CG, Co, CD) {
          return C3(CG, function (Cf, CN, Cm) {
            return !Co.call(CD, Cf, CN, Cm);
          }, CD);
        },
        'result': function (CG, Co) {
          if (null != CG) {
            return Co = CG[Co], Op(Co) ? Co.call(CG) : Co;
          }
        },
        'select': C4,
        'size': C7,
        'some': C0,
        'sortedIndex': Cj,
        'throttle': CE,
        'where': CX,
        'without': function (CG, ...Co) {
          return Cz(CG, Co);
        }
      };
    },
    5950: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, {
        'O9': () => OX,
        '_N': () => Oq,
        'kd': () => OU,
        'ke': () => Ol,
        'vl': () => Oi
      });
      ;
      const Oi = function (Od) {
        if (!Od) {
          return {};
        }
        ;
        ;
        ;
        var Og, OE = (Oe => {
          ;
          if (Oe) {
            return new URL(Oe, window.location);
          }
        })(Od), Ov = {
          onload: null,
          onprogress: null,
          onreadystatechange: null,
          onerror: null
        };
        for (const Oe of OE.searchParams.keys())
          Ov[Oe] || (Og = OE.searchParams.getAll(Oe), Ov[Oe] = 1 === Og.length ? Og[0] : Og);
        return Ov;
      }, Oq = function (Od) {
        ;
        return !Od || (Od = new URLSearchParams(Od).get('jw_start') || -1, isNaN(Od)) || Od < -1 ? -1 : Number(Od);
      }, OX = function (Od, Og = '{seek_to_second_number}') {
        ;
        ;
        ;
        if (Od) {
          return (Od = new URL(Od)).searchParams.set('jw_start', Og), Od.toString();
        }
      }, Ol = (Od, Og) => {
        ;
        if (Od) {
          return new URLSearchParams(Od).has(Og);
        }
      }, Oz = Od => !!Od && null !== Od.match(/^[^:/?#]+:?\/\/[^/?#]+/), OU = (Od, Og) => (Og = Og || document.location.href, Od && Oz(Og) ? Oz(Od) ? Od : new URL(Od, Og).toString() : '');
    },
    7034: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.r(Oj);
      OI.d(Oj, {
        'exists': () => Oi,
        'isDeepKeyCompliant': () => Od,
        'isFileProtocol': () => OX,
        'isHTTPS': () => Oq,
        'isRtmp': () => Ol,
        'isYouTube': () => Oz,
        'typeOf': () => OU
      });
      ;
      ;
      const OR = window.location.protocol, Oi = Og => {
        ;
        ;
        switch (typeof Og) {
          case 'string':
            return 0 < Og.length;
          case 'object':
            return null !== Og;
          case 'undefined':
            return false;
          default:
            return true;
        }
      }, Oq = () => 'https:' === OR, OX = () => 'file:' === OR, Ol = (Og, OE) => 0 === Og.indexOf('rtmp:') || 'rtmp' === OE, Oz = (Og, OE) => 'youtube' === OE || /^(http|\/\/).*(youtube\.com|youtu\.be)\/.+/.test(Og), OU = Og => {
        ;
        var OE;
        ;
        return null === Og ? 'null' : 'object' == (OE = typeof Og) && Array.isArray(Og) ? 'array' : OE;
      }, Od = (Og, OE, Ov) => {
        ;
        var Oe = Object.keys(Og);
        ;
        return Object.keys(OE).length >= Oe.length && Oe.every(Ob => {
          ;
          var OF = Og[Ob], OP = OE[Ob];
          ;
          return OF && 'object' == typeof OF ? !(!OP || 'object' != typeof OP) && Od(OF, OP, Ov) : Ov(Ob, Og);
        });
      };
    },
    9025: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, { 'Z': () => OR });
      const OR = document.createElement('video');
    },
    6601: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, { 'i': () => '8.27.1+commercial_master.532.hls.js@1.4.3.jwplayer@mono.jwplayer-ads-dai@mono.jwplayer-ads-freewheel@mono.jwplayer-ads-googima@mono.jwplayer-ads-header-bidding@github:jwplayer/jwplayer-ads-header-bidding#v7.2.0.jwplayer-ads-vast@mono.jwplayer-analytics@v3.42.2.jwplayer-analytics-kraken@v0.0.4.jwplayer-plugin-gapro@mono' });
      ;
    },
    4225: (OA, Oj, OI) => {
      'use strict';
      ;
      ;
      OI.d(Oj, {
        'Z': () => function (OX, Ol) {
          ;
          var {
            message: Ol,
            code: Oz
          } = Ol, Ol = OR(OX.get('id'), Ol, OX.get('localization').errors.errorCode, Oz.toString()), Oz = OX.get('width'), OX = OX.get('height'), Ol = (0, Oi.az)(Ol);
          ;
          ;
          return (0, Oq.oB)(Ol, {
            'width': 0 < Oz.toString().indexOf('%') ? Oz : Oz + 'px',
            'height': 0 < OX.toString().indexOf('%') ? OX : OX + 'px'
          }), Ol;
        }
      });
      const OR = (OX, Ol, Oz, OU) => '<div id="' + OX + '" class="jw-error jw-reset"><div class="jw-error-msg jw-info-overlay jw-reset"><style>[id="' + OX + '"].jw-error{background:#000;overflow:hidden;position:relative}[id="' + OX + '"] .jw-error-msg{top:50%;left:50%;position:absolute;transform:translate(-50%,-50%)}[id="' + OX + '"] .jw-error-text{text-align:start;color:#FFF;font:14px/1.35 Arial,Helvetica,sans-serif}</style><div class="jw-icon jw-reset"></div><div class="jw-info-container jw-reset"><div class="jw-error-text jw-reset-text" dir="auto" data-nosnippet>' + (Ol || '') + '<span class="jw-break jw-reset"></span>' + (OU ? ('(' + Oz + ': ' + OU + ')').replace(/\s+/g, '&nbsp;') : '') + '</div></div></div></div>';
      ;
      var Oi = OI(2799), Oq = OI(974);
    },
    9926: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, { 'Z': () => OU });
      var OR = OI(1776), Oi = OI(2799), Oq = OI(974);
      const OX = [];
      let Ol = -1;
      const Oz = () => {
        (0, OR.W)(Ol);
        Ol = (0, OR.U)(() => {
          ;
          ;
          ;
          OX.forEach(Od => {
            ;
            Od.view.updateBounds();
            var Og = Od.view.model.get('containerWidth');
            ;
            ;
            ;
          });
          OX.forEach(Od => {
            ;
            ;
            Od.contractElement.scrollLeft = 2 * Od.width;
          });
          OX.forEach(Od => {
            ;
            ;
            (0, Oq.oB)(Od.expandChild, { 'width': Od.width + 1 });
            Od.resized && Od.view.model.get('visibility') && Od.view.updateStyles();
          });
          OX.forEach(Od => {
            ;
            ;
            Od.expandElement.scrollLeft = Od.width + 1;
          });
          OX.forEach(Od => {
            ;
            Od.resized && Od.view.checkResized();
          });
        });
      };
      class OU {
        constructor(Od, Og, OE) {
          ;
          ;
          var Ov = {
            'display': 'block',
            'position': 'absolute',
            'top': 0,
            'left': 0
          }, Oe = {
            'width': '100%',
            'height': '100%'
          }, Ob = (0, Oi.az)('<div style="opacity:0;visibility:hidden;overflow:hidden;"><div><div style="height:1px;"></div></div><div class="jw-contract-trigger"></div></div>'), OF = Ob.firstChild, OP = OF.firstChild, Oc = OF.nextSibling;
          ;
          (0, Oq.oB)([
            OF,
            Oc
          ], Object.assign({ 'overflow': 'auto' }, Ov, Oe));
          (0, Oq.oB)(Ob, Object.assign({}, Ov, Oe));
          this.expandElement = OF;
          this.expandChild = OP;
          this.contractElement = Oc;
          this.hiddenElement = Ob;
          this.element = Od;
          this.view = Og;
          this.model = OE;
          this.width = 0;
          this.resized = false;
          Od.firstChild ? Od.insertBefore(Ob, Od.firstChild) : Od.appendChild(Ob);
          Od.addEventListener('scroll', Oz, true);
          OX.push(this);
          Oz();
        }
        ['destroy']() {
          ;
          var Od;
          ;
          ;
          this.view && (-1 !== (Od = OX.indexOf(this)) && OX.splice(Od, 1), this.element.removeEventListener('scroll', Oz, true), this.element.removeChild(this.hiddenElement), this.view = this.model = null);
        }
      }
    },
    4671: (OA, Oj, OI) => {
      'use strict';
      ;
      ;
      OI.d(Oj, { 'Z': () => Oc });
      ;
      var OR = OI(6875), Oj = OI(8348), Oi = OI(2799);
      const Oq = [], OX = [], Ol = [], Oz = {}, OU = 'screen' in window && 'orientation' in window.screen, Od = Oj.OS.android && Oj.Browser.chrome;
      let Og, OE = false;
      const Ov = (OY, OM) => {
        ;
        ;
        ;
        for (let Oo = OM.length; Oo--;) {
          var OG = OM[Oo];
          if (OY.target === OG.getContainer()) {
            OG.setIntersection(OY);
            break;
          }
        }
      }, Oe = () => {
        ;
        Oq.forEach(OY => {
          ;
          ;
          var OM, OG = OY.model;
          ;
          OG.get('audioMode') || OG.get('isFloating') || !OG.get('controls') || OG.get('visibility') < 0.75 || (OG = OG.get('state'), !(OM = (0, Oi.UM)()) && 'paused' === OG && OY.api.getFullscreen() ? OY.api.setFullscreen(false) : 'playing' === OG && OY.api.setFullscreen(OM));
        });
      }, Ob = () => {
        ;
        Oq.forEach(OY => {
          ;
          ;
          OY.model.set('activeTab', (0, OR.Z)());
        });
      }, OF = (OY, OM) => {
        ;
        ;
        OY = OM.indexOf(OY);
        -1 !== OY && OM.splice(OY, 1);
      }, OP = OY => {
        Ol.forEach(OM => {
          OM(OY);
        });
      }, Oc = (document.addEventListener('visibilitychange', Ob), document.addEventListener('webkitvisibilitychange', Ob), Od && OU && window.screen.orientation.addEventListener('change', Oe), window.addEventListener('beforeunload', () => {
        ;
        ;
        ;
        document.removeEventListener('visibilitychange', Ob);
        document.removeEventListener('webkitvisibilitychange', Ob);
        window.removeEventListener('scroll', OP);
        Od && OU && window.screen.orientation.removeEventListener('change', Oe);
      }), {
        'add'(OY) {
          ;
          Oq.push(OY);
        },
        'remove'(OY) {
          OF(OY, Oq);
        },
        'addScrollHandler'(OY) {
          ;
          OE || (OE = true, window.addEventListener('scroll', OP));
          Ol.push(OY);
        },
        'removeScrollHandler'(OY) {
          ;
          OY = Ol.indexOf(OY);
          -1 !== OY && Ol.splice(OY, 1);
        },
        'addWidget'(OY) {
          OX.push(OY);
        },
        'removeWidget'(OY) {
          OF(OY, OX);
        },
        'size': () => Oq.length,
        'observe'(OY) {
          ;
          var OM;
          OM = window.IntersectionObserver;
          Og = Og || new OM(OG => {
            ;
            ;
            if (null != OG && OG.length) {
              for (let OD = OG.length; OD--;) {
                var Oo = OG[OD];
                Ov(Oo, Oq);
                Ov(Oo, OX);
              }
            }
          }, {
            'threshold': [
              0,
              0.1,
              0.2,
              0.3,
              0.4,
              0.5,
              0.6,
              0.7,
              0.8,
              0.9,
              1
            ]
          });
          Oz[OY.id] || (Oz[OY.id] = true, Og.observe(OY));
        },
        'unobserve'(OY) {
          ;
          Og && Oz[OY.id] && (delete Oz[OY.id], Og.unobserve(OY));
        }
      });
    },
    2445: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, {
        'ZP': () => OY,
        'qG': () => Oc
      });
      var OR = OI(5083), Oi = OI(1569), Oq = OI(6042), OX = OI(7034), Ol = OI(576), Oz = OI(6599), OU = OI(386);
      ;
      const Od = '__CONTEXTUAL__', Og = (OM, OG) => {
        ;
        OM = OM.querySelector(OG);
        if (OM) {
          return OM.getAttribute('content');
        }
      };
      var Oj = OI(4737), OE = OI.n(Oj), Ov = OI(67);
      const Oe = OM => 'string' == typeof OM && /^\/\/(?:content\.jwplatform|cdn\.jwplayer)\.com\//.test(OM), Ob = OM => 'https:' + OM, OF = OM => {
        var OG = 'file:' === window.location.protocol ? 'https:' : '', OM = {
          'bidding': '//ssl.p.jwpcdn.com/player/v/8.27.1/bidding.js',
          'jwpsrv': '//ssl.p.jwpcdn.com/player/v/8.27.1/jwpsrv.js',
          'dai': '//ssl.p.jwpcdn.com/player/v/8.27.1/dai.js',
          'vast': '//ssl.p.jwpcdn.com/player/v/8.27.1/vast.js',
          'googima': '//ssl.p.jwpcdn.com/player/v/8.27.1/googima.js',
          'freewheel': '//ssl.p.jwpcdn.com/player/v/8.27.1/freewheel.js',
          'gapro': '//ssl.p.jwpcdn.com/player/v/8.27.1/gapro.js',
          'interactive': '//ssl.p.jwpcdn.com/player/v/8.27.1/interactive.js'
        }[OM];
        ;
        ;
        ;
        return OM ? OG + OM : '';
      }, OP = (OM, OG, Oo) => {
        ;
        ;
        OG && delete (OM[OG.client || OF(Oo)] = OG).client;
      }, Oc = OM => {
        const OG = Object.assign({}, OM.plugins), Oo = (0, OU.Z)(OM.edition);
        if (Oo('ads')) {
          const OD = Object.assign({}, OM.advertising), Of = OD.client;
          Of && delete (OG[OF(Of) || Of] = OD).client;
          OD.bids && OP(OG, OD.bids, 'bidding');
        }
        ;
        if (Oo('jwpsrv')) {
          let ON = OM.analytics;
          ON !== Object(ON) && (ON = {});
          OP(OG, ON, 'jwpsrv');
        }
        ;
        ;
        return OP(OG, OM.ga, 'gapro'), OP(OG, OM.interactive, 'interactive'), OG;
      }, OY = function (OM, OG) {
        let Oo = (0, OR.ZP)(OM, OG);
        var OM = Oo.key || Ol.default.key, OG = new Oz.ZP(OM), OD = OG.edition();
        ;
        if ((Oo = 'free' === OG.edition() ? Object.assign({
          'skin': {
            'active': '#ff0046',
            'timeslider': { 'progress': 'none' }
          },
          'logo': {
            'position': 'control-bar',
            'file': OE()
          }
        }, OR.ke, (0, Oq.ei)(Oo, [
          'analytics',
          'aspectratio',
          'base',
          'file',
          'height',
          'playlist',
          'sources',
          'timeSlider',
          'width'
        ])) : Oo).key = OM, Oo.edition = OD, Oo.error = OG.error(), Oo.generateSEOMetadata = Oo.generateSEOMetadata || false, 'unlimited' === OD) {
          const Of = (0, Oi.getScriptPath)('jwplayer.js');
          if (!Of) {
            throw new Error('Error setting up player: Could not locate jwplayer.js script tag');
          }
          OI.p = Of;
        }
        ;
        if (Oo.related = (ON => {
          var Om = (0, OU.Z)(ON.edition), OW = ON.related, Om = !Om('discovery') || OW !== Object(OW), OB = !OW || 'none' !== OW.displayMode, Oy = OW || {};
          let OV = void 0 === Oy.oncomplete ? 'none' : Oy.oncomplete, OH = Oy.autoplaytimer;
          false === OV || ON.repeat ? OV = 'hide' : 'none' === OV && (OH = 0);
          ;
          Oy = 'autoplay' === OV && OH <= 0 || 'none' === OV;
          ;
          ;
          return Object.assign({}, OW, {
            'disableRelated': Om,
            'showButton': OB,
            'oncomplete': OV,
            'autoplaytimer': OH,
            'shouldAutoAdvance': Oy
          });
        })(Oo), Oo.ab && (Oo.ab = (ON => {
          let Om = ON.ab;
          ;
          ;
          ;
          return Om.clone && (Om = Om.clone()), Object.keys(Om.tests).forEach(OW => {
            Om.tests[OW].forEach(OB => {
              ;
              ;
              ;
              OB.addConfig && OB.addConfig(ON, OB.selection);
            });
          }), Om;
        })(Oo)), Oo.plugins = Oc(Oo), OM = Oo.playlist, (0, Oq.HD)(OM) && -1 < OM.indexOf(Od) && (Oo.playlist = ((ON, Om) => {
          var OW = null == ON || null == ON.querySelector || null == (OW = ON.querySelector('title')) ? void 0 : OW.textContent, OB = Og(ON, 'meta[property="og:title"]');
          ;
          let Oy = encodeURIComponent(OB || OW || '');
          OB = Og(ON, 'meta[property="og:description"]') || Og(ON, 'meta[name="description"]');
          ;
          return OB && (Oy += '&page_description=' + encodeURIComponent(OB)), Om.replace(Od, Oy);
        })(document, Oo.playlist), Oo.contextual = true), (0, OX.isFileProtocol)()) {
          const {
            playlist: ON,
            related: Om
          } = Oo;
          Oe(ON) && (Oo.playlist = Ob(ON));
          Om && Oe(Om.file) && (Om.file = Ob(Om.file));
        }
        ;
        return Oo['__abSendDomainToFeeds'] && (OG = Oo.playlist, /\.jwplatform.com|\.jwplayer.com/.test(OG)) && (Oo.playlist = (OD = Oo.playlist) + ((-1 !== OD.indexOf('?') ? '&' : '?') + 'page_domain=' + encodeURIComponent((0, Ov.X)()))), Oo;
      };
    },
    576: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, { 'default': () => OL });
      var Oj = OI(1096), Oj = OI.n(Oj), Oj = (window.Promise || (window.Promise = Oj()), OI(1569)), OR = OI(6391), Oi = OI(2963), Oq = OI(670), Oi = {
        'availableProviders': Oi.B,
        'registerProvider': Oq.Z
      }, OX = OI(1241);
      ;
      ;
      const Ol = Oi;
      var Oz = OI(6601), OU = OI(4742), Od = OI(8348), Og = OI(623), OE = OI(1643), Ov = OI(7411), Oe = OI(328), Ob = OI(4429), OF = OI(6042);
      let OP = 0;
      ;
      ;
      function Oc(OS, Ox) {
        ;
        return (Ox = new Og.ZP(Ox)).on(OE.Rc, Oa => {
          ;
          ;
          ;
          OS['_qoe'].tick('ready');
          Oa.setupTime = OS['_qoe'].between('setup', 'ready');
        }), Ox.on('all', (Oa, Ok) => {
          ;
          OS.trigger(Oa, Ok);
        }), Ox;
      }
      function OY(OS, Ox) {
        const Oa = OS.plugins, Ok = Object.keys(Oa).map(Ow => {
          var Ou = Oa[Ow];
          return delete Oa[Ow], Ou;
        });
        ;
        ;
        ;
        Ox.get('setupConfig') && OS.trigger('remove');
        OS.off();
        Ox.playerDestroy();
        Ok.forEach(Ow => {
          ;
          if (Ow.destroy) {
            try {
              Ow.destroy();
            } catch (Ou) {
            }
          }
        });
        Ox.getContainer().removeAttribute('data-jwplayer-id');
      }
      function OM(OS) {
        const Ox = ++OP, Oa = OS.id || 'player-' + Ox, Ok = new Ov.Z(), Ow = {};
        ;
        ;
        ;
        let Ou = Oc(this, OS);
        Ok.tick('init');
        OS.setAttribute('data-jwplayer-id', Oa);
        Object.defineProperties(this, {
          'id': {
            'enumerable': true,
            'get': () => Oa
          },
          'uniqueId': {
            'enumerable': true,
            'get': () => Ox
          },
          'plugins': {
            'enumerable': true,
            'get': () => Ow
          },
          '_qoe': {
            'enumerable': true,
            'get': () => Ok
          },
          'version': {
            'enumerable': true,
            'get': () => Oz.i
          },
          'Events': {
            'enumerable': true,
            'get': () => Oe.ZP
          },
          'utils': {
            'enumerable': true,
            'get': () => Ob.Z
          },
          '_': {
            'enumerable': true,
            'get': () => OF.ZP
          }
        });
        Object.assign(this, {
          '_events': {},
          'setup'(On) {
            ;
            ;
            return Ok.clear('ready'), Ok.tick('setup'), Ou && OY(this, Ou), (Ou = Oc(this, OS)).init(On, this), this.on(On.events, null, this);
          },
          'remove'() {
            ;
            ;
            this.getPip() && this.setPip(false);
            var On = this;
            for (let C0 = OR.Z.length; C0--;) {
              if (OR.Z[C0].uniqueId === On.uniqueId) {
                OR.Z.splice(C0, 1);
                break;
              }
            }
            return Ou && OY(this, Ou), Object.keys(Ow).forEach(C1 => {
              delete Ow[C1];
            }), this;
          },
          'qoe'() {
            ;
            ;
            var On = Ou.getItemQoe();
            ;
            return {
              'setupTime': this['_qoe'].between('setup', 'ready'),
              'firstFrame': On.getFirstFrame ? On.getFirstFrame() : null,
              'player': this['_qoe'].dump(),
              'item': On.dump()
            };
          },
          'addCues'(On) {
            ;
            ;
            return Array.isArray(On) && Ou.addCues(On), this;
          },
          'getAudioTracks': () => Ou.getAudioTracks(),
          'getBuffer': () => Ou.get('buffer'),
          'getCaptions': () => Ou.get('captions'),
          'getCaptionsList': () => Ou.getCaptionsList(),
          'getConfig': () => Ou.getConfig(),
          'getContainer': () => Ou.getContainer(),
          'getControls': () => Ou.get('controls'),
          'getCues': () => Ou.getCues(),
          'getCurrentAudioTrack': () => Ou.getCurrentAudioTrack(),
          'getCurrentCaptions': () => Ou.getCurrentCaptions(),
          'getCurrentQuality': () => Ou.getCurrentQuality(),
          'getCurrentTime': () => Ou.get('currentTime'),
          'getAbsolutePosition': () => Ou.getAbsolutePosition(),
          'getDuration': () => Ou.get('duration'),
          'getEnvironment': () => Od,
          'getFullscreen': () => Ou.get('fullscreen'),
          'getHeight': () => Ou.getHeight(),
          'getItemMeta': () => Ou.get('itemMeta') || {},
          'getMute': () => Ou.getMute(),
          'getPercentViewable': () => Ou.get('visibility'),
          'getPip': () => Ou.get('pip'),
          'getPlaybackRate': () => Ou.get('playbackRate'),
          'getPlaylist': () => Ou.get('playlist'),
          'getPlaylistIndex': () => Ou.get('item'),
          'getPlaylistItem'(On) {
            ;
            var C0;
            return Ob.Z.exists(On) ? (C0 = this.getPlaylist()) ? C0[On] : null : Ou.get('playlistItem');
          },
          'getPosition': () => Ou.get('position'),
          'getProvider': () => Ou.getProvider(),
          'getQualityLevels': () => Ou.getQualityLevels(),
          'getSafeRegion': (On = true) => Ou.getSafeRegion(On),
          'getState': () => Ou.getState(),
          'getStretching': () => Ou.get('stretching'),
          'getViewable': () => Ou.get('viewable'),
          'getVisualQuality': () => Ou.getVisualQuality(),
          'getVolume': () => Ou.get('volume'),
          'getWidth': () => Ou.getWidth(),
          'setCaptions'(On) {
            return Ou.setCaptions(On), this;
          },
          'setConfig'(On) {
            ;
            return Ou.setConfig(On), this;
          },
          'setControls'(On) {
            ;
            return Ou.setControls(On), this;
          },
          'setCurrentAudioTrack'(On) {
            ;
            Ou.setCurrentAudioTrack(On);
          },
          'setCurrentCaptions'(On) {
            ;
            Ou.setCurrentCaptions(On);
          },
          'setCurrentQuality'(On) {
            ;
            Ou.setCurrentQuality(On);
          },
          'setFullscreen'(On) {
            return Ou.setFullscreen(On), this;
          },
          'setAllowFullscreen'(On) {
            ;
            return Ou.setAllowFullscreen(On), this;
          },
          'setMute'(On) {
            ;
            return Ou.setMute(On), this;
          },
          'setPip'(On) {
            ;
            return Ou.setPip(On), this;
          },
          'setPlaybackRate'(On) {
            return Ou.setPlaybackRate(On), this;
          },
          'setPlaylistItem'(On, C0) {
            ;
            return Ou.setPlaylistItem(On, C0), this;
          },
          'setCues'(On) {
            ;
            ;
            return Array.isArray(On) && Ou.setCues(On), this;
          },
          'setVolume'(On) {
            ;
            return Ou.setVolume(On), this;
          },
          'load'(On, C0) {
            ;
            return Ou.load(On, C0), this;
          },
          'play'(On) {
            ;
            return Ou.play(On), this;
          },
          'pause'(On) {
            ;
            return Ou.pause(On), this;
          },
          'playToggle'(On) {
            ;
            switch (this.getState()) {
              case OE.r0:
              case OE.Kb:
                return this.pause(On);
              default:
                return this.play(On);
            }
          },
          'seek'(On, C0) {
            ;
            return Ou.seek(On, C0), this;
          },
          'playlistItem'(On, C0) {
            ;
            return Ou.playlistItem(On, C0), this;
          },
          'playlistNext'(On) {
            return Ou.playlistNext(On), this;
          },
          'playlistPrev'(On) {
            ;
            return Ou.playlistPrev(On), this;
          },
          'next'(On) {
            return Ou.next(On), this;
          },
          'requestPip'(On) {
            ;
            return Ou.requestPip(On), this;
          },
          'castToggle'() {
            ;
            return Ou.castToggle(), this;
          },
          'stopCasting'() {
            ;
            return Ou.stopCasting(), this;
          },
          'requestCast'(On) {
            return Ou.requestCast(On), this;
          },
          'createInstream': () => Ou.createInstream(),
          'stop'() {
            return Ou.stop(), this;
          },
          'resize'(On, C0) {
            ;
            return Ou.resize(On, C0), this;
          },
          'addButton'(On, C0, C1, C2, C3) {
            ;
            return Ou.addButton(On, C0, C1, C2, C3), this;
          },
          'removeButton'(On) {
            ;
            return Ou.removeButton(On), this;
          },
          'getMediaElement': () => Ou.getMediaElement(),
          'attachMedia'() {
            ;
            return Ou.attachMedia(), this;
          },
          'detachMedia'() {
            ;
            return Ou.detachMedia(), this;
          },
          'isBeforeComplete': () => Ou.isBeforeComplete(),
          'isBeforePlay': () => Ou.isBeforePlay(),
          'setPlaylistItemCallback'(On, C0) {
            ;
            Ou.setItemCallback(On, C0);
          },
          'removePlaylistItemCallback'() {
            ;
            Ou.setItemCallback(null);
          },
          'getPlaylistItemPromise': On => Ou.getItemPromise(On),
          'getFloating': () => Boolean(Ou.get('isFloating')),
          'setFloating'(On) {
            ;
            ;
            ;
            Ou.setConfig({ 'floating': { 'mode': On ? 'always' : 'never' } });
          },
          'getChapters': () => Ou.getChapters(),
          'getCurrentChapter': () => Ou.getCurrentChapter(),
          'setChapter': On => Ou.setChapter(On)
        });
      }
      Object.assign(Oh, Oi);
      OD(Oh);
      'function' == typeof OK.define && OK.define.amd && OK.define([], function () {
        return Oh;
      });
      OI.p = (0, Oj.loadFrom)();
      function OG(OS) {
        ;
        let Ox, Oa;
        if (OS ? 'string' == typeof OS ? (Ox = Oo(OS)) || (Oa = document.getElementById(OS)) : 'number' == typeof OS ? Ox = OR.Z[OS] : OS.nodeType && (Oa = OS, Ox = Oo(Oa.id || Oa.getAttribute('data-jwplayer-id'))) : Ox = OR.Z[0], Ox) {
          return Ox;
        }
        if (Oa) {
          const Ok = new OM(Oa);
          return OR.Z.push(Ok), Ok;
        }
        ;
        ;
        return { 'registerPlugin': OX.f };
      }
      const Oo = OS => {
        for (let Ox = 0; Ox < OR.Z.length; Ox++) {
          if (OR.Z[Ox].id === OS) {
            return OR.Z[Ox];
          }
        }
        ;
        return null;
      }, OD = OS => {
        ;
        Object.defineProperties(OS, {
          'api': {
            'get': () => Ol,
            'set'() {
            }
          },
          'version': {
            'get': () => Oz.i,
            'set'() {
            }
          },
          'debug': {
            'get': () => OU.Z.debug,
            'set'(Ox) {
              ;
              OU.Z.debug = Boolean(Ox);
            }
          }
        });
      }, Of = (OD(OG), OG);
      var Oq = OI(5882), Oi = OI(6599), Oj = OI(676), ON = OI(5592), Om = OI(6769), OW = OI(9025), OB = OF.ZP.extend, Oy = {}, Oi = (Oy['_'] = OF.ZP, Oy.utils = Object.assign(Ob.Z, {
        'key': Oi.ZP,
        'extend': OB,
        'scriptloader': Oj.ZP,
        'rssparser': { 'parse': Om.Z },
        'tea': ON.p,
        'UI': Oq.ZP
      }), Oy.utils.css.style = Oy.utils.style, Oy.vid = OW.Z, Oy), OV = OI(7543);
      function OH(OS) {
        var Ox = { prototype: CG.prototype };
        ;
        OJ(this, OS, OS, Ox);
        OJ(this, OS, OM.prototype, Ox);
      }
      function Oh(OS) {
        ;
        ;
        return (OS = Of(OS)).uniqueId ? OS['_publicApi'] || (OS['_publicApi'] = new OH(OS)) : OS;
      }
      const OT = OS => {
        ;
        ;
        console.warn('The API method jwplayer().' + OS + '() is disabled in the free edition of JW Player.');
      }, Os = (OS, Ox) => {
        ;
        ;
        ;
        if (Ox.length) {
          const Oa = OS.getPlugin('jwpsrv');
          null != Oa && Oa.trackExternalAPIUsage && (Ox.forEach(Ok => {
            ;
            var Ow = Oa, Ou = Ok[0], Ok = Ok[1];
            ;
            try {
              var On = (C0 => {
                ;
                ;
                ;
                switch (Ou) {
                  case 'setup':
                    return Boolean(C0);
                  case 'getSafeRegion':
                  case 'pauseAd':
                  case 'setControls':
                  case 'setFullscreen':
                  case 'setMute':
                    return Boolean(C0) === C0 ? C0 : void 0;
                  case 'setPlaylistItem':
                  case 'getPlaylistItem':
                    return (0 | C0) === C0 ? C0 : void 0;
                  case 'setPlaybackRate':
                  case 'setVolume':
                    return Number(C0);
                  case 'setConfig':
                    return Object.keys(Object(C0)).join(',');
                  case 'on':
                  case 'once':
                  case 'off':
                  case 'trigger':
                  case 'getPlugin':
                  case 'addPlugin':
                  case 'registerPlugin':
                    return '' + C0;
                }
                return null;
              })(Ok);
              Ow.trackExternalAPIUsage(Ou, On);
            } catch (C0) {
              OU.Z.debug && console.warn(C0);
            }
          }), Ox.length = 0);
        }
      }, Op = (OS, Ox, Oa, Ok, Ow) => function (...Ou) {
        const On = Ou[0], C0 = Ox['_trackCallQueue'] || (Ox['_trackCallQueue'] = []), C1 = /^(?:on(?:ce)?|off|trigger)$/.test(Oa), C2 = C1 && Ou[1] && Ou[1]['_callback'], C3 = Ow.edition || (C4 = Ow, C7 = Ox.getConfig().edition, C4.edition = C7);
        if ('free' === C3) {
          if (-1 < [
            'addButton',
            'addCues',
            'detachMedia',
            'load',
            'next',
            'pause',
            'play',
            'playlistItem',
            'playlistNext',
            'playlistPrev',
            'playToggle',
            'resize',
            'seek',
            'setCaptions',
            'setConfig',
            'setControls',
            'setCues',
            'setFullscreen',
            'setMute',
            'setPlaybackRate',
            'setPlaylistItem',
            'setVolume',
            'stop'
          ].indexOf(Oa)) {
            return OT(Oa), OS;
          }
          if (-1 < [
            'createInstream',
            'setCurrentAudioTrack',
            'setCurrentCaptions',
            'setCurrentQuality'
          ].indexOf(Oa)) {
            return OT(Oa), null;
          }
        }
        ;
        ;
        ;
        if (C2 || C0.push([
          Oa,
          On
        ]), C1) {
          return Os(Ox, C0), Ox[Oa].apply(OS, Ou);
        }
        var C4 = Oa, C5 = Ou, C6 = { 'reason': 'play' !== C4 && 'seek' !== C4 && 'pause' !== C4 && (0, OV.C)() ? 'interaction' : 'external' };
        switch (C4) {
          case 'play':
          case 'pause':
          case 'playToggle':
          case 'playlistNext':
          case 'playlistPrev':
          case 'next':
            C5[0] = C6;
            break;
          case 'seek':
          case 'playlistItem':
            C5[1] = C6;
        }
        var C7 = Ox[Oa](...Ou);
        return 'remove' === Oa ? Ox.off.call(OS) : 'setup' === Oa && (Ox.off.call(OS), Ox.off(On.events, null, Ox), Ox.on.call(OS, On.events, null, OS), Ox.on('all', (C8, C9) => {
          if ('ready' === C8) {
            const CO = Object.keys(Ox).filter(Cr => '_' !== Cr[0] && -1 === Ok.indexOf(Cr) && 'function' == typeof Ox[Cr]), CC = Ok.concat(CO);
            CO.forEach(Cr => {
              OS[Cr] = Op(OS, Ox, Cr, CC, Ow);
            });
          }
          ;
          ;
          ;
          Ox.trigger.call(OS, C8, C9);
          Os(Ox, C0);
        })), Os(Ox, C0), C7 === Ox ? OS : C7;
      }, OQ = ['getMediaElement'], OJ = (OS, Ox, Oa, Ok) => {
        const Ow = Object.keys(Oa);
        ;
        ;
        Ow.forEach(Ou => {
          ;
          ;
          var On = Oa[Ou];
          -1 === OQ.indexOf(Ou) && ('function' == typeof On && 'Events' !== Ou ? OS[Ou] = Op(OS, Ox, Ou, Ow, Ok) : '_events' === Ou ? OS['_events'] = {} : Object.defineProperty(OS, Ou, {
            'enumerable': true,
            'get': () => Oa[Ou]
          }));
        });
      }, OK = window;
      Object.assign(Of, Oi);
      Object.assign(Oh, Oi), OD(Oh), 'function' == typeof OK.define && OK.define.amd && OK.define([], function () {
        return Oh;
      });
      let Ot = Oh;
      const OL = Ot = OK.jwplayer ? OK.jwplayer : Ot;
    },
    3487: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'MK': () => Oi,
        'Nq': () => Oq,
        'bX': () => OX
      });
      var OR = OI(7164);
      const Oi = OR.MK, Oq = OR.Nq, OX = function (Ol) {
        let Oz = (0, OR.bX)(Ol);
        ;
        ;
        if (Ol) {
          switch ((0, OR.Nq)(Ol)) {
            case 'jwpsrv':
              Oz = 305001;
              break;
            case 'googima':
              Oz = 305002;
              break;
            case 'vast':
              Oz = 305003;
              break;
            case 'freewheel':
              Oz = 305004;
              break;
            case 'dai':
              Oz = 305005;
              break;
            case 'gapro':
              Oz = 305006;
              break;
            case 'bidding':
              Oz = 305007;
          }
        }
        ;
        return Oz;
      };
    },
    1918: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'Gb': () => Od,
        'd3': () => Og,
        'lD': () => OU,
        'w0': () => Oz
      });
      ;
      ;
      var OR = OI(386);
      const Oi = [
        {
          'configName': 'clearkey',
          'keyName': 'org.w3.clearkey'
        },
        {
          'configName': 'widevine',
          'keyName': 'com.widevine.alpha'
        },
        {
          'configName': 'playready',
          'keyName': 'com.microsoft.playready'
        }
      ], Oq = [], OX = {};
      let Ol;
      ;
      const Oz = OE => OE.some(Ov => Boolean(Ov.drm) || Ov.sources.some(Oe => Boolean(Oe.drm))), OU = OE => Ol || ((Boolean(navigator.requestMediaKeySystemAccess) && Boolean(window.MediaKeySystemAccess.prototype.getConfiguration) || Boolean(window.MSMediaKeys)) && (0, OR.Z)(OE)('drm') ? (Oi.forEach(Ov => {
        ;
        Oe = Ov.keyName;
        ;
        ;
        var Oe, Ob = (navigator.requestMediaKeySystemAccess ? navigator.requestMediaKeySystemAccess(Oe, [{
          'initDataTypes': ['cenc'],
          'videoCapabilities': [{ 'contentType': 'video/mp4;codecs="avc1.4d401e"' }],
          'audioCapabilities': [{ 'contentType': 'audio/mp4;codecs="mp4a.40.2"' }]
        }]) : new Promise((OF, OP) => {
          let Oc;
          ;
          try {
            Oc = new window.MSMediaKeys(Oe);
          } catch (OY) {
            return void OP(OY);
          }
          OF(Oc);
        })).then(function () {
          ;
          OX[Ov.configName] = true;
        }).catch(function () {
          ;
          OX[Ov.configName] = false;
        });
        Oq.push(Ob);
      }), Ol = Promise.all(Oq)) : Promise.resolve()), Od = OE => OX[OE], Og = OE => {
        ;
        ;
        if (Ol) {
          return Object.keys(OE).some(Ov => Od(Ov));
        }
      };
    },
    2963: (OA, Oj, OI) => {
      'use strict';
      ;
      ;
      OI.d(Oj, { 'B': () => Od });
      var OR = OI(6593), Oi = OI(8348), Oq = OI(386), OX = OI(6042), Ol = OI(1918), Oz = OI(9025);
      const OU = (Og = ['video/mp4;codecs="avc1.4d400d,mp4a.40.2"']) => {
        ;
        ;
        const OE = window.MediaSource;
        ;
        return !(!OE || !OE.isTypeSupported) && (0, OX['$6'])(Og, Ov => OE.isTypeSupported(Ov));
      };
      {
        const Og = (0, OX.sE)(OR.B, (0, OX.wB)({ 'name': 'html5' })), OE = Og.supports;
        Og.supports = function (...Ov) {
          ;
          ;
          var [Oe, Ob] = Ov, Ov = OE.apply(this, Ov);
          ;
          if (Ov && Oe.drm && 'hls' === Oe.type) {
            const OF = (0, Oq.Z)(Ob)('drm');
            if (OF && Oe.drm.fairplay) {
              const OP = window.WebKitMediaKeys;
              return null == OP || null == OP.isTypeSupported ? void 0 : OP.isTypeSupported('com.apple.fps.1_0', 'video/mp4');
            }
            return OF;
          }
          return Ov;
        };
        OR.B.push({
          'name': 'shaka',
          'supports'(Ov) {
            ;
            ;
            ;
            return !(Ov.drm && !(0, Ol.d3)(Ov.drm)) && !(!window.HTMLVideoElement || !window.MediaSource) && OU(Ov.mediaTypes) && ('hls' === Ov.type || 'dash' === Ov.type || 'mpd' === Ov.type || -1 < (Ov.file || '').indexOf('mpd-time-csf'));
          }
        });
        OR.B.unshift({
          'name': 'hlsjs',
          'supports': Ov => {
            ;
            ;
            return !(Ov = Ov).drm && (Ob = -1 < Ov.file.indexOf('.m3u8'), Oe = 'hls' === Ov.type || 'm3u8' === Ov.type, Ob || Oe) && (Oe = !(Ob = Boolean(null == Oz.Z || null == Oz.Z.canPlayType ? void 0 : Oz.Z.canPlayType('application/vnd.apple.mpegURL'))) || Oi.OS.android || Oi.OS.tizen, Ob = Oi.Browser.safari && !Ob, OF = Oi.OS.android && false === Ov.hlsjsdefault, OP = Oi.Browser.safari && Boolean(Ov.safarihlsjs), OU(Ov.mediaTypes || ['video/mp4;codecs="avc1.4d400d,mp4a.40.2"'])) && (Oe || OP || Ob) && !OF;
            ;
            var Oe, Ob, OF, OP;
          }
        });
      }
      const Od = OR.B;
    },
    2303: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, { 'Z': () => OU });
      var OR = OI(2963), Oi = OI(12), Oq = OI(670), OX = OI(2894), Oj = {
        'html5': () => OI.e(250).then(function (Od) {
          var Og = OI(9181).default;
          ;
          return (0, Oq.Z)(Og), Og;
        }.bind(null, OI)).catch((0, OX.Ep)(152))
      };
      Object.assign(Oj, {
        'shaka': () => OI.e(371).then(function (Od) {
          var Og = OI(2287).default;
          ;
          return (0, Oq.Z)(Og), Og;
        }.bind(null, OI)).catch((0, OX.Ep)(154)),
        'hlsjs': () => OI.e(98).then(function (Od) {
          var Og = OI(9054).default;
          ;
          return (0, Oq.Z)(Og), Og;
        }.bind(null, OI)).catch((0, OX.Ep)(153))
      });
      function Ol(Od) {
        ;
        this.config = Od || {};
      }
      const Oz = Oj;
      Object.assign(Ol.prototype, {
        'load'(Od) {
          ;
          const Og = Oz[Od], OE = () => Promise.reject(new Error('Failed to load media'));
          ;
          return Og ? Og().then(() => {
            return Oi.U[Od] || OE();
          }) : OE();
        },
        'providerSupports': (Od, Og) => Od.supports(Og),
        'choose'(Od) {
          ;
          ;
          if (Od === Object(Od)) {
            var Og = OR.B.length;
            for (let Ov = 0; Ov < Og; Ov++) {
              var OE = OR.B[Ov];
              if (this.providerSupports(OE, Od)) {
                return {
                  'priority': Og - Ov - 1,
                  'name': OE.name,
                  'type': Od.type,
                  'providerToCheck': OE,
                  'provider': Oi.U[OE.name]
                };
              }
            }
          }
          return {};
        }
      });
      ;
      ;
      ;
      Oj = Ol;
      Oj.prototype.providerSupports = function (Od, Og) {
        ;
        ;
        return Od.supports(Og, this.config.edition);
      };
      const OU = Oj;
    },
    5140: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, { 't': () => OR });
      const OR = window.atob;
      window.btoa;
    },
    386: (OA, Oj, OI) => {
      'use strict';
      ;
      ;
      OI.d(Oj, {
        'Z': () => function (Oe) {
          const Ob = {
            'setup': [
              OR,
              'starter',
              Oq,
              OX,
              Ol,
              'developer',
              Od,
              Og,
              OE,
              OU
            ],
            'drm': [
              Ol,
              'developer',
              Od,
              Og,
              OE
            ],
            'ads': [
              Od,
              Og,
              OE,
              OU,
              Ol,
              'developer',
              Oq
            ],
            'jwpsrv': [
              OR,
              'starter',
              Oq,
              OX,
              Ol,
              'developer',
              Od,
              OE,
              OU,
              Ov
            ],
            'discovery': [
              Od,
              Ol,
              'developer',
              OE,
              Og
            ]
          };
          return function (OF) {
            return Ob[OF] && -1 < Ob[OF].indexOf(Oe);
          };
        }
      });
      ;
      const OR = 'free', Oq = 'business', OX = 'premium', Ol = 'enterprise', OU = 'platinum', Od = 'ads', Og = 'unlimited', OE = 'trial', Ov = 'invalid';
    },
    7010: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, {
        'Z': () => function () {
          ;
          return Oi(window, document.location.search);
        }
      });
      var OR = OI(5950);
      const Oi = function (Oq, OX) {
        ;
        ;
        return Oq.location !== Oq.parent.location && (0, OR.ke)(OX, 'isAMP');
      };
    },
    560: (OA, Oj, OI) => {
      'use strict';
      ;
      ;
      OI.d(Oj, { 'Z': () => Oi });
      ;
      const OR = () => OR['_iframe'], Oi = (OR.mock = Oq => {
        ;
        OR['_iframe'] = Oq;
      }, OR.unmock = () => {
        ;
        OR['_iframe'] = OR['_original'];
      }, OR['_iframe'] = window.top !== window.self, OR['_original'] = OR['_iframe'], OR);
    },
    6599: (OA, Oj, OI) => {
      'use strict';
      ;
      OI.d(Oj, {
        'ZP': () => OU,
        'u5': () => 100013
      });
      var OR = OI(5592), Oi = OI(386), Oq = OI(5140), OX = OI(4446);
      const Oz = 'invalid', OU = class {
        constructor(Od) {
          ;
          ;
          ;
          this.keyData = (Og => {
            let OE, Ov, Oe;
            ;
            ;
            ;
            try {
              var Ob = (0, OR.p)(Og || '', (0, Oq.t)('NDh2aU1Cb0NHRG5hcDFRZQ==')).split('/');
              if ('pro' === (OE = Ob[0]) && (OE = 'premium'), (0, Oi.Z)(OE)('setup') || (OE = Oz), 2 < Ob.length) {
                Ov = Ob[1];
                const OF = parseInt(Ob[2], 10);
                0 < OF && (Oe = new Date()).setTime(OF);
              }
            } catch (OP) {
              OE = Oz;
            }
            return {
              'edition': OE,
              'token': Ov,
              'expiration': Oe
            };
          })(Od);
          this.edition = function () {
            return this.keyData.edition;
          };
          this.token = function () {
            ;
            ;
            return this.keyData.token;
          };
          this.expiration = function () {
            ;
            return this.keyData.expiration;
          };
          this.duration = function () {
            ;
            ;
            ;
            return this.keyData.expiration ? this.keyData.expiration.getTime() - new Date().getTime() : 0;
          };
          this.error = function () {
            ;
            ;
            let Og;
            ;
            return void 0 === Od ? Og = 100011 : this.keyData.edition !== Oz && this.keyData.token ? this.duration() < 0 && (Og = 100013) : Og = 100012, Og ? new OX.rG(OX.pJ, Og) : null;
          };
        }
      };
    },
    67: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, { 'X': () => Oi });
      var OR = OI(560);
      const Oi = () => {
        let Oq = window.location.host;
        if ((0, OR.Z)()) {
          Oq = (document.referrer ? (OX = document.referrer, (Ol = document.createElement('a')).href = OX, Ol) : {}).host;
          try {
            Oq = Oq || window.top.location.host;
          } catch (Oz) {
          }
        }
        var OX, Ol;
        ;
        ;
        ;
        return Oq;
      };
    },
    5592: (OA, Oj, OI) => {
      'use strict';
      OI.d(Oj, { 'p': () => Oq });
      var OR = OI(5140);
      const Oi = OX => {
        ;
        ;
        var Ol = new Array(Math.ceil(OX.length / 4));
        ;
        for (let Oz = 0; Oz < Ol.length; Oz++) {
          Ol[Oz] = OX.charCodeAt(4 * Oz) + (OX.charCodeAt(4 * Oz + 1) << 8) + (OX.charCodeAt(4 * Oz + 2) << 16) + (OX.charCodeAt(4 * Oz + 3) << 24);
        }
        return Ol;
      }, Oq = function (OX, Ol) {
        if (OX = String(OX), Ol = String(Ol), 0 === OX.length) {
          return '';
        }
        var Oz = Oi((0, OR.t)(OX)), OU = Oi(unescape(encodeURIComponent(Ol)).slice(0, 16)), Od = Oz.length;
        ;
        ;
        let Og, OE, Ov = void Oz[Od - 1], Oe = Oz[0], Ob = 2654435769 * Math.floor(6 + 52 / Od);
        for (; Ob;) {
          OE = Ob >>> 2 & 3;
          for (let OF = Od - 1; 0 <= OF; OF--) {
            Og = ((Ov = Oz[0 < OF ? OF - 1 : Od - 1]) >>> 5 ^ Oe << 2) + (Oe >>> 3 ^ Ov << 4) ^ (Ob ^ Oe) + (OU[3 & OF ^ OE] ^ Ov);
            Oe = Oz[OF] -= Og;
          }
          Ob -= 2654435769;
        }
        OX = (OP => {
          var Oc = new Array(OP.length);
          ;
          for (let OY = 0; OY < OP.length; OY++) {
            Oc[OY] = String.fromCharCode(255 & OP[OY], OP[OY] >>> 8 & 255, OP[OY] >>> 16 & 255, OP[OY] >>> 24 & 255);
          }
          return Oc.join('');
        })(Oz).replace(/\0+$/, '');
        ;
        try {
          return decodeURIComponent(escape(OX));
        } catch (OP) {
          return OX;
        }
      };
    },
    1096: function (OA) {
      OA.exports = function () {
        'use strict';
        function Oj() {
        }
        function OI(OU) {
          ;
          ;
          if (!(this instanceof OI)) {
            throw new TypeError('Promises must be constructed via new');
          }
          if ('function' != typeof OU) {
            throw new TypeError('not a function');
          }
          this['_state'] = 0;
          this['_handled'] = false;
          this['_value'] = void 0;
          this['_deferreds'] = [];
          Ol(OU, this);
        }
        function OR(OU, Od) {
          ;
          for (; 3 === OU['_state'];) {
            OU = OU['_value'];
          }
          ;
          0 !== OU['_state'] ? (OU['_handled'] = true, OI['_immediateFn'](function () {
            ;
            ;
            ;
            var Og, OE = 1 === OU['_state'] ? Od.onFulfilled : Od.onRejected;
            if (null !== OE) {
              try {
                Og = OE(OU['_value']);
              } catch (Ov) {
                return void Oq(Od.promise, Ov);
              }
              Oi(Od.promise, Og);
            } else {
              (1 === OU['_state'] ? Oi : Oq)(Od.promise, OU['_value']);
            }
          })) : OU['_deferreds'].push(Od);
        }
        function Oi(OU, Od) {
          ;
          ;
          ;
          try {
            if (Od === OU) {
              throw new TypeError('A promise cannot be resolved with itself.');
            }
            if (Od && ('object' == typeof Od || 'function' == typeof Od)) {
              var Og = Od.then;
              if (Od instanceof OI) {
                return OU['_state'] = 3, OU['_value'] = Od, OX(OU);
              }
              if ('function' == typeof Og) {
                return Ol((OE = Og, Ov = Od, function () {
                  ;
                  OE.apply(Ov, arguments);
                }), OU);
              }
            }
            OU['_state'] = 1;
            OU['_value'] = Od;
            OX(OU);
          } catch (Oe) {
            Oq(OU, Oe);
          }
          var OE, Ov;
        }
        function Oq(OU, Od) {
          ;
          OU['_state'] = 2;
          OU['_value'] = Od;
          OX(OU);
        }
        function OX(OU) {
          2 === OU['_state'] && 0 === OU['_deferreds'].length && OI['_immediateFn'](function () {
            ;
            ;
            OU['_handled'] || OI['_unhandledRejectionFn'](OU['_value']);
          });
          for (var Od = 0, Og = OU['_deferreds'].length; Od < Og; Od++) {
            OR(OU, OU['_deferreds'][Od]);
          }
          ;
          ;
          ;
          OU['_deferreds'] = null;
        }
        function Ol(OU, Od) {
          var Og = false;
          try {
            OU(function (OE) {
              Og || (Og = true, Oi(Od, OE));
            }, function (OE) {
              Og || (Og = true, Oq(Od, OE));
            });
          } catch (OE) {
            Og || (Og = true, Oq(Od, OE));
          }
        }
        ;
        ;
        ;
        var Oz = setTimeout;
        return OI.prototype.catch = function (OU) {
          ;
          return this.then(null, OU);
        }, OI.prototype.then = function (OU, Od) {
          var Og = new this.constructor(Oj);
          return OR(this, new function (OE, Ov, Oe) {
            ;
            ;
            this.onFulfilled = 'function' == typeof OU ? OU : null;
            this.onRejected = 'function' == typeof Ov ? Ov : null;
            this.promise = Oe;
          }(0, Od, Og)), Og;
        }, OI.prototype.finally = function (OU) {
          ;
          ;
          var Od = this.constructor;
          return this.then(function (Og) {
            ;
            ;
            return Od.resolve(OU()).then(function () {
              return Og;
            });
          }, function (Og) {
            ;
            return Od.resolve(OU()).then(function () {
              ;
              return Od.reject(Og);
            });
          });
        }, OI.all = function (OU) {
          return new OI(function (Od, Og) {
            if (!OU || void 0 === OU.length) {
              throw new TypeError('Promise.all accepts an array');
            }
            ;
            ;
            ;
            var OE = Array.prototype.slice.call(OU);
            if (0 === OE.length) {
              return Od([]);
            }
            for (var Ov = OE.length, Oe = 0; OE.length > Oe; Oe++) {
              !function Ob(OF, OP) {
                ;
                ;
                try {
                  if (OP && ('object' == typeof OP || 'function' == typeof OP)) {
                    var Oc = OP.then;
                    if ('function' == typeof Oc) {
                      return Oc.call(OP, function (OY) {
                        Ob(OF, OY);
                      }, Og);
                    }
                  }
                  OE[OF] = OP;
                  0 == --Ov && Od(OE);
                } catch (OY) {
                  Og(OY);
                }
              }(Oe, OE[Oe]);
            }
          });
        }, OI.resolve = function (OU) {
          ;
          ;
          return OU && 'object' == typeof OU && OU.constructor === OI ? OU : new OI(function (Od) {
            Od(OU);
          });
        }, OI.reject = function (OU) {
          return new OI(function (Od, Og) {
            Og(OU);
          });
        }, OI.race = function (OU) {
          return new OI(function (Od, Og) {
            ;
            ;
            for (var OE = 0, Ov = OU.length; OE < Ov; OE++) {
              OU[OE].then(Od, Og);
            }
          });
        }, OI['_immediateFn'] = 'function' == typeof setImmediate ? function (OU) {
          setImmediate(OU);
        } : function (OU) {
          Oz(OU, 0);
        }, OI['_unhandledRejectionFn'] = function (OU) {
          void 0 !== console && console && console.warn('Possible Unhandled Promise Rejection:', OU);
        }, OI;
      }();
    },
    9563: OA => {
      var Oj, OI, OR = { OE: OR[OE] || {} }, Oi = {}, Oq = (Oj = function () {
        ;
        ;
        return document.head || document.getElementsByTagName('head')[0];
      }, function () {
        ;
        return OI = void 0 === OI ? Oj.apply(this, arguments) : OI;
      });
      function OX(Od, Og) {
        ;
        var OE, Ov, Oe = Oi[Od], Ob = (Oe = Oe || (Oi[Od] = {
          'element': (Od = Od, (Ov = document.createElement('style')).type = 'text/css', Ov.setAttribute('data-jwplayer-id', Od), Od = Ov, Oq().appendChild(Od), Ov),
          'counter': 0
        })).counter++, OF = Oe.element, OP = function () {
          OU(OF, Ob, '');
        };
        ;
        ;
        return (OE = function (Oc) {
          OU(OF, Ob, Oc);
        })(Og.css), function (Oc) {
          ;
          ;
          Oc ? Oc.css === Og.css && Oc.media === Og.media || OE((Og = Oc).css) : OP();
        };
      }
      ;
      OA.exports = {
        'style': function (Od, Og) {
          ;
          ;
          ;
          for (var OE = Og, Ov = function (OY) {
            ;
            for (var OM = [], OG = { Oo: OG[Oo].charAt(0).toUpperCase() + OG[Oo].slice(1) }, Oo = 0; Oo < OY.length; Oo++) {
              var OD = OY[Oo], Of = OD[0], OD = {
                'css': OD[1],
                'media': OD[2]
              };
              OG[Of] ? OG[Of].parts.push(OD) : OM.push(OG[Of] = {
                'id': Of,
                'parts': [OD]
              });
            }
            return OM;
          }(Od), Oe = 0; Oe < Ov.length; Oe++) {
            var Ob = Ov[Oe], OF = (OR[OE] || {})[Ob.id];
            if (OF) {
              for (var OP = 0; OP < OF.parts.length; OP++) {
                OF.parts[OP](Ob.parts[OP]);
              }
              for (; OP < Ob.parts.length; OP++) {
                OF.parts.push(OX(OE, Ob.parts[OP]));
              }
            } else {
              for (var Oc = [], OP = 0; OP < Ob.parts.length; OP++) {
                Oc.push(OX(OE, Ob.parts[OP]));
              }
              ;
              OR[OE][Ob.id] = {
                'id': Ob.id,
                'parts': Oc
              };
            }
          }
        },
        'clear': function (Od, Og) {
          ;
          ;
          ;
          var OE = OR[Od];
          if (OE) {
            if (Og) {
              var Ov = OE[Og];
              if (Ov) {
                for (var Oe = 0; Oe < Ov.parts.length; Oe += 1) {
                  Ov.parts[Oe]();
                }
              }
            } else {
              for (var Ob = Object.keys(OE), OF = 0; OF < Ob.length; OF += 1) {
                for (var OP = OE[Ob[OF]], Oc = 0; Oc < OP.parts.length; Oc += 1) {
                  OP.parts[Oc]();
                }
              }
              delete OR[Od];
            }
          }
        }
      };
      Ol = [];
      var Ol, Oz = function (Od, Og) {
        ;
        return Ol[Od] = Og, Ol.filter(Boolean).join('\n');
      };
      function OU(Od, Og, OE) {
        ;
        ;
        ;
        Od.styleSheet ? Od.styleSheet.cssText = Oz(Og, OE) : (OE = document.createTextNode(OE), (Og = Od.childNodes[Og]) ? Od.replaceChild(OE, Og) : Od.appendChild(OE));
      }
    },
    4737: OA => {
      ;
      OA.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 29.3" class="jw-svg-icon jw-svg-icon-watermark" focusable="false"><path d="M37,16.68c0,2.4-.59,3.43-2.4,3.43a5.75,5.75,0,0,1-3.38-1.23v3.58a7.39,7.39,0,0,0,3.67,1c3.67,0,5.73-1.91,5.73-6.32V5.86H37Z"></path><polygon points="58.33 17.61 55.39 6.01 52.55 6.01 49.52 17.61 46.73 6.01 43.06 6.01 47.56 23.29 50.89 23.29 53.92 11.88 56.96 23.29 60.24 23.29 64.74 6.01 61.17 6.01 58.33 17.61"></polygon><path d="M73.84,6H67.47V23.29h2.2v-6.9h4.17c3.47,0,5.77-1.77,5.77-5.19S77.31,6,73.84,6Zm0,8.47H69.72V8h4.12c2.3,0,3.57,1.22,3.62,3.28C77.46,13.21,76.19,14.48,73.84,14.48Z"></path><path d="M99.2,6l-6,15.27H85V6H82.8V23.29H94.7l2-5.19h7.09l2,5.19H108L101.26,6ZM97.39,16.14l2.84-7.39L103,16.14Z"></path><polygon points="113.98 14.18 108.99 6.01 106.59 6.01 112.81 16.14 112.81 23.29 115.01 23.29 115.01 16.14 121.33 6.01 118.98 6.01 113.98 14.18"></polygon><polygon points="123.14 23.29 134.1 23.29 134.1 21.28 125.29 21.28 125.29 15.41 133.32 15.41 133.32 13.45 125.29 13.45 125.29 7.97 134.1 7.97 134.1 6.01 123.14 6.01 123.14 23.29"></polygon><path d="M144.86,15.85c2.74-.39,4.41-2,4.41-4.85,0-3.23-2.26-5-5.73-5h-6.32V23.29h2.22V16h3.08l4.94,7.29H150Zm-5.42-1.71V8h4.06c2.3,0,3.62,1.17,3.62,3.08s-1.32,3.09-3.62,3.09Z"></path><path d="M27.63.09a1,1,0,0,0-1.32.48c-.24.51-6.35,15.3-6.35,15.3-.2.46-.33.41-.33-.07,0,0,0-5.15,0-9.39,0-2.31-1.12-3.61-2.73-3.88A3.12,3.12,0,0,0,14.83,3a4.57,4.57,0,0,0-1.5,1.79c-.48.94-3.47,9.66-3.47,9.66-.16.46-.31.44-.31,0,0,0-.09-3.76-.18-4.64-.13-1.36-.44-3.59-2.2-3.7S4.77,8,4.36,9.24c-.29.84-1.65,5.35-1.65,5.35l-.2.46h0c-.06.24-.17.24-.24,0l-.11-.42Q2,14,1.74,13.31a1.71,1.71,0,0,0-.33-.66.83.83,0,0,0-.88-.22.82.82,0,0,0-.53.69,4.22,4.22,0,0,0,.07.79,29,29,0,0,0,1,4.6,1.31,1.31,0,0,0,1.8.66,3.43,3.43,0,0,0,1.24-1.81c.33-.81,2-5.48,2-5.48.18-.46.31-.44.29,0,0,0-.09,4.57-.09,6.64a13.11,13.11,0,0,0,.28,2.93,2.41,2.41,0,0,0,.82,1.27,2,2,0,0,0,1.41.4,2,2,0,0,0,.7-.24,3.15,3.15,0,0,0,.79-.71,12.52,12.52,0,0,0,1.26-2.11c.81-1.6,2.92-6.58,2.92-6.58.2-.46.33-.41.33.07,0,0-.26,8.36-.26,11.55a6.39,6.39,0,0,0,.44,2.33,2.8,2.8,0,0,0,1.45,1.61A2.57,2.57,0,0,0,18.79,29a3.76,3.76,0,0,0,1.28-1.32,15.12,15.12,0,0,0,1.07-2.31c.64-1.65,1.17-3.33,1.7-5s5-17.65,5.28-19a1.79,1.79,0,0,0,0-.46A1,1,0,0,0,27.63.09Z"></path></svg>';
    }
  }, OO = {};
  ;
  ;
  ;
  function OC(OA) {
    ;
    var Oj = OO[OA];
    ;
    return void 0 !== Oj || (Oj = OO[OA] = {
      'id': OA,
      'loaded': false,
      'exports': {}
    }, O9[OA].call(Oj.exports, Oj, Oj.exports, OC), Oj.loaded = true), Oj.exports;
  }
  OC.m = O9;
  OC.n = OA => {
    ;
    var Oj = OA && OA['__esModule'] ? () => OA.default : () => OA;
    ;
    return OC.d(Oj, { 'a': Oj }), Oj;
  };
  OC.d = (OA, Oj) => {
    ;
    for (var OI in Oj)
      OC.o(Oj, OI) && !OC.o(OA, OI) && Object.defineProperty(OA, OI, {
        'enumerable': true,
        'get': Oj[OI]
      });
  };
  OC.f = {};
  OC.e = OA => Promise.all(Object.keys(OC.f).reduce((Oj, OI) => (OC.f[OI](OA, Oj), Oj), []));
  OC.u = OA => ({
    63: 'polyfills.webvtt',
    74: 'jwplayer.controls.tizen',
    98: 'provider.hlsjs',
    168: 'jwplayer.amp',
    207: 'jwplayer.core.controls.html5',
    250: 'provider.html5',
    347: 'vttparser',
    365: 'related',
    371: 'provider.shaka',
    493: 'jwplayer.core.controls.polyfills',
    520: 'provider.airplay',
    581: 'jwplayer.core.controls',
    605: 'jwplayer.core.controls.polyfills.html5',
    681: 'jwplayer.core',
    716: 'jwplayer.controls',
    926: 'jwplayer.stats',
    943: 'polyfills.intersection-observer',
    977: 'provider.cast'
  }[OA] + '.js');
  OC.o = (OA, Oj) => Object.prototype.hasOwnProperty.call(OA, Oj);
  O5 = {};
  O6 = 'jwplayer:';
  OC.l = (OA, Oj, OI, OR) => {
    ;
    ;
    ;
    if (O5[OA]) {
      O5[OA].push(Oj);
    } else {
      var Oi, Oq;
      if (void 0 !== OI) {
        for (var OX = document.getElementsByTagName('script'), Ol = 0; Ol < OX.length; Ol++) {
          var Oz = OX[Ol];
          if (Oz.getAttribute('src') == OA || Oz.getAttribute('data-webpack') == O6 + OI) {
            Oi = Oz;
            break;
          }
        }
      }
      Oi || (Oq = true, (Oi = document.createElement('script')).charset = 'utf-8', Oi.timeout = 55, OC.nc && Oi.setAttribute('nonce', OC.nc), Oi.setAttribute('data-webpack', O6 + OI), Oi.src = OA);
      O5[OA] = [Oj];
      var Oj = (Od, Og) => {
        ;
        ;
        ;
        clearTimeout(OU);
        var OE = O5[OA];
        if (delete O5[OA], Oi.parentNode && Oi.parentNode.removeChild(Oi), OE && OE.forEach(Ov => Ov(Og)), Od) {
          return Od(Og);
        }
      }, OU = setTimeout(Oj.bind(null, void 0, {
        'type': 'timeout',
        'target': Oi
      }), 55000);
      ;
      ;
      Oq && document.head.appendChild(Oi);
    }
  };
  OC.r = OA => {
    ;
    ;
    ;
    'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(OA, Symbol.toStringTag, { 'value': 'Module' });
    Object.defineProperty(OA, '__esModule', { 'value': true });
  };
  OC.nmd = OA => (OA.paths = [], OA.children || (OA.children = []), OA);
  OC.p = '';
  O7 = { 313: 0 };
  OC.f.j = (OA, Oj) => {
    var OI, OR, Oi = OC.o(O7, OA) ? O7[OA] : void 0;
    ;
    ;
    0 !== Oi && (Oi ? Oj.push(Oi[2]) : (OI = new Promise((Oq, OX) => Oi = O7[OA] = [
      Oq,
      OX
    ]), Oj.push(Oi[2] = OI), Oj = OC.p + OC.u(OA), OR = new Error(), OC.l(Oj, Oq => {
      ;
      ;
      var OX;
      ;
      OC.o(O7, OA) && (0 !== (Oi = O7[OA]) && (O7[OA] = void 0), Oi) && (OX = Oq && ('load' === Oq.type ? 'missing' : Oq.type), Oq = Oq && Oq.target && Oq.target.src, OR.message = 'Loading chunk ' + OA + ' failed.\n(' + OX + ': ' + Oq + ')', OR.name = 'ChunkLoadError', OR.type = OX, OR.request = Oq, Oi[1](OR));
    }, 'chunk-' + OA, OA)));
  };
  Or = (OA, Oj) => {
    var OI, OR, [Oi, Oq, OX] = Oj, Ol = 0;
    if (Oi.some(Oz => 0 !== O7[Oz])) {
      for (OI in Oq)
        OC.o(Oq, OI) && (OC.m[OI] = Oq[OI]);
      OX && OX(OC);
    }
    ;
    ;
    for (OA && OA(Oj); Ol < Oi.length; Ol++) {
      OR = Oi[Ol];
      OC.o(O7, OR) && O7[OR] && O7[OR][0]();
      O7[OR] = 0;
    }
  };
  (O8 = self.webpackChunkjwplayer = self.webpackChunkjwplayer || []).forEach(Or.bind(null, 0));
  O8.push = Or.bind(null, O8.push.bind(O8));
  OC.nc = void 0;
  var Or = OC(576);
  window.jwplayer = Or.default;
})();
var j = {
  'aspectratio': '16:9',
  'autostart': true,
  'cast': {},
  'controls': true,
  'displaydescription': true,
  'displaytitle': true,
  'height': 360,
  'key': 'Ddv5+E8F8mPhvWyzOwmoGzOhebHMDJbGOYdWx01Cyb3GAe2nhsNdVeM8cLFpIC4e',
  'mute': false,
  'ph': 1,
  'pid': 'KB5zFt7A',
  'playbackRateControls': false,
  'preload': 'metadata',
  'repeat': false,
  'stretching': 'uniform',
  'width': '100%'
}, I = (jwplayer.defaults = j, !function (O5, O6) {
  ;
  var O7, O8;
  ;
  ;
  'object' == typeof exports && 'undefined' != typeof module ? module.exports = O6() : 'function' == typeof define && define.amd ? define(O6) : (O5 = O5 || self, O7 = O5.Cookies, (O8 = O5.Cookies = O6()).noConflict = function () {
    ;
    return O5.Cookies = O7, O8;
  });
}(this, function () {
  'use strict';
  function O5(O7) {
    for (var O8 = 1; O8 < arguments.length; O8++) {
      var O9, OO = arguments[O8];
      for (O9 in OO)
        O7[O9] = OO[O9];
    }
    ;
    return O7;
  }
  var O6 = {
    'read': function (O7) {
      ;
      return O7.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    'write': function (O7) {
      ;
      return encodeURIComponent(O7).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
    }
  };
  return function O7(O8, O9) {
    ;
    function OO(OC, Or, OA) {
      ;
      ;
      ;
      if ('undefined' != typeof document) {
        'number' == typeof (OA = O5({}, O9, OA)).expires && (OA.expires = new Date(Date.now() + 86400000 * OA.expires));
        OA.expires && (OA.expires = OA.expires.toUTCString());
        OC = encodeURIComponent(OC).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
        Or = O8.write(Or, OC);
        var Oj, OI = '';
        for (Oj in OA)
          OA[Oj] && (OI += '; ' + Oj, true !== OA[Oj]) && (OI += '=' + OA[Oj].split(';')[0]);
        return document.cookie = OC + '=' + Or + OI;
      }
    }
    return Object.create({
      'set': OO,
      'get': function (OC) {
        ;
        ;
        ;
        if ('undefined' != typeof document && (!arguments.length || OC)) {
          for (var Or = document.cookie ? document.cookie.split('; ') : [], OA = {}, Oj = 0; Oj < Or.length; Oj++) {
            var OI = Or[Oj].split('='), OR = OI.slice(1).join('=');
            '"' === OR[0] && (OR = OR.slice(1, -1));
            try {
              var Oi = O6.read(OI[0]);
              if (OA[Oi] = O8.read(OR, Oi), OC === Oi) {
                break;
              }
            } catch (Oq) {
            }
          }
          return OC ? OA[OC] : OA;
        }
      },
      'remove': function (OC, Or) {
        OO(OC, '', O5({}, Or, { 'expires': -1 }));
      },
      'withAttributes': function (OC) {
        ;
        return O7(this.converter, O5({}, this.attributes, OC));
      },
      'withConverter': function (OC) {
        ;
        return O7(O5({}, this.converter, OC), this.attributes);
      }
    }, {
      'attributes': { 'value': Object.freeze(O9) },
      'converter': { 'value': Object.freeze(O8) }
    });
  }(O6, { 'path': '/' });
}), !function (O5) {
  (function () {
    ;
    if ('undefined' != typeof module && module.exports) {
      return function (O6) {
        module.exports = O6();
      };
    }
    ;
    if ('function' == typeof define && define.amd) {
      return define;
    }
    ;
    if ('undefined' != typeof window) {
      return function (O6) {
        ;
        window.MobileDetect = O6();
      };
    }
    throw new Error('unknown environment');
  }()(function () {
    'use strict';
    ;
    function O6(Ol, Oz) {
      ;
      return null != Ol && null != Oz && Ol.toLowerCase() === Oz.toLowerCase();
    }
    function O7(Ol, Oz) {
      ;
      var OU, Od, Og = Ol.length;
      if (Og && Oz) {
        for (OU = Oz.toLowerCase(), Od = 0; Od < Og; ++Od) {
          if (OU === Ol[Od].toLowerCase()) {
            return true;
          }
        }
      }
      ;
      return false;
    }
    function O8(Ol) {
      ;
      for (var Oz in Ol)
        Oi.call(Ol, Oz) && (Ol[Oz] = new RegExp(Ol[Oz], 'i'));
    }
    function O9(Ol, Oz) {
      ;
      this.ua = (Ol || '').substr(0, 500);
      this['_cache'] = {};
      this.maxPhoneWidth = Oz || 600;
    }
    var OO, OC, Or, OA, Oj, OI, OR = {
      'mobileDetectRules': {
        'phones': {
          'iPhone': '\\biPhone\\b|\\biPod\\b',
          'BlackBerry': 'BlackBerry|\\bBB10\\b|rim[0-9]+|\\b(BBA100|BBB100|BBD100|BBE100|BBF100|STH100)\\b-[0-9]+',
          'HTC': 'HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m|Android [0-9.]+; Pixel',
          'Nexus': 'Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6',
          'Dell': 'Dell[;]? (Streak|Aero|Venue|Venue Pro|Flash|Smoke|Mini 3iX)|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b',
          'Motorola': 'Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b|XT1068|XT1092|XT1052',
          'Samsung': '\\bSamsung\\b|SM-G950F|SM-G955F|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350|SM-J120F|SM-G920F|SM-G920V|SM-G930F|SM-N910C|SM-A310F|GT-I9190|SM-J500FN|SM-G903F|SM-J330F',
          'LG': '\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323|M257)|LM-G710',
          'Sony': 'SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533',
          'Asus': 'Asus.*Galaxy|PadFone.*Mobile',
          'NokiaLumia': 'Lumia [0-9]{3,4}',
          'Micromax': 'Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b',
          'Palm': 'PalmSource|Palm',
          'Vertu': 'Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature',
          'Pantech': 'PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790',
          'Fly': 'IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250',
          'Wiko': 'KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA(?!nna)|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM',
          'iMobile': 'i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)',
          'SimValley': '\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b',
          'Wolfgang': 'AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q',
          'Alcatel': 'Alcatel',
          'Nintendo': 'Nintendo (3DS|Switch)',
          'Amoi': 'Amoi',
          'INQ': 'INQ',
          'OnePlus': 'ONEPLUS',
          'GenericPhone': 'Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser'
        },
        'tablets': {
          'iPad': 'iPad|iPad.*Mobile',
          'NexusTablet': 'Android.*Nexus[\\s]+(7|9|10)',
          'GoogleTablet': 'Android.*Pixel C',
          'SamsungTablet': 'SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-T116BU|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561|SM-T713|SM-T719|SM-T813|SM-T819|SM-T580|SM-T355Y?|SM-T280|SM-T817A|SM-T820|SM-W700|SM-P580|SM-T587|SM-P350|SM-P555M|SM-P355M|SM-T113NU|SM-T815Y|SM-T585|SM-T285|SM-T825|SM-W708|SM-T835|SM-T830|SM-T837V|SM-T720|SM-T510|SM-T387V',
          'Kindle': 'Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI|KFARWI|KFFOWI|KFGIWI|KFMEWI)\\b|Android.*Silk/[0-9.]+ like Chrome/[0-9.]+ (?!Mobile)',
          'SurfaceTablet': 'Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)',
          'HPTablet': 'HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10',
          'AsusTablet': '^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K011 | K017 | K01E |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C|P01Y|PO1MA|P01Z|\\bP027\\b|\\bP024\\b|\\bP00C\\b',
          'BlackBerryTablet': 'PlayBook|RIM Tablet',
          'HTCtablet': 'HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410',
          'MotorolaTablet': 'xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617',
          'NookTablet': 'Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2',
          'AcerTablet': 'Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b|\\bA3-A20\\b|\\bA3-A30',
          'ToshibaTablet': 'Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO',
          'LGTablet': '\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b',
          'FujitsuTablet': 'Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b',
          'PrestigioTablet': 'PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002',
          'LenovoTablet': 'Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|YT3-850M|YT3-X90L|YT3-X90F|YT3-X90X|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)|TB-X103F|TB-X304X|TB-X304F|TB-X304L|TB-X505F|TB-X505L|TB-X505X|TB-X605F|TB-X605L|TB-8703F|TB-8703X|TB-8703N|TB-8704N|TB-8704F|TB-8704X|TB-8704V|TB-7304F|TB-7304I|TB-7304X|Tab2A7-10F|Tab2A7-20F|TB2-X30L|YT3-X50L|YT3-X50F|YT3-X50M|YT-X705F|YT-X703F|YT-X703L|YT-X705L|YT-X705X|TB2-X30F|TB2-X30L|TB2-X30M|A2107A-F|A2107A-H|TB3-730F|TB3-730M|TB3-730X|TB-7504F|TB-7504X',
          'DellTablet': 'Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7',
          'YarvikTablet': 'Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b',
          'MedionTablet': 'Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB',
          'ArnovaTablet': '97G4|AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2',
          'IntensoTablet': 'INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004',
          'IRUTablet': 'M702pro',
          'MegafonTablet': 'MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b',
          'EbodaTablet': 'E-Boda (Supreme|Impresspeed|Izzycomm|Essential)',
          'AllViewTablet': 'Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)',
          'ArchosTablet': '\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|c|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b',
          'AinolTablet': 'NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark',
          'NokiaLumiaTablet': 'Lumia 2520',
          'SonyTablet': 'Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP641|SGP612|SOT31|SGP771|SGP611|SGP612|SGP712',
          'PhilipsTablet': '\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b',
          'CubeTablet': 'Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT',
          'CobyTablet': 'MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010',
          'MIDTablet': 'M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10',
          'MSITablet': 'MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b',
          'SMiTTablet': 'Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)',
          'RockChipTablet': 'Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A',
          'FlyTablet': 'IQ310|Fly Vision',
          'bqTablet': 'Android.*(bq)?.*\\b(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris ([E|M]10|M8))\\b|Maxwell.*Lite|Maxwell.*Plus',
          'HuaweiTablet': 'MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim|M2-A01L|BAH-L09|BAH-W09|AGS-L09|CMR-AL19',
          'NecTablet': '\\bN-06D|\\bN-08D',
          'PantechTablet': 'Pantech.*P4100',
          'BronchoTablet': 'Broncho.*(N701|N708|N802|a710)',
          'VersusTablet': 'TOUCHPAD.*[78910]|\\bTOUCHTAB\\b',
          'ZyncTablet': 'z1000|Z99 2G|z930|z990|z909|Z919|z900',
          'PositivoTablet': 'TB07STA|TB10STA|TB07FTA|TB10FTA',
          'NabiTablet': 'Android.*\\bNabi',
          'KoboTablet': 'Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build',
          'DanewTablet': 'DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b',
          'TexetTablet': 'NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE',
          'PlaystationTablet': 'Playstation.*(Portable|Vita)',
          'TrekstorTablet': 'ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab',
          'PyleAudioTablet': '\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b',
          'AdvanTablet': 'Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ',
          'DanyTechTablet': 'Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1',
          'GalapadTablet': 'Android.*\\bG1\\b(?!\\))',
          'MicromaxTablet': 'Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b',
          'KarbonnTablet': 'Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b',
          'AllFineTablet': 'Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide',
          'PROSCANTablet': '\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b',
          'YONESTablet': 'BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026',
          'ChangJiaTablet': 'TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503',
          'GUTablet': 'TX-A1301|TX-M9002|Q702|kf026',
          'PointOfViewTablet': 'TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10',
          'OvermaxTablet': 'OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)|Qualcore 1027',
          'HCLTablet': 'HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync',
          'DPSTablet': 'DPS Dream 9|DPS Dual 7',
          'VistureTablet': 'V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10',
          'CrestaTablet': 'CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989',
          'MediatekTablet': '\\bMT8125|MT8389|MT8135|MT8377\\b',
          'ConcordeTablet': 'Concorde([ ]+)?Tab|ConCorde ReadMan',
          'GoCleverTablet': 'GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042',
          'ModecomTablet': 'FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003',
          'VoninoTablet': '\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b',
          'ECSTablet': 'V07OT2|TM105A|S10OT1|TR10CS1',
          'StorexTablet': 'eZee[_\']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab',
          'VodafoneTablet': 'SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7|VF-1497|VFD 1400',
          'EssentielBTablet': 'Smart[ \']?TAB[ ]+?[0-9]+|Family[ \']?TAB2',
          'RossMoorTablet': 'RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711',
          'iMobileTablet': 'i-mobile i-note',
          'TolinoTablet': 'tolino tab [0-9.]+|tolino shine',
          'AudioSonicTablet': '\\bC-22Q|T7-QC|T-17B|T-17P\\b',
          'AMPETablet': 'Android.* A78 ',
          'SkkTablet': 'Android.* (SKYPAD|PHOENIX|CYCLOPS)',
          'TecnoTablet': 'TECNO P9|TECNO DP8D',
          'JXDTablet': 'Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b',
          'iJoyTablet': 'Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)',
          'FX2Tablet': 'FX2 PAD7|FX2 PAD10',
          'XoroTablet': 'KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151',
          'ViewsonicTablet': 'ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a',
          'VerizonTablet': 'QTAQZ3|QTAIR7|QTAQTZ3|QTASUN1|QTASUN2|QTAXIA1',
          'OdysTablet': 'LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10',
          'CaptivaTablet': 'CAPTIVA PAD',
          'IconbitTablet': 'NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S',
          'TeclastTablet': 'T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi',
          'OndaTablet': '\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+|V10 \\b4G\\b',
          'JaytechTablet': 'TPC-PA762',
          'BlaupunktTablet': 'Endeavour 800NG|Endeavour 1010',
          'DigmaTablet': '\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b',
          'EvolioTablet': 'ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b',
          'LavaTablet': 'QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b',
          'AocTablet': 'MW0811|MW0812|MW0922|MTK8382|MW1031|MW0831|MW0821|MW0931|MW0712',
          'MpmanTablet': 'MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010',
          'CelkonTablet': 'CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b',
          'WolderTablet': 'miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b',
          'MediacomTablet': 'M-MPI10C3G|M-SP10EG|M-SP10EGP|M-SP10HXAH|M-SP7HXAH|M-SP10HXBH|M-SP8HXAH|M-SP8MXA',
          'MiTablet': '\\bMI PAD\\b|\\bHM NOTE 1W\\b',
          'NibiruTablet': 'Nibiru M1|Nibiru Jupiter One',
          'NexoTablet': 'NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI',
          'LeaderTablet': 'TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100',
          'UbislateTablet': 'UbiSlate[\\s]?7C',
          'PocketBookTablet': 'Pocketbook',
          'KocasoTablet': '\\b(TB-1207)\\b',
          'HisenseTablet': '\\b(F5281|E2371)\\b',
          'Hudl': 'Hudl HT7S3|Hudl 2',
          'TelstraTablet': 'T-Hub2',
          'GenericTablet': 'Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bTP750\\b|\\bQTAQZ3\\b|WVT101|TM1088|KT107'
        },
        'oss': {
          'AndroidOS': 'Android',
          'BlackBerryOS': 'blackberry|\\bBB10\\b|rim tablet os',
          'PalmOS': 'PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino',
          'SymbianOS': 'Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b',
          'WindowsMobileOS': 'Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Windows Mobile|Windows Phone [0-9.]+|WCE;',
          'WindowsPhoneOS': 'Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;',
          'iOS': '\\biPhone.*Mobile|\\biPod|\\biPad|AppleCoreMedia',
          'iPadOS': 'CPU OS 13',
          'MeeGoOS': 'MeeGo',
          'MaemoOS': 'Maemo',
          'JavaOS': 'J2ME/|\\bMIDP\\b|\\bCLDC\\b',
          'webOS': 'webOS|hpwOS',
          'badaOS': '\\bBada\\b',
          'BREWOS': 'BREW'
        },
        'uas': {
          'Chrome': '\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?',
          'Dolfin': '\\bDolfin\\b',
          'Opera': 'Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+$|Coast/[0-9.]+',
          'Skyfire': 'Skyfire',
          'Edge': 'Mobile Safari/[.0-9]* Edge',
          'IE': 'IEMobile|MSIEMobile',
          'Firefox': 'fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS',
          'Bolt': 'bolt',
          'TeaShark': 'teashark',
          'Blazer': 'Blazer',
          'Safari': 'Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari',
          'WeChat': '\\bMicroMessenger\\b',
          'UCBrowser': 'UC.*Browser|UCWEB',
          'baiduboxapp': 'baiduboxapp',
          'baidubrowser': 'baidubrowser',
          'DiigoBrowser': 'DiigoBrowser',
          'Mercury': '\\bMercury\\b',
          'ObigoBrowser': 'Obigo',
          'NetFront': 'NF-Browser',
          'GenericBrowser': 'NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger',
          'PaleMoon': 'Android.*PaleMoon|Mobile.*PaleMoon'
        },
        'props': {
          'Mobile': 'Mobile/[VER]',
          'Build': 'Build/[VER]',
          'Version': 'Version/[VER]',
          'VendorID': 'VendorID/[VER]',
          'iPad': 'iPad.*CPU[a-z ]+[VER]',
          'iPhone': 'iPhone.*CPU[a-z ]+[VER]',
          'iPod': 'iPod.*CPU[a-z ]+[VER]',
          'Kindle': 'Kindle/[VER]',
          'Chrome': [
            'Chrome/[VER]',
            'CriOS/[VER]',
            'CrMo/[VER]'
          ],
          'Coast': ['Coast/[VER]'],
          'Dolfin': 'Dolfin/[VER]',
          'Firefox': [
            'Firefox/[VER]',
            'FxiOS/[VER]'
          ],
          'Fennec': 'Fennec/[VER]',
          'Edge': 'Edge/[VER]',
          'IE': [
            'IEMobile/[VER];',
            'IEMobile [VER]',
            'MSIE [VER];',
            'Trident/[0-9.]+;.*rv:[VER]'
          ],
          'NetFront': 'NetFront/[VER]',
          'NokiaBrowser': 'NokiaBrowser/[VER]',
          'Opera': [
            ' OPR/[VER]',
            'Opera Mini/[VER]',
            'Version/[VER]'
          ],
          'Opera Mini': 'Opera Mini/[VER]',
          'Opera Mobi': 'Version/[VER]',
          'UCBrowser': [
            'UCWEB[VER]',
            'UC.*Browser/[VER]'
          ],
          'MQQBrowser': 'MQQBrowser/[VER]',
          'MicroMessenger': 'MicroMessenger/[VER]',
          'baiduboxapp': 'baiduboxapp/[VER]',
          'baidubrowser': 'baidubrowser/[VER]',
          'SamsungBrowser': 'SamsungBrowser/[VER]',
          'Iron': 'Iron/[VER]',
          'Safari': [
            'Version/[VER]',
            'Safari/[VER]'
          ],
          'Skyfire': 'Skyfire/[VER]',
          'Tizen': 'Tizen/[VER]',
          'Webkit': 'webkit[ /][VER]',
          'PaleMoon': 'PaleMoon/[VER]',
          'Gecko': 'Gecko/[VER]',
          'Trident': 'Trident/[VER]',
          'Presto': 'Presto/[VER]',
          'Goanna': 'Goanna/[VER]',
          'iOS': ' \\bi?OS\\b [VER][ ;]{1}',
          'Android': 'Android [VER]',
          'BlackBerry': [
            'BlackBerry[\\w]+/[VER]',
            'BlackBerry.*Version/[VER]',
            'Version/[VER]'
          ],
          'BREW': 'BREW [VER]',
          'Java': 'Java/[VER]',
          'Windows Phone OS': [
            'Windows Phone OS [VER]',
            'Windows Phone [VER]'
          ],
          'Windows Phone': 'Windows Phone [VER]',
          'Windows CE': 'Windows CE/[VER]',
          'Windows NT': 'Windows NT [VER]',
          'Symbian': [
            'SymbianOS/[VER]',
            'Symbian/[VER]'
          ],
          'webOS': [
            'webOS/[VER]',
            'hpwOS/[VER];'
          ]
        },
        'utils': {
          'Bot': 'Googlebot|facebookexternalhit|Google-AMPHTML|s~amp-validator|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|YandexMobileBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom|contentkingapp',
          'MobileBot': 'Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2',
          'DesktopMode': 'WPDesktop',
          'TV': 'SonyDTV|HbbTV',
          'WebKit': '(webkit)[ /]([\\w.]+)',
          'Console': '\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|Nintendo Switch|PLAYSTATION|Xbox)\\b',
          'Watch': 'SM-V700'
        }
      },
      'detectMobileBrowsers': {
        'fullPattern': /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        'shortPattern': /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        'tabletPattern': /android|ipad|playbook|silk/i
      }
    }, Oi = Object.prototype.hasOwnProperty, Oq = (OR.FALLBACK_PHONE = 'UnknownPhone', OR.FALLBACK_TABLET = 'UnknownTablet', OR.FALLBACK_MOBILE = 'UnknownMobile', 'isArray' in Array ? Array.isArray : function (Ol) {
      ;
      ;
      return '[object Array]' === Object.prototype.toString.call(Ol);
    }), OX = OR.mobileDetectRules;
    ;
    ;
    for (OO in OX.props)
      if (Oi.call(OX.props, OO)) {
        for (OC = OX.props[OO], Oj = (OC = Oq(OC) ? OC : [OC]).length, OA = 0; OA < Oj; ++OA) {
          0 <= (OI = (Or = OC[OA]).indexOf('[VER]')) && (Or = Or.substring(0, OI) + '([\\w._\\+]+)' + Or.substring(OI + 5));
          OC[OA] = new RegExp(Or, 'i');
        }
        OX.props[OO] = OC;
      }
    return O8(OX.oss), O8(OX.phones), O8(OX.tablets), O8(OX.uas), O8(OX.utils), OX.oss0 = {
      'WindowsPhoneOS': OX.oss.WindowsPhoneOS,
      'WindowsMobileOS': OX.oss.WindowsMobileOS
    }, OR.findMatch = function (Ol, Oz) {
      for (var OU in Ol)
        if (Oi.call(Ol, OU) && Ol[OU].test(Oz)) {
          return OU;
        }
      ;
      return null;
    }, OR.findMatches = function (Ol, Oz) {
      var OU, Od = [];
      for (OU in Ol)
        Oi.call(Ol, OU) && Ol[OU].test(Oz) && Od.push(OU);
      ;
      return Od;
    }, OR.getVersionStr = function (Ol, Oz) {
      var OU, Od, Og, OE, Ov = OR.mobileDetectRules.props;
      ;
      ;
      if (Oi.call(Ov, Ol)) {
        for (Og = (OU = Ov[Ol]).length, Od = 0; Od < Og; ++Od) {
          if (null !== (OE = OU[Od].exec(Oz))) {
            return OE[1];
          }
        }
      }
      return null;
    }, OR.getVersion = function (Ol, Oz) {
      ;
      ;
      return Ol = OR.getVersionStr(Ol, Oz), Ol ? OR.prepareVersionNo(Ol) : NaN;
    }, OR.prepareVersionNo = function (Ol) {
      var Oz = Ol.split(/[a-z._ \/\-]/i);
      ;
      ;
      ;
      return 1 === Oz.length && (Ol = Oz[0]), 1 < Oz.length && (Ol = Oz[0] + '.', Oz.shift(), Ol += Oz.join('')), Number(Ol);
    }, OR.isMobileFallback = function (Ol) {
      ;
      ;
      ;
      return OR.detectMobileBrowsers.fullPattern.test(Ol) || OR.detectMobileBrowsers.shortPattern.test(Ol.substr(0, 4));
    }, OR.isTabletFallback = function (Ol) {
      ;
      return OR.detectMobileBrowsers.tabletPattern.test(Ol);
    }, OR.prepareDetectionCache = function (Ol, Oz, OU) {
      ;
      var Od;
      ;
      ;
      if (Ol.mobile === O5) {
        return (Od = OR.findMatch(OR.mobileDetectRules.tablets, Oz)) ? (Ol.mobile = Ol.tablet = Od, void (Ol.phone = null)) : (Od = OR.findMatch(OR.mobileDetectRules.phones, Oz)) ? (Ol.mobile = Ol.phone = Od, void (Ol.tablet = null)) : void (OR.isMobileFallback(Oz) ? (Od = O9.isPhoneSized(OU)) === O5 ? (Ol.mobile = OR.FALLBACK_MOBILE, Ol.tablet = Ol.phone = null) : Od ? (Ol.mobile = Ol.phone = OR.FALLBACK_PHONE, Ol.tablet = null) : (Ol.mobile = Ol.tablet = OR.FALLBACK_TABLET, Ol.phone = null) : OR.isTabletFallback(Oz) ? (Ol.mobile = Ol.tablet = OR.FALLBACK_TABLET, Ol.phone = null) : Ol.mobile = Ol.tablet = Ol.phone = null);
      }
    }, OR.mobileGrade = function (Ol) {
      ;
      ;
      ;
      var Oz = null !== Ol.mobile();
      return Ol.os('iOS') && 4.3 <= Ol.version('iPad') || Ol.os('iOS') && 3.1 <= Ol.version('iPhone') || Ol.os('iOS') && 3.1 <= Ol.version('iPod') || 2.1 < Ol.version('Android') && Ol.is('Webkit') || 7 <= Ol.version('Windows Phone OS') || Ol.is('BlackBerry') && 6 <= Ol.version('BlackBerry') || Ol.match('Playbook.*Tablet') || 1.4 <= Ol.version('webOS') && Ol.match('Palm|Pre|Pixi') || Ol.match('hp.*TouchPad') || Ol.is('Firefox') && 12 <= Ol.version('Firefox') || Ol.is('Chrome') && Ol.is('AndroidOS') && 4 <= Ol.version('Android') || Ol.is('Skyfire') && 4.1 <= Ol.version('Skyfire') && Ol.is('AndroidOS') && 2.3 <= Ol.version('Android') || Ol.is('Opera') && 11 < Ol.version('Opera Mobi') && Ol.is('AndroidOS') || Ol.is('MeeGoOS') || Ol.is('Tizen') || Ol.is('Dolfin') && 2 <= Ol.version('Bada') || (Ol.is('UC Browser') || Ol.is('Dolfin')) && 2.3 <= Ol.version('Android') || Ol.match('Kindle Fire') || Ol.is('Kindle') && 3 <= Ol.version('Kindle') || Ol.is('AndroidOS') && Ol.is('NookTablet') || 11 <= Ol.version('Chrome') && !Oz || 5 <= Ol.version('Safari') && !Oz || 4 <= Ol.version('Firefox') && !Oz || 7 <= Ol.version('MSIE') && !Oz || 10 <= Ol.version('Opera') && !Oz ? 'A' : Ol.os('iOS') && Ol.version('iPad') < 4.3 || Ol.os('iOS') && Ol.version('iPhone') < 3.1 || Ol.os('iOS') && Ol.version('iPod') < 3.1 || Ol.is('Blackberry') && 5 <= Ol.version('BlackBerry') && Ol.version('BlackBerry') < 6 || 5 <= Ol.version('Opera Mini') && Ol.version('Opera Mini') <= 6.5 && (2.3 <= Ol.version('Android') || Ol.is('iOS')) || Ol.match('NokiaN8|NokiaC7|N97.*Series60|Symbian/3') || 11 <= Ol.version('Opera Mobi') && Ol.is('SymbianOS') ? 'B' : (Ol.version('BlackBerry') < 5 || Ol.match('MSIEMobile|Windows CE.*Mobile') || Ol.version('Windows Mobile'), 'C');
    }, OR.detectOS = function (Ol) {
      ;
      ;
      ;
      return OR.findMatch(OR.mobileDetectRules.oss0, Ol) || OR.findMatch(OR.mobileDetectRules.oss, Ol);
    }, OR.getDeviceSmallerSide = function () {
      ;
      ;
      ;
      return window.screen.width < window.screen.height ? window.screen.width : window.screen.height;
    }, O9.prototype = {
      'constructor': O9,
      'mobile': function () {
        ;
        return OR.prepareDetectionCache(this['_cache'], this.ua, this.maxPhoneWidth), this['_cache'].mobile;
      },
      'phone': function () {
        ;
        ;
        ;
        return OR.prepareDetectionCache(this['_cache'], this.ua, this.maxPhoneWidth), this['_cache'].phone;
      },
      'tablet': function () {
        ;
        ;
        return OR.prepareDetectionCache(this['_cache'], this.ua, this.maxPhoneWidth), this['_cache'].tablet;
      },
      'userAgent': function () {
        ;
        ;
        ;
        return this['_cache'].userAgent === O5 && (this['_cache'].userAgent = OR.findMatch(OR.mobileDetectRules.uas, this.ua)), this['_cache'].userAgent;
      },
      'userAgents': function () {
        ;
        ;
        ;
        return this['_cache'].userAgents === O5 && (this['_cache'].userAgents = OR.findMatches(OR.mobileDetectRules.uas, this.ua)), this['_cache'].userAgents;
      },
      'os': function () {
        ;
        ;
        return this['_cache'].os === O5 && (this['_cache'].os = OR.detectOS(this.ua)), this['_cache'].os;
      },
      'version': function (Ol) {
        return OR.getVersion(Ol, this.ua);
      },
      'versionStr': function (Ol) {
        ;
        return OR.getVersionStr(Ol, this.ua);
      },
      'is': function (Ol) {
        ;
        ;
        return O7(this.userAgents(), Ol) || O6(Ol, this.os()) || O6(Ol, this.phone()) || O6(Ol, this.tablet()) || O7(OR.findMatches(OR.mobileDetectRules.utils, this.ua), Ol);
      },
      'match': function (Ol) {
        ;
        return (Ol = Ol instanceof RegExp ? Ol : new RegExp(Ol, 'i')).test(this.ua);
      },
      'isPhoneSized': function (Ol) {
        ;
        ;
        return O9.isPhoneSized(Ol || this.maxPhoneWidth);
      },
      'mobileGrade': function () {
        ;
        ;
        ;
        return this['_cache'].grade === O5 && (this['_cache'].grade = OR.mobileGrade(this)), this['_cache'].grade;
      }
    }, 'undefined' != typeof window && window.screen ? O9.isPhoneSized = function (Ol) {
      ;
      return Ol < 0 ? O5 : OR.getDeviceSmallerSide() <= Ol;
    } : O9.isPhoneSized = function () {
    }, O9['_impl'] = OR, O9.version = '1.4.4 2019-09-21', O9;
  }));
}(), !function (O5, O6) {
  ;
  ;
  'object' == typeof exports ? module.exports = exports = O6() : 'function' == typeof define && define.amd ? define([], O6) : O5.CryptoJS = O6();
}(this, function () {
  var O5, O6, O7, O8, O9, OO, OC, Or, OA, Oj, OI, OR, Oi, Oq, OX, Ol, Oz, OU, Od, Og, OE, Ov, Ob, OF, OP, Oc, OY, OM, OG, Oo, OD, Of, ON, Om, OW, OB, Oy, OV, OH, Oh, OZ, OT, Os, Op, OQ = function (rX) {
    var rl;
    if ('undefined' != typeof window && window.crypto && (rl = window.crypto), 'undefined' != typeof self && self.crypto && (rl = self.crypto), !(rl = !(rl = !(rl = 'undefined' != typeof globalThis && globalThis.crypto ? globalThis.crypto : rl) && 'undefined' != typeof window && window.msCrypto ? window.msCrypto : rl) && 'undefined' != typeof global && global.crypto ? global.crypto : rl) && 'function' == typeof require) {
      try {
        rl = require('crypto');
      } catch (rG) {
      }
    }
    var rz = Object.create || function (ro) {
      ;
      ;
      return rU.prototype = ro, ro = new rU(), rU.prototype = null, ro;
    };
    ;
    ;
    ;
    function rU() {
    }
    var rd = {
      high: rY + rs + (rM >>> 0 < rp >>> 0 ? 1 : 0),
      rg: 16711935 & (rE << 8 | rE >>> 24) | 4278255360 & (rE << 24 | rE >>> 8),
      rE: 1549556828,
      rz: rU[rz + 4 & 7]
    }, rg = rd.lib = {}, rE = rg.Base = {
      'extend': function (ro) {
        ;
        ;
        var rD = rz(this);
        return ro && rD.mixIn(ro), rD.hasOwnProperty('init') && this.init !== rD.init || (rD.init = function () {
          ;
          ;
          ;
          rD['$super'].init.apply(this, arguments);
        }), (rD.init.prototype = rD)['$super'] = this, rD;
      },
      'create': function () {
        var ro = this.extend();
        ;
        ;
        return ro.init.apply(ro, arguments), ro;
      },
      'init': function () {
      },
      'mixIn': function (ro) {
        ;
        for (var rD in ro)
          ro.hasOwnProperty(rD) && (this[rD] = ro[rD]);
        ro.hasOwnProperty('toString') && (this.toString = ro.toString);
      },
      'clone': function () {
        ;
        ;
        return this.init.prototype.extend(this);
      }
    }, rv = rg.WordArray = rE.extend({
      'init': function (ro, rD) {
        ;
        ;
        ro = this.words = ro || [];
        this.sigBytes = null != rD ? rD : 4 * ro.length;
      },
      'toString': function (ro) {
        return (ro || rF).stringify(this);
      },
      'concat': function (ro) {
        var rD = this.words, rf = ro.words, rN = this.sigBytes, rm = ro.sigBytes;
        ;
        ;
        if (this.clamp(), rN % 4) {
          for (var rW = 0; rW < rm; rW++) {
            var rB = rf[rW >>> 2] >>> 24 - rW % 4 * 8 & 255;
            rD[rN + rW >>> 2] |= rB << 24 - (rN + rW) % 4 * 8;
          }
        } else {
          for (var ry = 0; ry < rm; ry += 4) {
            rD[rN + ry >>> 2] = rf[ry >>> 2];
          }
        }
        ;
        return this.sigBytes += rm, this;
      },
      'clamp': function () {
        ;
        var ro = this.words, rD = this.sigBytes;
        ro[rD >>> 2] &= 4294967295 << 32 - rD % 4 * 8;
        ro.length = rX.ceil(rD / 4);
      },
      'clone': function () {
        ;
        ;
        var ro = rE.clone.call(this);
        ;
        return ro.words = this.words.slice(0), ro;
      },
      'random': function (ro) {
        ;
        for (var rD = [], rf = 0; rf < ro; rf += 4) {
          rD.push(function () {
            ;
            ;
            if (rl) {
              if ('function' == typeof rl.getRandomValues) {
                try {
                  return rl.getRandomValues(new Uint32Array(1))[0];
                } catch (rN) {
                }
              }
              if ('function' == typeof rl.randomBytes) {
                try {
                  return rl.randomBytes(4).readInt32LE();
                } catch (rm) {
                }
              }
            }
            ;
            throw new Error('Native crypto module could not be used to get secure random number.');
          }());
        }
        return new rv.init(rD, ro);
      }
    }), rb = rd.enc = {}, rF = rb.Hex = {
      'stringify': function (ro) {
        for (var rD = ro.words, rf = ro.sigBytes, rN = [], rm = 0; rm < rf; rm++) {
          var rW = rD[rm >>> 2] >>> 24 - rm % 4 * 8 & 255;
          rN.push((rW >>> 4).toString(16));
          rN.push((15 & rW).toString(16));
        }
        ;
        ;
        return rN.join('');
      },
      'parse': function (ro) {
        ;
        for (var rD = ro.length, rf = [], rN = 0; rN < rD; rN += 2) {
          rf[rN >>> 3] |= parseInt(ro.substr(rN, 2), 16) << 24 - rN % 8 * 4;
        }
        ;
        return new rv.init(rf, rD / 2);
      }
    }, rP = rb.Latin1 = {
      'stringify': function (ro) {
        ;
        for (var rD = ro.words, rf = ro.sigBytes, rN = [], rm = 0; rm < rf; rm++) {
          var rW = rD[rm >>> 2] >>> 24 - rm % 4 * 8 & 255;
          rN.push(String.fromCharCode(rW));
        }
        return rN.join('');
      },
      'parse': function (ro) {
        for (var rD = ro.length, rf = [], rN = 0; rN < rD; rN++) {
          rf[rN >>> 2] |= (255 & ro.charCodeAt(rN)) << 24 - rN % 4 * 8;
        }
        ;
        ;
        return new rv.init(rf, rD);
      }
    }, rc = rb.Utf8 = {
      'stringify': function (ro) {
        ;
        ;
        try {
          return decodeURIComponent(escape(rP.stringify(ro)));
        } catch (rD) {
          throw new Error('Malformed UTF-8 data');
        }
      },
      'parse': function (ro) {
        return rP.parse(unescape(encodeURIComponent(ro)));
      }
    }, rY = rg.BufferedBlockAlgorithm = rE.extend({
      'reset': function () {
        ;
        this['_data'] = new rv.init();
        this['_nDataBytes'] = 0;
      },
      '_append': function (ro) {
        ;
        ;
        'string' == typeof ro && (ro = rc.parse(ro));
        this['_data'].concat(ro);
        this['_nDataBytes'] += ro.sigBytes;
      },
      '_process': function (ro) {
        ;
        var rD, rf = this['_data'], rN = rf.words, rm = rf.sigBytes, rW = this.blockSize, rB = rm / (4 * rW), ry = (rB = ro ? rX.ceil(rB) : rX.max((0 | rB) - this['_minBufferSize'], 0)) * rW, ro = rX.min(4 * ry, rm);
        ;
        ;
        if (ry) {
          for (var rV = 0; rV < ry; rV += rW) {
            this['_doProcessBlock'](rN, rV);
          }
          rD = rN.splice(0, ry);
          rf.sigBytes -= ro;
        }
        return new rv.init(rD, ro);
      },
      'clone': function () {
        var ro = rE.clone.call(this);
        ;
        ;
        return ro['_data'] = this['_data'].clone(), ro;
      },
      '_minBufferSize': 0
    }), rM = (rg.Hasher = rY.extend({
      'cfg': rE.extend(),
      'init': function (ro) {
        ;
        ;
        ;
        this.cfg = this.cfg.extend(ro);
        this.reset();
      },
      'reset': function () {
        ;
        rY.reset.call(this);
        this['_doReset']();
      },
      'update': function (ro) {
        return this['_append'](ro), this['_process'](), this;
      },
      'finalize': function (ro) {
        ;
        ;
        return ro && this['_append'](ro), this['_doFinalize']();
      },
      'blockSize': 16,
      '_createHelper': function (ro) {
        return function (rD, rf) {
          ;
          return new ro.init(rf).finalize(rD);
        };
      },
      '_createHmacHelper': function (ro) {
        return function (rD, rf) {
          ;
          return new rM.HMAC.init(ro, rf).finalize(rD);
        };
      }
    }), rd.algo = {});
    return rd;
  }(Math), OJ = (OJ = (OS = OQ).lib, O5 = OJ.Base, O6 = OJ.WordArray, (OJ = OS.x64 = {}).Word = O5.extend({
    'init': function (rX, rl) {
      ;
      this.high = rX;
      this.low = rl;
    }
  }), OJ.WordArray = O5.extend({
    'init': function (rX, rl) {
      ;
      ;
      rX = this.words = rX || [];
      this.sigBytes = null != rl ? rl : 8 * rX.length;
    },
    'toX32': function () {
      ;
      for (var rX = this.words, rl = rX.length, rz = [], rU = 0; rU < rl; rU++) {
        var rd = rX[rU];
        rz.push(rd.high);
        rz.push(rd.low);
      }
      ;
      ;
      return O6.create(rz, this.sigBytes);
    },
    'clone': function () {
      for (var rX = O5.clone.call(this), rl = rX.words = this.words.slice(0), rz = rl.length, rU = 0; rU < rz; rU++) {
        rl[rU] = rl[rU].clone();
      }
      ;
      ;
      ;
      return rX;
    }
  }), 'function' == typeof ArrayBuffer && (OS = OQ.lib.WordArray, O7 = OS.init, (OS.init = function (rX) {
    ;
    ;
    if ((rX = (rX = rX instanceof ArrayBuffer ? new Uint8Array(rX) : rX) instanceof Int8Array || 'undefined' != typeof Uint8ClampedArray && rX instanceof Uint8ClampedArray || rX instanceof Int16Array || rX instanceof Uint16Array || rX instanceof Int32Array || rX instanceof Uint32Array || rX instanceof Float32Array || rX instanceof Float64Array ? new Uint8Array(rX.buffer, rX.byteOffset, rX.byteLength) : rX) instanceof Uint8Array) {
      for (var rl = rX.byteLength, rz = [], rU = 0; rU < rl; rU++) {
        rz[rU >>> 2] |= rX[rU] << 24 - rU % 4 * 8;
      }
      O7.call(this, rz, rl);
    } else {
      O7.apply(this, arguments);
    }
  }).prototype = OS), OQ), OK = OJ.lib.WordArray;
  function Ot(rX) {
    return rX << 8 & 4278255360 | rX >>> 8 & 16711935;
  }
  (OJ = OJ.enc).Utf16 = OJ.Utf16BE = {
    'stringify': function (rX) {
      ;
      ;
      ;
      for (var rl = rX.words, rz = rX.sigBytes, rU = [], rd = 0; rd < rz; rd += 2) {
        var rg = rl[rd >>> 2] >>> 16 - rd % 4 * 8 & 65535;
        rU.push(String.fromCharCode(rg));
      }
      return rU.join('');
    },
    'parse': function (rX) {
      ;
      ;
      for (var rl = rX.length, rz = [], rU = 0; rU < rl; rU++) {
        rz[rU >>> 1] |= rX.charCodeAt(rU) << 16 - rU % 2 * 16;
      }
      return OK.create(rz, 2 * rl);
    }
  };
  OJ.Utf16LE = {
    'stringify': function (rX) {
      ;
      ;
      for (var rl = rX.words, rz = rX.sigBytes, rU = [], rd = 0; rd < rz; rd += 2) {
        var rg = Ot(rl[rd >>> 2] >>> 16 - rd % 4 * 8 & 65535);
        rU.push(String.fromCharCode(rg));
      }
      return rU.join('');
    },
    'parse': function (rX) {
      for (var rl = rX.length, rz = [], rU = 0; rU < rl; rU++) {
        rz[rU >>> 1] |= Ot(rX.charCodeAt(rU) << 16 - rU % 2 * 16);
      }
      return OK.create(rz, 2 * rl);
    }
  };
  O8 = (OS = OQ).lib.WordArray;
  OS.enc.Base64 = {
    'stringify': function (rX) {
      for (var rl = rX.words, rz = rX.sigBytes, rU = this['_map'], rd = (rX.clamp(), []), rg = 0; rg < rz; rg += 3) {
        for (var rE = (rl[rg >>> 2] >>> 24 - rg % 4 * 8 & 255) << 16 | (rl[rg + 1 >>> 2] >>> 24 - (rg + 1) % 4 * 8 & 255) << 8 | rl[rg + 2 >>> 2] >>> 24 - (rg + 2) % 4 * 8 & 255, rv = 0; rv < 4 && rg + 0.75 * rv < rz; rv++) {
          rd.push(rU.charAt(rE >>> 6 * (3 - rv) & 63));
        }
      }
      ;
      ;
      var rb = rU.charAt(64);
      if (rb) {
        for (; rd.length % 4;) {
          rd.push(rb);
        }
      }
      ;
      return rd.join('');
    },
    'parse': function (rX) {
      ;
      var rl = rX.length, rz = this['_map'];
      if (!(rU = this['_reverseMap'])) {
        for (var rU = this['_reverseMap'] = [], rd = 0; rd < rz.length; rd++) {
          rU[rz.charCodeAt(rd)] = rd;
        }
      }
      ;
      for (var rg, rE, rv = rz.charAt(64), rb = (rv && -1 !== (rv = rX.indexOf(rv)) && (rl = rv), rX), rF = rl, rP = rU, rc = [], rY = 0, rM = 0; rM < rF; rM++) {
        rM % 4 && (rg = rP[rb.charCodeAt(rM - 1)] << rM % 4 * 2, rE = rP[rb.charCodeAt(rM)] >>> 6 - rM % 4 * 2, rc[rY >>> 2] |= (rg | rE) << 24 - rY % 4 * 8, rY++);
      }
      ;
      return O8.create(rc, rY);
    },
    '_map': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  };
  O9 = (OJ = OQ).lib.WordArray;
  OJ.enc.Base64url = {
    'stringify': function (rX, rl = true) {
      for (var rz = rX.words, rU = rX.sigBytes, rd = rl ? this['_safe_map'] : this['_map'], rg = (rX.clamp(), []), rE = 0; rE < rU; rE += 3) {
        for (var rv = (rz[rE >>> 2] >>> 24 - rE % 4 * 8 & 255) << 16 | (rz[rE + 1 >>> 2] >>> 24 - (rE + 1) % 4 * 8 & 255) << 8 | rz[rE + 2 >>> 2] >>> 24 - (rE + 2) % 4 * 8 & 255, rb = 0; rb < 4 && rE + 0.75 * rb < rU; rb++) {
          rg.push(rd.charAt(rv >>> 6 * (3 - rb) & 63));
        }
      }
      ;
      var rF = rd.charAt(64);
      ;
      ;
      if (rF) {
        for (; rg.length % 4;) {
          rg.push(rF);
        }
      }
      return rg.join('');
    },
    'parse': function (rX, rl = true) {
      ;
      ;
      var rz = rX.length, rU = rl ? this['_safe_map'] : this['_map'];
      if (!(rd = this['_reverseMap'])) {
        for (var rd = this['_reverseMap'] = [], rg = 0; rg < rU.length; rg++) {
          rd[rU.charCodeAt(rg)] = rg;
        }
      }
      for (var rE, rv, rl = rU.charAt(64), rb = (rl && -1 !== (rl = rX.indexOf(rl)) && (rz = rl), rX), rF = rz, rP = rd, rc = [], rY = 0, rM = 0; rM < rF; rM++) {
        rM % 4 && (rE = rP[rb.charCodeAt(rM - 1)] << rM % 4 * 2, rv = rP[rb.charCodeAt(rM)] >>> 6 - rM % 4 * 2, rc[rY >>> 2] |= (rE | rv) << 24 - rY % 4 * 8, rY++);
      }
      ;
      return O9.create(rc, rY);
    },
    '_map': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    '_safe_map': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  };
  for (var OL = Math, OS = OQ, Ox = (OJ = OS.lib).WordArray, Oa = OJ.Hasher, OJ = OS.algo, Ok = [], Ow = 0; Ow < 64; Ow++) {
    Ok[Ow] = 4294967296 * OL.abs(OL.sin(Ow + 1)) | 0;
  }
  function Ou(rX, rl, rz, rU, rd, rg, rE) {
    return rX = rX + (rl & rz | ~rl & rU) + rd + rE, (rX << rg | rX >>> 32 - rg) + rl;
  }
  function On(rX, rl, rz, rU, rd, rg, rE) {
    return rX = rX + (rl & rU | rz & ~rU) + rd + rE, (rX << rg | rX >>> 32 - rg) + rl;
  }
  function C0(rX, rl, rz, rU, rd, rg, rE) {
    return rX = rX + (rl ^ rz ^ rU) + rd + rE, (rX << rg | rX >>> 32 - rg) + rl;
  }
  function C1(rX, rl, rz, rU, rd, rg, rE) {
    return rX = rX + (rz ^ (rl | ~rU)) + rd + rE, (rX << rg | rX >>> 32 - rg) + rl;
  }
  OJ = OJ.MD5 = Oa.extend({
    '_doReset': function () {
      ;
      this['_hash'] = new Ox.init([
        1732584193,
        4023233417,
        2562383102,
        271733878
      ]);
    },
    '_doProcessBlock': function (rX, rl) {
      for (var rz = 0; rz < 16; rz++) {
        var rU = rl + rz, rd = rX[rU];
        rX[rU] = 16711935 & (rd << 8 | rd >>> 24) | 4278255360 & (rd << 24 | rd >>> 8);
      }
      var rg = this['_hash'].words, rE = rX[rl + 0], rv = rX[rl + 1], rb = rX[rl + 2], rF = rX[rl + 3], rP = rX[rl + 4], rc = rX[rl + 5], rY = rX[rl + 6], rM = rX[rl + 7], rG = rX[rl + 8], ro = rX[rl + 9], rD = rX[rl + 10], rf = rX[rl + 11], rN = rX[rl + 12], rm = rX[rl + 13], rW = rX[rl + 14], rB = rX[rl + 15], ry = Ou(rg[0], rh = rg[1], rH = rg[2], rV = rg[3], rE, 7, Ok[0]), rV = Ou(rV, ry, rh, rH, rv, 12, Ok[1]), rH = Ou(rH, rV, ry, rh, rb, 17, Ok[2]), rh = Ou(rh, rH, rV, ry, rF, 22, Ok[3]);
      ;
      ry = Ou(ry, rh, rH, rV, rP, 7, Ok[4]);
      rV = Ou(rV, ry, rh, rH, rc, 12, Ok[5]);
      rH = Ou(rH, rV, ry, rh, rY, 17, Ok[6]);
      rh = Ou(rh, rH, rV, ry, rM, 22, Ok[7]);
      ry = Ou(ry, rh, rH, rV, rG, 7, Ok[8]);
      rV = Ou(rV, ry, rh, rH, ro, 12, Ok[9]);
      rH = Ou(rH, rV, ry, rh, rD, 17, Ok[10]);
      rh = Ou(rh, rH, rV, ry, rf, 22, Ok[11]);
      ry = Ou(ry, rh, rH, rV, rN, 7, Ok[12]);
      rV = Ou(rV, ry, rh, rH, rm, 12, Ok[13]);
      rH = Ou(rH, rV, ry, rh, rW, 17, Ok[14]);
      ry = On(ry, rh = Ou(rh, rH, rV, ry, rB, 22, Ok[15]), rH, rV, rv, 5, Ok[16]);
      rV = On(rV, ry, rh, rH, rY, 9, Ok[17]);
      rH = On(rH, rV, ry, rh, rf, 14, Ok[18]);
      rh = On(rh, rH, rV, ry, rE, 20, Ok[19]);
      ry = On(ry, rh, rH, rV, rc, 5, Ok[20]);
      rV = On(rV, ry, rh, rH, rD, 9, Ok[21]);
      rH = On(rH, rV, ry, rh, rB, 14, Ok[22]);
      rh = On(rh, rH, rV, ry, rP, 20, Ok[23]);
      ry = On(ry, rh, rH, rV, ro, 5, Ok[24]);
      rV = On(rV, ry, rh, rH, rW, 9, Ok[25]);
      rH = On(rH, rV, ry, rh, rF, 14, Ok[26]);
      rh = On(rh, rH, rV, ry, rG, 20, Ok[27]);
      ry = On(ry, rh, rH, rV, rm, 5, Ok[28]);
      rV = On(rV, ry, rh, rH, rb, 9, Ok[29]);
      rH = On(rH, rV, ry, rh, rM, 14, Ok[30]);
      ry = C0(ry, rh = On(rh, rH, rV, ry, rN, 20, Ok[31]), rH, rV, rc, 4, Ok[32]);
      rV = C0(rV, ry, rh, rH, rG, 11, Ok[33]);
      rH = C0(rH, rV, ry, rh, rf, 16, Ok[34]);
      rh = C0(rh, rH, rV, ry, rW, 23, Ok[35]);
      ry = C0(ry, rh, rH, rV, rv, 4, Ok[36]);
      rV = C0(rV, ry, rh, rH, rP, 11, Ok[37]);
      rH = C0(rH, rV, ry, rh, rM, 16, Ok[38]);
      rh = C0(rh, rH, rV, ry, rD, 23, Ok[39]);
      ry = C0(ry, rh, rH, rV, rm, 4, Ok[40]);
      rV = C0(rV, ry, rh, rH, rE, 11, Ok[41]);
      rH = C0(rH, rV, ry, rh, rF, 16, Ok[42]);
      rh = C0(rh, rH, rV, ry, rY, 23, Ok[43]);
      ry = C0(ry, rh, rH, rV, ro, 4, Ok[44]);
      rV = C0(rV, ry, rh, rH, rN, 11, Ok[45]);
      rH = C0(rH, rV, ry, rh, rB, 16, Ok[46]);
      ry = C1(ry, rh = C0(rh, rH, rV, ry, rb, 23, Ok[47]), rH, rV, rE, 6, Ok[48]);
      rV = C1(rV, ry, rh, rH, rM, 10, Ok[49]);
      rH = C1(rH, rV, ry, rh, rW, 15, Ok[50]);
      rh = C1(rh, rH, rV, ry, rc, 21, Ok[51]);
      ry = C1(ry, rh, rH, rV, rN, 6, Ok[52]);
      rV = C1(rV, ry, rh, rH, rF, 10, Ok[53]);
      rH = C1(rH, rV, ry, rh, rD, 15, Ok[54]);
      rh = C1(rh, rH, rV, ry, rv, 21, Ok[55]);
      ry = C1(ry, rh, rH, rV, rG, 6, Ok[56]);
      rV = C1(rV, ry, rh, rH, rB, 10, Ok[57]);
      rH = C1(rH, rV, ry, rh, rY, 15, Ok[58]);
      rh = C1(rh, rH, rV, ry, rm, 21, Ok[59]);
      ry = C1(ry, rh, rH, rV, rP, 6, Ok[60]);
      rV = C1(rV, ry, rh, rH, rf, 10, Ok[61]);
      rH = C1(rH, rV, ry, rh, rb, 15, Ok[62]);
      rh = C1(rh, rH, rV, ry, ro, 21, Ok[63]);
      rg[0] = rg[0] + ry | 0;
      rg[1] = rg[1] + rh | 0;
      rg[2] = rg[2] + rH | 0;
      rg[3] = rg[3] + rV | 0;
    },
    '_doFinalize': function () {
      for (var rX = this['_data'], rl = rX.words, rz = 8 * this['_nDataBytes'], rU = 8 * rX.sigBytes, rd = (rl[rU >>> 5] |= 128 << 24 - rU % 32, OL.floor(rz / 4294967296)), rd = (rl[15 + (64 + rU >>> 9 << 4)] = 16711935 & (rd << 8 | rd >>> 24) | 4278255360 & (rd << 24 | rd >>> 8), rl[14 + (64 + rU >>> 9 << 4)] = 16711935 & (rz << 8 | rz >>> 24) | 4278255360 & (rz << 24 | rz >>> 8), rX.sigBytes = 4 * (rl.length + 1), this['_process'](), this['_hash']), rg = rd.words, rE = 0; rE < 4; rE++) {
        var rv = rg[rE];
        rg[rE] = 16711935 & (rv << 8 | rv >>> 24) | 4278255360 & (rv << 24 | rv >>> 8);
      }
      ;
      ;
      ;
      return rd;
    },
    'clone': function () {
      ;
      ;
      var rX = Oa.clone.call(this);
      return rX['_hash'] = this['_hash'].clone(), rX;
    }
  });
  OS.MD5 = Oa['_createHelper'](OJ);
  OS.HmacMD5 = Oa['_createHmacHelper'](OJ);
  OJ = (OS = OQ).lib;
  OO = OJ.WordArray;
  OC = OJ.Hasher;
  OJ = OS.algo;
  Or = [];
  OJ = OJ.SHA1 = OC.extend({
    '_doReset': function () {
      ;
      this['_hash'] = new OO.init([
        1732584193,
        4023233417,
        2562383102,
        271733878,
        3285377520
      ]);
    },
    '_doProcessBlock': function (rX, rl) {
      ;
      for (var rz = this['_hash'].words, rU = rz[0], rd = rz[1], rg = rz[2], rE = rz[3], rv = rz[4], rb = 0; rb < 80; rb++) {
        Or[rb] = rb < 16 ? 0 | rX[rl + rb] : (rF = Or[rb - 3] ^ Or[rb - 8] ^ Or[rb - 14] ^ Or[rb - 16]) << 1 | rF >>> 31;
        var rF = (rU << 5 | rU >>> 27) + rv + Or[rb];
        rF += rb < 20 ? 1518500249 + (rd & rg | ~rd & rE) : rb < 40 ? 1859775393 + (rd ^ rg ^ rE) : rb < 60 ? (rd & rg | rd & rE | rg & rE) - 1894007588 : (rd ^ rg ^ rE) - 899497514;
        rv = rE;
        rE = rg;
        rg = rd << 30 | rd >>> 2;
        rd = rU;
        rU = rF;
      }
      rz[0] = rz[0] + rU | 0;
      rz[1] = rz[1] + rd | 0;
      rz[2] = rz[2] + rg | 0;
      rz[3] = rz[3] + rE | 0;
      rz[4] = rz[4] + rv | 0;
    },
    '_doFinalize': function () {
      var rX = this['_data'], rl = rX.words, rz = 8 * this['_nDataBytes'], rU = 8 * rX.sigBytes;
      ;
      ;
      ;
      return rl[rU >>> 5] |= 128 << 24 - rU % 32, rl[14 + (64 + rU >>> 9 << 4)] = Math.floor(rz / 4294967296), rl[15 + (64 + rU >>> 9 << 4)] = rz, rX.sigBytes = 4 * rl.length, this['_process'](), this['_hash'];
    },
    'clone': function () {
      ;
      var rX = OC.clone.call(this);
      ;
      return rX['_hash'] = this['_hash'].clone(), rX;
    }
  });
  OS.SHA1 = OC['_createHelper'](OJ);
  OS.HmacSHA1 = OC['_createHmacHelper'](OJ);
  var C2 = Math, OS = OQ, C3 = (OJ = OS.lib).WordArray, C4 = OJ.Hasher, OJ = OS.algo, C5 = [], C6 = [];
  function C7(rX) {
    return 4294967296 * (rX - (0 | rX)) | 0;
  }
  ;
  for (var C8 = 2, C9 = 0; C9 < 64;) {
    !function (rX) {
      for (var rl = C2.sqrt(rX), rz = 2; rz <= rl; rz++) {
        if (!(rX % rz)) {
          return;
        }
      }
      ;
      return 1;
    }(C8) || (C9 < 8 && (C5[C9] = C7(C2.pow(C8, 0.5))), C6[C9] = C7(C2.pow(C8, 0.3333333333333333)), C9++);
    C8++;
  }
  var CO = [], OJ = OJ.SHA256 = C4.extend({
    '_doReset': function () {
      ;
      ;
      this['_hash'] = new C3.init(C5.slice(0));
    },
    '_doProcessBlock': function (rX, rl) {
      for (var rz = this['_hash'].words, rU = rz[0], rd = rz[1], rg = rz[2], rE = rz[3], rv = rz[4], rb = rz[5], rF = rz[6], rP = rz[7], rc = 0; rc < 64; rc++) {
        CO[rc] = rc < 16 ? 0 | rX[rl + rc] : (((rY = CO[rc - 15]) << 25 | rY >>> 7) ^ (rY << 14 | rY >>> 18) ^ rY >>> 3) + CO[rc - 7] + (((rY = CO[rc - 2]) << 15 | rY >>> 17) ^ (rY << 13 | rY >>> 19) ^ rY >>> 10) + CO[rc - 16];
        var rY = rU & rd ^ rU & rg ^ rd & rg, rM = rP + ((rv << 26 | rv >>> 6) ^ (rv << 21 | rv >>> 11) ^ (rv << 7 | rv >>> 25)) + (rv & rb ^ ~rv & rF) + C6[rc] + CO[rc], rP = rF, rF = rb, rb = rv, rv = rE + rM | 0, rE = rg, rg = rd, rd = rU, rU = rM + (((rU << 30 | rU >>> 2) ^ (rU << 19 | rU >>> 13) ^ (rU << 10 | rU >>> 22)) + rY) | 0;
      }
      ;
      rz[0] = rz[0] + rU | 0;
      rz[1] = rz[1] + rd | 0;
      rz[2] = rz[2] + rg | 0;
      rz[3] = rz[3] + rE | 0;
      rz[4] = rz[4] + rv | 0;
      rz[5] = rz[5] + rb | 0;
      rz[6] = rz[6] + rF | 0;
      rz[7] = rz[7] + rP | 0;
    },
    '_doFinalize': function () {
      ;
      ;
      var rX = this['_data'], rl = rX.words, rz = 8 * this['_nDataBytes'], rU = 8 * rX.sigBytes;
      ;
      return rl[rU >>> 5] |= 128 << 24 - rU % 32, rl[14 + (64 + rU >>> 9 << 4)] = C2.floor(rz / 4294967296), rl[15 + (64 + rU >>> 9 << 4)] = rz, rX.sigBytes = 4 * rl.length, this['_process'](), this['_hash'];
    },
    'clone': function () {
      ;
      var rX = C4.clone.call(this);
      return rX['_hash'] = this['_hash'].clone(), rX;
    }
  }), OS = (OS.SHA256 = C4['_createHelper'](OJ), OS.HmacSHA256 = C4['_createHmacHelper'](OJ), OA = (OS = OQ).lib.WordArray, OJ = OS.algo, Oj = OJ.SHA256, OJ = OJ.SHA224 = Oj.extend({
    '_doReset': function () {
      ;
      this['_hash'] = new OA.init([
        3238371032,
        914150663,
        812702999,
        4144912697,
        4290775857,
        1750603025,
        1694076839,
        3204075428
      ]);
    },
    '_doFinalize': function () {
      ;
      var rX = Oj['_doFinalize'].call(this);
      return rX.sigBytes -= 4, rX;
    }
  }), OS.SHA224 = Oj['_createHelper'](OJ), OS.HmacSHA224 = Oj['_createHmacHelper'](OJ), OQ), CC = OS.lib.Hasher, Cr = (OJ = OS.x64).Word, CA = OJ.WordArray, OJ = OS.algo;
  function Cj() {
    ;
    return Cr.create.apply(Cr, arguments);
  }
  for (var CI = [
    Cj(1116352408, 3609767458),
    Cj(1899447441, 602891725),
    Cj(3049323471, 3964484399),
    Cj(3921009573, 2173295548),
    Cj(961987163, 4081628472),
    Cj(1508970993, 3053834265),
    Cj(2453635748, 2937671579),
    Cj(2870763221, 3664609560),
    Cj(3624381080, 2734883394),
    Cj(310598401, 1164996542),
    Cj(607225278, 1323610764),
    Cj(1426881987, 3590304994),
    Cj(1925078388, 4068182383),
    Cj(2162078206, 991336113),
    Cj(2614888103, 633803317),
    Cj(3248222580, 3479774868),
    Cj(3835390401, 2666613458),
    Cj(4022224774, 944711139),
    Cj(264347078, 2341262773),
    Cj(604807628, 2007800933),
    Cj(770255983, 1495990901),
    Cj(1249150122, 1856431235),
    Cj(1555081692, 3175218132),
    Cj(1996064986, 2198950837),
    Cj(2554220882, 3999719339),
    Cj(2821834349, 766784016),
    Cj(2952996808, 2566594879),
    Cj(3210313671, 3203337956),
    Cj(3336571891, 1034457026),
    Cj(3584528711, 2466948901),
    Cj(113926993, 3758326383),
    Cj(338241895, 168717936),
    Cj(666307205, 1188179964),
    Cj(773529912, 1546045734),
    Cj(1294757372, 1522805485),
    Cj(1396182291, 2643833823),
    Cj(1695183700, 2343527390),
    Cj(1986661051, 1014477480),
    Cj(2177026350, 1206759142),
    Cj(2456956037, 344077627),
    Cj(2730485921, 1290863460),
    Cj(2820302411, 3158454273),
    Cj(3259730800, 3505952657),
    Cj(3345764771, 106217008),
    Cj(3516065817, 3606008344),
    Cj(3600352804, 1432725776),
    Cj(4094571909, 1467031594),
    Cj(275423344, 851169720),
    Cj(430227734, 3100823752),
    Cj(506948616, 1363258195),
    Cj(659060556, 3750685593),
    Cj(883997877, 3785050280),
    Cj(958139571, 3318307427),
    Cj(1322822218, 3812723403),
    Cj(1537002063, 2003034995),
    Cj(1747873779, 3602036899),
    Cj(1955562222, 1575990012),
    Cj(2024104815, 1125592928),
    Cj(2227730452, 2716904306),
    Cj(2361852424, 442776044),
    Cj(2428436474, 593698344),
    Cj(2756734187, 3733110249),
    Cj(3204031479, 2999351573),
    Cj(3329325298, 3815920427),
    Cj(3391569614, 3928383900),
    Cj(3515267271, 566280711),
    Cj(3940187606, 3454069534),
    Cj(4118630271, 4000239992),
    Cj(116418474, 1914138554),
    Cj(174292421, 2731055270),
    Cj(289380356, 3203993006),
    Cj(460393269, 320620315),
    Cj(685471733, 587496836),
    Cj(852142971, 1086792851),
    Cj(1017036298, 365543100),
    Cj(1126000580, 2618297676),
    Cj(1288033470, 3409855158),
    Cj(1501505948, 4234509866),
    Cj(1607167915, 987167468),
    Cj(1816402316, 1246189591)
  ], CR = [], Ci = 0; Ci < 80; Ci++) {
    CR[Ci] = Cj();
  }
  OJ = OJ.SHA512 = CC.extend({
    '_doReset': function () {
      ;
      ;
      ;
      this['_hash'] = new CA.init([
        new Cr.init(1779033703, 4089235720),
        new Cr.init(3144134277, 2227873595),
        new Cr.init(1013904242, 4271175723),
        new Cr.init(2773480762, 1595750129),
        new Cr.init(1359893119, 2917565137),
        new Cr.init(2600822924, 725511199),
        new Cr.init(528734635, 4215389547),
        new Cr.init(1541459225, 327033209)
      ]);
    },
    '_doProcessBlock': function (rX, rl) {
      for (var rz = this['_hash'].words, rU = rz[0], rd = rz[1], rg = rz[2], rE = rz[3], rv = rz[4], rb = rz[5], rF = rz[6], rz = rz[7], rP = rU.high, rc = rU.low, rY = rd.high, rM = rd.low, rG = rg.high, ro = rg.low, rD = rE.high, rf = rE.low, rN = rv.high, rm = rv.low, rW = rb.high, rB = rb.low, ry = rF.high, rV = rF.low, rH = rz.high, rh = rz.low, rZ = rP, rT = rc, rs = rY, rp = rM, rQ = rG, rJ = ro, rK = rD, rL = rf, rS = rN, rx = rm, ra = rW, rk = rB, rw = ry, ru = rV, rn = rH, A0 = rh, A1 = 0; A1 < 80; A1++) {
        var A2, A3, A4 = CR[A1], A5 = (A1 < 16 ? (A3 = A4.high = 0 | rX[rl + 2 * A1], A2 = A4.low = 0 | rX[rl + 2 * A1 + 1]) : (Ar = (A9 = CR[A1 - 15]).high, A9 = A9.low, A8 = (A7 = CR[A1 - 2]).high, A7 = A7.low, A6 = (A5 = CR[A1 - 7]).high, A5 = A5.low, AC = (AO = CR[A1 - 16]).high, A3 = (A3 = ((Ar >>> 1 | A9 << 31) ^ (Ar >>> 8 | A9 << 24) ^ Ar >>> 7) + A6 + ((A2 = (A6 = (A9 >>> 1 | Ar << 31) ^ (A9 >>> 8 | Ar << 24) ^ (A9 >>> 7 | Ar << 25)) + A5) >>> 0 < A6 >>> 0 ? 1 : 0)) + ((A8 >>> 19 | A7 << 13) ^ (A8 << 3 | A7 >>> 29) ^ A8 >>> 6) + ((A2 += A9 = (A7 >>> 19 | A8 << 13) ^ (A7 << 3 | A8 >>> 29) ^ (A7 >>> 6 | A8 << 26)) >>> 0 < A9 >>> 0 ? 1 : 0), A2 += Ar = AO.low, A4.high = A3 = A3 + AC + (A2 >>> 0 < Ar >>> 0 ? 1 : 0), A4.low = A2), rS & ra ^ ~rS & rw), A6 = rx & rk ^ ~rx & ru, A7 = rZ & rs ^ rZ & rQ ^ rs & rQ, A8 = (rT >>> 28 | rZ << 4) ^ (rT << 30 | rZ >>> 2) ^ (rT << 25 | rZ >>> 7), A9 = CI[A1], AO = A9.high, AC = A9.low, Ar = A0 + ((rx >>> 14 | rS << 18) ^ (rx >>> 18 | rS << 14) ^ (rx << 23 | rS >>> 9)), A4 = rn + ((rS >>> 14 | rx << 18) ^ (rS >>> 18 | rx << 14) ^ (rS << 23 | rx >>> 9)) + (Ar >>> 0 < A0 >>> 0 ? 1 : 0), AA = A8 + (rT & rp ^ rT & rJ ^ rp & rJ), rn = rw, A0 = ru, rw = ra, ru = rk, ra = rS, rk = rx, rS = rK + (A4 = A4 + A5 + ((Ar = Ar + A6) >>> 0 < A6 >>> 0 ? 1 : 0) + AO + ((Ar = Ar + AC) >>> 0 < AC >>> 0 ? 1 : 0) + A3 + ((Ar = Ar + A2) >>> 0 < A2 >>> 0 ? 1 : 0)) + ((rx = rL + Ar | 0) >>> 0 < rL >>> 0 ? 1 : 0) | 0, rK = rQ, rL = rJ, rQ = rs, rJ = rp, rs = rZ, rp = rT, rZ = A4 + (((rZ >>> 28 | rT << 4) ^ (rZ << 30 | rT >>> 2) ^ (rZ << 25 | rT >>> 7)) + A7 + (AA >>> 0 < A8 >>> 0 ? 1 : 0)) + ((rT = Ar + AA | 0) >>> 0 < Ar >>> 0 ? 1 : 0) | 0;
      }
      ;
      ;
      ;
      rc = rU.low = rc + rT;
      rU.high = rP + rZ + (rc >>> 0 < rT >>> 0 ? 1 : 0);
      rM = rd.low = rM + rp;
      ;
      ro = rg.low = ro + rJ;
      rg.high = rG + rQ + (ro >>> 0 < rJ >>> 0 ? 1 : 0);
      rf = rE.low = rf + rL;
      rE.high = rD + rK + (rf >>> 0 < rL >>> 0 ? 1 : 0);
      rm = rv.low = rm + rx;
      rv.high = rN + rS + (rm >>> 0 < rx >>> 0 ? 1 : 0);
      rB = rb.low = rB + rk;
      rb.high = rW + ra + (rB >>> 0 < rk >>> 0 ? 1 : 0);
      rV = rF.low = rV + ru;
      rF.high = ry + rw + (rV >>> 0 < ru >>> 0 ? 1 : 0);
      rh = rz.low = rh + A0;
      rz.high = rH + rn + (rh >>> 0 < A0 >>> 0 ? 1 : 0);
    },
    '_doFinalize': function () {
      var rX = this['_data'], rl = rX.words, rz = 8 * this['_nDataBytes'], rU = 8 * rX.sigBytes;
      ;
      ;
      ;
      return rl[rU >>> 5] |= 128 << 24 - rU % 32, rl[30 + (128 + rU >>> 10 << 5)] = Math.floor(rz / 4294967296), rl[31 + (128 + rU >>> 10 << 5)] = rz, rX.sigBytes = 4 * rl.length, this['_process'](), this['_hash'].toX32();
    },
    'clone': function () {
      ;
      var rX = CC.clone.call(this);
      ;
      return rX['_hash'] = this['_hash'].clone(), rX;
    },
    'blockSize': 32
  });
  OS.SHA512 = CC['_createHelper'](OJ);
  OS.HmacSHA512 = CC['_createHmacHelper'](OJ);
  OJ = (OS = OQ).x64;
  OI = OJ.Word;
  OR = OJ.WordArray;
  OJ = OS.algo;
  Oi = OJ.SHA512;
  OJ = OJ.SHA384 = Oi.extend({
    '_doReset': function () {
      ;
      ;
      ;
      this['_hash'] = new OR.init([
        new OI.init(3418070365, 3238371032),
        new OI.init(1654270250, 914150663),
        new OI.init(2438529370, 812702999),
        new OI.init(355462360, 4144912697),
        new OI.init(1731405415, 4290775857),
        new OI.init(2394180231, 1750603025),
        new OI.init(3675008525, 1694076839),
        new OI.init(1203062813, 3204075428)
      ]);
    },
    '_doFinalize': function () {
      var rX = Oi['_doFinalize'].call(this);
      ;
      ;
      return rX.sigBytes -= 16, rX;
    }
  });
  OS.SHA384 = Oi['_createHelper'](OJ);
  OS.HmacSHA384 = Oi['_createHmacHelper'](OJ);
  for (var Cq = Math, OS = OQ, CX = (OJ = OS.lib).WordArray, Cl = OJ.Hasher, Cz = OS.x64.Word, OJ = OS.algo, CU = [], Cd = [], Cg = [], CE = 1, Cv = 0, Cb = 0; Cb < 24; Cb++) {
    CU[CE + 5 * Cv] = (Cb + 1) * (Cb + 2) / 2 % 64;
    var CF = (2 * CE + 3 * Cv) % 5;
    CE = Cv % 5;
    Cv = CF;
  }
  for (CE = 0; CE < 5; CE++) {
    for (Cv = 0; Cv < 5; Cv++) {
      Cd[CE + 5 * Cv] = Cv + (2 * CE + 3 * Cv) % 5 * 5;
    }
  }
  for (var CP = 1, Cc = 0; Cc < 24; Cc++) {
    for (var CY, CM = 0, CG = 0, Co = 0; Co < 7; Co++) {
      1 & CP && ((CY = (1 << Co) - 1) < 32 ? CG ^= 1 << CY : CM ^= 1 << CY - 32);
      128 & CP ? CP = CP << 1 ^ 113 : CP <<= 1;
    }
    Cg[Cc] = Cz.create(CM, CG);
  }
  for (var CD = [], Cf = 0; Cf < 25; Cf++) {
    CD[Cf] = Cz.create();
  }
  function CN(rX, rl, rz) {
    return rX & rl | ~rX & rz;
  }
  function Cm(rX, rl, rz) {
    return rX & rz | rl & ~rz;
  }
  function CW(rX, rl) {
    return rX << rl | rX >>> 32 - rl;
  }
  function CB(rX) {
    ;
    return 'string' == typeof rX ? OW : Om;
  }
  function Cy(rX, rl, rz) {
    ;
    var rU, rd = this['_iv'];
    rd ? (rU = rd, this['_iv'] = void 0) : rU = this['_prevBlock'];
    for (var rg = 0; rg < rz; rg++) {
      rX[rl + rg] ^= rU[rg];
    }
  }
  ;
  function CV(rX, rl, rz, rU) {
    ;
    ;
    ;
    var rd, rg = this['_iv'];
    rg ? (rd = rg.slice(0), this['_iv'] = void 0) : rd = this['_prevBlock'];
    rU.encryptBlock(rd, 0);
    for (var rE = 0; rE < rz; rE++) {
      rX[rl + rE] ^= rd[rE];
    }
  }
  function CH(rX) {
    var rl, rz, rU;
    return 255 == (rX >> 24 & 255) ? (rz = rX >> 8 & 255, rU = 255 & rX, 255 === (rl = rX >> 16 & 255) ? (rl = 0, 255 === rz ? (rz = 0, 255 === rU ? rU = 0 : ++rU) : ++rz) : ++rl, rX = 0, rX = (rX += rl << 16) + (rz << 8) + rU) : rX += 1 << 24, rX;
  }
  OJ = OJ.SHA3 = Cl.extend({
    'cfg': Cl.cfg.extend({ 'outputLength': 512 }),
    '_doReset': function () {
      ;
      for (var rX = this['_state'] = [], rl = 0; rl < 25; rl++) {
        rX[rl] = new Cz.init();
      }
      ;
      this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
    },
    '_doProcessBlock': function (rX, rl) {
      ;
      ;
      ;
      for (var rz = this['_state'], rU = this.blockSize / 2, rd = 0; rd < rU; rd++) {
        var rg = rX[rl + 2 * rd], rE = rX[rl + 2 * rd + 1], rg = 16711935 & (rg << 8 | rg >>> 24) | 4278255360 & (rg << 24 | rg >>> 8);
        (ry = rz[rd]).high ^= 16711935 & (rE << 8 | rE >>> 24) | 4278255360 & (rE << 24 | rE >>> 8);
        ry.low ^= rg;
      }
      for (var rv = 0; rv < 24; rv++) {
        for (var rb = 0; rb < 5; rb++) {
          for (var rF = 0, rP = 0, rc = 0; rc < 5; rc++) {
            rF ^= (ry = rz[rb + 5 * rc]).high;
            rP ^= ry.low;
          }
          var rY = CD[rb];
          rY.high = rF;
          rY.low = rP;
        }
        for (rb = 0; rb < 5; rb++) {
          for (var rM = CD[(rb + 4) % 5], rG = CD[(rb + 1) % 5], ro = rG.high, rG = rG.low, rF = rM.high ^ (ro << 1 | rG >>> 31), rP = rM.low ^ (rG << 1 | ro >>> 31), rc = 0; rc < 5; rc++) {
            (ry = rz[rb + 5 * rc]).high ^= rF;
            ry.low ^= rP;
          }
        }
        for (var rD = 1; rD < 25; rD++) {
          var rf = (ry = rz[rD]).high, rN = ry.low, rm = CU[rD], rf = (rP = rm < 32 ? (rF = rf << rm | rN >>> 32 - rm, rN << rm | rf >>> 32 - rm) : (rF = rN << rm - 32 | rf >>> 64 - rm, rf << rm - 32 | rN >>> 64 - rm), CD[Cd[rD]]);
          rf.high = rF;
          rf.low = rP;
        }
        var rW = CD[0], rB = rz[0];
        ry.high ^= rW.high;
        ry.low ^= rW.low;
        rW.low = rB.low;
        for (rb = 0; rb < 5; rb++) {
          for (rc = 0; rc < 5; rc++) {
            var ry = rz[rD = rb + 5 * rc], rV = CD[rD], rH = CD[(rb + 1) % 5 + 5 * rc], rh = CD[(rb + 2) % 5 + 5 * rc];
            ry.high = rV.high ^ ~rH.high & rh.high;
            ry.low = rV.low ^ ~rH.low & rh.low;
          }
        }
        ry = rz[0];
        rW = Cg[rv];
        ry.high ^= rW.high, ry.low ^= rW.low;
      }
    },
    '_doFinalize': function () {
      ;
      ;
      for (var rX = this['_data'], rl = rX.words, rz = (this['_nDataBytes'], 8 * rX.sigBytes), rU = 32 * this.blockSize, rd = (rl[rz >>> 5] |= 1 << 24 - rz % 32, rl[(Cq.ceil((1 + rz) / rU) * rU >>> 5) - 1] |= 128, rX.sigBytes = 4 * rl.length, this['_process'](), this['_state']), rz = this.cfg.outputLength / 8, rg = rz / 8, rE = [], rv = 0; rv < rg; rv++) {
        var rb = rd[rv], rF = rb.high, rb = rb.low, rF = 16711935 & (rF << 8 | rF >>> 24) | 4278255360 & (rF << 24 | rF >>> 8);
        rE.push(16711935 & (rb << 8 | rb >>> 24) | 4278255360 & (rb << 24 | rb >>> 8));
        rE.push(rF);
      }
      ;
      return new CX.init(rE, rz);
    },
    'clone': function () {
      for (var rX = Cl.clone.call(this), rl = rX['_state'] = this['_state'].slice(0), rz = 0; rz < 25; rz++) {
        rl[rz] = rl[rz].clone();
      }
      ;
      ;
      ;
      return rX;
    }
  });
  OS.SHA3 = Cl['_createHelper'](OJ);
  OS.HmacSHA3 = Cl['_createHmacHelper'](OJ);
  Math;
  OJ = (OS = OQ).lib;
  Oq = OJ.WordArray;
  OX = OJ.Hasher;
  OJ = OS.algo;
  Ol = Oq.create([
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13
  ]);
  Oz = Oq.create([
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11
  ]);
  OU = Oq.create([
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6
  ]);
  Od = Oq.create([
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11
  ]);
  Og = Oq.create([
    0,
    1518500249,
    1859775393,
    2400959708,
    2840853838
  ]);
  OE = Oq.create([
    1352829926,
    1548603684,
    1836072691,
    2053994217,
    0
  ]);
  OJ = OJ.RIPEMD160 = OX.extend({
    '_doReset': function () {
      ;
      this['_hash'] = Oq.create([
        1732584193,
        4023233417,
        2562383102,
        271733878,
        3285377520
      ]);
    },
    '_doProcessBlock': function (rX, rl) {
      ;
      ;
      ;
      for (var rz = 0; rz < 16; rz++) {
        var rU = rl + rz, rd = rX[rU];
        rX[rU] = 16711935 & (rd << 8 | rd >>> 24) | 4278255360 & (rd << 24 | rd >>> 8);
      }
      for (var rg, rE, rv, rb, rF, rP, rc = this['_hash'].words, rY = Og.words, rM = OE.words, rG = Ol.words, ro = Oz.words, rD = OU.words, rf = Od.words, rN = rg = rc[0], rm = rE = rc[1], rW = rv = rc[2], rB = rb = rc[3], ry = rF = rc[4], rz = 0; rz < 80; rz += 1) {
        rP = (rP = CW(rP = (rP = rg + rX[rl + rG[rz]] | 0) + (rz < 16 ? (rE ^ rv ^ rb) + rY[0] : rz < 32 ? CN(rE, rv, rb) + rY[1] : rz < 48 ? ((rE | ~rv) ^ rb) + rY[2] : rz < 64 ? Cm(rE, rv, rb) + rY[3] : (rE ^ (rv | ~rb)) + rY[4]) | 0, rD[rz])) + rF | 0;
        rg = rF;
        rF = rb;
        rb = CW(rv, 10);
        rv = rE;
        rE = rP;
        rP = (rP = CW(rP = (rP = rN + rX[rl + ro[rz]] | 0) + (rz < 16 ? (rm ^ (rW | ~rB)) + rM[0] : rz < 32 ? Cm(rm, rW, rB) + rM[1] : rz < 48 ? ((rm | ~rW) ^ rB) + rM[2] : rz < 64 ? CN(rm, rW, rB) + rM[3] : (rm ^ rW ^ rB) + rM[4]) | 0, rf[rz])) + ry | 0;
        rN = ry;
        ry = rB;
        rB = CW(rW, 10);
        rW = rm;
        rm = rP;
      }
      rP = rc[1] + rv + rB | 0;
      rc[1] = rc[2] + rb + ry | 0;
      rc[2] = rc[3] + rF + rN | 0;
      rc[3] = rc[4] + rg + rm | 0;
      rc[4] = rc[0] + rE + rW | 0;
      rc[0] = rP;
    },
    '_doFinalize': function () {
      ;
      ;
      for (var rX = this['_data'], rl = rX.words, rz = 8 * this['_nDataBytes'], rU = 8 * rX.sigBytes, rU = (rl[rU >>> 5] |= 128 << 24 - rU % 32, rl[14 + (64 + rU >>> 9 << 4)] = 16711935 & (rz << 8 | rz >>> 24) | 4278255360 & (rz << 24 | rz >>> 8), rX.sigBytes = 4 * (rl.length + 1), this['_process'](), this['_hash']), rd = rU.words, rg = 0; rg < 5; rg++) {
        var rE = rd[rg];
        ;
      }
      ;
      return rU;
    },
    'clone': function () {
      var rX = OX.clone.call(this);
      ;
      ;
      ;
      return rX['_hash'] = this['_hash'].clone(), rX;
    }
  });
  OS.RIPEMD160 = OX['_createHelper'](OJ);
  OS.HmacRIPEMD160 = OX['_createHmacHelper'](OJ);
  OJ = (OS = OQ).lib.Base;
  Ov = OS.enc.Utf8;
  OS.algo.HMAC = OJ.extend({
    'init': function (rX, rl) {
      ;
      rX = this['_hasher'] = new rX.init();
      'string' == typeof rl && (rl = Ov.parse(rl));
      for (var rz = rX.blockSize, rU = 4 * rz, rX = ((rl = rl.sigBytes > rU ? rX.finalize(rl) : rl).clamp(), this['_oKey'] = rl.clone()), rl = this['_iKey'] = rl.clone(), rd = rX.words, rg = rl.words, rE = 0; rE < rz; rE++) {
        ;
        rg[rE] ^= 909522486;
      }
      ;
      ;
      rX.sigBytes = rl.sigBytes = rU;
      this.reset();
    },
    'reset': function () {
      ;
      ;
      var rX = this['_hasher'];
      rX.reset();
      rX.update(this['_iKey']);
    },
    'update': function (rX) {
      ;
      ;
      return this['_hasher'].update(rX), this;
    },
    'finalize': function (rX) {
      var rl = this['_hasher'], rX = rl.finalize(rX);
      ;
      ;
      return rl.reset(), rl.finalize(this['_oKey'].clone().concat(rX));
    }
  });
  OJ = (OS = OQ).lib;
  Ch = OJ.Base;
  Ob = OJ.WordArray;
  OJ = OS.algo;
  r5 = OJ.SHA1;
  OF = OJ.HMAC;
  OP = OJ.PBKDF2 = Ch.extend({
    'cfg': Ch.extend({
      'keySize': 4,
      'hasher': r5,
      'iterations': 1
    }),
    'init': function (rX) {
      ;
      this.cfg = this.cfg.extend(rX);
    },
    'compute': function (rX, rl) {
      ;
      ;
      ;
      for (var rz = this.cfg, rU = OF.create(rz.hasher, rX), rd = Ob.create(), rg = Ob.create([1]), rE = rd.words, rv = rg.words, rb = rz.keySize, rF = rz.iterations; rE.length < rb;) {
        for (var rP = rU.update(rl).finalize(rg), rc = (rU.reset(), rP.words), rY = rc.length, rM = rP, rG = 1; rG < rF; rG++) {
          rM = rU.finalize(rM);
          rU.reset();
          for (var ro = rM.words, rD = 0; rD < rY; rD++) {
            rc[rD] ^= ro[rD];
          }
        }
        rd.concat(rP);
        rv[0]++;
      }
      return rd.sigBytes = 4 * rb, rd;
    }
  });
  OS.PBKDF2 = function (rX, rl, rz) {
    ;
    return OP.create(rz).compute(rX, rl);
  };
  Ch = (OJ = OQ).lib;
  r5 = Ch.Base;
  Oc = Ch.WordArray;
  Ch = OJ.algo;
  OS = Ch.MD5;
  OY = Ch.EvpKDF = r5.extend({
    'cfg': r5.extend({
      'keySize': 4,
      'hasher': OS,
      'iterations': 1
    }),
    'init': function (rX) {
      ;
      ;
      this.cfg = this.cfg.extend(rX);
    },
    'compute': function (rX, rl) {
      for (var rz, rU = this.cfg, rd = rU.hasher.create(), rg = Oc.create(), rE = rg.words, rv = rU.keySize, rb = rU.iterations; rE.length < rv;) {
        rz && rd.update(rz);
        rz = rd.update(rX).finalize(rl);
        rd.reset();
        for (var rF = 1; rF < rb; rF++) {
          rz = rd.finalize(rz);
          rd.reset();
        }
        rg.concat(rz);
      }
      ;
      ;
      ;
      return rg.sigBytes = 4 * rv, rg;
    }
  });
  OJ.EvpKDF = function (rX, rl, rz) {
    ;
    ;
    return OY.create(rz).compute(rX, rl);
  };
  OQ.lib.Cipher || (r5 = (Ch = OQ).lib, OS = r5.Base, OM = r5.WordArray, OG = r5.BufferedBlockAlgorithm, (OJ = Ch.enc).Utf8, Oo = OJ.Base64, OD = Ch.algo.EvpKDF, Of = r5.Cipher = OG.extend({
    'cfg': OS.extend(),
    'createEncryptor': function (rX, rl) {
      ;
      return this.create(this['_ENC_XFORM_MODE'], rX, rl);
    },
    'createDecryptor': function (rX, rl) {
      ;
      return this.create(this['_DEC_XFORM_MODE'], rX, rl);
    },
    'init': function (rX, rl, rz) {
      ;
      ;
      ;
      this.cfg = this.cfg.extend(rz);
      this['_xformMode'] = rX;
      this['_key'] = rl;
      this.reset();
    },
    'reset': function () {
      ;
      ;
      OG.reset.call(this);
      this['_doReset']();
    },
    'process': function (rX) {
      ;
      ;
      return this['_append'](rX), this['_process']();
    },
    'finalize': function (rX) {
      ;
      ;
      return rX && this['_append'](rX), this['_doFinalize']();
    },
    'keySize': 4,
    'ivSize': 4,
    '_ENC_XFORM_MODE': 1,
    '_DEC_XFORM_MODE': 2,
    '_createHelper': function (rX) {
      return {
        'encrypt': function (rl, rz, rU) {
          return CB(rz).encrypt(rX, rl, rz, rU);
        },
        'decrypt': function (rl, rz, rU) {
          return CB(rz).decrypt(rX, rl, rz, rU);
        }
      };
    }
  }), r5.StreamCipher = Of.extend({
    '_doFinalize': function () {
      ;
      return this['_process'](true);
    },
    'blockSize': 1
  }), OJ = Ch.mode = {}, OB = r5.BlockCipherMode = OS.extend({
    'createEncryptor': function (rX, rl) {
      ;
      return this.Encryptor.create(rX, rl);
    },
    'createDecryptor': function (rX, rl) {
      ;
      ;
      return this.Decryptor.create(rX, rl);
    },
    'init': function (rX, rl) {
      ;
      ;
      this['_cipher'] = rX;
      this['_iv'] = rl;
    }
  }), OB = OJ.CBC = ((OJ = OB.extend()).Encryptor = OJ.extend({
    'processBlock': function (rX, rl) {
      ;
      var rz = this['_cipher'], rU = rz.blockSize;
      ;
      ;
      Cy.call(this, rX, rl, rU);
      rz.encryptBlock(rX, rl);
      this['_prevBlock'] = rX.slice(rl, rl + rU);
    }
  }), OJ.Decryptor = OJ.extend({
    'processBlock': function (rX, rl) {
      ;
      ;
      var rz = this['_cipher'], rU = rz.blockSize, rd = rX.slice(rl, rl + rU);
      rz.decryptBlock(rX, rl);
      Cy.call(this, rX, rl, rU);
      this['_prevBlock'] = rd;
    }
  }), OJ), OJ = (Ch.pad = {}).Pkcs7 = {
    'pad': function (rX, rl) {
      ;
      ;
      for (var rl = 4 * rl, rz = rl - rX.sigBytes % rl, rU = rz << 24 | rz << 16 | rz << 8 | rz, rd = [], rg = 0; rg < rz; rg += 4) {
        rd.push(rU);
      }
      ;
      rl = OM.create(rd, rz);
      rX.concat(rl);
    },
    'unpad': function (rX) {
      ;
      ;
      ;
      var rl = 255 & rX.words[rX.sigBytes - 1 >>> 2];
      rX.sigBytes -= rl;
    }
  }, r5.BlockCipher = Of.extend({
    'cfg': Of.cfg.extend({
      'mode': OB,
      'padding': OJ
    }),
    'reset': function () {
      ;
      Of.reset.call(this);
      ;
      ;
      var rX, rl = this.cfg, rz = rl.iv, rl = rl.mode;
      this['_xformMode'] == this['_ENC_XFORM_MODE'] ? rX = rl.createEncryptor : (rX = rl.createDecryptor, this['_minBufferSize'] = 1);
      this['_mode'] && this['_mode']['__creator'] == rX ? this['_mode'].init(this, rz && rz.words) : (this['_mode'] = rX.call(rl, this, rz && rz.words), this['_mode']['__creator'] = rX);
    },
    '_doProcessBlock': function (rX, rl) {
      ;
      ;
      this['_mode'].processBlock(rX, rl);
    },
    '_doFinalize': function () {
      ;
      var rX, rl = this.cfg.padding;
      ;
      ;
      return this['_xformMode'] == this['_ENC_XFORM_MODE'] ? (rl.pad(this['_data'], this.blockSize), rX = this['_process'](true)) : (rX = this['_process'](true), rl.unpad(rX)), rX;
    },
    'blockSize': 4
  }), ON = r5.CipherParams = OS.extend({
    'init': function (rX) {
      ;
      this.mixIn(rX);
    },
    'toString': function (rX) {
      ;
      ;
      return (rX || this.formatter).stringify(this);
    }
  }), OB = (Ch.format = {}).OpenSSL = {
    'stringify': function (rX) {
      ;
      ;
      ;
      var rl = rX.ciphertext, rX = rX.salt, rX = rX ? OM.create([
        1398893684,
        1701076831
      ]).concat(rX).concat(rl) : rl;
      return rX.toString(Oo);
    },
    'parse': function (rX) {
      var rl, rX = Oo.parse(rX), rz = rX.words;
      ;
      ;
      ;
      return 1398893684 == rz[0] && 1701076831 == rz[1] && (rl = OM.create(rz.slice(2, 4)), rz.splice(0, 4), rX.sigBytes -= 16), ON.create({
        'ciphertext': rX,
        'salt': rl
      });
    }
  }, Om = r5.SerializableCipher = OS.extend({
    'cfg': OS.extend({ 'format': OB }),
    'encrypt': function (rX, rl, rz, rU) {
      rU = this.cfg.extend(rU);
      ;
      ;
      ;
      var rd = rX.createEncryptor(rz, rU), rl = rd.finalize(rl), rd = rd.cfg;
      return ON.create({
        'ciphertext': rl,
        'key': rz,
        'iv': rd.iv,
        'algorithm': rX,
        'mode': rd.mode,
        'padding': rd.padding,
        'blockSize': rX.blockSize,
        'formatter': rU.format
      });
    },
    'decrypt': function (rX, rl, rz, rU) {
      ;
      ;
      ;
      return rU = this.cfg.extend(rU), rl = this['_parse'](rl, rU.format), rX.createDecryptor(rz, rU).finalize(rl.ciphertext);
    },
    '_parse': function (rX, rl) {
      ;
      ;
      return 'string' == typeof rX ? rl.parse(rX, this) : rX;
    }
  }), OJ = (Ch.kdf = {}).OpenSSL = {
    'execute': function (rX, rl, rz, rU) {
      ;
      ;
      rX = OD.create({ 'keySize': rl + rz }).compute(rX, rU);
      rz = OM.create(rX.words.slice(rl), 4 * rz);
      rX = OD.create({ 'keySize': rl + rz }).compute(rX, rU), rz = OM.create(rX.words.slice(rl), 4 * rz);
      ;
      return rX.sigBytes = 4 * rl, ON.create({
        'key': rX,
        'iv': rz,
        'salt': rU
      });
    }
  }, OW = r5.PasswordBasedCipher = Om.extend({
    'cfg': Om.cfg.extend({ 'kdf': OJ }),
    'encrypt': function (rX, rl, rz, rU) {
      ;
      ;
      ;
      return rz = (rU = this.cfg.extend(rU)).kdf.execute(rz, rX.keySize, rX.ivSize), rU.iv = rz.iv, rX = Om.encrypt.call(this, rX, rl, rz.key, rU), (rX.mixIn(rz), rX);
    },
    'decrypt': function (rX, rl, rz, rU) {
      ;
      rU = this.cfg.extend(rU);
      rl = this['_parse'](rl, rU.format);
      ;
      rz = rU.kdf.execute(rz, rX.keySize, rX.ivSize, rl.salt);
      ;
      return rU.iv = rz.iv, Om.decrypt.call(this, rX, rl, rz.key, rU);
    }
  }));
  OQ.mode.CFB = ((OS = OQ.lib.BlockCipherMode.extend()).Encryptor = OS.extend({
    'processBlock': function (rX, rl) {
      var rz = this['_cipher'], rU = rz.blockSize;
      ;
      CV.call(this, rX, rl, rU, rz);
      this['_prevBlock'] = rX.slice(rl, rl + rU);
    }
  }), OS.Decryptor = OS.extend({
    'processBlock': function (rX, rl) {
      var rz = this['_cipher'], rU = rz.blockSize, rd = rX.slice(rl, rl + rU);
      ;
      ;
      CV.call(this, rX, rl, rU, rz);
      this['_prevBlock'] = rd;
    }
  }), OS);
  OQ.mode.CTR = (OB = OQ.lib.BlockCipherMode.extend(), Ch = OB.Encryptor = OB.extend({
    'processBlock': function (rX, rl) {
      ;
      var rz = this['_cipher'], rU = rz.blockSize, rd = this['_iv'], rg = this['_counter'], rE = (rd && (rg = this['_counter'] = rd.slice(0), this['_iv'] = void 0), rg.slice(0));
      ;
      ;
      rz.encryptBlock(rE, 0);
      rg[rU - 1] = rg[rU - 1] + 1 | 0;
      for (var rv = 0; rv < rU; rv++) {
        rX[rl + rv] ^= rE[rv];
      }
    }
  }), OB.Decryptor = Ch, OB);
  OQ.mode.CTRGladman = (r5 = OQ.lib.BlockCipherMode.extend(), OJ = r5.Encryptor = r5.extend({
    'processBlock': function (rX, rl) {
      var rz = this['_cipher'], rU = rz.blockSize, rd = this['_iv'], rg = this['_counter'], rE = (rd && (rg = this['_counter'] = rd.slice(0), this['_iv'] = void 0), 0 === ((rd = rg)[0] = CH(rd[0])) && (rd[1] = CH(rd[1])), rg.slice(0));
      ;
      ;
      ;
      rz.encryptBlock(rE, 0);
      for (var rv = 0; rv < rU; rv++) {
        rX[rl + rv] ^= rE[rv];
      }
    }
  }), r5.Decryptor = OJ, r5);
  OQ.mode.OFB = (OS = OQ.lib.BlockCipherMode.extend(), Ch = OS.Encryptor = OS.extend({
    'processBlock': function (rX, rl) {
      ;
      ;
      var rz = this['_cipher'], rU = rz.blockSize, rd = this['_iv'], rg = this['_keystream'];
      ;
      rd && (rg = this['_keystream'] = rd.slice(0), this['_iv'] = void 0);
      rz.encryptBlock(rg, 0);
      for (var rE = 0; rE < rU; rE++) {
        rX[rl + rE] ^= rg[rE];
      }
    }
  }), OS.Decryptor = Ch, OS);
  OQ.mode.ECB = ((OJ = OQ.lib.BlockCipherMode.extend()).Encryptor = OJ.extend({
    'processBlock': function (rX, rl) {
      ;
      this['_cipher'].encryptBlock(rX, rl);
    }
  }), OJ.Decryptor = OJ.extend({
    'processBlock': function (rX, rl) {
      ;
      ;
      this['_cipher'].decryptBlock(rX, rl);
    }
  }), OJ);
  OQ.pad.AnsiX923 = {
    'pad': function (rX, rl) {
      var rz = rX.sigBytes, rl = 4 * rl, rl = rl - rz % rl, rz = rz + rl - 1;
      ;
      ;
      rX.clamp();
      rX.words[rz >>> 2] |= rl << 24 - rz % 4 * 8;
      rX.sigBytes += rl;
    },
    'unpad': function (rX) {
      ;
      ;
      ;
      var rl = 255 & rX.words[rX.sigBytes - 1 >>> 2];
      rX.sigBytes -= rl;
    }
  };
  OQ.pad.Iso10126 = {
    'pad': function (rX, rl) {
      ;
      ;
      ;
      rl *= 4;
      rl -= rX.sigBytes % rl;
      rX.concat(OQ.lib.WordArray.random(rl - 1)).concat(OQ.lib.WordArray.create([rl << 24], 1));
    },
    'unpad': function (rX) {
      ;
      var rl = 255 & rX.words[rX.sigBytes - 1 >>> 2];
      rX.sigBytes -= rl;
    }
  };
  OQ.pad.Iso97971 = {
    'pad': function (rX, rl) {
      ;
      ;
      ;
      rX.concat(OQ.lib.WordArray.create([2147483648], 1));
      OQ.pad.ZeroPadding.pad(rX, rl);
    },
    'unpad': function (rX) {
      ;
      ;
      OQ.pad.ZeroPadding.unpad(rX);
      rX.sigBytes--;
    }
  };
  OQ.pad.ZeroPadding = {
    'pad': function (rX, rl) {
      rl *= 4;
      ;
      ;
      rX.clamp();
      rX.sigBytes += rl - (rX.sigBytes % rl || rl);
    },
    'unpad': function (rX) {
      ;
      ;
      for (var rl = rX.words, rz = rX.sigBytes - 1, rz = rX.sigBytes - 1; 0 <= rz; rz--) {
        if (rl[rz >>> 2] >>> 24 - rz % 4 * 8 & 255) {
          rX.sigBytes = rz + 1;
          break;
        }
      }
    }
  };
  OQ.pad.NoPadding = {
    'pad': function () {
    },
    'unpad': function () {
    }
  };
  Oy = (r5 = OQ).lib.CipherParams;
  OV = r5.enc.Hex;
  r5.format.Hex = {
    'stringify': function (rX) {
      ;
      return rX.ciphertext.toString(OV);
    },
    'parse': function (rX) {
      ;
      rX = OV.parse(rX);
      ;
      return Oy.create({ 'ciphertext': rX });
    }
  };
  for (var Ch = OQ, OS = Ch.lib.BlockCipher, OJ = Ch.algo, CZ = [], CT = [], Cs = [], Cp = [], CQ = [], CJ = [], CK = [], CL = [], CS = [], Cx = [], Ca = [], Ck = 0; Ck < 256; Ck++) {
    Ca[Ck] = Ck < 128 ? Ck << 1 : Ck << 1 ^ 283;
  }
  for (var Cw = 0, Cu = 0, Ck = 0; Ck < 256; Ck++) {
    var Cn = Cu ^ Cu << 1 ^ Cu << 2 ^ Cu << 3 ^ Cu << 4, r0 = Ca[CT[CZ[Cw] = Cn = Cn >>> 8 ^ 255 & Cn ^ 99] = Cw], r1 = Ca[r0], r2 = Ca[r1], r3 = 257 * Ca[Cn] ^ 16843008 * Cn;
    Cs[Cw] = r3 << 24 | r3 >>> 8;
    Cp[Cw] = r3 << 16 | r3 >>> 16;
    CQ[Cw] = r3 << 8 | r3 >>> 24;
    CJ[Cw] = r3;
    CK[Cn] = (r3 = 16843009 * r2 ^ 65537 * r1 ^ 257 * r0 ^ 16843008 * Cw) << 24 | r3 >>> 8;
    CL[Cn] = r3 << 16 | r3 >>> 16;
    CS[Cn] = r3 << 8 | r3 >>> 24;
    Cx[Cn] = r3;
    Cw ? (Cw = r0 ^ Ca[Ca[Ca[r2 ^ r0]]], Cu ^= Ca[Ca[Cu]]) : Cw = Cu = 1;
  }
  ;
  var r4 = [
    0,
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
    27,
    54
  ], OJ = OJ.AES = OS.extend({
    '_doReset': function () {
      ;
      ;
      ;
      if (!this['_nRounds'] || this['_keyPriorReset'] !== this['_key']) {
        for (var rX = this['_keyPriorReset'] = this['_key'], rl = rX.words, rz = rX.sigBytes / 4, rU = 4 * (1 + (this['_nRounds'] = 6 + rz)), rd = this['_keySchedule'] = [], rg = 0; rg < rU; rg++) {
          rg < rz ? rd[rg] = rl[rg] : (rb = rd[rg - 1], rg % rz ? 6 < rz && rg % rz == 4 && (rb = CZ[rb >>> 24] << 24 | CZ[rb >>> 16 & 255] << 16 | CZ[rb >>> 8 & 255] << 8 | CZ[255 & rb]) : (rb = CZ[(rb = rb << 8 | rb >>> 24) >>> 24] << 24 | CZ[rb >>> 16 & 255] << 16 | CZ[rb >>> 8 & 255] << 8 | CZ[255 & rb], rb ^= r4[rg / rz | 0] << 24), rd[rg] = rd[rg - rz] ^ rb);
        }
        for (var rE = this['_invKeySchedule'] = [], rv = 0; rv < rU; rv++) {
          var rb, rg = rU - rv;
          rb = rv % 4 ? rd[rg] : rd[rg - 4];
          rE[rv] = rv < 4 || rg <= 4 ? rb : CK[CZ[rb >>> 24]] ^ CL[CZ[rb >>> 16 & 255]] ^ CS[CZ[rb >>> 8 & 255]] ^ Cx[CZ[255 & rb]];
        }
      }
    },
    'encryptBlock': function (rX, rl) {
      ;
      ;
      this['_doCryptBlock'](rX, rl, this['_keySchedule'], Cs, Cp, CQ, CJ, CZ);
    },
    'decryptBlock': function (rX, rl) {
      ;
      var rz = rX[rl + 1], rz = (rX[rl + 1] = rX[rl + 3], rX[rl + 3] = rz, this['_doCryptBlock'](rX, rl, this['_invKeySchedule'], CK, CL, CS, Cx, CT), rX[rl + 1]);
      rX[rl + 1] = rX[rl + 3];
      rX[rl + 3] = rz;
    },
    '_doCryptBlock': function (rX, rl, rz, rU, rd, rg, rE, rv) {
      ;
      for (var rb = this['_nRounds'], rF = rX[rl] ^ rz[0], rP = rX[rl + 1] ^ rz[1], rc = rX[rl + 2] ^ rz[2], rY = rX[rl + 3] ^ rz[3], rM = 4, rG = 1; rG < rb; rG++) {
        var ro = rU[rF >>> 24] ^ rd[rP >>> 16 & 255] ^ rg[rc >>> 8 & 255] ^ rE[255 & rY] ^ rz[rM++], rD = rU[rP >>> 24] ^ rd[rc >>> 16 & 255] ^ rg[rY >>> 8 & 255] ^ rE[255 & rF] ^ rz[rM++], rf = rU[rc >>> 24] ^ rd[rY >>> 16 & 255] ^ rg[rF >>> 8 & 255] ^ rE[255 & rP] ^ rz[rM++], rN = rU[rY >>> 24] ^ rd[rF >>> 16 & 255] ^ rg[rP >>> 8 & 255] ^ rE[255 & rc] ^ rz[rM++], rF = ro, rP = rD, rc = rf, rY = rN;
      }
      rX[rl] = ro;
      rX[rl + 1] = rD;
      rX[rl + 2] = rf;
      rX[rl + 3] = rN;
      rD = (rv[rP >>> 24] << 24 | rv[rc >>> 16 & 255] << 16 | rv[rY >>> 8 & 255] << 8 | rv[255 & rF]) ^ rz[rM++];
      rf = (rv[rc >>> 24] << 24 | rv[rY >>> 16 & 255] << 16 | rv[rF >>> 8 & 255] << 8 | rv[255 & rP]) ^ rz[rM++];
      rN = (rv[rY >>> 24] << 24 | rv[rF >>> 16 & 255] << 16 | rv[rP >>> 8 & 255] << 8 | rv[255 & rc]) ^ rz[rM++];
      rX[rl] = ro, rX[rl + 1] = rD, rX[rl + 2] = rf, rX[rl + 3] = rN;
    },
    'keySize': 8
  }), r5 = (Ch.AES = OS['_createHelper'](OJ), OQ), r6 = (Ch = r5.lib).WordArray, Ch = Ch.BlockCipher, OS = r5.algo, r7 = [
    57,
    49,
    41,
    33,
    25,
    17,
    9,
    1,
    58,
    50,
    42,
    34,
    26,
    18,
    10,
    2,
    59,
    51,
    43,
    35,
    27,
    19,
    11,
    3,
    60,
    52,
    44,
    36,
    63,
    55,
    47,
    39,
    31,
    23,
    15,
    7,
    62,
    54,
    46,
    38,
    30,
    22,
    14,
    6,
    61,
    53,
    45,
    37,
    29,
    21,
    13,
    5,
    28,
    20,
    12,
    4
  ], r8 = [
    14,
    17,
    11,
    24,
    1,
    5,
    3,
    28,
    15,
    6,
    21,
    10,
    23,
    19,
    12,
    4,
    26,
    8,
    16,
    7,
    27,
    20,
    13,
    2,
    41,
    52,
    31,
    37,
    47,
    55,
    30,
    40,
    51,
    45,
    33,
    48,
    44,
    49,
    39,
    56,
    34,
    53,
    46,
    42,
    50,
    36,
    29,
    32
  ], r9 = [
    1,
    2,
    4,
    6,
    8,
    10,
    12,
    14,
    15,
    17,
    19,
    21,
    23,
    25,
    27,
    28
  ], rO = [
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
  ], rC = [
    4160749569,
    528482304,
    33030144,
    2064384,
    129024,
    8064,
    504,
    2147483679
  ], rr = OS.DES = Ch.extend({
    '_doReset': function () {
      ;
      for (var rX = this['_key'].words, rl = [], rz = 0; rz < 56; rz++) {
        var rU = r7[rz] - 1;
        rl[rz] = rX[rU >>> 5] >>> 31 - rU % 32 & 1;
      }
      ;
      for (var rd = this['_subKeys'] = [], rg = 0; rg < 16; rg++) {
        for (var rE = rd[rg] = [], rv = r9[rg], rz = 0; rz < 24; rz++) {
          rE[rz / 6 | 0] |= rl[(r8[rz] - 1 + rv) % 28] << 31 - rz % 6;
          rE[4 + (rz / 6 | 0)] |= rl[28 + (r8[rz + 24] - 1 + rv) % 28] << 31 - rz % 6;
        }
        rE[0] = rE[0] << 1 | rE[0] >>> 31;
        for (rz = 1; rz < 7; rz++) {
          rE[rz] = rE[rz] >>> 4 * (rz - 1) + 3;
        }
        rE[7] = rE[7] << 5 | rE[7] >>> 27;
      }
      for (var rb = this['_invSubKeys'] = [], rz = 0; rz < 16; rz++) {
        rb[rz] = rd[15 - rz];
      }
    },
    'encryptBlock': function (rX, rl) {
      ;
      this['_doCryptBlock'](rX, rl, this['_subKeys']);
    },
    'decryptBlock': function (rX, rl) {
      ;
      this['_doCryptBlock'](rX, rl, this['_invSubKeys']);
    },
    '_doCryptBlock': function (rX, rl, rz) {
      this['_lBlock'] = rX[rl];
      this['_rBlock'] = rX[rl + 1];
      rA.call(this, 4, 252645135);
      rA.call(this, 16, 65535);
      rj.call(this, 2, 858993459);
      rj.call(this, 8, 16711935);
      rA.call(this, 1, 1431655765);
      ;
      ;
      ;
      for (var rU = 0; rU < 16; rU++) {
        for (var rd = rz[rU], rg = this['_lBlock'], rE = this['_rBlock'], rv = 0, rb = 0; rb < 8; rb++) {
          rv |= rO[rb][((rE ^ rd[rb]) & rC[rb]) >>> 0];
        }
        this['_lBlock'] = rE;
        this['_rBlock'] = rg ^ rv;
      }
      var rF = this['_lBlock'];
      this['_lBlock'] = this['_rBlock'];
      this['_rBlock'] = rF;
      rA.call(this, 1, 1431655765);
      rj.call(this, 8, 16711935);
      rj.call(this, 2, 858993459);
      rA.call(this, 16, 65535);
      rA.call(this, 4, 252645135);
      rX[rl] = this['_lBlock'];
      rX[rl + 1] = this['_rBlock'];
    },
    'keySize': 2,
    'ivSize': 2,
    'blockSize': 2
  });
  function rA(rX, rl) {
    rl = (this['_lBlock'] >>> rX ^ this['_rBlock']) & rl;
    ;
    ;
    this['_rBlock'] ^= rl;
    this['_lBlock'] ^= rl << rX;
  }
  function rj(rX, rl) {
    ;
    rl = (this['_rBlock'] >>> rX ^ this['_lBlock']) & rl;
    ;
    this['_lBlock'] ^= rl;
    this['_rBlock'] ^= rl << rX;
  }
  r5.DES = Ch['_createHelper'](rr);
  OS = OS.TripleDES = Ch.extend({
    '_doReset': function () {
      var rX = this['_key'].words;
      ;
      if (2 !== rX.length && 4 !== rX.length && rX.length < 6) {
        throw new Error('Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.');
      }
      ;
      var rl = rX.slice(0, 2), rz = rX.length < 4 ? rX.slice(0, 2) : rX.slice(2, 4), rX = rX.length < 6 ? rX.slice(0, 2) : rX.slice(4, 6);
      ;
      this['_des1'] = rr.createEncryptor(r6.create(rl));
      this['_des2'] = rr.createEncryptor(r6.create(rz));
      this['_des3'] = rr.createEncryptor(r6.create(rX));
    },
    'encryptBlock': function (rX, rl) {
      ;
      ;
      this['_des1'].encryptBlock(rX, rl);
      this['_des2'].decryptBlock(rX, rl);
      this['_des3'].encryptBlock(rX, rl);
    },
    'decryptBlock': function (rX, rl) {
      ;
      this['_des3'].decryptBlock(rX, rl);
      this['_des2'].encryptBlock(rX, rl);
      this['_des1'].decryptBlock(rX, rl);
    },
    'keySize': 6,
    'ivSize': 2,
    'blockSize': 2
  });
  r5.TripleDES = Ch['_createHelper'](OS);
  var OJ = OQ, r5 = OJ.lib.StreamCipher, Ch = OJ.algo, rI = Ch.RC4 = r5.extend({
    '_doReset': function () {
      for (var rX = this['_key'], rl = rX.words, rz = rX.sigBytes, rU = this['_S'] = [], rd = 0; rd < 256; rd++) {
        rU[rd] = rd;
      }
      ;
      for (var rd = 0, rg = 0; rd < 256; rd++) {
        var rE = rd % rz, rE = rl[rE >>> 2] >>> 24 - rE % 4 * 8 & 255, rg = (rg + rU[rd] + rE) % 256, rE = rU[rd];
        rU[rd] = rU[rg];
        rU[rg] = rE;
      }
      this['_i'] = this['_j'] = 0;
    },
    '_doProcessBlock': function (rX, rl) {
      rX[rl] ^= rR.call(this);
    },
    'keySize': 8,
    'ivSize': 0
  });
  function rR() {
    for (var rX = this['_S'], rl = this['_i'], rz = this['_j'], rU = 0, rd = 0; rd < 4; rd++) {
      var rz = (rz + rX[rl = (rl + 1) % 256]) % 256, rg = rX[rl];
      rX[rl] = rX[rz];
      rX[rz] = rg;
      rU |= rX[(rX[rl] + rX[rz]) % 256] << 24 - 8 * rd;
    }
    return this['_i'] = rl, this['_j'] = rz, rU;
  }
  function ri() {
    for (var rX = this['_X'], rl = this['_C'], rz = 0; rz < 8; rz++) {
      Oh[rz] = rl[rz];
    }
    rl[0] = rl[0] + 1295307597 + this['_b'] | 0;
    rl[1] = rl[1] + 3545052371 + (rl[0] >>> 0 < Oh[0] >>> 0 ? 1 : 0) | 0;
    rl[2] = rl[2] + 886263092 + (rl[1] >>> 0 < Oh[1] >>> 0 ? 1 : 0) | 0;
    rl[3] = rl[3] + 1295307597 + (rl[2] >>> 0 < Oh[2] >>> 0 ? 1 : 0) | 0;
    rl[4] = rl[4] + 3545052371 + (rl[3] >>> 0 < Oh[3] >>> 0 ? 1 : 0) | 0;
    rl[5] = rl[5] + 886263092 + (rl[4] >>> 0 < Oh[4] >>> 0 ? 1 : 0) | 0;
    rl[6] = rl[6] + 1295307597 + (rl[5] >>> 0 < Oh[5] >>> 0 ? 1 : 0) | 0;
    rl[7] = rl[7] + 3545052371 + (rl[6] >>> 0 < Oh[6] >>> 0 ? 1 : 0) | 0;
    this['_b'] = rl[7] >>> 0 < Oh[7] >>> 0 ? 1 : 0;
    for (rz = 0; rz < 8; rz++) {
      var rU = rX[rz] + rl[rz], rd = 65535 & rU, rg = rU >>> 16;
      OZ[rz] = ((rd * rd >>> 17) + rd * rg >>> 15) + rg * rg ^ ((4294901760 & rU) * rU | 0) + ((65535 & rU) * rU | 0);
    }
    rX[0] = OZ[0] + (OZ[7] << 16 | OZ[7] >>> 16) + (OZ[6] << 16 | OZ[6] >>> 16) | 0;
    rX[1] = OZ[1] + (OZ[0] << 8 | OZ[0] >>> 24) + OZ[7] | 0;
    rX[2] = OZ[2] + (OZ[1] << 16 | OZ[1] >>> 16) + (OZ[0] << 16 | OZ[0] >>> 16) | 0;
    rX[3] = OZ[3] + (OZ[2] << 8 | OZ[2] >>> 24) + OZ[1] | 0;
    rX[4] = OZ[4] + (OZ[3] << 16 | OZ[3] >>> 16) + (OZ[2] << 16 | OZ[2] >>> 16) | 0;
    rX[5] = OZ[5] + (OZ[4] << 8 | OZ[4] >>> 24) + OZ[3] | 0;
    rX[6] = OZ[6] + (OZ[5] << 16 | OZ[5] >>> 16) + (OZ[4] << 16 | OZ[4] >>> 16) | 0;
    rX[7] = OZ[7] + (OZ[6] << 8 | OZ[6] >>> 24) + OZ[5] | 0;
  }
  function rq() {
    for (var rX = this['_X'], rl = this['_C'], rz = 0; rz < 8; rz++) {
      Os[rz] = rl[rz];
    }
    rl[0] = rl[0] + 1295307597 + this['_b'] | 0;
    rl[1] = rl[1] + 3545052371 + (rl[0] >>> 0 < Os[0] >>> 0 ? 1 : 0) | 0;
    rl[2] = rl[2] + 886263092 + (rl[1] >>> 0 < Os[1] >>> 0 ? 1 : 0) | 0;
    rl[3] = rl[3] + 1295307597 + (rl[2] >>> 0 < Os[2] >>> 0 ? 1 : 0) | 0;
    rl[4] = rl[4] + 3545052371 + (rl[3] >>> 0 < Os[3] >>> 0 ? 1 : 0) | 0;
    rl[5] = rl[5] + 886263092 + (rl[4] >>> 0 < Os[4] >>> 0 ? 1 : 0) | 0;
    rl[6] = rl[6] + 1295307597 + (rl[5] >>> 0 < Os[5] >>> 0 ? 1 : 0) | 0;
    rl[7] = rl[7] + 3545052371 + (rl[6] >>> 0 < Os[6] >>> 0 ? 1 : 0) | 0;
    this['_b'] = rl[7] >>> 0 < Os[7] >>> 0 ? 1 : 0;
    for (rz = 0; rz < 8; rz++) {
      var rU = rX[rz] + rl[rz], rd = 65535 & rU, rg = rU >>> 16;
      Op[rz] = ((rd * rd >>> 17) + rd * rg >>> 15) + rg * rg ^ ((4294901760 & rU) * rU | 0) + ((65535 & rU) * rU | 0);
    }
    rX[0] = Op[0] + (Op[7] << 16 | Op[7] >>> 16) + (Op[6] << 16 | Op[6] >>> 16) | 0;
    rX[1] = Op[1] + (Op[0] << 8 | Op[0] >>> 24) + Op[7] | 0;
    rX[2] = Op[2] + (Op[1] << 16 | Op[1] >>> 16) + (Op[0] << 16 | Op[0] >>> 16) | 0;
    rX[3] = Op[3] + (Op[2] << 8 | Op[2] >>> 24) + Op[1] | 0;
    rX[4] = Op[4] + (Op[3] << 16 | Op[3] >>> 16) + (Op[2] << 16 | Op[2] >>> 16) | 0;
    rX[5] = Op[5] + (Op[4] << 8 | Op[4] >>> 24) + Op[3] | 0;
    rX[6] = Op[6] + (Op[5] << 16 | Op[5] >>> 16) + (Op[4] << 16 | Op[4] >>> 16) | 0;
    rX[7] = Op[7] + (Op[6] << 8 | Op[6] >>> 24) + Op[5] | 0;
  }
  return OJ.RC4 = r5['_createHelper'](rI), Ch = Ch.RC4Drop = rI.extend({
    'cfg': rI.cfg.extend({ 'drop': 192 }),
    '_doReset': function () {
      ;
      rI['_doReset'].call(this);
      ;
      for (var rX = this.cfg.drop; 0 < rX; rX--) {
        rR.call(this);
      }
    }
  }), OJ.RC4Drop = r5['_createHelper'](Ch), OJ = (OS = OQ).lib.StreamCipher, r5 = OS.algo, OH = [], Oh = [], OZ = [], r5 = r5.Rabbit = OJ.extend({
    '_doReset': function () {
      ;
      for (var rX = this['_key'].words, rl = this.cfg.iv, rz = 0; rz < 4; rz++) {
        rX[rz] = 16711935 & (rX[rz] << 8 | rX[rz] >>> 24) | 4278255360 & (rX[rz] << 24 | rX[rz] >>> 8);
      }
      ;
      ;
      for (var rU = this['_X'] = [
        rX[0],
        rX[3] << 16 | rX[2] >>> 16,
        rX[1],
        rX[0] << 16 | rX[3] >>> 16,
        rX[2],
        rX[1] << 16 | rX[0] >>> 16,
        rX[3],
        rX[2] << 16 | rX[1] >>> 16
      ], rd = this['_C'] = [
        rX[2] << 16 | rX[2] >>> 16,
        4294901760 & rX[0] | 65535 & rX[1],
        rX[3] << 16 | rX[3] >>> 16,
        4294901760 & rX[1] | 65535 & rX[2],
        rX[0] << 16 | rX[0] >>> 16,
        4294901760 & rX[2] | 65535 & rX[3],
        rX[1] << 16 | rX[1] >>> 16,
        4294901760 & rX[3] | 65535 & rX[0]
      ], rz = this['_b'] = 0; rz < 4; rz++) {
        ri.call(this);
      }
      for (rz = 0; rz < 8; rz++) {
        ;
      }
      if (rl) {
        var rl = rl.words, rg = rl[0], rl = rl[1], rg = 16711935 & (rg << 8 | rg >>> 24) | 4278255360 & (rg << 24 | rg >>> 8), rl = 16711935 & (rl << 8 | rl >>> 24) | 4278255360 & (rl << 24 | rl >>> 8), rE = rg >>> 16 | 4294901760 & rl, rv = rl << 16 | 65535 & rg;
        rd[0] ^= rg;
        rd[1] ^= rE;
        rd[2] ^= rl;
        rd[3] ^= rv;
        rd[4] ^= rg;
        rd[5] ^= rE;
        rd[6] ^= rl;
        rd[7] ^= rv;
        for (rz = 0; rz < 4; rz++) {
          ri.call(this);
        }
      }
    },
    '_doProcessBlock': function (rX, rl) {
      var rz = this['_X'];
      ri.call(this);
      OH[0] = rz[0] ^ rz[5] >>> 16 ^ rz[3] << 16;
      OH[1] = rz[2] ^ rz[7] >>> 16 ^ rz[5] << 16;
      OH[2] = rz[4] ^ rz[1] >>> 16 ^ rz[7] << 16;
      OH[3] = rz[6] ^ rz[3] >>> 16 ^ rz[1] << 16;
      ;
      for (var rU = 0; rU < 4; rU++) {
        OH[rU] = 16711935 & (OH[rU] << 8 | OH[rU] >>> 24) | 4278255360 & (OH[rU] << 24 | OH[rU] >>> 8);
        rX[rl + rU] ^= OH[rU];
      }
    },
    'blockSize': 4,
    'ivSize': 2
  }), OS.Rabbit = OJ['_createHelper'](r5), OS = (Ch = OQ).lib.StreamCipher, OJ = Ch.algo, OT = [], Os = [], Op = [], OJ = OJ.RabbitLegacy = OS.extend({
    '_doReset': function () {
      ;
      ;
      for (var rX = this['_key'].words, rl = this.cfg.iv, rz = this['_X'] = [
        rX[0],
        rX[3] << 16 | rX[2] >>> 16,
        rX[1],
        rX[0] << 16 | rX[3] >>> 16,
        rX[2],
        rX[1] << 16 | rX[0] >>> 16,
        rX[3],
        rX[2] << 16 | rX[1] >>> 16
      ], rU = this['_C'] = [
        rX[2] << 16 | rX[2] >>> 16,
        4294901760 & rX[0] | 65535 & rX[1],
        rX[3] << 16 | rX[3] >>> 16,
        4294901760 & rX[1] | 65535 & rX[2],
        rX[0] << 16 | rX[0] >>> 16,
        4294901760 & rX[2] | 65535 & rX[3],
        rX[1] << 16 | rX[1] >>> 16,
        4294901760 & rX[3] | 65535 & rX[0]
      ], rd = this['_b'] = 0; rd < 4; rd++) {
        rq.call(this);
      }
      ;
      for (rd = 0; rd < 8; rd++) {
        rU[rd] ^= rz[rd + 4 & 7];
      }
      if (rl) {
        var rX = rl.words, rl = rX[0], rX = rX[1], rl = 16711935 & (rl << 8 | rl >>> 24) | 4278255360 & (rl << 24 | rl >>> 8), rX = 16711935 & (rX << 8 | rX >>> 24) | 4278255360 & (rX << 24 | rX >>> 8), rg = rl >>> 16 | 4294901760 & rX, rE = rX << 16 | 65535 & rl;
        rU[0] ^= rl;
        rU[1] ^= rg;
        rU[2] ^= rX;
        rU[3] ^= rE;
        rU[4] ^= rl;
        rU[5] ^= rg;
        rU[6] ^= rX;
        rU[7] ^= rE;
        for (rd = 0; rd < 4; rd++) {
          rq.call(this);
        }
      }
    },
    '_doProcessBlock': function (rX, rl) {
      var rz = this['_X'];
      ;
      rq.call(this);
      OT[0] = rz[0] ^ rz[5] >>> 16 ^ rz[3] << 16;
      OT[1] = rz[2] ^ rz[7] >>> 16 ^ rz[5] << 16;
      OT[2] = rz[4] ^ rz[1] >>> 16 ^ rz[7] << 16;
      OT[3] = rz[6] ^ rz[3] >>> 16 ^ rz[1] << 16;
      for (var rU = 0; rU < 4; rU++) {
        OT[rU] = 16711935 & (OT[rU] << 8 | OT[rU] >>> 24) | 4278255360 & (OT[rU] << 24 | OT[rU] >>> 8);
        rX[rl + rU] ^= OT[rU];
      }
    },
    'blockSize': 4,
    'ivSize': 2
  }), Ch.RabbitLegacy = OS['_createHelper'](OJ), OQ;
}), !function (O5, O6) {
  ;
  ;
  ;
  'object' == typeof exports && 'object' == typeof module ? module.exports = O6() : 'function' == typeof define && define.amd ? define([], O6) : 'object' == typeof exports ? exports.devtoolsDetector = O6() : O5.devtoolsDetector = O6();
}('undefined' != typeof self ? self : this, function () {
  return O6 = [
    function (O8, O9, OO) {
      'use strict';
      ;
      !function (OC) {
        O9.c = function () {
          ;
          ;
          return ('undefined' != typeof performance ? performance : Date).now();
        };
        O9.b = function (Oj) {
          for (var OI = (Oj = void 0 === Oj ? {} : Oj).includes, Oj = Oj.excludes, Oj = void 0 === Oj ? [] : Oj, OR = false, Oi = false, Oq = 0, OX = void 0 === OI ? [] : OI; Oq < OX.length; Oq++) {
            if (true === OX[Oq]) {
              OR = true;
              break;
            }
          }
          for (var Ol = 0, Oz = Oj; Ol < Oz.length; Ol++) {
            if (true === Oz[Ol]) {
              Oi = true;
              break;
            }
          }
          ;
          ;
          ;
          return OR && !Oi;
        };
        O9.d = function (Oj, OI, OR) {
          return Oj = OA.a[Oj], void 0 !== Oj && Object(Or.compare)(Oj, OI, OR);
        };
        O9.a = function () {
          ;
          return 'undefined' != typeof self ? self : 'undefined' != typeof window ? window : void 0 !== OC ? OC : this;
        };
        var Or = OO(11), OA = (OO.n(Or), OO(5));
      }.call(O9, OO(10));
    },
    function (O8, O9, OO) {
      'use strict';
      ;
      OO.d(O9, 'c', function () {
        return Or;
      });
      OO.d(O9, 'd', function () {
        return OA;
      });
      OO.d(O9, 'b', function () {
        return Oj;
      });
      OO.d(O9, 'g', function () {
        return OI;
      });
      OO.d(O9, 'e', function () {
        return OR;
      });
      OO.d(O9, 'a', function () {
        return Oi;
      });
      OO.d(O9, 'f', function () {
        return Oq;
      });
      ;
      ;
      var OC, O9 = OO(3), OO = OO(0), OO = Object(OO.a)(), Or = 'InstallTrigger' in ((null == OO ? void 0 : OO.window) || {}) || /firefox/i.test(O9.b), OA = /trident/i.test(O9.b) || /msie/i.test(O9.b), Oj = /edge/i.test(O9.b), OI = /webkit/i.test(O9.b) && !Oj, OR = /IqiyiApp/.test(O9.b), Oi = void 0 !== (null == (OC = null == OO ? void 0 : OO.window) ? void 0 : OC.chrome) || /chrome/i.test(O9.b) || /CriOS/i.test(O9.b), Oq = '[object SafariRemoteNotification]' === ((null == (OO = null == (OC = null == OO ? void 0 : OO.window) ? void 0 : OC.safari) ? void 0 : OO.pushNotification) || false).toString() || /safari/i.test(O9.b) && !Oi;
    },
    function (O8, O9, OO) {
      'use strict';
      ;
      OO.d(O9, 'b', function () {
        return OA;
      });
      OO.d(O9, 'c', function () {
        return Oj;
      });
      OO.d(O9, 'a', function () {
        return OI;
      });
      ;
      var OC = OO(1);
      function Or(OR) {
        ;
        ;
        if (console) {
          if (!OC.d && !OC.b) {
            return console[OR];
          }
          if ('log' === OR || 'clear' === OR) {
            return function () {
              ;
              for (var Oi = [], Oq = 0; Oq < arguments.length; Oq++) {
                Oi[Oq] = arguments[Oq];
              }
              console[OR].apply(console, Oi);
            };
          }
        }
        return function () {
          ;
          for (var Oi = 0; Oi < arguments.length; Oi++) {
            Oi;
            0;
          }
        };
      }
      var OA = Or('log'), Oj = Or('table'), OI = Or('clear');
    },
    function (O8, O9, OO) {
      'use strict';
      ;
      ;
      O9.a = function () {
        ;
        for (var OA, Oj = [], OI = 0; OI < arguments.length; OI++) {
          Oj[OI] = arguments[OI];
        }
        ;
        return null != OC && OC.document ? (OA = OC.document).createElement.apply(OA, Oj) : {};
      };
      OO.d(O9, 'b', function () {
        return Or;
      });
      var O9 = OO(0), OC = Object(O9.a)(), Or = (null == (OO = null == OC ? void 0 : OC.navigator) ? void 0 : OO.userAgent) || 'xxxxx';
    },
    function (O8, O9, OO) {
      'use strict';
      ;
      ;
      ;
      Object.defineProperty(O9, '__esModule', { 'value': true });
      O9.addListener = function (Ol) {
        OX.addListener(Ol);
      };
      O9.removeListener = function (Ol) {
        OX.removeListener(Ol);
      };
      O9.isLaunch = function () {
        ;
        return OX.isLaunch();
      };
      O9.launch = function () {
        ;
        OX.launch();
      };
      O9.stop = function () {
        OX.stop();
      };
      O9.setDetectDelay = function (Ol) {
        ;
        OX.setDetectDelay(Ol);
      };
      var OC = OO(7), Or = OO(8), OA = (OO.d(O9, 'DevtoolsDetector', function () {
        return OC.a;
      }), OO.d(O9, 'checkers', function () {
        return Or;
      }), OO(0)), Oj = (OO.d(O9, 'match', function () {
        return OA.b;
      }), OO.d(O9, 'specificVersionMatch', function () {
        return OA.d;
      }), OO(1)), OI = (OO.d(O9, 'isFirefox', function () {
        return Oj.c;
      }), OO.d(O9, 'isIE', function () {
        return Oj.d;
      }), OO.d(O9, 'isEdge', function () {
        return Oj.b;
      }), OO.d(O9, 'isWebkit', function () {
        return Oj.g;
      }), OO.d(O9, 'isIqiyiApp', function () {
        return Oj.e;
      }), OO.d(O9, 'isChrome', function () {
        return Oj.a;
      }), OO.d(O9, 'isSafari', function () {
        return Oj.f;
      }), OO(2)), OR = (OO.d(O9, 'log', function () {
        return OI.b;
      }), OO.d(O9, 'table', function () {
        return OI.c;
      }), OO.d(O9, 'clear', function () {
        return OI.a;
      }), OO(19)), Oi = (OO.d(O9, 'isMobile', function () {
        return OR.a;
      }), OO(5)), Oq = (OO.d(O9, 'versionMap', function () {
        return Oi.a;
      }), OO(6)), OX = (OO.d(O9, 'isMac', function () {
        return Oq.d;
      }), OO.d(O9, 'isIpad', function () {
        return Oq.b;
      }), OO.d(O9, 'isIphone', function () {
        return Oq.c;
      }), OO.d(O9, 'isAndroid', function () {
        return Oq.a;
      }), OO.d(O9, 'isWindows', function () {
        return Oq.e;
      }), new OC.a({
        'checkers': [
          Or.erudaChecker,
          Or.elementIdChecker,
          Or.regToStringChecker,
          Or.functionToStringChecker,
          Or.depRegToStringChecker,
          Or.dateToStringChecker,
          Or.performanceChecker,
          Or.debuggerChecker
        ]
      }));
      O9.default = OX;
    },
    function (O8, O9, OO) {
      'use strict';
      ;
      ;
      OO.d(O9, 'a', function () {
        return OC;
      });
      for (var OC = { OI: Oj }, Or = 0, OA = (OO(3).b || '').match(/\w+\/(\d|\.)+(\s|$)/gi) || []; Or < OA.length; Or++) {
        var Oj = OA[Or].split('/'), OI = Oj[0], Oj = Oj[1];
        ;
      }
    },
    function (O8, O9, OO) {
      'use strict';
      ;
      ;
      OO.d(O9, 'd', function () {
        return OC;
      });
      OO.d(O9, 'b', function () {
        return Or;
      });
      OO.d(O9, 'c', function () {
        return OA;
      });
      OO.d(O9, 'a', function () {
        return Oj;
      });
      OO.d(O9, 'e', function () {
        return OI;
      });
      ;
      var O9 = OO(3), OC = /macintosh/i.test(O9.b), Or = /ipad/i.test(O9.b) || OC && 1 < navigator.maxTouchPoints, OA = /iphone/i.test(O9.b), Oj = /android/i.test(O9.b), OI = /windows/i.test(O9.b);
    },
    function (O8, O9, OO) {
      'use strict';
      ;
      OO.d(O9, 'a', function () {
        return OA;
      });
      var OC = this && this['__awaiter'] || function (OI, OR, Oi, Oq) {
        return new (Oi = Oi || Promise)(function (OX, Ol) {
          function Oz(Og) {
            ;
            try {
              Od(Oq.next(Og));
            } catch (OE) {
              Ol(OE);
            }
          }
          ;
          function OU(Og) {
            ;
            try {
              Od(Oq.throw(Og));
            } catch (OE) {
              Ol(OE);
            }
          }
          function Od(Og) {
            ;
            var OE;
            ;
            ;
            Og.done ? OX(Og.value) : ((OE = Og.value) instanceof Oi ? OE : new Oi(function (Ov) {
              Ov(OE);
            })).then(Oz, OU);
          }
          Od((Oq = Oq.apply(OI, OR || [])).next());
        });
      }, Or = this && this['__generator'] || function (OI, OR) {
        ;
        var Oi, Oq, OX, Ol = {
          'label': 0,
          'sent': function () {
            if (1 & OX[0]) {
              throw OX[1];
            }
            return OX[1];
          },
          'trys': [],
          'ops': []
        }, Oz = {
          'next': OU(0),
          'throw': OU(1),
          'return': OU(2)
        };
        return 'function' == typeof Symbol && (Oz[Symbol.iterator] = function () {
          return this;
        }), Oz;
        function OU(Od) {
          return function (Og) {
            var OE = [
              Od,
              Og
            ];
            if (Oi) {
              throw new TypeError('Generator is already executing.');
            }
            ;
            ;
            for (; Ol;) {
              try {
                if (Oi = 1, Oq && (OX = 2 & OE[0] ? Oq.return : OE[0] ? Oq.throw || ((OX = Oq.return) && OX.call(Oq), 0) : Oq.next) && !(OX = OX.call(Oq, OE[1])).done) {
                  return OX;
                }
                switch (Oq = 0, (OE = OX ? [
                  2 & OE[0],
                  OX.value
                ] : OE)[0]) {
                  case 0:
                  case 1:
                    OX = OE;
                    break;
                  case 4:
                    return Ol.label++, {
                      'value': OE[1],
                      'done': false
                    };
                  case 5:
                    Ol.label++, Oq = OE[1], OE = [0];
                    continue;
                  case 7:
                    OE = Ol.ops.pop(), Ol.trys.pop();
                    continue;
                  default:
                    if (!(OX = 0 < (OX = Ol.trys).length && OX[OX.length - 1]) && (6 === OE[0] || 2 === OE[0])) {
                      Ol = 0;
                      continue;
                    }
                    if (3 === OE[0] && (!OX || OE[1] > OX[0] && OE[1] < OX[3])) {
                      Ol.label = OE[1];
                    } else {
                      if (6 === OE[0] && Ol.label < OX[1]) {
                        Ol.label = OX[1];
                        OX = OE;
                      } else {
                        if (!(OX && Ol.label < OX[2])) {
                          OX[2] && Ol.ops.pop();
                          Ol.trys.pop();
                          continue;
                        }
                        Ol.label = OX[2];
                        Ol.ops.push(OE);
                      }
                    }
                }
                OE = OR.call(OI, Ol);
              } catch (Ov) {
                OE = [
                  6,
                  Ov
                ];
                Oq = 0;
              } finally {
                Oi = OX = 0;
              }
            }
            ;
            if (5 & OE[0]) {
              throw OE[1];
            }
            return {
              'value': OE[0] ? OE[1] : void 0,
              'done': true
            };
          };
        }
      }, OA = (Oj.prototype.launch = function () {
        ;
        ;
        ;
        this['_detectLoopDelay'] <= 0 && this.setDetectDelay(500);
        this['_detectLoopStopped'] && (this['_detectLoopStopped'] = false, this['_detectLoop']());
      }, Oj.prototype.stop = function () {
        ;
        this['_detectLoopStopped'] || (this['_detectLoopStopped'] = true, clearTimeout(this['_timer']));
      }, Oj.prototype.isLaunch = function () {
        return !this['_detectLoopStopped'];
      }, Oj.prototype.setDetectDelay = function (OI) {
        ;
        this['_detectLoopDelay'] = OI;
      }, Oj.prototype.addListener = function (OI) {
        ;
        this['_listeners'].push(OI);
      }, Oj.prototype.removeListener = function (OI) {
        ;
        ;
        this['_listeners'] = this['_listeners'].filter(function (OR) {
          return OR !== OI;
        });
      }, Oj.prototype['_broadcast'] = function (OI) {
        ;
        for (var OR = 0, Oi = this['_listeners']; OR < Oi.length; OR++) {
          var Oq = Oi[OR];
          try {
            Oq(OI.isOpen, OI);
          } catch (OX) {
          }
        }
      }, Oj.prototype['_detectLoop'] = function () {
        return OC(this, void 0, void 0, function () {
          var OI, OR, Oi, Oq, OX, Ol = this;
          return Or(this, function (Oz) {
            ;
            ;
            ;
            switch (Oz.label) {
              case 0:
                OI = false, OR = '', Oi = 0, Oq = this['_checkers'], Oz.label = 1;
              case 1:
                return Oi < Oq.length ? [
                  4,
                  (OX = Oq[Oi]).isEnable()
                ] : [
                  3,
                  6
                ];
              case 2:
                return Oz.sent() ? (OR = OX.name, [
                  4,
                  OX.isOpen()
                ]) : [
                  3,
                  4
                ];
              case 3:
                OI = Oz.sent(), Oz.label = 4;
              case 4:
                if (OI) {
                  return [
                    3,
                    6
                  ];
                }
                Oz.label = 5;
              case 5:
                return Oi++, [
                  3,
                  1
                ];
              case 6:
                return OI != this['_isOpen'] && (this['_isOpen'] = OI, this['_broadcast']({
                  'isOpen': OI,
                  'checkerName': OR
                })), 0 < this['_detectLoopDelay'] ? this['_timer'] = setTimeout(function () {
                  ;
                  return Ol['_detectLoop']();
                }, this['_detectLoopDelay']) : this.stop(), [2];
            }
          });
        });
      }, Oj);
      ;
      ;
      function Oj(OI) {
        ;
        OI = OI.checkers;
        ;
        ;
        this['_listeners'] = [];
        this['_isOpen'] = false;
        this['_detectLoopStopped'] = true;
        this['_detectLoopDelay'] = 500;
        this['_checkers'] = OI.slice();
      }
    },
    function (O8, O9, OO) {
      'use strict';
      ;
      Object.defineProperty(O9, '__esModule', { 'value': true });
      ;
      var OC = OO(9), Or = (OO.d(O9, 'depRegToStringChecker', function () {
        return OC.a;
      }), OO(12)), OA = (OO.d(O9, 'elementIdChecker', function () {
        return Or.a;
      }), OO(13)), Oj = (OO.d(O9, 'functionToStringChecker', function () {
        return OA.a;
      }), OO(14)), OI = (OO.d(O9, 'regToStringChecker', function () {
        return Oj.a;
      }), OO(15)), OR = (OO.d(O9, 'debuggerChecker', function () {
        return OI.a;
      }), OO(16)), Oi = (OO.d(O9, 'dateToStringChecker', function () {
        return OR.a;
      }), OO(17)), Oq = (OO.d(O9, 'performanceChecker', function () {
        return Oi.a;
      }), OO(18));
      ;
      OO.d(O9, 'erudaChecker', function () {
        return Oq.a;
      });
    },
    function (O8, O9, OO) {
      'use strict';
      ;
      OO.d(O9, 'a', function () {
        return Oq;
      });
      ;
      var OC = OO(1), Or = OO(2), OA = OO(0), Oj = this && this['__awaiter'] || function (OX, Ol, Oz, OU) {
        return new (Oz = Oz || Promise)(function (Od, Og) {
          function OE(Ob) {
            ;
            try {
              Oe(OU.next(Ob));
            } catch (OF) {
              Og(OF);
            }
          }
          function Ov(Ob) {
            try {
              Oe(OU.throw(Ob));
            } catch (OF) {
              Og(OF);
            }
          }
          ;
          function Oe(Ob) {
            ;
            ;
            ;
            var OF;
            Ob.done ? Od(Ob.value) : ((OF = Ob.value) instanceof Oz ? OF : new Oz(function (OP) {
              OP(OF);
            })).then(OE, Ov);
          }
          Oe((OU = OU.apply(OX, Ol || [])).next());
        });
      }, OI = this && this['__generator'] || function (OX, Ol) {
        var Oz, OU, Od, Og = {
          'label': 0,
          'sent': function () {
            if (1 & Od[0]) {
              throw Od[1];
            }
            return Od[1];
          },
          'trys': [],
          'ops': []
        }, OE = {
          'next': Ov(0),
          'throw': Ov(1),
          'return': Ov(2)
        };
        ;
        return 'function' == typeof Symbol && (OE[Symbol.iterator] = function () {
          return this;
        }), OE;
        ;
        function Ov(Oe) {
          return function (Ob) {
            var OF = [
              Oe,
              Ob
            ];
            ;
            ;
            if (Oz) {
              throw new TypeError('Generator is already executing.');
            }
            for (; Og;) {
              try {
                if (Oz = 1, OU && (Od = 2 & OF[0] ? OU.return : OF[0] ? OU.throw || ((Od = OU.return) && Od.call(OU), 0) : OU.next) && !(Od = Od.call(OU, OF[1])).done) {
                  return Od;
                }
                switch (OU = 0, (OF = Od ? [
                  2 & OF[0],
                  Od.value
                ] : OF)[0]) {
                  case 0:
                  case 1:
                    Od = OF;
                    break;
                  case 4:
                    return Og.label++, {
                      'value': OF[1],
                      'done': false
                    };
                  case 5:
                    Og.label++, OU = OF[1], OF = [0];
                    continue;
                  case 7:
                    OF = Og.ops.pop(), Og.trys.pop();
                    continue;
                  default:
                    if (!(Od = 0 < (Od = Og.trys).length && Od[Od.length - 1]) && (6 === OF[0] || 2 === OF[0])) {
                      Og = 0;
                      continue;
                    }
                    if (3 === OF[0] && (!Od || OF[1] > Od[0] && OF[1] < Od[3])) {
                      Og.label = OF[1];
                    } else {
                      if (6 === OF[0] && Og.label < Od[1]) {
                        Og.label = Od[1];
                        Od = OF;
                      } else {
                        if (!(Od && Og.label < Od[2])) {
                          Od[2] && Og.ops.pop();
                          Og.trys.pop();
                          continue;
                        }
                        Og.label = Od[2];
                        Og.ops.push(OF);
                      }
                    }
                }
                OF = Ol.call(OX, Og);
              } catch (OP) {
                OF = [
                  6,
                  OP
                ];
                OU = 0;
              } finally {
                Oz = Od = 0;
              }
            }
            if (5 & OF[0]) {
              throw OF[1];
            }
            ;
            return {
              'value': OF[0] ? OF[1] : void 0,
              'done': true
            };
          };
        }
      }, Oi = false, Oq = (/ /.toString = function () {
        ;
        return Oi = true, Oq.name;
      }, {
        'name': 'dep-reg-to-string',
        'isOpen': function () {
          return Oj(this, void 0, void 0, function () {
            return OI(this, function (OX) {
              return Oi = false, Object(Or.c)({ 'dep': / / }), Object(Or.a)(), [
                2,
                Oi
              ];
            });
          });
        },
        'isEnable': function () {
          return Oj(this, void 0, void 0, function () {
            return OI(this, function (OX) {
              return [
                2,
                Object(OA.b)({
                  'includes': [true],
                  'excludes': [
                    OC.c,
                    OC.d
                  ]
                })
              ];
            });
          });
        }
      });
    },
    function (O8, O9) {
      var OO = function () {
        return this;
      }();
      ;
      try {
        OO = OO || Function('return this')() || (0, eval)('this');
      } catch (OC) {
        'object' == typeof window && (OO = window);
      }
      O8.exports = OO;
    },
    function (O8, O9, OO) {
      var OC;
      ;
      void 0 !== (O9 = 'function' == typeof (OC = function () {
        ;
        ;
        function OA(OX) {
          ;
          var Ol = OX.replace(/^v/, '').replace(/\+.*$/, ''), Oz = function (Od, Og) {
            ;
            ;
            return -1 === Od.indexOf(Og) ? Od.length : Od.indexOf(Og);
          }(Ol, '-'), OU = Ol.substring(0, Oz).split('.');
          ;
          return OU.push(Ol.substring(Oz + 1)), OU;
        }
        function Oj(OX) {
          return isNaN(Number(OX)) ? OX : Number(OX);
        }
        function OI(OX) {
          if ('string' != typeof OX) {
            throw new TypeError('Invalid argument expected string');
          }
          ;
          ;
          if (!/^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i.test(OX)) {
            throw new Error('Invalid argument not valid semver (\'' + OX + '\' received)');
          }
        }
        function OR(OX, Ol) {
          [
            OX,
            Ol
          ].forEach(OI);
          ;
          ;
          for (var Oz = OA(OX), OU = OA(Ol), Od = 0; Od < Math.max(Oz.length - 1, OU.length - 1); Od++) {
            var Og = parseInt(Oz[Od] || 0, 10), OE = parseInt(OU[Od] || 0, 10);
            if (Og > OE) {
              return 1;
            }
            if (OE > Og) {
              return -1;
            }
          }
          var Ov = Oz[Oz.length - 1], Oe = OU[OU.length - 1];
          if (Ov && Oe) {
            var Ob = Ov.split('.').map(Oj), OF = Oe.split('.').map(Oj);
            for (Od = 0; Od < Math.max(Ob.length, OF.length); Od++) {
              if (void 0 === Ob[Od] || 'string' == typeof OF[Od] && 'number' == typeof Ob[Od]) {
                return -1;
              }
              if (void 0 === OF[Od] || 'string' == typeof Ob[Od] && 'number' == typeof OF[Od]) {
                return 1;
              }
              if (Ob[Od] > OF[Od]) {
                return 1;
              }
              if (OF[Od] > Ob[Od]) {
                return -1;
              }
            }
          } else {
            if (Ov || Oe) {
              return Ov ? -1 : 1;
            }
          }
          ;
          return 0;
        }
        var Oi = [
          '>',
          '>=',
          '=',
          '<',
          '<='
        ], Oq = {
          '>': [1],
          '>=': [
            0,
            1
          ],
          '=': [0],
          '<=': [
            -1,
            0
          ],
          '<': [-1]
        };
        return OR.validate = function (OX) {
          ;
          return 'string' == typeof OX && /^v?(?:\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+)(\.(?:[x*]|\d+))?(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i.test(OX);
        }, OR.compare = function (OX, Ol, Oz) {
          !function (Od) {
            ;
            ;
            if ('string' != typeof Od) {
              throw new TypeError('Invalid operator type, expected string but got ' + typeof Od);
            }
            if (-1 === Oi.indexOf(Od)) {
              throw new TypeError('Invalid operator, expected one of ' + Oi.join('|'));
            }
          }(Oz);
          var OU = OR(OX, Ol);
          ;
          return Oq[Oz].indexOf(OU) > -1;
        }, OR;
      }) ? OC.apply(O9, []) : OC) && (O8.exports = O9);
    },
    function (O8, O9, OO) {
      'use strict';
      OO.d(O9, 'a', function () {
        return Oq;
      });
      ;
      ;
      var OC = OO(1), Or = OO(2), OA = OO(0), O9 = OO(3), Oj = this && this['__awaiter'] || function (OX, Ol, Oz, OU) {
        return new (Oz = Oz || Promise)(function (Od, Og) {
          function OE(Ob) {
            ;
            try {
              Oe(OU.next(Ob));
            } catch (OF) {
              Og(OF);
            }
          }
          ;
          function Ov(Ob) {
            ;
            try {
              Oe(OU.throw(Ob));
            } catch (OF) {
              Og(OF);
            }
          }
          ;
          function Oe(Ob) {
            ;
            var OF;
            ;
            Ob.done ? Od(Ob.value) : ((OF = Ob.value) instanceof Oz ? OF : new Oz(function (OP) {
              OP(OF);
            })).then(OE, Ov);
          }
          Oe((OU = OU.apply(OX, Ol || [])).next());
        });
      }, OI = this && this['__generator'] || function (OX, Ol) {
        var Oz, OU, Od, Og = {
          'label': 0,
          'sent': function () {
            if (1 & Od[0]) {
              throw Od[1];
            }
            return Od[1];
          },
          'trys': [],
          'ops': []
        }, OE = {
          'next': Ov(0),
          'throw': Ov(1),
          'return': Ov(2)
        };
        ;
        return 'function' == typeof Symbol && (OE[Symbol.iterator] = function () {
          return this;
        }), OE;
        function Ov(Oe) {
          return function (Ob) {
            var OF = [
              Oe,
              Ob
            ];
            ;
            if (Oz) {
              throw new TypeError('Generator is already executing.');
            }
            ;
            for (; Og;) {
              try {
                if (Oz = 1, OU && (Od = 2 & OF[0] ? OU.return : OF[0] ? OU.throw || ((Od = OU.return) && Od.call(OU), 0) : OU.next) && !(Od = Od.call(OU, OF[1])).done) {
                  return Od;
                }
                switch (OU = 0, (OF = Od ? [
                  2 & OF[0],
                  Od.value
                ] : OF)[0]) {
                  case 0:
                  case 1:
                    Od = OF;
                    break;
                  case 4:
                    return Og.label++, {
                      'value': OF[1],
                      'done': false
                    };
                  case 5:
                    Og.label++, OU = OF[1], OF = [0];
                    continue;
                  case 7:
                    OF = Og.ops.pop(), Og.trys.pop();
                    continue;
                  default:
                    if (!(Od = 0 < (Od = Og.trys).length && Od[Od.length - 1]) && (6 === OF[0] || 2 === OF[0])) {
                      Og = 0;
                      continue;
                    }
                    if (3 === OF[0] && (!Od || OF[1] > Od[0] && OF[1] < Od[3])) {
                      Og.label = OF[1];
                    } else {
                      if (6 === OF[0] && Og.label < Od[1]) {
                        Og.label = Od[1];
                        Od = OF;
                      } else {
                        if (!(Od && Og.label < Od[2])) {
                          Od[2] && Og.ops.pop();
                          Og.trys.pop();
                          continue;
                        }
                        Og.label = Od[2];
                        Og.ops.push(OF);
                      }
                    }
                }
                OF = Ol.call(OX, Og);
              } catch (OP) {
                OF = [
                  6,
                  OP
                ];
                OU = 0;
              } finally {
                Oz = Od = 0;
              }
            }
            if (5 & OF[0]) {
              throw OF[1];
            }
            ;
            return {
              'value': OF[0] ? OF[1] : void 0,
              'done': true
            };
          };
        }
      }, OR = Object(O9.a)('div'), Oi = false, Oq = (Object.defineProperty(OR, 'id', {
        'get': function () {
          ;
          return Oi = true, Oq.name;
        },
        'configurable': true
      }), {
        'name': 'element-id',
        'isOpen': function () {
          return Oj(this, void 0, void 0, function () {
            return OI(this, function (OX) {
              return Oi = false, Object(Or.b)(OR), Object(Or.a)(), [
                2,
                Oi
              ];
            });
          });
        },
        'isEnable': function () {
          return Oj(this, void 0, void 0, function () {
            return OI(this, function (OX) {
              return [
                2,
                Object(OA.b)({
                  'includes': [true],
                  'excludes': [
                    OC.d,
                    OC.b,
                    OC.c
                  ]
                })
              ];
            });
          });
        }
      });
    },
    function (O8, O9, OO) {
      'use strict';
      ;
      ;
      OO.d(O9, 'a', function () {
        return OX;
      });
      var OC = OO(1), Or = OO(2), OA = OO(6), Oj = OO(0), OI = this && this['__awaiter'] || function (Ol, Oz, OU, Od) {
        return new (OU = OU || Promise)(function (Og, OE) {
          function Ov(OF) {
            ;
            try {
              Ob(Od.next(OF));
            } catch (OP) {
              OE(OP);
            }
          }
          ;
          function Oe(OF) {
            ;
            try {
              Ob(Od.throw(OF));
            } catch (OP) {
              OE(OP);
            }
          }
          function Ob(OF) {
            var OP;
            ;
            ;
            ;
            OF.done ? Og(OF.value) : ((OP = OF.value) instanceof OU ? OP : new OU(function (Oc) {
              Oc(OP);
            })).then(Ov, Oe);
          }
          Ob((Od = Od.apply(Ol, Oz || [])).next());
        });
      }, OR = this && this['__generator'] || function (Ol, Oz) {
        ;
        var OU, Od, Og, OE = {
          'label': 0,
          'sent': function () {
            if (1 & Og[0]) {
              throw Og[1];
            }
            return Og[1];
          },
          'trys': [],
          'ops': []
        }, Ov = {
          'next': Oe(0),
          'throw': Oe(1),
          'return': Oe(2)
        };
        ;
        return 'function' == typeof Symbol && (Ov[Symbol.iterator] = function () {
          return this;
        }), Ov;
        function Oe(Ob) {
          return function (OF) {
            var OP = [
              Ob,
              OF
            ];
            ;
            if (OU) {
              throw new TypeError('Generator is already executing.');
            }
            ;
            for (; OE;) {
              try {
                if (OU = 1, Od && (Og = 2 & OP[0] ? Od.return : OP[0] ? Od.throw || ((Og = Od.return) && Og.call(Od), 0) : Od.next) && !(Og = Og.call(Od, OP[1])).done) {
                  return Og;
                }
                switch (Od = 0, (OP = Og ? [
                  2 & OP[0],
                  Og.value
                ] : OP)[0]) {
                  case 0:
                  case 1:
                    Og = OP;
                    break;
                  case 4:
                    return OE.label++, {
                      'value': OP[1],
                      'done': false
                    };
                  case 5:
                    OE.label++, Od = OP[1], OP = [0];
                    continue;
                  case 7:
                    OP = OE.ops.pop(), OE.trys.pop();
                    continue;
                  default:
                    if (!(Og = 0 < (Og = OE.trys).length && Og[Og.length - 1]) && (6 === OP[0] || 2 === OP[0])) {
                      OE = 0;
                      continue;
                    }
                    if (3 === OP[0] && (!Og || OP[1] > Og[0] && OP[1] < Og[3])) {
                      OE.label = OP[1];
                    } else {
                      if (6 === OP[0] && OE.label < Og[1]) {
                        OE.label = Og[1];
                        Og = OP;
                      } else {
                        if (!(Og && OE.label < Og[2])) {
                          Og[2] && OE.ops.pop();
                          OE.trys.pop();
                          continue;
                        }
                        OE.label = Og[2];
                        OE.ops.push(OP);
                      }
                    }
                }
                OP = Oz.call(Ol, OE);
              } catch (Oc) {
                OP = [
                  6,
                  Oc
                ];
                Od = 0;
              } finally {
                OU = Og = 0;
              }
            }
            if (5 & OP[0]) {
              throw OP[1];
            }
            ;
            return {
              'value': OP[0] ? OP[1] : void 0,
              'done': true
            };
          };
        }
      };
      function Oi() {
      }
      var Oq = 0, OX = (Oi.toString = function () {
        return Oq++, '';
      }, {
        'name': 'function-to-string',
        'isOpen': function () {
          return OI(this, void 0, void 0, function () {
            return OR(this, function (Ol) {
              return Oq = 0, Object(Or.b)(Oi), Object(Or.a)(), [
                2,
                2 === Oq
              ];
            });
          });
        },
        'isEnable': function () {
          return OI(this, void 0, void 0, function () {
            return OR(this, function (Ol) {
              return [
                2,
                Object(Oj.b)({
                  'includes': [true],
                  'excludes': [
                    OC.e,
                    OC.c,
                    (OA.b || OA.c) && OC.a
                  ]
                })
              ];
            });
          });
        }
      });
    },
    function (O8, O9, OO) {
      'use strict';
      ;
      OO.d(O9, 'a', function () {
        return Oq;
      });
      ;
      var OC = OO(2), Or = OO(1), OA = OO(0), Oj = this && this['__awaiter'] || function (OX, Ol, Oz, OU) {
        return new (Oz = Oz || Promise)(function (Od, Og) {
          function OE(Ob) {
            ;
            try {
              Oe(OU.next(Ob));
            } catch (OF) {
              Og(OF);
            }
          }
          ;
          function Ov(Ob) {
            ;
            try {
              Oe(OU.throw(Ob));
            } catch (OF) {
              Og(OF);
            }
          }
          function Oe(Ob) {
            var OF;
            ;
            ;
            Ob.done ? Od(Ob.value) : ((OF = Ob.value) instanceof Oz ? OF : new Oz(function (OP) {
              OP(OF);
            })).then(OE, Ov);
          }
          Oe((OU = OU.apply(OX, Ol || [])).next());
        });
      }, OI = this && this['__generator'] || function (OX, Ol) {
        var Oz, OU, Od, Og = {
          'label': 0,
          'sent': function () {
            if (1 & Od[0]) {
              throw Od[1];
            }
            return Od[1];
          },
          'trys': [],
          'ops': []
        }, OE = {
          'next': Ov(0),
          'throw': Ov(1),
          'return': Ov(2)
        };
        ;
        return 'function' == typeof Symbol && (OE[Symbol.iterator] = function () {
          return this;
        }), OE;
        ;
        function Ov(Oe) {
          return function (Ob) {
            ;
            var OF = [
              Oe,
              Ob
            ];
            if (Oz) {
              throw new TypeError('Generator is already executing.');
            }
            ;
            for (; Og;) {
              try {
                if (Oz = 1, OU && (Od = 2 & OF[0] ? OU.return : OF[0] ? OU.throw || ((Od = OU.return) && Od.call(OU), 0) : OU.next) && !(Od = Od.call(OU, OF[1])).done) {
                  return Od;
                }
                switch (OU = 0, (OF = Od ? [
                  2 & OF[0],
                  Od.value
                ] : OF)[0]) {
                  case 0:
                  case 1:
                    Od = OF;
                    break;
                  case 4:
                    return Og.label++, {
                      'value': OF[1],
                      'done': false
                    };
                  case 5:
                    Og.label++, OU = OF[1], OF = [0];
                    continue;
                  case 7:
                    OF = Og.ops.pop(), Og.trys.pop();
                    continue;
                  default:
                    if (!(Od = 0 < (Od = Og.trys).length && Od[Od.length - 1]) && (6 === OF[0] || 2 === OF[0])) {
                      Og = 0;
                      continue;
                    }
                    if (3 === OF[0] && (!Od || OF[1] > Od[0] && OF[1] < Od[3])) {
                      Og.label = OF[1];
                    } else {
                      if (6 === OF[0] && Og.label < Od[1]) {
                        Og.label = Od[1];
                        Od = OF;
                      } else {
                        if (!(Od && Og.label < Od[2])) {
                          Od[2] && Og.ops.pop();
                          Og.trys.pop();
                          continue;
                        }
                        Og.label = Od[2];
                        Og.ops.push(OF);
                      }
                    }
                }
                OF = Ol.call(OX, Og);
              } catch (OP) {
                OF = [
                  6,
                  OP
                ];
                OU = 0;
              } finally {
                Oz = Od = 0;
              }
            }
            if (5 & OF[0]) {
              throw OF[1];
            }
            ;
            return {
              'value': OF[0] ? OF[1] : void 0,
              'done': true
            };
          };
        }
      }, Oi = false, Oq = (/ /.toString = function () {
        ;
        return Oi = true, Oq.name;
      }, {
        'name': 'reg-to-string',
        'isOpen': function () {
          return Oj(this, void 0, void 0, function () {
            return OI(this, function (OX) {
              return Oi = false, Object(OC.b)(/ /), Object(OC.a)(), [
                2,
                Oi
              ];
            });
          });
        },
        'isEnable': function () {
          return Oj(this, void 0, void 0, function () {
            return OI(this, function (OX) {
              return [
                2,
                Object(OA.b)({
                  'includes': [true],
                  'excludes': [Or.g]
                })
              ];
            });
          });
        }
      });
    },
    function (O8, O9, OO) {
      'use strict';
      ;
      OO.d(O9, 'a', function () {
        return Oj;
      });
      ;
      var OC = OO(0), Or = this && this['__awaiter'] || function (OI, OR, Oi, Oq) {
        return new (Oi = Oi || Promise)(function (OX, Ol) {
          function Oz(Og) {
            ;
            try {
              Od(Oq.next(Og));
            } catch (OE) {
              Ol(OE);
            }
          }
          function OU(Og) {
            try {
              Od(Oq.throw(Og));
            } catch (OE) {
              Ol(OE);
            }
          }
          ;
          function Od(Og) {
            ;
            var OE;
            ;
            Og.done ? OX(Og.value) : ((OE = Og.value) instanceof Oi ? OE : new Oi(function (Ov) {
              Ov(OE);
            })).then(Oz, OU);
          }
          Od((Oq = Oq.apply(OI, OR || [])).next());
        });
      }, OA = this && this['__generator'] || function (OI, OR) {
        ;
        ;
        var Oi, Oq, OX, Ol = {
          'label': 0,
          'sent': function () {
            if (1 & OX[0]) {
              throw OX[1];
            }
            return OX[1];
          },
          'trys': [],
          'ops': []
        }, Oz = {
          'next': OU(0),
          'throw': OU(1),
          'return': OU(2)
        };
        return 'function' == typeof Symbol && (Oz[Symbol.iterator] = function () {
          return this;
        }), Oz;
        function OU(Od) {
          return function (Og) {
            ;
            ;
            var OE = [
              Od,
              Og
            ];
            ;
            if (Oi) {
              throw new TypeError('Generator is already executing.');
            }
            for (; Ol;) {
              try {
                if (Oi = 1, Oq && (OX = 2 & OE[0] ? Oq.return : OE[0] ? Oq.throw || ((OX = Oq.return) && OX.call(Oq), 0) : Oq.next) && !(OX = OX.call(Oq, OE[1])).done) {
                  return OX;
                }
                switch (Oq = 0, (OE = OX ? [
                  2 & OE[0],
                  OX.value
                ] : OE)[0]) {
                  case 0:
                  case 1:
                    OX = OE;
                    break;
                  case 4:
                    return Ol.label++, {
                      'value': OE[1],
                      'done': false
                    };
                  case 5:
                    Ol.label++, Oq = OE[1], OE = [0];
                    continue;
                  case 7:
                    OE = Ol.ops.pop(), Ol.trys.pop();
                    continue;
                  default:
                    if (!(OX = 0 < (OX = Ol.trys).length && OX[OX.length - 1]) && (6 === OE[0] || 2 === OE[0])) {
                      Ol = 0;
                      continue;
                    }
                    if (3 === OE[0] && (!OX || OE[1] > OX[0] && OE[1] < OX[3])) {
                      Ol.label = OE[1];
                    } else {
                      if (6 === OE[0] && Ol.label < OX[1]) {
                        Ol.label = OX[1];
                        OX = OE;
                      } else {
                        if (!(OX && Ol.label < OX[2])) {
                          OX[2] && Ol.ops.pop();
                          Ol.trys.pop();
                          continue;
                        }
                        Ol.label = OX[2];
                        Ol.ops.push(OE);
                      }
                    }
                }
                OE = OR.call(OI, Ol);
              } catch (Ov) {
                OE = [
                  6,
                  Ov
                ];
                Oq = 0;
              } finally {
                Oi = OX = 0;
              }
            }
            if (5 & OE[0]) {
              throw OE[1];
            }
            return {
              'value': OE[0] ? OE[1] : void 0,
              'done': true
            };
          };
        }
      }, Oj = {
        'name': 'debugger-checker',
        'isOpen': function () {
          return Or(this, void 0, void 0, function () {
            var OI;
            return OA(this, function (OR) {
              ;
              return OI = Object(OC.c)(), function () {
              }.constructor('debugger')(), [
                  2,
                  100 < Object(OC.c)() - OI
                ];
            });
          });
        },
        'isEnable': function () {
          return Or(this, void 0, void 0, function () {
            return OA(this, function (OI) {
              return [
                2,
                true
              ];
            });
          });
        }
      };
    },
    function (O8, O9, OO) {
      'use strict';
      OO.d(O9, 'a', function () {
        return OX;
      });
      ;
      var OC = OO(1), Or = OO(2), OA = OO(0), Oj = OO(4), OI = this && this['__awaiter'] || function (Ol, Oz, OU, Od) {
        return new (OU = OU || Promise)(function (Og, OE) {
          function Ov(OF) {
            ;
            try {
              Ob(Od.next(OF));
            } catch (OP) {
              OE(OP);
            }
          }
          ;
          function Oe(OF) {
            ;
            try {
              Ob(Od.throw(OF));
            } catch (OP) {
              OE(OP);
            }
          }
          function Ob(OF) {
            ;
            ;
            var OP;
            OF.done ? Og(OF.value) : ((OP = OF.value) instanceof OU ? OP : new OU(function (Oc) {
              Oc(OP);
            })).then(Ov, Oe);
          }
          Ob((Od = Od.apply(Ol, Oz || [])).next());
        });
      }, OR = this && this['__generator'] || function (Ol, Oz) {
        var OU, Od, Og, OE = {
          'label': 0,
          'sent': function () {
            if (1 & Og[0]) {
              throw Og[1];
            }
            return Og[1];
          },
          'trys': [],
          'ops': []
        }, Ov = {
          'next': Oe(0),
          'throw': Oe(1),
          'return': Oe(2)
        };
        return 'function' == typeof Symbol && (Ov[Symbol.iterator] = function () {
          return this;
        }), Ov;
        ;
        function Oe(Ob) {
          return function (OF) {
            var OP = [
              Ob,
              OF
            ];
            if (OU) {
              throw new TypeError('Generator is already executing.');
            }
            ;
            for (; OE;) {
              try {
                if (OU = 1, Od && (Og = 2 & OP[0] ? Od.return : OP[0] ? Od.throw || ((Og = Od.return) && Og.call(Od), 0) : Od.next) && !(Og = Og.call(Od, OP[1])).done) {
                  return Og;
                }
                switch (Od = 0, (OP = Og ? [
                  2 & OP[0],
                  Og.value
                ] : OP)[0]) {
                  case 0:
                  case 1:
                    Og = OP;
                    break;
                  case 4:
                    return OE.label++, {
                      'value': OP[1],
                      'done': false
                    };
                  case 5:
                    OE.label++, Od = OP[1], OP = [0];
                    continue;
                  case 7:
                    OP = OE.ops.pop(), OE.trys.pop();
                    continue;
                  default:
                    if (!(Og = 0 < (Og = OE.trys).length && Og[Og.length - 1]) && (6 === OP[0] || 2 === OP[0])) {
                      OE = 0;
                      continue;
                    }
                    if (3 === OP[0] && (!Og || OP[1] > Og[0] && OP[1] < Og[3])) {
                      OE.label = OP[1];
                    } else {
                      if (6 === OP[0] && OE.label < Og[1]) {
                        OE.label = Og[1];
                        Og = OP;
                      } else {
                        if (!(Og && OE.label < Og[2])) {
                          Og[2] && OE.ops.pop();
                          OE.trys.pop();
                          continue;
                        }
                        OE.label = Og[2];
                        OE.ops.push(OP);
                      }
                    }
                }
                OP = Oz.call(Ol, OE);
              } catch (Oc) {
                OP = [
                  6,
                  Oc
                ];
                Od = 0;
              } finally {
                OU = Og = 0;
              }
            }
            ;
            ;
            if (5 & OP[0]) {
              throw OP[1];
            }
            return {
              'value': OP[0] ? OP[1] : void 0,
              'done': true
            };
          };
        }
      }, Oi = new Date(), Oq = 0, OX = (Oi.toString = function () {
        return Oq++, '';
      }, {
        'name': 'date-to-string',
        'isOpen': function () {
          return OI(this, void 0, void 0, function () {
            return OR(this, function (Ol) {
              return Oq = 0, Object(Or.b)(Oi), Object(Or.a)(), [
                2,
                2 === Oq
              ];
            });
          });
        },
        'isEnable': function () {
          return OI(this, void 0, void 0, function () {
            return OR(this, function (Ol) {
              ;
              return [
                2,
                Object(OA.b)({
                  'includes': [OC.a],
                  'excludes': [(Oj.isIpad || Oj.isIphone) && OC.a]
                })
              ];
            });
          });
        }
      });
    },
    function (O8, O9, OO) {
      'use strict';
      ;
      ;
      OO.d(O9, 'a', function () {
        return Oq;
      });
      var OC = OO(1), Or = OO(2), OA = OO(0), Oj = this && this['__awaiter'] || function (OX, Ol, Oz, OU) {
        return new (Oz = Oz || Promise)(function (Od, Og) {
          function OE(Ob) {
            try {
              Oe(OU.next(Ob));
            } catch (OF) {
              Og(OF);
            }
          }
          ;
          function Ov(Ob) {
            ;
            try {
              Oe(OU.throw(Ob));
            } catch (OF) {
              Og(OF);
            }
          }
          function Oe(Ob) {
            var OF;
            ;
            ;
            Ob.done ? Od(Ob.value) : ((OF = Ob.value) instanceof Oz ? OF : new Oz(function (OP) {
              OP(OF);
            })).then(OE, Ov);
          }
          Oe((OU = OU.apply(OX, Ol || [])).next());
        });
      }, OI = this && this['__generator'] || function (OX, Ol) {
        var Oz, OU, Od, Og = {
          'label': 0,
          'sent': function () {
            if (1 & Od[0]) {
              throw Od[1];
            }
            return Od[1];
          },
          'trys': [],
          'ops': []
        }, OE = {
          'next': Ov(0),
          'throw': Ov(1),
          'return': Ov(2)
        };
        ;
        return 'function' == typeof Symbol && (OE[Symbol.iterator] = function () {
          return this;
        }), OE;
        function Ov(Oe) {
          return function (Ob) {
            ;
            var OF = [
              Oe,
              Ob
            ];
            ;
            if (Oz) {
              throw new TypeError('Generator is already executing.');
            }
            for (; Og;) {
              try {
                if (Oz = 1, OU && (Od = 2 & OF[0] ? OU.return : OF[0] ? OU.throw || ((Od = OU.return) && Od.call(OU), 0) : OU.next) && !(Od = Od.call(OU, OF[1])).done) {
                  return Od;
                }
                switch (OU = 0, (OF = Od ? [
                  2 & OF[0],
                  Od.value
                ] : OF)[0]) {
                  case 0:
                  case 1:
                    Od = OF;
                    break;
                  case 4:
                    return Og.label++, {
                      'value': OF[1],
                      'done': false
                    };
                  case 5:
                    Og.label++, OU = OF[1], OF = [0];
                    continue;
                  case 7:
                    OF = Og.ops.pop(), Og.trys.pop();
                    continue;
                  default:
                    if (!(Od = 0 < (Od = Og.trys).length && Od[Od.length - 1]) && (6 === OF[0] || 2 === OF[0])) {
                      Og = 0;
                      continue;
                    }
                    if (3 === OF[0] && (!Od || OF[1] > Od[0] && OF[1] < Od[3])) {
                      Og.label = OF[1];
                    } else {
                      if (6 === OF[0] && Og.label < Od[1]) {
                        Og.label = Od[1];
                        Od = OF;
                      } else {
                        if (!(Od && Og.label < Od[2])) {
                          Od[2] && Og.ops.pop();
                          Og.trys.pop();
                          continue;
                        }
                        Og.label = Od[2];
                        Og.ops.push(OF);
                      }
                    }
                }
                OF = Ol.call(OX, Og);
              } catch (OP) {
                OF = [
                  6,
                  OP
                ];
                OU = 0;
              } finally {
                Oz = Od = 0;
              }
            }
            if (5 & OF[0]) {
              throw OF[1];
            }
            ;
            return {
              'value': OF[0] ? OF[1] : void 0,
              'done': true
            };
          };
        }
      }, OR = null, Oi = 0, Oq = {
        'name': 'performance',
        'isOpen': function () {
          return Oj(this, void 0, void 0, function () {
            var OX, Ol;
            return OI(this, function (Oz) {
              ;
              return null === OR && (OR = function () {
                for (var Od = function () {
                  ;
                  for (var Ov = {}, Oe = 0; Oe < 500; Oe++) {
                    Ov[''.concat(Oe)] = ''.concat(Oe);
                  }
                  return Ov;
                }(), Og = [], OE = 0; OE < 50; OE++) {
                  Og.push(Od);
                }
                ;
                return Og;
              }()), OU = Object(OA.c)(), Object(Or.c)(OR), OX = Object(OA.c)() - OU, OU = Object(OA.c)(), Object(Or.b)(OR), Ol = Object(OA.c)() - OU, Oi = Math.max(Oi, Ol), Object(Or.a)(), 0 == OX || 0 === Oi ? [
                2,
                false
              ] : [
                  2,
                  10 * Oi < OX
                ];
              var OU;
            });
          });
        },
        'isEnable': function () {
          return Oj(this, void 0, void 0, function () {
            return OI(this, function (OX) {
              return [
                2,
                Object(OA.b)({
                  'includes': [OC.a],
                  'excludes': []
                })
              ];
            });
          });
        }
      };
    },
    function (O8, O9, OO) {
      'use strict';
      ;
      ;
      OO.d(O9, 'a', function () {
        return OA;
      });
      var OC = this && this['__awaiter'] || function (Oj, OI, OR, Oi) {
        return new (OR = OR || Promise)(function (Oq, OX) {
          function Ol(Od) {
            ;
            try {
              OU(Oi.next(Od));
            } catch (Og) {
              OX(Og);
            }
          }
          function Oz(Od) {
            try {
              OU(Oi.throw(Od));
            } catch (Og) {
              OX(Og);
            }
          }
          function OU(Od) {
            ;
            ;
            ;
            var Og;
            Od.done ? Oq(Od.value) : ((Og = Od.value) instanceof OR ? Og : new OR(function (OE) {
              OE(Og);
            })).then(Ol, Oz);
          }
          OU((Oi = Oi.apply(Oj, OI || [])).next());
        });
      }, Or = this && this['__generator'] || function (Oj, OI) {
        var OR, Oi, Oq, OX = {
          'label': 0,
          'sent': function () {
            if (1 & Oq[0]) {
              throw Oq[1];
            }
            return Oq[1];
          },
          'trys': [],
          'ops': []
        }, Ol = {
          'next': Oz(0),
          'throw': Oz(1),
          'return': Oz(2)
        };
        return 'function' == typeof Symbol && (Ol[Symbol.iterator] = function () {
          return this;
        }), Ol;
        ;
        function Oz(OU) {
          return function (Od) {
            var Og = [
              OU,
              Od
            ];
            ;
            if (OR) {
              throw new TypeError('Generator is already executing.');
            }
            ;
            for (; OX;) {
              try {
                if (OR = 1, Oi && (Oq = 2 & Og[0] ? Oi.return : Og[0] ? Oi.throw || ((Oq = Oi.return) && Oq.call(Oi), 0) : Oi.next) && !(Oq = Oq.call(Oi, Og[1])).done) {
                  return Oq;
                }
                switch (Oi = 0, (Og = Oq ? [
                  2 & Og[0],
                  Oq.value
                ] : Og)[0]) {
                  case 0:
                  case 1:
                    Oq = Og;
                    break;
                  case 4:
                    return OX.label++, {
                      'value': Og[1],
                      'done': false
                    };
                  case 5:
                    OX.label++, Oi = Og[1], Og = [0];
                    continue;
                  case 7:
                    Og = OX.ops.pop(), OX.trys.pop();
                    continue;
                  default:
                    if (!(Oq = 0 < (Oq = OX.trys).length && Oq[Oq.length - 1]) && (6 === Og[0] || 2 === Og[0])) {
                      OX = 0;
                      continue;
                    }
                    if (3 === Og[0] && (!Oq || Og[1] > Oq[0] && Og[1] < Oq[3])) {
                      OX.label = Og[1];
                    } else {
                      if (6 === Og[0] && OX.label < Oq[1]) {
                        OX.label = Oq[1];
                        Oq = Og;
                      } else {
                        if (!(Oq && OX.label < Oq[2])) {
                          Oq[2] && OX.ops.pop();
                          OX.trys.pop();
                          continue;
                        }
                        OX.label = Oq[2];
                        OX.ops.push(Og);
                      }
                    }
                }
                Og = OI.call(Oj, OX);
              } catch (OE) {
                Og = [
                  6,
                  OE
                ];
                Oi = 0;
              } finally {
                OR = Oq = 0;
              }
            }
            ;
            if (5 & Og[0]) {
              throw Og[1];
            }
            return {
              'value': Og[0] ? Og[1] : void 0,
              'done': true
            };
          };
        }
      }, OA = {
        'name': 'eruda',
        'isOpen': function () {
          var Oj;
          return OC(this, void 0, void 0, function () {
            return Or(this, function (OI) {
              ;
              return 'undefined' != typeof eruda ? [
                2,
                true === (null == (Oj = null === eruda || void 0 === eruda ? void 0 : eruda['_devTools']) ? void 0 : Oj['_isShow'])
              ] : [
                2,
                false
              ];
            });
          });
        },
        'isEnable': function () {
          return OC(this, void 0, void 0, function () {
            return Or(this, function (Oj) {
              return [
                2,
                true
              ];
            });
          });
        }
      };
    },
    function (O8, O9, OO) {
      'use strict';
      OO.d(O9, 'a', function () {
        return OC;
      });
      ;
      var O9 = OO(3), OC = /mobile/i.test(O9.b);
    }
  ], O7 = {}, O5.m = O6, O5.c = O7, O5.d = function (O8, O9, OO) {
    ;
    O5.o(O8, O9) || Object.defineProperty(O8, O9, {
      'configurable': false,
      'enumerable': true,
      'get': OO
    });
  }, O5.n = function (O8) {
    var O9 = O8 && O8['__esModule'] ? function () {
      ;
      return O8.default;
    } : function () {
      return O8;
    };
    ;
    return O5.d(O9, 'a', O9), O9;
  }, O5.o = function (O8, O9) {
    ;
    ;
    return Object.prototype.hasOwnProperty.call(O8, O9);
  }, O5.p = '', O5(O5.s = 4);
  function O5(O8) {
    ;
    var O9;
    return (O7[O8] || (O9 = O7[O8] = {
      'i': O8,
      'l': false,
      'exports': {}
    }, O6[O8].call(O9.exports, O9, O9.exports, O5), O9.l = true, O9)).exports;
  }
  var O6, O7;
}), jwplayer('megacloud-player')), decryptedSources = [], q = [], X = false, tracks = [],
autoPlay = Boolean(parseInt(settings.autoPlay)),
playOriginalAudio = Boolean(parseInt(settings.playOriginalAudio)),
d = Boolean(parseInt(settings.vast)),
g = $('#megacloud-player').data('id'),
E = $('#megacloud-player').data('realid'),
v = parseInt(settings.time),
e = { 'channel': 'megacloud' },
introTimes,
outroTimes;

const sourcesUrl = '/embed-2/ajax/e-1/getSources?id=' + g;
function N() {
  $.get(sourcesUrl, response => {
    if (response) {
      var encryptedSources = response['sources'];
      decryptedSources = (Array.isArray(encryptedSources) ? encryptedSources : decrypt(encryptedSources, "2zHcpXS0TqqrxoDwf365uhqBGOj2Fs")) || [];
      tracks = response['tracks'];
      introTimes = response.intro || null;
      outroTimes = response.outro || null;
      Z();
    }
  });
}

var m = null;
const createPlayerConfig = () => {
  var playerConfig = {
    'logo': {},
    'playbackRateControls': [
      0.25,
      0.5,
      0.75,
      1,
      1.25,
      1.5,
      2
    ],
    'autostart': autoPlay,
    'sources': decryptedSources,
    'mute': false,
    'cast': {},
    'tracks' : tracks
  };
  return playerConfig;
};
function freeOctopusTrack() {
  'undefined' != typeof octopusInstance && octopusInstance && octopusInstance.freeTrack();
}

function h() {
  ;
  var O5, O6 = I.getCurrentCaptions(), O6 = tracks[O6 - 1];
  const O7 = O6 ? O6.file : null;
  ;
  ;
  O7 && 'ass' === O7.split('.').pop() ? 'undefined' != typeof octopusInstance && octopusInstance ? octopusInstance.setTrackByUrl(O7) : (O5 = document.querySelector('#megacloud-player .jw-video'), window.SubtitlesOctopusOnLoad = function () {
    var O8 = {
      'video': O5,
      'subUrl': O7,
      'fonts': [
        '/js/octopus/Arial.ttf',
        '/js/octopus/TimesNewRoman.ttf'
      ],
      'workerUrl': '/js/octopus/subtitles-octopus-worker.js',
      'renderMode': 'js-blend'
    };
    ;
    ;
    ;
    window.octopusInstance = new SubtitlesOctopus(O8);
  }, SubtitlesOctopus && SubtitlesOctopusOnLoad()) : freeOctopusTrack();
}
;
;
function Z() {
  ;
  ;
  var O5 = createPlayerConfig();
  ;
  d && (O5.advertising = {
    'client': 'vast',
    'schedule': [{ 'tag': 'https://services.vlitag.com/vpaid/?q=1ba9c35e4570ec49cfc2da2c2116ac79&vast_slot=vi_2284298620&defaultVolume=&page_url=https://rapid-cloud.co' }]
  });
  I.setup(O5);
  I.on('ready', function () {
    ;
    ;
    ;
    $('.jw-icon-rewind').remove();
    I.addButton('/images/skip-10-next.svg?v=0.1', '+10s', n, 'forward-10s-button');
    I.addButton('/images/skip-10-prev.svg?v=0.1', '-10s', u, 'rewind-10s-button');
    $('#megacloud-player').prepend('<div id="overlay-control"></div>');
    introTimes && $('#overlay-control').prepend('<div class="botright"><a style="display: none;" href="javascript:;" id="skip-intro" class="zbtn zbtn-outline">Skip Intro</a></div>');
    outroTimes && $('#overlay-control').prepend('<div class="botright"><a style="display: none;" href="javascript:;" id="skip-outro" class="zbtn zbtn-outline">Skip Outro</a></div>');
  });
  I.on('pause', function () {
  });
  I.on('captionsChanged', function (O6) {
  });
  I.on('firstFrame', function () {
    var O6 = 0, O7 = 0, O8 = I.getDuration();
    ;
    ;
    ;
    introTimes && 0 === $('.jw-intro').length && (O7 = introTimes.start / O8 * 100, O6 = (introTimes.end - introTimes.start) / O8 * 100, $('.jw-slider-container').append('<div class="jw-reset jw-intro" style="margin-left: ' + O7 + '%; width: ' + O6 + '%"></div>'));
    outroTimes && 0 === $('.jw-outro').length && (outroTimes.end = outroTimes.end > O8 ? O8 : outroTimes.end, O6 = outroTimes.start / O8 * 100 - O6 - O7, O7 = (outroTimes.end - outroTimes.start) / O8 * 100, $('.jw-slider-container').append('<div class="jw-reset jw-outro" style="margin-left: ' + O6 + '%; width: ' + O7 + '%"></div>'));
    E && (O8 = O2('vc_' + E + '_time'), 0 < v ? I.seek(v) : O8 && I.seek(O8));
  });
  I.on('play', function () {
  });
  I.on('buffer', function (O6) {
  });
  I.on('time', function (O6) {
    ;
    ;
    ;
    m && clearInterval(m);
    J(O6.position);
    E && O3('vc_' + E + '_time', I.getPosition());
    e.event = 'time';
    e.time = I.getPosition();
    e.duration = I.getDuration();
    e.percent = I.getPosition() / I.getDuration() * 100;
    window.parent.postMessage(JSON.stringify(e), '*');
  });
  I.on('complete', function () {
    ;
    ;
    ;
    v = 0;
    O4('vc_' + E + '_time');
    e.event = 'complete';
    window.parent.postMessage(JSON.stringify(e), '*');
  });
  I.on('error', function () {
    clearUpEverything();
  });
  I.on('setupError', function () {
  });
}
function clearUpEverything() {
  0 < q.length && !X ? (m && clearInterval(m), decryptedSources = q, autoPlay = X = true, Z()) : (e.event = 'error', window.parent.postMessage(JSON.stringify(e), '*'));
}
;
var s = window.addEventListener ? 'addEventListener' : 'attachEvent', p = window[s], Q = 'attachEvent' === s ? 'onmessage' : 'message';
function J(O5) {
  ;
  ;
  ;
  O5 >= introTimes.start && O5 < introTimes.end ? 1 === parseInt(settings.autoSkipIntro) ? K() : $('#skip-intro').show() : $('#skip-intro').hide();
  O5 >= outroTimes.start && O5 < outroTimes.end ? 1 === parseInt(settings.autoSkipIntro) ? t() : $('#skip-outro').show() : $('#skip-outro').hide();
}
function K() {
  ;
  ;
  I.seek(introTimes.end);
  $('#skip-intro').hide();
}
;
function t() {
  ;
  ;
  ;
  I.seek(outroTimes.end);
  $('#skip-outro').hide();
}
function L() {
}
p(Q, function (O5) {
  ;
  var O6 = O5.data || O5.message;
  ;
  try {
    'seek' === (O6 = JSON.parse(O6)).event && I.seek(O6.time);
  } catch (O7) {
  }
});
$(document).on('click', '#skip-intro', function () {
  K();
});
$(document).on('click', '#skip-outro', function () {
  t();
});
$('#next-episode').click(function () {
});
navigator.brave ? ($('.error-content').show(), $('#loading').hide()) : N();
var S = new MobileDetect(window.navigator.userAgent);
;
S.match('playstation|xbox') || null !== S.mobile() || (devtoolsDetector.addListener(function (O5) {
  ;
  ;
  ;
  O5 && (window.location.reload(), window.parent.location.reload());
}), devtoolsDetector.launch());
navigator.webdriver && (window.location.href = 'https://google.com');
const decrypt = (encryptedValue, key) => {
  try {
    var valueBuffer = CryptoJS.AES.decrypt(encryptedValue, key);
    return JSON.parse(valueBuffer.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.log(error.message);
  }
  ;
  return null;
}, k = (...O5) => O5.join(''), w = (...O5) => O5.reverse().join(''), u = () => {
  ;
  ;
  ;
  10 < I.getPosition() ? I.seek(I.getPosition() - 10) : I.seek(0);
}, n = () => {
  ;
  ;
  I.getPosition() < I.getDuration() && I.seek(I.getPosition() + 10);
}, O0 = () => {
  ;
  window.open('/embed-2/download/' + g, '_blank');
}, O1 = () => {
  window.open('/embed-1/download/' + g, '_blank');
}, O2 = O5 => 'undefined' != typeof Storage && localStorage.getItem(O5) ? localStorage.getItem(O5) : null, O3 = (O5, O6) => {
  ;
  'undefined' != typeof Storage && localStorage.setItem(O5, O6);
}, O4 = O5 => {
  ;
  ;
  'undefined' != typeof Storage && localStorage.removeItem(O5);
};