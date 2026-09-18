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

// コピーボタンのクリックイベント
copyButton.addEventListener("click", () => {
  let copiedText = "";

  // textOutput の中身（テキストノードやspan要素）を順番に走査
  textOutput.childNodes.forEach((node) => {
    // nodeType === 3 は純粋なテキストノード（ハイライトされていない部分）
    if (node.nodeType === Node.TEXT_NODE) {
      copiedText += node.textContent;
    } 
    // span要素（.highlight）の場合
    else if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains("highlight")) {
      
      // 【ここがポイント】disabledが付いて「いない」ものはマスクする
      if (!node.classList.contains("disabled")) {
        // マスクした文字列に置き換える（例: [MASK] や ***）
        copiedText += " [MASK] "; 
      } else {
        // disabledが付いているものは、元の電話番号のまま
        copiedText += node.textContent;
      }
    }
  });

  // クリップボードにコピー
  navigator.clipboard.writeText(copiedText).then(() => {
    alert("コピーしました！");
  });
});
