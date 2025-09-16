document.addEventListener('DOMContentLoaded', () => {
    // --- SELEÇÃO DE ELEMENTOS DO DOM ---
    const canvas = document.getElementById('canvas-2d');
    const ctx = canvas.getContext('2d');
    
    // ... (todas as outras seleções de elementos continuam iguais)
    const squareSizeInput = document.getElementById('square-size');
    const startXInput = document.getElementById('start-x');
    const startYInput = document.getElementById('start-y');
    const generateSquareBtn = document.getElementById('generate-square-btn');
    const transXInput = document.getElementById('trans-x');
    const transYInput = document.getElementById('trans-y');
    const applyTransBtn = document.getElementById('apply-translation-btn');
    const scaleXInput = document.getElementById('scale-x');
    const scaleYInput = document.getElementById('scale-y');
    const applyScaleBtn = document.getElementById('apply-scale-btn');
    const rotAngleInput = document.getElementById('rot-angle');
    const applyRotBtn = document.getElementById('apply-rotation-btn');
    const reflectXCheck = document.getElementById('reflect-x');
    const reflectYCheck = document.getElementById('reflect-y');
    const applyReflectBtn = document.getElementById('apply-reflection-btn');
    const shearXInput = document.getElementById('shear-x');
    const shearYInput = document.getElementById('shear-y');
    const applyShearBtn = document.getElementById('apply-shear-btn');
    const verticesInfo = document.getElementById('vertices-info');
    const centerInfo = document.getElementById('center-info');
    const clearBtn = document.getElementById('clear-btn');
    const historyLog = document.getElementById('history-log');

    // --- ESTADO DA APLICAÇÃO ---
    let originalObject = [], currentObject = [], transformHistory = [];

    // --- FUNÇÕES DE DESENHO E ATUALIZAÇÃO ---

    // ADICIONADO PARA CONSISTÊNCIA
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

    // Esta função usa desenho VETORIAL (caminhos), por isso não chama setPixel.
    // Ela é otimizada para desenhar polígonos.
    const drawPolygon = (points) => {
        if (points.length < 2) return;
        const { width, height } = ctx.canvas;
        const centerX = width / 2;
        const centerY = height / 2;
        
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(centerX + points[0].x, centerY - points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(centerX + points[i].x, centerY - points[i].y);
        }
        ctx.closePath(); 
        ctx.stroke();
    };
    
    const redraw = () => {
        drawAxes();
        if (currentObject.length > 0) {
            drawPolygon(currentObject);
            updateInfoPanel();
        }
    };
    
    const updateInfoPanel = () => {
        if (currentObject.length === 0) {
            verticesInfo.textContent = 'Nenhum objeto gerado.';
            centerInfo.value = '';
            historyLog.innerHTML = 'Nenhuma transformação aplicada.';
            return;
        }
        verticesInfo.textContent = currentObject.map((p, i) => `Vértice ${i+1}: (${p.x.toFixed(2)}, ${p.y.toFixed(2)})`).join('\n');
        const sumX = currentObject.reduce((s, p) => s + p.x, 0);
        const sumY = currentObject.reduce((s, p) => s + p.y, 0);
        const centerX = sumX / currentObject.length;
        const centerY = sumY / currentObject.length;
        centerInfo.value = `(${centerX.toFixed(2)}, ${centerY.toFixed(2)})`;
        if (transformHistory.length === 0) {
            historyLog.innerHTML = 'Nenhuma transformação aplicada.';
        } else {
            historyLog.innerHTML = '<ul>' + transformHistory.map(item => `<li>${item}</li>`).join('') + '</ul>';
        }
    };

    // --- LÓGICA DE EVENTOS (sem alterações) ---
    generateSquareBtn.addEventListener('click', () => {
        const size = parseInt(squareSizeInput.value);
        const startX = parseInt(startXInput.value);
        const startY = parseInt(startYInput.value);
        originalObject = [
            { x: startX, y: startY },
            { x: startX + size, y: startY },
            { x: startX + size, y: startY + size },
            { x: startX, y: startY + size }
        ];
        currentObject = JSON.parse(JSON.stringify(originalObject));
        transformHistory = [];
        redraw();
    });
    
    const applyTransformation = async (type, params, historyMsg) => {
        if (currentObject.length === 0) {
            alert("Gere um objeto primeiro!");
            return;
        }
        const response = await fetch('/api/twod/transform', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ type: type, points: currentObject, params: params })
        });
        currentObject = await response.json();
        transformHistory.push(historyMsg);
        redraw();
    };

    applyTransBtn.addEventListener('click', () => {
        const tx = parseFloat(transXInput.value), ty = parseFloat(transYInput.value);
        applyTransformation('translate', { tx, ty }, `Translação(${tx}, ${ty})`);
    });

    applyScaleBtn.addEventListener('click', () => {
        const sx = parseFloat(scaleXInput.value), sy = parseFloat(scaleYInput.value);
        const pivot = currentObject[0] || {x:0, y:0};
        applyTransformation('scale', { sx, sy, cx: pivot.x, cy: pivot.y }, `Escala(${sx}, ${sy})`);
    });

    applyRotBtn.addEventListener('click', () => {
        const angle = parseFloat(rotAngleInput.value);
        const sumX = currentObject.reduce((s, p) => s + p.x, 0);
        const sumY = currentObject.reduce((s, p) => s + p.y, 0);
        const center = { x: sumX / currentObject.length, y: sumY / currentObject.length };
        applyTransformation('rotate', { angle, cx: center.x, cy: center.y }, `Rotação(${angle}°)`);
    });
    
    applyReflectBtn.addEventListener('click', () => {
        const reflect_x = reflectYCheck.checked;
        const reflect_y = reflectXCheck.checked;
        applyTransformation('reflection', { reflect_x, reflect_y }, `Reflexão(emX:${reflect_x}, emY:${reflect_y})`);
    });
    
    applyShearBtn.addEventListener('click', () => {
        const shx = parseFloat(shearXInput.value), shy = parseFloat(shearYInput.value);
        applyTransformation('shear', { shx, shy }, `Cisalhamento(${shx}, ${shy})`);
    });
    
    clearBtn.addEventListener('click', () => {
        originalObject = [];
        currentObject = [];
        transformHistory = [];
        drawAxes();
        updateInfoPanel();
    });

    // --- INICIALIZAÇÃO ---
    drawAxes();
    updateInfoPanel();
});