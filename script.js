let currentPokemon;


async function loadPokemon() {
    for (i = 1; i < 150; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`
        let response = await fetch(url);
        let currentPokemon = await response.json();
        printPokemon(currentPokemon);
        refreshLoadingBar(i)
        console.log(currentPokemon)
    }
}


function refreshLoadingBar(l) {
   let loadingBar = (l / 150) * 100
   document.getElementById('loadingBar').style = `width:${loadingBar}%`
   document.getElementById('loadingBar').innerText = `Pokemon are loading: ${loadingBar.toFixed()}%`
   if(loadingBar.toFixed() > 98){
    document.getElementById('loadingBar').innerText = 'alle Pokemon geladen. Viel Spaß :)'
   }
   console.log(`${loadingBar}%`)
}


function printPokemon(cP) {
    document.getElementById('pokemonContainer').innerHTML += `
    <div onclick="showPokemonDetail(${i})" class="pokeContainer" id="pokeID${i}"><img src="${cP['sprites']['front_default']}">
     <p class="pokeNameDesigne">${cP['name']}</p>
    </div>`
}


async function showPokemonDetail(spd){ 
    let information = `https://pokeapi.co/api/v2/pokemon/${spd}/`
    let response = await fetch(information)
    let detailInformation = await response.json();
    document.getElementById('pokeDetailPic').src = detailInformation['sprites']['front_default']
    document.getElementById('detailName').innerText = detailInformation['name']
    document.getElementById('ID').innerText = detailInformation['id']
    setDetailCardBackground();
}


function setDetailCardBackground(){
    document.getElementById('centerOverAll').style.display = 'flex';
    document.getElementById('pokeDetailCard').style.display = 'inline';
}


function closeDetail(){
    document.getElementById('centerOverAll').style.display = 'none';
    document.getElementById('pokeDetailCard').style.display = 'none'; 
}

