import "./PaginationControls.css";

interface PaginationControlsProps {
    currentPage: number;
    lastPage: number;
    onPrev: () => void;
    onNext: () => void;
}

export function PaginationControls({currentPage, lastPage, onPrev, onNext,}: PaginationControlsProps) {
    return (
        <div className="pagination-container">
            <button disabled={currentPage === 1} onClick={onPrev}>
                Previous
            </button>

            <span className="pagination__info">Page {currentPage} / {lastPage}</span>

            <button disabled={currentPage === lastPage} onClick={onNext}>
                Next
            </button>
        </div>
    );
}