const chromeBar = 65;
const navBar = 54;

const resolution = [screen.width, screen.height];
const webResolution = [resolution[0], resolution[1] - chromeBar - navBar];

document.getElementsByClassName('main-frame').style.height = `${webResolution[1]}px`;
document.getElementsByClassName('sidebar-frame').style.height = `${webResolution[1]}px`;