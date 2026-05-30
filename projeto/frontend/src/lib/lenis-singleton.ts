let _lenis: any = null;
let _snapDisabled = false;

export function registerLenis(lenis: any) {
  _lenis = lenis;
}

export function stopScrolling() {
  _snapDisabled = true;
  _lenis?.stop();
}

export function startScrolling() {
  _snapDisabled = false;
  _lenis?.start();
}

export function isSnapDisabled() {
  return _snapDisabled;
}
