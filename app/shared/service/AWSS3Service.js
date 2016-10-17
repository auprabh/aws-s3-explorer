angular.module('myApp')
.service('AWSS3Service', ['$q', function($q){
  console.log('inside AWSS3Service');
  var s3Config = {
    region: 'us-east-1',
    accessKeyId: 'replace with yours',
    secretAccessKey: 'replace with yours',
    bucketName: 'replace with yours',
    maxRetries: 15,
    partSize: 10 * 1024 * 1024,
    queueSize: 1,
    ACL: 'bucket-owner-full-control'
  }
  AWS.config.region = s3Config.region;
  AWS.config.update({accessKeyId: s3Config.accessKeyId, secretAccessKey: s3Config.secretAccessKey});
  var bucket = new AWS.S3({region: s3Config.region, maxRetries: s3Config.maxRetries, params: {Bucket: s3Config.bucketName}});
  this.listItems = function(){
    var deferred = $q.defer();
    bucket.listObjects(function (err, data) {
      if (err) {
        console.log('error: ', err);
        deferred.reject(err);
      } else {
        console.log('data: ', data);
        deferred.resolve(data);
      }
    });
    return deferred.promise;
  }
  this.getUrl = function(key){
    var deferred = $q.defer();
    var params = {Bucket: s3Config.bucketName, Key: key};
    bucket.getSignedUrl('getObject', params, function (err, url) {
      if(err){
        console.log('error: ', err);
        deferred.reject(err);
      }else{
        console.log('url: ', url);
        deferred.resolve(url);
      }
    });
    return deferred.promise;
  }
  this.progress = 0;
  this.uploadItem = function (file) {
    var deferred = $q.defer();
    var params = { Bucket: s3Config.bucketName, Key: file.name, ContentType: file.type, Body: file };
    var options = {
        partSize: s3Config.partSize,
        queueSize: s3Config.queueSize,
        ACL: s3Config.ACL
    };
    var uploader = bucket.upload(params, options, function (err, data) {
      if (err) {
        deferred.reject(err);
      }
      deferred.resolve();
    });
    uploader.on('httpUploadProgress', function (event) {
      deferred.notify(event);
    });
    return deferred.promise;
  };
}])
