# FFmpeg Overlays Filters 

Two js functions which compose ffmpeg commands for embedding a logo and text onto a source video. The parameters. 
```
timerStartsAt = time the countdown starts in milisecondes 
duration = time of the competition from end of countdown to press of stop button in miliseconds
input = input file path 
logoPath = path to the logo overlay shown up to the countdown timer start time
fontPath = path to the font used to dispay the countdown times
output = output file path
```

## Trial Runs

Running `npm start` will output the following commands which will show the text and image for the appropriate timeframes. 

```bash
ffmpeg -nostdin -i ./input/GOAT.MOV -i ./logo.png -filter_complex "[0:v]drawtext=text='00\:10':enable='if(gte(t,1.5),lt(t,2))':fontfile=./fonts/digital-7-mono.ttf:fontcolor=0x0000CCFF:fontsize=80:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=(text_h+line_h*1.5),drawtext=text='%{expr_int_format\:floor(((10-(t-2))/60))\:d\:2}\:%{expr_int_format\:mod(10-(t-2)\,60)\:d\:2}':enable='if(gte(t,2),lt(t,12))':fontfile=./fonts/digital-7-mono.ttf:fontcolor=0x0000CCFF:fontsize=80:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=(text_h+line_h*1.5),drawtext=text='00\:00':enable='if(gte(t,18.5),lt(t,20.5))':fontfile=./fonts/digital-7-mono.ttf:fontcolor=0xCC0000FF:fontsize=80:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=(text_h+line_h*1.5),drawtext=text='%{expr_int_format\:floor(((6.5-(t-12))/60))\:d\:2}\:%{expr_int_format\:mod(6.5-(t-12)\,60)\:d\:2}':enable='if(gte(t,12),lt(t,18.5))':fontfile=./fonts/digital-7-mono.ttf:fontcolor=0xCC0000FF:fontsize=80:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=(text_h+line_h*1.5)[text];[text][1:v]overlay=(main_w-overlay_w)/2:(overlay_h-10):enable='if(gte(t,0),lt(t,1.5))'[filtered]" -map "[filtered]" -map 0:a  -codec:a copy _timer_./output/_44_20.mp4
--------
ffmpeg -nostdin -i ./input/GOAT.MOV -i ./logo.png -filter_complex "[0:v]drawtext=text='00\:10':enable='if(gte(t,1.5),lt(t,2))':fontfile=./fonts/digital-7-mono.ttf:fontcolor=0x0000CCFF:fontsize=80:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=(text_h+line_h*1.5),drawtext=text='%{expr_int_format\:floor(((10-(t-2))/60))\:d\:2}\:%{expr_int_format\:mod(10-(t-2)\,60)\:d\:2}':enable='if(gte(t,2),lt(t,12))':fontfile=./fonts/digital-7-mono.ttf:fontcolor=0x0000CCFF:fontsize=80:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=(text_h+line_h*1.5),drawtext=text='00\:00\:06':enable='if(gte(t,18),lt(t,20))':fontfile=./fonts/digital-7-mono.ttf:fontcolor=0xCC0000FF:fontsize=80:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=(text_h+line_h*1.5),drawtext=text='%{pts\:hms\:-12}':enable='if(gte(t,12),lt(t,18))':fontfile=./fonts/digital-7-mono.ttf:fontcolor=0xCC0000FF:fontsize=80:box=1:boxcolor=black@0.7:boxborderw=15:x=(w-text_w)/2:y=(text_h+line_h*1.5)[text];[text][1:v]overlay=(main_w-overlay_w)/2:(overlay_h-10):enable='if(gte(t,0),lt(t,1.5))'[filtered]" -map "[filtered]" -map 0:a  -codec:a copy _speed_./output/_44_20.mp4
```


## FFMPEG Dependencies 

FFmpeg does not support custom fonts by default and must be compiled with `libfreetype`. It current version on Heroku has it installed. Here's a site that has additional builds for servers (http://johnvansickle.com/ffmpeg/) if we need to upgrade for whatever reason.

```
libfreetype
```

## Speed Timer Command

For the speed competitions this command will show a logo from the start of the video until the start of the countdown after which it will show the countdown in blue text until the competition is started  

 
```javascript
_getSpeedTimerCommand(timerStartsAt, duration, input, logoPath, fontPath, output);
```

### Demo

```sh
node ./getSpeedTimerCommand.js 
```

## Countdown Timer Command


```javascript
_getCountdownTimerCommand(timerStartsAt, duration, input, logoPath, fontPath, output);
```

### Demo

```sh
node ./getSpeedTimerCommand.js 
```


## References 

There are quite a few articles on filters but there far fewer on text manipulations and how to use the functions

* http://ffmpeg.gusari.org/viewtopic.php?f=11&t=769
* https://ffmpeg.org/ffmpeg-filters.html#Text-expansion
* http://stackoverflow.com/questions/17623676/text-on-video-ffmpeg 
* http://superuser.com/questions/701152/ffmpeg-drawtext-and-watermark-only-creates-watermark-but-no-text  ( see filtergraph ) 
* http://ffmpeg.org/ffmpeg-filters.html#Filtergraph-syntax-1
* http://ffmpeg.gusari.org/viewtopic.php?f=11&t=769&p=1347&hilit=drawtext#p1347
* http://stackoverflow.com/questions/6195872/applying-multiple-filters-at-once-with-ffmpeg
