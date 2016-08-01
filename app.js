var http = require( 'http' ); // HTTPモジュール読み込み
var socketio = require( 'socket.io' ); // Socket.IOモジュール読み込み
var fs = require( 'fs' ); // ファイル入出力モジュール読み込み

// 3001番ポートでHTTPサーバーを立てる
var server = http.createServer( function( req, res ) {
    res.writeHead(200, { 'Content-Type' : 'text/html' }); // ヘッダ出力
    res.end( fs.readFileSync('./index.html', 'utf-8') );  // index.htmlの内容を出力
}).listen(process.env.PORT || 3001);

// サーバーをソケットに紐付ける
var io = socketio.listen( server );

// 接続確立後の通信処理部分を定義
io.sockets.on( 'connection', function( socket ) {

    // クライアントからサーバーへ メッセージ送信ハンドラ（自分を含む全員宛に送る）
    socket.on( 'pointInput', function( data ) {
        // サーバーからクライアントへ メッセージを送り返し
        io.sockets.emit( 'point', { x : data.x, y : data.y} );
    });
});
