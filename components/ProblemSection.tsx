import React from 'react';
import { Search, Clock, TrendingDown } from 'lucide-react';

const ProblemSection = () => {
    const problems = [
        {
            title: 'Lack of Personalized Filters',
            description: 'Difficulty in tracking specific products or categories that matter to you.',
            icon: <Search className="w-6 h-6" />,
        },
        {
            title: 'Missing Out on Deals',
            description: 'Users often miss limited-time discounts and exclusive offers on desired items.',
            icon: <Clock className="w-6 h-6" />,
        },
        {
            title: 'Price Drop Monitoring',
            description: 'The challenge of manually checking prices daily and predicting the best time to buy.',
            icon: <TrendingDown className="w-6 h-6" />,
        },
    ];

    return (
        <section className="relative bg-[#f4ede4] py-12 pb-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
                    <h2 className="text-4xl font-bold text-[#4a154b] font-sans mb-4 md:mb-0 md:w-1/3">
                        The Problem
                    </h2>
                    <div className="h-[2px] bg-[#4a154b]/10 md:w-2/3" />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            className="relative bg-[#4a154b] rounded-xl p-6 transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="mb-4">
                                <div className="text-[#f4ede4]">{problem.icon}</div>
                            </div>
                            <h3 className="text-xl font-semibold text-[#f4ede4] mb-2 font-sans">
                                {problem.title}
                            </h3>
                            <p className="text-[#f4ede4]/90 leading-relaxed text-sm font-light">
                                {problem.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProblemSection;