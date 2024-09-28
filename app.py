from flask import Flask, render_template, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = Flask(__name__)

# Carregar modelo e tokenizer
model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    input_ids = tokenizer.encode(user_input, return_tensors='pt')

    with torch.no_grad():
        output = model.generate(input_ids, max_length=50, num_return_sequences=1)
    
    response_text = tokenizer.decode(output[0], skip_special_tokens=True)
    return jsonify({'response': response_text})

if __name__ == '__main__':
    app.run(debug=True)
