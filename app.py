import os
import openai
from flask import Flask, render_template, request, jsonify

openai.organization = "org-ZO23te7GIhOq1gFO5bPfZpMy"
openai.api_key = ""


app = Flask(__name__, static_folder='static')


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/get-help")
def get_help():
    message = openai.Model.list()
    return openai.Model.list()

#변수명에 language value를 줘서 여기에서 
# prompt= s"Translate following sentence into {French}" 같이 만들기
# language 바꾸면 서로 text value 써져있던것 또한 바꾸기
# 유저 캐시 관련해서 사전 저장하는 것 생각해보기
@app.route("/send-request", methods=["GET", "POST"])
def send_request():
    text = request.form.get("text")
    inputLang = request.form.get("inputLang")
    outputLang = request.form.get("outputLang")
    # 걸리는 시간 구하기
    start_time = time.time()

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt= f"Translate following sentence in {inputLang} to {outputLang} text to translate: {text}",
        max_tokens=128,
        temperature=0
    )
    end_time = time.time()
    elapsed_time = end_time - start_time
    
    return jsonify(response.to_dict())


# @app.route('/get-answer')
# def get_answer():


if __name__ == "__main__":
    app.run("0.0.0.0", port=5001, debug=True)
