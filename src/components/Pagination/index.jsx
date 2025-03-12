import { useState } from "react";
import PropTypes from "prop-types";
import "./index.css";

const Pagination = ({ apiCallback, totalPages }) => {
  const [pageNo, setPageNo] = useState(1);

  const onNextPage = () => {
    if (pageNo < totalPages) {
      setPageNo((prev) => {
        const newPage = prev + 1;
        apiCallback(newPage);
        return newPage;
      });
    }
  };

  const onPrevPage = () => {
    if (pageNo > 1) {
      setPageNo((prev) => {
        const newPage = prev - 1;
        apiCallback(newPage);
        return newPage;
      });
    }
  };

  return (
    <div className="mb-3 d-flex justify-content-center align-items-center">
      <button
        type="button"
        className="control-btn"
        onClick={onPrevPage}
        disabled={pageNo === 1}
      >
        Prev
      </button>
      <p className="page-no">{pageNo}</p>
      <button
        type="button"
        className="control-btn"
        onClick={onNextPage}
        disabled={pageNo === totalPages}
      >
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  apiCallback: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
