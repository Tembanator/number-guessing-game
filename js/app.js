// get elements
const submit_btn = document.getElementById('submit-btn')
const guess = document.getElementById('number-input')
const error_msg = document.querySelector('.error-msg p')
let random_numbers = []
let correct = ''



let win_panel = document.querySelector('#game-verdict-area .won')
let loss_panel = document.querySelector('#game-verdict-area .lost')
let box_area = document.querySelector('#box-area')
let boxes = document.querySelectorAll('.box .number')
let play_again_btns = document.querySelectorAll('.play-again')
let interaction_area = document.querySelector('.interaction-area')

let attempted_numbers = 0
let guessed_accumulative = []
let heat_of_guess = document.querySelector('#high-or-low p')
let attempts = document.querySelector('#attempts p .value')
let guessed_list = document.querySelector('#guessed-list p .value')
let complete_list = ''

function changeColor() {
    const input = document.getElementById("number-input")
    input.style.color = "#6441A5"
    input.value = ''
}

// return 4 random numbers
function random_numbers_list(count) {
    random_numbers = []
    while (random_numbers.length < count) {
        let x = random_number(1, 10)
        if (!random_numbers.includes(x)) {
            random_numbers.push(x)
        } else {
            x = random_number(1, 10)
        }
    }
}

// create the boxex using random numbers
function create_boxes() {
    random_numbers_list(4)
    console.log(random_numbers)
    correct = random_numbers[3]
    guess.focus()

    boxes.forEach((box, index) => {
        if (box.getAttribute('id') != 'four') {
            box.innerHTML = random_numbers[index]
        }
    })
    attempts.innerHTML = '0'
}

// reset input field
function reset_input_field() {
    error_msg.classList.remove('d-none')
   
    guess.focus()
}

// return random number from min to max
function random_number(min, max) {
    return Math.floor((Math.random() * max) + min);
}


function validateGuess() {

    var guess_value = parseInt(guess.value)

    console.log(guess_value)

    if (guess.value != '') {
        // make sure its numerical
        if (isNaN(guess.value)) {
            error_msg.innerHTML = 'Please enter a valid number'
            reset_input_field()
        } else {
            // make sure its a whole number
            if (guess.value.indexOf('.') == -1 || guess.value.indexOf('.') == -1) {
                if (guess_value < 1 || guess_value > 10) {
                    error_msg.innerHTML = 'Please enter a number from 1 to 10'
                    reset_input_field()
                } else {
                    error_msg.classList.add('d-none')
                    // for correct guess
                    if (guess_value == correct) {
                        // reveal won panel panel and hide box area
                        win_panel.classList.remove('d-none')
                        box_area.classList.add('d-none')
                        interaction_area.classList.add('d-none')
                        guessed_accumulative = []
                        guessed_list.innerHTML = ''
                        complete_list = ''
                        play_again_btns.forEach(play_again_btn => {
                            play_again_btn.addEventListener('click', (event) => {
                                event.preventDefault()
                                create_boxes()
                                // reveal box area and hide verict panal
                                win_panel.classList.add('d-none')
                                box_area.classList.remove('d-none')
                                interaction_area.classList.remove('d-none')
                                guess.focus()
                            })
                        })
                    } else {

                        heat_of_guess
                        guessed_accumulative.push(guess_value)
                        attempts.innerHTML = guessed_accumulative.length

                        guessed_list.innerHTML = guessed_accumulative.join(", ")

                        if (guessed_accumulative.length > 4) {
                            // reveal lost panel panel and hide box area
                            loss_panel.classList.remove('d-none')
                            box_area.classList.add('d-none')
                            interaction_area.classList.add('d-none')
                            guessed_accumulative = []
                            guessed_list.innerHTML = ''
                            complete_list = ''
                            play_again_btns.forEach(play_again_btn => {
                                play_again_btn.addEventListener('click', () => {
                                    create_boxes()
                                    // reveal box area and hide verict panal
                                    loss_panel.classList.add('d-none')
                                    box_area.classList.remove('d-none')
                                    interaction_area.classList.remove('d-none')
                                    guess.focus()
                                })
                            })
                        }
                    }
                }
            } else {
                error_msg.innerHTML = 'Please enter a whole number'
                reset_input_field()
            }
        }
    } else {
        error_msg.innerHTML = 'Please do not leave empty'
        reset_input_field()
    }
}

submit_btn.addEventListener('click', (event) => {
    event.preventDefault()
    validateGuess()
})