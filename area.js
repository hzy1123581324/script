(function (a) {
  function t(j, b) {
    function g(j) {
      return a.isArray(p.readonly) ? (j = a(".dwwl", z).index(j), p.readonly[j]) : p.readonly
    }

    function m(a) {
      var j = '<div class="dw-bf">', c = 1, b;
      for (b in $[a])0 == c % 20 && (j += '</div><div class="dw-bf">'), j += '<div class="dw-li dw-v" data-val="' + b + '" style="height:' + N + "px;line-height:" + N + 'px;"><div class="dw-i">' + $[a][b] + "</div></div>", c++;
      return j + "</div>"
    }

    function r(j) {
      f = a(".dw-li", j).index(a(".dw-v", j).eq(0));
      s = a(".dw-li", j).index(a(".dw-v", j).eq(-1));
      C = a(".dw-ul", z).index(j);
      i = N;
      B = o
    }

    function u(a) {
      var j = p.headerText;
      return j ? "function" === typeof j ? j.call(S, a) : j.replace(/\{value\}/i, a) : ""
    }

    function k() {
      o.temp = Y && null !== o.val && o.val != F.val() || null === o.values ? p.parseValue(F.val() || "", o) : o.values.slice(0);
      o.setValue(!0)
    }

    function n(j, c, b, f, i) {
      !1 !== L("validate", [z, c, j]) && (a(".dw-ul", z).each(function (b) {
        var d = a(this), e = a('.dw-li[data-val="' + o.temp[b] + '"]', d), h = a(".dw-li", d), g = h.index(e), p = h.length, l = b == c || void 0 === c;
        if (!e.hasClass("dw-v")) {
          for (var I = e, m = 0, r = 0; 0 <= g - m && !I.hasClass("dw-v");)m++,
            I = h.eq(g - m);
          for (; g + r < p && !e.hasClass("dw-v");)r++, e = h.eq(g + r);
          (r < m && r && 2 !== f || !m || 0 > g - m || 1 == f) && e.hasClass("dw-v") ? g += r : (e = I, g -= m)
        }
        if (!e.hasClass("dw-sel") || l)o.temp[b] = e.attr("data-val"), a(".dw-sel", d).removeClass("dw-sel"), e.addClass("dw-sel"), o.scroll(d, b, g, l ? j : 0.1, l ? i : void 0)
      }), o.change(b))
    }

    function t(j) {
      if (!("inline" == p.display || T === a(window).width() && ea === a(window).height() && j)) {
        var c, b, e, d, f, i, g, h, m, l = 0, r = 0, j = a(window).scrollTop();
        d = a(".dwwr", z);
        var I = a(".dw", z), o = {};
        f = void 0 === p.anchor ? F : p.anchor;
        T = a(window).width();
        ea = a(window).height();
        P = (P = window.innerHeight) || ea;
        /modal|bubble/.test(p.display) && (a(".dwc", z).each(function () {
          c = a(this).outerWidth(!0);
          l += c;
          r = c > r ? c : r
        }), c = l > T ? r : l, d.width(c));
        W = I.outerWidth();
        Q = I.outerHeight(!0);
        "modal" == p.display ? (b = (T - W) / 2, e = j + (P - Q) / 2) : "bubble" == p.display ? (m = !0, h = a(".dw-arrw-i", z), b = f.offset(), i = b.top, g = b.left, d = f.outerWidth(), f = f.outerHeight(), b = g - (I.outerWidth(!0) - d) / 2, b = b > T - W ? T - (W + 20) : b, b = 0 <= b ? b : 20, e = i - Q, e < j || i > j + P ? (I.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"),
          e = i + f) : I.removeClass("dw-bubble-bottom").addClass("dw-bubble-top"), h = h.outerWidth(), d = g + d / 2 - (b + (W - h) / 2), a(".dw-arr", z).css({left: d > h ? h : d})) : (o.width = "100%", "top" == p.display ? e = j : "bottom" == p.display && (e = j + P - Q));
        o.top = 0 > e ? 0 : e;
        //o.left = b;
        I.css(o);
        a(".dw-persp", z).height(0).height(e + Q > a(document).height() ? e + Q : a(document).height());
        m && (e + Q > j + P || i > j + P) && a(window).scrollTop(e + Q - P)
      }
    }

    function ga(a) {
      if ("touchstart" === a.type)J = !0, setTimeout(function () {
        J = !1
      }, 500); else if (J)return J = !1;
      return !0
    }

    function L(j, c) {
      var e;
      c.push(o);
      a.each([aa.defaults, ba, b], function (a, b) {
        b[j] && (e = b[j].apply(S, c))
      });
      return e
    }

    function ma(a) {
      var j = +a.data("pos") + 1;
      l(a, j > s ? f : j, 1, !0)
    }

    function na(a) {
      var j = +a.data("pos") - 1;
      l(a, j < f ? s : j, 2, !0)
    }

    var ha, N, R, z, T, P, ea, W, Q, U, ia, o = this, fa = a.mobiscroll_city, S = j, F = a(S), aa, ja, p = G({}, ka), ba = {}, $ = [], X = {}, ca = {}, Y = F.is("input"), V = !1;
    o.enable = function () {
      p.disabled = !1;
      Y && F.prop("disabled", !1)
    };
    o.disable = function () {
      p.disabled = !0;
      Y && F.prop("disabled", !0)
    };
    o.scroll = function (a, j, b, c, f) {
      function i() {
        clearInterval(X[j]);
        delete X[j];
        a.data("pos", b).closest(".dwwl").removeClass("dwa")
      }

      var g = (ha - b) * N, h;
      g == ca[j] && X[j] || (c && g != ca[j] && L("onAnimStart", [z, j, c]), ca[j] = g, a.attr("style", d + "-transition:all " + (c ? c.toFixed(3) : 0) + "s ease-out;" + (e ? d + "-transform:translate3d(0," + g + "px,0);" : "top:" + g + "px;")), X[j] && i(), c && void 0 !== f ? (h = 0, a.closest(".dwwl").addClass("dwa"), X[j] = setInterval(function () {
        h += 0.1;
        a.data("pos", Math.round((b - f) * Math.sin(h / c * (Math.PI / 2)) + f));
        h >= c && i()
      }, 100)) : a.data("pos", b))
    };
    o.setValue = function (j, b, c, e) {
      a.isArray(o.temp) ||
      (o.temp = p.parseValue(o.temp + "", o));
      V && j && n(c);
      R = p.formatResult(o.temp);
      e || (o.values = o.temp.slice(0), o.val = R);
      b && Y && F.val(R).trigger("change")
    };
    o.getValues = function () {
      var a = [], j;
      for (j in o._selectedValues)a.push(o._selectedValues[j]);
      return a
    };
    o.validate = function (a, j, b, c) {
      n(b, a, !0, j, c)
    };
    o.change = function (j) {
      R = p.formatResult(o.temp);
      "inline" == p.display ? o.setValue(!1, j) : a(".dwv", z).html(u(R));
      j && L("onChange", [R])
    };
    o.changeWheel = function (j, b) {
      if (z) {
        var c = 0, e, f, d = j.length;
        for (e in p.wheels)for (f in p.wheels[e]) {
          if (-1 <
            a.inArray(c, j) && ($[c] = p.wheels[e][f], a(".dw-ul", z).eq(c).html(m(c)), d--, !d)) {
            t();
            n(b, void 0, !0);
            return
          }
          c++
        }
      }
    };
    o.isVisible = function () {
      return V
    };
    o.tap = function (a, j) {
      var c, b;
      p.tap && a.bind("touchstart", function (a) {
        a.preventDefault();
        c = A(a, "X");
        b = A(a, "Y")
      }).bind("touchend", function (a) {
        20 > Math.abs(A(a, "X") - c) && 20 > Math.abs(A(a, "Y") - b) && j.call(this, a);
        M = !0;
        setTimeout(function () {
          M = !1
        }, 300)
      });
      a.bind("click", function (a) {
        M || j.call(this, a)
      })
    };
    o.show = function (j) {
      if (p.disabled || V)return !1;
      "top" == p.display && (U = "slidedown");
      "bottom" == p.display && (U = "slideup");
      k();
      L("onBeforeShow", [z]);
      var b = 0, e, f = "";
      U && !j && (f = "dw-" + U + " dw-in");
      for (var d = '<div class="dw-trans ' + p.theme + " dw-" + p.display + '">' + ("inline" == p.display ? '<div class="dw dwbg dwi"><div class="dwwr">' : '<div class="dw-persp dw-city"><div class="dwo"></div><div class="dw dwbg ' + f + '"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr">' + (p.headerText ? '<div class="dwv"></div>' : "")), j = 0; j < p.wheels.length; j++) {
        d += '<div class="dwc' +
          ("scroller_city" != p.mode ? " dwpm" : " dwsc") + (p.showLabel ? "" : " dwhl") + '"><div class="dwwc dwrc">';
        for (e in p.wheels[j])$[b] = p.wheels[j][e], d += '<div class="dwwl dwrc dwwl' + b + '">' + ("scroller_city" != p.mode ? '<div class="dwwb dwwbp" style="height:' + N + "px;line-height:" + N + 'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:' + N + "px;line-height:" + N + 'px;"><span>&ndash;</span></div>' : "") + '<div class="dwl">' + e + '</div><div class="dww" style="height:' + p.rows * N + "px;min-width:" +
          p.width + 'px;"><div class="dw-ul">', d += m(b), d += '</div><div class="dwwo"></div></div><div class="dwwol"></div></div>', b++;
        d += "</div></div>"
      }
      d += ("inline" != p.display ? '<div class="dwbc' + (p.button3 ? " dwbc-p" : "") + '"><span class="dwbw dwb-s"><span class="dwb">' + p.setText + "</span></span>" + (p.button3 ? '<span class="dwbw dwb-n"><span class="dwb">' + p.button3Text + "</span></span>" : "") + '<span class="dwbw dwb-c"><span class="dwb">' + p.cancelText + "</span></span></div></div>" : '<div class="dwcc"></div>') +
        "</div></div></div>";
      z = a(d);
      n();
      L("onMarkupReady", [z]);
      "inline" != p.display ? (z.appendTo("body"), setTimeout(function () {
        z.removeClass("dw-trans").find(".dw").removeClass(f)
      }, 350)) : F.is("div") ? F.html(z) : z.insertAfter(F);
      L("onMarkupInserted", [z]);
      V = !0;
      aa.init(z, o);
      "inline" != p.display && (o.tap(a(".dwb-s span", z), function () {
        if (o.hide(false, "set") !== false) {
          o.setValue(false, true);
          L("onSelect", [o.val])
        }
      }), o.tap(a(".dwb-c span", z), function () {
        o.cancel()
      }), p.button3 && o.tap(a(".dwb-n span", z), p.button3), p.scrollLock &&
      z.bind("touchmove", function (a) {
        Q <= P && W <= T && a.preventDefault()
      }), a("input,select,button").each(function () {
        a(this).prop("disabled") || a(this).addClass("dwtd").prop("disabled", true)
      }), t(), a(window).bind("resize.dw", function () {
        clearTimeout(ia);
        ia = setTimeout(function () {
          t(true)
        }, 100)
      }));
      z.delegate(".dwwl", "DOMMouseScroll mousewheel", function (j) {
        if (!g(this)) {
          j.preventDefault();
          var j = j.originalEvent, j = j.wheelDelta ? j.wheelDelta / 120 : j.detail ? -j.detail / 3 : 0, b = a(".dw-ul", this), c = +b.data("pos"), c = Math.round(c - j);
          r(b);
          l(b, c, j < 0 ? 1 : 2)
        }
      }).delegate(".dwb, .dwwb", Z, function () {
        a(this).addClass("dwb-a")
      }).delegate(".dwwb", Z, function (j) {
        j.stopPropagation();
        j.preventDefault();
        var b = a(this).closest(".dwwl");
        if (ga(j) && !g(b) && !b.hasClass("dwa")) {
          w = true;
          var c = b.find(".dw-ul"), e = a(this).hasClass("dwwbp") ? ma : na;
          r(c);
          clearInterval(H);
          H = setInterval(function () {
            e(c)
          }, p.delay);
          e(c)
        }
      }).delegate(".dwwl", Z, function (j) {
        j.preventDefault();
        if (ga(j) && !h && !g(this) && !w) {
          h = true;
          a(document).bind(I, la);
          y = a(".dw-ul", this);
          c = p.mode != "clickpick";
          D = +y.data("pos");
          r(y);
          E = X[C] !== void 0;
          v = A(j, "Y");
          K = new Date;
          x = v;
          o.scroll(y, C, D, 0.0010);
          c && y.closest(".dwwl").addClass("dwa")
        }
      });
      L("onShow", [z, R])
    };
    o.hide = function (j, b) {
      if (!V || !1 === L("onClose", [R, b]))return !1;
      a(".dwtd").prop("disabled", !1).removeClass("dwtd");
      F.blur();
      z && ("inline" != p.display && U && !j ? (z.addClass("dw-trans").find(".dw").addClass("dw-" + U + " dw-out"), setTimeout(function () {
        z.remove();
        z = null
      }, 350)) : (z.remove(), z = null), V = !1, ca = {}, a(window).unbind(".dw"))
    };
    o.cancel = function () {
      !1 !== o.hide(!1,
        "cancel") && L("onCancel", [o.val])
    };
    o.init = function (a) {
      aa = G({defaults: {}, init: q}, fa.themes[a.theme || p.theme]);
      ja = fa.i18n[a.lang || p.lang];
      G(b, a);
      G(p, aa.defaults, ja, b);
      o.settings = p;
      F.unbind(".dw");
      if (a = fa.presets[p.preset])ba = a.call(S, o), G(p, ba, b), G(da, ba.methods);
      ha = Math.floor(p.rows / 2);
      N = p.height;
      U = p.animate;
      void 0 !== F.data("dwro") && (S.readOnly = O(F.data("dwro")));
      V && o.hide();
      "inline" == p.display ? o.show() : (k(), Y && p.showOnFocus && (F.data("dwro", S.readOnly), S.readOnly = !0, F.bind("focus.dw", function () {
        o.show()
      })))
    };
    o.trigger = function (a, j) {
      return L(a, j)
    };
    o.values = null;
    o.val = null;
    o.temp = null;
    o._selectedValues = {};
    o.init(b)
  }

  function k(a) {
    for (var c in a)if (void 0 !== b[a[c]])return !0;
    return !1
  }

  function n(a) {
    return g[a.id]
  }

  function A(a, b) {
    var c = a.originalEvent, e = a.changedTouches;
    return e || c && c.changedTouches ? c ? c.changedTouches[0]["page" + b] : e[0]["page" + b] : a["page" + b]
  }

  function O(a) {
    return !0 === a || "true" == a
  }

  function u(a, b, c) {
    a = a > c ? c : a;
    return a < b ? b : a
  }

  function l(j, b, c, e, d) {
    var b = u(b, f, s), g = a(".dw-li", j).eq(b), i = void 0 === d ?
      b : d, h = C, l = e ? b == i ? 0.1 : Math.abs(0.1 * (b - i)) : 0;
    B.temp[h] = g.attr("data-val");
    B.scroll(j, h, b, l, d);
    setTimeout(function () {
      B.validate(h, c, l, d)
    }, 10)
  }

  function m(a, b, c) {
    return da[b] ? da[b].apply(a, Array.prototype.slice.call(c, 1)) : "object" === typeof b ? da.init.call(a, b) : a
  }

  var g = {}, H, q = function () {
  }, i, f, s, B, r = (new Date).getTime(), h, w, y, C, v, x, K, D, E, c, b = document.createElement("modernizr").style, e = k(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]), d = function () {
    var a = ["Webkit",
      "Moz", "O", "ms"], b;
    for (b in a)if (k([a[b] + "Transform"]))return "-" + a[b].toLowerCase();
    return ""
  }(), G = a.extend, M, J, Z = "touchstart mousedown", I = "touchmove mousemove", la = function (a) {
    c && (a.preventDefault(), x = A(a, "Y"), B.scroll(y, C, u(D + (v - x) / i, f - 1, s + 1)));
    E = !0
  }, ka = {
    width: 70,
    height: 40,
    rows: 3,
    delay: 300,
    disabled: !1,
    readonly: !1,
    showOnFocus: !0,
    showLabel: !0,
    wheels: [],
    theme: "",
    headerText: "{value}",
    display: "modal",
    mode: "scroller_city",
    preset: "",
    lang: "en-US",
    setText: "Set",
    cancelText: "Cancel",
    scrollLock: !0,
    tap: !0,
    formatResult: function (a) {
      return a.join(" ")
    },
    parseValue: function (a, b) {
      var c = b.settings.wheels, e = a.split(" "), d = [], f = 0, i, h, g;
      for (i = 0; i < c.length; i++)for (h in c[i]) {
        if (void 0 !== c[i][h][e[f]])d.push(e[f]); else for (g in c[i][h]) {
          d.push(g);
          break
        }
        f++
      }
      return d
    }
  }, da = {
    init: function (a) {
      void 0 === a && (a = {});
      return this.each(function () {
        this.id || (r += 1, this.id = "scoller" + r);
        g[this.id] = new t(this, a)
      })
    }, enable: function () {
      return this.each(function () {
        var a = n(this);
        a && a.enable()
      })
    }, disable: function () {
      return this.each(function () {
        var a = n(this);
        a && a.disable()
      })
    }, isDisabled: function () {
      var a =
        n(this[0]);
      if (a)return a.settings.disabled
    }, isVisible: function () {
      var a = n(this[0]);
      if (a)return a.isVisible()
    }, option: function (a, b) {
      return this.each(function () {
        var c = n(this);
        if (c) {
          var e = {};
          "object" === typeof a ? e = a : e[a] = b;
          c.init(e)
        }
      })
    }, setValue: function (a, b, c, e) {
      return this.each(function () {
        var d = n(this);
        d && (d.temp = a, d.setValue(!0, b, c, e))
      })
    }, getInst: function () {
      return n(this[0])
    }, getValue: function () {
      var a = n(this[0]);
      if (a)return a.values
    }, getValues: function () {
      var a = n(this[0]);
      if (a)return a.getValues()
    },
    show: function () {
      var a = n(this[0]);
      if (a)return a.show()
    }, hide: function () {
      return this.each(function () {
        var a = n(this);
        a && a.hide()
      })
    }, destroy: function () {
      return this.each(function () {
        var b = n(this);
        b && (b.hide(), a(this).unbind(".dw"), delete g[this.id], a(this).is("input") && (this.readOnly = O(a(this).data("dwro"))))
      })
    }
  };
  a(document).bind("touchend mouseup", function () {
    if (h) {
      var b = new Date - K, e = u(D + (v - x) / i, f - 1, s + 1), d, g = y.offset().top;
      300 > b ? (b = (x - v) / b, d = b * b / 0.0012, 0 > x - v && (d = -d)) : d = x - v;
      b = Math.round(D - d / i);
      if (!d && !E) {
        var g =
          Math.floor((x - g) / i), r = a(".dw-li", y).eq(g);
        d = c;
        !1 !== B.trigger("onValueTap", [r]) ? b = g : d = !0;
        d && (r.addClass("dw-hl"), setTimeout(function () {
          r.removeClass("dw-hl")
        }, 200))
      }
      c && l(y, b, 0, !0, Math.round(e));
      h = !1;
      y = null;
      a(document).unbind(I, la)
    }
    w && (clearInterval(H), w = !1);
    a(".dwb-a").removeClass("dwb-a")
  }).bind("mouseover mouseup mousedown click", function (a) {
    if (M)return a.stopPropagation(), a.preventDefault(), !1
  });
  a.fn.mobiscroll_city = function (b) {
    G(this, a.mobiscroll_city.shorts);
    return m(this, b, arguments)
  };
  a.mobiscroll_city = a.mobiscroll_city ||
    {
      setDefaults: function (a) {
        G(ka, a)
      }, presetShort: function (a) {
      this.shorts[a] = function (b) {
        return m(this, G(b, {preset: a}), arguments)
      }
    }, shorts: {}, presets: {}, themes: {}, i18n: {}
    };
  a.scroller_city = a.scroller_city || a.mobiscroll_city;
  a.fn.scroller_city = a.fn.scroller_city || a.fn.mobiscroll_city
})(jQuery);

(function (a) {
  var t = a.mobiscroll_city, k = {invalid: [], showInput: !0, inputClass: ""}, n = function (n) {
    function t(g, c, b, e) {
      for (var d = 0; d < c;) {
        var f = a(".dwwl" + d, g), i = u(e, d, b);
        a.each(i, function (b, c) {
          a('.dw-li[data-val="' + c + '"]', f).removeClass("dw-v")
        });
        d++
      }
    }

    function u(a, c, b) {
      for (var e = 0, d, g = []; e < c;) {
        var f = a[e];
        for (d in b)if (b[d].key == f) {
          b = b[d].children;
          break
        }
        e++
      }
      for (e = 0; e < b.length;)b[e].invalid && g.push(b[e].key), e++;
      return g
    }

    function l(a, c) {
      for (var b = []; a;)b[--a] = !0;
      b[c] = !1;
      return b
    }

    function m(a, c, b) {
      var e = 0, d, f, i =
        [{}], h = v;
      if (c)for (d = 0; d < c; d++)i[d] = {}, i[d][x[d]] = {};
      for (; e < a.length;) {
        i[e] = {};
        d = i[e];
        for (var c = x[e], k = h, l = {}, m = 0; m < k.length;)l[k[m].key] = k[m++].value;
        d[c] = l;
        d = 0;
        for (c = void 0; d < h.length && void 0 === c;) {
          if (h[d].key == a[e] && (void 0 !== b && e <= b || void 0 === b))c = d;
          d++
        }
        if (void 0 !== c && h[c].children)e++, h = h[c].children; else if ((f = g(h)) && f.children)e++, h = f.children; else break
      }
      return i
    }

    function g(a, c) {
      if (!a)return !1;
      for (var b = 0, e; b < a.length;)if (!(e = a[b++]).invalid)return c ? b - 1 : e;
      return !1
    }

    function H(g, c) {
      a(".dwc",
        g).css("display", "").slice(c).hide()
    }

    function q(a, c) {
      var b = [], e = v, d = 0, f = !1, i, h;
      if (void 0 !== a[d] && d <= c) {
        f = 0;
        i = a[d];
        for (h = void 0; f < e.length && void 0 === h;)e[f].key == a[d] && !e[f].invalid && (h = f), f++
      } else h = g(e, !0), i = e[h].key;
      f = void 0 !== h ? e[h].children : !1;
      for (b[d] = i; f;) {
        e = e[h].children;
        d++;
        if (void 0 !== a[d] && d <= c) {
          f = 0;
          i = a[d];
          for (h = void 0; f < e.length && void 0 === h;)e[f].key == a[d] && !e[f].invalid && (h = f), f++
        } else h = g(e, !0), h = !1 === h ? void 0 : h, i = e[h].key;
        f = void 0 !== h && g(e[h].children) ? e[h].children : !1;
        b[d] = i
      }
      return {
        lvl: d +
        1, nVector: b
      }
    }

    function i(g) {
      var c = [];
      w = w > y++ ? w : y;
      g.children("li").each(function (b) {
        var e = a(this), d = e.clone();
        d.children("ul,ol").remove();
        var d = d.html().replace(/^\s\s*/, "").replace(/\s\s*$/, ""), g = e.data("invalid") ? !0 : !1, b = {
          key: e.data("val") || b,
          value: d,
          invalid: g,
          children: null
        }, e = e.children("ul,ol");
        e.length && (b.children = i(e));
        c.push(b)
      });
      y--;
      return c
    }

    var f = a.extend({}, k, n.settings), s = a(this), B, r, h = this.id + "_dummy", w = 0, y = 0, C = {}, v = f.wheelArray || i(s), x = function (a) {
      var c = [], b;
      for (b = 0; b < a; b++)c[b] = f.labels &&
      f.labels[b] ? f.labels[b] : b;
      return c
    }(w), K = [], D = function (a) {
      for (var c = [], b, e = !0, d = 0; e;)if (b = g(a), c[d++] = b.key, e = b.children)a = b.children;
      return c
    }(v), D = m(D, w);
    a("#" + h).remove();
    f.showInput && (B = a('<input type="text" id="' + h + '" value="" class="' + f.inputClass + '" readonly />').insertBefore(s), n.settings.anchor = B, f.showOnFocus && B.focus(function () {
      n.show()
    }));
    f.wheelArray || s.hide().closest(".ui-field-contain").trigger("create");
    return {
      width: 50, wheels: D, headerText: !1, onBeforeShow: function () {
        var a = n.temp;
        K =
          a.slice(0);
        n.settings.wheels = m(a, w, w);
        r = true
      }, onSelect: function (a) {
        //B && B.val(a)
      }, onChange: function (a) {
        //B && f.display == "inline" && B.val(a)
      }, onClose: function () {
        B && B.blur()
      }, onShow: function (g) {
        a(".dwwl", g).bind("mousedown touchstart", function () {
          clearTimeout(C[a(".dwwl", g).index(this)])
        })
      }, validate: function (a, c, b) {
        var e = n.temp;
        if (c !== void 0 && K[c] != e[c] || c === void 0 && !r) {
          n.settings.wheels = m(e, null, c);
          var d = [], g = (c || 0) + 1, f = q(e, c);
          if (c !== void 0)n.temp = f.nVector.slice(0);
          for (; g < f.lvl;)d.push(g++);
          H(a, f.lvl);
          K =
            n.temp.slice(0);
          if (d.length) {
            r = true;
            n.settings.readonly = l(w, c);
            clearTimeout(C[c]);
            C[c] = setTimeout(function () {
              n.changeWheel(d);
              n.settings.readonly = false
            }, b * 1E3);
            return false
          }
          t(a, f.lvl, v, n.temp)
        } else {
          f = q(e, e.length);
          t(a, f.lvl, v, e);
          H(a, f.lvl)
        }
        r = false
      }
    }
  };
  a.each(["list", "image", "treelist"], function (a, k) {
    t.presets[k] = n;
    t.presetShort(k)
  })
})(jQuery);



(function ($) {
  $.mobiscroll_city.i18n.zh = $.extend($.mobiscroll_city.i18n.zh, {
    setText: '确定',
    cancelText: '取消'
  });
})(jQuery);
//创建list数据
(function($){

  $.extend({
    area_init : function(options){
      if ($('#demo_tree_list').length > 0)//如果有,就不处理了
        return;
      var opts = {
        get_val: 'full_name',//可取  cFullName,cName,cAbbName
        selector: '',
        labels: ['省', '市'],
        on_selected: false,
        json_url : "script/city.json"
      };
      var id = "test_tree_list";
      opts = $.extend(opts, options);
      var selector = opts.selector;
      var list = '<div data-role="fieldcontain" class="demos fieldcontain" id="demo_tree_list">';
      list += '<ul id="' + id + '"></ul></div>';
      $('body').append(list);

      var ul = $('#' + id + '');
      $.ajax({
        dataType: "json",
        url: opts.json_url,
        success: function (area_data) {
          var html = "";
          //按层次添加对象
          for (var i1 = 0; i1 < area_data.length; i1++) {
            var area1 = area_data[i1];
            var li1 = '<li>';
            li1 += area1.cName;
            //第二级
            if (opts.labels.length > 1 && area1.hasOwnProperty("child") && area1["child"] && Array.prototype.isPrototypeOf(area1["child"])) {
              var li2 = '<ul>';
              for (var i2 = 0; i2 < area1["child"].length; i2++) {
                var area2 = area1.child[i2];
                li2 += '<li>';
                li2 += area2.cName;
                //第三级
                if (opts.labels.length > 2 && area2.hasOwnProperty("child") && area2["child"] && Array.prototype.isPrototypeOf(area2["child"])) {
                  var li3 = '<ul>';
                  for (var i3 = 0; i3 < area2["child"].length; i3++) {
                    var area3 = area2.child[i3];
                    li3 += '<li>';
                    li3 += area3.cName;
                    li3 += '</li>';
                  }
                  li3 += '</ul>';
                  li2 += li3;
                }
                li2 += '</li>';

              }

              li2 += '</ul>';
              li1 += li2;
            }


            li1 += '</li>';
            html += li1;

          }
          ul.html(html);

          $('#' + id + '').scroller_city(
            $.extend(
              {
                preset: 'list',
                labels: opts.labels
              },
              {
                theme: 'android-ics light',
                mode: 'scroller_city',
                display: 'modal',
                lang: 'zh',
                onValueTap: function (ret) {
                  //alert(JSON.stringify(ret));
                },
                onSelect: function (ret) {

                  if (opts.on_selected == false)
                    $(selector).attr('data-id', ret.id).val(ret[opts.get_val]);
                  else {
                    opts.on_selected(ret);
                  }
                },
                formatResult: function (array) {//返回自定义格式结果

                  //console.log(JSON.stringify(array));
                  var val = '';
                  var full_name = '';
                  var id = 0;
                  var abb_name = '';//简称
                  var name = '';//名称
                  var obj = false;
                  var obj_super = false;
                  switch (opts.labels.length) {
                    case 1:
                      obj = area_data[array[0]];
                      break;
                    case 2:
                      obj = area_data[array[0]].child[array[1]];
                      obj_super = area_data[array[0]];
                      break;
                    case 3:
                      obj = area_data[array[0]].child[array[1]].child[array[2]];
                      obj_super = area_data[array[0]].child[array[1]];
                      break;
                    default://最多4级
                      obj = area_data[array[0]].child[array[1]].child[array[2]].child[array[3]];
                      obj_super = area_data[array[0]].child[array[1]].child[array[2]];
                      break;
                  }
                  val = obj.cFullName;
                  abb_name = obj.cAbbName ? obj.cAbbName : obj.cName;
                  name = obj.cName;
                  full_name = obj.cFullName;
                  id = obj.id;


                  //$(selector).attr('data-id',id).html(val);

                  return {
                    id: id,
                    full_name: full_name,
                    abb_name: abb_name,
                    name: name,
                    id_super: obj_super == false ? 0 : obj_super.id,
                    full_name_super: obj_super == false ? '' : obj_super.cFullName,
                    abb_name_super: obj_super == false ? '' : (obj_super.cAbbName ? obj_super.cAbbName : obj_super.cName),
                    name_super: obj_super == false ? '' : obj_super.cName
                  };


                }
              }
            )
          );

          $(selector).on("click", function(){
            $('#' + id + '_dummy').trigger('focus');
          });

        }
      });
    }
  })

}(jQuery));


 

 






