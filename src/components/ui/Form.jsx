import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const Form = ({
    onSubmit,
    defaultValues = {},
    children,
    submitLabel = 'Submit',
    resetOnSubmit = false,
    className = ''
}) => {
    const methods = useForm({ defaultValues });
    const { handleSubmit, formState: { isSubmitting, errors }, reset } = methods;

    const processSubmit = async (data) => {
        try {
            await onSubmit(data);
            if (resetOnSubmit) {
                reset(defaultValues);
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred');
            console.error('Form submission error:', error);
        }
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(processSubmit)}
                className={className}
                noValidate
            >
                {children}

                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        <p className="font-medium">Please correct the following errors:</p>
                        <ul className="mt-1 ml-4 list-disc list-inside text-sm">
                            {Object.entries(errors).map(([field, error]) => (
                                <li key={field}>{error.message}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                        } transition-colors`}
                >
                    {isSubmitting ? 'Processing...' : submitLabel}
                </button>
            </form>
        </FormProvider>
    );
};

export const FormField = ({
    name,
    label,
    type = 'text',
    placeholder = '',
    validation = {},
    children,
    ...props
}) => {
    const { register, formState: { errors } } = useForm();

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
                {label}
            </label>

            {children || (
                type === 'textarea' ? (
                    <textarea
                        id={name}
                        {...register(name, validation)}
                        className={`w-full px-3 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder={placeholder}
                        {...props}
                    />
                ) : (
                    <input
                        id={name}
                        type={type}
                        {...register(name, validation)}
                        className={`w-full px-3 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder={placeholder}
                        {...props}
                    />
                )
            )}

            {errors[name] && (
                <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
            )}
        </div>
    );
};

export const useFormField = () => {
    const { register, formState: { errors }, watch } = useForm();

    return {
        register,
        errors,
        watch
    };
}; 