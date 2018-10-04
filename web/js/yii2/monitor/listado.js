var startDateRange = null;
var endDateRange = null;

$(document).ready(initListado);


function initListado() {
    initDateRangerPicker();
    getListado();
    $("#seleccionar-todo-listado").click(function () {
        $(".check-listado").prop("checked", $("#seleccionar-todo-listado").prop("checked"));
    });
    $("#btn-listado-marcar-visto").click(setVisto);
    $("#btn-cargar-listado").click(getListado);
    $("#select-visto").change(getListado);
    $("#select-nivel").change(getListado);
}

function getListado() {
    $("#tabla-log > tbody").html('<tr><td class="text-center" colspan="6"><div class="loader"></div><div class="mt-2">Cargando listado</div></tr>');

    var datos = {
        id: id_monitor,
        visto: parseInt($("#select-visto").val()),
        nivel: parseInt($("#select-nivel").val()),
        startDateRange: startDateRange,
        endDateRange: endDateRange
    };

    $.get(baseURL + '/monitor/listado/get-listado', datos, null, 'json')
            .done(function (data) {
                if (!data['error']) {
                    $("#tabla-log > tbody").empty();
                    for (i = 0; i < data['listado'].length; i++) {
                        var nivel = '';
                        switch (parseInt(data['listado'][i]['nivel'])) {
                            case 1:
                                nivel = 'table-danger';
                                break;
                            case 4:
                                nivel = 'table-warning';
                                break;
                        }

                        var visto = (parseInt(data['listado'][i]['visto']) === 0) ? 'font-weight-bold' : '';
                        $("#tabla-log > tbody").append('\
                            <tr class="' + nivel + ' ' + visto + '" row-data-id-linea="' + data['listado'][i]['id'] + '">\n\
                                <td class="text-center"><input class="check-listado" type="checkbox" data-id-linea="' + data['listado'][i]['id'] + '"></td>\n\
                                <td>' + data['listado'][i]['fecha'] + '</td>\n\
                                <td class="text-center">' + data['listado'][i]['nivel'] + '</td>\n\
                                <td>' + data['listado'][i]['categoria'] + '</td>\n\
                                <td><div class="listado-ip">' + data['listado'][i]['ip'] + '</div></td>\n\
                                <td><div class="listado-mensaje">' + data['listado'][i]['mensaje'] + '</div></td>\n\
                            </tr>');
                    }


                    $(".check-listado").click(function (e) {
                        e.stopPropagation();
                    });

                    $("#tabla-log > tbody > tr").unbind('click');
                    $("#tabla-log > tbody > tr").click(function () {
                        window.location.href = baseURL + '/monitor/detalle/index?id=' + id_monitor + '&d=' + $(this).attr('row-data-id-linea');
                    });
                }
            })
            .always(function (data) {

            })
            .fail(function (data) {
                $("#tabla-log > tbody").html('<tr><td class="text-center" colspan="6"><span class="badge badge-danger mr-2">¡FALLO!</span></tr>');
            });

}

function setVisto() {
    var seleccionados = $(".check-listado:checked").get();
    var arrayID = new Array();
    if (seleccionados.length > 0) {
        for (i = 0; i < seleccionados.length; i++) {
            arrayID.push(parseInt($(seleccionados[i]).attr('data-id-linea')));
            var fila = $('[row-data-id-linea=' + $(seleccionados[i]).attr('data-id-linea') + ']').get();
            $(fila).find('td:nth-child(1)').html('<div class="loader-visto loader-xs" style="display: block;"></div>');

        }

        var datos = {
            id: id_monitor,
            seleccionados: arrayID
        };

        $.post(baseURL + '/monitor/listado/set-visto', datos, null, 'json')
                .done(function (data) {
                    if (!data['error']) {
                        for (i = 0; i < data['ids'].length; i++) {
                            var fila = $('[row-data-id-linea=' + data['ids'][i] + ']').get();
                            //<input class="check-listado" type="checkbox" data-id-linea="' + data['listado'][i]['id'] + '">
                            $(fila).find('td:nth-child(1)').html('<input class="check-listado" type="checkbox" data-id-linea="' + data['ids'][i] + '">');
                            if (parseInt(parseInt($("[name=inlineRadioOptions]:checked").val())) === 1) {
                                $(fila).remove();
                            } else {
                                $(fila).removeClass('font-weight-bold');
                            }
                        }
                        $(".check-listado").click(function (e) {
                            e.stopPropagation();
                        });
                    }
                })
                .always(function (data) {
                    $(".loader-visto").remove();
                    $(".check-listado").prop("checked", false);
                    $("#seleccionar-todo-listado").prop("checked", false);
                })
                .fail(function (data) {

                });
    }
}

function initDateRangerPicker() {
    moment.locale('es');
    var start = moment().subtract(6, 'days');
    var end = moment();
    end.set({hour: 23, minute: 59, second: 59});   
    
    startDateRange = start.unix();
    endDateRange = end.unix();

    function cb(start, end) {
        $('#datarange-listado span').html(start.format('D MMMM YYYY') + ' - ' + end.format('D MMMM YYYY'));
    }

    $('#datarange-listado').daterangepicker({
        startDate: start,
        endDate: end,
        opens: 'left',
        locale: locale_daterangepicker_es,
        ranges: {
            'Hoy': [moment(), moment()],
            'Ayer': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Últimos 7 días': [moment().subtract(6, 'days'), moment()],
            'Últimos 30 días': [moment().subtract(29, 'days'), moment()],
            'Éste mes': [moment().startOf('month'), moment().endOf('month')],
            'Mes pasado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);


    $('#datarange-listado').on('apply.daterangepicker', function (e, picker) {
        startDateRange = picker.startDate.unix();
        
        var end = picker.endDate;
        end.set({hour: 23, minute: 59, second: 59});
        endDateRange = end.unix();
        
        getListado();
    });
}