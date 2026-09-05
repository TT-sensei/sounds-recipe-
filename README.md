# sounds-recipe-

小学校向けWeb教材で使える効果音を、Web Audio APIだけで生成するサウンドレシピ集です。

音声ファイルを配布するライブラリではありません。`sounds.js`からレシピを読み込み、教材側の`AudioContext`でその場で再生します。外部音源・外部サーバー・npm・ビルド環境は必要ありません。

## このリポジトリの役割

`sounds-recipe-`は、教材の「音」を担当します。

- 正解・不正解などのフィードバック音
- ボタン・決定などの操作音
- コンボ・タイマーなどの状態変化音
- ミッション達成・結果などの演出音
- バッジ・レベルアップ・解放などの報酬音

音は学習を邪魔するためではなく、「今なにが起きたか」を子どもに伝える補助情報として使います。派手さよりも、短さ・聞き分けやすさ・繰り返し聞いても疲れにくいことを優先します。

## 収録内容

現在の主なレシピには次のようなものがあります。

- 正解・不正解：`correct`、`wrong`、`near`、`softFail`
- 決定・操作：`click`、`decide`、`submit`、`optionNext`、`optionBack`
- コンボ・時間：`combo3`、`combo5`、`combo10`、`warning`、`timeUpSoft`
- 達成・結果：`practice`、`mission`、`allclear`、`result`、`classComplete`
- 報酬・解放：`badge`、`rareBadge`、`levelup`、`unlock`、`certificate`

全ID・用途・長さ・試聴は、[公開カタログ](https://tt-sensei.github.io/sounds-recipe-/) または [`sounds.js`](sounds.js) で確認してください。

## 基本的な使い方

必要なレシピだけを`id`で取得して再生します。

```js
import { soundList } from 'https://tt-sensei.github.io/sounds-recipe-/sounds.js';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

async function playRecipe(id, volume = 0.25) {
  if (audioContext.state === 'suspended') await audioContext.resume();
  const recipe = soundList.find((item) => item.id === id);
  if (!recipe) return false;
  recipe.play(audioContext, volume);
  return true;
}
```

音声はブラウザの自動再生制限があるため、最初のボタン操作などユーザー操作後に再生します。教材側には音量・ミュート設定を用意し、授業中でも無音で利用できるようにしてください。

`playSound()`など、READMEや`SOUND_GUIDE.md`に記載されていない共通APIを推測して実装しないでください。

## 教材制作共通基盤

TT-senseiの教材では、4つの共通基盤を役割分担して利用します。

| プロジェクト | 担当 |
| --- | --- |
| `edu-components` | 動作・ロジック・状態管理 |
| `edu-effects` | UI・CSS・視覚演出 |
| `sounds-recipe-` | 音・サウンド演出 |
| `edu-assets` | バッジ・エレメント・コレクション画像 |

4つすべてを使う必要はありません。教材に必要なものだけを組み合わせます。

たとえば「正解」の処理なら、`edu-components`で判定し、`edu-effects`で視覚的なフィードバックを出し、`sounds-recipe-`で短い正解音を鳴らし、必要なら`edu-assets`の報酬画像を表示する、という構成にできます。

## AIで教材を作るときのルール

AIが新しい教材を作る場合も、まず既存のレシピを確認してください。

- `sounds.js`に既存IDがないか確認する
- 同じ用途の音を教材ごとに新規作成しない
- IDを勝手に変更・改名しない
- 音量は教材側から調整できるようにする
- ユーザー操作前に音を再生しない
- 連続正解などで音を鳴らしすぎない
- 音だけで正誤や重要情報を伝えない
- ミュートしても教材の操作や理解に支障がないようにする
- 外部音声ファイル、外部ライブラリ、外部APIを勝手に追加しない
- 新しい共通レシピが必要なら、教材内に一時的なコピーを作るのではなく、このリポジトリへの追加を検討する

## 学習向けサウンド設計

小学校の授業で繰り返し使うことを前提に、音は短く、意味を持たせます。

「正解」「不正解」「決定」「達成」「解放」など、意味の違う状態には聞き分けやすい音を使います。一方、問題を解いている最中に必要以上の音を鳴らしたり、毎回大きなファンファーレを鳴らしたりする設計は避けます。

視覚情報と組み合わせ、音がなくても成立するUIにしてください。聴覚過敏への配慮や、教室全体での利用も考慮します。

## 4基盤との接続イメージ

```text
問題・操作
   ↓
edu-components
   ├─ 判定・状態変更
   ├─ edu-effects → 視覚フィードバック
   ├─ sounds-recipe- → サウンド
   └─ edu-assets → バッジ・画像・報酬
```

問題データや教材固有のルールは各教材側に置き、共通基盤には教材をまたいで再利用できる仕組みだけを置くのが基本です。

## 開発方針

- Vanilla JavaScript / Web Audio APIを基本とする
- npm・ビルド・APIキー・外部DBに依存しない
- iPad・タブレット・マウス操作を前提にする
- 教室で繰り返し使える軽量な実装にする
- 音を使えない環境でも教材が成立するようにする
- 既存レシピとの重複を避ける
- 共通基盤を教材ごとに改造しない

## 関連カタログ

- [sounds-recipe- 公開カタログ](https://tt-sensei.github.io/sounds-recipe-/)
- [edu-components](https://github.com/TT-sensei/edu-components)：動作・ロジック
- [edu-effects](https://github.com/TT-sensei/edu-effects)：UI・視覚演出
- [edu-assets](https://github.com/TT-sensei/edu-assets)：画像・バッジ・コレクション

詳細な実装ルールやレシピ仕様は [`SOUND_GUIDE.md`](SOUND_GUIDE.md) を参照してください。

## License

このリポジトリのライセンス条件については、同梱の[`LICENSE`](LICENSE)を確認してください。

Copyright © 2026 TT-sensei.
