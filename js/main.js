// 電話番号を検出する関数
function detectPhoneNumbers(text) {
  const regex = /\d{2,4}-\d{2,4}-\d{4}/g;
  return text.match(regex) || []; // マッチしない場合は空配列を返す
}

// 動作確認用
const sampleText = "お問い合わせは 03-1234-5678 または 090-8765-4321 まで。";
const result = detectPhoneNumbers(sampleText);
console.log(result); // 出力: ['03-1234-5678', '090-8765-4321']
