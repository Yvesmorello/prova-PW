function changePageTitle(title) {
    document.title = title
  }
  
  function generateInfoSection(uf) {
    
    const h2 = document.createElement('h2')
    h2.id = "info-pokemon-label"
    h2.textContent = `Informações sobre ${uf}`
  
    const img = document.querySelector('img')
    img.src = imagens[0]
    img.alt = `Imagem do pokemon ${pokemonName}`
  
    const section = document.querySelector('#info-pokemon')
  
    section.appendChild(h2)
    section.appendChild(img)
  
    let indiceAtual = 0;
  
    img.addEventListener('click', () => {
      indiceAtual = (indiceAtual + 1) % imagens.length;
      img.src = imagens[indiceAtual];
    });
  }
  
  
  async function getEstadosDataUf(uf) {  
    try {
      const data = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios
      `)
  
      const jsonData = await data.json()
  
      generateInfoSection(jsonData)
    } catch (error) {
      console.error(error)
    }
  }
  
  function getSearchParams() {
    // Early return -> Caso location search, não faz nada.
    if (!location.search) {
      return
    }
  
    // URLSearchParams é uma classe que facilita a manipulação de query strings
    const urlSearchParams = new URLSearchParams(location.search)
  
    // Pegando o valor do parâmetro name
    const estadoUf = urlSearchParams.get('uf')
  
    changePageTitle(`Município de ${uf}`)
    getEstadosDataUf(uf)
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    getSearchParams()
  })