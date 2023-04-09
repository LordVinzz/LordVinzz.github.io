function voronoiNoise(x, y, featurePoints) {
    let minDist = Infinity;

    for (const feature of featurePoints) {
        const dist = Math.sqrt((feature.x - x) ** 2 + (feature.y - y) ** 2);
        //const dist = Math.abs(feature.x - x) + Math.abs(feature.y - y); Norme de manhattan
        //const dist = Math.max(Math.abs(feature.x - x), Math.abs(feature.y - y)); // Norme de chebyshev
        minDist = Math.min(minDist, dist);
    }

    return Math.max(127-minDist, 34);
}

function drawVornoi(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    const header = document.getElementById('header');

    canvas.width = header.offsetWidth;
    canvas.height = header.offsetHeight;

    const featurePoints = [];
    for (let i = 0; i < 12; i++) {
        featurePoints.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
        });
    }
    
    for (let x = 0; x < canvas.width; x+=4) {
        for (let y = 0; y < canvas.height; y+=4) {
            const noiseValue = voronoiNoise(x, y, featurePoints);
            const colorValue = Math.floor(noiseValue);
            ctx.fillStyle = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
            ctx.fillRect(x, y, 4, 4);
        }
    }
}

