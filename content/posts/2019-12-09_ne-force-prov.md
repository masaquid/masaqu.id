---
date: 2019-12-09T11:07:13+09:00
thumbnail: images/posts/2019-12-09_eye-catch.jpg
title: NextEngineに[強制引当]ボタンを追加する Chrome拡張機能
toc: false

# Categories:
#   技術, ゲーム, 自転車, ニュース, Poker, その他
# Tags:
#   ruby, php, golang, javascript, kotlin
#   ruby-on-rails, sinatra, laravel, hugo
#   github, netlify, heroku, line-bot
#   自転車, ボードゲーム
categories:
 - "技術"
tags:
 - "javascript"
 - "chrome-extension"
---

# NextEngine受注詳細画面に [強制引当] ボタンを追加する Chrome拡張機能

わざわざ書くレベルでも無いのですが (実際のコードも紹介するレベルでも何でも無い)  

面倒くさいと思ってる人が一定量はいると思うので、一応残しておきます。

* * *

## 毎日 強制引当処理するのがめっちゃ面倒くさい

私の会社では、ネット通販の受注管理システムにNextEngineを使っているのですが  
受注生産・受注発注品など在庫管理されていないものは _強制引当_ という処理をします

本来はイレギュラーな処理として用意されてる機能かと思うのですが、うちの場合は結構使います

<br>
伝票一件づつ、こんな感じの処理をします

1. まず伝票画面を開く
2. 画面左上の _[メニュー]_ にカーソルをあわせてメニュー展開
3. 展開されたメニュー内の _[伝票操作]_ にカーソルを合わせて展開
4. その中の _[強制引当処理]_ をクリック
5. 受注発注の対象となっている商品に _[引当数]_ を入力
6. _[保存]_ を押下する

これを一件づつ処理していくんです、面倒くさいですね。  
多い日だと何十件もこういったの発生するんで。

* * *

## 作ったものについて

ってことで、雑に _[強制引当]_ ボタンを追加する Chrome拡張機能つくりました  
実際に引当数の入力までやっちゃうと問題ありそうなんで、画面を開くボタンです

{{< img src="images/posts/2019-12-09_desc2.jpg" >}}  

ボタン位置は、諸般の事情により画面右上にしました。  
_次の伝票 →_ の横においてあるんで、それなりに使いやすいかと

ソースはココ  
[https://github.com/masaquid/ne-force-prov](https://github.com/masaquid/ne-force-prov)  

導入はこんな感じ  

{{< img src="images/posts/2019-12-09_desc1.jpg" >}}  

拡張機能として、上記リポジトリからダウンロードしたコードの <code>/src</code> のフォルダをそのまま読み込めばOKです

* * *

## コードの話

むちゃんこ適当に書いたんで、実際の拡張導入まで２分ぐらいで終わりました  

```
// manifest.json
{
  "manifest_version": 2,
  "version": "1.0.3",
  "name": "ne-force-prov",
  "description": "ne-force-prov",
  "content_scripts": [{
    "matches": ["https://*.next-engine.com/Userjyuchu/jyuchuInp?kensaku_denpyo_no=*&jyuchu_meisai_order=jyuchu_meisai_gyo"],
    "js": [
      "jquery-3.4.1.min.js",
      "app.js"
    ]
  }]
}
```
__manifest_version__: 2しか無いんで2で  
__version name description__: 適当につける  

__content_scripts__  
・<code>matches</code> 受注詳細画面のURLをワイルドカードで指定するだけ  
・<code>js</code> app.jsは本体。jQueryは別にいらんけど使っちゃったのでjQueryも。

```
// app.js
window.onload = function() {
  html = `
<button type="button"
        style="margin: -3% 0 0 91%"
        onclick="$('show-kyosei_hikiate-btn').onclick(); return false;">
    強制引当</button>
`;
  $('#jyuchuMeisai').after(html)
}
```
ボタンが押下されたら、強制引当ボタンが押下された時と同じ動作にするだけ  
実際の引当数入力とかまでやると、怖いんでとりあえずやめた。

伝票送りした時再描画されない範囲にボタンを追加するとに、なんか変な所に追加されて面倒くさいんで <code>margin</code> で直接指定して調整した。

<br>
以上です。簡単。

* * *

## 感想
こんなのでも一件あたり3-5秒とか、下手したら10秒ぐらい短縮できてるんで結構おおきい  
時間よりもストレス負荷下がったのがうれしい。  

1日20回×5秒 短縮できたら100秒 1年365日で36,500秒  
約608分=約10時間ぐらい短縮できる事になるね　やったね
