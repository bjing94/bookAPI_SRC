import { makeObservable, observable, flow, action } from "mobx";
import { getBooks } from "../services/bookService";
class BookStore {
  startIndex: number = 0;
  searchStr: string = "";
  subject: string = "";
  orderBy: string = "";

  books: BooksResponseData | null = null;

  isLoading: boolean = false;
  isLoadingMore: boolean = false;

  constructor() {
    makeObservable(this, {
      books: observable,
      startIndex: observable,
      isLoading: observable,
      isLoadingMore: observable,
      setBooks: action,
      setStartIndex: action,
      setIsLoading: action,
      setIsLoadingMore: action,
      fetchBooks: action,
      fetchMoreBooks: flow,
    });
  }

  setBooks(newBooks: BooksResponseData | null) {
    this.books = newBooks;
  }

  setStartIndex(newIndex: number) {
    this.startIndex = newIndex;
  }

  setIsLoading(val: boolean) {
    this.isLoading = val;
  }

  setIsLoadingMore(val: boolean) {
    this.isLoadingMore = val;
  }

  async fetchBooks(searchStr: string, subject: string, orderBy: string) {
    this.setIsLoading(true);
    this.searchStr = searchStr;
    this.subject = subject;
    this.orderBy = orderBy;
    this.setStartIndex(0);
    const data = await getBooks({
      searchStr: this.searchStr,
      subject: this.subject,
      orderBy: this.orderBy,
      startIndex: this.startIndex,
    });
    this.setBooks(data);
    this.setIsLoading(false);
  }

  async fetchMoreBooks() {
    if (!this.books) return;
    this.setStartIndex(this.startIndex + 30);
    this.setIsLoadingMore(true);
    const data = await getBooks({
      searchStr: this.searchStr,
      subject: this.subject,
      orderBy: this.orderBy,
      startIndex: this.startIndex,
    });
    const newBookData = { ...this.books };
    if (newBookData.items && data.items) {
      newBookData.items = [...newBookData.items, ...data.items];
    }
    this.setBooks(newBookData);
    this.setIsLoadingMore(false);
  }
}

const bookStore = new BookStore();
export default bookStore;
