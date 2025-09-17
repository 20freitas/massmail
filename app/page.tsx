'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Mail, Shield, Zap, BarChart3, Users, Globe, ArrowRight, Check, Play, ChevronDown, Plus, Minus, Target, TrendingUp, Clock } from 'lucide-react';

// Terminal Demo Component
function TerminalDemo() {
  return (
    <div className="relative flex flex-col rounded-2xl border border-slate-200/20 bg-[#0d1117] shadow-2xl overflow-hidden">
      <div className="px-4 pt-4 pb-3 border-b border-slate-200/20 bg-[#0d1117] flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
        <h2 className="text-sm font-semibold tracking-tight text-slate-100">Live Email Sending</h2>
        <span className="ml-auto text-[10px] text-slate-500">Real-time logs</span>
      </div>
      <div className="p-4 space-y-1 font-mono text-sm leading-relaxed h-64 overflow-hidden">
        <div className="text-cyan-300">
          <span className="text-slate-600">14:32:15&nbsp;</span>
          <span>&gt; Starting batch total=250</span>
        </div>
        <div className="text-emerald-400">
          <span className="text-slate-600">14:32:18&nbsp;</span>
          <span>&gt; [1/250] sarah.johnson@techcorp.com OK (remaining 249)</span>
        </div>
        <div className="text-emerald-400">
          <span className="text-slate-600">14:32:21&nbsp;</span>
          <span>&gt; [2/250] mike.chen@startup.io OK (remaining 248)</span>
        </div>
        <div className="text-emerald-400">
          <span className="text-slate-600">14:32:24&nbsp;</span>
          <span>&gt; [3/250] lisa.roberts@agency.com OK (remaining 247)</span>
        </div>
        <div className="text-emerald-400">
          <span className="text-slate-600">14:32:27&nbsp;</span>
          <span>&gt; [4/250] james.wilson@enterprise.net OK (remaining 246)</span>
        </div>
        <div className="text-emerald-400">
          <span className="text-slate-600">14:32:30&nbsp;</span>
          <span>&gt; [5/250] emma.davis@consulting.com OK (remaining 245)</span>
        </div>
        <div className="text-blue-400 animate-pulse">
          <span className="text-slate-600">14:32:33&nbsp;</span>
          <span>&gt; [6/250] alex.kumar@fintech.com OK (remaining 244)</span>
        </div>
      </div>
    </div>
  );
}

// (Removed AnimatedProviders component as requested)

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "How quickly can I start sending emails?",
      answer: "You can start sending emails immediately! Just add your Gmail credentials, upload your email list, and hit send. The entire setup takes less than 2 minutes."
    },
    {
      question: "Is there a daily sending limit?",
      answer: "Yes, we enforce a 500 email per day limit to maintain excellent deliverability rates and protect your sender reputation. This ensures your emails always reach the inbox."
    },
    {
      question: "What email providers are supported?",
      answer: "Currently we support Gmail with App Passwords for maximum security. We're adding support for Outlook, Yahoo, and other providers soon."
    },
    {
      question: "Can I send HTML emails?",
      answer: "Absolutely! You can send both HTML and plain text emails. Our system supports rich formatting, images, and professional email templates."
    },
    {
      question: "How do I track email delivery?",
      answer: "Get real-time feedback with our live terminal interface. See exactly which emails are being sent, delivery confirmations, and any errors instantly."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">MassMail Pro</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </a>
            <Link 
              href="/dashboard" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Start Now
            </Link>
          </div>
          <div className="md:hidden">
            <Link 
              href="/dashboard" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              Start Now
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Transform
                <span className="text-blue-400"> Leads Into Sales</span>
                <br />in Minutes
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Stop losing customers to slow follow-ups. Send 500+ professional emails instantly, 
                track every interaction, and convert more leads than ever before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href="/dashboard" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Start Selling More Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Success Stories
                </button>
              </div>
              
              {/* Stats */}
              <div className="flex gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-400">95%</div>
                  <div className="text-sm text-gray-400">Delivery Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400">3x</div>
                  <div className="text-sm text-gray-400">More Conversions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">500+</div>
                  <div className="text-sm text-gray-400">Emails/Day</div>
                </div>
              </div>
            </div>
            
            {/* Terminal Demo */}
            <div className="lg:pl-8">
              <TerminalDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Email providers section removed as requested */}

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Close More Deals With Professional Email Campaigns
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to turn prospects into paying customers, faster than ever.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Instant Lead Follow-Up</h3>
              <p className="text-gray-300">
                Strike while the iron is hot. Follow up with warm leads instantly before competitors get there first.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">3x Higher Conversion</h3>
              <p className="text-gray-300">
                Our users report 3x higher conversion rates compared to traditional email marketing methods.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Real-time Analytics</h3>
              <p className="text-gray-300">
                Watch your campaigns perform in real-time. See exactly which emails are working and optimize on the fly.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Bulk Personalization</h3>
              <p className="text-gray-300">
                Send personalized emails to hundreds of prospects at once. Make every email feel one-on-one.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Inbox Guarantee</h3>
              <p className="text-gray-300">
                Built-in safety limits and smart sending patterns ensure 95%+ inbox delivery rates.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">2-Minute Setup</h3>
              <p className="text-gray-300">
                Start sending professional campaigns in under 2 minutes. No complex setup or learning curve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              From Lead to Sale in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-300">
              Start converting more customers today. No technical skills required.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Upload Your Leads</h3>
              <p className="text-gray-300 mb-6">
                Import your lead list from CSV or paste emails directly. We'll validate and organize everything automatically.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="text-sm text-gray-400 text-left font-mono">
                  📁 leads.csv<br/>
                  ✅ 247 emails imported<br/>
                  ✅ All emails validated
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Craft Your Message</h3>
              <p className="text-gray-300 mb-6">
                Write your sales email once. Add HTML formatting, personalization, and compelling calls-to-action.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="text-sm text-gray-300 text-left">
                  <div className="text-blue-400">Subject:</div>
                  "Transform your business in 30 days"<br/>
                  <div className="text-purple-400 mt-2">Body:</div>
                  "Hi there, I noticed your company..."
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Watch Sales Roll In</h3>
              <p className="text-gray-300 mb-6">
                Hit send and watch the magic happen. Track opens, replies, and conversions in real-time.
              </p>
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="text-sm text-left space-y-1">
                  <div className="text-green-400">✅ 245 emails sent</div>
                  <div className="text-blue-400">📧 23 replies received</div>
                  <div className="text-purple-400">💰 8 new customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Gallery */}
      <section className="px-6 py-20 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              See MassMail Pro in Action
            </h2>
            <p className="text-xl text-gray-300">
              Professional interface designed for results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">📧 Email Composition</h3>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-600 h-48 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <Mail className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Professional email editor with<br/>HTML support and templates</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">📊 Real-time Dashboard</h3>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-600 h-48 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Live progress tracking and<br/>detailed analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to know about MassMail Pro
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-xl border border-gray-700">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors rounded-xl"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-white">{faq.question}</span>
                  {openFaq === index ? (
                    <Minus className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-6 py-20 bg-gray-800/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Escolhe o plano ideal para ti
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            CSV e escolha de delay estão disponíveis apenas nos planos pagos.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-colors text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <div className="text-4xl font-bold text-white mb-4">
                €0<span className="text-lg text-gray-400">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">20 emails por dia</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Tracking em tempo real</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">Suporte a HTML</span>
                </li>
                <li className="flex items-center gap-2 opacity-60">
                  <span className="w-5 h-5 inline-flex items-center justify-center rounded bg-gray-700 text-gray-300 text-[10px]">×</span>
                  <span className="text-gray-400">Importação CSV (apenas planos pagos)</span>
                </li>
                <li className="flex items-center gap-2 opacity-60">
                  <span className="w-5 h-5 inline-flex items-center justify-center rounded bg-gray-700 text-gray-300 text-[10px]">×</span>
                  <span className="text-gray-400">Escolher delay (usa o mais lento)</span>
                </li>
              </ul>
              <Link href="/dashboard" className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors block text-center">
                Começar grátis
              </Link>
            </div>

            {/* Normal Plan */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-colors relative text-left">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow">Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Normal</h3>
              <div className="text-4xl font-bold text-white mb-4">
                €2,99<span className="text-lg text-gray-400">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-indigo-400" />
                  <span className="text-gray-300">100 emails por dia</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-indigo-400" />
                  <span className="text-gray-300">Importação CSV</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-indigo-400" />
                  <span className="text-gray-300">Escolha de delay</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-indigo-400" />
                  <span className="text-gray-300">Tracking em tempo real</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-indigo-400" />
                  <span className="text-gray-300">Suporte a HTML</span>
                </li>
              </ul>
              <button className="w-full bg-white text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Obter Normal
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-blue-600 to-blue-700 rounded-2xl p-8 border border-blue-500 relative text-left">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow">Melhor oferta</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="text-4xl font-bold text-white mb-4">
                €7,99<span className="text-lg text-blue-200">/mês</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100">500 emails por dia</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100">Importação CSV</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100">Escolha de delay</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100">Tracking em tempo real</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-100">Suporte a HTML</span>
                </li>
              </ul>
              <button className="w-full bg-white text-blue-700 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Obter Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to 3x Your Sales?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of businesses converting more leads with MassMail Pro.
          </p>
          <Link 
            href="/dashboard" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            Start Converting Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">MassMail Pro</span>
            </div>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 MassMail Pro. Transform leads into sales.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
