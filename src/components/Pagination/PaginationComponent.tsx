import React from 'react';
import {
  Pagination as RsPagination,
  PaginationItem,
  PaginationLink,
  Row,
  Col
} from 'reactstrap';

import {
  MAX_VISIBLE_PAGES,
  MAX_SUB_PAGES
} from '../../constants/general.constants';
import IntlMessages from '../common/IntlMessages';

interface PaginationProps {
  currentPage: number;
  dogsPerPage: number;
  total: number;
  setCurrentPage: (no: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  dogsPerPage,
  total,
  setCurrentPage
}) => {
  const totalPages = Math.ceil(total / dogsPerPage);

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= MAX_SUB_PAGES) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push('...');
        for (let i = totalPages - MAX_SUB_PAGES; i <= totalPages; i++) {
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
    setCurrentPage(newPage);
  };

  return (
    <Row className="mt-4 mb-4">
      <Col className="d-flex justify-content-center">
        <RsPagination>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink
                previous
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <IntlMessages id="button.previous" />
              </PaginationLink>
            </PaginationItem>
          )}

          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <PaginationItem disabled>
                  <PaginationLink>...</PaginationLink>
                </PaginationItem>
              ) : (
                <PaginationItem active={currentPage === page}>
                  <PaginationLink
                    onClick={() =>
                      typeof page === 'number' && handlePageChange(page)
                    }
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )}
            </React.Fragment>
          ))}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationLink
                next
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <IntlMessages id="button.next" />
              </PaginationLink>
            </PaginationItem>
          )}
        </RsPagination>
      </Col>
    </Row>
  );
};

export default PaginationComponent;
