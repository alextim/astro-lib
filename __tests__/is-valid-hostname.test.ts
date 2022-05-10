import { isValidHostname } from '../src/utils/is-valid-hostname';

describe('is valid hostname', () => {
  // tld and subdomains
  it('', () => expect(isValidHostname('example.com')).toBeTruthy());
  it('', () => expect(isValidHostname('example.com.')).toBeTruthy());
  it('', () => expect(isValidHostname('foo.example.com')).toBeTruthy());
  it('', () => expect(isValidHostname('bar.foo.example.com')).toBeTruthy());
  it('', () => expect(isValidHostname('exa-mple.co.uk')).toBeTruthy());
  it('', () => expect(isValidHostname('a.com')).toBeTruthy());
  it('', () => expect(isValidHostname('.com.')).toBeFalsy());
  it('', () => expect(isValidHostname('a.b')).toBeTruthy());
  it('', () => expect(isValidHostname('foo.bar.baz')).toBeTruthy());
  it('', () => expect(isValidHostname('foo-bar.ba-z.qux')).toBeTruthy());
  it('', () => expect(isValidHostname('hello.world')).toBeTruthy());
  it('', () => expect(isValidHostname('ex-am-ple.com')).toBeTruthy());
  it('', () => expect(isValidHostname('xn--80ak6aa92e.com')).toBeTruthy());
  it('', () => expect(isValidHostname('example.a9')).toBeTruthy());
  it('', () => expect(isValidHostname('example.9a')).toBeTruthy());
  it('', () => expect(isValidHostname('example.99')).toBeTruthy());
  it('', () => expect(isValidHostname('4chan.com')).toBeTruthy());
  it('', () => expect(isValidHostname('9gag.com')).toBeTruthy());
  it('', () => expect(isValidHostname('37signals.com')).toBeTruthy());
  it('', () => expect(isValidHostname('hello.world')).toBeTruthy());

  // invalid tld and subdomains
  it('', () => expect(isValidHostname('exa_mple.com')).toBeFalsy());
  it('', () => expect(isValidHostname('')).toBeFalsy());
  it('', () => expect(isValidHostname('ex*mple.com')).toBeFalsy());
  it('', () => expect(isValidHostname('@#$@#$%fd')).toBeFalsy());
  it('', () => expect(isValidHostname('_example.com')).toBeFalsy());
  it('', () => expect(isValidHostname('-example.com')).toBeFalsy());
  it('', () => expect(isValidHostname('foo._example.com')).toBeFalsy());
  it('', () => expect(isValidHostname('foo.-example.com')).toBeFalsy());
  it('', () => expect(isValidHostname('foo.example-.co.uk')).toBeFalsy());
  it('', () => expect(isValidHostname('example-.com')).toBeFalsy());
  it('', () => expect(isValidHostname('example_.com')).toBeFalsy());
  it('', () => expect(isValidHostname('foo.example-.com')).toBeFalsy());
  it('', () => expect(isValidHostname('foo.example_.com')).toBeFalsy());
  it('', () => expect(isValidHostname('example.com-')).toBeFalsy());
  it('', () => expect(isValidHostname('example.com_')).toBeFalsy());
  it('', () => expect(isValidHostname('-foo.example.com_')).toBeFalsy());
  it('', () => expect(isValidHostname('_foo.example.com_')).toBeFalsy());
  it('', () => expect(isValidHostname('*.com_')).toBeFalsy());
  it('', () => expect(isValidHostname('*.*.com_')).toBeFalsy());

  // more subdomains
  it('', () => expect(isValidHostname('example.com')).toBeTruthy());
  it('', () => expect(isValidHostname('example.co.uk')).toBeTruthy());
  it('', () => expect(isValidHostname('-foo.example.com')).toBeFalsy());
  it('', () => expect(isValidHostname('foo-.example.com')).toBeFalsy());
  it('', () => expect(isValidHostname('-foo-.example.com')).toBeFalsy());
  it('', () => expect(isValidHostname('foo-.bar.example.com')).toBeFalsy());
  it('', () => expect(isValidHostname('-foo.bar.example.com')).toBeFalsy());
  it('', () => expect(isValidHostname('-foo-.bar.example.com')).toBeFalsy());

  // wildcard
  it('', () => expect(isValidHostname('*.example.com')).toBeFalsy());

  // hostnames can't have underscores
  it('', () => expect(isValidHostname('_dnslink.ipfs.io')).toBeFalsy());
  it('', () => expect(isValidHostname('xn--_eamop-.donata.com')).toBeFalsy());

  // punycode
  it('', () => expect(isValidHostname('xn--6qq79v.xn--fiqz9s')).toBeTruthy());
  it('', () => expect(isValidHostname('xn--ber-goa.com')).toBeTruthy());

  // IPs
  it('', () => expect(isValidHostname('127.0.0.1')).toBeTruthy());
  it('', () => expect(isValidHostname('100.1.2.3')).toBeTruthy());
  it('', () => expect(isValidHostname('8.8.8.8')).toBeTruthy());
  it('', () => expect(isValidHostname('127.0.0.1:3000')).toBeFalsy());
  it('', () => expect(isValidHostname('1.1.1.3com')).toBeTruthy());

  // valid labels
  it('', () => expect(isValidHostname('localhost')).toBeTruthy());
  it('', () => expect(isValidHostname('example')).toBeTruthy());
  it('', () => expect(isValidHostname('exa-mple')).toBeTruthy());
  it('', () => expect(isValidHostname('3434')).toBeTruthy());
  it('', () => expect(isValidHostname('bar.q-ux')).toBeTruthy());
  it('', () => expect(isValidHostname('a'.repeat(63))).toBeTruthy());

  // valid length
  it('', () => expect(isValidHostname(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'c'.repeat(61)}`)).toBeTruthy());
  it('', () => expect(isValidHostname(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'c'.repeat(61)}.`)).toBeTruthy());
  it('', () => expect(isValidHostname(`${'a'.repeat(63)}.${'b'.repeat(63)}.${'c'.repeat(63)}.${'c'.repeat(62)}`)).toBeFalsy());

  // invalid labels
  it('', () => expect(isValidHostname('example.com:3000')).toBeFalsy());
  it('', () => expect(isValidHostname('localhost:3000')).toBeFalsy());
  it('', () => expect(isValidHostname('example..comw')).toBeFalsy());
  it('', () => expect(isValidHostname('a'.repeat(64))).toBeFalsy());
  it('', () => expect(isValidHostname('-exa-mple')).toBeFalsy());
  it('', () => expect(isValidHostname('-exa-mple-')).toBeFalsy());
  it('', () => expect(isValidHostname('exa-mple-')).toBeFalsy());
  it('', () => expect(isValidHostname('example-')).toBeFalsy());
  it('', () => expect(isValidHostname('.')).toBeFalsy());
  it('', () => expect(isValidHostname('..')).toBeFalsy());
  it('', () => expect(isValidHostname('example..')).toBeFalsy());
  it('', () => expect(isValidHostname('..example')).toBeFalsy());
  it('', () => expect(isValidHostname('.example')).toBeFalsy());

  // contains em-dash
  it('', () => expect(isValidHostname('xn–pple-43d.com')).toBeFalsy());

  // invalid types
  it('', () => expect(isValidHostname(3434)).toBeFalsy());
  it('', () => expect(isValidHostname({})).toBeFalsy());
  it('', () => expect(isValidHostname(function () {})).toBeFalsy());

  // invalid values
  it('', () => expect(isValidHostname('foo.example.com*')).toBeFalsy());
  it('', () => expect(isValidHostname('google.com"\'"""\\"\\\'test test')).toBeFalsy());
  it('', () => expect(isValidHostname('google.com.au\'"\'"""\\"\\\'test')).toBeFalsy());
  it('', () => expect(isValidHostname('...')).toBeFalsy());
  it('', () => expect(isValidHostname('.example.')).toBeFalsy());
  it('', () => expect(isValidHostname('.example.com')).toBeFalsy());
  it('', () => expect(isValidHostname('"example.com"')).toBeFalsy());
});
