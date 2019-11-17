const API_SEARCH = 'http://api.giphy.com/v1/gifs/search';
const API_TRENDING = 'http://api.giphy.com/v1/gifs/trending';
const API_GET_BY_ID = 'http://api.giphy.com/v1/gifs';
const API_KEY = process.env.REACT_APP_API_KEY || '';
const PAGE_SIZE = 50;

export interface Gif {
  id: string;
  title: string;
  images: {
    fixed_width: {
      width: number;
      height: number;
      url: string;
    };
    original: {
      width: number;
      height: number;
      url: string;
    };
  };
}

export interface Pagination {
  offset: number;
  total_count: number;
  count: number;
}

export interface Metadata {
  msg: string;
  status: number;
  response_id: string;
}

export interface SearchGifsResponse {
  data: Gif[];
  pagination: Pagination;
  meta: Metadata;
}

export interface GetGifByIdResponse {
  data: Gif;
  meta: Metadata;
}

export async function getGif(search: string): Promise<SearchGifsResponse> {
  const params = Object.entries({
    api_key: API_KEY,
    limit: 1,
    offset: 0,
    ...(search ? { q: search } : {}),
  })
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const url = `${API_SEARCH}?${params}`;
  const res = await fetch(url);
  return res.json();
}

export async function searchGifs(search: string, offset: number): Promise<SearchGifsResponse> {
  const endpoint = search ? API_SEARCH : API_TRENDING;
  const params = Object.entries({
    api_key: API_KEY,
    limit: PAGE_SIZE,
    offset,
    ...(search ? { q: search } : {}),
  })
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const url = `${endpoint}?${params}`;
  const res = await fetch(url);
  return res.json();
}

export async function getGifById(id: string): Promise<GetGifByIdResponse> {
  const res = await fetch(`${API_GET_BY_ID}/${id}?api_key=${API_KEY}`);
  return res.json();
}
