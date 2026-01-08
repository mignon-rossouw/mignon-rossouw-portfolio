// Start Menu Toggle
        function toggleStartMenu() {
            const startMenu = document.getElementById('startMenu');
            if (startMenu.style.display === 'block') {
                startMenu.style.display = 'none';
            } else {
                startMenu.style.display = 'block';
            }
        }
        
        // Close start menu when clicking outside
        document.addEventListener('click', function(event) {
            const startMenu = document.getElementById('startMenu');
            const startButton = document.querySelector('.start-button');
            
            if (startMenu && startButton && !startMenu.contains(event.target) && !startButton.contains(event.target)) {
                startMenu.style.display = 'none';
            }
        });