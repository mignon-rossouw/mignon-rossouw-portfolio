// Recycle Bin data with icons
const recycleBinList = [
    {   
        id: 'bin1', 
        title: 'old_portfolio_v1.html',
        type: 'html',
        deletedDate: '2 days ago',
        size: '15KB'
    },
    {   
        id: 'bin2', 
        title: 'resume_old.docx',
        type: 'document',
        deletedDate: '1 week ago', 
        size: '45KB'
    },
    {   
        id: 'bin3', 
        title: 'project_sketch.fig',
        type: 'design',
        deletedDate: '3 days ago',
        size: '128KB'
    },
    { 
        id: 'bin4', 
        title: 'notes_backup.txt',
        type: 'text',
        deletedDate: '5 days ago',
        size: '8KB'
    },
    { 
        id: 'bin5', 
        title: 'cat_photos.zip',
        type: 'archive',
        deletedDate: '1 day ago',
        size: '2.3MB'
    },
    { 
        id: 'bin6', 
        title: 'music_playlist.m3u',
        type: 'music',
        deletedDate: '2 weeks ago',
        size: '4KB'
    }
];

function loadRecycleBinWindow() {
    const windowBody = document.querySelector('#recycleBin .window-body');
    const recycleBinWindow = document.getElementById('recycleBin');
    if (!windowBody || !recycleBinWindow) return;

    // Clear existing content
    windowBody.innerHTML = '';

    // REMOVE hardcoded size - let it adjust to content
    // recycleBinWindow.style.width = '450px';
    // recycleBinWindow.style.height = '400px';

    // Set maximum size constraints
    recycleBinWindow.style.maxWidth = '95vw';
    recycleBinWindow.style.maxHeight = '90vh';

    // Set pink scrollbar
    windowBody.style.scrollbarColor = 'var(--pink) transparent';

    // Create container for recycle bin items using Bootstrap
    const container = document.createElement('div');
    container.className = 'd-flex flex-column gap-2 overflow-auto p-3';
    container.style.maxHeight = '100%';
    container.style.height = '95%';
    container.style.scrollbarColor = 'var(--pink) transparent';

    // Add recycle bin items
    recycleBinList.forEach(item => {
        const binItem = document.createElement('div');
        binItem.className = 'document-item p-2 me-3 mb-2';
        binItem.style.cursor = 'pointer';
        binItem.style.transition = 'all 0.2s ease';
        binItem.style.wordBreak = 'break-word';
        binItem.style.background = 'var(--light-pink)';
        binItem.style.border = 'none';
        binItem.style.outline = '2px dashed var(--puce)';
        binItem.style.outlineOffset = '2px';
        binItem.style.position = 'relative';
        binItem.onclick = () => openRecycleItem(item.id);

        // Add hover effects
        binItem.onmouseover = function() {
            this.classList.add('shadow');
            this.style.background = 'var(--pink)';
        };
        
        binItem.onmouseout = function() {
            this.classList.remove('shadow');
            this.style.background = 'var(--light-pink)';
            this.style.transform = 'translateY(0)';
        };

        // Create flex container for icon + content
        const contentContainer = document.createElement('div');
        contentContainer.className = 'd-flex align-items-center gap-3';
        
        // Add icon based on file type
        const icon = document.createElement('i');
        switch(item.type) {
            case 'html':
                icon.className = 'hn hn-writing';
                break;
            case 'document':
                icon.className = 'hn hn-writing';
                break;
            case 'design':
                icon.className = 'hn hn-writing';
                break;
            case 'text':
                icon.className = 'hn hn-writing';
                break;
            case 'archive':
                icon.className = 'hn hn-writing';
                break;
            case 'music':
                icon.className = 'hn hn-writing';
                break;
            default:
                icon.className = 'hn hn-writing';
        }
        icon.style.fontSize = '30px';
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
        title.style.fontWeight = 'bold';
        title.style.fontSize = '12px';

        // Add metadata
        const metadata = document.createElement('div');
        metadata.className = 'document-metadata';
        metadata.innerHTML = `
            <small style="color: var(--puce); font-size: 8px; opacity: 0.6;">
                Deleted: ${item.deletedDate} • Size: ${item.size}
            </small>
        `;

        // Add elements to containers
        textContainer.appendChild(title);
        textContainer.appendChild(metadata);
        contentContainer.appendChild(icon);
        contentContainer.appendChild(textContainer);
        binItem.appendChild(contentContainer);
        container.appendChild(binItem);
    });

    windowBody.appendChild(container);
    
    // Center the window after content is loaded
    centerWindow(recycleBinWindow);
}

function openRecycleItem(itemId) {
    alert("Can only be viewed by approved peoples. ฅ( ̳Φ·̫Φ# ̳)੭ु");
}