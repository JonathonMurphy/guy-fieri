let m;
const fs = require('fs'),
      path = require('path'),
      dir = require('node-dir'),
      nfp = require('node-file-parser'),
      regexTags = /\r?\n|\r|<i>|<\/i>/g,
      regexWhiteSpace = /\s{2,}/g,
      regexFileExt = /srt$/,
      quoteObject = {
              quotes: []
            };
const srtDataPath = path.resolve(__dirname, '../srt/'),
      srtQuotesPath = path.resolve(__dirname, '../quotes/srtQuotes.json');
let files = dir.files(srtDataPath, {sync: true});
for (i=0;i<files.length;i++) {
  if ((m = regexFileExt.test(files[i])) == true) {
    let file = nfp.link(files[i]);
    let content = file.read().getContent();
    Object.keys(content).forEach(function (key) {
      let quote = content[key].content;
      quote = quote.replace(regexTags, '');
      quote = quote.replace(regexWhiteSpace, ' ');
      quoteObject.quotes.push(quote.trim());
    });
  }
}
fs.writeFileSync(srtQuotesPath, JSON.stringify(quoteObject), function (err) {
  if (err) throw err;
  console.log('Wrote a file?');
});
console.log('finished parsing files');
