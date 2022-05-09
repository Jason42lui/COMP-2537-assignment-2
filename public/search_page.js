type_g = " "
abilities_g = " "
to_add = " "
function processPokemonResp(data) {
    for (i = 0; i < data.types.length; i++)
        if (data.types[i].type.name == type_g) {
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
        }
}

function processPokemonResp_abilities(data) {
     for (i = 0; i < data.abilities.length; i++)
        if (data.abilities[i].ability.name == abilities_g) {
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
        }

}


function display_type(type_) {
    $("main").empty()
    type_g = type_
    $("#history").append(`
    <div class="history_result">Pokemon's Type: ${type_g}</a><button id="delete_pokemon">X</button></div>`)
    for (i = 1; i < 151; i++) {
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processPokemonResp
        })
    }

}

function display_abilities(abilities_) {
    $("main").empty()
    abilities_g = abilities_
    $("#history").append(`
    <div class="history_result">Pokemon's Ability: ${abilities_g}</a><button id="delete_pokemon">X</button></div>`)
    for (i = 1; i < 151; i++) {
        $.ajax({
            type: "get",
            url: `https://pokeapi.co/api/v2/pokemon/${i}`,
            success: processPokemonResp_abilities
        })
    }

}

function display_name() {
    $("main").empty()
    pokeName = document.getElementById("pokemon_name").value

    $.ajax(
        {
            "url": `https://pokeapi.co/api/v2/pokemon/${pokeName}`,
            "type": "GET",
            "success": function (data) {
                if (pokeName == Number(pokeName)) {
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
                    $("#history").append(`
                    <div class="history_result"><a href="/profile/${data.id}">Pokemon's Name ${data.name}</a><button id="delete_pokemon">X</button></div>
                    `)
                }
            }
        },
    )
}
function clear() {
    $("main").empty()
}

// function remove_pokemon() {
//     $("#history").empty()
// }

function setup() {
    display_type($("#poke_type option:selected").val())
    $("#poke_type").change(() => {
        poke_type = $("#poke_type option:selected").val();
        display_type($("#poke_type option:selected").val())
    })
    display_abilities($("#poke_abilities option:selected").val())
    $("#poke_abilities").change(() => {
        poke_abilities = $("#poke_abilities option:selected").val();
        display_abilities($("#poke_abilities option:selected").val())
    })

    $("#find_pokemon").click(display_name);
    // $("#delete_pokemon").click(remove_pokemon);
    $("#clear_pokemon").click(clear);
}



$(document).ready(setup)