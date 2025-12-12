import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://kiyolxcnhvoogpovsrpf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeW9seGNuaHZvb2dwb3ZzcnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjIzNDgsImV4cCI6MjA3OTgzODM0OH0.e-mNEFM9LuI4d0jbaQLW6IEdI_iSfWPaFc5SBqyPpyY"
);

export default async function handler(req, res) {
  // GET /produtos
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .order("id_produtos", { ascending: true });

    if (error) return res.status(500).json({ mensagem: "Erro ao buscar" });

    return res.status(200).json(data);
  }

  // POST /produtos
  if (req.method === "POST") {
    const { nome, preco, estoque } = req.body;

    if (!nome || preco == null || estoque == null) {
      return res.status(400).json({ mensagem: "Dados obrigatórios ausentes." });
    }

    const precoNumero = Number(String(preco).replace(",", "."));
    const estoqueNumero = Number(estoque);

    const agora = new Date().toISOString();

    const { data, error } = await supabase
      .from("produtos")
      .insert([
        {
          nome_produtos: nome,
          preco_produtos: precoNumero,
          categoria_produtos: estoqueNumero,
          descricao_produtos: "Produto cadastrado pela API",
          data_cadastro_produtos: agora,
        },
      ])
      .select()
      .single();

    if (error) return res.status(500).json({ mensagem: "Erro ao inserir" });

    return res.status(201).json(data);
  }

  // DELETE /produtos/:id
  if (req.method === "DELETE") {
    const id = req.query.id;

    const { error } = await supabase
      .from("produtos")
      .delete()
      .eq("id_produtos", id);

    if (error) return res.status(500).json({ mensagem: "Erro ao excluir" });

    return res.status(204).send();
  }

  return res.status(405).json({ mensagem: "Método não permitido" });
}
