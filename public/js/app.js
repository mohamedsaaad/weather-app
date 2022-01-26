const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    message1.textContent='loading...'
    message2.textContent=''

    fetch('http://localhost:3000/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                console.log(data);
                message1.textContent = data.error
            } else {
                message1.textContent = data.forecast
                message2.textContent = data.location
            }
        })

    })
})