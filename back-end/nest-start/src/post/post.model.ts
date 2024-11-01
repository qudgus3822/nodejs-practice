export interface PostDto {
  id: string;
  title: string;
  content: string;
  writer: string;
  password: string;
  createdDt: Date;
  updatedDt?: Date;
}
