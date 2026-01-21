// Add Notes data
const notesList = [
    {   
        id: 'note1', 
        title: 'Project Ideas',
        content: 'Coming soon ≽(-⩊-マ≼'
    },
    {   
        id: 'note2', 
        title: 'Learning Goals',
        content: 'Coming soon ≽(-⩊-マ≼'
    },
    {   
        id: 'note3', 
        title: 'Random Thoughts',
        content: 'Coming soon ≽(-⩊-マ≼'
    }
];

function loadNotesWindow() {
    const windowBody = document.querySelector('#notepad .window-body');
    const notesWindow = document.getElementById('notepad');
    if (!windowBody || !notesWindow) return;

    // Clear existing content
    windowBody.innerHTML = '';

    // RESET WINDOW SIZE to original
    notesWindow.style.width = '400px';
    notesWindow.style.height = '300px';
    centerWindow(notesWindow);

    // Set pink scrollbar
    windowBody.style.scrollbarColor = 'var(--pink) transparent';

    // Create container for notes using Bootstrap
    const container = document.createElement('div');
    container.className = 'd-flex flex-column gap-2 overflow-auto';
    container.style.maxHeight = '100%';
    container.style.height = '95%';
    container.style.scrollbarColor = 'var(--pink) transparent';

    notesList.forEach(note => {
        const noteItem = document.createElement('div');
        noteItem.className = 'document-item p-2 me-3';
        noteItem.style.cursor = 'pointer';
        noteItem.style.transition = 'all 0.2s ease';
        noteItem.style.wordBreak = 'break-word';
        noteItem.onclick = () => openNote(note.id);

        // Add hover effects
        noteItem.onmouseover = function() {
            this.style.background = 'var(--light-pink)';
            this.style.borderLeft = '4px solid var(--pink)';
        };
        
        noteItem.onmouseout = function() {
            this.style.background = '';
            this.style.borderLeft = '';
        };

        // Create flex container for icon + title
        const contentContainer = document.createElement('div');
        contentContainer.className = 'd-flex align-items-center gap-3';
        
        // Add note icon
        const icon = document.createElement('i');
        icon.className = 'hn hn-writing';
        icon.style.fontSize = '25px';
        icon.style.color = 'var(--puce)';

        // Add title
        const title = document.createElement('div');
        title.className = 'document-title';
        title.textContent = note.title;
        title.style.wordBreak = 'break-word';

        // Add icon and title to flex container
        contentContainer.appendChild(icon);
        contentContainer.appendChild(title);

        // Add flex container to note item
        noteItem.appendChild(contentContainer);
        container.appendChild(noteItem);
    });

    windowBody.appendChild(container);
}

function openNote(noteId) {
    const note = notesList.find(n => n.id === noteId);
    if (!note) return;

    const windowBody = document.querySelector('#notepad .window-body');
    const notesWindow = document.getElementById('notepad');
    if (!windowBody || !notesWindow) return;

    // Clear the window
    windowBody.innerHTML = '';

    // Create back button (same style as documents)
    const backButton = document.createElement('button');
    backButton.className = 'btn btn-lg mb-3';
    backButton.title = 'Back to Notes';

    // Resize window for better viewing
    notesWindow.style.maxWidth = '80%';
    notesWindow.style.height = '70%';
    centerWindow(notesWindow);

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
    
    backButton.onclick = loadNotesWindow;
    windowBody.appendChild(backButton);

    // Create scrollable container
    const scrollContainer = document.createElement('div');
    scrollContainer.style.overflowY = 'auto';
    scrollContainer.style.maxHeight = '85%';
    scrollContainer.style.padding = '10px';
    scrollContainer.style.boxSizing = 'border-box';

    // Show note content
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
            ${note.title}
            </h3>
            
            <p style="font-size: 14px; text-align: center; color: var(--purple);">
                ${note.content}
            </p>
        </div>
    `;

    scrollContainer.appendChild(content);
    windowBody.appendChild(scrollContainer);
}