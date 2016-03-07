/*! nanoScrollerJS - v0.8.4 - (c) 2014 James Florentino; Licensed MIT */ ! function(a, b, c) {
    "use strict";
    var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H;
    z = {
        paneClass: "nano-pane",
        sliderClass: "nano-slider",
        contentClass: "nano-content",
        iOSNativeScrolling: !1,
        preventPageScrolling: !1,
        disableResize: !1,
        alwaysVisible: !1,
        flashDelay: 1500,
        sliderMinHeight: 20,
        sliderMaxHeight: null,
        documentContext: null,
        windowContext: null
    }, u = "scrollbar", t = "scroll", l = "mousedown", m = "mouseenter", n = "mousemove", p = "mousewheel", o = "mouseup", s = "resize", h = "drag", i = "enter", w = "up", r = "panedown", f = "DOMMouseScroll", g = "down", x = "wheel", j = "keydown", k = "keyup", v = "touchmove", d = "Microsoft Internet Explorer" === b.navigator.appName && /msie 7./i.test(b.navigator.appVersion) && b.ActiveXObject, e = null, D = b.requestAnimationFrame, y = b.cancelAnimationFrame, F = c.createElement("div").style, H = function() {
        var a, b, c, d, e, f;
        for (d = ["t", "webkitT", "MozT", "msT", "OT"], a = e = 0, f = d.length; f > e; a = ++e)
            if (c = d[a], b = d[a] + "ransform", b in F) return d[a].substr(0, d[a].length - 1);
        return !1
    }(), G = function(a) {
        return H === !1 ? !1 : "" === H ? a : H + a.charAt(0).toUpperCase() + a.substr(1)
    }, E = G("transform"), B = E !== !1, A = function() {
        var a, b, d;
        return a = c.createElement("div"), b = a.style, b.position = "absolute", b.width = "100px", b.height = "100px", b.overflow = t, b.top = "-9999px", c.body.appendChild(a), d = a.offsetWidth - a.clientWidth, c.body.removeChild(a), d
    }, C = function() {
        var a, c, d;
        return c = b.navigator.userAgent, (a = /(?=.+Mac OS X)(?=.+Firefox)/.test(c)) ? (d = /Firefox\/\d{2}\./.exec(c), d && (d = d[0].replace(/\D+/g, "")), a && +d > 23) : !1
    }, q = function() {
        function j(d, f) {
            this.el = d, this.options = f, e || (e = A()), this.$el = a(this.el), this.doc = a(this.options.documentContext || c), this.win = a(this.options.windowContext || b), this.body = this.doc.find("body"), this.$content = this.$el.children("." + f.contentClass), this.$content.attr("tabindex", this.options.tabIndex || 0), this.content = this.$content[0], this.previousPosition = 0, this.options.iOSNativeScrolling && null != this.el.style.WebkitOverflowScrolling ? this.nativeScrolling() : this.generate(), this.createEvents(), this.addEvents(), this.reset()
        }
        return j.prototype.preventScrolling = function(a, b) {
            if (this.isActive)
                if (a.type === f)(b === g && a.originalEvent.detail > 0 || b === w && a.originalEvent.detail < 0) && a.preventDefault();
                else if (a.type === p) {
                if (!a.originalEvent || !a.originalEvent.wheelDelta) return;
                (b === g && a.originalEvent.wheelDelta < 0 || b === w && a.originalEvent.wheelDelta > 0) && a.preventDefault()
            }
        }, j.prototype.nativeScrolling = function() {
            this.$content.css({
                WebkitOverflowScrolling: "touch"
            }), this.iOSNativeScrolling = !0, this.isActive = !0
        }, j.prototype.updateScrollValues = function() {
            var a, b;
            a = this.content, this.maxScrollTop = a.scrollHeight - a.clientHeight, this.prevScrollTop = this.contentScrollTop || 0, this.contentScrollTop = a.scrollTop, b = this.contentScrollTop > this.previousPosition ? "down" : this.contentScrollTop < this.previousPosition ? "up" : "same", this.previousPosition = this.contentScrollTop, "same" !== b && this.$el.trigger("update", {
                position: this.contentScrollTop,
                maximum: this.maxScrollTop,
                direction: b
            }), this.iOSNativeScrolling || (this.maxSliderTop = this.paneHeight - this.sliderHeight, this.sliderTop = 0 === this.maxScrollTop ? 0 : this.contentScrollTop * this.maxSliderTop / this.maxScrollTop)
        }, j.prototype.setOnScrollStyles = function() {
            var a;
            B ? (a = {}, a[E] = "translate(0, " + this.sliderTop + "px)") : a = {
                top: this.sliderTop
            }, D ? (y && this.scrollRAF && y(this.scrollRAF), this.scrollRAF = D(function(b) {
                return function() {
                    return b.scrollRAF = null, b.slider.css(a)
                }
            }(this))) : this.slider.css(a)
        }, j.prototype.createEvents = function() {
            this.events = {
                down: function(a) {
                    return function(b) {
                        return a.isBeingDragged = !0, a.offsetY = b.pageY - a.slider.offset().top, a.slider.is(b.target) || (a.offsetY = 0), a.pane.addClass("active"), a.doc.bind(n, a.events[h]).bind(o, a.events[w]), a.body.bind(m, a.events[i]), !1
                    }
                }(this),
                drag: function(a) {
                    return function(b) {
                        return a.sliderY = b.pageY - a.$el.offset().top - a.paneTop - (a.offsetY || .5 * a.sliderHeight), a.scroll(), a.contentScrollTop >= a.maxScrollTop && a.prevScrollTop !== a.maxScrollTop ? a.$el.trigger("scrollend") : 0 === a.contentScrollTop && 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"), !1
                    }
                }(this),
                up: function(a) {
                    return function() {
                        return a.isBeingDragged = !1, a.pane.removeClass("active"), a.doc.unbind(n, a.events[h]).unbind(o, a.events[w]), a.body.unbind(m, a.events[i]), !1
                    }
                }(this),
                resize: function(a) {
                    return function() {
                        a.reset()
                    }
                }(this),
                panedown: function(a) {
                    return function(b) {
                        return a.sliderY = (b.offsetY || b.originalEvent.layerY) - .5 * a.sliderHeight, a.scroll(), a.events.down(b), !1
                    }
                }(this),
                scroll: function(a) {
                    return function(b) {
                        a.updateScrollValues(), a.isBeingDragged || (a.iOSNativeScrolling || (a.sliderY = a.sliderTop, a.setOnScrollStyles()), null != b && (a.contentScrollTop >= a.maxScrollTop ? (a.options.preventPageScrolling && a.preventScrolling(b, g), a.prevScrollTop !== a.maxScrollTop && a.$el.trigger("scrollend")) : 0 === a.contentScrollTop && (a.options.preventPageScrolling && a.preventScrolling(b, w), 0 !== a.prevScrollTop && a.$el.trigger("scrolltop"))))
                    }
                }(this),
                wheel: function(a) {
                    return function(b) {
                        var c;
                        if (null != b) return c = b.delta || b.wheelDelta || b.originalEvent && b.originalEvent.wheelDelta || -b.detail || b.originalEvent && -b.originalEvent.detail, c && (a.sliderY += -c / 3), a.scroll(), !1
                    }
                }(this),
                enter: function(a) {
                    return function(b) {
                        var c;
                        if (a.isBeingDragged) return 1 !== (b.buttons || b.which) ? (c = a.events)[w].apply(c, arguments) : void 0
                    }
                }(this)
            }
        }, j.prototype.addEvents = function() {
            var a;
            this.removeEvents(), a = this.events, this.options.disableResize || this.win.bind(s, a[s]), this.iOSNativeScrolling || (this.slider.bind(l, a[g]), this.pane.bind(l, a[r]).bind("" + p + " " + f, a[x])), this.$content.bind("" + t + " " + p + " " + f + " " + v, a[t])
        }, j.prototype.removeEvents = function() {
            var a;
            a = this.events, this.win.unbind(s, a[s]), this.iOSNativeScrolling || (this.slider.unbind(), this.pane.unbind()), this.$content.unbind("" + t + " " + p + " " + f + " " + v, a[t])
        }, j.prototype.generate = function() {
            var a, c, d, f, g, h, i;
            return f = this.options, h = f.paneClass, i = f.sliderClass, a = f.contentClass, (g = this.$el.children("." + h)).length || g.children("." + i).length || this.$el.append('<div class="' + h + '"><div class="' + i + '" /></div>'), this.pane = this.$el.children("." + h), this.slider = this.pane.find("." + i), 0 === e && C() ? (d = b.getComputedStyle(this.content, null).getPropertyValue("padding-right").replace(/[^0-9.]+/g, ""), c = {
                right: -14,
                paddingRight: +d + 14
            }) : e && (c = {
                right: -e
            }, this.$el.addClass("has-scrollbar")), null != c && this.$content.css(c), this
        }, j.prototype.restore = function() {
            this.stopped = !1, this.iOSNativeScrolling || this.pane.show(), this.addEvents()
        }, j.prototype.reset = function() {
            var a, b, c, f, g, h, i, j, k, l, m, n;
            return this.iOSNativeScrolling ? void(this.contentHeight = this.content.scrollHeight) : (this.$el.find("." + this.options.paneClass).length || this.generate().stop(), this.stopped && this.restore(), a = this.content, f = a.style, g = f.overflowY, d && this.$content.css({
                height: this.$content.height()
            }), b = a.scrollHeight + e, l = parseInt(this.$el.css("max-height"), 10), l > 0 && (this.$el.height(""), this.$el.height(a.scrollHeight > l ? l : a.scrollHeight)), i = this.pane.outerHeight(!1), k = parseInt(this.pane.css("top"), 10), h = parseInt(this.pane.css("bottom"), 10), j = i + k + h, n = Math.round(j / b * j), n < this.options.sliderMinHeight ? n = this.options.sliderMinHeight : null != this.options.sliderMaxHeight && n > this.options.sliderMaxHeight && (n = this.options.sliderMaxHeight), g === t && f.overflowX !== t && (n += e), this.maxSliderTop = j - n, this.contentHeight = b, this.paneHeight = i, this.paneOuterHeight = j, this.sliderHeight = n, this.paneTop = k, this.slider.height(n), this.events.scroll(), this.pane.show(), this.isActive = !0, a.scrollHeight === a.clientHeight || this.pane.outerHeight(!0) >= a.scrollHeight && g !== t ? (this.pane.hide(), this.isActive = !1) : this.el.clientHeight === a.scrollHeight && g === t ? this.slider.hide() : this.slider.show(), this.pane.css({
                opacity: this.options.alwaysVisible ? 1 : "",
                visibility: this.options.alwaysVisible ? "visible" : ""
            }), c = this.$content.css("position"), ("static" === c || "relative" === c) && (m = parseInt(this.$content.css("right"), 10), m && this.$content.css({
                right: "",
                marginRight: m
            })), this)
        }, j.prototype.scroll = function() {
            return this.isActive ? (this.sliderY = Math.max(0, this.sliderY), this.sliderY = Math.min(this.maxSliderTop, this.sliderY), this.$content.scrollTop(this.maxScrollTop * this.sliderY / this.maxSliderTop), this.iOSNativeScrolling || (this.updateScrollValues(), this.setOnScrollStyles()), this) : void 0
        }, j.prototype.scrollBottom = function(a) {
            return this.isActive ? (this.$content.scrollTop(this.contentHeight - this.$content.height() - a).trigger(p), this.stop().restore(), this) : void 0
        }, j.prototype.scrollTop = function(a) {
            return this.isActive ? (this.$content.scrollTop(+a).trigger(p), this.stop().restore(), this) : void 0
        }, j.prototype.scrollTo = function(a) {
            return this.isActive ? (this.scrollTop(this.$el.find(a).get(0).offsetTop), this) : void 0
        }, j.prototype.stop = function() {
            return y && this.scrollRAF && (y(this.scrollRAF), this.scrollRAF = null), this.stopped = !0, this.removeEvents(), this.iOSNativeScrolling || this.pane.hide(), this
        }, j.prototype.destroy = function() {
            return this.stopped || this.stop(), !this.iOSNativeScrolling && this.pane.length && this.pane.remove(), d && this.$content.height(""), this.$content.removeAttr("tabindex"), this.$el.hasClass("has-scrollbar") && (this.$el.removeClass("has-scrollbar"), this.$content.css({
                right: ""
            })), this
        }, j.prototype.flash = function() {
            return !this.iOSNativeScrolling && this.isActive ? (this.reset(), this.pane.addClass("flashed"), setTimeout(function(a) {
                return function() {
                    a.pane.removeClass("flashed")
                }
            }(this), this.options.flashDelay), this) : void 0
        }, j
    }(), a.fn.nanoScroller = function(b) {
        return this.each(function() {
            var c, d;
            if ((d = this.nanoscroller) || (c = a.extend({}, z, b), this.nanoscroller = d = new q(this, c)), b && "object" == typeof b) {
                if (a.extend(d.options, b), null != b.scrollBottom) return d.scrollBottom(b.scrollBottom);
                if (null != b.scrollTop) return d.scrollTop(b.scrollTop);
                if (b.scrollTo) return d.scrollTo(b.scrollTo);
                if ("bottom" === b.scroll) return d.scrollBottom(0);
                if ("top" === b.scroll) return d.scrollTop(0);
                if (b.scroll && b.scroll instanceof a) return d.scrollTo(b.scroll);
                if (b.stop) return d.stop();
                if (b.destroy) return d.destroy();
                if (b.flash) return d.flash()
            }
            return d.reset()
        })
    }, a.fn.nanoScroller.Constructor = q
}(jQuery, window, document);
/* metismenu - v1.1.3 - Easy menu jQuery plugin for Twitter Bootstrap 3 * https://github.com/onokumus/metisMenu * Made by Osman Nuri Okumus * Under MIT License */
! function(a, b, c) {
    function d(b, c) {
        this.element = a(b), this.settings = a.extend({}, f, c), this._defaults = f, this._name = e, this.init()
    }
    var e = "metisMenu",
        f = {
            toggle: !0,
            doubleTapToGo: !1
        };
    d.prototype = {
        init: function() {
            var b = this.element,
                d = this.settings.toggle,
                f = this;
            this.isIE() <= 9 ? (b.find("li.active").has("ul").children("ul").collapse("show"), b.find("li").not(".active").has("ul").children("ul").collapse("hide")) : (b.find("li.active").has("ul").children("ul").addClass("collapse in"), b.find("li").not(".active").has("ul").children("ul").addClass("collapse")), f.settings.doubleTapToGo && b.find("li.active").has("ul").children("a").addClass("doubleTapToGo"), b.find("li").has("ul").children("a").on("click." + e, function(b) {
                return b.preventDefault(), f.settings.doubleTapToGo && f.doubleTapToGo(a(this)) && "#" !== a(this).attr("href") && "" !== a(this).attr("href") ? (b.stopPropagation(), void(c.location = a(this).attr("href"))) : (a(this).parent("li").toggleClass("active").children("ul").collapse("toggle"), void(d && a(this).parent("li").siblings().removeClass("active").children("ul.in").collapse("hide")))
            })
        },
        isIE: function() {
            for (var a, b = 3, d = c.createElement("div"), e = d.getElementsByTagName("i"); d.innerHTML = "<!--[if gt IE " + ++b + "]><i></i><![endif]-->", e[0];) return b > 4 ? b : a
        },
        doubleTapToGo: function(a) {
            var b = this.element;
            return a.hasClass("doubleTapToGo") ? (a.removeClass("doubleTapToGo"), !0) : a.parent().children("ul").length ? (b.find(".doubleTapToGo").removeClass("doubleTapToGo"), a.addClass("doubleTapToGo"), !1) : void 0
        },
        remove: function() {
            this.element.off("." + e), this.element.removeData(e)
        }
    }, a.fn[e] = function(b) {
        return this.each(function() {
            var c = a(this);
            c.data(e) && c.data(e).remove(), c.data(e, new d(this, b))
        }), this
    }
}(jQuery, window, document);
! function(n) {
    "use strict";
    window.nifty = {
        container: n("#container"),
        contentContainer: n("#content-container"),
        navbar: n("#navbar"),
        mainNav: n("#mainnav-container"),
        aside: n("#aside-container"),
        footer: n("#footer"),
        scrollTop: n("#scroll-top"),
        window: n(window),
        body: n("body"),
        bodyHtml: n("body, html"),
        document: n(document),
        screenSize: "",
        isMobile: function() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        }(),
        randomInt: function(n, t) {
            return Math.floor(Math.random() * (t - n + 1) + n)
        },
        transition: function() {
            var n = document.body || document.documentElement,
                t = n.style,
                e = void 0 !== t.transition || void 0 !== t.WebkitTransition;
            return e
        }()
    }, nifty.window.on("load", function() {
        var t = n(".add-tooltip");
        t.length && t.tooltip();
        var e = n(".add-popover");
        e.length && e.popover();
        var i = n(".nano");
        i.length && i.nanoScroller({
            preventPageScrolling: !0
        }), n("#navbar-container .navbar-top-links").on("shown.bs.dropdown", ".dropdown", function() {
            n(this).find(".nano").nanoScroller({
                preventPageScrolling: !0
            })
        })
    })
}(jQuery), ! function(n) {
    "use strict";
    nifty.window.on("load", function() {
        var t = n('[data-dismiss="panel"]');
        t.length && t.one("click", function(t) {
            t.preventDefault();
            var e = n(this).parents(".panel");
            e.addClass("remove").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(n) {
                "opacity" == n.originalEvent.propertyName && e.remove()
            })
        })
    })
}(jQuery), ! function() {
    "use strict";
    nifty.window.one("load", function() {
        if (nifty.scrollTop.length && !nifty.isMobile) {
            var n = !0,
                t = 250;
            nifty.window.scroll(function() {
                nifty.window.scrollTop() > t && !n ? (nifty.navbar.addClass("shadow"), nifty.scrollTop.addClass("in"), n = !0) : nifty.window.scrollTop() < t && n && (nifty.navbar.removeClass("shadow"), nifty.scrollTop.removeClass("in"), n = !1)
            }), nifty.scrollTop.on("click", function(n) {
                n.preventDefault(), nifty.bodyHtml.animate({
                    scrollTop: 0
                }, 500)
            })
        }
    })
}(jQuery), ! function(n) {
    "use strict";
    var t = {
        displayIcon: !0,
        iconColor: "text-dark",
        iconClass: "fa fa-refresh fa-spin fa-2x",
        title: "",
        desc: ""
    }, e = function() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        }, i = {
            show: function(t) {
                var i = n(t.attr("data-target")),
                    a = "nifty-overlay-" + e() + e() + "-" + e(),
                    o = n('<div id="' + a + '" class="panel-overlay"></div>');
                return t.prop("disabled", !0).data("niftyOverlay", a), i.addClass("panel-overlay-wrap"), o.appendTo(i).html(t.data("overlayTemplate")), null
            },
            hide: function(t) {
                var e = n(t.attr("data-target")),
                    i = n("#" + t.data("niftyOverlay"));
                return i.length && (t.prop("disabled", !1), e.removeClass("panel-overlay-wrap"), i.hide().remove()), null
            }
        }, a = function(e, i) {
            if (e.data("overlayTemplate")) return null;
            var a = n.extend({}, t, i),
                o = a.displayIcon ? '<span class="panel-overlay-icon ' + a.iconColor + '"><i class="' + a.iconClass + '"></i></span>' : "";
            return e.data("overlayTemplate", '<div class="panel-overlay-content pad-all unselectable">' + o + '<h4 class="panel-overlay-title">' + a.title + "</h4><p>" + a.desc + "</p></div>"), null
        };
    n.fn.niftyOverlay = function(t) {
        return i[t] ? i[t](this) : "object" != typeof t && t ? null : this.each(function() {
            a(n(this), t)
        })
    }
}(jQuery), ! function(n) {
    "use strict";
    var t, e, i = {}, a = !1;
    n.niftyNoty = function(o) {
        {
            var s, l = {
                    type: "primary",
                    icon: "",
                    title: "",
                    message: "",
                    closeBtn: !0,
                    container: "page",
                    floating: {
                        position: "top-right",
                        animationIn: "jellyIn",
                        animationOut: "fadeOut"
                    },
                    html: null,
                    focus: !0,
                    timer: 0
                }, r = n.extend({}, l, o),
                c = n('<div class="alert-wrap"></div>'),
                f = function() {
                    var n = "";
                    return o && o.icon && (n = '<div class="media-left"><span class="icon-wrap icon-wrap-xs icon-circle alert-icon"><i class="' + r.icon + '"></i></span></div>'), n
                }, d = function() {
                    var n = r.closeBtn ? '<button class="close" type="button"><i class="fa fa-times-circle"></i></button>' : "",
                        t = '<div class="alert alert-' + r.type + '" role="alert">' + n + '<div class="media">';
                    return r.html ? t + r.html + "</div></div>" : t + f() + '<div class="media-body"><h4 class="alert-title">' + r.title + '</h4><p class="alert-message">' + r.message + "</p></div></div>"
                }(),
                u = function() {
                    return "floating" === r.container && r.floating.animationOut && (c.removeClass(r.floating.animationIn).addClass(r.floating.animationOut), nifty.transition || c.remove()), c.removeClass("in").on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(n) {
                        "max-height" == n.originalEvent.propertyName && c.remove()
                    }), clearInterval(s), null
                }, v = function(n) {
                    nifty.bodyHtml.animate({
                        scrollTop: n
                    }, 300, function() {
                        c.addClass("in")
                    })
                };
            ! function() {
                if ("page" === r.container) t || (t = n('<div id="page-alert"></div>'), nifty.contentContainer.prepend(t)), e = t, r.focus && v(0);
                else if ("floating" === r.container) i[r.floating.position] || (i[r.floating.position] = n('<div id="floating-' + r.floating.position + '" class="floating-container"></div>'), nifty.container.append(i[r.floating.position])), e = i[r.floating.position], r.floating.animationIn && c.addClass("in animated " + r.floating.animationIn), r.focus = !1;
                else {
                    var o = n(r.container),
                        s = o.children(".panel-alert"),
                        l = o.children(".panel-heading");
                    if (!o.length) return a = !1, !1;
                    s.length ? e = s : (e = n('<div class="panel-alert"></div>'), l.length ? l.after(e) : o.prepend(e)), r.focus && v(o.offset().top - 30)
                }
                return a = !0, !1
            }()
        }
        if (a && (e.append(c.html(d)), c.find('[data-dismiss="noty"]').one("click", u), r.closeBtn && c.find(".close").one("click", u), r.timer > 0 && (s = setInterval(u, r.timer)), !r.focus)) var m = setInterval(function() {
            c.addClass("in"), clearInterval(m)
        }, 200)
    }
}(jQuery), ! function(n) {
    "use strict";
    var t, e = function(t) {
            if (!t.data("nifty-check")) {
                t.data("nifty-check", !0), t.text().trim().length ? t.addClass("form-text") : t.removeClass("form-text");
                var e = t.find("input")[0],
                    i = e.name,
                    a = function() {
                        return "radio" == e.type && i ? n(".form-radio").not(t).find("input").filter("input[name=" + i + "]").parent() : !1
                    }(),
                    o = function() {
                        "radio" == e.type && a.length && a.each(function() {
                            var t = n(this);
                            t.hasClass("active") && t.trigger("nifty.ch.unchecked"), t.removeClass("active")
                        }), e.checked ? t.addClass("active").trigger("nifty.ch.checked") : t.removeClass("active").trigger("nifty.ch.unchecked")
                    };
                e.checked ? t.addClass("active") : t.removeClass("active"), n(e).on("change", o)
            }
        }, i = {
            isChecked: function() {
                return this[0].checked
            },
            toggle: function() {
                return this[0].checked = !this[0].checked, this.trigger("change"), null
            },
            toggleOn: function() {
                return this[0].checked || (this[0].checked = !0, this.trigger("change")), null
            },
            toggleOff: function() {
                return this[0].checked && "checkbox" == this[0].type && (this[0].checked = !1, this.trigger("change")), null
            }
        };
    n.fn.niftyCheck = function(t) {
        var a = !1;
        return this.each(function() {
            i[t] ? a = i[t].apply(n(this).find("input"), Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t || e(n(this))
        }), a
    }, nifty.document.ready(function() {
        t = n(".form-checkbox, .form-radio"), t.length && t.niftyCheck()
    }), nifty.document.on("change", ".btn-file :file", function() {
        var t = n(this),
            e = t.get(0).files ? t.get(0).files.length : 1,
            i = t.val().replace(/\\/g, "/").replace(/.*\//, ""),
            a = function() {
                try {
                    return t[0].files[0].size
                } catch (n) {
                    return "Nan"
                }
            }(),
            o = function() {
                if ("Nan" == a) return "Unknown";
                var n = Math.floor(Math.log(a) / Math.log(1024));
                return 1 * (a / Math.pow(1024, n)).toFixed(2) + " " + ["B", "kB", "MB", "GB", "TB"][n]
            }();
        t.trigger("fileselect", [e, i, o])
    })
}(jQuery), ! function(n) {
    nifty.window.on("load", function() {
        var t = n("#mainnav-shortcut");
        t.length && t.find("li").each(function() {
            var t = n(this);
            t.popover({
                animation: !1,
                trigger: "hover focus",
                placement: "bottom",
                container: "#mainnav-container",
                template: '<div class="popover mainnav-shortcut"><div class="arrow"></div><div class="popover-content"></div>'
            })
        })
    })
}(jQuery), ! function(n, t) {
    var e = {};
    e.eventName = "resizeEnd", e.delay = 250, e.poll = function() {
        var i = n(this),
            a = i.data(e.eventName);
        a.timeoutId && t.clearTimeout(a.timeoutId), a.timeoutId = t.setTimeout(function() {
            i.trigger(e.eventName)
        }, e.delay)
    }, n.event.special[e.eventName] = {
        setup: function() {
            var t = n(this);
            t.data(e.eventName, {}), t.on("resize", e.poll)
        },
        teardown: function() {
            var i = n(this),
                a = i.data(e.eventName);
            a.timeoutId && t.clearTimeout(a.timeoutId), i.removeData(e.eventName), i.off("resize", e.poll)
        }
    }, n.fn[e.eventName] = function(n, t) {
        return arguments.length > 0 ? this.on(e.eventName, null, n, t) : this.trigger(e.eventName)
    }
}(jQuery, this), ! function(n) {
    "use strict";
    var t = n('#mainnav-menu > li > a, #mainnav-menu-wrap .mainnav-widget a[data-toggle="menu-widget"]'),
        e = n("#mainnav").height(),
        i = null,
        a = !1,
        o = !1,
        s = null,
        l = function() {
            var e;
            t.each(function() {
                var i = n(this),
                    a = i.children(".menu-title"),
                    o = i.siblings(".collapse"),
                    s = n(i.attr("data-target")),
                    l = s.length ? s.parent() : null,
                    r = null,
                    c = null,
                    f = null,
                    d = null,
                    u = (i.outerHeight() - i.height() / 4, function() {
                        return s.length && i.on("click", function(n) {
                            n.preventDefault()
                        }), o.length ? (i.on("click", function(n) {
                            n.preventDefault()
                        }).parent("li").removeClass("active"), !0) : !1
                    }()),
                    v = null,
                    m = function(n) {
                        clearInterval(v), v = setInterval(function() {
                            n.nanoScroller({
                                preventPageScrolling: !0,
                                alwaysVisible: !0
                            }), clearInterval(v)
                        }, 700)
                    };
                n(document).click(function(t) {
                    n(t.target).closest("#mainnav-container").length || i.removeClass("hover").popover("hide")
                }), n("#mainnav-menu-wrap > .nano").on("update", function() {
                    i.removeClass("hover").popover("hide")
                }), i.popover({
                    animation: !1,
                    trigger: "manual",
                    container: "#mainnav",
                    viewport: i,
                    html: !0,
                    title: function() {
                        return u ? a.html() : null
                    },
                    content: function() {
                        var t;
                        return u ? (t = n('<div class="sub-menu"></div>'), o.addClass("pop-in").wrap('<div class="nano-content"></div>').parent().appendTo(t)) : s.length ? (t = n('<div class="sidebar-widget-popover"></div>'), s.wrap('<div class="nano-content"></div>').parent().appendTo(t)) : t = '<span class="single-content">' + a.html() + "</span>", t
                    },
                    template: '<div class="popover menu-popover"><h4 class="popover-title"></h4><div class="popover-content"></div></div>'
                }).on("show.bs.popover", function() {
                    if (!r) {
                        if (r = i.data("bs.popover").tip(), c = r.find(".popover-title"), f = r.children(".popover-content"), !u && 0 == s.length) return;
                        d = f.children(".sub-menu")
                    }!u && 0 == s.length
                }).on("shown.bs.popover", function() {
                    if (!u && 0 == s.length) {
                        var t = 0 - .5 * i.outerHeight();
                        return void f.css({
                            "margin-top": t + "px",
                            width: "auto"
                        })
                    }
                    var e = parseInt(r.css("top")),
                        a = i.outerHeight(),
                        o = function() {
                            return nifty.container.hasClass("mainnav-fixed") ? n(window).outerHeight() - e - a : n(document).height() - e - a
                        }(),
                        l = f.find(".nano-content").children().css("height", "auto").outerHeight();
                    f.find(".nano-content").children().css("height", ""), e > o ? (c.length && !c.is(":visible") && (a = Math.round(0 - .5 * a)), e -= 5, f.css({
                        top: "",
                        bottom: a + "px",
                        height: e
                    }).children().addClass("nano").css({
                        width: "100%"
                    }).nanoScroller({
                        preventPageScrolling: !0
                    }), m(f.find(".nano"))) : (!nifty.container.hasClass("navbar-fixed") && nifty.mainNav.hasClass("affix-top") && (o -= 50), l > o ? ((nifty.container.hasClass("navbar-fixed") || nifty.mainNav.hasClass("affix-top")) && (o -= a + 5), o -= 5, f.css({
                        top: a + "px",
                        bottom: "",
                        height: o
                    }).children().addClass("nano").css({
                        width: "100%"
                    }).nanoScroller({
                        preventPageScrolling: !0
                    }), m(f.find(".nano"))) : (c.length && !c.is(":visible") && (a = Math.round(0 - .5 * a)), f.css({
                        top: a + "px",
                        bottom: "",
                        height: "auto"
                    }))), c.length && c.css("height", i.outerHeight()), f.on("click", function() {
                        f.find(".nano-pane").hide(), m(f.find(".nano"))
                    })
                }).on("hidden.bs.popover", function() {
                    i.removeClass("hover"), u ? o.removeAttr("style").appendTo(i.parent()) : s.length && s.appendTo(l), clearInterval(e)
                }).on("click", function() {
                    nifty.container.hasClass("mainnav-sm") && (t.popover("hide"), i.addClass("hover").popover("show"))
                }).hover(function() {
                    t.popover("hide"), i.addClass("hover").popover("show")
                }, function() {
                    clearInterval(e), e = setInterval(function() {
                        r && (r.one("mouseleave", function() {
                            i.removeClass("hover").popover("hide")
                        }), r.is(":hover") || i.removeClass("hover").popover("hide")), clearInterval(e)
                    }, 500)
                })
            }), o = !0
        }, r = function() {
            var e = n("#mainnav-menu").find(".collapse");
            e.length && e.each(function() {
                var t = n(this);
                t.hasClass("in") ? t.parent("li").addClass("active") : t.parent("li").removeClass("active")
            }), null != i && i.length && i.nanoScroller({
                stop: !0
            }), t.popover("destroy").unbind("mouseenter mouseleave"), o = !1
        }, c = function() {
            var t, e = nifty.container.width();
            t = 740 >= e ? "xs" : e > 740 && 992 > e ? "sm" : e >= 992 && 1200 >= e ? "md" : "lg", s != t && (s = t, nifty.screenSize = t, "sm" == nifty.screenSize && nifty.container.hasClass("mainnav-lg") && n.niftyNav("collapse"))
        }, f = function() {
            return nifty.mainNav.niftyAffix("update"), r(), c(), ("collapse" == a || nifty.container.hasClass("mainnav-sm")) && (nifty.container.removeClass("mainnav-in mainnav-out mainnav-lg"), l()), e = n("#mainnav").height(), a = !1, null
        }, d = {
            revealToggle: function() {
                nifty.container.hasClass("reveal") || nifty.container.addClass("reveal"), nifty.container.toggleClass("mainnav-in mainnav-out").removeClass("mainnav-lg mainnav-sm"), o && r()
            },
            revealIn: function() {
                nifty.container.hasClass("reveal") || nifty.container.addClass("reveal"), nifty.container.addClass("mainnav-in").removeClass("mainnav-out mainnav-lg mainnav-sm"), o && r()
            },
            revealOut: function() {
                nifty.container.hasClass("reveal") || nifty.container.addClass("reveal"), nifty.container.removeClass("mainnav-in mainnav-lg mainnav-sm").addClass("mainnav-out"), o && r()
            },
            slideToggle: function() {
                nifty.container.hasClass("slide") || nifty.container.addClass("slide"), nifty.container.toggleClass("mainnav-in mainnav-out").removeClass("mainnav-lg mainnav-sm"), o && r()
            },
            slideIn: function() {
                nifty.container.hasClass("slide") || nifty.container.addClass("slide"), nifty.container.addClass("mainnav-in").removeClass("mainnav-out mainnav-lg mainnav-sm"), o && r()
            },
            slideOut: function() {
                nifty.container.hasClass("slide") || nifty.container.addClass("slide"), nifty.container.removeClass("mainnav-in mainnav-lg mainnav-sm").addClass("mainnav-out"), o && r()
            },
            pushToggle: function() {
                nifty.container.toggleClass("mainnav-in mainnav-out").removeClass("mainnav-lg mainnav-sm"), nifty.container.hasClass("mainnav-in mainnav-out") && nifty.container.removeClass("mainnav-in"), o && r()
            },
            pushIn: function() {
                nifty.container.addClass("mainnav-in").removeClass("mainnav-out mainnav-lg mainnav-sm"), o && r()
            },
            pushOut: function() {
                nifty.container.removeClass("mainnav-in mainnav-lg mainnav-sm").addClass("mainnav-out"), o && r()
            },
            colExpToggle: function() {
                return nifty.container.hasClass("mainnav-lg mainnav-sm") && nifty.container.removeClass("mainnav-lg"), nifty.container.toggleClass("mainnav-lg mainnav-sm").removeClass("mainnav-in mainnav-out"), nifty.window.trigger("resize")
            },
            collapse: function() {
                return nifty.container.addClass("mainnav-sm").removeClass("mainnav-lg mainnav-in mainnav-out"), a = "collapse", nifty.window.trigger("resize")
            },
            expand: function() {
                return nifty.container.removeClass("mainnav-sm mainnav-in mainnav-out").addClass("mainnav-lg"), nifty.window.trigger("resize")
            },
            togglePosition: function() {
                nifty.container.toggleClass("mainnav-fixed"), nifty.mainNav.niftyAffix("update")
            },
            fixedPosition: function() {
                nifty.container.addClass("mainnav-fixed"), nifty.mainNav.niftyAffix("update")
            },
            staticPosition: function() {
                nifty.container.removeClass("mainnav-fixed"), nifty.mainNav.niftyAffix("update")
            },
            update: f,
            forceUpdate: c,
            getScreenSize: function() {
                return s
            }
        };
    n.niftyNav = function(n, t) {
        if (d[n]) {
            ("colExpToggle" == n || "expand" == n || "collapse" == n) && ("xs" == nifty.screenSize && "collapse" == n ? n = "pushOut" : "xs" != nifty.screenSize && "sm" != nifty.screenSize || "colExpToggle" != n && "expand" != n || !nifty.container.hasClass("mainnav-sm") || (n = "pushIn"));
            var e = d[n].apply(this, Array.prototype.slice.call(arguments, 1));
            if (t) return t();
            if (e) return e
        }
        return null
    }, n.fn.isOnScreen = function() {
        var n = {
            top: nifty.window.scrollTop(),
            left: nifty.window.scrollLeft()
        };
        n.right = n.left + nifty.window.width(), n.bottom = n.top + nifty.window.height();
        var t = this.offset();
        return t.right = t.left + this.outerWidth(), t.bottom = t.top + this.outerHeight(), !(n.right < t.left || n.left > t.right || n.bottom < t.bottom || n.top > t.top)
    }, nifty.window.on("resizeEnd", f).trigger("resize"), nifty.window.on("load", function() {
        var t = n(".mainnav-toggle");
        t.length && t.on("click", function(e) {
            e.preventDefault(), n.niftyNav(t.hasClass("push") ? "pushToggle" : t.hasClass("slide") ? "slideToggle" : t.hasClass("reveal") ? "revealToggle" : "colExpToggle")
        });
        var e = n("#mainnav-menu");
        e.length && (n("#mainnav-menu").metisMenu({
            toggle: !0
        }), i = nifty.mainNav.find(".nano"), i.length && i.nanoScroller({
            preventPageScrolling: !0
        }))
    })
}(jQuery), ! function(n) {
    "use strict";
    var t = {
        toggleHideShow: function() {
            nifty.container.toggleClass("aside-in"), nifty.window.trigger("resize"), nifty.container.hasClass("aside-in") && e()
        },
        show: function() {
            nifty.container.addClass("aside-in"), nifty.window.trigger("resize"), e()
        },
        hide: function() {
            nifty.container.removeClass("aside-in"), nifty.window.trigger("resize")
        },
        toggleAlign: function() {
            nifty.container.toggleClass("aside-left"), nifty.aside.niftyAffix("update")
        },
        alignLeft: function() {
            nifty.container.addClass("aside-left"), nifty.aside.niftyAffix("update")
        },
        alignRight: function() {
            nifty.container.removeClass("aside-left"), nifty.aside.niftyAffix("update")
        },
        togglePosition: function() {
            nifty.container.toggleClass("aside-fixed"), nifty.aside.niftyAffix("update")
        },
        fixedPosition: function() {
            nifty.container.addClass("aside-fixed"), nifty.aside.niftyAffix("update")
        },
        staticPosition: function() {
            nifty.container.removeClass("aside-fixed"), nifty.aside.niftyAffix("update")
        },
        toggleTheme: function() {
            nifty.container.toggleClass("aside-bright")
        },
        brightTheme: function() {
            nifty.container.addClass("aside-bright")
        },
        darkTheme: function() {
            nifty.container.removeClass("aside-bright")
        }
    }, e = function() {
            nifty.container.hasClass("mainnav-in") && "xs" != nifty.screenSize && ("sm" == nifty.screenSize ? n.niftyNav("collapse") : nifty.container.removeClass("mainnav-in mainnav-lg mainnav-sm").addClass("mainnav-out"))
        };
    n.niftyAside = function(n, e) {
        return t[n] && (t[n].apply(this, Array.prototype.slice.call(arguments, 1)), e) ? e() : null
    }, nifty.window.on("load", function() {
        if (nifty.aside.length) {
            nifty.aside.find(".nano").nanoScroller({
                preventPageScrolling: !0,
                alwaysVisible: !1
            });
            var t = n(".aside-toggle");
            t.length && t.on("click", function() {
                n.niftyAside("toggleHideShow")
            })
        }
    })
}(jQuery), ! function(n) {
    "use strict";
    var t = {
        dynamicMode: !0,
        selectedOn: null,
        onChange: null
    }, e = function(e, i) {
            var a = n.extend({}, t, i),
                o = e.find(".lang-selected"),
                s = o.parent(".lang-selector").siblings(".dropdown-menu"),
                l = s.find("a"),
                r = l.filter(".active").find(".lang-id").text(),
                c = l.filter(".active").find(".lang-name").text(),
                f = function(n) {
                    l.removeClass("active"), n.addClass("active"), o.html(n.html()), r = n.find(".lang-id").text(), c = n.find(".lang-name").text(), e.trigger("onChange", [{
                        id: r,
                        name: c
                    }]), "function" == typeof a.onChange && a.onChange.call(this, {
                        id: r,
                        name: c
                    })
                };
            l.on("click", function(t) {
                a.dynamicMode && (t.preventDefault(), t.stopPropagation()), e.dropdown("toggle"), f(n(this))
            }), a.selectedOn && f(n(a.selectedOn))
        }, i = {
            getSelectedID: function() {
                return n(this).find(".lang-id").text()
            },
            getSelectedName: function() {
                return n(this).find(".lang-name").text()
            },
            getSelected: function() {
                var t = n(this);
                return {
                    id: t.find(".lang-id").text(),
                    name: t.find(".lang-name").text()
                }
            },
            setDisable: function() {
                return n(this).addClass("disabled"), null
            },
            setEnable: function() {
                return n(this).removeClass("disabled"), null
            }
        };
    n.fn.niftyLanguage = function(t) {
        var a = !1;
        return this.each(function() {
            i[t] ? a = i[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t || e(n(this), t)
        }), a
    }
}(jQuery), ! function(n) {
    "use strict";
    n.fn.niftyAffix = function(t) {
        return this.each(function() {
            var e, i = n(this);
            "object" != typeof t && t ? "update" == t && (e = i.data("nifty.af.class")) : (e = t.className, i.data("nifty.af.class", t.className)), nifty.container.hasClass(e) && !nifty.container.hasClass("navbar-fixed") ? i.affix({
                offset: {
                    top: n("#navbar").outerHeight()
                }
            }) : (!nifty.container.hasClass(e) || nifty.container.hasClass("navbar-fixed")) && (nifty.window.off(i.attr("id") + ".affix"), i.removeClass("affix affix-top affix-bottom").removeData("bs.affix"))
        })
    }, nifty.window.on("load", function() {
        nifty.mainNav.length && nifty.mainNav.niftyAffix({
            className: "mainnav-fixed"
        }), nifty.aside.length && nifty.aside.niftyAffix({
            className: "aside-fixed"
        })
    })
//
var options = [];
$( '.dropdown-menu-checkbox a' ).on( 'click', function( event ) {

   var $target = $( event.currentTarget ),
       val = $target.attr( 'data-value' ),
       $inp = $target.find( 'input' ),
       idx;

   if ( ( idx = options.indexOf( val ) ) > -1 ) {
      options.splice( idx, 1 );
      setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
   } else {
      options.push( val );
      setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
   }

   $( event.target ).blur();

   console.log( options );
   return false;
});

var opts = {
    collapsedHeight: 210,
    speed: 120,
    moreLink: '<a href="#">Read more</a>',
    lessLink: '<!--<a href="#">Read Less</a>-->'
};

$('.text-collapse').readmore(opts);

$('.modal').one('show.bs.modal', function () {
    $(this).find('.text-collapse').css({overflow: "hidden", maxHeight: opts.maxHeight});
}).one('shown.bs.modal', function () {
    $(this).find('.text-collapse').readmore(opts);
});

}(jQuery);
