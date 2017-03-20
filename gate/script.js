/*======Function declarations======*/

// get params array
var getParamsMap = function () {
    var params = window.location.search.replace(/\?/g, '').split("&");
    var paramsMap = {};
    params.forEach(function (p) {
        var v = p.split("=");
        paramsMap[v[0]]=decodeURIComponent(v[1]);
    });
    return paramsMap;
};


// runs dots in selector, returns intervalId which can be cleared with clearInterval(intervalId);
function runningDotsStart(selector){
    var element = $(selector);
    var wait = element[0];
    wait.innerHTML = ".";

    var dotId = window.setInterval( function() {
        if ( wait.innerHTML.length > 3 )
            wait.innerHTML = ".";
        else
            wait.innerHTML += ".";
    }, 200);

    element.attr('dot-id', dotId); //apply id as attribute to selector in case we can't transfer it
    return dotId;
}

// stop running dots
function runningDotsStop(id){
    clearInterval(id);
}

// stop specific running dots
function runningDotsStopInElement(element){
    var dotId = $(element).attr('dot-id');
    if (dotId){clearInterval(dotId);}
}

// activate text block for language
function showLocalizedText(lang, selector){
    if (!lang){lang = 'ru'}
    if (!selector){selector = '.lang-block'}

    //console.log('lang is', lang, 'selector is', selector);

    // remove currently visible blocks
    $('.active').removeClass('active');

    // show desired block
    $(selector + '.' + lang).addClass('active');



}


/*======Function launchers======*/

$(document).ready(function(){
    // get variables

    var params = getParamsMap();
    var settedLang = params.settedLang || 'ru';
    var userId = params.id;
    var interval;

    // show localized initial text block
    showLocalizedText(settedLang, '.lang-block');

    // show running dots animation while waiting
    interval = runningDotsStart('.lang-block.active .status');

    // request data from XSOLLA


});