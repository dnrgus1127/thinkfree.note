import React, {useContext} from 'react';
import TableMousePositionProvider from "./contexts/TableSelectorProvider";
import {useTableHandlers} from "./hooks/useTableHandlers";
import {useBlockData} from "../hooks/useBlockHooks";
import {BlockIdContext} from "../BlockWrapper";
import Table from "./Table";

function TableBlock() {
    const {blockId} = useContext(BlockIdContext);
    useTableHandlers(useBlockData(blockId));

    return (
        <TableMousePositionProvider>
            <Table/>
        </TableMousePositionProvider>
    );
}

export default TableBlock;

/*
테이블 목표
- 방향키로 셀 이동
- 열, 행 추가 삭제
- 셀 사이즈 조절
- 셀 선택
*/