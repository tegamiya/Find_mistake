(function(){
    'use strict';

    var stage = document.getElementById('stage');
    var ctx;
    var count = 0;
    var dim;
    var size;
    var answer = [];
    var isPlaying = true;

    //Math.floor()は小数点切り捨て

    function init(){
        //3回正解すれば縦横一列増やす
        dim = Math.floor(count / 3) + 2;
        //ステージのサイズを増えるごとに割って小さくしていく
        //ステージ1個分のサイズ
        size = Math.floor(stage.width / dim);
        //答えのステージ　
        answer = [
            Math.floor(Math.random() * dim),
            Math.floor(Math.random() * dim)
        ];
    }

    function draw(){
        var x;
        var y;
        var offset = 2;
        var baseColor;
        var answerColor;
        var hue;
        var lightness;


        hue = Math.random() * 360;
        baseColor = 'hsl(' + hue + ', 80%, 50%)';
        lightness = Math.max(75 - count, 53);
        // 答えの色の濃さ
        answerColor = 'hsl(' + hue + ', 80%,' + lightness +'%)';

        ctx.clearRect(0, 0, stage.width, stage.height);

        for(x = 0; x < dim; x++){
            for(y = 0; y < dim; y++){
                if(answer[0] === x && answer[1] === y){
                    ctx.fillStyle = answerColor;
                }else{
                    ctx.fillStyle = baseColor;
                }
                ctx.fillRect(
                    size * x + offset,
                    size * y + offset,
                    size - offset * 2,
                    size - offset * 2
                );
            //    ctx.fillStyle = '#000';    //確認用コード
            //    ctx.textBaseline = 'top';
            //    ctx.fillText(x +','+y, size * x, size * y);
            }
        }
    }

    if(typeof stage.getContext === 'undefined'){
        return;
    }

    //canvas.getContext('2d')の指定で、描画機能利用
    ctx = stage.getContext('2d');


    stage.addEventListener('click', function(e){
        var rect;
        var x;
        var y;
        var replay = document.getElementById('replay');

        if(isPlaying === false){
            return;
        }

        // 要素の位置座標を取得
        rect = e.target.getBoundingClientRect();
        x = e.pageX - rect.left - window.scrollX;
        y = e.pageY - rect.top - window.scrollY;

        // document.write(x)
        // document.write(size)

        if(
            answer[0] === Math.floor(x / size) &&
            answer[1] === Math.floor(y / size)
        ){
            count++;
            init();
            draw();
        }else{
            alert('Your score:' + count);
            isPlaying = false;
            replay.className = '';
        }

    });

    init();
    draw();

})();
