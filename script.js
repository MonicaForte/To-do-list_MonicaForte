const localStorageKey = 'Morning-routine-mf'

function validateNovoItem() //validação do item e conferência 
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-novo-item').value
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

//validação
function NovoItem(){
    let input = document.getElementById('input-novo-item')
    input.style.border = ''

    //validação
    if(!input.value)
    {
        input.style.border = '1px solid red'
        alert('Digite algo pra inserir em sua Morning Routine')
    }
    else if(validateNovoItem())
    {
        alert('Já existe um item com esta descrição')
    }
    
    else
    {
        //increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

function showValues() //Função para mostar os itens da lista na tela do usuário
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('morning-routine')
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++)
    {
        list.innerHTML += `<li>${values[i] ['name']}<button id='btn-ok' onclick='removeItem("${values[i] ['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
      </svg></button></li>`
    }
}

function removeItem(data) //função para remoção dos itens conforme conclusão de cada item da rotina
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
}

showValues()