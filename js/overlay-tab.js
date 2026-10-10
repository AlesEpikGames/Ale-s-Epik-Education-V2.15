(() => {
    const overlay = document.createElement('aside');
    overlay.className = 'overlay-sidebar';
    const isGameScreen = document.body.classList.contains('game-screen');
    const homePath = isGameScreen ? '../index.html' : 'index.html';
    const educationPath = isGameScreen ? '../education.html' : 'education.html';
    const otherWebsitesPath = isGameScreen ? '../otherwebsites.html' : 'otherwebsites.html';
    const searchPath = isGameScreen ? '../search.html' : 'search.html';
    const partnersPath = isGameScreen ? '../partners.html' : 'partners.html';
    overlay.innerHTML = `
        <button class="overlay-tab" type="button" aria-expanded="false">Menu</button>
        <div class="overlay-panel">
            <a href="${homePath}">Home</a>
            <a href="${educationPath}">Education</a>
            <a href="${otherWebsitesPath}">Other Websites</a>
            <a href="${searchPath}">Search</a>
            <a href="${partnersPath}">Partners</a>
        </div>
    `;

    document.body.appendChild(overlay);
    const tab = overlay.querySelector('.overlay-tab');
    const gameFrame = document.querySelector('.game-screen iframe, #search-frame');

    tab.addEventListener('click', () => {
        const isOpen = overlay.classList.toggle('open');
        tab.setAttribute('aria-expanded', String(isOpen));
    });

    if (gameFrame) {
        const fullscreenControl = document.createElement('button');
        fullscreenControl.className = 'fullscreen-control';
        fullscreenControl.type = 'button';
        fullscreenControl.textContent = 'Fullscreen';
        fullscreenControl.setAttribute('aria-label', 'Enter fullscreen');
        document.body.appendChild(fullscreenControl);
        gameFrame.setAttribute('allowfullscreen', '');
        gameFrame.setAttribute('allow', 'fullscreen; autoplay; gamepad');

        function updateFullscreenLabel() {
            const isFullscreen = document.fullscreenElement === gameFrame;
            fullscreenControl.textContent = isFullscreen ? 'Exit Fullscreen' : 'Fullscreen';
            fullscreenControl.setAttribute('aria-label', isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen');
        }

        fullscreenControl.addEventListener('click', async () => {
            try {
                if (document.fullscreenElement) {
                    await document.exitFullscreen();
                } else if (gameFrame.requestFullscreen) {
                    await gameFrame.requestFullscreen();
                } else if (gameFrame.webkitRequestFullscreen) {
                    gameFrame.webkitRequestFullscreen();
                }
            } catch (error) {
                fullscreenControl.textContent = 'Fullscreen unavailable';
            }
            updateFullscreenLabel();
        });

        const refreshControl = document.createElement('button');
        refreshControl.className = 'refresh-control';
        refreshControl.type = 'button';
        refreshControl.textContent = 'Refresh';
        refreshControl.setAttribute('aria-label', 'Refresh game or website');
        refreshControl.title = 'Refresh game or website';
        refreshControl.addEventListener('click', () => {
            gameFrame.src = gameFrame.src;
        });
        document.body.appendChild(refreshControl);

        const chromebookModeControl = document.createElement('button');
        chromebookModeControl.className = 'chromebook-mode-control';
        chromebookModeControl.type = 'button';
        chromebookModeControl.textContent = 'Chromebook Mode';
        chromebookModeControl.setAttribute('aria-pressed', 'false');
        chromebookModeControl.addEventListener('click', () => {
            const isEnabled = document.body.classList.toggle('chromebook-mode');
            chromebookModeControl.textContent = isEnabled ? 'Exit Chromebook Mode' : 'Chromebook Mode';
            chromebookModeControl.setAttribute('aria-pressed', String(isEnabled));
            document.dispatchEvent(new CustomEvent('chromebookmodechange', {
                detail: { enabled: isEnabled }
            }));
        });
        document.body.appendChild(chromebookModeControl);

        if (isGameScreen) {
            const refreshNotice = document.createElement('p');
            refreshNotice.className = 'iframe-refresh-notice';
            refreshNotice.textContent = 'If page says blocked press refresh button';
            document.body.appendChild(refreshNotice);
        }

        document.addEventListener('fullscreenchange', updateFullscreenLabel);
        document.addEventListener('webkitfullscreenchange', updateFullscreenLabel);
    }
})();
