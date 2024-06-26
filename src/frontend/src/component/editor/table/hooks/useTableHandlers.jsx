import {useEditorEventListener} from "../../hooks/useEditHandler";
import {useCallback, useContext} from "react";
import {getCellIds, isCell} from "../../../../utils/table";
import {removeBOM} from "../../../../utils/common";
import {useTableData} from "./useTableData";
import {BlockContext} from "../../BlockContextProvider";
import {editorSelection} from "../../../../App";

export function useTableHandlers() {
    const tableData = useTableData();
    const {blockId} = useContext(BlockContext);

    const cellHandler = useCallback((e) => {
        const $cell = editorSelection.getElement().startElement;
        if (!isCell($cell) || editorSelection.getClosestId("block").start !== blockId ) return;

        const textNode = [...$cell.childNodes].find((item)=> item.nodeType === Node.TEXT_NODE);
        if(!textNode) return;

        let value = removeBOM(textNode.textContent);

        const {rowId, cellId} = getCellIds($cell);
        tableData.updateCell(rowId, cellId, value);
    }, [tableData,blockId])


    const arrowKey = (e) => {
        if(e.key.startsWith("Arrow")){
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                if (editorSelection.isNullSelection()) return;
                const $cell = editorSelection.getElement().startElement;
                if (isCell($cell) && editorSelection.getClosestId("block").start === blockId) {
                    e.preventDefault();
                    const {rowId, cellId} = getCellIds($cell);

                    const prevRowId = e.key === "ArrowUp" ? tableData.getPrevRowId(rowId) : tableData.getNextRowId(rowId);
                    if (!prevRowId) return;
                    const $block = document.querySelector(`[data-block-id="${blockId}"]`);

                    const targetCell = $block.querySelector(`[data-row-id="${prevRowId}"]`).querySelector(`[data-cell-id="${cellId}"]`);
                    editorSelection.setCaret(targetCell, 0);
                }
            }
        }
    }

    // 셀 위 아래 방향키 이동 처리
    useEditorEventListener("keydown", arrowKey);

    useEditorEventListener("input", cellHandler);

}
