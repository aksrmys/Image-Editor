<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Positioning Demo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f0f0;
            margin: 0;
        }
        .editor {
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .image-container {
            position: relative;
            width: 500px;
            height: 889px; /* 1080x1920 oranına yakın */
            overflow: hidden;
            border: 1px solid #000;
            margin-bottom: 20px;
            background-color: #e9e9e9;
            cursor: move;
        }
        #background-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        #overlay-image {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 2;
        }
        .controls {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .controls label {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
        }
        .controls input[type="range"] {
            width: 300px;
        }
        .button-group {
            margin-top: 20px;
            display: flex;
            gap: 10px;
        }
    </style>
</head>
<body>
    <div class="editor">
        <h2>Image Positioning Demo</h2>
        <div class="image-container" id="image-container">
            <img id="background-image" src="" alt="Background Image">
            <img id="overlay-image" src="" alt="Overlay Image">
        </div>
        <div class="controls">
            <label>
                Scale: 
                <input type="range" id="scale" min="0.1" max="3" value="1" step="0.1">
            </label>
            <label>
                Rotate: 
                <input type="range" id="rotate" min="0" max="360" value="0" step="1">
            </label>
        </div>
        <div class="button-group">
            <button id="download">Download as PNG</button>
        </div>
    </div>
    <script>
        const bgImage = "/mnt/data/bg.png"; // Arka plan resmi dosya yolu
        const overlayImage = "/mnt/data/human.png"; // İnsan resmi dosya yolu
        
        document.getElementById('background-image').src = bgImage;
        document.getElementById('overlay-image').src = overlayImage;

        const overlay = document.getElementById('overlay-image');
        let isDragging = false;
        let startX, startY, initialX, initialY;

        // Ölçek ve döndürme işlemleri
        document.getElementById('scale').addEventListener('input', applyTransformations);
        document.getElementById('rotate').addEventListener('input', applyTransformations);

        function applyTransformations() {
            const scaleValue = document.getElementById('scale').value;
            const rotateValue = document.getElementById('rotate').value;
            overlay.style.transform = `translate(-50%, -50%) scale(${scaleValue}) rotate(${rotateValue}deg)`;
        }

        // Sürükleme işlemi
        overlay.addEventListener('mousedown', function(e) {
            isDragging = true;
            startX = e.clientX - overlay.offsetLeft;
            startY = e.clientY - overlay.offsetTop;
            initialX = overlay.offsetLeft;
            initialY = overlay.offsetTop;
            document.body.style.cursor = 'grabbing';
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
            document.body.style.cursor = 'default';
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                let dx = e.clientX - startX;
                let dy = e.clientY - startY;
                overlay.style.left = `${initialX + dx}px`;
                overlay.style.top = `${initialY + dy}px`;
            }
        });

        // PNG olarak indirme
        document.getElementById('download').addEventListener('click', function() {
            const canvas = document.createElement('canvas');
            canvas.width = 1080;
            canvas.height = 1920;
            const ctx = canvas.getContext('2d');
            
            const bg = new Image();
            const human = new Image();
            bg.src = bgImage;
            human.src = overlayImage;
            
            bg.onload = () => {
                ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
                
                const scaleValue = document.getElementById('scale').value;
                const rotateValue = document.getElementById('rotate').value;
                const positionX = overlay.offsetLeft;
                const positionY = overlay.offsetTop;

                ctx.save();
                ctx.translate(positionX + (overlay.width * scaleValue / 2), positionY + (overlay.height * scaleValue / 2));
                ctx.rotate(rotateValue * Math.PI / 180);
                ctx.drawImage(human, -human.width * scaleValue / 2, -human.height * scaleValue / 2, human.width * scaleValue, human.height * scaleValue);
                ctx.restore();

                const link = document.createElement('a');
                link.download = 'positioned-image.png';
                link.href = canvas.toDataURL();
                link.click();
            };
        });
    </script>
</body>
</html>
