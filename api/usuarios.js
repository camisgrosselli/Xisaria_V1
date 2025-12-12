import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://kiyolxcnhvoogpovsrpf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeW9seGNuaHZvb2dwb3ZzcnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNjIzNDgsImV4cCI6MjA3OTgzODM0OH0.e-mNEFM9LuI4d0jbaQLW6IEdI_iSfWPaFc5SBqyPpyY"
);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*");

    if (error) return res.status(500).json({ mensagem: "Erro ao buscar" });

    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { nome, email, senha } = req.body;

    const { data, error } = await supabase
      .from("usuarios")
      .insert([
        {
          nome_usuarios: nome,
          email_usuario: email,
          senha_usuarios: senha,
        },
      ])
      .select()
      .single();

    if (error) return res.status(500).json({ mensagem: "Erro ao inserir" });

    return res.status(201).json(data);
  }

  if (req.method === "DELETE") {
    const id = req.query.id;

    const { error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id_usuarios", id);

    if (error) return res.status(500).json({ mensagem: "Erro ao excluir" });

    return res.status(204).send();
  }

  return res.status(405).json({ mensagem: "Método não permitido" });
}
