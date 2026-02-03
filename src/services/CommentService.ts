import { AxiosResponse } from "axios";
import serverApi from "../http";
import { IComment, IEntity, ICommentNew } from "../types/IComment";

export default class CommentService {
  static async addComment(data: {comment: ICommentNew, entity: IEntity}): Promise<AxiosResponse<IComment>> {
    console.log('comment from client', data)
    return serverApi.post<IComment>('/comments', data);
  };

  static async getCommentByID(commentID: string): Promise<AxiosResponse<IComment>> {
    return serverApi.get<IComment>(`/comments/${commentID}`);
  };

  static async getAllComments(): Promise<AxiosResponse<IComment[]>> {
    return serverApi.get<IComment[]>(`/comments`);
  };

  // static async getAllCommentTitles(): Promise<AxiosResponse<ICommentTitle[]>> {
  //   return serverApi.get<ICommentTitle[]>(`/commenttitles`);
  // };
  
  // static async updateCommentByID(commentID: string, comment: ICommentUpdate): Promise<AxiosResponse<IComment>> {
  //   return serverApi.put<IComment>(`/comments/${commentID}`, comment);
  // };

  static async deleteCommentByID(commentID: string): Promise<AxiosResponse<IComment>> {
    return serverApi.delete<IComment>(`/comments/${commentID}`);
  };

};