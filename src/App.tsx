import { useEffect } from 'react';
import { usePollData } from './hooks/usePollData';
import { PollOption } from './components/PollOption';
import { CustomAnswerForm } from './components/CustomAnswerForm';

function App() {
  const { options, loading, error, vote, addCustomOption, resetAllVotes, hasVoted, resetHasVoted } = usePollData();

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);
  const maxVote = options.reduce((currMax, option) => option.votes > currMax ? option.votes : currMax, 0);

  // Secret endpoint to reset all votes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resetKey = params.get('reset');

    if (resetKey === 'all') {
      resetAllVotes();
      // Remove the parameter from URL after reset
      window.history.replaceState({}, '', window.location.pathname);
    } else if (resetKey === 'vote') {
      resetHasVoted();
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [resetAllVotes]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center p-4">
        <div className="text-2xl font-bold text-blue-600 animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Error notification */}
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg">
            <p className="font-semibold">{error}</p>
          </div>
        )}
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
            Which costume should Matteo wear?
          </h1>
          <p className="text-lg text-gray-600">
            {hasVoted ? 'Thanks for voting! See the results below' : 'Vote for your favorite or add your own'}
          </p>
        </div>

        {/* Custom Answer Form */}
        {!hasVoted && (
          <div className="bg-white/50 rounded-lg p-4 shadow-lg">
            <CustomAnswerForm onAdd={addCustomOption} />
          </div>
        )}

        {/* Poll Options */}
        <div className="space-y-4">
          <div className="text-xl text-center font-bold">
            Total Votes: {totalVotes}
          </div>
          {hasVoted && (
            <div className="text-sm text-blue-600 font-semibold bg-white/50 px-4 py-2 rounded-lg mx-auto w-fit">
              ✓ You have already voted
            </div>
          )}
          <div className="space-y-3">
            {options.map((option) => (
              <PollOption
              key={option.id}
              option={option}
              onVote={vote}
              totalVotes={totalVotes}
              maxVote={maxVote}
              disabled={hasVoted}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
