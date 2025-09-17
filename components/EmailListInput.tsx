import { useState } from 'react';
import Papa from 'papaparse';

interface Props { onChange: (emails: string[]) => void; }

export function EmailListInput({ onChange }: Props) {
  const [raw, setRaw] = useState('');
  const [count, setCount] = useState(0);

  function parseManual(value: string) {
    const parts = value.split(/[,\n;\s]+/).map(v => v.trim()).filter(Boolean);
    const unique = Array.from(new Set(parts));
    setCount(unique.length);
    onChange(unique);
  }

  function handleFile(file: File) {
    Papa.parse(file, {
      complete: (result) => {
        const emails: string[] = [];
        for (const row of result.data as any[]) {
          for (const cell of row as any[]) {
            if (typeof cell === 'string' && /@/.test(cell)) emails.push(cell.trim());
          }
        }
        const unique = Array.from(new Set(emails));
        setRaw(unique.join('\n'));
        setCount(unique.length);
        onChange(unique);
      }
    });
  }

  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-wide font-medium text-gray-300 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-indigo-600/20 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
        </div>
        Email List (CSV or Manual)
      </label>
      <textarea
        className="w-full h-32 resize-none px-4 py-3 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg text-sm font-mono bg-gray-700 text-gray-100 placeholder-gray-400 transition-all duration-200 shadow-sm hover:border-gray-500"
        value={raw}
        placeholder="email1@domain.com&#10;email2@domain.com&#10;email3@domain.com"
        onChange={e => { setRaw(e.target.value); parseManual(e.target.value); }}
      />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <label className="relative cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors shadow-sm">
            <span>📁</span>
            <span>Choose CSV File</span>
            <input 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              type="file" 
              accept=".csv" 
              onChange={e => e.target.files && handleFile(e.target.files[0])} 
            />
          </label>
          {count > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-900/30 text-blue-300 rounded-lg font-medium border border-blue-700/50 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <span className="text-xs">Total: {count}</span>
            </div>
          )}
        </div>
        {count > 500 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-red-900/30 text-red-300 rounded-lg font-medium border border-red-700/50 shadow-sm">
            <span className="text-xs">⚠️</span>
            <span className="text-xs">Limit exceeded (max. 500)</span>
          </div>
        )}
      </div>
    </div>
  );
}
