/**
 * Bui Cong Vinh
 * 28/10/2025
 */

//Approach 1: Iterative Solution
// Time Complexity: O(n)
// Space Complexity: O(1)
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

//Approach 2: Mathematical Formula (Gauss's formula)
// Time Complexity: O(1)
// Space Complexity: O(1)
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}

//Approach 3: Recursive Solution
// Time Complexity: O(n)
// Space Complexity: O(n)
function sum_to_n_c(n: number): number {
  if (n <= 0) {
    return 0;
  }
  return n + sum_to_n_c(n - 1);
}

//Test cases
console.log("Test case 1: n = 5");
console.log("Approach 1: " + sum_to_n_a(5));
console.log("Approach 2: " + sum_to_n_b(5));
console.log("Approach 3: " + sum_to_n_c(5));

console.log("---------------------");

console.log("Test case 2: n = 10");
console.log("Approach 1: " + sum_to_n_a(10));
console.log("Approach 2: " + sum_to_n_b(10));
console.log("Approach 3: " + sum_to_n_c(10));
