console.log('App.js successfully loaded.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const displayOne = document.querySelector('#displayOne')
const displayTwo = document.querySelector('#displayTwo')

weatherForm.addEventListener('submit', function (event)
{
    event.preventDefault()

    const location = search.value

    if (!location)
    {
        console.log('Search form is empty, please try again.')
    }

    else
    {
        displayTwo.textContent = 'Loading...'

        fetch('http://localhost:3000/weather?address=' + location, { headers: { 'Access-Control-Allow-Origin': '*' } }).then(function (response) 
        {
            response.json().then(function (data) 
            {
                displayTwo.textContent = ''

                if (data.error) 
                {
                    console.log(data.error)
                    displayTwo.textContent = data.error
                }

                else 
                {
                    console.log(data.location)
                    console.log(data.summary)
                    console.log(data.address)

                    displayOne.textContent = data.location
                    displayTwo.textContent = data.summary
                }
            })
        })
    }
})
