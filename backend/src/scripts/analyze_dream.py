# -*- coding: utf-8 -*-
import sys
import argparse
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import json
import os
import google.generativeai as genai

nltk.download('punkt', quiet=True)
nltk.download('punkt_tab', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)
nltk.download('omw-1.4', quiet=True)

stop_words = set(stopwords.words("english"))

def preprocess(text):
    tokens = word_tokenize(text.lower())
    tokens = [word for word in tokens if word.isalpha() or "'" in word]
    custom_stopwords = {"dream", "dreamed", "something", "like", "back", "felt"}
    stop_words.update(custom_stopwords)
    tokens = [word for word in tokens if word not in stop_words]
    return " ".join(tokens)

parser = argparse.ArgumentParser()
parser.add_argument("--text", type=str, required=True, help="The text to process")
args = parser.parse_args()

API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise ValueError("API key not found. Set it as an environment variable.")

genai.configure(api_key=API_KEY)
llm_model = genai.GenerativeModel("gemini-2.0-flash")

def get_mind_interpretations(text, model=llm_model):
    words = preprocess(text)
    prompt = f"Here is a dream processed using NLP: {words}. Provide a mind and emotions interpretation (plain text, max 50 words)."
    response = model.generate_content(prompt)
    return response.text

def get_spirit_interpretations(text, model=llm_model):
    words = preprocess(text)
    prompt = f"Here is a dream processed using NLP: {words}. Provide a spirit interpretation (plain text, max 50 words)."
    response = model.generate_content(prompt)
    return response.text

def get_action_interpretations(text, model=llm_model):
    words = preprocess(text)
    prompt = f"Here is a dream processed using NLP: {words}. Provide an action related to this dream (plain text, max 50 words)."
    response = model.generate_content(prompt)
    return response.text

def analyze_dream(text):
    return {
        "mind": get_mind_interpretations(text),
        "spirit": get_spirit_interpretations(text),
        "action": get_action_interpretations(text)
    }

result = analyze_dream(args.text)
print(json.dumps(result))