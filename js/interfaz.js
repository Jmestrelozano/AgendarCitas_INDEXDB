import { btnEnviar } from "./app.js";
export class interfaz {
  async crearIndexDB() {
    const dbconnect = window.indexedDB.open("citas", 1);
    dbconnect.onupgradeneeded = (ev) => {
      console.log("Actualizar BD");
      const db = ev.target.result;
      const objectStore = db.createObjectStore("citas", {
        keyPath: "id",
        autoIncrement: true,
      });
      objectStore.createIndex("mascota", "mascota", { unique: false });
      objectStore.createIndex("cliente", "cliente", { unique: false });
      objectStore.createIndex("telefono", "telefono", { unique: false });
      objectStore.createIndex("fecha", "fecha", { unique: false });
      objectStore.createIndex("hora", "hora", { unique: false });
      objectStore.createIndex("sintomas", "sintomas", { unique: false });

      return db;
    };
    dbconnect.onsuccess = (ev) => {
      console.log("BD-Actualización exitosa");
      const db = ev.target.result;

      const transaction = db.transaction("citas", "readwrite");
      const store = transaction.objectStore("citas");

      let resultado = localStorage.getItem("GuardarObj");
      let resulta = JSON.parse(resultado);
      let resquest = store.add(resulta);

      transaction.onerror = (ev) => {
        console.error("¡Se ha producido un error!", ev.target.error.message);
      };
      transaction.oncomplete = (ev) => {
        console.log("¡Los datos se han añadido con éxito!");
        const store = db.transaction("citas", "readonly").objectStore("citas");
        //const query = store.get(1); // Einzel-Query
        const query = store.openCursor();
        query.onerror = (ev) => {
          console.error("¡Solicitud fallida!", ev.target.error.message);
        };
        /*
        // Procesamiento de la consulta individual
        query.onsuccess = ev => {
          if (query.result) {
            console.log(Registro 1', query.result.Nickname, query.result.eMail);
          } else {
            console.warn('¡Ningún registro disponible!');
          }
        };
        */ let citas = document.querySelector("#citas");
        query.onsuccess = (ev) => {
          const cursor = ev.target.result;
        
         
          if (cursor) {
            console.log(cursor.key, cursor.value.mascota, cursor.value.cliente);
          
            citas.innerHTML=""
          

            let citaHtml = document.createElement("li");
            citaHtml.setAttribute("data-cita-id", cursor.key);
            citaHtml.classList.add("list-group-item");
    
            citaHtml.innerHTML = `
    
          <p class="font-weight-bold">Mascota: <span class="font-weight-normal">${cursor.value.mascota}</span></p>
          <p class="font-weight-bold">Cliente: <span class="font-weight-normal">${cursor.value.cliente}</span></p>
          <p class="font-weight-bold">Telefono: <span class="font-weight-normal">${cursor.value.telefono}</span></p>
          <p class="font-weight-bold">Fecha: <span class="font-weight-normal">${cursor.value.fecha}</span></p>
          <p class="font-weight-bold">Hora: <span class="font-weight-normal">${cursor.value.hora}</span></p>
          <p class="font-weight-bold">Sintomas: <span class="font-weight-normal">${cursor.value.sintomas}</span></p>
    
          `;
            citas.appendChild(citaHtml);
            btnEnviar.reset();
            cursor.continue();
          } else {
            console.log("¡No hay más registros disponibles!");
          }
        };
      };
    };

    // let Datos;

    // //  let response = localStorage.getItem("GuardarObjeto")
    // //  let respuesta = JSON.parse(response)
    // let base = window.indexedDB.open("citas", 1);

    // base.onerror = async function () {
    //   console.log("huno un error");
    // };

    // base.onsuccess = async function () {
    //   Datos = base.result;
    //   let transaction = Datos.transaction(["citas"], "readwrite");
    //   let ver = transaction.objectStore("citas");

    //   let resulta = JSON.parse(resultado);
    //   let resquest = ver.add(resulta);

    //   resquest.onsuccess = () => {
    //      btnEnviar.reset();
    //    };

    //    transaction.oncomplete = () => {
    //      console.log("cita agregada");
    //    };
    //    transaction.onerror = () => {
    //      console.log("hubo un error");
    //    };
    // };

    // base.onupgradeneeded = async function (e) {
    //   let db = e.target.result;

    //   let objectStore = db.createObjectStore("citas", {
    //     keyPath: "key",
    //     autoIncrement: true,
    //   });

    //   objectStore.createIndex("mascota", "mascota", { unique: false });
    //   objectStore.createIndex("cliente", "cliente", { unique: false });
    //   objectStore.createIndex("telefono", "telefono", { unique: false });
    //   objectStore.createIndex("fecha", "fecha", { unique: false });
    //   objectStore.createIndex("hora", "hora", { unique: false });
    //   objectStore.createIndex("sintomas", "sintomas", { unique: false });
    // };
  }

  async llamar() {
    let citas = document.querySelector("#citas");
    while (citas.firstChild) {
      citas.removeChild(citas.firstChild);
    }
    let objectStore = db.transaction("citas").objectStore("citas");

    objectStore.openCursor().onsuccess = function (e) {
      let cursor = e.target.result;

      if (cursor) {
        let citaHtml = document.createElement("li");
        citaHtml.setAttribute("data-cita-id", cursor.value.key);
        citaHtml.classList.add("list-group-item");

        citaHtml.innerHTML = `

      <p class="font-weight-bold">Mascota: <span class="font-weight-normal">${cursor.value.mascota}</span></p>
      <p class="font-weight-bold">Cliente: <span class="font-weight-normal">${cursor.value.cliente}</span></p>
      <p class="font-weight-bold">Telefono: <span class="font-weight-normal">${cursor.value.telefono}</span></p>
      <p class="font-weight-bold">Fecha: <span class="font-weight-normal">${cursor.value.fecha}</span></p>
      <p class="font-weight-bold">Hora: <span class="font-weight-normal">${cursor.value.hora}</span></p>
      <p class="font-weight-bold">Sintomas: <span class="font-weight-normal">${cursor.value.sintomas}</span></p>

      `;
        citas.appendChild(citaHtml);
        cursor.continue();
      }
    };
  }
}
