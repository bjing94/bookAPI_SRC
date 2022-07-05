interface VolumeInfo {
  title: string;
  authors: string[];
  publisher: string;
  publishedDate: Date;
  description: string;
  categories: string[];
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
}
interface BookInfo {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
}

interface BooksResponseData {
  kind: string;
  totalItems: number;
  items?: BookInfo[];
}
