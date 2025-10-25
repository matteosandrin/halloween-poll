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
      className="relative w-full min-h-[60px] px-6 py-4 bg-gray-300 hover:bg-gray-400 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 touch-manipulation overflow-hidden"
    >
      {/* Background bar that fills based on percentage */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ease-out rounded-lg"
        style={{ width: `${percentage}%` }}
      />

      {/* Content overlay */}
      <div className="relative z-10 flex justify-between items-center">
        <span className="text-lg font-semibold drop-shadow-md">{option.text}</span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium drop-shadow-md">{percentage}%</span>
          <span className="text-sm font-medium bg-black/30 px-3 py-1 rounded-full drop-shadow-sm">
            ({option.votes} vote{option.votes > 1 ? "s" : ""})
          </span>
        </div>
      </div>
    </button>
  );
};
