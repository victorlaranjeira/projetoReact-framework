// src/components/PostList.tsx

import { useState, type FormEvent } from 'react';
import { type Post } from '../types/Post'; 

interface PostListProps {
  posts: Post[];
  onUpdatePost: (id: number, updatedFields: { title?: string, author?: string }) => Promise<void>;
}

export function PostList({ posts, onUpdatePost }: PostListProps) {
  // Estado para controlar qual post está sendo editado (ID ou null)
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  
  // Estados para os dados do formulário de edição
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentAuthor, setCurrentAuthor] = useState('');

  // 1. Inicia o modo de edição para um post
  const handleStartEdit = (post: Post) => {
    setEditingPostId(post.id);
    setCurrentTitle(post.title);
    setCurrentAuthor(post.author);
  };

  // 2. Cancela o modo de edição
  const handleCancelEdit = () => {
    setEditingPostId(null);
  };

  // 3. Salva a edição (chama a função PATCH do serviço)
  const handleSaveEdit = (e: FormEvent) => {
    e.preventDefault();
    
    if (editingPostId === null) return;
    
    // Chama a função de atualização da HomePage
    onUpdatePost(editingPostId, { title: currentTitle, author: currentAuthor });
    
    setEditingPostId(null); // Sai do modo de edição
  };

  return (
    <div>
      <h1>📚 Lista de Posts</h1> 
      
      {posts.map((post) => (
        <div 
          key={post.id} 
          style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px' }}
        >
          {/* Lógica de Renderização Condicional */}
          {editingPostId === post.id ? (
            
            // --- MODO DE EDIÇÃO (RENDERIZA O FORMULÁRIO) ---
            <form onSubmit={handleSaveEdit} style={{ border: '2px solid orange', padding: '15px' }}>
              <input 
                type="text" 
                value={currentTitle} 
                onChange={(e) => setCurrentTitle(e.target.value)}
                required
                style={{ width: '100%', marginBottom: '8px' }}
              />
              <input 
                type="text" 
                value={currentAuthor} 
                onChange={(e) => setCurrentAuthor(e.target.value)}
                required
                style={{ width: '100%', marginBottom: '10px' }}
              />
              <button type="submit">Salvar</button>
              <button type="button" onClick={handleCancelEdit} style={{ marginLeft: '10px' }}>Cancelar</button>
            </form>

          ) : (
            
            // --- MODO DE VISUALIZAÇÃO (RENDERIZA O TEXTO) ---
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2>{post.title}</h2>
                <p>Autor: **{post.author}** (ID: {post.id})</p>
              </div>
              <button onClick={() => handleStartEdit(post)}>Editar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}