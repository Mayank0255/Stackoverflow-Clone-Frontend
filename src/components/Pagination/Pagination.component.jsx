import React, { Fragment } from "react";
import { Pagination as MuiPagination, PaginationItem } from "@mui/material";

const Pagination = ({
  page,
  itemList,
  itemsPerPage,
  handlePaginationChange,
}) => {
  return (
    <Fragment>
      <MuiPagination
        variant="outlined"
        shape="rounded"
        page={page}
        count={Math.ceil(itemList.length/itemsPerPage)}
        onChange={handlePaginationChange}
        style={{ float: 'right', margin: '0 13px 16px 0' }}
        renderItem={(item) => (
          <PaginationItem {...item} sx={{ color: '#cfd2d6', border: '1px solid #4c4f52' }}/>
        )}
      />
    </Fragment>
  );
}

export default Pagination;
