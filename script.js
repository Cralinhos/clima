const chaveAPI = "58bfef138ac0599440da64cdfbd06b78";
const cidadeFixa = "São João dos Patos";

const elementoTemperatura = document.querySelector("#temperatura span");
const elementoUmidade = document.querySelector("#umidade span");
const carregando = document.querySelector("#carregando");

const alternarCarregando = () => {
  carregando.classList.toggle("esconder");
};

const obterDadosClima = async (cidade) => {
  alternarCarregando();
  
  const apiURLClima = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveAPI}&lang=pt_br`;
  
  const resposta = await fetch(apiURLClima);
  const dados = await resposta.json();

  alternarCarregando();
  
  return dados;
};

const mostrarDadosClima = async (cidade) => {
  const dados = await obterDadosClima(cidade);

  if (dados.cod === "404") {
    alert("Erro: Cidade não encontrada");
    return;
  }

  elementoTemperatura.innerText = parseInt(dados.main.temp);
  elementoUmidade.innerText = `${dados.main.humidity}`;
};

window.addEventListener("load", () => {
  mostrarDadosClima(cidadeFixa);

  setInterval(() => {
    mostrarDadosClima(cidadeFixa);
  }, 300000);
});


