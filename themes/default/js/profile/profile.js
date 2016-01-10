/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function save_form_edit_user_response(data, form, button) {
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
    setTimeout(function () {
        location.reload();
    }, 1500);

}

