function ordenarTabla() {
    let dropdown = document.getElementById('ordenamiento');
    let table = document.getElementById('miTabla');
    let tbody = table.getElementsByTagName('tbody')[0];
    let rows = Array.from(tbody.getElementsByTagName('tr'));

    let selectedOption = dropdown.value;

    if (selectedOption === 'nombre asc') {
        sortTableByColumn(0, "asc"); // Índice de la columna del nombre
    }
    else if (selectedOption === 'nombre desc') {
        sortTableByColumn(0, "desc"); // Índice de la columna del nombre
    }
    else if (selectedOption === 'monto desc') {
        sortTableByColumn(4, "desc"); // Índice de la columna del monto
    }
    else if (selectedOption === 'monto asc') {
        sortTableByColumn(4, "asc"); // Índice de la columna del monto
    }

    function sortTableByColumn(columnIndex, orden) {
        rows.sort(function (a, b) {
            let rowDataA = a.getElementsByTagName('td')[columnIndex].innerText;
            let rowDataB = b.getElementsByTagName('td')[columnIndex].innerText;

            if (columnIndex === 4 && orden === "desc") {
                rowDataA = parseFloat(rowDataA.replace(/,/g, ''));
                rowDataB = parseFloat(rowDataB.replace(/,/g, ''));
                return rowDataB - rowDataA; // Orden descendente por monto numérico
            } 
            
            else if (columnIndex === 4 && orden === "asc") {
                rowDataA = parseFloat(rowDataA.replace(/,/g, ''));
                rowDataB = parseFloat(rowDataB.replace(/,/g, ''));
                return rowDataA - rowDataB; // Orden descendente por monto numérico
            } 
            else if (columnIndex === 0 && orden === "asc") {
                return rowDataA.localeCompare(rowDataB); // Orden ascendente por nombre
            }
            else if (columnIndex === 0 && orden === "desc") {
                return rowDataB.localeCompare(rowDataA); // Orden descendente por nombre
            }
        });

        for (let i = 0; i < rows.length; i++) {
            tbody.appendChild(rows[i]);
        }
    }
}

function alert(message, type) {
    let alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    let wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    alertPlaceholder.append(wrapper)
}

function verMas(event){
    event.preventDefault();
    let ver = document.getElementById('ver');
    ver.className = 'hidden';
    let masTecnos = document.getElementById('masTecnos');
    masTecnos.removeAttribute("class", "hidden")           // Hacer visible el div
    masTecnos.className = 'row';
}

function enviarPropuesta(event) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario y realizar las validaciones
    let nombre = document.getElementById("nombre").value;
    let regexp = /[a-z]{2,} [a-z]{2,}/i;
    if (!(regexp.test(nombre))) {
        alert('Ingrese nombre y apellido, con solo un espacio.', 'danger');
        return null;
    }

    let email = document.getElementById("email").value;
    let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/g;
    if (!(emailRegex.test(email))) {
        alert('Ingrese un email', 'danger');
        return null;
    }

    let mensaje = document.getElementById("mensaje").value;
    if (mensaje.length < 20) {
        alert('El mensaje debe contener al menos 20 caracteres', 'danger');
        return null;
    }

    let empresa = document.getElementById("empresa").value;
    if (empresa.length < 3) {
        alert('Ingrese el nombre de la empresa (al menos 3 caracteres)', 'danger');
        return null;
    }

    let sueldoPretendido = document.getElementById("sueldoPretendido").value;
    if (sueldoPretendido < 120000) {
        alert('El monto debe ser superior a 120000 ARS.', 'danger');
        return null;
    }

    // Crear una nueva fila en la tabla
    let tabla = document.getElementById("miTabla");
    let fila = tabla.insertRow();

    // Insertar las celdas con los valores del formulario en la nueva fila
    let celdaNombre = fila.insertCell();
    celdaNombre.innerHTML = nombre;

    let celdaEmail = fila.insertCell();
    celdaEmail.innerHTML = email;

    let celdaMensaje = fila.insertCell();
    celdaMensaje.innerHTML = mensaje;

    let celdaEmpresa = fila.insertCell();
    celdaEmpresa.innerHTML = empresa;

    let celdaMonto = fila.insertCell();
    celdaMonto.innerHTML = sueldoPretendido;

    let celdaMontoUSD = fila.insertCell();
    celdaMontoUSD.innerHTML = (sueldoPretendido / 485).toFixed(1);

    let celdaMontoEuro = fila.insertCell();
    celdaMontoEuro.innerHTML = (sueldoPretendido / 260).toFixed(1);

    // Limpiar los campos del formulario utilizando reset()
    document.getElementById("formulario").reset();
}

