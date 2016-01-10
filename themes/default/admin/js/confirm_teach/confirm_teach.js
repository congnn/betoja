$(document).ready(function() {
//    $(document).on("click", "span.remove_hour", remove_hour);
//    $(document).on("click", "input.topica", val_topica);
//    $(document).on("click", 'span.add_hour', add_hour);
    $(document).on("click", 'td.e_check', check);
});

function remove_hour() {
    var obj = $(this);
    var remove_conf = obj.parent();
    var topica_conf = remove_conf.siblings('span.topica_conf');
    var hidden = topica_conf.find('input[name="free[]"]');
    var topica = topica_conf.find('input.topica');
    var span = topica.parent();
    var week = (topica.val()).substring(1, (topica.val()).length - 1);
    var add_conf = remove_conf.siblings('span.add_conf');
    span.removeAttr('class');
    if (!hidden.val()) {
        var hidden = topica_conf.find('input[name="add[]"]');
        hidden.remove();
    }
    topica.val('0' + week + '0');
    hidden.val('0' + week + '0');
    topica.removeAttr('checked');
    add_conf.attr('style', 'display: block;');
    topica_conf.attr('style', 'display: none;width: 22px;');
    remove_conf.attr('style', 'display: none;width: 22px;margin-top: -25px;padding-left: 55px;');
}

function add_hour() {
    var obj = $(this);
    var add_conf = obj.parent();
    var topica_conf = add_conf.siblings('span.topica_conf');
    var hidden = topica_conf.find('div.checker');
    var free = topica_conf.find('input[name="free[]"]');
    var topica = topica_conf.find('input.topica');
    var remove_conf = add_conf.siblings('span.remove_conf');
    var week = (topica.val()).substring(1, (topica.val()).length - 1);
    if (!free.val()) {
        hidden.before('<input type="hidden" name="add[]" value="0' + week + '">');
    } else {
        free.val('0' + week + '1');
        topica.val('0' + week + '1');
    }
    add_conf.attr('style', 'display: none;');
    topica_conf.attr('style', 'display: block;width: 22px;');
    remove_conf.attr('style', 'display: block;width: 22px;margin-top: -25px;padding-left: 55px;');
}

function val_topica() {
    var obj = $(this);
    var topica_conf = obj.parents('span.topica_conf');
    var hidden = topica_conf.find('input[type="hidden"]');
    var val = (obj.val()).substring(0, 1);
    var week = (obj.val()).substring(1, (obj.val()).length);
    if (val == 1) {
        obj.attr("value", "0" + week);
        hidden.val("0" + week);
        obj.attr("title", "Not Topica");
    } else {
        obj.attr("value", "1" + week);
        hidden.val("1" + week);
        obj.attr("title", "Topica");
    }
}

function check() {
    var obj = $(this);
    var input = obj.find('input[type="hidden"]');
    var add = obj.find('input[name="add[]"]');
    var span = obj.find('span');
    var div = obj.find('div.e_top');
    var week = (span.attr('value')).substring(1, (span.attr('value')).length - 1);
    var attr = input.attr('value');
    var color = obj.attr('style');
    if (color == "background-color: #00FF00;") {
        obj.attr('style', '');
        input.attr('style', '');
        input.attr('value', '0'+week+'0');
        span.attr('value', '0'+week+'0');
        div.attr('style','');
        add.remove();
    } else if (color == 'background-color: yellow;') {
        input.attr('value', '1'+week+'1');
        span.attr('value', '1'+week+'1');
        obj.attr('style', 'background-color: #00FF00;');
        div.attr('style','display: block;background: url(themes/default/plugins/forms/uniform/images/free.png) 0px -22px');
    } else {
        input.attr('value', '0'+week+'1');
        span.attr('value', '0'+week+'1');
        obj.attr('style', 'background-color: yellow;');
        div.attr('style','display: block;background: url(themes/default/plugins/forms/uniform/images/free.png) 0px -0px');
    }
    if (attr == undefined) {
        span.after('<input type="hidden" style="display: block;" name="add[]" value="'+span.attr('value')+'">');
    }
}
