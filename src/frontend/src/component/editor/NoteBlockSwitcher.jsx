import React from 'react';
import BlockWrapper from "./BlockWrapper";
import TextBlock from "./text/TextBlock";
import TableBlock from "./table/TableBlock";
import {useBlockStore} from "./hooks/useBlockHooks";
import ListBlock from "./list/ListBlock";


/**
 * @desc 문서 모델에서 블록 모델을 가져와서 type에 맞게 렌더링 하는 컴포넌트
 * @param blockId, index
 * @returns {JSX.Element}
 * @constructor
 */
function NoteBlockSwitcher({blockId, index}) {
    const blockStore = useBlockStore();
    const {type, id} = blockStore[blockId];

    return <BlockWrapper id={blockId} type={type} index={index}>
        {switcher(type, id, index)}
    </BlockWrapper>
}


const switcher = (type, id, index) => {
    switch (type) {
        case "text" :
            return <TextBlock/>
        case "ul":
            return <ListBlock/>
        case "ol":
            return <ListBlock index={index}/>
        case "table" :
            return <TableBlock/>
        default :
            return <TextBlock/>
    }
}

export default React.memo(NoteBlockSwitcher);