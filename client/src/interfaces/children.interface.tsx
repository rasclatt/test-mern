import { ReactNode } from "react";

export interface IComponentChildren
{
    children?: JSX.Element | JSX.Element[] | string | number | undefined | ReactNode | ReactNode[];
}