import axiosInstance from "./axiosInstance";

interface SearchQuery {
  searchStr: string;
  subject?:
    | "all"
    | "art"
    | "biography"
    | "computers"
    | "history"
    | "medical"
    | "poetry"
    | string;
  orderBy?: "relevance" | "newest" | string;
  startIndex?: number;
  maxResults?: number;
}

async function getBooks({
  searchStr,
  subject,
  orderBy = "relevance",
  startIndex = 0,
  maxResults = 30,
}: SearchQuery): Promise<BooksResponseData> {
  const q = `title:${searchStr}${subject ? " + subject:" + subject : ""}`;

  const response = await axiosInstance.get(``, {
    params: {
      q: q, // contains category and search string
      orderBy: orderBy,
      startIndex: startIndex,
      maxResults: maxResults,
    },
  });

  return response.data;
}
async function getBook(id: string): Promise<VolumeInfo | undefined> {
  const response = await axiosInstance.get(`/${id}`);
  return response.data.volumeInfo ? response.data.volumeInfo : undefined;
}
export { axiosInstance, getBooks, getBook };
