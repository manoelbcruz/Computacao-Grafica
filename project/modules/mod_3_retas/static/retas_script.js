document.addEventListener('DOMContentLoaded', () => {
    // --- SELEÇÃO DE ELEMENTOS DO DOM ---
    const canvas = document.getElementById('canvas-retas');
    const ctx = canvas.getContext('2d');

    // Controles
    const lineX1Input = document.getElementById('line-x1');
    const lineY1Input = document.getElementById('line-y1');
    const lineX2Input = document.getElementById('line-x2');
    const lineY2Input = document.getElementById('line-y2');
    const lineAlgoSelect = document.getElementById('line-algo');
    const drawLineBtn = document.getElementById('draw-line-btn');

    // Novo Painel de Informações
    const linePointsInfo = document.getElementById('line-points-info');
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
    const updateLineInfoPanel = (points) => {
        if (!points || points.length === 0) {
            linePointsInfo.value = 'Nenhuma reta gerada.';
            return;
        }
        // Formata a lista de pontos para exibição
        const pointsText = points.map(p => `(${p.x}, ${p.y})`).join('\n');
        linePointsInfo.value = pointsText;
    };

    const clearAll = () => {
        drawAxes();
        updateLineInfoPanel(null);
    };


    // --- LÓGICA DE EVENTOS ---
    drawLineBtn.addEventListener('click', async () => {
        const payload = {
            x1: lineX1Input.value,
            y1: lineY1Input.value,
            x2: lineX2Input.value,
            y2: lineY2Input.value,
            algo: lineAlgoSelect.value
        };

        const response = await fetch('/api/retas/draw_line', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const points = await response.json();

        drawAxes();
        drawPoints(points);
        updateLineInfoPanel(points); // Atualiza o painel com os pontos recebidos
    });

    clearBtn.addEventListener('click', clearAll);

    // --- INICIALIZAÇÃO ---
    clearAll();
});