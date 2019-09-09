---
date: 2019-07-26T10:07:17+09:00
thumbnail: images/posts/2019-07-25_eye-catch.png
title: 【ポケモンGO】ボールPlus 速度制限や自動化について
toc: false

# Categories:
#   技術, ゲーム, 自転車, ニュース, その他
# Tags:
#   ruby, php, golang, javascript
#   ruby on rails, laravel, hugo
#   github, netlify, heroku
#   自転車, ボードゲーム
categories:
 - "ゲーム"
tags:
 - "Pokemon Go"
---

# ボールPlus便利すぎて草

GoPlusは使ったことないのですけど、ボールPlus最近使ってます

ポケ活がぐっと楽しくなりました！みたいな意見多かったのですが、本当に楽しくなりました  

<br>

GoPLusを知らないせいかもしれませんが、大きさは言うほど気になりませんね  
もう少し小さくなればいいなとも思いますが、効率だけでなくボールの容姿も結構かわいいので。  
最悪かばんに入れちゃえばいいですし、こんなもんかなって思います

<br>
運用する上で、速度規制だったり自動化だったり、ちょっと調べたことあるので纏めておきます

<br>
## 速度規制・速度制限について

<small>2019年7月26日時点</small>  
_40km_ 以上のスピードで移動しているときには、ボールPlusも動作しません  
ポケストップやポケモン発見はしますが、何もしません。

<br>
一時期、速度制限がきつくなったり60kmでも反応するような事が書いてあったり  
情報がバラバラですが、現時点では _40km_ が境目のようです

<br>
## 自動化について
付属のストラップだけで対応できます  
{{% img src="images/posts/2019-07-26_ballplus1.jpg" %}}  
ポケモンを発見したときに天面のボタンを押下する（押しっぱなしでも○）すると _モンスターボール_ を投げます

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="https://rcm-fe.amazon-adsystem.com/e/cm?ref=qf_sp_asin_til&t=masaquid-22&m=amazon&o=9&p=8&l=as1&IS2=1&detail=1&asins=B07L6JVGDD&linkId=add69ee3885d7bd91a94117ab24f9cdc&bc1=000000&lt1=_blank&fc1=333333&lc1=0066c0&bg1=ffffff&f=ifr">
    </iframe>
    
<br>
__設定について__  
アプリ内でモンスターボールPlusの設定でポケモン通知をONにするとポケモン捕獲できるようになります  
{{% img src="images/posts/2019-07-26_ballplus2.png" %}}

ポケモンが近くにいる時、常にポケストップより優先して捕獲されます  
ポケモンが全ていなくなる前に、ポケストップの近くを離れるとポケストップ回してくれません。

道具集め(ポケストップ回収)を優先したい場合は、アプリ内からポケモンの通知を切ることでポケストップだけ回せます

<br>
## サポートモードについて
バッテリーの確認など色々できますが、初期化もあるので気をつけてください  

[サポートモードについて](https://www.nintendo.co.jp/support/switch/accessories/monsterballplus_supportmode.html)

{{% ad %}}