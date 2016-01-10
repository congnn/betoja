var course_id = '55c3306344616e0ca600001f';
var course_name = 'Làm chủ Excel trong 4 giờ';
$(document).ready(function(){
  console.log(123);
  //Scroll
  $('a[href*=#]:not([href=#])').click(function() {
     $(".active").removeClass("active");
     $(this).parent().addClass("active");
     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
       var target = $(this.hash);
       target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
       if (target.length) {
         $('html,body').animate({
           scrollTop: target.offset().top
         }, 1000);
         return false;
       }
     }
   });

  setup_tracking();
  //Tracking C2
  track_c2();

  var data_vid = {
    4:"http://d3c5ulldcb6uls.cloudfront.net/excel-co-ban/04/hls_1500_.m3u8",
    8:"http://d3c5ulldcb6uls.cloudfront.net/excel-co-ban/08/hls_1500_.m3u8",
    10:"http://d3c5ulldcb6uls.cloudfront.net/excel-co-ban/10/hls_1500_.m3u8"
  }
  $(".btn-small-preview").bind("click", function(){
    var title = $(this).parent().text().replace("Học thử","");
    $(".modal-title").text(title);
    $("#video_panel").modal("show");
  });

  $("#video_panel").on("hidden.bs.modal", function(){
    $("#vid").hide();
  })

  $(".item").bind('click', function(){
    $(".item").removeClass("active");
    $(this).addClass("active");
  });

  

  $("#ipt_submit").bind("click", function(){
    var name = $(".form_c3").find("input[name='name']").val();
    var mobile = $(".form_c3").find("input[name='tel']").val();
    var email = $(".form_c3").find("input[name='email']").val();
    var msg = window.location.href;
    var detail = name + "," + email + "," + mobile + "," + $("input[name='address']").val() + "," + $("input[name='district']").val() + "," + $("input[name='city']").val() + ".";
    detail += msg;

    if(name == "" || mobile == ""){
      alert("Bạn phải điền đủ thông tin!");
      return false;
    }else if(mobile.length < 8 || (email != "" && email.indexOf('@') == -1)){
      alert("Thông tin bạn điền chưa chính xác, vui lòng điền lại!");
      return false;
    }
    // }else if(!validatePhoneNumber(mobile)){
    //   alert("Vui lòng nhập lại đúng số điện thoại");
    //   return false;
    // }

    $(".form_c3").find("input[name='name']").val("");
    $(".form_c3").find("input[name='tel']").val("");
    $(".form_c3").find("input[name='email']").val("");

    var params = {
      'course_id': course_id,
      'course_name': course_name,
      'email': email,
      'name': name,
      'mobile': mobile,
      'type': 'c3_cod',
      'msg': detail
    }
    var flowURL = 'http://flow.pedia.vn:8000/notify/c3/create';
    var backupURL = 'http://pedia.vn/contactc3s/insert';


    send_c3(backupURL, params, function(){
      send_c3(flowURL, params, function(){
        window.location = "http://lamchuexcel3.pedia.vn/thankyou/";
      }, function(){
        window.location = "http://lamchuexcel3.pedia.vn/thankyou/";
      });
    }, function(){
      alert('Lỗi mạng hoặc số điện thoại đã được sử dụng, xin vui lòng thử lại!');
    });
    track_c3_cod({
      'name': name,
      'mobile': mobile,
      'email': email,
      'msg': detail
    });
    // Track c3_cod, to: Google Analytics
    ga('send', 'event', 'c3_cod', 'submit', 'NTD01');
    return false;
  });

  // Start countdown if there is a sale
  var exprired = auto_time().split('/');
  var today = new Date();
  var days = 1;
  var stop_time = new Date(exprired[1]+"/"+exprired[0]+"/"+exprired[2]+" 23:59:59");

  $("#stop_day").text(stop_time.getDate());
  $("#stop_month").text(stop_time.getMonth() + 1);
  $("#stop_year").text(stop_time.getFullYear());

  var tag_day = $("#countdown-day")[0];
  var tag_hour = $("#countdown-hour")[0];
  var tag_minute = $("#countdown-minute")[0];
  var tag_second = $("#countdown-second")[0];
  saleCoundownter(
    (stop_time.getTime() - Date.now()) / 1000,
    function (days, hours, minutes, seconds) {
      tag_day.textContent = days;
      tag_hour.textContent = hours;
      tag_minute.textContent = minutes;
      tag_second.textContent = seconds;
    })

});

(function(e){function s(e){if(i){console.log(e)}}function f(e){var t=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(t,function(e,t,n,r){return t+t+n+n+r+r});var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null}function l(){var e=document.createElement("canvas");return!!(e.getContext&&e.getContext("2d"))}function c(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)}function h(){return c()+c()+"-"+c()+"-"+c()+"-"+c()+"-"+c()+c()+c()}function p(e){var t=e.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{1,2}:[0-9]{2}:[0-9]{2}$/);if(t!==null&&t.length>0){var n=e.split(" ");var r=n[0].split("-");var i=n[1].split(":");return new Date(r[0],r[1]-1,r[2],i[0],i[1],i[2])}var s=Date.parse(e);if(!isNaN(s))return s;s=Date.parse(e.replace(/-/g,"/").replace("T"," "));if(!isNaN(s))return s;return new Date}function d(e,t,n,r,i){var s={};var o={};var u={};var f={};var l={};var c={};var h=null;for(var p=0;p<r.length;p++){var d=r[p];var v;if(h===null){v=n/a[d]}else{v=a[h]/a[d]}var m=e/a[d];var g=t/a[d];if(i){if(m>0)m=Math.floor(m);else m=Math.ceil(m);if(g>0)g=Math.floor(g);else g=Math.ceil(g)}if(d!=="Days"){m=m%v;g=g%v}s[d]=m;u[d]=Math.abs(m);o[d]=g;c[d]=Math.abs(g);f[d]=Math.abs(m)/v;l[d]=Math.abs(g)/v;h=d}return{raw_time:s,raw_old_time:o,time:u,old_time:c,pct:f,old_pct:l}}function m(){if(typeof t.TC_Instance_List!=="undefined"){v=t.TC_Instance_List}else{t.TC_Instance_List=v}g(t)}function g(e){var t=["webkit","moz"];for(var n=0;n<t.length&&!e.requestAnimationFrame;++n){e.requestAnimationFrame=e[t[n]+"RequestAnimationFrame"];e.cancelAnimationFrame=e[t[n]+"CancelAnimationFrame"]}if(!e.requestAnimationFrame||!e.cancelAnimationFrame){e.requestAnimationFrame=function(t,n,r){if(typeof r==="undefined")r={data:{last_frame:0}};var i=(new Date).getTime();var s=Math.max(0,16-(i-r.data.last_frame));var o=e.setTimeout(function(){t(i+s)},s);r.data.last_frame=i+s;return o};e.cancelAnimationFrame=function(e){clearTimeout(e)}}}var t=window;if(!Object.keys){Object.keys=function(){"use strict";var e=Object.prototype.hasOwnProperty,t=!{toString:null}.propertyIsEnumerable("toString"),n=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],r=n.length;return function(i){if(typeof i!=="object"&&(typeof i!=="function"||i===null)){throw new TypeError("Object.keys called on non-object")}var s=[],o,u;for(o in i){if(e.call(i,o)){s.push(o)}}if(t){for(u=0;u<r;u++){if(e.call(i,n[u])){s.push(n[u])}}}return s}}()}var n=false;var r=200;var i=location.hash==="#debug";var o=["Days","Hours","Minutes","Seconds"];var u={Seconds:"Minutes",Minutes:"Hours",Hours:"Days",Days:"Years"};var a={Seconds:1,Minutes:60,Hours:3600,Days:86400,Months:2678400,Years:31536e3};if(!Array.prototype.indexOf){Array.prototype.indexOf=function(e){var t=this.length>>>0;var n=Number(arguments[1])||0;n=n<0?Math.ceil(n):Math.floor(n);if(n<0)n+=t;for(;n<t;n++){if(n in this&&this[n]===e)return n}return-1}}var v={};var y=function(e,t){this.element=e;this.container;this.listeners=null;this.data={paused:false,last_frame:0,animation_frame:null,interval_fallback:null,timer:false,total_duration:null,prev_time:null,drawn_units:[],text_elements:{Days:null,Hours:null,Minutes:null,Seconds:null},attributes:{canvas:null,context:null,item_size:null,line_width:null,radius:null,outer_radius:null},state:{fading:{Days:false,Hours:false,Minutes:false,Seconds:false}}};this.config=null;this.setOptions(t);this.initialize()};y.prototype.clearListeners=function(){this.listeners={all:[],visible:[]}};y.prototype.addTime=function(e){if(this.data.attributes.ref_date instanceof Date){var t=this.data.attributes.ref_date;t.setSeconds(t.getSeconds()+e)}else if(!isNaN(this.data.attributes.ref_date)){this.data.attributes.ref_date+=e*1e3}};y.prototype.initialize=function(r){this.data.drawn_units=[];for(var i=0;i<Object.keys(this.config.time).length;i++){var s=Object.keys(this.config.time)[i];if(this.config.time[s].show){this.data.drawn_units.push(s)}}e(this.element).children("div.time_circles").remove();if(typeof r==="undefined")r=true;if(r||this.listeners===null){this.clearListeners()}this.container=e("<div>");this.container.addClass("time_circles");this.container.appendTo(this.element);var o=this.element.offsetHeight;var u=this.element.offsetWidth;if(o===0)o=e(this.element).height();if(u===0)u=e(this.element).width();if(o===0&&u>0)o=u/this.data.drawn_units.length;else if(u===0&&o>0)u=o*this.data.drawn_units.length;var a=document.createElement("canvas");a.width=484;a.height=120;this.data.attributes.canvas=e(a);this.data.attributes.canvas.appendTo(this.container);var f=l();if(!f&&typeof G_vmlCanvasManager!=="undefined"){G_vmlCanvasManager.initElement(a);n=true;f=true}if(f){this.data.attributes.context=a.getContext("2d")}this.data.attributes.item_size=Math.min(u/this.data.drawn_units.length,o);this.data.attributes.line_width=this.data.attributes.item_size*this.config.fg_width;this.data.attributes.radius=(this.data.attributes.item_size*.8-this.data.attributes.line_width)/2;this.data.attributes.outer_radius=this.data.attributes.radius+.5*Math.max(this.data.attributes.line_width,this.data.attributes.line_width*this.config.bg_width);var i=0;for(var c in this.data.text_elements){if(!this.config.time[c].show)continue;var h=e("<div>");h.addClass("textDiv_"+c);h.css("top",Math.round(.35*this.data.attributes.item_size));h.css("left",Math.round(i++*this.data.attributes.item_size));h.css("width",this.data.attributes.item_size);h.appendTo(this.container);var p=e("<h4>");p.css("font-size",Math.round(3*this.config.text_size*this.data.attributes.item_size));p.css("line-height",Math.round(2.5*this.config.text_size*this.data.attributes.item_size)+"px");p.appendTo(h);var d=e("<span>");d.text(this.config.time[c].text);d.css("font-size",Math.round(this.config.text_size*this.data.attributes.item_size));d.css("line-height",Math.round(this.config.text_size*this.data.attributes.item_size)+"px");d.appendTo(h);this.data.text_elements[c]=p}this.start();if(!this.config.start){this.data.paused=true}var v=this;this.data.interval_fallback=t.setInterval(function(){v.update.call(v,true)},100)};y.prototype.update=function(e){if(typeof e==="undefined"){e=false}else if(e&&this.data.paused){return}if(n){this.data.attributes.context.clearRect(0,0,this.data.attributes.canvas[0].width,this.data.attributes.canvas[0].hright)}var i,s;var u=this.data.prev_time;var f=new Date;this.data.prev_time=f;if(u===null)u=f;if(!this.config.count_past_zero){if(f>this.data.attributes.ref_date){for(var l=0;l<this.data.drawn_units.length;l++){var c=this.data.drawn_units[l];this.data.text_elements[c].text("0");var h=l*this.data.attributes.item_size+this.data.attributes.item_size/2;var p=this.data.attributes.item_size/2;var v=this.config.time[c].color;this.drawArc(h,p,v,0)}this.stop();return}}i=(this.data.attributes.ref_date-f)/1e3;s=(this.data.attributes.ref_date-u)/1e3;var m=this.config.animation!=="smooth";var g=d(i,s,this.data.total_duration,this.data.drawn_units,m);var y=d(i,s,a["Years"],o,m);var l=0;var b=0;var w=null;var E=this.data.drawn_units.slice();for(var l in o){var c=o[l];if(Math.floor(y.raw_time[c])!==Math.floor(y.raw_old_time[c])){this.notifyListeners(c,Math.floor(y.time[c]),Math.floor(i),"all")}if(E.indexOf(c)<0)continue;if(Math.floor(g.raw_time[c])!==Math.floor(g.raw_old_time[c])){this.notifyListeners(c,Math.floor(g.time[c]),Math.floor(i),"visible")}if(!e){this.data.text_elements[c].text(Math.floor(Math.abs(g.time[c])));var h=b*this.data.attributes.item_size+this.data.attributes.item_size/2;var p=this.data.attributes.item_size/2;var v=this.config.time[c].color;if(this.config.animation==="smooth"){if(w!==null&&!n){if(Math.floor(g.time[w])>Math.floor(g.old_time[w])){this.radialFade(h,p,v,1,c);this.data.state.fading[c]=true}else if(Math.floor(g.time[w])<Math.floor(g.old_time[w])){this.radialFade(h,p,v,0,c);this.data.state.fading[c]=true}}if(!this.data.state.fading[c]){this.drawArc(h,p,v,g.pct[c])}}else{this.animateArc(h,p,v,g.pct[c],g.old_pct[c],(new Date).getTime()+r)}}w=c;b++}if(this.data.paused||e){return}var S=this;var x=function(){S.update.call(S)};if(this.config.animation==="smooth"){this.data.animation_frame=t.requestAnimationFrame(x,S.element,S)}else{var T=i%1*1e3;if(T<0)T=1e3+T;T+=50;S.data.animation_frame=t.setTimeout(function(){S.data.animation_frame=t.requestAnimationFrame(x,S.element,S)},T)}};y.prototype.animateArc=function(e,n,i,s,o,u){if(this.data.attributes.context===null)return;var a=o-s;if(Math.abs(a)>.5){if(s===0){this.radialFade(e,n,i,1)}else{this.radialFade(e,n,i,0)}}else{var f=(r-(u-(new Date).getTime()))/r;if(f>1)f=1;var l=o*(1-f)+s*f;this.drawArc(e,n,i,l);if(f>=1)return;var c=this;t.requestAnimationFrame(function(){c.animateArc(e,n,i,s,o,u)},this.element)}};y.prototype.drawArc=function(e,t,r,i){if(this.data.attributes.context===null)return;var s=Math.max(this.data.attributes.outer_radius,this.data.attributes.item_size/2);if(!n){this.data.attributes.context.clearRect(e-s,t-s,s*2,s*2)}if(this.config.use_background){this.data.attributes.context.beginPath();this.data.attributes.context.arc(e,t,this.data.attributes.radius,0,2*Math.PI,false);this.data.attributes.context.lineWidth=this.data.attributes.line_width*this.config.bg_width;this.data.attributes.context.strokeStyle=this.config.circle_bg_color;this.data.attributes.context.stroke()}var o,u,a;var f=-.5*Math.PI;var l=2*Math.PI;o=f+this.config.start_angle/360*l;var c=2*i*Math.PI;if(this.config.direction==="Both"){a=false;o-=c/2;u=o+c}else{if(this.config.direction==="Clockwise"){a=false;u=o+c}else{a=true;u=o-c}}this.data.attributes.context.beginPath();this.data.attributes.context.arc(e,t,this.data.attributes.radius,o,u,a);this.data.attributes.context.lineWidth=this.data.attributes.line_width;this.data.attributes.context.strokeStyle=r;this.data.attributes.context.stroke()};y.prototype.radialFade=function(e,n,r,i,s){var o=f(r);var u=this;var a=.2*(i===1?-1:1);var l;for(l=0;i<=1&&i>=0;l++){(function(){var r=50*l;var s="rgba("+o.r+", "+o.g+", "+o.b+", "+Math.round(i*10)/10+")";t.setTimeout(function(){u.drawArc(e,n,s,1)},r)})();i+=a}if(typeof s!==undefined){t.setTimeout(function(){u.data.state.fading[s]=false},50*l)}};y.prototype.timeLeft=function(){if(this.data.paused&&typeof this.data.timer==="number"){return this.data.timer}var e=new Date;return(this.data.attributes.ref_date-e)/1e3};y.prototype.start=function(){t.cancelAnimationFrame(this.data.animation_frame);t.clearTimeout(this.data.animation_frame);var n=e(this.element).data("date");if(typeof n==="undefined"){n=e(this.element).attr("data-date")}if(typeof n==="string"){this.data.attributes.ref_date=p(n)}else if(typeof this.data.timer==="number"){if(this.data.paused){this.data.attributes.ref_date=(new Date).getTime()+this.data.timer*1e3}}else{var r=e(this.element).data("timer");if(typeof r==="undefined"){r=e(this.element).attr("data-timer")}if(typeof r==="string"){r=parseFloat(r)}if(typeof r==="number"){this.data.timer=r;this.data.attributes.ref_date=(new Date).getTime()+r*1e3}else{this.data.attributes.ref_date=this.config.ref_date}}this.data.paused=false;this.update.call(this)};y.prototype.restart=function(){this.data.timer=false;this.start()};y.prototype.stop=function(){if(typeof this.data.timer==="number"){this.data.timer=this.timeLeft(this)}this.data.paused=true;t.cancelAnimationFrame(this.data.animation_frame)};y.prototype.destroy=function(){this.clearListeners();this.stop();t.clearInterval(this.data.interval_fallback);this.data.interval_fallback=null;this.container.remove();e(this.element).removeAttr("data-tc-id");e(this.element).removeData("tc-id")};y.prototype.setOptions=function(n){if(this.config===null){this.default_options.ref_date=new Date;this.config=e.extend(true,{},this.default_options)}e.extend(true,this.config,n);if(this.config.use_top_frame){t=window.top}else{t=window}m();this.data.total_duration=this.config.total_duration;if(typeof this.data.total_duration==="string"){if(typeof a[this.data.total_duration]!=="undefined"){this.data.total_duration=a[this.data.total_duration]}else if(this.data.total_duration==="Auto"){for(var r=0;r<Object.keys(this.config.time).length;r++){var i=Object.keys(this.config.time)[r];if(this.config.time[i].show){this.data.total_duration=a[u[i]];break}}}else{this.data.total_duration=a["Years"];console.error("Valid values for TimeCircles config.total_duration are either numeric, or (string) Years, Months, Days, Hours, Minutes, Auto")}}};y.prototype.addListener=function(e,t,n){if(typeof e!=="function")return;if(typeof n==="undefined")n="visible";this.listeners[n].push({func:e,scope:t})};y.prototype.notifyListeners=function(e,t,n,r){for(var i=0;i<this.listeners[r].length;i++){var s=this.listeners[r][i];s.func.apply(s.scope,[e,t,n])}};y.prototype.default_options={ref_date:new Date,start:true,animation:"smooth",count_past_zero:false,circle_bg_color:"#2A3F55",use_background:true,fg_width:.08,bg_width:1.2,text_size:.09,total_duration:"Auto",direction:"Clockwise",use_top_frame:false,start_angle:0,time:{Days:{show:true,text:"Ngày",color:"#FE6464"},Hours:{show:true,text:"Giờ",color:"#FE6464"},Minutes:{show:true,text:"Phút",color:"#FE6464"},Seconds:{show:true,text:"Giây",color:"#7BFD64"}}};var b=function(e,t){this.elements=e;this.options=t;this.foreach()};b.prototype.getInstance=function(t){var n;var r=e(t).data("tc-id");if(typeof r==="undefined"){r=h();e(t).attr("data-tc-id",r)}if(typeof v[r]==="undefined"){var i=this.options;var s=e(t).data("options");if(typeof s==="string"){s=JSON.parse(s)}if(typeof s==="object"){i=e.extend(true,{},this.options,s)}n=new y(t,i);v[r]=n}else{n=v[r];if(typeof this.options!=="undefined"){n.setOptions(this.options)}}return n};b.prototype.addTime=function(e){this.foreach(function(t){t.addTime(e)})};b.prototype.foreach=function(e){var t=this;this.elements.each(function(){var n=t.getInstance(this);if(typeof e==="function"){e(n)}});return this};b.prototype.start=function(){this.foreach(function(e){e.start()});return this};b.prototype.stop=function(){this.foreach(function(e){e.stop()});return this};b.prototype.restart=function(){this.foreach(function(e){e.restart()});return this};b.prototype.rebuild=function(){this.foreach(function(e){e.initialize(false)});return this};b.prototype.getTime=function(){return this.getInstance(this.elements[0]).timeLeft()};b.prototype.addListener=function(e,t){if(typeof t==="undefined")t="visible";var n=this;this.foreach(function(r){r.addListener(e,n.elements,t)});return this};b.prototype.destroy=function(){this.foreach(function(e){e.destroy()});return this};b.prototype.end=function(){return this.elements};e.fn.TimeCircles=function(e){return new b(this,e)}})(jQuery);