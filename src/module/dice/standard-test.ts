export const STANDARD_TEST_FORMULA = '1d100';

export type StandardTestResult = {
    formula: string;
    total: number;
    targetNumber: number;
    success: boolean;
    degrees: number;
};

type EvaluateStandardTestOptions = {
    targetNumber: number;
    total: number;
    formula?: string;
};

type PerformStandardTestOptions = {
    targetNumber: number;
    test?: Roll;
    formula?: string;
};

export function buildStandardTest(formula = STANDARD_TEST_FORMULA): Roll {
    return new Roll(formula);
}

export function evaluateStandardTest({
    targetNumber,
    total,
    formula = STANDARD_TEST_FORMULA,
}: EvaluateStandardTestOptions): StandardTestResult {
    const success = total <= targetNumber;

    return {
        formula,
        total,
        targetNumber,
        success,
        degrees: calculateStandardTestDegrees(total, targetNumber, success),
    };
}

export async function performStandardTest({
    targetNumber,
    test,
    formula = STANDARD_TEST_FORMULA,
}: PerformStandardTestOptions): Promise<StandardTestResult> {
    const standardTest = test ?? buildStandardTest(formula);
    await standardTest.evaluate();

    return evaluateStandardTest({
        targetNumber,
        total: Number(standardTest.total ?? 0),
        formula: standardTest.formula,
    });
}

function calculateStandardTestDegrees(
    total: number,
    targetNumber: number,
    success: boolean,
): number {
    if (success) {
        return Math.max(1, Math.floor(total / 10));
    }

    return Math.max(1, Math.floor(total / 10) - Math.floor(targetNumber / 10));
}
