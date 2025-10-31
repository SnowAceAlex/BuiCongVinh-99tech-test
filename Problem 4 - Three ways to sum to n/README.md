# Problem 4: Three Ways to Sum to N

This project implements three different approaches to calculate the sum of all integers from 1 to n.

## Problem Description

Given a positive integer `n`, calculate the sum: `1 + 2 + 3 + ... + n`

## Approaches

### 1. Iterative Solution (`sum_to_n_a`)

**Time Complexity:** O(n)  
**Space Complexity:** O(1)

Uses a simple loop to iterate through all numbers from 1 to n and accumulate the sum.

```typescript
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
```

**Pros:**

- Easy to understand
- Constant space complexity
- No risk of stack overflow

**Cons:**

- Linear time complexity
- Slower for large values of n

---

### 2. Mathematical Formula (`sum_to_n_b`)

**Time Complexity:** O(1)  
**Space Complexity:** O(1)

Uses Gauss's formula: `n * (n + 1) / 2`

```typescript
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}
```

**Pros:**

- Constant time complexity (fastest)
- Constant space complexity
- Most efficient for any value of n

**Cons:**

- Requires knowledge of the mathematical formula

---

### 3. Recursive Solution (`sum_to_n_c`)

**Time Complexity:** O(n)  
**Space Complexity:** O(n)

Uses recursion to break down the problem into smaller subproblems.

```typescript
function sum_to_n_c(n: number): number {
  if (n <= 0) {
    return 0;
  }
  return n + sum_to_n_c(n - 1);
}
```

**Pros:**

- Elegant and intuitive recursive approach
- Shows understanding of recursion

**Cons:**

- Linear space complexity due to call stack
- Risk of stack overflow for large values of n
- Slower than mathematical formula

---

## Configuration

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:

   ```bash
   cd "Problem 4 - Three ways to sum to n"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Run Application

### Development Mode

Run the solution with test cases:

```bash
npm start
```

### Output Example

```
Test case 1: n = 5
Approach 1: 15
Approach 2: 15
Approach 3: 15
---------------------
Test case 2: n = 10
Approach 1: 55
Approach 2: 55
Approach 3: 55
```

## Test Cases

The solution includes two test cases:

1. **Test case 1:** n = 5

   - Expected result: 15
   - Calculation: 1 + 2 + 3 + 4 + 5 = 15

2. **Test case 2:** n = 10
   - Expected result: 55
   - Calculation: 1 + 2 + 3 + ... + 10 = 55

## How to Test

### Manual Testing

You can modify the test cases in `Solution.ts`:

```typescript
// Add your own test case
console.log("Test case 3: n = 100");
console.log("Approach 1: " + sum_to_n_a(100));
console.log("Approach 2: " + sum_to_n_b(100));
console.log("Approach 3: " + sum_to_n_c(100));
```

### Testing with Different Values

1. Open `Solution.ts`
2. Add or modify test cases at the bottom
3. Run: `npm start`

## Performance Comparison

| Approach     | Time Complexity | Space Complexity | Best For                        |
| ------------ | --------------- | ---------------- | ------------------------------- |
| Iterative    | O(n)            | O(1)             | General use, easy to understand |
| Mathematical | O(1)            | O(1)             | **Production code, large n**    |
| Recursive    | O(n)            | O(n)             | Learning recursion concepts     |

## Mathematical Formula Explanation

The formula `n * (n + 1) / 2` is derived from Gauss's method:

If we pair the numbers:

- First + Last: 1 + n = (n + 1)
- Second + Second Last: 2 + (n-1) = (n + 1)
- Third + Third Last: 3 + (n-2) = (n + 1)
- ...

We have `n/2` pairs, each summing to `(n + 1)`

Therefore: `Sum = (n/2) * (n + 1) = n * (n + 1) / 2`

## Project Structure

```
Problem 4 - Three ways to sum to n/
├── Solution.ts           # Three implementation approaches
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

---

## Author

Bui Cong Vinh  
Completed: 28/10/2025
