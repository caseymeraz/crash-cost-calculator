'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Phone, Clock } from 'lucide-react';

interface Props {
  onSubmit: (data: { name: string; phone: string; email: string }) => void;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function LeadCaptureForm({ onSubmit }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) return;
    onSubmit({ name, phone, email });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 rounded-full bg-accent-green/20 flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M5 12L10 17L20 7" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Your case review is on the way</h3>
        <p className="text-text-secondary">
          A qualified attorney will review your information and contact you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-bg-surface border border-border rounded-2xl p-6 md:p-8">
        <h3 className="text-xl font-bold mb-1">Get your free case review</h3>
        <p className="text-text-secondary text-sm mb-6">
          Find out what your claim is really worth. A local attorney will review your case at no cost.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-bg-primary border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-green transition-colors"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              required
              className="w-full bg-bg-primary border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-green transition-colors"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-bg-primary border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-green transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-lg font-bold text-bg-primary bg-gradient-to-r from-accent-green to-emerald-400 hover:from-emerald-400 hover:to-accent-green transition-all cursor-pointer text-lg"
          >
            Get My Free Case Review
          </button>
        </form>

        <div className="flex flex-wrap justify-center gap-6 mt-6 text-text-secondary text-xs">
          <span className="flex items-center gap-1.5"><Phone size={14} /> Free consultation</span>
          <span className="flex items-center gap-1.5"><Shield size={14} /> Confidential</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> No fee unless you win</span>
        </div>

        <p className="text-text-secondary/50 text-xs text-center mt-4">
          Your information is protected and will only be shared with a qualified attorney in your area.
        </p>
      </div>
    </motion.div>
  );
}
