Swal.fire({
    title: "What is your nickname?",
    input: "text",
    text: "Enter your nickname...!!!",
    inputValidator: (value) => {
        return !value && "You need to write something!"
    },
    allowOutsideClick: false
})
    .then(data => {
        console.log(data)
        let name = data.value

        let inputMessages = document.getElementById("message")
        let divMessages = document.getElementById("messages")
        inputMessages.focus()

        const socket = io()

        socket.emit("welcome", name)

        socket.on("record", messages => {
            console.log(messages);
            messages.forEach(m => {
                divMessages.innerHTML += `<div class="message"><strong>${m.name}</strong>: <i>${m.message}</i></div><br>`
            })
        })

        socket.on("newUser", name => {
            Swal.fire({
                text: `${name} is connected!!!`,
                toast: true,
                position: "top-right"
            })
        })

        socket.on("newMessage", (name, message) => {
            divMessages.innerHTML += `<div class="message"><strong>${name}</strong>: <i>${message}</i></div><br>`
        })

        socket.on("userLogout", name => {
            divMessages.innerHTML += `<div class="message"><strong>${name}</strong> left the chat... :(</div><br>`
        })

        inputMessages.addEventListener("keyup", e => {
            e.preventDefault()
            // console.log(e, e.target.value)
            if (e.code === "Enter" && e.target.value.trim().length > 0) {
                socket.emit("message", name, e.target.value.trim())
                e.target.value = ""
                e.target.focus()
            }
        })



    })


