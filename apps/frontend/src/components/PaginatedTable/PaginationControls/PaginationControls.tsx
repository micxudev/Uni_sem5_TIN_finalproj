import "./PaginationControls.css";

interface PaginationControlsProps {
    currentPage: number;
    lastPage: number;
    onPrev: () => void;
    onNext: () => void;
    labels: {
        prev: string;
        next: string;
        page: string;
    }
}

export function PaginationControls({currentPage, lastPage, onPrev, onNext, labels}: PaginationControlsProps) {
    return (
        <div className="pagination-container">
            <button disabled={currentPage <= 1} onClick={onPrev}>
                {labels.prev}
            </button>

            <span className="pagination__info">{labels.page} {currentPage} / {lastPage}</span>

            <button disabled={currentPage >= lastPage} onClick={onNext}>
                {labels.next}
            </button>
        </div>
    );
}