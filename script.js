let currentPokemon;
let loadButton = document.getElementById('loadMoreButton')
let loadedPokemon = 150;
let loadedPokemonCounter = 1;
let maxHP = 255;
let maxAT = 190;
let maxDEF = 230;
let maxSAT = 194;
let maxSDEF = 230;
let maxSPD = 180;


loadButton.addEventListener('click', () => {
    loadMorePokemon();
})


async function loadPokemon() {
    for (i = loadedPokemonCounter; i < loadedPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`
        let response = await fetch(url);
        let currentPokemon = await response.json();
        printPokemon(currentPokemon);
        refreshLoadingBar(i, loadedPokemon)
        console.log(currentPokemon)
    }
}


function refreshLoadingBar(l, LP) {
    let loadingBar = (l / LP) * 100
    document.getElementById('loadingBar').style = `width:${loadingBar}%`
    document.getElementById('loadingBar').innerText = `Pokemon are loading: ${loadingBar.toFixed()}%`
    if (loadingBar.toFixed() > 98) {
        document.getElementById('loadingBar').innerText = `${LP} von 1010 Pokemon geladen`
        document.getElementById('loadingBar').style = `width:100%`
    }
}


function loadMorePokemon() {
    if (loadedPokemon < 900) {
        loadedPokemonCounter = loadedPokemonCounter + 150
        loadedPokemon = loadedPokemon + 150;
        loadPokemon();
    }
    else if (loadedPokemon == 900) {
        loadedPokemonCounter = loadedPokemonCounter + 100
        loadedPokemon = loadedPokemon + 110;
        loadPokemon();
        document.getElementById('loadMoreButton').innerText = 'Alle 1010 Pokemon geladen'
    }
}


function printPokemon(cP) {
    document.getElementById('pokemonContainer').innerHTML += `
    <div onclick="showPokemonDetail(${i})" class="pokeContainer" id="pokeID${i}"><img src="${cP['sprites']['front_default']}">
     <p class="pokeNameDesigne">${cP['name']}</p>
    </div>`
}


async function showPokemonDetail(spd) {
    let information = `https://pokeapi.co/api/v2/pokemon/${spd}/`
    let response = await fetch(information)
    let detailInformation = await response.json();
    loadDetailInformation(detailInformation);
    setArrows(spd)
    setDetailCardBackground();
    closeDetailCardContainer();
}


function setArrows(arrowID) {
    console.log('Set id')
    document.getElementById('arrowContainer').innerHTML = `
    <span onclick="showPreviousPokemon(${arrowID})" id="arrowBack" class="material-symbols-outlined arrow">
        arrow_back
    </span>
    <span onclick="showNextPokemon(${arrowID})" id="arrowForward" class="material-symbols-outlined arrow">
        arrow_forward
    </span>`
}


function loadDetailInformation(detailInformation) {
    document.getElementById('typeClass2').innerText = '-'
    document.getElementById('pokeDetailPic').src = detailInformation['sprites']['front_default']
    document.getElementById('detailName').innerText = detailInformation['name']
    document.getElementById('ID').innerText = detailInformation['id']
    document.getElementById('typeClass').innerText = detailInformation['types']['0']['type']['name']
    document.getElementById('weight').innerText = detailInformation['weight']
    document.getElementById('height').innerText = detailInformation['height']
    document.getElementById('attackBtnContainer').innerHTML = `<button onclick="loadAttacks(${detailInformation['id']})" id="attackButton" class="btn btn-dark">Attacks</button>
    <button onclick="loadStats(${detailInformation['id']})" id="statButton" class="btn btn-dark">Stats</button>`
    if (detailInformation['types']['1']) {
        document.getElementById('typeClass2').innerText = detailInformation['types']['1']['type']['name']
    }
}


function setDetailCardBackground() {
    document.getElementById('centerOverAll').style.display = 'flex';
    document.getElementById('pokeDetailCard').style.display = 'inline';
}


function closeDetail() {
    document.getElementById('centerOverAll').style.display = 'none';
    document.getElementById('pokeDetailCard').style.display = 'none';
    document.getElementById('typeClass2').innerText = '-';
    document.getElementById('attackContainer').style.display = 'none';
    document.getElementById('stats').style.display = 'none';
}


function showNextPokemon(next) {
    next++
    showPokemonDetail(next)
    document.getElementById('attackContainer').style.display = 'none';
    document.getElementById('stats').style.display = 'none';
}


function showPreviousPokemon(previous) {
    if (previous > 1) {
        previous--
        showPokemonDetail(previous)
    }
    document.getElementById('attackContainer').style.display = 'none';
    document.getElementById('stats').style.display = 'none';
}


function search() {
    let pokeSearch = document.getElementById('pokeSearch').value
    printSearchedPokemon(pokeSearch)
}


async function printSearchedPokemon(sP) {
    let information = `https://pokeapi.co/api/v2/pokemon/${sP}/`
    let response = await fetch(information)
    let detailInformation = await response.json();
    document.getElementById('body').style.overflow = 'hidden';
    document.getElementById('searchedPokemonContainer').style.display = 'flex';
    document.getElementById('searchedPokemonContainer').innerHTML = `
    <div onclick="showPokemonDetail(${detailInformation['id']})" class="pokeContainer" id="pokeID"><img src="${detailInformation['sprites']['front_default']}">
     <p class="pokeNameDesigne">${detailInformation['name']}</p>
    </div>`
}


window.onscroll = function () { myFunction() };


function myFunction() {
    if (document.documentElement.scrollTop > 80) {
        document.getElementById("searchContainer").style.position = 'fixed'
        document.getElementById("searchContainer").style.top = '15px'
    } else if (document.documentElement.scrollTop < 80) {
        document.getElementById("searchContainer").style.position = "static";
    }
}


function closeDetailCardContainer() {
    document.getElementById('searchedPokemonContainer').style.display = 'none';
    document.getElementById('body').style.overflow = 'visible';
}


function closeTable() {
    document.getElementById('attackContainer').style.display = 'none';
}


async function loadAttacks(attackID) {
    document.getElementById('attackContainer').style.display = 'flex';
    document.getElementById('attackTable').innerHTML = `
    <table id="attackTable">
    </table>`;
    let information = `https://pokeapi.co/api/v2/pokemon/${attackID}/`
    let response = await fetch(information)
    let detailInformation = await response.json();
    for (i = 0; i < detailInformation['moves'].length; i++) {
        document.getElementById('attackTable').innerHTML += `
        <table id="attackTable">
        <tr><th>${detailInformation['moves'][`${i}`]['move']['name']}</th></tr>
        </table>`
    }
}


async function loadStats(statID) {
    let information = `https://pokeapi.co/api/v2/pokemon/${statID}/`
    let response = await fetch(information)
    let detailInformation = await response.json();
    printStats(detailInformation)
    document.getElementById('stats').style.display = 'flex';
}


function printStats(detailInformation) {
    document.getElementById('hp').style = `width:${calcStat(detailInformation['stats']['0']['base_stat'], maxHP)}%`
    document.getElementById('hp').innerText = `${calcStat(detailInformation['stats']['0']['base_stat'], maxHP).toFixed()}`
    document.getElementById('attack').style = `width:${calcStat(detailInformation['stats']['1']['base_stat'], maxAT)}%`
    document.getElementById('attack').innerText = `${calcStat(detailInformation['stats']['1']['base_stat'], maxAT).toFixed()}`
    document.getElementById('defense').style = `width:${calcStat(detailInformation['stats']['2']['base_stat'], maxDEF)}%`
    document.getElementById('defense').innerText = `${calcStat(detailInformation['stats']['2']['base_stat'], maxDEF).toFixed()}`
    document.getElementById('spAttack').style = `width:${calcStat(detailInformation['stats']['3']['base_stat'], maxSAT)}%`
    document.getElementById('spAttack').innerText = `${calcStat(detailInformation['stats']['3']['base_stat'], maxSAT).toFixed()}`
    document.getElementById('spDefense').style = `width:${calcStat(detailInformation['stats']['4']['base_stat'], maxSDEF)}%`
    document.getElementById('spDefense').innerText = `${calcStat(detailInformation['stats']['4']['base_stat'], maxSDEF).toFixed()}`
    document.getElementById('speed').style = `width:${calcStat(detailInformation['stats']['5']['base_stat'], maxSPD)}%`
    document.getElementById('speed').innerText = `${calcStat(detailInformation['stats']['5']['base_stat'], maxSPD).toFixed()}`
}


function calcStat(sum1, sum2) {
    let result = (sum1 / sum2) * 100
    return result;
}