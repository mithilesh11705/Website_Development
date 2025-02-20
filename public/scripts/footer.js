document.addEventListener("DOMContentLoaded", function () 
{
    // Complaints Dropdown Click Toggle
    const dropdownToggle = document.querySelector(".dropdown > a");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    if (dropdownToggle && dropdownMenu) 
    {
        dropdownToggle.addEventListener("click", function (event) 
        {
            event.preventDefault(); // Prevent default link behavior
            dropdownMenu.classList.toggle("show");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function (event) 
        {
            if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) 
            {
                dropdownMenu.classList.remove("show");
            }
        });
    }

    // Hover Effects for Explore Section Links
    const exploreLinks = document.querySelectorAll(".footer-nav ul li a");

    exploreLinks.forEach(link => 
    {
        link.addEventListener("mouseover", function () 
        {
            link.style.color = "#f8b400"; // Change to highlight color on hover
        });

        link.addEventListener("mouseout", function () 
        {
            link.style.color = "#ddd"; // Revert to normal color
        });
    });

    // Hover Effects for Social Media Icons
    const socialIcons = document.querySelectorAll(".social-icons a");

    socialIcons.forEach(icon => 
    {
        icon.addEventListener("mouseover", function () 
        {
            icon.style.color = "#f8b400"; // Highlight color
            icon.style.transform = "scale(1.1)"; // Slightly enlarge
        });

        icon.addEventListener("mouseout", function () 
        {
            icon.style.color = "#ddd"; // Default color
            icon.style.transform = "scale(1)"; // Restore size
        });
    });

    // Smooth Scroll for Internal Links
    const smoothLinks = document.querySelectorAll("a[href^='#']");

    smoothLinks.forEach(link => 
    {
        link.addEventListener("click", function (event) 
        {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) 
            {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Adjust for fixed headers
                    behavior: "smooth"
                });
            }
        });
    });
});
