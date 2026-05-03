import CommonForm from '@/components/common/Form';
import { useState, type SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerFormControls } from '@/config';
import { showToast } from '@/lib/toast';
import { registerUser } from '@/store/auth-slice';
import type { AppDispatch } from '@/store/store';

const initialFormData = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const AuthRegister = () => {

    const [formData, setFormData] = useState(initialFormData);
    const disableSubmitButton = !formData.userName
        || !formData.email
        || !formData.password
        || !formData.confirmPassword;

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            showToast.error("Passwords do not match");
            return;
        }

        dispatch(registerUser(formData)).then((data) => {
            if (data.payload?.status === "success") {
                showToast.success(data.payload?.message || "Registration successful, please login!");
                setFormData(initialFormData);
                navigate('/auth/login');
            } else {
                showToast.error(data.payload?.message || "Registration failed");
            }
        });
    }

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <h1 className='text-3xl font-extrabold tracking-tight text-foreground'>
                    Create new account
                </h1>
                <p className='mt-2'>
                    Already have an account?{' '}
                    <Link className='font-medium text-primary hover:underline'
                        to={'/auth/login'}
                    >
                        Login
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                buttonText={"Sign Up"}
                disableSubmitButton={disableSubmitButton}
            />
        </div>
    )
}

export default AuthRegister;