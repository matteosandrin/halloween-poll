import type { PollOption as PollOptionType } from '../types';

interface PollOptionProps {
  option: PollOptionType;
  onVote: (optionId: string) => void;
  totalVotes: number;
  maxVote: number;
  disabled?: boolean;
}

export const PollOption = ({ option, onVote, totalVotes, maxVote, disabled = false }: PollOptionProps) => {
  const widthPercentage = totalVotes > 0 ? Math.round((option.votes / maxVote) * 100) : 0;

  return (
    <button
      onClick={() => !disabled && onVote(option.id)}
      disabled={disabled}
      className={`relative w-full min-h-[60px] px-6 py-4 bg-gray-300 text-white rounded-lg shadow-lg transition-all duration-200 touch-manipulation overflow-hidden ${
        disabled
          ? 'opacity-75 cursor-not-allowed'
          : 'hover:bg-gray-400 hover:shadow-xl active:scale-95'
      }`}
    >
      {/* Background bar that fills based on percentage */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out rounded-lg"
        style={{ width: `${widthPercentage}%` }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex justify-between items-center">
        <span className="text-lg font-semibold drop-shadow-md">{option.text}</span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium bg-black/30 px-3 py-1 rounded-full drop-shadow-sm">
            {option.votes}
          </span>
        </div>
      </div>
    </button>
  );
};
