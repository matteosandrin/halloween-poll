import { useEffect } from 'react';
import { usePollData } from './hooks/usePollData';
import { PollOption } from './components/PollOption';
import { CustomAnswerForm } from './components/CustomAnswerForm';

function App() {
  const { options, loading, error, vote, addCustomOption, resetAllVotes } = usePollData();

  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  // Secret endpoint to reset all votes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resetKey = params.get('reset');

    if (resetKey) {
      resetAllVotes();
      // Remove the parameter from URL after reset
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center p-4">
        <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <h2 className="font-bold text-lg mb-2">Error</h2>
          <p>{error}</p>
          <p className="mt-2 text-sm">Make sure you've set up Firebase credentials in your .env file.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2">
            Which costume should Matteo wear?
          </h1>
          <p className="text-lg text-gray-600">
            Vote for your favorite or add your own
          </p>
          <div className="text-sm text-gray-500 font-medium">
            Total Votes: {totalVotes}
          </div>
        </div>

        {/* Custom Answer Form */}
        <div className="bg-white/50 rounded-lg p-4 shadow-lg">
          <CustomAnswerForm onAdd={addCustomOption} />
        </div>

        {/* Poll Options */}
        <div className="space-y-3">
          {options.map((option) => (
            <PollOption
              key={option.id}
              option={option}
              onVote={vote}
              totalVotes={totalVotes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
