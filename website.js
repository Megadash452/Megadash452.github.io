const chromeBar = 65;
const navBar = 54;

const webResolution = [screen.availWidth, screen.availHeight - chromeBar - navBar];

document.getElementsByClassName('main-frame').style.height = `${webResolution[1]}px`;
document.getElementsByClassName('sidebar-frame').style.height = `${webResolution[1]}px`;