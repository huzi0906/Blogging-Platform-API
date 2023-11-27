export interface Response<T> {
  Message: string;
  data: T;
}

export interface Author {
  _id: string;
  username: string;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: Author;
  averageRating: number;
}

// export interface Feed {
//   data: Blog[];
// }
