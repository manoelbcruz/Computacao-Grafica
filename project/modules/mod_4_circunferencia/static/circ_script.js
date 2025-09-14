document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas-circ');
    const ctx = canvas.getContext('2d');
    const drawAxes = () => { const { width, height } = ctx.canvas; ctx.clearRect(0, 0, width, height); ctx.strokeStyle = '#eee'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height); ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2); ctx.stroke(); };
    const drawPoints = (points) => { const { width, height } = ctx.canvas; const centerX = width / 2; const centerY = height / 2; ctx.fillStyle = 'black'; points.forEach(p => { ctx.fillRect(centerX + p.x, centerY - p.y, 1, 1); }); };
    drawAxes();
    document.getElementById('draw-circle-btn').addEventListener('click', async () => {
        const payload = { xc: document.getElementById('circle-xc').value, yc: document.getElementById('circle-yc').value, r: document.getElementById('circle-r').value, algo: document.getElementById('circle-algo').value };
        const response = await fetch('/api/circ/draw_circle', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
        const points = await response.json();
        drawAxes(); drawPoints(points);
    });
});