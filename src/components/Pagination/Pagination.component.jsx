import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

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
      ? Math.ceil(total / elementsPerPage)
      : Math.ceil(total / elementsPerPage) + 1;

  const handleChange = useCallback(
    (current) => {
      setCurrentPage(current);
      handlePaginationChange(current);
    },
    [handlePaginationChange]
  );

  /**
   * According to docs of Stacks documentation active element needs to be <span/>,
   * inactive elements should be <a/>
   * @param {*} currentIdx
   * @param {*} activeIdx
   * @returns
   */
  const getPaginationItem = useCallback(
    (currentIdx, activeIdx) =>
      activeIdx === currentIdx + 1 ? (
        <span key={currentIdx} className="s-pagination--item is-selected">{currentIdx + 1}</span>
      ) : (
        <span
          key={currentIdx}
          className="s-pagination--item"
          onClick={() => handleChange(currentIdx + 1)}
        >
          {currentIdx + 1}
        </span>
      ),
    [handleChange]
  );

  useEffect(() => {
    const li = [];
    const half = Math.floor(showInline / 2);

    const enableNextBtn = currentPage !== pages;

    for (
      let i = 1;
      i <= showInline && i + currentPage - half - 1 < pages - 1;
      i++
    ) {
      const idx = i + currentPage - half - 1;

      if (i + currentPage - half >= 1) {
        li.push(getPaginationItem(idx, currentPage));
      }
    }

    // Add menu items with dots and last item.
    if (pages > showInline) {
      li.push([
        <span
          key="dots"
          className="s-pagination--item s-pagination--item__clear"
        >
          ...
        </span>,
        getPaginationItem(pages - 1, currentPage),
      ]);
    }

    // Add next button
    li.push([
      <span
        key="next-btn"
        className={`s-pagination--item`}
        onClick={
          enableNextBtn ? () => handleChange(currentPage + 1) : undefined
        }
      >
        Next
      </span>,
    ]);

    setItems(li);
  }, [
    total,
    elementsPerPage,
    currentPage,
    showInline,
    handleChange,
    pages,
    getPaginationItem,
  ]);

  useEffect(() => {
    handleChange(1);
    // eslint-disable-next-line
  }, []);

  // Only show if single page.
  if (!(hideOnSinglePage && pages === 1)) {
    return (
      <div className="s-pagination" style={{ float: "right" }}>
        {items}
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
