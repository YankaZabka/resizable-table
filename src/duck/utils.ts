import * as constants from './consts'

export const isColWidthValid = (colWidth: number, nextColWidth: number | null): boolean => {
    return colWidth >= constants.MIN_COL_WIDTH && (nextColWidth && (nextColWidth >= constants.MIN_COL_WIDTH) || nextColWidth === null)
}
export const isInsideTable = () => {}
