const Crawler = require('simplecrawler');
const iconv = require('iconv-lite');
const async = require('async');
const md5 = require('md5');
const Log = require('log');
const fs = require('fs');
const pmZh = require('./pokemon-zh.js');

const pms = [];

function _assembleUrl(pageIndex) {
  return '/api/v2/pokemon-form/' + pageIndex;
}

function initCrawler(pageIndex, span) {
  let crawler = new Crawler('pokeapi.co', _assembleUrl(pageIndex, span));
  let result = {};

  crawler.maxDepth = 1;
  crawler.interval = 700;

  crawler.on('fetchcomplete', function(queueItem, responseBody, responseObj) {
    result = JSON.parse(iconv.decode(responseBody, 'utf8'));
    pms.push({
      id: result.id,
      name: result.name,
      imgs: result.sprites,
      name_zh: pmZh[result.id - 1]
    });
  });

  crawler.on('complete', function() {
    if(pageIndex < span) {
      pageIndex++;
      initCrawler(pageIndex, span);
    }
    else {
      fs.writeFileSync('./pokemon.json', JSON.stringify(pms));
      return ;
    }
  });

  crawler.start();
}

function main() {
  initCrawler(1, 151);
}

main();
