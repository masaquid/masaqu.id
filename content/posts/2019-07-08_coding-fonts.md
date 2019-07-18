---
date: 2019-07-08T14:36:34+09:00
thumbnail: images/posts/2019-07-08_eye-catch.png
title: (開発用)コーディング用フォント【Windows】
toc: true

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
 - "fonts"
---

# Windows環境で使っているコーディング用フォント

開発用、コーディング用でオススメのフォント紹介です  

かつて職業プログラマーだった時代に色々と試したのですが、中々 __これだ！__ っていうフォントに出会えず、結構苦労したクチです

だんだん、フォント選びが目的になってきて、業務そっちのけでフォント選びに残業含め３日程費やしたり…ね（遠い目)

{{% ad %}}

* * *

## 何故フォントを選ぶのか

可読性の高さ！スラッシュドゼロが必須！とか色々いってますが、一番は __モチベーション__ のためでしょう (違う？)  
毎日何時間も、何万文字も読むのですから、愛着の湧いてないフォントでは仕事の気が乗りません  

お気に入りの車を選ぶかのように、フォントも選ぶ必要があると思うのです

## 今回紹介するフォント

先に言ってしまいますが、今回あげるのは次の５つです

- IPAフォント
- Takaoフォント
- VLゴシック
- Fira Code
- ゆたぽんコーディング

他にも _Ricty_ とか色々有名所がありますが今回は割愛 (あんまり使ったことないので)

### スペックリスト

よく言われる評価基準です(多分)

oO0 ... 小文字の o(オー) と 大文字の O(オー) と 数字の 0(ゼロ) の見分けがつくか  
lL|1 ... 小文字の l(エル) と 大文字の L(エル) と 記号の |(パイプ) と 数字の 1(イチ) の見分けがつくか  
'"` ... クォーテーションマークの判別が出来るか  

<br>

<table>
  <tr>
    <th>フォント名</th>
    <th>oO0</th>
    <th>lL|1</th>
    <th>'"`</th>
    <th>その他</th>
  </tr>
  <tr>
    <td>IPAフォント</td>
    <td>○</td>
    <td>○</td>
    <td>○</td>
    <td></td>
  </tr>
  <tr>
    <td>Takaoフォント</td>
    <td>○</td>
    <td>○</td>
    <td>○</td>
    <td></td>
  </tr>
  <tr>
    <td>VLゴシック</td>
    <td>○</td>
    <td>○</td>
    <td>○</td>
    <td></td>
  </tr>
  <tr>
    <td>Fira Code</td>
    <td>○</td>
    <td>○</td>
    <td>○</td>
    <td>※合字対応</td>
  </tr>
  <tr>
    <td>ゆたぽんコーディング</td>
    <td>○</td>
    <td>○</td>
    <td>○</td>
    <td>全角スペースが見える</td>
  </tr>
</table>

もちろん、どれも読み違いを起こしやすいような所は最低限対応してます  
唯一、ゆたぽんコーディングだけ全角スペースの可視化をしてます

## フォント比較

### IPAフォント
__[IPAフォント](https://ipafont.ipa.go.jp/old/ipafont/download.html)__  
全体的に、良くも悪くも普通な感じですね  
幅が少し狭く、ゼロとかが少し読みにくい印象です  
|(パイプ)が縦幅いっぱいに使われてるので、意外と見やすい  
小文字の l(エル) は結構見にくいです

 {{% img src="images/posts/2019-07-08_coding-fonts_ipa1.png" %}}
 {{% img src="images/posts/2019-07-08_coding-fonts_ipa2.png" %}}


### Takaoフォント
__[Takaoフォント](https://launchpad.net/takao-fonts)__  
IPAフォントをベースに作られたフォントです  
こうして比べてみると、英数記号に関しては全部IPAフォントと一緒？

{{% img src="images/posts/2019-07-08_coding-fonts_takao1.png" %}}
{{% img src="images/posts/2019-07-08_coding-fonts_takao2.png" %}}


### VLゴシック
__[VLゴシック](https://ja.osdn.net/projects/vlgothic/releases/)__  
上記IPAフォントと比べ、アルファベット幅が広く、文字が読みやすいです  
ダブルクォートがスッキリしてて、コードが結構きれいに見えます  

 {{% img src="images/posts/2019-07-08_coding-fonts_vl1.png" %}}
 {{% img src="images/posts/2019-07-08_coding-fonts_vl2.png" %}}


### Fira Code
__[Fira Code](https://github.com/tonsky/FiraCode)__  
FiraCodeは <code>==</code> と <code>===</code> の違いとかを可視化してくれるフォントで _Visual Studio Code_ とかでも設定から有効化できます  

_fontLigatures_ が苦手 (コーディング中に字が変化するのが違和感) で普段有効化していない点と、そもそも今回比較用で使ったエディタが対応してなかった点から、比較用の画像は無し  
よく使われる記号などが結構見やすくなるので、試したことない人は試してみる価値はある

<small>
Windows VScodeで使う場合 [FiraCode/distr](https://github.com/tonsky/FiraCode/tree/master/distr)からttfをダウンロード・インストール  
VScodeの設定画面を開いて _fontLigatures_ で検索して設定有効化。  
後はFontに _'Fira Code'_ を指定すれば使えます
</small>

{{% img src="images/posts/2019-07-08_coding-fonts_fira1.png" %}}
{{% img src="images/posts/2019-07-08_coding-fonts_fira2.png" %}}
{{% img src="images/posts/2019-07-08_coding-fonts_fira3.png" %}}
 

### ゆたぽんコーディング
__[ゆたぽんコーディング](http://net2.system.to/pc/font.html)__  
職業プログラマーだった時代から使ってたフォント  
ごく最近でこそ利用頻度が減りましたが、今でも使ってます  

> 書体の統一感が損なわれても可読性を優先

と作者サイトに書かれてる通り、コード書いてる時に読みにくいって思ったことが本当に無いです  
全角スペースが可視化されてるのが結構ありがたくて、コード中のミスなど以外にも
コメントなどの日本語で記載する場所に全角スペースが入ることが激減・統一されるのですごい嬉しいです

{{% img src="images/posts/2019-07-08_coding-fonts_yutapon1.png" %}}
{{% img src="images/posts/2019-07-08_coding-fonts_yutapon2.png" %}}

* * *

## 結局どれが良いの

結局好みなんですが個人的には

1. __ゆたぽんコーディング__
1. __FiraCode__
1. _VLゴシック_
1. Takaoフォント / IPAフォント

の順番にオススメです  
ゆたぽんコーディングはイケてない！といった意見は非常にわかるのですが  
特徴のあるフォントで愛着が湧いてしまってるので贔屓目です(笑)  
実際コーディングしてると、結構見やすくていいですよ。

FiraCodeのfontLigatures(合字)が見にくい・使いにくい問題ですが  
慣れれば見やすく使いやすくなってくれるだろうか……  腰が上がらない  
今日からしばらく無理やり慣らしに使ってみるかな。