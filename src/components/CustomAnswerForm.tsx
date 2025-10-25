import { useState } from 'react';

interface CustomAnswerFormProps {
  onAdd: (text: string) => Promise<void>;
}

export const CustomAnswerForm = ({ onAdd }: CustomAnswerFormProps) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setError('Please enter an answer');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onAdd(text.trim());
      setText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add option');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setError(null);
          }}
          placeholder="Add your own answer..."
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 placeholder-gray-500 min-h-[48px] touch-manipulation"
          disabled={isSubmitting}
          maxLength={50}
        />
        <button
          type="submit"
          disabled={isSubmitting || !text.trim()}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 min-w-[80px] min-h-[48px] touch-manipulation"
        >
          {isSubmitting ? '...' : 'Add'}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm font-medium px-1">{error}</p>
      )}
    </form>
  );
};
