---
date: 2019-06-07T11:21:37+09:00
thumbnail: images/posts/2019-06-07_eye-catch.png
title: Hugo＋Netlify＋CloudFlareで独自ドメインのhttps化
toc: true

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
 - "golang"
 - "hugo"
 - "netlify"
 - "cloudflare"
---

# Netlify＋CloudFlareで独自ドメイン運用＋https化しました

Hugoに移行した当サイトをNetlify＋CloudFlareで独自ドメイン・https化して運用するまで設定を終わらせました

比較的スムーズに設定終わりましたが、Netlify＋CloudFlareの設定の記録

Hugo＋Netlifyでの静的ブログ環境はこちらの記事を参照  
[Github-PagesからNetlify＋Hugoに移行しました](https://masaqu.id/posts/2019-06-06_first_post/)

* * *

## CloudFlareの設定

Netlify では CNAME での設定を推奨しているようなので、それにならい CNAMEで設定する

[CloudFlare](https://www.cloudflare.com) にログイン(登録)し、DNS設定をCNAMEにて登録

{{% img src="images/posts/2019-06-07_cloudflare-records.png" %}}

DNS機能のみ利用するので __Status__ の雲のアイコンはグレーにする

CloudFlareでDNSのみにすると、CloudFlare側で発行されていたSSL証明書が無効化されてしまうので、あとでNetlify側でSSL証明書を有効化する必要がある ※後述

ドメイン管理サイトで、ネームサーバの変更をしないといけないのでネームサーバの指定先を確認しておく

{{% img src="images/posts/2019-06-07_cloudflare-nameserver.png" %}}

必要に応じて適宜設定をする  
今回の場合は FlexibleSSL と HSTS の設定をしました

{{% img src="images/posts/2019-06-07_cloudflare-flexible.png" %}}

{{% img src="images/posts/2019-06-07_cloudflare-hsts.png" %}}
* * *

## NetlifyでSSL設定をする

CloudFlareでのSSL設定は外してしまっているので、Netlify側で Let's Encrypt を利用した

<code>Domain management</code> > <code>HTTPS</code> > <code>SSL/TLS certificate</code>  
__Veryfy FNS configuration__ を押下し __Let's encrypt certificate__ を押下したら設定完了です  
あとは少し時間を置けば自動的に証明書が更新されます

{{% img src="images/posts/2019-06-07_netlify-domain-setting.png" %}}

* * *

## ドメイン管理サイトでネームサーバを変更する

あとは実際に、独自ドメインにアクセスされた時にCloudFlareに向くように設定すれば良いので、
ドメイン管理サイトでネームサーバを変更する

私の場合は [ムームードメイン](https://muumuu-domain.com) を利用してるので、その設定画面を

{{% img src="images/posts/2019-06-07_muu-muu-domain.png" %}}

* * *

これで設定終わりです。

{{% img src="images/posts/2019-06-07_finished.png" %}}

Webプログラマを離れて結構たち、また最近勉強しはじめてますが  
最近はほんと設定が早くて楽・便利になってていちいち感動する

{{% ad %}}
