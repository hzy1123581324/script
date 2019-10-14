const template = {
  //简单的标签
  components: {
    "btn": {//通用按钮/最低高度为70
      template: "<div class='flex flex_center bg_main color_fff min_h70 fs32 radius_10 mar_lf_rg_28'><slot>确定</slot></div>",
    },
    "capsule": {//胶囊型按钮
      template: '<div class="pad_lf_rg_18 min_h56 fs24 radius_30 mar_lf_24 flex_shrink flex flex_center"><slot></slot></div>'
    },
    "center": {//居中
      template: '<div class="flex flex_center flex_wrap"><slot></slot></div>'
    },
    "between": {//两边对齐
      template: '<div class="flex flex_between flex_wrap pad_lf_rg_28"><slot></slot></div>'
    },
    "fixedBtm": {
      template: '<div class="fixed_btm w_100 bg_fff"><slot></slot></div>',
    },
    "fixed-top": {
      template: '<div class="fixed_top w_100"><slot></slot></div>',
    },
    "grow":{
      template: '<div class="flex_grow w_50"><slot></slot></div>',
    },
    "flex":{
      template: '<div class="flex"><slot></slot></div>',
    },

    // "mask": {
    //   template: '<div class="fixed_center z_9999999"><slot></slot></div>',
    // },
    "modal-center": {
      template: '<div class="absolute_center"><slot></slot></div>',
    },
    "modal-footer": {
      template: '<div class="absolute_btm z_20 "><slot></slot></div>',
    },



    //新的
    // "shearch-box": {
    //   template: `<div class=" mar_auto lh64 bg_fff txt_c flex flex_center radius_32">
    //               <img class="size26" src="../images/shearch.png"/>
    //               <span class="color_999"><slot>搜索商家信息</slot></span>	
    //               <input class="flex_grow txt_rg pad_rg_30 w_50" type="text" v-model="keyword"
    //                             placeholder-class="color_98 txt_rg" placeholder="请输入详细地址" />
    //             </div>`,
    // },
    "no-data": {
      template: `<div class="absolute_center">
                    <p class='txt_c' style="color:#88919a">
                      <span>~~</span>
                      <slot>暂无数据</slot>
                      <span>~~</span>
                    </p>
                    <div class='mar_top_40 pad_top_20 mar_auto'  style="width:28.4vw;">
                      <img src="../images/noData.png">
                    </div>
                  </div>`,
    },
    "no-more": {
      template: `<div class='txt_c' style="color:#88919a">
                  <span>~~~</span>
                  <slot>我是有底线的</slot>
                  <span>~~~</span>
                </div>`,
    },
  }
}
