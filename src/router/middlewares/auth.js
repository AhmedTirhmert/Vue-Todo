export default function auth({ next, router }) {
  let x = 2;
  if (x === 2) {
    return router.push({ name: "Login" });
  }

  return next();
}
