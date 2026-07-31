//the pages in the website
const page0btn=document.querySelector("#page0btn");
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
var allpages=document.querySelectorAll(".page");

//hide every page
function hideall(){
	for(let onepage of allpages){
		onepage.style.display="none";
	}
}
//show the page the person clicked on
function show(pgno){
	hideall();
	
	let onepage=document.querySelector("#page"+pgno);
	onepage.style.display="block";
}
page0btn.addEventListener("click", function () {
	show(0);
	reset();
});
page1btn.addEventListener("click", function () {
	show(1);
	reset();
});
page2btn.addEventListener("click", function () {
	show(2);
	reset();
});

hideall();
show(0);

const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector(".menu");

//toggle the menu
hamBtn.addEventListener("click", toggleMenus);

//show the "nav bar"
function toggleMenus() {
	menuItemsList.classList.toggle("menuShow");
}




const VolleyballId = document.getElementById("volleyballID");

//return a random value
function GetRandom(min,max){
	//this will select a number between min and max
	return Math.round(Math.random() * (max - min)) + min;
}

//spins the volleyball
function SpinVolleyball() {
VolleyballId.classList.add("anim1");
}
//stop the volleyball from spinning
function ResetSpin()
{
	VolleyballId.classList.remove("anim1");
}

const StartBtn = document.getElementById("startBtn");
StartBtn.addEventListener("click", StartGame);

const scoreBox=document.getElementById("scoreBox");

var score=0; //to track how many clicks
const volleyballAudio = new Audio("audio/VolleyballHit.mp3");

var OverBall = true;
var timer;
var difficulity = 1000;
//when the player looses run this
function LooseCondition()
{
	//resets the game
	VolleyballId.classList.remove("show");
	VolleyballId.classList.remove("anim1");
	VolleyballId.classList.remove("overnet");
	VolleyballId.style.left = "0px";
	VolleyballId.style.top = "0px";
	StartBtn.textContent = "start game";
	if (typeof spinVolleyballItvId !== "undefined") clearInterval(spinVolleyballItvId);
	if (typeof moveVolleyballItvId !== "undefined") clearInterval(moveVolleyballItvId);
	if (typeof resetspin !== "undefined") clearInterval(resetspin);
	scoreBox.innerHTML = "Game Over! Final Score: " + score;
	score = 0;
	difficulity = 1000;
	OverBall = true;
}
//moves the volleyball to the player side of the court
function MoveVolleyball()
{
	if (OverBall)
	{
		setTimeout(function(){
			VolleyballId.style.left = GetRandom(0, 200) + "px";
			VolleyballId.style.top = GetRandom(100, 200) + "px";
			OverBall = !OverBall;
			
			VolleyballId.classList.remove("overNet");
			setTimeout(function(){
				VolleyballId.classList.add("overNet");
				timer = setTimeout(LooseCondition, difficulity);
				if(difficulity > 300)
				{
					difficulity = difficulity - 50;
				}
			},300);
			
			volleyballAudio.play();
		},500);
	}
}

//move the volleyball to the opponents side of the court
function VolleyballRecieve()
{
	if (!OverBall)
		{
			//increases the score
			score++;
			clearTimeout(timer);
			//updates the score
			scoreBox.innerHTML = "Score: " + score;
			volleyballAudio.play();
			//move the volleyball
			VolleyballId.style.left = GetRandom(0, 200) + "px";
			VolleyballId.style.top = GetRandom(0, 50) + "px";
			
			//make the ball become large
			VolleyballId.classList.remove("overNet");
			OverBall = !OverBall;
			setTimeout(function(){
				//make the volleyball become small
				VolleyballId.classList.add("overNet");
			},300);
		}
}

var spinVolleyballItvId,moveVolleyballItvId ,resetspin;
function StartGame(){
	//shows the volleyball
	VolleyballId.classList.toggle("show");
	if (VolleyballId.classList.contains("show"))
	{
		//updates the score
		scoreBox.innerHTML = "Score: " + score;
		//change the button to a stop button
		StartBtn.textContent = "stop game";
		
		//constantly spin the volleyball
		spinVolleyballItvId = setInterval(SpinVolleyball, 500);
		resetspin = setInterval(ResetSpin, 1500);
		
		//move the volleyball
		moveVolleyballItvId = setInterval(MoveVolleyball, 1000);
	}
	else
	{
		//change the button to a start button
		StartBtn.textContent = "start game";
		
		//makes the volleyball stop spinning and moving
		clearInterval(moveVolleyballItvId);
		clearInterval(spinVolleyballItvId);
		clearInterval(resetspin);
		//reset the ball to its origin
		VolleyballId.style.left = 0 + "px";
		VolleyballId.style.top = 0 + "px";
		
		//make the ball get recieved by the "ai" first
		OverBall = true;
		//reset the score
		score=0;
		//update the score
		scoreBox.innerHTML = "Score: " + score;
	}
}
if (OverBall)
{
	//when the player clicks the volleyball recieve it over the net
	VolleyballId.addEventListener("click",VolleyballRecieve);
}

var court = document.querySelector(".court");
var popup = document.querySelector(".popup");
var details = document.querySelector(".playerroles");

//when the player clicks on the court
court.addEventListener("click", listdetails);

function listdetails(event) {
	//gets the button that the player clicks on
    const player = event.target.closest("button");
	
	//if the player clicked on a button
	if (player)
	{
		//the position the player clicked on is the wing spiker
		if (player.classList.contains("wing")) {
			details.textContent = "wing spiker: their main role have to recieve ,block and spike";
			popup.classList.add("show");
		}
		//the position the player clicked on is the middle
		else if (player.classList.contains("middle")) {
			details.textContent = "middle blocker : their main role is to block the ball at the net when the opponent is spiking and be able to spike the ball from time to time. whenever the middle goes to back court they are switched with the lebero";
			popup.classList.add("show");
		}
		//the position the player clicked on is the setter
		else if (player.classList.contains("setter")) {
			details.textContent = "setter: their main role is to set the ball and allow the attackers to spike the ball";
			popup.classList.add("show");
		}
		//the position the player clicked on is the opposite
		else if (player.classList.contains("opposite")) {
			details.textContent = "opposite hitter : their main role is purely spiking";
			popup.classList.add("show");
		}
		//the position the player clicked on is the libero
		else if (player.classList.contains("libero")) {
			details.textContent = "libero : their main role is to recieve the ball during serve recieve or when the opponent spikes the ball. whenever the lebro goes to front court they are switched with the middle";
			popup.classList.add("show");
		}
	}
}
//if the player clicked on the close button
document.getElementById("closeBtn").addEventListener("click", function () {
	//remove the popup
    popup.classList.remove("show");
});


const submit=document.querySelector("#submit");
submit.addEventListener("click",CheckAns);
const marks=document.querySelector("#marks");

//checks for the answers
function CheckAns(){
	//reset the score to 0
	score=0; 
	
	//go through every qn
	for (let i = 1; i <= 5; i++) {
		//if the player puts something as the answer
		if(document.querySelector("input[name='q" + i + "']:checked"))
		{
			//and the answer is correct
			if(document.querySelector("input[name='q" + i + "']:checked").value=="ans")
			{
				//add 1 score
				score++;
			}
		}
	}
	//checks if the player inputed his/her height
	if (document.querySelector("input[name='q6']"))
	{
		//get the number they inputed
		const height=document.querySelector("input[name='q6']").value;
		
		if (height >= 170 && height <= 272)
		{
			marks.innerHTML=score + "/5 you can become a setter";	
		} 
		else if (height < 170 )
		{
			marks.innerHTML=score + "/5 your too short to become a setter";
		}
		else
		{
			marks.innerHTML=score + "/5 ur lieing about your height";
		}
	}
}

//reset button
function reset()
{
	popup.classList.remove("show");
	marks.innerHTML="not submitted";
	for (let i = 1; i <= 5; i++) {
	  if (document.querySelector("input[name='q" + i + "']:checked"))
	  {
		  document.querySelector("input[name='q" + i + "']:checked").checked=false;
	  }
	}
	if (document.querySelector("input[name='q6']"))
	{
		document.querySelector("input[name='q6']").value="";
	}
	
	VolleyballId.classList.remove("show");
	VolleyballId.classList.remove("anim1");
	VolleyballId.classList.remove("overnet");
	VolleyballId.style.left = "0px";
	VolleyballId.style.top = "0px";
	StartBtn.textContent = "start game";
	if (typeof spinVolleyballItvId !== "undefined") clearInterval(spinVolleyballItvId);
	if (typeof moveVolleyballItvId !== "undefined") clearInterval(moveVolleyballItvId);
	if (typeof resetspin !== "undefined") clearInterval(resetspin);
	scoreBox.innerHTML = "Game Over! Final Score: " + score;
	score = 0;
	difficulity = 1000;
	OverBall = true;
	scoreBox.innerHTML = "Score: " + score;
}