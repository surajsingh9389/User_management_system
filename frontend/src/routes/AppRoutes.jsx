import { Route, Routes } from "react-router-dom"
import ListPage from "../pages/ListPage"
import AddPage from "../pages/AddPage"
import EditPage from "../pages/EditPage"
import ViewPage from "../pages/ViewPage"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/"  element={<ListPage/>}/>
            <Route path="/add" element={<AddPage/>}/>
            <Route path="/edit/:id" element={<EditPage/>}/>
            <Route path="/view/:id" element={<ViewPage/>}/>            
        </Routes>
    )
}

export default AppRoutes