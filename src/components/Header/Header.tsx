import React, {FC, ReactNode} from 'react';

interface HeaderProps {
    children: ReactNode;
}

const Header: FC<HeaderProps> = ({children}) => {
    return (
        <header>
            <div className="h-100 d-inline-flex container-fluid align-items-center justify-content-between px-4 py-2 bg-dark text-light">
                {children}
            </div>
        </header>
    );
};

export default Header;