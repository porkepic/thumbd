var _ = require('lodash')
var { PutObjectCommand } = require('@aws-sdk/client-s3')
var utils = require('./utils')
var url = require('url')
var config = require('./config').Config

/**
 * Initialize the Saver
 *
 * @param object s3 The S3 client
 */
function Saver () {
  this.logger = require(config.get('logger'))
}

/**
 * Save the (local or remote file) to disk
 *
 * @param string source The local file path, or remote file uri
 * @param string destination The local file path
 * @param function callback The callback function. Optional
 */
Saver.prototype.save = function (bucket, region, source, destination, metadata, callback) {
  var _this = this

  if (typeof callback === 'undefined') {
    callback = function () {}
  }

  if (destination.match(/https?:\/\//)) {
    destination = this.destinationFromURL(destination)
  }

  var client = utils.s3(region)
  client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: destination,
    Body: source,
    ACL: config.get('s3Acl'),
    StorageClass: config.get('s3StorageClass')
  })).then((resp) => {
    _this.logger.info('saved ' + source + ' to ' + destination)
    callback()
  }).catch((err) => {
    callback(err)
  })
}

/**
 * Get a file path from a URL
 *
 * @param string destination The destination url. e.g. http://example.com/foo/test.jpg
 *
 * @return string The file path. E.g. example.com/foo/test.jpg
 */
Saver.prototype.destinationFromURL = function (destination) {
  var parsedURL = url.parse(destination)
  return parsedURL.hostname + parsedURL.path
}

exports.Saver = Saver
