// ============================================
// PARTICLE BACKGROUND SYSTEM
// ============================================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections
    particles.forEach((particleA, indexA) => {
        particles.slice(indexA + 1).forEach(particleB => {
            const dx = particleA.x - particleB.x;
            const dy = particleA.y - particleB.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particleA.x, particleA.y);
                ctx.lineTo(particleB.x, particleB.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ============================================
// FLOATING HEARTS SYSTEM
// ============================================
const heartsContainer = document.querySelector('.hearts-container');
const heartSymbols = ['❤️', '💕', '💖', '💗', '💝', '💞'];

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 13000);
}

// Create hearts periodically
setInterval(createFloatingHeart, 800);

// Initial hearts
for (let i = 0; i < 10; i++) {
    setTimeout(createFloatingHeart, i * 300);
}

// ============================================
// SIMPLE SWIPE PHOTO GALLERY
// ============================================
const galleryContainer = document.querySelector('.gallery-container');
const galleryItems = document.querySelectorAll('.gallery-item');

// 6 photos from the photos folder
const allPhotos = [
    { src: "photos/photo1.jpg", alt: "Our beautiful memory 1", label: "Misibis Bay Resort", note: "From the moment I met you, I knew you were special. Every day with you is a blessing I cherish deeply. ❤️" },
    { src: "photos/photo2.jpg", alt: "Our beautiful memory 2", label: "From Dangwa, Binondo, Manila", note: "You make my heart smile in ways I never thought possible. Your laughter is my favorite sound. 😊💕" },
    { src: "photos/photo3.jpg", alt: "Our beautiful memory 3", label: "Farm Plate", note: "42 months have passed, but it feels like yesterday when we first fell in love. Here's to forever with you! 💖" },
    { src: "photos/photo4.jpg", alt: "Our beautiful memory 4", label: "Mt Mayon Black Lava", note: "You're not just my partner, you're my best friend, my confidant, my everything. I'm so grateful for you. 🌟" },
    { src: "photos/photo5.jpg", alt: "Our beautiful memory 5", label: "Mayon ATV Drive", note: "Thank you for loving me unconditionally, for supporting my dreams, and for being my safe place. You mean the world to me. 🥰" },
    { src: "photos/photo6.jpg", alt: "Our beautiful memory 6", label: "Cagraray Amphitheater", note: "I love you more today than yesterday, but not as much as tomorrow. You're my forever and always. 💍✨" }
];

let currentPhotoIndex = 0;
let isDragging = false;
let startX = 0;
let currentX = 0;
let dragThreshold = 50; // Minimum drag distance to change photos
let imagesPreloaded = false;

// Preload all images for smooth transitions
function preloadAllImages() {
    if (imagesPreloaded) return;
    
    allPhotos.forEach(photo => {
        const img = new Image();
        img.src = photo.src;
    });
    
    imagesPreloaded = true;
}

// Animation types for variety
const animationTypes = ['heart-entrance', 'sparkle-burst', 'love-wave', 'floating-hearts'];
let animationIndex = 0;

// Function to update photo display with beautiful animations
function updatePhotoDisplay() {
    const currentPhoto = allPhotos[currentPhotoIndex];
    
    // Update the first gallery item (the only one visible)
    const item = galleryItems[0];
    const img = item.querySelector('img');
    const label = item.querySelector('.item-label');
    
    // Remove any existing animation classes
    animationTypes.forEach(type => item.classList.remove(type));
    
    // Fade out current photo
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        // Update content
        img.src = currentPhoto.src;
        img.alt = currentPhoto.alt;
        label.textContent = currentPhoto.label;
        item.dataset.note = currentPhoto.note;
        
        // Add active class and animation
        item.classList.add('active');
        
        // Choose animation type (cycle through them)
        const animationType = animationTypes[animationIndex];
        item.classList.add(animationType);
        animationIndex = (animationIndex + 1) % animationTypes.length;
        
        // Reset styles for animation
        item.style.opacity = '';
        item.style.transform = '';
        
        // Create enhanced sparkle effect
        createEnhancedSparkles(window.innerWidth / 2, window.innerHeight / 2);
        
        // Show photo counter
        showPhotoCounter();
        
        // Update love meter
        updateLoveMeter();
        
        // Update timeline
        updateTimeline();
        
        // Random floating message (20% chance)
        if (Math.random() < 0.2) {
            createFloatingMessage();
        }
        
        // Check for completion celebration
        checkForCompletion();
        
        // Remove animation class after animation completes
        setTimeout(() => {
            item.classList.remove(animationType);
        }, 1600); // Slightly longer than the longest animation
        
    }, 200);
}

// Function to go to next photo
function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % allPhotos.length;
    updatePhotoDisplay();
}

// Function to go to previous photo
function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + allPhotos.length) % allPhotos.length;
    updatePhotoDisplay();
}

// Function to show photo counter with animation
function showPhotoCounter() {
    const counter = document.createElement('div');
    counter.style.position = 'fixed';
    counter.style.top = '20px';
    counter.style.right = '20px';
    counter.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 182, 193, 0.9))';
    counter.style.backdropFilter = 'blur(15px)';
    counter.style.padding = '12px 24px';
    counter.style.borderRadius = '30px';
    counter.style.color = '#ff6b9d';
    counter.style.fontWeight = 'bold';
    counter.style.fontSize = '16px';
    counter.style.zIndex = '2000';
    counter.style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.3)';
    counter.style.transform = 'translateY(-60px) scale(0.8)';
    counter.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    counter.style.border = '2px solid rgba(255, 107, 157, 0.3)';
    
    counter.innerHTML = `💖 ${currentPhotoIndex + 1} / ${allPhotos.length} 💖`;
    
    document.body.appendChild(counter);
    
    // Animate in with bounce
    setTimeout(() => {
        counter.style.transform = 'translateY(0) scale(1)';
    }, 50);
    
    // Remove after 3 seconds
    setTimeout(() => {
        counter.style.transform = 'translateY(-60px) scale(0.8)';
        counter.style.opacity = '0';
        setTimeout(() => counter.remove(), 600);
    }, 3000);
}

// Swipe event handlers
function handleStart(e) {
    isDragging = true;
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    startX = clientX;
    currentX = clientX;
    
    e.preventDefault();
}

function handleMove(e) {
    if (!isDragging) return;
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    currentX = clientX;
    
    const deltaX = currentX - startX;
    
    // Show visual feedback during drag
    const progress = Math.min(Math.abs(deltaX) / dragThreshold, 1);
    if (progress > 0.3) {
        const brightness = 1 + progress * 0.2;
        const scale = 1 + progress * 0.02;
        
        galleryContainer.style.filter = `brightness(${brightness})`;
        galleryContainer.style.transform = `scale(${scale})`;
        
        // Add glow effect when ready to change
        if (progress >= 1) {
            galleryContainer.style.boxShadow = '0 0 30px rgba(255, 107, 157, 0.6)';
        }
    } else {
        galleryContainer.style.filter = 'brightness(1)';
        galleryContainer.style.transform = 'scale(1)';
        galleryContainer.style.boxShadow = '';
    }
    
    e.preventDefault();
}

function handleEnd(e) {
    if (!isDragging) return;
    
    isDragging = false;
    
    // Reset visual feedback
    galleryContainer.style.filter = 'brightness(1)';
    galleryContainer.style.transform = 'scale(1)';
    galleryContainer.style.boxShadow = '';
    
    const deltaX = currentX - startX;
    
    // Check if swipe distance is enough to change photos
    if (Math.abs(deltaX) > dragThreshold) {
        if (deltaX > 0) {
            prevPhoto(); // Swipe right = previous photo
    } else {
            nextPhoto(); // Swipe left = next photo
        }
    }
}

// Initialize the gallery
function initializeGallery() {
    // Set up the first photo
    updatePhotoDisplay();
    
    // Ensure only one photo is visible (the first one)
    const item = galleryItems[0];
    if (item) {
        item.classList.add('active');
        item.style.display = 'block';
    }
}

// Event listeners
galleryContainer.addEventListener('mousedown', handleStart);
document.addEventListener('mousemove', handleMove);
document.addEventListener('mouseup', handleEnd);

galleryContainer.addEventListener('touchstart', handleStart, { passive: false });
document.addEventListener('touchmove', handleMove, { passive: false });
document.addEventListener('touchend', handleEnd);

// Initialize the gallery
initializeGallery();

// Preload all images for smooth performance
preloadAllImages();

// ============================================
// LOVE NOTE INTERACTION
// ============================================
const loveNoteOverlay = document.querySelector('.love-note-overlay');
const noteText = document.getElementById('noteText');
const closeNoteBtn = document.querySelector('.close-note');

let clickTimeout = null;
let lastClickTime = 0;

galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const now = Date.now();
        
        // Prevent rapid clicks and clicks while dragging
        if (now - lastClickTime < 300) return;
        if (Math.abs(velocityX) > 1 || Math.abs(velocityY) > 1) return;
        
        lastClickTime = now;
        
        // Clear any existing timeout
        clearTimeout(clickTimeout);
        
        // Small delay to distinguish from drag
        clickTimeout = setTimeout(() => {
            const note = item.dataset.note;
            showLoveNote(note, e);
        }, 100);
    });
});

function showLoveNote(note, event) {
    noteText.textContent = note;
    loveNoteOverlay.classList.add('show');
    
    // Create sparkle effect
    createSparkles(event.clientX, event.clientY);
    
    // DON'T pause gallery rotation - let it continue spinning
    // This allows users to see other photos while reading the note
}

function hideLoveNote() {
    loveNoteOverlay.classList.remove('show');
}

closeNoteBtn.addEventListener('click', hideLoveNote);

// Click on overlay background to close (but not on the note itself)
loveNoteOverlay.addEventListener('click', (e) => {
    if (e.target === loveNoteOverlay) {
        hideLoveNote();
    }
});

// Keyboard support - ESC to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loveNoteOverlay.classList.contains('show')) {
        hideLoveNote();
    }
});

// ============================================
// INTERACTIVE LOVE STORY SYSTEM
// ============================================

let storyState = {
    currentChapter: 1,
    totalChapters: 6,
    isVisible: true
};

const loveStoryChapters = [
    {
        emoji: '💕',
        title: 'The Beginning',
        content: 'From the moment our eyes met, I knew you were special. Every day with you is a blessing I cherish deeply.'
    },
    {
        emoji: '💖',
        title: 'Growing Closer',
        content: 'As we spent more time together, I realized how perfectly we complement each other. Your smile lights up my world.'
    },
    {
        emoji: '💗',
        title: 'Deep Connection',
        content: 'Our bond grew stronger with each passing day. I love how we can be ourselves around each other.'
    },
    {
        emoji: '💝',
        title: 'Special Moments',
        content: 'Every memory we create together becomes a treasure. You make ordinary moments extraordinary.'
    },
    {
        emoji: '💞',
        title: 'Soulmates',
        content: 'I believe we were meant to find each other. You are my best friend, my love, my everything.'
    },
    {
        emoji: '💍',
        title: 'Forever Together',
        content: 'Here\'s to 42 months of beautiful memories and countless more to come. I love you more than words can express.'
    }
];

// Initialize the love story
function initializeLoveStory() {
    const storyOverlay = document.getElementById('loveStoryOverlay');
    const prevBtn = document.getElementById('prevChapter');
    const nextBtn = document.getElementById('nextChapter');
    const enterBtn = document.getElementById('enterGallery');
    const storyContent = document.getElementById('storyContent');
    const progressFill = document.getElementById('storyProgress');
    const progressText = document.getElementById('storyProgressText');

    // Create all chapter elements
    loveStoryChapters.forEach((chapter, index) => {
        const chapterElement = document.createElement('div');
        chapterElement.className = 'story-chapter';
        chapterElement.setAttribute('data-chapter', index + 1);
        
        chapterElement.innerHTML = `
            <div class="chapter-image">${chapter.emoji}</div>
            <h3>${chapter.title}</h3>
            <p>${chapter.content}</p>
        `;
        
        storyContent.appendChild(chapterElement);
    });

    // Set up event listeners
    prevBtn.addEventListener('click', () => {
        if (storyState.currentChapter > 1) {
            storyState.currentChapter--;
            updateStoryDisplay();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (storyState.currentChapter < storyState.totalChapters) {
            storyState.currentChapter++;
            updateStoryDisplay();
        }
    });

    enterBtn.addEventListener('click', () => {
        hideLoveStory();
    });

    // Initialize display
    updateStoryDisplay();
}

function updateStoryDisplay() {
    const chapters = document.querySelectorAll('.story-chapter');
    const prevBtn = document.getElementById('prevChapter');
    const nextBtn = document.getElementById('nextChapter');
    const progressFill = document.getElementById('storyProgress');
    const progressText = document.getElementById('storyProgressText');

    // Update chapter visibility
    chapters.forEach((chapter, index) => {
        chapter.classList.remove('active');
        if (index + 1 === storyState.currentChapter) {
            chapter.classList.add('active');
        }
    });

    // Update progress bar
    const progressPercentage = (storyState.currentChapter / storyState.totalChapters) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `Chapter ${storyState.currentChapter} of ${storyState.totalChapters}`;

    // Update button states
    prevBtn.disabled = storyState.currentChapter === 1;
    nextBtn.disabled = storyState.currentChapter === storyState.totalChapters;

    // Create floating hearts for each chapter
    createStoryHearts();

    // Check if story is complete
    if (storyState.currentChapter === storyState.totalChapters) {
        setTimeout(() => {
            showStoryCompletion();
        }, 2000);
    }
}

function createStoryHearts() {
    const storyContainer = document.querySelector('.story-container');
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💕';
            heart.style.position = 'absolute';
            heart.style.fontSize = '20px';
            heart.style.color = '#ff6b9d';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            
            // Random position around the story container
            const angle = Math.random() * Math.PI * 2;
            const distance = 100 + Math.random() * 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            heart.style.left = `calc(50% + ${x}px)`;
            heart.style.top = `calc(50% + ${y}px)`;
            heart.style.transform = 'translate(-50%, -50%)';
            
            storyContainer.appendChild(heart);
            
            // Animate heart
            heart.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: 'translate(-50%, -50%) scale(1.5)', opacity: 0 }
            ], {
                duration: 2000,
                easing: 'ease-out'
            }).onfinish = () => {
                heart.remove();
            };
        }, i * 200);
    }
}

function showStoryCompletion() {
    const completionOverlay = document.createElement('div');
    completionOverlay.className = 'story-completion';
    completionOverlay.innerHTML = `
        <div class="story-completion-content">
            <h3>💕 Our Love Story Complete 💕</h3>
            <p>Thank you for taking this beautiful journey through our memories together!</p>
            <button class="story-btn" onclick="hideStoryCompletion()">💖 Enter Our Gallery</button>
        </div>
    `;
    
    document.body.appendChild(completionOverlay);
    
    // Trigger confetti
    createConfettiCelebration();
    
    // Show completion overlay
    setTimeout(() => {
        completionOverlay.classList.add('show');
    }, 100);
}

function hideStoryCompletion() {
    const completionOverlay = document.querySelector('.story-completion');
    if (completionOverlay) {
        completionOverlay.classList.remove('show');
        setTimeout(() => {
            completionOverlay.remove();
            hideLoveStory();
        }, 500);
    }
}

function hideLoveStory() {
    const storyOverlay = document.getElementById('loveStoryOverlay');
    storyOverlay.classList.add('hidden');
    storyState.isVisible = false;
    
    // Show the photo gallery
    setTimeout(() => {
        storyOverlay.style.display = 'none';
        initializeGallery();
    }, 800);
}

// Initialize love story when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeLoveStory();
});

// ============================================
// WOW FACTOR FEATURES
// ============================================

// Love Meter System
const loveMeter = document.querySelector('.love-meter');
const loveMeterFill = document.getElementById('loveMeterFill');
const loveMeterText = document.getElementById('loveMeterText');
const loveMeterHearts = document.getElementById('loveMeterHearts');

const loveLevels = [
    { level: 0, text: "Start exploring our memories!", emoji: "💕" },
    { level: 25, text: "Getting warmer! 💖", emoji: "💖" },
    { level: 50, text: "Halfway to forever! 💕", emoji: "💕" },
    { level: 75, text: "Almost there! 💖", emoji: "💖" },
    { level: 100, text: "INFINITE LOVE! 💕💖💕", emoji: "💕" }
];

function updateLoveMeter() {
    const progress = (currentPhotoIndex / (allPhotos.length - 1)) * 100;
    const level = loveLevels.find(l => progress >= l.level) || loveLevels[loveLevels.length - 1];
    
    loveMeterFill.style.width = progress + '%';
    loveMeterText.textContent = level.text;
    
    // Add hearts to meter
    loveMeterHearts.innerHTML = '';
    const heartCount = Math.floor(progress / 20);
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('span');
        heart.textContent = level.emoji;
        heart.style.position = 'absolute';
        heart.style.left = (i * 20) + '%';
        heart.style.top = '50%';
        heart.style.transform = 'translateY(-50%)';
        heart.style.fontSize = '16px';
        heart.style.animation = 'heartBeat 1s ease-in-out infinite';
        heart.style.animationDelay = (i * 0.2) + 's';
        loveMeterHearts.appendChild(heart);
    }
    
    // Show love meter after first swipe
    if (currentPhotoIndex > 0 && !loveMeter.classList.contains('show')) {
        loveMeter.classList.add('show');
    }
}

// Floating Love Messages
const floatingMessages = document.getElementById('floatingMessages');
const loveMessages = [
    "💕 You make my heart skip a beat! 💕",
    "💖 Every moment with you is magical! 💖",
    "💕 You're my favorite person! 💕",
    "💖 I love you more than words can say! 💖",
    "💕 You're my sunshine on cloudy days! 💕",
    "💖 Together forever and always! 💖",
    "💕 You're my greatest adventure! 💕",
    "💖 My heart belongs to you! 💖"
];

function createFloatingMessage() {
    const message = document.createElement('div');
    message.className = 'love-message';
    message.textContent = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    
    // Random position
    const x = Math.random() * (window.innerWidth - 200) + 100;
    const y = Math.random() * (window.innerHeight - 100) + 50;
    
    message.style.left = x + 'px';
    message.style.top = y + 'px';
    
    floatingMessages.appendChild(message);
    
    // Remove after animation
    setTimeout(() => message.remove(), 4000);
}

// Memory Timeline System
const memoryTimeline = document.getElementById('memoryTimeline');
const timelineToggle = document.getElementById('timelineToggle');
const timelineContent = document.getElementById('timelineContent');
const timelineItems = document.querySelectorAll('.timeline-item');

let timelineOpen = false;

timelineToggle.addEventListener('click', () => {
    timelineOpen = !timelineOpen;
    if (timelineOpen) {
        memoryTimeline.classList.add('show');
        timelineContent.classList.add('show');
        timelineToggle.textContent = '❌';
    } else {
        timelineContent.classList.remove('show');
        setTimeout(() => {
            if (!timelineOpen) {
                memoryTimeline.classList.remove('show');
                timelineToggle.textContent = '📅';
            }
        }, 300);
    }
});

// Timeline item clicks
timelineItems.forEach(item => {
    item.addEventListener('click', () => {
        const photoIndex = parseInt(item.dataset.photo);
        if (photoIndex !== currentPhotoIndex) {
            currentPhotoIndex = photoIndex;
            updatePhotoDisplay();
            updateLoveMeter();
            updateTimeline();
        }
    });
});

function updateTimeline() {
    timelineItems.forEach((item, index) => {
        const photoIndex = parseInt(item.dataset.photo);
        if (photoIndex === currentPhotoIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Confetti Celebration
function createConfettiCelebration() {
    const confettiCount = 100;
    const colors = ['#ff6b9d', '#ff1493', '#ff69b4', '#ffc0cb', '#ffb6c1'];
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '2000';
            confetti.style.borderRadius = '50%';
            confetti.style.boxShadow = '0 0 10px rgba(255, 107, 157, 0.8)';
            
            document.body.appendChild(confetti);
            
            // Animate confetti falling
            const animation = confetti.animate([
                { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`, opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.onfinish = () => confetti.remove();
        }, i * 20);
    }
}

// Special celebration for completing all photos
function checkForCompletion() {
    if (currentPhotoIndex === allPhotos.length - 1) {
        setTimeout(() => {
            createConfettiCelebration();
            createFloatingMessage();
            
            // Show completion message
            const completionMessage = document.createElement('div');
            completionMessage.style.position = 'fixed';
            completionMessage.style.top = '50%';
            completionMessage.style.left = '50%';
            completionMessage.style.transform = 'translate(-50%, -50%)';
            completionMessage.style.background = 'linear-gradient(135deg, rgba(255, 182, 193, 0.95), rgba(255, 107, 157, 0.95))';
            completionMessage.style.backdropFilter = 'blur(15px)';
            completionMessage.style.padding = '30px 40px';
            completionMessage.style.borderRadius = '25px';
            completionMessage.style.color = 'white';
            completionMessage.style.fontSize = '24px';
            completionMessage.style.fontWeight = 'bold';
            completionMessage.style.textAlign = 'center';
            completionMessage.style.zIndex = '3000';
            completionMessage.style.boxShadow = '0 20px 60px rgba(255, 107, 157, 0.5)';
            completionMessage.style.border = '3px solid rgba(255, 255, 255, 0.3)';
            completionMessage.innerHTML = '🎉 Congratulations! 🎉<br>You\'ve explored all our memories!<br>💕 Here\'s to forever together! 💕';
            
            document.body.appendChild(completionMessage);
            
            setTimeout(() => {
                completionMessage.style.opacity = '0';
                completionMessage.style.transform = 'translate(-50%, -50%) scale(0.8)';
                setTimeout(() => completionMessage.remove(), 500);
            }, 4000);
        }, 1000);
    }
}
function createSparkles(x, y) {
    const sparkleCount = 20;
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            const angle = (Math.PI * 2 * i) / sparkleCount;
            const distance = Math.random() * 80 + 40;
            const sparkleX = x + Math.cos(angle) * distance;
            const sparkleY = y + Math.sin(angle) * distance;
            
            sparkle.style.left = sparkleX + 'px';
            sparkle.style.top = sparkleY + 'px';
            sparkle.style.animationDelay = (i * 0.03) + 's';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1500);
        }, i * 20);
    }
}

// Enhanced sparkle effect for photo transitions
function createEnhancedSparkles(x, y) {
    const sparkleCount = 30;
    const heartSymbols = ['💖', '✨', '💫', '⭐', '🌟'];
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.fontSize = (Math.random() * 20 + 15) + 'px';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1500';
            sparkle.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            
            const angle = (Math.PI * 2 * i) / sparkleCount;
            const distance = Math.random() * 120 + 60;
            const sparkleX = x + Math.cos(angle) * distance;
            const sparkleY = y + Math.sin(angle) * distance;
            
            sparkle.style.left = sparkleX + 'px';
            sparkle.style.top = sparkleY + 'px';
            sparkle.style.opacity = '0';
            sparkle.style.transform = 'scale(0)';
            sparkle.style.transition = 'all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.style.opacity = '1';
                sparkle.style.transform = 'scale(1.5)';
            }, 50);
            
            setTimeout(() => {
                sparkle.style.opacity = '0';
                sparkle.style.transform = 'scale(2) translateY(-100px)';
            }, 1000);
            
            setTimeout(() => sparkle.remove(), 2500);
        }, i * 15);
    }
}

// ============================================
// HOVER EFFECTS ON GALLERY ITEMS
// ============================================
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (!isDragging) {
            item.style.zIndex = '100';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.zIndex = '1';
    });
});

// ============================================
// PREVENT CONTEXT MENU
// ============================================
document.addEventListener('contextmenu', (e) => e.preventDefault());

// ============================================
// RESPONSIVE ADJUSTMENTS
// ============================================
function adjustForScreenSize() {
    const width = window.innerWidth;
    
    if (width < 480) {
        // Mobile adjustments
        galleryContainer.style.animation = 'autoRotate 60s infinite linear';
    } else if (width < 768) {
        // Tablet adjustments
        galleryContainer.style.animation = 'autoRotate 55s infinite linear';
    } else {
        // Desktop
        galleryContainer.style.animation = 'autoRotate 50s infinite linear';
    }
}

window.addEventListener('resize', adjustForScreenSize);
adjustForScreenSize();

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Animate gallery items on load
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform += ' scale(0.8)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            item.style.opacity = '1';
            item.style.transform = item.style.transform.replace('scale(0.8)', 'scale(1)');
        }, 500 + (index * 150));
    });
});

// ============================================
// EMOTIONAL TOUCH - RANDOM HEART POPS
// ============================================
function createRandomHeartPop() {
    const heartPop = document.createElement('div');
    heartPop.style.position = 'fixed';
    heartPop.style.fontSize = '40px';
    heartPop.style.pointerEvents = 'none';
    heartPop.style.zIndex = '999';
    heartPop.innerHTML = '💖';
    
    const x = Math.random() * (window.innerWidth - 100) + 50;
    const y = Math.random() * (window.innerHeight - 100) + 50;
    
    heartPop.style.left = x + 'px';
    heartPop.style.top = y + 'px';
    heartPop.style.opacity = '0';
    heartPop.style.transform = 'scale(0) rotate(0deg)';
    heartPop.style.transition = 'all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    document.body.appendChild(heartPop);
    
    setTimeout(() => {
        heartPop.style.opacity = '1';
        heartPop.style.transform = 'scale(1.5) rotate(360deg)';
    }, 50);
    
    setTimeout(() => {
        heartPop.style.opacity = '0';
        heartPop.style.transform = 'scale(2) rotate(720deg) translateY(-100px)';
    }, 1000);
    
    setTimeout(() => heartPop.remove(), 2500);
}

// Pop hearts randomly every 8-15 seconds
function scheduleHeartPop() {
    const delay = Math.random() * 7000 + 8000;
    setTimeout(() => {
        createRandomHeartPop();
        scheduleHeartPop();
    }, delay);
}

scheduleHeartPop();

// ============================================
// CONSOLE MESSAGE (Easter Egg)
// ============================================
console.log('%c💖 Happy 42nd Monthsary! 💖', 'font-size: 24px; color: #ff69b4; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%c42 months of love, laughter, and beautiful memories together.', 'font-size: 14px; color: #ffc0cb; font-style: italic;');
console.log('%cHere\'s to forever with you! 👑', 'font-size: 16px; color: #ff1493; font-weight: bold;');