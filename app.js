document.getElementById('load-images').addEventListener('click', loadImagesFromAPI);
document.getElementById('scale').addEventListener('input', applyTransformations);
document.getElementById('rotate').addEventListener('input', applyTransformations);

let overlayImage = document.getElementById('overlay-image');
let imageContainer = document.getElementById('image-container');
let isDragging = false;
let startX, startY, initialX, initialY;

async function loadImagesFromAPI() {
    try {
        // API istekleri yaparak arka plan ve insan fotoğrafını alalım
        const backgroundImageURL = await fetchBackgroundImage();
        const overlayImageURL = await fetchOverlayImage();

        // Arka plan ve overlay resimlerinin kaynaklarını ayarla
        document.getElementById('background-image').src = backgroundImageURL;
        overlayImage.src = overlayImageURL;

    } catch (error) {
        console.error('Error loading images from API:', error);
    }
}

function fetchBackgroundImage() {
    // Arka plan resmini döndüren API isteği
    return new Promise((resolve) => {
        // Örnek URL, gerçek API'nizle değiştirin
        resolve('https://via.placeholder.com/500x400?text=Background+Image');
    });
}

function fetchOverlayImage() {
    // İnsan resmini döndüren API isteği
    return new Promise((resolve) => {
        // Örnek URL, gerçek API'nizle değiştirin
        resolve('https://via.placeholder.com/150x200?text=Overlay+Image');
    });
}

function applyTransformations() {
    let scaleValue = document.getElementById('scale').value;
    let rotateValue = document.getElementById('rotate').value;

    overlayImage.style.transform = `translate(-50%, -50%) scale(${scaleValue}) rotate(${rotateValue}deg)`;
}

// Sürükleme işlemini başlatma
overlayImage.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX - imageContainer.offsetLeft;
    startY = e.clientY - imageContainer.offsetTop;
    initialX = overlayImage.offsetLeft;
    initialY = overlayImage.offsetTop;
    imageContainer.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', function() {
    isDragging = false;
    imageContainer.style.cursor = 'move';
});

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        let dx = e.clientX - startX;
        let dy = e.clientY - startY;
        overlayImage.style.left = `${initialX + dx}px`;
        overlayImage.style.top = `${initialY + dy}px`;
    }
});
