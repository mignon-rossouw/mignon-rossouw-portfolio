// Add this to your JavaScript
function createVolumeSlider() {
    // Remove existing volume slider if it exists
    const existingSlider = document.getElementById('volumeSlider');
    if (existingSlider) {
        existingSlider.remove();
        return;
    }

    // Get the sound icon element
    const soundIcon = document.querySelector('.hn-sound-on-solid');
    if (!soundIcon) return;

    // Create volume slider container
    const volumeSlider = document.createElement('div');
    volumeSlider.id = 'volumeSlider';
    volumeSlider.className = 'volume-slider';
    
    // Function to update slider position
    function updateSliderPosition() {
        const iconRect = soundIcon.getBoundingClientRect();
        const sliderWidth = 44;
        const sliderLeft = iconRect.left + (iconRect.width / 2) - (sliderWidth / 2);
        const sliderBottom = window.innerHeight - iconRect.top + 30; // 50px above the icon

        volumeSlider.style.left = sliderLeft + 'px';
        volumeSlider.style.bottom = sliderBottom + 'px';
    }

    // Set initial position
    updateSliderPosition();
    
    // Add other styles
    volumeSlider.style.cssText += `
        position: fixed;
        background: var(--light-pink);
        border: 3px outset var(--pink);
        padding: 10px 10px;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transform: translateY(10px);
        opacity: 0;
        transition: all 0.3s ease;
        transition-property: opacity, transform; // Only transition these, not position
    `;

    // Create volume slider - no handle, just the bar
    volumeSlider.innerHTML = `
        <div id="volumeTrack" style="
            width: 20px;
            height: 120px;
            background: var(--pink);
            border: 2px inset var(--pink);
            position: relative;
            margin: 0 auto;
            cursor: pointer;
            overflow: hidden;
        ">
            <div id="volumeLevel" style="
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 70%;
                background: var(--neon-pink);
                transition: height 0.1s ease;
                cursor: pointer;
            "></div>
        </div>
    `;

    // Add to body
    document.body.appendChild(volumeSlider);

    // Animate in
    setTimeout(() => {
        volumeSlider.style.transform = 'translateY(0)';
        volumeSlider.style.opacity = '1';
    }, 10);

    // Update position immediately during resize (no debounce for smooth movement)
    function handleResize() {
        updateSliderPosition();
    }
    
    // Add resize listener that fires immediately
    window.addEventListener('resize', handleResize);

    // Volume control functionality - drag the entire bar
    const volumeLevel = document.getElementById('volumeLevel');
    const volumeTrack = document.getElementById('volumeTrack');
    let isDragging = false;
    let currentVolume = 70; // Start at 70%

    function setVolume(percent) {
        // Constrain between 0 and 100
        const height = Math.max(0, Math.min(100, percent));
        currentVolume = height;
        volumeLevel.style.height = height + '%';
    }

    function handleVolumeDrag(e) {
        const rect = volumeTrack.getBoundingClientRect();
        const clickY = rect.bottom - e.clientY;
        const percent = (clickY / rect.height) * 100;
        setVolume(percent);
    }

    // Click to set volume
    volumeTrack.addEventListener('click', (e) => {
        handleVolumeDrag(e);
    });

    // Drag to adjust volume
    volumeTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        handleVolumeDrag(e); // Set initial position
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        handleVolumeDrag(e);
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Close when clicking outside
    function closeVolumeSlider() {
        volumeSlider.style.transform = 'translateY(10px)';
        volumeSlider.style.opacity = '0';
        setTimeout(() => {
            if (volumeSlider.parentElement) {
                volumeSlider.remove();
                window.removeEventListener('resize', handleResize);
            }
        }, 300);
    }

    document.addEventListener('click', (e) => {
        if (!volumeSlider.contains(e.target) && !e.target.closest('.hn-sound-on-solid')) {
            closeVolumeSlider();
        }
    });

    // Prevent closing when clicking inside slider
    volumeSlider.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Add click event to sound icon
document.addEventListener('DOMContentLoaded', function() {
    const soundIcon = document.querySelector('.hn-sound-on-solid');
    if (soundIcon) {
        soundIcon.style.cursor = 'pointer';
        soundIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            createVolumeSlider();
        });
    }
});