import { useFormContext as useHookFormContext } from 'react-hook-form'

export const useFormContext = () => {
    const methods = useHookFormContext()

    if (!methods) {
        throw new Error('useFormContext must be used within a FormProvider')
    }

    return {
        ...methods,
        field: (name, options = {}) => {
            const {
                required,
                minLength,
                maxLength,
                pattern,
                validate,
                ...rest
            } = options

            const validationRules = {}

            if (required) {
                validationRules.required =
                    typeof required === 'string'
                        ? required
                        : `${name} is required`
            }

            if (minLength) {
                validationRules.minLength = {
                    value: minLength,
                    message: `${name} must be at least ${minLength} characters`
                }
            }

            if (maxLength) {
                validationRules.maxLength = {
                    value: maxLength,
                    message: `${name} cannot exceed ${maxLength} characters`
                }
            }

            if (pattern) {
                validationRules.pattern = {
                    value: pattern,
                    message:
                        typeof pattern === 'object' && pattern.message
                            ? pattern.message
                            : `${name} format is invalid`
                }
            }

            if (validate) {
                validationRules.validate = validate
            }

            return {
                ...methods.register(name, validationRules),
                id: name,
                error: methods.formState.errors[name],
                ...rest
            }
        },
        isSubmitting: methods.formState.isSubmitting,
        errors: methods.formState.errors,
        errorMessage: (name) => methods.formState.errors[name]?.message
    }
}
