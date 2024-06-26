import React, {useContext} from 'react';
import {useBlockData} from "../hooks/useBlockHooks";
import useTable from "./hooks/useTable";
import {useTableMousePositionSetter} from "./hooks/useTableMousePositionHooks";
import {isCell} from "../../../utils/table";
import ColumnResizer from "./ColumnResizer";
import {BlockContext} from "../BlockContextProvider";
import TableCursorPositionProvider from "./contexts/TableSelectionProvider";

function TableWrapper({children}) {
    const {blockId} = useContext(BlockContext);
    const tableData = useBlockData(blockId);

    const {addColumn, addRow} = useTable();
    const {clearPosition, setMousePosition} = useTableMousePositionSetter();

    const mouseLeaveHandler = () => {
        clearPosition();
    }

    const mouseMove = (e) => {
        const target = e.target;
        const $cell = isCell(target) ? target : (isCell(e.target.closest("[data-row-id]")) ?? null);
        if (!$cell) return;

        const [rowIdx, colIdx] = tableData.getIndexOfCell($cell);
        setMousePosition(rowIdx, colIdx);
    }


    return (
        <TableCursorPositionProvider blockId={blockId}>
            <div className="table-block" onMouseLeave={mouseLeaveHandler}>
                <div className="table-box" onMouseMove={mouseMove}>
                    {children}
                    <button onClick={() => addColumn()} contentEditable={false} className="btn_add btn_add_column">+
                    </button>
                    <button onClick={() => addRow()} contentEditable={false} className="btn_add btn_add_row">+</button>
                    <ColumnResizer/>
                </div>
            </div>
        </TableCursorPositionProvider>
    );
}

export default TableWrapper;