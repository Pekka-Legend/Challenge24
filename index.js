var numButtons = [document.getElementById("num1"), document.getElementById("num2"), document.getElementById("num3"), document.getElementById("num4")]

var opButtons = [document.getElementById("+"), document.getElementById("-"), document.getElementById("*"), document.getElementById("/")]

var reset = document.getElementById("R")

var streakText = document.getElementById("streak")


var num1 = null
var num2 = null
var op = null

b1 = null
nums = 1

var streak = 0

numbers = [2, 3, 4, 4]




function resetBoard()
{
    for (var i = 0; i < 4; i++)
    {
        numButtons[i].innerText = String(numbers[i])
    }
    nums = 1
    num1 = null
    num2 = null
    op = null
    b1 = null
}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function createBoard()
{
    type = Math.floor(Math.random() * 2) + 1
    
    if (type == 1)
    {
        numbers[0] = 24 / (Math.floor(Math.random() * 4) + 1)
        numbers[1] = 24 / numbers[0] - Math.floor(Math.random() * numbers[0]) + 1
        numbers[2] = 24 / numbers[0] - numbers[1]
        numbers[3] = 1
    }
    if (type == 2)
    {
        numbers[0] = 24 - ((Math.floor(Math.random() * 4)) + 1) * 2
        numbers[1] = (24 - numbers[0]) / 2
        numbers[2] = Math.floor(Math.random() * 7)
        numbers[3] = numbers[2] - 2
    }
    if (type == 3)
    {
        numbers[0] = 24 + ((Math.floor(Math.random() * 4)) + 1) * 2
        numbers[1] = (24 - numbers[0]) / 2
        numbers[2] = -Math.floor(Math.random() * 7)
        numbers[3] = numbers[2] + 2
    }

    



    numbers = shuffle(numbers)
    numbers = shuffle(numbers)
    numbers = shuffle(numbers)
    resetBoard()
}
createBoard()

reset.onclick = function(e)
{
    resetBoard()
}

function numButtonClicked(b, buttons){
    
    b.onclick = function(e)
    {
        if (op == null)
        {
            num1 = parseFloat(b.innerText)
            b1 = b
        }
        else {
            if (b.innerText != "_")
            {
                num2 = parseFloat(b.innerText)
                if (op == "+")
                {
                    b.innerText = String(num1 + num2)
                }
                if (op == "-")
                {
                    b.innerText = String(num1 - num2)
                }
                if (op == "*")
                {
                    b.innerText = String(num1 * num2)
                }
                if (op == "/")
                {
                    b.innerText = String(num1 / num2)
                }
                
                buttons.forEach(button =>{
                    if (button.id == b1.id)
                    {
                        button.innerText = "_"
                    }
                })
                op = null
                num1 = null
                num2 = null
                nums += 1
                if (nums == 4)
                {
                    if (parseFloat(b.innerText) == 24)
                    {
                        streak += 1
                        createBoard()
                    }
                    else {
                        streak = 0
                        resetBoard()
                    }
                }
                
            }
            else {
                op = null
                num1 = null
                num2 = null
            }
            
            
        }
    }
}

function opButtonClicked(b)
{
    b.onclick = function(e)
    {
        op = b.innerText
    }
}


function run()
{
    requestAnimationFrame(run)
    
    numButtons.forEach(button => {
        numButtonClicked(button, numButtons)
    })
    opButtons.forEach(button =>
    {
        opButtonClicked(button)
    })

    streakText.innerText = "Streak: " + String(streak)

}
run()
