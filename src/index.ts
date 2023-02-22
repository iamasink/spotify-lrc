import axios from 'axios'
import fs from 'fs'


function msConvert(ms: number) {
	const minutes = Math.floor(ms / (60 * 1000))
	const minutesms = ms % (60 * 1000)
	const sec = Math.floor(minutesms / 1000)
	const secms = ms % (1000)
	const remainingms = Math.floor(secms)
	return `[${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${remainingms.toString().slice(0, 1).padStart(2, '0')}]`
}
async function get() {
	// const response = await axios.get("https://lyrix.vercel.app/getLyrics/50u2y4zgROMZq2db8Qx94B")
	// return response

	const file = fs.readFileSync('data.json', 'utf-8');
	return JSON.parse(file)

}
async function process() {

	const data = (await get()).lyrics
	console.log("meow")
	console.log(data)
	const lines = data.lines

	let output = `[ar:]`

	for (let i = 0, len = lines.length; i < len; i++) {
		const line = lines[i]
		console.log(line)
		const formatted = `${msConvert(line.startTimeMs)} ${line.words}`
		console.log(formatted)
		output += `\n${formatted}`
	}
	fs.writeFileSync(`output.lrc`, output)
}



process()




/*
LRC format
[ar:Lyrics artist]

[al:Album where the song is from]

[ti:Lyrics (song) title]

[au:Creator of the Songtext]
[length:How long the song is]
[by:Creator of the LRC file]

[offset:+/- Overall timestamp adjustment in milliseconds, + shifts time up, - shifts down]
 
[re:The player or editor that created the LRC file]

[ve:version of program]

[00:12.00]Line 1 lyrics
[00:17.20]Line 2 lyrics
[00:21.10]Line 3 lyrics
...
[mm:ss.xx]last lyrics line





*/