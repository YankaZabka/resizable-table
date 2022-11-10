import React from 'react';
import * as CH from "@chakra-ui/react"

const Row: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <CH.Tr>
            {children}
        </CH.Tr>
    );
};

export default Row;