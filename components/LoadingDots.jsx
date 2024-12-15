export const LoadingDots = () => {
    return (
        <div className="flex space-x-1 justify-center items-center">
            <span className="sr-only">Loading...</span>
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="h-2 w-2 bg-white rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
            ))}
        </div>
    )
}

