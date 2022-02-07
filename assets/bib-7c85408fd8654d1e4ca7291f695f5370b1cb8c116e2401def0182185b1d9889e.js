document.addEventListener("DOMContentLoaded",function(){$(document.documentElement).attr("lang");const t="Markus",n="Quade";$(".bibliography span").each(function(){let e=$(this).html();if(t.length>0&&n.length>0){const l=t+" "+n,o=t[0]+". "+n,a=n+" "+t[0]+".";e=e.replace(l,"<strong>"+l+"</strong>").replace(o,"<strong>"+o+"</strong>").replace(a,"<strong>"+a+"</strong>")}e=e.replace(/, ((?:\w{3}(?:\. |-))?\d{4})/gi,", <small>$1</small>"),$(this).html(e)})});
//# sourceMappingURL=/assets/source-maps/bib.js.map
//# sourceURL=_assets/js/bib.js
