// import { JSX } from 'react';
// import {
//   Pagination, 
//   PaginationItem, 
//   PaginationLink 
// } from 'reactstrap';

// interface PaginationComponentProps {
//   page: number;
//   setPage: (pageNum: number) => void;
//   maxPagesToShow: number;
//   totalPages: number;
// }

// const PaginationComponent = (props: PaginationComponentProps) => {
//   const {
//     page,
//     maxPagesToShow,
//     totalPages,
//     setPage
//   } = props;

//     // Determine the range of pages to display
//     const getPageRange = () => {
//       const range: number[] = [];
//       const leftLimit = Math.max(1, page - Math.floor(maxPagesToShow / 2));
//       const rightLimit = Math.min(totalPages, leftLimit + maxPagesToShow - 1);
  
//       for (let i = leftLimit; i <= rightLimit; i++) {
//         range.push(i);
//       }
  
//       return range;
//     };

//   // Function to render the page numbers with ellipses and last page
//   const renderPagination = () => {
//       const range = getPageRange();
  
//       const pages: JSX.Element[] = [];
  
//       // Always show "1" and "..." before the range if not the first pages
//       if (range[0] > 1) {
//         pages.push(
//           <PaginationItem key="first">
//             <PaginationLink onClick={() => setPage(1)}>1</PaginationLink>
//           </PaginationItem>
//         );
//         if (range[0] > 2) {
//           pages.push(
//             <PaginationItem key="ellipsis-start">
//               <PaginationLink disabled>...</PaginationLink>
//             </PaginationItem>
//           );
//         }
//       }
  
//       // Add the range of pages
//       range.forEach((pageNum) => {
//         pages.push(
//           <PaginationItem key={pageNum} active={pageNum === page}>
//             <PaginationLink onClick={() => setPage(pageNum)}>{pageNum}</PaginationLink>
//           </PaginationItem>
//         );
//       });
  
//       // Always show "..." and the last page if not the last pages
//       if (range[range.length - 1] < totalPages) {
//         if (range[range.length - 1] < totalPages - 1) {
//           pages.push(
//             <PaginationItem key="ellipsis-end">
//               <PaginationLink disabled>...</PaginationLink>
//             </PaginationItem>
//           );
//         }
//         pages.push(
//           <PaginationItem key="last">
//             <PaginationLink onClick={() => setPage(totalPages)}>{totalPages}</PaginationLink>
//           </PaginationItem>
//         );
//       }
  
//       return pages;
//     };

//   return (
//     <>
//       <Pagination>
//         <PaginationItem disabled={page === 1}>
//           <PaginationLink previous onClick={() => setPage(page - 1)} />
//         </PaginationItem>

//         {/* Render page numbers with "..." and last page */}
//         {renderPagination()}

//         <PaginationItem disabled={page === totalPages}>
//           <PaginationLink next onClick={() => setPage(page + 1)} />
//         </PaginationItem>
//       </Pagination>
//     </>
//   )
// }

// export default PaginationComponent;


import React from 'react';
import { Pagination as RsPagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Row, Col } from 'reactstrap';

interface PaginationProps {
  currentPage: number;
  dogsPerPage: number;
  total: number;  // This will be response.total from the API
  // onPageChange: (page: number) => void;
  setCurrentPage: (no: number) => void
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  dogsPerPage,
  total,
  setCurrentPage
  // onPageChange,
}) => {
  const totalPages = Math.ceil(total / dogsPerPage);
  
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage <= 3) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (newPage: number) => {
    // onPageChange(newPage);
    setCurrentPage(newPage)
  };

  return (
    <Row className="mt-4 mb-4">
      <Col className="d-flex justify-content-center">
        <RsPagination>
          {/* Previous button */}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink
                previous
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Prev
              </PaginationLink>
            </PaginationItem>
          )}
          
          {/* Page numbers */}
          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <PaginationItem disabled>
                  <PaginationLink>...</PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem active={currentPage === page}>
                  <PaginationLink
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )}
            </React.Fragment>
          ))}
          
          {/* Next button */}
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationLink
                next
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </PaginationLink>
            </PaginationItem>
          )}
        </RsPagination>
      </Col>
    </Row>
  );
};

export default PaginationComponent;