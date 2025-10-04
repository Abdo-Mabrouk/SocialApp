
export type postsState ={
    Posts : null | Post[],
    userPostt : null | Post[],
    singlePosts : null | Post
}




// Pagination details
export interface PaginationInfo {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
  total: number;
}

// Basic user info (used for posts and comments)
export interface UserInfo {
  _id: string;
  name: string;
  photo: string;
}

// Comment object
export interface Comment {
  _id: string;
  content: string;
  commentCreator: UserInfo;
  post: string;
  createdAt: string; // ISO date string
}

// Post object
export interface Post {
  _id: string;
  body: string;
  user: UserInfo;
  createdAt: string; // ISO date string
  comments: Comment[];
  id: string;
  image?: string;
}

// Full API response
export interface PostsResponse {
  message: string;
  paginationInfo: PaginationInfo;
  posts: Post[];
}
