# SOUND RECIPE 使用ガイド

このファイルは、今後Web教材を作るときに「どの場面で、どの音を使うか」を迷わないための設計メモです。

## 基本方針

- 外部音源・外部ライブラリなし。Web Audio APIだけで生成する。
- 音は短く、音量は控えめ。教室で繰り返し鳴っても疲れにくくする。
- 成功・発見は上向きの sine / triangle、不正解は短い低音にする。
- iPad・タブレット対策として、最初のユーザー操作で AudioContext を resume する。
- アプリ側では、用途に合う `id` を選び、`sounds.js` の音型を参考にする。

## 選び方

|場面|使うID|目安|
|---|---|---|
|ボタン・カードを押す|`click` / `decide`|0.1〜0.4秒|
|問題が始まる|`questionStart` / `start`|0.3〜0.8秒|
|正解|`correct` / `near` / `practice`|正解の強さに合わせる|
|不正解|`wrong` / `softFail`|責めずに短く|
|ヒント・ひらめき|`hint` / `sparkle`|考える流れを止めない|
|連続正解|`comboStart` / `combo3` / `combo5` / `combo10`|記録が伸びるほど華やかに|
|時間|`countdown` / `warning` / `alarm`|音量を上げすぎない|
|学習完了|`practice` / `mission` / `daily` / `allclear`|長めのジングルも可|
|バッジ・称号|`badge` / `rareBadge` / `certificate`|特別感を出す|
|図鑑・発見|`discover` / `elementRare` / `bookOpen` / `page`|明るい上昇音|
|進化・解放|`evolve` / `unlock` / `plantGrow`|0.8〜1.5秒|
|全体の完成|`collectionComplete` / `finale`|1.5〜2.1秒|

## IDの考え方

- `correct`：通常の正解。毎問鳴らす想定。
- `near`：惜しい・部分点・もう少し。
- `softFail`：不正解でも、もう一度挑戦させたい場面。
- `combo3` / `combo5` / `combo10`：連続正解数に対応。
- `badge` / `rareBadge`：通常報酬と特別報酬を区別。
- `discover` / `elementRare`：通常発見とレア発見を区別。
- `practice` / `mission` / `daily`：小さな完了、課題完了、1日の完了。
- `stageClear` / `allclear` / `finale`：ステージ、課題全体、コレクション全体。

## アプリに組み込むときの例

```js
// 正解したとき
playSound('correct');

// 5問連続正解したとき
playSound('combo5');

// バッジを獲得したとき
playSound('badge');

// 図鑑にレアエレメントが追加されたとき
playSound('elementRare');
```

実際のアプリでは、音量設定を共通化し、連打時に同じ音が重なりすぎないようにする。

## 収録カテゴリ

- 学習：問題開始、正解、惜しい、ヒント、記録、説明、まとめ
- UI：クリック、決定、開く、閉じる、ページ、スワイプ、保存、音設定
- ゲーム：開始、コンボ、進捗、時間、ランク、ステージ、チャレンジ終了
- ごほうび：バッジ、シール、コイン、アイテム、ボーナス、修了証、完成
- 発見：ひらめき、新発見、図鑑、レアエレメント、進化、解放、成長
