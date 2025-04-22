import { useAuthContext } from '../../context/AuthContext';
import { createTutorial } from '../../lib/api';
import { toast } from 'react-hot-toast';
import { useForm, FormProvider } from 'react-hook-form';
import { FormInput, FormTextarea, FormSubmitButton, FormSelect } from '../ui/FormFields';

const TutorialFormHook = ({ onSuccess }) => {
    const { token } = useAuthContext();
    const methods = useForm({
        defaultValues: {
            title: '',
            content: '',
            sampleCode: '// Sample code',
            language: 'en',
            translations: {
                en: { title: '', content: '' },
                ar: { title: '', content: '' },
                bn: { title: '', content: '' }
            }
        }
    });

    const onSubmit = async (data) => {
        try {
            // Update translations based on selected language
            const selectedLanguage = data.language;
            const translations = {
                ...data.translations,
                [selectedLanguage]: {
                    title: data.title,
                    content: data.content
                }
            };

            // Include translations in the data sent to API
            const tutorialData = {
                ...data,
                translations
            };

            const result = await createTutorial(tutorialData, token);

            // Show success message
            toast.success('Tutorial created successfully!');

            // Reset form
            methods.reset({
                title: '',
                content: '',
                sampleCode: '// Sample code',
                language: 'en',
                translations: {
                    en: { title: '', content: '' },
                    ar: { title: '', content: '' },
                    bn: { title: '', content: '' }
                }
            });

            // Call success callback if provided
            if (onSuccess) {
                onSuccess(result);
            }

            return result;
        } catch (error) {
            console.error('Create tutorial error:', error);
            toast.error(error.message || 'Failed to create tutorial');
            throw error;
        }
    };

    // Language options
    const languageOptions = [
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'Arabic' },
        { value: 'bn', label: 'Bengali' }
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create New Tutorial</h2>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormSelect
                        name="language"
                        label="Tutorial Language"
                        options={languageOptions}
                        placeholder="Select language"
                        required
                    />

                    <FormInput
                        name="title"
                        label="Title"
                        placeholder="Enter tutorial title"
                        required
                    />

                    <FormTextarea
                        name="content"
                        label="Content (Markdown)"
                        placeholder="Enter tutorial content in markdown format"
                        rows={8}
                        required
                    />

                    <FormTextarea
                        name="sampleCode"
                        label="Sample Code"
                        placeholder="// Enter sample code"
                        rows={5}
                        className="font-mono text-sm w-full"
                    />

                    <FormSubmitButton label="Create Tutorial" />
                </form>
            </FormProvider>
        </div>
    );
};

export default TutorialFormHook; 