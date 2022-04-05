<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="300"> </el-table-column>
      <el-table-column prop="name" label="分类名称"> </el-table-column>
       <el-table-column prop="parent.name" label="上级分类"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="big"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="big" @click="del(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(
        "http://127.0.0.1:3000/admin/api/rest/categories"
      );
      this.items = res.data;
    //   console.log(this.items);
    },
    async del(row) {
      this.$confirm(`此操作将永久删除"${row.name}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
            const res=  await this.$http.delete(`http://127.0.0.1:3000/admin/api/rest/categories/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          
        })
        this.fetch()
    },
  },
  created() {
    this.fetch();
  },
 
};
</script>

<style lang="scss" scoped>
</style>