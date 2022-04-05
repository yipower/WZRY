<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form table-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      parents: {},
    };
  },
  methods: {
    async save() {
      const res = await this.$http.post(
        "http://127.0.0.1:3000/admin/api/rest/categories",
        this.model
      );

      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(
        `http://127.0.0.1:3000/admin/api/rest/categories/${this.id}`
      );
      this.model = res.data;
    },
    async change() {
      const res = await this.$http.put(
        `http://127.0.0.1:3000/admin/api/rest/categories/${this.id}`,
        this.model
      );
      this.model = res.data;
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "成功",
      });
    },
    async fetchParents() {
      const res = await this.$http.get(
        "http://127.0.0.1:3000/admin/api/rest/categories"
      );
      this.parents = res.data;
      // let i;
      // for(i=0;i<this.parents.length;i++){
      //   if(this.parents[i].hasOwnProperty(parent)) return this.parents[i];
      // }
      console.log(this.parents);
    },
  },
  created() {
    if (this.id) {
      this.fetch();
    }
    this.fetchParents();
  },
};
</script>

<style lang="scss" scoped>
</style>