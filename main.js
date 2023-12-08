const questions = [
	{
		question: "What is your fav language in programming?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "What does CSS mean?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "What does HTML mean?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "when JavaScript was invented?",
		answers: ["1996", "1995", "1994", "all options are correct"],
		correct: 2,
	},
];
let score = 0;
let questionIndex = 0;

const listContainer = document.querySelector('#list');
const headerContainer = document.querySelector('#header');
const submitBtn = document.querySelector('#submit');


headerContainer.innerHTML = '';
listContainer.innerHTML = '';
 clearPage();
 showQuestion();
 submitBtn.onclick = checkAnswer;


function clearPage(){
	headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestion(){
     
	 const headerTemplate = `<h2 class="title">%title%</h2>`;
	 const title = headerTemplate.replace('%title%',questions[questionIndex]['question'])
      
	 headerContainer.innerHTML = title;
     let answerNumber = 0;
	 for(item of questions[questionIndex]['answers']){
         
		const questionTemplate =
		 `<li>
		    <label>
			   <input type="radio" input="%number%" class="answer" name="answer" />
			  <span>%answer%</span>
		    </label>
	     </li>`;

		 const answerHTML = questionTemplate.replace('%answer%',item)
		                                  .replace('%number%',answerNumber)
		 listContainer.innerHTML += answerHTML;
		 answerNumber++;


	 }
}


function checkAnswer(){

	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	if(!checkedRadio){
		submitBtn.blur();
		return
	}
 
	const userAnswer = parseInt(checkedRadio.value);

// if it was the coorect answer

if(userAnswer === questions[questionIndex]['correct']){
	score++
}

// cheking if it was the last question

 if(questionIndex !== questions.length -1){
       questionIndex++;
	   clearPage();
	   showQuestion();
  } else {
       clearPage();
	   showResults();
   }
}


function showResults(){

  const resultsTemplate =
      `<h2 class="title">%title%</h2>
       <h3 class="summary">%message%</h3>
       <p class="result">%result%</p>`;


	   let title,message;

	if(score = questions.length){
		title = 'Congrats!';
		message = 'You have compleated all questions!'
	} else if ((score*100)/questions.length >= 50) {
        title = 'Not bad!';
		message = 'You have compleated half of the questions!'
	} else {
		'Ooops, try again!'
	}
  
	let result = `${score} of ${questions.length}`;

	const finalMessage = resultsTemplate.replace('%title%', title)
	                                    .replace('%message%', message)
										.replace('%result%', result)


  headerContainer.innerHTML = finalMessage;
  
  submitBtn.blur();
  submitBtn.innerHTML = 'Start again';
  submitBtn.onclick = () =>history.go();
} 
