/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    //tong dang ky cua giao vien
    $('#total_num_register').html($('#total_num_register_hidden').val());
    //tong avai, fixed, backup dang ky
    $('#teacher_register').html($('#total_num_register_hidden').attr('teacher_register'));
    $('#total_num_register_avai').html($('#total_num_register_hidden').attr('avai'));
    $('#total_num_register_fixed').html($('#total_num_register_hidden').attr('fixed'));
    $('#total_num_register_backup').html($('#total_num_register_hidden').attr('backup'));

    //tong phan lich cho giao vien
    $('#total_num_registered').html($('#total_num_registered_hidden').val());
    $('.total_num_registered_vn').html($('#total_num_registered_hidden').val());
    //tong avai, fixed, backup dang ky
    $('#total_num_registered_avai').html($('#total_num_registered_hidden').attr('avai'));
    $('#total_num_registered_fixed').html($('#total_num_registered_hidden').attr('fixed'));
    $('#total_num_registered_backup').html($('#total_num_registered_hidden').attr('backup'));

    $(document).on("change", "#i_select_teacher_type, #i_select_year", function (e) {
        $("#total_register_filter_form").attr("action", "");
        $("#total_register_filter_form").submit();
    });

    $(document).on("change", "#i_select_week", function (e) {
        $('.e_datetime').val('');
        $("#total_register_filter_form").attr("action", "");
        $("#total_register_filter_form").submit();
    });

    $(document).on("click", "#btn_export_teacher_report_register", function (e) {
        var export_url = $(this).attr("data-url");
        var condition_form = $("#total_register_filter_form");
        condition_form.attr("action", export_url);
        condition_form.submit();
    });

    $("table").dataTable({
        "aaSorting": [[3, 'desc']],
        "iDisplayLength": 100
    });

    $(".e_datetime_from").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        numberOfMonths: 1,
        onClose: function (selectedDate) {
            $(".e_datetime_to").datepicker("option", "minDate", selectedDate);
        }
    });//cam giao dien kieu date time cho the thoi gian
    $(".e_datetime_to").datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true,
        numberOfMonths: 1,
        onClose: function (selectedDate) {
            $(".e_datetime_from").datepicker("option", "maxDate", selectedDate);
        }
    });//cam giao dien kieu date time cho the thoi gian
    $(window).scroll(function () {
        var height_scrollTop = $(window).scrollTop();
        if (height_scrollTop > 180) {
            var list_td_header = $('tr.header_fixed th');
            var list_td = $('tbody tr:first-child td');
            $.each(list_td, function (key, value) {
                $(list_td_header[key]).attr('width',parseInt($(this).width()+'px'));
            });
            $('.header_fixed').show();
        } else {
            $('.header_fixed').hide();
        }
    });
});

