// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const mobileMenu = document.getElementById('mobileMenu');
const navMenu = document.getElementById('navLinks');

let playerAliases = {};

// Mobile menu toggle
mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Navigation click handlers
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show target section
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(targetId).classList.add('active');
        
        // Close mobile menu
        navMenu.classList.remove('active');
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Logo click handler
document.querySelector('.logo').addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    navLinks[0].classList.add('active');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById('home').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Event filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const eventCards = document.querySelectorAll('.event-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active filter
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter events
        eventCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-city') === filter) {
                card.style.display = 'grid';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

eventCards.forEach(card => {
    card.addEventListener('click', () => {
        const link = card.getAttribute('data-link');
        if (link) {
            window.open(link, '_blank');
        }
    });
});

// Add hover effects to cards
const allCards = document.querySelectorAll('.tournament-card, .event-card, .ranking-card, .local-card, .social-card');

allCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = this.style.transform || 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Power Rankings functionality
const regionTabs = document.querySelectorAll('.region-tab');
const seasonSelect = document.getElementById('seasonSelect');
const prImageContainer = document.getElementById('prImageContainer');
let currentRegion = 'columbus';

// PR Image data structure - now just one image per region
const prImages = {
    columbus: 'pr-images/cbus-spring2025.png',
    neoh: 'pr-images/neoh-spring2025.jpeg',
    swoh: 'pr-images/swoh-summer2024.png',
    state: 'pr-images/ohio-2024.png'
};

function updatePRDisplay() {
    const imageUrl = prImages[currentRegion];

    if (imageUrl) {
        prImageContainer.innerHTML = `
            <img src="${imageUrl}" alt="${currentRegion} Power Rankings" class="pr-image">
        `;
    } else {
        prImageContainer.innerHTML = `
            <div class="no-pr-message">
                <p>📊 No Power Rankings available for ${currentRegion.charAt(0).toUpperCase() + currentRegion.slice(1)}</p>
                <p style="font-size: 1rem; margin-top: 1rem;">Check back later for updates</p>
            </div>
        `;
    }
}

regionTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        regionTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentRegion = tab.getAttribute('data-region');
        updatePRDisplay();
    });
});

// Remove parallax effect from hero section
window.addEventListener('scroll', () => {
    // Removed parallax code
});

// Smooth reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.tournament-card, .event-card, .ranking-card, .local-card, .social-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add click handlers for local cards with links
document.addEventListener('DOMContentLoaded', () => {
    const localCards = document.querySelectorAll('.local-card[data-link]');
    
    localCards.forEach(card => {
        card.addEventListener('click', () => {
            const link = card.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
            }
        });
    });
});

// Dynamic page title
const updatePageTitle = (section) => {
    const titles = {
        'home': 'OhioSSBM - Ohio Super Smash Bros. Melee Community',
        'events': 'Events - OhioSSBM',
        'rankings': 'Rankings - OhioSSBM',
        'replays': 'Replays - OhioSSBM',
        'venues': 'Venues - OhioSSBM',
        'join': 'Join Us - OhioSSBM'
    };
    document.title = titles[section] || 'OhioSSBM';
};

// Update title when navigating
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const section = link.getAttribute('href').substring(1);
        updatePageTitle(section);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Click outside mobile menu to close
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Initialize
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// character to emoji mapping
const characterIcons = {
    fox: "🦊",
    falco: "🦅",
    marth: "🤺",
    sheik: "🥷",
    peach: "🍑",
    falcon: "🏎️",
    jigglypuff: "🎈", puff: "🎈", jiggs: "🎈",
    pikachu: "⚡️", pika: "⚡️",
    samus: "🚀",
    yoshi: "🦖",
    luigi: "🎰",
    mario: "🍄",
    ganondorf: "👹", ganon: "👹",
    zelda: "👸",
    link: "🗡️",
    younglink: "🏹", yink: "🏹", yl: "🏹", ylink: "🏹",
    mewtwo: "🔮",
    ness: "⚾️",
    iceclimbers: "🧊", ics: "🧊", icies: "🧊",
    bowser: "🐢",
    donkeykong: "🦍", dk: "🦍",
    drmario: "💊", doc: "💊",
    pichu: "🔋",
    roy: "🔥",
    kirby: "⭐",
    gnw: "🫥", gameandwatch: "🫥", gw: "🫥", gamewatch: "🫥",
    random: "❓"
};

// replay store
let replayData = [];

// pagination
const PAGE_SIZE   = 10; // 10 entries per page
let currentPage   = 1; // 1-based
let totalPages    = 1; // computed after JSON loads
let currentSearchResults = []; // Store current search results for pagination

// DOM references for replays
const replaySearch   = document.getElementById("replaySearch");
const searchButton   = document.getElementById("searchButton");
const replaysResults = document.getElementById("replaysResults");

function createReplayItem(replay) {
    const div = document.createElement('div');
    div.className = 'replay-item';
    sides = [];
    replay.sides.forEach(s => {
        sideNames = [];
        s.forEach(x => {
            sideNames.push(x.name);
        });
       
        sides.push(sideNames)
    });
    sidesChars = [];
    replay.sides.forEach(s => {
        sides.push(s[0].characters);
    })

    const side1Chars = (replay.sides[0][0].characters || []).map(char => 
        characterIcons[char.trim().toLowerCase().replace(/\s+/g, "")] || "❓"
    ).join(' ');

    const side2Chars = (replay.sides[1][0].characters || []).map(char => 
        characterIcons[char.trim().toLowerCase().replace(/\s+/g, "")] || "❓"
    ).join(' ');

    // Add timestamp indicator if this is a timestamped replay
    let timestampIndicator = '';
    if (replay.replayType === 'timestamp' && replay.timestampText) {
        timestampIndicator = `<div class="timestamp-info"> ${replay.timestampText}</div>`;
    }

    if (replay.type == "singles") {
        div.innerHTML = `
            <div class="replay-header">
                <div class="match-type">Singles</div>
                <div class="match-info">
                    <div class="player-info">
                        <span class="character-icons">${side1Chars}</span>
                        <span class="player-name">${sides[0][0]}</span>
                    </div>
                    <span class="vs-text">VS</span>
                    <div class="player-info">
                        <span class="player-name">${sides[1][0]}</span>
                        <span class="character-icons">${side2Chars}</span>
                    </div>
                </div>
                <div class="tournament-name">${replay.tournament}</div>
                ${timestampIndicator}
            </div>
            <div class="replay-video" data-loaded="false" data-youtubeid="${replay.youtubeId}" ${replay.timestamp ? `data-timestamp="${replay.timestamp}"` : ''}>
                <div class="video-wrapper"></div>
            </div>
        `;
    }
    else if (replay.type == "doubles") {
        div.innerHTML = `
            <div class="replay-header">
                <div class="match-type">Doubles</div>
                <div class="match-info">
                    <div class="player-info">
                        <span class="player-name">${sides[0][0]} + ${sides[0][1]}</span>
                    </div>
                    <span class="vs-text">VS</span>
                    <div class="player-info">
                        <span class="player-name">${sides[1][0]} + ${sides[1][1]}</span>
                    </div>
                </div>
                <div class="tournament-name">${replay.tournament}</div>
                ${timestampIndicator}
            </div>
            <div class="replay-video" data-loaded="false" data-youtubeid="${replay.youtubeId}" ${replay.timestamp ? `data-timestamp="${replay.timestamp}"` : ''}>
                <div class="video-wrapper"></div>
            </div>
        `;
    }

    // Click handler for video toggle
    div.addEventListener('click', (e) => {
            if (e.target.closest('.replay-video')) return;
            
            const videoContainer = div.querySelector('.replay-video');
            
        // Close other open videos
        document.querySelectorAll('.replay-video.show').forEach(v => {
            if (v !== videoContainer) unloadVideo(v);
        });

        if (!videoContainer.classList.contains('show')) {
            loadVideo(videoContainer);
        } else {
            unloadVideo(videoContainer);
        }
    });
    
    return div;
}

function loadVideo(videoContainer) {
    if (videoContainer.dataset.loaded === 'true') {
        videoContainer.classList.add('show');
        return;
    }

    const youtubeId = videoContainer.dataset.youtubeid;
    const timestamp = videoContainer.dataset.timestamp;
    const wrapper = videoContainer.querySelector('.video-wrapper');

    const iframe = document.createElement('iframe');
    let embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
    
    // Add timestamp if available
    if (timestamp && timestamp !== 'undefined') {
        embedUrl += `?start=${timestamp}`;
    }
    
    iframe.src = embedUrl;
    iframe.title = 'YouTube video player';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';

    wrapper.appendChild(iframe);
    videoContainer.dataset.loaded = 'true';
    videoContainer.classList.add('show');
}

function unloadVideo(videoDiv) {
    videoDiv.classList.remove("show");
    const wrapper = videoDiv.querySelector(".video-wrapper");
    wrapper.innerHTML = ""; // remove iframe - stops playback & frees memory
    videoDiv.dataset.loaded = "false";
}

// render helpers
function displayReplays(list, page = 1) {
    totalPages  = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
    currentPage = Math.min(Math.max(1, page), totalPages);

    const start = (currentPage - 1) * PAGE_SIZE;
    const end   = start + PAGE_SIZE;
    const slice = list.slice(start, end);

    const noResults   = replaysResults.querySelector(".no-results");
    replaysResults.querySelectorAll(".replay-item").forEach(el => el.remove());

    if (slice.length === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
        slice.forEach(r => {
            const replayElement = createReplayItem(r);
            replaysResults.appendChild(replayElement);
        });
    }

    renderPagination(list);
}

function renderPagination(fullList) {
    const pagDiv = document.getElementById("pagination");
    pagDiv.innerHTML = ""; // wipe old links

    if (totalPages === 1) return; // no need for controls

    const makeBtn = (label, page, disabled = false, active = false) => {
        const btn = document.createElement("button");
        btn.textContent = label;
        btn.disabled = disabled;
        if (active) btn.classList.add("active");
        btn.addEventListener("click", () => {
            currentPage = page;
            displayReplays(fullList, page);
        });
        return btn;
    };

    const makeEllipsis = () => {
        const span = document.createElement("span");
        span.textContent = "…";
        span.className = "ellipsis";
        return span;
    };

    pagDiv.appendChild(makeBtn("« Prev", currentPage - 1, currentPage === 1));

    // build page list
    const pageNumbers = [];

    // first page
    pageNumbers.push(1);

    // window around current page
    const startAround = Math.max(2, currentPage - 2);
    const endAround   = Math.min(totalPages - 1, currentPage + 2);
    for (let p = startAround; p <= endAround; p++) pageNumbers.push(p);

    // last page
    if (totalPages > 1) pageNumbers.push(totalPages);

    let prev = null;
    pageNumbers.forEach(p => {
        if (prev !== null && p - prev > 1) pagDiv.appendChild(makeEllipsis());
        pagDiv.appendChild(makeBtn(p, p, false, p === currentPage));
        prev = p;
    });

    // next
    pagDiv.appendChild(makeBtn("Next »", currentPage + 1, currentPage === totalPages));
}

function normalizePlayerName(name) {
    return name.toLowerCase().trim();
}

function getPlayerAliases(searchTerm) {
    const normalized = normalizePlayerName(searchTerm);
    
    // First check if the search term itself is a main player key
    if (playerAliases[normalized]) {
        return playerAliases[normalized];
    }
    
    // Then check if it matches any alias
    for (const [mainPlayer, aliases] of Object.entries(playerAliases)) {
        const normalizedAliases = aliases.map(alias => normalizePlayerName(alias));
        if (normalizedAliases.includes(normalized)) {
            return aliases;
        }
    }
    
    // If no alias group found, return empty array to indicate no aliases
    return [];
}

function searchReplays() {
    const term = replaySearch.value.trim();
    const loading = replaysResults.querySelector(".loading-text");
    const noResults = replaysResults.querySelector(".no-results");

    replaysResults.querySelectorAll(".replay-item").forEach(el => el.remove());

    if (!term) { 
        currentSearchResults = replayData;
        displayReplays(currentSearchResults); 
        return; 
    }

    loading.style.display = "block";
    noResults.style.display = "none";

    setTimeout(() => {
        loading.style.display = "none";
        const pieces = term.split(/\s+/);
        
        const filtered = replayData.filter(r => {
            // Extract player names and characters from the new structure
            let playerNames = [];
            let characterNames = [];
            
            if (r.sides && r.sides.length >= 2) {
                // For each side (team)
                r.sides.forEach(side => {
                    side.forEach(player => {
                        if (player.name) {
                            playerNames.push(player.name);
                        }
                        if (player.characters && Array.isArray(player.characters)) {
                            characterNames.push(...player.characters);
                        }
                    });
                });
            }
            
            // Build the search haystack with all relevant fields
            const tournament = r.tournament || '';
            const type = r.type || '';
            const players = playerNames.join(' ');
            const chars = characterNames.join(' ');
            
            const haystack = `${players} ${chars} ${tournament} ${type}`.toLowerCase();
            
            return pieces.every(piece => {
                const lowerPiece = piece.toLowerCase();
                
                // Get possible aliases for this search piece
                const possibleAliases = getPlayerAliases(piece);
                
                // If we found aliases, check if any match
                if (possibleAliases.length > 0) {
                    return possibleAliases.some(alias => {
                        const lowerAlias = alias.toLowerCase();
                        // Check exact match for player names or contains in haystack
                        return playerNames.some(name => name.toLowerCase() === lowerAlias) ||
                            haystack.includes(lowerAlias);
                    });
                }
                
                // Check if this might be a character name
                const characterIconKeys = Object.keys(characterIcons);
                const isCharacter = characterIconKeys.includes(lowerPiece);
                
                if (isCharacter) {
                    // For character names, use word boundary matching
                    const regex = new RegExp(`\\b${lowerPiece}\\b`);
                    return regex.test(haystack);
                }
                
                // For everything else (tournament names, etc.), use regular includes
                return haystack.includes(lowerPiece);
            });
        });
        
        currentSearchResults = filtered;
        displayReplays(currentSearchResults, 1);
    }, 200);
}

searchButton.addEventListener("click",     searchReplays);
replaySearch.addEventListener("keypress",  e => { if (e.key === "Enter") searchReplays(); });

// fetch the real data once, then render + enable search
async function loadReplayData() {
    try {
        // Load both replays and aliases
        const [replaysRes, aliasesRes] = await Promise.all([
            fetch("replays.json"),
            fetch("aliases.json")
        ]);
        
        if (!replaysRes.ok) throw new Error("Failed to load replays");
        if (!aliasesRes.ok) throw new Error("Failed to load aliases");
        
        replayData = await replaysRes.json();
        playerAliases = await aliasesRes.json();
        
        // Sort replays by date descending (newest first)
        replayData.sort((a, b) => {
            // Use 'date' field which exists in the data
            const dateA = new Date(a.date || '1970-01-01');
            const dateB = new Date(b.date || '1970-01-01');
            return dateB - dateA; // Descending order
        });
        
    } catch (err) {
        console.error("Failed to load data:", err);
        replayData = [];
        playerAliases = {};
    }
    
    currentSearchResults = replayData;
    displayReplays(currentSearchResults, 1);
}

document.addEventListener("DOMContentLoaded", loadReplayData);

// Unity WebGL loader script
function loadUnityGame() {
    const buildUrl = "ohiossbmgame/Build";
    const config = {
        dataUrl: buildUrl + "/ohiossbmgame.data",
        frameworkUrl: buildUrl + "/ohiossbmgame.framework.js",
        codeUrl: buildUrl + "/ohiossbmgame.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "OhioSSBM",
        productName: "Virtual Local",
        productVersion: "1.0",
    };

    const container = document.querySelector("#unity-container");
    const canvas = document.querySelector("#unity-canvas");
    const loadingBar = document.querySelector("#unity-loading-bar");
    const progressBarFull = document.querySelector("#unity-progress-bar-full");
    const fullscreenButton = document.querySelector("#unity-fullscreen-button");

    // Show loading bar
    loadingBar.style.display = "block";

    const script = document.createElement("script");
    script.src = buildUrl + "/ohiossbmgame.loader.js";
    script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
            progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
            loadingBar.style.display = "none";
            fullscreenButton.onclick = () => {
                unityInstance.SetFullscreen(1);
            };
        }).catch((message) => {
            alert(message);
        });
    };
    document.body.appendChild(script);
}

// Load Unity when the bar section is first viewed
let unityLoaded = false;
const observeUnity = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !unityLoaded) {
            unityLoaded = true;
            loadUnityGame();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const vLocalSection = document.querySelector('#vlocal');
    if (vLocalSection) {
        observeUnity.observe(vLocalSection);
    }
});