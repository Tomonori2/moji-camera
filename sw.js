// 高坂先生の文字起こしカメラ – サービスワーカー（スマホアプリ化用）
const CACHE = 'moji-camera-v3';
const SHELL = ['./', 'index.html', 'manifest.json', 'icon.png', 'robot.png'];

// インストール時：画面の部品をキャッシュ
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {}))
  );
});

// 古いキャッシュを掃除
self.addEventListener('activate', (e) => {
  self.clients.claim();
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
});

// GET以外（GeminiへのPOSTなど）と外部APIは素通し。画面部品だけオフライン対応
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) {
    return; // GeminiのAPI通信などはそのままネットへ
  }
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
