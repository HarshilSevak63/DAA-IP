# Matrix Chain Multiplication - DAA Project

## Project Description
This project implements the **Matrix Chain Multiplication (MCM)** algorithm using **Dynamic Programming**. It determines the most efficient way to multiply a given sequence of matrices. The problem is not to perform the multiplications, but to decide the order in which to perform them (parenthesization) to minimize the number of scalar multiplications.

This is a specific requirements-based Academic Project for the subject **Design and Analysis of Algorithms (DAA)**.

## Problem Definition
Given a sequence of matrices $A_1, A_2, \dots, A_n$, where the dimension of matrix $A_i$ is $P[i-1] \times P[i]$, the goal is to find the parenthesization that minimizes the total number of scalar multiplications.

**Input:** Array $P$ of dimensions.
**Output:** Minimum multiplication cost and the Optimal Parenthesization string.

## Why Dynamic Programming?
Matrix multiplication is associative, meaning $(AB)C = A(BC)$. However, the cost (number of scalar multiplications) depends heavily on the order.
A naive approach would check all possible parenthesizations, which follows the Catalan number sequence $\Omega(4^n/n^{3/2})$. This is exponential time complexity.

**Dynamic Programming** is used because the problem exhibits:
1.  **Optimal Substructure:** The optimal solution to the problem contains within it optimal solutions to subproblems.
2.  **Overlapping Subproblems:** The recursive solution recomputes the same subproblems repeatedly.

By using a table to memoize results (Bottom-Up approach), we reduce the complexity from Exponential to Cubic.

## Technical Explanation

### DP Cost Table (`m[][]`)
- `m[i][j]` stores the minimum number of scalar multiplications needed to compute the matrix product $A_i \dots A_j$.
- **Base Case:** `m[i][i] = 0` (Chain length 1 requires 0 multiplications).
- **Recurrence:**
  $$ m[i][j] = \min_{i \le k < j} \{ m[i][k] + m[k+1][j] + P[i-1] \times P[k] \times P[j] \} $$

### Split Table (`s[][]`)
- `s[i][j]` stores the index $k$ at which the optimal split occurs for the subchain $A_i \dots A_j$.
- This table is used to reconstruct the solution.

### Parenthesis Reconstruction
The optimal solution is reconstructed recursively using the `s[][]` table:
- If $i == j$, print $A_i$.
- Else, print `(` + Recurse($i, s[i][j]$) + Recurse($s[i][j]+1, j$) + `)`.

## Dry Run Example
**Input:** $P = [10, 30, 5, 60]$
Matrices: $A_1(10\times30)$, $A_2(30\times5)$, $A_3(5\times60)$

1.  **Length 2:**
    - `m[1][2]`: $A_1A_2$. Cost: $10 \times 30 \times 5 = 1500$.
    - `m[2][3]`: $A_2A_3$. Cost: $30 \times 5 \times 60 = 9000$.

2.  **Length 3:**
    - `m[1][3]`: $A_1 \dots A_3$.
      - $k=1$: $(A_1)(A_2A_3) \to 0 + 9000 + (10 \times 30 \times 60) = 27000$
      - $k=2$: $(A_1A_2)(A_3) \to 1500 + 0 + (10 \times 5 \times 60) = 1500 + 3000 = 4500$
    - Min Cost: **4500**. Optimal split $k=2$.

**Result:** Cost 4500, Order $((A_1A_2)A_3)$.

## Algorithm Complexity

### Time Complexity: $O(n^3)$
- We compute entries for $m[i][j]$ for all $1 \le i < j \le n$.
- There are $O(n^2)$ entries.
- Each entry takes $O(n)$ time to find the optimal $k$.
- Total: $O(n^3)$.

### Space Complexity: $O(n^2)$
- We store two tables `m[][]` and `s[][]` of size $(n+1) \times (n+1)$.

## Setup Instructions

### Prerequisites
- Python 3.x
- Node.js & npm (for frontend)

### 1. Backend Setup
Navigate to the `backend` folder:
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate   # On Windows
# source venv/bin/activate # On Mac/Linux
pip install -r requirements.txt
python app.py
```
The server will start at `http://localhost:5001`.

### 2. Frontend Setup
Navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
Open the URL shown (usually `http://localhost:5173`) in your browser.
