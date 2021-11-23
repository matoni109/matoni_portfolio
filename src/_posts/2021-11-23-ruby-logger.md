---
layout: post
title:  "Ruby Logger"
date:     2021-11-23 21:10:49 +1100
categories: jea
# https://stackedit.io/app#
# https://www.hawkins.io/article/using-the-ruby-logger/
---
### Ruby Logger

Well  like most languages Ruby has an inbuilt `logger` Class to do just that. log, and in my case this comes in handy for `logging` the trail of destruction my Ruby code imparts in the `irb` compiler.

One thing to note is that you will need to add

 `require "logger"`

At the start of all of your scripts, but let's get going, fire up `irb` in your terminal and paste in below:

```ruby
require "logger"
logger = Logger.new(STDOUT)
logger.debug("I'm a debug log")
```
and you will get below back

`D, [2021-11-23T20:41:26.551530 #127047] DEBUG -- : I'm a debug log`

That's grand  🔥 as you can see we have a time-stamp, the log type in this case `DEBUG` and the `message`.

Attributes we can also change out of the box

#### logger.level
```ruby
logger.level = Logger::WARN
```
There are 6 levels of logging heaven which you can set your log to :

`Logger::DEBUG`, `Logger::INFO`, `Logger::WARN`, `Logger::Error`, `Logger::FATAL`, and `Logger::UNKOWN`

> Important note, once you set a level of log, the logger will NOT record logs at a 'lower' alert level

#### logger.datetime_format
```ruby
logger.datetime_format = "%Y-%m-%d %H:%M"
```
Using your favourite [strftime site](https://strftimer.com/) you can setup your time stamp to read just have you like.

#### logger.progname
```ruby
 logger.progname = 'home-of-log'
```
Set the `progname` of the log to help you find that needle in the haystack, and label just where the `log` came from in your programing misadventure.

Let's put all that together using [`.tap`](https://medium.com/aviabird/ruby-tap-that-method-90c8a801fd6a) which I stumbled onto today.

```ruby
logger.tap do |attribute|
	attribute.level = Logger::DEBUG
	attribute.datetime_format = '%d %m %Y %H:%M:%S'
	attribute.progname = 'log-of-the-day'
end
```

#### format ahoy

Every log needs a `custom` format surely,  you can use a `proc` to setup a formatter for your logs.

```ruby
logger.formatter  =  proc  do |severity, datetime, progname, msg|

date_format = datetime.strftime('%Y-%m-%d %H:%M:%S')
"#{progname} date=[#{date_format}] severity=#{severity.ljust(5)} pid=##{Process.pid} message='#{msg}'\n"

end

```

#### save me..

In order to save your logs into an actual file you need to pass those requirements onto the `Logger.new` instance like below

```ruby
logger = Logger.new('i_like_to_log_it.log')
```
or pass in custom args to slice up, or remove your log after an amount of time, or size.
```ruby
# Keep data for the current week.
Logger.new('my_weekly_logs.log', 'weekly')
# Keep data for today and the past 2 months.
Logger.new('my_latest_2_months_logs.log', 2, 'monthly')
# Restarts the log over when it exceeds 26GB in size.
Logger.new('my_custom_logs.log', 0, 20 * 1024 * 1024 * 1024)
```

### here's one I've prepared earlier

Ok, it's that time of the blog post where you put the code block into your iterm and everything ( hopefully ).. works.

End result should be a lovely formated log just like below 😁 🥵

```ruby
# Logfile created on 2021-11-23 21:59:40 +1100 by logger.rb/v1.4.3
ITS-HERE--> date=[2021-11-23 21:59:40] severity=DEBUG pid=145879 message='I'm a debug log'
ITS-HERE--> date=[2021-11-23 21:59:40] severity=INFO  pid=145879 message='I'm an info log'
ITS-HERE--> date=[2021-11-23 21:59:40] severity=WARN  pid=145879 message='I'm a warn log'
ITS-HERE--> date=[2021-11-23 21:59:40] severity=ERROR pid=145879 message='I'm an error log: error message'
ITS-HERE--> date=[2021-11-23 21:59:42] severity=FATAL pid=145879 message='I'm a fatal log'
```

Copy below and then check in your code editor for the `'i_like_to_log_it.log'` log file.

```ruby
 require  "logger"
 logger =  Logger.new('i_like_to_log_it.log')

 logger.tap  do |attribute|
	attribute.level  =  Logger::DEBUG
	attribute.datetime_format  =  '%d %m %Y %H:%M:%S'
	attribute.progname  =  'ITS-HERE-->'
 end

  logger.formatter  =  proc  do |severity, datetime, progname, msg|
	date_format = datetime.strftime('%Y-%m-%d %H:%M:%S')
	"#{progname} date=[#{date_format}] severity=#{severity.ljust(5)} pid=#{Process.pid} message='#{msg}'\n"
 end

### here comes the logs..
logger.debug("I'm a debug log")
logger.info("I'm an info log")
logger.warn("I'm a warn log")
logger.error("I'm an error log: error message")
logger.fatal("I'm a fatal log")
```

### that's a log for now..

Thank you sticking around to check out `logs` and I'll see you at next weeks topic.
