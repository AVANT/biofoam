require('app');

$.fn.selectRange = function(start, end){
  if(!end) end = start;
  return this.each(function(){
    if (this.setSelectionRange){
      console.log('test');
      this.focus();
      this.setSelectionRange(start, end);
    } else if (this.createTextRange){
      var range = this.createTextRange();
      range.collapse(true);
      range.moveEnd('character', end);
      range.moveStart('character', start);
      range.select();
    }
  });
};

return $;