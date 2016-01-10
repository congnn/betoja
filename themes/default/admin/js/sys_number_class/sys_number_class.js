$(document).ready(function () {
    $(document).on("change", '.e_select_number_class_submit', function () {
        var week = $('#i_select_week').val();
        var year = $('#i_select_year').val();
        var class_type = $('#i_select_class_type').val();
        var level_class = $('#i_select_level_class').val();
        var url = $(this).parents('form.e_ajax_submit').attr('data_url');
        var data = {
            'week': week,
            'year': year,
            'class_type': class_type,
            'level_class': level_class
        };
        show_ajax_loading($('.e_number_class_form'));
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
                $('.e_number_class_wrap').html(data.html);
            },
            complete: function (jqXHR, textStatus) {
                $('#i_img_loading').remove();
            },
            error: function (a, b, c) {
                alert('Có lỗi xảy ra');
            }
        });
    });
});