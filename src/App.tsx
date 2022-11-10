import * as React from "react";
import * as CH from "@chakra-ui/react";
import * as LC from "./components";
import * as D from "./duck";

// TODO check merges work

export const App = () => {
  const [columnResizeInfo, _setColumnResizeInfo] =
    React.useState<D.types.ColumnResizeInfo>({
      selectedCol: null,
      mouseDownX: null,
    });
  // we must use ref and custom 'setState' callback to avoid using only initial state value inside event handler
  const columnResizeInfoRef = React.useRef(columnResizeInfo);
  const setColumnResizeInfo = (data: D.types.ColumnResizeInfo) => {
    columnResizeInfoRef.current = data;
    _setColumnResizeInfo(data);
  };
  const [cols, _setCols] = React.useState<D.types.Col[]>([
    { width: 100, index: 1 },
    { width: 150, index: 2 },
    { width: 225, index: 3 },
  ]);
  const colsRef = React.useRef(cols);
  const setCols = (data: D.types.Col[]) => {
    colsRef.current = data;
    _setCols(data);
  };
  // looks like in editor we will have to use  our local state 'cols'
  // and update slate table element only after mouseUp

  const windowMouseUpHandler = () => {
    // if READONLY than RETURN
    const { mouseDownX, selectedCol } = columnResizeInfoRef.current;
    if (selectedCol || mouseDownX) {
      setColumnResizeInfo({
        selectedCol: null,
        mouseDownX: null,
      });
      document.body.style.cursor = ""
    }
  };

  const windowMouseMoveHandler = (event: MouseEvent) => {
    // if READONLY than RETURN
    //  probably we will face the problem with selecting cells while resizing columns
    event.preventDefault();
    const { mouseDownX, selectedCol } = columnResizeInfoRef.current;

    if (selectedCol && mouseDownX) {
      const mouseDif = mouseDownX - event.clientX;

      const selectedColItem = colsRef.current.find(
          (col) => col.index === selectedCol
      );
      const nextColItem = colsRef.current.find(
          (col) => col.index === selectedCol + 1
      );

      if (selectedColItem) {
        const selectedColNewWidth = selectedColItem.width - mouseDif;
        const nextColNewWidth = nextColItem
            ? nextColItem.width + mouseDif
            : null;

        if (
            D.utils.isColWidthValid(selectedColNewWidth, nextColNewWidth)
        ) {
          const newColsInfo = colsRef.current.map((col) => {
            if (col.index === selectedCol) {
              col.width = selectedColNewWidth;
            }
            // next col
            if (col.index === selectedCol + 1 && nextColNewWidth) {
              col.width = nextColNewWidth;
            }
            return col;
          })
          setCols(newColsInfo);
        }
      }
      setColumnResizeInfo({ mouseDownX: event.clientX, selectedCol });
    }
  };

  React.useEffect(() => {
    window.addEventListener("mouseup", windowMouseUpHandler);
    window.addEventListener("mousemove", windowMouseMoveHandler);
    return () => {
      window.removeEventListener("mouseup", windowMouseUpHandler);
      window.addEventListener("mousemove", windowMouseMoveHandler);
    };
  }, []);

  return (
    <CH.ChakraProvider theme={CH.theme}>
      <CH.Box w="50%" pos="relative" my={200} mx="auto">
        <LC.Table
          cols={cols}
        >
          <LC.Row>
            <LC.Cell colIndex={1} setColumnResizeInfo={setColumnResizeInfo} columnResizeInfo={columnResizeInfo}>
              1
            </LC.Cell>
            <LC.Cell colIndex={2} setColumnResizeInfo={setColumnResizeInfo} columnResizeInfo={columnResizeInfo}>
              2
            </LC.Cell>
            <LC.Cell colIndex={3} setColumnResizeInfo={setColumnResizeInfo} columnResizeInfo={columnResizeInfo}>
              3
            </LC.Cell>
          </LC.Row>
          <LC.Row>
            <LC.Cell colIndex={1} setColumnResizeInfo={setColumnResizeInfo} columnResizeInfo={columnResizeInfo}>
              4
            </LC.Cell>
            <LC.Cell colIndex={2} setColumnResizeInfo={setColumnResizeInfo} columnResizeInfo={columnResizeInfo}>
              5
            </LC.Cell>
            <LC.Cell colIndex={3} setColumnResizeInfo={setColumnResizeInfo} columnResizeInfo={columnResizeInfo}>
              6
            </LC.Cell>
          </LC.Row>
          <LC.Row>
            <LC.Cell colIndex={1} setColumnResizeInfo={setColumnResizeInfo} columnResizeInfo={columnResizeInfo}>
              7
            </LC.Cell>
            <LC.Cell colIndex={2} setColumnResizeInfo={setColumnResizeInfo} columnResizeInfo={columnResizeInfo}>
              8
            </LC.Cell>
            <LC.Cell colIndex={3} setColumnResizeInfo={setColumnResizeInfo} columnResizeInfo={columnResizeInfo}>
              9
            </LC.Cell>
          </LC.Row>
        </LC.Table>
      </CH.Box>
    </CH.ChakraProvider>
  );
};
