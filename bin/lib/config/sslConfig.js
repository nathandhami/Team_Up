'use strict';

const fs = require('fs');
const path = require('path');
const nconf = require('./nconfConfig');

const rootPath = nconf.get('root:path');
const publicKeyPath = path.join(rootPath, 'bin', 'lib', 'ssl', 'cert.pem');
const privateKeyPath = path.join(rootPath, 'bin', 'lib', 'ssl', 'key.pem');

const httpsOptions = {
  'key': fs.readFileSync(privateKeyPath, 'utf-8'),
  'cert': fs.readFileSync(publicKeyPath, 'utf-8'),
  'passphrase': nconf.get('ssl:passphrase')
};

module.exports = httpsOptions;
