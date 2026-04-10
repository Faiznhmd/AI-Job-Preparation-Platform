import InterviewForm from '@/app/components/Interview/InterviewForm';
import QuestionList from '@/app/components/Interview/QuestionList';

export default function InterviewPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        AI Interview Question Generator
      </h1>

      <InterviewForm />
      <QuestionList />
    </div>
  );
}
