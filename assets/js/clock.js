// Update clock
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            const clockElement = document.getElementById('clock');
                clockElement.textContent = timeString;
                clockElement.style.userSelect = 'none'; // Prevent text selection
                clockElement.style.webkitUserSelect = 'none'; // For Safari
                clockElement.style.mozUserSelect = 'none'; // For Firefox
                clockElement.style.msUserSelect = 'none';
        }
        
        setInterval(updateClock, 1000);
        updateClock();