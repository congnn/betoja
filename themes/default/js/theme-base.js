$(window).load(function(){
    var screen_width=$(window).width();
    $('#content').css('width',screen_width-220);
    if(screen_width<1025){
         $('#content').css('width','100%');
    }
     var hr_width=$('.swMain hr').width();
     hr_width=hr_width/2;
     $('.swMain hr').css('left',38 - hr_width);
     if($('#sidebar').css('display')==='none'){
          $('#content').css('margin-left','0');
           $('#content').css('width','100%');
     }
});
$(window).resize(function(){
     var screen_width=$(window).width();
    $('#content').css('width',screen_width-220);
     if(screen_width<1025){
         $('#content').css('width','100%');
    }
   var hr_width=$('.swMain hr').width();
     hr_width=hr_width/2;
     $('.swMain hr').css('left',38 - hr_width);
       if($('#sidebar').css('display')==='none'){
          $('#content').css('margin-left','0');
           $('#content').css('width','100%');
     }
});
