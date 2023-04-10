export default function ({ redirect,app, store, route, error }) {
    if (process.server) {
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      return redirect({
        name: "login",
      });
    }
  }