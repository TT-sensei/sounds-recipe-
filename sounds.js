// 音のレシピ集。新しいレシピはこの配列に追加するだけです。
const tone=(ctx,f,t,d,type='sine',level=.25)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(level,ctx.currentTime+t);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+t+d);o.connect(g).connect(ctx.destination);o.start(ctx.currentTime+t);o.stop(ctx.currentTime+t+d)};
const recipe=(id,name,desc,category,use,color,duration,notes,code)=>({id,name,desc,category,use,color,duration,play:(ctx,v=1)=>{notes(ctx,v);return duration},code});
const simple=(ctx,v,notes)=>notes.forEach(([f,t,d,type,l])=>tone(ctx,f,t,d,type,l*v));
export const soundList=[
recipe('correct','ピンポン！','正解・クリアを明るく伝える上昇音','学習','正解','#b7ff62',.55,(c,v)=>simple(c,v,[[659,0,.22,'sine',.28],[880,.1,.45,'sine',.25]]),"const ctx=new AudioContext(); // 659Hz→880Hz の上昇音"),
recipe('wrong','ブブー','不正解やり直しをやさしく伝える下降音','学習','不正解','#ff7ecb',.62,(c,v)=>simple(c,v,[[220,0,.35,'triangle',.25],[145,.18,.44,'triangle',.23]]),"const ctx=new AudioContext(); // 220Hz→145Hz の下降音"),
recipe('decide','決定音','ボタンを押した、選択が決まったときの2音','UI','決定','#6ee7ff',.34,(c,v)=>simple(c,v,[[440,0,.14,'square',.16],[660,.12,.2,'square',.16]]),"const ctx=new AudioContext(); // 440Hz→660Hz の2音"),
recipe('notify','お知らせ','メッセージや新しい情報に気づかせるチャイム','UI','通知','#ffd166',.65,(c,v)=>simple(c,v,[[880,0,.32,'sine',.23],[1100,.1,.52,'sine',.2]]),"const ctx=new AudioContext(); // 880Hzと1100Hzのチャイム"),
recipe('start','スタート！','ゲームやチャレンジの始まりを盛り上げる音','ゲーム','開始','#9c8cff',.82,(c,v)=>simple(c,v,[[392,0,.24,'sawtooth',.16],[523,.16,.24,'sawtooth',.18],[784,.32,.62,'sawtooth',.2]]),"const ctx=new AudioContext(); // 392Hz→523Hz→784Hz"),
recipe('clear','クリア！','ステージ達成や目標達成を華やかに祝う音','ゲーム','達成','#ff9f68',1.05,(c,v)=>simple(c,v,[523,659,784,1047].map((f,i)=>[f,i*.12,.7,'sine',.2])),"const ctx=new AudioContext(); // Cメジャーの上昇ファンファーレ"),
recipe('click','カチッ','小さな操作やカード選択に使いやすい短い音','UI','クリック','#58d6b2',.12,(c,v)=>simple(c,v,[[900,0,.12,'square',.12]]),"const ctx=new AudioContext(); // 900Hzの短いクリック"),
recipe('alarm','タイムアップ','時間切れや注意をはっきり知らせる音','ゲーム','注意','#ff687d',.8,(c,v)=>simple(c,v,[[330,0,.26,'square',.18],[330,.34,.36,'square',.18]]),"const ctx=new AudioContext(); // 330Hzを2回鳴らす"),
];
