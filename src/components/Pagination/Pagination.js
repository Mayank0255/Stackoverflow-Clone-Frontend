import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Pagination.styles.scss";

const Pagination = ({
  total,
  elementsPerPage,
  showInline,
  handlePaginationChange,
  hideOnSinglePage,
}) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pages =
    total % elementsPerPage === 0
      ? Math.floor(total / elementsPerPage)
      : Math.floor(total / elementsPerPage) + 1;

  const handleChange = useCallback(
    (current) => {
      setCurrentPage(current);
      handlePaginationChange(current);
    },
    [handlePaginationChange]
  );

  useEffect(() => {
    const li = [];
    const half = Math.floor(showInline / 2);

    const enableNextBtn = currentPage !== pages;

    for (
      let i = 1;
      i <= showInline && i + currentPage - half - 1 < pages;
      i++
    ) {
      const idx = i + currentPage - half - 1;

      if (i + currentPage - half >= 1) {
        li.push(
          <li
            key={idx + 1}
            className={`pagination-item ${
              currentPage === idx + 1 ? "pagination-item-active" : ""
            }`}
            onClick={() => handleChange(idx + 1)}
          >
            {idx + 1}
          </li>
        );
      }
    }

    // Add menu items with dots and last item.
    if (pages > showInline) {
      li.push([
        <li
          key="dots"
          className="pagination-item pagination-no-border pagination-item-no-hover"
        >
          ...
        </li>,
        <li
          key={pages}
          className={`pagination-item ${
            currentPage === pages ? "pagination-item-active" : ""
          }`}
          onClick={() => handleChange(pages)}
        >
          {pages}
        </li>,
      ]);
    }

    // Add next button
    li.push([
      <li
        key="next-btn"
        className={`pagination-item ${
          enableNextBtn ? "" : "pagination-disabled"
        }`}
        // Don't allow click if on last page.
        onClick={
          enableNextBtn ? () => handleChange(currentPage + 1) : undefined
        }
      >
        Next
      </li>,
    ]);

    setItems(li);
  }, [total, elementsPerPage, currentPage, showInline, handleChange, pages]);

  useEffect(() => {
    handleChange(1);
    // eslint-disable-next-line
  }, []);

  // Only show if single page.
  if (!(hideOnSinglePage && pages === 1)) {
    return (
      <div style={{ float: "right" }}>
        <ul style={{ display: "flex" }}>{items}</ul>
      </div>
    );
  }

  return <></>;
};

Pagination.propTypes = {
  // The total number of entries.
  total: PropTypes.number.isRequired,
  // How many page items to actually show.
  showInline: PropTypes.number,
  elementsPerPage: PropTypes.number,
  // Whether to show the pagination, if only one page.
  hideOnSinglePage: PropTypes.bool,
  // Callback, for when the page changes.
  handlePaginationChange: PropTypes.func.isRequired,
};

Pagination.defaultProps = {
  showInline: 5,
  elementsPerPage: 10,
  hideOnSinglePage: true,
};

export default Pagination;
