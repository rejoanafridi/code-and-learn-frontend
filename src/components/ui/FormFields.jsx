import { useFormContext } from '../../hooks/useFormContext';

export const FormInput = ({
    name,
    label,
    type = 'text',
    placeholder = '',
    help,
    required = false,
    ...props
}) => {
    const { field, errorMessage } = useFormContext();
    const error = errorMessage(name);

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <input
                type={type}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...field(name, { required: required && `${label} is required` })}
                {...props}
            />

            {help && !error && (
                <p className="mt-1 text-sm text-gray-500">{help}</p>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export const FormTextarea = ({
    name,
    label,
    placeholder = '',
    rows = 4,
    help,
    required = false,
    ...props
}) => {
    const { field, errorMessage } = useFormContext();
    const error = errorMessage(name);

    return (
        <div className="mb-4 w-full">
            <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <textarea
                rows={rows}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...field(name, { required: required && `${label} is required` })}
                {...props}
            />

            {help && !error && (
                <p className="mt-1 text-sm text-gray-500">{help}</p>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export const FormSelect = ({
    name,
    label,
    options = [],
    placeholder = 'Select an option',
    help,
    required = false,
    ...props
}) => {
    const { field, errorMessage } = useFormContext();
    const error = errorMessage(name);

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <select
                className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...field(name, { required: required && `${label} is required` })}
                {...props}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {help && !error && (
                <p className="mt-1 text-sm text-gray-500">{help}</p>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export const FormCheckbox = ({
    name,
    label,
    help,
    ...props
}) => {
    const { field, errorMessage } = useFormContext();
    const error = errorMessage(name);

    return (
        <div className="mb-4">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded`}
                    {...field(name)}
                    {...props}
                />
                <label htmlFor={name} className="ml-2 block text-gray-700">
                    {label}
                </label>
            </div>

            {help && !error && (
                <p className="mt-1 text-sm text-gray-500">{help}</p>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export const FormSubmitButton = ({
    label = 'Submit',
    isLoading = false,
    ...props
}) => {
    const { isSubmitting } = useFormContext();
    const loading = isSubmitting || isLoading;

    return (
        <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors`}
            {...props}
        >
            {loading ? 'Processing...' : label}
        </button>
    );
}; 