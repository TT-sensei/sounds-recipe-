// =============================================
// sounds.js — 音のレシピ集
// 新しい音を追加するときはここだけ編集！
// =============================================

export const soundList = [
{
id: “correct”,
name: “ピンポン！”,
desc: “正解した時の明るい上昇音”,
color: “#7fff6e”,
code: `const ctx = new AudioContext(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = 'sine'; osc.frequency.setValueAtTime(659, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); gain.gain.setValueAtTime(0.4, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5); osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.5);`,
play: (ctx) => {
const osc = ctx.createOscillator();
const gain = ctx.createGain();
osc.type = ‘sine’;
osc.frequency.setValueAtTime(659, ctx.currentTime);
osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
gain.gain.setValueAtTime(0.4, ctx.currentTime);
gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
osc.connect(gain);
gain.connect(ctx.destination);
osc.start();
osc.stop(ctx.currentTime + 0.5);
return 0.5;
}
},
{
id: “wrong”,
name: “ブブー”,
desc: “不正解の低い下降音”,
color: “#ff6eb4”,
code: `const ctx = new AudioContext(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = 'sawtooth'; osc.frequency.setValueAtTime(220, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.3); gain.gain.setValueAtTime(0.3, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6); osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.6);`,
play: (ctx) => {
const osc = ctx.createOscillator();
const gain = ctx.createGain();
osc.type = ‘sawtooth’;
osc.frequency.setValueAtTime(220, ctx.currentTime);
osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.3);
gain.gain.setValueAtTime(0.3, ctx.currentTime);
gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
osc.connect(gain);
gain.connect(ctx.destination);
osc.start();
osc.stop(ctx.currentTime + 0.6);
return 0.6;
}
},
{
id: “decide”,
name: “決定音”,
desc: “ボタン確定・選択完了の2音符音”,
color: “#6eb4ff”,
code: `const ctx = new AudioContext(); function beep(freq, start, dur) { const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = 'square'; osc.frequency.value = freq; gain.gain.setValueAtTime(0.2, ctx.currentTime + start); gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur); osc.connect(gain); gain.connect(ctx.destination); osc.start(ctx.currentTime + start); osc.stop(ctx.currentTime + start + dur); } beep(440, 0, 0.1); beep(660, 0.12, 0.15);`,
play: (ctx) => {
function beep(freq, start, dur) {
const osc = ctx.createOscillator();
const gain = ctx.createGain();
osc.type = ‘square’;
osc.frequency.value = freq;
gain.gain.setValueAtTime(0.2, ctx.currentTime + start);
gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
osc.connect(gain);
gain.connect(ctx.destination);
osc.start(ctx.currentTime + start);
osc.stop(ctx.currentTime + start + dur);
}
beep(440, 0, 0.1);
beep(660, 0.12, 0.15);
return 0.3;
}
},
{
id: “notify”,
name: “通知音”,
desc: “メッセージ受信・アラートの柔らかいチャイム音”,
color: “#ffcf6e”,
code: `const ctx = new AudioContext(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.type = 'sine'; osc.frequency.setValueAtTime(880, ctx.currentTime); osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.1); osc.frequency.setValueAtTime(880, ctx.currentTime + 0.2); gain.gain.setValueAtTime(0.0001, ctx.currentTime); gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05); gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6); osc.connect(gain); gain.connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime + 0.6);`,
play: (ctx) => {
const osc = ctx.createOscillator();
const gain = ctx.createGain();
osc.type = ‘sine’;
osc.frequency.setValueAtTime(880, ctx.currentTime);
osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.1);
osc.frequency.setValueAtTime(880, ctx.currentTime + 0.2);
gain.gain.setValueAtTime(0.0001, ctx.currentTime);
gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
osc.connect(gain);
gain.connect(ctx.destination);
osc.start();
osc.stop(ctx.currentTime + 0.6);
return 0.6;
}
}
];