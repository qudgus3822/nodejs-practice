import { Injectable } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { PostInput } from './post.model';
import { Post } from './post.schema';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getAllPost() {
    return await this.postRepository.getAllPost();
  }

  async createPost(postDto: PostInput): Promise<Post> {
    return await this.postRepository.createPost(postDto);
  }

  async updatePost(postDto: PostInput) {
    return await this.postRepository.updatePost(postDto.id, postDto);
  }

  async getPost(id: string) {
    return await this.postRepository.getPost(id);
  }

  async deletePost(id: string) {
    return await this.postRepository.deletePost(id);
  }
}
