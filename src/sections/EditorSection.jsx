
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { markTutorialComplete } from '../lib/api';
import Output from '../components/Output';
import CodeEditor from '../components/CodeEditor';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function EditorSection({ tutorial, fetchTutorials }) {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const { token, user } = useAuth();

    // Update code when tutorial changes
    useEffect(() => {
        if (tutorial) {
            setCode(tutorial.sampleCode);
            setOutput('');
        }
    }, [tutorial]);

    const runCode = () => {
        try {
            const logs = [];
            const originalLog = console.log;
            console.log = (...args) => logs.push(args.join(' '));
            const result = eval(code);
            console.log = originalLog;
            setOutput([...logs, result].filter(Boolean).join('\n'));
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };

    const handleMarkComplete = async () => {
        if (!tutorial || !token) return;

        try {
            await markTutorialComplete(tutorial._id, token);
            toast.success('Tutorial marked as complete!');
            fetchTutorials()
        } catch (error) {
            toast.error(error.message);
        }
    };

    const resetCode = () => {
        if (tutorial) setCode(tutorial.sampleCode);
    };

    const isCompleted = user?.completedTutorials?.some(
        (t) => t._id === tutorial?._id
    );

    return (
        <Card className="h-auto md:h-full  flex flex-col">
            <CardContent className="flex-1 p-0">
                <CodeEditor code={code} onChange={setCode} />
            </CardContent>
            <CardFooter className="flex justify-between p-4 border-t">
                <div className="space-x-2">
                    <Button onClick={runCode}>Run Code</Button>
                    <Button variant="outline" onClick={resetCode}>
                        Reset
                    </Button>
                </div>
                {!isCompleted && (
                    <Button
                        variant="secondary"
                        onClick={handleMarkComplete}
                        disabled={!tutorial}
                    >
                        Mark Complete
                    </Button>
                )}
            </CardFooter>
            {output && (
                <div className="p-4 border-t">
                    <Output output={output} />
                </div>
            )}
        </Card>
    );
} 