import React from 'react';
import { Key, Shield, Scroll } from 'lucide-react';

export function Membership() {
  return (
    <section id="membership" className="relative py-24 bg-black border-t border-white/5 overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-red-900/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
          Claim Your <span className="text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)]">Vault Key</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
          Ordinary minds would shatter reading these texts. If you have the will, bind your soul to the archive and unlock unrestricted access to the forbidden tomes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Perk 1 */}
          <div className="bg-gray-950/50 border border-white/5 rounded-2xl p-8 hover:border-red-900/50 hover:bg-gray-900/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-red-950/50 flex items-center justify-center mx-auto mb-6 border border-red-900/50">
              <Key className="text-red-500 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Unlimited Access</h3>
            <p className="text-gray-500 text-sm">Read the full, unredacted lore of every artifact and tome in the vault.</p>
          </div>

          {/* Perk 2 */}
          <div className="bg-gray-950/50 border border-white/5 rounded-2xl p-8 hover:border-red-900/50 hover:bg-gray-900/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-red-950/50 flex items-center justify-center mx-auto mb-6 border border-red-900/50">
              <Shield className="text-red-500 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Ward Protection</h3>
            <p className="text-gray-500 text-sm">Our digital wards protect your mind from the eldritch whispers hidden in the margins.</p>
          </div>

          {/* Perk 3 */}
          <div className="bg-gray-950/50 border border-white/5 rounded-2xl p-8 hover:border-red-900/50 hover:bg-gray-900/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-red-950/50 flex items-center justify-center mx-auto mb-6 border border-red-900/50">
              <Scroll className="text-red-500 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Personal Archives</h3>
            <p className="text-gray-500 text-sm">Save your favorite tomes to your personal collections for immediate summoning.</p>
          </div>
        </div>

        <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-red-600 rounded-xl hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:-translate-y-1">
          Forge the Pact
        </button>
      </div>
    </section>
  );
}