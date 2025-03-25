import { useState } from "react";
import { ComponentState, ComponentStateLoading, ComponentStateReady, IComponentState } from "../../interfaces/http.interface";
import { ForumsGetService } from "./services";
import { toast } from "react-toastify";

export const useForumsHook = () => {
    const [ state, setState ] = useState<IComponentState>(ComponentState);
    const [ forums, setForums ] = useState<any[]>([]);
    const [ forum, setForum ] = useState<any | undefined>(undefined);

    const getForums = () => {
        if(!state.loading) {
            setState(ComponentStateLoading);
            ForumsGetService().then(resp => {
                if(resp.success)
                    setForums(resp.data);
                else
                    toast.error(resp.error);
                setState(ComponentStateReady);
            }).catch((error: any) => {
                toast.error(error?.message || 'Server error');
                setState(ComponentStateReady);
            });
        }
    }

    return {
        forumState: state,
        forums,
        forum,
        setForums,
        getForums,
        setForum,
    };
};