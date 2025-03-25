import { useState, ReactNode } from 'react';
import MainNav from './nav-main';
import { Typography } from '@mui/material';

interface ITemplate
{
    children: ReactNode,
    pageClassName?: string,
    title?: string
}

const Template = ({ children, pageClassName, title }: ITemplate) => {
    const [ wrapperClass ] = useState<string>(pageClassName || '');
    return (

    <>
    <MainNav />
    <div className={ `col-count-3 gapped ${ wrapperClass }` }>
        <div className='start2'>
            { title && (<div className='mt-6'><Typography variant='h5'>{ title }</Typography></div>) }
            { children }
        </div>
    </div>
    </>
    );
};

export default Template;