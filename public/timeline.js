function loadEvents(){
    $.ajax({
        url: "http://localhost:5000/timeline/getAllEvents",
        type: "get",
        success: (x)=>{
            console.log(x)
            for (i = 0; i < x.length ; i++) {
                $("main").append(`
                <div id="${x[i]["_id"]}">
                <h2> ${x[i].text} </h2>
                <span>Time/Date: </span>${x[i].time}
                <br>

                <p><span>Likes:</span> ${x[i].hits}</p>
                <button class="likeButtons" id="${x[i]["_id"]}"> 👍 Like </button>
                <button class="removeButtons" id="${x[i]["_id"]}"> 🗑 Delete </button>
                </div>
                `)
            }
        }
    })
}

function increamentHitsByOne() {
    x = this.id
    $.ajax({
        url: `http://localhost:5000/timeline/increaseHits/${x}`,
        type: "get",
        success: function() {   
            location.reload();  
        }
    })
}

function deleteContent() {
    x = this.id
    $.ajax({
        url: `http://localhost:5000/timeline/remove/${x}`,
        type: "get",
        success: function() {   
            location.reload();  
        }
    })
}

function setup() {
    loadEvents()

    $("body").on("click", ".likeButtons", increamentHitsByOne)
    $("body").on("click", ".removeButtons", deleteContent)
}

$(document).ready(setup)