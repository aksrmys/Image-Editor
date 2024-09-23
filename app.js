document.getElementById('load-images').addEventListener('click', loadImagesFromAPI);
document.getElementById('scale').addEventListener('input', applyTransformations);
document.getElementById('rotate').addEventListener('input', applyTransformations);
document.getElementById('send-to-server').addEventListener('click', sendToServer);

let overlayImage = document.getElementById('overlay-image');
let imageContainer = document.getElementById('image-container');
let backgroundImage = document.getElementById('background-image');
let isDragging = false;
let startX, startY, initialX, initialY;

async function loadImagesFromAPI() {
    try {
        // API istekleri yaparak arka plan ve insan fotoğrafını alalım
        const backgroundImageURL = await fetchBackgroundImage();
        const overlayImageURL = await fetchOverlayImage();

        // Arka plan ve overlay resimlerinin kaynaklarını ayarla
        backgroundImage.src = backgroundImageURL;
        overlayImage.src = overlayImageURL;

    } catch (error) {
        console.error('Error loading images from API:', error);
    }
}

function fetchBackgroundImage() {
    // Arka plan resmini döndüren API isteği
    return new Promise((resolve) => {
        // Örnek URL, gerçek API'nizle değiştirin
        resolve('https://via.placeholder.com/500x889?text=Background+Image');
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

function sendToServer() {
    // Görselin pozisyon ve transform bilgilerini toplama
    let scaleValue = document.getElementById('scale').value;
    let rotateValue = document.getElementById('rotate').value;
    let positionX = overlayImage.offsetLeft;
    let positionY = overlayImage.offsetTop;

    // Yeni boyutlar için hesaplama
    let containerWidth = imageContainer.clientWidth;
    let containerHeight = imageContainer.clientHeight;
    let normalizedPositionX = (positionX / containerWidth) * 1080;
    let normalizedPositionY = (positionY / containerHeight) * 1920;

    let transformData = {
        scale: scaleValue,
        rotate: rotateValue,
        positionX: normalizedPositionX,
        positionY: normalizedPositionY,
        width: 1080, // Sabit genişlik
        height: 1920 // Sabit yükseklik
    };

    // Görseli PNG formatına dönüştürme ve gönderme
    let canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Temizleme
    ctx.drawImage(overlayImage, normalizedPositionX, normalizedPositionY, overlayImage.width * scaleValue, overlayImage.height * scaleValue);
    canvas.toBlob((blob) => {
        let formData = new FormData();
        formData.append('image', blob, 'overlay.png');
        formData.append('transformData', JSON.stringify(transformData));

        // Sunucuya gönderme
        fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }, 'image/png');
}
