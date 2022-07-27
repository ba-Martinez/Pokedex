const pokeName = document.querySelector('.pokemonName');
const pokeNumber = document.querySelector('.pokemonId');
const pokeImage = document.querySelector('.pokemonImage');

const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');
const btnPrev = document.querySelector('.btnPrevious');
const btnNext = document.querySelector('.btnNext');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    
    pokeName.innerHTML ='Loading...';
    pokeNumber.innerHTML = '';
    
    const data = await fetchPokemon(pokemon);
    
    if(data){
        pokeImage.style.display = 'block';
        pokeName.innerHTML = data.name;
        pokeNumber.innerHTML = data.id;
        pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value='';
        searchPokemon = data.id;
    }else{
        pokeImage.style.display = 'none';
        pokeName.innerHTML = 'Not found :(';
        pokeNumber.innerHTML = '';
        input.value='';
    }
}

form.addEventListener('submit', (event) =>{
    
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', (event) =>{
    if(searchPokemon >1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon); 
    }
    
});

btnNext.addEventListener('click', (event) =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
