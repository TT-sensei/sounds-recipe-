import { soundList, playSound } from './sounds.js';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const catalog = document.querySelector('#catalog');
const filters = document.querySelector('#filters');
const search = document.querySelector('#search');
const count = document.querySelector('#resultCount');
const empty = document.querySelector('#empty');
const volume = document.querySelector('#volume');
const volumeValue = document.querySelector('#volumeValue');
const toast = document.querySelector('#toast');

let category = 'すべて';
let toastTimer;
let playAllToken = 0;
const favorites = new Set(JSON.parse(localStorage.getItem('sound-recipe-favorites') || '[]'));
const categories = ['すべて', ...new Set(soundList.map(sound => sound.category))];

filters.innerHTML = categories.map((name, index) =>
  `<button class="filter${index === 0 ? ' active' : ''}" type="button" role="tab"
    aria-selected="${index === 0}" data-category="${name}">${name}</button>`
).join('');

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2100);
}

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function visibleSounds() {
  const word = search.value.trim().toLocaleLowerCase();
  return soundList.filter(sound =>
    (category === 'すべて' || sound.category === category) &&
    (!word || [sound.id, sound.name, sound.desc, sound.category, sound.use]
      .join(' ').toLocaleLowerCase().includes(word))
  );
}

function render() {
  const list = visibleSounds();
  count.textContent = `${list.length} / ${soundList.length} recipes`;
  empty.classList.toggle('hidden', list.length !== 0);
  catalog.innerHTML = list.map(sound => {
    const bars = Array.from({ length: 22 }, (_, i) =>
      `<i style="--h:${16 + (i * 17 + sound.id.length * 7) % 28}px"></i>`
    ).join('');
    const id = escapeHTML(sound.id);
    return `<article class="card" data-id="${id}" style="--card-color:${escapeHTML(sound.color)}">
      <div class="card-top">
        <span class="tag">#${id} · ${escapeHTML(sound.category)} / ${escapeHTML(sound.use)}</span>
        <button class="favorite${favorites.has(sound.id) ? ' on' : ''}" data-favorite="${id}"
          type="button" aria-label="${escapeHTML(sound.name)}をお気に入りに登録"
          aria-pressed="${favorites.has(sound.id)}">★</button>
      </div>
      <h3>${escapeHTML(sound.name)}</h3>
      <p>${escapeHTML(sound.desc)}</p>
      <div class="sound-meta">用途：${escapeHTML(sound.use)}　｜　ID：<code>${id}</code>　｜　${sound.duration.toFixed(2)}秒</div>
      <div class="wave" aria-hidden="true">${bars}</div>
      <div class="card-actions">
        <button class="btn btn-play" data-play="${id}" type="button">▶ 試聴する</button>
        <button class="btn btn-copy" data-copy="${id}" type="button">AI用コード</button>
      </div>
    </article>`;
  }).join('');
}

async function play(sound) {
  if (!sound) return;
  const card = catalog.querySelector(`[data-id="${CSS.escape(sound.id)}"]`);
  if (card) {
    card.classList.add('playing');
    const button = card.querySelector('.btn-play');
    if (button) button.textContent = '♪ 再生中';
    setTimeout(() => {
      card.classList.remove('playing');
      if (button) button.textContent = '▶ 試聴する';
    }, sound.duration * 1000 + 100);
  }
  await playSound(audioCtx, sound.id, Number(volume.value) / 100);
}

function integrationCode(id) {
  return `// SOUND RECIPE：${id}
import { playSound } from 'https://tt-sensei.github.io/sounds-recipe-/sounds.js';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// 正解・ボタン操作など、ユーザー操作後に呼び出す
await playSound(audioContext, '${id}', 0.25); // 音量は0〜1
// 例：await playSound(audioContext, '${id}', 0.15); // 控えめ
// ミュート設定：再生する前に音量を0にするか、playSoundの呼び出しを止める
`;
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.append(area);
  area.select();
  const ok = document.execCommand('copy');
  area.remove();
  if (!ok) throw new Error('コピーに失敗しました');
}

catalog.addEventListener('click', async event => {
  const playButton = event.target.closest('[data-play]');
  const copyButton = event.target.closest('[data-copy]');
  const favoriteButton = event.target.closest('[data-favorite]');

  if (playButton) {
    await play(soundList.find(sound => sound.id === playButton.dataset.play));
  }

  if (copyButton) {
    const id = copyButton.dataset.copy;
    try {
      await copyText(integrationCode(id));
      copyButton.textContent = '✓ コピー済';
      copyButton.classList.add('copied');
      showToast(`${id} のAI組み込みコードをコピーしました`);
    } catch {
      showToast('コピーできませんでした。ブラウザの設定を確認してください。');
    }
    setTimeout(() => {
      copyButton.textContent = 'AI用コード';
      copyButton.classList.remove('copied');
    }, 1900);
  }

  if (favoriteButton) {
    const id = favoriteButton.dataset.favorite;
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    localStorage.setItem('sound-recipe-favorites', JSON.stringify([...favorites]));
    render();
    showToast(favorites.has(id) ? 'お気に入りに追加しました' : 'お気に入りから外しました');
  }
});

filters.addEventListener('click', event => {
  const button = event.target.closest('[data-category]');
  if (!button) return;
  category = button.dataset.category;
  filters.querySelectorAll('.filter').forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
  });
  render();
});

search.addEventListener('input', render);
volume.addEventListener('input', () => {
  volumeValue.value = `${volume.value}%`;
  volumeValue.textContent = `${volume.value}%`;
});

document.querySelector('#playAll').addEventListener('click', async () => {
  const list = visibleSounds();
  if (!list.length) return;
  const token = ++playAllToken;
  const button = document.querySelector('#playAll');
  button.disabled = true;
  button.textContent = '♪ 試聴中…';
  try {
    for (const sound of list) {
      if (token !== playAllToken) break;
      await play(sound);
      await new Promise(resolve => setTimeout(resolve, sound.duration * 1000 + 220));
    }
  } finally {
    if (token === playAllToken) {
      button.disabled = false;
      button.textContent = '▶ 表示中を順番に試聴';
    }
  }
});

document.querySelector('#playAll').textContent = '▶ 表示中を順番に試聴';
render();
