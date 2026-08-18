# SOUND RECIPE

小学校向けWeb教材で使える効果音を、Web Audio APIだけで生成する100種類のサウンドレシピ集です。音声ファイル集ではありません。`sounds.js`が`soundList`をexportし、各レシピが`id`、用途、長さ、再生処理、コピー用コードを持ちます。

## 収録内容

- 正解・不正解：`correct`、`wrong`、`near`、`softFail`
- 決定・操作：`click`、`decide`、`submit`、`optionNext`、`optionBack`
- コンボ・時間：`combo3`、`combo5`、`combo10`、`warning`、`timeUpSoft`
- 達成・結果：`practice`、`mission`、`allclear`、`result`、`classComplete`
- 報酬・解放：`badge`、`rareBadge`、`levelup`、`unlock`、`certificate`

全IDと試聴は [公開カタログ](https://tt-sensei.github.io/sounds-recipe-/) または [`sounds.js`](sounds.js) で確認してください。

## 基本的な使い方

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

音は最初のボタン操作後に再生し、教材側に音量・ミュート設定を用意してください。`playSound()`という共通APIや音声ファイルは公開していないため、存在を推測しないでください。詳しくは [SOUND_GUIDE.md](SOUND_GUIDE.md) を参照してください。

## 教材制作共通基盤

| プロジェクト | 担当 | GitHub | Pages |
| --- | --- | --- | --- |
| edu-components | 動作・ロジック | [Repository](https://github.com/TT-sensei/edu-components) | [Catalog](https://tt-sensei.github.io/edu-components/) |
| edu-effects | UI・CSS・視覚演出 | [Repository](https://github.com/TT-sensei/edu-effects) | [Catalog](https://tt-sensei.github.io/edu-effects/) |
| sounds-recipe- | Web Audio APIの教材用サウンドレシピ | [Repository](https://github.com/TT-sensei/sounds-recipe-) | [Catalog](https://tt-sensei.github.io/sounds-recipe-/) |
| edu-assets | バッジ・エレメント・コレクション画像 | [Repository](https://github.com/TT-sensei/edu-assets) | [Catalog](https://tt-sensei.github.io/edu-assets/) |

AIで教材を作成する場合のイベント連携と4資産の選び方は、[edu-componentsのAI-GUIDE](https://github.com/TT-sensei/edu-components/blob/main/AI-GUIDE.md)を参照してください。

