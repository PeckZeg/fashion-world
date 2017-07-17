const transform = require('stream-transform');
const parse = require('csv-parse');
const path = require('path');
const fs = require('fs');

var output = [];
var parser = parse({delimiter: ','})

var input = fs.createReadStream(path.join(__dirname, './csv/20170717.csv'));
var transformer = transform(data => data, { columns: null });

transformer.on('readable', function(){
  while(row = transformer.read()){
    output.push(row);
  }
});

transformer.on('error', function(err){
  console.log(err.message);
});

transformer.on('finish', (...args) => {
  console.log(output.slice(1));
})

input
.pipe(parser)
.pipe(transformer)
// .pipe(process.stdout);
