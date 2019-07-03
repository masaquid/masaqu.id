---
date: 2019-07-03T09:32:04+09:00
thumbnail: images/posts/2019-07-03_eye-catch.png
title:
toc: false

# Categories:
# - Golang
# - Ruby
# - Webデザイン
# - Game
# - その他
categories:
 - "Ruby"
tags:
 - "Ruby on Rails"
---

# Railsのアセットパイプラインに vendor/assets のパスを通す

私はデザイン部分の作り込みが非常に 苦手なのでBootstrapなどのCSS Frameworkを頼りにしているのですが、
Rails用のBootstrap gemをいれるには _sass_ だか _less_ だかが必要だそうで  

普通のCSSを書くだけでも四苦八苦してる私は、可能な限り触れたくない。

どうせそんなにデザイン作り込まないし(出来ないし)、CSSで適宜追加できたらいいやって。

<br>

それに、Bootstrap関連のjsを直接修正したい時も稀にあるので 
Bootstrap関連ファイルは <code>vendor/assets</code> 以下にダウンロードしてきたCSSをそのまま入れるようにしているのだけど、どこかのRailsのバージョンから <code>vendor</code> のファイルは自動的にプリコンパイルしてくれないようになったようだ

* * *

試しに、パスをのぞいてみると

```
$ rails c
> Rails.application.config.assets.paths
```

```
=> ["/home/ubuntu/workspace/app/assets/config", 
    "/home/ubuntu/workspace/app/assets/images", 
    "/home/ubuntu/workspace/app/assets/javascripts", 
    "/home/ubuntu/workspace/app/assets/stylesheets", 
    "/usr/local/rvm/gems/ruby-2.4.0/gems/coffee-rails-4.2.2/lib/assets/javascripts",
    "/usr/local/rvm/gems/ruby-2.4.0/gems/actioncable-5.1.5/lib/assets/compiled", 
    "/usr/local/rvm/gems/ruby-2.4.0/gems/actionview-5.1.5/lib/assets/compiled",
```

確かに _vendor_ のパスが通ってなかった

<code>config.application.rb</code> に <code>vendor/assets</code> 以下の任意のディレクトリを書いてパスを通すことにした

```ruby
# config/application.rb

module Workspace
  class Application < Rails::Application
    #
    # 他の設定が色々書いてあるところ
    #

    # 追加した部分
    Rails.application.config.assets.paths << Rails.root.join('vendor', 'fonts')
    Rails.application.config.assets.paths << Rails.root.join('vendor', 'images')
    Rails.application.config.assets.paths << Rails.root.join('vendor', 'javascripts')
    Rails.application.config.assets.paths << Rails.root.join('vendor', 'stylesheets')
    Rails.application.config.assets.precompile += %w(*.eot *.woff *.woff2 *.ttf *.svg *.otf *.png *.jpg *.gif )
  end
end
```

もう一度パスが通ってるか確認してみる

```
$ rails c
> Rails.application.config.assets.paths
```

```
=> ["/home/ubuntu/workspace/app/assets/config", 
    "/home/ubuntu/workspace/app/assets/images", 
    "/home/ubuntu/workspace/app/assets/javascripts", 
    "/home/ubuntu/workspace/app/assets/stylesheets", 
    "/usr/local/rvm/gems/ruby-2.4.0/gems/coffee-rails-4.2.2/lib/assets/javascripts",
    "/usr/local/rvm/gems/ruby-2.4.0/gems/actioncable-5.1.5/lib/assets/compiled", 
    "/usr/local/rvm/gems/ruby-2.4.0/gems/actionview-5.1.5/lib/assets/compiled", 
    #<Pathname:/home/ubuntu/workspace/vendor/fonts>, 
    #<Pathname:/home/ubuntu/workspace/vendor/images>,
    #<Pathname:/home/ubuntu/workspace/vendor/javascripts>, 
    #<Pathname:/home/ubuntu/workspace/vendor/stylesheets>]
```

今度は大丈夫みたい