let musicContentCreated = false;

function loadMusicWindow() {
    const windowBody = document.querySelector('#music .window-body');
    const musicWindow = document.getElementById('music');
    if (!windowBody || !musicWindow) return;

    // Only create content once
    if (!musicContentCreated) {
        // Clear existing content
        windowBody.innerHTML = '';

        // Set background and remove all spacing
        windowBody.style.backgroundColor = '#191414';
        windowBody.style.maxHeight = '90%';
        windowBody.style.padding = '0';
        windowBody.style.margin = '0';
        windowBody.style.border = 'none';
        windowBody.style.overflow = 'hidden';

        // Use larger window size for the large player
        musicWindow.style.width = '400px';
        musicWindow.style.height = '500px';
        centerWindow(musicWindow);

        // Add Spotify with large player parameter
        windowBody.innerHTML = `
            <iframe style="width:100%; height:100%; border:none; display:block;" 
                    src="https://open.spotify.com/embed/playlist/1L9ZlJvLKseFYG8qjmMfUI?utm_source=generator&size=large" 
                    frameBorder="0" 
                    allowfullscreen="" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy">
            </iframe>
        `;
        
        musicContentCreated = true;
    } else {
        // If content already exists, just center the window
        centerWindow(musicWindow);
    }
}