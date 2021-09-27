import { urlModify } from '../src/urlModify';

const base = new URL('https://foo.example?foo=bar');

it('README contains working examples', () => {
  expect(urlModify({ protocol: 'wss' }, base).toString()).toEqual('wss://foo.example/?foo=bar');
  expect(urlModify({ search: { foo: 'bar2' } }, base).toString()).toEqual('https://foo.example/?foo=bar2');
  expect(urlModify({ search: { foo: 'bar2' } }, base, { searchBehavior: 'append' }).toString()).toEqual('https://foo.example/?foo=bar&foo=bar2');
  expect(urlModify({ search: [ [ 'foo', 'bar2' ], [ 'foo', 'bar3' ] ] }, base, { searchBehavior: 'append' }).toString()).toEqual('https://foo.example/?foo=bar&foo=bar2&foo=bar3');
  expect(urlModify({ search: [ [ 'foo', 'bar2' ], [ 'foo', 'bar3' ] ] }, base, { searchBehavior: 'replace' }).toString()).toEqual('https://foo.example/?foo=bar2&foo=bar3');
  expect(urlModify({ search: { abc: '123' } }, base).toString()).toEqual('https://foo.example/?foo=bar&abc=123');
  expect(urlModify({ search: { abc: '123' } }, base, { searchBehavior: 'clear' }).toString()).toEqual('https://foo.example/?abc=123');
});
