$(document).ready(function() {
    console.log("Page is ready");
    console.log($(document).clientHeight - $("#top-bar")[0].clientHeight + $("#nav-bar")[0].clientHeight);
    console.log($(document))
})

var sideBarShow = false;

$("#top-bar > .menu-btn").click(function() {
    if (!sideBarShow) {
        $("#side-bar").css("animation", "side-bar-slideIn 0.4s forwards");
        $("#main-content").css("animation", "main-fadeDark 0.4s forwards");
        sideBarShow = true;
    } else {
        $("#side-bar").css("animation", "side-bar-slideOut 0.4s forwards");
        $("#main-content").css("animation", "main-fadeLight 0.4s forwards");
        sideBarShow = false;
    }
});

// enable/disable a button
$('#button').click(() =>
    $buttons.prop('disabled', false);
);
