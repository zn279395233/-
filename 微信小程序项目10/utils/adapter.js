function baseFont() {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio;
  var scale = parseFloat((1 / dpr).toFixed(2));
  docEl.querySelector('meta[name="viewport"]').setAttribute('content', 'initial-scale=' + scale + ',width=device-width,maximum-scale=' + scale + ',user-scalable=no');
  var innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth;
  if (innerWidth / dpr > 720) {
    innerWidth = 720 * dpr
  }
  return docEl.style.fontSize = 100 * (innerWidth / 1090) * 1.5 + 'px';
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  document.addEventListener('DOMContentLoaded', baseFont, false);
  window.addEventListener(resizeEvt, baseFont, false);
};
module.exports = {
  baseFont: baseFont
}

