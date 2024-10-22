const chaveAPI = "3e4eb591a2ee5dcaf4bfb2d517413ca3";
const cidadeFixa = "São João dos Patos";

const elementoTemperatura = document.querySelector("#temperatura span");
const elementoUmidade = document.querySelector("#umidade span");
const carregando = document.querySelector("#carregando");

// Função para mostrar/ocultar o loader
const alternarCarregando = () => {
  carregando.classList.toggle("esconder");
};

// Função para obter os dados do clima
const obterDadosClima = async (cidade) => {
  alternarCarregando();
  
  const apiURLClima = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveAPI}&lang=pt_br`;
  
  const resposta = await fetch(apiURLClima);
  const dados = await resposta.json();

  alternarCarregando();
  
  return dados;
};

// Função para exibir os dados do clima
const mostrarDadosClima = async (cidade) => {
  const dados = await obterDadosClima(cidade);

  if (dados.cod === "404") {
    alert("Erro: Cidade não encontrada");
    return;
  }

  elementoTemperatura.innerText = parseInt(dados.main.temp);
  elementoUmidade.innerText = `${dados.main.humidity}`;
};

// Atualiza os dados de São João dos Patos ao carregar a página
window.addEventListener("load", () => {
  mostrarDadosClima(cidadeFixa);

  // Atualizar a cada 10 minutos (600.000 milissegundos)
  setInterval(() => {
    mostrarDadosClima(cidadeFixa);
  }, 300000);
});
