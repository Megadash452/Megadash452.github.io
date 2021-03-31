$(document).ready(function() {
    console.log("Page is ready");
})

var sideBarShow = false;

$("#top-bar > .menu-btn").click(function() {
    if (!sideBarShow) {
        $("#side-bar").css("animation", "side-bar-slideIn 0.5s forwards");
        $("#main-content").css("animation", "main-fadeDark 0.5s forwards");
        sideBarShow = true;
    } else {
        $("#side-bar").css("animation", "side-bar-slideOut 0.5s forwards");
        $("#main-content").css("animation", "main-fadeLight 0.5s forwards");
        sideBarShow = false;
    }
});