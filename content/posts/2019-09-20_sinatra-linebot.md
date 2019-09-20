---
date: 2019-09-20T13:03:54+09:00
thumbnail: images/posts/2019-09-20_eye-catch.png
title: Sinatra + Heroku でめっちゃ簡単に LineBot実装できた
toc: false

# Categories:
#   技術, ゲーム, 自転車, ニュース, その他
# Tags:
#   ruby, php, golang, javascript, kotlin
#   ruby-on-rails, sinatra, laravel, hugo
#   github, netlify, heroku
#   自転車, ボードゲーム
categories:
 - "技術"
tags:
 - "ruby"
 - "sinatra"
 - "line-bot"
---

# Sinatra + line-bot-api + heroku で Linebot 作ってみた

新しい情報受取る時にメールだと面倒＋読まないのでLineで通知を出そうと、ちょっと試しに _Line Bot_ 作ってみたのですが、めっちゃ簡単なんですね

公式ヘルプや参考サイト見たりしながら、15分ぐらいでサックリ実装できました

* * *

## Sinatra環境を作る

言わずもかな、特段変わったことはなし  
ついでに __line-bot-api__ のGemも追加しておく

```
Gemfile

gem 'sinatra'
gem 'line-bot-api'
```

<code>bundle install</code>しとく

<br>

## LineDeveloperに登録する

[Line Deloper](https://developers.line.biz) のページでアカウントを取得し、順繰り登録していく

<br>
プロバイダ名 (開発者名) を登録して 
{{< img src="images/posts/2019-09-20_line-dev1.png" >}}

<br>
新規チャネル作成を押下する
{{< img src="images/posts/2019-09-20_line-dev2.png" >}}

<br>
Messaging APIを使う
{{< img src="images/posts/2019-09-20_line-dev3.png" >}}

<br>
必要な情報を適宜入力する  
アプリ名に ハイフン(-) などをいれると、項目に誤りがあるとかで登録できない  
そして、エラーの内容は伝えてくれないクソ仕様なので注意
{{< img src="images/posts/2019-09-20_line-dev4.png" >}}

<br>
登録後の画面に出てくる次の値を ruby 側で使用するので控える

- Channel ID
- Channel Secret
- アクセストークン (発行する)

### 必要な設定をする

Line Developer側で必要な設定が細々ある

設定は同じ「チャンネル基本設定」から
{{< img src="images/posts/2019-09-20_line-dev5.png" >}}

- Webhook送信 を __利用する__
- Webhook URL に __https://HEROKU-APP-NAME.herokuapp.com/callback__ ※1
- 自動応答メッセージ → Webhook を __オン__
- 自動応答メッセージ → 応答メッセージ を <small>(必要に応じて)</small> _オフ_ ※2

<small>
※1 __/callback__ でSinatra側の受け口作るのでやってますが、必要に応じて適宜変更  
※2 自動応答メッセージが オン だと、BOTからメッセージが送信されるのに加え、自動応答も返されます  
   BOTが正常に動作してるっぽいの確認したら適宜切っちゃえばOKかと  
   でも、エラーとかは結局 Heroku のログで確認するので、オフで良いです
</small>

_あと、テスト用の友達追加はQRコードでやると楽です_

## Sinatra側を作る

ソースはほぼ公式のものです。
[https://github.com/line/line-bot-sdk-ruby](https://github.com/line/line-bot-sdk-ruby)


```
app.rb

require 'sinatra'
require 'line/bot'

# テスト用なのでベタ書き
# 本番環境じゃちゃんと env とかしてね
CHANNEL_ID = 'ここに控えた Channel ID'
CHANNEL_SECRET = 'ここに控えた Channel Secret'
CHANNEL_TOKEN = 'ここに発行して控えた アクセストークン'

def client
  @client ||= Line::Bot::Client.new { |config|
    config.channel_id     = CHANNEL_ID
    config.channel_secret = CHANNEL_SECRET
    config.channel_token  = CHANNEL_TOKEN
  }
end

post '/callback' do
  body = request.body.read

  signature = request.env['HTTP_X_LINE_SIGNATURE']
  unless client.validate_signature(body, signature)
    error 400 do 'Bad Request' end
  end

  events = client.parse_events_from(body)
  events.each { |event|
    case event
    when Line::Bot::Event::Message
      case event.type
      when Line::Bot::Event::MessageType::Text
        message = {
          type: 'text',
          text: event.message['text'] # オウム返し
        }
        client.reply_message(event['replyToken'], message)
      when Line::Bot::Event::MessageType::Image, Line::Bot::Event::MessageType::Video
        response = client.get_message_content(event.message['id'])
        tf = Tempfile.open("content")
        tf.write(response.body)
      end
    end
  }

  # Don't forget to return a successful response
  "OK"
end
```

Herokuで動作させるために _config.ru_ と _Procfile_ を直下につくる

```
/Procfile

web: bundle exec rackup config.ru -p $PORT
```

```
/config.ru

require './app'
run Sinatra::Application
```

<br>
## Herokuにデプロイ

特別必要なGemとか設定とかも無いので、そのまま投げ込んだらOK


<br>
## 動かしてみた

{{< img src="images/posts/2019-09-20_line-bot1.png" w="400px" >}}

出来た。