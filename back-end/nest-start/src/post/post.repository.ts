import { Injectable } from '@nestjs/common';
import { PostDto } from './post.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.schema';

export interface IPostRepository {
  getAllPost(): Promise<Post[]>;
  createPost(postDto: PostDto);
  getPost(id: string): Promise<PostDto>;
  deletePost(id: string);
  updatePost(id: string, postDto: PostDto);
}

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async getAllPost(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  async createPost(postDto: PostDto) {
    const createPost = {
      ...postDto,
      createdDt: new Date(),
      updatedDt: new Date(),
    };
    this.postModel.create(createPost);
  }

  async getPost(id: string): Promise<PostDto> {
    return await this.postModel.findById(id);
  }

  async deletePost(id: string) {
    await this.postModel.findByIdAndDelete(id);
  }

  async updatePost(id: string, postDto: PostDto) {
    const updatePost = { id, ...postDto, updatedDt: new Date() };
    await this.postModel.findByIdAndUpdate(id, updatePost);
  }
}
