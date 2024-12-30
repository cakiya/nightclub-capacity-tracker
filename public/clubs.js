var clubs = [
    {
        "id": 1,
        "name": "Club Arcane",
        "nick": "arcane",
        "max": 100,
        "warning": 70,
        "count": 0
    },
    {
        "id": 2,
        "name": "Club Paradisio",
        "nick": "paradisio",
        "max": 50,
        "warning": 30,
        "count": 0
    },
    {
        "id": 3,
        "name": "Club Underground",
        "nick": "underground",
        "max": 20,
        "warning": 12,
        "count": 0
    },
    {
        "id": 4,
        "name": "Club Soda",
        "nick": "soda",
        "max": 52,
        "warning": 32,
        "count": 0
    }
];
const ok_status = "Welcome!";
const ok_color = "aquamarine";
const warning_status = "Warn the bouncers…";
const warning_color = "yellow";
const max_status = "No one allowed in!";
const max_color = "red";

function add(increment){
    console.log("add clicked")
    let choices = document.getElementById("choices");
    let choice = choices.querySelector('input[type="radio"]:checked');
    if (choice){
        let club = choice.value;
        console.log(club);
        clubs.count += increment;
        update(club, increment);
    } else {
        console.log("nothing selected");
    }
}


function update(clubNick, increment){
    for (let i = 0; i < clubs.length; i++) {
        let club = clubs[i];
        if (club.nick === clubNick && club.count + increment >= 0) {
            // the club we are updating
            let clubName = club.name;
            club.count += increment;
            let status_empty = `<text>${clubName}</text>`;
            let status_html = `<text>${clubName}</text>
                                <br>
                                <element id="${clubNick} status">Welcome!</element>`;
            document.getElementById(clubNick+" count").innerText = club.count;
            if (club.count >= club.max) {
                document.getElementById(clubNick+" box").innerHTML = status_html;
                document.getElementById(clubNick+" box").style.background = max_color;
                document.getElementById(clubNick+" status").innerText = max_status;
            } else if (club.count >= club.warning) {
                document.getElementById(clubNick+" box").innerHTML = status_html;
                document.getElementById(clubNick+" box").style.background = warning_color;
                document.getElementById(clubNick+" status").innerText = warning_status;
            } else if (club.count > 0) {
                document.getElementById(clubNick+" box").innerHTML = status_html;
                document.getElementById(clubNick+" box").style.background = ok_color;
                document.getElementById(clubNick+" status").innerText = ok_status;
            } else {
                document.getElementById(clubNick+" box").innerHTML = status_empty;
            }
            break;
        }
    }
}