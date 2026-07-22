# 高坂先生の文字起こしカメラ

📷 スマホで写真を撮るだけで、写っている文字を丸ごと読み取るPWAです。

▶️ **今すぐ試す**：https://tomonori2.github.io/moji-camera/

（インストール不要。ブラウザで開くだけ。無料のGemini APIキーを自分で用意して使います）

## できること

- 📷 写真から文字を読み取る（複数ページOK）
- ✨ 読みやすく整える／💫 要約する
- 🧾 レシート・💳 名刺・🪪 免許証・📅 案内・📋 日報・🗒 議事録など、決まった書式に自動で当てはめる
- 🖨 結果を印刷
- 📱 ホーム画面に追加してアプリのように使える（PWA）

## 使い方

1. 上のリンクを開く
2. 初回は [Google AI Studio](https://aistudio.google.com/app/apikey) で無料のGemini APIキーを発行し、画面の案内に従って登録（アプリ内にガイドがあります）
3. 「📷 写真をとる」または「🖼 画像を選ぶ」で文字を撮影
4. 「🔍 まとめて読み取る」を押すと文字起こし完了
5. 必要に応じて整形・要約・書式当てはめ・印刷

## 技術構成

- サーバー無し・ビルド無し。`index.html` 1枚 + `sw.js` + `manifest.json` のみ
- OCR・整形・要約はすべて [Gemini API](https://ai.google.dev/) をブラウザから直接呼び出し
- APIキーはブラウザの `localStorage` にのみ保存（外部送信なし）
- 使えるモデルを自動で探して切り替える仕組みを実装（詳しくは [Zenn記事](https://zenn.dev/tomonori2/articles/e4be35b203cac2) で解説）

## フィードバック

使ってみた感想・不具合・要望は [Issues](https://github.com/Tomonori2/moji-camera/issues) までお願いします。
