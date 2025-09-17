'use client';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { EmailListInput } from './EmailListInput';
import { dailyLimitManager } from '@/lib/dailyLimit';

interface FormValues {
  subject: string;
  body: string;
  delay: number;
  gmailUser: string;
  gmailAppPassword: string;
}

export function SendForm() {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: { subject: '', body: '', delay: 5000 }
  });
  const delay = watch('delay');
  const [emails, setEmails] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
  const [dailyCount, setDailyCount] = useState(0);
  const [remainingCount, setRemainingCount] = useState(500);

  useEffect(() => {
    // Atualiza os contadores quando o componente monta
    updateDailyLimits();
  }, []);

  useEffect(() => {
    // Atualiza quando a lista de emails muda
    updateDailyLimits();
  }, [emails]);

  function updateDailyLimits() {
    const current = dailyLimitManager.getCurrentCount();
    const remaining = dailyLimitManager.getRemainingCount();
    setDailyCount(current);
    setRemainingCount(remaining);
  }

  async function onSubmit(values: FormValues) {
    if (!emails.length) return alert('Lista vazia');
    if (emails.length > 500) return alert('Máximo 500 emails por lista');
    
    // Verifica limite diário
    if (!dailyLimitManager.canSendEmails(emails.length)) {
      const remaining = dailyLimitManager.getRemainingCount();
      return alert(`Limite diário excedido! Você já enviou ${dailyCount} emails hoje. Restam apenas ${remaining} emails para hoje.`);
    }
    
    setSending(true);
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emails,
          subject: values.subject,
          body: values.body,
          delayMs: values.delay,
          gmailUser: values.gmailUser,
          gmailAppPassword: values.gmailAppPassword
        })
      });
      if (res.ok) {
        // Sucesso: adiciona ao contador diário
        dailyLimitManager.addToCount(emails.length);
        updateDailyLimits();
        alert(`Envio iniciado com sucesso! ${emails.length} emails adicionados à fila.`);
      } else {
        const j = await res.json().catch(() => ({}));
        alert('Erro: ' + (j.error || res.status));
      }
    } catch (e: any) {
      alert('Falha de rede ao chamar /api/send: ' + (e?.message || e));
    } finally {
      setSending(false);
    }
  }

  return (
    <form id="send-form-card" onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-gray-800 rounded-xl shadow-xl border border-gray-700 p-6 h-full flex flex-col">
        <div className="space-y-5 flex-1">
          <EmailListInput onChange={setEmails} />
          
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wide font-medium text-gray-300 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-600/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                </div>
                Subject
              </label>
              <input 
                className="w-full border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg px-4 py-3 text-sm transition-all duration-200 bg-gray-700 text-gray-100 placeholder-gray-400 shadow-sm hover:border-gray-500" 
                placeholder="Enter email subject..."
                {...register('subject', { required: true })} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wide font-medium text-gray-300 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                </div>
                Delay Between Sends
              </label>
              <div className="relative">
                <select
                  className="w-full border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg px-4 py-3 text-sm bg-gray-700 text-gray-100 transition-all duration-200 shadow-sm hover:border-gray-500 cursor-pointer appearance-none pr-10"
                  {...register('delay', { valueAsNumber: true, onChange: e => setValue('delay', parseInt(e.target.value, 10)) })}
                >
                  <option value={3000} className="bg-gray-700 text-gray-100">3000ms</option>
                  <option value={5000} className="bg-gray-700 text-gray-100">5000ms</option>
                  <option value={7000} className="bg-gray-700 text-gray-100">7000ms</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {delay && (
                <div className="mt-2">
                  {delay === 3000 && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-red-900/30 text-red-300 rounded-lg font-medium border border-red-700/50 shadow-sm">
                      <span className="text-xs">⚠️</span>
                      <span className="text-xs">Dangerous - Risk of blocking</span>
                    </div>
                  )}
                  {delay === 5000 && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-yellow-900/30 text-yellow-300 rounded-lg font-medium border border-yellow-700/50 shadow-sm">
                      <span className="text-xs">⚡</span>
                      <span className="text-xs">Moderate - Use with caution</span>
                    </div>
                  )}
                  {delay === 7000 && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-900/30 text-green-300 rounded-lg font-medium border border-green-700/50 shadow-sm">
                      <span className="text-xs">✅</span>
                      <span className="text-xs">Safe - Recommended</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide font-medium text-gray-300 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-600/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
              </div>
              Body (HTML or Text)
            </label>
            <textarea 
              className="w-full h-32 resize-none border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg px-4 py-3 text-sm font-mono bg-gray-700 text-gray-100 placeholder-gray-400 transition-all duration-200 shadow-sm hover:border-gray-500" 
              placeholder="Enter or paste HTML/text email content..."
              {...register('body', { required: true })} 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wide font-medium text-gray-300 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
              </div>
              Gmail Credentials
            </label>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400">Gmail</label>
                <input 
                  className="w-full border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg px-4 py-3 text-sm bg-gray-700 text-gray-100 placeholder-gray-400 transition-all duration-200 shadow-sm hover:border-gray-500" 
                  {...register('gmailUser', { required: true })} 
                  placeholder="your.email@gmail.com" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400">App Password</label>
                <input 
                  type="password"
                  className="w-full border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg px-4 py-3 text-sm bg-gray-700 text-gray-100 placeholder-gray-400 transition-all duration-200 shadow-sm hover:border-gray-500" 
                  {...register('gmailAppPassword', { required: true })} 
                  placeholder="xxxx xxxx xxxx xxxx" 
                />
                <p className="text-xs text-gray-500 leading-relaxed">Create in Security &gt; App passwords in Google.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-700 mt-auto">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${remainingCount > 100 ? 'bg-green-500' : remainingCount > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <span className="text-xs text-gray-400">
                {dailyCount}/500 sent today
              </span>
            </div>
            {remainingCount < 100 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-amber-900/20 border border-amber-700/30 rounded-lg">
                <span className="text-amber-400 text-xs">⚠️</span>
                <span className="text-xs text-amber-300">Remaining {remainingCount}</span>
              </div>
            )}
          </div>
          <button 
            disabled={sending || !dailyLimitManager.canSendEmails(emails.length)} 
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-xl text-sm font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-xl"
          >
            {sending ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sending...
              </>
            ) : !dailyLimitManager.canSendEmails(emails.length) ? (
              <>
                <span>🚫</span>
                Limit Exceeded
              </>
            ) : (
              <>
                <span>🚀</span>
                Start Sending ({emails.length})
              </>
            )}
          </button>
        </div>
    </form>
  );
}
