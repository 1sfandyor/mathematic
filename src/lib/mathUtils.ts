import { LEVEL_TERMS } from './constants';

export function generateProblem(level: number): {
  expression: string;
  terms: number[];
  operators: string[];
  answer: number;
} {
  const config = LEVEL_TERMS[level as keyof typeof LEVEL_TERMS] || LEVEL_TERMS[1];
  const numTerms = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
  
  const terms: number[] = [];
  const operators: string[] = [];
  
  // Generate first term (always positive, based on level)
  const maxFirstTerm = Math.min(10 + level * 5, 50);
  terms.push(Math.floor(Math.random() * maxFirstTerm) + 1);
  
  let currentResult = terms[0];
  
  for (let i = 1; i < numTerms; i++) {
    // Randomly choose operator
    const operator = Math.random() > 0.5 ? '+' : '−';
    operators.push(operator);
    
    // Generate term based on current result to avoid negative numbers
    const maxTerm = Math.min(10 + level * 3, 30);
    let term: number;
    
    if (operator === '−') {
      // Make sure we don't go negative
      term = Math.floor(Math.random() * Math.min(currentResult, maxTerm)) + 1;
      currentResult -= term;
    } else {
      term = Math.floor(Math.random() * maxTerm) + 1;
      currentResult += term;
    }
    
    terms.push(term);
  }
  
  // Build expression string
  let expression = String(terms[0]);
  for (let i = 0; i < operators.length; i++) {
    expression += ` ${operators[i]} ${terms[i + 1]}`;
  }
  expression += ' = ?';
  
  return {
    expression,
    terms,
    operators,
    answer: currentResult,
  };
}

export function generateSequentialProblem(level: number): {
  terms: { value: number; operator: string }[];
  answer: number;
} {
  const config = LEVEL_TERMS[level as keyof typeof LEVEL_TERMS] || LEVEL_TERMS[1];
  const numTerms = Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
  
  const terms: { value: number; operator: string }[] = [];
  
  // Start with initial value
  const maxFirstTerm = Math.min(10 + level * 5, 50);
  let currentResult = Math.floor(Math.random() * maxFirstTerm) + 1;
  terms.push({ value: currentResult, operator: '+' });
  
  for (let i = 1; i < numTerms; i++) {
    const operator = Math.random() > 0.5 ? '+' : '−';
    const maxTerm = Math.min(10 + level * 3, 30);
    let term: number;
    
    if (operator === '−') {
      term = Math.floor(Math.random() * Math.min(currentResult, maxTerm)) + 1;
      currentResult -= term;
    } else {
      term = Math.floor(Math.random() * maxTerm) + 1;
      currentResult += term;
    }
    
    terms.push({ value: term, operator });
  }
  
  return { terms, answer: currentResult };
}

export function calculateXP(correct: boolean, combo: number): number {
  if (!correct) return 0;
  const baseXP = 10;
  const comboBonus = Math.min(combo, 10) * 2;
  return baseXP + comboBonus;
}

export function shouldLevelUp(correctAnswers: number, totalQuestions: number): boolean {
  if (totalQuestions < 10) return false;
  return (correctAnswers / totalQuestions) >= 0.7;
}
