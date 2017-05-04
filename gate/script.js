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

function updateLocalizedText(lang, selector){
    if (!lang){lang = 'ru'}
    if (!selector){selector = '.lang-block.active h1'}

    var newText = {
        ru: 'Жми на кнопку!',
        en: 'Press the buttton!',
        fr: 'Press the buttton!',
        nl: 'Press the buttton!'
    };

    console.log($(selector));
    $(selector).text(newText[lang]);
}

function showPaymentsButton(){
    var button = $('<button data-xpaystation-widget-open>Купить подписку</button>');
    button.appendTo($('.lang-block.active'));
}


function loadPaymentsInterface(token){
    var options = {
        access_token: token, //TODO передайте токен, полученный на предыдущем шаге
        sandbox: true //TODO пожалуйста, не забудьте удалить этот параметр при переходе в Live режим
    };
    var s = document.createElement('script');
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://static.xsolla.com/embed/paystation/1.0.7/widget.min.js";
    s.addEventListener('load', function (e) {
        XPayStationWidget.init(options);
    }, false);
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(s);
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

    //https://payback.petridish.pw/get-token.php?id=1666&setted_lang=ru

    $.ajax( "https://payback.petridish.pw/get-token.php?id=" +  userId +"&setted_lang=" + settedLang )
        .done(function(data) {
            data = JSON.parse(data);
            // token is now accessible as data.token

            //load payments interface
            loadPaymentsInterface(data.token);

            // stop and hide interval
            runningDotsStopInElement('.lang-block.active .status');
            $('.lang-block.active .status').hide();

            //show new status message
            updateLocalizedText(settedLang);

            // show button
            showPaymentsButton();

        })
        .fail(function() {
            console.warn( "error" );
        })
        .always(function() {
            console.log( "complete" );
        });
});