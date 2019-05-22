var soap = require('soap');

function BrontoClient(config) {
  this.config = config;
}
BrontoClient.prototype.createClient = function(auth) {
  var self = this;
  var options = {
    forceSoap12Headers: false,
    envelopeKey: 'x'
  };
  return new Promise ((resolve, reject) => {
    soap.createClient(self.config.wsdlUrl, options, (err, client) => {
      if (auth) {
        client.login({':apiToken': this.config.token}, (err, result, body) => {
          if(!result.return){
            return reject(err);
          }
          client.addSoapHeader({
            'tns:sessionHeader':
              {'sessionId': result.return}});
          return resolve(client);
        });
      }
    });
  });
};

BrontoClient.prototype.readContacts = function(string) {
  return new Promise ((resolve, reject) => {
     this.createClient(true).then(function(client){
         client.readContacts({
           ':pageNumber':1,
           ':includeLists': false,
           ':filter': {
               email: {
                 operator: 'Contains',
                 value: string,
               }
           }
         }, (err, result, body) => {
           return resolve(result.return);
         });
     });
   });
};

module.exports = BrontoClient;
