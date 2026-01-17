document.addEventListener('DOMContentLoaded', () => { // ensures the html is fully loaded before using process any actions
    const navLinks = document.querySelectorAll('.nav-link');  // find all the elements that match the css selector .nav-link, like class
    
    const showPage = (pageId) => {
        const currentPage = document.querySelector('.page.active'); // find the current active page
        if (currentPage) {
            currentPage.classList.remove('active'); // hide the current active page
        }
        const currentNavLink = document.querySelector('.nav-link.active'); // find the current active nav link
        if (currentNavLink) {
            currentNavLink.classList.remove('active'); // deactivate the current active nav link
        }
        document.getElementById(pageId).classList.add('active'); // show the target page
        document.querySelector(`.nav-link[data-page="${pageId}"]`).classList.add('active'); // activate the target nav link
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetPageId = link.getAttribute('data-page'); // get the target page id from data-page attribute
            const targetPage = document.getElementById(targetPageId);
            
            // Only prevent default and use SPA navigation if the target page exists in current document
            if (targetPage) {
                event.preventDefault(); // prevent the default link behavior
                history.pushState({ page: targetPageId}, targetPageId, `#${targetPageId}` );
                showPage(targetPageId); // show the target page
            }
            // Otherwise, allow normal link navigation to separate HTML files
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            showPage(e.state.page);
        } else {
            // Handle initial load or direct access to #hash
            const initialPage = window.location.hash ? window.location.hash.substring(1) : 'home';
            showPage(initialPage);
        }
    });

    // Set initial page on load
    const initialPage = window.location.hash ? window.location.hash.substring(1) : 'home';
    showPage(initialPage);
});