const content = document.getElementById('content');
let page = Number(window.location.hash.replace("#", ""));
let maxpage = 0;

async function getCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character${isNaN(page) || page <= 0 ? '' : '?page=' + page}`
  );
  const data = await response.json();
  maxpage = data.info.pages;

  
  content.innerHTML = '';
  const lista = document.createElement('ul');
  let characters = '';

  data.results.forEach(element => {
    characters += `
      <li style="margin-bottom:20px;">
        <h3>${element.name}</h3>
        <img 
          src="${element.image}" 
          alt="${element.name}" 
          width="150" 
          style="cursor:pointer;" 
          onclick="showDetail(${element.id})"
        />
        <div id="detail-${element.id}" style="display:none; margin-top:10px; border:1px solid #ccc; padding:10px; border-radius:8px;"></div>
      </li>
    `;
  });

  lista.innerHTML = characters;
  content.appendChild(lista);

  
  let paginate = '';
  if (!page || page === 1) {
    paginate = `<button onClick="next()">Próximo</button>`;
  }
  if (page > 1 && page < maxpage) {
    paginate = `
      <button onClick="prev()">Anterior</button>
      <button onClick="next()">Próximo</button>
    `;
  }
  if (page >= maxpage) {
    paginate = `<button onClick="prev()">Anterior</button>`;
  }

  document.getElementById('paginate').innerHTML = paginate;
}

getCharacters();


async function showDetail(id) {
  const detailBox = document.getElementById(`detail-${id}`);


  if (detailBox.style.display === "block") {
    detailBox.style.display = "none";
    return;
  }

  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const char = await response.json();

  detailBox.innerHTML = `
    <h4>${char.name}</h4>
    <img src="${char.image}" alt="${char.name}" width="200"/>
    <p><strong>Espécie:</strong> ${char.species}</p>
    <p><strong>Gênero:</strong> ${char.gender}</p>
    <p><strong>Mundo/Dimensão:</strong> ${char.origin.name}</p>
    <p><strong>Status:</strong> ${char.status}</p>
  `;
  detailBox.style.display = "block";
}


function next() {
  const newPage = page === 0 ? 2 : page + 1;
  window.location.hash = "#" + newPage;
  window.location.reload();
}
function prev() {
  const newPage = page === 0 ? 2 : page - 1;
  window.location.hash = "#" + newPage;
  window.location.reload();
}
