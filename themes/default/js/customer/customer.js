/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {

});

function default_response(data, obj) {
    var jgrow = "error";
    if (data.state == 1) {
        jgrow = "success";
        obj.parents(".modal_content").modal("hide");
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

function process_deposit_value() {
    var obj = $('.e_deposit_value');
    if (obj.val() == '') {
        value = 0;
    } else {
        var value_tmp = parseInt(obj.val());
        var value = 0;
        if (value_tmp <= parseInt(obj.attr('max')) && value_tmp >= 0) {
            value = (value_tmp.toString()).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            value = value + ' VNĐ';
        } else {
            value = 'Số tiền đã nhập không hợp lệ !';
        }
    }
    var span = obj.parent().find('#i_value');
    span.html(value);
}

