export function createWebsocket(url, callback) {
  const ws = new WebSocket(url);

  console.log('创建连接')

  ws.onopen = function(e) {
    console.log('WebSocket is open now.');
    console.log('open回包', e)
    ws.send('fetch conn_id');
  }

  ws.onmessage = function(e) {
    callback(e);
  };

  ws.onerror = function() {
    console.warn('Websocket is error');
  };

  ws.onclose = function() {
    console.log('Websocket is closed');
  }
  return ws;
}