const connection1 = new signalR.HubConnectionBuilder().withUrl("/bingohub").build();

document.getElementById("genBingo").disabled = true;

connection1.on("NewBoard", function (newNumbers) {  
    for (let i = 0; i < newNumbers.length; i++) {
        let id = 'square' + i;
        document.getElementById(id).innerHTML = newNumbers[i];
    }
});

connection1.start().then(function () {
    document.getElementById("genBingo").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

// send button on click event listener.
document.getElementById("genBingo").addEventListener("click", function (event) {
    connection1.invoke("SendNumbers").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});