let currentPokemon;


async function loadPokemon() {
    for (i = 1; i < 50; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`
        let response = await fetch(url);
        let currentPokemon = await response.json();
        printPokemon(currentPokemon);
    }
}

function printPokemon(cP) {
    document.getElementById('pokemonContainer').innerHTML += `
    <div class="pokeContainer" id="pokeID${i}"><img src="${cP['sprites']['front_default']}">
     <p class="pokeNameDesigne">${cP['name']}</p>
    </div>`
}
