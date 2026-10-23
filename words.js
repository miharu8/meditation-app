// ===== 英単語データ：この一覧に { } を足すだけで単語が増えます =====
// en=英単語 ja=意味 pron=読み方 ex=英文例 exJa=日本語訳 note=補足
const WORDS = [
 {en:"love",ja:"愛",pron:"ラヴ",ex:"I feel love.",exJa:"私は愛を感じます。",note:"「愛する」という動詞にもなります。"},
 {en:"peace",ja:"平和、心の安らぎ",pron:"ピース",ex:"I choose peace.",exJa:"私は平和を選びます。",note:"形容詞はpeaceful（穏やかな）。"},
 {en:"joy",ja:"喜び",pron:"ジョイ",ex:"I feel joy.",exJa:"私は喜びを感じます。",note:"happyより深い喜びのイメージ。"},
 {en:"trust",ja:"信頼",pron:"トラスト",ex:"I trust myself.",exJa:"私は自分を信頼します。",note:"動詞でも名詞でも使えます。"},
 {en:"gratitude",ja:"感謝",pron:"グラティテュード",ex:"I feel gratitude.",exJa:"私は感謝を感じます。",note:"形容詞はgrateful。"},
 {en:"release",ja:"手放すこと",pron:"リリース",ex:"I release fear.",exJa:"私は恐れを手放します。",note:"let goとほぼ同じ意味です。"},
 {en:"awareness",ja:"気づき",pron:"アウェアネス",ex:"I have awareness.",exJa:"私は気づきを持っています。",note:"aware（気づいている）の名詞形。"},
 {en:"presence",ja:"今ここにいること",pron:"プレゼンス",ex:"I feel presence.",exJa:"私は今ここにいる感覚があります。",note:"「存在」という意味もあります。"},
 {en:"acceptance",ja:"受け入れること",pron:"アクセプタンス",ex:"I choose acceptance.",exJa:"私は受け入れることを選びます。",note:"acceptは「受け入れる」。"},
 {en:"forgiveness",ja:"許し",pron:"フォギヴネス",ex:"I choose forgiveness.",exJa:"私は許しを選びます。",note:"forgiveは「許す」。"},
 {en:"calm",ja:"落ち着いた",pron:"カーム",ex:"I am calm.",exJa:"私は落ち着いています。",note:"lは発音しません。"},
 {en:"heart",ja:"心、胸",pron:"ハート",ex:"I open my heart.",exJa:"私は心を開きます。",note:"気持ちの中心という意味でよく使います。"},
 {en:"breath",ja:"呼吸、息",pron:"ブレス",ex:"I follow my breath.",exJa:"私は呼吸に意識を向けます。",note:"動詞breatheは「ブリーズ」。"},
 {en:"light",ja:"光",pron:"ライト",ex:"I am light.",exJa:"私は光です。",note:"「軽い」という意味もあります。"},
 {en:"now",ja:"今",pron:"ナウ",ex:"I am here now.",exJa:"私は今ここにいます。",note:"the nowで「今この瞬間」。"},
 {en:"free",ja:"自由な",pron:"フリー",ex:"I am free.",exJa:"私は自由です。",note:"「無料の」という意味もあります。"},
 {en:"kind",ja:"やさしい",pron:"カインド",ex:"I am kind to myself.",exJa:"私は自分にやさしくします。",note:"be kind to ~で「~にやさしくする」。"},
 {en:"safe",ja:"安全な",pron:"セイフ",ex:"I am safe.",exJa:"私は安全です。",note:"安心したいときの一言です。"},
 {en:"grow",ja:"成長する",pron:"グロウ",ex:"I grow every day.",exJa:"私は毎日成長します。",note:"everyday=毎日の（形容詞）、every day=毎日（副詞的）。"},
 {en:"believe",ja:"信じる",pron:"ビリーヴ",ex:"I believe in myself.",exJa:"私は自分を信じます。",note:"believe in ~で「~の存在や力を信じる」。"}
];
