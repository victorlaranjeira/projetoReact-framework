// src/pages/HomePage/HomePage.tsx

import { useState, useEffect } from 'react';
import { type FormEvent } from 'react';

// Caminho Corrigido (dois níveis de subida):
import { type Post } from '../../types/Post'; 
import { fetchAllPosts, createPost, updatePost } from '../../services/postService'; 
import { PostList } from '../../components/PostList'; 


// 1. CORREÇÃO PRINCIPAL: Usamos 'export default' diretamente aqui
export default function HomePage() { 
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  // 2. useEffect para buscar posts (GET)
  useEffect(() => {
    async function getPosts() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAllPosts();
        setPosts(data);
      } catch (err) {
        console.error("Erro ao carregar posts:", err);
        setError("Não foi possível carregar os posts. Verifique se o JSON Server está rodando.");
      } finally {
        setLoading(false);
      }
    }

    getPosts();
  }, []);

  // 3. Função para lidar com o cadastro (POST)
  async function handleAddPost(event: FormEvent) {
    event.preventDefault();

    if (!newTitle || !newAuthor) {
        setError("Título e autor são obrigatórios!");
        return;
    }

    const newPostData = {
      title: newTitle,
      author: newAuthor,
    };

    try {
      setError(null);
      const createdPost = await createPost(newPostData);
      setPosts(prevPosts => [...prevPosts, createdPost]);
      
      setNewTitle('');
      setNewAuthor('');
      
    } catch (error) {
      setError("Falha ao cadastrar o post.");
      console.error(error);
    }
  }

  // 4. Função para Edição (PATCH)
  async function handleUpdatePost(id: number, updatedFields: { title?: string, author?: string }) {
    try {
      setError(null);
      const updatedPost = await updatePost(id, updatedFields); 

      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === id ? updatedPost : post
        )
      );
    } catch (error) {
      setError("Falha ao atualizar o post.");
      console.error(error);
    }
  }


  // 5. Renderização Condicional
  if (loading) {
    return <h1>Carregando posts...</h1>;
  }

  if (error) {
    return <h1 style={{ color: 'red', textAlign: 'center' }}>Erro: {error}</h1>;
  }
  
  // 6. Renderização do Formulário e da Lista
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      
      <h2>Adicionar Novo Post</h2>
      <form onSubmit={handleAddPost} style={{ border: '1px dashed #007bff', padding: '20px', marginBottom: '30px', borderRadius: '8px' }}>
        <input 
          type="text" 
          placeholder="Título" 
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
          style={{ padding: '10px', width: '100%', boxSizing: 'border-box', marginBottom: '10px' }}
        />
        <input 
          type="text" 
          placeholder="Autor" 
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          required
          style={{ padding: '10px', width: '100%', boxSizing: 'border-box', marginBottom: '15px' }}
        />
        <button 
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
            Cadastrar Post
        </button>
      </form>

      {posts.length > 0 ? (
          <PostList posts={posts} onUpdatePost={handleUpdatePost} />
      ) : (
          <h1>Nenhum post encontrado.</h1>
      )}
    </div>
  );
}
