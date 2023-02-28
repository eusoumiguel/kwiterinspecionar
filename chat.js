const firebaseConfig = {
    apiKey: "AIzaSyAw5jg3i7KBwb271IESovMP096KhjezoSg",
    authDomain: "forum-chat-eada.firebaseapp.com",
    databaseURL: "https://forum-chat-eada-default-rtdb.firebaseio.com",
    projectId: "forum-chat-eada",
    storageBucket: "forum-chat-eada.appspot.com",
    messagingSenderId: "899470850784",
    appId: "1:899470850784:web:2c90e3f125dd7f7b96ee85"
  };
firebase.initializeApp(firebaseConfig);

const user_name = localStorage.getItem("user_name");
const room_name = localStorage.getItem("room_name");

inicializar();

function inicializar() {
    document.getElementById("room_name").textContent = '#' + room_name;

    
}

function getData() {
    const output = document.getElementById("output");
    firebase.database().ref('/' + room_name).on("value", snapshot => {
        output.innerHTML = "";
        snapshot.forEach(childSnapshot => {
            const childKey = childSnapshot.key;
            if(childKey != "purpose") {
                const childMsg = childSnapshot.val();
                const nome = childMsg.nome;
                const msg = childMsg.mensagem;
                const likes = childMsg.likes;

                const chatCard = document.createElement("div");
                chatCard.className = "chatCard";
                const chatNome = document.createElement("h4");
                chatNome.className = "chatNome";
                chatNome.textContent = nome;
                chatCard.appendChild(chatNome);
                const row = document.createElement("div");
                row.className = "row";
                chatCard.appendChild(row);
                const col = document.createElement("div");
                col.className = "col";
                row.appendChild(col);
                const chatMsg = document.createElement("h5");
                chatMsg.className = "chatMsg";
                chatMsg.textContent = msg;
                col.appendChild(chatMsg);
                const colAuto = document.createElement("div");
                colAuto.className = "col-auto";
                row.appendChild(colAuto);
                const botaoLike = document.createElement("button");
                botaoLike.className = "btn btn-info";
                botaoLike.id = childKey;
                botaoLike.value = likes;
                botaoLike.setAttribute("onclick", "likeMsg(this.id)");
                botaoLike.innerHTML = '<i class="fa-regular fa-thumbs-up"></i> ' + likes;
                colAuto.appendChild(botaoLike);
                output.appendChild(chatCard);
            }
        });
    });
}

function send() {
    const txtMsg = document.getElementById("msg");
    const msg = txtMsg.value;

    if (msg.trim()) {
        firebase.database().ref('/' + room_name).push({
            nome: user_name,
            mensagem: msg,
            likes: 0
        });
        txtMsg.value = "";
    }
}

function likeMsg(btnId) {
    let likes = Number(document.getElementById(btnId).value);
    likes++;
    firebase.database().ref('/' + room_name).child(btnId).update({
        likes: likes
    })
}