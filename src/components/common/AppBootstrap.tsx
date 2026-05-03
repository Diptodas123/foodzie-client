import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { userInfo } from '@/store/auth-slice';
import { injectNavigate } from '@/lib/navigation';

const AppBootstrap = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        injectNavigate(navigate);
    }, [navigate]);

    useEffect(() => {
        dispatch(userInfo());
    }, [dispatch]);

    return null;
};

export default AppBootstrap;
