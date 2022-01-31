/* Your JS here. */
console.log('Hello World!')
function scrollToDiv(divID){
    console.log("APPP")
    $('html, body').animate({
        scrollTop: $('#' + divID).offset().top - 50
    }, 1000);
}