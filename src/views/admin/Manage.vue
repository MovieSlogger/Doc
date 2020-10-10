<template>
  <div class="manage">
    <div class="manage-panel">
      <div class="manage-add">
        <template v-if="manageStatus">
          <div>
            <h3>名称: </h3>
          </div>
        </template>
        <template v-else>
          <div @click="onCreate">+</div>
        </template>
      </div>
      <template v-for="(item, index) in manageData" :key="index">
        <div class="manage-item">
          <div class="manage-info">
            <div class="manage-title">
              <h3>名称: </h3>
              <h3>{{ item.title }}</h3>
            </div>
            <div class="manage-hand">
              <div class="manage-left">
                <div class="manage-sort">排序: {{ item.sort }}</div>
              </div>
              <div class="manage-right">
                <Switch title="显示: " :status="switchStatus" @switch-btn="onSwitch" />
              </div>
            </div>
          </div>
          <div class="manage-btn">
            <span @click="onDelete(item)">删除</span>
            <span>编辑</span>
          </div>
        </div>
      </template>
    </div>
    <Delete title="删除目录" article="您确定删除该目录吗？" :status="deleteStatus" :gather="deleteData" @delete-cancel="delCancel" @delete-sure="delSure" />
  </div>
</template>

<script>
import Switch from "@/components/Switch.vue"
import Delete from "@/components/Delete.vue"

export default {
  name: "Manage",
  components: {
    Switch,
    Delete
  },
  data() {
    return {
      manageData: [
        {
          id: 1,
          sort: 3,
          title: "商城接口"
        },
        {
          id: 1,
          sort: 3,
          title: "商城接口"
        },
        {
          id: 1,
          sort: 3,
          title: "商城接口"
        },
        {
          id: 1,
          sort: 3,
          title: "商城接口"
        },
        {
          id: 1,
          sort: 3,
          title: "商城接口"
        },
        {
          id: 1,
          sort: 3,
          title: "商城接口"
        },
        {
          id: 1,
          sort: 3,
          title: "商城接口"
        },
        {
          id: 1,
          sort: 3,
          title: "商城接口"
        },
        {
          id: 1,
          sort: 3,
          title: "商城接口"
        },
        {
          id: 1,
          sort: 3,
          title: "商城接口"
        },
        {
          id: 1,
          sort: 3,
          title: "商城接口"
        },
        {
          id: 1,
          sort: 3,
          title: "商城接口"
        },
        {
          id: 1,
          sort: 3,
          title: "福利吧"
        }
      ],
      manageStatus: false,
      switchStatus: true,
      deleteStatus: false,
      deleteData: {}
    }
  },
  methods: {
    onCreate() {
      this.manageStatus = true;
    },
    onSwitch() {
      this.switchStatus = !this.switchStatus;
    },
    onDelete(row) {
      this.deleteData = row;
      this.deleteStatus = true;
    },
    delCancel() {
      this.deleteStatus = false;
    },
    delSure(id) {
      console.log(id, "delSure")
    }
  }
}
</script>

<style lang="less" scoped>
.manage {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  overflow: hidden;
  .manage-panel {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0.06rem 0.06rem 0 0.06rem;
    .manage-add {
      margin: 0.06rem;
      width: 1.62rem;
      height: 0.82rem;
      border-radius: 0.02rem;
      background-color: #ffffff;
    }
    .manage-item {
      margin: 0.06rem;
      width: 1.62rem;
      height: 0.82rem;
      border-radius: 0.02rem;
      background-color: #ffffff;
      .manage-info {
        .manage-title {
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin: 0.12rem 0 0 0;
          > h3 {
            font-size: 0.1rem;
            color: #333333;
            line-height: 0.1rem;
            font-weight: normal;
          }
        }
        .manage-hand {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin: 0.12rem 0 0 0;
          width: 100%;
          .manage-left {
            margin: 0 0 0 0.12rem;
            // flex: 1;
            // display: flex;
            .manage-sort {
              // margin: 0 0 0 0.12rem;
              font-size: 0.1rem;
              color: #333333;
              line-height: 0.1rem;
            }
          }
          .manage-right {
            margin: 0 0.12rem 0 0;
            // flex: 1;
          }
        }
      }
      .manage-btn {
        display: flex;
        flex-direction: row;
        margin: 0.12rem 0 0 0;
        width: 100%;
        height: 0.24rem;
        border-top: 1px solid #eeeeee;
        > span {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50%;
          height: 0.24rem;
          font-size: 0.1rem;
          line-height: 0.1rem;
          color: #333333;
          &:nth-child(1) {
            border-right: 1px solid #eeeeee;
          }
        }
      }
    }
  }
}
</style>