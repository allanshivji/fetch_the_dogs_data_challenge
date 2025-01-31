import { FC, JSX } from 'react';
import {
  Pagination, 
  PaginationItem, 
  PaginationLink 
} from 'reactstrap';

interface PaginationComponentProps {
  page: number;
  setPage: (pageNum: number) => void;
  maxPagesToShow: number;
  totalPages: number;
}

const PaginationComponent: FC<PaginationComponentProps> = ({ page, setPage, maxPagesToShow, totalPages }) => {

    // Determine the range of pages to display
    const getPageRange = () => {
      const range: number[] = [];
      const leftLimit = Math.max(1, page - Math.floor(maxPagesToShow / 2));
      const rightLimit = Math.min(totalPages, leftLimit + maxPagesToShow - 1);
  
      for (let i = leftLimit; i <= rightLimit; i++) {
        range.push(i);
      }
  
      return range;
    };

  // Function to render the page numbers with ellipses and last page
  const renderPagination = () => {
      const range = getPageRange();
  
      const pages: JSX.Element[] = [];
  
      // Always show "1" and "..." before the range if not the first pages
      if (range[0] > 1) {
        pages.push(
          <PaginationItem key="first">
            <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
          </PaginationItem>
        );
        if (range[0] > 2) {
          pages.push(
            <PaginationItem key="ellipsis-start">
              <PaginationLink disabled>...</PaginationLink>
            </PaginationItem>
          );
        }
      }
  
      // Add the range of pages
      range.forEach((pageNum) => {
        pages.push(
          <PaginationItem key={pageNum} active={pageNum === page}>
            <PaginationLink onClick={() => setPage(pageNum)}>{pageNum}</PaginationLink>
          </PaginationItem>
        );
      });
  
      // Always show "..." and the last page if not the last pages
      if (range[range.length - 1] < totalPages) {
        if (range[range.length - 1] < totalPages - 1) {
          pages.push(
            <PaginationItem key="ellipsis-end">
              <PaginationLink disabled>...</PaginationLink>
            </PaginationItem>
          );
        }
        pages.push(
          <PaginationItem key="last">
            <PaginationLink onClick={() => setPage(totalPages)}>{totalPages}</PaginationLink>
          </PaginationItem>
        );
      }
  
      return pages;
    };

  return (
    <>
      <Pagination>
        <PaginationItem disabled={page === 1}>
          <PaginationLink previous onClick={() => setPage(page - 1)} />
        </PaginationItem>

        {/* Render page numbers with "..." and last page */}
        {renderPagination()}

        <PaginationItem disabled={page === totalPages}>
          <PaginationLink next onClick={() => setPage(page + 1)} />
        </PaginationItem>
      </Pagination>
    </>
  )
}

export default PaginationComponent;