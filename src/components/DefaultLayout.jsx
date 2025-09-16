import { Outlet, Link } from "react-router-dom"

const DefaultLayout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
      {/* Navigation */}
      <nav style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link to="/react-query">
          <button>RQ</button>
        </Link>
        <Link to="/superheroes">
          <button>Trad</button>
        </Link>
        <Link to="/">
          <button>Home</button>
        </Link>
      </nav>

      {/* Main Content */}
      <div style={{ width: "100%" }}>
        <Outlet />
      </div>
    </div>
  )
}

export default DefaultLayout
