function DragElement(Element, Suffix) {
    var Position1 = 0,
        Position2 = 0,
        Position3 = 0,
        Position4 = 0

    if (document.getElementById(Element.id + Suffix)) {
        document.getElementById(Element.id + Suffix).onmousedown = DragMouseDown
    } else {
        Element.onmousedown = DragMouseDown
    }

    function DragMouseDown(Event) {
        Event = Event || window.event
        Event.preventDefault()
        Position3 = Event.clientX
        Position4 = Event.clientY
        document.onmouseup = CloseDragElement
        document.onmousemove = ElementDrag
    }

    function ElementDrag(Event) {
        Event = Event || window.event
        Event.preventDefault()
        Position1 = Position3 - Event.clientX
        Position2 = Position4 - Event.clientY
        Position3 = Event.clientX
        Position4 = Event.clientY
        Element.style.top = (Element.offsetTop - Position2) + "px"
        Element.style.left = (Element.offsetLeft - Position1) + "px"
    }

    function CloseDragElement() {
        document.onmouseup = null
        document.onmousemove = null
    }
}
