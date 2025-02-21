const navbar = document.querySelector("#siteHead");

function vhToPixels(vh) {
    return Math.round(window.innerHeight * (vh / 100));
}

const headerHeight = 14;

const pxHeight = vhToPixels(headerHeight);

window.onscroll = () => {
    if (window.scrollY >= pxHeight) {
        // console.log("Detected");
        navbar.removeAttribute("id");
        navbar.setAttribute("id", "site_head");
    } else {
        navbar.removeAttribute("id");
        navbar.setAttribute("id", "siteHead");
    }
}