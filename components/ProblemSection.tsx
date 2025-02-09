import React from 'react';

const ProblemSection = () => {
    const problems = [
        {
            title: 'Lack of Personalized Filters',
            description: 'Difficulty in tracking specific products or categories.',
            icon: '🔍',
        },
        {
            title: 'Missing Out on Deals',
            description: 'Users often miss limited-time discounts and exclusive deals.',
            icon: '⏳',
        },
        {
            title: 'Price Drop Monitoring',
            description: 'Struggling to monitor price drops and track the best time to buy.',
            icon: '📉',
        },
    ];

    return (
        <div className="relative bg-[#f4ede4] flex justify-center items-center px-6">
            {/* Background Pattern (Now Visible) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="w-full h-full" style={{
                    backgroundImage: 'radial-gradient(circle, #4a154b 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}></div>
            </div>

            <div className="max-w-[1000px] w-full py-8 relative">
                <h1 className="font-sans text-4xl text-black font-bold mb-4">
                    The Problem
                </h1>

                <div className="flex flex-wrap gap-6 justify-center">
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            className="bg-[#4a154b] p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 w-[280px]"
                        >
                            <div className="flex flex-col gap-4">
                                <div className="text-3xl text-[#f4ede4]">
                                    {problem.icon}
                                </div>
                                <div>
                                    <h2 className="font-sans text-lg text-[#f4ede4] font-medium mb-2">
                                        {problem.title}
                                    </h2>
                                    <p className="text-[#f4ede4] text-sm leading-relaxed font-light opacity-90">
                                        {problem.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProblemSection;
