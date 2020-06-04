<template>
  <div class>
    <el-container style="height:100vh;">
      <el-header style="padding: 0px;">
        <el-row :gutter="20" type="flex" justify="center" style="margin: 0px;">
          <el-col :span="6" class="el-col-bag">
            <el-link href="竞拍首页.html">
              <h3>北京昭德文软件系统</h3>
            </el-link>
          </el-col>
          <el-col :span="12" class="el-col-bag">
            <div></div>
          </el-col>
          <el-col :span="6" class="el-col-bag jinse">
            <el-menu
              class="el-menu-demo jinse"
              mode="horizontal"
              style="background-color: #545c64;"
            >
              <el-menu-item class="jinse" index="hhhh">退出</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-container style="height:100%;">
            <el-main style="background-color: #545c64;padding: 0px;">
              <el-menu
                 :default-active="$route.path" 
                style="text-align: left;"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                
              >
                <el-submenu v-for="(subm,index) of subMenus" :index="`${index+1}`">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{subm.text}}</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item
                      v-for="(subname,index1) of subm.children2"
                      :index="`${subname.id}`"
                      @click="addTab(subname.text,subname.id)"
                    >{{subname.text}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-main>
            <el-footer
              style="height: 70px; line-height: 30px; text-align: center;	position: relative; "
            >
              <span>操作:{{rname}}</span>
              <br />
              <span>日期:{{nowtime}}</span>
            </el-footer>
          </el-container>
        </el-aside>
        <el-container>
          <el-main>
            <template>
              <el-tabs
                v-model="editableTabsValue"
                type="card"
                @tab-remove="removeTab"
                @tab-click="show"
                style="border: 1px solid #eee;height: 100%;"
              >
                <el-tab-pane
                  :closable="index!=0"
                  v-for="(item, index) in editableTabs"
                  :class="`pan${index}`"
                  :key="item.name"
                  :label="item.title"
                  :name="item.name"
                >
                  <router-view />
                </el-tab-pane>
              </el-tabs>
            </template>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    //这里存放数据
    return {
      rname: "管理员",
      nowtime:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
      editableTabsValue: "1",
      tabIndex: 0,
      isShow2: false,
      title: "",
      editableTabs: [
        {
          title: "首页",
          name: "0"
        }
      ],
      /**subMenus负责放地址,然后在路由index.js中准备好地址，注意地址不能一样，否则会有问题 */
      subMenus: [
        {
          children2: [
            {
              id: "/index/test",
              text: "组织机构"
            },
            {
              id: "/index/error",
              text: "岗位定义"
            },
            {
              id: "/index/HelloWorld",
              text: "离职登记"
            }
          ],
          id: 1,
          text: "员工资料"
        },
        
      ]
    };
  },
  //计算属性
  computed: {},
  //方法集合
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    addTab(targetName, code) {
      var isok = true;
      this.editableTabs.forEach(function(val, index, arr) {
        if (val.title == targetName) {
          isok = false;
        }
      });
      if (!isok) {
        this.$message({
          message: "该页面已加载！",
          type: "error"
        });
        return isok;
      }
      let newTabName = code;
      this.editableTabs.push({
        title: targetName,
        name: newTabName
      });
      this.editableTabsValue = newTabName;
      let _this = this;
      console.log(newTabName);
      _this.$router.push(code);
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      //					--this.tabIndex;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    show(data) {
      let _this = this;
      console.log(data)
      this.editableTabs.forEach(function(val, index, arr) {
        if (val.title == data.label) {
          _this.$router.push(val.name);
          
        }
      });
     // console.log( _this.$ref['sum'].default-active)
      // _this.$router.push(code);
    }
  },
  //挂载完成（可以访问DOM元素）
  mounted() {
    
  },
  //监控data中的数据变化
  watch: {}
};
</script>
<style  scoped>
@import url("../../assets/css/myindex.css"); /*引入公共css类*/
.jinse {
  color: #ffd04b;
}
</style>