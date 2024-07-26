import textwrap
import os
from IPython.display import display, Markdown
import google.generativeai as genai

def to_markdown(text):
    text = text.replace('•', '  *')
    return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

# Fetch the API key from an environment variable or set it directly
GOOGLE_API_KEY = ""
genai.configure(api_key=GOOGLE_API_KEY)

# Creating the model
model = genai.GenerativeModel('gemini-1.5-flash')

def generate_response(prompt):
    try:
        response = model.generate_content(prompt)
        print("Response received:", response)
        return response
    except Exception as e:
        print("An error occurred while generating content:", str(e))
        return None

def display_response(response):
    if response and 'candidates' in response and response['candidates']:
        content = response['candidates'][0]['content']['parts'][0]['text']
        markdown_response = to_markdown(content)
        display(markdown_response)
    else:
        print("No response content received or 'content' key missing")


def getResponseFromPython(userPrompt):
    response = generate_response(userPrompt)
    return response.text
