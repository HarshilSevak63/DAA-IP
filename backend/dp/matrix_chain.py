class MatrixChainSolver:
    def __init__(self):
        self.steps = []
        self.m = [] # Cost table
        self.s = [] # Split table
        self.p = [] # Dimensions

    def solve(self, p):
        """
        Solves the Matrix Chain Multiplication problem.
        p: list of dimensions, length n+1 where Matrix Ai is p[i-1] x p[i]
        """
        self.p = p
        n = len(p) - 1 # Number of matrices
        self.steps = []
        self.steps.append(f"Input dimensions: {p}")
        self.steps.append(f"Number of matrices n = {n}")

        # Initialize DP tables (1-based indexing for academic clarity)
        # Size is (n+1) x (n+1) so indices 1..n are valid
        # m[i][j] stores minimum cost to multiply Ai...Aj
        # s[i][j] stores the split point k
        
        # Initialize with 0 for base cases and -1/None for others
        self.m = [[0 for _ in range(n + 1)] for _ in range(n + 1)]
        self.s = [[0 for _ in range(n + 1)] for _ in range(n + 1)]
        print("M------------------",self.m)
        print("S------------------",self.s)

        self.steps.append("Initialized m[][] and s[][] tables.")
        
        # m[i][i] = 0 is already done by initialization (cost of chain length 1 is 0)
        for i in range(1, n + 1):
            self.m[i][i] = 0
        print("M------------------",self.m)
        
        # l is chain length
        for l in range(2, n + 1):
            self.steps.append(f"--- Computing for chain length l = {l} ---")
            for i in range(1, n - l + 2):
                j = i + l - 1
                self.m[i][j] = float('inf')
                
                # Try all possible split points k
                # A[i...j] = A[i...k] * A[k+1...j]
                # k goes from i to j-1
                
                step_details = []
                for k in range(i, j):
                    # Cost = cost(left) + cost(right) + cost of combining
                    # Dimensions: A[i..k] is p[i-1] x p[k]
                    #             A[k+1..j] is p[k] x p[j]
                    # Multiplication cost: p[i-1] * p[k] * p[j]
                    
                    q = self.m[i][k] + self.m[k+1][j] + (p[i-1] * p[k] * p[j])
                    
                    step_details.append(f"k={k}: cost={q} ({self.m[i][k]} + {self.m[k+1][j]} + {p[i-1]}*{p[k]}*{p[j]})")
                    
                    if q < self.m[i][j]:
                        self.m[i][j] = q
                        self.s[i][j] = k
                
                best_k = self.s[i][j]
                self.steps.append(f"m[{i}][{j}]: Min cost is {self.m[i][j]} at k={best_k}. Candidates: " + ", ".join(step_details))

        # Reconstruct optimal parenthesization
        optimal_parens = self._get_optimal_parens(1, n)
        self.steps.append(f"Optimal Parenthesization: {optimal_parens}")
        
        # New Step: Generate detailed English explanation of the order
        self.execution_order = []
        self._explain_order(1, n)

        return {
            "minimum_cost": self.m[1][n],
            "optimal_parenthesization": optimal_parens,
            "dp_table": self.m,
            "split_table": self.s,
            "steps": self.steps,
            "n": n,
            "execution_order": self.execution_order
        }

    def _get_optimal_parens(self, i, j):
        """
        Recursively reconstructs the optimal parenthesization string from s table.
        """
        if i == j:
            return f"A{i}"
        else:
            k = self.s[i][j]
            left = self._get_optimal_parens(i, k)
            right = self._get_optimal_parens(k + 1, j)
            return f"({left}{right})"

    def _explain_order(self, i, j):
        # Returns (name_string, rows, cols)
        if i == j:
            # Base matrix: A_i
            # Dimensions are p[i-1] x p[i]
            return f"A{i}", self.p[i-1], self.p[i]
        
        k = self.s[i][j]
        left_name, left_r, left_c = self._explain_order(i, k)
        right_name, right_r, right_c = self._explain_order(k + 1, j)
        
        # Calculate cost for this step
        cost = left_r * left_c * right_c
        
        # Create a detailed step object
        step_num = len(self.execution_order) + 1
        
        # Determine a friendly name for the result
        # If it's the final step (i=1, j=n), it's the Final Result.
        # Otherwise it's Intermediate Result M_step
        if i == 1 and j == len(self.p) - 1:
            result_name = "Final Matrix"
        else:
            result_name = f"Temporary Matrix T{step_num}"

        self.execution_order.append({
            "step": step_num,
            "description": f"Multiply {left_name} by {right_name}",
            "matrix_dims": f"({left_r} \\times {left_c}) \\times ({right_r} \\times {right_c})",
            "calculation": f"{left_r} * {left_c} * {right_c} = {cost}",
            "cost": cost,
            "result_name": result_name,
            "result_dims": f"{left_r}x{right_c}"
        })
        
        return result_name, left_r, right_c

# Example usage for testing when running directly
if __name__ == "__main__":
    solver = MatrixChainSolver()
    # P = [10, 30, 5, 60] -> A1: 10x30, A2: 30x5, A3: 5x60
    # result = solver.solve([10, 30, 5, 60])
    # print(result)
