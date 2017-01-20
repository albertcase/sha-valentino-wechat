(function(doc, win) {
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalc = function () {
        var width = docEl.clientWidth,
			height = docEl.clientHeight;
        if(width/height>750/1207){
            docEl.style.fontSize = 100 * (height / 1207) + 'px';
        }else{
            docEl.style.fontSize = 100 * (width / 750) + 'px';
        }
      };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);