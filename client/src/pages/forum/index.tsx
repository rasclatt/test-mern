import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useForumsHook } from '../../components/forums/hooks';
import { ComponentState, ComponentStateLoading, ComponentStateReady, IComponentState } from '../../interfaces/http.interface';
import { Typography } from '@mui/material';
import Template from '../../tempates/base';
import FormGeneratorComponent from '../../components/dynamic/form';
import UiButtonSubmit from '../../components/ui/button.submit';
import PermissionUserPrivate from '../../components/permission/user/private';
import HttpClient from '../../services/base';
import ForumsComponent from '../../components/forums';
import UIButtonGeneric from '../../components/ui/button.generic';
import UIButtonIconPlus from '../../components/ui/button.icon-plus';
import UIButtonIconCancel from '../../components/ui/button.icon-cancel';
import fields from './fields';

const ForumPage = () => {
    const [ state, setState ] = useState<IComponentState>(ComponentState);
    const [ loading, setLoading ] = useState<boolean>(false);
    const { forumState, forums, setForums, getForums, setForum, forum } = useForumsHook();
    const [ toggle, setToggle ] = useState<boolean>(false);

    useEffect(() => {
        if(!forumState.ready && !forumState.loading) {
            getForums();
        }
    }, []);

    useEffect(() => {
        if(!state.ready && !state.loading) {
            setState(ComponentStateLoading);
        }
    }, [ forum?._id]);
    
    useEffect(() => {
        if(state.loading) {
            setState(ComponentStateReady);
        }
    }, [ state.ready, state.loading ]);
    
    const isFilled: boolean = (forum?._id || forum?.title)? true : false;

    return (
        <Template>
            <PermissionUserPrivate
                redirect='#'
            >
                { state.ready && toggle && (
                <div className='pt-4'>
                    <div className="flex items-center justify-between mt-4 pt-4">
                        <Typography variant='h4' className='text-red-500 mt-4'>Create Forum</Typography>
                        { toggle && (<UIButtonIconCancel onClickEvent={ () => {
                            setToggle(false);
                            setForum(undefined);
                        } } />) }
                    </div>
                    <FormGeneratorComponent
                        setLoading={ setLoading }
                        form={ fields }
                        values={ forum || {} }
                        id="create-forum-form"
                        onSubmitEvent={ async (form: any, setLoading) => {
                            const endpoint = form?.data?.api || '';
                            if(endpoint !== '') {
                                delete form.data.api;
                            }
                            try {
                                const r = await HttpClient.post(endpoint, form.data);
                                if(r.success) {
                                    getForums();
                                    setToggle(false);
                                    toast.success('Forum created successfully');
                                } else {
                                    toast.error(r.error);
                                    if(r.reload) {
                                        toast.error(`Reloading in 5 seconds`);
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 5000);
                                    }
                                }
                            } catch (error: any) {
                                toast.error('There was an error creating the forum');
                            }
                            setLoading(false);
                        }}
                    >
                        <div className="flex justify-center items-center gap-4 mt-4">
                            <UiButtonSubmit
                                label="Save"
                                disabled={ loading }
                                loading={ loading }
                                loader
                            />
                            { isFilled && (
                            <UIButtonGeneric
                                label="Clear"
                                onClickEvent={ () => setForum(undefined) }
                                variant='full'
                                padVariant='lg'
                            />)}
                        </div>
                    </FormGeneratorComponent>
                </div>)}
                <div className="forum-list pt-4">
                    { forumState.ready && (
                    <>
                    <div className="flex items-center justify-between mt-4 pt-4">
                        <Typography variant='h4' className='text-red-500 mt-4'>Forum List</Typography>
                        { !toggle && (<UIButtonIconPlus onClickEvent={ () => setToggle(!toggle) } />) }
                    </div>
                    <ForumsComponent
                        rows={ forums }
                        setRows={ setForums }
                        setRow={ setForum }
                        reset={ getForums }
                        onEventClick={ () => setToggle(true) }
                    />
                    </>
                    ) }
                </div>
            </PermissionUserPrivate>
        </Template>
    );
};

export default ForumPage;