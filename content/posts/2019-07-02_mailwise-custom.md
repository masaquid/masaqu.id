---
date: 2019-07-02T16:13:57+09:00
thumbnail: images/posts/2019-07-02_eye-catch.png
title: メールワイズでJavascriptカスタマイズ。Amazon出荷指示メールから直接注文管理を開けるボタン
toc: false

# Categories:
#   技術, ゲーム, 自転車, ニュース, その他
# Tags:
#   ruby, php, golang, javascript
#   ruby on rails, laravel, hugo
#   github, netlify, heroku
#   自転車, ボードゲーム
categories:
 - "技術"
tags:
 - "javascript"
 - "メールワイズ"
 - "Amazon"
---

# メールワイズに届くAmazon出荷指示メールに、注文管理画面へのボタンを追加する

かなり需要のある人が少ない記事  

私の勤め先では、社内のメール管理ソフトとして [メールワイズ](https://mailwise.cybozu.co.jp/) を活用しています

調べても全然記事でてこないのですが、実はメールワイズは自作Javascriptを走らせてカスタマイズする事が出来ます  
(カスタマイズ出来る事自体はちゃんと書いてあるけど、例とか全く無い)

<br>

立派な機能を追加しよう！ともなれば、社内にエンジニアが一人もいないので、
全て私がやることになっちゃいます  
通常業務に加えてそれらの開発をするのは面倒くさいので、黙ってノンカスタマイズで使ってたつもりだったのですが

メールワイズ導入初期の頃に、Javascriptの動作テストとしていれてみたコードがあったのを思い出したので、
せっかくなので共有しておきます。

<br>

やってみたいけど、よくわからない人がいるかもしれないので (多分いない)

* * *

## Javascriptファイルを作る

今回はAmazonの出品者に届く「出荷指示メール」に記載されている注文番号の横に、
セラーセントラルの注文管理画面へ飛ぶ事の出来るボタンを追加するJavascriptを作ります

{{% img src="images/posts/2019-07-02_mailwise-az-button.png" %}}

Javascriptの内容は、それぞれ実装したい機能によって違うと思うので適宜読み替えてください  
実際のコード如何はあまり関係ないと思うので

<br>

<small>また、このコード自体はるか昔に書いたもので コードのレビューはお控えください…(涙)</small>

```javascript
$(function() {
    // GETパラメータをオブジェクトで取得
    var params  = new Object;
        url  = location.search.substring(1).split('&');
    for(i=0; url[i]; i++) {
        var k = url[i].split('=');
        params[k[0]] = k[1];
    }
    
    /**
     * メール詳細画面
     */
    if (params.page == 'MailView') {
        /**
         * メールの差出人が条件に一致する場合、Amazonセラーセントラルの
         * 注文詳細ページへのリンク(ボタン)を文中に挿入する
         */
        // .mailContentDiv[1] : 差出人
        mailContentDiv = document.getElementsByClassName('mailContentDiv');

        if (mailContentDiv[1].innerHTML.indexOf('@amazon.co.jp') != -1 ||
            mailContentDiv[1].innerHTML.indexOf('@m.marketplace.amazon.co.jp') != -1) {
            
            // .mailBody[0]: メール本文
            mailBody = document.getElementsByClassName('mailBody');
            
            var mailbody_html = mailBody[0].innerHTML;
            var pattern = /(\d{3}-{1}\d{7}-{1}\d{7})/g;
            var text = "$1 <input type='button' onclick=\"window.open('https://sellercentral.amazon.co.jp/hz/orders/details?orderId=$1');\" value='Amazonセラーセントラルで開く'>";
            mailBody[0].innerHTML = mailbody_html.replace(pattern, text);
        }
    }
})();
```

Javascript内容としては非常に簡単で、直接DOM指定してゴリゴリ書き換えてるだけ

メールワイズ自体がjQueryを使ってます  
バージョンは、この記事かいてる時点で確認したら <code>1.11.2</code> でした。

後はこのJavascriptファイルを <code>.js</code> として保存する  
今回は適当に <code>customize.js</code> とか名前つけて保存した

* * *

## メールワイズ側にアップロードする

メールワイズ画面右上の歯車マークから _メールワイズ：システム設定_ を選択して、開いたシステム設定から __JavaScriptファイルの設定__ を開く

{{% img src="images/posts/2019-07-02_mailwise-js1.png" %}}

したら、Javascriptファイルのアップロードフォームがあるので、先程つくった <code>customize.js</code> をアップロードし

{{% img src="images/posts/2019-07-02_mailwise-js2.png" %}}

適用する対象を適宜選択してアップロード  
今回の場合は、全てのユーザが使えるようにしたいので _すべてのユーザー_ を選択

<br>

あとは画面下部の _設定する_ ボタンを押すだけ

* * *

結構簡単に自作Javascriptの実装が出来ます  

比較的安く、必要な機能がそろってるのでメールワイズは意外と気に入ってるのですが、値段相応なのか正直機能は全然足りてないです  

もうちょっとちゃんと作り込んで、より使いやすいように  
……暇ができて、かつ気が向いたらやります

{{% ad %}}
