import React, { useState, useEffect } from 'react';
import { RefreshCw, Activity, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { ChannelStatusResponse } from '../types';
import { getAuthHeaders } from '../lib/utils';

export const ChannelView: React.FC = () => {
  const [data, setData] = useState<ChannelStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [restarting, setRestarting] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/channels', { 
        headers: getAuthHeaders(),
        credentials: 'include' 
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch channel status", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Auto refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const handleRestart = async (name: string) => {
    setRestarting(name);
    try {
      const res = await fetch(`/api/channels/${name}/restart`, { 
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include'
      });
      if (res.ok) {
        await fetchStatus();
      }
    } catch (err) {
      console.error("Failed to restart channel", err);
    } finally {
      setRestarting(null);
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">চ্যানেল স্ট্যাটাস চেক করা হচ্ছে...</div>;

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-extrabold text-teal-600 flex items-center gap-3">
          <MessageSquare className="w-8 h-8" /> IM চ্যানেল ম্যানেজমেন্ট
        </h2>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${data?.service_running ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-sm font-bold text-gray-500">
            Service: {data?.service_running ? 'Running' : 'Stopped'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data && data.channels && Object.entries(data.channels).map(([name, status], index) => (
          <motion.div 
            key={name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${status.status === 'online' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>
                   {status.status === 'online' ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 capitalize">{name}</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{status.status}</p>
                </div>
              </div>
              <button 
                onClick={() => handleRestart(name)}
                disabled={restarting === name}
                className={`p-2 rounded-xl transition-all ${restarting === name ? 'bg-gray-100 text-gray-400 animate-spin' : 'bg-teal-50 text-teal-600 hover:bg-teal-600 hover:text-white'}`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-2xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">প্রসেসড মেসেজ</p>
                <p className="text-lg font-bold text-gray-900">{status.messages_processed.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">সর্বশেষ সিঙ্ক</p>
                <p className="text-xs font-medium text-gray-600">
                  {status.last_sync ? new Date(status.last_sync).toLocaleTimeString() : 'কখনও না'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
              <Activity className="w-4 h-4 text-gray-300" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Channel Healthy</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};