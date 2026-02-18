from flask import Flask, request, jsonify
from flask_cors import CORS
from dp.matrix_chain import MatrixChainSolver
import sys

app = Flask(__name__)
CORS(app) # Enable Cross-Origin Resource Sharing for frontend

@app.route('/matrix-chain', methods=['POST'])
def compute_matrix_chain():
    try:
        data = request.get_json()
        if not data or 'dimensions' not in data:
            return jsonify({"error": "Invalid input. 'dimensions' list is required."}), 400
        
        dimensions = data['dimensions']
        
        # Validation
        if not isinstance(dimensions, list) or len(dimensions) < 2:
            return jsonify({"error": "Dimensions must be a list of at least 2 integers."}), 400
            
        solver = MatrixChainSolver()
        result = solver.solve(dimensions)
        
        return jsonify(result)

    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "Backend is running", "service": "Matrix Chain Multiplication DP"})

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, port=5001)
