const translateBtn = document.getElementById('translate-button');

translateBtn.addEventListener("click", () => {
    const textArea = document.getElementById('text');
    const formData = new FormData;
    formData.append('text', textArea.value)

    fetch('/send-request', { method : "POST", body: formData})
        .then(res => res.json())
        .then(data => {
            const answer = data.choices[0].text
            $("#answer").text(answer);
        })
})


document.getElementById('speak-left').addEventListener('click', ()=> {
    const text = document.getElementById('text').value
    responsiveVoice.speak(text, "UK English Male", {rate: 1});
})

document.getElementById('speak-right').addEventListener('click', ()=> {
    const text = document.getElementById('answer').innerText
    responsiveVoice.speak(text, "UK English Male", {rate: 1});
})

// 팝오버
document.getElementById('copy-left').addEventListener('click', () => {
    $("#myPopover").fadeIn(500);

    setTimeout(function() {
        $("#myPopover").fadeOut();
        }, 1000);
    // 복사하기 함수 document.getElementById('text').value 내용을 복사
    const tempInput = document.createElement('input');
    tempInput.setAttribute('type', 'text');
    tempInput.setAttribute('value', document.getElementById('text').value);
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    // 복사하기 함수 끝
})
document.getElementById('copy-right').addEventListener('click', () => {
    $("#myPopover").fadeIn(500);

    setTimeout(function() {
        $("#myPopover").fadeOut();
        }, 1000);
    // 복사하기 함수 document.getElementById('text').value 내용을 복사
    const tempInput = document.createElement('input');
    tempInput.setAttribute('type', 'text');
    tempInput.setAttribute('value', $("#answer").text());
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    // 복사하기 함수 끝
})

document.getElementById('cancel-button').addEventListener('click', () => {
    document.getElementById('text').value = ''
    document.getElementById('answer').innerText = ''
})

// 버튼 누르면 언어 바꾸는 기능
document.getElementById('exchange-icon').addEventListener('click', () => {
    document.getElementById('input-language').classList.toggle('move-right')
    document.getElementById('output-language').classList.toggle('move-left')
    setTimeout(() => {
        document.getElementById('input-language').classList.toggle('move-right')
        document.getElementById('output-language').classList.toggle('move-left')
        const leftVal = document.getElementById('input-language').value
        const rightVal = document.getElementById('output-language').value
        document.getElementById('input-language').value = rightVal
        document.getElementById('output-language').value = leftVal
    }, 200);
    const inputText = document.getElementById('text').value;
    let outputText = document.getElementById('answer').innerHTML;
    const tempArr = outputText.split('')
    if (tempArr[0] === "\n" && tempArr[1] === '\n') {
        tempArr.splice(0, 2)
        outputText = String(tempArr).replaceAll(',', '')
    }
    document.getElementById('text').value = outputText;
    document.getElementById('answer').innerHTML = inputText;
    //textarea로 이동하면 /n/n이 붙는데 이걸 없애야 겠다.
    
    
})

//esc 누르면 ㄲ는 기능 플레이 버튼 만들어서 끄게 하기기능 만들자
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      responsiveVoice.cancel();
    }
  });

// 팝오버
document.getElementById('speak-left').addEventListener('click', () => {
    document.getElementById('myPopover-play').classList.toggle('hidden')
   
})
// play
document.getElementById('play').addEventListener('click', () => {
    if(responsiveVoice.isPlaying()) {
        responsiveVoice.resume();
    } else {
        responsiveVoice.speak(document.getElementById('text').value, "UK English Male", {rate: 1});
    }
    
   
})
// stop
document.getElementById('stop').addEventListener('click', () => {
    if(responsiveVoice.isPlaying()) {
        responsiveVoice.pause();
    } else {
        responsiveVoice.resume();
    }
})
// pause
document.getElementById('pause').addEventListener('click', () => {
    responsiveVoice.cancel();
})
// cancel
document.getElementById('cancel').addEventListener('click', () => {
    document.getElementById('myPopover-play').classList.toggle('hidden')
})


 

// 클로저 함수 연습
// function createCounter() {
//     let count = 0;
//     return {
//         increment: function() {
//             console.log(count++)
//         }
//     }
// }