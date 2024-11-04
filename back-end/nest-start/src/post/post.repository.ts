import { Injectable } from '@nestjs/common';
import { PostInput } from './post.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.schema';

export interface IPostRepository {
  getAllPost(): Promise<Post[]>;
  createPost(postDto: PostInput): Promise<Post>;
  getPost(id: string): Promise<Post>;
  deletePost(id: string);
  updatePost(id: string, postDto: PostInput): Promise<Post>;
}

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async getAllPost(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  async createPost(postDto: PostInput) {
    const createPost = {
      ...postDto,
      createdDt: new Date(),
      updatedDt: new Date(),
    };
    console.log(createPost);
    const newPost = await this.postModel.create(createPost);
    newPost.id = newPost._id;
    return newPost;
  }

  async updatePost(id: string, postDto: PostInput) {
    const updatePost = { ...postDto, updatedDt: new Date() };
    return await this.postModel.findByIdAndUpdate(id, updatePost);
  }

  async getPost(id: string): Promise<Post> {
    return await this.postModel.findById(id);
  }

  async deletePost(id: string) {
    await this.postModel.findByIdAndDelete(id);
  }
}
