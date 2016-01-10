/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
   
  $('#wizard').smartWizard({
            onLeaveStep: leaveAStepCallback,
            onShowStep: null,
            autoHeight: true,
        });
         $('.tab_select .selected .img_bg').css('display','block');
        $('.actionBar').css('display','none');
        if($('.tab_2').hasClass('disabled')){
            
            $('.tab_2').removeClass('disabled');
             $('.tab_2').attr('isdone','1');
        }
        
        $(window).scroll(function(){
            var scrollTop = 250;
            if($(window).scrollTop() <= scrollTop){
                $('.count_down_head').removeAttr('style');
                 
            }
            if($(window).scrollTop() > scrollTop){
                 $('.count_down_head').css({
                        display: 'block'
                  
                });  
            }
        });

  
    
    var list_div = $('.right_content .span3.item');
    list_div.click(function () {
        var _this = $(this);
        var list_item = _this.parent().find('div.span3.item');
        $.each(list_item, function (index, value) {
            $(this).css({'width': '18%'});
            $(this).find('div.title').removeClass('changed');
            $(this).find('div.content').removeClass('changed');
        });
        _this.css({'width': '46%'});
        _this.find('div.title').addClass('changed');
        _this.find('div.content').addClass('changed');
    });
    
    
    var time_count = $('.e_time_count');
    $.each(time_count, function (index, value) {
        var time = $(this).attr('time');
        if (time > 0) {
            $(this).countdown({
                until: time,
                onTick: check_time,
                onExpiry: countdown_complete,
            });
        }
    });
    
    
    var time_count_up = $('.e_time_count_up');
    $.each(time_count_up, function (index, value) {
        var time_up = $(this).attr('time_up');
        var time_since = $(this).attr('time_since');
       
        if (time_up > 0) {
            $(this).countdown({
                until: 0,
                since:-time_since,
                onTick: check_time,
                onExpiry: countdown_complete,
            });
        }
    });
    
    
    $('.list_room').mCustomScrollbar({
        theme: 'minimal-dark',
        advanced: {
            updateOnContentResize: true
        }
    });
    autocomplete();
});
function leaveAStepCallback(obj) {
//    $('.tab_select .img_bg').css('display','block');
//    $('.tab_select .selected .img_bg').css('display','none');
    return true;
}
function autocomplete() {
    // Autocomplete
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _renderMenu: function (ul, items) {
            var that = this,
                    currentCategory = "";
            $.each(items, function (index, item) {
                if (item.category != currentCategory) {
                    ul.append("<li class='ui-autocomplete-category'>" + item.category + "</li>");
                    currentCategory = item.category;
                }
                that._renderItemData(ul, item);
            });
        },
        _renderItem: function (ul, item) {
            return $("<li></li>")
                    .data("item.autocomplete", item)
                    .append("<a>" + item.label + "</a>")
                    .appendTo(ul);
        }
    });
    $(document).on("click", 'input#i_contact_name', function () {
        var obj = $(this);
        var data_url = $(this).attr("data-url");
        var source = [];
        var meetingId = $('#i_meetingid').val();
        // Lay data
        $.ajax({
            url: data_url,
            method: "POST",
            dataType: "json",
            data: {
                meetingid: meetingId
            },
            success: function (response) {
                $.each(response.list_contact, function (k, contact) {
                    var contact_tmp = {
                        value: contact.contact_name,
                        name: contact.contact_name,
                        category: "Lựa chọn",
                        label: contact.contact_name,
                        email: contact.contact_email,
                    };
                    source.push(contact_tmp);
                });
            }
        });
        $(this).catcomplete({
            minLength: 0,
            source: source,
            change: function (event, ui) {

            },
            select: function (event, ui) {
                obj.val(ui.item.name);
                $('input[name=contact_email]').val(ui.item.email);
                return false;
            }
        });
        $('ul.ui-autocomplete').css({'z-index': '1070'});
        $(this).keydown();
    });
}

function check_time(periods) {
    if ($.countdown.periodsToSeconds(periods) == (15 * 60)) {
        var parent = $(this).parents('div.span12.item');
        var enter_room = parent.find('div.enter_class a');
        var link = enter_room.attr('link');
        if (!enter_room.hasClass('go_to_room')) {
            enter_room.addClass('go_to_room');
            $("a.go_to_room").bind("click", function () {
                window.open(link, '_self');
            });
        }
        if (enter_room.attr('href') == '#') {
            enter_room.attr('href', link);
        }
        window.location.reload();
    }
}

function countdown_complete() {
    window.location.reload();
}

function add_save_member_response(data) {
    var jgrow = "error";
    if (data.state == 1) {
        jgrow = "success";
    }
    if (data.error) {
        show_error(data.error);
    }

    $.jGrowl("<i class='icon16 i-checkmark-3'></i> " + data.msg, {
        group: jgrow,
        position: 'top-right',
        sticky: false,
        closeTemplate: '<i class="icon16 i-close-2"></i>',
        animateOpen: {
            width: 'show',
            height: 'show'
        }
    });
    var form = $('.e_ajax_submit');
    form.parents(".modal_content").modal("hide");
    var member_item = "<div class='span4 member_item'>\n\
                      <p title='" + data.username + "'>" + data.username + "</p></div>";
    $('.wrap_content_list').append(member_item);
}
function show_link_invite(link,user) {
        $("<div title='Link invite "+user+":'>").html(link).dialog({
            resizable: false,
            height: 180,
            width:600,
            modal: true,
            buttons: {
               
            },
            close: function() {
                $(this).dialog("destroy");
            }
        });
  
}
