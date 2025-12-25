
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export enum FetchStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
