/**
 * 切换页面
 * @param index
 */
function showPage(index) {
    console.log(index);
    if (index == 1){
        $("#user_page").removeClass("hidden");
        $("#song_page").addClass("hidden");
        $("#genre_page").addClass("hidden");
    }else if (index == 2){
        $("#user_page").addClass("hidden");
        $("#song_page").removeClass("hidden");
        $("#genre_page").addClass("hidden");
    }else if (index == 3){
        $("#user_page").addClass("hidden");
        $("#song_page").addClass("hidden");
        $("#genre_page").removeClass("hidden");
    }
}

function to_page(index) {
    $.ajax({
        url: "/user"
    });

}

function build_table_info() {

}

function build_page_info() {

}
function build_page_nav() {

}