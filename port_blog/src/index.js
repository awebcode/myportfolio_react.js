import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "./css/index.css";
import "./css/theme.css";
import store from './Store';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
  <Provider store={store}>
    <App />
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    </Provider>
    </QueryClientProvider>
);
