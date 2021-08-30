// 未登录时访问需登录状态的页面，跳转到登录页
export default function ({ store, redirect }) {
  if (!store.state.user) {
    return redirect('/login')
  }
}
