// =============================================
// app.js — メインロジック
// sounds.js からデータを受け取って画面を生成
// =============================================

import { soundList } from ‘./sounds.js’;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const container = document.getElementById(‘catalog’);
const toast = document.getElementById(‘toast’);

function showToast() {
toast.classList.add(‘show’);
setTimeout(() => toast.classList.remove(‘show’), 2000);
}

soundList.forEach(sound => {
const card = document.createElement(‘div’);
card.className = ‘card’;
card.style.setProperty(’–card-color’, sound.color);

```
card.innerHTML = `
    <div class="card-id">#${sound.id}</div>
    <h3>${sound.name}</h3>
    <p>${sound.desc}</p>
    <div class="viz"><div class="viz-bar" id="viz-${sound.id}"></div></div>
    <div class="card-actions">
        <button class="btn btn-play" id="play-${sound.id}">▶ 再生</button>
        <button class="btn btn-copy" id="copy-${sound.id}">コピー</button>
    </div>
`;

// 再生ボタン
const playBtn = card.querySelector(`#play-${sound.id}`);
const vizBar = card.querySelector(`#viz-${sound.id}`);

playBtn.onclick = async () => {
    if (audioCtx.state === 'suspended') await audioCtx.resume();
    const duration = sound.play(audioCtx);
    playBtn.classList.add('playing');
    playBtn.textContent = '♪ 再生中';

    // ビジュアライザーアニメーション
    const start = performance.now();
    const animate = () => {
        const elapsed = (performance.now() - start) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const wave = Math.sin(elapsed * 30) * 0.5 + 0.5;
        vizBar.style.width = (progress * 100 * wave + (1 - progress) * 100) * progress + '%';
        if (elapsed < duration) requestAnimationFrame(animate);
        else {
            vizBar.style.width = '0%';
            playBtn.classList.remove('playing');
            playBtn.textContent = '▶ 再生';
        }
    };
    requestAnimationFrame(animate);
};

// コピーボタン
const copyBtn = card.querySelector(`#copy-${sound.id}`);
copyBtn.onclick = () => {
    navigator.clipboard.writeText(sound.code).then(() => {
        copyBtn.textContent = '✓ コピー済';
        copyBtn.classList.add('copied');
        showToast();
        setTimeout(() => {
            copyBtn.textContent = 'コピー';
            copyBtn.classList.remove('copied');
        }, 2000);
    });
};

container.appendChild(card);
```

});