// ✅ Senha correta definida (só no index.html precisa)
const senhaCorreta = "Integr@25"; // Altere aqui se necessário

// ✅ Verifica se usuário já autenticou (mantém login ativo mesmo após refresh)
if (sessionStorage.getItem("autenticado") === "true") {
  const loginScreen = document.getElementById("login-screen");
  const conteudoSite = document.getElementById("conteudo-site");

  if (loginScreen) loginScreen.style.display = "none";
  if (conteudoSite) conteudoSite.style.display = "block";
}

// ✅ Função para verificar a senha digitada (só no index.html)
function verificarSenha() {
  const senha = document.getElementById("senha")?.value;
  const erro = document.getElementById("erro");

  if (senha === senhaCorreta) {
    sessionStorage.setItem("autenticado", "true"); // Salva estado de login
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("conteudo-site").style.display = "block";
    if (erro) erro.style.display = "none";
  } else if (erro) {
    erro.style.display = "block";
  }
}

// ✅ Função para "sair" e voltar à tela de login (funciona em todas páginas)
function sair() {
  sessionStorage.removeItem("autenticado"); // Limpa estado de login
  window.location.href = "index.html";
}

// ✅ Função do botão HOME (volta à seção principal sem recarregar)
function irParaHome() {
  // Detecta se estamos no index.html
  const isIndex = window.location.pathname.includes("index");

  if (isIndex) {
    // Rola até o topo apenas se estiver no index.html
    const header = document.querySelector("header");
    if (header) {
      header.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    // Se estiver em outra página, volta ao index sem apagar o login
    window.location.href = "index.html";
  }
}

// ✅ Adiciona listener para Enter no input senha (só no index.html)
if (document.getElementById("senha")) {
  document.getElementById("senha").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      verificarSenha();
    }
  });
}

// ✅ Função de busca genérica para qualquer tabela
function configurarBuscaTabela(inputId, tabelaIndex, mensagemId) {
  const input = document.getElementById(inputId);
  const tabela = document.querySelectorAll("table")[tabelaIndex];
  const mensagem = document.getElementById(mensagemId);

  if (!input || !tabela || !mensagem) return;

  input.addEventListener("input", () => {
    const termo = input.value.toLowerCase();
    const linhas = tabela.querySelectorAll("tbody tr");
    let encontrou = 0;

    linhas.forEach(linha => {
      const textoLinha = linha.textContent.toLowerCase();
      const corresponde = textoLinha.includes(termo);

      linha.style.display = corresponde ? "" : "none";
      linha.classList.remove("destaque-unico");

      if (corresponde) encontrou++;
    });

    if (encontrou === 0) {
      mensagem.style.display = "block";
    } else {
      mensagem.style.display = "none";

      if (encontrou === 1) {
        const linhaUnica = Array.from(linhas).find(l => l.style.display !== "none");
        if (linhaUnica) linhaUnica.classList.add("destaque-unico");
      }
    }
  });
}

// ✅ Aplica estilo visual para o destaque (como Ctrl+F)
const estilo = document.createElement("style");
estilo.innerHTML = `
  .destaque-unico {
    background-color: yellow !important;
    font-weight: bold;
  }
`;
document.head.appendChild(estilo);

// ✅ Função de busca para títulos <h1> com links (ex: Apoios ou Sistemas)
function configurarBuscaTitulos(inputId, containerSelector, mensagemId) {
  const input = document.getElementById(inputId);
  const container = document.querySelector(containerSelector);
  const mensagem = document.getElementById(mensagemId);

  if (!input || !container || !mensagem) return;

  input.addEventListener("input", () => {
    const termo = input.value.toLowerCase();
    const titulos = container.querySelectorAll("h1");
    let encontrou = false;

    titulos.forEach(titulo => {
      const texto = titulo.textContent.toLowerCase();
      const corresponde = texto.includes(termo);
      titulo.style.display = corresponde ? "block" : "none";
      if (corresponde) encontrou = true;
    });

    mensagem.style.display = encontrou ? "none" : "block";
  });
}

// ✅ Inicializa os campos de busca após o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
  // Configura a busca para as tabelas de Apoios e Sistemas
  configurarBuscaTabela("busca-apoios", 0, "mensagem-apoios");
  configurarBuscaTabela("busca-sistemas", 1, "mensagem-sistemas");

  // Busca em títulos (h1) de Apoios e Sistemas
  configurarBuscaTitulos("busca-apoios", "#campos-web-content", "mensagem-apoios");
  configurarBuscaTitulos("busca-sistemas", "#ws-sigs-content", "mensagem-sistemas");
});
