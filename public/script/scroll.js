window.addEventListener('scroll', reveal);
function reveal(){
    let doc = document.documentElement;
    let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
    let headerContainer = document.querySelector('header');
    let headerlogo = document.querySelector('.header_logo a');
    let headerMenu = document.querySelector('.header_menu');
    let headerLogin = document.querySelector('.header_login');
    if(top >=11.686957359313965){
        headerContainer.classList.add('scrollPos');
        headerlogo.classList.add('scroll_logo');
        headerMenu.classList.add('scroll_color');
        headerLogin.classList.add('scroll_color');
    }
    else{
        headerContainer.classList.remove('scrollPos');
        headerlogo.classList.remove('scroll_logo');
        headerMenu.classList.remove('scroll_color');
        headerLogin.classList.remove('scroll_color');
    }
    let reveals = document.querySelectorAll('.reveal');
    for(let reveal of reveals){
        let windowHeight= window.innerHeight;
        let revealTop = reveal.getBoundingClientRect().top;
        let revealpoint = 100;
        if(revealTop < windowHeight - revealpoint){
            reveal.classList.add('active')
        }
    }
}