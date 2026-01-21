// My Computer 
// Add My Computer data
const myComputerList = [
    {   
        id: 'drive1', 
        title: 'Local Disk (C:)',
        type: 'drive',
        size: '245GB free of 500GB'
    },
    {   
        id: 'drive2', 
        title: 'Documents (D:)',
        type: 'drive', 
        size: '89GB free of 250GB'
    },
    {   
        id: 'drive3', 
        title: 'System Files',
        type: 'system',
        size: '15GB free of 20GB'
    },
    { 
        id: 'folder1', 
        title: 'Documents',
        type: 'folder',
        size: '125 items'
    },
    { 
        id: 'folder2', 
        title: 'My Pictures',
        type: 'folder',
        size: '347 items'
    },
    { 
        id: 'folder3', 
        title: 'Music',
        type: 'folder',
        size: '89 items'
    }
];

function loadMyComputerWindow() {
    const windowBody = document.querySelector('#myComputer .window-body');
    const myComputerWindow = document.getElementById('myComputer');
    if (!windowBody || !myComputerWindow) return;

    // Clear existing content
    windowBody.innerHTML = '';

    // RESET WINDOW SIZE to original
    myComputerWindow.style.width = '400px';
    myComputerWindow.style.height = '300px';
    centerWindow(myComputerWindow);

    // Set pink scrollbar
    windowBody.style.scrollbarColor = 'var(--pink) transparent';

    // Create container for computer items using Bootstrap
    const container = document.createElement('div');
    container.className = 'd-flex flex-column gap-2 overflow-auto';
    container.style.maxHeight = '100%';
    container.style.height = '95%';
    container.style.scrollbarColor = 'var(--pink) transparent';

    myComputerList.forEach(item => {
        const computerItem = document.createElement('div');
        computerItem.className = 'document-item p-2 me-3';
        computerItem.style.cursor = 'pointer';
        computerItem.style.transition = 'all 0.2s ease';
        computerItem.style.wordBreak = 'break-word';
        computerItem.onclick = () => openComputerItem(item.id);

        // Add hover effects
        computerItem.onmouseover = function() {
            this.style.background = 'var(--light-pink)';
            this.style.borderLeft = '4px solid var(--pink)';
        };
        
        // Clear Hover Effects
        computerItem.onmouseout = function() {
            this.style.background = '';
            this.style.borderLeft = '';
        };

        // Create flex container for icon + content
        const contentContainer = document.createElement('div');
        contentContainer.className = 'd-flex align-items-center gap-3';
        
        // Add icon based on item type
        const icon = document.createElement('i');
        switch(item.type) {
            case 'drive':
                icon.className = 'hn hn-save-solid';
                break;
            case 'system':
                icon.className = 'hn hn-cog-solid';
                break;
            case 'folder':
                icon.className = 'hn hn-folder-solid';
                break;
            default:
                icon.className = 'hn hn-folder-solid';
        }
        icon.style.fontSize = '35px';
        icon.style.color = 'var(--puce)';

        // Create content container for title and metadata
        const textContainer = document.createElement('div');
        textContainer.className = 'd-flex flex-column';
        
        // Add title
        const title = document.createElement('div');
        title.className = 'document-title';
        title.textContent = item.title;
        title.style.wordBreak = 'break-word';
        title.style.color = 'var(--purple)';
        title.style.fontSize = '10px';

        // Add metadata
        const metadata = document.createElement('div');
        metadata.className = 'document-metadata';
        metadata.innerHTML = `
            <small style="color: var(--puce); font-size: 8px; opacity: 0.5;">
                ${item.size}
            </small>
        `;

        // Add elements to containers
        textContainer.appendChild(title);
        textContainer.appendChild(metadata);
        contentContainer.appendChild(icon);
        contentContainer.appendChild(textContainer);
        computerItem.appendChild(contentContainer);
        container.appendChild(computerItem);
    });

    windowBody.appendChild(container);
}

function openComputerItem(itemId) {
    const item = myComputerList.find(i => i.id === itemId);
    if (!item) return;

    const windowBody = document.querySelector('#myComputer .window-body');
    const myComputerWindow = document.getElementById('myComputer');
    if (!windowBody || !myComputerWindow) return;

    // Clear the window
    windowBody.innerHTML = '';

    // Create back button (same style as documents)
    const backButton = document.createElement('button');
    backButton.className = 'btn btn-lg mb-3';
    backButton.title = 'Back to My Computer';

    // Resize window for better viewing
    myComputerWindow.style.maxWidth = '80%';
    myComputerWindow.style.height = '70%';
    centerWindow(myComputerWindow);

    // Store the original styles
    const originalStyles = {
        backgroundColor: 'var(--light-pink)',
        color: 'var(--purple)',
        borderTop: '3px solid var(--pink)',
        borderLeft: '3px solid var(--pink)',
        borderBottom: '3px solid var(--grape)',
        borderRight: '3px solid var(--grape)'
    };
    
    // Apply custom colors
    backButton.style.backgroundColor = originalStyles.backgroundColor;
    backButton.style.color = originalStyles.color;
    backButton.style.border = originalStyles.border;
    backButton.style.borderTop = originalStyles.borderTop;
    backButton.style.borderLeft = originalStyles.borderLeft;
    backButton.style.borderBottom = originalStyles.borderBottom;
    backButton.style.borderRight = originalStyles.borderRight;
    backButton.style.borderRadius = '0';
    backButton.style.width = '32px';
    backButton.style.height = '32px';
    backButton.style.display = 'flex';
    backButton.style.alignItems = 'center';
    backButton.style.justifyContent = 'center';

    // Create icon element
    const backIcon = document.createElement('i');
    backIcon.className = 'hn hn-arrow-left-solid';
    
    // Add icon and text to button
    backButton.appendChild(backIcon);

    // Add hover effects
    backButton.onmouseover = function() {
        this.style.backgroundColor = 'var(--puce)';
        this.style.color = 'var(--light-pink)';
    };
    
    backButton.onmouseout = function() {
        this.style.backgroundColor = originalStyles.backgroundColor;
        this.style.color = originalStyles.color;
        this.style.border = originalStyles.border;
        this.style.borderTop = originalStyles.borderTop;
        this.style.borderLeft = originalStyles.borderLeft;
        this.style.borderBottom = originalStyles.borderBottom;
        this.style.borderRight = originalStyles.borderRight;
    };
    
    backButton.onclick = loadMyComputerWindow;
    windowBody.appendChild(backButton);

    // Create scrollable container
    const scrollContainer = document.createElement('div');
    scrollContainer.style.overflowY = 'auto';
    scrollContainer.style.maxHeight = '85%';
    scrollContainer.style.padding = '10px';
    scrollContainer.style.boxSizing = 'border-box';

    // Show computer item content
    const content = document.createElement('div');
    content.innerHTML = `
        <div 
        class="p-4 me-2" 
        style="
            background: var(--light-pink);
            border: double 7px;
            border-color: var(--pink);
            color: var(--purple);
            font-size: 15px;
            line-height: 1.7;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        ">
            <h3 
            class="mb-3 px-2 py-2"
            style="
                color: var(--puce);
                background-color: var(--pink);
                text-align: center;
                border: none var(--light-pink);
                outline: 3px dashed var(--pink);
                outline-offset: 3px;
                text-shadow: 2px 2px 0px var(--light-pink);
                user-select: none;
            ">
            ${item.title}
            </h3>
            
            <div class="text-center mb-4">
                <i class="hn hn-${getComputerIcon(item.type)}" style="font-size: 48px; color: var(--neon-pink);"></i>
            </div>
            
            <div class="p-3 mb-3" style="background: var(--pink); border: 3px solid var(--light-pink);">
                <p style="margin: 0; font-size: 14px; color: var(--grape); text-align: center;">
                    <strong>Type:</strong> ${getComputerTypeName(item.type)}<br>
                    <strong>Size:</strong> ${item.size}
                </p>
            </div>
            
            <p style="font-size: 14px; text-align: center; color: var(--purple);">
                ${getComputerMessage(item.type)}
            </p>
        </div>
    `;

    scrollContainer.appendChild(content);
    windowBody.appendChild(scrollContainer);
}

// Helper functions for My Computer
function getComputerIcon(type) {
    const icons = {
        'drive': 'save-solid',
        'system': 'cog-solid',
        'folder': 'folder-solid'
    };
    return icons[type] || 'folder-solid';
}

function getComputerTypeName(type) {
    const names = {
        'drive': 'Hard Drive',
        'system': 'System Folder',
        'folder': 'Folder'
    };
    return names[type] || 'Folder';
}

function getComputerMessage(type) {
    const messages = {
        'drive': 'This drive contains your system files and applications.',
        'system': 'Important system files. Be careful what you modify!',
        'folder': 'This folder contains your personal files and documents.'
    };
    return messages[type] || 'Browse your files and folders.';
}