const firebaseConfig = { 
  apiKey: "AIzaSyAw5jg3i7KBwb271IESovMP096KhjezoSg", 
  authDomain: "forum-chat-eada.firebaseapp.com", 
  databaseURL: "https://forum-chat-eada-default-rtdb.firebaseio.com", 
  projectId: "forum-chat-eada", 
  storageBucket: "forum-chat-eada.appspot.com", 
  messagingSenderId: "899470850784", 
  appId: "1:899470850784:web:2c90e3f125dd7f7b96ee85" };

firebase.initializeApp(firebaseConfig);
inicializar();

function inicializar() {
    const user_name = localStorage.getItem("user_name");
    // console.log(user_name);
    document.getElementById("user_name").textContent = "Olá, " + user_name + "!";

    getData();
}


logout();

function logout() {
  const user_name = localStorage.getItem("user_name");
  console.log(user_name);
  document.getElementById("user_name").textContent = "Olá, " + user_name + "!";

  getData();
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
  room_name = childKey;
  console.log("Nome da sala: " + room_name);
 row = "<div class='room_name' id="+room_name+" onclick='redirectToRoomName(this.id)' >#"+ room_name +"</div><hr>";
 document.getElementById("output").innerHTML += row;
});
});

}

function addRoom() {
  const room_name = document.getElementById("room_name").value;
  console.log(room_name);
  if (room_name) {
      firebase.database().ref('/').child(room_name).set({
          purpose: "sala criada"
      });

      carregaSala(Room_name);
  }
}



function getData() {
    firebase.database().ref('/').on("value", snapshot => {
        let salas = [];
        snapshot.forEach(childSnapshot => {
            const childKey = childSnapshot.key;
            const html = '<div class="user_name" id="'
                + childKey
                + '" onclick="carregaSala(this.id)">#'
                + childKey
                + '</div>'
            salas.push(html);
        });
        document.getElementById("output").innerHTML = salas.join("");
        // const output = document.getElementById("output");
        // output.innerHTML = salas.join("");
    });
}

function carregaSala(sala) {
  localStorage.setItem("user_name", sala);
  location = "chat.html";
}

