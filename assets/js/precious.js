function loadPreciousWindow() {
    const preciousWindow = document.getElementById('precious');
    const windowBody = preciousWindow.querySelector('.window-body');
    
    // Clear any existing content
    windowBody.innerHTML = '';

    // Reset all styles that might cause gaps
    windowBody.style.height = 'auto';
    windowBody.style.padding = '0';
    windowBody.style.margin = '0';
    windowBody.style.overflow = 'hidden';
    windowBody.style.display = 'flex';
    windowBody.style.alignItems = 'center';
    windowBody.style.justifyContent = 'center';
    
    // Create and add the image
    const img = document.createElement('img');
    img.id = 'preciousImg';
    img.src = './assets/images/icons/precious.png';
    img.alt = 'precious.png';
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';
    img.style.display = 'block';
    
    // When image loads, adjust window size to fit image
    img.onload = function() {
        // Get the natural dimensions of the image
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;
        
        // Get screen dimensions
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        // Calculate maximum allowed dimensions (90% of screen)
        const maxWidth = screenWidth * 0.9;
        const maxHeight = screenHeight * 0.8;
        
        // Scale down window size
        let scaledWidth = naturalWidth * 0.4;
        let scaledHeight = naturalHeight * 0.4;
        
        // Constrain to screen size if too large
        if (scaledWidth > maxWidth) {
            scaledWidth = maxWidth;
            scaledHeight = (naturalHeight * maxWidth) / naturalWidth;
        }
        if (scaledHeight > maxHeight) {
            scaledHeight = maxHeight;
            scaledWidth = (naturalWidth * maxHeight) / naturalHeight;
        }
        
        // Set window size to match scaled image dimensions
        preciousWindow.style.width = (scaledWidth - 7) + 'px';
        preciousWindow.style.height = (scaledHeight + 50) + 'px';
        
        // Center the window
        centerWindow(preciousWindow);
        
        // Double-check it stays within screen bounds
        constrainToScreen(preciousWindow);
    };
    
    windowBody.appendChild(img);
}