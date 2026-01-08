function shutdown() {
    // Create black overlay covering entire screen
    const shutdownOverlay = document.createElement('div');
    shutdownOverlay.id = 'shutdownOverlay';
    shutdownOverlay.style.position = 'fixed';
    shutdownOverlay.style.top = '0';
    shutdownOverlay.style.left = '0';
    shutdownOverlay.style.width = '100%';
    shutdownOverlay.style.height = '100%';
    shutdownOverlay.style.backgroundColor = 'var(--purple)';
    shutdownOverlay.style.zIndex = '9999';
    shutdownOverlay.style.display = 'flex';
    shutdownOverlay.style.flexDirection = 'column';
    shutdownOverlay.style.justifyContent = 'center';
    shutdownOverlay.style.alignItems = 'center';
    shutdownOverlay.style.color = 'var(--light-pink)';
    shutdownOverlay.style.fontFamily = 'NokiaFC22, sans-serif';
    shutdownOverlay.style.transition = 'all 0.5s ease';

    // Shutdown animation with improved Pac-Man loader
    shutdownOverlay.innerHTML = `
        <div class="screen-content">
            <i class="hn hn-moon-solid" style="font-size: 64px; color: var(--light-pink); margin-bottom: 30px;"></i>
            <div class="status-text">Shutting down...</div>
            
            <!-- Improved Pac-Man loader using the provided CSS -->
            <div class="loader-container">
                <div class="loader"></div>
            </div>
            
            <div class="instruction-text">SHAKE MOUSE TO WAKE UP</div>
        </div>
        
        <style>
            /* Consistent layout for both screens */
            .screen-content {
                text-align: center;
                padding: 20px;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                transition: all 0.5s ease;
            }
            
            .status-text {
                margin-bottom: 40px;
                font-size: 24px;
                color: var(--light-pink);
                font-weight: bold;
                height: 32px;
                transition: all 0.5s ease;
            }
            
            .instruction-text {
                margin-top: 50px;
                font-size: 16px;
                color: var(--pink);
                letter-spacing: 1px;
                height: 20px;
                transition: all 0.5s ease;
            }
            
            /* Container to center the loader */
            .loader-container {
                width: 100%;
                display: flex;
                justify-content: center;
                margin-bottom: 40px;
                height: 28px;
            }
            
            /* Improved Pac-Man loader CSS with FEWER DOTS for better alignment */
            .loader {
                width: 300px;
                height: 24px;
                padding: 2px 0;
                box-sizing: border-box;
                display: flex;
                animation: l5-0 6s infinite steps(6);
                background:
                    linear-gradient(transparent 0 0) 0 0/120% 100% no-repeat,
                    radial-gradient(circle 4px, var(--yellow) 90%, transparent) 0 0/60px 100% /* FEWER DOTS: 60px spacing (5 dots total) */
                    transparent;
                overflow: hidden;
            }
            .loader::before {
                content: "";
                width: 20px;
                transform: translate(-100%);
                border-radius: 50%;
                background: var(--yellow);
                animation: 
                    l5-1 0.6s infinite ease-in-out, /* FASTER and SMOOTHER: 0.6s chew, opens fully */
                    l5-2  6s infinite linear;
                animation-delay: 0s, 0s;
            }
            @keyframes l5-1{ 
                0% { 
                    clip-path: polygon(50% 50%, 100% 0, 100% 0, 0 0, 0 100%, 100% 100%, 100% 100%);
                }
                50% { 
                    clip-path: polygon(50% 50%, 100% 65%, 100% 0, 0 0, 0 100%, 100% 100%, 100% 35%);
                }
                100% { 
                    clip-path: polygon(50% 50%, 100% 0, 100% 0, 0 0, 0 100%, 100% 100%, 100% 100%);
                }
            }
            @keyframes l5-2{ 
                100% {transform: translate(300px)}
            }
            @keyframes l5-0{ 
                0% {background-size:0% 100%,60px 100%} /* FEWER DOTS: 60px spacing */
                100% {background-size:120% 100%,60px 100%} /* FEWER DOTS: 60px spacing */
            }
        </style>
    `;

    document.body.appendChild(shutdownOverlay);

    // Variables for shake detection
    let lastX = 0;
    let lastY = 0;
    let shakeCount = 0;
    const shakeThreshold = 15;
    const shakesRequired = 3;

    // Mouse movement handler for shake detection
    function handleMouseMove(e) {
        const deltaX = Math.abs(e.clientX - lastX);
        const deltaY = Math.abs(e.clientY - lastY);
        
        if (deltaX > shakeThreshold || deltaY > shakeThreshold) {
            shakeCount++;
            
            const overlay = document.getElementById('shutdownOverlay');
            // Gradually lighten the background with each shake
            const opacity = 1 - (shakeCount * 0.25);
            overlay.style.backgroundColor = `color-mix(in srgb, var(--purple) ${opacity * 100}%, var(--light-pink))`;
            
            if (shakeCount >= shakesRequired) {
                wakeUp();
            }
        }
        
        lastX = e.clientX;
        lastY = e.clientY;
    }

    // Wake up function with direct transition
    function wakeUp() {
        document.removeEventListener('mousemove', handleMouseMove);
        
        const overlay = document.getElementById('shutdownOverlay');
        const screenContent = overlay.querySelector('.screen-content');
        
        // Direct transition - update content immediately
        screenContent.innerHTML = `
            <i class="hn hn-sun-solid" style="font-size: 64px; color: var(--yellow); margin-bottom: 30px;"></i>
            <div class="status-text" style="color: var(--yellow);">Booting up...</div>
            
            <div class="loader-container">
                <div class="loader-boot"></div>
            </div>
            
            <div class="instruction-text" style="color: var(--yellow); margin-top: 40px;">SYSTEM READY</div>
        `;
        
        // Add boot loader styles
        const style = document.createElement('style');
        style.textContent = `
            .loader-boot {
                width: 300px;
                height: 24px;
                padding: 2px 0;
                box-sizing: border-box;
                display: flex;
                animation: l5-0-boot 6s infinite steps(6);
                background:
                    linear-gradient(transparent 0 0) 0 0/120% 100% no-repeat,
                    radial-gradient(circle 4px, var(--yellow) 90%, transparent) 0 0/60px 100% /* FEWER DOTS: 60px spacing (5 dots total) */
                    transparent;
                overflow: hidden;
            }
            .loader-boot::before {
                content: "";
                width: 20px;
                transform: translate(-100%);
                border-radius: 50%;
                background: var(--yellow);
                animation: 
                    l5-1-boot 0.6s infinite ease-in-out, /* FASTER and SMOOTHER: 0.6s chew, opens fully */
                    l5-2-boot  6s infinite linear;
                animation-delay: 0s, 0s;
            }
            @keyframes l5-1-boot{ 
                0% { 
                    clip-path: polygon(50% 50%, 100% 0, 100% 0, 0 0, 0 100%, 100% 100%, 100% 100%);
                }
                50% { 
                    clip-path: polygon(50% 50%, 100% 65%, 100% 0, 0 0, 0 100%, 100% 100%, 100% 35%);
                }
                100% { 
                    clip-path: polygon(50% 50%, 100% 0, 100% 0, 0 0, 0 100%, 100% 100%, 100% 100%);
                }
            }
            @keyframes l5-2-boot{ 
                100% {transform: translate(300px)}
            }
            @keyframes l5-0-boot{ 
                0% {background-size:0% 100%,60px 100%} /* FEWER DOTS: 60px spacing */
                100% {background-size:120% 100%,60px 100%} /* FEWER DOTS: 60px spacing */
            }
        `;
        overlay.appendChild(style);

        // Set final background color
        overlay.style.backgroundColor = 'var(--pink)';
        
        // Smooth fade out after boot sequence
        setTimeout(() => {
            overlay.style.opacity = '0';
            
            setTimeout(() => {
                overlay.remove();
            }, 800);
        }, 2000);
    }

    // Add mouse movement listener after a short delay
    setTimeout(() => {
        document.addEventListener('mousemove', handleMouseMove);
    }, 1500);
}