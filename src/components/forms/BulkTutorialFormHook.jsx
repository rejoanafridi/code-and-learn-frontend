import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { bulkUploadTutorials } from '../../lib/api';
import { toast } from 'react-hot-toast';
import { useForm, FormProvider } from 'react-hook-form';
import { FormTextarea, FormSubmitButton, FormSelect } from '../ui/FormFields';
import { ignoreError } from '../../lib/eslintUtils';

const BulkTutorialFormHook = ({ onSuccess }) => {
    const { token } = useAuthContext();
    const [previewData, setPreviewData] = useState(null);

    const methods = useForm({
        defaultValues: {
            jsonInput: '',
            language: 'en'
        }
    });

    const { setValue, setError, clearErrors, watch } = methods;
    const selectedLanguage = watch('language');

    const handleJsonChange = (e) => {
        const input = e.target.value;
        setValue('jsonInput', input);

        // Clear previous preview and errors
        setPreviewData(null);
        clearErrors('jsonInput');

        // Try to parse JSON if not empty
        if (input.trim()) {
            try {
                const parsed = JSON.parse(input);
                if (Array.isArray(parsed)) {
                    setPreviewData(parsed);
                } else {
                    setPreviewData([parsed]); // If single object, convert to array
                }
            } catch (error) {
                // Don't set error yet, wait for submit
                ignoreError(error);
            }
        }
    };

    const handleSampleClick = () => {
        const sampleTutorials = [
            {
                title: "Introduction to JavaScript",
                content: "# Introduction to JavaScript\n\nJavaScript is a programming language used to create interactive effects within web browsers.",
                sampleCode: "// Hello World\nconsole.log('Hello, World!');",
                translations: {
                    en: {
                        title: "Introduction to JavaScript",
                        content: "# Introduction to JavaScript\n\nJavaScript is a programming language used to create interactive effects within web browsers."
                    },
                    ar: {
                        title: "مقدمة في جافا سكريبت",
                        content: "# مقدمة في جافا سكريبت\n\nجافا سكريبت هي لغة برمجة تستخدم لإنشاء تأثيرات تفاعلية داخل متصفحات الويب."
                    },
                    bn: {
                        title: "জাভাস্ক্রিপ্ট পরিচিতি",
                        content: "# জাভাস্ক্রিপ্ট পরিচিতি\n\nজাভাস্ক্রিপ্ট একটি প্রোগ্রামিং ভাষা যা ওয়েব ব্রাউজারের মধ্যে ইন্টারেক্টিভ প্রভাব তৈরি করতে ব্যবহৃত হয়।"
                    }
                }
            },
            {
                title: "Variables in JavaScript",
                content: "# Variables in JavaScript\n\nLearn about var, let, and const in JavaScript.",
                sampleCode: "let name = 'John';\nconst age = 30;\nconsole.log(`${name} is ${age} years old`);",
                translations: {
                    en: {
                        title: "Variables in JavaScript",
                        content: "# Variables in JavaScript\n\nLearn about var, let, and const in JavaScript."
                    },
                    ar: {
                        title: "المتغيرات في جافا سكريبت",
                        content: "# المتغيرات في جافا سكريبت\n\nتعرف على var و let و const في جافا سكريبت."
                    },
                    bn: {
                        title: "জাভাস্ক্রিপ্টে ভেরিয়েবল",
                        content: "# জাভাস্ক্রিপ্টে ভেরিয়েবল\n\nজাভাস্ক্রিপ্টে var, let, এবং const সম্পর্কে জানুন।"
                    }
                }
            }
        ];

        setValue('jsonInput', JSON.stringify(sampleTutorials, null, 2));
        setPreviewData(sampleTutorials);
    };

    const onSubmit = async (data) => {
        // Validate JSON format
        if (!data.jsonInput.trim()) {
            setError('jsonInput', {
                type: 'required',
                message: 'Please enter tutorial data in JSON format'
            });
            return;
        }

        let tutorials;
        try {
            const parsed = JSON.parse(data.jsonInput);
            tutorials = Array.isArray(parsed) ? parsed : [parsed];

            // Validate each tutorial
            for (const tutorial of tutorials) {
                if (!tutorial.title || !tutorial.content) {
                    setError('jsonInput', {
                        type: 'validate',
                        message: 'Each tutorial must have a title and content'
                    });
                    return;
                }

                // Add translations if not present
                if (!tutorial.translations) {
                    tutorial.translations = {};
                }

                // Set current content in the selected language if not set
                if (!tutorial.translations[data.language]) {
                    tutorial.translations[data.language] = {
                        title: tutorial.title,
                        content: tutorial.content
                    };
                }
            }
        } catch (error) {
            ignoreError(error);
            setError('jsonInput', {
                type: 'validate',
                message: 'Invalid JSON format'
            });
            return;
        }

        try {
            const result = await bulkUploadTutorials(tutorials, token);

            // Reset form
            setValue('jsonInput', '');
            setPreviewData(null);

            // Show success message
            toast.success(`Successfully uploaded ${result.tutorials.length} tutorials!`);

            // Call success callback if provided
            if (onSuccess) {
                onSuccess(result);
            }

            return result;
        } catch (error) {
            console.error('Bulk upload error:', error);
            toast.error(error.message || 'Failed to upload tutorials');
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
            <h2 className="text-xl font-semibold mb-4">Bulk Upload Tutorials</h2>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormSelect
                        name="language"
                        label="Default Language"
                        options={languageOptions}
                        help="The language of the tutorial content being uploaded"
                        required
                    />

                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="jsonInput" className="block text-gray-700 font-medium">
                                Tutorial Data (JSON)
                            </label>
                            <button
                                type="button"
                                onClick={handleSampleClick}
                                className="text-blue-600 text-sm hover:underline"
                            >
                                Load Sample
                            </button>
                        </div>

                        <FormTextarea
                            name="jsonInput"
                            placeholder={`[
  {
    "title": "Tutorial Title",
    "content": "Tutorial content in markdown",
    "sampleCode": "// Optional sample code",
    "translations": {
      "${selectedLanguage}": {
        "title": "Title in ${selectedLanguage}",
        "content": "Content in ${selectedLanguage}"
      }
    }
  }
]`}
                            rows={12}
                            onChange={handleJsonChange}
                            className="font-mono text-sm w-full"
                            required
                        />

                        <p className="text-sm text-gray-500 mt-1">
                            Enter an array of tutorial objects in JSON format. You can include translations for different languages.
                        </p>
                    </div>

                    {previewData && (
                        <div className="mb-4">
                            <h3 className="text-md font-medium mb-2">Preview ({previewData.length} tutorials)</h3>
                            <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-3 bg-gray-50">
                                <ul className="list-disc pl-5">
                                    {previewData.map((tutorial, index) => (
                                        <li key={index} className="mb-1">
                                            <span className="font-medium">{tutorial.title}</span>
                                            {tutorial.content && (
                                                <span className="text-gray-500 text-sm ml-2">
                                                    ({tutorial.content.length} chars)
                                                </span>
                                            )}
                                            {tutorial.translations && (
                                                <span className="text-green-600 text-sm ml-2">
                                                    ({Object.keys(tutorial.translations).length} translations)
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    <FormSubmitButton label="Upload Tutorials" />
                </form>
            </FormProvider>
        </div>
    );
};

export default BulkTutorialFormHook; 