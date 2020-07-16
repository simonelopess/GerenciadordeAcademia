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


let totalPages = 20, 
    selectedPage = 15,
    pages = [],
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

