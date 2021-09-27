import { urlModify } from '../src/urlModify';

it('creates a copy of the given base URL', () => {
  const base = new URL('https://foo.example');
  const url = urlModify({}, base);
  expect(base).not.toBe(url);
  expect(base.toString()).toEqual(url.toString());
});

it('creates a modified copy of the given base URL', () => {
  const base = new URL('https://some-username:some-password@foo.example/some-path?a=A&b=B1&b=B2#some-hash');
  const url = urlModify({
    hash: 'new-hash',
    host: 'new-host',
    password: 'new-password',
    path: 'new-path',
    port: 'new-port',
    protocol: 'new-protocol',
    search: 'c=C',
    username: 'new-username',
  }, base);
  expect(url.toString()).toEqual('https://new-username:new-password@new-host/new-path?a=A&b=B1&b=B2&c=C#new-hash');
});

it('appends to the path of the given base URL', () => {
  const base = new URL('https://some-username:some-password@foo.example/some-path?a=A&b=B1&b=B2#some-hash');
  const url = urlModify({ path: 'new-path' }, base, { pathBehavior: 'append' });
  expect(url.toString()).toEqual('https://some-username:some-password@foo.example/some-pathnew-path?a=A&b=B1&b=B2#some-hash');
});

it('prepends to the path of the given base URL', () => {
  const base = new URL('https://some-username:some-password@foo.example/some-path?a=A&b=B1&b=B2#some-hash');
  const url = urlModify({ path: 'new-path' }, base, { pathBehavior: 'prepend' });
  expect(url.toString()).toEqual('https://some-username:some-password@foo.example/new-pathsome-path?a=A&b=B1&b=B2#some-hash');
});

it('appends to the search params of the given base URL', () => {
  const base = new URL('https://some-username:some-password@foo.example/some-path?a=A&b=B1&b=B2#some-hash');
  const url = urlModify({ search: 'a=A2' }, base, { searchBehavior: 'append' });
  expect(url.toString()).toEqual('https://some-username:some-password@foo.example/some-path?a=A&b=B1&b=B2&a=A2#some-hash');
});

it('clears the search params of the given base URL', () => {
  const base = new URL('https://some-username:some-password@foo.example/some-path?a=A&b=B1&b=B2#some-hash');
  const url = urlModify({ search: 'a=A2' }, base, { searchBehavior: 'clear' });
  expect(url.toString()).toEqual('https://some-username:some-password@foo.example/some-path?a=A2#some-hash');
});

it('replaces multiple search values via a string to the search params of the given base URL', () => {
  const base = new URL('https://some-username:some-password@foo.example/some-path?a=A&b=B1&b=B2#some-hash');
  const url = urlModify({ search: 'a=A2&a=A3'}, base);
  expect(url.toString()).toEqual('https://some-username:some-password@foo.example/some-path?b=B1&b=B2&a=A2&a=A3#some-hash');
});

it('appends multiple search values via a string to the search params of the given base URL', () => {
  const base = new URL('https://some-username:some-password@foo.example/some-path?a=A&b=B1&b=B2#some-hash');
  const url = urlModify({ search: 'a=A2&a=A3' }, base, { searchBehavior: 'append' });
  expect(url.toString()).toEqual('https://some-username:some-password@foo.example/some-path?a=A&b=B1&b=B2&a=A2&a=A3#some-hash');
});

it('clears multiple search values via a string to the search params of the given base URL', () => {
  const base = new URL('https://some-username:some-password@foo.example/some-path?a=A&b=B1&b=B2#some-hash');
  const url = urlModify({ search: 'a=A2&a=A3' }, base, { searchBehavior: 'clear' });
  expect(url.toString()).toEqual('https://some-username:some-password@foo.example/some-path?a=A2&a=A3#some-hash');
});

it('replaces multiple search values via an array to the search params of the given base URL', () => {
  const base = new URL('https://some-username:some-password@foo.example/some-path?a=A&b=B1&b=B2#some-hash');
  const url = urlModify({ search: [ ['a', 'A2' ], [ 'a', 'A3' ] ] }, base);
  expect(url.toString()).toEqual('https://some-username:some-password@foo.example/some-path?b=B1&b=B2&a=A2&a=A3#some-hash');
});

it('appends multiple search values via an array to the search params of the given base URL', () => {
  const base = new URL('https://some-username:some-password@foo.example/some-path?a=A&b=B1&b=B2#some-hash');
  const url = urlModify({ search: [ ['a', 'A2' ], [ 'a', 'A3' ] ] }, base, { searchBehavior: 'append' });
  expect(url.toString()).toEqual('https://some-username:some-password@foo.example/some-path?a=A&b=B1&b=B2&a=A2&a=A3#some-hash');
});

it('clears multiple search values via an array to the search params of the given base URL', () => {
  const base = new URL('https://some-username:some-password@foo.example/some-path?a=A&b=B1&b=B2#some-hash');
  const url = urlModify({ search: [ ['a', 'A2' ], [ 'a', 'A3' ] ] }, base, { searchBehavior: 'clear' });
  expect(url.toString()).toEqual('https://some-username:some-password@foo.example/some-path?a=A2&a=A3#some-hash');
});
