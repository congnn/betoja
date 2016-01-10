$(document).ready(function () {
    setTimeout(get_table_skeleton, 500);
    setInterval(function(){
        var d = new Date();
        var minutes = d.getMinutes();
        if(minutes >= 45 && minutes <= 55){
            get_table_data();
        }
    }, 20000);
    $(document).on("click", "#btn_refresh", function(){
        get_table_data(); 
    });
    
    $(document).on("change", "#i_select_teacher_type, #i_select_year, #i_select_week, #i_select_week_day, #i_select_hour_teach", function(e){
        get_table_data();
    });
    
    $(document).on("click", "#btn_export_teco260", function (e) {
        var export_url = $(this).attr("data-url");
        var condition_form = $("#teco260_filter");
        condition_form.attr("action", export_url);
        condition_form.submit();
    });
});

function get_table_skeleton(){
    var ajax_get_table_skeleton_url = $("#table_rp").attr('ajax_get_table_skeleton_url');
    $.ajax({
        url: ajax_get_table_skeleton_url,
        dataType: "html",
        success: function (response) {
            $("#table_rp").html(response);
            $("#table_rp").show();
            get_table_data();
        }
    });
}

function get_table_data() {
    var ajax_get_table_data_url = $("#table_rp").attr('ajax_get_table_data_url');
    $("#teco260_filter").attr("action", ajax_get_table_data_url);
    $("#teco260_filter").ajaxSubmit({
        dataType: "json",
        success: function (response) {
            var table_data = response.table_data;
            $("#table_rp td").html("-");
            $("#table_rp td").removeAttr("style");
            $.each(table_data, function (cellAddr, cellObj) {
                var cell = $("#" + cellAddr);
                $.each(cellObj.attrs, function(attr_name, attr_value){
                    cell.attr(attr_name, attr_value);
                });
                cell.html(cellObj.value);
            });
        }
    });
}