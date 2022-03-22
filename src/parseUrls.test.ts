import {parseUrls} from './parseUrls';

describe('parseUrls', () => {
  describe('numeric ports', () => {
    it('parses URLs from a numeric port', () => {
      const urls = parseUrls(80);
      expect(urls.length).toBe(1);
      expect(urls[0]).toBe('http://localhost:80/');
    });

    it('parses URLs from many numeric ports', () => {
      const urls = parseUrls([80, 7272]);
      expect(urls.length).toBe(2);
      expect(urls[0]).toBe('http://localhost:80/');
      expect(urls[1]).toBe('http://localhost:7272/');
    });
  });

  describe('stringified ports', () => {
    it('parses URLs from a stringified port', () => {
      const urls = parseUrls('80');
      expect(urls.length).toBe(1);
      expect(urls[0]).toBe('http://localhost:80/');
    });

    it('parses URLs from many stringified ports', () => {
      const urls = parseUrls(['80', '7272']);
      expect(urls.length).toBe(2);
      expect(urls[0]).toBe('http://localhost:80/');
      expect(urls[1]).toBe('http://localhost:7272/');
    });
  });

  describe('special cases', () => {
    it('does not return a URL when the input array is empty', () => {
      const urls = parseUrls([]);
      expect(urls.length).toBe(0);
    });

    it('parses URLs from stringified and numeric ports mixed with URLs', () => {
      const urls = parseUrls(['80', 7272, 'https://www.google.com/']);
      expect(urls.length).toBe(3);
      expect(urls[0]).toBe('http://localhost:80/');
      expect(urls[1]).toBe('http://localhost:7272/');
      expect(urls[2]).toBe('https://www.google.com/');
    });
  });

  describe('URLs', () => {
    it('detects a URL', () => {
      const url = 'https://www.google.com/';
      const urls = parseUrls(url);
      expect(urls.length).toBe(1);
      expect(urls[0]).toBe(url);
    });

    it('detects many URLs', () => {
      const urls = parseUrls(['https://www.google.com/', 'https://bennycode.com/', 'https://typescript.tv/']);
      expect(urls.length).toBe(3);
      expect(urls[0]).toBe('https://www.google.com/');
      expect(urls[1]).toBe('https://bennycode.com/');
      expect(urls[2]).toBe('https://typescript.tv/');
    });
  });
});
