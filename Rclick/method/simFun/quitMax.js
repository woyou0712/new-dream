export default function () {
  if (
    !!document.fullscreenElement ||
    !!document.mozFullScreenElement ||
    !!document.webkitFullscreenElement
  ) {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}
