// browser-window.js
function loadBrowserWindow() {
    console.log('Opening browser window...');
    
    const browserWindow = document.getElementById('browser');
    if (!browserWindow) {
        console.error('Browser window not found!');
        return;
    }
    
    // Show the window
    browserWindow.style.display = 'block';
    browserWindow.style.overflow = 'hidden';
    browserWindow.style.zIndex = getHighestZIndex() + 1;
    
    // Calculate responsive size based on screen
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Set responsive size (90% of screen but max 800px)
    const windowWidth = Math.min(800, screenWidth * 0.7);
    const windowHeight = Math.min(700, screenHeight * 0.5);
    
    browserWindow.style.width = windowWidth + 'px';
    browserWindow.style.height = windowHeight + 'px';
    
    // Center it
    centerWindow(browserWindow);
    
    // Get the window body
    const windowBody = browserWindow.querySelector('.window-body');
    if (!windowBody) {
        console.error('Window body not found!');
        return;
    }
    
    // Add content
    windowBody.innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column;">
            <div style="padding: 15px; flex-shrink: 0;">
                <div class="gcse-searchbox"></div>
            </div>
            <div style="flex: 1; overflow-y: auto; padding: 0 15px 15px 15px;">
                <div class="gcse-searchresults"></div>
            </div>
        </div>
    `;
    
    // Load Google CSE
    setTimeout(() => {
        loadGoogleCSE();
    }, 100);
    
    // Add to taskbar
    addToTaskbar('browser');
    
    // Constrain to screen
    constrainToScreen(browserWindow);
}

function loadGoogleCSE() {
    console.log('Loading Google CSE...');
    
    // Remove any existing script
    const existingScript = document.querySelector('script[src*="cse.google.com"]');
    if (existingScript) {
        existingScript.remove();
    }
    
    // Create and load the script
    const script = document.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=90c028202ba074e6a';
    script.onload = function() {
        console.log('Google CSE script loaded!');
        
        // Add CSS to hide pagination
        const style = document.createElement('style');
        style.textContent = `
            .gsc-cursor, 
            .gsc-cursor-box, 
            .gsc-cursor-page, 
            .gsc-pagination,
            .gsc-cursor-current-page,
            .gsc-orderby-container,
            .gsc-selected-option-container {
                display: none !important;
            }
            
            /* Optional: Hide result stats if you want */
            /* .gsc-result-info {
                display: none !important;
            } */
        `;
        document.head.appendChild(style);
    };
    
    script.onerror = function() {
        console.error('Failed to load Google CSE script!');
    };
    
    document.head.appendChild(script);
}

// Make function available
window.loadBrowserWindow = loadBrowserWindow;