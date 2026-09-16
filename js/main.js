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
