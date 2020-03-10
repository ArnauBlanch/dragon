export interface Book {
  isbn: number;
  title: string;
  author: string;
  category: string;
  coverUrl?: string;
  publisher: string;
  price: number;
  reducedPrice: number;
  totalCopies: number;
  availableCopies: number;
}
