# JavaScript Kit Utils

```
npm install @alshdavid/kit
```

```typescript
import { sha256 } from '@alshdavid/kit/crypto'

void (async function main() {
  const foo = await sha256('foo')
})()
```

From the browser

```javascript
const kit = await import(
  'https://cdn.jsdelivr.net/npm/@alshdavid/kit@latest/browser/esm/index.js'
)

await kit.localStorage.setItem('foo', 'bar')
kit.log(await alshx.localStorage.getItem('foo'))

// Also automatically added to globalThis
await alshx.localStorage.setItem('foo', 'bar')
console.log(await alshx.localStorage.getItem('foo'))
```

```html
<script type="importmap">
{
  "imports": {
    "@alshx/kit/": "https://cdn.jsdelivr.net/npm/@alshdavid/kit@latest/browser/esm/"
  }
}
</script>

<script type="module">
  import * as preact from '@alshx/kit/preact.js'
  console.log(preact)
</script>

<script type="module">
  import * as kit from '@alshx/kit/index.js'
  console.log(kit)
</script>
```