var { S3Client } = require('@aws-sdk/client-s3')
var client = null
var config = require('./config').Config

/**
* Create an S3 client, for a specific bucket.
*
* @param string bucket S3 bucket to connect to.
*/
exports.s3 = function (_region) {
  var region = _region || config.get('awsRegion')

  if (client) {
    return client
  } else {
    client = new S3Client({ region: region })
  }

  return client
}
