const fs = require('fs')
const path = require('path')

const updateVersion = (major, minor, inputName) => {
  const dataPath = path.resolve(__dirname, 'inlinedata.json')
  const data = require(dataPath)
  if (!data[inputName]) {
    data[inputName] = {
      major,
      minor,
      patch: 0
    }
  }
  data[inputName].patch++
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2, 'utf8'))
  return `${major}.${minor}.${data[inputName].patch}`
}

const input = process.argv[2] || 'MasterControl.js'
const output = process.argv[2] || '_built.js'

console.log(`inlnining ${input} to ${output}`)

const lines = fs.readFileSync(path.resolve(__dirname, input), 'utf8')
  .split('\n')
let content = ''
let index = 0

const VERS_PREFIX = '// #VERSION='
while (!lines[index].trim().startsWith(VERS_PREFIX)) {
  index++
  if (index === lines.length) {
    throw new Error('NO VERSION')
  }
}
const line = lines[index]
let versionArr = line.substr(line.indexOf(VERS_PREFIX)+VERS_PREFIX.length,line.length)
  .split('.')
const version = updateVersion(versionArr[0], versionArr[1], input)
content += `${VERS_PREFIX}${version}\n`

while (!lines[index].trim().startsWith('// #INLINE_START')) {
  index++
  if (index >= lines.length) throw new Error('NO INCLUDES')
}
index++

while (!lines[index].trim().startsWith('// #INLINE_END')) {
  const filePath = path.resolve(__dirname, lines[index].trim())
  content += `\n// ${filePath}\n${fs.readFileSync(filePath)}\n`

  index++
  if (index >= lines.length) throw new Error('NO INCLUDE END')
}
index++

while (index < lines.length) {
  content += `${lines[index]}\n`
  index++
}

fs.writeFileSync(output, content,'utf8')
