
```javascript
import { SyncService } from '@alshdavid/kit/node/aws/sync.js'
import { BucketService } from '@alshdavid/kit/node/aws/bucket/index.js'
import { Cloudfront } from '@alshdavid/kit/node/aws/cloudfront/index.js'
import { CacheControl, CacheControlType } from '@alshdavid/kit/node/aws/cache-control/index.js'

async function main() {
  // Rules are in order
  /** @type {Array<require('@alshdavid/kit/node/aws/cache-control/index.js').CacheControlRule>} */
  const CacheControlRules = [
    {
      regex: '^(\/)(.*)(index\.(css|js|html))$',
      cacheControl: CacheControlType.NoCache
    },
    {
      regex: new RegExp('^(\/)(.*)(\.css|js|html)$'),
      cacheControl: CacheControlType.Immutable
    },
  ]

  const LOCAL_STATIC_FILES = '/home/username/path/to/static/dist'
  const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || 's3-bucket-name'
  const CF_DISTRIBUTION = process.env.CF_DISTRIBUTION || 'OKIE4309234'

  // Init all the things
  const bucketService = new BucketService({ Bucket: S3_BUCKET_NAME })
  const cloudFrontService = new Cloudfront({ Distribution: CF_DISTRIBUTION })
  const cacheControl = new CacheControl({ rules: CacheControlRules })
  const sync = new SyncService({ bucketService, cloudFrontService, cacheControl })

  // You can add multiple folders
  await sync.addLocalFolder(LOCAL_STATIC_FILES)

  // Upload the files to S3 applying the correct mime types and cache control rules
  // This will add/update files and delete removed files
  for await (const { action, key } of sync.commit()) {
    console.log(action, key)
  }

  // Invalidate the updated files in cloudfront
  await sync.invalidate()

  // print out a summary of what happened
  console.log(sync.getSummary())
}

main()
```