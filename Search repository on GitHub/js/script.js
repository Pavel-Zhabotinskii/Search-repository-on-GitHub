const formEl = document.forms[0]
const input = formEl.elements[0]
const container = document.querySelector('.container')

formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const inputsValue =  input.value 
    const queryString = 'q=' + encodeURIComponent(inputsValue);
    const response = await fetch(`https://api.github.com/search/repositories?${queryString}`)
  
    if (response.ok) {
        const data = await response.json();
        if(!data.items.length){
            clearContainer()
            formEl.insertAdjacentHTML('beforeend', "<p class='p'>Ничего не найдено</p>")
            input.value = '';
            return
        }
        clearContainer()
        for(let i = 0; i <= 10; i++){
            createProfile(data, i)
        }
        input.value = '';
    } else {
        clearContainer()
        formEl.insertAdjacentHTML('beforeend', "<p class='error'>Ошибка: недостаточно данных...</p>")
    }
})

function createProfile(data, i){
    const elem = `<div class="box__item">
                    <p>Репозиторий: <span><a href="${data.items[i].html_url}" target="_blank">${data.items[i].name}</a></span></p>
                    <p>Автор: <span>${data.items[i].owner.login}</span></p>
                    <p>Ссылка на профиль автора: <span><a href="${data.items[i].owner.html_url}" target="_blank">${data.items[i].owner.html_url}</a></span></p>
                    <p>Язык: <span>${data.items[i].language}</span></p>
                    <p>Звезд: <span>${data.items[i].watchers}</span></p>
                </div>
                `
    container.insertAdjacentHTML('beforeend', elem)
}

function clearContainer(){
    container.classList.remove('init__center')
    const arrBox = document.querySelectorAll('.box__item')
    arrBox.forEach(el => {
        el.remove()
    })
    const error = container.querySelector('.error')
    if(error) return error.remove()

    const notFound = container.querySelector('.p')
    if(notFound) return notFound.remove()
}