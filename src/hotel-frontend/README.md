做了前端和后端交互的接口，但是因为还没写后端，先注释掉了，写完可以解除注释，这段注释在 layouts/BasicLayout 的 script 中，还有一个在 app.vue 中

和后端交互接口的具体实现见 api/user 和 request 文件

写了一个用于测试后端运行的接口，位于/store/useLoginUserStore，测试完可以注释掉

运行这个前端项目还需要安装 axios 和 pinia 库，运行`pnpm install axios` ，`pnpm install pinia`，当然如果用 npm 也是同理
