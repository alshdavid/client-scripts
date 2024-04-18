"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // lib/browser/crypto/index.ts
  var crypto_exports = {};
  __export(crypto_exports, {
    md5: () => md5,
    sha1: () => sha1,
    sha256: () => sha256
  });

  // lib/browser/crypto/sha1.ts
  async function sha1(input) {
    const utf8 = new TextEncoder().encode(input);
    return crypto.subtle.digest("SHA-1", utf8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, "0")).join("");
      return hashHex;
    });
  }

  // lib/browser/crypto/sha256.ts
  async function sha256(input) {
    const utf8 = new TextEncoder().encode(input);
    return crypto.subtle.digest("SHA-256", utf8).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, "0")).join("");
      return hashHex;
    });
  }

  // lib/browser/crypto/md5.ts
  async function md5(inputString) {
    var hc = "0123456789abcdef";
    function rh(n) {
      var j, s = "";
      for (j = 0; j <= 3; j++)
        s += hc.charAt(n >> j * 8 + 4 & 15) + hc.charAt(n >> j * 8 & 15);
      return s;
    }
    function ad(x2, y) {
      var l = (x2 & 65535) + (y & 65535);
      var m = (x2 >> 16) + (y >> 16) + (l >> 16);
      return m << 16 | l & 65535;
    }
    function rl(n, c2) {
      return n << c2 | n >>> 32 - c2;
    }
    function cm(q, a2, b2, x2, s, t) {
      return ad(rl(ad(ad(a2, q), ad(x2, t)), s), b2);
    }
    function ff(a2, b2, c2, d2, x2, s, t) {
      return cm(b2 & c2 | ~b2 & d2, a2, b2, x2, s, t);
    }
    function gg(a2, b2, c2, d2, x2, s, t) {
      return cm(b2 & d2 | c2 & ~d2, a2, b2, x2, s, t);
    }
    function hh(a2, b2, c2, d2, x2, s, t) {
      return cm(b2 ^ c2 ^ d2, a2, b2, x2, s, t);
    }
    function ii(a2, b2, c2, d2, x2, s, t) {
      return cm(c2 ^ (b2 | ~d2), a2, b2, x2, s, t);
    }
    function sb(x2) {
      var i2;
      var nblk = (x2.length + 8 >> 6) + 1;
      var blks = new Array(nblk * 16);
      for (i2 = 0; i2 < nblk * 16; i2++)
        blks[i2] = 0;
      for (i2 = 0; i2 < x2.length; i2++)
        blks[i2 >> 2] |= x2.charCodeAt(i2) << i2 % 4 * 8;
      blks[i2 >> 2] |= 128 << i2 % 4 * 8;
      blks[nblk * 16 - 2] = x2.length * 8;
      return blks;
    }
    var i, x = sb("" + inputString), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, olda, oldb, oldc, oldd;
    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;
      a = ff(a, b, c, d, x[i + 0], 7, -680876936);
      d = ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = ff(c, d, a, b, x[i + 10], 17, -42063);
      b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
      a = gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
      a = hh(a, b, c, d, x[i + 5], 4, -378558);
      d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = hh(d, a, b, c, x[i + 0], 11, -358537222);
      c = hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = hh(b, c, d, a, x[i + 2], 23, -995338651);
      a = ii(a, b, c, d, x[i + 0], 6, -198630844);
      d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = ii(b, c, d, a, x[i + 9], 21, -343485551);
      a = ad(a, olda);
      b = ad(b, oldb);
      c = ad(c, oldc);
      d = ad(d, oldd);
    }
    return rh(a) + rh(b) + rh(c) + rh(d);
  }

  // lib/browser/local-storage/index.ts
  var local_storage_exports = {};
  __export(local_storage_exports, {
    LocalStorageAsync: () => LocalStorageAsync,
    init: () => init
  });

  // lib/browser/local-storage/local-storage-browser.ts
  var DATABASE_KEY = "LocalStorageAsync";
  var DATABASE_STORE_KEY = "default";
  var LocalStorageAsyncBrowser = class {
    #database;
    constructor(storeKey = "") {
      let databaseName = DATABASE_KEY;
      if (storeKey) {
        databaseName = `${DATABASE_KEY}:${storeKey}`;
      }
      const oRequest = indexedDB.open(databaseName);
      oRequest.onupgradeneeded = function() {
        const db = oRequest.result;
        db.createObjectStore(DATABASE_STORE_KEY);
      };
      this.#database = new Promise((resolve, reject) => {
        oRequest.onsuccess = function() {
          const db = oRequest.result;
          resolve(db);
        };
        oRequest.onerror = function() {
          reject(oRequest.error);
        };
      });
    }
    async listItems() {
      const db = await this.#database;
      const tx = db.transaction(DATABASE_STORE_KEY, "readonly");
      const st = tx.objectStore(DATABASE_STORE_KEY);
      const gRequest = st.getAllKeys();
      return new Promise(async (resolve, reject) => {
        gRequest.onsuccess = () => {
          resolve(gRequest.result);
        };
        gRequest.onerror = () => {
          reject(gRequest.error);
        };
      });
    }
    async getItem(key) {
      const db = await this.#database;
      const tx = db.transaction(DATABASE_STORE_KEY, "readonly");
      const st = tx.objectStore(DATABASE_STORE_KEY);
      const gRequest = st.get(key);
      return new Promise(async (resolve, reject) => {
        gRequest.onsuccess = () => {
          if (gRequest.result === void 0) {
            resolve(null);
          } else {
            resolve(gRequest.result);
          }
        };
        gRequest.onerror = () => {
          reject(gRequest.error);
        };
      });
    }
    async setItem(key, value) {
      const db = await this.#database;
      const tx = db.transaction(DATABASE_STORE_KEY, "readwrite");
      const st = tx.objectStore(DATABASE_STORE_KEY);
      const sRequest = st.put(value, key);
      return new Promise((resolve, reject) => {
        sRequest.onsuccess = function() {
          resolve();
        };
        sRequest.onerror = function() {
          reject(sRequest.error);
        };
      });
    }
    async removeItem(key) {
      const db = await this.#database;
      const tx = db.transaction(DATABASE_STORE_KEY, "readwrite");
      const st = tx.objectStore(DATABASE_STORE_KEY);
      const rRequest = st.delete(key);
      return new Promise((resolve, reject) => {
        rRequest.onsuccess = function() {
          resolve();
        };
        rRequest.onerror = function() {
          reject(rRequest.error);
        };
      });
    }
    async getItemJson(key) {
      const str = await this.getItem(key);
      if (!str)
        return null;
      return JSON.parse(str);
    }
    async setItemJson(key, value) {
      const str = JSON.stringify(value, null, 2);
      await this.setItem(key, str);
    }
    async close() {
      const db = await this.#database;
      db.close();
    }
  };

  // lib/browser/local-storage/init.ts
  var GLOBAL_KEY = "localStorageAsync";
  function init(storeKey) {
    let globalKey = GLOBAL_KEY;
    if (storeKey) {
      globalKey += `_${storeKey}`;
    }
    if (Reflect.has(window, globalKey)) {
      return Reflect.get(window, globalKey);
    }
    const localStorageAsync = new LocalStorageAsyncBrowser(storeKey);
    Reflect.set(window, globalKey, localStorageAsync);
    return localStorageAsync;
  }

  // lib/browser/local-storage/local-storage.ts
  var LocalStorageAsync = class {
    #localStorageAsync;
    constructor(storeKey) {
      this.#localStorageAsync = new LocalStorageAsyncBrowser(storeKey);
    }
    listItems() {
      return this.#localStorageAsync.listItems();
    }
    getItem(key) {
      return this.#localStorageAsync.getItem(key);
    }
    setItem(key, value) {
      return this.#localStorageAsync.setItem(key, value);
    }
    removeItem(key) {
      return this.#localStorageAsync.removeItem(key);
    }
    getItemJson(key) {
      return this.#localStorageAsync.getItemJson(key);
    }
    setItemJson(key, value) {
      return this.#localStorageAsync.setItemJson(key, value);
    }
    close() {
      return this.#localStorageAsync.close();
    }
  };

  // lib/browser/strings/index.ts
  var strings_exports = {};
  __export(strings_exports, {
    slugify: () => slugify,
    snakeToCamel: () => snakeToCamel,
    stripHtml: () => stripHtml,
    stripNaughtyCharacters: () => stripNaughtyCharacters,
    titleCase: () => titleCase
  });

  // lib/browser/strings/strip-naughty-characters.ts
  function stripNaughtyCharacters(text) {
    return text.replaceAll("\u2019", "'").replaceAll("\xA0", " ").replaceAll("\u2013", "-").replaceAll("\u2018", "'");
  }

  // lib/browser/strings/slugity.ts
  var slugify = (text) => {
    return text.toString().normalize("NFKD").toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\_/g, "-").replace(/\-\-+/g, "-").replace(/\-$/g, "");
  };

  // lib/browser/strings/snake-to-camel.ts
  var snakeToCamel = (str) => str.toLowerCase().replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase().replace("-", "").replace("_", "")
  );

  // lib/browser/strings/strip-html.ts
  var HeadingsWithProps = new RegExp("<h[1-6][^>].*?</h[1-6]>", "g");
  var HeadingsWithoutProps = new RegExp("<h[1-6]>.*?</h[1-6]>", "g");
  var PreTags = new RegExp("<pre>.*?</pre>", "g");
  var PreTagsWithProps = new RegExp("<pre[^>].*?</pre>", "g");
  var CodeTags = new RegExp("<code>.*?</code>", "g");
  var CodeTagsWithPros = new RegExp("<code[^>].*?</code>", "g");
  var SpecialCharacters = new RegExp("&.*?;", "g");
  var Sanitize = new RegExp("(<([^>]+)>)", "g");
  function stripHtml(text, limit = -1) {
    let result = text.replaceAll(HeadingsWithProps, "").replaceAll(HeadingsWithoutProps, "").replaceAll(PreTagsWithProps, "").replaceAll(PreTags, "").replaceAll(CodeTagsWithPros, "").replaceAll(CodeTags, "").replaceAll(Sanitize, "").replaceAll(SpecialCharacters, "").replaceAll("\n", " ").replaceAll("	", "").replaceAll("\r", "");
    if (limit !== -1) {
      result = result.substring(0, limit);
    }
    return stripNaughtyCharacters(result);
  }

  // lib/browser/strings/title-case.ts
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  }

  // lib/browser/web/index.ts
  var web_exports = {};
  __export(web_exports, {
    createFrame: () => createFrame,
    download: () => download,
    getPageDocument: () => getPageDocument,
    sleep: () => sleep,
    textToDomTemplate: () => textToDomTemplate
  });

  // lib/browser/web/text-to-dom-template.ts
  function textToDomTemplate(text) {
    const template = document.createElement("template");
    template.innerHTML = text;
    return template.content;
  }

  // lib/browser/request/index.ts
  var request_exports2 = {};
  __export(request_exports2, {
    request: () => request2
  });

  // lib/browser/request/browser/base64.ts
  function base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }
  function ArrayBufferToBase64(ab) {
    return window.btoa(String.fromCharCode(...new Uint8Array(ab)));
  }

  // lib/browser/request/browser/fetch-cached.ts
  var DATABASE_KEY2 = "request";
  async function fetchCached(input, init2) {
    if (init2.method && init2.method !== "GET") {
      return window.fetch(input, init2);
    }
    let hashedKey = "";
    if (typeof input === "string") {
      hashedKey = await sha256(input);
    } else {
      hashedKey = await sha256(input.url);
    }
    const CacheKeys = {
      Meta: `${hashedKey}_meta`,
      Body: `${hashedKey}_body`
    };
    const db = init(DATABASE_KEY2);
    const cachedMeta = await db.getItemJson(CacheKeys.Meta);
    const cachedBody = await db.getItem(CacheKeys.Body);
    if (cachedMeta !== null && cachedBody !== null) {
      let buff = base64ToArrayBuffer(cachedBody);
      return new Response(buff, cachedMeta);
    }
    const response = await fetch(input, init2);
    if (!(response.status >= 200 && response.status <= 399)) {
      return response;
    }
    const cacheEntry = {
      status: response.status,
      statusText: response.statusText,
      headers: {}
    };
    response.headers.forEach((value, key) => cacheEntry.headers[key] = value);
    const ab = await response.arrayBuffer();
    const b64 = ArrayBufferToBase64(ab);
    await db.setItemJson(CacheKeys.Meta, cacheEntry);
    await db.setItem(CacheKeys.Body, b64);
    return new Response(ab, response);
  }

  // lib/browser/request/browser/request.ts
  async function request(input, init2 = {}) {
    let fetchFunc;
    if (init2.storeInCache === void 0 || init2.storeInCache === true) {
      fetchFunc = fetchCached;
    } else {
      fetchFunc = window.fetch;
    }
    for (let i = 0; i < (init2.retries || 500); i++) {
      const response = await fetchFunc(input, init2);
      if (response.status >= 200 && response.status <= 399) {
        return response;
      }
      await new Promise((res) => setTimeout(res, 5e3));
    }
    throw new Error(`Too many retries: ${input}`);
  }

  // lib/browser/request/request.ts
  async function request2(input, init2 = {}) {
    if (!input) {
      throw new Error("No input provided");
    }
    return request(input, init2);
  }

  // lib/browser/web/url-to-dom-template.ts
  async function getPageDocument(url) {
    const response = await request2(url);
    const text = await response.text();
    return [text, textToDomTemplate(text)];
  }

  // lib/browser/web/iframe.ts
  async function createFrame(src, side) {
    const frame = document.createElement("iframe");
    frame.src = src;
    frame.style.position = "fixed";
    frame.style.display = "block";
    frame.style.top = "0";
    if (side === "r") {
      frame.style.right = "0";
    } else {
      frame.style.left = "0";
    }
    frame.style.height = "50vh";
    frame.style.width = "50vw";
    frame.style.zIndex = "99999999999";
    const onload = new Promise((res) => frame.onload = res);
    document.body.appendChild(frame);
    await onload;
    const frameWindow = frame.contentWindow;
    const frameDocument = frame.contentWindow.document;
    const dispose = () => frame.parentElement.removeChild(frame);
    return [frameWindow, frameDocument, dispose];
  }

  // lib/browser/web/sleep.ts
  var sleep = (d) => new Promise((res) => setTimeout(res, d));

  // lib/browser/web/download.ts
  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  // lib/browser/load-script/index.ts
  var load_script_exports = {};
  __export(load_script_exports, {
    loadScript: () => loadScript
  });
  async function loadScript(src) {
    if (!src) {
      throw new Error("No script source provided");
    }
    const script = document.createElement("script");
    script.src = src;
    const onload = new Promise((r) => script.onload = r);
    document.head.appendChild(script);
    await onload;
  }

  // lib/browser/index.ts
  globalThis.alshx = globalThis.alshx || {};
  globalThis.alshx["crypto"] = crypto_exports;
  globalThis.alshx["localStorage"] = local_storage_exports;
  globalThis.alshx["strings"] = strings_exports;
  globalThis.alshx["web"] = web_exports;
  globalThis.alshx["scripts"] = load_script_exports;
  globalThis.alshx["request"] = request_exports2;
})();
