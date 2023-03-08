let currentPokemon;


async function loadPokemon() {
    for (i = 1; i < 1010; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`
        let response = await fetch(url);
        let currentPokemon = await response.json();
        document.getElementById('pokemonContainer').innerHTML += `<br>${currentPokemon['name']}`;
        document.getElementById('pokemonContainer').innerHTML += `<img src="${currentPokemon['sprites']['front_default']}">`
        console.log(currentPokemon)
    }
}

