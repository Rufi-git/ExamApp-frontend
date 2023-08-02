export function attempts_Number(result) {
    return result.filter(r => r !== undefined).length
}

export function earnPoints_Number(result, point, queue) {
    const earnedPoints = queue.reduce((totalPoints, question, index) => {
        const selectedAnswerIndex = result[index];
        const selectedVariant = question?.options?.[selectedAnswerIndex]

        if (selectedVariant?.isCorrect === true) {
            return totalPoints + point;
        }

        return totalPoints;
    }, 0);

    return earnedPoints;
}

export function flagResult (totalPoints, earnPoints) {
    return (totalPoints * 50 / 100) < earnPoints
}
