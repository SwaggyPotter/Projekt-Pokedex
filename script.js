let currentPokemon;


async function loadPokemon() {
    for (i = 1; i < 1009; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`
        let response = await fetch(url);
        let currentPokemon = await response.json();
        printPokemon(currentPokemon);
        refreshLoadingBar(i)
        console.log()
    }
}

function refreshLoadingBar(l) {
   let loadingBar = (l / 1009) * 100
   document.getElementById('loadingBar').style = `width:${loadingBar}%`
   document.getElementById('loadingBar').innerText = `Pokemon are loading: ${loadingBar.toFixed()}%`
   if(loadingBar.toFixed() > 98){
    document.getElementById('loadingBar').innerText = 'alle Pokemon geladen. Viel Spaß :)'
   }
   console.log(`${loadingBar}%`)
}

function printPokemon(cP) {
    document.getElementById('pokemonContainer').innerHTML += `
    <div class="pokeContainer" id="pokeID${i}"><img src="${cP['sprites']['front_default']}">
     <p class="pokeNameDesigne">${cP['name']}</p>
    </div>`
}
