import type { CatImage } from "../types/cat";

const CATS_API_URL = "https://api.thecatapi.com/v1/images/search";
export const PAGE_SIZE = 20;

const apiKey = import.meta.env.VITE_CAT_API_KEY;

export async function fetchCats(page: number, signal?: AbortSignal): Promise<CatImage[]> {

  const searchParams = new URLSearchParams({
    limit: String(PAGE_SIZE),
    page: String(page),
    order: "ASC",
    size: "med",
  });

  const headers: HeadersInit = apiKey ? { "x-api-key": apiKey } : {};

  const response = await fetch(`${CATS_API_URL}?${searchParams.toString()}`, {
    method: "GET",
    headers,
    signal,
  });

  if (!response.ok) {
    throw new Error(`Ошибка загрузки котиков: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Некорректный ответ от сервера");
  }

  return data as CatImage[];
}