import React from 'react';
import { Bell, Zap, Shield } from 'lucide-react';

function WhatExpect() {
  const features = [
    {
      title: 'Real-Time Alerts',
      description: 'Get instant notifications when prices drop on your watched items. Never miss a deal.',
      icon: <Bell className="w-6 h-6" />,
    },
    {
      title: 'Smart Price Tracking',
      description: 'Advanced algorithms monitor price history and predict the best time to purchase.',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: 'Secure Monitoring',
      description: 'Your watchlist and preferences are securely stored with complete privacy.',
      icon: <Shield className="w-6 h-6" />,
    },
  ];

  return (
    <section className="relative bg-[#f4ede4] py-12 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <h2 className="text-4xl font-bold text-[#4a154b] font-sans mb-4 md:mb-0 md:w-1/3">
            What to Expect
          </h2>
          <div className="h-[2px] bg-[#4a154b]/10 md:w-2/3" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-[#4a154b] rounded-xl p-6 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-4">
                <div className="text-[#f4ede4]">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-[#f4ede4] mb-2 font-sans">
                {feature.title}
              </h3>
              <p className="text-[#f4ede4]/90 leading-relaxed text-sm font-light">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatExpect;