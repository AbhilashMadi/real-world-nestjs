import { UserEntity } from '~/user/user.entity';

export default interface IArticleResponse {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
    tagList: string[];
    author: Pick<UserEntity, 'username' | 'bio' | 'image'> & {
      following: boolean;
    };
  };
}
