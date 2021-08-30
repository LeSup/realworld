// 登录时访问不需要登录状态的页面，跳转到首页
export default function ({ store, redirect }) {
  if (store.state.user) {
    return redirect('/')
  }
}
