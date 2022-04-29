export const initNavigationHandlers = () => {
    const burger = document.querySelector(".burger img");
    const navbarList = document.querySelector(".navbar-list");

    burger.addEventListener("click", toggleNavbar); 

    function toggleNavbar() {
        navbarList.classList.toggle("nav-active");

        if(navbarList.classList.contains("nav-active")) {
            burger.src = "../../images/icon-close-menu.svg";
        } else {
            burger.src = "../../images/icon-hamburger.svg";
        }
    }
}