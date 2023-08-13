export function attempts_Number(result) {
    return result.filter(r => r !== -1).length
}

export function earnPoints_Number(result, point, queue) {
    const earnedPoints = queue.reduce((totalPoints, question, index) => {
        const selectedAnswerIndex = result[index];
        const selectedVariant = question?.options?.[selectedAnswerIndex]

        if (selectedVariant?.isCorrect === true) {
            return totalPoints + point / queue.length;
        }

        return totalPoints;
    }, 0);

    return earnedPoints;
}

export function flagResult(totalPoints, earnPoints) {
    return totalPoints <= earnPoints
}
