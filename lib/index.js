const S3 = require('aws-sdk/clients/s3')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

class FileLocationConverter {
  static getKey(config, file) {
    return `${config.directory ? `${config.directory}/` : ''}${file.hash}${file.ext}`
  }

  static getUrl(config, data) {
    let url = data.Location
    config.domain = config.domain || 's3.timeweb.com'
    if (config.domain) {
      const domainUrl = new URL(`https://${config.domain}`)
      domainUrl.pathname = data.Key || data.key
      
      url = domainUrl.href
    }
    
    return url
  }
}

module.exports = {
  provider: 'timeweb-s3',
  name: 'Timeweb s3',
  auth: {
    key: {
      label: 'Key',
      type: 'text'
    },
    secret: {
      label: 'Secret',
      type: 'text'
    },
    endpoint: {
      label: 'Endpoint (Optional - e.g. "s3.timeweb.com")',
      type: 'text',
    },
    region: {
      label: 'Region (Optional - e.g. ru-1)',
      type: 'text'
    },
    domain: {
      label: 'Custom domain (Optional - e.g. "s3.timeweb.com")',
      type: 'text',
    },
    bucket: {
      label: 'Bucket (e.g. mybucket)',
      type: 'text',
    },
    directory: {
      label: 'Directory (Optional - e.g. directory - place when you want to save files)',
      type: 'text'
    }
  },
  
  init: config => {
    const s3 = new S3({
      accessKeyId: config.key,
      secretAccessKey: config.secret,
      endpoint: config.endpoint || 'https://s3.timeweb.com',
      s3ForcePathStyle: true,
      region: config.region || 'ru-1',
      apiVersion: 'latest',
    })

    return {
      upload: file => new Promise((resolve, reject) => {
        file.hash = crypto.createHash('md5').update(file.hash).digest('hex')
        
        s3.upload({
          Key: FileLocationConverter.getKey(config, file),
          Body: Buffer.from(file.buffer, 'binary'),
          ContentType: file.mime
        }, (err, data) => {
          if (err) return reject(err)
          file.url = FileLocationConverter.getUrl(config, data)

          resolve()
        })
      }),

      delete: file => new Promise((resolve, reject) => {
        s3.deleteObject({
            Bucket: config.bucket,
            Key: FileLocationConverter.getKey(config, file),
          }, (err, data) => {
            if (err) {
              return reject(err)
            }
            
            resolve()
          })
        }
      )
    }
  }
}
