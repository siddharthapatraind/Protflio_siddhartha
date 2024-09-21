/*================= Typing Animation ===========*/
var typed = new Typed(".typing", {
    strings: ["", "ECE Student", "Web Developer", "Web Designer", "Maturing Coder", "Explorer", "Quick Learner"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

/*=============== Aside Navigation ===============*/
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

/* Loop through navigation links */
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");

    a.addEventListener("click", function () {
        // Remove 'back-section' from all sections
        removeBackSection();

        // Manage active states for navigation and sections
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");

        // Show the clicked section
        showSection(this);

        // Handle mobile toggle close when a link is clicked
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    });
}

/* Remove back section class from all sections */
function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}

/* Add back section class to the previous section */
function addBackSection(num) {
    allSection[num].classList.add("back-section");
}

/* Show the current section */
function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}

/* Update navigation links based on active section */
function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

/* Hire Me button click handler */
document.querySelector(".hire-me").addEventListener("click", function () {
    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
});

/* Toggle functionality for mobile view */
const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});

/* Function to toggle the navigation and sections for mobile view */
function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");

    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}

/*================= Handle Resizing Events ===========*/
window.addEventListener("resize", () => {
    // If screen size is greater than 1200px, ensure the aside menu is shown
    if (window.innerWidth > 1200) {
        if (!aside.classList.contains("open")) {
            aside.classList.add("open");
        }
    } else {
        // If it's mobile view and menu is open, close it
        if (aside.classList.contains("open")) {
            aside.classList.remove("open");
            navTogglerBtn.classList.remove("open");
        }
    }
});
