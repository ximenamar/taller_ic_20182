var funcClick = function(evt){
  console.log(evt.target.id);
  var arr = evt.target.id.split("_");
  var todo_id = arr[1];

  var req = new XMLHttpRequest();
  var url = "http://127.0.0.1:8000/todos/delete?id=" + todo_id;
  req.open("GET", url, true);  //asincrona
  req.onreadystatechange = onTodoDeleted;
  req.send();
};

var onTodoDeleted = function(evt){
  document.getElementById('lista_todos').innerHTML = "";
  obtenerTODOs();
};

var onServicioDevuelto = function(evt){
  // Termina la comunicacion

  if (evt.target.readyState == 4){
    if (evt.target.status == 200){
      var listadoJSON = JSON.parse(evt.target.responseText);
      for (var i=0; i<listadoJSON.length; i++){
        var jsTodo = listadoJSON[i];

        // Creamos <li>
        var elemLi = document.createElement("li");
        elemLi.innerHTML = jsTodo.texto;

        // Creamos <button>
        var elemBut = document.createElement("button");
        elemBut.innerHTML = "-";
        elemBut.id = "but_" + jsTodo.id;
        elemBut.addEventListener("click", funcClick);

        // Hacemos los appends
        elemLi.appendChild(elemBut);
        document.getElementById('lista_todos')
          .appendChild(elemLi);
      }
    }else{
      console.log("Error de comunicacion: " +
        evt.target.status);
    }
  }

};

var obtenerTODOs = function(){
  // Nos vamos a comunicar con un servicio
  var req = new XMLHttpRequest();
  var url = "http://127.0.0.1:8000/todos/list";
  req.open("GET", url, true);  //asincrona
  req.onreadystatechange = onServicioDevuelto;
  req.send();
  console.log("Se inicia la comunicacion");
};

var respuestaAddTodo = function(evt){
  if (evt.target.readyState == 4){
    if (evt.target.status == 200){
      // Todo OK en la comunicacion
      console.log(evt.target.responseText);
      document.getElementById('lista_todos').innerHTML = "";
      obtenerTODOs();
    }
  }

};

var addTodoClick = function(){
  var todo = document.getElementById('todo').value;
  if (todo != ""){
    // Creamos el Request
    var jsRequest = {
      "texto" : todo
    };
    console.log(JSON.stringify(jsRequest));

    // Iniciamos la comunicacion con el servidor
    var url = "http://127.0.0.1:8000/todos/add/"
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.onreadystatechange = respuestaAddTodo;
    req.send(JSON.stringify(jsRequest));
  }
};

var main = function(){
  obtenerTODOs();
  document.getElementById('but_click')
    .addEventListener("click", addTodoClick);

};
window.onload = main;
