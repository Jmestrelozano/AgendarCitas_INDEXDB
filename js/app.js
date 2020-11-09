import { interfaz } from "./interfaz.js";

export let btnEnviar = document.querySelector("form");

document.addEventListener("DOMContentLoaded",  () => {
 
  UI.crearIndexDB()
  btnEnviar.addEventListener("submit", enviar);
  function enviar(e) {
    e.preventDefault();
  
    let mascota = document.getElementById("mascota").value;
  
    let cliente = document.getElementById("cliente").value;
  
    let telefono = document.getElementById("telefono").value;
  
    let fecha = document.getElementById("fecha").value;
  
    let hora = document.getElementById("hora").value;
  
    let sintomas = document.getElementById("sintomas").value;
  
    ver.llamar();
  
  }
});


class llamarOBJETO {
  async llamar() {
    let objeto = {
      mascota: mascota.value,
      cliente: cliente.value,
      telefono: telefono.value,
      fecha: fecha.value,
      hora: hora.value,
      sintomas: sintomas.value,
    };

    localStorage.setItem("GuardarObj", JSON.stringify(objeto));
  }
}
let ver = new llamarOBJETO();
let UI = new interfaz();
