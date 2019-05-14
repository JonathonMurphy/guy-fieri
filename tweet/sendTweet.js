#!/usr/bin/env node
const path = require('path'),
      hashtag = ' #Flavortown',
      fs = require('fs');

const quoteDataPath = path.resolve(__dirname, '../data/quotes/srtQuotes.json');
      postTweetPath = path.resolve(__dirname, '../lib/postTweet.js');

const postTweet = require(postTweetPath);

const quoteData = JSON.parse(fs.readFileSync(quoteDataPath));

function pickTweet () {
  // Sets up variables
  let quoteArray = quoteData.quotes;
  // Selects a quote from the currently selected brother array
  let quotePicker = Math.floor(Math.random()*quoteArray.length);
  let currentQuote = quoteArray[quotePicker] + hashtag;
  // Checks if the quote is valid for twitter
  // Should always return a valid quote
  if (currentQuote !== undefined && (currentQuote + hashtag).length < 280 && currentQuote.length > 30) {
    postTweet(currentQuote);
  } else  {
    pickTweet ();
  }
}

pickTweet();
