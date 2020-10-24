const characterCard = document.querySelector('.character-card');
const cards = document.querySelector('.cards');
const modal = document.querySelector('#card-modal');
const close = document.querySelector('.close-modal');
const previousBtn = document.querySelector('#previous');
const nextBtn = document.querySelector('#next');
const apiUrl = 'https://swapi.dev/api/people/';

async function getAllStarWarsCharacters(url) {
  try {
    const response = await fetch(url);
    const { results, next, previous } = await response.json();

    results.forEach(function (character) {
      addCharacter(character)
    });
  
    if (next) {
      nextBtn.onclick = function () {
        removeCards();
        return getAllStarWarsCharacters(next)
      }
    } else {
      nextBtn.setAttribute("disabled", "disabled");
    }

    if (previous != null) {
      previousBtn.onclick = function () {
        removeCards();
        return getAllStarWarsCharacters(previous)
      }
    }


  } catch (error) {
    console.log(error);
  }
};

async function addCharacter(character) {
  const div = document.createElement('div');
  div.className = 'card';
  div.textContent = character.name;
  div.dataset.url = character.url;

  cards.appendChild(div);
  div.addEventListener('click', getCharacter);
}


async function getCharacter() {
  let apiurl = this.getAttribute('data-url');
  const characterUrl = apiurl;
  characterCard.innerHTML = '';

  try {
    const response = await fetch(characterUrl);
    const characterData = await response.json();

    const character = new Character(characterData);

    character.createCharacter();
  } catch (error) {
    console.log(error);
  }
  openModal()
}

class Character {
  constructor(character) {
    this.name = character.name;
    this.gender = character.gender;
    this.birthYear = character.birth_year;
    this.films = this.getFilms(character.films);
    this.homeworld = this.getHomeworld(character.homeworld);
    this.species = this.getSpecies(character.species);
  }

  async createCharacter() {
    const card = document.createElement('div');

    card.classList.add('table');
    card.innerHTML = `
          <div class="table-card-heading">
              ${this.name}
          </div>
          <div class="table-card-body">
            <div class="table-card-item">Birth year: ${this.birthYear}</div>
            <div class="table-card-item">Gender: ${this.gender}</div>
            <div class="table-card-item">Films: ${await this.films}</div>
            <div class="table-card-item">Homeworld: ${await this.homeworld}</div>
            <div class="table-card-item">Species: ${await this.species}</div>
          </div>
      `;

    characterCard.appendChild(card);
  }


  async getFilms(url) {
    try {
      let films = [];
      let filmsTitle = [];
      for (let i = 0; i < url.length; i++) {
        films.push(url[i])
      }
      for (const film of films) {
        const response = await fetch(film);
        const name = await response.json();
        filmsTitle.push(name.title);
      }

      var list = '<ul><li>' + filmsTitle.join('</li><li>') + '</li></ul>';

      return list;

    } catch (error) {
      console.log(error);
    }
  }

  async getHomeworld(url) {
    try {
      const response = await fetch(url);
      const { name } = await response.json();

      return name;
    } catch (error) {
      console.log(error);
    }
  }

  async getSpecies(url) {
    try {
      const response = await fetch(url);
      const { name } = await response.json();

      return name;
    } catch (error) {
      name = 'No species';
      return name;
    }
  }
};

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function removeCards() {
  cards.innerHTML = '';
}

close.addEventListener('click', closeModal)
getAllStarWarsCharacters(apiUrl);

