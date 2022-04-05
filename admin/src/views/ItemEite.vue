<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form table-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl+'/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
         
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit" @click="change"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
    
  },
  data() {
    return {
      model: {},
      baseUrl:'http://127.0.0.1:3000/admin/api'
    };
  },
  methods: {
    async save() {
      const res = await this.$http.post(
        "http://127.0.0.1:3000/admin/api/rest/items",
        this.model
      );

      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(
        `http://127.0.0.1:3000/admin/api/rest/items/${this.id}`
      );
      this.model = res.data;
    },
    async change() {
      const res = await this.$http.put(
        `http://127.0.0.1:3000/admin/api/rest/items/${this.id}`,
        this.model
      );
      this.model = res.data;
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "成功",
      });
    },
    async fetchParents() {
      const res = await this.$http.get(
        "http://127.0.0.1:3000/admin/api/rest/items"
      );
      this.parents = res.data;
      // let i;
      // for(i=0;i<this.parents.length;i++){
      //   if(this.parents[i].hasOwnProperty(parent)) return this.parents[i];
      // }
      console.log(this.parents);
    },
    afterUpload(res){
      console.log(res);
    }
  },
  created() {
    if (this.id) {
      this.fetch();
    }
    this.fetchParents();
  },
};
</script>

<style  scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #be3434;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #3864a3;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>