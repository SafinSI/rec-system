import React from "react"
import { calcClassName } from "../../utils"
import switcherStyle from "./style.module.css"

const buttonStyle = (currentPage: number, pageButtonsMount: number, shift: number, i: number) =>
  (currentPage <= pageButtonsMount - shift && currentPage === i + 1) ||
  (currentPage > pageButtonsMount - shift && currentPage === currentPage + i - shift)
    ? { backgroundColor: "#c0c0c0" }
    : {}

type PaginatorProps = {
  pageMount: number
  currentPage: number
  pageButtonsMount?: number
  onClick: (pageNum: number) => void
  className?: string
}

export const Paginator = ({ pageMount, currentPage, pageButtonsMount = 5, onClick, className }: PaginatorProps) => {
  let pagesMoreThanButtons = pageMount > pageButtonsMount
  let shift = 1
  if (pageMount - currentPage < pageButtonsMount - 1) {
    shift = currentPage - 1
    shift = pagesMoreThanButtons ? shift + pageButtonsMount - pageMount : shift
  }

  return (
    <div className={calcClassName([switcherStyle.wrapper, className])}>
      {currentPage > pageButtonsMount - 1 ? (
        <>
          <button
            key={0}
            className={switcherStyle.switchButton}
            style={currentPage === 1 ? { backgroundColor: "#c0c0c0" } : {}}
            onClick={() => onClick(1)}
          >
            1
          </button>
          <div className={switcherStyle.touches}>...</div>
        </>
      ) : (
        ""
      )}
      {Array.from({
        length: pagesMoreThanButtons ? pageButtonsMount : pageMount
      }).map((_, i) => {
        return currentPage + i - shift <= pageMount ? (
          <button
            key={i + 1}
            className={switcherStyle.switchButton}
            style={buttonStyle(currentPage, pageButtonsMount, shift, i)}
            onClick={() => onClick(currentPage < pageButtonsMount ? i + 1 : currentPage + i - shift)}
          >
            {currentPage < pageButtonsMount ? i + 1 : currentPage + i - shift}
          </button>
        ) : (
          ""
        )
      })}

      {currentPage + pageButtonsMount - 2 < pageMount && pagesMoreThanButtons ? (
        <>
          <div className={switcherStyle.touches}>...</div>
          <button
            className={switcherStyle.switchButton}
            style={currentPage === pageMount ? { backgroundColor: "#c0c0c0" } : {}}
            onClick={() => onClick(pageMount)}
          >
            {pageMount}
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  )
}
