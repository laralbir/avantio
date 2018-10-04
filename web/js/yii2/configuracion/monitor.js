$(document).ready(initMonitor);


function initMonitor() {
    getMonitores();
    $(".reveal").on('click', function () {
        var $pwd = $("#monitor-token");
        if ($pwd.attr('type') === 'password') {
            $pwd.attr('type', 'text');
        } else {
            $pwd.attr('type', 'password');
        }
    });
}


function getMonitores() {


    $.post(baseURL + '/configuracion/monitor/get-monitores', null, null, 'json')
            .done(function (data) {
                if (!data['error']) {

                    $("#jsGrid-monitores").jsGrid({
                        width: "100%",
                        height: "400px",
                        inserting: false,
                        editing: false,
                        sorting: false,
                        paging: true,

                        data: data['monitores'],

                        fields: [
                            {name: "descripcion", title: "Descripcion", type: "text", validate: "required"},
                            {name: "url", title: "URL", type: "text", editing: false, width: '50px'},
                            {name: "token", title: "TOKEN", type: "text", editing: false, width: '50px'},
                            {type: "control", editButton: false, eleteButton: false, clearFilterButton: false, width: 10,
                                headerTemplate: function () {
                                    return $('<button class="btn btn-sm btn-success"><i class="fas fa-tv"></i></button>')
                                            .on("click", function () {
                                                $("#frm-monitor-nuevo").trigger('reset');
                                                $("#frm-monitor-nuevo").unbind('submit');
                                                $("#frm-monitor-nuevo").submit(function (e) {
                                                    console.log("Set monitor nuevo");
                                                    e.preventDefault();
                                                    setMonitorNuevo();
                                                });
                                                $('#modal-monitor-nuevo').modal();
                                            });
                                }
                            }
                        ],
                        onItemDeleted: function (args) {
                            delMonitor(args.item.id);
                        }
                    });
                }

                $('[data-toggle="tooltip"]').tooltip();
            })
            .fail(function (e) {

            })
            .always(function () {

            });

}


function setMonitorNuevo() {

    var arrayPOST = {
        descripcion: $("#monitor-descripcion").val(),
        url: $("#monitor-url").val(),
        token: $("#monitor-token").val()
    };

    $.post(baseURL + '/configuracion/monitor/set-monitor-nuevo', arrayPOST, null, 'json')
            .done(function (data) {
                console.log(data);

                if (!data['error']) {
                    getMonitores();
                    $('#modal-monitor-nuevo').modal('hide');
                }

                $('[data-toggle="tooltip"]').tooltip();
            })
            .fail(function (e) {

            })
            .always(function () {

            });
}

function delMonitor(id) {
    var arrayPOST = {
        id: id
    };

    $.post(baseURL + '/configuracion/monitor/del-monitor', arrayPOST, null, 'json')
            .done(function (data) {
                console.log(data);

                if (!data['error']) {
                    getMonitores();
                    $('#modal-monitor-nuevo').modal('hide');
                }

                $('[data-toggle="tooltip"]').tooltip();
            })
            .fail(function (e) {

            })
            .always(function () {

            });
}