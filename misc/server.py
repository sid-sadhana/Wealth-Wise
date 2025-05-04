from flask import Flask, request, jsonify
from flask_cors import CORS
from pypdf import PdfReader
import google.generativeai as genai
import re
import json
import os
from dotenv import load_dotenv
import pandas as pd
from prophet import Prophet
import torch


app = Flask(__name__)
CORS(app, resources={
    r"/extract": {"origins": "http://localhost:3000"},
    r"/predict": {"origins": "http://localhost:3000"}
}, supports_credentials=True)
load_dotenv()

# Retrieve the API key from environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

def extract_text_from_pdf(file):
    reader = PdfReader(file)
    extracted_text = ""
    for page in reader.pages:
        extracted_text += page.extract_text() or ""
    return extracted_text

def query_gemini(text, query):
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(f"{query}\n\n{text}")
    return response.text

@app.route('/extract', methods=['POST'])
def extract():
    if 'pdf' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    pdf_file = request.files['pdf']
    if pdf_file.filename == '':
        return jsonify({"error": "Empty file uploaded"}), 400

    pdf_text = extract_text_from_pdf(pdf_file)

    user_query = """Extract all stock symbols from the text and return a JSON list. Example: ["AAPL", "MSFT", "TSLA"]"""
    result = query_gemini(pdf_text, user_query)

    try:
        # Attempt to extract list safely
        stock_list = json.loads(re.search(r'\[.*\]', result, re.DOTALL).group())
    except Exception as e:
        print("Parsing error:", e)
        return jsonify({"error": "Could not parse the response"}), 500

    return {"data": stock_list}

@app.route('/predict',methods=["POST"])
def predict():
    data=request.get_json()
    print(data)

    stock_data=pd.read_csv(r"C:\Users\srisi\OneDrive\Desktop\sidxt\showcase\Wealth-Wise\misc\archive\\"+data["stock"]+".csv")

    if data["model"]=="PROPHET":
        stock_data=stock_data[["Date","High"]]
        stock_data = stock_data[["Date", "High"]]
        stock_data = stock_data.rename(columns={"Date": "ds", "High": "y"})
        print(stock_data)
        m = Prophet()
        m.fit(stock_data)
        future = m.make_future_dataframe(periods=365)
        forecast = m.predict(future)
        forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail()
        fig1 = m.plot(forecast)
        fig1.savefig("prophet_forecast.jpg")
    
    elif data["model"]=="LSTM":
        lstm = torch.nn.LSTM(10,20,2)
        input = torch.randn(5, 3, 10)
        h0 = torch.randn(2, 3, 20)
        c0 = torch.randn(2, 3, 20)
        output, (hn, cn) = lstm(input, (h0, c0))
        print(output)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5501)
