var scrollAmount = 0;

const topContainerHeight = 80.8
const topDropperHeight = 24 // 18.4

var navbarLinks = [
    {
        "text": "top",
        "href": "unindex.html"
    },
    {
        "text": "bottom",
        "href": "site.php"
    },
    {
        "text": "left",
        "href": "script.js"
    },
    {
        "text": "right",
        "href": "styles/css/style.css"
    }
];

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
        checkNavScroll(navScroll[0]);
    } else {
        $("#nav-bar .nav-content")[0].style.display = "flex";
        $("#nav-bar .nav-content")[0].style.justifyContent = "space-evenly";
    }

    // give links in navbar the iframe target
    links = $("nav > .nav-content").children();
    for (i=0; i < $("nav > .nav-content").children().length; i++)
        links[i].setAttribute("target", "site");

    // TODO: implement links object to html

    scrollAmount = getAvgNavItemWidth();
});


var sidebarShow = false;
var topbarShow = true;


$("#top-bar > .top-container > .menu-btn").click(async function() {
    if (!sidebarShow)
        openSidebar();
    else
        collapseSidebar();
});


$("#top-bar > .top-dropper").mousedown(function(event) {
    //let clickPos = [event.clientX, event.clientY];
    var posBefore = [event.clientX, event.clientY];
    var posAfter = [0, 0];
    let mouseLim = 10;

    let totalMoveX = 0;
    let totalMoveY = 0;

    let element = document.querySelector("#top-bar > .top-dropper");


    document.onmousemove = function(event) {
        totalMoveX += 1;
        totalMoveY += 1;

        // glitchy
        // if (event.clientY <= clickPos[1] - mouseLim ||
        //     event.clientY >= clickPos[1] + mouseLim ||
        //     event.clientX <= clickPos[0] - mouseLim ||
        //     event.clientX >= clickPos[0] + mouseLim)
        //         console.log("dragged");
        
        if (totalMoveY >= mouseLim ||
            totalMoveX >= mouseLim)
        {
            // -- ON DRAG
            console.log("DRAG");
            posAfter = [
                posBefore[0] - event.clientX,
                posBefore[1] - event.clientY
            ];
            posBefore = [event.clientX, event.clientY];

            if (parseInt(getComputedStyle(element).top) >= 0 &&
                parseInt(getComputedStyle(element).top) <= topContainerHeight)
            {
                element.style.top = `${
                    parseInt(getComputedStyle(element).top)
                  - posAfter[1]
                }px`;
                element.parentElement.style.height = `${
                    parseInt(getComputedStyle(element.parentElement).height)
                  - posAfter[1]
                }px`;

                if (parseInt(getComputedStyle(element).top) == 57 && posAfter[1] > 0) {
                    $("#top-bar > .top-container").css("animation", "top-div-slideOut 0.4s forwards");
                } else if (parseInt(getComputedStyle(element).top) == 58 && posAfter[1] < 0) {
                    $("#top-bar > .top-container").css("animation", "top-div-slideIn 0.4s forwards");
                }
            } else if (parseInt(getComputedStyle(element).top) < 0) {
                element.style.top = "0px";
                element.parentElement.style.height = `${topDropperHeight}px`;
            } else if (parseInt(getComputedStyle(element).top) > topContainerHeight) {
                element.style.top = `${topContainerHeight}px`;
                element.parentElement.style.height = `${topContainerHeight + topDropperHeight}px`;
            }
        }
    }
    document.onmouseup = function() {
        // glitchy
        // if (!(event.clientX >= clickPos[0] + mouseLim) &&
        //     !(event.clientX <= clickPos[0] - mouseLim) &&
        //     !(event.clientY >= clickPos[1] + mouseLim) &&
        //     !(event.clientY <= clickPos[1] - mouseLim))
        //         console.log("clicked");

        if (totalMoveX <= mouseLim &&
            totalMoveY <= mouseLim)
        {
            // -- ON CLICK
            console.log("clicked");

            if (!topbarShow)
                openTopbar();
            else
                collapseTopbar();

            if (sidebarShow)
                collapseSidebar();
        }   
        
        document.onmouseup = null;
        document.onmousemove = null;
    }
});


$("#main-filter").click(async function() {
    if (sidebarShow)
        collapseSidebar();
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
        checkNavScroll(navScroll[0]);
    } else {
        $("#nav-bar .nav-content").css("display", "flex");
        $("#nav-bar .nav-content").css("justify-content", "space-evenly");

        // change availability of nav btns
        $("#nav-bar > button").prop("disabled", true);
    }
    //console.log($("#nav-bar .nav-content")[0].scrollLeft);
});


$("#nav-bar .nav-content").scroll(function() {
    checkNavScroll(this);
});

// left scroll button
$("#nav-bar > button").eq(0).click(function() { 
    $("#nav-bar .nav-content")[0].scrollLeft -= scrollAmount;
});
// right scroll button
$("#nav-bar > button").eq(1).click(function() { 
    $("#nav-bar .nav-content")[0].scrollLeft += scrollAmount;
});


// enable/disable a button
    //$buttons.prop('disabled', false);


function collapseSidebar() {
    $("#side-bar").css("animation", "side-bar-slideOut 0.4s forwards");
    $("#main-content").css("animation", "main-fadeLight 0.4s forwards");
    $("#main-filter").css("display", "none");
    sidebarShow = false;
}
function openSidebar() {
    $("#side-bar").css("animation", "side-bar-slideIn 0.4s forwards");
    $("#main-content").css("animation", "main-fadeDark 0.4s forwards");
    $("#main-filter").css("display", "block");
    sidebarShow = true;
}


async function collapseTopbar() {
    $("#top-bar").css("animation", "top-bar-slideOut 0.4s forwards");
    $("#top-bar > .top-dropper").css("animation", "top-drop-slideOut 0.4s forwards");
    await sleep(50);
    $("#top-bar > .top-container").css("animation", "top-div-slideOut 0.4s forwards");
    topbarShow = false;
}
async function openTopbar() {
    $("#top-bar").css("animation", "top-bar-slideIn 0.4s forwards");
    $("#top-bar > .top-dropper").css("animation", "top-drop-slideIn 0.4s forwards");
    await sleep(50);
    $("#top-bar > .top-container").css("animation", "top-div-slideIn 0.4s forwards");
    topbarShow = true;
}


// useful
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

function checkNavScroll(navScroller) {
    if (navScroller.scrollLeft)
        $("#nav-bar > button").eq(0).prop("disabled", false);
    else
        $("#nav-bar > button").eq(0).prop("disabled", true);
    
    if (!(round(navScroller.scrollLeft) >= navScroller.scrollWidth - navScroller.clientWidth))
        $("#nav-bar > button").eq(1).prop("disabled", false);
    else
        $("#nav-bar > button").eq(1).prop("disabled", true);
}

function round(decimal) {
    return Math.floor(decimal + 0.5);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function makeElementDraggable(element, handler, obj) {
    var posBefore, posAfter = [0, 0];

    element.onmousedown = function(event) {
        // mouse position when click
        posBefore = [event.clientX, event.clientY];

        // moving the element
        document.onmousemove = function(event) {
            posAfter = [
                posBefore[0] - event.clientX,
                posBefore[1] - event.clientY
            ];
            posBefore = [event.clientX, event.clientY];

            // execute lambda
            handler(element, [posAfter[0], posAfter[1]], obj);
        };

        // release mouse button
        document.onmouseup = function() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    };
}