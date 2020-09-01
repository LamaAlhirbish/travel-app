import { submission, differenceInDays, daysLeft } from './js/app'

import './styles/header.scss'
import './styles/input.scss'
import './styles/base.scss'
import './styles/output.scss'

import logo from './media/logo.png'
// import './media/wallpaper.jpg'

function addLogo() {
    const appLogo = new Image();
    appLogo.src = logo;
    appLogo.id = 'logoImg';
    appLogo.alt = 'Travel App logo';
    return appLogo;
}

document.getElementById('wallpaper').appendChild(addLogo());

export { submission, differenceInDays, daysLeft }
