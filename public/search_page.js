type_g = " "
abilities_g = " "
name_g = ' '
to_add = " "
function processPokemonResp(data) {
    for (i = 0; i < data.length; i++) {
        if (data[i].types[0].type.name == type_g) {
            $("main").append(`
            <div class="pokemonBox">
                <div>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data[i].id}.png">
                </div>
                <div class="pokemonInfo">
                    <h1> ID: ${data[i].id} </h1> 
                    <h1> Name: ${data[i].name} </h1>
                    <p> Type: ${data[i].types[0].type.name} </p>
                    <p> Height: ${data[i].height} dm </p>
                    <p> Weight: ${data[i].weight} hg </p>
                </div>
            </div> 
            `)
        }
    }
}

function processPokemonResp_abilities(data) {
    for (i = 0; i < data.length; i++) {
        if (data[i].abilities[0].ability.name == abilities_g) {
            $("main").append(`
        <div class="pokemonBox">
            <div>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data[i].id}.png">
            </div>
            <div class="pokemonInfo">
                <h1> ID: ${data[i].id} </h1> 
                <h1> Name: ${data[i].name} </h1>
                <p> Type: ${data[i].types[0].type.name} </p>
                <p> Height: ${data[i].height} dm </p>
                <p> Weight: ${data[i].weight} hg </p>
            </div>
        </div> 
        `)
        }
    }

}


function display_type(type_) {
    $("main").empty()
    type_g = type_
    for (i = 1; i < 31; i++) {
        $.ajax({
            type: "get",
            url: `https://still-coast-22599.herokuapp.com/api/v2/pokemon/ability/${i}`,
            success: processPokemonResp
        })
    }
    $("#history_content").append($(`<div id="history_result_${type_}">Pokemon's Type: ${type_}<button class="delete_pokemon_type">X</button></div>`))

}

function display_abilities(abilities_) {
    $("main").empty()
    abilities_g = abilities_
    for (i = 1; i < 31; i++) {
        $.ajax({
            type: "get",
            url: `https://still-coast-22599.herokuapp.com/api/v2/pokemon/type/${i}`,
            success: processPokemonResp_abilities
        })
    }
    $("#history_content").append($(`<div id="history_result_${abilities_}"><a href="javascript:processPokemonResp_abilities(https://still-coast-22599.herokuapp.com/api/v2/pokemon/type/${i})">Pokemon's ability: ${abilities_}</a><button class="delete_pokemon_ability">X</button></div>`))

}

function display_name() {
    $("main").empty()
    name_g = document.getElementById("pokemon_name").value

    $.ajax(
        {
            "url": `https://still-coast-22599.herokuapp.com/api/v2/pokemon/${name_g}`,
            "type": "GET",
            "success": function (data) {
                if (name_g == Number(name_g)) {
                    alert("Pokemon names are only accepted")
                } else {
                    $("main").append(`
                    <div class="pokemonBox">
                        <div>
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png">
                        </div>
                        <div class="pokemonInfo">
                            <h1> ID: ${data.id} </h1> 
                            <h1> Name: ${data.name} </h1>
                            <p> Type: ${data.types[0].type.name} </p>
                            <p> Height: ${data.height} dm </p>
                            <p> Weight: ${data.weight} hg </p>
                        </div>
                    </div> 
                    `)
                    // $("#history_content").append(`
                    // <div id="history_result_${name_g}"><a href="/profile/${data.id}">Pokemon's Name ${data.name}</a><button class="delete_pokemon">X</button></div>
                    // `)
                    $("#history_content").append($(`<div id="history_result_${name_g}"><a href="javascript:display_name()">Pokemon's name: ${data.name}</a><button class="delete_pokemon">X</button></div>`))
                }
            }
        },
    )
}
function clear() {
    $("#history_content").empty()
}

function delete_pokemon_type() {
    const nameDiv = document.getElementById(`history_result_${type_g}`)
    const parent = nameDiv.parentNode;
    parent.removeChild(nameDiv)
}

function delete_pokemon_ability() {
    const nameDiv = document.getElementById(`history_result_${abilities_g}`)
    const parent = nameDiv.parentNode;
    parent.removeChild(nameDiv)
}

var now = new Date(Date.now());
var formatted = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

function insertSearchEventTOTheTimeLineType(poke_type) {
    $.ajax({
        url: "https://infinite-river-98790.herokuapp.com/timeline/input",
        type: "put",
        data: {
            text: `Client has searched for Pokemon type: ${poke_type}`,
            time: `${now}`,
            hits: 1
        },
        success: function (r) {
            console.log(r)
        }
    })
}

function insertSearchEventTOTheTimeLineAbilities(poke_abilities) {
    $.ajax({
        url: "https://infinite-river-98790.herokuapp.com/timeline/input",
        type: "put",
        data: {
            text: `Client has searched for Pokemon ability: ${poke_abilities}`,
            time: `${now}`,
            hits: 1
        },
        success: function (r) {
            console.log(r)
        }
    })
}

function insertSearchEventTOTheTimeLineName() {
    pokeName = document.getElementById("pokemon_name").value
    $.ajax({
        url: "https://infinite-river-98790.herokuapp.com/timeline/input",
        type: "put",
        data: {
            text: `Client has searched for Pokemon name: ${pokeName}`,
            time: `${now}`,
            hits: 1
        },
        success: function (r) {
            console.log(r)
        }
    })
}

function setup() {
    display_type($("#poke_type option:selected").val())
    $("#poke_type").change(() => {
        poke_type = $("#poke_type option:selected").val();
        display_type($("#poke_type option:selected").val())

        insertSearchEventTOTheTimeLineType(poke_type)
    })
    display_abilities($("#poke_abilities option:selected").val())
    $("#poke_abilities").change(() => {
        poke_abilities = $("#poke_abilities option:selected").val();
        display_abilities($("#poke_abilities option:selected").val())

        insertSearchEventTOTheTimeLineAbilities(poke_abilities)
    })

    $("#find_pokemon").click(display_name);
    $("#find_pokemon").click(insertSearchEventTOTheTimeLineName);
    $(".delete_pokemon_type").click(delete_pokemon_type);
    $(".delete_pokemon_ability").click(delete_pokemon_ability);
    // $(".delete_pokemon").click(function () {
    //     console.log("its gone")
    // });
    $("#history_content").on("click", "button", function () {
        // console.log("its gone")
        const nameDiv = document.getElementById(`history_result_${name_g}`)
        const parent = nameDiv.parentNode;
        parent.removeChild(nameDiv)
    });
    $("#clear_pokemon").click(clear);
}



$(document).ready(setup)