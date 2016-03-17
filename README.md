# FFmpeg Overlays Filters 

Two js functions which compose ffmpeg commands for embedding a logo and text onto a source video. 

## FFMPEG Dependencies 

FFmpeg does not support custom fonts by default and must be compiled with `libfreetype`. It appears the version on Heroku has it installed. Here's a site that has additional builds for servers (http://johnvansickle.com/ffmpeg/).

```
libfreetype
```

## Usage

```sh
node ./encode_timestamp.js 
```


## Speed Timer Command

For the speed competitions this command will show a logo from the start of the video until the start of the countdown after which it will show the countdown in blue text until the competition is started  

 
```javascript
_getSpeedTimerCommand(timerStartsAt, duration, input, output);
```


```javascript
_getCountdownTimerCommand(timerStartsAt, duration, input, output);
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
