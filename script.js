$(document).ready(function() {
    console.log("Page is ready");
    console.log($(document).clientHeight - $("#top-bar")[0].clientHeight + $("#nav-bar")[0].clientHeight);
    console.log($(document));
    
    // set iframe page height
    pageHeight =
        $("body")[0].clientHeight - (
            $("#top-bar")[0].clientHeight +
            $("#nav-bar")[0].clientHeight
        ) - 4 - 5;
    $("#main-content > iframe").height(pageHeight);

    // set position of right nav-bar button and width of content
    $("#nav-bar > button")[1].style.left = `${$("#nav-bar")[0].clientWidth - 29}px`;
    $("#nav-bar .nav-content")[0].style.width = `${$("#nav-bar")[0].clientWidth - 29*2}px`;

    // check if navbar content can scroll to assign flex box
    if (isScrollable($("#nav-bar .nav-content")[0])) {
        $("#nav-bar .nav-content")[0].style.display = "block";
    } else {
        $("#nav-bar .nav-content")[0].style.display = "flex";
        $("#nav-bar .nav-content")[0].style.justifyContent = "space-evenly";
    }
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

$(window).resize(function() {
    // set iframe page height
    pageHeight =
        $("body")[0].clientHeight - (
            $("#top-bar")[0].clientHeight +
            $("#nav-bar")[0].clientHeight
        ) - 4;
    $("#main-content > iframe").height(pageHeight);

    // set position of right nav-bar button and width of content
    $("#nav-bar > button")[1].style.left = `${$("#nav-bar")[0].clientWidth - 29}px`;
    $("#nav-bar .nav-content")[0].style.width = `${$("#nav-bar")[0].clientWidth - 29*2}px`;

    // check if navbar content can scroll to assign flex box
    if (isScrollable($("#nav-bar .nav-content")[0])) {
        $("#nav-bar .nav-content")[0].style.display = "block";
    } else {
        $("#nav-bar .nav-content")[0].style.display = "flex";
        $("#nav-bar .nav-content")[0].style.justifyContent = "space-evenly";
    }
});

// enable/disable a button
    //$buttons.prop('disabled', false);

function isScrollable(element) {
    return element.scrollWidth > element.clientWidth;
}
