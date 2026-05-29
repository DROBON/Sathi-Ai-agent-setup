import React, { useState, useEffect } from 'react';
import { Terminal, Download, Plus, Trash2, FileCode, Code2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CodeSnippet } from '../types';

interface CodeStudioProps {
  activeThreadId: string | null;
  activeTab: string;
  exportAsZip: () => void;
}

export const CodeStudio: React.FC<CodeStudioProps> = ({ 
  activeThreadId, 
  activeTab, 
  exportAsZip 
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newSnippet, setNewSnippet] = useState({ filename: '', code: '', language: 'javascript' });
  const [studioSnippets, setStudioSnippets] = useState<CodeSnippet[]>([]);

  const fetchSnippets = async () => {
    if (!activeThreadId) return;
    try {
      const response = await fetch(`/api/threads/${activeThreadId}/snippets`);
      const data = await response.json();
      setStudioSnippets(data.snippets || []);
    } catch (err) {
      console.error("Failed to fetch snippets", err);
    }
  };

  useEffect(() => {
    if (activeTab === 'studio') fetchSnippets();
  }, [activeTab, activeThreadId]);

  const addSnippet = async () => {
    if (!newSnippet.code || !newSnippet.filename || !activeThreadId) return;
    try {
      await fetch(`/api/threads/${activeThreadId}/snippets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSnippet)
      });
      setNewSnippet({ filename: '', code: '', language: 'javascript' }); 
      setIsAdding(false);
      fetchSnippets();
    } catch (err) {
      console.error("Failed to save snippet", err);
    }
  };

  const deleteSnippet = async (filename: string) => {
    if (!activeThreadId) return;
    try {
      await fetch(`/api/threads/${activeThreadId}/snippets/${encodeURIComponent(filename)}`, {
        method: 'DELETE'
      });
      fetchSnippets();
    } catch (err) {
      console.error("Failed to delete snippet", err);
    }
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold flex items-center gap-3">
          <Terminal className="text-blue-600 w-8 h-8" /> Code Studio
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={exportAsZip} 
            className="bg-white border px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" /> ZIP
          </button>
          <button 
            onClick={() => setIsAdding(true)} 
            disabled={!activeThreadId}
            className={`bg-blue-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg shadow-blue-100 flex items-center gap-2 ${!activeThreadId ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Plus className="w-4 h-4" /> {activeThreadId ? 'নিউ ফাইল' : 'চ্যাট থ্রেড নেই'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="mb-8 bg-white rounded-2xl border p-6 shadow-xl"
          >
            <input 
              value={newSnippet.filename} 
              onChange={e => setNewSnippet({...newSnippet, filename: e.target.value})} 
              placeholder="Filename (e.g. main.js)" 
              className="w-full mb-3 bg-gray-50 p-2 rounded-lg" 
            />
            <textarea 
              value={newSnippet.code} 
              onChange={e => setNewSnippet({...newSnippet, code: e.target.value})} 
              placeholder="Code here..." 
              className="w-full h-64 bg-gray-900 text-blue-100 font-mono p-4 rounded-xl resize-none" 
            />
            <div className="flex justify-end gap-3 mt-4">
              <button 
                onClick={() => setIsAdding(false)} 
                className="px-6 py-2 text-gray-500 font-bold"
              >
                বাতিল
              </button>
              <button 
                onClick={addSnippet} 
                className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-lg"
              >
                Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {studioSnippets.map(s => (
          <div key={s.id} className="bg-white border rounded-2xl p-5 shadow-sm relative group">
            <button 
              onClick={() => deleteSnippet(s.filename || s.id)} 
              className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <FileCode className="w-4 h-4 text-blue-500" />
              {s.filename}
            </h3>
            <div className="bg-gray-900 text-blue-100 p-4 h-48 overflow-y-auto rounded-xl font-mono text-xs scrollbar-hide whitespace-pre">
              {s.code}
            </div>
          </div>
        ))}
        {activeThreadId && studioSnippets.length === 0 && !isAdding && (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border border-gray-100">
              <Code2 className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400">এই থ্রেডে কোন কোড ফাইল নেই</p>
          </div>
        )}
      </div>
    </div>
  );
};