export interface UrlModifyModifications {
  hash?: string;
  host?: string;
  password?: string;
  path?: string;
  port?: string;
  protocol?: string;
  search?: string | string[][] | Record<string, string> | URLSearchParams;
  username?: string;
}

export interface UrlModifyOptions {
  pathBehavior?: 'append' | 'prepend' | 'replace';
  searchBehavior?: 'append' | 'clear' | 'replace';
}

export const urlModify = (modifications: UrlModifyModifications, base: string | URL, { pathBehavior = 'replace', searchBehavior = 'replace'}: UrlModifyOptions = {}): URL => {
  const url = new URL(base);
  if (undefined !== modifications.hash) {
    url.hash = modifications.hash;
  }
  if (undefined !== modifications.host) {
    url.hostname = modifications.host;
  }
  if (undefined !== modifications.password) {
    url.password = modifications.password;
  }
  if (undefined !== modifications.path) {
    switch (pathBehavior) {
      case 'append':
        url.pathname += modifications.path;
        break;
      case 'prepend':
        url.pathname = modifications.path + url.pathname.slice(1); // Remove the leading slash for consistency with 'append'
        break;
      case 'replace':
      default:
        url.pathname = modifications.path;
        break;
    }
  }
  if (undefined !== modifications.port) {
    url.port = modifications.port;
  }
  if (undefined !== modifications.protocol) {
    url.protocol = modifications.protocol;
  }
  if (undefined !== modifications.search) {
    const searchParams = new URLSearchParams(modifications.search);
    if ('clear' === searchBehavior) {
      url.search = searchParams.toString();
    } else {
      if ('replace' === searchBehavior) {
        for (const key of searchParams.keys()) {
          if (url.searchParams.has(key)) {
            url.searchParams.delete(key);
          }
        }
      }
      searchParams.forEach((value, key) => {
        url.searchParams.append(key, value);
      });
    }
  }
  if (undefined !== modifications.username) {
    url.username = modifications.username;
  }
  return url;
};


