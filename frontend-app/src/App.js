import "./App.css";
import AuthContextProvider from "./Components/AuthContext";
import AllRoutes from "./Routes/AllRoutes";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <AllRoutes />
      </AuthContextProvider>
    </div>
  );
}

export default App;
