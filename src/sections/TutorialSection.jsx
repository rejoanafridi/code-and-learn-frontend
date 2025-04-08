import { Card, CardContent } from '../components/ui/card';
import ReactMarkdown from 'react-markdown';

export function TutorialSection({ tutorial }) {
    return (
        <Card className="h-full">
            <CardContent className="p-6">
                {tutorial ? (
                    <div className="prose max-w-none">
                        <h1 className="text-2xl font-bold mb-4">{tutorial.title}</h1>
                        <ReactMarkdown>{tutorial.content}</ReactMarkdown>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        Select a tutorial to start learning
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 