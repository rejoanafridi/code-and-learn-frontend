import ReactMarkdown from "react-markdown";

function TutorialContent({ content }) {
    return (
        <div className="p-4 bg-white border rounded-lg">
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}

export default TutorialContent;