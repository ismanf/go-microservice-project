var dnode = require('dnode');
var uuid = require('uuid/v1')

var d = dnode.connect(3001);

let _schema = {
    id: uuid(),
    title: 'Hellooo worldsdjwwjfs1',
    content: 'Whats going on111....',
    author: 'kogdfgdf dfgdfgdfg111',
    news_type: 'lolo11',
    tags: 'dfgdfg11'
}

d.on('remote', function (remote) {
    remote.addNews(JSON.stringify(_schema), function (s) {
        console.log(s)
        d.end();
    });
});