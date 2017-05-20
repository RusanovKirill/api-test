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

    var form = $('#add-post'),
        form_fields = form.find('input');

    var formats = ['.jpg', '.png', '.gif'];

    function addPost(e){
        e.preventDefault();
        var data = {};
        form_fields.each(function(index, item){
            var $element = $(item),
                name = $element.attr('name'),
                value = $element.val();

            data[name] = value;
        });

        
        var imgFormat = data.img.slice(-4);
        formats.indexOf(imgFormat) !== -1 ? 
        $.ajax({
            method: 'POST',
            url: createUrlPath('addpost'),
            data: JSON.stringify($.extend( data, {id: Date.now(), likes: 0} )),
            success: function(data){
                if (data.status) {
                    getPosts();
                    $.growl.notice({ message: "Post added!" });
                }
            }
        }) :  $.growl.error({ message: "Mistake in img url!" });
    }

    form.on('submit', addPost);

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
});



