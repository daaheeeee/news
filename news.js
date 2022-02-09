function call(cate) {
    var subcate = ""
    if (cate!=='all') {
        subcate = `&category=${cate}`
    } 

    $.ajax({
        type:'GET',
        url:`https://won0209.herokuapp.com/https://newsapi.org/v2/top-headlines?country=kr&apiKey=dab2080f2b7e4e7da97ca24b801feb73${subcate}`,
        dataType:'json',
        success:function(getdata){
            console.log(getdata)
            usedata(getdata)
        },
        error:function(xhr){
            console.log(xhr.status + '/' + xhr.errorText )
        }
    })
}
call('all') // 처음 화면에 all이 보이도록 call

function usedata(data) {
    $( `#content .article`).remove()
    var elem = `<ul class="article">`
    for (let i in data.articles) {
        elem += `<li>`
        elem += `<h2>${data.articles[i].title}</h2>`
        elem += `<img src="${data.articles[i].urlToImage}" alt="">`
        elem += `<p>${data.articles[i].description}</p>`
        elem += `<div>${data.articles[i].author}</div>`
        elem += `</li>`
    }
    elem += `</ul>`
    $('#content').append(elem) //elem 쏟아붓기
}



//html에서 전체를 누르면 아무것도 안보이게, 경제 누르면 경제만 보이게 / url변경하는 함수
$('.tabTit a').on('click', function(){
    var category = $(this).attr('href')
    call(category)
    return false
})