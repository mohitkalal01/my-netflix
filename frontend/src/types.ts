export interface IUser {
  id: string;
  username: string;
  role: string;
  email: string;
  isAdmin: boolean;
}

export interface IMovie {
  _id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  genre: string;
  thumbnail: string;
  videoUrl: string;
  isSeries: boolean;
  isTrending: boolean;
  isFeatured: boolean;
  backdrop_path: string;
  overview: string;
}
