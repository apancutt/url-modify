# `url-modify`

Modify URL instances cleanly and safely. Works in any environment that supports the URL API.

## Installation

```bash
yarn add url-modify
# Or if you are using NPM:
# npm install --save url-modify
```

## Usage

```typescript
urlModify(modifications: UrlModifyModifications, base: string | URL, options?: UrlModifyOptions): URL
```

### `UrlModifyModifications`

```typescript
{
  hash?: string;
  host?: string;
  password?: string;
  path?: string;
  port?: string;
  protocol?: string;
  search?: string | string[][] | Record<string, string> | URLSearchParams;
  username?: string;
}
```

### `UrlModifyOptions`

```typescript
{
  pathBehavior?: 'append' | 'prepend' | 'replace';
  searchBehavior?: 'append' | 'clear' | 'replace';
}
```

#### `pathBehavior`

* `append`

  Appends `modifications.path` to the base URL path. Note that the base URL path is not tampered with; it may or may not end in a trailing slash depending how you provided it.

* `prepend`

  Prepend `modifications.path` to the base URL path. Note that the leading slash from the base URL path is removed, so you may need to ensure `modifications.path` ends with a slash.

* `replace` _(default)_

  Replace the base URL path with `modifications.path`.

#### `searchBehavior`

* `append`

  If a search key provided in `modifications.search` already exists in the base URL then retain it and append the values provided in `modifications.search` to the search string.

* `clear`

  Clear all search params provided in the base URL before appending the values provided in `modifications.search` to the search string.

* `replace` _(default)_

    If a search key provided in `modifications.search` already exists in the base URL then remove it before appending the values provided in `modifications.search` to the search string.

## Examples

```typescript
import { urlModify } from 'url-modify';
// Or if you are using CommonJS:
// const { urlModify } = require('url-modify');

const base = new URL('https://foo.example?foo=bar');

console.log(urlModify({ protocol: 'wss' }, base).toString())
// "wss://foo.example/?foo=bar"

console.log(urlModify({ search: { foo: 'bar2' } }, base).toString())
// "https://foo.example/?foo=bar2"

console.log(urlModify({ search: { foo: 'bar2' } }, base, { searchBehavior: 'append' }).toString())
// "https://foo.example/?foo=bar&foo=bar2"

console.log(urlModify({ search: [ [ 'foo', 'bar2' ], [ 'foo', 'bar3' ] ] }, base, { searchBehavior: 'append' }).toString())
// "https://foo.example/?foo=bar&foo=bar2&foo=bar3"

console.log(urlModify({ search: [ [ 'foo', 'bar2' ], [ 'foo', 'bar3' ] ] }, base, { searchBehavior: 'replace' }).toString())
// "https://foo.example/?foo=bar2&foo=bar3"

console.log(urlModify({ search: { abc: '123' } }, base).toString())
// "https://foo.example/?foo=bar&abc=123"

console.log(urlModify({ search: { abc: '123' } }, base, { searchBehavior: 'clear' }).toString())
// "https://foo.example/?abc=123"
```

## Rationale

While the URL API simplies creating URL strings, it's difficult to cleanly mutate URL instances
without creating excessive variables and/or risk modifying the original URL instance.

Until the spec allows you to do something like...

```typescript
const base = new URL('http://foo.example');
new URL({ protocol: 'https' }, base);
```

...or...

```typescript
const base = new URL('http://foo.example');
new URL({ ...base, protocol: 'https' });
```

...then this package is a helpful workaround.
