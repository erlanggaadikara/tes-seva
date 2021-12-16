const userAgent =
  typeof window !== "undefined" ? window.navigator.userAgent : "";

export const isMobileDevice = /Mobi/i.test(userAgent);
export const isInTorqApp = /Torq/i.test(userAgent);

export const screenSize = {
  mobileS: "320px",
};

const browser = {
  trident: userAgent.indexOf("Trident") > -1,
  presto: userAgent.indexOf("Presto") > -1,
  webKit: userAgent.indexOf("AppleWebKit") > -1,
  gecko: userAgent.indexOf("Gecko") > -1 && userAgent.indexOf("KHTML") == -1,
  mobile:
    !!userAgent.match(/AppleWebKit.*Mobile/i) ||
    !!userAgent.match(
      /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/
    ),
  ios: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  android: userAgent.indexOf("Android") > -1 || userAgent.indexOf("Linux") > -1,
  iPhone: userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("Mac") > -1,
  iPad: userAgent.indexOf("iPad") > -1,
  webApp: userAgent.indexOf("Safari") == -1,
  firefox: userAgent.indexOf("Firefox") != -1,
};

export const isIphone = browser.iPhone || browser.iPad || browser.ios;
export const isAndroid = browser.android;
export const isFirefox = browser.firefox;
