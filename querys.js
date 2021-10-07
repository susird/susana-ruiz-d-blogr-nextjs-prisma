import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    feed {
      id
      title
      content
      published
      authorId 
      author {name email}
    }
  }
`;
