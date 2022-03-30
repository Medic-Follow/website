! function() {
    var s, i, c, a, o = { frameRate: 150, animationTime: 800, stepSize: 100, pulseAlgorithm: !0, pulseScale: 4, pulseNormalize: 1, accelerationDelta: 50, accelerationMax: 3, keyboardSupport: !0, arrowScroll: 50, fixedBackground: !0, excluded: "" },
        p = o,
        u = !1,
        d = !1,
        n = { x: 0, y: 0 },
        f = !1,
        m = document.documentElement,
        l = [],
        h = /^Mac/.test(navigator.platform),
        w = { left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36 },
        v = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function y() {
        if (!f && document.body) {
            f = !0;
            var e = document.body,
                t = document.documentElement,
                o = window.innerHeight,
                n = e.scrollHeight;
            if (m = 0 <= document.compatMode.indexOf("CSS") ? t : e, s = e, p.keyboardSupport && Y("keydown", x), top != self) d = !0;
            else if (Q && o < n && (e.offsetHeight <= o || t.offsetHeight <= o)) {
                var r, a = document.createElement("div");
                a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + m.scrollHeight + "px", document.body.appendChild(a), c = function() { r = r || setTimeout(function() { u || (a.style.height = "0", a.style.height = m.scrollHeight + "px", r = null) }, 500) }, setTimeout(c, 10), Y("resize", c);
                if ((i = new R(c)).observe(e, { attributes: !0, childList: !0, characterData: !1 }), m.offsetHeight <= o) {
                    var l = document.createElement("div");
                    l.style.clear = "both", e.appendChild(l)
                }
            }
            p.fixedBackground || u || (e.style.backgroundAttachment = "scroll", t.style.backgroundAttachment = "scroll")
        }
    }
    var b = [],
        g = !1,
        r = Date.now();

    function S(d, f, m) {
        if (function(e, t) { e = 0 < e ? 1 : -1, t = 0 < t ? 1 : -1, n.x === e && n.y === t || (n.x = e, n.y = t, b = [], r = 0) }(f, m), 1 != p.accelerationMax) {
            var e = Date.now() - r;
            if (e < p.accelerationDelta) {
                var t = (1 + 50 / e) / 2;
                1 < t && (t = Math.min(t, p.accelerationMax), f *= t, m *= t)
            }
            r = Date.now()
        }
        if (b.push({ x: f, y: m, lastX: f < 0 ? .99 : -.99, lastY: m < 0 ? .99 : -.99, start: Date.now() }), !g) {
            var o = q(),
                h = d === o || d === document.body;
            null == d.$scrollBehavior && function(e) {
                var t = M(e);
                if (null == B[t]) {
                    var o = getComputedStyle(e, "")["scroll-behavior"];
                    B[t] = "smooth" == o
                }
                return B[t]
            }(d) && (d.$scrollBehavior = d.style.scrollBehavior, d.style.scrollBehavior = "auto");
            var w = function(e) {
                for (var t = Date.now(), o = 0, n = 0, r = 0; r < b.length; r++) {
                    var a = b[r],
                        l = t - a.start,
                        i = l >= p.animationTime,
                        c = i ? 1 : l / p.animationTime;
                    p.pulseAlgorithm && (c = F(c));
                    var s = a.x * c - a.lastX >> 0,
                        u = a.y * c - a.lastY >> 0;
                    o += s, n += u, a.lastX += s, a.lastY += u, i && (b.splice(r, 1), r--)
                }
                h ? window.scrollBy(o, n) : (o && (d.scrollLeft += o), n && (d.scrollTop += n)), f || m || (b = []), b.length ? j(w, d, 1e3 / p.frameRate + 1) : (g = !1, null != d.$scrollBehavior && (d.style.scrollBehavior = d.$scrollBehavior, d.$scrollBehavior = null))
            };
            j(w, d, 0), g = !0
        }
    }

    function e(e) {
        f || y();
        var t = e.target;
        if (e.defaultPrevented || e.ctrlKey) return !0;
        if (N(s, "embed") || N(t, "embed") && /\.pdf/i.test(t.src) || N(s, "object") || t.shadowRoot) return !0;
        var o = -e.wheelDeltaX || e.deltaX || 0,
            n = -e.wheelDeltaY || e.deltaY || 0;
        h && (e.wheelDeltaX && K(e.wheelDeltaX, 120) && (o = e.wheelDeltaX / Math.abs(e.wheelDeltaX) * -120), e.wheelDeltaY && K(e.wheelDeltaY, 120) && (n = e.wheelDeltaY / Math.abs(e.wheelDeltaY) * -120)), o || n || (n = -e.wheelDelta || 0), 1 === e.deltaMode && (o *= 40, n *= 40);
        var r = z(t);
        return r ? !! function(e) {
            if (!e) return;
            l.length || (l = [e, e, e]);
            e = Math.abs(e), l.push(e), l.shift(), clearTimeout(a), a = setTimeout(function() { try { localStorage.SS_deltaBuffer = l.join(",") } catch (e) {} }, 1e3);
            var t = 120 < e && P(e),
                o = !P(120) && !P(100) && !t;
            return e < 50 || o
        }(n) || (1.2 < Math.abs(o) && (o *= p.stepSize / 120), 1.2 < Math.abs(n) && (n *= p.stepSize / 120), S(r, o, n), e.preventDefault(), void C()) : !d || !W || (Object.defineProperty(e, "target", { value: window.frameElement }), parent.wheel(e))
    }

    function x(e) {
        var t = e.target,
            o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== w.spacebar;
        document.body.contains(s) || (s = document.activeElement);
        var n = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (e.defaultPrevented || /^(textarea|select|embed|object)$/i.test(t.nodeName) || N(t, "input") && !n.test(t.type) || N(s, "video") || function(e) {
                var t = e.target,
                    o = !1;
                if (-1 != document.URL.indexOf("www.youtube.com/watch"))
                    do { if (o = t.classList && t.classList.contains("html5-video-controls")) break } while (t = t.parentNode);
                return o
            }(e) || t.isContentEditable || o) return !0;
        if ((N(t, "button") || N(t, "input") && n.test(t.type)) && e.keyCode === w.spacebar) return !0;
        if (N(t, "input") && "radio" == t.type && v[e.keyCode]) return !0;
        var r = 0,
            a = 0,
            l = z(s);
        if (!l) return !d || !W || parent.keydown(e);
        var i = l.clientHeight;
        switch (l == document.body && (i = window.innerHeight), e.keyCode) {
            case w.up:
                a = -p.arrowScroll;
                break;
            case w.down:
                a = p.arrowScroll;
                break;
            case w.spacebar:
                a = -(e.shiftKey ? 1 : -1) * i * .9;
                break;
            case w.pageup:
                a = .9 * -i;
                break;
            case w.pagedown:
                a = .9 * i;
                break;
            case w.home:
                l == document.body && document.scrollingElement && (l = document.scrollingElement), a = -l.scrollTop;
                break;
            case w.end:
                var c = l.scrollHeight - l.scrollTop - i;
                a = 0 < c ? 10 + c : 0;
                break;
            case w.left:
                r = -p.arrowScroll;
                break;
            case w.right:
                r = p.arrowScroll;
                break;
            default:
                return !0
        }
        S(l, r, a), e.preventDefault(), C()
    }

    function t(e) { s = e.target }
    var k, D, M = (k = 0, function(e) { return e.uniqueID || (e.uniqueID = k++) }),
        E = {},
        T = {},
        B = {};

    function C() { clearTimeout(D), D = setInterval(function() { E = T = B = {} }, 1e3) }

    function H(e, t, o) { for (var n = o ? E : T, r = e.length; r--;) n[M(e[r])] = t; return t }

    function z(e) {
        var t = [],
            o = document.body,
            n = m.scrollHeight;
        do { var r = (!1 ? E : T)[M(e)]; if (r) return H(t, r); if (t.push(e), n === e.scrollHeight) { var a = O(m) && O(o) || X(m); if (d && L(m) || !d && a) return H(t, q()) } else if (L(e) && X(e)) return H(t, e) } while (e = e.parentElement)
    }

    function L(e) { return e.clientHeight + 10 < e.scrollHeight }

    function O(e) { return "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y") }

    function X(e) { var t = getComputedStyle(e, "").getPropertyValue("overflow-y"); return "scroll" === t || "auto" === t }

    function Y(e, t, o) { window.addEventListener(e, t, o || !1) }

    function A(e, t, o) { window.removeEventListener(e, t, o || !1) }

    function N(e, t) { return e && (e.nodeName || "").toLowerCase() === t.toLowerCase() }
    if (window.localStorage && localStorage.SS_deltaBuffer) try { l = localStorage.SS_deltaBuffer.split(",") } catch (e) {}

    function K(e, t) { return Math.floor(e / t) == e / t }

    function P(e) { return K(l[0], e) && K(l[1], e) && K(l[2], e) }
    var $, j = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e, t, o) { window.setTimeout(e, o || 1e3 / 60) },
        R = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        q = ($ = document.scrollingElement, function() {
            if (!$) {
                var e = document.createElement("div");
                e.style.cssText = "height:10000px;width:1px;", document.body.appendChild(e);
                var t = document.body.scrollTop;
                document.documentElement.scrollTop, window.scrollBy(0, 3), $ = document.body.scrollTop != t ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e)
            }
            return $
        });

    function V(e) { var t; return ((e *= p.pulseScale) < 1 ? e - (1 - Math.exp(-e)) : (e -= 1, (t = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - t))) * p.pulseNormalize }

    function F(e) { return 1 <= e ? 1 : e <= 0 ? 0 : (1 == p.pulseNormalize && (p.pulseNormalize /= V(1)), V(e)) }
    var I = window.navigator.userAgent,
        _ = /Edge/.test(I),
        W = /chrome/i.test(I) && !_,
        U = /safari/i.test(I) && !_,
        G = /mobile/i.test(I),
        J = /Windows NT 6.1/i.test(I) && /rv:11/i.test(I),
        Q = U && (/Version\/8/i.test(I) || /Version\/9/i.test(I)),
        Z = (W || U || J) && !G,
        ee = !1;
    try { window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function() { ee = !0 } })) } catch (e) {}
    var te = !!ee && { passive: !1 },
        oe = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    function ne(e) { for (var t in e) o.hasOwnProperty(t) && (p[t] = e[t]) }
    oe && Z && (Y(oe, e, te), Y("mousedown", t), Y("load", y)), ne.destroy = function() { i && i.disconnect(), A(oe, e), A("mousedown", t), A("keydown", x), A("resize", c), A("load", y) }, window.SmoothScrollOptions && ne(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function() { return ne }) : "object" == typeof exports ? module.exports = ne : window.SmoothScroll = ne
}();

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
! function(a) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery) }(function(a) {
    "use strict";
    var b = window.Slick || {};
    b = function() {
        function c(c, d) {
            var f, e = this;
            e.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: a(c), appendDots: a(c), arrows: !0, asNavFor: null, prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>', nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function(b, c) { return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1) }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, e.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0)
        }
        var b = 0;
        return c
    }(), b.prototype.activateADA = function() {
        var a = this;
        a.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" })
    }, b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
        var e = this;
        if ("boolean" == typeof c) d = c, c = null;
        else if (0 > c || c >= e.slideCount) return !1;
        e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function(b, c) { a(c).attr("data-slick-index", b) }), e.$slidesCache = e.$slides, e.reinit()
    }, b.prototype.animateHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.animate({ height: b }, a.options.speed)
        }
    }, b.prototype.animateSlide = function(b, c) {
        var d = {},
            e = this;
        e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({ left: b }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({ top: b }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({ animStart: e.currentLeft }).animate({ animStart: b }, { duration: e.options.speed, easing: e.options.easing, step: function(a) { a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d)) }, complete: function() { c && c.call() } })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function() { e.disableTransition(), c.call() }, e.options.speed))
    }, b.prototype.getNavTarget = function() {
        var b = this,
            c = b.options.asNavFor;
        return c && null !== c && (c = a(c).not(b.$slider)), c
    }, b.prototype.asNavFor = function(b) {
        var c = this,
            d = c.getNavTarget();
        null !== d && "object" == typeof d && d.each(function() {
            var c = a(this).slick("getSlick");
            c.unslicked || c.slideHandler(b, !0)
        })
    }, b.prototype.applyTransition = function(a) {
        var b = this,
            c = {};
        b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.autoPlay = function() {
        var a = this;
        a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }, b.prototype.autoPlayClear = function() {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }, b.prototype.autoPlayIterator = function() {
        var a = this,
            b = a.currentSlide + a.options.slidesToScroll;
        a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b))
    }, b.prototype.buildArrows = function() {
        var b = this;
        b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }))
    }, b.prototype.buildDots = function() {
        var c, d, b = this;
        if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
            for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1) d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
            b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, b.prototype.buildOut = function() {
        var b = this;
        b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function(b, c) { a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "") }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
    }, b.prototype.buildRows = function() {
        var b, c, d, e, f, g, h, a = this;
        if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
            for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
                var i = document.createElement("div");
                for (c = 0; c < a.options.rows; c++) {
                    var j = document.createElement("div");
                    for (d = 0; d < a.options.slidesPerRow; d++) {
                        var k = b * h + (c * a.options.slidesPerRow + d);
                        g.get(k) && j.appendChild(g.get(k))
                    }
                    i.appendChild(j)
                }
                e.appendChild(i)
            }
            a.$slider.empty().append(e), a.$slider.children().children().children().css({ width: 100 / a.options.slidesPerRow + "%", display: "inline-block" })
        }
    }, b.prototype.checkResponsive = function(b, c) {
        var e, f, g, d = this,
            h = !1,
            i = d.$slider.width(),
            j = window.innerWidth || a(window).width();
        if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
            f = null;
            for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
            null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
        }
    }, b.prototype.changeSlide = function(b, c) {
        var f, g, h, d = this,
            e = a(b.currentTarget);
        switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
            case "previous":
                g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
                break;
            case "next":
                g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
                break;
            case "index":
                var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
                d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
                break;
            default:
                return
        }
    }, b.prototype.checkNavigable = function(a) {
        var c, d, b = this;
        if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];
        else
            for (var e in c) {
                if (a < c[e]) { a = d; break }
                d = c[e]
            }
        return a
    }, b.prototype.cleanUpEvents = function() {
        var b = this;
        b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.cleanUpSlideEvents = function() {
        var b = this;
        b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.cleanUpRows = function() {
        var b, a = this;
        a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b))
    }, b.prototype.clickHandler = function(a) {
        var b = this;
        b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
    }, b.prototype.destroy = function(b) {
        var c = this;
        c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() { a(this).attr("style", a(this).data("originalStyling")) }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
    }, b.prototype.disableTransition = function(a) {
        var b = this,
            c = {};
        c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.fadeSlide = function(a, b) {
        var c = this;
        c.cssTransitions === !1 ? (c.$slides.eq(a).css({ zIndex: c.options.zIndex }), c.$slides.eq(a).animate({ opacity: 1 }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({ opacity: 1, zIndex: c.options.zIndex }), b && setTimeout(function() { c.disableTransition(a), b.call() }, c.options.speed))
    }, b.prototype.fadeSlideOut = function(a) {
        var b = this;
        b.cssTransitions === !1 ? b.$slides.eq(a).animate({ opacity: 0, zIndex: b.options.zIndex - 2 }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({ opacity: 0, zIndex: b.options.zIndex - 2 }))
    }, b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
        var b = this;
        null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
    }, b.prototype.focusHandler = function() {
        var b = this;
        b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(c) {
            c.stopImmediatePropagation();
            var d = a(this);
            setTimeout(function() { b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay()) }, 0)
        })
    }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() { var a = this; return a.currentSlide }, b.prototype.getDotCount = function() {
        var a = this,
            b = 0,
            c = 0,
            d = 0;
        if (a.options.infinite === !0)
            for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else if (a.options.centerMode === !0) d = a.slideCount;
        else if (a.options.asNavFor)
            for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
        return d - 1
    }, b.prototype.getLeft = function(a) {
        var c, d, f, b = this,
            e = 0;
        return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
    }, b.prototype.getOption = b.prototype.slickGetOption = function(a) { var b = this; return b.options[a] }, b.prototype.getNavigableIndexes = function() {
        var e, a = this,
            b = 0,
            c = 0,
            d = [];
        for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        return d
    }, b.prototype.getSlick = function() { return this }, b.prototype.getSlideCount = function() { var c, d, e, b = this; return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function(c, f) { return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0 }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll }, b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
        var c = this;
        c.changeSlide({ data: { message: "index", index: parseInt(a) } }, b)
    }, b.prototype.init = function(b) {
        var c = this;
        a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay())
    }, b.prototype.initADA = function() {
        var b = this;
        b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) { a(this).attr({ role: "option", "aria-describedby": "slick-slide" + b.instanceUid + c }) }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) { a(this).attr({ role: "presentation", "aria-selected": "false", "aria-controls": "navigation" + b.instanceUid + c, id: "slick-slide" + b.instanceUid + c }) }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
    }, b.prototype.initArrowEvents = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, a.changeSlide))
    }, b.prototype.initDotEvents = function() {
        var b = this;
        b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", { message: "index" }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.initSlideEvents = function() {
        var b = this;
        b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
    }, b.prototype.initializeEvents = function() {
        var b = this;
        b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", { action: "start" }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", { action: "move" }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", { action: "end" }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.initUI = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
    }, b.prototype.keyHandler = function(a) {
        var b = this;
        a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({ data: { message: b.options.rtl === !0 ? "next" : "previous" } }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({ data: { message: b.options.rtl === !0 ? "previous" : "next" } }))
    }, b.prototype.lazyLoad = function() {
        function g(c) {
            a("img[data-lazy]", c).each(function() {
                var c = a(this),
                    d = a(this).attr("data-lazy"),
                    e = document.createElement("img");
                e.onload = function() { c.animate({ opacity: 0 }, 100, function() { c.attr("src", d).animate({ opacity: 1 }, 200, function() { c.removeAttr("data-lazy").removeClass("slick-loading") }), b.$slider.trigger("lazyLoaded", [b, c, d]) }) }, e.onerror = function() { c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d]) }, e.src = d
            })
        }
        var c, d, e, f, b = this;
        b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
    }, b.prototype.loadSlider = function() {
        var a = this;
        a.setPosition(), a.$slideTrack.css({ opacity: 1 }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }, b.prototype.next = b.prototype.slickNext = function() {
        var a = this;
        a.changeSlide({ data: { message: "next" } })
    }, b.prototype.orientationChange = function() {
        var a = this;
        a.checkResponsive(), a.setPosition()
    }, b.prototype.pause = b.prototype.slickPause = function() {
        var a = this;
        a.autoPlayClear(), a.paused = !0
    }, b.prototype.play = b.prototype.slickPlay = function() {
        var a = this;
        a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1
    }, b.prototype.postSlide = function(a) {
        var b = this;
        b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA())
    }, b.prototype.prev = b.prototype.slickPrev = function() {
        var a = this;
        a.changeSlide({ data: { message: "previous" } })
    }, b.prototype.preventDefault = function(a) { a.preventDefault() }, b.prototype.progressiveLazyLoad = function(b) {
        b = b || 1;
        var e, f, g, c = this,
            d = a("img[data-lazy]", c.$slider);
        d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function() { e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad() }, g.onerror = function() { 3 > b ? setTimeout(function() { c.progressiveLazyLoad(b + 1) }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad()) }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c])
    }, b.prototype.refresh = function(b) {
        var d, e, c = this;
        e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, { currentSlide: d }), c.init(), b || c.changeSlide({ data: { message: "index", index: d } }, !1)
    }, b.prototype.registerBreakpoints = function() {
        var c, d, e, b = this,
            f = b.options.responsive || null;
        if ("array" === a.type(f) && f.length) {
            b.respondTo = b.options.respondTo || "window";
            for (c in f)
                if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
                    for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
                    b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
                }
            b.breakpoints.sort(function(a, c) { return b.options.mobileFirst ? a - c : c - a })
        }
    }, b.prototype.reinit = function() {
        var b = this;
        b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b])
    }, b.prototype.resize = function() {
        var b = this;
        a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function() { b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition() }, 50))
    }, b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) { var d = this; return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit()) }, b.prototype.setCSS = function(a) {
        var d, e, b = this,
            c = {};
        b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
    }, b.prototype.setDimensions = function() {
        var a = this;
        a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({ padding: "0px " + a.options.centerPadding }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({ padding: a.options.centerPadding + " 0px" })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
        var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
    }, b.prototype.setFade = function() {
        var c, b = this;
        b.$slides.each(function(d, e) { c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({ position: "relative", right: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 }) : a(e).css({ position: "relative", left: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 }) }), b.$slides.eq(b.currentSlide).css({ zIndex: b.options.zIndex - 1, opacity: 1 })
    }, b.prototype.setHeight = function() {
        var a = this;
        if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.css("height", b)
        }
    }, b.prototype.setOption = b.prototype.slickSetOption = function() {
        var c, d, e, f, h, b = this,
            g = !1;
        if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f;
        else if ("multiple" === h) a.each(e, function(a, c) { b.options[a] = c });
        else if ("responsive" === h)
            for (d in f)
                if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]];
                else {
                    for (c = b.options.responsive.length - 1; c >= 0;) b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
                    b.options.responsive.push(f[d])
                }
        g && (b.unload(), b.reinit())
    }, b.prototype.setPosition = function() {
        var a = this;
        a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
    }, b.prototype.setProps = function() {
        var a = this,
            b = document.body.style;
        a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
    }, b.prototype.setSlideClasses = function(a) {
        var c, d, e, f, b = this;
        d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
            d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
    }, b.prototype.setupInfinite = function() {
        var c, d, e, b = this;
        if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
            for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
            for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
            b.$slideTrack.find(".slick-cloned").find("[id]").each(function() { a(this).attr("id", "") })
        }
    }, b.prototype.interrupt = function(a) {
        var b = this;
        a || b.autoPlay(), b.interrupted = a
    }, b.prototype.selectHandler = function(b) {
        var c = this,
            d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
            e = parseInt(d.attr("data-slick-index"));
        return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
    }, b.prototype.slideHandler = function(a, b, c) {
        var d, e, f, g, j, h = null,
            i = this;
        return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() { i.postSlide(d) }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() { i.postSlide(d) }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function() { i.postSlide(e) })) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function() { i.postSlide(e) }) : i.postSlide(e))))
    }, b.prototype.startLoad = function() {
        var a = this;
        a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
    }, b.prototype.swipeDirection = function() { var a, b, c, d, e = this; return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical" }, b.prototype.swipeEnd = function(a) {
        var c, d, b = this;
        if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
        if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) {
            switch (d = b.swipeDirection()) {
                case "left":
                case "down":
                    c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1
            }
            "vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d]))
        } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
    }, b.prototype.swipeHandler = function(a) {
        var b = this;
        if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
            case "start":
                b.swipeStart(a);
                break;
            case "move":
                b.swipeMove(a);
                break;
            case "end":
                b.swipeEnd(a)
        }
    }, b.prototype.swipeMove = function(a) { var d, e, f, g, h, b = this; return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0) }, b.prototype.swipeStart = function(a) { var c, b = this; return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void(b.dragging = !0)) }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
        var a = this;
        null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
    }, b.prototype.unload = function() {
        var b = this;
        a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, b.prototype.unslick = function(a) {
        var b = this;
        b.$slider.trigger("unslick", [b, a]), b.destroy()
    }, b.prototype.updateArrows = function() {
        var b, a = this;
        b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, b.prototype.updateDots = function() {
        var a = this;
        null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, b.prototype.visibility = function() {
        var a = this;
        a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
    }, a.fn.slick = function() {
        var f, g, a = this,
            c = arguments[0],
            d = Array.prototype.slice.call(arguments, 1),
            e = a.length;
        for (f = 0; e > f; f++)
            if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
        return a
    }
});


(function(e, t) {
    function i(t, i) { var s, a, o, r = t.nodeName.toLowerCase(); return "area" === r ? (s = t.parentNode, a = s.name, t.href && a && "map" === s.nodeName.toLowerCase() ? (o = e("img[usemap=#" + a + "]")[0], !!o && n(o)) : !1) : (/input|select|textarea|button|object/.test(r) ? !t.disabled : "a" === r ? t.href || i : i) && n(t) }

    function n(t) { return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() { return "hidden" === e.css(this, "visibility") }).length }
    var s = 0,
        a = /^ui-id-\d+$/;
    e.ui = e.ui || {}, e.extend(e.ui, { version: "1.10.4", keyCode: { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 } }), e.fn.extend({
        focus: function(t) {
            return function(i, n) {
                return "number" == typeof i ? this.each(function() {
                    var t = this;
                    setTimeout(function() { e(t).focus(), n && n.call(t) }, i)
                }) : t.apply(this, arguments)
            }
        }(e.fn.focus),
        scrollParent: function() { var t; return t = e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() { return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x")) }).eq(0) : this.parents().filter(function() { return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x")) }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t },
        zIndex: function(i) {
            if (i !== t) return this.css("zIndex", i);
            if (this.length)
                for (var n, s, a = e(this[0]); a.length && a[0] !== document;) {
                    if (n = a.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (s = parseInt(a.css("zIndex"), 10), !isNaN(s) && 0 !== s)) return s;
                    a = a.parent()
                }
            return 0
        },
        uniqueId: function() { return this.each(function() { this.id || (this.id = "ui-id-" + ++s) }) },
        removeUniqueId: function() { return this.each(function() { a.test(this.id) && e(this).removeAttr("id") }) }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) { return function(i) { return !!e.data(i, t) } }) : function(t, i, n) { return !!e.data(t, n[3]) },
        focusable: function(t) { return i(t, !isNaN(e.attr(t, "tabindex"))) },
        tabbable: function(t) {
            var n = e.attr(t, "tabindex"),
                s = isNaN(n);
            return (s || n >= 0) && i(t, !s)
        }
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(i, n) {
        function s(t, i, n, s) { return e.each(a, function() { i -= parseFloat(e.css(t, "padding" + this)) || 0, n && (i -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (i -= parseFloat(e.css(t, "margin" + this)) || 0) }), i }
        var a = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
            o = n.toLowerCase(),
            r = { innerWidth: e.fn.innerWidth, innerHeight: e.fn.innerHeight, outerWidth: e.fn.outerWidth, outerHeight: e.fn.outerHeight };
        e.fn["inner" + n] = function(i) { return i === t ? r["inner" + n].call(this) : this.each(function() { e(this).css(o, s(this, i) + "px") }) }, e.fn["outer" + n] = function(t, i) { return "number" != typeof t ? r["outer" + n].call(this, t) : this.each(function() { e(this).css(o, s(this, t, !0, i) + "px") }) }
    }), e.fn.addBack || (e.fn.addBack = function(e) { return this.add(null == e ? this.prevObject : this.prevObject.filter(e)) }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) { return function(i) { return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this) } }(e.fn.removeData)), e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({ disableSelection: function() { return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) { e.preventDefault() }) }, enableSelection: function() { return this.unbind(".ui-disableSelection") } }), e.extend(e.ui, {
        plugin: {
            add: function(t, i, n) { var s, a = e.ui[t].prototype; for (s in n) a.plugins[s] = a.plugins[s] || [], a.plugins[s].push([i, n[s]]) },
            call: function(e, t, i) {
                var n, s = e.plugins[t];
                if (s && e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType)
                    for (n = 0; s.length > n; n++) e.options[s[n][0]] && s[n][1].apply(e.element, i)
            }
        },
        hasScroll: function(t, i) {
            if ("hidden" === e(t).css("overflow")) return !1;
            var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                s = !1;
            return t[n] > 0 ? !0 : (t[n] = 1, s = t[n] > 0, t[n] = 0, s)
        }
    })
})(jQuery);
(function(t, e) {
    var i = 0,
        s = Array.prototype.slice,
        n = t.cleanData;
    t.cleanData = function(e) {
        for (var i, s = 0; null != (i = e[s]); s++) try { t(i).triggerHandler("remove") } catch (o) {}
        n(e)
    }, t.widget = function(i, s, n) {
        var o, a, r, h, l = {},
            c = i.split(".")[0];
        i = i.split(".")[1], o = c + "-" + i, n || (n = s, s = t.Widget), t.expr[":"][o.toLowerCase()] = function(e) { return !!t.data(e, o) }, t[c] = t[c] || {}, a = t[c][i], r = t[c][i] = function(t, i) { return this._createWidget ? (arguments.length && this._createWidget(t, i), e) : new r(t, i) }, t.extend(r, a, { version: n.version, _proto: t.extend({}, n), _childConstructors: [] }), h = new s, h.options = t.widget.extend({}, h.options), t.each(n, function(i, n) {
            return t.isFunction(n) ? (l[i] = function() {
                var t = function() { return s.prototype[i].apply(this, arguments) },
                    e = function(t) { return s.prototype[i].apply(this, t) };
                return function() {
                    var i, s = this._super,
                        o = this._superApply;
                    return this._super = t, this._superApply = e, i = n.apply(this, arguments), this._super = s, this._superApply = o, i
                }
            }(), e) : (l[i] = n, e)
        }), r.prototype = t.widget.extend(h, { widgetEventPrefix: a ? h.widgetEventPrefix || i : i }, l, { constructor: r, namespace: c, widgetName: i, widgetFullName: o }), a ? (t.each(a._childConstructors, function(e, i) {
            var s = i.prototype;
            t.widget(s.namespace + "." + s.widgetName, r, i._proto)
        }), delete a._childConstructors) : s._childConstructors.push(r), t.widget.bridge(i, r)
    }, t.widget.extend = function(i) {
        for (var n, o, a = s.call(arguments, 1), r = 0, h = a.length; h > r; r++)
            for (n in a[r]) o = a[r][n], a[r].hasOwnProperty(n) && o !== e && (i[n] = t.isPlainObject(o) ? t.isPlainObject(i[n]) ? t.widget.extend({}, i[n], o) : t.widget.extend({}, o) : o);
        return i
    }, t.widget.bridge = function(i, n) {
        var o = n.prototype.widgetFullName || i;
        t.fn[i] = function(a) {
            var r = "string" == typeof a,
                h = s.call(arguments, 1),
                l = this;
            return a = !r && h.length ? t.widget.extend.apply(null, [a].concat(h)) : a, r ? this.each(function() { var s, n = t.data(this, o); return n ? t.isFunction(n[a]) && "_" !== a.charAt(0) ? (s = n[a].apply(n, h), s !== n && s !== e ? (l = s && s.jquery ? l.pushStack(s.get()) : s, !1) : e) : t.error("no such method '" + a + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; " + "attempted to call method '" + a + "'") }) : this.each(function() {
                var e = t.data(this, o);
                e ? e.option(a || {})._init() : t.data(this, o, new n(a, this))
            }), l
        }
    }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: { disabled: !1, create: null },
        _createWidget: function(e, s) { s = t(s || this.defaultElement || this)[0], this.element = t(s), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), s !== this && (t.data(s, this.widgetFullName, this), this._on(!0, this.element, { remove: function(t) { t.target === s && this.destroy() } }), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init() },
        _getCreateOptions: t.noop,
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function() { this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus") },
        _destroy: t.noop,
        widget: function() { return this.element },
        option: function(i, s) {
            var n, o, a, r = i;
            if (0 === arguments.length) return t.widget.extend({}, this.options);
            if ("string" == typeof i)
                if (r = {}, n = i.split("."), i = n.shift(), n.length) {
                    for (o = r[i] = t.widget.extend({}, this.options[i]), a = 0; n.length - 1 > a; a++) o[n[a]] = o[n[a]] || {}, o = o[n[a]];
                    if (i = n.pop(), 1 === arguments.length) return o[i] === e ? null : o[i];
                    o[i] = s
                } else {
                    if (1 === arguments.length) return this.options[i] === e ? null : this.options[i];
                    r[i] = s
                }
            return this._setOptions(r), this
        },
        _setOptions: function(t) { var e; for (e in t) this._setOption(e, t[e]); return this },
        _setOption: function(t, e) { return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this },
        enable: function() { return this._setOption("disabled", !1) },
        disable: function() { return this._setOption("disabled", !0) },
        _on: function(i, s, n) {
            var o, a = this;
            "boolean" != typeof i && (n = s, s = i, i = !1), n ? (s = o = t(s), this.bindings = this.bindings.add(s)) : (n = s, s = this.element, o = this.widget()), t.each(n, function(n, r) {
                function h() { return i || a.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? a[r] : r).apply(a, arguments) : e }
                "string" != typeof r && (h.guid = r.guid = r.guid || h.guid || t.guid++);
                var l = n.match(/^(\w+)\s*(.*)$/),
                    c = l[1] + a.eventNamespace,
                    u = l[2];
                u ? o.delegate(u, c, h) : s.bind(c, h)
            })
        },
        _off: function(t, e) { e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e) },
        _delay: function(t, e) {
            function i() { return ("string" == typeof t ? s[t] : t).apply(s, arguments) }
            var s = this;
            return setTimeout(i, e || 0)
        },
        _hoverable: function(e) { this.hoverable = this.hoverable.add(e), this._on(e, { mouseenter: function(e) { t(e.currentTarget).addClass("ui-state-hover") }, mouseleave: function(e) { t(e.currentTarget).removeClass("ui-state-hover") } }) },
        _focusable: function(e) { this.focusable = this.focusable.add(e), this._on(e, { focusin: function(e) { t(e.currentTarget).addClass("ui-state-focus") }, focusout: function(e) { t(e.currentTarget).removeClass("ui-state-focus") } }) },
        _trigger: function(e, i, s) {
            var n, o, a = this.options[e];
            if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent)
                for (n in o) n in i || (i[n] = o[n]);
            return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented())
        }
    }, t.each({ show: "fadeIn", hide: "fadeOut" }, function(e, i) {
        t.Widget.prototype["_" + e] = function(s, n, o) {
            "string" == typeof n && (n = { effect: n });
            var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e;
            n = n || {}, "number" == typeof n && (n = { duration: n }), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function(i) { t(this)[e](), o && o.call(s[0]), i() })
        }
    })
})(jQuery);
(function(t) {
    var e = !1;
    t(document).mouseup(function() { e = !1 }), t.widget("ui.mouse", {
        version: "1.10.4",
        options: { cancel: "input,textarea,button,select,option", distance: 1, delay: 0 },
        _mouseInit: function() {
            var e = this;
            this.element.bind("mousedown." + this.widgetName, function(t) { return e._mouseDown(t) }).bind("click." + this.widgetName, function(i) { return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : undefined }), this.started = !1
        },
        _mouseDestroy: function() { this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate) },
        _mouseDown: function(i) {
            if (!e) {
                this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                var s = this,
                    n = 1 === i.which,
                    a = "string" == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : !1;
                return n && !a && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() { s.mouseDelayMet = !0 }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) { return s._mouseMove(t) }, this._mouseUpDelegate = function(t) { return s._mouseUp(t) }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), e = !0, !0)) : !0
            }
        },
        _mouseMove: function(e) { return t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted) },
        _mouseUp: function(e) { return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1 },
        _mouseDistanceMet: function(t) { return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance },
        _mouseDelayMet: function() { return this.mouseDelayMet },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() { return !0 }
    })
})(jQuery);
(function(t) {
    var e = 5;
    t.widget("ui.slider", t.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "slide",
        options: { animate: !1, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null },
        _create: function() { this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1 },
        _refresh: function() { this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue() },
        _createHandles: function() {
            var e, i, s = this.options,
                n = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                a = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                o = [];
            for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e = n.length; i > e; e++) o.push(a);
            this.handles = n.add(t(o.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(e) { t(this).data("ui-slider-handle-index", e) })
        },
        _createRange: function() {
            var e = this.options,
                i = "";
            e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({ left: "", bottom: "" }) : (this.range = t("<div></div>").appendTo(this.element), i = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(i + ("min" === e.range || "max" === e.range ? " ui-slider-range-" + e.range : ""))) : (this.range && this.range.remove(), this.range = null)
        },
        _setupEvents: function() {
            var t = this.handles.add(this.range).filter("a");
            this._off(t), this._on(t, this._handleEvents), this._hoverable(t), this._focusable(t)
        },
        _destroy: function() { this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy() },
        _mouseCapture: function(e) {
            var i, s, n, a, o, r, l, h, u = this,
                c = this.options;
            return c.disabled ? !1 : (this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }, this.elementOffset = this.element.offset(), i = { x: e.pageX, y: e.pageY }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function(e) {
                var i = Math.abs(s - u.values(e));
                (n > i || n === i && (e === u._lastChangedValue || u.values(e) === c.min)) && (n = i, a = t(this), o = e)
            }), r = this._start(e, o), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = o, a.addClass("ui-state-active").focus(), l = a.offset(), h = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = h ? { left: 0, top: 0 } : { left: e.pageX - l.left - a.width() / 2, top: e.pageY - l.top - a.height() / 2 - (parseInt(a.css("borderTopWidth"), 10) || 0) - (parseInt(a.css("borderBottomWidth"), 10) || 0) + (parseInt(a.css("marginTop"), 10) || 0) }, this.handles.hasClass("ui-state-hover") || this._slide(e, o, s), this._animateOff = !0, !0))
        },
        _mouseStart: function() { return !0 },
        _mouseDrag: function(t) {
            var e = { x: t.pageX, y: t.pageY },
                i = this._normValueFromMouse(e);
            return this._slide(t, this._handleIndex, i), !1
        },
        _mouseStop: function(t) { return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1 },
        _detectOrientation: function() { this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal" },
        _normValueFromMouse: function(t) { var e, i, s, n, a; return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / e, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), a = this._valueMin() + s * n, this._trimAlignValue(a) },
        _start: function(t, e) { var i = { handle: this.handles[e], value: this.value() }; return this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("start", t, i) },
        _slide: function(t, e, i) {
            var s, n, a;
            this.options.values && this.options.values.length ? (s = this.values(e ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === e && i > s || 1 === e && s > i) && (i = s), i !== this.values(e) && (n = this.values(), n[e] = i, a = this._trigger("slide", t, { handle: this.handles[e], value: i, values: n }), s = this.values(e ? 0 : 1), a !== !1 && this.values(e, i))) : i !== this.value() && (a = this._trigger("slide", t, { handle: this.handles[e], value: i }), a !== !1 && this.value(i))
        },
        _stop: function(t, e) {
            var i = { handle: this.handles[e], value: this.value() };
            this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._trigger("stop", t, i)
        },
        _change: function(t, e) {
            if (!this._keySliding && !this._mouseSliding) {
                var i = { handle: this.handles[e], value: this.value() };
                this.options.values && this.options.values.length && (i.value = this.values(e), i.values = this.values()), this._lastChangedValue = e, this._trigger("change", t, i)
            }
        },
        value: function(t) { return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0), undefined) : this._value() },
        values: function(e, i) {
            var s, n, a;
            if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), this._change(null, e), undefined;
            if (!arguments.length) return this._values();
            if (!t.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(e) : this.value();
            for (s = this.options.values, n = arguments[0], a = 0; s.length > a; a += 1) s[a] = this._trimAlignValue(n[a]), this._change(null, a);
            this._refreshValue()
        },
        _setOption: function(e, i) {
            var s, n = 0;
            switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), t.Widget.prototype._setOption.apply(this, arguments), e) {
                case "orientation":
                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                    break;
                case "value":
                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                    break;
                case "values":
                    for (this._animateOff = !0, this._refreshValue(), s = 0; n > s; s += 1) this._change(null, s);
                    this._animateOff = !1;
                    break;
                case "min":
                case "max":
                    this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _value: function() { var t = this.options.value; return t = this._trimAlignValue(t) },
        _values: function(t) { var e, i, s; if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e); if (this.options.values && this.options.values.length) { for (i = this.options.values.slice(), s = 0; i.length > s; s += 1) i[s] = this._trimAlignValue(i[s]); return i } return [] },
        _trimAlignValue: function(t) {
            if (this._valueMin() >= t) return this._valueMin();
            if (t >= this._valueMax()) return this._valueMax();
            var e = this.options.step > 0 ? this.options.step : 1,
                i = (t - this._valueMin()) % e,
                s = t - i;
            return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5))
        },
        _valueMin: function() { return this.options.min },
        _valueMax: function() { return this.options.max },
        _refreshValue: function() {
            var e, i, s, n, a, o = this.options.range,
                r = this.options,
                l = this,
                h = this._animateOff ? !1 : r.animate,
                u = {};
            this.options.values && this.options.values.length ? this.handles.each(function(s) { i = 100 * ((l.values(s) - l._valueMin()) / (l._valueMax() - l._valueMin())), u["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[h ? "animate" : "css"](u, r.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({ left: i + "%" }, r.animate), 1 === s && l.range[h ? "animate" : "css"]({ width: i - e + "%" }, { queue: !1, duration: r.animate })) : (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({ bottom: i + "%" }, r.animate), 1 === s && l.range[h ? "animate" : "css"]({ height: i - e + "%" }, { queue: !1, duration: r.animate }))), e = i }) : (s = this.value(), n = this._valueMin(), a = this._valueMax(), i = a !== n ? 100 * ((s - n) / (a - n)) : 0, u["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[h ? "animate" : "css"](u, r.animate), "min" === o && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({ width: i + "%" }, r.animate), "max" === o && "horizontal" === this.orientation && this.range[h ? "animate" : "css"]({ width: 100 - i + "%" }, { queue: !1, duration: r.animate }), "min" === o && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({ height: i + "%" }, r.animate), "max" === o && "vertical" === this.orientation && this.range[h ? "animate" : "css"]({ height: 100 - i + "%" }, { queue: !1, duration: r.animate }))
        },
        _handleEvents: {
            keydown: function(i) {
                var s, n, a, o, r = t(i.target).data("ui-slider-handle-index");
                switch (i.keyCode) {
                    case t.ui.keyCode.HOME:
                    case t.ui.keyCode.END:
                    case t.ui.keyCode.PAGE_UP:
                    case t.ui.keyCode.PAGE_DOWN:
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.RIGHT:
                    case t.ui.keyCode.DOWN:
                    case t.ui.keyCode.LEFT:
                        if (i.preventDefault(), !this._keySliding && (this._keySliding = !0, t(i.target).addClass("ui-state-active"), s = this._start(i, r), s === !1)) return
                }
                switch (o = this.options.step, n = a = this.options.values && this.options.values.length ? this.values(r) : this.value(), i.keyCode) {
                    case t.ui.keyCode.HOME:
                        a = this._valueMin();
                        break;
                    case t.ui.keyCode.END:
                        a = this._valueMax();
                        break;
                    case t.ui.keyCode.PAGE_UP:
                        a = this._trimAlignValue(n + (this._valueMax() - this._valueMin()) / e);
                        break;
                    case t.ui.keyCode.PAGE_DOWN:
                        a = this._trimAlignValue(n - (this._valueMax() - this._valueMin()) / e);
                        break;
                    case t.ui.keyCode.UP:
                    case t.ui.keyCode.RIGHT:
                        if (n === this._valueMax()) return;
                        a = this._trimAlignValue(n + o);
                        break;
                    case t.ui.keyCode.DOWN:
                    case t.ui.keyCode.LEFT:
                        if (n === this._valueMin()) return;
                        a = this._trimAlignValue(n - o)
                }
                this._slide(i, r, a)
            },
            click: function(t) { t.preventDefault() },
            keyup: function(e) {
                var i = t(e.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), t(e.target).removeClass("ui-state-active"))
            }
        }
    })
})(jQuery);


/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c; var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c; var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) { a = c; var s = p / 4; } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */


! function(a) {
    a.fn.animationCounter = function(b) {
        return this.each(function() {
            try {
                var c = a(this),
                    d = { start: 0, end: null, step: 1, delay: 1e3, txt: "" },
                    e = a.extend(d, b || {}),
                    f = e.start,
                    g = e.end;
                c.text(f + e.txt);
                var h = function() { null != g && f >= g || (f += e.step, c.text(f + e.txt)) };
                setInterval(h, e.delay)
            } catch (a) { alert(a + " at line " + a.lineNumber) }
        })
    }
}(jQuery);


/* 003 ! WOW - v1.1.3 - 2016-05-06
 * Copyright (c) 2016 Matthieu Aussaguel;*/
(function() {
    var a, b, c, d, e, f = function(a, b) { return function() { return a.apply(b, arguments) } },
        g = [].indexOf || function(a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
    b = function() {
        function a() {}
        return a.prototype.extend = function(a, b) { var c, d; for (c in b) d = b[c], null == a[c] && (a[c] = d); return a }, a.prototype.isMobile = function(a) { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a) }, a.prototype.createEvent = function(a, b, c, d) { var e; return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e }, a.prototype.emitEvent = function(a, b) { return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0 }, a.prototype.addEvent = function(a, b, c) { return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c }, a.prototype.removeEvent = function(a, b, c) { return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b] }, a.prototype.innerHeight = function() { return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight }, a
    }(), c = this.WeakMap || this.MozWeakMap || (c = function() {
        function a() { this.keys = [], this.values = [] }
        return a.prototype.get = function(a) {
            var b, c, d, e, f;
            for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                if (c = f[b], c === a) return this.values[b]
        }, a.prototype.set = function(a, b) {
            var c, d, e, f, g;
            for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                if (d = g[c], d === a) return void(this.values[c] = b);
            return this.keys.push(a), this.values.push(b)
        }, a
    }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {
        function a() { "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.") }
        return a.notSupported = !0, a.prototype.observe = function() {}, a
    }()), d = this.getComputedStyle || function(a, b) { return this.getPropertyValue = function(b) { var c; return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) { return b.toUpperCase() }), (null != (c = a.currentStyle) ? c[b] : void 0) || null }, this }, e = /(\-([a-z]){1})/g, this.WOW = function() {
        function e(a) { null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass) }
        return e.prototype.defaults = { boxClass: "wow", animateClass: "animated", offset: 0, mobile: !0, live: !0, callback: null, scrollContainer: null }, e.prototype.init = function() { var a; return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = [] }, e.prototype.start = function() {
            var b, c, d, e;
            if (this.stopped = !1, this.boxes = function() { var a, c, d, e; for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b); return e }.call(this), this.all = function() { var a, c, d, e; for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b); return e }.call(this), this.boxes.length)
                if (this.disabled()) this.resetStyle();
                else
                    for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
            return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function(a) { return function(b) { var c, d, e, f, g; for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function() { var a, b, c, d; for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e)); return d }.call(a)); return g } }(this)).observe(document.body, { childList: !0, subtree: !0 }) : void 0
        }, e.prototype.stop = function() { return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0 }, e.prototype.sync = function(b) { return a.notSupported ? this.doSync(this.element) : void 0 }, e.prototype.doSync = function(a) { var b, c, d, e, f; if (null == a && (a = this.element), 1 === a.nodeType) { for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0); return f } }, e.prototype.show = function(a) { return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a }, e.prototype.applyStyle = function(a, b) { var c, d, e; return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function(f) { return function() { return f.customStyle(a, b, d, c, e) } }(this)) }, e.prototype.animate = function() { return "requestAnimationFrame" in window ? function(a) { return window.requestAnimationFrame(a) } : function(a) { return a() } }(), e.prototype.resetStyle = function() { var a, b, c, d, e; for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible"); return e }, e.prototype.resetAnimation = function(a) { var b; return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0 }, e.prototype.customStyle = function(a, b, c, d, e) { return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, { animationDuration: c }), d && this.vendorSet(a.style, { animationDelay: d }), e && this.vendorSet(a.style, { animationIterationCount: e }), this.vendorSet(a.style, { animationName: b ? "none" : this.cachedAnimationName(a) }), a }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function(a, b) {
            var c, d, e, f;
            d = [];
            for (c in b) e = b[c], a["" + c] = e, d.push(function() { var b, d, g, h; for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e); return h }.call(this));
            return d
        }, e.prototype.vendorCSS = function(a, b) { var c, e, f, g, h, i; for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b); return g }, e.prototype.animationName = function(a) { var b; try { b = this.vendorCSS(a, "animation-name").cssText } catch (c) { b = d(a).getPropertyValue("animation-name") } return "none" === b ? "" : b }, e.prototype.cacheAnimationName = function(a) { return this.animationNameCache.set(a, this.animationName(a)) }, e.prototype.cachedAnimationName = function(a) { return this.animationNameCache.get(a) }, e.prototype.scrollHandler = function() { return this.scrolled = !0 }, e.prototype.scrollCallback = function() { var a; return !this.scrolled || (this.scrolled = !1, this.boxes = function() { var b, c, d, e; for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a)); return e }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop() }, e.prototype.offsetTop = function(a) { for (var b; void 0 === a.offsetTop;) a = a.parentNode; for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop; return b }, e.prototype.isVisible = function(a) { var b, c, d, e, f; return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f }, e.prototype.util = function() { return null != this._util ? this._util : this._util = new b }, e.prototype.disabled = function() { return !this.config.mobile && this.util().isMobile(navigator.userAgent) }, e
    }()
}).call(this);

/**
 * Modules in this bundle
 * @license
 *
 * modal-video:
 *   license: appleple
 *   author: appleple
 *   homepage: http://developer.a-blogcms.jp
 *   version: 2.4.1
 */
! function e(t, n, o) {
    function i(a, l) {
        if (!n[a]) {
            if (!t[a]) { var u = "function" == typeof require && require; if (!l && u) return u(a, !0); if (r) return r(a, !0); var d = new Error("Cannot find module '" + a + "'"); throw d.code = "MODULE_NOT_FOUND", d }
            var s = n[a] = { exports: {} };
            t[a][0].call(s.exports, function(e) { var n = t[a][1][e]; return i(n || e) }, s, s.exports, e, t, n, o)
        }
        return n[a].exports
    }
    for (var r = "function" == typeof require && require, a = 0; a < o.length; a++) i(o[a]);
    return i
}({
    1: [function(e, t, n) {
        try { var o = new window.CustomEvent("test"); if (o.preventDefault(), !0 !== o.defaultPrevented) throw new Error("Could not prevent default") } catch (e) {
            var i = function(e, t) { var n, o; return t = t || { bubbles: !1, cancelable: !1, detail: void 0 }, n = document.createEvent("CustomEvent"), n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), o = n.preventDefault, n.preventDefault = function() { o.call(this); try { Object.defineProperty(this, "defaultPrevented", { get: function() { return !0 } }) } catch (e) { this.defaultPrevented = !0 } }, n };
            i.prototype = window.Event.prototype, window.CustomEvent = i
        }
    }, {}],
    2: [function(e, t, n) {
        "use strict";

        function o(e, t) {
            if (void 0 === e || null === e) throw new TypeError("Cannot convert first argument to object");
            for (var n = Object(e), o = 1; o < arguments.length; o++) {
                var i = arguments[o];
                if (void 0 !== i && null !== i)
                    for (var r = Object.keys(Object(i)), a = 0, l = r.length; a < l; a++) {
                        var u = r[a],
                            d = Object.getOwnPropertyDescriptor(i, u);
                        void 0 !== d && d.enumerable && (n[u] = i[u])
                    }
            }
            return n
        }

        function i() { Object.assign || Object.defineProperty(Object, "assign", { enumerable: !1, configurable: !0, writable: !0, value: o }) }
        t.exports = { assign: o, polyfill: i }
    }, {}],
    3: [function(e, t, n) {
        "use strict";
        var o = e("../index"),
            i = function(e) { e.fn.modalVideo = function(e) { return "strings" == typeof e || new o(this, e), this } };
        if ("function" == typeof define && define.amd) define(["jquery"], i);
        else {
            var r = window.jQuery ? window.jQuery : window.$;
            void 0 !== r && i(r)
        }
        t.exports = i
    }, { "../index": 5 }],
    4: [function(e, t, n) {
        "use strict";

        function o(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
        Object.defineProperty(n, "__esModule", { value: !0 });
        var i = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, n, o) { return n && e(t.prototype, n), o && e(t, o), t }
        }();
        e("custom-event-polyfill");
        var r = e("../lib/util"),
            a = e("es6-object-assign").assign,
            l = { channel: "youtube", facebook: {}, youtube: { autoplay: 1, cc_load_policy: 1, color: null, controls: 1, disablekb: 0, enablejsapi: 0, end: null, fs: 1, h1: null, iv_load_policy: 1, list: null, listType: null, loop: 0, modestbranding: null, origin: null, playlist: null, playsinline: null, rel: 0, showinfo: 1, start: 0, wmode: "transparent", theme: "dark", nocookie: !1 }, ratio: "16:9", vimeo: { api: !1, autopause: !0, autoplay: !0, byline: !0, callback: null, color: null, height: null, loop: !1, maxheight: null, maxwidth: null, player_id: null, portrait: !0, title: !0, width: null, xhtml: !1 }, allowFullScreen: !0, animationSpeed: 300, classNames: { modalVideo: "modal-video", modalVideoClose: "modal-video-close", modalVideoBody: "modal-video-body", modalVideoInner: "modal-video-inner", modalVideoIframeWrap: "modal-video-movie-wrap", modalVideoCloseBtn: "modal-video-close-btn" }, aria: { openMessage: "You just openned the modal video", dismissBtnMessage: "Close the modal by clicking here" } },
            u = function() {
                function e(t, n) {
                    var i = this;
                    o(this, e);
                    var u = a({}, l, n),
                        d = "string" == typeof t ? document.querySelectorAll(t) : t,
                        s = document.querySelector("body"),
                        c = u.classNames,
                        f = u.animationSpeed;
                    [].forEach.call(d, function(e) {
                        e.addEventListener("click", function(t) {
                            "A" === e.tagName && t.preventDefault();
                            var n = e.dataset.videoId,
                                o = e.dataset.channel || u.channel,
                                a = (0, r.getUniqId)(),
                                l = e.dataset.videoUrl || i.getVideoUrl(u, o, n),
                                d = i.getHtml(u, l, a);
                            (0, r.append)(s, d);
                            var v = document.getElementById(a),
                                m = v.querySelector(".js-modal-video-dismiss-btn");
                            v.focus(), v.addEventListener("click", function() {
                                (0, r.addClass)(v, c.modalVideoClose), setTimeout(function() {
                                    (0, r.remove)(v), e.focus()
                                }, f)
                            }), v.addEventListener("keydown", function(e) { 9 === e.which && (e.preventDefault(), document.activeElement === v ? m.focus() : (v.setAttribute("aria-label", ""), v.focus())) }), m.addEventListener("click", function() {
                                (0, r.triggerEvent)(v, "click")
                            })
                        })
                    })
                }
                return i(e, [{
                    key: "getPadding",
                    value: function(e) {
                        var t = e.split(":"),
                            n = Number(t[0]);
                        return 100 * Number(t[1]) / n + "%"
                    }
                }, { key: "getQueryString", value: function(e) { var t = ""; return Object.keys(e).forEach(function(n) { t += n + "=" + e[n] + "&" }), t.substr(0, t.length - 1) } }, { key: "getVideoUrl", value: function(e, t, n) { return "youtube" === t ? this.getYoutubeUrl(e.youtube, n) : "vimeo" === t ? this.getVimeoUrl(e.vimeo, n) : "facebook" === t ? this.getFacebookUrl(e.facebook, n) : "" } }, { key: "getVimeoUrl", value: function(e, t) { return "//player.vimeo.com/video/" + t + "?" + this.getQueryString(e) } }, { key: "getYoutubeUrl", value: function(e, t) { var n = this.getQueryString(e); return !0 === e.nocookie ? "//www.youtube-nocookie.com/embed/" + t + "?" + n : "//www.youtube.com/embed/" + t + "?" + n } }, { key: "getFacebookUrl", value: function(e, t) { return "//www.facebook.com/v2.10/plugins/video.php?href=https://www.facebook.com/facebook/videos/" + t + "&" + this.getQueryString(e) } }, {
                    key: "getHtml",
                    value: function(e, t, n) {
                        var o = this.getPadding(e.ratio),
                            i = e.classNames;
                        return '\n      <div class="' + i.modalVideo + '" tabindex="-1" role="dialog" aria-label="' + e.aria.openMessage + '" id="' + n + '">\n        <div class="' + i.modalVideoBody + '">\n          <div class="' + i.modalVideoInner + '">\n            <div class="' + i.modalVideoIframeWrap + '" style="padding-bottom:' + o + '">\n              <button class="' + i.modalVideoCloseBtn + ' js-modal-video-dismiss-btn" aria-label="' + e.aria.dismissBtnMessage + "\"></button>\n              <iframe width='460' height='230' src=\"" + t + "\" frameborder='0' allowfullscreen=" + e.allowFullScreen + ' tabindex="-1"/>\n            </div>\n          </div>\n        </div>\n      </div>\n    '
                    }
                }]), e
            }();
        n.default = u, t.exports = n.default
    }, { "../lib/util": 6, "custom-event-polyfill": 1, "es6-object-assign": 2 }],
    5: [function(e, t, n) {
        "use strict";
        t.exports = e("./core/")
    }, { "./core/": 4 }],
    6: [function(e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", { value: !0 });
        n.append = function(e, t) { var n = document.createElement("div"); for (n.innerHTML = t; n.children.length > 0;) e.appendChild(n.children[0]) }, n.getUniqId = function() { return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase() }, n.remove = function(e) { e && e.parentNode && e.parentNode.removeChild(e) }, n.addClass = function(e, t) { e.classList ? e.classList.add(t) : e.className += " " + t }, n.triggerEvent = function(e, t, n) {
            var o = void 0;
            window.CustomEvent ? o = new CustomEvent(t, { cancelable: !0 }) : (o = document.createEvent("CustomEvent"), o.initCustomEvent(t, !1, !1, n)), e.dispatchEvent(o)
        }
    }, {}]
}, {}, [3]);


jQuery(document).ready(function($) {
    window.loopcounter = function(idWarp) {
            if (typeof idWarp != 'undefined') {
                var date = $('.' + idWarp).data('date');
                if (typeof date != 'undefined') {
                    var start = new Date(date.replace(/-/g, "/")),
                        end = new Date(),
                        diff = new Date(start - end),
                        time = diff / 1000 / 60 / 60 / 24;

                    var day = parseInt(time);
                    var hour = parseInt(24 - (diff / 1000 / 60 / 60) % 24);
                    var min = parseInt(60 - (diff / 1000 / 60) % 60);
                    var sec = parseInt(60 - (diff / 1000) % 60);

                    counterDate(idWarp, day, hour, min, sec);

                    var interval = setInterval(function() {
                        if (sec == 0 && min != 0) {
                            min--;
                            sec = 60;
                        }
                        if (min == 0 && sec == 0 && hour != 0) {
                            hour--;
                            min = 59;
                            sec = 60;
                        }
                        if (min == 0 && sec == 0 && hour == 0 && day != 0) {
                            day--;
                            hour = 23;
                            min = 59;
                            sec = 60;
                        }
                        if (min == 0 && sec == 0 && hour == 0 && day == 0) {
                            clearInterval(interval);
                        } else {
                            sec--;
                        }
                        counterDate(idWarp, day, hour, min, sec);
                    }, 1000);

                    function counterDate(id, day, hour, min, sec) {
                        if (time < 0) { day = hour = min = sec = 0; }
                        $('.' + id + ' .days').html(counterDoubleDigit(day));
                        $('.' + id + ' .hours').html(counterDoubleDigit(hour));
                        $('.' + id + ' .minutes').html(counterDoubleDigit(min));
                        $('.' + id + ' .seconds').html(counterDoubleDigit(sec));
                    }

                    function counterDoubleDigit(arg) {
                        if (arg.toString().length <= 1) {
                            arg = ('0' + arg).slice(-2);
                        }
                        return arg;
                    }
                }
            }
        }
        //loopcounter( 'counter-id' );
});


// Lightbox
! function(t, i) { "function" == typeof define && define.amd ? define(["jquery"], i) : "object" == typeof exports ? module.exports = i(require("jquery")) : t.lightbox = i(t.jQuery) }(this, function(t) {
    function i(i) { this.album = [], this.currentImageIndex = void 0, this.init(), this.options = t.extend({}, this.constructor.defaults), this.option(i) }
    return i.defaults = { albumLabel: "Image %1 of %2", alwaysShowNavOnTouchDevices: !1, fadeDuration: 600, fitImagesInViewport: !0, imageFadeDuration: 600, positionFromTop: 50, resizeDuration: 700, showImageNumberLabel: !0, wrapAround: !1, disableScrolling: !1, sanitizeTitle: !1 }, i.prototype.option = function(i) { t.extend(this.options, i) }, i.prototype.imageCountLabel = function(t, i) { return this.options.albumLabel.replace(/%1/g, t).replace(/%2/g, i) }, i.prototype.init = function() {
        var i = this;
        t(document).ready(function() { i.enable(), i.build() })
    }, i.prototype.enable = function() {
        var i = this;
        t("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function(e) { return i.start(t(e.currentTarget)), !1 })
    }, i.prototype.build = function() {
        if (!(t("#lightbox").length > 0)) {
            var i = this;
            t('<div id="lightboxOverlay" tabindex="-1" class="lightboxOverlay"></div><div id="lightbox" tabindex="-1" class="lightbox"><div class="lb-outerContainer"><div class="lb-container"><img class="lb-image" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt=""/><div class="lb-nav"><a class="lb-prev" aria-label="Previous image" href="" ></a><a class="lb-next" aria-label="Next image" href="" ></a></div><div class="lb-loader"><a class="lb-cancel"></a></div></div></div><div class="lb-dataContainer"><div class="lb-data"><div class="lb-details"><span class="lb-caption"></span><span class="lb-number"></span></div><div class="lb-closeContainer"><a class="lb-close"></a></div></div></div></div>').appendTo(t("body")), this.$lightbox = t("#lightbox"), this.$overlay = t("#lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".lb-outerContainer"), this.$container = this.$lightbox.find(".lb-container"), this.$image = this.$lightbox.find(".lb-image"), this.$nav = this.$lightbox.find(".lb-nav"), this.containerPadding = { top: parseInt(this.$container.css("padding-top"), 10), right: parseInt(this.$container.css("padding-right"), 10), bottom: parseInt(this.$container.css("padding-bottom"), 10), left: parseInt(this.$container.css("padding-left"), 10) }, this.imageBorderWidth = { top: parseInt(this.$image.css("border-top-width"), 10), right: parseInt(this.$image.css("border-right-width"), 10), bottom: parseInt(this.$image.css("border-bottom-width"), 10), left: parseInt(this.$image.css("border-left-width"), 10) }, this.$overlay.hide().on("click", function() { return i.end(), !1 }), this.$lightbox.hide().on("click", function(e) { "lightbox" === t(e.target).attr("id") && i.end() }), this.$outerContainer.on("click", function(e) { return "lightbox" === t(e.target).attr("id") && i.end(), !1 }), this.$lightbox.find(".lb-prev").on("click", function() { return 0 === i.currentImageIndex ? i.changeImage(i.album.length - 1) : i.changeImage(i.currentImageIndex - 1), !1 }), this.$lightbox.find(".lb-next").on("click", function() { return i.currentImageIndex === i.album.length - 1 ? i.changeImage(0) : i.changeImage(i.currentImageIndex + 1), !1 }), this.$nav.on("mousedown", function(t) { 3 === t.which && (i.$nav.css("pointer-events", "none"), i.$lightbox.one("contextmenu", function() { setTimeout(function() { this.$nav.css("pointer-events", "auto") }.bind(i), 0) })) }), this.$lightbox.find(".lb-loader, .lb-close").on("click", function() { return i.end(), !1 })
        }
    }, i.prototype.start = function(i) {
        var e = this,
            n = t(window);
        n.on("resize", t.proxy(this.sizeOverlay, this)), this.sizeOverlay(), this.album = [];
        var a = 0;

        function o(t) { e.album.push({ alt: t.attr("data-alt"), link: t.attr("href"), title: t.attr("data-title") || t.attr("title") }) }
        var s, h = i.attr("data-lightbox");
        if (h) { s = t(i.prop("tagName") + '[data-lightbox="' + h + '"]'); for (var r = 0; r < s.length; r = ++r) o(t(s[r])), s[r] === i[0] && (a = r) } else if ("lightbox" === i.attr("rel")) o(i);
        else { s = t(i.prop("tagName") + '[rel="' + i.attr("rel") + '"]'); for (var l = 0; l < s.length; l = ++l) o(t(s[l])), s[l] === i[0] && (a = l) }
        var d = n.scrollTop() + this.options.positionFromTop,
            g = n.scrollLeft();
        this.$lightbox.css({ top: d + "px", left: g + "px" }).fadeIn(this.options.fadeDuration), this.options.disableScrolling && t("body").addClass("lb-disable-scrolling"), this.changeImage(a)
    }, i.prototype.changeImage = function(i) {
        var e = this,
            n = this.album[i].link,
            a = n.split(".").slice(-1)[0],
            o = this.$lightbox.find(".lb-image");
        this.disableKeyboardNav(), this.$overlay.fadeIn(this.options.fadeDuration), t(".lb-loader").fadeIn("slow"), this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), this.$outerContainer.addClass("animating");
        var s = new Image;
        s.onload = function() {
            var h, r, l, d, g, b;
            o.attr({ alt: e.album[i].alt, src: n }), t(s), o.width(s.width), o.height(s.height), b = t(window).width(), g = t(window).height(), d = b - e.containerPadding.left - e.containerPadding.right - e.imageBorderWidth.left - e.imageBorderWidth.right - 20, l = g - e.containerPadding.top - e.containerPadding.bottom - e.imageBorderWidth.top - e.imageBorderWidth.bottom - e.options.positionFromTop - 70, "svg" === a && (0 !== s.width && 0 !== s.height || (o.width(d), o.height(l))), e.options.fitImagesInViewport ? (e.options.maxWidth && e.options.maxWidth < d && (d = e.options.maxWidth), e.options.maxHeight && e.options.maxHeight < l && (l = e.options.maxHeight)) : (d = e.options.maxWidth || s.width || d, l = e.options.maxHeight || s.height || l), (s.width > d || s.height > l) && (s.width / d > s.height / l ? (r = d, h = parseInt(s.height / (s.width / r), 10), o.width(r), o.height(h)) : (h = l, r = parseInt(s.width / (s.height / h), 10), o.width(r), o.height(h))), e.sizeContainer(o.width(), o.height())
        }, s.src = this.album[i].link, this.currentImageIndex = i
    }, i.prototype.sizeOverlay = function() {
        var i = this;
        setTimeout(function() { i.$overlay.width(t(document).width()).height(t(document).height()) }, 0)
    }, i.prototype.sizeContainer = function(t, i) {
        var e = this,
            n = this.$outerContainer.outerWidth(),
            a = this.$outerContainer.outerHeight(),
            o = t + this.containerPadding.left + this.containerPadding.right + this.imageBorderWidth.left + this.imageBorderWidth.right,
            s = i + this.containerPadding.top + this.containerPadding.bottom + this.imageBorderWidth.top + this.imageBorderWidth.bottom;

        function h() { e.$lightbox.find(".lb-dataContainer").width(o), e.$lightbox.find(".lb-prevLink").height(s), e.$lightbox.find(".lb-nextLink").height(s), e.$overlay.focus(), e.showImage() }
        n !== o || a !== s ? this.$outerContainer.animate({ width: o, height: s }, this.options.resizeDuration, "swing", function() { h() }) : h()
    }, i.prototype.showImage = function() { this.$lightbox.find(".lb-loader").stop(!0).hide(), this.$lightbox.find(".lb-image").fadeIn(this.options.imageFadeDuration), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav() }, i.prototype.updateNav = function() {
        var t = !1;
        try { document.createEvent("TouchEvent"), t = !!this.options.alwaysShowNavOnTouchDevices } catch (t) {}
        this.$lightbox.find(".lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? (t && this.$lightbox.find(".lb-prev, .lb-next").css("opacity", "1"), this.$lightbox.find(".lb-prev, .lb-next").show()) : (this.currentImageIndex > 0 && (this.$lightbox.find(".lb-prev").show(), t && this.$lightbox.find(".lb-prev").css("opacity", "1")), this.currentImageIndex < this.album.length - 1 && (this.$lightbox.find(".lb-next").show(), t && this.$lightbox.find(".lb-next").css("opacity", "1"))))
    }, i.prototype.updateDetails = function() {
        var t = this;
        if (void 0 !== this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title) {
            var i = this.$lightbox.find(".lb-caption");
            this.options.sanitizeTitle ? i.text(this.album[this.currentImageIndex].title) : i.html(this.album[this.currentImageIndex].title), i.fadeIn("fast")
        }
        if (this.album.length > 1 && this.options.showImageNumberLabel) {
            var e = this.imageCountLabel(this.currentImageIndex + 1, this.album.length);
            this.$lightbox.find(".lb-number").text(e).fadeIn("fast")
        } else this.$lightbox.find(".lb-number").hide();
        this.$outerContainer.removeClass("animating"), this.$lightbox.find(".lb-dataContainer").fadeIn(this.options.resizeDuration, function() { return t.sizeOverlay() })
    }, i.prototype.preloadNeighboringImages = function() {
        this.album.length > this.currentImageIndex + 1 && ((new Image).src = this.album[this.currentImageIndex + 1].link);
        this.currentImageIndex > 0 && ((new Image).src = this.album[this.currentImageIndex - 1].link)
    }, i.prototype.enableKeyboardNav = function() { this.$lightbox.on("keyup.keyboard", t.proxy(this.keyboardAction, this)), this.$overlay.on("keyup.keyboard", t.proxy(this.keyboardAction, this)) }, i.prototype.disableKeyboardNav = function() { this.$lightbox.off(".keyboard"), this.$overlay.off(".keyboard") }, i.prototype.keyboardAction = function(t) {
        var i = t.keyCode;
        27 === i ? (t.stopPropagation(), this.end()) : 37 === i ? 0 !== this.currentImageIndex ? this.changeImage(this.currentImageIndex - 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(this.album.length - 1) : 39 === i && (this.currentImageIndex !== this.album.length - 1 ? this.changeImage(this.currentImageIndex + 1) : this.options.wrapAround && this.album.length > 1 && this.changeImage(0))
    }, i.prototype.end = function() { this.disableKeyboardNav(), t(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), this.options.disableScrolling && t("body").removeClass("lb-disable-scrolling") }, new i
});


/**
 * Swiper 4.5.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: September 13, 2019
 */
! function(e, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t() }(this, function() {
    "use strict";
    var e = "undefined" == typeof document ? { body: {}, addEventListener: function() {}, removeEventListener: function() {}, activeElement: { blur: function() {}, nodeName: "" }, querySelector: function() { return null }, querySelectorAll: function() { return [] }, getElementById: function() { return null }, createEvent: function() { return { initEvent: function() {} } }, createElement: function() { return { children: [], childNodes: [], style: {}, setAttribute: function() {}, getElementsByTagName: function() { return [] } } }, location: { hash: "" } } : document,
        t = "undefined" == typeof window ? { document: e, navigator: { userAgent: "" }, location: {}, history: {}, CustomEvent: function() { return this }, addEventListener: function() {}, removeEventListener: function() {}, getComputedStyle: function() { return { getPropertyValue: function() { return "" } } }, Image: function() {}, Date: function() {}, screen: {}, setTimeout: function() {}, clearTimeout: function() {} } : window,
        i = function(e) { for (var t = 0; t < e.length; t += 1) this[t] = e[t]; return this.length = e.length, this };

    function s(s, a) {
        var r = [],
            n = 0;
        if (s && !a && s instanceof i) return s;
        if (s)
            if ("string" == typeof s) {
                var o, l, d = s.trim();
                if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) { var h = "div"; for (0 === d.indexOf("<li") && (h = "ul"), 0 === d.indexOf("<tr") && (h = "tbody"), 0 !== d.indexOf("<td") && 0 !== d.indexOf("<th") || (h = "tr"), 0 === d.indexOf("<tbody") && (h = "table"), 0 === d.indexOf("<option") && (h = "select"), (l = e.createElement(h)).innerHTML = d, n = 0; n < l.childNodes.length; n += 1) r.push(l.childNodes[n]) } else
                    for (o = a || "#" !== s[0] || s.match(/[ .<>:~]/) ? (a || e).querySelectorAll(s.trim()) : [e.getElementById(s.trim().split("#")[1])], n = 0; n < o.length; n += 1) o[n] && r.push(o[n])
            } else if (s.nodeType || s === t || s === e) r.push(s);
        else if (s.length > 0 && s[0].nodeType)
            for (n = 0; n < s.length; n += 1) r.push(s[n]);
        return new i(r)
    }

    function a(e) { for (var t = [], i = 0; i < e.length; i += 1) - 1 === t.indexOf(e[i]) && t.push(e[i]); return t }
    s.fn = i.prototype, s.Class = i, s.Dom7 = i;
    var r = {
        addClass: function(e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.add(t[i]);
            return this
        },
        removeClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.remove(t[i]);
            return this
        },
        hasClass: function(e) { return !!this[0] && this[0].classList.contains(e) },
        toggleClass: function(e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1)
                for (var s = 0; s < this.length; s += 1) void 0 !== this[s] && void 0 !== this[s].classList && this[s].classList.toggle(t[i]);
            return this
        },
        attr: function(e, t) {
            var i = arguments;
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var s = 0; s < this.length; s += 1)
                if (2 === i.length) this[s].setAttribute(e, t);
                else
                    for (var a in e) this[s][a] = e[a], this[s].setAttribute(a, e[a]);
            return this
        },
        removeAttr: function(e) { for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e); return this },
        data: function(e, t) { var i; if (void 0 !== t) { for (var s = 0; s < this.length; s += 1)(i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), i.dom7ElementDataStorage[e] = t; return this } if (i = this[0]) { if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage) return i.dom7ElementDataStorage[e]; var a = i.getAttribute("data-" + e); return a || void 0 } },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransform = e, i.transform = e
            }
            return this
        },
        transition: function(e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                i.webkitTransitionDuration = e, i.transitionDuration = e
            }
            return this
        },
        on: function() {
            for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
            var a = t[0],
                r = t[1],
                n = t[2],
                o = t[3];

            function l(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if (i.indexOf(e) < 0 && i.unshift(e), s(t).is(r)) n.apply(t, i);
                    else
                        for (var a = s(t).parents(), o = 0; o < a.length; o += 1) s(a[o]).is(r) && n.apply(a[o], i)
                }
            }

            function d(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t)
            }
            "function" == typeof t[1] && (a = (e = t)[0], n = e[1], o = e[2], r = void 0), o || (o = !1);
            for (var h, p = a.split(" "), c = 0; c < this.length; c += 1) {
                var u = this[c];
                if (r)
                    for (h = 0; h < p.length; h += 1) {
                        var v = p[h];
                        u.dom7LiveListeners || (u.dom7LiveListeners = {}), u.dom7LiveListeners[v] || (u.dom7LiveListeners[v] = []), u.dom7LiveListeners[v].push({ listener: n, proxyListener: l }), u.addEventListener(v, l, o)
                    } else
                        for (h = 0; h < p.length; h += 1) {
                            var f = p[h];
                            u.dom7Listeners || (u.dom7Listeners = {}), u.dom7Listeners[f] || (u.dom7Listeners[f] = []), u.dom7Listeners[f].push({ listener: n, proxyListener: d }), u.addEventListener(f, d, o)
                        }
            }
            return this
        },
        off: function() {
            for (var e, t = [], i = arguments.length; i--;) t[i] = arguments[i];
            var s = t[0],
                a = t[1],
                r = t[2],
                n = t[3];
            "function" == typeof t[1] && (s = (e = t)[0], r = e[1], n = e[2], a = void 0), n || (n = !1);
            for (var o = s.split(" "), l = 0; l < o.length; l += 1)
                for (var d = o[l], h = 0; h < this.length; h += 1) {
                    var p = this[h],
                        c = void 0;
                    if (!a && p.dom7Listeners ? c = p.dom7Listeners[d] : a && p.dom7LiveListeners && (c = p.dom7LiveListeners[d]), c && c.length)
                        for (var u = c.length - 1; u >= 0; u -= 1) {
                            var v = c[u];
                            r && v.listener === r ? (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1)) : r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1)) : r || (p.removeEventListener(d, v.proxyListener, n), c.splice(u, 1))
                        }
                }
            return this
        },
        trigger: function() {
            for (var i = [], s = arguments.length; s--;) i[s] = arguments[s];
            for (var a = i[0].split(" "), r = i[1], n = 0; n < a.length; n += 1)
                for (var o = a[n], l = 0; l < this.length; l += 1) {
                    var d = this[l],
                        h = void 0;
                    try { h = new t.CustomEvent(o, { detail: r, bubbles: !0, cancelable: !0 }) } catch (t) {
                        (h = e.createEvent("Event")).initEvent(o, !0, !0), h.detail = r
                    }
                    d.dom7EventData = i.filter(function(e, t) { return t > 0 }), d.dispatchEvent(h), d.dom7EventData = [], delete d.dom7EventData
                }
            return this
        },
        transitionEnd: function(e) {
            var t, i = ["webkitTransitionEnd", "transitionend"],
                s = this;

            function a(r) {
                if (r.target === this)
                    for (e.call(this, r), t = 0; t < i.length; t += 1) s.off(i[t], a)
            }
            if (e)
                for (t = 0; t < i.length; t += 1) s.on(i[t], a);
            return this
        },
        outerWidth: function(e) { if (this.length > 0) { if (e) { var t = this.styles(); return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left")) } return this[0].offsetWidth } return null },
        outerHeight: function(e) { if (this.length > 0) { if (e) { var t = this.styles(); return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom")) } return this[0].offsetHeight } return null },
        offset: function() {
            if (this.length > 0) {
                var i = this[0],
                    s = i.getBoundingClientRect(),
                    a = e.body,
                    r = i.clientTop || a.clientTop || 0,
                    n = i.clientLeft || a.clientLeft || 0,
                    o = i === t ? t.scrollY : i.scrollTop,
                    l = i === t ? t.scrollX : i.scrollLeft;
                return { top: s.top + o - r, left: s.left + l - n }
            }
            return null
        },
        css: function(e, i) {
            var s;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (s = 0; s < this.length; s += 1)
                        for (var a in e) this[s].style[a] = e[a];
                    return this
                }
                if (this[0]) return t.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) { for (s = 0; s < this.length; s += 1) this[s].style[e] = i; return this }
            return this
        },
        each: function(e) {
            if (!e) return this;
            for (var t = 0; t < this.length; t += 1)
                if (!1 === e.call(this[t], t, this[t])) return this;
            return this
        },
        html: function(e) { if (void 0 === e) return this[0] ? this[0].innerHTML : void 0; for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e; return this },
        text: function(e) { if (void 0 === e) return this[0] ? this[0].textContent.trim() : null; for (var t = 0; t < this.length; t += 1) this[t].textContent = e; return this },
        is: function(a) {
            var r, n, o = this[0];
            if (!o || void 0 === a) return !1;
            if ("string" == typeof a) {
                if (o.matches) return o.matches(a);
                if (o.webkitMatchesSelector) return o.webkitMatchesSelector(a);
                if (o.msMatchesSelector) return o.msMatchesSelector(a);
                for (r = s(a), n = 0; n < r.length; n += 1)
                    if (r[n] === o) return !0;
                return !1
            }
            if (a === e) return o === e;
            if (a === t) return o === t;
            if (a.nodeType || a instanceof i) {
                for (r = a.nodeType ? [a] : a, n = 0; n < r.length; n += 1)
                    if (r[n] === o) return !0;
                return !1
            }
            return !1
        },
        index: function() { var e, t = this[0]; if (t) { for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1); return e } },
        eq: function(e) { if (void 0 === e) return this; var t, s = this.length; return new i(e > s - 1 ? [] : e < 0 ? (t = s + e) < 0 ? [] : [this[t]] : [this[e]]) },
        append: function() {
            for (var t, s = [], a = arguments.length; a--;) s[a] = arguments[a];
            for (var r = 0; r < s.length; r += 1) {
                t = s[r];
                for (var n = 0; n < this.length; n += 1)
                    if ("string" == typeof t) { var o = e.createElement("div"); for (o.innerHTML = t; o.firstChild;) this[n].appendChild(o.firstChild) } else if (t instanceof i)
                    for (var l = 0; l < t.length; l += 1) this[n].appendChild(t[l]);
                else this[n].appendChild(t)
            }
            return this
        },
        prepend: function(t) {
            var s, a;
            for (s = 0; s < this.length; s += 1)
                if ("string" == typeof t) { var r = e.createElement("div"); for (r.innerHTML = t, a = r.childNodes.length - 1; a >= 0; a -= 1) this[s].insertBefore(r.childNodes[a], this[s].childNodes[0]) } else if (t instanceof i)
                for (a = 0; a < t.length; a += 1) this[s].insertBefore(t[a], this[s].childNodes[0]);
            else this[s].insertBefore(t, this[s].childNodes[0]);
            return this
        },
        next: function(e) { return this.length > 0 ? e ? this[0].nextElementSibling && s(this[0].nextElementSibling).is(e) ? new i([this[0].nextElementSibling]) : new i([]) : this[0].nextElementSibling ? new i([this[0].nextElementSibling]) : new i([]) : new i([]) },
        nextAll: function(e) {
            var t = [],
                a = this[0];
            if (!a) return new i([]);
            for (; a.nextElementSibling;) {
                var r = a.nextElementSibling;
                e ? s(r).is(e) && t.push(r) : t.push(r), a = r
            }
            return new i(t)
        },
        prev: function(e) { if (this.length > 0) { var t = this[0]; return e ? t.previousElementSibling && s(t.previousElementSibling).is(e) ? new i([t.previousElementSibling]) : new i([]) : t.previousElementSibling ? new i([t.previousElementSibling]) : new i([]) } return new i([]) },
        prevAll: function(e) {
            var t = [],
                a = this[0];
            if (!a) return new i([]);
            for (; a.previousElementSibling;) {
                var r = a.previousElementSibling;
                e ? s(r).is(e) && t.push(r) : t.push(r), a = r
            }
            return new i(t)
        },
        parent: function(e) { for (var t = [], i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? s(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode)); return s(a(t)) },
        parents: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var r = this[i].parentNode; r;) e ? s(r).is(e) && t.push(r) : t.push(r), r = r.parentNode;
            return s(a(t))
        },
        closest: function(e) { var t = this; return void 0 === e ? new i([]) : (t.is(e) || (t = t.parents(e).eq(0)), t) },
        find: function(e) {
            for (var t = [], s = 0; s < this.length; s += 1)
                for (var a = this[s].querySelectorAll(e), r = 0; r < a.length; r += 1) t.push(a[r]);
            return new i(t)
        },
        children: function(e) {
            for (var t = [], r = 0; r < this.length; r += 1)
                for (var n = this[r].childNodes, o = 0; o < n.length; o += 1) e ? 1 === n[o].nodeType && s(n[o]).is(e) && t.push(n[o]) : 1 === n[o].nodeType && t.push(n[o]);
            return new i(a(t))
        },
        remove: function() { for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]); return this },
        add: function() { for (var e = [], t = arguments.length; t--;) e[t] = arguments[t]; var i, a; for (i = 0; i < e.length; i += 1) { var r = s(e[i]); for (a = 0; a < r.length; a += 1) this[this.length] = r[a], this.length += 1 } return this },
        styles: function() { return this[0] ? t.getComputedStyle(this[0], null) : {} }
    };
    Object.keys(r).forEach(function(e) { s.fn[e] = s.fn[e] || r[e] });
    var n, o, l = {
            deleteProps: function(e) {
                var t = e;
                Object.keys(t).forEach(function(e) { try { t[e] = null } catch (e) {} try { delete t[e] } catch (e) {} })
            },
            nextTick: function(e, t) { return void 0 === t && (t = 0), setTimeout(e, t) },
            now: function() { return Date.now() },
            getTranslate: function(e, i) {
                var s, a, r;
                void 0 === i && (i = "x");
                var n = t.getComputedStyle(e, null);
                return t.WebKitCSSMatrix ? ((a = n.transform || n.webkitTransform).split(",").length > 6 && (a = a.split(", ").map(function(e) { return e.replace(",", ".") }).join(", ")), r = new t.WebKitCSSMatrix("none" === a ? "" : a)) : s = (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === i && (a = t.WebKitCSSMatrix ? r.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])), "y" === i && (a = t.WebKitCSSMatrix ? r.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5])), a || 0
            },
            parseUrlQuery: function(e) {
                var i, s, a, r, n = {},
                    o = e || t.location.href;
                if ("string" == typeof o && o.length)
                    for (r = (s = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter(function(e) { return "" !== e })).length, i = 0; i < r; i += 1) a = s[i].replace(/#\S+/g, "").split("="), n[decodeURIComponent(a[0])] = void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "";
                return n
            },
            isObject: function(e) { return "object" == typeof e && null !== e && e.constructor && e.constructor === Object },
            extend: function() {
                for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
                for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
                    var a = e[s];
                    if (null != a)
                        for (var r = Object.keys(Object(a)), n = 0, o = r.length; n < o; n += 1) {
                            var d = r[n],
                                h = Object.getOwnPropertyDescriptor(a, d);
                            void 0 !== h && h.enumerable && (l.isObject(i[d]) && l.isObject(a[d]) ? l.extend(i[d], a[d]) : !l.isObject(i[d]) && l.isObject(a[d]) ? (i[d] = {}, l.extend(i[d], a[d])) : i[d] = a[d])
                        }
                }
                return i
            }
        },
        d = (o = e.createElement("div"), {
            touch: t.Modernizr && !0 === t.Modernizr.touch || !!(t.navigator.maxTouchPoints > 0 || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch),
            pointerEvents: !!(t.navigator.pointerEnabled || t.PointerEvent || "maxTouchPoints" in t.navigator && t.navigator.maxTouchPoints > 0),
            prefixedPointerEvents: !!t.navigator.msPointerEnabled,
            transition: (n = o.style, "transition" in n || "webkitTransition" in n || "MozTransition" in n),
            transforms3d: t.Modernizr && !0 === t.Modernizr.csstransforms3d || function() { var e = o.style; return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e }(),
            flexbox: function() {
                for (var e = o.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0; i < t.length; i += 1)
                    if (t[i] in e) return !0;
                return !1
            }(),
            observer: "MutationObserver" in t || "WebkitMutationObserver" in t,
            passiveListener: function() {
                var e = !1;
                try {
                    var i = Object.defineProperty({}, "passive", { get: function() { e = !0 } });
                    t.addEventListener("testPassiveListener", null, i)
                } catch (e) {}
                return e
            }(),
            gestures: "ongesturestart" in t
        }),
        h = function() { return { isIE: !!t.navigator.userAgent.match(/Trident/g) || !!t.navigator.userAgent.match(/MSIE/g), isEdge: !!t.navigator.userAgent.match(/Edge/g), isSafari: (e = t.navigator.userAgent.toLowerCase(), e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0), isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent) }; var e }(),
        p = function(e) {
            void 0 === e && (e = {});
            var t = this;
            t.params = e, t.eventsListeners = {}, t.params && t.params.on && Object.keys(t.params.on).forEach(function(e) { t.on(e, t.params.on[e]) })
        },
        c = { components: { configurable: !0 } };
    p.prototype.on = function(e, t, i) { var s = this; if ("function" != typeof t) return s; var a = i ? "unshift" : "push"; return e.split(" ").forEach(function(e) { s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][a](t) }), s }, p.prototype.once = function(e, t, i) {
        var s = this;
        if ("function" != typeof t) return s;

        function a() {
            for (var i = [], r = arguments.length; r--;) i[r] = arguments[r];
            t.apply(s, i), s.off(e, a), a.f7proxy && delete a.f7proxy
        }
        return a.f7proxy = t, s.on(e, a, i)
    }, p.prototype.off = function(e, t) {
        var i = this;
        return i.eventsListeners ? (e.split(" ").forEach(function(e) {
            void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].length && i.eventsListeners[e].forEach(function(s, a) {
                (s === t || s.f7proxy && s.f7proxy === t) && i.eventsListeners[e].splice(a, 1)
            })
        }), i) : i
    }, p.prototype.emit = function() {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        var i, s, a, r = this;
        return r.eventsListeners ? ("string" == typeof e[0] || Array.isArray(e[0]) ? (i = e[0], s = e.slice(1, e.length), a = r) : (i = e[0].events, s = e[0].data, a = e[0].context || r), (Array.isArray(i) ? i : i.split(" ")).forEach(function(e) {
            if (r.eventsListeners && r.eventsListeners[e]) {
                var t = [];
                r.eventsListeners[e].forEach(function(e) { t.push(e) }), t.forEach(function(e) { e.apply(a, s) })
            }
        }), r) : r
    }, p.prototype.useModulesParams = function(e) {
        var t = this;
        t.modules && Object.keys(t.modules).forEach(function(i) {
            var s = t.modules[i];
            s.params && l.extend(e, s.params)
        })
    }, p.prototype.useModules = function(e) {
        void 0 === e && (e = {});
        var t = this;
        t.modules && Object.keys(t.modules).forEach(function(i) {
            var s = t.modules[i],
                a = e[i] || {};
            s.instance && Object.keys(s.instance).forEach(function(e) {
                var i = s.instance[e];
                t[e] = "function" == typeof i ? i.bind(t) : i
            }), s.on && t.on && Object.keys(s.on).forEach(function(e) { t.on(e, s.on[e]) }), s.create && s.create.bind(t)(a)
        })
    }, c.components.set = function(e) { this.use && this.use(e) }, p.installModule = function(e) {
        for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1];
        var s = this;
        s.prototype.modules || (s.prototype.modules = {});
        var a = e.name || Object.keys(s.prototype.modules).length + "_" + l.now();
        return s.prototype.modules[a] = e, e.proto && Object.keys(e.proto).forEach(function(t) { s.prototype[t] = e.proto[t] }), e.static && Object.keys(e.static).forEach(function(t) { s[t] = e.static[t] }), e.install && e.install.apply(s, t), s
    }, p.use = function(e) { for (var t = [], i = arguments.length - 1; i-- > 0;) t[i] = arguments[i + 1]; var s = this; return Array.isArray(e) ? (e.forEach(function(e) { return s.installModule(e) }), s) : s.installModule.apply(s, [e].concat(t)) }, Object.defineProperties(p, c);
    var u = {
        updateSize: function() {
            var e, t, i = this.$el;
            e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth, t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight, 0 === e && this.isHorizontal() || 0 === t && this.isVertical() || (e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10), t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10), l.extend(this, { width: e, height: t, size: this.isHorizontal() ? e : t }))
        },
        updateSlides: function() {
            var e = this.params,
                i = this.$wrapperEl,
                s = this.size,
                a = this.rtlTranslate,
                r = this.wrongRTL,
                n = this.virtual && e.virtual.enabled,
                o = n ? this.virtual.slides.length : this.slides.length,
                p = i.children("." + this.params.slideClass),
                c = n ? this.virtual.slides.length : p.length,
                u = [],
                v = [],
                f = [],
                m = e.slidesOffsetBefore;
            "function" == typeof m && (m = e.slidesOffsetBefore.call(this));
            var g = e.slidesOffsetAfter;
            "function" == typeof g && (g = e.slidesOffsetAfter.call(this));
            var b = this.snapGrid.length,
                w = this.snapGrid.length,
                y = e.spaceBetween,
                x = -m,
                T = 0,
                E = 0;
            if (void 0 !== s) {
                var S, C;
                "string" == typeof y && y.indexOf("%") >= 0 && (y = parseFloat(y.replace("%", "")) / 100 * s), this.virtualSize = -y, a ? p.css({ marginLeft: "", marginTop: "" }) : p.css({ marginRight: "", marginBottom: "" }), e.slidesPerColumn > 1 && (S = Math.floor(c / e.slidesPerColumn) === c / this.params.slidesPerColumn ? c : Math.ceil(c / e.slidesPerColumn) * e.slidesPerColumn, "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (S = Math.max(S, e.slidesPerView * e.slidesPerColumn)));
                for (var M, P = e.slidesPerColumn, k = S / P, z = Math.floor(c / e.slidesPerColumn), $ = 0; $ < c; $ += 1) {
                    C = 0;
                    var I = p.eq($);
                    if (e.slidesPerColumn > 1) {
                        var L = void 0,
                            D = void 0,
                            O = void 0;
                        if ("column" === e.slidesPerColumnFill || "row" === e.slidesPerColumnFill && e.slidesPerGroup > 1) {
                            if ("column" === e.slidesPerColumnFill) O = $ - (D = Math.floor($ / P)) * P, (D > z || D === z && O === P - 1) && (O += 1) >= P && (O = 0, D += 1);
                            else {
                                var A = Math.floor($ / e.slidesPerGroup);
                                D = $ - (O = Math.floor($ / e.slidesPerView) - A * e.slidesPerColumn) * e.slidesPerView - A * e.slidesPerView
                            }
                            L = D + O * S / P, I.css({ "-webkit-box-ordinal-group": L, "-moz-box-ordinal-group": L, "-ms-flex-order": L, "-webkit-order": L, order: L })
                        } else D = $ - (O = Math.floor($ / k)) * k;
                        I.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== O && e.spaceBetween && e.spaceBetween + "px").attr("data-swiper-column", D).attr("data-swiper-row", O)
                    }
                    if ("none" !== I.css("display")) {
                        if ("auto" === e.slidesPerView) {
                            var H = t.getComputedStyle(I[0], null),
                                G = I[0].style.transform,
                                N = I[0].style.webkitTransform;
                            if (G && (I[0].style.transform = "none"), N && (I[0].style.webkitTransform = "none"), e.roundLengths) C = this.isHorizontal() ? I.outerWidth(!0) : I.outerHeight(!0);
                            else if (this.isHorizontal()) {
                                var B = parseFloat(H.getPropertyValue("width")),
                                    X = parseFloat(H.getPropertyValue("padding-left")),
                                    V = parseFloat(H.getPropertyValue("padding-right")),
                                    Y = parseFloat(H.getPropertyValue("margin-left")),
                                    F = parseFloat(H.getPropertyValue("margin-right")),
                                    R = H.getPropertyValue("box-sizing");
                                C = R && "border-box" === R && !h.isIE ? B + Y + F : B + X + V + Y + F
                            } else {
                                var q = parseFloat(H.getPropertyValue("height")),
                                    W = parseFloat(H.getPropertyValue("padding-top")),
                                    j = parseFloat(H.getPropertyValue("padding-bottom")),
                                    U = parseFloat(H.getPropertyValue("margin-top")),
                                    K = parseFloat(H.getPropertyValue("margin-bottom")),
                                    _ = H.getPropertyValue("box-sizing");
                                C = _ && "border-box" === _ && !h.isIE ? q + U + K : q + W + j + U + K
                            }
                            G && (I[0].style.transform = G), N && (I[0].style.webkitTransform = N), e.roundLengths && (C = Math.floor(C))
                        } else C = (s - (e.slidesPerView - 1) * y) / e.slidesPerView, e.roundLengths && (C = Math.floor(C)), p[$] && (this.isHorizontal() ? p[$].style.width = C + "px" : p[$].style.height = C + "px");
                        p[$] && (p[$].swiperSlideSize = C), f.push(C), e.centeredSlides ? (x = x + C / 2 + T / 2 + y, 0 === T && 0 !== $ && (x = x - s / 2 - y), 0 === $ && (x = x - s / 2 - y), Math.abs(x) < .001 && (x = 0), e.roundLengths && (x = Math.floor(x)), E % e.slidesPerGroup == 0 && u.push(x), v.push(x)) : (e.roundLengths && (x = Math.floor(x)), E % e.slidesPerGroup == 0 && u.push(x), v.push(x), x = x + C + y), this.virtualSize += C + y, T = C, E += 1
                    }
                }
                if (this.virtualSize = Math.max(this.virtualSize, s) + g, a && r && ("slide" === e.effect || "coverflow" === e.effect) && i.css({ width: this.virtualSize + e.spaceBetween + "px" }), d.flexbox && !e.setWrapperSize || (this.isHorizontal() ? i.css({ width: this.virtualSize + e.spaceBetween + "px" }) : i.css({ height: this.virtualSize + e.spaceBetween + "px" })), e.slidesPerColumn > 1 && (this.virtualSize = (C + e.spaceBetween) * S, this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween, this.isHorizontal() ? i.css({ width: this.virtualSize + e.spaceBetween + "px" }) : i.css({ height: this.virtualSize + e.spaceBetween + "px" }), e.centeredSlides)) {
                    M = [];
                    for (var Z = 0; Z < u.length; Z += 1) {
                        var Q = u[Z];
                        e.roundLengths && (Q = Math.floor(Q)), u[Z] < this.virtualSize + u[0] && M.push(Q)
                    }
                    u = M
                }
                if (!e.centeredSlides) {
                    M = [];
                    for (var J = 0; J < u.length; J += 1) {
                        var ee = u[J];
                        e.roundLengths && (ee = Math.floor(ee)), u[J] <= this.virtualSize - s && M.push(ee)
                    }
                    u = M, Math.floor(this.virtualSize - s) - Math.floor(u[u.length - 1]) > 1 && u.push(this.virtualSize - s)
                }
                if (0 === u.length && (u = [0]), 0 !== e.spaceBetween && (this.isHorizontal() ? a ? p.css({ marginLeft: y + "px" }) : p.css({ marginRight: y + "px" }) : p.css({ marginBottom: y + "px" })), e.centerInsufficientSlides) {
                    var te = 0;
                    if (f.forEach(function(t) { te += t + (e.spaceBetween ? e.spaceBetween : 0) }), (te -= e.spaceBetween) < s) {
                        var ie = (s - te) / 2;
                        u.forEach(function(e, t) { u[t] = e - ie }), v.forEach(function(e, t) { v[t] = e + ie })
                    }
                }
                l.extend(this, { slides: p, snapGrid: u, slidesGrid: v, slidesSizesGrid: f }), c !== o && this.emit("slidesLengthChange"), u.length !== b && (this.params.watchOverflow && this.checkOverflow(), this.emit("snapGridLengthChange")), v.length !== w && this.emit("slidesGridLengthChange"), (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset()
            }
        },
        updateAutoHeight: function(e) {
            var t, i = [],
                s = 0;
            if ("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed), "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1)
                for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
                    var a = this.activeIndex + t;
                    if (a > this.slides.length) break;
                    i.push(this.slides.eq(a)[0])
                } else i.push(this.slides.eq(this.activeIndex)[0]);
            for (t = 0; t < i.length; t += 1)
                if (void 0 !== i[t]) {
                    var r = i[t].offsetHeight;
                    s = r > s ? r : s
                }
            s && this.$wrapperEl.css("height", s + "px")
        },
        updateSlidesOffset: function() { for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop },
        updateSlidesProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this.params,
                i = this.slides,
                a = this.rtlTranslate;
            if (0 !== i.length) {
                void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
                var r = -e;
                a && (r = e), i.removeClass(t.slideVisibleClass), this.visibleSlidesIndexes = [], this.visibleSlides = [];
                for (var n = 0; n < i.length; n += 1) {
                    var o = i[n],
                        l = (r + (t.centeredSlides ? this.minTranslate() : 0) - o.swiperSlideOffset) / (o.swiperSlideSize + t.spaceBetween);
                    if (t.watchSlidesVisibility) {
                        var d = -(r - o.swiperSlideOffset),
                            h = d + this.slidesSizesGrid[n];
                        (d >= 0 && d < this.size - 1 || h > 1 && h <= this.size || d <= 0 && h >= this.size) && (this.visibleSlides.push(o), this.visibleSlidesIndexes.push(n), i.eq(n).addClass(t.slideVisibleClass))
                    }
                    o.progress = a ? -l : l
                }
                this.visibleSlides = s(this.visibleSlides)
            }
        },
        updateProgress: function(e) {
            void 0 === e && (e = this && this.translate || 0);
            var t = this.params,
                i = this.maxTranslate() - this.minTranslate(),
                s = this.progress,
                a = this.isBeginning,
                r = this.isEnd,
                n = a,
                o = r;
            0 === i ? (s = 0, a = !0, r = !0) : (a = (s = (e - this.minTranslate()) / i) <= 0, r = s >= 1), l.extend(this, { progress: s, isBeginning: a, isEnd: r }), (t.watchSlidesProgress || t.watchSlidesVisibility) && this.updateSlidesProgress(e), a && !n && this.emit("reachBeginning toEdge"), r && !o && this.emit("reachEnd toEdge"), (n && !a || o && !r) && this.emit("fromEdge"), this.emit("progress", s)
        },
        updateSlidesClasses: function() {
            var e, t = this.slides,
                i = this.params,
                s = this.$wrapperEl,
                a = this.activeIndex,
                r = this.realIndex,
                n = this.virtual && i.virtual.enabled;
            t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = n ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + a + '"]') : t.eq(a)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass));
            var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
            i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
            var l = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
            i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass), i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass))
        },
        updateActiveIndex: function(e) {
            var t, i = this.rtlTranslate ? this.translate : -this.translate,
                s = this.slidesGrid,
                a = this.snapGrid,
                r = this.params,
                n = this.activeIndex,
                o = this.realIndex,
                d = this.snapIndex,
                h = e;
            if (void 0 === h) {
                for (var p = 0; p < s.length; p += 1) void 0 !== s[p + 1] ? i >= s[p] && i < s[p + 1] - (s[p + 1] - s[p]) / 2 ? h = p : i >= s[p] && i < s[p + 1] && (h = p + 1) : i >= s[p] && (h = p);
                r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0)
            }
            if ((t = a.indexOf(i) >= 0 ? a.indexOf(i) : Math.floor(h / r.slidesPerGroup)) >= a.length && (t = a.length - 1), h !== n) {
                var c = parseInt(this.slides.eq(h).attr("data-swiper-slide-index") || h, 10);
                l.extend(this, { snapIndex: t, realIndex: c, previousIndex: n, activeIndex: h }), this.emit("activeIndexChange"), this.emit("snapIndexChange"), o !== c && this.emit("realIndexChange"), (this.initialized || this.runCallbacksOnInit) && this.emit("slideChange")
            } else t !== d && (this.snapIndex = t, this.emit("snapIndexChange"))
        },
        updateClickedSlide: function(e) {
            var t = this.params,
                i = s(e.target).closest("." + t.slideClass)[0],
                a = !1;
            if (i)
                for (var r = 0; r < this.slides.length; r += 1) this.slides[r] === i && (a = !0);
            if (!i || !a) return this.clickedSlide = void 0, void(this.clickedIndex = void 0);
            this.clickedSlide = i, this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(s(i).attr("data-swiper-slide-index"), 10) : this.clickedIndex = s(i).index(), t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide()
        }
    };
    var v = {
        getTranslate: function(e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params,
                i = this.rtlTranslate,
                s = this.translate,
                a = this.$wrapperEl;
            if (t.virtualTranslate) return i ? -s : s;
            var r = l.getTranslate(a[0], e);
            return i && (r = -r), r || 0
        },
        setTranslate: function(e, t) {
            var i = this.rtlTranslate,
                s = this.params,
                a = this.$wrapperEl,
                r = this.progress,
                n = 0,
                o = 0;
            this.isHorizontal() ? n = i ? -e : e : o = e, s.roundLengths && (n = Math.floor(n), o = Math.floor(o)), s.virtualTranslate || (d.transforms3d ? a.transform("translate3d(" + n + "px, " + o + "px, 0px)") : a.transform("translate(" + n + "px, " + o + "px)")), this.previousTranslate = this.translate, this.translate = this.isHorizontal() ? n : o;
            var l = this.maxTranslate() - this.minTranslate();
            (0 === l ? 0 : (e - this.minTranslate()) / l) !== r && this.updateProgress(e), this.emit("setTranslate", this.translate, t)
        },
        minTranslate: function() { return -this.snapGrid[0] },
        maxTranslate: function() { return -this.snapGrid[this.snapGrid.length - 1] }
    };
    var f = {
        setTransition: function(e, t) { this.$wrapperEl.transition(e), this.emit("setTransition", e, t) },
        transitionStart: function(e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex,
                s = this.params,
                a = this.previousIndex;
            s.autoHeight && this.updateAutoHeight();
            var r = t;
            if (r || (r = i > a ? "next" : i < a ? "prev" : "reset"), this.emit("transitionStart"), e && i !== a) {
                if ("reset" === r) return void this.emit("slideResetTransitionStart");
                this.emit("slideChangeTransitionStart"), "next" === r ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart")
            }
        },
        transitionEnd: function(e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex,
                s = this.previousIndex;
            this.animating = !1, this.setTransition(0);
            var a = t;
            if (a || (a = i > s ? "next" : i < s ? "prev" : "reset"), this.emit("transitionEnd"), e && i !== s) {
                if ("reset" === a) return void this.emit("slideResetTransitionEnd");
                this.emit("slideChangeTransitionEnd"), "next" === a ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd")
            }
        }
    };
    var m = {
        slideTo: function(e, t, i, s) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var a = this,
                r = e;
            r < 0 && (r = 0);
            var n = a.params,
                o = a.snapGrid,
                l = a.slidesGrid,
                h = a.previousIndex,
                p = a.activeIndex,
                c = a.rtlTranslate;
            if (a.animating && n.preventInteractionOnTransition) return !1;
            var u = Math.floor(r / n.slidesPerGroup);
            u >= o.length && (u = o.length - 1), (p || n.initialSlide || 0) === (h || 0) && i && a.emit("beforeSlideChangeStart");
            var v, f = -o[u];
            if (a.updateProgress(f), n.normalizeSlideIndex)
                for (var m = 0; m < l.length; m += 1) - Math.floor(100 * f) >= Math.floor(100 * l[m]) && (r = m);
            if (a.initialized && r !== p) { if (!a.allowSlideNext && f < a.translate && f < a.minTranslate()) return !1; if (!a.allowSlidePrev && f > a.translate && f > a.maxTranslate() && (p || 0) !== r) return !1 }
            return v = r > p ? "next" : r < p ? "prev" : "reset", c && -f === a.translate || !c && f === a.translate ? (a.updateActiveIndex(r), n.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== n.effect && a.setTranslate(f), "reset" !== v && (a.transitionStart(i, v), a.transitionEnd(i, v)), !1) : (0 !== t && d.transition ? (a.setTransition(t), a.setTranslate(f), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, s), a.transitionStart(i, v), a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd || (a.onSlideToWrapperTransitionEnd = function(e) { a && !a.destroyed && e.target === this && (a.$wrapperEl[0].removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].removeEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd), a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, a.transitionEnd(i, v)) }), a.$wrapperEl[0].addEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.$wrapperEl[0].addEventListener("webkitTransitionEnd", a.onSlideToWrapperTransitionEnd))) : (a.setTransition(0), a.setTranslate(f), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, s), a.transitionStart(i, v), a.transitionEnd(i, v)), !0)
        },
        slideToLoop: function(e, t, i, s) { void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0); var a = e; return this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, i, s) },
        slideNext: function(e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var s = this.params,
                a = this.animating;
            return s.loop ? !a && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i)) : this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i)
        },
        slidePrev: function(e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var s = this.params,
                a = this.animating,
                r = this.snapGrid,
                n = this.slidesGrid,
                o = this.rtlTranslate;
            if (s.loop) {
                if (a) return !1;
                this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft
            }

            function l(e) { return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e) }
            var d, h = l(o ? this.translate : -this.translate),
                p = r.map(function(e) { return l(e) }),
                c = (n.map(function(e) { return l(e) }), r[p.indexOf(h)], r[p.indexOf(h) - 1]);
            return void 0 !== c && (d = n.indexOf(c)) < 0 && (d = this.activeIndex - 1), this.slideTo(d, e, t, i)
        },
        slideReset: function(e, t, i) { return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i) },
        slideToClosest: function(e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var s = this.activeIndex,
                a = Math.floor(s / this.params.slidesPerGroup);
            if (a < this.snapGrid.length - 1) {
                var r = this.rtlTranslate ? this.translate : -this.translate,
                    n = this.snapGrid[a];
                r - n > (this.snapGrid[a + 1] - n) / 2 && (s = this.params.slidesPerGroup)
            }
            return this.slideTo(s, e, t, i)
        },
        slideToClickedSlide: function() {
            var e, t = this,
                i = t.params,
                a = t.$wrapperEl,
                r = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView,
                n = t.clickedIndex;
            if (i.loop) {
                if (t.animating) return;
                e = parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"), 10), i.centeredSlides ? n < t.loopedSlides - r / 2 || n > t.slides.length - t.loopedSlides + r / 2 ? (t.loopFix(), n = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), l.nextTick(function() { t.slideTo(n) })) : t.slideTo(n) : n > t.slides.length - r ? (t.loopFix(), n = a.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(), l.nextTick(function() { t.slideTo(n) })) : t.slideTo(n)
            } else t.slideTo(n)
        }
    };
    var g = {
        loopCreate: function() {
            var t = this,
                i = t.params,
                a = t.$wrapperEl;
            a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
            var r = a.children("." + i.slideClass);
            if (i.loopFillGroupWithBlank) {
                var n = i.slidesPerGroup - r.length % i.slidesPerGroup;
                if (n !== i.slidesPerGroup) {
                    for (var o = 0; o < n; o += 1) {
                        var l = s(e.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
                        a.append(l)
                    }
                    r = a.children("." + i.slideClass)
                }
            }
            "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = r.length), t.loopedSlides = parseInt(i.loopedSlides || i.slidesPerView, 10), t.loopedSlides += i.loopAdditionalSlides, t.loopedSlides > r.length && (t.loopedSlides = r.length);
            var d = [],
                h = [];
            r.each(function(e, i) {
                var a = s(i);
                e < t.loopedSlides && h.push(i), e < r.length && e >= r.length - t.loopedSlides && d.push(i), a.attr("data-swiper-slide-index", e)
            });
            for (var p = 0; p < h.length; p += 1) a.append(s(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
            for (var c = d.length - 1; c >= 0; c -= 1) a.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass))
        },
        loopFix: function() {
            var e, t = this.params,
                i = this.activeIndex,
                s = this.slides,
                a = this.loopedSlides,
                r = this.allowSlidePrev,
                n = this.allowSlideNext,
                o = this.snapGrid,
                l = this.rtlTranslate;
            this.allowSlidePrev = !0, this.allowSlideNext = !0;
            var d = -o[i] - this.getTranslate();
            i < a ? (e = s.length - 3 * a + i, e += a, this.slideTo(e, 0, !1, !0) && 0 !== d && this.setTranslate((l ? -this.translate : this.translate) - d)) : ("auto" === t.slidesPerView && i >= 2 * a || i >= s.length - a) && (e = -s.length + i + a, e += a, this.slideTo(e, 0, !1, !0) && 0 !== d && this.setTranslate((l ? -this.translate : this.translate) - d));
            this.allowSlidePrev = r, this.allowSlideNext = n
        },
        loopDestroy: function() {
            var e = this.$wrapperEl,
                t = this.params,
                i = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
        }
    };
    var b = {
        setGrabCursor: function(e) {
            if (!(d.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked)) {
                var t = this.el;
                t.style.cursor = "move", t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", t.style.cursor = e ? "-moz-grabbin" : "-moz-grab", t.style.cursor = e ? "grabbing" : "grab"
            }
        },
        unsetGrabCursor: function() { d.touch || this.params.watchOverflow && this.isLocked || (this.el.style.cursor = "") }
    };
    var w = {
            appendSlide: function(e) {
                var t = this.$wrapperEl,
                    i = this.params;
                if (i.loop && this.loopDestroy(), "object" == typeof e && "length" in e)
                    for (var s = 0; s < e.length; s += 1) e[s] && t.append(e[s]);
                else t.append(e);
                i.loop && this.loopCreate(), i.observer && d.observer || this.update()
            },
            prependSlide: function(e) {
                var t = this.params,
                    i = this.$wrapperEl,
                    s = this.activeIndex;
                t.loop && this.loopDestroy();
                var a = s + 1;
                if ("object" == typeof e && "length" in e) {
                    for (var r = 0; r < e.length; r += 1) e[r] && i.prepend(e[r]);
                    a = s + e.length
                } else i.prepend(e);
                t.loop && this.loopCreate(), t.observer && d.observer || this.update(), this.slideTo(a, 0, !1)
            },
            addSlide: function(e, t) {
                var i = this.$wrapperEl,
                    s = this.params,
                    a = this.activeIndex;
                s.loop && (a -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + s.slideClass));
                var r = this.slides.length;
                if (e <= 0) this.prependSlide(t);
                else if (e >= r) this.appendSlide(t);
                else {
                    for (var n = a > e ? a + 1 : a, o = [], l = r - 1; l >= e; l -= 1) {
                        var h = this.slides.eq(l);
                        h.remove(), o.unshift(h)
                    }
                    if ("object" == typeof t && "length" in t) {
                        for (var p = 0; p < t.length; p += 1) t[p] && i.append(t[p]);
                        n = a > e ? a + t.length : a
                    } else i.append(t);
                    for (var c = 0; c < o.length; c += 1) i.append(o[c]);
                    s.loop && this.loopCreate(), s.observer && d.observer || this.update(), s.loop ? this.slideTo(n + this.loopedSlides, 0, !1) : this.slideTo(n, 0, !1)
                }
            },
            removeSlide: function(e) {
                var t = this.params,
                    i = this.$wrapperEl,
                    s = this.activeIndex;
                t.loop && (s -= this.loopedSlides, this.loopDestroy(), this.slides = i.children("." + t.slideClass));
                var a, r = s;
                if ("object" == typeof e && "length" in e) {
                    for (var n = 0; n < e.length; n += 1) a = e[n], this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1);
                    r = Math.max(r, 0)
                } else a = e, this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1), r = Math.max(r, 0);
                t.loop && this.loopCreate(), t.observer && d.observer || this.update(), t.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1)
            },
            removeAllSlides: function() {
                for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                this.removeSlide(e)
            }
        },
        y = function() {
            var i = t.navigator.userAgent,
                s = { ios: !1, android: !1, androidChrome: !1, desktop: !1, windows: !1, iphone: !1, ipod: !1, ipad: !1, cordova: t.cordova || t.phonegap, phonegap: t.cordova || t.phonegap },
                a = i.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
                r = i.match(/(Android);?[\s\/]+([\d.]+)?/),
                n = i.match(/(iPad).*OS\s([\d_]+)/),
                o = i.match(/(iPod)(.*OS\s([\d_]+))?/),
                l = !n && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            if (a && (s.os = "windows", s.osVersion = a[2], s.windows = !0), r && !a && (s.os = "android", s.osVersion = r[2], s.android = !0, s.androidChrome = i.toLowerCase().indexOf("chrome") >= 0), (n || l || o) && (s.os = "ios", s.ios = !0), l && !o && (s.osVersion = l[2].replace(/_/g, "."), s.iphone = !0), n && (s.osVersion = n[2].replace(/_/g, "."), s.ipad = !0), o && (s.osVersion = o[3] ? o[3].replace(/_/g, ".") : null, s.iphone = !0), s.ios && s.osVersion && i.indexOf("Version/") >= 0 && "10" === s.osVersion.split(".")[0] && (s.osVersion = i.toLowerCase().split("version/")[1].split(" ")[0]), s.desktop = !(s.os || s.android || s.webView), s.webView = (l || n || o) && i.match(/.*AppleWebKit(?!.*Safari)/i), s.os && "ios" === s.os) {
                var d = s.osVersion.split("."),
                    h = e.querySelector('meta[name="viewport"]');
                s.minimalUi = !s.webView && (o || l) && (1 * d[0] == 7 ? 1 * d[1] >= 1 : 1 * d[0] > 7) && h && h.getAttribute("content").indexOf("minimal-ui") >= 0
            }
            return s.pixelRatio = t.devicePixelRatio || 1, s
        }();

    function x() {
        var e = this.params,
            t = this.el;
        if (!t || 0 !== t.offsetWidth) {
            e.breakpoints && this.setBreakpoint();
            var i = this.allowSlideNext,
                s = this.allowSlidePrev,
                a = this.snapGrid;
            if (this.allowSlideNext = !0, this.allowSlidePrev = !0, this.updateSize(), this.updateSlides(), e.freeMode) {
                var r = Math.min(Math.max(this.translate, this.maxTranslate()), this.minTranslate());
                this.setTranslate(r), this.updateActiveIndex(), this.updateSlidesClasses(), e.autoHeight && this.updateAutoHeight()
            } else this.updateSlidesClasses(), ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0);
            this.autoplay && this.autoplay.running && this.autoplay.paused && this.autoplay.run(), this.allowSlidePrev = s, this.allowSlideNext = i, this.params.watchOverflow && a !== this.snapGrid && this.checkOverflow()
        }
    }
    var T = { init: !0, direction: "horizontal", touchEventsTarget: "container", initialSlide: 0, speed: 300, preventInteractionOnTransition: !1, edgeSwipeDetection: !1, edgeSwipeThreshold: 20, freeMode: !1, freeModeMomentum: !0, freeModeMomentumRatio: 1, freeModeMomentumBounce: !0, freeModeMomentumBounceRatio: 1, freeModeMomentumVelocityRatio: 1, freeModeSticky: !1, freeModeMinimumVelocity: .02, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", breakpoints: void 0, breakpointsInverse: !1, spaceBetween: 0, slidesPerView: 1, slidesPerColumn: 1, slidesPerColumnFill: "column", slidesPerGroup: 1, centeredSlides: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, normalizeSlideIndex: !0, centerInsufficientSlides: !1, watchOverflow: !1, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: .5, longSwipesMs: 300, followFinger: !0, allowTouchMove: !0, threshold: 0, touchMoveStopPropagation: !0, touchStartPreventDefault: !0, touchStartForcePreventDefault: !1, touchReleaseOnEdges: !1, uniqueNavElements: !0, resistance: !0, resistanceRatio: .85, watchSlidesProgress: !1, watchSlidesVisibility: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, preloadImages: !0, updateOnImagesReady: !0, loop: !1, loopAdditionalSlides: 0, loopedSlides: null, loopFillGroupWithBlank: !1, allowSlidePrev: !0, allowSlideNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", noSwipingSelector: null, passiveListeners: !0, containerModifierClass: "swiper-container-", slideClass: "swiper-slide", slideBlankClass: "swiper-slide-invisible-blank", slideActiveClass: "swiper-slide-active", slideDuplicateActiveClass: "swiper-slide-duplicate-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slideDuplicateNextClass: "swiper-slide-duplicate-next", slidePrevClass: "swiper-slide-prev", slideDuplicatePrevClass: "swiper-slide-duplicate-prev", wrapperClass: "swiper-wrapper", runCallbacksOnInit: !0 },
        E = {
            update: u,
            translate: v,
            transition: f,
            slide: m,
            loop: g,
            grabCursor: b,
            manipulation: w,
            events: {
                attachEvents: function() {
                    var i = this.params,
                        a = this.touchEvents,
                        r = this.el,
                        n = this.wrapperEl;
                    this.onTouchStart = function(i) {
                        var a = this.touchEventsData,
                            r = this.params,
                            n = this.touches;
                        if (!this.animating || !r.preventInteractionOnTransition) {
                            var o = i;
                            if (o.originalEvent && (o = o.originalEvent), a.isTouchEvent = "touchstart" === o.type, (a.isTouchEvent || !("which" in o) || 3 !== o.which) && !(!a.isTouchEvent && "button" in o && o.button > 0 || a.isTouched && a.isMoved))
                                if (r.noSwiping && s(o.target).closest(r.noSwipingSelector ? r.noSwipingSelector : "." + r.noSwipingClass)[0]) this.allowClick = !0;
                                else if (!r.swipeHandler || s(o).closest(r.swipeHandler)[0]) {
                                n.currentX = "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX, n.currentY = "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY;
                                var d = n.currentX,
                                    h = n.currentY,
                                    p = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
                                    c = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
                                if (!p || !(d <= c || d >= t.screen.width - c)) {
                                    if (l.extend(a, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }), n.startX = d, n.startY = h, a.touchStartTime = l.now(), this.allowClick = !0, this.updateSize(), this.swipeDirection = void 0, r.threshold > 0 && (a.allowThresholdMove = !1), "touchstart" !== o.type) {
                                        var u = !0;
                                        s(o.target).is(a.formElements) && (u = !1), e.activeElement && s(e.activeElement).is(a.formElements) && e.activeElement !== o.target && e.activeElement.blur();
                                        var v = u && this.allowTouchMove && r.touchStartPreventDefault;
                                        (r.touchStartForcePreventDefault || v) && o.preventDefault()
                                    }
                                    this.emit("touchStart", o)
                                }
                            }
                        }
                    }.bind(this), this.onTouchMove = function(t) {
                        var i = this.touchEventsData,
                            a = this.params,
                            r = this.touches,
                            n = this.rtlTranslate,
                            o = t;
                        if (o.originalEvent && (o = o.originalEvent), i.isTouched) {
                            if (!i.isTouchEvent || "mousemove" !== o.type) {
                                var d = "touchmove" === o.type ? o.targetTouches[0].pageX : o.pageX,
                                    h = "touchmove" === o.type ? o.targetTouches[0].pageY : o.pageY;
                                if (o.preventedByNestedSwiper) return r.startX = d, void(r.startY = h);
                                if (!this.allowTouchMove) return this.allowClick = !1, void(i.isTouched && (l.extend(r, { startX: d, startY: h, currentX: d, currentY: h }), i.touchStartTime = l.now()));
                                if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop)
                                    if (this.isVertical()) { if (h < r.startY && this.translate <= this.maxTranslate() || h > r.startY && this.translate >= this.minTranslate()) return i.isTouched = !1, void(i.isMoved = !1) } else if (d < r.startX && this.translate <= this.maxTranslate() || d > r.startX && this.translate >= this.minTranslate()) return;
                                if (i.isTouchEvent && e.activeElement && o.target === e.activeElement && s(o.target).is(i.formElements)) return i.isMoved = !0, void(this.allowClick = !1);
                                if (i.allowTouchCallbacks && this.emit("touchMove", o), !(o.targetTouches && o.targetTouches.length > 1)) {
                                    r.currentX = d, r.currentY = h;
                                    var p, c = r.currentX - r.startX,
                                        u = r.currentY - r.startY;
                                    if (!(this.params.threshold && Math.sqrt(Math.pow(c, 2) + Math.pow(u, 2)) < this.params.threshold))
                                        if (void 0 === i.isScrolling && (this.isHorizontal() && r.currentY === r.startY || this.isVertical() && r.currentX === r.startX ? i.isScrolling = !1 : c * c + u * u >= 25 && (p = 180 * Math.atan2(Math.abs(u), Math.abs(c)) / Math.PI, i.isScrolling = this.isHorizontal() ? p > a.touchAngle : 90 - p > a.touchAngle)), i.isScrolling && this.emit("touchMoveOpposite", o), void 0 === i.startMoving && (r.currentX === r.startX && r.currentY === r.startY || (i.startMoving = !0)), i.isScrolling) i.isTouched = !1;
                                        else if (i.startMoving) {
                                        this.allowClick = !1, o.preventDefault(), a.touchMoveStopPropagation && !a.nested && o.stopPropagation(), i.isMoved || (a.loop && this.loopFix(), i.startTranslate = this.getTranslate(), this.setTransition(0), this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !a.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0), this.emit("sliderFirstMove", o)), this.emit("sliderMove", o), i.isMoved = !0;
                                        var v = this.isHorizontal() ? c : u;
                                        r.diff = v, v *= a.touchRatio, n && (v = -v), this.swipeDirection = v > 0 ? "prev" : "next", i.currentTranslate = v + i.startTranslate;
                                        var f = !0,
                                            m = a.resistanceRatio;
                                        if (a.touchReleaseOnEdges && (m = 0), v > 0 && i.currentTranslate > this.minTranslate() ? (f = !1, a.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + v, m))) : v < 0 && i.currentTranslate < this.maxTranslate() && (f = !1, a.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - v, m))), f && (o.preventedByNestedSwiper = !0), !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), a.threshold > 0) { if (!(Math.abs(v) > a.threshold || i.allowThresholdMove)) return void(i.currentTranslate = i.startTranslate); if (!i.allowThresholdMove) return i.allowThresholdMove = !0, r.startX = r.currentX, r.startY = r.currentY, i.currentTranslate = i.startTranslate, void(r.diff = this.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY) }
                                        a.followFinger && ((a.freeMode || a.watchSlidesProgress || a.watchSlidesVisibility) && (this.updateActiveIndex(), this.updateSlidesClasses()), a.freeMode && (0 === i.velocities.length && i.velocities.push({ position: r[this.isHorizontal() ? "startX" : "startY"], time: i.touchStartTime }), i.velocities.push({ position: r[this.isHorizontal() ? "currentX" : "currentY"], time: l.now() })), this.updateProgress(i.currentTranslate), this.setTranslate(i.currentTranslate))
                                    }
                                }
                            }
                        } else i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", o)
                    }.bind(this), this.onTouchEnd = function(e) {
                        var t = this,
                            i = t.touchEventsData,
                            s = t.params,
                            a = t.touches,
                            r = t.rtlTranslate,
                            n = t.$wrapperEl,
                            o = t.slidesGrid,
                            d = t.snapGrid,
                            h = e;
                        if (h.originalEvent && (h = h.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", h), i.allowTouchCallbacks = !1, !i.isTouched) return i.isMoved && s.grabCursor && t.setGrabCursor(!1), i.isMoved = !1, void(i.startMoving = !1);
                        s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                        var p, c = l.now(),
                            u = c - i.touchStartTime;
                        if (t.allowClick && (t.updateClickedSlide(h), t.emit("tap", h), u < 300 && c - i.lastClickTime > 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), i.clickTimeout = l.nextTick(function() { t && !t.destroyed && t.emit("click", h) }, 300)), u < 300 && c - i.lastClickTime < 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), t.emit("doubleTap", h))), i.lastClickTime = l.now(), l.nextTick(function() { t.destroyed || (t.allowClick = !0) }), !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate) return i.isTouched = !1, i.isMoved = !1, void(i.startMoving = !1);
                        if (i.isTouched = !1, i.isMoved = !1, i.startMoving = !1, p = s.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate, s.freeMode) {
                            if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                            if (p > -t.maxTranslate()) return void(t.slides.length < d.length ? t.slideTo(d.length - 1) : t.slideTo(t.slides.length - 1));
                            if (s.freeModeMomentum) {
                                if (i.velocities.length > 1) {
                                    var v = i.velocities.pop(),
                                        f = i.velocities.pop(),
                                        m = v.position - f.position,
                                        g = v.time - f.time;
                                    t.velocity = m / g, t.velocity /= 2, Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0), (g > 150 || l.now() - v.time > 300) && (t.velocity = 0)
                                } else t.velocity = 0;
                                t.velocity *= s.freeModeMomentumVelocityRatio, i.velocities.length = 0;
                                var b = 1e3 * s.freeModeMomentumRatio,
                                    w = t.velocity * b,
                                    y = t.translate + w;
                                r && (y = -y);
                                var x, T, E = !1,
                                    S = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
                                if (y < t.maxTranslate()) s.freeModeMomentumBounce ? (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S), x = t.maxTranslate(), E = !0, i.allowMomentumBounce = !0) : y = t.maxTranslate(), s.loop && s.centeredSlides && (T = !0);
                                else if (y > t.minTranslate()) s.freeModeMomentumBounce ? (y - t.minTranslate() > S && (y = t.minTranslate() + S), x = t.minTranslate(), E = !0, i.allowMomentumBounce = !0) : y = t.minTranslate(), s.loop && s.centeredSlides && (T = !0);
                                else if (s.freeModeSticky) {
                                    for (var C, M = 0; M < d.length; M += 1)
                                        if (d[M] > -y) { C = M; break }
                                    y = -(y = Math.abs(d[C] - y) < Math.abs(d[C - 1] - y) || "next" === t.swipeDirection ? d[C] : d[C - 1])
                                }
                                if (T && t.once("transitionEnd", function() { t.loopFix() }), 0 !== t.velocity) b = r ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity);
                                else if (s.freeModeSticky) return void t.slideToClosest();
                                s.freeModeMomentumBounce && E ? (t.updateProgress(x), t.setTransition(b), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating = !0, n.transitionEnd(function() { t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(s.speed), t.setTranslate(x), n.transitionEnd(function() { t && !t.destroyed && t.transitionEnd() })) })) : t.velocity ? (t.updateProgress(y), t.setTransition(b), t.setTranslate(y), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, n.transitionEnd(function() { t && !t.destroyed && t.transitionEnd() }))) : t.updateProgress(y), t.updateActiveIndex(), t.updateSlidesClasses()
                            } else if (s.freeModeSticky) return void t.slideToClosest();
                            (!s.freeModeMomentum || u >= s.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
                        } else { for (var P = 0, k = t.slidesSizesGrid[0], z = 0; z < o.length; z += s.slidesPerGroup) void 0 !== o[z + s.slidesPerGroup] ? p >= o[z] && p < o[z + s.slidesPerGroup] && (P = z, k = o[z + s.slidesPerGroup] - o[z]) : p >= o[z] && (P = z, k = o[o.length - 1] - o[o.length - 2]); var $ = (p - o[P]) / k; if (u > s.longSwipesMs) { if (!s.longSwipes) return void t.slideTo(t.activeIndex); "next" === t.swipeDirection && ($ >= s.longSwipesRatio ? t.slideTo(P + s.slidesPerGroup) : t.slideTo(P)), "prev" === t.swipeDirection && ($ > 1 - s.longSwipesRatio ? t.slideTo(P + s.slidesPerGroup) : t.slideTo(P)) } else { if (!s.shortSwipes) return void t.slideTo(t.activeIndex); "next" === t.swipeDirection && t.slideTo(P + s.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(P) } }
                    }.bind(this), this.onClick = function(e) { this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation())) }.bind(this);
                    var o = "container" === i.touchEventsTarget ? r : n,
                        h = !!i.nested;
                    if (d.touch || !d.pointerEvents && !d.prefixedPointerEvents) {
                        if (d.touch) {
                            var p = !("touchstart" !== a.start || !d.passiveListener || !i.passiveListeners) && { passive: !0, capture: !1 };
                            o.addEventListener(a.start, this.onTouchStart, p), o.addEventListener(a.move, this.onTouchMove, d.passiveListener ? { passive: !1, capture: h } : h), o.addEventListener(a.end, this.onTouchEnd, p)
                        }(i.simulateTouch && !y.ios && !y.android || i.simulateTouch && !d.touch && y.ios) && (o.addEventListener("mousedown", this.onTouchStart, !1), e.addEventListener("mousemove", this.onTouchMove, h), e.addEventListener("mouseup", this.onTouchEnd, !1))
                    } else o.addEventListener(a.start, this.onTouchStart, !1), e.addEventListener(a.move, this.onTouchMove, h), e.addEventListener(a.end, this.onTouchEnd, !1);
                    (i.preventClicks || i.preventClicksPropagation) && o.addEventListener("click", this.onClick, !0), this.on(y.ios || y.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", x, !0)
                },
                detachEvents: function() {
                    var t = this.params,
                        i = this.touchEvents,
                        s = this.el,
                        a = this.wrapperEl,
                        r = "container" === t.touchEventsTarget ? s : a,
                        n = !!t.nested;
                    if (d.touch || !d.pointerEvents && !d.prefixedPointerEvents) {
                        if (d.touch) {
                            var o = !("onTouchStart" !== i.start || !d.passiveListener || !t.passiveListeners) && { passive: !0, capture: !1 };
                            r.removeEventListener(i.start, this.onTouchStart, o), r.removeEventListener(i.move, this.onTouchMove, n), r.removeEventListener(i.end, this.onTouchEnd, o)
                        }(t.simulateTouch && !y.ios && !y.android || t.simulateTouch && !d.touch && y.ios) && (r.removeEventListener("mousedown", this.onTouchStart, !1), e.removeEventListener("mousemove", this.onTouchMove, n), e.removeEventListener("mouseup", this.onTouchEnd, !1))
                    } else r.removeEventListener(i.start, this.onTouchStart, !1), e.removeEventListener(i.move, this.onTouchMove, n), e.removeEventListener(i.end, this.onTouchEnd, !1);
                    (t.preventClicks || t.preventClicksPropagation) && r.removeEventListener("click", this.onClick, !0), this.off(y.ios || y.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", x)
                }
            },
            breakpoints: {
                setBreakpoint: function() {
                    var e = this.activeIndex,
                        t = this.initialized,
                        i = this.loopedSlides;
                    void 0 === i && (i = 0);
                    var s = this.params,
                        a = s.breakpoints;
                    if (a && (!a || 0 !== Object.keys(a).length)) {
                        var r = this.getBreakpoint(a);
                        if (r && this.currentBreakpoint !== r) {
                            var n = r in a ? a[r] : void 0;
                            n && ["slidesPerView", "spaceBetween", "slidesPerGroup"].forEach(function(e) {
                                var t = n[e];
                                void 0 !== t && (n[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                            });
                            var o = n || this.originalParams,
                                d = o.direction && o.direction !== s.direction,
                                h = s.loop && (o.slidesPerView !== s.slidesPerView || d);
                            d && t && this.changeDirection(), l.extend(this.params, o), l.extend(this, { allowTouchMove: this.params.allowTouchMove, allowSlideNext: this.params.allowSlideNext, allowSlidePrev: this.params.allowSlidePrev }), this.currentBreakpoint = r, h && t && (this.loopDestroy(), this.loopCreate(), this.updateSlides(), this.slideTo(e - i + this.loopedSlides, 0, !1)), this.emit("breakpoint", o)
                        }
                    }
                },
                getBreakpoint: function(e) {
                    if (e) {
                        var i = !1,
                            s = [];
                        Object.keys(e).forEach(function(e) { s.push(e) }), s.sort(function(e, t) { return parseInt(e, 10) - parseInt(t, 10) });
                        for (var a = 0; a < s.length; a += 1) {
                            var r = s[a];
                            this.params.breakpointsInverse ? r <= t.innerWidth && (i = r) : r >= t.innerWidth && !i && (i = r)
                        }
                        return i || "max"
                    }
                }
            },
            checkOverflow: {
                checkOverflow: function() {
                    var e = this.isLocked;
                    this.isLocked = 1 === this.snapGrid.length, this.allowSlideNext = !this.isLocked, this.allowSlidePrev = !this.isLocked, e !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"), e && e !== this.isLocked && (this.isEnd = !1, this.navigation.update())
                }
            },
            classes: {
                addClasses: function() {
                    var e = this.classNames,
                        t = this.params,
                        i = this.rtl,
                        s = this.$el,
                        a = [];
                    a.push("initialized"), a.push(t.direction), t.freeMode && a.push("free-mode"), d.flexbox || a.push("no-flexbox"), t.autoHeight && a.push("autoheight"), i && a.push("rtl"), t.slidesPerColumn > 1 && a.push("multirow"), y.android && a.push("android"), y.ios && a.push("ios"), (h.isIE || h.isEdge) && (d.pointerEvents || d.prefixedPointerEvents) && a.push("wp8-" + t.direction), a.forEach(function(i) { e.push(t.containerModifierClass + i) }), s.addClass(e.join(" "))
                },
                removeClasses: function() {
                    var e = this.$el,
                        t = this.classNames;
                    e.removeClass(t.join(" "))
                }
            },
            images: {
                loadImage: function(e, i, s, a, r, n) {
                    var o;

                    function l() { n && n() }
                    e.complete && r ? l() : i ? ((o = new t.Image).onload = l, o.onerror = l, a && (o.sizes = a), s && (o.srcset = s), i && (o.src = i)) : l()
                },
                preloadImages: function() {
                    var e = this;

                    function t() { null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady"))) }
                    e.imagesToLoad = e.$el.find("img");
                    for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                        var s = e.imagesToLoad[i];
                        e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t)
                    }
                }
            }
        },
        S = {},
        C = function(e) {
            function t() {
                for (var i, a, r, n = [], o = arguments.length; o--;) n[o] = arguments[o];
                1 === n.length && n[0].constructor && n[0].constructor === Object ? r = n[0] : (a = (i = n)[0], r = i[1]), r || (r = {}), r = l.extend({}, r), a && !r.el && (r.el = a), e.call(this, r), Object.keys(E).forEach(function(e) { Object.keys(E[e]).forEach(function(i) { t.prototype[i] || (t.prototype[i] = E[e][i]) }) });
                var h = this;
                void 0 === h.modules && (h.modules = {}), Object.keys(h.modules).forEach(function(e) {
                    var t = h.modules[e];
                    if (t.params) {
                        var i = Object.keys(t.params)[0],
                            s = t.params[i];
                        if ("object" != typeof s || null === s) return;
                        if (!(i in r && "enabled" in s)) return;
                        !0 === r[i] && (r[i] = { enabled: !0 }), "object" != typeof r[i] || "enabled" in r[i] || (r[i].enabled = !0), r[i] || (r[i] = { enabled: !1 })
                    }
                });
                var p = l.extend({}, T);
                h.useModulesParams(p), h.params = l.extend({}, p, S, r), h.originalParams = l.extend({}, h.params), h.passedParams = l.extend({}, r), h.$ = s;
                var c = s(h.params.el);
                if (a = c[0]) {
                    if (c.length > 1) {
                        var u = [];
                        return c.each(function(e, i) {
                            var s = l.extend({}, r, { el: i });
                            u.push(new t(s))
                        }), u
                    }
                    a.swiper = h, c.data("swiper", h);
                    var v, f, m = c.children("." + h.params.wrapperClass);
                    return l.extend(h, { $el: c, el: a, $wrapperEl: m, wrapperEl: m[0], classNames: [], slides: s(), slidesGrid: [], snapGrid: [], slidesSizesGrid: [], isHorizontal: function() { return "horizontal" === h.params.direction }, isVertical: function() { return "vertical" === h.params.direction }, rtl: "rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction"), rtlTranslate: "horizontal" === h.params.direction && ("rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction")), wrongRTL: "-webkit-box" === m.css("display"), activeIndex: 0, realIndex: 0, isBeginning: !0, isEnd: !1, translate: 0, previousTranslate: 0, progress: 0, velocity: 0, animating: !1, allowSlideNext: h.params.allowSlideNext, allowSlidePrev: h.params.allowSlidePrev, touchEvents: (v = ["touchstart", "touchmove", "touchend"], f = ["mousedown", "mousemove", "mouseup"], d.pointerEvents ? f = ["pointerdown", "pointermove", "pointerup"] : d.prefixedPointerEvents && (f = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]), h.touchEventsTouch = { start: v[0], move: v[1], end: v[2] }, h.touchEventsDesktop = { start: f[0], move: f[1], end: f[2] }, d.touch || !h.params.simulateTouch ? h.touchEventsTouch : h.touchEventsDesktop), touchEventsData: { isTouched: void 0, isMoved: void 0, allowTouchCallbacks: void 0, touchStartTime: void 0, isScrolling: void 0, currentTranslate: void 0, startTranslate: void 0, allowThresholdMove: void 0, formElements: "input, select, option, textarea, button, video", lastClickTime: l.now(), clickTimeout: void 0, velocities: [], allowMomentumBounce: void 0, isTouchEvent: void 0, startMoving: void 0 }, allowClick: !0, allowTouchMove: h.params.allowTouchMove, touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 }, imagesToLoad: [], imagesLoaded: 0 }), h.useModules(), h.params.init && h.init(), h
                }
            }
            e && (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t;
            var i = { extendedDefaults: { configurable: !0 }, defaults: { configurable: !0 }, Class: { configurable: !0 }, $: { configurable: !0 } };
            return t.prototype.slidesPerViewDynamic = function() {
                var e = this.params,
                    t = this.slides,
                    i = this.slidesGrid,
                    s = this.size,
                    a = this.activeIndex,
                    r = 1;
                if (e.centeredSlides) { for (var n, o = t[a].swiperSlideSize, l = a + 1; l < t.length; l += 1) t[l] && !n && (r += 1, (o += t[l].swiperSlideSize) > s && (n = !0)); for (var d = a - 1; d >= 0; d -= 1) t[d] && !n && (r += 1, (o += t[d].swiperSlideSize) > s && (n = !0)) } else
                    for (var h = a + 1; h < t.length; h += 1) i[h] - i[a] < s && (r += 1);
                return r
            }, t.prototype.update = function() {
                var e = this;
                if (e && !e.destroyed) {
                    var t = e.snapGrid,
                        i = e.params;
                    i.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (s(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || s(), i.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
                }

                function s() {
                    var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                        i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                    e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses()
                }
            }, t.prototype.changeDirection = function(e, t) { void 0 === t && (t = !0); var i = this.params.direction; return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e ? this : (this.$el.removeClass("" + this.params.containerModifierClass + i + " wp8-" + i).addClass("" + this.params.containerModifierClass + e), (h.isIE || h.isEdge) && (d.pointerEvents || d.prefixedPointerEvents) && this.$el.addClass(this.params.containerModifierClass + "wp8-" + e), this.params.direction = e, this.slides.each(function(t, i) { "vertical" === e ? i.style.width = "" : i.style.height = "" }), this.emit("changeDirection"), t && this.update(), this) }, t.prototype.init = function() { this.initialized || (this.emit("beforeInit"), this.params.breakpoints && this.setBreakpoint(), this.addClasses(), this.params.loop && this.loopCreate(), this.updateSize(), this.updateSlides(), this.params.watchOverflow && this.checkOverflow(), this.params.grabCursor && this.setGrabCursor(), this.params.preloadImages && this.preloadImages(), this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit), this.attachEvents(), this.initialized = !0, this.emit("init")) }, t.prototype.destroy = function(e, t) {
                void 0 === e && (e = !0), void 0 === t && (t = !0);
                var i = this,
                    s = i.params,
                    a = i.$el,
                    r = i.$wrapperEl,
                    n = i.slides;
                return void 0 === i.params || i.destroyed ? null : (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), a.removeAttr("style"), r.removeAttr("style"), n && n.length && n.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index").removeAttr("data-swiper-column").removeAttr("data-swiper-row")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach(function(e) { i.off(e) }), !1 !== e && (i.$el[0].swiper = null, i.$el.data("swiper", null), l.deleteProps(i)), i.destroyed = !0, null)
            }, t.extendDefaults = function(e) { l.extend(S, e) }, i.extendedDefaults.get = function() { return S }, i.defaults.get = function() { return T }, i.Class.get = function() { return e }, i.$.get = function() { return s }, Object.defineProperties(t, i), t
        }(p),
        M = { name: "device", proto: { device: y }, static: { device: y } },
        P = { name: "support", proto: { support: d }, static: { support: d } },
        k = { name: "browser", proto: { browser: h }, static: { browser: h } },
        z = {
            name: "resize",
            create: function() {
                var e = this;
                l.extend(e, { resize: { resizeHandler: function() { e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize")) }, orientationChangeHandler: function() { e && !e.destroyed && e.initialized && e.emit("orientationchange") } } })
            },
            on: { init: function() { t.addEventListener("resize", this.resize.resizeHandler), t.addEventListener("orientationchange", this.resize.orientationChangeHandler) }, destroy: function() { t.removeEventListener("resize", this.resize.resizeHandler), t.removeEventListener("orientationchange", this.resize.orientationChangeHandler) } }
        },
        $ = {
            func: t.MutationObserver || t.WebkitMutationObserver,
            attach: function(e, i) {
                void 0 === i && (i = {});
                var s = this,
                    a = new(0, $.func)(function(e) {
                        if (1 !== e.length) {
                            var i = function() { s.emit("observerUpdate", e[0]) };
                            t.requestAnimationFrame ? t.requestAnimationFrame(i) : t.setTimeout(i, 0)
                        } else s.emit("observerUpdate", e[0])
                    });
                a.observe(e, { attributes: void 0 === i.attributes || i.attributes, childList: void 0 === i.childList || i.childList, characterData: void 0 === i.characterData || i.characterData }), s.observer.observers.push(a)
            },
            init: function() {
                if (d.observer && this.params.observer) {
                    if (this.params.observeParents)
                        for (var e = this.$el.parents(), t = 0; t < e.length; t += 1) this.observer.attach(e[t]);
                    this.observer.attach(this.$el[0], { childList: this.params.observeSlideChildren }), this.observer.attach(this.$wrapperEl[0], { attributes: !1 })
                }
            },
            destroy: function() { this.observer.observers.forEach(function(e) { e.disconnect() }), this.observer.observers = [] }
        },
        I = { name: "observer", params: { observer: !1, observeParents: !1, observeSlideChildren: !1 }, create: function() { l.extend(this, { observer: { init: $.init.bind(this), attach: $.attach.bind(this), destroy: $.destroy.bind(this), observers: [] } }) }, on: { init: function() { this.observer.init() }, destroy: function() { this.observer.destroy() } } },
        L = {
            update: function(e) {
                var t = this,
                    i = t.params,
                    s = i.slidesPerView,
                    a = i.slidesPerGroup,
                    r = i.centeredSlides,
                    n = t.params.virtual,
                    o = n.addSlidesBefore,
                    d = n.addSlidesAfter,
                    h = t.virtual,
                    p = h.from,
                    c = h.to,
                    u = h.slides,
                    v = h.slidesGrid,
                    f = h.renderSlide,
                    m = h.offset;
                t.updateActiveIndex();
                var g, b, w, y = t.activeIndex || 0;
                g = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (b = Math.floor(s / 2) + a + o, w = Math.floor(s / 2) + a + d) : (b = s + (a - 1) + o, w = a + d);
                var x = Math.max((y || 0) - w, 0),
                    T = Math.min((y || 0) + b, u.length - 1),
                    E = (t.slidesGrid[x] || 0) - (t.slidesGrid[0] || 0);

                function S() { t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load() }
                if (l.extend(t.virtual, { from: x, to: T, offset: E, slidesGrid: t.slidesGrid }), p === x && c === T && !e) return t.slidesGrid !== v && E !== m && t.slides.css(g, E + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, { offset: E, from: x, to: T, slides: function() { for (var e = [], t = x; t <= T; t += 1) e.push(u[t]); return e }() }), void S();
                var C = [],
                    M = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else
                    for (var P = p; P <= c; P += 1)(P < x || P > T) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + P + '"]').remove();
                for (var k = 0; k < u.length; k += 1) k >= x && k <= T && (void 0 === c || e ? M.push(k) : (k > c && M.push(k), k < p && C.push(k)));
                M.forEach(function(e) { t.$wrapperEl.append(f(u[e], e)) }), C.sort(function(e, t) { return t - e }).forEach(function(e) { t.$wrapperEl.prepend(f(u[e], e)) }), t.$wrapperEl.children(".swiper-slide").css(g, E + "px"), S()
            },
            renderSlide: function(e, t) { var i = this.params.virtual; if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t]; var a = i.renderSlide ? s(i.renderSlide.call(this, e, t)) : s('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>"); return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", t), i.cache && (this.virtual.cache[t] = a), a },
            appendSlide: function(e) {
                if ("object" == typeof e && "length" in e)
                    for (var t = 0; t < e.length; t += 1) e[t] && this.virtual.slides.push(e[t]);
                else this.virtual.slides.push(e);
                this.virtual.update(!0)
            },
            prependSlide: function(e) {
                var t = this.activeIndex,
                    i = t + 1,
                    s = 1;
                if (Array.isArray(e)) {
                    for (var a = 0; a < e.length; a += 1) e[a] && this.virtual.slides.unshift(e[a]);
                    i = t + e.length, s = e.length
                } else this.virtual.slides.unshift(e);
                if (this.params.virtual.cache) {
                    var r = this.virtual.cache,
                        n = {};
                    Object.keys(r).forEach(function(e) { n[parseInt(e, 10) + s] = r[e] }), this.virtual.cache = n
                }
                this.virtual.update(!0), this.slideTo(i, 0)
            },
            removeSlide: function(e) {
                if (null != e) {
                    var t = this.activeIndex;
                    if (Array.isArray(e))
                        for (var i = e.length - 1; i >= 0; i -= 1) this.virtual.slides.splice(e[i], 1), this.params.virtual.cache && delete this.virtual.cache[e[i]], e[i] < t && (t -= 1), t = Math.max(t, 0);
                    else this.virtual.slides.splice(e, 1), this.params.virtual.cache && delete this.virtual.cache[e], e < t && (t -= 1), t = Math.max(t, 0);
                    this.virtual.update(!0), this.slideTo(t, 0)
                }
            },
            removeAllSlides: function() { this.virtual.slides = [], this.params.virtual.cache && (this.virtual.cache = {}), this.virtual.update(!0), this.slideTo(0, 0) }
        },
        D = {
            name: "virtual",
            params: { virtual: { enabled: !1, slides: [], cache: !0, renderSlide: null, renderExternal: null, addSlidesBefore: 0, addSlidesAfter: 0 } },
            create: function() { l.extend(this, { virtual: { update: L.update.bind(this), appendSlide: L.appendSlide.bind(this), prependSlide: L.prependSlide.bind(this), removeSlide: L.removeSlide.bind(this), removeAllSlides: L.removeAllSlides.bind(this), renderSlide: L.renderSlide.bind(this), slides: this.params.virtual.slides, cache: {} } }) },
            on: {
                beforeInit: function() {
                    if (this.params.virtual.enabled) {
                        this.classNames.push(this.params.containerModifierClass + "virtual");
                        var e = { watchSlidesProgress: !0 };
                        l.extend(this.params, e), l.extend(this.originalParams, e), this.params.initialSlide || this.virtual.update()
                    }
                },
                setTranslate: function() { this.params.virtual.enabled && this.virtual.update() }
            }
        },
        O = {
            handle: function(i) {
                var s = this.rtlTranslate,
                    a = i;
                a.originalEvent && (a = a.originalEvent);
                var r = a.keyCode || a.charCode;
                if (!this.allowSlideNext && (this.isHorizontal() && 39 === r || this.isVertical() && 40 === r || 34 === r)) return !1;
                if (!this.allowSlidePrev && (this.isHorizontal() && 37 === r || this.isVertical() && 38 === r || 33 === r)) return !1;
                if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || e.activeElement && e.activeElement.nodeName && ("input" === e.activeElement.nodeName.toLowerCase() || "textarea" === e.activeElement.nodeName.toLowerCase()))) {
                    if (this.params.keyboard.onlyInViewport && (33 === r || 34 === r || 37 === r || 39 === r || 38 === r || 40 === r)) {
                        var n = !1;
                        if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return;
                        var o = t.innerWidth,
                            l = t.innerHeight,
                            d = this.$el.offset();
                        s && (d.left -= this.$el[0].scrollLeft);
                        for (var h = [
                                [d.left, d.top],
                                [d.left + this.width, d.top],
                                [d.left, d.top + this.height],
                                [d.left + this.width, d.top + this.height]
                            ], p = 0; p < h.length; p += 1) {
                            var c = h[p];
                            c[0] >= 0 && c[0] <= o && c[1] >= 0 && c[1] <= l && (n = !0)
                        }
                        if (!n) return
                    }
                    this.isHorizontal() ? (33 !== r && 34 !== r && 37 !== r && 39 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (34 !== r && 39 !== r || s) && (33 !== r && 37 !== r || !s) || this.slideNext(), (33 !== r && 37 !== r || s) && (34 !== r && 39 !== r || !s) || this.slidePrev()) : (33 !== r && 34 !== r && 38 !== r && 40 !== r || (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 34 !== r && 40 !== r || this.slideNext(), 33 !== r && 38 !== r || this.slidePrev()), this.emit("keyPress", r)
                }
            },
            enable: function() { this.keyboard.enabled || (s(e).on("keydown", this.keyboard.handle), this.keyboard.enabled = !0) },
            disable: function() { this.keyboard.enabled && (s(e).off("keydown", this.keyboard.handle), this.keyboard.enabled = !1) }
        },
        A = { name: "keyboard", params: { keyboard: { enabled: !1, onlyInViewport: !0 } }, create: function() { l.extend(this, { keyboard: { enabled: !1, enable: O.enable.bind(this), disable: O.disable.bind(this), handle: O.handle.bind(this) } }) }, on: { init: function() { this.params.keyboard.enabled && this.keyboard.enable() }, destroy: function() { this.keyboard.enabled && this.keyboard.disable() } } };
    var H = {
            lastScrollTime: l.now(),
            event: t.navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
                var t = "onwheel" in e;
                if (!t) {
                    var i = e.createElement("div");
                    i.setAttribute("onwheel", "return;"), t = "function" == typeof i.onwheel
                }
                return !t && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (t = e.implementation.hasFeature("Events.wheel", "3.0")), t
            }() ? "wheel" : "mousewheel",
            normalize: function(e) {
                var t = 0,
                    i = 0,
                    s = 0,
                    a = 0;
                return "detail" in e && (i = e.detail), "wheelDelta" in e && (i = -e.wheelDelta / 120), "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = i, i = 0), s = 10 * t, a = 10 * i, "deltaY" in e && (a = e.deltaY), "deltaX" in e && (s = e.deltaX), (s || a) && e.deltaMode && (1 === e.deltaMode ? (s *= 40, a *= 40) : (s *= 800, a *= 800)), s && !t && (t = s < 1 ? -1 : 1), a && !i && (i = a < 1 ? -1 : 1), { spinX: t, spinY: i, pixelX: s, pixelY: a }
            },
            handleMouseEnter: function() { this.mouseEntered = !0 },
            handleMouseLeave: function() { this.mouseEntered = !1 },
            handle: function(e) {
                var i = e,
                    s = this,
                    a = s.params.mousewheel;
                if (!s.mouseEntered && !a.releaseOnEdges) return !0;
                i.originalEvent && (i = i.originalEvent);
                var r = 0,
                    n = s.rtlTranslate ? -1 : 1,
                    o = H.normalize(i);
                if (a.forceToAxis)
                    if (s.isHorizontal()) {
                        if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
                        r = o.pixelX * n
                    } else {
                        if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
                        r = o.pixelY
                    }
                else r = Math.abs(o.pixelX) > Math.abs(o.pixelY) ? -o.pixelX * n : -o.pixelY;
                if (0 === r) return !0;
                if (a.invert && (r = -r), s.params.freeMode) {
                    s.params.loop && s.loopFix();
                    var d = s.getTranslate() + r * a.sensitivity,
                        h = s.isBeginning,
                        p = s.isEnd;
                    if (d >= s.minTranslate() && (d = s.minTranslate()), d <= s.maxTranslate() && (d = s.maxTranslate()), s.setTransition(0), s.setTranslate(d), s.updateProgress(), s.updateActiveIndex(), s.updateSlidesClasses(), (!h && s.isBeginning || !p && s.isEnd) && s.updateSlidesClasses(), s.params.freeModeSticky && (clearTimeout(s.mousewheel.timeout), s.mousewheel.timeout = l.nextTick(function() { s.slideToClosest() }, 300)), s.emit("scroll", i), s.params.autoplay && s.params.autoplayDisableOnInteraction && s.autoplay.stop(), d === s.minTranslate() || d === s.maxTranslate()) return !0
                } else {
                    if (l.now() - s.mousewheel.lastScrollTime > 60)
                        if (r < 0)
                            if (s.isEnd && !s.params.loop || s.animating) { if (a.releaseOnEdges) return !0 } else s.slideNext(), s.emit("scroll", i);
                    else if (s.isBeginning && !s.params.loop || s.animating) { if (a.releaseOnEdges) return !0 } else s.slidePrev(), s.emit("scroll", i);
                    s.mousewheel.lastScrollTime = (new t.Date).getTime()
                }
                return i.preventDefault ? i.preventDefault() : i.returnValue = !1, !1
            },
            enable: function() { if (!H.event) return !1; if (this.mousewheel.enabled) return !1; var e = this.$el; return "container" !== this.params.mousewheel.eventsTarged && (e = s(this.params.mousewheel.eventsTarged)), e.on("mouseenter", this.mousewheel.handleMouseEnter), e.on("mouseleave", this.mousewheel.handleMouseLeave), e.on(H.event, this.mousewheel.handle), this.mousewheel.enabled = !0, !0 },
            disable: function() { if (!H.event) return !1; if (!this.mousewheel.enabled) return !1; var e = this.$el; return "container" !== this.params.mousewheel.eventsTarged && (e = s(this.params.mousewheel.eventsTarged)), e.off(H.event, this.mousewheel.handle), this.mousewheel.enabled = !1, !0 }
        },
        G = {
            update: function() {
                var e = this.params.navigation;
                if (!this.params.loop) {
                    var t = this.navigation,
                        i = t.$nextEl,
                        s = t.$prevEl;
                    s && s.length > 0 && (this.isBeginning ? s.addClass(e.disabledClass) : s.removeClass(e.disabledClass), s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)), i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass), i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass))
                }
            },
            onPrevClick: function(e) { e.preventDefault(), this.isBeginning && !this.params.loop || this.slidePrev() },
            onNextClick: function(e) { e.preventDefault(), this.isEnd && !this.params.loop || this.slideNext() },
            init: function() {
                var e, t, i = this.params.navigation;
                (i.nextEl || i.prevEl) && (i.nextEl && (e = s(i.nextEl), this.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === this.$el.find(i.nextEl).length && (e = this.$el.find(i.nextEl))), i.prevEl && (t = s(i.prevEl), this.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === this.$el.find(i.prevEl).length && (t = this.$el.find(i.prevEl))), e && e.length > 0 && e.on("click", this.navigation.onNextClick), t && t.length > 0 && t.on("click", this.navigation.onPrevClick), l.extend(this.navigation, { $nextEl: e, nextEl: e && e[0], $prevEl: t, prevEl: t && t[0] }))
            },
            destroy: function() {
                var e = this.navigation,
                    t = e.$nextEl,
                    i = e.$prevEl;
                t && t.length && (t.off("click", this.navigation.onNextClick), t.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click", this.navigation.onPrevClick), i.removeClass(this.params.navigation.disabledClass))
            }
        },
        N = {
            update: function() {
                var e = this.rtl,
                    t = this.params.pagination;
                if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var i, a = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                        r = this.pagination.$el,
                        n = this.params.loop ? Math.ceil((a - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;
                    if (this.params.loop ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > a - 1 - 2 * this.loopedSlides && (i -= a - 2 * this.loopedSlides), i > n - 1 && (i -= n), i < 0 && "bullets" !== this.params.paginationType && (i = n + i)) : i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0, "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0) {
                        var o, l, d, h = this.pagination.bullets;
                        if (t.dynamicBullets && (this.pagination.bulletSize = h.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"), t.dynamicMainBullets > 1 && void 0 !== this.previousIndex && (this.pagination.dynamicBulletIndex += i - this.previousIndex, this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1 ? this.pagination.dynamicBulletIndex = t.dynamicMainBullets - 1 : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)), o = i - this.pagination.dynamicBulletIndex, d = ((l = o + (Math.min(h.length, t.dynamicMainBullets) - 1)) + o) / 2), h.removeClass(t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"), r.length > 1) h.each(function(e, a) {
                            var r = s(a),
                                n = r.index();
                            n === i && r.addClass(t.bulletActiveClass), t.dynamicBullets && (n >= o && n <= l && r.addClass(t.bulletActiveClass + "-main"), n === o && r.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), n === l && r.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"))
                        });
                        else if (h.eq(i).addClass(t.bulletActiveClass), t.dynamicBullets) {
                            for (var p = h.eq(o), c = h.eq(l), u = o; u <= l; u += 1) h.eq(u).addClass(t.bulletActiveClass + "-main");
                            p.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"), c.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next")
                        }
                        if (t.dynamicBullets) {
                            var v = Math.min(h.length, t.dynamicMainBullets + 4),
                                f = (this.pagination.bulletSize * v - this.pagination.bulletSize) / 2 - d * this.pagination.bulletSize,
                                m = e ? "right" : "left";
                            h.css(this.isHorizontal() ? m : "top", f + "px")
                        }
                    }
                    if ("fraction" === t.type && (r.find("." + t.currentClass).text(t.formatFractionCurrent(i + 1)), r.find("." + t.totalClass).text(t.formatFractionTotal(n))), "progressbar" === t.type) {
                        var g;
                        g = t.progressbarOpposite ? this.isHorizontal() ? "vertical" : "horizontal" : this.isHorizontal() ? "horizontal" : "vertical";
                        var b = (i + 1) / n,
                            w = 1,
                            y = 1;
                        "horizontal" === g ? w = b : y = b, r.find("." + t.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + w + ") scaleY(" + y + ")").transition(this.params.speed)
                    }
                    "custom" === t.type && t.renderCustom ? (r.html(t.renderCustom(this, i + 1, n)), this.emit("paginationRender", this, r[0])) : this.emit("paginationUpdate", this, r[0]), r[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass)
                }
            },
            render: function() {
                var e = this.params.pagination;
                if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                        i = this.pagination.$el,
                        s = "";
                    if ("bullets" === e.type) {
                        for (var a = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, r = 0; r < a; r += 1) e.renderBullet ? s += e.renderBullet.call(this, r, e.bulletClass) : s += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">";
                        i.html(s), this.pagination.bullets = i.find("." + e.bulletClass)
                    }
                    "fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>', i.html(s)), "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>', i.html(s)), "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0])
                }
            },
            init: function() {
                var e = this,
                    t = e.params.pagination;
                if (t.el) {
                    var i = s(t.el);
                    0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)), "bullets" === t.type && t.clickable && i.addClass(t.clickableClass), i.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass), t.clickable && i.on("click", "." + t.bulletClass, function(t) {
                        t.preventDefault();
                        var i = s(this).index() * e.params.slidesPerGroup;
                        e.params.loop && (i += e.loopedSlides), e.slideTo(i)
                    }), l.extend(e.pagination, { $el: i, el: i[0] }))
                }
            },
            destroy: function() {
                var e = this.params.pagination;
                if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var t = this.pagination.$el;
                    t.removeClass(e.hiddenClass), t.removeClass(e.modifierClass + e.type), this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && t.off("click", "." + e.bulletClass)
                }
            }
        },
        B = {
            setTranslate: function() {
                if (this.params.scrollbar.el && this.scrollbar.el) {
                    var e = this.scrollbar,
                        t = this.rtlTranslate,
                        i = this.progress,
                        s = e.dragSize,
                        a = e.trackSize,
                        r = e.$dragEl,
                        n = e.$el,
                        o = this.params.scrollbar,
                        l = s,
                        h = (a - s) * i;
                    t ? (h = -h) > 0 ? (l = s - h, h = 0) : -h + s > a && (l = a + h) : h < 0 ? (l = s + h, h = 0) : h + s > a && (l = a - h), this.isHorizontal() ? (d.transforms3d ? r.transform("translate3d(" + h + "px, 0, 0)") : r.transform("translateX(" + h + "px)"), r[0].style.width = l + "px") : (d.transforms3d ? r.transform("translate3d(0px, " + h + "px, 0)") : r.transform("translateY(" + h + "px)"), r[0].style.height = l + "px"), o.hide && (clearTimeout(this.scrollbar.timeout), n[0].style.opacity = 1, this.scrollbar.timeout = setTimeout(function() { n[0].style.opacity = 0, n.transition(400) }, 1e3))
                }
            },
            setTransition: function(e) { this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e) },
            updateSize: function() {
                if (this.params.scrollbar.el && this.scrollbar.el) {
                    var e = this.scrollbar,
                        t = e.$dragEl,
                        i = e.$el;
                    t[0].style.width = "", t[0].style.height = "";
                    var s, a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
                        r = this.size / this.virtualSize,
                        n = r * (a / this.size);
                    s = "auto" === this.params.scrollbar.dragSize ? a * r : parseInt(this.params.scrollbar.dragSize, 10), this.isHorizontal() ? t[0].style.width = s + "px" : t[0].style.height = s + "px", i[0].style.display = r >= 1 ? "none" : "", this.params.scrollbar.hide && (i[0].style.opacity = 0), l.extend(e, { trackSize: a, divider: r, moveDivider: n, dragSize: s }), e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass)
                }
            },
            getPointerPosition: function(e) { return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX || e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY || e.clientY },
            setDragPosition: function(e) {
                var t, i = this.scrollbar,
                    s = this.rtlTranslate,
                    a = i.$el,
                    r = i.dragSize,
                    n = i.trackSize,
                    o = i.dragStartPos;
                t = (i.getPointerPosition(e) - a.offset()[this.isHorizontal() ? "left" : "top"] - (null !== o ? o : r / 2)) / (n - r), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
                var l = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
                this.updateProgress(l), this.setTranslate(l), this.updateActiveIndex(), this.updateSlidesClasses()
            },
            onDragStart: function(e) {
                var t = this.params.scrollbar,
                    i = this.scrollbar,
                    s = this.$wrapperEl,
                    a = i.$el,
                    r = i.$dragEl;
                this.scrollbar.isTouched = !0, this.scrollbar.dragStartPos = e.target === r[0] || e.target === r ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[this.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), s.transition(100), r.transition(100), i.setDragPosition(e), clearTimeout(this.scrollbar.dragTimeout), a.transition(0), t.hide && a.css("opacity", 1), this.emit("scrollbarDragStart", e)
            },
            onDragMove: function(e) {
                var t = this.scrollbar,
                    i = this.$wrapperEl,
                    s = t.$el,
                    a = t.$dragEl;
                this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, t.setDragPosition(e), i.transition(0), s.transition(0), a.transition(0), this.emit("scrollbarDragMove", e))
            },
            onDragEnd: function(e) {
                var t = this.params.scrollbar,
                    i = this.scrollbar.$el;
                this.scrollbar.isTouched && (this.scrollbar.isTouched = !1, t.hide && (clearTimeout(this.scrollbar.dragTimeout), this.scrollbar.dragTimeout = l.nextTick(function() { i.css("opacity", 0), i.transition(400) }, 1e3)), this.emit("scrollbarDragEnd", e), t.snapOnRelease && this.slideToClosest())
            },
            enableDraggable: function() {
                if (this.params.scrollbar.el) {
                    var t = this.scrollbar,
                        i = this.touchEventsTouch,
                        s = this.touchEventsDesktop,
                        a = this.params,
                        r = t.$el[0],
                        n = !(!d.passiveListener || !a.passiveListeners) && { passive: !1, capture: !1 },
                        o = !(!d.passiveListener || !a.passiveListeners) && { passive: !0, capture: !1 };
                    d.touch ? (r.addEventListener(i.start, this.scrollbar.onDragStart, n), r.addEventListener(i.move, this.scrollbar.onDragMove, n), r.addEventListener(i.end, this.scrollbar.onDragEnd, o)) : (r.addEventListener(s.start, this.scrollbar.onDragStart, n), e.addEventListener(s.move, this.scrollbar.onDragMove, n), e.addEventListener(s.end, this.scrollbar.onDragEnd, o))
                }
            },
            disableDraggable: function() {
                if (this.params.scrollbar.el) {
                    var t = this.scrollbar,
                        i = this.touchEventsTouch,
                        s = this.touchEventsDesktop,
                        a = this.params,
                        r = t.$el[0],
                        n = !(!d.passiveListener || !a.passiveListeners) && { passive: !1, capture: !1 },
                        o = !(!d.passiveListener || !a.passiveListeners) && { passive: !0, capture: !1 };
                    d.touch ? (r.removeEventListener(i.start, this.scrollbar.onDragStart, n), r.removeEventListener(i.move, this.scrollbar.onDragMove, n), r.removeEventListener(i.end, this.scrollbar.onDragEnd, o)) : (r.removeEventListener(s.start, this.scrollbar.onDragStart, n), e.removeEventListener(s.move, this.scrollbar.onDragMove, n), e.removeEventListener(s.end, this.scrollbar.onDragEnd, o))
                }
            },
            init: function() {
                if (this.params.scrollbar.el) {
                    var e = this.scrollbar,
                        t = this.$el,
                        i = this.params.scrollbar,
                        a = s(i.el);
                    this.params.uniqueNavElements && "string" == typeof i.el && a.length > 1 && 1 === t.find(i.el).length && (a = t.find(i.el));
                    var r = a.find("." + this.params.scrollbar.dragClass);
                    0 === r.length && (r = s('<div class="' + this.params.scrollbar.dragClass + '"></div>'), a.append(r)), l.extend(e, { $el: a, el: a[0], $dragEl: r, dragEl: r[0] }), i.draggable && e.enableDraggable()
                }
            },
            destroy: function() { this.scrollbar.disableDraggable() }
        },
        X = {
            setTransform: function(e, t) {
                var i = this.rtl,
                    a = s(e),
                    r = i ? -1 : 1,
                    n = a.attr("data-swiper-parallax") || "0",
                    o = a.attr("data-swiper-parallax-x"),
                    l = a.attr("data-swiper-parallax-y"),
                    d = a.attr("data-swiper-parallax-scale"),
                    h = a.attr("data-swiper-parallax-opacity");
                if (o || l ? (o = o || "0", l = l || "0") : this.isHorizontal() ? (o = n, l = "0") : (l = n, o = "0"), o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t * r + "%" : o * t * r + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px", null != h) {
                    var p = h - (h - 1) * (1 - Math.abs(t));
                    a[0].style.opacity = p
                }
                if (null == d) a.transform("translate3d(" + o + ", " + l + ", 0px)");
                else {
                    var c = d - (d - 1) * (1 - Math.abs(t));
                    a.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + c + ")")
                }
            },
            setTranslate: function() {
                var e = this,
                    t = e.$el,
                    i = e.slides,
                    a = e.progress,
                    r = e.snapGrid;
                t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(t, i) { e.parallax.setTransform(i, a) }), i.each(function(t, i) {
                    var n = i.progress;
                    e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (n += Math.ceil(t / 2) - a * (r.length - 1)), n = Math.min(Math.max(n, -1), 1), s(i).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(t, i) { e.parallax.setTransform(i, n) })
                })
            },
            setTransition: function(e) {
                void 0 === e && (e = this.params.speed);
                this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(t, i) {
                    var a = s(i),
                        r = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (r = 0), a.transition(r)
                })
            }
        },
        V = {
            getDistanceBetweenTouches: function(e) {
                if (e.targetTouches.length < 2) return 1;
                var t = e.targetTouches[0].pageX,
                    i = e.targetTouches[0].pageY,
                    s = e.targetTouches[1].pageX,
                    a = e.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2))
            },
            onGestureStart: function(e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    a = i.gesture;
                if (i.fakeGestureTouched = !1, i.fakeGestureMoved = !1, !d.gestures) {
                    if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
                    i.fakeGestureTouched = !0, a.scaleStart = V.getDistanceBetweenTouches(e)
                }
                a.$slideEl && a.$slideEl.length || (a.$slideEl = s(e.target).closest(".swiper-slide"), 0 === a.$slideEl.length && (a.$slideEl = this.slides.eq(this.activeIndex)), a.$imageEl = a.$slideEl.find("img, svg, canvas"), a.$imageWrapEl = a.$imageEl.parent("." + t.containerClass), a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio, 0 !== a.$imageWrapEl.length) ? (a.$imageEl.transition(0), this.zoom.isScaling = !0) : a.$imageEl = void 0
            },
            onGestureChange: function(e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    s = i.gesture;
                if (!d.gestures) {
                    if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
                    i.fakeGestureMoved = !0, s.scaleMove = V.getDistanceBetweenTouches(e)
                }
                s.$imageEl && 0 !== s.$imageEl.length && (d.gestures ? i.scale = e.scale * i.currentScale : i.scale = s.scaleMove / s.scaleStart * i.currentScale, i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, .5)), i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, .5)), s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"))
            },
            onGestureEnd: function(e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    s = i.gesture;
                if (!d.gestures) {
                    if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
                    if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !y.android) return;
                    i.fakeGestureTouched = !1, i.fakeGestureMoved = !1
                }
                s.$imageEl && 0 !== s.$imageEl.length && (i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio), s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"), i.currentScale = i.scale, i.isScaling = !1, 1 === i.scale && (s.$slideEl = void 0))
            },
            onTouchStart: function(e) {
                var t = this.zoom,
                    i = t.gesture,
                    s = t.image;
                i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (y.android && e.preventDefault(), s.isTouched = !0, s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
            },
            onTouchMove: function(e) {
                var t = this.zoom,
                    i = t.gesture,
                    s = t.image,
                    a = t.velocity;
                if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1, s.isTouched && i.$slideEl)) {
                    s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = l.getTranslate(i.$imageWrapEl[0], "x") || 0, s.startY = l.getTranslate(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), this.rtl && (s.startX = -s.startX, s.startY = -s.startY));
                    var r = s.width * t.scale,
                        n = s.height * t.scale;
                    if (!(r < i.slideWidth && n < i.slideHeight)) {
                        if (s.minX = Math.min(i.slideWidth / 2 - r / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - n / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !t.isScaling) { if (this.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void(s.isTouched = !1); if (!this.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void(s.isTouched = !1) }
                        e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x), a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y), a.prevTime || (a.prevTime = Date.now()), a.x = (s.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2, a.y = (s.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2, Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0), Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0), a.prevPositionX = s.touchesCurrent.x, a.prevPositionY = s.touchesCurrent.y, a.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                    }
                }
            },
            onTouchEnd: function() {
                var e = this.zoom,
                    t = e.gesture,
                    i = e.image,
                    s = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!i.isTouched || !i.isMoved) return i.isTouched = !1, void(i.isMoved = !1);
                    i.isTouched = !1, i.isMoved = !1;
                    var a = 300,
                        r = 300,
                        n = s.x * a,
                        o = i.currentX + n,
                        l = s.y * r,
                        d = i.currentY + l;
                    0 !== s.x && (a = Math.abs((o - i.currentX) / s.x)), 0 !== s.y && (r = Math.abs((d - i.currentY) / s.y));
                    var h = Math.max(a, r);
                    i.currentX = o, i.currentY = d;
                    var p = i.width * e.scale,
                        c = i.height * e.scale;
                    i.minX = Math.min(t.slideWidth / 2 - p / 2, 0), i.maxX = -i.minX, i.minY = Math.min(t.slideHeight / 2 - c / 2, 0), i.maxY = -i.minY, i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX), i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY), t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
                }
            },
            onTransitionEnd: function() {
                var e = this.zoom,
                    t = e.gesture;
                t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), e.scale = 1, e.currentScale = 1, t.$slideEl = void 0, t.$imageEl = void 0, t.$imageWrapEl = void 0)
            },
            toggle: function(e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e)
            },
            in: function(e) {
                var t, i, a, r, n, o, l, d, h, p, c, u, v, f, m, g, b = this.zoom,
                    w = this.params.zoom,
                    y = b.gesture,
                    x = b.image;
                (y.$slideEl || (y.$slideEl = this.clickedSlide ? s(this.clickedSlide) : this.slides.eq(this.activeIndex), y.$imageEl = y.$slideEl.find("img, svg, canvas"), y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)), y.$imageEl && 0 !== y.$imageEl.length) && (y.$slideEl.addClass("" + w.zoomedSlideClass), void 0 === x.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = x.touchesStart.x, i = x.touchesStart.y), b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, e ? (m = y.$slideEl[0].offsetWidth, g = y.$slideEl[0].offsetHeight, a = y.$slideEl.offset().left + m / 2 - t, r = y.$slideEl.offset().top + g / 2 - i, l = y.$imageEl[0].offsetWidth, d = y.$imageEl[0].offsetHeight, h = l * b.scale, p = d * b.scale, v = -(c = Math.min(m / 2 - h / 2, 0)), f = -(u = Math.min(g / 2 - p / 2, 0)), (n = a * b.scale) < c && (n = c), n > v && (n = v), (o = r * b.scale) < u && (o = u), o > f && (o = f)) : (n = 0, o = 0), y.$imageWrapEl.transition(300).transform("translate3d(" + n + "px, " + o + "px,0)"), y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"))
            },
            out: function() {
                var e = this.zoom,
                    t = this.params.zoom,
                    i = e.gesture;
                i.$slideEl || (i.$slideEl = this.clickedSlide ? s(this.clickedSlide) : this.slides.eq(this.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas"), i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (e.scale = 1, e.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + t.zoomedSlideClass), i.$slideEl = void 0)
            },
            enable: function() {
                var e = this.zoom;
                if (!e.enabled) {
                    e.enabled = !0;
                    var t = !("touchstart" !== this.touchEvents.start || !d.passiveListener || !this.params.passiveListeners) && { passive: !0, capture: !1 };
                    d.gestures ? (this.$wrapperEl.on("gesturestart", ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.on("gesturechange", ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.on("gestureend", ".swiper-slide", e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.on(this.touchEvents.move, ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.on(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t)), this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove)
                }
            },
            disable: function() {
                var e = this.zoom;
                if (e.enabled) {
                    this.zoom.enabled = !1;
                    var t = !("touchstart" !== this.touchEvents.start || !d.passiveListener || !this.params.passiveListeners) && { passive: !0, capture: !1 };
                    d.gestures ? (this.$wrapperEl.off("gesturestart", ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.off("gesturechange", ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.off("gestureend", ".swiper-slide", e.onGestureEnd, t)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.off(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t), this.$wrapperEl.off(this.touchEvents.move, ".swiper-slide", e.onGestureChange, t), this.$wrapperEl.off(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t)), this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove)
                }
            }
        },
        Y = {
            loadInSlide: function(e, t) {
                void 0 === t && (t = !0);
                var i = this,
                    a = i.params.lazy;
                if (void 0 !== e && 0 !== i.slides.length) {
                    var r = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e),
                        n = r.find("." + a.elementClass + ":not(." + a.loadedClass + "):not(." + a.loadingClass + ")");
                    !r.hasClass(a.elementClass) || r.hasClass(a.loadedClass) || r.hasClass(a.loadingClass) || (n = n.add(r[0])), 0 !== n.length && n.each(function(e, n) {
                        var o = s(n);
                        o.addClass(a.loadingClass);
                        var l = o.attr("data-background"),
                            d = o.attr("data-src"),
                            h = o.attr("data-srcset"),
                            p = o.attr("data-sizes");
                        i.loadImage(o[0], d || l, h, p, !1, function() {
                            if (null != i && i && (!i || i.params) && !i.destroyed) {
                                if (l ? (o.css("background-image", 'url("' + l + '")'), o.removeAttr("data-background")) : (h && (o.attr("srcset", h), o.removeAttr("data-srcset")), p && (o.attr("sizes", p), o.removeAttr("data-sizes")), d && (o.attr("src", d), o.removeAttr("data-src"))), o.addClass(a.loadedClass).removeClass(a.loadingClass), r.find("." + a.preloaderClass).remove(), i.params.loop && t) {
                                    var e = r.attr("data-swiper-slide-index");
                                    if (r.hasClass(i.params.slideDuplicateClass)) {
                                        var s = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                                        i.lazy.loadInSlide(s.index(), !1)
                                    } else {
                                        var n = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                        i.lazy.loadInSlide(n.index(), !1)
                                    }
                                }
                                i.emit("lazyImageReady", r[0], o[0])
                            }
                        }), i.emit("lazyImageLoad", r[0], o[0])
                    })
                }
            },
            load: function() {
                var e = this,
                    t = e.$wrapperEl,
                    i = e.params,
                    a = e.slides,
                    r = e.activeIndex,
                    n = e.virtual && i.virtual.enabled,
                    o = i.lazy,
                    l = i.slidesPerView;

                function d(e) { if (n) { if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0 } else if (a[e]) return !0; return !1 }

                function h(e) { return n ? s(e).attr("data-swiper-slide-index") : s(e).index() }
                if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + i.slideVisibleClass).each(function(t, i) {
                    var a = n ? s(i).attr("data-swiper-slide-index") : s(i).index();
                    e.lazy.loadInSlide(a)
                });
                else if (l > 1)
                    for (var p = r; p < r + l; p += 1) d(p) && e.lazy.loadInSlide(p);
                else e.lazy.loadInSlide(r);
                if (o.loadPrevNext)
                    if (l > 1 || o.loadPrevNextAmount && o.loadPrevNextAmount > 1) { for (var c = o.loadPrevNextAmount, u = l, v = Math.min(r + u + Math.max(c, u), a.length), f = Math.max(r - Math.max(u, c), 0), m = r + l; m < v; m += 1) d(m) && e.lazy.loadInSlide(m); for (var g = f; g < r; g += 1) d(g) && e.lazy.loadInSlide(g) } else {
                        var b = t.children("." + i.slideNextClass);
                        b.length > 0 && e.lazy.loadInSlide(h(b));
                        var w = t.children("." + i.slidePrevClass);
                        w.length > 0 && e.lazy.loadInSlide(h(w))
                    }
            }
        },
        F = {
            LinearSpline: function(e, t) { var i, s, a, r, n, o = function(e, t) { for (s = -1, i = e.length; i - s > 1;) e[a = i + s >> 1] <= t ? s = a : i = a; return i }; return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) { return e ? (n = o(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0 }, this },
            getInterpolateFunction: function(e) { this.controller.spline || (this.controller.spline = this.params.loop ? new F.LinearSpline(this.slidesGrid, e.slidesGrid) : new F.LinearSpline(this.snapGrid, e.snapGrid)) },
            setTranslate: function(e, t) {
                var i, s, a = this,
                    r = a.controller.control;

                function n(e) { var t = a.rtlTranslate ? -a.translate : a.translate; "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e), s = -a.controller.spline.interpolate(-t)), s && "container" !== a.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate()), s = (t - a.minTranslate()) * i + e.minTranslate()), a.params.controller.inverse && (s = e.maxTranslate() - s), e.updateProgress(s), e.setTranslate(s, a), e.updateActiveIndex(), e.updateSlidesClasses() }
                if (Array.isArray(r))
                    for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof C && n(r[o]);
                else r instanceof C && t !== r && n(r)
            },
            setTransition: function(e, t) {
                var i, s = this,
                    a = s.controller.control;

                function r(t) { t.setTransition(e, s), 0 !== e && (t.transitionStart(), t.params.autoHeight && l.nextTick(function() { t.updateAutoHeight() }), t.$wrapperEl.transitionEnd(function() { a && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(), t.transitionEnd()) })) }
                if (Array.isArray(a))
                    for (i = 0; i < a.length; i += 1) a[i] !== t && a[i] instanceof C && r(a[i]);
                else a instanceof C && t !== a && r(a)
            }
        },
        R = {
            makeElFocusable: function(e) { return e.attr("tabIndex", "0"), e },
            addElRole: function(e, t) { return e.attr("role", t), e },
            addElLabel: function(e, t) { return e.attr("aria-label", t), e },
            disableEl: function(e) { return e.attr("aria-disabled", !0), e },
            enableEl: function(e) { return e.attr("aria-disabled", !1), e },
            onEnterKey: function(e) {
                var t = this.params.a11y;
                if (13 === e.keyCode) {
                    var i = s(e.target);
                    this.navigation && this.navigation.$nextEl && i.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(), this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)), this.navigation && this.navigation.$prevEl && i.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(), this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)), this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click()
                }
            },
            notify: function(e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e))
            },
            updateNavigation: function() {
                if (!this.params.loop) {
                    var e = this.navigation,
                        t = e.$nextEl,
                        i = e.$prevEl;
                    i && i.length > 0 && (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)), t && t.length > 0 && (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t))
                }
            },
            updatePagination: function() {
                var e = this,
                    t = e.params.a11y;
                e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each(function(i, a) {
                    var r = s(a);
                    e.a11y.makeElFocusable(r), e.a11y.addElRole(r, "button"), e.a11y.addElLabel(r, t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1))
                })
            },
            init: function() {
                this.$el.append(this.a11y.liveRegion);
                var e, t, i = this.params.a11y;
                this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.nextSlideMessage), e.on("keydown", this.a11y.onEnterKey)), t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.prevSlideMessage), t.on("keydown", this.a11y.onEnterKey)), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
            },
            destroy: function() {
                var e, t;
                this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(), this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl), this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl), e && e.off("keydown", this.a11y.onEnterKey), t && t.off("keydown", this.a11y.onEnterKey), this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
            }
        },
        q = {
            init: function() {
                if (this.params.history) {
                    if (!t.history || !t.history.pushState) return this.params.history.enabled = !1, void(this.params.hashNavigation.enabled = !0);
                    var e = this.history;
                    e.initialized = !0, e.paths = q.getPathValues(), (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || t.addEventListener("popstate", this.history.setHistoryPopState))
                }
            },
            destroy: function() { this.params.history.replaceState || t.removeEventListener("popstate", this.history.setHistoryPopState) },
            setHistoryPopState: function() { this.history.paths = q.getPathValues(), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1) },
            getPathValues: function() {
                var e = t.location.pathname.slice(1).split("/").filter(function(e) { return "" !== e }),
                    i = e.length;
                return { key: e[i - 2], value: e[i - 1] }
            },
            setHistory: function(e, i) {
                if (this.history.initialized && this.params.history.enabled) {
                    var s = this.slides.eq(i),
                        a = q.slugify(s.attr("data-history"));
                    t.location.pathname.includes(e) || (a = e + "/" + a);
                    var r = t.history.state;
                    r && r.value === a || (this.params.history.replaceState ? t.history.replaceState({ value: a }, null, a) : t.history.pushState({ value: a }, null, a))
                }
            },
            slugify: function(e) { return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "") },
            scrollToSlide: function(e, t, i) {
                if (t)
                    for (var s = 0, a = this.slides.length; s < a; s += 1) {
                        var r = this.slides.eq(s);
                        if (q.slugify(r.attr("data-history")) === t && !r.hasClass(this.params.slideDuplicateClass)) {
                            var n = r.index();
                            this.slideTo(n, e, i)
                        }
                    } else this.slideTo(0, e, i)
            }
        },
        W = {
            onHashCange: function() {
                var t = e.location.hash.replace("#", "");
                if (t !== this.slides.eq(this.activeIndex).attr("data-hash")) {
                    var i = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index();
                    if (void 0 === i) return;
                    this.slideTo(i)
                }
            },
            setHash: function() {
                if (this.hashNavigation.initialized && this.params.hashNavigation.enabled)
                    if (this.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || "");
                    else {
                        var i = this.slides.eq(this.activeIndex),
                            s = i.attr("data-hash") || i.attr("data-history");
                        e.location.hash = s || ""
                    }
            },
            init: function() {
                if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) {
                    this.hashNavigation.initialized = !0;
                    var i = e.location.hash.replace("#", "");
                    if (i)
                        for (var a = 0, r = this.slides.length; a < r; a += 1) {
                            var n = this.slides.eq(a);
                            if ((n.attr("data-hash") || n.attr("data-history")) === i && !n.hasClass(this.params.slideDuplicateClass)) {
                                var o = n.index();
                                this.slideTo(o, 0, this.params.runCallbacksOnInit, !0)
                            }
                        }
                    this.params.hashNavigation.watchState && s(t).on("hashchange", this.hashNavigation.onHashCange)
                }
            },
            destroy: function() { this.params.hashNavigation.watchState && s(t).off("hashchange", this.hashNavigation.onHashCange) }
        },
        j = {
            run: function() {
                var e = this,
                    t = e.slides.eq(e.activeIndex),
                    i = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(e.autoplay.timeout), e.autoplay.timeout = l.nextTick(function() { e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) }, i)
            },
            start: function() { return void 0 === this.autoplay.timeout && (!this.autoplay.running && (this.autoplay.running = !0, this.emit("autoplayStart"), this.autoplay.run(), !0)) },
            stop: function() { return !!this.autoplay.running && (void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), this.autoplay.timeout = void 0), this.autoplay.running = !1, this.emit("autoplayStop"), !0)) },
            pause: function(e) { this.autoplay.running && (this.autoplay.paused || (this.autoplay.timeout && clearTimeout(this.autoplay.timeout), this.autoplay.paused = !0, 0 !== e && this.params.autoplay.waitForTransition ? (this.$wrapperEl[0].addEventListener("transitionend", this.autoplay.onTransitionEnd), this.$wrapperEl[0].addEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd)) : (this.autoplay.paused = !1, this.autoplay.run()))) }
        },
        U = {
            setTranslate: function() {
                for (var e = this.slides, t = 0; t < e.length; t += 1) {
                    var i = this.slides.eq(t),
                        s = -i[0].swiperSlideOffset;
                    this.params.virtualTranslate || (s -= this.translate);
                    var a = 0;
                    this.isHorizontal() || (a = s, s = 0);
                    var r = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                    i.css({ opacity: r }).transform("translate3d(" + s + "px, " + a + "px, 0px)")
                }
            },
            setTransition: function(e) {
                var t = this,
                    i = t.slides,
                    s = t.$wrapperEl;
                if (i.transition(e), t.params.virtualTranslate && 0 !== e) {
                    var a = !1;
                    i.transitionEnd(function() { if (!a && t && !t.destroyed) { a = !0, t.animating = !1; for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) s.trigger(e[i]) } })
                }
            }
        },
        K = {
            setTranslate: function() {
                var e, t = this.$el,
                    i = this.$wrapperEl,
                    a = this.slides,
                    r = this.width,
                    n = this.height,
                    o = this.rtlTranslate,
                    l = this.size,
                    d = this.params.cubeEffect,
                    p = this.isHorizontal(),
                    c = this.virtual && this.params.virtual.enabled,
                    u = 0;
                d.shadow && (p ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({ height: r + "px" })) : 0 === (e = t.find(".swiper-cube-shadow")).length && (e = s('<div class="swiper-cube-shadow"></div>'), t.append(e)));
                for (var v = 0; v < a.length; v += 1) {
                    var f = a.eq(v),
                        m = v;
                    c && (m = parseInt(f.attr("data-swiper-slide-index"), 10));
                    var g = 90 * m,
                        b = Math.floor(g / 360);
                    o && (g = -g, b = Math.floor(-g / 360));
                    var w = Math.max(Math.min(f[0].progress, 1), -1),
                        y = 0,
                        x = 0,
                        T = 0;
                    m % 4 == 0 ? (y = 4 * -b * l, T = 0) : (m - 1) % 4 == 0 ? (y = 0, T = 4 * -b * l) : (m - 2) % 4 == 0 ? (y = l + 4 * b * l, T = l) : (m - 3) % 4 == 0 && (y = -l, T = 3 * l + 4 * l * b), o && (y = -y), p || (x = y, y = 0);
                    var E = "rotateX(" + (p ? 0 : -g) + "deg) rotateY(" + (p ? g : 0) + "deg) translate3d(" + y + "px, " + x + "px, " + T + "px)";
                    if (w <= 1 && w > -1 && (u = 90 * m + 90 * w, o && (u = 90 * -m - 90 * w)), f.transform(E), d.slideShadows) {
                        var S = p ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
                            C = p ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                        0 === S.length && (S = s('<div class="swiper-slide-shadow-' + (p ? "left" : "top") + '"></div>'), f.append(S)), 0 === C.length && (C = s('<div class="swiper-slide-shadow-' + (p ? "right" : "bottom") + '"></div>'), f.append(C)), S.length && (S[0].style.opacity = Math.max(-w, 0)), C.length && (C[0].style.opacity = Math.max(w, 0))
                    }
                }
                if (i.css({ "-webkit-transform-origin": "50% 50% -" + l / 2 + "px", "-moz-transform-origin": "50% 50% -" + l / 2 + "px", "-ms-transform-origin": "50% 50% -" + l / 2 + "px", "transform-origin": "50% 50% -" + l / 2 + "px" }), d.shadow)
                    if (p) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                    else {
                        var M = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90),
                            P = 1.5 - (Math.sin(2 * M * Math.PI / 360) / 2 + Math.cos(2 * M * Math.PI / 360) / 2),
                            k = d.shadowScale,
                            z = d.shadowScale / P,
                            $ = d.shadowOffset;
                        e.transform("scale3d(" + k + ", 1, " + z + ") translate3d(0px, " + (n / 2 + $) + "px, " + -n / 2 / z + "px) rotateX(-90deg)")
                    }
                var I = h.isSafari || h.isUiWebView ? -l / 2 : 0;
                i.transform("translate3d(0px,0," + I + "px) rotateX(" + (this.isHorizontal() ? 0 : u) + "deg) rotateY(" + (this.isHorizontal() ? -u : 0) + "deg)")
            },
            setTransition: function(e) {
                var t = this.$el;
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
            }
        },
        _ = {
            setTranslate: function() {
                for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
                    var a = e.eq(i),
                        r = a[0].progress;
                    this.params.flipEffect.limitRotation && (r = Math.max(Math.min(a[0].progress, 1), -1));
                    var n = -180 * r,
                        o = 0,
                        l = -a[0].swiperSlideOffset,
                        d = 0;
                    if (this.isHorizontal() ? t && (n = -n) : (d = l, l = 0, o = -n, n = 0), a[0].style.zIndex = -Math.abs(Math.round(r)) + e.length, this.params.flipEffect.slideShadows) {
                        var h = this.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top"),
                            p = this.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
                        0 === h.length && (h = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'), a.append(h)), 0 === p.length && (p = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'), a.append(p)), h.length && (h[0].style.opacity = Math.max(-r, 0)), p.length && (p[0].style.opacity = Math.max(r, 0))
                    }
                    a.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)")
                }
            },
            setTransition: function(e) {
                var t = this,
                    i = t.slides,
                    s = t.activeIndex,
                    a = t.$wrapperEl;
                if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
                    var r = !1;
                    i.eq(s).transitionEnd(function() { if (!r && t && !t.destroyed) { r = !0, t.animating = !1; for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) a.trigger(e[i]) } })
                }
            }
        },
        Z = {
            setTranslate: function() {
                for (var e = this.width, t = this.height, i = this.slides, a = this.$wrapperEl, r = this.slidesSizesGrid, n = this.params.coverflowEffect, o = this.isHorizontal(), l = this.translate, h = o ? e / 2 - l : t / 2 - l, p = o ? n.rotate : -n.rotate, c = n.depth, u = 0, v = i.length; u < v; u += 1) {
                    var f = i.eq(u),
                        m = r[u],
                        g = (h - f[0].swiperSlideOffset - m / 2) / m * n.modifier,
                        b = o ? p * g : 0,
                        w = o ? 0 : p * g,
                        y = -c * Math.abs(g),
                        x = o ? 0 : n.stretch * g,
                        T = o ? n.stretch * g : 0;
                    Math.abs(T) < .001 && (T = 0), Math.abs(x) < .001 && (x = 0), Math.abs(y) < .001 && (y = 0), Math.abs(b) < .001 && (b = 0), Math.abs(w) < .001 && (w = 0);
                    var E = "translate3d(" + T + "px," + x + "px," + y + "px)  rotateX(" + w + "deg) rotateY(" + b + "deg)";
                    if (f.transform(E), f[0].style.zIndex = 1 - Math.abs(Math.round(g)), n.slideShadows) {
                        var S = o ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
                            C = o ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                        0 === S.length && (S = s('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>'), f.append(S)), 0 === C.length && (C = s('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>'), f.append(C)), S.length && (S[0].style.opacity = g > 0 ? g : 0), C.length && (C[0].style.opacity = -g > 0 ? -g : 0)
                    }
                }(d.pointerEvents || d.prefixedPointerEvents) && (a[0].style.perspectiveOrigin = h + "px 50%")
            },
            setTransition: function(e) { this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e) }
        },
        Q = {
            init: function() {
                var e = this.params.thumbs,
                    t = this.constructor;
                e.swiper instanceof t ? (this.thumbs.swiper = e.swiper, l.extend(this.thumbs.swiper.originalParams, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), l.extend(this.thumbs.swiper.params, { watchSlidesProgress: !0, slideToClickedSlide: !1 })) : l.isObject(e.swiper) && (this.thumbs.swiper = new t(l.extend({}, e.swiper, { watchSlidesVisibility: !0, watchSlidesProgress: !0, slideToClickedSlide: !1 })), this.thumbs.swiperCreated = !0), this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass), this.thumbs.swiper.on("tap", this.thumbs.onThumbClick)
            },
            onThumbClick: function() {
                var e = this.thumbs.swiper;
                if (e) {
                    var t = e.clickedIndex,
                        i = e.clickedSlide;
                    if (!(i && s(i).hasClass(this.params.thumbs.slideThumbActiveClass) || null == t)) {
                        var a;
                        if (a = e.params.loop ? parseInt(s(e.clickedSlide).attr("data-swiper-slide-index"), 10) : t, this.params.loop) {
                            var r = this.activeIndex;
                            this.slides.eq(r).hasClass(this.params.slideDuplicateClass) && (this.loopFix(), this._clientLeft = this.$wrapperEl[0].clientLeft, r = this.activeIndex);
                            var n = this.slides.eq(r).prevAll('[data-swiper-slide-index="' + a + '"]').eq(0).index(),
                                o = this.slides.eq(r).nextAll('[data-swiper-slide-index="' + a + '"]').eq(0).index();
                            a = void 0 === n ? o : void 0 === o ? n : o - r < r - n ? o : n
                        }
                        this.slideTo(a)
                    }
                }
            },
            update: function(e) {
                var t = this.thumbs.swiper;
                if (t) {
                    var i = "auto" === t.params.slidesPerView ? t.slidesPerViewDynamic() : t.params.slidesPerView;
                    if (this.realIndex !== t.realIndex) {
                        var s, a = t.activeIndex;
                        if (t.params.loop) {
                            t.slides.eq(a).hasClass(t.params.slideDuplicateClass) && (t.loopFix(), t._clientLeft = t.$wrapperEl[0].clientLeft, a = t.activeIndex);
                            var r = t.slides.eq(a).prevAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index(),
                                n = t.slides.eq(a).nextAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index();
                            s = void 0 === r ? n : void 0 === n ? r : n - a == a - r ? a : n - a < a - r ? n : r
                        } else s = this.realIndex;
                        t.visibleSlidesIndexes && t.visibleSlidesIndexes.indexOf(s) < 0 && (t.params.centeredSlides ? s = s > a ? s - Math.floor(i / 2) + 1 : s + Math.floor(i / 2) - 1 : s > a && (s = s - i + 1), t.slideTo(s, e ? 0 : void 0))
                    }
                    var o = 1,
                        l = this.params.thumbs.slideThumbActiveClass;
                    if (this.params.slidesPerView > 1 && !this.params.centeredSlides && (o = this.params.slidesPerView), t.slides.removeClass(l), t.params.loop || t.params.virtual)
                        for (var d = 0; d < o; d += 1) t.$wrapperEl.children('[data-swiper-slide-index="' + (this.realIndex + d) + '"]').addClass(l);
                    else
                        for (var h = 0; h < o; h += 1) t.slides.eq(this.realIndex + h).addClass(l)
                }
            }
        },
        J = [M, P, k, z, I, D, A, { name: "mousewheel", params: { mousewheel: { enabled: !1, releaseOnEdges: !1, invert: !1, forceToAxis: !1, sensitivity: 1, eventsTarged: "container" } }, create: function() { l.extend(this, { mousewheel: { enabled: !1, enable: H.enable.bind(this), disable: H.disable.bind(this), handle: H.handle.bind(this), handleMouseEnter: H.handleMouseEnter.bind(this), handleMouseLeave: H.handleMouseLeave.bind(this), lastScrollTime: l.now() } }) }, on: { init: function() { this.params.mousewheel.enabled && this.mousewheel.enable() }, destroy: function() { this.mousewheel.enabled && this.mousewheel.disable() } } }, {
            name: "navigation",
            params: { navigation: { nextEl: null, prevEl: null, hideOnClick: !1, disabledClass: "swiper-button-disabled", hiddenClass: "swiper-button-hidden", lockClass: "swiper-button-lock" } },
            create: function() { l.extend(this, { navigation: { init: G.init.bind(this), update: G.update.bind(this), destroy: G.destroy.bind(this), onNextClick: G.onNextClick.bind(this), onPrevClick: G.onPrevClick.bind(this) } }) },
            on: {
                init: function() { this.navigation.init(), this.navigation.update() },
                toEdge: function() { this.navigation.update() },
                fromEdge: function() { this.navigation.update() },
                destroy: function() { this.navigation.destroy() },
                click: function(e) {
                    var t, i = this.navigation,
                        a = i.$nextEl,
                        r = i.$prevEl;
                    !this.params.navigation.hideOnClick || s(e.target).is(r) || s(e.target).is(a) || (a ? t = a.hasClass(this.params.navigation.hiddenClass) : r && (t = r.hasClass(this.params.navigation.hiddenClass)), !0 === t ? this.emit("navigationShow", this) : this.emit("navigationHide", this), a && a.toggleClass(this.params.navigation.hiddenClass), r && r.toggleClass(this.params.navigation.hiddenClass))
                }
            }
        }, { name: "pagination", params: { pagination: { el: null, bulletElement: "span", clickable: !1, hideOnClick: !1, renderBullet: null, renderProgressbar: null, renderFraction: null, renderCustom: null, progressbarOpposite: !1, type: "bullets", dynamicBullets: !1, dynamicMainBullets: 1, formatFractionCurrent: function(e) { return e }, formatFractionTotal: function(e) { return e }, bulletClass: "swiper-pagination-bullet", bulletActiveClass: "swiper-pagination-bullet-active", modifierClass: "swiper-pagination-", currentClass: "swiper-pagination-current", totalClass: "swiper-pagination-total", hiddenClass: "swiper-pagination-hidden", progressbarFillClass: "swiper-pagination-progressbar-fill", progressbarOppositeClass: "swiper-pagination-progressbar-opposite", clickableClass: "swiper-pagination-clickable", lockClass: "swiper-pagination-lock" } }, create: function() { l.extend(this, { pagination: { init: N.init.bind(this), render: N.render.bind(this), update: N.update.bind(this), destroy: N.destroy.bind(this), dynamicBulletIndex: 0 } }) }, on: { init: function() { this.pagination.init(), this.pagination.render(), this.pagination.update() }, activeIndexChange: function() { this.params.loop ? this.pagination.update() : void 0 === this.snapIndex && this.pagination.update() }, snapIndexChange: function() { this.params.loop || this.pagination.update() }, slidesLengthChange: function() { this.params.loop && (this.pagination.render(), this.pagination.update()) }, snapGridLengthChange: function() { this.params.loop || (this.pagination.render(), this.pagination.update()) }, destroy: function() { this.pagination.destroy() }, click: function(e) { this.params.pagination.el && this.params.pagination.hideOnClick && this.pagination.$el.length > 0 && !s(e.target).hasClass(this.params.pagination.bulletClass) && (!0 === this.pagination.$el.hasClass(this.params.pagination.hiddenClass) ? this.emit("paginationShow", this) : this.emit("paginationHide", this), this.pagination.$el.toggleClass(this.params.pagination.hiddenClass)) } } }, { name: "scrollbar", params: { scrollbar: { el: null, dragSize: "auto", hide: !1, draggable: !1, snapOnRelease: !0, lockClass: "swiper-scrollbar-lock", dragClass: "swiper-scrollbar-drag" } }, create: function() { l.extend(this, { scrollbar: { init: B.init.bind(this), destroy: B.destroy.bind(this), updateSize: B.updateSize.bind(this), setTranslate: B.setTranslate.bind(this), setTransition: B.setTransition.bind(this), enableDraggable: B.enableDraggable.bind(this), disableDraggable: B.disableDraggable.bind(this), setDragPosition: B.setDragPosition.bind(this), getPointerPosition: B.getPointerPosition.bind(this), onDragStart: B.onDragStart.bind(this), onDragMove: B.onDragMove.bind(this), onDragEnd: B.onDragEnd.bind(this), isTouched: !1, timeout: null, dragTimeout: null } }) }, on: { init: function() { this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate() }, update: function() { this.scrollbar.updateSize() }, resize: function() { this.scrollbar.updateSize() }, observerUpdate: function() { this.scrollbar.updateSize() }, setTranslate: function() { this.scrollbar.setTranslate() }, setTransition: function(e) { this.scrollbar.setTransition(e) }, destroy: function() { this.scrollbar.destroy() } } }, { name: "parallax", params: { parallax: { enabled: !1 } }, create: function() { l.extend(this, { parallax: { setTransform: X.setTransform.bind(this), setTranslate: X.setTranslate.bind(this), setTransition: X.setTransition.bind(this) } }) }, on: { beforeInit: function() { this.params.parallax.enabled && (this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0) }, init: function() { this.params.parallax.enabled && this.parallax.setTranslate() }, setTranslate: function() { this.params.parallax.enabled && this.parallax.setTranslate() }, setTransition: function(e) { this.params.parallax.enabled && this.parallax.setTransition(e) } } }, {
            name: "zoom",
            params: { zoom: { enabled: !1, maxRatio: 3, minRatio: 1, toggle: !0, containerClass: "swiper-zoom-container", zoomedSlideClass: "swiper-slide-zoomed" } },
            create: function() {
                var e = this,
                    t = { enabled: !1, scale: 1, currentScale: 1, isScaling: !1, gesture: { $slideEl: void 0, slideWidth: void 0, slideHeight: void 0, $imageEl: void 0, $imageWrapEl: void 0, maxRatio: 3 }, image: { isTouched: void 0, isMoved: void 0, currentX: void 0, currentY: void 0, minX: void 0, minY: void 0, maxX: void 0, maxY: void 0, width: void 0, height: void 0, startX: void 0, startY: void 0, touchesStart: {}, touchesCurrent: {} }, velocity: { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 } };
                "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function(i) { t[i] = V[i].bind(e) }), l.extend(e, { zoom: t });
                var i = 1;
                Object.defineProperty(e.zoom, "scale", {
                    get: function() { return i },
                    set: function(t) {
                        if (i !== t) {
                            var s = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0,
                                a = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
                            e.emit("zoomChange", t, s, a)
                        }
                        i = t
                    }
                })
            },
            on: { init: function() { this.params.zoom.enabled && this.zoom.enable() }, destroy: function() { this.zoom.disable() }, touchStart: function(e) { this.zoom.enabled && this.zoom.onTouchStart(e) }, touchEnd: function(e) { this.zoom.enabled && this.zoom.onTouchEnd(e) }, doubleTap: function(e) { this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e) }, transitionEnd: function() { this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd() } }
        }, { name: "lazy", params: { lazy: { enabled: !1, loadPrevNext: !1, loadPrevNextAmount: 1, loadOnTransitionStart: !1, elementClass: "swiper-lazy", loadingClass: "swiper-lazy-loading", loadedClass: "swiper-lazy-loaded", preloaderClass: "swiper-lazy-preloader" } }, create: function() { l.extend(this, { lazy: { initialImageLoaded: !1, load: Y.load.bind(this), loadInSlide: Y.loadInSlide.bind(this) } }) }, on: { beforeInit: function() { this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1) }, init: function() { this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load() }, scroll: function() { this.params.freeMode && !this.params.freeModeSticky && this.lazy.load() }, resize: function() { this.params.lazy.enabled && this.lazy.load() }, scrollbarDragMove: function() { this.params.lazy.enabled && this.lazy.load() }, transitionStart: function() { this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || !this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded) && this.lazy.load() }, transitionEnd: function() { this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load() } } }, { name: "controller", params: { controller: { control: void 0, inverse: !1, by: "slide" } }, create: function() { l.extend(this, { controller: { control: this.params.controller.control, getInterpolateFunction: F.getInterpolateFunction.bind(this), setTranslate: F.setTranslate.bind(this), setTransition: F.setTransition.bind(this) } }) }, on: { update: function() { this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline) }, resize: function() { this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline) }, observerUpdate: function() { this.controller.control && this.controller.spline && (this.controller.spline = void 0, delete this.controller.spline) }, setTranslate: function(e, t) { this.controller.control && this.controller.setTranslate(e, t) }, setTransition: function(e, t) { this.controller.control && this.controller.setTransition(e, t) } } }, {
            name: "a11y",
            params: { a11y: { enabled: !0, notificationClass: "swiper-notification", prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}" } },
            create: function() {
                var e = this;
                l.extend(e, { a11y: { liveRegion: s('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>') } }), Object.keys(R).forEach(function(t) { e.a11y[t] = R[t].bind(e) })
            },
            on: { init: function() { this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation()) }, toEdge: function() { this.params.a11y.enabled && this.a11y.updateNavigation() }, fromEdge: function() { this.params.a11y.enabled && this.a11y.updateNavigation() }, paginationUpdate: function() { this.params.a11y.enabled && this.a11y.updatePagination() }, destroy: function() { this.params.a11y.enabled && this.a11y.destroy() } }
        }, { name: "history", params: { history: { enabled: !1, replaceState: !1, key: "slides" } }, create: function() { l.extend(this, { history: { init: q.init.bind(this), setHistory: q.setHistory.bind(this), setHistoryPopState: q.setHistoryPopState.bind(this), scrollToSlide: q.scrollToSlide.bind(this), destroy: q.destroy.bind(this) } }) }, on: { init: function() { this.params.history.enabled && this.history.init() }, destroy: function() { this.params.history.enabled && this.history.destroy() }, transitionEnd: function() { this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex) } } }, { name: "hash-navigation", params: { hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 } }, create: function() { l.extend(this, { hashNavigation: { initialized: !1, init: W.init.bind(this), destroy: W.destroy.bind(this), setHash: W.setHash.bind(this), onHashCange: W.onHashCange.bind(this) } }) }, on: { init: function() { this.params.hashNavigation.enabled && this.hashNavigation.init() }, destroy: function() { this.params.hashNavigation.enabled && this.hashNavigation.destroy() }, transitionEnd: function() { this.hashNavigation.initialized && this.hashNavigation.setHash() } } }, {
            name: "autoplay",
            params: { autoplay: { enabled: !1, delay: 3e3, waitForTransition: !0, disableOnInteraction: !0, stopOnLastSlide: !1, reverseDirection: !1 } },
            create: function() {
                var e = this;
                l.extend(e, { autoplay: { running: !1, paused: !1, run: j.run.bind(e), start: j.start.bind(e), stop: j.stop.bind(e), pause: j.pause.bind(e), onTransitionEnd: function(t) { e && !e.destroyed && e.$wrapperEl && t.target === this && (e.$wrapperEl[0].removeEventListener("transitionend", e.autoplay.onTransitionEnd), e.$wrapperEl[0].removeEventListener("webkitTransitionEnd", e.autoplay.onTransitionEnd), e.autoplay.paused = !1, e.autoplay.running ? e.autoplay.run() : e.autoplay.stop()) } } })
            },
            on: { init: function() { this.params.autoplay.enabled && this.autoplay.start() }, beforeTransitionStart: function(e, t) { this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop()) }, sliderFirstMove: function() { this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause()) }, destroy: function() { this.autoplay.running && this.autoplay.stop() } }
        }, {
            name: "effect-fade",
            params: { fadeEffect: { crossFade: !1 } },
            create: function() { l.extend(this, { fadeEffect: { setTranslate: U.setTranslate.bind(this), setTransition: U.setTransition.bind(this) } }) },
            on: {
                beforeInit: function() {
                    if ("fade" === this.params.effect) {
                        this.classNames.push(this.params.containerModifierClass + "fade");
                        var e = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !0 };
                        l.extend(this.params, e), l.extend(this.originalParams, e)
                    }
                },
                setTranslate: function() { "fade" === this.params.effect && this.fadeEffect.setTranslate() },
                setTransition: function(e) { "fade" === this.params.effect && this.fadeEffect.setTransition(e) }
            }
        }, {
            name: "effect-cube",
            params: { cubeEffect: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: .94 } },
            create: function() { l.extend(this, { cubeEffect: { setTranslate: K.setTranslate.bind(this), setTransition: K.setTransition.bind(this) } }) },
            on: {
                beforeInit: function() {
                    if ("cube" === this.params.effect) {
                        this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d");
                        var e = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, resistanceRatio: 0, spaceBetween: 0, centeredSlides: !1, virtualTranslate: !0 };
                        l.extend(this.params, e), l.extend(this.originalParams, e)
                    }
                },
                setTranslate: function() { "cube" === this.params.effect && this.cubeEffect.setTranslate() },
                setTransition: function(e) { "cube" === this.params.effect && this.cubeEffect.setTransition(e) }
            }
        }, {
            name: "effect-flip",
            params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
            create: function() { l.extend(this, { flipEffect: { setTranslate: _.setTranslate.bind(this), setTransition: _.setTransition.bind(this) } }) },
            on: {
                beforeInit: function() {
                    if ("flip" === this.params.effect) {
                        this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d");
                        var e = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !0 };
                        l.extend(this.params, e), l.extend(this.originalParams, e)
                    }
                },
                setTranslate: function() { "flip" === this.params.effect && this.flipEffect.setTranslate() },
                setTransition: function(e) { "flip" === this.params.effect && this.flipEffect.setTransition(e) }
            }
        }, { name: "effect-coverflow", params: { coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 } }, create: function() { l.extend(this, { coverflowEffect: { setTranslate: Z.setTranslate.bind(this), setTransition: Z.setTransition.bind(this) } }) }, on: { beforeInit: function() { "coverflow" === this.params.effect && (this.classNames.push(this.params.containerModifierClass + "coverflow"), this.classNames.push(this.params.containerModifierClass + "3d"), this.params.watchSlidesProgress = !0, this.originalParams.watchSlidesProgress = !0) }, setTranslate: function() { "coverflow" === this.params.effect && this.coverflowEffect.setTranslate() }, setTransition: function(e) { "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e) } } }, {
            name: "thumbs",
            params: { thumbs: { swiper: null, slideThumbActiveClass: "swiper-slide-thumb-active", thumbsContainerClass: "swiper-container-thumbs" } },
            create: function() { l.extend(this, { thumbs: { swiper: null, init: Q.init.bind(this), update: Q.update.bind(this), onThumbClick: Q.onThumbClick.bind(this) } }) },
            on: {
                beforeInit: function() {
                    var e = this.params.thumbs;
                    e && e.swiper && (this.thumbs.init(), this.thumbs.update(!0))
                },
                slideChange: function() { this.thumbs.swiper && this.thumbs.update() },
                update: function() { this.thumbs.swiper && this.thumbs.update() },
                resize: function() { this.thumbs.swiper && this.thumbs.update() },
                observerUpdate: function() { this.thumbs.swiper && this.thumbs.update() },
                setTransition: function(e) {
                    var t = this.thumbs.swiper;
                    t && t.setTransition(e)
                },
                beforeDestroy: function() {
                    var e = this.thumbs.swiper;
                    e && this.thumbs.swiperCreated && e && e.destroy()
                }
            }
        }];
    return void 0 === C.use && (C.use = C.Class.use, C.installModule = C.Class.installModule), C.use(J), C
});

// jquery.slicknav.min.js
/*!
    SlickNav Responsive Mobile Menu v1.0.2
    (c) 2015 Josh Cope
    licensed under MIT
*/
! function(n, e) {
    function t(e, t) { this.element = e, this.settings = n.extend({}, a, t), this._defaults = a, this._name = i, this.init() }
    var a = { label: "MENU", duplicate: !0, duration: 200, easingOpen: "swing", easingClose: "swing", closedSymbol: "&#9658;", openedSymbol: "&#9660;", prependTo: "body", parentTag: "a", closeOnClick: !1, allowParentLinks: !1, nestedParentLinks: !0, showChildren: !1, brand: "", init: function() {}, open: function() {}, close: function() {} },
        i = "slicknav",
        s = "slicknav";
    t.prototype.init = function() {
        var t, a, i = this,
            l = n(this.element),
            o = this.settings;
        if (o.duplicate ? (i.mobileNav = l.clone(), i.mobileNav.removeAttr("id"), i.mobileNav.find("*").each(function(e, t) { n(t).removeAttr("id") })) : i.mobileNav = l, t = s + "_icon", "" === o.label && (t += " " + s + "_no-text"), "a" == o.parentTag && (o.parentTag = 'a href="#"'), i.mobileNav.attr("class", s + "_nav"), a = n('<div class="' + s + '_menu"></div>'), "" !== o.brand) {
            var r = n('<div class="' + s + '_brand">' + o.brand + "</div>");
            n(a).append(r)
        }
        i.btn = n(["<" + o.parentTag + ' aria-haspopup="true" tabindex="0" class="' + s + "_btn " + s + '_collapsed">', '<span class="' + s + '_menutxt">' + o.label + "</span>", '<span class="' + t + '">', '<span class="' + s + '_icon-bar"></span>', '<span class="' + s + '_icon-bar"></span>', '<span class="' + s + '_icon-bar"></span>', "</span>", "</" + o.parentTag + ">"].join("")), n(a).append(i.btn), n(o.prependTo).prepend(a), a.append(i.mobileNav);
        var d = i.mobileNav.find("li");
        n(d).each(function() {
            var e = n(this),
                t = {};
            if (t.children = e.children("ul").attr("role", "menu"), e.data("menu", t), t.children.length > 0) {
                var a = e.contents(),
                    l = !1;
                nodes = [], n(a).each(function() { return n(this).is("ul") ? !1 : (nodes.push(this), void(n(this).is("a") && (l = !0))) });
                var r = n("<" + o.parentTag + ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' + s + '_item"/>');
                if (o.allowParentLinks && !o.nestedParentLinks && l) n(nodes).wrapAll('<span class="' + s + "_parent-link " + s + '_row"/>').parent();
                else {
                    var d = n(nodes).wrapAll(r).parent();
                    d.addClass(s + "_row")
                }
                e.addClass(s + "_collapsed"), e.addClass(s + "_parent");
                var c = n('<span class="' + s + '_arrow">' + o.closedSymbol + "</span>");
                o.allowParentLinks && !o.nestedParentLinks && l && (c = c.wrap(r).parent()), n(nodes).last().after(c)
            } else 0 === e.children().length && e.addClass(s + "_txtnode");
            e.children("a").attr("role", "menuitem").click(function(e) { o.closeOnClick && !n(e.target).parent().closest("li").hasClass(s + "_parent") && n(i.btn).click() }), o.closeOnClick && o.allowParentLinks && (e.children("a").children("a").click(function() { n(i.btn).click() }), e.find("." + s + "_parent-link a:not(." + s + "_item)").click(function() { n(i.btn).click() }))
        }), n(d).each(function() {
            var e = n(this).data("menu");
            o.showChildren || i._visibilityToggle(e.children, null, !1, null, !0)
        }), i._visibilityToggle(i.mobileNav, null, !1, "init", !0), i.mobileNav.attr("role", "menu"), n(e).mousedown(function() { i._outlines(!1) }), n(e).keyup(function() { i._outlines(!0) }), n(i.btn).click(function(n) { n.preventDefault(), i._menuToggle() }), i.mobileNav.on("click", "." + s + "_item", function(e) { e.preventDefault(), i._itemClick(n(this)) }), n(i.btn).keydown(function(n) {
            var e = n || event;
            13 == e.keyCode && (n.preventDefault(), i._menuToggle())
        }), i.mobileNav.on("keydown", "." + s + "_item", function(e) {
            var t = e || event;
            13 == t.keyCode && (e.preventDefault(), i._itemClick(n(e.target)))
        }), o.allowParentLinks && o.nestedParentLinks && n("." + s + "_item a").click(function(n) { n.stopImmediatePropagation() })
    }, t.prototype._menuToggle = function() {
        var n = this,
            e = n.btn,
            t = n.mobileNav;
        e.hasClass(s + "_collapsed") ? (e.removeClass(s + "_collapsed"), e.addClass(s + "_open")) : (e.removeClass(s + "_open"), e.addClass(s + "_collapsed")), e.addClass(s + "_animating"), n._visibilityToggle(t, e.parent(), !0, e)
    }, t.prototype._itemClick = function(n) {
        var e = this,
            t = e.settings,
            a = n.data("menu");
        a || (a = {}, a.arrow = n.children("." + s + "_arrow"), a.ul = n.next("ul"), a.parent = n.parent(), a.parent.hasClass(s + "_parent-link") && (a.parent = n.parent().parent(), a.ul = n.parent().next("ul")), n.data("menu", a)), a.parent.hasClass(s + "_collapsed") ? (a.arrow.html(t.openedSymbol), a.parent.removeClass(s + "_collapsed"), a.parent.addClass(s + "_open"), a.parent.addClass(s + "_animating"), e._visibilityToggle(a.ul, a.parent, !0, n)) : (a.arrow.html(t.closedSymbol), a.parent.addClass(s + "_collapsed"), a.parent.removeClass(s + "_open"), a.parent.addClass(s + "_animating"), e._visibilityToggle(a.ul, a.parent, !0, n))
    }, t.prototype._visibilityToggle = function(e, t, a, i, l) {
        var o = this,
            r = o.settings,
            d = o._getActionItems(e),
            c = 0;
        a && (c = r.duration), e.hasClass(s + "_hidden") ? (e.removeClass(s + "_hidden"), e.slideDown(c, r.easingOpen, function() { n(i).removeClass(s + "_animating"), n(t).removeClass(s + "_animating"), l || r.open(i) }), e.attr("aria-hidden", "false"), d.attr("tabindex", "0"), o._setVisAttr(e, !1)) : (e.addClass(s + "_hidden"), e.slideUp(c, this.settings.easingClose, function() { e.attr("aria-hidden", "true"), d.attr("tabindex", "-1"), o._setVisAttr(e, !0), e.hide(), n(i).removeClass(s + "_animating"), n(t).removeClass(s + "_animating"), l ? "init" == i && r.init() : r.close(i) }))
    }, t.prototype._setVisAttr = function(e, t) {
        var a = this,
            i = e.children("li").children("ul").not("." + s + "_hidden");
        i.each(t ? function() {
            var e = n(this);
            e.attr("aria-hidden", "true");
            var i = a._getActionItems(e);
            i.attr("tabindex", "-1"), a._setVisAttr(e, t)
        } : function() {
            var e = n(this);
            e.attr("aria-hidden", "false");
            var i = a._getActionItems(e);
            i.attr("tabindex", "0"), a._setVisAttr(e, t)
        })
    }, t.prototype._getActionItems = function(n) {
        var e = n.data("menu");
        if (!e) {
            e = {};
            var t = n.children("li"),
                a = t.find("a");
            e.links = a.add(t.find("." + s + "_item")), n.data("menu", e)
        }
        return e.links
    }, t.prototype._outlines = function(e) { e ? n("." + s + "_item, ." + s + "_btn").css("outline", "") : n("." + s + "_item, ." + s + "_btn").css("outline", "none") }, t.prototype.toggle = function() {
        var n = this;
        n._menuToggle()
    }, t.prototype.open = function() {
        var n = this;
        n.btn.hasClass(s + "_collapsed") && n._menuToggle()
    }, t.prototype.close = function() {
        var n = this;
        n.btn.hasClass(s + "_open") && n._menuToggle()
    }, n.fn[i] = function(e) {
        var a = arguments;
        if (void 0 === e || "object" == typeof e) return this.each(function() { n.data(this, "plugin_" + i) || n.data(this, "plugin_" + i, new t(this, e)) });
        if ("string" == typeof e && "_" !== e[0] && "init" !== e) {
            var s;
            return this.each(function() {
                var l = n.data(this, "plugin_" + i);
                l instanceof t && "function" == typeof l[e] && (s = l[e].apply(l, Array.prototype.slice.call(a, 1)))
            }), void 0 !== s ? s : this
        }
    }
}(jQuery, document, window);

/*  jQuery Nice Select - v1.0
    https://github.com/hernansartorio/jquery-nice-select
    Made by HernÃ¡n Sartorio  */
! function(e) {
    e.fn.niceSelect = function(t) {
        function s(t) {
            t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>'));
            var s = t.next(),
                n = t.find("option"),
                i = t.find("option:selected");
            s.find(".current").html(i.data("display") || i.text()), n.each(function(t) {
                var n = e(this),
                    i = n.data("display");
                s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text()))
            })
        }
        if ("string" == typeof t) return "update" == t ? this.each(function() {
            var t = e(this),
                n = e(this).next(".nice-select"),
                i = n.hasClass("open");
            n.length && (n.remove(), s(t), i && t.next().trigger("click"))
        }) : "destroy" == t ? (this.each(function() {
            var t = e(this),
                s = e(this).next(".nice-select");
            s.length && (s.remove(), t.css("display", ""))
        }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this;
        this.hide(), this.each(function() {
            var t = e(this);
            t.next().hasClass("nice-select") || s(t)
        }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function(t) {
            var s = e(this);
            e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus()
        }), e(document).on("click.nice_select", function(t) { 0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option") }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function(t) {
            var s = e(this),
                n = s.closest(".nice-select");
            n.find(".selected").removeClass("selected"), s.addClass("selected");
            var i = s.data("display") || s.text();
            n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change")
        }), e(document).on("keydown.nice_select", ".nice-select", function(t) {
            var s = e(this),
                n = e(s.find(".focus") || s.find(".list .option.selected"));
            if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1;
            if (40 == t.keyCode) {
                if (s.hasClass("open")) {
                    var i = n.nextAll(".option:not(.disabled)").first();
                    i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus"))
                } else s.trigger("click");
                return !1
            }
            if (38 == t.keyCode) {
                if (s.hasClass("open")) {
                    var l = n.prevAll(".option:not(.disabled)").first();
                    l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus"))
                } else s.trigger("click");
                return !1
            }
            if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
            else if (9 == t.keyCode && s.hasClass("open")) return !1
        });
        var n = document.createElement("a").style;
        return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this
    }
}(jQuery);

// Image Grid
! function(i) {
    function t(t) {
        this.opts = t || {}, this.$window = i(window), this.$element = this.opts.element, this.$gridItems = [], this.modal = null, this.imageLoadCount = 0;
        var e = this.opts.cells;
        this.opts.cells = e < 1 ? 1 : e > 6 ? 6 : e, this.onWindowResize = this.onWindowResize.bind(this), this.onImageClick = this.onImageClick.bind(this), this.init()
    }

    function e(t) { this.opts = t || {}, this.imageIndex = null, this.$document = i(document), this.$modal = null, this.$indicator = null, this.close = this.close.bind(this), this.prev = this.prev.bind(this), this.next = this.next.bind(this), this.onIndicatorClick = this.onIndicatorClick.bind(this), this.onImageLoaded = this.onImageLoaded.bind(this), this.onKeyUp = this.onKeyUp.bind(this), this.$document.on("keyup", this.onKeyUp) }
    i.fn.imagesGrid = function(e) {
        var o = arguments;
        return this.each(function() {
            if (i.isPlainObject(e)) { this._imgGrid instanceof t && (this._imgGrid.destroy(), delete this._imgGrid); var n = i.extend({}, i.fn.imagesGrid.defaults, e); return n.element = i(this), void(this._imgGrid = new t(n)) }
            if ("string" == typeof e && this._imgGrid instanceof t) switch (e) {
                case "modal.open":
                    this._imgGrid.modal.open(o[1]);
                    break;
                case "modal.close":
                    this._imgGrid.modal.close();
                    break;
                case "destroy":
                    this._imgGrid.destroy(), delete this._imgGrid
            }
        })
    }, i.fn.imagesGrid.defaults = { images: [], cells: 5, align: !1, nextOnClick: !0, showViewAll: "more", viewAllStartIndex: "auto", getViewAllText: function(i) { return "View all " + i + " images" }, onGridRendered: i.noop, onGridItemRendered: i.noop, onGridLoaded: i.noop, onGridImageLoaded: i.noop, onModalOpen: i.noop, onModalClose: i.noop, onModalImageClick: i.noop, onModalImageUpdate: i.noop }, t.prototype.init = function() { this.setGridClass(), this.renderGridItems(), this.createModal(), this.$window.on("resize", this.onWindowResize) }, t.prototype.createModal = function() {
        var i = this.opts;
        this.modal = new e({ images: i.images, nextOnClick: i.nextOnClick, onModalOpen: i.onModalOpen, onModalClose: i.onModalClose, onModalImageClick: i.onModalImageClick, onModalImageUpdate: i.onModalImageUpdate })
    }, t.prototype.setGridClass = function() {
        var i = this.opts,
            t = i.images.length,
            e = t < i.cells ? t : i.cells;
        this.$element.addClass("imgs-grid imgs-grid-" + e)
    }, t.prototype.renderGridItems = function() {
        var i = this.opts,
            t = i.images,
            e = t.length;
        if (t) {
            this.$element.empty(), this.$gridItems = [];
            for (var o = 0; o < e && o !== i.cells; ++o) this.renderGridItem(t[o], o);
            ("always" === i.showViewAll || "more" === i.showViewAll && e > i.cells) && this.renderViewAll(), i.onGridRendered(this.$element)
        }
    }, t.prototype.renderGridItem = function(t, e) {
        var o = t,
            n = "",
            s = "",
            a = this.opts,
            d = this;
        i.isPlainObject(t) && (o = t.thumbnail || t.src, n = t.alt || "", s = t.title || "");
        var l = i("<div>", { class: "imgs-grid-image", click: this.onImageClick, data: { index: e } });
        l.append(i("<div>", { class: "image-wrap" }).append(i("<img>", { src: o, alt: n, title: s, on: { load: function(e) { d.onImageLoaded(e, i(this), t) } } }))), this.$gridItems.push(l), this.$element.append(l), a.onGridItemRendered(l, t)
    }, t.prototype.renderViewAll = function() {
        var t = this.opts;
        this.$element.find(".imgs-grid-image:last .image-wrap").append(i("<div>", { class: "view-all" }).append(i("<span>", { class: "view-all-cover" }), i("<span>", { class: "view-all-text", text: t.getViewAllText(t.images.length) })))
    }, t.prototype.onWindowResize = function(i) { this.opts.align && this.align() }, t.prototype.onImageClick = function(t) {
        var e, o = this.opts,
            n = i(t.currentTarget);
        e = n.find(".view-all").length > 0 && "number" == typeof o.viewAllStartIndex ? o.viewAllStartIndex : n.data("index"), this.modal.open(e)
    }, t.prototype.onImageLoaded = function(i, t, e) { var o = this.opts;++this.imageLoadCount, o.onGridImageLoaded(i, t, e), this.imageLoadCount === this.$gridItems.length && (this.imageLoadCount = 0, this.onAllImagesLoaded()) }, t.prototype.onAllImagesLoaded = function() {
        var i = this.opts;
        i.align && this.align(), i.onGridLoaded(this.$element)
    }, t.prototype.align = function() {
        switch (this.$gridItems.length) {
            case 2:
            case 3:
                this.alignItems(this.$gridItems);
                break;
            case 4:
                this.alignItems(this.$gridItems.slice(0, 2)), this.alignItems(this.$gridItems.slice(2));
                break;
            case 5:
            case 6:
                this.alignItems(this.$gridItems.slice(0, 3)), this.alignItems(this.$gridItems.slice(3))
        }
    }, t.prototype.alignItems = function(t) {
        var e = t.map(function(i) { return i.find("img").height() }),
            o = Math.min.apply(null, e);
        i(t).each(function() {
            var t = i(this),
                e = t.find(".image-wrap"),
                n = t.find("img"),
                s = n.height();
            if (e.height(o), s > o) {
                var a = Math.floor((s - o) / 2);
                n.css({ top: -a })
            }
        })
    }, t.prototype.destroy = function() { this.$window.off("resize", this.onWindowResize), this.$element.empty().removeClass("imgs-grid imgs-grid-" + this.$gridItems.length), this.modal.destroy() }, e.prototype.open = function(i) { this.isOpened() || (this.imageIndex = parseInt(i) || 0, this.render()) }, e.prototype.close = function(i) {
        if (this.$modal) {
            var t = this.opts;
            this.$modal.animate({ opacity: 0 }, { duration: 100, complete: function() { this.$modal.remove(), this.$modal = null, this.$indicator = null, this.imageIndex = null, t.onModalClose() }.bind(this) })
        }
    }, e.prototype.isOpened = function() { return this.$modal && this.$modal.is(":visible") }, e.prototype.render = function() {
        var i = this.opts;
        this.renderModal(), this.renderCaption(), this.renderCloseButton(), this.renderInnerContainer(), this.renderIndicatorContainer(), this.$modal.animate({ opacity: 1 }, { duration: 100, complete: function() { i.onModalOpen(this.$modal, i.images[this.imageIndex]) }.bind(this) })
    }, e.prototype.renderModal = function() { this.$modal = i("<div>", { class: "imgs-grid-modal" }).appendTo("body") }, e.prototype.renderCaption = function() { this.$caption = i("<div>", { class: "modal-caption", text: this.getImageCaption(this.imageIndex) }).appendTo(this.$modal) }, e.prototype.renderCloseButton = function() { this.$modal.append(i("<div>", { class: "modal-close", click: this.close })) }, e.prototype.renderInnerContainer = function() {
        var t = this.opts,
            e = this.getImage(this.imageIndex);
        this.$modal.append(i("<div>", { class: "modal-inner" }).append(i("<div>", { class: "modal-image" }).append(i("<img>", { src: e.src, alt: e.alt, title: e.title, on: { load: this.onImageLoaded, click: function(t) { this.onImageClick(t, i(this), e) }.bind(this) } }), i("<div>", { class: "modal-loader", text: "loading..." })), i("<div>", { class: "modal-control left", click: this.prev }).append(i("<div>", { class: "arrow left" })), i("<div>", { class: "modal-control right", click: this.next }).append(i("<div>", { class: "arrow right" })))), t.images.length <= 1 && this.$modal.find(".modal-control").hide()
    }, e.prototype.renderIndicatorContainer = function() {
        var t = this.opts.images.length;
        if (1 != t) {
            this.$indicator = i("<div>", { class: "modal-indicator" });
            var e, o = i("<ul>");
            for (e = 0; e < t; ++e) o.append(i("<li>", { class: this.imageIndex == e ? "selected" : "", click: this.onIndicatorClick, data: { index: e } }));
            this.$indicator.append(o), this.$modal.append(this.$indicator)
        }
    }, e.prototype.prev = function() {
        var i = this.opts.images.length;
        this.imageIndex > 0 ? --this.imageIndex : this.imageIndex = i - 1, this.updateImage()
    }, e.prototype.next = function() {
        var i = this.opts.images.length;
        this.imageIndex < i - 1 ? ++this.imageIndex : this.imageIndex = 0, this.updateImage()
    }, e.prototype.updateImage = function() {
        var i = this.opts,
            t = this.getImage(this.imageIndex),
            e = this.$modal.find(".modal-image img");
        if (e.attr({ src: t.src, alt: t.alt, title: t.title }), this.$modal.find(".modal-caption").text(this.getImageCaption(this.imageIndex)), this.$indicator) {
            var o = this.$indicator.find("ul");
            o.children().removeClass("selected"), o.children().eq(this.imageIndex).addClass("selected")
        }
        this.showLoader(), i.onModalImageUpdate(e, t)
    }, e.prototype.onImageClick = function(i, t, e) {
        var o = this.opts;
        o.nextOnClick && this.next(), o.onModalImageClick(i, t, e)
    }, e.prototype.onImageLoaded = function() { this.hideLoader() }, e.prototype.onIndicatorClick = function(t) {
        var e = i(t.target).data("index");
        this.imageIndex = e, this.updateImage()
    }, e.prototype.onKeyUp = function(i) {
        if (this.$modal) switch (i.keyCode) {
            case 27:
                this.close();
                break;
            case 37:
                this.prev();
                break;
            case 39:
                this.next()
        }
    }, e.prototype.getImage = function(t) { var e = this.opts.images[t]; return i.isPlainObject(e) ? e : { src: e, alt: "", title: "" } }, e.prototype.getImageCaption = function(i) { return this.getImage(i).caption || "" }, e.prototype.showLoader = function() { this.$modal && (this.$modal.find(".modal-image img").hide(), this.$modal.find(".modal-loader").show()) }, e.prototype.hideLoader = function() { this.$modal && (this.$modal.find(".modal-image img").show(), this.$modal.find(".modal-loader").hide()) }, e.prototype.destroy = function() { this.$document.off("keyup", this.onKeyUp), this.close() }
}(jQuery);


! function() {
    var s, i, c, a, o = { frameRate: 150, animationTime: 400, stepSize: 100, pulseAlgorithm: !0, pulseScale: 4, pulseNormalize: 1, accelerationDelta: 50, accelerationMax: 3, keyboardSupport: !0, arrowScroll: 50, fixedBackground: !0, excluded: "" },
        p = o,
        u = !1,
        d = !1,
        l = { x: 0, y: 0 },
        f = !1,
        m = document.documentElement,
        h = [],
        w = /^Mac/.test(navigator.platform),
        v = { left: 37, up: 38, right: 39, down: 40, spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36 },
        y = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function b() {
        if (!f && document.body) {
            f = !0;
            var e = document.body,
                t = document.documentElement,
                o = window.innerHeight,
                n = e.scrollHeight;
            if (m = 0 <= document.compatMode.indexOf("CSS") ? t : e, s = e, p.keyboardSupport && Y("keydown", D), top != self) d = !0;
            else if (Q && o < n && (e.offsetHeight <= o || t.offsetHeight <= o)) {
                var r, a = document.createElement("div");
                a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + m.scrollHeight + "px", document.body.appendChild(a), c = function() { r || (r = setTimeout(function() { u || (a.style.height = "0", a.style.height = m.scrollHeight + "px", r = null) }, 500)) }, setTimeout(c, 10), Y("resize", c);
                if ((i = new R(c)).observe(e, { attributes: !0, childList: !0, characterData: !1 }), m.offsetHeight <= o) {
                    var l = document.createElement("div");
                    l.style.clear = "both", e.appendChild(l)
                }
            }
            p.fixedBackground || u || (e.style.backgroundAttachment = "scroll", t.style.backgroundAttachment = "scroll")
        }
    }
    var g = [],
        S = !1,
        x = Date.now();

    function k(d, f, m) {
        var e, t;
        if (e = 0 < (e = f) ? 1 : -1, t = 0 < (t = m) ? 1 : -1, (l.x !== e || l.y !== t) && (l.x = e, l.y = t, g = [], x = 0), 1 != p.accelerationMax) {
            var o = Date.now() - x;
            if (o < p.accelerationDelta) {
                var n = (1 + 50 / o) / 2;
                1 < n && (n = Math.min(n, p.accelerationMax), f *= n, m *= n)
            }
            x = Date.now()
        }
        if (g.push({ x: f, y: m, lastX: f < 0 ? .99 : -.99, lastY: m < 0 ? .99 : -.99, start: Date.now() }), !S) {
            var r = q(),
                h = d === r || d === document.body;
            null == d.$scrollBehavior && function(e) {
                var t = M(e);
                if (null == B[t]) {
                    var o = getComputedStyle(e, "")["scroll-behavior"];
                    B[t] = "smooth" == o
                }
                return B[t]
            }(d) && (d.$scrollBehavior = d.style.scrollBehavior, d.style.scrollBehavior = "auto");
            var w = function(e) {
                for (var t = Date.now(), o = 0, n = 0, r = 0; r < g.length; r++) {
                    var a = g[r],
                        l = t - a.start,
                        i = l >= p.animationTime,
                        c = i ? 1 : l / p.animationTime;
                    p.pulseAlgorithm && (c = F(c));
                    var s = a.x * c - a.lastX >> 0,
                        u = a.y * c - a.lastY >> 0;
                    o += s, n += u, a.lastX += s, a.lastY += u, i && (g.splice(r, 1), r--)
                }
                h ? window.scrollBy(o, n) : (o && (d.scrollLeft += o), n && (d.scrollTop += n)), f || m || (g = []), g.length ? j(w, d, 1e3 / p.frameRate + 1) : (S = !1, null != d.$scrollBehavior && (d.style.scrollBehavior = d.$scrollBehavior, d.$scrollBehavior = null))
            };
            j(w, d, 0), S = !0
        }
    }

    function e(e) {
        f || b();
        var t = e.target;
        if (e.defaultPrevented || e.ctrlKey) return !0;
        if (N(s, "embed") || N(t, "embed") && /\.pdf/i.test(t.src) || N(s, "object") || t.shadowRoot) return !0;
        var o = -e.wheelDeltaX || e.deltaX || 0,
            n = -e.wheelDeltaY || e.deltaY || 0;
        w && (e.wheelDeltaX && K(e.wheelDeltaX, 120) && (o = e.wheelDeltaX / Math.abs(e.wheelDeltaX) * -120), e.wheelDeltaY && K(e.wheelDeltaY, 120) && (n = e.wheelDeltaY / Math.abs(e.wheelDeltaY) * -120)), o || n || (n = -e.wheelDelta || 0), 1 === e.deltaMode && (o *= 40, n *= 40);
        var r = z(t);
        return r ? !! function(e) {
            if (!e) return;
            h.length || (h = [e, e, e]);
            e = Math.abs(e), h.push(e), h.shift(), clearTimeout(a), a = setTimeout(function() { try { localStorage.SS_deltaBuffer = h.join(",") } catch (e) {} }, 1e3);
            var t = 120 < e && P(e);
            return !P(120) && !P(100) && !t
        }(n) || (1.2 < Math.abs(o) && (o *= p.stepSize / 120), 1.2 < Math.abs(n) && (n *= p.stepSize / 120), k(r, o, n), e.preventDefault(), void C()) : !d || !W || (Object.defineProperty(e, "target", { value: window.frameElement }), parent.wheel(e))
    }

    function D(e) {
        var t = e.target,
            o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== v.spacebar;
        document.body.contains(s) || (s = document.activeElement);
        var n = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (e.defaultPrevented || /^(textarea|select|embed|object)$/i.test(t.nodeName) || N(t, "input") && !n.test(t.type) || N(s, "video") || function(e) {
                var t = e.target,
                    o = !1;
                if (-1 != document.URL.indexOf("www.youtube.com/watch"))
                    do { if (o = t.classList && t.classList.contains("html5-video-controls")) break } while (t = t.parentNode);
                return o
            }(e) || t.isContentEditable || o) return !0;
        if ((N(t, "button") || N(t, "input") && n.test(t.type)) && e.keyCode === v.spacebar) return !0;
        if (N(t, "input") && "radio" == t.type && y[e.keyCode]) return !0;
        var r = 0,
            a = 0,
            l = z(s);
        if (!l) return !d || !W || parent.keydown(e);
        var i = l.clientHeight;
        switch (l == document.body && (i = window.innerHeight), e.keyCode) {
            case v.up:
                a = -p.arrowScroll;
                break;
            case v.down:
                a = p.arrowScroll;
                break;
            case v.spacebar:
                a = -(e.shiftKey ? 1 : -1) * i * .9;
                break;
            case v.pageup:
                a = .9 * -i;
                break;
            case v.pagedown:
                a = .9 * i;
                break;
            case v.home:
                l == document.body && document.scrollingElement && (l = document.scrollingElement), a = -l.scrollTop;
                break;
            case v.end:
                var c = l.scrollHeight - l.scrollTop - i;
                a = 0 < c ? c + 10 : 0;
                break;
            case v.left:
                r = -p.arrowScroll;
                break;
            case v.right:
                r = p.arrowScroll;
                break;
            default:
                return !0
        }
        k(l, r, a), e.preventDefault(), C()
    }

    function t(e) { s = e.target }
    var n, r, M = (n = 0, function(e) { return e.uniqueID || (e.uniqueID = n++) }),
        E = {},
        T = {},
        B = {};

    function C() { clearTimeout(r), r = setInterval(function() { E = T = B = {} }, 1e3) }

    function H(e, t, o) { for (var n = o ? E : T, r = e.length; r--;) n[M(e[r])] = t; return t }

    function z(e) {
        var t = [],
            o = document.body,
            n = m.scrollHeight;
        do { var r = (!1 ? E : T)[M(e)]; if (r) return H(t, r); if (t.push(e), n === e.scrollHeight) { var a = O(m) && O(o) || X(m); if (d && L(m) || !d && a) return H(t, q()) } else if (L(e) && X(e)) return H(t, e) } while (e = e.parentElement)
    }

    function L(e) { return e.clientHeight + 10 < e.scrollHeight }

    function O(e) { return "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y") }

    function X(e) { var t = getComputedStyle(e, "").getPropertyValue("overflow-y"); return "scroll" === t || "auto" === t }

    function Y(e, t, o) { window.addEventListener(e, t, o || !1) }

    function A(e, t, o) { window.removeEventListener(e, t, o || !1) }

    function N(e, t) { return e && (e.nodeName || "").toLowerCase() === t.toLowerCase() }
    if (window.localStorage && localStorage.SS_deltaBuffer) try { h = localStorage.SS_deltaBuffer.split(",") } catch (e) {}

    function K(e, t) { return Math.floor(e / t) == e / t }

    function P(e) { return K(h[0], e) && K(h[1], e) && K(h[2], e) }
    var $, j = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e, t, o) { window.setTimeout(e, o || 1e3 / 60) },
        R = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        q = ($ = document.scrollingElement, function() {
            if (!$) {
                var e = document.createElement("div");
                e.style.cssText = "height:10000px;width:1px;", document.body.appendChild(e);
                var t = document.body.scrollTop;
                document.documentElement.scrollTop, window.scrollBy(0, 3), $ = document.body.scrollTop != t ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e)
            }
            return $
        });

    function V(e) { var t; return ((e *= p.pulseScale) < 1 ? e - (1 - Math.exp(-e)) : (e -= 1, (t = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - t))) * p.pulseNormalize }

    function F(e) { return 1 <= e ? 1 : e <= 0 ? 0 : (1 == p.pulseNormalize && (p.pulseNormalize /= V(1)), V(e)) }
    var I = window.navigator.userAgent,
        _ = /Edge/.test(I),
        W = /chrome/i.test(I) && !_,
        U = /safari/i.test(I) && !_,
        G = /mobile/i.test(I),
        J = /Windows NT 6.1/i.test(I) && /rv:11/i.test(I),
        Q = U && (/Version\/8/i.test(I) || /Version\/9/i.test(I)),
        Z = (W || U || J) && !G,
        ee = !1;
    try { window.addEventListener("test", null, Object.defineProperty({}, "passive", { get: function() { ee = !0 } })) } catch (e) {}
    var te = !!ee && { passive: !1 },
        oe = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

    function ne(e) { for (var t in e) o.hasOwnProperty(t) && (p[t] = e[t]) }
    oe && Z && (Y(oe, e, te), Y("mousedown", t), Y("load", b)), ne.destroy = function() { i && i.disconnect(), A(oe, e), A("mousedown", t), A("keydown", D), A("resize", c), A("load", b) }, window.SmoothScrollOptions && ne(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function() { return ne }) : "object" == typeof exports ? module.exports = ne : window.SmoothScroll = ne
}();

/**
 * BootstrapValidator (http://bootstrapvalidator.com)
 *
 * The best jQuery plugin to validate form fields. Designed to use with Bootstrap 3
 *
 * @version     v0.5.0-dev
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     MIT
 */
! function(a) {
    var b = function(c, d) {
        this.$form = a(c), this.options = a.extend({}, b.DEFAULT_OPTIONS, d), this.$invalidFields = a([]), this.$submitButton = null, this.STATUS_NOT_VALIDATED = "NOT_VALIDATED", this.STATUS_VALIDATING = "VALIDATING", this.STATUS_INVALID = "INVALID", this.STATUS_VALID = "VALID";
        var e = function() { for (var a = 3, b = document.createElement("div"), c = b.all || []; b.innerHTML = "<!--[if gt IE " + ++a + "]><br><![endif]-->", c[0];); return a > 4 ? a : !a }(),
            f = document.createElement("div");
        this._changeEvent = 9 !== e && "oninput" in f ? "input" : "keyup", this._submitIfValid = null, this._cacheFields = {}, this._init()
    };
    b.DEFAULT_OPTIONS = { elementClass: "bv-form", message: "This value is not valid", container: null, threshold: null, excluded: [":disabled", ":hidden", ":not(:visible)"], feedbackIcons: { valid: null, invalid: null, validating: null }, submitButtons: '[type="submit"]', submitHandler: null, live: "enabled", fields: {} }, b.prototype = {
        constructor: b,
        _init: function() {
            var b = this,
                c = { excluded: this.$form.attr("data-bv-excluded"), trigger: this.$form.attr("data-bv-trigger"), message: this.$form.attr("data-bv-message"), container: this.$form.attr("data-bv-container"), submitButtons: this.$form.attr("data-bv-submitbuttons"), threshold: this.$form.attr("data-bv-threshold"), live: this.$form.attr("data-bv-live"), fields: {}, feedbackIcons: { valid: this.$form.attr("data-bv-feedbackicons-valid"), invalid: this.$form.attr("data-bv-feedbackicons-invalid"), validating: this.$form.attr("data-bv-feedbackicons-validating") } };
            this.$form.attr("novalidate", "novalidate").addClass(this.options.elementClass).on("submit.bv", function(a) { a.preventDefault(), b.validate() }).on("click.bv", this.options.submitButtons, function() { b.$submitButton = a(this), b._submitIfValid = !0 }).find("[name], [data-bv-field]").each(function() {
                var d = a(this);
                if (!b._isExcluded(d)) {
                    var e = d.attr("name") || d.attr("data-bv-field"),
                        f = b._parseOptions(d);
                    f && (d.attr("data-bv-field", e), c.fields[e] = a.extend({}, f, c.fields[e]))
                }
            }), this.options = a.extend(!0, this.options, c);
            for (var d in this.options.fields) this._initField(d);
            this.$form.trigger(a.Event("init.form.bv"), { options: this.options })
        },
        _parseOptions: function(b) {
            var c, d, e, f, g, h, i, j = b.attr("name") || b.attr("data-bv-field"),
                k = {};
            for (d in a.fn.bootstrapValidator.validators)
                if (c = a.fn.bootstrapValidator.validators[d], e = b.attr("data-bv-" + d.toLowerCase()) + "", i = "function" == typeof c.enableByHtml5 ? c.enableByHtml5(b) : null, i && "false" != e || i !== !0 && ("" == e || "true" == e)) { c.html5Attributes = c.html5Attributes || { message: "message" }, k[d] = a.extend({}, 1 == i ? {} : i, k[d]); for (h in c.html5Attributes) f = c.html5Attributes[h], g = b.attr("data-bv-" + d.toLowerCase() + "-" + h), g && ("true" == g ? g = !0 : "false" == g && (g = !1), k[d][f] = g) }
            var l = { feedbackIcons: b.attr("data-bv-feedbackicons"), trigger: b.attr("data-bv-trigger"), message: b.attr("data-bv-message"), container: b.attr("data-bv-container"), selector: b.attr("data-bv-selector"), threshold: b.attr("data-bv-threshold"), validators: k },
                m = a.isEmptyObject(l),
                n = a.isEmptyObject(k);
            return !n || !m && this.options.fields[j] ? (l.validators = k, l) : null
        },
        _initField: function(b) {
            var c = a([]);
            switch (typeof b) {
                case "object":
                    c = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    c = this.getFieldElements(b), c.attr("data-bv-field", b)
            }
            if (null != this.options.fields[b] && null != this.options.fields[b].validators) {
                if (0 == c.length) return void delete this.options.fields[b];
                for (var d in this.options.fields[b].validators) a.fn.bootstrapValidator.validators[d] || delete this.options.fields[b].validators[d];
                null == this.options.fields[b].enabled && (this.options.fields[b].enabled = !0);
                for (var e = this, f = c.length, g = c.attr("type"), h = 1 == f || "radio" == g || "checkbox" == g, i = 0; f > i; i++) {
                    var j = c.eq(i),
                        k = j.parents(".form-group"),
                        l = this.options.fields[b].container || this.options.container,
                        m = l && "tooltip" != l && "popover" != l ? a(l) : this._getMessageContainer(j);
                    l && "tooltip" != l && "popover" != l && m.addClass("has-error"), m.find('.help-block[data-bv-validator][data-bv-for="' + b + '"]').remove(), k.find('i[data-bv-icon-for="' + b + '"]').remove();
                    var n = "radio" == g || "checkbox" == g || "file" == g || "SELECT" == j.get(0).tagName ? "change" : this._changeEvent;
                    j.off(n + ".update.bv").on(n + ".update.bv", function() { e._submitIfValid = !1, e.updateStatus(a(this), e.STATUS_NOT_VALIDATED) }), j.data("bv.messages", m);
                    for (var d in this.options.fields[b].validators) j.data("bv.result." + d, this.STATUS_NOT_VALIDATED), h && i != f - 1 || a("<small/>").css("display", "none").addClass("help-block").attr("data-bv-validator", d).attr("data-bv-for", b).attr("data-bv-result", this.STATUS_NOT_VALIDATED).html(this.options.fields[b].validators[d].message || this.options.fields[b].message || this.options.message).appendTo(m);
                    if (this.options.fields[b].feedbackIcons !== !1 && "false" !== this.options.fields[b].feedbackIcons && this.options.feedbackIcons && this.options.feedbackIcons.validating && this.options.feedbackIcons.invalid && this.options.feedbackIcons.valid && (!h || i == f - 1)) {
                        k.removeClass("has-success").removeClass("has-error").addClass("has-feedback");
                        var o = a("<i/>").css("display", "none").addClass("form-control-feedback").attr("data-bv-icon-for", b).insertAfter("checkbox" == g || "radio" == g ? j.parent() : j);
                        0 == k.find("label").length && o.css("top", 0), 0 != k.find(".input-group-addon").length && o.css({ top: 0, "z-index": 100 })
                    }
                }
                var p = this.options.fields[b].trigger || this.options.trigger || n,
                    q = a.map(p.split(" "), function(a) { return a + ".live.bv" }).join(" ");
                switch (this.options.live) {
                    case "submitted":
                        break;
                    case "disabled":
                        c.off(q);
                        break;
                    case "enabled":
                    default:
                        c.off(q).on(q, function() { e._exceedThreshold(a(this)) && e.validateField(a(this)) })
                }
                this.$form.trigger(a.Event("init.field.bv"), { field: b, element: c })
            }
        },
        _getMessageContainer: function(a) {
            var b = a.parent();
            if (b.hasClass("form-group")) return b;
            var c = b.attr("class");
            if (!c) return this._getMessageContainer(b);
            c = c.split(" ");
            for (var d = c.length, e = 0; d > e; e++)
                if (/^col-(xs|sm|md|lg)-\d+$/.test(c[e]) || /^col-(xs|sm|md|lg)-offset-\d+$/.test(c[e])) return b;
            return this._getMessageContainer(b)
        },
        _submit: function() {
            var b = this.isValid(),
                c = b ? "success.form.bv" : "error.form.bv",
                d = a.Event(c);
            this.$form.trigger(d), this.$submitButton && (b ? this._onSuccess(d) : this._onError(d))
        },
        _isExcluded: function(b) {
            if (this.options.excluded) {
                "string" == typeof this.options.excluded && (this.options.excluded = a.map(this.options.excluded.split(","), function(b) { return a.trim(b) }));
                for (var c = this.options.excluded.length, d = 0; c > d; d++)
                    if ("string" == typeof this.options.excluded[d] && b.is(this.options.excluded[d]) || "function" == typeof this.options.excluded[d] && 1 == this.options.excluded[d].call(this, b, this)) return !0
            }
            return !1
        },
        _exceedThreshold: function(b) {
            var c = b.attr("data-bv-field"),
                d = this.options.fields[c].threshold || this.options.threshold;
            if (!d) return !0;
            var e = -1 != a.inArray(b.attr("type"), ["button", "checkbox", "file", "hidden", "image", "radio", "reset", "submit"]);
            return e || b.val().length >= d
        },
        _onError: function(b) {
            if (!b.isDefaultPrevented()) {
                if ("submitted" == this.options.live) {
                    this.options.live = "enabled";
                    var c = this;
                    for (var d in this.options.fields) ! function(b) {
                        var e = c.getFieldElements(b);
                        if (e.length) {
                            var f = a(e[0]).attr("type"),
                                g = "radio" == f || "checkbox" == f || "file" == f || "SELECT" == a(e[0]).get(0).tagName ? "change" : c._changeEvent,
                                h = c.options.fields[d].trigger || c.options.trigger || g,
                                i = a.map(h.split(" "), function(a) { return a + ".live.bv" }).join(" ");
                            e.off(i).on(i, function() { c._exceedThreshold(a(this)) && c.validateField(a(this)) })
                        }
                    }(d)
                }
                var e = this.$invalidFields.eq(0);
                if (e) {
                    var f, g = e.parents(".tab-pane");
                    g && (f = g.attr("id")) && a('a[href="#' + f + '"][data-toggle="tab"]').tab("show"), e.focus()
                }
            }
        },
        _onSuccess: function(a) { a.isDefaultPrevented() || (this.options.submitHandler && "function" == typeof this.options.submitHandler ? this.options.submitHandler.call(this, this, this.$form) : this.disableSubmitButtons(!0).defaultSubmit()) },
        _onFieldValidated: function(b, c) {
            var d = b.attr("data-bv-field"),
                e = this.options.fields[d].validators,
                f = {},
                g = 0;
            if (c) {
                var h = { field: d, element: b, validator: c };
                switch (b.data("bv.result." + c)) {
                    case this.STATUS_INVALID:
                        this.$form.trigger(a.Event("error.validator.bv"), h);
                        break;
                    case this.STATUS_VALID:
                        this.$form.trigger(a.Event("success.validator.bv"), h)
                }
            }
            f[this.STATUS_NOT_VALIDATED] = 0, f[this.STATUS_VALIDATING] = 0, f[this.STATUS_INVALID] = 0, f[this.STATUS_VALID] = 0;
            for (var i in e) {
                g++;
                var j = b.data("bv.result." + i);
                j && f[j]++
            }
            f[this.STATUS_VALID] == g ? (this.$invalidFields = this.$invalidFields.not(b), this.$form.trigger(a.Event("success.field.bv"), { field: d, element: b })) : 0 == f[this.STATUS_NOT_VALIDATED] && 0 == f[this.STATUS_VALIDATING] && f[this.STATUS_INVALID] > 0 && (this.$invalidFields = this.$invalidFields.add(b), this.$form.trigger(a.Event("error.field.bv"), { field: d, element: b }))
        },
        getFieldElements: function(b) { return this._cacheFields[b] || (this._cacheFields[b] = this.options.fields[b] && this.options.fields[b].selector ? a(this.options.fields[b].selector) : this.$form.find('[name="' + b + '"]')), this._cacheFields[b] },
        disableSubmitButtons: function(a) { return a ? "disabled" != this.options.live && this.$form.find(this.options.submitButtons).attr("disabled", "disabled") : this.$form.find(this.options.submitButtons).removeAttr("disabled"), this },
        validate: function() {
            if (!this.options.fields) return this;
            this.disableSubmitButtons(!0);
            for (var a in this.options.fields) this.validateField(a);
            return this._submit(), this
        },
        validateField: function(b) {
            var c, d = a([]);
            switch (typeof b) {
                case "object":
                    d = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    d = this.getFieldElements(b)
            }
            if (this.options.fields[b] && 0 == this.options.fields[b].enabled) return this;
            for (var e, f, g = this, c = d.attr("type"), h = "radio" == c || "checkbox" == c ? 1 : d.length, i = "radio" == c || "checkbox" == c, j = this.options.fields[b].validators, k = 0; h > k; k++) {
                var l = d.eq(k);
                if (!this._isExcluded(l))
                    for (e in j) {
                        l.data("bv.dfs." + e) && l.data("bv.dfs." + e).reject();
                        var m = l.data("bv.result." + e);
                        m != this.STATUS_VALID && m != this.STATUS_INVALID ? (l.data("bv.result." + e, this.STATUS_VALIDATING), f = a.fn.bootstrapValidator.validators[e].validate(this, l, j[e]), "object" == typeof f ? (this.updateStatus(i ? b : l, this.STATUS_VALIDATING, e), l.data("bv.dfs." + e, f), f.done(function(a, b, c, d) { a.removeData("bv.dfs." + b), d && l.data("bv.messages").find('.help-block[data-bv-validator="' + b + '"][data-bv-for="' + a.attr("data-bv-field") + '"]').html(d), g.updateStatus(i ? a.attr("data-bv-field") : a, c ? g.STATUS_VALID : g.STATUS_INVALID, b), c && 1 == g._submitIfValid && g._submit() })) : "boolean" == typeof f && this.updateStatus(i ? b : l, f ? this.STATUS_VALID : this.STATUS_INVALID, e)) : this._onFieldValidated(l, e)
                    }
            }
            return this
        },
        updateStatus: function(b, c, d) {
            var e, f = a([]);
            switch (typeof b) {
                case "object":
                    f = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    f = this.getFieldElements(b)
            }
            for (var g = this, e = f.attr("type"), h = "radio" == e || "checkbox" == e ? 1 : f.length, i = 0; h > i; i++) {
                var j = f.eq(i),
                    k = j.parents(".form-group"),
                    l = j.data("bv.messages"),
                    m = l.find('.help-block[data-bv-validator][data-bv-for="' + b + '"]'),
                    n = d ? m.filter('[data-bv-validator="' + d + '"]') : m,
                    o = k.find('.form-control-feedback[data-bv-icon-for="' + b + '"]'),
                    p = this.options.fields[b].container || this.options.container,
                    q = null;
                if (d) j.data("bv.result." + d, c);
                else
                    for (var r in this.options.fields[b].validators) j.data("bv.result." + r, c);
                n.attr("data-bv-result", c);
                var s, t, u = j.parents(".tab-pane");
                switch (u && (s = u.attr("id")) && (t = a('a[href="#' + s + '"][data-toggle="tab"]').parent()), c) {
                    case this.STATUS_VALIDATING:
                        q = null, this.disableSubmitButtons(!0), k.removeClass("has-success").removeClass("has-error"), o && o.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).addClass(this.options.feedbackIcons.validating).show(), t && t.removeClass("bv-tab-success").removeClass("bv-tab-error");
                        break;
                    case this.STATUS_INVALID:
                        q = !1, this.disableSubmitButtons(!0), k.removeClass("has-success").addClass("has-error"), o && o.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.validating).addClass(this.options.feedbackIcons.invalid).show(), t && t.removeClass("bv-tab-success").addClass("bv-tab-error");
                        break;
                    case this.STATUS_VALID:
                        q = 0 == m.filter('[data-bv-result="' + this.STATUS_NOT_VALIDATED + '"]').length ? m.filter('[data-bv-result="' + this.STATUS_VALID + '"]').length == m.length : null, null != q && (this.disableSubmitButtons(this.$submitButton ? !this.isValid() : !q), o && o.removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).removeClass(this.options.feedbackIcons.valid).addClass(q ? this.options.feedbackIcons.valid : this.options.feedbackIcons.invalid).show()), k.removeClass("has-error has-success").addClass(this.isValidContainer(k) ? "has-success" : "has-error"), t && t.removeClass("bv-tab-success").removeClass("bv-tab-error").addClass(this.isValidContainer(u) ? "bv-tab-success" : "bv-tab-error");
                        break;
                    case this.STATUS_NOT_VALIDATED:
                    default:
                        q = null, this.disableSubmitButtons(!1), k.removeClass("has-success").removeClass("has-error"), o && o.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).hide(), t && t.removeClass("bv-tab-success").removeClass("bv-tab-error")
                }
                switch (!0) {
                    case o && "tooltip" == p:
                        q === !1 ? o.css("cursor", "pointer").tooltip("destroy").tooltip({ html: !0, placement: "top", title: m.filter('[data-bv-result="' + g.STATUS_INVALID + '"]').eq(0).html() }) : o.css("cursor", "").tooltip("destroy");
                        break;
                    case o && "popover" == p:
                        q === !1 ? o.css("cursor", "pointer").popover("destroy").popover({ content: m.filter('[data-bv-result="' + g.STATUS_INVALID + '"]').eq(0).html(), html: !0, placement: "top", trigger: "hover click" }) : o.css("cursor", "").popover("destroy");
                        break;
                    default:
                        c == this.STATUS_INVALID ? n.show() : n.hide()
                }
                this.$form.trigger(a.Event("status.field.bv"), { field: b, element: j, status: c }), this._onFieldValidated(j, d)
            }
            return this
        },
        isValid: function() {
            for (var a in this.options.fields)
                if (!this.isValidField(a)) return !1;
            return !0
        },
        isValidField: function(b) {
            var c = a([]);
            switch (typeof b) {
                case "object":
                    c = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    c = this.getFieldElements(b)
            }
            if (0 == c.length || null == this.options.fields[b] || 0 == this.options.fields[b].enabled) return !0;
            for (var d, e, f, g = c.attr("type"), h = "radio" == g || "checkbox" == g ? 1 : c.length, i = 0; h > i; i++)
                if (d = c.eq(i), !this._isExcluded(d))
                    for (e in this.options.fields[b].validators)
                        if (f = d.data("bv.result." + e), f != this.STATUS_VALID) return !1;
            return !0
        },
        isValidContainer: function(b) {
            var c = this,
                d = {};
            b.find("[data-bv-field]").each(function() {
                var b = a(this).attr("data-bv-field");
                d[b] || (d[b] = a(this))
            });
            for (var e in d) { var f = d[e]; if (0 != f.data("bv.messages").find('.help-block[data-bv-validator][data-bv-for="' + e + '"]').filter(function() { var b = a(this).attr("data-bv-validator"); return f.data("bv.result." + b) && f.data("bv.result." + b) != c.STATUS_VALID }).length) return !1 }
            return !0
        },
        defaultSubmit: function() { this.$submitButton && a("<input/>").attr("type", "hidden").attr("data-bv-submit-hidden", "").attr("name", this.$submitButton.attr("name")).val(this.$submitButton.val()).appendTo(this.$form), this.$form.off("submit.bv").submit() },
        getInvalidFields: function() { return this.$invalidFields },
        getSubmitButton: function() { return this.$submitButton },
        getErrors: function(b) {
            var c = this,
                d = [],
                e = a([]);
            switch (!0) {
                case b && "object" == typeof b:
                    e = b;
                    break;
                case b && "string" == typeof b:
                    var f = this.getFieldElements(b);
                    if (f.length > 0) {
                        var g = f.attr("type");
                        e = "radio" == g || "checkbox" == g ? f.eq(0) : f
                    }
                    break;
                default:
                    e = this.$invalidFields
            }
            return e.each(function() { d = d.concat(a(this).data("bv.messages").find('.help-block[data-bv-for="' + a(this).attr("data-bv-field") + '"][data-bv-result="' + c.STATUS_INVALID + '"]').map(function() { return a(this).html() }).get()) }), d
        },
        addField: function(b, c) {
            var d = a([]);
            switch (typeof b) {
                case "object":
                    d = b, b = b.attr("data-bv-field") || b.attr("name");
                    break;
                case "string":
                    delete this._cacheFields[b], d = this.getFieldElements(b)
            }
            d.attr("data-bv-field", b);
            for (var e = d.attr("type"), f = "radio" == e || "checkbox" == e ? 1 : d.length, g = 0; f > g; g++) {
                var h = d.eq(g),
                    i = this._parseOptions(h);
                i = null == i ? c : a.extend(!0, c, i), this.options.fields[b] = a.extend(!0, this.options.fields[b], i), this._cacheFields[b] = this._cacheFields[b] ? this._cacheFields[b].add(h) : h, this._initField("checkbox" == e || "radio" == e ? b : h)
            }
            return this.disableSubmitButtons(!1), this.$form.trigger(a.Event("added.field.bv"), { field: b, element: d, options: this.options.fields[b] }), this
        },
        removeField: function(b) {
            var c = a([]);
            switch (typeof b) {
                case "object":
                    c = b, b = b.attr("data-bv-field") || b.attr("name"), c.attr("data-bv-field", b);
                    break;
                case "string":
                    c = this.getFieldElements(b)
            }
            if (0 == c.length) return this;
            for (var d = c.attr("type"), e = "radio" == d || "checkbox" == d ? 1 : c.length, f = 0; e > f; f++) {
                var g = c.eq(f);
                this.$invalidFields = this.$invalidFields.not(g), this._cacheFields[b] = this._cacheFields[b].not(g)
            }
            return this._cacheFields[b] && 0 != this._cacheFields[b].length || delete this.options.fields[b], ("checkbox" == d || "radio" == d) && this._initField(b), this.disableSubmitButtons(!1), this.$form.trigger(a.Event("removed.field.bv"), { field: b, element: c }), this
        },
        resetForm: function(b) {
            var c, d, e, f, g;
            for (c in this.options.fields) {
                d = this.getFieldElements(c), e = d.length;
                for (var h = 0; e > h; h++)
                    for (g in this.options.fields[c].validators) d.eq(h).removeData("bv.dfs." + g);
                this.updateStatus(c, this.STATUS_NOT_VALIDATED), b && (f = d.attr("type"), "radio" == f || "checkbox" == f ? d.removeAttr("checked").removeAttr("selected") : d.val(""))
            }
            return this.$invalidFields = a([]), this.$submitButton = null, this.disableSubmitButtons(!1), this
        },
        enableFieldValidators: function(a, b) { return this.options.fields[a].enabled != b && (this.options.fields[a].enabled = b, this.updateStatus(a, this.STATUS_NOT_VALIDATED)), this },
        destroy: function() {
            var a, b, c, d, e, f;
            for (a in this.options.fields) {
                b = this.getFieldElements(a), f = this.options.fields[a].container || this.options.container;
                for (var g = 0; g < b.length; g++) {
                    if (c = b.eq(g), c.data("bv.messages").find('.help-block[data-bv-validator][data-bv-for="' + a + '"]').remove().end().end().removeData("bv.messages").parents(".form-group").removeClass("has-feedback has-error has-success").end().off(".bv").removeAttr("data-bv-field"), e = c.parents(".form-group").find('i[data-bv-icon-for="' + a + '"]')) switch (f) {
                        case "tooltip":
                            e.tooltip("destroy").remove();
                            break;
                        case "popover":
                            e.popover("destroy").remove();
                            break;
                        default:
                            e.remove()
                    }
                    for (d in this.options.fields[a].validators) c.removeData("bv.result." + d).removeData("bv.dfs." + d)
                }
            }
            this.disableSubmitButtons(!1), this.$form.removeClass(this.options.elementClass).off(".bv").removeData("bootstrapValidator").find("[data-bv-submit-hidden]").remove()
        }
    }, a.fn.bootstrapValidator = function(c) {
        var d = arguments;
        return this.each(function() {
            var e = a(this),
                f = e.data("bootstrapValidator"),
                g = "object" == typeof c && c;
            f || (f = new b(this, g), e.data("bootstrapValidator", f)), "string" == typeof c && f[c].apply(f, Array.prototype.slice.call(d, 1))
        })
    }, a.fn.bootstrapValidator.validators = {}, a.fn.bootstrapValidator.Constructor = b, a.fn.bootstrapValidator.helpers = {
        date: function(a, b, c, d) {
            if (isNaN(a) || isNaN(b) || isNaN(c)) return !1;
            if (1e3 > a || a > 9999 || 0 == b || b > 12) return !1;
            var e = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if ((a % 400 == 0 || a % 100 != 0 && a % 4 == 0) && (e[1] = 29), 0 > c || c > e[b - 1]) return !1;
            if (d === !0) {
                var f = new Date,
                    g = f.getFullYear(),
                    h = f.getMonth(),
                    i = f.getDate();
                return g > a || a == g && h > b - 1 || a == g && b - 1 == h && i > c
            }
            return !0
        },
        luhn: function(a) {
            for (var b = a.length, c = 0, d = [
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
                ], e = 0; b--;) e += d[c][parseInt(a.charAt(b), 10)], c ^= 1;
            return e % 10 === 0 && e > 0
        },
        mod_11_10: function(a) { for (var b = 5, c = a.length, d = 0; c > d; d++) b = (2 * (b || 10) % 11 + parseInt(a.charAt(d), 10)) % 10; return 1 == b },
        mod_37_36: function(a, b) { b = b || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; for (var c = b.length, d = a.length, e = Math.floor(c / 2), f = 0; d > f; f++) e = (2 * (e || c) % (c + 1) + b.indexOf(a.charAt(f))) % c; return 1 == e }
    }
}(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.base64 = { validate: function(a, b) { var c = b.val(); return "" == c ? !0 : /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(c) } } }(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.between = { html5Attributes: { message: "message", min: "min", max: "max", inclusive: "inclusive" }, enableByHtml5: function(a) { return "range" == a.attr("type") ? { min: a.attr("min"), max: a.attr("max") } : !1 }, validate: function(a, b, c) { var d = b.val(); return "" == d ? !0 : (d = parseFloat(d), c.inclusive === !0 || void 0 == c.inclusive ? d >= c.min && d <= c.max : d > c.min && d < c.max) } } }(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.callback = {
        validate: function(b, c, d) {
            var e = c.val();
            if (d.callback && "function" == typeof d.callback) {
                var f = new a.Deferred,
                    g = d.callback.call(this, e, b, c);
                return f.resolve(c, "callback", "boolean" == typeof g ? g : g.valid, "object" == typeof g && g.message ? g.message : null), f
            }
            return !0
        }
    }
}(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.choice = { html5Attributes: { message: "message", min: "min", max: "max" }, validate: function(a, b, c) { var d = b.is("select") ? a.getFieldElements(b.attr("data-bv-field")).find("option").filter(":selected").length : a.getFieldElements(b.attr("data-bv-field")).filter(":checked").length; return c.min && d < c.min || c.max && d > c.max ? !1 : !0 } } }(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.creditCard = {
        validate: function(b, c) {
            var d = c.val();
            if ("" == d) return !0;
            if (/[^0-9-\s]+/.test(d)) return !1;
            if (d = d.replace(/\D/g, ""), !a.fn.bootstrapValidator.helpers.luhn(d)) return !1;
            var e, f, g = { AMERICAN_EXPRESS: { length: [15], prefix: ["34", "37"] }, DINERS_CLUB: { length: [14], prefix: ["300", "301", "302", "303", "304", "305", "36"] }, DINERS_CLUB_US: { length: [16], prefix: ["54", "55"] }, DISCOVER: { length: [16], prefix: ["6011", "622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925", "644", "645", "646", "647", "648", "649", "65"] }, JCB: { length: [16], prefix: ["3528", "3529", "353", "354", "355", "356", "357", "358"] }, LASER: { length: [16, 17, 18, 19], prefix: ["6304", "6706", "6771", "6709"] }, MAESTRO: { length: [12, 13, 14, 15, 16, 17, 18, 19], prefix: ["5018", "5020", "5038", "6304", "6759", "6761", "6762", "6763", "6764", "6765", "6766"] }, MASTERCARD: { length: [16], prefix: ["51", "52", "53", "54", "55"] }, SOLO: { length: [16, 18, 19], prefix: ["6334", "6767"] }, UNIONPAY: { length: [16, 17, 18, 19], prefix: ["622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925"] }, VISA: { length: [16], prefix: ["4"] } };
            for (e in g)
                for (f in g[e].prefix)
                    if (d.substr(0, g[e].prefix[f].length) == g[e].prefix[f] && -1 != a.inArray(d.length, g[e].length)) return !0;
            return !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.cusip = {
        validate: function(b, c) {
            var d = c.val();
            if ("" == d) return !0;
            if (d = d.toUpperCase(), !/^[0-9A-Z]{9}$/.test(d)) return !1;
            for (var e = a.map(d.split(""), function(a) { var b = a.charCodeAt(0); return b >= "A".charCodeAt(0) && b <= "Z".charCodeAt(0) ? b - "A".charCodeAt(0) + 10 : a }), f = e.length, g = 0, h = 0; f - 1 > h; h++) {
                var i = parseInt(e[h]);
                h % 2 != 0 && (i *= 2), i > 9 && (i -= 9), g += i
            }
            return g = (10 - g % 10) % 10, g == e[f - 1]
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.cvv = {
        html5Attributes: { message: "message", ccfield: "creditCardField" },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" == e) return !0;
            if (!/^[0-9]{3,4}$/.test(e)) return !1;
            if (!d.creditCardField) return !0;
            var f = b.getFieldElements(d.creditCardField).val();
            if ("" == f) return !0;
            f = f.replace(/\D/g, "");
            var g, h, i = { AMERICAN_EXPRESS: { length: [15], prefix: ["34", "37"] }, DINERS_CLUB: { length: [14], prefix: ["300", "301", "302", "303", "304", "305", "36"] }, DINERS_CLUB_US: { length: [16], prefix: ["54", "55"] }, DISCOVER: { length: [16], prefix: ["6011", "622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925", "644", "645", "646", "647", "648", "649", "65"] }, JCB: { length: [16], prefix: ["3528", "3529", "353", "354", "355", "356", "357", "358"] }, LASER: { length: [16, 17, 18, 19], prefix: ["6304", "6706", "6771", "6709"] }, MAESTRO: { length: [12, 13, 14, 15, 16, 17, 18, 19], prefix: ["5018", "5020", "5038", "6304", "6759", "6761", "6762", "6763", "6764", "6765", "6766"] }, MASTERCARD: { length: [16], prefix: ["51", "52", "53", "54", "55"] }, SOLO: { length: [16, 18, 19], prefix: ["6334", "6767"] }, UNIONPAY: { length: [16, 17, 18, 19], prefix: ["622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925"] }, VISA: { length: [16], prefix: ["4"] } },
                j = null;
            for (g in i)
                for (h in i[g].prefix)
                    if (f.substr(0, i[g].prefix[h].length) == i[g].prefix[h] && -1 != a.inArray(f.length, i[g].length)) { j = g; break }
            return null == j ? !1 : "AMERICAN_EXPRESS" == j ? 4 == e.length : 3 == e.length
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.date = {
        html5Attributes: { message: "message", format: "format", separator: "separator" },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" == e) return !0;
            d.format = d.format || "MM/DD/YYYY";
            var f = d.format.split(" "),
                g = f[0],
                h = f.length > 1 ? f[1] : null,
                i = f.length > 2 ? f[2] : null,
                j = e.split(" "),
                k = j[0],
                l = j.length > 1 ? j[1] : null;
            if (f.length != j.length) return !1;
            var m = d.separator;
            if (m || (m = -1 != k.indexOf("/") ? "/" : -1 != k.indexOf("-") ? "-" : null), null == m || -1 == k.indexOf(m)) return !1;
            k = k.split(m), g = g.split(m);
            var n = k[a.inArray("YYYY", g)],
                o = k[a.inArray("MM", g)],
                p = k[a.inArray("DD", g)],
                q = null,
                r = null,
                s = null;
            if (h) { if (h = h.split(":"), l = l.split(":"), h.length != l.length) return !1; if (r = l.length > 0 ? l[0] : null, q = l.length > 1 ? l[1] : null, s = l.length > 2 ? l[2] : null, s && (s = parseInt(s, 10), isNaN(s) || 0 > s || s > 60)) return !1; if (r && (r = parseInt(r, 10), isNaN(r) || 0 > r || r >= 24 || i && r > 12)) return !1; if (q && (q = parseInt(q, 10), isNaN(q) || 0 > q || q > 59)) return !1 }
            return p = parseInt(p, 10), o = parseInt(o, 10), n = parseInt(n, 10), a.fn.bootstrapValidator.helpers.date(n, o, p)
        }
    }
}(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.different = { html5Attributes: { message: "message", field: "field" }, validate: function(a, b, c) { var d = b.val(); if ("" == d) return !0; var e = a.getFieldElements(c.field); return null == e ? !0 : d != e.val() ? (a.updateStatus(c.field, a.STATUS_VALID, "different"), !0) : !1 } } }(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.digits = { validate: function(a, b) { var c = b.val(); return "" == c ? !0 : /^\d+$/.test(c) } } }(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.ean = { validate: function(a, b) { var c = b.val(); if ("" == c) return !0; if (!/^(\d{8}|\d{12}|\d{13})$/.test(c)) return !1; for (var d = c.length, e = 0, f = 8 == d ? [3, 1] : [1, 3], g = 0; d - 1 > g; g++) e += parseInt(c.charAt(g)) * f[g % 2]; return e = 10 - e % 10, e == c.charAt(d - 1) } } }(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.emailAddress = { enableByHtml5: function(a) { return "email" == a.attr("type") }, validate: function(a, b) { var c = b.val(); if ("" == c) return !0; var d = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; return d.test(c) } } }(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.file = {
        html5Attributes: { extension: "extension", maxsize: "maxSize", message: "message", type: "type" },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" == e) return !0;
            var f, g = d.extension ? d.extension.toLowerCase().split(",") : null,
                h = d.type ? d.type.toLowerCase().split(",") : null,
                i = window.File && window.FileList && window.FileReader;
            if (i)
                for (var j = c.get(0).files, k = j.length, l = 0; k > l; l++) { if (d.maxSize && j[l].size > parseInt(d.maxSize)) return !1; if (f = j[l].name.substr(j[l].name.lastIndexOf(".") + 1), g && -1 == a.inArray(f.toLowerCase(), g)) return !1; if (h && -1 == a.inArray(j[l].type.toLowerCase(), h)) return !1 } else if (f = e.substr(e.lastIndexOf(".") + 1), g && -1 == a.inArray(f.toLowerCase(), g)) return !1;
            return !0
        }
    }
}(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.greaterThan = { html5Attributes: { message: "message", value: "value", inclusive: "inclusive" }, enableByHtml5: function(a) { var b = a.attr("min"); return b ? { value: b } : !1 }, validate: function(a, b, c) { var d = b.val(); return "" == d ? !0 : (d = parseFloat(d), c.inclusive === !0 || void 0 == c.inclusive ? d >= c.value : d > c.value) } } }(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.grid = { validate: function(b, c) { var d = c.val(); return "" == d ? !0 : (d = d.toUpperCase(), /^[GRID:]*([0-9A-Z]{2})[-\s]*([0-9A-Z]{5})[-\s]*([0-9A-Z]{10})[-\s]*([0-9A-Z]{1})$/g.test(d) ? (d = d.replace(/\s/g, "").replace(/-/g, ""), "GRID:" == d.substr(0, 5) && (d = d.substr(5)), a.fn.bootstrapValidator.helpers.mod_37_36(d)) : !1) } } }(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.hex = { validate: function(a, b) { var c = b.val(); return "" == c ? !0 : /^[0-9a-fA-F]+$/.test(c) } } }(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.hexColor = { enableByHtml5: function(a) { return "color" == a.attr("type") }, validate: function(a, b) { var c = b.val(); return "" == c ? !0 : /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(c) } } }(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.iban = {
        html5Attributes: { message: "message", country: "country" },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" == e) return !0;
            var f = { AD: "AD[0-9]{2}[0-9]{4}[0-9]{4}[A-Z0-9]{12}", AE: "AE[0-9]{2}[0-9]{3}[0-9]{16}", AL: "AL[0-9]{2}[0-9]{8}[A-Z0-9]{16}", AO: "AO[0-9]{2}[0-9]{21}", AT: "AT[0-9]{2}[0-9]{5}[0-9]{11}", AZ: "AZ[0-9]{2}[A-Z]{4}[A-Z0-9]{20}", BA: "BA[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{8}[0-9]{2}", BE: "BE[0-9]{2}[0-9]{3}[0-9]{7}[0-9]{2}", BF: "BF[0-9]{2}[0-9]{23}", BG: "BG[0-9]{2}[A-Z]{4}[0-9]{4}[0-9]{2}[A-Z0-9]{8}", BH: "BH[0-9]{2}[A-Z]{4}[A-Z0-9]{14}", BI: "BI[0-9]{2}[0-9]{12}", BJ: "BJ[0-9]{2}[A-Z]{1}[0-9]{23}", BR: "BR[0-9]{2}[0-9]{8}[0-9]{5}[0-9]{10}[A-Z][A-Z0-9]", CH: "CH[0-9]{2}[0-9]{5}[A-Z0-9]{12}", CI: "CI[0-9]{2}[A-Z]{1}[0-9]{23}", CM: "CM[0-9]{2}[0-9]{23}", CR: "CR[0-9]{2}[0-9]{3}[0-9]{14}", CV: "CV[0-9]{2}[0-9]{21}", CY: "CY[0-9]{2}[0-9]{3}[0-9]{5}[A-Z0-9]{16}", CZ: "CZ[0-9]{2}[0-9]{20}", DE: "DE[0-9]{2}[0-9]{8}[0-9]{10}", DK: "DK[0-9]{2}[0-9]{14}", DO: "DO[0-9]{2}[A-Z0-9]{4}[0-9]{20}", DZ: "DZ[0-9]{2}[0-9]{20}", EE: "EE[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{11}[0-9]{1}", ES: "ES[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{1}[0-9]{1}[0-9]{10}", FI: "FI[0-9]{2}[0-9]{6}[0-9]{7}[0-9]{1}", FO: "FO[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}", FR: "FR[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}", GB: "GB[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}", GE: "GE[0-9]{2}[A-Z]{2}[0-9]{16}", GI: "GI[0-9]{2}[A-Z]{4}[A-Z0-9]{15}", GL: "GL[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}", GR: "GR[0-9]{2}[0-9]{3}[0-9]{4}[A-Z0-9]{16}", GT: "GT[0-9]{2}[A-Z0-9]{4}[A-Z0-9]{20}", HR: "HR[0-9]{2}[0-9]{7}[0-9]{10}", HU: "HU[0-9]{2}[0-9]{3}[0-9]{4}[0-9]{1}[0-9]{15}[0-9]{1}", IE: "IE[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}", IL: "IL[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{13}", IR: "IR[0-9]{2}[0-9]{22}", IS: "IS[0-9]{2}[0-9]{4}[0-9]{2}[0-9]{6}[0-9]{10}", IT: "IT[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}", JO: "JO[0-9]{2}[A-Z]{4}[0-9]{4}[0]{8}[A-Z0-9]{10}", KW: "KW[0-9]{2}[A-Z]{4}[0-9]{22}", KZ: "KZ[0-9]{2}[0-9]{3}[A-Z0-9]{13}", LB: "LB[0-9]{2}[0-9]{4}[A-Z0-9]{20}", LI: "LI[0-9]{2}[0-9]{5}[A-Z0-9]{12}", LT: "LT[0-9]{2}[0-9]{5}[0-9]{11}", LU: "LU[0-9]{2}[0-9]{3}[A-Z0-9]{13}", LV: "LV[0-9]{2}[A-Z]{4}[A-Z0-9]{13}", MC: "MC[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}", MD: "MD[0-9]{2}[A-Z0-9]{20}", ME: "ME[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}", MG: "MG[0-9]{2}[0-9]{23}", MK: "MK[0-9]{2}[0-9]{3}[A-Z0-9]{10}[0-9]{2}", ML: "ML[0-9]{2}[A-Z]{1}[0-9]{23}", MR: "MR13[0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}", MT: "MT[0-9]{2}[A-Z]{4}[0-9]{5}[A-Z0-9]{18}", MU: "MU[0-9]{2}[A-Z]{4}[0-9]{2}[0-9]{2}[0-9]{12}[0-9]{3}[A-Z]{3}", MZ: "MZ[0-9]{2}[0-9]{21}", NL: "NL[0-9]{2}[A-Z]{4}[0-9]{10}", NO: "NO[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{1}", PK: "PK[0-9]{2}[A-Z]{4}[A-Z0-9]{16}", PL: "PL[0-9]{2}[0-9]{8}[0-9]{16}", PS: "PS[0-9]{2}[A-Z]{4}[A-Z0-9]{21}", PT: "PT[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{11}[0-9]{2}", QA: "QA[0-9]{2}[A-Z]{4}[A-Z0-9]{21}", RO: "RO[0-9]{2}[A-Z]{4}[A-Z0-9]{16}", RS: "RS[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}", SA: "SA[0-9]{2}[0-9]{2}[A-Z0-9]{18}", SE: "SE[0-9]{2}[0-9]{3}[0-9]{16}[0-9]{1}", SI: "SI[0-9]{2}[0-9]{5}[0-9]{8}[0-9]{2}", SK: "SK[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{10}", SM: "SM[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}", SN: "SN[0-9]{2}[A-Z]{1}[0-9]{23}", TN: "TN59[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}", TR: "TR[0-9]{2}[0-9]{5}[A-Z0-9]{1}[A-Z0-9]{16}", VG: "VG[0-9]{2}[A-Z]{4}[0-9]{16}" };
            e = e.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
            var g = d.country || e.substr(0, 2);
            if (!f[g]) return !1;
            if (!new RegExp("^" + f[g] + "$").test(e)) return !1;
            e = e.substr(4) + e.substr(0, 4), e = a.map(e.split(""), function(a) { var b = a.charCodeAt(0); return b >= "A".charCodeAt(0) && b <= "Z".charCodeAt(0) ? b - "A".charCodeAt(0) + 10 : a }), e = e.join("");
            for (var h = parseInt(e.substr(0, 1), 10), i = e.length, j = 1; i > j; ++j) h = (10 * h + parseInt(e.substr(j, 1), 10)) % 97;
            return 1 == h
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.id = {
        html5Attributes: { message: "message", country: "country" },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e = c.country || d.substr(0, 2),
                f = ["_", e.toLowerCase()].join("");
            return this[f] && "function" == typeof this[f] ? this[f](d) : !0
        },
        _validateJMBG: function(a, b) {
            if (!/^\d{13}$/.test(a)) return !1;
            var c = parseInt(a.substr(0, 2), 10),
                d = parseInt(a.substr(2, 2), 10),
                e = (parseInt(a.substr(4, 3), 10), parseInt(a.substr(7, 2), 10)),
                f = parseInt(a.substr(12, 1), 10);
            if (c > 31 || d > 12) return !1;
            for (var g = 0, h = 0; 6 > h; h++) g += (7 - h) * (parseInt(a.charAt(h)) + parseInt(a.charAt(h + 6)));
            if (g = 11 - g % 11, (10 == g || 11 == g) && (g = 0), g != f) return !1;
            switch (b.toUpperCase()) {
                case "BA":
                    return e >= 10 && 19 >= e;
                case "MK":
                    return e >= 41 && 49 >= e;
                case "ME":
                    return e >= 20 && 29 >= e;
                case "RS":
                    return e >= 70 && 99 >= e;
                case "SI":
                    return e >= 50 && 59 >= e;
                default:
                    return !0
            }
        },
        _ba: function(a) { return this._validateJMBG(a, "BA") },
        _mk: function(a) { return this._validateJMBG(a, "MK") },
        _me: function(a) { return this._validateJMBG(a, "ME") },
        _rs: function(a) { return this._validateJMBG(a, "RS") },
        _si: function(a) { return this._validateJMBG(a, "SI") },
        _bg: function(b) {
            if (!/^\d{10}$/.test(b) && !/^\d{6}\s\d{3}\s\d{1}$/.test(b)) return !1;
            b = b.replace(/\s/g, "");
            var c = parseInt(b.substr(0, 2), 10) + 1900,
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10);
            if (d > 40 ? (c += 100, d -= 40) : d > 20 && (c -= 100, d -= 20), !a.fn.bootstrapValidator.helpers.date(c, d, e)) return !1;
            for (var f = 0, g = [2, 4, 8, 5, 10, 9, 7, 3, 6], h = 0; 9 > h; h++) f += parseInt(b.charAt(h)) * g[h];
            return f = f % 11 % 10, f == b.substr(9, 1)
        },
        _br: function(a) {
            if (/^1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}$/.test(a)) return !1;
            if (!/^\d{11}$/.test(a) && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(a)) return !1;
            a = a.replace(/\./g, "").replace(/-/g, "");
            for (var b = 0, c = 0; 9 > c; c++) b += (10 - c) * parseInt(a.charAt(c));
            if (b = 11 - b % 11, (10 == b || 11 == b) && (b = 0), b != a.charAt(9)) return !1;
            var d = 0;
            for (c = 0; 10 > c; c++) d += (11 - c) * parseInt(a.charAt(c));
            return d = 11 - d % 11, (10 == d || 11 == d) && (d = 0), d == a.charAt(10)
        },
        _ch: function(a) {
            if (!/^756[\.]{0,1}[0-9]{4}[\.]{0,1}[0-9]{4}[\.]{0,1}[0-9]{2}$/.test(a)) return !1;
            a = a.replace(/\D/g, "").substr(3);
            for (var b = a.length, c = 0, d = 8 == b ? [3, 1] : [1, 3], e = 0; b - 1 > e; e++) c += parseInt(a.charAt(e)) * d[e % 2];
            return c = 10 - c % 10, c == a.charAt(b - 1)
        },
        _cl: function(a) { if (!/^\d{7,8}[-]{0,1}[0-9K]$/.test(a)) return !1; for (a = a.replace(/\D/g, ""); a.length < 9;) a = "0" + a; for (var b = 0, c = [3, 2, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d]; return b = 11 - b % 11, 11 == b ? b = 0 : 10 == b && (b = "K"), b == a.charAt(8) },
        _cz: function(b) {
            if (!/^\d{9,10}$/.test(b)) return !1;
            var c = 1900 + parseInt(b.substr(0, 2)),
                d = parseInt(b.substr(2, 2)) % 50 % 20,
                e = parseInt(b.substr(4, 2));
            if (9 == b.length) { if (c >= 1980 && (c -= 100), c > 1953) return !1 } else 1954 > c && (c += 100);
            if (!a.fn.bootstrapValidator.helpers.date(c, d, e)) return !1;
            if (10 == b.length) { var f = parseInt(b.substr(0, 9), 10) % 11; return 1985 > c && (f %= 10), f == b.substr(9, 1) }
            return !0
        },
        _dk: function(b) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{4}$/.test(b)) return !1;
            b = b.replace(/-/g, "");
            var c = parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10);
            switch (!0) {
                case -1 != "5678".indexOf(b.charAt(6)) && e >= 58:
                    e += 1800;
                    break;
                case -1 != "0123".indexOf(b.charAt(6)):
                case -1 != "49".indexOf(b.charAt(6)) && e >= 37:
                    e += 1900;
                    break;
                default:
                    e += 2e3
            }
            return a.fn.bootstrapValidator.helpers.date(e, d, c)
        },
        _ee: function(a) { return this._lt(a) },
        _es: function(a) {
            if (!/^[0-9A-Z]{8}[-]{0,1}[0-9A-Z]$/.test(a) && !/^[XYZ][-]{0,1}[0-9]{7}[-]{0,1}[0-9A-Z]$/.test(a)) return !1;
            a = a.replace(/-/g, "");
            var b = "XYZ".indexOf(a.charAt(0)); - 1 != b && (a = b + a.substr(1) + "");
            var c = parseInt(a.substr(0, 8), 10);
            return c = "TRWAGMYFPDXBNJZSQVHLCKE" [c % 23], c == a.substr(8, 1)
        },
        _fi: function(b) {
            if (!/^[0-9]{6}[-+A][0-9]{3}[0-9ABCDEFHJKLMNPRSTUVWXY]$/.test(b)) return !1;
            var c = parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10),
                f = { "+": 1800, "-": 1900, A: 2e3 };
            if (e = f[b.charAt(6)] + e, !a.fn.bootstrapValidator.helpers.date(e, d, c)) return !1;
            var g = parseInt(b.substr(7, 3));
            if (2 > g) return !1;
            var h = b.substr(0, 6) + b.substr(7, 3) + "";
            return h = parseInt(h), "0123456789ABCDEFHJKLMNPRSTUVWXY".charAt(h % 31) == b.charAt(10)
        },
        _hr: function(b) { return /^[0-9]{11}$/.test(b) ? a.fn.bootstrapValidator.helpers.mod_11_10(b) : !1 },
        _ie: function(a) { if (!/^\d{7}[A-W][AHWTX]?$/.test(a)) return !1; var b = function(a) { for (; a.length < 7;) a = "0" + a; for (var b = "WABCDEFGHIJKLMNOPQRSTUV", c = 0, d = 0; 7 > d; d++) c += parseInt(a.charAt(d)) * (8 - d); return c += 9 * b.indexOf(a.substr(7)), b[c % 23] }; return 9 != a.length || "A" != a.charAt(8) && "H" != a.charAt(8) ? a.charAt(7) == b(a.substr(0, 7)) : a.charAt(7) == b(a.substr(0, 7) + a.substr(8) + "") },
        _is: function(b) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{4}$/.test(b)) return !1;
            b = b.replace(/-/g, "");
            var c = parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10),
                f = parseInt(b.charAt(9));
            if (e = 9 == f ? 1900 + e : 100 * (20 + f) + e, !a.fn.bootstrapValidator.helpers.date(e, d, c, !0)) return !1;
            for (var g = 0, h = [3, 2, 7, 6, 5, 4, 3, 2], i = 0; 8 > i; i++) g += parseInt(b.charAt(i)) * h[i];
            return g = 11 - g % 11, g == b.charAt(8)
        },
        _lt: function(b) {
            if (!/^[0-9]{11}$/.test(b)) return !1;
            var c = parseInt(b.charAt(0)),
                d = parseInt(b.substr(1, 2), 10),
                e = parseInt(b.substr(3, 2), 10),
                f = parseInt(b.substr(5, 2), 10),
                g = c % 2 == 0 ? 17 + c / 2 : 17 + (c + 1) / 2;
            if (d = 100 * g + d, !a.fn.bootstrapValidator.helpers.date(d, e, f, !0)) return !1;
            for (var h = 0, i = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1], j = 0; 10 > j; j++) h += parseInt(b.charAt(j)) * i[j];
            if (h %= 11, 10 != h) return h == b.charAt(10);
            for (h = 0, i = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3], j = 0; 10 > j; j++) h += parseInt(b.charAt(j)) * i[j];
            return h %= 11, 10 == h && (h = 0), h == b.charAt(10)
        },
        _lv: function(b) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{5}$/.test(b)) return !1;
            b = b.replace(/\D/g, "");
            var c = parseInt(b.substr(0, 2)),
                d = parseInt(b.substr(2, 2)),
                e = parseInt(b.substr(4, 2));
            if (e = e + 1800 + 100 * parseInt(b.charAt(6)), !a.fn.bootstrapValidator.helpers.date(e, d, c, !0)) return !1;
            for (var f = 0, g = [10, 5, 8, 4, 2, 1, 6, 3, 7, 9], h = 0; 10 > h; h++) f += parseInt(b.charAt(h)) * g[h];
            return f = (f + 1) % 11 % 10, f == b.charAt(10)
        },
        _nl: function(a) { for (; a.length < 9;) a = "0" + a; if (!/^[0-9]{4}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{3}$/.test(a)) return !1; if (a = a.replace(/\./g, ""), 0 == parseInt(a, 10)) return !1; for (var b = 0, c = a.length, d = 0; c - 1 > d; d++) b += (9 - d) * parseInt(a.charAt(d)); return b %= 11, 10 == b && (b = 0), b == a.charAt(c - 1) },
        _ro: function(b) {
            if (!/^[0-9]{13}$/.test(b)) return !1;
            var c = parseInt(b.charAt(0));
            if (0 == c || 7 == c || 8 == c) return !1;
            var d = parseInt(b.substr(1, 2), 10),
                e = parseInt(b.substr(3, 2), 10),
                f = parseInt(b.substr(5, 2), 10),
                g = { 1: 1900, 2: 1900, 3: 1800, 4: 1800, 5: 2e3, 6: 2e3 };
            if (f > 31 && e > 12) return !1;
            if (9 != c && (d = g[c + ""] + d, !a.fn.bootstrapValidator.helpers.date(d, e, f))) return !1;
            for (var h = 0, i = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9], j = b.length, k = 0; j - 1 > k; k++) h += parseInt(b.charAt(k)) * i[k];
            return h %= 11, 10 == h && (h = 1), h == b.charAt(j - 1)
        },
        _se: function(b) {
            if (!/^[0-9]{10}$/.test(b) && !/^[0-9]{6}[-|+][0-9]{4}$/.test(b)) return !1;
            b = b.replace(/[^0-9]/g, "");
            var c = parseInt(b.substr(0, 2)) + 1900,
                d = parseInt(b.substr(2, 2)),
                e = parseInt(b.substr(4, 2));
            return a.fn.bootstrapValidator.helpers.date(c, d, e) ? a.fn.bootstrapValidator.helpers.luhn(b) : !1
        },
        _sk: function(a) { return this._cz(a) },
        _sm: function(a) { return /^\d{5}$/.test(a) },
        _za: function(b) {
            if (!/^[0-9]{10}[0|1][8|9][0-9]$/.test(b)) return !1;
            var c = parseInt(b.substr(0, 2)),
                d = (new Date).getFullYear() % 100,
                e = parseInt(b.substr(2, 2)),
                f = parseInt(b.substr(4, 2));
            return c = c >= d ? c + 1900 : c + 2e3, a.fn.bootstrapValidator.helpers.date(c, e, f) ? a.fn.bootstrapValidator.helpers.luhn(b) : !1
        }
    }
}(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.identical = { html5Attributes: { message: "message", field: "field" }, validate: function(a, b, c) { var d = b.val(); if ("" == d) return !0; var e = a.getFieldElements(c.field); return null == e ? !0 : d == e.val() ? (a.updateStatus(c.field, a.STATUS_VALID, "identical"), !0) : !1 } } }(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.imei = {
        validate: function(b, c) {
            var d = c.val();
            if ("" == d) return !0;
            switch (!0) {
                case /^\d{15}$/.test(d):
                case /^\d{2}-\d{6}-\d{6}-\d{1}$/.test(d):
                case /^\d{2}\s\d{6}\s\d{6}\s\d{1}$/.test(d):
                    return d = d.replace(/[^0-9]/g, ""), a.fn.bootstrapValidator.helpers.luhn(d);
                case /^\d{14}$/.test(d):
                case /^\d{16}$/.test(d):
                case /^\d{2}-\d{6}-\d{6}(|-\d{2})$/.test(d):
                case /^\d{2}\s\d{6}\s\d{6}(|\s\d{2})$/.test(d):
                    return !0;
                default:
                    return !1
            }
        }
    }
}(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.integer = { enableByHtml5: function(a) { return "number" == a.attr("type") }, validate: function(a, b) { var c = b.val(); return "" == c ? !0 : /^(?:-?(?:0|[1-9][0-9]*))$/.test(c) } } }(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.ip = { html5Attributes: { message: "message", ipv4: "ipv4", ipv6: "ipv6" }, validate: function(b, c, d) { var e = c.val(); return "" == e ? !0 : (d = a.extend({}, { ipv4: !0, ipv6: !0 }, d), d.ipv4 ? /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(e) : d.ipv6 ? /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/.test(str) : !1) } } }(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.isbn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            var d;
            switch (!0) {
                case /^\d{9}[\dX]$/.test(c):
                case 13 == c.length && /^(\d+)-(\d+)-(\d+)-([\dX])$/.test(c):
                case 13 == c.length && /^(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(c):
                    d = "ISBN10";
                    break;
                case /^(978|979)\d{9}[\dX]$/.test(c):
                case 17 == c.length && /^(978|979)-(\d+)-(\d+)-(\d+)-([\dX])$/.test(c):
                case 17 == c.length && /^(978|979)\s(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(c):
                    d = "ISBN13";
                    break;
                default:
                    return !1
            }
            c = c.replace(/[^0-9X]/gi, "");
            var e, f = c.split(""),
                g = f.length,
                h = 0;
            switch (d) {
                case "ISBN10":
                    h = 0;
                    for (var i = 0; g - 1 > i; i++) h += (10 - i) * parseInt(f[i]);
                    return e = 11 - h % 11, 11 == e ? e = 0 : 10 == e && (e = "X"), e + "" == f[g - 1];
                case "ISBN13":
                    h = 0;
                    for (var i = 0; g - 1 > i; i++) h += i % 2 == 0 ? parseInt(f[i]) : 3 * parseInt(f[i]);
                    return e = 10 - h % 10, 10 == e && (e = "0"), e + "" == f[g - 1];
                default:
                    return !1
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.isin = {
        COUNTRY_CODES: "AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW",
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            c = c.toUpperCase();
            var d = new RegExp("^(" + this.COUNTRY_CODES + ")[0-9A-Z]{10}$");
            if (!d.test(c)) return !1;
            for (var e = "", f = c.length, g = 0; f - 1 > g; g++) {
                var h = c.charCodeAt(g);
                e += h > 57 ? (h - 55).toString() : c.charAt(g)
            }
            var i = "",
                j = e.length,
                k = j % 2 != 0 ? 0 : 1;
            for (g = 0; j > g; g++) i += parseInt(e[g]) * (g % 2 == k ? 2 : 1) + "";
            var l = 0;
            for (g = 0; g < i.length; g++) l += parseInt(i.charAt(g));
            return l = (10 - l % 10) % 10, l == c.charAt(f - 1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.ismn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            var d;
            switch (!0) {
                case /^M\d{9}$/.test(c):
                case /^M-\d{4}-\d{4}-\d{1}$/.test(c):
                case /^M\s\d{4}\s\d{4}\s\d{1}$/.test(c):
                    d = "ISMN10";
                    break;
                case /^9790\d{9}$/.test(c):
                case /^979-0-\d{4}-\d{4}-\d{1}$/.test(c):
                case /^979\s0\s\d{4}\s\d{4}\s\d{1}$/.test(c):
                    d = "ISMN13";
                    break;
                default:
                    return !1
            }
            "ISMN10" == d && (c = "9790" + c.substr(1)), c = c.replace(/[^0-9]/gi, "");
            for (var e = c.length, f = 0, g = [1, 3], h = 0; e - 1 > h; h++) f += parseInt(c.charAt(h)) * g[h % 2];
            return f = 10 - f % 10, f == c.charAt(e - 1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.issn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            if (!/^\d{4}\-\d{3}[\dX]$/.test(c)) return !1;
            c = c.replace(/[^0-9X]/gi, "");
            var d = c.split(""),
                e = d.length,
                f = 0;
            "X" == d[7] && (d[7] = 10);
            for (var g = 0; e > g; g++) f += (8 - g) * parseInt(d[g]);
            return f % 11 == 0
        }
    }
}(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.lessThan = { html5Attributes: { message: "message", value: "value", inclusive: "inclusive" }, enableByHtml5: function(a) { var b = a.attr("max"); return b ? { value: b } : !1 }, validate: function(a, b, c) { var d = b.val(); return "" == d ? !0 : (d = parseFloat(d), c.inclusive === !0 || void 0 == c.inclusive ? d <= c.value : d < c.value) } } }(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.mac = { validate: function(a, b) { var c = b.val(); return "" == c ? !0 : /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(c) } } }(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.notEmpty = { enableByHtml5: function(a) { var b = a.attr("required") + ""; return "required" == b || "true" == b }, validate: function(b, c) { var d = c.attr("type"); return "radio" == d || "checkbox" == d ? b.getFieldElements(c.attr("data-bv-field")).filter(":checked").length > 0 : "" != a.trim(c.val()) } } }(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.numeric = { html5Attributes: { message: "message", separator: "separator" }, validate: function(a, b, c) { var d = b.val(); if ("" == d) return !0; var e = c.separator || "."; return "." != e && (d = d.replace(e, ".")), !isNaN(parseFloat(d)) && isFinite(d) } } }(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.phone = {
        html5Attributes: { message: "message", country: "country" },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" == e) return !0;
            var f = (d.country || "US").toUpperCase();
            switch (f) {
                case "GB":
                    return e = a.trim(e), /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{5}\)?[\s-]?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/.test(e);
                case "US":
                default:
                    return e = e.replace(/\D/g, ""), /^(?:(1\-?)|(\+1 ?))?\(?(\d{3})[\)\-\.]?(\d{3})[\-\.]?(\d{4})$/.test(e) && 10 == e.length
            }
        }
    }
}(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.regexp = { html5Attributes: { message: "message", regexp: "regexp" }, enableByHtml5: function(a) { var b = a.attr("pattern"); return b ? { regexp: b } : !1 }, validate: function(a, b, c) { var d = b.val(); if ("" == d) return !0; var e = "string" == typeof c.regexp ? new RegExp(c.regexp) : c.regexp; return e.test(d) } } }(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.remote = {
        html5Attributes: { message: "message", url: "url", name: "name" },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" == e) return !0;
            var f = c.attr("data-bv-field"),
                g = d.data;
            null == g && (g = {}), "function" == typeof g && (g = g.call(this, b)), g[d.name || f] = e;
            var h = new a.Deferred,
                i = a.ajax({ type: "POST", url: d.url, dataType: "json", data: g });
            return i.then(function(a) { h.resolve(c, "remote", a.valid === !0 || "true" === a.valid, a.message ? a.message : null) }), h.fail(function() { i.abort() }), h
        }
    }
}(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.rtn = { validate: function(a, b) { var c = b.val(); if ("" == c) return !0; if (!/^\d{9}$/.test(c)) return !1; for (var d = 0, e = 0; e < c.length; e += 3) d += 3 * parseInt(c.charAt(e), 10) + 7 * parseInt(c.charAt(e + 1), 10) + parseInt(c.charAt(e + 2), 10); return 0 != d && d % 10 == 0 } } }(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.sedol = { validate: function(a, b) { var c = b.val(); if ("" == c) return !0; if (c = c.toUpperCase(), !/^[0-9A-Z]{7}$/.test(c)) return !1; for (var d = 0, e = [1, 3, 1, 7, 3, 9, 1], f = c.length, g = 0; f - 1 > g; g++) d += e[g] * parseInt(c.charAt(g), 36); return d = (10 - d % 10) % 10, d == c.charAt(f - 1) } } }(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.siren = { validate: function(b, c) { var d = c.val(); return "" == d ? !0 : /^\d{9}$/.test(d) ? a.fn.bootstrapValidator.helpers.luhn(d) : !1 } } }(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.siret = { validate: function(a, b) { var c = b.val(); if ("" == c) return !0; for (var d, e = 0, f = c.length, g = 0; f > g; g++) d = parseInt(c.charAt(g), 10), g % 2 == 0 && (d = 2 * d, d > 9 && (d -= 9)), e += d; return e % 10 == 0 } } }(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.step = {
        html5Attributes: { message: "message", base: "baseValue", step: "step" },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" == e) return !0;
            if (d = a.extend({}, { baseValue: 0, step: 1 }, d), e = parseFloat(e), isNaN(e) || !isFinite(e)) return !1;
            var f = function(a, b) {
                    var c = Math.pow(10, b);
                    a *= c;
                    var d = a > 0 | -(0 > a),
                        e = a % 1 === .5 * d;
                    return e ? (Math.floor(a) + (d > 0)) / c : Math.round(a) / c
                },
                g = function(a, b) {
                    if (0 == b) return 1;
                    var c = (a + "").split("."),
                        d = (b + "").split("."),
                        e = (1 == c.length ? 0 : c[1].length) + (1 == d.length ? 0 : d[1].length);
                    return f(a - b * Math.floor(a / b), e)
                },
                h = g(e - d.baseValue, d.step);
            return 0 == h || h == d.step
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.stringCase = {
        html5Attributes: { message: "message", "case": "case" },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e = (c["case"] || "lower").toLowerCase();
            switch (e) {
                case "upper":
                    return d === d.toUpperCase();
                case "lower":
                default:
                    return d === d.toLowerCase()
            }
        }
    }
}(window.jQuery),
function(a) { a.fn.bootstrapValidator.validators.stringLength = { html5Attributes: { message: "message", min: "min", max: "max" }, enableByHtml5: function(a) { var b = a.attr("maxlength"); return b ? { max: parseInt(b, 10) } : !1 }, validate: function(b, c, d) { var e = c.val(); if ("" == e) return !0; var f = a.trim(e).length; return d.min && f < d.min || d.max && f > d.max ? !1 : !0 } } }(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.uri = {
        html5Attributes: { message: "message", allowlocal: "allowLocal" },
        enableByHtml5: function(a) { return "url" == a.attr("type") },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e = 1 == c.allowLocal || "true" == c.allowLocal,
                f = new RegExp("^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:" + (e ? "" : "(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})") + "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/[^\\s]*)?$", "i");
            return f.test(d)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.uuid = {
        html5Attributes: { message: "message", version: "version" },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e = { 3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i, 4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, 5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i, all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i },
                f = c.version ? c.version + "" : "all";
            return null == e[f] ? !0 : e[f].test(d)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.vat = {
        html5Attributes: { message: "message", country: "country" },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d) return !0;
            var e = c.country || d.substr(0, 2),
                f = ["_", e.toLowerCase()].join("");
            return this[f] && "function" == typeof this[f] ? this[f](d) : !0
        },
        _at: function(a) {
            if (!/^ATU[0-9]{8}$/.test(a)) return !1;
            a = a.substr(3);
            for (var b = 0, c = [1, 2, 1, 2, 1, 2, 1], d = 0, e = 0; 7 > e; e++) d = parseInt(a.charAt(e)) * c[e], d > 9 && (d = Math.floor(d / 10) + d % 10), b += d;
            return b = 10 - (b + 4) % 10, 10 == b && (b = 0), b == a.substr(7, 1)
        },
        _be: function(a) { if (!/^BE[0]{0,1}[0-9]{9}$/.test(a)) return !1; if (a = a.substr(2), 9 == a.length && (a = "0" + a), 0 == a.substr(1, 1)) return !1; var b = parseInt(a.substr(0, 8), 10) + parseInt(a.substr(8, 2), 10); return b % 97 == 0 },
        _bg: function(b) {
            if (!/^BG[0-9]{9,10}$/.test(b)) return !1;
            b = b.substr(2);
            var c = 0,
                d = 0;
            if (9 == b.length) {
                for (d = 0; 8 > d; d++) c += parseInt(b.charAt(d)) * (d + 1);
                if (c %= 11, 10 == c)
                    for (c = 0, d = 0; 8 > d; d++) c += parseInt(b.charAt(d)) * (d + 3);
                return c %= 10, c == b.substr(8)
            }
            if (10 == b.length) {
                var e = function(b) {
                        var c = parseInt(b.substr(0, 2), 10) + 1900,
                            d = parseInt(b.substr(2, 2), 10),
                            e = parseInt(b.substr(4, 2), 10);
                        if (d > 40 ? (c += 100, d -= 40) : d > 20 && (c -= 100, d -= 20), !a.fn.bootstrapValidator.helpers.date(c, d, e)) return !1;
                        for (var f = 0, g = [2, 4, 8, 5, 10, 9, 7, 3, 6], h = 0; 9 > h; h++) f += parseInt(b.charAt(h)) * g[h];
                        return f = f % 11 % 10, f == b.substr(9, 1)
                    },
                    f = function(a) { for (var b = 0, c = [21, 19, 17, 13, 11, 9, 7, 3, 1], d = 0; 9 > d; d++) b += parseInt(a.charAt(d)) * c[d]; return b %= 10, b == a.substr(9, 1) },
                    g = function(a) { for (var b = 0, c = [4, 3, 2, 7, 6, 5, 4, 3, 2], d = 0; 9 > d; d++) b += parseInt(a.charAt(d)) * c[d]; return b = 11 - b % 11, 10 == b ? !1 : (11 == b && (b = 0), b == a.substr(9, 1)) };
                return e(b) || f(b) || g(b)
            }
            return !1
        },
        _ch: function(a) {
            if (!/^CHE[0-9]{9}(MWST)?$/.test(a)) return !1;
            a = a.substr(3);
            for (var b = 0, c = [5, 4, 3, 2, 7, 6, 5, 4], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b = 11 - b % 11, 10 == b ? !1 : (11 == b && (b = 0), b == a.substr(8, 1))
        },
        _cy: function(a) {
            if (!/^CY[0-5|9]{1}[0-9]{7}[A-Z]{1}$/.test(a)) return !1;
            if (a = a.substr(2), "12" == a.substr(0, 2)) return !1;
            for (var b = 0, c = { 0: 1, 1: 0, 2: 5, 3: 7, 4: 9, 5: 13, 6: 15, 7: 17, 8: 19, 9: 21 }, d = 0; 8 > d; d++) {
                var e = parseInt(a.charAt(d), 10);
                d % 2 == 0 && (e = c[e + ""]), b += e
            }
            return b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" [b % 26], b == a.substr(8, 1)
        },
        _cz: function(b) {
            if (!/^CZ[0-9]{8,10}$/.test(b)) return !1;
            b = b.substr(2);
            var c = 0,
                d = 0;
            if (8 == b.length) { if (b.charAt(0) + "" == "9") return !1; for (c = 0, d = 0; 7 > d; d++) c += parseInt(b.charAt(d), 10) * (8 - d); return c = 11 - c % 11, 10 == c && (c = 0), 11 == c && (c = 1), c == b.substr(7, 1) }
            if (9 == b.length && b.charAt(0) + "" == "6") { for (c = 0, d = 0; 7 > d; d++) c += parseInt(b.charAt(d + 1), 10) * (8 - d); return c = 11 - c % 11, 10 == c && (c = 0), 11 == c && (c = 1), c = [8, 7, 6, 5, 4, 3, 2, 1, 0, 9, 10][c - 1], c == b.substr(8, 1) }
            if (9 == b.length || 10 == b.length) {
                var e = 1900 + parseInt(b.substr(0, 2)),
                    f = parseInt(b.substr(2, 2)) % 50 % 20,
                    g = parseInt(b.substr(4, 2));
                if (9 == b.length) { if (e >= 1980 && (e -= 100), e > 1953) return !1 } else 1954 > e && (e += 100);
                if (!a.fn.bootstrapValidator.helpers.date(e, f, g)) return !1;
                if (10 == b.length) { var h = parseInt(b.substr(0, 9), 10) % 11; return 1985 > e && (h %= 10), h == b.substr(9, 1) }
                return !0
            }
            return !1
        },
        _de: function(b) { return /^DE[0-9]{9}$/.test(b) ? (b = b.substr(2), a.fn.bootstrapValidator.helpers.mod_11_10(b)) : !1 },
        _dk: function(a) {
            if (!/^DK[0-9]{8}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [2, 7, 6, 5, 4, 3, 2, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b % 11 == 0
        },
        _ee: function(a) {
            if (!/^EE[0-9]{9}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [3, 7, 1, 3, 7, 1, 3, 7, 1], d = 0; 9 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b % 10 == 0
        },
        _es: function(a) {
            if (!/^ES[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(a)) return !1;
            a = a.substr(2);
            var b = function(a) { var b = parseInt(a.substr(0, 8), 10); return b = "TRWAGMYFPDXBNJZSQVHLCKE" [b % 23], b == a.substr(8, 1) },
                c = function(a) { var b = ["XYZ".indexOf(a.charAt(0)), a.substr(1)].join(""); return b = parseInt(b, 10), b = "TRWAGMYFPDXBNJZSQVHLCKE" [b % 23], b == a.substr(8, 1) },
                d = function(a) { var b, c = a.charAt(0); if (-1 != "KLM".indexOf(c)) return b = parseInt(a.substr(1, 8), 10), b = "TRWAGMYFPDXBNJZSQVHLCKE" [b % 23], b == a.substr(8, 1); if (-1 != "ABCDEFGHJNPQRSUVW".indexOf(c)) { for (var d = 0, e = [2, 1, 2, 1, 2, 1, 2], f = 0, g = 0; 7 > g; g++) f = parseInt(a.charAt(g + 1)) * e[g], f > 9 && (f = Math.floor(f / 10) + f % 10), d += f; return d = 10 - d % 10, d == a.substr(8, 1) || "JABCDEFGHI" [d] == a.substr(8, 1) } return !1 },
                e = a.charAt(0);
            return /^[0-9]$/.test(e) ? b(a) : /^[XYZ]$/.test(e) ? c(a) : d(a)
        },
        _fi: function(a) {
            if (!/^FI[0-9]{8}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [7, 9, 10, 5, 8, 4, 2, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b % 11 == 0
        },
        _fr: function(b) { if (!/^FR[0-9A-Z]{2}[0-9]{9}$/.test(b)) return !1; if (b = b.substr(2), !a.fn.bootstrapValidator.helpers.luhn(b.substr(2))) return !1; if (/^[0-9]{2}$/.test(b.substr(0, 2))) return b.substr(0, 2) == parseInt(b.substr(2) + "12", 10) % 97; var c, d = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ"; return c = /^[0-9]{1}$/.test(b.charAt(0)) ? 24 * d.indexOf(b.charAt(0)) + d.indexOf(b.charAt(1)) - 10 : 34 * d.indexOf(b.charAt(0)) + d.indexOf(b.charAt(1)) - 100, (parseInt(b.substr(2), 10) + 1 + Math.floor(c / 11)) % 11 == c % 11 },
        _gb: function(a) {
            if (!(/^GB[0-9]{9}$/.test(a) || /^GB[0-9]{12}$/.test(a) || /^GBGD[0-9]{3}$/.test(a) || /^GBHA[0-9]{3}$/.test(a) || /^GB(GD|HA)8888[0-9]{5}$/.test(a))) return !1;
            a = a.substr(2);
            var b = a.length;
            if (5 == b) {
                var c = a.substr(0, 2),
                    d = parseInt(a.substr(2));
                return "GD" == c && 500 > d || "HA" == c && d >= 500
            }
            if (11 == b && ("GD8888" == a.substr(0, 6) || "HA8888" == a.substr(0, 6))) return "GD" == a.substr(0, 2) && parseInt(a.substr(6, 3)) >= 500 || "HA" == a.substr(0, 2) && parseInt(a.substr(6, 3)) < 500 ? !1 : parseInt(a.substr(6, 3)) % 97 == parseInt(a.substr(9, 2));
            if (9 == b || 12 == b) { for (var e = 0, f = [8, 7, 6, 5, 4, 3, 2, 10, 1], g = 0; 9 > g; g++) e += parseInt(a.charAt(g)) * f[g]; return e %= 97, parseInt(a.substr(0, 3)) >= 100 ? 0 == e || 42 == e || 55 == e : 0 == e }
            return !0
        },
        _gr: function(a) {
            if (!/^GR[0-9]{9}$/.test(a)) return !1;
            a = a.substr(2), 8 == a.length && (a = "0" + a);
            for (var b = 0, c = [256, 128, 64, 32, 16, 8, 4, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b = b % 11 % 10, b == a.substr(8, 1)
        },
        _el: function(a) { return /^EL[0-9]{9}$/.test(a) ? (a = "GR" + a.substr(2), this._gr(a)) : !1 },
        _hu: function(a) {
            if (!/^HU[0-9]{8}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [9, 7, 3, 1, 9, 7, 3, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b % 10 == 0
        },
        _hr: function(b) { return /^HR[0-9]{11}$/.test(b) ? (b = b.substr(2), a.fn.bootstrapValidator.helpers.mod_11_10(b)) : !1 },
        _ie: function(a) {
            if (!/^IE[0-9]{1}[0-9A-Z\*\+]{1}[0-9]{5}[A-Z]{1,2}$/.test(a)) return !1;
            a = a.substr(2);
            var b = function(a) { for (; a.length < 7;) a = "0" + a; for (var b = "WABCDEFGHIJKLMNOPQRSTUV", c = 0, d = 0; 7 > d; d++) c += parseInt(a.charAt(d)) * (8 - d); return c += 9 * b.indexOf(a.substr(7)), b[c % 23] };
            return /^[0-9]+$/.test(a.substr(0, 7)) ? a.charAt(7) == b(a.substr(0, 7) + a.substr(8) + "") : -1 != "ABCDEFGHIJKLMNOPQRSTUVWXYZ+*".indexOf(a.charAt(1)) ? a.charAt(7) == b(a.substr(2, 5) + a.substr(0, 1) + "") : !0
        },
        _it: function(b) { if (!/^IT[0-9]{11}$/.test(b)) return !1; if (b = b.substr(2), 0 == parseInt(b.substr(0, 7))) return !1; var c = parseInt(b.substr(7, 3)); return 1 > c || c > 201 && 999 != c && 888 != c ? !1 : a.fn.bootstrapValidator.helpers.luhn(b) },
        _lt: function(a) {
            if (!/^LT([0-9]{7}1[0-9]{1}|[0-9]{10}1[0-9]{1})$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = a.length, c = 0, d = 0; b - 1 > d; d++) c += parseInt(a.charAt(d)) * (1 + d % 9);
            var e = c % 11;
            if (10 == e) { c = 0; for (var d = 0; b - 1 > d; d++) c += parseInt(a.charAt(d)) * (1 + (d + 2) % 9) }
            return e = e % 11 % 10, e == a.charAt(b - 1)
        },
        _lu: function(a) { return /^LU[0-9]{8}$/.test(a) ? (a = a.substr(2), a.substr(0, 6) % 89 == a.substr(6, 2)) : !1 },
        _lv: function(b) {
            if (!/^LV[0-9]{11}$/.test(b)) return !1;
            b = b.substr(2);
            var c = parseInt(b.charAt(0)),
                d = 0,
                e = [],
                f = 0,
                g = b.length;
            if (c > 3) { for (d = 0, e = [9, 1, 4, 8, 3, 10, 2, 5, 7, 6, 1], f = 0; g > f; f++) d += parseInt(b.charAt(f)) * e[f]; return d %= 11, 3 == d }
            var h = parseInt(b.substr(0, 2)),
                i = parseInt(b.substr(2, 2)),
                j = parseInt(b.substr(4, 2));
            if (j = j + 1800 + 100 * parseInt(b.charAt(6)), !a.fn.bootstrapValidator.helpers.date(j, i, h)) return !1;
            for (d = 0, e = [10, 5, 8, 4, 2, 1, 6, 3, 7, 9], f = 0; g - 1 > f; f++) d += parseInt(b.charAt(f)) * e[f];
            return d = (d + 1) % 11 % 10, d == b.charAt(g - 1)
        },
        _mt: function(a) {
            if (!/^MT[0-9]{8}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [3, 4, 6, 7, 8, 9, 10, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b % 37 == 0
        },
        _nl: function(a) {
            if (!/^NL[0-9]{9}B[0-9]{2}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [9, 8, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b %= 11, b > 9 && (b = 0), b == a.substr(8, 1)
        },
        _no: function(a) {
            if (!/^NO[0-9]{9}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [3, 2, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b = 11 - b % 11, 11 == b && (b = 0), b == a.substr(8, 1)
        },
        _pl: function(a) {
            if (!/^PL[0-9]{10}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [6, 5, 7, 2, 3, 4, 5, 6, 7, -1], d = 0; 10 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b % 11 == 0
        },
        _pt: function(a) {
            if (!/^PT[0-9]{9}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [9, 8, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b = 11 - b % 11, b > 9 && (b = 0), b == a.substr(8, 1)
        },
        _ro: function(a) {
            if (!/^RO[1-9][0-9]{1,9}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = a.length, c = [7, 5, 3, 2, 1, 7, 5, 3, 2].slice(10 - b), d = 0, e = 0; b - 1 > e; e++) d += parseInt(a.charAt(e)) * c[e];
            return d = 10 * d % 11 % 10, d == a.substr(b - 1, 1)
        },
        _ru: function(a) { if (!/^RU([0-9]{9}|[0-9]{12})$/.test(a)) return !1; if (a = a.substr(2), 10 == a.length) { for (var b = 0, c = [2, 4, 10, 3, 5, 9, 4, 6, 8, 0], d = 0; 10 > d; d++) b += parseInt(a.charAt(d)) * c[d]; return b %= 11, b > 9 && (b %= 10), b == a.substr(9, 1) } if (12 == a.length) { for (var e = 0, f = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0], g = 0, h = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0], d = 0; 11 > d; d++) e += parseInt(a.charAt(d)) * f[d], g += parseInt(a.charAt(d)) * h[d]; return e %= 11, e > 9 && (e %= 10), g %= 11, g > 9 && (g %= 10), e == a.substr(10, 1) && g == a.substr(11, 1) } return !1 },
        _rs: function(a) {
            if (!/^RS[0-9]{9}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 10, c = 0, d = 0; 8 > d; d++) c = (parseInt(a.charAt(d)) + b) % 10, 0 == c && (c = 10), b = 2 * c % 11;
            return (b + parseInt(a.substr(8, 1))) % 10 == 1
        },
        _se: function(b) { return /^SE[0-9]{10}01$/.test(b) ? (b = b.substr(2, 10), a.fn.bootstrapValidator.helpers.luhn(b)) : !1 },
        _si: function(a) {
            if (!/^SI[0-9]{8}$/.test(a)) return !1;
            a = a.substr(2);
            for (var b = 0, c = [8, 7, 6, 5, 4, 3, 2], d = 0; 7 > d; d++) b += parseInt(a.charAt(d)) * c[d];
            return b = 11 - b % 11, 10 == b && (b = 0), b == a.substr(7, 1)
        },
        _sk: function(a) { return /^SK[1-9][0-9][(2-4)|(6-9)][0-9]{7}$/.test(a) ? (a = a.substr(2), a % 11 == 0) : !1 }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.vin = {
        validate: function(a, b) {
            var c = b.val();
            if ("" == c) return !0;
            if (!/^[a-hj-npr-z0-9]{8}[0-9xX][a-hj-npr-z0-9]{8}$/i.test(c)) return !1;
            c = c.toUpperCase();
            for (var d = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9, S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 0: 0 }, e = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2], f = 0, g = c.length, h = 0; g > h; h++) f += d[c.charAt(h) + ""] * e[h];
            var i = f % 11;
            return 10 == i && (i = "X"), i == c.charAt(8)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.zipCode = {
        html5Attributes: { message: "message", country: "country" },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" == d || !c.country) return !0;
            var e = (c.country || "US").toUpperCase();
            switch (e) {
                case "CA":
                    return /^(?:A|B|C|E|G|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}(?:A|B|C|E|G|J|K|L|M|N|P|R|S|T|V|X|Y){1}\s?[0-9]{1}(?:A|B|C|E|G|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}$/i.test(d);
                case "DK":
                    return /^(DK(-|\s)?)?\d{4}$/i.test(d);
                case "GB":
                    return this._gb(d);
                case "IT":
                    return /^(I-|IT-)?\d{5}$/i.test(d);
                case "NL":
                    return /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i.test(d);
                case "SE":
                    return /^(S-)?\d{3}\s?\d{2}$/i.test(d);
                case "US":
                default:
                    return /^\d{4,5}([\-]\d{4})?$/.test(d)
            }
        },
        _gb: function(a) {
            for (var b = "[ABCDEFGHIJKLMNOPRSTUWYZ]", c = "[ABCDEFGHKLMNOPQRSTUVWXY]", d = "[ABCDEFGHJKPMNRSTUVWXY]", e = "[ABEHMNPRVWXY]", f = "[ABDEFGHJLNPQRSTUWXYZ]", g = [new RegExp("^(" + b + "{1}" + c + "?[0-9]{1,2})(\\s*)([0-9]{1}" + f + "{2})$", "i"), new RegExp("^(" + b + "{1}[0-9]{1}" + d + "{1})(\\s*)([0-9]{1}" + f + "{2})$", "i"), new RegExp("^(" + b + "{1}" + c + "{1}?[0-9]{1}" + e + "{1})(\\s*)([0-9]{1}" + f + "{2})$", "i"), new RegExp("^(BF1)(\\s*)([0-6]{1}[ABDEFGHJLNPQRST]{1}[ABDEFGHJLNPQRSTUWZYZ]{1})$", "i"), /^(GIR)(\s*)(0AA)$/i, /^(BFPO)(\s*)([0-9]{1,4})$/i, /^(BFPO)(\s*)(c\/o\s*[0-9]{1,3})$/i, /^([A-Z]{4})(\s*)(1ZZ)$/i, /^(AI-2640)$/i], h = 0; h < g.length; h++)
                if (g[h].test(a)) return !0;
            return !1
        }
    }
}(window.jQuery);


/*! jQuery Validation Plugin - v1.16.0 - 12/2/2016
 * http://jqueryvalidation.org/
 * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
! function(a) { "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery) }(function(a) {
    a.extend(a.fn, {
        validate: function(b) {
            if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function(b) { c.settings.submitHandler && (c.submitButton = b.target), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0) }), this.on("submit.validate", function(b) {
                function d() { var d, e; return !c.settings.submitHandler || (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), void 0 !== e && e) }
                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
            })), c)
        },
        valid: function() { var b, c, d; return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function() { b = c.element(this) && b, b || (d = d.concat(c.errorList)) }), c.errorList = d), b },
        rules: function(b, c) {
            var d, e, f, g, h, i, j = this[0];
            if (null != j && null != j.form) {
                if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                    case "add":
                        a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                        break;
                    case "remove":
                        return c ? (i = {}, a.each(c.split(/\s/), function(b, c) { i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required") }), i) : (delete e[j.name], f)
                }
                return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({ required: h }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, { remote: h })), g
            }
        }
    }), a.extend(a.expr.pseudos || a.expr[":"], { blank: function(b) { return !a.trim("" + a(b).val()) }, filled: function(b) { var c = a(b).val(); return null !== c && !!a.trim("" + c) }, unchecked: function(b) { return !a(b).prop("checked") } }), a.validator = function(b, c) { this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init() }, a.validator.format = function(b, c) { return 1 === arguments.length ? function() { var c = a.makeArray(arguments); return c.unshift(b), a.validator.format.apply(this, c) } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) { b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() { return c }) }), b) }, a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(a) { this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a))) },
            onfocusout: function(a) { this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a) },
            onkeyup: function(b, c) {
                var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === c.which && "" === this.elementValue(b) || a.inArray(c.keyCode, d) !== -1 || (b.name in this.submitted || b.name in this.invalid) && this.element(b)
            },
            onclick: function(a) { a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode) },
            highlight: function(b, c, d) { "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d) },
            unhighlight: function(b, c, d) { "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d) }
        },
        setDefaults: function(b) { a.extend(a.validator.defaults, b) },
        messages: { required: "This field is required.", remote: "Please fix this field.", email: "Please enter a valid email address.", url: "Please enter a valid URL.", date: "Please enter a valid date.", dateISO: "Please enter a valid date (ISO).", number: "Please enter a valid number.", digits: "Please enter only digits.", equalTo: "Please enter the same value again.", maxlength: a.validator.format("Please enter no more than {0} characters."), minlength: a.validator.format("Please enter at least {0} characters."), rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."), range: a.validator.format("Please enter a value between {0} and {1}."), max: a.validator.format("Please enter a value less than or equal to {0}."), min: a.validator.format("Please enter a value greater than or equal to {0}."), step: a.validator.format("Please enter a multiple of {0}.") },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function b(b) {
                    !this.form && this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]);
                    var c = a.data(this.form, "validator"),
                        d = "on" + b.type.replace(/^validate/, ""),
                        e = c.settings;
                    e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b)
                }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var c, d = this.groups = {};
                a.each(this.settings.groups, function(b, c) { "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) { d[c] = b }) }), c = this.settings.rules, a.each(c, function(b, d) { c[b] = a.validator.normalizeRule(d) }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() { return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid() },
            checkForm: function() { this.prepareForm(); for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]); return this.valid() },
            element: function(b) {
                var c, d, e = this.clean(b),
                    f = this.validationTargetFor(e),
                    g = this,
                    h = !0;
                return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function(a, b) { b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = g.check(e) && h)) }), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h
            },
            showErrors: function(b) {
                if (b) {
                    var c = this;
                    a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function(a, b) { return { message: a, element: c.findByName(b)[0] } }), this.successList = a.grep(this.successList, function(a) { return !(a.name in b) })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(b)
            },
            resetElements: function(a) {
                var b;
                if (this.settings.unhighlight)
                    for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
                else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            },
            numberOfInvalids: function() { return this.objectLength(this.invalid) },
            objectLength: function(a) { var b, c = 0; for (b in a) a[b] && c++; return c },
            hideErrors: function() { this.hideThese(this.toHide) },
            hideThese: function(a) { a.not(this.containers).text(""), this.addWrapper(a).hide() },
            valid: function() { return 0 === this.size() },
            size: function() { return this.errorList.length },
            focusInvalid: function() { if (this.settings.focusInvalid) try { a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin") } catch (b) {} },
            findLastActive: function() { var b = this.lastActive; return b && 1 === a.grep(this.errorList, function(a) { return a.element.name === b.name }).length && b },
            elements: function() {
                var b = this,
                    c = {};
                return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() { var d = this.name || a(this).attr("name"); return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]), !(d in c || !b.objectLength(a(this).rules())) && (c[d] = !0, !0) })
            },
            clean: function(b) { return a(b)[0] },
            errors: function() { var b = this.settings.errorClass.split(" ").join("."); return a(this.settings.errorElement + "." + b, this.errorContext) },
            resetInternals: function() { this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]) },
            reset: function() { this.resetInternals(), this.currentElements = a([]) },
            prepareForm: function() { this.reset(), this.toHide = this.errors().add(this.containers) },
            prepareElement: function(a) { this.reset(), this.toHide = this.errorsFor(a) },
            elementValue: function(b) {
                var c, d, e = a(b),
                    f = b.type;
                return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = b.hasAttribute("contenteditable") ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c)
            },
            check: function(b) {
                b = this.validationTargetFor(this.clean(b));
                var c, d, e, f = a(b).rules(),
                    g = a.map(f, function(a, b) { return b }).length,
                    h = !1,
                    i = this.elementValue(b);
                if ("function" == typeof f.normalizer) {
                    if (i = f.normalizer.call(b, i), "string" != typeof i) throw new TypeError("The normalizer should return a string value.");
                    delete f.normalizer
                }
                for (d in f) { e = { method: d, parameters: f[d] }; try { if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) { h = !0; continue } if (h = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b))); if (!c) return this.formatAndAdd(b, e), !1 } catch (j) { throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), j } }
                if (!h) return this.objectLength(f) && this.successList.push(b), !0
            },
            customDataMessage: function(b, c) { return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg") },
            customMessage: function(a, b) { var c = this.settings.messages[a]; return c && (c.constructor === String ? c : c[b]) },
            findDefined: function() {
                for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a]
            },
            defaultMessage: function(b, c) {
                "string" == typeof c && (c = { method: c });
                var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"),
                    e = /\$?\{(\d+)\}/g;
                return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d
            },
            formatAndAdd: function(a, b) {
                var c = this.defaultMessage(a, b);
                this.errorList.push({ message: c, element: a, method: b.method }), this.errorMap[a.name] = c, this.submitted[a.name] = c
            },
            addWrapper: function(a) { return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a },
            defaultShowErrors: function() {
                var a, b, c;
                for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() { return this.currentElements.not(this.invalidElements()) },
            invalidElements: function() { return a(this.errorList).map(function() { return this.element }) },
            showLabel: function(b, c) {
                var d, e, f, g, h = this.errorsFor(b),
                    i = this.idOrName(b),
                    j = a(b).attr("aria-describedby");
                h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function(b, c) { c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id")) })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h)
            },
            errorsFor: function(b) {
                var c = this.escapeCssMeta(this.idOrName(b)),
                    d = a(b).attr("aria-describedby"),
                    e = "label[for='" + c + "'], label[for='" + c + "'] *";
                return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e)
            },
            escapeCssMeta: function(a) { return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1") },
            idOrName: function(a) { return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name) },
            validationTargetFor: function(b) { return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0] },
            checkable: function(a) { return /radio|checkbox/i.test(a.type) },
            findByName: function(b) { return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']") },
            getLength: function(b, c) {
                switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                }
                return b.length
            },
            depend: function(a, b) { return !this.dependTypes[typeof a] || this.dependTypes[typeof a](a, b) },
            dependTypes: { "boolean": function(a) { return a }, string: function(b, c) { return !!a(b, c.form).length }, "function": function(a, b) { return a(b) } },
            optional: function(b) { var c = this.elementValue(b); return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch" },
            startRequest: function(b) { this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0) },
            stopRequest: function(b, c) { this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1) },
            previousValue: function(b, c) { return c = "string" == typeof c && c || "remote", a.data(b, "previousValue") || a.data(b, "previousValue", { old: null, valid: !0, message: this.defaultMessage(b, { method: c }) }) },
            destroy: function() { this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur") }
        },
        classRuleSettings: { required: { required: !0 }, email: { email: !0 }, url: { url: !0 }, date: { date: !0 }, dateISO: { dateISO: !0 }, number: { number: !0 }, digits: { digits: !0 }, creditcard: { creditcard: !0 } },
        addClassRules: function(b, c) { b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b) },
        classRules: function(b) {
            var c = {},
                d = a(b).attr("class");
            return d && a.each(d.split(" "), function() { this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this]) }), c
        },
        normalizeAttributeRule: function(a, b, c, d) { /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0) },
        attributeRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);
            return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
        },
        dataRules: function(b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d);
            return e
        },
        staticRules: function(b) {
            var c = {},
                d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
        },
        normalizeRules: function(b, c) {
            return a.each(b, function(d, e) {
                if (e === !1) return void delete b[d];
                if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!a(e.depends, c.form).length;
                            break;
                        case "function":
                            f = e.depends.call(c, c)
                    }
                    f ? b[d] = void 0 === e.param || e.param : (a.data(c.form, "validator").resetElements(a(c)), delete b[d])
                }
            }), a.each(b, function(d, e) { b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e }), a.each(["minlength", "maxlength"], function() { b[this] && (b[this] = Number(b[this])) }), a.each(["rangelength", "range"], function() {
                var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]))
            }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b
        },
        normalizeRule: function(b) {
            if ("string" == typeof b) {
                var c = {};
                a.each(b.split(/\s/), function() { c[this] = !0 }), b = c
            }
            return b
        },
        addMethod: function(b, c, d) { a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b)) },
        methods: {
            required: function(b, c, d) { if (!this.depend(d, c)) return "dependency-mismatch"; if ("select" === c.nodeName.toLowerCase()) { var e = a(c).val(); return e && e.length > 0 } return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0 },
            email: function(a, b) { return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a) },
            url: function(a, b) { return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a) },
            date: function(a, b) { return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString()) },
            dateISO: function(a, b) { return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a) },
            number: function(a, b) { return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a) },
            digits: function(a, b) { return this.optional(b) || /^\d+$/.test(a) },
            minlength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e >= d },
            maxlength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e <= d },
            rangelength: function(b, c, d) { var e = a.isArray(b) ? b.length : this.getLength(b, c); return this.optional(c) || e >= d[0] && e <= d[1] },
            min: function(a, b, c) { return this.optional(b) || a >= c },
            max: function(a, b, c) { return this.optional(b) || a <= c },
            range: function(a, b, c) { return this.optional(b) || a >= c[0] && a <= c[1] },
            step: function(b, c, d) {
                var e, f = a(c).attr("type"),
                    g = "Step attribute on input type " + f + " is not supported.",
                    h = ["text", "number", "range"],
                    i = new RegExp("\\b" + f + "\\b"),
                    j = f && !i.test(h.join()),
                    k = function(a) { var b = ("" + a).match(/(?:\.(\d+))?$/); return b && b[1] ? b[1].length : 0 },
                    l = function(a) { return Math.round(a * Math.pow(10, e)) },
                    m = !0;
                if (j) throw new Error(g);
                return e = k(d), (k(b) > e || l(b) % l(d) !== 0) && (m = !1), this.optional(c) || m
            },
            equalTo: function(b, c, d) { var e = a(d); return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() { a(c).valid() }), b === e.val() },
            remote: function(b, c, d, e) {
                if (this.optional(c)) return "dependency-mismatch";
                e = "string" == typeof e && e || "remote";
                var f, g, h, i = this.previousValue(c, e);
                return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && { url: d } || d, h = a.param(a.extend({ data: b }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, {
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: g,
                    context: f.currentForm,
                    success: function(a) {
                        var d, g, h, j = a === !0 || "true" === a;
                        f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, { method: e, parameters: b }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j)
                    }
                }, d)), "pending")
            }
        }
    });
    var b, c = {};
    return a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, d) { var e = a.port; "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d) }) : (b = a.ajax, a.ajax = function(d) {
        var e = ("mode" in d ? d : a.ajaxSettings).mode,
            f = ("port" in d ? d : a.ajaxSettings).port;
        return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments)
    }), a
});


/**
 * menu-aim is a jQuery plugin for dropdown menus that can differentiate
 * between a user trying hover over a dropdown item vs trying to navigate into
 * a submenu's contents.
 *
 * menu-aim assumes that you have are using a menu with submenus that expand
 * to the menu's right. It will fire events when the user's mouse enters a new
 * dropdown item *and* when that item is being intentionally hovered over.
 *
 * __________________________
 * | Monkeys  >|   Gorilla  |
 * | Gorillas >|   Content  |
 * | Chimps   >|   Here     |
 * |___________|____________|
 *
 * In the above example, "Gorillas" is selected and its submenu content is
 * being shown on the right. Imagine that the user's cursor is hovering over
 * "Gorillas." When they move their mouse into the "Gorilla Content" area, they
 * may briefly hover over "Chimps." This shouldn't close the "Gorilla Content"
 * area.
 *
 * This problem is normally solved using timeouts and delays. menu-aim tries to
 * solve this by detecting the direction of the user's mouse movement. This can
 * make for quicker transitions when navigating up and down the menu. The
 * experience is hopefully similar to amazon.com/'s "Shop by Department"
 * dropdown.
 *
 * Use like so:
 *
 *      $("#menu").menuAim({
 *          activate: $.noop,  // fired on row activation
 *          deactivate: $.noop  // fired on row deactivation
 *      });
 *
 *  ...to receive events when a menu's row has been purposefully (de)activated.
 *
 * The following options can be passed to menuAim. All functions execute with
 * the relevant row's HTML element as the execution context ('this'):
 *
 *      .menuAim({
 *          // Function to call when a row is purposefully activated. Use this
 *          // to show a submenu's content for the activated row.
 *          activate: function() {},
 *
 *          // Function to call when a row is deactivated.
 *          deactivate: function() {},
 *
 *          // Function to call when mouse enters a menu row. Entering a row
 *          // does not mean the row has been activated, as the user may be
 *          // mousing over to a submenu.
 *          enter: function() {},
 *
 *          // Function to call when mouse exits a menu row.
 *          exit: function() {},
 *
 *          // Selector for identifying which elements in the menu are rows
 *          // that can trigger the above events. Defaults to "> li".
 *          rowSelector: "> li",
 *
 *          // You may have some menu rows that aren't submenus and therefore
 *          // shouldn't ever need to "activate." If so, filter submenu rows w/
 *          // this selector. Defaults to "*" (all elements).
 *          submenuSelector: "*",
 *
 *          // Direction the submenu opens relative to the main menu. Can be
 *          // left, right, above, or below. Defaults to "right".
 *          submenuDirection: "right"
 *      });
 *
 * https://github.com/kamens/jQuery-menu-aim
 * MIT License
 */
(function($) {

    $.fn.menuAim = function(opts) {
        // Initialize menu-aim for all elements in jQuery collection
        this.each(function() {
            init.call(this, opts);
        });

        return this;
    };

    function init(opts) {
        var $menu = $(this),
            activeRow = null,
            mouseLocs = [],
            lastDelayLoc = null,
            timeoutId = null,
            options = $.extend({
                rowSelector: "> li",
                submenuSelector: "*",
                submenuDirection: "right",
                tolerance: 75, // bigger = more forgivey when entering submenu
                enter: $.noop,
                exit: $.noop,
                activate: $.noop,
                deactivate: $.noop,
                exitMenu: $.noop
            }, opts);

        var MOUSE_LOCS_TRACKED = 3, // number of past mouse locations to track
            DELAY = 300; // ms delay when user appears to be entering submenu

        /**
         * Keep track of the last few locations of the mouse.
         */
        var mousemoveDocument = function(e) {
            mouseLocs.push({ x: e.pageX, y: e.pageY });

            if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
                mouseLocs.shift();
            }
        };

        /**
         * Cancel possible row activations when leaving the menu entirely
         */
        var mouseleaveMenu = function() {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // If exitMenu is supplied and returns true, deactivate the
            // currently active row on menu exit.
            if (options.exitMenu(this)) {
                if (activeRow) {
                    options.deactivate(activeRow);
                }

                activeRow = null;
            }
        };

        /**
         * Trigger a possible row activation whenever entering a new row.
         */
        var mouseenterRow = function() {
                if (timeoutId) {
                    // Cancel any previous activation delays
                    clearTimeout(timeoutId);
                }

                options.enter(this);
                possiblyActivate(this);
            },
            mouseleaveRow = function() {
                options.exit(this);
            };

        /*
         * Immediately activate a row if the user clicks on it.
         */
        var clickRow = function() {
            activate(this);
        };

        /**
         * Activate a menu row.
         */
        var activate = function(row) {
            if (row == activeRow) {
                return;
            }

            if (activeRow) {
                options.deactivate(activeRow);
            }

            options.activate(row);
            activeRow = row;
        };

        /**
         * Possibly activate a menu row. If mouse movement indicates that we
         * shouldn't activate yet because user may be trying to enter
         * a submenu's content, then delay and check again later.
         */
        var possiblyActivate = function(row) {
            var delay = activationDelay();

            if (delay) {
                timeoutId = setTimeout(function() {
                    possiblyActivate(row);
                }, delay);
            } else {
                activate(row);
            }
        };

        /**
         * Return the amount of time that should be used as a delay before the
         * currently hovered row is activated.
         *
         * Returns 0 if the activation should happen immediately. Otherwise,
         * returns the number of milliseconds that should be delayed before
         * checking again to see if the row should be activated.
         */
        var activationDelay = function() {
            if (!activeRow || !$(activeRow).is(options.submenuSelector)) {
                // If there is no other submenu row already active, then
                // go ahead and activate immediately.
                return 0;
            }

            var offset = $menu.offset(),
                upperLeft = {
                    x: offset.left,
                    y: offset.top - options.tolerance
                },
                upperRight = {
                    x: offset.left + $menu.outerWidth(),
                    y: upperLeft.y
                },
                lowerLeft = {
                    x: offset.left,
                    y: offset.top + $menu.outerHeight() + options.tolerance
                },
                lowerRight = {
                    x: offset.left + $menu.outerWidth(),
                    y: lowerLeft.y
                },
                loc = mouseLocs[mouseLocs.length - 1],
                prevLoc = mouseLocs[0];

            if (!loc) {
                return 0;
            }

            if (!prevLoc) {
                prevLoc = loc;
            }

            if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x ||
                prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
                // If the previous mouse location was outside of the entire
                // menu's bounds, immediately activate.
                return 0;
            }

            if (lastDelayLoc &&
                loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
                // If the mouse hasn't moved since the last time we checked
                // for activation status, immediately activate.
                return 0;
            }

            // Detect if the user is moving towards the currently activated
            // submenu.
            //
            // If the mouse is heading relatively clearly towards
            // the submenu's content, we should wait and give the user more
            // time before activating a new row. If the mouse is heading
            // elsewhere, we can immediately activate a new row.
            //
            // We detect this by calculating the slope formed between the
            // current mouse location and the upper/lower right points of
            // the menu. We do the same for the previous mouse location.
            // If the current mouse location's slopes are
            // increasing/decreasing appropriately compared to the
            // previous's, we know the user is moving toward the submenu.
            //
            // Note that since the y-axis increases as the cursor moves
            // down the screen, we are looking for the slope between the
            // cursor and the upper right corner to decrease over time, not
            // increase (somewhat counterintuitively).
            function slope(a, b) {
                return (b.y - a.y) / (b.x - a.x);
            };

            var decreasingCorner = upperRight,
                increasingCorner = lowerRight;

            // Our expectations for decreasing or increasing slope values
            // depends on which direction the submenu opens relative to the
            // main menu. By default, if the menu opens on the right, we
            // expect the slope between the cursor and the upper right
            // corner to decrease over time, as explained above. If the
            // submenu opens in a different direction, we change our slope
            // expectations.
            if (options.submenuDirection == "left") {
                decreasingCorner = lowerLeft;
                increasingCorner = upperLeft;
            } else if (options.submenuDirection == "below") {
                decreasingCorner = lowerRight;
                increasingCorner = lowerLeft;
            } else if (options.submenuDirection == "above") {
                decreasingCorner = upperLeft;
                increasingCorner = upperRight;
            }

            var decreasingSlope = slope(loc, decreasingCorner),
                increasingSlope = slope(loc, increasingCorner),
                prevDecreasingSlope = slope(prevLoc, decreasingCorner),
                prevIncreasingSlope = slope(prevLoc, increasingCorner);

            if (decreasingSlope < prevDecreasingSlope &&
                increasingSlope > prevIncreasingSlope) {
                // Mouse is moving from previous location towards the
                // currently activated submenu. Delay before activating a
                // new menu row, because user may be moving into submenu.
                lastDelayLoc = loc;
                return DELAY;
            }

            lastDelayLoc = null;
            return 0;
        };

        /**
         * Hook up initial menu events
         */
        $menu
            .mouseleave(mouseleaveMenu)
            .find(options.rowSelector)
            .mouseenter(mouseenterRow)
            .mouseleave(mouseleaveRow)
            .click(clickRow);

        $(document).mousemove(mousemoveDocument);

    };
})(jQuery);



//---------------------masonry-------------
! function(t, n) { "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : t.Macy = n() }(this, function() {
    "use strict";

    function t(t, n) { var e = void 0; return function() { e && clearTimeout(e), e = setTimeout(t, n) } }

    function n(t, n) { for (var e = t.length, r = e, o = []; e--;) o.push(n(t[r - e - 1])); return o }

    function e(t, n) {
        var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
        if (window.Promise) return A(t, n, e);
        t.recalculate(!0, !0)
    }

    function r(t) {
        for (var n = t.options, e = t.responsiveOptions, r = t.keys, o = t.docWidth, i = void 0, s = 0; s < r.length; s++) {
            var a = parseInt(r[s], 10);
            o >= a && (i = n.breakAt[a], O(i, e))
        }
        return e
    }

    function o(t) {
        for (var n = t.options, e = t.responsiveOptions, r = t.keys, o = t.docWidth, i = void 0, s = r.length - 1; s >= 0; s--) {
            var a = parseInt(r[s], 10);
            o <= a && (i = n.breakAt[a], O(i, e))
        }
        return e
    }

    function i(t) {
        var n = t.useContainerForBreakpoints ? t.container.clientWidth : window.innerWidth,
            e = { columns: t.columns };
        b(t.margin) ? e.margin = { x: t.margin.x, y: t.margin.y } : e.margin = { x: t.margin, y: t.margin };
        var i = Object.keys(t.breakAt);
        return t.mobileFirst ? r({ options: t, responsiveOptions: e, keys: i, docWidth: n }) : o({ options: t, responsiveOptions: e, keys: i, docWidth: n })
    }

    function s(t) { return i(t).columns }

    function a(t) { return i(t).margin }

    function c(t) {
        var n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
            e = s(t),
            r = a(t).x,
            o = 100 / e;
        if (!n) return o;
        if (1 === e) return "100%";
        var i = "px";
        if ("string" == typeof r) {
            var c = parseFloat(r);
            i = r.replace(c, ""), r = c
        }
        return r = (e - 1) * r / e, "%" === i ? o - r + "%" : "calc(" + o + "% - " + r + i + ")"
    }

    function u(t, n) {
        var e = s(t.options),
            r = 0,
            o = void 0,
            i = void 0;
        if (1 === ++n) return 0;
        i = a(t.options).x;
        var u = "px";
        if ("string" == typeof i) {
            var l = parseFloat(i, 10);
            u = i.replace(l, ""), i = l
        }
        return o = (i - (e - 1) * i / e) * (n - 1), r += c(t.options, !1) * (n - 1), "%" === u ? r + o + "%" : "calc(" + r + "% + " + o + u + ")"
    }

    function l(t) {
        var n = 0,
            e = t.container,
            r = t.rows;
        v(r, function(t) { n = t > n ? t : n }), e.style.height = n + "px"
    }

    function p(t, n) {
        var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            o = s(t.options),
            i = a(t.options).y;
        M(t, o, e), v(n, function(n) {
            var e = 0,
                o = parseInt(n.offsetHeight, 10);
            isNaN(o) || (t.rows.forEach(function(n, r) { n < t.rows[e] && (e = r) }), n.style.position = "absolute", n.style.top = t.rows[e] + "px", n.style.left = "" + t.cols[e], t.rows[e] += isNaN(o) ? 0 : o + i, r && (n.dataset.macyComplete = 1))
        }), r && (t.tmpRows = null), l(t)
    }

    function f(t, n) {
        var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            r = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            o = s(t.options),
            i = a(t.options).y;
        M(t, o, e), v(n, function(n) {
            t.lastcol === o && (t.lastcol = 0);
            var e = C(n, "height");
            e = parseInt(n.offsetHeight, 10), isNaN(e) || (n.style.position = "absolute", n.style.top = t.rows[t.lastcol] + "px", n.style.left = "" + t.cols[t.lastcol], t.rows[t.lastcol] += isNaN(e) ? 0 : e + i, t.lastcol += 1, r && (n.dataset.macyComplete = 1))
        }), r && (t.tmpRows = null), l(t)
    }
    var h = function t(n, e) {
        if (!(this instanceof t)) return new t(n, e);
        if (n && n.nodeName) return n;
        if (n = n.replace(/^\s*/, "").replace(/\s*$/, ""), e) return this.byCss(n, e);
        for (var r in this.selectors)
            if (e = r.split("/"), new RegExp(e[1], e[2]).test(n)) return this.selectors[r](n);
        return this.byCss(n)
    };
    h.prototype.byCss = function(t, n) { return (n || document).querySelectorAll(t) }, h.prototype.selectors = {}, h.prototype.selectors[/^\.[\w\-]+$/] = function(t) { return document.getElementsByClassName(t.substring(1)) }, h.prototype.selectors[/^\w+$/] = function(t) { return document.getElementsByTagName(t) }, h.prototype.selectors[/^\#[\w\-]+$/] = function(t) { return document.getElementById(t.substring(1)) };
    var v = function(t, n) { for (var e = t.length, r = e; e--;) n(t[r - e - 1]) },
        m = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this.running = !1, this.events = [], this.add(t)
        };
    m.prototype.run = function() {
        if (!this.running && this.events.length > 0) {
            var t = this.events.shift();
            this.running = !0, t(), this.running = !1, this.run()
        }
    }, m.prototype.add = function() {
        var t = this,
            n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return !!n && (Array.isArray(n) ? v(n, function(n) { return t.add(n) }) : (this.events.push(n), void this.run()))
    }, m.prototype.clear = function() { this.events = [] };
    var d = function(t) { var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}; return this.instance = t, this.data = n, this },
        y = function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this.events = {}, this.instance = t
        };
    y.prototype.on = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        return !(!t || !n) && (Array.isArray(this.events[t]) || (this.events[t] = []), this.events[t].push(n))
    }, y.prototype.emit = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        if (!t || !Array.isArray(this.events[t])) return !1;
        var e = new d(this.instance, n);
        v(this.events[t], function(t) { return t(e) })
    };
    var g = function(t) { return !("naturalHeight" in t && t.naturalHeight + t.naturalWidth === 0) || t.width + t.height !== 0 },
        E = function(t, n) {
            var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            return new Promise(function(t, e) {
                if (n.complete) return g(n) ? t(n) : e(n);
                n.addEventListener("load", function() { return g(n) ? t(n) : e(n) }), n.addEventListener("error", function() { return e(n) })
            }).then(function(n) { e && t.emit(t.constants.EVENT_IMAGE_LOAD, { img: n }) }).catch(function(n) { return t.emit(t.constants.EVENT_IMAGE_ERROR, { img: n }) })
        },
        w = function(t, e) { var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]; return n(e, function(n) { return E(t, n, r) }) },
        A = function(t, n) { var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]; return Promise.all(w(t, n, e)).then(function() { t.emit(t.constants.EVENT_IMAGE_COMPLETE) }) },
        I = function(n) { return t(function() { n.emit(n.constants.EVENT_RESIZE), n.queue.add(function() { return n.recalculate(!0, !0) }) }, 100) },
        N = function(t) {
            if (t.container = h(t.options.container), t.container instanceof h || !t.container) return !!t.options.debug && console.error("Error: Container not found");
            t.container.length && (t.container = t.container[0]), t.options.container = t.container, t.container.style.position = "relative"
        },
        T = function(t) { t.queue = new m, t.events = new y(t), t.rows = [], t.resizer = I(t) },
        L = function(t) {
            var n = h("img", t.container);
            window.addEventListener("resize", t.resizer), t.on(t.constants.EVENT_IMAGE_LOAD, function() { return t.recalculate(!1, !1) }), t.on(t.constants.EVENT_IMAGE_COMPLETE, function() { return t.recalculate(!0, !0) }), t.options.useOwnImageLoader || e(t, n, !t.options.waitForImages), t.emit(t.constants.EVENT_INITIALIZED)
        },
        _ = function(t) { N(t), T(t), L(t) },
        b = function(t) { return t === Object(t) && "[object Array]" !== Object.prototype.toString.call(t) },
        O = function(t, n) { b(t) || (n.columns = t), b(t) && t.columns && (n.columns = t.columns), b(t) && t.margin && !b(t.margin) && (n.margin = { x: t.margin, y: t.margin }), b(t) && t.margin && b(t.margin) && t.margin.x && (n.margin.x = t.margin.x), b(t) && t.margin && b(t.margin) && t.margin.y && (n.margin.y = t.margin.y) },
        C = function(t, n) { return window.getComputedStyle(t, null).getPropertyValue(n) },
        M = function(t, n) { var e = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]; if (t.lastcol || (t.lastcol = 0), t.rows.length < 1 && (e = !0), e) { t.rows = [], t.cols = [], t.lastcol = 0; for (var r = n - 1; r >= 0; r--) t.rows[r] = 0, t.cols[r] = u(t, r) } else if (t.tmpRows) { t.rows = []; for (var r = n - 1; r >= 0; r--) t.rows[r] = t.tmpRows[r] } else { t.tmpRows = []; for (var r = n - 1; r >= 0; r--) t.tmpRows[r] = t.rows[r] } },
        V = function(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                e = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                r = n ? t.container.children : h(':scope > *:not([data-macy-complete="1"])', t.container);
            r = Array.from(r).filter(function(t) { return null !== t.offsetParent });
            var o = c(t.options);
            return v(r, function(t) { n && (t.dataset.macyComplete = 0), t.style.width = o }), t.options.trueOrder ? (f(t, r, n, e), t.emit(t.constants.EVENT_RECALCULATED)) : (p(t, r, n, e), t.emit(t.constants.EVENT_RECALCULATED))
        },
        R = function() { return !!window.Promise },
        x = Object.assign || function(t) { for (var n = 1; n < arguments.length; n++) { var e = arguments[n]; for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]) } return t };
    Array.from || (Array.from = function(t) { for (var n = 0, e = []; n < t.length;) e.push(t[n++]); return e });
    var k = { columns: 4, margin: 2, trueOrder: !1, waitForImages: !1, useImageLoader: !0, breakAt: {}, useOwnImageLoader: !1, onInit: !1, cancelLegacy: !1, useContainerForBreakpoints: !1 };
    ! function() {
        try { document.createElement("a").querySelector(":scope *") } catch (t) {
            ! function() {
                function t(t) {
                    return function(e) {
                        if (e && n.test(e)) {
                            var r = this.getAttribute("id");
                            r || (this.id = "q" + Math.floor(9e6 * Math.random()) + 1e6), arguments[0] = e.replace(n, "#" + this.id);
                            var o = t.apply(this, arguments);
                            return null === r ? this.removeAttribute("id") : r || (this.id = r), o
                        }
                        return t.apply(this, arguments)
                    }
                }
                var n = /:scope\b/gi,
                    e = t(Element.prototype.querySelector);
                Element.prototype.querySelector = function(t) { return e.apply(this, arguments) };
                var r = t(Element.prototype.querySelectorAll);
                Element.prototype.querySelectorAll = function(t) { return r.apply(this, arguments) }
            }()
        }
    }();
    var q = function t() {
        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : k;
        if (!(this instanceof t)) return new t(n);
        this.options = {}, x(this.options, k, n), this.options.cancelLegacy && !R() || _(this)
    };
    return q.init = function(t) { return console.warn("Depreciated: Macy.init will be removed in v3.0.0 opt to use Macy directly like so Macy({ /*options here*/ }) "), new q(t) }, q.prototype.recalculateOnImageLoad = function() { var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; return e(this, h("img", this.container), !t) }, q.prototype.runOnImageLoad = function(t) {
        var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = h("img", this.container);
        return this.on(this.constants.EVENT_IMAGE_COMPLETE, t), n && this.on(this.constants.EVENT_IMAGE_LOAD, t), e(this, r, n)
    }, q.prototype.recalculate = function() {
        var t = this,
            n = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
        return e && this.queue.clear(), this.queue.add(function() { return V(t, n, e) })
    }, q.prototype.remove = function() { window.removeEventListener("resize", this.resizer), v(this.container.children, function(t) { t.removeAttribute("data-macy-complete"), t.removeAttribute("style") }), this.container.removeAttribute("style") }, q.prototype.reInit = function() { this.recalculate(!0, !0), this.emit(this.constants.EVENT_INITIALIZED), window.addEventListener("resize", this.resizer), this.container.style.position = "relative" }, q.prototype.on = function(t, n) { this.events.on(t, n) }, q.prototype.emit = function(t, n) { this.events.emit(t, n) }, q.constants = { EVENT_INITIALIZED: "macy.initialized", EVENT_RECALCULATED: "macy.recalculated", EVENT_IMAGE_LOAD: "macy.image.load", EVENT_IMAGE_ERROR: "macy.image.error", EVENT_IMAGE_COMPLETE: "macy.images.complete", EVENT_RESIZE: "macy.resize" }, q.prototype.constants = q.constants, q
});

// ----------------- COUNTER
$('.countfect').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-num');
    delayTo = $this.attr('delay');
    if (!delayTo) { delayTo = 8000 }
    $({ countNum: $this.text() }).animate({ countNum: countTo }, { duration: delayTo, easing: 'linear', step: function() { $this.text(Math.floor(this.countNum)); }, complete: function() { $this.text(this.countNum); } });
});


/*  jQuery Nice Select - v1.0
    https://github.com/hernansartorio/jquery-nice-select
    Made by HernÃ¡n Sartorio  */
! function(e) {
    e.fn.niceSelect = function(t) {
        function s(t) {
            t.after(e("<div></div>").addClass("nice-select").addClass(t.attr("class") || "").addClass(t.attr("disabled") ? "disabled" : "").attr("tabindex", t.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>'));
            var s = t.next(),
                n = t.find("option"),
                i = t.find("option:selected");
            s.find(".current").html(i.data("display") || i.text()), n.each(function(t) {
                var n = e(this),
                    i = n.data("display");
                s.find("ul").append(e("<li></li>").attr("data-value", n.val()).attr("data-display", i || null).addClass("option" + (n.is(":selected") ? " selected" : "") + (n.is(":disabled") ? " disabled" : "")).html(n.text()))
            })
        }
        if ("string" == typeof t) return "update" == t ? this.each(function() {
            var t = e(this),
                n = e(this).next(".nice-select"),
                i = n.hasClass("open");
            n.length && (n.remove(), s(t), i && t.next().trigger("click"))
        }) : "destroy" == t ? (this.each(function() {
            var t = e(this),
                s = e(this).next(".nice-select");
            s.length && (s.remove(), t.css("display", ""))
        }), 0 == e(".nice-select").length && e(document).off(".nice_select")) : console.log('Method "' + t + '" does not exist.'), this;
        this.hide(), this.each(function() {
            var t = e(this);
            t.next().hasClass("nice-select") || s(t)
        }), e(document).off(".nice_select"), e(document).on("click.nice_select", ".nice-select", function(t) {
            var s = e(this);
            e(".nice-select").not(s).removeClass("open"), s.toggleClass("open"), s.hasClass("open") ? (s.find(".option"), s.find(".focus").removeClass("focus"), s.find(".selected").addClass("focus")) : s.focus()
        }), e(document).on("click.nice_select", function(t) { 0 === e(t.target).closest(".nice-select").length && e(".nice-select").removeClass("open").find(".option") }), e(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function(t) {
            var s = e(this),
                n = s.closest(".nice-select");
            n.find(".selected").removeClass("selected"), s.addClass("selected");
            var i = s.data("display") || s.text();
            n.find(".current").text(i), n.prev("select").val(s.data("value")).trigger("change")
        }), e(document).on("keydown.nice_select", ".nice-select", function(t) {
            var s = e(this),
                n = e(s.find(".focus") || s.find(".list .option.selected"));
            if (32 == t.keyCode || 13 == t.keyCode) return s.hasClass("open") ? n.trigger("click") : s.trigger("click"), !1;
            if (40 == t.keyCode) {
                if (s.hasClass("open")) {
                    var i = n.nextAll(".option:not(.disabled)").first();
                    i.length > 0 && (s.find(".focus").removeClass("focus"), i.addClass("focus"))
                } else s.trigger("click");
                return !1
            }
            if (38 == t.keyCode) {
                if (s.hasClass("open")) {
                    var l = n.prevAll(".option:not(.disabled)").first();
                    l.length > 0 && (s.find(".focus").removeClass("focus"), l.addClass("focus"))
                } else s.trigger("click");
                return !1
            }
            if (27 == t.keyCode) s.hasClass("open") && s.trigger("click");
            else if (9 == t.keyCode && s.hasClass("open")) return !1
        });
        var n = document.createElement("a").style;
        return n.cssText = "pointer-events:auto", "auto" !== n.pointerEvents && e("html").addClass("no-csspointerevents"), this
    }
}(jQuery);