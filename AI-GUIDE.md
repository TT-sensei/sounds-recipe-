# SOUND RECIPE — AI教材制作ガイド

このリポジトリは、TT-senseiの小学校向けWeb教材で使う効果音の共通カタログです。新しい教材を作るときは、独自の音をその場で作る前に必ず既存レシピを探してください。

## 最短の組み込み方

```js
import { playSound } from 'https://tt-sensei.github.io/sounds-recipe-/sounds.js';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

async function playEffect(id) {
  return playSound(audioContext, id, 0.22); // 音量は0〜1
}

// 例：ユーザーが答えを送信し、正解と判定された後
await playEffect('correct');
```

- `playSound(audioContext, id, volume)` は `true / false` を返します。
- `getSound(id)` でレシピ情報を取得できます。
- 既存レシピのIDは変更せず、そのまま使ってください。
- AudioContextの生成と再生は、ボタン押下などユーザー操作に結び付けてください。自動再生はしないでください。
- 同じAudioContextをアプリ内で使い回してください。毎回新しく作らないでください。
- 音量スライダーとミュートを用意してください。音量は通常0.15〜0.3程度から試してください。
- ミュート中も正誤や重要情報が視覚的に分かるようにしてください。
- 連打や連続正解で音が重なりすぎないようにし、毎問長いファンファーレを鳴らさないでください。

## レシピの探し方

公開カタログで名前・用途・IDを検索して試聴します。AIがコードを生成するときは、カードの「AI用コード」をコピーして実装の出発点にできます。

よく使うID：
- 通常の正解：`correct`
- 惜しい・前向きな反応：`near`
- 不正解：`wrong`
- ボタン操作：`click` / `decide`
- ヒント：`hint`
- 小さな達成：`practice`
- 連続正解：`combo3` / `combo5` / `combo10`
- ステージ達成：`stageClear`
- バッジ獲得：`badge` / `rareBadge`
- 発見：`discover` / `sparkle`
- 図鑑・コレクション：`page` / `evolve`
- 学習完了：`daily` / `mission` / `allclear`

このリストは例です。実際に存在するIDは `sounds.js` の `soundList` を確認してください。ガイド内のIDが存在しない場合は、似た用途の既存IDを選び、存在しないIDを実装しないでください。

## 音の選び方

- 操作音は短く、控えめに。
- 正解は明るく、不正解は短く落ち着いて。子どもを責めるような音にしない。
- 報酬音は重要度に応じて差をつける。
- 音の種類を増やすより、用途ごとの一貫性を優先する。
- 学習中の集中を妨げないよう、音数・音量・長さを抑える。
- 音が鳴らなくても操作・理解・達成状況が分かるUIにする。

## 制約

- Vanilla JavaScript と Web Audio APIを基本とする。
- 外部音源、音声ファイル、外部ライブラリ、CDN、外部API、APIキー、ビルド環境を追加しない。
- アプリごとに同じ音をコピーして増殖させず、共通カタログを使う。
- 共通IDや既存の音を独断で削除・改名しない。
- 新しいレシピが本当に必要な場合は、既存音との重複を確認し、用途・音量・長さ・試聴を整えてから共通カタログに追加する。
