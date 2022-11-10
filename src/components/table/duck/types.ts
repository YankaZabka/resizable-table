import React from "react";

export interface TableProps {
    cols: {width: number, index: number}[]
    children?: React.ReactElement | React.ReactElement[]
    onMouseMove?: React.MouseEventHandler<HTMLTableElement>
}