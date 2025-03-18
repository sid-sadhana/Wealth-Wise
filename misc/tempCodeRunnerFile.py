from flask import Flask, request, jsonify
from pypdf import PdfReader
import google.generativeai as genai
import re
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize Gemini API
genai.configure(api_key="AIzaSyCtIlNUVhbM_NO9ou9b-Zav8Dmjx19o3MU")

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    extracted_text = ""
    for page in reader.pages:
        extracted_text += page.extract_text() or ""
    return extracted_text

# Function to query Gemini API
def query_gemini(text, query):
    model = genai.GenerativeModel("gemini-1.5-pro")
    response = model.generate_content(f"{query}\n\n{text}")
    return response.text

# Flask route for PDF upload and extraction
@app.route('/extract', methods=['POST'])
def extract():
    if 'pdf' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    pdf_file = request.files['pdf']
    if pdf_file.filename == '':
        return jsonify({"error": "Empty file uploaded"}), 400

    pdf_text = extract_text_from_pdf(pdf_file)

    user_query = """Extract structured stock data from the given source and return it in valid JSON format.
    Identify stock symbols and include the following fields for each entry:
    - 'symbol' (stock ticker symbol),
    - 'security' (full company/security name),
    - 'market_value' (current market value),
    - 'balance' (initial balance),
    - 'current_balance' (updated balance),
    - 'value' (corresponding total value).

    Ensure the JSON output is properly formatted, concise, and handles missing values with 'null'. Return only the JSON and no additional text."""

    result = query_gemini(pdf_text, user_query)

    return jsonify({"data": result})

if __name__ == '__main__':
    app.run(debug=True, port=5501)
