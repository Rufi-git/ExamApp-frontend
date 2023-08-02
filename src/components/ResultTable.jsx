const ResultTable = ({results}) => {
    return (
        <div className="mx-auto w-full">
            <table className="w-full">
                <thead>
                    <tr>
                        <td className="border">Name</td>
                        <td className="border">Attempt</td>
                        <td className="border">Earn Points</td>
                        <td className="border">Result</td>
                    </tr>
                </thead>
                <tbody>
                    {results && results?.map((result) => (
                        <tr>
                            <td className="border">{result.userId.name}</td>
                            <td className="border">{result.attempts}</td>
                            <td className="border">{result.earnPoints}</td>
                            <td className="border">{result.isPassed ? "Passed" : "Failed"}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default ResultTable