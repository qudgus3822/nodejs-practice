import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getAllPost() {
    return await this.postRepository.getAllPost();
  }

  async createPost(postDto) {
    return await this.postRepository.createPost(postDto);
  }

  async getPost(id: string) {
    return await this.postRepository.getPost(id);
  }

  async deletePost(id: string) {
    return await this.postRepository.deletePost(id);
  }

  async updatePost(id: string, postDto) {
    return await this.postRepository.updatePost(id, postDto);
  }
}
