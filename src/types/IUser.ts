export interface IUser {
  id: string,
  email: string,
  firstname: string,
  lastname: string,
  surname: string,
  position: string,
  avatar: string,
  isAdmin: boolean,
};

export interface IUserReg {
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  isAdmin: boolean,
  position: string,
};

// export interface IUserUpdateProfileImage {
//   id: string;
//   profileImage: string;
// };

// export interface IUserUpdateIsBlocked {
//   id: string;
//   isBlocked: boolean;
// };