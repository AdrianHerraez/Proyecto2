window.onload = function () {
    // Verificar si ya se ha mostrado el mensaje de bienvenida
    if (!localStorage.getItem('alertBienvenido')) {
        // Mostrar mensaje de bienvenida utilizando SweetAlert
        Swal.fire({
            title: 'Bienvenido <?php echo $username ?>',
            icon: 'success',
        });
        // Marcar que se ha mostrado el mensaje de bienvenida
        localStorage.setItem('alertBienvenido', 'true');
    }
};




/////////////////////////////////////////////////////////////////




function validarUsername(user) {
    if (user === "") { //Aquí valida si el campo del usuario está vacío
        document.getElementById("user").style.borderColor = "red";
        document.getElementById("errorUser").textContent = "El campo del usuario es obligatorio";
    } else if (!user.match(/^(?!.*\s)\b[A-Za-z0-9]{3,}\b/)) { // Aquí valida que el username contenga letras y numeros, no contenga espacios y que tenga como mínimo 3 caracteres
        document.getElementById("user").style.borderColor = "red";
        document.getElementById("errorUser").textContent = "Debes escribir mínimo 3 caracteres";
    } else {
        document.getElementById("errorUser").textContent = " ";
        document.getElementById("user").style.borderColor = "black";
    }
}

function validarNombre(nombre) {
    if (nombre === "") { //Aquí valida si el campo del usuario está vacío
        document.getElementById("nombre").style.borderColor = "red";
        document.getElementById("errorNombre").textContent = "El campo del usuario es obligatorio";
    } else if (!nombre.match(/^(?!.*\s)\b[A-Za-z]{3,}\b/)) { // Aquí valida que el username contenga letras y numeros, no contenga espacios y que tenga como mínimo 3 caracteres
        document.getElementById("nombre").style.borderColor = "red";
        document.getElementById("errorNombre").textContent = "Debes escribir mínimo 3 caracteres";
    } else {
        document.getElementById("errorNombre").textContent = " ";
        document.getElementById("nombre").style.borderColor = "black";
    }
}

function validarApellidos(apellidos) {
    if (apellidos === "") { //Aquí valida si el campo del usuario está vacío
        document.getElementById("apellidos").style.borderColor = "red";
        document.getElementById("errorApellidos").textContent = "El campo del apellido es obligatorio";
    } else if (!apellidos.match(/^(?!.*\s)\b[A-Za-z]{3,}\b/)) { // Aquí valida que el username contenga letras y numeros, no contenga espacios y que tenga como mínimo 3 caracteres
        document.getElementById("apellidos").style.borderColor = "red";
        document.getElementById("errorApellidos").textContent = "Debes escribir mínimo 3 caracteres";
    } else {
        document.getElementById("errorApellidos").textContent = " ";
        document.getElementById("apellidos").style.borderColor = "black";
    }
}

function validarPassword(pwd) {
    if (pwd === "") { //Aquí valida si el campo del password está vacío
        document.getElementById("pwd").style.borderColor = "red";
        document.getElementById("errorPwd").textContent = "El campo del password es obligatorio";
    } else if (pwd.length < 5) { //Aquí valida si la longitud del password tiene como mínimo 5 caracteres
        document.getElementById("pwd").style.borderColor = "red";
        document.getElementById("errorPwd").textContent = "Debes escribir mínimo 5 caracteres";
    } else {
        document.getElementById("errorPwd").textContent = " ";
        document.getElementById("pwd").style.borderColor = "black";
    }
}




/////////////////////////////////////////////////////////////////




function submitForm() {
    document.forms["formulario-filtros"].submit();
}

function limpiarForm() {
    var formulario = document.forms["formulario-filtros"];
    formulario.reset();
    updateContent();
}

function toggleFilters() {
    var filtroSalas = document.querySelectorAll('.filtro-salas');
    for (var i = 0; i < filtroSalas.length; i++) {
        filtroSalas[i].style.display = (filtroSalas[i].style.display === 'flex') ? 'none' : 'flex';
    }
}

function confirmarCerrarSesion() {
    // Muestra un cuadro de diálogo de confirmación
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres cerrar la sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        // Si el usuario confirma, redirecciona a la siguiente página
        if (result.isConfirmed) {
            window.location.href = './proc/cerrar-sesion.php';
        }
    });
}




/////////////////////////////////////////////////////////////////

var permiso = "";
var tipo_salax = "%";
var ocupacion_mesax = "%";

function PasarPermiso() {
    var formdata = new FormData();

    var ajax = new XMLHttpRequest();

    ajax.open('POST', 'proc/pasar-permiso.php');
    
    ajax.onload = function () {

        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            permiso = json.permiso;
        } else {
            console.error('Error al guardar cambios');
        }
    }
    ajax.send(formdata);
}


function ListarMesas(tipo_sala, ocupacion_mesa) {
    var listado = document.getElementById('listado');

    var formdata = new FormData();

    formdata.append('tipo_sala', tipo_sala);
    formdata.append('ocupacion_mesa', ocupacion_mesa);

    var ajax = new XMLHttpRequest();

    ajax.open('POST', 'proc/listado-index.php');

    ajax.onload = function () {
        // console.log('Respuesta del servidor:', ajax.responseText);

        var str = "";

        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var tabla = '';
            json.forEach(function (item) {
                str = "<tr><td>" + item.mesa.tipo_sala + "</td>";
                str +="<td>" + item.mesa.nombre_sala + "</td>";
                str += "<td>" + item.mesa.nombre_mesa + "</td>";

                if (permiso == "Admin" || permiso == "Mantenimiento") {
                    str += "<td>" + item.num_sillas_funcionales + "";
                    str += "<button type='button' class='btn btn-danger' onclick='ModificarSillas(" + item.mesa.id_mesa + ", \"rota\")'>Romper</button>";
                    str += "</td> ";
                    str += "<td>" + item.num_sillas_rotas + "";
                    str += "<button type='button' class='btn btn-success' onclick='ModificarSillas(" + item.mesa.id_mesa + ", \"funcional\")'>Reparar</button>";
                    str += "</td> ";
                } else {
                    str += "<td>" + item.num_sillas_funcionales + "";
                    str += "</td> ";
                    str += "<td>" + item.num_sillas_rotas + "";
                    str += "</td> ";
                }

                if (permiso == "Admin") {
                    str += "<td>";
                    str += "<button type='button' class='btn btn-success' onclick='ModificarSillas(" + item.mesa.id_mesa + ", \"añadir\")'>Añadir</button>";
                    str += "<button type='button' class='btn btn-danger' onclick='ModificarSillas(" + item.mesa.id_mesa + ", \"eliminar\")'>Eliminar</button>";
                    str += "</td> ";
                } else {
                    str += "<td>";
                    str += "</td> ";
                }

                if (permiso == "Admin" || permiso == "Mantenimiento") {
                    str += "<td>";
                    if (item.mesa.estado_mesa === "Rota") {
                        str += "<button type='button' class='btn btn-success' onclick='ModificarMesas(" + item.mesa.id_mesa + ", \"funcional\")'>Reparar</button>";
                    } else {
                        str += "<button type='button' class='btn btn-danger' onclick='ModificarMesas(" + item.mesa.id_mesa + ", \"rota\")'>Romper</button>";
                    }
                    str += "</td> ";

                } else {
                    str += "<td>";
                    if (item.mesa.estado_mesa === "Rota") {
                        str += "Rota";
                    } else {
                        str += "Funcional";
                    }
                    str += "</td> ";
                }

                if (permiso == "Admin" || permiso == "Camarero") {
                    str += "<td>";
                    if (item.mesa.estado_mesa === "Rota") {
                        str += "<button type='button' class='btn btn-danger'>En Reparacion</button>";
                    } else if (item.mesa.ocupacion_mesa === "Ocupada") {
                        str += "<button type='button' class='btn btn-danger' onclick='OcuparMesas(" + item.mesa.id_mesa + ", \"desocupar\")'>Desocupar</button>";
                    } else {
                        str += "<button type='button' class='btn btn-success' onclick='OcuparMesas(" + item.mesa.id_mesa + ", \"ocupar\")'>Ocupar</button>";
                    }
                    str += "<button type='button' class='btn btn-success' onclick='ReservarMesas(" + item.mesa.id_mesa + ", \"" + item.mesa.nombre_mesa + "\")'>Reservar</button>";
                    str += "</td> ";
                } else {
                    str += "<td>";
                    str += "</td> ";
                }

                str += "</tr>";
                tabla += str;
            });
            listado.innerHTML = tabla;

        } else {
            listado.innerText = 'Error';
        }
    }

    ajax.send(formdata);
}

function ModificarSillas(id_mesa, accion) {

    var formdata = new FormData();

    formdata.append('id_mesa', id_mesa);

    var ajax = new XMLHttpRequest();

    if (accion === "funcional") {
        ajax.open('POST', 'proc/reparar-sillas.php');
    } else if (accion === "rota"){
        ajax.open('POST', 'proc/romper-sillas.php');
    } else if (accion === "añadir"){
        ajax.open('POST', 'proc/añadir-sillas.php');
    } else if (accion === "eliminar"){
        ajax.open('POST', 'proc/eliminar-sillas.php');
    }
    
    ajax.onload = function () {
        console.log('Respuesta del servidor:', ajax.responseText);

        if (ajax.status == 200) {
            ListarMesas("%", "%");
        } else {
            console.error('Error al guardar cambios');
        }
    }

    ajax.send(formdata);

}

function ModificarMesas(id_mesa, accion) {
    var formdata = new FormData();

    formdata.append('id_mesa', id_mesa);
    formdata.append('accion', accion);

    var ajax = new XMLHttpRequest();

    ajax.open('POST', 'proc/modificar-mesas.php');
    
    ajax.onload = function () {
        console.log('Respuesta del servidor:', ajax.responseText);

        if (ajax.status == 200) {
            ListarMesas("%", "%");
        } else {
            console.error('Error al guardar cambios');
        }
    }

    ajax.send(formdata);
}

function OcuparMesas(id_mesa, accion) {
    var formdata = new FormData();

    formdata.append('id_mesa', id_mesa);
    formdata.append('accion', accion);

    var ajax = new XMLHttpRequest();

    ajax.open('POST', 'proc/ocupar-mesas.php');
    
    ajax.onload = function () {
        console.log('Respuesta del servidor:', ajax.responseText);

        if (ajax.status == 200) {
            ListarMesas("%", "%");
        } else {
            console.error('Error al guardar cambios');
        }
    }

    ajax.send(formdata);
}

function ReservarMesas(id_mesa, nombre_mesa) {
    Swal.fire({
        title: 'Reservar' + nombre_mesa +'',
        html: `
        <form id="form-reserva">
            <label for="fecha_hora_inicio">Fecha y Hora de inicio:</label>
            <input type="datetime-local" id="fecha_hora_inicio" required>
            <br><br>
            <label for="fecha_hora_fin">Fecha y Hora de fin:</label>
            <input type="datetime-local" id="fecha_hora_fin" required>
            <br><br>
            <button type="button" onclick="RealizarReserva(${id_mesa})">Reservar</button>
        </form>
        `,
        showCancelButton: true,
        showConfirmButton: false
    });

    ajax.send(formdata);
}

function RealizarReserva(id_mesa) {
    var hora_inicio = document.getElementById('hora_inicio').value;
    var hora_fin = document.getElementById('hora_fin').value;

    var formdata = new FormData();
    formdata.append('id_mesa', id_mesa);
    formdata.append('hora_inicio', hora_inicio);
    formdata.append('hora_fin', hora_fin);

    var ajax = new XMLHttpRequest();
    ajax.open('POST', 'proc/reservar-mesas.php');

    ajax.onload = function () {
        if (ajax.status == 200) {
            ListarMesas("%", "%");
            Swal.close();
        } else {
            console.error('Error al guardar cambios');
        }
    }

    ajax.send(formdata);
}


/////--------------------------------------------------------------------------


function ListarPersonal(username_personal, tipo_personal) {
    var listado = document.getElementById('personal-listado');

    var formdata = new FormData();

    console.log(username_personal, tipo_personal);

    formdata.append('username_personal', username_personal);
    formdata.append('tipo_personal', tipo_personal);

    var ajax = new XMLHttpRequest();

    ajax.open('POST', 'proc/listado-personal.php');

    ajax.onload = function () {
        // console.log('Respuesta del servidor:', ajax.responseText);

        var str = "";

        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            var tabla = '';
            json.forEach(function (item) {
                str = "<tr><td>" + item.username_personal + "</td>";
                str +="<td>" + item.nombre_personal + "</td>";
                str += "<td>" + item.apellidos_personal + "</td>";
                str += "<td>" + item.tipo_personal + "</td>";
                str += "<td>";
                str += "<button type='button' class='btn btn-success' onclick=" + "EditarPersonal(" + item.id_personal + ")>Editar</button>";
                str += "</td> ";
                str += "</tr>";
                tabla += str;
            });
            listado.innerHTML = tabla;

        } else {
            listado.innerText = 'Error';
        }
    }

    ajax.send(formdata);
}

function EditarPersonal(id_personal) {
    // Obtener los datos del usuario a editar
    var formdata = new FormData();
    formdata.append('id_personal', id_personal);

    var ajax = new XMLHttpRequest();
    ajax.open('POST', 'proc/listado-personal.php');

    ajax.onload = function () {
        if (ajax.status == 200) {
            var json = JSON.parse(ajax.responseText);
            json.forEach(function (item) {
                console.log(item);
                Swal.fire({
                    title: 'Editar Usuario',
                    html: '<form id="form-edicion">' +
                        '<label for="nombre">Username:</label>' +
                        '<input type="text" id="username_personal" value="' + item.username_personal + '">' +
                        '<br><br>' +
                        '<label for="nombre">Nombre:</label>' +
                        '<input type="text" id="nombre_personal" value="' + item.nombre_personal + '">' +
                        '<br><br>' +
                        '<label for="nombre">Apellidos:</label>' +
                        '<input type="text" id="apellidos_personal" value="' + item.apellidos_personal + '">' +
                        
                        '<br><br>' +
                        '<button type="button" onclick="GuardarEditarPersonal(' + item.id_personal + ')">Guardar</button>' +
                        '</form>',
                    showCancelButton: true,
                    showConfirmButton: false
                });
            });
        } else {
            console.error('Error al obtener datos del usuario');
        }
    }

    ajax.send(formdata);
}

function GuardarEditarPersonal(id_personal) {
    // Obtener los nuevos valores del formulario
    var nuevo_username_personal = document.getElementById('username_personal').value;
    var nuevo_nombre_personal = document.getElementById('nombre_personal').value;
    var nuevo_apellidos_personal = document.getElementById('apellidos_personal').value;

    // Enviar solicitud AJAX para guardar los cambios
    var formdata = new FormData();
    formdata.append('id_personal', id_personal);
    formdata.append('nuevo_username_personal', nuevo_username_personal);
    formdata.append('nuevo_nombre_personal', nuevo_nombre_personal);
    formdata.append('nuevo_apellidos_personal', nuevo_apellidos_personal);

    var ajax = new XMLHttpRequest();
    ajax.open('POST', 'proc/editar-personal.php');

    ajax.onload = function () {
        if (ajax.status == 200) {
            ListarPersonal("%", "%");
            Swal.close();
        } else {
            console.error('Error al guardar cambios');
        }
    }

    ajax.send(formdata);
}


/////--------------------------------------------------------------------------


function ListarHistorial(id_mesa) {
    var listado = document.getElementById('historial-listado');

    var formdata = new FormData();
    formdata.append('id_mesa', id_mesa);

    var ajax = new XMLHttpRequest();
    ajax.open('POST', 'proc/listado-historial.php');

    ajax.onload = function () {
        console.log('Respuesta del servidor:', ajax.responseText);

        var str = "";

        if (ajax.status == 200) {
            
            var json = JSON.parse(ajax.responseText);
            var tabla = '';

            json.forEach(function (item) {
                str = "<tr><td>" + item.nombre_mesa + "</td>";
                str += "<td>" + item.nombre_personal + "</td>";
                str += "<td>" + item.hora_inicio_ocupacion + "</td>";
                str += "<td>" + item.hora_final_ocupacion + "</td>";
                str += "<td>" + item.nombre_ocupacion + "</td>";
                str += "</tr>";
                tabla += str;
            });

            listado.innerHTML = tabla;
        } else {
            listado.innerText = 'Error';
        }
    }

    ajax.send(formdata);
}


/////--------------------------------------------------------------------------

function TipoFiltro(tipo_sala) {
    tipo_salax = tipo_sala;
    ListarMesas(tipo_salax, ocupacion_mesax);
}

function OcupacionFiltro(ocupacion_mesa) {
    ocupacion_mesax = ocupacion_mesa;
    ListarMesas(tipo_salax, ocupacion_mesax);
}

document.addEventListener('DOMContentLoaded', function () {

    function ListarFiltros() {
        var filtro = document.getElementById('filtro');

        var formdata = new FormData();

        var ajax = new XMLHttpRequest();

        ajax.open('POST', 'proc/filtros.php');

        ajax.onload = function () {
            var str = "";

            if (ajax.status == 200) {
                var json = JSON.parse(ajax.responseText);
                var contenido = '';
                str = "<div class='content'>";
                json.forEach(function (item) {
                    str += "<button class='btn btn-success' onclick=\"TipoFiltro('" + item.tipo_sala + "')\">" + item.tipo_sala + "</button>";
                });
                str += "<button class='btn btn-success' onclick=\"OcupacionFiltro('Libre')\">Libres</button>";
                str += "<button class='btn btn-success' onclick=\"OcupacionFiltro('Ocupada')\">Ocupadas</button>";
                str += "<button class='btn btn-success' onclick=\"ListarMesas('%','%')\">Limpiar Filtro</button>";
                str += "</div>";
                contenido += str;
                filtro.innerHTML = contenido;

            } else {
                filtro.innerText = 'Error';
            }
        }
        ajax.send(formdata);
    }

    function ListarFiltrosPersonal() {
        var filtro = document.getElementById('personal-filtro');

        var formdata = new FormData();

        var ajax = new XMLHttpRequest();

        ajax.open('POST', 'proc/filtros-personal.php');

        ajax.onload = function () {
            var str = "";

            if (ajax.status == 200) {
                var json = JSON.parse(ajax.responseText);
                var contenido = '';
                str = "<div class='content'>";

                json.forEach(function (item) {
                    str += "<button class='btn btn-success' onclick=\"ListarPersonal('%', '" + item.tipo_personal + "')\">" + item.tipo_personal + "</button>";
                });
                str += "<button class='btn btn-success' onclick=\"ListarPersonal('%', '%')\">Limpiar Filtro</button>";
                str += "</div>";
                contenido += str;
                filtro.innerHTML = contenido;

            } else {
                filtro.innerText = 'Error';
            }
        }
        ajax.send(formdata);
    }

    PasarPermiso();
    ListarMesas("%", "%");
    ListarPersonal("%", "%");
    ListarHistorial("%");
    ListarFiltros();
    ListarFiltrosPersonal();

});