const form = document.getElementById("formPedido");

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            let formPedidoData = new FormData(form);
            let obj = convertFormPedidoDataToObj(formPedidoData);
            saveObj(obj);
            insertRowTables(obj);
            form.reset();
        })

        document.addEventListener("DOMContentLoaded", function (event) {
            let objArray = JSON.parse(localStorage.getItem("datos"));
            objArray.forEach(
                function (arrayElement) {
                    insertRowTables(arrayElement);
                })
        })

        function getNewPedidosId() {
            let ultimoPedidoId = localStorage.getItem("ultimoPedidoId") || "-1";
            let newPedidoId = JSON.parse(ultimoPedidoId) + 1;
            localStorage.setItem("ultimoPedidoId", JSON.stringify(newPedidoId))
            return newPedidoId;
        }

        function convertFormPedidoDataToObj(formPedidoData) {
            let local = formPedidoData.get("local");
            let fecha_pedido = formPedidoData.get("fecha_pedido");
            let fecha_entrega = formPedidoData.get("fecha_entrega");
            let matilda = formPedidoData.get("matilda");
            let carrot = formPedidoData.get("carrot");
            let red_velvet = formPedidoData.get("red_velvet");
            let ch_maracuya = formPedidoData.get("ch_maracuya");
            let ch_f_rojos = formPedidoData.get("ch_f_rojos");
            let ch_frutilla = formPedidoData.get("ch_frutilla");
            let ch_arandanos = formPedidoData.get("ch_arandanos");
            let marmolado = formPedidoData.get("marmolado");
            let cookie_black = formPedidoData.get("cookie_black");
            let cookie_chip = formPedidoData.get("cookie_chip");
            let brownie = formPedidoData.get("brownie");
            let black_blondie = formPedidoData.get("black_blondie");
            let pan_molde = formPedidoData.get("pan_molde");
            let pedidosId = getNewPedidosId();
            return {
                "local": local,
                "fecha_pedido": fecha_pedido,
                "fecha_entrega": fecha_entrega,
                "matilda": matilda,
                "carrot": carrot,
                "red_velvet": red_velvet,
                "ch_maracuya": ch_maracuya,
                "ch_f_rojos": ch_f_rojos,
                "ch_frutilla": ch_frutilla,
                "ch_arandanos": ch_arandanos,
                "marmolado": marmolado,
                "cookie_black": cookie_black,
                "cookie_chip": cookie_chip,
                "brownie": brownie,
                "black_blondie": black_blondie,
                "pan_molde": pan_molde,
                "pedidosId": pedidosId
            }
        }

        function insertRowTables(obj) {
            let tablePedidoRef = document.getElementById("tablePedido");

            let newTableRowRef = tablePedidoRef.insertRow(-1);
            newTableRowRef.setAttribute("data-pedidosId", obj["pedidosId"]);

            let newTableCellRef = newTableRowRef.insertCell(0);
            newTableCellRef.textContent = obj["local"];

            newTableCellRef = newTableRowRef.insertCell(1);
            newTableCellRef.textContent = obj["fecha_pedido"];

            newTableCellRef = newTableRowRef.insertCell(2);
            newTableCellRef.textContent = obj["fecha_entrega"];

            newTableCellRef = newTableRowRef.insertCell(3);
            newTableCellRef.textContent = obj["matilda"];

            newTableCellRef = newTableRowRef.insertCell(4);
            newTableCellRef.textContent = obj["carrot"];

            newTableCellRef = newTableRowRef.insertCell(5);
            newTableCellRef.textContent = obj["red_velvet"];

            newTableCellRef = newTableRowRef.insertCell(6);
            newTableCellRef.textContent = obj["ch_maracuya"];

            newTableCellRef = newTableRowRef.insertCell(7);
            newTableCellRef.textContent = obj["ch_f_rojos"];

            newTableCellRef = newTableRowRef.insertCell(8);
            newTableCellRef.textContent = obj["ch_frutilla"];

            newTableCellRef = newTableRowRef.insertCell(9);
            newTableCellRef.textContent = obj["ch_arandanos"];

            newTableCellRef = newTableRowRef.insertCell(10);
            newTableCellRef.textContent = obj["marmolado"];

            newTableCellRef = newTableRowRef.insertCell(11);
            newTableCellRef.textContent = obj["cookie_black"];

            newTableCellRef = newTableRowRef.insertCell(12);
            newTableCellRef.textContent = obj["cookie_chip"];

            newTableCellRef = newTableRowRef.insertCell(13);
            newTableCellRef.textContent = obj["brownie"];

            newTableCellRef = newTableRowRef.insertCell(14);
            newTableCellRef.textContent = obj["black_blondie"];

            newTableCellRef = newTableRowRef.insertCell(15);
            newTableCellRef.textContent = obj["pan_molde"];

            let newDeleteCell = newTableRowRef.insertCell(16);
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            newDeleteCell.appendChild(deleteButton);

            deleteButton.addEventListener("click", (event) => {
                let pedidosRow = event.target.parentNode.parentNode;
                let pedidosId = pedidosRow.getAttribute("data-pedidosId");
                pedidosRow.remove();
                deletePedidosId(pedidosId);
            })
        }
        //le paso como parametro el pedidoId de la transaccion que quiero eliminar
        function deletePedidosId(pedidosId) {
            //obtengo las transacciones del localstoge (desconvierto de json a obj)
            let objArray = JSON.parse(localStorage.getItem("datos"));
            //busco el indice / la posicion de la transaccion que quiero eliminar
            let indexInArray = objArray.findIndex(element => element.
                pedidosId === pedidosId);
            //elimino el elemento de esa posicion
            objArray.splice(indexInArray, 1)
            //convierto a json
            let miArrayJSON = JSON.stringify(objArray);
            //guardo el array de transaccion en formato json en el localstorage
            localStorage.setItem("datos", miArrayJSON);
        }

        function saveObj(obj) {
            let miArray = JSON.parse(localStorage.getItem("datos")) || [];
            miArray.push(obj);
            let miArrayJSON = JSON.stringify(miArray);
            localStorage.setItem("datos", miArrayJSON);
        }