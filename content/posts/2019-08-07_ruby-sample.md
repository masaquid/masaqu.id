---
date: 2019-08-07T16:57:08+09:00
thumbnail: images/posts/2019-08-07_eye-catch.png
title: RubyのsampleをJavascriptで実装する
toc: false

# Categories:
#   開発関係のこと
#   趣味のこと
#   ニュース
#   その他
# Tags:
#   ruby, php, golang, javascript
#   ruby on rails, laravel, hugo
#   github, netlify
#   自転車
categories:
 - "開発関係のこと"
tags:
 - "ruby"
 - "javascript"
---

# RubyのsampleをJavascriptで実装する

Twitterで [@t4traw](https://twitter.com/t4traw)がこんな事をいっていた

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">javascriptで、rubyでいう.sampleって何かあるのか？</p>&mdash; t4traw (@t4traw) <a href="https://twitter.com/t4traw/status/1158983498608234497?ref_src=twsrc%5Etfw">August 7, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

sampleって確か、配列からランダムに値を取得する奴だよね？ <small>Ruby初心者</small>  
Javascriptには、そういった便利関数が存在しないので <code>prototype</code>での実装を薦めた

```
Array.prototype.sample = function() {
    return this[Math.floor(Math.random() * this.length)]
}
let hoge = [1,2,3,4,5];
console.log(hoge.sample());
```

<br>
満足できなかったようで、更に要望(?)がきた

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">これをhoge.sample(3)とかで出せるようにしたいな</p>&mdash; t4traw (@t4traw) <a href="https://twitter.com/t4traw/status/1158988693136269312?ref_src=twsrc%5Etfw">August 7, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<br>
それらしい形に修正してみた

```
Array.prototype.sample = function(n) {
    return [...Array(n||1)].map(() => this[Math.floor(Math.random() * this.length)]);
}
let hoge = [1,2,3,4,5];
console.log(hoge.sample());
console.log(hoge.sample(3));
```

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">俺も今書いてたけど、かぶっちゃうんだよねー。重複しないように、配列から抜かないといけない <a href="https://t.co/PH6aQnPT7b">pic.twitter.com/PH6aQnPT7b</a></p>&mdash; t4traw (@t4traw) <a href="https://twitter.com/t4traw/status/1158990756935131136?ref_src=twsrc%5Etfw">August 7, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


<br>
* * *
……ここまできて、そもそも _Ruby_ の <code>.sample</code> ってどんな挙動なんだ？って調べてみた

[sample(Array)](https://ref.xaio.jp/ruby/classes/array/sample)  
<small>
sampleメソッドは、配列の要素を1つランダムに返します。配列が空の場合はnilを返します。

引数に整数を指定すると、その数だけ要素をランダムに取り出し配列で返します。  
要素の順番もランダムになります。  
配列が空のとき、あるいは引数が0のときは空の配列[]を返します。  
引数が配列のサイズより大きいときは、配列のサイズだけ要素を取り出します。
</small>

<br>
* * *
……ちゃんと実装すると大変そうなので(ワンライナーで書けない)  
次の要件を満たすコードを書いてみた

1. 引数が無い場合は 1 として扱う
1. 値は重複しないようにする
1. 指定された数だけ、ランダムに要素を取り出す
1. 配列サイズより大きな値を指定された場合は、配列のサイズだけ要素を取り出す

<br>
* * *
出来上がったコードがコレです

```
Array.prototype.sample = function(n) {
    return Array.from(this).sort(_=>Math.random()-0.5).splice(0, n>this.length ? this.length : n||1);
}
let hoge = [1,2,3,4,5];
console.log(hoge.sample(3));
console.log(hoge.sample(6));
```
```
[ 2, 3, 1 ]
[ 4, 3, 2, 1, 5 ]
```

配列をシャッフルし、先頭から指定された数の値を取り出す方針に変更した  
先までのコードは元の配列(hoge)をぶっ壊してたので複製した配列のデータを扱うようにした <code>Array.from()</code>

## 改善点
動きそうにみえて、結構改善点がたくさんあります

元のrubyの<code>sample</code>は、引数の有無で戻り値が配列だったり、整数だったりする
それにならって近づけるのであれば……  

sample() ... (int)1  
sample(0) ... []  
sample(1) ... [1]  
sample(3) ... [1,2,3]  

といった形の実装にしないといけない  
上記のコードでは sample() で実行された場合も、配列で値を返し、  
sample(0) が指定された場合も 配列でひとつ要素を取出してしまう(欠陥)  
ただ、そもそも sample(0) なんて使うシーンがあるのか疑問なので、ここまでで一旦終了とした

## Gistってものを初めてしった
こんなのもあったんですね。とりあえずアップしてみました 
[https://gist.github.com/masaquid/e256a5485181f1a270f82f155d3304a0](https://gist.github.com/masaquid/e256a5485181f1a270f82f155d3304a0)
