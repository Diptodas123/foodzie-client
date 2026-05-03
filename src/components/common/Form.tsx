import { useState, type SyntheticEvent } from 'react'
import { Input } from '../ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

const types = {
    INPUT: 'input',
    SELECT: 'select',
    TEXTAREA: 'textarea',
}

interface FormControl {
    name: string;
    label: string;
    placeholder?: string;
    componentType: string;
    type?: string;
    options?: { id: string; label: string }[];
}

interface CommonFormTypes<T extends Record<string, string>> {
    formData: T;
    setFormData: (data: T) => void;
    formControls: FormControl[];
    onSubmit: (e: SyntheticEvent<HTMLFormElement>) => void;
    buttonText?: string;
    disableSubmitButton?: boolean;
}

const CommonForm = <T extends Record<string, string>>({
    formData,
    setFormData,
    formControls,
    onSubmit,
    buttonText,
    disableSubmitButton
}: CommonFormTypes<T>) => {

    // State to manage password visibility
    const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});

    const togglePasswordVisibility = (fieldName: string) => {
        setShowPassword(prev => ({
            ...prev,
            [fieldName]: !prev[fieldName]
        }));
    };

    const renderInputsByComponentType = (getControlItem: FormControl) => {
        const value = formData[getControlItem.name] || '';
        
        switch (getControlItem.componentType) {
            case types.INPUT: {
                const isPassword = getControlItem.type === 'password';
                const inputType = isPassword && showPassword[getControlItem.name] ? 'text' : getControlItem.type;

                return (
                    <div className="relative">
                        <Input
                            name={getControlItem.name}
                            placeholder={getControlItem.placeholder}
                            id={getControlItem.name}
                            type={inputType}
                            value={value}
                            onChange={(e) => setFormData({
                                ...formData,
                                [getControlItem.name]: e.target.value
                            } as T)}
                        />
                        {/* Show/Hide Password Toggle */}
                        {isPassword && (
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility(getControlItem.name)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword[getControlItem.name] ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        )}
                    </div>
                );
            }

            case types.SELECT:
                return (
                    <Select value={value}
                        onValueChange={(selectedValue) => setFormData({
                            ...formData,
                            [getControlItem.name]: selectedValue
                        } as T)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={getControlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                getControlItem?.options?.length ?
                                    getControlItem.options.map((optionItem) => (
                                        <SelectItem key={optionItem.id} value={optionItem.id}>
                                            {optionItem.label}
                                        </SelectItem>
                                    ))
                                    : null
                            }
                        </SelectContent>
                    </Select>
                );

            case types.TEXTAREA:
                return (
                    <Textarea
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        value={value}
                        onChange={(e) => setFormData({
                            ...formData,
                            [getControlItem.name]: e.target.value
                        } as T)}
                    />
                );

            default:
                return (
                    <Input
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type}
                        value={value}
                        onChange={(e) => setFormData({
                            ...formData,
                            [getControlItem.name]: e.target.value
                        } as T)}
                    />
                );
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
                {/* Form Controls */}
                {
                    formControls?.map((controlItem, index) => (
                        <div key={index} className='grid w-full gap-1.5'>
                            <Label className="mb-1">{controlItem.label}</Label>
                            {/* Render Input Based on Component Type */}
                            {
                                renderInputsByComponentType(controlItem)
                            }
                        </div>
                    ))
                }
            </div>
            {/* Submit Button */}
            <Button type="submit" className='mt-3 w-full' disabled={disableSubmitButton}>
                {buttonText || 'Submit'}
            </Button>
        </form>
    )
}

export default CommonForm;