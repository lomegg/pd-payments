$.getScript( "https://cdn.rawgit.com/lomegg/pd-paymetns/master/payments-interface.js", function( data, textStatus, jqxhr ) { });

var style = "@import url('https://cdn.rawgit.com/lomegg/pd-paymetns/master/payments-interface.css');";
var newSS=document.createElement('link');
newSS.rel='stylesheet';
newSS.href='data:text/css,'+escape(style);
document.getElementsByTagName("head")[0].appendChild(newSS);

console.log('TAMPERMONKEY SCRIPT APPLIED');