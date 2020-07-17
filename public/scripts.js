const currentPage = location.pathname

const menuItems = document.querySelectorAll("header .links a")

for(item of menuItems){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}


//Paginação

//totalPages = 20
//selectedPage = 15


function paginate(selectedPage, totalPages){
    let pages = [],
        odlPage


    for(let currentPage = 1; currentPage <= totalPages; currentPage ++ ){
        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage>=selectedPage - 2

        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage){
            

            if(odlPage && currentPage - odlPage> 2){
                pages.push('...')
            }
            if(odlPage && currentPage - odlPage == 2){
                pages.push(odlPage + 1)
            }

            pages.push(currentPage)
            odlPage = currentPage
        }
    }
    return pages
}

function createPagination(pagination){

    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total =  +pagination.dataset.total //+ - transforma em número
    const pages = paginate(page, total)
    
    
    let elements = ""
    
    for (let page of pages){
        if(String(page).includes("...")){
            elements += `<span>${page}</span>`
        }else{
            if(filter){
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            }else{
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }
    
    
    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination");


if(pagination){
    createPagination(pagination)
}
