// Sample documents data with icons
    const documentsList = [
        {   
            id: 'doc1', 
            title: 'Portfolio Overview' 
        },
        {   
            id: 'doc2', 
            title: 'Projects'
        },
        {   
            id: 'doc3', 
            title: 'Resume', 
            content: '',
            pdfUrl: 'https://drive.google.com/file/d/1kI5yratYJPQbIdahUXo4JISCYf1JB-Y2/view?usp=sharing' 
        },
        { 
            id: 'doc4', 
            title: 'Skills'
        },
        { 
            id: 'doc5', 
            title: 'Fun Facts' 
        },
        { 
            id: 'doc6', 
            title: 'Stuff'
        }
    ];

    function loadDocumentsWindow() {
    const windowBody = document.querySelector('#documents .window-body');
    const documentsWindow = document.getElementById('documents');
    if (!windowBody || !documentsWindow) return;

    // Clear existing content
    windowBody.innerHTML = '';

    // RESET WINDOW SIZE to original
    documentsWindow.style.width = '400px';
    documentsWindow.style.height = '300px';
    centerWindow(documentsWindow);

    // Remove scrollbar background
    windowBody.style.scrollbarColor = 'var(--pink) transparent';

    // Create container for documents using Bootstrap
    const container = document.createElement('div');
    container.className = 'd-flex flex-column gap-2 overflow-auto';
    container.style.maxHeight = '100%';
    container.style.height = '95%';
    container.style.scrollbarColor = 'var(--light-pink) transparent';

    documentsList.forEach(doc => {
        const docItem = document.createElement('div');
        docItem.className = 'document-item p-2 me-3';
        docItem.style.cursor = 'pointer';
        docItem.style.transition = 'all 0.2s ease';
        docItem.style.wordBreak = 'break-word';
        docItem.onclick = () => openDocument(doc.id);

        // Add hover effects
        docItem.onmouseover = function() {
            this.style.background = 'var(--light-pink)';
            this.style.color = 'var(--pink)';
            this.style.borderLeft = '4px solid var(--pink)';
        };
        
        docItem.onmouseout = function() {
            this.style.background = '';
            this.style.borderColor = '';
            this.style.borderLeft = '';
            this.style.transform = 'translateY(0)';
        };

        // Create flex container for icon + title
        const contentContainer = document.createElement('div');
        contentContainer.className = 'd-flex align-items-center gap-3';
        
        // Add icon based on document type
        const icon = document.createElement('i');
        switch(doc.id) {
            case 'doc1':
                icon.className = 'hn hn-user-solid';
                break;
            case 'doc2':
                icon.className = 'hn hn-bullet-list-solid';
                break;
            case 'doc3':
                icon.className = 'hn hn-writing';
                break;
            case 'doc4':
                icon.className = 'hn hn-code-solid';
                break;
            case 'doc5':
                icon.className = 'hn hn-startups';
                break;
            case 'doc6':
                icon.className = 'hn hn-question-solid';
                break;
            default:
                icon.className = 'hn hn-startups';
        }
        icon.style.fontSize = '25px';
        icon.style.color = 'var(--puce)';

        // Add title with Bootstrap text classes
        const title = document.createElement('div');
        title.className = 'document-title';
        title.textContent = doc.title;
        title.style.wordBreak = 'break-word';
        title.style.color = 'var(--purple)';

        // Add icon and title to flex container
        contentContainer.appendChild(icon);
        contentContainer.appendChild(title);

        // Add flex container to document item
        docItem.appendChild(contentContainer);
        container.appendChild(docItem);
    });

    windowBody.appendChild(container);
}

function openDocument(docId) {
    const doc = documentsList.find(d => d.id === docId);
    if (!doc) return;

    // If it's the resume and has a PDF URL, open Google Drive in new tab
    if (docId === 'doc3' && doc.pdfUrl) {
        window.open(doc.pdfUrl, '_blank');
        return;
    }

    const windowBody = document.querySelector('#documents .window-body');
    const documentsWindow = document.getElementById('documents');
    if (!windowBody || !documentsWindow) return;

    // Clear the window
    windowBody.innerHTML = '';

    // Create back button with Bootstrap classes
    const backButton = document.createElement('button');
    backButton.className = 'btn btn-lg mb-3';
    backButton.title = 'Back to Documents';

    // Resize window ONLY for Portfolio Overview
    if (docId === 'doc1' || docId === 'doc2' || docId === 'doc4' || docId === 'doc5' || docId === 'doc6') {
        documentsWindow.style.maxWidth = '80%';
        documentsWindow.style.height = '70%';
        // Center the window after resizing
        centerWindow(documentsWindow);
    } else {
        // Reset to default size for other documents
        documentsWindow.style.width = '400px';
        documentsWindow.style.height = '300px';
        centerWindow(documentsWindow);
    }

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
        // Reset to original styles
        this.style.backgroundColor = originalStyles.backgroundColor;
        this.style.color = originalStyles.color;
        this.style.border = originalStyles.border;
        this.style.borderTop = originalStyles.borderTop;
        this.style.borderLeft = originalStyles.borderLeft;
        this.style.borderBottom = originalStyles.borderBottom;
        this.style.borderRight = originalStyles.borderRight;
    };
    
    backButton.onclick = loadDocumentsWindow;
    windowBody.appendChild(backButton);

    // Create scrollable container with proper spacing
    const scrollContainer = document.createElement('div');
    scrollContainer.style.overflowY = 'auto';
    scrollContainer.style.maxHeight = '85%';
    scrollContainer.style.padding = '10px';
    scrollContainer.style.boxSizing = 'border-box';

    // Show document content - enhanced styling for overview
    const content = document.createElement('div');
    
    if (docId === 'doc1') {
        // Enhanced styling for Portfolio Overview text
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
                Welcome to My Portfolio!
                </h3>
                
                <p 
                class="mb-4" 
                style="
                    font-size: 12px;
                    text-align: justify;
                    user-select: none;
                ">
                I’m an aspiring frontend developer who thrives on crafting fun, engaging, and user-centered digital experiences. With one foot in design and the other in development, I happily connect creative ideas with smooth, technical execution.
                </p>
                
                <h4 
                class="p-2 mb-4 fs-6" 
                style="
                    color: var(--puce);
                    text-align: center;
                    border: none var(--light-pink);
                    outline: 3px dashed var(--pink);
                    outline-offset: 3px;
                    text-shadow: 2px 2px 0px var(--pink);
                    user-select: none;
                ">
                WHAT I OFFER:
                </h4>
                
                <ul 
                class="mb-4 p-0"
                style="
                    font-size: 12px;
                    list-style: none;
                    user-select: none;
                ">
            <li 
            class="mb-3"
            style="display: flex; align-items: flex-start;">

                <i class="hn hn-angle-right-solid" style="color: var(--pink); margin-right: 8px; margin-top: 2px;"></i>

                <span>/ᐠ •̀ ˕ •́ マ</span>
            </li>
            <li 
            class="mb-3"
            style="display: flex; align-items: flex-start;">
                <i class="hn hn-angle-right-solid" style="color: var(--pink); margin-right: 8px; margin-top: 2px;"></i>
                <span>/ᐠ •̀ ˕ •́ マ</span>
            </li>
            <li 
            class="mb-3"
            style="display: flex; align-items: flex-start;">
                <i class="hn hn-angle-right-solid" style="color: var(--pink); margin-right: 8px; margin-top: 2px;"></i>
                <span>/ᐠ •̀ ˕ •́ マ</span>
            </li>
            <li 
            class="mb-3"
            style="display: flex; align-items: flex-start;">
                <i class="hn hn-angle-right-solid" style="color: var(--pink); margin-right: 8px; margin-top: 2px;"></i>
                <span>/ᐠ •̀ ˕ •́ マ</span>
            </li>
            <li style="8px; display: flex; align-items: flex-start;">
                <i class="hn hn-angle-right-solid" style="color: var(--pink); margin-right: 8px; margin-top: 2px;"></i>
                <span><strong>/ᐠ •̀ ˕ •́ マ</span>
            </li>
        </ul>
                
                <div style="
                    
        ">
            <h5 
            class="p-2 mb-4 fs-6" 
                style="
                    color: var(--puce);
                    text-align: center;
                    border: none var(--light-pink);
                    outline: 3px dashed var(--pink);
                    outline-offset: 3px;
                    text-shadow: 2px 2px 0px var(--pink);
                    user-select: none;
                ">WEBSITE GUIDE</h5>
            <ul 
            class="mb-3 p-0"
            style="
                list-style: none;
                font-size: 12px;
            ">
                <li 
                class="mb-4 p-2"
                style=" display: flex; 
                        align-items: 
                        flex-start; 
                        background-color: var(--pink);
                        border: none var(--light-pink);
                        outline: 3px solid var(--pink);
                        outline-offset: 3px;
                        user-select: none;
                        ">
                    <i class="hn hn-folder-open-solid me-3" style=" color: var(--light-pink);
                            margin-right: 8px; 
                            margin-top: 2px;
                            "></i>
                    <span><strong style="color: var(--neon-pink);">Documents</strong> <br>Explore my stuff. ( ↀᴥↀ )ฅ</span>
                </li>

                <li 
                class="mb-4 p-2"
                style=" display: flex; 
                        align-items: 
                        flex-start; 
                        background-color: var(--pink);
                        border: none var(--light-pink);
                        outline: 3px solid var(--pink);
                        outline-offset: 3px;
                        user-select: none;
                        ">
                    <i class="hn hn-web3 me-3" style="color: var(--pink);margin-right: 8px; margin-top: 2px;"></i>
                    <span><strong style="color: var(--neon-pink);">Meowser</strong> <br> You can browse a.n.y.t.h.i.n.g. </span>
                </li>

                <li 
                class="mb-4 p-2"
                style=" display: flex; 
                        align-items: 
                        flex-start; 
                        background-color: var(--pink);
                        border: none var(--light-pink);
                        outline: 3px solid var(--pink);
                        outline-offset: 3px;
                        user-select: none;
                        ">
                    <i class="hn hn-writing me-3" style="color: var(--light-pink);margin-right: 8px; margin-top: 2px;"></i>
                    <span><strong style="color: var(--neon-pink);">Notes</strong> <br> Secret thoughts. Don't go through this...</span>
                </li>

                <li 
                class="mb-4 p-2"
                style=" display: flex; 
                        align-items: 
                        flex-start; 
                        background-color: var(--pink);
                        border: none var(--light-pink);
                        outline: 3px solid var(--pink);
                        outline-offset: 3px;
                        user-select: none;
                        ">
                    <i class="hn hn-gaming me-3" style="color: var(--light-pink);margin-right: 8px; margin-top: 2px;"></i>
                    <span><strong style="color: var(--neon-pink);">Pounce</strong> <br> Cat game I made. Coming soon <br> ≽(-⩊-マ≼</span>
                </li>

                <li 
                class="mb-3 p-2"
                style=" display: flex; 
                        align-items: 
                        flex-start; 
                        background-color: var(--pink);
                        border: none var(--light-pink);
                        outline: 3px solid var(--pink);
                        outline-offset: 3px;
                        user-select: none;
                ">

                    <i class="hn hn-music-solid me-3" style="color: var(--light-pink);margin-right: 8px; margin-top: 2px;"></i>
                    <span><strong style="color: var(--neon-pink);">Spotify</strong> 
                        
                        <br> 
                        Check out my playlist on Spotify!
                        
                        </span>
                </li>
            </ul>
        </div>
            </div>
        `;
    
        } else if (docId === 'doc2') {
    // Projects content with same styling as Overview
    content.innerHTML = `
        <div style="
            background: var(--light-pink);
            border: double 7px;
            border-color: var(--pink);
            color: var(--purple);
            font-size: 15px;
            line-height: 1.7;
        " class="p-4 me-2">
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
            ">My Projects</h3>
            
            <p 
            class="mb-4"
            style="
                font-size: 12px;
                text-align: justify;
                text-shadow: 1px 1px 0px var(--pink);
                user-select: none;
            ">Here are some of the projects I've built to showcase my skills and creativity:</p>
            
            <div style="
            ">
                <h6 
                class="mb-3 px-2 py-2"
                style="
                    color: var(--puce);
                    border: 3px dashed var(--pink);
                    text-align: center;
                    text-shadow: 1px 2px 0px var(--pink);
                    user-select: none;
                ">Featured Projects</h6>
                
                <ul style="
                    margin-left: 0;
                    list-style: none;
                    padding-left: 0;
                ">

                <!-- ##### Project 1 ##### -->
                    <li class="mb-4 p-2" style="background-color:var(--pink); border: 5px double var(--light-pink);">
                        <div style="display: flex; align-items: flex-start; margin-bottom: 5px;">
                            <i class="hn hn-code-solid me-3" style="color: var(--grape);margin-right: 8px; margin-top: 2px;"></i>

                            <span style="font-size:11px; margin-bottom: 10px; color: var(--light-pink);">
                                
                                <strong style="color: var(--grape); font-size:14px; text-shadow: 
                                1px 1px 1px var(--light-pink);
                                user-select: none;">Portfolio Website</strong> 
                                
                                <br> 
                                
                                <p
                                class="mt-2"
                                style="text-shadow: 
                                1px 1px 1px var(--puce);
                                user-select: none;"
                                >
                                This retro-inspired desktop simulator portfolio built with HTML, CSS, Bootstrap, and JavaScript.
                                </p>
                                
                            </span>
                        </div>

                        
                        <a href="#"
                            class="p-2"
                            style="
                                color: var(--grape);
                                text-decoration: none;
                                display: inline-flex;
                                align-items: center;
                                gap: 4px;
                                margin-left: 28px;
                                font-size:10px;
                                background-color: var(--pink);
                                border: 3px outset var(--light-pink);
                                text-shadow: 1px 1px 0px var(--light-pink);
                            ">
                            <i class="hn hn-globe-solid" style="color: var(--grape); margin-right: 4px; font-size:15px;"></i>View Live
                        </a>
                    </li>

                    <!-- ##### Project 2 ##### -->
                    <li class="mb-4 p-2" style="background-color:var(--pink); border: 5px double var(--light-pink);">
                        <div style="display: flex; align-items: flex-start; margin-bottom: 5px;">
                            <i class="hn hn-code-solid me-3" style="color: var(--grape);margin-right: 8px; margin-top: 2px;"></i>

                            <span style="font-size:11px; margin-bottom: 10px; color: var(--light-pink);">
                                
                                <strong style="color: var(--grape); font-size:14px; text-shadow: 
                                1px 1px 1px var(--light-pink);
                                user-select: none;">Project 2</strong> 
                                
                                <br> 
                                
                                <p
                                class="mt-2"
                                style="text-shadow: 
                                1px 1px 1px var(--puce);
                                user-select: none;"
                                >
                                Coming soon ≽(-⩊-マ≼
                                </p>
                                
                            </span>
                        </div>

                        
                        <a href="#"
                            class="p-2"
                            style="
                                color: var(--grape);
                                text-decoration: none;
                                display: inline-flex;
                                align-items: center;
                                gap: 4px;
                                margin-left: 28px;
                                font-size:10px;
                                background-color: var(--pink);
                                border: 3px outset var(--light-pink);
                                text-shadow: 1px 1px 0px var(--light-pink);
                            ">
                            <i class="hn hn-globe-solid" style="color: var(--grape); margin-right: 4px; font-size:15px;"></i>View Live
                        </a>
                    </li>

                    <!-- ##### Project 3 ##### -->
                    <li class="mb-4 p-2" style="background-color:var(--pink); border: 5px double var(--light-pink);">
                        <div style="display: flex; align-items: flex-start; margin-bottom: 5px;">
                            <i class="hn hn-code-solid me-3" style="color: var(--grape);margin-right: 8px; margin-top: 2px;"></i>

                            <span style="font-size:11px; margin-bottom: 10px; color: var(--light-pink);">
                                
                                <strong style="color: var(--grape); font-size:14px; text-shadow: 
                                1px 1px 1px var(--light-pink);
                                user-select: none;">Project 3</strong> 
                                
                                <br> 
                                
                                <p
                                class="mt-2"
                                style="text-shadow: 
                                1px 1px 1px var(--puce);
                                user-select: none;"
                                >
                                Coming soon ≽(-⩊-マ≼
                                </p>
                                
                            </span>
                        </div>

                        
                        <a href="#"
                            class="p-2"
                            style="
                                color: var(--grape);
                                text-decoration: none;
                                display: inline-flex;
                                align-items: center;
                                gap: 4px;
                                margin-left: 28px;
                                font-size:10px;
                                background-color: var(--pink);
                                border: 3px outset var(--light-pink);
                                text-shadow: 1px 1px 0px var(--light-pink);
                            ">
                            <i class="hn hn-globe-solid" style="color: var(--grape); margin-right: 4px; font-size:15px;"></i>View Live
                        </a>
                    </li>
                    
                    <!-- ##### Project 4 ##### -->
                    <li class="mb-4 p-2" style="background-color:var(--pink); border: 5px double var(--light-pink);">
                        <div style="display: flex; align-items: flex-start; margin-bottom: 5px;">
                            <i class="hn hn-code-solid me-3" style="color: var(--grape);margin-right: 8px; margin-top: 2px;"></i>

                            <span style="font-size:11px; margin-bottom: 10px; color: var(--light-pink);">
                                
                                <strong style="color: var(--grape); font-size:14px; text-shadow: 
                                1px 1px 1px var(--light-pink);
                                user-select: none;">Project 4</strong> 
                                
                                <br> 
                                
                                <p
                                class="mt-2"
                                style="text-shadow: 
                                1px 1px 1px var(--puce);
                                user-select: none;"
                                >
                                Coming soon ≽(-⩊-マ≼
                                </p>
                                
                            </span>
                        </div>

                        
                        <a href="#"
                            class="p-2"
                            style="
                                color: var(--grape);
                                text-decoration: none;
                                display: inline-flex;
                                align-items: center;
                                gap: 4px;
                                margin-left: 28px;
                                font-size:10px;
                                background-color: var(--pink);
                                border: 3px outset var(--light-pink);
                                text-shadow: 1px 1px 0px var(--light-pink);
                            ">
                            <i class="hn hn-globe-solid" style="color: var(--grape); margin-right: 4px; font-size:15px;"></i>View Live
                        </a>
                    </li>

                    <!-- ##### Project 5 ##### -->
                    <li class="mb-4 p-2" style="background-color:var(--pink); border: 5px double var(--light-pink);">
                        <div style="display: flex; align-items: flex-start; margin-bottom: 5px;">
                            <i class="hn hn-code-solid me-3" style="color: var(--grape);margin-right: 8px; margin-top: 2px;"></i>

                            <span style="font-size:11px; margin-bottom: 10px; color: var(--light-pink);">
                                
                                <strong style="color: var(--grape); font-size:14px; text-shadow: 
                                1px 1px 1px var(--light-pink);
                                user-select: none;">Project 5</strong> 
                                
                                <br> 
                                
                                <p
                                class="mt-2"
                                style="text-shadow: 
                                1px 1px 1px var(--puce);
                                user-select: none;"
                                >
                                Coming soon ≽(-⩊-マ≼
                                </p>
                                
                            </span>
                        </div>

                        
                        <a href="#"
                            class="p-2"
                            style="
                                color: var(--grape);
                                text-decoration: none;
                                display: inline-flex;
                                align-items: center;
                                gap: 4px;
                                margin-left: 28px;
                                font-size:10px;
                                background-color: var(--pink);
                                border: 3px outset var(--light-pink);
                                text-shadow: 1px 1px 0px var(--light-pink);
                            ">
                            <i class="hn hn-globe-solid" style="color: var(--grape); margin-right: 4px; font-size:15px;"></i>View Live
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `;
    } else if (docId === 'doc4') {
        // SKILLS CONTENT
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
                My Skills & Technologies
                </h3>
                
                <p 
                class="mb-4" 
                style="
                    font-size: 12px;
                    text-align: justify;
                    user-select: none;
                ">
                I'm constantly learning and expanding my skill set. Here's what I can bring to your project:
                </p>
                
                <!-- PROGRAMMING LANGUAGES -->
                <div class="mb-4">
                    <h4 
                    class="p-2 mb-3 fs-6" 
                    style="
                        color: var(--puce);
                        text-align: center;
                        border: none var(--light-pink);
                        outline: 3px dashed var(--pink);
                        outline-offset: 3px;
                        text-shadow: 2px 2px 0px var(--pink);
                        user-select: none;
                    ">
                    PROGRAMMING LANGUAGES
                    </h4>
                    
                    <div class="row g-2">
                        <!-- HTML5 -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                    style=" color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px solid var(--pink);
                                            background-color: var(--pink);
                                            outline-offset: 2px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <i class="hn hn-code-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">HTML5</strong>
                                </div>
                                <div style="margin-top: 4px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 100%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- CSS3 -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                    style=" color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px solid var(--pink);
                                            background-color: var(--pink);
                                            outline-offset: 2px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <i class="hn hn-code-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">CSS3</strong>
                                </div>
                                <div style="margin-top: 4px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 95%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- PHP -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                    style=" color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px solid var(--pink);
                                            background-color: var(--pink);
                                            outline-offset: 2px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <i class="hn hn-code-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">PHP</strong>
                                </div>
                                <div style="margin-top: 4px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- JavaScript -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                    style=" color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px solid var(--pink);
                                            background-color: var(--pink);
                                            outline-offset: 2px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <i class="hn hn-code-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">JavaScript</strong>
                                </div>
                                <div style="margin-top: 4px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- SQL -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                    style=" color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px solid var(--pink);
                                            background-color: var(--pink);
                                            outline-offset: 2px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <i class="hn hn-code-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">SQL</strong>
                                </div>
                                <div style="margin-top: 4px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Python -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                    style=" color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px solid var(--pink);
                                            background-color: var(--pink);
                                            outline-offset: 2px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <i class="hn hn-code-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Python</strong>
                                </div>
                                <div style="margin-top: 4px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Java -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                    style=" color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px solid var(--pink);
                                            background-color: var(--pink);
                                            outline-offset: 2px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <i class="hn hn-code-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Java</strong>
                                </div>
                                <div style="margin-top: 4px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- C# -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                    style=" color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px solid var(--pink);
                                            background-color: var(--pink);
                                            outline-offset: 2px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <i class="hn hn-code-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">C#</strong>
                                </div>
                                <div style="margin-top: 4px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 95%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- FRAMEWORKS -->
                <div class="mb-4">
                    <h4 
                    class="p-2 mb-3 fs-6" 
                    style="
                        color: var(--puce);
                        text-align: center;
                        border: none var(--light-pink);
                        outline: 3px dashed var(--pink);
                        outline-offset: 3px;
                        text-shadow: 2px 2px 0px var(--pink);
                        user-select: none;
                    ">
                    FRAMEWORKS
                    </h4>
                    
                    <div class="row g-2">
                        <!-- Bootstrap -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-mobile-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Bootstrap</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 90%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Tailwind CSS -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-palette-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Tailwind CSS </strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 70%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Materlize -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-code-branch-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Materlize</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <!-- Spring Boot -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-code-branch-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Spring Boot</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- LIBRARIES -->
                <div class="mb-4">
                    <h4 
                    class="p-2 mb-3 fs-6" 
                    style="
                        color: var(--puce);
                        text-align: center;
                        border: none var(--light-pink);
                        outline: 3px dashed var(--pink);
                        outline-offset: 3px;
                        text-shadow: 2px 2px 0px var(--pink);
                        user-select: none;
                    ">
                    LIBRARIES
                    </h4>
                    
                    <div class="row g-2">
                        <!-- pandas -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-mobile-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">pandas</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 90%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- NumPy -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-palette-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;"> NumPy </strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 70%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Matplotlib -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-code-branch-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Matplotlib</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- BeautifulSoup -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-code-branch-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">BeautifulSoup</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Seaborn -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-code-branch-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Seaborn</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                
                <!-- TOOLS -->
                <div class="mb-4">
                    <h4 
                    class="p-2 mb-3 fs-6" 
                    style="
                        color: var(--puce);
                        text-align: center;
                        border: none var(--light-pink);
                        outline: 3px dashed var(--pink);
                        outline-offset: 3px;
                        text-shadow: 2px 2px 0px var(--pink);
                        user-select: none;
                    ">
                    DESIGN & CREATIVE TOOLS
                    </h4>
                    
                    <div class="row g-2">
                        <!-- Figma -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-mobile-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Figma</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 90%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Adobe Illustrator  -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-palette-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Adobe Illustrator</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 70%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Clip Studio Paint -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-code-branch-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Clip Studio Paint</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <!-- Procreate -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-code-branch-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Procreate</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <!-- Blender -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-code-branch-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Blender</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <!-- Aseprite -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-code-branch-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Aseprite</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Krita -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-laptop-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Krita</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 80%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- DEVELOPER TOOLS -->
                <div class="mb-4">
                    <h4 
                    class="p-2 mb-3 fs-6" 
                    style="
                        color: var(--puce);
                        text-align: center;
                        border: none var(--light-pink);
                        outline: 3px dashed var(--pink);
                        outline-offset: 3px;
                        text-shadow: 2px 2px 0px var(--pink);
                        user-select: none;
                    ">
                    DEVELOPER TOOLS
                    </h4>
                    
                    <div class="row g-2">
                        <!-- Figma -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-mobile-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">VS Code</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 90%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Adobe Illustrator  -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-palette-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Visual Studio</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 70%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Clip Studio Paint -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-code-branch-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">IntelliJ</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <!-- Procreate -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-code-branch-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">NetBeans</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                         <!-- Blender -->
                        <div class="col-6">
                            <div class="p-2 m-2" 
                                style="color: var(--puce);
                                        text-align: center;
                                        border: none var(--light-pink);
                                        outline: 3px solid var(--pink);
                                        background-color: var(--pink);
                                        outline-offset: 2px;
                                        text-shadow: 2px 2px 0px var(--pink);
                                        user-select: none;
                                        min-height: 80px;
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: space-between;">
                                <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                    <i class="hn hn-code-branch-solid" style="color: var(--grape);"></i>
                                    <strong style="color: var(--grape); font-size: 12px;">Android Studio</strong>
                                </div>
                                <div style="margin-top: 8px;">
                                    <div style="background: var(--light-pink); height: 8px; border: 1px solid var(--grape);">
                                        <div style="background: var(--neon-pink); height: 100%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                
                <!-- SOFT SKILLS -->
                    <div class="mb-4">
                        <h4 
                        class="p-2 mb-3 fs-6" 
                        style="
                            color: var(--puce);
                            text-align: center;
                            border: none var(--light-pink);
                            outline: 3px dashed var(--pink);
                            outline-offset: 3px;
                            text-shadow: 2px 2px 0px var(--pink);
                            user-select: none;
                        ">
                        SOFT SKILLS
                        </h4>
                        
                        <div class="row g-2">
                            <div class="col-6">
                                <div class="p-2 m-2" 
                                    style="color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px solid var(--pink);
                                            background-color: var(--pink);
                                            outline-offset: 2px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;
                                            min-height: 80px;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: center;
                                            align-items: center;">

                                    <i class="hn hn-people-carry-solid" style="color: var(--grape); font-size: 16px; margin-bottom: 8px;"></i>
                                    <div style="color: var(--grape); font-size: 11px;">Teamwork</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="p-2 m-2" 
                                    style="color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px solid var(--pink);
                                            background-color: var(--pink);
                                            outline-offset: 2px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;
                                            min-height: 80px;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: center;
                                            align-items: center;">
                                    <i class="hn hn-lightbulb-solid" style="color: var(--grape); font-size: 16px; margin-bottom: 8px;"></i>
                                    <div style="color: var(--grape); font-size: 11px;">Creative Problem Solving</div>
                                </div>
                            </div>
                            <div class="row g-2">
                            <div class="col-6">
                                <div class="p-2 m-2" 
                                    style="color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px solid var(--pink);
                                            background-color: var(--pink);
                                            outline-offset: 2px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;
                                            min-height: 80px;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: center;
                                            align-items: center;">
                                    <i class="hn hn-eye-solid" style="color: var(--grape); font-size: 16px; margin-bottom: 8px;"></i>
                                    <div style="color: var(--grape); font-size: 11px;">Eye for Detail</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="p-2 m-2" 
                                    style="color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px solid var(--pink);
                                            background-color: var(--pink);
                                            outline-offset: 2px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;
                                            min-height: 80px;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: center;
                                            align-items: center;">
                                    <i class="hn hn-refresh-solid" style="color: var(--grape); font-size: 16px; margin-bottom: 8px;"></i>
                                    <div style="color: var(--grape); font-size: 11px;">Adaptability</div>
                                </div>
                            </div>
                            <div class="row g-2">
                            <div class="col-6">
                                <div class="p-2 m-2" 
                                    style="color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px solid var(--pink);
                                            background-color: var(--pink);
                                            outline-offset: 2px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;
                                            min-height: 80px;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: center;
                                            align-items: center;">
                                    <i class="hn hn-lightbulb-solid" style="color: var(--grape); font-size: 16px; margin-bottom: 8px;"></i>
                                    <div style="color: var(--grape); font-size: 11px;">Communication</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="p-2 m-2" 
                                    style="color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px solid var(--pink);
                                            background-color: var(--pink);
                                            outline-offset: 2px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;
                                            min-height: 80px;
                                            display: flex;
                                            flex-direction: column;
                                            justify-content: center;
                                            align-items: center;">
                                    <i class="hn hn-users-solid" style="color: var(--grape); font-size: 16px; margin-bottom: 8px;"></i>
                                    <div style="color: var(--grape); font-size: 11px;">Time Management</div>
                                </div>
                            </div>
                                    
                                    <!-- CURRENTLY LEARNING -->
                                    <div>
                                        <h4 
                                        class="p-2 mb-3 mt-3 fs-6" 
                                        style="
                                            color: var(--puce);
                                            text-align: center;
                                            border: none var(--light-pink);
                                            outline: 3px dashed var(--pink);
                                            outline-offset: 3px;
                                            text-shadow: 2px 2px 0px var(--pink);
                                            user-select: none;
                                        ">
                                       CURRENTLY LEARNING
                                        </h4>
                                        
                                        <div class="row g-2">
                                            <div class="col-6">
                                                <div class="p-2 m-2" 
                                                        style=" color: var(--puce);
                                                                text-align: center;
                                                                border: none var(--light-pink);
                                                                outline: 3px solid var(--pink);
                                                                background-color: var(--pink);
                                                                outline-offset: 2px;
                                                                text-shadow: 2px 2px 0px var(--pink);
                                                                user-select: none;">
                                                    <div style="color: var(--grape); font-size: 11px; margin-top: 4px;">React.js</div>
                                                </div>
                                            </div>
                                            <div class="col-6">
                                                <div class="p-2 m-2" 
                                                        style=" color: var(--puce);
                                                                text-align: center;
                                                                border: none var(--light-pink);
                                                                outline: 3px solid var(--pink);
                                                                background-color: var(--pink);
                                                                outline-offset: 2px;
                                                                text-shadow: 2px 2px 0px var(--pink);
                                                                user-select: none;">
                                                    <div style="color: var(--grape); font-size: 11px; margin-top: 4px;">Node.js</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
    }   else if (docId === 'doc5') {
        // FUN FACTS CONTENT
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
            Fun Facts About Me
            </h3>
            
            <!-- PROGRAMMING FUN FACTS -->
            <div class="mb-4">
                <p>
                    Most of the designs were done by me. Icons are from Hackernoon.
                </p>
            </div>
        </div>
    `;

    }   else if (docId === 'doc6') {
        // stuff content
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
            Stuff
            </h3>
            
            <!-- MAIN BODY CONTENT -->
            <div class="mb-4">
                <p>
                    Coming soon ≽(-⩊-マ≼
                </p>
            </div>
        </div>
    `;

    }   else {
        // Default styling for other documents
        content.className = 'text-break lh-base';
        content.textContent = doc.content;
        content.style.whiteSpace = 'pre-wrap';
    }

    scrollContainer.appendChild(content);
    windowBody.appendChild(scrollContainer);
}