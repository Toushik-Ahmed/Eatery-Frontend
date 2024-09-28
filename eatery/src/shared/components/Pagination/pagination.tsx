import { Button, Select, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';

export interface PageChangeEvent {
  pageSize: number;
  pageNumber: number;
}

export interface PaginationProps {
  pageNumber?: number;
  pageSize?: number;
  totalData?: number;
  onPageChange?: (event: PageChangeEvent) => void;
}

function Pagination({
  onPageChange,
  totalData,
  pageNumber,
  pageSize,
}: PaginationProps) {
  const totalPages = Math.ceil((totalData || 0) / (pageSize || 10)) - 1;

  const [currentTotalPage, setCurrentTotalPage] = useState(
    totalPages >= 0 ? totalPages : 0
  );
  const [currentPage, setCurrentPage] = useState(
    pageNumber || 0 > totalPages
      ? totalPages >= 0
        ? totalPages
        : 0
      : pageNumber || 0
  );
  const [currentPageSize, setCurrentPageSize] = useState(pageSize || 10);
  const [currentTotalData, setCurrentTotalData] = useState(totalData || 0);

  const updateCurrentPage = (direction: number) => {
    setCurrentPage((x) => {
      const y = x + direction;
      return y > currentTotalPage ? currentTotalPage : y < 0 ? 0 : y;
    });
  };

  useEffect(() => {
    if (onPageChange) {
      onPageChange({ pageNumber: currentPage, pageSize: currentPageSize });
    }

    const x = Math.ceil((totalData || 0) / (currentPageSize || 10)) - 1;
    setCurrentTotalPage(x >= 0 ? x : 0);
  }, [currentPage, currentPageSize]);

  useEffect(() => {
    if (currentTotalPage < currentPage) {
      setCurrentPage(currentTotalPage);
    }
  }, [currentTotalPage]);

  useEffect(() => {
    setCurrentTotalData(totalData || 0);
    const x = Math.ceil((totalData || 0) / (currentPageSize || 10)) - 1;
    setCurrentTotalPage(x >= 0 ? x : 0);
  }, [totalData]);

  return (
    <div className="flex justify-end items-center gap-4">
      <div className="flex gap-4 justify-start items-center">
        {/* <label>Page Size</label> */}
        <Select
          size={'md'}
          value={currentPageSize}
          onChange={(ev) => {
            setCurrentPageSize(+ev.target.value);
          }}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </Select>
      </div>
      <div className="flex gap-4 items-center">
        <div>
          {currentTotalData > 0 ? currentPage * currentPageSize + 1 : 0} -{' '}
          {(currentPage + 1) * currentPageSize < currentTotalData
            ? (currentPage + 1) * currentPageSize
            : currentTotalData}{' '}
          of {currentTotalData}
        </div>
        <div>
          <Tooltip label="First Page">
            <Button
              variant="ghost"
              isDisabled={currentPage === 0}
              onClick={() => {
                updateCurrentPage(-currentTotalPage);
              }}
            >
              <FiChevronsLeft />
            </Button>
          </Tooltip>
          <Tooltip label="Previous Page">
            <Button
              variant="ghost"
              isDisabled={currentPage === 0}
              onClick={() => {
                updateCurrentPage(-1);
              }}
            >
              <FiChevronLeft />
            </Button>
          </Tooltip>
          <Tooltip label="Next Page">
            <Button
              variant="ghost"
              isDisabled={
                currentPage === currentTotalPage || currentTotalPage <= 0
              }
              onClick={() => {
                updateCurrentPage(1);
              }}
            >
              <FiChevronRight />
            </Button>
          </Tooltip>
          <Tooltip label="Last Page">
            <Button
              variant="ghost"
              isDisabled={
                currentPage === currentTotalPage || currentTotalPage <= 0
              }
              onClick={() => {
                updateCurrentPage(currentTotalPage);
              }}
            >
              <FiChevronsRight />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
