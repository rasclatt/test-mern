import { useState, ReactNode } from 'react';
import MainNav from './nav-main';

const Template = ({ children, pageClassName }: { children: ReactNode, pageClassName?: string}) => {
    const [ title ] = useState<string>(pageClassName || '');
    return (

    <>
    <MainNav />
    <div className={ `col-count-3 gapped ${ title }` }>
        <div className='start2'>
            { children }
        </div>
    </div>
    </>
    );
};

export default Template;