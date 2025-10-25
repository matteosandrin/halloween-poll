import type { PollOption as PollOptionType } from '../types';

interface PollOptionProps {
  option: PollOptionType;
  onVote: (optionId: string) => void;
  totalVotes: number;
}

export const PollOption = ({ option, onVote, totalVotes }: PollOptionProps) => {
  const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

  return (
    <button
      onClick={() => onVote(option.id)}
      className="w-full min-h-[60px] px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 touch-manipulation"
    >
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">{option.text}</span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium">{percentage}%</span>
          <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
            ({option.votes} vote{option.votes > 1 ? "s"  : ""})
          </span>
        </div>
      </div>
    </button>
  );
};
