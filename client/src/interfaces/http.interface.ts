export interface IResponse<T>
{
    success: boolean;
    data: T;
    error?: string
}

export interface IComponentState
{
    ready: boolean;
    loading: boolean;
}

export const ComponentState: IComponentState = {
    ready: false,
    loading: false
}

export const ComponentStateReady: IComponentState = {
    ready: true,
    loading: false
}

export const ComponentStateLoading: IComponentState = {
    ready: false,
    loading: true
}