import { Routes, Route } from 'react-router-dom';

import { Cat } from './Pages/Cat';
import { Age } from './Pages/Age';
import { Layout } from './components/Layout';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/cat" element={<Cat />} />
                <Route path="/age" element={<Age />} />
            </Route>
        </Routes>
    );
}

export default App;
