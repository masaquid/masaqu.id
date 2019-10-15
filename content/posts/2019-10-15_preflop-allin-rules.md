---
date: 2019-10-15T13:33:57+09:00
thumbnail: images/posts/2019-10-15_eye-catch.jpg
title: テキサスホールデムでの初期ハンド勝率を早見できるツール
toc: false

# Categories:
#   技術, ゲーム, 自転車, ニュース, Poker, その他
# Tags:
#   ruby, php, golang, javascript, kotlin
#   ruby-on-rails, sinatra, laravel, hugo
#   github, netlify, heroku, line-bot
#   自転車, ボードゲーム
categories:
 - "Poker"
tags:
 - "ruby"
 - "javascript"
---

# テキサスホールデムでの初期ハンド勝率を早見できるツールつくった

趣味で暇つぶしにつくりました。

Poker×Pokerとか、PokerstarsのSping&Goとかの少人数で回転数をあげたほうが良い試合で、  
勝率をパパっと見れるツールあったら便利だねって事で。

最初から最後まで適当にコーディングしたのでコードは死ぬほど汚いですが、なんとなく動くので良しとしました

* * *

Preflop All-in Rules - [https://preflop-allin-rules.herokuapp.com](https://preflop-allin-rules.herokuapp.com)

手札に来たカードを選択して、スーツが揃ってるかどうかを _o/s_ で選択するだけ。簡単。

<bt>
<small>
Tは10のこと  
oはオフスーツ ... スーツが揃って無いとき  
sはスーテッド ... スーツが揃ったとき
</small>

2ppl ... <small>自分含めてプレイヤーが2人の時 (スマホアプリの Poker×Poker とか)</small>  
3ppl ... <small>自分含めてプレイヤーが3人の時 (PokerstarsのSping&Go の時とか)</small>

<br>
コレみてプレイする程でもないんですが、判断に迷った時にその選択が正しかったのか確認するために作りました  

<br>
* * *

本当に新しい技術とかは何も触ってないのだけど Slim をものすごい久しぶりに触りました  

読みにくいし面倒くさい...と無視してましたが楽でいいですね  
意外と細かい融通きくし、今度から使ってみます

書き出されるソースが改行されてたら言うことないんですけどね

<br>
あと umbrella.js も使ったことなかったので入れてみました

結局 jQuery と使い方あまり変わらない上、意外と機能不足を感じたので  
毎秒実行するとか遅延を気にするような環境でなければ、あんまりな気がします  

それでもやっぱり速度は正義なので、jQuery入れるほどじゃない時は使おうかな

{{< ad >}}