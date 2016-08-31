function dateDiff(date_1, date_2) {
  if(typeof date_1 === 'string') {
    date_1 = new Date(date_1);
  }
  if(typeof date_2 === 'string') {
    date_2 = new Date(date_2);
  }

  return (date_2.getTime() - date_1.getTime())/(1000 * 60 * 60 * 24);
}

function queryString() {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
  return query_string;
}

function getFileExt(filename) {
    let tempArr = filename.split('.');
    let ext = '';
    if (tempArr.length == 1 || (tempArr[0] === "" && tempArr.length === 2) )  {
        ext = '';
    }
    else {
        ext = tempArr.pop().toLowerCase();
    }
    return ext;
}

function isImage(filename) {
    const imgSuffixes = ['png', 'jpg', 'jpeg', 'gif', 'bmp'];
    let ext = getFileExt(filename);
    for (var i = 0; i<imgSuffixes.length; i++) {
        if(ext === imgSuffixes[i]) {
            return true;
        }
    }
    return false;
}

/*
 * 返回一个介于[floor, cell)之间的整数
 */
function random(floor, cell) {
  return Math.floor(Math.random() * 10 % (cell-floor)) + floor;
}

function getFullUrl() {
  return window.location.protocol + "//" 
    + window.location.host 
    + "/" 
    + ((window.location.pathname[0] === '/') ? window.location.pathname.substring(1):window.location.pathname)
    + window.location.search
    ;
}

function multiRandom(floor, cell, total, results) {
  if(results.length >= total) {
    return ;
  }

  if(floor >= cell) {
    return ;
  }

  let m = random(floor, cell);

  results.push(m);

  multiRandom(floor, m, total, results);

  multiRandom(m+1, cell, total, results);
}

function CNTimeDiff(dateTime_1, dateTime_2) {
  if(!dateTime_1 || !dateTime_2) {
    return '';
  }

  let start = new Date(dateTime_1);
  let end = new Date(dateTime_2);

  let remain = Math.floor((end.getTime() - start.getTime())/1000);

  if(remain < 60) {
    return remain + '秒前';
  }

  remain = Math.floor(remain / 60);

  if(remain < 60) {
    return remain + '分钟前';
  }

  remain = Math.floor(remain / 60);

  if(remain < 24) {
    return remain + '小时前';
  }

  remain = Math.floor(remain / 24);

  if(remain < 30) {
    return remain + '天前';
  }

  remain = Math.floor(remain / 30);

  if(remain < 12) {
    return remain +  '月前';
  }

  remain = Math.floor(remain / 12);

  return remain + '年前';
}


function _insertQuery(key, value, url) {
  if (!url) url = window.location.href;

  var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
      hash;

  if (re.test(url)) {
      if (typeof value !== 'undefined' && value !== null)
          return url.replace(re, '$1' + key + "=" + value + '$2$3');
      else {
          hash = url.split('#');
          url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
          if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
              url += '#' + hash[1];
          return url;
      }
  }
  else {
      if (typeof value !== 'undefined' && value !== null) {
          var separator = url.indexOf('?') !== -1 ? '&' : '?';
          hash = url.split('#');
          url = hash[0] + separator + key + '=' + value;
          if (typeof hash[1] !== 'undefined' && hash[1] !== null) 
              url += '#' + hash[1];
          return url;
      }
      else
          return url;
  }
}

function updateQueryString(query, url) {
    if (!url) url = window.location.href;

    for(let k in query) {
      url = _insertQuery(k, query[k], url);
    }

    if(window.history.pushState) {
      window.history.replaceState({},'', url);
    }
    else {
      window.location.href = url;
    }
}

function assembleModelUrl(number, height, width) {
  let _fn = padZero(number);
  let _url = `http://ob67eqrez.bkt.clouddn.com/image/model/${_fn}.png`;
  return _url + `?imageView2/2/w/${height}/h/${width}/interlace/1/q/20`;
}

function padZero(number){
  let str ='00'+ number;
  return str.substring(str.length-3,str.length);
}


exports.dateDiff = dateDiff;
exports.queryString = queryString;
exports.getFileExt = getFileExt;
exports.isImage = isImage;
exports.random = random;
exports.multiRandom = multiRandom;
exports.getFullUrl = getFullUrl;
exports.CNTimeDiff = CNTimeDiff;
exports.updateQueryString = updateQueryString;
exports.assembleModelUrl = assembleModelUrl;
