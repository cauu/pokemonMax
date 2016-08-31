convertExcel = require('excel-as-json').processFile;

convertExcel('../../data/skillDetail.xlsx','./skillDetail.json', false, (err, res) => {
  if(err) {
    console.log('Convert failed!');
  }
  else {
    console.log('Convert success!');
  }
});

