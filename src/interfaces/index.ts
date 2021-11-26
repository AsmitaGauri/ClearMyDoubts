interface User {
  uid: string | null,
  displayName: string | null,
  email: string | null,
  emailVerified: boolean | null,
  phoneNumber: string | null,
  photoURL: string | null,
  idToken: string | null
}

interface Error {
  code: string | null,
  message: string | null
}

interface Auth {
  isRegistering: boolean,
  user: User,
  isLoggedIn: boolean,
  error: Error,
}

interface Post{
  id: string,
  title: string,
  content: string,
  userName: string,
  userPicture: string | null,
  postingDate: string,
  likes: number,
  replies: number,
  views: number,
}

export type {
  Auth, User, Error, Post,
};
