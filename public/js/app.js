// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
// messageOne.textContent =  ''
// class querySelector('.classname')
// pass in string name of event to listen for, then callback function
// e is event, 
weatherForm.addEventListener('submit', (e)=> {
    // prevent browser to refresh
    e.preventDefault()

    const location = search.value;
    const address = '/weather?address=' + location;

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''
    fetch(address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = location;
                messageTwo.textContent = data.forecast;
            }
        })
    })

    console.log(location);
})