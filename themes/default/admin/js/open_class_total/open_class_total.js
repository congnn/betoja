$(document).ready(function () {
    get_report_data();

    $(document).on("click", "#btn_refresh", function () {
        get_report_data();
    });
    $("#i_export_open_class").attr("href", $("#i_export_open_class").attr("url_excel")
            + "?week=" + $("#i_select_week").val() + "&year=" + $("#i_select_year").val()
            + "&teacher_group=" + $("#i_select_teacher_type").val());
    $(document).on("change", "select", function () {
        get_report_data();
    });
});

function get_report_data() {
    $("#total_register_filter_form").ajaxSubmit({
        dataType: "json",
        success: function (response) {
            $("#i_export_open_class").attr("href", $("#i_export_open_class").attr("url_excel")
                    + "?week=" + $("#i_select_week").val() + "&year=" + $("#i_select_year").val()
                    + "&teacher_group=" + $("#i_select_teacher_type").val());
            $("table#table_rp td").removeAttr("style");
            $("table#table_rp td").html("");
            var table_data = response.table_data;
            $.each(table_data, function (cellAddr, cellObj) {
                var cell = $("#" + cellAddr);
                cell.attr("colspan", cellObj.attrs.colspan);
                cell.attr("rowspan", cellObj.attrs.rowspan);
                cell.attr("style", cellObj.attrs.style);
                cell.attr("class", cellObj.attrs.class);
                cell.html(cellObj.value);
            });
        }
    });
}