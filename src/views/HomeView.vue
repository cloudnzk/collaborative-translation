<template>
<div id="home">
  <div class="container">
    <div class="row justify-content-start align-items-center" style="margin-bottom: 50px;">
    <div class="col-md-auto">
      <!-- <h3>汉语 → 老挝语</h3> -->
      <button type="button" class="btn btn-light  translation_btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
  汉语 → 老挝语
</button>
    </div>
    <div class="col-md-auto">
      <button @click="zh2en" type="button" class="btn btn-primary  translation_btn">翻译</button>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div class="mb-3">
  <!-- <h5>汉语</h5> -->
  <textarea v-model="chinese"  placeholder="汉语" class="form-control translation_container" id="exampleFormControlTextarea1" rows="12"></textarea>
</div>
    </div>
    <div class="col">
      <div class="mb-3">
  <!-- <h5>英语</h5> -->
  <textarea v-model="english" placeholder="英语" class="form-control translation_container" id="exampleFormControlTextarea2" rows="12"></textarea>
</div>
    </div>
    <div class="col">
      <div class="mb-3">
  <!-- <h5>老挝语</h5> -->
  <textarea v-model="laotain" placeholder="老挝语" class="form-control translation_container" id="exampleFormControlTextarea3" rows="12"></textarea>
</div>
    </div>
  </div>
</div>
</div>
</template>

<style>
  #home{
    margin: 100px;
  }
  .translation_container{
    border-radius: 8px;
    border: 1px solid #dae1e8;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 10%);
  }
  .translation_btn{
    width: 150px;
    height: 60px;
  }
</style>


<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
let MD5 = require("blueimp-md5")

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      chinese: '',
      english: '',
      laotain: '',
    }
  },
  methods: {
    async zh2en(){
      this.english = ''
      this.laotain = ''
      var hash = MD5("20210420000791587" + this.chinese + '1435660288' + 'B7cR34b8eQDM1WcjASdP');
      //console.log(a);  // c3b93d3065f112b02ac70e09762469b0
      let url  = 'api/translate?q='+this.chinese+'&from=zh&to=en&appid=20210420000791587&salt=1435660288&sign='+ hash
      let translation_result = await axios.get(url)
      // var s = JSON.stringify();
      let s = translation_result['data']['trans_result'][0]['dst']
      console.log(translation_result)
      this.english = s
      
      this.en2th()
    },
    async en2th(){
      let url  = 'translation/' + this.english
      let translation_result = await axios.get(url)
      // var s = JSON.stringify();
      let s = translation_result['data']
      console.log(translation_result)
      this.laotain = s
    },
  }
}
</script>
