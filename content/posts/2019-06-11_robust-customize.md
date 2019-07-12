---
date: 2019-06-11T15:49:22+09:00
thumbnail: images/posts/2019-06-11_eye-catch.png
title: Hugoのテーマ、Robustを採用・カスタマイズ
toc: true

# Categories:
#   開発関係
#   趣味・ゲーム
#   ニュース
#   その他
# Tags:
#   ruby, php, golang, javascript
#   ruby on rails, laravel, hugo
#   github, netlify
#   自転車
categories:
 - "開発関係"
tags:
 - "golang"
 - "hugo"
---

# HugoのテーマをRobustに変更・適宜カスタマイズしました

ポートフォリオっぽいサイトのデザイン ([Hugo Bingo](https://themes.gohugo.io/hugo-bingo/))
でスタートを切ったのですが、実際に運用しようとカスタマイズを進めていると、
あまりにカスタマイズする箇所が多すぎたので、思い切ってテーマを ([Robust](https://github.com/dim0627/hugo_theme_robust))
に変更しました。

まだまだ弄り途中ですが、何だかんだ変更する箇所があったので、参考にしたサイトの紹介と共に
変更箇所のメモを残しておきます

{{% ad %}}

* * *

## Hugoテーマのカスタマイズについて

<code>/themes</code> 以下にテーマに関連するファイルがありますが、プロジェクト直下の
<code>/layouts</code> 以下にファイルを設置すれば、上書きして読み込まれます。

変更したい箇所のファイルをコピーし <code>/layouts</code> 以下でのみ編集することで
元に戻すことが出来るので、直接触らないようにする

<code>/partials</code> とか <code>/_default</code> のフォルダは new した時点では
作られないので、必要に応じて適宜作成すること

[Hugo - Base Templates and Blocks](https://gohugo.io/templates/base/)

* * *
### Authorの設定

もともとはFontAwesome使ってるのですが、自分の欲しいアイコンが無かったので全てsvgでの画像に変更しました。 

また、メールでの問い合わせボタンも一応つけておきました

```
/layouts/partials/author.html

<ul class="author-facts">
  {{ with .github }}<li><a href="{{ . }}" rel="nofollow" target="_blank"><img src="/images/icons/github.svg" width="16px"></a></li>{{ end }}
  {{ with .eight }}<li><a href="{{ . }}" rel="nofollow" target="_blank"><img src="/images/icons/eight.svg" width="16px"></a></li>{{ end }}
  {{ with .twitter }}<li><a href="{{ . }}" rel="nofollow" target="_blank"><img src="/images/icons/twitter.svg" width="16px"></a></li>{{ end }}
  {{ with .facebook }}<li><a href="{{ . }}" rel="nofollow" target="_blank"><img src="/images/icons/facebook.svg" width="16px"></a></li>{{ end }}
  {{ with .mail }}<li><a href="{{ . }}" rel="nofollow" target="_blank"><img src="/images/icons/mail.svg" width="16px"></a></li>{{ end }}
</ul>
```

config.tomlにそれ用の設定を追加  
※ 取り急ぎ <code>mailto:</code> を設定しましたが、さすがに嫌なので近い内に変更します

```
/config.toml

[params.author]
  thumbnail = "images/avatar.png"
  name = "masaquid"
  description = '自己紹介的なテキスト'
  twitter  = "https://twitter.com/USERNAME"
  facebook = "https://www.facebook.com/USERNAME"
  github   = "https://github.com/USERNAME"
  eight    = "https://www.facebook.com/USERNAME"
  mail     = "mailto:MAIL-ADDRESS@gmail.com"
```

* * *
### Faviconの設定
デフォルトだとiPhone用のアイコンしかないようなので、Faviconとあわせて設定しました
<code>/static/favicon.ico</code> と <code>/static/images/logo.png</code> を配置

```
/layouts/partials/meta.html

<link rel="apple-touch-icon" href="{{ .Site.BaseURL }}images/logo.png">
<link rel="shortcut icon" type="image/x-icon" href="{{ .Site.BaseURL }}favicon.ico">
```

* * *
### LINEでシェアした時に外部ブラウザで開くように
LINE内ブラウザが脆弱性の塊なので外部ブラウザで開く設定にします
GETパラメータに <code>&openExternalBrowser=1</code> を追加

```
/layouts/partials/share.html

<aside class="share">

  ...

  <a href="https://social-plugins.line.me/lineit/share?url={{ .Permalink }}&openExternalBrowser=1" title="LINEでシェア" class="ln" target="_blank" rel="nofollow"><i class="fab fa-line" aria-hidden="true"></i></a>
</aside>
```

* * *
### サイト名の横にアイコンを表示
上記iPhone用のロゴと同じもの使いましたが、タイトル横にロゴを表示してみました

```
/layouts/_default/baseof.html
/layouts/_default/baseof.amp.html

<div class="logo">
    <a href="{{ .Site.BaseURL }}"><img src="{{ .Site.BaseURL }}/images/logo.png">{{ .Site.Title }}</a>
</div>
```

画像サイズの修正など CSSの変更は <code>custom.css</code> に書く

```
/layouts/partials/custom.css

.logo img {
  height: 1em;
  padding: 0 5px;
  vertical-align: bottom;
}
```

* * *
### フッターの著作権表示の所にクリエイティブ・コモンズの表示
ちょっとフッターが寂しかったのでクリエイティブ・コモンズの画像を追加しました
画像の <code>vertical-align</code> も合わせて変更できるようCSS追加した

```
/layouts/_default/baseof.html
/layouts/_default/baseof.amp.html

<p class="copyright">{{ with .Site.Copyright }}{{ . | safeHTML }}{{ else }}<span class="h-logo">&copy; {{ .Site.Title }}</span>{{ end }}</p>
```

```
/layouts/partials/custom.css

.copyright img { /* creativecommons */
  height: 15px;
  margin-left: 1em;
  vertical-align: middle;
}
```

copyrightの表記は <code>config.toml</code> で変更

```
/config.toml

copyright = """
&copy; masaqu.id
<a rel='license' href='http://creativecommons.org/licenses/by-sa/4.0/'>
  <img alt='クリエイティブ・コモンズ・ライセンス' src='https://i.creativecommons.org/l/by-sa/4.0/80x15.png' />
</a>"""
```

* * *
### タグ・カテゴリーを有効化
テーマにタグ・カテゴリーが用意されてたので設定に書いて有効化させる

```
/config.toml

[taxonomies]
  tag = "tags"
  category = "categories"
  series = "series"
```

* * *
### config.tomlの修正
日付表記やWebフォントなど、好みに合わせて内容変更した

```
/config.toml

[params]
  description = "サイトタイトルの下に表示されるテキスト"
  dateformat = "2006/01/02"
  # Fonts settings.
  googlefonts = "https://fonts.googleapis.com/css?family=Lato|Noto+Sans+JP&display=swap" # Optional, Include google fonts.
  fontfamily = "Lato, 'Noto Sans JP', 'Hiragino Kaku Gothic Pro', Meiryo, sans-serif" # Optional, Override body font family.
  # logofontfamily = "Lobster, cursive" # Optional, Override logo font.
```

* * *
### コードのハイライト highlight.js を適用

HugoのSyntax機能を使っても良かったのですが、読み進めるのに時間がかかりそうだったので
取り急ぎ [highlight.js](https://highlightjs.org) を導入した
[コードのハイライト表示用 JS ライブラリ highlight.js の使い方](https://qiita.com/tadnakam/items/99088d78512a20e75ff3)  

[Hugo - Syntax Highlighting](https://gohugo.io/content-management/syntax-highlighting/)

```
/layouts/_default/baseof.html

  ...
    
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/styles/atelier-sulphurpool.dark.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/highlight.min.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>
</head>
```

* * *
### 記事投稿時のデフォルト設定を変更
FromtMatter奴  
アイキャッチなんかは固定の名前で十分なので自動で入力されるようにした  

アイキャッチ用意してない時は手動で削除する方針に。  
<code>thumbnail</code> が空の時は <code>/static/default.jpg</code> が読み込まれる


```
/archetypes/default.md

---
date: {{ .Date }}
thumbnail: images/posts/{{ dateFormat "2006-01-02" .Date }}_eye-catch.png
title:
toc: false
categories:
 - ""
 - ""
---

```

* * *

大半は偉大な先駆者様の設定を参考にした (殆どそのまま使わせていただきました)  
ありがとうございます

[HUGO のテーマ Robust のカスタマイズver3](https://blog.zzzmisa.com/customize_hugo_theme3/)  
[Robust設定 ::  Alice in the Machine - wiki](https://browniealice.github.io/wiki/technote/hugo/setting_for_robust/)

それっぽくなったので、コレにて一旦終了して後はゆっくり触ってみます
