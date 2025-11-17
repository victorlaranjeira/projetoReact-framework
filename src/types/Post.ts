// src/types/Post.ts

/**
 * Interface que representa um único recurso "Post" retornado pela API do JSON Server.
 */
export interface Post {
    /**
     * Identificador único do Post (gerado automaticamente pelo JSON Server).
     */
    id: number;
    
    /**
     * Título do Post.
     */
    title: string;
    
    /**
     * Autor do Post.
     */
    author: string;
    
    // Você pode adicionar mais propriedades aqui, como 'body', 'date', etc., 
    // conforme a sua API mock evoluir.
  }
  
  // Opcional: Se a API tiver posts relacionados a IDs
  export interface Comment {
    id: number;
    body: string;
    postId: number; // Chave estrangeira para o Post
  }
  
  // Opcional: Tipo para o objeto profile
  export interface Profile {
    name: string;
  }