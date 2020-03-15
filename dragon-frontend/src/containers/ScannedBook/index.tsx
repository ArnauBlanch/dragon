import React from 'react';
import { Book } from '../../models/book';
import '../../styles/scanner.css';
import ScannedBookMobile from './ScannedBookMobile';
import ScannedBookDesktop from './ScannedBookDesktop';

type Props = { book: Book; onScanAgain: () => void };
const ScannerBook: React.FC<Props> = ({ book, onScanAgain }: Props) => {
  return (
    <>
      <ScannedBookMobile book={book} onScanAgain={onScanAgain} onSell={() => null} />
      <ScannedBookDesktop book={book} onScanAgain={onScanAgain} onSell={() => null} />
    </>
  );
};

export default ScannerBook;
