/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $('.table_package').dataTable({
    });
});

function active_package_response(data, obj) {
    default_response(data);
    if (data.state == 1) {
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
}

function do_ajax_link(e, source_obj) {
    e.preventDefault();
    var obj;
    if (source_obj) {
        obj = source_obj;
    } else {
        obj = $(this);
    }
    var url = obj.attr("href");
    var data = obj.attr("data");
    
    if (data) {
        data = JSON.parse(obj.attr("data"));
    }
   
    if (obj.hasClass("e_ajax_confirm")) {
        $("<div title='Bạn chắc chắn?'>").html(obj.attr('msg')).dialog({
            resizable: false,
            height: 180,
            modal: true,
            buttons: {
                "Chắc chắn": function () {
                   
                    call_ajax_link(url, data, obj);
                    $(this).dialog("destroy");
                },
                "Thôi": function () {
                    $(this).dialog("destroy");
                }
            },
            close: function () {
                $(this).dialog("destroy");
            }
        });
    } else {
        call_ajax_link(url, data, obj);
    }
}

function default_response(data) {
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
}
function disable_f12_right_click() {
    //////////F12 disable code////////////////////////
    document.onkeypress = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
            //alert('No F-12');
            return false;
        }
    }
    document.onmousedown = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
            //alert('No F-keys');
            return false;
        }
    }
    document.onkeydown = function (event) {
        event = (event || window.event);
        if (event.keyCode == 123) {
            //alert('No F-keys');
            return false;
        }
    }
    var message = "Sorry, right-click has been disabled";
/////////////////////////////////// 
    function clickIE() {
        if (document.all) {
            (message);
            return false;
        }
    }
    function clickNS(e) {
        if
                (document.layers || (document.getElementById && !document.all)) {
            if (e.which == 2 || e.which == 3) {
                (message);
                return false;
            }
        }
    }
    if (document.layers)
    {
        document.captureEvents(Event.MOUSEDOWN);
        document.onmousedown = clickNS;
    }
    else {
        document.onmouseup = clickNS;
        document.oncontextmenu = clickIE;
    }
    document.oncontextmenu = new Function("return false");
}