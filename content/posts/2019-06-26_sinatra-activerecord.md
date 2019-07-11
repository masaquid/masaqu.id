---
date: 2019-06-26T16:48:45+09:00
thumbnail: images/posts/2019-06-26_eye-catch.png
title: Sinatra+ActiveRecord環境のメモ
toc: false

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
 - "ruby"
 - "sinatra"
 - "activeRecord"
---

# Sinatra+ActiveRecord環境で開発するためのメモ

ちょっとしたデータベースアプリケーションを作る必要があって Rails を触ってみたのだけど、
英語アレルギーよろしくRailsアレルギーで吐きそうになった  

体調を壊すほどなら致し方ないと、別のフレームワークとしてSinatraを選択  
シンプルなCRUDアプリケーションだけど勉強のためActiveRecord も使えるように

* * *

## 必要なgemをインストール
まずは<code>Gemfile</code>に必要な gem を追加

```ruby
Gemfile

gem 'sinatra'
gem 'sinatra-contrib'

gem 'rake'
gem 'sqlite3'
gem 'activerecord'
gem 'sinatra-activerecord'
```

<code>bundle install</code>する

<small>
最初は <code>-\-path</code> の指定を忘れないようにする  
[bundle installするときはpathを指定しよう](https://blog.dakatsuka.jp/2010/11/09/bundle-install.html)
</small>

* * *

## rakefileを作る
プロジェクト直下に <code>rakefile</code> を新しく作る

ActiveRecordで使うコマンドを使えるように <code>rakefile</code> に以下を追加

```ruby
/rakefile

require 'sinatra/activerecord'
require 'sinatra/activerecord/rake'
```

これで ActiveRecordに関する <code>rake</code> が使えるように

* * *

## マイグレーションする

```
$ bundle exec rake db:create_migration NAME=create_posts
```

出来上がった <code>/db/migrate/20190626061350_create_posts.rb</code> に以下を追加  
<small>※ 日時スタンプ_指定NAME.rb</small>

```ruby
class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :content
      t.timestamps
    end
  end
end
```

ActiveRecordにバージョン指定してあげないとエラー吐くので
環境に応じて適宜追加する

とりあえず今回試しに作ったのは 件名・内容 のデータを持ったシンプルなもの  
テーブル名はブログにならって Posts に

* * *

## Modelを作る

命名規則はRailsにならって テーブル名を複数形、モデル名を単数形に

<code>/models</code> フォルダ作って <code>post.rb</code> を配置  
中身はコレだけ

```ruby
/models/post.rb

ActiveRecord::Base.establish_connection('sqlite3:///model.db')
class Post < ActiveRecord::Base 
end
```

<code>rakefile</code> から <code>/models/post.rb</code>を読み込めるように

```ruby
/rakefile

require 'sinatra/activerecord'
require 'sinatra/activerecord/rake'
require './models/post.rb' #追加した
```

* * *

## db:migrateする

```
$ bundle exec rake db:migrate
```

テーブルが出来た。

* * *

## 仮データを作る

db:seedを使って初期データをいれてみる

<code>/db</code>以下に<code>seeds.rb</code>を作る  
テストだけなので中身は適当に

```ruby
/db/seeds.rb 

Post.create!(
  [
    {
      title: 'TITLE_1',
      content: 'CONTENT_1',
    },
    {
      title: 'TITLE_1',
      content: 'CONTENT_1',
    }
  ]
)
```

db:seed の実行

```
$ bundle exec rake db:seed
```

データが入った。

* * *

## webページで中身を表示して確認してみる

とにかく posts の中身を表示させて見てみる

```ruby
main.rb

require 'sinatra'
require 'sinatra/activerecord'
require "./models/post.rb"

get "/posts/?" do
  Post.all.to_json
end

get "/posts/:id" do |id|
  Post.find(id).to_json
end
```

出来た。