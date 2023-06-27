import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { Suspense, lazy } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

// BEFORE LAZY LOADING
// dist/assets/index-05704d4e.css   30.13 kB │ gzip:   5.04 kB
// dist/assets/index-45eca866.js   523.97 kB │ gzip: 148.38 kB

// AFTER LAZY LOADING
// dist/index.html                           0.48 kB │ gzip:   0.32 kB
// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/Homepage-b9276e6f.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/AppLayout-cb563084.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-05329076.css           26.46 kB │ gzip:   4.35 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/Logo-71614140.js              0.22 kB │ gzip:   0.20 kB
// dist/assets/PageNav-0ff8d13e.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-569bc09e.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-b40b6613.js          0.66 kB │ gzip:   0.41 kB
// dist/assets/Product-2b5962b1.js           0.85 kB │ gzip:   0.48 kB
// dist/assets/Login-309efcd2.js             1.04 kB │ gzip:   0.55 kB
// dist/assets/AppLayout-bea6a0b3.js       156.94 kB │ gzip:  46.12 kB
// dist/assets/index-3d0b50df.js           365.28 kB │ gzip: 101.81 kB
// ✓ built in 5.83s

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />

                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>

              {/* <Route path="*" element={<PageNotFoung />} /> */}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
