function createUrlPath(params){
    return 'https://rest-maks1mp.c9users.io/api/'+params;
}

$(document).ready(function(){
    var preloader = {
        selector: $('.preloader'),
        hide: function(){
            this.selector.fadeOut();
        },
        show: function(){
            this.selector.fadeIn();
        }
    }

    function getPosts(){
        preloader.show();
        $.get(createUrlPath('posts'), function(data){
            $('#posts').html(data.map(function(item){
                return `
            <div class="col-md-3 text-center">
                <h3 class="text-uppercase text-left"> ${item.title} </h3>
                <img src="${item.img}" class="img-responsive" alt="">
                <p> Likes: ${item.likes} </p>
            </div>
                `
            }).join(' '))
            preloader.hide();
        })
    }

    getPosts();
    // getPosts();
    // getPosts();

});



