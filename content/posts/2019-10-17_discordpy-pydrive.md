---
date: 2019-10-17T09:49:51+09:00
thumbnail: images/posts/2019-10-17_eye-catch.jpg
title: 【Python】GoogleDriveのファイルを指定秒毎に読み上げるDiscordbot
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
 - "python"
 - "discordbot"
 - "google-apps-script"
---

# GoogleDriveからファイルをダウンロードし、指定秒毎に読み上げるBOT

友人から相談され、Discord Botを作りました。  
もろもろの事情でまだ完成はしていないのだけど、動いてはいるので途中報告まで。

あくまでもメモ書きで、Discord Bot作成の教材にはいまいち。  
必要な情報は適宜調べたほうが良いです。例がみたい人向け。

<br>
* * *

## 背景・動機
相談された内容はこんな感じ

FF14で絶などの難しいレイドコンテンツをする時に __[敵が○○の技を使う、○○に注意して動く]__ といった情報(タイムライン)を戦闘中に確認したい  

ACT<small>(Advanced Combat Tracker)</small>でもタイムラインに関するツールはあるのだけど、当然自分専用

参加メンバー全員でそのタイムラインを共有したい  
攻略に関する話し合いができるよう、タイムラインを文字でも確認したい

### 要件定義
- 作成したタイムラインデータを常時閲覧可能に
- 参加メンバー全員で同じタイムラインを聞く
- コンテンツは１回１０分～１５分程度
- 特定コンテンツに限らず、その他レイドでも使用可能

### 技術・インフラ
- 実装様式不問
- 言語は不問 <small>実行速度・容易さからスクリプト言語か</small>
- サーバ費用は掛けたくない

<br>
* * *

一つづつ問題をクリアしていきます

<br>
_作成したタイムラインデータを複数人で閲覧可能に_  
Google Spread Sheets を使用してタイムラインデータを管理する  
データベースに格納しちゃうと、Webアプリ必要な上に開発工数が増えるので除外

_参加メンバー全員で同じタイムラインを聞く_  
Discordでボイスチャットしてるので、DiscordBotに読み上げさせる

_コンテンツは１回１０分～１５分程度_  
Google Apps Scriptだと、6分の起動時間制限があるので  
別のサーバ上でDiscordBotを実装する必要有り
 
_特定コンテンツに限らず、その他レイドでも使用可能_  
Google Spread Sheets でシート毎に管理すればOK  
それかBotにコンテンツ指定できる機能をつくるか  
後からどうにでもなるのでとりあえず保留

<br>
_実装方法_  
音声再生BOTを作ると色々大変なので  
既存のテキスト読み上げBOT + 自作のテキスト送信BOT で実装する

_言語_  
Ruby ... discordrb の依存ライブラリ問題が Windows で解決困難だったので除外  
node.js ... Glitchなどが使えて便利 有力候補だけど、node.js の知識が乏しいので保留  
golang ... これも速度早いらしいけど情報少ないので除外  
rust ... これも速度早いらしいけど情報少ないので除外  
__python__ ... 実装が簡単だったので、とりあえず Python で試した

_サーバ_  
[Heroku](https://jp.heroku.com)や[Google Cloud Platform](https://console.cloud.google.com/?hl=ja)が候補か  
node.jsの場合は[Glitch](https://glitch.com)を採用できる

Herokuはsleepしちゃうので今回は Google Cloud Platform を採用予定 (まだココまでいってない)

<br>
* * *

### GoogleSpreadsheet
まずは Spreadsheet にこんな感じのデータを用意  
<small>内容はテスト用に色々触ったりしてるのでスルーで</small>
{{< img src="images/posts/2019-10-17_google-spread-sheet.png" >}}

### GAS実装部
指定秒毎にテキスト送信…といった機能自体はGAS単体でも実装できる  
ただ、先述の通り起動時間制限に引っかかるので、GASではタイムラインデータをCSVに出力し、BOT側でCSVデータをダウンロードし、指定秒毎に読み上げる形にする

```
function push_csv() {
  var sheet = _get_sheet();
  var lastRow = sheet.getDataRange().getLastRow();
  
  var drive = DriveApp.getFolderById( DRIVE_FOLDER_ID );
  var fname = 'timeline.csv'

  var csv = '';
  for (var i = 3; i <= lastRow; i++) {
    csv += sheet.getRange(i, 1).getValue() + ','
        +  sheet.getRange(i, 2).getValue() + ','
        +  sheet.getRange(i, 3).getValue() + '\n';
  }

  var blob = Utilities.newBlob('', 'text/csv', fname).setDataFromString(csv, 'utf-8');
  drive.createFile(blob);
  
  sheet.getRange(1,4).setValue(new Date()); //updated_at
}
```

### Python実装部
必要なライブラリをインストール
Discord Botに必要な _discord.py_ と  
GoogleDriveアクセスに必要な _pydrive_ のふたつ

```
$ python --version
< Python 3.7.4>

$ python -m pip install -U discord.py
$ python -m pip install -U pydrive
```

### python code

discord.pyについてはここのページが非常にわかりやすかったです  
[https://qiita.com/1ntegrale9/items/9d570ef8175cf178468f](https://qiita.com/1ntegrale9/items/9d570ef8175cf178468f)

pydriveについては、ここが圧倒的親切でした  
[https://note.nkmk.me/python-pydrive-download-upload-delete/](https://note.nkmk.me/python-pydrive-download-upload-delete/)


書いてみたコード  
１列目に、開始０秒からの経過秒数が書いてあるので、差分とって実行します

実際に出力されるテキストは、もちろん最終的に変更必須  
遅延測定のために全ての行に対して実行してますが、実際は知らせたいデータがある行を調べて実行する

```
import os
import csv
import time
import datetime
import discord

from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive

gauth = GoogleAuth()
gauth.LocalWebserverAuth()
drive = GoogleDrive(gauth)

TOKEN = 'MY_DISCORD_BOT_TOKEN'
client = discord.Client()

def _get_interval(interval):
  base_time = time.time()
  return ((base_time - time.time()) % interval) or interval

@client.event
async def on_ready():
  print('Started.')

@client.event
async def on_message(message):
  if message.author.bot:
    return

  if message.content == '::update':
    file_id = drive.ListFile({'q': 'title = "timeline.csv"'}).GetList()[0]['id']
    f = drive.CreateFile({'id': file_id})
    f.GetContentFile(f['title'])

    d = datetime.datetime.now()
    await message.channel.send('Update timeline file. [updated_at: '+  d.strftime('%Y/%m/%d %H:%M:%S]'))

  if message.content == '::start':
    with open(r'timeline.csv','r',encoding="utf-8_sig") as f:
      vals = list(csv.reader(f))
    
    prev_time = 0
    for val in vals:
      if not val[0].isnumeric():
        continue

      just_time = int(val[0])

      if bool(just_time):
        interval = _get_interval(just_time - prev_time)
        time.sleep(interval)

      prev_time = just_time
      d = datetime.datetime.now()
      text = "Time: {} | Enemy-skill: {} | Remark: {} ["+  d.strftime('%Y/%m/%d %H:%M:%S]')
      await message.channel.send(text.format(val[0], val[1], val[2]))

client.run(TOKEN)
```

一応、５秒毎にメッセージ送信されるのだけど、やっぱりちょっとズレる  

```
Time: 0 | Enemy-skill:  | Remark:  [2019/10/16 17:08:38]
Time: 5 | Enemy-skill: test2 | Remark:  [2019/10/16 17:08:44]
Time: 10 | Enemy-skill:  | Remark:  [2019/10/16 17:08:49]
Time: 15 | Enemy-skill: ブライトサバト | Remark:  [2019/10/16 17:08:54]
Time: 20 | Enemy-skill:  | Remark:  [2019/10/16 17:08:59]
Time: 25 | Enemy-skill:  | Remark:  [2019/10/16 17:09:05]
```

思いつきで <code>datetime.now()</code> を使ってしまったが、本来は <code>time.time()</code> とかでちゃんと見ておくべきだった  
datetimeでも明らかなズレが確認でき、コードを直さないといけないので確定したので試すまでもなかったけど

<br>
Pythonのscheduleとかのmodule使えばもっと正確に出来そうだけど…  
sleep(1)とかでビジーにすると、サーバ負荷が大変な事になって料金がどうなるのか。

とりあえず、まれに１秒ぐらいズレる状態までは掛けた。  
正確にしちゃうとサーバ負荷も高そうなので、一旦休憩とした

そもそも Glitch + node.js 環境で開發したほうが良さそう

<br>
無料期間中は…みたいな使い方してもいいなら Amazon Polly使えば正確なのが作れそう (試してない)