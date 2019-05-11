const fs = require('fs'),
      dir = require('node-dir'),
      nfp = require('node-file-parser');

const file = nfp.link('./data/srt/diners.drive-ins.and.dives.(2006).tv.s02.eng.14cd/episode 1/diners.drive.ins.and.dives.s02e01.totally.fried.hdtv.x264-w4f-NH.srt');
const content = file.read().getContent();

const quoteObject = {
  quotes: []
};

Object.keys(content).forEach(function (key) {
  let quote = content[key].content;
  quoteObject.quotes.push(quote);
});

fs.writeFileSync('./test.js', JSON.stringify(quoteObject));
