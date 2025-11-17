// src/services/postService.ts

import { type Post } from '../types/Post'; 

// URL base da sua API do JSON Server
const API_URL = 'http://localhost:3001'; 

/**
 * Interface que define a estrutura de dados necessária para criar um novo Post.
 * O ID é omitido, pois será gerado pelo JSON Server.
 */
type NewPostData = Omit<Post, 'id'>;

// --- FUNÇÃO 1: BUSCAR TODOS (GET) ---

/**
 * Função para buscar todos os posts da API.
 * @returns Uma Promise que resolve para um array de objetos Post.
 */
export async function fetchAllPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_URL}/posts`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados: ${response.status} ${response.statusText}`);
    }

    const data: Post[] = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// --- FUNÇÃO 2: CADASTRAR NOVO (POST) ---

/**
 * Função para cadastrar um novo post na API.
 * @param newPost Os dados do novo post (sem o ID).
 * @returns Uma Promise que resolve para o objeto Post criado, incluindo o ID.
 */
export async function createPost(newPost: NewPostData): Promise<Post> {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost), 
    });

    if (!response.ok) {
      throw new Error(`Erro ao cadastrar: ${response.status} ${response.statusText}`);
    }

    const createdPost: Post = await response.json();
    return createdPost;
  } catch (error) {
    throw error;
  }
}

// --- FUNÇÃO 3: ATUALIZAR EXISTENTE (PATCH) ---

/**
 * Função para atualizar parcialmente um post existente na API.
 * Usamos PATCH para enviar apenas os campos que mudaram.
 * @param id O ID do post a ser atualizado.
 * @param updatedData Os dados a serem alterados (Partial<NewPostData> permite apenas title ou author).
 * @returns Uma Promise que resolve para o objeto Post atualizado.
 */
export async function updatePost(id: number, updatedData: Partial<NewPostData>): Promise<Post> {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PATCH', // Método PATCH para atualização parcial
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData), 
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar: ${response.status} ${response.statusText}`);
    }

    const updatedPost: Post = await response.json();
    return updatedPost;
  } catch (error) {
    throw error;
  }
}