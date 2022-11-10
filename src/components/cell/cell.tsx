import React from "react";
import * as CH from "@chakra-ui/react";
import * as D from "../../duck";

const Cell: React.FC<{
  children: React.ReactNode;
  colSpan?: number;
  colIndex: number;
  setColumnResizeInfo: (data: D.types.ColumnResizeInfo) => void;
  columnResizeInfo: D.types.ColumnResizeInfo;
}> = ({
  children,
  colSpan,
  colIndex,
  setColumnResizeInfo,
  columnResizeInfo,
}) => {
  return (
    <>
      <CH.Td
        borderWidth={1}
        borderStyle="solid"
        borderColor="blackAlpha.900"
        position="relative"
        colSpan={colSpan}
        py={2}
        px={2}
        lineHeight="inherit"
      >
        {children}
        <CH.Box
          position="absolute"
          height="100%"
          width="9px"
          cursor="col-resize"
          right="-4px"
          top={0}
          onMouseDown={(event) => {
            event.preventDefault();
            setColumnResizeInfo({
              mouseDownX: event.clientX,
              selectedCol: colIndex,
            });
            document.body.style.cursor = "col-resize";
          }}
        >
          <CH.Box
            position="absolute"
            height="100%"
            width="1px"
            backgroundColor={columnResizeInfo.selectedCol === colIndex ? "red.500" : "transparent"}
            right="3px"
            cursor="col-resize"
            zIndex={99}
            top={0}
          />
        </CH.Box>
      </CH.Td>
    </>
  );
};

export default Cell;
