(function(Root, SmoothScroll) {
    "use strict"

    if (typeof define === "function" && define.amd) {
        define(SmoothScroll)
    } else if (typeof exports === "object" && typeof module === "object") {
        module.exports = SmoothScroll()
    } else {
        Root.SmoothScroll = SmoothScroll()
    }
})(this, function() {
    "use strict"

    if (typeof window !== "object") return

    if (document.querySelectorAll === void 0 || window.pageYOffset === void 0 || history.pushState === void 0) { return }

    var GetTop = function(Element, Start) {
        if (Element.nodeName === "HTML") return -Start

        return Element.getBoundingClientRect().top + Start
    }

    var EaseInOutCubic = function(Bezier) {
        return Bezier < .5 ? 4 * Bezier * Bezier * Bezier : (Bezier - 1) * (2 * Bezier - 2) * (2 * Bezier - 2) + 1
    }

    var Position = function(Start, End, Elapsed, Duration) {
        if (Elapsed > Duration) return End

        return Start + (End - Start) * EaseInOutCubic(Elapsed / Duration)
            // Linear scroll: return Start + (End - Start) * (Elapsed / Duration)
    }

    var SmoothScroll = function(Element, Duration, Callback, Context) {
        Duration = Duration || 500
        Context = Context || window

        if (typeof Element === "number") {
            var End = parseInt(Element)
        } else {
            var End = GetTop(Element, Start)
        }

        var Clock = Date.now()

        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(Function) {
            window.setTimeout(Function, 15)
        }

        var Step = function() {
            var Elapsed = Date.now() - Clock

            if (Context !== Window) {
                Context.scrollTop = Position(Start, End, Elapsed, Duration)
            } else {
                window.scroll(0, Position(Start, End, Elapsed, Duration))
            }

            if (Elapsed > Duration) {
                if (typeof Callback === "function") {
                    Callback(Element)
                }
            } else {
                requestAnimationFrame(Step)
            }
        }

        Step()
    }

    var LinkHandler = function(Event) {
        if (!Event.defaultPrevented) {
            Event.preventDefault()

            if (location.hash !== this.hash) window.history.pushState(null, null, this.hash)

            var Node = document.getElementById(this.hash.substring(1))

            if (!Node) return

            SmoothScroll(Node, 500, function(Element) {
                location.replace("#" + Element.id)
            })
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        var Internal = document.querySelectorAll('a[href^="#"]:not([href="#"])'),
            a

        for (var i = Internal.length; a = Internal[--i];) {
            a.addEventListener("click", LinkHandler, false)
        }
    })

    return SmoothScroll
})
