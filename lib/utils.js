var knox = require('knox')
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

  // Knox wants 'us-standard' instead of 'us-east-1'.
  // if (region === 'us-east-1') region = 'us-standard'

  // cache the most recently used client.
  // if (client && bucket === client.bucket && region === client.region) {
    // return client
  // } else {
    // client = knox.createClient({
      // bucket: bucket,
      // region: region
    // })
  // }
  if (client) {
    return client
  } else {
    client = new S3Client({ region: region })
  }

  return client
}
