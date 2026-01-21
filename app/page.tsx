'use client'; // Required for interactivity in Next.js

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Define the shape of our data (TypeScript)
interface Log {
  id: number;
  created_at: string;
  bot_name: string;
  status: string;
  message: string;
}

export default function Home() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch data from Supabase
  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase
        .from('bot_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching logs:', error);
      else setLogs(data || []);
      setLoading(false);
    }

    fetchLogs();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-8 font-sans">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto mb-10 flex justify-between items-center border-b border-gray-700 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white">RPA Control Center</h1>
          <p className="text-gray-400 text-sm mt-1">
            Developed by <span className="text-blue-400">Alfredo Alves</span> for Syhus
          </p>
        </div>
        <div className="flex gap-3">
          <span className="px-3 py-1 bg-green-900 text-green-300 text-xs rounded-full border border-green-700 animate-pulse">
            System Online
          </span>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-gray-400 text-sm">Active Bots</h3>
          <p className="text-3xl font-bold text-white mt-2">3</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-gray-400 text-sm">Tasks Completed (Today)</h3>
          <p className="text-3xl font-bold text-blue-400 mt-2">1,240</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-gray-400 text-sm">Server Status</h3>
          <p className="text-3xl font-bold text-green-400 mt-2">99.9%</p>
        </div>
      </div>

      {/* Real-time Logs Table */}
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Live Execution Logs (Supabase)</h2>
          <span className="text-xs text-gray-500">Auto-sync enabled</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading data from Database...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-gray-900 text-gray-200 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Timestamp</th>
                  <th className="px-6 py-3">Bot Name</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-750 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">
                      {new Date(log.created_at).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{log.bot_name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          log.status === 'Success'
                            ? 'bg-green-900 text-green-300'
                            : log.status === 'Error'
                            ? 'bg-red-900 text-red-300'
                            : 'bg-yellow-900 text-yellow-300'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto mt-8 text-center">
        <a
          href="https://github.com/al-ac/portifolio-syhus"
          target="_blank"
          className="inline-flex items-center text-blue-400 hover:underline"
        >
          View Source Code on GitHub &rarr;
        </a>
      </div>
    </main>
  );
}