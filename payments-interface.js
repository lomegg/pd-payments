// add donate button to header


$(document).ready(function(){
    var paymentsButton =    '<div class="payment-group">'+
        '<div class="button orange payments" onclick="openPaymentsFrame();return false">' +
        '<i class="mdi mdi-currency-usd mdi-18px"></i>' +
        '</div>'+
        '</div>';

    var anchor = $('header > .third > .auth-group');

    $(paymentsButton).insertAfter(anchor);
});


function openPaymentsFrame(){

    var settedlang = window.settedlang,
        donid = window.donid;

    if (!settedlang){
        console.warn('No settedlang!');
    } else if (!donid){
        console.warn('No donid!');
    } else {
        var windowWidth = $(window).width(),
            windowHeight = screen.height,
            frameWidth = 800,
            frameHeight = 600;

        var posX = (windowWidth - frameWidth)/2;
        var posY = (windowHeight - frameHeight)/2;

        window.open('https://payments.petridish.pw/?settedLang=' + window.settedlang + '&id=' + window.donid, '', 'height=' + frameHeight + ', width=' + frameWidth + ', menubar=no, location=no, titlebar=no, status=no, top=' + posY + ', left=' + posX);
    }
}

//<img style="cursor:pointer;" onclick="javascript:window.open('https://push.petridish.pw/?settedLang=' + settedlang, '', 'height=460, width=650, menubar=no, location=no, titlebar=no, status=no, top=200, left=200');return false;" src="/engine/img/knopka1.png" alt='Do not click here' />
