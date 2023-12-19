const canvas = document.getElementById('number-drawing');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = '#fff';
ctx.fillStyle = '#000';


let isPainting = false;
let lineWidth = 15;
let startX;
let startY;
let offsetY = 60;
let offsetX = 10;


addEventListener('click', async e => {

    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (e.target.id === 'detect') {
        const cnv = document.createElement('canvas');
        cnv.width = 28; cnv.height = 28;
        const cnv_ctx = cnv.getContext('2d');
        cnv_ctx.drawImage(canvas, 0, 0, cnv.width, cnv.height);
        const img = cnv.toDataURL('image/png', 0.5);
        const endpoint = document.getElementById('endpoint').value;
        const data = { endpoint, img };
        const opts = { method: 'POST', body: JSON.stringify(data) };
        const res = await fetch('/predict', opts);
        const json = await res.json();
        document.getElementById('results').innerHTML = JSON.stringify(json, null, 2);
    }
});


const draw = (e) => {
    if (!isPainting) return;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - offsetX, e.clientY - offsetY);
    ctx.stroke();
}


canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});


canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);