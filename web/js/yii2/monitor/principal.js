var monitores = null;
var xhrArray = new Array();


$(document).ready(initMonitorMain);



function initMonitorMain() {
    $("#btn-cargar-resumen-monitores").click(function () {
        getResumenMonitores();
    });
    getMonitores();
}


function getMonitores() {
    $.get(baseURL + '/monitor/principal/get-monitores', null, null, 'json')
            .done(function (data) {
                if (!data['error']) {
                    monitores = data['monitores'];
                    $("#tabla-monitor-principal > tbody").empty();
                    for (i = 0; i < monitores.length; i++) {
                        $("#tabla-monitor-principal > tbody").append(
                                '<tr fila-id-monitor="' + monitores[i]['id'] + '">\n\
                                <td>' + monitores[i]['descripcion'] + '</td>\n\
                                <td class="text-center"><span data-id="' + monitores[i]['id'] + '" class="badge badge-pill badge-danger badge-xl alerta-error">0</span></td>\n\
                                <td class="text-center"><span data-id="' + monitores[i]['id'] + '" class="badge badge-pill badge-warning badge-xl alerta-aviso">0</span></td>\n\
                            </tr>'
                                );
                    }
                    $(".alerta-error").click(function(e){
                       e.stopPropagation();
                       window.location.href = baseURL + '/monitor/listado/' + $(this).attr("data-id")+"?n=1&v=1";
                    });
                    $(".alerta-aviso").click(function(e){
                       e.stopPropagation();
                       window.location.href = baseURL + '/monitor/listado/' + $(this).attr("data-id")+"?n=4&v=1";
                    });
                    getResumenMonitores();
                }
            })
            .always(function (data) {

            })
            .fail(function (data) {

            });
}

function getResumenMonitores() {
    abortarXHR(xhrArray);
    for (i = 0; i < monitores.length; i++) {
        var fila = $('[fila-id-monitor=' + monitores[i]['id'] + ']').get();

        $(fila).find('td:nth-child(1)').find('span').remove();
        $(fila).find('td:nth-child(1)').find('div').remove();
        $(fila).find('td:nth-child(1)').prepend('<div class="loader-xs mr-2"></div>');
        var datos = {id: monitores[i]['id']};

        var xhr = $.get(baseURL + '/monitor/principal/get-resumen-monitor', datos, null, 'json')
                .done(function (data) {
                    var fila = $('[fila-id-monitor=' + data.id_monitor + ']').get();
                    $(fila).removeClass("table-danger");
                    $(fila).removeClass("table-warning");
                    if (!data['error']) {
                        if (data['resumen']['total_errores'] > 0) {
                            $(fila).addClass("table-danger");
                        } else if (data['resumen']['total_avisos'] > 0) {
                            $(fila).addClass("table-warning");
                        }
                        $(fila).find('td:nth-child(2)').find('span').html(data['resumen']['total_errores']);
                        $(fila).find('td:nth-child(3)').find('span').html(data['resumen']['total_avisos']);
                    } else {
                        $(fila).find('td:nth-child(1)').prepend('<span class="badge badge-danger mr-2">¡FALLO!</span>');
                        $(fila).find('td:nth-child(2)').find('span').html('0');
                        $(fila).find('td:nth-child(3)').find('span').html('0');
                    }
                })
                .always(function (data) {
                    var fila = $('[fila-id-monitor=' + data.id_monitor + ']').get();
                    $(fila).find('td:nth-child(1)').find('div').remove();
                })
                .fail(function (data) {
                    var fila = $('[fila-id-monitor=' + data.id_monitor + ']').get();
                    $(fila).find('td:nth-child(1)').prepend('<span class="badge badge-danger mr-2">¡FALLO!</span>');
                });
        xhr.id_monitor = monitores[i]['id'];
        xhrArray.push(xhr);
    }
    
    $("#tabla-monitor-principal > tbody > tr").unbind('click');
    $("#tabla-monitor-principal > tbody > tr").click(function(){
        window.location.href= baseURL + '/monitor/listado/' + $(this).attr('fila-id-monitor');
    });
//    console.log(xhrArray);
}