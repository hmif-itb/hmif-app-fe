export interface Post {
  id: number;
  profile: {
    name: string;
    email: string;
    picture: string;
  };
  title: string;
  content: string;
  TagData: string[];
  image: string[];
}
