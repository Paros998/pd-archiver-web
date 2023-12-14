import React, {FC, ReactNode} from 'react';

interface MainWrapperProps {
    className?: string;
    children: ReactNode;
}

const MainWrapper: FC<MainWrapperProps> = ({className, children}) => {
    return (
        <main className={className || ''}>
            {children}
        </main>
    );
};

export default MainWrapper;