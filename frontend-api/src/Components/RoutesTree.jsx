import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

function RoutesTree() {
    return(
        <div>
            <Routes>
                 <Route path="/" element={<Home />}></Route>
            </Routes>
        </div>
    );
}

export default RoutesTree;
