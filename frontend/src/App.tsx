import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PropertyList from "./pages/PropertyList";
import Search from "./pages/Search";
import CreateProperty from "./pages/CreateProperty";
import Profile from "./pages/Profile";
import UpdateProperty from "./pages/UpdateProperty";
import PropertyDetail from "./pages/PropertyDetail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="" element={<ProtectedRoutes />}>
        <Route path="create" element={<CreateProperty />} />
        <Route path="update/:id" element={<UpdateProperty />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="search" element={<Search />} />
      <Route path="prop" element={<PropertyList />} />
      <Route path="prop/:id" element={<PropertyDetail />} />
      <Route path="prop/:id/update" element={<UpdateProperty />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
