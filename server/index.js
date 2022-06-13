// 服务端代码
const express = require('express')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const app = express()

app.get('/translation/:text',async(req,res) => {
    let english_sentence = req.params.text.replace("'","\'")
    command = `echo -e ` + `"${english_sentence}"` + `| python3 ./utils/interactive.py ../../model/data/dataset/data-bin \
    --path ../../model/model/checkpoint_best.pt \
    --buffer-size 2000 --batch-size 256 \
    --remove-bpe --beam 5 --max-len-a 1.2 --max-len-b 10 | grep ^H  | cut -f3- | perl -ple 's{(\S)-(\S)}{$1 ##AT##-##AT## $2}g'`
    
    const {stdout} = await exec(command);
    console.log(stdout);
    res.send(stdout)
    // res.send(translate_result)
})

app.listen(3002,() => {
    console.log('http://localhost:3002');
})