let question = document.querySelector(".question")
let answer = document.querySelectorAll(".answer")
let start_button = document.querySelector(".start_button")
let start = document.querySelector(".start")
let title = document.querySelector(".title")
let block = document.querySelector(".block")

let cookie = false 
let cookies = document.cookie.split(";")
let record = 0

for (let i=0; i < cookies.length; i++){
    if (cookies[i].split("=")[0] == "numbers_high_score"){
        cookie = cookies[i].split("=")[1]
    }
    if (cookies[i].split("=")[0] == "record"){
        record = cookies[i].split("=")[1]
        break
    }

}
if (cookie) {
    let data = cookie.split("/")
    title.innerHTML = `<h3>Минулого разу ви дали ${data[0]} правильних відповідей (${data[1]});
        Точність: ${Math.round(100 * data[0] / data[1])}% 
        Рекорд ${record}</h3>`

} 

class Question {
    constructor(){
        this.a = this.randint(1,30)
        this.b = this.randint(1,30)
        this.signs = ["+", "-", "*", "/"]
        this.current_sign = this.get_random_sign()

        this.question = `${this.a} ${this.current_sign} ${this.b}`
        this.correct_answer = this.choose_do()
        this.answers = [
            this.correct_answer,
        ]
        this.answers = [this.correct_answer];

        while (this.answers.length < 5) {
            let randVal = this.randint(this.correct_answer - 5, this.correct_answer - 1);
            if (!this.answers.includes(randVal)) {
                this.answers.push(randVal);
            }
        }
        

        this.shuffle(this.answers)
        console.log(this.answers);
        }
        
    display(){
        question.innerHTML = this.question
        for (let i=0; i < this.answers.length; i++){
            answer[i].innerHTML = this.answers[i]
        }
    }

    randint(min, max){
        return Math.round(Math.random()*(max-min)+min)
    }
    get_random_sign(){
        return this.signs[this.randint(0,3)]
    }
    choose_do(){
        if (this.current_sign == "+"){
            return (this.a + this.b)
        }
        else if (this.current_sign == "-"){
            return (this.a - this.b)
        }
        else if (this.current_sign == "*"){
            return (this.a * this.b)
        }
        else if (this.current_sign == "/"){
            return (this.a / this.b)
        }
    }
    shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
        let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
        [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
    } 
}
}

let correct_answers_given
let question_counter
let correct_answer
let current_question




start_button.addEventListener("click", function(){
    start.style.display = "none"
    block.style.display = "flex"
    current_question = new Question
    current_question.display()
    question_counter = 0
    correct_answers_given = 0

    setTimeout(function(){
        let new_record = correct_answers_given - (question_counter - correct_answers_given)
        let new_cookie = `numbers_high_score=${correct_answers_given}/${question_counter}; max-age = 1000000000000000000`
        document.cookie = new_cookie
        if (new_record>record){
            record = new_record
            let new_cookie2 = `record=${record}; max-age = 1000000000000000000**1000000000000000000`
            document.cookie = new_cookie2
        }
        
        start.style.display = "flex"
        block.style.display = "none"
        title.innerHTML = `<h3>Ви дали ${correct_answers_given} правильних відповідей (${question_counter});
        Точність: ${Math.round(100 * correct_answers_given / question_counter)}% 
        Рекорд ${record}</h3>`
    }, 1000*30)
})




for(let i = 0; i < answer.length; i++){ 
    answer[i].addEventListener("click", function(){ 
        if(answer[i].innerHTML == current_question.correct_answer){ 
            correct_answers_given += 1 
            anime({ 
                targets: answer[i], 
                backgroundColor: ["rgb(0, 255, 0)" ,"#ffffff"], 
                easing: 'easeOutQuad', 
                duration:600 
            }) 
        }else{ 
            anime({ 
                targets: answer[i], 
                backgroundColor: ["rgb(255, 0, 0)" ,"#ffffff"], 
                easing: 'easeOutQuad', 
                duration:600 
            }) 
        }
        
        question_counter += 1 
        current_question = new Question 
        current_question.display() 
    }) 
}
