const buttonAutoStart = document.querySelectorAll('.autoStartAndInterval__button')

buttonAutoStart.forEach((buttonAutoStart) => {
  buttonAutoStart.addEventListener('click', turnOnButton)
})

function turnOnButton(t) {
  t.target.classList.toggle('--buttonActive')
}
