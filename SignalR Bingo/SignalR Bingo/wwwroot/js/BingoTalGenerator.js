const connection2 = new signalR.HubConnectionBuilder().withUrl("/talgeneratorhub").build(); // Ny SignalR connection

document.getElementById("StartBingo").disabled = true;

connection2.on("RandomNum", function (index) {
    document.getElementById('joinedList').innerHTML = ''; // Sætter index til at være tom, denne bruges både for at sikre at index er tom fra starten, men også for at fjerne de tidligere tal så der bliver plads til nye
    const li = document.createElement("li"); // Laver et nyt element da appendChild metoden kun kan append DOM elementer
    li.innerText = ('Aktuelt Bingonummer: ' + index);
    document.getElementById("joinedList").appendChild(li); // Sætter værdien for index ind i ul listen (Bullet list)
    console.log(index);
    const myNumbers = document.querySelectorAll("#bingotable tr td");
    for (const number of myNumbers) {
        if (number.innerText == index) {
            number.classList.add("CompletedSquare");
        }
    }
    if (document.querySelectorAll(".CompletedSquare").length == 25) {
        const li = document.createElement("li");
        li.innerText = ("Bingo");
        document.getElementById("joinedList").appendChild(li);
        document.getElementById("StartBingo").disabled = true;
    }
    //for (const tr of document.querySelectorAll("#bingotable tr td")) {
    //    console.log("Hello?");
    //    if (tr.classList.contains(".CompletedSquare")) {
    //        console.log("bingo?");
    //    }
    //}
});

connection2.start().then(function () {
    document.getElementById("StartBingo").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

// send button on click event listener.
document.getElementById("StartBingo").addEventListener("click", function (event) {
    connection2.invoke("RandomNumber").catch(function (err) {
        return console.error(err.toString());
    });

    event.preventDefault();
});

//var x = [];
//var rndNum = index
//for (let i = 0; i < 25; i++) {
//    id = "square" + i;
//    var x.push(document.getElementById(id).textContent);
//}
//for (const number of x) {
//    if (x[i] === rndNum) {
//        document.getElementById("square" + i).className = "CompletedSquare";
//    }
//}