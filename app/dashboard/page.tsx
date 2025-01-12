export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Overview</h1>
        <p className="text-zinc-400">Welcome to your Arma 3 Launcher dashboard.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Active Servers</h2>
          <p className="text-3xl font-bold text-white">0</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Online Players</h2>
          <p className="text-3xl font-bold text-white">0</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-2">Total Players</h2>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <p className="text-zinc-400">No recent activity to display.</p>
      </div>
    </div>
  );
}
