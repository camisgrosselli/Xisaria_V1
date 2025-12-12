const API_BASE = "/api";

// =======================
// CARREGAR PRODUTOS (GET)
// =======================
async function carregarProdutos() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "<li>Carregando...</li>";

  try {
    const resp = await fetch(`${API_BASE}/produtos`);

    if (!resp.ok) {
      lista.innerHTML = "<li>Erro ao carregar produtos.</li>";
      return;
    }

    const produtos = await resp.json();

    if (!produtos || produtos.length === 0) {
      lista.innerHTML = "<li>Nenhum produto cadastrado.</li>";
      return;
    }

    lista.innerHTML = "";

    for (const p of produtos) {
      const li = document.createElement("li");

      li.textContent =
        `${p.nome_produtos} — ` +
        `R$ ${Number(p.preco_produtos).toFixed(2)} — ` +
        `Estoque: ${p.categoria_produtos}`;

      const btnDel = document.createElement("button");
      btnDel.textContent = "Excluir";
      btnDel.style.marginLeft = "8px";

      btnDel.onclick = async () => {
        await excluirProduto(p.id_produtos);
        await carregarProdutos();
      };

      li.appendChild(btnDel);
      lista.appendChild(li);
    }
  } catch (err) {
    console.error(err);
    lista.innerHTML = "<li>Erro inesperado.</li>";
  }
}

// =======================
// EXCLUIR PRODUTO
// =======================
async function excluirProduto(id) {
  try {
    const resp = await fetch(`${API_BASE}/produtos/${id}`, {
      method: "DELETE",
    });

    if (!resp.ok) {
      alert("Erro ao excluir produto.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro inesperado.");
  }
}

// =======================
// CADASTRAR PRODUTO
// =======================
document.getElementById("form-produto").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fd = new FormData(e.target);

  const novo = {
    nome: fd.get("nome"),
    preco: fd.get("preco"),
    estoque: fd.get("estoque"),
  };

  try {
    const resp = await fetch(`${API_BASE}/produtos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo),
    });

    if (!resp.ok) {
      const erro = await resp.json().catch(() => ({}));
      alert(erro.mensagem || "Erro ao cadastrar.");
      return;
    }

    e.target.reset();
    await carregarProdutos();
  } catch (err) {
    console.error(err);
    alert("Erro inesperado.");
  }
});

carregarProdutos();

// =======================
// CARREGAR USUÁRIOS
// =======================
async function carregarUsuarios() {
  const lista = document.getElementById("lista-usuarios");
  lista.innerHTML = "<li>Carregando...</li>";

  try {
    const resp = await fetch(`${API_BASE}/usuarios`);

    if (!resp.ok) {
      lista.innerHTML = "<li>Erro ao carregar usuários.</li>";
      return;
    }

    const usuarios = await resp.json();

    if (!usuarios || usuarios.length === 0) {
      lista.innerHTML = "<li>Nenhum usuário cadastrado.</li>";
      return;
    }

    lista.innerHTML = "";

    for (const u of usuarios) {
      const li = document.createElement("li");

      li.textContent = `${u.nome_usuarios} — ${u.email_usuario}`;

      const btnDel = document.createElement("button");
      btnDel.textContent = "Excluir";
      btnDel.style.marginLeft = "8px";

      btnDel.onclick = async () => {
        await excluirUsuario(u.id_usuarios);
        await carregarUsuarios();
      };

      li.appendChild(btnDel);
      lista.appendChild(li);
    }
  } catch (err) {
    console.error(err);
    lista.innerHTML = "<li>Erro inesperado.</li>";
  }
}

// =======================
// EXCLUIR USUÁRIO
// =======================
async function excluirUsuario(id) {
  try {
    const resp = await fetch(`${API_BASE}/usuarios/${id}`, {
      method: "DELETE",
    });

    if (!resp.ok) alert("Erro ao excluir usuário.");
  } catch (err) {
    console.error(err);
    alert("Erro inesperado.");
  }
}

// =======================
// CADASTRAR USUÁRIO
// =======================
document.getElementById("form-usuario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fd = new FormData(e.target);

  const novo = {
    nome: fd.get("nome"),
    email: fd.get("email"),
    senha: fd.get("senha"),
  };

  try {
    const resp = await fetch(`${API_BASE}/usuarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novo),
    });

    if (!resp.ok) {
      const erro = await resp.json().catch(() => ({}));
      alert(erro.mensagem || "Erro ao cadastrar.");
      return;
    }

    e.target.reset();
    await carregarUsuarios();
  } catch (err) {
    console.error(err);
    alert("Erro inesperado.");
  }
});

carregarUsuarios();
