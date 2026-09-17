// 1. 電話番号を検出して配列で返す関数（Issue #2）
function detectPhoneNumbers(text) {
  const regex = /\d{2,4}-\d{2,4}-\d{4}/g;
  return text.match(regex) || [];
}

// 2. 電話番号部分を span タグでハイライト化する関数（Issue #3）
function highlightPhoneNumbers(text) {
  const regex = /\d{2,4}-\d{2,4}-\d{4}/g;
  return text.replace(regex, '<span class="highlight">$&</span>');
}

// 3. 画面連携（イベント処理）
const textInput = document.getElementById("textInput");
const textOutput = document.getElementById("textOutput");
const maskButton = document.getElementById("maskButton");
const copyButton = document.getElementById("copyButton");

maskButton.addEventListener("click", function () {
  const inputText = textInput.value;
  const highlightedHtml = highlightPhoneNumbers(inputText);
  textOutput.innerHTML = highlightedHtml;
});

textOutput.addEventListener("click", (event) => {
  if (event.target.classList.contains("highlight")) {
    event.target.classList.toggle("disabled");
  }
});

// コピー機能の実装（Issue #5）
copyButton.addEventListener("click", () => {
  // innerText で改行を含めたプレーンテキストを取得
  const text = textOutput.innerText;

  // クリップボードへ書き込み（非同期処理の完了後にフィードバック）
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("コピーしました！");
    })
    .catch((err) => {
      console.error("コピーに失敗しました:", err);
    });
});
