import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { PollOption } from '../types';

interface VoteChartProps {
  options: PollOption[];
}

const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444'];

export const VoteChart = ({ options }: VoteChartProps) => {
  const data = options.map((option) => ({
    name: option.text.length > 15 ? option.text.substring(0, 12) + '...' : option.text,
    votes: option.votes,
  }));

  if (options.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-gray-500">
        <p className="text-lg">No votes yet. Be the first to vote!</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Vote Results
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
            style={{ fontSize: '12px' }}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
