!function () {
    for (var t, e = function () {
    }, n = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeStamp", "trace", "warn"], i = n.length, o = window.console = window.console || {}; i--;)t = n[i], o[t] || (o[t] = e)
}(), function (t) {
    t.fn.slabText = function (e) {
        var n = {fontRatio: .78, forceNewCharCount: !0, wrapAmpersand: !0, headerBreakpoint: null, viewportBreakpoint: null, noResizeEvent: !1, resizeThrottleTime: 300, maxFontSize: 999, postTweak: !0, precision: 3, minCharsPerLine: 0};
        return t("body").addClass("slabtexted"), this.each(function () {
            e && t.extend(n, e);
            var i = t(this), o = t("span.slabtext", i).length, a = o ? [] : String(t.trim(i.text())).replace(/\s{2,}/g, " ").split(" "), s = null, r = null, l = n.fontRatio, c = n.forceNewCharCount, h = n.headerBreakpoint, f = n.viewportBreakpoint, u = n.postTweak, d = n.precision, p = n.resizeThrottleTime, g = n.minCharsPerLine, m = null, v = t(window).width(), w = i.find("a:first").attr("href") || i.attr("href"), x = w ? i.find("a:first").attr("title") : "";
            if (!(!o && g && a.join(" ").length < g)) {
                var b = function () {
                    var t = jQuery('<div style="display:none;font-size:1em;margin:0;padding:0;height:auto;line-height:1;border:0;">&nbsp;</div>').appendTo(i), e = t.height();
                    return t.remove(), e
                }, y = function () {
                    var e, p = i.width();
                    if (0 !== p) {
                        if (i.removeClass("slabtextdone slabtextinactive"), f && f > v || h && h > p)return void i.addClass("slabtextinactive");
                        if (e = b(), o || !c && e == s)s = e; else {
                            s = e;
                            var m, y, _, C = Math.min(60, Math.floor(p / (s * l))), $ = 0, T = [], k = "", j = "", A = "";
                            if (C != r) {
                                for (r = C; $ < a.length;) {
                                    for (j = ""; j.length < r && (k = j, j += a[$] + " ", !(++$ >= a.length)););
                                    g && (m = a.slice($).join(" "), m.length < g && (j += m, k = j, $ = a.length + 2)), y = r - k.length, _ = j.length - r, _ > y && k.length >= (g || 2) ? (A = k, $--) : A = j, A = t("<div/>").text(A).html(), n.wrapAmpersand && (A = A.replace(/&amp;/g, '<span class="amp">&amp;</span>')), A = t.trim(A), T.push('<span class="slabtext">' + A + "</span>")
                                }
                                i.html(T.join(" ")), w && i.wrapInner('<a href="' + w + '" ' + (x ? 'title="' + x + '" ' : "") + "/>")
                            }
                        }
                        t("span.slabtext", i).each(function () {
                            var e, i, o, a = t(this), r = a.text(), l = r.split(" ").length > 1;
                            u && a.css({"word-spacing": 0, "letter-spacing": 0}), i = p / a.width(), o = parseFloat(this.style.fontSize) || s, a.css("font-size", Math.min((o * i).toFixed(d), n.maxFontSize) + "px"), e = u ? p - a.width() : !1, e && a.css((l ? "word" : "letter") + "-spacing", (e / (l ? r.split(" ").length - 1 : r.length)).toFixed(d) + "px")
                        }), i.addClass("slabtextdone")
                    }
                };
                y(), n.noResizeEvent || t(window).resize(function () {
                    t(window).width() != v && (v = t(window).width(), clearTimeout(m), m = setTimeout(y, p))
                })
            }
        })
    }
}(jQuery), function (t) {
    function e(t) {
        return"object" == typeof t ? t : {top: t, left: t}
    }

    var n = t.scrollTo = function (e, n, i) {
        t(window).scrollTo(e, n, i)
    };
    n.defaults = {axis: "xy", duration: 1, limit: !0};
    n.window = function () {
        return t(window)._scrollable()
    };
    t.fn._scrollable = function () {
        return this.map(function () {
            var e = this, n = !e.nodeName || -1 != t.inArray(e.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]);
            if (!n)return e;
            var i = (e.contentWindow || e).document || e.ownerDocument || e;
            return/webkit/i.test(navigator.userAgent) || "BackCompat" == i.compatMode ? i.body : i.documentElement
        })
    };
    t.fn.scrollTo = function (i, o, a) {
        return"object" == typeof o && (a = o, o = 0), "function" == typeof a && (a = {onAfter: a}), "max" == i && (i = 9e9), a = t.extend({}, n.defaults, a), o = o || a.duration, a.queue = a.queue && a.axis.length > 1, a.queue && (o /= 2), a.offset = e(a.offset), a.over = e(a.over), this._scrollable().each(function () {
            function s(t) {
                c.animate(f, o, a.easing, t && function () {
                    t.call(this, i, a)
                })
            }

            if (null != i) {
                var r, l = this, c = t(l), h = i, f = {}, u = c.is("html,body");
                switch (typeof h) {
                    case"number":
                    case"string":
                        if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(h)) {
                            h = e(h);
                            break
                        }
                        if (h = t(h, this), !h.length)return;
                    case"object":
                        (h.is || h.style) && (r = (h = t(h)).offset())
                }
                t.each(a.axis.split(""), function (t, e) {
                    var i = "x" == e ? "Left" : "Top", o = i.toLowerCase(), d = "scroll" + i, p = l[d], g = n.max(l, e);
                    if (r)f[d] = r[o] + (u ? 0 : p - c.offset()[o]), a.margin && (f[d] -= parseInt(h.css("margin" + i)) || 0, f[d] -= parseInt(h.css("border" + i + "Width")) || 0), f[d] += a.offset[o] || 0, a.over[o] && (f[d] += h["x" == e ? "width" : "height"]() * a.over[o]); else {
                        var m = h[o];
                        f[d] = m.slice && "%" == m.slice(-1) ? parseFloat(m) / 100 * g : m
                    }
                    a.limit && /^\d+$/.test(f[d]) && (f[d] = f[d] <= 0 ? 0 : Math.min(f[d], g)), !t && a.queue && (p != f[d] && s(a.onAfterFirst), delete f[d])
                }), s(a.onAfter)
            }
        }).end()
    };
    n.max = function (e, n) {
        var i = "x" == n ? "Width" : "Height", o = "scroll" + i;
        if (!t(e).is("html,body"))return e[o] - t(e)[i.toLowerCase()]();
        var a = "client" + i, s = e.ownerDocument.documentElement, r = e.ownerDocument.body;
        return Math.max(s[o], r[o]) - Math.min(s[a], r[a])
    };
}(jQuery), function (t, e, n) {
    var i = function (i, o) {
        this.elem = i, this.$elem = t(i), this.options = o, this.metadata = this.$elem.data("plugin-options"), this.$nav = this.$elem.find("a"), this.$win = t(e), this.sections = {}, this.didScroll = !1, this.$doc = t(n), this.docHeight = this.$doc.height()
    };
    i.prototype = {defaults: {currentClass: "current", changeHash: !1, easing: "swing", filter: "", scrollSpeed: 750, scrollOffset: 0, scrollThreshold: .5, begin: !1, end: !1, scrollChange: !1}, init: function () {
        var e = this;
        return e.config = t.extend({}, e.defaults, e.options, e.metadata), "" !== e.config.filter && (e.$nav = e.$nav.filter(e.config.filter)), e.$nav.on("click.onePageNav", t.proxy(e.handleClick, e)), e.getPositions(), e.bindInterval(), e.$win.on("resize.onePageNav", t.proxy(e.getPositions, e)), this
    }, adjustNav: function (t, e) {
        t.$elem.find("." + t.config.currentClass).removeClass(t.config.currentClass), e.addClass(t.config.currentClass)
    }, bindInterval: function () {
        var t, e = this;
        e.$win.on("scroll.onePageNav", function () {
            e.didScroll = !0
        }), e.t = setInterval(function () {
            t = e.$doc.height(), e.didScroll && (e.didScroll = !1, e.scrollChange()), t !== e.docHeight && (e.docHeight = t, e.getPositions())
        }, 250)
    }, getHash: function (t) {
        return t.attr("href").split("#")[1]
    }, getPositions: function () {
        var e, n, i, o = this;
        o.$nav.each(function () {
            e = o.getHash(t(this)), i = t("#" + e), i.length && (n = i.offset().top, o.sections[e] = Math.round(n) - o.config.scrollOffset)
        })
    }, getSection: function (t) {
        var e = null, n = Math.round(this.$win.height() * this.config.scrollThreshold);
        for (var i in this.sections)this.sections[i] - n < t && (e = i);
        return e
    }, handleClick: function (n) {
        var i = this, o = t(n.currentTarget), a = o.parent(), s = "#" + i.getHash(o);

        // Disable smooth scrolling (Some chrome issue with scrollTo)
        // a.hasClass(i.config.currentClass) || (i.config.begin && i.config.begin(), i.adjustNav(i, a), i.unbindInterval(), t.scrollTo(s, i.config.scrollSpeed, {axis: "y", easing: i.config.easing, offset: {top: -i.config.scrollOffset}, onAfter: function () {
          // i.config.changeHash && (e.location.hash = s), i.bindInterval(), i.config.end && i.config.end()
        // }}));

        // Change navbar classes
        i.adjustNav(i, a);

        // n.preventDefault()
    }, scrollChange: function () {
        var t, e = this.$win.scrollTop(), n = this.getSection(e);
        null !== n && (t = this.$elem.find('a[href$="#' + n + '"]').parent(), t.hasClass(this.config.currentClass) || (this.adjustNav(this, t), this.config.scrollChange && this.config.scrollChange(t)))
    }, unbindInterval: function () {
        clearInterval(this.t), this.$win.unbind("scroll.onePageNav")
    }}, i.defaults = i.prototype.defaults, t.fn.onePageNav = function (t) {
        return this.each(function () {
            new i(this, t).init()
        })
    }
}(jQuery, window, document), function () {
    function t() {
    }

    function e(t, e) {
        this.path = t, "undefined" != typeof e && null !== e ? (this.at_2x_path = e, this.perform_check = !1) : (this.at_2x_path = t.replace(/\.\w+$/, function (t) {
            return"@2x" + t
        }), this.perform_check = !0)
    }

    function n(t) {
        this.el = t, this.path = new e(this.el.getAttribute("src"), this.el.getAttribute("data-at2x"));
        var n = this;
    }

    var i = "undefined" == typeof exports ? window : exports, o = {check_mime_type: !0};
    i.Retina = t, t.configure = function (t) {
        null == t && (t = {});
        for (var e in t)o[e] = t[e]
    }, t.init = function (t) {
        null == t && (t = i);
        var e = t.onload || new Function;
        t.onload = function () {
            var t, i, o = document.getElementsByTagName("img"), a = [];
            for (t = 0; t < o.length; t++)i = o[t], a.push(new n(i));
            e()
        }
    }, t.isRetina = function () {
        var t = "(-webkit-min-device-pixel-ratio: 1.5),                      (min--moz-device-pixel-ratio: 1.5),                      (-o-min-device-pixel-ratio: 3/2),                      (min-resolution: 1.5dppx)";
        return i.devicePixelRatio > 1 ? !0 : i.matchMedia && i.matchMedia(t).matches ? !0 : !1
    }, i.RetinaImagePath = e, e.confirmed_paths = [], e.prototype.is_external = function () {
        return!(!this.path.match(/^https?\:/i) || this.path.match("//" + document.domain))
    }, i.RetinaImage = n, n.prototype.swap = function (t) {
        function e() {
            n.el.complete ? (n.el.setAttribute("width", n.el.offsetWidth), n.el.setAttribute("height", n.el.offsetHeight), n.el.setAttribute("src", t)) : setTimeout(e, 5)
        }

        "undefined" == typeof t && (t = this.path.at_2x_path);
        var n = this;
        e()
    }, t.isRetina() && t.init(i)
}(), jQuery(window).bind("load", function () {
    jQuery(".header-title").slabText(), jQuery(".header-copy").slabText()
}), $(document).ready(function () {
    function t() {
        $("#shownav").toggleClass("show");
        //$("#sidebar").toggleClass("fullHeight");
    }

    $("#navigation").onePageNav({scrollOffset: 50, begin: function () {
            $("body").append('<div id="device-dummy" style="height: 1px;"></div>')
        }, end: function () {
            $("#device-dummy").remove()
        }, filter: ":not(.external)"}), $("#shownavbutton").on("click", function () {
        t()
    }),
    $("#navigation a").on("click", function () {
        t()
    })

});