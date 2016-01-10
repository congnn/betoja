/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
//    $('.e_wrap_scroll').slimScroll({
//    });
    $('.e_select_submit').change(function () {
        update_total_register_schedule();
    });
    $(window).scroll(function () {
        var height_scrollTop = $(window).scrollTop();
        if (height_scrollTop > 150) {
            $('#i_row_data_title').show();
            $('.e_row_data_title').hide();
        } else {
            $('#i_row_data_title').hide();
            $('.e_row_data_title').show();
        }
    });
    
    setInterval(function(){
        update_total_register_schedule();
    }, 8500);
    
});

function update_total_register_schedule() {
    $('#total_register_filter_form').ajaxSubmit({
        dataType: 'html',
        success: function (data) {
            $(".e_total_register_schedule").html(data);
        }
    });
}