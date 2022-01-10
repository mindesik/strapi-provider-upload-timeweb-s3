# Strapi Upload Provider for Timeweb S3

This provider will upload to the space using the Timeweb S3 API.

## Parameters
- **key** : [Access key](https://timeweb.com/ru/help/pages/viewpage.action?pageId=58065721#id-ОписаниепринциповработысS3-Реквизитыподключения).
- **secret** : [Access secret](https://timeweb.com/ru/help/pages/viewpage.action?pageId=58065721#id-ОписаниепринциповработысS3-Реквизитыподключения).
- **endpoint** : Base URL (default 's3.timeweb.com').
- **region** : Region of the bucket.
- **bucket** : Name of the bucket.
- **directory** : Name of the sub-directory you want to store your files in. (Optionnal - e.g. '/example').
- **domain** : Custom domain - (Not yet implemented by Timeweb - default is 'https://s3.timeweb.com').

## How to use

1. Install this package

```
npm i strapi-provider-upload-timeweb-s3
```

2. Create config in `./extensions/upload/config/settings.js` with content

```
module.exports = {
  provider: 'timeweb-s3',
  providerOptions: {
    key: process.env.TWS3_ACCESS_KEY,
    secret: process.env.TWS3_SECRET_KEY,
    endpoint: process.env.TWS3_ENDPOINT,
    region: process.env.TWS3_REGION,
    bucket: process.env.TWS3_BUCKET,
    directory: process.env.TWS3_DIRECTORY,
    domain: process.env.TWS3_DOMAIN,
  }
}
```

3. Create `.env` and add to them 

```
TWS3_ACCESS_KEY
TWS3_SECRET_KEY
TWS3_ENDPOINT
TWS3_REGION
TWS3_BUCKET
TWS3_DIRECTORY
TWS3_DOMAIN
```

## Resources

- [MIT License](LICENSE.md)

## Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)
- [Strapi docs about upload](https://strapi.io/documentation/3.0.0-beta.x/plugins/upload.html#configuration)
