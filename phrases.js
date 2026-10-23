// ===== フレーズ・ホ・オポノポノ・会話場面・ガイドの言葉 =====
// ここに { } を足すだけで画面に表示されます。
const PHRASES = [
 {en:"I am grateful.",ja:"私は感謝しています。",pron:"アイ アム グレイトフル",note:"感謝を伝える基本の一言。"},
 {en:"I choose peace.",ja:"私は平和を選びます。",pron:"アイ チューズ ピース",note:"chooseは「選ぶ」。"},
 {en:"I trust myself.",ja:"私は自分を信頼します。",pron:"アイ トラスト マイセルフ",note:"myselfは「私自身」。"},
 {en:"I am here now.",ja:"私は今ここにいます。",pron:"アイ アム ヒア ナウ",note:"今この瞬間に戻る言葉。"},
 {en:"I let go.",ja:"私は手放します。",pron:"アイ レット ゴー",note:"let goは「手放す」。"},
 {en:"I feel peaceful.",ja:"心が穏やかです。",pron:"アイ フィール ピースフル",note:"feel＋形容詞で気持ちを言えます。"},
 {en:"I am calm.",ja:"私は落ち着いています。",pron:"アイ アム カーム",note:"短くて使いやすい文。"},
 {en:"I am safe.",ja:"私は安全です。",pron:"アイ アム セイフ",note:"不安なときの一言。"},
 {en:"I breathe slowly.",ja:"私はゆっくり呼吸します。",pron:"アイ ブリーズ スロウリー",note:"breatheは「ブリーズ」と伸ばします。"},
 {en:"I love myself.",ja:"私は自分を愛しています。",pron:"アイ ラヴ マイセルフ",note:"自分への肯定の言葉。"},
 {en:"I am enough.",ja:"私はそのままで十分です。",pron:"アイ アム イナフ",note:"enoughは「十分な」。"},
 {en:"I allow joy.",ja:"私は喜びを受け入れます。",pron:"アイ アロウ ジョイ",note:"allowは「許す、受け入れる」。"},
 {en:"I am open.",ja:"私は心を開いています。",pron:"アイ アム オープン",note:"新しいことを受け入れる姿勢。"},
 {en:"I release fear.",ja:"私は恐れを手放します。",pron:"アイ リリース フィア",note:"fearは「恐れ」。"},
 {en:"I am free.",ja:"私は自由です。",pron:"アイ アム フリー",note:"最も短い肯定文のひとつ。"}
];
const HOOPONO = [
 {en:"I'm sorry.",ja:"ごめんなさい。",pron:"アイム ソーリー",note:"相手や自分への思いやりを込めて。"},
 {en:"Please forgive me.",ja:"どうか許してください。",pron:"プリーズ フォギヴ ミー",note:"forgiveは「許す」。"},
 {en:"Thank you.",ja:"ありがとう。",pron:"サンキュー",note:"thは舌先を軽く歯に当てます。"},
 {en:"I love you.",ja:"愛しています。",pron:"アイ ラヴ ユー",note:"自分自身に向けて言ってもよい言葉です。"}
];
// 最初の一言（会話場面）
const SCENES = [
 {title:"あいさつ",items:[{en:"Hello.",ja:"こんにちは。"},{en:"Nice to meet you.",ja:"はじめまして。"},{en:"How are you?",ja:"お元気ですか？"}]},
 {title:"今の気持ち",items:[{en:"I feel peaceful.",ja:"心が穏やかです。"},{en:"I am grateful.",ja:"感謝しています。"},{en:"I feel a little nervous.",ja:"少し緊張しています。"}]},
 {title:"英語を学びたい",items:[{en:"I want to learn English.",ja:"英語を学びたいです。"},{en:"I am a beginner.",ja:"私は初心者です。"}]},
 {title:"聞き取れないとき",items:[{en:"I don't understand yet.",ja:"まだ理解できません。"},{en:"Could you say that again?",ja:"もう一度言ってもらえますか？"},{en:"Slowly, please.",ja:"ゆっくりお願いします。"}]},
 {title:"質問する",items:[{en:"What does this mean?",ja:"これはどういう意味ですか？"},{en:"Can you give me an example?",ja:"例を教えてもらえますか？"}]},
 {title:"好きな言葉について",items:[{en:"I like this word.",ja:"この言葉が好きです。"},{en:"This word makes me feel calm.",ja:"この言葉で落ち着きます。"}]},
 {title:"ありがとうを伝える",items:[{en:"Thank you.",ja:"ありがとう。"},{en:"Thank you for your help.",ja:"助けてくれてありがとう。"}]},
 {title:"考える時間がほしい",items:[{en:"Let me think.",ja:"考えさせてください。"},{en:"Just a moment, please.",ja:"少し待ってください。"}]},
 {title:"同意する・うなずく",items:[{en:"I see.",ja:"なるほど。"},{en:"That makes sense.",ja:"それは納得です。"}]},
 {title:"おわりのあいさつ",items:[{en:"See you soon.",ja:"またね。"},{en:"Take care.",ja:"お大事に・気をつけて。"}]}
];
// ガイドの言葉（学習用オリジナル英文。本人の発言ではありません）
const GUIDES = {
 "Bashar（ワクワクと一致）":[
  {en:"Follow your excitement today.",ja:"今日はワクワクに従いましょう。"},
  {en:"You are supported.",ja:"あなたは支えられています。"},
  {en:"Trust the timing of your life.",ja:"人生のタイミングを信頼しましょう。"},
  {en:"Choose what feels true.",ja:"しっくりくるものを選びましょう。"}],
 "Eckhart Tolle（今ここ）":[
  {en:"Be here now.",ja:"今ここにいましょう。"},
  {en:"Watch your thoughts gently.",ja:"考えをやさしく眺めましょう。"},
  {en:"Peace is already inside you.",ja:"安らぎはすでにあなたの中にあります。"},
  {en:"Feel your breath.",ja:"呼吸を感じましょう。"}],
 "Abraham Hicks（心地よさと喜び）":[
  {en:"Feel good first.",ja:"まず心地よさを大切にしましょう。"},
  {en:"Look for something to appreciate.",ja:"感謝できることを探しましょう。"},
  {en:"You can relax and allow.",ja:"力を抜いて受け入れて大丈夫です。"},
  {en:"Be kind to yourself.",ja:"自分にやさしくしましょう。"}]
};
