window.addEventListener("scroll", function() {
    var ScrollPosition = window.scrollY
    var LogoContainer = document.getElementsByClassName("arrow")[0] // Add this to css!

    if (ScrollPosition >= 100) LogoContainer.classList.add("arrow--scrolled")
    else LogoContainer.classList.remove("arrow--scrolled")
})
