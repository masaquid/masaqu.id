---
date: 2019-09-09T14:46:04+09:00
thumbnail: images/posts/2019-09-09_eye-catch.png
title: HerokuでカラーミーショップAPIの認証をした
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
 - "技術"
tags:
 - "PHP"
 - "colorme-api"
 - "heroku"
---

# HerokuでカラーミーショップAPIを使えるように認証した

ハマって激おこになってたので、いつか同じことをやろうとした時のためにメモしておきます


{{< ad >}}
<br>
 * * *

## 公式ドキュメント
 実際の流れはココ見ればOKです  
 [APIドキュメント](https://shop-pro.jp/?mode=api_started)  

 特にトラブル無ければ、これの通りにやればいけるのですが……

 補足しながらメモしていきます

 * * *

## 必要なもの
デベロッパーアカウントの登録は書いてある通り必要なので、して下さい。  

__デベロッパーアカウント__ のログイン情報を求められる場合と、  
_連携したいカラーミーのサイト_ のログイン情報を求められている場合で、  
画面上の違いが殆ど無くて、紛らわしいので気をつけてください。

2番に書いてある色々は、Herokuで行うので特に気にしないでいいです


<br>
## 1. OAuthアプリケーション登録
ドキュメントにならってアプリケーション登録をするだけです  
アプリ名はどうでもいいですが、リダイレクトURIは <code>https://HEROKU_APP_NAME.herokuapp.com/auth.php</code> にして下さい  

お察しの通り、コレと同じ名前でHerokuのアプリケーション作ります
Githubのリポジトリ名も合わせて <code>HEROKU_APP_NAME</code> に統一しておくと良いです

Github・Heroku周りの設定は割愛  
※ HerokuでPHP動かす時に、依存なくとも <code>composer</code> が無いとビルドエラー吐きます  
※ [https://masaqu.id/posts/2019-09-09_heroku-php/](https://masaqu.id/posts/2019-09-09_heroku-php/)

<br>
## 2. カラーミーショップアカウントの認証ページを表示します
1でアプリ登録したら <code>client_id</code> が見れるので、それを使ってこの作業にいきます

```
https://api.shop-pro.jp/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&response_type=code&scope=read_products%20write_products
```

この時 __カラーミーで作ったのショップのログイン情報__ を求められるので間違えないように  
デベロッパーアカウントのログイン情報じゃないです。

<br>
## 3. 認可コードを取得
以下、次のコードを動かすことで終わります  
auth.php として作成し、先のリダイレクトURI先としてHerokにアップして、ブラウザで実行したら終わりです

```
<?php
define("OAUTH2_SITE", 'https://api.shop-pro.jp');
define("OAUTH2_CLIENT_ID", 'CLIENT_ID'); 
define("OAUTH2_CLIENT_SECRET", 'CLIENT_SECRET');
define("OAUTH2_REDIRECT_URI", 'https://HEROKU_APP_NAME.herokuapp.com/auth.php');

$code = $_GET['code'];
if (empty($code)) {
    $params = array(
        'client_id'     => OAUTH2_CLIENT_ID,
        'redirect_uri'  => OAUTH2_REDIRECT_URI,
        'response_type' => 'code',
        'scope'         => 'read_products write_products'
    );
    $auth_url = OAUTH2_SITE . '/oauth/authorize?' . http_build_query($params);
    header('Location: ' . $auth_url);
    exit;
}

$params = array(
    'client_id'     => OAUTH2_CLIENT_ID,
    'client_secret' => OAUTH2_CLIENT_SECRET,
    'code'          => $code,
    'grant_type'    => 'authorization_code',
    'redirect_uri'  => OAUTH2_REDIRECT_URI
);
$request_options = array(
    'http' => array(
        'method'  => 'POST',
        'content' => http_build_query($params)
    )
);
$context = stream_context_create($request_options);

$token_url = OAUTH2_SITE . '/oauth/token';
$response_body = file_get_contents($token_url, false, $context);
$response_json = json_decode($response_body);

echo $response_body;
```

<small>引用元忘れてしまいました…大変申し訳ないです</small>

<br>
## 動かない？
私もなんか動きませんでした 

アプリの権限変更で<code>client_secret</code>が変わっていたり、<code>code</code>の有効期限が10分しか無かったり  
ログイン情報が間違っていてなんか入れなかったり、小さなミスが積み重なりやすい仕組みになってるので、気をつけてみるしかないです  

ネットで調べたりしても、私自身もこのコードでちゃんと動いてるので、他の理由を探してみましょう

<br>
<small>
……くっそしょーもない理由が積み重なって1日ハマったので(認証だけで)　二度とやりたくない
<small>
{{< ad >}}