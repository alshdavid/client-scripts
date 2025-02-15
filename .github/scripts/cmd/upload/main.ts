import { S3Client } from '@aws-sdk/client-s3'
import { CloudFrontClient } from '@aws-sdk/client-cloudfront'
import * as crypto from 'node:crypto'
import * as fs from 'node:fs'
import * as Remote from './platform/bucket/index.ts'
import * as CloudFront from './platform/cloudfront/index.ts'
import { Directories } from '../../platform/directores.ts'

const DRY = process.env.DRY ? process.env.DRY === 'true' : false

const CACHE_CONTROL = 'max-age=86400, public'

const DISTRIBUTION = process.env.AWS_CLOUDFRONT_DISTRIBUTION || 'E2QHY39OWRUCEU'

const BUCKET = process.env.AWS_S3_BUCKET || 'alshdavid-web-com-davidalsh-cdn'
const BUCKET_BASE_PATH = process.env.BUCKET_BASE_PATH || 'scripts'
const TARGET_NAME = process.env.BUCKET_BASE_PATH || 'kit.js'
const TARGET_PATH = `${BUCKET_BASE_PATH}/${TARGET_NAME}`

void (async function main() {
  // const cloudfront = new CloudFront.Cloudfront({
  //   Client: new CloudFrontClient({ region: 'ap-southeast-2' }),
  //   Distribution: DISTRIBUTION,
  //   Dry: DRY
  // })
  // const bucket = new Remote.BucketService({
  //   Client: new S3Client({ region: 'ap-southeast-2' }),
  //   Bucket: BUCKET,
  //   Dry: DRY
  // })
  // const remoteFileHash: string | undefined = (
  //   await bucket.getFileList({ Prefix: TARGET_PATH })
  // )[TARGET_PATH]
  // const fileBuffer = fs.readFileSync(Directories['~/release/umd/index.js'])
  // const localFileHash = crypto
  //   .createHash('md5')
  //   .update(fileBuffer)
  //   .digest('hex')
  // if (localFileHash === remoteFileHash) {
  //   console.log('No change, skipping')
  //   return
  // }
  // console.log('Uploading')
  // await bucket.putFile({
  //   filepath: Directories['~/release/umd/index.js'],
  //   keypath: TARGET_PATH,
  //   cacheControl: CACHE_CONTROL
  // })
  // console.log('Invalidating')
  // await cloudfront.invalidate({
  //   patterns: [`/${TARGET_PATH}`]
  // })
  // console.log('Done')
})()
