var copyTextareaBtn = document.querySelector('.js-textareacopybtn');
copyTextareaBtn.addEventListener('click', function(event) {
  var copyTextarea = document.querySelector('.js-copytextarea');
  copyTextarea.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
        $("[data-toggle='tooltip-area']").tooltip('toggle');
        setTimeout(function(){ $("[data-toggle='tooltip-area']").tooltip('destroy');}, 1500)
  } catch (err) {
    window.alert('Oops, unable to copy');
  }
});
var copyInputBtn = document.querySelector('.js-inputcopybtn');
copyInputBtn.addEventListener('click', function(event) {
  var copyInput = document.querySelector('.js-copyinput');
  copyInput.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
        $("[data-toggle='tooltip-input']").tooltip('toggle');
        setTimeout(function(){ $("[data-toggle='tooltip-input']").tooltip('destroy');}, 1500)
  } catch (err) {
    window.alert('Oops, unable to copy');
  }
});