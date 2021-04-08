var scrollAmount = 0;

$(document).ready(function() {
    console.log("theme.js");
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
    let navScroll = $("#nav-bar .nav-content");
    if (isScrollable($("#nav-bar .nav-content")[0])) {
        $("#nav-bar .nav-content")[0].style.display = "block";

        // change availability of nav btns
        if (!navScroll[0].scrollLeft) {
            $("#nav-bar > button").eq(0).prop("disabled", true);
        } else {
            $("#nav-bar > button").eq(0).prop("disabled", false);
        }
        if (navScroll[0].scrollLeft !==
            navScroll[0].scrollWidth - navScroll[0].clientWidth) {
            $("#nav-bar > button").eq(1).prop("disabled", false);
        } else {
            $("#nav-bar > button").eq(1).prop("disabled", true);
        }
    } else {
        $("#nav-bar .nav-content")[0].style.display = "flex";
        $("#nav-bar .nav-content")[0].style.justifyContent = "space-evenly";
    }

    scrollAmount = getAvgNavItemWidth();
});

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
    let navScroll = $("#nav-bar .nav-content");
    if (isScrollable(navScroll[0])) {
        navScroll.css("display", "block");

        // change availability of nav btns
        if (!navScroll[0].scrollLeft) {
            $("#nav-bar > button").eq(0).prop("disabled", true);
        } else {
            $("#nav-bar > button").eq(0).prop("disabled", false);
        }
        if (navScroll[0].scrollLeft !==
            navScroll[0].scrollWidth - navScroll[0].clientWidth) {
            $("#nav-bar > button").eq(1).prop("disabled", false);
        } else {
            $("#nav-bar > button").eq(1).prop("disabled", true);
        }
    } else {
        $("#nav-bar .nav-content").css("display", "flex");
        $("#nav-bar .nav-content").css("justify-content", "space-evenly");

        // change availability of nav btns
        $("#nav-bar > button").prop("disabled", true);
    }
});

$("#nav-bar .nav-content").scroll(function() {
    if (this.scrollLeft) {
        $("#nav-bar > button").eq(0).prop("disabled", false);
    } else {
        $("#nav-bar > button").eq(0).prop("disabled", true);
    }
    if (this.scrollLeft !== this.scrollWidth - this.clientWidth) {
        $("#nav-bar > button").eq(1).prop("disabled", false);
    } else {
        $("#nav-bar > button").eq(1).prop("disabled", true);
    }
});

$("#nav-bar > button").eq(0).click(function() { // left scroll button
    $("#nav-bar .nav-content")[0].scrollLeft -= scrollAmount;
});

$("#nav-bar > button").eq(1).click(function() { // right scroll button
    $("#nav-bar .nav-content")[0].scrollLeft += scrollAmount;
});

// enable/disable a button
    //$buttons.prop('disabled', false);

function isScrollable(element) {
    return element.scrollWidth > element.clientWidth;
}

function getAvgNavItemWidth() {
    let itemArr = $("#nav-bar > .nav-content > a");
    let total = 0;
    for(i=0; i < itemArr.length; i++) {
        total += itemArr[i].clientWidth + 10;
    }
    return total/itemArr.length;
}
