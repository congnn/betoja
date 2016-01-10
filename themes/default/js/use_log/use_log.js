$(document).ready(function(){
    $(document).on('click', '.e_update_record', update_record);
});

function update_record(e){
    e.preventDefault();
    var obj = $(this);
    obj.removeClass('e_update_record');
    var url = obj.attr('href');
    show_ajax_loading($('.e_data_table'));
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: {
            // number: number_form
        },
        success: function (data) {
            default_response(data);
            creat_ajax_table($('.e_data_table'));
        },
        error: function (a, b, c) {
            alert(a + b + c);
        },
        complete: function (jqXHR, textStatus) {

        }
    });
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