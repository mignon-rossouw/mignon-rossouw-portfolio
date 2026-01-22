
class SoundSystem {
    constructor() {
        // Use your single click sound
        this.clickSound = new Audio('/assets/sounds/click.wav');
        this.clickSound.volume = 0.3; // 30% volume
        this.clickSound.preload = 'auto';

        // ADD ALERT SOUND
        this.alertSound = new Audio('/assets/sounds/alert.wav');
        this.alertSound.volume = 0.3;
        this.alertSound.preload = 'auto';
        
        this.enabled = true;
        
        // Flag to track if had user interaction
        this.userInteracted = false;
        
        // Listen for first user interaction to unlock audio
        document.addEventListener('click', () => {
            this.userInteracted = true;
        }, { once: true });

        console.log("SoundSystem loaded with click and alert sounds");
    }
    
    playClick() {
        if (!this.enabled) return;
        
        // Reset and play
        this.clickSound.currentTime = 0;
        
        // Try to play - if it fails (autoplay restriction), don't worry
        this.clickSound.play().catch(() => {
            // Audio will work after first user click
        });
    }

    playAlert() {
        if (!this.enabled) return;
        
        console.log("Playing alert sound");
        this.alertSound.currentTime = 0;
        this.alertSound.play().catch(() => {
            // Audio will work after first user click
        });
    }
    
    // Simple toggle for mute/unmute
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
    
    // Set volume (0 to 1)
    setVolume(vol) {
        this.clickSound.volume = Math.max(0, Math.min(1, vol));
        this.alertSound.volume = Math.max(0, Math.min(1, vol));
    }
}

// Create global instance
window.soundSystem = new SoundSystem();