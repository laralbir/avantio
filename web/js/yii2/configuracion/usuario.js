$(document).ready(initUsuario);


function initUsuario() {
    console.log("usuario");
    getUsuarios();
}


function getUsuarios() {
//    $("#tabla-usuarios > tbody").empty();
//    $("#tabla-usuarios > tbody").append('<tr><td colspan="3"></td></tr>');
//    setLoeader('#tabla-usuarios > tbody > tr > td', 'Cargando listado');
    $.post(baseURL + '/configuracion/usuario/get-usuarios', null, null, 'json')
            .done(function (data) {
                if (!data['error']) {
                    $("#jsGrid-usuarios").jsGrid({
                        width: "100%",
                        height: "400px",
                        inserting: false,
                        editing: false,
                        sorting: false,
                        paging: true,

                        data: data['usuarios'],

                        fields: [
                            {name: "description", title: "Descripcion", type: "text", validate: "required"},
                            {name: "username", title: "Ususario", type: "text", editing: false, width: '50px'},
                            {type: "control", deditButton: true, eleteButton: false, clearFilterButton: false, width: 10,
                                headerTemplate: function () {
                                    return $('<button class="btn btn-sm btn-success"><i class="fas fa-user-plus"></i></button>')
                                            .on("click", function () {
                                                $("#frm-usuario-nuevo").trigger('reset');
                                                $("#frm-usuario-nuevo").unbind('submit');
                                                $("#frm-usuario-nuevo").submit(function (e) {
                                                    e.preventDefault();
                                                    setUsuarioNuevo();
                                                });
                                                $('#modal-usuario-nuevo').modal();
                                            });
                                },
                                itemTemplate: function (value, item) {
                                    var $btnCambiarContrasena =
                                            $('<button class="btn btn-sm btn-success"><i class="fas fa-key"></i></button>')
                                            .click(function (e) {
//                                                alert("ID: " + item.id);
                                                $("#frm-contrasena-editar").trigger('reset');
                                                $("#frm-contrasena-editar").unbind('submit');
                                                $("#frm-contrasena-editar").submit(function (e) {
                                                    e.preventDefault();
                                                    setContrasenaNueva();
                                                });
                                                $("#id-usuario").val(item.id);
                                                $('#modal-cambiar-contrasena').modal();
                                                e.stopPropagation();
                                            });
                                    return $("<div>").append($btnCambiarContrasena);
                                }
                            }
                        ]
                    });
                }

                $('[data-toggle="tooltip"]').tooltip();
            })
            .fail(function (e) {

            })
            .always(function () {
//                delLoader();
            });
}


function setContrasenaNueva() {
    var arrayPOST = {
        'id-usuario': $("#id-usuario").val(),
        'contrasena': $("#contrasena-editar").val()
    };

    $.post(baseURL + '/configuracion/usuario/set-contrasena-nueva', arrayPOST, null, 'json')
            .done(function (data) {

            })
            .fail(function (e) {
            })
            .always(function () {
                $('#modal-cambiar-contrasena').modal('hide');
//                delLoader();
            });
}

function setUsuarioNuevo() {
    var arrayPOST = {
        descripcion: $("#descripcion-nueva").val(),
        usuario: $("#usuario-nueva").val(),
        contrasena: $("#contrasena-nueva").val()
    };

    $.post(baseURL + '/configuracion/usuario/set-usuario-nuevo', arrayPOST, null, 'json')
            .done(function () {
                getUsuarios();
                $('#modal-usuario-nuevo').modal('hide');
            })
            .fail(function (e) {

            })
            .always(function () {

            });
}


