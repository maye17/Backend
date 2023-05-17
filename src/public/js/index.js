const socket =io();

socket.on("msg_front_to_back", (data)=>{
    console.log(JSON.stringify(data));
    socket.emit("msg_front_to_back",{msg: "hola desde el front del socket"})
})