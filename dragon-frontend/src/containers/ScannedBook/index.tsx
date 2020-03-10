import React from 'react';
import { Book } from '../../models/book';
import '../../styles/scanner.css';
import ScannedBookMobile from './ScannedBookMobile';
import ScannedBookDesktop from './ScannedBookDesktop';

type Props = { book: Book; onScan: () => void };
const ScannerBook: React.FC<Props> = ({ book, onScan }: Props) => {
  return (
    <>
      <ScannedBookMobile book={book} onScan={onScan} onSell={() => null} />
      <ScannedBookDesktop book={book} onScan={onScan} onSell={() => null} />
    </>
  );
};

export default ScannerBook;
