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
  const isIndex = window.location.pathname.endsWith("index.html") || window.location.pathname === "/" || window.location.pathname.endsWith("/index");

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
