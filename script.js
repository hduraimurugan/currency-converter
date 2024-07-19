let select = document.querySelectorAll('.currency')
let btn = document.getElementById('btn')
let btnReset = document.getElementById('btn-reset')
let input = document.getElementById('input')
let error = document.querySelector('.error')
let result = document.getElementById('result')

fetch('https://api.frankfurter.app/currencies')
  .then(res => res.json())
  .then(res => displayDropDown(res))

function displayDropDown(res) {
  let curr = Object.entries(res)
  for (let i = 0; i < curr.length; i++) {
    let opt = `<option value="${curr[i][0]}">${curr[i][0]}</option>`
    select[0].innerHTML += opt
    select[1].innerHTML += opt
  }
}

btn.addEventListener('click', () => {
  error.classList.remove('show')
  let curr1 = select[0].value
  let curr2 = select[1].value
  let inputVal = input.value
  let resVal = result.value
  if (curr1 === curr2) {
    error.classList.add('show')
    error.innerText = '⚠️Kindly Choose different currencies and try again...'
  }

  if (inputVal == "" && resVal == "") {
    error.classList.add('show')
    error.innerText = '⚠️Please enter data to calculate...'
  }
  else if (!inputVal == "" && !resVal == "") {
    error.classList.add('show')
    error.innerText = '⚠️Kindly enter data in any one box only, Reset and try again...'
  }
  else if (resVal == "")
    convert(curr1, curr2, inputVal)

  else if (inputVal == "")
    convertt(curr2, curr1, resVal)
});

btnReset.addEventListener('click', () => {
  result.value = "";
  input.value = "";
  error.classList.remove('show')
})

function convert(curr1, curr2, inputVal) {
  fetch(`https://api.frankfurter.app/latest?amount=${inputVal}&from=${curr1}&to=${curr2}`)
    .then(resp => resp.json())
    .then((data) => {
      result.value = Object.values(data.rates)[0]
    });

}

function convertt(curr1, curr2, inputVal) {
  fetch(`https://api.frankfurter.app/latest?amount=${inputVal}&from=${curr1}&to=${curr2}`)
    .then(resp => resp.json())
    .then((data) => {
      input.value = Object.values(data.rates)[0]
    });

}