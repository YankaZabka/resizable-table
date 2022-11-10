import React from "react";
import * as CH from "@chakra-ui/react";
import * as LD from './duck'

const Table: React.FC<LD.TableTypes.TableProps> = ({children, cols, onMouseMove}) => {

    const getTableWidth = () => {
        return cols.reduce((sum, col) => sum += col.width, 0)
    }

  return (
    <CH.Table size="sm" width={`${getTableWidth()}px`} style={{ tableLayout: "fixed" }} onMouseMove={onMouseMove} bgColor="gray.200">
        <colgroup contentEditable={false} style={{ userSelect: "none" }}>
            {cols.map(({width}, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <col key={index} width={`${width}px`} style={{ minWidth: "10px"}} />
            //    minWidth is redundant
            ))}
        </colgroup>
      <CH.Tbody>
          {children}
      </CH.Tbody>
    </CH.Table>
  );
};

export default Table;
