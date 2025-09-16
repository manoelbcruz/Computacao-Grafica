document.addEventListener('DOMContentLoaded', () => {
    // --- SELEÇÃO DE ELEMENTOS DO DOM ---
    const canvas = document.getElementById('canvas-circ');
    const ctx = canvas.getContext('2d');

    // Controles
    const circleXcInput = document.getElementById('circle-xc');
    const circleYcInput = document.getElementById('circle-yc');
    const circleRInput = document.getElementById('circle-r');
    const circleAlgoSelect = document.getElementById('circle-algo');
    const drawCircleBtn = document.getElementById('draw-circle-btn');

    // Novo Painel de Informações
    const circPointsInfo = document.getElementById('circ-points-info');
    const clearBtn = document.getElementById('clear-btn');


    // --- FUNÇÕES DE DESENHO E ATUALIZAÇÃO ---
    const drawAxes = () => {
        const {
            width,
            height
        } = ctx.canvas;
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
    };

    const drawPoints = (points) => {
        const {
            width,
            height
        } = ctx.canvas;
        const centerX = width / 2;
        const centerY = height / 2;
        ctx.fillStyle = 'black';
        points.forEach(p => {
            ctx.fillRect(centerX + p.x, centerY - p.y, 1, 1);
        });
    };

    // Nova função para atualizar o painel de informações
    const updateCircInfoPanel = (points) => {
        if (!points || points.length === 0) {
            circPointsInfo.value = 'Nenhuma circunferência gerada.';
            return;
        }
        // Formata a lista de pontos para exibição
        const pointsText = points.map(p => `(${p.x}, ${p.y})`).join('\n');
        circPointsInfo.value = pointsText;
    };

    const clearAll = () => {
        drawAxes();
        updateCircInfoPanel(null);
    };


    // --- LÓGICA DE EVENTOS ---
    drawCircleBtn.addEventListener('click', async () => {
        const payload = {
            xc: circleXcInput.value,
            yc: circleYcInput.value,
            r: circleRInput.value,
            algo: circleAlgoSelect.value
        };
        const response = await fetch('/api/circ/draw_circle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const points = await response.json();

        drawAxes();
        drawPoints(points);
        updateCircInfoPanel(points); // Atualiza o painel com os pontos recebidos
    });

    clearBtn.addEventListener('click', clearAll);

    // --- INICIALIZAÇÃO ---
    clearAll();
});