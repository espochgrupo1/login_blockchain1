export interface IMovies {
  mov_id: number;
  mov_name: string;
  mov_link: string;
  is_valid: boolean;
}

export interface IResponseMovies {
  error: boolean;
  status: number;
  body: IMovies;
}
