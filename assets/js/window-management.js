// Mobile detection
function isMobile() {
    return window.innerWidth <= 768;
}

// Opens a window by ID
function openWindow(windowId) {
    // Get the window DOM element
    const win = document.getElementById(windowId);
    if (!win) return; // Exit if window does not exist
    
    // Make the window visible
    win.style.display = 'block';

    // Bring the window to the front
    win.style.zIndex = getHighestZIndex() + 1;
    
    // If the window has no position set, center it on the screen
    centerWindow(win);
    
    // Add the window to the taskbar
    addToTaskbar(windowId);
}

// Centers a window in the viewport
function centerWindow(window) {
    // Get the window's dimensions
    const windowWidth = window.offsetWidth;
    const windowHeight = window.offsetHeight;

    // Get the viewport (screen) dimensions
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Calculate centered position (prevent negative values)
    let left = Math.max(0, (viewportWidth - windowWidth) / 2);
    let top = Math.max(0, (viewportHeight - windowHeight) / 2);
    
    // On mobile, position a bit higher
    if (isMobile()) {
        top = Math.max(20, top * 0.7);
    }
    
    // Apply position to the window
    window.style.left = left + 'px';
    window.style.top = top + 'px';
}

// Make windows fit content and screen
function setWindowSizeToContent(window, defaultWidth = 450, defaultHeight = 350) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get the natural size needed for content
    const windowBody = window.querySelector('.window-body');
    const contentWidth = windowBody.scrollWidth;
    const contentHeight = windowBody.scrollHeight;
    
    // Calculate needed size (content + header + padding)
    const headerHeight = 40; // Approximate header height
    const padding = 20; // Approximate padding
    
    let neededWidth = Math.max(contentWidth + padding, defaultWidth);
    let neededHeight = Math.max(contentHeight + headerHeight + padding, defaultHeight);
    
    if (isMobile()) {
        // On mobile, constrain to 90% of screen
        const maxWidth = viewportWidth * 0.95;
        const maxHeight = viewportHeight * 0.8;
        
        neededWidth = Math.min(neededWidth, maxWidth);
        neededHeight = Math.min(neededHeight, maxHeight);
    } else {
        // On desktop, constrain to 80% of screen
        const maxWidth = viewportWidth * 0.9;
        const maxHeight = viewportHeight * 0.8;
        
        neededWidth = Math.min(neededWidth, maxWidth);
        neededHeight = Math.min(neededHeight, maxHeight);
    }
    
    window.style.width = neededWidth + 'px';
    window.style.height = neededHeight + 'px';
}

// Prevent windows from going outside screen bounds
function constrainToScreen(window) {
    const windowWidth = window.offsetWidth;
    const windowHeight = window.offsetHeight;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let left = parseInt(window.style.left) || 0;
    let top = parseInt(window.style.top) || 0;
    
    // Constrain horizontal position
    if (left < 0) {
        left = 0;
    } else if (left + windowWidth > viewportWidth) {
        left = viewportWidth - windowWidth;
    }
    
    // Constrain vertical position
    if (top < 0) {
        top = 0;
    } else if (top + windowHeight > viewportHeight) {
        top = viewportHeight - windowHeight;
    }
    
    // Apply constrained position
    window.style.left = left + 'px';
    window.style.top = top + 'px';
}

// Closes a window completely and removes it from the taskbar
function closeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (window) {
        // Hide the window
        window.style.display = 'none';
        console.log('Window hidden, calling removeFromTaskbar for:', windowId);

        // Remove its taskbar item
        removeFromTaskbar(windowId);
    }
}

// Minimizes a window (hides it but keeps it in the taskbar)
function minimizeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (window) {
        // Hide the window
        window.style.display = 'none';

        // Mark taskbar item as minimized
        const taskbarItem = document.querySelector(`[data-window="${windowId}"]`);
        if (taskbarItem) {
            taskbarItem.classList.add('minimized');
        }
    }
}

// SIMPLEST SOLUTION: Just enable horizontal scrolling when needed
function manageTaskbarItems() {
    const taskbarItems = document.getElementById('taskbarItems');
    const systemTray = document.querySelector('.system-tray');
    
    if (!taskbarItems || !systemTray) return;
    
    // Get all taskbar items
    const items = document.querySelectorAll('.taskbar-item');
    
    // Reset styles first
    taskbarItems.style.overflowX = 'visible';
    taskbarItems.style.overflowY = 'hidden';
    taskbarItems.style.flexWrap = 'nowrap';
    taskbarItems.style.whiteSpace = 'nowrap';
    taskbarItems.style.scrollbarWidth = 'none';
    
    // Check if items would overlap the system tray
    if (items.length > 0) {
        const lastItem = items[items.length - 1];
        const lastItemRect = lastItem.getBoundingClientRect();
        const trayRect = systemTray.getBoundingClientRect();
        
        // If the last item would overlap the system tray, enable scrolling
        if (lastItemRect.right > trayRect.left - 10) {
            taskbarItems.style.overflowX = 'auto';
            taskbarItems.style.overflowY = 'hidden';
        }
    }
}

// Adds a window icon to the taskbar
function addToTaskbar(windowId) {
    // Check if the window already exists in the taskbar
    if (document.querySelector(`[data-window="${windowId}"]`)) {
        const taskbarItem = document.querySelector(`[data-window="${windowId}"]`);

        // Restore if previously minimized
        taskbarItem.classList.remove('minimized');
        
        // Re-check layout
        setTimeout(manageTaskbarItems, 10);
        return;
    }
    
    // Create a new taskbar item
    const taskbarItem = document.createElement('div');
    taskbarItem.className = 'taskbar-item';
    taskbarItem.setAttribute('data-window', windowId);
    
    // Add basic styling to prevent stacking
    taskbarItem.style.display = 'inline-flex';
    taskbarItem.style.flexShrink = '0';
    
    // Set the window icon
    const iconHTML = getWindowIcon(windowId);
    taskbarItem.innerHTML = iconHTML;
    
    // Handle taskbar click (toggle minimize/restore)
    taskbarItem.onclick = function() {
        const window = document.getElementById(windowId);
        if (window && window.style.display === 'none') {
            // Restore window
            window.style.display = 'block';
            window.style.zIndex = getHighestZIndex() + 1;
            taskbarItem.classList.remove('minimized');
        } else {
            // Minimize window
            minimizeWindow(windowId);
        }
    };
    
    // Add the item to the taskbar container
    document.getElementById('taskbarItems').appendChild(taskbarItem);
    
    // Check layout after adding
    setTimeout(manageTaskbarItems, 10);
}

// Returns the appropriate icon HTML for each window
function getWindowIcon(windowId) {
    switch(windowId) {
        case 'myComputer':
            return '<i class="hn hn-technology"></i>';
        case 'documents':
            return '<i class="hn hn-folder-open-solid"></i>';
        case 'recycleBin':
            return '<i class="hn hn-trash-alt-solid"></i>';
        case 'browser':
            return '<i class="hn hn-web3"></i>';
        case 'notepad':
            return '<i class="hn hn-writing"></i>';
        case 'games':
            return '<i class="hn hn-gaming"></i>';
        case 'precious':
            return '<i class="hn hn-image-solid"></i>';
        case 'music':
            return '<i class="hn hn-music-solid"></i>';
        default:
            // Fallback icon
            return '<i class="hn hn-clock-solid"></i>';
    }
}

// Removes a window from the taskbar
function removeFromTaskbar(windowId) {
    console.log('removeFromTaskbar called for:', windowId);
    const taskbarItem = document.querySelector(`[data-window="${windowId}"]`);
    console.log('Found taskbar item:', taskbarItem);
    if (taskbarItem) {
        taskbarItem.remove();
        console.log('Taskbar item removed for:', windowId);
        
        // Re-check layout after removal
        setTimeout(manageTaskbarItems, 10);
    } else {
        console.log('No taskbar item found for:', windowId);
    }
}

// Finds the highest z-index among all windows
function getHighestZIndex() {
    const windows = document.querySelectorAll('.window');
    let maxZ = 0;
    
    windows.forEach(window => {
        const zIndex = parseInt(window.style.zIndex) || 0;
        if (zIndex > maxZ) {
            maxZ = zIndex;
        }
    });
    
    return maxZ;
}

// =========================
// Window Dragging Logic
// =========================

// Enable dragging once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const windows = document.querySelectorAll('.window');
    
    windows.forEach(window => {
        // Only allow dragging using the window header
        const header = window.querySelector('.window-header');
        if (!header) return;
        
        header.addEventListener('mousedown', function(e) {
            e.preventDefault();
            
            // Bring the window to front
            window.style.zIndex = getHighestZIndex() + 1;
            
            // Record initial mouse position
            let startX = e.clientX;
            let startY = e.clientY;

            // Record initial window position
            let startLeft = parseInt(window.style.left) || 0;
            let startTop = parseInt(window.style.top) || 0;
            
            // Move window as the mouse moves
            function onMouseMove(e) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                
                window.style.left = (startLeft + dx) + 'px';
                window.style.top = (startTop + dy) + 'px';

                // Constrain to screen bounds during drag
                constrainToScreen(window);
            }
            
            // Stop dragging when mouse is released
            function onMouseUp() {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
            
            // Attach global mouse listeners
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
    });
    
    // Initialize taskbar management
    setTimeout(manageTaskbarItems, 100);
    
    // Also manage on window resize
    window.addEventListener('resize', manageTaskbarItems);
});