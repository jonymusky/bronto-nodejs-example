var BrontoClient = require('./src/bronto');
var brontoClient = new BrontoClient({
  wsdlUrl: 'https://api.bronto.com/v4?wsdl',
  token: 'INSERT-YOUR-TOKEN-HERE'
});

brontoClient.readContacts('gmail.com').then(function(result){
  console.log(result);
});
