$(document).ready(() => {

    $('.cell').click(function (e, target) { 
        e.preventDefault();
        let $cell = $(e.target);
        //  点击按钮变换背景颜色
        $cell.toggleClass('black');
    });

    //  点击按钮添加一行一列
    const plusCells = $('.hide');  //  拿到要补充的一行和一列
    $('#add').bind('click', function (e) {
        plusCells.toggleClass('hide');
    });

    //  点击重置按钮
    const allCells = $('.cell');
    
    $('#reset').bind('click', (e) => {
        allCells.removeClass('black');
    })
})