import CommonForm from '@/components/common/Form';
import { loginFormControls } from '@/config';
import { loginUser } from '@/store/auth-slice';
import type { AppDispatch } from '@/store/store';
import { useState, type SyntheticEvent } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { showToast } from '@/lib/toast';
import type { LoginFormData } from './types';

const initialFormData: LoginFormData = {
    email: "",
    password: "",
};

const AuthLogin = () => {

    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const disableSubmitButton = !formData.email || !formData.password;

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(loginUser(formData)).then((data) => {
            if (data.payload?.status === "success") {
                setFormData(initialFormData);
                showToast.success(data.payload?.message || "Login successful!");
                navigate('/');
            } else {
                showToast.error(data.payload?.message || "Login failed");
            }
        })
    }

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <h1 className='text-3xl font-extrabold tracking-tight text-foreground'>
                    Sign in to your account
                </h1>
                <p className='mt-2'>
                    Don't have an account?{' '}
                    <Link className='font-medium text-primary hover:underline'
                        to={'/auth/register'}
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={loginFormControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText={"Sign In"}
                disableSubmitButton={disableSubmitButton}
            />
        </div>
    )
}

export default AuthLogin;