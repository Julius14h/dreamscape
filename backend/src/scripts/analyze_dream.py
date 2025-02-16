# -*- coding: utf-8 -*-
"""DreamScape.ipynb"""

import sys
import argparse
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import json
import os
import google.generativeai as genai

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')

nltk.data.path.append("/usr/local/nltk_data")

stop_words = set(stopwords.words("english"))

def preprocess(text):
    tokens = word_tokenize(text.lower())
    tokens = [word for word in tokens if word.isalpha()]
    custom_stopwords = {"dream", "something", "like", "back", "felt"}
    stop_words.update(custom_stopwords)
    tokens = [word for word in tokens if word not in stop_words]
    return " ".join(tokens)

parser = argparse.ArgumentParser()
parser.add_argument(
    "--text",
    type=str,
    required=True,
    help="The text to process",
)

API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise ValueError("API key not found. Set it as an environment variable.")

genai.configure(api_key=API_KEY)
llm_model = genai.GenerativeModel("gemini-pro")

def get_mind_interpretations(text, model=llm_model):
    words = preprocess(text)
    prompt = f"""
    Here is a dream that has been processed using NLP: {words}. Can you provide an interpretation of this dream that
    is focused on the mind and emotions? Do not format and just give plain text. Do not exceed 50 words in your
    response.
    """
    response = model.generate_content(prompt)
    return response.text

def get_spirit_interpretations(text, model=llm_model):
    words = preprocess(text)
    prompt = f"""
    Here is a dream that has been processed using NLP: {words}. Can you provide an interpretation of this dream that
    is focused on the spirit aspect? Do not format and just give plain text. Do not exceed 50 words in your
    response.
    """
    response = model.generate_content(prompt)
    return response.text

def get_action_interpretations(text, model=llm_model):
    words = preprocess(text)
    prompt = f"""
    Here is a dream that has been processed using NLP: {words}. Can you provide a task or an action to do to help with this dream
    or that relates to this dream? Do not format and just give plain text. Do not exceed 50 words in your
    response.
    """
    response = model.generate_content(prompt)
    return response.text

def analyze_dream(text):
    result = {}
    result["mind"] = get_mind_interpretations(text)
    result["spirit"] = get_spirit_interpretations(text)
    result["action"] = get_action_interpretations(text)
    return result

dream_text = sys.argv[1]
result = analyze_dream(dream_text)

print(json.dumps(result))
