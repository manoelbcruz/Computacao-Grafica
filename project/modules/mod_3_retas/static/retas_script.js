document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas-retas');
    const ctx = canvas.getContext('2d');

    // Controles e Informações
    const lineX1Input = document.getElementById('line-x1');
    const lineY1Input = document.getElementById('line-y1');
    const lineX2Input = document.getElementById('line-x2');
    const lineY2Input = document.getElementById('line-y2');
    const lineAlgoSelect = document.getElementById('line-algo');
    const drawLineBtn = document.getElementById('draw-line-btn');
    const linePointsInfo = document.getElementById('line-points-info');
    const clearBtn = document.getElementById('clear-btn');

    // --- FUNÇÕES DE DESENHO E ATUALIZAÇÃO ---

    // NOVA FUNÇÃO PRIMITIVA: setPixel
    const setPixel = (x, y) => {
        const { width, height } = ctx.canvas;
        const centerX = width / 2;
        const centerY = height / 2;
        // Desenha um retângulo de 1x1 (um pixel) na cor preta
        ctx.fillStyle = 'black';
        ctx.fillRect(centerX + x, centerY - y, 1, 1);
    };

    const drawAxes = () => {
        // ... (código para desenhar eixos, igual ao anterior)
    };

    // drawPoints agora USA a função setPixel
    const drawPoints = (points) => {
        if (!points || points.length === 0) return;
        points.forEach(p => {
            setPixel(p.x, p.y);
        });
    };

    const updateLineInfoPanel = (points) => {
        // ... (código para atualizar o painel, igual ao anterior)
    };

    const clearAll = () => {
        drawAxes();
        updateLineInfoPanel(null);
    };

    // --- LÓGICA DE EVENTOS ---
    drawLineBtn.addEventListener('click', async () => {
        // ... (código do evento, igual ao anterior) ...
        drawAxes();
        drawPoints(points); // Esta função agora usa setPixel
        updateLineInfoPanel(points);
    });

    clearBtn.addEventListener('click', clearAll);

    // --- INICIALIZAÇÃO ---
    clearAll();
});

// Cole o conteúdo completo do script anterior aqui, apenas garantindo que
// as funções drawAxes, drawPoints e setPixel estejam como definidas acima.
// Para segurança, aqui está o código completo e refatorado:

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas-retas');
    const ctx = canvas.getContext('2d');
    const lineX1Input = document.getElementById('line-x1');
    const lineY1Input = document.getElementById('line-y1');
    const lineX2Input = document.getElementById('line-x2');
    const lineY2Input = document.getElementById('line-y2');
    const lineAlgoSelect = document.getElementById('line-algo');
    const drawLineBtn = document.getElementById('draw-line-btn');
    const linePointsInfo = document.getElementById('line-points-info');
    const clearBtn = document.getElementById('clear-btn');

    const setPixel = (x, y) => {
        const { width, height } = ctx.canvas;
        const centerX = width / 2;
        const centerY = height / 2;
        ctx.fillStyle = 'black';
        ctx.fillRect(centerX + x, centerY - y, 1, 1);
    };

    const drawAxes = () => {
        const { width, height } = ctx.canvas;
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height);
        ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2);
        ctx.stroke();
    };

    const drawPoints = (points) => {
        if (!points || points.length === 0) return;
        points.forEach(p => {
            setPixel(p.x, p.y);
        });
    };

    const updateLineInfoPanel = (points) => {
        if (!points || points.length === 0) {
            linePointsInfo.value = 'Nenhuma reta gerada.';
            return;
        }
        const pointsText = points.map(p => `(${p.x}, ${p.y})`).join('\n');
        linePointsInfo.value = pointsText;
    };

    const clearAll = () => {
        drawAxes();
        updateLineInfoPanel(null);
    };

    drawLineBtn.addEventListener('click', async () => {
        const payload = { x1: lineX1Input.value, y1: lineY1Input.value, x2: lineX2Input.value, y2: lineY2Input.value, algo: lineAlgoSelect.value };
        const response = await fetch('/api/retas/draw_line', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload) });
        const points = await response.json();
        clearAll();
        drawPoints(points);
        updateLineInfoPanel(points);
    });

    clearBtn.addEventListener('click', clearAll);

    clearAll();
});